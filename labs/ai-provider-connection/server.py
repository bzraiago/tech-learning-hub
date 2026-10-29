"""Laboratório local de chamada à OpenAI Responses API."""

import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from rag import RAG_INSTRUCTIONS, CitationError, build_input, retrieve, validate_citations


ROOT = Path(__file__).parent
PAGE = (ROOT / "public" / "index.html").read_bytes()
RESPONSES_URL = "https://api.openai.com/v1/responses"
MAX_REQUEST_BYTES = 4096
MAX_PROMPT_CHARS = 1000
MAX_OUTPUT_TOKENS = 200


class ProviderError(Exception):
    """Falha sanitizada durante a chamada ao provedor."""


def extract_output_text(payload):
    if not isinstance(payload, dict) or not isinstance(payload.get("output"), list):
        raise ProviderError("Formato de resposta inesperado")

    chunks = []
    for item in payload["output"]:
        if not isinstance(item, dict):
            continue
        for content in item.get("content", []):
            if (
                isinstance(content, dict)
                and content.get("type") == "output_text"
                and isinstance(content.get("text"), str)
            ):
                chunks.append(content["text"])

    result = "\n".join(chunks).strip()
    if not result:
        raise ProviderError("Resposta sem texto utilizável")
    return result


def call_openai(prompt, api_key, model, instructions=None):
    payload = {
        "model": model,
        "input": prompt,
        "max_output_tokens": MAX_OUTPUT_TOKENS,
    }
    if instructions:
        payload["instructions"] = instructions
    request_body = json.dumps(payload).encode("utf-8")
    request = Request(
        RESPONSES_URL,
        data=request_body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urlopen(request, timeout=15) as response:
            raw = response.read(262145)
    except (HTTPError, URLError, TimeoutError, OSError) as error:
        raise ProviderError("A chamada ao provedor falhou") from error

    if len(raw) > 262144:
        raise ProviderError("Resposta do provedor excedeu o limite local")

    try:
        payload = json.loads(raw)
    except (json.JSONDecodeError, UnicodeDecodeError) as error:
        raise ProviderError("Resposta do provedor não era JSON válido") from error

    return extract_output_text(payload)


def json_response(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("X-Content-Type-Options", "nosniff")
    handler.end_headers()
    handler.wfile.write(body)


def create_server(api_key=None, model=None, provider_call=call_openai, host="127.0.0.1", port=4194):
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, _format, *_args):
            # Não registra prompt, conteúdo de resposta nem cabeçalhos de autenticação.
            return

        def do_GET(self):
            if self.path not in ("/", "/index.html"):
                json_response(self, 404, {"error": "Rota não encontrada."})
                return

            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(PAGE)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(PAGE)

        def do_POST(self):
            if self.path not in ("/api/chat", "/api/rag"):
                json_response(self, 404, {"error": "Rota não encontrada."})
                return

            try:
                content_length = int(self.headers.get("Content-Length", "0"))
            except ValueError:
                json_response(self, 400, {"error": "Requisição inválida."})
                return

            if content_length <= 0:
                json_response(self, 400, {"error": "Envie uma mensagem em JSON."})
                return
            if content_length > MAX_REQUEST_BYTES:
                json_response(self, 413, {"error": "A mensagem excede o limite local."})
                return

            try:
                payload = json.loads(self.rfile.read(content_length))
            except (json.JSONDecodeError, UnicodeDecodeError):
                json_response(self, 400, {"error": "O corpo precisa ser JSON válido."})
                return

            prompt = payload.get("prompt") if isinstance(payload, dict) else None
            if not isinstance(prompt, str) or not prompt.strip() or len(prompt) > MAX_PROMPT_CHARS:
                json_response(self, 400, {"error": "A mensagem deve ter de 1 a 1000 caracteres."})
                return

            question = prompt.strip()
            passages = retrieve(question) if self.path == "/api/rag" else None
            if self.path == "/api/rag" and not passages:
                json_response(
                    self,
                    200,
                    {
                        "status": "no_evidence",
                        "answer": "Não encontrei evidência nos materiais fictícios para responder. Consulte o suporte ou acrescente uma fonte autorizada.",
                        "sources": [],
                    },
                )
                return

            configured_key = api_key
            configured_model = model
            if not configured_key and not configured_model and self.path == "/api/rag":
                passage = passages[0]
                answer = f'Trecho recuperado: “{passage["text"]}” [{passage["id"]}]'
                json_response(
                    self,
                    200,
                    {
                        "status": "simulated",
                        "answer": answer,
                        "sources": [{
                            "id": passage["id"],
                            "title": passage["title"],
                            "source": passage["source"],
                        }],
                    },
                )
                return
            if not configured_key or not configured_model:
                json_response(
                    self,
                    503,
                    {"error": "Configure OPENAI_API_KEY e OPENAI_MODEL no terminal do servidor."},
                )
                return

            try:
                if self.path == "/api/chat":
                    answer = provider_call(question, configured_key, configured_model)
                else:
                    answer = provider_call(
                        build_input(question, passages),
                        configured_key,
                        configured_model,
                        instructions=RAG_INSTRUCTIONS,
                    )
            except ProviderError:
                json_response(
                    self,
                    502,
                    {"error": "O provedor não concluiu a resposta. Confira a configuração e tente novamente."},
                )
                return
            except Exception:
                json_response(self, 502, {"error": "Não foi possível concluir a solicitação."})
                return

            if self.path == "/api/chat":
                json_response(self, 200, {"text": answer})
                return

            try:
                cited_ids = set(validate_citations(answer, passages))
            except CitationError:
                json_response(
                    self,
                    502,
                    {"error": "A resposta não trouxe uma citação recuperada válida. Revise ou tente novamente."},
                )
                return

            sources = [
                {"id": passage["id"], "title": passage["title"], "source": passage["source"]}
                for passage in passages
                if passage["id"] in cited_ids
            ]
            json_response(
                self,
                200,
                {"status": "answered", "answer": answer, "sources": sources},
            )

        def do_OPTIONS(self):
            json_response(self, 405, {"error": "Método não permitido."})

        def do_PUT(self):
            json_response(self, 405, {"error": "Método não permitido."})

        def do_DELETE(self):
            json_response(self, 405, {"error": "Método não permitido."})

    return ThreadingHTTPServer((host, port), Handler)


def main():
    port = int(os.environ.get("PORT", "4194"))
    server = create_server(
        api_key=os.environ.get("OPENAI_API_KEY"),
        model=os.environ.get("OPENAI_MODEL"),
        port=port,
    )
    print(f"Laboratório local em http://127.0.0.1:{port} (Ctrl+C para encerrar)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

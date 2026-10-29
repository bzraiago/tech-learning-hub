import json
import threading
import unittest
from unittest.mock import Mock, patch
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from server import ProviderError, RESPONSES_URL, call_openai, create_server, extract_output_text


def response_payload(text):
    return {
        "output": [
            {
                "type": "message",
                "content": [{"type": "output_text", "text": text}],
            }
        ]
    }


class LocalProviderLabTests(unittest.TestCase):
    def setUp(self):
        self.calls = []

        def fake_provider(prompt, api_key, model):
            self.calls.append((prompt, api_key, model))
            return "Resposta fictícia do modelo."

        self.server = create_server(
            api_key="chave-ficticia-de-teste",
            model="modelo-ficticio-de-teste",
            provider_call=fake_provider,
            port=0,
        )
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.server.server_port}"

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=2)

    def post(self, payload):
        body = json.dumps(payload).encode("utf-8")
        request = Request(
            f"{self.base_url}/api/chat",
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urlopen(request, timeout=2) as response:
                return response.status, response.read()
        except HTTPError as error:
            try:
                return error.code, error.read()
            finally:
                error.close()

    def test_page_never_contains_server_key(self):
        with urlopen(self.base_url, timeout=2) as response:
            page = response.read().decode("utf-8")

        self.assertIn('id="prompt"', page)
        self.assertIn("textContent = result.text", page)
        self.assertNotIn("chave-ficticia-de-teste", page)
        self.assertEqual(self.calls, [])

    def test_valid_message_uses_server_configuration(self):
        status, body = self.post({"prompt": "Explique uma rota HTTP em uma frase."})
        result = json.loads(body)

        self.assertEqual(status, 200)
        self.assertEqual(result, {"text": "Resposta fictícia do modelo."})
        self.assertEqual(
            self.calls,
            [("Explique uma rota HTTP em uma frase.", "chave-ficticia-de-teste", "modelo-ficticio-de-teste")],
        )
        self.assertNotIn("chave-ficticia-de-teste", json.dumps(result))

    def test_empty_message_is_rejected_without_provider_call(self):
        status, _body = self.post({"prompt": "   "})

        self.assertEqual(status, 400)
        self.assertEqual(self.calls, [])

    def test_long_message_is_rejected_without_provider_call(self):
        status, _body = self.post({"prompt": "a" * 1001})

        self.assertEqual(status, 400)
        self.assertEqual(self.calls, [])

    def test_missing_configuration_never_calls_provider(self):
        server = create_server(api_key="", model="", port=0)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            request = Request(
                f"http://127.0.0.1:{server.server_port}/api/chat",
                data=b'{"prompt":"teste"}',
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            try:
                urlopen(request, timeout=2)
                self.fail("A configuração ausente deveria ser recusada")
            except HTTPError as error:
                try:
                    body = error.read()
                    self.assertEqual(error.code, 503)
                    self.assertNotIn(b"chave-ficticia", body)
                finally:
                    error.close()
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)

    def test_provider_failure_is_sanitized(self):
        def failing_provider(_prompt, _api_key, _model):
            raise ProviderError("mensagem interna e segredo de exemplo")

        server = create_server(
            api_key="chave-ficticia",
            model="modelo-ficticio",
            provider_call=failing_provider,
            port=0,
        )
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            request = Request(
                f"http://127.0.0.1:{server.server_port}/api/chat",
                data=b'{"prompt":"teste"}',
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            try:
                urlopen(request, timeout=2)
                self.fail("A falha do provedor deveria ser sanitizada")
            except HTTPError as error:
                try:
                    body = error.read().decode("utf-8")
                    self.assertEqual(error.code, 502)
                    self.assertIn("não concluiu", body)
                    self.assertNotIn("segredo de exemplo", body)
                finally:
                    error.close()
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)

    def test_unknown_route_is_not_forwarded(self):
        try:
            urlopen(f"{self.base_url}/outro", timeout=2)
            self.fail("A rota desconhecida deveria retornar 404")
        except HTTPError as error:
            try:
                self.assertEqual(error.code, 404)
            finally:
                error.close()
        self.assertEqual(self.calls, [])


class ProviderRequestTests(unittest.TestCase):
    @patch("server.urlopen")
    def test_builds_responses_request_with_server_key_and_output_limit(self, mocked_urlopen):
        fake_response = Mock()
        fake_response.__enter__ = Mock(return_value=fake_response)
        fake_response.__exit__ = Mock(return_value=False)
        fake_response.read.return_value = json.dumps(response_payload("Resposta aprovada.")).encode()
        mocked_urlopen.return_value = fake_response

        result = call_openai("Pergunta fictícia", "chave-ficticia", "modelo-ficticio")
        request = mocked_urlopen.call_args.args[0]
        body = json.loads(request.data)

        self.assertEqual(result, "Resposta aprovada.")
        self.assertEqual(request.full_url, RESPONSES_URL)
        self.assertEqual(request.get_header("Authorization"), "Bearer chave-ficticia")
        self.assertEqual(body["model"], "modelo-ficticio")
        self.assertEqual(body["input"], "Pergunta fictícia")
        self.assertEqual(body["max_output_tokens"], 200)
        self.assertEqual(mocked_urlopen.call_args.kwargs["timeout"], 15)

    @patch("server.urlopen")
    def test_provider_http_error_does_not_reveal_response_body(self, mocked_urlopen):
        mocked_urlopen.side_effect = HTTPError(
            RESPONSES_URL, 401, "invalid key", {}, Mock(read=Mock(return_value=b"secret response"))
        )

        with self.assertRaises(ProviderError) as error:
            call_openai("teste", "chave-ficticia", "modelo-ficticio")

        self.assertNotIn("secret response", str(error.exception))

    def test_non_text_response_is_rejected(self):
        with self.assertRaises(ProviderError):
            extract_output_text({"output": [{"type": "refusal", "content": []}]})


if __name__ == "__main__":
    unittest.main()

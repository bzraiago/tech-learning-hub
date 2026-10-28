'use strict';

const http = require('node:http');

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT || 4183);

const BASE_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cache-Control': 'no-store'
};

const LOOSE_POLICY = "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; object-src *; base-uri *";
const STRICT_POLICY = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'";

const HOME_PAGE = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Laboratório A02 — configuração</title>
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
  <main>
    <h1>Configuração HTTP em laboratório</h1>
    <p>Escolha uma página com política intencionalmente ampla ou restrita.</p>
    <ul>
      <li><a href="/demo/loose">Demonstração de política ampla</a></li>
      <li><a href="/demo/strict">Demonstração de política restrita</a></li>
    </ul>
    <p>As duas páginas usam somente conteúdo local e texto fixo.</p>
  </main>
</body>
</html>`;

const LOOSE_PAGE = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Política ampla — demonstração</title>
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
  <main>
    <h1>Política ampla</h1>
    <p>Esta página usa uma configuração fraca apenas para comparação local.</p>
    <p id="result">Script in-line ainda não executado.</p>
    <a href="/">Voltar ao início</a>
  </main>
  <script>document.querySelector('#result').textContent = 'Script in-line permitido pela política ampla.';</script>
</body>
</html>`;

const STRICT_PAGE = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Política restrita — demonstração</title>
  <link rel="stylesheet" href="/assets/style.css">
  <script src="/assets/app.js" defer></script>
</head>
<body>
  <main>
    <h1>Política restrita</h1>
    <p>O script e o estilo são servidos pela mesma origem.</p>
    <p id="result">Script local ainda não executado.</p>
    <a href="/">Voltar ao início</a>
  </main>
</body>
</html>`;

const APP_SCRIPT = `document.querySelector('#result').textContent = 'Script local permitido pela política restrita.';`;
const STYLE_SHEET = `:root { color-scheme: light; font-family: system-ui, sans-serif; }
body { margin: 0; color: #14213d; background: #f5f7fb; }
main { max-width: 42rem; margin: 3rem auto; padding: 1.5rem; background: #fff; border-radius: .75rem; }
a { color: #1649a0; }
a:focus-visible { outline: 3px solid #e09000; outline-offset: 3px; }
`;

function send(response, statusCode, contentType, body, extraHeaders = {}) {
  response.writeHead(statusCode, {
    ...BASE_HEADERS,
    'Content-Type': contentType,
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders
  });
  response.end(body);
}

function createServer() {
  return http.createServer((request, response) => {
    if (request.method !== 'GET') {
      send(response, 405, 'text/plain; charset=utf-8', 'Método não permitido.');
      return;
    }

    if (request.url === '/') {
      send(response, 200, 'text/html; charset=utf-8', HOME_PAGE, {
        'Content-Security-Policy': STRICT_POLICY
      });
      return;
    }

    if (request.url === '/demo/loose') {
      send(response, 200, 'text/html; charset=utf-8', LOOSE_PAGE, {
        'Content-Security-Policy': LOOSE_POLICY
      });
      return;
    }

    if (request.url === '/demo/strict') {
      send(response, 200, 'text/html; charset=utf-8', STRICT_PAGE, {
        'Content-Security-Policy': STRICT_POLICY
      });
      return;
    }

    if (request.url === '/assets/app.js') {
      send(response, 200, 'text/javascript; charset=utf-8', APP_SCRIPT);
      return;
    }

    if (request.url === '/assets/style.css') {
      send(response, 200, 'text/css; charset=utf-8', STYLE_SHEET);
      return;
    }

    send(response, 404, 'text/plain; charset=utf-8', 'Recurso não encontrado.');
  });
}

if (require.main === module) {
  createServer().listen(PORT, HOST, () => {
    console.log(`Laboratório A02 local: http://${HOST}:${PORT}`);
    console.log('Políticas e conteúdo são fictícios; nenhuma chamada externa é realizada.');
  });
}

module.exports = { BASE_HEADERS, LOOSE_POLICY, STRICT_POLICY, createServer, HOST };

'use strict';

const http = require('node:http');

const MAX_BODY_BYTES = 512;
const DEMO_COOKIE = 'sessao=aluna_demo';
const DEMO_CSRF_TOKEN = 'csrf_demo_aluna';
const initialNote = 'nota fictícia inicial';

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(body));
}

function hasDemoSession(request) {
  return (request.headers.cookie || '')
    .split(';')
    .map((item) => item.trim())
    .includes(DEMO_COOKIE);
}

function readJson(request, response, onBody) {
  let body = '';
  let bodyBytes = 0;
  let tooLarge = false;
  request.on('data', (chunk) => {
    if (tooLarge) return;
    bodyBytes += chunk.length;
    if (bodyBytes > MAX_BODY_BYTES) {
      tooLarge = true;
      body = '';
      sendJson(response, 413, { error: 'Corpo acima do limite do laboratório.' });
      return;
    }
    body += chunk;
  });
  request.on('end', () => {
    if (tooLarge || response.writableEnded) return;
    try {
      onBody(JSON.parse(body));
    } catch {
      sendJson(response, 400, { error: 'JSON inválido.' });
    }
  });
}

function createServer({ allowedOrigin = 'http://127.0.0.1:4178' } = {}) {
  let note = initialNote;

  return http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/api/nota') {
      if (!hasDemoSession(request)) {
        sendJson(response, 401, { error: 'Sessão fictícia ausente.' });
        return;
      }
      sendJson(response, 200, { nota: note });
      return;
    }

    const vulnerableRoute = request.method === 'POST' && request.url === '/demo/vulnerable/nota';
    const protectedRoute = request.method === 'POST' && request.url === '/demo/protected/nota';
    if (!vulnerableRoute && !protectedRoute) {
      sendJson(response, 404, { error: 'Rota não encontrada.' });
      return;
    }

    if (!hasDemoSession(request)) {
      sendJson(response, 401, { error: 'Sessão fictícia ausente.' });
      return;
    }

    if (protectedRoute) {
      if (request.headers.origin !== allowedOrigin) {
        sendJson(response, 403, { error: 'Origem recusada.' });
        return;
      }
      if (request.headers['x-csrf-token'] !== DEMO_CSRF_TOKEN) {
        sendJson(response, 403, { error: 'Token CSRF ausente ou inválido.' });
        return;
      }
    }

    readJson(request, response, (body) => {
      if (typeof body?.nota !== 'string' || body.nota.trim().length < 1 || body.nota.length > 120) {
        sendJson(response, 400, { error: 'Nota inválida.' });
        return;
      }
      note = body.nota.trim();
      sendJson(response, 200, { nota: note });
    });
  });
}

if (require.main === module) {
  createServer().listen(4178, '127.0.0.1', () => {
    console.log('Laboratório CSRF local: http://127.0.0.1:4178');
    console.log('Sessão e token de demonstração são fictícios; não use em outros sistemas.');
  });
}

module.exports = { createServer };

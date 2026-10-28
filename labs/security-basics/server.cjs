'use strict';

const http = require('node:http');
const { URL } = require('node:url');

const DEMO_SESSIONS = new Map([
  ['demo-token-a', 'aluno-a'],
  ['demo-token-b', 'aluno-b'],
]);

function createSecurityDemoServer() {
  const progress = new Map([
    ['aluno-a', { ownerId: 'aluno-a', course: 'HTML', marker: 'PROGRESSO_FICTICIO_A', note: 'Leu semântica.' }],
    ['aluno-b', { ownerId: 'aluno-b', course: 'JavaScript', marker: 'PROGRESSO_FICTICIO_B', note: 'Praticou arrays.' }],
  ]);

  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://127.0.0.1');
    const route = /^\/demo\/(vulnerable|fixed)\/progress\/([^/]+)$/.exec(url.pathname);
    if (!route || !['GET', 'POST'].includes(request.method)) {
      return sendJson(response, 404, { error: 'Rota não encontrada.' });
    }

    const [, mode, encodedOwnerId] = route;
    let requestedOwnerId;
    try {
      requestedOwnerId = decodeURIComponent(encodedOwnerId);
    } catch {
      return sendJson(response, 400, { error: 'Identificador inválido.' });
    }

    const currentUserId = authenticate(request);
    if (!currentUserId) return sendJson(response, 401, { error: 'Sessão fictícia ausente ou inválida.' });

    // Intencionalmente vulnerável: autentica a conta, mas não verifica se ela
    // pode acessar o objeto escolhido pelo ID controlado pelo cliente.
    if (mode === 'vulnerable') {
      return handleProgress(request, response, progress, requestedOwnerId);
    }

    // Correção didática para este modelo simples de propriedade individual.
    // Aplicações com equipes e compartilhamento precisam de uma política mais rica.
    if (requestedOwnerId !== currentUserId) {
      return sendJson(response, 404, { error: 'Progresso não encontrado.' });
    }
    return handleProgress(request, response, progress, currentUserId);
  });

  return { server, progress };
}

function authenticate(request) {
  const match = /^Bearer\s+(.+)$/i.exec(request.headers.authorization || '');
  return match ? DEMO_SESSIONS.get(match[1]) || null : null;
}

async function handleProgress(request, response, progress, ownerId) {
  const record = progress.get(ownerId);
  if (!record) return sendJson(response, 404, { error: 'Progresso não encontrado.' });

  if (request.method === 'GET') return sendJson(response, 200, record);

  let body;
  try {
    body = await readJson(request);
  } catch (error) {
    return sendJson(response, error.status || 400, { error: error.message });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body) || typeof body.note !== 'string' || body.note.length > 200) {
    return sendJson(response, 400, { error: 'A nota deve ser texto com até 200 caracteres.' });
  }

  // O servidor controla ownerId; campos extras enviados pelo cliente são ignorados.
  const updated = { ...record, note: body.note };
  progress.set(ownerId, updated);
  return sendJson(response, 200, updated);
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 4096) {
      const error = new Error('Corpo da requisição muito grande.');
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new Error('JSON inválido.');
  }
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(value));
}

if (require.main === module) {
  const { server } = createSecurityDemoServer();
  server.listen(4178, '127.0.0.1', () => {
    console.log('Laboratório local em http://127.0.0.1:4178 · dados apenas em memória.');
  });
}

module.exports = { createSecurityDemoServer };

'use strict';

const assert = require('node:assert/strict');
const { afterEach, beforeEach, test } = require('node:test');
const { createSecurityDemoServer } = require('./server.cjs');

let app;
let baseUrl;

beforeEach(async () => {
  app = createSecurityDemoServer();
  await new Promise((resolve) => app.server.listen(0, '127.0.0.1', resolve));
  const address = app.server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterEach(async () => {
  await new Promise((resolve, reject) => app.server.close((error) => error ? reject(error) : resolve()));
});

function headers(token = 'demo-token-a') {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

test('reproduz BOLA: A lê o progresso fictício de B na rota vulnerável', async () => {
  const response = await fetch(`${baseUrl}/demo/vulnerable/progress/aluno-b`, { headers: headers() });
  const result = await response.json();
  assert.equal(response.status, 200);
  assert.equal(result.marker, 'PROGRESSO_FICTICIO_B');
});

test('a rota corrigida nega a leitura de B por A e ainda permite a leitura própria', async () => {
  const crossAccount = await fetch(`${baseUrl}/demo/fixed/progress/aluno-b`, { headers: headers() });
  const denied = await crossAccount.json();
  assert.equal(crossAccount.status, 404);
  assert.equal(JSON.stringify(denied).includes('PROGRESSO_FICTICIO_B'), false);

  const own = await fetch(`${baseUrl}/demo/fixed/progress/aluno-a`, { headers: headers() });
  assert.equal(own.status, 200);
  assert.equal((await own.json()).marker, 'PROGRESSO_FICTICIO_A');
});

test('a rota vulnerável reproduz alteração de objeto de outra conta', async () => {
  const response = await fetch(`${baseUrl}/demo/vulnerable/progress/aluno-b`, {
    method: 'POST', headers: headers(), body: JSON.stringify({ note: 'Alterado por A' }),
  });
  assert.equal(response.status, 200);
  assert.equal(app.progress.get('aluno-b').note, 'Alterado por A');
});

test('a rota corrigida nega atualização cruzada e ignora ownerId enviado no corpo', async () => {
  const crossAccount = await fetch(`${baseUrl}/demo/fixed/progress/aluno-b`, {
    method: 'POST', headers: headers(), body: JSON.stringify({ note: 'Tentativa de A', ownerId: 'aluno-a' }),
  });
  assert.equal(crossAccount.status, 404);
  assert.equal(app.progress.get('aluno-b').note, 'Praticou arrays.');

  const own = await fetch(`${baseUrl}/demo/fixed/progress/aluno-a`, {
    method: 'POST', headers: headers(), body: JSON.stringify({ note: 'Nota própria', ownerId: 'aluno-b' }),
  });
  assert.equal(own.status, 200);
  assert.equal(app.progress.get('aluno-a').note, 'Nota própria');
  assert.equal(app.progress.get('aluno-a').ownerId, 'aluno-a');
});

test('rotas vulnerável e corrigida exigem uma sessão fictícia válida', async () => {
  for (const mode of ['vulnerable', 'fixed']) {
    const response = await fetch(`${baseUrl}/demo/${mode}/progress/aluno-a`);
    assert.equal(response.status, 401);
  }
});

test('o parser recusa corpo inválido e corpo acima do limite', async () => {
  const invalid = await fetch(`${baseUrl}/demo/fixed/progress/aluno-a`, {
    method: 'POST', headers: headers(), body: '{quebrado',
  });
  assert.equal(invalid.status, 400);

  const wrongShape = await fetch(`${baseUrl}/demo/fixed/progress/aluno-a`, {
    method: 'POST', headers: headers(), body: JSON.stringify([]),
  });
  assert.equal(wrongShape.status, 400);

  const oversized = await fetch(`${baseUrl}/demo/fixed/progress/aluno-a`, {
    method: 'POST', headers: headers(), body: JSON.stringify({ note: 'x'.repeat(5000) }),
  });
  assert.equal(oversized.status, 413);
});

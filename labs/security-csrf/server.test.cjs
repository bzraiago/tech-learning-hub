'use strict';

const { afterEach, beforeEach, test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('./server.cjs');

const allowedOrigin = 'https://curso.example.test';
const demoCookie = 'sessao=aluna_demo';
const demoToken = 'csrf_demo_aluna';
let server;
let baseUrl;

beforeEach(async () => {
  server = createServer({ allowedOrigin });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

afterEach(async () => {
  if (!server?.listening) return;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

async function enviar(path, { origin, token, cookie = demoCookie, nota = 'nota de teste' } = {}) {
  const headers = { Cookie: cookie, 'Content-Type': 'application/json' };
  if (origin !== undefined) headers.Origin = origin;
  if (token !== undefined) headers['X-CSRF-Token'] = token;
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ nota })
  });
}

async function lerNota() {
  const response = await fetch(`${baseUrl}/api/nota`, { headers: { Cookie: demoCookie } });
  return response.json();
}

test('rota vulnerável aceita sessão fictícia sem prova de intenção', async () => {
  const response = await enviar('/demo/vulnerable/nota', { origin: 'https://origem-externa.example.test' });
  assert.equal(response.status, 200);
  assert.deepEqual(await lerNota(), { nota: 'nota de teste' });
});

test('rota protegida recusa origem externa mesmo com sessão e token', async () => {
  const response = await enviar('/demo/protected/nota', {
    origin: 'https://origem-externa.example.test',
    token: demoToken
  });
  assert.equal(response.status, 403);
  assert.deepEqual(await lerNota(), { nota: 'nota fictícia inicial' });
});

test('rota protegida recusa token ausente na origem permitida', async () => {
  const response = await enviar('/demo/protected/nota', { origin: allowedOrigin });
  assert.equal(response.status, 403);
  assert.deepEqual(await lerNota(), { nota: 'nota fictícia inicial' });
});

test('rota protegida recusa token incorreto sem alterar a nota', async () => {
  const response = await enviar('/demo/protected/nota', { origin: allowedOrigin, token: 'token_errado' });
  assert.equal(response.status, 403);
  assert.deepEqual(await lerNota(), { nota: 'nota fictícia inicial' });
});

test('rota protegida aceita origem e token fictícios válidos', async () => {
  const response = await enviar('/demo/protected/nota', { origin: allowedOrigin, token: demoToken });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { nota: 'nota de teste' });
  assert.deepEqual(await lerNota(), { nota: 'nota de teste' });
});

test('uma rota de escrita recusa pedido sem sessão', async () => {
  const response = await enviar('/demo/protected/nota', { cookie: '', origin: allowedOrigin, token: demoToken });
  assert.equal(response.status, 401);
  assert.deepEqual(await lerNota(), { nota: 'nota fictícia inicial' });
});

test('corpo acima do limite recebe 413 sem alterar a nota', async () => {
  const response = await enviar('/demo/protected/nota', {
    origin: allowedOrigin,
    token: demoToken,
    nota: 'x'.repeat(600)
  });
  assert.equal(response.status, 413);
  assert.deepEqual(await lerNota(), { nota: 'nota fictícia inicial' });
});

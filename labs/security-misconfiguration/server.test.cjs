'use strict';

const assert = require('node:assert/strict');
const { afterEach, beforeEach, test } = require('node:test');
const { BASE_HEADERS, LOOSE_POLICY, STRICT_POLICY, createServer, HOST } = require('./server.cjs');

let server;
let baseUrl;

beforeEach(async () => {
  server = createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, HOST, resolve);
  });
  baseUrl = `http://${HOST}:${server.address().port}`;
});

afterEach(async () => {
  if (!server?.listening) return;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('servidor fica limitado ao loopback e a página inicial aponta para as duas políticas locais', async () => {
  assert.equal(server.address().address, '127.0.0.1');
  const response = await fetch(baseUrl);
  const page = await response.text();
  assert.equal(response.status, 200);
  assert.match(page, /\/demo\/loose/);
  assert.match(page, /\/demo\/strict/);
  assert.equal(response.headers.get('content-security-policy'), STRICT_POLICY);
});

test('demonstração ampla usa uma política fraca, mas não contém entrada nem recurso remoto', async () => {
  const response = await fetch(`${baseUrl}/demo/loose`);
  const page = await response.text();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-security-policy'), LOOSE_POLICY);
  assert.match(LOOSE_POLICY, /'unsafe-inline'/);
  assert.match(LOOSE_POLICY, /'unsafe-eval'/);
  assert.match(page, /Script in-line ainda não executado/);
  assert.doesNotMatch(page, /https?:\/\//);
  assert.doesNotMatch(page, /<input|<form/i);
});

test('política restrita bloqueia padrões amplos e página usa ativos da mesma origem', async () => {
  const response = await fetch(`${baseUrl}/demo/strict`);
  const page = await response.text();
  const policy = response.headers.get('content-security-policy');
  assert.equal(response.status, 200);
  assert.equal(policy, STRICT_POLICY);
  assert.match(policy, /default-src 'none'/);
  assert.match(policy, /script-src 'self'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /base-uri 'none'/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.doesNotMatch(policy, /unsafe-inline|unsafe-eval|\*/);
  assert.match(page, /src="\/assets\/app\.js"/);
  assert.match(page, /href="\/assets\/style\.css"/);
  assert.doesNotMatch(page, /<script>[^]*<\/script>/i);
});

test('ativos locais têm MIME correto e cabeçalhos de base', async () => {
  const script = await fetch(`${baseUrl}/assets/app.js`);
  const css = await fetch(`${baseUrl}/assets/style.css`);
  assert.equal(script.headers.get('content-type'), 'text/javascript; charset=utf-8');
  assert.match(await script.text(), /textContent/);
  assert.equal(css.headers.get('content-type'), 'text/css; charset=utf-8');
  for (const header of Object.keys(BASE_HEADERS)) {
    assert.ok(script.headers.has(header.toLowerCase()), `Cabeçalho ausente: ${header}`);
    assert.ok(css.headers.has(header.toLowerCase()), `Cabeçalho ausente: ${header}`);
  }
});

test('404 e método recusado mantêm cabeçalhos de base e não divulgam detalhes', async () => {
  const missing = await fetch(`${baseUrl}/nao-existe`);
  const wrongMethod = await fetch(`${baseUrl}/demo/strict`, { method: 'POST' });
  assert.equal(missing.status, 404);
  assert.equal(await missing.text(), 'Recurso não encontrado.');
  assert.equal(wrongMethod.status, 405);
  assert.equal(await wrongMethod.text(), 'Método não permitido.');
  for (const response of [missing, wrongMethod]) {
    for (const header of Object.keys(BASE_HEADERS)) {
      assert.ok(response.headers.has(header.toLowerCase()), `Cabeçalho ausente: ${header}`);
    }
  }
});

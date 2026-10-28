'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { criarIdentidadeLimitadorPorConta } = require('./account-rate-limit-identity.cjs');

test('gera a mesma identidade pseudonimizada em instâncias que compartilham a mesma chave HMAC', () => {
  const segredoCompartilhado = Buffer.alloc(32, 0x61);
  const primeiraInstancia = criarIdentidadeLimitadorPorConta('account-ficticia-a', segredoCompartilhado);
  const segundaInstancia = criarIdentidadeLimitadorPorConta('account-ficticia-a', segredoCompartilhado);
  assert.equal(primeiraInstancia, segundaInstancia);
  assert.match(primeiraInstancia, /^[a-f0-9]{64}$/);
  assert.equal(primeiraInstancia.includes('account-ficticia-a'), false);
});

test('separa contas quando calcula chaves Redis a partir de subjects verificados diferentes', () => {
  const segredoCompartilhado = Buffer.alloc(32, 0x62);
  const contaA = criarIdentidadeLimitadorPorConta('account-ficticia-a', segredoCompartilhado);
  const contaB = criarIdentidadeLimitadorPorConta('account-ficticia-b', segredoCompartilhado);
  assert.notEqual(contaA, contaB);
});

test('a mesma conta produz chave diferente quando a chave HMAC muda', () => {
  const contaAComChave1 = criarIdentidadeLimitadorPorConta('account-ficticia-a', Buffer.alloc(32, 0x63));
  const contaAComChave2 = criarIdentidadeLimitadorPorConta('account-ficticia-a', Buffer.alloc(32, 0x64));
  assert.notEqual(contaAComChave1, contaAComChave2);
});

test('recusa subject vazio/grande e segredo de pseudonimização curto ou ausente', () => {
  assert.throws(() => criarIdentidadeLimitadorPorConta(' ', Buffer.alloc(32)), /subject/);
  assert.throws(() => criarIdentidadeLimitadorPorConta('x'.repeat(257), Buffer.alloc(32)), /subject/);
  assert.throws(() => criarIdentidadeLimitadorPorConta('account-ficticia-a', 'curto'), /32 bytes/);
  assert.throws(() => criarIdentidadeLimitadorPorConta('account-ficticia-a'), /32 bytes/);
});

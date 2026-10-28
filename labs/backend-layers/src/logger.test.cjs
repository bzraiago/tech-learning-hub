'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarLogger } = require('./logger.cjs');

test('logger emite JSONL com campos operacionais permitidos', () => {
  const linhas = [];
  const logger = criarLogger({
    agora: () => new Date('2026-10-28T12:00:00.000Z'),
    escreverInfo: (linha) => linhas.push(linha),
    escreverErro: (linha) => linhas.push(linha)
  });

  logger.info('api.started', {
    address: '127.0.0.1:4180',
    storage: 'postgresql',
    cache: 'redis_cache_aside',
    rateLimit: 'redis',
    route: 'GET /api/estudos',
    token: 'segredo-de-teste',
    email: 'aluno@example.test'
  });

  assert.deepEqual(JSON.parse(linhas[0]), {
    timestamp: '2026-10-28T12:00:00.000Z',
    level: 'info',
    event: 'api.started',
    address: '127.0.0.1:4180',
    storage: 'postgresql',
    cache: 'redis_cache_aside',
    rateLimit: 'redis',
    route: 'GET /api/estudos'
  });
  assert.equal(linhas[0].includes('segredo-de-teste'), false);
  assert.equal(linhas[0].includes('aluno@example.test'), false);
});

test('logger omite mensagem, stack, IP e códigos de erro não reconhecidos', () => {
  const linhas = [];
  const logger = criarLogger({
    escreverErro: (linha) => linhas.push(linha)
  });
  const erro = Object.assign(new Error('token=segredo de teste'), { code: 'DADO_PRIVADO' });

  logger.error('api.request.failed', erro, {
    operation: 'request',
    ip: '203.0.113.7',
    body: 'anotação privada'
  });

  const registro = JSON.parse(linhas[0]);
  assert.equal(registro.event, 'api.request.failed');
  assert.equal(registro.level, 'error');
  assert.equal(registro.errorCode, 'Error');
  assert.deepEqual(Object.keys(registro).sort(), ['errorCode', 'event', 'level', 'operation', 'timestamp']);
  assert.equal(linhas[0].includes('segredo'), false);
  assert.equal(linhas[0].includes('203.0.113.7'), false);
  assert.equal(linhas[0].includes('anotação privada'), false);
});

test('logger rejeita nome de evento que possa carregar dados arbitrários', () => {
  const logger = criarLogger({ escreverInfo: () => {} });
  assert.throws(() => logger.info('api.started aluno@example.test'), /identificador estruturado seguro/);
});

test('logger registra falha segura da quota por conta sem incluir identidade ou token', () => {
  const lines = [];
  const logger = criarLogger({ escreverErro: (line) => lines.push(line) });

  logger.error('api.account_rate_limit.unavailable', new Error('private subject'), {
    route: 'POST /api/estudos-por-conta',
    subject: 'account-secret',
    token: 'fixture-token'
  });

  const record = JSON.parse(lines[0]);
  assert.equal(record.level, 'error');
  assert.equal(record.event, 'api.account_rate_limit.unavailable');
  assert.equal(record.route, 'POST /api/estudos-por-conta');
  assert.equal(record.errorCode, 'Error');
  assert.equal(lines[0].includes('account-secret'), false);
  assert.equal(lines[0].includes('fixture-token'), false);
  assert.equal(lines[0].includes('private subject'), false);
});

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarLimitadorRedis } = require('./rate-limiter-redis.cjs');

test('limitador Redis envia uma key versionada e mapeia o TTL para Retry-After', async () => {
  let chamada;
  const clienteRedis = {
    isReady: true,
    async eval(script, opcoes) {
      chamada = { script, opcoes };
      return ['limited', 4, 12];
    }
  };
  const limitador = criarLimitadorRedis(clienteRedis, {
    limite: 3,
    janelaSegundos: 60,
    escopo: 'teste:write'
  });

  const resultado = await limitador.verificar('127.0.0.1');

  assert.equal(chamada.script.includes('redis.call(\'INCR\''), true);
  assert.deepEqual(chamada.opcoes, {
    keys: ['rate:v1:teste:write:127.0.0.1'],
    arguments: ['60', '3']
  });
  assert.deepEqual(resultado, {
    permitido: false,
    total: 4,
    tentarDepoisDeSegundos: 12
  });
});

test('limitador Redis converte allowed e garante Retry-After inteiro positivo', async () => {
  const limitador = criarLimitadorRedis({
    isReady: true,
    async eval() { return ['allowed', '1', '0']; }
  });

  assert.deepEqual(await limitador.verificar('identidade-local'), {
    permitido: true,
    total: 1,
    tentarDepoisDeSegundos: 1
  });
});

test('Redis não pronto, resposta inválida e identidade vazia falham fechados', async () => {
  let chamadas = 0;
  const desconectado = criarLimitadorRedis({
    isReady: false,
    async eval() { chamadas += 1; return ['allowed', 1, 60]; }
  });
  await assert.rejects(desconectado.verificar('127.0.0.1'), /não está pronto/);
  assert.equal(chamadas, 0);

  const respostaInvalida = criarLimitadorRedis({
    isReady: true,
    async eval() { return ['unexpected', 'NaN', -2]; }
  });
  await assert.rejects(respostaInvalida.verificar('127.0.0.1'), /Resposta inválida/);
  await assert.rejects(respostaInvalida.verificar(' '), /identidade/);
});

test('limitador valida política e cliente antes de aceitar chamadas', () => {
  assert.throws(() => criarLimitadorRedis({ eval() {} }, { limite: 0 }), /limite/);
  assert.throws(() => criarLimitadorRedis({ eval() {} }, { janelaSegundos: 0 }), /janelaSegundos/);
  assert.throws(() => criarLimitadorRedis({}), /eval/);
});

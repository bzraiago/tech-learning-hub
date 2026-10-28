'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarLimitadorEmMemoria } = require('./rate-limiter-memory.cjs');

test('limitador local permite três ações, recusa a quarta e separa identidades', async () => {
  const limitador = criarLimitadorEmMemoria({ limite: 3, janelaSegundos: 60 });

  const identidadeA = await Promise.all([
    limitador.verificar('ip-a'),
    limitador.verificar('ip-a'),
    limitador.verificar('ip-a'),
    limitador.verificar('ip-a')
  ]);
  const identidadeB = await limitador.verificar('ip-b');

  assert.deepEqual(identidadeA.map((resultado) => resultado.permitido), [true, true, true, false]);
  assert.equal(identidadeA[3].total, 4);
  assert.equal(identidadeA[3].tentarDepoisDeSegundos, 60);
  assert.deepEqual(identidadeB, {
    permitido: true,
    total: 1,
    tentarDepoisDeSegundos: 60
  });
});

test('janela local expira sem estender o TTL a cada tentativa', async () => {
  let instante = 1000;
  const limitador = criarLimitadorEmMemoria({
    limite: 1,
    janelaSegundos: 10,
    agora: () => instante
  });

  assert.equal((await limitador.verificar('ip-a')).permitido, true);
  instante += 8000;
  const antesDeExpirar = await limitador.verificar('ip-a');
  assert.equal(antesDeExpirar.permitido, false);
  assert.equal(antesDeExpirar.tentarDepoisDeSegundos, 2);

  instante += 2000;
  const depoisDeExpirar = await limitador.verificar('ip-a');
  assert.equal(depoisDeExpirar.permitido, true);
  assert.equal(depoisDeExpirar.total, 1);
});

test('capacidade local cheia falha sem remover uma quota ativa', async () => {
  const limitador = criarLimitadorEmMemoria({
    limite: 1,
    janelaSegundos: 60,
    maximoIdentidades: 1
  });

  await limitador.verificar('ip-a');
  await assert.rejects(limitador.verificar('ip-b'), /sem capacidade/);
  assert.equal((await limitador.verificar('ip-a')).permitido, false);
});

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { createClient } = require('redis');
const { criarServidor } = require('../server.cjs');
const { criarIdentidadeLimitadorPorConta } = require('./account-rate-limit-identity.cjs');
const { criarLimitadorRedis } = require('./rate-limiter-redis.cjs');

const executar = process.env.RUN_REDIS_INTEGRATION === '1';

test('Redis real limita pedidos HTTP, isola keys e falha fechado após desconexão', {
  skip: executar ? false : 'Defina RUN_REDIS_INTEGRATION=1 para usar Redis local.'
}, async (contexto) => {
  const url = process.env.REDIS_URL || 'redis://127.0.0.1:56380';
  const clienteRedis = createClient({
    url,
    disableOfflineQueue: true,
    commandsQueueMaxLength: 100,
    commandOptions: { timeout: 1000 },
    socket: {
      connectTimeout: 1000,
      reconnectStrategy: false
    }
  });
  clienteRedis.on('error', () => {});
  await clienteRedis.connect();

  const idExecucao = randomUUID();
  const escopoDireto = `integration:${idExecucao}`;
  const escopoHttp = `integration-http:${idExecucao}`;
  const identidadeA = `fixture-a-${idExecucao}`;
  const identidadeB = `fixture-b-${idExecucao}`;
  const chavesDoTeste = [
    `rate:v1:${escopoDireto}:${identidadeA}`,
    `rate:v1:${escopoDireto}:${identidadeB}`,
    `rate:v1:${escopoHttp}:127.0.0.1`
  ];
  const limitadorDireto = criarLimitadorRedis(clienteRedis, {
    limite: 3,
    janelaSegundos: 60,
    escopo: escopoDireto
  });
  const limitadorHttp = criarLimitadorRedis(clienteRedis, {
    limite: 3,
    janelaSegundos: 60,
    escopo: escopoHttp
  });

  let gravacoes = 0;
  const servidor = criarServidor({
    async criar(entrada) {
      gravacoes += 1;
      return { sucesso: true, estudo: { id: gravacoes, titulo: entrada.titulo } };
    }
  }, undefined, limitadorHttp);

  try {
    const primeiras = await Promise.all(
      Array.from({ length: 4 }, () => limitadorDireto.verificar(identidadeA))
    );
    const outraIdentidade = await limitadorDireto.verificar(identidadeB);

    assert.equal(primeiras.filter((resultado) => resultado.permitido).length, 3);
    assert.equal(primeiras.filter((resultado) => !resultado.permitido).length, 1);
    assert.deepEqual(primeiras.map((resultado) => resultado.total).sort((a, b) => a - b), [1, 2, 3, 4]);
    assert.equal(primeiras.find((resultado) => !resultado.permitido).tentarDepoisDeSegundos >= 1, true);
    assert.equal(outraIdentidade.permitido, true);
    assert.equal(outraIdentidade.total, 1);

    await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
    const endereco = servidor.address();
    const respostas = [];
    for (let numero = 1; numero <= 4; numero += 1) {
      respostas.push(await fetch(`http://127.0.0.1:${endereco.port}/api/estudos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': `203.0.113.${numero}`
        },
        body: JSON.stringify({ titulo: `Registro ${numero}` })
      }));
    }

    assert.deepEqual(respostas.map((resposta) => resposta.status), [201, 201, 201, 429]);
    assert.equal(Number(respostas[3].headers.get('retry-after')) >= 1, true);
    assert.equal(gravacoes, 3);

    await clienteRedis.del(chavesDoTeste);
    clienteRedis.destroy();
    const logsFalha = [];
    const logOriginal = console.error;
    console.error = (...argumentos) => logsFalha.push(argumentos.join(' '));
    let respostaSemRedis;
    try {
      respostaSemRedis = await fetch(`http://127.0.0.1:${servidor.address().port}/api/estudos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: 'Registro indisponível' })
      });
    } finally {
      console.error = logOriginal;
    }
    assert.equal(respostaSemRedis.status, 503);
    assert.deepEqual(await respostaSemRedis.json(), {
      erro: 'Limitador temporariamente indisponível.'
    });
    assert.equal(gravacoes, 3);
    const registroFalha = JSON.parse(logsFalha[0]);
    assert.equal(registroFalha.event, 'api.rate_limit.unavailable');
    assert.equal(registroFalha.route, 'POST /api/estudos');
    assert.equal(registroFalha.errorCode, 'Error');
    assert.equal(logsFalha.length, 1);
    assert.equal(logsFalha.join(' ').includes(identidadeA), false);
    assert.equal(logsFalha.join(' ').includes('203.0.113.'), false);
  } finally {
    if (servidor.listening) {
      await new Promise((resolve) => servidor.close(resolve));
    }
    if (clienteRedis.isReady) await clienteRedis.del(chavesDoTeste);
    if (clienteRedis.isOpen) clienteRedis.destroy();
  }
});

test('Redis real separa quota HTTP por subject verificado e pseudonimiza a identidade', {
  skip: executar ? false : 'Defina RUN_REDIS_INTEGRATION=1 para usar Redis local.'
}, async () => {
  const urlRedis = process.env.REDIS_URL || 'redis://127.0.0.1:56380';
  const clienteRedis = createClient({
    url: urlRedis,
    disableOfflineQueue: true,
    commandsQueueMaxLength: 100,
    commandOptions: { timeout: 1000 },
    socket: { connectTimeout: 1000, reconnectStrategy: false }
  });
  clienteRedis.on('error', () => {});
  await clienteRedis.connect();

  const idExecucao = randomUUID();
  const escopo = `integration-account:${idExecucao}`;
  const subjectA = `fixture-account-a-${idExecucao}`;
  const subjectB = `fixture-account-b-${idExecucao}`;
  const segredoHmacTeste = Buffer.alloc(32, 0x65);
  const identidadePseudonimizadaA = criarIdentidadeLimitadorPorConta(subjectA, segredoHmacTeste);
  const identidadePseudonimizadaB = criarIdentidadeLimitadorPorConta(subjectB, segredoHmacTeste);
  const chaveRedisA = `rate:v1:${escopo}:${identidadePseudonimizadaA}`;
  const chaveRedisB = `rate:v1:${escopo}:${identidadePseudonimizadaB}`;
  const limitadorPorConta = criarLimitadorRedis(clienteRedis, { limite: 3, janelaSegundos: 60, escopo });
  const sessoesFicticias = new Map([
    ['Bearer fixture-session-a', { subject: subjectA }],
    ['Bearer fixture-session-b', { subject: subjectB }]
  ]);
  let gravacoes = 0;
  const servidor = criarServidor({
    async criar(entrada) {
      gravacoes += 1;
      return { sucesso: true, estudo: { id: gravacoes, titulo: entrada.titulo } };
    }
  }, undefined, {
    async verificar() { throw new Error('A rota de conta não deve consultar o limitador por IP.'); }
  }, {
    async resolverIdentidadeAutenticada(req) {
      return sessoesFicticias.get(req.headers.authorization) || null;
    },
    limitadorPorConta,
    segredoHmacRateLimitConta: segredoHmacTeste
  });

  try {
    await new Promise((resolve, reject) => {
      servidor.once('error', reject);
      servidor.listen(0, '127.0.0.1', resolve);
    });
    const endpoint = `http://127.0.0.1:${servidor.address().port}/api/estudos-por-conta`;
    async function enviar(token, accountIdCliente, numero) {
      return fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
          'X-Account-Id': accountIdCliente
        },
        body: JSON.stringify({ titulo: `Estudo ${numero}`, accountId: accountIdCliente })
      });
    }

    const semSessao = await enviar('Bearer token-inválido', 'conta-a', 0);
    assert.equal(semSessao.status, 401);
    assert.equal(await clienteRedis.exists(chaveRedisA), 0);

    const respostasA = [];
    for (let numero = 1; numero <= 4; numero += 1) {
      respostasA.push(await enviar('Bearer fixture-session-a', 'conta-b', numero));
    }
    const respostaB = await enviar('Bearer fixture-session-b', 'conta-a', 5);

    assert.deepEqual(respostasA.map((resposta) => resposta.status), [201, 201, 201, 429]);
    assert.equal(Number(respostasA[3].headers.get('retry-after')) >= 1, true);
    assert.equal(respostaB.status, 201);
    assert.equal(await clienteRedis.get(chaveRedisA), '4');
    assert.equal(await clienteRedis.get(chaveRedisB), '1');
    assert.equal(chaveRedisA.includes(subjectA), false);
    assert.equal(chaveRedisB.includes(subjectB), false);
    assert.equal(gravacoes, 4);

    await clienteRedis.del([chaveRedisA, chaveRedisB]);
    clienteRedis.destroy();
    const logsFalha = [];
    const logOriginal = console.error;
    console.error = (...argumentos) => logsFalha.push(argumentos.join(' '));
    let respostaSemRedis;
    try {
      respostaSemRedis = await enviar('Bearer fixture-session-a', 'conta-a', 6);
    } finally {
      console.error = logOriginal;
    }
    assert.equal(respostaSemRedis.status, 503);
    assert.deepEqual(await respostaSemRedis.json(), { erro: 'Limitador temporariamente indisponível.' });
    assert.equal(gravacoes, 4);
    assert.equal(logsFalha.length, 1);
    assert.equal(logsFalha[0].includes(subjectA), false);
    assert.equal(logsFalha[0].includes('fixture-session-a'), false);
    assert.equal(JSON.parse(logsFalha[0]).event, 'api.account_rate_limit.unavailable');
  } finally {
    if (servidor.listening) await new Promise((resolve) => servidor.close(resolve));
    if (clienteRedis.isReady) await clienteRedis.del([chaveRedisA, chaveRedisB]);
    if (clienteRedis.isOpen) clienteRedis.destroy();
  }
});

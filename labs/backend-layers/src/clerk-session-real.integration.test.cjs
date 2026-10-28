'use strict';

const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const test = require('node:test');
const { createClient } = require('redis');
const { criarServidor } = require('../server.cjs');
const { criarIdentidadeLimitadorPorConta } = require('./account-rate-limit-identity.cjs');
const { criarVerificadorSessaoClerk } = require('./clerk-session-verifier.cjs');
const { criarLimitadorEmMemoria } = require('./rate-limiter-memory.cjs');
const { criarLimitadorRedis } = require('./rate-limiter-redis.cjs');
const { criarRepositorioEstudos } = require('./repositorio-estudos-memoria.cjs');
const { criarServicoEstudos } = require('./servico-estudos.cjs');

test('uma sessão Clerk validada controla a quota sem expor token ou subject', { timeout: 10000 }, async (contexto) => {
  const token = process.env.CLERK_TEST_SESSION_TOKEN;
  if (typeof token !== 'string' || !token.trim()) {
    throw new Error('Defina CLERK_TEST_SESSION_TOKEN somente na sessão local do processo; não grave nem compartilhe o token.');
  }

  const resolver = criarVerificadorSessaoClerk({
    jwtKey: process.env.CLERK_JWT_KEY,
    issuer: process.env.CLERK_ISSUER,
    authorizedParties: process.env.CLERK_AUTHORIZED_PARTIES
  });
  const identidadeVerificada = await resolver({ headers: { authorization: `Bearer ${token}` } });
  assert.ok(identidadeVerificada, 'a sessão deve ter assinatura, emissor, validade e origem autorizada válidos');

  const segredoHmac = process.env.RATE_LIMIT_HMAC_SECRET;
  const identidadePseudonimizada = criarIdentidadeLimitadorPorConta(identidadeVerificada.subject, segredoHmac);
  const usarRedis = process.env.CLERK_REAL_RATE_LIMITER === 'redis';
  let clienteRedis;
  let chaveRedis;
  let limitadorPorConta;
  let servidor;
  const escopo = `backend-layers:clerk-real-test:${randomUUID()}`;

  contexto.after(async () => {
    if (servidor?.listening) {
      await new Promise((resolve, reject) => {
        servidor.close((erro) => erro ? reject(erro) : resolve());
      });
    }
    if (clienteRedis?.isOpen) {
      if (chaveRedis) await clienteRedis.del(chaveRedis);
      await clienteRedis.destroy();
    }
  });

  if (usarRedis) {
    clienteRedis = createClient({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:56380',
      disableOfflineQueue: true,
      commandsQueueMaxLength: 20,
      commandOptions: { timeout: 1000 },
      socket: { connectTimeout: 1000, reconnectStrategy: false }
    });
    clienteRedis.on('error', () => {});
    try {
      await clienteRedis.connect();
    } catch {
      if (clienteRedis.isOpen) clienteRedis.destroy();
      throw new Error('Redis local indisponível; inicie o serviço descartável do laboratório e tente novamente.');
    }
    limitadorPorConta = criarLimitadorRedis(clienteRedis, {
      limite: 1,
      janelaSegundos: 60,
      escopo
    });
    chaveRedis = `rate:v1:${escopo}:${identidadePseudonimizada}`;
    await clienteRedis.del(chaveRedis);
  } else {
    limitadorPorConta = criarLimitadorEmMemoria({ limite: 1, janelaSegundos: 60 });
  }

  servidor = criarServidor(
    criarServicoEstudos(criarRepositorioEstudos()),
    undefined,
    criarLimitadorEmMemoria(),
    {
      resolverIdentidadeAutenticada: resolver,
      limitadorPorConta,
      segredoHmacRateLimitConta: segredoHmac
    }
  );

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${servidor.address().port}/api/estudos-por-conta`;
  async function enviarPedido(headerAccountId, titulo) {
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Account-Id': headerAccountId
      },
      body: JSON.stringify({ titulo })
    });
  }

  const permitido = await enviarPedido('conta-falsa-a', `Sessão Clerk ${randomUUID()}`);
  const excedente = await enviarPedido('conta-falsa-b', 'Não deve ser gravado');
  const tokenInvalido = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer a.b.c', 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: 'Sessão inválida' })
  });
  const respostaPermitida = await permitido.text();

  assert.equal(permitido.status, 201);
  assert.equal(excedente.status, 429);
  assert.ok(Number(excedente.headers.get('retry-after')) >= 1);
  assert.equal(tokenInvalido.status, 401);
  assert.equal(respostaPermitida.includes(token), false);
  assert.equal(respostaPermitida.includes(identidadeVerificada.subject), false);
});

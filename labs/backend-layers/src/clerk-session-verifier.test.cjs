'use strict';

const assert = require('node:assert/strict');
const { generateKeyPairSync, sign } = require('node:crypto');
const test = require('node:test');
const { criarServidor } = require('../server.cjs');
const { criarIdentidadeLimitadorPorConta } = require('./account-rate-limit-identity.cjs');
const { criarVerificadorSessaoClerk } = require('./clerk-session-verifier.cjs');
const { criarLimitadorEmMemoria } = require('./rate-limiter-memory.cjs');
const { criarRepositorioEstudos } = require('./repositorio-estudos-memoria.cjs');
const { criarServicoEstudos } = require('./servico-estudos.cjs');

const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const chavePublicaPem = publicKey.export({ type: 'spki', format: 'pem' });
const emissor = 'https://bright-lobster-12.clerk.accounts.dev';
const origemAutorizada = 'https://app.example.test';

function criarJwt(claims = {}, chavePrivada = privateKey) {
  const agora = Math.floor(Date.now() / 1000);
  const cabecalho = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: emissor,
    sub: 'user_fixture_a',
    sid: 'sess_fixture_a',
    azp: origemAutorizada,
    iat: agora,
    nbf: agora - 1,
    exp: agora + 60,
    ...claims
  })).toString('base64url');
  const conteudo = `${cabecalho}.${payload}`;
  const assinatura = sign('RSA-SHA256', Buffer.from(conteudo), chavePrivada).toString('base64url');
  return `${conteudo}.${assinatura}`;
}

function criarVerificador(opcoes = {}) {
  return criarVerificadorSessaoClerk({
    jwtKey: chavePublicaPem,
    issuer: emissor,
    authorizedParties: [origemAutorizada],
    ...opcoes
  });
}

test('verifica a assinatura Clerk com a chave pública e devolve apenas o subject da sessão', async () => {
  const verificar = criarVerificador();
  const identidade = await verificar({ headers: { authorization: `Bearer ${criarJwt()}` } });

  assert.deepEqual(identidade, { subject: 'user_fixture_a' });
});

test('recusa token ausente, formato de autorização incorreto e JWT assinado por outra chave', async () => {
  const verificar = criarVerificador();
  const outraChave = generateKeyPairSync('rsa', { modulusLength: 2048 });

  assert.equal(await verificar({ headers: {} }), null);
  assert.equal(await verificar({ headers: { authorization: `Basic ${criarJwt()}` } }), null);
  assert.equal(await verificar({ headers: { authorization: `Bearer ${criarJwt({}, outraChave.privateKey)}` } }), null);
});

test('recusa emissor, origem autorizada, validade temporal e claims de sessão incorretos', async () => {
  const verificar = criarVerificador();
  const casos = [
    ['emissor', criarJwt({ iss: 'https://outro.clerk.accounts.dev' })],
    ['origem', criarJwt({ azp: 'https://origem-nao-autorizada.example' })],
    ['origem ausente', criarJwt({ azp: undefined })],
    ['sessão pendente', criarJwt({ sts: 'pending' })],
    ['expiração', criarJwt({ exp: Math.floor(Date.now() / 1000) - 60 })],
    ['ainda não válido', criarJwt({ nbf: Math.floor(Date.now() / 1000) + 60 })],
    ['subject', criarJwt({ sub: '' })],
    ['sessão', criarJwt({ sid: '' })]
  ];

  for (const [caso, token] of casos) {
    assert.equal(await verificar({ headers: { authorization: `Bearer ${token}` } }), null, caso);
  }
});

test('normaliza PEM com quebras \n e origens sem barra final', async () => {
  const verificar = criarVerificador({
    jwtKey: chavePublicaPem.replace(/\n/g, '\\n'),
    issuer: `${emissor}/`,
    authorizedParties: [`${origemAutorizada}/`]
  });
  assert.deepEqual(
    await verificar({ headers: { authorization: `Bearer ${criarJwt()}` } }),
    { subject: 'user_fixture_a' }
  );
});

test('exige chave pública, emissor HTTPS e ao menos uma origem autorizada', () => {
  assert.throws(() => criarVerificador({ jwtKey: '' }), /CLERK_JWT_KEY/);
  assert.throws(() => criarVerificador({ issuer: 'http://issuer.example' }), /HTTPS/);
  assert.throws(() => criarVerificador({ authorizedParties: [] }), /ao menos uma origem/);
  assert.throws(() => criarVerificador({ authorizedParties: ['http://app.example.test'] }), /origem HTTPS/);
});

test('JWT verificado pelo SDK controla a quota por subject; body e header não escolhem a conta', async (contexto) => {
  const verificar = criarVerificador();
  const token = criarJwt();
  const repositorio = criarRepositorioEstudos();
  const servico = criarServicoEstudos(repositorio);
  const segredoHmac = Buffer.alloc(32, 0x45);
  const limitadorConta = criarLimitadorEmMemoria({ limite: 1, janelaSegundos: 60 });
  const identidadesConsultadas = [];
  const servidor = criarServidor(servico, undefined, criarLimitadorEmMemoria(), {
    resolverIdentidadeAutenticada: verificar,
    limitadorPorConta: {
      verificar(identidade) {
        identidadesConsultadas.push(identidade);
        return limitadorConta.verificar(identidade);
      }
    },
    segredoHmacRateLimitConta: segredoHmac,
    origensAutorizadasConta: [origemAutorizada]
  });

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const url = `http://127.0.0.1:${servidor.address().port}/api/estudos-por-conta`;
  const preflight = await fetch(url, {
    method: 'OPTIONS',
    headers: {
      Origin: origemAutorizada,
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'authorization,content-type'
    }
  });
  const origemBloqueada = await fetch(url, {
    method: 'OPTIONS',
    headers: {
      Origin: 'https://site-nao-autorizado.example',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'authorization,content-type'
    }
  });
  async function criarEstudo(headerAccountId) {
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Origin: origemAutorizada,
        'X-Account-Id': headerAccountId
      },
      body: JSON.stringify({ titulo: 'Quota Clerk real' })
    });
  }

  const permitido = await criarEstudo('conta-inventada-no-header-a');
  const bloqueado = await criarEstudo('conta-inventada-no-header-b');
  const sessaoInvalida = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer a.b.c',
      'Content-Type': 'application/json',
      Origin: origemAutorizada
    },
    body: JSON.stringify({ titulo: 'Não deve gravar' })
  });

  assert.equal(permitido.status, 201);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), origemAutorizada);
  assert.equal(preflight.headers.get('access-control-allow-methods'), 'POST');
  assert.equal(preflight.headers.get('access-control-allow-credentials'), null);
  assert.equal(origemBloqueada.status, 403);
  assert.equal(origemBloqueada.headers.get('access-control-allow-origin'), null);
  assert.equal(permitido.headers.get('access-control-allow-origin'), origemAutorizada);
  assert.equal(bloqueado.status, 429);
  assert.ok(Number(bloqueado.headers.get('retry-after')) >= 1);
  assert.equal(sessaoInvalida.status, 401);
  assert.equal(identidadesConsultadas.length, 2);
  assert.equal(identidadesConsultadas[0], criarIdentidadeLimitadorPorConta('user_fixture_a', segredoHmac));
  assert.equal(identidadesConsultadas[1], identidadesConsultadas[0]);
  assert.equal(identidadesConsultadas.some((identidade) => identidade.includes('user_fixture_a')), false);
  assert.equal(JSON.stringify(await permitido.json()).includes('user_fixture_a'), false);
});

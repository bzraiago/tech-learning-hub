'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { createClient } = require('redis');
const { criarServidor } = require('../server.cjs');
const { criarPoolEstudos } = require('./configuracao-banco.cjs');
const { criarRepositorioEstudosPostgres } = require('./repositorio-estudos-postgres.cjs');
const { criarLimitadorRedis } = require('./rate-limiter-redis.cjs');
const { criarServicoEstudos } = require('./servico-estudos.cjs');
const { criarServicoEstudosComCache } = require('./servico-estudos-cache-aside.cjs');

const executar = process.env.RUN_CACHE_INTEGRATION === '1';

test('cache-aside usa PostgreSQL, invalida após escrita e recorre à fonte se Redis desconecta', {
  skip: executar ? false : 'Defina RUN_CACHE_INTEGRATION=1 com PostgreSQL migrado e Redis local.'
}, async () => {
  const urlRedis = process.env.REDIS_URL || 'redis://127.0.0.1:56380';
  const idExecucao = randomUUID();
  const titulo = `Cache ${idExecucao}`;
  const tituloCanonico = titulo.toLowerCase();
  const chaveCache = `cache:v1:backend-layers:integration:${idExecucao}`;
  const escopoLimite = `cache-integration:${idExecucao}`;
  const chaveContador = `rate:v1:${escopoLimite}:127.0.0.1`;
  const pool = criarPoolEstudos();
  const clienteRedis = createClient({
    url: urlRedis,
    disableOfflineQueue: true,
    commandsQueueMaxLength: 100,
    commandOptions: { timeout: 1000 },
    socket: { connectTimeout: 1000, reconnectStrategy: false }
  });
  const logsCache = [];
  clienteRedis.on('error', () => {});
  let servidor;
  let idEstudo;
  let clienteRedisDestruido = false;
  const chavesTeste = [chaveCache, chaveContador];

  async function limparChavesRedis() {
    const clienteLimpeza = createClient({
      url: urlRedis,
      disableOfflineQueue: true,
      commandOptions: { timeout: 1000 },
      socket: { connectTimeout: 1000, reconnectStrategy: false }
    });
    clienteLimpeza.on('error', () => {});
    try {
      await clienteLimpeza.connect();
      await clienteLimpeza.del(chavesTeste);
    } finally {
      if (clienteLimpeza.isOpen) clienteLimpeza.destroy();
    }
  }

  try {
    await Promise.all([clienteRedis.connect(), pool.query('SELECT 1')]);
    const repositorio = criarRepositorioEstudosPostgres(pool);
    let leiturasDaFonte = 0;
    const servicoFonte = criarServicoEstudos({
      async listar() {
        leiturasDaFonte += 1;
        return repositorio.listar();
      },
      encontrarPorTituloCanonico: (...argumentos) => repositorio.encontrarPorTituloCanonico(...argumentos),
      inserir: (...argumentos) => repositorio.inserir(...argumentos),
      criarComSessao: (...argumentos) => repositorio.criarComSessao(...argumentos)
    });
    const servicoCacheado = criarServicoEstudosComCache(servicoFonte, clienteRedis, {
      ttlSegundos: 20,
      chave: chaveCache,
      registrarFalha: (mensagem) => logsCache.push(mensagem)
    });
    const servidorHttp = criarServidor(
      servicoCacheado,
      undefined,
      criarLimitadorRedis(clienteRedis, { limite: 5, janelaSegundos: 60, escopo: escopoLimite })
    );
    servidor = servidorHttp;
    await new Promise((resolve, reject) => {
      servidorHttp.once('error', reject);
      servidorHttp.listen(0, '127.0.0.1', resolve);
    });
    const baseUrl = `http://127.0.0.1:${servidorHttp.address().port}`;

    const primeiroGet = await fetch(`${baseUrl}/api/estudos`);
    assert.equal(primeiroGet.status, 200);
    assert.equal((await primeiroGet.json()).length >= 2, true);
    assert.equal(leiturasDaFonte, 1, 'cache miss deve consultar PostgreSQL uma vez');
    assert.equal(await clienteRedis.ttl(chaveCache) > 0, true);

    const segundoGet = await fetch(`${baseUrl}/api/estudos`);
    assert.equal(segundoGet.status, 200);
    assert.equal(leiturasDaFonte, 1, 'cache hit deve evitar uma segunda consulta');

    const respostaPost = await fetch(`${baseUrl}/api/estudos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo })
    });
    assert.equal(respostaPost.status, 201);
    const estudoCriado = await respostaPost.json();
    idEstudo = estudoCriado.id;
    assert.equal(estudoCriado.titulo, titulo);
    assert.equal(await clienteRedis.get(chaveCache), null, 'POST confirmado deve invalidar a lista cacheada');

    const terceiroGet = await fetch(`${baseUrl}/api/estudos`);
    assert.equal(terceiroGet.status, 200);
    const estudosAtualizados = await terceiroGet.json();
    assert.equal(estudosAtualizados.some((estudo) => estudo.id === idEstudo && estudo.titulo === titulo), true);
    assert.equal(leiturasDaFonte, 2, 'leitura após a escrita deve recarregar PostgreSQL');

    clienteRedis.destroy();
    clienteRedisDestruido = true;
    const leituraSemRedis = await fetch(`${baseUrl}/api/estudos`);
    assert.equal(leituraSemRedis.status, 200);
    const estudosDeFallback = await leituraSemRedis.json();
    assert.equal(estudosDeFallback.some((estudo) => estudo.id === idEstudo), true);
    assert.equal(leiturasDaFonte, 3, 'GET deve recorrer ao PostgreSQL quando Redis está indisponível');
    assert.equal(logsCache.length, 1);
    assert.match(logsCache[0], /^Falha ao ler cache:/);
    assert.equal(logsCache.every((mensagem) => !mensagem.includes(idExecucao)), true);
  } finally {
    if (servidor && servidor.listening) {
      await new Promise((resolve) => servidor.close(resolve));
    }
    if (idEstudo !== undefined) {
      await pool.query('DELETE FROM estudos WHERE id = $1', [idEstudo]).catch(() => {});
    }
    if (!clienteRedisDestruido && clienteRedis.isReady) {
      await clienteRedis.del(chavesTeste).catch(() => {});
    }
    if (clienteRedis.isOpen) clienteRedis.destroy();
    if (clienteRedisDestruido) await limparChavesRedis().catch(() => {});
    await pool.end();
  }
});

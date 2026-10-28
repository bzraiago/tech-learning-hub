'use strict';

const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { performance } = require('node:perf_hooks');
const { createClient } = require('redis');
const { criarPoolEstudos } = require('../src/configuracao-banco.cjs');
const { criarServicoEstudosComCache } = require('../src/servico-estudos-cache-aside.cjs');
const { criarServidor } = require('../server.cjs');

function lerInteiro(nome, padrao, minimo, maximo) {
  const bruto = process.env[nome];
  const valor = bruto === undefined ? padrao : Number(bruto);
  if (!Number.isSafeInteger(valor) || valor < minimo || valor > maximo) {
    throw new Error(`${nome} precisa ser inteiro entre ${minimo} e ${maximo}`);
  }
  return valor;
}

function percentil(amostras, fracao) {
  const ordenadas = [...amostras].sort((a, b) => a - b);
  const indice = Math.max(0, Math.ceil(fracao * ordenadas.length) - 1);
  return Number(ordenadas[indice].toFixed(2));
}

function resumirLatencia(amostras) {
  return {
    p50Ms: percentil(amostras, 0.5),
    p95Ms: percentil(amostras, 0.95)
  };
}

function abrirServidor(servico) {
  const limitadorLocal = {
    async verificar() {
      return { permitido: true, tentarDepoisDeSegundos: 1 };
    }
  };
  const servidor = criarServidor(servico, undefined, limitadorLocal);
  return new Promise((resolve, reject) => {
    const falhar = (erro) => reject(erro);
    servidor.once('error', falhar);
    servidor.listen(0, '127.0.0.1', () => {
      servidor.removeListener('error', falhar);
      resolve(servidor);
    });
  });
}

async function fecharServidor(servidor) {
  if (!servidor?.listening) return;
  servidor.closeAllConnections();
  await new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  });
}

async function medirGet(url, quantidadeEsperada) {
  const inicio = performance.now();
  const resposta = await fetch(`${url}/api/estudos`);
  const estudos = await resposta.json();
  const duracaoMs = performance.now() - inicio;
  assert.equal(resposta.status, 200, 'GET deve responder 200');
  assert.equal(estudos.length, quantidadeEsperada, 'resposta deve conter todas as linhas temporárias');
  return { duracaoMs, estudos };
}

function lerVersaoRedis(info) {
  return info.match(/^redis_version:([^\r\n]+)/m)?.[1] || 'indisponível';
}

async function executar() {
  const quantidadeLinhas = lerInteiro('BENCHMARK_ROWS', 500, 1, 5000);
  const iteracoes = lerInteiro('BENCHMARK_ITERATIONS', 30, 5, 500);
  const ttlSegundos = lerInteiro('CACHE_TTL_SECONDS', 30, 1, 86400);
  const idExecucao = randomUUID();
  const chave = `cache:v1:backend-layers:benchmark:${idExecucao}`;
  const pool = criarPoolEstudos();
  const redis = createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:56380' });
  const operacoesRedis = { get: 0, getHits: 0, setEx: 0, del: 0 };
  const redisInstrumentado = {
    async get(...argumentos) {
      operacoesRedis.get += 1;
      const valor = await redis.get(...argumentos);
      if (valor !== null) operacoesRedis.getHits += 1;
      return valor;
    },
    async setEx(...argumentos) {
      operacoesRedis.setEx += 1;
      return redis.setEx(...argumentos);
    },
    async del(...argumentos) {
      operacoesRedis.del += 1;
      return redis.del(...argumentos);
    }
  };
  const servidorDiretoRef = { atual: undefined };
  const servidorCacheRef = { atual: undefined };
  let clientePostgres;
  let resultado;
  let versaoPostgres = 'indisponível';
  let versaoRedis = 'indisponível';
  let leiturasPostgresDireto = 0;
  let leiturasPostgresCache = 0;

  redis.on('error', () => {});

  try {
    clientePostgres = await pool.connect();
    await redis.connect();
    await redis.ping();

    const infoPostgres = await clientePostgres.query('SHOW server_version');
    versaoPostgres = infoPostgres.rows[0].server_version;
    versaoRedis = lerVersaoRedis(await redis.info('server'));

    await clientePostgres.query(`
      CREATE TEMP TABLE estudos_cache_benchmark (
        id integer PRIMARY KEY,
        titulo text NOT NULL
      ) ON COMMIT PRESERVE ROWS
    `);
    await clientePostgres.query(
      `INSERT INTO estudos_cache_benchmark (id, titulo)
       SELECT numero, 'Estudo fictício de benchmark ' || numero
       FROM generate_series(1, $1::integer) AS serie(numero)`,
      [quantidadeLinhas]
    );
    await clientePostgres.query('ANALYZE estudos_cache_benchmark');

    const servicoDireto = {
      async listar() {
        leiturasPostgresDireto += 1;
        const consulta = await clientePostgres.query(
          'SELECT id, titulo FROM estudos_cache_benchmark ORDER BY id'
        );
        return consulta.rows;
      }
    };
    const servicoComCache = criarServicoEstudosComCache({
      async listar() {
        leiturasPostgresCache += 1;
        const consulta = await clientePostgres.query(
          'SELECT id, titulo FROM estudos_cache_benchmark ORDER BY id'
        );
        return consulta.rows;
      }
    }, redisInstrumentado, { ttlSegundos, chave, registrarFalha: () => {} });

    servidorDiretoRef.atual = await abrirServidor(servicoDireto);
    servidorCacheRef.atual = await abrirServidor(servicoComCache);
    const urlDireto = `http://127.0.0.1:${servidorDiretoRef.atual.address().port}`;
    const urlCache = `http://127.0.0.1:${servidorCacheRef.atual.address().port}`;

    let respostaEsperada;
    for (let indice = 0; indice < 5; indice += 1) {
      const direto = await medirGet(urlDireto, quantidadeLinhas);
      const cache = await medirGet(urlCache, quantidadeLinhas);
      assert.deepEqual(cache.estudos, direto.estudos, 'os dois modos devem retornar os mesmos dados');
      respostaEsperada = direto.estudos;
    }
    assert.equal(respostaEsperada?.length, quantidadeLinhas);
    assert.equal(await redis.ttl(chave) > 0, true, 'a key aquecida deve ter TTL');

    leiturasPostgresDireto = 0;
    leiturasPostgresCache = 0;
    operacoesRedis.get = 0;
    operacoesRedis.getHits = 0;
    operacoesRedis.setEx = 0;
    operacoesRedis.del = 0;

    const latenciasDireto = [];
    const latenciasCache = [];
    for (let indice = 0; indice < iteracoes; indice += 1) {
      const ordem = indice % 2 === 0
        ? [['direto', urlDireto], ['cache', urlCache]]
        : [['cache', urlCache], ['direto', urlDireto]];
      for (const [modo, url] of ordem) {
        const medicao = await medirGet(url, quantidadeLinhas);
        assert.deepEqual(medicao.estudos, respostaEsperada, 'a resposta deve permanecer igual nos dois modos');
        if (modo === 'direto') {
          latenciasDireto.push(medicao.duracaoMs);
        } else {
          latenciasCache.push(medicao.duracaoMs);
        }
      }
    }

    const bytesDaKey = Number(await redis.sendCommand(['STRLEN', chave]));
    const memoriaDaKey = await redis.sendCommand(['MEMORY', 'USAGE', chave]);
    const memoriaRedis = await redis.info('memory');
    const memoriaRedisBytes = Number(memoriaRedis.match(/^used_memory:(\d+)/m)?.[1] || 0);
    const consultasEvitadas = Math.max(0, leiturasPostgresDireto - leiturasPostgresCache);

    resultado = {
      benchmark: 'PostgreSQL direto versus API com cache-aside Redis',
      perfil: {
        linhasFicticiasTemporarias: quantidadeLinhas,
        aquecimentoPorModo: 5,
        paresMedidos: iteracoes,
        ttlSegundos,
        conexoes: 'uma API, uma conexão PostgreSQL e Redis local'
      },
      ambiente: {
        node: process.version,
        plataforma: process.platform,
        postgresql: versaoPostgres,
        redis: versaoRedis,
        transporte: 'HTTP em loopback 127.0.0.1'
      },
      resultados: {
        postgresDireto: {
          ...resumirLatencia(latenciasDireto),
          consultasPostgres: leiturasPostgresDireto
        },
        cacheAquecido: {
          ...resumirLatencia(latenciasCache),
          consultasPostgres: leiturasPostgresCache,
          leiturasRedis: operacoesRedis.get,
          escritasRedis: operacoesRedis.setEx,
          taxaDeHit: `${operacoesRedis.getHits}/${operacoesRedis.get}`
        },
        consultasPostgresEvitadas: `${consultasEvitadas}/${leiturasPostgresDireto}`,
        redis: {
          bytesDoValor: bytesDaKey,
          memoriaAtribuidaAKeyBytes: memoriaDaKey === null ? null : Number(memoriaDaKey),
          memoriaTotalNoMomentoBytes: memoriaRedisBytes
        }
      },
      limites: [
        'Medição sequencial, local, em um processo e com cache já aquecido; não representa concorrência ou tráfego de produção.',
        'O cache inclui um GET Redis por pedido; o resultado mede a latência completa HTTP, não somente SELECT ou GET.',
        'Memória da key é observável localmente; custo financeiro mensal não foi calculado porque os serviços são containers locais sem tarifação.'
      ]
    };
  } finally {
    await Promise.allSettled([
      fecharServidor(servidorDiretoRef.atual),
      fecharServidor(servidorCacheRef.atual)
    ]);
    if (redis.isReady) await redis.del(chave).catch(() => {});
    if (redis.isOpen) redis.destroy();
    if (clientePostgres) {
      await clientePostgres.query('DROP TABLE IF EXISTS estudos_cache_benchmark').catch(() => {});
      clientePostgres.release();
    }
    await pool.end();
  }

  console.log(JSON.stringify(resultado, null, 2));
}

executar().catch((erro) => {
  console.error(`Benchmark não concluído: ${erro.code || erro.name || 'erro desconhecido'}`);
  process.exitCode = 1;
});

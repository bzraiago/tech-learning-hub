'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { criarServicoEstudos } = require('./src/servico-estudos.cjs');
const { criarRepositorioEstudosPostgres } = require('./src/repositorio-estudos-postgres.cjs');
const { criarPoolEstudos } = require('./src/configuracao-banco.cjs');
const { criarRepositorioEstudos } = require('./src/repositorio-estudos-memoria.cjs');
const { criarClienteOpenMeteo } = require('./src/cliente-open-meteo.cjs');
const { criarRotaPrevisao } = require('./src/rota-previsao.cjs');
const { criarLimitadorRedis } = require('./src/rate-limiter-redis.cjs');
const { criarLimitadorEmMemoria } = require('./src/rate-limiter-memory.cjs');
const { criarServicoEstudosComCache } = require('./src/servico-estudos-cache-aside.cjs');
const { logger } = require('./src/logger.cjs');
const { createClient } = require('redis');

const pagina = path.join(__dirname, 'index.html');
const paginaDemo = path.join(__dirname, 'demo', 'index.html');
const scriptDemo = path.join(__dirname, 'demo', 'app.js');
const limiteCorpo = 1024;

function responderJson(res, status, dados, cabecalhos = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    ...cabecalhos
  });
  res.end(JSON.stringify(dados));
}

function aplicarCabecalhosSeguros(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

function obterIdentidadePorIpObservado(req) {
  const endereco = req.socket.remoteAddress;
  if (typeof endereco !== 'string' || !endereco.trim()) {
    throw new Error('Endereço remoto indisponível');
  }
  return endereco.startsWith('::ffff:') ? endereco.slice('::ffff:'.length) : endereco;
}

function obterRotaSeguraParaLog(req) {
  const caminho = req.url.split('?')[0];
  if (req.method === 'GET' && (caminho === '/api/previsao' || caminho === '/api/labs/open-meteo')) {
    return `GET ${caminho}`;
  }
  const rota = `${req.method} ${caminho}`;
  const rotasConhecidas = new Set([
    'GET /api/estudos',
    'POST /api/estudos',
    'POST /api/estudos-com-sessao'
  ]);
  return rotasConhecidas.has(rota) ? rota : 'other';
}

async function verificarLimiteDeGravacao(req, res, limitador) {
  let decisao;
  try {
    decisao = await limitador.verificar(obterIdentidadePorIpObservado(req));
    if (
      !decisao ||
      typeof decisao.permitido !== 'boolean' ||
      !Number.isInteger(decisao.tentarDepoisDeSegundos) ||
      decisao.tentarDepoisDeSegundos < 1
    ) {
      throw new Error('Resposta inválida do limitador');
    }
  } catch (erro) {
    logger.error('api.rate_limit.unavailable', erro, { route: obterRotaSeguraParaLog(req) });
    responderJson(res, 503, { erro: 'Limitador temporariamente indisponível.' });
    return false;
  }

  if (!decisao.permitido) {
    responderJson(
      res,
      429,
      { erro: 'Limite de gravações atingido. Tente novamente depois.' },
      { 'Retry-After': String(decisao.tentarDepoisDeSegundos) }
    );
    return false;
  }
  return true;
}

async function lerJson(req) {
  let tamanho = 0;
  const partes = [];
  for await (const parte of req) {
    tamanho += parte.length;
    if (tamanho > limiteCorpo) return { erro: 'Corpo muito grande', status: 413 };
    partes.push(parte);
  }
  try {
    return { dados: JSON.parse(Buffer.concat(partes).toString('utf8')) };
  } catch {
    return { erro: 'JSON inválido', status: 400 };
  }
}

async function responder(req, res, servico, rotaPrevisao, limitador, verificarProntidao) {
  if (req.method === 'GET' && req.url === '/health/live') {
    responderJson(res, 200, { status: 'alive' }, { 'Cache-Control': 'no-store' });
    return;
  }
  if (req.method === 'GET' && req.url === '/health/ready') {
    try {
      await verificarProntidao();
      responderJson(res, 200, { status: 'ready' }, { 'Cache-Control': 'no-store' });
    } catch (erro) {
      logger.error('api.readiness.failed', erro, { route: 'GET /health/ready' });
      responderJson(res, 503, { status: 'not_ready' }, { 'Cache-Control': 'no-store' });
    }
    return;
  }
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(pagina).pipe(res);
    return;
  }
  if (req.method === 'GET' && (req.url === '/demo/' || req.url === '/demo/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(paginaDemo).pipe(res);
    return;
  }
  if (req.method === 'GET' && req.url === '/demo/app.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
    fs.createReadStream(scriptDemo).pipe(res);
    return;
  }
  if (req.method === 'GET' && req.url === '/api/estudos') {
    responderJson(res, 200, await servico.listar());
    return;
  }
  if (
    req.url === '/api/previsao' || req.url.startsWith('/api/previsao?') ||
    req.url === '/api/labs/open-meteo' || req.url.startsWith('/api/labs/open-meteo?')
  ) {
    await rotaPrevisao(req, res);
    return;
  }
  if (req.method === 'POST' && req.url === '/api/estudos') {
    if (!await verificarLimiteDeGravacao(req, res, limitador)) return;
    if (!/^application\/json(?:\s*;|\s*$)/i.test(req.headers['content-type'] || '')) {
      responderJson(res, 415, { erro: 'Use Content-Type: application/json' });
      return;
    }
    const leitura = await lerJson(req);
    if (leitura.erro) {
      responderJson(res, leitura.status, { erro: leitura.erro });
      return;
    }
    const resultado = await servico.criar(leitura.dados);
    if (!resultado.sucesso) {
      responderJson(res, resultado.status, { erro: resultado.erro });
      return;
    }
    responderJson(res, 201, resultado.estudo);
    return;
  }
  if (req.method === 'POST' && req.url === '/api/estudos-com-sessao') {
    if (!await verificarLimiteDeGravacao(req, res, limitador)) return;
    if (!/^application\/json(?:\s*;|\s*$)/i.test(req.headers['content-type'] || '')) {
      responderJson(res, 415, { erro: 'Use Content-Type: application/json' });
      return;
    }
    const leitura = await lerJson(req);
    if (leitura.erro) {
      responderJson(res, leitura.status, { erro: leitura.erro });
      return;
    }
    const resultado = await servico.criarComSessao(leitura.dados);
    if (!resultado.sucesso) {
      responderJson(res, resultado.status, { erro: resultado.erro });
      return;
    }
    responderJson(res, 201, resultado.resultado);
    return;
  }
  responderJson(res, 404, { erro: 'Rota não encontrada' });
}

function criarServidor(servico, servicoPrevisao, limitador, { verificarProntidao = async () => {} } = {}) {
  if (!limitador || typeof limitador.verificar !== 'function') {
    throw new TypeError('Informe um limitador de gravações com verificar()');
  }
  if (typeof verificarProntidao !== 'function') {
    throw new TypeError('verificarProntidao precisa ser uma função');
  }
  const rotaPrevisao = criarRotaPrevisao(servicoPrevisao);
  return http.createServer((req, res) => {
    aplicarCabecalhosSeguros(res);
    responder(req, res, servico, rotaPrevisao, limitador, verificarProntidao).catch((erro) => {
      logger.error('api.request.failed', erro, { route: obterRotaSeguraParaLog(req) });
      if (!res.headersSent) {
        responderJson(res, 500, { erro: 'Falha interna do servidor' });
      } else {
        res.destroy();
      }
    });
  });
}

if (require.main === module) {
  async function iniciar() {
    const usarMemoria = process.env.BACKEND_STORAGE === 'memory';
    const pool = usarMemoria ? undefined : criarPoolEstudos();
    const repositorio = usarMemoria
      ? criarRepositorioEstudos()
      : criarRepositorioEstudosPostgres(pool);
    const servico = criarServicoEstudos(repositorio);
    const servicoPrevisao = criarClienteOpenMeteo();
    let clienteRedis;
    let limitador;
    let servicoDaApi = servico;

    if (usarMemoria) {
      limitador = criarLimitadorEmMemoria();
    } else {
      clienteRedis = createClient({
        url: process.env.REDIS_URL || 'redis://127.0.0.1:56380',
        disableOfflineQueue: true,
        commandsQueueMaxLength: 100,
        commandOptions: { timeout: 1000 },
        socket: {
          connectTimeout: 1000,
          reconnectStrategy: false
        }
      });
      clienteRedis.on('error', (erro) => {
        logger.error('api.redis.connection.failed', erro);
      });
      servicoDaApi = criarServicoEstudosComCache(servico, clienteRedis, {
        ttlSegundos: Number(process.env.CACHE_TTL_SECONDS || 30)
      });
      limitador = criarLimitadorRedis(clienteRedis, {
        limite: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 3),
        janelaSegundos: Number(process.env.RATE_LIMIT_WINDOW_SECONDS || 60)
      });
      try {
        await clienteRedis.connect();
      } catch (erro) {
        if (clienteRedis.isOpen) clienteRedis.destroy();
        throw erro;
      }
    }

    const verificarProntidao = async () => {
      if (usarMemoria) return;
      if (!clienteRedis?.isReady) throw new Error('Redis indisponível');
      await Promise.all([pool.query('SELECT 1'), clienteRedis.ping()]);
    };
    const servidor = criarServidor(servicoDaApi, servicoPrevisao, limitador, { verificarProntidao });
    servidor.listen(4180, '127.0.0.1', () => {
      logger.info('api.started', {
        address: '127.0.0.1:4180',
        storage: usarMemoria ? 'memory' : 'postgresql',
        cache: usarMemoria ? 'disabled' : 'redis_cache_aside',
        rateLimit: usarMemoria ? 'memory_local' : 'redis'
      });
    });

    function encerrar() {
      servidor.close(async () => {
        if (repositorio.encerrar) await repositorio.encerrar();
        if (clienteRedis && clienteRedis.isOpen) clienteRedis.destroy();
        logger.info('api.stopped');
      });
    }

    process.once('SIGINT', encerrar);
    process.once('SIGTERM', encerrar);
  }

  iniciar().catch((erro) => {
    logger.error('api.startup.failed', erro);
    process.exitCode = 1;
  });
}

module.exports = { criarServidor };

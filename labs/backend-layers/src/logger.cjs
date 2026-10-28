'use strict';

const EVENTOS_PERMITIDOS = new Set([
  'api.started', 'api.stopped', 'api.request.failed', 'api.rate_limit.unavailable',
  'api.redis.connection.failed', 'api.postgres.idle_connection.failed',
  'api.weather.integration.failed', 'api.readiness.failed', 'api.startup.failed',
  'cache.read.failed', 'cache.fill.failed', 'cache.invalidation.failed',
  'monitor.started', 'monitor.stopped', 'monitor.alert.opened', 'monitor.alert.resolved'
]);
const CODIGOS_ERRO_SEGUROS = new Set([
  'ECONNREFUSED', 'ETIMEDOUT', 'ECONNRESET', 'ENOTFOUND', 'EAI_AGAIN',
  'EPIPE', 'EHOSTUNREACH', 'EADDRINUSE', 'EACCES', 'EPERM', 'ENOENT',
  'ENOMEM', 'EEXIST', 'EIO'
]);
const NOMES_ERRO_SEGUROS = new Set([
  'Error', 'TypeError', 'RangeError', 'SyntaxError', 'AbortError', 'TimeoutError'
]);
const VALORES_DE_CAMPO = {
  address: /^127\.0\.0\.1:\d{1,5}$/,
  route: new Set([
    'GET /api/estudos', 'POST /api/estudos', 'POST /api/estudos-com-sessao',
    'GET /api/previsao', 'GET /api/labs/open-meteo', 'GET /health/ready', 'other'
  ]),
  storage: new Set(['memory', 'postgresql']),
  cache: new Set(['disabled', 'redis_cache_aside']),
  rateLimit: new Set(['memory_local', 'redis']),
  category: new Set(['autenticacao', 'rede', 'http', 'resposta_invalida', 'tempo_limite', 'integracao']),
  operation: new Set(['startup', 'shutdown', 'rate_limit', 'request', 'redis_connection', 'postgres_connection', 'weather', 'cache_read', 'cache_fill', 'cache_invalidation'])
};

function obterCodigoErroSeguro(erro) {
  const codigo = erro && erro.code;
  if (typeof codigo === 'string') {
    if (CODIGOS_ERRO_SEGUROS.has(codigo) || /^\d{5}$/.test(codigo)) return codigo;
  }

  const nome = erro && erro.name;
  return NOMES_ERRO_SEGUROS.has(nome) ? nome : 'UNKNOWN';
}

function filtrarCampos(campos) {
  if (!campos || typeof campos !== 'object' || Array.isArray(campos)) return {};
  const seguros = {};
  for (const [nome, valor] of Object.entries(campos)) {
    const regra = VALORES_DE_CAMPO[nome];
    if (!regra) continue;
    const valido = regra instanceof Set ? regra.has(valor) : typeof valor === 'string' && regra.test(valor);
    if (valido) seguros[nome] = valor;
  }
  return seguros;
}

function criarLogger({
  agora = () => new Date(),
  escreverInfo = (linha) => console.log(linha),
  escreverErro = (linha) => console.error(linha)
} = {}) {
  function emitir(nivel, evento, campos, erro) {
    if (!EVENTOS_PERMITIDOS.has(evento)) {
      throw new TypeError('evento precisa ser um identificador estruturado seguro');
    }
    const registro = {
      timestamp: agora().toISOString(),
      level: nivel,
      event: evento,
      ...filtrarCampos(campos)
    };
    if (erro !== undefined) registro.errorCode = obterCodigoErroSeguro(erro);
    const escrever = nivel === 'info' ? escreverInfo : escreverErro;
    escrever(JSON.stringify(registro));
  }

  return {
    info(evento, campos) {
      emitir('info', evento, campos);
    },
    error(evento, erro, campos) {
      emitir('error', evento, campos, erro);
    }
  };
}

const logger = criarLogger();

module.exports = { criarLogger, logger, obterCodigoErroSeguro };

'use strict';

const CHAVE_LISTA_ESTUDOS = 'cache:v1:backend-layers:studies:list';
const { logger } = require('./logger.cjs');

function validarRespostaCacheada(estudos) {
  return Array.isArray(estudos) && estudos.every((estudo) => (
    estudo &&
    (Number.isSafeInteger(estudo.id) || (typeof estudo.id === 'string' && estudo.id.length > 0)) &&
    typeof estudo.titulo === 'string' && estudo.titulo.trim().length > 0
  ));
}

function criarServicoEstudosComCache(servico, clienteRedis, {
  ttlSegundos = 30,
  chave = CHAVE_LISTA_ESTUDOS,
  registrarFalha = (evento, erro) => logger.error(evento, erro)
} = {}) {
  if (!servico || typeof servico.listar !== 'function') {
    throw new TypeError('servico precisa oferecer listar()');
  }
  if (!clienteRedis || ['get', 'setEx', 'del'].some((metodo) => typeof clienteRedis[metodo] !== 'function')) {
    throw new TypeError('clienteRedis precisa oferecer get(), setEx() e del()');
  }
  if (!Number.isInteger(ttlSegundos) || ttlSegundos < 1) {
    throw new TypeError('ttlSegundos precisa ser um inteiro positivo');
  }
  if (typeof chave !== 'string' || !chave.startsWith('cache:v1:')) {
    throw new TypeError('chave precisa usar o namespace versionado cache:v1:');
  }
  if (typeof registrarFalha !== 'function') {
    throw new TypeError('registrarFalha precisa ser uma função');
  }

  let leituraDaFonteEmAndamento;

  function registrarErro(evento, erro) {
    registrarFalha(evento, erro);
  }

  async function invalidarLista() {
    try {
      await clienteRedis.del(chave);
    } catch (erro) {
      // A escrita já foi confirmada na fonte; não transforme sucesso em falha aparente.
      // O TTL limita por quanto tempo uma cópia antiga ainda pode ser devolvida.
      registrarErro('cache.invalidation.failed', erro);
    }
  }

  async function carregarDaFonte(podePreencher) {
    if (!leituraDaFonteEmAndamento) {
      leituraDaFonteEmAndamento = (async () => {
        const estudos = await servico.listar();
        if (podePreencher) {
          try {
            await clienteRedis.setEx(chave, ttlSegundos, JSON.stringify(estudos));
          } catch (erro) {
            registrarErro('cache.fill.failed', erro);
          }
        }
        return estudos;
      })();
    }

    const leituraCompartilhada = leituraDaFonteEmAndamento;
    try {
      return await leituraCompartilhada;
    } finally {
      if (leituraDaFonteEmAndamento === leituraCompartilhada) {
        leituraDaFonteEmAndamento = undefined;
      }
    }
  }

  return {
    async listar() {
      let podePreencher = true;
      try {
        const serializado = await clienteRedis.get(chave);
        if (serializado !== null) {
          const estudos = JSON.parse(serializado);
          if (!validarRespostaCacheada(estudos)) {
            throw Object.assign(new Error('Estrutura inválida no cache'), { code: 'CACHE_INVALID' });
          }
          return estudos;
        }
      } catch (erro) {
        registrarErro('cache.read.failed', erro);
        if (erro.code !== 'CACHE_INVALID' && !(erro instanceof SyntaxError)) {
          podePreencher = false;
        }
      }

      return carregarDaFonte(podePreencher);
    },

    async criar(...argumentos) {
      const resultado = await servico.criar(...argumentos);
      if (resultado && resultado.sucesso) await invalidarLista();
      return resultado;
    },

    async criarComSessao(...argumentos) {
      const resultado = await servico.criarComSessao(...argumentos);
      if (resultado && resultado.sucesso) await invalidarLista();
      return resultado;
    }
  };
}

module.exports = { CHAVE_LISTA_ESTUDOS, criarServicoEstudosComCache };

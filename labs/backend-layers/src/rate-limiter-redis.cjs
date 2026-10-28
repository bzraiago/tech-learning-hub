'use strict';

const fs = require('node:fs');
const path = require('node:path');

const fixedWindowScriptPath = path.join(
  __dirname,
  '..',
  '..',
  'redis-fundamentals',
  'fixed-window.lua'
);
const fixedWindowScript = fs.readFileSync(fixedWindowScriptPath, 'utf8');

function validarPolitica({ limite, janelaSegundos }) {
  if (!Number.isInteger(limite) || limite < 1) {
    throw new TypeError('limite precisa ser um inteiro positivo');
  }
  if (!Number.isInteger(janelaSegundos) || janelaSegundos < 1) {
    throw new TypeError('janelaSegundos precisa ser um inteiro positivo');
  }
}

function criarLimitadorRedis(clienteRedis, {
  limite = 3,
  janelaSegundos = 60,
  escopo = 'backend-layers:write'
} = {}) {
  validarPolitica({ limite, janelaSegundos });
  if (!clienteRedis || typeof clienteRedis.eval !== 'function') {
    throw new TypeError('clienteRedis precisa oferecer eval()');
  }
  if (typeof escopo !== 'string' || !escopo.trim()) {
    throw new TypeError('escopo precisa ser um texto não vazio');
  }

  return {
    async verificar(identidade) {
      if (typeof identidade !== 'string' || !identidade.trim()) {
        throw new TypeError('identidade precisa ser um texto não vazio');
      }
      if (clienteRedis.isReady === false) {
        throw new Error('Redis do limitador não está pronto');
      }

      const chave = `rate:v1:${escopo}:${identidade}`;
      const resultado = await clienteRedis.eval(fixedWindowScript, {
        keys: [chave],
        arguments: [String(janelaSegundos), String(limite)]
      });

      if (!Array.isArray(resultado) || resultado.length !== 3) {
        throw new Error('Resposta inválida do limitador Redis');
      }

      const [decisao, totalRecebido, ttlRecebido] = resultado;
      const total = Number(totalRecebido);
      const ttl = Number(ttlRecebido);
      if (
        !['allowed', 'limited'].includes(decisao) ||
        !Number.isSafeInteger(total) || total < 1 ||
        !Number.isFinite(ttl) || ttl < 0
      ) {
        throw new Error('Resposta inválida do limitador Redis');
      }

      return {
        permitido: decisao === 'allowed',
        total,
        tentarDepoisDeSegundos: Math.max(1, Math.ceil(ttl))
      };
    }
  };
}

module.exports = { criarLimitadorRedis };

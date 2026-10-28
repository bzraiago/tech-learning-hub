'use strict';

function criarLimitadorEmMemoria({
  limite = 3,
  janelaSegundos = 60,
  maximoIdentidades = 1000,
  agora = Date.now
} = {}) {
  if (!Number.isInteger(limite) || limite < 1) {
    throw new TypeError('limite precisa ser um inteiro positivo');
  }
  if (!Number.isInteger(janelaSegundos) || janelaSegundos < 1) {
    throw new TypeError('janelaSegundos precisa ser um inteiro positivo');
  }
  if (!Number.isInteger(maximoIdentidades) || maximoIdentidades < 1) {
    throw new TypeError('maximoIdentidades precisa ser um inteiro positivo');
  }
  if (typeof agora !== 'function') {
    throw new TypeError('agora precisa ser uma função');
  }

  const contadores = new Map();
  const janelaMs = janelaSegundos * 1000;

  return {
    async verificar(identidade) {
      if (typeof identidade !== 'string' || !identidade.trim()) {
        throw new TypeError('identidade precisa ser um texto não vazio');
      }

      const instante = agora();
      for (const [chave, contador] of contadores) {
        if (contador.expiraEm <= instante) contadores.delete(chave);
      }

      let contador = contadores.get(identidade);
      if (!contador) {
        if (contadores.size >= maximoIdentidades) {
          throw new Error('Limitador local sem capacidade para nova identidade');
        }
        contador = { total: 0, expiraEm: instante + janelaMs };
        contadores.set(identidade, contador);
      }

      contador.total += 1;
      return {
        permitido: contador.total <= limite,
        total: contador.total,
        tentarDepoisDeSegundos: Math.max(
          1,
          Math.ceil((contador.expiraEm - instante) / 1000)
        )
      };
    }
  };
}

module.exports = { criarLimitadorEmMemoria };

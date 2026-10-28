'use strict';

function criarMonitorDisponibilidade({
  verificar,
  limiteFalhas = 2,
  aoAlertar = () => {},
  aoRecuperar = () => {}
} = {}) {
  if (typeof verificar !== 'function') throw new TypeError('verificar precisa ser uma função');
  if (!Number.isInteger(limiteFalhas) || limiteFalhas < 1) {
    throw new TypeError('limiteFalhas precisa ser um inteiro positivo');
  }
  if (typeof aoAlertar !== 'function' || typeof aoRecuperar !== 'function') {
    throw new TypeError('callbacks de alerta precisam ser funções');
  }

  let falhasConsecutivas = 0;
  let alertaAberto = false;
  let estado = 'unknown';

  async function sondar() {
    let disponivel = false;
    try {
      disponivel = (await verificar()) === true;
    } catch {
      disponivel = false;
    }

    if (disponivel) {
      falhasConsecutivas = 0;
      estado = 'available';
      if (alertaAberto) {
        alertaAberto = false;
        aoRecuperar();
      }
      return { estado: 'available', falhasConsecutivas };
    }

    falhasConsecutivas += 1;
    if (!alertaAberto && falhasConsecutivas >= limiteFalhas) {
      alertaAberto = true;
      aoAlertar();
    }
    estado = alertaAberto ? 'unavailable' : 'degraded';
    return {
      estado,
      falhasConsecutivas
    };
  }

  return {
    sondar,
    obterEstado() {
      return {
        estado,
        falhasConsecutivas,
        alertaAberto
      };
    }
  };
}

module.exports = { criarMonitorDisponibilidade };

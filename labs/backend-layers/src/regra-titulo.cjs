'use strict';

function normalizarTitulo(titulo) {
  return titulo.trim().toLocaleLowerCase('pt-BR');
}

module.exports = { normalizarTitulo };

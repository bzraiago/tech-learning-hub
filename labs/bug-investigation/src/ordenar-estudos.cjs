'use strict';

function ordenarEstudosPorTitulo(estudos) {
  return estudos.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
}

module.exports = { ordenarEstudosPorTitulo };

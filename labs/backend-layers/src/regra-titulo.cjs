'use strict';

function normalizarTitulo(titulo) {
  return titulo.trim().toLocaleLowerCase('pt-BR');
}

function avaliarTituloUnico(titulo, encontrarPorTituloCanonico) {
  const tituloCanonico = normalizarTitulo(titulo);
  return {
    tituloCanonico,
    duplicado: Boolean(encontrarPorTituloCanonico(tituloCanonico))
  };
}

module.exports = { normalizarTitulo, avaliarTituloUnico };

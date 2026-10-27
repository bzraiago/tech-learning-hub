'use strict';

function normalizarTitulo(titulo) {
  return titulo.trim().toLocaleLowerCase('pt-BR');
}

async function avaliarTituloUnico(titulo, encontrarPorTituloCanonico) {
  const tituloCanonico = normalizarTitulo(titulo);
  return {
    tituloCanonico,
    duplicado: Boolean(await encontrarPorTituloCanonico(tituloCanonico))
  };
}

module.exports = { normalizarTitulo, avaliarTituloUnico };

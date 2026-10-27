'use strict';

function validarEstudo(entrada) {
  if (entrada === null || typeof entrada !== 'object' || Array.isArray(entrada)) {
    return { valido: false, erro: 'Envie um objeto com o campo titulo' };
  }

  if (Object.keys(entrada).length !== 1 || typeof entrada.titulo !== 'string') {
    return { valido: false, erro: 'Envie somente titulo como texto' };
  }

  const titulo = entrada.titulo.trim();
  if (titulo.length < 1 || titulo.length > 80) {
    return { valido: false, erro: 'titulo deve ter de 1 a 80 caracteres' };
  }

  return { valido: true, valor: { titulo } };
}

function validarEstudoComSessao(entrada) {
  if (entrada === null || typeof entrada !== 'object' || Array.isArray(entrada)) {
    return { valido: false, erro: 'Envie um objeto com titulo e minutos' };
  }

  if (Object.keys(entrada).length !== 2 || typeof entrada.titulo !== 'string') {
    return { valido: false, erro: 'Envie somente titulo como texto e minutos como número' };
  }

  const titulo = entrada.titulo.trim();
  if (titulo.length < 1 || titulo.length > 80) {
    return { valido: false, erro: 'titulo deve ter de 1 a 80 caracteres' };
  }
  if (!Number.isInteger(entrada.minutos) || entrada.minutos < 1) {
    return { valido: false, erro: 'minutos deve ser um número inteiro maior que zero' };
  }

  return { valido: true, valor: { titulo, minutos: entrada.minutos } };
}

module.exports = { validarEstudo, validarEstudoComSessao };

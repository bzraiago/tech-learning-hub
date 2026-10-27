'use strict';

const { validarEstudo } = require('./validar-estudo.cjs');
const { normalizarTitulo } = require('./regra-titulo.cjs');

function criarServicoEstudos(repositorio) {
  return {
    listar() {
      return repositorio.listar();
    },
    criar(entrada) {
      const validacao = validarEstudo(entrada);
      if (!validacao.valido) {
        return { sucesso: false, status: 400, erro: validacao.erro };
      }

      const tituloCanonico = normalizarTitulo(validacao.valor.titulo);
      if (repositorio.encontrarPorTituloCanonico(tituloCanonico)) {
        return { sucesso: false, status: 409, erro: 'Já existe um estudo com esse título' };
      }

      return {
        sucesso: true,
        estudo: repositorio.inserir(validacao.valor.titulo, tituloCanonico)
      };
    }
  };
}

module.exports = { criarServicoEstudos };

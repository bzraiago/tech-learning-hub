'use strict';

const { validarEstudo } = require('./validar-estudo.cjs');
const { avaliarTituloUnico } = require('./regra-titulo.cjs');

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

      const regraTitulo = avaliarTituloUnico(
        validacao.valor.titulo,
        (tituloCanonico) => repositorio.encontrarPorTituloCanonico(tituloCanonico)
      );
      if (regraTitulo.duplicado) {
        return { sucesso: false, status: 409, erro: 'Já existe um estudo com esse título' };
      }

      return {
        sucesso: true,
        estudo: repositorio.inserir(validacao.valor.titulo, regraTitulo.tituloCanonico)
      };
    }
  };
}

module.exports = { criarServicoEstudos };

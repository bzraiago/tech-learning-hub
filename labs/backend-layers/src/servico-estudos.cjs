'use strict';

const { validarEstudo } = require('./validar-estudo.cjs');
const { avaliarTituloUnico } = require('./regra-titulo.cjs');

function criarServicoEstudos(repositorio) {
  return {
    async listar() {
      return repositorio.listar();
    },
    async criar(entrada) {
      const validacao = validarEstudo(entrada);
      if (!validacao.valido) {
        return { sucesso: false, status: 400, erro: validacao.erro };
      }

      const regraTitulo = await avaliarTituloUnico(
        validacao.valor.titulo,
        (tituloCanonico) => repositorio.encontrarPorTituloCanonico(tituloCanonico)
      );
      if (regraTitulo.duplicado) {
        return { sucesso: false, status: 409, erro: 'Já existe um estudo com esse título' };
      }

      return {
        sucesso: true,
        estudo: await repositorio.inserir(validacao.valor.titulo, regraTitulo.tituloCanonico)
      };
    }
  };
}

module.exports = { criarServicoEstudos };

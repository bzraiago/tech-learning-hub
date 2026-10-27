'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarServicoEstudos } = require('./servico-estudos.cjs');

test('serviço responde 409 se a restrição única rejeita um título concorrente', async () => {
  const repositorio = {
    async listar() { return []; },
    async encontrarPorTituloCanonico() { return null; },
    async inserir() {
      const erro = new Error('violação de unicidade');
      erro.code = '23505';
      erro.constraint = 'estudos_titulo_canonico_unico';
      throw erro;
    }
  };

  const resultado = await criarServicoEstudos(repositorio).criar({ titulo: 'CSS' });

  assert.deepEqual(resultado, {
    sucesso: false,
    status: 409,
    erro: 'Já existe um estudo com esse título'
  });
});

test('serviço não transforma falhas de conexão em conflito de título', async () => {
  const falhaBanco = Object.assign(new Error('conexão indisponível'), { code: 'ECONNREFUSED' });
  const repositorio = {
    async listar() { return []; },
    async encontrarPorTituloCanonico() { return null; },
    async inserir() { throw falhaBanco; }
  };

  await assert.rejects(
    () => criarServicoEstudos(repositorio).criar({ titulo: 'CSS' }),
    falhaBanco
  );
});

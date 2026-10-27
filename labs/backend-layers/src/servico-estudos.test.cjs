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

test('serviço envia estudo e sessão juntos ao repositório', async () => {
  const chamadas = [];
  const repositorio = {
    async encontrarPorTituloCanonico() { return null; },
    async criarComSessao(...argumentos) {
      chamadas.push(argumentos);
      return { estudo: { id: 3, titulo: 'CSS' }, sessao: { id: 1, minutos: 25 } };
    }
  };

  const resultado = await criarServicoEstudos(repositorio).criarComSessao({ titulo: ' CSS ', minutos: 25 });

  assert.deepEqual(chamadas, [['CSS', 'css', 25]]);
  assert.deepEqual(resultado, {
    sucesso: true,
    resultado: { estudo: { id: 3, titulo: 'CSS' }, sessao: { id: 1, minutos: 25 } }
  });
});

test('serviço recusa sessão inválida antes de consultar o repositório', async () => {
  let consultado = false;
  const repositorio = {
    async encontrarPorTituloCanonico() { consultado = true; return null; }
  };

  const resultado = await criarServicoEstudos(repositorio).criarComSessao({ titulo: 'CSS', minutos: 0 });

  assert.equal(resultado.sucesso, false);
  assert.equal(resultado.status, 400);
  assert.equal(consultado, false);
});

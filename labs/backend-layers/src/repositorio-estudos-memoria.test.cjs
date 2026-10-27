'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarRepositorioEstudos } = require('./repositorio-estudos-memoria.cjs');
const { criarServicoEstudos } = require('./servico-estudos.cjs');

test('duas criações simultâneas do mesmo título deixam apenas um estudo', async () => {
  const repositorio = criarRepositorioEstudos();
  const servico = criarServicoEstudos(repositorio);

  const resultados = await Promise.all([
    servico.criar({ titulo: ' CSS ' }),
    servico.criar({ titulo: 'css' })
  ]);

  assert.equal(resultados.filter((resultado) => resultado.sucesso).length, 1);
  assert.equal(resultados.filter((resultado) => resultado.status === 409).length, 1);
  assert.equal((await repositorio.listar()).length, 3);
});

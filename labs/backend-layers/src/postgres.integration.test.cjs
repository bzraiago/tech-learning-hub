'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { criarPoolEstudos } = require('./configuracao-banco.cjs');
const { criarRepositorioEstudosPostgres } = require('./repositorio-estudos-postgres.cjs');

test('PostgreSQL mantém a criação após reconectar e impede duplicidade no banco', {
  skip: process.env.RUN_PG_INTEGRATION !== '1'
}, async () => {
  const tituloCanonico = `integracao-${randomUUID()}`;
  const titulo = `Integração ${tituloCanonico}`;
  const primeiroPool = criarPoolEstudos();
  const segundoPool = criarPoolEstudos();
  let primeiroPoolEncerrado = false;

  try {
    const primeiroRepositorio = criarRepositorioEstudosPostgres(primeiroPool);
    const criado = await primeiroRepositorio.inserir(titulo, tituloCanonico);
    assert.equal(criado.titulo, titulo);
    await primeiroPool.end();
    primeiroPoolEncerrado = true;

    const segundoRepositorio = criarRepositorioEstudosPostgres(segundoPool);
    assert.deepEqual(
      await segundoRepositorio.encontrarPorTituloCanonico(tituloCanonico),
      criado
    );
    await assert.rejects(
      () => segundoRepositorio.inserir(titulo, tituloCanonico),
      (erro) => erro.code === '23505' && erro.constraint === 'estudos_titulo_canonico_unico'
    );
  } finally {
    const poolLimpeza = segundoPool;
    await poolLimpeza.query('DELETE FROM estudos WHERE titulo_canonico = $1', [tituloCanonico]).catch(() => {});
    if (!primeiroPoolEncerrado) await primeiroPool.end();
    await segundoPool.end();
  }
});

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { criarPoolEstudos, criarPoolMigracoes } = require('./configuracao-banco.cjs');
const { criarRepositorioEstudosPostgres } = require('./repositorio-estudos-postgres.cjs');

test('PostgreSQL mantém dados após reconectar e reverte operações parciais', {
  skip: process.env.RUN_PG_INTEGRATION !== '1'
}, async () => {
  const tituloCanonico = `integracao-${randomUUID()}`;
  const titulo = `Integração ${tituloCanonico}`;
  const tituloSessaoCanonico = `sessao-${randomUUID()}`;
  const tituloRollbackCanonico = `rollback-${randomUUID()}`;
  const primeiroPool = criarPoolEstudos();
  const segundoPool = criarPoolEstudos();
  const poolLimpeza = criarPoolMigracoes();
  let primeiroPoolEncerrado = false;

  try {
    const primeiroRepositorio = criarRepositorioEstudosPostgres(primeiroPool);
    const criado = await primeiroRepositorio.inserir(titulo, tituloCanonico);
    assert.equal(criado.titulo, titulo);

    await assert.rejects(
      () => primeiroRepositorio.criarComSessao(`Teste ${tituloRollbackCanonico}`, tituloRollbackCanonico, 0),
      (erro) => erro.code === '23514'
    );
    assert.equal(await primeiroRepositorio.encontrarPorTituloCanonico(tituloRollbackCanonico), null);

    const comSessao = await primeiroRepositorio.criarComSessao(
      `Integração ${tituloSessaoCanonico}`,
      tituloSessaoCanonico,
      25
    );
    assert.equal(comSessao.sessao.minutos, 25);
    await primeiroPool.end();
    primeiroPoolEncerrado = true;

    const segundoRepositorio = criarRepositorioEstudosPostgres(segundoPool);
    assert.deepEqual(
      await segundoRepositorio.encontrarPorTituloCanonico(tituloCanonico),
      criado
    );
    assert.deepEqual(
      await segundoRepositorio.encontrarPorTituloCanonico(tituloSessaoCanonico),
      comSessao.estudo
    );
    const sessoes = await segundoPool.query(
      'SELECT minutos FROM sessoes_estudo WHERE estudo_id = $1 ORDER BY id',
      [comSessao.estudo.id]
    );
    assert.deepEqual(sessoes.rows.map((sessao) => sessao.minutos), [25]);
    await assert.rejects(
      () => segundoRepositorio.inserir(titulo, tituloCanonico),
      (erro) => erro.code === '23505' && erro.constraint === 'estudos_titulo_canonico_unico'
    );
  } finally {
    const titulos = [tituloCanonico, tituloSessaoCanonico, tituloRollbackCanonico];
    await poolLimpeza.query(
      'DELETE FROM sessoes_estudo WHERE estudo_id IN (SELECT id FROM estudos WHERE titulo_canonico = ANY($1::text[]))',
      [titulos]
    ).catch(() => {});
    await poolLimpeza.query(
      'DELETE FROM estudos WHERE titulo_canonico = ANY($1::text[])',
      [titulos]
    ).catch(() => {});
    if (!primeiroPoolEncerrado) await primeiroPool.end();
    await segundoPool.end();
    await poolLimpeza.end();
  }
});

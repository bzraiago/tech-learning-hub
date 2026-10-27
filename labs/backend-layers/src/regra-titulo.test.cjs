'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizarTitulo, avaliarTituloUnico } = require('./regra-titulo.cjs');

test('normalizarTitulo remove espaços externos e ignora diferenças de caixa', () => {
  assert.equal(normalizarTitulo('  CSS  '), 'css');
  assert.equal(normalizarTitulo('ÁRVORE'), 'árvore');
});

test('avaliarTituloUnico procura o título canônico e indica duplicidade', async () => {
  const chamadas = [];
  const resultado = await avaliarTituloUnico('  Css ', async (tituloCanonico) => {
    chamadas.push(tituloCanonico);
    return { id: 3, titulo: 'CSS' };
  });

  assert.deepEqual(chamadas, ['css']);
  assert.deepEqual(resultado, { tituloCanonico: 'css', duplicado: true });
});

test('avaliarTituloUnico permite título sem correspondência', async () => {
  const resultado = await avaliarTituloUnico('TypeScript', async () => null);
  assert.deepEqual(resultado, { tituloCanonico: 'typescript', duplicado: false });
});

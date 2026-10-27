'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizarTitulo, avaliarTituloUnico } = require('./regra-titulo.cjs');

test('normalizarTitulo remove espaços externos e ignora diferenças de caixa', () => {
  assert.equal(normalizarTitulo('  CSS  '), 'css');
  assert.equal(normalizarTitulo('ÁRVORE'), 'árvore');
});

test('avaliarTituloUnico procura o título canônico e indica duplicidade', () => {
  const chamadas = [];
  const resultado = avaliarTituloUnico('  Css ', (tituloCanonico) => {
    chamadas.push(tituloCanonico);
    return { id: 3, titulo: 'CSS' };
  });

  assert.deepEqual(chamadas, ['css']);
  assert.deepEqual(resultado, { tituloCanonico: 'css', duplicado: true });
});

test('avaliarTituloUnico permite título sem correspondência', () => {
  const resultado = avaliarTituloUnico('TypeScript', () => null);
  assert.deepEqual(resultado, { tituloCanonico: 'typescript', duplicado: false });
});

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { ordenarEstudosPorTitulo } = require('../src/ordenar-estudos.cjs');

function criarEstudos() {
  return [
    { titulo: 'JavaScript' },
    { titulo: 'CSS' },
    { titulo: 'HTML' }
  ];
}

test('devolve os títulos em ordem alfabética', () => {
  const ordenados = ordenarEstudosPorTitulo(criarEstudos());

  assert.deepEqual(
    ordenados.map((estudo) => estudo.titulo),
    ['CSS', 'HTML', 'JavaScript']
  );
});

test('preserva a lista original ao ordenar', () => {
  const estudos = criarEstudos();
  const titulosOriginais = estudos.map((estudo) => estudo.titulo);
  const ordenados = ordenarEstudosPorTitulo(estudos);

  assert.notStrictEqual(ordenados, estudos);
  assert.deepEqual(
    estudos.map((estudo) => estudo.titulo),
    titulosOriginais
  );
});

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { validarEstudoComSessao } = require('./validar-estudo.cjs');

test('valida estudo e sessão para um pedido atômico', () => {
  assert.deepEqual(validarEstudoComSessao({ titulo: ' CSS ', minutos: 25 }), {
    valido: true,
    valor: { titulo: 'CSS', minutos: 25 }
  });
});

test('recusa duração que não seja inteiro positivo', () => {
  assert.equal(validarEstudoComSessao({ titulo: 'CSS', minutos: 0 }).valido, false);
  assert.equal(validarEstudoComSessao({ titulo: 'CSS', minutos: 2.5 }).valido, false);
  assert.equal(validarEstudoComSessao({ titulo: 'CSS', minutos: '25' }).valido, false);
});

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const caminho = path.join(__dirname, '..', 'vercel.json');
const config = JSON.parse(fs.readFileSync(caminho, 'utf8'));
const regraGlobal = config.headers?.find((regra) => regra.source === '/(.*)');
assert.ok(regraGlobal, 'Os cabeçalhos devem alcançar páginas, assets e funções.');

const valores = new Map(regraGlobal.headers.map(({ key, value }) => [key.toLowerCase(), value]));
const esperados = new Map([
  ['x-content-type-options', 'nosniff'],
  ['x-frame-options', 'DENY'],
  ['referrer-policy', 'strict-origin-when-cross-origin'],
  ['permissions-policy', 'camera=(), microphone=(), geolocation=()']
]);

for (const [nome, valor] of esperados) {
  assert.equal(valores.get(nome), valor, `Cabeçalho ausente ou inesperado: ${nome}`);
}

console.log(`Configuração Vercel válida: ${esperados.size} cabeçalhos globais de segurança.`);

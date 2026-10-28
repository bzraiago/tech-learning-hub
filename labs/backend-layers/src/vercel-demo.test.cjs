'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

test('handler de Vercel compartilha a rota e recusa métodos diferentes de GET', async () => {
  const modulo = await import('../../../api/labs/open-meteo.mjs');
  const resposta = {
    statusCode: 0,
    cabecalhos: {},
    corpo: '',
    setHeader(nome, valor) { this.cabecalhos[nome] = valor; },
    end(corpo) { this.corpo = corpo; }
  };

  await modulo.default({ method: 'POST', url: '/api/labs/open-meteo' }, resposta);

  assert.equal(resposta.statusCode, 405);
  assert.equal(resposta.cabecalhos.Allow, 'GET');
  assert.equal(resposta.cabecalhos['Content-Type'], 'application/json; charset=utf-8');
  assert.deepEqual(JSON.parse(resposta.corpo), { erro: 'Método não permitido.' });
});

test('handler de Vercel rejeita coordenadas ausentes antes de chamar a rede', async () => {
  const modulo = await import('../../../api/labs/open-meteo.mjs');
  const resposta = {
    statusCode: 0,
    cabecalhos: {},
    corpo: '',
    setHeader(nome, valor) { this.cabecalhos[nome] = valor; },
    end(corpo) { this.corpo = corpo; }
  };

  await modulo.default({ method: 'GET', url: '/api/labs/open-meteo?latitude=-3.73' }, resposta);

  assert.equal(resposta.statusCode, 400);
  assert.deepEqual(JSON.parse(resposta.corpo), {
    erro: 'Informe latitude e longitude válidas.'
  });
});

test('handler público só aceita coordenadas fixas e habilita cache curto da Vercel', async () => {
  const modulo = await import('../../../api/labs/open-meteo.mjs');
  const resposta = {
    statusCode: 0,
    cabecalhos: {},
    corpo: '',
    setHeader(nome, valor) { this.cabecalhos[nome] = valor; },
    end(corpo) { this.corpo = corpo; }
  };

  await modulo.default({
    method: 'GET',
    url: '/api/labs/open-meteo?latitude=0&longitude=0'
  }, resposta);

  assert.equal(resposta.statusCode, 400);
  assert.equal(resposta.cabecalhos['Cache-Control'], 'public, s-maxage=300, stale-while-revalidate=600');
  assert.deepEqual(JSON.parse(resposta.corpo), {
    erro: 'Esta demonstração pública usa coordenadas aproximadas fixas.'
  });
});

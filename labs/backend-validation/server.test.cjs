'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { servidor } = require('./server.cjs');

test('o servidor valida o pedido antes de criar um estudo', async () => {
  servidor.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  const origem = `http://127.0.0.1:${servidor.address().port}`;
  const enviar = (body, contentType = 'application/json') => fetch(`${origem}/api/estudos`, {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body
  });

  try {
    const pagina = await fetch(origem);
    assert.equal(pagina.status, 200);
    assert.match(await pagina.text(), /<form id="formulario">/);

    const antes = await (await fetch(`${origem}/api/estudos`)).json();
    assert.equal(antes.length, 2);

    const tipoErrado = await enviar(JSON.stringify({ titulo: 'CSS' }), 'text/plain');
    assert.equal(tipoErrado.status, 415);

    const jsonInvalido = await enviar('{');
    assert.equal(jsonInvalido.status, 400);

    const corpoGrande = await enviar(JSON.stringify({ titulo: 'x'.repeat(1100) }));
    assert.equal(corpoGrande.status, 413);

    for (const dados of [null, [], { titulo: 3 }, { titulo: '   ' }, { titulo: 'x'.repeat(81) }, { titulo: 'CSS', id: 99 }]) {
      const resposta = await enviar(JSON.stringify(dados));
      assert.equal(resposta.status, 400);
      assert.equal(typeof (await resposta.json()).erro, 'string');
    }

    const aindaDois = await (await fetch(`${origem}/api/estudos`)).json();
    assert.deepEqual(aindaDois, antes);

    const criado = await enviar(JSON.stringify({ titulo: '  CSS  ' }));
    assert.equal(criado.status, 201);
    assert.match(criado.headers.get('content-type'), /application\/json/);
    assert.deepEqual(await criado.json(), { id: 3, titulo: 'CSS' });

    const depois = await (await fetch(`${origem}/api/estudos`)).json();
    assert.equal(depois.length, 3);
    assert.deepEqual(depois.at(-1), { id: 3, titulo: 'CSS' });
  } finally {
    await new Promise((resolve) => servidor.close(resolve));
  }
});

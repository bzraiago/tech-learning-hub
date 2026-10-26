'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { servidor } = require('./server.cjs');

test('interface e API respondem na mesma origem', async () => {
  servidor.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  const origem = `http://127.0.0.1:${servidor.address().port}`;
  try {
    const pagina = await fetch(origem);
    assert.equal(pagina.status, 200);
    assert.match(pagina.headers.get('content-type'), /text\/html/);
    assert.match(await pagina.text(), /fetch\('\/api\/estudos'\)/);

    const api = await fetch(`${origem}/api/estudos`);
    assert.equal(api.status, 200);
    assert.match(api.headers.get('content-type'), /application\/json/);
    assert.deepEqual(await api.json(), [
      { id: 1, titulo: 'HTML' },
      { id: 2, titulo: 'JavaScript' }
    ]);

    const ausente = await fetch(`${origem}/inexistente`);
    assert.equal(ausente.status, 404);
    assert.deepEqual(await ausente.json(), { erro: 'Rota não encontrada' });
  } finally {
    await new Promise((resolve) => servidor.close(resolve));
  }
});

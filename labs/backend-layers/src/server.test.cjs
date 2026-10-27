'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor } = require('../server.cjs');

test('falha inesperada do serviço retorna 500 sem expor detalhes internos', async (contexto) => {
  const servidor = criarServidor({
    async listar() { throw new Error('detalhe privado do banco'); }
  });

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/estudos`);

  assert.equal(resposta.status, 500);
  assert.deepEqual(await resposta.json(), { erro: 'Falha interna do servidor' });
});

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

test('rota da transação retorna estudo e sessão na mesma resposta 201', async (contexto) => {
  const entradaRecebida = [];
  const servidor = criarServidor({
    async criarComSessao(entrada) {
      entradaRecebida.push(entrada);
      return {
        sucesso: true,
        resultado: {
          estudo: { id: 4, titulo: entrada.titulo },
          sessao: { id: 2, estudoId: 4, minutos: entrada.minutos }
        }
      };
    }
  });

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/estudos-com-sessao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: 'CSS', minutos: 25 })
  });

  assert.equal(resposta.status, 201);
  assert.deepEqual(entradaRecebida, [{ titulo: 'CSS', minutos: 25 }]);
  assert.deepEqual(await resposta.json(), {
    estudo: { id: 4, titulo: 'CSS' },
    sessao: { id: 2, estudoId: 4, minutos: 25 }
  });
});

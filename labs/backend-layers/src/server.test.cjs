'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor } = require('../server.cjs');
const { ErroOpenMeteo } = require('./cliente-open-meteo.cjs');

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

test('rota meteorológica valida coordenadas antes da chamada externa', async (contexto) => {
  let chamadas = 0;
  const servidor = criarServidor({}, {
    async consultar() { chamadas += 1; return {}; }
  });
  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/previsao?latitude=&longitude=-38.52`);

  assert.equal(resposta.status, 400);
  assert.deepEqual(await resposta.json(), { erro: 'Informe latitude e longitude válidas.' });
  assert.equal(chamadas, 0);
});

test('rota meteorológica repassa coordenadas válidas ao serviço injetado', async (contexto) => {
  let coordenadasRecebidas;
  const previsao = {
    latitude: -3.75,
    longitude: -38.5,
    temperatura: 29.4,
    unidade: '°C',
    umidade: 71,
    unidadeUmidade: '%',
    horario: '2026-10-27T10:00',
    fusoHorario: 'America/Fortaleza'
  };
  const servidor = criarServidor({}, {
    async consultar(coordenadas) {
      coordenadasRecebidas = coordenadas;
      return previsao;
    }
  });
  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/previsao?latitude=-3.73&longitude=-38.52`);

  assert.equal(resposta.status, 200);
  assert.deepEqual(coordenadasRecebidas, { latitude: -3.73, longitude: -38.52 });
  assert.deepEqual(await resposta.json(), previsao);
});

test('falha externa de autenticação retorna mensagem segura e sem detalhes', async (contexto) => {
  const servidor = criarServidor({}, {
    async consultar() {
      throw new ErroOpenMeteo('autenticacao');
    }
  });
  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/previsao?latitude=-3.73&longitude=-38.52`);
  const dados = await resposta.json();

  assert.equal(resposta.status, 502);
  assert.deepEqual(dados, {
    erro: 'Não foi possível obter a previsão agora.',
    codigo: 'autenticacao'
  });
  assert.equal(JSON.stringify(dados).includes('token'), false);
});

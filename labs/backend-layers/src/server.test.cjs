'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor } = require('../server.cjs');
const { ErroOpenMeteo } = require('./cliente-open-meteo.cjs');
const { criarLimitadorEmMemoria } = require('./rate-limiter-memory.cjs');

function criarServidorComLimitadorMemoria(servico, previsao) {
  return criarServidor(servico, previsao, criarLimitadorEmMemoria());
}

test('falha inesperada do serviço retorna 500 sem expor detalhes internos', async (contexto) => {
  const servidor = criarServidorComLimitadorMemoria({
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
  const servidor = criarServidorComLimitadorMemoria({
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
  const servidor = criarServidorComLimitadorMemoria({}, {
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
  const servidor = criarServidorComLimitadorMemoria({}, {
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
  const servidor = criarServidorComLimitadorMemoria({}, {
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

test('rate limit conta gravações por IP observado, ignora X-Forwarded-For e impede efeito recusado', async (contexto) => {
  let gravacoes = 0;
  const identidades = [];
  const servidor = criarServidor({
    async criar(entrada) {
      gravacoes += 1;
      return { sucesso: true, estudo: { id: gravacoes, titulo: entrada.titulo } };
    }
  }, undefined, {
    async verificar(identidade) {
      identidades.push(identidade);
      return {
        permitido: identidades.length <= 3,
        tentarDepoisDeSegundos: 19
      };
    }
  });

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const respostas = [];
  for (let numero = 1; numero <= 4; numero += 1) {
    respostas.push(await fetch(`http://127.0.0.1:${endereco.port}/api/estudos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': `203.0.113.${numero}`
      },
      body: JSON.stringify({ titulo: `Curso ${numero}` })
    }));
  }

  assert.deepEqual(respostas.map((resposta) => resposta.status), [201, 201, 201, 429]);
  assert.equal(respostas[3].headers.get('retry-after'), '19');
  assert.deepEqual(await respostas[3].json(), {
    erro: 'Limite de gravações atingido. Tente novamente depois.'
  });
  assert.equal(gravacoes, 3);
  assert.equal(new Set(identidades).size, 1);
  assert.equal(identidades[0], '127.0.0.1');
});

test('Redis indisponível falha fechado com 503 antes de alterar dados', async (contexto) => {
  let gravacoes = 0;
  const servidor = criarServidor({
    async criar() {
      gravacoes += 1;
      return { sucesso: true, estudo: { id: gravacoes, titulo: 'CSS' } };
    }
  }, undefined, {
    async verificar() { throw Object.assign(new Error('detalhe interno'), { code: 'ECONNREFUSED' }); }
  });

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/estudos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: 'CSS' })
  });

  assert.equal(resposta.status, 503);
  assert.deepEqual(await resposta.json(), { erro: 'Limitador temporariamente indisponível.' });
  assert.equal(gravacoes, 0);
});

test('GET permanece disponível e não consulta o limitador Redis', async (contexto) => {
  let chamadasAoLimitador = 0;
  const servidor = criarServidor({ async listar() { return [{ id: 1, titulo: 'HTML' }]; } }, undefined, {
    async verificar() { chamadasAoLimitador += 1; throw new Error('não deveria consultar'); }
  });

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/estudos`);
  assert.equal(resposta.status, 200);
  assert.deepEqual(await resposta.json(), [{ id: 1, titulo: 'HTML' }]);
  assert.equal(chamadasAoLimitador, 0);
});

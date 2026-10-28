'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor } = require('../server.cjs');
const { ErroOpenMeteo } = require('./cliente-open-meteo.cjs');
const { criarLimitadorEmMemoria } = require('./rate-limiter-memory.cjs');

function criarServidorComLimitadorMemoria(servico, previsao, options) {
  return criarServidor(servico, previsao, criarLimitadorEmMemoria(), options);
}

test('health live e ready não expõem detalhes e ready verifica dependências', async (contexto) => {
  let verificacoes = 0;
  const servidor = criarServidorComLimitadorMemoria({}, undefined, {
    async verificarProntidao() { verificacoes += 1; }
  });
  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const baseUrl = `http://127.0.0.1:${servidor.address().port}`;
  const live = await fetch(`${baseUrl}/health/live`);
  assert.equal(live.status, 200);
  assert.deepEqual(await live.json(), { status: 'alive' });
  assert.equal(live.headers.get('cache-control'), 'no-store');
  assert.equal(verificacoes, 0, 'liveness não deve sondar dependências');

  const ready = await fetch(`${baseUrl}/health/ready`);
  assert.equal(ready.status, 200);
  assert.deepEqual(await ready.json(), { status: 'ready' });
  assert.equal(ready.headers.get('cache-control'), 'no-store');
  assert.equal(verificacoes, 1);
});

test('readiness retorna 503 e loga evento seguro se uma dependência falha', async (contexto) => {
  const servidor = criarServidorComLimitadorMemoria({}, undefined, {
    async verificarProntidao() { throw Object.assign(new Error('token privado'), { code: 'TOKEN_PRIVADO' }); }
  });
  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const logs = [];
  const logOriginal = console.error;
  console.error = (linha) => logs.push(linha);
  let resposta;
  try {
    resposta = await fetch(`http://127.0.0.1:${servidor.address().port}/health/ready`);
  } finally {
    console.error = logOriginal;
  }

  assert.equal(resposta.status, 503);
  assert.deepEqual(await resposta.json(), { status: 'not_ready' });
  const registro = JSON.parse(logs[0]);
  assert.equal(registro.event, 'api.readiness.failed');
  assert.equal(registro.route, 'GET /health/ready');
  assert.equal(registro.errorCode, 'Error');
  assert.equal(logs.join(' ').includes('token privado'), false);
});

test('falha inesperada do serviço retorna 500 sem expor detalhes internos', async (contexto) => {
  const servidor = criarServidorComLimitadorMemoria({
    async listar() { throw new Error('detalhe privado do banco'); }
  });

  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const endereco = servidor.address();
  const logs = [];
  const logOriginal = console.error;
  console.error = (linha) => logs.push(linha);
  let resposta;
  try {
    resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/estudos`);
  } finally {
    console.error = logOriginal;
  }

  assert.equal(resposta.status, 500);
  assert.deepEqual(await resposta.json(), { erro: 'Falha interna do servidor' });
  assert.equal(logs.length, 1);
  const registroFalha = JSON.parse(logs[0]);
  assert.deepEqual(Object.keys(registroFalha).sort(), ['errorCode', 'event', 'level', 'route', 'timestamp']);
  assert.equal(registroFalha.route, 'GET /api/estudos');
  assert.equal(JSON.stringify(logs).includes('detalhe privado do banco'), false);
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
  const logs = [];
  const logOriginal = console.error;
  console.error = (linha) => logs.push(linha);
  let resposta;
  try {
    resposta = await fetch(`http://127.0.0.1:${endereco.port}/api/previsao?latitude=-3.73&longitude=-38.52`);
  } finally {
    console.error = logOriginal;
  }
  const dados = await resposta.json();

  assert.equal(resposta.status, 502);
  assert.deepEqual(dados, {
    erro: 'Não foi possível obter a previsão agora.',
    codigo: 'autenticacao'
  });
  assert.equal(JSON.stringify(dados).includes('token'), false);
  const registro = JSON.parse(logs[0]);
  assert.equal(registro.event, 'api.weather.integration.failed');
  assert.equal(registro.category, 'autenticacao');
  assert.equal(JSON.stringify(registro).includes('-3.73'), false);
  assert.equal(JSON.stringify(registro).includes('-38.52'), false);
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

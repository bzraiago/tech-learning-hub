'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { ErroOpenMeteo, criarClienteOpenMeteo } = require('./cliente-open-meteo.cjs');

function resposta(dados, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      if (dados instanceof Error) throw dados;
      return dados;
    }
  };
}

const previsaoValida = {
  latitude: -3.75,
  longitude: -38.5,
  current: { time: '2026-10-27T10:00', temperature_2m: 29.4, relative_humidity_2m: 71 },
  current_units: { temperature_2m: '°C', relative_humidity_2m: '%' },
  timezone: 'America/Fortaleza'
};

test('envia coordenadas e variáveis documentadas e normaliza a resposta', async () => {
  let urlRecebida;
  let opcoesRecebidas;
  const cliente = criarClienteOpenMeteo({
    buscar: async (url, opcoes) => {
      urlRecebida = url;
      opcoesRecebidas = opcoes;
      return resposta(previsaoValida);
    }
  });

  const resultado = await cliente.consultar({ latitude: -3.73, longitude: -38.52 });

  assert.equal(urlRecebida.origin, 'https://api.open-meteo.com');
  assert.equal(urlRecebida.pathname, '/v1/forecast');
  assert.equal(urlRecebida.searchParams.get('latitude'), '-3.73');
  assert.equal(urlRecebida.searchParams.get('longitude'), '-38.52');
  assert.equal(urlRecebida.searchParams.get('current'), 'temperature_2m,relative_humidity_2m');
  assert.equal(urlRecebida.searchParams.get('timezone'), 'America/Fortaleza');
  assert.ok(opcoesRecebidas.signal);
  assert.deepEqual(resultado, {
    latitude: -3.75,
    longitude: -38.5,
    temperatura: 29.4,
    unidade: '°C',
    umidade: 71,
    unidadeUmidade: '%',
    horario: '2026-10-27T10:00',
    fusoHorario: 'America/Fortaleza'
  });
});

test('classifica indisponibilidade de rede sem repassar detalhes externos', async () => {
  const cliente = criarClienteOpenMeteo({
    buscar: async () => { throw new Error('detalhe privado de rede'); }
  });

  await assert.rejects(cliente.consultar({ latitude: 0, longitude: 0 }), (erro) => {
    assert.ok(erro instanceof ErroOpenMeteo);
    assert.equal(erro.tipo, 'rede');
    assert.equal(erro.message, 'Falha na integração Open-Meteo');
    return true;
  });
});

test('identifica rejeição de autenticação em uma resposta simulada', async () => {
  const cliente = criarClienteOpenMeteo({ buscar: async () => resposta({}, 401) });

  await assert.rejects(cliente.consultar({ latitude: 0, longitude: 0 }), (erro) => {
    assert.equal(erro.tipo, 'autenticacao');
    return true;
  });
});

test('identifica JSON malformado ou campos ausentes como quebra de contrato', async (contexto) => {
  for (const dados of [new SyntaxError('JSON privado'), { latitude: 1 }]) {
    await contexto.test('resposta inválida', async () => {
      const cliente = criarClienteOpenMeteo({ buscar: async () => resposta(dados) });
      await assert.rejects(cliente.consultar({ latitude: 0, longitude: 0 }), (erro) => {
        assert.equal(erro.tipo, 'resposta_invalida');
        assert.equal(erro.message, 'Falha na integração Open-Meteo');
        return true;
      });
    });
  }
});

test('classifica timeout e status HTTP de erro', async (contexto) => {
  await contexto.test('timeout', async () => {
    const timeout = new Error('timeout');
    timeout.name = 'TimeoutError';
    const cliente = criarClienteOpenMeteo({ buscar: async () => { throw timeout; } });
    await assert.rejects(cliente.consultar({ latitude: 0, longitude: 0 }), (erro) => {
      assert.equal(erro.tipo, 'tempo_limite');
      return true;
    });
  });

  await contexto.test('erro HTTP do serviço', async () => {
    const cliente = criarClienteOpenMeteo({ buscar: async () => resposta({}, 503) });
    await assert.rejects(cliente.consultar({ latitude: 0, longitude: 0 }), (erro) => {
      assert.equal(erro.tipo, 'http');
      return true;
    });
  });
});

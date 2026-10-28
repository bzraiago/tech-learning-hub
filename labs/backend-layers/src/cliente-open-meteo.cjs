'use strict';

const URL_API = 'https://api.open-meteo.com/v1/forecast';

class ErroOpenMeteo extends Error {
  constructor(tipo) {
    super('Falha na integração Open-Meteo');
    this.name = 'ErroOpenMeteo';
    this.tipo = tipo;
  }
}

function criarClienteOpenMeteo({ buscar = globalThis.fetch, tempoLimiteMs = 5000 } = {}) {
  if (typeof buscar !== 'function') throw new TypeError('Informe uma função de busca HTTP');

  return {
    async consultar({ latitude, longitude }) {
      const url = new URL(URL_API);
      url.searchParams.set('latitude', latitude);
      url.searchParams.set('longitude', longitude);
      url.searchParams.set('current', 'temperature_2m,relative_humidity_2m');
      url.searchParams.set('timezone', 'America/Fortaleza');

      let resposta;
      try {
        resposta = await buscar(url, { signal: AbortSignal.timeout(tempoLimiteMs) });
      } catch (erro) {
        throw new ErroOpenMeteo(erro?.name === 'TimeoutError' ? 'tempo_limite' : 'rede');
      }

      if (resposta.status === 401 || resposta.status === 403) {
        throw new ErroOpenMeteo('autenticacao');
      }
      if (!resposta.ok) throw new ErroOpenMeteo('http');

      let dados;
      try {
        dados = await resposta.json();
      } catch {
        throw new ErroOpenMeteo('resposta_invalida');
      }

      const temperatura = dados?.current?.temperature_2m;
      const umidade = dados?.current?.relative_humidity_2m;
      const horario = dados?.current?.time;
      const unidade = dados?.current_units?.temperature_2m;
      const unidadeUmidade = dados?.current_units?.relative_humidity_2m;
      if (
        !Number.isFinite(dados?.latitude) ||
        !Number.isFinite(dados?.longitude) ||
        !Number.isFinite(temperatura) ||
        !Number.isFinite(umidade) ||
        umidade < 0 || umidade > 100 ||
        typeof horario !== 'string' ||
        horario.length === 0 ||
        typeof unidade !== 'string' ||
        typeof unidadeUmidade !== 'string' ||
        typeof dados?.timezone !== 'string' ||
        dados.timezone.length === 0
      ) {
        throw new ErroOpenMeteo('resposta_invalida');
      }

      return {
        latitude: dados.latitude,
        longitude: dados.longitude,
        temperatura,
        unidade,
        umidade,
        unidadeUmidade,
        horario,
        fusoHorario: dados.timezone
      };
    }
  };
}

module.exports = { ErroOpenMeteo, criarClienteOpenMeteo };

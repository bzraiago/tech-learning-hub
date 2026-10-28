'use strict';

function responderJson(resposta, status, dados) {
  resposta.statusCode = status;
  resposta.end(JSON.stringify(dados));
}

function criarRotaPrevisao(servicoPrevisao, { cacheControl = 'no-store', coordenadasFixas = null } = {}) {
  return async function rotaPrevisao(req, res) {
    res.setHeader('Cache-Control', cacheControl);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      responderJson(res, 405, { erro: 'Método não permitido.' });
      return;
    }

    const url = new URL(req.url, 'http://127.0.0.1');
    const latitudeInformada = url.searchParams.get('latitude');
    const longitudeInformada = url.searchParams.get('longitude');
    const latitude = Number(latitudeInformada);
    const longitude = Number(longitudeInformada);
    if (
      latitudeInformada === null || latitudeInformada.trim() === '' ||
      longitudeInformada === null || longitudeInformada.trim() === '' ||
      !Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
      !Number.isFinite(longitude) || longitude < -180 || longitude > 180
    ) {
      responderJson(res, 400, { erro: 'Informe latitude e longitude válidas.' });
      return;
    }
    if (
      coordenadasFixas &&
      (latitude !== coordenadasFixas.latitude || longitude !== coordenadasFixas.longitude)
    ) {
      responderJson(res, 400, { erro: 'Esta demonstração pública usa coordenadas aproximadas fixas.' });
      return;
    }
    if (!servicoPrevisao) {
      responderJson(res, 503, { erro: 'Integração meteorológica não configurada.' });
      return;
    }

    try {
      responderJson(res, 200, await servicoPrevisao.consultar({ latitude, longitude }));
    } catch (erro) {
      const status = erro?.tipo === 'tempo_limite' ? 504 : 502;
      const categoria = typeof erro?.tipo === 'string' ? erro.tipo : 'integracao';
      console.error(`Falha na integração externa: ${categoria}`);
      responderJson(res, status, {
        erro: 'Não foi possível obter a previsão agora.',
        codigo: categoria
      });
    }
  };
}

module.exports = { criarRotaPrevisao };

'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { criarServicoEstudos } = require('./src/servico-estudos.cjs');
const { criarRepositorioEstudosPostgres } = require('./src/repositorio-estudos-postgres.cjs');
const { criarRepositorioEstudos } = require('./src/repositorio-estudos-memoria.cjs');
const { ErroOpenMeteo, criarClienteOpenMeteo } = require('./src/cliente-open-meteo.cjs');

const pagina = path.join(__dirname, 'index.html');
const limiteCorpo = 1024;

function responderJson(res, status, dados) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(dados));
}

async function lerJson(req) {
  let tamanho = 0;
  const partes = [];
  for await (const parte of req) {
    tamanho += parte.length;
    if (tamanho > limiteCorpo) return { erro: 'Corpo muito grande', status: 413 };
    partes.push(parte);
  }
  try {
    return { dados: JSON.parse(Buffer.concat(partes).toString('utf8')) };
  } catch {
    return { erro: 'JSON inválido', status: 400 };
  }
}

async function responder(req, res, servico, servicoPrevisao) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(pagina).pipe(res);
    return;
  }
  if (req.method === 'GET' && req.url === '/api/estudos') {
    responderJson(res, 200, await servico.listar());
    return;
  }
  if (req.method === 'GET' && (req.url === '/api/previsao' || req.url.startsWith('/api/previsao?'))) {
    const url = new URL(req.url, 'http://127.0.0.1');
    const latitude = Number(url.searchParams.get('latitude'));
    const longitude = Number(url.searchParams.get('longitude'));
    if (
      url.searchParams.get('latitude')?.trim() === '' ||
      url.searchParams.get('longitude')?.trim() === '' ||
      url.searchParams.get('latitude') === null ||
      url.searchParams.get('longitude') === null ||
      !Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
      !Number.isFinite(longitude) || longitude < -180 || longitude > 180
    ) {
      responderJson(res, 400, { erro: 'Informe latitude e longitude válidas.' });
      return;
    }
    if (!servicoPrevisao) {
      responderJson(res, 503, { erro: 'Integração meteorológica não configurada.' });
      return;
    }
    try {
      responderJson(res, 200, await servicoPrevisao.consultar({ latitude, longitude }));
    } catch (erro) {
      const status = erro instanceof ErroOpenMeteo && erro.tipo === 'tempo_limite' ? 504 : 502;
      const categoria = erro instanceof ErroOpenMeteo ? erro.tipo : 'integracao';
      console.error(`Falha na integração externa: ${categoria}`);
      responderJson(res, status, {
        erro: 'Não foi possível obter a previsão agora.',
        codigo: categoria
      });
    }
    return;
  }
  if (req.method === 'POST' && req.url === '/api/estudos') {
    if (!/^application\/json(?:\s*;|\s*$)/i.test(req.headers['content-type'] || '')) {
      responderJson(res, 415, { erro: 'Use Content-Type: application/json' });
      return;
    }
    const leitura = await lerJson(req);
    if (leitura.erro) {
      responderJson(res, leitura.status, { erro: leitura.erro });
      return;
    }
    const resultado = await servico.criar(leitura.dados);
    if (!resultado.sucesso) {
      responderJson(res, resultado.status, { erro: resultado.erro });
      return;
    }
    responderJson(res, 201, resultado.estudo);
    return;
  }
  if (req.method === 'POST' && req.url === '/api/estudos-com-sessao') {
    if (!/^application\/json(?:\s*;|\s*$)/i.test(req.headers['content-type'] || '')) {
      responderJson(res, 415, { erro: 'Use Content-Type: application/json' });
      return;
    }
    const leitura = await lerJson(req);
    if (leitura.erro) {
      responderJson(res, leitura.status, { erro: leitura.erro });
      return;
    }
    const resultado = await servico.criarComSessao(leitura.dados);
    if (!resultado.sucesso) {
      responderJson(res, resultado.status, { erro: resultado.erro });
      return;
    }
    responderJson(res, 201, resultado.resultado);
    return;
  }
  responderJson(res, 404, { erro: 'Rota não encontrada' });
}

function criarServidor(servico, servicoPrevisao) {
  return http.createServer((req, res) => {
    responder(req, res, servico, servicoPrevisao).catch((erro) => {
      console.error(`Falha interna na API: ${erro.code || erro.name || 'erro desconhecido'}`);
      if (!res.headersSent) {
        responderJson(res, 500, { erro: 'Falha interna do servidor' });
      } else {
        res.destroy();
      }
    });
  });
}

if (require.main === module) {
  const usarMemoria = process.env.BACKEND_STORAGE === 'memory';
  const repositorio = usarMemoria
    ? criarRepositorioEstudos()
    : criarRepositorioEstudosPostgres();
  const servico = criarServicoEstudos(repositorio);
  const servicoPrevisao = criarClienteOpenMeteo();
  const servidor = criarServidor(servico, servicoPrevisao);
  servidor.listen(4180, '127.0.0.1', () => {
    console.log(`Abra http://127.0.0.1:4180 · armazenamento: ${usarMemoria ? 'memória (temporário)' : 'PostgreSQL'}`);
  });

  function encerrar() {
    servidor.close(async () => {
      if (repositorio.encerrar) await repositorio.encerrar();
      console.log('Servidor encerrado');
    });
  }

  process.once('SIGINT', encerrar);
  process.once('SIGTERM', encerrar);
}

module.exports = { criarServidor };

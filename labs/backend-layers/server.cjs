'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { criarRepositorioEstudos } = require('./src/repositorio-estudos-memoria.cjs');
const { criarServicoEstudos } = require('./src/servico-estudos.cjs');

const pagina = path.join(__dirname, 'index.html');
const servico = criarServicoEstudos(criarRepositorioEstudos());
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

async function responder(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(pagina).pipe(res);
    return;
  }
  if (req.method === 'GET' && req.url === '/api/estudos') {
    responderJson(res, 200, await servico.listar());
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
  responderJson(res, 404, { erro: 'Rota não encontrada' });
}

const servidor = http.createServer((req, res) => {
  responder(req, res).catch(() => {
    if (!res.headersSent) responderJson(res, 400, { erro: 'Não foi possível ler a requisição' });
  });
});

if (require.main === module) {
  servidor.listen(4180, '127.0.0.1', () => {
    console.log('Abra http://127.0.0.1:4180');
  });
}

module.exports = { servidor };

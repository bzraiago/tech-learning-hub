'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const pagina = path.join(__dirname, 'index.html');
const estudos = [{ id: 1, titulo: 'HTML' }, { id: 2, titulo: 'JavaScript' }];
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

function validarEstudo(dados) {
  if (dados === null || typeof dados !== 'object' || Array.isArray(dados)) {
    return { erro: 'Envie um objeto com o campo titulo' };
  }
  if (Object.keys(dados).length !== 1 || typeof dados.titulo !== 'string') {
    return { erro: 'Envie somente titulo como texto' };
  }
  const titulo = dados.titulo.trim();
  if (titulo.length < 1 || titulo.length > 80) {
    return { erro: 'titulo deve ter de 1 a 80 caracteres' };
  }
  return { titulo };
}

async function responder(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(pagina).pipe(res);
    return;
  }
  if (req.method === 'GET' && req.url === '/api/estudos') {
    responderJson(res, 200, estudos);
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
    const resultado = validarEstudo(leitura.dados);
    if (resultado.erro) {
      responderJson(res, 400, { erro: resultado.erro });
      return;
    }
    const estudo = { id: estudos.at(-1).id + 1, titulo: resultado.titulo };
    estudos.push(estudo);
    responderJson(res, 201, estudo);
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
  servidor.listen(4179, '127.0.0.1', () => {
    console.log('Abra http://127.0.0.1:4179');
  });
}

module.exports = { servidor };

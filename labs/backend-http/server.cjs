'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const pagina = path.join(__dirname, 'index.html');
const estudos = [{ id: 1, titulo: 'HTML' }, { id: 2, titulo: 'JavaScript' }];

function responder(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(pagina).pipe(res);
    return;
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET' && req.url === '/api/estudos') {
    res.writeHead(200);
    res.end(JSON.stringify(estudos));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
}

const servidor = http.createServer(responder);

if (require.main === module) {
  servidor.listen(4178, '127.0.0.1', () => {
    console.log('Abra http://127.0.0.1:4178');
  });
}

module.exports = { servidor };

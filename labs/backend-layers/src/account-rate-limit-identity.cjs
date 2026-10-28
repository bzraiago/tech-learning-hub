'use strict';

const { createHmac } = require('node:crypto');

function criarIdentidadeLimitadorPorConta(subject, segredo) {
  if (typeof subject !== 'string' || !subject.trim() || subject.length > 256) {
    throw new TypeError('subject precisa ser uma identidade verificada curta');
  }

  const chave = Buffer.isBuffer(segredo)
    ? segredo
    : typeof segredo === 'string'
      ? Buffer.from(segredo, 'utf8')
      : null;
  if (!chave || chave.length < 32) {
    throw new TypeError('segredo do HMAC precisa ter ao menos 32 bytes');
  }

  return createHmac('sha256', chave).update(subject, 'utf8').digest('hex');
}

module.exports = { criarIdentidadeLimitadorPorConta };

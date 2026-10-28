'use strict';

const { createPublicKey } = require('node:crypto');
const { verifyToken } = require('@clerk/backend');

function normalizarChavePublica(valor) {
  if (typeof valor !== 'string' || !valor.trim()) {
    throw new TypeError('CLERK_JWT_KEY precisa conter a chave pública PEM');
  }

  const chave = valor.replace(/\\n/g, '\n').trim();
  if (!chave.startsWith('-----BEGIN PUBLIC KEY-----')) {
    throw new TypeError('CLERK_JWT_KEY precisa ser uma chave pública PEM válida');
  }
  try {
    createPublicKey(chave);
  } catch {
    throw new TypeError('CLERK_JWT_KEY precisa ser uma chave pública PEM válida');
  }
  return chave;
}

function normalizarEmissor(valor) {
  if (typeof valor !== 'string' || !valor.trim()) {
    throw new TypeError('CLERK_ISSUER precisa conter o emissor esperado');
  }

  let url;
  try {
    url = new URL(valor.trim());
  } catch {
    throw new TypeError('CLERK_ISSUER precisa ser uma origem HTTPS válida');
  }

  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new TypeError('CLERK_ISSUER precisa ser uma origem HTTPS sem caminho');
  }
  return url.origin;
}

function normalizarPartesAutorizadas(valor) {
  const partes = Array.isArray(valor)
    ? valor
    : typeof valor === 'string'
      ? valor.split(',')
      : [];
  const origens = partes.map((parte) => {
    if (typeof parte !== 'string' || !parte.trim()) {
      throw new TypeError('CLERK_AUTHORIZED_PARTIES precisa listar origens permitidas');
    }

    let url;
    try {
      url = new URL(parte.trim());
    } catch {
      throw new TypeError('CLERK_AUTHORIZED_PARTIES contém uma origem inválida');
    }

    const loopback = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(url.hostname);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      (url.protocol === 'http:' && !loopback) ||
      url.username ||
      url.password ||
      url.pathname !== '/' ||
      url.search ||
      url.hash
    ) {
      throw new TypeError('Cada parte autorizada deve ser uma origem HTTPS (ou HTTP local) sem caminho');
    }
    return url.origin;
  });

  const unicas = [...new Set(origens)];
  if (unicas.length === 0) {
    throw new TypeError('CLERK_AUTHORIZED_PARTIES precisa listar ao menos uma origem');
  }
  return unicas;
}

function criarVerificadorSessaoClerk({
  jwtKey,
  issuer,
  authorizedParties,
  verificarToken = verifyToken
} = {}) {
  if (typeof verificarToken !== 'function') {
    throw new TypeError('verificarToken precisa ser uma função');
  }

  const chave = normalizarChavePublica(jwtKey);
  const emissor = normalizarEmissor(issuer);
  const partesAutorizadas = normalizarPartesAutorizadas(authorizedParties);

  return async function resolverIdentidadeAutenticada(req) {
    const cabecalho = req?.headers?.authorization;
    if (typeof cabecalho !== 'string') return null;
    const correspondencia = /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/i.exec(cabecalho);
    if (!correspondencia) return null;

    let claims;
    try {
      claims = await verificarToken(correspondencia[1], {
        jwtKey: chave,
        issuer: emissor,
        authorizedParties: partesAutorizadas
      });
    } catch {
      // Token ausente, expirado, com assinatura inválida ou origem não autorizada.
      // O token e as claims nunca entram em logs nem em mensagens de erro.
      return null;
    }

    if (
      typeof claims?.azp !== 'string' ||
      !partesAutorizadas.includes(claims.azp) ||
      claims.sts === 'pending' ||
      typeof claims?.sub !== 'string' ||
      !claims.sub.trim() ||
      claims.sub.length > 256 ||
      typeof claims.sid !== 'string' ||
      !claims.sid.trim() ||
      claims.sid.length > 256
    ) {
      return null;
    }

    return { subject: claims.sub };
  };
}

module.exports = { criarVerificadorSessaoClerk, normalizarPartesAutorizadas };

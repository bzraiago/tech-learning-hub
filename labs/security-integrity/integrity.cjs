'use strict';

const { createHash, generateKeyPairSync, sign, verify } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const RELEASE_FORMAT = 'tech-learning-hub-demo-release-v1';
const FIXTURE_PATH = path.join(__dirname, 'fixtures', 'study-material.json');

function sha256(content) {
  const bytes = Buffer.isBuffer(content) ? content : typeof content === 'string' ? Buffer.from(content, 'utf8') : null;
  if (!bytes) throw new TypeError('O conteúdo precisa ser texto ou Buffer.');
  return createHash('sha256').update(bytes).digest('hex');
}

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new TypeError('Manifesto inválido.');
  }

  const manifestKeys = Object.keys(manifest).sort().join(',');
  if (manifestKeys !== 'artifact,format,version' || manifest.format !== RELEASE_FORMAT) {
    throw new TypeError('Formato de manifesto não reconhecido.');
  }
  if (typeof manifest.version !== 'string' || !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    throw new TypeError('Versão inválida.');
  }

  const artifact = manifest.artifact;
  if (!artifact || typeof artifact !== 'object' || Array.isArray(artifact)) {
    throw new TypeError('Artefato inválido.');
  }
  if (Object.keys(artifact).sort().join(',') !== 'name,sha256') {
    throw new TypeError('Campos do artefato não reconhecidos.');
  }
  if (typeof artifact.name !== 'string' || !/^[a-z0-9][a-z0-9._-]{0,63}$/i.test(artifact.name) || artifact.name.includes('..')) {
    throw new TypeError('Nome de artefato inválido.');
  }
  if (typeof artifact.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(artifact.sha256)) {
    throw new TypeError('Resumo SHA-256 inválido.');
  }

  return {
    format: RELEASE_FORMAT,
    version: manifest.version,
    artifact: { name: artifact.name, sha256: artifact.sha256 }
  };
}

function serializeManifest(manifest) {
  return Buffer.from(JSON.stringify(validateManifest(manifest)), 'utf8');
}

function createManifest({ version, name, content }) {
  return validateManifest({
    format: RELEASE_FORMAT,
    version,
    artifact: { name, sha256: sha256(content) }
  });
}

function signManifest(manifest, privateKey) {
  return sign(null, serializeManifest(manifest), privateKey).toString('base64');
}

function verifyRelease({ manifest, signature, trustedPublicKey, artifactBytes } = {}) {
  let manifestBytes;
  try {
    manifestBytes = serializeManifest(manifest);
  } catch {
    return { ok: false, reason: 'invalid-manifest' };
  }

  if (typeof signature !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(signature)) {
    return { ok: false, reason: 'invalid-signature' };
  }
  const signatureBytes = Buffer.from(signature, 'base64');
  if (signatureBytes.length !== 64 || signatureBytes.toString('base64') !== signature) {
    return { ok: false, reason: 'invalid-signature' };
  }

  try {
    if (!verify(null, manifestBytes, trustedPublicKey, signatureBytes)) {
      return { ok: false, reason: 'signature-mismatch' };
    }
  } catch {
    return { ok: false, reason: 'unusable-trusted-key' };
  }

  if (!Buffer.isBuffer(artifactBytes) && typeof artifactBytes !== 'string') {
    return { ok: false, reason: 'invalid-artifact' };
  }
  if (sha256(artifactBytes) !== manifest.artifact.sha256) {
    return { ok: false, reason: 'artifact-mismatch' };
  }

  return { ok: true, reason: 'verified', version: manifest.version, artifactName: manifest.artifact.name };
}

function runDemo() {
  const artifactBytes = fs.readFileSync(FIXTURE_PATH);
  const trustedKeyPair = generateKeyPairSync('ed25519');
  const manifest = createManifest({ version: '1.0.0', name: 'study-material.json', content: artifactBytes });
  const signature = signManifest(manifest, trustedKeyPair.privateKey);
  const valid = verifyRelease({ manifest, signature, trustedPublicKey: trustedKeyPair.publicKey, artifactBytes });

  const alteredArtifact = Buffer.from(artifactBytes);
  alteredArtifact[0] ^= 1;
  const alteredContent = verifyRelease({ manifest, signature, trustedPublicKey: trustedKeyPair.publicKey, artifactBytes: alteredArtifact });

  const attackerKeyPair = generateKeyPairSync('ed25519');
  const attackerSignature = signManifest(manifest, attackerKeyPair.privateKey);
  const unknownSigner = verifyRelease({ manifest, signature: attackerSignature, trustedPublicKey: trustedKeyPair.publicKey, artifactBytes });

  console.log('Laboratório A08 — artefato didático e fictício');
  console.log(`Assinatura e conteúdo íntegros: ${valid.ok ? 'OK' : 'FALHA'}`);
  console.log(`Conteúdo alterado após a assinatura: ${alteredContent.ok ? 'ACEITO' : `RECUSADO (${alteredContent.reason})`}`);
  console.log(`Assinatura de outra chave, conferida contra a chave esperada: ${unknownSigner.ok ? 'ACEITA' : `RECUSADA (${unknownSigner.reason})`}`);
  console.log('As chaves são efêmeras e ficam em memória. A demonstração não autentica um publicador externo.');

  if (!valid.ok || alteredContent.ok || unknownSigner.ok) process.exitCode = 1;
}

if (require.main === module) runDemo();

module.exports = { createManifest, sha256, signManifest, verifyRelease };

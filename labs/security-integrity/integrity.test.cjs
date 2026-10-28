'use strict';

const assert = require('node:assert/strict');
const { generateKeyPairSync } = require('node:crypto');
const test = require('node:test');
const { createManifest, sha256, signManifest, verifyRelease } = require('./integrity.cjs');

function prepareRelease(content = Buffer.from('{"lesson":"conceito fictício"}', 'utf8')) {
  const keys = generateKeyPairSync('ed25519');
  const manifest = createManifest({ version: '1.0.0', name: 'study-material.json', content });
  const signature = signManifest(manifest, keys.privateKey);
  return { content, keys, manifest, signature };
}

test('SHA-256 produz resumo hexadecimal e muda quando os bytes mudam', () => {
  const first = sha256('aula fictícia');
  const second = sha256('aula fictícia alterada');
  assert.match(first, /^[a-f0-9]{64}$/);
  assert.notEqual(first, second);
});

test('aceita conteúdo cujo manifesto tem assinatura válida da chave confiável', () => {
  const release = prepareRelease();
  assert.deepEqual(verifyRelease({
    manifest: release.manifest,
    signature: release.signature,
    trustedPublicKey: release.keys.publicKey,
    artifactBytes: release.content
  }), {
    ok: true,
    reason: 'verified',
    version: '1.0.0',
    artifactName: 'study-material.json'
  });
});

test('recusa bytes alterados mesmo quando a assinatura do manifesto continua válida', () => {
  const release = prepareRelease();
  const altered = Buffer.from(release.content);
  altered[0] ^= 1;
  const result = verifyRelease({
    manifest: release.manifest,
    signature: release.signature,
    trustedPublicKey: release.keys.publicKey,
    artifactBytes: altered
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'artifact-mismatch');
});

test('recusa manifesto alterado depois de assinado', () => {
  const release = prepareRelease();
  const changedManifest = { ...release.manifest, version: '2.0.0' };
  const result = verifyRelease({
    manifest: changedManifest,
    signature: release.signature,
    trustedPublicKey: release.keys.publicKey,
    artifactBytes: release.content
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'signature-mismatch');
});

test('recusa uma nova assinatura criada por chave que não é a chave confiável', () => {
  const release = prepareRelease();
  const attackerKeys = generateKeyPairSync('ed25519');
  const attackerSignature = signManifest(release.manifest, attackerKeys.privateKey);
  const result = verifyRelease({
    manifest: release.manifest,
    signature: attackerSignature,
    trustedPublicKey: release.keys.publicKey,
    artifactBytes: release.content
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'signature-mismatch');
});

test('recusa assinatura com formato inválido', () => {
  const release = prepareRelease();
  const result = verifyRelease({
    manifest: release.manifest,
    signature: 'assinatura não codificada corretamente',
    trustedPublicKey: release.keys.publicKey,
    artifactBytes: release.content
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'invalid-signature');
});

test('recusa manifesto inválido e caminho que tentaria sair do escopo do artefato', () => {
  const release = prepareRelease();
  const changedManifest = {
    ...release.manifest,
    artifact: { ...release.manifest.artifact, name: '../outside.json' }
  };
  const result = verifyRelease({
    manifest: changedManifest,
    signature: release.signature,
    trustedPublicKey: release.keys.publicKey,
    artifactBytes: release.content
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'invalid-manifest');
});

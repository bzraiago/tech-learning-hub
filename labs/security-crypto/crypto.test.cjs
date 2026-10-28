const assert = require("node:assert/strict");
const { test } = require("node:test");
const {
  ALGORITHM,
  AUTH_TAG_BYTES,
  IV_BYTES,
  KEY_BYTES,
  createDemoKey,
  decryptDemoText,
  encryptDemoText,
  hashDemoText
} = require("./crypto.cjs");

test("gera uma chave de demonstração aleatória do tamanho esperado", () => {
  const first = createDemoKey();
  const second = createDemoKey();
  assert.equal(first.length, KEY_BYTES);
  assert.equal(second.length, KEY_BYTES);
  assert.notDeepEqual(first, second);
});

test("hash SHA-256 do mesmo texto é determinístico e tem formato hexadecimal", () => {
  const first = hashDemoText("tópico fictício");
  const second = hashDemoText("tópico fictício");
  assert.equal(first, second);
  assert.match(first, /^[a-f0-9]{64}$/);
  assert.notEqual(first, hashDemoText("outro tópico fictício"));
});

test("criptografa e restaura texto fictício usando envelope separado", () => {
  const key = createDemoKey();
  const envelope = encryptDemoText("anotação inventada", key);
  assert.equal(envelope.algorithm, ALGORITHM);
  assert.equal(Buffer.from(envelope.iv, "base64").length, IV_BYTES);
  assert.equal(Buffer.from(envelope.authTag, "base64").length, AUTH_TAG_BYTES);
  assert.ok(envelope.ciphertext);
  assert.equal(decryptDemoText(envelope, key), "anotação inventada");
});

test("gera IV diferente para duas criptografias com a mesma chave", () => {
  const key = createDemoKey();
  const first = encryptDemoText("mesmo texto fictício", key);
  const second = encryptDemoText("mesmo texto fictício", key);
  assert.notEqual(first.iv, second.iv);
  assert.notEqual(first.ciphertext, second.ciphertext);
  assert.equal(decryptDemoText(first, key), "mesmo texto fictício");
  assert.equal(decryptDemoText(second, key), "mesmo texto fictício");
});

test("recusa texto cifrado alterado antes de devolver qualquer resultado", () => {
  const key = createDemoKey();
  const envelope = encryptDemoText("dado inventado", key);
  const alteredBytes = Buffer.from(envelope.ciphertext, "base64");
  alteredBytes[0] ^= 1;
  const altered = { ...envelope, ciphertext: alteredBytes.toString("base64") };
  assert.throws(() => decryptDemoText(altered, key));
});

test("recusa tag adulterada e chave diferente", () => {
  const key = createDemoKey();
  const envelope = encryptDemoText("dado inventado", key);
  const alteredTag = Buffer.from(envelope.authTag, "base64");
  alteredTag[0] ^= 1;
  assert.throws(() => decryptDemoText({ ...envelope, authTag: alteredTag.toString("base64") }, key));
  assert.throws(() => decryptDemoText(envelope, createDemoKey()));
});

test("recusa tipo de entrada, chave e envelope com tamanho ou algoritmo inválido", () => {
  assert.throws(() => hashDemoText(42), TypeError);
  assert.throws(() => encryptDemoText("texto fictício", Buffer.alloc(16)), TypeError);
  assert.throws(() => encryptDemoText(42, createDemoKey()), TypeError);
  assert.throws(() => decryptDemoText({ algorithm: "aes-256-cbc" }, createDemoKey()), TypeError);
  assert.throws(() => decryptDemoText({ algorithm: ALGORITHM, iv: "AA==", ciphertext: "", authTag: "AA==" }, createDemoKey()), TypeError);
});

const {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes
} = require("node:crypto");

const ALGORITHM = "aes-256-gcm";
const KEY_BYTES = 32;
const IV_BYTES = 12;
const AUTH_TAG_BYTES = 16;

function createDemoKey() {
  // Chave aleatória apenas para esta execução. Ela não é salva nem impressa.
  return randomBytes(KEY_BYTES);
}

function requireDemoKey(key) {
  if (!Buffer.isBuffer(key) || key.length !== KEY_BYTES) {
    throw new TypeError("A chave desta demonstração precisa ter 32 bytes.");
  }
}

function hashDemoText(text) {
  if (typeof text !== "string") throw new TypeError("O valor do hash precisa ser texto.");
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function encryptDemoText(text, key) {
  requireDemoKey(key);
  if (typeof text !== "string") throw new TypeError("O valor a criptografar precisa ser texto.");

  // O IV/nonce é público e acompanha o texto cifrado. O GCM exige que ele não
  // se repita enquanto a mesma chave estiver em uso; a demonstração gera um
  // novo valor aleatório para cada chamada e não deve ser usada em produção.
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_BYTES });
  const ciphertext = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final()
  ]);

  return {
    algorithm: ALGORITHM,
    iv: iv.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64")
  };
}

function decodeBase64Field(value, fieldName, expectedBytes) {
  if (typeof value !== "string") throw new TypeError(`${fieldName} precisa ser texto Base64.`);
  const decoded = Buffer.from(value, "base64");
  if (decoded.toString("base64") !== value) throw new TypeError(`${fieldName} não contém Base64 válido.`);
  if (expectedBytes !== undefined && decoded.length !== expectedBytes) {
    throw new TypeError(`${fieldName} precisa ter ${expectedBytes} bytes.`);
  }
  return decoded;
}

function decryptDemoText(envelope, key) {
  requireDemoKey(key);
  if (!envelope || envelope.algorithm !== ALGORITHM) {
    throw new TypeError(`O formato precisa declarar ${ALGORITHM}.`);
  }

  const iv = decodeBase64Field(envelope.iv, "IV", IV_BYTES);
  const ciphertext = decodeBase64Field(envelope.ciphertext, "Texto cifrado");
  const authTag = decodeBase64Field(envelope.authTag, "Tag de autenticação", AUTH_TAG_BYTES);
  const decipher = createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_BYTES });
  decipher.setAuthTag(authTag);

  // GCM só libera o resultado final se a tag confirmar que o conteúdo e o IV
  // não foram alterados. Erro deve interromper o fluxo, sem usar texto parcial.
  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]).toString("utf8");
}

function runDemo() {
  const key = createDemoKey();
  const fictitiousText = "Tópico de estudo: funções JavaScript";
  const envelope = encryptDemoText(fictitiousText, key);
  const restored = decryptDemoText(envelope, key);

  console.log(JSON.stringify({
    notice: "Amostra inventada; chave aleatória mantida somente na memória.",
    sha256Digest: hashDemoText(fictitiousText),
    encryptedEnvelope: envelope,
    decryptionMatchesInput: restored === fictitiousText,
    keyPrinted: false
  }, null, 2));
}

if (require.main === module) runDemo();

module.exports = {
  ALGORITHM,
  AUTH_TAG_BYTES,
  IV_BYTES,
  KEY_BYTES,
  createDemoKey,
  decryptDemoText,
  encryptDemoText,
  hashDemoText
};

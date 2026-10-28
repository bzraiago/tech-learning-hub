'use strict';

const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');

const cwd = __dirname;
const runId = randomUUID().replaceAll('-', '');
const accountKey = `rate:v1:demo-account:${runId}`;
const otherAccountKey = `rate:v1:demo-account-other:${runId}`;
let redisReady = false;
let composeCommand;
let composePrefix;

try {
  execFileSync('docker', ['compose', 'version'], { cwd, stdio: 'ignore' });
  composeCommand = 'docker';
  composePrefix = ['compose'];
} catch {
  composeCommand = 'docker-compose';
  composePrefix = [];
}

function redis(...args) {
  const output = execFileSync(composeCommand, [
    ...composePrefix, 'exec', '-T', 'redis', 'redis-cli', '--raw', ...args
  ], { cwd, encoding: 'utf8' });
  return output.trim().split(/\r?\n/);
}

function request(key) {
  return redis('--eval', '/scripts/fixed-window.lua', key, ',', '60', '3');
}

function expectDecision(key, expected, count) {
  const [decision, actualCount, ttl] = request(key);
  assert.equal(decision, expected);
  assert.equal(Number(actualCount), count);
  assert.ok(Number(ttl) > 0 && Number(ttl) <= 60, `TTL fora da janela: ${ttl}`);
}

try {
  assert.deepEqual(redis('PING'), ['PONG']);
  redisReady = true;

  expectDecision(accountKey, 'allowed', 1);
  expectDecision(accountKey, 'allowed', 2);
  expectDecision(accountKey, 'allowed', 3);
  expectDecision(accountKey, 'limited', 4);
  expectDecision(otherAccountKey, 'allowed', 1);

  console.log('Rate limiter Redis: PASS');
  console.log('- três chamadas permitidas na janela; quarta limitada');
  console.log('- contador expirável e separado entre contas fictícias');
} finally {
  if (redisReady) redis('DEL', accountKey, otherAccountKey);
}

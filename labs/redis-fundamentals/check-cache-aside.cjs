'use strict';

const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');

const cwd = __dirname;
const key = `cache:v1:studies:demo:${randomUUID().replaceAll('-', '')}`;
const source = new Map([['demo-study', { id: 'demo-study', title: 'HTML' }]]);
let sourceReads = 0;
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
  return execFileSync(composeCommand, [
    ...composePrefix, 'exec', '-T', 'redis', 'redis-cli', '--raw', ...args
  ], { cwd, encoding: 'utf8' }).trim();
}

function buscarEstudo(id) {
  const cached = redis('GET', key);
  if (cached) return { value: JSON.parse(cached), source: 'cache' };

  sourceReads += 1;
  const value = source.get(id);
  if (value) redis('SET', key, JSON.stringify(value), 'EX', '30');
  return { value, source: 'database-simulation' };
}

try {
  assert.deepEqual(buscarEstudo('demo-study'), {
    value: { id: 'demo-study', title: 'HTML' },
    source: 'database-simulation'
  });
  assert.deepEqual(buscarEstudo('demo-study'), {
    value: { id: 'demo-study', title: 'HTML' },
    source: 'cache'
  });
  assert.equal(sourceReads, 1, 'segunda leitura deveria ser cache hit');

  source.set('demo-study', { id: 'demo-study', title: 'CSS' });
  assert.equal(buscarEstudo('demo-study').value.title, 'HTML', 'sem invalidar, a cópia pode ficar velha');
  redis('DEL', key);
  assert.deepEqual(buscarEstudo('demo-study'), {
    value: { id: 'demo-study', title: 'CSS' },
    source: 'database-simulation'
  });
  assert.equal(sourceReads, 2, 'após invalidar, a fonte deve ser consultada novamente');

  const ttl = Number(redis('TTL', key));
  assert.ok(ttl > 0 && ttl <= 30, `TTL fora do intervalo esperado: ${ttl}`);

  console.log('Cache-aside Redis: PASS');
  console.log('- miss carrega a fonte fictícia e grava com TTL');
  console.log('- hit evita segunda leitura; invalidação recarrega o valor atualizado');
} finally {
  redis('DEL', key);
}

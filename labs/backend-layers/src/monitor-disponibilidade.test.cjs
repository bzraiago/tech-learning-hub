'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { criarMonitorDisponibilidade } = require('./monitor-disponibilidade.cjs');

test('sonda HTTP abre um alerta após falhas consecutivas e registra recuperação uma vez', async (contexto) => {
  let status = 200;
  const servidor = http.createServer((req, res) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: status === 200 ? 'ready' : 'not_ready' }));
  });
  await new Promise((resolve) => servidor.listen(0, '127.0.0.1', resolve));
  contexto.after(() => new Promise((resolve, reject) => {
    servidor.close((erro) => erro ? reject(erro) : resolve());
  }));

  const alertas = [];
  const recuperacoes = [];
  const url = `http://127.0.0.1:${servidor.address().port}/health/ready`;
  const monitor = criarMonitorDisponibilidade({
    limiteFalhas: 2,
    async verificar() {
      const resposta = await fetch(url, { signal: AbortSignal.timeout(1000) });
      return resposta.status === 200;
    },
    aoAlertar: () => alertas.push('aberto'),
    aoRecuperar: () => recuperacoes.push('resolvido')
  });

  assert.deepEqual(monitor.obterEstado(), {
    estado: 'unknown',
    falhasConsecutivas: 0,
    alertaAberto: false
  });
  assert.deepEqual(await monitor.sondar(), { estado: 'available', falhasConsecutivas: 0 });
  status = 503;
  assert.deepEqual(await monitor.sondar(), { estado: 'degraded', falhasConsecutivas: 1 });
  assert.deepEqual(alertas, []);
  assert.deepEqual(await monitor.sondar(), { estado: 'unavailable', falhasConsecutivas: 2 });
  assert.deepEqual(await monitor.sondar(), { estado: 'unavailable', falhasConsecutivas: 3 });
  assert.deepEqual(alertas, ['aberto']);

  status = 200;
  assert.deepEqual(await monitor.sondar(), { estado: 'available', falhasConsecutivas: 0 });
  assert.deepEqual(await monitor.sondar(), { estado: 'available', falhasConsecutivas: 0 });
  assert.deepEqual(recuperacoes, ['resolvido']);
});

test('sonda trata exceção de rede como indisponibilidade sem expor a mensagem', async () => {
  const monitor = criarMonitorDisponibilidade({
    async verificar() { throw new Error('token e URL privados'); }
  });
  assert.deepEqual(await monitor.sondar(), { estado: 'degraded', falhasConsecutivas: 1 });
});

test('monitor valida dependência e limiar antes de iniciar', () => {
  assert.throws(() => criarMonitorDisponibilidade(), /verificar/);
  assert.throws(() => criarMonitorDisponibilidade({ verificar() {}, limiteFalhas: 0 }), /limiteFalhas/);
  assert.throws(() => criarMonitorDisponibilidade({ verificar() {}, aoAlertar: true }), /callbacks/);
});

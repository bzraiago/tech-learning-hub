'use strict';

const { criarMonitorDisponibilidade } = require('../src/monitor-disponibilidade.cjs');
const { logger } = require('../src/logger.cjs');

const URL_SAUDE = 'http://127.0.0.1:4180/health/ready';
const INTERVALO_MS = 5000;
const TEMPO_LIMITE_MS = 1500;

const monitor = criarMonitorDisponibilidade({
  limiteFalhas: 2,
  async verificar() {
    const resposta = await fetch(URL_SAUDE, { signal: AbortSignal.timeout(TEMPO_LIMITE_MS) });
    await resposta.body?.cancel();
    return resposta.status === 200;
  },
  aoAlertar() {
    logger.error('monitor.alert.opened', new Error('Sonda falhou duas vezes consecutivas'));
  },
  aoRecuperar() {
    logger.info('monitor.alert.resolved');
  }
});

logger.info('monitor.started');
void monitor.sondar();
const temporizador = setInterval(() => void monitor.sondar(), INTERVALO_MS);

function parar() {
  clearInterval(temporizador);
  logger.info('monitor.stopped');
}

process.once('SIGINT', parar);
process.once('SIGTERM', parar);

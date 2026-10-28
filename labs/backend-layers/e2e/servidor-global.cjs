'use strict';

const { criarServidor } = require('../server.cjs');
const { criarServicoEstudos } = require('../src/servico-estudos.cjs');
const { criarRepositorioEstudos } = require('../src/repositorio-estudos-memoria.cjs');
const { criarLimitadorEmMemoria } = require('../src/rate-limiter-memory.cjs');

module.exports = async function iniciarServidorDeTeste() {
  const servicoPrevisao = {
    async consultar() {
      return {
        latitude: -3.75,
        longitude: -38.5,
        temperatura: 29.4,
        unidade: '°C',
        umidade: 71,
        unidadeUmidade: '%',
        horario: '2026-10-27T10:00',
        fusoHorario: 'America/Fortaleza'
      };
    }
  };
  const servidor = criarServidor(
    criarServicoEstudos(criarRepositorioEstudos()),
    servicoPrevisao,
    criarLimitadorEmMemoria()
  );

  await new Promise((resolve, reject) => {
    servidor.once('error', reject);
    servidor.listen(4180, '127.0.0.1', resolve);
  });
  console.log('API E2E em http://127.0.0.1:4180 · armazenamento: memória (temporário)');

  return async function encerrarServidorDeTeste() {
    const encerrado = new Promise((resolve, reject) => {
      servidor.close((erro) => erro ? reject(erro) : resolve());
    });
    servidor.closeAllConnections();
    await encerrado;
  };
};

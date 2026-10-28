'use strict';

const { criarServidor } = require('../server.cjs');
const { criarServicoEstudos } = require('../src/servico-estudos.cjs');
const { criarRepositorioEstudos } = require('../src/repositorio-estudos-memoria.cjs');

module.exports = async function iniciarServidorDeTeste() {
  const servidor = criarServidor(criarServicoEstudos(criarRepositorioEstudos()));

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

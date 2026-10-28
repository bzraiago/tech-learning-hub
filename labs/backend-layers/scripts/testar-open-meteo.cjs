'use strict';

const { criarClienteOpenMeteo } = require('../src/cliente-open-meteo.cjs');

async function main() {
  const cliente = criarClienteOpenMeteo();
  const previsao = await cliente.consultar({ latitude: -3.73, longitude: -38.52 });
  console.log('Contrato Open-Meteo válido:');
  console.log(JSON.stringify(previsao, null, 2));
}

main().catch((erro) => {
  console.error(`Não foi possível verificar o serviço externo (categoria: ${erro.tipo || 'inesperada'}).`);
  process.exitCode = 1;
});

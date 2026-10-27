'use strict';

const { randomUUID } = require('node:crypto');
const { criarPoolEstudos } = require('../src/configuracao-banco.cjs');
const { criarRepositorioEstudosPostgres } = require('../src/repositorio-estudos-postgres.cjs');

async function demonstrarRollback() {
  const repositorio = criarRepositorioEstudosPostgres(criarPoolEstudos());
  const tituloCanonico = `rollback-${randomUUID()}`;

  try {
    try {
      await repositorio.criarComSessao(`Teste ${tituloCanonico}`, tituloCanonico, 0);
      throw new Error('O banco aceitou minutos zero; a restrição CHECK não atuou');
    } catch (erro) {
      if (erro.code !== '23514') throw erro;
    }

    const estudo = await repositorio.encontrarPorTituloCanonico(tituloCanonico);
    if (estudo) throw new Error('O estudo ficou gravado após a sessão falhar');
    console.log('Rollback confirmado: a falha da sessão também desfez a criação do estudo.');
  } finally {
    await repositorio.encerrar();
  }
}

if (require.main === module) {
  demonstrarRollback().catch((erro) => {
    console.error('Não foi possível confirmar o rollback. Confira a conexão e aplique as migrations.');
    console.error(`Código: ${erro.code || erro.name || 'desconhecido'}`);
    process.exitCode = 1;
  });
}

module.exports = { demonstrarRollback };

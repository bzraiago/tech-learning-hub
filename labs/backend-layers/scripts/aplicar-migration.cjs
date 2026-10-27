'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const { criarPoolEstudos } = require('../src/configuracao-banco.cjs');

const pastaPadrao = path.join(__dirname, '..', 'migrations');

async function aplicarMigrations({
  pool = criarPoolEstudos(),
  pastaMigrations = pastaPadrao,
  registrar = console.log
} = {}) {
  let cliente;

  try {
    cliente = await pool.connect();
    const arquivos = (await fs.readdir(pastaMigrations))
      .filter((arquivo) => /^\d+_[a-z0-9_-]+\.sql$/i.test(arquivo))
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

    if (!arquivos.length) throw new Error('Nenhum arquivo SQL numerado foi encontrado');

    for (const arquivo of arquivos) {
      let transacaoAberta = false;
      try {
        await cliente.query('BEGIN');
        transacaoAberta = true;
        await cliente.query(`
          CREATE TABLE IF NOT EXISTS migrations_aplicadas (
            id TEXT PRIMARY KEY,
            aplicada_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
          )
        `);

        const aplicada = await cliente.query(
          'SELECT id FROM migrations_aplicadas WHERE id = $1',
          [arquivo]
        );

        if (aplicada.rowCount > 0) {
          await cliente.query('COMMIT');
          transacaoAberta = false;
          registrar(`Migration já aplicada: ${arquivo}`);
          continue;
        }

        const sqlMigration = await fs.readFile(path.join(pastaMigrations, arquivo), 'utf8');
        await cliente.query(sqlMigration);
        await cliente.query('INSERT INTO migrations_aplicadas (id) VALUES ($1)', [arquivo]);
        await cliente.query('COMMIT');
        transacaoAberta = false;
        registrar(`Migration aplicada: ${arquivo}`);
      } catch (erro) {
        if (transacaoAberta) await cliente.query('ROLLBACK').catch(() => {});
        throw erro;
      }
    }
  } finally {
    cliente?.release();
    await pool.end();
  }
}

if (require.main === module) {
  aplicarMigrations().catch((erro) => {
    console.error('Falha ao aplicar migrations. Confira a conexão, os arquivos SQL e o estado do banco.');
    console.error(`Código: ${erro.code || erro.name || 'desconhecido'}`);
    process.exitCode = 1;
  });
}

module.exports = { aplicarMigrations };

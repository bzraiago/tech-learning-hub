'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const { criarPoolEstudos } = require('../src/configuracao-banco.cjs');

const arquivoMigration = path.join(__dirname, '..', 'migrations', '001_create_estudos.sql');
const idMigration = path.basename(arquivoMigration);

async function aplicarMigration() {
  const sqlMigration = await fs.readFile(arquivoMigration, 'utf8');
  const pool = criarPoolEstudos();
  let cliente;

  try {
    cliente = await pool.connect();
    await cliente.query('BEGIN');
    await cliente.query(`
      CREATE TABLE IF NOT EXISTS migrations_aplicadas (
        id TEXT PRIMARY KEY,
        aplicada_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const aplicada = await cliente.query(
      'SELECT id FROM migrations_aplicadas WHERE id = $1',
      [idMigration]
    );

    if (aplicada.rowCount > 0) {
      await cliente.query('COMMIT');
      console.log(`Migration já aplicada: ${idMigration}`);
      return;
    }

    await cliente.query(sqlMigration);
    await cliente.query('INSERT INTO migrations_aplicadas (id) VALUES ($1)', [idMigration]);
    await cliente.query('COMMIT');
    console.log(`Migration aplicada: ${idMigration}`);
  } catch (erro) {
    if (cliente) await cliente.query('ROLLBACK').catch(() => {});
    console.error('Falha ao aplicar migration. Confira a conexão e o estado do banco.');
    console.error(`Código: ${erro.code || erro.name || 'desconhecido'}`);
    process.exitCode = 1;
  } finally {
    cliente?.release();
    await pool.end();
  }
}

if (require.main === module) aplicarMigration();

module.exports = { aplicarMigration };

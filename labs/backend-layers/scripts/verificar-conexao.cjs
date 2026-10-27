'use strict';

const { criarPoolEstudos } = require('../src/configuracao-banco.cjs');

async function verificarConexao() {
  const pool = criarPoolEstudos();
  try {
    const resultado = await pool.query(
      'SELECT current_database() AS banco, current_user AS usuario, 1 AS conexao'
    );
    const [linha] = resultado.rows;
    console.log(`Conexão OK: banco=${linha.banco}; usuário=${linha.usuario}; consulta=${linha.conexao}`);
  } catch (erro) {
    console.error('Não foi possível conectar. Confira se o PostgreSQL está ativo e os valores PGHOST/PGPORT/PGUSER/PGDATABASE/PGPASSWORD.');
    console.error(`Código: ${erro.code || erro.name || 'desconhecido'}`);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

if (require.main === module) verificarConexao();

module.exports = { verificarConexao };

'use strict';

const { Pool } = require('pg');
const { logger } = require('./logger.cjs');

function criarPool({ user, password, database = process.env.PGDATABASE || 'backend_camadas' }) {
  const porta = Number(process.env.PGPORT || 55433);
  if (!Number.isInteger(porta) || porta < 1 || porta > 65535) {
    throw new Error('PGPORT deve ser um número entre 1 e 65535');
  }

  const pool = new Pool({
    host: process.env.PGHOST || '127.0.0.1',
    port: porta,
    user,
    password,
    database,
    max: 5
  });

  pool.on('error', (erro) => {
    logger.error('api.postgres.idle_connection.failed', erro);
  });

  return pool;
}

function criarPoolEstudos(database) {
  return criarPool({
    user: process.env.PGAPPUSER || 'backend_app',
    password: process.env.PGAPPPASSWORD,
    database
  });
}

function criarPoolMigracoes(database) {
  return criarPool({
    user: process.env.PGUSER || 'aluno',
    password: process.env.PGPASSWORD,
    database
  });
}

module.exports = { criarPoolEstudos, criarPoolMigracoes };

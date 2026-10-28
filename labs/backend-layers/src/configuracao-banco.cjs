'use strict';

const { Pool } = require('pg');
const { logger } = require('./logger.cjs');

function criarPoolEstudos() {
  const porta = Number(process.env.PGPORT || 55433);
  if (!Number.isInteger(porta) || porta < 1 || porta > 65535) {
    throw new Error('PGPORT deve ser um número entre 1 e 65535');
  }

  const pool = new Pool({
    host: process.env.PGHOST || '127.0.0.1',
    port: porta,
    user: process.env.PGUSER || 'aluno',
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE || 'backend_camadas',
    max: 5
  });

  pool.on('error', (erro) => {
    logger.error('api.postgres.idle_connection.failed', erro);
  });

  return pool;
}

module.exports = { criarPoolEstudos };

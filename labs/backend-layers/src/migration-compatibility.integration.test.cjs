'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { Pool } = require('pg');
const { aplicarMigrations } = require('../scripts/aplicar-migration.cjs');
const { criarRepositorioEstudosPostgres } = require('./repositorio-estudos-postgres.cjs');

const pastaMigrations = path.resolve(__dirname, '..', 'migrations');
const migrationsBase = [
  '001_create_estudos.sql',
  '002_create_sessoes_estudo.sql'
];

function criarPool(database) {
  const porta = Number(process.env.PGPORT || 55433);
  return new Pool({
    host: process.env.PGHOST || '127.0.0.1',
    port: porta,
    user: process.env.PGUSER || 'aluno',
    password: process.env.PGPASSWORD,
    database,
    max: 2
  });
}

async function aplicarMigrationsNaBase(database, pasta) {
  return aplicarMigrations({
    pool: criarPool(database),
    pastaMigrations: pasta,
    registrar: () => {}
  });
}

test('migration expansiva preserva leitura e escrita da aplicação anterior', {
  skip: process.env.RUN_MIGRATION_COMPATIBILITY !== '1'
}, async () => {
  const hostConfigurado = (process.env.PGHOST || '127.0.0.1').toLowerCase();
  const bancoConfigurado = process.env.PGDATABASE || 'backend_camadas';
  assert.ok(
    ['127.0.0.1', '::1', 'localhost'].includes(hostConfigurado),
    'Use somente PostgreSQL local para criar e remover a base temporária deste teste.'
  );
  assert.equal(
    bancoConfigurado,
    'backend_camadas',
    'Confirme que a conexão configurada pertence ao laboratório backend_camadas.'
  );

  const database = `compat_${randomUUID().replaceAll('-', '')}`;
  const pastaBase = await fs.mkdtemp(path.join(os.tmpdir(), 'hub-migration-base-'));
  const poolAdmin = criarPool('postgres');
  let poolAplicacao;
  let databaseCreated = false;

  try {
    await poolAdmin.query(`CREATE DATABASE "${database}"`);
    databaseCreated = true;

    for (const arquivo of migrationsBase) {
      await fs.copyFile(path.join(pastaMigrations, arquivo), path.join(pastaBase, arquivo));
    }
    await aplicarMigrationsNaBase(database, pastaBase);

    poolAplicacao = criarPool(database);
    const versaoAnterior = criarRepositorioEstudosPostgres(poolAplicacao);
    const antes = await versaoAnterior.criarComSessao(
      'Compatibilidade antes da migration',
      `antes-${randomUUID()}`,
      25
    );
    const leituraAntigaAntes = await poolAplicacao.query(
      'SELECT id, estudo_id, minutos, registrada_em FROM sessoes_estudo WHERE id = $1',
      [antes.sessao.id]
    );
    assert.equal(leituraAntigaAntes.rows[0].minutos, 25);

    await poolAplicacao.end();
    poolAplicacao = undefined;
    await aplicarMigrationsNaBase(database, pastaMigrations);

    poolAplicacao = criarPool(database);
    const versaoAnteriorAposMigration = criarRepositorioEstudosPostgres(poolAplicacao);
    const coluna = await poolAplicacao.query(
      "SELECT is_nullable FROM information_schema.columns WHERE table_name = 'sessoes_estudo' AND column_name = 'observacao'"
    );
    assert.deepEqual(coluna.rows, [{ is_nullable: 'YES' }]);

    const registroAntigo = await poolAplicacao.query(
      'SELECT observacao FROM sessoes_estudo WHERE id = $1',
      [antes.sessao.id]
    );
    assert.equal(registroAntigo.rows[0].observacao, null);

    const depois = await versaoAnteriorAposMigration.criarComSessao(
      'Compatibilidade depois da migration',
      `depois-${randomUUID()}`,
      30
    );
    assert.equal(depois.sessao.minutos, 30);

    const anotacaoNova = await poolAplicacao.query(
      'INSERT INTO sessoes_estudo (estudo_id, minutos, observacao) VALUES ($1, $2, $3) RETURNING id, observacao',
      [depois.estudo.id, 15, 'registro fictício da versão nova']
    );
    const leituraAntigaDepois = await poolAplicacao.query(
      'SELECT id, estudo_id, minutos, registrada_em FROM sessoes_estudo WHERE id = $1',
      [anotacaoNova.rows[0].id]
    );
    assert.equal(leituraAntigaDepois.rows[0].minutos, 15);
    assert.equal(leituraAntigaDepois.rows[0].estudo_id, depois.estudo.id);
    assert.equal(anotacaoNova.rows[0].observacao, 'registro fictício da versão nova');

    const gravacaoAntigaAposDadosNovos = await versaoAnteriorAposMigration.criarComSessao(
      'Compatibilidade após gravação nova',
      `apos-nova-${randomUUID()}`,
      20
    );
    const observacaoPreservada = await poolAplicacao.query(
      'SELECT observacao FROM sessoes_estudo WHERE id = $1',
      [anotacaoNova.rows[0].id]
    );
    assert.equal(gravacaoAntigaAposDadosNovos.sessao.minutos, 20);
    assert.equal(observacaoPreservada.rows[0].observacao, 'registro fictício da versão nova');

    const ledger = await poolAplicacao.query(
      'SELECT id FROM migrations_aplicadas ORDER BY id'
    );
    assert.deepEqual(ledger.rows.map((linha) => linha.id), [
      '001_create_estudos.sql',
      '002_create_sessoes_estudo.sql',
      '003_add_observacao_sessoes.sql'
    ]);

    console.log('Compatibilidade confirmada: versão anterior operou antes e depois da migration expansiva.');
  } finally {
    try {
      await poolAplicacao?.end();
    } finally {
      try {
        if (databaseCreated) {
          await poolAdmin.query(`DROP DATABASE IF EXISTS "${database}"`);
        }
      } finally {
        await poolAdmin.end();
        await fs.rm(pastaBase, { recursive: true, force: true });
      }
    }
  }
});

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { criarPoolEstudos, criarPoolMigracoes } = require('./configuracao-banco.cjs');

const executar = process.env.RUN_LEAST_PRIVILEGE_INTEGRATION === '1';

async function assertPermissaoRecusada(cliente, sql, parametros = []) {
  await cliente.query('SAVEPOINT tentativa_sem_permissao');
  await assert.rejects(
    () => cliente.query(sql, parametros),
    (erro) => erro.code === '42501'
  );
  await cliente.query('ROLLBACK TO SAVEPOINT tentativa_sem_permissao');
  await cliente.query('RELEASE SAVEPOINT tentativa_sem_permissao');
}

test('papel da API executa somente leitura e inclusão no PostgreSQL local', {
  skip: executar ? false : 'Defina RUN_LEAST_PRIVILEGE_INTEGRATION=1 após aplicar as migrations locais.'
}, async () => {
  const host = (process.env.PGHOST || '127.0.0.1').toLowerCase();
  const banco = process.env.PGDATABASE || 'backend_camadas';
  assert.ok(['127.0.0.1', '::1', 'localhost'].includes(host), 'Use somente PostgreSQL local.');
  assert.equal(banco, 'backend_camadas', 'Use somente o banco descartável backend_camadas.');

  const admin = criarPoolMigracoes();
  const app = criarPoolEstudos();
  const canonico = `privilegio-${randomUUID()}`;

  try {
    const papel = await admin.query(`
      SELECT rolsuper, rolcreatedb, rolcreaterole, rolreplication, rolbypassrls, rolinherit,
        (SELECT count(*) FROM pg_auth_members WHERE member = pg_roles.oid) AS memberships,
        has_database_privilege(rolname, current_database(), 'CONNECT') AS connect,
        has_database_privilege(rolname, current_database(), 'CREATE') AS database_create,
        has_database_privilege(rolname, current_database(), 'TEMP') AS temporary,
        has_schema_privilege(rolname, 'public', 'USAGE') AS schema_usage,
        has_schema_privilege(rolname, 'public', 'CREATE') AS schema_create,
        has_table_privilege(rolname, 'public.estudos', 'SELECT') AS studies_select,
        has_table_privilege(rolname, 'public.estudos', 'INSERT') AS studies_insert,
        has_table_privilege(rolname, 'public.estudos', 'UPDATE') AS studies_update,
        has_table_privilege(rolname, 'public.estudos', 'DELETE') AS studies_delete,
        has_table_privilege(rolname, 'public.sessoes_estudo', 'SELECT') AS sessions_select,
        has_table_privilege(rolname, 'public.sessoes_estudo', 'INSERT') AS sessions_insert,
        has_table_privilege(rolname, 'public.sessoes_estudo', 'UPDATE') AS sessions_update,
        has_table_privilege(rolname, 'public.sessoes_estudo', 'DELETE') AS sessions_delete,
        has_table_privilege(rolname, 'public.migrations_aplicadas', 'SELECT') AS migrations_select,
        has_sequence_privilege(rolname, 'public.estudos_id_seq', 'USAGE') AS study_sequence_usage,
        has_sequence_privilege(rolname, 'public.estudos_id_seq', 'SELECT') AS study_sequence_select,
        has_sequence_privilege(rolname, 'public.sessoes_estudo_id_seq', 'USAGE') AS session_sequence_usage,
        has_sequence_privilege(rolname, 'public.sessoes_estudo_id_seq', 'SELECT') AS session_sequence_select
      FROM pg_roles WHERE rolname = $1
    `, ['backend_app']);

    assert.equal(papel.rowCount, 1);
    assert.deepEqual(papel.rows[0], {
      rolsuper: false,
      rolcreatedb: false,
      rolcreaterole: false,
      rolreplication: false,
      rolbypassrls: false,
      rolinherit: false,
      memberships: '0',
      connect: true,
      database_create: false,
      temporary: false,
      schema_usage: true,
      schema_create: false,
      studies_select: true,
      studies_insert: true,
      studies_update: false,
      studies_delete: false,
      sessions_select: true,
      sessions_insert: true,
      sessions_update: false,
      sessions_delete: false,
      migrations_select: false,
      study_sequence_usage: true,
      study_sequence_select: false,
      session_sequence_usage: true,
      session_sequence_select: false
    });

    await app.query('BEGIN');
    const estudo = await app.query(
      'INSERT INTO estudos (titulo, titulo_canonico) VALUES ($1, $2) RETURNING id, titulo',
      [`Teste ${canonico}`, canonico]
    );
    const sessao = await app.query(
      'INSERT INTO sessoes_estudo (estudo_id, minutos) VALUES ($1, $2) RETURNING id',
      [estudo.rows[0].id, 25]
    );
    const leitura = await app.query(
      'SELECT estudos.titulo, sessoes_estudo.minutos FROM estudos JOIN sessoes_estudo ON sessoes_estudo.estudo_id = estudos.id WHERE sessoes_estudo.id = $1',
      [sessao.rows[0].id]
    );
    assert.deepEqual(leitura.rows, [{ titulo: `Teste ${canonico}`, minutos: 25 }]);

    await assertPermissaoRecusada(app, 'UPDATE estudos SET titulo = $1 WHERE id = $2', ['alterado', estudo.rows[0].id]);
    await assertPermissaoRecusada(app, 'DELETE FROM estudos WHERE id = $1', [estudo.rows[0].id]);
    await assertPermissaoRecusada(app, 'TRUNCATE estudos');
    await assertPermissaoRecusada(app, 'CREATE TABLE public.teste_criar_negado (id INTEGER)');
    await assertPermissaoRecusada(app, 'CREATE TEMP TABLE teste_temporaria_negada (id INTEGER)');
    await assertPermissaoRecusada(app, 'SELECT id FROM migrations_aplicadas');
    await app.query('ROLLBACK');
  } finally {
    await app.query('ROLLBACK').catch(() => {});
    await app.end();
    await admin.end();
  }
});

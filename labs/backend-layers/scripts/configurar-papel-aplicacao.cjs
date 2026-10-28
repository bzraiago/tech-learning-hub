'use strict';

const { criarPoolMigracoes } = require('../src/configuracao-banco.cjs');

const papelAplicacaoEsperado = 'backend_app';

function validarAlvoLocal({
  host = process.env.PGHOST || '127.0.0.1',
  banco = process.env.PGDATABASE || 'backend_camadas'
} = {}) {
  host = host.toLowerCase();
  if (!['127.0.0.1', '::1', 'localhost'].includes(host) || banco !== 'backend_camadas') {
    throw new Error('A configuração do papel só pode operar no PostgreSQL local backend_camadas.');
  }
}

async function configurarPapelAplicacao(opcoes = {}) {
  const pool = opcoes.pool || criarPoolMigracoes();
  const papel = opcoes.papel || process.env.PGAPPUSER || papelAplicacaoEsperado;
  const senha = opcoes.senha ?? process.env.PGAPPPASSWORD;
  try {
    validarAlvoLocal();
    if (papel !== papelAplicacaoEsperado) {
      throw new Error(`PGAPPUSER deve ser ${papelAplicacaoEsperado}.`);
    }
    if (typeof senha !== 'string' || senha.length < 12) {
      throw new Error('PGAPPPASSWORD deve conter pelo menos 12 caracteres fictícios locais.');
    }

    const propriedade = await pool.query(`
      SELECT
        EXISTS (
          SELECT 1 FROM pg_database
          WHERE datname = current_database()
            AND datdba = (SELECT oid FROM pg_roles WHERE rolname = $1)
        ) AS proprietario_banco,
        EXISTS (
          SELECT 1 FROM pg_namespace
          WHERE nspname = 'public'
            AND nspowner = (SELECT oid FROM pg_roles WHERE rolname = $1)
        ) AS proprietario_schema,
        EXISTS (
          SELECT 1
          FROM pg_class AS objeto
          JOIN pg_namespace AS esquema ON esquema.oid = objeto.relnamespace
          WHERE esquema.nspname = 'public'
            AND objeto.relowner = (SELECT oid FROM pg_roles WHERE rolname = $1)
        ) AS proprietario_objetos
    `, [papel]);
    const propriedadeAtual = propriedade.rows[0];
    if (propriedadeAtual.proprietario_banco || propriedadeAtual.proprietario_schema || propriedadeAtual.proprietario_objetos) {
      throw new Error('backend_app não pode ser proprietária do banco, schema public ou objetos desse schema.');
    }

    const resultado = await pool.query(`
      SELECT CASE
        WHEN EXISTS (SELECT 1 FROM pg_roles WHERE rolname = $1)
          THEN format(
            'ALTER ROLE %I WITH LOGIN PASSWORD %L NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS NOINHERIT CONNECTION LIMIT 10',
            $1, $2
          )
        ELSE format(
          'CREATE ROLE %I WITH LOGIN PASSWORD %L NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS NOINHERIT CONNECTION LIMIT 10',
          $1, $2
        )
      END AS comando
    `, [papel, senha]);
    await pool.query(resultado.rows[0].comando);

    const databasePrivileges = await pool.query(`
      SELECT
        format('REVOKE CONNECT, TEMPORARY ON DATABASE %I FROM PUBLIC', current_database()) AS revogar_publico,
        format('REVOKE ALL PRIVILEGES ON DATABASE %I FROM %I', current_database(), $1) AS revogar_aplicacao,
        format('GRANT CONNECT ON DATABASE %I TO %I', current_database(), $1) AS conceder
    `, [papel]);
    await pool.query(databasePrivileges.rows[0].revogar_publico);
    await pool.query(databasePrivileges.rows[0].revogar_aplicacao);
    await pool.query(databasePrivileges.rows[0].conceder);

    const memberships = await pool.query(`
      SELECT role_grupo.rolname
      FROM pg_auth_members AS associacao
      JOIN pg_roles AS role_grupo ON role_grupo.oid = associacao.roleid
      JOIN pg_roles AS role_aplicacao ON role_aplicacao.oid = associacao.member
      WHERE role_aplicacao.rolname = $1
    `, [papel]);

    for (const membership of memberships.rows) {
      const revoke = await pool.query(
        'SELECT format(\'REVOKE %I FROM %I\', $1, $2) AS comando',
        [membership.rolname, papel]
      );
      await pool.query(revoke.rows[0].comando);
    }
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  configurarPapelAplicacao().then(() => {
    console.log('Papel backend_app configurado para execução da API com privilégios limitados.');
  }).catch((erro) => {
    console.error('Não foi possível configurar o papel da API. Confira o PostgreSQL local e o .env sem imprimir credenciais.');
    console.error(`Código: ${erro.code || erro.name || 'desconhecido'}`);
    process.exitCode = 1;
  });
}

module.exports = { configurarPapelAplicacao, validarAlvoLocal };

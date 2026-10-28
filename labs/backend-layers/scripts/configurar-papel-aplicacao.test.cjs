'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  configurarPapelAplicacao,
  validarAlvoLocal
} = require('./configurar-papel-aplicacao.cjs');

function criarPoolFalso() {
  const chamadas = [];
  return {
    chamadas,
    async query(sql, parametros = []) {
      chamadas.push({ sql, parametros });
      if (sql.includes('proprietario_banco')) {
        return { rows: [{ proprietario_banco: false, proprietario_schema: false, proprietario_objetos: false }] };
      }
      if (sql.includes('SELECT CASE')) return { rows: [{ comando: 'CREATE ROLE "backend_app" ...' }] };
      if (sql.includes('current_database()')) {
        return { rows: [{ revogar_publico: 'REVOKE CONNECT, TEMPORARY ON DATABASE backend_camadas FROM PUBLIC', revogar_aplicacao: 'REVOKE ALL PRIVILEGES ON DATABASE backend_camadas FROM backend_app', conceder: 'GRANT CONNECT ON DATABASE backend_camadas TO backend_app' }] };
      }
      if (sql.includes('FROM pg_auth_members')) return { rows: [] };
      return { rows: [] };
    },
    async end() { chamadas.push({ sql: 'END' }); }
  };
}

test('limita configuração de papel ao PostgreSQL local do laboratório', () => {
  assert.doesNotThrow(() => validarAlvoLocal({ host: 'LOCALHOST', banco: 'backend_camadas' }));
  assert.throws(() => validarAlvoLocal({ host: 'db.exemplo.invalid', banco: 'backend_camadas' }), /PostgreSQL local/);
  assert.throws(() => validarAlvoLocal({ host: '127.0.0.1', banco: 'producao' }), /backend_camadas/);
});

test('cria papel sem privilégios administrativos usando senha como parâmetro e fecha a conexão', async () => {
  const pool = criarPoolFalso();
  await configurarPapelAplicacao({ pool, papel: 'backend_app', senha: 'senha-ficticia-segura' });

  assert.equal(pool.chamadas.length, 9);
  assert.deepEqual(pool.chamadas[0].parametros, ['backend_app']);
  assert.equal(pool.chamadas[0].sql.includes('pg_database'), true);
  assert.deepEqual(pool.chamadas[1].parametros, ['backend_app', 'senha-ficticia-segura']);
  assert.match(pool.chamadas[1].sql, /format\(/);
  assert.match(pool.chamadas[1].sql, /\$1::text,\s*\$2::text/);
  assert.equal(pool.chamadas[1].sql.includes('senha-ficticia-segura'), false);
  assert.match(pool.chamadas[2].sql, /^CREATE ROLE/);
  assert.equal(pool.chamadas[3].sql.includes('current_database()'), true);
  assert.match(pool.chamadas[3].sql, /current_database\(\),\s*\$1::text/);
  assert.match(pool.chamadas[4].sql, /^REVOKE CONNECT/);
  assert.match(pool.chamadas[5].sql, /^REVOKE ALL PRIVILEGES ON DATABASE/);
  assert.match(pool.chamadas[6].sql, /^GRANT CONNECT/);
  assert.equal(pool.chamadas[7].sql.includes('pg_auth_members'), true);
  assert.equal(pool.chamadas[8].sql, 'END');
});

test('recusa role que já possui o banco, schema ou objetos do laboratório', async () => {
  const pool = criarPoolFalso();
  pool.query = async function query(sql, parametros = []) {
    this.chamadas.push({ sql, parametros });
    if (sql.includes('proprietario_banco')) {
      return { rows: [{ proprietario_banco: false, proprietario_schema: true, proprietario_objetos: false }] };
    }
    return { rows: [] };
  };

  await assert.rejects(
    configurarPapelAplicacao({ pool, papel: 'backend_app', senha: 'senha-ficticia-segura' }),
    /não pode ser proprietária/
  );
  assert.equal(pool.chamadas.length, 2);
  assert.equal(pool.chamadas.at(-1).sql, 'END');
});

test('recusa papel ou senha fora do contrato antes de executar SQL', async () => {
  const papelInvalido = criarPoolFalso();
  await assert.rejects(
    configurarPapelAplicacao({ pool: papelInvalido, papel: 'aluno', senha: 'senha-ficticia-segura' }),
    /PGAPPUSER deve ser backend_app/
  );
  assert.deepEqual(papelInvalido.chamadas, [{ sql: 'END' }]);

  const senhaInvalida = criarPoolFalso();
  await assert.rejects(
    configurarPapelAplicacao({ pool: senhaInvalida, papel: 'backend_app', senha: 'curta' }),
    /pelo menos 12 caracteres/
  );
  assert.deepEqual(senhaInvalida.chamadas, [{ sql: 'END' }]);
});

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { aplicarMigrations } = require('./aplicar-migration.cjs');

function criarPoolFalso() {
  const aplicadas = new Set();
  const arquivosExecutados = [];
  const transacoes = [];
  let liberado = 0;

  const cliente = {
    async query(sql, valores = []) {
      const consulta = sql.trim();
      if (consulta === 'BEGIN' || consulta === 'COMMIT' || consulta === 'ROLLBACK') {
        transacoes.push(consulta);
        return { rows: [], rowCount: 0 };
      }
      if (consulta.startsWith('SELECT id FROM migrations_aplicadas')) {
        const existe = aplicadas.has(valores[0]);
        return { rows: existe ? [{ id: valores[0] }] : [], rowCount: existe ? 1 : 0 };
      }
      if (consulta.startsWith('INSERT INTO migrations_aplicadas')) {
        aplicadas.add(valores[0]);
        return { rows: [], rowCount: 1 };
      }
      if (consulta.startsWith('CREATE TABLE IF NOT EXISTS migrations_aplicadas')) {
        return { rows: [], rowCount: 0 };
      }
      if (consulta.includes('-- falha simulada')) {
        throw Object.assign(new Error('falha simulada'), { code: '42601' });
      }
      arquivosExecutados.push(consulta);
      return { rows: [], rowCount: 0 };
    },
    release() { liberado += 1; }
  };

  return {
    aplicadas,
    arquivosExecutados,
    transacoes,
    obterLiberacoes: () => liberado,
    async connect() { return cliente; },
    async end() {}
  };
}

test('aplica migrations numeradas em ordem e ignora arquivos já registrados', async (contexto) => {
  const pastaMigrations = await fs.mkdtemp(path.join(os.tmpdir(), 'hub-migrations-'));
  contexto.after(() => fs.rm(pastaMigrations, { recursive: true, force: true }));
  await fs.writeFile(path.join(pastaMigrations, '002_segunda.sql'), 'ALTER TABLE estudos ADD coluna_b INTEGER;');
  await fs.writeFile(path.join(pastaMigrations, '001_primeira.sql'), 'CREATE TABLE estudos (id INTEGER);');
  await fs.writeFile(path.join(pastaMigrations, 'notas.txt'), 'arquivo não executável');

  const pool = criarPoolFalso();
  const mensagens = [];
  const opcoes = { pool, pastaMigrations, registrar: (mensagem) => mensagens.push(mensagem) };

  await aplicarMigrations(opcoes);
  await aplicarMigrations(opcoes);

  assert.deepEqual(pool.arquivosExecutados, [
    'CREATE TABLE estudos (id INTEGER);',
    'ALTER TABLE estudos ADD coluna_b INTEGER;'
  ]);
  assert.deepEqual([...pool.aplicadas], ['001_primeira.sql', '002_segunda.sql']);
  assert.equal(mensagens.filter((mensagem) => mensagem.startsWith('Migration já aplicada:')).length, 2);
  assert.equal(pool.obterLiberacoes(), 2);
});

test('faz rollback e não registra migration cuja execução falhou', async (contexto) => {
  const pastaMigrations = await fs.mkdtemp(path.join(os.tmpdir(), 'hub-migration-falha-'));
  contexto.after(() => fs.rm(pastaMigrations, { recursive: true, force: true }));
  await fs.writeFile(path.join(pastaMigrations, '001_falha.sql'), '-- falha simulada');
  const pool = criarPoolFalso();

  await assert.rejects(() => aplicarMigrations({ pool, pastaMigrations }), { code: '42601' });

  assert.deepEqual(pool.transacoes, ['BEGIN', 'ROLLBACK']);
  assert.equal(pool.aplicadas.size, 0);
  assert.equal(pool.obterLiberacoes(), 1);
});

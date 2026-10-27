'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { criarRepositorioEstudosPostgres } = require('./repositorio-estudos-postgres.cjs');

test('repositório PostgreSQL retorna estudos sem expor a coluna canônica', async () => {
  const chamadas = [];
  const pool = {
    async query(sql, valores) {
      chamadas.push({ sql, valores });
      if (sql.startsWith('SELECT id, titulo FROM estudos ORDER BY')) {
        return { rows: [{ id: 1, titulo: 'HTML', titulo_canonico: 'html' }] };
      }
      if (sql.includes('WHERE titulo_canonico =')) {
        return { rows: [{ id: 1, titulo: 'HTML' }] };
      }
      return { rows: [{ id: 3, titulo: 'CSS' }] };
    },
    async end() {}
  };
  const repositorio = criarRepositorioEstudosPostgres(pool);

  assert.deepEqual(await repositorio.listar(), [{ id: 1, titulo: 'HTML' }]);
  assert.deepEqual(await repositorio.encontrarPorTituloCanonico('html'), { id: 1, titulo: 'HTML' });
  assert.deepEqual(await repositorio.inserir('CSS', 'css'), { id: 3, titulo: 'CSS' });

  assert.deepEqual(chamadas[1].valores, ['html']);
  assert.deepEqual(chamadas[2].valores, ['CSS', 'css']);
  assert.match(chamadas[2].sql, /VALUES \(\$1, \$2\)/);
});

test('criarComSessao confirma as duas gravações na mesma transação', async () => {
  const comandos = [];
  const valores = [];
  let liberado = false;
  const cliente = {
    async query(sql, parametros = []) {
      comandos.push(sql.trim());
      valores.push(parametros);
      if (sql.includes('INSERT INTO estudos')) return { rows: [{ id: 7, titulo: 'CSS' }] };
      if (sql.includes('INSERT INTO sessoes_estudo')) {
        return { rows: [{ id: 3, estudo_id: 7, minutos: 25, registrada_em: '2026-10-27T12:00:00.000Z' }] };
      }
      return { rows: [], rowCount: 0 };
    },
    release() { liberado = true; }
  };
  const pool = { async connect() { return cliente; } };
  const resultado = await criarRepositorioEstudosPostgres(pool).criarComSessao('CSS', 'css', 25);

  assert.deepEqual(comandos, [
    'BEGIN',
    'INSERT INTO estudos (titulo, titulo_canonico) VALUES ($1, $2) RETURNING id, titulo',
    'INSERT INTO sessoes_estudo (estudo_id, minutos) VALUES ($1, $2) RETURNING id, estudo_id, minutos, registrada_em',
    'COMMIT'
  ]);
  assert.deepEqual(valores[1], ['CSS', 'css']);
  assert.deepEqual(valores[2], [7, 25]);
  assert.deepEqual(resultado, {
    estudo: { id: 7, titulo: 'CSS' },
    sessao: { id: 3, estudoId: 7, minutos: 25, registradaEm: '2026-10-27T12:00:00.000Z' }
  });
  assert.equal(liberado, true);
});

test('repositório reverte a primeira gravação se a sessão for recusada', async () => {
  const comandos = [];
  const cliente = {
    async query(sql) {
      comandos.push(sql.trim());
      if (sql.includes('INSERT INTO estudos')) return { rows: [{ id: 8, titulo: 'CSS' }] };
      if (sql.includes('INSERT INTO sessoes_estudo')) {
        throw Object.assign(new Error('restrição CHECK'), { code: '23514' });
      }
      return { rows: [], rowCount: 0 };
    },
    release() { comandos.push('RELEASE'); }
  };
  const pool = { async connect() { return cliente; } };

  await assert.rejects(
    () => criarRepositorioEstudosPostgres(pool).criarComSessao('CSS', 'css', 0),
    { code: '23514' }
  );

  assert.equal(comandos.at(-2), 'ROLLBACK');
  assert.equal(comandos.at(-1), 'RELEASE');
});

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

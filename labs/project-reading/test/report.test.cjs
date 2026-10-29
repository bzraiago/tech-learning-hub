const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createReport } = require('../src/report.cjs');

test('conta somente as sessões concluídas', () => {
  const report = createReport([
    { minutes: 40, status: 'completed' },
    { minutes: 20, status: 'paused' },
    { minutes: 35, status: 'completed' }
  ]);

  assert.equal(report.completedCount, 2);
});

test('soma os minutos das sessões concluídas', () => {
  const report = createReport([
    { minutes: 40, status: 'completed' },
    { minutes: 35, status: 'completed' },
    { minutes: 20, status: 'paused' }
  ]);

  assert.equal(report.totalMinutes, 75);
});

test('retorna zero minutos quando não há sessão concluída', () => {
  const report = createReport([{ minutes: 20, status: 'paused' }]);

  assert.equal(report.totalMinutes, 0);
});

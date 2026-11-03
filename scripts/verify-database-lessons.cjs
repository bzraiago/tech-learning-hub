'use strict';

// Executa o código real das aulas em bases descartáveis, sem serviços externos.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ console, URL, document: { querySelector: () => ({}) }, window: { matchMedia: () => ({matches: false}) } });
for (const match of fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)) {
  const source = match[1].split('?')[0];
  if (source.startsWith('assets/js/data/')) vm.runInContext(fs.readFileSync(path.join(root, source), 'utf8'), context);
}
const { tracks, LESSON_GUIDES: guides, PROJECTS: projects } = vm.runInContext('({tracks, LESSON_GUIDES, PROJECTS})', context);
const runtime = ['python', 'py', 'python3'].find(command => spawnSync(command, ['--version'], { encoding: 'utf8' }).status === 0);
assert.ok(runtime, 'Python 3 necessário; nenhum pacote adicional é instalado.');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'techhub-database-'));
assert.equal(path.dirname(directory), path.resolve(os.tmpdir()));
assert.ok(path.basename(directory).startsWith('techhub-database-'));
function run(file, input = '') {
  const result = spawnSync(runtime, [file], { cwd: directory, input, encoding: 'utf8', timeout: 15000, env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
  assert.equal(result.status, 0, `${file}: ${result.error || result.stderr}`);
  return result.stdout.replace(/\r/g, '');
}
function sql(id, input = '.sair\n') {
  fs.writeFileSync(path.join(directory, 'aula.sql'), guides[id].example.code);
  return run('executar.py', input);
}
try {
  const runner = guides['db-modeling'].example.steps[0].blocks[0].code;
  fs.writeFileSync(path.join(directory, 'executar.py'), runner);
  const outputs = {
    'db-modeling': ['1 | 10 | 1', '2 | 10 | 0'],
    'db-normalization': ['1 | 10 | 2026-10-24', '1 | 20 | NULL'],
    'db-ddl-constraints': ['10 | Revisar SQL | 30 | 0'],
    'db-ddl-crud': ['10 | SELECT | 30 | 1', '11 | JOIN | 40 | 0'],
    'db-select': ['JOIN | 40', 'SELECT | 30', 'Arquivos | 30', '1 | SELECT | Sem observação'],
    'db-aggregation': ['Dados | 2 | 70', 'Python | 1 | 30'],
    'db-joins': ['Python | NULL', 'Dados | 2', 'Python | 0'],
    'db-subqueries-ctes': ['Python | 0 | 0'],
    'db-transactions': ['Ana | 90', 'Beto | 60', 'Ana | 100', 'Beto | 50', '150'],
    'db-concurrency-boundaries': ['1 | Publicar aula | publicada'],
    'db-project': ['Ana | Dados | 2 | 1 | 50.0', 'Ana | Python | 0 | 0 | 0', 'Beto | Dados | 2 | 0 | 0.0']
  };
  for (const [id, expected] of Object.entries(outputs)) {
    const output = sql(id);
    for (const line of expected) assert.ok(output.includes(line), `${id}: saída ausente ${line}`);
    assert.ok(output.includes('sql> '));
    assert.equal(sql(id), output, `${id}: retomada deve partir da mesma base`);
  }
  const invalid = sql('db-ddl-constraints', "INSERT INTO tarefas(id,categoria_id,titulo,minutos) VALUES(11,99,'Teste',20);\nSELECT COUNT(*) AS preservadas FROM tarefas;\n.sair\n");
  assert.match(invalid, /IntegrityError: FOREIGN KEY constraint failed/);
  assert.match(invalid, /preservadas\n1/);
  const rollback = sql('db-transactions', 'BEGIN;\nUPDATE contas SET saldo=saldo-15 WHERE id=1 AND saldo>=15;\nSELECT changes() AS debitos;\nUPDATE contas SET saldo=saldo+15 WHERE id=99;\nSELECT changes() AS creditos;\nROLLBACK;\nSELECT nome,saldo FROM contas ORDER BY id;\n.sair\n');
  assert.match(rollback, /debitos\n1/);
  assert.match(rollback, /creditos\n0/);
  assert.match(rollback, /Ana \| 100\nBeto \| 50\nsql> $/);
  const old = guides['db-concurrency-boundaries'].example.code;
  guides['db-concurrency-boundaries'].example.code = old.replace('ROLLBACK TO aviso;\n', '');
  assert.match(sql('db-concurrency-boundaries'), /Publicar aula e enviar aviso \| publicada/);
  guides['db-concurrency-boundaries'].example.code = old;
  const view = sql('db-subqueries-ctes', 'CREATE VIEW totais AS SELECT trilha_id,SUM(minutos) AS minutos FROM licoes GROUP BY trilha_id;\nSELECT * FROM totais;\n.sair\n');
  assert.match(view, /trilha_id \| minutos\n1 \| 70/);
  const build = sql('db-aggregation', guides['db-aggregation'].exercises[2].solution + '\n.sair\n');
  assert.match(build, /Dados \| 2 \| 70\nPython \| 1 \| 30\nGit \| 1 \| 15/);
  // Soluções SQL realmente exibidas: cada exercício parte de uma base nova.
  const exerciseCases = [
    ['db-ddl-crud', 0, ['0']],
    ['db-ddl-crud', 1, ['10 | SELECT\n11 | JOIN']],
    ['db-ddl-crud', 2, ['13 | 0', '13 | 1']],
    ['db-ddl-crud', 3, ['10 | 30\n11 | 25']],
    ['db-select', 0, ['SELECT\nJOIN\nArquivos']],
    ['db-select', 1, ['JOIN | 40', 'SELECT | 30']],
    ['db-select', 2, ['1 | SELECT | Sem observação', '2 | JOIN | Revisar', '4 | Arquivos | ']],
    ['db-select', 3, ['1\n3']],
    ['db-aggregation', 0, ['Dados | 2 | 35.0\nPython | 2 | 25.0']],
    ['db-aggregation', 1, ['Dados | 2 | 70']],
    ['db-aggregation', 2, ['Dados | 2 | 70\nPython | 1 | 30\nGit | 1 | 15']],
    ['db-aggregation', 3, ['Dados | 2 | 70\nPython | 2 | 50']],
    ['db-joins', 0, ['Dados | 2\nPython | 0']],
    ['db-joins', 1, ['Python']],
    ['db-joins', 2, ['Dados | JOIN\nPython | NULL']],
    ['db-joins', 3, ['Dados | JOIN\nPython | NULL']],
    ['db-subqueries-ctes', 2, ['Python | 0\nGit | 0']],
    ['db-transactions', 0, ['105', '100']],
    ['db-transactions', 1, ['Ana | 80\nBeto | 70', '150']],
    ['db-transactions', 3, ['Ana | 90\nBeto | 60', '150']]
  ];
  for (const [id, index, expected] of exerciseCases) {
    const output = sql(id, guides[id].exercises[index].solution + '\n.sair\n').split('sql> ').slice(1).join('sql> ');
    assert.doesNotMatch(output, /(?:Operational|Integrity|Programming)Error/);
    for (const value of expected) assert.ok(output.includes(value), `${id}:${index}: ${output}`);
  }
  const cteSteps = guides['db-subqueries-ctes'].example.steps.find(step => step.title === 'Confira a etapa interna e uma consulta reutilizável');
  const cteOutput = sql('db-subqueries-ctes', cteSteps.blocks[0].code + '\n' + cteSteps.alternatives[0].blocks[0].code + '\n.sair\n');
  assert.doesNotMatch(cteOutput, /(?:Operational|Integrity|Programming)Error/);
  assert.match(cteOutput, /Dados \| 70 \| 3\nPython \| 0 \| 0/);
  const concurrency = guides['db-concurrency-boundaries'].example.steps[2].alternatives.find(item => item.title === 'Demonstração de duas conexões');
  fs.writeFileSync(path.join(directory, 'concorrencia.py'), concurrency.blocks[0].code);
  assert.equal(run('concorrencia.py').trim(), concurrency.blocks[2].code);
  assert.equal(run('concorrencia.py').trim(), concurrency.blocks[2].code);
  // Coluna adicional: conversão de afinidade, ausência, fração e limites.
  const ddlOriginal = guides['db-ddl-constraints'].example.code;
  guides['db-ddl-constraints'].example.code = ddlOriginal.replace('CREATE TABLE tarefas(\n', 'CREATE TABLE tarefas(\n' + guides['db-ddl-constraints'].exercises[1].solution + ',\n');
  const priority = sql('db-ddl-constraints', "SELECT prioridade FROM tarefas;\nINSERT INTO tarefas(id,categoria_id,titulo,minutos,prioridade) VALUES(11,1,'Teste',20,1.5);\nINSERT INTO tarefas(id,categoria_id,titulo,minutos,prioridade) VALUES(11,1,'Teste',20,NULL);\nINSERT INTO tarefas(id,categoria_id,titulo,minutos,prioridade) VALUES(11,1,'Teste',20,0);\nINSERT INTO tarefas(id,categoria_id,titulo,minutos,prioridade) VALUES(11,1,'Teste',20,4);\nINSERT INTO tarefas(id,categoria_id,titulo,minutos,prioridade) VALUES(11,1,'Teste',20,3);\nSELECT id,prioridade FROM tarefas ORDER BY id;\n.sair\n");
  assert.equal((priority.match(/IntegrityError:/g) || []).length, 4);
  assert.match(priority, /10 \| 2\n11 \| 3/);
  guides['db-ddl-constraints'].example.code = ddlOriginal;
  const affinity = sql('db-ddl-constraints', "INSERT INTO tarefas(id,categoria_id,titulo,minutos) VALUES(11,1,'Teste','30');\nSELECT typeof(minutos),minutos FROM tarefas WHERE id=11;\n.sair\n");
  assert.match(affinity, /integer \| 30/);
  // Uma falha que torna a etapa obrigatória exige reverter também a publicação.
  guides['db-concurrency-boundaries'].example.code = old.replace('COMMIT;', 'ROLLBACK;');
  assert.match(sql('db-concurrency-boundaries'), /1 \| Publicar aula \| pendente/);
  guides['db-concurrency-boundaries'].example.code = old;
  for (const [id, expected] of [
    ['db-sqlite', ["[('Python', 1, 0), ('SQL', 2, 1)]", 'Transação revertida\n0']],
    ['db-security', ['Guia d\'água', '[]']],
    ['db-recovery', ["[(1, 'SQL')]", "['id', 'titulo']"]]
  ]) {
    fs.writeFileSync(path.join(directory, `${id}.py`), guides[id].example.code);
    const output = run(`${id}.py`);
    for (const text of expected) assert.ok(output.includes(text), `${id}: ${output}`);
  }
  for (const [id, filename] of [['project-db-sql', 'verificar_catalogo.py'], ['project-db-recovery', 'verificar_recuperacao.py']]) {
    const project = projects.find(p => p.id === id);
    fs.writeFileSync(path.join(directory, project.sourceLabel), project.solution);
    fs.writeFileSync(path.join(directory, filename), project.testsCode);
    assert.match(run(filename), /OK:/);
  }
  // Todos os rascunhos dos exercícios trocados acompanham sua atividade.
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/core/state.js'), 'utf8'), context);
  const migrated = vm.runInContext(`(() => {
    const before = {databaseRevision:3,notes:{},completed:{'db-sqlite':true},quizAttempts:{'db-sqlite':{answers:[0,0,0],checked:true}}};
    for(const id of ['db-postgres','db-mariadb','db-sqlite','db-firebird']){
      before.notes[id+':2']='diagnostico'; before.notes[id+':3']='construcao';
      before.notes[id+':requirement-change']='evidencia';
    }
    const after=sanitizeState(before);
    return {after,twice:sanitizeState(after)};
  })()`, context);
  for (const id of ['db-postgres','db-mariadb','db-sqlite','db-firebird']) {
    assert.equal(migrated.after.notes[`${id}:2`], 'construcao');
    assert.equal(migrated.after.notes[`${id}:3`], 'diagnostico');
    assert.equal(migrated.after.notes[`${id}:requirement-change`], 'evidencia');
  }
  assert.equal(migrated.after.databaseRevision, 4);
  assert.equal(migrated.after.completed['db-sqlite'], true);
  assert.ok(migrated.after.quizAttempts['db-sqlite']);
  assert.deepEqual(JSON.parse(JSON.stringify(migrated.after)), JSON.parse(JSON.stringify(migrated.twice)));
  for (const module of tracks.find(t=>t.id==='database').modules) for (const lesson of module.lessons) {
    ['Prever:', 'Alterar:', 'Construir:', 'Investigar erro:'].forEach((prefix, index) => assert.ok(guides[lesson.id].exercises[index].prompt.startsWith(prefix), `${lesson.id}:${index}`));
    assert.ok(guides[lesson.id].requirementChange?.criteria.length >= 2, lesson.id);
  }
  console.log('PASS: 11 exemplos SQL e retomada; 3 exemplos Python; FK recusada com estado preservado; rollback após destino ausente; SAVEPOINT corrigido; view; transferência de agregação; 2 projetos; migração idempotente de rascunhos e 28 aulas com etapas/desafios.');
  console.log('Não executa PostgreSQL, Docker, MariaDB, Firebird ou MongoDB.');
  console.log('Fundamentos: 20 soluções SQL adicionais, duas CTEs, view/EXISTS, prioridade com 4 recusas, afinidade, rollback completo e duas conexões com bloqueio real/retomada passaram.');
} finally {
  fs.rmSync(directory, {recursive: true, force: true});
}

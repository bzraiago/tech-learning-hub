'use strict';

// Executa o código realmente exibido na aula em uma pasta temporária, sem tocar
// nos arquivos de estudo do aluno nem em serviços de nuvem.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ LESSON_GUIDES: {} });
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/data/lesson-guides/preparacao-docker.js'), 'utf8'), context);
const guide = context.LESSON_GUIDES['setup-docker-alternative'];
const runtime = ['python', 'py', 'python3'].find(command => {
  const result = spawnSync(command, ['--version'], { encoding: 'utf8', timeout: 10000 });
  return result.status === 0 && /^Python 3\./.test(result.stdout.trim());
});
assert.ok(runtime, 'É necessário um comando Python 3 funcional para verificar esta aula.');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'tlh-sqlite-aula- com espacos-'));
assert.equal(path.dirname(path.resolve(directory)), path.resolve(os.tmpdir()));
assert.ok(path.basename(directory).startsWith('tlh-sqlite-aula-'));
const script = path.join(directory, 'sqlite_alternativa.py');
const run = (args = ['sqlite_alternativa.py']) => spawnSync(runtime, args, { cwd: directory, encoding: 'utf8', timeout: 10000 });
const success = expected => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.replaceAll('\r\n', '\n').trim(), expected);
};
try {
  const warmup = guide.example.steps[2].blocks[0].code;
  fs.writeFileSync(script, warmup);
  success('Arquivo Python funcionando');
  assert.equal(fs.existsSync(path.join(directory, 'alternativa-sqlite.db')), false);
  assert.equal(guide.example.steps[5].blocks[0].code, guide.example.code);
  fs.writeFileSync(script, guide.example.code);
  success('Iniciando a pratica SQLite.\nRegistros de marcador: 1');
  success('Iniciando a pratica SQLite.\nRegistros de marcador: 2');
  const altered = guide.example.code.replace('Registros de marcador:', 'Total de registros:');
  fs.writeFileSync(script, altered);
  success('Iniciando a pratica SQLite.\nTotal de registros: 3');
  fs.writeFileSync(script, altered + '\nprint("Pratica concluida.")\n');
  success('Iniciando a pratica SQLite.\nTotal de registros: 4\nPratica concluida.');
  const count = run(['-c', 'import sqlite3; c=sqlite3.connect("alternativa-sqlite.db"); print(c.execute("SELECT COUNT(*) FROM marcador").fetchone()[0]); c.close()']);
  assert.equal(count.status, 0, count.stderr);
  assert.equal(count.stdout.trim(), '4');
  fs.writeFileSync(script, '');
  success('');
  fs.writeFileSync(script, 'py sqlite_alternativa.py');
  const syntax = run();
  assert.notEqual(syntax.status, 0);
  assert.match(syntax.stderr, /SyntaxError/);
  assert.match(syntax.stderr, /py sqlite_alternativa\.py/);
  const missing = run(['arquivo-inexistente.py']);
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /No such file or directory/);
  fs.writeFileSync(script, guide.example.code);
  success('Iniciando a pratica SQLite.\nRegistros de marcador: 5');
  console.log(`PASS: mensagem simples, contagens 1/2, alteração 3, requisito 4, leitura do banco, arquivo vazio, SyntaxError, arquivo ausente e retomada 5 (${runtime}).`);
} finally {
  // directory foi criado por mkdtemp e seu pai e prefixo foram conferidos acima.
  fs.rmSync(directory, { recursive: true, force: true });
}

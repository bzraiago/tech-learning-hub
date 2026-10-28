'use strict';

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const labDirectory = path.resolve(__dirname, '..');
const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'backend-layers-backup-'));
const localDumpPath = path.join(temporaryDirectory, 'backend_camadas.dump');
const suffix = `${Date.now().toString(36)}_${process.pid}`;
const restoreDatabase = `backend_restore_${suffix}`;
const containerDumpPath = `/tmp/${restoreDatabase}.dump`;
let restoreDatabaseCreated = false;

function compose(argumentsList) {
  return execFileSync('docker', ['compose', ...argumentsList], {
    cwd: labDirectory,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  }).trimEnd();
}

function snapshot(database, table) {
  const query = table === 'estudos'
    ? "SELECT COUNT(*)::text || ':' || md5(COALESCE(string_agg(to_jsonb(e)::text, E'\\n' ORDER BY e.id), '')) FROM estudos AS e"
    : "SELECT COUNT(*)::text || ':' || md5(COALESCE(string_agg(to_jsonb(s)::text, E'\\n' ORDER BY s.id), '')) FROM sessoes_estudo AS s";

  return compose([
    'exec', '-T', 'db', 'sh', '-c',
    'psql -X -A -t -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$1" -c "$2"',
    'sh', database, query
  ]).trim();
}

function tryCompose(argumentsList) {
  try {
    compose(argumentsList);
  } catch {
    // Limpeza best-effort; o erro da verificação principal deve ser preservado.
  }
}

try {
  const sourceStudies = snapshot('backend_camadas', 'estudos');
  const sourceSessions = snapshot('backend_camadas', 'sessoes_estudo');

  compose([
    'exec', '-T', 'db', 'sh', '-c',
    'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc -f "$1"',
    'sh', containerDumpPath
  ]);
  compose(['cp', `db:${containerDumpPath}`, localDumpPath]);

  const stats = fs.statSync(localDumpPath);
  if (stats.size === 0) {
    throw new Error('O arquivo de backup ficou vazio.');
  }

  const listing = compose(['exec', '-T', 'db', 'pg_restore', '--list', containerDumpPath]);
  for (const entry of [
    /TABLE\s+public\s+estudos/,
    /TABLE DATA\s+public\s+estudos/,
    /TABLE\s+public\s+sessoes_estudo/,
    /TABLE DATA\s+public\s+sessoes_estudo/
  ]) {
    if (!entry.test(listing)) {
      throw new Error('O índice do backup não contém todas as tabelas e dados esperados.');
    }
  }

  compose([
    'exec', '-T', 'db', 'sh', '-c',
    'createdb -U "$POSTGRES_USER" --maintenance-db=postgres -T template0 "$1"',
    'sh', restoreDatabase
  ]);
  restoreDatabaseCreated = true;

  compose(['cp', localDumpPath, `db:${containerDumpPath}`]);
  compose([
    'exec', '-T', 'db', 'sh', '-c',
    'pg_restore -U "$POSTGRES_USER" -d "$1" --no-owner --exit-on-error "$2"',
    'sh', restoreDatabase, containerDumpPath
  ]);

  const restoredStudies = snapshot(restoreDatabase, 'estudos');
  const restoredSessions = snapshot(restoreDatabase, 'sessoes_estudo');
  const sourceStudiesAfterRestore = snapshot('backend_camadas', 'estudos');
  const sourceSessionsAfterRestore = snapshot('backend_camadas', 'sessoes_estudo');

  if (restoredStudies !== sourceStudies || restoredSessions !== sourceSessions) {
    throw new Error('Os dados restaurados não correspondem aos da origem.');
  }
  if (sourceStudiesAfterRestore !== sourceStudies || sourceSessionsAfterRestore !== sourceSessions) {
    throw new Error('A base de origem mudou durante a verificação.');
  }

  const studyCount = Number(sourceStudies.split(':', 1)[0]);
  const sessionCount = Number(sourceSessions.split(':', 1)[0]);
  console.log(`Backup PostgreSQL verificado: estudos=${studyCount}, sessoes=${sessionCount}; origem preservada.`);
} finally {
  if (restoreDatabaseCreated) {
    tryCompose([
      'exec', '-T', 'db', 'sh', '-c',
      'dropdb -U "$POSTGRES_USER" --maintenance-db=postgres --if-exists "$1"',
      'sh', restoreDatabase
    ]);
  }

  tryCompose(['exec', '-T', 'db', 'rm', '-f', containerDumpPath]);

  try {
    fs.unlinkSync(localDumpPath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  fs.rmdirSync(temporaryDirectory);
}

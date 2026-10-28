'use strict';

// Exportação e importação explícitas do estado da conta; não usa armazenamento local persistente.
const PROGRESS_EXPORT_FORMAT = 'tech-learning-hub-progress';
const PROGRESS_EXPORT_SCHEMA = 1;
const PROGRESS_IMPORT_LIMIT = 20 * 1024 * 1024;
const progressTransferStatus = $('#progress-transfer-status');
const progressImportFile = $('#progress-import-file');

function setProgressTransferStatus(message) {
  progressTransferStatus.textContent = message;
}

function progressSummary(candidate) {
  return {
    lessons: Object.keys(candidate.completed || {}).length,
    notes: Object.keys(candidate.notes || {}).length,
    quizzes: Object.keys(candidate.quizAttempts || {}).length,
    projects: Object.values(candidate.projects || {}).filter(project => project?.source || project?.delivered).length,
    positions: Object.keys(candidate.readingPositions || {}).length
  };
}

function progressCount(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function exportProgress() {
  if (dialogContext?.type === 'lesson') saveReadingPosition();
  if (!cloudCanTransfer()) {
    setProgressTransferStatus('Aguarde a confirmação do salvamento na nuvem antes de exportar.');
    return;
  }
  const backup = {
    format: PROGRESS_EXPORT_FORMAT,
    schemaVersion: PROGRESS_EXPORT_SCHEMA,
    exportedAt: new Date().toISOString(),
    state: sanitizeState(state)
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tech-learning-hub-progresso-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  const summary = progressSummary(backup.state);
  setProgressTransferStatus(`Exportado: ${progressCount(summary.lessons, 'aula concluída', 'aulas concluídas')}, ${progressCount(summary.notes, 'anotação', 'anotações')}, ${progressCount(summary.quizzes, 'quiz', 'quizzes')} e ${progressCount(summary.projects, 'projeto', 'projetos')}.`);
}

function readProgressExport(candidate) {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) throw new Error('O arquivo precisa conter um objeto JSON.');
  if (candidate.format !== PROGRESS_EXPORT_FORMAT) throw new Error('Este arquivo não foi exportado pelo Tech Learning Hub.');
  if (candidate.schemaVersion !== PROGRESS_EXPORT_SCHEMA) throw new Error(`Versão de arquivo não compatível. Versão aceita: ${PROGRESS_EXPORT_SCHEMA}.`);
  if (!candidate.state || typeof candidate.state !== 'object' || Array.isArray(candidate.state) || candidate.state.version !== 1 || !candidate.state.completed || typeof candidate.state.completed !== 'object' || Array.isArray(candidate.state.completed)) {
    throw new Error('O arquivo não contém um estado de progresso compatível.');
  }
  const previousNotice = startupNotice;
  let sanitized;
  let migrationNotice = '';
  try {
    sanitized = sanitizeState(candidate.state);
    migrationNotice = startupNotice;
  } finally {
    startupNotice = previousNotice;
  }
  return { state: sanitized, migrationNotice };
}

async function importProgressFile(file) {
  if (!file) return;
  if (dialogContext?.type === 'lesson') saveReadingPosition();
  if (!cloudCanTransfer()) {
    setProgressTransferStatus('A importação está bloqueada enquanto há alterações pendentes ou falha de sincronização. Aguarde o salvamento confirmado e tente novamente.');
    return;
  }
  if (file.size > PROGRESS_IMPORT_LIMIT) {
    setProgressTransferStatus('Arquivo maior que 20 MB. Nenhum dado foi alterado.');
    return;
  }

  let imported;
  try {
    imported = readProgressExport(JSON.parse(await file.text()));
  } catch (error) {
    setProgressTransferStatus(`Não foi possível importar: ${error.message} Nenhum dado foi alterado.`);
    return;
  }
  if (!cloudCanTransfer()) {
    setProgressTransferStatus('O estado mudou enquanto o arquivo era lido. Nenhum dado foi substituído; aguarde o salvamento e tente novamente.');
    return;
  }

  const summary = progressSummary(imported.state);
  const message = [
    `Arquivo válido do Tech Learning Hub (versão ${PROGRESS_EXPORT_SCHEMA}).`,
    `Conteúdo: ${progressCount(summary.lessons, 'aula concluída', 'aulas concluídas')}, ${progressCount(summary.notes, 'anotação', 'anotações')}, ${progressCount(summary.quizzes, 'quiz', 'quizzes')}, ${progressCount(summary.projects, 'projeto', 'projetos')} e ${progressCount(summary.positions, 'posição de leitura', 'posições de leitura')}.`,
    '',
    'Importar substituirá todo o progresso atual desta conta na nuvem. Exporte o estado atual antes se quiser poder recuperá-lo. Continuar?'
  ].join('\n');
  const revisionBeforeConfirmation = cloudRevision;
  if (!window.confirm(message)) {
    setProgressTransferStatus('Importação cancelada. O progresso atual foi mantido.');
    return;
  }
  if (!cloudCanTransfer() || revisionBeforeConfirmation !== cloudRevision) {
    setProgressTransferStatus('O estado mudou durante a confirmação. Nenhum dado foi substituído; aguarde o salvamento e tente novamente.');
    return;
  }

  state = imported.state;
  startupNotice = imported.migrationNotice;
  render();
  saveState();
  setProgressTransferStatus('Importação aplicada à sessão. Aguarde o status da nuvem confirmar o salvamento nesta conta.');
  if (startupNotice) notify(startupNotice);
}

$('#progress-export').addEventListener('click', exportProgress);
$('#progress-import-trigger').addEventListener('click', () => {
  if (!cloudCanTransfer()) {
    setProgressTransferStatus('Aguarde o salvamento confirmado na nuvem antes de importar.');
    return;
  }
  progressImportFile.click();
});
progressImportFile.addEventListener('change', async event => {
  const [file] = event.target.files || [];
  event.target.value = '';
  await importProgressFile(file);
});

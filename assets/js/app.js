'use strict';

// Eventos da interface e inicialização da aplicação.
function closeDialog() { if (dialog.open) dialog.close(); }

$('#close-dialog').addEventListener('click', closeDialog);
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  dialogContext = null;
  const original = dialogReturnFocus;
  const restored = original?.isConnected ? original : original?.dataset.focus ? document.querySelector(`[data-focus="${original.dataset.focus}"]`) : null;
  (restored || $('#resume')).focus({ preventScroll: true });
});
// O Escape e o bloqueio de foco são nativos do elemento dialog.
let pointerStartedOutside = false;
function outsideDialog(event) {
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
}
dialog.addEventListener('pointerdown', (event) => { pointerStartedOutside = event.target === dialog && outsideDialog(event); });
dialog.addEventListener('click', (event) => {
  if (pointerStartedOutside && event.target === dialog && outsideDialog(event)) closeDialog();
  pointerStartedOutside = false;
});


document.addEventListener('input', event => {
  if (event.target.id !== 'project-source' || dialogContext?.type !== 'project') return;
  const entry=projectEntry(dialogContext.id);
  entry.source=event.target.value.slice(0,80000); entry.delivered=false; entry.manual={};
  clearTimeout(notesSaveTimer); notesSaveTimer=setTimeout(()=>{saveState();renderModules();},350);
  projectFooter();
  $('#project-status').textContent='Código alterado. Refaça a validação antes da entrega.';
});
document.addEventListener('change', event => {
  if (!event.target.matches('[data-project-manual]') || dialogContext?.type !== 'project') return;
  const entry=projectEntry(dialogContext.id);
  entry.manual[event.target.dataset.projectManual]=event.target.checked; entry.delivered=false;
  saveState(); projectFooter(); renderModules();
});
document.addEventListener('click', event => {
  const button=event.target.closest('button'); if (!button) return;
  if(button.dataset.project) openProject(button.dataset.project);
  else if(button.dataset.projectSection) renderProjectSection(button.dataset.projectSection,true);
  else if(button.dataset.previewWidth && $('#project-preview')) $('#project-preview').style.width=button.dataset.previewWidth==='100%'?'100%':button.dataset.previewWidth+'px';
  else if(button.dataset.action==='project-submit') submitProject();
  else if(button.dataset.action==='js-project-test' && dialogContext?.type==='project') { runJsProjectChecks(); }
  else if(button.dataset.action==='project-check' && dialogContext?.type==='project') {
    const project=projectById(dialogContext.id), entry=projectEntry(project.id);
    saveState(); const results=structuralChecks(entry.source);
    const total=project.checks.filter(check=>check.mode==='auto');
    $('#project-live-preview').innerHTML=previewMarkup(entry.source,'Prévia da sua entrega');
    $('#project-status').textContent=total.filter(check=>results[check.id]).length+' de '+total.length+' critérios estruturais encontrados. Abra Validação para ver os detalhes e os testes manuais.';
  }
});

document.addEventListener('change', (event) => {
  if(event.target.matches('[data-readiness]')){const id=event.target.dataset.readiness;state.readiness[id]=event.target.checked;saveState();renderReadiness();document.querySelector('[data-readiness="'+id+'"]').focus({preventScroll:true});}
  if (event.target.matches('[data-complete]')) setCompleted(event.target.dataset.complete, event.target.checked);
  if (event.target.matches('[data-quiz-question]') && dialogContext?.type === 'lesson') {
    const id = dialogContext.id;
    const question = Number(event.target.dataset.quizQuestion);
    const attempt = state.quizAttempts[id] || { answers: [], checked: false };
    attempt.answers[question] = Number(event.target.value);
    attempt.checked = false;
    state.quizAttempts[id] = attempt;
    document.querySelectorAll('[data-quiz-feedback]').forEach(element => { element.hidden = true; });
    $('#quiz-result').textContent = '';
    saveState();
  }
});

document.addEventListener('input', (event) => {
  if (!event.target.matches('[data-note]')) return;
  state.notes[event.target.dataset.note] = event.target.value.slice(0, 10000);
  clearTimeout(notesSaveTimer);
  notesSaveTimer = setTimeout(saveState, 350);
});

document.addEventListener('submit', (event) => {
  if (event.target.id !== 'lesson-quiz') return;
  event.preventDefault();
  gradeQuiz();
});

window.addEventListener('pagehide', () => {
  clearTimeout(notesSaveTimer);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* A indisponibilidade é informada durante o uso. */ }
});

$('#lesson-sections').addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  if (dialogContext?.type === 'project') {
    event.preventDefault();
    const current=PROJECT_SECTIONS.findIndex(([key])=>key===activeProjectSection);
    const index=event.key==='Home'?0:event.key==='End'?PROJECT_SECTIONS.length-1:(current+(event.key==='ArrowLeft'?-1:1)+PROJECT_SECTIONS.length)%PROJECT_SECTIONS.length;
    renderProjectSection(PROJECT_SECTIONS[index][0],true); return;
  }
  event.preventDefault();
  const current = READER_SECTIONS.findIndex(([key]) => key === activeLessonSection);
  const index = event.key === 'Home' ? 0 : event.key === 'End' ? READER_SECTIONS.length - 1 : (current + (event.key === 'ArrowLeft' ? -1 : 1) + READER_SECTIONS.length) % READER_SECTIONS.length;
  renderLessonSection(READER_SECTIONS[index][0], true);
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.lessonSection) {
    renderLessonSection(button.dataset.lessonSection, true);
  } else if (button.dataset.track) {
    selectTrack(button.dataset.track, button.dataset.focus);
    $('#journey').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  } else if (button.dataset.lesson) openLesson(button.dataset.lesson);
  else if (button.dataset.module) openModule(button.dataset.module);
  else if (button.dataset.filter) {
    filter = button.dataset.filter;
    renderModules();
  } else {
    switch (button.dataset.action) {
      case 'section-next': {
        const index = READER_SECTIONS.findIndex(([key]) => key === activeLessonSection);
        if (index < 3) renderLessonSection(READER_SECTIONS[index + 1][0], true);
        break;
      }
      case 'resume': openLesson(nextLesson().id); break;
      case 'library': openLibrary(); break;
      case 'how': openHow(); break;
      case 'close': closeDialog(); break;
      case 'clear':
        filter = 'all'; query = ''; $('#search').value = ''; renderModules(); $('#search').focus();
        break;
      case 'next': {
        if (dialogContext?.type !== 'lesson') break;
        const { track, lesson } = lessonIndex.get(dialogContext.id);
        const lessons = lessonsOf(track);
        const next = lessons[lessons.findIndex((item) => item.id === lesson.id) + 1];
        if (next) openLesson(next.id);
        else closeDialog();
        break;
      }
    }
  }
});

$('#search').addEventListener('input', (event) => {
  query = event.target.value.trim();
  renderModules();
});

$('#track-tabs').addEventListener('keydown', (event) => {
  const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
  if (!keys.includes(event.key)) return;
  event.preventDefault();
  const current = tracks.findIndex((track) => track.id === state.activeTrack);
  const offset = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
  const index = event.key === 'Home' ? 0 : event.key === 'End' ? tracks.length - 1 : (current + offset + tracks.length) % tracks.length;
  selectTrack(tracks[index].id, `tab-${tracks[index].id}`);
});
desktop.addEventListener('change', () => $('#track-tabs').setAttribute('aria-orientation', desktop.matches ? 'vertical' : 'horizontal'));

// Uma alteração feita em outra aba do mesmo navegador atualiza esta interface.
window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  const activeTrack = state.activeTrack;
  state = loadState();
  state.activeTrack = activeTrack;
  render();
  document.querySelectorAll('#study-dialog [data-complete]').forEach((input) => { input.checked = !!state.completed[input.dataset.complete]; });
  if (dialogContext?.type === 'lesson') $('#modal-completion-label').textContent = state.completed[dialogContext.id] ? 'Lição concluída' : 'Marcar como concluída';
  if (dialogContext?.type === 'module') {
    const { module } = moduleIndex.get(dialogContext.id);
    $('#module-dialog-progress').textContent = `${stats(module.lessons).done} de ${module.lessons.length} lições concluídas`;
  }
});

render();
if (!storageAvailable) notify('Armazenamento indisponível. O progresso será mantido apenas nesta sessão.');
else if (startupNotice) notify(startupNotice);

'use strict';

// Índices do currículo, persistência e estado da aplicação.
// Índices do currículo: os IDs, e não a posição de uma lição, identificam o progresso.
const lessonIndex = new Map();
const moduleIndex = new Map();
for (const track of tracks) {
  for (const module of track.modules) {
    moduleIndex.set(module.id, { track, module });
    for (const lesson of module.lessons) lessonIndex.set(lesson.id, { track, module, lesson });
  }
}

const STORAGE_KEY = 'tech-learning-hub:v1';
// completed permanece como marcação de acompanhamento; evidências posteriores ficam separadas.
const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const icon = (name, classes = 'h-4 w-4') => `<svg class="${classes} shrink-0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const duration = (minutes) => minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}min` : ''}`;
const lessonsOf = (track) => track.modules.flatMap((module) => module.lessons);
let storageAvailable = true;
let startupNotice = '';

const READINESS_EVIDENCE = [
  { id: 'history', title: 'Histórico compreensível', detail: 'Repositório com commits pequenos, README reproduzível e uma mudança feita em branch.', track: 'git-workflow' },
  { id: 'review', title: 'Colaboração verificável', detail: 'Issue com critérios de aceite, proposta de alteração e revisão incorporada.', track: 'git-workflow' },
  { id: 'tests', title: 'Teste e correção de falha', detail: 'Teste que falha para um defeito, correção correspondente e teste de regressão aprovado.', track: 'quality' },
  { id: 'maintenance', title: 'Manutenção segura', detail: 'Refatoração pequena com comportamento preservado, dependências documentadas e verificação de acessibilidade.', track: 'quality' },
  { id: 'data', title: 'Dados consultáveis', detail: 'Modelo simples e consultas SQL que respondem a requisitos, com entradas e resultados explicados.', track: 'database' },
  { id: 'service', title: 'Integração com serviço', detail: 'Interface que trata carregamento, sucesso, vazio e falha, com dados validados.', track: 'delivery' },
  { id: 'delivery', title: 'Entrega e novo requisito', detail: 'Aplicação publicada, instruções de execução e mudança de requisito demonstrada com critérios de aceite.', track: 'delivery' }
];
function renderReadiness() {
  const count = READINESS_EVIDENCE.filter(item => state.readiness[item.id]).length;
  $('#readiness-count').textContent = `${count} de ${READINESS_EVIDENCE.length} evidências registradas`;
  $('#readiness-items').innerHTML = READINESS_EVIDENCE.map(item => `<li class="rounded-xl border border-white/10 bg-[#101522] p-4"><label class="flex cursor-pointer items-start gap-3"><input type="checkbox" data-readiness="${item.id}" ${state.readiness[item.id] ? 'checked' : ''} class="mt-1 h-4 w-4 shrink-0 accent-emerald-400"><span><strong class="block text-sm text-slate-100">${item.title}</strong><span class="mt-1 block text-xs leading-6 text-slate-400">${item.detail}</span></span></label><button data-track="${item.track}" data-focus="card-${item.track}" class="mt-3 pl-7 text-xs font-semibold text-violet-300 hover:text-violet-100">Abrir trilha relacionada →</button></li>`).join('');
}

function validEvidenceDate(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value ? value : null;
}

function sanitizeState(candidate) {
  const clean = { version: 1, completed: {}, learningEvidence: {}, activeTrack: 'preparacao', lastLesson: null, notes: {}, quizAttempts: {}, projects: {}, htmlCssRevision: 2, javascriptRevision: 3, pythonRevision: 2, databaseRevision: 3, aiRevision: 2, readiness: {} };
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return clean;
  if (candidate.completed && typeof candidate.completed === 'object') {
    for (const id of lessonIndex.keys()) {
      if (candidate.completed[id] === true) clean.completed[id] = true;
    }
  }
  for (const id of lessonIndex.keys()) {
    const entry = candidate.learningEvidence?.[id];
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) continue;
    const practicedAt = validEvidenceDate(entry.practicedAt);
    const reviewDate = validEvidenceDate(entry.reviewedAt);
    const reviewedAt = practicedAt && reviewDate && Date.parse(reviewDate) - Date.parse(practicedAt) >= 3 * 24 * 60 * 60 * 1000 ? reviewDate : null;
    const explanation = typeof entry.explanation === 'string' ? entry.explanation.slice(0, 2000).trim() : '';
    const solvedAt = explanation ? validEvidenceDate(entry.solvedAt) : null;
    if (practicedAt || reviewedAt || solvedAt) {
      clean.learningEvidence[id] = { practicedAt, reviewedAt, solvedAt, explanation: solvedAt ? explanation : '' };
    }
  }
  for(const item of READINESS_EVIDENCE)clean.readiness[item.id]=candidate.readiness?.[item.id]===true;
  if (tracks.some((track) => track.id === candidate.activeTrack)) clean.activeTrack = candidate.activeTrack;
  if (lessonIndex.has(candidate.lastLesson)) clean.lastLesson = candidate.lastLesson;
  for (const { lesson } of lessonIndex.values()) {
    if (!lesson.guide) continue;
    lesson.guide.exercises.forEach((_, i) => {
      const key = `${lesson.id}:${i}`;
      if (typeof candidate.notes?.[key] === 'string') clean.notes[key] = candidate.notes[key].slice(0, 10000);
    });
    const attempt = candidate.quizAttempts?.[lesson.id];
    if (attempt && Array.isArray(attempt.answers)) {
      const answers = lesson.guide.quiz.map((question, i) => Number.isInteger(attempt.answers[i]) && attempt.answers[i] >= 0 && attempt.answers[i] < question.options.length ? attempt.answers[i] : null);
      clean.quizAttempts[lesson.id] = { answers, checked: attempt.checked === true && answers.every(Number.isInteger) };
    }
  }
  for (const project of PROJECTS) {
    const entry = candidate.projects?.[project.id];
    if (!entry || typeof entry !== 'object') continue;
    const source = typeof entry.source === 'string' ? entry.source.slice(0,80000) : '';
    const manual = {};
    for (const check of project.checks.filter(item=>item.mode==='manual')) manual[check.id] = entry.manual?.[check.id] === true;
    clean.projects[project.id] = {source,manual,delivered:entry.delivered === true && !!source.trim() && Object.values(manual).every(Boolean)};
  }
  if (candidate.htmlCssRevision !== 2) {
    for (const lesson of tracks.find(track=>track.id==='html').modules.flatMap(module=>module.lessons)) delete clean.quizAttempts[lesson.id];
    if (Object.keys(candidate.quizAttempts || {}).length) startupNotice='HTML e CSS foram revisados. As respostas dessa trilha foram reiniciadas; conclusões e rascunhos foram preservados.';
  }
  if(candidate.javascriptRevision!==3){
    for(const lesson of tracks.find(t=>t.id==="javascript").modules.flatMap(m=>m.lessons))delete clean.quizAttempts[lesson.id];
    if (Object.keys(candidate.quizAttempts || {}).some(id => lessonIndex.get(id)?.track.id === 'javascript')) startupNotice='JavaScript foi revisado. As respostas dessa trilha foram reiniciadas; conclusões e rascunhos foram preservados.';
  }
  if(candidate.pythonRevision!==2){for(const lesson of tracks.find(track=>track.id==='python').modules.flatMap(module=>module.lessons))delete clean.quizAttempts[lesson.id];}
  if(candidate.databaseRevision!==3){
    for(const lesson of tracks.find(t=>t.id==='database').modules.flatMap(m=>m.lessons))delete clean.quizAttempts[lesson.id];
    if (Object.keys(candidate.quizAttempts || {}).some(id => lessonIndex.get(id)?.track.id === 'database')) startupNotice='Banco de Dados foi revisado. As respostas dessa trilha foram reiniciadas; conclusões e rascunhos foram preservados.';
  }
  if(candidate.aiRevision!==2){for(const lesson of tracks.find(t=>t.id==='ai').modules.flatMap(m=>m.lessons))delete clean.quizAttempts[lesson.id];}
  return clean;
}

function loadState() {
  let raw;
  try { raw = localStorage.getItem(STORAGE_KEY); }
  catch { storageAvailable = false; return sanitizeState(null); }
  if (!raw) return sanitizeState(null);
  try { return sanitizeState(JSON.parse(raw)); }
  catch {
    startupNotice = 'O progresso salvo estava ilegível. Uma nova jornada foi iniciada.';
    return sanitizeState(null);
  }
}

let state = loadState();
let filter = 'all';
let query = '';
let dialogContext = null;
let dialogReturnFocus = null;
let toastTimer;
const dialog = $('#study-dialog');
const desktop = window.matchMedia('(min-width: 1024px)');

function notify(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.remove('hidden');
  toastTimer = setTimeout(() => $('#toast').classList.add('hidden'), 4200);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
    notify('O navegador bloqueou o salvamento. Seu progresso vale apenas nesta sessão.');
  }
  $('#storage-status').textContent = storageAvailable ? 'Progresso salvo neste navegador' : 'Progresso apenas nesta sessão';
}

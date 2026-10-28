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

const REVIEW_DELAY_MS = 3 * 24 * 60 * 60 * 1000;
const reviewDueAt = (practicedAt) => Date.parse(practicedAt) + REVIEW_DELAY_MS;
// completed permanece como marcação de acompanhamento; evidências posteriores ficam separadas.
const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const icon = (name, classes = 'h-4 w-4') => `<svg class="${classes} shrink-0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const duration = (minutes) => minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}min` : ''}`;
const lessonsOf = (track) => track.modules.flatMap((module) => module.lessons);
let startupNotice = '';

const READINESS_EVIDENCE = [
  { id: 'history', title: 'Histórico compreensível', detail: 'Repositório com commits pequenos, README reproduzível e uma mudança feita em branch.', track: 'git-workflow', projectId: 'project-git-capstone', projectNote: 'Confira o histórico e o README no repositório; o dashboard não inspeciona Git.' },
  { id: 'review', title: 'Colaboração verificável', detail: 'Issue com critérios de aceite, proposta de alteração e revisão incorporada.', track: 'git-workflow', projectId: 'project-git-capstone', projectNote: 'A revisão pode ser real ou simulada e precisa estar identificada no artefato; o dashboard não verifica uma pessoa revisora.' },
  { id: 'tests', title: 'Teste e correção de falha', detail: 'Teste que falha para um defeito, correção correspondente e teste de regressão aprovado.', track: 'quality', projectId: 'project-quality-capstone', projectNote: 'O projeto pede evidência de vermelho → verde; o dashboard não executa seu repositório.' },
  { id: 'maintenance', title: 'Manutenção segura', detail: 'Refatoração pequena com comportamento preservado, dependências documentadas e verificação de acessibilidade.', track: 'quality', projectId: 'project-quality-capstone', projectNote: 'Confira a refatoração, as dependências e o roteiro de interface nos artefatos do projeto.' },
  { id: 'data', title: 'Dados consultáveis', detail: 'Modelo simples e consultas SQL que respondem a requisitos, com entradas e resultados explicados.', track: 'database', projectId: 'project-basic-capstone', projectNote: 'A prova básica pede relatório Python sobre JSON e consultas SQLite; registre comandos e saídas observadas.' },
  { id: 'service', title: 'Integração com serviço', detail: 'Interface que trata carregamento, sucesso, vazio e falha, com dados validados.', track: 'delivery', projectId: 'project-delivery-capstone', projectNote: 'O projeto usa API local simulada em memória; não prova autenticação ou persistência de produção.' },
  { id: 'delivery', title: 'Entrega e novo requisito', detail: 'Aplicação publicada, instruções de execução e mudança de requisito demonstrada com critérios de aceite.', track: 'delivery', projectId: 'project-delivery-capstone', projectNote: 'O projeto relacionado prepara um plano de publicação, não faz deploy; confira URL, HTTPS e mudança fora do dashboard.' }
];
function readinessProjectMarkup(item) {
  const project = PROJECTS.find(candidate => candidate.id === item.projectId);
  if (!project) return '';
  const entry = state.projects[project.id];
  const status = entry?.delivered
    ? entry.explanation?.trim()
      ? 'Entrega registrada no curso como autoavaliação.'
      : 'Entrega anterior registrada; explicação ainda pendente.'
    : 'Nenhuma entrega registrada no curso.';
  return `<div class="mt-3 rounded-xl border border-white/8 bg-white/[.025] p-3"><p class="text-xs font-semibold text-slate-300">Projeto relacionado: ${escapeHTML(project.title)}</p><p role="status" aria-live="polite" class="mt-1 text-xs leading-5 text-sky-200">${status}</p><p class="mt-1 text-xs leading-5 text-slate-400">${escapeHTML(item.projectNote)}</p><button type="button" aria-label="Abrir projeto: ${escapeHTML(project.title)}" data-project="${escapeHTML(project.id)}" data-focus="project-${escapeHTML(project.id)}" class="mt-2 rounded-lg border border-amber-300/25 px-3 py-2 text-xs font-semibold text-amber-100 hover:bg-amber-300/10">Abrir projeto relacionado</button></div>`;
}
function renderReadiness() {
  const count = READINESS_EVIDENCE.filter(item => state.readiness[item.id]).length;
  $('#readiness-count').textContent = `${count} de ${READINESS_EVIDENCE.length} evidências registradas`;
  $('#readiness-items').innerHTML = READINESS_EVIDENCE.map(item => `<li class="rounded-xl border border-white/10 bg-[#101522] p-4"><label class="flex cursor-pointer items-start gap-3"><input type="checkbox" data-readiness="${item.id}" ${state.readiness[item.id] ? 'checked' : ''} class="mt-1 h-4 w-4 shrink-0 accent-emerald-400"><span><strong class="block text-sm text-slate-100">${item.title}</strong><span class="mt-1 block text-xs leading-6 text-slate-400">${item.detail}</span></span></label>${readinessProjectMarkup(item)}<button type="button" data-track="${item.track}" data-focus="card-${item.track}" class="mt-3 pl-7 text-xs font-semibold text-violet-300 hover:text-violet-100">Abrir trilha relacionada →</button></li>`).join('');
}

function validEvidenceDate(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value ? value : null;
}

function sanitizeState(candidate) {
  const clean = { version: 1, completed: {}, learningEvidence: {}, activeTrack: 'preparacao', lastLesson: null, notes: {}, quizAttempts: {}, projects: {}, htmlCssRevision: 2, javascriptRevision: 3, pythonRevision: 2, databaseRevision: 3, aiRevision: 2, deliveryRevision: 1, readiness: {} };
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
    const reviewedAt = practicedAt && reviewDate && Date.parse(reviewDate) >= reviewDueAt(practicedAt) ? reviewDate : null;
    const explanation = typeof entry.explanation === 'string' ? entry.explanation.slice(0, 2000).trim() : '';
    const solvedAt = explanation ? validEvidenceDate(entry.solvedAt) : null;
    if (practicedAt || reviewedAt || solvedAt) {
      clean.learningEvidence[id] = { practicedAt, reviewedAt, solvedAt, explanation: solvedAt ? explanation : '' };
    }
  }
  for(const item of READINESS_EVIDENCE)clean.readiness[item.id]=candidate.readiness?.[item.id]===true;
  if (tracks.some((track) => track.id === candidate.activeTrack)) clean.activeTrack = candidate.activeTrack;
  if (lessonIndex.has(candidate.lastLesson)) clean.lastLesson = candidate.lastLesson;
  for (const { track, module, lesson } of lessonIndex.values()) {
    if (!lesson.guide) continue;
    if (lesson.guide.retry) {
      const key = `${lesson.id}:retry`;
      if (typeof candidate.notes?.[key] === 'string') clean.notes[key] = candidate.notes[key].slice(0, 2000);
    }
    const requirementChangeKey = `${lesson.id}:requirement-change`;
    if (typeof candidate.notes?.[requirementChangeKey] === 'string') {
      clean.notes[requirementChangeKey] = candidate.notes[requirementChangeKey].slice(0, 2000);
    }
    if (track.modules.indexOf(module) > 0 && module.lessons[0].id === lesson.id) {
      const key = `${lesson.id}:cumulative`;
      if (typeof candidate.notes?.[key] === 'string') clean.notes[key] = candidate.notes[key].slice(0, 2000);
    }
    lesson.guide.exercises.forEach((_, i) => {
      const key = `${lesson.id}:${i}`;
      if (typeof candidate.notes?.[key] === 'string') clean.notes[key] = candidate.notes[key].slice(0, 10000);
    });
    const attempt = candidate.quizAttempts?.[lesson.id];
    if (attempt && Array.isArray(attempt.answers)) {
      const answers = lesson.guide.quiz.map((question, i) => Number.isInteger(attempt.answers[i]) && attempt.answers[i] >= 0 && attempt.answers[i] < question.options.length ? attempt.answers[i] : null);
      const checked = attempt.checked === true && answers.every(Number.isInteger);
      clean.quizAttempts[lesson.id] = { answers, checked, checkedAt: checked ? validEvidenceDate(attempt.checkedAt) : null, reviewStartedAt: validEvidenceDate(attempt.reviewStartedAt) };
    }
  }
  const deliveryExerciseMigrations = [
    ['delivery-ci:4', 'delivery-observability:1'],
    ['delivery-ci:5', 'delivery-observability:2'],
    ['delivery-ci:6', 'delivery-recovery:1'],
    ['delivery-ci:7', 'delivery-recovery:3'],
    ['delivery-ci:8', 'delivery-observability:3']
  ];
  for (const [oldKey, newKey] of deliveryExerciseMigrations) {
    if (typeof candidate.notes?.[oldKey] === 'string' && typeof clean.notes[newKey] !== 'string') {
      clean.notes[newKey] = candidate.notes[oldKey].slice(0, 10000);
    }
  }
  if (candidate.completed?.['delivery-ci'] === true) {
    // A antiga aula cobria os três blocos; preserve a marca de acompanhamento nas divisões.
    clean.completed['delivery-observability'] = true;
    clean.completed['delivery-recovery'] = true;
  }
  for (const project of PROJECTS) {
    const entry = candidate.projects?.[project.id];
    if (!entry || typeof entry !== 'object') continue;
    const source = typeof entry.source === 'string' ? entry.source.slice(0,80000) : '';
    const manual = {};
    for (const check of project.checks.filter(item=>item.mode==='manual')) manual[check.id] = entry.manual?.[check.id] === true;
    const explanation = typeof entry.explanation === 'string' ? entry.explanation.slice(0, 4000) : '';
    // Entregas anteriores continuam registradas; uma nova entrega exige explicação.
    clean.projects[project.id] = {source,manual,explanation,delivered:entry.delivered === true && !!source.trim() && Object.values(manual).every(Boolean)};
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
  if (candidate.deliveryRevision !== 1) {
    delete clean.quizAttempts['delivery-ci'];
    if (candidate.quizAttempts?.['delivery-ci']) {
      const deliveryNotice = 'A aula de testes, CI e falhas de entrega foi dividida. O quiz original foi reiniciado; conclusões e rascunhos de exercícios foram preservados.';
      startupNotice = startupNotice ? `${startupNotice} ${deliveryNotice}` : deliveryNotice;
    }
  }
  return clean;
}

let state = sanitizeState(null);
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
  window.dispatchEvent(new Event('tech-hub:state-change'));
}

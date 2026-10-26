'use strict';

// Renderização da navegação, progresso, módulos e listagem de aulas.
function stats(lessons) {
  const done = lessons.filter((lesson) => state.completed[lesson.id]).length;
  return { done, total: lessons.length, percent: lessons.length ? Math.round(done / lessons.length * 100) : 0 };
}

function bar(percent, color, label) {
  return `<div role="progressbar" aria-label="${escapeHTML(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" class="h-1.5 overflow-hidden rounded-full bg-white/7"><div class="progress-fill h-full rounded-full" style="width:${percent}%;background:${color}"></div></div>`;
}

function nextLesson() {
  const current = tracks.find((track) => track.id === state.activeTrack);
  const last = lessonIndex.get(state.lastLesson);
  if (last && last.track.id === current.id && !state.completed[last.lesson.id]) return last.lesson;
  return lessonsOf(current).find((lesson) => !state.completed[lesson.id]) || lessonsOf(current)[0];
}

function renderNavigation() {
  $('#track-tabs').setAttribute('aria-orientation', desktop.matches ? 'vertical' : 'horizontal');
  $('#track-tabs').innerHTML = tracks.map((track) => {
    const selected = state.activeTrack === track.id;
    return `<button id="tab-${track.id}" class="nav-track flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-left text-xs text-slate-400 transition hover:bg-white/5 hover:text-slate-200 lg:w-full lg:text-[13px]" role="tab" aria-selected="${selected}" aria-controls="lesson-panel" tabindex="${selected ? 0 : -1}" data-track="${track.id}" data-focus="tab-${track.id}">${icon(track.icon, 'h-[18px] w-[18px]')}<span>${track.title}</span><span class="ml-auto hidden h-1.5 w-1.5 rounded-full lg:block ${selected ? 'bg-violet-400' : 'bg-transparent'}"></span></button>`;
  }).join('');
}

function renderProgress() {
  $('#track-count').textContent = `${tracks.length} trilhas · acesso livre`;
  $('#progress-cards').innerHTML = tracks.map((track) => {
    const { done, total, percent } = stats(lessonsOf(track));
    return `<button data-track="${track.id}" data-focus="card-${track.id}" aria-pressed="${state.activeTrack === track.id}" aria-label="Abrir trilha ${track.title}, ${percent}% concluído" style="--accent:${track.color}" class="track-card rounded-2xl border border-white/9 bg-[#141824] p-4 text-left">
      <span class="flex items-center justify-between"><span class="flex h-9 w-9 items-center justify-center rounded-xl" style="color:${track.color};background:${track.color}14">${icon(track.icon, 'h-[19px] w-[19px]')}</span><span class="font-display text-xl font-semibold tracking-tight text-slate-200">${percent}<span class="ml-0.5 text-xs font-normal text-slate-500">%</span></span></span>
      <span class="mb-1 mt-3 block font-display text-sm font-semibold">${track.title}</span><span class="mb-4 block text-[11px] text-slate-500">${done} de ${total} lições concluídas</span>
      ${bar(percent, track.color, `Progresso em ${track.title}`)}
    </button>`;
  }).join('');
  const total = stats([...lessonIndex.values()].map(({ lesson }) => lesson));
  $('#total-caption').textContent = `${total.done} de ${total.total} lições concluídas`;
  const next = nextLesson();
  const activeStats = stats(lessonsOf(tracks.find((track) => track.id === state.activeTrack)));
  $('#resume-label').textContent = activeStats.percent === 100 ? 'Revisar minha trilha' : total.done || state.lastLesson ? 'Continuar aprendendo' : 'Começar minha jornada';
  $('#resume-meta').textContent = `${next.title} · ${duration(next.minutes)}`;
}

function renderEvidenceSummary() {
  const lessons = [...lessonIndex.values()].map(({ lesson }) => lesson);
  const concepts = lessons.filter((lesson) => {
    const attempt = state.quizAttempts[lesson.id];
    return attempt?.checked && lesson.guide.quiz.every((question, i) => attempt.answers[i] === question.correctIndex);
  }).length;
  const practiced = lessons.filter((lesson) => state.learningEvidence[lesson.id]?.practicedAt).length;
  const reviewed = lessons.filter((lesson) => state.learningEvidence[lesson.id]?.reviewedAt).length;
  const solved = lessons.filter((lesson) => state.learningEvidence[lesson.id]?.solvedAt).length;
  $('#evidence-summary').textContent = `Conceitos conferidos no quiz: ${concepts} · Prática autoavaliada: ${practiced} · Revisão conceitual: ${reviewed} · Problema novo explicado (autoavaliação): ${solved}. O quiz não comprova execução prática.`;
}

function renderReviewQueue() {
  const now = Date.now();
  const queue = [...lessonIndex.values()].flatMap(({ track, lesson }) => {
    const evidence = state.learningEvidence[lesson.id];
    if (!evidence?.practicedAt || evidence.reviewedAt) return [];
    return [{ track, lesson, due: reviewDueAt(evidence.practicedAt) }];
  }).filter((item) => Number.isFinite(item.due)).sort((a, b) => a.due - b.due);
  const dueCount = queue.filter((item) => item.due <= now).length;
  $('#review-queue-count').textContent = `${dueCount} ${dueCount === 1 ? 'revisão pendente' : 'revisões pendentes'}`;
  $('#review-queue').innerHTML = queue.length ? queue.slice(0, 5).map(({ track, lesson, due }) => {
    const ready = due <= now;
    const date = new Date(due).toLocaleDateString('pt-BR');
    return `<li class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#101522] p-3"><span class="min-w-0"><strong class="block text-sm text-slate-100">${escapeHTML(lesson.title)}</strong><span class="mt-1 block text-xs text-slate-400">${escapeHTML(track.title)} · ${ready ? 'Disponível desde' : 'Disponível em'} ${date}</span></span><button data-review-lesson="${lesson.id}" class="rounded-lg border border-sky-300/30 px-3 py-2 text-xs font-semibold text-sky-200 hover:bg-sky-300/10">${ready ? 'Revisar aula' : 'Abrir aula'}</button></li>`;
  }).join('') + (queue.length > 5 ? `<li class="text-xs text-slate-400">Mais ${queue.length - 5} aulas na fila. Conclua as primeiras para ver as próximas.</li>` : '') : '<li class="text-sm text-slate-400">Nenhuma revisão agendada. Registre a prática na aba Revisão de uma aula para começar.</li>';
}

function lessonRow(lesson, prefix) {
  const done = !!state.completed[lesson.id];
  return `<div class="lesson-row group flex items-center gap-1 border-t border-white/[.055] transition hover:bg-white/[.025]">
    <label class="flex h-14 w-12 shrink-0 cursor-pointer items-center justify-center" title="${done ? 'Marcar como pendente' : 'Marcar como concluída'}">
      <input type="checkbox" data-complete="${lesson.id}" data-focus="${prefix}-check-${lesson.id}" ${done ? 'checked' : ''} aria-label="Concluir lição: ${escapeHTML(lesson.title)}" class="h-4 w-4 cursor-pointer rounded border-slate-600 accent-violet-400">
    </label>
    <button data-lesson="${lesson.id}" data-focus="${prefix}-lesson-${lesson.id}" class="flex min-w-0 flex-1 items-center gap-3 py-4 pr-4 text-left" aria-label="Estudar: ${escapeHTML(lesson.title)}">
      <span class="lesson-title min-w-0 flex-1 text-[13px] leading-snug text-slate-300 transition group-hover:text-white">${escapeHTML(lesson.title)}${done ? '<span class="sr-only"> — concluída</span>' : ''}</span>
      <span class="hidden shrink-0 text-[10px] text-slate-500 sm:block">${duration(lesson.minutes)}</span>${icon(done ? 'check' : 'chevron', `h-3.5 w-3.5 ${done ? 'text-emerald-400' : 'text-slate-600 group-hover:text-violet-300'}`)}
    </button>
  </div>`;
}

function matches(lesson, track, module) {
  const progressMatches = filter === 'all' || (filter === 'done' ? !!state.completed[lesson.id] : !state.completed[lesson.id]);
  const text = normalize([lesson.title, lesson.concept, track.title, module.title, module.level].join(' '));
  return progressMatches && (!query || normalize(query).split(/\s+/).filter(Boolean).every((word) => text.includes(word)));
}

function renderModules() {
  const track = tracks.find((item) => item.id === state.activeTrack);
  const relevantTracks = query ? tracks : [track];
  const headingTitle = query ? `Resultados para “${query}”` : track.title;
  const description = query ? 'Lições encontradas em todas as trilhas de aprendizado.' : track.description;
  $('#track-heading').innerHTML = `<div class="min-w-0"><p class="mb-1.5 text-[10px] font-bold tracking-[.2em] text-slate-500">${query ? 'EXPLORE O CONHECIMENTO' : 'SUA TRILHA DE APRENDIZADO'}</p><div class="flex flex-wrap items-center gap-3"><h2 class="break-words font-display text-2xl font-bold tracking-tight">${escapeHTML(headingTitle)}</h2>${query ? '' : `<span class="rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-400">${track.range}</span>`}</div><p class="mt-2 text-xs leading-relaxed text-slate-400">${escapeHTML(description)}</p></div>${query ? '' : `<span class="shrink-0 text-[11px] text-slate-400">${track.modules.length} módulos <span class="mx-1 text-slate-600">/</span> ${lessonsOf(track).length} lições <span class="mx-1 text-slate-600">/</span> ~${duration(lessonsOf(track).reduce((sum, lesson) => sum + lesson.minutes, 0))}</span>`}`;
  $('#lesson-panel').setAttribute('aria-labelledby', `tab-${track.id}`);
  if (query) $('#lesson-panel').setAttribute('aria-label', 'Resultados da busca em todas as trilhas');
  else $('#lesson-panel').removeAttribute('aria-label');
  let visibleCount = 0;
  let html = '';
  for (const current of relevantTracks) {
    for (const module of current.modules) {
      const visible = module.lessons.filter((lesson) => matches(lesson, current, module));
      if (!visible.length) continue;
      visibleCount += visible.length;
      const { done, total, percent } = stats(module.lessons);
      html += `<article class="overflow-hidden rounded-2xl border border-white/9 bg-[#141824]">
        <button data-module="${module.id}" data-focus="module-${module.id}" class="flex w-full items-start gap-4 p-5 text-left transition hover:bg-white/[.025]" aria-label="Ver detalhes do módulo: ${escapeHTML(module.title)}">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/7 bg-white/[.025] font-display text-lg font-medium" style="color:${current.color}">${module.number}</span>
          <span class="min-w-0 flex-1"><span class="mb-1.5 flex flex-wrap items-center gap-2"><span class="text-[9px] font-bold uppercase tracking-[.15em]" style="color:${current.color}">${query ? `${current.title} · ` : ''}${module.level}</span><span class="text-[9px] text-slate-600">•</span><span class="text-[10px] text-slate-500">${total} lições</span></span><span class="block font-display text-[17px] font-semibold leading-snug">${module.title}</span><span class="mt-1.5 block text-xs leading-relaxed text-slate-500">${module.description}</span></span>
          ${icon('up', 'mt-1 h-4 w-4 text-slate-500')}
        </button>
        <div class="mx-5 mb-4 flex items-center gap-3"><div class="min-w-0 flex-1">${bar(percent, current.color, `Progresso do módulo ${module.title}`)}</div><span class="text-[10px] text-slate-500">${done}/${total}</span></div>
        <div class="px-1">${visible.map((lesson) => lessonRow(lesson, 'main')).join('')}</div>
        ${projectCard(module)}
        <div class="flex items-center justify-between gap-3 border-t border-white/7 bg-white/[.015] px-5 py-3"><span class="flex items-center gap-1.5 text-[10px] text-slate-500">${icon('book', 'h-3 w-3')}Aula + desafios + revisão</span><button data-module="${module.id}" data-focus="resources-${module.id}" class="inline-flex items-center gap-1.5 text-[11px] font-medium text-violet-300 transition hover:text-white">Explorar módulo ${icon('arrow', 'h-3 w-3')}</button></div>
      </article>`;
    }
  }
  $('#modules').innerHTML = html || `<div class="col-span-full rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center"><div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-400/10 text-violet-300">${icon('search', 'h-6 w-6')}</div><h3 class="font-display text-lg font-semibold">${query ? 'Nenhuma lição encontrada' : filter === 'done' ? 'Sua primeira conquista vem aí' : 'Tudo em dia nesta trilha!'}</h3><p class="mx-auto mt-2 max-w-sm text-sm text-slate-400">${query ? 'Experimente outro termo ou remova os filtros.' : filter === 'done' ? 'As lições que você concluir aparecerão aqui.' : 'Você concluiu todas as lições. Que tal revisitar um conceito?'}</p><button data-action="clear" class="mt-5 rounded-lg bg-violet-400/15 px-4 py-2 text-xs text-violet-200">Mostrar todas as lições</button></div>`;
  document.querySelectorAll('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', button.dataset.filter === filter));
  $('#result-status').textContent = `${visibleCount} ${visibleCount === 1 ? 'lição disponível' : 'lições disponíveis'}.${PROJECTS.some(p=>track.modules.some(m=>m.id===p.module)) && !query ? ' Projetos: '+PROJECTS.filter(p=>track.modules.some(m=>m.id===p.module)&&state.projects[p.id]?.delivered).length+' de '+PROJECTS.filter(p=>track.modules.some(m=>m.id===p.module)).length+' entregas registradas (autoavaliação).' : ''}`;
}

function render() {
  const focusKey = document.activeElement?.dataset.focus;
  renderNavigation();
  renderProgress();
  renderEvidenceSummary();
  renderReviewQueue();
  renderReadiness();
  renderModules();
  if (focusKey) document.querySelector(`[data-focus="${focusKey}"]`)?.focus({ preventScroll: true });
}

function selectTrack(id, focusKey) {
  if (!tracks.some((track) => track.id === id)) return;
  state.activeTrack = id;
  filter = 'all';
  query = '';
  $('#search').value = '';
  saveState();
  render();
  if (focusKey) document.querySelector(`[data-focus="${focusKey}"]`)?.focus({ preventScroll: true });
}

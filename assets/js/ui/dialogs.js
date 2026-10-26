'use strict';

// Leitores, diálogos, recursos e validação dos projetos.
function resourceCards(resources) {
  const unique = [...new Map(resources.map((item) => [item.url, item])).values()];
  const groups = [
    { kind: 'doc', title: 'Documentação e referências', icon: 'code', color: 'text-sky-300' },
    { kind: 'book', title: 'Livros e guias gratuitos', icon: 'book', color: 'text-violet-300' },
    { kind: 'video', title: 'Vídeos em português', icon: 'play', color: 'text-rose-300' }
  ];
  return groups.map((group) => {
    const items = unique.filter((item) => item.kind === group.kind);
    if (!items.length) return '';
    return `<section class="mt-6"><h3 class="mb-3 flex items-center gap-2 text-xs font-semibold ${group.color}">${icon(group.icon)}${group.title}</h3><div class="space-y-2">${items.map((item) => `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[.025] p-3 text-sm text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-400/5"><span class="min-w-0 flex-1"><span class="block text-xs font-medium leading-relaxed">${escapeHTML(item.title)}</span><span class="mt-0.5 block text-[10px] text-slate-500">${escapeHTML(new URL(item.url).hostname.replace('www.', ''))} · ${escapeHTML(item.language)} · acesso gratuito</span></span>${icon('up', 'h-4 w-4 text-slate-500')}<span class="sr-only">Abre em nova aba</span></a>`).join('')}</div></section>`;
  }).join('');
}

function showDialog(title, eyebrow, body, footer) {
  if (!dialog.open) dialogReturnFocus = document.activeElement;
  const isLesson = dialogContext?.type === 'lesson';
  $('#lesson-sections').setAttribute('aria-label', dialogContext?.type === 'project' ? 'Etapas do projeto' : 'Etapas da aula');
  dialog.classList.toggle('lesson-reader', isLesson);
  $('#lesson-sections').classList.toggle('hidden', !isLesson);
  $('#lesson-sections').classList.toggle('flex', isLesson);
  $('#dialog-title').textContent = title;
  $('#dialog-eyebrow').textContent = eyebrow;
  $('#dialog-body').innerHTML = body;
  $('#dialog-footer').innerHTML = footer;
  if (!dialog.open) {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  $('#dialog-body').scrollTop = 0;
  $('#close-dialog').focus({ preventScroll: true });
}

const READER_SECTIONS = [
  ['learn', '1. Conceitos'], ['example', '2. Exemplo'],
  ['practice', '3. Prática'], ['review', '4. Revisão'], ['resources', 'Fontes']
];
let activeLessonSection = 'learn';
let notesSaveTimer;

function prose(value) {
  return escapeHTML(value).replace(/`([^`]+)`/g, '<code class="rounded bg-white/5 px-1 text-violet-200">$1</code>');
}

function readerParagraph(text) {
  return `<p class="mt-3 text-[15px] text-slate-300">${prose(text)}</p>`;
}

function exerciseExpected(exercise) {
  const criteria = Array.isArray(exercise.criteria) && exercise.criteria.length
    ? `<p class="mt-4 text-xs font-bold uppercase tracking-wide text-sky-200">Critérios de aceite</p><ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-200">${exercise.criteria.map(item => `<li>${prose(item)}</li>`).join('')}</ul>`
    : '';
  return `<div class="mt-4 rounded-xl border border-sky-300/20 bg-sky-300/5 p-4"><p class="text-xs font-bold uppercase tracking-wide text-sky-200">Resultado esperado</p><p class="mt-2 text-sm leading-7 text-slate-200">${prose(exercise.expected)}</p>${criteria}</div>`;
}

function readerCode(code, label) {
  return `<div class="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#0b101b]"><div class="border-b border-white/8 px-4 py-2 text-xs text-slate-400">${escapeHTML(label)}</div><pre tabindex="0" aria-label="${escapeHTML(label)}" class="max-h-[32rem] overflow-auto p-4 font-mono text-[13px] leading-7 text-sky-100"><code>${escapeHTML(code)}</code></pre></div>`;
}

function readerTrace(trace) {
  return `<figure class="my-5 overflow-x-auto rounded-xl border border-white/10 bg-[#0b101b]"><figcaption class="px-4 py-3 text-sm font-semibold text-violet-200">${escapeHTML(trace.title)}</figcaption><table class="w-full min-w-[34rem] border-collapse text-left text-sm text-slate-200"><thead><tr>${trace.columns.map(column => `<th scope="col" class="border-y border-white/10 px-4 py-2 font-semibold">${escapeHTML(column)}</th>`).join('')}</tr></thead><tbody>${trace.rows.map(row => `<tr>${row.map(cell => `<td class="border-b border-white/10 px-4 py-2 font-mono">${escapeHTML(String(cell))}</td>`).join('')}</tr>`).join('')}</tbody></table></figure>`;
}

function readerTerms(terms) {
  return `<aside aria-label="Termos desta seção" class="mt-5 rounded-xl border border-sky-300/20 bg-sky-300/5 p-4"><h4 class="text-sm font-semibold text-sky-200">Termos no contexto</h4><dl class="mt-3 space-y-3">${terms.map(({ term, meaning }) => `<div><dt class="text-sm font-semibold text-slate-100">${escapeHTML(term)}</dt><dd class="mt-1 text-sm leading-relaxed text-slate-300">${escapeHTML(meaning)}</dd></div>`).join('')}</dl></aside>`;
}

function renderLessonFooter() {
  if (dialogContext?.type !== 'lesson') return;
  const { id } = dialogContext;
  const { lesson, track } = lessonIndex.get(id);
  const nextSection = { learn: 'Exemplo', example: 'Prática', practice: 'Revisão' }[activeLessonSection];
  $('#dialog-footer').innerHTML = `<div class="flex flex-wrap items-center justify-between gap-3"><label class="flex cursor-pointer items-center gap-3 text-sm"><input type="checkbox" data-complete="${id}" data-focus="modal-check-${id}" ${state.completed[id] ? 'checked' : ''} class="h-4 w-4 cursor-pointer accent-violet-400"><span id="modal-completion-label">${state.completed[id] ? 'Lição concluída' : 'Marcar como concluída'}</span></label><button data-action="${nextSection ? 'section-next' : 'next'}" class="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-400">${nextSection ? `Continuar: ${nextSection}` : lessonsOf(track).at(-1).id === lesson.id ? 'Voltar à trilha' : 'Próxima aula'}${icon('arrow')}</button></div>`;
}

function quizMarkup(lesson) {
  const attempt = state.quizAttempts[lesson.id] || { answers: [], checked: false };
  const questions = lesson.guide.quiz;
  const score = questions.reduce((total, question, i) => total + (attempt.answers[i] === question.correctIndex ? 1 : 0), 0);
  const firstWrong = questions.findIndex((question, i) => attempt.answers[i] !== question.correctIndex);
  const items = questions.map((question, i) => {
    const correct = attempt.answers[i] === question.correctIndex;
    const options = question.options.map((option, j) => `<label class="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-[#141824] p-3 text-sm leading-relaxed hover:border-violet-300/50"><input type="radio" name="quiz-${i}" value="${j}" data-quiz-question="${i}" ${attempt.answers[i] === j ? 'checked' : ''} class="mt-1 h-4 w-4 shrink-0 accent-violet-400"><span>${escapeHTML(option)}</span></label>`).join('');
    const recovery = correct ? '' : `<p class="mt-3 text-xs text-slate-400">Aula para revisar: ${escapeHTML(lesson.title)}</p><button type="button" data-review-concept="${lesson.id}" class="mt-2 rounded-lg border border-violet-300/30 px-3 py-2 text-xs font-semibold text-violet-200 hover:bg-violet-300/10">Rever conceitos desta aula</button>${lesson.guide.retry && i === firstWrong ? '<button type="button" data-retry class="ml-2 mt-2 rounded-lg border border-sky-300/30 px-3 py-2 text-xs font-semibold text-sky-200 hover:bg-sky-300/10">Ir para segunda tentativa</button>' : ''}`;
    return `<fieldset class="mt-6"><legend class="mb-3 text-[15px] font-semibold leading-relaxed">${i + 1}. ${escapeHTML(question.question)}</legend><div class="space-y-2">${options}</div><div data-quiz-feedback ${attempt.checked ? '' : 'hidden'} class="mt-3 rounded-lg border border-white/10 p-3 text-sm leading-relaxed"><p class="font-semibold ${correct ? 'text-emerald-300' : 'text-amber-200'}">${correct ? 'Correto.' : `Ainda não. A resposta é: ${escapeHTML(question.options[question.correctIndex])}`}</p><p class="mt-2 text-slate-300">${escapeHTML(question.explanation)}</p>${recovery}</div></fieldset>`;
  }).join('');
  return `<form id="lesson-quiz" class="mt-8 rounded-2xl border border-violet-400/20 bg-violet-400/5 p-4 sm:p-6"><h3 class="font-display text-xl font-semibold">Confira o que você entendeu</h3><p class="mt-2 text-sm leading-relaxed text-slate-400">Escolha uma resposta por questão. A correção verifica conceitos; ela não executa seus exercícios nem comprova domínio prático.</p>${items}<button type="submit" class="mt-6 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-400">Conferir respostas</button><p id="quiz-result" role="status" aria-live="polite" tabindex="-1" class="mt-4 text-sm leading-relaxed text-violet-200">${attempt.checked ? `${score} de ${questions.length} respostas corretas. ${score === questions.length ? 'Conceitos conferidos no quiz. Execute os exercícios e explique uma solução para um problema novo; essas evidências são registradas separadamente.' : 'Leia os comentários e volte aos conceitos que precisarem de revisão.'}` : ''}</p></form>`;
}

function retryMarkup(lesson) {
  const retry = lesson.guide.retry;
  const attempt = state.quizAttempts[lesson.id];
  if (!retry || !attempt?.checked || lesson.guide.quiz.every((question, i) => attempt.answers[i] === question.correctIndex)) return '';
  const key = `${lesson.id}:retry`;
  return `<section id="second-attempt" class="mt-7 rounded-2xl border border-sky-300/20 bg-sky-300/5 p-4 sm:p-6" aria-labelledby="second-attempt-title"><h3 id="second-attempt-title" class="font-display text-lg font-semibold">Segunda tentativa · problema diferente</h3><p class="mt-2 text-xs text-slate-400">Volte aos conceitos se precisar. Depois resolva este caso sem copiar a solução do exercício anterior.</p><p class="mt-4 text-sm leading-relaxed text-slate-200">${escapeHTML(retry.prompt)}</p><p class="mt-3 text-sm text-emerald-200"><strong>Critério de aceite:</strong> ${escapeHTML(retry.expected)}</p><label for="retry-note" class="mt-5 block text-sm font-semibold">Sua nova tentativa</label><textarea id="retry-note" data-note="${key}" maxlength="2000" rows="5" class="mt-2 w-full rounded-xl border border-white/20 bg-[#0b101b] p-3 text-sm" placeholder="Escreva sua solução e como verificou o resultado.">${escapeHTML(state.notes[key] || '')}</textarea><p class="mt-2 text-xs text-slate-400">Aguarde a confirmação de salvamento na nuvem. A resposta não é corrigida automaticamente.</p><details class="mt-3 text-sm text-slate-300"><summary class="cursor-pointer font-semibold text-sky-200">Preciso de uma pista</summary><p class="mt-2">${escapeHTML(retry.hint)}</p></details></section>`;
}

function prepareSpacedReview(lesson) {
  const evidence = state.learningEvidence[lesson.id];
  if (!evidence?.practicedAt || evidence.reviewedAt) return;
  const due = reviewDueAt(evidence.practicedAt);
  if (Date.now() < due) return;
  const attempt = state.quizAttempts[lesson.id] || { answers: [], checked: false };
  if (attempt.reviewStartedAt && Date.parse(attempt.reviewStartedAt) >= due) return;
  state.quizAttempts[lesson.id] = { answers: [], checked: false, checkedAt: null, reviewStartedAt: new Date().toISOString() };
  saveState();
}

function cumulativeReviewMarkup(track, module, lesson) {
  const index = track.modules.indexOf(module);
  if (index < 1 || module.lessons[0].id !== lesson.id) return '';
  const source = track.modules[index - 1].lessons[0];
  const key = `${lesson.id}:cumulative`;
  return `<section class="mt-7 rounded-2xl border border-violet-300/20 bg-violet-300/5 p-4 sm:p-6" aria-labelledby="cumulative-title"><h3 id="cumulative-title" class="font-display text-lg font-semibold">Retome o módulo anterior</h3><p class="mt-2 text-sm leading-relaxed text-slate-300">Antes de consultar a aula <strong>${escapeHTML(source.title)}</strong>, escreva um exemplo novo para o conceito abaixo e explique o resultado que espera observar.</p><p class="mt-3 rounded-lg border border-white/10 p-3 text-sm text-violet-100">${escapeHTML(source.concept)}</p><label for="cumulative-note" class="mt-4 block text-sm font-semibold">Seu exemplo e explicação</label><textarea id="cumulative-note" data-note="${key}" maxlength="2000" rows="4" class="mt-2 w-full rounded-xl border border-white/20 bg-[#0b101b] p-3 text-sm" placeholder="Descreva um caso diferente do exemplo anterior e o resultado esperado.">${escapeHTML(state.notes[key] || '')}</textarea><p class="mt-2 text-xs text-slate-400">Aguarde a confirmação de salvamento na nuvem. Esta atividade não corrige automaticamente sua resposta.</p><button type="button" data-lesson="${source.id}" class="mt-3 rounded-lg border border-violet-300/30 px-3 py-2 text-xs font-semibold text-violet-200 hover:bg-violet-300/10">Rever a aula anterior</button></section>`;
}

function learningEvidenceMarkup(lesson) {
  const evidence = state.learningEvidence[lesson.id] || {};
  const attempt = state.quizAttempts[lesson.id];
  const passedQuiz = attempt?.checked && attempt.checkedAt && evidence.practicedAt && Date.parse(attempt.checkedAt) >= reviewDueAt(evidence.practicedAt) && lesson.guide.quiz.every((question, i) => attempt.answers[i] === question.correctIndex);
  const reviewReady = evidence.practicedAt && Date.now() >= reviewDueAt(evidence.practicedAt);
  const reviewDisabled = !evidence.reviewedAt && (!reviewReady || !passedQuiz);
  return `<section class="mt-8 rounded-2xl border border-sky-300/20 bg-sky-300/5 p-4 sm:p-6" aria-labelledby="evidence-title"><h3 id="evidence-title" class="font-display text-xl font-semibold">Evidências desta aula</h3><p class="mt-2 text-sm leading-relaxed text-slate-300">Estas marcações são autoavaliações. O quiz verifica conceitos; a solução de um problema novo precisa ser explicada por você.</p><ol class="mt-5 space-y-4 text-sm"><li><strong>Li:</strong> ${state.completed[lesson.id] ? 'aula marcada como concluída' : 'marque a conclusão no rodapé quando terminar a leitura'}. Isso mede acompanhamento.</li><li><strong>Pratiquei:</strong> ${evidence.practicedAt ? 'registrado' : 'pendente'}. Execute os exercícios no ambiente indicado e confira os resultados. <button type="button" data-evidence="practice" class="ml-1 rounded-lg border border-sky-300/30 px-2 py-1 text-sky-200">${evidence.practicedAt ? 'Desfazer prática' : 'Registrar prática'}</button></li><li><strong>Passei na revisão:</strong> ${evidence.reviewedAt ? 'registrado' : 'pendente'}. Volte após pelo menos três dias da prática e acerte todas as questões do quiz. <button type="button" data-evidence="review" ${reviewDisabled ? 'disabled' : ''} class="ml-1 rounded-lg border border-sky-300/30 px-2 py-1 text-sky-200 disabled:cursor-not-allowed disabled:opacity-50">${evidence.reviewedAt ? 'Desfazer revisão' : 'Registrar revisão'}</button>${!evidence.reviewedAt ? `<span class="mt-1 block text-xs text-slate-400">${!reviewReady ? 'Aguarde três dias após registrar a prática.' : !passedQuiz ? 'Confira o quiz e acerte todas as questões.' : 'Critérios atendidos.'}</span>` : ''}</li></ol><div class="mt-5 border-t border-white/10 pt-5"><label for="evidence-explanation" class="block text-sm font-semibold">Resolvi sozinho: explique um problema novo</label><p class="mt-1 text-xs leading-relaxed text-slate-400">Escolha uma tarefa diferente do exemplo da aula, resolva sem consultar a solução e explique o que fez e por quê. O registro não corrige a resposta automaticamente.</p><textarea id="evidence-explanation" maxlength="2000" rows="4" class="mt-3 w-full rounded-xl border border-white/20 bg-[#0b101b] p-3 text-sm" placeholder="Qual problema novo você resolveu? Como verificou o resultado?">${escapeHTML(evidence.explanation || '')}</textarea><div class="mt-3 flex flex-wrap gap-2"><button type="button" data-evidence="solved" class="rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-500">${evidence.solvedAt ? 'Atualizar explicação' : 'Registrar resolução autônoma'}</button>${evidence.solvedAt ? '<button type="button" data-evidence="clear-solved" class="rounded-lg border border-white/20 px-3 py-2 text-sm">Desfazer resolução</button>' : ''}</div><p id="evidence-status" role="status" aria-live="polite" class="mt-2 text-xs text-sky-200">${evidence.solvedAt ? 'Resolução autônoma registrada por autoavaliação.' : ''}</p></div></section>`;
}

function updateLearningEvidence(action) {
  if (dialogContext?.type !== 'lesson') return;
  const id = dialogContext.id;
  const draft = $('#evidence-explanation')?.value;
  const evidence = state.learningEvidence[id] || { practicedAt: null, reviewedAt: null, solvedAt: null, explanation: '' };
  if (action === 'practice') {
    evidence.practicedAt = evidence.practicedAt ? null : new Date().toISOString();
    if (!evidence.practicedAt) evidence.reviewedAt = null;
  } else if (action === 'review') {
    if (evidence.reviewedAt) evidence.reviewedAt = null;
    else {
      const { lesson } = lessonIndex.get(id);
      const attempt = state.quizAttempts[id];
      if (!evidence.practicedAt || Date.now() < reviewDueAt(evidence.practicedAt) || !attempt?.checked || !attempt.checkedAt || Date.parse(attempt.checkedAt) < reviewDueAt(evidence.practicedAt) || !lesson.guide.quiz.every((question, i) => attempt.answers[i] === question.correctIndex)) return;
      evidence.reviewedAt = new Date().toISOString();
    }
  } else if (action === 'clear-solved') {
    evidence.solvedAt = null;
    evidence.explanation = '';
  } else if (action === 'solved') {
    const explanation = $('#evidence-explanation').value.trim().slice(0, 2000);
    if (!explanation) {
      $('#evidence-status').textContent = 'Explique o problema novo e como verificou sua solução antes de registrar.';
      $('#evidence-explanation').focus();
      return;
    }
    evidence.explanation = explanation;
    evidence.solvedAt = new Date().toISOString();
  }
  state.learningEvidence[id] = evidence;
  saveState();
  renderReviewQueue();
  renderEvidenceSummary();
  renderLessonSection('review');
  if (action !== 'solved' && action !== 'clear-solved' && draft !== undefined) $('#evidence-explanation').value = draft;
  const target = action === 'solved' ? '#evidence-explanation' : action === 'clear-solved' ? '#evidence-explanation' : `[data-evidence="${action}"]`;
  $(target)?.focus();
}

function renderLessonSection(section = activeLessonSection, moveFocus = false) {
  if (dialogContext?.type !== 'lesson' || !READER_SECTIONS.some(([key]) => key === section)) return;
  const { lesson, module, track } = lessonIndex.get(dialogContext.id);
  const guide = lesson.guide;
  activeLessonSection = section;
  $('#lesson-sections').innerHTML = READER_SECTIONS.map(([key, label]) => `<button id="reader-tab-${key}" role="tab" aria-selected="${key === section}" aria-controls="lesson-reading-panel" tabindex="${key === section ? 0 : -1}" data-lesson-section="${key}" class="reader-section shrink-0 rounded-lg border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white">${label}</button>`).join('');
  let content = '';
  if (section === 'learn') {
    content = `<div class="mb-6 flex flex-wrap items-center gap-2"><span class="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-200">${module.level}</span><span class="text-xs text-slate-400">~${duration(lesson.minutes)} de estudo e prática</span></div><h3 class="font-display text-2xl font-semibold">Antes do primeiro passo</h3><div class="mt-4 rounded-xl border border-white/10 bg-white/[.025] p-4"><h4 class="text-sm font-semibold text-violet-200">O que você precisa saber</h4>${readerParagraph(guide.prerequisites)}<h4 class="mt-5 text-sm font-semibold text-violet-200">Prepare seu ambiente</h4>${readerParagraph(guide.setup)}</div><h3 class="mt-8 font-display text-xl font-semibold">Onde isso entra na prática?</h3>${readerParagraph(guide.why)}<div class="mt-6 border-l-2 border-violet-400/60 pl-4"><h4 class="text-sm font-semibold text-violet-200">Ao terminar esta aula</h4><ul class="mt-2 list-disc space-y-2 pl-4 text-sm leading-relaxed text-slate-300">${lesson.objectives.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>${guide.sections.map((part, i) => `<section class="mt-9"><h3 class="font-display text-xl font-semibold leading-snug"><span class="mr-2 text-violet-300">${String(i + 1).padStart(2, '0')}.</span>${escapeHTML(part.title)}</h3>${part.paragraphs.map(readerParagraph).join('')}${part.trace ? readerTrace(part.trace) : ''}${part.diagram ? readerCode(part.diagram, part.diagramTitle || 'Mapa de referências') : ''}${part.terms?.length ? readerTerms(part.terms) : ''}</section>`).join('')}<p class="mt-8 rounded-xl bg-violet-400/10 p-4 text-sm leading-relaxed text-violet-100">Quando conseguir explicar essas ideias com suas palavras, continue para o exemplo. Você verá como cada parte aparece no código ou no fluxo de trabalho.</p>`;
  } else if (section === 'example') {
    content = `<h3 class="font-display text-2xl font-semibold">Um exemplo, parte por parte</h3><p class="mt-3 text-sm leading-relaxed text-slate-400">Leia a explicação e execute no ambiente indicado. O código exibido aqui é material de estudo; ele não é executado dentro do dashboard.</p>${readerParagraph(guide.setup)}${readerCode(guide.example.code, guide.example.language)}<h3 class="mt-7 font-display text-xl font-semibold">Por que cada parte está aqui?</h3><ol class="mt-4 space-y-4">${guide.example.explanation.map((step, i) => `<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-400/15 text-xs font-bold text-violet-200">${i + 1}</span><p class="text-[15px] text-slate-300">${prose(step)}</p></li>`).join('')}</ol><div class="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4"><h3 class="text-sm font-semibold text-emerald-200">O que você deve observar</h3>${readerParagraph(guide.example.expected)}</div><h3 class="mt-8 font-display text-xl font-semibold">Agora, faça uma mudança de cada vez</h3><ol class="mt-4 space-y-4">${guide.guided.map((step, i) => `<li class="rounded-xl border border-white/10 p-4"><h4 class="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-300">Passo ${i + 1}</h4>${readerParagraph(step.instruction)}<p class="mt-3 text-sm text-emerald-200"><strong>Observe:</strong> ${prose(step.result)}</p></li>`).join('')}</ol>`;
  } else if (section === 'practice') {
    content = `<h3 class="font-display text-2xl font-semibold">Da prática guiada à sua solução</h3><p class="mt-3 text-sm leading-relaxed text-slate-400">Tente resolver antes de abrir as dicas. Este campo guarda seu raciocínio ou código, mas não o executa. Rode os comandos no terminal ou o código no editor e navegador indicados em “Prepare seu ambiente”. A aba Revisão confere conceitos.</p>${guide.exercises.map((exercise, i) => { const key = `${lesson.id}:${i}`; return `<section class="mt-7 rounded-2xl border border-white/10 p-4 sm:p-6"><p class="mb-2 text-xs font-bold tracking-wide text-violet-300">EXERCÍCIO ${i + 1} · ${guide.exercises.length > 2 ? ['PRÁTICA GUIADA', 'COMPLETAR E ADAPTAR', 'CONSTRUIR', 'INVESTIGAR E CORRIGIR'][i] || 'EXTENSÃO OPCIONAL' : i === 0 ? 'FIXAÇÃO' : 'APLICAÇÃO'}</p><h3 class="sr-only">Exercício ${i + 1}</h3>${readerParagraph(exercise.prompt)}${exerciseExpected(exercise)}<label class="mb-2 mt-5 block text-sm font-medium" for="exercise-note-${i}">Seu rascunho — exercício ${i + 1}</label><textarea id="exercise-note-${i}" data-note="${key}" maxlength="10000" rows="6" spellcheck="false" class="w-full resize-y rounded-xl border border-white/15 bg-[#0b101b] p-3 font-mono text-sm leading-6 text-slate-200 placeholder:text-slate-500 focus:border-violet-400" placeholder="Escreva seu raciocínio, pseudocódigo ou uma solução para testar…">${escapeHTML(state.notes[key] || '')}</textarea><p class="mt-1 text-xs text-slate-400">Aguarde a confirmação de salvamento na nuvem; este campo não executa nem corrige código. Até 10.000 caracteres.</p><details class="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/5 p-4"><summary class="text-sm font-semibold text-amber-100">Preciso de uma dica</summary><ol class="list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">${exercise.hints.map(hint => `<li>${prose(hint)}</li>`).join('')}</ol></details><details class="mt-3 rounded-xl border border-emerald-300/15 bg-emerald-300/5 p-4"><summary class="text-sm font-semibold text-emerald-100">Ver solução comentada</summary>${readerCode(exercise.solution, 'Uma solução possível')}${readerParagraph(exercise.explanation)}</details></section>`; }).join('')}<p class="mt-7 text-sm leading-relaxed text-slate-400">Uma solução diferente também pode estar correta. Compare comportamento e critérios, depois explique por que a sua solução funciona.</p>`;
  } else if (section === 'review') {
    prepareSpacedReview(lesson);
    content = `<h3 class="font-display text-2xl font-semibold">Revise antes de avançar</h3><h4 class="mb-3 mt-6 text-base font-semibold text-amber-200">Erros comuns e como corrigi-los</h4><ul class="space-y-3">${guide.mistakes.map(item => `<li class="rounded-xl border border-white/8 p-4 text-[15px] leading-7 text-slate-300">${prose(item)}</li>`).join('')}</ul>${cumulativeReviewMarkup(track, module, lesson)}${quizMarkup(lesson)}${retryMarkup(lesson)}${learningEvidenceMarkup(lesson)}<h3 class="mb-3 mt-8 font-display text-xl font-semibold">Leve estas ideias com você</h3><ul class="list-disc space-y-3 pl-5 text-[15px] leading-7 text-slate-300">${guide.summary.map(item => `<li>${prose(item)}</li>`).join('')}</ul><p class="mt-6 rounded-xl border border-emerald-300/20 p-4 text-sm leading-relaxed text-emerald-100">Marque a aula como concluída quando conseguir explicar os conceitos, aplicar o exemplo e resolver os exercícios. A conclusão é sua autoavaliação; a revisão não marca aulas automaticamente.</p>`;
  } else {
    content = `<h3 class="font-display text-2xl font-semibold">Aprofunde quando precisar</h3><p class="mt-3 text-[15px] leading-relaxed text-slate-400">A explicação, a prática e a revisão estão dentro desta aula. As referências abaixo servem para consultar detalhes e explorar aplicações adicionais. Algumas aulas em vídeo usam versões anteriores; confira a documentação para o seu ambiente.</p>${track.id === 'html' ? htmlReferenceGuide() : track.id === 'ai' ? '<div class="mt-5 rounded-xl border border-sky-300/20 p-4"><h4 class="font-semibold">Como aprofundar Engenharia de IA</h4><p class="mt-3 text-sm leading-7">Consulte primeiro o contrato da API, a versão do SDK e a especificação do protocolo usado. Exemplos locais simulam somente as partes explicitadas; conexão real, qualidade de modelo e segurança exigem avaliações próprias. As aulas fornecem a base para as atividades. Documentação, livros e cursos abertos complementam; contas, inferência e infraestrutura podem ter custos separados.</p></div>' : track.id === 'database' ? '<div class="mt-5 rounded-xl border border-sky-300/20 p-4"><h4 class="font-semibold">Como consultar bancos e Docker</h4><p class="mt-3 text-sm leading-7">Identifique primeiro o motor, a versão e o cliente. Consulte a referência de comandos SQL, tipos, funções e transações desse motor. No MongoDB, procure operadores de consulta e estágios de agregação. No Docker, diferencie comandos de terminal e opções do arquivo Compose. Compare sintaxe, resultado e limites; não trate dialetos como intercambiáveis. As fontes aprofundam as aulas, e cada prática informa onde executar.</p></div>' : track.id === 'python' ? '<div class="mt-5 rounded-xl border border-sky-300/20 p-4"><h4 class="font-semibold">Como consultar Python</h4><p class="mt-3 text-sm leading-7">No índice oficial, pesquise primeiro a estrutura da linguagem no Tutorial e depois o nome exato da função, método, exceção ou módulo na Referência da Biblioteca. Confira assinatura, tipos aceitos, valor retornado e exceções. Teste uma mudança pequena no terminal. As fontes ampliam o estudo; os exercícios e projetos são explicados aqui.</p></div>' : track.id === 'javascript' ? '<div class="mt-5 rounded-xl border border-sky-300/20 p-4"><h4 class="font-semibold">Como consultar JavaScript</h4><p class="mt-3 text-sm leading-7">Procure métodos pelo tipo: Array para map, filter e reduce; String para trim e includes; Object para chaves e valores. Operadores e estruturas de controle ficam na referência da linguagem. document, eventos, fetch e localStorage pertencem às APIs do navegador. Confira parâmetros, valor retornado, mutação da entrada e erros possíveis. Adapte um exemplo pequeno antes de integrar ao projeto. As consultas são opcionais: as atividades são explicadas nas aulas.</p></div>' : ''}${resourceCards([...(lesson.docs || []), ...module.resources])}`;
  }
  $('#dialog-body').innerHTML = `<article id="lesson-reading-panel" role="tabpanel" aria-labelledby="reader-tab-${section}" tabindex="0" class="reader-prose">${content}</article>`;
  $('#dialog-body').scrollTop = 0;
  renderLessonFooter();
  if (moveFocus) $(`#reader-tab-${section}`).focus({ preventScroll: true });
}

function openLesson(id) {
  const entry = lessonIndex.get(id);
  if (!entry) return;
  const { track, module, lesson } = entry;
  state.lastLesson = id;
  state.activeTrack = track.id;
  saveState();
  if (!dialog.open) dialogReturnFocus = document.activeElement;
  const origin = dialogReturnFocus;
  render();
  dialogContext = { type: 'lesson', id };
  activeLessonSection = 'learn';
  showDialog(lesson.title, `${track.title} / Módulo ${module.number}`, '', '');
  renderLessonSection();
  dialogReturnFocus = origin;
}

function gradeQuiz() {
  if (dialogContext?.type !== 'lesson') return;
  const { lesson } = lessonIndex.get(dialogContext.id);
  const attempt = state.quizAttempts[lesson.id] || { answers: [], checked: false };
  const missing = lesson.guide.quiz.findIndex((_, i) => !Number.isInteger(attempt.answers[i]));
  if (missing !== -1) {
    $('#quiz-result').textContent = `Responda à questão ${missing + 1} antes de conferir.`;
    $(`[name="quiz-${missing}"]`).focus();
    return;
  }
  attempt.checked = true;
  attempt.checkedAt = new Date().toISOString();
  state.quizAttempts[lesson.id] = attempt;
  saveState();
  renderEvidenceSummary();
  renderLessonSection('review');
  $('#quiz-result').scrollIntoView({ block: 'nearest' });
  $('#quiz-result').focus({ preventScroll: true });
}


const PROJECT_SECTIONS = [['brief','1. Missão'],['reference','2. Referência'],['build','3. Entrega'],['checks','4. Validação'],['solution','5. Solução']];
let activeProjectSection = 'brief';
let projectReport = null;
const projectById = id => PROJECTS.find(project => project.id === id);

function projectCard(module) {
  return PROJECTS.filter(item => item.module === module.id).map(project => {
    const delivered = !!state.projects[project.id]?.delivered;
    return `<div class="m-4 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4"><p class="text-[10px] font-bold uppercase tracking-wide text-amber-200">${escapeHTML(project.level)}</p><h3 class="mt-2 text-sm font-semibold">${escapeHTML(project.title)}</h3><p class="mt-2 text-xs leading-relaxed text-slate-400">${delivered ? 'Entrega registrada · critérios do projeto conferidos e testes autoavaliados.' : ['python','database','ai','workflow','javascript'].includes(project.kind) ? 'Aplique o conteúdo: contrato, verificações, resultados esperados e solução comentada.' : 'Aplique o conteúdo: enunciado, referência visual, testes e solução comentada.'}</p><button data-project="${project.id}" data-focus="project-${project.id}" class="mt-3 rounded-lg bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100 hover:bg-amber-300/20">${delivered ? 'Revisar projeto' : 'Abrir projeto'}</button></div>`;
  }).join('');
}

function projectEntry(id) {
  return state.projects[id] ||= { source: '', manual: {}, explanation: '', delivered: false };
}

function structuralChecks(source) {
  // Neutralize resource-bearing elements before parsing detached learner markup.
  const inertSource = source.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '').replace(/<(\/?)(img|iframe|object|embed|link|audio|video|source)\b/gi, '<$1x-inert-$2');
  const doc = new DOMParser().parseFromString(inertSource, 'text/html');
  const all = selector => [...doc.querySelectorAll(selector)];
  const ids = all('[id]').map(el => el.id);
  const uniqueIds = new Set(ids).size === ids.length;
  const fields = all('input:not([type=hidden]),select,textarea');
  const labelled = el => !!el.id && all('label').some(label => label.htmlFor === el.id && label.textContent.trim());
  const rules = [];
  const collect = list => { for (const rule of list) { rules.push(rule); if (rule.cssRules) collect(rule.cssRules); } };
  let styleError = false;
  for (const element of all('style')) {
    try { const sheet = new CSSStyleSheet(); sheet.replaceSync(element.textContent); collect(sheet.cssRules); }
    catch { styleError = true; }
  }
  const has = (name, value) => rules.some(rule => rule.style && rule.style.getPropertyValue(name) && (!value || rule.style.getPropertyValue(name).trim() === value));
  const selector = token => rules.some(rule => rule.selectorText?.includes(token) && rule.style?.length);
  const properties = new Set(rules.flatMap(rule => rule.style ? [...rule.style].filter(name => name.startsWith('--')) : []));
  const internalLinks = all('a[href^="#"]');
  const noDuplicateIds = uniqueIds && ids.every(Boolean);
  const values = {
    document: /<!doctype\s+html\s*>/i.test(source) && /<html\b/i.test(source) && !!doc.documentElement.lang.trim() && !!doc.title.trim() && !!doc.querySelector('meta[charset="UTF-8" i]') && !!doc.querySelector('meta[name="viewport"]')?.content.includes('width=device-width'),
    landmarks: all('main').length === 1 && all('h1').length === 1 && !!doc.querySelector('header nav') && !!doc.querySelector('footer') && internalLinks.length >= 2 && internalLinks.every(a => a.hash.length > 1 && !!doc.getElementById(a.hash.slice(1))) && noDuplicateIds,
    labels: fields.length >= 2 && fields.every(el => el.name && labelled(el)) && all('button').length > 0 && all('button').every(el => el.hasAttribute('type') && el.textContent.trim()) && noDuplicateIds,
    email: !!doc.querySelector('form input[type=email][required][name]') && !!doc.querySelector('form button[type=submit]'),
    table: all('table').some(table => table.querySelector('caption')?.textContent.trim() && table.querySelector('th[scope=col]') && table.querySelector('th[scope=row]') && table.querySelectorAll('tbody tr').length >= 2),
    enrollment: !!doc.querySelector('input[name=nome][required]') && all('select[required]').some(el => el.options.length >= 3 && el.options[0].value === '' && [...el.options].slice(1).filter(o=>o.value).length >= 2),
    box: has('box-sizing','border-box') && has('max-width'),
    type: (has('font-family') || has('font')) && has('line-height') && has('color') && (has('background') || has('background-color')),
    focus: selector(':focus') && selector(':hover'),
    cards: all('section').some(section => [...section.querySelectorAll('article')].filter(el => el.querySelector('h3')?.textContent.trim() && el.querySelector('a[href]')?.textContent.trim()).length >= 3),
    layout: has('display','flex') && has('display','grid') && rules.some(rule => rule.media && /width/.test(rule.conditionText)) && properties.size >= 3 && !styleError,
    message: all('textarea[required][name]').some(el => labelled(el) && el.minLength >= 10)
  };
  return values;
}

function previewMarkup(source, title) {
  const policy = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; form-action 'none'; base-uri 'none'";
  const safe = '<!DOCTYPE html><meta http-equiv="Content-Security-Policy" content="'+policy+'">'+source;
  return `<div class="my-4 flex flex-wrap gap-2"><button data-preview-width="360" class="rounded-lg border border-white/15 px-3 py-2 text-xs">360px</button><button data-preview-width="1200" class="rounded-lg border border-white/15 px-3 py-2 text-xs">1200px</button><button data-preview-width="100%" class="rounded-lg border border-white/15 px-3 py-2 text-xs">Ajustar à área</button></div><div class="overflow-x-auto rounded-xl border border-white/15 bg-[#0b101b]"><iframe id="project-preview" title="${escapeHTML(title)}" sandbox="" referrerpolicy="no-referrer" srcdoc="${escapeHTML(safe)}" class="mx-auto block h-[28rem] w-full border-0 bg-white"></iframe></div><p class="mt-3 text-xs leading-6 text-slate-400">A prévia isola seu HTML/CSS: scripts, recursos externos e envio de formulários ficam bloqueados. Use CSS interno e, para testes de envio, abra o arquivo local com dados fictícios. A largura de 1200px pode exigir rolagem apenas nesta área de demonstração.</p>`;
}

function projectFooter() {
  const project = projectById(dialogContext.id);
  const entry = projectEntry(project.id);
  $('#dialog-footer').innerHTML = `<label for="project-explanation" class="block text-sm font-semibold text-slate-100">Explique suas decisões para esta entrega</label><p class="mt-1 text-xs leading-relaxed text-slate-400">Qual escolha foi importante, por que você a fez e como verificou o resultado? Escreva com suas palavras. Este texto é autoavaliação e não é corrigido automaticamente.</p><textarea id="project-explanation" maxlength="4000" rows="3" class="mt-2 w-full rounded-xl border border-white/20 bg-[#0b101b] p-3 text-sm" placeholder="Escolhi... porque... Verifiquei com...">${escapeHTML(entry.explanation || '')}</textarea><div class="mt-3 flex flex-wrap items-center justify-between gap-3"><span id="project-delivery-label" class="text-xs text-slate-400">${entry.delivered ? entry.explanation?.trim() ? 'Entrega registrada · autoavaliação' : 'Entrega anterior registrada · explicação pendente' : 'Projeto separado do progresso das aulas'}</span><button data-action="project-submit" class="rounded-xl bg-amber-300 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-200">Registrar entrega</button></div><p id="project-status" role="status" aria-live="polite" class="mt-2 text-xs leading-relaxed text-amber-100"></p>`;
}

function requireProjectExplanation(entry) {
  entry.explanation = (entry.explanation || '').trim().slice(0, 4000);
  if (entry.explanation) return true;
  $('#project-status').textContent = 'Explique uma decisão, o motivo e como verificou o resultado antes de registrar a entrega.';
  $('#project-explanation').focus();
  return false;
}

function openProject(id) {
  const project = projectById(id);
  if (!project) return;
  dialogContext = { type: 'project', id };
  projectReport = null;
  showDialog(project.title, project.level, '', '');
  dialog.classList.add('lesson-reader');
  $('#lesson-sections').classList.remove('hidden');
  $('#lesson-sections').classList.add('flex');
  renderProjectSection('brief');
}

function renderProjectSection(section, focus = false) {
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='workflow')return renderWorkflowProjectSection(section,focus);
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='ai')return renderAiProjectSection(section,focus);
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='database')return renderDatabaseProjectSection(section,focus);
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='python')return renderPythonProjectSection(section,focus);
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='javascript')return renderJsProjectSection(section,focus);
  if (dialogContext?.type !== 'project' || !PROJECT_SECTIONS.some(([key])=>key === section)) return;
  activeProjectSection = section;
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  $('#lesson-sections').innerHTML = PROJECT_SECTIONS.map(([key,title])=>`<button id="project-tab-${key}" role="tab" aria-controls="project-panel" aria-selected="${section===key}" tabindex="${section===key?0:-1}" data-project-section="${key}" class="reader-section shrink-0 rounded-lg border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400">${title}</button>`).join('');
  let body;
  if (section === 'brief') {
    body = `<h3 class="font-display text-2xl font-semibold">O que você vai construir</h3>${readerParagraph(project.goal)}<h4 class="mt-6 font-semibold text-violet-200">Antes de começar</h4>${readerParagraph(project.prerequisites)}<h4 class="mt-6 font-semibold text-violet-200">Enunciado</h4>${project.brief.map(readerParagraph).join('')}<h4 class="mt-6 font-semibold text-violet-200">Entrega esperada</h4>${readerParagraph(project.deliverable)}<h4 class="mt-6 font-semibold text-violet-200">Requisitos obrigatórios</h4><ul class="mt-3 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">${project.checks.map(check=>`<li>${escapeHTML(check.label)} <span class="text-xs text-amber-200">(${check.mode==='auto'?'checagem estrutural':'teste manual'})</span></li>`).join('')}</ul><details class="mt-6 rounded-xl border border-white/10 p-4"><summary class="text-sm font-semibold">Preciso de orientação para começar</summary>${project.hints.map(readerParagraph).join('')}</details>`;
  } else if (section === 'reference') {
    body = `<h3 class="font-display text-2xl font-semibold">Uma referência de resultado</h3>${readerParagraph('Observe a estrutura e o comportamento. Seu texto, cores e composição podem variar se cumprirem os critérios. Reproduzir exatamente os pixels não é a meta.')}${previewMarkup(project.solution,'Referência do projeto')}<h4 class="mt-6 font-semibold">Roteiro de testes</h4>${project.tests.map(([action,expected])=>`<div class="mt-3 rounded-xl border border-white/10 p-4">${readerParagraph(action)}<p class="mt-2 text-sm leading-7 text-emerald-200"><strong>Esperado:</strong> ${escapeHTML(expected)}</p></div>`).join('')}`;
  } else if (section === 'build') {
    body = `<h3 class="font-display text-2xl font-semibold">Seu projeto</h3>${readerParagraph(project.deliverable)}<label for="project-source" class="mb-2 mt-5 block text-sm font-semibold">Documento HTML completo (até 80.000 caracteres)</label><textarea id="project-source" spellcheck="false" maxlength="80000" rows="14" class="w-full rounded-xl border border-white/20 bg-[#0b101b] p-4 font-mono text-sm leading-6" placeholder="Cole aqui o HTML que você criou no editor…">${escapeHTML(entry.source)}</textarea><p class="mt-2 text-xs text-slate-400">Aguarde a confirmação de salvamento na nuvem. Alterar o código exige conferir os critérios novamente.</p><button data-action="project-check" class="my-5 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold">Atualizar prévia e verificar estrutura</button><div id="project-live-preview">${entry.source ? previewMarkup(entry.source,'Prévia da sua entrega') : '<p class="text-sm text-slate-400">Sua prévia aparecerá depois que você colar o documento e clicar no botão.</p>'}</div>`;
  } else if (section === 'checks') {
    const results = structuralChecks(entry.source);
    body = `<h3 class="font-display text-2xl font-semibold">Evidências antes da entrega</h3>${readerParagraph(project.rubric)}<p class="mt-4 rounded-xl border border-amber-300/20 p-4 text-sm leading-7 text-amber-100">As checagens automáticas inspecionam elementos e declarações CSS; não avaliam todo o comportamento visual, a qualidade do texto ou a acessibilidade completa. Elas não substituem os testes manuais. Um checkbox manual registra sua autoavaliação.</p><div class="mt-5 space-y-3">${project.checks.map(check=>check.mode==='auto' ? `<div class="rounded-xl border border-white/10 p-4"><span class="text-xs font-bold ${results[check.id]?'text-emerald-200':'text-amber-200'}">${results[check.id]?'✓ ESTRUTURA ENCONTRADA':'○ REVISAR ESTRUTURA'}</span><p class="mt-2 text-sm leading-7">${escapeHTML(check.label)}</p></div>` : `<label class="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4"><input type="checkbox" data-project-manual="${check.id}" ${entry.manual[check.id]?'checked':''} class="mt-1 h-4 w-4 shrink-0 accent-amber-300"><span class="text-sm leading-7"><span class="block text-xs font-bold text-violet-200">TESTE MANUAL · AUTOAVALIAÇÃO</span>${escapeHTML(check.label)}</span></label>`).join('')}</div><h4 class="mt-6 font-semibold">Mudança de requisito</h4>${readerParagraph(project.transfer)}<p class="mt-4 text-sm leading-7 text-slate-400">Depois de registrar sua primeira entrega, tente a mudança acima e explique o que precisou alterar. Repita os testes afetados.</p>`;
  } else {
    body = `<h3 class="font-display text-2xl font-semibold">Compare decisões, não só código</h3>${readerParagraph('Tente construir e depurar antes de abrir a solução. Ela é uma implementação possível; soluções diferentes podem atender aos mesmos critérios.')}<details class="mt-5 rounded-xl border border-white/10 p-4"><summary class="font-semibold text-amber-200">Revelar solução completa comentada</summary>${readerCode(project.solution,'HTML completo — uma solução possível')}${project.explanation.map(readerParagraph).join('')}</details><h4 class="mt-6 font-semibold">Verifique sua autonomia</h4>${readerParagraph(project.transfer)}${readerParagraph('Em outro dia, refaça o projeto sem consultar esta implementação. Se travar, identifique qual conceito faltou e retorne à aula correspondente.')}`;
  }
  $('#dialog-body').innerHTML = `<article id="project-panel" role="tabpanel" aria-labelledby="project-tab-${section}" tabindex="0" class="reader-prose">${body}</article>`;
  $('#dialog-body').scrollTop = 0;
  projectFooter();
  if (focus) $(`#project-tab-${section}`).focus({preventScroll:true});
}

function submitProject() {
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='workflow')return submitWorkflowProject();
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='ai')return submitAiProject();
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='database')return submitDatabaseProject();
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='python')return submitPythonProject();
  if(dialogContext?.type==='project'&&projectById(dialogContext.id)?.kind==='javascript')return submitJsProject();
  if (dialogContext?.type !== 'project') return;
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  const results = structuralChecks(entry.source);
  const missing = project.checks.filter(check=>check.mode==='auto'?!results[check.id]:!entry.manual[check.id]);
  if (missing.length) {
    renderProjectSection('checks');
    $('#project-status').textContent = `Ainda há ${missing.length} critérios pendentes. Revise o código e realize os testes manuais antes de registrar.`;
    return;
  }
  if (!requireProjectExplanation(entry)) return;
  entry.delivered = true;
  saveState();
  renderModules();
  projectFooter();
  $('#project-status').textContent = 'Entrega registrada. Estrutura conferida e testes autoavaliados; as conclusões das aulas permanecem independentes.';
}

const jsReports = new Map();
function jsReport(project, entry) {
  const report = jsReports.get(project.id);
  return report?.source === entry.source ? report : null;
}
function isolatedJsTests(source, checks) {
  return new Promise(resolve => {
    const frame = document.createElement('iframe');
    frame.hidden = true; frame.setAttribute('sandbox','allow-scripts');
    const token = crypto.randomUUID();
    let timer;
    function finish(result) { clearTimeout(timer); window.removeEventListener('message',receive); frame.remove(); resolve(result); }
    function receive(event) {
      if (event.source !== frame.contentWindow || event.data?.token !== token) return;
      if (event.data.ready) frame.contentWindow.postMessage({token,source,checks},'*');
      else finish(event.data);
    }
    window.addEventListener('message',receive);
    const bridge = `onmessage=e=>{if(e.source!==parent)return;const {token,source,checks}=e.data;let worker;let timer;const end=result=>{clearTimeout(timer);if(worker)worker.terminate();parent.postMessage({...result,token},'*')};try{const tests=checks.map(c=>'try { results.push({id:'+JSON.stringify(c.id)+',pass:await(async()=>{'+c.body+'})()===true}); } catch(e) { results.push({id:'+JSON.stringify(c.id)+',pass:false,error:String(e.message).slice(0,180)}); }').join('\\n');const program='"use strict"; (async()=>{\\n'+source+'\\n;const results=[];\\n'+tests+'\\n;postMessage({results});})().catch(e=>postMessage({error:String(e.message)}));';const url=URL.createObjectURL(new Blob([program],{type:'text/javascript'}));worker=new Worker(url);URL.revokeObjectURL(url);worker.onmessage=e=>end(e.data);worker.onerror=e=>end({error:e.message||'Erro de sintaxe ou execução'});timer=setTimeout(()=>end({error:'Tempo limite: revise loops e Promises que não terminam.'}),2500)}catch(e){end({error:String(e.message)})}};parent.postMessage({ready:true,token:${JSON.stringify(token)}},'*');`;
    frame.srcdoc = '<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; worker-src blob:; connect-src \'none\'"><script>'+bridge+'<\/script>';
    timer = setTimeout(()=>finish({error:'Não foi possível executar os testes neste navegador.'}),5000);
    document.body.append(frame);
  });
}
async function runJsProjectChecks() {
  const project=projectById(dialogContext.id), entry=projectEntry(project.id), source=entry.source;
  const button=document.querySelector('[data-action="js-project-test"]');
  if(button) {button.disabled=true;button.textContent='Verificando…';}
  let report;
  if(project.format==='html') {
    const inertSource=source.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace(/<(\/?)(img|iframe|object|embed|link|audio|video|source)\b/gi,'<$1x-inert-$2');
    const doc=new DOMParser().parseFromString(inertSource,'text/html');
    const flags={'js-document': /<!doctype html>/i.test(source)&&!!doc.querySelector('title')&&!!doc.querySelector('html[lang]')&&!!doc.querySelector('meta[name="viewport"]')&&/<script\b[^>]*>[\s\S]+?<\/script\s*>/i.test(source),'js-controls':!!doc.querySelector('form#nova input#titulo')&&!!doc.querySelector('ul#lista')&&!!doc.querySelector('select#filtro')&&!!doc.querySelector('#resumo')&&!!doc.querySelector('label[for="titulo"]'),'js-status':!!doc.querySelector('[role="status"]')&&!!doc.querySelector('form#nova button[type="submit"]')};
    report={results:project.checks.filter(c=>c.mode==='auto').map(c=>({id:c.id,pass:!!flags[c.id]}))};
  } else report=await isolatedJsTests(source,project.checks.filter(c=>c.mode==='auto'));
  jsReports.set(project.id,{...report,source});
  if(dialogContext?.id===project.id) renderProjectSection('checks');
}
function renderJsProjectSection(section, focus) {
  activeProjectSection=section;
  const project=projectById(dialogContext.id),entry=projectEntry(project.id),report=jsReport(project,entry);
  $('#lesson-sections').innerHTML=PROJECT_SECTIONS.map(([key,title])=>`<button id="project-tab-${key}" role="tab" aria-controls="project-panel" aria-selected="${key===section}" tabindex="${key===section?0:-1}" data-project-section="${key}" class="reader-section shrink-0 rounded-lg border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400">${title}</button>`).join('');
  const testButton='<button data-action="js-project-test" class="my-5 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold">Executar verificações da entrega</button>';
  let body='';
  if(section==='brief') body=`<h3 class="text-2xl font-semibold">${escapeHTML(project.title)}</h3>${[project.goal,project.prerequisites,...project.brief,project.deliverable].map(readerParagraph).join('')}<h4 class="mt-6 font-semibold">Critérios obrigatórios</h4>${project.checks.map(c=>readerParagraph(c.label)).join('')}<details class="mt-5 rounded-xl border border-white/10 p-4"><summary>Orientações para começar</summary>${project.hints.map(readerParagraph).join('')}</details>`;
  if(section==='reference') {
    body='<h3 class="text-2xl font-semibold">Resultado esperado</h3>'+readerCode(project.exampleOutput,'Entradas e resultados esperados');
    if (project.testsCode) body+=readerParagraph('Salve os arquivos da missão na mesma pasta e execute os testes locais. A aba Entrega recebe só a função, sem module.exports.')+readerCode(project.testsCode,`${project.testFile || 'testes.cjs'} — testes públicos`)+readerCode(project.testCommand,'Execute no terminal da pasta do projeto');
    if(project.format==='html') body+=previewMarkup(project.solution,'Referência visual da lista')+readerParagraph('Esta referência mostra a aparência. Para testar cliques, filtros e persistência, salve a solução ou sua implementação como index.html e abra no navegador. A prévia interna não executa scripts.');
    else body+=readerParagraph('Os casos abaixo são públicos: use-os para entender o contrato antes de implementar. Os testes executam em um Worker isolado, sem acesso à página, armazenamento ou rede, com limite de tempo.');
    body+=project.checks.filter(c=>c.mode==='auto'&&c.body!=='html').map(c=>'<details class="mt-4 rounded-xl border border-white/10 p-4"><summary>'+escapeHTML(c.label)+'</summary>'+readerCode(c.body,'Corpo do teste: true significa aprovação')+'</details>').join('');
  }
  if(section==='build') body=`<h3 class="text-2xl font-semibold">Sua implementação</h3>${readerParagraph(project.deliverable)}<label for="project-source" class="my-4 block font-semibold">${project.format==='html'?'HTML completo':'JavaScript, sem tags script'} · até 80.000 caracteres</label><textarea id="project-source" maxlength="80000" spellcheck="false" rows="16" class="w-full rounded-xl border border-white/20 bg-[#0b101b] p-4 font-mono text-sm">${escapeHTML(entry.source)}</textarea>${readerParagraph('Aguarde a confirmação de salvamento na nuvem. Alterações invalidam os testes e a autoavaliação anteriores.')}${testButton}${project.format==='html'&&entry.source?previewMarkup(entry.source,'Sua interface'):''}`;
  if(section==='checks') body=`<h3 class="text-2xl font-semibold">Validação e autoavaliação</h3>${readerParagraph(project.rubric)}${readerParagraph(project.format==='html'?'A verificação automática procura estrutura HTML. Os comportamentos devem ser testados no arquivo aberto em seu navegador.':'Estes casos verificam o contrato publicado; não provam a correção de todo programa. Após recarregar a página, execute os testes novamente antes de registrar outra entrega.')}${testButton}${report?.error?readerParagraph('Execução interrompida: '+report.error):''}${project.checks.map(c=>c.mode==='manual'?`<label class="my-3 flex gap-3 rounded-xl border border-white/10 p-4"><input type="checkbox" data-project-manual="${c.id}" ${entry.manual[c.id]?'checked':''} class="mt-1 accent-violet-400"><span>${escapeHTML(c.label)}<small class="block text-violet-200">Teste manual · autoavaliação</small></span></label>`:`<div class="my-3 rounded-xl border border-white/10 p-4"><strong class="text-amber-200">${report?.results?.find(r=>r.id===c.id)?.pass===true?'✓ PASSOU':report?'○ REVISAR':'○ NÃO EXECUTADO'}</strong>${readerParagraph(c.label)}</div>`).join('')}<h4 class="mt-6 font-semibold">Novo requisito</h4>${readerParagraph(project.transfer)}`;
  if(section==='solution') body=`<h3 class="text-2xl font-semibold">Compare suas decisões</h3>${readerParagraph('Tente antes de consultar. Depois, refaça sem copiar e explique as decisões com suas palavras.')}<details class="my-5 rounded-xl border border-white/10 p-4"><summary>Revelar solução completa</summary>${readerCode(project.solution,project.format==='html'?'HTML completo':'JavaScript')}${project.explanation.map(readerParagraph).join('')}</details>${readerParagraph(project.transfer)}`;
  $('#dialog-body').innerHTML=`<article id="project-panel" role="tabpanel" aria-labelledby="project-tab-${section}" tabindex="0" class="reader-prose">${body}</article>`;
  $('#dialog-body').scrollTop=0;projectFooter();
  if(focus)$(`#project-tab-${section}`).focus({preventScroll:true});
}
function submitJsProject() {
  const project=projectById(dialogContext.id),entry=projectEntry(project.id),report=jsReport(project,entry);
  const passed=!!entry.source.trim()&&!report?.error&&project.checks.every(c=>c.mode==='manual'?entry.manual[c.id]:report?.results?.find(r=>r.id===c.id)?.pass===true);
  if(!passed){renderProjectSection('checks');$('#project-status').textContent='Execute as verificações e confira todos os critérios manuais antes de registrar.';return;}
  if (!requireProjectExplanation(entry)) return;
  entry.delivered=true;saveState();renderModules();projectFooter();$('#project-status').textContent='Entrega registrada: casos publicados conferidos e testes manuais autoavaliados.';
}

function renderPythonProjectSection(section, focus = false) {
  if (!PROJECT_SECTIONS.some(([key]) => key === section)) return;
  activeProjectSection = section;
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  $('#lesson-sections').innerHTML = PROJECT_SECTIONS.map(([key, title]) => `<button id="project-tab-${key}" role="tab" aria-controls="project-panel" aria-selected="${key === section}" tabindex="${key === section ? 0 : -1}" data-project-section="${key}" class="reader-section shrink-0 rounded-lg border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400">${title}</button>`).join('');
  let body = '';
  if (section === 'brief') {
    body = `<h3 class="text-2xl font-semibold">${escapeHTML(project.title)}</h3>${readerParagraph(project.goal)}<h4 class="mt-6 font-semibold text-violet-200">Antes de começar</h4>${readerParagraph(project.prerequisites)}<h4 class="mt-6 font-semibold text-violet-200">Contrato e entrega</h4>${project.brief.map(readerParagraph).join('')}${readerParagraph(project.deliverable)}<h4 class="mt-6 font-semibold text-violet-200">Critérios obrigatórios</h4><ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">${project.checks.map(check => `<li>${escapeHTML(check.label)}</li>`).join('')}</ul><details class="mt-6 rounded-xl border border-white/10 p-4"><summary class="font-semibold">Orientações para começar</summary>${project.hints.map(readerParagraph).join('')}</details>`;
  } else if (section === 'reference') {
    body = `<h3 class="text-2xl font-semibold">Resultado esperado e testes públicos</h3>${readerParagraph('Compare a saída e os erros antes de implementar. Salve os dois arquivos na mesma pasta e execute o comando no terminal; a página não executa Python.')}${readerCode(project.exampleOutput, 'Saída e comportamento esperados')}${readerCode(project.testsCode, 'Arquivo de testes — copie para a pasta do projeto')}${readerCode(project.testCommand, 'Comando para executar no terminal')}`;
  } else if (section === 'build') {
    body = `<h3 class="text-2xl font-semibold">Sua implementação</h3>${readerParagraph(project.deliverable)}<label for="project-source" class="mb-2 mt-5 block text-sm font-semibold">Conteúdo do arquivo .py · até 80.000 caracteres</label><textarea id="project-source" spellcheck="false" maxlength="80000" rows="17" class="w-full rounded-xl border border-white/20 bg-[#0b101b] p-4 font-mono text-sm leading-6" placeholder="Cole aqui sua implementação Python depois de testá-la no editor…">${escapeHTML(entry.source)}</textarea><p class="mt-2 text-xs leading-6 text-slate-400">Aguarde a confirmação de salvamento na nuvem. Para executar, salve um arquivo .py e rode o comando da aba Referência no seu terminal. Editar o rascunho reinicia as marcações de validação.</p>`;
  } else if (section === 'checks') {
    body = `<h3 class="text-2xl font-semibold">Validação local e autoavaliação</h3>${readerParagraph(project.rubric)}${readerCode(project.testCommand, 'Execute no terminal')}<p class="mt-4 rounded-xl border border-amber-300/20 p-4 text-sm leading-7 text-amber-100">Confira o resultado dos testes no terminal antes de marcar os itens. Estas caixas registram sua autoavaliação; o dashboard não recebe nem verifica o resultado do Python.</p><div class="mt-5 space-y-3">${project.checks.map(check => `<label class="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4"><input type="checkbox" data-project-manual="${escapeHTML(check.id)}" ${entry.manual[check.id] ? 'checked' : ''} class="mt-1 h-4 w-4 shrink-0 accent-amber-300"><span class="text-sm leading-7"><span class="block text-xs font-bold text-violet-200">TESTE LOCAL · AUTOAVALIAÇÃO</span>${escapeHTML(check.label)}</span></label>`).join('')}</div><h4 class="mt-6 font-semibold">Novo requisito</h4>${readerParagraph(project.transfer)}`;
  } else {
    body = `<h3 class="text-2xl font-semibold">Compare as decisões</h3>${readerParagraph('Tente resolver e depurar antes de abrir esta implementação. Outra solução pode atender ao mesmo contrato.')}<details class="mt-5 rounded-xl border border-white/10 p-4"><summary class="font-semibold text-amber-200">Revelar solução completa comentada</summary>${readerCode(project.solution, 'Python — uma solução possível')}${project.explanation.map(readerParagraph).join('')}</details><h4 class="mt-6 font-semibold">Verifique sua autonomia</h4>${readerParagraph(project.transfer)}${readerParagraph('Reimplemente a mudança sem consultar a solução e acrescente testes próprios.')}`;
  }
  $('#dialog-body').innerHTML = `<article id="project-panel" role="tabpanel" aria-labelledby="project-tab-${section}" tabindex="0" class="reader-prose">${body}</article>`;
  $('#dialog-body').scrollTop = 0;
  projectFooter();
  if (focus) $(`#project-tab-${section}`).focus({ preventScroll: true });
}

function submitPythonProject() {
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  if (!entry.source.trim() || project.checks.some(check => !entry.manual[check.id])) {
    renderProjectSection('checks');
    $('#project-status').textContent = 'Cole sua implementação e execute os testes locais antes de marcar todos os critérios.';
    return;
  }
  if (!requireProjectExplanation(entry)) return;
  entry.delivered = true;
  saveState();
  renderModules();
  projectFooter();
  $('#project-status').textContent = 'Entrega registrada como autoavaliação. O dashboard não executou nem verificou o código Python.';
}

function renderDatabaseProjectSection(section, focus = false) {
  if (!PROJECT_SECTIONS.some(([key]) => key === section)) return;
  activeProjectSection = section;
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  $('#lesson-sections').innerHTML = PROJECT_SECTIONS.map(([key, title]) => `<button id="project-tab-${key}" role="tab" aria-controls="project-panel" aria-selected="${key === section}" tabindex="${key === section ? 0 : -1}" data-project-section="${key}" class="reader-section shrink-0 rounded-lg border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400">${title}</button>`).join('');
  let body = '';
  if (section === 'brief') {
    body = `<h3 class="text-2xl font-semibold">${escapeHTML(project.title)}</h3>${readerParagraph(project.goal)}<h4 class="mt-6 font-semibold text-violet-200">Antes de começar</h4>${readerParagraph(project.prerequisites)}<h4 class="mt-6 font-semibold text-violet-200">Contrato e entrega</h4>${project.brief.map(readerParagraph).join('')}${readerParagraph(project.deliverable)}<h4 class="mt-6 font-semibold text-violet-200">Critérios obrigatórios</h4><ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">${project.checks.map(check => `<li>${escapeHTML(check.label)}</li>`).join('')}</ul><details class="mt-6 rounded-xl border border-white/10 p-4"><summary class="font-semibold">Orientações para começar</summary>${project.hints.map(readerParagraph).join('')}</details>`;
  } else if (section === 'reference') {
    body = `<h3 class="text-2xl font-semibold">Resultado esperado e testes públicos</h3>${readerParagraph('Ambiente: '+project.runtime+'. Compare resultados e erros antes de implementar. Salve os arquivos indicados na missão e execute os comandos no ambiente local; esta página não executa bancos nem containers.')}${readerCode(project.exampleOutput, 'Saída e comportamento esperados')}${readerCode(project.testsCode, project.id==='project-db-docker' ? 'Roteiro de validação — execute uma linha por vez no terminal' : 'Arquivo de testes — copie para a pasta do projeto')}${readerCode(project.testCommand, 'Comando para executar no terminal')}`;
  } else if (section === 'build') {
    body = `<h3 class="text-2xl font-semibold">Sua implementação</h3>${readerParagraph(project.deliverable)}<label for="project-source" class="mb-2 mt-5 block text-sm font-semibold">${escapeHTML(project.sourceLabel)} · até 80.000 caracteres</label><textarea id="project-source" spellcheck="false" maxlength="80000" rows="17" class="w-full rounded-xl border border-white/20 bg-[#0b101b] p-4 font-mono text-sm leading-6" placeholder="Cole sua implementação depois de executar o roteiro no ambiente indicado…">${escapeHTML(entry.source)}</textarea><p class="mt-2 text-xs leading-6 text-slate-400">Aguarde a confirmação de salvamento na nuvem. Para executar, salve os arquivos indicados na missão e siga a aba Referência no ambiente local. Editar o rascunho reinicia as marcações de validação.</p>`;
  } else if (section === 'checks') {
    body = `<h3 class="text-2xl font-semibold">Validação local e autoavaliação</h3>${readerParagraph(project.rubric)}${readerCode(project.testCommand, 'Execute no terminal')}<p class="mt-4 rounded-xl border border-amber-300/20 p-4 text-sm leading-7 text-amber-100">Confira o resultado dos testes no terminal antes de marcar os itens. Estas caixas registram sua autoavaliação; o dashboard não recebe nem verifica os resultados dos bancos ou containers.</p><div class="mt-5 space-y-3">${project.checks.map(check => `<label class="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4"><input type="checkbox" data-project-manual="${escapeHTML(check.id)}" ${entry.manual[check.id] ? 'checked' : ''} class="mt-1 h-4 w-4 shrink-0 accent-amber-300"><span class="text-sm leading-7"><span class="block text-xs font-bold text-violet-200">TESTE LOCAL · AUTOAVALIAÇÃO</span>${escapeHTML(check.label)}</span></label>`).join('')}</div><h4 class="mt-6 font-semibold">Novo requisito</h4>${readerParagraph(project.transfer)}`;
  } else {
    body = `<h3 class="text-2xl font-semibold">Compare as decisões</h3>${readerParagraph('Tente resolver e depurar antes de abrir esta implementação. Outra solução pode atender ao mesmo contrato.')}<details class="mt-5 rounded-xl border border-white/10 p-4"><summary class="font-semibold text-amber-200">Revelar solução completa comentada</summary>${readerCode(project.solution, project.sourceLabel+' — uma solução possível')}${project.explanation.map(readerParagraph).join('')}</details><h4 class="mt-6 font-semibold">Verifique sua autonomia</h4>${readerParagraph(project.transfer)}${readerParagraph('Reimplemente a mudança sem consultar a solução e acrescente testes próprios.')}`;
  }
  $('#dialog-body').innerHTML = `<article id="project-panel" role="tabpanel" aria-labelledby="project-tab-${section}" tabindex="0" class="reader-prose">${body}</article>`;
  $('#dialog-body').scrollTop = 0;
  projectFooter();
  if (focus) $(`#project-tab-${section}`).focus({ preventScroll: true });
}

function submitDatabaseProject() {
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  if (!entry.source.trim() || project.checks.some(check => !entry.manual[check.id])) {
    renderProjectSection('checks');
    $('#project-status').textContent = 'Cole sua implementação e execute os testes locais antes de marcar todos os critérios.';
    return;
  }
  if (!requireProjectExplanation(entry)) return;
  entry.delivered = true;
  saveState();
  renderModules();
  projectFooter();
  $('#project-status').textContent = 'Entrega registrada como autoavaliação. O dashboard não executou bancos nem containers; os resultados externos foram autoavaliados.';
}

function renderAiProjectSection(section, focus = false) {
  if (!PROJECT_SECTIONS.some(([key]) => key === section)) return;
  activeProjectSection = section;
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  $('#lesson-sections').innerHTML = PROJECT_SECTIONS.map(([key, title]) => `<button id="project-tab-${key}" role="tab" aria-controls="project-panel" aria-selected="${key === section}" tabindex="${key === section ? 0 : -1}" data-project-section="${key}" class="reader-section shrink-0 rounded-lg border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400">${title}</button>`).join('');
  let body = '';
  if (section === 'brief') {
    body = `<h3 class="text-2xl font-semibold">${escapeHTML(project.title)}</h3>${readerParagraph(project.goal)}<h4 class="mt-6 font-semibold text-violet-200">Antes de começar</h4>${readerParagraph(project.prerequisites)}<h4 class="mt-6 font-semibold text-violet-200">Contrato e entrega</h4>${project.brief.map(readerParagraph).join('')}${readerParagraph(project.deliverable)}<h4 class="mt-6 font-semibold text-violet-200">Critérios obrigatórios</h4><ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">${project.checks.map(check => `<li>${escapeHTML(check.label)}</li>`).join('')}</ul><details class="mt-6 rounded-xl border border-white/10 p-4"><summary class="font-semibold">Orientações para começar</summary>${project.hints.map(readerParagraph).join('')}</details>`;
  } else if (section === 'reference') {
    body = `<h3 class="text-2xl font-semibold">Resultado esperado e testes públicos</h3>${readerParagraph('Ambiente: '+project.runtime+'. Salve os dois arquivos indicados na missão e execute os testes no terminal. As entradas simuladas permitem verificar o software; não representam uma medição de qualidade de um modelo real.')}${readerCode(project.exampleOutput, 'Saída e comportamento esperados')}${readerCode(project.testsCode, 'Arquivo de testes — copie para a pasta do projeto')}${readerCode(project.testCommand, 'Comando para executar no terminal')}`;
  } else if (section === 'build') {
    body = `<h3 class="text-2xl font-semibold">Sua implementação</h3>${readerParagraph(project.deliverable)}<label for="project-source" class="mb-2 mt-5 block text-sm font-semibold">${escapeHTML(project.sourceLabel)} · até 80.000 caracteres</label><textarea id="project-source" spellcheck="false" maxlength="80000" rows="17" class="w-full rounded-xl border border-white/20 bg-[#0b101b] p-4 font-mono text-sm leading-6" placeholder="Cole aqui sua implementação Python depois de testá-la no editor…">${escapeHTML(entry.source)}</textarea><p class="mt-2 text-xs leading-6 text-slate-400">Aguarde a confirmação de salvamento na nuvem. Para executar, salve um arquivo .py e rode o comando da aba Referência no seu terminal. Editar o rascunho reinicia as marcações de validação.</p>`;
  } else if (section === 'checks') {
    body = `<h3 class="text-2xl font-semibold">Validação local e autoavaliação</h3>${readerParagraph(project.rubric)}${readerCode(project.testCommand, 'Execute no terminal')}<p class="mt-4 rounded-xl border border-amber-300/20 p-4 text-sm leading-7 text-amber-100">Confira o resultado dos testes no terminal antes de marcar os itens. Estas caixas registram sua autoavaliação; o dashboard não recebe os resultados externos nem avalia respostas de modelos reais.</p><div class="mt-5 space-y-3">${project.checks.map(check => `<label class="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4"><input type="checkbox" data-project-manual="${escapeHTML(check.id)}" ${entry.manual[check.id] ? 'checked' : ''} class="mt-1 h-4 w-4 shrink-0 accent-amber-300"><span class="text-sm leading-7"><span class="block text-xs font-bold text-violet-200">TESTE LOCAL · AUTOAVALIAÇÃO</span>${escapeHTML(check.label)}</span></label>`).join('')}</div><h4 class="mt-6 font-semibold">Novo requisito</h4>${readerParagraph(project.transfer)}`;
  } else {
    body = `<h3 class="text-2xl font-semibold">Compare as decisões</h3>${readerParagraph('Tente resolver e depurar antes de abrir esta implementação. Outra solução pode atender ao mesmo contrato.')}<details class="mt-5 rounded-xl border border-white/10 p-4"><summary class="font-semibold text-amber-200">Revelar solução completa comentada</summary>${readerCode(project.solution, project.sourceLabel+' — uma solução possível')}${project.explanation.map(readerParagraph).join('')}</details><h4 class="mt-6 font-semibold">Verifique sua autonomia</h4>${readerParagraph(project.transfer)}${readerParagraph('Reimplemente a mudança sem consultar a solução e acrescente testes próprios.')}`;
  }
  $('#dialog-body').innerHTML = `<article id="project-panel" role="tabpanel" aria-labelledby="project-tab-${section}" tabindex="0" class="reader-prose">${body}</article>`;
  $('#dialog-body').scrollTop = 0;
  projectFooter();
  if (focus) $(`#project-tab-${section}`).focus({ preventScroll: true });
}

function submitAiProject() {
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  if (!entry.source.trim() || project.checks.some(check => !entry.manual[check.id])) {
    renderProjectSection('checks');
    $('#project-status').textContent = 'Cole sua implementação e execute os testes locais antes de marcar todos os critérios.';
    return;
  }
  if (!requireProjectExplanation(entry)) return;
  entry.delivered = true;
  saveState();
  renderModules();
  projectFooter();
  $('#project-status').textContent = 'Entrega registrada como autoavaliação. O dashboard não executou Python nem modelos de IA; os testes locais foram autoavaliados.';
}

function renderWorkflowProjectSection(section, focus = false) {
  if (!PROJECT_SECTIONS.some(([key]) => key === section)) return;
  activeProjectSection = section;
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  $('#lesson-sections').innerHTML = PROJECT_SECTIONS.map(([key, title]) => `<button id="project-tab-${key}" role="tab" aria-controls="project-panel" aria-selected="${key === section}" tabindex="${key === section ? 0 : -1}" data-project-section="${key}" class="reader-section shrink-0 rounded-lg border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400">${title}</button>`).join('');
  let body = '';
  if (section === 'brief') {
    body = `<h3 class="text-2xl font-semibold">${escapeHTML(project.title)}</h3>${readerParagraph(project.goal)}<h4 class="mt-6 font-semibold text-violet-200">Antes de começar</h4>${readerParagraph(project.prerequisites)}<h4 class="mt-6 font-semibold text-violet-200">Missão e entrega</h4>${project.brief.map(readerParagraph).join('')}${readerParagraph(project.deliverable)}<h4 class="mt-6 font-semibold text-violet-200">Critérios obrigatórios</h4><ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">${project.checks.map(check => `<li>${escapeHTML(check.label)}</li>`).join('')}</ul><details class="mt-6 rounded-xl border border-white/10 p-4"><summary class="font-semibold">Orientações para começar</summary>${project.hints.map(readerParagraph).join('')}</details>`;
  } else if (section === 'reference') {
    body = `<h3 class="text-2xl font-semibold">Resultado esperado</h3>${readerParagraph('Compare estes artefatos e observações antes de implementar. Não copie hashes, caminhos ou resultados fictícios: inspecione os seus no terminal.')}${readerCode(project.exampleOutput, 'Exemplo de evidências esperadas')}${readerCode(project.testCommand, 'Comandos para executar no terminal da pasta do projeto')}`;
  } else if (section === 'build') {
    body = `<h3 class="text-2xl font-semibold">Sua entrega</h3>${readerParagraph(project.deliverable)}<label for="project-source" class="mb-2 mt-5 block text-sm font-semibold">Resumo dos artefatos e resultados · até 80.000 caracteres</label><textarea id="project-source" maxlength="80000" rows="17" class="w-full rounded-xl border border-white/20 bg-[#0b101b] p-4 font-mono text-sm leading-6" placeholder="Descreva a issue, o README, o PR e o histórico observado…">${escapeHTML(entry.source)}</textarea><p class="mt-2 text-xs leading-6 text-slate-400">Aguarde a confirmação de salvamento na nuvem. O repositório Git completo deve permanecer na sua pasta de laboratório. Alterar o resumo reinicia os critérios marcados.</p>`;
  } else if (section === 'checks') {
    body = `<h3 class="text-2xl font-semibold">Verificação local e autoavaliação</h3>${readerParagraph(project.rubric)}${readerCode(project.testCommand, 'Execute no terminal da pasta do projeto')}<p class="mt-4 rounded-xl border border-amber-300/20 p-4 text-sm leading-7 text-amber-100">Confira arquivos, histórico e comportamento antes de marcar os itens. O dashboard não executa Git nem verifica o repositório.</p><div class="mt-5 space-y-3">${project.checks.map(check => `<label class="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4"><input type="checkbox" data-project-manual="${escapeHTML(check.id)}" ${entry.manual[check.id] ? 'checked' : ''} class="mt-1 h-4 w-4 shrink-0 accent-amber-300"><span class="text-sm leading-7"><span class="block text-xs font-bold text-violet-200">VERIFICAÇÃO LOCAL · AUTOAVALIAÇÃO</span>${escapeHTML(check.label)}</span></label>`).join('')}</div><h4 class="mt-6 font-semibold">Novo requisito</h4>${readerParagraph(project.transfer)}`;
  } else {
    body = `<h3 class="text-2xl font-semibold">Compare suas decisões</h3>${readerParagraph('Consulte este roteiro somente depois de tentar a entrega. Ele não substitui o histórico real nem a revisão independente.')}${readerParagraph(project.solution)}<h4 class="mt-6 font-semibold">Verifique sua autonomia</h4>${readerParagraph(project.transfer)}`;
  }
  $('#dialog-body').innerHTML = `<article id="project-panel" role="tabpanel" aria-labelledby="project-tab-${section}" tabindex="0" class="reader-prose">${body}</article>`;
  $('#dialog-body').scrollTop = 0;
  projectFooter();
  if (focus) $(`#project-tab-${section}`).focus({ preventScroll: true });
}

function submitWorkflowProject() {
  const project = projectById(dialogContext.id), entry = projectEntry(project.id);
  if (!entry.source.trim() || project.checks.some(check => !entry.manual[check.id])) {
    renderProjectSection('checks');
    $('#project-status').textContent = 'Registre o resumo da entrega e confira todos os critérios locais antes de continuar.';
    return;
  }
  if (!requireProjectExplanation(entry)) return;
  entry.delivered = true;
  saveState();
  renderModules();
  projectFooter();
  $('#project-status').textContent = 'Entrega registrada como autoavaliação. O repositório e a revisão não foram verificados pelo dashboard.';
}

function htmlReferenceGuide() {
  return `<div class="mt-5 rounded-xl border border-sky-300/20 p-4"><h4 class="font-semibold text-sky-200">Como consultar sem se perder</h4><p class="mt-3 text-sm leading-7 text-slate-300">Uma <strong>tag</strong> é a marca escrita, como &lt;a&gt;; o <strong>elemento</strong> é a estrutura representada; um <strong>atributo</strong>, como href, configura esse elemento. No CSS, o seletor escolhe elementos e a propriedade define uma característica. Use os índices abaixo para encontrar cada categoria.</p><ol class="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300"><li>Procure o nome exato, como input, required, display ou :focus-visible.</li><li>Leia a finalidade, a sintaxe e os valores aceitos; atributos globais valem para vários elementos, os específicos dependem do elemento.</li><li>Adapte o menor exemplo e teste uma mudança por vez. Confira suporte e avisos de obsolescência antes de copiar.</li></ol><p class="mt-3 text-xs leading-6 text-slate-400">As referências são opcionais para aprofundamento. As aulas e os projetos contêm as explicações necessárias para suas atividades. Parte da documentação está em inglês.</p></div>`;
}


function openModule(id) {
  const entry = moduleIndex.get(id);
  if (!entry) return;
  const { track, module } = entry;
  dialogContext = { type: 'module', id };
  showDialog(module.title, `${track.title} / Módulo ${module.number} / ${module.level}`,
    `<p class="text-sm leading-relaxed text-slate-300">${module.description}</p><div class="mt-5 rounded-xl border border-white/8 bg-white/[.025] p-4"><h3 class="mb-2 text-xs font-semibold text-violet-200">Antes de começar</h3><p class="text-sm leading-relaxed text-slate-400">${track.prerequisite}</p><h3 class="mb-2 mt-4 text-xs font-semibold text-violet-200">Projeto da trilha</h3><p class="text-sm leading-relaxed text-slate-400">${track.project}</p></div><h3 class="mb-2 mt-6 text-sm font-semibold">Seu roteiro neste módulo</h3><div class="overflow-hidden rounded-xl border border-white/8">${module.lessons.map((lesson) => lessonRow(lesson, 'modal')).join('')}</div>${projectCard(module)}${resourceCards(module.resources)}`,
    `<div class="flex flex-wrap items-center justify-between gap-3"><span id="module-dialog-progress" class="text-xs text-slate-400">${stats(module.lessons).done} de ${module.lessons.length} lições concluídas</span><button data-lesson="${(module.lessons.find((lesson) => !state.completed[lesson.id]) || module.lessons[0]).id}" class="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-violet-400">Estudar módulo${icon('arrow')}</button></div>`);
}

function openLibrary() {
  dialogContext = { type: 'library' };
  const body = `<p class="text-sm leading-relaxed text-slate-400">Sua estante digital, com materiais disponibilizados pelos autores e instituições. As leituras são gratuitas; cursos, certificados e serviços adicionais de algumas plataformas podem ser pagos.</p>${tracks.map((track) => `<section class="mt-7 border-t border-white/8 pt-5"><h3 class="flex items-center gap-2 font-display text-lg font-semibold" style="color:${track.color}">${icon(track.icon, 'h-5 w-5')}${track.title}</h3>${resourceCards(track.modules.flatMap((module) => module.resources).filter((item) => item.kind !== 'video'))}</section>`).join('')}<p class="mt-6 text-xs leading-relaxed text-slate-500">Os vídeos específicos ficam nos módulos e nas lições. Traduções de projetos abertos podem estar incompletas. Preserve a autoria e as licenças dos materiais.</p>`;
  showDialog('Uma biblioteca de possibilidades', 'RECURSOS ABERTOS', body, '<p class="text-xs text-slate-500">Use as fontes para aprender, experimentar e voltar quando precisar.</p>');
}

function openHow() {
  dialogContext = { type: 'how' };
  const steps = [
    ['Escolha um caminho', 'Para desenvolvimento web júnior, avance de HTML e CSS e JavaScript para Git, dados, qualidade e entrega. Python e IA ampliam caminhos conforme a vaga.'],
    ['Entenda e experimente', 'Leia a aba Conceitos e prepare o ambiente indicado. Em Exemplo, acompanhe cada explicação, reproduza o código e siga as mudanças guiadas.'],
    ['Construa sem copiar', 'Na aba Prática, tente os exercícios antes de abrir as dicas e soluções. Entre na sua conta para salvar o rascunho automaticamente na nuvem; execute o código no ambiente indicado na aula.'],
    ['Revise e registre a conquista', 'Responda às perguntas em Revisão e leia o feedback. Marcar a aula como concluída registra acompanhamento, não domínio. Praticar, passar em revisão dias depois e resolver sozinho um problema novo com explicação são etapas distintas. Na visão geral, registre evidências práticas para a etapa júnior; as marcações atuais são autoavaliação.']
  ];
  showDialog('Aprender é construir, aos poucos.', 'SEU MÉTODO DE ESTUDO', `<ol class="space-y-5">${steps.map(([title, description], index) => `<li class="flex gap-4"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 font-display text-violet-300">${index + 1}</span><div><h3 class="text-sm font-semibold">${title}</h3><p class="mt-1.5 text-sm leading-relaxed text-slate-400">${description}</p></div></li>`).join('')}</ol><div class="mt-7 rounded-xl border border-white/8 bg-white/[.025] p-4"><h3 class="mb-2 text-sm font-medium">Sobre o seu progresso</h3><p class="text-xs leading-6 text-slate-400">Ao entrar, o progresso da sua conta é carregado e salvo automaticamente no Supabase. Aguarde a confirmação de salvamento antes de fechar a página. Sem login, alterações desta sessão não são persistidas. Os tempos são sugestões de estudo, não duração dos vídeos.</p></div>`, '<button data-action="close" class="rounded-xl bg-violet-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-violet-400">Entendi, vamos aprender</button>');
}

function setCompleted(id, completed) {
  if (!lessonIndex.has(id)) return;
  if (completed) state.completed[id] = true;
  else delete state.completed[id];
  saveState();
  render();
  // Atualize todas as representações, inclusive as que estão dentro do modal.
  document.querySelectorAll(`[data-complete="${id}"]`).forEach((input) => { input.checked = completed; });
  if (dialogContext?.type === 'lesson' && dialogContext.id === id) {
    $('#modal-completion-label').textContent = completed ? 'Lição concluída' : 'Marcar como concluída';
    if (activeLessonSection === 'review') {
      const draft = $('#evidence-explanation')?.value;
      renderLessonSection('review');
      if (draft !== undefined) $('#evidence-explanation').value = draft;
    }
  }
  if (dialogContext?.type === 'module') {
    const { module } = moduleIndex.get(dialogContext.id);
    $('#module-dialog-progress').textContent = `${stats(module.lessons).done} de ${module.lessons.length} lições concluídas`;
    const button = $('#dialog-footer [data-lesson]');
    if (button) button.dataset.lesson = (module.lessons.find((lesson) => !state.completed[lesson.id]) || module.lessons[0]).id;
  }
  const { track } = lessonIndex.get(id);
  notify(completed ? stats(lessonsOf(track)).percent === 100 ? `${track.title}: trilha concluída! Continue explorando.` : 'Mais um passo dado. Aguarde o salvamento na nuvem.' : 'Lição marcada para revisar. Aguarde o salvamento na nuvem.');
}

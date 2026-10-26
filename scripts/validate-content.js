'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const baselinePath = path.join(__dirname, 'content-baseline.json');
const errors = [];

function fail(message) {
  errors.push(message);
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, '/');
}

function duplicates(values) {
  const seen = new Set();
  const repeated = new Set();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated];
}

function assertUnique(label, values) {
  const repeated = duplicates(values);
  if (repeated.length) fail(`${label} duplicado(s): ${repeated.join(', ')}`);
}

function localAssetsFrom(html, tag, attribute) {
  const expression = new RegExp(`<${tag}\\b[^>]*\\b${attribute}="([^"]+)"`, 'gi');
  return [...html.matchAll(expression)]
    .map((match) => match[1])
    .filter((source) => !/^(?:https?:)?\/\//i.test(source))
    .map((source) => source.split(/[?#]/, 1)[0]);
}

const html = fs.readFileSync(indexPath, 'utf8');
const scriptSources = localAssetsFrom(html, 'script', 'src');
const stylesheetSources = localAssetsFrom(html, 'link', 'href').filter((source) => source.endsWith('.css'));

for (const source of [...scriptSources, ...stylesheetSources]) {
  const assetPath = path.join(root, source);
  if (!fs.existsSync(assetPath)) fail(`Asset referenciado e ausente: ${source}`);
}

const javascriptFiles = scriptSources.map((source) => path.join(root, source));
for (const filePath of javascriptFiles) {
  if (!fs.existsSync(filePath)) continue;
  const result = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  if (result.status !== 0) {
    fail(`Sintaxe inválida em ${relative(filePath)}: ${(result.stderr || result.stdout).trim()}`);
  }
}

// Scripts clássicos compartilham o escopo global; --check isolado não detecta const duplicada.
try {
  new vm.Script(javascriptFiles.filter(fs.existsSync).map((filePath) => fs.readFileSync(filePath, 'utf8')).join('\n;\n'), { filename: 'scripts do index.html' });
} catch (error) {
  fail(`Conflito entre scripts clássicos do index.html: ${error.message}`);
}

const dataSources = scriptSources.filter((source) => source.startsWith('assets/js/data/'));
const context = vm.createContext({ console, URL });
for (const source of dataSources) {
  const filePath = path.join(root, source);
  if (!fs.existsSync(filePath)) continue;
  try {
    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, { filename: source });
  } catch (error) {
    fail(`Falha ao carregar ${source}: ${error.message}`);
  }
}

let catalog;
try {
  catalog = vm.runInContext('({ R, tracks, LESSON_GUIDES, PROJECTS })', context);
} catch (error) {
  fail(`Catálogo não pôde ser lido: ${error.message}`);
  catalog = { R: {}, tracks: [], LESSON_GUIDES: {}, PROJECTS: [] };
}

const { R, tracks, LESSON_GUIDES, PROJECTS } = catalog;
const modules = tracks.flatMap((track) => track.modules || []);
const lessons = modules.flatMap((module) => module.lessons || []);
const guideIds = Object.keys(LESSON_GUIDES);
const trackIds = tracks.map((track) => track.id);
const moduleIds = modules.map((module) => module.id);
const lessonIds = lessons.map((lesson) => lesson.id);
const projectIds = PROJECTS.map((project) => project.id);

assertUnique('Id de trilha', trackIds);
assertUnique('Id de módulo', moduleIds);
assertUnique('Id de aula', lessonIds);
assertUnique('Id de projeto', projectIds);

for (const project of PROJECTS) {
  assertUnique(`Id de check no projeto ${project.id}`, (project.checks || []).map((check) => check.id));
  if (!moduleIds.includes(project.module)) {
    fail(`Projeto ${project.id} aponta para módulo inexistente: ${project.module}`);
  }
}

for (const lessonId of lessonIds) {
  if (!Object.hasOwn(LESSON_GUIDES, lessonId)) fail(`Aula sem guia: ${lessonId}`);
}
for (const guideId of guideIds) {
  if (!lessonIds.includes(guideId)) fail(`Guia sem aula correspondente: ${guideId}`);
}

for (const lesson of lessons) {
  const guide = LESSON_GUIDES[lesson.id];
  if (!guide) continue;
  if (!Array.isArray(lesson.objectives) || lesson.objectives.length === 0) {
    fail(`Aula sem objetivos observáveis: ${lesson.id}`);
  }
  for (const field of ['prerequisites', 'setup', 'why']) {
    if (!guide[field]?.trim()) fail(`Aula sem ${field}: ${lesson.id}`);
  }
  for (const field of ['sections', 'guided', 'mistakes', 'summary']) {
    if (!Array.isArray(guide[field]) || guide[field].length === 0) {
      fail(`Aula sem ${field}: ${lesson.id}`);
    }
  }
  if (!guide.example?.code?.trim() || !guide.example?.expected?.trim() || !Array.isArray(guide.example?.explanation) || guide.example.explanation.length === 0) {
    fail(`Aula sem exemplo completo: ${lesson.id}`);
  }
  if (!Array.isArray(guide.exercises) || guide.exercises.length === 0) {
    fail(`Aula sem exercícios: ${lesson.id}`);
  } else {
    guide.exercises.forEach((exercise, index) => {
      if (!exercise.prompt?.trim()) fail(`Exercício sem enunciado: ${lesson.id}:${index}`);
      if (!exercise.expected?.trim()) fail(`Exercício sem resultado esperado: ${lesson.id}:${index}`);
      if (!exercise.solution?.trim()) fail(`Exercício sem solução: ${lesson.id}:${index}`);
      if (exercise.criteria !== undefined && (!Array.isArray(exercise.criteria) || !exercise.criteria.length || exercise.criteria.some((item) => typeof item !== 'string' || !item.trim()))) {
        fail(`Critérios de aceite inválidos: ${lesson.id}:${index}`);
      }
      if (['prep-tools', 'prep-files', 'prep-workspace', 'prep-cycle', 'prep-errors', 'setup-editor', 'setup-python', 'setup-git', 'setup-node', 'setup-docker', 'setup-docker-alternative', 'setup-postgresql', 'setup-mariadb', 'setup-firebird', 'setup-mongodb', 'db-mariadb', 'db-firebird', 'db-mongo-crud', 'db-mongo-pipelines', 'db-nosql-models', 'db-performance'].includes(lesson.id) && !exercise.criteria?.length) fail(`Exercício sem critérios de aceite: ${lesson.id}:${index}`);
    });
  }
  if (!guide.retry) {
    fail(`Aula sem segunda tentativa: ${lesson.id}`);
  } else {
    for (const field of ['prompt', 'expected', 'hint']) {
      if (typeof guide.retry[field] !== 'string' || !guide.retry[field].trim()) fail(`Segunda tentativa sem ${field}: ${lesson.id}`);
    }
    if (guide.exercises?.some((exercise) => exercise.prompt === guide.retry.prompt)) fail(`Segunda tentativa repete exercício: ${lesson.id}`);
  }
  if (!Array.isArray(guide.quiz) || guide.quiz.length === 0) {
    fail(`Aula sem quiz: ${lesson.id}`);
  } else {
    guide.quiz.forEach((question, index) => {
      if (!question.question?.trim()) fail(`Questão sem enunciado: ${lesson.id}:${index}`);
      if (!Array.isArray(question.options) || question.options.length < 2) {
        fail(`Questão sem opções suficientes: ${lesson.id}:${index}`);
      }
      if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex >= question.options.length) {
        fail(`Questão com resposta inválida: ${lesson.id}:${index}`);
      }
    });
  }
}

const preparationIds = [
  'setup-editor',
  'setup-python',
  'setup-git',
  'setup-node',
  'setup-docker',
  'setup-docker-alternative',
  'setup-postgresql',
  'setup-mariadb',
  'setup-firebird',
  'setup-mongodb',
];
const setupMarkers = [
  'Objetivo:',
  'Requisitos:',
  'Windows:',
  'macOS:',
  'Linux:',
  'Verificação:',
  'Resultado esperado:',
  'Problema comum:',
  'Como parar e retomar:',
  'Alternativa leve:',
];
const exerciseKinds = ['Prever:', 'Alterar:', 'Construir:', 'Investigar erro:'];

const progressiveHtmlLessonIds = ['html-accessibility', 'html-tables', 'html-forms', 'html-links-media', 'html-semantic'];
for (const lessonId of progressiveHtmlLessonIds) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`Aula progressiva obrigatória ausente: ${lessonId}`);
    continue;
  }
  if (guide.sections.length > 4) fail(`Aula ${lessonId} ainda tem mais de quatro seções centrais.`);
  const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
  for (const kind of exerciseKinds) {
    if (!prompts.some((prompt) => prompt.startsWith(kind))) {
      fail(`Aula ${lessonId} sem exercício do tipo ${kind}`);
    }
  }
}

for (const lessonId of preparationIds) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`PreparaÃ§Ã£o obrigatÃ³ria ausente: ${lessonId}`);
    continue;
  }
  for (const marker of setupMarkers) {
    if (!guide.setup.includes(marker)) fail(`PreparaÃ§Ã£o ${lessonId} sem marcador de ambiente: ${marker}`);
  }
  const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
  for (const kind of exerciseKinds) {
    if (!prompts.some((prompt) => prompt.startsWith(kind))) {
      fail(`PreparaÃ§Ã£o ${lessonId} sem exercÃ­cio do tipo ${kind}`);
    }
  }
}

const progressiveJavaScriptLessonIds = ['js-functions', 'js-scope-pure', 'js-callbacks-closures', 'js-values', 'js-flow', 'js-arrays', 'js-es6', 'js-debug'];
for (const lessonId of progressiveJavaScriptLessonIds) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`Aula progressiva obrigatória ausente: ${lessonId}`);
    continue;
  }
  if (['js-values', 'js-flow', 'js-arrays', 'js-es6', 'js-debug'].includes(lessonId) && guide.sections.length > 4) {
    fail(`Aula ${lessonId} ainda tem mais de quatro seções centrais.`);
  }
  const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
  for (const kind of exerciseKinds) {
    if (!prompts.some((prompt) => prompt.startsWith(kind))) {
      fail(`Aula ${lessonId} sem exercício do tipo ${kind}`);
    }
  }

  const lesson = lessons.find((item) => item.id === lessonId);
  const exampleScript = lesson?.code?.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  if (!exampleScript) {
    fail(`Aula ${lessonId} sem script executável no exemplo principal.`);
    continue;
  }
  let visibleOutput = '';
  const exampleContext = vm.createContext({
    console: {
      log() {},
      assert(condition, message) {
        if (!condition) throw new Error(message || 'console.assert falhou');
      },
    },
    document: {
      getElementById() {
        return { set textContent(value) { visibleOutput = String(value); } };
      },
    },
  });
  try {
    vm.runInContext(exampleScript, exampleContext, { filename: `${lessonId}.html` });
    if (!visibleOutput.trim()) fail(`Aula ${lessonId} não produz saída visível no exemplo principal.`);
  } catch (error) {
    fail(`Exemplo principal de ${lessonId} falhou: ${error.message}`);
  }
}

const progressiveBrowserLessonIds = ['js-modules'];
for (const lessonId of progressiveBrowserLessonIds) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`Aula progressiva obrigatória ausente: ${lessonId}`);
    continue;
  }
  if (guide.sections.length > 4) fail(`Aula ${lessonId} ainda tem mais de quatro seções centrais.`);
  const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
  for (const kind of exerciseKinds) {
    if (!prompts.some((prompt) => prompt.startsWith(kind))) {
      fail(`Aula ${lessonId} sem exercício do tipo ${kind}`);
    }
  }
}

const reviewedDeliveryLessonIds = ['delivery-http', 'delivery-forms', 'delivery-security', 'delivery-environments', 'delivery-ci', 'delivery-requirements'];
for (const lessonId of reviewedDeliveryLessonIds) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`Aula revisada obrigatória ausente: ${lessonId}`);
    continue;
  }
  const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
  for (const kind of exerciseKinds) {
    if (!prompts.some((prompt) => prompt.startsWith(kind))) {
      fail(`Aula ${lessonId} sem exercício do tipo ${kind}`);
    }
  }
}

const reviewedAiLessonIds = ['ai-llms', 'ai-prompts', 'ai-system', 'ai-data', 'ai-embeddings', 'ai-rag', 'ai-skills', 'ai-workflows', 'ai-capstone'];
for (const lessonId of reviewedAiLessonIds) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`Aula revisada obrigatória ausente: ${lessonId}`);
    continue;
  }
  const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
  for (const kind of exerciseKinds) {
    if (!prompts.some((prompt) => prompt.startsWith(kind))) {
      fail(`Aula ${lessonId} sem exercício do tipo ${kind}`);
    }
  }
}

const aiLessonSpecificGuidance = {
  'ai-data': ['ai-data.py', 'sobreposição'],
  'ai-embeddings': ['ai-embeddings.py', 'Vetor nulo'],
  'ai-rag': ['ai-rag.py', 'carlos'],
  'ai-skills': ['skills_locais.py', 'Preço zero'],
  'ai-workflows': ['ai-workflows.py', 'confirmacao necessaria'],
  'ai-capstone': ['ai-capstone.py', 'sem_evidencia'],
};
for (const [lessonId, [filename, guidedTerm]] of Object.entries(aiLessonSpecificGuidance)) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`Aula obrigatória ausente: ${lessonId}`);
    continue;
  }
  if (!guide.setup.includes(filename)) fail(`Preparação de ${lessonId} deve citar ${filename}.`);
  if (!guide.guided?.[1]?.result?.includes(guidedTerm)) {
    fail(`Resultado guiado de ${lessonId} não corresponde ao exemplo da aula.`);
  }
}

const progressiveDatabaseLessonIds = ['db-modeling', 'db-normalization', 'db-ddl-constraints', 'db-ddl-crud', 'db-select', 'db-aggregation', 'db-joins', 'db-subqueries-ctes', 'db-transactions', 'db-concurrency-boundaries', 'db-docker-basics', 'db-docker-compose', 'db-docker-operations', 'db-mongo-crud', 'db-mongo-pipelines', 'db-performance', 'db-nosql-models', 'db-project', 'db-recovery', 'db-security'];
for (const lessonId of progressiveDatabaseLessonIds) {
  const guide = LESSON_GUIDES[lessonId];
  if (!guide) {
    fail(`Aula progressiva obrigatória ausente: ${lessonId}`);
    continue;
  }
  const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
  for (const kind of exerciseKinds) {
    if (!prompts.some((prompt) => prompt.startsWith(kind))) {
      fail(`Aula ${lessonId} sem exercício do tipo ${kind}`);
    }
  }
}

const environmentContracts = [
  ['PostgreSQL no host', LESSON_GUIDES['setup-postgresql'], ['127.0.0.1', '55432', 'estudos', 'aluno']],
  ['PostgreSQL no projeto relacional', PROJECTS.find((project) => project.id === 'project-db-relational'), ['127.0.0.1', '55432', 'laboratorio_estoque', 'aluno']],
  ['MariaDB local', LESSON_GUIDES['setup-mariadb'], ['127.0.0.1', '3306', 'hub_maria_aula', 'root']],
  ['Firebird local', LESSON_GUIDES['setup-firebird'], ['localhost', 'hub_fb_aula.fdb', 'SYSDBA']],
  ['MongoDB local', LESSON_GUIDES['setup-mongodb'], ['127.0.0.1', '27017', 'mongosh']],
  ['MongoDB no projeto', PROJECTS.find((project) => project.id === 'project-db-mongo'), ['127.0.0.1', '27017', 'th_catalogo_lab', 'mongosh']],
];

for (const [label, content, expectedValues] of environmentContracts) {
  if (!content) {
    fail(`Contrato de ambiente ausente: ${label}`);
    continue;
  }
  const serialized = JSON.stringify(content);
  for (const expected of expectedValues) {
    if (!serialized.includes(expected)) fail(`Contrato ${label} nÃ£o informa ${expected}`);
  }
}

for (const [key, resource] of Object.entries(R)) {
  if (!resource.title?.trim()) fail(`Recurso sem título: ${key}`);
  try {
    const url = new URL(resource.url);
    if (!['http:', 'https:'].includes(url.protocol)) fail(`Recurso com protocolo inválido: ${key}`);
  } catch {
    fail(`Recurso com URL inválida: ${key}`);
  }
}

const counts = {
  tracks: tracks.length,
  modules: modules.length,
  lessons: lessons.length,
  exercises: lessons.reduce((total, lesson) => total + (LESSON_GUIDES[lesson.id]?.exercises?.length || 0), 0),
  questions: lessons.reduce((total, lesson) => total + (LESSON_GUIDES[lesson.id]?.quiz?.length || 0), 0),
  projects: PROJECTS.length,
};

const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
for (const [key, expected] of Object.entries(baseline)) {
  if (counts[key] !== expected) {
    fail(`Contagem de ${key} mudou: esperado ${expected}, encontrado ${counts[key]}. Atualize a linha de base e a documentação se a mudança for intencional.`);
  }
}

const metaDescription = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1] || '';
if (!metaDescription.includes(`${counts.lessons} lições`)) {
  fail(`A meta description não informa a contagem atual de ${counts.lessons} lições.`);
}

console.log('Resumo do conteúdo:', counts);
console.log(`Scripts verificados: ${javascriptFiles.length}`);
console.log(`Recursos catalogados: ${Object.keys(R).length}`);

if (errors.length) {
  console.error(`\nValidação falhou com ${errors.length} erro(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('\nValidação concluída sem inconsistências.');
}

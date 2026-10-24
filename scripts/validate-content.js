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
    .filter((source) => !/^(?:https?:)?\/\//i.test(source));
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
  if (!Array.isArray(guide.exercises) || guide.exercises.length === 0) {
    fail(`Aula sem exercícios: ${lesson.id}`);
  } else {
    guide.exercises.forEach((exercise, index) => {
      if (!exercise.prompt?.trim()) fail(`Exercício sem enunciado: ${lesson.id}:${index}`);
      if (!exercise.solution?.trim()) fail(`Exercício sem solução: ${lesson.id}:${index}`);
    });
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

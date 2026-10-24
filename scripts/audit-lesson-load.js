'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sources = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)]
  .map((match) => match[1])
  .filter((source) => source.startsWith('assets/js/data/'));
const context = vm.createContext({ console, URL });

for (const source of sources) {
  vm.runInContext(fs.readFileSync(path.join(root, source), 'utf8'), context, { filename: source });
}

const { tracks, LESSON_GUIDES } = vm.runInContext('({ tracks, LESSON_GUIDES })', context);
const exerciseKinds = ['Prever:', 'Alterar:', 'Construir:', 'Investigar erro:'];
const candidates = [];

for (const track of tracks) {
  for (const module of track.modules) {
    for (const lesson of module.lessons) {
      const guide = LESSON_GUIDES[lesson.id];
      if (!guide) continue;
      const sections = guide.sections || [];
      const prompts = (guide.exercises || []).map((exercise) => exercise.prompt || '');
      const coveredKinds = exerciseKinds.filter((kind) => prompts.some((prompt) => prompt.startsWith(kind)));
      if (sections.length <= 4) continue;
      candidates.push({
        track: track.id,
        module: module.id,
        lesson: lesson.id,
        title: lesson.title,
        sections: sections.map((section) => section.title),
        guidedSteps: (guide.guided || []).length,
        exerciseKinds: coveredKinds.length,
      });
    }
  }
}

candidates.sort((a, b) => b.sections.length - a.sections.length || a.lesson.localeCompare(b.lesson));
console.log(JSON.stringify(candidates, null, 2));
console.error(`Candidatas com mais de quatro seções centrais: ${candidates.length}`);

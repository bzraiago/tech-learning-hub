'use strict';

const { test, expect } = require('@playwright/test');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const raizCurso = path.resolve(__dirname, '../../..');
const publicConfig = {
  clerkPublishableKey: `pk_test_${Buffer.from('fake.clerk.accounts.dev$').toString('base64')}`,
  supabaseUrl: 'https://fake.supabase.co',
  supabasePublishableKey: 'sb_publishable_mock_for_local_test'
};

let servidorCurso;
let urlCurso;

test.beforeAll(async () => {
  servidorCurso = http.createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
    if (pathname === '/api/public-config') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(publicConfig));
      return;
    }

    const caminho = path.resolve(raizCurso, `.${decodeURIComponent(pathname === '/' ? '/index.html' : pathname)}`);
    if (!caminho.startsWith(`${raizCurso}${path.sep}`)) {
      response.writeHead(403);
      response.end();
      return;
    }

    try {
      const conteudo = await fs.readFile(caminho);
      const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
      response.writeHead(200, { 'Content-Type': tipos[path.extname(caminho)] || 'application/octet-stream' });
      response.end(conteudo);
    } catch {
      response.writeHead(404);
      response.end('not found');
    }
  });
  await new Promise((resolve, reject) => {
    servidorCurso.once('error', reject);
    servidorCurso.listen(0, '127.0.0.1', resolve);
  });
  urlCurso = `http://127.0.0.1:${servidorCurso.address().port}/`;
});

test.afterAll(async () => {
  if (servidorCurso?.listening) await new Promise(resolve => servidorCurso.close(resolve));
});

test('sumário, portabilidade e retomada de leitura ficam isolados por conta', async ({ page }) => {
  const estadosRemotos = new Map();
  const gravacoes = [];
  const errosDeRuntime = [];
  page.on('pageerror', error => errosDeRuntime.push(error.message));
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { configurable: false, get() { throw new DOMException('Armazenamento bloqueado pelo teste.', 'SecurityError'); } });
  });

  await page.route('https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4**', route => route.abort());
  await page.route('https://fake.clerk.accounts.dev/**', async route => {
    const url = route.request().url();
    const conteudo = url.includes('/npm/@clerk/ui@1/')
      ? 'window.__internal_ClerkUICtor = function MockClerkUI() {};'
      : `(() => { const listeners = []; window.Clerk = { user: { id: 'user_test_1' }, session: { getToken: async () => 'mock-session-token' }, load: async () => {}, mountUserButton() {}, unmountUserButton() {}, openSignIn: async () => {}, openSignUp: async () => {}, signOut: async () => {}, addListener(fn) { listeners.push(fn); }, __switchUser(id) { this.user = { id }; for (const fn of listeners) fn({ user: this.user }); } }; })();`;
    await route.fulfill({ status: 200, contentType: 'text/javascript', body: conteudo });
  });
  await page.route('https://fake.supabase.co/rest/v1/learning_state**', async route => {
    const request = route.request();
    if (request.method() === 'GET') {
      const filtro = new URL(request.url()).searchParams.get('user_id') || '';
      const userId = filtro.replace(/^eq\./, '');
      const state = estadosRemotos.get(userId);
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(state ? [{ state }] : []) });
      return;
    }
    if (request.method() === 'POST') {
      const registro = request.postDataJSON();
      estadosRemotos.set(registro.user_id, registro.state);
      gravacoes.push(registro.user_id);
      await route.fulfill({ status: 201, contentType: 'application/json', body: '[]' });
      return;
    }
    await route.fulfill({ status: 204, body: '' });
  });

  await page.goto(urlCurso, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !document.body.hasAttribute('data-auth-locked'));
  expect(await page.evaluate(() => { try { void localStorage; return false; } catch { return true; } })).toBe(true);
  // A CI não depende do CDN Tailwind; este trecho fornece só o layout rolável do diálogo.
  await page.addStyleTag({ content: '#study-dialog>div{display:flex;flex-direction:column;max-height:calc(100dvh - 42px)}#dialog-body{flex:1;min-height:0;overflow-y:auto}#lesson-sections.hidden{display:none}' });

  const lessonId = 'delivery-api-abuse';
  await page.evaluate(id => openLesson(id), lessonId);
  const sumario = page.locator('.reader-toc a[data-reading-target]');
  await expect(sumario).toHaveCount(5);
  await page.getByRole('link', { name: 'Resumo da aula' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#lesson-summary h3')).toBeFocused();

  for (const setting of ['font-up', 'line', 'width']) {
    await page.locator(`[data-reading-setting="${setting}"]`).focus();
    await page.keyboard.press('Enter');
  }
  await expect(page.locator('[data-reading-setting="width"]')).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => state.readingPreferences)).toEqual({ fontScale: 110, lineHeight: 2, width: 'wide' });

  const dimensoesMobile = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  expect(dimensoesMobile.document).toBeLessThanOrEqual(dimensoesMobile.viewport);
  const rolagem = await page.locator('#dialog-body').evaluate(element => {
    const max = element.scrollHeight - element.clientHeight;
    element.scrollTop = Math.min(760, max);
    return { top: element.scrollTop, max };
  });
  expect(rolagem.max).toBeGreaterThan(0);
  expect(rolagem.top).toBeGreaterThan(0);
  await page.waitForTimeout(1200);
  const posicaoSalva = await page.evaluate(id => state.readingPositions[id], lessonId);
  expect(posicaoSalva).toEqual({ section: 'learn', top: 760 });

  await page.evaluate(() => closeDialog());
  await page.evaluate(id => openLesson(id), lessonId);
  await expect.poll(() => page.locator('#dialog-body').evaluate(element => element.scrollTop)).toBe(posicaoSalva.top);
  await page.waitForTimeout(900);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !document.body.hasAttribute('data-auth-locked'));
  await page.addStyleTag({ content: '#study-dialog>div{display:flex;flex-direction:column;max-height:calc(100dvh - 42px)}#dialog-body{flex:1;min-height:0;overflow-y:auto}#lesson-sections.hidden{display:none}' });
  await page.evaluate(id => openLesson(id), lessonId);
  expect(await page.evaluate(id => ({ position: state.readingPositions[id], preferences: state.readingPreferences }), lessonId)).toEqual({
    position: posicaoSalva,
    preferences: { fontScale: 110, lineHeight: 2, width: 'wide' }
  });

  await page.evaluate(() => closeDialog());
  await page.evaluate(id => {
    state.completed[id] = true;
    state.notes[`${id}:0`] = 'Rascunho fictício exportado no teste.';
    saveState();
  }, lessonId);
  await page.waitForFunction(() => cloudCanTransfer());
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#progress-export').click()
  ]);
  const exportStream = await download.createReadStream();
  const exportChunks = [];
  for await (const chunk of exportStream) exportChunks.push(chunk);
  const exportBuffer = Buffer.concat(exportChunks);
  const backup = JSON.parse(exportBuffer.toString('utf8'));
  expect(backup).toMatchObject({ format: 'tech-learning-hub-progress', schemaVersion: 1, state: { version: 1 } });
  expect(backup.state.completed[lessonId]).toBe(true);
  expect(backup.state.notes[`${lessonId}:0`]).toBe('Rascunho fictício exportado no teste.');

  await page.evaluate(id => {
    delete state.completed[id];
    delete state.notes[`${id}:0`];
    saveState();
  }, lessonId);
  await page.waitForFunction(() => cloudCanTransfer());
  await page.locator('#progress-import-file').setInputFiles({ name: 'inválido.json', mimeType: 'application/json', buffer: Buffer.from('{ inválido') });
  await expect(page.locator('#progress-transfer-status')).toContainText('Nenhum dado foi alterado');
  expect(await page.evaluate(id => state.completed[id], lessonId)).toBeUndefined();
  await page.locator('#progress-import-file').setInputFiles({
    name: 'versão-incompatível.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ ...backup, schemaVersion: 2 }))
  });
  await expect(page.locator('#progress-transfer-status')).toContainText('Versão de arquivo não compatível');
  expect(await page.evaluate(id => state.completed[id], lessonId)).toBeUndefined();

  let confirmation = page.waitForEvent('dialog');
  await page.locator('#progress-import-file').setInputFiles({ name: 'progresso.json', mimeType: 'application/json', buffer: exportBuffer });
  const importConfirmation = await confirmation;
  expect(importConfirmation.type()).toBe('confirm');
  expect(importConfirmation.message()).toContain('substituirá todo o progresso atual');
  await importConfirmation.dismiss();
  await expect(page.locator('#progress-transfer-status')).toHaveText('Importação cancelada. O progresso atual foi mantido.');
  expect(await page.evaluate(id => state.completed[id], lessonId)).toBeUndefined();
  expect(estadosRemotos.get('user_test_1').completed[lessonId]).toBeUndefined();

  confirmation = page.waitForEvent('dialog');
  const fileChooserEvent = page.waitForEvent('filechooser');
  await page.locator('#progress-import-trigger').click();
  const fileChooser = await fileChooserEvent;
  await fileChooser.setFiles({ name: 'progresso.json', mimeType: 'application/json', buffer: exportBuffer });
  const confirmedImport = await confirmation;
  await confirmedImport.accept();
  await expect(page.locator('#progress-transfer-status')).toContainText('Importação aplicada à sessão');
  await page.waitForFunction(() => cloudCanTransfer());
  expect(await page.evaluate(id => ({ completed: state.completed[id], note: state.notes[`${id}:0`] }), lessonId)).toEqual({ completed: true, note: 'Rascunho fictício exportado no teste.' });
  expect(estadosRemotos.get('user_test_1').completed[lessonId]).toBe(true);

  await page.evaluate(() => window.Clerk.__switchUser('user_test_2'));
  await page.waitForFunction(() => !document.body.hasAttribute('data-auth-locked'));
  expect(await page.evaluate(id => ({ user: window.Clerk.user.id, position: state.readingPositions[id], preferences: state.readingPreferences }), lessonId)).toEqual({
    user: 'user_test_2',
    position: undefined,
    preferences: { fontScale: 100, lineHeight: 1.8, width: 'standard' }
  });

  await page.evaluate(() => openLesson('ai-llms'));
  await expect(page.locator('.execution-mode')).toContainText('Simulação didática');
  await expect(page.locator('.execution-mode')).toContainText('não há inferência de LLM');
  await page.evaluate(() => openLesson('ai-mcp'));
  await expect(page.locator('.execution-mode')).toContainText('referência de SDK real não executada');
  await page.evaluate(() => openProject('project-ai-capstone'));
  await expect(page.locator('.execution-mode')).toContainText('Projeto com IA simulada');
  await expect(page.locator('.execution-mode')).toContainText('não chama API');

  await page.setViewportSize({ width: 1280, height: 900 });
  const dimensoesDesktop = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  expect(dimensoesDesktop.document).toBeLessThanOrEqual(dimensoesDesktop.viewport);
  expect(gravacoes).toContain('user_test_1');
  expect(errosDeRuntime).toEqual([]);
});

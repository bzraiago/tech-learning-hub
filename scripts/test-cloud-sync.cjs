'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'assets/js/cloud.js'), 'utf8');
const localExample = { version: 1, completed: { 'html-intro': true } };

async function harness({ owner = 'user_a', rowsByUser = {}, confirm = true } = {}) {
  const elements = new Map();
  const events = {};
  const calls = [];
  let downloads = 0;
  const storage = new Map();
  if (owner) {
    storage.set('tech-learning-hub:local-owner:v1', owner);
    storage.set(`tech-learning-hub:account:v1:${owner}`, JSON.stringify(localExample));
    storage.set('tech-learning-hub:v1', JSON.stringify(localExample));
  }
  const localStorage = {
    getItem(key) { return storage.get(key) || null; },
    setItem(key, value) { storage.set(key, value); },
    removeItem(key) { storage.delete(key); }
  };
  const element = (id) => {
    if (!elements.has(id)) elements.set(id, {
      hidden: true,
      disabled: false,
      textContent: '',
      handlers: {},
      addEventListener(name, handler) { this.handlers[name] = handler; }
    });
    return elements.get(id);
  };
  const window = {
    Clerk: { user: { id: 'user_a' }, session: { getToken: async () => 'test-jwt' } },
    confirm: () => confirm,
    addEventListener(name, handler) { events[name] = handler; }
  };
  const fetch = async (url, options = {}) => {
    calls.push({ url, options });
    if (url === '/api/public-config') return {
      ok: true,
      json: async () => ({
        supabaseUrl: 'https://example.supabase.co',
        supabasePublishableKey: 'sb_publishable_example'
      })
    };
    if (options.method === 'GET') {
      const userId = decodeURIComponent(url.split('user_id=eq.')[1]);
      return { ok: true, json: async () => rowsByUser[userId] || [] };
    }
    return { ok: true };
  };
  const context = vm.createContext({
    document: {
      querySelector: (selector) => element(selector),
      createElement: () => ({ click() { downloads += 1; } })
    },
    window, fetch, URL, Blob, setTimeout, localStorage,
    STORAGE_KEY: 'tech-learning-hub:v1',
    state: owner ? { version: 1, completed: {} } : localExample,
    sanitizeState: (candidate) => candidate || { version: 1, completed: {} },
    dialog: { open: false },
    saveState() {}, render() {}, closeDialog() {},
    console
  });
  vm.runInContext(source, context);
  await new Promise((resolve) => setImmediate(resolve));
  return { elements, calls, context, events, window, storage, getDownloads: () => downloads };
}

test('login lê a nuvem sem enviar dados automaticamente', async () => {
  const { elements, calls } = await harness();
  assert.equal(elements.get('#cloud-panel').hidden, false);
  assert.deepEqual(calls.map((call) => call.options.method || 'CONFIG'), ['CONFIG', 'GET']);
});

test('trocar de conta carrega automaticamente o progresso remoto da nova conta', async () => {
  const remoteB = { version: 1, completed: { 'js-intro': true } };
  const { context, events, window, calls } = await harness({
    rowsByUser: { user_b: [{ user_id: 'user_b', state: remoteB }] }
  });
  window.Clerk.user.id = 'user_b';
  events['tech-hub:auth-change']({ detail: { userId: 'user_b' } });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(vm.runInContext('state.completed["js-intro"]', context), true);
  assert.equal(vm.runInContext('state.completed["html-intro"]', context), undefined);
  assert.equal(calls.filter((call) => call.options.method === 'POST').length, 0);
});

test('conta sem cópia remota começa vazia e preserva cache da conta anterior', async () => {
  const { context, events, window, storage } = await harness();
  window.Clerk.user.id = 'user_b';
  events['tech-hub:auth-change']({ detail: { userId: 'user_b' } });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(vm.runInContext('Object.keys(state.completed).length', context), 0);
  assert.equal(JSON.parse(storage.get('tech-learning-hub:account:v1:user_a')).completed['html-intro'], true);
});

test('voltar à conta anterior recupera seu próprio cache após logout', async () => {
  const { context, events, window } = await harness();
  window.Clerk.user = null;
  events['tech-hub:auth-change']({ detail: { userId: null } });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(vm.runInContext('Object.keys(state.completed).length', context), 0);
  window.Clerk.user = { id: 'user_a' };
  events['tech-hub:auth-change']({ detail: { userId: 'user_a' } });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(vm.runInContext('state.completed["html-intro"]', context), true);
});

test('divergência mostra a nuvem e preserva a versão local para recuperação', async () => {
  const remoteB = { version: 1, completed: { remoto: true } };
  const localB = { version: 1, completed: { local: true } };
  const { context, events, window, storage, elements, getDownloads } = await harness({
    rowsByUser: { user_b: [{ user_id: 'user_b', state: remoteB }] }
  });
  storage.set('tech-learning-hub:account:v1:user_b', JSON.stringify(localB));
  window.Clerk.user.id = 'user_b';
  events['tech-hub:auth-change']({ detail: { userId: 'user_b' } });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(vm.runInContext('state.completed.remoto', context), true);
  assert.equal(vm.runInContext('state.completed.local', context), undefined);
  assert.equal(JSON.parse(storage.get('tech-learning-hub:backup:v1:user_b')).completed.local, true);
  assert.equal(elements.get('#cloud-recover').hidden, false);
  assert.equal(getDownloads(), 0);
  elements.get('#cloud-recover').handlers.click();
  assert.equal(vm.runInContext('state.completed.local', context), true);
});

test('carregamento manual guarda versão local sem baixar arquivo', async () => {
  const remote = { version: 1, completed: { remoto: true } };
  const { elements, context, getDownloads, storage } = await harness({
    rowsByUser: { user_a: [{ user_id: 'user_a', state: remote }] }
  });
  vm.runInContext('state = { version: 1, completed: { local: true } }', context);
  await elements.get('#cloud-download').handlers.click();
  assert.equal(vm.runInContext('state.completed.remoto', context), true);
  assert.equal(JSON.parse(storage.get('tech-learning-hub:backup:v1:user_a')).completed.local, true);
  assert.equal(getDownloads(), 0);
});

test('progresso legado vira cópia de visitante e só é importado por escolha explícita', async () => {
  const { context, elements, calls } = await harness({ owner: null });
  assert.equal(vm.runInContext('Object.keys(state.completed).length', context), 0);
  assert.equal(elements.get('#cloud-claim').hidden, false);
  await elements.get('#cloud-claim').handlers.click();
  assert.equal(vm.runInContext('state.completed["html-intro"]', context), true);
  assert.equal(calls.filter((call) => call.options.method === 'POST').length, 0);
});

test('envio preserva progresso remoto se confirmação for recusada', async () => {
  const remote = { version: 1, completed: { 'js-intro': true } };
  const { elements, calls } = await harness({
    rowsByUser: { user_a: [{ user_id: 'user_a', state: remote }] }, confirm: false
  });
  await elements.get('#cloud-upload').handlers.click();
  assert.equal(calls.filter((call) => call.options.method === 'PATCH').length, 0);
  assert.match(elements.get('#cloud-status').textContent, /preservado/);
});

test('envio usa token Clerk e chave publicável, vinculado ao usuário', async () => {
  const { elements, calls } = await harness();
  await elements.get('#cloud-upload').handlers.click();
  const write = calls.find((call) => call.options.method === 'POST');
  assert.ok(write);
  assert.equal(write.options.headers.Authorization, 'Bearer test-jwt');
  assert.equal(write.options.headers.apikey, 'sb_publishable_example');
  assert.equal(JSON.parse(write.options.body).user_id, 'user_a');
  assert.equal(JSON.parse(write.options.body).state.completed['html-intro'], true);
});

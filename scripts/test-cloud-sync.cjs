'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'assets/js/cloud.js'), 'utf8');

async function harness({ rows = [], confirm = true, owner = 'user_a' } = {}) {
  const elements = new Map();
  const events = {};
  const calls = [];
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
  const localStorage = {
    getItem: () => owner,
    setItem(_key, value) { owner = value; },
    removeItem() { owner = null; }
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
    if (options.method === 'GET') return { ok: true, json: async () => rows };
    return { ok: true };
  };
  const context = vm.createContext({
    document: {
      querySelector: (selector) => element(selector),
      createElement: () => ({ click() {} })
    },
    window, fetch, URL, Blob, setTimeout, localStorage,
    state: { version: 1, completed: { 'html-intro': true } },
    sanitizeState: (candidate) => candidate || { version: 1, completed: {} },
    dialog: { open: false },
    saveState() {}, render() {}, closeDialog() {},
    console
  });
  vm.runInContext(source, context);
  await new Promise((resolve) => setImmediate(resolve));
  events['tech-hub:auth-change']({ detail: { userId: 'user_a' } });
  return { elements, calls, context, events, window };
}

test('entrar na conta não envia nem substitui progresso automaticamente', async () => {
  const { elements, calls } = await harness();
  assert.equal(elements.get('#cloud-panel').hidden, false);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, '/api/public-config');
});

test('trocar de conta bloqueia envio do progresso local de outra pessoa', async () => {
  const { elements, calls, events, window } = await harness();
  window.Clerk.user.id = 'user_b';
  events['tech-hub:auth-change']({ detail: { userId: 'user_b' } });
  assert.equal(elements.get('#cloud-upload').disabled, true);
  await elements.get('#cloud-upload').handlers.click();
  assert.equal(calls.length, 1);
  assert.match(elements.get('#cloud-status').textContent, /Vincule/);
});

test('progresso antigo exige associação explícita antes do primeiro envio', async () => {
  const { elements, calls } = await harness({ owner: null });
  assert.equal(elements.get('#cloud-upload').disabled, true);
  assert.equal(elements.get('#cloud-claim').hidden, false);
  await elements.get('#cloud-claim').handlers.click();
  assert.equal(elements.get('#cloud-upload').disabled, false);
  assert.equal(calls.length, 1);
});

test('nova jornada em outra conta limpa a cópia exibida antes de habilitar envio', async () => {
  const { elements, events, window, context, calls } = await harness();
  window.Clerk.user.id = 'user_b';
  events['tech-hub:auth-change']({ detail: { userId: 'user_b' } });
  assert.equal(elements.get('#cloud-new').hidden, false);
  elements.get('#cloud-new').handlers.click();
  assert.equal(vm.runInContext('Object.keys(state.completed).length', context), 0);
  assert.equal(elements.get('#cloud-upload').disabled, false);
  assert.equal(calls.length, 1);
});

test('envio preserva progresso remoto se confirmação for recusada', async () => {
  const { elements, calls } = await harness({ rows: [{ user_id: 'user_a', state: {} }], confirm: false });
  await elements.get('#cloud-upload').handlers.click();
  assert.deepEqual(calls.map((call) => call.options.method || 'CONFIG'), ['CONFIG', 'GET']);
  assert.match(elements.get('#cloud-status').textContent, /preservado/);
});

test('primeiro envio usa token Clerk e chave publicável, vinculado ao usuário', async () => {
  const { elements, calls } = await harness();
  await elements.get('#cloud-upload').handlers.click();
  const write = calls.find((call) => call.options.method === 'POST');
  assert.ok(write);
  assert.equal(write.options.headers.Authorization, 'Bearer test-jwt');
  assert.equal(write.options.headers.apikey, 'sb_publishable_example');
  assert.equal(JSON.parse(write.options.body).user_id, 'user_a');
  assert.equal(JSON.parse(write.options.body).state.completed['html-intro'], true);
});

test('carregamento só substitui o estado local após confirmação', async () => {
  const remote = { version: 1, completed: { 'js-intro': true } };
  const cancelled = await harness({ rows: [{ user_id: 'user_a', state: remote }], confirm: false });
  await cancelled.elements.get('#cloud-download').handlers.click();
  assert.equal(vm.runInContext('state.completed["html-intro"]', cancelled.context), true);
  assert.equal(cancelled.calls.length, 2);

  const accepted = await harness({ rows: [{ user_id: 'user_a', state: remote }], confirm: true });
  await accepted.elements.get('#cloud-download').handlers.click();
  assert.equal(vm.runInContext('state.completed["js-intro"]', accepted.context), true);
  assert.equal(accepted.calls.length, 2);
});

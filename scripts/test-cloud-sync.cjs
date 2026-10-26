'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'assets/js/cloud.js'), 'utf8');
const tick = () => new Promise((resolve) => setImmediate(resolve));

async function harness(rowsByUser = {}, { failPost = false, failGet = false } = {}) {
  const elements = new Map();
  const events = {};
  const calls = [];
  const timers = new Map();
  let timerId = 0;
  const element = (selector) => {
    if (!elements.has(selector)) elements.set(selector, {
      hidden: true, inert: false, textContent: '', attributes: {},
      setAttribute(name, value) { this.attributes[name] = value; }
    });
    return elements.get(selector);
  };
  const window = {
    Clerk: { user: null, session: { getToken: async () => 'test-jwt' } },
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
      return { ok: !failGet, status: failGet ? 503 : 200, json: async () => rowsByUser[userId] || [] };
    }
    return { ok: !failPost, status: failPost ? 503 : 200 };
  };
  const context = vm.createContext({
    document: { querySelector: element, body: { locked: true, toggleAttribute(name, value) { this.locked = value; } } },
    window, fetch, URL, encodeURIComponent,
    setTimeout(handler) { const id = ++timerId; timers.set(id, handler); return id; },
    clearTimeout(id) { timers.delete(id); },
    state: { version: 1, completed: {} },
    sanitizeState: (candidate) => candidate || { version: 1, completed: {} },
    dialog: { open: false }, startupNotice: '',
    render() {}, closeDialog() {}, notify() {},
    console
  });
  vm.runInContext(source, context);
  await tick();
  const fireTimer = async () => {
    const [id, handler] = timers.entries().next().value || [];
    if (id) { timers.delete(id); handler(); await tick(); await tick(); }
  };
  return { elements, events, calls, context, window, fireTimer };
}

test('carrega automaticamente a conta e salva mudanças sem localStorage', async () => {
  const app = await harness({ user_a: [{ state: { version: 1, completed: { 'html-intro': true } } }] });
  app.window.Clerk.user = { id: 'user_a' };
  app.events['tech-hub:auth-change']({ detail: { userId: 'user_a' } });
  await tick();
  await tick();
  assert.equal(app.context.state.completed['html-intro'], true);
  assert.equal(app.elements.get('main').inert, false);
  assert.equal(app.elements.get('#login-gate').hidden, true);
  app.context.state.completed['js-intro'] = true;
  app.events['tech-hub:state-change']();
  await app.fireTimer();
  const write = app.calls.find((call) => call.options.method === 'POST');
  assert.ok(write);
  assert.equal(write.url, 'https://example.supabase.co/rest/v1/learning_state?on_conflict=user_id');
  assert.equal(JSON.parse(write.options.body).user_id, 'user_a');
  assert.equal(JSON.parse(write.options.body).state.completed['js-intro'], true);
  assert.match(app.elements.get('#cloud-status').textContent, /salvo na nuvem/i);
});

test('troca de conta limpa a tela e carrega apenas o estado remoto da nova conta', async () => {
  const app = await harness({
    user_a: [{ state: { version: 1, completed: { 'html-intro': true } } }],
    user_b: [{ state: { version: 1, completed: { 'python-intro': true } } }]
  });
  app.window.Clerk.user = { id: 'user_a' };
  app.events['tech-hub:auth-change']({ detail: { userId: 'user_a' } });
  await tick(); await tick();
  app.window.Clerk.user = { id: 'user_b' };
  app.events['tech-hub:auth-change']({ detail: { userId: 'user_b' } });
  await tick(); await tick();
  assert.equal(app.context.state.completed['html-intro'], undefined);
  assert.equal(app.context.state.completed['python-intro'], true);
  assert.equal(app.calls.filter((call) => call.options.method === 'POST').length, 0);
});

test('visitante e logout deixam o curso bloqueado', async () => {
  const app = await harness();
  app.events['tech-hub:auth-change']({ detail: { userId: null } });
  assert.equal(app.elements.get('main').inert, true);
  assert.equal(app.elements.get('#login-gate').hidden, false);
  app.window.Clerk.user = { id: 'user_a' };
  app.events['tech-hub:auth-change']({ detail: { userId: 'user_a' } });
  await tick(); await tick();
  app.window.Clerk.user = null;
  app.events['tech-hub:auth-change']({ detail: { userId: null } });
  assert.equal(app.elements.get('main').inert, true);
  assert.equal(app.elements.get('#login-gate').hidden, false);
  assert.equal(app.context.state.completed['html-intro'], undefined);
});

test('mantém alterações pendentes e avisa quando o envio falha', async () => {
  const app = await harness({}, { failPost: true });
  app.window.Clerk.user = { id: 'user_a' };
  app.events['tech-hub:auth-change']({ detail: { userId: 'user_a' } });
  await tick(); await tick();
  app.context.state.completed['html-intro'] = true;
  app.events['tech-hub:state-change']();
  app.events.beforeunload({ preventDefault() {}, returnValue: null });
  await app.fireTimer();
  assert.equal(app.calls.filter((call) => call.options.method === 'POST').length, 1);
  assert.match(app.elements.get('#cloud-status').textContent, /Não foi possível salvar/);
  assert.equal(app.elements.get('main').inert, false);
});

test('falha de leitura bloqueia edição para não sobrescrever dados remotos', async () => {
  const app = await harness({}, { failGet: true });
  app.window.Clerk.user = { id: 'user_a' };
  app.events['tech-hub:auth-change']({ detail: { userId: 'user_a' } });
  await tick(); await tick();
  assert.equal(app.elements.get('main').inert, true);
  assert.match(app.elements.get('#cloud-status').textContent, /Não foi possível carregar/);
  assert.equal(app.calls.filter((call) => call.options.method === 'POST').length, 0);
});

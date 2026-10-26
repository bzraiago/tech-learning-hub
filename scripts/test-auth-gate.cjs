'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'assets/js/auth.js'), 'utf8');
const cloudSource = fs.readFileSync(path.join(__dirname, '..', 'assets/js/cloud.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const tick = () => new Promise((resolve) => setImmediate(resolve));

test('auth e nuvem compartilham o escopo clássico sem redeclarar identificadores', () => {
  assert.doesNotThrow(() => new vm.Script(`${source}\n${cloudSource}`));
});

test('mostra carregamento inicialmente e login apenas após confirmar sessão de visitante', async () => {
  assert.match(html, /<body[^>]*data-auth-view="loading"/);
  const elements = new Map();
  const element = (selector) => {
    if (!elements.has(selector)) elements.set(selector, {
      hidden: true, disabled: true, textContent: '', handlers: {},
      addEventListener(type, handler) { this.handlers[type] = handler; }
    });
    return elements.get(selector);
  };
  let clerkListener;
  let signInCalls = 0;
  let signUpCalls = 0;
  const key = `pk_test_${Buffer.from('example.clerk.accounts.dev$').toString('base64')}`;
  const window = {
    Clerk: {
      user: null,
      load: async () => {},
      addListener(handler) { clerkListener = handler; },
      mountUserButton() {},
      unmountUserButton() {},
      openSignIn() { signInCalls += 1; },
      openSignUp() { signUpCalls += 1; }
    },
    __internal_ClerkUICtor: function ClerkUI() {},
    dispatchEvent() {}
  };
  const document = {
    body: { dataset: { authView: 'loading' } },
    querySelector: element,
    createElement: () => ({ dataset: {} }),
    head: { append(script) { queueMicrotask(() => script.onload()); } }
  };
  vm.runInNewContext(source, {
    window, document, console, atob, setTimeout, clearTimeout,
    fetch: async () => ({ ok: true, json: async () => ({ clerkPublishableKey: key }) }),
    CustomEvent: class CustomEvent { constructor(type, options) { this.type = type; this.detail = options.detail; } }
  });
  await tick(); await tick();
  assert.equal(document.body.dataset.authView, 'login');
  assert.equal(element('#gate-sign-in').disabled, false);
  assert.equal(element('#gate-sign-up').disabled, false);
  element('#gate-sign-in').handlers.click();
  element('#gate-sign-up').handlers.click();
  assert.equal(signInCalls, 1);
  assert.equal(signUpCalls, 1);
  window.Clerk.user = { id: 'user_a' };
  clerkListener({ user: window.Clerk.user });
  assert.equal(document.body.dataset.authView, 'loading');
  window.Clerk.user = null;
  clerkListener({ user: null });
  assert.equal(document.body.dataset.authView, 'login');
});

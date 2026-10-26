'use strict';

// Clerk identifica a conta cujo progresso é carregado e salvo no Supabase.
const authStatus = document.querySelector('#auth-status');
const signInButton = document.querySelector('#sign-in');
const signUpButton = document.querySelector('#sign-up');
const signOutButton = document.querySelector('#sign-out');
const gateSignInButton = document.querySelector('#gate-sign-in');
const gateSignUpButton = document.querySelector('#gate-sign-up');
const gateStatus = document.querySelector('#login-gate-status');
const gateLoadingStatus = document.querySelector('#gate-loading-status');
const gateRetryButton = document.querySelector('#gate-retry');
const userButton = document.querySelector('#clerk-user-button');
let userButtonMounted = false;

function setAuthStatus(message) {
  authStatus.textContent = message;
}

function authTimeout(promise, milliseconds, message) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), milliseconds); })
  ]).finally(() => clearTimeout(timer));
}

function loadClerkScript(url, publishableKey) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timer = setTimeout(() => reject(new Error('O carregamento do Clerk demorou demais.')), 12000);
    script.src = url;
    script.async = true;
    script.crossOrigin = 'anonymous';
    if (publishableKey) script.dataset.clerkPublishableKey = publishableKey;
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = () => { clearTimeout(timer); reject(new Error('Não foi possível carregar o Clerk.')); };
    document.head.append(script);
  });
}

function renderAuth(user) {
  const signedIn = Boolean(user);
  document.body.dataset.authView = signedIn ? 'loading' : 'login';
  signInButton.hidden = signedIn;
  signUpButton.hidden = signedIn;
  signOutButton.hidden = !signedIn;
  userButton.hidden = !signedIn;
  gateSignInButton.hidden = signedIn;
  gateSignUpButton.hidden = signedIn;
  if (signedIn && !userButtonMounted) {
    window.Clerk.mountUserButton(userButton);
    userButtonMounted = true;
  } else if (!signedIn && userButtonMounted) {
    window.Clerk.unmountUserButton(userButton);
    userButtonMounted = false;
  }
  setAuthStatus(signedIn ? 'Conta conectada' : 'Entre para salvar seu progresso');
  window.dispatchEvent(new CustomEvent('tech-hub:auth-change', { detail: { userId: user?.id || null } }));
}

async function initAuth() {
  try {
    gateLoadingStatus.textContent = 'Verificando sua sessão…';
    const configResponse = await authTimeout(fetch('/api/public-config', { cache: 'no-store' }), 12000, 'A configuração demorou demais para responder.');
    if (!configResponse.ok) throw new Error('Configuração de login indisponível.');
    const { clerkPublishableKey } = await configResponse.json();
    if (!/^pk_(test|live)_[A-Za-z0-9+/=]+$/.test(clerkPublishableKey || '')) {
      throw new Error('Configure CLERK_PUBLISHABLE_KEY na Vercel.');
    }

    const encodedDomain = clerkPublishableKey.split('_')[2];
    const domain = atob(encodedDomain).replace(/\$$/, '');
    if (!/^[a-z0-9.-]+$/i.test(domain) || !domain.includes('.') || domain.includes('..')) {
      throw new Error('Chave publicável do Clerk inválida.');
    }
    const origin = `https://${domain}`;
    gateLoadingStatus.textContent = 'Conectando ao login…';
    await loadClerkScript(`${origin}/npm/@clerk/ui@1/dist/ui.browser.js`);
    await loadClerkScript(`${origin}/npm/@clerk/clerk-js@6/dist/clerk.browser.js`, clerkPublishableKey);
    if (!window.Clerk || !window.__internal_ClerkUICtor) throw new Error('Clerk não iniciou.');

    gateLoadingStatus.textContent = 'Restaurando sua sessão…';
    await authTimeout(window.Clerk.load({ ui: { ClerkUI: window.__internal_ClerkUICtor } }), 15000, 'A sessão do Clerk demorou demais para iniciar.');
    const openSignIn = () => {
      Promise.resolve(window.Clerk.openSignIn()).catch(() => setAuthStatus('Não foi possível abrir o login.'));
    };
    const openSignUp = () => {
      Promise.resolve(window.Clerk.openSignUp()).catch(() => setAuthStatus('Não foi possível abrir o cadastro.'));
    };
    gateSignInButton.disabled = false;
    gateSignUpButton.disabled = false;
    signInButton.addEventListener('click', openSignIn);
    gateSignInButton.addEventListener('click', openSignIn);
    signUpButton.addEventListener('click', openSignUp);
    gateSignUpButton.addEventListener('click', openSignUp);
    signOutButton.addEventListener('click', async () => {
      signOutButton.disabled = true;
      try { await window.Clerk.signOut(); }
      catch { setAuthStatus('Não foi possível sair. Tente novamente.'); }
      finally { signOutButton.disabled = false; }
    });
    window.Clerk.addListener(({ user }) => renderAuth(user));
    renderAuth(window.Clerk.user);
  } catch (error) {
    console.warn('Login Clerk indisponível:', error);
    document.body.dataset.authView = 'loading';
    setAuthStatus('Login indisponível no momento');
    gateStatus.textContent = 'Login indisponível no momento.';
    gateLoadingStatus.textContent = `Não foi possível iniciar o login: ${error.message}`;
    gateRetryButton.hidden = false;
  }
}

gateRetryButton.addEventListener('click', () => window.location.reload());
initAuth();

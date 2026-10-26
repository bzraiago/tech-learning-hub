'use strict';

// Clerk identifica o usuário; a sincronização do progresso será adicionada depois.
const authStatus = document.querySelector('#auth-status');
const signInButton = document.querySelector('#sign-in');
const signUpButton = document.querySelector('#sign-up');
const signOutButton = document.querySelector('#sign-out');
const userButton = document.querySelector('#clerk-user-button');
let userButtonMounted = false;

function setAuthStatus(message) {
  authStatus.textContent = message;
}

function loadClerkScript(url, publishableKey) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.crossOrigin = 'anonymous';
    if (publishableKey) script.dataset.clerkPublishableKey = publishableKey;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Não foi possível carregar o Clerk.'));
    document.head.append(script);
  });
}

function renderAuth(user) {
  const signedIn = Boolean(user);
  signInButton.hidden = signedIn;
  signUpButton.hidden = signedIn;
  signOutButton.hidden = !signedIn;
  userButton.hidden = !signedIn;
  if (signedIn && !userButtonMounted) {
    window.Clerk.mountUserButton(userButton);
    userButtonMounted = true;
  } else if (!signedIn && userButtonMounted) {
    window.Clerk.unmountUserButton(userButton);
    userButtonMounted = false;
  }
  setAuthStatus(signedIn ? 'Conta conectada · progresso ainda salvo neste navegador' : 'Progresso salvo neste navegador');
  window.dispatchEvent(new CustomEvent('tech-hub:auth-change', { detail: { userId: user?.id || null } }));
}

async function initAuth() {
  try {
    const configResponse = await fetch('/api/public-config', { cache: 'no-store' });
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
    await loadClerkScript(`${origin}/npm/@clerk/ui@1/dist/ui.browser.js`);
    await loadClerkScript(`${origin}/npm/@clerk/clerk-js@6/dist/clerk.browser.js`, clerkPublishableKey);
    if (!window.Clerk || !window.__internal_ClerkUICtor) throw new Error('Clerk não iniciou.');

    await window.Clerk.load({ ui: { ClerkUI: window.__internal_ClerkUICtor } });
    signInButton.addEventListener('click', () => {
      Promise.resolve(window.Clerk.openSignIn()).catch(() => setAuthStatus('Não foi possível abrir o login.'));
    });
    signUpButton.addEventListener('click', () => {
      Promise.resolve(window.Clerk.openSignUp()).catch(() => setAuthStatus('Não foi possível abrir o cadastro.'));
    });
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
    setAuthStatus('Login indisponível no momento');
  }
}

initAuth();

'use strict';

// O Supabase é a única fonte persistente do progresso da conta Clerk ativa.
const cloudPanel = document.querySelector('#cloud-panel');
const cloudStatus = document.querySelector('#cloud-status');
const cloudSidebarStatus = document.querySelector('#storage-status');
const loginGate = document.querySelector('#login-gate');
const loginGateStatus = document.querySelector('#login-gate-status');
const cloudGateLoadingStatus = document.querySelector('#gate-loading-status');
let cloudConfig = null;
let cloudConfigError = null;
let cloudUserId = null;
let cloudReady = false;
let cloudGeneration = 0;
let cloudRevision = 0;
let cloudSavedRevision = 0;
let cloudWriting = false;
let cloudRetryTimer = null;

function cloudMessage(message) {
  cloudStatus.textContent = message;
  cloudSidebarStatus.textContent = message;
  loginGateStatus.textContent = message;
  cloudGateLoadingStatus.textContent = message;
}

function cloudLock(locked) {
  document.body.toggleAttribute('data-auth-locked', locked);
  loginGate.hidden = !locked;
  document.querySelector('main').inert = locked;
  document.querySelector('aside').inert = locked;
  document.querySelector('main').setAttribute('aria-busy', String(locked));
  document.querySelectorAll('#progress-export, #progress-import-trigger, #progress-import-file').forEach(control => { control.disabled = locked; });
}

function cloudCanTransfer() {
  return cloudReady && !cloudWriting && !cloudRetryTimer && cloudRevision === cloudSavedRevision;
}

async function cloudRequest(userId, method, query = '', body = null) {
  const session = window.Clerk?.session;
  if (!cloudConfig || !session || window.Clerk.user?.id !== userId || cloudUserId !== userId) {
    throw new Error('Sessão indisponível. Entre novamente.');
  }
  const token = await session.getToken();
  if (!token || window.Clerk.user?.id !== userId || cloudUserId !== userId) {
    throw new Error('A conta mudou. Entre novamente.');
  }
  const headers = {
    apikey: cloudConfig.key,
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  };
  if (body !== null) {
    headers['Content-Type'] = 'application/json';
    headers.Prefer = 'resolution=merge-duplicates,return=minimal';
  }
  const response = await fetch(`${cloudConfig.url}/rest/v1/learning_state${query}`, {
    method, headers, body: body === null ? undefined : JSON.stringify(body), cache: 'no-store'
  });
  if (!response.ok) throw new Error(`Supabase respondeu HTTP ${response.status}.`);
  return method === 'GET' ? response.json() : null;
}

async function cloudLoad(userId, generation) {
  if (!cloudConfig || !userId) return;
  cloudLock(true);
  cloudMessage('Carregando o progresso desta conta…');
  try {
    const rows = await cloudRequest(userId, 'GET', `?select=user_id,state&user_id=eq.${encodeURIComponent(userId)}`);
    if (generation !== cloudGeneration) return;
    if (!Array.isArray(rows)) throw new Error('Resposta inesperada do Supabase.');
    const candidate = rows[0]?.state;
    if (candidate && (candidate.version !== 1 || !candidate.completed || typeof candidate.completed !== 'object' || Array.isArray(candidate.completed))) {
      throw new Error('O progresso remoto tem formato desconhecido.');
    }
    state = sanitizeState(candidate || null);
    if (dialog.open) closeDialog(false);
    render();
    cloudReady = true;
    cloudLock(false);
    cloudMessage(candidate ? 'Progresso desta conta carregado da nuvem.' : 'Conta pronta. Seu progresso será salvo automaticamente.');
    if (startupNotice) notify(startupNotice);
  } catch (error) {
    if (generation !== cloudGeneration) return;
    cloudMessage(`Não foi possível carregar o progresso: ${error.message} Nova tentativa em instantes.`);
    clearTimeout(cloudRetryTimer);
    cloudRetryTimer = setTimeout(() => { cloudRetryTimer = null; void cloudLoad(userId, generation); }, 5000);
  }
}

function cloudSwitch(userId) {
  // Clerk pode emitir vários eventos para a mesma sessão enquanto a leitura está em andamento.
  if (userId === cloudUserId && (cloudReady || (userId && cloudConfig && !cloudConfigError))) return;
  const pending = cloudReady && cloudRevision !== cloudSavedRevision;
  const generation = ++cloudGeneration;
  clearTimeout(cloudRetryTimer);
  cloudRetryTimer = null;
  cloudUserId = userId;
  cloudReady = false;
  cloudRevision = 0;
  cloudSavedRevision = 0;
  startupNotice = '';
  state = sanitizeState(null);
  if (dialog.open) closeDialog(false);
  render();
  cloudPanel.hidden = false;
  if (pending) notify('A conta mudou antes de confirmar o salvamento. As alterações pendentes podem não ter sido enviadas.');
  if (!userId) {
    cloudLock(true);
    cloudMessage('Entre para carregar e salvar seu progresso na nuvem.');
  } else if (!cloudConfig) {
    cloudLock(true);
    cloudMessage(cloudConfigError ? `Nuvem indisponível: ${cloudConfigError} Nenhum progresso será salvo.` : 'Aguardando a configuração da nuvem…');
  } else {
    void cloudLoad(userId, generation);
  }
}

async function cloudFlush() {
  if (!cloudReady || cloudWriting || !cloudUserId || cloudRevision === cloudSavedRevision) return;
  const userId = cloudUserId;
  const generation = cloudGeneration;
  const revision = cloudRevision;
  const snapshot = sanitizeState(state);
  cloudWriting = true;
  cloudMessage('Salvando progresso na nuvem…');
  try {
    await cloudRequest(userId, 'POST', '?on_conflict=user_id', { user_id: userId, state: snapshot });
    if (generation !== cloudGeneration) return;
    cloudSavedRevision = revision;
    cloudMessage('Progresso salvo na nuvem.');
  } catch (error) {
    if (generation !== cloudGeneration) return;
    cloudMessage(`Não foi possível salvar: ${error.message} Tentaremos novamente.`);
    clearTimeout(cloudRetryTimer);
    cloudRetryTimer = setTimeout(() => { cloudRetryTimer = null; void cloudFlush(); }, 5000);
  } finally {
    cloudWriting = false;
    if (generation === cloudGeneration && cloudRevision !== cloudSavedRevision && !cloudRetryTimer) void cloudFlush();
  }
}

window.addEventListener('tech-hub:state-change', () => {
  if (!cloudReady) return;
  cloudRevision += 1;
  clearTimeout(cloudRetryTimer);
  cloudRetryTimer = setTimeout(() => {
    cloudRetryTimer = null;
    void cloudFlush();
  }, 350);
  cloudMessage('Alterações aguardando envio à nuvem…');
});

window.addEventListener('tech-hub:auth-change', (event) => cloudSwitch(event.detail.userId));
window.addEventListener('online', () => {
  if (cloudUserId && !cloudReady && cloudConfig) void cloudLoad(cloudUserId, cloudGeneration);
  else void cloudFlush();
});
window.addEventListener('beforeunload', (event) => {
  if (cloudReady && cloudRevision !== cloudSavedRevision) {
    event.preventDefault();
    event.returnValue = '';
  }
});

(async () => {
  try {
    const response = await fetch('/api/public-config', { cache: 'no-store' });
    if (!response.ok) throw new Error('Configuração indisponível.');
    const config = await response.json();
    const url = new URL(config.supabaseUrl);
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co') || url.port || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('URL Supabase inválida.');
    if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(config.supabasePublishableKey || '')) throw new Error('Chave publicável Supabase inválida.');
    cloudConfig = { url: url.origin, key: config.supabasePublishableKey };
    if (cloudUserId) void cloudLoad(cloudUserId, cloudGeneration);
  } catch (error) {
    cloudConfigError = error.message;
    cloudPanel.hidden = false;
    cloudMessage(`Nuvem indisponível: ${error.message} Nenhum progresso será salvo.`);
    cloudLock(true);
  }
})();

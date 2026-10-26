'use strict';

// A transferência é manual: entrar na conta não substitui nem envia dados.
const cloudPanel = document.querySelector('#cloud-panel');
const cloudStatus = document.querySelector('#cloud-status');
const cloudUpload = document.querySelector('#cloud-upload');
const cloudDownload = document.querySelector('#cloud-download');
const cloudClaim = document.querySelector('#cloud-claim');
const cloudNew = document.querySelector('#cloud-new');
const cloudRestore = document.querySelector('#cloud-restore');
const cloudBackupFile = document.querySelector('#cloud-backup-file');
const CLOUD_OWNER_KEY = 'tech-learning-hub:local-owner:v1';
let cloudConfig = null;
let cloudUserId = null;
let cloudBusy = false;
let localOwnerId = null;
try { localOwnerId = localStorage.getItem(CLOUD_OWNER_KEY) || null; }
catch { /* O app continua na sessão mesmo sem localStorage. */ }

function cloudMessage(message) { cloudStatus.textContent = message; }
function cloudControls() {
  const ready = Boolean(cloudConfig && cloudUserId);
  cloudUpload.disabled = cloudBusy || !ready || localOwnerId !== cloudUserId;
  cloudDownload.disabled = cloudBusy || !ready;
  cloudRestore.disabled = cloudBusy || !ready;
  cloudClaim.hidden = !ready || Boolean(localOwnerId);
  cloudClaim.disabled = cloudBusy;
  cloudNew.hidden = !ready || !localOwnerId || localOwnerId === cloudUserId;
  cloudNew.disabled = cloudBusy;
}
function cloudSetOwner(userId) {
  localOwnerId = userId;
  try {
    if (userId) localStorage.setItem(CLOUD_OWNER_KEY, userId);
    else localStorage.removeItem(CLOUD_OWNER_KEY);
  } catch { /* A associação vale só até fechar a página se o armazenamento falhar. */ }
  cloudControls();
}
function cloudSetBusy(busy) {
  cloudBusy = busy;
  cloudControls();
}

function cloudShowFor(userId) {
  cloudUserId = userId;
  cloudPanel.hidden = !(cloudConfig && userId);
  cloudControls();
  if (!cloudConfig || !userId || cloudBusy) return;
  if (!localOwnerId) cloudMessage('Antes de enviar, confirme que o progresso deste navegador pertence a esta conta.');
  else if (localOwnerId !== userId) cloudMessage('O progresso local pertence a outra conta. Carregue a cópia desta conta ou inicie uma jornada vazia.');
  else cloudMessage('Progresso local desta conta. Escolha quando enviar ou carregar da nuvem.');
}

async function cloudRequest(method, query = '', body = null) {
  const userId = cloudUserId;
  const session = window.Clerk?.session;
  if (!cloudConfig || !userId || !session || window.Clerk.user?.id !== userId) {
    throw new Error('Entre novamente para sincronizar.');
  }
  const token = await session.getToken();
  if (!token || window.Clerk.user?.id !== userId) throw new Error('Sessão encerrada. Entre novamente.');
  const headers = {
    apikey: cloudConfig.key,
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  };
  if (body !== null) {
    headers['Content-Type'] = 'application/json';
    headers.Prefer = 'return=minimal';
  }
  const response = await fetch(`${cloudConfig.url}/rest/v1/learning_state${query}`, {
    method,
    headers,
    body: body === null ? undefined : JSON.stringify(body),
    cache: 'no-store'
  });
  if (!response.ok) {
    const hint = [401, 403].includes(response.status)
      ? ' Confira a integração Clerk e as políticas RLS no Supabase.' : '';
    throw new Error(`Supabase respondeu HTTP ${response.status}.${hint}`);
  }
  return method === 'GET' ? response.json() : null;
}

async function cloudReadCurrent() {
  const query = `?select=user_id,state&user_id=eq.${encodeURIComponent(cloudUserId)}`;
  const rows = await cloudRequest('GET', query);
  if (!Array.isArray(rows)) throw new Error('Resposta inesperada do Supabase.');
  return rows[0] || null;
}

function cloudBackupLocal() {
  const backup = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(backup);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'tech-learning-hub-progresso-local.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

cloudUpload.addEventListener('click', async () => {
  if (cloudBusy) return;
  if (!cloudUserId || localOwnerId !== cloudUserId) {
    cloudMessage('Vincule este progresso à conta atual antes de enviar.');
    return;
  }
  const userId = cloudUserId;
  cloudSetBusy(true);
  cloudMessage('Conferindo o progresso na nuvem…');
  try {
    const remote = await cloudReadCurrent();
    if (userId !== cloudUserId) throw new Error('A conta mudou. Tente novamente.');
    if (remote && !window.confirm('Já existe progresso nesta conta na nuvem. Substituí-lo pelo progresso deste navegador?')) {
      cloudMessage('Envio cancelado; o progresso na nuvem foi preservado.');
      return;
    }
    const snapshot = sanitizeState(state);
    if (remote) {
      await cloudRequest('PATCH', `?user_id=eq.${encodeURIComponent(userId)}`, { state: snapshot });
    } else {
      await cloudRequest('POST', '', { user_id: userId, state: snapshot });
    }
    cloudMessage('Progresso enviado para a nuvem nesta conta.');
  } catch (error) {
    cloudMessage(`Não foi possível enviar: ${error.message}`);
  } finally {
    cloudSetBusy(false);
  }
});

cloudDownload.addEventListener('click', async () => {
  if (cloudBusy) return;
  const userId = cloudUserId;
  cloudSetBusy(true);
  cloudMessage('Buscando o progresso na nuvem…');
  try {
    const remote = await cloudReadCurrent();
    if (userId !== cloudUserId) throw new Error('A conta mudou. Tente novamente.');
    if (!remote) {
      cloudMessage('Esta conta ainda não tem progresso na nuvem.');
      return;
    }
    if (!remote.state || remote.state.version !== 1 || !remote.state.completed || typeof remote.state.completed !== 'object') {
      throw new Error('O progresso remoto tem um formato desconhecido. Nada foi substituído.');
    }
    if (!window.confirm('Carregar o progresso da nuvem substituirá o progresso exibido neste navegador. Um backup local será baixado antes. Continuar?')) {
      cloudMessage('Carregamento cancelado; o progresso local foi preservado.');
      return;
    }
    if (userId !== cloudUserId || window.Clerk?.user?.id !== userId) {
      throw new Error('A conta mudou. Tente novamente.');
    }
    cloudBackupLocal();
    if (dialog.open) closeDialog();
    state = sanitizeState(remote.state);
    saveState();
    render();
    cloudSetOwner(userId);
    cloudMessage('Progresso da nuvem carregado. Backup local baixado.');
  } catch (error) {
    cloudMessage(`Não foi possível carregar: ${error.message}`);
  } finally {
    cloudSetBusy(false);
  }
});

cloudClaim.addEventListener('click', () => {
  if (cloudBusy || !cloudUserId || localOwnerId) return;
  if (!window.confirm('O progresso exibido pode ter sido criado por outra pessoa neste navegador. Você confirma que ele pertence à conta atual?')) return;
  cloudSetOwner(cloudUserId);
  cloudMessage('Progresso local vinculado a esta conta. Agora você pode enviá-lo à nuvem.');
});

cloudNew.addEventListener('click', () => {
  if (cloudBusy || !cloudUserId || !localOwnerId || localOwnerId === cloudUserId) return;
  if (!window.confirm('Iniciar uma jornada vazia substituirá o progresso exibido. Um backup será baixado antes. Continuar?')) return;
  cloudBackupLocal();
  if (dialog.open) closeDialog();
  state = sanitizeState(null);
  saveState();
  render();
  cloudSetOwner(cloudUserId);
  cloudMessage('Jornada vazia iniciada nesta conta. A cópia anterior foi baixada.');
});

cloudRestore.addEventListener('click', () => { if (!cloudBusy) cloudBackupFile.click(); });
cloudBackupFile.addEventListener('change', async () => {
  const file = cloudBackupFile.files?.[0];
  cloudBackupFile.value = '';
  if (!file) return;
  if (file.size > 5_000_000) {
    cloudMessage('Arquivo grande demais para um backup de progresso.');
    return;
  }
  cloudSetBusy(true);
  try {
    const candidate = JSON.parse(await file.text());
    if (!candidate || candidate.version !== 1 || !candidate.completed || typeof candidate.completed !== 'object' || Array.isArray(candidate.completed)) {
      throw new Error('O arquivo não parece ser um backup do Tech Learning Hub.');
    }
    if (!window.confirm('Restaurar este arquivo substituirá o progresso exibido neste navegador. Continuar?')) {
      cloudMessage('Restauração cancelada.');
      return;
    }
    if (dialog.open) closeDialog();
    state = sanitizeState(candidate);
    saveState();
    render();
    cloudSetOwner(null);
    cloudMessage('Backup restaurado. Confirme a conta proprietária antes de enviá-lo à nuvem.');
  } catch (error) {
    cloudMessage(`Não foi possível restaurar: ${error.message}`);
  } finally {
    cloudSetBusy(false);
  }
});

window.addEventListener('tech-hub:auth-change', (event) => cloudShowFor(event.detail.userId));

(async () => {
  try {
    const response = await fetch('/api/public-config', { cache: 'no-store' });
    if (!response.ok) return;
    const config = await response.json();
    const url = new URL(config.supabaseUrl);
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co') || url.port || url.username || url.password || url.search || url.hash || url.pathname !== '/') return;
    if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(config.supabasePublishableKey || '')) return;
    cloudConfig = { url: url.origin, key: config.supabasePublishableKey };
    cloudShowFor(window.Clerk?.user?.id || null);
  } catch { /* Sem Supabase configurado, o curso continua com progresso local. */ }
})();

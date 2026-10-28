'use strict';

process.env.BACKEND_STORAGE = 'memory';
process.env.BACKEND_ACCOUNT_AUTH = 'clerk';

require('../server.cjs').iniciar().catch(() => {
  console.error('Falha ao iniciar a demonstração Clerk; confira a configuração local sem compartilhar seus valores.');
  process.exitCode = 1;
});

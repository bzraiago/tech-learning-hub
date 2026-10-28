'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  CHAVE_LISTA_ESTUDOS,
  criarServicoEstudosComCache
} = require('./servico-estudos-cache-aside.cjs');

function criarCacheFalso({ aoLer, aoSalvar, aoExcluir } = {}) {
  const valores = new Map();
  const chamadas = { get: 0, setEx: [], del: [] };
  return {
    valores,
    chamadas,
    async get(chave) {
      chamadas.get += 1;
      if (aoLer) return aoLer(chave, valores);
      return valores.get(chave) ?? null;
    },
    async setEx(chave, ttl, valor) {
      chamadas.setEx.push({ chave, ttl, valor });
      if (aoSalvar) return aoSalvar(chave, ttl, valor, valores);
      valores.set(chave, valor);
      return 'OK';
    },
    async del(chave) {
      chamadas.del.push(chave);
      if (aoExcluir) return aoExcluir(chave, valores);
      return valores.delete(chave) ? 1 : 0;
    }
  };
}

test('cache miss preenche Redis com TTL e hit evita ler a fonte novamente', async () => {
  const cache = criarCacheFalso();
  const estudos = [{ id: 1, titulo: 'HTML' }];
  let leiturasDaFonte = 0;
  const servico = criarServicoEstudosComCache({
    async listar() { leiturasDaFonte += 1; return estudos; }
  }, cache, { ttlSegundos: 30 });

  assert.deepEqual(await servico.listar(), estudos);
  assert.deepEqual(await servico.listar(), estudos);
  assert.equal(leiturasDaFonte, 1);
  assert.deepEqual(cache.chamadas.setEx, [{
    chave: CHAVE_LISTA_ESTUDOS,
    ttl: 30,
    valor: JSON.stringify(estudos)
  }]);
});

test('leituras simultâneas em miss compartilham uma consulta à fonte neste processo', async () => {
  const cache = criarCacheFalso();
  let liberarFonte;
  let leiturasDaFonte = 0;
  const estudos = [{ id: 1, titulo: 'HTML' }];
  const fonteLiberada = new Promise((resolve) => { liberarFonte = resolve; });
  const servico = criarServicoEstudosComCache({
    async listar() {
      leiturasDaFonte += 1;
      await fonteLiberada;
      return estudos;
    }
  }, cache);

  const primeira = servico.listar();
  const segunda = servico.listar();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(leiturasDaFonte, 1);
  liberarFonte();
  assert.deepEqual(await Promise.all([primeira, segunda]), [estudos, estudos]);
  assert.equal(cache.chamadas.setEx.length, 1);
});

test('escrita confirmada invalida a lista; escrita recusada preserva o cache', async () => {
  const cache = criarCacheFalso();
  let estudos = [{ id: 1, titulo: 'HTML' }];
  const servico = criarServicoEstudosComCache({
    async listar() { return estudos; },
    async criar(entrada) {
      if (!entrada.valido) return { sucesso: false, status: 400 };
      estudos = [...estudos, { id: 2, titulo: entrada.titulo }];
      return { sucesso: true, estudo: estudos.at(-1) };
    },
    async criarComSessao() { return { sucesso: true, resultado: {} }; }
  }, cache);

  await servico.listar();
  assert.deepEqual(await servico.criar({ valido: false }), { sucesso: false, status: 400 });
  assert.deepEqual(cache.chamadas.del, []);

  assert.deepEqual(await servico.criar({ valido: true, titulo: 'CSS' }), {
    sucesso: true,
    estudo: { id: 2, titulo: 'CSS' }
  });
  assert.deepEqual(cache.chamadas.del, [CHAVE_LISTA_ESTUDOS]);
  assert.deepEqual(await servico.listar(), estudos);
});

test('falha do Redis na leitura recorre à fonte sem tentar preencher durante a falha', async () => {
  const falhas = [];
  const cache = criarCacheFalso({
    aoLer() { throw Object.assign(new Error('erro com detalhe privado'), { code: 'ECONNREFUSED' }); }
  });
  let leiturasDaFonte = 0;
  const estudos = [{ id: 1, titulo: 'HTML' }];
  const servico = criarServicoEstudosComCache({
    async listar() { leiturasDaFonte += 1; return estudos; }
  }, cache, { registrarFalha: (mensagem) => falhas.push(mensagem) });

  assert.deepEqual(await servico.listar(), estudos);
  assert.equal(leiturasDaFonte, 1);
  assert.equal(cache.chamadas.setEx.length, 0);
  assert.deepEqual(falhas, ['Falha ao ler cache: ECONNREFUSED']);
  assert.equal(falhas.join(' ').includes('privado'), false);
});

test('cache corrompido é substituído e falha de DEL não mascara escrita confirmada', async () => {
  const falhas = [];
  const cache = criarCacheFalso({
    aoExcluir() { throw Object.assign(new Error('detalhe'), { code: 'ETIMEDOUT' }); }
  });
  const antigos = [{ id: 1, titulo: 'HTML' }];
  const novos = [...antigos, { id: 2, titulo: 'CSS' }];
  cache.valores.set(CHAVE_LISTA_ESTUDOS, '{json inválido');
  const servico = criarServicoEstudosComCache({
    async listar() { return antigos; },
    async criar() { return { sucesso: true, estudo: novos.at(-1) }; }
  }, cache, { registrarFalha: (mensagem) => falhas.push(mensagem) });

  assert.deepEqual(await servico.listar(), antigos);
  assert.equal(cache.valores.get(CHAVE_LISTA_ESTUDOS), JSON.stringify(antigos));
  assert.deepEqual(await servico.criar({ titulo: 'CSS' }), { sucesso: true, estudo: novos.at(-1) });
  assert.deepEqual(await servico.listar(), antigos);
  assert.deepEqual(falhas, ['Falha ao ler cache: SyntaxError', 'Falha ao invalidar cache: ETIMEDOUT']);
});

test('cache valida cliente, TTL e namespace antes de operar', () => {
  const servico = { async listar() { return []; } };
  const cache = criarCacheFalso();
  assert.throws(() => criarServicoEstudosComCache(servico, cache, { ttlSegundos: 0 }), /ttlSegundos/);
  assert.throws(() => criarServicoEstudosComCache(servico, cache, { chave: 'list' }), /cache:v1/);
  assert.throws(() => criarServicoEstudosComCache(servico, { get() {} }), /setEx/);
});

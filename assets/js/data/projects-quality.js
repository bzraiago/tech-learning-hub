'use strict';

// Projeto de fechamento com contrato executável e evidências locais de manutenção.
PROJECTS.push({
  id: 'project-quality-capstone',
  module: 'quality-maintenance',
  kind: 'javascript',
  format: 'js',
  title: 'Corrigir e proteger um relatório de sessões',
  level: 'Projeto de fechamento · Qualidade e Manutenção',
  goal: 'Reproduzir um defeito em código existente, escrever um teste que falha antes da correção, corrigir a causa e proteger o contrato ao refatorar.',
  prerequisites: 'Conclua Testes e integração contínua e Manutenção de projetos e revisão. Use a preparação mínima de Node.js da Etapa 0, o terminal e um editor. Reaproveite a página de estudos da trilha JavaScript para o roteiro manual de interface.',
  deliverable: 'Em uma pasta de laboratório, salve relatorio.cjs, relatorio.test.cjs e README.md. No arquivo local, exporte a função com module.exports = { resumirSessoes }. Execute os testes no terminal e guarde as saídas antes e depois da correção no README. Cole somente a implementação final da função na aba Entrega; a página executa verificações isoladas, mas não lê seus arquivos nem comprova a sequência de commits.',
  brief: [
    'Contrato inicial: receba um array de sessões com {status, minutos}. status pode ser concluida ou pendente; minutos deve ser inteiro não negativo. Conte e some somente sessões concluídas. Retorne {concluidas, minutos}. Array vazio retorna dois zeros; entrada inválida lança TypeError. Não altere os dados recebidos.',
    'Código herdado com defeito: function resumirSessoes(sessoes) { const feitas = sessoes.filter(s => s.status !== "pendente"); return {concluidas: feitas.length, minutos: feitas.reduce((total, s) => total + s.minutos, 0)}; }. Registre um caso que passa e outro que falha, com entrada, esperado e observado. Rode um teste de regressão vermelho antes de editar a função.',
    'Corrija a causa, rode a suíte verde e refatore apenas depois de preservar o contrato. Faça um roteiro manual na página de estudos para lista vazia, dados de sessão exibidos como texto, rótulos, foco e navegação por teclado. Documente o que foi observado e o que o teste de função não cobre.',
    'Mudança posterior de requisito: aceite também status pausada, que não deve contribuir para a contagem nem para os minutos. Acrescente teste para esse caso antes de adaptar a implementação; mantenha a rejeição de status desconhecido.'
  ],
  exampleOutput: 'Entrada: [{status:"concluida",minutos:25},{status:"pendente",minutos:40}] → {concluidas:1,minutos:25}.\nEntrada: [{status:"pausada",minutos:15}] após a mudança de requisito → {concluidas:0,minutos:0}.\nEntrada: [{status:"concluida",minutos:-1}] → TypeError.\nAntes da correção: o teste com status ausente falha porque o código herdado o conta como concluído. Depois: o mesmo teste passa e a suíte permanece verde.',
  testCommand: 'node --test relatorio.test.cjs',
  testsCode: 'const { test } = require("node:test");\nconst assert = require("node:assert/strict");\nconst { resumirSessoes } = require("./relatorio.cjs");\n\ntest("soma apenas sessões concluídas", () => {\n  assert.deepEqual(resumirSessoes([{status:"concluida",minutos:25},{status:"pendente",minutos:40}]), {concluidas:1,minutos:25});\n});\ntest("regressão: status ausente é inválido", () => {\n  assert.throws(() => resumirSessoes([{minutos:10}]), TypeError);\n});\ntest("novo requisito: sessão pausada não conta", () => {\n  assert.deepEqual(resumirSessoes([{status:"pausada",minutos:15}]), {concluidas:0,minutos:0});\n});',
  checks: [
    { id: 'normal', mode: 'auto', label: 'Conta e soma apenas sessões concluídas.', body: 'const r=resumirSessoes([{status:"concluida",minutos:25},{status:"pendente",minutos:40},{status:"concluida",minutos:0}]); return r.concluidas===2 && r.minutos===25;' },
    { id: 'empty', mode: 'auto', label: 'Array vazio retorna duas contagens zero.', body: 'const r=resumirSessoes([]); return r.concluidas===0 && r.minutos===0;' },
    { id: 'paused', mode: 'auto', label: 'Novo requisito: sessão pausada não entra no relatório.', body: 'const r=resumirSessoes([{status:"pausada",minutos:15},{status:"concluida",minutos:10}]); return r.concluidas===1 && r.minutos===10;' },
    { id: 'invalid', mode: 'auto', label: 'Rejeita status ausente/desconhecido, minutos inválidos e entrada que não é array.', body: 'const casos=[null,{},[{}],[{status:"outra",minutos:10}],[{status:"concluida",minutos:-1}],[{status:"concluida",minutos:1.5}],[{status:"pendente",minutos:"10"}]]; return casos.every(x=>{try{resumirSessoes(x);return false;}catch(e){return e instanceof TypeError;}});' },
    { id: 'immutable', mode: 'auto', label: 'A função preserva o array e seus objetos.', body: 'const a=[{status:"concluida",minutos:10}];const antes=JSON.stringify(a);resumirSessoes(a);return JSON.stringify(a)===antes;' },
    { id: 'red-green', mode: 'manual', label: 'Guardei no README o comando e a saída de um teste que falhou no código herdado e passou após a correção.' },
    { id: 'interface', mode: 'manual', label: 'Executei no navegador o roteiro de lista vazia, teclado, foco, rótulos e texto de dados não confiáveis; registrei observações e limites.' },
    { id: 'maintenance', mode: 'manual', label: 'Refatorei após a suíte verde, repeti os testes e documentei no README causa, mudança de requisito e risco restante.' }
  ],
  hints: [
    'Comece pelo menor caso que mostra o defeito: um objeto sem status não pode contar como concluído.',
    'Separe validação de entrada do cálculo; um filtro não substitui a verificação do contrato.',
    'No roteiro da interface, use um título como <img src=x onerror=alert(1)> e confira que ele aparece como texto, sem executar código.'
  ],
  solution: 'function resumirSessoes(sessoes) {\n  if (!Array.isArray(sessoes)) throw new TypeError("Sessões inválidas");\n  let concluidas = 0;\n  let minutos = 0;\n  for (const sessao of sessoes) {\n    if (!sessao || !["concluida", "pendente", "pausada"].includes(sessao.status) || !Number.isInteger(sessao.minutos) || sessao.minutos < 0) {\n      throw new TypeError("Sessão inválida");\n    }\n    if (sessao.status === "concluida") { concluidas++; minutos += sessao.minutos; }\n  }\n  return { concluidas, minutos };\n}',
  explanation: [
    'A validação rejeita status ausente; o código herdado tratava qualquer valor diferente de pendente como concluído.',
    'Os testes automáticos verificam entradas e saídas da função final, mas não demonstram que o teste falhou antes da correção.',
    'O roteiro de interface cobre comportamentos que testes de função não observam, como foco e inserção segura de texto.'
  ],
  transfer: 'Receba um novo campo opcional origem em cada sessão e devolva um resumo por origem, sem alterar as contagens atuais. Escreva testes para origem ausente e duas origens diferentes antes de mudar a função; explique a nova estrutura de retorno.',
  rubric: 'Para registrar a entrega, a função final deve passar nas verificações isoladas e os critérios locais devem ser marcados. O README precisa permitir que outra pessoa repita o vermelho→verde e o roteiro de interface. O dashboard não comprova a sequência histórica dos testes, a acessibilidade completa nem uma revisão independente.'
});

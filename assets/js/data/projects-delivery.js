'use strict';

// Projeto local de integração: contrato verificável sem simular publicação real.
PROJECTS.push({
  id: 'project-delivery-capstone',
  module: 'delivery-work',
  kind: 'javascript',
  format: 'js',
  title: 'Painel de estudos conectado ao servidor local',
  level: 'Projeto de fechamento · Integração e Entrega',
  goal: 'Conectar uma interface a uma API local, distinguir sucesso, vazio, falha e sessão expirada, testar o contrato e planejar uma entrega reproduzível.',
  prerequisites: 'Conclua Serviços e segurança e Publicação e trabalho em projeto. Use a preparação Node.js da Etapa 0. Reaproveite HTML, DOM, Fetch, testes e Git das trilhas anteriores; este laboratório usa o mock local da aula Contratos HTTP, JSON e servidor local na porta 4178.',
  deliverable: 'Na pasta de laboratório, salve server.cjs, index.html, cliente.cjs, cliente.test.cjs e README.md. Inicie o servidor local e confira a página e GET /api/estudos no navegador. Cole apenas a função carregarEstudos(buscar) na aba Entrega. O servidor é um mock em memória: não há banco, autenticação real nem publicação automática.',
  brief: [
    'Contrato: carregarEstudos(buscar) chama buscar("/api/estudos", {method:"GET"}) uma vez. buscar é a função Fetch real na página e uma função substituta nos testes. Uma resposta 200 com array de {id inteiro positivo, titulo não vazio} retorna {estado:"pronto", estudos, mensagem:"Estudos carregados."}. Um array vazio retorna estado vazio e mensagem "Nenhum estudo encontrado.".',
    'Falha de rede, status HTTP diferente de 2xx, JSON inválido ou item fora do contrato retorna {estado:"erro", estudos:[], mensagem:"Não foi possível carregar os estudos."}. Não exponha corpo de erro, URL interna ou segredo na mensagem. O resultado deve ser novo, sem alterar os objetos recebidos.',
    'Na interface, mostre carregamento antes da resposta; renderize títulos com textContent; informe sucesso, vazio e falha em uma região de status. Acrescente um formulário que envie POST /api/estudos, mostre 201 ou 400 e impeça envio duplicado enquanto espera. No servidor, valide o título novamente. Para testar falhas, alterne localmente a resposta da mesma rota GET /api/estudos entre lista normal, vazia, 503 e 401; documente como voltar ao modo normal.',
    'Mudança de requisito após a primeira versão: status 401 agora retorna {estado:"sessao", estudos:[], mensagem:"Entre novamente."}. Acrescente teste para 401 antes de mudar a função. Isso simula sessão expirada; não é autenticação real.'
  ],
  exampleOutput: '200 + [{id:1,titulo:"HTML"}] → {estado:"pronto",estudos:[{id:1,titulo:"HTML"}],mensagem:"Estudos carregados."}.\n200 + [] → {estado:"vazio",estudos:[],mensagem:"Nenhum estudo encontrado."}.\n503, rede indisponível ou item inválido → {estado:"erro",estudos:[],mensagem:"Não foi possível carregar os estudos."}.\n401 após o requisito novo → {estado:"sessao",estudos:[],mensagem:"Entre novamente."}.',
  testFile: 'cliente.test.cjs',
  testCommand: 'node --test cliente.test.cjs',
  testsCode: 'const { test } = require("node:test");\nconst assert = require("node:assert/strict");\nconst { carregarEstudos } = require("./cliente.cjs");\n\ntest("sucesso consulta a rota e entrega estudos", async () => {\n  const chamadas = [];\n  const buscar = async (...args) => { chamadas.push(args); return {ok:true,status:200,json:async()=>[{id:1,titulo:"HTML"}]}; };\n  assert.deepEqual(await carregarEstudos(buscar), {estado:"pronto",estudos:[{id:1,titulo:"HTML"}],mensagem:"Estudos carregados."});\n  assert.deepEqual(chamadas, [["/api/estudos", {method:"GET"}]]);\n});\ntest("lista vazia tem estado próprio", async () => {\n  assert.equal((await carregarEstudos(async()=>({ok:true,status:200,json:async()=>[]}))).estado, "vazio");\n});\ntest("falha de rede não expõe erro interno", async () => {\n  const r = await carregarEstudos(async()=>{throw new Error("token privado");});\n  assert.deepEqual(r, {estado:"erro",estudos:[],mensagem:"Não foi possível carregar os estudos."});\n});\ntest("novo requisito: 401 orienta nova entrada", async () => {\n  assert.deepEqual(await carregarEstudos(async()=>({ok:false,status:401})), {estado:"sessao",estudos:[],mensagem:"Entre novamente."});\n});',
  checks: [
    { id: 'success', mode: 'auto', label: 'Chama GET /api/estudos uma vez e retorna sucesso com cópia dos itens válidos.', body: 'let chamadas=0;const dados=[{id:1,titulo:"HTML"}];const r=await carregarEstudos(async(url,opt)=>{chamadas++;if(url!=="/api/estudos"||opt?.method!=="GET")return {ok:false,status:500};return {ok:true,status:200,json:async()=>dados};});return chamadas===1&&r.estado==="pronto"&&r.mensagem==="Estudos carregados."&&r.estudos.length===1&&r.estudos[0].titulo==="HTML"&&r.estudos!==dados&&r.estudos[0]!==dados[0];' },
    { id: 'empty', mode: 'auto', label: 'Distingue lista vazia de erro.', body: 'const r=await carregarEstudos(async()=>({ok:true,status:200,json:async()=>[]}));return r.estado==="vazio"&&r.estudos.length===0&&r.mensagem==="Nenhum estudo encontrado.";' },
    { id: 'http', mode: 'auto', label: 'Status 503 retorna mensagem segura e nenhuma lista.', body: 'const r=await carregarEstudos(async()=>({ok:false,status:503,json:async()=>({erro:"interno"})}));return r.estado==="erro"&&r.estudos.length===0&&r.mensagem==="Não foi possível carregar os estudos.";' },
    { id: 'network', mode: 'auto', label: 'Falha de rede é capturada sem mostrar detalhes internos.', body: 'const r=await carregarEstudos(async()=>{throw new Error("token privado");});return r.estado==="erro"&&r.estudos.length===0&&r.mensagem==="Não foi possível carregar os estudos.";' },
    { id: 'invalid', mode: 'auto', label: 'JSON quebrado e itens inválidos não entram na interface.', body: 'const respostas=[async()=>{throw new SyntaxError("JSON");},async()=>[{id:0,titulo:"A"}],async()=>[{id:1,titulo:" "}],async()=>({id:1,titulo:"A"})];for(const json of respostas){const r=await carregarEstudos(async()=>({ok:true,status:200,json}));if(r.estado!=="erro"||r.estudos.length)return false;}return true;' },
    { id: 'auth', mode: 'auto', label: 'Novo requisito: 401 tem estado de sessão expirada sem expor resposta interna.', body: 'const r=await carregarEstudos(async()=>({ok:false,status:401,json:async()=>({segredo:"não mostrar"})}));return r.estado==="sessao"&&r.estudos.length===0&&r.mensagem==="Entre novamente.";' },
    { id: 'browser', mode: 'manual', label: 'No navegador, testei carregamento, sucesso, vazio, 503 e 401 com o mock local; títulos entram via textContent, o formulário impede envio duplicado e o foco permanece utilizável por teclado.' },
    { id: 'server', mode: 'manual', label: 'No servidor local, testei POST /api/estudos com título válido (201) e inválido (400); registrei método, rota, status, Content-Type e resultado observado sem dados reais.' },
    { id: 'reproduce', mode: 'manual', label: 'Outra pessoa, ou eu em pasta limpa, seguiu o README e repetiu a inicialização, os testes, a mudança de requisito e a parada do servidor.' },
    { id: 'release', mode: 'manual', label: 'Documentei plano de publicação: arquivos estáticos, hospedagem separada da API, configuração pública/segredos, checagem após publicar e como voltar à versão anterior; marquei o que ainda não executei.' }
  ],
  hints: [
    'Comece pela função sem DOM. Use uma resposta substituta para prever cada estado antes de ligar o Fetch real.',
    'Sirva index.html e /api/estudos no mesmo host e porta 4178 para este laboratório; a URL relativa evita uma configuração de CORS desnecessária.',
    'Rode o roteiro com dados fictícios. Se o mock reiniciar, os dados em memória desaparecem: isso não é persistência.'
  ],
  solution: 'async function carregarEstudos(buscar) {\n  const erro = () => ({estado:"erro",estudos:[],mensagem:"Não foi possível carregar os estudos."});\n  try {\n    const resposta = await buscar("/api/estudos", {method:"GET"});\n    if (resposta?.status === 401) return {estado:"sessao",estudos:[],mensagem:"Entre novamente."};\n    if (resposta?.ok !== true) return erro();\n    const dados = await resposta.json();\n    if (!Array.isArray(dados) || !dados.every(item => item && Number.isInteger(item.id) && item.id > 0 && typeof item.titulo === "string" && item.titulo.trim())) return erro();\n    const estudos = dados.map(item => ({id:item.id,titulo:item.titulo.trim()}));\n    return estudos.length ? {estado:"pronto",estudos,mensagem:"Estudos carregados."} : {estado:"vazio",estudos:[],mensagem:"Nenhum estudo encontrado."};\n  } catch { return erro(); }\n}',
  explanation: [
    'A função recebe buscar como dependência, permitindo testar contrato e falhas sem rede.',
    'O tratamento de erro não repassa mensagens internas para a pessoa usuária; a interface ainda precisa renderizar cada estado e verificar teclado.',
    'Uma resposta 401 é apenas um sinal neste mock; autenticação, autorização e armazenamento durável exigem implementação posterior no servidor.'
  ],
  transfer: 'Acrescente suporte a resposta 429: retorne estado limite com orientação de tentar mais tarde, sem repetir automaticamente a requisição. Escreva o teste antes de adaptar o código, atualize o estado visível da interface e o plano de observação.',
  rubric: 'Os checks automáticos verificam a função de adaptação; os checks locais exigem interface, mock HTTP e README reproduzíveis. Registre evidências de falha e recuperação. O plano de publicação não é um deploy: URL pública, CI real, backup e rollback executado ficam para as fases posteriores.'
});

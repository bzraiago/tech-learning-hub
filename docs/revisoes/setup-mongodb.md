# Revisão da aula — Preparar MongoDB Community e mongosh (`setup-mongodb`)

> **Atualização de sequência:** o ID atual é `db-setup-mongodb`; a aula foi movida para Banco de Dados, após os modelos NoSQL e imediatamente antes de `db-mongo-crud`. A revisão abaixo registra a posição anterior. O progresso, quiz, anotações e posição de leitura do ID antigo são migrados no `sanitizeState()`.

## 1. Escopo e contrato

- **Data/branch/revisão inicial:** 02/11/2026, `testes`, `61b6872` mais alterações locais anteriores. **Pedido:** finalizar a última preparação da etapa 0 e publicar na branch `review` após validar.
- **Público:** pessoa com informática básica no Windows, usando navegador, instaladores, Serviços e PowerShell. macOS/Linux são alternativas identificadas. Não se presume SQL, Docker, Python ou conta Atlas.
- **Resultado:** identificar servidor e cliente separadamente, confirmar serviço local, conectar a `127.0.0.1:27017`, obter `ok: 1` no `ping`, sair e repetir sem apagar dados. A preparação é opcional e antecede `db-mongo-crud`.
- **Arquivos:** guia em `assets/js/data/lesson-guides/preparacao-bancos-aprofundamento.js`, ficha em `assets/js/data/tracks.js`. Leitor compartilhado consultado, não editado. ID, quatro índices de exercício, três índices de quiz e chave de anotação do desafio preservados.

## 2. Veredito e estado

**Implementada e validada estruturalmente e no leitor local simulado.** O percurso anterior dependia de instruções externas para instalar os dois programas e misturava a confirmação do cliente com a do servidor. O novo exemplo tem seis passos com lugar, ação, bloco e resultado no ponto de uso. A instalação e o `ping` contra MongoDB real não foram executados nesta revisão; autonomia de um aluno ainda não foi observada.

## 3. Achados e pré-requisitos

| Localização | Tipo/gravidade | Evidência anterior | Correção aplicada | Situação |
|---|---|---|---|---|
| `setup-mongodb`, Conceitos/Exemplo | FATO · alto | Sem atalhos de preparações anteriores; instalação descrita em parágrafos longos. | Três atalhos para arquivos, ciclo de execução e editor; Conceitos distingue navegador, instalador, Serviços, PowerShell e `mongosh`. | Implementado. |
| Exemplo, instalação Windows | FATO · bloqueante | “Instale mongosh se necessário” não dizia onde nem como confirmar. | Passos separados para Community MSI/serviço e mongosh MSI/`mongosh --version`; serviço conferido em `services.msc`. | Implementado; instalação não executada. |
| Exemplo, conexão | FATO · alto | Três blocos sem confirmação por etapa. | Seis cartões `example.steps`; comando do terminal separado de `db.runCommand` no prompt conectado; primeiro resultado pequeno é `ok: 1`. | Conferido no leitor. |
| Exemplo, retomada | FATO · alto | Dizia preservar dados, sem sequência reproduzível. | Passo final confirma o mesmo serviço, reconecta e repete ping sem escrita. | Implementado; servidor real não testado. |
| Prática, investigação | FATO · alto | Cobrava `db.getSiblingDB` e script de escrita sem ensino nesta preparação. | Investiga `db.runCommand` digitado por engano no PowerShell e ensina a reconhecer o prompt correto. | Implementado. |
| Prática, mudança de requisito | FATO · alto | Desafio genérico. | `requirementChange` pede acrescentar `db.getName()` ao relatório, preservando URI e `ping`; não cria coleção. | Implementado. |

**Dependências:** `prep-files` (*Pastas, arquivos, nomes e extensões*) + `prep-cycle` (*Salvar, executar, observar e encerrar*) + `setup-editor` (*Preparar o editor de código*) → `setup-mongodb` → `db-mongo-crud`. Nenhuma depende de SQL ou Docker. O relatório `.md` da prática usa a criação de arquivo já ensinada e agora explicita a pasta e o menu do VS Code.

## 4. Percurso na ordem da interface

| Aba/passo | Estado/ferramenta | Ação | Confirmação e retorno |
|---|---|---|---|
| Conceitos | Navegador | Reconhecer servidor, cliente, prompts e URI local | Ler não instala nem cria dados. |
| Exemplo 1 | Navegador | Decidir se há permissão e laboratório local isolado | Sem laboratório, registrar pendência. |
| Exemplo 2 | Navegador → MSI → Serviços | Instalar Community, manter serviço e localizar nome | Serviço do laboratório aparece Em execução; ainda não prova conexão. |
| Exemplo 3 | Navegador → MSI do mongosh → PowerShell | Instalar cliente separado, abrir terminal novo, `mongosh --version` | Versão do cliente, sem afirmar estado do servidor. |
| Exemplo 4 | PowerShell → prompt mongosh | Conectar URI local; executar `db.runCommand({ ping: 1 })` após prompt | Resposta contém `ok: 1`; `ECONNREFUSED` retorna à checagem do serviço. |
| Exemplo 5 | Prompt mongosh | `db.getName()`, depois `exit` | Nome do banco selecionado; nenhuma coleção criada; volta ao terminal. |
| Exemplo 6 | Serviços → PowerShell → mongosh | Confirmar mesmo serviço, reconectar e repetir ping | `ok: 1` novamente sem apagar ou escrever dados. |
| Prática/Revisão/Fontes | Navegador + laboratório, se disponível | Prever, alterar URI condicionalmente, criar `.md`, investigar prompt, quiz e desafio | Evidência real ou pendência explícita; quiz não prova instalação independente. |

**Primeira saída:** `mongosh --version` confirma apenas o cliente; `ping` com `ok: 1` é a primeira resposta do servidor. **Repetição:** `ping` não cria dados e pode ser repetido com o mesmo serviço. Nome `test` no prompt não equivale a coleção criada.

## 5. Exercícios e desafio

| Atividade | Cobrança | Ensino/critério | Validação |
|---|---|---|---|
| Prever | Cliente responde, conexão é recusada | Separa versão local de serviço/porta | Revisado por leitura; sem erro real reproduzido. |
| Alterar | URI para porta 27018, se laboratório autorizado a usar | Muda apenas a porta; se não existir serviço ali, declara não executado | Não foi criado segundo serviço. |
| Construir | `ambiente-mongodb.md` | Pasta em Documentos, abrir no VS Code, Novo Arquivo e Salvar; sem credenciais | Fluxo explícito; aluno não observado. |
| Investigar | `db.runCommand` digitado no PowerShell | Identificar troca de prompt e conectar antes da consulta | Revisado por leitura. |
| Mudança de requisito | Acrescentar `db.getName()` ao relatório | Preserva URI e `ok: 1`; distingue banco selecionado de coleção criada | Desafio específico, não executado em MongoDB real. |

## 6. Verificações técnicas e fontes

| Verificação | Observado | Limite |
|---|---|---|
| `node scripts/validate-content.js` | Passou: 10 trilhas, 33 módulos, 169 aulas, 696 exercícios, 531 questões, 29 projetos | Estrutura/sintaxe, não aprendizagem. |
| Chromium local com serviços fictícios | Teste de inspeção 1/1 passou; 3 atalhos, 6 passos, 4 exercícios, nenhum erro de página | CSS global e Tailwind público em cache; fontes remotas bloqueadas. |
| Instalação, serviço, `mongosh`, conexão e retomada reais | Não executados | Nenhum serviço ou dado do usuário foi alterado. |
| Aluno real | Não observado | Tentativa mental não comprova autonomia. |

Fontes oficiais abertas em 02/11/2026:

| Fonte | Status e uso | Limite |
|---|---|---|
| [Community por sistema](https://www.mongodb.com/docs/manual/administration/install-community/) e [Windows](https://www.mongodb.com/docs/manual/administration/install-community-windows/) | **OK:** páginas de instalação e escolha de método MSI | A interface da documentação atual usa seletores; opções podem mudar. Inglês. |
| [Instalar mongosh](https://www.mongodb.com/docs/mongodb-shell/install/) | **OK:** cliente separado e `mongosh --version` | Selecionar sistema operacional na página. Inglês. |
| [macOS](https://www.mongodb.com/docs/manual/administration/install-community-macos/) e [Linux](https://www.mongodb.com/docs/manual/administration/install-community-linux/) | **OK:** métodos por plataforma/distribuição | Comandos locais não foram executados. Inglês. |
| [Comando ping](https://www.mongodb.com/docs/manual/reference/command/ping/) | **OK:** teste de resposta sem operação de escrita | `ok: 1` não prova domínio de CRUD nem proteção de produção. Inglês. |

## 7. Interface e compatibilidade

| Viewport | Estado | Observado | Não testado |
|---|---|---|---|
| 375 × 812 | Conceitos, Exemplo, Prática, Revisão | Título legível em duas linhas; 6 passos renderizados; sem transbordamento horizontal medido | Telefone físico, rolagem manual de todos os passos. |
| 768 × 812 | Mesmas abas | Sem transbordamento medido | Tablet físico. |
| 1280 × 812 | Mesmas abas | Sem transbordamento medido | Preview Vercel. |

O teste abriu as abas por automação, capturou a viewport e mediu página/corpo. Não equivale a teste com teclado completo, leitor de tela, seleção manual do código ou zoom 200%. Nenhum código do leitor, ID, índice ou formato do estado foi alterado; progresso real no Supabase não foi testado.

## 8. Critérios de encerramento

- [x] O caminho Windows apresenta serviço e cliente separadamente, com lugar, comando e confirmação.
- [x] A primeira resposta do servidor e a retomada não escrevem dados.
- [x] Exercícios e desafio usam conceitos introduzidos no percurso.
- [x] Validador e inspeção local do leitor passaram.
- [x] Estado, IDs e chaves de rascunho foram preservados.
- [ ] Instalação e `ping` reais verificados em Windows/macOS/Linux.
- [ ] Um aluno iniciante seguiu a aula sem apoio externo.

**Decisão:** implementação concluída no código; aprovação prática com servidor real e observação do aluno permanecem pendentes. Publicação na branch `review` será registrada após o push, se concluído.

## 9. Entrega e passagem

- **Alterações:** guia, ficha e este relatório. O teste temporário de navegador foi removido; capturas estão apenas na pasta temporária.
- **Próximo teste com aluno:** seguir os passos em instalação local autorizada e registrar saída real de serviço, `mongosh --version`, ping e retomada; parar no primeiro bloqueio e corrigir a aula antes de marcar domínio.
- **Limites:** servidor e credenciais reais, macOS/Linux, zoom, teclado completo e aluno não validados nesta implementação.
- **Commit/push/deploy:** pendentes no momento deste registro.

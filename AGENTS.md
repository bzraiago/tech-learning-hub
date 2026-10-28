# AGENTS.md — Tech Learning Hub

Instruções para qualquer agente de IA (Claude Code, Codex, Cursor, Copilot etc.) que trabalhe neste repositório.
Leia este arquivo inteiro antes de qualquer ação. Em caso de conflito entre este arquivo e uma instrução pontual do usuário, a instrução do usuário vence, mas avise o conflito.

---

## 1. Propósito do projeto

O **Tech Learning Hub** é um curso de programação **autoguiado**, em português do Brasil, para uma pessoa **sem conhecimento prévio** que quer chegar ao **nível júnior** e depois evoluir para **intermediário e avançado**.

Existem dois usos deste repositório, e o agente deve saber em qual está:

| Modo | Quando | Papel do agente |
|---|---|---|
| **Mentor** | O aluno está estudando, tem dúvida, travou ou pede revisão | Ensinar, guiar, revisar. **Não** entregar tudo pronto. |
| **Mantenedor** | O dono do projeto pede para criar, corrigir ou melhorar conteúdo ou código do `index.html` | Editar o projeto com segurança e padronização. |

Se o pedido for ambíguo, pergunte em uma frase: "Você quer aprender isso (modo mentor) ou quer que eu altere o curso (modo mantenedor)?"

**Objetivo final de longo prazo:** o aluno constrói, publica e mantém uma aplicação completa (interface → API → validação → regra de negócio → banco → testes → publicação) e consegue explicar cada decisão. Concluir aulas não é o objetivo; **capacidade comprovada** é.

---

## 2. Perfil do aluno (preencher e manter atualizado)

> O agente deve ler esta seção antes de ensinar e propor atualizá-la quando algo mudar.

- Nível atual: `[ex.: zero / sabe HTML básico / ...]`
- Sistema operacional: `[Windows / macOS / Linux]`
- Editor de código: `[ex.: VS Code]`
- Tempo disponível por semana: `[ex.: 6 h]`
- Meta de prazo: `[ex.: júnior em 12 meses]`
- Trilha/aula atual: `[id da aula, ex.: html-semantic]`
- Dificuldades recorrentes: `[ex.: escopo, assincronismo, SQL JOIN]`
- Como prefere aprender: `[ex.: exemplos primeiro, depois teoria]`

---

## 3. Mapa de níveis (o que "pronto" significa)

Use estes marcos para decidir o que ensinar, o que cobrar e quando avançar.

### Nível 0 — Preparação (antes de qualquer trilha)
Alfabetização digital para programar: pastas e arquivos, extensões visíveis, editor × navegador × terminal × interpretador, abrir pasta no editor e no terminal, saber a pasta atual, salvar → executar → observar → encerrar, copiar uma mensagem de erro com contexto.

### Nível 1 — Básico consistente
HTML semântico, CSS e layout responsivo, JavaScript (tipos, funções, arrays, objetos, DOM, eventos), Python básico, Git local, SQL básico.
**Prova:** Projeto "Organizador pessoal de estudos" (ver seção 9).

### Nível 2 — Júnior (meta principal)
Aplicação full-stack pequena e completa, com testes, Git com histórico claro, README reproduzível e publicação. Consegue ler código alheio, reproduzir e corrigir um bug sem reescrever tudo, e receber uma mudança de requisito.
**Prova:** Projeto "Plataforma de acompanhamento de estudos" (ver seção 9).

### Nível 3 — Intermediário
Arquitetura em camadas, banco com transações e migrações, autenticação e autorização, testes de integração e de interface, CI executando de verdade, observabilidade básica, revisão de código, trabalho colaborativo real.

### Nível 4 — Avançado
Desempenho e escalabilidade, segurança aplicada, decisões de arquitetura com trade-offs documentados, infraestrutura como código, sistemas com IA reais (RAG, ferramentas, avaliação), liderança técnica de mudanças.

**Regra de avanço:** só passar de nível quando o aluno **resolveu sozinho** a prova do nível e **explicou** o que fez. Nunca avançar apenas por quantidade de aulas marcadas como concluídas.

---

## 4. Modo Mentor — como ensinar

### 4.1 Princípios
1. **Fale em português do Brasil**, com tom claro e acolhedor. Termos técnicos em inglês aparecem entre parênteses na primeira vez e são explicados no ponto de uso (glossário contextual).
2. **Uma ideia nova por vez.** Se a aula traz muitos conceitos (ex.: funções JS: parâmetros, retorno, escopo, callbacks, closures), divida em blocos pequenos com uma atividade entre eles.
3. **Prever antes de executar.** Peça que o aluno diga o que acha que vai acontecer antes de rodar o código.
4. **O aluno digita o código.** Não cole soluções completas de exercícios. Ajude com pistas.
5. **Erros são material de estudo.** Ensine a ler a mensagem de erro, localizar a linha e formular uma hipótese antes de oferecer a correção.
6. **Mostre execução visualmente** quando ajudar: tabela de valores a cada volta de um laço, diagrama de referências entre objetos, desenho de `JOIN`, sequência de uma requisição HTTP.
7. **Seja honesto sobre limites.** Simulações e autoavaliações do curso não comprovam domínio. Diga isso quando for relevante.

### 4.2 Escada de ajuda (use na ordem; só suba um degrau se o anterior não bastar)
1. **Pergunta:** "O que você esperava que acontecesse? O que aconteceu?"
2. **Direção:** aponte onde olhar (linha, arquivo, conceito da aula).
3. **Pista:** dê uma dica conceitual sem código.
4. **Exemplo análogo:** mostre um caso parecido, com dados diferentes.
5. **Esqueleto:** estrutura com lacunas para o aluno preencher.
6. **Solução comentada:** só depois de o aluno tentar de verdade, e peça que ele **reescreva sem olhar** logo em seguida.

Se o aluno pedir a resposta direta logo de início, explique em uma frase por que a escada existe e ofereça o degrau 3 ou 4. Se ele insistir depois de tentar, entregue, sem sermão, e adicione um exercício de transferência.

### 4.3 Estrutura de uma sessão
1. **Retomada (2–5 min):** uma pergunta sobre o que foi estudado antes (revisão espaçada).
2. **Aula guiada:** objetivo claro → exemplo → prática.
3. **Exercício de transferência:** mesmo conceito, contexto diferente.
4. **Fechamento:** o aluno explica com as próprias palavras o que aprendeu; registre dificuldades.

### 4.4 Verificação de domínio (separar "li" de "sei")
Quatro estados, nunca misturar:
- **Li** — leu a aula.
- **Pratiquei** — fez os exercícios.
- **Passei na revisão** — acertou checagem após alguns dias.
- **Resolvi sozinho** — resolveu um problema novo, com dados diferentes, sem consultar a solução, e explicou as decisões.

Só o quarto estado conta para avançar de nível. Quando o aluno errar, indique a aula exata a revisar e proponha uma **segunda tentativa diferente** (não o mesmo exercício).

### 4.5 Revisão de código do aluno
Ao revisar, nesta ordem: (1) o que está bom e por quê; (2) o defeito mais importante (um por vez); (3) pergunta que leve o aluno a descobrir a correção; (4) só então sugestão. Priorize: correção → legibilidade → nomes → organização → estilo.

### 4.6 Ritmo e motivação
- Prefira sessões curtas e frequentes a maratonas.
- Se o aluno estiver frustrado, reduza o escopo do problema, não o nível do vocabulário.
- Sugira pausa e retomada quando houver sinais de cansaço (erros repetidos por distração).

---

## 5. Modo Mantenedor — regras do código

### 5.1 Arquitetura atual (não mude sem pedido explícito)
- **Aplicação estática modularizada**: `index.html` contém a estrutura da página e carrega CSS e JavaScript de `assets/`. **Sem build, sem bundler, sem framework de frontend.** Na Vercel, `api/public-config.mjs` entrega somente configuração publicável do Clerk e Supabase; `api/labs/open-meteo.mjs` atende apenas à demonstração meteorológica isolada.
- Dependências externas apenas por CDN: Tailwind (`@tailwindcss/browser@4`), fontes Google (DM Sans, Space Grotesk) e ClerkJS quando o login estiver configurado.
- Tema escuro por padrão (`class="dark"`), `lang="pt-BR"`.
- Ícones SVG internos via `<symbol id="i-...">`.

Arquivos principais:

| Arquivo ou diretório | Função |
|---|---|
| `index.html` | Estrutura semântica, componentes fixos, ícones SVG e ordem de carregamento dos assets |
| `assets/css/global.css` | Estilos globais, componentes visuais e acessibilidade; o pequeno bloco `@theme` permanece no HTML porque o Tailwind Browser o processa como `text/tailwindcss` |
| `assets/js/data/resources.js` | Catálogo `R` de documentação, livros e vídeos |
| `assets/js/data/tracks.js` | `tracks`: trilhas → módulos → aulas (`id`, `title`, `modules[]`, `lessons[]` etc.) |
| `assets/js/data/lesson-guides/` | `LESSON_GUIDES` separado por trilha, com pré-requisitos, seções, exercícios e quizzes |
| `assets/js/data/projects.js` | `PROJECTS`, checks e associação dos guias às aulas |
| `assets/js/core/state.js` | Índices, `READINESS_EVIDENCE`, estado, sanitização e persistência |
| `assets/js/ui/render.js` | Renderização da navegação, progresso, módulos e aulas |
| `assets/js/ui/dialogs.js` | Leitores, diálogos, recursos e validação de projetos |
| `assets/js/app.js` | Eventos e inicialização da aplicação |
| `assets/js/auth.js` | Login opcional com Clerk e aviso de mudança de sessão para a sincronização |
| `assets/js/cloud.js` | Carregamento por conta Clerk e salvamento automático no Supabase |
| `api/public-config.mjs` | Função Vercel que expõe somente configuração pública ao navegador |
| `api/labs/open-meteo.mjs` | Função Vercel isolada para a demonstração pública do laboratório; reutiliza o contrato meteorológico, aceita coordenadas de referência fixas e não usa banco nem credenciais |

Os scripts são clássicos e compartilham o mesmo escopo global, carregados na ordem declarada em `index.html`. Não troque a ordem sem conferir as dependências e não converta para módulos ES sem aprovação, pois o projeto deve continuar abrindo diretamente no navegador e sem build.

Trilhas existentes: `html`, `javascript`, `python`, `database`, `ai`, `git-workflow`, `quality`, `delivery`.

> Os números atuais (9 trilhas, 28 módulos, 122 aulas, 490 exercícios, 366 questões, 24 projetos) foram conferidos no código em 27/10/2026. **Confira no código antes de citá-los** e atualize `contexto/ANALISE_TECH_LEARNING_HUB.md` e a `<meta name="description">` se mudarem.

### 5.2 Persistência e compatibilidade (cuidado máximo)
- O curso exige login Clerk antes de mostrar o conteúdo. O progresso persistente fica somente em `public.learning_state` no Supabase, protegido por RLS e vinculado ao ID Clerk. `state` permanece em memória durante a sessão. Ao trocar de conta, a interface aguarda a leitura da nova conta antes de aceitar edição.
- As antigas chaves `localStorage` podem existir em navegadores que usaram versões anteriores; o aplicativo atual não as lê, grava nem apaga automaticamente. Não confunda cache legado com autenticação ou RLS.
- `sanitizeState()` descarta qualquer progresso cujo id de aula/trilha/exercício **não exista mais**. Portanto:
  - **Nunca renomeie ou remova ids** de aulas, módulos, trilhas, projetos ou checks sem necessidade. Se for inevitável, escreva migração em `sanitizeState()` mapeando ids antigos para novos.
  - Ao adicionar campos ao estado, defina o valor padrão em `sanitizeState()`.
  - Se mudar o formato de modo incompatível, incremente `version` e documente a migração.
  - Mantenha os campos de revisão (`htmlCssRevision`, `javascriptRevision`, `pythonRevision`, `databaseRevision`, `aiRevision`) coerentes quando reescrever conteúdo de uma trilha.
- Falhas de leitura impedem editar o progresso da conta até nova tentativa. Falhas de escrita mantêm mudanças em memória, mostram o erro e tentam novamente; antes de fechar a página, o usuário deve ver a confirmação de salvamento.
- O desafio de mudança de requisito usa a estrutura existente `notes`, na chave `${lessonId}:requirement-change`, com limite de 2.000 caracteres. Preserve essa chave no `sanitizeState()`; ela não altera a versão do estado.

### 5.3 Segurança e robustez
- Todo texto vindo do aluno (anotações, projetos colados) deve ser **escapado** antes de entrar em `innerHTML`. Prefira `textContent`.
- Código de projetos do aluno roda **isolado** (iframe sandbox / funções isoladas). Não relaxe o isolamento.
- Nenhum segredo, chave de API, token ou dado pessoal real no repositório ou nos exemplos. Use dados fictícios.
- Links externos: `rel="noopener noreferrer"`; confira que a URL existe antes de adicionar ao catálogo `R`.

### 5.4 Acessibilidade (obrigatória)
Manter: link "Pular para as lições", foco visível (`:focus-visible`), navegação por teclado completa, `aria-*` coerentes nos botões de alternância e abas, rótulos em todos os campos, contraste adequado, respeito a `prefers-reduced-motion`. Ao criar componente novo, teste só com teclado.

### 5.5 Estilo de código
- JavaScript moderno sem dependências, funções pequenas e nomes em português quando forem do domínio do curso (`renderizarLista`), ou em inglês quando forem técnicos (`state`, `render`). **Siga o padrão do trecho vizinho.**
- Sem `eval` ou `new Function` novos fora do ponto já isolado dos projetos.
- Não introduza build, TypeScript, framework ou nova biblioteca sem aprovação explícita do dono do projeto.

### 5.6 Como entregar alterações
- **O dono do projeto prefere receber arquivos completos, não diffs parciais.** Para arquivos pequenos e médios (documentos, scripts, componentes isolados, exemplos de aula), entregue o arquivo inteiro e atualizado.
- Para o `index.html` (grande demais para reimprimir), **edite diretamente no repositório** e, ao final, informe: quais arquivos mudaram, o que mudou em uma frase por item e como verificar. Não deixe o arquivo em estado parcial ou quebrado.
- Mudanças grandes: faça em etapas pequenas, cada uma deixando o app funcional.
- Nunca apague conteúdo existente sem avisar. Prefira melhorar ou reorganizar.

### 5.7 Verificação antes de dizer "pronto"
Rode o que estiver disponível e **relate o resultado real** (inclusive falhas):

```bash
# Sintaxe, assets, ids, relações, conteúdo obrigatório e contagens
node scripts/validate-content.js
```

O validador também compila os exemplos rotulados como JavaScript e os scripts embutidos nos exemplos HTML, sem executá-los nem acessar serviços externos.

Checklist manual: seguir `docs/CHECKLIST_REGRESSAO.md`. No mínimo, abrir uma aula de cada trilha alterada, marcar/desmarcar conclusão, recarregar e confirmar persistência, navegar só pelo teclado e testar em largura de celular (≈ 375 px).

Se não conseguir executar uma verificação, **diga que não executou**. Nunca afirme que testou o que não testou.

---

## 6. Padrões de conteúdo (ao criar ou revisar aulas)

### 6.1 Modelo de aula
Toda aula deve ter, nesta ordem:
1. **Objetivo** observável ("ao final você consegue...").
2. **Pré-requisitos** realmente necessários, com link para a aula/preparação que os cobre.
3. **Preparação do ambiente** (ver 6.2) quando houver ferramenta nova.
4. **Conceito em blocos curtos**, cada um com exemplo executável.
5. **Resultado esperado visível** (saída, captura descrita ou comportamento) **antes** da solução.
6. **Prática com apoio decrescente** (ver 6.3).
7. **Erros comuns** e como reconhecê-los. Antes de corrigir, registre a mensagem completa ou o comportamento observado, a ação que veio antes e o resultado esperado; reproduza em cópia isolada e mude uma coisa por vez.
8. **Verificação** (quiz curto + exercício de transferência).
9. **Revisão:** o que lembrar e onde isso volta a aparecer.

### 6.2 Padrão para qualquer instalação ou configuração
**objetivo → requisitos → passos por sistema operacional (Windows / macOS / Linux) → verificação → resultado esperado → problemas comuns → como parar e retomar → alternativa para computador limitado.**

Regras:
- Cada passo diz **onde** digitar (editor? terminal? navegador?) e **qual pasta** deve estar aberta.
- Cada comando de verificação mostra a **saída esperada** (ex.: `python --version` → `Python 3.x.x`).
- Inclua o erro mais frequente e sua causa (ex.: "comando não encontrado" → PATH).
- Não dependa de link externo como única explicação. Links são complemento.
- Ferramentas pesadas (Docker, bancos servidores, IA local) devem ter caminho mínimo e **alternativa leve** (ex.: SQLite no lugar de PostgreSQL para o primeiro contato).

### 6.3 Progressão de exercícios
Em cada módulo, alterne e aumente a dificuldade:
**Guiado → com pistas → enunciado novo → mudança inesperada de requisito.**
Tipos obrigatórios por aula: *prever*, *alterar*, *construir*, *investigar erro*. `EXERCISE_STAGES` em `assets/js/data/lesson-guides.js` define instrução e critério observáveis para cada uma das quatro etapas; o validador exige essas etapas e pelo menos quatro exercícios com dicas por aula. A prática termina com uma mudança inesperada de requisito. Todo exercício informa **critérios de aceite** e **exemplo de entrada/saída** visíveis, separados da solução; o desafio final compara um comportamento preservado com outro alterado.

### 6.4 Projetos
Todo projeto tem: objetivo, pré-requisitos, entrega observável, `checks` verificáveis (preferir `mode: "auto"` quando possível), critérios de qualidade, e **uma mudança de requisito** ao final. Projetos devem **reutilizar** conhecimentos de módulos anteriores (revisão acumulativa).

### 6.5 Dados e dependências entre trilhas
- Todo uso de ferramenta de outra trilha deve apontar para a **preparação mínima** (ex.: "para esta aula, conclua a Preparação do servidor local; não é preciso estudar todo Python").
- Mantenha portas, nomes de banco e usuários **consistentes** entre laboratórios e projetos. Exemplo conhecido de inconsistência a corrigir: o laboratório Docker publica PostgreSQL na porta **55432**, mas o projeto relacional não cita essa porta nos comandos de conexão.
- Na trilha de dados, o caminho principal é **SQLite e PostgreSQL**; os demais motores (MariaDB, Firebird, MongoDB) ficam como aprofundamento.

### 6.6 Honestidade pedagógica
- Rotule o que é **simulação** e o que é **serviço real**. Percentuais de progresso medem acompanhamento, não domínio.
- Não afirme que um aluno "domina" algo com base em quiz de múltipla escolha.
- Não invente URLs, versões, comandos ou saídas. Se não tiver certeza, verifique (ou diga que não verificou).

---

## 7. Trilha de evolução recomendada (do zero ao júnior e além)

Sequência sugerida; use atalhos de pré-requisito em vez de reordenar tudo.

| Fase | Foco | Entrega que comprova |
|---|---|---|
| 0. Preparação | Computador, arquivos, editor, terminal, erros | Criar pasta, arquivo `.html` correto, abrir no navegador, rodar um comando e copiar um erro |
| 1. Web base | HTML semântico, CSS, layout responsivo | Página responsiva acessível, feita sem copiar |
| 2. Lógica | JavaScript: variáveis, condições, laços, funções, arrays, objetos | 10 problemas pequenos resolvidos sozinho |
| 3. Interfaces | DOM, eventos, `localStorage`, validação | **Organizador de estudos (nível básico)** |
| 4. Versionamento | Git local, branches, conflitos, README | Histórico compreensível no projeto da fase 3 |
| 5. Python e dados | Python, arquivos, JSON, funções, testes; SQL com SQLite | Relatório em Python + consultas de progresso |
| 6. Qualidade | Testes automatizados, reprodução de bugs, regressão, refatoração | Bug corrigido com teste que falhava antes |
| 7. Backend | HTTP, API, validação, regra de negócio, PostgreSQL via Docker, transações | API com persistência real e testes de integração |
| 8. Integração e entrega | Front ↔ API ↔ banco, CI, publicação, backup/restauração | **Plataforma de acompanhamento (nível júnior/intermediário)** |
| 9. Engenharia de IA | Prompts, RAG, ferramentas, avaliação, segurança | Sistema simples conectado a um modelo **real**, com avaliação |
| 10. Aprofundamento | Arquitetura, desempenho, segurança, observabilidade, colaboração real | Contribuição revisada por outra pessoa em projeto real |

A fase 7 (backend com persistência) é a **maior lacuna atual** do curso; priorize-a ao criar conteúdo novo.

---

## 8. Backlog de melhorias (prioridade de execução)

Vem da análise em `contexto/ANALISE_TECH_LEARNING_HUB.md`. Trabalhe de cima para baixo e marque aqui o que for concluído.

1. [x] **Etapa 0** de computador, arquivos, editor e terminal, disponível antes do primeiro exercício que dependa deles.
2. [x] **Mapa de pré-requisitos** e instruções de instalação por sistema (Python, Git, Node.js + npm, Docker/WSL, PostgreSQL, MariaDB, Firebird, MongoDB/`mongosh`), seguindo o padrão 6.2.
3. [x] **Resultado esperado visível** separado da solução em todos os exercícios; checkpoints distintos para *li / pratiquei / revisão / resolvi sozinho*.
   - [x] Os 490 exercícios exibem resultado esperado e critérios específicos; o validador exige critérios nas aulas revisadas.
   - [x] As aulas `prep-tools`, `prep-files`, `prep-workspace`, `prep-cycle`, `prep-errors`, as quatro instalações iniciais, `setup-docker`, `setup-docker-alternative`, `setup-postgresql`, as preparações opcionais de MariaDB, Firebird e MongoDB, `db-mariadb`, `db-firebird`, `db-mongo-crud`, `db-mongo-pipelines`, `db-nosql-models`, `db-performance`, `db-security`, `db-recovery`, `db-project`, `db-modeling`, `db-normalization`, `db-ddl-constraints`, `db-ddl-crud`, `db-select`, `db-aggregation`, `db-joins`, `db-subqueries-ctes`, `db-transactions`, `db-concurrency-boundaries`, `db-docker-basics`, `db-docker-compose`, `db-docker-operations`, `db-postgres` e `db-sqlite` iniciam os critérios específicos.
   - [x] As 13 aulas HTML/CSS contêm critérios nos 52 exercícios; 14 resultados foram revisados para que previsão, investigação e comparação não mostrem a conclusão antes da tentativa.
   - [x] As 14 aulas JavaScript contêm critérios nos 56 exercícios; 22 resultados foram revisados para preservar a previsão, investigação e diagnóstico antes da conclusão.
   - [x] As 12 aulas Python contêm critérios nos 48 exercícios; sete resultados foram revisados para preservar previsões e diagnósticos.
   - [x] As 18 aulas de IA contêm critérios nos 73 exercícios; 17 resultados foram revisados para preservar previsões, métricas e validações antes da conclusão.
   - [x] As seis aulas Git contêm critérios nos 24 exercícios; o resultado da busca no histórico não antecipa mais a linha literal.
   - [x] As seis aulas de Qualidade contêm critérios nos 24 exercícios; o resultado de diagnóstico evita antecipar qual valor demonstra coerção.
   - [x] As 14 aulas de Entrega contêm critérios nos 57 exercícios; previsões, resolução DNS, HTTPS, Preview, OAuth/OIDC e plano conceitual de domínio personalizado ficam verificáveis.
4. [x] **Projetos de fechamento** para as trilhas Git, Qualidade e Integração (entregas de laboratório; publicação real permanece nas fases posteriores).
5. [ ] **Sequência de backend com persistência**: interface → API → validação → regra de negócio → banco → resposta → testes → publicação.
   - [x] Laboratório `labs/backend-validation` demonstra validação no servidor com Node.js nativo, pedidos diretos inválidos e ausência de escrita após rejeição.
   - [x] Laboratório `labs/backend-layers` separa HTTP, validação, regra de negócio e repositório em memória sem adicionar dependências.
   - [x] Testes unitários de regra cobrem normalização do título, duplicidade e novo título sem iniciar servidor ou banco.
   - [x] Preparar migration PostgreSQL e interface assíncrona do repositório antes de conectar o driver.
   - [x] Conectar `pg` apenas em `labs/backend-layers`, com consultas parametrizadas, `.env.example` local e PostgreSQL Compose isolado na porta 55433.
   - [x] Criar aplicador de migrations numeradas, segunda migration de sessões e transação estudo + sessão com rollback demonstrável.
   - [x] Criar teste de integração PostgreSQL e testes unitários para migrations, repositório transacional e respostas HTTP.
   - [x] Confirmar que uma conexão PostgreSQL recusada retorna `500` genérico sem detalhes internos e que `start:memory` sinaliza dados temporários.
   - [x] Executar migrations e teste de integração em PostgreSQL real descartável; criação, unicidade, transação e persistência após reinício foram verificadas. O caminho Compose do laboratório também foi validado com PostgreSQL 17.
6. [ ] **CI, publicação e integração externa** como práticas guiadas e verificáveis (observar falha, corrigir, conferir URL final, voltar versão).
   - [x] Criar aulas sobre domínio, DNS, HTTPS/TLS e opções de hospedagem, com fontes oficiais, exemplos fictícios e práticas diagnósticas.
   - [x] Ensinar domínio personalizado e DNS com simulação detalhada: associação do projeto, A/AAAA/CNAME/TXT/NS, preservação de MX/TXT, verificação por camada e rollback, sem comprar ou validar domínio real.
   - [x] Ensinar OAuth 2.0/OIDC com Google via Clerk, callback versus retorno da aplicação, state/nonce, escopos mínimos e separação de sessão e RLS; o Preview `vercel.app` basta e domínio próprio não é necessário.
   - [x] Criar `labs/bug-investigation` com teste de regressão que falha antes e passa depois da correção; a execução red/green foi verificada em ambiente temporário.
   - [x] Automatizar um fluxo do navegador em Chromium headless, isolado ao laboratório de backend e sem depender de banco.
   - [x] Criar workflow real de GitHub Actions com validação, testes, PostgreSQL efêmero e Playwright; execução `40605904963` passou em `main`.
   - [x] Observar uma falha de asserção na branch temporária (`40606364491`), corrigi-la (`92fb73d`) e confirmar execução verde (`40606768881`); `main` permaneceu intacta.
   - [x] Integrar Open-Meteo no laboratório com contrato documentado, smoke real sem credenciais e testes simulados de rede, timeout, autenticação e resposta inválida.
   - [x] Publicar a página e a função da demonstração na Vercel (`43decdc`; deploy concluído).
   - [ ] Conferir a URL e o caminho do Preview da branch `testes` quando houver sessão Vercel autorizada; tela de login é registrada como proteção, sem exigir acesso anônimo nem desativá-la.
   - [x] Documentar o Instant Rollback da Vercel, seus limites por plano, o efeito na atribuição automática de domínios e a separação em relação aos dados do banco.
   - [x] Criar roteiro local de `pg_dump`/`pg_restore` para restaurar em uma base separada, sem alterar a origem; backups ficam ignorados pelo Git.
   - [~] Concluir as validações de recuperação: backup/restauração passou localmente via Docker Compose e no GitHub Actions; rollback real na Vercel aguarda acesso autenticado à conta.
7. [ ] Atividades gerais de conclusão (prova básica disponível no curso; intermediária pendente) — ver seção 9.
8. [x] Corrigir a inconsistência da porta do PostgreSQL (55432) entre laboratório Docker e projeto relacional.
9. [ ] Dividir aulas com excesso de conceitos (a aula de funções em JavaScript já foi dividida; mapear as demais).
10. [ ] Demonstrações visuais de execução (laços, referências, `JOIN`, requisições HTTP).
11. [ ] Revisão acumulativa e recuperação de dificuldades (indicar aula a revisar e segunda tentativa diferente).
12. [x] Persistir progresso e anotações automaticamente por conta no Supabase, sem depender de `localStorage`.
13. [ ] Modo de leitura prolongada (sumário, posição salva, ajustes de leitura).
14. [ ] Glossário contextual no ponto de uso.
15. [ ] Laboratório de leitura de projeto alheio (achar ponto de entrada e corrigir um defeito).
16. [ ] Ponte da IA simulada para IA conectada a um modelo real, com avaliações distintas.

---

## 9. Projetos de conclusão

### 9.1 Básico — "Organizador pessoal de estudos"
Entregas:
- Interface HTML/CSS responsiva com rótulos, foco visível e uso por teclado.
- Cadastro, edição, conclusão, exclusão e filtro de tarefas em JavaScript.
- Persistência após recarregar a página.
- Validação de campos e tratamento de lista vazia e dados inválidos.
- Repositório Git com histórico compreensível e README de execução.
- Testes das funções principais e roteiro manual da interface.

**Validação:** outra pessoa executa pelo README, confere os comportamentos e pede uma mudança simples (ex.: prioridade da tarefa). O aluno implementa e explica **sem consultar a solução de referência**.

Para a conclusão geral do curso, acrescentar (mesmo domínio, sem ligar à interface): relatório em Python lendo JSON e modelo SQLite com consultas de progresso.

### 9.2 Intermediário — "Plataforma de acompanhamento de estudos"
Só liberar **depois** do backlog 2, 5 e 6.

Entregas:
- Frontend conectado a uma API em linguagem de backend escolhida.
- PostgreSQL local com Docker e persistência real.
- Cursos, tarefas e sessões de estudo.
- Validação no servidor e respostas de erro coerentes.
- Consultas de relatório e uma transação com mais de uma alteração.
- Testes unitários, de integração com banco de teste e ao menos um fluxo no navegador.
- CI executada no repositório.
- Publicação de demonstração sem dados pessoais reais.
- Backup e restauração comprovados.
- README que reconstrói o ambiente.
- Mudança de requisito feita em branch, revisada e protegida por teste de regressão.

Extensão de IA (opcional): responder perguntas sobre um pequeno conjunto de materiais, citar fontes e reconhecer ausência de evidência. **Avaliar separadamente** a versão simulada e a conectada a modelo real.

**Avaliação final:** funcionamento + testes + explicação + manutenção. Uma aplicação que só funciona com a base inicial, não pode ser reconstruída ou quebra diante de requisito novo **não** comprova nível intermediário.

---

## 10. Limites e boas práticas para o agente

- Não faça o trabalho do aluno no lugar dele no modo mentor; ensine.
- Não invente fatos, links, versões ou resultados de execução. Diga "não verifiquei" quando for o caso.
- Peça confirmação antes de: remover conteúdo, renomear ids, mudar o formato do estado salvo, adicionar dependência ou introduzir build.
- Nunca exponha segredos, tokens ou dados pessoais. Nunca peça ao aluno para colá-los em lugar público.
- Se uma instrução do usuário prejudicar o aprendizado (ex.: "só me dê tudo pronto" repetidamente), diga isso com respeito, uma vez, e então respeite a decisão dele.
- Mantenha as respostas curtas quando a pergunta for simples; aprofunde apenas quando pedido ou quando o conceito exigir.
- Ao terminar qualquer tarefa de manutenção, informe: **o que mudou, como verificar, o que não foi testado e qual o próximo passo sugerido**.

---

## 11. Registro de decisões

> Anote aqui decisões que afetam o rumo do curso, uma linha cada: data — decisão — motivo.

- 2026-10-24 — Criado o `AGENTS.md` a partir da análise pedagógica do mesmo dia.
- 2026-10-25 — Preparado login Clerk no frontend estático, usando chave publicável via função Vercel; progresso permanece local até a integração segura com Supabase.
- 2026-10-26 — Preparada sincronização manual com Supabase e RLS por ID Clerk, preservando o estado local e pedindo confirmação antes de substituir progresso.
- 2026-10-26 — Bloqueado envio de progresso local após troca de conta; a cópia local precisa ser vinculada explicitamente ao usuário Clerk antes de subir ao Supabase.
- 2026-10-26 — Por pedido do dono do projeto, Supabase passou a ser a única fonte persistente; carga e envio são automáticos e controles de arquivo/local foram removidos.
- 2026-10-26 — A página passou a exigir autenticação Clerk e carregamento do progresso antes de liberar o conteúdo.
- 2026-10-26 — Troca de conta passa a carregar automaticamente o progresso remoto da nova conta, preservando cache local por usuário e exigindo escolha em caso de divergência.
- 2026-10-26 — A cópia remota passa a ser exibida mesmo com cache divergente; a versão local anterior permanece recuperável no navegador, sem baixar arquivo automaticamente.
- 2026-10-27 — O uso do projeto será somente por Preview, sem domínio próprio; ensinar domínio e DNS em detalhe com exemplos reservados, sem exigir configuração ou validação de domínio real.
- 2026-10-27 — Autorizado tornar os previews da Vercel públicos para testar a demonstração anonimamente; ajuste pendente de conexão autenticada à conta.
- 2026-10-27 — Aprovado `@playwright/test` somente em `labs/backend-layers` para automação de um fluxo de interface; o modo memória mantém o E2E separado da persistência PostgreSQL.

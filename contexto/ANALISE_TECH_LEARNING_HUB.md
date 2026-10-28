# Análise pedagógica do Tech Learning Hub

**Data da análise:** 24/10/2026  
**Aplicação analisada:** [`outputs/index.html`](outputs/index.html)  
**Público considerado:** pessoa totalmente leiga em programação  
**Escopo:** estrutura, pré-requisitos, instruções de ambiente, aulas, exercícios, projetos e critérios de progresso. Esta análise não substitui um teste de aprendizagem com alunos reais nem a instalação de todas as ferramentas.

## Conclusão

O Tech Learning Hub oferece um caminho de aprendizagem real, mas ainda não está totalmente preparado para conduzir uma pessoa absolutamente leiga até uma formação intermediária autônoma usando somente suas instruções. A preparação digital inicial foi implementada em 24/10/2026; as maiores lacunas restantes estão nas instalações das ferramentas, na progressão entre assuntos e na passagem dos exercícios isolados para aplicações completas.

A aplicação contém **9 trilhas, 28 módulos, 142 aulas, 590 exercícios, 450 questões e 24 projetos** (contagem atualizada em 28/10/2026 após acrescentar CSP e configuração segura). Esses números descrevem o material disponível; não medem domínio do aluno.

**Adendo de 27/10/2026:** a trilha Integração & Entrega ensina a distinguir registrador, provedor DNS e hospedagem; acompanhar resolvedor recursivo, servidor autoritativo, zona e delegação NS; interpretar registros `A`, `AAAA`, `CNAME`, `TXT`, `MX` e TTL; verificar HTTPS/TLS; comparar modelos de hospedagem; e usar o Preview existente da branch `testes`. Duas aulas detalham a resolução DNS e um plano conceitual de domínio personalizado, incluindo preservação de registros de e-mail, verificação por camada e rollback. Conforme decisão do dono, não é preciso comprar, configurar ou validar domínio real; os exemplos usam `.test` e marcadores não executáveis. `labs/deployment-static` aponta ao caminho da pasta no Preview existente, e uma barreira de login é classificada como proteção de acesso, sem ser tratada como erro DNS. A validação remota dos arquivos pode permanecer pendente se a proteção Vercel impedir acesso; isso não bloqueia a base conceitual.

**Adendo de 27/10/2026 — OAuth/OIDC:** a aula `delivery-oauth-google` detalha o fluxo navegador → Clerk → Google → callback Clerk → retorno ao Preview; diferencia OAuth 2.0 e OpenID Connect, autenticação e autorização, origem, callback e URL de retorno, consentimento e escopos mínimos. Explica `state` e `nonce` no fluxo gerenciado, diagnóstico conceitual de `redirect_uri_mismatch`, separação entre sessão Clerk, token Google e acesso Supabase/RLS, e nunca pede credenciais ou domínio próprio. O conteúdo usa documentação oficial do Clerk, Google, OpenID Foundation e Vercel; não altera nem valida credenciais de produção.

**Adendo de 27/10/2026 — Clerk, Supabase e RLS:** `delivery-clerk-supabase` acompanha o token de sessão Clerk até a validação de provedor de terceiros, lê o claim `sub` como ID textual, interpreta `USING`/`WITH CHECK` e combina grants com policies por operação. Analisa as chaves publicáveis e secretas no código REST atual e cria uma matriz conceitual para duas contas, falsificação de proprietário e operações negadas. A matriz é um plano de verificação; ela não afirma teste de isolamento em duas contas no banco remoto.

**Adendo de 27/10/2026 — modelagem de ameaças:** `delivery-threat-model` aplica decomposição, ativos, atores, entradas, fluxos, fronteiras de confiança, STRIDE, priorização e respostas a riscos ao fluxo real do projeto com exemplos fictícios. Cada ameaça deve ter controle e evidência observável; hipóteses e riscos residuais permanecem marcados. A aula usa OWASP Top 10 2025 como referência de conscientização, não como checklist completo ou garantia de segurança, e não executa ataques contra serviços publicados.

**Adendo de 27/10/2026 — OWASP e autorização por objeto:** `delivery-owasp-top10` lista as dez categorias OWASP Top 10 2025 e limita explicitamente seu uso a conscientização. `labs/security-basics` é uma API Node sem dependências, ligada a `127.0.0.1`, com sessões e registros fictícios; reproduz leitura e escrita BOLA/IDOR numa rota intencionalmente vulnerável, compara com checagem de dono no servidor e cobre os dois fluxos com testes positivos/negativos. Os seis testes locais passaram. A prática não publica a rota vulnerável, não usa domínio/Preview, não valida Supabase remoto e não afirma cobertura das demais categorias; outras falhas recebem laboratórios próprios posteriormente.

**Adendo de 28/10/2026 — XSS e saída por contexto:** `delivery-xss-output` explica fonte, sink, XSS refletido/armazenado/baseado em DOM, uso de `textContent` para texto e limites de codificação/sanitização/CSP. `labs/security-xss/demo.html.example` tem extensão não executável no deployment; o roteiro pede cópia temporária fora do repositório e demonstra somente uma alteração de aviso local. Os links oficiais OWASP e MDN foram consultados. A execução manual no navegador continua pendente porque a ferramenta de automação local do Windows falhou ao conectar; o conteúdo não afirma que a demonstração foi verificada.

**Adendo de 28/10/2026 — CSRF:** `delivery-csrf` modela cookie ambient e ação induzida, separa CORS de proteção e autorização, explica token, SameSite, Origin/Referer e Fetch Metadata, e analisa `cloudRequest` em `assets/js/cloud.js`. `labs/security-csrf` compara duas rotas locais com sessão/token fictícios; 7 testes de status e efeito passaram. Node define o cookie explicitamente: a prática não simula browser, SameSite, CORS real ou provedor. O trecho analisado obtém token Clerk e o anexa explicitamente no cabeçalho Bearer; configuração remota e outras rotas continuam sem validação. OWASP e MDN foram consultados; não houve chamadas remotas, teste de Preview ou domínio.

**Adendo de 28/10/2026 — abuso de API:** `delivery-api-abuse` distingue consumo irrestrito de recursos (API4:2023) de acesso excessivo a fluxos sensíveis (API6:2023); detalha limites por pedido, identidade, concorrência, quota e custo, respostas 413/429 e `Retry-After`, idempotência, observabilidade e testes determinísticos. A aula analisa os limites já existentes nos laboratórios backend sem classificá-los como rate limiter. Conforme decisão do dono, o site será usado apenas em Preview Vercel e não há domínio próprio; conceitos de DNS/publicação permanecem detalhados, mas não são necessários testes dependentes de domínio. A implementação de rate limiting e sua validação local seguem na Fase 7.4; não houve teste de carga nem chamada ao Preview.

**Adendo de 28/10/2026 — cadeia de suprimentos:** `delivery-supply-chain` explica A03:2025 e guia a inspeção estática de `package.json`, `package-lock.json` e CI do laboratório backend. Distingue dependências diretas/transitivas, `npm ci`, auditoria de vulnerabilidades conhecidas e limites dos scans; inclui origem, licença, manutenção, permissões, pipeline, atualização e rollback. OWASP PT-BR e documentação npm foram consultadas. Nenhuma instalação/atualização ou `npm audit` foi executada; o material não afirma estado de segurança das dependências.

**Adendo de 28/10/2026 — custos e portabilidade:** `delivery-hosting-models` ensina a estimar cada componente por período, unidade de cobrança, quota, excedente e comportamento no limite, usando cenários esperado/crescimento/pico e páginas oficiais atuais da Vercel, Supabase e Clerk. As definições de MAU/MRU não são presumidas equivalentes; os valores ficam fora do conteúdo permanente. O exercício inclui alertas/tetos, dependências proprietárias, custo de saída e ensaio de exportação/restauração sem substituir a origem. As páginas oficiais de preços, billing, uso e migração foram consultadas; não foram medidos gastos de produção nem executada migração real.

**Adendo de 28/10/2026 — recuperação e migração de fornecedor:** `labs/backend-layers/PROVIDER_MIGRATION.md` amplia o backup PostgreSQL local com inventário de roles, extensões, identidade Clerk, Redis, arquivos, configuração e um corte/retorno ensaiável. `delivery-ci` relaciona o dump testado a essa matriz e acrescenta uma mudança de janela que exige adiar o corte se o tempo medido exceder o limite. Fontes oficiais PostgreSQL, Supabase, Clerk e Node.js foram conferidas. A restauração automatizada local passou com dados fictícios e a integração do repositório passou na base restaurada; uma migração remota, de Clerk e de objetos do Supabase não foi executada.

**Adendo de 28/10/2026 — rollback e compatibilidade de schema:** `migrations/003_add_observacao_sessoes.sql` acrescenta uma coluna opcional, e `migration-compatibility.integration.test.cjs` executa o repositório anterior antes e depois da mudança, testa uma escrita com a coluna e volta a gravar com o contrato antigo. `delivery-ci` ensina rollback por novo commit `git revert` no Preview `testes`, mantém a migration expansiva e reserva remoção da coluna para uma contração futura. `DEPLOY_VERCEL.md` separa esse procedimento dos Instant Rollbacks de Production. Teste PostgreSQL real descartável e simulação de `git revert` foram verificados; rollback Vercel remoto aguarda acesso autenticado e não foi executado.

**Adendo de 28/10/2026 — runbook operacional:** `labs/backend-layers/RUNBOOK.md` separa deploy Preview, login Clerk, autorização/progresso Supabase e API PostgreSQL/Redis local; define evidências redigidas, limiares de incidente e critérios de recuperação sem tratar readiness local como saúde de serviço remoto. A aula `delivery-ci` acrescenta uma investigação de 403 e um quiz de classificação. Validação de conteúdo e testes locais são registrados no roadmap; não houve verificação autenticada do Preview nem de duas contas remotas nesta sessão.

## O que já funciona bem

- As aulas apresentam objetivos, conceitos, exemplos, prática, dicas, soluções e revisão.
- HTML começa explicando arquivo, navegador, tags, elementos, atributos e estrutura.
- JavaScript diferencia pontos difíceis para iniciantes: retornar e imprimir, texto e número, referência e cópia, erro HTTP e falha de rede.
- Python trabalha execução, tipos, arquivos, funções, organização, exceções e testes.
- Banco de Dados aborda modelagem e integridade antes de se limitar a comandos.
- Os exercícios incluem previsão, alteração, construção e investigação de erros.
- Os projetos trazem critérios e resultados esperados.
- As limitações de simulações e autoavaliações são informadas, especialmente em IA.

É possível aprender com esse material. O principal obstáculo para uma pessoa leiga é a quantidade de pressupostos entre uma explicação e a próxima ação que ela precisa executar.

## Onde uma pessoa totalmente leiga provavelmente vai travar

### Etapa inicial de alfabetização digital implementada

A lacuna original foi tratada pela trilha `preparacao`, disponível antes de HTML. Ela ensina e pratica:

- Diferença entre navegador, editor, terminal e interpretador.
- Como criar, localizar, renomear e salvar arquivos.
- Como visualizar extensões e evitar arquivos terminados em `.html.txt`.
- Como abrir uma pasta no editor e no terminal.
- Como reconhecer a pasta atual.
- Onde escrever código e onde executar comandos.
- Como salvar, executar, observar o resultado e encerrar um programa.
- Como copiar uma mensagem de erro e pedir ajuda com contexto.

Essas competências aparecem parcialmente espalhadas pelo curso. Devem estar disponíveis antes do primeiro exercício que depende delas.

### Há dependências fora da sequência sugerida

- JavaScript usa um servidor local baseado em Python nas aulas de armazenamento e módulos.
- A sequência profissional sugerida coloca Banco de Dados antes de Python, mas várias práticas de dados dependem de Python.
- O terminal é necessário em diferentes trilhas antes de receber uma introdução organizada na trilha de Git.
- Node.js é exigido em Qualidade e Integração, sem uma preparação equivalente à explicação posterior de ambientes virtuais em Python.

Não é necessário mudar toda a ordem. Um mapa de pré-requisitos pode oferecer atalhos: “Para esta aula, conclua primeiro a preparação X; não é necessário estudar toda a linguagem Y”.

## Instalação e configuração

As instruções ainda não estão completas para o público totalmente leigo.

| Ferramenta ou ambiente | Situação encontrada | Melhoria necessária |
|---|---|---|
| Editor e arquivos | Há orientações sobre texto simples, extensão e UTF-8. | Percurso guiado para instalar ou escolher o editor, abrir a pasta, salvar e localizar os arquivos. |
| Python | Explica verificação da versão, execução e diferença entre arquivo e REPL. | Instalação por sistema operacional, seleção do interpretador e resolução guiada de “comando não encontrado”. |
| Git | O uso local é bem explicado após a instalação. | Instalação orientada, abertura do terminal e primeira verificação com resultado esperado. |
| Node.js | As aulas começam pedindo uma versão atual instalada. | Explicar instalação, Node versus npm, verificação e diferença entre executar JavaScript no navegador e no terminal. |
| Docker | Conceitos, Compose, portas, volumes e diagnóstico estão bem trabalhados. | Detalhar caminhos de instalação, especialmente WSL e virtualização no Windows, e alternativas para quem não consegue executar Docker. |
| PostgreSQL e MariaDB | Existem passos de conexão e criação de banco. | Completar instalação, serviço, localização dos clientes e problemas frequentes. |
| Firebird | Informa requisitos de caminho, serviço e permissões. | Explicar como conferir esses requisitos; o iniciante pode não saber realizar o que o texto solicita. |
| MongoDB | A prática explica servidor, cliente e conexão. | Roteiro completo para instalar e iniciar o servidor e instalar o `mongosh`. O ambiente já conectado é pressuposto. |
| Serviços remotos | Repositório remoto, publicação e APIs reais são frequentemente opcionais. | Um percurso reproduzível para cada competência que o curso pretende certificar como praticada. |

A inconsistência entre a porta **55432** do laboratório Docker e o projeto relacional foi corrigida em 24/10/2026. O projeto agora declara `127.0.0.1:55432` nos comandos do cliente externo e explica a diferença para `db:5432` dentro da rede Compose.

Padrão recomendado para qualquer preparação de ambiente: **objetivo → requisitos → passos por sistema → verificação → resultado esperado → problemas comuns → como parar e retomar**. Links oficiais continuam úteis, mas não substituem essa explicação quando a proposta é permitir estudar sem depender de material externo.

## Melhorias didáticas e de avaliação

1. **Dividir aulas com muitos conceitos novos.** A aula de funções JavaScript reúne parâmetros, retorno, contratos, escopo, pureza, callbacks e closures. Pequenos blocos com uma atividade entre eles seriam mais assimiláveis.
2. **Adicionar demonstrações visuais de execução.** Tabelas com valores a cada volta de um laço, desenhos de referências entre objetos, exemplos visuais de `JOIN` e diagramas de requisição ajudariam. Aumentar apenas o texto não resolve toda dificuldade.
3. **Mostrar o resultado esperado antes da solução.** Nas atividades, o resultado esperado aparece dentro de “Ver solução comentada”. Enunciado, critérios e exemplos de saída devem ficar visíveis separadamente.
4. **Reduzir gradualmente a ajuda.** Começar com exercício guiado, seguir com pistas, depois um enunciado novo e finalmente uma mudança inesperada de requisito. A progressão ainda não é uniforme entre módulos.
5. **Separar progresso de domínio.** Marcar uma aula como concluída não exige demonstrar competência. Diferenciar “li”, “pratiquei”, “passei na revisão” e “resolvi sozinho”. Os percentuais atuais representam acompanhamento, não domínio comprovado.
6. **Ampliar a avaliação de transferência.** Três questões por aula ajudam a conferir conceitos, mas não demonstram capacidade de programar. É necessário resolver problemas com dados e contextos diferentes, explicar decisões e corrigir uma falha inédita.
7. **Executar publicação real após os projetos de laboratório.** Git, Qualidade e Integração já têm projetos de fechamento. O de Integração usa API local, verificações isoladas e plano de publicação; ainda falta conferir uma URL real, CI e recuperação em produção.
8. **Adicionar revisão acumulativa e recuperação de dificuldades.** Após alguns módulos, pedir uma tarefa que reutilize conhecimentos anteriores. Quando o aluno errar, indicar a aula a revisar e oferecer uma segunda tentativa diferente.

## Conteúdos e recursos que faltam

A maior lacuna curricular é uma sequência completa de **backend com persistência**. O aluno encontra interface, HTTP, servidores locais, SQL e segurança, mas não uma sequência igualmente consolidada que reúna:

**Interface → API → validação → regra de negócio → banco → resposta → testes → publicação.**

Essa ligação é indispensável para propor uma conclusão intermediária de aplicação completa sem cobrar conhecimentos não ensinados. Outros pontos:

- **Integração externa real:** ao menos um laboratório que evolua da simulação para um serviço real, com falhas e contrato documentados.
- **Testes automatizados de interface:** a trilha explica e pratica roteiros manuais; a automação de navegador fica para depois.
- **CI executada de fato:** configurar, observar uma falha e corrigir uma execução remota.
- **Publicação acompanhada:** publicar, conferir a URL final e recuperar uma versão anterior.
- **Colaboração real ou revisão independente:** documentos simulados ensinam o formato, mas não reproduzem todas as dificuldades de trabalhar com outra pessoa.
- **Leitura de projeto alheio:** localizar o ponto de entrada, entender arquivos existentes e corrigir um defeito sem reconstruir tudo.
- **Glossário contextual:** explicar termos como runtime, schema, callback, endpoint, mock e inferência no ponto de uso.
- **Exportação e recuperação de progresso:** o armazenamento local pode ser perdido; falta levar anotações e progresso para outro navegador.
- **Modo de leitura prolongada:** uma página de aula com sumário, posição salva e ajustes de leitura pode funcionar melhor que um modal para conteúdos extensos.
- **Alternativa para computadores limitados:** especialmente em Docker e IA, informar o caminho mínimo e as extensões que podem ficar para depois.

Na trilha de dados, manter todos os motores disponíveis, mas definir **SQLite e PostgreSQL como caminho principal**, deixando comparações com outros motores como aprofundamento. Isso concentra prática sem eliminar conteúdo.

Na trilha de IA, falta uma ponte entre os componentes simulados e um sistema efetivamente conectado a um modelo. Executar validadores e geradores simulados não demonstra, por si só, capacidade de operar RAG, MCP ou agentes reais.

## Nível esperado ao concluir o curso atual

Estimativa sob a premissa de que o aluno **executou as atividades, compreendeu as soluções e consegue explicar o próprio trabalho**, sem apenas marcar caixas ou copiar respostas:

| Trilha | Competência esperada | Limite da formação atual |
|---|---|---|
| HTML & CSS | Construir páginas semânticas, formulários, layouts responsivos e fazer verificações básicas de acessibilidade. **Básico sólido, com competências intermediárias iniciais.** | Pouca evidência sobre projetos maiores, manutenção extensa e avaliação aprofundada com tecnologias assistivas. |
| JavaScript | Implementar regras, manipular DOM, tratar eventos, persistir dados locais e trabalhar com operações assíncronas. **Básico sólido a intermediário inicial em aplicações pequenas.** | Não comprova domínio de aplicações grandes, ecossistema profissional ou arquitetura complexa. |
| Python | Criar scripts, trabalhar com arquivos, funções, classes, módulos, exceções e testes. **Básico sólido com recursos intermediários.** | Ainda não constitui formação completa em backend ou aplicações distribuídas. |
| Banco de Dados | Modelar problemas pequenos, escrever consultas, aplicar restrições e praticar transações e recuperação. **Básico sólido em SQL, intermediário inicial em tarefas selecionadas.** | Conhecer vários motores não significa dominá-los operacionalmente. |
| Docker | Subir um banco local com Compose, conectar, preservar dados e testar recuperação. **Básico operacional.** | Não equivale a administrar infraestrutura de produção. |
| Git & Colaboração | Trabalhar com commits, branches, conflitos e sincronização em laboratório. **Básico operacional consistente.** | Colaboração real e fluxos de hospedagem dependem de prática adicional. |
| Qualidade e manutenção | Escrever testes de regras, reproduzir falhas e acrescentar regressões. **Básico aplicado, com técnicas intermediárias pontuais.** | Automação de interface e CI real ainda não estão consolidadas como entregas obrigatórias. |
| Integração & Entrega | Entender HTTP, integrar formulários e reconhecer fronteiras de segurança e ambientes. **Básico aplicado.** | Publicação e persistência de ponta a ponta precisam de maior prática orientada. |
| Engenharia de IA | Explicar conceitos e implementar componentes locais de recuperação, validação, avaliação e controle de ferramentas. **Fundação conceitual ampla e prática introdutória de engenharia.** | Não comprova domínio intermediário de sistemas reais de IA, treinamento, RAG ou agentes em produção. |

O resultado geral esperado é uma **formação básica consistente, com competências intermediárias em problemas delimitados**. O aluno teria condições de construir projetos pequenos e assumir tarefas iniciais com orientação. A conclusão atual ainda não comprova autonomia de desenvolvedor júnior full-stack.

## Atividade geral de conclusão — nível básico

**Projeto: Organizador pessoal de estudos.**

O enunciado e a rubrica desta prova estão disponíveis no curso. O registro no navegador é autoavaliação; a capacidade do aluno só pode ser conferida na execução e revisão independentes dos artefatos.

Objetivo: construir uma ferramenta pequena e demonstrar fundamentos sem depender de uma solução pronta.

Entregas obrigatórias:

- Interface em HTML/CSS responsiva, com rótulos, foco visível e uso por teclado.
- Cadastro, edição, conclusão, exclusão e filtragem de tarefas com JavaScript.
- Persistência após recarregar a página.
- Validação de campos e tratamento de lista vazia e dados inválidos.
- Repositório Git com histórico compreensível e README de execução.
- Testes de funções principais e roteiro manual da interface.

Para uma conclusão **geral** do curso, acrescentar duas atividades pequenas usando o mesmo domínio: um relatório em Python com dados fornecidos em JSON e um modelo SQLite com consultas de progresso. Neste nível, não exigir conexão desses componentes à interface.

**Validação:** outra pessoa deve conseguir executar pelo README, verificar os comportamentos e pedir uma mudança simples, como adicionar uma prioridade. O aluno deve implementar a alteração e explicar o que modificou sem consultar a solução de referência.

## Atividade geral de conclusão — nível intermediário

**Projeto: Plataforma de acompanhamento de estudos, evoluindo a versão básica.**

Esta atividade deve vir **depois de completar as lacunas de backend, instalação e publicação**, para não cobrar competências ainda não ensinadas.

Entregas obrigatórias:

- Frontend conectado a uma API, usando uma linguagem de backend escolhida.
- Banco PostgreSQL local com Docker e persistência real.
- Cadastro e gerenciamento de cursos, tarefas e sessões de estudo.
- Validações no servidor e respostas de erro coerentes.
- Consultas de relatório e transação para uma operação que envolva mais de uma alteração.
- Testes unitários, de integração com banco de teste e de pelo menos um fluxo no navegador.
- CI executada no repositório.
- Publicação de demonstração, sem dados pessoais reais.
- Backup e restauração comprovados.
- README que permita reconstruir o ambiente.
- Mudança de requisito feita em branch, revisada e protegida por teste de regressão.

Como extensão de IA, o sistema pode responder perguntas sobre um pequeno conjunto de materiais, apresentar fontes e reconhecer ausência de evidência. **A versão simulada e a versão conectada a um modelo devem receber avaliações distintas.**

A avaliação final deve combinar funcionamento, testes, explicação e manutenção. Uma aplicação que funciona apenas com a base inicial, não pode ser reconstruída ou quebra ao receber um requisito novo ainda não demonstra domínio intermediário.

## Ordem recomendada para executar as melhorias

1. ~~Criar a etapa inicial de computador, arquivos, editor e terminal.~~ Concluído em 24/10/2026.
2. Corrigir o mapa de pré-requisitos e as instruções de instalação/configuração.
3. Separar resultados esperados das soluções e melhorar os checkpoints de domínio.
4. Executar publicação real e recuperação após os projetos finais de Git, Qualidade e Integração.
5. Ensinar a ligação completa entre interface, API e banco persistente.
6. Tornar CI, publicação e integração externa práticas guiadas e verificáveis.
7. ~~Introduzir o enunciado da conclusão básica.~~ Concluído em 25/10/2026; após as melhorias de integração, introduzir a conclusão intermediária e verificar a prova básica com alunos reais.

Essa ordem melhora mais a capacidade real de aprendizagem do que acrescentar novas trilhas neste momento.

**Adendo de 28/10/2026 — Redis:** três aulas introduzem critérios para decidir quando não usar Redis, cache-aside com TTL/invalidação e contadores com expiração. `labs/redis-fundamentals` oferece demonstrações locais descartáveis via Docker Compose, limitadas a loopback e com identidades/dados fictícios. Os scripts validam cache miss/hit, dado obsoleto, invalidação e contador de janela fixa. A fonte do cache é uma `Map` simulada: ainda não há integração com a API ou PostgreSQL, teste de indisponibilidade injetada, middleware HTTP nem medição comparativa de custo/latência. Esses limites não alteram a decisão de usar somente Preview; domínio próprio não é requisito.

**Adendo de 28/10/2026 — rotação de segredos e resposta inicial:** `delivery-secret-lifecycle` explica classificação de chaves Clerk/Supabase, inventário de consumidores/ambientes, rotação planejada versus revogação após suspeita de exposição e provas da chave nova/antiga. `delivery-audit-response` pratica linha do tempo, diferença entre audit log e log de aplicação, limites de cobertura, proteção de registros e contenção/recuperação com evidências redigidas. Cada aula tem conceito em blocos, glossário, resultado esperado, prática guiada, cinco exercícios resolvidos com critérios e dicas, quiz e transferência. A sequência essencial está no curso; fontes oficiais em inglês são opcionais e foram verificadas. Os exemplos são fictícios e não acessam painéis. O validador aprovou a estrutura e registra 136 aulas, 557 exercícios e 426 questões. Não houve teste com aluno real nem inspeção visual do navegador.


**Adendo de 28/10/2026 — fundamentos de LGPD:** quatro aulas autossuficientes cobrem (1) dados pessoais/sensíveis, tratamento, papéis e dez princípios; (2) as dez hipóteses do art. 7º e o conjunto próprio do art. 11; (3) retenção, arts. 15/16, direitos, verificação de identidade e cópias; (4) triagem de incidente, papéis e comunicação segundo regras atuais da ANPD. Cada aula tem quatro blocos conceituais com glossário, exemplo e resultado esperado, prática guiada, cinco exercícios resolvidos com critérios/pistas, quiz e segunda tentativa diferente. Cenários usam marcadores inventados; serviços externos não são necessários e links oficiais são complementares. Lei consolidada da Câmara e páginas/guias atuais da ANPD foram consultadas em 28/10/2026. `node scripts/validate-content.js`, `node --check` nos dados e `git diff --check` passaram: 140 aulas, 577 exercícios e 442 questões. Não houve teste com aluno real nem inspeção visual; navegação automatizada continua indisponível.


**Adendo de 28/10/2026 — inventário didático LGPD:** `labs/lgpd-data-rights/INVENTORY.md` mapeia finalidades, categorias, operações, agentes hipotéticos, destinos, cópias, revisão e respostas a pedidos em um caso totalmente fictício. Não atribui base legal ou prazo fixo, não exige instalação e inclui perguntas para escalar decisões. A aula `delivery-lgpd-rights-lifecycle` aponta para o inventário como extensão opcional; as tabelas internas continuam suficientes para estudar sem consultá-lo. Não houve teste com aluno real.

**Adendo de 28/10/2026 — laboratório executável de direitos:** `labs/lgpd-data-rights/server.cjs` demonstra GET/exportação, PATCH/correção e DELETE do perfil fictício e relações, com dois tokens públicos de demonstração, validação de entrada, status HTTP e estado somente em memória. Fixa o bind em `127.0.0.1`, usa somente módulos nativos e não toca nos serviços de conta/banco do projeto. O README ensina os conceitos de HTTP, JSON, autorização ilustrativa e limites, com passo a passo, respostas e desafios resolvidos; a aula conceitual permanece suficiente sem executar o laboratório. `node --test labs/lgpd-data-rights/server.test.cjs` passou 10/10, `node --check`, auditoria de carga e `git diff --check` passaram. Naquela etapa, o validador registrava 140 aulas, 578 exercícios e 442 questões. Não houve inspeção de navegador ou teste com aluno; nenhum resultado demonstra identidade real, cópias externas ou conformidade.

**Adendo de 28/10/2026 — A04 Cryptographic Failures:** `delivery-cryptography` diferencia hash geral, senha, cifra reversível, Base64, TLS, integridade autenticada e gestão de chaves em quatro blocos com glossário, exemplos, prática guiada, seis exercícios resolvidos, quiz e transferência. `labs/security-crypto` usa só Node `crypto` e texto fictício para ilustrar AES-256-GCM, envelope/IV/tag, recusa de alteração e os limites da chave efêmera; sete testes locais passaram. As referências OWASP e Node oficiais foram abertas e são opcionais; conceitos e respostas estão no curso. Não há armazenamento, autenticação, gestão de chave em produção, dado real ou teste com aluno.

**Adendo de 28/10/2026 — A02 e CSP:** `delivery-security-misconfiguration` começa por pedido/resposta HTTP, status, MIME e cabeçalho, depois ensina origem, diretivas CSP, `Report-Only`, inventário, compatibilidade e rollback em quatro blocos com glossário, demonstração, quatro passos guiados, seis exercícios resolvidos e quiz. Os links W3C/OWASP/MDN são opcionais; as definições e respostas permanecem no curso. `labs/security-misconfiguration` só escuta em loopback, usa conteúdo fixo sem entrada ou recursos remotos e compara políticas amplas/restritas; 5 testes locais passaram. Eles verificam cabeçalhos e respostas HTTP, não aplicam CSP num navegador nem validam o Preview. Nenhuma política CSP foi adicionada ao site real; a revisão de compatibilidade segue pendente.

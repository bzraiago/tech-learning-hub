# Roadmap de evolução — Tech Learning Hub

**Início do acompanhamento:** 24/10/2026

**Objetivo:** transformar o Tech Learning Hub em um percurso autoguiado, reproduzível e verificável que leve uma pessoa sem conhecimento prévio ao nível júnior e ofereça continuidade até os níveis intermediário e avançado.

**Fonte inicial:** `AGENTS.md` e `contexto/ANALISE_TECH_LEARNING_HUB.md`.

> Este roadmap acompanha a evolução do produto e do conteúdo. Marcar uma implementação como concluída significa que ela passou pelos critérios de aceite e pelas verificações indicadas. Isso não significa, por si só, que um aluno dominou a competência.

## Como usar este arquivo

Estados:

- `[ ]` Não iniciado
- `[~]` Em andamento
- `[x]` Concluído e verificado
- `[!]` Bloqueado — registrar o motivo no histórico

Ao concluir um item:

1. Conferir todos os critérios de aceite do item.
2. Executar as verificações automatizadas e manuais aplicáveis.
3. Atualizar os números do curso quando a estrutura mudar.
4. Marcar o item e suas subtarefas com `[x]`.
5. Registrar a data, o commit e um resumo no histórico deste arquivo.
6. Atualizar também o backlog do `AGENTS.md`, quando houver item equivalente.

## Definição global de pronto

Toda implementação só pode ser considerada pronta quando:

- [ ] Mantém os ids existentes ou inclui migração compatível em `sanitizeState()`.
- [ ] Permite ler o curso sem `localStorage` e salva progresso da conta somente no Supabase.
- [ ] Não introduz dados pessoais, segredos ou execução insegura de código do aluno.
- [ ] Mantém navegação por teclado, foco visível, rótulos e atributos `aria-*` coerentes.
- [ ] Respeita `prefers-reduced-motion` e funciona em aproximadamente 375 px de largura.
- [ ] Possui linguagem adequada a iniciantes e explica termos técnicos no ponto de uso.
- [ ] Mostra resultado esperado, critérios de aceite e exemplo antes da solução.
- [ ] Informa o que é simulação e o que usa serviço real.
- [ ] Passa na checagem de sintaxe JavaScript e nas verificações de consistência de conteúdo.
- [ ] Foi aberta e conferida manualmente ao menos uma aula de cada trilha alterada.
- [ ] Teve marcação de progresso, recarga e persistência verificadas quando o estado foi afetado.
- [ ] Teve as fontes externas novas ou alteradas realmente verificadas.
- [ ] Registra o que não foi possível testar.

## Visão geral

| Fase | Resultado principal | Dependências | Estado |
|---|---|---|---|
| 0 | Base de medição e proteção do projeto | — | [x] |
| 1 | Preparação digital antes das trilhas | Fase 0 | [x] |
| 2 | Pré-requisitos e ambientes reproduzíveis | Fase 1 | [x] |
| 3 | Aulas e exercícios com progressão verificável | Fase 2 | [ ] |
| 4 | Avaliação de domínio e recuperação | Fase 3 | [ ] |
| 5 | Projetos de fechamento e nível básico | Fase 4 | [ ] |
| 6 | Backend completo com persistência | Fases 2 e 5 | [ ] |
| 7 | Qualidade, CI, publicação e integração real | Fase 6 | [ ] |
| 8 | Conclusão júnior/intermediária | Fase 7 | [ ] |
| 9 | Experiência de estudo e portabilidade | Fases 3 e 4 | [ ] |
| 10 | Engenharia de IA conectada e avaliada | Fases 7 e 8 | [ ] |
| 11 | Validação final com alunos | Todas as fases aplicáveis | [ ] |

---

## Fase 0 — Base de medição e proteção

**Meta:** conhecer o estado real do curso e impedir regressões estruturais durante as melhorias.

- [x] Criar verificador de consistência do conteúdo.
  - [x] Detectar ids duplicados de trilha, módulo, aula, projeto e check.
  - [x] Confirmar correspondência entre aulas de `tracks` e `LESSON_GUIDES`.
  - [x] Confirmar que toda aula contém exercícios, quiz e soluções.
  - [x] Contar trilhas, módulos, aulas, exercícios, questões e projetos diretamente do código.
- [x] Documentar o procedimento de checagem de sintaxe do JavaScript.
- [x] Criar uma lista manual de regressão para desktop, largura móvel, teclado e persistência.
- [x] Registrar uma linha de base dos números atuais do curso.
- [x] Conferir e, se necessário, atualizar a descrição em `<meta name="description">`.

**Aceite:** uma alteração estrutural inválida é detectada antes da publicação; os números divulgados são derivados do código e têm data de conferência.

## Fase 1 — Etapa 0: alfabetização digital

**Meta:** permitir que uma pessoa totalmente leiga chegue ao primeiro exercício sabendo onde criar, escrever, executar e observar.

- [x] Criar uma Etapa 0 acessível antes de qualquer trilha.
- [x] Ensinar pastas, arquivos, nomes e extensões visíveis.
- [x] Explicar editor, navegador, terminal e interpretador.
- [x] Ensinar a abrir a mesma pasta no editor e no terminal.
- [x] Ensinar a reconhecer a pasta atual.
- [x] Praticar o ciclo salvar → executar → observar → encerrar.
- [x] Ensinar a copiar uma mensagem de erro com comando, contexto e linha relevante.
- [x] Incluir passos para Windows, macOS e Linux.
- [x] Incluir alternativa mínima para computador limitado.
- [x] Criar uma prova prática curta da Etapa 0.

**Aceite:** o aluno cria uma pasta e um arquivo `.html` correto, abre-o no navegador, executa um comando no terminal e registra um erro com contexto sem depender de uma solução pronta.

## Fase 2 — Pré-requisitos e ambientes reproduzíveis

**Meta:** remover dependências implícitas e tornar cada ferramenta instalável, verificável e retomável.

- [x] Criar mapa explícito de pré-requisitos entre trilhas, módulos e aulas.
- [x] Adicionar atalhos de preparação mínima sem obrigar o estudo antecipado de uma trilha inteira.
- [x] Criar preparação de editor e arquivos por sistema operacional.
- [x] Criar preparação de Python e seleção do interpretador.
- [x] Criar preparação de Git e primeiro repositório local.
- [x] Criar preparação de Node.js e npm, distinguindo navegador e terminal.
- [x] Criar preparação de Docker, WSL e virtualização no Windows.
- [x] Criar alternativa leve para práticas que usam Docker.
- [x] Criar preparação de PostgreSQL e clientes de conexão.
- [x] Criar preparação de MariaDB.
- [x] Criar preparação de Firebird.
- [x] Criar preparação de MongoDB e `mongosh`.
- [x] Padronizar cada preparação: objetivo → requisitos → passos por sistema → verificação → saída esperada → problemas comuns → parar e retomar → alternativa leve.
- [x] Definir SQLite e PostgreSQL como caminho principal da trilha de dados.
- [x] Posicionar MariaDB, Firebird e MongoDB como aprofundamentos explícitos.
- [x] Corrigir a inconsistência da porta PostgreSQL `55432` entre o laboratório Docker e o projeto relacional.
- [x] Revisar portas, bancos, usuários e nomes usados entre todos os laboratórios e projetos.

**Aceite:** nenhuma aula exige silenciosamente terminal, runtime, servidor, cliente ou banco ainda não preparado; cada comando informa onde executá-lo, em qual pasta e qual saída esperar.

## Fase 3 — Aulas e exercícios com progressão verificável

**Meta:** reduzir carga cognitiva e fazer cada aula alternar explicação, previsão, execução e prática.

- [ ] Padronizar aulas na ordem definida no `AGENTS.md`.
- [ ] Tornar todos os objetivos observáveis.
- [ ] Separar resultado esperado e critérios de aceite das soluções ocultas.
  - [x] Exibir antes do rascunho o resultado esperado já existente nos 458 exercícios; detalhar critérios específicos continua pendente.
  - [x] Detalhar critérios observáveis nos quatro exercícios de `prep-tools`, sem expor as respostas nos resultados visíveis.
  - [x] Detalhar critérios observáveis nos quatro exercícios de `prep-files` e preservar a investigação antes da dica.
  - [ ] Revisar os demais resultados esperados para evitar respostas antecipadas e completar critérios específicos por aula.
- [ ] Garantir exemplos executáveis com saída ou comportamento visível.
- [ ] Aplicar a progressão guiado → pistas → problema novo → mudança de requisito.
- [ ] Garantir, em cada aula, atividades de prever, alterar, construir e investigar erro.
- [ ] Adicionar erros comuns e como reconhecê-los pela mensagem ou comportamento.
- [ ] Adicionar exercício de transferência em contexto diferente.
- [x] Dividir a aula de funções JavaScript em blocos menores com prática intermediária.
- [x] Mapear outras aulas com mais de quatro conceitos centrais sem prática intermediária.
  - [x] Prioridade 1: dividir ou intercalar prática nas cinco aulas fundamentais de banco.
    - [x] `db-modeling`: separar entidades/relacionamentos de normalização/ausência.
    - [x] `db-ddl-crud`: separar estrutura/restrições de manipulação segura.
    - [x] `db-select`: separar filtros/`NULL` de agregações/agrupamentos.
    - [x] `db-joins`: separar junções/granularidade de subconsultas/CTEs.
    - [x] `db-transactions`: separar unidade transacional de concorrência, repetição e efeitos externos.
  - [x] Prioridade 2: revisar as dez aulas avançadas de banco mapeadas com seis seções.
    - [x] `db-docker-basics`: reduzir sobreposição com a preparação Docker e intercalar diagnóstico com os conceitos essenciais.
    - [x] `db-docker-compose`: organizar configuração, conexão e persistência sem pressupor cliente externo já instalado.
    - [x] `db-docker-operations`: reunir diagnóstico e ciclo de vida, explicitar retomada após o exemplo e concentrar fontes de backup/restauração.
    - [x] `db-mongo-crud`: ligar à preparação MongoDB e organizar leitura, escrita segura e modelagem em quatro blocos.
    - [x] `db-mongo-pipelines`: organizar validação, transformação e observação de índices sem repetir os conceitos em seis blocos.
    - [x] `db-performance`: ligar ao laboratório PostgreSQL 17 e separar hipótese, medição, escolha do índice e correção.
    - [x] `db-nosql-models`: partir de perguntas de acesso e registrar escolhas sem sugerir instalação de quatro motores.
    - [x] `db-project`: alinhar o projeto SQLite à decisão de banco, explicitar regra ainda não garantida e tornar a entrega verificável.
    - [x] `db-recovery`: organizar metas, restauração, retenção e migração segura em um ensaio verificável.
    - [x] `db-security`: separar parametrização, autorização, escopo de alteração e fronteira operacional.
  - [x] Prioridade 3: revisar 11 aulas de HTML/JavaScript e distinguir aprofundamento legítimo de sobrecarga.
    - [x] `html-accessibility`: reunir conteúdo, navegação e revisão em quatro blocos; explicitar previsão, alteração, construção e investigação de erro.
    - [x] `html-tables`: organizar escolha dos dados, marcação, mesclagens e conferência em quatro blocos com quatro tipos de prática.
    - [x] `html-forms`: reunir controles e agrupamentos, explicitar quatro tipos de prática e preservar o aviso de envio demonstrativo.
    - [x] `html-links-media`: reunir caminhos e destinos em um bloco, mantendo imagens e mídia em blocos próprios e explicitando quatro tipos de prática.
    - [x] `html-semantic`: inserir pausas de previsão e prática entre os fundamentos, reunir conteúdo e regiões e explicitar quatro tipos de exercício.
    - [x] `js-values`: intercalar previsão e execução nos fundamentos, reunir ausência e comparação e explicitar quatro tipos de exercício.
    - [x] `js-flow`: intercalar rastreamento de condições e laços, marcar sintaxes alternativas como aprofundamento e explicitar quatro tipos de exercício.
    - [x] `js-arrays`: introduzir mapa de referências e pausas de previsão, reunir operações e verificação e explicitar quatro tipos de exercício.
    - [x] `js-es6`: reunir extração e cópias, intercalar previsões sobre retorno, referências e valores ausentes e explicitar quatro tipos de exercício.
    - [x] `js-debug`: reunir diagnóstico e testes em quatro blocos, praticar hipótese antes da correção e explicitar quatro tipos de exercício.
    - [x] `js-modules`: ligar o laboratório à preparação do servidor local, reunir teste e diagnóstico e explicitar quatro tipos de exercício.
  - [x] Prioridade 4: revisar 15 aulas de IA/Entrega, preservando o nível avançado quando os pré-requisitos forem suficientes.
    - [x] `delivery-http`: manter cinco etapas do contrato HTTP com práticas intermediárias, explicitar a preparação Node e corrigir a solução da rota por ID.
    - [x] `delivery-forms`: preservar as etapas da integração, adicionar GET da coleção ao laboratório e verificar que POST inválido não altera os dados.
    - [x] `delivery-security`: distinguir 401 e 403 na simulação, reforçar fronteiras de autorização e praticar previsão, alteração, construção e diagnóstico.
    - [x] `delivery-environments`: relacionar publicação em subpasta aos caminhos reais dos assets e explicitar os limites de uma API local.
    - [x] `delivery-ci`: praticar falha e recuperação de teste local, distinguir essa execução de CI remota e registrar evidências de incidente.
    - [x] `delivery-requirements`: transformar pedidos em critérios observáveis e corrigir o README para separar regra isolada de integração ainda pendente na API.
    - [x] `ai-llms`: intercalar previsão e prática nos fundamentos, distinguir simulação de modelo real e explicitar os quatro tipos de exercício.
    - [x] `ai-prompts`: separar erros da função de abstenção por modelo, praticar desenho de prompt e avaliação com casos reservados.
    - [x] `ai-system`: exercitar filtro de evidências antes da montagem de contexto e distinguir memória externa de treinamento.
    - [x] `ai-data`: verificar origem e acesso herdados pelos chunks e planejar troca de versão sem resultados antigos.
    - [x] `ai-embeddings`: intercalar cálculos de cosseno e recuperação com decisões sobre relevância e acesso, sem atribuir semântica aos vetores fictícios.
    - [x] `ai-rag`: distinguir busca lexical vazia de ausência comprovada de evidência, verificar acesso e separar citação válida de suporte factual.
    - [x] `ai-skills`: criar um exemplo de `SKILL.md` com escopo e autorização explícitos, testar o validador local e distinguir instruções de execução real.
    - [x] `ai-workflows`: intercalar previsões na máquina de estados, praticar cancelamento e eventos atrasados e delimitar o tratamento textual de timeout.
    - [x] `ai-capstone`: ligar o exemplo ao projeto completo, intercalar previsões e separar teste de contrato de avaliação factual.
- [x] Dividir ou reorganizar as aulas identificadas sem renomear ids existentes; observar com alunos as 15 aulas que mantiveram cinco seções.
- [x] Adicionar demonstrações visuais de laços com rastreamento de `for` e `while` em `js-flow`.
- [x] Adicionar diagramas de referências e cópias rasas em `js-arrays` e `js-es6`.
- [x] Adicionar visualização de consultas e `JOIN` em `db-joins`, da condição `ON` ao resultado e à contagem.
- [x] Adicionar sequência visual de uma requisição HTTP em `delivery-http`, com método, rota, decisão do servidor, status, cabeçalho e corpo.
- [x] Criar glossário contextual nas seções que introduzem runtime, schema, callback, endpoint, mock e inferência.

**Aceite:** cada aula alterada permite prever antes de executar, observar o resultado esperado, praticar com ajuda decrescente e resolver uma tarefa nova.

## Fase 4 — Avaliação de domínio e recuperação

**Meta:** separar consumo de conteúdo de capacidade demonstrada.

- [x] Implementar os estados `Li`, `Pratiquei`, `Passei na revisão` e `Resolvi sozinho` na aula, com autoavaliação e critérios explícitos.
- [x] Atualizar `state` e `sanitizeState()` com `learningEvidence` aditivo, valores padrão e preservação de `completed`.
- [x] Explicar na interface que progresso mede acompanhamento, não domínio.
- [x] Criar fila de revisões espaçadas três dias após a prática, com acesso direto à aula e confirmação pelo quiz.
- [x] Criar recuperação ativa do módulo anterior na primeira aula de cada módulo posterior, com rascunho salvo e retorno à aula de origem.
- [x] Associar cada erro de quiz à aula que o contém e oferecer acesso direto aos conceitos dessa aula.
- [x] Oferecer uma segunda tentativa diferente, sem repetir o mesmo exercício.
  - [x] Preparação digital: cinco casos novos com critério de aceite, pista e rascunho persistente após erro no quiz.
  - [x] Ambientes essenciais: dez casos novos de instalação, diagnóstico ou retomada, incluindo as alternativas leves.
  - [x] HTML e CSS: treze casos novos com resultado esperado e pista após erro no quiz.
  - [x] JavaScript: quatorze casos novos, da lógica e funções até DOM, armazenamento, requisições e módulos.
  - [x] Python: doze casos novos, dos tipos e coleções até arquivos, testes e consumo de serviços.
  - [x] Banco de dados: 24 casos novos, de modelagem e SQL a operação, segurança e recuperação.
  - [x] Git e fluxo de trabalho: seis casos novos, do primeiro commit à revisão de mudança.
  - [x] Qualidade: seis casos novos sobre testes, interface, CI, depuração, refatoração e revisão.
  - [x] Integração e entrega: seis casos novos sobre HTTP, formulários, acesso, ambientes, CI e requisitos.
  - [x] Engenharia de IA: dezoito casos novos, de modelos e prompts a avaliação, segurança e projeto final.
  - [x] Expandir as segundas tentativas para as demais aulas (114 de 114 guias).
- [ ] Exigir explicação das decisões nas provas de nível.
  - [x] Exigir explicação das decisões e da verificação ao registrar os 20 projetos existentes naquela etapa, preservando entregas anteriores; os projetos de fechamento usam o mesmo registro.
  - [ ] Aplicar a exigência às provas de nível quando os projetos de conclusão forem criados na fase 5.
- [x] Evitar que quiz de múltipla escolha seja tratado como comprovação prática: contagens separadas para conceitos, prática, revisão e problema novo, com feedback explícito.
- [ ] Criar evidências observáveis para passagem entre os níveis 0, 1, 2, 3 e 4.
  - [x] Exibir no curso entregas e critérios de verificação para cada nível, sem confundir acompanhamento com certificação.
  - [x] Disponibilizar a prova básica com registro de entrega, rubrica e explicação, sem liberar nível automaticamente.
  - [ ] Integrar as demais provas práticas ao registro de evidências quando os projetos de conclusão e as atividades de aprofundamento estiverem disponíveis.

**Aceite:** o sistema distingue claramente leitura, prática, retenção e resolução autônoma; só `Resolvi sozinho`, com problema novo e explicação, conta como evidência de avanço.

## Fase 5 — Projetos de fechamento e conclusão básica

**Meta:** integrar conhecimentos em entregas observáveis antes de avançar para backend completo.

- [x] Criar projeto de fechamento da trilha Git e Colaboração: issue, branch, histórico, remoto local, README, revisão e novo requisito.
- [x] Criar projeto de fechamento da trilha Qualidade e Manutenção: defeito reproduzido, teste vermelho→verde, refatoração e revisão de interface.
- [x] Criar projeto de fechamento da trilha Integração e Entrega: adaptador testável, API e interface locais, falhas, novo requisito e plano de publicação.
- [x] Garantir objetivo, pré-requisitos, entrega, checks, qualidade e mudança de requisito nos três projetos de fechamento.
- [x] Usar checks automáticos nos contratos JavaScript de Qualidade e Integração; manter histórico Git, interface e execução local como verificações manuais identificadas.
- [x] Criar o projeto de nível básico “Organizador pessoal de estudos” com enunciado e critérios observáveis.
  - [x] Exigir interface responsiva, acessível e utilizável por teclado.
  - [x] Exigir cadastro, edição, conclusão, exclusão e filtro de tarefas.
  - [x] Exigir persistência e tratamento de dados inválidos.
  - [x] Exigir histórico Git compreensível e README reproduzível.
  - [x] Exigir testes das funções principais e roteiro manual da interface.
  - [x] Exigir relatório Python lendo JSON.
  - [x] Exigir modelo SQLite e consultas de progresso.
  - [x] Exigir mudança simples de requisito solicitada após a entrega inicial.
- [x] Criar rubrica que avalie funcionamento, explicação e manutenção; o registro continua sendo autoavaliação, sem certificação automática.

**Aceite:** outra pessoa executa o projeto pelo README e o aluno implementa uma mudança simples, explica as decisões e não consulta uma solução de referência.

## Fase 6 — Backend completo com persistência

**Meta:** fechar a maior lacuna curricular com uma sequência ponta a ponta.

- [x] Definir Node.js com bibliotecas nativas como caminho inicial do backend; avançar para PostgreSQL após o contrato HTTP e a validação.
- [x] Ensinar interface → requisição HTTP → API com o laboratório executável `labs/backend-http` e teste de contrato.
- [ ] Ensinar validação de entrada no servidor.
- [ ] Separar validação, regra de negócio e acesso a dados.
- [ ] Persistir dados em PostgreSQL.
- [ ] Ensinar respostas de sucesso e erro coerentes.
- [ ] Ensinar migrações e evolução do esquema.
- [ ] Ensinar transação com mais de uma alteração.
- [ ] Criar testes unitários da regra de negócio.
- [ ] Criar testes de integração com banco de teste.
- [ ] Integrar o frontend real à API.
- [ ] Documentar configuração, inicialização, parada e retomada do ambiente.
- [ ] Proteger exemplos contra segredos e dados pessoais reais.

**Aceite:** o aluno constrói e explica um fluxo completo da interface ao banco e de volta, incluindo validação, regra, erro, persistência e testes.

## Fase 7 — Qualidade, CI, publicação e integração real

**Meta:** transformar conceitos de entrega em práticas executadas e recuperáveis.

- [ ] Criar laboratório de reprodução de bug em código alheio.
- [ ] Exigir teste que falha antes da correção e passa depois dela.
- [ ] Criar ao menos um teste automatizado de fluxo no navegador.
- [ ] Configurar CI em um repositório real.
- [ ] Observar uma falha de CI e corrigi-la.
- [ ] Integrar ao menos um serviço externo real com contrato documentado.
- [ ] Simular falhas de rede, autenticação e resposta inválida sem expor credenciais.
- [ ] Publicar uma aplicação de demonstração.
- [ ] Conferir a URL final e o comportamento publicado.
- [ ] Ensinar rollback para uma versão anterior.
- [ ] Executar e comprovar backup e restauração.
- [ ] Criar prática real ou revisão independente de colaboração.

### Fase 7.1 — Fundamentos de internet, hospedagem e DNS

- [ ] Explicar cliente, servidor, hospedagem, região, CDN, domínio, registrador e provedor DNS.
- [ ] Ensinar resolução DNS com registros `A`, `AAAA`, `CNAME` e `TXT`, TTL e propagação.
- [ ] Explicar HTTPS, certificado TLS e redirecionamento de HTTP para HTTPS.
- [ ] Comparar publicação estática, funções serverless, servidor persistente e serviço gerenciado.
- [ ] Publicar uma página mínima na Vercel e verificar URL, status HTTP e HTTPS.
- [ ] Conectar um domínio de laboratório, validar registros DNS e documentar como desfazer a configuração.

### Fase 7.2 — Stack guiada de referência

- [ ] Criar um projeto integrador guiado usando Vercel, Clerk e Supabase, sem tratar os fornecedores como única solução possível.
- [ ] Preparar contas, projeto local e variáveis separadas para desenvolvimento, prévia e produção.
- [ ] Implementar cadastro, login, logout, sessão expirada e estado de carregamento com Clerk.
  - [x] Preparar interface de entrada/saída, função de configuração pública e guia de implantação; fluxo real pendente das chaves e do domínio Clerk.
  - [x] Exigir login e carregamento do progresso da conta antes de liberar o conteúdo; verificação no navegador publicado pendente.
  - [x] Separar a apresentação do curso da espera pela sessão Clerk e melhorar a entrada responsiva; teste no domínio publicado pendente.
- [ ] Configurar login social do Google pelo Clerk e ensinar os conceitos transferíveis de OAuth 2.0/OpenID Connect, redirect URI, consentimento, escopos e `state`.
- [ ] Conectar Clerk ao Supabase pela integração nativa atual, sem usar o template JWT legado.
  - [x] Preparar cliente REST com token da sessão Clerk e guia da integração nativa; ativação e teste com duas contas pendentes.
  - [x] Carregar automaticamente o progresso remoto da conta ao trocar de sessão, sem misturar estados de usuários.
  - [x] Enviar alterações automaticamente ao Supabase e remover controles de sincronização manual e arquivos locais; fluxo automatizado verificado, teste na Vercel pendente.
- [ ] Criar tabelas e migrações no PostgreSQL do Supabase.
  - [x] Preparar `supabase/learning-state.sql` com tabela e políticas; execução no projeto remoto pendente.
- [ ] Aplicar Row Level Security (RLS) e provar com duas contas que cada pessoa acessa somente seus próprios registros.
- [ ] Diferenciar chave publicável, segredo de servidor e credenciais que nunca podem chegar ao navegador.
- [ ] Publicar na Vercel, configurar variáveis por ambiente e atualizar URLs de redirecionamento permitidas.
- [ ] Executar smoke test em produção: login, criação, leitura, edição, exclusão, logout e acesso negado.

### Fase 7.3 — Segurança aplicada e privacidade

- [ ] Criar threat model simples: ativos, entradas, fronteiras de confiança, ameaças e controles.
- [ ] Ensinar OWASP Top 10 por meio de falhas reproduzíveis e correções verificadas, sem conteúdo ofensivo fora do laboratório.
- [ ] Cobrir autenticação versus autorização, IDOR/BOLA, XSS, CSRF, SQL injection, abuso de API, rate limiting e gestão de dependências.
- [ ] Implementar cabeçalhos de segurança, validação no servidor, mensagens de erro seguras e princípio do menor privilégio.
- [ ] Ensinar rotação e revogação de segredo, auditoria de acesso e resposta inicial a incidente.
- [ ] Introduzir LGPD com papéis, finalidade, base legal, minimização, retenção, direitos do titular e resposta a incidente.
- [ ] Criar inventário de dados e fluxo de tratamento usando somente dados fictícios.
- [ ] Implementar exportação, correção e exclusão de dados do usuário no projeto didático.
- [ ] Deixar explícito que o conteúdo educacional não substitui avaliação jurídica ou de segurança profissional.

### Fase 7.4 — Redis, desempenho e operação

- [ ] Ensinar primeiro quando não usar Redis: PostgreSQL continua sendo a fonte de verdade do projeto.
- [ ] Introduzir Redis como armazenamento em memória para cache, sessão, contador e limitação de requisições.
- [ ] Implementar cache-aside com TTL, chave versionada e invalidação após escrita.
- [ ] Demonstrar cache miss, dado obsoleto, indisponibilidade do Redis e fallback controlado.
- [ ] Implementar rate limiting por identidade e IP sem armazenar dado pessoal além do necessário.
- [ ] Medir antes e depois, registrar custo e latência e justificar se a complexidade compensa.
- [ ] Não guardar tokens, senhas ou dados sensíveis desnecessários no cache.

### Fase 7.5 — Operação e portabilidade

- [ ] Configurar logs estruturados sem tokens nem dados pessoais desnecessários.
- [ ] Adicionar monitoramento de disponibilidade e um alerta testável.
- [ ] Ensinar limites, custos, quotas e risco de dependência de fornecedor (vendor lock-in).
- [ ] Documentar exportação e backup dos dados, restauração e plano mínimo de migração de fornecedor.
- [ ] Criar rollback da aplicação e migração de banco compatível com a versão anterior quando necessário.
- [ ] Produzir runbook de deploy, falha de autenticação, falha de banco, incidente e recuperação.

**Aceite:** existem evidências da execução remota da CI, da publicação acessível, da recuperação de versão e dados e da correção de uma falha protegida por regressão.

**Aceite adicional da stack guiada:** duas contas reais de teste acessam somente seus próprios dados; o login Google usa URLs autorizadas; nenhum segredo aparece no repositório ou bundle do navegador; domínio e HTTPS funcionam; uma falha e um rollback são observados; o aluno explica o papel de Clerk, Supabase, Vercel, DNS e Redis e consegue indicar alternativas.

## Fase 8 — Projeto de conclusão júnior/intermediário

**Meta:** comprovar a capacidade de entregar, explicar e manter uma aplicação pequena completa.

- [ ] Liberar somente após concluir ambientes, backend e entrega real.
- [ ] Implementar “Plataforma de acompanhamento de estudos”.
  - [ ] Frontend conectado a uma API real.
  - [ ] PostgreSQL local com Docker e persistência.
  - [ ] Cursos, tarefas e sessões de estudo.
  - [ ] Validação no servidor e respostas de erro coerentes.
  - [ ] Relatórios e uma transação com múltiplas alterações.
  - [ ] Testes unitários, de integração e de interface.
  - [ ] CI executada no repositório.
  - [ ] Publicação sem dados pessoais reais.
  - [ ] Backup e restauração comprovados.
  - [ ] README capaz de reconstruir o ambiente.
  - [ ] Mudança de requisito em branch, revisada e protegida por teste.
- [ ] Criar avaliação final de funcionamento, testes, explicação e manutenção.
- [ ] Exigir leitura e correção de um defeito em código não escrito pelo aluno.
- [ ] Registrar claramente quais competências de nível júnior foram comprovadas.
- [ ] Não declarar nível intermediário sem evidência de arquitetura, integração, CI, revisão e colaboração.

**Aceite:** outra pessoa reconstrói o ambiente pelo README; o aluno corrige um bug e implementa uma mudança de requisito sem reescrever o sistema, justificando os trade-offs.

## Fase 9 — Experiência de estudo e portabilidade

**Meta:** reduzir perda de progresso e tornar aulas longas confortáveis e retomáveis.

- [ ] Implementar exportação de progresso e anotações.
- [ ] Implementar importação validada, com confirmação antes de substituir dados.
- [ ] Documentar versão e compatibilidade do formato exportado.
- [ ] Criar modo de leitura prolongada.
- [ ] Adicionar sumário navegável por teclado.
- [ ] Salvar e restaurar posição de leitura.
- [ ] Adicionar ajustes de leitura sem prejudicar contraste e responsividade.
- [ ] Garantir funcionamento quando o armazenamento local estiver bloqueado.
- [ ] Testar perda, corrupção e recuperação do estado.

**Aceite:** o aluno transfere seu progresso entre navegadores, recupera-se de dados inválidos e retoma uma aula longa no ponto salvo.

## Fase 10 — Engenharia de IA conectada e avaliada

**Meta:** criar uma ponte explícita entre simulações didáticas e sistemas reais com modelo.

- [ ] Identificar e rotular todas as atividades simuladas da trilha de IA.
- [ ] Criar preparação segura para uso de um provedor/modelo real sem expor chaves.
- [ ] Conectar um fluxo mínimo a um modelo real.
- [ ] Criar RAG simples sobre um conjunto pequeno de materiais.
- [ ] Exigir citações de fontes e reconhecimento de ausência de evidência.
- [ ] Adicionar ferramentas com permissões limitadas e validação de entrada.
- [ ] Criar conjunto de avaliação reproduzível.
- [ ] Avaliar separadamente simulação e versão conectada.
- [ ] Testar falhas, conteúdo não sustentado, injeção de prompt e uso indevido de ferramentas.
- [ ] Documentar custo, privacidade, limites e alternativa sem serviço pago.

**Aceite:** o aluno executa um sistema real, mede resultados com casos definidos, identifica falhas e explica por que uma demonstração simulada não comprova operação real.

## Fase 11 — Validação final com alunos

**Meta:** substituir hipóteses de usabilidade e aprendizagem por evidências observadas.

- [ ] Definir protocolo de teste sem induzir respostas.
- [ ] Testar a Etapa 0 com pessoa sem experiência prévia.
- [ ] Testar instalações em Windows, macOS e Linux quando houver acesso.
- [ ] Observar pelo menos um aluno no projeto básico.
- [ ] Observar pelo menos um aluno no projeto júnior.
- [ ] Registrar pontos de abandono, dúvidas, erros recorrentes e tempo real.
- [ ] Corrigir bloqueios de severidade alta ou bloqueante encontrados.
- [ ] Reaplicar tarefas diferentes após as correções.
- [ ] Atualizar o perfil do aluno e as dificuldades recorrentes no `AGENTS.md`.
- [ ] Publicar um relatório final separando cobertura, uso e domínio comprovado.

**Aceite:** os principais percursos foram executados por alunos reais, os bloqueios foram tratados e as afirmações de nível estão sustentadas por tarefas novas, explicação e manutenção — não apenas por conclusão de aulas.

---

## Verificações recorrentes por entrega

### Automatizadas

- [ ] Extrair todos os blocos `<script>` e executar `node --check`.
- [ ] Executar o verificador de ids e referências cruzadas.
- [ ] Confirmar exercícios, soluções e quizzes obrigatórios.
- [ ] Confirmar que URLs adicionadas usam `https` quando disponível e `rel="noopener noreferrer"` na interface.
- [ ] Conferir se a contagem estrutural mudou e atualizar documentação relacionada.

### Manuais

- [ ] Abrir uma aula de cada trilha alterada.
- [ ] Navegar somente por teclado.
- [ ] Testar em largura aproximada de 375 px.
- [ ] Marcar e desmarcar conclusão, recarregar e conferir persistência.
- [ ] Testar leitura e salvamento no Supabase com `localStorage` indisponível.
- [ ] Conferir textos longos, código, tabelas e modais sem cortes.
- [ ] Verificar a saída esperada de todos os comandos novos.

## Dependências críticas

```text
Base de verificação
  → Etapa 0
    → Preparação de ambientes e mapa de pré-requisitos
      → Padronização de aulas e exercícios
        → Avaliação de domínio
          → Projeto básico
            → Backend com persistência
              → CI, publicação e integração real
                → Projeto júnior/intermediário
                  → IA real como extensão opcional
```

O projeto intermediário permanece bloqueado enquanto as fases 2, 6 e 7 não estiverem concluídas.

## Histórico de implementações

| Data | Fase/item | Commit | Resultado e verificação |
|---|---|---|---|
| 24/10/2026 | Criação do roadmap | `14126c8` | Roadmap consolidado a partir do backlog e da análise pedagógica. |
| 24/10/2026 | Reorganização estrutural | `14126c8` | HTML, CSS, dados e funções separados por responsabilidade, sem mudança intencional de comportamento. |
| 24/10/2026 | Fase 0 — base de medição | Commit da Fase 0 | Validador automático, linha de base e checklist manual de regressão adicionados. |
| 24/10/2026 | Fase 1 — Etapa 0 | Commit da Fase 1 | Cinco aulas de preparação digital, prova prática e auditoria pré-publicação adicionadas. |
| 24/10/2026 | Fase 2.1 — pré-requisitos | Commit da Fase 2.1 | Grafo, dependências por trilha, atalhos mínimos e arestas abertas documentados. |
| 24/10/2026 | Fase 2.2 — ambientes essenciais | Commit da Fase 2.2 | Preparações de editor, Python, Git e Node.js/npm adicionadas com diagnóstico e alternativas. |
| 24/10/2026 | Fase 2.3 — Docker e alternativa leve | Commit da Fase 2.3 | Preparação de Docker/WSL/virtualização e percurso temporário com SQLite adicionados. |
| 24/10/2026 | Fase 2.4 — PostgreSQL e clientes | Commit da Fase 2.4 | Preparação de psql/pgAdmin e projeto relacional padronizados em `127.0.0.1:55432`. |
| 24/10/2026 | Fase 2.5 — bancos de aprofundamento | Commit da Fase 2.5 | Preparações opcionais de MariaDB, Firebird e MongoDB/mongosh adicionadas. |
| 24/10/2026 | Fase 2.6 — auditoria global de ambientes | Commit da Fase 2.6 | Contratos de preparação e parâmetros dos laboratórios protegidos pelo validador automático. |
| 24/10/2026 | Fase 3.1 — funções JavaScript | Commit da Fase 3.1 | Aula sobrecarregada dividida em contratos, escopo/pureza e callbacks/closures, preservando o id existente. |
| 24/10/2026 | Planejamento da trilha de deploy | Próximo ciclo | Stack guiada Clerk + Supabase + Vercel e módulos transferíveis de DNS, OAuth/OIDC, segurança, LGPD, Redis e operação adicionados ao roadmap. |
| 24/10/2026 | Fase 3.2 — mapa de carga cognitiva | Commit da Fase 3.2 | 41 candidatas identificadas por estrutura e organizadas em quatro prioridades; cinco fundamentos de banco ficaram no topo. |
| 24/10/2026 | Fase 3.3 — modelagem de dados | Commit da Fase 3.3 | `db-modeling` foi reduzida e `db-normalization` passou a ensinar normalização, ausência e limites com prática própria. |
| 24/10/2026 | Fase 3.4 — DDL e CRUD | Commit da Fase 3.4 | `db-ddl-constraints` passou a ensinar estrutura e regras; `db-ddl-crud` ficou focada em manipulação segura. |
| 24/10/2026 | Fase 3.5 — consultas e agregações | Commit da Fase 3.5 | `db-select` ficou focada em linhas, filtros e `NULL`; `db-aggregation` recebeu medidas, grupos e `HAVING`. |
| 24/10/2026 | Fase 3.6 — JOINs e CTEs | Commit da Fase 3.6 | `db-joins` ficou focada em junções e granularidade; `db-subqueries-ctes` recebeu consultas em etapas e prevenção de multiplicação. |
| 24/10/2026 | Fase 3.7 — transações e concorrência | Commit da Fase 3.7 | `db-transactions` ficou focada na unidade atômica; `db-concurrency-boundaries` recebeu savepoints, repetição e efeitos externos. |
| 24/10/2026 | Fase 3.8 — fundamentos de Docker | Revisão da primeira aula da prioridade 2 | `db-docker-basics` remete à preparação por sistema, concentra conceitos e diagnóstico em quatro blocos e padroniza a prática. |
| 24/10/2026 | Fase 3.9 — Compose e persistência | Revisão da segunda aula da prioridade 2 | `db-docker-compose` ficou com quatro blocos; conexão externa foi encaminhada para `setup-postgresql`, após o serviço subir. |
| 24/10/2026 | Fase 3.10 — operação e recuperação | Revisão da terceira aula da prioridade 2 | `db-docker-operations` ficou com quatro blocos, prática progressiva e retomada explícita após `down`. |
| 24/10/2026 | Fase 3.11 — CRUD MongoDB | Revisão da quarta aula da prioridade 2 | `db-mongo-crud` ficou com quatro blocos, preparação explícita e verificação de leitura, atualização e exclusão. |
| 24/10/2026 | Fase 3.12 — pipelines MongoDB | Revisão da quinta aula da prioridade 2 | `db-mongo-pipelines` ficou com quatro blocos, contrato de dados testável, sequência de estágios visível e interpretação cautelosa do plano. |
| 24/10/2026 | Fase 3.13 — desempenho SQL | Revisão da sexta aula da prioridade 2 | `db-performance` ficou com quatro blocos, preparação PostgreSQL 17 explícita, fontes alinhadas à versão e relatório baseado em evidências. |
| 24/10/2026 | Fase 3.14 — modelagem NoSQL | Revisão da sétima aula da prioridade 2 | `db-nosql-models` ficou com quatro blocos, atividade conceitual sem instalação e decisão registrada com custos e gatilho de revisão. |
| 24/10/2026 | Fase 3.15 — projeto de dados | Revisão da oitava aula da prioridade 2 | `db-project` ficou com quatro blocos, casos verificáveis, limite das FKs explícito e decisão de banco na entrega. |
| 24/10/2026 | Fase 3.16 — recuperação de dados | Revisão da nona aula da prioridade 2 | `db-recovery` ficou com quatro blocos, laboratório isolado, RPO/RTO observáveis e migração por expansão com plano de falha. |
| 24/10/2026 | Fase 3.17 — segurança de dados | Conclusão da prioridade 2 | `db-security` ficou com quatro blocos, testes negativos progressivos, identidade confiável e limites explícitos do laboratório. |
| 26/10/2026 | Fase 3 — resultado esperado visível | `19daa97` | Os 458 resultados existentes aparecem antes das soluções; validador de conteúdo passou. Conferência manual no site publicado pendente. |
| 26/10/2026 | Fase 3 — critérios da Etapa 0 | `aa9d0a9` | `prep-tools` ganhou critérios específicos visíveis em quatro exercícios; validação automática passou. Conferência manual publicada pendente. |
| 26/10/2026 | Fase 3 — arquivos e extensões | `d663c99` | `prep-files` ganhou critérios em quatro exercícios; resultado da investigação não revela as hipóteses. Validação automática passou; conferência publicada pendente. |

## Decisões e bloqueios

Registre aqui mudanças de direção e impedimentos que afetem a sequência.

| Data | Tipo | Decisão ou bloqueio | Motivo | Próxima ação |
|---|---|---|---|---|
| — | — | — | — | — |

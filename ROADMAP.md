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

- [x] Padronizar a sequência didática na interface conforme o modelo do `AGENTS.md`.
  - [x] Apresentar objetivo antes de pré-requisitos, ambiente e conceitos; manter exemplo, resultado, prática, solução recolhida, erros, verificação e revisão na ordem compartilhada pelas aulas.
- [x] Tornar observáveis os 365 objetivos atuais das aulas.
  - [x] Reescrever seis objetivos abstratos como ações conferíveis e adicionar verificação ao validador para impedir que objetivos comecem por verbos vagos.
- [x] Separar resultado esperado e critérios de aceite das soluções ocultas nos 486 exercícios.
  - [x] Exibir antes do rascunho o resultado esperado dos 486 exercícios e exigir critérios específicos por aula no validador de conteúdo.
  - [x] Detalhar critérios observáveis nos quatro exercícios de `prep-tools`, sem expor as respostas nos resultados visíveis.
  - [x] Detalhar critérios observáveis nos quatro exercícios de `prep-files` e preservar a investigação antes da dica.
  - [x] Detalhar critérios observáveis nos quatro exercícios de `prep-workspace`, cobrindo contexto do terminal e editor.
  - [x] Detalhar critérios nos quatro exercícios de `prep-cycle` e remover do resultado esperado a saída literal do exercício de previsão.
  - [x] Detalhar critérios nos quatro exercícios de `prep-errors` e tornar a prova prática verificável por evidências observadas.
  - [x] Acrescentar critérios reutilizáveis aos exercícios das quatro instalações iniciais e retirar do resultado da previsão a resposta literal.
  - [x] Acrescentar critérios aos quatro exercícios de `setup-docker`, mantendo verificações separadas de cliente, Engine, Compose e permissões.
  - [x] Acrescentar critérios aos quatro exercícios de `setup-docker-alternative`, com previsão antes da execução, consulta parametrizada e evidências de retomada.
  - [x] Acrescentar critérios aos quatro exercícios de `setup-postgresql`, verificando destino real, conexão reproduzível e diagnóstico que preserva dados e credenciais.
  - [x] Acrescentar critérios reutilizáveis às preparações opcionais de MariaDB, Firebird e MongoDB, sem antecipar respostas dos exercícios.
  - [x] Acrescentar critérios aos quatro exercícios de `db-mariadb` e separar seus resultados observáveis dos valores finais das consultas.
  - [x] Acrescentar critérios aos quatro exercícios de `db-firebird` e retirar dos resultados esperados os nomes e contagens finais.
  - [x] Acrescentar critérios aos quatro exercícios de `db-mongo-crud` e separar as previsões e contagens das respostas visíveis.
  - [x] Acrescentar critérios aos quatro exercícios de `db-mongo-pipelines` sem antecipar grupos, totais ou contagens.
  - [x] Acrescentar critérios aos quatro exercícios de `db-nosql-models`, com comparação de acesso, atualização e recuperação sem antecipar escolhas.
  - [x] Acrescentar critérios aos quatro exercícios de `db-performance`, distinguindo previsão, plano observado e correção funcional.
  - [x] Acrescentar critérios aos quatro exercícios de `db-security`, cobrindo parametrização, escopo por proprietário e teste negativo de alteração.
  - [x] Acrescentar critérios aos quatro exercícios de `db-recovery` e corrigir a descrição do título presente na cópia e na origem.
  - [x] Acrescentar critérios aos quatro exercícios de `db-project`, preservando a previsão do aluno e verificando isolamento de progresso e integridade das matrículas.
  - [x] Acrescentar critérios aos quatro exercícios de `db-modeling`, com evidências separadas para entidades, relações, progresso e avaliações.
  - [x] Acrescentar critérios aos quatro exercícios de `db-normalization`, cobrindo dependências, alteração localizada, chaves e ausência de data.
  - [x] Acrescentar critérios aos quatro exercícios de `db-ddl-constraints`, distinguindo previsão, teste de restrições e diagnóstico de chave estrangeira.
  - [x] Acrescentar critérios aos quatro exercícios de `db-ddl-crud`, tornando independente a remoção e verificando filtros antes e depois das alterações.
  - [x] Acrescentar critérios aos quatro exercícios de `db-select`, verificando limites inclusivos, filtros, ordem e distinção entre `NULL` e texto vazio.
  - [x] Acrescentar critérios aos quatro exercícios de `db-aggregation`, distinguindo população, medidas por grupo e filtros antes/depois da agregação.
  - [x] Acrescentar critérios aos quatro exercícios de `db-joins`, verificando linhas preservadas, contagem de filhos e filtros em `ON` ou `WHERE`.
  - [x] Acrescentar critérios aos quatro exercícios de `db-subqueries-ctes`, verificando média, resumo intermediário e granularidade antes das junções.
  - [x] Acrescentar critérios aos quatro exercícios de `db-transactions`, distinguindo estado provisório, confirmação, reversão e transferência incompleta.
  - [x] Acrescentar critérios aos quatro exercícios de `db-concurrency-boundaries`, cobrindo savepoint, confirmação, efeito externo e repetição da unidade.
  - [x] Acrescentar critérios aos quatro exercícios de `db-docker-basics`, distinguindo imagem, Engine, volume e diagnóstico sem apagar dados.
  - [x] Acrescentar critérios aos quatro exercícios de `db-docker-compose`, verificando portas, configuração e persistência após recriação.
  - [x] Acrescentar critérios aos quatro exercícios de `db-docker-operations`, cobrindo diagnóstico, restauração em destino novo e credenciais persistidas.
  - [x] Alinhar `db-postgres` ao ambiente Compose existente e acrescentar critérios aos quatro exercícios de consulta, alteração, erro e transação.
  - [x] Vincular `db-sqlite` à preparação Python e acrescentar critérios aos quatro exercícios de consulta, parâmetros, reversão e backup.
  - [x] Revisar os 52 exercícios das 13 aulas HTML/CSS, acrescentar critérios específicos e ajustar 14 resultados esperados que antecipavam previsões ou explicações.
  - [x] Revisar os 56 exercícios das 14 aulas JavaScript, acrescentar critérios específicos e ajustar 22 resultados esperados que antecipavam previsões ou explicações.
  - [x] Revisar os 48 exercícios das 12 aulas Python, acrescentar critérios específicos e ajustar sete resultados esperados que antecipavam previsões ou diagnósticos.
  - [x] Revisar os 73 exercícios das 18 aulas de IA, acrescentar critérios específicos e ajustar 17 resultados esperados que antecipavam previsões ou métricas.
  - [x] Revisar os 24 exercícios das seis aulas Git, acrescentar critérios específicos e retirar do resultado esperado a linha literal antecipada na localização de histórico.
  - [x] Revisar os 24 exercícios das seis aulas de Qualidade, acrescentar critérios específicos e evitar antecipar a entrada que demonstra coerção na investigação.
  - [x] Revisar os 25 exercícios das seis aulas de Entrega, acrescentar critérios específicos e ajustar três resultados que antecipavam previsões ou respostas de autorização.
- [~] Garantir exemplos executáveis com saída ou comportamento visível.
  - [x] O validador exige código, configuração/ambiente, explicação e resultado esperado para cada uma das 121 aulas; também verifica a sintaxe dos exemplos JavaScript e scripts embutidos em HTML.
  - [x] Executar os 32 exemplos Python em pastas temporárias; validar 18 exemplos JavaScript por sintaxe; abrir os 23 exemplos HTML no Chrome e interagir com os seis exemplos HTML + JavaScript.
  - [x] Executar nove exemplos Node com saída bem-sucedida, confirmar que `quality-debug` mostra dois testes aprovados e uma falha intencional, e executar os dez exemplos SQL SQLite em memória; a preparação SQLite alternativa também criou e consultou um banco temporário.
  - [x] Executar os exemplos reais em serviços descartáveis, sem usar SQLite como substituto: `db-postgres` e quatro exercícios em PostgreSQL 17; `db-mariadb` e quatro em MariaDB 11.8.9; `db-firebird` e quatro em Firebird 5.0.4; `db-mongo-crud` e `db-mongo-pipelines` com exemplos e oito exercícios em MongoDB 8.0.34. Consultas, agregações, transações, restrições e validações produziram os resultados esperados; containers e volumes temporários foram removidos. Fontes oficiais das imagens: [PostgreSQL](https://hub.docker.com/_/postgres), [MariaDB](https://hub.docker.com/_/mariadb), [Firebird](https://www.firebirdsql.org/en/docker/) e [MongoDB](https://hub.docker.com/_/mongo).
- [~] Aplicar a progressão guiado → pistas → problema novo → mudança de requisito.
  - [x] Deixar explícita na interface a sequência existente: prática guiada, adaptação com pistas, problema novo e investigação de erro.
  - [x] Acrescentar ao fim de cada aula um desafio aberto de mudança de requisito, com critérios para comparar comportamento antigo e novo e testar um caso preservado e outro alterado.
  - [x] Salvar as anotações do desafio no campo de notas já existente, vinculado à conta; o sanitizador aceita a nova chave sem mudar a versão do estado.
  - [x] Exigir no validador ao menos quatro exercícios e uma dica utilizável em cada exercício.
  - [x] Vincular o desafio ao assunto de cada aula, pedindo que a pessoa formule uma mudança relevante e compare um comportamento preservado com outro alterado.
  - [ ] Conferir visualmente a sequência no site publicado, com teclado e salvamento na nuvem.
- [~] Garantir, em cada aula, atividades de prever, alterar, construir e investigar erro.
  - [x] Definir as quatro ações com instrução e critério de aceite em `EXERCISE_STAGES`; o validador confirma os tipos, e as 121 aulas têm pelo menos quatro exercícios com dicas utilizáveis.
  - [x] Renderizar em Chromium a 375 px os 114 guias-base e cinco guias de integração/hospedagem já existentes; conferir títulos, critérios, anotações e chegada por teclado ao campo final.
  - [ ] Conferir estilo e salvamento remoto na aplicação publicada, incluindo login e confirmação de sincronização na nuvem.
- [~] Adicionar erros comuns e como reconhecê-los pela mensagem ou comportamento.
  - [x] As 121 aulas têm de três a cinco erros comuns; a revisão ensina a registrar mensagem/comportamento, passo que o causou e resultado esperado antes de corrigir.
  - [x] O validador exige pelo menos três itens textuais não vazios por aula.
  - [x] Renderizar a aba Revisão dos 114 guias-base e dos cinco guias novos em Chromium; conferir instruções e quantidade de erros.
  - [ ] Conferir a aba Revisão no site publicado e verificar que as mensagens de erro continuam legíveis com teclado e em largura móvel.
- [x] Adicionar exercício de transferência em contexto diferente.
  - [x] As 121 aulas têm uma segunda tentativa com enunciado, critério de aceite e pista; o validador exige os três campos e rejeita enunciado idêntico ao de um exercício.
  - [x] Auditoria de termos compartilhados entre cada segunda tentativa e os exercícios da aula não encontrou sobreposição Jaccard igual ou superior a 0,5; amostras das nove trilhas usam contextos distintos.
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
  - [x] Aplicar a exigência às provas e aos projetos de conclusão: `projectFooter()` pede decisão, motivo e verificação; `requireProjectExplanation()` impede nova entrega vazia em todos os fluxos; `sanitizeState()` preserva entregas antigas e indica explicação pendente.
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
- [x] Ensinar validação de entrada no servidor com o laboratório `labs/backend-validation`, distinguindo orientação do formulário e contrato da API.
- [x] Separar validação, regra de negócio e acesso a dados no laboratório `labs/backend-layers`, preservando o contrato HTTP e usando repositório em memória explícito.
- [x] Persistir dados em PostgreSQL.
  - [x] Preparar migration `migrations/001_create_estudos.sql` com chave canônica única e dados fictícios.
  - [x] Tornar a interface do repositório assíncrona e conferir o adaptador em memória após a mudança.
  - [x] Adicionar `pg` somente a `labs/backend-layers`, com versões fixas no manifesto e lockfile.
  - [x] Criar repositório PostgreSQL com pool compartilhado e consultas parametrizadas.
  - [x] Criar aplicador transacional que registra migrations e não reaplica o mesmo arquivo.
  - [x] Criar teste de integração para leitura em outra conexão e restrição única.
  - [x] Aplicar as migrations em uma base descartável PostgreSQL 18 local na porta `55433`; conferir leitura, criação, unicidade e persistência após reiniciar a API.
- [x] Ensinar respostas de sucesso e erro coerentes: `201`, `409` para duplicidade e `500` genérico para falha interna.
  - [x] Com PostgreSQL indisponível na porta `55433`, uma chamada HTTP real retorna `500` genérico; a mensagem não inclui o código de conexão nem os valores de ambiente fictícios.
- [x] Ensinar migrações e evolução do esquema.
  - [x] Aplicar e rastrear a migration inicial por script, com transação e operação repetível.
  - [x] Aplicador percorre arquivos SQL numerados em ordem e tem testes de idempotência e rollback.
  - [x] Migration `002_create_sessoes_estudo.sql` adiciona sessões sem reescrever a migration inicial.
  - [x] Aplicar as duas migrations em PostgreSQL real e conferir evolução e repetição.
  - [x] Documentar a prática de criar uma terceira migration e executá-la numa cópia temporária contra PostgreSQL real.
- [x] Ensinar transação com mais de uma alteração.
  - [x] API cria estudo e primeira sessão em uma transação e reverte ambas as alterações se a segunda falhar.
  - [x] Incluir teste unitário de `BEGIN`/`COMMIT`/`ROLLBACK` e demonstração reproduzível de rollback.
  - [x] Confirmar a transação no PostgreSQL real após aplicar as migrations; criação, rollback e persistência após reinício foram conferidos.
- [x] Criar testes unitários de normalização e unicidade de título em `labs/backend-layers/src/regra-titulo.test.cjs`.
- [x] Criar e executar `labs/backend-layers/src/postgres.integration.test.cjs` em PostgreSQL real e validar o fluxo local via Docker Compose.
  - [x] Com Docker Engine 29.7.2 e PostgreSQL 17, o Compose ficou `healthy`; `db:check`, migrations 001–002, repetição idempotente e integração passaram (1/1).
  - [x] Pela API conectada ao Compose, criação retornou `201`, duplicidade `409` e o registro persistiu após reiniciar o servidor.
- [x] Servir o frontend do laboratório pela API e demonstrar criação e consulta no mesmo contrato HTTP.
- [x] Documentar configuração, inicialização, parada e retomada do ambiente.
- [x] Usar somente dados fictícios; `.env` e `node_modules` do laboratório ficam ignorados pelo Git.

**Aceite:** o aluno constrói e explica um fluxo completo da interface ao banco e de volta, incluindo validação, regra, erro, persistência e testes.

## Fase 7 — Qualidade, CI, publicação e integração real

**Meta:** transformar conceitos de entrega em práticas executadas e recuperáveis.

- [x] Criar `labs/bug-investigation` para reproduzir e corrigir defeito em código preexistente, com instruções para iniciante.
- [x] Exigir teste que falha antes da correção e passa depois dela; a falha e a correção foram verificadas em cópia temporária.
- [x] Criar teste Playwright de interface: carregar lista, criar estudo (`201`) e validar duplicidade (`409`) sem alterar a lista.
- [x] Configurar CI em um repositório real.
  - [x] Criar `.github/workflows/ci.yml` para validar conteúdo, testes unitários, PostgreSQL real descartável e fluxo Playwright.
  - [x] Confirmar a execução no GitHub Actions em `main`; run `40605904963` passou em todas as etapas.
- [x] Observar uma falha de CI numa branch temporária e corrigi-la; manter `main` verde.
  - [x] Run [40606364491](https://github.com/bzraiago/tech-learning-hub/actions/runs/40606364491) falhou em `Run unit tests` após uma expectativa controlada incorreta (`valido: false`); o branch foi corrigido e a asserção restaurada para `true`.
  - [x] Run [40606768881](https://github.com/bzraiago/tech-learning-hub/actions/runs/40606768881) passou em todas as etapas, incluindo PostgreSQL e Playwright; `main` permaneceu verde e o branch temporário foi removido.
- [x] Integrar ao menos um serviço externo real com contrato documentado.
  - [x] `labs/backend-layers` consulta o Open-Meteo, valida e normaliza temperatura/umidade; smoke real passou sem credenciais e a interface atribui a fonte.
- [x] Simular falhas de rede, autenticação e resposta inválida sem expor credenciais.
  - [x] Testes controlados cobrem erro de rede, timeout, `401` simulado e contrato JSON inválido; API retorna mensagens públicas sem detalhes internos. O serviço escolhido não exige autenticação.
- [x] Publicar a página e a função da demonstração em `main`; o deploy Vercel do commit [`43decdc`](https://github.com/bzraiago/tech-learning-hub/commit/43decdce0350ebd35645a1b3c9fa31ad55a5e99b) foi concluído.
- [x] Publicar commits da branch `testes` como Preview Vercel; os status do provedor para `ea4ca2d` e `33d1df8` foram concluídos com sucesso.
- [ ] Conferir a URL final e o comportamento publicado.
- [ ] Os aliases de `main` e `testes` redirecionam para “Login – Vercel” sem sessão. A página da aplicação e o comportamento anônimo ainda não puderam ser conferidos; a liberação pública autorizada aguarda acesso autenticado à conta Vercel.
- [x] Ensinar rollback para uma versão anterior.
  - [x] `labs/backend-layers/DEPLOY_VERCEL.md` documenta Instant Rollback pelo painel, limite do Hobby, reativação da atribuição automática e separação entre implantação e dados do banco.
  - [ ] Executar e verificar um rollback real; o acesso autenticado à conta Vercel ainda não está disponível nesta sessão.
- [x] Executar e comprovar backup e restauração.
  - [x] Documentar `pg_dump -Fc`, inspeção do arquivo e `pg_restore` numa base nova, preservando a origem; excluir os arquivos de backup do Git.
  - [x] Criar `npm run test:backup-restore` e um job de CI que usa o Compose do laboratório, semeia dados fictícios, restaura em outra base e compara as duas tabelas.
  - [x] Executar localmente no PostgreSQL 17: `estudos=2`, `sessoes=1`; as duas tabelas restauradas corresponderam à origem, que permaneceu intacta. Os jobs [backup-restore](https://github.com/bzraiago/tech-learning-hub/actions/runs/40617482760/job/122583268293) e [validate-and-test](https://github.com/bzraiago/tech-learning-hub/actions/runs/40617482760/job/122583268183) passaram.
- [ ] Criar prática real ou revisão independente de colaboração.

### Fase 7.1 — Fundamentos de internet, hospedagem e DNS

- [x] Explicar cliente, servidor, hospedagem, região, CDN, domínio, registrador e provedor DNS em `delivery-web-foundations`.
- [x] Ensinar registros `A`, `AAAA`, `CNAME` e `TXT`, TTL, caches e diagnóstico em `delivery-dns`.
  - [x] Referenciar as RFCs oficiais que reservam `192.0.2.0/24`, `2001:db8::/32` e `.test` para exemplos e testes.
- [x] Explicar árvore e zonas DNS, resolvedor recursivo, autoridade, delegação NS e cache em `delivery-dns-resolution`.
- [x] Explicar HTTPS, certificado TLS, redirecionamento de HTTP para HTTPS e conteúdo misto em `delivery-https`.
- [x] Comparar publicação estática, funções sob demanda, servidor persistente e serviço gerenciado em `delivery-hosting-models`.
- [ ] Publicar uma página mínima na Vercel e verificar URL, status HTTP e HTTPS.
  - [x] Criar `labs/deployment-static` com HTML/CSS acessíveis e README que usa a URL Preview existente da branch `testes`, inclui o caminho do laboratório e diagnostica DNS, HTTP e proteção de acesso.
  - [ ] Quando houver sessão Vercel autorizada, conferir o Preview em `/labs/deployment-static/` e os arquivos HTML/CSS se a política permitir; não é necessário desativar proteção nem demonstrar acesso anônimo.
- [x] Ensinar em `delivery-custom-domain` um plano conceitual para associar domínio, seguir os valores atuais do painel, preservar MX/TXT e preparar rollback.
  - [x] Usar `.test` e marcadores fictícios; não comprar domínio, mudar DNS nem condicionar a conclusão do curso à validação real.

### Fase 7.2 — Stack guiada de referência

- [ ] Criar um projeto integrador guiado usando Vercel, Clerk e Supabase, sem tratar os fornecedores como única solução possível.
- [~] Preparar contas, projeto local e variáveis separadas para desenvolvimento, prévia e produção.
  - [x] A aula `delivery-environments` agora inclui matriz Local/Preview/Production, separação entre configuração pública e segredo, primeira publicação Vercel e uso da branch de prévia quando `main` é a Production Branch.
  - [x] O commit `ea4ca2d` enviado para `testes` criou um deployment Preview Vercel com status concluído.
  - [ ] Conferir a aplicação e as variáveis do Preview; a proteção do projeto redireciona visitantes sem sessão Vercel para login.
- [ ] Implementar cadastro, login, logout, sessão expirada e estado de carregamento com Clerk.
  - [x] Preparar interface de entrada/saída, função de configuração pública e guia de implantação; fluxo real pendente das chaves e da configuração da instância Clerk.
  - [x] Exigir login e carregamento do progresso da conta antes de liberar o conteúdo; verificação no navegador publicado pendente.
  - [x] Separar a apresentação do curso da espera pela sessão Clerk e melhorar a entrada responsiva; teste no Preview publicado pendente.
- [x] Configurar login social do Google pelo Clerk e ensinar os conceitos transferíveis de OAuth 2.0/OpenID Connect, redirect URI, consentimento, escopos e `state`.
  - [x] Criar `delivery-oauth-google` com fluxo navegador → Clerk → Google → callback → Preview, autenticação versus autorização, OAuth/OIDC, origem/callback/retorno, escopos mínimos, `state`/`nonce`, diagnóstico de `redirect_uri_mismatch` e fronteira de RLS.
  - [x] Usar documentação oficial e exemplos sem segredo; o dono confirmou anteriormente que o login Google funcionou. O material de domínio próprio permanece conceitual e não exige teste com domínio.
- [~] Conectar Clerk ao Supabase pela integração nativa atual, sem usar o template JWT legado.
  - [x] Preparar o cliente REST com token da sessão Clerk e configurar a integração nativa documentada; o salvamento/carregamento na nuvem foi confirmado pelo dono.
  - [x] Criar `delivery-clerk-supabase` para explicar assinatura/validação, `sub`, `auth.jwt()`, políticas atuais, RLS, grants e o motivo para não usar o template JWT legado.
  - [ ] Comprovar isolamento com duas contas e tentativa de falsificar `user_id`; o plano didático não conta como execução da policy remota.
  - [x] Carregar automaticamente o progresso remoto da conta ao trocar de sessão, sem misturar estados de usuários.
  - [x] Enviar alterações automaticamente ao Supabase e remover controles de sincronização manual e arquivos locais; fluxo automatizado verificado, teste na Vercel pendente.
- [ ] Criar tabelas e migrações no PostgreSQL do Supabase.
  - [x] Preparar `supabase/learning-state.sql` com tabela e políticas; execução no projeto remoto pendente.
- [~] Aplicar Row Level Security (RLS) e provar com duas contas que cada pessoa acessa somente seus próprios registros.
  - [x] A aula compara grants e policies `SELECT`/`INSERT`/`UPDATE`, explica `USING`/`WITH CHECK` e traz uma matriz de autorização para duas identidades fictícias.
  - [ ] Executar as tentativas positivas e negativas com duas identidades reais ou harness de banco isolado e registrar evidências sem publicar tokens.
- [x] Diferenciar chave publicável, segredo de servidor e credenciais que nunca podem chegar ao navegador; a aula compara chave Supabase/Clerk, token de sessão e `service_role`.
- [ ] Publicar na Vercel como Preview, configurar variáveis de Preview e atualizar URLs de retorno permitidas para o hostname Preview usado.
- [ ] Executar smoke test no Preview: login, criação e atualização de progresso, leitura da própria conta, isolamento entre contas, logout e acesso negado.

### Fase 7.3 — Segurança aplicada e privacidade

- [x] Criar threat model simples: ativos, entradas, fronteiras de confiança, ameaças e controles.
  - [x] Criar `delivery-threat-model` para delimitar escopo, mapear ativos/atores/fluxos, usar STRIDE como perguntas, priorizar risco e associar cada ameaça a controle e evidência.
  - [x] Aplicar o modelo conceitualmente ao fluxo Clerk–Vercel–Supabase com dados fictícios; separar hipótese não verificada, controle implementado, teste executado e risco residual.
- [~] Ensinar OWASP Top 10 por meio de falhas reproduzíveis e correções verificadas, sem conteúdo ofensivo fora do laboratório.
  - [x] Apresentar as dez categorias OWASP Top 10 2025 e seus limites como referência de conscientização, não certificação.
  - [x] Criar `labs/security-basics` local com reprodução e correção de A01/BOLA, leitura e escrita cruzadas, casos positivos/negativos e dados fictícios; os seis testes passam localmente.
  - [ ] Criar laboratórios específicos e testes para as demais categorias prioritárias; não considerar a lista de nomes como cobertura.
- [~] Cobrir autenticação versus autorização, IDOR/BOLA, XSS, CSRF, SQL injection, abuso de API, rate limiting e gestão de dependências.
  - [x] Diferenciar autenticação/autorização e reproduzir BOLA/IDOR em laboratório local isolado.
  - [~] Criar aula e cópia local não executável no Preview para explicar DOM XSS, `innerHTML` e `textContent`; verificação manual no navegador ainda pendente.
  - [x] Explicar CSRF por sessão cookie, limites de CORS, SameSite, token e checagem de origem; comparar com o Bearer explícito encontrado em `cloud.js`, sem declarar imunidade.
  - [x] Relacionar A05 Injection a `db-security`, que já demonstra consulta parametrizada no SQLite e entrada de aparência SQL tratada como dado literal.
  - [x] Criar `delivery-api-abuse` com conceitos detalhados de API4/API6, limites por pedido/identidade/custo, 429/Retry-After, observabilidade e plano de verificação controlada; análise usa cenários fictícios e os laboratórios locais existentes, sem tráfego de carga nem Preview.
  - [x] Criar `delivery-supply-chain` com inspeção local do manifesto, lockfile e workflow reais; a atividade separa observações de verificações atuais pendentes e não instala nem altera pacotes.
  - [x] Criar `labs/security-csrf` com sessão/token fictícios, rota vulnerável e rota protegida; testes locais confirmam respostas e ausência de escrita em pedidos recusados (7/7).
  - [~] Integrar e testar rate limiting HTTP distribuído por IP observado com Redis real em `labs/backend-layers`; limite por conta autenticada segue pendente porque este laboratório não tem autenticação.
- [~] Implementar cabeçalhos de segurança, validação no servidor, mensagens de erro seguras e princípio do menor privilégio.
  - [x] Configurar quatro cabeçalhos globais em `vercel.json` e nas respostas locais; cobrir HTML, JSON, health check, 404 e 500. Validador Vercel, suíte unitária 62/62 e E2E local 3/3 passaram. CSP segue pendente de inventário e teste de compatibilidade; inspeção manual do Preview no Brave não foi executada.
  - [~] Separar admin/migrations de `backend_app`, limitar grants a SELECT/INSERT e sequences necessárias e adicionar teste PostgreSQL para operações permitidas/negadas. Testes unitários do setup passaram; integração PostgreSQL 17 aguarda a execução CI após o push, pois o daemon Docker retorna acesso negado localmente.
  - [x] Criar `delivery-server-hardening` e `delivery-db-privileges` com cinco exercícios cada, quiz, roteiro de setup/alternativa sem Docker, limites de evidência e distinção entre grants de tabela, autorização por linha e RLS. Validador registra 134 aulas, 547 exercícios e 418 questões.
- [ ] Ensinar rotação e revogação de segredo, auditoria de acesso e resposta inicial a incidente.
- [ ] Introduzir LGPD com papéis, finalidade, base legal, minimização, retenção, direitos do titular e resposta a incidente.
- [ ] Criar inventário de dados e fluxo de tratamento usando somente dados fictícios.
- [ ] Implementar exportação, correção e exclusão de dados do usuário no projeto didático.
- [ ] Deixar explícito que o conteúdo educacional não substitui avaliação jurídica ou de segurança profissional.

### Fase 7.4 — Redis, desempenho e operação

- [x] Ensinar primeiro quando não usar Redis: PostgreSQL continua sendo a fonte de verdade do projeto (`delivery-redis-foundations`).
- [x] Introduzir Redis como armazenamento em memória para cache, sessão, contador e limitação de requisições, incluindo requisitos distintos por uso (`delivery-redis-foundations`).
- [x] Ensinar cache-aside com TTL, chave versionada e invalidação após escrita (`delivery-redis-cache-aside`); `backend-layers` integra cache da lista HTTP ao PostgreSQL e Redis reais.
- [x] Demonstrar miss/hit, TTL, invalidação após POST e fallback controlado após desconexão real; o script Map ainda isola staleness e o teste unitário comprova que falha de DEL não mascara escrita confirmada. Race entre instâncias segue como limite documentado.
- [x] Demonstrar contador atômico com TTL e identidade fictícia (`delivery-redis-rate-limit`) e limitador HTTP integrado a Redis no laboratório `backend-layers`; teste com Redis real passou para 429, isolamento de keys e 503 sem gravação após desconexão. A identidade HTTP é o IP do socket observado, sem confiar em `X-Forwarded-For`; quota por conta segue pendente na Fase 7.3.
- [x] Medir antes e depois, registrar custo operacional e latência e justificar a complexidade com perfil local reproduzível; preço mensal e ganho de produção permanecem desconhecidos.
- [x] Não guardar tokens, senhas ou dados sensíveis desnecessários no cache; o laboratório usa apenas chaves e dados fictícios.

**Verificação local em 28/10/2026:** Compose iniciou Redis 8.8.4 em `127.0.0.1:56380`, sem volume/persistência; PostgreSQL 17 foi iniciado num projeto e volume temporários separados em `127.0.0.1:55434`, com migrations aplicadas. `test:redis` comprovou HTTP 201/201/201/429, isolamento de keys, `X-Forwarded-For` ignorado e 503 sem gravação após desconexão. `test:cache` comprovou miss/hit, TTL, invalidação após POST e fallback ao PostgreSQL com Redis real desconectado; executou em contêiner PostgreSQL separado e limpou a linha e keys de teste. `npm test` passou 48/48, E2E 3/3, validação de conteúdo e auditoria de carga didática passaram; Compose também foi validado. O benchmark rodou três vezes com 500 linhas temporárias e 30 pares por execução: PostgreSQL direto teve p50/p95 de 16,17/35,22 ms, 19,29/27,95 ms e 17,18/25,12 ms; cache aquecido, 15,19/26,60 ms, 15,93/34,86 ms e 17,70/23,88 ms. Em cada execução, evitou 30/30 SELECTs, registrou 30/30 hits e usou 27.785 bytes serializados (28.784 bytes atribuídos à key); houve um GET Redis por leitura. A latência p50 caiu em duas execuções e subiu em uma; p95 também variou, então este perfil não demonstra ganho HTTP consistente. A memória e as consultas são custos locais observados; preço mensal, concorrência, Preview e produção não foram medidos. A nova seção da aula passou a validação de conteúdo e sintaxe; revisão visual desta ampliação não foi feita. Não foi feito teste de Preview ou domínio.

### Fase 7.5 — Operação e portabilidade

- [x] Configurar logs JSONL com timestamp, nível, evento e rota allowlisted; omitir mensagem/stack, IP, body, query, credenciais e erro não reconhecido.
- [x] Adicionar liveness, readiness de PostgreSQL/Redis e sonda local com alerta após falhas consecutivas, incluindo resolução após recuperação.
- [x] Ensinar limites, custos, quotas e risco de dependência de fornecedor (vendor lock-in).
  - [x] Atualizar `delivery-hosting-models` com estimativa por componente/unidade/janela, cenários esperado/crescimento/pico, quotas, excedentes, efeito dos limites e custo de saída; fontes oficiais da Vercel, Supabase e Clerk são consultadas sem fixar preços que mudam.
  - [x] Acrescentar prática de comparação com data da consulta, mecanismo de alerta/teto ou ausência, definição de métricas de usuários, dependências proprietárias e ensaio reversível de exportação/restauração. Validação didática, auditoria de carga e `npm test` passaram.
- [x] Documentar exportação e backup dos dados, restauração e plano mínimo de migração de fornecedor.
  - [x] Manter `BACKUP_RESTORE.md` como procedimento PostgreSQL e criar `PROVIDER_MIGRATION.md` para inventariar roles, extensões, identidade, Redis, arquivos, configuração, corte, retorno e validação numa cópia isolada.
  - [x] Ligar a prática ao README e à aula `delivery-ci`; explicitar que o dump local não migra Clerk, RLS gerenciado, Redis, arquivos nem segredos.
  - [x] Reexecutar restauração em PostgreSQL 17 descartável com dados fictícios: `estudos=2`, `sessoes=1`, hashes iguais e origem preservada; `src/postgres.integration.test.cjs` passou 1/1 contra a base restaurada. Não houve migração remota, de Clerk ou Supabase.
- [x] Criar rollback da aplicação e migration de banco compatível com a versão anterior quando necessário.
  - [x] `003_add_observacao_sessoes.sql` acrescenta uma coluna opcional; `migration-compatibility.integration.test.cjs` aceita somente host de loopback e o banco `backend_camadas`, aplica `001` e `002`, usa o repositório anterior, aplica a expansão e confirma leituras e gravações antigas antes e depois, inclusive após uma observação fictícia ser gravada pela forma nova.
  - [x] Validar no PostgreSQL 17 descartável do Compose: compatibilidade passou 1/1; a base temporária, volume e rede exclusivos foram removidos. Simulação em repositório Git descartável confirmou que `git revert` cria um commit novo e restaura o conteúdo anterior.
  - [x] Documentar em `DEPLOY_VERCEL.md` o rollback do Preview `testes` por `git revert`, push e conferência do novo deployment; manter a migration expansiva aplicada e separar o procedimento de Production Instant Rollback.
  - [x] Atualizar `delivery-ci` com prática, erros e quiz sobre compatibilidade expansiva/contrativa; validador registrou 132 aulas, 536 exercícios e 409 questões; auditoria de carga, 57 testes unitários, 3 E2E, sintaxe e `git diff --check` passaram. Revisão visual da aula não executada.
  - [x] Não houve rollback nem deploy Vercel remoto nesta sessão; o roteiro requer conferência autenticada do Preview após o push.
- [x] Produzir runbook de deploy, falha de autenticação, falha de banco, incidente e recuperação.
  - [x] Criar `labs/backend-layers/RUNBOOK.md` separando Preview Vercel, login Clerk, autorização/progresso Supabase e PostgreSQL/Redis local; incluir triagem por status, segurança de evidências, prioridade de incidente, rollback de `testes`, recuperação e critérios verificáveis.
  - [x] Ligar o runbook ao README, ao guia de deploy e à aula `delivery-ci`; acrescentar um cenário guiado simulado de 403, exercício e questão sem exigir acesso a contas reais.
  - [x] Validador 132 aulas/537 exercícios/410 questões, auditoria de carga (delivery-ci: 7 seções, 8 passos guiados, 4 tipos de exercício), sintaxe, `git diff --check`, suíte 57/57 e E2E 3/3 passaram.
  - [x] Conferir fontes oficiais atuais GitHub Actions, Vercel, Clerk, Supabase e PostgreSQL; não houve verificação remota de autenticação, isolamento de duas contas ou deploy nesta sessão.

**Aceite:** existem evidências da execução remota da CI, do Preview acessível com HTTPS, da recuperação de versão e dados e da correção de uma falha protegida por regressão. Domínio próprio não é requisito de publicação para este projeto.

**Pendências de aceite remoto:**

- [ ] Conferir em GitHub Actions que os jobs `validate-and-test` e `backup-restore` estão verdes para o SHA mais recente. O `gh` não está instalado neste computador e a consulta web às páginas/API do repositório não abriu nesta sessão.
- [ ] Com acesso autenticado, confirmar Preview da branch `testes` em HTTPS e verificar o SHA/estado Ready; o deploy e rollback Vercel não foram observados remotamente.
- [ ] Com duas contas fictícias autorizadas, comprovar que login, gravação, recarga e isolamento de progresso funcionam no Supabase; nenhuma conta real foi usada.

**Aceite adicional da stack guiada:** duas contas reais de teste acessam somente seus próprios dados; o login Google usa URLs autorizadas; nenhum segredo aparece no repositório ou bundle do navegador; o Preview `vercel.app` funciona com HTTPS; uma falha e um rollback são observados; o aluno explica o papel de Clerk, Supabase, Vercel, DNS e Redis e consegue indicar alternativas. Domínio próprio é opcional: seu funcionamento é ensinado conceitualmente, sem exigir compra, configuração ou validação real.

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
| 26/10/2026 | Fase 3 — contexto de trabalho | `136b9d2` | `prep-workspace` ganhou critérios em quatro exercícios e passou a ser exigida pelo validador. Verificações automatizadas e conferência publicada pendentes. |
| 26/10/2026 | Fase 3 — ciclo de execução | `c8400c0` | `prep-cycle` ganhou critérios nos quatro exercícios e o resultado da previsão deixou de antecipar a saída literal. Verificações automatizadas e conferência publicada pendentes. |
| 26/10/2026 | Fase 3 — leitura de erros | `352d16b` | `prep-errors` ganhou critérios nos quatro exercícios; a prova prática pede evidências observadas e o relato separa fatos de hipóteses. Verificações automatizadas e conferência publicada pendentes. |
| 26/10/2026 | Fase 3 — ambientes iniciais | `7dc8d45` | Os quatro exercícios de `setup-editor`, `setup-python`, `setup-git` e `setup-node` ganharam critérios reutilizáveis; previsão não revela a resposta literal. Validação automatizada e conferência manual pendentes. |
| 26/10/2026 | Fase 3 — preparação Docker | `71b58cb` | `setup-docker` ganhou critérios nos quatro exercícios, com distinção entre cliente, Engine, Compose e permissões. Validação automatizada e conferência manual pendentes. |
| 26/10/2026 | Fase 3 — alternativa SQLite | `b122805` | `setup-docker-alternative` ganhou critérios nos quatro exercícios; previsão preservada e relatório com evidências e pendências. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — conexão PostgreSQL | `560c18b` | `setup-postgresql` ganhou critérios nos quatro exercícios; destino, evidências e diagnóstico seguro explicitados. Validação de conteúdo passou; navegador e laboratório real não verificados. |
| 26/10/2026 | Fase 3 — bancos opcionais | `d526b73` | As preparações de MariaDB, Firebird e MongoDB ganharam critérios reutilizáveis; resultados foram ajustados para pedir evidências sem antecipar a resposta. Verificações não executadas nesta etapa. |
| 26/10/2026 | Fase 3 — laboratório MariaDB | `1d887dd` | `db-mariadb` ganhou critérios nos quatro exercícios; resultados esperados deixaram de exibir diretamente as linhas e valores finais. Verificações não executadas nesta etapa. |
| 26/10/2026 | Fase 3 — laboratório Firebird | `aba8cb6` | `db-firebird` ganhou critérios nos quatro exercícios; os resultados visíveis não antecipam nomes ou contagens. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — CRUD MongoDB | `8f8fdff` | `db-mongo-crud` ganhou critérios nos quatro exercícios; previsões e contagens ficaram para a prática do aluno. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — pipelines MongoDB | `3326024` | `db-mongo-pipelines` ganhou critérios nos quatro exercícios; grupos, totais e contagens ficaram para a prática do aluno. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — modelagem NoSQL | `2f3717f` | `db-nosql-models` ganhou critérios nos quatro exercícios; acesso, custo de atualização, crescimento e sincronização ficaram observáveis. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — desempenho SQL | `bbcfa47` | `db-performance` ganhou critérios nos quatro exercícios; previsão, plano observado e correção funcional foram separados. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — segurança de dados | `86d209f` | `db-security` ganhou critérios nos quatro exercícios; busca, contagem e alteração exigem escopo de usuário e evidência observada. Validação de conteúdo passou; laboratório e navegador não verificados. |
| 26/10/2026 | Fase 3 — recuperação de dados | `3dad6cf` | `db-recovery` ganhou critérios nos quatro exercícios; o enunciado da previsão foi corrigido para conferir o título na cópia. Validação de conteúdo passou; laboratório e navegador não verificados. |
| 26/10/2026 | Fase 3 — projeto de dados | `c708f99` | `db-project` ganhou critérios nos quatro exercícios; previsões de progresso ficaram para a prática e o desenho de FKs não é tratado como teste executado. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — modelagem de dados | `4aa3079` | `db-modeling` ganhou critérios nos quatro exercícios; resultados esperados deixaram de antecipar contagens e linhas literais. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — normalização de dados | `92d9575` | `db-normalization` ganhou critérios nos quatro exercícios; o exemplo ativa chaves estrangeiras e verifica a representação de data ausente. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — restrições SQL | `f00d3f5` | `db-ddl-constraints` ganhou critérios nos quatro exercícios; testes positivos, recusas e diagnóstico de FK foram separados. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — CRUD SQL | `a60775d` | `db-ddl-crud` ganhou critérios nos quatro exercícios; a remoção agora pode ser feita a partir do exemplo inicial e os resultados não antecipam linhas literais. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — consultas SQL | `2dd4f3b` | `db-select` ganhou critérios nos quatro exercícios; filtros, limites, ordem e valores ausentes são verificados sem antecipar as linhas finais. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — agregações SQL | `3e02d01` | `db-aggregation` ganhou critérios nos quatro exercícios; população, agrupamento e filtros de grupo são verificados sem antecipar totais ou médias. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — junções SQL | `d77435c` | `db-joins` ganhou critérios nos quatro exercícios; linhas preservadas, contagem de filhos e posição do filtro são verificadas sem antecipar a saída. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — subconsultas e CTEs | `80dbfcb` | `db-subqueries-ctes` ganhou critérios nos quatro exercícios; média, resumos e granularidade são verificados sem antecipar os valores finais. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — transações SQL | `1bf7c92` | `db-transactions` ganhou critérios nos quatro exercícios; a transferência exige verificar os dois movimentos antes de confirmar. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — concorrência e limites | `58a2e49` | `db-concurrency-boundaries` ganhou critérios nos quatro exercícios; savepoint, efeito externo e repetição da unidade são verificados sem antecipar estados finais. Validação de conteúdo passou; conferência manual pendente. |
| 26/10/2026 | Fase 3 — fundamentos Docker | `c083251` | `db-docker-basics` ganhou critérios nos quatro exercícios; imagem, Engine e volume são diferenciados, com diagnóstico que preserva os dados. Validação de conteúdo passou; laboratório Docker pendente. |
| 26/10/2026 | Fase 3 — Docker Compose | `e9cd627` | `db-docker-compose` ganhou critérios nos quatro exercícios; portas, configuração e persistência são verificadas sem antecipar saídas literais. Validação de conteúdo passou; laboratório Docker pendente. |
| 26/10/2026 | Fase 3 — operações Docker | `9c35d07` | `db-docker-operations` ganhou critérios nos quatro exercícios; diagnóstico, restauração separada e credenciais persistidas são verificados. Validação de conteúdo passou; laboratório Docker pendente. |
| 26/10/2026 | Fase 3 — PostgreSQL | `fa52f82` | `db-postgres` passou a usar a instância Compose existente, com base própria e critérios nos quatro exercícios. Validação de conteúdo passou; laboratório PostgreSQL pendente. |
| 26/10/2026 | Fase 3 — SQLite | `76b15ca` | `db-sqlite` passou a apontar para setup-python e ganhou critérios nos quatro exercícios; parâmetros, reversão e backup são conferidos sem antecipar saídas. Validação de conteúdo passou; execução Python pendente. |
| 26/10/2026 | Fase 6 — validação no servidor | `7fc4770` | Novo laboratório Node aceita criação válida e recusa pedidos inválidos sem alterar a lista. Testes do laboratório HTTP e do novo laboratório passaram; conferência manual no navegador pendente. |
| 27/10/2026 | Fase 6 — camadas de backend | `a9e4349` | Novo laboratório separa HTTP, validação, regra de título único e repositório em memória. Validação de conteúdo, sintaxe e smoke manual de 201/409 passaram; interface no navegador pendente. |
| 27/10/2026 | Fase 6 — testes unitários | `4f4c705` | Regra de título único ganhou testes isolados para normalização, duplicidade e cadastro inédito. Três testes e validação de conteúdo passaram. |
| 27/10/2026 | Fase 6 — preparação de esquema | `f653aa6` | Migration `001_create_estudos.sql` preparada para a integração PostgreSQL; aplicação e teste aguardam conclusão do repositório. |
| 27/10/2026 | Fase 6 — repositório assíncrono | `9bad661` | Interface de memória passou a usar Promises; smoke manual confirmou GET, criação `201` e duplicidade `409`. Testes unitários e validador passaram. |
| 27/10/2026 | Fase 6 — integração PostgreSQL | `4c4d9f9` | `pg` isolado no laboratório, repositório parametrizado, migration rastreada, resposta de erro e teste de integração adicionados. Sete testes unitários, sintaxe, Compose config e validador passaram; aplicação real aguarda daemon Docker local. |
| 27/10/2026 | Fase 6 — migrations e transação | `650dc10` | Aplicador percorre migrations em ordem; migration 002 cria sessões; API grava estudo/sessão atomicamente; 17 testes, sintaxe, validador, Compose config e smoke HTTP em memória passaram. Execução PostgreSQL real segue pendente. |
| 27/10/2026 | Fase 6 — persistência e evolução verificadas | `c7656ac` | PostgreSQL 18 descartável aceitou as migrations 001–002, teste de integração, API real e rollback. A prática da migration 003 foi documentada e validada numa cópia temporária; testes passaram. Docker Compose continua pendente. |
| 27/10/2026 | Fase 7 — reproduzir e corrigir defeito | `c7656ac` | `labs/bug-investigation` apresenta falha reproduzível de mutação; o teste ficou vermelho com o código inicial e verde após correção em cópia temporária. |
| 27/10/2026 | Fase 7 — fluxo automatizado no navegador | `66636e5` | `labs/backend-layers/e2e` executa Chromium headless contra a interface e API reais do laboratório em memória; 1 fluxo passou. O teste não comprova persistência PostgreSQL. |
| 27/10/2026 | Fase 7 — CI real | `66636e5` | Run [40605904963](https://github.com/bzraiago/tech-learning-hub/actions/runs/40605904963) passou no GitHub Actions: validação, 17 testes unitários, migrations, integração PostgreSQL 17 e Playwright. |
| 27/10/2026 | Fase 7 — recuperação de falha na CI | `92fb73d` | Na branch temporária, o run [40606364491](https://github.com/bzraiago/tech-learning-hub/actions/runs/40606364491) identificou a asserção incorreta; após restaurar `valido: true`, o run [40606768881](https://github.com/bzraiago/tech-learning-hub/actions/runs/40606768881) passou em todas as etapas. `main` não foi alterada durante a prática e o branch foi removido. |
| 27/10/2026 | Fase 7 — serviço externo real | `9c6dab5` | Open-Meteo foi integrado ao laboratório com validação do contrato, atribuição visível e falhas simuladas. Smoke público sem chave passou; validador, 29 testes unitários e 2 fluxos locais Playwright passaram; run [40607589139](https://github.com/bzraiago/tech-learning-hub/actions/runs/40607589139) passou no GitHub Actions. |
| 27/10/2026 | Fase 7 — demonstração Vercel | `43decdc` | Página independente e função Node.js foram publicadas; o check de deploy concluiu. Os aliases conhecidos exigem sessão Vercel e exibem a tela de login, portanto a URL pública final e o fluxo remoto ainda precisam de confirmação. A CI [40608266317](https://github.com/bzraiago/tech-learning-hub/actions/runs/40608266317) passou. |
| 27/10/2026 | Fase 7 — Preview da branch `testes` | `ea4ca2d` | A branch criada a partir de `main` gerou um deployment Preview; status Vercel e CI passaram. A URL ainda exige sessão Vercel, então o acesso anônimo e o comportamento da aplicação não foram verificados. |
| 27/10/2026 | Fase 6/7 — falha de banco e rollback | `ea4ca2d` | `npm test` passou nos 32 testes; validador de conteúdo passou. API real com PostgreSQL indisponível respondeu `500` genérico sem expor detalhes; `start:memory` identificou armazenamento temporário e a API respondeu `200` com dados fictícios. O guia de rollback foi corrigido conforme a documentação atual da Vercel. Rollback remoto e acesso anônimo aos previews seguem pendentes. |
| 27/10/2026 | Fase 7 — backup e restauração comprovados | `33d1df8` | `npm run test:backup-restore` passou localmente com PostgreSQL 17: dump custom, índice conferido, restauração em base nova, duas tabelas comparadas e origem preservada (`2` estudos, `1` sessão fictícia). Os jobs [backup-restore](https://github.com/bzraiago/tech-learning-hub/actions/runs/40617482760/job/122583268293) e [validate-and-test](https://github.com/bzraiago/tech-learning-hub/actions/runs/40617482760/job/122583268183) passaram; o Preview Vercel também concluiu com sucesso. A configuração, o container e o volume temporários foram removidos após a execução. |
| 27/10/2026 | Fase 6 — Docker Compose local | Sem alteração de código | Com Docker Engine 29.7.2 e PostgreSQL 17, conexão e migrations passaram; o teste de integração passou (1/1). A API retornou `201` para criação e `409` para duplicidade, e o registro permaneceu após reiniciar a API. O container, a rede, o volume e o `.env` fictícios desta execução foram removidos. |
| 27/10/2026 | Fase 7.1 — DNS e domínio conceituais | Commit pendente | Duas aulas adicionais explicam resolução recursiva/delegação e um plano seguro de domínio personalizado, com oito exercícios e seis questões. O laboratório estático foi reorientado ao Preview existente da branch `testes`; nenhuma mudança DNS ou teste com domínio próprio foi executado. Contagens registradas naquela etapa: 121 aulas, 486 exercícios e 361 questões. Validação estrutural e revisão visual/teclado ainda pendentes. |
| 27/10/2026 | Fase 3 — execução de exemplos | `53c9c16` | Além das execuções já registradas, os exemplos e exercícios de `db-postgres`, `db-mariadb`, `db-firebird`, `db-mongo-crud` e `db-mongo-pipelines` passaram em PostgreSQL 17, MariaDB 11.8.9, Firebird 5.0.4 e MongoDB 8.0.34 reais em containers descartáveis. As restrições inválidas foram observadas e as verificações confirmaram que nenhuma tentativa recusada alterou os dados. Containers e volumes de teste foram removidos. |
| 27/10/2026 | Fase 3 — progressão dos exercícios | Commit pendente | A interface nomeia as etapas, oferece um desafio final de mudança de requisito com critérios e salva as anotações na chave compatível do estado atual; o validador exige quatro exercícios e dicas. Auditoria do encaixe aula a aula e conferência visual/teclado/sincronização publicada ainda pendentes. |
| 27/10/2026 | Fase 3 — tipos de atividade | Commit pendente | `EXERCISE_STAGES` define prever, alterar, construir e investigar erro com instrução e critério observável. As 114 aulas têm ao menos quatro exercícios com dicas e o validador verifica a sequência comum. O renderizador de produção exibiu os títulos, critérios e desafio final para os 114 guias em Chromium a 375 px; o teclado alcançou o campo final. Estilo da aplicação e salvamento remoto ainda precisam de conferência publicada. |
| 27/10/2026 | Fase 3 — reconhecimento de erros | Commit pendente | As 114 aulas contêm de três a cinco erros comuns; o validador agora exige pelo menos três e a Revisão ensina a capturar sinal, passo causador e resultado esperado antes da correção. O renderizador em Chromium exibiu os erros e a orientação em todos os guias; estilo, teclado e conferência no site publicado ainda pendentes. |
| 27/10/2026 | Fase 3 — transferência | Commit pendente | As 114 aulas têm segunda tentativa com resultado e pista; nenhuma foi idêntica ao exercício de origem e a auditoria de termos mostrou baixa sobreposição com os exercícios da própria aula. O renderizador de produção exibiu a recuperação após quiz errado nos 114 guias em Chromium a 375 px; o teclado alcançou o rascunho. As amostras das nove trilhas mudam cenário e dados. |
| 27/10/2026 | Fase 7.1 — fundamentos de hospedagem e DNS | Commit pendente | Sete aulas cobrem papéis de registrador/DNS/hospedagem, resolução recursiva, registros A/AAAA/CNAME/TXT/NS, TTL, HTTPS/TLS, modelos, Preview e plano conceitual de domínio; total de 28 exercícios e 20 questões. `labs/deployment-static` usa o Preview existente e inclui alternativa conceitual se protegido. RFC 5737, RFC 3849, RFC 1034 e RFC 6761 foram conferidas para exemplos. A checagem remota do Preview ainda pode ser bloqueada por autenticação Vercel; domínio real e testes dependentes dele estão fora do escopo por decisão do dono. Contagens registradas naquela etapa: 121 aulas, 486 exercícios e 361 questões. |
| 27/10/2026 | Fase 7.2 — OAuth/OIDC com Google e Clerk | Conceitos concluídos | `delivery-oauth-google` explica o fluxo mediado pelo Clerk, callback versus retorno ao Preview, consentimento, escopos mínimos, `state`/`nonce`, diagnóstico de `redirect_uri_mismatch` e separação de autenticação, autorização e RLS. O usuário já havia confirmado que o login Google funcionou. Conceitos apoiados em documentação oficial; domínio próprio e validação de produção não são requisitos. Contagens na etapa: 122 aulas, 490 exercícios e 366 questões. Validação de conteúdo passou; não foram feitos testes de domínio ou produção. |
| 27/10/2026 | Fase 7.2 — integração Clerk–Supabase e RLS | Conceitos concluídos | `delivery-clerk-supabase` usa os arquivos reais `cloud.js` e `learning-state.sql` para explicar token de sessão, claim `sub`, roles, grants, `USING`, `WITH CHECK`, chaves e matriz de isolamento para duas contas. Validador de conteúdo passou. Nenhuma policy ou dado remoto foi alterado; a prova de isolamento por duas contas segue pendente. Sem teste de domínio/Production. Contagens na etapa: 123 aulas, 494 exercícios e 370 questões. |
| 27/10/2026 | Fase 7.3 — modelagem de ameaças | Conceitos concluídos | `delivery-threat-model` delimita escopo, ativos, atores, entradas e fronteiras; usa STRIDE, classifica ameaças, escolhe controle/evidência e registra hipóteses e risco residual. Inclui referências oficiais OWASP Top 10 2025 e Threat Modeling. A atividade é conceitual, usa exemplos fictícios e não executa ataque nem testa domínio. Validador de conteúdo passou; revisão visual manual pendente. Contagens: 124 aulas, 498 exercícios e 374 questões. |
| 27/10/2026 | Fase 7.3 — OWASP Top 10 e BOLA/IDOR | Prática local concluída; cobertura OWASP parcial | `delivery-owasp-top10` apresenta as dez categorias OWASP 2025 como conscientização e explica autenticação versus autorização. `labs/security-basics` reproduz A01/BOLA em servidor loopback com dados fictícios, corrige a checagem no servidor e cobre leitura/escrita próprias e cruzadas; `node --test labs/security-basics/server.test.cjs` passou (6/6). Sem deploy, domínio próprio ou chamadas remotas. Laboratórios das demais categorias e revisão visual/teclado permanecem pendentes. Contagens: 125 aulas, 502 exercícios e 378 questões. |
| 28/10/2026 | Fase 7.3 — XSS e saída por contexto | Aula e demonstração preparadas; conferência no navegador pendente | `delivery-xss-output` detalha fontes, sinks, XSS refletido/armazenado/DOM e escolha contextual de saída. `labs/security-xss/demo.html.example` mantém a cópia executável fora do deployment; efeito é limitado ao aviso local, sem rede nem dados reais. Referências OWASP e MDN foram abertas e conferidas. Validador de conteúdo e `node --check` passaram. A automação de interface falhou porque o helper local do Windows não conseguiu conectar; não declarei a demonstração de navegador verificada. Sem teste de Preview/domínio. Contagens: 126 aulas, 506 exercícios e 382 questões. |
| 28/10/2026 | Fase 7.3 — CSRF e modelos de sessão | Conceitos concluídos; sem teste de serviço remoto | `delivery-csrf` explica cookie ambient, CORS, preflight, token, SameSite, Origin/Referer e Fetch Metadata, além dos limites de cada controle. A análise estática de `cloud.js` registra token Clerk obtido e enviado explicitamente como Bearer; não conclui que o app esteja imune nem que configuração remota seja segura. Fontes OWASP e MDN abertas e conferidas. Validador de conteúdo passou. Contagens: 127 aulas, 510 exercícios e 386 questões. |
| 28/10/2026 | Fase 7.3 — Abuso de API e consumo de recursos | Aula conceitual concluída; integração HTTP por IP observado feita na Fase 7.4; quota por conta pendente | `delivery-api-abuse` diferencia OWASP API4/API6, custo por pedido e por fluxo, quotas, limites por identidade, status 429/Retry-After, idempotência, IP, observabilidade e plano de testes locais determinísticos. `backend-validation` demonstra 413 por corpo grande; `backend-layers` agora limita gravações HTTP por IP observado com Redis real, sem autenticação de contas. Referências oficiais OWASP conferidas. Não houve teste de carga, Preview ou domínio; o projeto será usado apenas em Preview e não exige domínio próprio. Contagens: 128 aulas, 514 exercícios e 390 questões. |
| 28/10/2026 | Fase 7.3 — Cadeia de suprimentos | Aula e inspeção estática concluídas; `npm audit` não executado | `delivery-supply-chain` diferencia dependências diretas/transitivas, runtime/dev, manifesto/lockfile, `npm ci` e `npm audit`; inspeciona os arquivos versionados de `labs/backend-layers` e o workflow real sem instalar ou atualizar pacotes. Fonte OWASP A03:2025 PT-BR e documentação oficial npm conferidas. A atividade não afirma estado atual de vulnerabilidades e não exige domínio/Preview. Contagens: 129 aulas, 518 exercícios e 394 questões. |
| 28/10/2026 | Fase 7.3 — CSRF em laboratório local | Prática local concluída (7/7); navegador/provedor não testados | `labs/security-csrf` compara rota que confia só em cookie fictício com rota que valida origem e token; verifica 200/401/403/413 e se a nota em memória mudou. `node --check` nos dois arquivos e `node --test labs/security-csrf/server.test.cjs` passaram. Os testes não simulam cookie automático, SameSite, CORS real, Clerk/Supabase, Preview ou domínio. |
| 28/10/2026 | Fase 7.4 — fundamentos e demonstrações locais de Redis | `a88d5f1` | Base didática concluída; integração de aplicação e medição pendentes. Três aulas cobrem decisão de adoção, cache-aside, TTL, invalidação, dados obsoletos, contadores e janela fixa. `labs/redis-fundamentals` limita Redis a loopback, desativa persistência e usa dados fictícios. `docker-compose config`, `check-cache-aside.cjs` e `check-rate-limit.cjs` passaram; não há conexão com PostgreSQL, middleware HTTP, teste de indisponibilidade injetada ou benchmark. Nenhum teste de Preview/domínio foi executado. Contagens: 132 aulas, 530 exercícios e 406 questões. |
| 28/10/2026 | Fase 7.4 — integração HTTP e Redis real | `0d8ab47` | `backend-layers` usa `node-redis` e o script Lua do módulo Redis; o teste real comprovou limite concorrente, keys isoladas, respostas 201/201/201/429, 503 após desconexão e ausência de gravação recusada. A API inicia conectada ao Redis; Compose limita a porta ao loopback e não persiste dados. 42 testes unitários, 3 E2E, roteiro visual/teclado em 375 px e validador de conteúdo passaram. O push disparou CI; status remoto não consultável nesta sessão. Quota por conta, cache-aside na API, benchmark e Preview permanecem fora deste commit. |
| 28/10/2026 | Fase 7.4 — cache-aside com PostgreSQL e Redis | `e873866` | `GET /api/estudos` usa key `cache:v1:backend-layers:studies:list`, TTL, invalidação após gravação e coalescência de misses no processo. `test:cache` passou com PostgreSQL 17 e Redis reais: miss/hit, leitura evitada, invalidação, leitura atualizada e fallback após desconexão. `npm test` passou 48/48, E2E 3/3, validador e revisão visual/teclado em 375 px passaram. Staleness após falha de `DEL` e race entre processos seguem documentadas; cache de dados por conta não é coberto. CI remota disparada pelo push, status não consultável nesta sessão. |
| 28/10/2026 | Fase 7.4 — benchmark local Redis e PostgreSQL | `dfd3bfa` | Script reproduzível compara APIs locais com 500 linhas temporárias e 30 pares sequenciais; três execuções mediram p50/p95 de 16,17/35,22; 19,29/27,95; 17,18/25,12 ms direto e 15,19/26,60; 15,93/34,86; 17,70/23,88 ms com cache. Cache evitou 30/30 SELECTs por rodada, teve 30/30 hits e consumiu 28.784 bytes atribuídos à key, além de 1 GET Redis por leitura. A latência não melhorou consistentemente; a evidência sustenta economia de consultas neste perfil, não adoção por ganho de latência. Preço mensal, concorrência e produção não foram medidos. Validação de conteúdo e auditoria didática passaram; conferência visual desta ampliação pendente. Contagens: 132 aulas, 531 exercícios e 406 questões. |
| 28/10/2026 | Fase 7.5 — logs JSONL minimizados | `40fba93` | `backend-layers/src/logger.cjs` emite timestamp, nível, evento, rota conhecida e códigos reconhecidos; descarta campos fora da allowlist. Startup informa somente modos locais; erros não incluem mensagem/stack, IP, query, corpo, título ou credenciais. `npm test` passou 52/52; `test:redis` e `test:cache` passaram com serviços reais, E2E 3/3, validador de conteúdo 132 aulas/532 exercícios/406 questões e auditoria pedagógica passaram. Rechecagem visual da aula não realizada nesta sessão. |
| 28/10/2026 | Fase 7.5 — readiness e alerta local | `105f66a` | `/health/live` separa processo ativo de `/health/ready`; readiness verifica `SELECT 1` e Redis `PING`, responde 503 genérico quando Redis cai. `monitor:api` consulta a API local a cada 5 s, abre alerta após duas falhas seguidas e registra resolução após recuperação, sem webhook. Testes incluem servidor HTTP local, limiar sem duplicar alertas e integração real 200/503; execução manual com API em memória observou `monitor.alert.opened` ao parar e `monitor.alert.resolved` ao reiniciar. `npm test` passou 57/57, `test:redis` 1/1, `test:cache` 1/1, E2E 3/3, validador 132 aulas/533 exercícios/406 questões, auditoria didática e Compose passaram. Conferência visual da ampliação não feita nesta sessão. |
| 28/10/2026 | Fase 7.5 — custos, quotas e portabilidade didática | `24a8475` | `delivery-hosting-models` agora ensina estimativa por unidade/janela, quotas, excedentes, alertas e custo de saída; links oficiais Vercel/Supabase/Clerk, sem valores fixos. Atividade inclui três cenários, métricas de usuários não equivalentes e ensaio reversível de exportação/restauração. Validador (132 aulas/534 exercícios/407 questões), auditoria de carga, sintaxe e `git diff --check` passaram; suíte `backend-layers` passou 57/57. Não foram medidos preços ou uso em produção. Conferência visual pendente devido ao bloqueio de navegação local desta sessão. |
| 28/10/2026 | Fase 7.5 — backup, restauração e migração de fornecedor | `3e298ac` | `PROVIDER_MIGRATION.md` inventaria PostgreSQL, roles, extensões, identidade, Redis, arquivos e configuração; descreve ensaio isolado, corte e retorno e deixa claro que migração remota não foi executada. `test:backup-restore` passou com `estudos=2`, `sessoes=1`, hashes iguais e origem preservada; restore manual para base nomeada repetiu as contagens e `src/postgres.integration.test.cjs` passou 1/1 contra o destino. Os dois projetos/volumes Compose exclusivos foram removidos. Validador 132/535/408, auditoria, sintaxe, `git diff --check` e suíte unitária 57/57 passaram. Não houve migração Clerk/Supabase remota nem smoke HTTP de fornecedor; rechecagem visual de aula pendente pela política de navegação local. |
| 28/10/2026 | Fase 7.5 — rollback da aplicação e migration compatível | `8298430` | `003_add_observacao_sessoes.sql` expande schema com coluna opcional; teste PostgreSQL 17 descartável passou 1/1 depois de comprovar leitura/escrita antiga antes/depois e preservar observação gravada pela forma nova. Simulação Git confirmou commit de reversão; Vercel não foi alterada. `delivery-ci`, DEPLOY_VERCEL e README ensinam revert do Preview `testes` e expansão/contração. Unitários 57/57, E2E 3/3, validador 132/536/409, auditoria de carga, sintaxe e `git diff --check` passaram. Container/volume temporários removidos; revisão visual da aula não executada. |
| 28/10/2026 | Fase 7.5 — runbook operacional | `7b02b1c` | `RUNBOOK.md` cobre CI/Preview, autenticação Clerk, progresso/RLS Supabase, PostgreSQL/Redis local, incidente, rollback e critérios de recuperação com evidências redigidas. `delivery-ci` inclui cenário simulado de 403 sem exigir contas reais. Unitários 57/57, E2E 3/3, validador 132/537/410, auditoria (7 seções, 8 passos guiados, 4 tipos), sintaxe e `git diff --check` passaram. Fontes oficiais foram conferidas. O status remoto da CI não foi acessível porque `gh` não está instalado e a página/API não abriu nesta sessão; Preview, login e isolamento de contas continuam pendentes de verificação autenticada. |

## Decisões e bloqueios

Registre aqui mudanças de direção e impedimentos que afetem a sequência.

| Data | Tipo | Decisão ou bloqueio | Motivo | Próxima ação |
|---|---|---|---|---|
| 27/10/2026 | Decisão de ambiente | O daemon Docker não está acessível nesta sessão; a validação PostgreSQL foi feita numa instância 18 descartável, vinculada somente a `127.0.0.1:55433`, e encerrada após os testes. | O caminho PostgreSQL real ficou verificável sem tocar no Supabase nem no banco permanente; o fluxo específico de Docker Compose não foi executado. | Seguir para a Fase 7; quando Docker estiver disponível, conferir também o caminho Compose do laboratório. |
| 27/10/2026 | Prática CI | Foi introduzida e corrigida uma expectativa de teste incorreta em branch temporária; `main` permaneceu intacta e verde. | A prática demonstrou localizar a primeira etapa vermelha, comparar esperado/observado, restaurar a asserção e esperar a CI confirmar os testes seguintes. | Integrar e documentar um serviço externo real no laboratório backend. |
| 27/10/2026 | Acesso à demonstração | A Vercel concluiu o deploy do commit `43decdc`, mas o alias `git-main` mostra “Login – Vercel” a clientes sem sessão. O dono autorizou tornar previews públicos. | A proteção dos previews é independente da autenticação Clerk da aplicação; a configuração ainda não foi alterada porque esta sessão não tem acesso autenticado à Vercel. | Conectar a conta Vercel ou desativar a proteção apenas para Preview no painel; depois conferir a página e o JSON em janela anônima. |
| 27/10/2026 | Docker Compose local | O Docker Engine foi iniciado pelo dono do projeto; o caminho Compose do laboratório foi validado com PostgreSQL 17 e dados fictícios. | O backup foi restaurado e comparado com a origem; o volume temporário foi removido depois do teste. | Continuar os itens pendentes do roadmap; Docker local não é pré-requisito para validar o deploy Preview da Vercel. |
| 27/10/2026 | Escopo de DNS e domínio | O projeto será usado apenas por Preview, sem domínio próprio. | O dono pediu conceitos detalhados de DNS e publicação mesmo sem validar um domínio real. | Manter exemplos `.test` e marcadores fictícios; não comprar, configurar ou testar domínio customizado. |
| 28/10/2026 | Escopo dos testes de publicação | O projeto será usado somente em Preview Vercel e não tem domínio próprio. | O dono confirmou que conceitos de publicação, DNS e domínio devem permanecer detalhados, mesmo sem validação que dependa de domínio. | Priorizar verificações locais e conceituais; não exigir domínio ou testes vinculados a ele. |

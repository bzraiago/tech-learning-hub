# Auditoria didática — carga cognitiva das aulas

**Data:** 24/10/2026  
**Verificação de fontes:** parcial; fontes SQLite, Docker, MongoDB CRUD e acessibilidade HTML das candidatas revisadas conferidas
**Escopo:** aulas com mais de quatro seções conceituais em `LESSON_GUIDES`

## 1. Veredito

O mapeamento estrutural encontrou originalmente 41 aulas com mais de quatro seções. Após a revisão de `html-forms`, a auditoria automática aponta 23: as cinco aulas fundamentais de banco preservaram seus IDs e receberam aulas complementares menores; as dez aulas avançadas prioritárias foram condensadas sem mudar seus IDs. A prioridade 2 foi concluída e a prioridade 3 começou.

## 2. Contrato de aprendizagem

- **Público:** aluno iniciante, com preparação digital concluída e os pré-requisitos declarados por cada trilha.
- **Nível prometido:** compreender um bloco conceitual, executar um exemplo, prever comportamento e resolver uma tarefa nova sem receber vários conceitos inéditos de uma vez.
- **Condições:** navegador e editor; SQLite/Python nas aulas de banco; demais ferramentas conforme as preparações já existentes.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Média | G | 2 aulas HTML e 6 JavaScript | RISCO | Possuem cinco ou seis seções; já têm três passos guiados, mas somente um ou dois tipos de exercício explicitamente identificados. | Manter IDs e priorizar intercalação/prática antes de criar novas aulas. |
| 2 | Média | G | 9 aulas IA e 6 Entrega | RISCO | Possuem cinco seções e nenhum prefixo padronizado; parte da densidade pode ser compatível com o nível avançado. | Conferir pré-requisitos e tarefas de transferência antes de dividir. |
| 3 | Baixa | P | `scripts/audit-lesson-load.js` | SUGESTÃO | Contagem de seções é um indicador reproduzível, mas não mede dificuldade real. | Usar o relatório como triagem e exigir revisão humana antes de alterar conteúdo. |

## 4. Pré-requisitos

Grafo prioritário de banco:

`setup-python` ou cliente SQLite → db-modeling → db-normalization → db-ddl-constraints → db-ddl-crud → db-select → db-aggregation → db-joins → db-subqueries-ctes → db-transactions → db-concurrency-boundaries`

Arestas a preservar ao dividir:

- identidade, entidades e atributos antes de relacionamentos;
- relacionamentos e chaves antes de normalização;
- tabelas e restrições antes de CRUD seguro;
- filtros e `NULL` antes de agregações;
- chaves e agregações antes de `JOIN`, subconsulta e CTE;
- `UPDATE` seguro antes de transações e concorrência.

Não foram encontradas dependências circulares nesse recorte. O risco atual é avanço dentro da mesma aula sem checkpoint prático, não ordem invertida entre as cinco aulas.

## 5. Instalação e ambiente

| Ferramenta | Completo? | Falta neste escopo | Verificado? |
|---|---|---|---|
| SQLite por Python | Coberto no guia | Transformar a preparação repetida em referência curta quando as aulas forem divididas | Exemplo `db-ddl-constraints` e três recusas executados |
| Cliente SQLite local | Alternativa indicada | Nomear clientes suportados somente depois de conferir instalação por sistema | Não executado |
| Navegador/editor | Coberto pela Etapa 0 | Nenhuma mudança para o mapeamento | Não executado |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [SQLite — CREATE TABLE](https://www.sqlite.org/lang_createtable.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Confirma tipos declarados, valores padrão e restrições disponíveis. |
| [SQLite — Foreign Key Support](https://www.sqlite.org/foreignkeys.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Confirma ativação de chaves estrangeiras por conexão com `PRAGMA foreign_keys`. |
| [SQLite — SELECT](https://www.sqlite.org/lang_select.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Sustenta ordem lógica, agregação e diferenças entre `ON` e `WHERE` em junções externas. |
| [SQLite — WITH](https://www.sqlite.org/lang_with.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Referência primária para CTEs comuns, recursivas e restrições de uso. |
| [SQLite — Aggregate Functions](https://www.sqlite.org/lang_aggfunc.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Confirma comportamento de `COUNT`, `SUM`, `AVG` e valores nulos. |
| [SQLite — Transactions](https://www.sqlite.org/lang_transaction.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Sustenta controle explícito, savepoints, erros e disputa por escrita usados nas duas aulas. |
| [SQLite — Isolation](https://www.sqlite.org/isolation.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Confirma visibilidade entre conexões, serialização de escritas e limites de concorrência. |

As demais fontes das candidatas não foram revalidadas nesta etapa, pois o objetivo foi triagem estrutural, não revisão técnica integral.

## 7. Nível de saída

O mapeamento permite planejar aulas menores, mas não melhora sozinho a aprendizagem. Depois das divisões, o aluno deverá modelar um domínio pequeno, criar regras no banco, consultar dados e explicar resultados sem consultar solução. Ainda não estão comprovados domínio, retenção após alguns dias ou capacidade de transferência; isso exige tarefas novas e observação de aluno real.

## 8. Próximos passos sugeridos

1. [Concluído] Dividir `db-modeling` entre entidades/relacionamentos e `db-normalization` para normalização/decisões.
2. [Concluído] Dividir `db-ddl-crud` entre `db-ddl-constraints` e operações seguras.
3. [Concluído] Separar filtros/`NULL` de agregações em `db-select` e `db-aggregation`.
4. [Concluído] Separar junções básicas e granularidade de CTEs e subconsultas em `db-joins` e `db-subqueries-ctes`.
5. [Concluído] Separar transação básica de concorrência, repetição e efeitos externos em `db-transactions` e `db-concurrency-boundaries`.
6. Reexecutar a auditoria e revisar manualmente as prioridades 2 a 4.

### Revisão localizada: `html-forms`

- **Público e saída:** após `html-semantic` e `html-links-media`, o aluno deve criar um formulário com rótulos, controles e restrições nativas, testar entradas válidas e inválidas e explicar por que o laboratório não cria cadastro. Editor e navegador bastam.
- **FATO, média, M:** o guia tinha cinco seções, com escolha de controles e agrupamento separados apesar de ambos orientarem a mesma construção. Eles foram reunidos em quatro blocos. Os exercícios agora pedem previsão, alteração, construção e investigação de erro com comportamento esperado antes da solução. O ID e o exemplo principal foram preservados.
- **Pré-requisitos:** `html-semantic` → `html-links-media` → `html-forms` → `html-tables`. Sem dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre `form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form) e [MDN sobre validação no cliente](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam o uso de controles para envio e a necessidade de validar novamente no servidor real.
- **Limite:** o envio local pode variar entre navegadores. A revisão estrutural e o validador não comprovam que um aluno consiga construir ou depurar um formulário novo sem ajuda; o teste manual no navegador não foi executado nesta etapa.

### Revisão localizada: `html-tables`

- **Público e saída:** após as aulas de documento, links e formulários, o aluno deve planejar uma tabela pequena, marcar cabeçalhos e grupos e conferir a coerência dos valores. Editor e navegador bastam.
- **FATO, média, M:** o guia reunia seis seções e apenas `Construir` aparecia como tipo padronizado de exercício. Ele agora tem quatro blocos e atividades explícitas de prever, alterar, construir e investigar erro. Conteúdo, ID e exemplo principal foram preservados.
- **Pré-requisitos:** `html-semantic` → `html-links-media` → `html-forms` → `html-tables` → `html-accessibility`. Não foi identificada dependência circular neste recorte.
- **Fontes:** [MDN sobre `table`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table) e [MDN sobre `th`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th) foram abertas em 24/10/2026 (fontes oficiais, EN, OK); confirmam dados tabulares e associação de cabeçalhos por `scope`.
- **Limite:** a revisão do guia e o validador não demonstram que um aluno lê corretamente uma tabela nova. O teste manual no navegador ainda não foi executado.

### Revisão localizada: `html-accessibility`

- **Público e saída:** após documento, links, formulários e tabelas HTML, o aluno deve construir uma página com estrutura, nomes e instruções claros, percorrê-la pelo teclado e registrar problemas observáveis. Editor e navegador bastam; a aula não exige instalação nova.
- **FATO, média, M:** o guia tinha seis seções centrais e exercícios identificados como `Construir` e rótulos informais. Ele agora organiza os mesmos conceitos em quatro blocos e explicita prever, alterar, construir e investigar erro, com resultado esperado antes da solução. O ID `html-accessibility` e o exemplo principal foram preservados.
- **Pré-requisitos:** `html-semantic` → `html-links-media` → `html-forms` → `html-tables` → `html-accessibility`. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre `details`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) e [MDN sobre acesso por teclado](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard) foram abertas em 24/10/2026 (fontes oficiais, EN, OK); sustentam o uso de controles nativos e foco perceptível. A documentação externa complementa a explicação interna.
- **Limite:** a validação automatizada e a leitura do guia não substituem o teste com aluno real. A navegação manual por teclado e o zoom no navegador não foram executados nesta revisão.

### Revisão localizada: `db-docker-basics`

- **Público e saída:** quem concluiu SQL inicial e a preparação `setup-docker` deve distinguir imagem, container, volume, cliente e Engine, verificar o ambiente e registrar um diagnóstico reproduzível. Na alternativa `setup-docker-alternative`, a prática real com containers fica pendente.
- **FATO, alta, M:** o guia reunia instalação, conceitos, versões e diagnóstico em seis seções, repetindo parte de `setup-docker`. A instalação passou a ser pré-requisito explícito, e a aula ficou com quatro seções e exercícios de prever, alterar, construir e investigar erro.
- **Sequência:** `setup-docker` ou `setup-docker-alternative` → `db-docker-basics` → `db-docker-compose`. Sem dependência circular identificada nesse recorte.
- **Ambiente e fontes:** os comandos permanecem no terminal da pasta `dados-local`; a alternativa SQLite é declarada. Documentação oficial Docker sobre [containers](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/), [volumes](https://docs.docker.com/engine/storage/volumes/) e [`docker ps`](https://docs.docker.com/reference/cli/docker/container/ls/) foi aberta em 24/10/2026 (EN, OK).
- **Limite:** a estrutura e as fontes foram conferidas, mas não houve observação de aluno real; concluir o quiz não comprova autonomia para operar Docker ou PostgreSQL.

### Revisão localizada: `db-docker-compose`

- **Público e saída:** quem concluiu `db-docker-basics` com Docker operacional deve subir o PostgreSQL 17, identificar `127.0.0.1:55432` no computador e `db:5432` entre serviços, e comprovar persistência por consulta após recriação.
- **FATO, alta, M:** a aula tinha seis seções e a prática de cliente externo aparecia antes da preparação `setup-postgresql`, que por sua vez depende do serviço criado nesta aula. O guia passou a quatro blocos; o cliente externo ficou opcional aqui e obrigatório na preparação seguinte. Os exercícios agora explicitam prever, alterar, construir e investigar erro.
- **Sequência:** `setup-docker` → `db-docker-basics` → `db-docker-compose` → `setup-postgresql` → `db-docker-operations`. A alternativa `setup-docker-alternative` permite estudar o desenho sem comprovar o laboratório real. Nenhuma aresta circular resta nesse recorte.
- **Ambiente:** `compose.yaml`, `.env` e `.gitignore` pertencem à pasta `dados-local`. A porta 55432 e o volume `dados` foram mantidos. Instalação e operação real do Docker neste computador não foram executadas nesta revisão.
- **Fontes:** documentação oficial Docker de [rede Compose](https://docs.docker.com/compose/how-tos/networking/), [interpolação](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/) e [`compose down`](https://docs.docker.com/reference/cli/docker/compose/down/), além da [imagem oficial PostgreSQL](https://hub.docker.com/_/postgres), aberta em 24/10/2026 (EN, OK). Confirma serviço por nome, variável obrigatória, preservação de volume sem `-v` e inicialização somente em diretório vazio.
- **Limite:** a auditoria verifica sequência e fidelidade das instruções; não comprova que um aluno consiga reconstruir o serviço sem ajuda ou que o ambiente funcione em todos os sistemas.

### Revisão localizada: `db-docker-operations`

- **Público e saída:** quem concluiu `db-docker-compose` com PostgreSQL 17 ativo deve diagnosticar falhas por etapa, exportar a base, copiar o arquivo para o computador e restaurar em outro banco. O aluno deve comparar dados recuperados e registrar o que a cópia não cobre.
- **FATO, alta, M:** seis seções separavam diagnóstico de ciclo de vida e credenciais do README, embora cada par forme uma mesma decisão de operação. O guia ficou com quatro blocos e exercícios de prever, alterar, construir e investigar erro. O exemplo termina com `docker compose down`; a preparação agora instrui a religar o serviço antes dos exercícios.
- **Sequência:** `setup-docker` → `db-docker-basics` → `db-docker-compose` → `db-docker-operations`. `setup-postgresql` é necessário apenas para testar o cliente externo; o exemplo usa `psql` dentro do container. Sem Docker, `setup-docker-alternative` permite leitura conceitual, não a prova de recuperação real.
- **Ambiente:** a mesma pasta `dados-local`, o serviço `db`, o banco `estudos` e a imagem PostgreSQL 17 são reutilizados. `estudos_restaurado` precisa ser um destino novo; nenhum passo da aula pede apagar a origem. Os comandos que modificam containers e bancos não foram executados nesta revisão.
- **Fontes:** documentação oficial de [`docker compose cp`](https://docs.docker.com/reference/cli/docker/compose/cp/), [`docker compose down`](https://docs.docker.com/reference/cli/docker/compose/down/), [`pg_dump` 17](https://www.postgresql.org/docs/17/app-pgdump.html) e [`pg_restore` 17](https://www.postgresql.org/docs/17/app-pgrestore.html), aberta em 24/10/2026 (EN, OK). Sustenta o transporte do arquivo, preservação do volume nomeado sem `-v` e restauração do formato custom.
- **Limite:** o validador confere estrutura e consistência; sem restauração executada nem observação de aluno, a competência operacional continua não comprovada.

### Revisão localizada: `db-mongo-crud`

- **Público e saída:** após `setup-mongodb`, o aluno deve executar CRUD em um banco de laboratório, prever consultas por tag, conferir resultados de escrita e explicar por que progresso de vários alunos não cabe no booleano da lição compartilhada.
- **FATO, alta, M:** seis seções distribuíam operações relacionadas por blocos distantes; o pré-requisito não apontava para a preparação do servidor e do `mongosh`. A aula ficou com quatro blocos: documento/ambiente, leitura, escrita segura e modelagem. Os quatro tipos de prática receberam rótulos explícitos.
- **Sequência:** `setup-mongodb` → `db-mongo-crud` → `db-mongo-pipelines`. SQL relacional é comparação útil, não pré-requisito para os comandos do exemplo. Nenhuma dependência circular identificada nesse recorte.
- **Ambiente:** `mongosh` conectado a um servidor real, banco `tech_hub_aula_crud` inicialmente vazio. O `ping` confirma conexão; repetir a inserção com os mesmos `_id` no mesmo banco causa colisão, portanto a retomada usa outro nome de banco, sem apagar dados. Nenhuma escrita foi executada em servidor MongoDB nesta revisão.
- **Fontes:** documentação oficial [MongoDB CRUD](https://www.mongodb.com/docs/manual/crud/), [modelagem de dados](https://www.mongodb.com/docs/manual/data-modeling/) e [`updateOne`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateone/), aberta em 24/10/2026 (EN, OK). Sustenta operações por documento, incorporação/referência e resultados da atualização.
- **Limite:** a revisão estrutural e das fontes não comprova execução no ambiente do aluno, retenção nem capacidade de projetar uma coleção de progresso sem apoio.

### Revisão localizada: `db-mongo-pipelines`

- **Público e saída:** após `setup-mongodb` e `db-mongo-crud`, o aluno deve rejeitar entradas fora do contrato, construir um resumo por estágios e interpretar medidas de uma consulta sem atribuir ganho automático ao índice. SQL agrupado é apenas uma comparação opcional.
- **FATO, alta, M:** seis seções retomavam validação, mudança de formato e índices em blocos separados. O guia ficou com quatro blocos que seguem a execução: contrato, transformação, saída intermediária e observação do plano. A prática agora distingue prever, alterar, construir e investigar erro.
- **Sequência:** `setup-mongodb` → `db-mongo-crud` → `db-mongo-pipelines` → projeto MongoDB. Nenhuma dependência circular identificada nesse recorte. `$unwind` e índice único permanecem aprofundamentos, não são exigidos para o exercício central.
- **Ambiente:** `mongosh` ligado a um servidor real, banco `tech_hub_aula_pipeline` inicialmente inexistente; o exemplo cria a coleção uma vez. A retomada usa outro nome de banco, preservando dados anteriores. Os testes inválidos são comandos separados, pois uma exceção pode interromper a sequência. Não houve execução em servidor MongoDB nesta revisão.
- **Fontes:** documentação oficial MongoDB de [pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/), [validação de esquema](https://www.mongodb.com/docs/manual/core/schema-validation/), [índices](https://www.mongodb.com/docs/manual/indexes/), [tipos no mongosh](https://www.mongodb.com/docs/mongodb-shell/reference/data-types/) e [análise do plano](https://www.mongodb.com/docs/manual/tutorial/analyze-query-plan/) foi aberta em 24/10/2026 (EN, OK). Ela sustenta estágios em sequência, rejeição padrão de documentos inválidos, `Double()` e a interpretação de `explain`.
- **Limite:** o plano em três documentos ensina observação, não demonstra benefício do índice. Sem servidor executado nem aluno real observado, a autonomia para criar pipelines, validar dados e otimizar consultas segue não comprovada.

### Revisão localizada: `db-performance`

- **Público e saída:** após SQL básico, `db-docker-compose` e `setup-postgresql`, o aluno deve comparar a mesma consulta antes e depois de um índice, conferir os mesmos 100 resultados e relatar plano, custo e limites sem inventar tempos.
- **FATO, alta, M:** seis seções repetiam seletividade, interpretação do plano e cautela com índices. O guia passou a quatro blocos: hipótese de acesso, medição, escolha para carga representativa e correção. Os exercícios explicitam prever, alterar, construir e investigar erro; o último questiona a conclusão apressada de ganho.
- **Sequência:** `db-select` e `db-ddl-constraints` → `db-docker-compose` → `setup-postgresql` → `db-performance`. Não se identificou ciclo nesse recorte. A instalação do cliente e a conexão 127.0.0.1:55432 ao banco `estudos` foram referenciadas sem duplicar instruções por sistema.
- **Ambiente:** PostgreSQL 17 de laboratório, tabela `perf_licoes` ainda inexistente e dez mil registros sintéticos. O aluno deve conferir banco e usuário antes de criar objetos. `EXPLAIN (ANALYZE, BUFFERS)` executa a consulta; o laboratório limita-o a `SELECT`. Para retomar, usa-se outro banco autorizado, sem apagar dados existentes. Não houve execução de PostgreSQL nesta revisão.
- **Fontes:** documentação oficial [PostgreSQL 17 — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html), [PostgreSQL 17 — índices](https://www.postgresql.org/docs/17/indexes.html) e [SQLite — EXPLAIN QUERY PLAN](https://www.sqlite.org/eqp.html), abertas em 24/10/2026 (EN, OK). Os links PostgreSQL da aula, antes em `current` (versão 18 nessa data), foram fixados em 17 para acompanhar o laboratório.
- **Limite:** o exemplo tem distribuição uniforme e uma única consulta. Plano e tempo reais dependem da instância; sem executar o banco ou observar um aluno, não há evidência de melhoria de desempenho nem de autonomia diagnóstica.

### Revisão localizada: `db-nosql-models`

- **Público e saída:** após `db-modeling` e `db-select`, o aluno compara representações para quatro perguntas de acesso e justifica uma decisão para um aplicativo offline. A atividade usa papel ou editor de texto; não exige instalar bancos adicionais.
- **FATO, alta, M:** seis seções retomavam perguntas de acesso, regras de cópia e consistência depois de apresentar as famílias. A aula ficou com quatro blocos: perguntas, representações, consequências de chaves/consistência e decisão. Os exercícios explicitam prever, alterar, construir e investigar erro; este último rejeita a promessa de sincronização automática por mero formato de banco.
- **Sequência:** `db-modeling` → `db-select` → `db-nosql-models` → `db-mongo-crud` como aprofundamento opcional com `setup-mongodb`. Não se identificou ciclo. Conhecer os nomes Redis, Cassandra e Neo4j não comprova operação desses produtos.
- **Ambiente:** desenho textual, sem serviço real e sem comandos. A saída esperada é uma escolha defendida por consulta, regra de atualização, custo e gatilho de revisão. Não há instalação a executar nesta aula.
- **Fontes:** páginas oficiais [Redis](https://redis.io/docs/latest/), [Apache Cassandra](https://cassandra.apache.org/doc/latest/), [Neo4j](https://neo4j.com/docs/) e [MongoDB — modelagem](https://www.mongodb.com/docs/manual/data-modeling/) foram abertas em 24/10/2026 (EN, OK). As três primeiras são portais gerais, úteis para aprofundamento, não substituem a explicação da aula.
- **Limite:** a atividade é modelagem em papel, não comprovação de desempenho, transações, recuperação ou operação dos motores. Sem observar uma decisão feita pelo aluno diante de requisito novo, autonomia permanece não comprovada.

### Revisão localizada: `db-project`

- **Público e saída:** após modelagem, constraints, JOIN e agregação, o aluno deve reconstruir um relatório de três matrículas em SQLite, identificar uma regra não garantida pelo esquema inicial e justificar a tecnologia escolhida para o laboratório.
- **FATO, alta, M:** seis seções repetiam briefing, limite das FKs e entrega. A aula ficou com quatro blocos: critérios, relatório, reforço da regra e decisão/entrega. O exercício final, antes restrito às FKs, agora pede também alternativa, custo e gatilho de revisão para corresponder ao título da aula. A prática sinaliza prever, alterar, construir e investigar erro.
- **Sequência:** `db-modeling` → `db-ddl-constraints` → `db-joins` e `db-aggregation` → `db-nosql-models` → `db-project`. A preparação SQLite é suficiente; serviço web, parâmetros e recuperação são extensões posteriores. Não se identificou ciclo nesse recorte.
- **Ambiente:** base SQLite vazia, cliente preparado e `PRAGMA foreign_keys=ON` nesta conexão antes dos testes negativos. A aula usa dados fictícios e não implementa API. A execução do esquema inicial não prova que a pessoa está matriculada na trilha da lição; as duas FKs compostas são um desenho a testar em outra base. Nenhuma base local do usuário foi alterada nesta revisão.
- **Fontes:** páginas oficiais [SQLite — usos apropriados](https://www.sqlite.org/whentouse.html), [PostgreSQL 17 — tutorial](https://www.postgresql.org/docs/17/tutorial.html), [MongoDB — modelagem](https://www.mongodb.com/docs/manual/data-modeling/), [MariaDB — guia inicial](https://mariadb.com/docs/server/mariadb-quickstart-guides/mariadb-usage-guide) e [Firebird 5 — referência](https://firebirdsql.org/file/documentation/chunk/en/refdocs/fblangref50/firebird-50-language-reference.html) foram abertas em 24/10/2026 (EN, OK). O link PostgreSQL foi fixado em 17, versão do laboratório do curso.
- **Limite:** o validador comprova estrutura do conteúdo, não a implementação do esquema reforçado nem a autonomia do aluno para escolher um banco sob novos requisitos. A recuperação real e o teste em navegador não foram executados.

### Revisão localizada: `db-recovery`

- **Público e saída:** após Python, constraints e transações, o aluno deve copiar uma base SQLite de laboratório, validar dados e regras no destino, calcular RPO/RTO e corrigir uma migração incompatível por expansão.
- **FATO, alta, M:** seis seções repetiam distinções entre cópia, restauração e migração. A aula ficou com quatro blocos: metas/conteúdo, cópia testada, ensaio/retensão e migração/plano de falha. Os exercícios agora explicitam prever, alterar, construir e investigar erro.
- **Sequência:** `setup-python` → `db-ddl-constraints` e `db-transactions` → `db-recovery`. PostgreSQL e Firebird aparecem somente como aprofundamento de ferramentas específicas. Não se identificou ciclo nesse recorte.
- **Ambiente:** script `recovery_lab.py` em pasta nova, duas bases `:memory:` e dados fictícios. O exemplo não persiste após o processo; a extensão em disco exige dois caminhos novos e abertura do destino em outra execução. A preparação alerta que a API escreve no destino e proíbe reutilizar um banco importante. Nenhum arquivo de banco do usuário foi criado ou sobrescrito nesta revisão.
- **Fontes:** documentação oficial [SQLite — Backup API](https://www.sqlite.org/backup.html), [PostgreSQL 17 — SQL dump](https://www.postgresql.org/docs/17/backup-dump.html) e [Firebird — gbak](https://firebirdsql.org/file/documentation/html/en/firebirddocs/gbak/firebird-gbak.html) foi aberta em 24/10/2026 (EN, OK). O link PostgreSQL foi fixado em 17, versão usada no laboratório do curso.
- **Limite:** o exemplo em memória demonstra cópia independente, não durabilidade, retenção externa ou recuperação de produção. Sem ensaio em arquivo, medição de tempo e observação do aluno, RTO/RPO e autonomia operacional continuam não comprovados.

### Revisão localizada: `db-security`

- **Público e saída:** após Python, CRUD seguro e funções, o aluno deve vincular valores, usar identidade confiável no escopo das linhas e impedir que uma conta altere dados de outra em um laboratório SQLite.
- **FATO, alta, M:** seis seções repetiam validação, parametrização e autorização. A aula ficou com quatro blocos: entrada/vinculação, identidade/autorização, alteração/identificadores e fronteira operacional. Os exercícios explicitam prever, alterar, construir e investigar erro.
- **Sequência:** `setup-python` → funções Python e `db-ddl-crud` → `db-security` → futura API autenticada. O laboratório não exige PostgreSQL; roles aparecem como aprofundamento para banco cliente-servidor. Não se identificou ciclo.
- **Ambiente e segurança:** arquivo `security_lab.py`, terminal na pasta de laboratório, SQLite somente em memória e dados fictícios. Nenhum segredo é necessário. O conteúdo diferencia navegador, API e banco, proíbe confiar em `usuario_id` livre e declara que o laboratório não implementa login, sessão, criptografia ou conformidade LGPD.
- **Fontes:** documentação oficial [Python sqlite3](https://docs.python.org/pt-br/3/library/sqlite3.html) (PT-BR) e [PostgreSQL 17 — roles](https://www.postgresql.org/docs/17/user-manag.html) (EN) foi aberta em 24/10/2026 (OK). A primeira confirma placeholders em vez de formatação; a segunda confirma controle de acesso por roles. O link PostgreSQL foi alinhado à versão 17 do curso.
- **Limite:** o teste unitário de uma função não comprova segurança de uma API publicada. Autenticação, autorização em todas as rotas, privilégios reais, logs, rotação de segredos e LGPD precisam de implementação e testes próprios.

## 9. Limites desta auditoria

O script usa quantidade de seções e rótulos dos exercícios como sinais; não interpreta automaticamente se duas seções ensinam o mesmo conceito nem se um exercício pratica múltiplas habilidades. Nenhuma aula foi executada por aluno real e nenhuma instalação foi repetida. A decisão de dividir continua humana e deve preservar IDs existentes e compatibilidade do progresso.

# Auditoria didática — carga cognitiva das aulas

**Data:** 24/10/2026  
**Verificação de fontes:** parcial; fontes SQLite, Docker e MongoDB CRUD das candidatas revisadas conferidas
**Escopo:** aulas com mais de quatro seções conceituais em `LESSON_GUIDES`

## 1. Veredito

O mapeamento estrutural encontrou originalmente 41 aulas com mais de quatro seções. Após a revisão de `db-mongo-pipelines`, a auditoria automática aponta 31: as cinco aulas fundamentais de banco preservaram seus IDs e receberam aulas complementares menores; cinco das dez aulas avançadas foram condensadas sem mudar seus IDs. Restam cinco aulas avançadas de banco prioritárias.

## 2. Contrato de aprendizagem

- **Público:** aluno iniciante, com preparação digital concluída e os pré-requisitos declarados por cada trilha.
- **Nível prometido:** compreender um bloco conceitual, executar um exemplo, prever comportamento e resolver uma tarefa nova sem receber vários conceitos inéditos de uma vez.
- **Condições:** navegador e editor; SQLite/Python nas aulas de banco; demais ferramentas conforme as preparações já existentes.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Alta | G | 5 aulas avançadas restantes da trilha `database` | FATO | Possuem seis seções e nenhum dos quatro prefixos padronizados nos exercícios. | Auditar uma a uma e padronizar a progressão. |
| 2 | Média | G | 5 aulas HTML e 6 JavaScript | RISCO | Possuem cinco ou seis seções; já têm três passos guiados, mas somente um ou dois tipos de exercício explicitamente identificados. | Manter IDs e priorizar intercalação/prática antes de criar novas aulas. |
| 3 | Média | G | 9 aulas IA e 6 Entrega | RISCO | Possuem cinco seções e nenhum prefixo padronizado; parte da densidade pode ser compatível com o nível avançado. | Conferir pré-requisitos e tarefas de transferência antes de dividir. |
| 4 | Baixa | P | `scripts/audit-lesson-load.js` | SUGESTÃO | Contagem de seções é um indicador reproduzível, mas não mede dificuldade real. | Usar o relatório como triagem e exigir revisão humana antes de alterar conteúdo. |

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

## 9. Limites desta auditoria

O script usa quantidade de seções e rótulos dos exercícios como sinais; não interpreta automaticamente se duas seções ensinam o mesmo conceito nem se um exercício pratica múltiplas habilidades. Nenhuma aula foi executada por aluno real e nenhuma instalação foi repetida. A decisão de dividir continua humana e deve preservar IDs existentes e compatibilidade do progresso.

# Auditoria didática — carga cognitiva das aulas

**Data:** 24/10/2026  
**Verificação de fontes:** parcial; fontes SQLite, Docker, MongoDB CRUD e acessibilidade HTML das candidatas revisadas conferidas
**Escopo:** aulas com mais de quatro seções conceituais em `LESSON_GUIDES`

## 1. Veredito

O mapeamento estrutural encontrou originalmente 41 aulas com mais de quatro seções. Após as revisões de seis aulas de Entrega, `ai-llms`, `ai-prompts`, `ai-system`, `ai-data`, `ai-embeddings`, `ai-rag` e `ai-skills`, a auditoria automática continua apontando 15: as cinco etapas dessas aulas foram mantidas após revisão didática. As prioridades 2 e 3 foram concluídas; restam 2 aulas de IA a revisar na prioridade 4.

## 2. Contrato de aprendizagem

- **Público:** aluno iniciante, com preparação digital concluída e os pré-requisitos declarados por cada trilha.
- **Nível prometido:** compreender um bloco conceitual, executar um exemplo, prever comportamento e resolver uma tarefa nova sem receber vários conceitos inéditos de uma vez.
- **Condições:** navegador e editor; SQLite/Python nas aulas de banco; demais ferramentas conforme as preparações já existentes.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Média | G | 2 aulas de IA ainda não revisadas | RISCO | Possuem cinco seções e nenhum prefixo padronizado; parte da densidade pode ser compatível com o nível avançado. | Conferir pré-requisitos e tarefas de transferência antes de dividir. |
| 2 | Baixa | P | `scripts/audit-lesson-load.js` | SUGESTÃO | A contagem de seções é um indicador reproduzível, mas não mede dificuldade real. | Usar o relatório como triagem e exigir revisão humana antes de alterar conteúdo. |

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

### Revisão localizada: `ai-skills`

- **Público e saída:** após `setup-python`, `ai-tools` e `ai-mcp`, o aluno deve distinguir instrução, ferramenta e autorização; criar um `SKILL.md` simples; e testar uma regra determinística de catálogo.
- **FATO, média, P:** a preparação e o resultado guiado já apontavam para o validador correto, mas os exercícios não cobriam explicitamente previsão, alteração, construção e investigação de erro. As quatro tarefas agora têm entradas, saídas ou critérios observáveis.
- **Julgamento didático:** os cinco blocos cobrem propósito, acionamento, formato, apoio por código e avaliação. Foram mantidos com pausas curtas de classificação e previsão.
- **Pré-requisitos e ambiente:** o laboratório usa apenas Python local e dados fictícios. A aula indica pasta, arquivo, comandos por sistema, saída esperada, diagnóstico e retomada. A construção textual usa `validar-catalogo/SKILL.md`, cujo nome de diretório coincide com `name`.
- **Fontes:** [Agent Skills Specification](https://agentskills.io/specification), [Anthropic sobre agentes](https://www.anthropic.com/research/building-effective-agents) e [biblioteca padrão Python](https://docs.python.org/3/library/) foram abertas em 25/10/2026 (fontes primárias, EN, OK).
- **Limite:** o exemplo Python não carrega a skill nem representa um host real. A avaliação de acionamento permanece textual; observação com aluno não foi executada.

### Revisão localizada: `ai-rag` e correção de referências entre aulas

- **Público e saída:** após `ai-data` e `ai-embeddings`, o aluno deve executar busca lexical com filtro de acesso, reconhecer limites de recuperação e julgar se uma citação sustenta uma afirmação.
- **FATO, alta, M:** `ai-rag` continha preparação para `ai-data.py` e resultado guiado da função `dividir`; `ai-skills` continha preparação e resultado de vetores; `ai-data` e `ai-embeddings` ainda exibiam preparação genérica e resultado guiado impreciso. Essas referências foram corrigidas nas quatro aulas e uma verificação de arquivo/resultado por ID foi adicionada ao validador.
- **FATO, média, P:** `ai-rag` devolve lista vazia para uma paráfrase como `reembolso`, embora haja texto sobre devolução. A aula agora distingue falha da busca lexical de ausência comprovada de informação. Os quatro exercícios cobrem prever, alterar, construir e investigar erro.
- **Julgamento didático:** cinco blocos distintos (arquitetura, busca, contrato, abstenção e avaliação) foram mantidos com pausas curtas. A contagem estrutural continua alerta para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-python`, `ai-data`, `ai-embeddings` → `ai-rag`. O laboratório roda Python local sem modelo, embeddings ou API; a preparação informa pasta, arquivo, comando, saída e retomada.
- **Fontes:** [Anthropic sobre contexto](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) e [Sentence Transformers sobre busca semântica](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html) foram abertas em 25/10/2026 (fontes primárias, EN, OK).
- **Limite:** o código apenas recupera trechos por termos em comum e não gera resposta. O julgamento de suporte é atividade textual; acesso por nome fictício não comprova autenticação real. Observação com aluno não foi executada.

### Revisão localizada: `ai-embeddings`

- **Público e saída:** após dados e Python básico, o aluno deve calcular cosseno entre vetores fictícios, interpretar ranking e medir recuperação sem confundir score, suporte factual ou permissão.
- **FATO, média, P:** os exercícios não diferenciavam os quatro tipos de prática e a atividade guiada sugeria abstenção como resultado de uma função numérica. O guia agora explicita erros `ValueError`, previsões intermediárias e critérios para prever, alterar, construir e investigar erro.
- **Julgamento didático:** mantidos cinco blocos distintos (representação, cálculo, estratégia, acesso e avaliação), cada um com pausa curta. A contagem estrutural continua alerta para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-python`, `ai-data` → `ai-embeddings`. A preparação nomeia pasta, arquivo, terminal, comando por sistema, saída e retomada; não instala modelo nem banco vetorial.
- **Fontes:** [Sentence Transformers sobre busca semântica](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html) e [Python math](https://docs.python.org/3/library/math.html) foram abertas em 25/10/2026 (fontes primárias, EN, OK).
- **Limite:** o ranking usa vetores inventados; não mede qualidade de embeddings reais. A discussão de permissão é conceitual nesta aula, sem filtro de acesso implementado. Observação com aluno não foi executada.

### Revisão localizada: `ai-data`

- **Público e saída:** após contexto em IA e Python básico, o aluno deve dividir texto em chunks, preservar origem e acesso, reconhecer entrada vazia e planejar uma atualização de versão sem resultados revogados.
- **FATO, média, P:** a prática guiada sugeria abstenção para entrada inválida, embora `dividir` apenas retorne lista ou lance `ValueError`. Ela agora descreve esses resultados. O novo exercício de construção verifica metadados e cópia da lista de acesso. Os quatro exercícios cobrem prever, alterar, construir e investigar erro.
- **Julgamento didático:** mantidos cinco blocos distintos (escopo, limpeza, divisão, versões e validação) com pausas entre eles. A contagem estrutural continua alerta para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-python`, `ai-system` → `ai-data`. A preparação nomeia pasta, arquivo, terminal, comando por sistema, saída e retomada; não instala índice nem modelo.
- **Fontes:** [Anthropic sobre contexto](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents), [Python padrão](https://docs.python.org/3/library/), [Sentence Transformers sobre busca semântica](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html) e [Microsoft AI Agents for Beginners](https://github.com/microsoft/ai-agents-for-beginners) foram abertas em 25/10/2026 (fontes primárias, EN, OK).
- **Limite:** metadados copiados não garantem filtragem autorizada na busca. O plano de troca v1/v2 é textual; não há índice real nem teste de falha parcial. Observação com aluno não foi executada.

### Revisão localizada: `ai-system`

- **Público e saída:** após fundamentos de LLM e prompts, o aluno deve montar contexto com orçamento fictício, separar memória externa de treinamento e demonstrar que documento de outro dono foi filtrado antes da montagem.
- **FATO, alta, M:** o texto exigia verificar que evidência privada não entrasse no contexto, mas os exercícios cobriam apenas orçamento e cópia de lista. A construção agora filtra documentos fictícios por dono antes da função e confirma ausência do texto privado. Os quatro exercícios cobrem prever, alterar, construir e investigar erro.
- **Julgamento didático:** cinco blocos distintos (papéis, orçamento, memória, montagem e operação) foram mantidos com pausas entre conceitos. A contagem estrutural continua alerta para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-python`, `ai-llms`, `ai-prompts` → `ai-system`. A preparação nomeia pasta, arquivo, terminal, comando por sistema, saída e retomada; não usa API.
- **Fontes:** [Anthropic sobre contexto](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) e [biblioteca padrão Python](https://docs.python.org/3/library/) foram abertas em 25/10/2026 (fontes primárias, EN, OK).
- **Limite:** o filtro usa um nome fictício, sem sessão autenticada; não comprova autorização de produção. Os valores de orçamento não são tokens reais. Observação com aluno não foi executada.

### Revisão localizada: `ai-prompts`

- **Público e saída:** após fundamentos de LLM e Python básico, o aluno deve montar uma estrutura de prompt, testar entrada inválida, preservar dados em JSON e planejar comparação de respostas em casos independentes.
- **FATO, média, P:** a prática guiada sugeria abstenção para entrada inválida, mas a função lança `ValueError`. O resultado agora descreve essa falha e situa abstenção em uma futura etapa com modelo. Os exercícios cobrem prever, alterar, construir e investigar erro com critérios observáveis.
- **Julgamento didático:** os cinco blocos (contrato, exemplos, explicação, dados não confiáveis e avaliação) foram preservados com pausas de previsão e desenho. A contagem estrutural continua alerta para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-python`, `ai-llms` e Python com JSON/exceções → `ai-prompts`. A preparação nomeia pasta, arquivo, terminal, comando por sistema, saída e retomada; não usa API.
- **Fontes:** [Anthropic sobre contexto](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents), [Python json](https://docs.python.org/3/library/json.html) e [biblioteca padrão Python](https://docs.python.org/3/library/) foram abertas em 25/10/2026 (fontes primárias, EN, OK). O link antigo da Anthropic no catálogo redireciona para a página de pesquisa.
- **Limite:** o código constrói e serializa dados; não executa inferência nem mede melhora de qualidade, abstenção ou resistência a prompt injection. Observação com aluno não foi executada.

### Revisão localizada: `ai-llms`

- **Público e saída:** após preparação Python e programação básica, o aluno deve distinguir treinamento, inferência e contexto, calcular proporções e reconhecer que a simulação não mede verdade factual nem tokens reais.
- **FATO, média, P:** os quatro exercícios não explicitavam prever, alterar, construir e investigar erro, e os cinco blocos não tinham pausas intermediárias. As tarefas agora têm esses tipos, entradas, saídas e critérios; cada bloco central traz previsão ou prática curta.
- **Julgamento didático:** foram mantidos cinco blocos por tratar de fronteiras conceituais diferentes (famílias de IA, inferência, contexto, verificação factual e avaliação). A contagem estrutural permanece alerta para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-python` e Python básico → `ai-llms`. A preparação nomeia pasta, arquivo, terminal, comandos por sistema, saída, parada, retomada e alternativa leve sem modelo ou API.
- **Fontes:** [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/en/chapter1/1), [Hugging Face Tokenizers](https://huggingface.co/learn/llm-course/en/chapter2/4) e [biblioteca padrão Python](https://docs.python.org/3/library/) foram abertas em 25/10/2026 (fontes primárias, EN, OK).
- **Limite:** o código usa pesos fictícios e unidades abstratas. Não executa modelo real, não mede tokenização nem comprova qualidade de respostas. Observação com aluno não foi executada.

### Revisão localizada: `delivery-requirements`

- **Público e saída:** após os laboratórios de formulário e testes, o aluno deve converter um pedido vago em critérios observáveis, localizar os pontos afetados e documentar o que foi realmente implementado.
- **FATO, alta, P:** o README da solução dizia que títulos duplicados eram recusados, mas o `server.js` da aula `delivery-forms` não contém essa regra. A solução agora descreve a verificação em `requisito.js` e marca a integração com a API como pendente. Os exercícios cobrem prever, alterar, construir e investigar erro.
- **Julgamento didático:** cinco blocos foram mantidos por representar etapas distintas (critérios, mudança, revisão, documentação e transferência), com pausas que exigem previsão ou inspeção entre elas. A contagem estrutural continua sinalizando a aula para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-node`, `delivery-forms`, `delivery-ci` → `delivery-requirements`. A preparação nomeia pasta, terminal, comando, saída e retomada; o exemplo é local e não exige serviço externo.
- **Fontes:** [GitHub Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), [GitHub pull requests](https://docs.github.com/en/pull-requests/reference/pull-requests) e [Node.js Test Runner](https://nodejs.org/api/test.html) foram abertas em 25/10/2026 (fontes oficiais, EN, OK). O link de pull requests no catálogo redireciona para a página atual.
- **Limite:** a função de duplicados retorna apenas um booleano; não altera a API nem garante unicidade em gravações concorrentes. Teste manual no navegador e observação com aluno não foram executados nesta revisão.

### Revisão localizada: `delivery-ci`

- **Público e saída:** após testes básicos de JavaScript, preparação Node e publicação, o aluno deve executar uma suíte, provocar uma regressão, interpretar a falha e descrever a contenção de um incidente.
- **FATO, média, P:** a aula ensinava CI a partir de comando local, mas poderia ser lida como CI já configurada. O guia agora distingue explicitamente execução local de fluxo remoto. A preparação informa pasta, comando, saída e recuperação. Os quatro exercícios cobrem prever, alterar, construir e investigar erro.
- **Julgamento didático:** mantidos cinco blocos distintos (camadas, CI, sinais, rollback e rotina), com pausas entre conceitos. A demonstração de regressão torna observável o efeito de remover `trim` sem confundir teste verde com cobertura completa.
- **Pré-requisitos e ambiente:** `setup-node`, `js-debug`, `delivery-environments` → `delivery-ci`. Usa apenas `node:test` e `node:assert/strict`, sem pacote externo.
- **Fontes:** [Node.js Test Runner](https://nodejs.org/api/test.html), [GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions) e [W3C WAI: verificações básicas](https://www.w3.org/WAI/test-evaluate/preliminary/) foram abertas em 24/10/2026 (fontes oficiais, EN, OK).
- **Limite:** executei a suíte local e a regressão controlada (saídas de processo 0 e 1). Não há evidência nesta aula de pipeline remoto configurado ou de rollback em produção; navegador e observação com aluno não foram testados.

### Revisão localizada: `delivery-environments`

- **Público e saída:** após os laboratórios HTTP e formulário, o aluno deve escolher onde publicar arquivos estáticos e API, prever os caminhos dos assets em subpasta e formular uma verificação da entrega.
- **FATO, média, P:** o exercício de 404 usava `style.css`, enquanto o projeto usa `assets/css/global.css`. A tarefa e a solução agora usam o caminho real e distinguem endereço relativo de caminho iniciado por `/`. Os exercícios cobrem prever, alterar, construir e investigar erro.
- **Julgamento didático:** mantidas cinco fases distintas (artefatos, ambientes, caminhos, dependências e retorno), com pausas de previsão ou desenho entre elas. A aula continua sinalizada pela contagem estrutural para observar com aluno.
- **Pré-requisitos e ambiente:** `setup-node`, `delivery-http`, `delivery-forms` → `delivery-environments`. A preparação nomeia pasta, terminal, comando, saída esperada, parada, retomada e alternativa de publicação local.
- **Fontes:** [GitHub Pages: serviço estático](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [criar site no Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Node.js: variáveis de ambiente](https://nodejs.org/learn/command-line/how-to-read-environment-variables-from-nodejs) e [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) foram abertas em 24/10/2026 (fontes oficiais, EN, OK).
- **Limite:** o exemplo apenas escolhe uma URL fictícia; não publica nem faz requisições. Teste de publicação real, navegação manual, teclado e largura de celular não foram executados nesta revisão.

### Revisão localizada: `delivery-security`

- **Público e saída:** após HTTP, formulários e a preparação Node, o aluno deve explicar autenticação, autorização, segredo privado e CORS e prever decisões de acesso em uma regra simulada.
- **FATO, alta, P:** o exemplo emitia 403 para usuário ausente, embora o exercício associasse a ausência de credencial a 401. A saída simulada agora distingue 401 e 403; o guia explicita que não existe sessão validada nem servidor HTTP nesse código.
- **Julgamento didático:** os cinco blocos seguem fronteiras distintas (identidade, segredos, CORS, validação e revisão). Foram preservados com pausas de previsão ou inspeção. Os quatro exercícios agora cobrem prever, alterar, construir e investigar erro, com critério observável.
- **Pré-requisitos e ambiente:** `setup-node`, `delivery-http`, `delivery-forms` → `delivery-security`. A preparação nomeia pasta, terminal, comando, saída, parada, retomada e alternativa sem serviço externo.
- **Fontes:** [MDN 401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401), [MDN 403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403), [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) e [OWASP Top 10](https://owasp.org/projects/top-ten) foram abertas em 24/10/2026 (fontes primárias, EN, OK).
- **Limite:** a regra demonstra decisões sobre objetos fictícios. Ela não valida identidade, não inicia servidor e não comprova proteção de uma API real. Teste manual de interface e observação com aluno não foram executados nesta revisão.

### Revisão localizada: `delivery-forms`

- **Público e saída:** após `delivery-http`, `setup-node` e Fetch, o aluno deve enviar um formulário à API local, interpretar 201 e 400, consultar a lista e explicar estados da interface.
- **FATO, alta, M:** um exercício exigia `GET /api/estudos`, ausente do servidor de exemplo. A rota foi implementada com resposta 200 e array JSON. A tarefa de título numérico agora verifica status e tamanho da lista antes e depois. Os exercícios cobrem prever, alterar, construir e investigar erro.
- **Julgamento didático:** as cinco seções foram mantidas porque seguem fases distintas do envio, estado, leitura da resposta, validação e observação. Pausas entre elas exigem previsão ou inspeção. A contagem estrutural continua sinalizando a aula para observação com aluno.
- **Pré-requisitos e ambiente:** `setup-node`, `delivery-http` e `js-fetch` → `delivery-forms`. O guia identifica pasta, terminal, comando, saída, parada e retomada, com servidor nativo sem instalação de pacote adicional.
- **Fontes:** [MDN sobre Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [Node.js HTTP](https://nodejs.org/api/http.html) e [MDN sobre 201](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201) foram abertas em 24/10/2026 (fontes oficiais, EN, OK).
- **Limite:** os dados continuam em memória. O laboratório foi verificado por simulação das requisições em Node; navegação manual, teclado e largura de celular ainda não foram testados nesta revisão.

### Revisão localizada: `delivery-http`

- **Público e saída:** após JavaScript até Fetch e `setup-node`, o aluno deve executar uma API local em memória, identificar método, rota, status, cabeçalho e forma do JSON, e explicar uma incompatibilidade entre servidor e cliente.
- **FATO, alta, M:** a solução de `Construir` para `/api/estudos/:id` tinha uma expressão regular incompleta e não era executável. Foi corrigida para reconhecer IDs numéricos e responder 200 ou 404; os dois casos foram executados em Node durante a revisão. Os exercícios agora explicitam prever, alterar, construir e investigar erro.
- **Julgamento didático:** os cinco blocos foram mantidos porque seguem a troca HTTP do pedido ao contrato e cada um recebeu uma pausa de previsão ou observação. A contagem estrutural continua sinalizando a aula; a decisão de dividi-la depende de evidência com aluno, não apenas do número cinco.
- **Pré-requisitos e ambiente:** `setup-node` e `js-fetch` → `delivery-http` → demais aulas de integração. O guia agora nomeia pasta, terminal, comando, saída esperada, parada, retomada e alternativa leve com servidor nativo. Sem dependência circular identificada neste recorte.
- **Fontes:** [Node.js HTTP](https://nodejs.org/api/http.html), [MDN sobre status HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) e [GitHub REST para repositórios](https://docs.github.com/en/rest/repos/repos) foram abertos em 24/10/2026 (fontes oficiais, EN, OK). A chamada pública ao GitHub permanece extensão opcional.
- **Limite:** a API usa array em memória, não banco persistente. O teste manual em navegador ainda não foi executado; o progresso da aula não demonstra integração com serviço real.

### Revisão localizada: `js-modules`

- **Público e saída:** após funções, DOM e async/await, o aluno deve separar uma regra pura da interface, exportá-la e importá-la, servir os arquivos por HTTP local e verificar comportamento e erros observáveis.
- **FATO, média, M:** cinco seções tratavam teste e diagnóstico em blocos separados. O guia agora tem quatro blocos, com pausas de previsão sobre exportação, nomes, caminhos e resultados. Os exercícios explicitam prever, alterar, construir e investigar erro. O ID e o exemplo de um arquivo foram preservados.
- **Pré-requisitos:** `js-storage` e `setup-python` (para servidor local) → `js-modules`. O exemplo de um arquivo permite estudar o conceito sem instalar Python; a separação real em arquivos fica pendente até preparar o servidor. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre módulos JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [MDN sobre `import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) e [documentação Python sobre `http.server`](https://docs.python.org/3/library/http.server.html) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam importação nomeada, carregamento dinâmico e servidor local de arquivos.
- **Limite:** o exemplo com Blob é uma demonstração; ele não substitui a verificação de arquivos separados servidos por HTTP. Teste manual no navegador e observação com aluno não foram executados nesta revisão.

### Revisão localizada: `js-debug`

- **Público e saída:** após funções, arrays e controle de fluxo, o aluno deve reproduzir uma divergência, registrar hipótese, usar Console ou breakpoint, corrigir uma regra e acrescentar teste de regressão. Editor e navegador já foram preparados.
- **FATO, alta, M:** o guia tinha seis seções com diagnóstico e cobertura separados em blocos longos. A revisão reuniu reconhecimento com investigação e testes com cobertura, deixando quatro blocos e pausas de previsão antes da execução. Os exercícios explicitam prever, alterar, construir e investigar erro. ID e exemplo principal foram preservados.
- **Pré-requisitos:** `js-flow` e `js-arrays` → `js-debug` → `js-dom`. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre fluxo e erros](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling), [MDN sobre `try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) e [MDN sobre `console.assert`](https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam tratamento síncrono de exceções e que `console.assert` registra falha no Console.
- **Limite:** executar os testes fornecidos não comprova que um aluno consiga formular a própria hipótese ou detectar um bug novo. Teste manual no navegador e observação com aluno não foram executados nesta revisão.

### Revisão localizada: `js-es6`

- **Público e saída:** após arrays, objetos, funções e callbacks, o aluno deve reescrever callbacks curtos, extrair propriedades, criar cópias conscientes e preservar zero ao lidar com dados opcionais. Editor, navegador e Console já foram preparados.
- **FATO, média, M:** cinco seções isolavam destructuring e spread apesar de ambos tratarem a passagem de valores entre estruturas. A revisão reuniu esses temas em um bloco e intercalou previsões de retorno, rest, referência aninhada e `??`. Os exercícios agora explicitam prever, alterar, construir e investigar erro. ID e exemplo principal foram preservados.
- **Pré-requisitos:** `js-arrays` → `js-es6` → `js-debug`. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [MDN sobre spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) e [MDN sobre `??`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) foram conferidas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam retorno implícito, cópia rasa e preservação de zero.
- **Limite:** a contagem de blocos não garante que o aluno diferencie cópia rasa de profunda em contexto novo. Teste manual no navegador e observação com aluno não foram executados nesta revisão.

### Revisão localizada: `js-arrays`

- **Público e saída:** após funções e callbacks, o aluno deve modelar uma lista de registros, escolher a operação pelo formato do resultado, explicar referências compartilhadas e preservar a entrada ao ordenar. Editor, navegador e Console já foram preparados.
- **FATO, alta, M:** cinco seções reuniam vários métodos de arrays e uma distinção difícil entre cópia e referência. A revisão criou pausas com previsão de índice, filtro, busca, redução e ordenação, além de um mapa textual de referências; a aula agora tem quatro blocos. Os exercícios explicitam prever, alterar, construir e investigar erro. ID e exemplo principal foram preservados.
- **Pré-requisitos:** `js-functions` → `js-scope-pure` → `js-callbacks-closures` → `js-arrays` → `js-es6`. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre `map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [MDN sobre `sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) e [MDN sobre `reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam formato de retorno, mutação da ordenação e importância do valor inicial no array vazio.
- **Limite:** um mapa textual ajuda a prever referências, mas não prova que o aluno transfira isso a objetos aninhados. Teste manual no navegador e observação com aluno não foram executados nesta revisão.

### Revisão localizada: `js-flow`

- **Público e saída:** após `js-values`, o aluno deve validar uma entrada, escolher um ramo, rastrear um laço e explicar sua parada. Editor, navegador e Console já foram preparados na aula anterior.
- **FATO, alta, M:** cinco seções misturavam formas essenciais e alternativas de controle. A revisão reuniu condições simples e compostas, incluiu pausas de rastreamento e identificou ternário, `do...while` e `switch` como aprofundamento. Os exercícios explicitam prever, alterar, construir e investigar erro; o último evita executar um laço infinito. ID e exemplo principal foram preservados.
- **Pré-requisitos:** `js-values` → `js-flow` → `js-functions`. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre fluxo de controle](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) e [MDN sobre laços](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam blocos, condicionais, repetição e condição de parada.
- **Limite:** quatro seções ainda cobrem várias formas de controle; a contagem estrutural não comprova domínio. Teste manual no navegador e observação de aluno iniciante não foram executados nesta revisão.

### Revisão localizada: `js-values`

- **Público e saída:** após HTML básico, sem programação prévia, o aluno deve executar um script no navegador, prever valor e tipo, distinguir texto de número e reconhecer uma conversão inválida. Editor e navegador bastam; o Console é apresentado na própria preparação.
- **FATO, alta, M:** o guia tinha cinco seções e apenas `Construir` como tipo padronizado. Agora quatro blocos separam execução, nomes, operações e conversão/comparação. Pausas curtas exigem previsão antes de executar, e os exercícios explicitam prever, alterar, construir e investigar erro. ID e exemplo principal foram preservados.
- **Pré-requisitos:** `html-semantic` → `js-values` → `js-flow`. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre gramática e tipos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types), [MDN sobre `Number.isNaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) e [MDN sobre igualdade estrita](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam declarações, conversão inválida e comparação sem coerção.
- **Limite:** a aula ainda apresenta várias distinções difíceis para iniciantes; a contagem de seções não mede domínio. Uma sessão observada com aluno real deve informar se é necessário dividir a aula. O teste manual no navegador não foi executado nesta revisão.

### Revisão localizada: `html-semantic`

- **Público e saída:** sem conhecimento prévio de programação, após a preparação de arquivos e editor, o aluno deve criar um documento HTML completo, conferir seu aninhamento e escolher títulos, listas e regiões pelo significado. Editor e navegador bastam.
- **FATO, alta, M:** a primeira aula tinha cinco seções longas e só `Construir` como tipo explícito de exercício. A revisão manteve o conteúdo e o ID, reuniu conteúdo e regiões em um bloco e inseriu pausas de previsão e execução entre os fundamentos. Os quatro exercícios agora explicitam prever, alterar, construir e investigar erro.
- **Pré-requisitos:** preparação digital da Etapa 0 → `html-semantic` → `html-links-media`. Sem dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre sintaxe HTML básica](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax) e [MDN sobre estrutura de documentos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). A segunda pressupõe sintaxe e semântica de texto básicas, ordem que as pausas internas procuram respeitar.
- **Limite:** quatro seções continuam cobrindo muitos conceitos para uma primeira aula. O número de seções é apenas triagem; uma observação com aluno iniciante ainda é necessária para decidir se o conteúdo deve virar duas aulas. Teste manual no navegador não executado nesta revisão.

### Revisão localizada: `html-links-media`

- **Público e saída:** depois de `html-semantic`, o aluno deve ligar duas páginas e um fragmento, entregar imagem local com alternativa contextual e explicar o que falta para publicar áudio ou vídeo acessível. Editor e navegador bastam; o SVG fornecido permite a prática sem baixar mídia.
- **FATO, média, M:** o guia tinha cinco seções e somente `Construir` como tipo explícito. A revisão reúne caminhos e destinos especiais em um bloco de navegação, mantém imagens e mídia em blocos próprios e torna explícitos prever, alterar, construir e investigar erro. O ID e o exemplo principal foram preservados.
- **Pré-requisitos:** `html-semantic` → `html-links-media` → `html-forms`. Nenhuma dependência circular identificada neste recorte.
- **Fontes:** [MDN sobre `a`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a), [MDN sobre `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) e [MDN sobre `video`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) foram abertas em 24/10/2026 (fontes oficiais, EN, OK). Confirmam destinos, alternativas de imagem e recursos nativos de mídia.
- **Limite:** a validação estrutural não comprova que um aluno consiga corrigir links e imagens quebrados sem ajuda. Testes manuais com navegador e tecnologias assistivas não foram executados nesta revisão.

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

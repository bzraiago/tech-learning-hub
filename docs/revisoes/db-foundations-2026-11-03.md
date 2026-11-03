# Revisão focal — Fundamentos e linguagem SQL

## 1. Escopo e contrato

- Data: 03/11/2026. Responsável: Codex. Base: `59b1f6e`, branch `review`.
- Autorização: examinar e corrigir somente o módulo 1, commitar e publicar; manter `testes` sincronizada com `review`, conforme preferência vigente.
- Lote delimitado: dez aulas, 40 exercícios, 30 questões e a preparação para o projeto Catálogo de estudos. Nenhum módulo posterior foi reescrito; o projeto não foi alterado neste lote.
- Público: pessoa com informática básica, sem SQL; Windows/VS Code/terminal como caminho principal. Conhecimento de Python não é pressuposto para programar o executor fornecido. Preparações Python e SQLite continuam obrigatórias para executar.
- Objetivo: compreender o modelo, criar regras, manipular e consultar dados, explicar agregações/junções e transações; reconhecer limites de concorrência e efeitos externos.
- Arquivos: `database.js`, fichas do primeiro módulo em `tracks.js`, versões dos assets, verificadores existentes e este registro. Não houve mudança de arquitetura, dependências, conta real ou esquema de persistência.

## 2. Veredito e estado

**Correções implementadas e validadas tecnicamente no escopo abaixo.** A leitura focal encontrou lacunas remanescentes da revisão geral: comandos cobrados antes da explicação, ambiguidade entre arquivo e prompt, exercícios guiados incompatíveis com execução automática, referência a duas conexões sem banco compartilhado e detalhes incompletos de CTE e repetição de efeitos externos.

As orientações foram corrigidas sem renomear aulas, trocar exercícios de posição ou alterar quizzes. A revisão não é observação com aluno: não comprova aprendizagem, tempo real necessário nem ausência de toda dúvida futura. O módulo continua básico com introduções intermediárias, não formação completa em concorrência ou sistemas distribuídos.

## 3. Achados por aula

Todos os IDs abaixo pertencem a `assets/js/data/lesson-guides/database.js`; as abas indicam onde o texto aparece.

| Aula | Local e evidência anterior | Tipo / gravidade | Correção e evidência |
|---|---|---|---|
| `db-modeling` | Conceitos iniciava por entidades sem definir banco, SQL, conexão e papel do executor; siglas PK/FK e interpretação de pares ficavam implícitas | RISCO / alta | Introdução e glossário contextual; diferença arquivo/programa/dados; 0/1 e títulos SELECT/JOIN explicados; tarefas guiadas explicitamente no desenho |
| `db-normalization` | Domínio, dependência e transitividade condensados; Construir no papel dizia que “consultas” mostrariam o resultado | FATO / média | Definições com exemplo de cidade; formas cumulativas e limites da simplificação; resultado agora exige desenho; previsão fixa duas matrículas |
| `db-ddl-constraints` | Testes exigiam INSERT/SELECT antes de CRUD; tipo, funções, operadores, PRAGMA e recriação pouco explicados | RISCO / bloqueante | Seção de leitura da sintaxe; comandos mínimos e significado de cada função; instruções de reconstrução e testes isolados; prioridade e quatro recusas executadas |
| `db-ddl-crud` | Guia pedia parar antes de UPDATE embora o arquivo executasse tudo; trecho Python sem delimitar onde usá-lo | FATO / alta | Consulta de observação inserida antes de UPDATE; parâmetros/driver/tupla definidos como antecipação conceitual; quatro soluções executadas |
| `db-select` | AS, cláusula, collation e precedência pouco explícitos; mudança final não dava dados para testar 29/30 | RISCO / média | Glossário, significado de DISTINCT e ASC; desafio fixa registro e ordenação; quatro soluções executadas |
| `db-aggregation` | Ordem lógica poderia ser confundida com ordem de escrita; alteração final não dava registro completo | RISCO / média | Forma escrita e leitura de resumo separadas, pausa de conta manual, entrada de transferência definida; quatro soluções executadas |
| `db-joins` | t/l e ponto pouco detalhados; CTE citada antes da aula; tabelas simplificadas podiam sugerir abandono de restrições | RISCO / média | Origem do alias, coluna qualificada, lado esquerdo e limite da simplificação explícitos; CTE apontada para a próxima aula; quatro soluções executadas |
| `db-subqueries-ctes` | SELECT AVG(total) isolado falharia fora de WITH; solução Alterar era só WHERE; Construir dizia “dois totais” após adicionar Git | FATO / alta | Escopo, instrução completa e trecho de substituição explicitados; três totais corrigidos; novo passo executável para resumo/EXISTS/view e alternativa de duas CTEs; resultados executados |
| `db-transactions` | Guia pedia pausar o arquivo automático; confirmação em memória e marcadores ? podiam ser confundidos com persistência/SQL pronto | FATO / alta | Carga inicial separada para observação manual; retorno ao exemplo antes da prática; autocommit do executor e limite da memória explícitos; saldos, rollback e destino ausente executados |
| `db-concurrency-boundaries` | Guia ainda dizia trocar ROLLBACK TO por RELEASE (duplicando RELEASE); pedia duas conexões ao arquivo inexistente no laboratório em memória | FATO / bloqueante | Remover apenas ROLLBACK TO; demonstração fornecida cria arquivo temporário compartilhado, abre A/B e mostra bloqueio/liberação; programa executado duas vezes |
| `db-concurrency-boundaries` | Construir exigia evitar aviso duplicado sem explicar resposta externa perdida; solução sugeria “reverta ou confirme” uma tentativa parcial | FATO / alta | Identidade estável, consulta do resultado e limite da deduplicação externa; não confirmar unidade incompleta; falha obrigatória com rollback completo demonstrada |
| Dez aulas | Repetir/recriar tabela, editar consulta e reiniciar tinham orientações genéricas, sem distinguir o arquivo modificado da base original | FATO / alta | Reutilizar arquivos, uma instrução por vez, interpretar OK/cabeçalhos/conjunto vazio, reconstruir fora do prompt e restaurar o bloco original antes de exercícios independentes |

## 4. Percurso e pré-requisitos

Preparação digital/editor → Python verificado → alternativa SQLite → modelagem → normalização → DDL → CRUD → SELECT → agregação → JOIN → CTE → transações → limites.

Transações usa CRUD diretamente; o exemplo de saldo não depende da CTE. Os exemplos Python fornecidos são ferramentas para observar SQL, não exigências de implementar funções Python sozinho. O quiz de parâmetros em CRUD conserva seu índice e passa a ter explicação explícita de driver, conexão e tupla no texto anterior.

| Área | Ação e confirmação | Recuperação |
|---|---|---|
| Conceitos | Definições, relações e leitura da sintaxe; pausas de desenho/conta manual | Atalhos para preparações e aulas anteriores |
| Exemplo, arquivos | Criar na primeira aula; reutilizar nas demais; salvar SQL separado do Python | Conferir extensão, pasta e conteúdo do arquivo |
| Exemplo, terminal | Executar na pasta dados-sql; conferir tabelas e aguardar sql> | Mensagem completa; primeira falha; não colar comando de terminal no arquivo |
| Prompt | Uma instrução completa por vez; SELECT permite observar o estado após recusa | ...> pede conclusão; Ctrl+C encerra; reiniciar carrega somente o arquivo salvo |
| Prática | Restaurar exemplo quando o enunciado exige base inicial; registrar hipótese e resultado | Não repetir CREATE TABLE sobre tabela existente; reconstruir em nova sessão |
| Revisão | Erros reconhecíveis, quiz e segunda tentativa | Rascunhos preservados; nenhuma marcação automática de domínio |

Primeira saída do módulo permanece o progresso independente de Ana e Beto. Bases em memória desaparecem ao sair; arquivos de código não desaparecem. A demonstração adicional de concorrência usa arquivo temporário próprio e encerra ambas as conexões antes de removê-lo.

## 5. Exercícios e preparação do projeto

- As 40 atividades foram lidas na ordem Prever → Alterar → Construir → Investigar; os dez desafios de requisito também foram examinados.
- Modelagem e normalização continuam cobrando desenho, sem exigir SQL antes de DDL. As tarefas conceituais não foram artificialmente tratadas como testes de código.
- DDL agora ensina a sintaxe mínima necessária antes dos testes de regras. As entradas inválidas são executadas separadamente da carga válida.
- Consultas usam a base do exemplo, e mudanças de estrutura acontecem no arquivo em uma nova execução. Fragmentos da solução são identificados como partes a substituir.
- CTE/view ganha etapa executável antes do projeto, incluindo ausência de grupos e preservação por LEFT JOIN. A alternativa de duas CTEs demonstra 70 minutos e três matrículas sem multiplicar as medidas.
- A mudança final de concorrência distingue falha simulada pela aplicação de restrição realmente declarada no schema. A ausência de garantia de envio único é declarada, não resolvida por uma promessa de unicidade local.
- A solução de referência e o verificador do projeto SQL continuam passando na regressão; o projeto não foi reescrito.

## 6. Validação técnica e fontes

| Verificação | Resultado | Limite |
|---|---|---|
| `node scripts/validate-content.js` | Passou: 169 aulas, 696 exercícios, 531 questões, 29 projetos; 33 scripts | Estrutura, não aprendizagem |
| `node scripts/verify-database-lessons.cjs` | Passou: exemplos anteriores e regressões; mais 20 soluções SQL exibidas; resumo/EXISTS/view/duas CTEs; prioridade com quatro recusas; afinidade; rollback completo; duas conexões reais duas vezes | Não executa serviços de banco externos |
| E2E `progresso-e-leitura.spec.cjs` | 1/1 passou; aulas, novos termos, alternativas CTE/concorrência por teclado, persistência/recarga com mocks | Clerk/Supabase reais não testados |
| Comparação semântica com `59b1f6e` | Guias fora do módulo 1, outros módulos/trilhas e quizzes preservados; 40 índices mantidos | Não é teste de aprendizagem |

Ambiente: Windows, Node e Python locais já existentes, Chromium/Playwright do laboratório. Nenhum pacote instalado. Não houve aluno real, instalação em macOS/Linux, teste individual de todas as variações possíveis ou envio externo de email.

Fontes oficiais abertas em 03/11/2026 para verificar os detalhes corrigidos (EN):

- [SQLite Expressions](https://www.sqlite.org/lang_expr.html): subconsultas escalares e correlacionadas, EXISTS e operadores.
- [SQLite Datatypes](https://www.sqlite.org/datatype3.html): afinidade e conversões antes da verificação do tipo armazenado.
- [SQLite Transactions](https://www.sqlite.org/lang_transaction.html): confirmação automática, transações explícitas e único escritor.
- [SQLite Savepoints](https://www.sqlite.org/lang_savepoint.html): ROLLBACK TO e RELEASE, incluindo diferença do ponto externo.

Não houve revisão individual de todos os vídeos/livros do catálogo; nenhuma fonte nova foi adicionada ao catálogo. As instruções essenciais permanecem na aula.

## 7. Interface e compatibilidade

- 375/768/1280 px, altura 900, zoom padrão: E2E abre e aciona as alternativas por Enter, verifica conteúdo e ausência de overflow da página. Capturas dos termos e da demonstração foram inspecionadas; rolagem do leitor mantém o restante acessível.
- CSS do projeto e cópia local do Tailwind Browser público previamente identificado como jsDelivr 4.3.3; disponibilidade de CDN/fontes ao vivo não certificada.
- Sem alteração no renderizador compartilhado. Novos termos usam `readerTerms`; exemplos usam `example.steps/alternatives` existentes. Nenhum campo invisível foi usado para instrução essencial.
- `databaseRevision` permanece 4: esclarecimentos e ampliação de exemplos não mudam IDs, índices, respostas dos quizzes nem significado dos rascunhos. Não há nova migração ou reinício de respostas. A migração anterior continua testada.
- Tempos de quatro aulas ajustados como estimativas editoriais; não são duração medida com pessoas.
- Leitor de tela, zoom real de 200%, telefone físico e conta real: não testados.

## 8. Encerramento

- [x] Bloqueios identificados têm orientação e retorno explícitos.
- [x] Exemplos e alterações executáveis relevantes passaram; atividades conceituais foram identificadas como tal.
- [x] Conteúdo fora do lote, quizzes e índices preservados.
- [x] Interface e persistência simulada conferidas no escopo descrito.
- [ ] Observação com aluno e exercício de transferência sem consulta à solução.

Não há bloqueio conhecido remanescente neste percurso após a leitura técnica final. A carga de DDL/CTE e a compreensão das fronteiras de transação ainda precisam de observação com aluno; não se atribui domínio a testes do agente.

## 9. Entrega e retomada

Publicação autorizada em `review` e `testes`; commit, push, CI e deploy serão confirmados na entrega. Sem alteração de `main`.

Próxima observação útil: aluno executar DDL, propor uma entrada inválida nova, registrar a mensagem e comprovar o estado preservado, sem abrir a solução. Se surgir dúvida, registrar a primeira instrução insuficiente e a saída real antes de acrescentar conteúdo.

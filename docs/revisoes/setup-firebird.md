# Revisão da aula — Preparar Firebird 5 como aprofundamento (`setup-firebird`)

> **Atualização de sequência:** o ID atual é `db-setup-firebird`; a aula foi movida para Banco de Dados, depois dos fundamentos SQL e imediatamente antes de `db-firebird`. A revisão abaixo registra a posição anterior. O progresso, quiz, anotações e posição de leitura do ID antigo são migrados no `sanitizeState()`.

## 1. Escopo e contrato

- **Data/branch/revisão inicial:** 02/11/2026, `testes`, `61b6872` com alterações anteriores não commitadas. **Pedido:** auditar e, após correção do usuário, implementar as melhorias do padrão SQLite. Não houve autorização específica para publicar.
- **Público:** pessoa da etapa 0 no Windows, VS Code e PowerShell, com informática básica. A aula é opcional e deve ser retomada após fundamentos SQL, antes de `db-firebird`.
- **Saída observável:** identificar o `isql` do Firebird 5, confirmar serviço e pasta permitida, criar `hub_fb_aula.fdb` novo no host do servidor, consultar `CURRENT_USER` e reabrir o mesmo arquivo com `CONNECT` sem recriá-lo.
- **Arquivos:** `assets/js/data/lesson-guides/preparacao-bancos-aprofundamento.js`, ficha em `assets/js/data/tracks.js` (conferida, não editada) e leitor `assets/js/ui/dialogs.js` (conferido, não editado).

## 2. Veredito e estado

**Implementado e validado estruturalmente/visualmente no ambiente local simulado.** A sequência anterior separava terminal de `SQL>`, mas deixava instalação, confirmação da pasta e retomada dependentes de inferência. O novo percurso tem ações e confirmações por passo. A instalação e a operação com Firebird real, em especial as permissões da conta do serviço, continuam sem validação prática.

- **Observação com aluno real:** não realizada. A análise do percurso foi uma tentativa mental sem credenciais, serviço ou arquivo `.fdb` reais.
- **Primeiro bloqueio anterior:** o texto exigia pasta autorizada, mas não ensinava onde verificar serviço, conta de logon e configuração `DatabaseAccess`.
- **Limite atual:** se a pessoa não conseguir confirmar a permissão da pasta, o passo manda parar e registrar a prática como pendente. Isso é uma condição real do sistema, não uma saída simulada pelo curso.

## 3. Achados e pré-requisitos

| Localização | Tipo/gravidade | Evidência da versão anterior | Implementação | Estado |
|---|---|---|---|---|
| Etapa 0, `prerequisites` | FATO · alto | Exigia módulo SQL posterior sem atalho; no leitor havia 0 links. | `prerequisiteLessons` aponta para `db-select` e `db-ddl-crud`; texto manda voltar antes de `db-firebird`. | Corrigido como navegação; ordem antecipada continua explicitamente adiada. |
| `setup` Windows/macOS/Linux | FATO · alto | A instalação e o serviço eram descritos em parágrafos longos; ações obrigatórias dependiam do guia externo. | Conceitos explicam contextos; exemplo Windows aponta para instalador executável oficial, pasta padrão, `services.msc`, `firebird.conf`, `DatabaseAccess` e permissões da conta do serviço. Alternativas macOS/Linux são identificadas. | Implementado; não executado nos sistemas. |
| `example.blocks` | FATO · alto | Cinco blocos e nenhuma confirmação por passo. | Seis cartões `example.steps` com contexto, comandos e saída esperada próximos. | Conferido no leitor local. |
| Primeira criação e retomada | FATO · bloqueante na repetição | `CREATE DATABASE` sobre arquivo existente não era separado da retomada. | O passo de criação exige arquivo novo; o último passo usa `CONNECT` no mesmo `.fdb`. | Implementado; banco real não testado. |
| Senha SYSDBA | RISCO · alto | A aula dizia “sem expor senha”, mas `CREATE DATABASE ... PASSWORD` requer digitar a senha na sessão do `isql`. | O texto informa que ela ficará visível na tela, manda usar sessão privada e proíbe registrar linha preenchida. O guia oficial confirma que a senha pode ser definida pelo instalador ou gerada em `SYSDBA.password`; a aula não presume senha padrão. | Risco residual de exposição local; não há senha real no repositório. |
| Prática e desafio | FATO · alto | `ambiente-firebird.md` sem fluxo de criação; desafio genérico. | Exercício aponta Explorador/Finder → VS Code → Novo Arquivo → Salvar; desafio pede reabrir o mesmo arquivo, preservando caminho e usuário. | Implementado; aluno não observado. |

**Dependências:** etapa 0 de arquivos/editor/terminal → fundamentos SQL (`db-select`, `db-ddl-crud`) → `setup-firebird` → `db-firebird`. Os atalhos ajudam a localizar as aulas, mas não eliminam a necessidade de voltar depois. SQLite e PostgreSQL permanecem o caminho principal.

## 4. Percurso na ordem da interface

| Aba/passo | Estado e ferramenta | Ação | Confirmação/retorno |
|---|---|---|---|
| Conceitos | Navegador; curso na etapa 0 | Distinguir cliente, servidor, arquivo e prompts; decidir se fará o aprofundamento | Sem instalação, registrar pendência. |
| Exemplo 1 | Navegador | Usar atalhos para fundamentos SQL e retornar quando couber | Decisão de executar em máquina própria/autorizada. |
| Exemplo 2 | Navegador, Explorador, PowerShell | Instalar pacote oficial; localizar `isql.exe`; executar `-z` pelo caminho conhecido | Versão do cliente mostra Firebird 5; ainda não comprova serviço. |
| Exemplo 3 | Serviços, editor, Explorador | Confirmar serviço, conta de logon, `DatabaseAccess` e pasta nova permitida | Só avançar com serviço e pasta autorizada; não alterar permissões por tentativa. |
| Exemplo 4 | PowerShell → `SQL>` | Abrir o mesmo `isql` e criar `.fdb` novo em `localhost:C:/dados` | Volta `SQL>` conectado; erro de acesso/arquivo existente interrompe criação. |
| Exemplo 5 | `SQL>` | Consultar `CURRENT_USER` e sair com `QUIT;` | Usuário observado e retorno ao PowerShell. |
| Exemplo 6 | PowerShell → `SQL>` | Reabrir o arquivo existente com `CONNECT` e consultar de novo | Mesma base e usuário; não repetir criação. |
| Prática/Revisão | Navegador + laboratório, quando disponível | Prever, alterar caminho conceitualmente, documentar, investigar erro, quiz e desafio | Registros com evidências reais ou pendência identificada; quiz não mede domínio. |

**Primeira saída pequena:** `isql -z` confirma somente o cliente; a primeira saída do servidor vem de `SELECT CURRENT_USER FROM RDB$DATABASE;` após conectar/criar. **Repetição:** `CONNECT` reutiliza o arquivo; não apagar nem sobrescrever `.fdb`.

## 5. Exercícios e desafio

| Atividade | Conhecimento e lugar | Entrada/critério | Validação |
|---|---|---|---|
| Prever | Identificar fornecedor do `isql` no terminal | Versão de outra implementação impede criar banco | Conferência por leitura; sem execução. |
| Alterar | Reescrever caminho Linux no rascunho, somente após confirmar pasta autorizada | Preservar caminho absoluto do host do servidor e senha fictícia | Não executado em Linux; não afirmar caminho local válido. |
| Construir | Criar `ambiente-firebird.md` no VS Code | Campos e evidências, sem senha | Fluxo de criação agora explícito; aluno não observado. |
| Investigar erro | Serviço, pasta, conta e `DatabaseAccess` | Mensagem de acesso ao arquivo → verificar camada sem permissões amplas | Analisado por leitura, não reproduzido em serviço real. |
| Mudança de requisito | `CONNECT` em nova sessão | Preservar arquivo/caminho e usuário, não usar `CREATE DATABASE` | Desafio específico, não executado com banco real. |

## 6. Verificações técnicas e fontes

| Verificação | Resultado | Limite |
|---|---|---|
| `node scripts/validate-content.js` | Passou: 10 trilhas, 33 módulos, 169 aulas, 696 exercícios, 531 questões, 29 projetos | Sintaxe/estrutura, não aprendizagem. |
| Chromium local, serviços fictícios | 1/1 teste de inspeção passou; 2 atalhos, 6 passos, 4 exercícios e nenhum erro de página | Tailwind público em cache; fontes remotas bloqueadas; sem Firebird real. |
| E2E existente `progresso-e-leitura.spec.cjs` | 1/1 passou | Usa Clerk/Supabase fictícios e parte do layout de teste. |
| Instalação/`isql`/permissão/arquivo `.fdb` reais | Não executados | Não foi iniciado serviço nem usada senha do usuário. |

Fontes oficiais abertas em 02/11/2026:

| Fonte | Status e uso | Limite |
|---|---|---|
| [Downloads Firebird](https://www.firebirdsql.org/en/downloads/) e [Firebird 5.0](https://www.firebirdsql.org/en/firebird-5-0) | **OK:** há instalador Windows x64, pacotes Linux e macOS x64/ARM64 | Pacote e serviço dependem do sistema local. Inglês. |
| [Quick Start Firebird 5](https://www.firebirdsql.org/file/documentation/html/en/firebirddocs/qsg5/firebird-5-quickstartguide.html) | **OK:** pasta padrão Windows, serviços, `DatabaseAccess`, senha SYSDBA, criação com `localhost:` e diferença `QUIT`/`EXIT` | Fonte complementar; exemplos da documentação incluem situações avançadas e versões antigas de caminho. Inglês. |
| [Manual isql](https://www.firebirdsql.org/file/documentation/html/en/firebirddocs/isql/firebird-isql.html) | **OK:** contexto do prompt e recursos do cliente | Referência extensa, não roteiro de instalação. Inglês. |

## 7. Interface e compatibilidade

| Viewport | Estado | Observado | Não testado |
|---|---|---|---|
| 375 × 812 | Conceitos, Exemplo, Prática, Revisão | Título quebra linha; seis passos renderizados; sem transbordamento de página/corpo medido | Telefone físico, rolagem manual até o último bloco. |
| 768 × 812 | Mesmas abas | Sem transbordamento medido | Tablet físico. |
| 1280 × 812 | Mesmas abas | Sem transbordamento medido | Preview Vercel. |

O CSS global e o mesmo script Tailwind público em cache foram usados; fontes Google não carregaram. O teste trocou abas por automação e capturou a viewport; Tab/Shift+Tab completo, seleção manual do código, zoom 200%, leitor de tela e teclado em todas as alternativas não foram testados. Não houve alteração de IDs, quiz, estado ou leitor compartilhado; progresso real Clerk/Supabase não foi usado.

## 8. Critérios de encerramento

- [x] Ações do caminho Windows têm lugar, comando e confirmação, com parada explícita quando serviço/pasta não forem autorizados.
- [x] Criação e retomada estão separadas e o desafio preserva o arquivo.
- [x] Validador e interface local passaram no escopo registrado.
- [x] IDs, índices dos exercícios/quiz e chaves de progresso foram preservados.
- [ ] Instalação, permissões, criação e retomada foram executadas em Firebird real.
- [ ] Um aluno iniciante seguiu a aula sem ajuda adicional.

**Decisão:** implementação concluída no código, validação técnica limitada à estrutura e ao leitor. Não afirmar que a instalação foi comprovada em Windows/macOS/Linux nem que o aluno já consegue executar sozinho.

## 9. Entrega e passagem

- **Arquivos alterados:** guia de bancos opcionais e este relatório. Nenhum banco, conta ou serviço do usuário foi modificado. O teste temporário de navegador foi removido; capturas ficaram apenas na pasta temporária.
- **Próxima verificação concreta:** pessoa com instalação Firebird 5 descartável segue os passos Windows, registra saída real de `isql -z`, `CURRENT_USER`, `QUIT` e `CONNECT` em retomada, sem compartilhar senha. Revisar o primeiro bloqueio observado antes de aprovar didaticamente.
- **Limites:** macOS/Linux, conta/serviço reais, segurança da pasta, zoom, teclado completo, Preview e aluno real não verificados.
- **Commit/push/deploy:** não realizados nesta implementação.

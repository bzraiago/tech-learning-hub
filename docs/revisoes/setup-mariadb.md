# Auditoria da aula — Preparar MariaDB como aprofundamento (`setup-mariadb`)

## 1. Escopo e contrato

- **Data:** 02/11/2026. **Branch:** `testes`. **Código examinado:** `61b6872`, com documentos do processo ainda modificados localmente.
- **Pedido:** revisar a próxima aula da etapa 0 com o processo didático, o padrão visual e as skills de aluno iniciante, validação didática e front-end. Esta é uma auditoria; a aula não foi editada.
- **Perfil simulado:** pessoa com informática básica no Windows, VS Code e PowerShell, sem experiência com clientes de banco. macOS e Linux foram examinados por leitura, sem execução.
- **Resultado prometido:** instalar MariaDB Community Server e cliente, conectar ao serviço local, criar `hub_maria_aula`, confirmar banco/usuário/versão/porta e saber retomar sem expor senha. O aprofundamento é opcional e deve ser retomado antes de `db-mariadb`.
- **Arquivos:** ficha em `assets/js/data/tracks.js` (`setup-mariadb`), guia em `assets/js/data/lesson-guides/preparacao-bancos-aprofundamento.js`, leitor em `assets/js/ui/dialogs.js`; conferência de `db-mariadb` em `assets/js/data/lesson-guides/database.js`. IDs e progresso não foram alterados.

## 2. Veredito e estado

**A aula ainda não é um percurso linear executável para a etapa 0.** Ela acerta ao declarar o caráter opcional, distinguir cliente e servidor e separar os comandos do terminal dos comandos do prompt MariaDB. Entretanto, manda o aluno voltar depois de um módulo posterior sem atalho na interface, terceiriza passos essenciais da instalação à documentação e apresenta a confirmação só após três blocos de comandos. No Linux, a conexão `root` com senha pode não corresponder ao método de autenticação instalado.

- **Estado:** auditoria concluída; bloqueios didáticos abertos. Instalação e serviço MariaDB não validados tecnicamente.
- **Aluno real:** não observado. O percurso abaixo é tentativa mental, sem inventar saídas ou erros reais.
- **Primeiro bloqueio:** na aba Conceitos, “Percorra primeiro o módulo Fundamentos e linguagem SQL” aponta para conteúdo posterior, mas não há link direto (`prerequisiteLessons` ausente). Quem tentar concluir agora precisa sair da sequência e procurar o módulo.

## 3. Achados e pré-requisitos

| Localização | Tipo e gravidade | Evidência | Correção mínima | Situação |
|---|---|---|---|---|
| `setup-mariadb`, pré-requisitos e posição em `tracks.js` | **FATO · bloqueante agora** | A preparação está na etapa 0; o texto pede o módulo SQL posterior. No leitor local, nenhum atalho de aula prévia foi renderizado. | Mostrar claramente “volte depois de Fundamentos e linguagem SQL” como adiamento, com link para a primeira aula necessária e para `db-mariadb`; preservar o ID. | Aberto |
| `setup.windows` e seção “Instale servidor e cliente” | **RISCO · alto** | “Baixe o MSI”, “inclua servidor e cliente”, “use o terminal do diretório bin ou ajuste o PATH” não indicam cliques de seleção, nome da entrada do Menu Iniciar, caminho encontrado, nem confirmação do serviço. A documentação oficial do MSI distingue `Database instance`, serviço e `Command Prompt` com `bin` no PATH. | Dar um caminho Windows principal com telas/opções exatas, registro da porta escolhida e abertura do `Command Prompt` instalado; verificar cliente e serviço separadamente, sem pedir alteração manual de PATH como primeira saída. | Aberto |
| `setup.macos`, `setup.linux` e comando comum de conexão | **RISCO · alto** | Os dois sistemas dependem integralmente de escolher um método na página oficial; não há comandos/pacotes nem verificação de serviço por sistema. O comando `-u root -p` pode falhar em Linux com autenticação `unix_socket`, conforme documentação oficial. | Definir um caminho verificável por sistema/distribuição apoiada, distinguir os demais como alternativas e explicar como confirmar o método de autenticação antes de usar o comando TCP do exemplo. | Aberto |
| Aba Exemplo, `example.blocks` e `guided` | **FATO · alto** | Três blocos, **zero** cartões `example.steps`; todos os comandos aparecem antes da confirmação conjunta. A aba Exemplo repete todo o `setup`, incluindo sistemas não usados. | Intercalar instalar/verificar cliente → conectar → criar/selecionar → consultar, com aplicativo, prompt, bloco e saída esperada juntos. Recolher sistemas alternativos e preservar código selecionável. | Aberto |
| `setup.verification` versus `example.blocks` | **FATO · médio** | A verificação textual manda `SELECT VERSION();` e `EXIT;` logo após entrar; o exemplo depois precisa abrir outra sessão para `CREATE DATABASE`, mas não diz que se deve reconectar. | Unificar a sequência: na sessão única, confirmar versão, criar/selecionar banco e sair; ou ensinar explicitamente a segunda conexão. | Aberto |
| Exemplo e retomada do banco | **RISCO · alto** | `CREATE DATABASE hub_maria_aula` sem `IF NOT EXISTS` falha ao repetir a aula em banco já criado; não há passo de inspeção antes de recriar. A referência oficial confirma erro de banco existente. | Antes de criar, conferir se o banco existe; se já existir, reutilizá-lo sem apagar dados. Mostrar a saída esperada na primeira vez e na retomada. | Aberto |
| Aba Prática, exercício “Construir” | **FATO · médio** | Pede `ambiente-mariadb.md`, mas não diz em qual pasta criar, como abrir essa pasta no editor nem como salvar; a etapa 0 ensina arquivo/editor, porém o contexto desta aula diz que não é preciso abrir projeto algum. | Escolher pasta de laboratório concreta, orientar a abertura no VS Code e o salvamento do `.md`; manter senha fora do arquivo. | Aberto |
| Aba Prática, mudança de requisito | **FATO · alto** | Não há `guide.requirementChange`; o leitor mostra um desafio genérico, sem uma mudança específica de conexão ou critérios de preservação. | Definir caso de mudança de porta/instância com banco e credencial preservados, destino alterado e evidência observável. | Aberto |
| Aba Revisão, `mistakes` | **FATO · médio** | Lista “confundir servidor e cliente”, “guardar senha” e “MySQL diferente” sem mensagem de erro concreta, ação anterior e próximo diagnóstico. | Incluir pelo menos “comando não reconhecido”, “conexão recusada”, “acesso negado” e “banco já existe”, cada um com verificação segura. | Aberto |

**Dependência real:** fundamentos de arquivos/terminal da etapa 0 → módulo **Fundamentos e linguagem SQL** (trilha Banco de Dados) → retorno a `setup-mariadb` → aula **MariaDB: InnoDB, tipos e transações de aplicação** (`db-mariadb`). O guia descreve a ordem, mas não a transforma em navegação direta. MariaDB continua opcional para o caminho principal SQLite/PostgreSQL.

## 4. Percurso na ordem da interface

| Aba/passo | O que o aluno tem | Lugar e ação pedida | Confirmação que a aula fornece | Falha/retomada |
|---|---|---|---|---|
| Conceitos, pré-requisito | Etapa 0 | Adiar até fundamentos SQL posteriores | Declara que é opcional | **Primeiro bloqueio agora:** destino sem atalho; não executar a preparação nesta posição. |
| Conceitos, instalação Windows | Após SQL; navegador e PowerShell | Baixar MSI, instalar servidor/cliente e abrir terminal novo | Nenhuma verificação da tela de instalação ou serviço | Aluno precisa deduzir opções e onde achar o cliente se PowerShell não reconhece `mariadb`. |
| Conceitos, macOS/Linux | Após SQL; Terminal | Escolher método oficial por arquitetura/distribuição e instalar | Sem comando ou estado de serviço específico | A fonte externa vira instrução obrigatória; `root -p` pode não ser o acesso configurado. |
| Exemplo, cliente | Servidor supostamente instalado | `mariadb --version` em PowerShell/Terminal | Versão do cliente, sem formato exemplificado | Não comprova servidor. |
| Exemplo, conexão | Cliente e serviço | `mariadb -h 127.0.0.1 -P 3306 -u root -p` e senha no pedido | `MariaDB [(none)]>` | Porta e autenticação reais não são verificadas antes; falhas comuns não têm roteiro concreto. |
| Exemplo, SQL | Prompt MariaDB aberto | `CREATE DATABASE`, `USE`, `SELECT DATABASE(), USER(), VERSION();`, `EXIT;` | Nome do banco e identificação | Funciona conceitualmente na primeira execução com permissão; repetir `CREATE` pode falhar. |
| Prática e revisão | Exemplo tentado | Prever, alterar porta, criar `.md`, investigar `NULL`, quiz e desafio | Critérios textuais e soluções recolhidas | Arquivo sem pasta definida; desafio genérico. |

**Primeira confirmação pequena recomendada:** cliente reconhecido em um terminal identificado, seguido de serviço identificado antes de qualquer escrita; só então `SELECT VERSION();` em sessão conectada. Isso é uma proposta de ordem, não saída observada. **Retomada:** a aula manda reconectar, mas não explica o caso em que `hub_maria_aula` já existe; nenhum banco foi criado nesta auditoria.

## 5. Exercícios e desafio

| Atividade | Conhecimento cobrado | Ensino anterior | Entrada/critério e limite |
|---|---|---|---|
| Prever | Versão do cliente versus servidor recusado | Sim, conceitos | Critérios pedem evidência adicional; analisado por leitura. |
| Alterar | Porta 3306 → 3307 com `-P` | Sim, exemplo | Solução usa `-P 3307`; a aula não ensina a verificar se há serviço na nova porta, mas o enunciado supõe laboratório autorizado. |
| Construir | Relatório `ambiente-mariadb.md` | Arquivos na etapa 0, sem pasta nesta aula | Campos/segurança definidos; lugar e fluxo para criar arquivo não definidos aqui. |
| Investigar erro | `SELECT DATABASE()` retorna `NULL` | `USE` aparece no exemplo | Pode resolver após entrar; a solução ressalva conferir a instância antes de criar. |
| Mudança de requisito | Preservar algo e alterar algo | Não especificado | Genérica no leitor, sem caso verificável desta aula. |

Quiz e segunda tentativa ajudam a revisar conceitos, mas não comprovam que o aluno instalou ou operou MariaDB sem apoio.

## 6. Verificações técnicas e fontes

| Ação | Ambiente/revisão | Observado | Estado e limite |
|---|---|---|---|
| `node scripts/validate-content.js` | Raiz, `61b6872` + documentos locais | 10 trilhas, 33 módulos, 169 aulas, 696 exercícios, 531 questões, 29 projetos; sem inconsistências | **Passou.** Estrutura, não clareza. |
| Leitor local em Chromium | Servidor HTTP temporário, Clerk/Supabase fictícios, mesmo script Tailwind público em cache | 1 teste passou; sem erros de página; quatro abas em 375/768/1280 px | **Passou no escopo simulado.** Não valida Preview ou serviços reais. |
| MSI, servidor, conexão, criação/repetição | Máquina do auditor | Não executados | Nenhuma instalação, serviço, credencial ou banco do usuário foi alterado. |
| Exercícios por aluno real | Não houve sessão | Tentativa mental | Não comprova aprendizagem ou domínio. |

| Fonte consultada em 02/11/2026 | Estado e afirmação confirmada | Limite |
|---|---|---|
| [Get Started MariaDB](https://mariadb.com/get-started-with-mariadb/) | **OK:** aponta downloads e caminhos Windows, macOS, Linux e Docker | Portal amplo; não substitui passos locais. Inglês. |
| [Deployment/Installation](https://mariadb.com/docs/server/server-management/install-and-upgrade-mariadb) | **OK:** índice oficial para instalação Community | Índice, não guia único por sistema. Inglês. |
| [MSI no Windows](https://mariadb.com/docs/server/server-management/install-and-upgrade-mariadb/installing-mariadb/binary-packages/installing-mariadb-msi-packages-on-windows) | **OK:** documenta `Database instance`, serviço, rede/porta e atalho `Command Prompt` | Ainda requer tradução em passos próprios da aula. Inglês. |
| [Guia de primeiros comandos](https://mariadb.com/docs/server/mariadb-quickstart-guides/mariadb-usage-guide) | **OK:** separa comando do sistema e prompt `MariaDB [(none)]>` | É complemento, não roteiro de instalação. Inglês. |
| [Cliente MariaDB](https://mariadb.com/docs/server/clients-and-utilities/mariadb-client/mariadb-command-line-client) | **OK:** identifica cliente interativo e sintaxe | Referência extensa; selecionar só os trechos necessários. Inglês. |
| [CREATE DATABASE](https://mariadb.com/docs/server/reference/sql-statements/data-definition/create/create-database) | **OK:** confirma erro ao criar banco já existente e efeito de `IF NOT EXISTS` | Consulta usada para avaliar retomada. Inglês. |
| [Diagnóstico de conexão](https://mariadb.com/docs/server/mariadb-quickstart-guides/mariadb-connection-troubleshooting-guide) | **OK:** documenta autenticação `unix_socket` comum no Linux | Não se aplica automaticamente a toda instalação. Inglês. |

## 7. Interface e compatibilidade

| Viewport | Abas/captura | Resultado | Não verificado |
|---|---|---|---|
| 375 × 812 | Conceitos, Exemplo, Prática, Revisão | Título quebra linha; corpo e página sem transbordamento medido; três blocos no Exemplo; captura mostra texto legível e rodapé. | Rolagem manual até o fim de cada aba. |
| 768 × 812 | Mesmas quatro abas | Sem transbordamento medido. | Dispositivo físico. |
| 1280 × 812 | Mesmas quatro abas | Sem transbordamento medido. | Navegador publicado. |

O teste abriu abas por clique programado; teclado completo, foco em cada controle, seleção manual do código, zoom 200%, preferência de movimento, leitor de tela e telefone físico **não foram testados**. O CSS global foi carregado; Tailwind veio de cópia local do script público e fontes remotas foram bloqueadas. Nenhum estilo artificial foi adicionado. Não houve alteração de leitor, IDs, índices, anotações ou estado; salvamento/recarga de progresso real não é evidência desta auditoria.

## 8. Critérios de encerramento

- [ ] Toda ação obrigatória tem lugar, instrução própria e confirmação imediata.
- [ ] A sequência é navegável sem buscar aula posterior manualmente.
- [ ] Instalação, autenticação e repetição foram verificadas em cada sistema prometido.
- [ ] O desafio final especifica mudança e preservação verificáveis.
- [x] Ficha e exemplo usam `127.0.0.1:3306`, `hub_maria_aula` e cliente `mariadb` de forma coerente.
- [x] Validação estrutural passou e limites de execução/observação foram registrados.
- [x] Nenhum progresso, banco ou serviço foi alterado.

**Decisão:** não aprovar como aula executável sem lacunas para iniciante. Priorizar a posição/atalho, o caminho Windows completo, um caminho concreto por macOS/Linux e a sequência de primeira execução/retomada. Depois revisar desafio e leitor.

## 9. Entrega e passagem

- **Alteração:** somente este relatório; a aula permanece igual. Capturas ficaram no diretório temporário da máquina e o teste descartável deve ser removido após a auditoria.
- **Última verificação:** validador de conteúdo e Chromium local nesta revisão, antes de qualquer futura correção.
- **Próxima ação concreta:** em `preparacao-bancos-aprofundamento.js`, preservar `setup-mariadb` e acrescentar percurso específico com `example.steps`, atalho para a ordem real, estados de instalação/serviço, primeira conexão e retomada; alinhar ficha de `tracks.js`. Reexecutar validador e inspeção visual após editar.
- **Limites:** sem instalação real Windows/macOS/Linux, sem Preview autenticado, sem aluno observado e sem teste de teclado completo.
- **Commit/push/deploy:** não realizados nesta auditoria.

## 10. Implementação posterior — 02/11/2026

Os achados acima documentam a versão auditada antes da edição. O guia compartilhado `preparacao-bancos-aprofundamento.js` agora aceita percurso e desafio próprios de cada preparação; as aulas Firebird/MongoDB não receberam o percurso MariaDB por engano. O ID `setup-mariadb`, os quatro exercícios, o quiz e as chaves de progresso foram preservados.

- **Percurso:** Conceitos distingue navegador, Command Prompt/Terminal e prompt MariaDB. Cinco cartões numerados conduzem pela instalação local Windows, identificação do cliente, conexão, primeira criação, `USE`/consulta e retomada sem repetir `CREATE DATABASE`. macOS/Linux aparecem como alternativas identificadas; o texto manda registrar pendência se instalação/autenticação local não corresponder ao caminho documentado.
- **Exercícios e desafio:** o arquivo `ambiente-mariadb.md` tem pasta e fluxo de criação no VS Code; `requirementChange` altera a porta de laboratório para 3307 preservando banco/consulta e exige marcar não executado quando o serviço alternativo não existir.
- **Verificações:** validador de conteúdo passou. Chromium local com serviços fictícios, Tailwind público em cache e fontes remotas bloqueadas exibiu 2 atalhos, 5 passos, 4 exercícios, sem erro de página ou transbordamento medido a 375/768/1280 px. O E2E existente de progresso/leitura passou. Instalação/conexão MariaDB reais, macOS/Linux, teclado completo, zoom 200%, Preview e aluno real **não foram testados**.
- **Decisão:** implementado e validado estruturalmente/visualmente no escopo local; execução real e autonomia do aluno continuam pendentes. O aprofundamento permanece opcional.
- **Commit/push/deploy:** não realizados nesta implementação.

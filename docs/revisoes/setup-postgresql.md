# Auditoria da aula — Preparar PostgreSQL e clientes de conexão (`setup-postgresql`)

## 1. Escopo e contrato

- **Data:** 02/11/2026. **Branch:** `testes`. **Código auditado:** `61b6872`, com os documentos do novo processo ainda modificados localmente.
- **Pedido:** validar didática e apresentação conforme `docs/PROCESSO_REVISAO_DIDATICA.md`, `docs/PADRAO_FRONTEND_AULAS.md` e as skills de validação didática, aluno com informática básica e front-end. Escopo de auditoria; a aula não foi editada.
- **Perfil simulado:** aluno da etapa 0 no Windows, com VS Code e PowerShell. Sabe usar mouse/teclado e seguir preparações já concluídas; não se presume que saiba instalar um cliente SQL, criar um servidor no pgAdmin ou preencher lacunas de um comando.
- **Resultado prometido:** distinguir servidor e cliente; conectar um `psql` externo ao PostgreSQL 17 do laboratório em `127.0.0.1:55432`, banco `estudos`, usuário `aluno`; confirmar o destino e separar erros de serviço, porta, credencial e banco.
- **Arquivos examinados:** ficha em `assets/js/data/tracks.js`, guia em `assets/js/data/lesson-guides/preparacao-postgresql.js`, pré-requisitos em `assets/js/data/lesson-guides/database.js`, leitor em `assets/js/ui/dialogs.js` e `assets/css/global.css`. Não houve alteração de IDs, estado ou progresso.

## 2. Veredito e estado

**Não aprovada como percurso linear executável na etapa 0.** A primeira ação depende da aula posterior `db-docker-compose`; o guia orienta a voltar depois, mas a interface não oferece atalho para esse pré-requisito. Mesmo após completar Compose, a instalação do cliente externo e o exercício com pgAdmin exigem passos que a aula não ensina. O leiaute básico funciona nas três larguras verificadas, porém a organização do exemplo ainda não segue o novo padrão de ação → comando → confirmação por passo.

- **Estado:** auditoria concluída no escopo descrito; aula com bloqueios didáticos abertos. Não classificar como “validada tecnicamente” para execução PostgreSQL real.
- **Observação com aluno real:** não realizada. O percurso de aluno abaixo é uma tentativa mental baseada no conteúdo e na interface local simulada.
- **Primeiro bloqueio:** em “Antes do primeiro passo”, é exigido Compose com serviço `db` saudável, mas essa aula só aparece mais tarde na trilha Banco de Dados. O aluno precisa adiar esta aula.

## 3. Achados prioritários e pré-requisitos

| # | Localização | Tipo e gravidade | Evidência | Correção proposta | Situação |
|---|---|---|---|---|---|
| 1 | Ficha `setup-postgresql` em `tracks.js` e `prerequisites` do guia; aba Conceitos | **FATO · Bloqueante para concluir agora** | Está na etapa 0 antes de `db-docker-basics` e `db-docker-compose`. O próprio texto manda pular. No leitor local, havia **zero** botões de pré-requisito, pois o guia não define `prerequisiteLessons`. | Colocar a prática executável após Compose ou oferecer um pequeno laboratório completo na própria etapa 0. Enquanto for uma preparação antecipada, sinalizar claramente “retorne depois” e fornecer atalhos para as aulas exatas, preservando o ID. | Aberto |
| 2 | `setup` Windows/macOS/Linux e seção “Escolha o cliente” | **RISCO · Bloqueante para iniciante sem `psql`** | “Instale o cliente pelo instalador/pacote oficial” não indica qual opção abrir, qual componente selecionar, como evitar um segundo servidor nem o que fazer se `psql --version` não for reconhecido. As páginas oficiais de Windows e macOS descrevem instaladores que **incluem o servidor**. | Definir um caminho principal verificável por sistema, com passos de seleção e confirmação de cliente apenas; deixar a conexão pelo `psql` interno como alternativa claramente delimitada. Não prometer instalação somente do cliente sem conferir o pacote escolhido. | Aberto |
| 3 | Aba Exemplo, `example.blocks` e `guided` | **FATO · Alta** | O navegador mostrou **0 passos numerados**, cinco blocos de comando em sequência, alternativa interna igualmente exposta, e um resultado esperado conjunto após todos os blocos. As ações guiadas vêm depois de todos os comandos. | Intercalar ação, bloco rotulado e saída esperada em `example.steps`, em quantidade adequada à aula; recolher alternativas por contexto e manter a primeira confirmação pequena antes da conexão externa. | Aberto |
| 4 | Aba Prática, exercício 2 “Alterar” | **FATO · Bloqueante no exercício** | O exercício exige configurar a conexão em “cliente gráfico opcional”, embora pgAdmin seja opcional e a aula não mostre como abrir, registrar servidor, preencher as abas, conectar e usar o Query Tool. [A documentação oficial](https://www.pgadmin.org/docs/pgadmin4/latest/server_dialog.html) confirma campos e telas próprios. | Tornar pgAdmin uma extensão opcional com roteiro próprio ou fazer a etapa obrigatória alterar um parâmetro do `psql` já ensinado. | Aberto |
| 5 | Aba Prática, mudança inesperada de requisito | **FATO · Alta** | `guide.requirementChange` não existe; o leitor exibe “Escolha uma mudança pequena ligada ao assunto”, seguido de exemplos genéricos de entrada/limite que não especificam qual conexão mudar. | Definir uma mudança concreta de host/porta ou cliente, com um comportamento preservado e outro alterado, critérios observáveis e sem apagar volumes. | Aberto |
| 6 | Exercício 4, solução do erro de autenticação | **RISCO · Média** | A solução oferece `\conninfo` para conferir host/porta. Se a conexão inicial falhou por senha, o aluno não chegou ao prompt `psql` e não pode executar `\conninfo` nessa tentativa. | Primeiro conferir o comando digitado, `docker compose port db 5432` e o serviço; reservar `\conninfo` para depois de uma conexão bem-sucedida. | Aberto |
| 7 | Aba Revisão, “Erros comuns” | **FATO · Média** | A mensagem `password authentication failed` aparece nos conceitos e no exercício, mas não nos casos da aba Revisão; ali há apenas enunciados como “Salvar a senha” e “Apagar o volume”. | Associar mensagens reconhecíveis a ação anterior, resultado esperado e próxima verificação segura, preservando a regra de mudar uma coisa por vez. | Aberto |

**Grafo real da dependência:** `setup-docker` + primeiras aulas de SQL → `db-docker-basics` → `db-docker-compose` (cria `dados-local/compose.yaml`, `.env` e serviço `db`) → `setup-postgresql`. `setup-docker-alternative` permite estudar SQLite, mas não satisfaz a conexão PostgreSQL. O texto de `setup-postgresql` reconhece essa ordem; o módulo e os atalhos não a tornam navegável.

## 4. Percurso na ordem da interface

| Aba/passo | Conhecimento/estado disponível | Onde e o que o texto pede | Confirmação apresentada | Bloqueio ou retorno |
|---|---|---|---|---|
| Conceitos: pré-requisitos | Etapa 0 e, possivelmente, Docker instalado | Ter `compose.yaml` de aula posterior e serviço `db` `healthy` | Host, porta, banco e usuário são declarados | **Primeiro bloqueio:** o laboratório ainda não foi criado nesta etapa; texto diz para pular, sem botão que leve ao destino. |
| Conceitos: instalação | Após a aula Compose, sistema Windows/macOS/Linux | Instalar/localizar `psql`; abrir novo terminal e executar `psql --version` | “mostra a versão”, sem exemplo de saída por sistema | Falta percurso concreto de instalação só do cliente e diagnóstico de PATH. |
| Exemplo: servidor | Pasta de Compose aberta no VS Code/terminal | `docker compose ps` e `docker compose port db 5432` no terminal | `db healthy`, `127.0.0.1:55432` | Os comandos estão rotulados corretamente; resultado fica distante, no fim do exemplo. |
| Exemplo: cliente externo | Servidor saudável e `psql` disponível | `psql --version`, conexão com `-h/-p/-U/-d/-W`; depois SQL e `\conninfo` dentro do prompt | `estudos=>`, banco `estudos`, usuário `aluno`, porta `55432` | Blocos separam terminal de `psql`, mas não formam passos com confirmação individual. |
| Exemplo: alternativa interna | Docker e Compose, sem `psql` externo | `docker compose exec db psql -U aluno -d estudos` | Confirma banco/usuário, mas não a porta externa | Alternativa está visível como mais dois blocos comuns; a distinção precisa continuar explícita. |
| Prática | Conexão feita | Prever, configurar pgAdmin, criar `.md`, investigar autenticação e propor mudança | Critérios e resultados antes das soluções recolhidas | pgAdmin e desafio final exigem orientação ausente. |
| Revisão e Fontes | Prática tentada | Quiz, segunda tentativa e links | Três perguntas conceituais e retorno sobre porta/cliente | Quiz não demonstra conexão executada; fontes são complemento. |

**Primeira saída pequena adequada a uma futura revisão:** após o Compose já preparado, mostrar `docker compose ps` com `db healthy`; em seguida, confirmar `SELECT current_database(), current_user;` no cliente interno antes de instalar cliente externo. São sugestões de sequência, não resultados executados nesta auditoria.

**Repetir e retomar:** o guia ensina `\q`, `docker compose stop` e `docker compose start` sem `-v`, e alerta para não apagar o volume. Isso é útil. A senha de um volume já inicializado pode divergir do `.env` atual; a aula Compose anterior explica esse limite. A prática real de repetição não foi executada aqui.

## 5. Exercícios e desafio

| Atividade | Conhecimento cobrado | Ensinado antes? | Resultado e limite da validação |
|---|---|---|---|
| Prever porta 5432 versus 55432 | Host, porta interna, origem da conexão | Sim, Conceitos e Compose | Critérios não revelam a resposta antes da tentativa; avaliado por leitura. |
| Alterar cliente gráfico | Registro de servidor e execução SQL no pgAdmin | **Não**; só há menção e parâmetros | Exercício não é iniciável pelo perfil simulado sem instruções externas. |
| Construir `conexao-postgresql.md` | Criar arquivo e documentar parâmetros/saída | A etapa 0 ensina arquivo e editor; a aula fornece campos | Pode ser feito após conexão; não inventar saídas reais. |
| Investigar autenticação | Diagnóstico por camadas e volume | Parcialmente; conceitos e Compose | Critérios protegem senha/volume; corrigir a sugestão de `\conninfo` antes do login. |
| Mudança de requisito | Preservar um comportamento e alterar outro | **Não há caso concreto nesta aula** | O enunciado genérico não fornece entrada/saída observável específica. |

O quiz e a segunda tentativa tratam `db:5432` versus `127.0.0.1:55432`; servem para revisão conceitual, não para comprovar instalação ou conexão independente.

## 6. Verificações técnicas e fontes

| Verificação | Ambiente/revisão | Observado | Estado e limite |
|---|---|---|---|
| `node scripts/validate-content.js` | Raiz do repo, `61b6872` com documentos locais | 10 trilhas, 33 módulos, 169 aulas, 696 exercícios, 531 questões, 29 projetos; sem inconsistências | **Passou.** Confere estrutura, não clareza ou serviços externos. |
| Leitor em Chromium local | Script temporário de auditoria em `labs/backend-layers`, Tailwind público em cópia local do cache da revisão anterior; Clerk/Supabase fictícios | 1/1 teste passou; abas por Enter, código por setas, Escape, cinco blocos e quatro exercícios renderizados; sem erros de página | **Passou no escopo simulado.** Não representa Preview autenticado, fontes remotas ou aprendizagem de aluno. |
| PostgreSQL externo, `psql`, Compose, repetição e erro de senha | Computador desta auditoria | `psql` não está disponível no terminal; o Docker CLI informou versão, mas sua configuração local deu acesso negado | **Não executados.** Não foram instalados pacotes, iniciados serviços, usados dados existentes nem alteradas credenciais. |
| Exercícios e desafio com aluno | Não houve aluno observado | Tentativa mental e conferência da interface | **Não executados por aluno.** A auditoria identifica lacunas, não mede domínio. |

As quatro fontes próprias da aula responderam em 02/11/2026:

| Fonte | Status e função | Limite |
|---|---|---|
| [PostgreSQL Downloads](https://www.postgresql.org/download/) | **OK**; portal oficial por sistema | Abre caminhos distintos; não ensina sozinho uma instalação apenas de cliente. As páginas de [Windows](https://www.postgresql.org/download/windows/) e [macOS](https://www.postgresql.org/download/macosx/) descrevem instaladores que incluem servidor. Inglês. |
| [psql, documentação atual](https://www.postgresql.org/docs/current/app-psql.html) | **OK**; confirma `-h/-p/-U/-d/-W`, `\conninfo` e `\q` | O link “current” estava na documentação 18, enquanto o laboratório fixa servidor 17. A [referência 17](https://www.postgresql.org/docs/17/app-psql.html) é mais precisa; um cliente pode ter versão diferente do servidor. Inglês. |
| [pgAdmin Downloads](https://www.pgadmin.org/download/) | **OK**; pacote gráfico oficial | Não substitui o roteiro para [registrar servidor](https://www.pgadmin.org/docs/pgadmin4/latest/server_dialog.html) e usar o Query Tool. Inglês. |
| [Imagem oficial postgres](https://hub.docker.com/_/postgres) | **OK**; documenta imagem e inicialização | Confirma que variáveis `POSTGRES_*` só inicializam diretório vazio; é material avançado para a etapa 0. Inglês. |

Na aba Fontes há ainda quatro links herdados do módulo, todos abertos: [VS Code](https://code.visualstudio.com/docs/setup/setup-overview) (redireciona ao guia inicial), [Python](https://www.python.org/downloads/), [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) e [Node.js](https://nodejs.org/en/download). Estão funcionais, mas não ajudam diretamente a completar esta conexão; o Pro Git oferece tradução em português do Brasil. Nenhuma dessas fontes deve ser usada como única instrução obrigatória da aula.

## 7. Interface e compatibilidade

| Largura | Estados observados | Resultado |
|---|---|---|
| 375 px | Conceitos, Exemplo, blocos de comando, Prática e desafio | Diálogo com cerca de 334 px; sem transbordamento da página ou do corpo. Comando longo rolou 89 px dentro do bloco por teclado; conteúdo alcançável. |
| 768 px | Mesmos estados | Diálogo com cerca de 722 px; sem transbordamento medido. |
| 1280 px | Mesmos estados | Diálogo com cerca de 1024 px; sem transbordamento medido. |

- **Interação:** Enter ativou as abas, setas moveram o bloco de código longo no celular e Escape fechou o diálogo. O foco da aba apareceu nas capturas. A seleção programática do conteúdo do bloco retornou somente o comando, sem seu rótulo. Seleção manual com mouse, Tab/Shift+Tab completo, leitor de tela, aparelho físico e zoom real de 200% **não foram testados**.
- **Evidência visual:** capturas da viewport e inspeção das posições inicial/intermediária/final do leitor. O CSS global do repositório foi usado com uma cópia em cache do mesmo script público Tailwind obtido na auditoria SQLite; as fontes Google remotas não carregaram. Não é uma inspeção do deploy Vercel.
- **Compatibilidade:** nenhum código do produto foi alterado. IDs, índices de exercícios/quiz e chaves de anotação permanecem como estavam; testes de salvamento/recarga com serviços reais não eram aplicáveis a esta auditoria de conteúdo. A ausência de `example.steps` é específica deste guia; não implica falha do leitor compartilhado.

## 8. Critérios de encerramento

- [ ] Cada ação obrigatória tem lugar, conteúdo disponível antes de usar e confirmação imediata.
- [ ] Nenhum bloqueio didático conhecido permanece.
- [ ] Exercícios e desafio cobram somente conhecimentos ensinados antes.
- [x] Os parâmetros principais da ficha e do guia concordam (`127.0.0.1`, `55432`, `estudos`, `aluno`).
- [x] Validação estrutural passou; as limitações de execução e interface estão declaradas.
- [x] A auditoria não alterou IDs, progresso nem serviços.
- [x] O veredito distingue teste técnico, tentativa mental e observação com aluno.

**Decisão:** não apresentar a aula como aprovada para execução linear por iniciante. Os achados 1, 2, 4 e 5 exigem revisão antes de nova validação didática.

## 9. Passagem para a próxima revisão

- **Arquivo criado:** este relatório. O script local de auditoria foi temporário e deve ser removido após a coleta; capturas ficaram apenas na pasta temporária da máquina.
- **Próximo passo concreto:** decidir a posição da aula em relação a `db-docker-compose`, preservar o ID `setup-postgresql` e reescrever o guia com um caminho principal por sistema e com `example.steps`. Em seguida, resolver o exercício gráfico e definir `requirementChange` específico; conferir a ficha de `tracks.js` e repetir os testes afetados.
- **Pendências externas:** instalação e conexão reais em Windows/macOS/Linux, zoom 200%, serviços Clerk/Supabase reais, Preview e teste com aluno. Nenhuma delas foi reivindicada como concluída.
- **Commit, push e deploy:** não realizados por esta auditoria.

## 10. Implementação posterior — 02/11/2026

Este registro atualiza o estado descrito acima; os achados da auditoria permanecem como histórico do código anterior. `preparacao-postgresql.js` e a ficha em `tracks.js` foram editados, preservando `setup-postgresql`, os índices dos quatro exercícios, as três perguntas e as chaves de progresso/anotação.

- **Percurso principal:** após `db-docker-compose`, abrir `dados-local` no VS Code, confirmar `db healthy`, iniciar o `psql` que já está no container e consultar banco/usuário. A instalação de `psql` externo e o teste da porta 55432 agora são opcionais; pgAdmin não é cobrado.
- **Interface:** `prerequisiteLessons` oferece atalhos para Docker e Compose. Cinco cartões `example.steps` agrupam ação, contexto, código e confirmação; `requirementChange` pede registrar a origem da consulta preservando `estudos`/`aluno`.
- **Exercícios:** o de alteração usa `-d` e não pressupõe cliente gráfico. A investigação de senha reserva `\conninfo` para uma sessão que de fato conectou. O relatório `.md` é criado na pasta `dados-local` já aberta.
- **Verificações:** `node scripts/validate-content.js` passou; o leitor em Chromium local com Clerk/Supabase fictícios, Tailwind público em cache e fontes remotas bloqueadas mostrou 2 atalhos, 5 passos, 4 exercícios e nenhum transbordamento medido a 375/768/1280 px. O E2E existente de progresso/leitura também passou. PostgreSQL/Compose reais, macOS/Linux, teclado completo, zoom 200%, Preview e aluno real **não foram executados nesta revisão**.
- **Decisão:** implementado e validado estruturalmente/visualmente no escopo local. A execução real da conexão e a autonomia do aluno continuam pendentes; não classificar como comprovada com banco real.
- **Commit/push/deploy:** não realizados nesta implementação.

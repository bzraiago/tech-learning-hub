# Checklist manual de regressão

Use este checklist depois das verificações automatizadas e antes de publicar alterações funcionais ou de conteúdo. Registre no commit ou pull request os itens executados e qualquer limitação.

## Preparação

- [ ] Executar `node scripts/validate-content.js` sem erros.
- [ ] Abrir a aplicação em navegador moderno com acesso à internet.
- [ ] Abrir as ferramentas de desenvolvimento e confirmar ausência de erros no console.
- [ ] Usar dados de teste fictícios; não apagar progresso real sem autorização.

## Carregamento e navegação

- [ ] A página inicial mostra 9 trilhas e 132 aulas no total.
- [ ] A trilha ativa, os módulos e os cards de progresso aparecem corretamente.
- [ ] Busca encontra uma aula de outra trilha e permite limpar o resultado.
- [ ] Filtros “Todas”, “Pendentes” e “Concluídas” atualizam a listagem.
- [ ] “Começar/Continuar minha jornada” abre a aula esperada.
- [ ] Uma aula de cada trilha alterada abre sem conteúdo ausente.
- [ ] As aulas `delivery-web-foundations`, `delivery-dns`, `delivery-dns-resolution`, `delivery-https`, `delivery-hosting-models`, `delivery-static-deploy` e `delivery-custom-domain` mostram exemplos, termos contextuais e os quatro tipos de exercício.
- [ ] Nas aulas de DNS, a pessoa distingue A, AAAA, CNAME, TXT e NS; explica zona, delegação, resolvedor, autoridade e TTL sem prometer propagação instantânea.
- [ ] Na aula de domínio personalizado, a pessoa preserva registros MX/TXT no plano de migração, usa valores como marcadores conceituais e separa DNS, TLS e funcionamento da aplicação; não executa mudança real.
- [ ] Na aula `delivery-oauth-google`, a pessoa diferencia OAuth 2.0 de OIDC, callback Google→Clerk de retorno Clerk→Preview, consentimento e escopos mínimos (`openid`, `profile`, `email` conforme uso), `state`/`nonce` e autenticação de autorização/RLS; nenhum domínio próprio ou segredo é exigido.
- [ ] Na aula `delivery-clerk-supabase`, a pessoa liga o token Clerk ao claim `sub`, distingue `USING`, `WITH CHECK`, grants e roles, e identifica a diferença entre chave publicável e credencial que contorna RLS.
- [ ] Na aula `delivery-threat-model`, a pessoa desenha escopo e fronteiras, liga ameaças a ativos, controles e evidências, marca hipóteses não verificadas e entende que OWASP Top 10 não certifica o sistema.
- [ ] Na aula `delivery-owasp-top10`, a pessoa distingue autenticação de autorização e BOLA/IDOR; os seis testes de `labs/security-basics` passam localmente e não são apresentados como prova de segurança remota ou cobertura completa do OWASP Top 10.
- [ ] Na aula `delivery-xss-output`, a cópia executável fica fora do repositório/Preview, `innerHTML` demonstra apenas a alteração do aviso local e `textContent` deixa o marcador literal; a pessoa navega pelos controles com teclado.
- [ ] Na aula `delivery-csrf`, a pessoa diferencia cookie ambient de Bearer explícito, CORS de autorização/CSRF, e registra que a leitura de `cloud.js` não prova a configuração remota nem imunidade geral.
- [ ] `labs/security-csrf/server.test.cjs` passa 7/7 localmente; a rota vulnerável e a protegida usam somente sessão/token fictícios, recusas preservam estado e o relatório diz que o teste não simula browser ou serviço remoto.
- [ ] Na aula `delivery-api-abuse`, a pessoa diferencia API4 de API6, limite por requisição de quota acumulada, autorização de rate limiting e reconhece 413/429; os exemplos não geram carga nem alegam que os laboratórios existentes implementam rate limiter.
- [ ] Na aula `delivery-supply-chain`, a pessoa diferencia dependências diretas/transitivas, runtime/dev, manifesto/lockfile, explica limites de `npm ci`/`npm audit` e marca auditoria atual como não executada; nenhum pacote é instalado/atualizado na atividade.
- [ ] `labs/redis-fundamentals` só publica Redis em loopback, não persiste dados e usa fonte fictícia; `check-cache-aside.cjs` confirma miss/hit/TTL/invalidação e `check-rate-limit.cjs` confirma limite/contador independente, sem alegar integração HTTP ou desempenho de produção.
- [ ] O plano de autorização para `learning_state` concede apenas SELECT/INSERT/UPDATE às próprias linhas; os testes de isolamento por duas contas ficam identificados como planejados até haver evidência real.
- [ ] Na aula HTTPS, o checklist verifica certificado, redirecionamento e recursos ativos sem afirmar que TLS substitui autorização da aplicação.
- [ ] O laboratório `labs/deployment-static` abre localmente, tem layout para 375 px e permite usar o link para pular o conteúdo com teclado. A conferência do Preview usa o caminho `/labs/deployment-static/`; domínio próprio e acesso anônimo não são requisitos.

## Aula, quiz e anotações

- [ ] Abas Conceitos, Exemplo, Prática, Revisão e Fontes funcionam.
- [ ] Na aba Prática, cada aula mostra previsão guiada, alteração com pistas, construção para um caso novo, investigação de erro segura e desafio de mudança de requisito, nessa ordem.
- [ ] Em uma aula de cada trilha alterada, os critérios específicos da atividade aparecem junto dos critérios próprios do exercício e antes da solução recolhida.
- [ ] Na aba Revisão, instruções de diagnóstico pedem mensagem ou comportamento observado, passo causador e resultado esperado antes de aplicar correção; erros comuns permanecem legíveis por teclado e em 375 px.
- [ ] O desafio de mudança de requisito mostra critérios observáveis, não revela uma solução pronta e permite registrar comportamento antigo/novo e evidências.
- [ ] A anotação da mudança de requisito continua salva após confirmação na nuvem, recarga e login na mesma conta.
- [ ] O desafio final pode ser alcançado, lido e preenchido só com teclado; em 375 px o campo não causa corte nem rolagem horizontal.
- [ ] Em uma aula de cada trilha, o objetivo observável aparece antes de pré-requisitos, ambiente e conceitos; a sequência das abas segue conceitos, exemplo, prática, revisão e fontes.
- [ ] Em `prep-tools`, cada exercício mostra resultado esperado e critérios antes do rascunho; dicas e solução continuam recolhidas.
- [ ] Em `prep-files`, os quatro critérios aparecem antes da dica e a tarefa de investigar erro não antecipa as duas hipóteses.
- [ ] Em `prep-workspace`, os quatro critérios verificam contexto de pasta, navegação, registro da sessão real e diagnóstico sem antecipar a solução.
- [ ] Em `prep-cycle`, a previsão ocorre antes da execução e o resultado esperado não antecipa a saída literal; a investigação exige uma ação e um sinal de encerramento.
- [ ] Em `prep-errors`, a prova registra evidências realmente observadas e a tarefa de relato distingue fatos de hipóteses.
- [ ] Nas aulas `setup-editor`, `setup-python`, `setup-git` e `setup-node`, os quatro exercícios mostram critérios; previsão e diagnóstico não antecipam respostas ou versões.
- [ ] Em `setup-docker`, os quatro critérios distinguem cliente, Engine e Compose, preservam a ordem dos pré-requisitos e não recomendam permissões sem avaliar seu impacto.
- [ ] Em `setup-docker-alternative`, os critérios aparecem antes das dicas; a previsão não revela a contagem e o relatório distingue SQLite executado de Docker/PostgreSQL pendentes.
- [ ] Em `setup-postgresql`, os quatro exercícios mostram critérios antes das dicas; a previsão não lista as respostas e o diagnóstico preserva volume e senha.
- [ ] Em `setup-mariadb`, `setup-firebird` e `setup-mongodb`, os critérios correspondem aos diagnósticos de cada motor, não antecipam a solução e mantêm segredos fora dos relatórios.
- [ ] Em `db-mariadb`, os critérios dos quatro exercícios aparecem antes das dicas; a inspeção usa a definição real e os resultados esperados não revelam linhas ou valores finais.
- [ ] Em `db-firebird`, os critérios aparecem nos quatro exercícios; a ordenação precede o limite e os resultados esperados não antecipam nomes ou contagens.
- [ ] Em `db-mongo-crud`, previsão e contagens não aparecem antecipadas; a remoção confirma a ausência de x9 e a preservação de a1.
- [ ] Em `db-mongo-pipelines`, a previsão antecede a execução; agrupamento, projeção e rejeições mostram critérios sem antecipar valores finais.
- [ ] Em `db-nosql-models`, os critérios dos quatro exercícios aparecem antes das dicas e distinguem acesso, custo de atualização, crescimento e sincronização.
- [ ] Em `db-performance`, as previsões são registradas antes da consulta, os planos são observados sem impor um tipo de acesso e a paginação não revela IDs finais.
- [ ] Em `db-security`, os quatro critérios aparecem antes das dicas; busca, contagem e alteração preservam o escopo do usuário, sem expor os valores finais nos resultados esperados.
- [ ] Em `db-recovery`, os critérios verificam a cópia restaurada, comparam a perda ao RPO e preservam a origem durante o ensaio da migração.
- [ ] Em `db-project`, os critérios distinguem progresso de Ana e Beto, mantêm matrículas vazias no relatório e rejeitam a relação inválida no esquema reforçado.
- [ ] Em `db-modeling`, os quatro critérios distinguem entidades, matrículas e progresso; os resultados esperados não antecipam contagens ou linhas literais.
- [ ] Em `db-normalization`, os quatro critérios distinguem dependências, observação por matrícula, integridade das associações e ausência de data.
- [ ] Em `db-ddl-constraints`, cada recusa é testada isoladamente; a consulta confirma o estado posterior e a verificação de FK vale para a conexão atual.
- [ ] Em `db-ddl-crud`, cada exercício parte dos dados do exemplo; remoção e atualização atingem apenas o id selecionado e preservam as demais lições.
- [ ] Em `db-select`, os critérios exigem previsão, limites corretos, ordenação estável e distinção entre `NULL` e texto vazio, sem antecipar as linhas retornadas.
- [ ] Em `db-aggregation`, os quatro critérios separam linhas filtradas de grupos filtrados e os resultados esperados não antecipam totais ou médias.
- [ ] Em `db-joins`, a previsão das linhas antecede a consulta; `LEFT JOIN` preserva trilhas vazias e a mudança de `WHERE` para `ON` é observada.
- [ ] Em `db-subqueries-ctes`, o resumo intermediário inclui trilhas vazias, a média usa todos os totais e medidas independentes não se multiplicam após a junção.
- [ ] Em `db-transactions`, o saldo provisório some após ROLLBACK; a transferência só confirma após dois UPDATE válidos e o destino inexistente não deixa débito persistido.
- [ ] Em `db-concurrency-boundaries`, SAVEPOINT preserva apenas a parte anterior; o envio externo tem resultado próprio e conflitos não repetem só metade da transferência.
- [ ] Em `db-docker-basics`, imagem, container e volume são diferenciados; cliente, Engine e Compose são verificados sem apagar dados para tratar erro de conexão.
- [ ] Em `db-docker-compose`, porta do host e porta interna são diferenciadas; o marcador persiste após down/up sem remover o volume.
- [ ] Em `db-docker-operations`, a restauração ocorre em banco novo, com consulta à origem e ao destino; mudança de senha não remove o volume.
- [ ] Em `db-postgres`, criar uma base nova no Compose, verificar banco e usuário, executar os quatro exercícios e confirmar a transação após reconectar.
- [ ] Em `db-sqlite`, executar o arquivo Python, verificar parâmetros e reversão, e comparar a cópia em memória com a origem.
- [ ] Nos 52 exercícios HTML/CSS, critérios aparecem antes das dicas; resultados de previsão e investigação não antecipam a conclusão; requisitos de layout, semântica e teclado são conferíveis.
- [ ] Nos 56 exercícios JavaScript, critérios aparecem antes das dicas; previsão e diagnóstico ficam registrados antes da execução e os resultados distinguem valor retornado de saída no Console.
- [ ] Nos 48 exercícios Python, critérios aparecem antes das dicas; previsões, exceções, isolamento de arquivos e testes usam evidências verificáveis.
- [ ] Nos 73 exercícios de IA, critérios separam estrutura, evidência, autorização e execução real; previsões e métricas ficam registradas antes de conferir resultados.
- [ ] Nos 24 exercícios Git, critérios verificam estado do índice, histórico, branch e remoto; a sequência segura evita perder alterações ou forçar atualização compartilhada.
- [ ] Nos 24 exercícios de Qualidade, critérios cobrem limites, estado da interface, falhas locais/CI, regressão, módulos e revisão sem afirmar resultados não observados.
- [ ] Nos 65 exercícios de Entrega, critérios verificam contratos HTTP, estados de formulário, autorização, resolução DNS, HTTPS, Preview, domínio conceitual, OAuth/OIDC, RLS, threat modeling e recuperação.
- [ ] Em `labs/backend-validation`, formulário válido cria um estudo; pedidos diretos inválidos retornam erro e não alteram a lista.
- [x] Em `labs/backend-layers`, `npm test` aprova os dezessete testes sem depender do PostgreSQL.
- [ ] Em `labs/backend-layers`, a base isolada `backend_camadas` na porta `55433` fica healthy, e as migrations criam estudos, sessões e suas restrições.
- [x] Em uma instância PostgreSQL 18 descartável na porta `55433`, `npm run migrate` aplicou as migrations 001–002 uma vez e a repetição as ignorou; a migration 003 de exercício também foi validada em cópia temporária.
- [x] Em `labs/backend-layers`, `npm run test:db` com `RUN_PG_INTEGRATION=1` confirmou leitura após reconectar, sessão persistida, rollback e unicidade em PostgreSQL real.
- [x] Em `labs/backend-layers`, API retorna 201 ao criar estudo/sessão, 400 para minutos inválidos, 409 para título repetido e preserva a persistência após reiniciar Node.
- [x] Em `labs/backend-layers`, `npm run demo:rollback` comprova que a falha da sessão desfaz o estudo criado dentro da transação.
- [x] Em `labs/backend-layers`, PostgreSQL indisponível retornou `500` genérico sem vazar detalhes; `npm.cmd run start:memory` anunciou `memória (temporário)` e a API retornou `200` com dois registros fictícios.
- [x] Em `labs/bug-investigation`, o teste de preservação da lista reproduz a falha inicial; a suíte passa após corrigir a função numa cópia de verificação.
- [x] Em `labs/backend-layers`, `npm run test:e2e` abre Chromium headless, cria um estudo pela interface, confirma `201`, rejeita duplicidade com `409` e encerra a API em memória.
- [x] Em GitHub Actions, run `40605904963` passou na validação de conteúdo, testes unitários, migrations, integração PostgreSQL 17 e fluxo Playwright.
- [x] Numa branch temporária, observar a falha controlada no run [40606364491](https://github.com/bzraiago/tech-learning-hub/actions/runs/40606364491), corrigir a expectativa e confirmar o run verde [40606768881](https://github.com/bzraiago/tech-learning-hub/actions/runs/40606768881); `main` permaneceu intacta.
- [x] `labs/backend-layers`: `npm run smoke:open-meteo` consulta serviço real sem chave e confere campos; testes automatizados simulam rede, timeout, `401` e JSON inválido sem enviar credenciais.
- [x] Interface do laboratório identifica e vincula Open-Meteo como fonte dos dados meteorológicos.
- [ ] Demonstração Vercel: verificar página e JSON público sem sessão Vercel; o alias conhecido `git-main` ainda apresenta “Login – Vercel”.
- [x] `labs/backend-layers/DEPLOY_VERCEL.md` ensina o Instant Rollback atual, seus efeitos em domínios e a distinção entre implantação e banco de dados.
- [ ] Na Vercel, executar rollback e retorno à implantação corrigida; confirmar a URL pública sem sessão Vercel.
- [x] `labs/backend-layers/BACKUP_RESTORE.md` documenta `pg_dump -Fc`, inspeção e restauração em base separada; `.dump` fica fora do Git.
- [ ] Executar backup e restore no Docker Compose e comparar estudos e sessões da origem com a cópia.
- [ ] Navegação das abas funciona com setas, Home e End.
- [ ] Exemplos de código permanecem legíveis e roláveis.
- [ ] Quiz exige resposta, calcula o resultado e mostra feedback.
- [ ] Acertar o quiz altera apenas a contagem de conceitos; prática e problema novo continuam separados até seus próprios registros.
- [ ] A seção "O que demonstrar em cada nível" apresenta as cinco provas, é legível em celular e não libera níveis por conclusão de aula ou quiz.
- [ ] O projeto de fechamento de Git aparece em Fluxo de trabalho em equipe; as cinco abas abrem, a entrega vazia é recusada e o registro permanece identificado como autoavaliação.
- [ ] O projeto de Qualidade aparece em Manutenção de projetos e revisão; a função final passa nos testes isolados e o roteiro vermelho→verde continua identificado como verificação local.
- [ ] O projeto de Integração aparece em Publicação e trabalho em projeto; os testes isolados cobrem sucesso, vazio, falhas e 401, e o plano de publicação não é apresentado como deploy executado.
- [ ] A prova básica abre pela visão geral e junto ao projeto de Integração, sem ocultá-lo; registrar entrega vazia é recusado e nenhuma marcação libera um nível automaticamente.
- [ ] Após uma resposta incorreta, o feedback indica a aula de revisão; o botão abre os conceitos e a orientação persiste após recarregar.
- [ ] Nas aulas de preparação digital, um erro no quiz oferece uma tarefa diferente, com critério e pista; o rascunho permanece após recarregar.
- [ ] Nas aulas de Ambientes essenciais, a segunda tentativa orienta diagnóstico ou retomada sem inventar saídas nem expor credenciais.
- [ ] Anotação é salva após aguardar e continua presente após recarregar.
- [ ] Fechar o diálogo devolve o foco ao controle que o abriu.

## Progresso e persistência

- [ ] Sem login, só a tela de entrada é exibida; o curso e a navegação não recebem foco.
- [ ] Ao atualizar uma sessão autenticada, aparece apenas a tela de carregamento; o convite de login não pisca antes de abrir o curso.
- [ ] Na tela de entrada, Entrar e Criar conta abrem os fluxos correspondentes do Clerk por mouse e teclado, inclusive em largura de celular.
- [ ] Após o login, o conteúdo é liberado somente depois da leitura do progresso da conta.
- [ ] Ao sair, o conteúdo volta a ficar bloqueado e o progresso da conta deixa a tela.
- [ ] Marcar uma aula atualiza módulo, trilha e progresso total.
- [ ] Desmarcar a aula reverte as contagens.
- [ ] Recarregar mantém conclusão, quiz, notas, projetos e evidências.
- [ ] Registrar prática agenda a aula para três dias depois; desfazer remove a aula da fila.
- [ ] Ao chegar o dia, a revisão pede nova tentativa completa do quiz antes de permitir o registro.
- [ ] Depois de uma resposta errada, a segunda tentativa traz cenário diferente, critério, pista e rascunho salvável em uma aula de cada trilha alterada.
- [ ] Na primeira aula de um módulo posterior, a revisão acumulativa recupera um fundamento do módulo anterior, salva o rascunho e abre a aula de origem.
- [ ] Após salvar em uma aba, recarregar outra aba da mesma conta mostra o estado remoto atualizado.
- [ ] Trocar de conta carrega somente o progresso da nova conta, sem envio manual nem download de arquivo.
- [ ] Com `localStorage` bloqueado, login, leitura e salvamento automático no Supabase continuam funcionando.

## Projetos

- [ ] Projeto da trilha alterada abre todas as etapas.
- [ ] Código colado permanece limitado e é escapado na interface.
- [ ] Prévia HTML continua isolada e sem acesso à rede.
- [ ] Testes JavaScript continuam isolados e encerram em caso de loop ou demora.
- [ ] Checks automáticos e manuais atualizam o status da entrega.
- [ ] Uma nova entrega exige explicação das decisões e da verificação; o texto persiste ao trocar de aba e recarregar.
- [ ] Uma entrega antiga sem explicação permanece registrada e indica a pendência antes de novo registro.

## Acessibilidade e responsividade

- [ ] O link “Pular para as lições” aparece ao receber foco e funciona.
- [ ] Toda a navegação principal é possível somente com teclado.
- [ ] O foco é sempre visível e segue uma ordem compreensível.
- [ ] Botões, abas e filtros anunciam estado e nome acessível coerentes.
- [ ] Em aproximadamente 375 px não há corte de conteúdo nem rolagem horizontal da página.
- [ ] Em desktop, a barra lateral e o conteúdo não se sobrepõem.
- [ ] Com movimento reduzido ativo, animações e transições são removidas.
- [ ] Contraste e leitura permanecem adequados no tema escuro.

## Encerramento

- [ ] Capturar ou descrever o resultado das verificações executadas.
- [ ] Informar explicitamente o que não foi testado.
- [ ] Atualizar `ROADMAP.md` e o backlog equivalente do `AGENTS.md`.
- [ ] Se as contagens mudaram intencionalmente, atualizar `scripts/content-baseline.json`, a meta description e a documentação.

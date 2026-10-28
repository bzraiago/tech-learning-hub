# Plano mínimo para migrar de fornecedor

## Objetivo e limites

Este roteiro transforma um backup PostgreSQL em um plano de saída ensaiável: inventariar o que pertence a cada serviço, restaurar primeiro num destino separado, conferir comportamento e só então planejar a troca. O exercício usa somente as bases locais do laboratório e dados fictícios. Não conecte a prática ao Supabase do curso, à Clerk ou a uma base real.

O ensaio automatizado de [`BACKUP_RESTORE.md`](BACKUP_RESTORE.md) comprova a exportação de uma base PostgreSQL e a restauração numa segunda base local. Ele não migra uma aplicação entre fornecedores, não exporta identidades Clerk, configurações/segredos, arquivos, Redis ou DNS e não prova compatibilidade de RLS no destino. Uma migração real requer inventário, janela, validação e responsável próprios.

## Pré-requisitos

- Ler [`BACKUP_RESTORE.md`](BACKUP_RESTORE.md) e entender que a origem não deve ser sobrescrita.
- Conhecer o fluxo local de `labs/backend-layers`: HTTP → regra → PostgreSQL; Redis guarda cache e contador de rate limit.
- Saber distinguir o PostgreSQL local do Supabase gerenciado usado pelo curso.
- Para executar o ensaio local, iniciar Docker e seguir os passos de preparação do README. Para preencher apenas a matriz, não é necessária conta nem instalação nova.

## 1. Inventariar o que realmente precisa mudar

Preencha uma cópia desta matriz com dados fictícios. Registre a data e marque como **confirmado**, **pendente** ou **fora do escopo**; não transforme suposição em evidência.

| Componente | O que inventariar | Como validar no destino |
|---|---|---|
| PostgreSQL | tabelas, migrations, extensões, constraints, índices, triggers, funções, RLS, roles/grants e versão | restaurar em base vazia, comparar contagens/regras e executar testes de integração e autorização |
| Identidade | provedor, IDs usados como chave estrangeira, contas sociais, MFA, hashes de senha, sessões e tokens | planejar exportação/importação própria, mapear IDs e testar login/recuperação com contas fictícias |
| Cache e rate limit | chaves Redis, prefixos, TTL, contadores e uso de sessões | trate cache como descartável e recrie; decida explicitamente se algum estado precisa de migração |
| Arquivos e integrações | objetos, buckets, webhooks, filas, domínios e callbacks | exportar/recriar conforme documentação de cada serviço e conferir caminhos e permissões |
| Aplicação e operação | variáveis por ambiente, conexões, monitoramento, backups e pipeline | configurar segredos fora do Git, executar smoke test, readiness, alertas e restauração |

O `pg_dump` cobre uma base por arquivo. Roles e tablespaces são globais ao cluster; o dump comum não os transfere. A restauração cria objetos com o usuário escolhido e grants/configuração do destino precisam ser revistos separadamente. Confira também extensões e objetos específicos do fornecedor antes de assumir compatibilidade.

O PostgreSQL usa arquivos custom `-Fc` com `pg_restore`. A listagem e a restauração do ensaio local estão em [`BACKUP_RESTORE.md`](BACKUP_RESTORE.md). Para um serviço Supabase, siga o procedimento atual de backup/restauração do próprio provedor: schemas gerenciados como `auth` e `storage`, migrações, roles e chave de criptografia podem exigir etapas próprias.

## 2. Ensaiar sem substituir a origem

1. Crie um destino isolado e vazio, local ou num projeto de teste descartável. Nunca aponte a variável de conexão da origem para o destino durante a preparação.
2. Registre a versão PostgreSQL, as extensões disponíveis e os parâmetros que podem afetar schema, collations, conexões ou funções. Aplique as migrations versionadas numa cópia; não edite migration que já foi executada.
3. Pare gravações da API de teste e execute a verificação automatizada:

   ```powershell
   # Windows PowerShell, em labs/backend-layers
   npm.cmd run test:backup-restore
   ```

   ```sh
   # macOS ou Linux, em labs/backend-layers
   npm run test:backup-restore
   ```

   O script deve criar o dump, restaurar numa base temporária, comparar hashes e contagens de `estudos` e `sessoes_estudo` e preservar a origem.
4. O script automatizado remove a base temporária ao terminar. Para exercitar o repositório PostgreSQL numa restauração manual nomeada, use a seção 3 de [`BACKUP_RESTORE.md`](BACKUP_RESTORE.md), pare a API e rode, ainda em `labs/backend-layers`:

   ```powershell
   # Windows PowerShell; .env já contém a conexão local do laboratório
   $env:PGDATABASE = 'backend_camadas_restaurada'
   $env:RUN_PG_INTEGRATION = '1'
   npm.cmd run test:db
   Remove-Item Env:PGDATABASE, Env:RUN_PG_INTEGRATION
   ```

   ```sh
   # macOS ou Linux
   PGDATABASE=backend_camadas_restaurada RUN_PG_INTEGRATION=1 npm run test:db
   ```

   O valor de `PGDATABASE` definido no processo substitui o valor do `.env` para o Node.js; o arquivo da origem não é editado. O teste grava e remove somente registros fictícios no destino. A suíte verifica persistência, transação e restrições do repositório, não uma migração remota completa.
5. Compare constraints, índices, chaves estrangeiras, valores de sequência, leitura/escrita da aplicação e autorização pertinente — não apenas se o arquivo `.dump` existe. Para um smoke test HTTP, siga o fluxo no README com uma instância apontada para a base restaurada e confirme que a origem continua sem a nova linha. Registre evidência e duração de exportação, cópia, restauração e conferência. Uma restauração concluída sem erro não comprova que grants ou autorização por linha funcionem.

**Resultado esperado da verificação automatizada:** dump legível, `estudos` e `sessoes_estudo` restauradas com hashes iguais e origem preservada. **Resultado adicional da prática manual:** a API isolada lê e grava na base nomeada de destino, enquanto a origem continua sem a nova linha. O script automatizado, por si só, não comprova este segundo resultado. Não apague a base de origem para demonstrar sucesso.

## 3. Planejar o corte e o retorno

Use esta sequência antes de trocar uma conexão real:

1. Escolha uma janela e uma pessoa responsável. Anuncie se haverá modo de manutenção/leitura; não prometa indisponibilidade zero sem uma estratégia de replicação ensaiada.
2. Faça um backup verificado e mantenha a origem disponível. Se a aplicação continuar aceitando escritas depois da cópia final, escreva como elas serão reconciliadas antes de qualquer retorno.
3. Faça a cópia final para o destino, confira contagens, regras e fluxo de ponta a ponta e atualize a configuração secreta do ambiente para o destino aprovado. Não grave strings de conexão no código, em log ou neste documento.
4. Rode smoke tests de leitura, escrita, validação, autorização, health/readiness, alertas e restauração. Observe erros e latência no período definido pela equipe.
5. Se uma verificação falhar, volte a apontar a aplicação para a origem preservada somente após avaliar escritas que ocorreram no destino. Não aceite duas fontes de escrita sem um plano explícito de reconciliação.
6. Só retire a origem quando o responsável confirmar os critérios, a retenção exigida e a existência de backup restaurável. Registre a decisão e o prazo de revisão.

**Critérios para autorizar o corte:** versão e extensões compatíveis; dump legível; restauração repetível; dados e constraints comparados; autenticação e autorização testadas; serviços externos reconfigurados; alarmes/readiness verificados; plano de retorno considera dados escritos depois do corte.

## 4. Tratar identidade fora do dump do banco

Autenticação é uma migração separada do PostgreSQL. A exportação de usuários de um provedor pode conter hashes, mas o destino precisa aceitar o algoritmo e o esquema exportados; limites de API, IDs, contas sociais, MFA, sessões ativas, consentimentos e processo de redefinição precisam ser avaliados. Um hash não é uma senha em texto claro e não garante que outro fornecedor consiga validá-lo.

Na aplicação do curso, Clerk fornece o ID que é guardado em `public.learning_state.user_id` no Supabase; um dump da base não transfere a instância Clerk nem sessões. O destino de autenticação pode atribuir outros IDs. Planeje um mapeamento explícito entre identificador antigo e novo, preserve as relações dos registros e prove o isolamento de duas contas antes de liberar dados. Consulte a documentação atual do provedor de origem e do destino; não exporte usuários reais para esta prática.

## 5. Exercício e critérios de aceite

Preencha a matriz com a arquitetura do laboratório e proponha um destino PostgreSQL hipotético. Inclua três riscos, uma evidência por risco, um ponto de corte, o sinal que faria abortar e o plano de retorno. Para identidade, cache e arquivos, escreva se serão exportados, recriados ou excluídos do escopo e por quê.

O exercício está concluído quando:

- o dump é restaurado numa base separada, e a origem permanece intacta;
- dados, constraints e comportamento da API são comparados;
- roles, grants, extensões, IDs de identidade, cache, arquivos e configuração estão inventariados como migrados, recriados ou fora do escopo;
- existe uma condição objetiva para prosseguir ou abortar e um plano de retorno que considera gravações feitas após o corte;
- as limitações do ensaio local não são descritas como prova de migração remota.

## Problemas comuns

| Sinal | O que verificar |
|---|---|
| O destino não aceita um objeto do dump | Compare a versão PostgreSQL, extensões e objetos específicos do fornecedor; não remova comandos aleatórios até o restore “passar”. |
| O banco restaurou, mas a API recebe `permission denied` | Recrie e confira roles/grants no destino; um backup por banco não configura as credenciais do provedor. |
| A tabela contém dados, mas usuários não acessam as próprias linhas | Revise mapeamento de IDs, claims, grants e RLS; conte registros não prova autorização correta. |
| Redis inicia vazio depois do corte | Recrie cache e contadores conforme decisão; cache não é backup da fonte durável. |
| A cópia final diverge após a restauração | Pare escritas de teste, descubra quando a origem mudou e gere uma cópia nova para outra base; não sobrescreva a origem. |

## Parar e retomar

Pare somente os serviços que iniciou para a prática. Mantenha o volume e a base de origem local até concluir a conferência. Para retomar, inicie o serviço, confira `npm run db:check`, migrations e o nome da base em cada conexão antes de repetir o backup. Não use `docker compose down -v` para limpar um ensaio com dados que ainda precisa comparar.

## Fontes oficiais

- [PostgreSQL 17 — `pg_dump`](https://www.postgresql.org/docs/17/app-pgdump.html): escopo de um dump, formatos e limitações.
- [PostgreSQL 17 — roles](https://www.postgresql.org/docs/17/database-roles.html): roles são globais ao cluster e exigem configuração de privilégios.
- [Supabase — backup e restauração com CLI](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore): restore lógico, migrações, roles e particularidades de schemas gerenciados.
- [Supabase — migrar dentro da plataforma](https://supabase.com/docs/guides/platform/migrating-within-supabase): opções para mover projetos e bancos entre projetos Supabase.
- [Clerk — migrar dados de usuário](https://clerk.com/docs/guides/development/migrating/overview): exportação, importação, hashes, IDs legados e sessões.
- [Node.js — `--env-file`](https://nodejs.org/api/cli.html#--env-filefile): variável já definida no ambiente prevalece sobre o arquivo.

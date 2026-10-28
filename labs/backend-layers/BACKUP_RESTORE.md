# Backup e restauração do PostgreSQL do laboratório

## Objetivo e limites

Ao final, você consegue criar um backup lógico de `backend_camadas`, conferir se o arquivo pode ser lido e restaurar os dados em outra base sem substituir a original.

Este ensaio usa somente a instância local do laboratório e dados fictícios. `pg_dump` exporta uma base por vez; o arquivo deste exercício não inclui outras bases, usuários ou configurações do servidor. Ele não substitui um plano de backup de produção, retenção externa ou recuperação ponto no tempo. Não use o Supabase real nem dados pessoais neste procedimento.

## Pré-requisitos

- Docker Desktop/Engine iniciado e disponível no terminal.
- Terminal aberto em `labs/backend-layers`.
- Arquivo `.env` local criado conforme o [README do laboratório](README.md), sem compartilhar seu conteúdo.
- Serviço `db` iniciado, migrations aplicadas e nenhuma alteração sendo feita durante a comparação.

Pare a API com `Ctrl+C` antes da cópia para evitar novas gravações enquanto compara a origem e a restauração. A base e o volume originais serão mantidos.

## 1. Conferir a origem

No terminal em `labs/backend-layers`, verifique que o serviço está pronto:

```sh
docker compose ps
```

Resultado esperado: o serviço `db` aparece como saudável (`healthy`). Se ainda estiver inicializando, espere alguns segundos e confira novamente. A saída não deve conter o valor do `.env`.

Confira também a conexão e as migrations:

```powershell
# Windows PowerShell
npm.cmd run db:check
npm.cmd run migrate
```

```sh
# macOS ou Linux
npm run db:check
npm run migrate
```

Resultado esperado: `Conexão OK` e as migrations `001` e `002` aparecem como aplicadas ou já aplicadas. Em uma base recém-criada, `estudos` contém `HTML` e `JavaScript`, e `sessoes_estudo` começa vazia.

## 2. Criar e conferir o backup

Crie uma pasta local para o arquivo. No Windows PowerShell:

```powershell
New-Item -ItemType Directory -Path .\backups -Force | Out-Null
Test-Path .\backups
```

Saída esperada do segundo comando: `True`.

No macOS ou Linux:

```sh
mkdir -p backups
test -d backups && echo "Pasta backups pronta"
```

Saída esperada: `Pasta backups pronta`.

Execute `pg_dump` dentro do serviço PostgreSQL. O formato custom (`-Fc`) é um arquivo de arquivo binário para `pg_restore`; a saída vai primeiro para uma pasta temporária do container, sem passar por redirecionamento de texto do PowerShell:

```sh
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc -f /tmp/backend_camadas.dump'
docker compose cp db:/tmp/backend_camadas.dump ./backups/backend_camadas.dump
```

Confira o tamanho do arquivo. No Windows PowerShell:

```powershell
Get-Item .\backups\backend_camadas.dump | Select-Object Name, Length
```

No macOS ou Linux:

```sh
ls -lh ./backups/backend_camadas.dump
```

Resultado esperado: `backend_camadas.dump` existe e tem tamanho maior que zero. Confira o índice do backup antes de restaurar:

```sh
docker compose exec -T db pg_restore --list /tmp/backend_camadas.dump
```

Resultado esperado: a listagem inclui os objetos das tabelas `estudos` e `sessoes_estudo`. O arquivo `.dump` pode conter os dados completos da base; mantenha-o privado e não o envie ao Git.

## 3. Restaurar em outra base

Copie o arquivo do computador de volta para o container e crie uma base vazia separada. Não restaure sobre `backend_camadas`:

```sh
docker compose cp ./backups/backend_camadas.dump db:/tmp/backend_camadas.dump
docker compose exec -T db sh -c 'createdb -U "$POSTGRES_USER" --maintenance-db=postgres -T template0 backend_camadas_restaurada'
docker compose exec -T db sh -c 'pg_restore -U "$POSTGRES_USER" -d backend_camadas_restaurada --no-owner --exit-on-error /tmp/backend_camadas.dump'
```

Resultado esperado: os comandos terminam sem erro e `backend_camadas_restaurada` recebe o esquema e os dados do arquivo. `--no-owner` faz os objetos restaurados pertencerem ao usuário que executa o restore; `--exit-on-error` interrompe o comando se algum objeto não puder ser restaurado.

Se a mensagem disser que `backend_camadas_restaurada` já existe, não apague a base original nem use `--clean`. Escolha um nome novo, como `backend_camadas_restaurada2`, e substitua o nome do destino nos comandos seguintes.

## 4. Conferir a restauração

Compare as linhas da origem com as do destino:

```sh
docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT id, titulo FROM estudos ORDER BY id;"'
docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d backend_camadas_restaurada -c "SELECT id, titulo FROM estudos ORDER BY id;"'
docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT id, estudo_id, minutos FROM sessoes_estudo ORDER BY id;"'
docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d backend_camadas_restaurada -c "SELECT id, estudo_id, minutos FROM sessoes_estudo ORDER BY id;"'
```

Resultado esperado: cada consulta da origem corresponde linha por linha à consulta equivalente da base restaurada. Em uma base recém-criada e sem sessões, a consulta de estudos mostra `HTML` e `JavaScript`, e a consulta de sessões não mostra linhas. Se você alterou os dados, os valores podem variar, mas origem e destino devem continuar iguais.

## Problemas comuns

| Sinal observado | O que conferir |
|---|---|
| O serviço `db` não está iniciado | Execute `docker compose up -d db`, espere o healthcheck ficar `healthy` e confira `docker compose ps`. |
| A pasta ou o arquivo do backup não foi encontrado | Confirme que o terminal continua em `labs/backend-layers` e que a etapa de cópia do container terminou sem erro. |
| `pg_restore` diz que o arquivo é texto simples ou inválido | Confira se o dump foi criado com `-Fc`, copiado com `docker compose cp` e aprovado por `pg_restore --list`. |
| O banco de destino já existe | Use um nome novo para a cópia de restauração; mantenha `backend_camadas` intacta. |
| As linhas não correspondem | Pare a API, gere outro backup após estabilizar a origem e repita a restauração em uma base vazia diferente. |

## Parar e retomar

Para parar apenas o container e preservar os dados do laboratório, use `docker compose stop db`. Para retomá-lo, use `docker compose start db` e aguarde o healthcheck. Não use `docker compose down -v` como forma de encerrar: `-v` remove o volume persistente e pode apagar a origem.

Se Docker não puder ser usado, revise o exercício de backup do SQLite na aula `db-recovery`. Isso ajuda a praticar os conceitos, mas não comprova backup ou restauração do PostgreSQL; volte a este roteiro quando o serviço estiver disponível.

## Fontes oficiais

- [PostgreSQL 17 — `pg_dump`](https://www.postgresql.org/docs/17/app-pgdump.html): formatos de exportação e arquivo custom.
- [PostgreSQL 17 — `pg_restore`](https://www.postgresql.org/docs/17/app-pgrestore.html): listar e restaurar arquivos custom em uma base nova.
- [PostgreSQL 17 — `createdb`](https://www.postgresql.org/docs/17/app-createdb.html): criar a base de destino usando `template0`.
- [Docker Compose — `exec`](https://docs.docker.com/reference/cli/docker/compose/exec/) e [`cp`](https://docs.docker.com/reference/cli/docker/compose/cp/): executar ferramentas no serviço e copiar o arquivo binário sem depender de cliente instalado no host.
- [Imagem oficial PostgreSQL](https://github.com/docker-library/docs/blob/master/postgres/README.md): autenticação local dentro do container; isso descreve o laboratório e não é uma recomendação para configurar `trust` em servidor de produção.

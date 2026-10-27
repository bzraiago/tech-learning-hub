# Laboratório: camadas de backend com PostgreSQL

## Objetivo

Conectar uma API Node.js ao PostgreSQL, aplicar uma migration reproduzível, persistir estudos entre reinicializações e responder com `409` quando duas criações disputarem o mesmo título. A aplicação usa uma interface assíncrona de repositório, uma regra de negócio e consultas parametrizadas.

Os registros `HTML` e `JavaScript` são fictícios. Este laboratório usa um banco Docker isolado chamado `backend_camadas`, uma porta própria `55433` e um volume próprio. Não conecte a API ao banco Supabase do Tech Learning Hub nem use dados pessoais.

## Pré-requisitos

1. Conclua `setup-node`, `setup-docker`, `setup-postgresql`, `delivery-http` e `labs/backend-validation/README.md`. Não é necessário concluir toda a trilha de banco.
2. Abra esta pasta `labs/backend-layers` no editor e no terminal.
3. Node.js `20.6.0` ou mais novo, npm e Docker Compose operacional. No terminal, confira `node --version`, `npm --version` e `docker version`.
4. O comando `docker version` deve mostrar as versões de cliente e servidor. Se a seção Server falhar, inicie Docker Desktop (Windows/macOS) ou o serviço Docker (Linux) antes de continuar.

## Preparar ambiente

### 1. Instalar a dependência deste laboratório

No terminal **aberto em `labs/backend-layers`**, execute:

```powershell
# Windows PowerShell
npm.cmd ci
```

```sh
# macOS ou Linux
npm ci
```

O `package.json` e o `package-lock.json` locais fixam `pg` na versão `8.23.1`. A pasta `node_modules` é local e ignorada pelo Git. O site estático do curso não carrega nem instala essa dependência.

Saída esperada: npm termina sem erro e instala as dependências do laboratório. No Windows, use `npm.cmd` se a política do PowerShell bloquear `npm.ps1`.

### 2. Criar a configuração local

Ainda em `labs/backend-layers`, copie o exemplo e abra `.env` no editor para substituir o texto de `PGPASSWORD` por uma senha local fictícia. O arquivo `.env` é ignorado pelo Git; não o envie nem cole sua senha em mensagens.

```powershell
# Windows PowerShell
Copy-Item .env.example .env
notepad .env
```

```sh
# macOS ou Linux
cp .env.example .env
# Abra .env no editor e troque o valor de PGPASSWORD.
```

O exemplo usa host `127.0.0.1`, porta `55433`, usuário `aluno` e banco `backend_camadas`. A porta dedicada evita conflitar com a instância principal de aulas, que usa `55432`.

### 3. Iniciar e conferir o banco

No mesmo terminal e pasta, valide a configuração sem imprimir os valores resolvidos e inicie o serviço:

```sh
docker compose config --quiet
docker compose up -d
docker compose ps
```

Saída esperada: serviço `db` em estado `healthy`, publicado em `127.0.0.1:55433->5432/tcp`. Na primeira execução, o Docker pode baixar a imagem PostgreSQL 17.

Agora confira a conexão Node → banco:

```powershell
# Windows PowerShell
npm.cmd run db:check
```

```sh
# macOS ou Linux
npm run db:check
```

Saída esperada: `Conexão OK: banco=backend_camadas; usuário=aluno; consulta=1`.

### 4. Aplicar a migration

Execute a migration a partir da pasta do laboratório:

```powershell
# Windows PowerShell
npm.cmd run migrate
```

```sh
# macOS ou Linux
npm run migrate
```

Saída esperada na primeira execução: `Migration aplicada: 001_create_estudos.sql` e `Migration aplicada: 002_create_sessoes_estudo.sql`. Execute o comando outra vez: deve informar `Migration já aplicada...` para os dois arquivos, sem repetir alterações. O aplicador percorre arquivos numerados em ordem, registra cada nome em `migrations_aplicadas` e usa uma transação por arquivo.

Confira os registros iniciais sem instalar um cliente PostgreSQL no computador:

```sh
docker compose exec -T db psql -U aluno -d backend_camadas -c "SELECT id, titulo FROM estudos ORDER BY id;"
```

Resultado esperado: as linhas `HTML` e `JavaScript`. Para verificar a configuração pelo próprio aplicativo, repita `npm run db:check` (`npm.cmd` no Windows).

## Executar a API e observar a persistência

1. No terminal em `labs/backend-layers`, execute `npm.cmd start` no Windows ou `npm start` em macOS/Linux. Saída esperada: `Abra http://127.0.0.1:4180 · armazenamento: PostgreSQL`.
2. Abra `http://127.0.0.1:4180`. A lista inicial tem `HTML` e `JavaScript`.
3. Cadastre `CSS`. A resposta HTTP é `201 Created` e a lista passa a ter três estudos.
4. Atualize a página. `CSS` continua na lista porque está no PostgreSQL, não na memória do processo.
5. Pare somente a API com `Ctrl+C` e inicie novamente com o mesmo comando. Consulte a lista: `CSS` ainda deve estar presente.
6. No Console do navegador, tente criar ` html `:

```js
const resposta = await fetch('/api/estudos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ titulo: ' html ' })
});
console.log(resposta.status, await resposta.json());
```

Resultado esperado: `409` e uma mensagem de título já existente. A lista permanece com três itens. A consulta de verificação usa parâmetros `$1` e `$2`; o título enviado não é concatenado no SQL.

Para ver o contrato por fora do formulário, o Console também pode executar `fetch('/api/estudos').then(async r => console.log(r.status, await r.json()))`. O `GET` responde `200` com JSON. Erros inesperados do banco viram `500` genérico; detalhes internos ficam apenas no terminal.

## Verificações automatizadas

Os testes unitários não precisam de Docker nem de conexão de rede:

```powershell
# Windows PowerShell
npm.cmd test
```

```sh
# macOS ou Linux
npm test
```

Saída esperada: dezessete testes aprovados, cobrindo ordem/idempotência/rollback de migrations, validação, corrida por título único, transação, consultas parametrizadas e resposta `500` sem detalhes internos.

Depois de iniciar o banco e aplicar as migrations, habilite o teste real de integração:

```powershell
# Windows PowerShell — nesta janela do terminal
$env:RUN_PG_INTEGRATION = '1'
npm.cmd run test:db
Remove-Item Env:RUN_PG_INTEGRATION
```

```sh
# macOS ou Linux
RUN_PG_INTEGRATION=1 npm run test:db
```

Saída esperada: um teste aprovado que confirma leitura após reconectar, sessão persistida, rollback quando a segunda gravação viola um `CHECK` e rejeição de título duplicado. O teste remove apenas os registros aleatórios que criou.

## Como parar e retomar

- Pare a API com `Ctrl+C`; o pool fecha junto com o servidor.
- Pare o banco sem apagar os dados: `docker compose down`.
- Para retomar, execute `docker compose up -d`, espere `healthy` em `docker compose ps` e rode `npm start` (`npm.cmd start` no Windows).
- **Não use `docker compose down -v`** neste laboratório: `-v` remove o volume e os dados persistidos.

## Problemas comuns

| Sintoma | O que conferir |
|---|---|
| `npm.ps1 cannot be loaded` no Windows | Use `npm.cmd` nos comandos do roteiro; não altere a política global do PowerShell para este laboratório. |
| Docker não alcança o servidor | Inicie Docker Desktop ou o serviço Docker e rode `docker version`; confira a seção Server. |
| Porta `55433` já está ocupada | Pare a aplicação que ocupa a porta ou ajuste `PGPORT` em `.env`; depois recrie o serviço com `docker compose up -d`. Use o mesmo valor em Node e Compose. |
| `ECONNREFUSED` | Confira `docker compose ps`, host `127.0.0.1`, porta `55433` e que a API está usando a pasta certa. |
| `password authentication failed` depois de trocar a senha | O volume já guarda a senha inicial do cluster. Reponha no `.env` a senha usada na primeira criação ou recupere o ambiente com o procedimento de `db-docker-operations`; não apague o volume para esconder o erro. |
| `relation "estudos" does not exist` | Confirme o banco com `npm run db:check` e aplique `npm run migrate`. |
| migration já aplicada | É o comportamento esperado ao repetir o comando. Para praticar a migration desde o início, use outro banco local descartável; não apague o volume que contém seus dados. |
| Título válido recebeu `409` | A comparação ignora espaços nas pontas e diferença entre maiúsculas/minúsculas; confira a lista pelo `GET`. |
| API retorna `500` | Leia o código de erro no terminal e confira conexão/migration; a resposta HTTP omite detalhes do banco. Nunca compartilhe `.env`. |

## Alternativa quando não for possível usar PostgreSQL

Para continuar estudando validação, regras e HTTP em um computador sem Docker/banco, no Windows execute `$env:BACKEND_STORAGE = 'memory'; npm.cmd run start:memory`; depois de parar com `Ctrl+C`, limpe a variável com `Remove-Item Env:BACKEND_STORAGE`. Em macOS/Linux execute `BACKEND_STORAGE=memory npm run start:memory`. A saída identifica `memória (temporário)`. Nesse modo os dados somem ao reiniciar o servidor; marque a integração PostgreSQL como pendente e volte a este roteiro quando o banco estiver disponível.

Se Docker não estiver disponível mas o computador já tiver PostgreSQL local, conclua `setup-postgresql`, crie uma base descartável `backend_camadas` e ajuste em `.env` `PGHOST`, `PGPORT`, `PGUSER`, `PGDATABASE` e `PGPASSWORD` para essa instalação antes de executar `npm run db:check` e `npm run migrate`.

## Como as camadas se conectam

| Parte | Responsabilidade | Arquivo |
|---|---|---|
| HTTP | Lê método, rota e JSON; escolhe status e resposta pública | `server.cjs` |
| Validação | Confere o formato do pedido e limpa o título | `src/validar-estudo.cjs` |
| Regra de negócio | Compara títulos sem considerar espaços externos e caixa | `src/regra-titulo.cjs` e `src/servico-estudos.cjs` |
| Repositório | Executa `SELECT`/`INSERT` com parâmetros e converte o resultado | `src/repositorio-estudos-postgres.cjs` |
| Pool | Reutiliza até cinco conexões e lê as variáveis `PG*` | `src/configuracao-banco.cjs` |
| Esquema | Cria estudos, sessões e suas restrições | `migrations/001_create_estudos.sql`, `migrations/002_create_sessoes_estudo.sql` |
| Aplicador | Executa migrations numeradas em ordem e registra cada arquivo uma vez | `scripts/aplicar-migration.cjs` |

O índice único é a última barreira contra duplicidade quando pedidos simultâneos passam pela consulta de busca. O serviço transforma somente essa violação conhecida em `409`; falhas de conexão continuam como erro de servidor. `migrations_aplicadas` registra qual arquivo foi aplicado, e a migration roda na mesma transação da marcação.

## Transação: estudo e primeira sessão

A rota `POST /api/estudos-com-sessao` grava o estudo e sua primeira sessão na mesma transação: `BEGIN` abre a unidade, dois `INSERT`s fazem as alterações, `COMMIT` confirma ambas. Se o segundo `INSERT` falhar, `ROLLBACK` desfaz também o primeiro.

No Console do navegador, envie uma sessão válida com um título novo:

```js
const resposta = await fetch('/api/estudos-com-sessao', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ titulo: 'Acessibilidade CSS', minutos: 25 })
});
console.log(resposta.status, await resposta.json());
```

Resultado esperado: `201`, um estudo e uma sessão com `minutos: 25`. Reenvie o mesmo título: `409` e nenhuma segunda sessão. Um pedido com minutos zero recebe `400` antes de iniciar a transação.

Para observar o rollback no PostgreSQL sem guardar dados de teste, execute `npm.cmd run demo:rollback` no Windows ou `npm run demo:rollback` em macOS/Linux. O roteiro tenta inserir um estudo e uma sessão inválida; o `CHECK` rejeita a sessão, `ROLLBACK` desfaz o estudo e a consulta final confirma que ele não existe. Saída esperada: `Rollback confirmado: a falha da sessão também desfez a criação do estudo.`

## Prática guiada: criar uma terceira migration

### Objetivo e pré-requisitos

Ao final, você consegue ampliar uma tabela sem alterar arquivos de migration que já foram aplicados. Conclua os passos anteriores até aplicar `001_create_estudos.sql` e `002_create_sessoes_estudo.sql`. Use somente a base descartável `backend_camadas`; não conecte esta prática ao Supabase nem a uma base com dados importantes.

### Preveja e confira o resultado esperado

Antes de editar, anote sua previsão: após a migration, `sessoes_estudo` terá uma coluna opcional chamada `observacao`, as migrations anteriores continuarão intactas e haverá três registros em `migrations_aplicadas`. Executar o aplicador de novo não deve criar uma quarta entrada.

Depois da execução, a consulta ao catálogo do PostgreSQL deve mostrar uma linha com `column_name = observacao` e `is_nullable = YES`. Se já houver sessões, a consulta delas deve mostrar `NULL` para a nova coluna; se ainda não houver sessões, a definição da coluna é suficiente para conferir esta prática.

### Faça a mudança

1. No editor, dentro da pasta `labs/backend-layers`, crie `migrations/003_add_observacao_sessoes.sql`. Não edite, renomeie nem apague os arquivos `001` e `002`.
2. Nesse arquivo, escreva uma instrução `ALTER TABLE` que adicione a `sessoes_estudo` a coluna `observacao`, do tipo `TEXT` e que aceite `NULL`. Dica: procure os comandos `ALTER TABLE` e `ADD COLUMN` na documentação SQL já consultada no curso; não é necessário adicionar um valor padrão.
3. Salve o arquivo. No terminal aberto em `labs/backend-layers`, execute `npm.cmd run migrate` no Windows ou `npm run migrate` em macOS/Linux.

Saída esperada na primeira execução: `Migration já aplicada` para `001` e `002`, e `Migration aplicada: 003_add_observacao_sessoes.sql`. Execute o comando uma segunda vez: os três nomes devem aparecer como já aplicados.

### Verifique no PostgreSQL

No caminho Docker, execute no terminal da pasta do laboratório:

```sh
docker compose exec -T db psql -U aluno -d backend_camadas -c "SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name = 'sessoes_estudo' AND column_name = 'observacao';"
docker compose exec -T db psql -U aluno -d backend_camadas -c "SELECT id FROM migrations_aplicadas ORDER BY id;"
```

Se estiver usando uma instalação local de PostgreSQL, execute as mesmas consultas com `psql -h 127.0.0.1 -p 55433 -U aluno -d backend_camadas -c "..."`, substituindo host, porta e usuário pelos valores configurados no `.env`.

Critérios de aceite: a primeira consulta mostra `observacao | YES`; a segunda lista exatamente as migrations `001`, `002` e `003`; a segunda execução de `npm run migrate` não reaplica nenhuma delas; os arquivos `001` e `002` continuam iguais. Se já houver sessões, confira também `SELECT id, observacao FROM sessoes_estudo ORDER BY id;` e explique por que os valores antigos são `NULL`.

### Erros comuns e retomada

- `relation "sessoes_estudo" does not exist`: confira o banco com `npm.cmd run db:check` e aplique primeiro as migrations iniciais.
- `column "observacao" already exists`: confira se `003_add_observacao_sessoes.sql` consta em `migrations_aplicadas`; não remova o registro nem altere uma migration já aplicada para esconder o erro.
- A migration aparece como já aplicada: este é o resultado correto ao repetir o comando. Para refazer a atividade do zero, use outra base descartável e aplique as migrations nela.

Para parar, use `Ctrl+C` na API e `docker compose down` no terminal. Para retomar, inicie o banco, confira `npm.cmd run db:check` e execute `npm.cmd run migrate`; o aplicador continua da próxima migration pendente. Não use `docker compose down -v` para reiniciar esta prática.

## Prática

Antes de cada pedido, preveja status, resposta e quantidade de estudos.

1. **Prever:** cadastre `CSS`, reinicie só a API e consulte novamente. Critério: o registro continua lá; explique por que o adaptador em memória teria outro resultado.
2. **Alterar:** troque no repositório o `ORDER BY id` por `ORDER BY titulo`. Critério: a resposta fica em ordem alfabética e as consultas seguem parametrizadas.
3. **Construir:** complete a prática guiada acima e explique como a nova coluna preserva as sessões já existentes. Critério: mantenha os arquivos anteriores intactos, aplique a nova uma vez e leia sessões antigas.
4. **Investigar erro:** execute `npm run demo:rollback` e acompanhe os `INSERT`s. Critério: a sessão inválida falha, a transação reverte e o estudo da tentativa não aparece numa busca posterior. Depois pare o banco e envie `GET /api/estudos`: a API responde `500` sem exibir endereço, usuário ou senha. Retome o banco e confira os dados válidos.

Em cada mudança, anote camada alterada, comando, status e estado dos dados antes/depois. O teste de integração comprova o repositório contra o PostgreSQL real; os testes sem `RUN_PG_INTEGRATION=1` usam doubles e não comprovam uma conexão real.

## Referências oficiais consultadas

- [Node.js: opção `--env-file`](https://nodejs.org/api/cli.html#--env-fileconfig) — carregar o `.env` local sem dependência adicional.
- [node-postgres: instalação e visão geral](https://node-postgres.com/) — pacote `pg` e compatibilidade.
- [node-postgres: conexão e variáveis de ambiente](https://node-postgres.com/features/connecting) — configuração do pool com `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` e `PGDATABASE`.
- [node-postgres: consultas parametrizadas](https://node-postgres.com/features/queries) — enviar valores separados do texto SQL.
- [node-postgres: pool de conexões](https://node-postgres.com/features/pooling) — reutilização e encerramento das conexões.

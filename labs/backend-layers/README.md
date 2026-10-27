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

Saída esperada na primeira execução: `Migration aplicada: 001_create_estudos.sql`. Execute o comando outra vez: deve informar `Migration já aplicada...` sem inserir novos registros. O aplicador registra a migration na tabela `migrations_aplicadas` e usa uma transação para não marcar como concluído um SQL que falhou.

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

Saída esperada: sete testes aprovados, cobrindo normalização, regra de título, concorrência na unicidade, consultas parametrizadas e resposta `500` sem detalhes internos.

Depois de iniciar o banco e aplicar a migration, habilite o teste real de integração:

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

Saída esperada: um teste aprovado que cria um título aleatório, encerra a primeira conexão, encontra o registro após reconectar e confirma que a restrição única do PostgreSQL rejeita duplicatas. O teste remove apenas o registro aleatório que criou.

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
| Esquema | Cria a tabela, as restrições e os dois registros fictícios | `migrations/001_create_estudos.sql` |
| Aplicador | Registra e aplica cada migration uma vez | `scripts/aplicar-migration.cjs` |

O índice único é a última barreira contra duplicidade quando pedidos simultâneos passam pela consulta de busca. O serviço transforma somente essa violação conhecida em `409`; falhas de conexão continuam como erro de servidor. `migrations_aplicadas` registra qual arquivo foi aplicado, e a migration roda na mesma transação da marcação.

## Prática

Antes de cada pedido, preveja status, resposta e quantidade de estudos.

1. **Prever:** cadastre `CSS`, reinicie só a API e consulte novamente. Critério: o registro continua lá; explique por que o adaptador em memória teria outro resultado.
2. **Alterar:** troque no repositório o `ORDER BY id` por `ORDER BY titulo`. Critério: a resposta fica em ordem alfabética e as consultas seguem parametrizadas.
3. **Construir:** estenda o aplicador para percorrer migrations SQL numeradas em ordem e crie uma segunda migration para adicionar um campo `descricao` opcional. Critério: o arquivo antigo permanece intacto, a migration nova só é aplicada uma vez e os registros anteriores continuam legíveis.
4. **Investigar erro:** pare o banco e envie `GET /api/estudos`. Critério: a API responde `500` sem exibir endereço, usuário ou senha; o terminal indica um código útil para diagnóstico. Retome o banco e confirme que os dados continuam presentes.

Em cada mudança, anote camada alterada, comando, status e estado dos dados antes/depois. O teste de integração comprova o repositório contra o PostgreSQL real; os testes sem `RUN_PG_INTEGRATION=1` usam doubles e não comprovam uma conexão real.

## Referências oficiais consultadas

- [Node.js: opção `--env-file`](https://nodejs.org/api/cli.html#--env-fileconfig) — carregar o `.env` local sem dependência adicional.
- [node-postgres: instalação e visão geral](https://node-postgres.com/) — pacote `pg` e compatibilidade.
- [node-postgres: conexão e variáveis de ambiente](https://node-postgres.com/features/connecting) — configuração do pool com `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` e `PGDATABASE`.
- [node-postgres: consultas parametrizadas](https://node-postgres.com/features/queries) — enviar valores separados do texto SQL.
- [node-postgres: pool de conexões](https://node-postgres.com/features/pooling) — reutilização e encerramento das conexões.

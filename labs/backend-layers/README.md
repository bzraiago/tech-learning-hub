# Laboratório: camadas de backend com PostgreSQL

## Objetivo

Conectar uma API Node.js ao PostgreSQL, aplicar uma migration reproduzível, persistir estudos entre reinicializações, usar Redis como cache-aside de leitura e limitar gravações HTTP com um contador atômico. A aplicação usa uma interface assíncrona de repositório, uma regra de negócio e consultas parametrizadas.

Os registros `HTML` e `JavaScript` são fictícios. Este laboratório usa um banco Docker isolado chamado `backend_camadas`, uma porta própria `55433` e um volume próprio. O Redis também é local, publicado somente em `127.0.0.1:56380`, sem volume ou persistência. Não conecte a API ao banco Supabase do Tech Learning Hub nem use dados pessoais.

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

O `package.json` e o `package-lock.json` locais fixam `pg` `8.23.1` e `redis` `6.3.0`. As duas dependências pertencem apenas a este laboratório; `node_modules` é local e ignorada pelo Git. O site estático do curso não as carrega nem instala.

Saída esperada: npm termina sem erro e instala as dependências do laboratório. No Windows, use `npm.cmd` se a política do PowerShell bloquear `npm.ps1`.

### 2. Criar a configuração local

Ainda em `labs/backend-layers`, copie o exemplo e abra `.env` no editor para substituir o texto de `PGPASSWORD` por uma senha local fictícia. Mantenha `REDIS_URL` apontando para `127.0.0.1:56380`; não coloque credenciais reais na URL. O arquivo `.env` é ignorado pelo Git; não o envie nem cole seus valores em mensagens.

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

O exemplo usa PostgreSQL em `127.0.0.1:55433` (usuário `aluno`, banco `backend_camadas`) e Redis em `127.0.0.1:56380`. A porta PostgreSQL dedicada evita conflitar com a instância principal de aulas, que usa `55432`; Redis não tem volume persistente. O cache de leitura usa TTL padrão de 30 segundos (`CACHE_TTL_SECONDS`).

### 3. Iniciar e conferir o banco

No mesmo terminal e pasta, valide a configuração sem imprimir os valores resolvidos e inicie o serviço:

```sh
docker compose config --quiet
docker compose up -d
docker compose ps
```

Saída esperada: serviços `db` e `redis` em estado `healthy`; as portas locais são `127.0.0.1:55433->5432/tcp` e `127.0.0.1:56380->6379/tcp`. Na primeira execução, o Docker pode baixar PostgreSQL 17 e Redis 8.8.4.

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

Saída esperada na primeira execução: `Migration aplicada` para `001_create_estudos.sql`, `002_create_sessoes_estudo.sql` e `003_add_observacao_sessoes.sql`. Execute o comando outra vez: os três arquivos devem aparecer como já aplicados, sem repetir alterações. O aplicador percorre migrations numeradas em ordem, registra cada nome em `migrations_aplicadas` e usa uma transação por arquivo.

Confira os registros iniciais sem instalar um cliente PostgreSQL no computador:

```sh
docker compose exec -T db psql -U aluno -d backend_camadas -c "SELECT id, titulo FROM estudos ORDER BY id;"
```

Resultado esperado: as linhas `HTML` e `JavaScript`. Para verificar a configuração pelo próprio aplicativo, repita `npm run db:check` (`npm.cmd` no Windows).

Para praticar backup lógico e restauração numa base separada, siga o [roteiro de backup e restauração](BACKUP_RESTORE.md). Use apenas os dados fictícios do laboratório; os arquivos locais de backup ficam fora do Git.

Para planejar uma mudança de fornecedor sem confundir o dump PostgreSQL com a exportação de identidade, cache, arquivos e configuração, siga o [plano mínimo de migração](PROVIDER_MIGRATION.md). O roteiro separa inventário, ensaio em destino isolado, validação, corte e retorno; não conecte a prática ao Supabase real nem use contas reais.

## Executar a API e observar a persistência

1. No terminal em `labs/backend-layers`, execute `npm.cmd start` no Windows ou `npm start` em macOS/Linux. A primeira linha é um registro JSON `api.started`, com endereço local e modos de armazenamento, cache e rate limit.
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

## Logs estruturados do serviço

O processo da API emite uma linha JSON por evento. `timestamp`, `level` e `event` permitem filtrar e correlacionar falhas; rota é reduzida a um conjunto conhecido de caminhos, sem query string. Modos de armazenamento, cache e rate limit são valores de uma lista permitida, e códigos de erro são reconhecidos ou substituídos por `UNKNOWN`.

O logger não grava corpo, título, endereço IP, coordenadas, URL completa, mensagem ou stack da exceção, senha, token ou cabeçalho. Eventos informativos vão para stdout e erros para stderr; o Compose deixa essa saída disponível em `docker compose logs`. Isso facilita processamento por linha sem transformar log local em histórico persistente.

Para conferir os filtros e a resposta segura a uma falha interna, rode `node --test src/logger.test.cjs src/server.test.cjs` dentro desta pasta. Os testes inserem valores fictícios que parecem segredo, IP e dado pessoal e confirmam que esses campos não aparecem.

## Saúde e alerta de disponibilidade local

`GET /health/live` confirma que o processo responde. `GET /health/ready` confirma que a API pode atender: no modo normal, executa `SELECT 1` no PostgreSQL e `PING` no Redis; no modo memória, não há dependências externas. As respostas usam somente `alive`, `ready` ou `not_ready`, não são armazenadas em cache e os dois endpoints continuam ligados a `127.0.0.1`.

Para iniciar uma sonda local, abra dois terminais nesta pasta. No primeiro, use `$env:BACKEND_STORAGE = 'memory'; npm.cmd run start:memory` no Windows ou `BACKEND_STORAGE=memory npm run start:memory` em macOS/Linux. No segundo, execute `npm.cmd run monitor:api` ou `npm run monitor:api`. A sonda consulta readiness a cada cinco segundos, abre `monitor.alert.opened` depois de duas falhas consecutivas e registra `monitor.alert.resolved` quando a API volta. Encerre o monitor com `Ctrl+C`.

Para observar a transição sem banco ou Redis, pare a API de memória com `Ctrl+C`, aguarde a linha de alerta e reinicie o servidor; o monitor registra a recuperação. A automação é um alerta de demonstração em JSONL, sem webhook, serviço externo ou promessa de monitoramento contínuo. `npm test` cobre a sonda HTTP e o limiar de falhas; `npm run test:cache` também prova `ready` com PostgreSQL/Redis reais e `not_ready` quando Redis desconecta.

## Cache-aside no GET de estudos

`GET /api/estudos` procura `cache:v1:backend-layers:studies:list`. Em cache miss, a aplicação consulta PostgreSQL, serializa a lista e grava Redis com `CACHE_TTL_SECONDS` (30 segundos por padrão). Em cache hit, devolve a cópia. Depois de um `POST` confirmado pelo serviço, a lista é removida do cache para que a próxima leitura volte ao PostgreSQL. `POST /api/estudos-com-sessao` também invalida a lista quando cria um estudo.

| Situação | Comportamento do laboratório |
|---|---|
| Cache hit | Responde a lista de Redis sem consultar PostgreSQL. |
| Cache miss ou key inválida | Consulta PostgreSQL e tenta preencher Redis com TTL. |
| Redis falha durante GET | Falha aberta para leitura: consulta PostgreSQL e devolve o resultado; pula o preenchimento se o acesso Redis falhou. |
| Falha no preenchimento Redis | Mantém a resposta obtida no PostgreSQL. |
| Escrita confirmada | Invalida a key compartilhada depois do sucesso no repositório. |
| DEL falha depois da escrita | Mantém o sucesso da escrita; a cópia pode continuar antiga até expirar. |

O serviço compartilha uma consulta à fonte entre misses simultâneos dentro do mesmo processo para reduzir chamadas duplicadas durante recuperação. Isso não coordena instâncias. Uma leitura concorrente pode terminar depois do `DEL` e gravar uma cópia antiga; TTL limita a vida da key, mas não elimina essa janela. O exemplo não oferece consistência forte e deve cachear somente dados compartilháveis. Para progresso por conta, a key também exigiria escopo e autorização corretos; este endpoint local usa registros fictícios comuns.

Para conferir a integração com **PostgreSQL e Redis reais**, deixe os dois serviços Compose saudáveis, aplique migrations e rode:

```powershell
# Windows PowerShell
$env:RUN_CACHE_INTEGRATION = '1'
npm.cmd run test:cache
Remove-Item Env:RUN_CACHE_INTEGRATION
```

```sh
# macOS ou Linux
RUN_CACHE_INTEGRATION=1 npm run test:cache
```

O teste usa uma key aleatória, verifica miss/hit, TTL, invalidação após `POST`, leitura atualizada e fallback ao PostgreSQL após desconectar o cliente Redis. Ele apaga a linha e as keys que criou. É uma prova local funcional, não benchmark, teste de múltiplas instâncias ou consistência de produção.

## Medir PostgreSQL direto e cache aquecido

Com PostgreSQL e Redis Compose saudáveis, migrations aplicadas, dependências instaladas e `.env` configurado, execute:

```powershell
# Windows PowerShell
npm.cmd run benchmark:cache
```

```sh
# macOS ou Linux
npm run benchmark:cache
```

O script gera linhas fictícias numa tabela temporária ligada a uma única conexão PostgreSQL, inicia duas APIs locais e alterna pedidos sequenciais entre o mesmo `SELECT` direto e a rota com cache-aside. Faz cinco aquecimentos por modo e, por padrão, mede 30 pares; `BENCHMARK_ROWS` (1–5.000) e `BENCHMARK_ITERATIONS` (5–500) permitem ajustar esse perfil. A tabela desaparece quando a conexão fecha, e o script remove sua key Redis aleatória.

O JSON registra versões, p50/p95 do GET HTTP completo, consultas PostgreSQL, leituras e taxa de hit Redis, bytes do valor e memória atribuída à key. Use o mesmo número de linhas e o mesmo perfil ao comparar execuções. O resultado mostra o custo operacional local observado — consultas evitadas, um `GET` Redis por pedido e memória da key. Não calcula preço mensal, pois os containers são locais sem tarifação. A execução é sequencial e de uma instância: não mede concorrência, CPU de produção, custo de hospedagem nem Vercel Preview. Se o cache ficar mais lento nesse perfil, registre esse resultado; a redução de consultas, por si só, não justifica a complexidade.

## Rate limit HTTP com Redis

### Contrato da demonstração

| Pedido | Limite | Resposta ao exceder | Redis indisponível |
|---|---|---|---|
| `POST /api/estudos` e `POST /api/estudos-com-sessao` | 3 tentativas por IP observado pelo servidor em uma janela fixa de 60 segundos | `429` com `Retry-After` em segundos; nenhuma gravação é iniciada | `503` genérico; nenhuma gravação é iniciada |
| `GET /api/estudos` | Não limitado por este contador; tenta cache-aside Redis → PostgreSQL | `200` conforme cache/fonte | Recorre ao PostgreSQL se o cache falhar |

O laboratório ainda não autentica contas. Por isso, a demonstração limita por `req.socket.remoteAddress`, um sinal de rede observado diretamente pelo Node, e ignora `X-Forwarded-For`. O servidor escuta apenas em `127.0.0.1`, então os pedidos do navegador local compartilham a key de loopback; não há IP público nesta prática. Isso **não** representa quota por conta: pessoas atrás do mesmo NAT compartilham o limite, e uma implantação atrás de proxy exige configuração de confiança explícita. Não use um ID recebido no corpo ou num cabeçalho arbitrário como identidade autenticada.

O contador reaproveita [`fixed-window.lua`](../redis-fundamentals/fixed-window.lua): `INCR`, `EXPIRE` e a decisão ocorrem atomicamente. A key contém o IP observado durante no máximo 60 segundos; Redis local não persiste keys e a API não registra o IP. A política de 3/60 é somente didática, não um valor recomendado para produção. A API falha fechada nas gravações: se o contador não responder, retorna `503` sem alterar dados.

### Conferir com poucos pedidos controlados

Com Docker Compose iniciado, Node.js instalado e `.env` configurado, rode no terminal desta pasta:

```powershell
# Windows PowerShell
$env:RUN_REDIS_INTEGRATION = '1'
npm.cmd run test:redis
Remove-Item Env:RUN_REDIS_INTEGRATION
```

```sh
# macOS ou Linux
RUN_REDIS_INTEGRATION=1 npm run test:redis
```

Resultado esperado: o teste conecta ao Redis local, demonstra 3 decisões permitidas e a quarta negada, compara uma segunda key, envia quatro pedidos HTTP locais e observa `201, 201, 201, 429`; só três chamadas chegam ao serviço de gravação. Depois desconecta o cliente Redis e confirma `503` genérico sem nova gravação. Os cabeçalhos `X-Forwarded-For` variam de propósito e não mudam a identidade observada. O teste apaga somente as keys aleatórias que criou. Ele não usa PostgreSQL, não mede capacidade, não testa múltiplas instâncias e não envia tráfego ao Preview.

Sem Redis, `npm test` cobre a regra HTTP com doubles determinísticos, mas não prova a conexão ou o script no servidor real. O modo `start:memory` abaixo usa contadores locais temporários; ele não substitui o Redis compartilhado.

## Integração externa real: Open-Meteo

### Objetivo

Observar uma chamada real entre o backend Node.js e um serviço externo, validar o contrato da resposta e manter mensagens seguras quando a rede, a autenticação simulada ou o formato recebido falharem. O fluxo é **navegador → API local → Open-Meteo**; a chave do serviço não é necessária e nenhuma credencial é enviada.

### Contrato antes de executar

| Direção | Método e rota | Entrada/saída |
|---|---|---|
| Navegador → API do laboratório | `GET /api/previsao?latitude=-3.73&longitude=-38.52` | Latitude entre `-90` e `90`; longitude entre `-180` e `180`. |
| API do laboratório → navegador | `200 application/json` | `{ latitude:number, longitude:number, temperatura:number, unidade:string, umidade:number, unidadeUmidade:string, horario:string, fusoHorario:string }` |
| API do laboratório → navegador | `400` | Coordenadas ausentes, não numéricas ou fora dos limites. A API externa não é chamada. |
| API do laboratório → navegador | `502` ou `504` | Falha externa, autenticação simulada, resposta inválida ou tempo limite; o corpo não inclui mensagens internas. |
| Backend → Open-Meteo | `GET https://api.open-meteo.com/v1/forecast` | Envia `latitude`, `longitude`, `current=temperature_2m,relative_humidity_2m` e `timezone=America/Fortaleza`; consome `current`, `current_units` e `timezone`. |

**Resultado esperado antes da solução:** ao abrir a interface, os campos começam com coordenadas de exemplo. Ao consultar, a interface mostra temperatura, umidade e horário recebidos. Os números e o horário variam; não os use como valores fixos de teste. Open-Meteo descreve a condição atual como dado de modelo meteorológico em intervalo de 15 minutos, portanto isto não é leitura instantânea de uma estação. Consulte o [contrato da Weather Forecast API](https://open-meteo.com/en/docs) antes de mudar os campos.

### Preparar e executar

Abra um terminal em `labs/backend-layers`. Para executar sem Docker ou PostgreSQL, inicie o servidor em memória.

```powershell
# Windows PowerShell
$env:BACKEND_STORAGE = 'memory'
npm.cmd run start:memory
```

```sh
# macOS ou Linux
BACKEND_STORAGE=memory npm run start:memory
```

Saída esperada: `Abra http://127.0.0.1:4180 · armazenamento: memória (temporário) · cache: desativado · rate limit: memória local (temporário)`. Mantenha este terminal aberto, acesse o endereço no navegador e consulte a previsão. Em outra aba, abra `http://127.0.0.1:4180/api/previsao?latitude=-3.73&longitude=-38.52` para observar o JSON e o status `200`. O contador também fica apenas no processo, perde o estado ao reiniciar e não coordena instâncias; essa alternativa leve não verifica Redis nem cache-aside na API.

Para conferir o contrato real sem abrir o navegador, pare o servidor com `Ctrl+C` e execute:

```powershell
# Windows PowerShell
npm.cmd run smoke:open-meteo
```

```sh
# macOS ou Linux
npm run smoke:open-meteo
```

Saída esperada: `Contrato Open-Meteo válido:` seguido dos campos normalizados. Os valores são variáveis. O comando exige rede; se a conexão não estiver disponível, a saída informa somente a categoria da falha. Para retomar a interface, inicie novamente o servidor em memória. No PowerShell, ao encerrar o exercício, use `Remove-Item Env:BACKEND_STORAGE`.

Open-Meteo informa que o endpoint gratuito não exige chave, é destinado a uso não comercial, exige atribuição CC BY 4.0, possui limites de requisição e não oferece garantia de disponibilidade. A interface mantém uma atribuição visível e vinculada à documentação. Este material é educacional; antes de usar a API em produto comercial, confira os [termos vigentes](https://open-meteo.com/en/terms) e a licença. A coordenada enviada é aproximada e fictícia para o exercício; a aplicação não a armazena. A política do provedor informa que registros técnicos podem conter coordenadas e são removidos após 90 dias.

### Prática progressiva

Faça as previsões e anotações antes de executar cada mudança. Os testes automáticos usam respostas controladas para não depender de internet; somente `smoke:open-meteo` e a consulta na interface chamam o serviço real.

1. **Prever:** antes da consulta, escreva os parâmetros da requisição e a estrutura de resposta que espera. Critério: listar método, caminho, nomes e tipos sem inventar a temperatura.
2. **Alterar:** troque as coordenadas pelos valores `0` e `0`. Compare a URL e os campos, sem exigir que a temperatura seja igual à primeira consulta. Critério: status `200` e campos dentro do contrato.
3. **Construir:** acrescente o código meteorológico retornado por `current.weather_code`. Atualize o adaptador e um teste unitário com uma resposta fictícia. Critério: o número aparece no JSON local e a saída antiga continua preservada.
4. **Investigar erro:** rode `npm test` e leia os casos de rede, status `401` e resposta inválida. Registre esperado, observado, categoria e camada responsável. Critério: os testes provam cada caso com `fetch` substituído e nenhuma credencial real ou detalhe interno aparece na resposta.

O status `401` é uma simulação controlada: Open-Meteo não exige autenticação para este endpoint. Não crie nem envie uma chave falsa. O código exercita como classificar uma rejeição de autenticação que pode existir em outro fornecedor.

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

Saída esperada: testes aprovados, cobrindo contrato/falhas simuladas do cliente Open-Meteo, rota de integração, ordem/idempotência/rollback de migrations, validação, corrida por título único, transação, consultas parametrizadas e respostas seguras. O número pode crescer conforme novos casos são adicionados.

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

## Fluxo automatizado no navegador

Este teste usa Chromium headless e inicia a API em modo memória. Ele percorre a interface real: carrega a lista, cria um estudo com `201`, tenta um título duplicado e confere `409` sem alterar a lista. O modo memória deixa os dados temporários e não comprova persistência no banco; essa evidência vem de `npm run test:db`.

Na pasta `labs/backend-layers`, instale as dependências locais e o Chromium headless uma vez:

```powershell
# Windows PowerShell
npm.cmd ci
npx.cmd playwright install chromium --only-shell
```

```sh
# macOS ou Linux
npm ci
npx playwright install chromium --only-shell
```

Execute o fluxo:

```powershell
# Windows PowerShell
npm.cmd run test:e2e
```

```sh
# macOS ou Linux
npm run test:e2e
```

Resultado esperado: `3 passed`. O Playwright inicia e encerra a API do laboratório; pare qualquer instância já aberta em `127.0.0.1:4180` antes de executar. O teste percorre o cadastro de estudos, a previsão na interface principal e a demonstração independente em `/demo/`. Ele não lê `.env`, não conecta ao PostgreSQL e não envia dados para serviços externos; as respostas meteorológicas vêm de um adaptador de teste determinístico. Relatórios ficam em `test-results/` e `playwright-report/`, ambos ignorados pelo Git.

Se o executável do navegador não for encontrado, repita `playwright install chromium --only-shell`. Se o Linux informar bibliotecas do sistema ausentes, consulte `playwright install-deps chromium` e os requisitos da distribuição antes de instalar dependências do sistema.

## Demonstração independente

Com a API em execução, abra `http://127.0.0.1:4180/demo/`. Essa página usa o mesmo contrato de previsão e é servida sem alterar a interface de cadastro. Na publicação, a URL estática é `/labs/backend-layers/demo/` e a função fica em `/api/labs/open-meteo`; a rota pública aceita somente as coordenadas aproximadas fixas do exemplo e aplica cache compartilhado curto. O roteiro para a publicação, a verificação da URL e o rollback está em [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md).

## CI real no GitHub Actions

O workflow `.github/workflows/ci.yml`, na raiz do repositório, executa a validação do curso, os testes unitários, as integrações de rate limit com Redis real e cache-aside com PostgreSQL/Redis reais, migrations e o fluxo Chromium em serviços descartáveis. Ele roda em pushes de qualquer branch, em pull requests direcionados a `main` e por acionamento manual. As credenciais, títulos e dados de rate limit são fictícios e usados somente nos containers efêmeros do CI.

Depois que uma alteração chegar ao GitHub, abra a aba **Actions**, selecione a execução mais recente de **CI** e confira cada etapa. Se algo falhar, registre o primeiro passo vermelho, leia a mensagem completa, reproduza o comando correspondente no ambiente local e faça uma correção pequena. Uma execução verde confirma somente os cenários que o workflow rodou; ela não comprova que todos os comportamentos possíveis estão corretos.

Para conferir localmente os mesmos passos, execute `node scripts/validate-content.js` na raiz do repositório. Em `labs/backend-layers`, rode `npm ci`, `npm test`, inicie PostgreSQL e Redis com `docker compose up -d --wait`, execute `RUN_REDIS_INTEGRATION=1 npm run test:redis`, `npm run db:check`, `npm run migrate`, `RUN_PG_INTEGRATION=1 npm run test:db`, `RUN_CACHE_INTEGRATION=1 npm run test:cache` e `npm run test:e2e`. Use a base descartável deste Compose; não conecte ao Supabase do curso. No Windows PowerShell, defina cada variável antes do comando (`$env:RUN_REDIS_INTEGRATION = '1'`, `$env:RUN_PG_INTEGRATION = '1'`, `$env:RUN_CACHE_INTEGRATION = '1'`) e remova-a depois; use `npm.cmd` se `npm.ps1` estiver bloqueado.

## Como parar e retomar

- Pare a API com `Ctrl+C`; os clientes de PostgreSQL e Redis fecham junto com o servidor.
- Pare os serviços sem apagar o volume do PostgreSQL: `docker compose down`. O Redis não tem volume persistente e suas keys de teste são temporárias.
- Para retomar, execute `docker compose up -d --wait`, confira `healthy` em `docker compose ps` e rode `npm start` (`npm.cmd start` no Windows).
- **Não use `docker compose down -v`** neste laboratório: `-v` remove o volume e os dados persistidos.

## Problemas comuns

| Sintoma | O que conferir |
|---|---|
| `npm.ps1 cannot be loaded` no Windows | Use `npm.cmd` nos comandos do roteiro; não altere a política global do PowerShell para este laboratório. |
| Docker não alcança o servidor | Inicie Docker Desktop ou o serviço Docker e rode `docker version`; confira a seção Server. |
| Porta `55433` já está ocupada | Pare a aplicação que ocupa a porta ou ajuste `PGPORT` em `.env`; depois recrie o serviço com `docker compose up -d`. Use o mesmo valor em Node e Compose. |
| Porta `56380` já está ocupada | Pare a aplicação que ocupa a porta ou escolha uma porta livre em `REDIS_HOST_PORT` e em `REDIS_URL` no `.env`; mantenha o serviço Redis interno na porta `6379`. |
| `ECONNREFUSED` ao consultar banco | Confira `docker compose ps`, host `127.0.0.1`, porta `55433` e que a API está usando a pasta certa. |
| `npm start` não conecta ao Redis | Inicie `docker compose up -d --wait`; confira `REDIS_URL` e `docker compose exec -T redis redis-cli PING`. O servidor só abre a porta depois de conectar ao Redis. |
| API responde `503` ao gravar | Confira se `redis` está `healthy` em `docker compose ps`, se `REDIS_URL` aponta para a porta publicada e se `docker compose exec -T redis redis-cli PING` responde `PONG`. Gravações falham fechadas enquanto o limitador estiver indisponível; `GET` pula o cache e consulta PostgreSQL. |
| `GET /api/estudos` continua em `500` durante falha Redis | O cache recorre ao PostgreSQL; confira também `docker compose ps`, `npm run db:check` e se as migrations foram aplicadas. Se o banco falhar, não há cópia antiga servida como stale-if-error. |
| `password authentication failed` depois de trocar a senha | O volume já guarda a senha inicial do cluster. Reponha no `.env` a senha usada na primeira criação ou recupere o ambiente com o procedimento de `db-docker-operations`; não apague o volume para esconder o erro. |
| `relation "estudos" does not exist` | Confirme o banco com `npm run db:check` e aplique `npm run migrate`. |
| migration já aplicada | É o comportamento esperado ao repetir o comando. Para praticar a migration desde o início, use outro banco local descartável; não apague o volume que contém seus dados. |
| Título válido recebeu `409` | A comparação ignora espaços nas pontas e diferença entre maiúsculas/minúsculas; confira a lista pelo `GET`. |
| API retorna `500` | Leia o código de erro no terminal e confira conexão/migration; a resposta HTTP omite detalhes do banco. Nunca compartilhe `.env`. |

## Alternativa quando não for possível usar PostgreSQL

Para continuar estudando validação, regras e HTTP em um computador sem Docker/banco, no Windows execute `$env:BACKEND_STORAGE = 'memory'; npm.cmd run start:memory`; depois de parar com `Ctrl+C`, limpe a variável com `Remove-Item Env:BACKEND_STORAGE`. Em macOS/Linux execute `BACKEND_STORAGE=memory npm run start:memory`. A saída identifica armazenamento e rate limit como memória temporária e cache como desativado. Nesse modo os dados e contadores somem ao reiniciar o servidor e não são compartilhados; marque as integrações PostgreSQL/Redis/cache-aside como pendentes e volte a este roteiro quando Docker estiver disponível.

Se Docker não estiver disponível mas o computador já tiver PostgreSQL local, conclua `setup-postgresql`, crie uma base descartável `backend_camadas` e ajuste em `.env` `PGHOST`, `PGPORT`, `PGUSER`, `PGDATABASE` e `PGPASSWORD` para essa instalação antes de executar `npm run db:check` e `npm run migrate`.

## Como as camadas se conectam

| Parte | Responsabilidade | Arquivo |
|---|---|---|
| HTTP | Lê método, rota e JSON; escolhe status e resposta pública | `server.cjs` |
| Rate limit | Usa IP remoto observado, consulta o contador atômico, responde `429`/`Retry-After` ou falha fechada com `503` | `src/rate-limiter-redis.cjs`, `src/rate-limiter-memory.cjs`, `redis-fundamentals/fixed-window.lua` |
| Validação | Confere o formato do pedido e limpa o título | `src/validar-estudo.cjs` |
| Regra de negócio | Compara títulos sem considerar espaços externos e caixa | `src/regra-titulo.cjs` e `src/servico-estudos.cjs` |
| Repositório | Executa `SELECT`/`INSERT` com parâmetros e converte o resultado | `src/repositorio-estudos-postgres.cjs` |
| Pool | Reutiliza até cinco conexões e lê as variáveis `PG*` | `src/configuracao-banco.cjs` |
| Esquema | Cria estudos, sessões e suas restrições; a 003 adiciona `observacao` opcional às sessões | `migrations/001_create_estudos.sql` a `migrations/003_add_observacao_sessoes.sql` |
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

## Compatibilidade antes de reverter a aplicação

A migration `003_add_observacao_sessoes.sql` é expansiva: acrescenta `observacao TEXT` aceitando `NULL`. O código anterior nomeia explicitamente as colunas de sessão em `INSERT` e `SELECT`; a coluna opcional não exige alteração imediata desse código. A coluna não deve ser removida só porque a aplicação voltou a uma versão anterior.

O teste automatizado só prossegue com um host de loopback (`127.0.0.1`, `::1` ou `localhost`) e `PGDATABASE=backend_camadas`. Ele cria uma base PostgreSQL temporária, aplica primeiro `001` e `002`, usa o repositório anterior, aplica `003` e repete operações com o mesmo contrato antigo. Em seguida grava uma observação fictícia pela forma de escrita nova, confirma que uma consulta antiga ainda lê os demais campos e executa outra gravação com o repositório anterior. O valor da observação deve continuar preservado. O script remove somente a base que criou e exige que o usuário PostgreSQL possa criar e remover uma base de teste. Rode apenas no Compose descartável do laboratório, nunca no Supabase ou numa base com dados reais.

Com PostgreSQL saudável, terminal em `labs/backend-layers` e `.env` local configurado:

```powershell
# Windows PowerShell
$env:RUN_MIGRATION_COMPATIBILITY = '1'
npm.cmd run test:migration-compatibility
Remove-Item Env:RUN_MIGRATION_COMPATIBILITY
```

```sh
# macOS ou Linux
RUN_MIGRATION_COMPATIBILITY=1 npm run test:migration-compatibility
```

Saída esperada: `Compatibilidade confirmada: versão anterior operou antes e depois da migration expansiva.` e `1` teste aprovado. A verificação não faz deploy nem altera uma instância Vercel. O roteiro de Preview abaixo explica como reverter um commit por Git.

Uma mudança que não for mais necessária passa por uma etapa separada de contração: primeiro confirme que nenhum deployment antigo depende dela e decida como preservar ou descartar os dados da coluna. Só então avalie uma nova migration destrutiva, com backup e ensaio próprios; não edite a migration já aplicada.

## Prática guiada: criar uma quarta migration

### Objetivo e pré-requisitos

Ao final, você consegue ampliar uma tabela sem alterar arquivos de migration que já foram aplicados. Conclua os passos anteriores até aplicar as migrations `001`, `002` e `003`. Use somente a base descartável `backend_camadas`; não conecte esta prática ao Supabase nem a uma base com dados importantes.

### Preveja e confira o resultado esperado

Antes de editar, anote sua previsão: após a migration, `estudos` terá uma coluna opcional `revisada_em`, as migrations anteriores continuarão intactas e haverá quatro registros em `migrations_aplicadas`. Executar o aplicador de novo não deve criar uma quinta entrada.

Depois da execução, a consulta ao catálogo do PostgreSQL deve mostrar uma linha com `column_name = revisada_em` e `is_nullable = YES`. Registros de estudo existentes devem apresentar `NULL` nessa coluna.

### Faça a mudança

1. No editor, dentro da pasta `labs/backend-layers`, crie `migrations/004_add_revisada_em_estudos.sql`. Não edite, renomeie nem apague os arquivos `001`, `002` ou `003`.
2. Nesse arquivo, escreva uma instrução `ALTER TABLE` que adicione a `estudos` a coluna `revisada_em`, do tipo `TIMESTAMPTZ` e que aceite `NULL`. Não é necessário adicionar um valor padrão.
3. Salve o arquivo. No terminal aberto em `labs/backend-layers`, execute `npm.cmd run migrate` no Windows ou `npm run migrate` em macOS/Linux.

Saída esperada na primeira execução: `Migration já aplicada` para `001`, `002` e `003`, e `Migration aplicada: 004_add_revisada_em_estudos.sql`. Execute o comando uma segunda vez: os quatro nomes devem aparecer como já aplicados.

### Verifique no PostgreSQL

No caminho Docker, execute no terminal da pasta do laboratório:

```sh
docker compose exec -T db psql -U aluno -d backend_camadas -c "SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name = 'estudos' AND column_name = 'revisada_em';"
docker compose exec -T db psql -U aluno -d backend_camadas -c "SELECT id FROM migrations_aplicadas ORDER BY id;"
```

Se estiver usando uma instalação local de PostgreSQL, execute as mesmas consultas com `psql -h 127.0.0.1 -p 55433 -U aluno -d backend_camadas -c "..."`, substituindo host, porta e usuário pelos valores configurados no `.env`.

Critérios de aceite: a primeira consulta mostra `revisada_em | YES`; a segunda lista exatamente as migrations `001`, `002`, `003` e `004`; a segunda execução de `npm run migrate` não reaplica nenhuma delas; os três arquivos anteriores continuam iguais. Confira também `SELECT id, revisada_em FROM estudos ORDER BY id;` e explique por que os valores anteriores são `NULL`.

### Erros comuns e retomada

- `relation "sessoes_estudo" does not exist`: confira o banco com `npm.cmd run db:check` e aplique primeiro as migrations iniciais.
- `column "revisada_em" already exists`: confira se `004_add_revisada_em_estudos.sql` consta em `migrations_aplicadas`; não remova o registro nem altere uma migration já aplicada para esconder o erro.
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

- [Node.js: opção `--env-file`](https://nodejs.org/api/cli.html#--env-filefile) — carregar o `.env` local sem dependência adicional; variável definida no processo tem precedência.
- [PostgreSQL 17: `ALTER TABLE`](https://www.postgresql.org/docs/17/sql-altertable.html) — acrescentar, alterar ou remover colunas e restrições.
- [node-postgres: instalação e visão geral](https://node-postgres.com/) — pacote `pg` e compatibilidade.
- [node-postgres: conexão e variáveis de ambiente](https://node-postgres.com/features/connecting) — configuração do pool com `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` e `PGDATABASE`.
- [node-postgres: consultas parametrizadas](https://node-postgres.com/features/queries) — enviar valores separados do texto SQL.
- [node-postgres: pool de conexões](https://node-postgres.com/features/pooling) — reutilização e encerramento das conexões.
- [Redis: bibliotecas clientes](https://redis.io/docs/latest/develop/clients/) — recomendação de `node-redis` para a maioria dos usos JavaScript.
- [Redis: uso de node-redis em produção](https://redis.io/docs/latest/develop/clients/nodejs/produsage/) — eventos, timeout e fila offline; o laboratório desativa a fila para não atrasar gravações após reconexão.

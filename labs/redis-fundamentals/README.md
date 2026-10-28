# Fundamentos de Redis: cache-aside e contador de limite

Laboratório local e descartável de Redis. O Compose publica a porta somente em `127.0.0.1:56379`, não cria volume, desativa persistência neste exemplo e usa apenas chaves e identidades fictícias. Não contém autenticação de produção nem deve ser implantado.

## Requisitos e preparação

Requisitos: Docker Engine com suporte a containers Linux, Docker Compose e Node.js conforme `setup-docker` e `setup-node`. A pasta deste laboratório deve estar aberta no terminal. Os exemplos usam `docker compose`; se a sua instalação tiver somente o Compose standalone, substitua o prefixo por `docker-compose`.

No Windows PowerShell, macOS ou Linux:

```sh
cd labs/redis-fundamentals
docker compose config
docker compose up -d --wait
docker compose exec -T redis redis-cli PING
```

Saída esperada: `docker compose config` imprime o serviço `redis`; `up` termina com Redis saudável; `PING` responde `PONG`. A primeira execução baixa a imagem oficial `redis:8.8.4-alpine3.23`. Se a porta 56379 já estiver ocupada, pare e descubra o processo local ou escolha outra porta de host, mantendo-a em `127.0.0.1`.

## Cache-aside com uma fonte de dados simulada

O exemplo representa o retorno do PostgreSQL manualmente; não conecta nem altera o banco do projeto. Execute cada comando no terminal da pasta:

```sh
docker compose exec -T redis redis-cli GET cache:v1:studies:demo-user
docker compose exec -T redis redis-cli SET cache:v1:studies:demo-user '{"items":["HTML"]}' EX 30
docker compose exec -T redis redis-cli GET cache:v1:studies:demo-user
docker compose exec -T redis redis-cli TTL cache:v1:studies:demo-user
```

O primeiro `GET` responde `(nil)` (cache miss). O aluno simula que o banco devolveu HTML; `SET ... EX 30` grava uma cópia temporária. Os próximos `GET` são hits e `TTL` mostra segundos restantes. A versão `v1` separa o formato/chave da aplicação.

Para simular escrita correta: primeiro atualize a fonte PostgreSQL em uma situação real; após o commit, invalide a cópia antiga com `DEL cache:v1:studies:demo-user`. A próxima leitura consulta a fonte e preenche novamente. Para demonstrar dado velho, não invalide e compare o valor anterior até expirar; essa janela deve ser aceitável para o dado. Não use o Redis deste exemplo como fonte de verdade.

## Rate limit por chave fictícia

Após confirmar `PONG`, execute:

```sh
node check-cache-aside.cjs
node check-rate-limit.cjs
```

`check-cache-aside.cjs` imprime `Cache-aside Redis: PASS`: a primeira leitura consulta uma fonte em memória simulada e grava uma cópia com 30 segundos de TTL; a segunda vem do Redis; uma atualização simulada sem invalidar mostra valor velho; `DEL` seguido de leitura recupera o novo valor da fonte simulada. O script apaga somente a chave aleatória que criou. Ele não se conecta ao PostgreSQL e não substitui uma integração de aplicação.

`check-rate-limit.cjs` imprime `Rate limiter Redis: PASS`, três requisições `allowed`, a quarta `limited` e uma segunda conta com contador independente. O programa executa um script Lua atômico, confere que a chave tem TTL e apaga somente as duas chaves temporárias que criou. O contador inicia sua janela de 60 segundos na primeira chamada; isso é uma janela fixa ancorada na primeira chamada, não uma janela deslizante. A janela fixa pode permitir rajadas perto das bordas quando a aplicação cria buckets alinhados no relógio.

No script, `INCR` e `EXPIRE` pertencem à mesma execução Lua, evitando a lacuna entre incrementar e definir TTL. A decisão ilustrativa limita três operações por chave e devolve `limited`; uma API poderia mapear a recusa para HTTP 429 e derivar `Retry-After` do TTL. O laboratório não integra uma rota HTTP ao Redis e não deve ser apresentado como middleware de produção.

## Falhas e segurança a discutir

- Se Redis estiver indisponível, leitura cacheada pode recorrer ao PostgreSQL apenas com timeout e controle de concorrência; dados sensíveis e operações críticas podem exigir recusa em vez de resultado desatualizado.
- Para rate limit, escolha explicitamente fail-open ou fail-closed por endpoint. Permitir tudo quando Redis cai pode abrir abuso; recusar tudo pode indisponibilizar um fluxo legítimo.
- Defina memória máxima e política de expulsão conforme o uso. Expulsar um contador de rate limit antes do fim da janela pode restaurar quota indevidamente; um cache de leitura e um limitador têm necessidades diferentes.
- Não use token, senha, anotação ou endereço IP bruto em chave/log sem necessidade e regra de retenção. O laboratório usa IDs inventados.
- Redis em produção exige rede privada, autenticação/ACL, TLS conforme topologia, credenciais protegidas, monitoramento, política de memória e plano de indisponibilidade. A configuração aberta aqui é permitida somente porque o processo é local e descartável.
- Medir cache exige comparar consultas ao banco, latências p50/p95, hit ratio, memória e custo com a mesma carga de teste controlada. Redis adiciona rede, operação e modos de falha; sem benefício medido, PostgreSQL sozinho pode ser melhor.

## Encerrar e retomar

Ao terminar, nesta pasta execute `docker compose down`. O container e sua rede do Compose são removidos; não há volume persistente. Para retomar, repita `docker compose up -d --wait`. Se a conexão falhar, leia `docker compose logs redis`, confira se o Docker Engine está ativo e verifique a porta 56379. Em computador limitado, leia a sequência e desenhe cache hit/miss sem iniciar o container.

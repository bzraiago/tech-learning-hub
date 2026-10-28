# Runbook de operação e recuperação

## Escopo e limites

Este roteiro cobre o Preview Vercel gerado pela branch `testes`, o login Clerk e o progresso salvo no Supabase, além da API PostgreSQL/Redis local em `labs/backend-layers`. O PostgreSQL do laboratório usa dados fictícios e não é a base Supabase do site. Não use este roteiro para alterar `main`, promover uma implantação a Production ou restaurar dados remotos. Para rollback de Production, siga o procedimento separado em [`DEPLOY_VERCEL.md`](DEPLOY_VERCEL.md) com o responsável pelo ambiente.

O deploy do Preview, o login e o acesso remoto ao Supabase dependem de contas e configurações autenticadas. Os passos abaixo descrevem como verificá-los; não afirmam que foram executados nesta sessão.

## Antes de investigar

Registre em horário UTC: branch, SHA do commit, URL do Preview, ID da implantação, primeiro horário observado, rota e status HTTP. Anote se o problema começou após um deploy ou uma alteração de configuração. Use contas fictícias de teste.

Não copie para issues, prints ou logs: cookies, cabeçalhos `Authorization`, tokens Clerk, credenciais, `.env`, conteúdo de progresso ou respostas integrais de `api/public-config`. Registre somente nomes de variáveis, presença/ausência, rota, status, horário, SHA e um request ID quando existir. Os logs da plataforma podem incluir caminho, parâmetros e agente do navegador; confira e redija esses campos antes de compartilhar.

## 1. Publicar e verificar o Preview

1. Na raiz, confirme a branch e que não há alterações locais que precisem ser preservadas:

   ```sh
   git status --short --branch
   git switch testes
   git log -5 --oneline
   ```

2. Depois de um push, abra **Actions** no GitHub e localize a execução cujo SHA corresponde ao commit. O workflow `CI` deve concluir os jobs `validate-and-test` e `backup-restore`. Abra o primeiro passo que falhou e corrija a causa antes de publicar outra alteração; não trate uma repetição da execução como correção.
3. No painel Vercel, filtre **Deployments** pela branch `testes`. Confirme que o SHA corresponde ao commit e que o estado final é **Ready**. Um push só cria Preview automaticamente quando o repositório e a branch estão conectados ao projeto Vercel.
4. Abra a URL única desse Preview, não uma URL de outro commit. Verifique a página, o acesso esperado e a rota que mudou. Para a demonstração meteorológica, use as verificações em [`DEPLOY_VERCEL.md`](DEPLOY_VERCEL.md). Uma tela de proteção Vercel é anterior ao login Clerk; classifique-a separadamente.
5. Se o deploy falhar, confira o **Build Logs** da implantação. Se o HTML carregar, mas uma função falhar depois, filtre os **Runtime Logs** pela branch, implantação e rota. Registre status e request ID; remova parâmetros, dados pessoais e cabeçalhos antes de compartilhar evidências.

**Recuperação do deploy:** o Preview está **Ready**, aponta ao SHA esperado, a URL verificada responde e o fluxo alterado passa. CI vermelha ou SHA/branch divergente impede considerar a recuperação concluída.

## 2. Diagnosticar autenticação e progresso

Comece pela mensagem visível e pela aba **Network** do navegador. Confira apenas método, rota e status. Não copie cabeçalhos ou corpos da requisição.

| Sinal | Camada provável | Conferência segura |
|---|---|---|
| Aparece uma tela de login da Vercel antes do site | Proteção do deployment | Confirme se a URL é do Preview correto e se a proteção do projeto exige uma sessão. Isso não comprova falha no Clerk. |
| A página mostra **Login indisponível** ou fica em **Verificando sua sessão** | Configuração pública ou carregamento Clerk | Confira o status de `GET /api/public-config` e se `CLERK_PUBLISHABLE_KEY` existe no ambiente **Preview** da Vercel. A resposta deve incluir a chave publicável; não compartilhe seu valor. Em seguida, confira nos Runtime Logs se a função falhou e no navegador se os scripts do Clerk carregaram. |
| O login Google retorna erro de URL/callback | Configuração OAuth | No Clerk, compare o retorno do app com a URL do Preview autorizada. No cliente OAuth, compare o redirect URI do provedor exibido pelo Clerk com a URI autorizada no Google; são URLs de camadas diferentes. Não acrescente curingas. Para Preview, use uma instância de desenvolvimento/staging ou um domínio explicitamente configurado. |
| Login conclui, mas o progresso mostra erro HTTP 401/403 | Token, integração Clerk–Supabase ou RLS | Confira o status da chamada para `/rest/v1/learning_state`; verifique se a integração de autenticação de terceiros no Supabase usa o domínio da instância Clerk correta e se as políticas de RLS continuam comparando a identidade da sessão com `user_id`. Não desative RLS para “testar”. |
| O progresso fica aguardando, falha ao salvar ou some após recarregar | Rede ou persistência | Espere o status **Progresso salvo na nuvem.**; verifique se o navegador está online e se a chamada do Supabase retorna sucesso. Teste somente com contas fictícias e confirme que cada conta acessa apenas seu próprio progresso. Não recarregue enquanto houver alterações pendentes. |

Para o Preview, confira no painel que `CLERK_PUBLISHABLE_KEY`, `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` estão configuradas no escopo correto. A chave publicável não substitui o token de sessão; nenhum segredo privilegiado Supabase deve aparecer no bundle do navegador. Se alterar uma variável, gere uma nova implantação Preview e repita as verificações com o novo SHA.

**Recuperação de autenticação:** uma conta fictícia entra e sai; o status do site confirma que o progresso foi carregado e salvo; após recarregar, a mesma conta vê o estado esperado; outra conta fictícia não lê nem altera o progresso da primeira. Este aceite remoto ainda requer teste com contas autorizadas.

## 3. Diagnosticar a API e o banco local

Primeiro identifique qual serviço falhou. O progresso do site usa Supabase remoto; as rotas `/api/estudos` e `/health/*` abaixo pertencem ao laboratório local. Elas não comprovam a saúde do Supabase.

No PowerShell, em `labs/backend-layers`, confira o estado dos serviços e a conexão. O `.env` deve existir, conter credenciais fictícias distintas para administração e API e apontar a `backend_camadas`. O processo HTTP usa `backend_app`; `PGUSER`/`PGPASSWORD` são reservados às migrations, backup e manutenção local:

```powershell
docker compose ps
docker compose up -d --wait db redis
npm.cmd run migrate
npm.cmd run db:check
```

Saída esperada: `db` e `redis` ficam saudáveis, migrations `001` a `004` aparecem como aplicadas ou já aplicadas, e `db:check` retorna `Conexão OK` com o usuário `backend_app`. No macOS/Linux, use os mesmos comandos com `npm` no lugar de `npm.cmd`.

Com a API ativa em `127.0.0.1:4180`, verifique as sondas sem imprimir configuração:

```powershell
$base = 'http://127.0.0.1:4180'
(Invoke-WebRequest -Uri "$base/health/live" -UseBasicParsing).StatusCode
(Invoke-WebRequest -Uri "$base/health/ready" -UseBasicParsing).StatusCode
```

```sh
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4180/health/live
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4180/health/ready
```

Resultado esperado: `200` nas duas rotas. Liveness confirma que o processo responde; readiness também verifica PostgreSQL e Redis. Se live for `200` e ready `503`, confira `docker compose ps`, `npm.cmd run db:check` e `docker compose exec -T redis redis-cli PING` (esperado `PONG`). A readiness `503` não informa qual dependência falhou; faça as verificações separadamente. No laboratório, gravações recusadas pelo limitador Redis falham fechadas com `503`; não repita pedidos até conferir se houve efeito.

Se o banco não conecta, confira se o Docker está iniciado, se a porta local configurada está livre, se `.env` usa o mesmo host/porta/usuário do Compose e se o container está saudável. Não mostre o arquivo `.env`, não altere senha de volume existente às cegas e não use `docker compose down -v` como tentativa de recuperação. Se uma migration falhar, preserve o volume e siga [`BACKUP_RESTORE.md`](BACKUP_RESTORE.md); não marque uma migration manualmente nem edite um arquivo já aplicado.

Se o progresso do site falhar enquanto a API local está saudável, investigue a integração Supabase descrita na seção 2. A recuperação do laboratório não restaura o progresso remoto. Para recuperação ou migração de dados reais, consulte o provedor e o responsável, além de [`PROVIDER_MIGRATION.md`](PROVIDER_MIGRATION.md); o dump local não inclui identidade Clerk, RLS gerenciado, Redis, arquivos ou configuração.

**Recuperação da API local:** conexão e migrations corretas; `/health/live` e `/health/ready` retornam `200`; o fluxo local que falhou passa novamente. Quando a alteração envolver persistência, execute os testes PostgreSQL e compatibilidade descritos no README antes de avançar.

## 4. Responder a um incidente

| Prioridade | Exemplos | Primeira resposta |
|---|---|---|
| Alta | Acesso entre contas, segredo privilegiado exposto, perda ou alteração de dados | Interrompa os testes e as gravações no ambiente afetado; preserve evidência redigida; avise o responsável pelo serviço imediatamente. Se uma credencial privilegiada realmente foi exposta, o responsável deve revogá-la no provedor, atualizar o ambiente e emitir um deployment novo. |
| Média | Preview indisponível, login ou gravação do progresso falhando para contas de teste | Registre URL, SHA, implantação, horário e status; identifique a mudança causadora; reverta o commit da branch `testes` quando a versão anterior for conhecida e compatível. |
| Baixa | Erro visual ou falha isolada sem efeito em dados/autenticação | Registre o caso reproduzível, mantenha o Preview identificado e corrija com um teste de regressão. |

Procedimento:

1. Confirme impacto, início, contas de teste afetadas, ambiente e SHA. Não estime alcance usando dados pessoais em relatórios.
2. Preserve logs e capturas redigidas. Não apague dados, logs ou deployment para esconder a falha.
3. Contenha no ambiente afetado. No exercício deste repositório, pare gravações locais de teste ou reverta o Preview; não altere `main`, não force o histórico remoto e não faça uma restauração de banco sem confirmar destino, origem e horário do backup.
4. Para regressão de código em `testes`, com working tree limpo:

   ```sh
   git switch testes
   git log -5 --oneline
   git revert --no-edit <sha-defeituoso>
   git show --stat --oneline HEAD
   git push origin testes
   ```

   Isso gera um novo Preview. Confirme CI, branch, SHA, estado **Ready** e URL conforme a seção 1. Mantenha migrations expansivas aplicadas enquanto a versão anterior continuar compatível; não reverta schema automaticamente.
5. Investigue a causa com a menor reprodução possível. Corrija o código ou a configuração no fluxo normal da branch `testes`, inclua um teste que teria detectado a falha e espere CI verde antes de considerar a correção recuperada.
6. Registre horário de recuperação, evidência de teste, causa conhecida ou ainda aberta, e ações seguintes com responsável e prazo. Se houve dados escritos depois do corte ou rollback, defina uma reconciliação antes de reabrir gravações.

Não use Instant Rollback de Production como exercício deste projeto. Se um incidente real atingir produção, siga o procedimento autenticado e confirme a implantação/domínio alvo com o responsável antes de qualquer ação.

## Registro de incidente

```text
Início UTC:
Ambiente / branch / SHA / deployment:
URL e rota (sem query sensível):
Sintoma e status observado:
Escopo confirmado / não confirmado:
Evidência redigida e request ID:
Contenção e horário:
Verificações de recuperação:
Fim UTC:
Causa conhecida ou hipótese:
Teste de regressão / ação / responsável / prazo:
```

## Referências oficiais

Links conferidos em 28/10/2026. Interfaces e recomendações de provedores podem mudar; reveja a documentação oficial antes de executar uma operação remota.

- [GitHub Actions: visualizar histórico e resultado de workflows](https://docs.github.com/en/actions/how-tos/monitor-workflows/view-workflow-run-history) e [consultar logs de execução](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs).
- [Vercel: deploys conectados ao Git](https://vercel.com/docs/git), [diagnosticar falhas de build](https://vercel.com/docs/deployments/troubleshoot-a-build) e [runtime logs](https://vercel.com/docs/logs/runtime).
- [Clerk: erros da Frontend API e redirect URL](https://clerk.com/docs/guides/development/errors/frontend-api) e [integração Clerk–Supabase, token e RLS](https://clerk.com/docs/guides/development/integrations/databases/supabase).
- [Supabase: integração de autenticação Clerk](https://supabase.com/docs/guides/auth/third-party/clerk) e [diagnóstico de banco](https://supabase.com/kb/topics/troubleshooting?troubleshooting=database).
- [PostgreSQL 17: `pg_isready`](https://www.postgresql.org/docs/17/app-pg-isready.html).

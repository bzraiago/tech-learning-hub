# Sincronizar progresso com Supabase e Clerk

**Objetivo:** guardar uma cópia do progresso no PostgreSQL do Supabase, vinculada à conta Clerk. O app continua funcionando sem Supabase e mantém o estado local na chave `tech-learning-hub:v1`. Uma segunda chave local, `tech-learning-hub:local-owner:v1`, registra qual conta associou o progresso exibido; ela não muda o formato do estado. As ações de enviar e carregar são manuais para evitar substituir dados sem escolha do usuário.

**Pré-requisitos:** login Clerk funcionando na prévia da Vercel, projeto Supabase criado, acesso aos painéis do Clerk, Supabase e Vercel. A configuração é feita no navegador em Windows, macOS ou Linux; não é necessário instalar ferramenta local. Se estiver usando um computador limitado, execute o SQL no editor web do Supabase.

## 1. Permitir tokens Clerk no Supabase

1. No **Clerk Dashboard**, abra a mesma instância que fornece a chave `CLERK_PUBLISHABLE_KEY` da prévia. Em **Supabase integration setup**, ative a integração e copie o **Clerk domain** apresentado.
2. No **Supabase Dashboard**, abra **Authentication → Sign In / Providers**, adicione o provedor de terceiros **Clerk** e informe esse domínio. Isso faz o Supabase aceitar o token de sessão assinado pelo Clerk. Use a [integração nativa](https://supabase.com/docs/guides/auth/third-party/clerk); não crie template JWT legado nem compartilhe o segredo JWT do Supabase com o Clerk.

Se a instância de produção do Clerk for diferente da de prévia, configure-a separadamente e confira qual projeto Supabase aceitará cada instância.

## 2. Criar a tabela privada

No **SQL Editor** do projeto Supabase, abra o arquivo [`supabase/learning-state.sql`](../supabase/learning-state.sql), copie seu conteúdo e execute **uma vez**. Resultado esperado: a tabela `public.learning_state` existe, com `user_id` textual, `state` JSON, Row Level Security (RLS) ativada e três políticas para leitura, criação e alteração pelo próprio usuário. O ID Clerk vem do campo `sub` do token; não use `auth.uid()`, que espera UUID.

O script não altera dados já existentes. Se a tabela já existir, a execução falha sem substituir seu esquema. Inspecione a tabela antes de adaptar a migração. As políticas impedem que uma conta leia ou substitua a linha de outra; visitantes sem sessão não recebem acesso à tabela.

## 3. Configurar variáveis públicas na Vercel

No Supabase, copie **Project URL** e **Publishable key** em **Project Settings / Connect / API Keys**. Na Vercel, em **Project → Settings → Environment Variables**, configure estas variáveis para o ambiente **Preview** e publique novamente:

```text
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

O arquivo [`.env.example`](../.env.example) mostra os nomes; o `.env` local não é lido automaticamente pelo site estático. A função `/api/public-config` envia somente URL e chaves **publicáveis** ao navegador. Nunca use `sb_secret_...`, `service_role`, senha do banco ou `CLERK_SECRET_KEY` nessas variáveis. A chave publicável identifica a aplicação; o token Clerk identifica a pessoa e as políticas RLS autorizam cada linha. [Chaves do Supabase](https://supabase.com/docs/guides/getting-started/api-keys).

## 4. Verificar a integração

1. No navegador, abra `https://SUA-PREVIA.vercel.app/api/public-config`. Resultado esperado: `supabaseUrl` com a URL base e `supabasePublishableKey` começando com `sb_publishable_`. Nenhum segredo deve aparecer.
2. Entre no curso com a primeira conta de teste. Resultado esperado: aparece o painel **Sincronização do progresso**. Se houver progresso local anterior, use **Vincular progresso local a esta conta** somente depois de conferir que ele pertence a essa pessoa. Marque uma aula fictícia como concluída e clique em **Enviar progresso para a nuvem**. Resultado esperado: mensagem de envio concluído e uma linha com `user_id` dessa conta em `learning_state`.
3. Em outro navegador ou perfil, entre com uma segunda conta. Se a prévia Vercel for protegida e não abrir na janela anônima, saia da primeira conta e entre com a segunda no mesmo navegador. O progresso local da primeira pode continuar visível, mas **Enviar** ficará bloqueado. Clique **apenas** em **Carregar progresso da nuvem**: deve informar que esta conta ainda não tem dados. Para começar nela, use **Iniciar jornada vazia nesta conta**; o app baixa um backup da cópia local antes. Marque uma aula diferente, envie e volte à primeira conta. Ao carregar, ela deve receber apenas seu próprio progresso.
4. Teste conflito: altere o progresso local, envie de novo e confirme que o app pede autorização antes de substituir a versão remota. Ao carregar, ele pede confirmação e baixa um arquivo de backup local antes de trocar o estado exibido. Recarregue a página e confirme a persistência local do estado carregado.
5. Saia da conta e tente acessar a tabela sem token ou com outro usuário. Resultado esperado: nenhum registro de outra pessoa fica acessível. O simples fato de a interface ocultar dados não comprova segurança; confira a política RLS com as duas contas.

**Problemas comuns:** `401` indica token ausente, expirado ou instância Clerk não aceita pelo Supabase; `403` costuma indicar papel ou permissão insuficiente; ausência do painel indica URL ou chave publicável não configuradas na Vercel; falha ao criar a linha pode indicar tabela ou política ausente. Na aba Rede do navegador, confira método, status e rota, mas **não copie tokens de sessão** para mensagens públicas.

**Parar e retomar:** sair do Clerk encerra a sessão para novas chamadas; o progresso local não é apagado. Ao entrar de novo, escolha carregar ou enviar. Para recuperar o estado anterior após um carregamento, use **Restaurar backup local** e selecione o arquivo baixado. A restauração remove a associação da conta local; confirme o dono antes de reenviar. Não exclua registros do Supabase para testar o fluxo. A sincronização automática e a separação completa do cache local entre contas são etapas posteriores.

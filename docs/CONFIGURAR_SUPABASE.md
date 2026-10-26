# Configurar progresso na nuvem com Clerk e Supabase

**Objetivo:** exigir login Clerk para abrir o curso, carregar automaticamente o progresso da conta e salvar cada alteração em `public.learning_state`. O navegador mantém o estado apenas na memória da página aberta. O formato do estado continua `version: 1`; registros antigos no `localStorage` não são lidos nem apagados por esta versão.

**Pré-requisitos:** login Clerk funcional, projeto Supabase e acesso aos painéis Clerk, Supabase e Vercel. Todos os passos podem ser feitos no navegador em Windows, macOS ou Linux. Um computador limitado não precisa instalar o banco localmente.

## 1. Aceitar tokens Clerk

1. No Clerk Dashboard, abra a instância usada pela prévia e, em **Supabase integration setup**, ative a integração e copie o **Clerk domain**.
2. No Supabase Dashboard, em **Authentication → Sign In / Providers**, adicione o provedor de terceiros **Clerk** com esse domínio. Siga a [integração nativa](https://supabase.com/docs/guides/auth/third-party/clerk). Não compartilhe segredos JWT.

Se a instância Clerk de produção for diferente, configure-a separadamente no projeto Supabase correspondente.

## 2. Criar a tabela privada

No **SQL Editor** do Supabase, execute [`supabase/learning-state.sql`](../supabase/learning-state.sql). Resultado esperado: `public.learning_state` com `user_id` textual, `state` JSON e Row Level Security (RLS) para leitura, inserção e atualização pelo próprio usuário. O ID Clerk vem do campo `sub` do token. Se a tabela já existe, inspecione o esquema antes de executar uma migração; o script não substitui dados existentes.

## 3. Configurar Vercel

Em **Project → Settings → Environment Variables**, configure para cada ambiente publicado:

```text
CLERK_PUBLISHABLE_KEY=pk_test_...
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Publique novamente. [`.env.example`](../.env.example) documenta os nomes; o `.env` local não é lido automaticamente pela página estática. `/api/public-config` expõe somente URL e chaves publicáveis. Nunca coloque `sb_secret_...`, `service_role`, senha do banco ou `CLERK_SECRET_KEY` nessa resposta. O token Clerk identifica a pessoa e a RLS autoriza o acesso à sua linha. Consulte [chaves do Supabase](https://supabase.com/docs/guides/getting-started/api-keys).

## 4. Verificar

1. No navegador, abra `https://SUA-PREVIA.vercel.app/api/public-config`. Resultado esperado: URL Supabase e chave `sb_publishable_...`, sem segredo.
2. Entre com a primeira conta. Aguarde **Progresso desta conta carregado da nuvem** ou **Conta pronta**. Marque uma aula e aguarde **Progresso salvo na nuvem**. No Table Editor, `learning_state` deve ter uma linha com o `user_id` dessa conta.
3. Saia e entre com a segunda conta. O progresso da primeira deve desaparecer; a segunda deve carregar só seus próprios dados. Marque outra aula, aguarde o salvamento e volte à primeira conta para conferir.
4. Recarregue a página. O estado deve voltar da nuvem sem clicar em botão e sem baixar arquivo.
5. Na aba **Rede** do navegador, confira `GET` no carregamento e `POST` ao alterar o progresso. Em falha de rede, o painel informa que o envio falhou e tenta novamente; mantenha a aba aberta até aparecer a confirmação. Não copie tokens para mensagens públicas.

**Problemas comuns:** HTTP 401 indica token ausente, expirado ou instância Clerk não aceita; HTTP 403 pode indicar RLS ou permissões; ausência de dados pode indicar `SUPABASE_URL` ou chave publicável incorreta. Se a leitura falhar, o curso aguarda uma nova tentativa antes de liberar a edição, para evitar substituir dados existentes por uma jornada vazia.

**Parar e retomar:** espere **Progresso salvo na nuvem** antes de sair, trocar de conta ou fechar a aba. Alterações ainda pendentes não têm cópia local persistente. Ao voltar, entre na mesma conta e aguarde o carregamento automático.

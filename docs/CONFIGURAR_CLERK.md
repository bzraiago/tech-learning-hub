# Configurar login com Clerk na Vercel

**Objetivo:** oferecer entrada e saída com uma conta Clerk no Tech Learning Hub já publicado. **Resultado esperado:** o botão **Entrar** abre o fluxo do Clerk; depois de autenticar, aparece **Sair**. Com o Supabase configurado, o progresso da conta é carregado e salvo automaticamente.

## 1. Preparar a aplicação no Clerk

No navegador, abra a aplicação Clerk **já selecionada no Dashboard** (`app_3LDJkmWgfaBi1ecWpdvXD2yQFev`) e escolha o método de entrada desejado. Para começar, habilite email; o login pelo Google pode ser configurado depois. Na página **API keys**, copie apenas a **Publishable Key** da instância de desenvolvimento (`pk_test_...`). Não copie a **Secret Key** (`sk_test_...`) para o repositório, o `.env.example` ou o navegador. Não crie outra aplicação Clerk para este projeto.

O código carrega o ClerkJS pelo CDN da própria instância, conforme o [guia oficial para JavaScript](https://clerk.com/docs/js-frontend/getting-started/quickstart). Não há `npm install`, build ou framework no site. O fluxo de `clerk init` para Next.js não se aplica a este repositório existente em HTML e JavaScript; usá-lo mudaria a arquitetura do curso.

## 2. Configurar a Vercel

No navegador, abra o projeto publicado na Vercel: **Settings → Environment Variables**. Crie `CLERK_PUBLISHABLE_KEY` com a chave publicável. Selecione **Preview** para testar com `pk_test_...`. Publique novamente: a Vercel aplica mudanças de variáveis a novos deployments.

O arquivo `.env.example` documenta o nome da variável. Copiá-lo para `.env` não configura sozinho o site estático. A função `api/public-config.mjs` lê a variável no servidor da Vercel e entrega **somente a chave publicável** a `assets/js/auth.js`. Ao abrir `index.html` diretamente como arquivo, o login fica indisponível e o conteúdo permanece bloqueado.

## 3. Conferir a prévia

1. No navegador, abra `https://SUA-URL-DE-PREVIA.vercel.app/api/public-config`. Resultado esperado: JSON com `clerkPublishableKey` começando por `pk_test_`. Se vier `null`, confira o ambiente selecionado na Vercel e publique novamente. Esta chave é pública; nenhum `sk_test_`, `sk_live_` ou token de sessão deve aparecer nessa resposta.
2. Abra a página da mesma prévia. Resultado esperado: **Entrar** e **Criar conta** aparecem no cabeçalho. Use **Criar conta** com um endereço de teste criado por você. Após autenticar, aparecem o botão de perfil do Clerk e **Sair**; o painel informa o estado do carregamento no Supabase.
3. Atualize a página: a sessão deve continuar ativa. Clique em **Sair**: **Entrar** volta a aparecer. Verifique também o fluxo com teclado e em largura próxima de 375 px.
4. Para investigar falha, abra as ferramentas do navegador. Confira o status de `/api/public-config` na aba Rede e a mensagem do Console. Se os scripts do Clerk não carregarem, confira a chave, a conexão e bloqueadores de conteúdo. O erro de domínio aponta para configuração da instância Clerk.

## 4. Preparar produção

Segundo a [documentação de deploy do Clerk](https://clerk.com/docs/guides/development/deployment/vercel), a instância de produção precisa de **domínio próprio**; `*.vercel.app` não serve como domínio de produção Clerk. No Clerk, crie a instância de produção, configure o domínio e os registros DNS indicados no Dashboard, e copie a Publishable Key `pk_live_...`. Na Vercel, defina `CLERK_PUBLISHABLE_KEY` para o ambiente **Production** com essa chave e publique novamente. Mantenha a chave `pk_test_...` apenas em desenvolvimento/prévia. Confira login e logout no domínio final por HTTPS. Não use `CLERK_SECRET_KEY` nesta etapa: não há chamada à Backend API do Clerk.

## 5. Próxima integração: Supabase

Siga [`CONFIGURAR_SUPABASE.md`](CONFIGURAR_SUPABASE.md) para ativar a [integração nativa Clerk ↔ Supabase](https://supabase.com/docs/guides/auth/third-party/clerk), criar a tabela com políticas de acesso e configurar as variáveis na Vercel. Teste com duas contas diferentes: cada uma deve enxergar apenas seus dados. Aguarde a confirmação de salvamento antes de fechar a página.

**Parar e retomar:** o logout encerra a sessão Clerk; entrar de novo carrega o progresso da mesma conta no Supabase. Para desfazer esta integração de teste, remova a variável da Vercel e publique novamente. Isso não apaga o progresso remoto. Em computador limitado, use a prévia publicada; não é necessário instalar Node, Docker ou um banco para conferir esta etapa.

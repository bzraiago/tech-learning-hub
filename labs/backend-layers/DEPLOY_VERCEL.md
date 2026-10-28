# Publicar a demonstração meteorológica na Vercel

## Objetivo e limites

Publicar a página independente em `labs/backend-layers/demo/` e a função Node.js em `api/labs/open-meteo.mjs`. A função chama Open-Meteo sem chave. Esta demonstração não usa Clerk, Supabase nem PostgreSQL; não informe dados pessoais e não confunda a página com o curso principal. A rota pública limita a consulta a um ponto geográfico de referência e permite cache compartilhado por cinco minutos para reduzir chamadas ao provedor.

Para a rotina de Preview, autenticação Clerk/Supabase, diagnóstico do PostgreSQL local e resposta a incidentes, consulte [`RUNBOOK.md`](RUNBOOK.md).

O repositório já tem uma função Vercel em `api/public-config.mjs`. A demonstração acrescenta uma rota no mesmo projeto, sem mudar a raiz ou os domínios atuais. A Vercel encontra funções Node.js na pasta `api/`; arquivos estáticos da raiz e subpastas são servidos no mesmo projeto. Consulte a [documentação do runtime Node.js da Vercel](https://vercel.com/docs/functions/runtimes/node-js) e as notas sobre [deploys conectados ao Git](https://vercel.com/docs/builds).

## Conferir o projeto antes do deploy

1. No painel da Vercel, abra o projeto existente conectado a `bzraiago/tech-learning-hub`.
2. Em **Settings → General → Root Directory**, confirme que a raiz do projeto é a raiz deste repositório. Não altere esta opção para `labs/backend-layers`: a função publicada fica em `api/labs/open-meteo.mjs` na raiz.
3. Em **Settings → Build and Deployment**, confirme que o projeto continua sem comando de build customizado. A aplicação e a demonstração são arquivos estáticos e funções nativas do runtime Node.js.
4. Não crie variáveis de ambiente para esta demonstração: ela não usa chaves, senhas ou conexão com banco.

## Publicação

Com a integração Git ativa, cada push para a branch principal inicia um deploy conforme a configuração do projeto. Depois que o commit chegar ao GitHub, abra **Deployments** no painel e espere a implantação correspondente à branch `main` terminar com estado **Ready**. Se o projeto não estiver conectado ao Git, use a raiz do repositório e o [fluxo oficial da CLI](https://vercel.com/docs/projects/deploy-from-cli) após autenticar sua conta; não rode `vercel --prod` em outra pasta ou projeto.

## Verificação após publicar

Substitua `<dominio-do-projeto>` pelo domínio principal do projeto Vercel:

O alias de preview pode estar protegido por autenticação Vercel. Uma resposta `200 text/html` não basta: confirme o título da demonstração e que a chamada à API retorna JSON. Faça a conferência em uma janela sem sessão Vercel para separar proteção do deploy e login Clerk.

1. Abra `https://<dominio-do-projeto>/labs/backend-layers/demo/`. Resultado esperado: página “Do navegador até um serviço real”, formulário acessível por teclado e atribuição visível ao Open-Meteo.
2. Clique em **Consultar previsão**. Resultado esperado: temperatura, umidade e horário, usando dados variáveis do serviço.
3. Abra `https://<dominio-do-projeto>/api/labs/open-meteo?latitude=-3.73&longitude=-38.52`. Resultado esperado: status `200`, `Content-Type: application/json` e campos `temperatura`, `unidade`, `umidade`, `horario` e `fusoHorario`.
4. Verifique também coordenadas fora do ponto de demonstração: `https://<dominio-do-projeto>/api/labs/open-meteo?latitude=0&longitude=0`. Resultado esperado: status `400`, sem chamada ao serviço externo.
5. Se o serviço externo estiver indisponível, a função responde `502` ou `504` com uma mensagem pública segura. Confira os logs da implantação e repita mais tarde; não trate esse status como falha de login ou de banco.

No Windows PowerShell, os status podem ser inspecionados sem imprimir segredos:

```powershell
$base = 'https://<dominio-do-projeto>'
(Invoke-WebRequest -Uri "$base/labs/backend-layers/demo/" -UseBasicParsing).StatusCode
(Invoke-WebRequest -Uri "$base/api/labs/open-meteo?latitude=-3.73&longitude=-38.52" -UseBasicParsing).StatusCode
```

Saída esperada para ambas as chamadas: `200`. O segundo valor depende da disponibilidade do fornecedor; em caso de indisponibilidade, a rota responde com erro controlado. Não copie para relatórios o conteúdo de `api/public-config.mjs`, pois esse endpoint mostra configuração pública de Clerk e Supabase do curso.

## Fazer rollback de uma implantação

Use o **Instant Rollback** quando uma implantação de produção causar uma regressão e houver uma implantação anterior conhecida como válida. O rollback troca a implantação atendida pelos domínios de produção sem reconstruir o projeto. No plano Hobby, só é possível voltar à implantação de produção imediatamente anterior; nos planos Pro e Enterprise, outras implantações anteriormente associadas a um domínio de produção também podem ser elegíveis. Consulte a [documentação atual de Instant Rollback](https://vercel.com/docs/instant-rollback) antes de executar o procedimento.

### Procedimento pelo painel

1. Abra o projeto na Vercel e confira qual implantação está em produção e qual é a última versão conhecida como válida.
2. Na página **Overview**, escolha **Instant Rollback** no cartão da implantação de produção. Também é possível abrir **Deployments** e selecionar essa ação no menu da implantação elegível.
3. Selecione a versão anterior e avance. Confira os domínios que serão alterados e confirme **Confirm Rollback** somente se a implantação selecionada for a esperada.
4. Aguarde a confirmação da Vercel e abra o domínio de produção em uma janela sem sessão Vercel. Confira a página principal e a rota da demonstração seguindo a seção de verificação acima.

**Resultado esperado:** o painel confirma o rollback e o domínio de produção serve os arquivos e funções da implantação anterior escolhida.

### Depois do rollback

O Instant Rollback desativa a atribuição automática de domínios de produção. Assim, novos pushes para a branch de produção não substituem automaticamente a versão restaurada. Depois de corrigir e verificar a regressão, use **Undo Rollback** no cartão de produção, selecione a implantação corrigida e confirme para promover a versão e reativar a atribuição automática. Os nomes dos controles podem mudar; confira a documentação da Vercel se o painel mostrar um fluxo diferente.

O rollback recupera a implantação, mas não desfaz mudanças de dados, migrations ou operações executadas no banco externo. Variáveis de ambiente também não são reconstruídas pelo rollback. Avalie compatibilidade da versão antiga com o esquema atual antes de reverter uma aplicação que grava dados. Esta demonstração meteorológica não grava dados; a regra continua importante para o curso principal, que usa Supabase.

O comando equivalente da CLI é `vercel rollback`; ele exige a CLI instalada, o projeto vinculado e uma sessão autenticada. Para este primeiro procedimento, use o painel e não execute o rollback em produção como exercício sem planejar a janela e verificar o alvo.

## Reverter um Preview da branch `testes`

Este repositório usa `testes` como branch de Preview. Para tirar uma alteração defeituosa desse Preview, crie um commit [`git revert`](https://git-scm.com/docs/git-revert) que a desfaça; a [integração Git da Vercel](https://vercel.com/docs/git) cria um deployment para o novo commit enviado à branch. O histórico permanece visível e a ação não altera `main`.

1. Abra o terminal na raiz do repositório, confira que o working tree está limpo e identifique o SHA do commit defeituoso e o Preview correspondente:

   ```sh
   git switch testes
   git status --short
   git log -5 --oneline
   ```

2. Confira que o commit escolhido introduziu a regressão. Em seguida, reverta esse SHA:

   ```sh
   git revert --no-edit <sha-do-commit-defeituoso>
   git show --stat --oneline HEAD
   ```

   `git revert` cria um commit novo que desfaz as alterações selecionadas. Se houver conflito, leia o diff e resolva somente a reversão pretendida antes de continuar; não force a atualização do histórico remoto.

3. Publique a reversão somente em `testes`:

   ```sh
   git push origin testes
   ```

4. No painel Vercel, confirme que o novo deployment aponta à branch `testes` e ao commit de reversão. Aguarde **Ready** e repita o teste do fluxo que falhou na URL Preview. Se o Preview pedir autenticação Vercel, registre a barreira sem tentar removê-la.

5. Depois da correção, uma nova reversão do commit de rollback reaplica as alterações. Antes disso, confira o diff, os testes e a compatibilidade do esquema:

   ```sh
   git log -5 --oneline
   git revert --no-edit <sha-do-commit-de-rollback>
   git push origin testes
   ```

Esse procedimento reverte código e gera outro Preview; ele não desfaz escritas, migrations ou variáveis dos serviços externos. A migration expansiva `003_add_observacao_sessoes.sql` deve continuar aplicada ao voltar à versão anterior, pois essa versão não depende da coluna. Só planeje remover uma coluna em uma migration futura, depois de confirmar que nenhum código antigo ou novo depende dela e decidir o destino dos valores já gravados.

O teste `npm run test:migration-compatibility` ensaia a compatibilidade do repositório anterior com esse schema expandido numa base PostgreSQL temporária; ele não executa `git revert`, não publica um deployment nem substitui a conferência real da URL Preview.

## Limites observáveis

- O serviço externo pode falhar, limitar chamadas ou mudar o contrato; a tela não promete disponibilidade contínua.
- Os testes de CI usam respostas simuladas para permanecer reproduzíveis. O smoke test real está em `labs/backend-layers/README.md`.
- O endpoint gratuito Open-Meteo é destinado a uso não comercial, exige atribuição CC BY 4.0 e não tem garantia de disponibilidade. Confira os [termos vigentes](https://open-meteo.com/en/terms).

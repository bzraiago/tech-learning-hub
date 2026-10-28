# Publicar a demonstração meteorológica na Vercel

## Objetivo e limites

Publicar a página independente em `labs/backend-layers/demo/` e a função Node.js em `api/labs/open-meteo.mjs`. A função chama Open-Meteo sem chave. Esta demonstração não usa Clerk, Supabase nem PostgreSQL; não informe dados pessoais e não confunda a página com o curso principal. A rota pública limita a consulta a um ponto geográfico de referência e permite cache compartilhado por cinco minutos para reduzir chamadas ao provedor.

O repositório já tem uma função Vercel em `api/public-config.mjs`. A demonstração acrescenta uma rota no mesmo projeto, sem mudar a raiz ou os domínios atuais. A Vercel encontra funções Node.js na pasta `api/`; arquivos estáticos da raiz e subpastas são servidos no mesmo projeto. Consulte a [documentação do runtime Node.js da Vercel](https://vercel.com/docs/functions/runtimes/node-js).

## Conferir o projeto antes do deploy

1. No painel da Vercel, abra o projeto existente conectado a `bzraiago/tech-learning-hub`.
2. Em **Settings → General → Root Directory**, confirme que a raiz do projeto é a raiz deste repositório. Não altere esta opção para `labs/backend-layers`: a função publicada fica em `api/labs/open-meteo.mjs` na raiz.
3. Em **Settings → Build and Deployment**, confirme que o projeto continua sem comando de build customizado. A aplicação e a demonstração são arquivos estáticos e funções nativas do runtime Node.js.
4. Não crie variáveis de ambiente para esta demonstração: ela não usa chaves, senhas ou conexão com banco.

## Publicação

Com a integração Git ativa, cada push para a branch principal inicia um deploy conforme a configuração do projeto. Depois que o commit chegar ao GitHub, abra **Deployments** no painel e espere a implantação correspondente à branch `main` terminar com estado **Ready**. Se o projeto não estiver conectado ao Git, use a raiz do repositório e o fluxo oficial de deploy da CLI após autenticar sua conta; não rode `vercel --prod` em outra pasta ou projeto.

## Verificação após publicar

Substitua `<dominio-do-projeto>` pelo domínio principal do projeto Vercel:

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

## Voltar à implantação anterior

Se a demonstração causar uma regressão no site, no painel da Vercel abra **Deployments**, escolha a implantação anterior conhecida como válida e use a ação de promoção para produção disponível no projeto. Depois, repita os passos de verificação do domínio. O rollback da implantação restaura arquivos e funções daquela versão; ele não reverte dados de banco. Esta demonstração não grava dados.

## Limites observáveis

- O serviço externo pode falhar, limitar chamadas ou mudar o contrato; a tela não promete disponibilidade contínua.
- Os testes de CI usam respostas simuladas para permanecer reproduzíveis. O smoke test real está em `labs/backend-layers/README.md`.
- O endpoint gratuito Open-Meteo é destinado a uso não comercial, exige atribuição CC BY 4.0 e não tem garantia de disponibilidade. Confira os [termos vigentes](https://open-meteo.com/en/terms).

# Laboratório: primeira publicação estática na Vercel

## Objetivo

Publicar uma página HTML/CSS a partir de uma pasta do repositório, sem framework, pacote ou etapa de build. Ao final, você terá evidências de que a URL abre, os arquivos são servidos e o acesso termina em HTTPS.

Este laboratório usa `labs/deployment-static` como raiz de um **novo projeto Vercel separado**. Ele não altera a configuração do Tech Learning Hub já publicado. Não há compra de domínio: a URL padrão `vercel.app` é suficiente para esta prática.

## Requisitos

- A pasta deste laboratório está em uma branch enviada ao GitHub.
- Você tem acesso ao painel Vercel e pode criar um projeto.
- O navegador permite abrir a página local e a URL pública.
- Nenhuma instalação de Node.js, dependência ou credencial é necessária.

Se o projeto ainda não estiver no GitHub, conclua primeiro a preparação Git da trilha. Não coloque chaves, tokens nem dados pessoais neste laboratório.

## Etapa 1 — Conferir os arquivos localmente

1. No Explorador de Arquivos, abra a pasta `labs/deployment-static`.
2. Abra `index.html` no navegador. No VS Code, você também pode abrir o arquivo e usar “Abrir com navegador” ou instalar um servidor local apenas se a aula pedir.
3. Confira os cartões, os passos de verificação e o rodapé. Use Tab para alcançar o link “Pular para o conteúdo”.

**Resultado esperado:** aparece a página “Seu primeiro deploy sem build”, com três cartões e uma lista de verificações. A largura da página se adapta ao celular.

## Etapa 2 — Criar projeto separado na Vercel

1. No painel da Vercel, selecione **Add New → Project**.
2. Importe o repositório GitHub que contém este laboratório. Se solicitado, conecte o provedor Git pela interface oficial.
3. Dê ao projeto um nome disponível. O nome e o domínio `vercel.app` dependem da disponibilidade da conta.
4. Em **Root Directory**, selecione `labs/deployment-static`.
5. Em **Framework Preset**, selecione **Other**.
6. Como a pasta só tem arquivos estáticos, não configure comando de instalação. Deixe o Build Command vazio (se houver a opção de override, deixe-a habilitada e vazia). Não existe pasta `public`; use a raiz do projeto como diretório servido (`.`) se o painel pedir esse valor.
7. Não adicione variável de ambiente nem domínio personalizado. Revise o nome do repositório e a pasta raiz; então clique em **Deploy**.
8. Espere o deploy ficar pronto e abra a URL de produção atribuída ao novo projeto. Não mude Root Directory, domínio ou proteção do projeto principal do curso.

O painel da Vercel muda com o tempo. Se os rótulos forem diferentes, consulte “Configuring a Build” nas fontes desta aula. Para esta página, o princípio é manter a raiz em `labs/deployment-static` e não executar um build.

## Etapa 3 — Conferir a URL, HTTP e HTTPS

1. Abra `https://<dominio-do-seu-projeto>.vercel.app/` em uma janela sem sessão Vercel. Use o domínio real exibido no painel no lugar do texto entre sinais de menor/maior.
2. Na aba **Rede/Network** das ferramentas do navegador, atualize a página. Abra os pedidos para `/` e `/styles.css`.
3. Confirme que a página carrega e que os pedidos finais retornam status de sucesso (normalmente `200`). Registre a URL e os status observados, sem copiar cookies ou cabeçalhos de autenticação.
4. Visite a variante `http://` da mesma URL. Observe a cadeia de redirecionamento e anote se o endereço final usa `https://`. Não digite dados de conta na URL HTTP.
5. Teste em largura aproximada de 375 px e navegue usando somente Tab, Shift+Tab, Enter e Espaço.

Se preferir o terminal, substitua `<dominio-do-seu-projeto>` pelo hostname real. No Windows PowerShell, digite:

```powershell
curl.exe -I -L -w "URL final: %{url_effective}`n" "http://<dominio-do-seu-projeto>.vercel.app/"
```

No macOS ou Linux, digite:

```sh
curl -I -L -w 'URL final: %{url_effective}\n' 'http://<dominio-do-seu-projeto>.vercel.app/'
```

**Resultado esperado:** a saída mostra a cadeia de respostas (pode haver um redirecionamento) e uma URL final iniciada por `https://`. Faça também uma consulta direta à URL HTTPS e confirme status final de sucesso. Cabeçalhos e versões HTTP podem variar; registre a saída real em vez de exigir um único texto literal.

Se `curl.exe` não for reconhecido no Windows, use a aba Rede do navegador. Em macOS/Linux, se `curl` estiver ausente, o navegador também serve para conferir URL, status e redirecionamento.

## Investigar uma página 404

Se a URL abrir com 404:

1. No painel, confira se o deploy está marcado como pronto e se você abriu a URL do projeto criado para este laboratório.
2. Confira **Root Directory**: deve ser `labs/deployment-static`.
3. Confira o diretório de saída: a página de entrada `index.html` e `styles.css` precisam estar dentro do conteúdo servido.
4. Confira os logs de build e o commit implantado. Este laboratório não precisa executar `npm install` ou `npm run build`.
5. Corrija uma configuração por vez e publique novamente. Não altere o domínio nem as configurações do projeto principal para contornar um 404 desta demonstração.

Se a URL pedir autenticação Vercel em vez de mostrar a página, o deploy pode estar protegido. Isso não é um erro DNS. Confira a configuração de acesso **somente neste projeto didático sem dados**, e não remova proteção de um projeto que contém dados ou autenticação sem revisar o impacto.

## Problemas comuns

| Sinal | Causa provável | Próximo passo |
|---|---|---|
| 404 em `/` | Raiz ou diretório de saída não inclui `index.html` | Confira a pasta raiz e o resumo do deploy |
| Página aparece sem estilos | Caminho ou arquivo CSS não foi servido | Na aba Rede, abra `/styles.css` e confira o status |
| Painel pede login Vercel | Proteção de acesso ativa no projeto | Diferencie proteção de autenticação de erro DNS; verifique acesso do projeto isolado |
| Deploy usa conteúdo antigo | Branch/commit diferente ou deploy ainda não concluiu | Confira o commit e o estado do deploy no painel |
| URL HTTP não mostra a página esperada | Redirecionamento, cache ou política do provedor | Compare a cadeia completa e teste HTTPS diretamente |

## Parar e retomar

Não há processo local para encerrar: depois do deploy, a página fica hospedada. Para parar a prática, feche a aba. Para retomar, abra **Projects → projeto do laboratório → Deployments** e use a URL atribuída. Não exclua projeto nem domínio para “parar” um site; a remoção não é necessária para este exercício.

## Alternativa para computador limitado

Abra `index.html` localmente e confira a página com o navegador. Isso permite estudar estrutura, foco e responsividade, mas **não** comprova DNS, HTTPS nem publicação remota. Se não puder criar um projeto Vercel, registre essa limitação e faça o diagnóstico em um deploy de demonstração que tenha autorização para consultar.

## Evidência a registrar

- URL pública examinada.
- Nome do projeto e raiz configurada (`labs/deployment-static`).
- Status final de `/` e `/styles.css`.
- Resultado ao começar em HTTP e URL final.
- Largura e método de teclado usados.
- Qualquer proteção, erro ou comportamento não verificado.

Não registre chaves, cookies, dados pessoais ou tokens de verificação.

## Fontes oficiais

- [Vercel: implantar repositórios Git](https://vercel.com/docs/git)
- [Vercel: configurar build e diretório-raiz](https://vercel.com/docs/builds/configure-a-build)
- [Vercel: certificados SSL](https://vercel.com/docs/domains/working-with-ssl)

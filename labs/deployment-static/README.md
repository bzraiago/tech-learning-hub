# Laboratório: publicação estática em Preview

## Objetivo

Entender como uma página HTML/CSS chega ao deployment Preview da branch `testes`, localizar os arquivos pela URL e distinguir erro de caminho, resposta DNS e proteção de acesso.

Este exercício usa a integração Vercel já existente no repositório. Não crie outro projeto, não altere configurações, não publique em Production e não precisa comprar ou configurar domínio. A URL `vercel.app` do Preview é suficiente. A checagem remota dos arquivos é opcional quando a política de acesso permitir; uma tela de login Vercel também pode ser registrada como evidência de proteção.

## Requisitos

- A branch `testes` e seu deployment Preview já existem no projeto conectado à Vercel.
- Você consegue abrir a pasta do repositório no editor e a URL Preview fornecida pelo deployment ou pelo status do commit.
- Nenhuma instalação, chave, variável de ambiente ou serviço de banco é necessária.

Se não encontrar uma URL de Preview, conclua as etapas conceituais com o marcador `https://<deployment>.vercel.app/`. Não invente hostname nem crie um projeto novo para substituir a URL.

## Etapa 1 — Conferir os arquivos no repositório

1. No Explorador de Arquivos, abra `labs/deployment-static`.
2. Abra `index.html` no navegador. Confira os cartões e o link “Pular para o conteúdo”.
3. No editor, localize a referência `styles.css` e confirme que o arquivo está ao lado de `index.html`.
4. Use Tab, Shift+Tab e Enter para navegar pelos controles.

**Resultado esperado:** aparece a página “Seu primeiro deploy sem build”, com três cartões e uma lista de verificações; a largura se adapta ao celular.

## Etapa 2 — Localizar o Preview existente

1. Use a URL indicada no deployment Preview da branch `testes`. Ela pode aparecer no status de implantação do commit ou na lista de deployments do projeto.
2. Confirme, quando a informação estiver disponível, que o deployment corresponde à branch `testes` e ao commit esperado.
3. Acrescente o caminho `/labs/deployment-static/` ao fim do hostname do Preview. A forma é `https://<deployment>.vercel.app/labs/deployment-static/`.
4. Abra a URL. Não altere a raiz do projeto, a proteção de acesso, os domínios nem o ambiente Production.

Não use o endereço raiz do site como se ele apontasse automaticamente para esta pasta. Os arquivos do laboratório ficam sob o caminho `/labs/deployment-static/` porque o projeto Vercel serve o repositório inteiro.

## Etapa 3 — Observar os arquivos e a política de acesso

Se a página abrir:

1. Abra as ferramentas do navegador e selecione **Rede/Network**.
2. Atualize a página e localize a requisição `/labs/deployment-static/` e a requisição `/labs/deployment-static/styles.css`.
3. Registre os status e o comportamento de HTTPS que realmente observou. Os resultados pertencem àquele deployment e podem mudar em outro commit.
4. Confira o layout em largura aproximada de 375 px e teste teclado.

Se aparecer uma tela de login Vercel, registre que o Preview está protegido e pare a conferência remota. Isso não demonstra falha DNS nem que os arquivos estão ausentes; a política de acesso intercepta a navegação antes de observá-los. Não tente remover essa proteção para concluir a aula.

## Diagnosticar sem fazer alterações

| Observação | O que verificar conceitualmente |
|---|---|
| A URL do Preview não é encontrada | Confira hostname e deployment selecionado; a resolução DNS do hostname é uma camada anterior ao caminho HTTP. |
| `/labs/deployment-static/` retorna 404 | Compare o caminho pedido com a pasta e o commit do deployment. Um 404 de arquivo não prova falha DNS. |
| HTML abre, mas CSS retorna 404 | Confira a referência relativa `styles.css`, o caminho efetivamente pedido e se o arquivo existe no mesmo diretório do HTML. |
| Aparece login Vercel | Registre proteção de acesso. DNS pode resolver normalmente mesmo sem acesso ao conteúdo. |
| Arquivos aparecem, mas a página não funciona como esperado | Compare conteúdo e commit servido; uma resposta HTTP de sucesso não comprova o comportamento completo da aplicação. |

Não altere registros DNS. O curso usa apenas Preview. Se no futuro uma pessoa optar por domínio personalizado, a associação, os valores apresentados pelo painel, a zona autoritativa e o impacto em registros existentes serão estudados separadamente em `delivery-custom-domain`.

## Resultado e evidência

Registre em suas anotações:

- identificação do deployment/branch/commit, se visível;
- caminho usado no navegador;
- HTML e CSS observados, ou a mensagem de proteção de acesso;
- status realmente vistos, se a política permitir abrir a página;
- distinção entre erro DNS, erro HTTP de caminho e controle de acesso.

Não registre cookies, tokens, cabeçalhos de autenticação nem dados pessoais. Se a tela de proteção impedir observar os recursos, descreva essa limitação em vez de presumir o resultado.

## Alternativa conceitual

Sem URL disponível ou sem permissão para abrir o Preview, trace o percurso `branch/commit → deployment Preview → hostname vercel.app → caminho do laboratório → HTML e CSS`. Identifique onde DNS, HTTPS e autenticação entram. Essa atividade ensina o modelo, mas não comprova uma resposta remota.

## Fontes oficiais

- [Vercel: implantar repositórios Git](https://vercel.com/docs/git)
- [Vercel: ambientes Preview e Production](https://vercel.com/docs/deployments/environments)
- [Vercel: configurar build e diretório-raiz](https://vercel.com/docs/builds/configure-a-build)
- [Vercel: certificados SSL](https://vercel.com/docs/domains/working-with-ssl)

# Laboratório local — configuração de segurança e CSP

## Objetivo

Este laboratório da categoria **A02: Security Misconfiguration** compara duas políticas de segurança de conteúdo (CSP) numa página local. Uma política de demonstração é ampla e aceita script in-line; a outra restringe os recursos ao próprio servidor e usa um arquivo JavaScript local. Você vai relacionar cada regra com o recurso que ela autoriza e verificar os cabeçalhos HTTP enviados.

O laboratório usa apenas Node.js nativo, vincula o servidor a `127.0.0.1` e serve texto, CSS e JavaScript fixos do próprio processo. Não recebe dados de usuário, não chama serviços externos, não usa conta, não instala pacote e não altera `vercel.json` nem a aplicação principal.

> **Limite da evidência:** os testes leem cabeçalhos e corpos HTTP. Eles não executam as regras CSP dentro de um navegador. `curl` e `fetch` não aplicam a política do navegador. Nenhum resultado deste laboratório comprova que CSP funciona no Preview ou que um site real pode adotá-la sem quebrar autenticação, estilos ou scripts.

## Conceitos

### O que significa configuração incorreta

Uma configuração de segurança descreve quais comportamentos o sistema permite. Risco pode aparecer quando uma regra necessária falta, fica ampla demais, diverge entre respostas de sucesso e erro ou se aplica ao ambiente errado. Uma configuração simples e correta em um cenário não é universal: deve corresponder aos recursos, usuários e fluxos do produto.

Uma resposta HTTP pode trazer diversos cabeçalhos. `X-Content-Type-Options: nosniff` pede que o navegador respeite o tipo anunciado; `Referrer-Policy` limita informação de referência; `X-Frame-Options` restringe enquadramento em navegadores que o usam; `Permissions-Policy` desabilita ou delimita recursos do navegador. Esses controles têm propósitos e limites diferentes. Nenhum autentica a pessoa nem decide se ela pode ler um registro.

### O que a CSP controla

`Content-Security-Policy` é uma política que um navegador aplica aos recursos de um documento: por exemplo, de onde pode carregar JavaScript, CSS e imagens. Ela ajuda a reduzir o efeito de algumas falhas de injeção, mas é uma camada adicional. Código ainda precisa tratar entrada e saída com segurança, como usar `textContent` quando a intenção é apresentar texto.

Termos que aparecem no cabeçalho:

| Diretiva | Decisão que descreve |
|---|---|
| `default-src` | Origem padrão para vários tipos de busca quando uma diretiva mais específica não foi definida |
| `script-src` | Fontes de JavaScript e condições para executar scripts |
| `style-src` | Fontes de folhas de estilo |
| `img-src` | Fontes de imagens |
| `connect-src` | Destinos usados por chamadas como `fetch` e WebSocket |
| `object-src` | Conteúdo de elementos de objeto; `none` desabilita essas cargas |
| `base-uri` | Destinos que um elemento HTML `<base>` pode definir |
| `frame-ancestors` | Sites que podem embutir a página em frames |
| `form-action` | Destinos para os quais formulários podem enviar dados |

`'self'` significa a mesma origem (esquema, host e porta); `*` é uma permissão ampla. `'unsafe-inline'` permite código in-line em contextos aplicáveis; `'unsafe-eval'` permite determinadas formas de interpretar texto como código. Acrescentar `'self'` ou permitir um domínio sem inventariar o que ele serve pode continuar amplo demais.

`Content-Security-Policy-Report-Only` serve para observar uma política sem aplicá-la como bloqueio. É uma etapa de avaliação, não uma proteção em vigor. Para aprender com relatórios, é necessário configurar o mecanismo/endpoint de relatório e avaliar dados e volume recebidos.

### Compare o laboratório

- `/demo/loose` envia uma política ampla e um script in-line inofensivo, que só altera uma frase fixa da página.
- `/demo/strict` envia uma política restrita e carrega CSS e JavaScript locais. O script usa `textContent` para preencher outra frase fixa.
- Os dois cenários são intencionais e só existem neste servidor local. A página ampla não tem campo, conta, segredo ou entrada para explorar.

O exemplo estrito mostra como uma página pode funcionar com menos permissões. Ele não é uma política pronta para copiar para outro site. Aplicação real pode carregar módulos, Tailwind, Clerk, imagens, conexões e recursos de diferentes origens; uma lista incompleta pode bloquear funções legítimas.

## Pré-requisitos e execução

Tenha Node.js 20.6 ou posterior preparado pela aula `setup-node`. Abra um terminal na raiz do repositório; não precisa executar `npm install`.

Inicie o servidor:

```sh
node labs/security-misconfiguration/server.cjs
```

Saída esperada:

```text
Laboratório A02 local: http://127.0.0.1:4183
Políticas e conteúdo são fictícios; nenhuma chamada externa é realizada.
```

O servidor escuta apenas na própria máquina. Se a porta estiver ocupada, encerre o processo correspondente ou escolha outra porta:

```powershell
$env:PORT = "4184"
node labs/security-misconfiguration/server.cjs
```

No macOS/Linux:

```sh
PORT=4184 node labs/security-misconfiguration/server.cjs
```

Abra uma segunda janela para testar pedidos. Os testes não precisam que o servidor manual esteja rodando.

## Observar os cabeçalhos

No PowerShell, leia a página de política ampla:

```powershell
(Invoke-WebRequest -Uri "http://127.0.0.1:4183/demo/loose").Headers
```

Agora leia a política restrita:

```powershell
(Invoke-WebRequest -Uri "http://127.0.0.1:4183/demo/strict").Headers
```

Compare `Content-Security-Policy`. A política ampla usa fontes genéricas e permite script in-line; a restrita começa por negar fontes e declara separadamente script e estilo locais. Compare também `Content-Type`, `X-Content-Type-Options` e `Referrer-Policy`.

No macOS/Linux ou em terminal com `curl`:

```sh
curl -i http://127.0.0.1:4183/demo/loose
curl -i http://127.0.0.1:4183/demo/strict
```

Essas ferramentas revelam a resposta HTTP, mas não executam a página nem avaliam os recursos dentro do navegador. Se abrir as páginas manualmente, use somente `http://127.0.0.1:4183`; pare o servidor com `Ctrl+C`.

## Testes reproduzíveis

Com o servidor manual encerrado, a partir da raiz do repositório execute:

```sh
node --test labs/security-misconfiguration/server.test.cjs
```

Os cinco testes verificam: bind em loopback e navegação local; presença da política ampla somente no exemplo intencional; diretivas essenciais e recursos da mesma origem na política restrita; MIME e cabeçalhos de defesa em arquivos locais; e respostas simples 404/405 com cabeçalhos consistentes.

Os testes não verificam parsing de CSP por um navegador, violação em Console/DevTools, login Clerk, Preview, CSP real da Vercel, compatibilidade mobile, acesso de conta nem proteção geral contra XSS. A revisão manual de navegador continua uma etapa separada.

## Como avaliar CSP num produto real

Não comece ativando uma política restrita sem inventário. Liste cada tipo de documento e recurso: scripts, estilos, imagens, fontes, `fetch`, WebSocket, frames, formulários, CDN e serviço de autenticação. Identifique quem mantém cada origem, qual função depende dela e se há alternativa local.

Uma sequência revisável é: registrar estado atual; preparar uma hipótese de política mínima; avaliar em modo `Report-Only` num ambiente permitido; classificar violações esperadas e inesperadas; testar login, saída, tela e interações; corrigir uso de scripts in-line com caminhos apropriados; revisar logs de relatório; só depois planejar enforcement, rollback e novo teste. Não adicione `unsafe-inline`, `unsafe-eval` ou `*` automaticamente para silenciar bloqueios.

Para o Tech Learning Hub, o servidor real entrega scripts separados, porém há dependências e autenticação externas que precisam ser inventariadas e testadas no ambiente Preview antes de configurar CSP. Este laboratório não muda nem valida esses recursos.

## Desafios com respostas para estudo

Tente explicar o resultado antes de consultar as respostas.

1. **Prever:** a página estrita inclui `<script src="/assets/app.js">` e `script-src 'self'`. O que a regra permite? Ela autoriza esse script a ler qualquer conta?
2. **Alterar:** proponha uma regra para uma página sem imagem ou formulário que só usa script e estilo locais. Separe o que `default-src` cobre do que deve ser declarado explicitamente.
3. **Construir:** monte um inventário de recursos para um produto com página, CSS local, módulo JavaScript, provedor de login externo e chamada REST; marque origem, responsável, dependência e teste.
4. **Investigar erro:** depois de ativar CSP, o login ou uma tela parou de funcionar. Escreva uma sequência de diagnóstico sem liberar todas as origens.
5. **Mudança inesperada:** uma equipe pede `unsafe-inline` e `*` para resolver todos os bloqueios. Proponha uma etapa de avaliação e evidências antes de permitir qualquer exceção.
6. **Transferir:** uma página de erro 500 perde `X-Content-Type-Options`. Planeje como conferir que cabeçalhos aparecem nos caminhos de sucesso e de falha.

<details>
<summary>Respostas comentadas</summary>

1. `'self'` permite o arquivo se ele vier da mesma origem (inclusive esquema e porta). Isso autoriza a carga, não identidade, autenticação ou leitura de contas: autorização é outra decisão do servidor.
2. Hipótese para revisão: `default-src 'none'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`. A equipe confirma recursos reais antes de aplicar. `default-src` funciona como fallback para diretivas de busca aplicáveis; não substitui decisões específicas como `frame-ancestors`/`form-action`.
3. Exemplo: documento e CSS JS com origem da página; login no host oficial aprovado; REST no host de API; dono de cada origem e justificativa; caminhos de login/retorno e chamadas; capturar bloqueios esperados e validar funções positivas e negativas. Os nomes concretos precisam vir do ambiente atual, não de um valor inventado.
4. Registre rota, recurso recusado, diretiva, origem e ambiente; confira se o recurso é necessário e legítimo; localize responsável; procure alternativa local ou diretiva específica; teste em `Report-Only`/ambiente de revisão; depois valide comportamento completo. Não amplie a regra antes de entender a dependência.
5. Primeiro inventarie cada bloqueio e relacione com requisito. Use política de observação em ambiente permitido, agrupe fontes aprovadas, remova scripts in-line inseguros quando possível e teste fluxos. `*` e `unsafe-inline` escondem causa e ampliam permissão; toda exceção precisa de razão, limite, dono e critério de remoção.
6. Gere a falha local, compare headers no caminho 500 com o sucesso, confira ordem dos handlers/middleware e verifique configuração global. Adicione um teste de regressão para os dois status. Uma resposta de erro é parte do contrato e não deve perder cabeçalho de defesa.

</details>

## Erros comuns e retomada

- `node` não é reconhecido: volte a `setup-node`, abra um terminal novo e confirme `node --version`.
- `EADDRINUSE`: outro processo usa a porta; encerre-o com `Ctrl+C` ou configure `PORT` numa porta livre.
- Um valor de política que veio de uma busca foi copiado sem verificar o host: substitua-o por inventário do projeto atual.
- Um teste de cabeçalho foi interpretado como teste de navegador: marque apenas a resposta HTTP como verificada.
- Para repetir, rode novamente o comando de testes; não há banco, arquivos de estado ou serviço remoto para limpar.

## Referências opcionais

O conteúdo e as respostas acima bastam para a prática. Estas fontes oficiais aprofundam as regras:

- W3C, Content Security Policy Level 3: https://www.w3.org/TR/CSP/
- OWASP, Content Security Policy Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- OWASP, HTTP Security Response Headers Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
- MDN, Content-Security-Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy

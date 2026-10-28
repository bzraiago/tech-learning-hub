# Laboratório local: saída segura de texto

## Objetivo

Observar como inserir texto não confiável com `innerHTML` faz o navegador interpretar marcação e um evento JavaScript inofensivo; comparar com `textContent`, que mantém o mesmo valor como texto.

## Limites

- O exemplo é apenas para estudo local e usa uma mensagem fictícia; não envia dados, não acessa cookies, armazenamento, rede ou serviços externos.
- O arquivo tem extensão `.html.example` de propósito: o deployment Vercel não o serve como página executável.
- Faça uma cópia fora do repositório, renomeie a cópia para `.html` e abra-a localmente. Não publique a cópia nem cole o exemplo num site de terceiros.
- O botão vulnerável existe para observar a falha controlada. A correção depende do contexto: `textContent` é adequado para texto simples, não para qualquer contexto de HTML, atributo, URL, JavaScript ou CSS.

## Preparação

1. Abra `labs/security-xss/demo.html.example` no editor.
2. Copie o arquivo para uma pasta temporária fora do repositório e renomeie a cópia para `demo-local.html`.

No Windows PowerShell, a partir da pasta do repositório:

```powershell
Copy-Item labs/security-xss/demo.html.example "$env:TEMP\demo-local.html"
```

No macOS ou Linux, a partir da pasta do repositório:

```sh
cp labs/security-xss/demo.html.example /tmp/demo-local.html
```

Abra a cópia no navegador pelo explorador de arquivos. Ela não precisa de Node, servidor, rede, credenciais, domínio ou conta. Para parar, feche a aba. Para retomar, abra a mesma cópia temporária.

Se a cópia não abrir, confira se o nome termina em `.html` e não `.html.example`. Como alternativa para computador limitado, compare no código as atribuições a `innerHTML` e `textContent` e preveja qual interpreta a marcação.

## Comparação

1. No editor, localize a mensagem fictícia no campo e leia primeiro o conteúdo entre `<` e `>`.
2. Na cópia local, pressione Tab até **Renderizar no exemplo vulnerável** e pressione Enter. O aviso informa que o evento local de demonstração executou.
3. Pressione Tab até **Renderizar no exemplo corrigido** e pressione Enter. A marcação aparece como texto literal; o aviso de execução não é acionado.
4. Confira as linhas `innerHTML` e `textContent` no próprio arquivo.

## Resultado esperado

- Vulnerável: o navegador cria um elemento de imagem a partir do texto e executa apenas a alteração local do aviso quando o caminho inexistente falha.
- Corrigido: o navegador mostra a sequência `<img ...>` como texto; nenhum elemento de imagem é criado e o aviso não muda.
- Nenhuma requisição sai para um servidor e nenhum dado pessoal é usado.

## Encerramento

Feche a aba e apague a cópia temporária se não precisar mais dela. O arquivo-fonte do repositório permanece com extensão não executável. Não reutilize o botão vulnerável em uma aplicação publicada.

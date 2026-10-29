# Laboratório: RAG local e chamada opcional a um modelo

## Objetivo

Reconhecer a diferença entre uma simulação local e uma inferência real, seguir o caminho navegador → servidor local → Responses API, testar recuperação de fontes e mostrar a saída sem expor a chave no navegador.

Este laboratório tem três formas de estudo:

- **Sem chave ou cobrança:** execute o RAG local. A busca usa um corpus fictício e, quando encontra um trecho, exibe esse trecho com seu ID; quando não encontra, responde sem evidência. Nenhuma API é chamada.
- **Testes automatizados:** use testes locais com um provedor falso para verificar o contrato de integração, sem acessar a internet.
- **Chamada real opcional:** configure, no terminal da sua máquina, uma chave própria e um identificador de modelo disponível na sua conta. A solicitação sai do seu servidor local e pode gerar uso faturável.

O curso e os exemplos não exigem a chamada real para continuar. A trilha `IA no chat` também permanece independente: ela usa qualquer interface web escolhida pelo aluno, sem IDE, código ou API.

## Pré-requisitos

- Conclua a Etapa 0, `setup-python` e a aula `ai-api`.
- Python 3 e terminal. O servidor usa somente a biblioteca padrão; não há `pip install`.
- Abra a raiz do repositório no editor. No terminal, a pasta de trabalho deste laboratório será `labs/ai-provider-connection`.
- Uma conta habilitada para a API e uma chave própria são necessárias **somente** para a chamada real. Nunca envie a chave no chat, no código, no navegador ou no Git.

## Como o fluxo está separado

```text
public/index.html
├─ POST /api/chat → server.py → Responses API configurada → resposta de texto
└─ POST /api/rag → server.py → rag.py → busca lexical em três fontes fictícias
                                 ├─ sem correspondência → abstenção local, sem provedor
                                 ├─ provedor ausente → trecho recuperado com citação, como simulação
                                 └─ provedor configurado → contexto + instruções → validação do ID citado
Navegador → mostra texto e fontes usando textContent
```

O servidor vincula a porta somente a `127.0.0.1`. A chave nunca é enviada na requisição do navegador, incluída na página, gravada em arquivo ou impressa. O laboratório não tem autenticação, limite por conta, controle de abuso ou proteção adequada para publicação; mantenha-o local e não o implante na Vercel.

## Preparação e verificação sem chave

No terminal, a partir da raiz do repositório, entre na pasta:

```sh
cd labs/ai-provider-connection
```

Confira a instalação com `python --version` no Windows ou `python3 --version` no macOS/Linux. A saída deve identificar Python 3. Na mesma pasta, execute os testes:

```sh
python -B -m unittest discover -s test -v
```

No macOS/Linux, use `python3 -B -m unittest discover -s test -v` se o comando `python` não existir.

Resultado esperado: 24 testes terminam com `OK`. Os casos usam chave e modelo explicitamente fictícios, verificam as rotas, busca, abstenção, citações, segredo fora da página, erros sanitizados, formato da requisição Responses e limite de saída. Os testes não chamam o provedor real.

Para iniciar só a interface local, ainda sem configurar chave:

```sh
python server.py
```

Abra `http://127.0.0.1:4194` no navegador. No bloco “Perguntar aos materiais fictícios (RAG)”, teste:

- **Com evidência:** `Quanto tempo vale o link para redefinir minha senha?` deve mostrar o trecho fictício sobre quinze minutos, o ID `manual-senha-v1` e o rótulo de simulação local.
- **Sem correspondência:** `Qual é a cor do dragão azul?` deve informar que não encontrou evidência, sem fonte e sem chamada a provedor.
- **Conversa direta:** o formulário “Conversa com o modelo” retorna `503` sem configuração. Isso é esperado e não envia uma solicitação externa.

Use Tab para percorrer rótulos e botões. Redimensione a janela para cerca de 375 px e confirme que os campos e textos não criam rolagem horizontal. Encerre o servidor com `Ctrl+C` no terminal.

## Como o RAG funciona e o que ele não prova

`rag.py` normaliza acentos e caixa, remove palavras comuns e ordena os documentos pelo número de termos compartilhados. O conjunto contém apenas três textos inventados sobre redefinição de senha, cancelamento de pedido e prazo de entrega. O limite de fontes é dois.

Essa busca é lexical: uma paráfrase ou sinônimo pode não encontrar um texto relevante, e termos compartilhados podem recuperar um trecho errado. Resultado vazio significa “esta busca local não encontrou correspondência”, não prova que nenhum documento contém a resposta. O corpus demonstrativo também não implementa usuários, permissões, ingestão de arquivos, banco vetorial, embeddings ou controle de versões.

Sem configuração do provedor, a interface apresenta o trecho recuperado com o ID como **simulação**, sem fingir que um modelo gerou a resposta. Com provedor configurado, o servidor envia a pergunta e somente os trechos recuperados; exige um ID citado dentre os IDs enviados e rejeita resposta sem citação ou com ID desconhecido.

Essa checagem valida apenas o formato e a associação do ID ao contexto recuperado. Ela **não** demonstra que cada afirmação é sustentada pelo trecho, que a resposta é correta ou que o modelo se absteve adequadamente. Isso exige avaliação factual por afirmação e um conjunto de casos preparado separadamente.

## Configuração opcional da chamada real

Primeiro confira a documentação oficial da Responses API, escolha um modelo que sua conta possa usar e consulte os preços atuais. O ID do modelo muda conforme a disponibilidade da conta; por isso o laboratório não fixa um nome no código. A API e a assinatura do ChatGPT têm faturamento separado. Não habilite recarga automática para este exercício.

Entre com a chave em modo oculto e execute o servidor **no mesmo terminal**. O valor permanece somente no ambiente daquele processo e não entra no histórico do comando.

### Windows — PowerShell

Na pasta `labs/ai-provider-connection`:

```powershell
$secureKey = Read-Host "Chave da API (entrada oculta)" -AsSecureString
$env:OPENAI_API_KEY = [System.Net.NetworkCredential]::new("", $secureKey).Password
$env:OPENAI_MODEL = Read-Host "ID do modelo disponível na sua conta"
python server.py
```

### macOS — Terminal com zsh

Na pasta `labs/ai-provider-connection`:

```zsh
read -s "OPENAI_API_KEY?Chave da API (entrada oculta): "
export OPENAI_API_KEY
read "OPENAI_MODEL?ID do modelo disponível na sua conta: "
export OPENAI_MODEL
python3 server.py
```

### Linux — Terminal com Bash

Na pasta `labs/ai-provider-connection`:

```bash
read -rsp "Chave da API (entrada oculta): " OPENAI_API_KEY
printf '\n'
export OPENAI_API_KEY
read -rp "ID do modelo disponível na sua conta: " OPENAI_MODEL
export OPENAI_MODEL
python3 server.py
```

Abra `http://127.0.0.1:4194` e envie uma pergunta curta e fictícia, por exemplo: “Explique em uma frase a diferença entre HTTP e HTTPS”. Resultado esperado: o navegador mostra texto produzido pelo modelo escolhido. Cada envio faz uma chamada real; não há repetição automática.

Para parar, volte ao terminal e pressione `Ctrl+C`. Feche essa janela ao terminar; para encerrar antes, use `Remove-Item Env:OPENAI_API_KEY; Remove-Item Env:OPENAI_MODEL` no PowerShell ou `unset OPENAI_API_KEY OPENAI_MODEL` em macOS/Linux. Caso uma chave apareça em arquivo, terminal compartilhado, captura ou Git, revogue-a e crie outra.

## Erros comuns

- **`python` não é reconhecido:** volte a `setup-python`; no Windows confira `py --version` e use `py -3 server.py` se esse for o launcher instalado, ou use `python3` no macOS/Linux.
- **`503` e mensagem de configuração:** o servidor não recebeu `OPENAI_API_KEY` ou `OPENAI_MODEL`. Configure no mesmo terminal em que inicia `server.py`.
- **RAG local não entra em simulação apesar de existir uma configuração:** a simulação offline só é usada quando chave e modelo estão ambos ausentes; configuração parcial retorna `503` para evitar esconder um erro de configuração.
- **`400`:** a mensagem está vazia, não é texto ou excede 1.000 caracteres. O servidor recusa antes de chamar o modelo.
- **`502`:** a integração não recebeu uma resposta utilizável. Confira o ID do modelo, a conectividade e os limites da conta; o laboratório não expõe a resposta interna do provedor nem tenta novamente.
- **A página abre, mas não chama o provedor:** carregar a interface e concluir uma chamada são etapas diferentes; só o envio do formulário tenta a chamada externa.
- **A chamada consome créditos ou retorna limite:** uso da API não é incluído automaticamente na assinatura do ChatGPT. Confira o painel de uso e os controles de gasto antes de repetir.
- **RAG local não encontra uma paráfrase:** a busca compara palavras; tente formular com termos do material e registre a falha como um caso de recall, sem concluir que não existe evidência no corpus.
- **Aparece `503` ao consultar uma mensagem direta:** é esperado sem chave e modelo configurados. O RAG com conteúdo correspondente permanece disponível em modo simulado.
- **A resposta com citação parece errada:** a verificação automática aceita IDs recuperados, mas não verifica suporte semântico. Compare cada afirmação com o trecho e registre a falha; não trate a existência do ID como prova de correção.

## Critérios e limites

- A solicitação do navegador contém só `prompt`; o servidor adiciona o modelo e o cabeçalho de autorização.
- Entrada vazia ou maior que o limite é recusada antes do transporte.
- A resposta visível é texto simples; erros do provedor não retornam corpo interno nem credenciais.
- Testes automatizados verificam contratos locais com um provedor falso. Eles não provam disponibilidade, qualidade, segurança ou custo do serviço real.
- RAG local confirma somente a recuperação lexical e o caminho de ausência de resultados. Respostas geradas por modelo não tiveram chamada real nem avaliação de qualidade nesta execução.
- Uma chamada real confirma somente que aquela chave, modelo, conta e momento produziram uma resposta. Não comprova correção das respostas nem prontidão para produção.

## Alternativa sem computador ou sem serviço pago

Sem computador, desenhe as fronteiras de ingestão, recuperação e geração e explique em que lado cada segredo fica. Sem chave de API, faça os dois exercícios locais de RAG acima e registre que a chamada real foi pulada; os testes com provedor falso validam somente o contrato. Nenhuma dessas alternativas conta como evidência de execução de um modelo real.

## Fontes oficiais consultadas

- [OpenAI API — Developer quickstart (EN)](https://developers.openai.com/api/docs/quickstart)
- [OpenAI API — Text generation / Responses API (EN)](https://developers.openai.com/api/docs/guides/text)
- [OpenAI Help Center — Best practices for API key safety (EN)](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)
- [OpenAI Help Center — Billing for ChatGPT and the API platform (EN)](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)
- [OpenAI API — Pricing (EN)](https://developers.openai.com/api/docs/pricing)

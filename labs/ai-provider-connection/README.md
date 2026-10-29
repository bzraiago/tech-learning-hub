# Laboratório: uma chamada real a um modelo, com a chave no servidor

## Objetivo

Reconhecer a diferença entre uma resposta simulada e uma inferência real, seguir o caminho navegador → servidor local → Responses API, validar a entrada e mostrar a saída sem expor a chave no navegador.

Este laboratório tem duas formas de estudo:

- **Sem conta ou cobrança:** leia o fluxo e execute os testes automatizados. Eles usam um provedor falso e não acessam a internet.
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
    │ POST /api/chat { prompt }
    ▼
server.py — limite, validação e segredo lido do ambiente
    │ POST /v1/responses + Authorization: Bearer …
    ▼
Responses API — serviço real, apenas quando você envia uma mensagem
    │ resposta JSON
    ▼
server.py — extrai texto e remove detalhes internos de erro
    │ { text }
    ▼
navegador — mostra a resposta usando textContent
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

Resultado esperado: dez testes terminam com `OK`. Os casos usam chave e modelo explicitamente fictícios, verificam a rota, validação, segredo fora da página, erros sanitizados, formato da requisição Responses e limite de saída. Os testes não chamam o provedor real.

Para iniciar só a interface local, ainda sem configurar chave:

```sh
python server.py
```

Abra `http://127.0.0.1:4194` no navegador. A página carrega, mas ao enviar uma mensagem sem configuração o servidor retorna `503`. Isso é o resultado esperado: a interface local abriu, porém nenhuma solicitação foi enviada ao provedor. Encerre com `Ctrl+C` no terminal.

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
- **`400`:** a mensagem está vazia, não é texto ou excede 1.000 caracteres. O servidor recusa antes de chamar o modelo.
- **`502`:** a integração não recebeu uma resposta utilizável. Confira o ID do modelo, a conectividade e os limites da conta; o laboratório não expõe a resposta interna do provedor nem tenta novamente.
- **A página abre, mas não chama o provedor:** carregar a interface e concluir uma chamada são etapas diferentes; só o envio do formulário tenta a chamada externa.
- **A chamada consome créditos ou retorna limite:** uso da API não é incluído automaticamente na assinatura do ChatGPT. Confira o painel de uso e os controles de gasto antes de repetir.

## Critérios e limites

- A solicitação do navegador contém só `prompt`; o servidor adiciona o modelo e o cabeçalho de autorização.
- Entrada vazia ou maior que o limite é recusada antes do transporte.
- A resposta visível é texto simples; erros do provedor não retornam corpo interno nem credenciais.
- Testes automatizados verificam contratos locais com um provedor falso. Eles não provam disponibilidade, qualidade, segurança ou custo do serviço real.
- Uma chamada real confirma somente que aquela chave, modelo, conta e momento produziram uma resposta. Não comprova correção das respostas nem prontidão para produção.

## Alternativa sem computador ou sem serviço pago

Sem computador, desenhe as quatro fronteiras do fluxo e explique em que lado cada segredo fica. Sem conta habilitada, execute somente a suíte com provedor falso e registre que a chamada real não foi feita. Essas alternativas ensinam arquitetura e validação, mas não contam como evidência de integração real.

## Fontes oficiais consultadas

- [OpenAI API — Developer quickstart (EN)](https://developers.openai.com/api/docs/quickstart)
- [OpenAI API — Text generation / Responses API (EN)](https://developers.openai.com/api/docs/guides/text)
- [OpenAI Help Center — Best practices for API key safety (EN)](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)
- [OpenAI Help Center — Billing for ChatGPT and the API platform (EN)](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)
- [OpenAI API — Pricing (EN)](https://developers.openai.com/api/docs/pricing)

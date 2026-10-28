# Laboratório local: controle de acesso por objeto

## Objetivo

Reproduzir uma falha de autorização por objeto (BOLA/IDOR) numa API didática e comparar com uma correção aplicada no servidor. O laboratório usa duas contas, duas linhas e tokens inventados guardados no próprio código. Nada é conectado ao Clerk, Supabase ou à Vercel.

## Limites de segurança

- A rota `/demo/vulnerable/` é vulnerável de propósito e existe só para mostrar a falha com dados fictícios.
- O servidor de demonstração escuta somente em `127.0.0.1`, usa armazenamento em memória e não aceita tokens reais.
- Não publique esta pasta como API, não a conecte a um banco real e não troque os marcadores pelos seus dados.
- Não teste esse comportamento em site ou API de outra pessoa. Os testes exercitam apenas o servidor local criado pelo próprio laboratório.
- A correção demonstra propriedade de um único usuário. Aplicações com equipes, compartilhamento e papéis precisam de uma política de autorização mais completa.

## Pré-requisitos

1. Node.js preparado pela aula `setup-node` (Node.js 20.6 ou mais novo) e terminal disponível.
2. Abra `labs/security-basics` no editor e no terminal.
3. Nenhum pacote externo, banco, conta, chave ou domínio é necessário.

Confira no terminal:

```sh
node --version
```

Saída esperada: `v20.6.0` ou versão posterior.

## Reproduzir e corrigir

### 1. Executar os testes locais

No terminal aberto em `labs/security-basics`, rode:

```powershell
# Windows PowerShell
node --test server.test.cjs
```

```sh
# macOS ou Linux
node --test server.test.cjs
```

Resultado esperado: seis testes aprovados. Dois testes demonstram que a rota vulnerável permite leitura e atualização cruzadas; os testes seguintes mostram que a rota corrigida permite o próprio registro, nega o de outra conta e valida entrada e sessão.

Leia primeiro os testes como perguntas: qual identidade o servidor autenticou, qual objeto a URL pediu e qual regra deveria decidir o acesso? Antes de conferir a asserção, preveja a resposta HTTP e se o marcador de B aparecerá.

### 2. Observar o fluxo por HTTP (opcional)

Inicie o servidor no terminal da pasta:

```sh
node server.cjs
```

Saída esperada: `Laboratório local em http://127.0.0.1:4178 · dados apenas em memória.`

Em outro terminal, confira a falha com a identidade fictícia A pedindo o objeto B:

```sh
curl -i -H "Authorization: Bearer demo-token-a" http://127.0.0.1:4178/demo/vulnerable/progress/aluno-b
```

Resultado didático: `200 OK` e o marcador `PROGRESSO_FICTICIO_B`. A rota verificou que A tinha sessão, mas não verificou se A podia acessar aquele objeto.

Repita contra a versão corrigida:

```sh
curl -i -H "Authorization: Bearer demo-token-a" http://127.0.0.1:4178/demo/fixed/progress/aluno-b
```

Resultado esperado: `404 Not Found`, sem marcador de B. A mesma conta continua lendo `/demo/fixed/progress/aluno-a` com `200 OK`.

No PowerShell, se `curl` for um alias do PowerShell, use `curl.exe` ou faça o pedido por `Invoke-RestMethod`:

```powershell
$headersDemo = @{ Authorization = 'Bearer demo-token-a' }
Invoke-RestMethod -Headers $headersDemo -Uri 'http://127.0.0.1:4178/demo/vulnerable/progress/aluno-b'
```

O token acima é público e fictício, sem relação com Clerk. A chamada nunca sai do computador.

### 3. Entender a correção

A versão vulnerável procura a linha somente pelo ID escolhido no caminho. A versão corrigida autentica uma sessão fictícia e confere no servidor que o objeto solicitado pertence à identidade daquela sessão. Ela ignora qualquer `ownerId` enviado no corpo. O navegador continua podendo alterar URL e JSON; a decisão confiável acontece no servidor.

Em `learning_state`, o projeto real usa RLS: o banco compara o claim `sub` do token Clerk validado com `user_id`. A comparação deste laboratório representa apenas o caso de propriedade individual; a policy do banco é a fronteira de segurança real.

## Problemas comuns

- `node` não reconhecido: revise a instalação/PATH em `setup-node` e abra um terminal novo.
- `EADDRINUSE` ao iniciar: outra cópia do laboratório já usa a porta `4178`; encerre-a com `Ctrl+C`.
- `fetch failed` nos testes: confirme que o Node atende ao mínimo acima e que a execução local não está bloqueada por ferramenta de segurança.
- Resultado sem `PROGRESSO_FICTICIO_B`: confirme que usou o token sintético A e a rota `/demo/vulnerable/`; não remova a checagem da rota corrigida.

## Parar e retomar

Se iniciou o servidor, encerre-o com `Ctrl+C`. Ao reiniciar, as notas fictícias voltam ao estado original porque ficam somente na memória. Os testes sempre criam uma cópia nova; não deixam banco, arquivo de dados ou credencial local.

## Alternativa leve

Se não puder instalar Node agora, use a matriz da aula `delivery-owasp-top10` para traçar A→objeto B, escrever a regra que deveria ser aplicada e registrar o resultado esperado das rotas. Identifique essa atividade como análise conceitual, não como teste executado.

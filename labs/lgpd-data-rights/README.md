# Laboratório local — exportar, corrigir e eliminar dados fictícios

## Para que serve

Este laboratório mostra três operações de uma API sobre os dados de uma pessoa: consultar/exportar os próprios registros, corrigir o próprio e-mail de demonstração e eliminar o perfil junto com os itens de estudo relacionados. Ele complementa a aula **Dados pessoais: retenção e direitos do titular**; os conceitos, atividades e respostas da aula continuam completos sem executar este projeto.

O sistema usa somente recursos nativos do Node.js. Não instala pacotes, não abre conexão com Clerk, Supabase, PostgreSQL ou outro serviço, não recebe dados reais e não grava em disco. Dois perfis inventados começam na memória a cada execução. O servidor escuta apenas em `127.0.0.1`, acessível pela própria máquina. Encerrar e iniciar de novo restaura os exemplos.

> **Limite importante:** `demo-token-ana` e `demo-token-bruno` são valores públicos e fixos para ensinar o caminho da requisição. Qualquer pessoa que leia os arquivos pode usá-los. A verificação não é login, confirmação de identidade, autorização de produção nem prova de conformidade com a LGPD. Não adapte estes tokens para proteger dados reais.

O `DELETE` age imediatamente porque o cenário fictício não contém exceções de retenção nem destinos fora da memória. Em um produto real, não conecte um pedido diretamente a uma exclusão automática: confirme identidade e escopo, verifique regras e responsabilidades, trate cópias e exceções e registre a resposta de forma apropriada. A aula explica esse fluxo antes da prática técnica.

## O que você vai aprender

- **HTTP** é o protocolo de mensagens entre cliente e servidor. O cliente envia um método, um caminho, cabeçalhos e, às vezes, um corpo; o servidor devolve um código de status, cabeçalhos e uma resposta.
- Uma **rota** combina método e caminho. `GET /api/me/export` lê uma exportação; `PATCH /api/me/email` altera um campo; `DELETE /api/me` pede a remoção do perfil da demonstração.
- O cabeçalho `Authorization: Bearer ...` carrega o token fictício. O servidor encontra nele a identidade de demonstração. O cliente não escolhe o perfil por meio de `profileId` na URL ou no JSON.
- **JSON** é o formato textual usado no corpo e na resposta. Por exemplo, `{"email":"ana-nova@exemplo.test"}` é um objeto com uma propriedade `email`.
- **Validação** verifica se a entrada atende ao contrato mínimo antes de mudar o estado. `400` indica corpo ou valor inválido; `401`, ausência de token reconhecido; `404`, rota ou perfil inexistente; `413`, corpo acima de 4 KiB; `415`, tipo de conteúdo incorreto.
- **Estado em memória** existe enquanto este processo Node está ligado. Não é um banco durável, não replica a exclusão em sistemas externos e não testa prazo de backup, retenção, canal oficial ou identidade real.

## Pré-requisitos e início

Você precisa do Node.js já instalado e de um terminal. O curso ensina essa preparação em outra aula; não precisa instalar dependências neste laboratório.

No PowerShell, a partir da pasta raiz do repositório:

```powershell
node labs/lgpd-data-rights/server.cjs
```

No terminal macOS/Linux, o comando é o mesmo:

```sh
node labs/lgpd-data-rights/server.cjs
```

Saída esperada:

```text
Laboratório fictício disponível em http://127.0.0.1:4179
Dados em memória; pressione Ctrl+C para encerrar.
```

Mantenha essa janela aberta. Abra uma segunda janela do PowerShell para enviar requisições. Se a porta `4179` estiver ocupada, encerre o processo que a utiliza ou escolha outra porta nesta janela antes de iniciar:

```powershell
$env:PORT = "4180"
node labs/lgpd-data-rights/server.cjs
```

No macOS/Linux:

```sh
PORT=4180 node labs/lgpd-data-rights/server.cjs
```

Use então `http://127.0.0.1:4180` nos exemplos. Ao terminar, pressione `Ctrl+C` na janela do servidor. `PORT` altera somente a porta; o endereço continua limitado a `127.0.0.1`.

## Observe o exemplo antes de alterar dados

Consulte o perfil fictício de Ana:

```powershell
$ana = @{ Authorization = "Bearer demo-token-ana" }
Invoke-RestMethod -Uri "http://127.0.0.1:4179/api/me" -Headers $ana
```

O resultado contém `Ana Fictícia`, `ana@exemplo.test` e dois tópicos. Compare com Bruno:

```powershell
$bruno = @{ Authorization = "Bearer demo-token-bruno" }
Invoke-RestMethod -Uri "http://127.0.0.1:4179/api/me" -Headers $bruno
```

Bruno tem outro e-mail e outro tópico. Cada token é associado no servidor a um único perfil de teste. Sem cabeçalho ou com token inventado, a API responde `401` com uma mensagem genérica.

## Prática guiada

### 1. Exportar os próprios registros

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:4179/api/me/export" -Headers $ana
```

No macOS/Linux, a mesma leitura pode ser observada com `curl`:

```sh
curl -H 'Authorization: Bearer demo-token-ana' \
  http://127.0.0.1:4179/api/me/export
```

Observe que a resposta tem `format`, `profile` e `studyItems`. O servidor seleciona o perfil associado ao token e constrói a resposta a partir dele; não percorre a coleção completa de pessoas. A resposta `200` mostra que esta função de demonstração atendeu à requisição, mas não prova que exportou cópias de logs, fornecedores, backups ou outros sistemas.

### 2. Corrigir um campo

Preveja o resultado: qual endereço muda se Bruno enviar o próprio token, mas incluir `profileId: "person-ana"` no JSON? O servidor não usa esse campo; a identidade vem do token reconhecido.

Agora altere o e-mail de Ana:

```powershell
$body = @{ email = "ana-atualizada@exemplo.test" } | ConvertTo-Json
Invoke-RestMethod -Method Patch `
  -Uri "http://127.0.0.1:4179/api/me/email" `
  -Headers $ana `
  -ContentType "application/json" `
  -Body $body
```

No macOS/Linux, usando `curl`:

```sh
curl -X PATCH http://127.0.0.1:4179/api/me/email \
  -H 'Authorization: Bearer demo-token-ana' \
  -H 'Content-Type: application/json' \
  -d '{"email":"ana-atualizada@exemplo.test"}'
```

Leia a resposta e consulte `GET /api/me` novamente. O endereço mudou no perfil de Ana. O teste de formato é intencionalmente simples: um sistema real também confirma que a pessoa controla o novo endereço antes de usá-lo. O exemplo não registra canal, protocolo, agente destinatário, cópias externas ou evidência de produção.

### 3. Eliminar perfil e relações

Antes da chamada, exporte os dados. Depois, envie a exclusão:

```powershell
Invoke-RestMethod -Method Delete -Uri "http://127.0.0.1:4179/api/me" -Headers $ana
```

A resposta informa que o perfil e seus dois itens de estudo foram removidos da coleção em memória. Uma nova consulta com o token de Ana retorna `404`; Bruno continua acessível. O processo não tem tabelas externas, logs de auditoria ou backups: esse resultado prova somente a remoção deste estado local.

No macOS/Linux:

```sh
curl -X DELETE http://127.0.0.1:4179/api/me \
  -H 'Authorization: Bearer demo-token-ana'
```

Para repetir a demonstração desde o início, pare o servidor com `Ctrl+C` e inicie-o de novo. A memória vazia do processo anterior foi descartada; os dados iniciais fictícios são recriados.

### 4. Investigar respostas de erro

Tente uma requisição sem token: espere `401`. Tente corrigir sem JSON válido: espere `400`. Envie corpo maior que 4 KiB: espere `413`. Use `Content-Type: text/plain`: espere `415`. Uma falha de validação não deve alterar o e-mail.

Esses status são pistas diferentes para quem depura. Leia o corpo `error.code`, compare-o com a entrada enviada e forme uma hipótese antes de mudar o código. Não remova a validação só para fazer a chamada passar.

## Contrato das rotas

| Método e caminho | Efeito neste exemplo | Respostas principais |
|---|---|---|
| `GET /api/me` | Consulta o perfil ligado ao token fictício | `200`, `401`, `404` |
| `GET /api/me/export` | Cria JSON com perfil e itens da própria pessoa | `200`, `401`, `404` |
| `PATCH /api/me/email` | Valida e muda somente `email` do perfil autenticado | `200`, `400`, `401`, `404`, `413`, `415` |
| `DELETE /api/me` | Remove perfil e itens relacionados da memória | `200`, `401`, `404` |

O prefixo `/api` separa recursos da API. `me` significa “a identidade que o servidor associou à credencial apresentada”, não um identificador que o cliente pode trocar. `PATCH` indica mudança parcial. `DELETE` indica remoção no escopo do serviço. Os métodos ajudam a comunicar intenção, mas precisam de autorização e implementação correta no servidor.

## Testes reproduzíveis

Pare qualquer servidor que esteja rodando e, na raiz do repositório, execute:

```powershell
node --test labs/lgpd-data-rights/server.test.cjs
```

Os testes iniciam um servidor temporário em uma porta livre e verificam: escuta em loopback; rotas apresentadas; recusa de token ausente ou desconhecido; exportação isolada; correção vinculada ao token, mesmo com `profileId` alheio no corpo; recusas de tipo, JSON, e-mail e tamanho; remoção do perfil e dos itens relacionados; e bloqueio de nova consulta após a remoção.

Um teste automatizado comprova os casos preparados neste processo e com esses exemplos. Ele não substitui inspeção didática com aluno, revisão de arquitetura de produção, teste de navegador ou avaliação jurídica.

## Desafios com respostas para estudo

Tente responder antes de abrir as respostas.

1. **Prever:** se Ana usar o token de Bruno e mandar `profileId: "person-ana"`, qual perfil será alterado? O que no código demonstra isso?
2. **Alterar:** acrescente um teste para rejeitar e-mail com espaços e confirme que o valor anterior permanece.
3. **Construir:** descreva o que um sistema real precisaria inventariar além do perfil e dos tópicos antes de responder a um pedido de acesso ou exclusão.
4. **Investigar erro:** se `DELETE` devolver `200`, mas uma exportação previamente baixada continuar no computador, o que foi e não foi eliminado?

<details>
<summary>Respostas comentadas</summary>

1. Bruno será alterado, porque `findProfile` associa o token ao identificador interno no servidor e ignora `profileId` do JSON. Isso ilustra a regra de autorização que a demonstração quer ensinar; o token público não torna o exemplo seguro para produção.
2. Um teste envia o JSON com endereço contendo espaço, espera `400` e confere com `GET /api/me` que o endereço anterior não mudou. A rejeição precisa ocorrer antes da atribuição a `profile.email`.
3. Mapear fonte principal, relações, sistemas, compartilhamentos, arquivos, logs, exportações, cache, backups, responsáveis, finalidade e regra de conservação. Confirmar a identidade, o escopo e exceções com responsáveis; registrar lacunas e evidências. A resposta HTTP local não cobre esses destinos.
4. O perfil e os tópicos da memória do servidor foram removidos. O arquivo exportado no computador é uma cópia fora do estado da API e continua existindo; o laboratório não controla nem comprova a remoção de cópias externas.

</details>

## Próximo passo

Relacione cada efeito observado ao inventário de `INVENTORY.md`: fonte, relações, compartilhamentos, exportações, logs e backups. Em uma equipe real, confirme papéis, canal, identidade, prazo e retenção com as pessoas responsáveis antes de implementar. Não conecte este laboratório a contas, estudantes ou dados reais.

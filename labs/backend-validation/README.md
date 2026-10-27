# Laboratório: validação de entrada no servidor

**Objetivo:** enviar um estudo pela interface, observar a decisão da API e comprovar que pedidos inválidos não alteram a lista. Este laboratório usa Node.js nativo e guarda dados apenas na memória do processo. Reiniciar o servidor restaura os dois itens iniciais.

## Preparação

1. Conclua `setup-node`, `delivery-http` e `delivery-forms`. No editor, abra `labs/backend-validation` desta cópia do repositório.
2. Abra um terminal **nessa pasta**. Em Windows, macOS ou Linux, execute `node --version`; espere uma versão `v...`. Se o comando não existir, retome `setup-node` e abra outro terminal.
3. Execute `node server.cjs`; espere `Abra http://127.0.0.1:4179`. No navegador, abra esse endereço. A lista inicial mostra HTML e JavaScript.
4. Cadastre `CSS` no formulário. A aba Rede mostra `POST /api/estudos`, status `201` e um objeto JSON com `id` e `titulo`. A interface atualiza a lista. Pare com `Ctrl+C` no terminal e reinicie para confirmar que esta etapa ainda não possui banco de dados.

O navegador usa `required` e `maxlength` para orientar a pessoa. A API aplica suas próprias regras porque outros clientes podem enviar pedidos sem passar pelo formulário. Aceita apenas um objeto JSON com `titulo` textual de 1 a 80 caracteres depois de remover espaços externos. Responde `400` para JSON ou título inválido, `415` para tipo de mídia diferente e `201` quando cria o estudo. O servidor devolve mensagens curtas sem mostrar detalhes internos. Um corpo acima de 1024 bytes é recusado com `413`.

Se a porta estiver ocupada, encerre o processo anterior ou ajuste `4179` em `server.cjs` e na URL. Se a página abrir mas a lista não carregar, confira a aba Rede e o terminal. Para retomar, execute `node server.cjs` na mesma pasta. Não há pacote para instalar além de Node.js; funciona sem Docker ou servidor de banco.

## Prática

1. **Prever:** antes de executar, diga o que ocorre ao enviar `"   "` diretamente à API. Critério: observe status `400`, campo `erro` no JSON e lista ainda com dois itens. Não use apenas o formulário para este teste, pois ele pode bloquear o envio no navegador.
2. **Alterar:** reduza o limite de título para 40 caracteres no servidor e ajuste a orientação da interface. Critério: 40 caracteres são aceitos, 41 são recusados e o teste automatizado acompanha o novo contrato.
3. **Construir:** acrescente uma regra que recuse títulos duplicados, comparando depois de `trim()` sem distinguir maiúsculas de minúsculas. Critério: `HTML` já existe; ` html ` é recusado e não aumenta a lista; um título novo continua aceito. Escreva primeiro o resultado esperado.
4. **Investigar erro:** remova temporariamente a validação de tipo no servidor e envie `{"titulo":3}`. Observe a falha, localize a linha e restaure a checagem. Critério: o servidor volta a responder `400` sem criar registro, e o teste passa.

Execute os pedidos diretos no Console do navegador aberto em `http://127.0.0.1:4179`, por exemplo:

```js
fetch('/api/estudos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ titulo: '   ' })
}).then(async resposta => console.log(resposta.status, await resposta.json()));
```

Antes de ver o resultado, preveja status e efeito na lista. Faça cada alteração a partir de uma nova execução do servidor e registre pedido, status, corpo e quantidade de estudos antes e depois. A solução dos exercícios deve ser escrita pelo aluno; o servidor inicial demonstra o contrato básico.

## Testes e próximo passo

Em outro terminal, na mesma pasta, execute `node --test server.test.cjs`. O teste deve passar e verificar criação válida, pedidos inválidos e lista preservada após recusas. A próxima etapa separa validação, regra de negócio e acesso a dados, antes de substituir o array em memória por PostgreSQL.

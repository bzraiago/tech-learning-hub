# Laboratório: interface → HTTP → API

**Objetivo:** observar uma página que chama uma API local e explicar o método, a rota, o status e a resposta. Este laboratório usa Node.js com bibliotecas nativas. Os dois estudos ficam em memória: reiniciar o processo restaura a lista inicial.

## Preparação

1. Conclua `setup-node`, `delivery-http` e a parte de `fetch` em JavaScript. Na cópia deste repositório, abra a pasta `labs/backend-http` no editor.
2. Abra um terminal **nessa pasta**. No Windows (PowerShell), macOS ou Linux, digite `node --version`. Resultado esperado: uma versão `v...`. Se o comando não existir, retome `setup-node` e reabra o terminal.
3. Ainda nessa pasta, digite `node server.cjs`. Resultado esperado: `Abra http://127.0.0.1:4178`.
4. No navegador, abra `http://127.0.0.1:4178`. Resultado esperado: a lista mostra **HTML** e **JavaScript**; a mensagem anuncia **2 estudos encontrados.** Na aba Rede, confirme `GET /api/estudos`, status `200`, `Content-Type: application/json` e dois objetos no corpo.

**Preveja antes de testar:** o que `http://127.0.0.1:4178/inexistente` vai responder? Confira o status `404` e o JSON `{"erro":"Rota não encontrada"}`. Se a página estiver vazia, veja o Console e a aba Rede; confira se o processo continua ativo e se a URL usa a porta `4178`. Se a porta estiver ocupada, encerre o processo que a usa ou mude a porta em `server.cjs` e na URL. Para parar, volte ao terminal e pressione `Ctrl+C`; para retomar, execute `node server.cjs` na mesma pasta.

## Prática

1. **Prever:** antes de atualizar a página, anote quantas requisições a interface fará a `/api/estudos`. Critério: localizar na aba Rede pelo menos um GET com status 200 e explicar de onde vêm os títulos.
2. **Alterar:** adicione um estudo fictício ao array do servidor. Critério: após reiniciar, a página mostra três itens; o teste automatizado deve ser atualizado para o novo contrato. Exemplo: `{id:3,titulo:'CSS'}` → **CSS** na lista.
3. **Construir:** crie a rota `GET /api/saude` com JSON `{"ok":true}`. Critério: `/api/saude` retorna 200 e `/inexistente` continua 404.
4. **Investigar erro:** troque temporariamente a rota do `fetch` por `/api/ausente`. Critério: a página mostra mensagem de erro, a aba Rede mostra 404 e, depois da correção, a lista volta. Explique por que um status 404 não deve ser tratado como lista vazia.

Depois de alguns dias, refaça o fluxo com uma coleção diferente, sem consultar este arquivo: por exemplo, livros com `id` e `titulo`. Explique por que a página e a API usam a mesma origem. Marcar a aula como concluída registra acompanhamento; conseguir reconstruir e explicar o fluxo em outro contexto demonstra a habilidade.

## Testes e próximo passo

Em outro terminal, na mesma pasta, execute `node --test server.test.cjs`. Resultado esperado: **1 teste aprovado**, com verificações de página, JSON e rota ausente. Não precisa instalar pacotes, banco ou serviço externo; o laboratório roda em computador limitado. Este exemplo só lê dados fixos. A próxima etapa é `labs/backend-validation/README.md`, que ensina validação no servidor antes da persistência em PostgreSQL.

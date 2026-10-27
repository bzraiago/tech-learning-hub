# Laboratório: validação, regra de negócio e acesso a dados

**Objetivo:** acompanhar um pedido desde a rota HTTP até o armazenamento e identificar qual camada deve responder por cada decisão. O servidor usa apenas Node.js nativo. O repositório guarda dados em memória; reiniciar o processo restaura HTML e JavaScript.

## Preparação

1. Conclua `setup-node`, `delivery-http` e `labs/backend-validation/README.md`. No editor, abra a pasta `labs/backend-layers` desta cópia do repositório.
2. Abra um terminal **nessa pasta** e execute `node --version`; espere uma versão `v...`. Depois execute `node server.cjs`; espere `Abra http://127.0.0.1:4180`.
3. Abra o endereço no navegador. Cadastre `CSS` e confirme a resposta de criação. Atualize a página: os três itens continuam listados enquanto o mesmo processo Node estiver ativo. Pare com `Ctrl+C` e retome pelo mesmo comando.

## Mapa das camadas

| Parte | Responsabilidade | Onde conferir |
|---|---|---|
| HTTP | Lê método, rota e corpo; escolhe status e resposta JSON | `server.cjs` |
| Validação | Confere formato e tipo do pedido e produz um título limpo | `src/validar-estudo.cjs` |
| Regra de negócio | Compara títulos sem diferenciar maiúsculas e decide se há duplicidade | `src/regra-titulo.cjs` e `src/servico-estudos.cjs` |
| Acesso a dados | Lista, procura e insere sem decidir se o pedido é válido | `src/repositorio-estudos-memoria.cjs` |

O serviço coordena validação, regra e repositório. O servidor não consulta ou altera a lista diretamente. O repositório em memória demonstra a fronteira de acesso aos dados, mas não sobrevive ao encerramento do processo e ainda não é PostgreSQL.

## Prática

Antes de cada pedido, preveja status, resposta e quantidade de estudos. Use o Console do navegador em `http://127.0.0.1:4180`:

```js
fetch('/api/estudos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ titulo: ' css ' })
}).then(async resposta => console.log(resposta.status, await resposta.json()));
```

1. **Prever:** envie `CSS` depois de criar `CSS`. Critério: prever `409`, localizar a resposta na aba Rede e conferir que a lista não cresceu.
2. **Alterar:** ajuste a validação para aceitar títulos de até 40 caracteres. Critério: um título com 40 é aceito e com 41 é recusado; indique qual arquivo trata a forma do pedido.
3. **Construir:** acrescente uma regra para recusar títulos iguais ignorando espaços nas pontas e maiúsculas. Critério: ` HTML ` é duplicado de HTML; título novo ainda pode ser cadastrado. Mantenha a comparação na regra de negócio, não na rota HTTP.
4. **Investigar erro:** faça a rota chamar o repositório diretamente e insira um pedido com `titulo` numérico. Observe a falha e corrija o fluxo para validar antes de acessar os dados. Critério: a API responde `400`, a lista não muda e o repositório continua sem conhecer o formato HTTP.

Confira também a lista inicial com GET e o JSON de erro da rota ausente. O navegador apresenta textos com `textContent`. Não use `innerHTML` para mostrar títulos recebidos da API. Os dados são fictícios e locais; não coloque credenciais ou dados pessoais no laboratório.

## Próxima etapa

Em cada mudança, anote a camada editada, o pedido observado, o status e o estado da lista antes e depois. Para conferir a regra de negócio isolada do servidor, abra outro terminal nesta pasta e execute `node --test src/regra-titulo.test.cjs`. Resultado esperado: três testes aprovados, cobrindo normalização, título duplicado e título novo. Os testes usam uma função simulada para responder à busca; ainda não são testes de integração com banco.

O esquema inicial que será usado na próxima etapa está em `migrations/001_create_estudos.sql`: a tabela separa o título exibido do valor canônico usado na regra de unicidade. A próxima etapa conecta um repositório PostgreSQL mantendo o contrato da API e orienta como aplicar esse esquema no banco de laboratório.

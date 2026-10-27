# Laboratório: investigar um defeito em código existente

## Objetivo

Reproduzir um comportamento inesperado numa pequena função escrita por outra pessoa, comparar o resultado real com o contrato, corrigir a causa e manter um teste de regressão.

## Pré-requisitos

- Conclua `setup-node` e a aula `quality-debug`.
- Abra `labs/bug-investigation` no editor e no terminal.
- Confira `node --version`. O runtime Node.js já inclui `node:test` e `assert/strict`; este laboratório não instala pacotes.

## O relato

> Ao pedir uma lista em ordem alfabética para uma prévia, a tela que mantém a lista original também muda de ordem. O contrato pede que a função devolva os estudos ordenados e preserve a lista recebida.

Use apenas estes dados fictícios. Antes de abrir a implementação, anote a entrada, o resultado esperado e o resultado que você prevê observar. Não altere o teste para fazê-lo passar.

## Reproduza antes de corrigir

No terminal em `labs/bug-investigation`, execute:

```sh
node --test test/ordenar-estudos.test.cjs
```

Resultado esperado inicial: o teste que verifica a ordem alfabética passa e o teste que verifica a preservação da entrada falha. A falha informa que a função devolveu a mesma lista recebida. Isso reproduz o defeito antes de qualquer alteração.

Leia `test/ordenar-estudos.test.cjs` para entender a expectativa. Depois inspecione `src/ordenar-estudos.cjs` no editor e escreva uma hipótese sobre a operação que muda a entrada. Se precisar, execute o teste novamente e compare os valores antes e depois da chamada.

## Corrija e proteja o comportamento

Altere somente `src/ordenar-estudos.cjs` para que a função ordene uma nova lista. Preserve a lista recebida, mantenha a ordem alfabética e não remova nem enfraqueça as afirmações do teste.

Execute novamente `node --test test/ordenar-estudos.test.cjs`.

Resultado esperado depois da correção: dois testes aprovados e nenhuma falha. Acrescente mais um caso que ajude a proteger a regra, como uma lista vazia ou uma lista que já esteja em ordem; registre por que esse caso é útil e rode a suíte outra vez.

## Registre a investigação

Escreva no seu caderno ou no rascunho:

1. Os passos e dados mínimos que reproduziram o defeito.
2. O resultado esperado e o observado antes da correção.
3. A hipótese, a evidência que confirmou a causa e a mudança feita.
4. O comando executado, os resultados depois da correção e o limite que ainda não foi verificado.

## Critérios de aceite

- O teste falha antes da correção e passa depois dela.
- A função devolve os títulos `CSS`, `HTML`, `JavaScript` nessa ordem.
- A lista recebida permanece na ordem original e é um objeto diferente da lista devolvida.
- O relatório separa observação, hipótese e causa confirmada.
- Nenhum teste foi removido para esconder o defeito.

## Problemas comuns

| Sintoma | O que conferir |
|---|---|
| `node` não é reconhecido | Retome `setup-node`, abra um terminal novo e confira `node --version`. |
| Todos os testes passam antes de editar | Confirme que abriu a pasta correta e que o teste de preservação ainda contém suas afirmações. Não prossiga até reproduzir a falha. |
| A ordem fica correta, mas o teste continua falhando | Compare identidade e conteúdo das duas listas; o contrato exige uma nova lista e entrada preservada. |
| A correção passa localmente, mas não explica o sintoma | Repita o caso mínimo e descreva a operação que alterava a entrada, sem atribuir a causa apenas ao nome da função. |

Para parar, use `Ctrl+C` se houver algum processo em execução. Para retomar, abra esta mesma pasta e rode o comando de teste novamente. Nenhum servidor, conta, banco ou dado externo é usado.

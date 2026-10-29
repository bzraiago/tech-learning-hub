# Laboratório: leia um projeto antes de alterar

## Objetivo

Encontrar o ponto de entrada de um programa com vários arquivos, seguir o caminho dos dados até uma regra, reproduzir um defeito e corrigi-lo sem enfraquecer os testes existentes.

## Pré-requisitos e preparação

- Conclua a preparação do Node.js e a aula `quality-review`.
- Node.js 20.6 ou posterior; o laboratório usa apenas módulos nativos e dados fictícios.
- Abra a raiz do repositório no editor. No terminal, entre em `labs/project-reading`.
- Verifique no terminal: `node --version`. A saída deve ser `v20.6.0` ou uma versão posterior.

No PowerShell, Prompt de Comando, Terminal do macOS ou Linux, a partir da raiz do repositório:

```sh
cd labs/project-reading
```

Não há servidor nem dependências para instalar. Cada comando termina sozinho. Se um comando ficar preso, interrompa com `Ctrl+C`; para retomar, execute o comando novamente dentro de `labs/project-reading`.

## Mapa inicial

```text
labs/project-reading/
├── README.md
├── src/
│   ├── data/sessions.cjs
│   ├── format.cjs
│   ├── index.cjs
│   └── report.cjs
└── test/report.test.cjs
```

O relato é: “O relatório mostra 37,5 minutos, mas as sessões concluídas somam 75”. Antes de abrir os arquivos, registre o que você prevê que `node src/index.cjs` mostrará e o motivo.

## Encontre o caminho de execução

1. Procure o comando que o README manda executar e identifique `src/index.cjs` como ponto de entrada: é o arquivo executado diretamente pelo Node.
2. Abra `src/index.cjs` e trace cada `require`: de onde vêm as sessões, qual função monta o relatório e quem formata a saída.
3. Compare `src/data/sessions.cjs`, `src/report.cjs` e `test/report.test.cjs`. Anote o contrato sem editar o teste: contar somente sessões `completed`, somar seus minutos e retornar zero se nenhuma estiver concluída.
4. Registre o caminho em uma linha: entrada → dados → regra → apresentação.

Resultado esperado da inspeção: `index.cjs` inicia o fluxo, `sessions.cjs` fornece três registros fictícios, `report.cjs` calcula os totais e `format.cjs` apresenta o resultado. O teste da soma é a evidência executável do contrato.

## Reproduza, corrija e confira

Ainda em `labs/project-reading`, execute:

```sh
node --test test/report.test.cjs
```

Antes da correção, dois testes passam e o teste da soma falha: o observado é `37.5`, enquanto o esperado é `75`. A saída indica o arquivo e a asserção que permitem localizar a divergência. Não altere nem apague testes para esconder a falha.

Faça uma hipótese sobre `src/report.cjs` e altere somente esse arquivo. Preserve a contagem de sessões concluídas e o caso sem sessões concluídas. Depois rode de novo o teste e o ponto de entrada:

```sh
node --test test/report.test.cjs
node src/index.cjs
```

Resultado esperado: os três testes passam; o relatório mostra duas sessões concluídas e 75 minutos. A correção muda a regra defeituosa sem trocar o contrato ou os dados de teste.

## Transferência

Como nova necessidade, inclua em `src/data/sessions.cjs` uma sessão fictícia concluída de 15 minutos. Antes de executar, preveja a contagem e o total. Depois execute `node src/index.cjs` e explique por que uma sessão `paused` continua fora do relatório. Não precisa mudar os testes ou a regra para esta transferência.

## Evidências e critérios de aceite

Registre no caderno:

1. Ponto de entrada e sequência de arquivos percorrida.
2. Esperado, observado e saída do teste antes da correção.
3. Hipótese, evidência que confirmou a causa e arquivo alterado.
4. Resultado dos três testes e da execução do programa depois da correção.
5. Previsão e resultado da sessão adicional; limite que ainda não foi verificado.

O laboratório está concluído quando a sequência de execução é explicada, o teste demonstra falha antes e aprovação depois, a correção fica concentrada em `report.cjs`, e as sessões pausadas não entram no total. Isso exercita leitura e diagnóstico, mas não comprova por si só domínio de manutenção em projetos maiores.

## Alternativa sem executar

Sem computador, desenhe a sequência `index.cjs → sessions.cjs/report.cjs → format.cjs`, calcule 40 + 35 e compare 75 com o valor relatado de 37,5. Registre uma hipótese e a evidência que pediria a outra pessoa para executar. Esta análise conceitual não substitui a reprodução automatizada.

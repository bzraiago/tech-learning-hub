'use strict';

// Guias detalhados da trilha JavaScript.
Object.assign(LESSON_GUIDES, {
"js-values": {
    "prerequisites": "HTML básico: documento, elemento, atributo id e texto. Não é necessário conhecimento anterior de programação.",
    "setup": "Crie uma pasta javascript-estudos e salve o exemplo completo em um arquivo .html, usando texto simples e UTF-8. Abra-o no navegador; não precisa de biblioteca, servidor, conta ou conexão. A cada mudança, salve e atualize a página. Abra as ferramentas do desenvolvedor pelo menu do navegador e selecione Console para ver mensagens e erros. Nos exercícios, substitua somente o conteúdo do script, mantendo o documento e o pre com id=\"saida\". Para exibir um resultado use document.getElementById(\"saida\").textContent = String(resultado); essa linha localiza o pre e coloca texto nele, sem interpretar HTML. Não cole as tags script dentro de outro script. Se o resultado não mudar, confira primeiro o arquivo aberto e se houve erro no Console.",
    "why": "HTML descreve o conteúdo, CSS sua apresentação e JavaScript executa instruções. Um total de compra, uma regra de aprovação ou um contador exigem valores e operações. Antes de construir botões, precisamos saber o que o programa recebe e produz. A meta desta aula é conseguir explicar cada valor de um cálculo, prever seu tipo e reconhecer quando uma entrada não pode virar o número esperado.",
    "sections": [
      {
        "title": "Onde o programa começa",
        "paragraphs": [
          "Um programa é uma sequência de instruções. O navegador lê o HTML e executa o JavaScript encontrado em script. Nosso script fica depois do pre: quando a instrução procura esse elemento, ele já existe. pre preserva quebras de linha. A expressão document.getElementById(\"saida\") encontra o elemento cujo id é saida; atribuir sua propriedade textContent substitui o texto mostrado. Por enquanto use essa linha como uma saída, assim como a tela de uma calculadora.",
          "Console.log(valor) seria incorreto: os nomes diferenciam maiúsculas de minúsculas. A grafia é console.log(valor). Ela registra um valor no Console das ferramentas do desenvolvedor, não na página. Abra esse painel e observe mensagens ao atualizar. Uma instrução inválida pode interromper o restante do script. Leia o primeiro erro e a linha indicada antes de alterar outras partes. Comentários começam com // até o fim da linha ou ficam entre /* e */.",
          "O código também pode morar em app.js. Nesse caso retire as tags script do arquivo JavaScript e inclua no head do HTML \u003cscript src=\"app.js\" defer>\u003c/script>. defer adia a execução de um script clássico externo até a análise do documento terminar, mantendo a ordem entre esses scripts. Ele não tem esse efeito em script clássico inline. Aqui usaremos o script ao fim do body para manter os exemplos em um só arquivo.",
          "Pausa de prática: antes de atualizar a página, preveja em qual lugar aparecerá um console.log e em qual aparecerá uma atribuição a textContent. Execute e compare a página com o Console."
        ]
      },
      {
        "title": "Nomes para valores: const e let",
        "paragraphs": [
          "const preco = 12 cria um nome associado ao número 12. O sinal = atribui; não pergunta se duas coisas são iguais. Use nomes que expliquem o papel do dado, como quantidade, em vez de a. const exige um valor inicial e impede reatribuir esse nome. let permite reatribuição: let visitas = 0; visitas = visitas + 1; termina em 1. Evite var neste início porque suas regras de escopo são diferentes.",
          "A expressão à direita é avaliada antes da atribuição. Portanto visitas = visitas + 1 não é uma equação matemática: lê o valor antigo, soma um e guarda o novo. Declare antes de usar. let e const são restritos ao bloco delimitado por chaves em que foram declarados; um nome criado dentro de um bloco não fica automaticamente disponível fora. Strings e números podem ser associados a um let em momentos diferentes, mas manter um significado e tipo coerentes facilita compreender o código.",
          "Pausa de prática: escreva no papel os valores de visitas após let visitas = 0 e duas execuções de visitas = visitas + 1; depois confira no Console."
        ]
      },
      {
        "title": "Tipos e operações",
        "paragraphs": [
          "Uma string é texto entre aspas simples, duplas ou crases. Um number representa números como 12 ou 2.5; no código a separação decimal usa ponto. Um boolean é true ou false, sem aspas. typeof valor informa uma categoria como \"number\" ou \"string\". JavaScript possui ainda bigint e symbol, que não serão necessários nestes exercícios. Objetos e arrays serão estudados em uma aula própria.",
          "Os operadores +, -, *, / e % fazem soma, subtração, multiplicação, divisão e resto. Parênteses tornam a intenção explícita: (2 + 3) * 4 resulta em 20; 2 + 3 * 4 resulta em 14. Com texto, + concatena: \"2\" + 3 resulta em \"23\". Não suponha que o computador adivinhará que você queria somar. Use números para o cálculo e transforme em texto apenas ao apresentar.",
          "Uma template literal usa crases e insere expressões com ${expressao}: `Total: ${total}`. O trecho entre chaves é avaliado, enquanto o restante é texto. Strings oferecem recursos como trim(), que devolve uma versão sem espaços nas extremidades. Valores numéricos usam representação de ponto flutuante; algumas frações decimais não são exatas. Para estes preços simples, trabalharemos em centavos inteiros e evitaremos confundir formatação com precisão financeira.",
          "Pausa de prática: preveja o valor e o tipo de \"2\" + 3 e de Number(\"2\") + 3. Execute no Console e localize a operação que mudou o tipo."
        ]
      },
      {
        "title": "Ausência, conversão e comparação",
        "paragraphs": [
          "undefined normalmente significa que um valor ainda não foi atribuído ou uma informação não existe. null pode representar ausência intencional, como nenhum item selecionado. São valores diferentes e ambos são diferentes de \"\", uma string existente porém vazia. typeof null devolve \"object\" por uma peculiaridade histórica; para detectar null compare diretamente com null.",
          "Number(\"3\") produz 3, mas Number(\"três\") produz NaN, um valor numérico especial que sinaliza resultado inválido. Use Number.isNaN(valor) para verificar NaN; NaN === NaN é false. Number.isFinite(valor) aceita somente números finitos, excluindo NaN e Infinity. Number(\"\") e Number(\"   \") resultam em zero. Por isso, quando vazio é inválido, verifique o texto com trim() antes de convertê-lo. Na próxima aula transformaremos essas verificações em decisões.",
          "String(42) produz \"42\" e Boolean(0) produz false. Valores falsy são os que uma condição considera falsos: false, 0, -0, 0n, string vazia, null, undefined e NaN. Uma string contendo \"false\" ou \"0\" é truthy porque não está vazia. Conversão lógica não interpreta palavras humanas. Isso será importante quando um campo ou arquivo trouxer texto.",
          "Use === para igualdade estrita e !== para diferença estrita. \"3\" === 3 é false porque os tipos diferem. == pode converter tipos antes de comparar, o que dificulta prever regras para iniciantes; prefira converter explicitamente e depois comparar com ===. Os operadores >, >=, \u003c e \u003c= expressam limites. quantidade >= 1 significa pelo menos uma unidade, incluindo o próprio valor 1.",
          "Antes de executar um trecho, escreva sua previsão de valor e tipo. Depois compare com console.log(resultado, typeof resultado). Quando houver diferença, localize a primeira conversão ou operação que mudou sua expectativa. Essa rotina é mais útil do que apenas copiar uma saída correta: ela constrói um modelo de como a linguagem avalia cada expressão.",
          "Pausa de prática: preveja Number(\"\"), Number(\"três\") e \"3\" === 3; execute cada expressão no Console e explique o primeiro resultado diferente da sua previsão."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>JavaScript do zero: execução, valores e conversões\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>JavaScript do zero: execução, valores e conversões\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst produto = \"Caderno\";\nconst precoCentavos = 1250;\nconst entradaQuantidade = \"3\";\nconst quantidade = Number(entradaQuantidade);\nconst totalCentavos = precoCentavos * quantidade;\nlet visitas = 0;\nvisitas = visitas + 1;\nconst mensagem = `${produto}: ${quantidade} unidades\nTotal: ${totalCentavos} centavos\nVisitas: ${visitas}`;\ndocument.getElementById(\"saida\").textContent = mensagem;\nconsole.log(quantidade, typeof quantidade);\nconsole.log(\"3\" === 3, Number(\"3\") === 3);\nconsole.log(Number.isNaN(Number(\"três\")));\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O preço em centavos permanece inteiro e a quantidade chega como texto para tornar a conversão visível.",
        "Number converte a string \"3\" antes da multiplicação; typeof quantidade deve mostrar number.",
        "const protege os nomes dos dados fixos contra reatribuição; visitas usa let porque recebe novo valor.",
        "A template literal junta três linhas de apresentação. textContent insere esse texto como texto.",
        "O Console compara igualdade com e sem conversão explícita e identifica a entrada inválida."
      ],
      "expected": "Na página: Caderno: 3 unidades, Total: 3750 centavos e Visitas: 1, em três linhas. No Console: 3 number; false true; true."
    },
    "guided": [
      {
        "instruction": "Troque a entradaQuantidade por \"4\" e preveja o total antes de atualizar.",
        "result": "O total passa a 5000 centavos."
      },
      {
        "instruction": "Troque apenas essa entrada por \"quatro\" e observe página e Console.",
        "result": "A quantidade e o total tornam-se NaN; a interface ainda não trata o erro."
      },
      {
        "instruction": "Restaure \"3\" e compare no Console \"\" === \" \" e Number(\"\") === 0.",
        "result": "As expressões resultam em false e true, mostrando por que validar vazio é diferente de converter."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, anote o total e o tipo do resultado ao multiplicar 1800 centavos por uma quantidade recebida como \"2\" depois de convertê-la. Então calcule o total de dois ingressos e mostre na página.",
        "hints": [
          "Declare preço e entrada com const.",
          "Converta com Number antes do cálculo."
        ],
        "solution": "const preco = 1800;\nconst entrada = \"2\";\nconst total = preco * Number(entrada);\ndocument.getElementById(\"saida\").textContent = `Total: ${total} centavos`;",
        "explanation": "Os dados de entrada têm papéis separados. A conversão fica explícita e a apresentação só ocorre depois de calcular. Confira também typeof total no Console.",
        "expected": "A previsão é anotada antes da conversão; a página e typeof permitem conferir o total calculado e seu tipo.",
        "criteria": ["Previsão registrada antes da conversão e execução.","Total exibido e tipo conferido com typeof."]
      },
      {
        "prompt": "Alterar: no script do exemplo, substitua temporariamente as expressões do Console por \"5\" + 2, Number(\"5\") + 2 e Boolean(\"false\"). Registre a previsão de resultado e tipo antes de executar, depois restaure o script.",
        "hints": [
          "O operador + pode concatenar.",
          "Texto não vazio é truthy, independentemente da palavra."
        ],
        "solution": "console.log(\"5\" + 2, typeof (\"5\" + 2));\nconsole.log(Number(\"5\") + 2, typeof (Number(\"5\") + 2));\nconsole.log(Boolean(\"false\"), typeof Boolean(\"false\"));",
        "explanation": "A primeira operação continua textual; a segunda passa a numérica porque converteu a entrada. A terceira verifica se há texto e não interpreta a palavra false.",
        "expected": "As previsões de valor e tipo são registradas primeiro; depois, compare as expressões no Console e restaure o script.",
        "criteria": ["Valor e tipo previstos para cada expressão antes de rodar.","Resultados comparados com o Console e script original restaurado."]
      },
      {
        "prompt": "Construir: uma meta é estudar 120 minutos. Você estudou \"35\" minutos de manhã e \"25\" à noite. Calcule o total, quanto falta e se a meta já foi atingida. Mostre os três resultados.",
        "hints": [
          "Converta cada entrada antes de somar.",
          "Compare total >= meta e use uma template literal."
        ],
        "solution": "const meta = 120;\nconst total = Number(\"35\") + Number(\"25\");\nconst falta = meta - total;\nconst atingiu = total >= meta;\ndocument.getElementById(\"saida\").textContent = `Total: ${total}\nFaltam: ${falta}\nMeta atingida: ${atingiu}`;",
        "explanation": "Calcular e comparar são operações distintas. Com os dados propostos ainda faltam 60 minutos; na próxima aula aprenderemos a impedir uma mensagem de minutos negativos quando a meta for ultrapassada.",
        "expected": "Total: 60; Faltam: 60; Meta atingida: false.",
        "criteria": ["Cálculo usa os dois valores recebidos para total e diferença.","Página mostra total, restante e estado da meta calculados."]
      },
      {
        "prompt": "Investigar erro: const pontos = \"10\"; pontos = pontos + 5; deveria produzir 15. Leia o primeiro erro no Console, explique também o que aconteceria ao trocar apenas const por let e corrija as duas causas.",
        "hints": [
          "const não aceita reatribuição.",
          "Mudar const para let ainda deixa uma concatenação."
        ],
        "solution": "let pontos = Number(\"10\");\npontos = pontos + 5;\ndocument.getElementById(\"saida\").textContent = String(pontos);",
        "explanation": "A correção precisa permitir a reatribuição e transformar o valor inicial em número. Resolva uma causa de cada vez e atualize a página, pois o erro original interrompia o script.",
        "expected": "A correção resolve a reatribuição indevida e a concatenação de tipos; a página exibe um total numérico.",
        "criteria": ["Diagnóstico separa reatribuição de const e concatenação de texto.","Correção produz número e não deixa erro no Console."]
      }
    ],
    "mistakes": [
      "Usar = para comparar altera o dado; use === quando pretende testar igualdade.",
      "Escrever 2,5 como decimal não representa 2.5 no código; use ponto e deixe a formatação local para apresentação.",
      "Tratar texto vazio como quantidade zero aceita uma ausência indevida; confira trim() antes de Number.",
      "Repetir nomes const no mesmo script gera erro de sintaxe; substitua o trecho do exercício em vez de empilhar todas as soluções."
    ],
    "quiz": [
      {
        "question": "Qual expressão soma numericamente o texto \"8\" com 2?",
        "options": [
          "\"8\" + 2",
          "Number(\"8\") + 2",
          "String(8) + 2"
        ],
        "correctIndex": 1,
        "explanation": "Number produz um número antes da soma; as outras expressões concatenam texto."
      },
      {
        "question": "Qual é o resultado de Boolean(\"false\")?",
        "options": [
          "false",
          "true",
          "undefined"
        ],
        "correctIndex": 1,
        "explanation": "É uma string não vazia, portanto truthy. Não há interpretação da palavra."
      },
      {
        "question": "Como detectar uma conversão que produziu NaN?",
        "options": [
          "valor === NaN",
          "typeof valor === \"NaN\"",
          "Number.isNaN(valor)"
        ],
        "correctIndex": 2,
        "explanation": "NaN não é igual a si mesmo e typeof NaN é number. A verificação específica evita essas armadilhas."
      }
    ],
    "summary": [
      "Execute, observe o tipo e compare o resultado com sua previsão.",
      "Use const por padrão e let quando a reatribuição fizer parte da regra.",
      "Converta explicitamente e diferencie ausência, vazio, zero e entrada inválida."
    ]
  },
"js-flow": {
    "prerequisites": "Aula de valores: const/let, conversão Number, comparações estritas e saída em textContent.",
    "setup": "Crie uma pasta javascript-estudos e salve o exemplo completo em um arquivo .html, usando texto simples e UTF-8. Abra-o no navegador; não precisa de biblioteca, servidor, conta ou conexão. A cada mudança, salve e atualize a página. Abra as ferramentas do desenvolvedor pelo menu do navegador e selecione Console para ver mensagens e erros. Nos exercícios, substitua somente o conteúdo do script, mantendo o documento e o pre com id=\"saida\". Para exibir um resultado use document.getElementById(\"saida\").textContent = String(resultado); essa linha localiza o pre e coloca texto nele, sem interpretar HTML. Não cole as tags script dentro de outro script. Se o resultado não mudar, confira primeiro o arquivo aberto e se houve erro no Console.",
    "why": "Um programa útil precisa escolher o que fazer com dados diferentes. Também precisa repetir trabalho sem copiar instruções. Vamos construir um relatório de sessões de estudo e aprender a testar a regra nos valores que costumam revelar defeitos: zero, exatamente o limite e um valor acima dele. Antes de escrever o código, descreva em português as decisões e a condição de parada.",
    "sections": [
      {
        "title": "Decidir com condições simples e combinadas",
        "paragraphs": [
          "if (condicao) { instrucoes } executa o bloco apenas se a condição for truthy. else fornece o caminho alternativo. Em if (minutos >= 30), o número 30 pertence ao caminho verdadeiro; minutos > 30 excluiria esse limite. Use chaves mesmo para uma instrução: elas tornam o bloco visível e evitam que uma alteração posterior fique fora da condição por acidente.",
          "else if permite verificar outra condição quando a anterior falhou. A ordem importa: em uma classificação por pontuação, verificar primeiro pontos >= 50 antes de pontos >= 90 faz o segundo caso ficar inacessível para quem tem 90. Organize do mais específico para o mais amplo ou escreva intervalos claros. Apenas um ramo de uma cadeia if/else if/else é executado. Dois if independentes podem executar ambos.",
          "A regra precisa definir o que acontece com entrada inválida antes de classificá-la. Um texto vazio não deve virar zero por acidente; uma quantidade negativa não deve entrar em uma contagem de sessões. Validar é decidir se o dado atende ao contrato. Aqui exigiremos um número inteiro entre 1 e 7, usando Number.isInteger para excluir frações e também NaN.",
          "&& significa que os dois lados precisam ser truthy para uma condição composta ser verdadeira. || aceita pelo menos um lado truthy e ! inverte a interpretação lógica. Para sessões válidas, Number.isInteger(sessoes) && sessoes >= 1 && sessoes \u003c= 7 descreve três exigências simultâneas. Leia a expressão em voz alta e use parênteses quando combinar operadores diferentes.",
          "Esses operadores fazem curto-circuito: && não avalia o lado direito quando o esquerdo já é falsy; || não avalia o direito quando o esquerdo já é truthy. Eles devolvem um dos valores avaliados, não necessariamente um boolean. Em uma condição isso é interpretado logicamente, mas fora dela não presuma que o resultado será true ou false. Boolean(expressao) pode tornar explícita essa conversão.",
          "Como aprofundamento, uma escolha simples de valor pode usar o condicional ternário: condicao ? valorSeVerdadeiro : valorSeFalso. const mensagem = minutos >= 30 ? \"Meta atingida\" : \"Continue\" é uma alternativa curta a atribuir nos dois ramos. Evite ternários aninhados: uma regra com várias etapas costuma ficar mais legível usando if. Clareza é mais importante do que reduzir linhas.",
          "Pausa de prática: antes de executar, preveja o resultado para 0, 1, 7 e 8 sessões na condição de validade. Escreva qual comparação rejeita cada valor inválido e confira no Console."
        ]
      },
      {
        "title": "Repetir com for",
        "paragraphs": [
          "for (let dia = 1; dia \u003c= 3; dia += 1) tem inicialização, condição e atualização. Primeiro cria dia igual a 1. Antes de cada volta testa dia \u003c= 3. Se verdadeiro, executa o corpo; depois soma um. Os valores usados no corpo são 1, 2 e 3. Quando dia chega a 4, o teste falha e o laço termina. dia += 1 é uma forma curta de dia = dia + 1.",
          "Um acumulador guarda um resultado que cresce a cada volta. Declare let total = 0 antes do laço e use total += minutosPorSessao dentro dele. Se reiniciar total dentro do corpo, cada volta apaga a anterior. Uma string também pode acumular linhas: relatorio += `Dia ${dia}\n`. A sequência \n dentro da string representa uma quebra de linha; pre preserva essa quebra na tela.",
          "Faça uma tabela de rastreamento com colunas volta, dia, total antes e total depois. Para três sessões de 20 minutos, os totais depois são 20, 40 e 60. Essa simulação manual revela se a condição deve usar \u003c ou \u003c=. A contagem de elementos de uma coleção começará em zero em uma aula futura; aqui os dias começam em um por escolha do problema.",
          "Pausa de prática: preencha a tabela para duas sessões antes de executar o for. Compare cada valor de dia e total com a saída e localize a primeira divergência."
        ],
        "trace": {
          "title": "Rastreamento do for: 3 sessões de 20 minutos",
          "columns": ["Teste", "dia", "total antes", "Ação", "total depois"],
          "rows": [
            ["1 ≤ 3: sim", "1", "0", "somar 20", "20"],
            ["2 ≤ 3: sim", "2", "20", "somar 20", "40"],
            ["3 ≤ 3: sim", "3", "40", "somar 20", "60"],
            ["4 ≤ 3: não", "4", "60", "parar", "60"]
          ]
        }
      },
      {
        "title": "while, parada e desvios",
        "paragraphs": [
          "while (condicao) testa antes de cada repetição e é útil quando o número de voltas não está diretamente escrito no cabeçalho. let falta = 3; while (falta > 0) { falta -= 1; } termina em zero. O corpo precisa provocar uma mudança que aproxime a condição de falsa. Se esquecer a atualização, pode bloquear a aba em um laço infinito; feche a aba se necessário e corrija o arquivo antes de reabrir.",
          "Como aprofundamento, do { ... } while (condicao) executa pelo menos uma vez, porque testa no final. break encerra o laço atual; continue pula o restante da volta atual. Em while, colocar continue antes da atualização pode impedir o avanço e criar um laço infinito. Nos primeiros exercícios prefira estruturas simples sem desvios desnecessários.",
          "Também como aprofundamento, switch compara um valor com casos por igualdade estrita e pode ser útil para opções discretas, como \"manha\" ou \"noite\". Cada case normalmente termina em break para evitar continuar no próximo; default cobre valores não previstos. Para faixas de pontuação, if costuma representar melhor o problema.",
          "Pausa de prática: escreva os valores de falta em cada volta de let falta = 3; while (falta > 0) { falta -= 1; }. Marque o teste que impede uma quarta volta."
        ],
        "trace": {
          "title": "Rastreamento do while: faltam 3 repetições",
          "columns": ["Teste", "falta antes", "Ação", "falta depois"],
          "rows": [
            ["3 > 0: sim", "3", "subtrair 1", "2"],
            ["2 > 0: sim", "2", "subtrair 1", "1"],
            ["1 > 0: sim", "1", "subtrair 1", "0"],
            ["0 > 0: não", "0", "parar", "0"]
          ]
        }
      },
      {
        "title": "Pensar em casos antes do código",
        "paragraphs": [
          "Para uma entrada de 1 a 7 sessões, os testes importantes são texto vazio, texto que não vira número, 0, 1, 7, 8 e 1.5. Os dois valores aceitos nas bordas precisam funcionar. Os vizinhos externos precisam ser recusados. Um teste somente com 3 não verifica a regra inteira, mesmo que a saída pareça perfeita.",
          "Separe dados, validação, cálculo e apresentação. No exemplo, a string de entrada é convertida uma vez. A validação decide se o cálculo pode acontecer. Somente então o laço constrói o relatório. Uma mensagem de erro também é um resultado esperado, não um fracasso do programa. O fracasso seria tratar dado inválido como se fosse válido ou continuar com um total enganoso."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Decisões, limites e repetições\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Decisões, limites e repetições\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst entrada = \"3\";\nconst sessoes = Number(entrada);\nconst minutosPorSessao = 20;\nlet relatorio = \"\";\nif (entrada.trim() === \"\" || !Number.isInteger(sessoes) || sessoes \u003c 1 || sessoes > 7) {\n  relatorio = \"Informe de 1 a 7 sessões inteiras.\";\n} else {\n  let total = 0;\n  for (let dia = 1; dia \u003c= sessoes; dia += 1) {\n    total += minutosPorSessao;\n    relatorio += `Dia ${dia}: acumulado de ${total} minutos\n`;\n  }\n  if (total >= 60) {\n    relatorio += \"Meta de 60 minutos atingida.\";\n  } else {\n    relatorio += `Faltam ${60 - total} minutos para a meta.`;\n  }\n}\ndocument.getElementById(\"saida\").textContent = relatorio;\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "A condição inicial reúne alternativas de invalidez com ||: basta uma para rejeitar.",
        "A negação de Number.isInteger rejeita frações e NaN; o teste de string vazia evita a conversão silenciosa para zero.",
        "total é criado antes do for, permitindo acumular valores entre voltas.",
        "O laço começa em 1 e inclui sessoes, portanto três sessões geram exatamente três linhas.",
        "A decisão final inclui a igualdade: 60 minutos já atingem a meta."
      ],
      "expected": "Dia 1: acumulado de 20 minutos; Dia 2: acumulado de 40 minutos; Dia 3: acumulado de 60 minutos; Meta de 60 minutos atingida. Cada mensagem aparece em sua linha."
    },
    "guided": [
      {
        "instruction": "Mude a entrada para \"1\".",
        "result": "Uma sessão e a mensagem Faltam 40 minutos para a meta."
      },
      {
        "instruction": "Teste \"0\", \"8\", \"1.5\" e \"\" separadamente.",
        "result": "Todos mostram somente a mensagem de entrada inválida."
      },
      {
        "instruction": "Mude a meta para 80 nas duas comparações/mensagens pertinentes e use quatro sessões.",
        "result": "O acumulado é 80; a igualdade deve contar como meta atingida."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, classifique mentalmente 18, 19 e 20 como Frio abaixo de 20 e Agradável a partir de 20. Depois implemente a decisão e compare os três resultados.",
        "hints": [
          "São dois caminhos exclusivos.",
          "A palavra abaixo exclui o próprio limite."
        ],
        "solution": "const temperatura = 18;\nlet mensagem;\nif (temperatura \u003c 20) { mensagem = \"Frio\"; } else { mensagem = \"Agradável\"; }\ndocument.getElementById(\"saida\").textContent = mensagem;",
        "explanation": "Uma variável de saída reúne a decisão e evita duplicar a linha que escreve na página. Testar 20 comprova que a fronteira está no ramo correto.",
        "expected": "As previsões são anotadas antes da execução e comparadas com os resultados observados.",
        "criteria": ["Classificações dos três valores anotadas antes.","Resultados conferidos em relação ao limite definido."]
      },
      {
        "prompt": "Alterar: no exemplo, substitua temporariamente o relatório de sessões por um for que some os inteiros de 1 a 5 e mostre a soma. Não escreva 1+2+3+4+5 diretamente; depois restaure o script.",
        "hints": [
          "O acumulador começa em zero antes do laço.",
          "Inclua 5 usando \u003c=."
        ],
        "solution": "let soma = 0;\nfor (let numero = 1; numero \u003c= 5; numero += 1) { soma += numero; }\ndocument.getElementById(\"saida\").textContent = String(soma);",
        "explanation": "Cada volta adiciona o número atual. O rastreamento deve mostrar totais 1, 3, 6, 10 e 15, permitindo encontrar uma contagem ausente.",
        "expected": "15.",
        "criteria": ["Laço soma o intervalo sem expressão de soma escrita à mão.","Relatório original é restaurado após o teste."]
      },
      {
        "prompt": "Construir: crie um relatório dos dias 1 a 7. Dias 6 e 7 mostram Descanso; os demais mostram Estudo. Ao fim mostre o total de dias de estudo. Use um laço e condições.",
        "hints": [
          "Mantenha texto e contador fora do for.",
          "Acrescente ao contador somente no ramo de estudo."
        ],
        "solution": "let texto = \"\";\nlet diasDeEstudo = 0;\nfor (let dia = 1; dia \u003c= 7; dia += 1) {\n  if (dia >= 6) { texto += `Dia ${dia}: Descanso\\n`; }\n  else { texto += `Dia ${dia}: Estudo\\n`; diasDeEstudo += 1; }\n}\ntexto += `Total de dias de estudo: ${diasDeEstudo}`;\ndocument.getElementById(\"saida\").textContent = texto;",
        "explanation": "Contar todos os dias fora da condição daria 7 e violaria a regra. O laço representa a passagem dos dias; a condição representa a atividade de cada um.",
        "expected": "Sete linhas de dias e total 5. Os dois últimos dias são Descanso.",
        "criteria": ["Laço mostra sete dias e marca descanso apenas nos dois últimos.","Total de estudo é contado pelas condições, não fixado."]
      },
      {
        "prompt": "Investigar erro: let n = 3; while (n > 0) { console.log(n); } não termina. Sem executar o laço defeituoso no navegador, rastreie n em duas voltas, identifique a atualização ausente e escreva a correção. Diga quantas voltas haverá.",
        "hints": [
          "A condição depende de n.",
          "Uma atualização precisa aproximar n de zero."
        ],
        "solution": "let n = 3;\nlet texto = \"\";\nwhile (n > 0) { texto += `${n}\\n`; n -= 1; }\ndocument.getElementById(\"saida\").textContent = texto;",
        "explanation": "Sem atualização n permanece 3. Com a subtração, o teste antes da quarta volta encontra zero e encerra sem imprimir zero.",
        "expected": "O rastreamento mostra por que a condição não termina; a correção produz uma execução finita.",
        "criteria": ["Rastreamento identifica o valor que não muda e a condição.","Correção termina; caso infinito não é executado no navegador."]
      }
    ],
    "mistakes": [
      "Usar \u003c= quando a intenção era excluir o limite cria uma volta extra; escreva os valores que o contador deve assumir.",
      "Criar total dentro do laço reinicia a soma; inicialize fora.",
      "Ordenar categorias da mais ampla para a mais específica pode esconder ramos; teste a maior categoria primeiro.",
      "Não testar vazio aceita um valor inexistente; valide a entrada antes de classificar."
    ],
    "quiz": [
      {
        "question": "Quantas voltas tem for(let i=1; i\u003c=3; i+=1)?",
        "options": [
          "2",
          "3",
          "4"
        ],
        "correctIndex": 1,
        "explanation": "O corpo usa 1, 2 e 3. O valor 4 é testado e recusado."
      },
      {
        "question": "Qual condição aceita somente idades de 18 a 65, inclusive?",
        "options": [
          "idade >= 18 || idade \u003c= 65",
          "idade > 18 && idade \u003c 65",
          "idade >= 18 && idade \u003c= 65"
        ],
        "correctIndex": 2,
        "explanation": "É necessário cumprir ambos os limites, incluindo os extremos."
      },
      {
        "question": "Por que um acumulador geralmente fica fora do laço?",
        "options": [
          "Para guardar o resultado entre voltas.",
          "Porque let não funciona dentro de laços.",
          "Para tornar o programa assíncrono."
        ],
        "correctIndex": 0,
        "explanation": "A soma precisa sobreviver a cada repetição, em vez de ser reinicializada."
      }
    ],
    "summary": [
      "Descreva a regra, incluindo os limites, antes de escolher operadores.",
      "Todo laço precisa de condição de término e avanço coerente.",
      "Teste casos normais, fronteiras e entradas inválidas."
    ]
  },
"js-functions": {
    "prerequisites": "Valores, comparações, if/else e laços da trilha JavaScript.",
    "setup": "Crie uma pasta javascript-estudos e salve o exemplo completo em um arquivo .html, usando texto simples e UTF-8. Abra-o no navegador; não precisa de biblioteca, servidor, conta ou conexão. A cada mudança, salve e atualize a página. Abra as ferramentas do desenvolvedor pelo menu do navegador e selecione Console para ver mensagens e erros. Nos exercícios, substitua somente o conteúdo do script, mantendo o documento e o pre com id=\"saida\". Para exibir um resultado use document.getElementById(\"saida\").textContent = String(resultado); essa linha localiza o pre e coloca texto nele, sem interpretar HTML. Não cole as tags script dentro de outro script. Se o resultado não mudar, confira primeiro o arquivo aberto e se houve erro no Console.",
    "why": "Copiar um cálculo em vários lugares aumenta a chance de corrigir uma cópia e esquecer outra. Uma função dá nome a uma operação e define o que entra e sai. Nesta aula o foco fica em declaração, chamada, parâmetros, argumentos, retorno e contrato; escopo, callbacks e closures aparecem nas aulas seguintes, depois que esta base estiver praticada.",
    "sections": [
      {
        "title": "Declarar não é executar",
        "paragraphs": [
          "function somar(a, b) { return a + b; } declara uma função chamada somar. a e b são parâmetros, nomes locais que receberão valores. somar(2, 3) é uma chamada; 2 e 3 são argumentos concretos. O corpo só roda quando chamado. Escrever apenas somar referencia a função sem executar. O retorno da chamada pode ser guardado: const total = somar(2, 3).",
          "Pense em uma função como uma pergunta precisa: com estas entradas, qual resultado devo produzir? Escolha nomes que expressem uma ação, como calcularSubtotal ou validarQuantidade. Uma função que simultaneamente lê um campo, calcula, salva e mostra mensagens é difícil de testar porque reúne várias responsabilidades. Primeiro aprenderemos funções que recebem dados diretamente e devolvem um resultado."
        ]
      },
      {
        "title": "Retorno e contrato",
        "paragraphs": [
          "return entrega um valor a quem chamou e encerra aquela execução. console.log apenas registra no Console; mostrar um número não equivale a retorná-lo. Sem return executado, uma função devolve undefined. Evite colocar uma quebra de linha imediatamente depois de return: a linguagem pode terminar a instrução antes do valor. Mantenha return e a expressão na mesma linha.",
          "Um contrato descreve entradas aceitas e saída esperada. calcularSubtotal(precoCentavos, quantidade) pode aceitar inteiros não negativos e devolver centavos inteiros. Nosso exemplo devolve null quando recebe dados inválidos. Essa escolha precisa ser explícita e tratada pelo chamador. Não use zero como sinal de erro, pois zero pode ser um total válido para quantidade zero.",
          "Um parâmetro padrão, como taxa = 0, é usado quando o argumento é omitido ou undefined. Ele não substitui null automaticamente. Parâmetros não ganham um tipo obrigatório só por seu nome; calcularSubtotal(\"100\", 2) continua possível, portanto a validação decide se aceita ou rejeita texto. Number.isInteger rejeita strings, NaN e frações sem convertê-los."
        ]
      },
      {
        "title": "Verificar o contrato",
        "paragraphs": [
          "Liste testes antes de adaptar a função à interface: preço 1200 e quantidade 2 devem devolver 2400; quantidade zero deve devolver zero; preço negativo ou quantidade fracionária devem devolver null. Confira o retorno diretamente no Console. Depois verifique se a camada de apresentação distingue zero válido de null inválido. if (!total) confundiria ambos porque os dois são falsy; use total === null.",
          "Quando uma função fica difícil de nomear, talvez faça trabalho demais. Separe validar, calcular e formatar apenas quando isso trouxer clareza; não crie uma função para cada símbolo. Nesta etapa o objetivo é ter regras pequenas que você consiga executar mentalmente, testar com dados diferentes e reutilizar sem copiar o corpo inteiro."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Funções: parâmetros, retorno e contratos\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Funções: parâmetros, retorno e contratos\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nfunction calcularSubtotal(precoCentavos, quantidade) {\n  if (!Number.isInteger(precoCentavos) || !Number.isInteger(quantidade)) { return null; }\n  if (precoCentavos \u003c 0 || quantidade \u003c 0) { return null; }\n  return precoCentavos * quantidade;\n}\nfunction apresentarSubtotal(total) {\n  if (total === null) { return \"Dados inválidos.\"; }\n  return `Subtotal: ${total} centavos`;\n}\nconst subtotal = calcularSubtotal(1200, 2);\ndocument.getElementById(\"saida\").textContent = apresentarSubtotal(subtotal);\nconsole.log(calcularSubtotal(1200, 0));\nconsole.log(calcularSubtotal(-1, 2));\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "calcularSubtotal valida o contrato e devolve null nos casos recusados, sem escrever na página.",
        "Os returns antecipados impedem continuar o cálculo com entradas inválidas.",
        "apresentarSubtotal transforma o retorno em mensagem e compara null explicitamente para preservar zero válido.",
        "A chamada com quantidade zero devolve 0; a de preço negativo devolve null."
      ],
      "expected": "Página: Subtotal: 2400 centavos. Console: 0 e null."
    },
    "guided": [
      {
        "instruction": "Mude a quantidade da chamada principal para zero.",
        "result": "A mensagem é Subtotal: 0 centavos, sem erro."
      },
      {
        "instruction": "Troque-a por 1.5 e depois pela string \"2\".",
        "result": "Ambas são recusadas pelo contrato: Dados inválidos."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: sem executar, diga o valor de dobro(6) e o valor de resultado quando dobro só usa console.log. Depois rode as duas versões.",
        "hints": [
          "O parâmetro é o valor recebido.",
          "Retorne antes de apresentar; não coloque só console.log dentro."
        ],
        "solution": "function dobro(numero) { return numero * 2; }\nconst resultado = dobro(6);\ndocument.getElementById(\"saida\").textContent = String(resultado);",
        "explanation": "A função não depende da página. O chamador decide o que fazer com o resultado, podendo testar, guardar ou apresentar o valor.",
        "expected": "A comparação permite observar o retorno da função e o texto produzido pelo Console.",
        "criteria": ["Previsões anotadas antes das duas versões.","Verificação separa retorno de saída do Console."]
      },
      {
        "prompt": "Alterar: crie saudacao(nome = \"Visitante\") e teste sem argumento, com \"Ana\" e com undefined. Retorne uma mensagem.",
        "hints": [
          "O padrão atua quando o argumento falta ou é undefined.",
          "Use uma template literal no retorno."
        ],
        "solution": "function saudacao(nome = \"Visitante\") { return `Olá, ${nome}!`; }\nconsole.log(saudacao());\nconsole.log(saudacao(\"Ana\"));\nconsole.log(saudacao(undefined));",
        "explanation": "O valor padrão pertence ao parâmetro. null não seria substituído: saudacao(null) produziria Olá, null!, portanto a política para null precisaria ser definida separadamente.",
        "expected": "Olá, Visitante!; Olá, Ana!; Olá, Visitante! no Console.",
        "criteria": ["Testa omissão, nome informado e undefined explícito.","Retorna mensagem e demonstra o padrão apenas nos casos cabíveis."]
      },
      {
        "prompt": "Construir: escreva minutosRestantes(meta, estudado). Aceite apenas números finitos não negativos. Retorne null para inválidos, zero quando a meta foi alcançada e a diferença nos demais casos. Teste (60,20), (60,80), (-1,20) e (60,\"20\").",
        "hints": [
          "Use Number.isFinite em ambos os parâmetros.",
          "Não retorne diferença negativa quando estudado >= meta."
        ],
        "solution": "function minutosRestantes(meta, estudado) {\n  if (!Number.isFinite(meta) || !Number.isFinite(estudado) || meta \u003c 0 || estudado \u003c 0) { return null; }\n  if (estudado >= meta) { return 0; }\n  return meta - estudado;\n}\nconsole.log(minutosRestantes(60,20), minutosRestantes(60,80), minutosRestantes(-1,20), minutosRestantes(60,\"20\"));",
        "explanation": "O contrato não converte texto silenciosamente. O retorno zero é sucesso, enquanto null indica recusa. Essa distinção permite uma interface orientar o usuário com precisão.",
        "expected": "40, 0, null e null.",
        "criteria": ["Aceita números finitos não negativos e retorna null para inválidos.","Trata meta alcançada com zero e calcula diferença nos demais casos."]
      },
      {
        "prompt": "Investigar erro: function somar(a,b) { console.log(a+b); } const resultado = somar(2,3); mostra 5 no Console mas resultado é undefined. Corrija e explique.",
        "hints": [
          "Registrar não é retornar.",
          "A apresentação deve usar o resultado da chamada."
        ],
        "solution": "function somar(a,b) { return a+b; }\nconst resultado = somar(2,3);\ndocument.getElementById(\"saida\").textContent = String(resultado);",
        "explanation": "O Console era um efeito da execução, mas nenhum return entregava o valor. Depois da correção a função pode participar de outras expressões como somar(2,3) * 2.",
        "expected": "resultado vale 5 e a página mostra 5.",
        "criteria": ["Retorno chega ao chamador e é mostrado na página.","Explicação distingue return de console.log."]
      }
    ],
    "mistakes": [
      "Confundir declarar com executar: o corpo só roda quando a função é chamada.",
      "Esquecer return produz undefined mesmo quando o Console mostra o número correto.",
      "Usar if (!total) confunde zero válido com ausência; compare o sinal de erro explicitamente.",
      "Alterar variáveis externas dentro de todo cálculo dificulta testes; receba entradas e devolva resultados."
    ],
    "quiz": [
      {
        "question": "O que uma função sem return executado devolve?",
        "options": [
          "null",
          "undefined",
          "O último valor mostrado no Console"
        ],
        "correctIndex": 1,
        "explanation": "Registrar ou calcular não define automaticamente o valor retornado."
      },
      {
        "question": "Qual chamada usa o padrão function f(x=4)?",
        "options": [
          "f(null)",
          "f(0)",
          "f(undefined)"
        ],
        "correctIndex": 2,
        "explanation": "O padrão atua em ausência ou undefined; null e zero são valores fornecidos."
      }
    ],
    "summary": [
      "Diferencie declaração, chamada, argumento, parâmetro e retorno.",
      "Descreva contratos e trate inválidos sem confundir valores legítimos.",
      "Teste casos comuns, limites e entradas recusadas antes de ligar a função à interface."
    ]
  },
"js-scope-pure": {
    "prerequisites": "Concluir Funções: parâmetros, retorno e contratos (js-functions).",
    "setup": "Use a mesma pasta javascript-estudos e o arquivo .html da aula anterior. Abra o arquivo no navegador e o Console nas ferramentas do desenvolvedor. Nos exercícios, mantenha o pre com id=\"saida\" e altere apenas o script. Não é necessário instalar biblioteca nem usar servidor.",
    "why": "Uma função pode parecer correta e ainda depender de um valor escondido fora dela. Entender escopo permite localizar cada nome; explicitar dependências e separar cálculos de efeitos torna o comportamento mais fácil de prever, testar e reutilizar.",
    "sections": [
      {
        "title": "Onde um nome pode ser usado",
        "paragraphs": [
          "Escopo é a região do programa em que um nome pode ser acessado. Parâmetros e variáveis declaradas dentro de uma função ficam no escopo daquela função. let e const declarados dentro de um bloco, como o corpo de um if, não existem fora desse bloco.",
          "Quando há nomes iguais em escopos diferentes, o mais próximo é usado. Evite depender dessa sobreposição enquanto aprende: nomes distintos deixam mais claro qual valor participa do cálculo."
        ]
      },
      {
        "title": "Dependências explícitas",
        "paragraphs": [
          "Uma função consegue ler variáveis externas, mas isso cria uma dependência que não aparece na chamada. Se calcularBonus() usa uma taxa global, mudar a taxa altera o retorno sem mudar os argumentos. calcularBonus(valor, taxa) deixa o contrato visível.",
          "Nem todo dado externo é proibido. A pergunta útil é: quem lê a chamada consegue descobrir de quais valores o resultado depende? Para regras de negócio pequenas, prefira receber esses valores por parâmetros."
        ]
      },
      {
        "title": "Cálculo puro e efeito observável",
        "paragraphs": [
          "Uma função pura produz o mesmo retorno para as mesmas entradas e não altera algo fora dela. calcularProgresso recebe números e devolve um número; já escrever em textContent é um efeito observável. Separar as duas etapas permite testar o cálculo sem depender do navegador.",
          "Pureza é uma ferramenta, não uma regra absoluta. Interfaces precisam causar efeitos. O objetivo é manter a regra previsível e concentrar a apresentação em um ponto deliberado."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003cbody>\n  \u003cpre id=\"saida\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nfunction calcularProgresso(meta, realizado) {\n  if (!Number.isFinite(meta) || !Number.isFinite(realizado) || meta \u003c= 0 || realizado \u003c 0) { return null; }\n  return Math.min(100, Math.round((realizado / meta) * 100));\n}\nconst progresso = calcularProgresso(60, 45);\nconst mensagem = progresso === null ? \"Dados inválidos.\" : `Progresso: ${progresso}%`;\ndocument.getElementById(\"saida\").textContent = mensagem;\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "calcularProgresso depende apenas dos parâmetros e não modifica a página.",
        "A validação faz parte do contrato e null representa uma entrada recusada.",
        "A escrita em textContent ocorre fora do cálculo, no ponto responsável pela apresentação."
      ],
      "expected": "A página mostra Progresso: 75%."
    },
    "guided": [
      { "instruction": "Troque realizado por 90 e preveja o resultado antes de atualizar.", "result": "A página mostra Progresso: 100%, pois Math.min limita o valor." },
      { "instruction": "Troque meta por zero e observe o contrato.", "result": "A página mostra Dados inválidos." }
    ],
    "exercises": [
      { "prompt": "Prever: há const taxa = 2 fora de function multiplicar(valor) { const taxa = 3; return valor * taxa; }. Sem executar, diga o retorno de multiplicar(4) e explique qual taxa é usada.", "hints": ["Procure primeiro no escopo mais próximo."], "solution": "O retorno é 12. O parâmetro valor e a taxa declarada dentro da função estão no escopo local; a taxa externa fica ocultada nessa função.", "explanation": "A resolução de nomes começa no escopo atual e segue para os externos apenas se o nome não for encontrado.", "expected": "A previsão é registrada antes da chamada e a explicação identifica a ligação local escolhida.", "criteria": ["Previsão do retorno e da variável usada anotada antes.","Explicação identifica o escopo local."] },
      { "prompt": "Alterar: transforme function totalComTaxa(valor) { return valor * taxa; } em uma função que não dependa da variável externa taxa.", "hints": ["Faça a dependência aparecer entre os parâmetros."], "solution": "function totalComTaxa(valor, taxa) { return valor * taxa; }\nconsole.log(totalComTaxa(100, 1.1));", "explanation": "A chamada agora mostra todos os dados que influenciam o retorno.", "expected": "110 no Console, admitindo a imprecisão comum de ponto flutuante quando aplicável.", "criteria": ["Dependência externa passa a ser argumento explícito.","Chamada de teste não depende de variável global."] },
      { "prompt": "Construir: crie calcularProgresso(meta, realizado), sem ler nem alterar variáveis externas. Retorne null para entradas inválidas e a porcentagem limitada a 100 nos demais casos. Apresente o resultado fora da função.", "hints": ["Valide números finitos; meta deve ser maior que zero.", "Use Math.min para limitar o resultado."], "solution": "function calcularProgresso(meta, realizado) {\n  if (!Number.isFinite(meta) || !Number.isFinite(realizado) || meta \u003c= 0 || realizado \u003c 0) return null;\n  return Math.min(100, Math.round((realizado / meta) * 100));\n}\nconst valor = calcularProgresso(80, 20);\ndocument.getElementById(\"saida\").textContent = valor === null ? \"Inválido\" : `${valor}%`;", "explanation": "O cálculo continua utilizável sem DOM; apenas o chamador apresenta o retorno.", "expected": "25% na página.", "criteria": ["Função usa apenas argumentos e não altera estado externo.","Invalidez retorna null e resultado é limitado a 100%."] },
      { "prompt": "Investigar erro: function registrar() { if (true) { const minutos = 30; } return minutos; } causa ReferenceError. Localize o escopo do nome e corrija sem trocar const por var.", "hints": ["minutos só existe dentro do bloco do if."], "solution": "function registrar() {\n  const minutos = 30;\n  if (true) { console.log(\"Sessão válida\"); }\n  return minutos;\n}", "explanation": "A declaração foi movida para o escopo da função, onde o return também pode acessá-la.", "expected": "registrar() retorna 30 sem ReferenceError.", "criteria": ["Diagnóstico localiza a declaração fora do escopo de retorno.","Mantém const e retorna número sem ReferenceError."] }
    ],
    "mistakes": [
      "Tentar acessar fora do bloco um let ou const declarado dentro dele.",
      "Ler muitas variáveis externas e esconder as dependências da função.",
      "Misturar cálculo e alteração do DOM, tornando a regra mais difícil de testar."
    ],
    "quiz": [
      { "question": "Onde um const declarado dentro de um if pode ser usado?", "options": ["Em qualquer arquivo", "Somente naquele bloco e nos blocos internos", "Somente no Console"], "correctIndex": 1, "explanation": "const e let têm escopo de bloco." },
      { "question": "Qual assinatura deixa a taxa como dependência explícita?", "options": ["calcular(valor, taxa)", "calcular() lendo taxa global", "calcular() alterando taxa"], "correctIndex": 0, "explanation": "O parâmetro torna a dependência visível na chamada." },
      { "question": "Qual ação é um efeito observável?", "options": ["Retornar a soma dos parâmetros", "Calcular um valor local", "Alterar textContent"], "correctIndex": 2, "explanation": "A página muda fora da função de cálculo." }
    ],
    "summary": [
      "Localize cada nome pelo escopo em que foi declarado.",
      "Prefira dependências explícitas em parâmetros para regras pequenas.",
      "Separe o cálculo puro do efeito de apresentar o resultado."
    ]
  },
"js-callbacks-closures": {
    "prerequisites": "Concluir Funções: parâmetros, retorno e contratos (js-functions) e Escopo, dependências e funções puras (js-scope-pure).",
    "setup": "Use a mesma pasta javascript-estudos e um arquivo .html aberto no navegador. Mantenha o Console visível para comparar chamadas. Não é necessário instalar biblioteca ou servidor. Digite cada exemplo e preveja a saída antes de atualizar a página.",
    "why": "JavaScript permite guardar e passar funções como qualquer outro valor. Callbacks aparecem em métodos de arrays e em eventos, mas o nome não quer dizer que a execução é sempre assíncrona: quem recebe a função decide quando chamá-la. Closures explicam como uma função interna continua acessando o ambiente onde nasceu, permitindo estado associado a uma instância sem criar uma variável global.",
    "sections": [
      {
        "title": "Funções como valores e callbacks",
        "paragraphs": [
          "Uma função pode ser guardada numa variável ou recebida por outra função. A função passada é um callback: quem a recebe decide quando chamá-la. `aplicar` chama o callback imediatamente durante a própria execução; um evento pode chamá-lo mais tarde. Callback, por si só, não significa operação assíncrona.",
          "Em `aplicar(3, dobro)`, `dobro` é a referência à função e ainda não roda. Já `dobro(3)` roda agora e produz o número 6. Por isso `aplicar(3, dobro())` entrega um número onde `aplicar` espera uma função. A diferença está nos parênteses: referência para passar; parênteses para chamar."
        ],
        "terms": [
          {
            "term": "Callback",
            "meaning": "Função passada como valor para outra operação, que decide quando chamá-la; ela pode ser chamada agora ou mais tarde."
          },
          {
            "term": "Função de ordem superior",
            "meaning": "Função que recebe outra função ou devolve uma função. `aplicar` recebe `dobro`; `criarContador` devolve uma função interna."
          }
        ]
      },
      {
        "title": "Closure conserva acesso",
        "paragraphs": [
          "Uma closure é a função interna junto com o acesso ao ambiente léxico em que nasceu. `criarContador` declara `valor` e devolve uma função que o incrementa. Quando `criarContador` termina, `contar` continua ligado àquela variável; ela não vira global nem desaparece enquanto a função devolvida ainda puder ser chamada.",
          "A closure acompanha a variável, não uma fotografia do valor inicial: depois de `contar()` ela vê o valor atualizado na chamada seguinte. Cada execução de `criarContador()` cria uma ligação separada. A tabela acompanha duas delas e mostra por que `contar` e `outro` não compartilham o contador."
        ],
        "trace": {
          "title": "Acompanhe o valor preservado em cada chamada",
          "columns": [
            "Ação",
            "Ambiente usado",
            "Valor antes → depois",
            "Resultado"
          ],
          "rows": [
            [
              "criarContador() → contar",
              "Contador A",
              "— → 0",
              "função interna devolvida"
            ],
            [
              "contar()",
              "Contador A",
              "0 → 1",
              "1"
            ],
            [
              "contar()",
              "Contador A",
              "1 → 2",
              "2"
            ],
            [
              "criarContador() → outro",
              "Contador B",
              "— → 0",
              "outra função interna"
            ],
            [
              "outro()",
              "Contador B; A continua em 2",
              "0 → 1",
              "1"
            ]
          ]
        }
      },
      {
        "title": "Estado deliberado",
        "paragraphs": [
          "Diferente de uma função pura, uma closure com estado pode retornar valores diferentes em chamadas sem argumentos. Isso é útil quando a memória pertence a uma instância, como um contador, mas a mudança precisa fazer parte do contrato e dos testes.",
          "Uma closure reduz acessos acidentais ao estado, mas não é uma barreira de segurança. Não coloque senha ou chave secreta numa closure do navegador: o código e a memória continuam sob controle de quem usa a página. Para um cálculo simples, parâmetros e retorno são mais diretos."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<body>\n  <pre id=\"saida\"></pre>\n  <script>\n\"use strict\";\nfunction aplicar(valor, operacao) { return operacao(valor); }\nfunction dobro(numero) { return numero * 2; }\nfunction criarContador() {\n  let valor = 0;\n  return function () { valor += 1; return valor; };\n}\nconst contar = criarContador();\nconst outro = criarContador();\nconst linhas = [aplicar(4, dobro), contar(), contar(), outro()];\ndocument.getElementById(\"saida\").textContent = linhas.join(\"\\n\");\n  </script>\n</body>\n</html>",
      "explanation": [
        "Em aplicar(4, dobro), a referência dobro é passada sem executar; aplicar chama essa função com 4 e recebe 8.",
        "criarContador cria o ambiente A com valor igual a 0 e devolve a função interna que o utiliza.",
        "A primeira chamada a contar muda o mesmo valor de 0 para 1; a segunda o muda de 1 para 2.",
        "outro foi criado numa nova execução, então usa o ambiente B, separado do A, e sua primeira chamada retorna 1."
      ],
      "expected": "A página mostra, em linhas separadas: 8, 1, 2 e 1."
    },
    "guided": [
      {
        "instruction": "Troque dobro por function triplo(numero) { return numero * 3; }.",
        "result": "A primeira linha passa a mostrar 12; aplicar não precisa ser alterada."
      },
      {
        "instruction": "Acrescente outro() ao final da lista.",
        "result": "A nova linha mostra 2; o estado de outro permanece independente de contar."
      },
      {
        "instruction": "Antes de executar, copie a tabela de ambientes para o rascunho e preveja o valor de cada contador antes e depois das chamadas.",
        "result": "contar reutiliza o ambiente A (0 → 1 → 2); outro usa o ambiente B (0 → 1). A tabela torna visível que a closure acompanha uma variável de cada instância."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: qual é a diferença entre executar aplicar(5, dobro) e tentar aplicar(5, dobro(5))? Responda antes de rodar.",
        "hints": [
          "Na segunda forma, observe o que é passado como segundo argumento."
        ],
        "solution": "aplicar(5, dobro) retorna 10. Em aplicar(5, dobro(5)), dobro(5) vira 10 antes da chamada; aplicar tenta executar o número 10 como função e lança TypeError.",
        "explanation": "Callbacks são passados por referência, sem parênteses.",
        "expected": "A observação compara a função passada como callback com o resultado de uma chamada antecipada.",
        "criteria": [
          "Previsão anotada antes das chamadas.",
          "Compara callback passado com valor produzido por chamada antecipada."
        ]
      },
      {
        "prompt": "Alterar: adapte aplicar para receber dois valores e um callback, permitindo aplicar(3, 4, somar).",
        "hints": [
          "Chame operacao com dois argumentos."
        ],
        "solution": "function aplicar(a, b, operacao) { return operacao(a, b); }\nfunction somar(a, b) { return a + b; }\nconsole.log(aplicar(3, 4, somar));",
        "explanation": "A função de ordem superior controla a chamada sem conhecer a regra específica.",
        "expected": "7 no Console.",
        "criteria": [
          "aplicar recebe dois valores e função callback.",
          "Resultado é obtido sem executar callback antes da função externa."
        ]
      },
      {
        "prompt": "Construir: crie criarMarcador(inicial), que devolve uma função capaz de somar uma quantidade ao valor preservado. Crie dois marcadores e demonstre que seus estados são independentes.",
        "hints": [
          "Declare valor na função externa.",
          "A função interna recebe quantidade, altera valor e o retorna."
        ],
        "solution": "function criarMarcador(inicial) {\n  let valor = inicial;\n  return function (quantidade) { valor += quantidade; return valor; };\n}\nconst a = criarMarcador(10);\nconst b = criarMarcador(0);\nconsole.log(a(5), a(2), b(3));",
        "explanation": "Cada chamada da função externa cria um ambiente separado conservado pela função interna.",
        "expected": "15, 17 e 3 no Console.",
        "criteria": [
          "Função interna preserva valor entre chamadas.",
          "Duas instâncias mantêm estado independente em chamadas intercaladas."
        ]
      },
      {
        "prompt": "Investigar erro: const contar = criarContador; console.log(contar()) devolve uma função em vez de 1. Explique e corrija.",
        "hints": [
          "criarContador é a fábrica; ela precisa ser chamada para produzir o contador."
        ],
        "solution": "const contar = criarContador();\nconsole.log(contar());",
        "explanation": "Sem os primeiros parênteses, contar referencia a função externa. A chamada correta cria e guarda a função interna.",
        "expected": "1 no Console.",
        "criteria": [
          "Correção chama a função devolvida pela fábrica.",
          "Console mostra número, não referência à função."
        ]
      }
    ],
    "mistakes": [
      "Executar o callback ao passá-lo, usando parênteses quando era necessária a referência.",
      "Confundir a função externa, que cria o ambiente, com a função interna que o utiliza.",
      "Usar estado oculto quando parâmetros e retorno deixariam o cálculo mais simples."
    ],
    "quiz": [
      {
        "question": "Em aplicar(3, dobro), o que dobro representa?",
        "options": [
          "Uma referência à função",
          "O retorno já calculado",
          "Uma string"
        ],
        "correctIndex": 0,
        "explanation": "Sem parênteses, a própria função é passada como valor."
      },
      {
        "question": "Por que contar() ainda acessa valor depois que criarContador terminou?",
        "options": [
          "Porque valor é global",
          "Porque a closure conserva acesso ao ambiente de criação",
          "Porque const copia todas as variáveis"
        ],
        "correctIndex": 1,
        "explanation": "A função interna mantém a ligação com o escopo em que foi criada."
      },
      {
        "question": "Duas chamadas separadas a criarContador() compartilham obrigatoriamente o mesmo estado?",
        "options": [
          "Sim",
          "Não, cada chamada cria seu próprio ambiente",
          "Somente no Console"
        ],
        "correctIndex": 1,
        "explanation": "Cada execução da função externa cria um novo ambiente léxico."
      }
    ],
    "summary": [
      "Callback é uma referência de função; quem recebe decide se chama agora ou depois.",
      "Uma closure conserva acesso à ligação da variável; execuções criadoras distintas formam ambientes separados.",
      "Closure organiza estado, mas não protege segredos no navegador."
    ],
    "retry": {
      "prompt": "Crie criarSaldo(inicial), que devolve uma função para acrescentar um valor e retornar o saldo atual. Crie duas instâncias e preveja o resultado de acrescentar 5 à primeira e 2 à segunda.",
      "expected": "Cada função preserva seu próprio saldo; atualizar uma instância não altera a outra; criarSaldo retorna uma função que só é executada quando chamada.",
      "hint": "Declare o saldo dentro da função criadora e retorne uma função que o use."
    }
  },
"js-arrays": {
    "prerequisites": "Concluir Funções: parâmetros, retorno e contratos (js-functions), Escopo, dependências e funções puras (js-scope-pure) e Callbacks e closures (js-callbacks-closures). Arrow functions não são necessárias nesta aula.",
    "setup": "Crie uma pasta javascript-estudos e salve o exemplo completo em um arquivo .html, usando texto simples e UTF-8. Abra-o no navegador; não precisa de biblioteca, servidor, conta ou conexão. A cada mudança, salve e atualize a página. Abra as ferramentas do desenvolvedor pelo menu do navegador e selecione Console para ver mensagens e erros. Nos exercícios, substitua somente o conteúdo do script, mantendo o documento e o pre com id=\"saida\". Para exibir um resultado use document.getElementById(\"saida\").textContent = String(resultado); essa linha localiza o pre e coloca texto nele, sem interpretar HTML. Não cole as tags script dentro de outro script. Se o resultado não mudar, confira primeiro o arquivo aberto e se houve erro no Console.",
    "why": "Uma aplicação raramente trabalha com um único valor. Um catálogo contém produtos; cada produto tem nome e preço. Arrays organizam a coleção e objetos agrupam as propriedades de cada registro. O objetivo é conseguir responder perguntas sobre essa coleção sem perder dados, modificar o original por acidente ou confundir uma lista filtrada com um único resultado.",
    "sections": [
      {
        "title": "Modelar registros e coleções",
        "paragraphs": [
          "Um objeto literal usa chaves: const curso = { titulo: \"HTML\", minutos: 30 };. titulo e minutos são propriedades; curso.titulo lê \"HTML\". Também podemos usar curso[\"titulo\"], útil quando o nome da propriedade vem de uma variável. Uma propriedade inexistente devolve undefined. Um objeto representa um conjunto de características relacionadas, não uma sequência numerada de posições.",
          "Um array usa colchetes: const tempos = [20, 30, 40]. A primeira posição é índice 0; tempos[1] é 30 e tempos.length é 3. O último índice é length - 1, portanto tempos[3] é undefined. Um array vazio [] tem length zero e é truthy: para verificar se tem itens, use tempos.length > 0. Array.isArray(valor) distingue arrays de outros objetos.",
          "Podemos ter um array de objetos: cada posição aponta para um registro. No catálogo, um id identifica o item mesmo se sua posição mudar depois de ordenar ou filtrar. Não confunda identidade com índice. Adicionar ou remover itens desloca posições, mas o id pode continuar representando o mesmo produto.",
          "Pausa de prática: antes de executar, preveja tempos[0], tempos[3] e tempos.length para [20, 30, 40]. Confira no Console e explique por que a posição 3 não existe."
        ]
      },
      {
        "title": "Referências e alterações",
        "paragraphs": [
          "Primitivos como números são copiados por valor em atribuições. Objetos e arrays são acessados por referências: const copia = original associa outro nome ao mesmo array, sem duplicá-lo. Se copia.push(10) acrescenta um item, original também passa a mostrar esse item. const impede reatribuir o nome, mas não congela o conteúdo do objeto associado.",
          "push adiciona no fim e pop remove o último item. splice pode remover ou inserir posições e modifica o próprio array; slice cria um novo array com uma faixa, sem modificar o original. original.slice() copia todas as posições. Essa cópia é rasa: se os itens forem objetos, ambos os arrays ainda apontam para os mesmos objetos internos. Na próxima aula veremos spread e cópias de objetos.",
          "Escolha conscientemente se uma operação altera a entrada. Quando uma função calcula um relatório, normalmente é mais previsível preservar o catálogo recebido. Você pode construir objetos novos em map para transformar propriedades. Copiar apenas o array e depois escrever copia[0].preco = 0 ainda altera o objeto compartilhado no original.",
          "Mapa de referências: original → array A → objeto X; alias → array A → objeto X; original.slice() → array B → objeto X. Desenhe essas três setas antes de prever qual alteração fica visível por mais de um nome. Depois confira no Console com um catálogo pequeno.",
          "No mapa abaixo, preveja antes de executar: alias.push({ nome: \"Pasta\" }) muda o comprimento de copia? E copia[0].nome = \"Lápis\" muda o primeiro objeto visto por original? Confira as duas respostas no Console."
        ],
        "diagramTitle": "Referências compartilhadas e cópia rasa de array",
        "diagram": "const original = [{ nome: \"Caneta\" ];\nconst alias = original;\nconst copia = original.slice();\n\noriginal ──┐\n           ├──→ array A ──→ objeto X { nome: \"Caneta\" }\nalias ────┘                       ↑\ncopia ────────→ array B ──────────┘\n\npush em alias altera array A; copia continua com 1 item.\nAlterar copia[0].nome altera objeto X, visto por ambos os arrays."
      },
      {
        "title": "Percorrer e transformar",
        "paragraphs": [
          "for...of percorre os valores de uma coleção: for (const item of produtos) { ... }. Ele é mais direto que administrar índices quando você só precisa dos itens. for...in enumera nomes de propriedades e não é a opção indicada para percorrer valores de arrays. Um for com índice continua útil quando a posição faz parte do problema.",
          "map chama uma função para cada item e forma um novo array com os retornos. produtos.map(function (item) { return item.nome; }) transforma registros em nomes. O callback precisa retornar o valor novo; esquecer return produz undefined naquela posição. map não altera o array por si só, mas seu callback ainda poderia modificar objetos: evite esse efeito quando a intenção é apenas transformar.",
          "filter devolve um novo array somente com os itens cujo callback passa no teste. find devolve o primeiro item correspondente, ou undefined se não houver. Se precisa de todos os baratos, use filter; se procura o id de um produto, find. some responde se existe ao menos um item que passa; every responde se todos passam. Em coleção vazia, some é false e every é true, portanto não use every sozinho para afirmar que uma lista tem conteúdo.",
          "Pausa de prática: para preços [1200, 300, 800], preveja quantos itens filter devolve ao pedir preço até 800 e o que find devolve ao procurar id 99. Execute só depois de registrar as duas previsões."
        ]
      },
      {
        "title": "Acumular, ordenar e conferir coleções",
        "paragraphs": [
          "reduce reúne os itens em um único resultado. produtos.reduce(function (total, item) { return total + item.preco; }, 0) começa em zero e soma cada preço. O segundo argumento é o valor inicial do acumulador. Fornecê-lo é especialmente importante no array vazio: somar uma lista vazia deve devolver zero, enquanto reduce sem valor inicial lança erro nesse caso.",
          "sort ordena o próprio array. Sem comparador, converte itens para uma comparação textual, portanto [2, 10].sort() pode surpreender. Para números crescentes use function (a,b) { return a-b; }. Retorno negativo coloca a antes de b; positivo coloca depois; zero mantém a ordem relativa entre elementos equivalentes nas implementações modernas. Para preservar a entrada, primeiro faça slice() e depois sort(comparador).",
          "Para objetos, compare a propriedade desejada, como a.preco - b.preco. Se dois itens têm mesmo preço e você precisa de uma regra adicional, compare também o id. Métodos como toSorted também devolvem uma nova coleção, mas aqui usamos slice().sort() para tornar a cópia visível. Ordenar não deve ser uma desculpa para perder a correspondência entre nome, id e preço.",
          "join(\"\\n\") une strings de um array usando quebras de linha, sendo útil para mostrar uma lista em pre. JSON.stringify(objeto, null, 2) transforma um objeto em texto JSON com indentação de dois espaços, útil para inspecionar seus dados. Não é uma regra universal de clonagem: valores e tipos especiais podem não ser preservados. Nesta aula usamos registros simples e cópias explícitas.",
          "Teste uma coleção normal, outra vazia, uma com um único item e uma com empate. Verifique também uma busca sem correspondência. Antes de acessar encontrado.nome, confira se encontrado !== undefined. A ausência de resultado faz parte do contrato de find; não deve causar um erro inesperado ao tentar ler uma propriedade de undefined.",
          "Pergunte sempre o formato da resposta: map e filter devolvem arrays; find devolve um item ou undefined; reduce devolve o tipo do acumulador construído; some e every devolvem booleanos. Saber o formato evita escrever operações incompatíveis na etapa seguinte. Uma boa transformação informa não apenas o valor esperado, mas o que acontece quando não há dados.",
          "Pausa de prática: preveja o resultado de [].reduce(function (soma, valor) { return soma + valor; }, 0) e a ordem de [10, 2, 30].slice().sort(function (a, b) { return a - b; }). Compare com o Console e verifique se o array original mudou."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Arrays, objetos e transformação de dados\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Arrays, objetos e transformação de dados\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst produtos = [\n  { id: 1, nome: \"Caderno\", preco: 1200 },\n  { id: 2, nome: \"Caneta\", preco: 300 },\n  { id: 3, nome: \"Pasta\", preco: 800 }\n];\nconst baratos = produtos.filter(function (item) { return item.preco \u003c= 800; });\nconst nomes = baratos.map(function (item) { return item.nome; });\nconst total = produtos.reduce(function (soma, item) { return soma + item.preco; }, 0);\nconst encontrado = produtos.find(function (item) { return item.id === 2; });\nconst ordenados = produtos.slice().sort(function (a, b) { return a.preco - b.preco; });\nconst ordem = ordenados.map(function (item) { return item.nome; });\nlet busca = \"Não encontrado\";\nif (encontrado !== undefined) { busca = encontrado.nome; }\ndocument.getElementById(\"saida\").textContent = `Até 800: ${nomes.join(\", \")}\nTotal: ${total}\nBusca: ${busca}\nOrdem: ${ordem.join(\", \")}`;\nconsole.log(\"Original:\", produtos[0].nome);\nconsole.log([].reduce(function (soma, valor) { return soma + valor; }, 0));\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "Cada objeto reúne identidade, descrição e preço; o array conserva os três registros.",
        "filter seleciona dois itens; map extrai seus nomes sem mudar os objetos.",
        "reduce soma os preços em centavos e começa com zero para suportar uma lista vazia.",
        "find devolve um objeto e a verificação protege o acesso quando não há correspondência.",
        "slice duplica o array antes de sort, mantendo a ordem original e mostrando a ordenada separadamente."
      ],
      "expected": "Até 800: Caneta, Pasta; Total: 2300; Busca: Caneta; Ordem: Caneta, Pasta, Caderno. Console: Original: Caderno e 0."
    },
    "guided": [
      {
        "instruction": "Procure id 99 em find.",
        "result": "Busca: Não encontrado, sem interromper o programa."
      },
      {
        "instruction": "Substitua o catálogo por [] e remova somente o console.log que acessa produtos[0].nome.",
        "result": "Total zero, listas vazias e busca ausente; o comentário sobre acesso mostra por que tratar vazio importa."
      },
      {
        "instruction": "Restaure o catálogo, retire slice() antes de sort e atualize.",
        "result": "O Console passa a mostrar Caneta como primeiro item original, evidenciando a mutação."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga quantos itens map devolverá ao dobrar [10,20,30] e se o array original mudará. Depois transforme em [20,40,60] e mostre os números separados por vírgula.",
        "hints": [
          "O callback recebe um número por vez.",
          "Retorne o dobro e use join para exibir."
        ],
        "solution": "const numeros = [10,20,30];\nconst dobros = numeros.map(function(n) { return n * 2; });\ndocument.getElementById(\"saida\").textContent = dobros.join(\", \");\nconsole.log(numeros);",
        "explanation": "map preserva a quantidade de itens, substituindo cada posição pelo retorno. O array numeros continua com seus valores originais.",
        "expected": "A previsão da quantidade e do efeito no original é anotada; o teste permite conferir transformação e página.",
        "criteria": ["Previsão sobre quantidade e mutação anotada primeiro.","map transforma a exibição sem alterar entrada."]
      },
      {
        "prompt": "Alterar: no catálogo do exemplo, mude a busca para o produto id 99 e apresente Não encontrado sem lançar erro. Preserve os três produtos do catálogo.",
        "hints": [
          "find pode devolver undefined.",
          "Só leia nome quando existir um item."
        ],
        "solution": "const item = produtos.find(function(p) { return p.id === 99; });\nlet mensagem = \"Não encontrado\";\nif (item !== undefined) { mensagem = item.nome; }\ndocument.getElementById(\"saida\").textContent = mensagem;",
        "explanation": "Este trecho deve ser usado após a declaração de produtos do exemplo. O caso sem correspondência é esperado e tratado explicitamente.",
        "expected": "Não encontrado.",
        "criteria": ["Busca ausente mostra mensagem sem exceção.","Catálogo mantém os três produtos."]
      },
      {
        "prompt": "Construir: crie um array com três sessões: HTML 30 minutos, CSS 45 e JS 20. Filtre as de pelo menos 30 minutos, some apenas essas durações e apresente seus nomes e o total. O array original deve continuar com três itens.",
        "hints": [
          "Cada sessão pode ser um objeto com nome e minutos.",
          "Aplique reduce sobre a lista filtrada, começando em zero."
        ],
        "solution": "const sessoes = [{nome:\"HTML\",minutos:30},{nome:\"CSS\",minutos:45},{nome:\"JS\",minutos:20}];\nconst longas = sessoes.filter(function(s) { return s.minutos >= 30; });\nconst total = longas.reduce(function(soma,s) { return soma+s.minutos; },0);\nconst nomes = longas.map(function(s) { return s.nome; });\ndocument.getElementById(\"saida\").textContent = `${nomes.join(\", \")}\\nTotal: ${total}`;\nconsole.log(sessoes.length);",
        "explanation": "A seleção precede a soma porque o requisito exclui sessões curtas. Nenhum callback altera os registros e filter cria outra coleção de referências.",
        "expected": "HTML, CSS; Total: 75. O Console mostra 3.",
        "criteria": ["Filtro e soma consideram só sessões elegíveis.","Nomes e total aparecem; array de entrada conserva três itens."]
      },
      {
        "prompt": "Investigar erro: const original = [10,2,30]; const copia = original; copia.sort(); não preserva o original nem ordena numericamente. Antes de corrigir, desenhe se os dois nomes apontam para o mesmo array e preveja a ordem após sort(). Corrija ambos os problemas.",
        "hints": [
          "A atribuição compartilha a referência.",
          "Copie com slice e forneça comparador numérico."
        ],
        "solution": "const original = [10,2,30];\nconst copia = original.slice().sort(function(a,b) { return a-b; });\nconsole.log(original.join(\",\"), copia.join(\",\"));",
        "explanation": "Criar outro nome não copia o array. O comparador é um segundo problema independente: a ordenação padrão não representa magnitude numérica.",
        "expected": "A previsão da referência e da ordem é registrada antes da correção e comparada com os arrays.",
        "criteria": ["Previsão de alias e ordenação anotada antes de sort.","Cópia independente e comparador numérico preservam e ordenam dados."]
      }
    ],
    "mistakes": [
      "Testar if (lista) não detecta vazio; use length.",
      "Esquecer return no callback de map gera itens undefined; retorne a transformação.",
      "Usar find esperando todos os resultados perde correspondências; escolha filter.",
      "Ordenar sem cópia altera a coleção original; decida explicitamente se quer essa mutação."
    ],
    "quiz": [
      {
        "question": "Qual método devolve todos os itens que satisfazem um teste?",
        "options": [
          "find",
          "filter",
          "some"
        ],
        "correctIndex": 1,
        "explanation": "filter devolve um array; find entrega só o primeiro e some entrega booleano."
      },
      {
        "question": "O que const b = a faz quando a é um array?",
        "options": [
          "Uma cópia profunda.",
          "Outra referência ao mesmo array.",
          "Um array vazio."
        ],
        "correctIndex": 1,
        "explanation": "Alterações por qualquer nome afetam o mesmo objeto."
      },
      {
        "question": "Por que passar 0 ao reduce de soma?",
        "options": [
          "Para permitir resultado zero também no array vazio.",
          "Para pular o primeiro item.",
          "Para ordenar os números."
        ],
        "correctIndex": 0,
        "explanation": "O valor inicial define o acumulador e evita erro na redução de uma lista vazia."
      }
    ],
    "summary": [
      "Modele registros com objetos e listas com arrays.",
      "Escolha métodos pelo formato da resposta e trate ausência.",
      "Diferencie cópia rasa, referência compartilhada e mutação."
    ]
  },
"js-es6": {
    "prerequisites": "Funções e callbacks, arrays, objetos, referências e valores null/undefined.",
    "setup": "Crie uma pasta javascript-estudos e salve o exemplo completo em um arquivo .html, usando texto simples e UTF-8. Abra-o no navegador; não precisa de biblioteca, servidor, conta ou conexão. A cada mudança, salve e atualize a página. Abra as ferramentas do desenvolvedor pelo menu do navegador e selecione Console para ver mensagens e erros. Nos exercícios, substitua somente o conteúdo do script, mantendo o documento e o pre com id=\"saida\". Para exibir um resultado use document.getElementById(\"saida\").textContent = String(resultado); essa linha localiza o pre e coloca texto nele, sem interpretar HTML. Não cole as tags script dentro de outro script. Se o resultado não mudar, confira primeiro o arquivo aberto e se houve erro no Console.",
    "why": "Exemplos modernos usam sintaxes que reduzem repetição, mas cada abreviação tem regras. Esta aula não é uma lista de atalhos para memorizar: vamos transformar um perfil e suas sessões mantendo o original. Você deve conseguir reescrever as partes principais em funções tradicionais e acessos por ponto, provando que compreendeu a operação por trás da sintaxe.",
    "sections": [
      {
        "title": "Arrow functions com retorno claro",
        "paragraphs": [
          "const dobro = (numero) => numero * 2 cria uma função de um parâmetro com retorno implícito da expressão. A forma equivalente para esse cálculo é const dobro = function(numero) { return numero * 2; };. Com um parâmetro simples os parênteses podem ser omitidos; com zero ou vários parâmetros eles são necessários. Prefira manter uma convenção legível enquanto aprende.",
          "Quando o corpo usa chaves, o retorno deixa de ser implícito: (numero) => { return numero * 2; }. Escrever (numero) => { numero * 2; } retorna undefined. Para devolver um objeto literal diretamente, envolva-o em parênteses: (nome) => ({ nome: nome }). Sem os parênteses, as chaves seriam interpretadas como bloco, não como o objeto desejado.",
          "Arrow functions não possuem seu próprio this. this é um valor de contexto usado em determinados tipos de chamada; funções tradicionais e arrows diferem nessa regra. Por isso não substitua automaticamente métodos que dependem de this por arrows. Também não use arrow como função construtora com new. Para nossos callbacks de cálculo, que usam somente parâmetros, a forma curta é apropriada.",
          "Pausa de prática: antes de executar, preveja o retorno de (n) => n * 3 e (n) => { n * 3; } com n igual a 4. Confira no Console e localize o return ausente."
        ]
      },
      {
        "title": "Extrair, reunir, espalhar e copiar",
        "paragraphs": [
          "const { nome, meta } = perfil lê propriedades com esses nomes e cria variáveis locais. É equivalente, neste caso simples, a const nome = perfil.nome e const meta = perfil.meta. A ordem das propriedades não importa; o nome importa. Para renomear use const { nome: nomeExibido } = perfil. Isso cria nomeExibido, não uma nova variável chamada nome.",
          "Um padrão pode definir valor padrão: const { meta = 30 } = perfil. O padrão atua quando a propriedade é undefined, não quando vale null, zero ou false. A desestruturação de null ou undefined lança erro porque não existe objeto do qual extrair. Não use esse padrão como substituto de validar a origem dos dados.",
          "Com arrays, a posição importa: const [primeiro, segundo] = [10,20] cria 10 e 20. const [inicio, ...restante] = tempos separa o primeiro item e reúne os demais em um novo array. Os três pontos nessa posição são rest: coletam o restante. Em parâmetros, function somar(...numeros) recebe uma quantidade variável de argumentos em um array. rest precisa ser o último elemento naquela lista.",
          "Pausa de prática: em const [inicio, ...restante] = [10, 20, 30], preveja os dois valores e confira no Console antes de avançar para spread.",
          "Spread usa ... para espalhar valores em outro literal ou chamada. const novos = [...tempos, 40] cria um array com os valores anteriores e um novo item. const atualizado = { ...perfil, meta: 60 } cria um objeto com as propriedades enumeráveis próprias copiadas e depois sobrescreve meta. A ordem importa: { meta:60, ...perfil } permite que a meta original sobrescreva o 60.",
          "A cópia é rasa. Se perfil contém preferencias: { tema:\"escuro\" }, a cópia do perfil continua apontando para o mesmo objeto preferencias. Para mudar tema preservando o original, copie também esse nível: { ...perfil, preferencias: { ...perfil.preferencias, tema:\"claro\" } }. Isso não é necessário para propriedades primitivas, mas é essencial quando a alteração chega a objetos aninhados.",
          "Em uma chamada, Math.max(...tempos) passa cada item como argumento separado. Não use spread indiscriminadamente em coleções enormes para chamadas de função, porque há limites de quantidade de argumentos. Um reduce pode ser mais apropriado nesse cenário. Nesta aula usamos listas pequenas e foco na clareza sobre o que foi copiado e o que permaneceu compartilhado.",
          "Pausa de prática: desenhe original → preferencias e copia → preferencias antes de executar const copia = { ...original }. Se alterar copia.preferencias.tema, preveja o tema no original e confira no Console."
        ],
        "diagramTitle": "Dois objetos externos compartilham o mesmo objeto interno",
        "diagram": "const original = { preferencias: { tema: \"escuro\" } };\nconst copia = { ...original };\n\noriginal ──→ objeto A ──┐\n                       ├──→ preferencias P { tema: \"escuro\" }\ncopia ────→ objeto B ──┘\n\ncopia.preferencias.tema = \"claro\";\noriginal.preferencias.tema também é \"claro\".\nPara isolar, copie preferencias ao criar o novo objeto."
      },
      {
        "title": "Dados opcionais: ?. e ??",
        "paragraphs": [
          "perfil.contato?.email tenta acessar email somente quando contato não é null nem undefined; caso contrário o resultado é undefined. Isso se chama optional chaining. Não verifica se o e-mail é válido e não transforma tipos incorretos no tipo esperado. A variável base precisa existir: escrever uma variável nunca declarada continua sendo erro, mesmo com ?..",
          "O operador ?? fornece um padrão somente quando o lado esquerdo é null ou undefined: perfil.meta ?? 30 preserva uma meta zero. O operador || também troca valores falsy como zero, false e string vazia. Escolha de acordo com o significado: zero pode ser um limite válido, e false pode ser uma preferência explicitamente desligada. Ausência é diferente de uma escolha negativa.",
          "Combine com intenção: perfil.contato?.email ?? \"Não informado\" trata contato ausente e e-mail ausente. Se email for \"\", a saída será vazia porque ?? preserva essa string; caso vazio seja inválido, você precisa de uma validação adicional. Não misture ?? diretamente com && ou || sem parênteses. Parênteses também ajudam quem lê a entender qual regra deve acontecer primeiro.",
          "Pausa de prática: para meta igual a 0, null e undefined, preveja separadamente meta || 30 e meta ?? 30. Confira no Console e explique por que 0 deve continuar 0 neste exemplo."
        ]
      },
      {
        "title": "Refatorar sem mudar a regra",
        "paragraphs": [
          "Refatorar significa reorganizar o código preservando o comportamento desejado. Trocar function por arrow, acessos repetidos por destructuring ou uma cópia manual por spread deve manter os mesmos resultados para entradas normais e limites. Não faça todas as trocas antes de conferir: altere uma parte, execute os testes e só então continue.",
          "No exemplo, os nomes e durações vêm de objetos. map gera frases com arrow e destructuring do parâmetro; reduce soma os minutos. O perfil atualizado preserva o original porque copiamos também preferencias. A ausência de contato produz uma mensagem definida. Uma meta zero é mostrada como zero. Cada escolha de sintaxe corresponde a uma regra que pode ser verificada no Console.",
          "Código curto não é automaticamente mais claro. Se você precisa explicar uma expressão muito aninhada por vários minutos, extraia valores intermediários ou use if. O objetivo é que outra pessoa consiga localizar as entradas, acompanhar a transformação e prever as saídas, não impressionar com a quantidade de operadores em uma linha."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>JavaScript moderno: funções curtas e dados opcionais\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>JavaScript moderno: funções curtas e dados opcionais\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst perfil = { nome: \"Ana\", meta: 0, preferencias: { tema: \"escuro\" } };\nconst sessoes = [{ titulo: \"HTML\", minutos: 30 }, { titulo: \"CSS\", minutos: 45 }];\nconst { nome: nomeExibido } = perfil;\nconst atualizado = {\n  ...perfil,\n  preferencias: { ...perfil.preferencias, tema: \"claro\" }\n};\nconst linhas = sessoes.map(({ titulo, minutos }) => `${titulo}: ${minutos} min`);\nconst total = sessoes.reduce((soma, { minutos }) => soma + minutos, 0);\nconst email = perfil.contato?.email ?? \"Não informado\";\nconst meta = perfil.meta ?? 30;\ndocument.getElementById(\"saida\").textContent = `${nomeExibido}\n${linhas.join(\"\\n\")}\nTotal: ${total}\nMeta: ${meta}\nE-mail: ${email}`;\nconsole.log(perfil.preferencias.tema, atualizado.preferencias.tema);\nconsole.log(perfil.meta || 30, perfil.meta ?? 30);\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O destructuring renomeia nome para nomeExibido sem alterar o objeto.",
        "A cópia aninhada de preferencias evita que a mudança de tema afete perfil.",
        "O callback de map extrai duas propriedades e retorna uma string implicitamente.",
        "reduce usa a mesma ideia com acumulador inicial zero.",
        "Optional chaining permite contato ausente; ?? define a mensagem e preserva a meta zero."
      ],
      "expected": "Ana; HTML: 30 min; CSS: 45 min; Total: 75; Meta: 0; E-mail: Não informado. Console: escuro claro; 30 0."
    },
    "guided": [
      {
        "instruction": "Acrescente contato: { email: \"ana@example.com\" } ao perfil.",
        "result": "A página mostra o e-mail fornecido."
      },
      {
        "instruction": "Mude meta para null e depois para 0.",
        "result": "Com null o padrão é 30; com zero o padrão não substitui o valor."
      },
      {
        "instruction": "Reescreva somente o callback de map com function(item) e return explícito.",
        "result": "A lista exibida permanece idêntica, confirmando a equivalência nesse caso."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga o retorno de function triplo(n) { return n * 3; } para 4. Depois converta para arrow com retorno implícito, teste com 4 e compare.",
        "hints": [
          "A expressão vem diretamente depois de =>.",
          "Não use chaves se não pretende escrever return."
        ],
        "solution": "const triplo = (n) => n * 3;\ndocument.getElementById(\"saida\").textContent = String(triplo(4));",
        "explanation": "As duas formas produzem o mesmo cálculo porque só dependem do parâmetro. A concisão não muda o contrato.",
        "expected": "A previsão é anotada antes da conversão; os retornos das duas implementações são comparados.",
        "criteria": ["Previsão anotada antes da conversão para arrow.","Duas implementações devolvem resultado equivalente."]
      },
      {
        "prompt": "Alterar: no script do exemplo, substitua temporariamente o perfil por um curso { titulo:\"JS\", vagas:0 }; extraia titulo como nomeCurso e mostre vagas usando padrão 10 somente se ausente. Depois restaure o exemplo.",
        "hints": [
          "Use titulo: nomeCurso no padrão.",
          "?? preserva zero."
        ],
        "solution": "const curso = { titulo:\"JS\", vagas:0 };\nconst { titulo: nomeCurso } = curso;\nconst vagas = curso.vagas ?? 10;\ndocument.getElementById(\"saida\").textContent = `${nomeCurso}: ${vagas}`;",
        "explanation": "Zero significa que não há vagas, e trocar por 10 inventaria disponibilidade. O padrão se aplica a ausência, não a uma contagem válida igual a zero.",
        "expected": "JS: 0.",
        "criteria": ["Título extraído com o alias pedido e vagas exibidas.","Valor zero é mantido; padrão só cobre valor ausente."]
      },
      {
        "prompt": "Construir: dado aluno = {nome:\"Bia\", plano:{minutos:30}}, crie outro objeto com minutos 45 sem alterar aluno. Acrescente uma sessão de 15 ao array [20,30] sem alterá-lo. Mostre as duas versões.",
        "hints": [
          "Copie o nível aluno e o nível plano.",
          "Use spread dentro de um novo array."
        ],
        "solution": "const aluno = {nome:\"Bia\", plano:{minutos:30}};\nconst novoAluno = {...aluno, plano:{...aluno.plano,minutos:45}};\nconst sessoes = [20,30];\nconst novasSessoes = [...sessoes,15];\ndocument.getElementById(\"saida\").textContent = `${aluno.plano.minutos} / ${novoAluno.plano.minutos}\\n${sessoes.join(\",\")} / ${novasSessoes.join(\",\")}`;",
        "explanation": "A cópia de cada nível alterado protege o objeto original. O array contém números, portanto a cópia rasa é suficiente para acrescentar um item sem compartilhar um objeto interno modificado.",
        "expected": "30 / 45; 20,30 / 20,30,15.",
        "criteria": ["Objeto e array originais permanecem intactos.","Novos valores são criados sem compartilhar a parte aninhada alterada."]
      },
      {
        "prompt": "Investigar erro: const criar = nome => { nome: nome }; não devolve o objeto desejado. Antes de corrigir, preveja o retorno e identifique se as chaves iniciam um bloco ou objeto. Corrija e verifique criar(\"Lia\").nome.",
        "hints": [
          "Chaves depois de => iniciam um bloco.",
          "Use parênteses ao redor do objeto ou return explícito."
        ],
        "solution": "const criar = (nome) => ({ nome: nome });\ndocument.getElementById(\"saida\").textContent = criar(\"Lia\").nome;",
        "explanation": "O corpo original é interpretado como bloco, com uma instrução rotulada, e não executa return. Os parênteses tornam o literal de objeto uma expressão retornada.",
        "expected": "A previsão é registrada primeiro; a execução permite conferir a interpretação das chaves e do objeto.",
        "criteria": ["Previsão e hipótese sobre chaves registradas antes.","Função devolve objeto e nome acessível após chamada."]
      }
    ],
    "mistakes": [
      "Arrow com chaves precisa de return para devolver um valor; confira callbacks que produzem undefined.",
      "Destructuring renomeado cria o nome novo, não os dois nomes.",
      "Spread é cópia rasa; copie também os níveis internos que serão alterados.",
      "Usar || como padrão pode apagar zero ou false legítimos; considere ??."
    ],
    "quiz": [
      {
        "question": "Qual arrow devolve um objeto?",
        "options": [
          "x => { valor: x }",
          "x => ({ valor: x })",
          "x => return { valor: x }"
        ],
        "correctIndex": 1,
        "explanation": "Parênteses fazem as chaves serem interpretadas como literal de objeto na expressão."
      },
      {
        "question": "Qual é o resultado de 0 ?? 10?",
        "options": [
          "10",
          "0",
          "undefined"
        ],
        "correctIndex": 1,
        "explanation": "Zero não é null nem undefined, portanto é preservado."
      },
      {
        "question": "O que {...obj} garante?",
        "options": [
          "Cópia profunda de qualquer estrutura.",
          "Novo objeto com cópia rasa das propriedades enumeráveis próprias.",
          "Congelamento do original."
        ],
        "correctIndex": 1,
        "explanation": "Objetos internos ainda podem compartilhar referências, exigindo cópia adicional quando alterados."
      }
    ],
    "summary": [
      "Use sintaxe moderna com compreensão da forma equivalente.",
      "Diferencie rest que reúne de spread que espalha.",
      "Trate ausência sem apagar valores legítimos e copie níveis alterados."
    ]
  },
"js-debug": {
    "prerequisites": "Funções, arrays, objetos, métodos de transformação e controle de fluxo.",
    "setup": "Crie uma pasta javascript-estudos e salve o exemplo completo em um arquivo .html, usando texto simples e UTF-8. Abra-o no navegador; não precisa de biblioteca, servidor, conta ou conexão. A cada mudança, salve e atualize a página. Abra as ferramentas do desenvolvedor pelo menu do navegador e selecione Console para ver mensagens e erros. Nos exercícios, substitua somente o conteúdo do script, mantendo o documento e o pre com id=\"saida\". Para exibir um resultado use document.getElementById(\"saida\").textContent = String(resultado); essa linha localiza o pre e coloca texto nele, sem interpretar HTML. Não cole as tags script dentro de outro script. Se o resultado não mudar, confira primeiro o arquivo aberto e se houve erro no Console.",
    "why": "Um programa mostrar uma saída plausível não prova que a regra está correta. Depurar é descobrir por que a execução divergiu da intenção; testar é criar verificações repetíveis dessa intenção. As duas atividades fazem parte de programar desde o primeiro projeto. Nesta aula construiremos um pequeno conjunto de testes para uma função de média e aprenderemos a diferenciar um erro tratado de um erro escondido.",
    "sections": [
      {
        "title": "Reconhecer e investigar problemas",
        "paragraphs": [
          "Um erro de sintaxe impede interpretar o script, como faltar um fechamento de parêntese. Um erro de execução surge quando uma instrução tenta algo inválido, como ler propriedade de undefined. Um erro lógico executa sem necessariamente lançar exceção, mas produz resultado errado: dividir uma soma pelo número errado de itens é um exemplo. Cada classe pede uma observação diferente.",
          "Leia a primeira mensagem de erro e a linha indicada, depois inspecione também as linhas anteriores. Um fechamento ausente pode ser apontado somente mais adiante. ReferenceError costuma indicar nome inexistente ou uso antes da inicialização; TypeError costuma envolver uma operação incompatível com o valor recebido. O nome da categoria é uma pista, não uma explicação completa do defeito.",
          "Primeiro reproduza o problema com o menor conjunto de dados possível. Escreva o que esperava e o que ocorreu. Depois identifique a primeira etapa em que o dado deixa de corresponder à previsão. console.log(\"antes\", valor, typeof valor) ajuda a observar, mas espalhar dezenas de mensagens sem hipótese torna a investigação ruidosa. Faça uma alteração por vez e execute novamente.",
          "As ferramentas do navegador oferecem breakpoints, pontos onde a execução pausa. Abra o painel Sources ou Fontes, localize seu arquivo HTML e clique no número da linha dentro da função. Atualize a página para executar novamente. Ao pausar, examine os valores de parâmetros e variáveis no painel de escopo. Use avançar uma instrução para acompanhar o próximo passo; continuar retoma até o próximo ponto de parada.",
          "Uma instrução debugger; também solicita pausa quando as ferramentas estão abertas e a depuração está habilitada. Remova-a quando terminar a investigação. A pilha de chamadas mostra quais funções levaram à linha atual, ajudando a localizar quem forneceu um argumento inválido. Evite editar vários pontos com base apenas no sintoma final: confirme a origem dos dados antes de corrigir a fórmula.",
          "Pausa de prática: antes de corrigir soma / (notas.length - 1) para [6, 8], anote o valor esperado, o observado e a primeira expressão suspeita. Só então use um breakpoint ou console.log para confirmar a hipótese."
        ]
      },
      {
        "title": "Contratos e exceções",
        "paragraphs": [
          "Uma função deve dizer quais entradas aceita. Nossa media aceita um array não vazio de números finitos entre 0 e 10. Isso exclui strings, NaN, Infinity, valores negativos e notas acima de 10. O retorno é um número. Como não existe média válida para uma lista vazia neste contrato, vamos lançar um erro em vez de inventar zero.",
          "throw new Error(\"mensagem\") interrompe o fluxo normal e comunica uma exceção. TypeError é apropriado aqui quando a estrutura ou tipo não corresponde ao esperado; RangeError pode representar valor fora da faixa definida. Essas categorias ajudam a explicar o contrato, mas o texto da mensagem também deve orientar. Uma exceção não tratada interrompe aquele fluxo; não significa necessariamente que todo o navegador parou.",
          "try { ... } catch (erro) { ... } permite tratar uma exceção lançada dentro da execução síncrona do bloco try. O catch recebe o objeto de erro; erro.message contém a mensagem para erros comuns. finally, quando presente, executa ao sair dessa estrutura e serve para limpeza. Evite retornar de finally, pois pode substituir retornos ou erros anteriores. Erros de operações assíncronas exigirão tratamento próprio na aula de Promises.",
          "Pausa de prática: para media([]), preveja se haverá um número, TypeError ou RangeError. Execute dentro de try/catch e confira a categoria e a mensagem sem fabricar uma média."
        ]
      },
      {
        "title": "Tratar não é esconder",
        "paragraphs": [
          "Não envolva tudo em um catch vazio. Se a regra falhar e o código continuar mostrando um sucesso antigo, o usuário receberá uma informação falsa. Tratar significa escolher um comportamento adequado: apresentar uma mensagem, permitir correção ou interromper uma ação dependente. Um erro inesperado durante desenvolvimento também deve ser investigado, mesmo quando há mensagem amigável na interface.",
          "Validação de entrada e erro inesperado não são exatamente a mesma coisa. O formulário pode orientar uma pessoa sobre um campo obrigatório antes de chamar a função. A função ainda valida seu contrato porque pode ser chamada por outros caminhos. Essa duplicação de fronteiras tem propósito: a interface orienta; a regra protege sua própria consistência. Evite converter qualquer valor silenciosamente dentro da função se o contrato exige números.",
          "Pausa de prática: compare um catch vazio com outro que mostre erro.message para media([]). Escreva o que o usuário observa em cada caso e por que o primeiro esconde a falha."
        ]
      },
      {
        "title": "Testes independentes, cobertura e regressão",
        "paragraphs": [
          "console.assert(condicao, mensagem) registra uma falha no Console quando a condição é falsa, mas não lança uma exceção por si só. É útil para verificações rápidas, porém você precisa olhar o Console. No exemplo criaremos verificar, que acumula linhas PASSOU ou FALHOU e lança Error quando uma expectativa não é atendida. Assim o resultado fica também visível na página.",
          "Um teste escolhe entrada, executa a função e compara com um resultado esperado definido a partir da regra. Para média de [6,8], a expectativa é 7 porque somamos 14 e dividimos por dois. Não calcule a expectativa chamando a própria função novamente: isso apenas compara o programa com ele mesmo e repete o possível defeito.",
          "Para testar uma exceção, precisamos verificar que ela realmente aconteceu. Uma função auxiliar pode executar uma operação dentro de try e retornar false se nada foi lançado; catch retorna true. Passamos uma função callback para que a operação seja executada dentro do try, e não antes. Um teste mais rigoroso também pode verificar o tipo do erro para evitar considerar qualquer falha acidental como sucesso.",
          "Escolha casos normais, limites e inválidos: duas notas comuns, uma nota única, zero e dez, lista vazia, texto e número fora da faixa. Isso não garante ausência de todos os defeitos, mas cobre partes diferentes do contrato. Quando corrigir um bug, acrescente um teste que falhava antes e passa depois. Esse teste de regressão ajuda a não reintroduzir o mesmo problema.",
          "Faça uma experiência controlada: altere o divisor da média para notas.length + 1 e veja os testes normais falharem. Depois restaure. Um conjunto que nunca acusa uma mudança claramente errada não está verificando a regra com força suficiente. Preserve as funções puras sempre que possível, pois elas podem ser testadas sem montar uma interface ou depender de rede, relógio e cliques.",
          "Pausa de prática: preveja qual teste falhará primeiro ao mudar o divisor para notas.length + 1. Execute, registre a primeira falha e restaure a regra; confira que os mesmos testes voltam a passar."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Depuração, erros e testes de regras\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Depuração, erros e testes de regras\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nfunction media(notas) {\n  if (!Array.isArray(notas)) { throw new TypeError(\"Forneça um array.\"); }\n  if (notas.length === 0) { throw new RangeError(\"Informe ao menos uma nota.\"); }\n  for (const nota of notas) {\n    if (!Number.isFinite(nota) || nota \u003c 0 || nota > 10) {\n      throw new RangeError(\"Cada nota deve ser um número de 0 a 10.\");\n    }\n  }\n  return notas.reduce((soma, nota) => soma + nota, 0) / notas.length;\n}\nconst resultados = [];\nfunction verificar(nome, condicao) {\n  resultados.push(`${condicao ? \"PASSOU\" : \"FALHOU\"}: ${nome}`);\n  if (!condicao) { throw new Error(`Teste falhou: ${nome}`); }\n}\nfunction lancaRangeError(operacao) {\n  try { operacao(); return false; }\n  catch (erro) { return erro instanceof RangeError; }\n}\ntry {\n  verificar(\"média comum\", media([6, 8]) === 7);\n  verificar(\"nota única\", media([5]) === 5);\n  verificar(\"limites\", media([0, 10]) === 5);\n  verificar(\"lista vazia\", lancaRangeError(() => media([])));\n  verificar(\"nota inválida\", lancaRangeError(() => media([11])));\n  verificar(\"texto não convertido\", lancaRangeError(() => media([\"8\"])));\n} catch (erro) {\n  resultados.push(`Investigação necessária: ${erro.message}`);\n}\ndocument.getElementById(\"saida\").textContent = resultados.join(\"\\n\");\nconsole.assert(media([2, 4]) === 3, \"Média de 2 e 4 deveria ser 3\");\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "media separa validação de cálculo e não altera o array recebido.",
        "O laço valida cada nota; reduce calcula a soma somente depois de aceitar todas.",
        "verificar recebe uma condição já calculada, registra o resultado e para na primeira falha deste laboratório.",
        "lancaRangeError recebe uma função para controlar o momento da execução e usa instanceof para conferir a categoria.",
        "O catch externo mostra a falha no relatório, enquanto console.assert demonstra uma alternativa de inspeção no Console."
      ],
      "expected": "Seis linhas PASSOU para média comum, nota única, limites, lista vazia, nota inválida e texto não convertido. O console.assert final não registra falha."
    },
    "guided": [
      {
        "instruction": "Altere o divisor para notas.length + 1.",
        "result": "O primeiro teste falha e o relatório informa investigação necessária; restaure depois."
      },
      {
        "instruction": "Coloque um breakpoint na linha do return de media e atualize.",
        "result": "Na primeira chamada os parâmetros são [6,8]; a soma é 14 e o tamanho é 2."
      },
      {
        "instruction": "Acrescente um teste para media([0]) === 0.",
        "result": "Ele passa, comprovando que zero é uma nota válida e não ausência."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga o retorno de dobro(n) para 3 e 0 quando a regra é n*2. Escreva dois console.assert para esses casos; depois mude temporariamente a função para n+2 e observe as falhas.",
        "hints": [
          "A expectativa deve ser um valor conhecido.",
          "Zero é um caso importante, não apenas números positivos."
        ],
        "solution": "function dobro(n) { return n*2; }\nconsole.assert(dobro(3) === 6, \"dobro de 3\");\nconsole.assert(dobro(0) === 0, \"dobro de 0\");",
        "explanation": "Os testes normais não precisam mostrar uma mensagem de sucesso. A alteração controlada demonstra que as expectativas detectam uma regra errada. Restaure a multiplicação após a experiência.",
        "expected": "Previsões e asserções ficam registradas antes; compare os resultados antes e depois da alteração.",
        "criteria": ["Previsões e asserções registradas antes.","Falhas após mudança são observadas e função restaurada."]
      },
      {
        "prompt": "Alterar: no script do exemplo, substitua o relatório de testes por uma chamada a media([]) tratada em try/catch e mostre a mensagem do erro na página. Mantenha a função media e não substitua a média inválida por zero.",
        "hints": [
          "A chamada deve estar dentro do try.",
          "O catch recebe o objeto de erro e pode ler message."
        ],
        "solution": "try {\n  const resultado = media([]);\n  document.getElementById(\"saida\").textContent = String(resultado);\n} catch (erro) {\n  document.getElementById(\"saida\").textContent = erro.message;\n}",
        "explanation": "Mantenha a declaração de media antes deste trecho e substitua o restante do script. A mensagem informa o que falta, sem fabricar um resultado matemático válido.",
        "expected": "Informe ao menos uma nota.",
        "criteria": ["Erro é capturado e mensagem aparece na página.","Função não muda e dado inválido não vira zero silenciosamente."]
      },
      {
        "prompt": "Construir: implemente dividir(a,b) para números finitos, recusando divisor zero com RangeError e outros dados inválidos com TypeError. Teste 10/2, 0/2, divisor zero e entrada \"10\".",
        "hints": [
          "Number.isFinite não converte strings.",
          "Valide tipos antes de testar o divisor."
        ],
        "solution": "function dividir(a,b) {\n  if (!Number.isFinite(a) || !Number.isFinite(b)) { throw new TypeError(\"Use números finitos.\"); }\n  if (b === 0) { throw new RangeError(\"Divisor não pode ser zero.\"); }\n  return a/b;\n}\nconsole.assert(dividir(10,2) === 5, \"10/2\");\nconsole.assert(dividir(0,2) === 0, \"0/2\");\nlet recusouZero = false;\ntry { dividir(10,0); } catch (e) { recusouZero = e instanceof RangeError; }\nconsole.assert(recusouZero, \"recusa zero\");\nlet recusouTexto = false;\ntry { dividir(\"10\",2); } catch(e) { recusouTexto = e instanceof TypeError; }\nconsole.assert(recusouTexto, \"recusa texto\");",
        "explanation": "Os flags começam falsos para que a ausência de exceção não passe despercebida. Conferir a categoria evita aceitar um erro completamente diferente como prova de validação correta.",
        "expected": "Quatro verificações sem falhas. Os retornos válidos são 5 e 0.",
        "criteria": ["Valida finitude e tipo antes de dividir.","Zero gera RangeError; dados inválidos geram TypeError."]
      },
      {
        "prompt": "Investigar erro: uma função calcula soma / (notas.length - 1). Para [6,8] devolve 14. Registre esperado e observado, localize a expressão divergente, corrija e acrescente um teste de regressão com uma nota única.",
        "hints": [
          "O número de notas é length, não o último índice.",
          "Com uma nota, length - 1 produz divisor zero."
        ],
        "solution": "function mediaSimples(notas) {\n  return notas.reduce((soma,n) => soma+n,0) / notas.length;\n}\nconsole.assert(mediaSimples([6,8]) === 7, \"duas notas\");\nconsole.assert(mediaSimples([4]) === 4, \"uma nota\");",
        "explanation": "Este trecho isola o cálculo para diagnosticar o divisor. Na função final mantenha também a validação completa do exemplo, pois esta versão reduzida pressupõe array não vazio de notas válidas.",
        "expected": "As duas expectativas passam e a causa é a confusão entre contagem e último índice.",
        "criteria": ["Reproduz diferença para duas notas.","Teste de regressão também cobre uma nota."]
      }
    ],
    "mistakes": [
      "Catch vazio esconde o defeito; registre ou apresente um resultado coerente e investigue a causa.",
      "Testar só o caminho feliz deixa limites descobertos; inclua vazio, zero e tipos inválidos.",
      "Calcular a expectativa com a própria função não cria uma referência independente.",
      "console.assert informa no Console, não substitui automaticamente um relatório de testes ou bloqueia o programa."
    ],
    "quiz": [
      {
        "question": "Qual situação é um erro lógico?",
        "options": [
          "Somar corretamente e dividir pelo número errado de itens.",
          "Esquecer uma chave de fechamento.",
          "Usar um nome que não foi declarado."
        ],
        "correctIndex": 0,
        "explanation": "O código pode executar e ainda violar a regra; os demais exemplos costumam gerar erros de sintaxe ou execução."
      },
      {
        "question": "O que console.assert faz quando a condição é falsa?",
        "options": [
          "Sempre lança Error e encerra o script.",
          "Registra uma falha no Console.",
          "Corrige automaticamente a expressão."
        ],
        "correctIndex": 1,
        "explanation": "É uma verificação de console; não equivale a throw."
      },
      {
        "question": "Por que um teste de exceção deve falhar se nada for lançado?",
        "options": [
          "Porque todo programa deve lançar erros.",
          "Porque a ausência de recusa viola o contrato da entrada inválida.",
          "Porque try só funciona com arrays."
        ],
        "correctIndex": 1,
        "explanation": "O teste precisa verificar o comportamento esperado, incluindo recusar dados proibidos."
      }
    ],
    "summary": [
      "Reproduza, formule uma hipótese e observe a primeira divergência.",
      "Contratos claros orientam validação e tratamento de erros.",
      "Testes devem ter expectativas independentes e cobrir casos que podem falhar."
    ]
  },
"js-dom": {
    "prerequisites": "Conclua valores, controle de fluxo, funções, arrays, objetos, sintaxe moderna e depuração. Tenha uma página HTML com título, parágrafos e listas. Você já deve conseguir percorrer um array e explicar o retorno de uma função.",
    "setup": "Crie uma pasta laboratorio-dom. Salve o documento completo como index.html em UTF-8 e abra no navegador. O script está depois dos elementos que utiliza, portanto eles já foram lidos. Abra as ferramentas do desenvolvedor e o painel Console. Toda alteração desta aula ocorre no arquivo local; salve e atualize para testar. Os exercícios indicam trechos a alterar dentro desse documento.",
    "why": "Uma página pode mudar depois de aberta: mostrar uma tarefa nova, atualizar um total ou avisar que uma lista está vazia. O DOM é a representação do documento em objetos que o JavaScript consegue acessar. Aprender essa interface conecta as estruturas de dados estudadas anteriormente ao resultado que uma pessoa enxerga e utiliza.",
    "sections": [
      {
        "title": "Da marcação à árvore de objetos",
        "paragraphs": [
          "O arquivo HTML é texto. Ao interpretá-lo, o navegador constrói uma árvore de nós. O documento é a raiz de acesso; elementos como ul e li formam relações de pai, filho e irmão. Nós de texto também fazem parte dessa árvore. Portanto, nó e elemento não são sinônimos perfeitos: um elemento é um tipo de nó.",
          "document é o objeto que representa a página atual. document.querySelector(\"#lista\") procura o primeiro elemento que combina com um seletor CSS. O resultado é uma referência ao elemento, não uma cópia do HTML. Mudar suas propriedades pode modificar o que aparece imediatamente. Inspecione a lista no painel Elements para observar os li criados pelo script.",
          "Se o seletor não encontra nada, o retorno é null. Tentar acessar textContent de null causa um erro. Primeiro confira a grafia do id e o momento em que o script executa. Um script antes do elemento pode rodar cedo demais. Além da posição no final do body, arquivos de script clássicos podem usar defer para aguardar a leitura do documento."
        ]
      },
      {
        "title": "Seleção, propriedades e coleções",
        "paragraphs": [
          "querySelectorAll(\"li\") retorna uma NodeList estática com todos os resultados naquele instante. Você pode percorrê-la com for...of ou forEach. Ela não se atualiza automaticamente quando novos itens são inseridos. Se precisar refletir a nova lista, faça outra consulta ou use diretamente os dados que originaram a interface.",
          "Propriedades representam o estado atual de um controle. Em um input, value é o texto atual, checked representa a seleção de uma caixa e disabled informa se o controle está indisponível. Atributos descrevem a marcação; nem sempre acompanham todas as alterações de estado. Para ler o que alguém digitou, use input.value, não getAttribute(\"value\").",
          "classList.add, remove e toggle manipulam classes sem apagar as demais. toggle(\"feito\", condicao) garante que a classe exista exatamente quando a condição é verdadeira. dataset permite acessar atributos data-* como strings: data-indice vira dataset.indice. Esses dados ajudam a identificar itens, mas não substituem validação nem tornam informações secretas."
        ]
      },
      {
        "title": "Conteúdo seguro e mudanças explícitas",
        "paragraphs": [
          "textContent atribui texto sem interpretá-lo como HTML. Se o assunto fosse \u003cstrong>SQL\u003c/strong>, os sinais apareceriam literalmente. Isso é adequado para nomes, mensagens e conteúdo vindo de formulários ou arquivos. innerHTML interpreta marcação; concatenar entradas desconhecidas ali pode criar elementos e comportamento indesejado. Nesta trilha, dados entram por textContent.",
          "innerText reflete texto renderizado e considera aspectos da apresentação; textContent lê ou substitui o conteúdo textual da árvore, inclusive texto de regiões ocultas. Para preencher um rótulo conhecido, textContent costuma ser a opção simples. Nenhuma dessas propriedades é um mecanismo de formatação rica: crie os elementos de formatação explicitamente quando precisar deles.",
          "createElement cria um elemento ainda fora da página. Você configura seu texto, suas classes e seus atributos e depois usa append para inseri-lo. remove retira um elemento existente; replaceChildren substitui todos os filhos. Evite remover um elemento com foco sem decidir onde o foco ficará, especialmente em interfaces com botões e formulários."
        ]
      },
      {
        "title": "Dados primeiro, interface depois",
        "paragraphs": [
          "No exemplo, assuntos é a fonte dos nomes. renderizar transforma esse array em itens visíveis. A função limpa a lista antes de reconstruí-la para não duplicar resultados. Essa separação deixa claro onde alterar o conteúdo: mude o array e execute a renderização novamente. O DOM mostra o estado; ele não precisa ser seu único armazenamento.",
          "Reconstruir uma lista pequena é uma estratégia didática. Em formulários grandes, substituir tudo pode perder foco, seleção ou valores digitados. Nesses casos atualize somente a parte necessária. Não é preciso usar uma biblioteca para perceber o problema: digite em um campo, remova seu elemento pelo código e observe por que o contexto do usuário desaparece.",
          "Avalie a interface também sem olhar o código. A lista tem itens legíveis? O resumo acompanha o número real? A marca de conclusão tem significado além da cor? Nesta aula a primeira conclusão é fixa para isolar DOM; a próxima aula introduz ações que alteram o estado. Não confunda essa simplificação com um gerenciador de tarefas completo."
        ]
      }
    ],
    "example": {
      "language": "HTML + JavaScript",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Minha lista de estudo\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Minha lista de estudo\u003c/h1>\n\u003cp id=\"resumo\" role=\"status\">\u003c/p>\n\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\n\"use strict\";\nconst assuntos = [\"HTML\", \"CSS\", \"JavaScript\"];\nconst lista = document.querySelector(\"#lista\");\nconst resumo = document.querySelector(\"#resumo\");\n\nfunction renderizar() {\n  lista.replaceChildren();\n  for (const [indice, assunto] of assuntos.entries()) {\n    const item = document.createElement(\"li\");\n    item.textContent = assunto;\n    item.dataset.indice = String(indice);\n    item.classList.toggle(\"feito\", indice === 0);\n    lista.append(item);\n  }\n  resumo.textContent = `${assuntos.length} assuntos; o primeiro foi concluído.`;\n}\nrenderizar();\n\u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "As consultas acontecem depois do HTML e localizam a lista e o parágrafo de status.",
        "entries fornece pares de índice e assunto; a desestruturação dá nomes a esses dois valores.",
        "replaceChildren deixa a função repetível: chamar duas vezes não duplica a lista.",
        "Cada li recebe texto literal, um índice em dataset e uma classe de acordo com a condição.",
        "O total vem de assuntos.length, evitando escrever um número que ficaria desatualizado."
      ],
      "expected": "A página mostra três itens: HTML, CSS e JavaScript. HTML aparece riscado. O resumo informa 3 assuntos; o primeiro foi concluído."
    },
    "guided": [
      {
        "instruction": "Execute o exemplo e inspecione ul no painel de elementos. Compare com o arquivo salvo.",
        "result": "Os três li existem no DOM, embora não estejam escritos no HTML inicial."
      },
      {
        "instruction": "Acrescente \"SQL\" ao array e atualize.",
        "result": "Quatro itens e total 4; somente o primeiro continua riscado."
      },
      {
        "instruction": "Chame renderizar() duas vezes no final e confira a quantidade.",
        "result": "A lista permanece com quatro itens, pois os filhos anteriores são substituídos."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: com assuntos = [\"CSS\", \"DOM\"], qual item fica riscado e qual total aparece?",
        "hints": [
          "Observe indice === 0.",
          "O total depende do tamanho do array."
        ],
        "solution": "CSS fica riscado. O resumo informa 2 assuntos.",
        "explanation": "A condição utiliza a posição, não o nome HTML. Mudar os dados altera o texto, mas preserva a regra.",
        "expected": "A previsão é anotada antes; a inspeção permite contar itens e conferir classes.",
        "criteria": ["Previsão de classe e contagem registrada antes.","Lista e resumo são conferidos após renderização."]
      },
      {
        "prompt": "Modificar: deixe todos os itens sem risco e informe somente o total no resumo.",
        "hints": [
          "Retire a atribuição de classe ou passe false para toggle.",
          "Troque o texto do resumo sem alterar o array."
        ],
        "solution": "item.classList.toggle(\"feito\", false);\n// Dentro de renderizar, depois do laço:\nresumo.textContent = `${assuntos.length} assuntos disponíveis.`;",
        "explanation": "São mudanças de apresentação. Não precisamos apagar nem duplicar os dados para realizá-las.",
        "expected": "Nenhum item riscado; total correto no parágrafo.",
        "criteria": ["Itens ficam sem classe de concluído.","Resumo mostra quantidade calculada, sem outros dados."]
      },
      {
        "prompt": "Construir: substitua o array por objetos {nome, concluido}. Mostre os nomes e risque apenas os concluídos. Conte quantos foram concluídos no resumo.",
        "hints": [
          "Use assunto.nome e assunto.concluido dentro do laço.",
          "filter pode produzir os itens concluídos para calcular length."
        ],
        "solution": "const assuntos = [{nome:\"HTML\",concluido:true},{nome:\"CSS\",concluido:false}];\n// No laço de renderizar:\nitem.textContent = assunto.nome;\nitem.classList.toggle(\"feito\", assunto.concluido);\n// Depois do laço:\nresumo.textContent = `${assuntos.filter(a => a.concluido).length} de ${assuntos.length} concluídos.`;",
        "explanation": "Substitua as linhas equivalentes do exemplo. O estado deixa de depender da posição e passa a pertencer a cada objeto.",
        "expected": "HTML riscado, CSS normal e resumo 1 de 2 concluídos.",
        "criteria": ["Cada objeto fornece nome e conclusão para renderizar.","Só concluídos recebem classe e contador vem dos dados."]
      },
      {
        "prompt": "Depurar: querySelector(\"lista\").textContent = \"Olá\" gera erro. Identifique a causa e corrija sem esconder o problema.",
        "hints": [
          "Um seletor sem # procura um nome de elemento.",
          "O exemplo possui id=\"lista\", não uma tag lista."
        ],
        "solution": "const lista = document.querySelector(\"#lista\");\nif (!lista) throw new Error(\"Elemento #lista não encontrado\");",
        "explanation": "Corrigir o seletor resolve a origem. A verificação adicional oferece uma mensagem clara se o HTML mudar; não substitui conferir o documento.",
        "expected": "A inspeção permite localizar o elemento selecionado e evitar acesso a uma referência ausente.",
        "criteria": ["Diagnóstico identifica o alvo encontrado pelo seletor.","Correção confere elemento antes de ler textContent."]
      }
    ],
    "mistakes": [
      "Usar innerHTML com texto digitado: crie elementos e preencha textContent para não interpretar dados como marcação.",
      "Esperar que querySelectorAll se atualize sozinho: consulte novamente ou renderize a partir dos dados.",
      "Acrescentar itens em toda renderização sem limpar: use replaceChildren quando a intenção for reconstruir a lista.",
      "Confundir atributo value com o valor atual: leia a propriedade value do controle."
    ],
    "quiz": [
      {
        "question": "O que querySelector retorna quando nada corresponde?",
        "options": [
          "Uma lista vazia",
          "null",
          "Uma string vazia"
        ],
        "correctIndex": 1,
        "explanation": "Ele retorna o primeiro elemento ou null; querySelectorAll retorna uma coleção."
      },
      {
        "question": "Qual operação mostra \u003cb>Oi\u003c/b> literalmente?",
        "options": [
          "elemento.innerHTML = texto",
          "elemento.textContent = texto",
          "document.write(texto)"
        ],
        "correctIndex": 1,
        "explanation": "textContent insere texto sem interpretar as tags."
      },
      {
        "question": "Por que separar assuntos de renderizar?",
        "options": [
          "Para dispensar HTML",
          "Para tornar os dados independentes da apresentação",
          "Para salvar automaticamente em disco"
        ],
        "correctIndex": 1,
        "explanation": "A separação facilita mudanças e testes; persistência ainda precisa ser implementada."
      }
    ],
    "summary": [
      "O DOM representa o documento em uma árvore de objetos.",
      "Seletores podem falhar; o script precisa encontrar elementos já existentes.",
      "Crie elementos explicitamente e use textContent para dados.",
      "Uma função de renderização transforma estado em interface sem duplicar conteúdo."
    ]
  },
"js-events": {
    "prerequisites": "DOM, funções, arrays e objetos. Você precisa conseguir criar um li, acessar input.value e encontrar um objeto com findIndex. Retome essas operações antes de acrescentar interações.",
    "setup": "Salve o documento completo em agenda.html e abra no navegador. Mantenha o Console aberto para localizar erros. O exemplo funciona sem rede e sem armazenamento; atualizar a página limpa os assuntos. Use nomes de matérias fictícias. Faça cada exercício em uma cópia para comparar com a versão que funcionava.",
    "why": "Uma interface útil responde a ações: digitar, enviar, escolher e remover. Eventos fornecem informações sobre essas ações sem exigir que o programa pergunte continuamente se algo mudou. A dificuldade principal não é decorar nomes de eventos, mas definir qual ação altera quais dados e qual feedback confirma o resultado.",
    "sections": [
      {
        "title": "Registrar uma resposta, não executá-la agora",
        "paragraphs": [
          "addEventListener recebe o nome do evento e uma função para executar quando ele acontecer. Em botao.addEventListener(\"click\", salvar), passamos a função. Escrever salvar() executaria imediatamente e passaria seu retorno como ouvinte. A função recebida é um callback: outra parte do sistema decide quando chamá-la.",
          "O callback pode receber o objeto evento. Ele contém informações sobre a ocorrência. event.target é o alvo de origem; event.currentTarget é o elemento cujo ouvinte está sendo executado. Clicar em um ícone dentro de um botão pode produzir o ícone como target. Por isso nem sempre é correto supor que target seja o próprio botão.",
          "Um botão HTML já oferece ativação por mouse e teclado. Evite transformar uma div em botão apenas adicionando um click, pois você teria de reconstruir semântica, foco e comandos de teclado. Para remover um ouvinte depois, mantenha uma referência à mesma função e use removeEventListener com o mesmo tipo e configuração de captura."
        ]
      },
      {
        "title": "Eventos de formulário e validação",
        "paragraphs": [
          "Ouça submit no form, em vez de depender apenas do click no botão. Assim o envio por Enter também segue a mesma regra. preventDefault impede a ação padrão daquele evento, como a navegação de um envio tradicional. Ele não interrompe automaticamente a propagação nem significa que os dados foram salvos.",
          "required, minlength, maxlength e type fornecem validação nativa. Em uma tentativa normal de envio, campos nativamente inválidos podem impedir que submit seja disparado. Ainda precisamos de regras adicionais: dois espaços atendem a um comprimento literal, mas não representam um assunto útil. trim remove espaços nas pontas antes de validar e armazenar.",
          "setCustomValidity recebe uma mensagem para tornar o campo inválido ou uma string vazia para limpar o erro. Um erro personalizado não desaparece sozinho. O ouvinte input o limpa enquanto a pessoa corrige o valor; reportValidity verifica as restrições e apresenta feedback. A validação do navegador melhora o uso, mas um servidor real também precisa validar o que recebe."
        ]
      },
      {
        "title": "Propagação e delegação",
        "paragraphs": [
          "Muitos eventos passam pela árvore: há uma etapa de captura até o alvo e, em eventos que borbulham, uma etapa de retorno pelos ancestrais. Os ouvintes desta aula usam a configuração padrão, sem captura. Assim o click de um botão dentro de ul pode ser tratado por um único ouvinte registrado em ul.",
          "Delegação usa essa propagação para lidar com vários elementos, inclusive os criados depois do registro. closest(\"button[data-remover]\") procura o botão correspondente a partir do alvo. Verificamos também se ele pertence à lista e se o identificador existe nos dados. Clicar em um texto comum não deve remover nada.",
          "stopPropagation interrompe a continuação da propagação; não é o mesmo que preventDefault. Evite utilizá-lo para esconder uma arquitetura confusa, pois pode impedir que componentes ancestrais recebam eventos legítimos. Neste exemplo nenhuma interrupção é necessária: um seletor específico identifica exatamente a ação que o ouvinte deve tratar."
        ]
      },
      {
        "title": "Estado, identidade e retorno para a pessoa",
        "paragraphs": [
          "Cada assunto recebe um id crescente que não depende de sua posição. Depois de remover o primeiro item, os demais mudam de índice no array, mas mantêm sua identidade. O botão armazena o id em dataset; Number converte a string para comparar com o id numérico. findIndex localiza a posição atual antes de splice remover um elemento.",
          "O fluxo de inclusão é ler, normalizar, validar, alterar o estado, renderizar e devolver o foco. Se a validação falha, o retorno antecipado impede a inclusão. Depois de remover um botão focado, a função devolve o foco ao campo. Essa escolha simples evita deixar o teclado sem um ponto previsível de continuidade.",
          "O parágrafo role=\"status\" comunica mudanças sem exigir que a pessoa descubra visualmente onde algo apareceu. Teste nomes repetidos, espaços, Enter e remoção do último item. Neste laboratório nomes duplicados são permitidos porque cada registro tem identidade própria. Uma regra de unicidade exigiria uma decisão explícita e uma mensagem compreensível."
        ]
      }
    ],
    "example": {
      "language": "HTML + JavaScript",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Agenda de estudos\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Agenda de estudos\u003c/h1>\n\u003cform id=\"formulario\">\n\u003clabel for=\"assunto\">Assunto (2 a 60 caracteres)\u003c/label>\n\u003cinput id=\"assunto\" name=\"assunto\" required minlength=\"2\" maxlength=\"60\">\n\u003cbutton type=\"submit\">Adicionar\u003c/button>\n\u003c/form>\n\u003cp id=\"status\" role=\"status\">Nenhum assunto cadastrado.\u003c/p>\n\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\n\"use strict\";\nconst formulario = document.querySelector(\"#formulario\");\nconst campo = document.querySelector(\"#assunto\");\nconst lista = document.querySelector(\"#lista\");\nconst status = document.querySelector(\"#status\");\nconst assuntos = [];\nlet proximoId = 1;\n\nfunction renderizar() {\n  lista.replaceChildren();\n  for (const assunto of assuntos) {\n    const item = document.createElement(\"li\");\n    const texto = document.createElement(\"span\");\n    texto.textContent = assunto.nome;\n    const botao = document.createElement(\"button\");\n    botao.type = \"button\";\n    botao.dataset.remover = String(assunto.id);\n    botao.textContent = `Remover ${assunto.nome}`;\n    item.append(texto, botao);\n    lista.append(item);\n  }\n  status.textContent = assuntos.length ? `${assuntos.length} assuntos.` : \"Nenhum assunto cadastrado.\";\n}\ncampo.addEventListener(\"input\", () => campo.setCustomValidity(\"\"));\nformulario.addEventListener(\"submit\", (evento) => {\n  evento.preventDefault();\n  const nome = campo.value.trim();\n  campo.setCustomValidity(nome.length \u003c 2 ? \"Digite pelo menos dois caracteres, sem contar espaços nas pontas.\" : \"\");\n  if (!formulario.reportValidity()) return;\n  assuntos.push({id: proximoId++, nome});\n  renderizar();\n  formulario.reset();\n  campo.focus();\n});\nlista.addEventListener(\"click\", (evento) => {\n  if (!(evento.target instanceof Element)) return;\n  const botao = evento.target.closest(\"button[data-remover]\");\n  if (!botao || !lista.contains(botao)) return;\n  const indice = assuntos.findIndex(a => a.id === Number(botao.dataset.remover));\n  if (indice \u003c 0) return;\n  assuntos.splice(indice, 1);\n  renderizar();\n  campo.focus();\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "submit reúne o botão e o envio por Enter em um único fluxo.",
        "trim e setCustomValidity recusam nomes compostos apenas de espaços.",
        "O estado guarda id e nome; o DOM é reconstruído a partir desse estado.",
        "O único ouvinte de click em lista atende também aos botões recém-criados.",
        "A remoção valida o identificador antes de usar splice e devolve o foco ao campo."
      ],
      "expected": "Digite HTML e envie: aparece um item com botão Remover HTML. Adicione CSS e remova HTML: sobra CSS e o total passa a 1. O formulário recusa entrada composta só de espaços."
    },
    "guided": [
      {
        "instruction": "Adicione HTML usando Enter; adicione CSS usando o botão.",
        "result": "Ambos os caminhos acrescentam exatamente um registro."
      },
      {
        "instruction": "Tente adicionar dois espaços e depois digite SQL.",
        "result": "A mensagem orienta a correção; SQL pode ser enviado após limpar o erro."
      },
      {
        "instruction": "Remova todos os registros usando Tab e Enter.",
        "result": "O estado vazio reaparece e o foco volta ao campo após cada remoção."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: se o texto de um botão contiver um span, quem pode ser target e quem é currentTarget no ouvinte da lista?",
        "hints": [
          "O alvo é onde o clique se originou.",
          "O ouvinte foi registrado em ul."
        ],
        "solution": "target pode ser o span; currentTarget é ul. closest encontra o botão ancestral.",
        "explanation": "Delegação não depende de o alvo ser diretamente o botão.",
        "expected": "A previsão é registrada antes do clique; a inspeção permite comparar alvo e controle ouvinte.",
        "criteria": ["Previsão anotada antes do clique interno.","Delegação encontra ação pelo ancestral do evento."]
      },
      {
        "prompt": "Modificar: recuse nomes com mais de 30 caracteres, mantendo o máximo do HTML e a regra JavaScript coerentes.",
        "hints": [
          "Altere maxlength no input.",
          "Inclua o limite superior na condição personalizada."
        ],
        "solution": "\u003c!-- No input: maxlength=\"30\" -->\nconst invalido = nome.length \u003c 2 || nome.length > 30;\ncampo.setCustomValidity(invalido ? \"Use entre 2 e 30 caracteres.\" : \"\");",
        "explanation": "O limite visual e a regra normalizada expressam a mesma decisão. Use também uma descrição coerente no label.",
        "expected": "Nomes de 2 a 30 caracteres válidos são aceitos; fora dessa regra não entram.",
        "criteria": ["Limites da validação JavaScript e HTML são coerentes.","Casos dentro e fora dos limites são testados."]
      },
      {
        "prompt": "Construir: recuse duplicatas ignorando maiúsculas e espaços nas pontas. Mostre uma mensagem no campo sem apagar o que foi digitado.",
        "hints": [
          "Normalize a comparação com toLowerCase.",
          "Use some antes de push; limpe o erro no ouvinte input existente."
        ],
        "solution": "const repetido = assuntos.some(a => a.nome.toLowerCase() === nome.toLowerCase());\nif (repetido) {\n  campo.setCustomValidity(\"Este assunto já está na lista.\");\n  campo.reportValidity();\n  return;\n}\n// Insira depois da validação básica e antes de assuntos.push.",
        "explanation": "A decisão ocorre antes da mutação. O texto digitado permanece para permitir correção, e a comparação não muda o nome exibido.",
        "expected": "Depois de HTML, tentar html ou HTML com espaços não aumenta o total.",
        "criteria": ["Normaliza espaços e caixa antes de comparar duplicados.","Recusa informa erro e preserva campo e total."]
      },
      {
        "prompt": "Depurar: após uma tentativa inválida, todos os envios continuam bloqueados mesmo com texto correto. O que falta?",
        "hints": [
          "Uma mensagem em setCustomValidity mantém o campo inválido.",
          "Limpe o erro quando o usuário editar."
        ],
        "solution": "campo.addEventListener(\"input\", () => {\n  campo.setCustomValidity(\"\");\n});",
        "explanation": "Sem limpar a mensagem, a validação nativa pode bloquear submit antes de sua lógica ter chance de corrigir o estado.",
        "expected": "A edição do campo permite verificar se a tentativa seguinte é reavaliada.",
        "criteria": ["Relato explica estado que bloqueia tentativa posterior.","Campo corrigido causa nova avaliação e pode ser aceito."]
      }
    ],
    "mistakes": [
      "Usar click como único envio: ouça submit no form para incluir o teclado.",
      "Executar a função ao registrá-la: passe salvar, não salvar().",
      "Manter erro personalizado para sempre: limpe setCustomValidity no input.",
      "Remover pelo índice antigo: use identificador estável e procure a posição atual."
    ],
    "quiz": [
      {
        "question": "O que preventDefault faz em submit?",
        "options": [
          "Impede a ação padrão do envio",
          "Apaga os campos",
          "Para toda propagação"
        ],
        "correctIndex": 0,
        "explanation": "Ele impede a ação padrão; limpeza e propagação são decisões separadas."
      },
      {
        "question": "Por que delegar click em ul?",
        "options": [
          "Para receber ações de itens criados depois",
          "Para executar sem eventos",
          "Para dispensar identificadores"
        ],
        "correctIndex": 0,
        "explanation": "Eventos que borbulham chegam ao ancestral onde o ouvinte foi registrado."
      },
      {
        "question": "Qual mensagem libera uma validação personalizada?",
        "options": [
          "\"válido\"",
          "\"false\"",
          "Uma string vazia"
        ],
        "correctIndex": 2,
        "explanation": "Qualquer texto não vazio mantém a condição personalizada inválida."
      }
    ],
    "summary": [
      "Eventos chamam funções em resposta a ações.",
      "submit e controles nativos preservam comportamento de teclado.",
      "Delegação combina propagação, seletor específico e identidade estável.",
      "Validação deve orientar a correção antes de alterar os dados."
    ]
  },
"js-storage": {
    "prerequisites": "DOM e eventos, objetos, tipos, condições e try/catch da aula de depuração. Você sabe ler um campo e mostrar uma mensagem sem interpretar HTML.",
    "setup": "Use uma pasta só para este laboratório. Para comportamento previsível do armazenamento, sirva os arquivos por HTTP local: com Python instalado, abra o terminal nessa pasta e execute python -m http.server 8000 --bind 127.0.0.1 (em alguns sistemas, python3). O comando inicia um servidor de arquivos; abra http://127.0.0.1:8000 e escolha o HTML. Encerre com Ctrl+C. Não precisa consultar conteúdo externo. Abrir por file:// pode produzir comportamento de armazenamento diferente entre navegadores.",
    "why": "Um array desaparece quando a página recarrega porque pertencia à execução anterior. Um rascunho precisa atravessar essa fronteira. localStorage permite guardar pequenas strings por origem no navegador. O programa continua responsável por converter os dados, verificar sua estrutura e informar se a gravação realmente funcionou.",
    "sections": [
      {
        "title": "Memória, persistência e origem",
        "paragraphs": [
          "Enquanto a aba está aberta, variáveis mantêm o estado da execução. Ao recarregar, o programa começa novamente. localStorage é um armazenamento separado que normalmente permanece entre sessões. Ele pertence à origem: combinação de protocolo, host e porta. Trocar a porta 8000 por 8001 cria outro espaço de armazenamento, mesmo usando o mesmo computador.",
          "Esse mecanismo não é uma conta, um backup nem uma sincronização entre dispositivos. Limpar dados do navegador, usar outro perfil ou encerrar certas sessões privadas pode remover o conteúdo. O usuário precisa saber onde o rascunho está salvo. Para tarefas importantes, um recurso de exportação pode complementar o armazenamento, mas não é implementado neste exemplo.",
          "sessionStorage usa uma duração diferente, associada à sessão da aba. localStorage atende nosso rascunho simples, mas não deve guardar senhas, tokens sensíveis ou dados pessoais desnecessários. Scripts executados na mesma origem podem acessar o conteúdo; o armazenamento não cria uma barreira de segurança contra código malicioso na própria página."
        ]
      },
      {
        "title": "Strings e representação JSON",
        "paragraphs": [
          "setItem recebe uma chave e um valor textual. Passar diretamente um objeto comum não conserva sua estrutura: a conversão implícita pode produzir [object Object]. JSON.stringify gera uma string estruturada; JSON.parse interpreta essa string e devolve um valor JavaScript. JSON é um formato de dados, não um arquivo executável nem uma forma de executar funções.",
          "Objetos simples, arrays, strings, números finitos, booleanos e null podem representar nosso estado. Funções não são preservadas e referências circulares causam erro de serialização. Uma data, quando serializada normalmente, vira uma string; o parse não recria automaticamente um objeto Date. Escolha conscientemente quais informações precisam ser persistidas.",
          "getItem devolve null quando a chave não existe. Esse caso é diferente de uma string vazia ou de um JSON inválido. O fluxo deve reconhecer a primeira visita como normal. Usamos uma chave com nome do laboratório e versão para evitar colisões com outras funcionalidades e deixar explícito qual formato esperamos recuperar."
        ]
      },
      {
        "title": "Recuperar não significa confiar",
        "paragraphs": [
          "JSON válido não garante dados apropriados. O texto 42 é JSON válido, mas não possui texto e versao. Por isso valido verifica objeto não nulo, ausência de array, versão igual a 1 e texto com tamanho limitado. Essa pequena validação de estrutura impede que dados alterados manualmente ou produzidos por outra versão quebrem a interface.",
          "A validação não executa uma limpeza mágica que torna qualquer uso seguro. A prévia usa textContent, então sinais de tags permanecem texto. Caso o dado seja usado em uma URL, estilo ou outro contexto, serão necessárias regras próprias desse contexto. Aqui evitamos interpretar o rascunho como marcação e limitamos o tamanho aceito.",
          "A leitura e a conversão ficam dentro de try/catch. Um JSON quebrado, uma política do navegador ou acesso indisponível podem lançar erros. O programa mostra uma mensagem compreensível e continua permitindo digitação. Ele não apaga automaticamente o conteúdo problemático, preservando a possibilidade de inspecioná-lo antes de decidir o que fazer."
        ]
      },
      {
        "title": "Gravar, apagar e lidar com falhas",
        "paragraphs": [
          "O botão Salvar só confirma sucesso depois de setItem concluir. A escrita pode falhar por limite de espaço, restrições ou configurações do navegador. Não precisamos decorar uma capacidade fixa: ela varia conforme o ambiente. O texto em edição permanece no campo se a gravação falhar, para que a pessoa possa copiá-lo.",
          "removeItem apaga somente a chave deste rascunho. clear removeria todas as chaves da origem e poderia apagar dados de outras funcionalidades; por isso não é adequado aqui. O campo visual só é limpo depois que a remoção termina sem erro. A ordem importa para não afirmar que apagamos algo que ainda está armazenado.",
          "As operações de Web Storage são síncronas. Para textos pequenos e ações explícitas isso é simples; gravar grandes estruturas a cada tecla pode prejudicar a interação. Aplicações maiores precisam avaliar volume, frequência e outras soluções. Duas abas também podem sobrescrever o mesmo rascunho: neste laboratório a última gravação prevalece, sem resolução automática de conflitos."
        ]
      }
    ],
    "example": {
      "language": "HTML + JavaScript",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Rascunho persistente\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Rascunho persistente\u003c/h1>\n\u003clabel for=\"texto\">Resumo de estudo (até 500 caracteres)\u003c/label>\n\u003ctextarea id=\"texto\" maxlength=\"500\" rows=\"5\">\u003c/textarea>\n\u003cp>\u003cbutton id=\"salvar\" type=\"button\">Salvar rascunho\u003c/button>\n\u003cbutton id=\"apagar\" type=\"button\">Apagar rascunho\u003c/button>\u003c/p>\n\u003cp id=\"status\" role=\"status\">\u003c/p>\n\u003cpre id=\"preview\">\u003c/pre>\n\u003cscript>\n\"use strict\";\nconst CHAVE = \"laboratorio-js:rascunho:v1\";\nconst campo = document.querySelector(\"#texto\");\nconst status = document.querySelector(\"#status\");\nconst preview = document.querySelector(\"#preview\");\nfunction valido(dado) {\n  return dado !== null && typeof dado === \"object\" && !Array.isArray(dado)\n    && dado.versao === 1 && typeof dado.texto === \"string\" && dado.texto.length \u003c= 500;\n}\nfunction mostrar() { preview.textContent = campo.value; }\ntry {\n  const bruto = localStorage.getItem(CHAVE);\n  if (bruto === null) {\n    status.textContent = \"Nenhum rascunho salvo.\";\n  } else {\n    const dado = JSON.parse(bruto);\n    if (!valido(dado)) throw new Error(\"Formato de rascunho inválido.\");\n    campo.value = dado.texto;\n    status.textContent = \"Rascunho recuperado.\";\n  }\n} catch (erro) {\n  status.textContent = \"Não foi possível recuperar o rascunho. Você pode continuar digitando.\";\n  console.error(erro);\n}\nmostrar();\ncampo.addEventListener(\"input\", mostrar);\ndocument.querySelector(\"#salvar\").addEventListener(\"click\", () => {\n  try {\n    const dado = {versao: 1, texto: campo.value.slice(0, 500)};\n    localStorage.setItem(CHAVE, JSON.stringify(dado));\n    status.textContent = \"Rascunho salvo neste navegador.\";\n  } catch (erro) {\n    status.textContent = \"Não foi possível salvar. Copie seu texto antes de sair.\";\n    console.error(erro);\n  }\n});\ndocument.querySelector(\"#apagar\").addEventListener(\"click\", () => {\n  try {\n    localStorage.removeItem(CHAVE);\n    campo.value = \"\";\n    mostrar();\n    status.textContent = \"Rascunho apagado.\";\n    campo.focus();\n  } catch (erro) {\n    status.textContent = \"Não foi possível apagar o rascunho armazenado.\";\n    console.error(erro);\n  }\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "A chave identifica este recurso sem interferir no progresso do dashboard.",
        "valido rejeita formatos inesperados mesmo quando JSON.parse consegue interpretá-los.",
        "A leitura distingue ausência de dados de falha na recuperação.",
        "A prévia usa textContent; texto digitado não vira HTML executável.",
        "Salvar e apagar usam try/catch e só anunciam sucesso após concluir a operação."
      ],
      "expected": "Digite um resumo, salve e recarregue na mesma origem: o texto reaparece. Apague e recarregue: o campo permanece vazio. Tags digitadas aparecem como texto na prévia."
    },
    "guided": [
      {
        "instruction": "Digite três linhas, salve e recarregue na mesma aba.",
        "result": "O conteúdo volta e a mensagem informa recuperação."
      },
      {
        "instruction": "No painel Application/Storage do navegador, encontre a chave laboratorio-js:rascunho:v1 e veja o valor.",
        "result": "Há uma string JSON com versao e texto, não um objeto JavaScript vivo."
      },
      {
        "instruction": "Somente nessa chave de laboratório, substitua o valor por { e recarregue. Depois escreva e salve um texto novo.",
        "result": "A falha de leitura é informada sem impedir a edição; uma gravação válida restaura o formato."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: JSON.parse(\"42\") lança erro? Esse resultado passa em valido?",
        "hints": [
          "Um número é um valor JSON permitido.",
          "A aplicação exige objeto com campos específicos."
        ],
        "solution": "O parse retorna 42, mas valido(42) retorna false.",
        "explanation": "Sintaxe do formato e regras da aplicação são verificações diferentes.",
        "expected": "A análise separa leitura de JSON da validação da estrutura recuperada.",
        "criteria": ["Previsão registrada antes de parse e validação.","Distingue JSON sintaticamente válido de formato não aceito."]
      },
      {
        "prompt": "Modificar: reduza o limite para 200 caracteres em todos os pontos que definem essa regra.",
        "hints": [
          "Procure maxlength, a função valido e slice.",
          "Atualize também a descrição do campo."
        ],
        "solution": "// No HTML: maxlength=\"200\" e label coerente.\n// Em valido: dado.texto.length \u003c= 200\n// Ao salvar: texto: campo.value.slice(0, 200)",
        "explanation": "Uma regra precisa ser coerente na entrada, recuperação e gravação. Um rascunho antigo maior será rejeitado, o que deve ser comunicado.",
        "expected": "Novas entradas respeitam 200 caracteres e dados recuperados seguem o mesmo contrato.",
        "criteria": ["Limite 200 aplicado na entrada e na recuperação.","Dados antigos fora do contrato não são aceitos como válidos."]
      },
      {
        "prompt": "Construir: acrescente um campo titulo de até 80 caracteres ao rascunho. Salve e recupere os dois campos.",
        "hints": [
          "Crie um input com id titulo e consulte-o.",
          "Atualize o objeto gravado e valido; o formato antigo exige uma decisão."
        ],
        "solution": "// Use uma chave nova laboratorio-js:rascunho:v2.\nconst titulo = document.querySelector(\"#titulo\");\n// Objeto ao salvar:\nconst dado = {versao:2,titulo:titulo.value.slice(0,80),texto:campo.value.slice(0,500)};\n// Em valido, exija versao === 2 e:\n// typeof dado.titulo === \"string\" && dado.titulo.length \u003c= 80\n// Ao recuperar: titulo.value = dado.titulo;\n// Ao apagar: titulo.value = \"\";",
        "explanation": "Crie o input antes de executar o script. A chave v2 separa formatos e deixa o rascunho v1 intacto. Uma aplicação real poderia migrá-lo explicitamente.",
        "expected": "Título e resumo retornam após recarregar; apagar limpa ambos no formato v2.",
        "criteria": ["Formato v2 recupera título e resumo após recarga.","Limpeza remove os dois sem afetar outras chaves."]
      },
      {
        "prompt": "Depurar: um colega usou localStorage.clear() para apagar só o resumo. Corrija e explique a consequência.",
        "hints": [
          "A origem pode possuir várias chaves.",
          "Existe uma operação que recebe a chave exata."
        ],
        "solution": "localStorage.removeItem(CHAVE);",
        "explanation": "clear remove todas as entradas de localStorage dessa origem. removeItem limita a ação ao recurso selecionado.",
        "expected": "A verificação confirma a remoção do dado solicitado sem apagar outros valores.",
        "criteria": ["Diagnóstico separa remover item de limpar todo armazenamento.","Verifica a chave afetada e preservação das demais."]
      }
    ],
    "mistakes": [
      "Salvar um objeto diretamente: use JSON.stringify para conservar uma representação estruturada.",
      "Confiar só no parse: verifique campos, tipos, versão e limites.",
      "Anunciar sucesso antes da escrita: confirme somente após setItem sem erro.",
      "Usar clear para apagar um recurso: remova a chave específica."
    ],
    "quiz": [
      {
        "question": "Qual mudança normalmente separa o localStorage?",
        "options": [
          "Mudar o texto de h1",
          "Mudar a porta da origem",
          "Mudar o nome de uma variável"
        ],
        "correctIndex": 1,
        "explanation": "A origem inclui protocolo, host e porta."
      },
      {
        "question": "Por que try/catch ao gravar?",
        "options": [
          "O armazenamento pode estar indisponível ou sem espaço",
          "Toda gravação exige internet",
          "JSON sempre falha"
        ],
        "correctIndex": 0,
        "explanation": "Falhas são possíveis e a interface deve preservar a edição e informar o problema."
      },
      {
        "question": "JSON válido implica rascunho válido?",
        "options": [
          "Sim, sempre",
          "Não, precisamos validar a estrutura",
          "Somente se tiver espaços"
        ],
        "correctIndex": 1,
        "explanation": "O contrato da aplicação é mais restrito que a gramática JSON."
      }
    ],
    "summary": [
      "Persistência local é diferente de memória e de backup.",
      "JSON representa dados simples como texto.",
      "Valide o que foi recuperado e insira textos com textContent.",
      "Mensagens de sucesso precisam corresponder a operações concluídas."
    ]
  },
"js-promises": {
    "prerequisites": "Funções, callbacks usados em eventos, arrays e try/catch. Você sabe diferenciar retornar um valor de apenas mostrá-lo no Console. Esta aula não depende de rede nem exige conhecer APIs remotas.",
    "setup": "Salve o HTML como assincrono.html e abra no navegador. O exemplo usa um timer local de aproximadamente 700 milissegundos para simular uma espera. Não é uma medição de desempenho nem uma comunicação real com servidor. Mantenha o Console aberto e teste tanto o sucesso quanto a falha usando a caixa disponível.",
    "why": "Uma busca, leitura ou resposta pode chegar depois de o programa continuar outras atividades. A interface precisa permanecer utilizável e explicar o que está acontecendo. Assincronismo permite organizar essa espera, mas não transforma automaticamente cálculos pesados em trabalho paralelo. O objetivo aqui é controlar uma operação com começo, resultado e encerramento previsíveis.",
    "sections": [
      {
        "title": "Execução imediata e trabalho agendado",
        "paragraphs": [
          "O JavaScript de uma página executa cada trecho síncrono até terminar antes de iniciar outro callback na mesma linha principal de execução. Enquanto uma função ocupa essa execução com um laço muito longo, cliques e atualizações visuais podem ficar esperando. Colocar async no nome da função não move esse cálculo pesado para outra thread.",
          "setTimeout registra um callback para uma oportunidade futura. O atraso é um mínimo solicitado, não uma promessa de horário exato. Mesmo com zero milissegundos, o callback não interrompe o código que está rodando. Ele espera uma oportunidade após o trecho atual e outras prioridades do navegador.",
          "Reações de Promises entram em uma fila de microtarefas. Ao concluir o trecho síncrono, o ambiente esvazia essas microtarefas antes de seguir para a próxima tarefa, como o callback do timer. Para o pequeno exemplo isolado, a ordem é 1, 2, 3, 4. Esse modelo basta para explicar o resultado sem imaginar que as linhas foram embaralhadas aleatoriamente."
        ]
      },
      {
        "title": "O que uma Promise representa",
        "paragraphs": [
          "Uma Promise representa o resultado futuro de uma operação. Ela começa pendente e pode terminar cumprida, com um valor, ou rejeitada, com um motivo. Depois de resolvida para um resultado final, não troca de sucesso para erro ou vice-versa. Isso é diferente de um evento de click, que pode ocorrer várias vezes.",
          "then registra o que fazer com o sucesso e devolve outra Promise. O retorno do callback vira o valor da próxima etapa; lançar um erro transforma a etapa em rejeição. catch trata rejeições da cadeia. Esquecer de retornar uma Promise interna pode fazer a cadeia externa terminar cedo, sem esperar a operação que você pretendia acompanhar.",
          "O construtor new Promise recebe uma função executada imediatamente, com resolve e reject. Usamos esse construtor apenas para adaptar nosso timer de demonstração. APIs como fetch já devolvem Promises, portanto normalmente não precisam ser embrulhadas em outra. resolve entrega os assuntos e reject informa uma falha controlada."
        ]
      },
      {
        "title": "async/await e tratamento de erro",
        "paragraphs": [
          "Uma função async sempre devolve uma Promise. Dentro dela, await pausa a continuação dessa função até o resultado estar disponível. Ele não pausa o navegador inteiro. Se a Promise for cumprida, a expressão await produz o valor; se for rejeitada, o erro pode ser capturado por try/catch ao redor da espera.",
          "O bloco try reúne o caminho esperado. catch define como apresentar uma falha; não deve fingir que houve sucesso. finally executa o encerramento em ambos os caminhos. No exemplo, o botão volta a ficar disponível mesmo quando a operação falha. Isso evita uma interface travada por um erro que era recuperável.",
          "A caixa de simulação é lida no momento do clique e passada para a função. Mudar a caixa durante a espera não altera retroativamente esse argumento. Capturar os dados de uma ação no início ajuda a entender qual solicitação está sendo atendida. A mensagem de resultado só é exibida depois do await, quando os assuntos realmente existem."
        ]
      },
      {
        "title": "Sequência, concorrência e limites",
        "paragraphs": [
          "Dois await consecutivos normalmente iniciam a segunda chamada depois que a primeira termina. Quando operações são independentes, Promise.all pode aguardar várias iniciadas juntas. Ela preserva a ordem dos resultados de entrada e rejeita se uma delas rejeitar; isso não cancela automaticamente as outras operações. Concorrência precisa ser escolhida conforme as dependências.",
          "Uma Promise por si só não possui um botão universal de cancelamento. Algumas APIs aceitam um sinal de AbortController, que estudaremos com fetch. Promise.race pode escolher o primeiro resultado, mas ganhar uma corrida com um timer não interrompe automaticamente o trabalho que perdeu. Confundir esses mecanismos gera requisições ainda ativas em segundo plano.",
          "Teste mais que o caminho feliz. Inicie, observe a mensagem de carregamento, provoque falha e repita com sucesso. Verifique se não há rejeições sem tratamento no Console. O botão desabilitado impede repetições neste laboratório; interfaces com várias buscas simultâneas também precisam decidir qual resultado ainda corresponde à intenção atual do usuário."
        ]
      }
    ],
    "example": {
      "language": "HTML + JavaScript",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Operação assíncrona local\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Operação assíncrona local\u003c/h1>\n\u003cp>O laboratório simula uma espera; não faz pedidos de rede.\u003c/p>\n\u003clabel>\u003cinput id=\"falhar\" type=\"checkbox\"> Simular falha\u003c/label>\n\u003cbutton id=\"iniciar\" type=\"button\">Iniciar\u003c/button>\n\u003cp id=\"status\" role=\"status\">Aguardando.\u003c/p>\n\u003cpre id=\"ordem\">\u003c/pre>\n\u003cscript>\n\"use strict\";\nconst botao = document.querySelector(\"#iniciar\");\nconst falhar = document.querySelector(\"#falhar\");\nconst status = document.querySelector(\"#status\");\nconst ordem = document.querySelector(\"#ordem\");\nfunction registrar(texto) { ordem.textContent += texto + \"\\n\"; }\n\nfunction simularPedido(deveFalhar) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (deveFalhar) reject(new Error(\"Falha simulada.\"));\n      else resolve([\"DOM\", \"Eventos\"]);\n    }, 700);\n  });\n}\n\nregistrar(\"1. código síncrono\");\nsetTimeout(() => registrar(\"4. callback do timer\"), 0);\nPromise.resolve().then(() => registrar(\"3. reação da Promise\"));\nregistrar(\"2. fim do código síncrono\");\n\nbotao.addEventListener(\"click\", async () => {\n  botao.disabled = true;\n  status.textContent = \"Carregando...\";\n  try {\n    const assuntos = await simularPedido(falhar.checked);\n    status.textContent = `Recebidos: ${assuntos.join(\", \")}.`;\n  } catch (erro) {\n    status.textContent = erro.message;\n  } finally {\n    botao.disabled = false;\n  }\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O registro inicial mostra a diferença entre o trecho síncrono e callbacks agendados.",
        "O executor de new Promise agenda o timer, mas não espera por ele bloqueando a página.",
        "resolve entrega um array e reject entrega um Error para caminhos distintos.",
        "await obtém o array somente depois do sucesso e encaminha rejeições para catch.",
        "finally restaura o botão nos dois caminhos; a interface pode tentar novamente."
      ],
      "expected": "O bloco de ordem mostra 1, 2, 3, 4. Iniciar exibe Carregando e depois Recebidos: DOM, Eventos. Com a caixa marcada, exibe Falha simulada. O botão volta a funcionar em ambos os casos."
    },
    "guided": [
      {
        "instruction": "Atualize a página e compare a ordem visível com a posição das chamadas no código.",
        "result": "A reação da Promise aparece antes do timer, embora o timer tenha sido registrado primeiro."
      },
      {
        "instruction": "Inicie sem marcar falha e observe o botão durante a espera.",
        "result": "Ele fica indisponível temporariamente e retorna após mostrar os assuntos."
      },
      {
        "instruction": "Marque falha, execute e depois desmarque para tentar de novo.",
        "result": "O erro é tratado; a aplicação consegue executar uma nova tentativa bem-sucedida."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: console.log(\"A\"); Promise.resolve().then(() => console.log(\"B\")); console.log(\"C\"); qual é a ordem?",
        "hints": [
          "A reação não interrompe o trecho atual.",
          "As duas chamadas diretas são síncronas."
        ],
        "solution": "A, C, B.",
        "explanation": "O callback de then entra como microtarefa para depois da execução síncrona atual.",
        "expected": "A previsão é registrada antes de executar; a sequência permite comparar a ordem observada.",
        "criteria": ["Previsão da sequência anotada antes de rodar.","Execução permite separar log síncrono e tarefa da Promise."]
      },
      {
        "prompt": "Modificar: faça a simulação retornar três assuntos e exiba também a quantidade recebida.",
        "hints": [
          "Mude o array passado a resolve.",
          "Use length no resultado depois de await."
        ],
        "solution": "// Na simulação:\nresolve([\"DOM\", \"Eventos\", \"Promises\"]);\n// Após await:\nstatus.textContent = `${assuntos.length} assuntos: ${assuntos.join(\", \")}.`;",
        "explanation": "A interface usa o valor resolvido; não precisa conhecer antecipadamente seu tamanho.",
        "expected": "No sucesso: 3 assuntos: DOM, Eventos, Promises.",
        "criteria": ["Simulação resolve três assuntos e interface exibe quantidade.","Sucesso mantém tratamento dos erros."]
      },
      {
        "prompt": "Construir: escreva uma função async carregarDupla que inicie duas simulações independentes e retorne um único array com os resultados.",
        "hints": [
          "Promise.all recebe um array de Promises.",
          "Desestruture os resultados e combine os arrays com spread."
        ],
        "solution": "async function carregarDupla() {\n  const [primeira, segunda] = await Promise.all([simularPedido(false), simularPedido(false)]);\n  return [...primeira, ...segunda];\n}\ncarregarDupla().then(console.log).catch(console.error);",
        "explanation": "As duas chamadas são iniciadas antes do await concluir. O retorno continua sendo uma Promise; o consumidor trata também uma possível falha.",
        "expected": "Com a versão original: [\"DOM\", \"Eventos\", \"DOM\", \"Eventos\"].",
        "criteria": ["Duas operações começam sem aguardar uma à outra.","Resultado é um array combinado em ordem estável."]
      },
      {
        "prompt": "Depurar: o botão só é reabilitado dentro de try após await. Quando há erro ele permanece desativado. Corrija a estrutura.",
        "hints": [
          "Uma rejeição pula as linhas posteriores dentro de try.",
          "A restauração precisa ocorrer nos dois caminhos."
        ],
        "solution": "try {\n  const dados = await simularPedido(falhar.checked);\n  status.textContent = dados.join(\", \");\n} catch (erro) {\n  status.textContent = erro.message;\n} finally {\n  botao.disabled = false;\n}",
        "explanation": "O encerramento não depende de sucesso; finally expressa essa obrigação e evita duplicar a restauração.",
        "expected": "Após falha, o botão permite nova tentativa.",
        "criteria": ["Botão é reabilitado após sucesso ou rejeição.","Falha aparece e nova tentativa fica possível."]
      }
    ],
    "mistakes": [
      "Esperar que setTimeout com zero execute imediatamente: ele agenda uma tarefa futura.",
      "Esquecer await ou return: a função pode continuar antes de obter o resultado.",
      "Usar async para tentar acelerar um laço pesado: assincronismo não cria paralelismo automaticamente.",
      "Tratar timeout com Promise.race como cancelamento: a operação original pode continuar."
    ],
    "quiz": [
      {
        "question": "Uma função async retorna o quê?",
        "options": [
          "Sempre uma Promise",
          "Somente um número",
          "Nada até a rede terminar"
        ],
        "correctIndex": 0,
        "explanation": "Mesmo um retorno simples é apresentado por uma Promise."
      },
      {
        "question": "Qual bloco restaura o botão em sucesso e erro?",
        "options": [
          "Somente try",
          "finally",
          "Uma linha depois de um return"
        ],
        "correctIndex": 1,
        "explanation": "finally é destinado à finalização comum dos caminhos."
      },
      {
        "question": "Promise.all cancela todas as operações quando uma rejeita?",
        "options": [
          "Sim, automaticamente",
          "Não, rejeitar a agregação não cancela as demais",
          "Somente com arrays pequenos"
        ],
        "correctIndex": 1,
        "explanation": "Cancelamento depende do suporte e da lógica de cada operação."
      }
    ],
    "summary": [
      "Timers agendam; não interrompem o trecho síncrono atual.",
      "Promises representam resultados futuros únicos.",
      "await organiza a continuação sem bloquear toda a página.",
      "Erros e restauração da interface fazem parte do fluxo principal."
    ]
  },
"js-fetch": {
    "prerequisites": "Promises e async/await, DOM, eventos e validação de JSON. Você já entende que await pode lançar um erro e que dados recebidos precisam ter seus tipos conferidos antes de usar métodos de array.",
    "setup": "Salve o exemplo completo em fetch.html e abra em um navegador moderno. O catálogo é criado como Blob na memória e lido por fetch; isso ensina a API sem depender de conta, internet ou servidor externo. Para o exercício de arquivo JSON, use o servidor local explicado na aula de armazenamento e coloque catalogo.json na mesma pasta. Não cole chaves privadas de serviços em JavaScript entregue ao navegador.",
    "why": "Buscar dados não termina em chamar fetch. Uma interface precisa saber se está esperando, se recebeu uma lista vazia ou se houve um problema. Também precisa conferir se a resposta possui o formato esperado. Um laboratório com cenários controlados permite testar essas decisões sem depender da disponibilidade de um serviço remoto.",
    "sections": [
      {
        "title": "Pedido, resposta e corpo",
        "paragraphs": [
          "fetch recebe um endereço e opções e retorna uma Promise de Response. Em uma busca HTTP real, o navegador envia um pedido e recebe status, cabeçalhos e corpo. GET costuma solicitar uma representação; POST costuma enviar dados para processamento. O método sozinho não garante autorização, segurança ou significado: o contrato do serviço define as regras.",
          "Receber Response não significa que todo o corpo já foi convertido para um objeto. resposta.json() é outra operação assíncrona que lê e interpreta o corpo como JSON. Por isso o exemplo usa dois await. resposta.text() produziria texto; não podemos consumir livremente o mesmo corpo várias vezes sem planejar uma cópia apropriada.",
          "O Blob deste laboratório contém bytes criados localmente. URL.createObjectURL produz um endereço temporário para acessá-los, e fetch o lê. Isso exercita o fluxo de resposta e JSON, mas não simula latência real, autenticação, falhas de servidor nem negociação HTTP completa. A simplicidade é intencional para isolar os primeiros conceitos."
        ]
      },
      {
        "title": "Quatro verificações diferentes",
        "paragraphs": [
          "Uma falha de rede ou um cancelamento pode rejeitar fetch. Uma resposta HTTP 404 ou 500 normalmente ainda produz Response; não é automaticamente uma rejeição. Por isso verificamos resposta.ok, que representa status de sucesso na faixa 200 a 299, antes de tentar tratar o conteúdo como um catálogo válido.",
          "Mesmo uma resposta considerada bem-sucedida pode conter JSON quebrado. Nesse caso resposta.json() rejeita. E JSON bem-formado ainda pode ser um objeto inesperado, como uma mensagem de erro no lugar de uma lista. catalogoValido verifica array, quantidade máxima, tipos e limites de cada item antes da renderização.",
          "Essas etapas ajudam a localizar o defeito: o pedido não chegou, o servidor recusou, o corpo não foi interpretado ou o formato não corresponde ao contrato. Para o usuário, mostre uma orientação clara. Para investigar durante o desenvolvimento, inspecione o painel Network e o Console. Não apresente dados internos sensíveis em mensagens públicas."
        ]
      },
      {
        "title": "Estados da interface e dados recebidos",
        "paragraphs": [
          "A página começa pronta, entra em carregamento e termina em sucesso com itens, sucesso vazio, erro ou cancelamento. Lista vazia não é necessariamente uma falha: a busca pode ser válida e simplesmente não encontrar resultados. A mensagem Nenhum assunto encontrado evita deixar um espaço em branco que pareceria um defeito.",
          "O botão Carregar fica desabilitado durante a operação para impedir pedidos simultâneos nesta primeira versão. Isso simplifica a correspondência entre resposta e intenção atual. Uma busca que aceita novas consultas durante a anterior precisa cancelar a anterior ou usar um identificador para ignorar resultados ultrapassados; caso contrário, uma resposta antiga pode substituir a nova.",
          "Nomes recebidos entram em textContent. Validar que nome é string não torna innerHTML seguro: uma string ainda pode conter marcação. Limites de quantidade e tamanho também tornam o comportamento previsível. O contrato pode exigir outras regras, como ids positivos e únicos; os exercícios ampliam essas condições deliberadamente."
        ]
      },
      {
        "title": "Cancelamento, tempo limite e ambiente",
        "paragraphs": [
          "AbortController cria um sinal que pode ser passado a fetch. Chamar abort solicita o cancelamento da operação que observa esse sinal. O exemplo oferece um botão e um timer de cinco segundos; clearTimeout no finally impede que o timer atue depois de concluído o trabalho. Cada nova busca precisa de um controlador novo, pois um sinal abortado permanece abortado.",
          "Um Blob pequeno termina tão rápido que talvez não dê tempo de pressionar Cancelar. Não interprete isso como falha do mecanismo. Para um teste determinístico, aborte o controlador imediatamente antes do fetch em uma cópia do exemplo. Em aplicações de rede, o cancelamento pode impedir o consumo da resposta, mas não desfaz automaticamente algo que um servidor já processou.",
          "Buscar outro domínio envolve regras de origem e CORS, controladas também pelo servidor. no-cors não é uma solução para liberar leitura de JSON bloqueado: pode produzir resposta opaca que o script não consegue inspecionar como precisa. Na prática local, manter HTML e catalogo.json na mesma origem elimina essa dificuldade inicial. APIs externas são uma extensão opcional, não um requisito desta aula."
        ]
      }
    ],
    "example": {
      "language": "HTML + JavaScript",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Catálogo carregado com Fetch\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Catálogo carregado com Fetch\u003c/h1>\n\u003cp>Dados locais em Blob: nenhuma API externa é necessária.\u003c/p>\n\u003clabel for=\"modo\">Cenário\u003c/label>\n\u003cselect id=\"modo\">\u003coption value=\"ok\">Dados válidos\u003c/option>\u003coption value=\"vazio\">Lista vazia\u003c/option>\u003coption value=\"json\">JSON quebrado\u003c/option>\u003coption value=\"schema\">Estrutura inválida\u003c/option>\u003c/select>\n\u003cbutton id=\"carregar\" type=\"button\">Carregar\u003c/button>\n\u003cbutton id=\"cancelar\" type=\"button\" disabled>Cancelar\u003c/button>\n\u003cp id=\"status\" role=\"status\">Pronto para carregar.\u003c/p>\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\n\"use strict\";\nconst carregar = document.querySelector(\"#carregar\");\nconst cancelar = document.querySelector(\"#cancelar\");\nconst modo = document.querySelector(\"#modo\");\nconst status = document.querySelector(\"#status\");\nconst lista = document.querySelector(\"#lista\");\nlet controlador = null;\nfunction catalogoValido(dados) {\n  return Array.isArray(dados) && dados.length \u003c= 100 && dados.every(item =>\n    item !== null && typeof item === \"object\" && !Array.isArray(item) &&\n    Number.isInteger(item.id) && typeof item.nome === \"string\" && item.nome.length \u003c= 80);\n}\ncancelar.addEventListener(\"click\", () => controlador?.abort());\ncarregar.addEventListener(\"click\", async () => {\n  carregar.disabled = true;\n  cancelar.disabled = false;\n  lista.replaceChildren();\n  status.textContent = \"Carregando...\";\n  controlador = new AbortController();\n  const sinal = controlador.signal;\n  let expirou = false;\n  const timer = setTimeout(() => { expirou = true; controlador.abort(); }, 5000);\n  const cenarios = {\n    ok: JSON.stringify([{id:1,nome:\"HTML\"},{id:2,nome:\"JavaScript\"}]),\n    vazio: \"[]\", json: \"{\", schema: '{\"mensagem\":\"Formato diferente\"}'\n  };\n  const url = URL.createObjectURL(new Blob([cenarios[modo.value]], {type:\"application/json\"}));\n  try {\n    const resposta = await fetch(url, {signal:sinal});\n    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);\n    const dados = await resposta.json();\n    if (!catalogoValido(dados)) throw new Error(\"Estrutura de catálogo inválida.\");\n    for (const assunto of dados) {\n      const item = document.createElement(\"li\");\n      item.textContent = assunto.nome;\n      lista.append(item);\n    }\n    status.textContent = dados.length ? `${dados.length} assuntos carregados.` : \"Nenhum assunto encontrado.\";\n  } catch (erro) {\n    status.textContent = sinal.aborted\n      ? (expirou ? \"Tempo limite excedido.\" : \"Operação cancelada.\")\n      : `Não foi possível carregar: ${erro.message}`;\n  } finally {\n    clearTimeout(timer);\n    URL.revokeObjectURL(url);\n    controlador = null;\n    carregar.disabled = false;\n    cancelar.disabled = true;\n  }\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "Cada cenário cria um corpo previsível para testar uma etapa diferente.",
        "O controlador e o timer delimitam a operação; finally libera recursos e controles.",
        "resposta.ok precede a leitura do corpo, embora o Blob válido normalmente produza sucesso.",
        "catalogoValido verifica estrutura depois do parse e antes de acessar os itens.",
        "A URL temporária é revogada após o consumo para liberar sua referência ao Blob."
      ],
      "expected": "Dados válidos mostra HTML e JavaScript. Lista vazia mostra uma mensagem sem itens. JSON quebrado e Estrutura inválida mostram erro. Ao terminar, Carregar volta a funcionar e Cancelar fica indisponível."
    },
    "guided": [
      {
        "instruction": "Execute os quatro cenários na ordem apresentada.",
        "result": "Dois casos são sucessos diferentes; os outros dois falham em etapas diferentes."
      },
      {
        "instruction": "Troque um nome dos dados locais por \u003cstrong>CSS\u003c/strong>.",
        "result": "Os sinais aparecem literalmente; nenhum strong é criado na lista."
      },
      {
        "instruction": "Em uma cópia, acrescente controlador.abort() imediatamente antes do try.",
        "result": "A busca informa Operação cancelada e restaura os controles. Remova a linha para continuar."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: um servidor responde HTTP 404. O catch será acionado automaticamente apenas pelo fetch?",
        "hints": [
          "Resposta HTTP e falha de conexão são situações diferentes.",
          "Procure a condição que lança Error."
        ],
        "solution": "Não. O código verifica resposta.ok e lança Error para encaminhar esse caso ao catch.",
        "explanation": "Sem essa verificação, a aplicação poderia tentar interpretar uma página de erro como seu resultado esperado.",
        "expected": "Resposta HTTP e estado da aplicação são conferidos separadamente antes da renderização.",
        "criteria": ["Previsão sobre HTTP anotada antes do teste.","Resposta não aceita interrompe renderização e entra no fluxo de erro."]
      },
      {
        "prompt": "Modificar: exija ids inteiros positivos no catálogo.",
        "hints": [
          "Number.isInteger já verifica a parte inteira.",
          "Acrescente uma comparação numérica."
        ],
        "solution": "Number.isInteger(item.id) && item.id > 0",
        "explanation": "Substitua a condição equivalente dentro de every. O tipo e a regra de domínio precisam ser satisfeitos juntos.",
        "expected": "id 1 passa; 0, -1, 1.5 e \"1\" falham.",
        "criteria": ["Validação aceita somente inteiro positivo.","Zero, negativos, fração e texto são recusados individualmente."]
      },
      {
        "prompt": "Construir: use catalogo.json local com dois assuntos próprios, mantendo todos os estados e a validação.",
        "hints": [
          "Sirva HTML e JSON pela mesma origem com o servidor local.",
          "Troque apenas a origem de dados; remova a criação e revogação de Blob desta versão."
        ],
        "solution": "// catalogo.json:\n[{\"id\":1,\"nome\":\"Arrays\"},{\"id\":2,\"nome\":\"Funções\"}]\n// No JavaScript, substitua a criação de url por:\nconst url = \"./catalogo.json\";\n// Remova URL.revokeObjectURL(url) do finally.",
        "explanation": "Abra pela URL HTTP local. Se o arquivo não existe, o servidor responde 404, permitindo testar um erro HTTP real. O contrato dos dados continua igual.",
        "expected": "Arrays e Funções aparecem; renomear o JSON provoca mensagem de erro HTTP.",
        "criteria": ["Catálogo próprio mantém estados de carga, sucesso e erro.","JSON ausente gera erro visível sem interface travada."]
      },
      {
        "prompt": "Depurar: o segundo carregamento é cancelado imediatamente porque um único AbortController, já abortado, foi reutilizado. Corrija.",
        "hints": [
          "Um sinal abortado não volta ao estado inicial.",
          "Crie o controlador dentro do início de cada operação."
        ],
        "solution": "controlador = new AbortController();\nconst sinal = controlador.signal;\nconst resposta = await fetch(url, {signal:sinal});",
        "explanation": "O controlador representa a vida de uma operação. Um novo pedido precisa de um novo sinal utilizável.",
        "expected": "Cancelar uma busca não cancela automaticamente todas as futuras.",
        "criteria": ["Identifica reuso do controlador abortado.","Cada busca cria controlador e cancelamento atual não bloqueia a próxima."]
      }
    ],
    "mistakes": [
      "Assumir que 404 rejeita fetch: confira resposta.ok.",
      "Usar dados antes de validar: parse e contrato são etapas distintas.",
      "Usar no-cors para tentar ler API bloqueada: isso não concede permissão de leitura.",
      "Deixar timers e URLs temporárias vivos: finalize recursos no finally."
    ],
    "quiz": [
      {
        "question": "Por que há await em resposta.json()?",
        "options": [
          "Porque ler e interpretar o corpo é assíncrono",
          "Porque JSON sempre vem de outra página",
          "Porque await valida os campos"
        ],
        "correctIndex": 0,
        "explanation": "O resultado é uma Promise do conteúdo interpretado; validação de campos vem depois."
      },
      {
        "question": "Uma lista vazia válida representa o quê?",
        "options": [
          "Sempre um erro",
          "Um possível sucesso sem resultados",
          "Uma falha de sintaxe"
        ],
        "correctIndex": 1,
        "explanation": "O estado vazio deve receber uma mensagem própria."
      },
      {
        "question": "Qual afirmação sobre cancelamento está correta?",
        "options": [
          "Abort sempre desfaz mudanças no servidor",
          "Um sinal abortado pode ser reiniciado",
          "Uma nova operação deve usar um novo controlador"
        ],
        "correctIndex": 2,
        "explanation": "O sinal mantém seu estado abortado; cancelamento também não equivale a desfazer trabalho remoto."
      }
    ],
    "summary": [
      "Fetch, status, parse e validação respondem a perguntas diferentes.",
      "A interface precisa representar carregamento, vazio, sucesso e falha.",
      "Dados externos devem ser tratados como dados, não como HTML.",
      "Cancelamento e liberação de recursos fazem parte do ciclo da busca."
    ]
  },
"js-modules": {
    "prerequisites": "Funções com retorno, arrays, objetos, validação, DOM e async/await. Você precisa conseguir explicar a diferença entre calcular um resultado e mostrar esse resultado na página. Para separar arquivos, retome o servidor local de js-storage; se Python ainda não estiver preparado, conclua antes setup-python.",
    "setup": "O exemplo completo funciona em um único HTML: cria um módulo JavaScript em um Blob local e usa import() para carregá-lo. Esse recurso mantém a demonstração copiável, mas a organização habitual usa arquivos separados, ensinados abaixo. Para os exercícios com arquivos, abra o terminal na pasta javascript-estudos e execute python -m http.server 8000 --bind 127.0.0.1 com Python instalado (ou python3, conforme setup-python). Abra http://127.0.0.1:8000 no navegador, não file://. Confira que a página aparece e que o Console não mostra 404 para tarefas.js e app.js; se mostrar, revise nomes e pasta atual. Ctrl+C encerra o servidor; para retomar, execute o mesmo comando na mesma pasta. Nenhum gerenciador de pacotes é necessário. Se não puder preparar Python agora, pratique o exemplo de um arquivo e deixe a divisão em arquivos pendente.",
    "why": "Quando uma página cresce, misturar cálculos, leitura de campos e mensagens em uma única função dificulta mudanças e diagnóstico. Módulos permitem declarar quais funções são oferecidas e quais dependências são utilizadas. A separação fica realmente útil quando as responsabilidades são claras e as regras podem ser verificadas sem clicar na interface.",
    "sections": [
      {
        "title": "Uma responsabilidade por função",
        "paragraphs": [
          "resumir recebe dados e devolve um objeto. Ela não seleciona elementos, não grava localStorage e não busca rede. Essa função é pura para as entradas válidas usadas aqui: não modifica o array recebido e seu resultado depende desses dados. Isso facilita perguntar o que deve acontecer com três tarefas, nenhuma tarefa ou uma entrada inválida.",
          "formatar transforma um resumo em uma frase. O código da página decide onde exibir a frase usando textContent. Separar essas etapas permite trocar a apresentação sem refazer a contagem. Também evita que uma regra de negócio dependa de um id específico do HTML, o que tornaria seu teste desnecessariamente complicado.",
          "Não crie dezenas de arquivos apenas para seguir uma aparência profissional. Comece com responsabilidades que você consegue nomear: regras de tarefas, interface e armazenamento. Se uma função precisa conhecer todos os detalhes da página para fazer uma soma, examine se há acoplamento excessivo. Uma fronteira útil reduz o conhecimento necessário para alterar cada parte.",
          "Pausa de prática: para três tarefas, duas concluídas, preveja o objeto devolvido por resumir antes de escrever a frase na página. Confira se a função de regra precisa conhecer o id saida."
        ]
      },
      {
        "title": "Exportar e importar explicitamente",
        "paragraphs": [
          "export torna uma declaração disponível para outros módulos. Uma exportação nomeada, como export function resumir, é importada pelo mesmo nome entre chaves: import { resumir } from \"./tarefas.js\". Podemos usar as para dar um nome local diferente. O caminho relativo começa em ./ ou ../ e inclui a extensão no navegador.",
          "Uma exportação default representa um valor principal e é importada sem chaves. Ela não é obrigatória nem automaticamente melhor. Nesta aula preferimos nomes explícitos para acompanhar a ligação entre arquivos. Variáveis internas do módulo não viram propriedades globais de window; isso reduz colisões acidentais entre partes independentes da aplicação.",
          "A declaração import estática fica no nível superior de um módulo, não dentro de um if ou de uma função. Já import(caminho) é uma expressão que devolve uma Promise e pode acontecer sob demanda. No exemplo, usamos essa forma dinâmica porque o endereço Blob só existe durante a execução. O objeto retornado oferece as exportações nomeadas, que desestruturamos.",
          "Pausa de prática: antes de executar, preveja se app.js pode ler uma variável de tarefas.js que não foi exportada. Depois compare com uma função exportada por nome."
        ]
      },
      {
        "title": "Do laboratório único aos arquivos reais",
        "paragraphs": [
          "O texto fonte do exemplo contém JavaScript de módulo, não conteúdo vindo do usuário. Ele é colocado em um Blob com tipo text/javascript. Essa escolha demonstra o carregamento sem entregar vários arquivos, mas não é um padrão para executar código digitado por pessoas. Na organização habitual, copie as funções exportadas para tarefas.js, sem a string externa.",
          "Crie app.js com import { resumir, formatar } from \"./tarefas.js\"; depois coloque a criação do array e a atualização do DOM nesse arquivo. No HTML, use \u003cscript type=\"module\" src=\"./app.js\">\u003c/script>. Retire o script antigo para não executar duas versões. O navegador reconhece o modo módulo pelo atributo type e carrega as dependências declaradas.",
          "Sirva essa pasta por HTTP local conforme o setup. Módulos têm regras de origem e carregamento que tornam abrir arquivos diretamente por file:// uma fonte comum de problemas. Confira o painel Network para encontrar 404 e caminhos incorretos. O servidor Python apenas entrega arquivos; ele não compila JavaScript nem instala dependências. Bibliotecas e ferramentas de construção podem ser aprendidas depois.",
          "Pausa de prática: desenhe app.js → tarefas.js e anote o nome importado e o caminho exato. Antes de abrir no navegador, preveja qual erro surgirá se trocar resumir por resumo ou retirar ./ do caminho."
        ]
      },
      {
        "title": "Testes, erros e dependências verificáveis",
        "paragraphs": [
          "Um teste compara o comportamento observado com uma expectativa. console.assert registra uma falha quando a condição é falsa; ausência de mensagem não prova que todos os cenários foram cobertos. Comece por exemplos cujo resultado você consegue calcular manualmente. Três tarefas, duas concluídas, devem produzir total 3, concluidas 2 e pendentes 1.",
          "Casos de borda incluem array vazio, todas concluídas e nenhuma concluída. Entradas inválidas, como null ou concluida com texto \"sim\", devem seguir um contrato explícito. Nossa função lança TypeError porque não consegue fazer uma contagem confiável com esse formato. Um teste desse caso precisa confirmar que o erro realmente aconteceu, não apenas ignorá-lo com catch vazio.",
          "Testes de funções não substituem testes de interação. A contagem pode estar correta enquanto o botão não responde ou a mensagem não é acessível. Separe as evidências: regras verificadas por entradas e saídas; integração verificada na página. Ao corrigir um defeito, acrescente um caso que reproduz a causa, para detectar sua reaparição durante mudanças futuras.",
          "Se aparecer que uma exportação não foi encontrada, compare o nome importado com o nome exportado, incluindo maiúsculas. Se o arquivo não carregou, confira primeiro a URL e o servidor. Um erro de sintaxe dentro de uma dependência pode impedir o módulo principal de iniciar. Corrigir por tentativa aleatória costuma ser mais lento que localizar a primeira mensagem relevante.",
          "Evite dependências circulares nesta etapa: tarefas.js não precisa importar app.js se apenas calcula resumos. Um fluxo simples é app.js depender de regras e armazenamento, enquanto regras permanece independente do DOM. Essa direção ajuda a reutilizar e testar. A arquitetura deve servir ao problema; não há necessidade de adicionar classes, frameworks ou pacotes para um contador de tarefas.",
          "Pausa de prática: execute os casos comum e vazio, depois remova temporariamente ./ do import local. Registre a primeira mensagem do Console e a URL solicitada antes de restaurar o caminho."
        ]
      }
    ],
    "example": {
      "language": "HTML + JavaScript",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Funções organizadas em módulo\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Funções organizadas em módulo\u003c/h1>\n\u003cp>Este laboratório carrega um pequeno módulo local em memória.\u003c/p>\n\u003cp id=\"status\" role=\"status\">Carregando módulo...\u003c/p>\u003cpre id=\"saida\">\u003c/pre>\n\u003cscript>\n\"use strict\";\nconst status = document.querySelector(\"#status\");\nconst saida = document.querySelector(\"#saida\");\nconst fonte = `\nexport function resumir(tarefas) {\n  if (!Array.isArray(tarefas) || !tarefas.every(t =>\n    t !== null && typeof t === \"object\" && typeof t.concluida === \"boolean\")) {\n    throw new TypeError(\"Esperado array de tarefas com concluida booleana.\");\n  }\n  const total = tarefas.length;\n  const concluidas = tarefas.filter(t => t.concluida).length;\n  return {total, concluidas, pendentes: total - concluidas};\n}\nexport function formatar(resumo) {\n  return resumo.concluidas + \" de \" + resumo.total + \" concluídas; \" + resumo.pendentes + \" pendentes.\";\n}\n`;\nasync function iniciar() {\n  const url = URL.createObjectURL(new Blob([fonte], {type:\"text/javascript\"}));\n  try {\n    const {resumir, formatar} = await import(url);\n    const tarefas = [{concluida:true},{concluida:false},{concluida:true}];\n    const resultado = resumir(tarefas);\n    saida.textContent = formatar(resultado);\n    const vazio = resumir([]);\n    console.assert(resultado.total === 3 && resultado.concluidas === 2, \"Caso comum incorreto\");\n    console.assert(vazio.total === 0 && vazio.pendentes === 0, \"Caso vazio incorreto\");\n    status.textContent = \"Módulo carregado; confira também o Console.\";\n  } catch (erro) {\n    status.textContent = `Falha: ${erro.message}`;\n  } finally {\n    URL.revokeObjectURL(url);\n  }\n}\niniciar();\n\u003c/script>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "fonte contém duas funções exportadas com responsabilidades separadas.",
        "resumir valida a entrada antes de contar e não altera os objetos recebidos.",
        "import(url) carrega o módulo e retorna uma Promise com suas exportações.",
        "O código da interface decide como apresentar o resultado usando textContent.",
        "console.assert verifica dois casos pequenos e a URL temporária é liberada ao terminar."
      ],
      "expected": "A página informa 2 de 3 concluídas; 1 pendentes. O Console não registra falhas das duas asserções. O módulo é carregado localmente sem acessar uma API externa."
    },
    "guided": [
      {
        "instruction": "Execute o HTML e altere a última tarefa para concluida:false.",
        "result": "O resultado passa a 1 de 3, e a asserção antiga de duas concluídas falha: atualize a expectativa se essa alteração for intencional."
      },
      {
        "instruction": "Restaure os dados e experimente resumir([]) na parte de apresentação.",
        "result": "O resumo vazio apresenta todos os totais como zero, sem erro."
      },
      {
        "instruction": "Faça a separação em tarefas.js e app.js descrita na seção 3 e sirva por HTTP local.",
        "result": "A mesma regra produz o mesmo resultado com dependências explícitas em arquivos separados."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: uma variável const segredo declarada em tarefas.js sem export fica automaticamente disponível no app.js?",
        "hints": [
          "Módulos possuem seu próprio escopo.",
          "Importações só acessam o que o módulo oferece."
        ],
        "solution": "Não. É necessário exportar deliberadamente um valor que faça parte da interface pública.",
        "explanation": "Encapsular detalhes reduz dependências acidentais. Nem toda variável interna deve ser exposta.",
        "expected": "A importação é inspecionada para verificar quais nomes estão disponíveis no módulo.",
        "criteria": ["Previsão registrada antes de carregar arquivos.","Confere nomes exportados versus detalhes locais."]
      },
      {
        "prompt": "Alterar: na função resumir do exemplo, acrescente percentual inteiro ao objeto retornado, definindo zero para lista vazia. Preserve total, concluidas e pendentes.",
        "hints": [
          "Evite divisão por zero.",
          "Math.round arredonda para o inteiro mais próximo."
        ],
        "solution": "return {total, concluidas, pendentes:total-concluidas, percentual:total === 0 ? 0 : Math.round(concluidas / total * 100)};",
        "explanation": "A regra do caso vazio é explícita. Para duas de três, o valor inteiro é 67; isso é apresentação arredondada, não uma contagem exata.",
        "expected": "Três casos: vazio 0, metade 50, tudo concluído 100.",
        "criteria": ["Retorno mantém contadores e acrescenta percentual inteiro.","Lista vazia, metade e conclusão total são verificadas."]
      },
      {
        "prompt": "Construir: crie testes de nenhuma concluída, todas concluídas e entrada inválida. Mostre uma mensagem ao final e confira também o Console.",
        "hints": [
          "Use arrays pequenos com resultados fáceis de calcular.",
          "Para o erro, registre uma flag somente quando TypeError ocorrer."
        ],
        "solution": "console.assert(resumir([{concluida:false}]).pendentes === 1, \"Pendente\");\nconsole.assert(resumir([{concluida:true}]).concluidas === 1, \"Concluída\");\nlet rejeitou = false;\ntry { resumir([{concluida:\"sim\"}]); } catch (erro) { rejeitou = erro instanceof TypeError; }\nconsole.assert(rejeitou, \"Deveria rejeitar texto no lugar de booleano\");\nconsole.log(\"Verificações executadas; confira possíveis falhas acima.\");",
        "explanation": "Insira após obter as exportações no exemplo ou em um módulo de testes que as importe. A mensagem final informa execução, não certifica sucesso automaticamente.",
        "expected": "Nenhuma asserção falha; o caso inválido é rejeitado deliberadamente.",
        "criteria": ["Testes cobrem vazio, concluído e inválido.","Caso inválido é intencional; nenhuma asserção falha."]
      },
      {
        "prompt": "Investigar erro: app.js usa import { resumo } from \"tarefas.js\", mas o arquivo exporta resumir. No navegador servido por HTTP local, registre o primeiro erro do Console e confira a URL antes de corrigir o nome e o caminho.",
        "hints": [
          "Confira o nome exato exportado.",
          "Um caminho local no navegador precisa ser relativo explícito."
        ],
        "solution": "import { resumir } from \"./tarefas.js\";",
        "explanation": "O nome pedido deve existir entre as exportações. O prefixo ./ resolve o arquivo ao lado de app.js sem depender de um mapa de importações.",
        "expected": "O módulo carrega por HTTP local e a função pode ser chamada.",
        "criteria": ["Erro inicial e URL são registrados antes da correção.","Módulo carrega via HTTP local e função exportada é chamada."]
      }
    ],
    "mistakes": [
      "Usar import estático em script clássico: marque type=\"module\" ou utilize import() quando o caso exigir carregamento dinâmico.",
      "Esquecer ./ no caminho local: use um especificador relativo explícito.",
      "Misturar regra e DOM em toda função: isole cálculos para testar entradas e saídas.",
      "Tratar uma mensagem final como prova de todos os testes: confira as asserções e os cenários cobertos."
    ],
    "quiz": [
      {
        "question": "Qual import corresponde a export function resumir()?",
        "options": [
          "import resumir from \"./tarefas.js\"",
          "import { resumir } from \"./tarefas.js\"",
          "require(\"tarefas\")"
        ],
        "correctIndex": 1,
        "explanation": "A função foi exportada por nome; a importação nomeada usa chaves."
      },
      {
        "question": "O que import(url) devolve?",
        "options": [
          "Uma Promise do módulo carregado",
          "Uma tag HTML",
          "Um array obrigatório"
        ],
        "correctIndex": 0,
        "explanation": "A importação dinâmica é assíncrona e entrega o objeto de exportações."
      },
      {
        "question": "Por que testar array vazio?",
        "options": [
          "Para aumentar artificialmente o número de testes",
          "Porque é uma entrada limite com comportamento próprio",
          "Porque módulos só aceitam arrays vazios"
        ],
        "correctIndex": 1,
        "explanation": "Casos de borda revelam suposições que o exemplo comum pode esconder."
      }
    ],
    "summary": [
      "Módulos expõem dependências e preservam escopo próprio.",
      "Funções de regra separadas do DOM são mais simples de verificar.",
      "Arquivos de módulo no navegador devem ser servidos por HTTP local durante estes exercícios.",
      "Testes úteis cobrem casos comuns, limites e falhas esperadas."
    ]
  }
});

// Recuperação após erro no quiz: aplicar o conceito em outro contexto.
(() => {
  const retries = {
    "js-values": {
      prompt: "Uma passagem custa 750 centavos e o campo quantidade contém a string \"3\". Preveja o tipo e o valor de quantidade + 1; depois calcule o preço total em reais usando conversão explícita.",
      expected: "A primeira expressão produz a string \"31\"; o cálculo convertido produz o número 22.5 e distingue entrada inválida de zero.",
      hint: "Inspecione typeof antes e depois de Number(quantidade)."
    },
    "js-flow": {
      prompt: "Escreva uma função que percorra os números de 1 a 10 e conte apenas os múltiplos de 3. Antes de executar, preveja a contagem e descreva quando o laço termina.",
      expected: "A contagem é 3, pelos valores 3, 6 e 9; o laço avança até sair do limite, sem execução infinita.",
      hint: "Separe a condição de continuar do teste que decide incrementar o contador."
    },
    "js-functions": {
      prompt: "Crie calcularDesconto(preco, percentual), que retorna o preço final para números finitos não negativos e retorna null para dados inválidos. Teste 80 com 25%, 0 com 0% e percentual acima de 100.",
      expected: "Os dois primeiros testes retornam 60 e 0; percentual acima de 100 é recusado; a função retorna valores sem depender de console.log.",
      hint: "Escreva o contrato de entrada e saída antes da fórmula."
    },
    "js-scope-pure": {
      prompt: "Uma função calcularFrete(peso) lê uma variável global taxa e muda quando outra parte do script altera essa taxa. Reescreva a regra para receber peso e taxa como argumentos e compare duas chamadas iguais.",
      expected: "A função não lê nem altera estado externo; chamadas com os mesmos argumentos retornam o mesmo valor mesmo após mudanças fora dela.",
      hint: "Procure todos os nomes usados dentro da função que não são parâmetros nem variáveis locais."
    },
    "js-callbacks-closures": {
      prompt: "Crie criarSaldo(inicial), que devolve uma função para acrescentar um valor e retornar o saldo atual. Crie duas instâncias e preveja o resultado de acrescentar 5 à primeira e 2 à segunda.",
      expected: "Cada função preserva seu próprio saldo; atualizar uma instância não altera a outra; criarSaldo retorna uma função que só é executada quando chamada.",
      hint: "Declare o saldo dentro da função criadora e retorne uma função que o use."
    },
    "js-arrays": {
      prompt: "Você recebeu [{nome:'Lia', pontos:8},{nome:'Rui', pontos:3},{nome:'Bia', pontos:7}]. Crie uma lista de nomes com pelo menos 7 pontos sem alterar os registros originais; depois procure um nome ausente.",
      expected: "A lista resultante contém Lia e Bia nessa ordem; a busca ausente é tratada sem acessar propriedade de undefined.",
      hint: "Combine filter e map; verifique o resultado de find antes de usar suas propriedades."
    },
    "js-es6": {
      prompt: "Dado pedido = {cliente:'Nina', entrega:{cidade:'Recife'}, cupom:0}, crie um pedido novo com outra cidade, sem alterar o original. Extraia cupom preservando o zero.",
      expected: "A cidade do objeto original continua Recife; o novo pedido tem a cidade escolhida; cupom permanece 0 em vez de receber um padrão.",
      hint: "Copie também o objeto aninhado e compare ?? com || para valores zero."
    },
    "js-debug": {
      prompt: "Uma função media([4, 8, 12]) devolve 4, mas deveria devolver 8. Escreva esperado e observado, localize o primeiro cálculo divergente e crie um teste para lista vazia antes de corrigir.",
      expected: "O defeito é reproduzível; um teste cobre o caso normal e outro define o comportamento de lista vazia; a correção faz ambos passarem.",
      hint: "Inspecione separadamente soma e divisor, sem mudar os dois ao mesmo tempo."
    },
    "js-dom": {
      prompt: "Renderize uma lista de três livros {titulo, lido} em uma ul e um contador de livros lidos. Execute a renderização duas vezes e teste um título contendo <b>texto</b>.",
      expected: "A lista continua com três itens após renderizar de novo; o contador corresponde aos lidos; as tags do título aparecem como texto, sem virar HTML.",
      hint: "Limpe a lista antes de recriar os nós e preencha títulos com textContent."
    },
    "js-events": {
      prompt: "Crie um formulário de nova categoria com campo obrigatório. Após envio válido, adicione a categoria à lista; recuse nomes só com espaços e permita remover uma categoria pelo botão dentro do item.",
      expected: "Enter envia como o botão; entrada inválida mostra orientação sem mudar a lista; o botão remove apenas seu item mesmo quando o clique atinge um elemento interno.",
      hint: "Escute submit no formulário e use closest no alvo da lista."
    },
    "js-storage": {
      prompt: "Salve um rascunho de preferência de leitura {tema, tamanho} em uma chave própria. Simule JSON inválido e armazenamento indisponível; mantenha a interface utilizável e permita apagar só esse rascunho.",
      expected: "Um rascunho válido volta após recarregar; dados inválidos são ignorados; falha de armazenamento não interrompe a página; a exclusão preserva outras chaves.",
      hint: "Isole parse e operações de localStorage em try/catch e valide a forma recuperada."
    },
    "js-promises": {
      prompt: "Simule o carregamento assíncrono de uma lista de filmes com uma opção de falha. Mostre estado de espera, sucesso e erro; desabilite o botão só durante o carregamento.",
      expected: "O botão volta a funcionar após sucesso ou falha; a mensagem final corresponde ao resultado e uma nova tentativa pode ser feita.",
      hint: "Coloque a restauração da interface em finally."
    },
    "js-fetch": {
      prompt: "Carregue um arquivo local eventos.json por fetch e apresente estados de carregamento, lista vazia e erro. Teste uma resposta HTTP sem sucesso e um item com texto parecido com HTML.",
      expected: "Status sem sucesso gera erro tratado; lista vazia tem mensagem própria; texto externo aparece como texto; uma nova busca não reutiliza um controlador cancelado.",
      hint: "Verifique response.ok, valide os dados e use textContent ao criar os itens."
    },
    "js-modules": {
      prompt: "Separe uma função pura calcularTotal(itens) em totais.js, exporte-a e importe-a em app.js. Escreva testes para lista vazia, dois itens e quantidade inválida, servindo os arquivos por HTTP local.",
      expected: "O import funciona no navegador pelo servidor local; os três testes têm expectativas explícitas; a função não depende do DOM.",
      hint: "Confira o nome exportado, o caminho relativo do import e type=module no script da página."
    }
  };

  for (const [id, retry] of Object.entries(retries)) LESSON_GUIDES[id].retry = retry;
})();

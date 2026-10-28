'use strict';

// Guias detalhados da trilha Python.
Object.assign(LESSON_GUIDES, {
"py-syntax": {
    "prerequisites": "Nenhum conhecimento de programação é exigido. É útil saber criar e localizar arquivos em uma pasta.",
    "setup": "Instale uma versão atual de Python 3 pelo site oficial e confirme no terminal com python --version; em alguns sistemas o comando é python3 ou py. Crie uma pasta python-estudos e salve os exemplos nela como arquivos .py em UTF-8. Rode no terminal com python aula01.py. O REPL abre quando você executa python sem um arquivo: o prompt >>> aceita uma expressão por vez; use exit() para sair. Se o terminal disser que o comando não existe, confira a instalação e o caminho do executável. Não cole >>> no arquivo .py. A partir daqui, troque apenas os valores de teste e execute novamente para observar as diferenças.",
    "why": "Entradas de formulários, arquivos e APIs quase sempre chegam como texto. Um programa confiável distingue essa representação do número com que precisa calcular. A primeira aula estabelece como executar, observar e corrigir um programa sem depender da solução pronta.",
    "sections": [
      {
        "title": "Ler a execução",
        "paragraphs": [
          "O interpretador executa as instruções de cima para baixo. Em nome = 'Ana', o sinal = associa um valor ao nome; não pergunta se duas coisas são iguais. print(...) mostra a representação de um valor no terminal, inclusive para inspecionar etapas intermediárias. A extensão .py identifica um arquivo de código; comentário após # explica intenção e não executa.",
          "Um nome não começa por número, diferencia maiúsculas de minúsculas e deve descrever o dado. total_minutos comunica mais que x. Atribuir outro valor ao mesmo nome altera a referência atual: visitas = 0 e visitas = visitas + 1 resultam em 1. Python não exige declaração prévia de tipo. Isso não significa que texto e número sejam intercambiáveis. Execute print(type(35).__name__) e print(type('35').__name__) no REPL; obtém int e str.",
          "Python usa recuo para formar blocos nas próximas aulas. Aqui as linhas começam na primeira coluna. Salve antes de executar; se a saída não mudar, verifique se executou o arquivo editado. Uma mensagem de erro informa tipo, arquivo e linha aproximada: leia a última linha do traceback e examine a expressão indicada."
        ]
      },
      {
        "title": "Valores e operações",
        "paragraphs": [
          "int representa inteiros como 35; float representa números de ponto flutuante como 3.5; str é uma sequência de caracteres; bool possui True e False; None indica ausência de valor. type(valor) revela o tipo. Mesmo quando str contém apenas dígitos, '35' + '25' gera '3525': + concatena textos. Já int('35') + int('25') produz 60. A conversão int('trinta') lança ValueError; uma entrada precisa de validação antes de se tornar número.",
          "Operadores aritméticos incluem +, -, *, / (quociente float), // (divisão inteira), % (resto) e ** (potência). Para dinheiro, não confie em comparações exatas de float: represente centavos como int ou, mais adiante, use Decimal. Comparações como >= devolvem bool. O exemplo usa max(meta - total, 0) para mostrar zero quando a meta já passou; sem esse limite apareceria um tempo negativo como 'faltam'.",
          "F-strings colocam expressões dentro de texto: f'{nome}: {total} minutos'. A expressão é avaliada e formatada. Uma f-string é adequada para apresentar resultados; não converte automaticamente uma entrada de texto em número para cálculos anteriores. Use int(...) quando a regra exigir inteiro e float(...) quando aceitar fração."
        ]
      },
      {
        "title": "Entrada e fronteiras",
        "paragraphs": [
          "input('Pergunta: ') pausa o script e sempre devolve str, mesmo se a pessoa digitar 20. Para testar sem digitar a cada execução, começamos com literais como manha_texto = '35'. Depois troque por input('Minutos de manhã: '); mantenha a conversão separada para conseguir identificar onde falhou. Se a pessoa apenas pressionar Enter, int('') produz ValueError. Nas próximas aulas veremos try/except e funções que validam limites.",
          "Uma fronteira de dados é o ponto em que informações externas entram no programa. Pergunte qual formato é esperado: os minutos são inteiros não negativos? Existe máximo? O número pode ser vazio? Já no primeiro programa, experimente 0, '7', '-5' e 'abc'. O fato de int('-5') funcionar não torna -5 uma duração válida. Conversão verifica formato; uma condição deve verificar a regra de negócio.",
          "O exemplo usa nome, manhã e tarde definidos no arquivo para gerar uma saída reproduzível. Antes de olhar o resultado esperado, calcule 35 + 25 mentalmente. Teste valores diferentes e escreva sua previsão. Essa rotina de prever, executar e explicar ajuda a detectar erros que apenas executar não revelaria."
        ]
      },
      {
        "title": "Um ciclo de trabalho simples",
        "paragraphs": [
          "Escreva uma versão pequena, execute e leia a saída. Se surgir NameError, procure um nome não definido ou grafado de modo diferente; se aparecer SyntaxError, confira aspas e parênteses; se vier ValueError na conversão, imprima a entrada original e ajuste a validação. Corrija primeiro o erro mostrado no traceback, pois um erro inicial pode causar vários sintomas posteriores.",
          "Guarde seus arquivos da aula na pasta própria. O terminal deve estar nessa pasta ou receber o caminho do arquivo. Nomes de arquivo como aula01.py não devem ser python.py, pois um arquivo chamado como a biblioteca pode atrapalhar importações futuras. Termine explicando em voz alta a diferença entre armazenar '35' e 35 e por que o total sai como 60."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# Salve como aula01.py e execute: python aula01.py\nnome = \"Ana\"\nmanha_texto = \"35\"\ntarde_texto = \"25\"\nmanha = int(manha_texto)\ntarde = int(tarde_texto)\ntotal = manha + tarde\nmeta = 90\nprint(f\"{nome}: {total} minutos\")\nprint(f\"Faltam {max(meta - total, 0)} minutos\")\nprint(f\"Meta atingida: {total >= meta}\")\nprint(type(total).__name__)\n",
      "explanation": [
        "As strings de entrada são convertidas explicitamente com int antes da soma.",
        "A comparação total >= meta produz um bool sem uma condição if.",
        "max impede que o campo de tempo restante fique negativo."
      ],
      "expected": "Ana: 60 minutos\nFaltam 30 minutos\nMeta atingida: False\nint"
    },
    "guided": [
      {
        "instruction": "Troque tarde_texto para '55' e preveja as linhas de tempo antes de executar.",
        "result": "O total vira 90, faltam 0 e a meta aparece como True."
      },
      {
        "instruction": "Troque manhã para '-5'. Explique por que a conversão aceita o texto e por que a regra de duração ainda está errada.",
        "result": "int('-5') gera -5; é preciso também rejeitar minutos negativos."
      },
      {
        "instruction": "Substitua uma entrada literal por input. Observe o tipo retornado antes e depois de int.",
        "result": "input retorna str; após int, o valor é int se o texto for um inteiro válido."
      }
    ],
    "exercises": [
      {
        "prompt": "1. Converta '40' e '20', some e imprima '60 minutos'.",
        "hints": [
          "Guarde as strings separadas.",
          "Aplique int a cada entrada antes de somar."
        ],
        "solution": "a = int('40')\nb = int('20')\nprint(f'{a + b} minutos')",
        "explanation": "A conversão antecede + para evitar a concatenação de textos.",
        "expected": "60 minutos",
        "criteria": ["Converte ambos os textos para números antes de somar.","Imprime o total com a unidade e sem concatenar strings."]
      },
      {
        "prompt": "2. Leia duas durações com input e imprima o total. Teste com 5 e 7.",
        "hints": [
          "input devolve str.",
          "Converta com int antes de calcular."
        ],
        "solution": "a = int(input('Primeira duração: '))\nb = int(input('Segunda duração: '))\nprint(a + b)",
        "explanation": "O programa solicita dados em cada execução e mostra o inteiro calculado. As entradas 5 e 7 produzem 12.",
        "expected": "Primeira duração: 5\nSegunda duração: 7\n12",
        "criteria": ["Lê dois valores com input e converte cada duração.","A soma corresponde às entradas fornecidas."]
      },
      {
        "prompt": "3. Com total=130 e meta=90, imprima quanto falta sem mostrar um valor negativo.",
        "hints": [
          "Calcule meta - total.",
          "Use max(resultado, 0)."
        ],
        "solution": "total = 130\nmeta = 90\nprint(max(meta - total, 0))",
        "explanation": "max escolhe o maior valor entre o resultado negativo e zero.",
        "expected": "0",
        "criteria": ["Calcula a diferença sem apresentar resultado negativo.","A meta já alcançada retorna zero no caso indicado."]
      },
      {
        "prompt": "4. Para textos '12' e '8', imprima o total e a frase 'Meta atingida: True' quando meta=20.",
        "hints": [
          "Primeiro converta e some.",
          "Use uma f-string e uma comparação >=."
        ],
        "solution": "total = int('12') + int('8')\nmeta = 20\nprint(total)\nprint(f'Meta atingida: {total >= meta}')",
        "explanation": "A solução mostra tanto o número quanto o resultado lógico da regra.",
        "expected": "20\nMeta atingida: True",
        "criteria": ["Converte os dois textos, soma os valores e compara com a meta.","A saída apresenta o total e um booleano calculado."]
      }
    ],
    "mistakes": [
      "'3' + '2' resulta em '32'; transforme os operandos em int antes de somar.",
      "input devolve texto; não atribua a ele o significado de número sem conversão e validação.",
      "ValueError de int('abc') informa entrada inválida; não o resolva removendo a conversão.",
      "bool não se escreve true ou false em Python: use True e False."
    ],
    "quiz": [
      {
        "question": "Qual é o resultado de '4' + '6'?",
        "options": [
          "10",
          "46",
          "Erro sempre"
        ],
        "correctIndex": 1,
        "explanation": "Dois valores str são concatenados: o resultado é a string '46'."
      },
      {
        "question": "Qual é o tipo devolvido por input?",
        "options": [
          "int",
          "str",
          "bool"
        ],
        "correctIndex": 1,
        "explanation": "input sempre devolve texto; a conversão é explícita."
      },
      {
        "question": "Por que int('-5') não basta para validar minutos?",
        "options": [
          "Porque retorna float",
          "Porque minutos negativos violam a regra apesar do formato válido",
          "Porque nunca aceita sinais"
        ],
        "correctIndex": 1,
        "explanation": "O formato é um inteiro válido, mas a regra do domínio exige duração não negativa."
      }
    ],
    "summary": [
      "Execute um arquivo .py, use o REPL para investigar uma expressão e leia tracebacks.",
      "Diferencie texto e número antes de calcular; valide formato e regra separadamente.",
      "Preveja saídas e teste limites como zero, valores negativos e texto inválido."
    ]
  },
"py-control": {
    "prerequisites": "Aula anterior: variáveis, tipos, int e comparações.",
    "setup": "Salve aula02.py na mesma pasta. Execute com Python 3. Antes de mudar o programa, preveja quantas linhas de dias serão exibidas e qual valor final. Trabalhe inicialmente com a lista fixa, de modo que a saída seja reproduzível. Depois substitua valores para testar zero, números negativos e números acima da meta.",
    "why": "Decisões traduzem critérios de negócio: um valor negativo deve ser recusado; uma meta cumprida muda a mensagem. Laços evitam copiar a mesma instrução para cada dia. Saber onde o laço começa, termina e atualiza impede relatórios incompletos e programas que nunca param.",
    "sections": [
      {
        "title": "Condições como regras explícitas",
        "paragraphs": [
          "if testa uma expressão cujo resultado é interpretado como verdadeiro ou falso. O código recuado embaixo dele só roda quando a condição é verdadeira. elif testa uma alternativa quando as anteriores falham; else cobre o restante. Para uma nota de 0 a 10, valide primeiro 0 \u003c= nota \u003c= 10; depois classifique. A ordem importa: if nota >= 5 antes de if nota >= 8 impediria a classificação especial de 8.",
          "Comparações incluem ==, !=, \u003c, \u003c=, > e >=. Use == para comparar e = para atribuir. and requer ambas as condições, or requer alguma e not inverte. Em Python, 0, '' e coleções vazias são falsy; números não zero e strings não vazias são truthy. Porém if texto: apenas informa que há caracteres; não demonstra que uma string como 'dez' representa um inteiro. Prefira condição que mostre a regra concreta.",
          "Expressões encadeadas como 0 \u003c= idade \u003c= 120 são aceitas. Combine limites com um nome significativo para poder explicar o teste. Condições complexas podem ser divididas em variáveis, por exemplo valido = isinstance(valor, int) and valor >= 0. Nos exemplos dessa etapa, o valor já é inteiro; uma entrada livre será tratada na aula de exceções."
        ]
      },
      {
        "title": "for e range",
        "paragraphs": [
          "for percorre os itens de uma sequência. Em for valor in minutos, valor recebe cada elemento, em ordem. enumerate(minutos, start=1) fornece pares índice/valor; um relatório pode mostrar Dia 1 sem alterar a lista. O código dentro do laço precisa estar recuado de forma consistente, normalmente quatro espaços. total começa em zero fora do laço e recebe total += valor para acumular.",
          "range(5) gera 0,1,2,3,4, não inclui 5. range(1,6) produz 1 a 5; range(2,11,2) produz 2,4,6,8,10. O limite superior exclusivo ajuda a trabalhar com índices, mas causa erros quando é confundido com um máximo inclusivo. Antes de escrever o laço, descreva o primeiro, o último e quantas vezes executará.",
          "continue pula o restante da iteração atual; no exemplo, valores inválidos não entram na soma. break encerra o laço inteiro. Não use esses comandos para esconder uma regra não explicada: uma equipe precisa saber se o dado inválido será ignorado, sinalizado ou fará a operação inteira falhar."
        ]
      },
      {
        "title": "while e interação",
        "paragraphs": [
          "while repete enquanto a condição permanecer verdadeira. Uma pergunta interativa pode usar tentativas = 0; while tentativas \u003c 3: pedir resposta; atualizar tentativas. Se esquecer a atualização, o laço pode continuar indefinidamente. Para interromper um programa preso no terminal, pressione Ctrl+C e examine a condição. Para processar uma coleção conhecida, for costuma ser mais claro.",
          "Um laço que pede int(input(...)) ainda pode falhar se a pessoa digitar letras. Na aula de exceções aprenderemos a capturar ValueError. Até lá, experimente com entradas controladas ou use texto.isdecimal() após strip() para aceitar apenas dígitos não negativos; lembre que esse método não aceita sinais nem frações. Separe a pergunta, a conversão e a validação da regra para localizar problemas.",
          "Uma condição de parada deve ser testada antes de acumular dados inválidos. Se a regra for encerrar ao receber 0, compare valor == 0 e use break antes de somar. Se zero for um dado legítimo, escolha outro marcador. Escreva essas decisões no enunciado e nos testes."
        ]
      },
      {
        "title": "Casos normais e limites",
        "paragraphs": [
          "Execute com a lista [20, 0, 35, 15, 40]: zero é válido e o total termina em 110. Adicione -5 no meio: o programa marca o dia como inválido e continua sem alterar o total. Troque a lista por []: o laço não executa e o programa informa que faltam 100. Esse último caso revela se o relatório ainda faz sentido sem dias.",
          "Teste exatamente o limite (100), um abaixo (99) e um acima (101). Uma comparação > em vez de >= falharia em 100. Explique também se uma duração muito grande deveria ter limite máximo; uma validação real pode exigir intervalo de 0 a 1440 por dia. O conjunto de testes nasce das regras, não da aparência do resultado."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# aula02.py\nminutos = [20, 0, 35, 15, 40]\ntotal = 0\nfor indice, valor in enumerate(minutos, start=1):\n    if valor \u003c 0:\n        print(f\"Dia {indice}: inválido\")\n        continue\n    total += valor\n    print(f\"Dia {indice}: {valor} min; acumulado {total}\")\nif total >= 100:\n    print(\"Meta atingida\")\nelse:\n    print(f\"Faltam {100 - total} minutos\")\n",
      "explanation": [
        "enumerate cria o número de cada dia sem precisar de um contador manual.",
        "continue impede que valores negativos entrem no acumulador.",
        "A comparação >= inclui a fronteira exata da meta."
      ],
      "expected": "Dia 1: 20 min; acumulado 20\nDia 2: 0 min; acumulado 20\nDia 3: 35 min; acumulado 55\nDia 4: 15 min; acumulado 70\nDia 5: 40 min; acumulado 110\nMeta atingida"
    },
    "guided": [
      {
        "instruction": "Mude a meta de 100 para 110 e preveja a classificação.",
        "result": "O acumulado final é exatamente 110 e >= continua imprimindo Meta atingida."
      },
      {
        "instruction": "Insira -10 como terceiro item. Qual linha aparece e qual será o total final?",
        "result": "A linha do terceiro item indica inválido e o total continua 110, pois o valor é ignorado."
      },
      {
        "instruction": "Troque >= por > e compare o comportamento para a meta exata de 110.",
        "result": "O programa passa a informar Faltam 0 minutos, erro lógico no limite."
      }
    ],
    "exercises": [
      {
        "prompt": "1. Imprima 1, 2 e 3 usando range e for.",
        "hints": [
          "range para em seu limite superior.",
          "Use range(1, 4)."
        ],
        "solution": "for numero in range(1, 4):\n    print(numero)",
        "explanation": "O limite superior exclusivo 4 gera 1 a 3.",
        "expected": "1\n2\n3",
        "criteria": ["Usa for com range para percorrer os três valores.","Cada valor aparece uma vez e na ordem pedida."]
      },
      {
        "prompt": "2. Some apenas valores não negativos de [4, -1, 6] e imprima 10.",
        "hints": [
          "Comece total em zero.",
          "Use if valor \u003c 0: continue."
        ],
        "solution": "total = 0\nfor valor in [4, -1, 6]:\n    if valor \u003c 0:\n        continue\n    total += valor\nprint(total)",
        "explanation": "A soma ignora -1 explicitamente; a decisão deve ser informada ao usuário.",
        "expected": "10",
        "criteria": ["Filtra valores negativos sem incluí-los na soma.","O resultado vem dos valores aceitos, não de uma constante."]
      },
      {
        "prompt": "3. Para notas [4, 7, 9], imprima Reprovado, Aprovado e Destaque nessa ordem.",
        "hints": [
          "Teste primeiro a nota mais alta.",
          "Use if/elif/else dentro do for."
        ],
        "solution": "for nota in [4, 7, 9]:\n    if nota >= 8:\n        print('Destaque')\n    elif nota >= 6:\n        print('Aprovado')\n    else:\n        print('Reprovado')",
        "explanation": "A ordem das condições reserva o caso de destaque antes da aprovação geral.",
        "expected": "Reprovado\nAprovado\nDestaque",
        "criteria": ["Aplica condições distintas para as três faixas.","Os rótulos aparecem na ordem das notas."]
      },
      {
        "prompt": "4. Conte com while de 3 até 1 e então imprima Fim.",
        "hints": [
          "Inicialize um contador em 3.",
          "Atualize a cada repetição com -= 1."
        ],
        "solution": "contador = 3\nwhile contador > 0:\n    print(contador)\n    contador -= 1\nprint('Fim')",
        "explanation": "A condição de parada se torna falsa após imprimir 1.",
        "expected": "3\n2\n1\nFim",
        "criteria": ["while atualiza o contador a cada volta e termina.","A mensagem final surge depois da contagem decrescente."]
      }
    ],
    "mistakes": [
      "range(1, 5) não inclui 5; confira o último valor que deseja imprimir.",
      "Confundir = com == em condições causa SyntaxError ou atribuição indevida em outros contextos.",
      "Um while sem atualização pode não terminar; defina sua condição de parada antes de codificar.",
      "Uma ordem inadequada de if/elif pode tornar uma categoria inalcançável."
    ],
    "quiz": [
      {
        "question": "O que range(2, 5) produz?",
        "options": [
          "2, 3, 4",
          "2, 3, 4, 5",
          "3, 4, 5"
        ],
        "correctIndex": 0,
        "explanation": "O limite superior 5 é exclusivo."
      },
      {
        "question": "Qual comparação inclui uma meta de exatamente 100?",
        "options": [
          "> 100",
          ">= 100",
          "!= 100"
        ],
        "correctIndex": 1,
        "explanation": "O operador >= inclui igualdade."
      },
      {
        "question": "Para que serve continue no laço do exemplo?",
        "options": [
          "Encerrar todo o script",
          "Pular o item inválido e seguir ao próximo",
          "Reiniciar o total"
        ],
        "correctIndex": 1,
        "explanation": "continue pula o restante da iteração corrente e mantém o laço."
      }
    ],
    "summary": [
      "Traduza a regra em condições ordenadas e com fronteiras explícitas.",
      "Escolha for para sequências e while quando houver condição de parada dinâmica.",
      "Teste valores normais, vazios, inválidos e exatamente no limite."
    ]
  },
"py-data": {
    "prerequisites": "Aulas anteriores: tipos, for, if e comparações.",
    "setup": "Salve como aula03.py. Os dados estão no próprio arquivo: nenhuma instalação adicional. Execute e confirme a saída. Depois altere um registro por vez. Experimente acessar aulas[0], aulas[-1] e aulas[1:3] no REPL ou com print; tente aulas[99] para ler IndexError. Esses erros fazem parte do aprendizado, mas restaure o exemplo antes de seguir.",
    "why": "Projetos lidam com coleções de itens e registros: aulas, usuários, produtos e pedidos. A estrutura escolhida determina como consultar, atualizar, contar e eliminar duplicatas. Entender referência compartilhada evita alterações invisíveis que geram bugs de manutenção.",
    "sections": [
      {
        "title": "Listas: ordem e alteração",
        "paragraphs": [
          "Uma lista usa colchetes: tarefas = ['ler', 'codar']. Mantém ordem e aceita duplicatas; len(tarefas) conta os itens. O primeiro índice é 0, então tarefas[0] é 'ler'; o índice -1 é o último. tarefas[1:3] cria uma nova lista com índices 1 e 2, excluindo 3. Uma lista vazia tem comprimento zero e não possui tarefas[0]. Para acrescentar use append; para retirar por índice pop; para percorrer use for item in tarefas.",
          "Listas são mutáveis: tarefas.append('testar') altera o objeto existente. Se outra variável aponta para a mesma lista, ambas observam a mudança. b = a não copia o conteúdo; b = a.copy() cria uma cópia rasa, suficiente para elementos imutáveis simples, mas dicionários dentro da lista permanecem compartilhados. Ao escrever funções, decida se elas alteram os dados recebidos ou produzem um resultado novo e documente isso.",
          "sorted(lista) devolve nova lista ordenada; lista.sort() modifica a original. Ordenar números e textos misturados falha em Python 3. Para registros, use sorted(aulas, key=lambda aula: aula['minutos']); a função key determina o valor de comparação. A aula de funções aprofunda lambda e responsabilidades de transformação."
        ]
      },
      {
        "title": "Tuplas e conjuntos",
        "paragraphs": [
          "Uma tupla usa parênteses, como coordenada = (10, 20), e seus itens não podem ser atribuídos por índice. É útil para um par fixo e para retorno múltiplo: x, y = coordenada. A imutabilidade da tupla é rasa: se ela contiver uma lista, a lista interna ainda pode mudar. Uma tupla com um item exige vírgula, (10,), para não ser confundida com apenas parênteses ao redor de uma expressão.",
          "Um conjunto ou set usa chaves com itens, como {'Python', 'Git'}, e não guarda duplicatas. Para um conjunto vazio use set(), pois {} é dicionário vazio. Conjuntos não devem ser usados quando a ordem exibida é parte do contrato; itere em sorted(areas) se quiser saída estável. Operações como a | b (união), a & b (interseção) e valor in a (pertencimento) ajudam a comparar grupos.",
          "Os elementos de um set precisam ser hashable; strings e números servem, listas não. A compreensão {aula['area'] for aula in aulas} no exemplo reúne categorias distintas. Como só imprimimos len(areas), a ordem interna não afeta a saída esperada."
        ]
      },
      {
        "title": "Dicionários: chaves e significado",
        "paragraphs": [
          "Um dicionário associa chave a valor: aluno = {'nome': 'Ana', 'idade': 20}. aluno['nome'] retorna 'Ana'; uma chave ausente causa KeyError. aluno.get('email') retorna None por padrão e aluno.get('email', 'não informado') permite um fallback explícito. Use get quando a ausência for normal; não use um fallback para disfarçar dado obrigatório que deveria ser validado.",
          "Dicionários são mutáveis. aluno['idade'] = 21 substitui o valor. for chave, valor in aluno.items() percorre pares; keys() e values() expõem visões das chaves e valores. Em uma lista de dicionários, cada registro possui os mesmos campos esperados. Se uma aula não tiver 'minutos', a linha do exemplo que acessa aula['minutos'] falha; validar formato ao receber dados externos será necessário.",
          "Uma compreensão de lista como [aula['titulo'] for aula in aulas if not aula['concluida']] transforma e filtra ao mesmo tempo. Leia da esquerda para a direita: qual valor quero produzir, de onde vêm os itens e qual condição os mantém? Para lógica extensa, prefira um for normal, com nomes de variáveis e etapas visíveis."
        ]
      },
      {
        "title": "Escolher e testar a estrutura",
        "paragraphs": [
          "Se você precisa de itens ordenados que podem mudar, escolha lista. Para um par fixo, tupla. Para registro nomeado, dicionário. Para pertencimento e unicidade sem ordem de apresentação, set. Um projeto frequentemente combina estruturas, como lista de dicionários; isso não cria um banco de dados nem valida os dados automaticamente.",
          "Teste a lista vazia e uma lista com apenas uma aula. O exemplo usa join em pendentes; ', '.join([]) resulta em string vazia, então a saída 'Pendentes: ' pode precisar de uma frase melhor na interface. Teste também títulos repetidos e categorias repetidas. Decida se duplicatas são permitidas antes de escolher deduplicação. Por fim, compare a coleção antes e depois do cálculo para confirmar que a agregação não a alterou."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# aula03.py\naulas = [\n    {\"titulo\": \"Variáveis\", \"minutos\": 25, \"concluida\": True, \"area\": \"Python\"},\n    {\"titulo\": \"Listas\", \"minutos\": 40, \"concluida\": False, \"area\": \"Python\"},\n    {\"titulo\": \"Git\", \"minutos\": 30, \"concluida\": True, \"area\": \"Ferramentas\"},\n]\nconcluidas = [aula for aula in aulas if aula[\"concluida\"]]\npendentes = [aula[\"titulo\"] for aula in aulas if not aula[\"concluida\"]]\nminutos = sum(aula[\"minutos\"] for aula in concluidas)\nareas = {aula[\"area\"] for aula in aulas}\nprint(f\"Concluídas: {len(concluidas)}\")\nprint(f\"Minutos: {minutos}\")\nprint(f\"Pendentes: {', '.join(pendentes)}\")\nprint(f\"Áreas distintas: {len(areas)}\")\n",
      "explanation": [
        "A lista mantém a ordem dos registros e cada dicionário dá nome aos campos.",
        "As compreensões criam coleções novas para concluídas, pendentes e áreas distintas.",
        "sum com uma expressão geradora agrega os minutos das aulas concluídas."
      ],
      "expected": "Concluídas: 2\nMinutos: 55\nPendentes: Listas\nÁreas distintas: 2"
    },
    "guided": [
      {
        "instruction": "Marque a aula Listas como concluída e preveja todas as contagens.",
        "result": "São 3 concluídas, 95 minutos, nenhuma pendente e 2 áreas distintas."
      },
      {
        "instruction": "Troque um título por outro repetido. O que muda nos cálculos?",
        "result": "Os títulos repetidos permanecem na lista; set atua apenas sobre áreas."
      },
      {
        "instruction": "Crie copia = aulas.copy() e altere copia[0]['titulo']. Verifique aulas[0].",
        "result": "O dicionário interno é compartilhado pela cópia rasa e também muda na lista original."
      }
    ],
    "exercises": [
      {
        "prompt": "1. Mostre o primeiro e o último item de [10, 20, 30].",
        "hints": [
          "O índice inicial é zero.",
          "Use -1 para o último."
        ],
        "solution": "valores = [10, 20, 30]\nprint(valores[0])\nprint(valores[-1])",
        "explanation": "Índices 0 e -1 apontam para as extremidades.",
        "expected": "10\n30",
        "criteria": ["Acessa primeiro e último elemento pelo índice.","A lista original permanece na ordem dada."]
      },
      {
        "prompt": "2. Conte categorias distintas de ['web', 'dados', 'web'].",
        "hints": [
          "Converta para set.",
          "Use len no conjunto."
        ],
        "solution": "categorias = ['web', 'dados', 'web']\nprint(len(set(categorias)))",
        "explanation": "O conjunto elimina repetições para a contagem.",
        "expected": "2",
        "criteria": ["Converte categorias em estrutura sem duplicatas.","A contagem usa os elementos distintos."]
      },
      {
        "prompt": "3. A partir de {'nome':'Ana','pontos':7}, imprima Ana: 7.",
        "hints": [
          "Acesse cada chave.",
          "Monte a frase com f-string."
        ],
        "solution": "aluno = {'nome': 'Ana', 'pontos': 7}\nprint(f\"{aluno['nome']}: {aluno['pontos']}\")",
        "explanation": "O dicionário representa um registro com campos nomeados.",
        "expected": "Ana: 7",
        "criteria": ["Lê as duas chaves solicitadas do dicionário.","Formata os valores no padrão pedido."]
      },
      {
        "prompt": "4. Gere uma nova lista apenas com os números pares de [1, 2, 3, 4] e prove que a original mantém quatro itens.",
        "hints": [
          "Use uma compreensão com if.",
          "Teste valor % 2 == 0 e imprima ambas."
        ],
        "solution": "originais = [1, 2, 3, 4]\npares = [valor for valor in originais if valor % 2 == 0]\nprint(pares)\nprint(originais)",
        "explanation": "A compreensão produz uma nova lista; não altera a original.",
        "expected": "[2, 4]\n[1, 2, 3, 4]",
        "criteria": ["Constrói nova lista com apenas pares.","Demonstra que a lista inicial continua com quatro itens."]
      }
    ],
    "mistakes": [
      "Índices começam em zero; um índice inexistente lança IndexError.",
      "b = a compartilha a lista e a.copy() não duplica dicionários internos.",
      "{} cria dicionário vazio, não conjunto vazio; use set().",
      "Não dependa da ordem de iteração de um set para saída apresentada ao usuário."
    ],
    "quiz": [
      {
        "question": "Qual estrutura combina chave 'titulo' com um valor?",
        "options": [
          "Lista",
          "Dicionário",
          "Set"
        ],
        "correctIndex": 1,
        "explanation": "Dicionários representam pares chave/valor."
      },
      {
        "question": "O que b = a faz quando a é uma lista?",
        "options": [
          "Cópia profunda",
          "Referência ao mesmo objeto",
          "Conversão em tupla"
        ],
        "correctIndex": 1,
        "explanation": "As duas variáveis apontam para a mesma lista mutável."
      },
      {
        "question": "Por que sorted(set(categorias)) pode ser útil?",
        "options": [
          "Mantém apenas repetidos",
          "Produz únicos com ordem estável",
          "Cria um arquivo"
        ],
        "correctIndex": 1,
        "explanation": "set elimina duplicatas e sorted gera uma sequência ordenada."
      }
    ],
    "summary": [
      "Escolha coleções pela necessidade de ordem, alteração, chaves ou unicidade.",
      "Reconheça cópias rasas e objetos compartilhados.",
      "Teste coleções vazias e entradas duplicadas sem assumir que a estrutura valida dados."
    ]
  },
"py-functions": {
    "prerequisites": "Aulas anteriores: tipos, decisões, laços, listas e dicionários.",
    "setup": "Salve como aula04.py. Execute primeiro o arquivo inteiro. Depois abra o REPL na mesma pasta, use from aula04 import minutos_pendentes e observe que as linhas no fim do arquivo também são executadas durante a importação. Para evitar esse efeito num módulo real, coloque a demonstração sob if __name__ == '__main__':; esse bloco só roda quando o arquivo é executado diretamente. Faça essa alteração depois de entender as saídas.",
    "why": "Funções tornam regras repetidas reutilizáveis e permitem testar uma unidade pequena. Um bom contrato informa entradas aceitas, valor devolvido e erros previstos. Isso ajuda quando requisitos mudam: corrigir a regra em um lugar reduz resultados divergentes entre telas e relatórios.",
    "sections": [
      {
        "title": "Definir, chamar e devolver",
        "paragraphs": [
          "def nome(parametro): inicia uma função; o bloco recuado contém suas instruções. A definição não executa o corpo imediatamente. A chamada nome(valor) fornece um argumento; esse valor passa ao parâmetro. return encerra a chamada e devolve um valor ao ponto de uso. Se nenhuma instrução return for executada, Python devolve None. print mostra no terminal e devolve None; não substitui return quando outra parte do programa precisa do resultado.",
          "No exemplo, minutos_pendentes recebe uma lista de dicionários, percorre os registros e devolve um inteiro. A função não chama print, não acessa uma variável global aulas e não modifica a lista. Quem chama decide se exibe, armazena ou usa o número em outro cálculo. Separe regra de apresentação para poder reutilizar a mesma função em interface, relatório e teste.",
          "O nome da função deve revelar a ação. Os nomes dos parâmetros revelam dados esperados. Docstrings, delimitadas por três aspas logo após def, explicam contrato e aparecem em help(nome). Uma descrição útil cobre o que a função retorna, restrições das entradas e efeitos colaterais; repetir apenas o nome da função pouco ajuda."
        ]
      },
      {
        "title": "Parâmetros e padrões",
        "paragraphs": [
          "situacao(minutos, meta=60) tem um parâmetro obrigatório e um valor padrão. situacao(40) usa meta 60; situacao(40, 50) substitui por 50; situacao(meta=50, minutos=40) nomeia argumentos e pode melhorar legibilidade. Parâmetros sem padrão devem vir antes dos que têm padrão. A quantidade incorreta de argumentos produz TypeError.",
          "Evite usar lista ou dicionário mutável como padrão: def adicionar(item, lista=[]): guarda o mesmo objeto entre chamadas. Prefira lista=None e, dentro da função, crie [] quando lista is None. None é um marcador para ausência; o operador is é adequado para comparar identidade com None. No caso de meta, 60 é int imutável e não compartilha alterações.",
          "Uma função pode devolver tupla ou dicionário com vários resultados. Use um dicionário quando nomes dos campos ajudam o leitor, por exemplo {'total': 3, 'concluidas': 2}. Mantenha os mesmos nomes e tipos em todos os caminhos; retornar ora um inteiro, ora uma mensagem torna o uso difícil."
        ]
      },
      {
        "title": "Escopo, referência e efeitos",
        "paragraphs": [
          "A variável total dentro de minutos_pendentes é local: é criada quando a função roda e não pode ser usada fora dela. O parâmetro aulas também é um nome local, mas aponta para o objeto fornecido por quem chama. Se a função executasse aulas.append(...), a lista do chamador mudaria. Reatribuir aulas = [] dentro da função troca apenas o nome local, não esvazia a lista externa.",
          "Funções que recebem objetos mutáveis exigem um contrato explícito: modificam a entrada ou produzem dados novos? Para cálculos, geralmente é mais simples não alterar a entrada. Você pode fotografar uma lista de dicionários antes do teste e compará-la depois. Se precisar de uma cópia independente dos objetos aninhados, estude copy.deepcopy e seus custos; uma cópia rasa da lista não basta.",
          "Evite global para transportar resultados. Uma função que depende de uma variável criada fora dela pode quebrar quando o arquivo é importado ou o nome muda. Passe a dependência como parâmetro e devolva o resultado. Isso permite testar entradas diferentes sem redefinir estado global."
        ]
      },
      {
        "title": "Especificar e testar o contrato",
        "paragraphs": [
          "Antes de escrever código, formule casos: lista vazia devolve 0; todas concluídas devolvem 0; todas pendentes devolvem a soma; uma mistura devolve apenas pendentes. Execute cada caso com assert minutos_pendentes([...]) == esperado. Um assert que falha interrompe com AssertionError e indica qual expectativa não foi cumprida. Use asserts no laboratório e testes; regras obrigatórias de produção exigem validação explícita, pois asserts podem ser desativados.",
          "O exemplo pressupõe que cada registro tenha chaves concluida e minutos, com tipos válidos. Decida no seu projeto se entradas incorretas lançam ValueError ou TypeError, ou se são descartadas. Não aceite silenciosamente '30' como 30 sem declarar conversão. As funções pequenas deixam essa decisão visível. Na aula de depuração faremos testes de fronteira e falhas de forma sistemática.",
          "Ao mudar o requisito de meta padrão de 60 para 90, há um único lugar para editar. Mas os testes devem mudar ou destacar o comportamento esperado; não altere a função para passar num teste sem antes entender se o teste representa a regra correta."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# aula04.py\ndef minutos_pendentes(aulas):\n    \"\"\"Soma minutos de aulas não concluídas sem modificar a entrada.\"\"\"\n    total = 0\n    for aula in aulas:\n        if not aula[\"concluida\"]:\n            total += aula[\"minutos\"]\n    return total\n\n\ndef situacao(minutos, meta=60):\n    \"\"\"Devolve a mensagem da meta para inteiros não negativos.\"\"\"\n    if minutos >= meta:\n        return \"Meta atingida\"\n    return f\"Faltam {meta - minutos} minutos\"\n\n\naulas = [\n    {\"titulo\": \"Listas\", \"minutos\": 30, \"concluida\": False},\n    {\"titulo\": \"Funções\", \"minutos\": 45, \"concluida\": True},\n]\nprint(minutos_pendentes(aulas))\nprint(situacao(40))\nprint(situacao(60))\n",
      "explanation": [
        "minutos_pendentes retorna um número, permitindo que o chamador escolha como apresentá-lo.",
        "O parâmetro meta possui um padrão imutável e pode ser substituído em cada chamada.",
        "As duas funções possuem docstrings e não alteram a lista de entrada."
      ],
      "expected": "30\nFaltam 20 minutos\nMeta atingida"
    },
    "guided": [
      {
        "instruction": "Mude a segunda aula para concluida=False. Qual será o primeiro número?",
        "result": "O primeiro número passa de 30 para 75."
      },
      {
        "instruction": "Chame situacao(40, 40) e compare com situacao(40).",
        "result": "A primeira retorna Meta atingida; a segunda diz Faltam 20 minutos."
      },
      {
        "instruction": "Substitua return total por print(total) e atribua resultado = minutos_pendentes(aulas).",
        "result": "A função imprime 30, mas resultado recebe None: imprimir e retornar são operações diferentes."
      }
    ],
    "exercises": [
      {
        "prompt": "1. Escreva dobro(numero) que devolve o dobro; imprima dobro(4).",
        "hints": [
          "Use def e um parâmetro.",
          "A função precisa de return."
        ],
        "solution": "def dobro(numero):\n    return numero * 2\n\nprint(dobro(4))",
        "explanation": "A função devolve 8 à chamada de print.",
        "expected": "8",
        "criteria": ["Função recebe um número e devolve valor calculado.","A chamada é impressa fora da função."]
      },
      {
        "prompt": "2. Escreva aprovado(nota, minimo=6) e teste 6 e 5.",
        "hints": [
          "A comparação pode ser devolvida diretamente.",
          "O limite exato deve ser aprovado."
        ],
        "solution": "def aprovado(nota, minimo=6):\n    return nota >= minimo\n\nprint(aprovado(6))\nprint(aprovado(5))",
        "explanation": ">= inclui o limite; o parâmetro padrão pode ser substituído quando necessário.",
        "expected": "True\nFalse",
        "criteria": ["Parâmetro mínimo tem padrão e pode ser substituído.","Casos de fronteira retornam booleanos corretos."]
      },
      {
        "prompt": "3. Escreva contar_concluidas(aulas) para uma lista de dicionários e teste lista vazia e uma aula concluída.",
        "hints": [
          "Use sum de 1 para cada item verdadeiro.",
          "Não modifique a lista recebida."
        ],
        "solution": "def contar_concluidas(aulas):\n    return sum(1 for aula in aulas if aula['concluida'])\n\nprint(contar_concluidas([]))\nprint(contar_concluidas([{'concluida': True}]))",
        "explanation": "A expressão geradora produz um 1 por item concluído; sum de coleção vazia é zero.",
        "expected": "0\n1",
        "criteria": ["Percorre lista de dicionários e conta concluidas.","Lista vazia e uma conclusão são testadas."]
      },
      {
        "prompt": "4. Faça resumo(numeros) devolver {'total': ..., 'quantidade': ...}. Para [2, 3, 5], mostre o dicionário e confirme que a lista continua igual.",
        "hints": [
          "Use sum e len.",
          "Não ordene nem remova itens da entrada."
        ],
        "solution": "def resumo(numeros):\n    return {'total': sum(numeros), 'quantidade': len(numeros)}\n\nentrada = [2, 3, 5]\nprint(resumo(entrada))\nprint(entrada)",
        "explanation": "O cálculo é puro em relação à lista; o resultado tem campos estáveis.",
        "expected": "{'total': 10, 'quantidade': 3}\n[2, 3, 5]",
        "criteria": ["Resumo contém total e quantidade calculados.","A função não altera a lista de entrada."]
      }
    ],
    "mistakes": [
      "print dentro da função não substitui return quando o resultado será reutilizado.",
      "Padrões mutáveis como lista=[] podem ser compartilhados entre chamadas.",
      "Uma variável local não fica disponível fora da função; passe informações por parâmetros e retornos.",
      "Atribuir aulas = [] dentro da função não limpa a lista do chamador, mas aulas.append altera o objeto compartilhado."
    ],
    "quiz": [
      {
        "question": "O que recebe uma variável ao chamar função sem return?",
        "options": [
          "False",
          "None",
          "String vazia"
        ],
        "correctIndex": 1,
        "explanation": "Sem return executado, o resultado é None."
      },
      {
        "question": "Por que evitar lista=[] como argumento padrão?",
        "options": [
          "Porque lista não existe",
          "Porque a mesma lista pode ser usada em chamadas futuras",
          "Porque apenas tuplas podem ser parâmetros"
        ],
        "correctIndex": 1,
        "explanation": "O objeto padrão é criado uma vez na definição e pode reter mudanças."
      },
      {
        "question": "Qual descrição representa o escopo de total dentro da função?",
        "options": [
          "Global por padrão",
          "Local à chamada",
          "Compartilhado com todos os módulos"
        ],
        "correctIndex": 1,
        "explanation": "total é um nome local criado durante a execução da função."
      }
    ],
    "summary": [
      "Uma função recebe argumentos, aplica uma regra e retorna um valor utilizável.",
      "Docstrings e testes deixam o contrato verificável.",
      "Separe cálculo de apresentação e observe efeitos sobre objetos mutáveis."
    ]
  },
"py-files": {
    "prerequisites": "Aulas anteriores: listas de dicionários, laços, funções e tipos.",
    "setup": "Execute aula05.py dentro da sua pasta python-estudos. O script cria apenas a subpasta laboratorio_py; você pode abrir os dois arquivos ali com um editor de texto. Não rode exercícios de escrita em uma pasta contendo arquivos importantes. Use uma pasta nova e nomes previsíveis. Execute de novo e observe que o modo w substitui o CSV e write_text substitui o JSON. Faça uma cópia de qualquer dado que queira preservar.",
    "why": "Persistir dados torna o programa útil após ser encerrado. Arquivos precisam de caminho, formato e codificação definidos. Em projetos de trabalho, um CSV pode alimentar uma planilha e um JSON pode transportar dados entre serviços. Esses formatos exigem tratamento de erros e não substituem uma base de dados com concorrência e transações.",
    "sections": [
      {
        "title": "Caminhos e ciclo do arquivo",
        "paragraphs": [
          "Path da biblioteca pathlib representa um caminho e permite combinar pasta / 'arquivo.txt'. Path('laboratorio_py') é relativo ao diretório atual do terminal, não necessariamente à localização do script. Confira Path.cwd() quando não encontrar um arquivo. Para usar sempre uma pasta ao lado do script, escolha Path(__file__).resolve().parent / 'laboratorio_py'. O exemplo usa caminho relativo para manter o laboratório visível no diretório de execução.",
          "pasta.mkdir(exist_ok=True) cria a pasta se não existe; um caminho existente que seja arquivo ainda causa erro. read_text e write_text fazem leitura/escrita completa em poucas linhas e aceitam encoding='utf-8'. Para arquivos grandes, prefira abrir e processar gradualmente. with caminho.open(...) as arquivo garante fechamento quando o bloco termina, inclusive se ocorrer uma exceção dentro dele.",
          "Modos comuns: 'r' lê, 'w' cria ou substitui, 'a' acrescenta e 'x' cria apenas se ainda não existe. 'w' é destrutivo para o conteúdo anterior: use um arquivo de laboratório e confira o modo antes de executar. Uma operação de escrita pode falhar por permissão ou espaço; no trabalho real, salvar dados importantes exige estratégia de recuperação e, frequentemente, escrita temporária seguida de substituição atômica."
        ]
      },
      {
        "title": "Texto, codificação e quebras",
        "paragraphs": [
          "Texto em memória é str; bytes são a representação codificada gravada. UTF-8 permite acentos e caracteres de muitas línguas, mas quem lê também precisa usar UTF-8. Se abrir com outra codificação, poderá ver caracteres incorretos ou UnicodeDecodeError. Declare encoding='utf-8' de forma explícita para que o mesmo script se comporte de modo previsível em diferentes sistemas.",
          "read_text(encoding='utf-8') devolve todo o conteúdo como str. Você pode usar splitlines() para separar linhas, mas não deve analisar CSV por split(','): campos podem conter vírgula, aspas e quebra de linha. Uma lista de compras com descrição 'arroz, integral' é um exemplo. Use a biblioteca csv, que implementa as regras de aspas e separação.",
          "No Windows, abra arquivos CSV com newline='' ao usar csv.writer ou DictWriter para deixar a biblioteca controlar quebras de linha sem linhas vazias extras. Um programa pode rodar em sistemas diferentes; não monte manualmente caminhos com barra invertida nem suponha que quebras de linha tenham o mesmo formato."
        ]
      },
      {
        "title": "JSON e CSV com esquemas",
        "paragraphs": [
          "json.dumps converte objetos Python compatíveis em texto JSON; json.loads converte texto JSON em valores Python. Listas, dicionários, strings, números, bool e None têm correspondentes usuais; objetos Path ou datetime não são convertidos diretamente sem regra adicional. ensure_ascii=False preserva acentos no arquivo UTF-8; indent=2 ajuda a leitura humana.",
          "JSON válido não significa dados adequados. json.loads('42') retorna inteiro 42, mas o nosso programa espera lista de registros. Valide isinstance(dados, list), cada item como dict, presença de 'titulo' e 'minutos' e tipos antes de calcular. JSONDecodeError indica sintaxe inválida; FileNotFoundError indica caminho inexistente. Separe esses casos em mensagens compreensíveis.",
          "CSV é tabular: cabeçalho titulo,minutos seguido de linhas. csv.DictWriter usa fieldnames para fixar ordem de colunas; writerows espera dicionários com essas chaves. Ao ler, csv.DictReader devolve strings, inclusive para minutos; converta com int e verifique valores não negativos. Diferencie arquivo malformado de valor de negócio inválido."
        ]
      },
      {
        "title": "Recuperação e evolução",
        "paragraphs": [
          "Um arquivo pode faltar na primeira execução. A aplicação pode iniciar com lista vazia, criar um exemplo ou informar ao usuário, conforme o contrato. Não capture todas as exceções e continue silenciosamente com dados inventados, pois isso esconde corrupção. Registre ou mostre qual arquivo falhou e se uma cópia de segurança está disponível.",
          "Mudanças de requisito exigem migração: se uma aula ganhar campo concluida, arquivos antigos não o terão. Defina um valor padrão só quando isso fizer sentido, documente a versão do formato e teste um arquivo antigo. Para projetos maiores, bancos de dados oferecem consultas, integridade e concorrência; estes arquivos servem para entender persistência e intercâmbio.",
          "Confirme o resultado do exemplo abrindo aulas.json e aulas.csv. As duas linhas devem conservar 'Introdução'. Edite uma duração no JSON e rode apenas a etapa de carregamento para conferir a soma. Depois coloque JSON inválido e observe a exceção; restaure o arquivo para concluir o laboratório."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# aula05.py; só cria arquivos dentro da pasta laboratorio_py\nfrom pathlib import Path\nimport csv\nimport json\n\npasta = Path(\"laboratorio_py\")\npasta.mkdir(exist_ok=True)\naulas = [\n    {\"titulo\": \"Introdução\", \"minutos\": 25},\n    {\"titulo\": \"Listas\", \"minutos\": 40},\n]\narquivo_json = pasta / \"aulas.json\"\narquivo_json.write_text(json.dumps(aulas, ensure_ascii=False, indent=2), encoding=\"utf-8\")\ncarregadas = json.loads(arquivo_json.read_text(encoding=\"utf-8\"))\nwith (pasta / \"aulas.csv\").open(\"w\", encoding=\"utf-8\", newline=\"\") as arquivo:\n    escritor = csv.DictWriter(arquivo, fieldnames=[\"titulo\", \"minutos\"])\n    escritor.writeheader()\n    escritor.writerows(carregadas)\nprint(f\"Aulas: {len(carregadas)}\")\nprint(f\"Minutos: {sum(a['minutos'] for a in carregadas)}\")\nprint(\"Arquivos criados na pasta laboratorio_py\")\n",
      "explanation": [
        "Path combina caminhos sem depender de separadores escritos à mão.",
        "UTF-8 e ensure_ascii=False conservam caracteres como ç e ã.",
        "CSV usa newline='' e DictWriter para um formato tabular consistente."
      ],
      "expected": "Aulas: 2\nMinutos: 65\nArquivos criados na pasta laboratorio_py"
    },
    "guided": [
      {
        "instruction": "Rode o script duas vezes e inspecione os arquivos.",
        "result": "O modo de escrita substitui o conteúdo anterior; não duplica as linhas."
      },
      {
        "instruction": "Mude o título Introdução para Revisão e verifique JSON e CSV.",
        "result": "Os dois arquivos passam a conter Revisão; a saída numérica permanece 65."
      },
      {
        "instruction": "Troque no JSON um número por string '25' e execute só a etapa de leitura e soma.",
        "result": "json.loads aceita a string, mas a soma falha; o programa deve validar tipos/converter de modo declarado."
      }
    ],
    "exercises": [
      {
        "prompt": "1. Grave 'Olá' em laboratorio_py/nota.txt usando UTF-8 e leia de volta.",
        "hints": [
          "Crie a pasta com mkdir(exist_ok=True).",
          "Use write_text e read_text com encoding."
        ],
        "solution": "from pathlib import Path\npasta = Path('laboratorio_py')\npasta.mkdir(exist_ok=True)\narquivo = pasta / 'nota.txt'\narquivo.write_text('Olá', encoding='utf-8')\nprint(arquivo.read_text(encoding='utf-8'))",
        "explanation": "O exemplo só altera um arquivo próprio do laboratório e preserva o acento.",
        "expected": "Olá",
        "criteria": ["Grava e lê o arquivo no diretório pedido.","Usa codificação UTF-8 e confirma o texto após a leitura."]
      },
      {
        "prompt": "2. Converta {'titulo':'Git','minutos':30} para JSON e de volta; imprima o título.",
        "hints": [
          "Use dumps e loads.",
          "O resultado volta como dicionário."
        ],
        "solution": "import json\ntexto = json.dumps({'titulo': 'Git', 'minutos': 30}, ensure_ascii=False)\ndados = json.loads(texto)\nprint(dados['titulo'])",
        "explanation": "A conversão de ida e volta mantém campos compatíveis.",
        "expected": "Git",
        "criteria": ["Serializa dicionário como JSON e recupera estrutura Python.","Acessa o título depois da conversão de volta."]
      },
      {
        "prompt": "3. Leia o CSV produzido no exemplo, converta minutos para int e imprima a soma.",
        "hints": [
          "Use csv.DictReader.",
          "Os campos lidos são strings."
        ],
        "solution": "from pathlib import Path\nimport csv\nwith (Path('laboratorio_py') / 'aulas.csv').open('r', encoding='utf-8', newline='') as arquivo:\n    linhas = list(csv.DictReader(arquivo))\nprint(sum(int(linha['minutos']) for linha in linhas))",
        "explanation": "O CSV precisa ter sido criado pelo exemplo antes deste exercício; a conversão evita concatenação de strings.",
        "expected": "65",
        "criteria": ["Lê linhas do CSV e converte minutos para inteiro.","Soma os registros lidos, sem contar cabeçalho."]
      },
      {
        "prompt": "4. Leia JSON criado no exemplo e aceite apenas uma lista; caso o arquivo contenha 42, mostre 'Formato inválido'.",
        "hints": [
          "Use json.loads sobre read_text.",
          "Confira isinstance(dados, list) antes de percorrer."
        ],
        "solution": "from pathlib import Path\nimport json\ncaminho = Path('laboratorio_py') / 'aulas.json'\ndados = json.loads(caminho.read_text(encoding='utf-8'))\nif not isinstance(dados, list):\n    print('Formato inválido')\nelse:\n    print(f'Aulas: {len(dados)}')",
        "explanation": "O JSON pode ser sintaticamente correto e ainda não cumprir o esquema do programa. Com o arquivo original, a saída é Aulas: 2; com conteúdo 42, é Formato inválido.",
        "expected": "Arquivo original: Aulas: 2\nArquivo contendo 42: Formato inválido",
        "criteria": ["Aceita apenas uma lista após carregar o JSON.","Arquivo numérico é recusado com mensagem, sem quebrar a execução."]
      }
    ],
    "mistakes": [
      "Abrir em modo w substitui o arquivo; confira caminho e modo antes de executar.",
      "json.loads valida sintaxe JSON, mas não garante uma lista de aulas com campos válidos.",
      "CSV lido com DictReader contém strings; converta números com validação.",
      "Path relativo depende do diretório de execução; consulte Path.cwd() ao investigar arquivos ausentes."
    ],
    "quiz": [
      {
        "question": "Qual chamada lê texto como UTF-8?",
        "options": [
          "read_text(encoding='utf-8')",
          "read_text(mode='w')",
          "str(Path)"
        ],
        "correctIndex": 0,
        "explanation": "A codificação é argumento de read_text."
      },
      {
        "question": "O que ocorre ao abrir um arquivo existente em modo w?",
        "options": [
          "Só lê",
          "Substitui conteúdo",
          "Mantém e acrescenta"
        ],
        "correctIndex": 1,
        "explanation": "O modo w trunca o conteúdo existente."
      },
      {
        "question": "json.loads('42') comprova que existe uma lista válida de aulas?",
        "options": [
          "Sim",
          "Não; devolve inteiro, e o esquema precisa ser validado",
          "Sempre lança JSONDecodeError"
        ],
        "correctIndex": 1,
        "explanation": "JSON sintaticamente válido pode não ter a forma exigida pelo programa."
      }
    ],
    "summary": [
      "Defina pasta, formato, codificação e modo de abertura antes da escrita.",
      "Use bibliotecas csv e json para formatos estruturados, com validação após a leitura.",
      "Teste arquivo ausente, conteúdo inválido e evolução do formato."
    ]
  },
"py-debug": {
    "prerequisites": "Aulas anteriores: funções, condições, tipos e coleções. A aula de exceções aprofundará try/except.",
    "setup": "Salve como aula06.py e execute com python aula06.py. A ordem e a formatação das linhas do unittest podem variar por versão; observe principalmente que aparecem três testes e OK. Também execute python -m unittest aula06.py; isso descobre a classe de testes sem executar o bloco __main__. Para depurar, provoque uma falha trocando o resultado esperado de 50 para 51, leia o traceback e depois restaure. Use breakpoint() apenas quando houver terminal interativo; n, s, p variavel e c são comandos do depurador pdb.",
    "why": "Desenvolvedores iniciantes gastam tempo investigando código existente e alterações de requisitos. Um teste que documenta a regra permite mudar uma função e descobrir rapidamente se um caso antes correto deixou de funcionar. Um traceback é evidência: aponta a chamada que falhou e a exceção, não uma ordem para apagar a linha.",
    "sections": [
      {
        "title": "Reproduzir antes de corrigir",
        "paragraphs": [
          "Um defeito começa com diferença entre resultado esperado e observado. Registre entrada, comando executado, saída e regra que determina o esperado. Por exemplo, percentual(5,4) não pode representar 125% de quatro aulas concluídas; deve falhar de modo claro. Não corrija um caso apenas porque um print parece estranho: formule o contrato e descubra onde é quebrado.",
          "O traceback mostra arquivo, números de linha, cadeia de chamadas e, ao final, o tipo e a mensagem de exceção. NameError sugere nome não definido, TypeError operação com tipo incompatível, ValueError valor incompatível com a operação e ZeroDivisionError divisão por zero. SyntaxError impede a execução; confira a própria linha e, às vezes, a anterior por aspas ou parênteses abertos.",
          "Reproduza com um caso mínimo, sem apagar todas as validações. A função de exemplo explicita o caso total==0 e os limites. O teste de tipo usa type(...) is int para rejeitar bool, pois isinstance(True, int) seria True em Python. Essa escolha pertence ao contrato: se bool for aceitável, a validação deve ser diferente."
        ]
      },
      {
        "title": "Testes como exemplos executáveis",
        "paragraphs": [
          "unittest faz parte da biblioteca padrão. Uma classe de teste herda unittest.TestCase; métodos cujo nome começa por test_ são descobertos. self.assertEqual compara resultado e esperado, gerando falha explicada. self.assertRaises(ValueError) verifica que uma chamada inválida lança a exceção prometida. Um teste deve ter objetivo específico para que uma falha seja fácil de entender.",
          "O caso vazio exige 0; metade exige 50; inválido exige ValueError. Acrescente casos 0 de 5, 5 de 5, 1 de 3 e tipos como '2'. Verifique também que a função não altera nenhuma entrada mutável se esse for o contrato. Testes não provam todos os casos possíveis: cobrem os exemplos e classes de entrada que você escolheu.",
          "O arredondamento nativo round usa regra de empate para o número par em alguns casos; por isso não prometa sempre arredondar .5 para cima. Em porcentagens mais exigentes, escolha e documente regra de arredondamento apropriada. O exemplo usa números inteiros de aulas, então as entradas aceitas estão bem delimitadas."
        ]
      },
      {
        "title": "Observar sem mascarar",
        "paragraphs": [
          "Use print temporário para conferir valores antes da linha que falha, ou breakpoint() para parar e examinar o estado com pdb. No ponto de parada, p total mostra o valor; n executa a próxima linha; s entra numa função; c continua. Remova pontos de parada antes de entregar o código. Se estiver num editor com depurador gráfico, observe o mesmo estado passo a passo.",
          "try/except pode transformar uma exceção prevista em mensagem apropriada, mas except Exception: pass esconde o problema. Capture uma exceção específica perto da fronteira em que ela pode ocorrer; por exemplo, ValueError ao converter uma entrada. Se o erro indica defeito interno, preserve o traceback e corrija a causa. Um teste que espera TypeError não deve ser satisfeito com uma função que lança TypeError para qualquer entrada.",
          "Não imprima segredos e dados pessoais para depurar serviços reais. Neste laboratório usamos somente dados fictícios. Ao receber um bug de outro usuário, procure reproduzir com um caso anonimizado e descreva passos para que outra pessoa consiga verificar a correção."
        ]
      },
      {
        "title": "Regressão e mudança de requisito",
        "paragraphs": [
          "O ciclo é: escreva um teste que falha pelo motivo certo, faça a menor correção, execute o teste novamente e rode os testes relacionados. Se o requisito mudar, atualize primeiro os exemplos esperados. Uma regra nova como permitir percentuais acima de 100 tem impacto nos testes de validação; documente a decisão antes de alterar o código.",
          "Testar apenas o caminho feliz é insuficiente. Monte uma tabela mental ou escrita: vazio, mínimo, máximo, um abaixo, um acima, tipo incorreto e formato válido mas valor inválido. Para percentual, zero de zero, zero de cinco, cinco de cinco, seis de cinco e string '2' representam classes distintas. Um conjunto pequeno e bem escolhido encontra mais defeitos do que muitas cópias do mesmo caso.",
          "Quando um teste falhar, confira três hipóteses: o código viola a regra; a expectativa do teste está errada; ou o contrato não especifica o caso. Explique qual delas encontrou. O objetivo é compreender e manter comportamento, não aumentar artificialmente a contagem de testes aprovados."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# aula06.py\nimport unittest\n\n\ndef percentual(concluidas, total):\n    \"\"\"Inteiros 0 \u003c= concluidas \u003c= total; total zero retorna zero.\"\"\"\n    if type(concluidas) is not int or type(total) is not int:\n        raise TypeError(\"Use quantidades inteiras\")\n    if total \u003c 0 or concluidas \u003c 0 or concluidas > total:\n        raise ValueError(\"Quantidades fora dos limites\")\n    return 0 if total == 0 else round(100 * concluidas / total)\n\n\nclass TestePercentual(unittest.TestCase):\n    def test_vazio(self):\n        self.assertEqual(percentual(0, 0), 0)\n\n    def test_metade(self):\n        self.assertEqual(percentual(2, 4), 50)\n\n    def test_invalido(self):\n        with self.assertRaises(ValueError):\n            percentual(5, 4)\n\n\nif __name__ == \"__main__\":\n    unittest.main(verbosity=2)\n",
      "explanation": [
        "A função verifica tipos e limites antes de dividir, para distinguir falhas de entrada.",
        "unittest descobre test_vazio, test_metade e test_invalido.",
        "O bloco __main__ permite importar a função sem executar testes automaticamente."
      ],
      "expected": "Três testes executados; OK (a formatação e ordem das linhas variam entre versões)."
    },
    "guided": [
      {
        "instruction": "Troque 50 por 51 no teste da metade. Leia o motivo da falha.",
        "result": "assertEqual mostra que 50 != 51; o código cumpriu a regra, mas a expectativa foi alterada incorretamente."
      },
      {
        "instruction": "Adicione assertEqual(percentual(5,5),100) e execute.",
        "result": "O caso do limite exato passa e produz 100."
      },
      {
        "instruction": "Experimente percentual(True, 1). Por que existe uma verificação de tipo explícita?",
        "result": "bool é subtipo de int para isinstance; type(... ) is int rejeita True por contrato."
      }
    ],
    "exercises": [
      {
        "prompt": "1. Faça assert percentual(0, 0) == 0 e assert percentual(2, 4) == 50 após copiar a função do exemplo.",
        "hints": [
          "Copie a definição da função, não só as chamadas.",
          "assert não imprime nada quando passa."
        ],
        "solution": "# Depois de copiar a função percentual do exemplo:\nassert percentual(0, 0) == 0\nassert percentual(2, 4) == 50\nprint('Dois casos passaram')",
        "explanation": "Se as duas condições forem verdadeiras, os asserts não interrompem e a mensagem aparece.",
        "expected": "Dois casos passaram",
        "criteria": ["Asserções cobrem entrada vazia e cálculo normal.","Saída confirma ambos os casos sem desativar assert."]
      },
      {
        "prompt": "2. Acrescente a unittest um teste para percentual(5,5)==100.",
        "hints": [
          "O método deve começar por test_.",
          "Use self.assertEqual."
        ],
        "solution": "def test_limite(self):\n    self.assertEqual(percentual(5, 5), 100)",
        "explanation": "Cole o método dentro de TestePercentual; na execução, deve aparecer um quarto teste e OK.",
        "expected": "Quatro testes; OK",
        "criteria": ["Teste adicional cobre resultado no limite superior.","unittest informa a quantidade e ausência de falhas."]
      },
      {
        "prompt": "3. Verifique que percentual('2',4) lança TypeError.",
        "hints": [
          "Use self.assertRaises(TypeError).",
          "A chamada deve estar dentro do bloco with."
        ],
        "solution": "def test_tipo(self):\n    with self.assertRaises(TypeError):\n        percentual('2', 4)",
        "explanation": "Cole dentro da classe; o tipo de exceção faz parte do contrato. Cinco testes após os anteriores.",
        "expected": "Teste passa quando TypeError é lançado",
        "criteria": ["Teste verifica a exceção para tipo incompatível.","Passa apenas quando TypeError é lançado."]
      },
      {
        "prompt": "4. Crie uma tabela de casos para a função: (0,5)->0, (5,5)->100 e (6,5)->ValueError; implemente em unittest com subTest.",
        "hints": [
          "Separe válidos de inválidos.",
          "Use subTest para identificar qual par falhou."
        ],
        "solution": "def test_fronteiras(self):\n    for concluidas, total, esperado in [(0, 5, 0), (5, 5, 100)]:\n        with self.subTest(concluidas=concluidas, total=total):\n            self.assertEqual(percentual(concluidas, total), esperado)\n    with self.assertRaises(ValueError):\n        percentual(6, 5)",
        "explanation": "Cole dentro da classe; os subtests documentam fronteiras independentes e a exceção cobre o valor acima do total.",
        "expected": "Teste passa para 0%, 100% e entrada inválida",
        "criteria": ["subTest cobre três entradas, inclusive valor além da meta.","Implementação retorna os valores válidos e rejeita o caso inválido."]
      }
    ],
    "mistakes": [
      "Uma exceção não é uma instrução para apagar a linha: leia o último tipo, o local e as chamadas anteriores.",
      "except Exception: pass mascara tanto entradas ruins quanto defeitos internos.",
      "assert em código de produção não substitui validação obrigatória; pode ser desativado.",
      "Um teste que passa não prova ausência de defeitos fora das entradas testadas."
    ],
    "quiz": [
      {
        "question": "Qual teste verifica erro previsto?",
        "options": [
          "assertRaises(ValueError)",
          "assertEqual(ValueError, True)",
          "print(ValueError)"
        ],
        "correctIndex": 0,
        "explanation": "assertRaises comprova que a chamada lança a exceção especificada."
      },
      {
        "question": "Por que testar total==0 antes de dividir?",
        "options": [
          "Para arredondar mais rápido",
          "Para cumprir contrato e evitar divisão por zero",
          "Para converter texto"
        ],
        "correctIndex": 1,
        "explanation": "O caso vazio foi definido como 0 e não deve chegar à divisão."
      },
      {
        "question": "O que indica um teste de regressão?",
        "options": [
          "Uma cópia sem expectativa",
          "Um caso antes correto que deve continuar correto após mudança",
          "Um programa sempre sem exceções"
        ],
        "correctIndex": 1,
        "explanation": "Regressão protege comportamento já estabelecido quando o código evolui."
      }
    ],
    "summary": [
      "Reproduza defeitos com entrada, regra, saída observada e resultado esperado.",
      "Leia tracebacks e use depurador para confirmar estado em vez de adivinhar.",
      "Mantenha testes de casos vazios, limites, tipos e erros ao modificar a função."
    ]
  },
"py-oop": {
    "prerequisites": "Funções, listas e dicionários das aulas básicas; saber chamar métodos e ler uma exceção.",
    "setup": "Crie poo.py com o exemplo e execute python poo.py (ou py poo.py no Windows). Use Python 3. O exercício não precisa de bibliotecas externas.",
    "why": "Imagine duas pessoas construindo planos de estudo. Um dicionário solto pode guardar nome e sessões, mas cada trecho do programa teria que repetir as regras de validação e soma. Uma classe pode representar esse conceito e centralizar as operações que fazem sentido para ele. Isso é útil quando o estado e as regras evoluem juntos.",
    "sections": [
      {
        "title": "Objeto, classe e instância",
        "paragraphs": [
          "Uma classe descreve como criar objetos. Cada chamada Plano(\"Ana\") constrói uma instância distinta. O método __init__ recebe a instância recém-criada em self e inicializa seus atributos. Ao chamar plano.total_minutos(), Python fornece plano como primeiro argumento do método. self é apenas a convenção de nome mais clara; a ligação da chamada é o fato importante.",
          "Um atributo de instância, como self._sessoes, é criado para cada objeto. Se você colocasse sessoes = [] no corpo da classe e não substituísse o atributo em cada instância, a mesma lista mutável poderia ser compartilhada por todos. Esse defeito aparece quando adicionar uma sessão ao plano de Ana modifica o relatório de Bia. Experimente criar duas instâncias e observar seus totais separados.",
          "Nem tudo precisa virar classe. Se a tarefa é converter minutos em horas sem guardar estado, uma função simples é mais fácil de testar. Use classe quando há uma entidade com estado e operações relacionadas, ou quando vários objetos precisam obedecer às mesmas regras. A escolha deve ajudar a leitura, não apenas introduzir uma palavra nova."
        ]
      },
      {
        "title": "Regras e encapsulamento prático",
        "paragraphs": [
          "A classe Sessao rejeita tema vazio e duração não positiva ao ser criada. Essa regra é uma invariante: todo objeto válido deve satisfazê-la. Plano.adicionar verifica o tipo recebido para evitar que total_minutos falhe bem mais tarde. A mensagem de erro deve explicar a entrada que viola o contrato; não converta silenciosamente uma sessão inválida em duração zero.",
          "O sublinhado em _sessoes sinaliza ao leitor que a lista faz parte da implementação interna. Em Python, isso não impede tecnicamente o acesso. Encapsular significa oferecer métodos estáveis e orientar o uso correto; não significa esconder segredos nem proteger um sistema contra código hostil dentro do mesmo processo. Se devolver uma coleção ao chamador, considere uma cópia ou uma tupla para evitar mudanças inesperadas.",
          "Pense na diferença entre atribuir diretamente plano._sessoes = [...] e chamar plano.adicionar(sessao). O primeiro caminho ignora a regra de tipo; o segundo mantém o contrato. A API pública da classe deve ter nomes que expressem ações do domínio. Valores de dados sem comportamento complexo podem ser representados por uma dataclass, mas os mesmos cuidados com campos mutáveis e validação continuam."
        ]
      },
      {
        "title": "Composição e herança",
        "paragraphs": [
          "Plano contém sessões: essa é uma relação de composição. Sessao não é um tipo de Plano e Plano não é um tipo de Sessao. Objetos colaboram quando um recebe ou guarda o outro. Essa divisão permite modificar a forma de calcular um relatório sem mudar a construção de cada sessão. Também facilita criar sessões de teste para verificar o plano.",
          "Herança descreve um objeto que é uma especialização coerente de outro. Por exemplo, uma classe de notificação por email pode implementar a interface de um tipo abstrato Notificador. Antes de herdar apenas para reaproveitar algumas linhas, considere injetar um colaborador ou extrair uma função. Hierarquias profundas tornam as dependências menos visíveis para quem está aprendendo.",
          "Uma dataclass gera métodos comuns como __init__ e __repr__ para dados, mas não substitui uma decisão de modelagem. Uma classe regular com métodos explícitos pode ensinar melhor onde a regra vive. Para sistemas pequenos, comece com poucos objetos, escreva um caso de uso funcionando e só então separe responsabilidades que realmente precisam mudar de forma independente."
        ]
      },
      {
        "title": "Avaliar a modelagem com casos concretos",
        "paragraphs": [
          "Rode o exemplo e confirme que Ana soma 60 minutos e Bia começa com zero. Em seguida, construa outra Sessao, adicione apenas ao plano de Bia e repita as duas consultas. Se o total de Ana mudar, algum estado está compartilhado indevidamente. Esse teste pequeno é mais informativo do que verificar apenas que a classe existe.",
          "Teste entradas inválidas: tema com espaços, zero minutos e um texto no lugar de Sessao. Observe o tipo de exceção lançado em cada ponto. A validação de tipo de minutos poderia ser mais rigorosa para recusar texto e booleanos; esse refinamento deve ser guiado pelo contrato do projeto. Em programas reais, descreva quais tipos de dados a camada de entrada entrega à classe.",
          "Por fim, explique em uma frase por que Plano e Sessao são classes separadas. Se a explicação depender só de 'organizar o arquivo', reveja o modelo. Uma boa justificativa cita estado, regras e relações. A competência buscada é conseguir escolher uma representação e depois verificar que os objetos não interferem indevidamente entre si.",
          "Considere uma mudança de requisito: cada sessão pode ter um campo concluida. Antes de editar, decida se a responsabilidade de contar as concluídas pertence a Sessao ou Plano. Sessao sabe seu próprio estado; Plano percorre as sessões e agrega. Essa pergunta revela onde colocar um método novo. Se um método precisa examinar toda a coleção, ele provavelmente pertence ao plano. Se altera apenas a própria sessão, pode pertencer à sessão.",
          "Outro teste de qualidade é substituir a implementação interna sem alterar os consumidores. Você pode trocar a lista de _sessoes por outra coleção e preservar adicionar, total_minutos e quantidade_sessoes. Se todo código externo acessa diretamente _sessoes, a alteração quebra vários lugares. A interface pública pequena reduz esse custo. No portfólio, descreva por que escolheu composição e mostre uma alteração de regra que exigiu editar apenas a classe responsável."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "class Sessao:\n    def __init__(self, tema, minutos):\n        if not tema.strip() or minutos \u003c= 0:\n            raise ValueError(\"Tema e duração precisam ser válidos\")\n        self.tema = tema.strip()\n        self.minutos = minutos\n\n\nclass Plano:\n    def __init__(self, nome):\n        self.nome = nome\n        self._sessoes = []\n\n    def adicionar(self, sessao):\n        if not isinstance(sessao, Sessao):\n            raise TypeError(\"Esperada uma Sessao\")\n        self._sessoes.append(sessao)\n\n    def total_minutos(self):\n        return sum(sessao.minutos for sessao in self._sessoes)\n\n\nplano = Plano(\"Ana\")\nplano.adicionar(Sessao(\"POO\", 40))\nplano.adicionar(Sessao(\"Testes\", 20))\nprint(plano.nome, plano.total_minutos())\nprint(Plano(\"Bia\").total_minutos())",
      "explanation": [
        "Sessao mantém tema e minutos válidos desde a criação.",
        "Plano possui uma lista por instância e delega a leitura da duração a cada Sessao.",
        "O relatório de Bia demonstra que o estado não foi compartilhado."
      ],
      "expected": "Ana 60; em outra linha, 0."
    },
    "guided": [
      {
        "instruction": "Crie poo.py com as duas classes e rode o arquivo. Registre a saída antes de consultar a resposta.",
        "result": "Ana 60 e depois 0."
      },
      {
        "instruction": "Adicione Sessao('Leitura', 15) somente ao plano de Bia e imprima os dois totais.",
        "result": "Ana permanece com 60; Bia passa a 15."
      },
      {
        "instruction": "Troque 15 por 0. Localize a linha que rejeita o objeto e explique por que isso ocorre cedo.",
        "result": "ValueError ao construir a Sessao; nenhum plano recebe dado inválido."
      }
    ],
    "exercises": [
      {
        "prompt": "Previsão: se eu criar dois Plano sem adicionar sessões, qual é o total de cada um? O que mudaria se a lista fosse atributo mutável de classe?",
        "hints": [
          "__init__ executa para cada nova instância.",
          "Uma lista definida no corpo da classe pode ser compartilhada."
        ],
        "solution": "print(Plano('A').total_minutos(), Plano('B').total_minutos())",
        "explanation": "Ambos começam com listas próprias vazias; com uma lista de classe compartilhada, mudanças feitas em um poderiam aparecer no outro.",
        "expected": "A previsão é registrada antes de criar os objetos; o teste permite verificar isolamento entre instâncias e o risco de estado mutável compartilhado.",
        "criteria": ["Registra previsão para objetos independentes antes de instanciá-los.","Explica o risco de uma lista mutável compartilhada pela classe."]
      },
      {
        "prompt": "Modifique Plano para expor quantidade_sessoes() e teste planos independentes.",
        "hints": [
          "Use len na lista interna.",
          "Adicione o método dentro da classe, com self."
        ],
        "solution": "def quantidade_sessoes(self):\n    return len(self._sessoes)",
        "explanation": "Um método de consulta usa o estado interno sem devolver a lista mutável; confira 2 para Ana e 0 para Bia no exemplo.",
        "expected": "2 para Ana e 0 para Bia.",
        "criteria": ["Método calcula quantidade por instância.","Plano de Ana e de Bia permanece independente."]
      },
      {
        "prompt": "Crie remover_ultima() que rejeita plano vazio com ValueError e devolve a Sessao removida.",
        "hints": [
          "Consulte a lista antes de pop().",
          "Não devolva None em silêncio no caso vazio."
        ],
        "solution": "def remover_ultima(self):\n    if not self._sessoes:\n        raise ValueError('Plano vazio')\n    return self._sessoes.pop()",
        "explanation": "A operação expressa uma regra do plano; o chamador decide como apresentar a falha ao usuário.",
        "expected": "Remover de Ana devolve Testes; novo total é 40. Remover de plano vazio lança ValueError.",
        "criteria": ["Remoção devolve a sessão retirada e atualiza o total.","Plano vazio gera ValueError sem estado inconsistente."]
      },
      {
        "prompt": "Modele um resumo(nome, total, quantidade) sem permitir que o chamador altere _sessoes pelo retorno. Justifique por que não precisa de herança.",
        "hints": [
          "Devolva valores simples ou um novo dicionário.",
          "Plano contém Sessao; um não especializa o outro."
        ],
        "solution": "def resumo(self):\n    return {'nome': self.nome, 'total': self.total_minutos(), 'quantidade': len(self._sessoes)}",
        "explanation": "O dicionário é uma nova estrutura de relatório. Alterá-lo não altera automaticamente a lista de sessões do plano.",
        "expected": "Para Ana antes da remoção: {'nome': 'Ana', 'total': 60, 'quantidade': 2}.",
        "criteria": ["Resumo expõe somente valores derivados e não dá acesso mutável à lista interna.","A solução usa composição e justifica por que herança não acrescenta valor."]
      }
    ],
    "mistakes": [
      "Criar uma lista mutável como atributo de classe e compartilhar estado sem querer.",
      "Tratar o sublinhado de _sessoes como mecanismo de segurança; ele é convenção.",
      "Aplicar herança apenas para reutilizar código, sem relação de especialização.",
      "Validar tarde e deixar objeto parcialmente inválido circular pelo programa."
    ],
    "quiz": [
      {
        "question": "Onde deve ficar a lista de sessões que pertence a cada plano?",
        "options": [
          "Em self._sessoes inicializada em __init__",
          "Como lista mutável no corpo da classe",
          "Em variável global"
        ],
        "correctIndex": 0,
        "explanation": "O construtor cria uma lista para cada instância."
      },
      {
        "question": "O que expressa a relação entre Plano e Sessao?",
        "options": [
          "Herança",
          "Composição",
          "Uma conversão de tipo"
        ],
        "correctIndex": 1,
        "explanation": "O plano contém sessões; não é uma especialização de sessão."
      },
      {
        "question": "O sublinhado em _sessoes garante que nenhum código externo a altere?",
        "options": [
          "Sim, o interpretador bloqueia",
          "Sim, após instalar pacote",
          "Não; é uma convenção de uso interno"
        ],
        "correctIndex": 2,
        "explanation": "Python permite acesso; a interface pública comunica o contrato."
      }
    ],
    "summary": [
      "Instâncias têm estado próprio quando atributos mutáveis são criados em __init__.",
      "Métodos preservam regras; exceções indicam contratos violados.",
      "Composição representa colaboração entre tipos diferentes.",
      "Classes são uma escolha de modelagem, não uma obrigação para toda função."
    ]
  },
"py-errors": {
    "prerequisites": "Funções, condicionais e int(); saber ler o traceback básico de Python.",
    "setup": "Salve como erros.py e execute python erros.py. Não há instalação ou conexão externa. Para observar uma falha não tratada, remova temporariamente o try/except do laço.",
    "why": "Um programa real recebe texto imprevisível, arquivos ausentes e respostas de serviços que falham. Uma exceção é um sinal explícito de que a operação não cumpriu seu contrato. O objetivo não é impedir toda mensagem de erro, mas transformar falhas esperadas em respostas úteis sem esconder defeitos que precisam ser corrigidos.",
    "sections": [
      {
        "title": "Identificar a origem antes de tratar",
        "paragraphs": [
          "SyntaxError surge antes de executar o trecho afetado: confira aspas, parênteses e indentação. ValueError, KeyError e ZeroDivisionError são exemplos de exceções em tempo de execução. Leia o traceback de baixo para cima para achar o tipo, a mensagem e a linha onde ocorreu; depois suba para entender quem chamou aquela função.",
          "Uma função deve ter contrato claro. ler_pontuacao aceita texto que representa um inteiro entre 0 e 100; para outros valores lança PontuacaoInvalida. Se você retornar zero em caso de erro, uma entrada inválida se torna indistinguível de uma nota válida zero. Esse erro silencioso contamina cálculos posteriores e é mais difícil de diagnosticar.",
          "Nem toda exceção merece um tratamento local. Se o método não tem como corrigir uma leitura de arquivo ou responder ao usuário, deixe o erro subir até uma camada que conheça o contexto. Um bloco try enorme que envolve o programa todo dificulta descobrir qual operação falhou."
        ]
      },
      {
        "title": "Blocos try, except, else e finally",
        "paragraphs": [
          "O corpo de try contém a operação que pode falhar. except ValueError as erro captura apenas esse tipo e suas subclasses. Na conversão com int, isso é apropriado. Capturar Exception em todo lugar poderia também ocultar um NameError causado por variável escrita incorretamente; except: é ainda mais abrangente e pode interceptar sinais que não devem ser tratados como entrada inválida.",
          "else executa quando o try termina sem exceção. No exemplo, ele concentra a regra de intervalo após a conversão ter funcionado. É opcional, mas ajuda a não misturar a conversão que pode gerar ValueError com outras operações que talvez gerem o mesmo tipo por outra razão. Uma alternativa igualmente legível é retornar após o bloco try/except.",
          "finally executa ao sair do try, havendo ou não erro; serve para limpeza que não pode esperar. Para arquivos, prefira with open(...) as arquivo, que fecha automaticamente mesmo se ocorrer exceção. Não coloque return no finally: isso pode mascarar um erro ou substituir o retorno que a função deveria produzir."
        ]
      },
      {
        "title": "Mensagens e cadeia de causas",
        "paragraphs": [
          "A classe PontuacaoInvalida especializa ValueError e permite à camada de apresentação reconhecer essa falha do domínio. raise ... from erro preserva explicitamente a causa de conversão para investigação. A tela pode mostrar apenas 'Use um número inteiro', enquanto o traceback de desenvolvimento ainda informa que int('abc') falhou.",
          "Ao converter uma exceção, mantenha uma mensagem que diga o que fazer ou qual regra foi violada. 'Algo deu errado' informa pouco. Também não revele senha, token ou dados sensíveis no texto de exceção. Para logs, registre contexto suficiente para reproduzir o problema, sem despejar o conteúdo inteiro de arquivos ou respostas privadas.",
          "Escolha entre lançar ValueError existente e criar classe própria conforme a necessidade do chamador. Uma classe customizada faz sentido quando há uma reação específica. Em script pequeno, tipos padrão e mensagens boas costumam bastar. A decisão depende do contrato observável, não de preferência estética."
        ]
      },
      {
        "title": "Testar caminhos normais e falhas",
        "paragraphs": [
          "Rode os três casos do exemplo. A entrada 85 produz número; abc gera erro de formato; 120 gera erro de intervalo. Agora experimente -1, 0, 100 e 101. Esses valores de fronteira mostram se a comparação está correta. Não basta testar um caso feliz para afirmar que a validação funciona.",
          "Para observar a cadeia de causas, chame ler_pontuacao('abc') fora do bloco que captura e leia o traceback; depois restaure o código. Um sistema em produção teria uma camada que transforma PontuacaoInvalida em mensagem ao usuário e registra a causa para manutenção. O domínio continua independente da interface.",
          "Escreva um teste que verifica tanto o tipo quanto a mensagem aproximada. Se um refactor passar a capturar todo erro como PontuacaoInvalida, o teste de um defeito de programação pode revelar a perda de informação. Tratar exceções bem é preservar a diferença entre dado ruim, recurso indisponível e bug no próprio código.",
          "Uma regra operacional importante é não capturar uma exceção apenas para imprimir e continuar como se tudo tivesse funcionado. Imagine importar dez linhas de pontuação: você pode optar por rejeitar o arquivo inteiro na primeira linha inválida, ou acumular erros com número da linha e continuar. Ambas as políticas são defensáveis, mas precisam ser explícitas. Um retorno parcial sem aviso surpreende quem depende do total. Decida o contrato antes do laço e teste exatamente esse comportamento.",
          "Ao abrir arquivo, usar requests ou gravar dados, o ponto de recuperação também importa. Uma camada de apresentação pode oferecer 'tente novamente' para timeout, mas um cálculo interno não sabe se a operação é segura para repetir. A decisão de retry precisa considerar efeitos colaterais e idempotência. Nesta etapa, concentre-se em propagar a causa correta e mostrar uma mensagem honesta; adicionar repetição automática sem critérios claros pode duplicar uma ação."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "class PontuacaoInvalida(ValueError):\n    pass\n\n\ndef ler_pontuacao(texto):\n    try:\n        valor = int(texto)\n    except ValueError as erro:\n        raise PontuacaoInvalida(\"Use um número inteiro\") from erro\n    else:\n        if not 0 \u003c= valor \u003c= 100:\n            raise PontuacaoInvalida(\"Pontuação fora de 0 a 100\")\n        return valor\n\n\nfor entrada in (\"85\", \"abc\", \"120\"):\n    try:\n        print(entrada, ler_pontuacao(entrada))\n    except PontuacaoInvalida as erro:\n        print(entrada, \"erro:\", erro)",
      "explanation": [
        "A subclasse identifica a falha esperada de pontuação.",
        "A conversão preserva ValueError como causa, mas oferece mensagem de domínio.",
        "O laço trata apenas PontuacaoInvalida e segue para a próxima entrada."
      ],
      "expected": "85 85; abc erro: Use um número inteiro; 120 erro: Pontuação fora de 0 a 100."
    },
    "guided": [
      {
        "instruction": "Rode as três entradas e anote a diferença entre erro de formato e de intervalo.",
        "result": "85 é aceito; abc e 120 têm mensagens distintas."
      },
      {
        "instruction": "Acrescente os limites 0, 100, -1, 101 no laço.",
        "result": "0 e 100 passam; -1 e 101 falham no intervalo."
      },
      {
        "instruction": "Chame ler_pontuacao('abc') sem captura e identifique ValueError como causa no traceback.",
        "result": "A cadeia mostra ValueError original e PontuacaoInvalida final."
      }
    ],
    "exercises": [
      {
        "prompt": "Preveja os resultados para '0', '100', '-1' e '101' sem executar; depois confira.",
        "hints": [
          "O intervalo é inclusivo.",
          "A conversão int funciona para todos esses textos."
        ],
        "solution": "for x in ('0', '100', '-1', '101'):\n    try:\n        print(x, ler_pontuacao(x))\n    except PontuacaoInvalida as erro:\n        print(x, type(erro).__name__)",
        "explanation": "Os valores dos extremos pertencem ao contrato, os imediatamente exteriores não.",
        "expected": "A previsão para cada entrada é anotada antes da execução; o resultado observado permite avaliar a regra de domínio.",
        "criteria": ["Previsões para os quatro limites são registradas antes de executar.","Resultado observado diferencia entradas aceitas das exceções de domínio."]
      },
      {
        "prompt": "Escreva ler_percentual(texto), aceitando inteiro de 0 a 100 com mensagem específica para formato inválido.",
        "hints": [
          "Separe conversão e intervalo.",
          "Use ValueError no except, não except genérico."
        ],
        "solution": "def ler_percentual(texto):\n    try:\n        valor = int(texto)\n    except ValueError as erro:\n        raise ValueError('Percentual deve ser inteiro') from erro\n    if not 0 \u003c= valor \u003c= 100:\n        raise ValueError('Percentual fora do intervalo')\n    return valor",
        "explanation": "A camada chamadora pode distinguir sucesso de falha sem confundir texto inválido com zero.",
        "expected": "ler_percentual('35') == 35; 'x' e '101' lançam ValueError com mensagens diferentes.",
        "criteria": ["Converte texto para inteiro e valida intervalo.","Formato inválido e faixa inválida comunicam motivos distintos."]
      },
      {
        "prompt": "Leia um arquivo de texto de forma que ele seja fechado mesmo se a conversão de uma linha falhar. Explique onde tratar FileNotFoundError.",
        "hints": [
          "Use with open(..., encoding='utf-8').",
          "A função de leitura pode propagar arquivo ausente para a interface."
        ],
        "solution": "def somar_linhas(caminho):\n    with open(caminho, encoding='utf-8') as arquivo:\n        return sum(int(linha.strip()) for linha in arquivo if linha.strip())",
        "explanation": "with cuida da limpeza. Uma tela ou comando pode capturar FileNotFoundError para mostrar o caminho; não substitua todo erro por zero.",
        "expected": "Arquivo com linhas 3 e 4 produz 7; arquivo ausente propaga FileNotFoundError.",
        "criteria": ["Gerenciador de contexto fecha arquivo mesmo se conversão falhar.","FileNotFoundError é tratado no limite apropriado, sem ocultar causa."]
      },
      {
        "prompt": "Crie uma falha de domínio para duração negativa e um teste que confirme a causa original de uma conversão inválida.",
        "hints": [
          "Use uma subclasse de ValueError.",
          "A propriedade __cause__ aponta para o erro original quando há raise ... from."
        ],
        "solution": "class DuracaoInvalida(ValueError):\n    pass\n\ndef duracao(texto):\n    try:\n        valor = int(texto)\n    except ValueError as erro:\n        raise DuracaoInvalida('Duração precisa ser inteira') from erro\n    if valor \u003c 0:\n        raise DuracaoInvalida('Duração negativa')\n    return valor",
        "explanation": "O contrato distingue formato e intervalo e conserva a causa da conversão. Teste int válido, texto e número negativo.",
        "expected": "duracao('4') == 4; duracao('x').__cause__ é ValueError em uma captura; '-2' gera DuracaoInvalida.",
        "criteria": ["Converte entrada válida e lança erro de domínio para duração negativa.","Exceção de conversão mantém ValueError como causa encadeada."]
      }
    ],
    "mistakes": [
      "Capturar Exception ou usar except: sem saber qual falha ocorreu.",
      "Retornar valor aparentemente válido para ocultar dado inválido.",
      "Colocar return em finally e perder uma exceção anterior.",
      "Fechar arquivo manualmente apenas no caminho de sucesso."
    ],
    "quiz": [
      {
        "question": "Em que situação finally executa?",
        "options": [
          "Só quando há erro",
          "Ao sair do try, com ou sem exceção",
          "Só quando existe return"
        ],
        "correctIndex": 1,
        "explanation": "finally é apropriado para limpeza inevitável; with é preferível para arquivos."
      },
      {
        "question": "Por que capturar ValueError da conversão em vez de Exception no programa inteiro?",
        "options": [
          "Para esconder qualquer bug",
          "Porque é a falha específica prevista naquela operação",
          "Porque Exception não existe"
        ],
        "correctIndex": 1,
        "explanation": "Captura restrita mantém defeitos inesperados visíveis."
      },
      {
        "question": "O que raise NovaFalha(...) from erro preserva?",
        "options": [
          "A causa original no encadeamento",
          "A execução sem erro",
          "Um arquivo automaticamente"
        ],
        "correctIndex": 0,
        "explanation": "O traceback mantém a relação entre exceção nova e anterior."
      }
    ],
    "summary": [
      "Exceção comunica uma operação que não cumpriu o contrato.",
      "Trate apenas falhas que a camada consegue recuperar ou apresentar.",
      "Preserve causa e mensagem útil; use with para recursos.",
      "Teste fronteiras e caminhos de erro, não somente o caso feliz."
    ]
  },
"py-modules": {
    "prerequisites": "Funções, arquivos .py e uso do terminal. Os exercícios de dois arquivos dependem da pasta de execução.",
    "setup": "Crie uma pasta modulo-estudos. Separe o exemplo em regras.py e app.py exatamente no comentário; não cole os dois blocos em um só arquivo. Entre nessa pasta e execute python app.py. Depois rode python -c \"import regras\" para observar que o import não imprime saída.",
    "why": "Projetos crescem quando a mesma regra é usada no terminal, numa interface e num teste. Copiar a função para três arquivos cria três lugares para corrigir o mesmo bug. Módulos permitem definir a regra uma vez e importá-la onde for necessária. A forma dos arquivos também comunica ao futuro colega onde encontrar e testar cada responsabilidade.",
    "sections": [
      {
        "title": "O que acontece ao importar",
        "paragraphs": [
          "Um arquivo regras.py é um módulo chamado regras. from regras import percentual torna o nome percentual disponível em app.py. Também é possível escrever import regras e depois regras.percentual(...), o que deixa a origem do nome visível. Escolha uma forma consistente e evite import *: ele esconde quais nomes chegaram ao arquivo e pode criar colisões.",
          "Quando um módulo é importado pela primeira vez em um processo, Python executa seu corpo para criar funções, classes e valores. Por isso, um print no topo de regras.py aparece ao importar. Mais grave, uma chamada de API, leitura de arquivo ou alteração de estado nesse ponto pode produzir efeitos inesperados em testes. Coloque a demonstração ou rotina de comando dentro de main e proteja a chamada com if __name__ == '__main__'.",
          "O import procura o módulo conforme o caminho de busca do Python, incluindo o diretório de execução e pacotes instalados. Um arquivo local chamado json.py ou requests.py pode sombrear uma biblioteca com mesmo nome. Se o import falhar ou apontar para o arquivo errado, confira nome, pasta atual, ambiente ativo e `modulo.__file__` antes de instalar qualquer coisa."
        ]
      },
      {
        "title": "Pontos de entrada e separação de responsabilidades",
        "paragraphs": [
          "O bloco do exemplo precisa ser salvo em dois arquivos porque o comentário 'salve como' é instrução, não sintaxe que cria arquivos automaticamente. regras.py contém apenas a função e sua validação; app.py contém a apresentação ao usuário. Esse arranjo permite importar regras em testes sem iniciar o programa. Rodar app.py define __name__ como '__main__' naquele arquivo, então main executa.",
          "Uma regra como percentual não deve chamar input nem print internamente se outros programas precisarem reutilizar seu resultado. Receba números, valide e devolva o percentual. A camada de interface pede os dados e mostra a frase. Assim você pode testar percentual(3, 4) diretamente, sem simular teclado e terminal em todo teste.",
          "Ao iniciar, não se preocupe em criar dez arquivos para três funções. Extraia um módulo quando há uma responsabilidade reconhecível, reuso real ou necessidade de isolar efeitos externos. Nomes como regras.py e app.py ensinam mais do que utilitarios2.py. Em projeto maior, agrupe módulos relacionados em um pacote: uma pasta importável que pode conter __init__.py."
        ]
      },
      {
        "title": "Pacotes, execução e imports relativos",
        "paragraphs": [
          "Uma estrutura possível é estudos/__init__.py, estudos/regras.py e estudos/app.py. Em app.py, de dentro do pacote, `from .regras import percentual` é um import relativo. Para executá-lo com contexto de pacote, esteja no diretório pai e use `python -m estudos.app`. Rodar diretamente `python estudos/app.py` pode falhar com 'attempted relative import with no known parent package'.",
          "Não corrija esse erro alterando sys.path aleatoriamente ou copiando o módulo. O modo de execução determina como Python enxerga o pacote. Para programas pequenos de dois arquivos no mesmo diretório, imports absolutos simples bastam. Ao evoluir para pacote, registre um comando claro no README e execute sempre do lugar esperado.",
          "Imports circulares surgem quando A importa B e B tenta importar A antes de suas definições terminarem de carregar. Sintomas incluem 'partially initialized module'. Em vez de forçar a ordem com hacks, redesenhe a direção da dependência: extraia o tipo ou função compartilhada para um terceiro módulo, ou passe um colaborador como parâmetro. Dependências devem ter sentido arquitetural."
        ]
      },
      {
        "title": "Confirmar que a separação funciona",
        "paragraphs": [
          "Execute `python app.py` na pasta com os dois arquivos e obtenha Progresso: 75%. Depois execute `python -c \"import regras\"`. A segunda chamada deve terminar silenciosamente. Se imprime uma demonstração, há código de execução no topo do módulo; mova esse trecho para uma função ou bloco protegido.",
          "Teste também `python -c \"from regras import percentual; print(percentual(0, 0))\"`. O caso total zero deve produzir 0 sem dividir por zero. Tente percentual(5, 4) e confirme ValueError. Essas verificações deixam claro que o módulo é utilizável separadamente da interface.",
          "No próximo passo, um arquivo de testes importará regras. Esse é um benefício concreto da organização: a camada de testes acessa o comportamento sem executar app.py. Se uma mudança no texto de apresentação quebrar os cálculos, o acoplamento ainda está alto. Refine as fronteiras para que a regra e sua exibição possam evoluir separadamente.",
          "Num trabalho em equipe, a estrutura facilita a revisão: uma mudança na fórmula percentual deve aparecer em regras.py e seus testes; uma mudança de texto aparece em app.py. Se uma solicitação simples exigir editar vários módulos sem motivo, investigue acoplamento. O objetivo de separar arquivos não é contar módulos, mas manter dependências compreensíveis. Desenhe setas entre os arquivos: app aponta para regras; regras não precisa apontar para app. Esse desenho pode orientar um refactor pequeno e verificável.",
          "Documente no README o diretório de onde os comandos são executados. Muitos erros de import de iniciantes são apenas diferença entre a pasta aberta no editor e a pasta atual do terminal. Execute `python -c \"import os; print(os.getcwd())\"` para confirmar essa pasta. Depois confira nomes exatos dos arquivos e extensão .py. Se um arquivo local sombreia biblioteca padrão, renomeie-o e apague caches criados para evitar observações confusas na próxima execução."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# Salve o primeiro bloco como regras.py:\ndef percentual(concluidas, total):\n    if total \u003c 0 or concluidas \u003c 0 or concluidas > total:\n        raise ValueError(\"Contagens inválidas\")\n    return 0 if total == 0 else round(concluidas / total * 100)\n\n\n# Salve o segundo bloco em app.py (sem as linhas acima):\nfrom regras import percentual\n\n\ndef main():\n    print(f\"Progresso: {percentual(3, 4)}%\")\n\n\nif __name__ == \"__main__\":\n    main()",
      "explanation": [
        "O exemplo contém dois blocos que precisam ser salvos em arquivos separados.",
        "regras.py guarda somente a função pura com contrato validado.",
        "app.py importa a função e executa main somente como programa principal."
      ],
      "expected": "python app.py imprime Progresso: 75%; python -c \"import regras\" não imprime nada."
    },
    "guided": [
      {
        "instruction": "Salve dois arquivos na mesma pasta e execute app.py a partir dela.",
        "result": "Progresso: 75%."
      },
      {
        "instruction": "Importe regras sem executar app.py e teste percentual(0, 0).",
        "result": "Import silencioso; chamada retorna 0."
      },
      {
        "instruction": "Mova temporariamente print('carregando') ao topo de regras.py e importe outra vez; depois remova.",
        "result": "A mensagem aparece no import e demonstra o efeito colateral."
      }
    ],
    "exercises": [
      {
        "prompt": "Prediga o que ocorre ao executar app.py e ao fazer apenas import regras.",
        "hints": [
          "__name__ muda conforme o modo de execução.",
          "regras.py não contém print no topo."
        ],
        "solution": "python app.py\npython -c \"import regras\"",
        "explanation": "A primeira ação chama main; a segunda somente carrega definições de regras.",
        "expected": "A execução direta e a importação isolada permitem comparar os efeitos observados de cada modo.",
        "criteria": ["Registra previsão de efeitos de execução e de import antes do teste.","Import isolado não dispara apresentação nem ação principal."]
      },
      {
        "prompt": "Crie status.py com a função rotulo(concluidas,total) que usa regras.percentual e devolve texto. Não imprima durante import.",
        "hints": [
          "Use import regras ou from regras import percentual.",
          "A função devolve string; apresentação fica com app.py."
        ],
        "solution": "# status.py\nfrom regras import percentual\n\ndef rotulo(concluidas, total):\n    return f'{percentual(concluidas, total)}% concluído'",
        "explanation": "O módulo reutiliza a regra e tem contrato simples; chamar rotulo(1, 4) devolve texto sem saída automática no import.",
        "expected": "rotulo(1, 4) == '25% concluído'.",
        "criteria": ["rotulo usa a função de percentual e retorna texto.","Importar status.py não imprime conteúdo."]
      },
      {
        "prompt": "Organize estudos/regras.py e estudos/app.py como pacote, usando import relativo e comando de execução correto.",
        "hints": [
          "Adicione estudos/__init__.py.",
          "Execute a partir da pasta pai com -m."
        ],
        "solution": "# estudos/app.py\nfrom .regras import percentual\n\ndef main():\n    print(percentual(3, 4))\n\nif __name__ == '__main__':\n    main()\n# no terminal: python -m estudos.app",
        "explanation": "O contexto de pacote fornece o pai necessário para resolver .regras.",
        "expected": "python -m estudos.app imprime 75.",
        "criteria": ["Regras e aplicação formam pacote com import relativo.","O comando de módulo executa o ponto de entrada uma vez."]
      },
      {
        "prompt": "Desenhe a correção para dependência circular entre app.py e regras.py, em que regras importou uma função de apresentação do app.",
        "hints": [
          "A regra não precisa conhecer a interface.",
          "Retorne o valor e deixe app formatar."
        ],
        "solution": "# regras.py: def percentual(...): return resultado\n# app.py: from regras import percentual; print(f'{percentual(3, 4)}%')",
        "explanation": "A dependência segue em uma direção: apresentação depende da regra, não o contrário. Isso resolve o ciclo sem manipular sys.path.",
        "expected": "Importar regras não importa app; importar app não executa main.",
        "criteria": ["Dependência circular é removida ao separar regra e apresentação.","Importar qualquer módulo não executa main nem cria ciclo."]
      }
    ],
    "mistakes": [
      "Colar o exemplo de dois arquivos em um só e concluir que import falha.",
      "Criar json.py ou requests.py local e sombrear bibliotecas.",
      "Executar diretamente um arquivo que usa import relativo de pacote.",
      "Colocar efeitos externos no topo do módulo, fazendo import disparar ações."
    ],
    "quiz": [
      {
        "question": "Quando o corpo de um módulo é executado?",
        "options": [
          "Ao importá-lo pela primeira vez no processo",
          "Apenas em chamadas de funções",
          "Nunca"
        ],
        "correctIndex": 0,
        "explanation": "Import cria as definições executando o corpo uma vez no processo."
      },
      {
        "question": "Qual comando preserva o contexto de pacote para estudos/app.py com from .regras import?",
        "options": [
          "python estudos/app.py",
          "python -m estudos.app, a partir do diretório pai",
          "pip estudos.app"
        ],
        "correctIndex": 1,
        "explanation": "-m executa o módulo pelo nome do pacote."
      },
      {
        "question": "Onde colocar demonstração que não deve rodar durante import?",
        "options": [
          "No topo de regras.py",
          "Em __init__.py sem condição",
          "Em main chamada sob if __name__ == '__main__'"
        ],
        "correctIndex": 2,
        "explanation": "O guard separa import de execução do programa."
      }
    ],
    "summary": [
      "Módulo é arquivo .py; pacote agrupa módulos relacionados.",
      "Import tem efeito de executar o corpo do módulo na primeira carga.",
      "Regra de negócio deve devolver dados; a interface apresenta.",
      "O modo `python -m pacote.modulo` é apropriado para import relativo."
    ]
  },
"py-venv": {
    "prerequisites": "Python 3 instalado no próprio computador e familiaridade com terminal e pastas. Não precisa instalar pacote externo para os primeiros passos.",
    "setup": "Crie uma pasta vazia curso-venv e abra terminal nela. Os comandos do exemplo são de terminal. Se `python` não existir no Windows, use `py -3`; em macOS/Linux use `python3`. A ativação é opcional para esta aula: os comandos apontam diretamente ao interpretador da .venv.",
    "why": "Um colega instala uma versão nova de biblioteca globalmente; outro projeto ainda precisa da versão anterior. Sem separação, um experimento pode quebrar um trabalho estável. O ambiente virtual oferece um diretório de executável e pacotes para cada projeto, tornando mais claro qual interpretador roda e recebe dependências. A lista de dependências permite refazer essa instalação em outra máquina.",
    "sections": [
      {
        "title": "Criar e usar o interpretador certo",
        "paragraphs": [
          "`python -m venv .venv` cria uma pasta .venv dentro do projeto. Ela contém um interpretador, scripts e um diretório para pacotes do ambiente. No Windows o executável fica em .venv\\Scripts\\python.exe; em sistemas POSIX, .venv/bin/python. Usar o caminho explícito evita depender da ativação do shell ou de uma configuração particular do editor.",
          "A ativação ajusta temporariamente PATH para que python e pip apontem ao ambiente. Em PowerShell, o comando comum é `.venv\\Scripts\\Activate.ps1`; macOS/Linux usa `source .venv/bin/activate`. Se políticas locais bloquearem a ativação, você ainda pode chamar o interpretador pelo caminho, sem mudar a política do sistema apenas por causa desta aula. Para sair de um ambiente ativado, use deactivate.",
          "Confirme o interpretador em uso com `.venv\\Scripts\\python.exe -c \"import sys; print(sys.executable)\"` no Windows, ou `.venv/bin/python -c ...` no macOS/Linux. O caminho impresso deve ficar dentro de .venv. Também compare `.venv...python -m pip --version` com o pip do sistema; o caminho do pacote deve referenciar o ambiente."
        ]
      },
      {
        "title": "Instalação e arquivo de dependências",
        "paragraphs": [
          "`python -m pip install requests` chama pip com o mesmo interpretador que você usou para executar o projeto. Isso é mais seguro operacionalmente do que invocar um `pip` sem saber a qual Python ele pertence. Depois, `python -m pip show requests` informa versão e localização. Para esta aula, instalar requests é opcional; você pode demonstrar venv somente com pacotes da biblioteca padrão.",
          "Em requirements.txt, uma linha como `requests==2.32.3` registra uma versão específica. A versão é um exemplo de sintaxe, não uma recomendação universal; confira a versão que efetivamente instalou ou que o projeto aprovou. Instale em ambiente novo com `python -m pip install -r requirements.txt`. Dependências transitivas e plataformas diferentes ainda podem gerar variação, então projetos maiores podem usar arquivo de lock e ferramentas apropriadas.",
          "`pip freeze > requirements.txt` captura o estado do ambiente, inclusive pacotes transitivos, o que pode ser útil para reconstrução, mas tende a incluir mais itens do que o projeto usa diretamente. Revise o arquivo antes de versionar. Um README deve registrar a versão de Python esperada, comando de criação do ambiente, instalação e execução. Se outra pessoa não conseguir reproduzir, falta uma informação no projeto."
        ]
      },
      {
        "title": "O que versionar e como lidar com configuração",
        "paragraphs": [
          "A pasta .venv depende de sistema operacional e caminho local; não a envie ao Git. Inclua `.venv/` no .gitignore. Mantenha código .py, requirements.txt, README e testes versionados. A presença de .gitignore não remove um segredo que já foi enviado ao repositório; nesse caso, revogue a credencial e siga o processo de correção do serviço.",
          "Chaves de API e senhas não pertencem a arquivos de código ou requirements.txt. Durante desenvolvimento, leia variáveis de ambiente ou um arquivo de configuração local ignorado pelo Git, com exemplo sem valores reais. Um ambiente virtual isola instalações, não impede código malicioso de acessar arquivos ou rede. Avalie dependências antes de instalar e mantenha versões corrigidas.",
          "Não há necessidade de ativar simultaneamente vários ambientes. Cada terminal tem seu próprio contexto. Na IDE, selecione explicitamente o interpretador de .venv; caso contrário, o terminal pode rodar uma versão e o botão Executar outra. Se um import funciona no terminal e falha no editor, inspecione sys.executable nos dois lugares."
        ]
      },
      {
        "title": "Reconstruir para verificar",
        "paragraphs": [
          "A prova mais útil é conseguir apagar e recriar a .venv a partir de comandos documentados, mas não faça isso com um ambiente que contém trabalho não registrado. Nesta aula, crie uma segunda pasta limpa, copie apenas código, requirements e README e refaça a instalação. Se o projeto usa somente a biblioteca padrão, requirements.txt pode ficar vazio e isso deve estar claro.",
          "Se pip disser 'Requirement already satisfied' mas import falhar, confirme sys.executable e pip --version. Se houver múltiplas versões de Python, `py -3 -m venv .venv` no Windows pode escolher explicitamente Python 3. Se você usa um terminal diferente ou executa dentro da IDE, confira a pasta de trabalho atual.",
          "Ao compartilhar instruções, inclua comandos equivalentes para Windows e macOS/Linux sem fingir que ambos têm os mesmos caminhos. A competência profissional aqui é diagnosticar onde um pacote foi instalado e entregar passos reproduzíveis. O ambiente é uma ferramenta de trabalho, não conteúdo a ser copiado para outro computador.",
          "Um projeto pode funcionar na sua máquina e falhar na de outro colega porque você instalou manualmente um pacote que não está registrado. Para descobrir essa dependência oculta, comece de ambiente vazio e siga só o README. Uma falha de import revela o pacote ausente; documente-o e repita. Faça isso antes de entregar um projeto, não depois que a pessoa tentar avaliar seu portfólio. Anote também a versão mínima de Python quando usa recursos recentes da linguagem.",
          "Ao atualizar uma dependência, rode os testes do projeto e confira mudanças de comportamento. Um requisito com versão fixa reduz surpresa imediata, mas precisa ser revisado para receber correções. Faixas amplas aceitam atualizações sem mudança no arquivo e podem expor diferenças entre instalações. Nenhuma estratégia elimina todo risco. Para este curso, o critério é saber o que foi instalado, reproduzir a instalação e justificar quando uma versão foi alterada."
        ]
      }
    ],
    "example": {
      "language": "Terminal · PowerShell e Bash",
      "code": "# Execute cada linha no terminal, não dentro de um arquivo .py.\n# Windows PowerShell:\npython -m venv .venv\n.venv\\Scripts\\python.exe -m pip --version\n.venv\\Scripts\\python.exe -m pip list\n\n# macOS/Linux, em outro sistema:\n# python3 -m venv .venv\n# .venv/bin/python -m pip --version\n# .venv/bin/python -m pip list\n\n# Em um arquivo .gitignore do projeto:\n# .venv/\n# __pycache__/\n# *.pyc",
      "explanation": [
        "Este é um exemplo de comandos de terminal, mostrado no painel de código apenas para consulta.",
        "Pelo caminho explícito, pip atua sobre a .venv mesmo sem ativação.",
        "Os comentários de .gitignore são linhas a salvar em um arquivo separado."
      ],
      "expected": "pip --version e pip list exibem a instalação situada dentro de .venv; nenhuma chamada à rede é necessária."
    },
    "guided": [
      {
        "instruction": "Crie .venv, imprima sys.executable pelo interpretador de dentro dela e anote o caminho.",
        "result": "Caminho termina em .venv/Scripts/python.exe ou .venv/bin/python."
      },
      {
        "instruction": "Rode o pip da mesma .venv e compare localização exibida.",
        "result": "pip pertence ao diretório de pacotes do ambiente criado."
      },
      {
        "instruction": "Escreva README mínimo e .gitignore; abra uma segunda pasta limpa e tente seguir as instruções.",
        "result": "Uma pessoa consegue escolher Python, criar .venv e executar sem depender do estado do seu terminal."
      }
    ],
    "exercises": [
      {
        "prompt": "Explique por que `pip install pacote` pode instalar em lugar diferente daquele usado por `python app.py`.",
        "hints": [
          "Pode existir mais de um Python no PATH.",
          "`python -m pip` vincula pip ao interpretador indicado."
        ],
        "solution": "python -m pip --version\npython -c \"import sys; print(sys.executable)\"",
        "explanation": "Compare os caminhos de saída e prefira o executável de .venv para ambos.",
        "expected": "O diagnóstico compara os caminhos escolhidos por pip e pelo interpretador e explica a diferença observada.",
        "criteria": ["Compara caminho do pip e do interpretador usado na execução.","Explicação relaciona a diferença ao ambiente selecionado."]
      },
      {
        "prompt": "Escreva comandos de criação e verificação para Windows e macOS/Linux, sem exigir ativação.",
        "hints": [
          "Use -m venv e -m pip.",
          "Os caminhos do executável diferem por sistema."
        ],
        "solution": "# Windows\npy -3 -m venv .venv\n.venv\\Scripts\\python.exe -m pip --version\n# macOS/Linux\npython3 -m venv .venv\n.venv/bin/python -m pip --version",
        "explanation": "Ao indicar o caminho diretamente, o aluno sabe onde instalará pacotes.",
        "expected": "pip informa caminho dentro de .venv em cada sistema.",
        "criteria": ["Apresenta criação e verificação nos dois sistemas operacionais.","Caminho observado pertence à .venv sem exigir ativação."]
      },
      {
        "prompt": "Monte requirements.txt e README para um projeto que usa requests, sem fixar uma versão inventada.",
        "hints": [
          "Primeiro instale e confira versão real.",
          "Registre a versão que o seu ambiente realmente tem."
        ],
        "solution": "# comandos com o python da .venv:\npython -m pip install requests\npython -m pip show requests\n# requirements.txt: requests==VERSAO_OBSERVADA\n# README: criar venv; instalar -r requirements.txt; executar app.py",
        "explanation": "A versão é observada, registrada e depois recriada; VERSAO_OBSERVADA é um marcador a substituir pelo número real, não uma linha pronta para instalar.",
        "expected": "Uma segunda instalação limpa consegue instalar a versão registrada.",
        "criteria": ["requirements e README permitem repetir a instalação em ambiente limpo.","Nenhuma versão é inventada ou fixada sem evidência."]
      },
      {
        "prompt": "Classifique quatro arquivos: app.py, .venv/, requirements.txt e arquivo com token pessoal. Quais entram no Git?",
        "hints": [
          "Código e descrição de dependências podem ser compartilhados.",
          "Ambiente local e segredo não devem ser commitados."
        ],
        "solution": "# versionar: app.py, requirements.txt, README.md, testes\n# ignorar: .venv/, __pycache__/, configuração local com token",
        "explanation": "O ambiente é reconstruído; um token enviado a repositório deve ser revogado, mesmo se depois removido.",
        "expected": "A classificação explica como reproduzir o projeto sem versionar ambiente local nem expor credenciais.",
        "criteria": ["Classifica cada arquivo com motivo de versionamento.","Justificativa considera reprodução, ambiente local e proteção de credenciais."]
      }
    ],
    "mistakes": [
      "Instalar pacotes no Python global sem verificar o interpretador do projeto.",
      "Versionar .venv e assumir que seus caminhos servirão a outra máquina.",
      "Tratar requirements.txt como local seguro para credenciais.",
      "Achar que venv é isolamento de segurança contra dependência maliciosa."
    ],
    "quiz": [
      {
        "question": "Qual comando liga pip ao interpretador escolhido?",
        "options": [
          "pip sozinho sempre",
          "python -m pip",
          "python -m venv pip"
        ],
        "correctIndex": 1,
        "explanation": "O módulo pip é executado pelo Python especificado."
      },
      {
        "question": "Qual arquivo normalmente deve ser versionado?",
        "options": [
          ".venv inteira",
          "Uma chave de API real",
          "requirements.txt revisado"
        ],
        "correctIndex": 2,
        "explanation": "O arquivo descreve dependências; a instalação local é recriada."
      },
      {
        "question": "venv impede uma dependência maliciosa de acessar arquivos?",
        "options": [
          "Não; isola instalações, não é sandbox de segurança",
          "Sim, sempre",
          "Somente se usar Windows"
        ],
        "correctIndex": 0,
        "explanation": "venv separa pacotes e executável, sem fronteira de segurança."
      }
    ],
    "summary": [
      "Use o interpretador da .venv de modo explícito e confira sys.executable.",
      "`python -m pip` evita instalar no Python errado.",
      "Registre dependências e comandos; não versione ambiente local ou segredos.",
      "Recriar em pasta limpa é uma verificação prática de reprodutibilidade."
    ]
  },
"py-requests": {
    "prerequisites": "Funções como parâmetros, listas de dicionários, exceções e noções de import. A versão obrigatória usa apenas Python 3; requests instalado só na extensão opcional.",
    "setup": "Salve api.py e rode python api.py. O endereço exemplo.invalid não é acessado: busca_local devolve resposta em memória. Para a extensão real, crie .venv, instale requests nela e substitua buscar por requests.get em ambiente com rede; escolha API pública estável e confira o formato atual antes de codificar.",
    "why": "Dados externos podem chegar atrasados, incompletos, incorretos ou não chegar. A interface de um aplicativo não deveria mostrar uma lista vazia indistinguível de erro. Separar a função que faz HTTP da função que interpreta os dados permite desenvolver e provar a lógica offline. Depois é possível trocar apenas o transporte para integrar com serviço real.",
    "sections": [
      {
        "title": "A sequência de uma chamada HTTP",
        "paragraphs": [
          "Uma requisição GET busca uma representação de recurso. O cliente recebe um status HTTP, cabeçalhos e corpo. Um status 200 indica sucesso do protocolo naquele pedido, mas não garante que o corpo tem a estrutura que sua aplicação espera. Um 404 ou 500 indica erro HTTP; uma falha de DNS, conexão ou timeout pode ocorrer antes de existir qualquer resposta.",
          "Com requests, `requests.get(url, timeout=5)` envia a chamada. A opção timeout evita espera sem limite; não garante que toda interação terminará exatamente em cinco segundos totais, pois o comportamento envolve conexão e leitura. `resposta.raise_for_status()` faz status 4xx/5xx virar HTTPError. Somente depois leia `resposta.json()` e valide os campos. `.json()` pode falhar se o corpo não for JSON válido mesmo num 200.",
          "No exemplo, buscar é um parâmetro. Em produção você pode passar requests.get; no estudo, busca_local devolve uma RespostaFalsa. A URL com domínio .invalid serve como marcador deliberado para não fazer rede, jamais como fonte real. Essa técnica de injeção permite simular respostas, erros e tempos sem depender da disponibilidade de um serviço externo."
        ]
      },
      {
        "title": "Validar o contrato dos dados",
        "paragraphs": [
          "O código espera uma lista de objetos com campo titulo do tipo string. Primeiro verifica a lista, depois cada item. Se o serviço retornar `{\"items\": [...]}` ou uma página de erro HTML, a função deve dizer que o contrato mudou em vez de produzir um resultado enganoso. O campo titulo poderia também precisar ser não vazio após strip(); adicione essa regra quando a interface exige nomes visíveis.",
          "Evite acessar `dados[0]['titulo']` antes de confirmar que a lista tem itens e que cada item é dicionário. Uma lista vazia pode ser um resultado legítimo; nesse caso retornar [] faz sentido. Diferencie ausência de resultados de falha do serviço na camada que apresenta mensagens ao usuário. Misturar os dois estados impede o usuário de saber se deve tentar novamente.",
          "Uma API real pode trazer identificadores, paginação e datas. Não copie o JSON inteiro para todas as partes do projeto. Converta os campos necessários para um modelo interno pequeno, mantendo uma função responsável pela fronteira. Se o serviço mudar, essa função concentra o ajuste e os testes indicam o impacto."
        ]
      },
      {
        "title": "Tratamento de erros e informação ao usuário",
        "paragraphs": [
          "requests define subclasses de RequestException para problemas de rede e HTTPError, e o processamento do JSON pode lançar exceção de decodificação. Uma camada de interface pode capturar categorias conhecidas, mostrar 'não foi possível carregar' e oferecer nova tentativa. Ela não deve transformar qualquer exceção em lista vazia, porque isso esconderia bugs na validação ou no código.",
          "Não registre tokens em URLs compartilhadas, código ou mensagens de erro. Para serviços com autenticação, credenciais devem vir de configuração segura e não de um exemplo didático publicado. Respeite políticas da API, limites e termos; um projeto simples não justifica repetidas requisições automáticas. Requisições externas também podem falhar por CORS quando feitas do navegador, mas Python rodando localmente não usa essa política do navegador.",
          "Ao usar requests.get de verdade, instale a dependência na .venv e registre a versão escolhida. Escreva documentação para quem vai executar. Separe o teste offline, que é rápido e determinístico, de um teste de integração opcional que depende de rede e contrato público. Uma falha de serviço público não deve tornar toda a prática impossível."
        ]
      },
      {
        "title": "Projetar casos de teste antes da integração real",
        "paragraphs": [
          "Rode o exemplo offline e confirme ['Python', 'Testes']. Altere busca_local para devolver lista vazia: resultado []. Depois devolva status=503 e observe que RuntimeError ocorre antes de json. Por fim devolva um item sem titulo e confirme ValueError. Esses casos representam caminhos reais sem abrir conexão.",
          "Escreva uma função busca_que_falha que lança TimeoutError. O erro deve se propagar; a camada que chama carregar_titulos decide como apresentar a falha. Se sua função capturar Exception e devolver [], ela perdeu a distinção entre serviço indisponível e catálogo realmente vazio. Esse é um teste de comportamento, não apenas de uma linha do código.",
          "Como extensão opcional, passe requests.get com URL pública documentada e adaptador de dados apropriado, usando timeout e raise_for_status. A resposta real pode mudar, por isso registre data e contrato observado. Para concluir a aula obrigatória, o transporte falso é suficiente e oferece todos os tipos fundamentais de falha que o código precisa saber lidar.",
          "Para transformar catálogo em recurso de uma aplicação, defina estados explícitos: carregando, dados encontrados, lista vazia e erro. Embora este exemplo rode no terminal, esses estados também aparecem em interfaces web. Você pode construir uma função apresentar(resultado) para o sucesso e um bloco except na fronteira da interface para falha. Evite fazer o usuário interpretar um traceback como mensagem normal; mantenha o traceback para desenvolvimento e ofereça ação clara quando a operação puder ser tentada de novo.",
          "Na integração real, uma resposta pode conter mais páginas. Não suponha que a primeira lista contém todo o catálogo. Consulte a documentação do serviço para saber se há cursor, número de página ou limite de itens. Teste um caso com lista vazia e outro com múltiplos itens antes de programar paginação. Se o serviço exige autenticação, mantenha o token fora do repositório e faça um caminho de erro compreensível para credencial ausente."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "class RespostaFalsa:\n    def __init__(self, dados, status=200):\n        self._dados = dados\n        self.status_code = status\n\n    def raise_for_status(self):\n        if self.status_code >= 400:\n            raise RuntimeError(f\"HTTP {self.status_code}\")\n\n    def json(self):\n        return self._dados\n\n\ndef carregar_titulos(buscar):\n    resposta = buscar(\"https://exemplo.invalid/livros\", timeout=5)\n    resposta.raise_for_status()\n    dados = resposta.json()\n    if not isinstance(dados, list):\n        raise ValueError(\"Esperada uma lista\")\n    titulos = []\n    for item in dados:\n        if not isinstance(item, dict) or not isinstance(item.get(\"titulo\"), str):\n            raise ValueError(\"Item sem título\")\n        titulos.append(item[\"titulo\"])\n    return titulos\n\n\ndef busca_local(url, timeout):\n    assert timeout == 5\n    return RespostaFalsa([{\"titulo\": \"Python\"}, {\"titulo\": \"Testes\"}])\n\n\nprint(carregar_titulos(busca_local))",
      "explanation": [
        "RespostaFalsa imita somente os métodos usados por carregar_titulos.",
        "carregar_titulos exige um transporte, verifica status, JSON e estrutura.",
        "busca_local confirma que timeout foi passado e devolve dados sem rede."
      ],
      "expected": "['Python', 'Testes']; nenhuma conexão de rede é feita."
    },
    "guided": [
      {
        "instruction": "Execute o arquivo sem instalar requests e confirme os dois títulos.",
        "result": "['Python', 'Testes']."
      },
      {
        "instruction": "Troque a resposta local por status=503 e execute.",
        "result": "RuntimeError: HTTP 503; json não é lido."
      },
      {
        "instruction": "Troque os dados por [{'nome': 'Python'}] e depois por [].",
        "result": "O primeiro caso lança ValueError; a lista vazia retorna []."
      }
    ],
    "exercises": [
      {
        "prompt": "Preveja o retorno para dados [] e a falha para status 404.",
        "hints": [
          "Confira a ordem entre raise_for_status e json.",
          "A lista vazia ainda é list."
        ],
        "solution": "print(carregar_titulos(lambda url, timeout: RespostaFalsa([])))\ncarregar_titulos(lambda url, timeout: RespostaFalsa([], 404))",
        "explanation": "O primeiro caso é sucesso sem itens. O segundo falha por status antes de produzir catálogo.",
        "expected": "A previsão é registrada antes das respostas simuladas; compare o retorno e o tratamento da falha HTTP.",
        "criteria": ["Previsão é registrada antes das duas respostas simuladas.","Caso de erro HTTP é distinguido de retorno bem-sucedido."]
      },
      {
        "prompt": "Exija que titulo seja string não vazia após strip e devolva títulos sem espaços nas pontas.",
        "hints": [
          "Valide cada item antes de append.",
          "Use strip apenas depois de confirmar str."
        ],
        "solution": "for item in dados:\n    if not isinstance(item, dict) or not isinstance(item.get('titulo'), str) or not item['titulo'].strip():\n        raise ValueError('Item sem título')\n    titulos.append(item['titulo'].strip())",
        "explanation": "A validação protege a interface de nomes invisíveis e a normalização evita espaços acidentais.",
        "expected": "'  Python  ' vira 'Python'; '   ' gera ValueError.",
        "criteria": ["Aceita string não vazia depois de remover espaços periféricos.","Texto retornado é normalizado e entrada vazia é recusada."]
      },
      {
        "prompt": "Simule um timeout e capture-o na camada de apresentação sem converter em lista vazia.",
        "hints": [
          "Faça o transporte lançar TimeoutError.",
          "Capture fora de carregar_titulos."
        ],
        "solution": "def busca_lenta(url, timeout):\n    raise TimeoutError('demorou')\n\ntry:\n    print(carregar_titulos(busca_lenta))\nexcept TimeoutError:\n    print('Serviço indisponível; tente novamente')",
        "explanation": "O consumidor distingue erro de rede de resultado vazio e pode oferecer nova tentativa.",
        "expected": "Mostra Serviço indisponível; tente novamente.",
        "criteria": ["Timeout é capturado na apresentação sem produzir lista vazia.","Mensagem permite tentar novamente e serviço permanece separado."]
      },
      {
        "prompt": "Escreva um adaptador opcional para requests.get com timeout e status, mantendo o teste offline obrigatório.",
        "hints": [
          "Instale requests na .venv apenas para este passo.",
          "Deixe validação no mesmo carregar_titulos."
        ],
        "solution": "# Após instalar requests:\nimport requests\n\ndef buscar_http(url, timeout):\n    return requests.get(url, timeout=timeout)\n\n# Use somente com URL real cujo JSON seja lista de {'titulo': str}.\n# Para APIs com outro esquema, escreva um adaptador de dados.",
        "explanation": "A função de domínio continua recebendo um transporte. O exemplo de URL .invalid não deve ser chamado; escolha um serviço real e documentado para a extensão.",
        "expected": "Chamada real usa timeout, verifica status e valida o JSON; se contrato difere, adaptação explícita.",
        "criteria": ["Adaptador define timeout, verifica status e valida JSON.","Teste offline obrigatório não depende de chamada real."]
      }
    ],
    "mistakes": [
      "Usar `.json()` como prova de que a resposta HTTP foi bem-sucedida.",
      "Supor que todo status 200 contém os campos esperados.",
      "Omitir timeout e deixar uma chamada prender a interface por tempo indefinido.",
      "Capturar todo erro e devolver [] como se não houvesse resultados."
    ],
    "quiz": [
      {
        "question": "Uma resposta HTTP 200 garante dados com o formato esperado?",
        "options": [
          "Sim",
          "Não; é preciso validar JSON e campos",
          "Somente com requests"
        ],
        "correctIndex": 1,
        "explanation": "Status e contrato do corpo são verificações distintas."
      },
      {
        "question": "Em que ordem o exemplo trata a resposta?",
        "options": [
          "json, status, busca",
          "busca, status, json, validação",
          "validação, busca, json"
        ],
        "correctIndex": 1,
        "explanation": "O status é conferido antes do corpo; depois vem o contrato dos dados."
      },
      {
        "question": "Por que a função recebe buscar como argumento?",
        "options": [
          "Para testar respostas e falhas sem rede",
          "Para esconder o nome da biblioteca",
          "Para nunca usar HTTP"
        ],
        "correctIndex": 0,
        "explanation": "O transporte pode ser simulado e depois substituído por implementação real."
      }
    ],
    "summary": [
      "Uma chamada pode falhar na rede, no status, na leitura de JSON ou no contrato dos dados.",
      "Use timeout e valide antes de consumir campos externos.",
      "Injeção do transporte mantém testes obrigatórios offline.",
      "Resultado vazio e falha de serviço são estados diferentes."
    ]
  },
"py-tests": {
    "prerequisites": "Funções, exceções, módulos e execução por terminal. A aula usa somente biblioteca padrão.",
    "setup": "Crie uma pasta testes-estudos. Separe o exemplo em regra.py e test_regra.py conforme comentários. Dentro da pasta, rode python -m unittest -v ou python test_regra.py. O primeiro comando descobre test*.py no diretório. Nenhum pacote ou rede é necessário.",
    "why": "Ao alterar uma função para atender requisito novo, uma regra antiga pode parar de funcionar. Teste automatizado registra exemplos executáveis do contrato e acusa essa regressão rapidamente. Ele não prova ausência de todos os defeitos; cobre os comportamentos que você escolheu descrever. A qualidade depende das situações testadas e da observação do resultado.",
    "sections": [
      {
        "title": "Estrutura mínima de uma suíte",
        "paragraphs": [
          "unittest.TestCase reúne métodos cujo nome começa com test_. Cada método é um caso independente que prepara dados, executa uma ação e verifica um resultado observável. `assertEqual` compara valores; `assertRaises` exige uma exceção esperada. Rodar `python -m unittest -v` imprime os nomes e mostra OK quando todos passam.",
          "O exemplo separa regra.py de test_regra.py. Importar regra não deve executar um programa interativo; isso é consequência da aula de módulos. Guarde o arquivo de teste com nome reconhecível por descoberta, como test_regra.py. Se você misturar regra e demonstração no topo, a suíte pode imprimir ou pedir input ao ser importada.",
          "O teste não deve copiar a implementação e calcular a resposta com a mesma fórmula. O esperado 75 vem do contrato: três de quatro equivalem a 75%. Um teste que apenas chama a função sem assertiva pode passar mesmo que o retorno esteja errado. Confira a saída da suíte e provoque uma falha de propósito para ter certeza de que ela detecta diferença."
        ]
      },
      {
        "title": "Escolher casos que revelam erros",
        "paragraphs": [
          "Casos normais são necessários, mas limites descobrem defeitos importantes. Para percentual, (0,0) evita divisão por zero; (0,4) e (4,4) cobrem extremos; (5,4) viola o contrato. Uma implementação que calcula corretamente 3/4 pode falhar nos demais. Faça uma pequena tabela de entradas, esperado e motivo antes de escrever o teste.",
          "Uma exceção é parte do comportamento quando a entrada é inválida. `with self.assertRaises(ValueError): percentual(5,4)` prova que o contrato rejeita essa entrada. Se a mensagem específica importa à interface, `assertRaisesRegex` pode verificá-la; evite travar o teste em detalhes de texto que não são requisito. Diferencie o valor retornado de efeitos colaterais, como arquivo alterado ou serviço chamado.",
          "Cada teste deve começar de um estado conhecido. Se um teste modifica variável global, arquivo compartilhado ou banco real, outro pode depender da ordem de execução. Use dados novos em setUp quando houver repetição, arquivos temporários para I/O e substitutos para serviços. Testes previsíveis podem rodar no computador de outro desenvolvedor e na integração contínua."
        ]
      },
      {
        "title": "Isolar rede e colaboradores",
        "paragraphs": [
          "A função carregar_titulos da aula anterior recebe buscar e pode ser testada com uma função falsa que devolve resposta conhecida. Isso é um double simples: ele substitui um colaborador externo sem precisar de biblioteca adicional. A suíte testa o comportamento do catálogo, não a disponibilidade de um site. Se o serviço real cair, seus testes de unidade ainda passam.",
          "unittest.mock oferece Mock, patch e assert_called_once_with para verificar colaboração. Use mock quando for útil provar que timeout foi passado, ou que uma função externa foi chamada uma única vez. Evite testar cada detalhe interno da implementação: trocar um laço por compreensão não deveria quebrar um teste cujo contrato é o mesmo. Prefira resultados e efeitos observáveis.",
          "Teste de integração é outro nível: executa componentes reais em conjunto, possivelmente com banco, API ou sistema de arquivos. Ele detecta problemas que mocks não capturam, mas tende a exigir ambiente e ficar mais lento. Registre pré-requisitos e execute em etapa apropriada. Para a prática obrigatória desta aula, o teste unitário offline é suficiente."
        ]
      },
      {
        "title": "Regressão e manutenção guiada por falha",
        "paragraphs": [
          "Mude temporariamente `round(concluidas / total * 100)` para `int(...)` e acrescente um caso como (2,3), cujo arredondamento esperado é 67. A suíte deve acusar 66. Depois restaure a função e veja o teste passar. Essa alternância prova que o teste realmente diferencia as versões para o requisito escolhido.",
          "Quando um defeito aparece em projeto existente, primeiro escreva um teste que reproduz o comportamento errado. Ele deve falhar antes da correção; se já passa, talvez não represente o bug. Corrija o menor trecho necessário e rode a suíte inteira para detectar regressões. Documente o caso quando ele representa uma regra de negócio importante.",
          "Cobertura de linhas informa o que executou, mas não se o esperado foi bem escolhido. Testes que sempre passam sem assertiva dão números bonitos e pouca proteção. Para um desenvolvedor júnior, a habilidade central é transformar requisito concreto em exemplos verificáveis, interpretar falhas e manter a suíte confiável ao mudar o código.",
          "Um teste que falha é uma pista, não necessariamente um bug na implementação. Compare o requisito, a entrada, o esperado e o resultado real. Talvez o teste tenha codificado uma interpretação errada do arredondamento; talvez a regra tenha mudado e o teste precise ser atualizado junto. Não apague a assertiva só para deixar a suíte verde. Escreva uma frase que explique o comportamento desejado antes de modificar qualquer um dos lados.",
          "Em uma revisão de código, mostre o comando que executou e os casos relevantes. Por exemplo, 'python -m unittest -v; seis testes, incluindo total zero e contagem inválida'. Isso dá mais evidência do que afirmar apenas que 'funciona'. Ao acrescentar funcionalidade, rode a suíte completa depois dos testes novos; uma alteração local pode afetar contrato antigo. A formação inicial para trabalho depende desse hábito repetível de mudar, verificar e explicar."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "# Salve como regra.py:\ndef percentual(concluidas, total):\n    if total \u003c 0 or not 0 \u003c= concluidas \u003c= total:\n        raise ValueError(\"Contagens inválidas\")\n    return 0 if total == 0 else round(concluidas / total * 100)\n\n\n# Salve o bloco seguinte como test_regra.py:\nimport unittest\nfrom regra import percentual\n\n\nclass PercentualTest(unittest.TestCase):\n    def test_caso_comum(self):\n        self.assertEqual(percentual(3, 4), 75)\n\n    def test_total_zero(self):\n        self.assertEqual(percentual(0, 0), 0)\n\n    def test_contagem_invalida(self):\n        with self.assertRaises(ValueError):\n            percentual(5, 4)\n\n\nif __name__ == \"__main__\":\n    unittest.main()",
      "explanation": [
        "O exemplo foi dividido em regra.py e test_regra.py; não cole tudo no mesmo arquivo.",
        "Três testes cobrem um caso comum, o limite zero e a rejeição de entrada inválida.",
        "O guard permite executar o arquivo diretamente além da descoberta via -m unittest."
      ],
      "expected": "python -m unittest -v informa Ran 3 tests e OK; a ordem dos nomes pode variar."
    },
    "guided": [
      {
        "instruction": "Salve os dois arquivos e rode a descoberta do unittest.",
        "result": "Três casos passam e a suíte termina com OK."
      },
      {
        "instruction": "Troque temporariamente 75 esperado por 74 e execute de novo.",
        "result": "test_caso_comum falha mostrando esperado e recebido."
      },
      {
        "instruction": "Restaure e adicione teste para percentual(2,3) == 67.",
        "result": "O teste passa com round; falha se o cálculo for truncado para 66."
      }
    ],
    "exercises": [
      {
        "prompt": "Preveja o resultado dos três testes originais e explique por que cada um existe.",
        "hints": [
          "Observe valores, zero e exceção.",
          "Um teste passa apenas se sua assertiva confirma o contrato."
        ],
        "solution": "python -m unittest -v",
        "explanation": "Os casos cobrem comportamento comum, limite que causaria divisão por zero e entrada inválida. A saída detalha três testes.",
        "expected": "A previsão do relatório e a função de cada teste são registradas antes da execução.",
        "criteria": ["Previsão dos testes originais registrada antes de executá-los.","Cada teste tem uma razão observável e o relatório é conferido."]
      },
      {
        "prompt": "Acrescente testes para extremos (0,4), (4,4) e arredondamento (2,3).",
        "hints": [
          "0% e 100% são fronteiras válidas.",
          "round(2 / 3 * 100) é 67."
        ],
        "solution": "def test_extremos_e_arredondamento(self):\n    self.assertEqual(percentual(0, 4), 0)\n    self.assertEqual(percentual(4, 4), 100)\n    self.assertEqual(percentual(2, 3), 67)",
        "explanation": "Esses casos encontram erros que 3/4 sozinho não identifica; método deve ficar dentro de PercentualTest.",
        "expected": "Mais um teste; todas as assertivas passam.",
        "criteria": ["Casos de extremo e arredondamento têm expectativas explícitas.","Suíte ampliada termina sem falhas."]
      },
      {
        "prompt": "Teste que a função carregar_titulos passa timeout=5 a um transporte falso e retorna os títulos esperados.",
        "hints": [
          "Guarde os argumentos recebidos em uma lista.",
          "Não faça rede; devolva resposta em memória."
        ],
        "solution": "chamadas = []\ndef buscar(url, timeout):\n    chamadas.append((url, timeout))\n    return RespostaFalsa([{'titulo': 'Python'}])\nassert carregar_titulos(buscar) == ['Python']\nassert len(chamadas) == 1 and chamadas[0][1] == 5",
        "explanation": "O double verifica o contrato observável do transporte sem depender de requests ou internet. Importe/carregue as definições da aula anterior.",
        "expected": "Um título retornado e uma chamada com timeout 5.",
        "criteria": ["Transporte falso recebe timeout=5 e devolve títulos controlados.","Teste não abre conexão externa."]
      },
      {
        "prompt": "Faça um teste de regressão: crie caso para (2,3)==67, provoque truncamento, confirme falha e restaure.",
        "hints": [
          "Troque round(...) por int(...) só temporariamente.",
          "Rode a suíte antes e depois da correção."
        ],
        "solution": "def test_arredondamento(self):\n    self.assertEqual(percentual(2, 3), 67)\n# com int(2/3*100): teste falha (66)\n# com round(2/3*100): teste passa (67)",
        "explanation": "Um teste útil precisa falhar diante do defeito que afirma prevenir. Essa sequência fornece evidência de que ele detecta a regressão.",
        "expected": "Falha controlada com 66; após restaurar, OK.",
        "criteria": ["Regressão falha de forma controlada antes da restauração.","Implementação correta faz o caso de arredondamento passar e suíte terminar verde."]
      }
    ],
    "mistakes": [
      "Criar teste sem assertiva que nunca verifica o resultado.",
      "Calcular o esperado repetindo a mesma expressão do código testado.",
      "Depender de rede pública no teste de unidade obrigatório.",
      "Comemorar cobertura alta sem testar limites e falhas relevantes."
    ],
    "quiz": [
      {
        "question": "Como unittest descobre um método de teste?",
        "options": [
          "Nome começando com test_ em TestCase",
          "Qualquer método privado",
          "Somente o método main"
        ],
        "correctIndex": 0,
        "explanation": "A convenção test_ permite descoberta automática."
      },
      {
        "question": "Qual caso protege contra divisão por zero em percentual?",
        "options": [
          "(3,4)",
          "(0,0)",
          "(4,4)"
        ],
        "correctIndex": 1,
        "explanation": "O total zero exige um retorno definido antes da divisão."
      },
      {
        "question": "Por que usar transporte falso num teste unitário de catálogo?",
        "options": [
          "Para simular respostas e falhas de modo determinístico",
          "Para garantir que a API pública nunca mude",
          "Para medir velocidade da internet"
        ],
        "correctIndex": 0,
        "explanation": "O double controla o colaborador externo e torna a verificação repetível."
      }
    ],
    "summary": [
      "Testes verificam contratos observáveis por entradas, saídas e falhas.",
      "Inclua fronteiras, não apenas caminho feliz.",
      "Isole dependências externas em testes unitários; use integração real quando apropriado.",
      "Um caso de regressão deve falhar com o defeito e passar após a correção."
    ]
  }
});

// Recuperação após erro no quiz: um problema novo para aplicar a mesma habilidade.
(() => {
  const retries = {
    "py-syntax": {
      prompt: "Uma oficina registra '18' participantes pela manhã e '7' à tarde. Antes de executar, preveja o resultado de somar os textos. Depois converta-os e imprima '25 participantes' em um arquivo .py.",
      expected: "A concatenação dos textos produz '187'; a soma convertida produz 25 e o programa imprime '25 participantes' sem traceback.",
      hint: "Confira o tipo de cada valor no REPL antes de calcular no arquivo."
    },
    "py-control": {
      prompt: "Para as temperaturas [19, 21, 20, 18], conte quantas estão em 20 ou mais e imprima o total. Preveja a resposta e teste também uma lista vazia.",
      expected: "O total é 2 para a lista dada e 0 para a lista vazia; o limite 20 está incluído e o laço termina após percorrer os itens.",
      hint: "Separe o contador da condição; verifique o operador usado na fronteira."
    },
    "py-data": {
      prompt: "Você recebeu nomes ['Lia', 'Rui', 'Lia', 'Bia']. Mostre quantos nomes distintos existem e crie uma nova lista em ordem de primeira aparição, preservando a lista original.",
      expected: "A contagem é 3; a nova lista é ['Lia', 'Rui', 'Bia']; a lista de entrada continua com quatro itens.",
      hint: "Um set ajuda a testar unicidade, mas a lista guarda a ordem desejada."
    },
    "py-functions": {
      prompt: "Escreva calcular_saldo(creditos, debitos), que retorna a diferença para dois números não negativos. Defina o que ocorre com entrada inválida e teste (10, 3), (0, 0) e um valor negativo.",
      expected: "A função retorna 7 e 0 nos casos válidos; recusa o caso inválido conforme o contrato escolhido; não imprime como substituto de return.",
      hint: "Documente parâmetros, retorno e erro antes de escrever o cálculo."
    },
    "py-files": {
      prompt: "Grave em UTF-8 um arquivo JSON com uma lista de dois livros, cada um com título e páginas. Leia de volta, valide que veio uma lista e calcule o total de páginas; teste o arquivo contendo apenas 42.",
      expected: "O total corresponde aos dois livros; o conteúdo 42 é recusado como formato inesperado, sem tentar iterá-lo como lista de livros.",
      hint: "Use with e json; valide a estrutura depois de carregar, antes de acessar os campos."
    },
    "py-debug": {
      prompt: "Uma função que calcula a média de [6, 8, 10] devolve 6. Registre entrada, resultado esperado e observado. Use um ponto de parada para examinar soma e divisor; acrescente um teste para lista vazia.",
      expected: "O caso principal espera 8; a primeira divergência é identificada com valores observados; o teste de lista vazia define um comportamento explícito e passa após a correção.",
      hint: "Inspecione soma e quantidade separadamente antes de editar a fórmula."
    },
    "py-oop": {
      prompt: "Modele uma classe Carrinho que guarda itens por instância. Crie dois carrinhos, adicione um item apenas ao primeiro e implemente remover_ultimo com erro claro quando não houver itens.",
      expected: "O segundo carrinho continua vazio; remover_ultimo devolve o item do primeiro; chamar no segundo gera a exceção documentada.",
      hint: "Crie a lista em __init__, não como atributo mutável da classe."
    },
    "py-errors": {
      prompt: "Crie ler_idade(texto), que aceita inteiros de 0 a 120. Teste '0', '121' e 'abc'; capture apenas as falhas que a interface consegue explicar ao usuário.",
      expected: "'0' é aceito; '121' e 'abc' produzem erros distinguíveis de faixa e formato; nenhuma exceção inesperada é escondida por except genérico.",
      hint: "Separe a conversão da validação de domínio e escolha o tipo de exceção para cada falha."
    },
    "py-modules": {
      prompt: "Separe calcular_total(valores) em regras.py e uma apresentação em app.py. Importe a regra sem imprimir nada apenas por causa do import; execute app.py e teste uma lista vazia.",
      expected: "A importação não dispara a apresentação; executar o app mostra o resultado previsto; a regra retorna 0 para lista vazia conforme o contrato.",
      hint: "Deixe a chamada de apresentação sob if __name__ == '__main__' e mantenha print fora da regra."
    },
    "py-venv": {
      prompt: "Um projeto funciona no computador A, mas o computador B relata ModuleNotFoundError. Descreva como conferir qual Python executa o app, instalar a dependência nesse ambiente e recriar tudo em pasta limpa.",
      expected: "O diagnóstico compara o interpretador em uso com o usado na instalação; o ambiente local pode ser recriado pelo README e pela lista de dependências, sem versionar .venv ou tokens.",
      hint: "Use sys.executable e invoque pip pelo mesmo interpretador escolhido para o app."
    },
    "py-requests": {
      prompt: "Uma consulta de catálogo por transporte falso retorna [{'titulo':'  Redes  '}] numa execução e lança timeout em outra. Valide os dados e mostre resultados diferentes para sucesso, lista vazia e falha de rede.",
      expected: "O caso válido produz 'Redes'; lista vazia permanece vazia; timeout é apresentado como falha, sem ser convertido em resultado vazio. Os testes funcionam offline.",
      hint: "Passe um transporte falso à regra e trate a exceção na camada que apresenta o resultado."
    },
    "py-tests": {
      prompt: "Uma função arredonda a porcentagem de acertos. Escreva testes para (0, 5), (5, 5), (1, 3) e total zero. Introduza temporariamente um defeito de truncamento e observe qual teste falha.",
      expected: "Cada teste declara o valor esperado; o teste de 1 em 3 detecta o truncamento; após restaurar a regra, todos passam e total zero segue o contrato escolhido.",
      hint: "Calcule as expectativas sem chamar a própria função testada para criá-las."
    }
  };

  for (const [id, retry] of Object.entries(retries)) LESSON_GUIDES[id].retry = retry;
})();

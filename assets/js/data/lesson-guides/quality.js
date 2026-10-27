'use strict';

// Guias detalhados da trilha Qualidade e manutenção.
Object.assign(LESSON_GUIDES, {
"quality-cases": {
    "prerequisites": "Funções, condições, valores e terminal básico da trilha JavaScript.",
    "setup": "Instale uma versão atual de Node.js. Em uma pasta vazia, salve o exemplo exatamente como desconto.test.cjs. Abra o terminal nessa pasta e rode node --test desconto.test.cjs. O módulo node:test e o assert/strict já acompanham Node; não há pacote a instalar. Se não houver Node, leia o fluxo e faça previsões, mas execute antes de considerar o exercício concluído.",
    "why": "Quando um requisito diz “aplique desconto”, ainda não sabemos o que fazer com preço zero, percentual 100 ou texto no lugar de número. O teste transforma escolhas em comportamentos observáveis. Ele pode revelar um defeito depois de uma mudança e documentar a intenção de uma função, desde que o caso escrito realmente represente a necessidade. Uma lista de testes aprovada não prova que não existem casos esquecidos.",
    "sections": [
      {
        "title": "Escreva o contrato antes do teste",
        "paragraphs": [
          "Um contrato descreve entradas permitidas, saída e erros. Para totalComDesconto, preço deve ser número finito não negativo e percentual deve ficar de 0 a 100. A saída é um número arredondado a centavos. Uma entrada inválida lança TypeError. Escreva isso em palavras antes de codificar: sem contrato, um teste pode apenas repetir um palpite do código. Não confunda exibir “erro” na tela com lançar um erro para quem chama a função.",
          "Separe a regra pura da interface. Uma função que recebe dois números e devolve um valor é fácil de testar porque não depende de clique, relógio ou rede. Testes de unidade concentram-se numa pequena unidade de comportamento. O nome de cada teste deve dizer o resultado esperado, por exemplo “rejeita percentual acima de 100”. “funciona” não explica qual comportamento falhou."
        ]
      },
      {
        "title": "Selecione casos com intenção",
        "paragraphs": [
          "Classes de equivalência agrupam entradas que devem seguir a mesma regra: percentual válido, percentual negativo, percentual acima de 100 e entrada não numérica. Escolha ao menos um representante de cada classe. Valores de fronteira expõem comparações incorretas: 0, 100, -1 e 101 são mais informativos do que repetir 10, 20 e 30. Para preço, examine zero, um valor comum e um inválido. Uma tabela com entrada e saída prevista evita ajustar a expectativa depois de ver o resultado.",
          "Use ainda um caso que teria quebrado uma implementação ingênua. Por exemplo, “if (!preco)” trataria zero como erro apesar de zero ser permitido. Valores ausentes, strings numéricas, NaN e Infinity devem ser classificados explicitamente. Não é necessário testar todas as combinações; é necessário explicar por que os casos escolhidos atacam riscos distintos. Acrescente um caso novo toda vez que um defeito real revelar uma lacuna."
        ]
      },
      {
        "title": "Escreva e rode afirmações",
        "paragraphs": [
          "node:test fornece test(nome, função) e executa as funções como testes. assert.equal compara valores primitivos estritamente; assert.deepEqual compara estruturas; assert.throws verifica que uma chamada lança erro. A expressão dentro de assert.throws deve ser uma função, pois a execução precisa ocorrer durante a verificação. A importação require funciona aqui porque o arquivo termina em .cjs. Salve e rode node --test desconto.test.cjs; observe nomes e contagem de casos.",
          "Provoque uma falha alterando a expectativa de 85 para 84. O processo sai com erro e mostra o valor real e o esperado; isso indica uma divergência, mas não decide sozinho se o código ou a expectativa está errada. Releia o contrato. Corrija a expectativa e acrescente o cenário de 100%: o total deve ser zero. Um teste que nunca falhou diante de uma mudança controlada pode estar verificando a coisa errada."
        ]
      },
      {
        "title": "Interprete o alcance",
        "paragraphs": [
          "Testar um cálculo não valida a interface que coleta o preço nem um serviço que o entrega. Uma regra também pode passar por coincidência com os números escolhidos. Por isso nomeie comportamentos, inclua limites e revise as expectativas. Cobertura de linhas informa quais linhas foram executadas, não se as afirmações estão corretas. Se uma alteração de requisito mudar a regra, atualize primeiro a descrição do contrato e então os testes afetados.",
          "Faça uma pequena matriz: caso, por que importa, entrada e resultado previsto. Essa matriz deve ser compreensível por outra pessoa que não leu a implementação. Se não conseguir explicar um caso, remova a duplicação ou melhore seu nome. A evidência de aprendizado é conseguir criar um teste que falha para um defeito introduzido e depois passa quando o defeito é corrigido."
        ]
      }
    ],
    "example": {
      "language": "javascript",
      "code": "// Salve como desconto.test.cjs e execute: node --test desconto.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction totalComDesconto(preco, percentual) {\n  if (!Number.isFinite(preco) || preco \u003c 0 ||\n      !Number.isFinite(percentual) || percentual \u003c 0 || percentual > 100) {\n    throw new TypeError('Preço ou percentual inválido');\n  }\n  return Math.round(preco * (1 - percentual / 100) * 100) / 100;\n}\n\ntest('aplica desconto normal', () => {\n  assert.equal(totalComDesconto(100, 15), 85);\n});\ntest('aceita o limite zero sem tratar como ausente', () => {\n  assert.equal(totalComDesconto(0, 20), 0);\n});\ntest('rejeita percentual acima do contrato', () => {\n  assert.throws(() => totalComDesconto(100, 120), TypeError);\n});\n",
      "explanation": [
        "A função valida antes de calcular, incluindo os dois limites do percentual.",
        "Cada teste trata uma classe diferente: valor comum, zero e percentual inválido.",
        "assert.throws recebe uma função para que o erro ocorra dentro da afirmação."
      ],
      "expected": "node --test desconto.test.cjs termina com 3 testes aprovados e zero falhas; sem contar detalhes de formatação que variam por versão."
    },
    "guided": [
      {
        "instruction": "Execute o arquivo e marque em uma tabela as três classes de entrada que ele representa.",
        "result": "Comum válido, preço zero válido, percentual maior que 100 inválido."
      },
      {
        "instruction": "Mude a expectativa de 85 para 84, execute de novo e leia o diff.",
        "result": "Um caso falha; o processo indica divergência entre esperado e real."
      },
      {
        "instruction": "Restaure 85 e acrescente um caso para percentual 100.",
        "result": "totalComDesconto(80, 100) retorna 0 e todos os testes passam."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: acrescente um teste para 100% de desconto sobre 80.",
        "hints": [
          "Copie o formato de test e assert.equal.",
          "A saída esperada é zero."
        ],
        "solution": "test('desconto integral', () => { assert.equal(totalComDesconto(80, 100), 0); });",
        "explanation": "O limite superior pertence ao intervalo permitido e o cálculo chega a zero.",
        "expected": "Novo teste aprovado; totalComDesconto(80, 100) === 0."
      },
      {
        "prompt": "Aplique: teste que percentual negativo lança TypeError e que um preço decimal válido é aceito.",
        "hints": [
          "Use assert.throws para o erro.",
          "Para valor decimal, escolha 20.5 sem desconto."
        ],
        "solution": "test('percentual negativo', () => { assert.throws(() => totalComDesconto(20, -1), TypeError); });\ntest('preço decimal', () => { assert.equal(totalComDesconto(20.5, 0), 20.5); });",
        "explanation": "Os testes atacam uma fronteira inválida e um preço fracionário válido.",
        "expected": "Dois novos testes aprovados; o erro ocorre apenas no cenário inválido."
      },
      {
        "prompt": "Diagnóstico: introduza temporariamente o defeito percentual >= 100 na validação. Qual caso deve falhar? Corrija depois.",
        "hints": [
          "Mude apenas o operador > por >=.",
          "Rode os testes antes de restaurar a implementação."
        ],
        "solution": "// Com percentual >= 100, o teste 'desconto integral' falha.\n// Restaure percentual > 100 e execute a suíte novamente.",
        "explanation": "A alteração controlada confirma que o teste observa a fronteira correta.",
        "expected": "Falha reproduzida antes da correção; todos os testes passam depois."
      },
      {
        "prompt": "Transferência: escreva classificarNota(nota): 0–10 finito; retorna \"aprovado\" para >= 7, \"revisar\" para \u003c 7 e lança TypeError fora do contrato. Crie ao menos quatro testes.",
        "hints": [
          "Cubra 7, 6.9 e entradas inválidas.",
          "Separe função e testes no mesmo arquivo .test.cjs."
        ],
        "solution": "function classificarNota(nota) {\n  if (!Number.isFinite(nota) || nota \u003c 0 || nota > 10) throw new TypeError('Nota inválida');\n  return nota >= 7 ? 'aprovado' : 'revisar';\n}\ntest('limite aprovado', () => assert.equal(classificarNota(7), 'aprovado'));\ntest('abaixo', () => assert.equal(classificarNota(6.9), 'revisar'));\ntest('zero', () => assert.equal(classificarNota(0), 'revisar'));\ntest('acima de dez', () => assert.throws(() => classificarNota(11), TypeError));",
        "explanation": "O novo problema exige selecionar seus próprios limites e prever cada resultado.",
        "expected": "Quatro casos aprovados e explicação de por que 7 e 11 importam."
      }
    ],
    "mistakes": [
      "Tratar 0 como ausência usando if (!valor).",
      "Escrever expectativas somente após ver o resultado do programa.",
      "Achar que três testes aprovados cobrem toda a aplicação.",
      "Passar a chamada imediata a assert.throws em vez de uma função."
    ],
    "quiz": [
      {
        "question": "Qual entrada melhor detecta o erro de usar percentual >= 100 como inválido?",
        "options": [
          "20",
          "50",
          "100",
          "-20"
        ],
        "correctIndex": 2,
        "explanation": "A regra aceita 100; essa fronteira expõe a comparação incorreta."
      },
      {
        "question": "O que significa um teste verde?",
        "options": [
          "Todo comportamento foi provado",
          "Os casos executados concordaram com suas expectativas",
          "A interface também está acessível",
          "Não existe defeito oculto"
        ],
        "correctIndex": 1,
        "explanation": "O teste informa apenas sobre o cenário e a afirmação que foram executados."
      },
      {
        "question": "Como verificar uma exceção lançada por uma função?",
        "options": [
          "assert.equal(erro, true)",
          "assert.throws(() => funcao(), TypeError)",
          "assert.equal(funcao(), TypeError)",
          "test(erro)"
        ],
        "correctIndex": 1,
        "explanation": "assert.throws precisa receber uma função que será chamada dentro da verificação."
      }
    ],
    "summary": [
      "Contrato primeiro: entradas, retorno e erros.",
      "Classes e fronteiras fornecem casos mais úteis do que números repetidos.",
      "Uma falha aponta divergência; investigue código e expectativa.",
      "A suíte dá evidência parcial e cresce com defeitos e requisitos."
    ]
  },
"quality-ui": {
    "prerequisites": "DOM, eventos e formulários de JavaScript; testes de funções da aula anterior.",
    "setup": "Salve o exemplo como tarefas.html e abra no navegador. Não são necessários servidor nem pacotes. Atualize a página após cada alteração. Use o Console para erros e o painel Elements/Inspector para ver os nós criados. Registre cada caso numa tabela com passos, resultado esperado, resultado observado e navegador. Também execute com teclado: Tab para alcançar controle e Enter ou Espaço para ativar o botão conforme o navegador.",
    "why": "Uma função pode devolver o valor certo e a página continuar inutilizável porque o botão não foi conectado, o status não aparece ou o foco desaparece. O fluxo de interface une várias partes: entrada, evento, regra, DOM e feedback. Testar as camadas em separado ajuda a localizar falhas; repetir ações reais ajuda a encontrar problemas de integração e uso.",
    "sections": [
      {
        "title": "Escolha o nível de observação",
        "paragraphs": [
          "Teste de unidade examina uma função pequena sem interface. Teste de integração verifica se componentes cooperam, por exemplo uma entrada convertida, uma regra aplicada e um item criado no DOM. Teste de interface atravessa o caminho que uma pessoa usa: digitar, acionar botão, ler resultado e continuar. Os termos variam entre equipes; descreva sempre o que foi executado e observado. Não declare “testado” sem mencionar cenário e ambiente.",
          "No exemplo, o contrato da interface é: texto em branco não cria item e mostra mensagem; texto com espaços laterais vira item sem esses espaços; texto comum é tratado como texto, não HTML; após adicionar, o campo fica vazio e recupera foco. Isso produz casos concretos. Um clique bem sucedido não confirma o caso vazio, nem a navegação por teclado. Escolha pelo menos um sucesso, um erro e um caminho alternativo."
        ]
      },
      {
        "title": "Observe o DOM sem depender de aparência",
        "paragraphs": [
          "document.querySelector encontra um elemento. addEventListener registra uma reação ao clique. createElement cria li, textContent insere texto literal e append coloca o novo elemento na lista. Use o Inspector para confirmar que há um li, não apenas uma string visual parecida. Se digitar \u003cb>teste\u003c/b>, a página deve mostrar os caracteres como texto. Isso ilustra por que inserir dados do usuário em innerHTML seria uma escolha perigosa.",
          "Status com role=\"status\" comunica uma atualização breve a tecnologias assistivas em muitos contextos; a efetividade precisa ser verificada com tecnologia real. O label associa o nome visível ao input. Teste Tab até campo e botão e acione o controle. Foque o campo depois de adicionar para facilitar outra entrada; observe se a ordem de foco permanece lógica. Evite criar testes que encontrem elementos apenas por posição, porque uma mudança legítima de layout poderia quebrá-los."
        ]
      },
      {
        "title": "Escreva um roteiro que outra pessoa reproduza",
        "paragraphs": [
          "Um bom registro inclui estado inicial, passos e resultado. Exemplo: abra tarefas.html do zero; digite dois espaços; clique Adicionar; confira zero li, mensagem “Digite uma tarefa.” e foco no campo. Depois digite “  Ler  ”; clique; confira um li com texto “Ler”, mensagem de sucesso e campo vazio. Informe o navegador e se recarregou a página entre casos. Se a aplicação salva dados, limpe apenas a chave de teste pertinente antes de repetir.",
          "Automatizar o navegador mais tarde pode reduzir repetição, mas requer uma ferramenta de automação e suas dependências. Neste curso o roteiro é executado no navegador e não finge ser um teste automatizado. O teste de função anterior continua útil para regras complexas que possam ser extraídas da interface. Combine os dois tipos de evidência e anote o que continua sem cobertura, como leitor de tela específico ou outros dispositivos."
        ]
      },
      {
        "title": "Relate falhas com precisão",
        "paragraphs": [
          "Se algo falhar, descreva o menor caminho para reproduzir: “abrir página, digitar dois espaços, clicar Adicionar; esperado nenhum item; observado item vazio”. Inclua captura ou erro do Console quando ajudar, sem depender dela para explicar o defeito. Não escreva apenas “botão quebrado”. O mesmo relato serve para consertar e depois repetir o teste como regressão.",
          "Teste em mais de uma largura de tela e, quando houver, em dois navegadores. O layout e os eventos podem divergir em ambientes distintos. Comece com os navegadores que o projeto pretende apoiar, porque nenhuma equipe testa literalmente todas as combinações. Uma verificação visual não substitui a checagem semântica; uma inspeção de DOM não substitui a experiência de usar o fluxo."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!doctype html>\n\u003chtml lang=\"pt-BR\">\u003cmeta charset=\"utf-8\">\u003ctitle>Teste de interface\u003c/title>\n\u003clabel for=\"tarefa\">Nova tarefa\u003c/label>\n\u003cinput id=\"tarefa\">\u003cbutton id=\"adicionar\" type=\"button\">Adicionar\u003c/button>\n\u003cp id=\"status\" role=\"status\">\u003c/p>\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\nconst campo = document.querySelector('#tarefa');\nconst lista = document.querySelector('#lista');\nconst status = document.querySelector('#status');\ndocument.querySelector('#adicionar').addEventListener('click', () => {\n  const texto = campo.value.trim();\n  if (!texto) { status.textContent = 'Digite uma tarefa.'; campo.focus(); return; }\n  const item = document.createElement('li');\n  item.textContent = texto;\n  lista.append(item);\n  campo.value = '';\n  status.textContent = 'Tarefa adicionada.';\n  campo.focus();\n});\n\u003c/script>\u003c/html>",
      "explanation": [
        "O label dá nome ao campo e o botão tem texto visível.",
        "O clique valida vazio, cria li com textContent e atualiza feedback.",
        "O foco retorna ao campo nos dois caminhos, facilitando repetição pelo teclado."
      ],
      "expected": "Entrada vazia: lista sem itens e mensagem “Digite uma tarefa.”. Entrada “  Ler  ”: um li “Ler”, campo vazio, foco no campo. Texto com tags aparece literalmente."
    },
    "guided": [
      {
        "instruction": "Teste o caminho vazio a partir de página recém-aberta e conte li no Inspector.",
        "result": "Zero itens, mensagem de erro e foco no campo."
      },
      {
        "instruction": "Adicione “  Ler  ” e depois “Revisar”; observe lista e foco.",
        "result": "Dois itens, na ordem Ler e Revisar; campo limpo após cada inclusão."
      },
      {
        "instruction": "Digite \u003cb>teste\u003c/b> e confira no Inspector.",
        "result": "Um li cujo texto contém os caracteres; não aparece um elemento b interno."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: registre o teste de entrada vazia com estado inicial, passos e três observações.",
        "hints": [
          "Conte li no Inspector.",
          "Cheque também texto do status e foco."
        ],
        "solution": "Estado: página recarregada, campo vazio. Passos: clicar Adicionar. Esperado: 0 li, status “Digite uma tarefa.”, foco no input. Observado: preencher após execução.",
        "explanation": "O registro separa previsão e observação; outra pessoa consegue repetir.",
        "expected": "Tabela com quatro colunas e todas as três observações."
      },
      {
        "prompt": "Aplique: adicione “  Estudar JS  ” e verifique trim, limpeza e ordem do foco.",
        "hints": [
          "O texto visível não conserva espaços laterais.",
          "Use document.activeElement no Console se tiver dúvida sobre o foco."
        ],
        "solution": "Passos: digitar “  Estudar JS  ”, clicar Adicionar. Esperado: li.textContent === “Estudar JS”, campo.value === “”, document.activeElement === campo.",
        "explanation": "Um fluxo inclui efeito no DOM e estado de controle, não só mensagem de sucesso.",
        "expected": "Item Estudar JS sem espaços, campo vazio e foco devolvido."
      },
      {
        "prompt": "Diagnóstico: altere temporariamente item.textContent = texto para item.innerHTML = texto. Repita o caso \u003cb>teste\u003c/b>, relate a diferença e restaure.",
        "hints": [
          "Observe se surgiu um elemento b dentro de li.",
          "Compare o texto visível e a estrutura no Inspector."
        ],
        "solution": "Com innerHTML: um b interno é criado; com textContent: os caracteres \u003cb> aparecem literalmente. Restaurar item.textContent = texto.",
        "explanation": "Uma mudança controlada mostra como o teste detecta interpretação de HTML de usuário.",
        "expected": "Relato com passos, esperado, observado e correção; código restaurado."
      },
      {
        "prompt": "Transferência: acrescente botão Limpar e roteiro para lista vazia, lista com dois itens e teclado.",
        "hints": [
          "Crie um botão de type=\"button\" e localize por id.",
          "Use lista.replaceChildren() e atualize status."
        ],
        "solution": "\u003cbutton id=\"limpar\" type=\"button\">Limpar lista\u003c/button>\n\u003cscript>document.querySelector('#limpar').addEventListener('click', () => { lista.replaceChildren(); status.textContent = 'Lista limpa.'; });\u003c/script>\n// Insira o botão antes do script original ou registre o listener depois de declarar lista/status.",
        "explanation": "A solução exige integrar um novo evento e descrever cenários distintos; atenção à ordem de declaração no arquivo.",
        "expected": "Após limpar dois itens: zero li e status atualizado; limpar vazio não cria erro; botão alcançável por Tab."
      }
    ],
    "mistakes": [
      "Marcar o fluxo como aprovado apenas porque a função isolada passou.",
      "Não registrar estado inicial e confundir dados antigos com resultado novo.",
      "Testar clique com mouse e esquecer teclado/foco.",
      "Usar innerHTML para texto fornecido pelo usuário."
    ],
    "quiz": [
      {
        "question": "Uma função de cálculo passou; o botão que a chama foi validado?",
        "options": [
          "Sim, automaticamente",
          "Somente se o fluxo do botão também foi exercitado",
          "Somente se há CSS",
          "Sim, se há três testes"
        ],
        "correctIndex": 1,
        "explanation": "O teste da função não executa eventos nem atualizações do DOM."
      },
      {
        "question": "Qual resultado é esperado ao inserir \u003cb>teste\u003c/b> por textContent?",
        "options": [
          "Um elemento b criado",
          "Caracteres exibidos literalmente",
          "Script executado",
          "Texto apagado"
        ],
        "correctIndex": 1,
        "explanation": "textContent insere texto e não interpreta marcação."
      },
      {
        "question": "O que permite reproduzir uma falha de interface?",
        "options": [
          "“Não funciona”",
          "Somente uma captura",
          "Estado inicial, passos e esperado versus observado",
          "A cor do botão"
        ],
        "correctIndex": 2,
        "explanation": "Esses dados descrevem uma sequência repetível e verificável."
      }
    ],
    "summary": [
      "Teste regra e fluxo para cobrir riscos diferentes.",
      "Observe estado, DOM, feedback e foco.",
      "Registre passos e resultados antes de corrigir.",
      "Use testes manuais honestos quando não houver automação de navegador."
    ]
  },
"quality-ci": {
    "prerequisites": "Casos e afirmações com node:test; noções de Git para a parte opcional de execução remota.",
    "setup": "Salve verificacao.test.cjs em uma pasta e execute node --test verificacao.test.cjs no terminal. Observe a contagem de aprovados e o código de saída do comando (no PowerShell use $LASTEXITCODE; em shells POSIX use echo $? logo após). Para publicar a verificação, um repositório no GitHub seria necessário, mas toda a análise do arquivo e o comando local funcionam sem conta ou rede.",
    "why": "Repetir testes manualmente após cada alteração é fácil de esquecer. Integração contínua executa comandos em eventos como push ou pull request e fornece um resultado visível para a equipe. O serviço não inventa testes: ele executa os comandos que você configurou. Antes de criar o workflow, consiga rodar a mesma suíte localmente e saiba distinguir um teste vermelho de uma instalação que falhou.",
    "sections": [
      {
        "title": "Um comando confiável vem primeiro",
        "paragraphs": [
          "No exemplo, node --test verificacao.test.cjs executa três testes sem bibliotecas externas. Com todos passando, o processo termina com código de saída zero. Se uma afirmação falha, o código se torna diferente de zero; esse sinal permite a um sistema interromper uma etapa. Rode o comando duas vezes para perceber que resultados determinísticos não dependem da ordem de cliques ou de conexão externa. Fixe entradas e expectativas explícitas.",
          "Você pode criar package.json com scripts como \"test\": \"node --test\" para padronizar npm test. Isso não cria testes sozinho; apenas dá nome a um comando. Na versão de pasta com um arquivo, o comando direto basta. Um teste dependente do relógio, de serviço público ou de ordem incerta pode falhar sem mudança de código; reconheça essas dependências antes de chamar o problema de regressão."
        ]
      },
      {
        "title": "Leia um workflow pequeno",
        "paragraphs": [
          "Um arquivo .github/workflows/test.yml pode declarar on: [push, pull_request], jobs, runs-on, steps, checkout, setup-node e run: node --test. O evento diz quando começar; o job reúne passos numa máquina limpa; checkout obtém o código; setup-node seleciona a versão do runtime; run executa o mesmo comando que você testou localmente. Escreva um YAML simples e confira recuos: YAML usa indentação para representar estrutura.",
          "Se o projeto já usa dependências npm, normalmente entram package.json e package-lock.json, seguidos de npm ci antes dos testes. npm ci usa o lockfile para instalar de forma reproduzível e falha quando ele não é compatível com o manifesto. Nosso exemplo não usa dependências, então não precisa instalar pacotes. Nunca esconda credenciais no arquivo do workflow. Para uma integração com segredos, aprenda separadamente permissões e configuração do serviço."
        ]
      },
      {
        "title": "Interprete o relatório antes de consertar",
        "paragraphs": [
          "Quando o job falha, localize a primeira etapa vermelha. Se checkout ou setup-node falhou, ainda não houve execução de teste; pode ser configuração. Se o comando de teste falhou, leia nome do caso, valor esperado, valor recebido e stack. Reproduza localmente usando a mesma versão de Node. Não “corrija” uma falha removendo a afirmação sem confrontar o requisito. O relatório mostra o que aconteceu nessa execução, não uma garantia de produção.",
          "Guarde um pequeno registro: comando, versão usada, quantidade de casos, resultado e link do job quando houver. Isso permite revisão em equipe. A execução remota é especialmente útil em pull requests, mas uma aprovação automática não substitui ler a mudança e experimentar os fluxos que não estão automatizados. Se a suíte só cobre a função prioridade, ela não verifica a interface que a apresenta."
        ]
      },
      {
        "title": "Faça uma falha proposital e recupere",
        "paragraphs": [
          "Mude temporariamente o limite de pontos >= 5 para > 5. O caso “limite alto” deve falhar. Antes de restaurar, leia a diferença no terminal e classifique como regressão da regra. Refaça a execução depois de restaurar. Esse ciclo ensina o que o pipeline exibiria e confirma que o caso realmente observa a fronteira. Se o teste continuasse verde, ele não protegeria a regra que seu nome promete.",
          "Quando a equipe acrescentar uma função, acrescente casos associados no mesmo conjunto de mudanças. Mantenha o tempo da suíte razoável para que seja executada com frequência. CI é uma rotina de repetição, não um selo de correção universal. Um resultado verde é evidência de que aquelas verificações passaram naquela revisão e naquele ambiente."
        ]
      }
    ],
    "example": {
      "language": "javascript",
      "code": "// Salve como verificacao.test.cjs; rode node --test verificacao.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction prioridade(pontos) {\n  if (!Number.isInteger(pontos) || pontos \u003c 0) throw new TypeError('Pontos inválidos');\n  return pontos >= 5 ? 'alta' : 'normal';\n}\n\ntest('limite alto', () => assert.equal(prioridade(5), 'alta'));\ntest('abaixo do limite', () => assert.equal(prioridade(4), 'normal'));\ntest('negativo é erro', () => assert.throws(() => prioridade(-1), TypeError));\n",
      "explanation": [
        "O arquivo testa o limite dos dois lados e uma entrada inválida.",
        "node --test roda a suíte local; o mesmo comando pode ser usado em CI.",
        "Apenas funções nativas de Node são usadas."
      ],
      "expected": "Três testes aprovados; código de saída zero. Ao alterar >= para >, “limite alto” falha e o código de saída não é zero."
    },
    "guided": [
      {
        "instruction": "Rode o exemplo e anote contagem, falhas e código de saída.",
        "result": "3 aprovados, 0 falhas e saída 0."
      },
      {
        "instruction": "Troque >= 5 por > 5 e rode outra vez.",
        "result": "O caso de fronteira falha; a saída é não zero."
      },
      {
        "instruction": "Restaure e desenhe a sequência evento → job → checkout → Node → teste.",
        "result": "O comando local é a etapa final executada pelo job."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: escreva o conteúdo mínimo de .github/workflows/test.yml para rodar node --test em push.",
        "hints": [
          "Use jobs, runs-on e steps.",
          "Inclua checkout e setup-node antes de run."
        ],
        "solution": "name: Testes\non: [push]\njobs:\n  verificar:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '22'\n      - run: node --test verificacao.test.cjs",
        "explanation": "O workflow declara gatilho, ambiente, obtenção do código, runtime e comando; as versões das actions devem ser revistas quando usado de fato.",
        "expected": "YAML estruturalmente legível; rodaria o mesmo comando local em cada push quando publicado."
      },
      {
        "prompt": "Aplique: crie um package.json com script test e rode npm test localmente.",
        "hints": [
          "O valor do script é node --test verificacao.test.cjs.",
          "Não é preciso instalar pacote."
        ],
        "solution": "{\"private\":true,\"scripts\":{\"test\":\"node --test verificacao.test.cjs\"}}",
        "explanation": "npm test apenas delega ao comando definido; permite padronizar em equipe.",
        "expected": "npm test termina com três testes aprovados e código de saída zero."
      },
      {
        "prompt": "Diagnóstico: mude a expectativa de prioridade(4) para alta. Classifique a falha e depois repare.",
        "hints": [
          "Leia o nome do caso vermelho.",
          "O contrato diz que 4 é normal."
        ],
        "solution": "// A falha é da expectativa do teste, não de prioridade.\n// Restaure assert.equal(prioridade(4), 'normal');",
        "explanation": "Uma falha pode vir do teste; a regra escrita resolve a dúvida.",
        "expected": "Uma falha antes e todos os testes verdes após restauração."
      },
      {
        "prompt": "Transferência: adicione novo requisito: 10 ou mais pontos devolvem urgente; escreva testes para 9 e 10 e atualize a função.",
        "hints": [
          "Teste primeiro os dois lados da nova fronteira.",
          "Depois acrescente if (pontos >= 10)."
        ],
        "solution": "test('nove ainda é alta', () => assert.equal(prioridade(9), 'alta'));\ntest('dez é urgente', () => assert.equal(prioridade(10), 'urgente'));\n// Na função, após validação: if (pontos >= 10) return 'urgente';",
        "explanation": "O novo requisito aparece primeiro em casos observáveis e depois na implementação.",
        "expected": "Cinco testes aprovados, incluindo as duas novas fronteiras."
      }
    ],
    "mistakes": [
      "Criar workflow sem confirmar o comando local.",
      "Tratar erro de instalação como falha de regra.",
      "Remover teste vermelho sem comparar com o requisito.",
      "Achar que CI substitui revisão humana ou testes de interface."
    ],
    "quiz": [
      {
        "question": "O workflow encontrou falha em setup-node; a suíte foi executada?",
        "options": [
          "Sim",
          "Não necessariamente; falhou antes do comando",
          "Sempre",
          "Somente no navegador"
        ],
        "correctIndex": 1,
        "explanation": "A etapa de preparação precisa completar antes da etapa run."
      },
      {
        "question": "O que um resultado verde significa?",
        "options": [
          "Aplicação sem defeitos",
          "Comandos configurados passaram naquele ambiente",
          "Todos os dispositivos foram testados",
          "Requisito ficou correto por definição"
        ],
        "correctIndex": 1,
        "explanation": "CI executa um conjunto definido de comandos e apresenta o resultado dessa execução."
      },
      {
        "question": "O que faz npm test?",
        "options": [
          "Baixa testes oficiais",
          "Executa o script test de package.json",
          "Publica o site",
          "Cria lockfile obrigatório"
        ],
        "correctIndex": 1,
        "explanation": "O script define qual comando será rodado."
      }
    ],
    "summary": [
      "Faça a suíte local funcionar antes da automação remota.",
      "Leia o estágio que falhou antes de agir.",
      "Use fronteiras para demonstrar regressões.",
      "CI amplia repetição e visibilidade; não prova completude."
    ]
  },
"quality-debug": {
    "prerequisites": "Funções e arrays JavaScript; aula de testes com node:test.",
    "setup": "Salve erro.test.cjs e rode node --test erro.test.cjs. O terceiro teste deve falhar de propósito; ele representa um requisito novo: propriedades ausentes não contam como pendentes. Para praticar a investigação em um projeto com arquivos separados e código preexistente, abra labs/bug-investigation/README.md. Para depurar no Node, registre valores temporariamente com console.log ou use node inspect. Para interface no navegador, abra DevTools e marque breakpoint na linha de decisão. Faça alterações apenas depois de registrar hipótese e comportamento.",
    "why": "Manutenção começa quando alguém encontra um comportamento inesperado num código que já existe. Mudar linhas por tentativa pode esconder o sintoma e criar outro defeito. A rotina útil é reproduzir, reduzir o cenário, observar dados, identificar a causa, estabelecer uma expectativa que falha e corrigir. Um teste de regressão preserva o aprendizado sobre aquele defeito para futuras alterações.",
    "sections": [
      {
        "title": "Faça o sintoma virar caso mínimo",
        "paragraphs": [
          "Um relato útil descreve entrada, passos, resultado esperado e resultado observado. “Contador errado” é ambíguo. “Com a lista [{}], o contador mostra 1; a regra atual diz que apenas concluida === false conta como pendente, portanto espero 0” é reproduzível. Confirme a regra com quem definiu o produto, porque um campo ausente pode significar “desconhecido” em outro projeto. Não esconda a decisão dentro de um operador lógico sem explicá-la.",
          "Reduza o conjunto de dados até a menor entrada que ainda revela o problema. Se vinte aulas produzem contagem incorreta, teste uma aula vazia, uma concluída e uma pendente. O exemplo já contém dois casos verdes e um vermelho. Essa diferença indica que a função falha para ausência de propriedade, não para todas as entradas. Repetir o caso antes de editar evita perseguir um efeito temporário ou dados antigos."
        ]
      },
      {
        "title": "Observe valores e forme hipótese",
        "paragraphs": [
          "O predicado !aula.concluida converte o valor para boolean e o inverte. Quando a propriedade não existe, o valor é undefined, considerado falso; a negação produz true. Essa é uma hipótese causal verificável. Acrescente temporariamente console.log(aula.concluida, !aula.concluida) e confirme undefined true no caso vermelho. Em navegador, pause no breakpoint para ler o valor da expressão e o caminho tomado. Observe antes de alterar.",
          "DevTools oferece breakpoints em linha, inspeção de variáveis e execução passo a passo. Use uma pausa perto da decisão, não dezenas de logs espalhados. Ao depurar erro assíncrono, cheque também a ordem de eventos e promessas. Registre qual dado entrou, qual ramo foi escolhido e qual saída surgiu. A causa está no predicado de seleção; o teste só a torna visível."
        ]
      },
      {
        "title": "Corrija a regra e teste ao redor",
        "paragraphs": [
          "Se o contrato diz que apenas false explícito é pendente, substitua !aula.concluida por aula.concluida === false. Rode os três casos. Acrescente outro para null e, se a regra o exigir, para uma string “false”. A comparação estrita mantém esses valores diferentes de false. Se o dado vem de API ou armazenamento, pode ser mais adequado validar seu formato antes da contagem. O ponto é escolher uma política explícita e testá-la.",
          "Execute a suíte inteira depois da correção. O terceiro caso deve ficar verde e os dois anteriores continuar verdes. Se outro caso quebrar, a mudança alterou comportamento existente; investigue antes de aceitar. Retire logs temporários, mas mantenha o teste de regressão com nome que lembre a causa. Um patch pequeno e uma explicação objetiva são mais fáceis de revisar do que uma reescrita ampla durante a urgência."
        ]
      },
      {
        "title": "Documente o impacto",
        "paragraphs": [
          "Num ticket ou revisão, anote sintomas, causa, correção, comandos executados e risco restante. Exemplo: “Lista com concluida ausente aparecia como pendente porque !undefined é true. Usei comparação estrita. Três testes passaram; não validei ainda dados legados de armazenamento”. Essa última frase evita transformar uma verificação parcial em promessa total. Se a mudança afeta interface, repita o roteiro de uso correspondente.",
          "A sequência falha → correção → passa é evidência mais forte de que o teste protege a causa do que apenas um teste verde escrito após a correção. Ao receber relato de usuário, não espere que ele saiba a linha de código. Peça ou descubra passos, ambiente e dados necessários para reproduzir. Trate dados pessoais de relatórios com cuidado; troque-os por exemplos mínimos antes de compartilhar."
        ]
      }
    ],
    "example": {
      "language": "javascript",
      "code": "// Salve como erro.test.cjs; execute node --test erro.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction contarPendentes(aulas) {\n  return aulas.filter(aula => !aula.concluida).length;\n}\n\ntest('conta aula pendente', () => {\n  assert.equal(contarPendentes([{ concluida: false }]), 1);\n});\ntest('não conta aula concluída', () => {\n  assert.equal(contarPendentes([{ concluida: true }]), 0);\n});\ntest('contrato novo: concluida ausente não é pendente', () => {\n  assert.equal(contarPendentes([{}]), 0);\n});\n",
      "explanation": [
        "Dois testes documentam casos já atendidos.",
        "O terceiro falha intencionalmente e demonstra !undefined === true.",
        "Trocar para === false atende à regra explícita sem alterar os casos anteriores."
      ],
      "expected": "Antes: 2 aprovados e 1 falha. Depois de trocar o filtro por aula.concluida === false: 3 aprovados e 0 falhas."
    },
    "guided": [
      {
        "instruction": "Rode o arquivo sem alterações e copie o nome do teste vermelho e a diferença.",
        "result": "O terceiro caso esperava 0, recebeu 1."
      },
      {
        "instruction": "Avalie no Console ou terminal undefined, !undefined e undefined === false.",
        "result": "undefined; true; false. Isso explica o ramo escolhido."
      },
      {
        "instruction": "Troque o predicado pela comparação estrita e rode de novo.",
        "result": "Os três casos passam; o log temporário pode ser removido."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: escreva o relato do defeito com lista de entrada, esperado e observado.",
        "hints": [
          "Use [{}] como menor dado.",
          "Indique o contrato de false explícito."
        ],
        "solution": "Entrada: [{}]. Esperado: 0 pendentes. Observado: 1. Passos: executar contarPendentes([{}]). Causa candidata: negação de undefined.",
        "explanation": "O relato separa dado, regra e hipótese.",
        "expected": "Outra pessoa reproduz a divergência sem acesso ao código completo."
      },
      {
        "prompt": "Aplique: corrija o filtro e crie teste para concluida: null.",
        "hints": [
          "Use === false.",
          "O resultado para null também deve ser zero."
        ],
        "solution": "function contarPendentes(aulas) { return aulas.filter(aula => aula.concluida === false).length; }\ntest('null não é false', () => assert.equal(contarPendentes([{ concluida: null }]), 0));",
        "explanation": "A comparação estrita codifica a política e o novo teste cobre valor ausente alternativo.",
        "expected": "Quatro testes aprovados, incluindo null."
      },
      {
        "prompt": "Diagnóstico: substitua temporariamente === false por == false. Qual entrada nova pode falhar?",
        "hints": [
          "Pense em 0.",
          "0 == false é true, mas 0 === false é false."
        ],
        "solution": "test('zero não é boolean false', () => assert.equal(contarPendentes([{ concluida: 0 }]), 0));\n// Com == false o caso falha; restaure === false.",
        "explanation": "A coerção da igualdade frouxa amplia entradas aceitas de modo não intencional.",
        "expected": "Falha observada com == e suíte verde após restaurar ===."
      },
      {
        "prompt": "Transferência: escreva um pequeno relatório de correção com causa, alteração, testes e risco restante.",
        "hints": [
          "Mencione o predicado original e o novo.",
          "Inclua comando exato e casos cobertos."
        ],
        "solution": "Causa: !undefined retornava true. Correção: apenas concluida === false conta. Validação: node --test erro.test.cjs, casos falso, verdadeiro, ausente, null e zero passam. Risco restante: contrato de dados recebidos de API não foi validado.",
        "explanation": "A conclusão distingue evidência obtida de trabalho ainda não feito.",
        "expected": "Relatório curto, reproduzível e sem alegação de cobertura total."
      }
    ],
    "mistakes": [
      "Consertar sem reproduzir o sintoma.",
      "Confundir hipótese com causa demonstrada.",
      "Apagar teste que falha em vez de confrontar requisito.",
      "Esquecer de rodar a suíte após uma correção localizada."
    ],
    "quiz": [
      {
        "question": "Por que !aula.concluida seleciona {}?",
        "options": [
          "undefined é true",
          "!undefined é true",
          "filter sempre inclui objetos",
          "=== converte tipo"
        ],
        "correctIndex": 1,
        "explanation": "A propriedade ausente produz undefined, um valor falsy, que vira true com !."
      },
      {
        "question": "Qual sequência melhor sustenta uma correção?",
        "options": [
          "Editar e encerrar",
          "Relatar, reproduzir, observar, testar falha, corrigir e repetir testes",
          "Apagar todos os testes",
          "Copiar código novo"
        ],
        "correctIndex": 1,
        "explanation": "Cada etapa reduz ambiguidade e preserva evidência para regressões."
      },
      {
        "question": "O que registrar como risco restante?",
        "options": [
          "Nada, se houve um caso verde",
          "Cenários não verificados, como dados legados ou outra interface",
          "Apenas a cor da tela",
          "Opinião sem caso"
        ],
        "correctIndex": 1,
        "explanation": "O relatório deve refletir o alcance real da verificação."
      }
    ],
    "summary": [
      "Reproduza com o menor dado que revela o defeito.",
      "Observe valores e confirme a hipótese causal.",
      "Mantenha o teste que falhou como proteção contra regressão.",
      "Relate o que foi e o que não foi verificado."
    ]
  },
"quality-refactor": {
    "prerequisites": "Funções, módulos básicos e teste automatizado; Node instalado.",
    "setup": "Salve refatoracao.test.cjs e rode node --test refatoracao.test.cjs. Depois use uma pasta de exercício para separar classificar.cjs e classificar.test.cjs. Não é necessário npm install para esses arquivos: só usam módulos nativos. package.json e lockfile serão estudados conceitualmente e somente criados quando houver dependência real.",
    "why": "Projetos crescem e ficam difíceis de alterar quando regras, interface, rede e armazenamento se misturam. Refatorar muda a forma interna mantendo o mesmo comportamento externo. Antes de mover código, fixe o contrato e os casos que precisam continuar passando. Dependências também fazem parte da manutenção: versões diferentes podem produzir resultados diferentes, então a equipe precisa saber o que instalou e como reconstruir o ambiente.",
    "sections": [
      {
        "title": "Defina o que deve permanecer",
        "paragraphs": [
          "No exemplo, classificar recebe número finito não negativo e devolve pequeno abaixo de 50, médio de 50 a 99.999… e grande a partir de 100. Entrada inválida lança TypeError. Os testes cobrem as três bordas visíveis e um erro. Antes de dividir o arquivo, execute a suíte. Após a divisão, os mesmos testes devem passar. Esse é um primeiro sinal de preservação, embora não cubra todas as entradas possíveis. Acrescente 49.9 e 99.9 se a regra aceitar decimais.",
          "Uma alteração que muda o limite de 100 para 120 não é refatoração: é mudança de comportamento e exige novo requisito e novos testes. Renomear variáveis, extrair função e separar arquivos podem ser refatorações quando as entradas e saídas permanecem. Faça passos pequenos para saber qual alteração causou uma falha. Explique em revisão por que cada módulo existe, não só que o arquivo ficou menor."
        ]
      },
      {
        "title": "Separe responsabilidade e verifique",
        "paragraphs": [
          "Crie classificar.cjs com a função e module.exports = { classificar }. Em classificar.test.cjs, importe com require(\"./classificar.cjs\") e mantenha os testes. No CommonJS, require carrega o módulo e module.exports define a interface pública. O teste não precisa conhecer os detalhes internos do arquivo. Depois rode node --test classificar.test.cjs. Se surgir “classificar is not a function”, revise exportação/importação antes de mudar a regra.",
          "Para aplicação web, uma separação equivalente costuma colocar regra pura em módulo e a manipulação do DOM em outro; módulos ES usam export/import e normalmente são servidos por servidor local ao testar no navegador. Não confunda separar arquivos com melhorar o desenho: se o módulo de regra ainda acessa document ou localStorage sem necessidade, continua acoplado. Passe dados como parâmetros e devolva resultado. Isso facilita testes e reutilização."
        ]
      },
      {
        "title": "Entenda manifesto e lockfile",
        "paragraphs": [
          "package.json declara nome, scripts e dependências desejadas. package-lock.json registra o grafo de versões resolvidas para npm, tornando instalações mais reproduzíveis. Ambos devem ser revisados e versionados quando o projeto usa dependências npm. npm ci instala a partir de um lockfile coerente e normalmente é usado em CI. Não edite versões resolvidas à mão para “consertar” um conflito; use os comandos adequados e revise o diff. O diretório node_modules costuma ser reconstruído e não versionado.",
          "Nos exemplos desta trilha, node:test e assert são módulos nativos, sem dependências externas. Não crie lockfile só para fingir maturidade. Ao adicionar uma biblioteca real no futuro, avalie necessidade, licença, manutenção, tamanho e segurança. Mantenha versões e scripts compreensíveis para outra pessoa repetir os testes. Quando atualizar dependências, rode testes e verifique mudanças de comportamento relevantes."
        ]
      },
      {
        "title": "Faça uma revisão pequena",
        "paragraphs": [
          "Uma revisão útil pergunta: a regra pública permaneceu? O nome do módulo indica responsabilidade? O teste ainda protege fronteiras? Há alguma dependência nova sem justificativa? O diff mostra só extração ou também mudanças de comportamento? Se misturar refatoração com requisito novo, divida em passos ou descreva com clareza. Isso reduz custo de encontrar a causa de eventual regressão.",
          "Comunique a alteração em linguagem de usuário e de código: “A classificação por faixas permanece igual; movi a função para um módulo importável para que a interface e os testes usem a mesma regra. Rodei node --test classificar.test.cjs”. Um colega pode revisar a intenção, executar a evidência e apontar lacunas. Refatoração é trabalho de manutenção, não um prêmio por usar mais arquivos."
        ]
      }
    ],
    "example": {
      "language": "javascript",
      "code": "// Salve como refatoracao.test.cjs; execute node --test refatoracao.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction classificar(valor) {\n  if (!Number.isFinite(valor) || valor \u003c 0) throw new TypeError('Valor inválido');\n  if (valor >= 100) return 'grande';\n  if (valor >= 50) return 'médio';\n  return 'pequeno';\n}\n\ntest('três faixas', () => {\n  assert.equal(classificar(0), 'pequeno');\n  assert.equal(classificar(50), 'médio');\n  assert.equal(classificar(100), 'grande');\n});\ntest('entrada inválida', () => assert.throws(() => classificar(NaN), TypeError));\n",
      "explanation": [
        "A função reúne validação e regra numa unidade pequena.",
        "Os testes registram comportamentos que a extração precisa preservar.",
        "A etapa seguinte move a função para classificar.cjs e mantém a mesma saída."
      ],
      "expected": "No arquivo inicial, 2 testes aprovados. Após separação correta, os mesmos testes passam em classificar.test.cjs."
    },
    "guided": [
      {
        "instruction": "Execute o exemplo e acrescente casos para 49.9 e 99.9.",
        "result": "Ambos retornam pequeno e médio, respectivamente."
      },
      {
        "instruction": "Copie a função para classificar.cjs, exporte e importe no teste.",
        "result": "A suíte preserva as saídas; o teste não duplica a regra."
      },
      {
        "instruction": "Leia um package.json de projeto próprio e identifique scripts versus dependencies.",
        "result": "Scripts nomeiam comandos; dependencies listam pacotes necessários à execução conforme o projeto."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: crie classificar.cjs com exportação CommonJS e ajuste o teste para importar.",
        "hints": [
          "Use module.exports = { classificar }.",
          "No teste, require(\"./classificar.cjs\")."
        ],
        "solution": "// classificar.cjs: module.exports = { classificar };\n// classificar.test.cjs: const { classificar } = require('./classificar.cjs');",
        "explanation": "A interface pública permite que teste e aplicativo reutilizem a mesma função.",
        "expected": "Dois testes continuam passando após remover a função duplicada do teste."
      },
      {
        "prompt": "Aplique: acrescente casos de fronteira 49.9 e 99.9 antes de reorganizar condições.",
        "hints": [
          "Use assert.equal.",
          "Um caso espera pequeno; outro, médio."
        ],
        "solution": "test('fronteiras decimais', () => { assert.equal(classificar(49.9), 'pequeno'); assert.equal(classificar(99.9), 'médio'); });",
        "explanation": "Os novos casos cobrem o intervalo entre limites inteiros.",
        "expected": "Todos os casos aprovados; saídas pequeno e médio."
      },
      {
        "prompt": "Diagnóstico: após a extração aparece “classificar is not a function”. Escreva três verificações antes de mudar a regra.",
        "hints": [
          "Verifique caminho e grafia.",
          "Confira module.exports e desestruturação no require."
        ],
        "solution": "1. O arquivo é ./classificar.cjs? 2. Ele exporta { classificar }? 3. O teste usa const { classificar } = require(...) com a mesma grafia?",
        "explanation": "O erro é de conexão entre módulos, não uma evidência de regra incorreta.",
        "expected": "Checklist identifica a incompatibilidade de export/import."
      },
      {
        "prompt": "Transferência: descreva plano para adicionar biblioteca de datas a projeto existente e as evidências após a mudança.",
        "hints": [
          "Primeiro justifique a necessidade real.",
          "Inclua manifesto, lockfile, testes e revisão do tamanho/segurança."
        ],
        "solution": "Plano: verificar se Date/Intl nativos bastam; se não, escolher pacote mantido e licença adequada; instalar via npm; revisar package.json e package-lock.json; executar npm ci em ambiente limpo, testes e fluxo de interface; revisar diff e documentar motivo.",
        "explanation": "Dependência é decisão de manutenção com custo, versões e validação.",
        "expected": "Plano reproduzível que não instala pacote sem justificativa."
      }
    ],
    "mistakes": [
      "Chamar mudança de regra de refatoração.",
      "Copiar a função para o teste em vez de importar o módulo real.",
      "Instalar biblioteca para resolver problema atendido por API nativa simples.",
      "Versionar node_modules no lugar do lockfile."
    ],
    "quiz": [
      {
        "question": "Mover a função para módulo sem alterar entradas e saídas é, em princípio:",
        "options": [
          "Mudança de requisito",
          "Refatoração",
          "Publicação",
          "Teste de acessibilidade"
        ],
        "correctIndex": 1,
        "explanation": "A estrutura interna muda e o contrato observável é preservado."
      },
      {
        "question": "O que o lockfile do npm registra?",
        "options": [
          "Somente texto de README",
          "Árvore de dependências resolvidas",
          "Capturas de tela",
          "Segredos de acesso"
        ],
        "correctIndex": 1,
        "explanation": "Ele permite reconstruir a instalação de forma mais reproduzível."
      },
      {
        "question": "Após extração, o teste falha com “is not a function”. Onde verificar primeiro?",
        "options": [
          "Cor do CSS",
          "Exportação e importação do módulo",
          "Banco de dados",
          "Largura da tela"
        ],
        "correctIndex": 1,
        "explanation": "A falha sugere que a função importada não é a esperada."
      }
    ],
    "summary": [
      "Refatoração preserva comportamento acordado.",
      "Testes de fronteira ajudam a proteger extrações.",
      "Módulos expressam responsabilidade e interface pública.",
      "Dependências e lockfile fazem parte da reprodutibilidade."
    ]
  },
"quality-review": {
    "prerequisites": "HTML semântico, CSS de foco, eventos/DOM e roteiro de teste da trilha.",
    "setup": "Salve como revisao.html e abra no navegador. Execute um roteiro de busca com mouse e teclado. No DevTools, use Elements/Inspector para estrutura, Console para erros e Performance para observar o fluxo quando necessário. Faça uma revisão escrita de cinco itens: nome dos controles, ordem de foco, inserção de texto, estado vazio e custo de filtros repetidos. Não é necessário instalar biblioteca.",
    "why": "Um projeto pode estar funcional e ainda impedir uso por teclado, interpretar dados como HTML ou travar com muitos itens. O primeiro trabalho de revisão de um dev júnior é reconhecer esses riscos, reproduzir exemplos e relatar evidências. Diretrizes como WCAG ajudam a aprofundar acessibilidade, mas esta aula oferece uma triagem inicial, não uma certificação de conformidade. Segurança e desempenho também exigem análises maiores em projetos reais.",
    "sections": [
      {
        "title": "Comece pelo caminho da pessoa",
        "paragraphs": [
          "Percorra a página com Tab e Shift+Tab. O campo precisa de rótulo visível, o botão deve ter nome compreensível e o foco deve ser perceptível. Verifique se Enter ou Espaço ativam o botão conforme o controle e se o texto de status muda de modo legível. role=\"status\" sinaliza atualização, mas não substitui teste com leitor de tela real. Confira estrutura h1 e main. Um elemento visualmente destacado não vira botão só por receber cursor de mão.",
          "Teste um termo com resultado, um termo sem resultado e entrada vazia. No exemplo, vazio retorna todos os itens; essa é uma decisão de produto que deve estar escrita nos requisitos. Caso se deseje mostrar mensagem própria para vazio, registre a alteração e teste. Acessibilidade não é um atributo isolado: envolve ordem, semântica, contraste, tamanho de alvo, mensagens e comportamento dinâmico. Use a referência WCAG para requisitos completos."
        ]
      },
      {
        "title": "Trate dados de fora como não confiáveis",
        "paragraphs": [
          "O exemplo cria li e atribui item.textContent = titulo. Isso mostra texto sem interpretar marcação. Se títulos vierem de usuário ou serviço externo, evite interpolá-los em innerHTML. Um texto como \u003cimg src=x onerror=...> não deve virar elemento ativo. No exercício, substitua temporariamente um título por “\u003cb>teste\u003c/b>” e observe caracteres literais. Essa escolha reduz um risco de injeção nesse ponto; não constitui uma revisão de segurança completa.",
          "Valide entradas na fronteira onde chegam e também onde o dado produz efeito. Um filtro deve limitar tamanho se o conjunto for muito grande; uma API precisa autenticação e autorização no servidor quando dados são restritos. Nunca trate chave pública de front-end como segredo. Um dev júnior deve saber relatar “esta interface usa textContent, mas não examinei o backend”. Essa precisão ajuda a equipe priorizar verificações reais."
        ]
      },
      {
        "title": "Meça o custo antes de otimizar",
        "paragraphs": [
          "O filtro percorre o array uma vez e cria um li por resultado. Para três tarefas o custo é desprezível. Para milhares de itens e cada tecla digitada, o trabalho de filtragem e recriação pode causar atraso perceptível. Primeiro reproduza com dados de tamanho relevante e meça usando ferramentas do navegador. Anote duração, dispositivo e cenário; depois decida se precisa limitar resultados, adiar busca ou reutilizar elementos. Otimizações sem medida podem complicar código sem benefício.",
          "Também observe rede e recursos quando houver: imagens sem dimensionamento adequado, fontes extras e scripts pesados podem atrasar a experiência. Esta página não usa recursos externos, então o teste de rede é simples; a lição é escolher a métrica ligada ao problema relatado. Uma interface que “parece lenta” pode estar esperando API, processando dados ou renderizando nós demais. Identifique etapa antes de trocar algoritmo."
        ]
      },
      {
        "title": "Faça revisão colaborativa com evidência",
        "paragraphs": [
          "Em revisão de código, descreva risco e cenário. Em vez de “ruim”, diga “com foco no campo e entrada vazia, a busca mostra todos os itens; o requisito prevê esse comportamento?”. Se encontrar falha de teclado, registre passos, esperado e observado. Priorize correções que bloqueiam fluxo essencial ou expõem dados. Um comentário pode propor um teste específico ou referência à diretriz; não precisa impor preferência de estilo sem efeito no usuário.",
          "Ao entregar, relate o que foi checado e o que falta: “Testei teclado e estados com e sem resultados no navegador X, conferi uso de textContent e não observei problema no conjunto pequeno. Não medi em celular real nem usei leitor de tela.” Essa frase dá contexto para outra pessoa continuar. Não confunda checklist inicial com auditoria WCAG, análise de ameaças ou teste de carga formal. Aprender a declarar limites é parte do trabalho profissional."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!doctype html>\n\u003chtml lang=\"pt-BR\">\u003cmeta charset=\"utf-8\">\u003ctitle>Revisão de qualidade\u003c/title>\n\u003cstyle>body{font:1rem/1.5 system-ui;max-width:42rem;margin:2rem auto;padding:1rem}button:focus-visible{outline:3px solid #153fcf;outline-offset:3px}\u003c/style>\n\u003cmain>\u003ch1>Consulta de tarefas\u003c/h1>\n\u003clabel for=\"busca\">Buscar por título\u003c/label>\n\u003cinput id=\"busca\" autocomplete=\"off\">\u003cbutton type=\"button\" id=\"filtrar\">Buscar\u003c/button>\n\u003cp id=\"status\" role=\"status\">\u003c/p>\u003cul id=\"resultados\">\u003c/ul>\u003c/main>\n\u003cscript>\nconst tarefas = ['Estudar HTML', 'Testar JavaScript', 'Revisar CSS'];\ndocument.querySelector('#filtrar').addEventListener('click', () => {\n  const termo = document.querySelector('#busca').value.trim().toLocaleLowerCase('pt-BR');\n  const lista = document.querySelector('#resultados');\n  lista.replaceChildren();\n  const encontrados = tarefas.filter(t => t.toLocaleLowerCase('pt-BR').includes(termo));\n  for (const titulo of encontrados) {\n    const item = document.createElement('li'); item.textContent = titulo; lista.append(item);\n  }\n  document.querySelector('#status').textContent = `${encontrados.length} resultado(s).`;\n});\n\u003c/script>\u003c/html>",
      "explanation": [
        "O label nomeia o campo e o foco possui contorno explícito.",
        "textContent apresenta títulos sem interpretá-los como HTML.",
        "A lista é reconstruída e o status relata a contagem; o comportamento vazio precisa estar no contrato."
      ],
      "expected": "Buscar “Java” mostra um item; buscar “xyz” mostra zero; campo vazio mostra os três. Navegação por Tab alcança campo e botão com foco visível."
    },
    "guided": [
      {
        "instruction": "Execute buscas com termo presente, ausente e vazio; anote resultado previsto e observado.",
        "result": "1, 0 e 3 itens, respectivamente, com status coerente."
      },
      {
        "instruction": "Navegue só com teclado e observe foco.",
        "result": "Campo e botão recebem foco visível em ordem lógica."
      },
      {
        "instruction": "Acrescente título literal “\u003cb>teste\u003c/b>” ao array e procure por teste.",
        "result": "A marcação aparece como texto literal porque a saída usa textContent."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: crie checklist de revisão para o exemplo com cinco itens verificáveis.",
        "hints": [
          "Inclua teclado e rótulo.",
          "Inclua estado vazio, inserção de dados e feedback."
        ],
        "solution": "1. label associa-se a busca. 2. Tab chega ao campo e botão; foco visível. 3. Termo sem resultado mostra zero. 4. Texto com tags aparece literal. 5. status anuncia número coerente.",
        "explanation": "Cada item descreve comportamento observável, não opinião vaga.",
        "expected": "Cinco verificações com observado e ambiente anotados."
      },
      {
        "prompt": "Aplique: altere a busca para pesquisar também ao pressionar Enter no campo sem duplicar lógica.",
        "hints": [
          "Extraia função filtrarTarefas.",
          "Conecte click e keydown à mesma função."
        ],
        "solution": "const tarefas = ['Estudar HTML', 'Testar JavaScript', 'Revisar CSS'];\nfunction filtrarTarefas() {\n  const termo = document.querySelector('#busca').value.trim().toLocaleLowerCase('pt-BR');\n  const lista = document.querySelector('#resultados');\n  lista.replaceChildren();\n  const encontrados = tarefas.filter(t => t.toLocaleLowerCase('pt-BR').includes(termo));\n  for (const titulo of encontrados) {\n    const item = document.createElement('li');\n    item.textContent = titulo;\n    lista.append(item);\n  }\n  document.querySelector('#status').textContent = `${encontrados.length} resultado(s).`;\n}\ndocument.querySelector('#filtrar').addEventListener('click', filtrarTarefas);\ndocument.querySelector('#busca').addEventListener('keydown', evento => {\n  if (evento.key === 'Enter') filtrarTarefas();\n});",
        "explanation": "Substitua todo o script original pelo código da solução. Clique e Enter chamam a mesma função, evitando duas implementações divergentes.",
        "expected": "Ambas as ações produzem a mesma lista e status para termo igual."
      },
      {
        "prompt": "Diagnóstico: substitua temporariamente item.textContent = titulo por item.innerHTML = titulo e adicione título \u003cb>teste\u003c/b>. Relate risco e restaure.",
        "hints": [
          "Use o Inspector para verificar se surgiu b interno.",
          "Não execute texto vindo de fontes não confiáveis."
        ],
        "solution": "Relato: innerHTML interpretou marcação e criou elemento b; textContent a mantém literal. Restaurar textContent.",
        "explanation": "A observação mostra um vetor de interpretação de HTML nesse ponto, sem afirmar auditoria completa.",
        "expected": "Antes há elemento b; depois há apenas caracteres literais no li."
      },
      {
        "prompt": "Transferência: redija comentário de revisão sobre desempenho para uma lista de 10 mil tarefas e proponha uma medição.",
        "hints": [
          "Descreva o cenário antes de sugerir otimização.",
          "Indique ferramenta e métrica observável."
        ],
        "solution": "Comentário: “Com 10 mil tarefas, a busca a cada ação reconstrói milhares de li. Podemos medir tempo da ação no painel Performance em desktop e celular antes de decidir limitar resultados ou paginar? Incluirei cenário com termo amplo e tempo observado.”",
        "explanation": "Uma revisão útil relaciona risco, reprodução, medição e possível ação.",
        "expected": "Comentário construtivo e plano de medida sem alegar lentidão já comprovada."
      }
    ],
    "mistakes": [
      "Declarar conformidade WCAG após passar checklist curto.",
      "Inserir entrada externa com innerHTML sem necessidade.",
      "Otimizar sem cenário e medição.",
      "Revisar código apenas por estilo, ignorando uso real e risco."
    ],
    "quiz": [
      {
        "question": "Qual propriedade exibe texto de usuário sem interpretá-lo como HTML?",
        "options": [
          "innerHTML",
          "textContent",
          "outerHTML",
          "insertAdjacentHTML"
        ],
        "correctIndex": 1,
        "explanation": "textContent produz nó de texto, preservando caracteres da entrada."
      },
      {
        "question": "Um checklist de teclado aprovado equivale a auditoria WCAG?",
        "options": [
          "Sim",
          "Não, é uma parte da verificação",
          "Sim, se o botão é azul",
          "Sim, com duas larguras"
        ],
        "correctIndex": 1,
        "explanation": "Acessibilidade exige critérios e tecnologias adicionais."
      },
      {
        "question": "Qual primeira resposta à queixa “busca lenta” é mais útil?",
        "options": [
          "Trocar tudo imediatamente",
          "Medir um cenário reproduzível e localizar custo",
          "Remover filtros",
          "Esconder a lista"
        ],
        "correctIndex": 1,
        "explanation": "A medição aponta onde e quando há atraso antes de escolher solução."
      }
    ],
    "summary": [
      "Revise teclado, semântica, feedback e estados.",
      "Exiba dados de fora como texto quando não precisar de HTML.",
      "Meça cenários reais antes de otimizar.",
      "Relate evidências e limites com precisão."
    ]
  }
});

// Recuperação após erro no quiz: novo contexto com evidência observável.
(() => {
  const retries = {
    "quality-cases": {
      prompt: "Crie uma função calcularFrete(peso) com contrato explícito: peso finito de 0 a 20; até 2 kg custa 5, acima disso custa 12; valor fora da faixa gera TypeError. Escreva testes de fronteira antes da implementação.",
      expected: "Os testes cobrem 0, 2, um valor logo acima de 2, 20 e entradas inválidas; cada expectativa foi definida pelo contrato, e a suíte passa após implementar a regra.",
      hint: "Escolha casos em que uma mudança de < para <= alteraria o resultado."
    },
    "quality-ui": {
      prompt: "Teste manualmente um formulário de lembrete com campo de título e botão Salvar. Registre estado inicial, passos e resultados para título só com espaços, título válido e navegação apenas por teclado.",
      expected: "O caso inválido preserva o texto e mostra orientação; o válido cria um item uma única vez e anuncia sucesso; Tab e Enter permitem concluir o fluxo, com foco visível.",
      hint: "Observe DOM, mensagem, quantidade de itens e destino do foco após cada ação."
    },
    "quality-ci": {
      prompt: "Uma suíte local passa, mas a CI falha antes de executar testes porque a instalação de dependências não terminou. Registre a etapa exata, reproduza a falha em ambiente limpo e proponha uma correção verificável.",
      expected: "O relato distingue falha de preparação de teste reprovado; a correção é validada localmente e por nova execução da CI, sem declarar suíte aprovada quando ela não rodou.",
      hint: "Leia o primeiro estágio com erro e compare versões, arquivos de dependências e comando executado."
    },
    "quality-debug": {
      prompt: "Um filtro de pedidos pendentes inclui pedidos sem campo status. Reduza a entrada ao menor caso que reproduz o defeito, registre esperado e observado, corrija a regra e mantenha um teste de regressão.",
      expected: "O pedido sem status não é tratado como pendente; o teste falha com a regra antiga e passa com a nova; o relatório explica a causa e o que ainda não foi verificado.",
      hint: "Compare ausência de propriedade com o valor explícito que representa pendência."
    },
    "quality-refactor": {
      prompt: "Uma função calcula o preço final e também altera o texto da página. Antes de separá-la em regra e apresentação, registre testes de preço normal, zero e entrada inválida. Faça a separação e execute os mesmos testes.",
      expected: "Os resultados e erros acordados continuam iguais; a regra pode ser testada sem DOM; o comportamento visível da página permanece correto após a extração.",
      hint: "Defina uma interface pequena para a regra e trate a escrita no DOM em outra função."
    },
    "quality-review": {
      prompt: "Revise uma lista de avisos recebidos de um arquivo JSON. Um aviso contém '<b>urgente</b>' e a lista tem mil itens. Registre testes de texto, teclado e tempo de renderização antes de sugerir mudanças.",
      expected: "O conteúdo aparece como texto, sem interpretar tags; a lista pode ser percorrida por teclado conforme seus controles; a observação de desempenho traz cenário e medida, não apenas impressão subjetiva.",
      hint: "Confira textContent, semântica dos controles e um caso de medição reproduzível."
    }
  };

  for (const [id, retry] of Object.entries(retries)) LESSON_GUIDES[id].retry = retry;
})();

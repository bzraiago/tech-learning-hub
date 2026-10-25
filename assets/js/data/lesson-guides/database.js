'use strict';

// Guias detalhados da trilha Banco de Dados.
Object.assign(LESSON_GUIDES, {
"db-modeling": {
    "prerequisites": "Nenhuma experiência com bancos é necessária. Você precisa apenas distinguir um curso, uma aula e uma pessoa: vamos transformar esses objetos cotidianos em dados organizados.",
    "setup": "Reutilize o ambiente SQLite verificado nas aulas anteriores e crie uma base nova e descartável. Em um cliente SQLite, execute as instruções uma a uma para observar o estado antes e depois de ROLLBACK. Se usar o executor Python das aulas anteriores, mantenha isolation_level=None para que BEGIN, COMMIT e ROLLBACK do arquivo controlem a transação. A página guarda apenas rascunhos; o SQL é executado localmente. Reinicie a base antes de cada exercício para partir de 100 e 50.",
    "why": "Imagine que Ana e Beto estudam SQL. Se você guardar a conclusão na própria aula, marcar a aula como concluída para Ana também mudará o estado visto por Beto. Nesta aula o foco é reconhecer as coisas do domínio, identificá-las e representar as relações entre elas; normalização e ausência ficam na aula seguinte.",
    "sections": [
      {
        "title": "Entidades, atributos e linhas",
        "paragraphs": [
          "Uma entidade é um tipo de coisa que o sistema precisa distinguir: estudante, trilha ou lição. Uma tabela reúne ocorrências dessa entidade. Uma linha de ESTUDANTES pode representar Ana; as colunas nome e email são atributos. O nome da tabela descreve o conjunto, e cada linha descreve uma ocorrência concreta.",
          "Uma chave primária identifica uma linha sem ambiguidade. Dois estudantes podem chamar-se Ana, por isso nome é uma identificação ruim. Usaremos números id diferentes. Uma chave primária deve ser única e não nula. NULL significa informação ausente ou desconhecida; não significa zero nem uma cadeia de texto vazia."
        ]
      },
      {
        "title": "Relacionamentos e cardinalidade",
        "paragraphs": [
          "Uma trilha pode possuir várias lições, mas cada lição pertence a uma trilha neste projeto: relacionamento um para muitos, escrito 1:N. Colocamos trilha_id em LICOES, o lado muitos. A chave estrangeira exige que seu valor corresponda a uma trilha existente; ela não copia o nome da trilha.",
          "Um estudante pode frequentar várias trilhas, e uma trilha pode ter vários estudantes. Essa relação muitos para muitos, N:N, precisa de MATRICULAS. Cada linha associa dois identificadores. A chave composta estudante_id + trilha_id impede que a mesma pessoa seja matriculada duas vezes na mesma trilha, sem impedir outras matrículas."
        ]
      },
      {
        "title": "Do pedido em português para um modelo verificável",
        "paragraphs": [
          "Comece descrevendo ações e perguntas, sem pensar em comandos. Uma pessoa se matricula em uma trilha; uma trilha contém lições; a pessoa conclui uma lição. Agora escreva dados de exemplo no papel. Ana e Beto existem mesmo que ainda não tenham matrícula. A trilha Dados existe mesmo vazia. Uma matrícula só existe quando liga uma pessoa a uma trilha. Essa diferença ajuda a separar entidades de relacionamentos. Desenhe caixas para ESTUDANTES, TRILHAS e LICOES e setas para suas referências. Depois tente responder: onde fica a data da matrícula? Ela não descreve apenas a pessoa nem apenas a trilha: descreve a associação entre ambas.",
          "O modelo depende de regras declaradas. Nesta versão, cada lição pertence a uma única trilha. Se o produto permitir reutilizar a mesma lição em várias trilhas, será necessário outro relacionamento N:N, possivelmente com posição e obrigatoriedade na associação. Não existe um desenho universal que atenda a todo aplicativo. Antes de implementar, registre hipóteses como: uma pessoa pode matricular-se duas vezes na mesma trilha? Excluir uma trilha deve apagar histórico? Um título pode repetir? Perguntas assim revelam decisões que uma tela bonita não resolve e evitam mudanças improvisadas no banco."
        ]
      },
      {
        "title": "Executar e inspecionar este laboratório",
        "paragraphs": [
          "Crie os dois arquivos na mesma pasta. O programa abaixo é apenas o executor: o conteúdo da aula continua sendo SQL e fica em aula.sql. O modo isolation_level=None permite que os comandos BEGIN, COMMIT e ROLLBACK do arquivo controlem explicitamente as transações. O executor aceita os exemplos desta aula, com uma instrução por encerramento de linha; não é um analisador genérico para qualquer script SQL. Antes de cada exercício, preserve o exemplo e acrescente somente a solução que quer testar. Compare o resultado observado com a previsão, e guarde no rascunho a consulta, a saída e a explicação."
        ],
        "code": {
          "language": "python",
          "code": "# executar.py — Python 3, biblioteca padrão\nfrom pathlib import Path\nimport sqlite3\n\ncon = sqlite3.connect(\":memory:\", isolation_level=None)\ntry:\n    pendente = \"\"\n    for linha in Path(\"aula.sql\").read_text(encoding=\"utf-8\").splitlines():\n        pendente += linha + \"\\n\"\n        if sqlite3.complete_statement(pendente):\n            cursor = con.execute(pendente)\n            if cursor.description:\n                print(\" | \".join(coluna[0] for coluna in cursor.description))\n                for registro in cursor:\n                    print(\" | \".join(\"NULL\" if valor is None else str(valor) for valor in registro))\n            pendente = \"\"\n    if pendente.strip():\n        raise ValueError(\"Falta ponto e vírgula na última instrução\")\nexcept Exception:\n    if con.in_transaction:\n        con.rollback()\n    raise\nfinally:\n    con.close()\n"
        }
      }
    ],
    "example": {
      "language": "sql",
      "code": "PRAGMA foreign_keys=ON;\nCREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT NOT NULL UNIQUE);\nCREATE TABLE estudantes(id INTEGER PRIMARY KEY,nome TEXT NOT NULL,email TEXT NOT NULL UNIQUE);\nCREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha_id INTEGER NOT NULL REFERENCES trilhas(id),titulo TEXT NOT NULL);\nCREATE TABLE matriculas(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),trilha_id INTEGER NOT NULL REFERENCES trilhas(id),PRIMARY KEY(estudante_id,trilha_id));\nCREATE TABLE progresso(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),licao_id INTEGER NOT NULL REFERENCES licoes(id),concluida INTEGER NOT NULL CHECK(concluida IN (0,1)),PRIMARY KEY(estudante_id,licao_id));\nINSERT INTO trilhas VALUES(1,'Dados');\nINSERT INTO estudantes VALUES(1,'Ana','ana@example.test'),(2,'Beto','beto@example.test');\nINSERT INTO licoes VALUES(10,1,'SELECT'),(11,1,'JOIN');\nINSERT INTO matriculas VALUES(1,1),(2,1);\nINSERT INTO progresso VALUES(1,10,1),(2,10,0);\nSELECT estudante_id,licao_id,concluida FROM progresso ORDER BY estudante_id,licao_id;",
      "explanation": [
        "Cada entidade possui uma tabela e uma chave estável.",
        "A matrícula liga duas entidades com uma chave composta.",
        "O progresso pertence ao par estudante e lição; uma conclusão não altera outra pessoa.",
        "FKs verificam existência, mas não garantem por si só matrícula na trilha da lição.",
        "Executor opcional: o código Python está na seção de preparação local. Cada SELECT imprime cabeçalho e linhas; mudanças não produzem uma tabela de saída."
      ],
      "expected": "estudante_id | licao_id | concluida\n1 | 10 | 1\n2 | 10 | 0"
    },
    "guided": [
      {
        "instruction": "Circule os atributos que identificam entidades e sublinhe os que apenas descrevem informações.",
        "result": "id identifica; nome, email e titulo descrevem. email também recebe uma regra de unicidade."
      },
      {
        "instruction": "Trace uma seta de cada lição para a trilha usando o número armazenado.",
        "result": "SELECT e JOIN apontam para Dados, pois ambos têm trilha_id 1."
      },
      {
        "instruction": "Troque o nome Dados por Bancos e conte quantas linhas precisam mudar.",
        "result": "Apenas uma linha de TRILHAS muda; as referências numéricas continuam válidas."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga quais registros são necessários para acrescentar a estudante Carla, identificador 3, matriculada em Dados, sem concluir lições.",
        "hints": [
          "Crie a pessoa antes de referenciá-la.",
          "Não invente conclusão quando ela ainda não ocorreu."
        ],
        "solution": "INSERT INTO estudantes VALUES(3,'Carla','carla@example.test');\nINSERT INTO matriculas VALUES(3,1);\nSELECT COUNT(*) FROM estudantes;\nSELECT COUNT(*) FROM matriculas;\nSELECT COUNT(*) FROM progresso;",
        "explanation": "O primeiro registro cria a entidade; o segundo cria a relação. Nenhuma linha de PROGRESSO é necessária segundo a convenção desta aula.",
        "expected": "Três estudantes, três matrículas e ainda dois registros de progresso."
      },
      {
        "prompt": "Alterar: partindo apenas do exemplo inicial, registre que Ana concluiu JOIN. Não execute o exercício anterior. Explique por que duplicar (1,10) seria inválido.",
        "hints": [
          "JOIN tem id 11.",
          "A identidade do progresso é um par, não apenas o estudante."
        ],
        "solution": "INSERT INTO progresso VALUES(1,11,1);\nSELECT estudante_id,licao_id,concluida FROM progresso ORDER BY estudante_id,licao_id;",
        "explanation": "O novo par representa outra lição de Ana. Uma segunda linha com o mesmo par (1,10) violaria a chave composta e produziria duas respostas para a mesma pergunta.",
        "expected": "Ana tem duas conclusões; Beto continua pendente em SELECT."
      },
      {
        "prompt": "Construir: modele avaliações de lições. Cada estudante pode avaliar cada lição uma vez, com nota inteira de 1 a 5. Crie a tabela e registre nota 4 de Ana para SELECT.",
        "hints": [
          "A identidade é o par estudante/lição.",
          "Combine referências, NOT NULL e CHECK para a nota."
        ],
        "solution": "CREATE TABLE avaliacoes(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),licao_id INTEGER NOT NULL REFERENCES licoes(id),nota INTEGER NOT NULL CHECK(typeof(nota)='integer' AND nota BETWEEN 1 AND 5),PRIMARY KEY(estudante_id,licao_id));\nINSERT INTO avaliacoes VALUES(1,10,4);\nSELECT * FROM avaliacoes;",
        "expected": "1 | 10 | 4",
        "explanation": "A nota depende do par completo; a chave composta impede avaliações duplicadas e a restrição limita o domínio."
      },
      {
        "prompt": "Investigar erro: alguém propôs estudantes(id,nome,trilhas_texto) com trilhas_texto=\"1,2\". Explique o problema e registre corretamente a matrícula de Ana na nova trilha Web.",
        "hints": [
          "Uma lista textual não cria referências verificáveis por item.",
          "A matrícula já tem uma tabela associativa."
        ],
        "solution": "INSERT INTO trilhas VALUES(2,'Web');\nINSERT INTO matriculas VALUES(1,2);\nSELECT trilha_id FROM matriculas WHERE estudante_id=1 ORDER BY trilha_id;",
        "expected": "1 e 2 em linhas separadas.",
        "explanation": "Uma relação N:N possui uma linha por associação. Isso permite FK, unicidade e consultas sem quebrar uma lista textual."
      }
    ],
    "mistakes": [
      "Usar nome como chave: pessoas homônimas colidem; use um identificador estável.",
      "Guardar IDs separados por vírgulas em uma célula: dificulta relacionamentos; crie a tabela associativa.",
      "Achar que uma FK garante matrícula na trilha da lição: ela garante apenas a referência declarada; essa regra adicional exige modelagem ou validação específica."
    ],
    "quiz": [
      {
        "question": "Onde deve ficar a conclusão individual?",
        "options": [
          "Em TRILHAS",
          "No par estudante e lição",
          "No título da lição"
        ],
        "correctIndex": 1,
        "explanation": "Conclusão descreve uma relação entre uma pessoa e uma lição."
      },
      {
        "question": "O que a chave estrangeira trilha_id garante?",
        "options": [
          "Que a trilha referenciada existe",
          "Que cada trilha possui uma única lição",
          "Que o estudante concluiu a trilha"
        ],
        "correctIndex": 0,
        "explanation": "A chave estrangeira preserva a referência; não limita a quantidade de lições a uma."
      },
      {
        "question": "Em MATRICULAS(estudante_id,trilha_id), onde deve ficar nome_estudante?",
        "options": [
          "Em ESTUDANTES, pois depende apenas do estudante",
          "Repetido em toda matrícula",
          "Em cada lição"
        ],
        "correctIndex": 0,
        "explanation": "O nome depende de apenas uma parte da chave composta; centralizá-lo em ESTUDANTES evita dependência parcial e cópias divergentes."
      }
    ],
    "summary": [
      "Identifique entidades antes de criar tabelas.",
      "Use chaves para identidade e referências.",
      "Guarde informações da relação na tabela que representa a relação."
    ]
  },
"db-normalization": {
    "prerequisites": "Concluir Entidades, relacionamentos e chaves (db-modeling). Você deve distinguir entidade, atributo, chave primária, chave estrangeira e tabela associativa.",
    "setup": "Use uma base SQLite nova e descartável. Você pode executar o SQL em um cliente SQLite ou reutilizar os arquivos aula.sql e executar.py apresentados em db-modeling. Execute uma instrução por vez, compare a saída com o resultado esperado e reinicie com uma base vazia antes de cada exercício. Não é necessário instalar um servidor de banco.",
    "why": "Uma planilha pode repetir o nome e o email da mesma pessoa em dezenas de matrículas. Quando um dado muda, cópias podem divergir. Normalizar é organizar dependências para reduzir contradições, preservando as perguntas que o sistema precisa responder.",
    "sections": [
      {
        "title": "Repetição e anomalias observáveis",
        "paragraphs": [
          "Se cada matrícula repetir nome e email, corrigir um email exige encontrar todas as cópias. Esquecer uma delas cria uma anomalia de atualização. Se só for possível cadastrar uma trilha inventando uma matrícula, há anomalia de inserção. Se apagar a última matrícula também apagar a única descrição da trilha, há anomalia de remoção.",
          "Repetição nem sempre é um erro: relatórios e caches podem duplicar dados deliberadamente. Antes disso, construa um modelo principal coerente e documente qualquer cópia, sua origem e como será atualizada."
        ]
      },
      {
        "title": "As três primeiras formas normais",
        "paragraphs": [
          "Na primeira forma normal, cada posição guarda um valor do domínio escolhido e cada linha pode ser identificada. Em vez de trilhas_texto='10,20', use duas linhas em MATRICULAS. O que conta como valor individual depende das consultas: um endereço pode permanecer texto até o sistema precisar filtrar suas partes.",
          "Na segunda forma normal, atributos não chave dependem da chave composta inteira. Em MATRICULAS(estudante_id,trilha_id), nome_estudante depende apenas de estudante_id e fica em ESTUDANTES; data_matricula descreve o par. Na terceira, evite dependência transitiva indevida: se cidade_id determina nome_cidade, centralize o nome em CIDADES quando o domínio exigir esse cadastro."
        ]
      },
      {
        "title": "Ausência, identidade e limites",
        "paragraphs": [
          "Defina NULL coluna por coluna. Uma data de matrícula ausente pode significar não registrada; zero não representa a mesma coisa. Uma linha ausente em PROGRESSO também pode significar ainda não iniciado, mas essa convenção pertence ao contrato da aplicação e precisa ser escrita.",
          "Uma chave estrangeira garante a existência do registro referenciado, não toda regra de negócio imaginável. Referenciar estudante e lição em PROGRESSO não garante sozinho que a pessoa esteja matriculada na trilha daquela lição. Registre o limite e decida em qual camada a regra será aplicada."
        ]
      },
      {
        "title": "Modelo verificável, não modelo universal",
        "paragraphs": [
          "Comece por ações e perguntas: uma pessoa se matricula, uma trilha contém lições, uma pessoa conclui uma lição. Use dois ou três exemplos e tente representar casos válidos e proibir os inválidos. Duas pessoas podem ter o mesmo nome? Uma trilha pode existir vazia? Uma matrícula pode repetir?",
          "Mudanças de requisito podem alterar o desenho. Se uma lição puder pertencer a várias trilhas, trilha_id deixa de bastar e surge outra associação. Normalização não elimina decisões: torna as dependências e os trade-offs mais explícitos."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "PRAGMA foreign_keys=ON;\nCREATE TABLE estudantes(id INTEGER PRIMARY KEY,nome TEXT NOT NULL,email TEXT NOT NULL UNIQUE);\nCREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT NOT NULL UNIQUE);\nCREATE TABLE matriculas(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),trilha_id INTEGER NOT NULL REFERENCES trilhas(id),data_matricula TEXT,PRIMARY KEY(estudante_id,trilha_id));\nINSERT INTO estudantes VALUES(1,'Ana','ana@example.test');\nINSERT INTO trilhas VALUES(10,'Dados'),(20,'Web');\nINSERT INTO matriculas VALUES(1,10,'2026-10-24'),(1,20,NULL);\nSELECT estudante_id,trilha_id,data_matricula FROM matriculas ORDER BY trilha_id;",
      "explanation": [
        "O nome e o email aparecem uma vez em ESTUDANTES, mesmo com duas matrículas.",
        "A chave composta impede repetir o mesmo par estudante/trilha.",
        "data_matricula depende do par e pode ficar na associação.",
        "NULL foi mantido como ausência conhecida de data, sem inventar texto ou zero."
      ],
      "expected": "estudante_id | trilha_id | data_matricula\n1 | 10 | 2026-10-24\n1 | 20 | NULL"
    },
    "guided": [
      { "instruction": "Desenhe a planilha original com duas linhas de Ana e circule os valores repetidos.", "result": "nome e email aparecem duas vezes; a versão normalizada os mantém uma vez." },
      { "instruction": "Tente inserir novamente a matrícula (1,10).", "result": "O banco recusa a duplicata por causa da chave primária composta." },
      { "instruction": "Troque o email de Ana e conte as linhas alteradas.", "result": "Somente uma linha de ESTUDANTES precisa mudar." }
    ],
    "exercises": [
      {
        "prompt": "Prever: uma tabela matriculas(estudante_id,trilha_id,nome_estudante) usa chave composta. Se Ana mudar de nome, quantas linhas podem precisar de alteração? Qual dependência está errada?",
        "hints": ["Pergunte de qual parte da chave o nome depende."],
        "solution": "Todas as matrículas de Ana poderiam precisar de alteração. nome_estudante depende somente de estudante_id, não do par inteiro, e deve permanecer em ESTUDANTES.",
        "explanation": "A dependência parcial cria cópias e risco de divergência.",
        "expected": "Uma linha por matrícula seria afetada no modelo repetido; uma única linha no modelo normalizado."
      },
      {
        "prompt": "Alterar: acrescente observacao à matrícula do exemplo. Permita ausência e registre 'Turma noturna' somente para a matrícula em Dados.",
        "hints": ["A observação descreve o par estudante/trilha."],
        "solution": "ALTER TABLE matriculas ADD COLUMN observacao TEXT;\nUPDATE matriculas SET observacao='Turma noturna' WHERE estudante_id=1 AND trilha_id=10;\nSELECT trilha_id,observacao FROM matriculas ORDER BY trilha_id;",
        "explanation": "A observação pertence à associação; a outra matrícula permanece com NULL.",
        "expected": "Dados recebe Turma noturna; Web apresenta NULL."
      },
      {
        "prompt": "Construir: normalize uma planilha de matrículas que repete nome e email do estudante e guarda trilhas separadas por vírgula. Entregue tabelas, chaves e três linhas de exemplo.",
        "hints": ["Separe ESTUDANTES e TRILHAS.", "Use uma linha por associação em MATRICULAS."],
        "solution": "CREATE TABLE estudantes(id INTEGER PRIMARY KEY,nome TEXT NOT NULL,email TEXT NOT NULL UNIQUE);\nCREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT NOT NULL UNIQUE);\nCREATE TABLE matriculas(estudante_id INTEGER REFERENCES estudantes(id),trilha_id INTEGER REFERENCES trilhas(id),PRIMARY KEY(estudante_id,trilha_id));\nINSERT INTO estudantes VALUES(1,'Ana','ana@example.test');\nINSERT INTO trilhas VALUES(10,'Dados');\nINSERT INTO matriculas VALUES(1,10);",
        "explanation": "Cada entidade é registrada uma vez e cada associação ocupa uma linha verificável.",
        "expected": "Uma estudante, uma trilha e uma matrícula, sem lista de IDs em texto."
      },
      {
        "prompt": "Investigar erro: alguém substituiu data_matricula ausente por '0000-00-00'. Explique por que o valor inventado prejudica consultas e proponha uma representação coerente.",
        "hints": ["Ausência não é uma data antiga nem zero."],
        "solution": "Mantenha data_matricula como NULL enquanto a data for desconhecida e consulte com IS NULL. Se a data for obrigatória, use NOT NULL e recuse a matrícula sem data em vez de inventar um valor.",
        "explanation": "O contrato precisa distinguir valor conhecido de ausência; sentinelas falsas parecem datas e contaminam ordenações e relatórios.",
        "expected": "Ausência representada por NULL ou entrada recusada por uma regra explícita."
      }
    ],
    "mistakes": [
      "Dividir todo texto automaticamente sem considerar as consultas do domínio.",
      "Repetir atributo de uma entidade em cada associação e criar cópias divergentes.",
      "Substituir ausência por zero ou data fictícia sem declarar essa semântica.",
      "Acreditar que uma chave estrangeira implementa regras que não foram declaradas."
    ],
    "quiz": [
      { "question": "Onde deve ficar data_matricula?", "options": ["Em ESTUDANTES", "Em TRILHAS", "Em MATRICULAS"], "correctIndex": 2, "explanation": "A data descreve a associação entre uma pessoa e uma trilha." },
      { "question": "Por que trilhas_texto='10,20' dificulta a integridade?", "options": ["Porque texto nunca pode ter números", "Porque cada item não possui referência e unicidade verificáveis separadamente", "Porque toda coluna precisa ser inteira"], "correctIndex": 1, "explanation": "Uma linha por associação permite chaves estrangeiras e uma chave composta." },
      { "question": "O que NULL deve representar?", "options": ["Sempre zero", "Sempre erro", "A ausência definida no contrato daquela coluna"], "correctIndex": 2, "explanation": "A semântica de ausência precisa ser decidida por dado e domínio." }
    ],
    "summary": [
      "Normalize para reduzir contradições observáveis, não por ritual.",
      "Mantenha cada atributo junto da chave da qual ele depende.",
      "Documente ausência, limites das restrições e mudanças de requisito."
    ]
  },
"db-ddl-constraints": {
    "prerequisites": "Concluir Entidades, relacionamentos e chaves (db-modeling) e Normalização, ausência e decisões de modelagem (db-normalization).",
    "setup": "Use uma base SQLite nova e descartável. Execute o SQL em um cliente SQLite ou reutilize aula.sql e executar.py da aula de modelagem. Confirme PRAGMA foreign_keys; o resultado esperado é 1. Execute tentativas inválidas separadamente para observar a mensagem e verificar que nenhuma linha foi aceita.",
    "why": "Validar apenas na interface não protege o banco de outros programas ou de uma falha no servidor. Restrições transformam parte das regras do modelo em condições verificadas sempre que uma escrita chega ao banco.",
    "sections": [
      {
        "title": "DDL descreve a estrutura",
        "paragraphs": [
          "CREATE TABLE pertence à linguagem de definição de dados, DDL. Dentro dos parênteses, cada item declara uma coluna ou uma restrição; vírgulas separam itens e o ponto e vírgula encerra a instrução. INTEGER, REAL, TEXT e BLOB atendem aos casos comuns deste laboratório SQLite.",
          "SQLite tradicional trabalha com afinidade de tipos. Declarar INTEGER não reproduz toda a rigidez de outros motores. Quando a regra exigir inteiro, combine typeof(valor)='integer' com CHECK. Tabelas STRICT existem, mas ficam fora deste primeiro exercício."
        ]
      },
      {
        "title": "Restrições formam um contrato",
        "paragraphs": [
          "PRIMARY KEY identifica uma linha. NOT NULL exige presença. UNIQUE evita repetição dos valores cobertos. CHECK testa uma expressão e DEFAULT fornece valor quando a coluna é omitida. Uma regra pode precisar de mais de uma restrição: CHECK pode aceitar resultado NULL no SQLite, então duração obrigatória também precisa de NOT NULL.",
          "NOT NULL não impede texto vazio. Para um título significativo, CHECK(length(trim(titulo)) > 0) recusa vazio e espaços. DEFAULT 0 atua quando concluida é omitida; enviar NULL explicitamente continua sujeito a NOT NULL."
        ]
      },
      {
        "title": "Referências exigem ativação e teste",
        "paragraphs": [
          "Uma chave estrangeira exige que o valor referenciado exista. No SQLite, habilite PRAGMA foreign_keys=ON logo após abrir cada conexão e antes de iniciar transação. Consulte PRAGMA foreign_keys e espere 1; não presuma a configuração.",
          "A ação padrão recusa excluir uma categoria ainda referenciada. ON DELETE CASCADE teria outro significado e apagaria também os filhos. Escolha conforme a regra de negócio, em vez de usar cascata apenas para eliminar uma mensagem de erro."
        ]
      },
      {
        "title": "Teste positivo e negativo",
        "paragraphs": [
          "Para cada regra importante, escreva uma entrada aceita e outra recusada. Tente minutos zero, título só com espaços, categoria inexistente e tarefa válida. Depois de cada recusa, consulte a contagem para comprovar que o estado permaneceu válido.",
          "Registre comando, resultado esperado, mensagem observada e estado posterior. Uma mensagem diferente pode indicar erro de sintaxe, conexão errada ou regra não ativada; investigar essas diferenças faz parte do laboratório."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "PRAGMA foreign_keys=ON;\nCREATE TABLE categorias(id INTEGER PRIMARY KEY,nome TEXT NOT NULL UNIQUE);\nCREATE TABLE tarefas(\n  id INTEGER PRIMARY KEY,\n  categoria_id INTEGER NOT NULL REFERENCES categorias(id),\n  titulo TEXT NOT NULL CHECK(length(trim(titulo)) > 0),\n  minutos INTEGER NOT NULL CHECK(typeof(minutos)='integer' AND minutos > 0),\n  concluida INTEGER NOT NULL DEFAULT 0 CHECK(concluida IN (0,1))\n);\nINSERT INTO categorias(id,nome) VALUES(1,'Estudos');\nINSERT INTO tarefas(id,categoria_id,titulo,minutos) VALUES(10,1,'Revisar SQL',30);\nSELECT id,titulo,minutos,concluida FROM tarefas;",
      "explanation": ["A categoria é criada antes da tarefa que a referencia.", "Título e minutos combinam presença com regras de domínio.", "concluida recebe zero porque a coluna foi omitida no INSERT.", "A chave estrangeira está ativa somente nesta conexão."],
      "expected": "10 | Revisar SQL | 30 | 0"
    },
    "guided": [
      { "instruction": "Consulte PRAGMA foreign_keys antes de criar os dados.", "result": "O resultado é 1 nesta conexão." },
      { "instruction": "Tente uma tarefa com categoria_id 99 em comando separado.", "result": "A inserção é recusada por chave estrangeira e a tarefa 10 permanece sozinha." },
      { "instruction": "Tente minutos 0 e depois um título com somente espaços.", "result": "Cada tentativa é recusada pelo CHECK correspondente." }
    ],
    "exercises": [
      { "prompt": "Prever: o que acontece se concluida for omitida, se receber NULL e se receber 2? Explique antes de executar.", "hints": ["DEFAULT, NOT NULL e CHECK respondem perguntas diferentes."], "solution": "Omitida: recebe 0. NULL: é recusado por NOT NULL. Valor 2: é recusado por CHECK(concluida IN (0,1)).", "explanation": "O valor padrão não substitui automaticamente um NULL explícito e não amplia os valores permitidos.", "expected": "Somente a versão que omite a coluna é aceita com concluida 0." },
      { "prompt": "Alterar: acrescente prioridade inteira de 1 a 3, obrigatória e com padrão 2, em uma tabela tarefas recriada do zero.", "hints": ["Combine INTEGER, NOT NULL, DEFAULT e CHECK."], "solution": "prioridade INTEGER NOT NULL DEFAULT 2 CHECK(typeof(prioridade)='integer' AND prioridade BETWEEN 1 AND 3)", "explanation": "A declaração cobre presença, valor padrão, tipo efetivo e intervalo.", "expected": "Prioridade omitida vira 2; 0, 4 e 1.5 são recusados." },
      { "prompt": "Construir: crie categorias e tarefas. Cada tarefa exige título não vazio, minutos inteiros positivos, categoria existente e estado pendente por padrão.", "hints": ["Crie a tabela referenciada primeiro.", "Teste pelo menos uma entrada inválida."], "solution": "PRAGMA foreign_keys=ON;\nCREATE TABLE categorias(id INTEGER PRIMARY KEY,nome TEXT NOT NULL UNIQUE);\nCREATE TABLE tarefas(id INTEGER PRIMARY KEY,categoria_id INTEGER NOT NULL REFERENCES categorias(id),titulo TEXT NOT NULL CHECK(length(trim(titulo))>0),minutos INTEGER NOT NULL CHECK(typeof(minutos)='integer' AND minutos>0),concluida INTEGER NOT NULL DEFAULT 0 CHECK(concluida IN (0,1)));", "explanation": "As restrições traduzem as regras observáveis sem depender da tela.", "expected": "Uma tarefa válida é aceita; categoria inexistente, título vazio e minutos não positivos são recusados." },
      { "prompt": "Investigar erro: a chave estrangeira foi declarada, mas uma tarefa com categoria 99 foi aceita. Formule a hipótese mais provável e escreva a verificação e a correção.", "hints": ["No SQLite, a declaração e a ativação são etapas distintas."], "solution": "PRAGMA foreign_keys;\nPRAGMA foreign_keys=ON;\nPRAGMA foreign_keys;\n-- execute antes de iniciar uma transação; o último resultado deve ser 1", "explanation": "A proteção precisa estar habilitada por conexão; tentar ativá-la no meio de uma transação não produz o efeito esperado.", "expected": "A consulta passa a mostrar 1 e novas referências inexistentes são recusadas." }
    ],
    "mistakes": ["Confiar somente no tipo declarado em uma tabela SQLite flexível.", "Usar CHECK sem NOT NULL para um campo obrigatório.", "Declarar chave estrangeira e esquecer de ativá-la e verificá-la na conexão.", "Adicionar CASCADE sem decidir se os registros filhos realmente devem ser apagados."],
    "quiz": [
      { "question": "Quando DEFAULT é aplicado?", "options": ["Quando a coluna é omitida", "Sempre que chega NULL", "Depois de qualquer erro"], "correctIndex": 0, "explanation": "NULL explícito continua sendo um valor fornecido e pode ser recusado por NOT NULL." },
      { "question": "Qual combinação exige minutos inteiros positivos?", "options": ["INTEGER apenas", "NOT NULL e CHECK(typeof(minutos)='integer' AND minutos>0)", "DEFAULT 0"], "correctIndex": 1, "explanation": "A combinação verifica presença, tipo efetivo e limite." },
      { "question": "O que deve retornar PRAGMA foreign_keys no laboratório?", "options": ["0", "1", "NULL"], "correctIndex": 1, "explanation": "O valor 1 confirma a ativação na conexão atual." }
    ],
    "summary": ["DDL descreve a estrutura antes dos registros.", "Combine restrições conforme cada regra observável.", "Teste aceitações e recusas e confira o estado posterior."]
  },
"db-ddl-crud": {
    "prerequisites": "Concluir Tabelas, tipos e restrições (db-ddl-constraints). Você deve saber criar a estrutura e verificar as chaves estrangeiras antes de manipular registros.",
    "setup": "Use uma base SQLite nova e descartável para cada aula. Você pode colar o SQL em uma ferramenta SQLite local e executar instrução por instrução. Alternativa sem instalar servidor: com Python 3, salve o SQL em aula.sql e o executor abaixo em executar.py, na mesma pasta; rode python executar.py (ou py executar.py no Windows). Ele cria uma base apenas em memória, imprime cada resultado de consulta e fecha a conexão ao terminar. Cada execução começa vazia. Exercícios usam o estado final do exemplo: acrescente apenas o exercício escolhido ao final de aula.sql e reinicie o executor. Não cole cercas de Markdown nos arquivos. Se faltar o módulo sqlite3, use uma distribuição de Python com esse módulo ou uma ferramenta SQLite. A página apenas guarda rascunhos; o SQL será executado na ferramenta local. Neste executor, não coloque duas instruções completas na mesma linha; cada instrução deve terminar em sua própria linha.",
    "why": "Depois que a estrutura protege as regras básicas, a aplicação precisa inserir, ler, alterar e remover registros sem atingir linhas erradas nem transformar entrada do usuário em sintaxe SQL.",
    "sections": [
      {
        "title": "Criar, ler, alterar e remover",
        "paragraphs": [
          "CRUD reúne quatro ações: Create corresponde a INSERT, Read a SELECT, Update a UPDATE e Delete a DELETE. INSERT INTO informa a tabela e as colunas, seguidas dos VALUES na mesma ordem. Textos SQL ficam entre aspas simples; identificadores e números do exemplo não precisam delas.",
          "UPDATE define novos valores com SET e escolhe linhas com WHERE. Sem WHERE, todas as linhas da tabela são candidatas. DELETE funciona da mesma maneira para remoção. Antes de mudar dados, execute um SELECT usando exatamente o filtro planejado. Conferir a seleção reduz erros de abrangência."
        ]
      },
      {
        "title": "Referências e valores padrão",
        "paragraphs": [
          "FOREIGN KEY conecta trilha_id ao identificador de TRILHAS. No SQLite é necessário habilitar PRAGMA foreign_keys = ON em cada conexão, antes de iniciar uma transação. Criar uma lição com trilha_id 99 falhará se essa trilha não existir. Primeiro cadastre a entidade referenciada.",
          "DEFAULT 0 fornece um valor quando a coluna concluida é omitida no INSERT. Não substitui um NULL enviado explicitamente. Com NOT NULL e CHECK limitamos o estado aos números 0 e 1. Esta simplificação atende uma única pessoa; progresso de vários estudantes requer a tabela associativa apresentada anteriormente."
        ]
      },
      {
        "title": "Alterações seguras e entradas da aplicação",
        "paragraphs": [
          "Antes de um UPDATE ou DELETE, escreva o SELECT correspondente, confira identificadores e conte linhas. SELECT * FROM licoes WHERE id=10 deve mostrar exatamente o alvo esperado. Só então altere com o mesmo filtro. Um filtro incorreto continua perigoso mesmo tendo WHERE; WHERE id>0 pode selecionar tudo. Durante experimentos, use uma base descartável e uma transação que possa ser revertida. UPDATE que encontra zero linhas não é necessariamente erro SQL: a aplicação precisa decidir se o item não existe, já mudou ou não atende à condição. Essa distinção será essencial para atualizar estoque e saldo com segurança.",
          "Nunca monte comandos concatenando entrada de usuário. Com Python sqlite3, execute con.execute(\"UPDATE licoes SET titulo=? WHERE id=?\", (novo_titulo, 10)). Os pontos de interrogação são parâmetros para valores; o driver os envia sem transformá-los em sintaxe SQL. Não coloque aspas ao redor do ?. Nomes de tabelas e colunas não são valores parametrizáveis dessa maneira: se houver ordenação escolhida pelo usuário, use uma lista fechada de nomes permitidos. Um título contendo aspas ou texto parecido com SQL deve continuar sendo apenas um título. Não use executescript com texto externo, porque esse método recebe comandos completos.",
          "Repetibilidade faz parte do aprendizado. O exemplo cria tabelas e dados desde o começo; rode-o em uma base vazia para obter a mesma saída. Para experimentar uma restrição, execute o comando inválido isoladamente e confira que a contagem não mudou. Anote o comando, o motivo esperado da recusa e o estado posterior. Depois faça uma alteração válida e compare. Isso prova que a regra está funcionando e que o problema não é simplesmente uma ferramenta sem conexão. Ao finalizar, explique a diferença entre DELETE, que remove linhas, e DROP TABLE, que remove a própria estrutura."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "PRAGMA foreign_keys = ON;\nCREATE TABLE trilhas (id INTEGER PRIMARY KEY, nome TEXT NOT NULL UNIQUE);\nCREATE TABLE licoes (\n  id INTEGER PRIMARY KEY,\n  trilha_id INTEGER NOT NULL REFERENCES trilhas(id),\n  titulo TEXT NOT NULL,\n  minutos INTEGER NOT NULL CHECK (typeof(minutos)='integer' AND minutos > 0),\n  concluida INTEGER NOT NULL DEFAULT 0 CHECK (concluida IN (0,1))\n);\nINSERT INTO trilhas (id,nome) VALUES (1,'Dados');\nINSERT INTO licoes (id,trilha_id,titulo,minutos)\nVALUES (10,1,'SELECT',30),(11,1,'JOIN',40);\nSELECT id,titulo,concluida FROM licoes WHERE id=10;\nUPDATE licoes SET concluida=1 WHERE id=10;\nSELECT id,titulo,minutos,concluida FROM licoes ORDER BY id;",
      "explanation": [
        "O PRAGMA ativa a verificação das referências nesta conexão SQLite.",
        "As colunas do INSERT tornam a ordem dos valores explícita e permitem omitir concluida.",
        "CHECK aceita apenas minutos positivos; NOT NULL também impede ausência de duração.",
        "O UPDATE encontra apenas id 10, enquanto a ordenação final deixa a inspeção determinística.",
        "Executor opcional: o código Python está na seção de preparação local. Cada SELECT imprime cabeçalho e linhas; mudanças não produzem uma tabela de saída."
      ],
      "expected": "SELECT inicial: 10 | SELECT | 0. Resultado final: 10 | SELECT | 30 | 1 e 11 | JOIN | 40 | 0."
    },
    "guided": [
      {
        "instruction": "Execute a criação e os INSERT antes do UPDATE. Consulte ambas as lições.",
        "result": "As duas começam com concluida 0 porque DEFAULT foi aplicado."
      },
      {
        "instruction": "Execute o SELECT filtrado e depois o UPDATE.",
        "result": "Somente SELECT passa para concluida 1; JOIN permanece em 0."
      },
      {
        "instruction": "Em comando separado, tente INSERT INTO licoes VALUES (12,99,'Inválida',20,0);",
        "result": "A inserção falha por chave estrangeira e o total permanece duas lições."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga qual valor concluida receberá ao cadastrar Índices sem informar essa coluna. Depois cadastre id 12, duração 25, na trilha 1.",
        "hints": [
          "Liste as quatro colunas que deseja preencher.",
          "O valor padrão fornece a quinta informação."
        ],
        "solution": "INSERT INTO licoes (id,trilha_id,titulo,minutos) VALUES (12,1,'Índices',25);\nSELECT concluida FROM licoes WHERE id=12;",
        "explanation": "Omitir a coluna permite que DEFAULT 0 seja usado. Escrever NULL não produziria o mesmo efeito.",
        "expected": "A consulta devolve 0 e a tabela passa a ter três linhas."
      },
      {
        "prompt": "Alterar: após o exercício anterior, remova apenas Índices, conferindo antes a linha selecionada.",
        "hints": [
          "O id 12 identifica exclusivamente o alvo.",
          "Use o mesmo WHERE na leitura e na remoção."
        ],
        "solution": "SELECT * FROM licoes WHERE id=12;\nDELETE FROM licoes WHERE id=12;\nSELECT COUNT(*) FROM licoes;",
        "explanation": "A leitura confirma o alvo e DELETE remove somente esse identificador. COUNT(*) conta todas as linhas restantes.",
        "expected": "A contagem final é 2; SELECT e JOIN continuam presentes."
      },
      {
        "prompt": "Construir: adicione a lição Transações de 50 minutos, id 13, e marque somente ela como concluída. Confira a linha antes e depois.",
        "hints": [
          "Use INSERT com colunas explícitas.",
          "Selecione id=13 antes de alterar."
        ],
        "solution": "INSERT INTO licoes(id,trilha_id,titulo,minutos) VALUES(13,1,'Transações',50);\nSELECT id,concluida FROM licoes WHERE id=13;\nUPDATE licoes SET concluida=1 WHERE id=13;\nSELECT id,concluida FROM licoes WHERE id=13;",
        "expected": "Antes: 13 | 0. Depois: 13 | 1.",
        "explanation": "DEFAULT inicializa pendência; o filtro por identidade limita a alteração a uma lição."
      },
      {
        "prompt": "Investigar erro: UPDATE licoes SET minutos=25; alteraria toda a tabela. Não execute o comando incorreto; corrija para afetar somente JOIN, id 11, e mostre as duas durações.",
        "hints": [
          "Não execute o comando incorreto.",
          "Use WHERE id=11 e ordene a inspeção."
        ],
        "solution": "SELECT id,titulo,minutos FROM licoes WHERE id=11;\nUPDATE licoes SET minutos=25 WHERE id=11;\nSELECT id,minutos FROM licoes ORDER BY id;",
        "expected": "10 | 30; 11 | 25.",
        "explanation": "WHERE seleciona a linha pretendida; id 10 mantém a duração original."
      }
    ],
    "mistakes": [
      "Esquecer WHERE: confira os registros com SELECT antes de UPDATE ou DELETE.",
      "Confiar apenas em CHECK para impedir NULL: acrescente NOT NULL quando o valor é obrigatório.",
      "Reexecutar CREATE TABLE no mesmo banco: use um banco novo para repetir o laboratório, preservando o anterior se necessário."
    ],
    "quiz": [
      {
        "question": "Qual operação altera uma linha existente?",
        "options": [
          "INSERT",
          "UPDATE",
          "CREATE TABLE"
        ],
        "correctIndex": 1,
        "explanation": "UPDATE modifica valores das linhas selecionadas."
      },
      {
        "question": "O que DEFAULT 0 faz?",
        "options": [
          "Troca qualquer NULL por zero",
          "Preenche a coluna omitida no INSERT",
          "Conclui automaticamente todas as lições"
        ],
        "correctIndex": 1,
        "explanation": "DEFAULT é aplicado quando nenhum valor é fornecido para a coluna."
      },
      {
        "question": "Como enviar um título digitado ao sqlite3 de Python?",
        "options": [
          "Concatenando o título ao SQL",
          "Usando execute com marcador ? e tupla de parâmetros",
          "Usando executescript com o texto do formulário"
        ],
        "correctIndex": 1,
        "explanation": "Parâmetros separam valores da sintaxe e tratam aspas sem transformar a entrada em comandos."
      }
    ],
    "summary": [
      "CRUD manipula registros sem alterar a definição das tabelas.",
      "Confira o alvo com SELECT antes de UPDATE ou DELETE.",
      "Envie valores externos por parâmetros, nunca por concatenação."
    ]
  },
"db-select": {
    "prerequisites": "Conclua Tabelas, tipos e restrições (db-ddl-constraints) e CRUD seguro (db-ddl-crud). Você não precisa ter conservado o laboratório anterior: este exemplo inclui os dados necessários.",
    "setup": "Use uma base SQLite nova e descartável para cada aula. Você pode colar o SQL em uma ferramenta SQLite local e executar instrução por instrução. Alternativa sem instalar servidor: com Python 3, salve o SQL em aula.sql e o executor abaixo em executar.py, na mesma pasta; rode python executar.py (ou py executar.py no Windows). Ele cria uma base apenas em memória, imprime cada resultado de consulta e fecha a conexão ao terminar. Cada execução começa vazia. Exercícios usam o estado final do exemplo: acrescente apenas o exercício escolhido ao final de aula.sql e reinicie o executor. Não cole cercas de Markdown nos arquivos. Se faltar o módulo sqlite3, use uma distribuição de Python com esse módulo ou uma ferramenta SQLite. A página apenas guarda rascunhos; o SQL será executado na ferramenta local. Neste executor, não coloque duas instruções completas na mesma linha; cada instrução deve terminar em sua própria linha.",
    "why": "O dashboard precisa responder quais aulas estão pendentes e quanto tempo falta em cada trilha. SELECT transforma registros individuais em respostas, sem exigir que você carregue tudo na aplicação para calcular manualmente.",
    "sections": [
      {
        "title": "Ler e filtrar linhas",
        "paragraphs": [
          "SELECT escolhe as colunas devolvidas; FROM informa a tabela de origem. WHERE conserva apenas as linhas para as quais a condição é verdadeira. A expressão concluida = 0 seleciona pendências. AND exige que duas condições sejam verdadeiras; OR aceita pelo menos uma delas. Parênteses deixam combinações explícitas.",
          "ORDER BY define a ordem de apresentação. DESC significa decrescente e ASC significa crescente. Duas lições podem ter a mesma duração; acrescentar id como desempate produz uma sequência previsível. Não presuma que a ordem de inserção será mantida quando nenhum ORDER BY foi escrito."
        ]
      },
      {
        "title": "Ausência não é zero",
        "paragraphs": [
          "NULL representa um valor desconhecido ou ausente. Comparações comuns com NULL não resultam em verdadeiro, por isso WHERE observacao = NULL não encontra os campos ausentes. Use IS NULL ou IS NOT NULL. Uma observação vazia, escrita como duas aspas simples, continua sendo um texto conhecido.",
          "COUNT(*) conta linhas. COUNT(observacao) conta valores não nulos nessa coluna. SUM e AVG ignoram os valores nulos recebidos. Essa diferença importa em relatórios: não confunda quantidade de estudantes com quantidade de estudantes que informaram uma observação. COALESCE(valor, alternativa) substitui uma ausência no resultado quando isso fizer sentido."
        ]
      },
      {
        "title": "Uma consulta é uma pergunta com fronteiras",
        "paragraphs": [
          "Antes de escrever SQL, reformule o pedido em uma frase que inclua população, condição, colunas e ordem: quero títulos de aulas pendentes com pelo menos trinta minutos, da maior duração para a menor, com id como desempate. Traduzindo, a população vem de FROM licoes, a condição de WHERE concluida=0 AND minutos>=30, as colunas de SELECT e a ordem de ORDER BY minutos DESC,id. Esse pequeno planejamento evita responder uma pergunta diferente. Teste sempre o limite: pelo menos trinta inclui trinta, portanto usa >=; mais de trinta usa >.",
          "AND tem precedência sobre OR. Por isso, escreva parênteses quando misturar condições: concluida=0 AND (trilha='Dados' OR trilha='Python') exige pendência nas duas trilhas. IN ('Dados','Python') expressa essa mesma escolha de forma compacta. BETWEEN 20 AND 30 inclui os dois limites. LIKE 'Arq%' procura um prefixo, onde % representa uma sequência; _ representa um caractere. Regras de maiúsculas e acentos variam conforme collation e motor, então não assuma que todos os bancos farão buscas textuais idênticas. Uma comparação numérica, por sua vez, deve comparar números, não durações escritas como texto livre."
        ]
      },
      {
        "title": "A lógica de NULL em resultados e filtros",
        "paragraphs": [
          "SQL trabalha com uma situação desconhecida além de verdadeiro e falso quando há NULL. Se observacao é NULL, comparar observacao='Revisar' não permite concluir verdadeiro nem falso. WHERE conserva apenas verdadeiro. Isso explica por que observacao\u003c>'Revisar' também não inclui automaticamente ausências: para incluí-las, escreva observacao\u003c>'Revisar' OR observacao IS NULL. Use IS NULL para localizar ausência e ='' para localizar uma string vazia. Não escreva 'NULL' pensando em ausência: com aspas isso é um texto de quatro letras.",
          "COALESCE(observacao,'Sem observação') altera a apresentação do resultado, sem escrever nada na tabela. Escolha o texto alternativo de modo que a pessoa entenda a ausência. No cálculo de média, substituir duração desconhecida por zero muda o denominador e pode reduzir artificialmente a média; não faça isso por hábito. COUNT(*) conta todas as quatro linhas do exemplo, enquanto COUNT(observacao) conta duas. COUNT(DISTINCT trilha) conta duas trilhas diferentes. SUM em um conjunto sem linhas retorna NULL no SQLite, enquanto COUNT retorna zero. Essas convenções precisam ser consideradas ao montar cartões de relatório."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE licoes (\n id INTEGER PRIMARY KEY, trilha TEXT, titulo TEXT,\n minutos INTEGER, concluida INTEGER, observacao TEXT\n);\nINSERT INTO licoes VALUES\n (1,'Dados','SELECT',30,0,NULL),\n (2,'Dados','JOIN',40,0,'Revisar'),\n (3,'Python','Listas',20,1,NULL),\n (4,'Python','Arquivos',30,0,'');\nSELECT titulo,minutos FROM licoes WHERE concluida=0\nORDER BY minutos DESC,id ASC;\nSELECT id,titulo,COALESCE(observacao,'Sem observação') AS observacao\nFROM licoes ORDER BY id;",
      "explanation": [
        "A quarta linha possui texto vazio em observacao; isso difere de NULL nas linhas 1 e 3.",
        "A primeira consulta ordena JOIN antes de SELECT e Arquivos; o id desempata os 30 minutos.",
        "IS NULL identifica ausência, enquanto texto vazio continua sendo um valor conhecido.",
        "COALESCE altera somente a apresentação do resultado e não escreve na tabela.",
        "Executor opcional: o código Python está na seção de preparação local. Cada SELECT imprime cabeçalho e linhas; mudanças não produzem uma tabela de saída."
      ],
      "expected": "Pendentes: JOIN 40, SELECT 30, Arquivos 30. Na segunda consulta, SELECT e Listas mostram Sem observação; JOIN mostra Revisar; Arquivos mantém texto vazio."
    },
    "guided": [
      {
        "instruction": "Antes de executar, preveja a ordem das três pendências quando duas possuem 30 minutos.",
        "result": "JOIN vem primeiro com 40; SELECT vem antes de Arquivos porque id desempata os 30 minutos."
      },
      {
        "instruction": "Consulte SELECT id FROM licoes WHERE observacao IS NULL ORDER BY id;",
        "result": "Aparecem os IDs 1 e 3, não o id 4 que contém texto vazio."
      },
      {
        "instruction": "Troque o filtro de pendências por concluida=1.",
        "result": "Somente Listas, com 20 minutos, é devolvida."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: liste mentalmente quais aulas têm pelo menos 30 minutos e depois escreva a consulta ordenada por id.",
        "hints": [
          "Use >= para incluir exatamente 30.",
          "Não filtre conclusão: o pedido é sobre duração."
        ],
        "solution": "SELECT titulo FROM licoes WHERE minutos>=30 ORDER BY id;",
        "explanation": "O filtro é aplicado a cada linha e inclui o limite inferior. ORDER BY id mantém a ordem 1,2,4.",
        "expected": "SELECT, JOIN e Arquivos, nessa ordem."
      },
      {
        "prompt": "Alterar: liste apenas aulas de Dados que estejam pendentes e tenham entre 30 e 40 minutos, ordenando da maior duração para a menor.",
        "hints": [
          "Combine as condições com AND.",
          "BETWEEN inclui os dois limites."
        ],
        "solution": "SELECT titulo,minutos FROM licoes WHERE trilha='Dados' AND concluida=0 AND minutos BETWEEN 30 AND 40 ORDER BY minutos DESC,id;",
        "explanation": "Todos os filtros atuam sobre linhas e os limites 30 e 40 são incluídos.",
        "expected": "JOIN | 40; SELECT | 30."
      },
      {
        "prompt": "Construir: liste id, título e observação das aulas pendentes. Mostre 'Sem observação' somente quando o valor for NULL e coloque textos vazios por último.",
        "hints": [
          "Use COALESCE apenas para apresentação.",
          "Ordene primeiro pelo teste observacao='' e depois pelo id."
        ],
        "solution": "SELECT id,titulo,COALESCE(observacao,'Sem observação') AS observacao_exibida FROM licoes WHERE concluida=0 ORDER BY observacao='',id;",
        "expected": "SELECT, JOIN e Arquivos; Arquivos fica por último por conter texto vazio.",
        "explanation": "NULL recebe um texto apenas no resultado. A expressão booleana de ordenação posiciona o texto vazio depois dos demais."
      },
      {
        "prompt": "Investigar erro: WHERE observacao=NULL não encontra as ausências. Liste os IDs sem observação conhecida e explique por que id 4 não entra.",
        "hints": [
          "Use o operador específico para NULL.",
          "Texto vazio ainda é texto conhecido."
        ],
        "solution": "SELECT id FROM licoes WHERE observacao IS NULL ORDER BY id;",
        "expected": "1 e 3.",
        "explanation": "IS NULL identifica ausência; a string vazia de id 4 não é NULL."
      }
    ],
    "mistakes": [
      "Comparar com = NULL: substitua por IS NULL.",
      "Confundir texto vazio com NULL: teste cada estado conforme a regra do domínio.",
      "Esperar ordem fixa sem ORDER BY: declare a ordem e um desempate quando necessário."
    ],
    "quiz": [
      {
        "question": "Qual expressão conta todas as linhas?",
        "options": [
          "COUNT(observacao)",
          "COUNT(*)",
          "SUM(observacao)"
        ],
        "correctIndex": 1,
        "explanation": "COUNT(*) inclui linhas mesmo quando algumas colunas são nulas."
      },
      {
        "question": "Como localizar valores ausentes em observacao?",
        "options": [
          "observacao = NULL",
          "observacao IS NULL",
          "observacao = ''"
        ],
        "correctIndex": 1,
        "explanation": "IS NULL é o teste específico para ausência."
      },
      {
        "question": "Por que acrescentar id após minutos em ORDER BY minutos DESC,id ajuda?",
        "options": [
          "Cria um desempate previsível",
          "Remove valores NULL",
          "Soma os minutos iguais"
        ],
        "correctIndex": 0,
        "explanation": "Linhas com a mesma duração passam a ter uma ordem definida pelo identificador."
      }
    ],
    "summary": [
      "WHERE escolhe linhas com condições explícitas.",
      "NULL precisa de testes específicos.",
      "Ordenação e desempate fazem parte de uma consulta previsível."
    ]
  },
"db-aggregation": {
    "prerequisites": "Concluir Consultas, filtros, ordenação e NULL (db-select). Você deve saber selecionar as linhas que participarão do relatório antes de agrupá-las.",
    "setup": "Use uma base SQLite nova e descartável em um cliente SQLite ou com aula.sql e executar.py. Execute o exemplo completo, faça a conta manual dos três registros pendentes e somente depois altere a consulta. Não é necessário instalar servidor.",
    "why": "Um dashboard raramente mostra todas as linhas: ele responde quantas tarefas existem, quanto tempo está pendente e qual grupo exige atenção. Agregações transformam conjuntos de linhas em medidas, mas um filtro na etapa errada pode responder outra pergunta.",
    "sections": [
      {
        "title": "Funções agregadas resumem conjuntos",
        "paragraphs": [
          "COUNT(*) conta linhas; COUNT(coluna) ignora valores NULL nessa coluna. SUM soma valores e AVG calcula média. No SQLite, SUM sobre um conjunto sem linhas retorna NULL, enquanto COUNT retorna zero. Escreva qual população está sendo medida antes de escolher a função.",
          "Uma agregação sem GROUP BY produz um resumo do conjunto inteiro. Com GROUP BY trilha, cada trilha passa a representar uma linha do resultado. Toda coluna exibida precisa ter significado para aquela unidade."
        ]
      },
      {
        "title": "WHERE filtra linhas; HAVING filtra grupos",
        "paragraphs": [
          "A ordem lógica útil é FROM, WHERE, GROUP BY, agregações, HAVING, SELECT e ORDER BY. Se o relatório pede apenas pendências, WHERE concluida=0 remove linhas concluídas antes da soma. HAVING SUM(minutos)>=50 conserva grupos depois que o total existe.",
          "Não use HAVING para substituir todo filtro. Aplicar concluida=0 depois do agrupamento não forma a população correta. Primeiro decida quais linhas participam; depois decida quais grupos aparecem."
        ]
      },
      {
        "title": "Colunas ambíguas e resultados previsíveis",
        "paragraphs": [
          "Ao agrupar por trilha, mostrar titulo sem agregá-lo é ambíguo: Dados contém SELECT e JOIN. Mesmo que o motor aceite escolher algum valor, a pergunta não definiu qual título representa o grupo. Mostre trilha e medidas, ou altere a unidade do agrupamento.",
          "Ordene por uma medida e acrescente desempate quando necessário. DISTINCT remove repetições do resultado selecionado; não corrige um agrupamento mal definido."
        ]
      },
      {
        "title": "Validar com contas manuais",
        "paragraphs": [
          "No exemplo, as pendências têm 30, 40 e 30 minutos: cem no total. Dados possui duas linhas e setenta minutos; Python possui uma e trinta. Esses números permitem detectar rapidamente filtro ausente, soma duplicada ou grupo inesperado.",
          "Teste conjunto vazio, empate e valor NULL. Um relatório que funciona apenas com os dados iniciais não demonstra que a consulta responde corretamente quando o cadastro muda."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha TEXT,titulo TEXT,minutos INTEGER,concluida INTEGER,observacao TEXT);\nINSERT INTO licoes VALUES\n (1,'Dados','SELECT',30,0,NULL),\n (2,'Dados','JOIN',40,0,'Revisar'),\n (3,'Python','Listas',20,1,NULL),\n (4,'Python','Arquivos',30,0,'');\nSELECT trilha,COUNT(*) AS quantidade,SUM(minutos) AS total\nFROM licoes WHERE concluida=0\nGROUP BY trilha ORDER BY total DESC,trilha;",
      "explanation": ["WHERE mantém somente pendências antes do agrupamento.", "GROUP BY cria uma linha de resultado por trilha.", "COUNT e SUM medem as linhas de cada grupo.", "ORDER BY usa o total e a trilha como desempate."],
      "expected": "Dados | 2 | 70\nPython | 1 | 30"
    },
    "guided": [
      { "instruction": "Remova temporariamente WHERE concluida=0 e preveja Python.", "result": "Python passa a ter duas aulas e 50 minutos, pois Listas entra no grupo." },
      { "instruction": "Acrescente HAVING SUM(minutos)>=50 mantendo o WHERE.", "result": "Somente Dados permanece, com 70 minutos." },
      { "instruction": "Execute SELECT COUNT(*),COUNT(observacao) FROM licoes.", "result": "A saída é 4 e 2: texto vazio conta como valor, NULL não." }
    ],
    "exercises": [
      { "prompt": "Prever: antes de executar, calcule quantidade e média de minutos por trilha usando todas as aulas.", "hints": ["Dados: 30 e 40; Python: 20 e 30."], "solution": "SELECT trilha,COUNT(*) AS quantidade,AVG(minutos) AS media FROM licoes GROUP BY trilha ORDER BY trilha;", "explanation": "Cada média usa as duas linhas da respectiva trilha.", "expected": "Dados | 2 | 35.0; Python | 2 | 25.0." },
      { "prompt": "Alterar: adapte o exemplo para manter somente trilhas com pelo menos 50 minutos pendentes.", "hints": ["A condição depende da soma do grupo."], "solution": "SELECT trilha,COUNT(*) AS quantidade,SUM(minutos) AS total FROM licoes WHERE concluida=0 GROUP BY trilha HAVING SUM(minutos)>=50 ORDER BY trilha;", "explanation": "WHERE forma a população pendente e HAVING conserva grupos pelo total calculado.", "expected": "Dados | 2 | 70." },
      { "prompt": "Construir: produza um relatório das pendências por trilha, com quantidade e total, maior total primeiro, incluindo todos os grupos sem HAVING.", "hints": ["Filtre antes de agrupar.", "Use a trilha como desempate."], "solution": "SELECT trilha,COUNT(*) AS quantidade,SUM(minutos) AS total FROM licoes WHERE concluida=0 GROUP BY trilha ORDER BY total DESC,trilha;", "explanation": "A unidade final é uma trilha e cada medida considera apenas pendências.", "expected": "Dados | 2 | 70; Python | 1 | 30." },
      { "prompt": "Investigar erro: SELECT trilha,titulo,SUM(minutos) FROM licoes GROUP BY trilha mostra um título arbitrário por grupo. Explique e corrija o relatório para uma linha significativa por trilha.", "hints": ["titulo não identifica o grupo inteiro."], "solution": "SELECT trilha,COUNT(*) AS quantidade,SUM(minutos) AS total FROM licoes GROUP BY trilha ORDER BY trilha;", "explanation": "As colunas agora descrevem a unidade trilha; nenhum título individual é apresentado como representante implícito.", "expected": "Dados | 2 | 70; Python | 2 | 50." }
    ],
    "mistakes": ["Colocar condição agregada em WHERE antes de a medida existir.", "Exibir coluna sem significado definido para o grupo.", "Confundir COUNT(*) com COUNT(coluna) quando há NULL.", "Aceitar um total sem conferir manualmente um conjunto pequeno."],
    "quiz": [
      { "question": "Onde filtrar grupos com soma mínima?", "options": ["WHERE", "HAVING", "VALUES"], "correctIndex": 1, "explanation": "HAVING avalia condições depois da formação e medição dos grupos." },
      { "question": "Qual expressão conta também linhas cuja observacao é NULL?", "options": ["COUNT(*)", "COUNT(observacao)", "SUM(observacao)"], "correctIndex": 0, "explanation": "COUNT(*) conta linhas; COUNT(coluna) ignora NULL naquela coluna." },
      { "question": "Ao agrupar por trilha, por que titulo solto é ambíguo?", "options": ["Uma trilha pode conter vários títulos", "GROUP BY apaga textos", "SUM exige título numérico"], "correctIndex": 0, "explanation": "A linha resultante representa a trilha inteira, não uma lição específica." }
    ],
    "summary": ["Defina as linhas participantes antes de agregar.", "WHERE filtra linhas e HAVING filtra grupos.", "Valide medidas com contas manuais e uma unidade de resultado explícita."]
  },
"db-joins": {
    "prerequisites": "Conclua Consultas, filtros, ordenação e NULL (db-select) e Agregações, GROUP BY e HAVING (db-aggregation). Revise também chaves estrangeiras.",
    "setup": "Use uma base SQLite nova e descartável para cada aula. Você pode colar o SQL em uma ferramenta SQLite local e executar instrução por instrução. Alternativa sem instalar servidor: com Python 3, salve o SQL em aula.sql e o executor abaixo em executar.py, na mesma pasta; rode python executar.py (ou py executar.py no Windows). Ele cria uma base apenas em memória, imprime cada resultado de consulta e fecha a conexão ao terminar. Cada execução começa vazia. Exercícios usam o estado final do exemplo: acrescente apenas o exercício escolhido ao final de aula.sql e reinicie o executor. Não cole cercas de Markdown nos arquivos. Se faltar o módulo sqlite3, use uma distribuição de Python com esse módulo ou uma ferramenta SQLite. A página apenas guarda rascunhos; o SQL será executado na ferramenta local. Neste executor, não coloque duas instruções completas na mesma linha; cada instrução deve terminar em sua própria linha.",
    "why": "Separar o nome da trilha das lições evita repetição, mas o relatório precisa reunir essas informações novamente. JOIN expressa essa ligação e permite incluir até trilhas que ainda não receberam nenhuma aula.",
    "sections": [
      {
        "title": "Combinar pela chave correta",
        "paragraphs": [
          "JOIN compara linhas de duas tabelas usando a condição ON. No exemplo, l.trilha_id = t.id liga cada lição à sua trilha. t e l são aliases, nomes curtos locais à consulta. INNER JOIN só devolve pares que correspondem, portanto a trilha Python desaparece se ainda não tiver lições.",
          "Uma relação 1:N produz uma linha por combinação, não uma linha por trilha. Dados aparece duas vezes quando ligado a SELECT e JOIN. Isso não é duplicação acidental: é a granularidade do resultado. Antes de somar, pergunte o que cada linha representa e se outra junção poderia multiplicá-la novamente."
        ]
      },
      {
        "title": "Preservar ausência com LEFT JOIN",
        "paragraphs": [
          "LEFT JOIN mantém todas as linhas da tabela à esquerda. Quando não há correspondência à direita, as colunas desse lado vêm como NULL. Python produz uma linha com l.id ausente. COUNT(l.id) ignora essa ausência e retorna zero; COUNT(*) contaria a linha preservada e retornaria um indevido um.",
          "Um filtro WHERE l.minutos > 30 eliminaria Python porque comparar NULL com 30 não é verdadeiro. Quando deseja conservar todas as trilhas e restringir apenas as lições associadas, coloque a condição adicional no ON. A localização do filtro muda a pergunta respondida, mesmo usando as mesmas palavras."
        ]
      },
      {
        "title": "A unidade de cada linha vem antes da soma",
        "paragraphs": [
          "Uma junção não busca simplesmente um nome: ela produz todas as combinações que satisfazem ON. Dados possui duas lições, então contribui com duas linhas. Se você juntar também três matrículas diretamente pela trilha, poderá produzir seis linhas para Dados, porque cada lição combina com cada matrícula. Somar os minutos nesse resultado triplicaria o total. Antes de escrever SUM, anote o que uma linha representa: uma lição, uma matrícula ou um par lição-matrícula? Essa pergunta detecta o erro de multiplicação sem depender de memorizar sintaxe.",
          "Quando precisar de dois totais independentes, agregue cada conjunto primeiro e só depois junte os resumos por trilha. Uma CTE pode somar lições por trilha; outra pode contar matrículas por trilha; a consulta final reúne uma linha de cada resumo. DISTINCT não é uma correção universal: SUM(DISTINCT minutos) removeria durações iguais de lições diferentes e poderia subestimar o total. A correção é preservar a granularidade adequada. Em bases grandes, esse raciocínio também ajuda a interpretar planos de execução e evitar resultados intermediários desnecessários."
        ]
      },
      {
        "title": "Desenhar a junção com poucos registros",
        "paragraphs": [
          "Escreva as duas linhas de TRILHAS e as duas de LICOES em papel. Para cada trilha, compare t.id com l.trilha_id. Dados combina com as duas; Python não combina com nenhuma. INNER JOIN mantém apenas combinações encontradas. LEFT JOIN produz essas combinações e acrescenta uma linha de ausência para Python. A coluna l.id nessa linha é NULL, enquanto t.id continua sendo 2. Os aliases são nomes locais que deixam explícito de qual tabela vem cada campo e evitam ambiguidade quando ambas têm coluna id.",
          "O lado esquerdo deve ser o conjunto que o relatório precisa preservar. Se o pedido é listar toda trilha, comece por trilhas. Se o pedido é listar toda lição e seu nome de trilha, comece pelas lições e reflita sobre a integridade referencial. Uma FK obrigatória corretamente aplicada evita lições órfãs, mas consultas de diagnóstico podem lidar com importações antigas ou relações opcionais. Não confunda uma junção que encontrou correspondência com uma FK que impede dados inválidos: a consulta lê o estado atual; a restrição protege futuras escritas.",
          "Pausa de previsão: antes de olhar o mapa, desenhe as duas tabelas do exemplo e anote quantas linhas INNER JOIN e LEFT JOIN devolvem. Depois compare suas linhas com o mapa e execute as consultas."
        ],
        "diagramTitle": "Da condição ON às linhas e à contagem",
        "diagram": "TRILHAS t                 LICOES l\nid  nome                  id  trilha_id  titulo\n1   Dados ─────────────→  10  1          SELECT\n         └─────────────→  11  1          JOIN\n2   Python ─────────────→  sem lição correspondente\n\nON l.trilha_id = t.id\nINNER JOIN → Dados | SELECT\n             Dados | JOIN\nLEFT JOIN  → Dados | SELECT | l.id 10\n             Dados | JOIN   | l.id 11\n             Python | NULL | l.id NULL\n\nGROUP BY t.id, t.nome; COUNT(l.id)\nDados → 2 lições     Python → 0 lições\nCOUNT(*) contaria a linha preservada de Python como 1."
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT);\nCREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha_id INTEGER,titulo TEXT,minutos INTEGER);\nINSERT INTO trilhas VALUES(1,'Dados'),(2,'Python');\nINSERT INTO licoes VALUES(10,1,'SELECT',30),(11,1,'JOIN',40);\nSELECT t.nome,l.titulo FROM trilhas t\nLEFT JOIN licoes l ON l.trilha_id=t.id ORDER BY t.id,l.id;\nSELECT t.nome,COUNT(l.id) AS quantidade\nFROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id\nGROUP BY t.id,t.nome ORDER BY t.id;",
      "explanation": [
        "ON conecta o identificador da trilha à referência guardada na lição, não aos títulos.",
        "LEFT JOIN produz uma linha para Python mesmo sem lição correspondente.",
        "COUNT(l.id) conta somente lições reais e devolve zero para Python.",
        "Agrupar por identidade e nome mantém uma linha significativa por trilha.",
        "Executor opcional: o código Python está na seção de preparação local. Cada SELECT imprime cabeçalho e linhas; mudanças não produzem uma tabela de saída."
      ],
      "expected": "Primeira consulta: Dados | SELECT; Dados | JOIN; Python | NULL. Contagem: Dados | 2; Python | 0."
    },
    "guided": [
      {
        "instruction": "Execute a primeira consulta usando INNER JOIN no lugar de LEFT JOIN.",
        "result": "Restam duas linhas, ambas de Dados; Python desaparece."
      },
      {
        "instruction": "Conte l.id e depois troque temporariamente por COUNT(*).",
        "result": "COUNT(l.id) devolve zero para Python; COUNT(*) conta a linha preservada e devolve um indevido um."
      },
      {
        "instruction": "Na primeira consulta acrescente AND l.minutos>30 ao ON.",
        "result": "Dados aparece com JOIN; Python continua aparecendo com título NULL."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga quantas linhas o LEFT JOIN produzirá e depois liste todas as trilhas com a quantidade de lições, incluindo zero.",
        "hints": [
          "Comece por TRILHAS, o conjunto que deve ser preservado.",
          "Conte l.id e agrupe pelos identificadores e nomes da trilha."
        ],
        "solution": "SELECT t.nome,COUNT(l.id) AS quantidade FROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id GROUP BY t.id,t.nome ORDER BY t.id;",
        "explanation": "A linha preservada de Python tem l.id NULL e não aumenta COUNT(l.id). O agrupamento reduz cada trilha a uma linha.",
        "expected": "Dados | 2; Python | 0."
      },
      {
        "prompt": "Alterar: encontre somente as trilhas sem lições.",
        "hints": [
          "Após LEFT JOIN, identifique a ausência no lado direito.",
          "A chave primária da lição nunca é NULL em uma correspondência real."
        ],
        "solution": "SELECT t.nome FROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id WHERE l.id IS NULL ORDER BY t.id;",
        "explanation": "O filtro é intencionalmente posterior à junção: queremos justamente as linhas sem correspondência.",
        "expected": "Python, uma única linha."
      },
      {
        "prompt": "Construir: liste todas as trilhas e somente suas lições com mais de 30 minutos, preservando trilhas sem correspondência.",
        "hints": [
          "Comece por trilhas com LEFT JOIN.",
          "Coloque a condição de duração no ON."
        ],
        "solution": "SELECT t.nome,l.titulo FROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id AND l.minutos>30 ORDER BY t.id,l.id;",
        "expected": "Dados | JOIN; Python | NULL.",
        "explanation": "A condição limita filhos elegíveis sem remover o pai preservado."
      },
      {
        "prompt": "Investigar erro: um relatório com LEFT JOIN e WHERE l.minutos>30 perdeu Python. Corrija para mostrar toda trilha com suas lições longas, mantendo trilhas sem correspondência.",
        "hints": [
          "A condição deve limitar correspondências, não eliminar a linha preservada.",
          "Acrescente a condição ao ON."
        ],
        "solution": "SELECT t.nome,l.titulo FROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id AND l.minutos>30 ORDER BY t.id,l.id;",
        "expected": "Dados | JOIN; Python | NULL.",
        "explanation": "ON restringe os filhos elegíveis; LEFT JOIN ainda conserva cada trilha."
      }
    ],
    "mistakes": [
      "Juntar por nomes: nomes podem mudar; use as chaves correspondentes.",
      "Usar COUNT(*) para contar filhos no LEFT JOIN: conte a chave do filho.",
      "Acrescentar filtros do lado direito em WHERE sem pensar: mova-os para ON quando quiser preservar pais sem correspondência."
    ],
    "quiz": [
      {
        "question": "Qual junção conserva trilhas sem lições?",
        "options": [
          "INNER JOIN",
          "LEFT JOIN com trilhas à esquerda",
          "Nenhuma"
        ],
        "correctIndex": 1,
        "explanation": "LEFT JOIN preserva o conjunto à esquerda e preenche ausências com NULL."
      },
      {
        "question": "Por que COUNT(l.id) devolve zero para uma trilha sem lições?",
        "options": [
          "Porque l.id é NULL na linha preservada",
          "Porque COUNT sempre ignora a tabela direita",
          "Porque LEFT JOIN remove a trilha"
        ],
        "correctIndex": 0,
        "explanation": "COUNT(coluna) ignora NULL, enquanto a trilha continua presente."
      },
      {
        "question": "Juntar duas lições com três matrículas da mesma trilha pode produzir quantas combinações?",
        "options": [
          "2",
          "3",
          "6"
        ],
        "correctIndex": 2,
        "explanation": "Cada lição combina com cada matrícula: 2 vezes 3. Somar durações nesse resultado multiplicaria o total."
      }
    ],
    "summary": [
      "A condição ON determina como as linhas se relacionam.",
      "Entenda a granularidade antes de somar.",
      "LEFT JOIN e contagem de chaves permitem representar zero corretamente."
    ]
  },
"db-subqueries-ctes": {
    "prerequisites": "Concluir JOINs, ausência e granularidade (db-joins) e Agregações, GROUP BY e HAVING (db-aggregation).",
    "setup": "Use uma base SQLite descartável no cliente ou com aula.sql e executar.py. Execute primeiro cada consulta interna isoladamente; só depois componha a consulta externa. Não é necessário instalar servidor.",
    "why": "Consultas maiores ficam mais seguras quando cada etapa tem nome, unidade e resultado conferível. Subconsultas respondem perguntas internas; CTEs tornam resultados intermediários legíveis sem criar tabelas permanentes.",
    "sections": [
      {"title":"Subconsulta escalar e EXISTS","paragraphs":["Uma subconsulta escalar deve devolver um valor, como AVG(total), para participar de uma comparação. EXISTS responde apenas se ao menos uma linha corresponde e evita multiplicar a linha externa.","NOT EXISTS expressa ausência. Não troque automaticamente por NOT IN quando o conjunto puder conter NULL, pois a lógica de desconhecido pode mudar o resultado."]},
      {"title":"CTE nomeia uma etapa","paragraphs":["WITH resumo AS (...) cria uma expressão nomeada válida durante a instrução, não uma tabela permanente. Seu primeiro benefício é permitir ler e testar uma etapa por vez.","Execute o corpo da CTE isoladamente. Se o resumo já estiver errado, corrija-o antes de investigar o filtro externo."]},
      {"title":"Agregue antes de juntar resumos","paragraphs":["Juntar duas lições a três matrículas pela trilha produz seis combinações e pode triplicar a soma. Quando precisa de dois totais independentes, agregue cada conjunto primeiro.","Uma CTE pode somar lições; outra pode contar matrículas. Juntar uma linha de cada resumo preserva a granularidade por trilha. DISTINCT não corrige totais multiplicados e pode remover valores legítimos iguais."]},
      {"title":"Verifique unidade e limites","paragraphs":["Escreva o significado de cada linha intermediária e final. No exemplo, resumo tem uma linha por trilha; a subconsulta da média devolve um número.","CTE não promete cache nem ganho de desempenho. Use plano de execução e medição quando desempenho for requisito; aqui ela organiza raciocínio verificável."]}
    ],
    "example": {
      "language":"sql",
      "code":"CREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT);\nCREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha_id INTEGER,titulo TEXT,minutos INTEGER);\nINSERT INTO trilhas VALUES(1,'Dados'),(2,'Python');\nINSERT INTO licoes VALUES(10,1,'SELECT',30),(11,1,'JOIN',40);\nWITH resumo AS (\n SELECT t.id,t.nome,COUNT(l.id) AS quantidade,COALESCE(SUM(l.minutos),0) AS total\n FROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id GROUP BY t.id,t.nome\n)\nSELECT nome,quantidade,total FROM resumo\nWHERE total<(SELECT AVG(total) FROM resumo) ORDER BY id;",
      "explanation":["A CTE produz Dados 2/70 e Python 0/0.","A subconsulta calcula média 35.","A consulta externa conserva apenas o total abaixo da média."],
      "expected":"Python | 0 | 0"
    },
    "guided":[
      {"instruction":"Execute apenas o SELECT interno da CTE.","result":"Dados | 2 | 70 e Python | 0 | 0."},
      {"instruction":"Troque < por > na comparação externa.","result":"A saída passa a ser Dados | 2 | 70."},
      {"instruction":"Use EXISTS para listar trilhas que possuem ao menos uma lição.","result":"Dados aparece uma vez; Python não aparece."}
    ],
    "exercises":[
      {"prompt":"Prever: qual valor a subconsulta SELECT AVG(total) FROM resumo devolve para totais 70 e 0? Qual trilha fica com total abaixo dele?","hints":["Some e divida por dois."],"solution":"A média é 35; Python tem total 0 e fica abaixo dela.","explanation":"A subconsulta escalar produz um único valor comparável.","expected":"35 e Python."},
      {"prompt":"Alterar: troque a consulta externa para devolver trilhas com total igual ou acima da média.","hints":["Altere apenas o operador da condição externa."],"solution":"WHERE total >= (SELECT AVG(total) FROM resumo)","explanation":"A CTE continua igual; somente o critério final muda.","expected":"Dados | 2 | 70."},
      {"prompt":"Construir: use uma CTE para calcular o total de todas as trilhas, incluindo zero, e devolva apenas as que estão abaixo da média dos totais.","hints":["LEFT JOIN preserva as trilhas.","COALESCE representa ausência de soma como zero neste relatório."],"solution":"WITH resumo AS (SELECT t.id,t.nome,COALESCE(SUM(l.minutos),0) AS total FROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id GROUP BY t.id,t.nome) SELECT nome,total FROM resumo WHERE total<(SELECT AVG(total) FROM resumo) ORDER BY id;","explanation":"Cada etapa conserva uma linha por trilha e a média usa os dois totais.","expected":"Python | 0."},
      {"prompt":"Investigar erro: uma consulta juntou duas lições a três matrículas e somou 210 em vez de 70. Explique a multiplicação e indique a correção estrutural.","hints":["Conte as combinações antes de somar."],"solution":"Duas lições vezes três matrículas produzem seis linhas. Agregue lições por trilha em uma CTE e matrículas por trilha em outra; depois junte os dois resumos pela identidade da trilha.","explanation":"A correção preserva uma linha por trilha antes de combinar medidas independentes.","expected":"Total de minutos 70 e quantidade de matrículas 3, sem multiplicação cruzada."}
    ],
    "mistakes":["Usar uma subconsulta escalar que devolve várias linhas.","Não executar a etapa interna antes de compor a externa.","Somar após uma junção que multiplicou a granularidade.","Tratar CTE como garantia automática de desempenho."],
    "quiz":[
      {"question":"Por quanto tempo existe uma CTE comum?","options":["Durante a instrução","Para sempre no banco","Até fechar o computador"],"correctIndex":0,"explanation":"WITH nomeia um resultado dentro daquela instrução."},
      {"question":"Quando EXISTS é útil?","options":["Para saber se há ao menos uma correspondência","Para criar tabela permanente","Para ordenar números"],"correctIndex":0,"explanation":"EXISTS responde presença sem precisar devolver ou multiplicar todas as linhas."},
      {"question":"Como evitar somar minutos multiplicados por matrículas?","options":["Usar SUM(DISTINCT minutos) sempre","Agregar cada conjunto antes de juntar os resumos","Remover todas as chaves"],"correctIndex":1,"explanation":"Resumos com uma linha por trilha preservam a unidade correta."}
    ],
    "summary":["Use subconsultas conforme a forma do resultado necessário.","CTEs nomeiam etapas verificáveis sem criar tabelas permanentes.","Agregue antes de juntar medidas independentes."]
  },
"db-transactions": {
    "prerequisites": "Saiba executar UPDATE com WHERE e ler resultados. Subconsultas e CTEs não são obrigatórias para a primeira experiência; conclua db-subqueries-ctes antes dos exercícios de relatórios posteriores.",
    "setup": "Use uma base SQLite nova e descartável para cada aula. Você pode colar o SQL em uma ferramenta SQLite local e executar instrução por instrução. Alternativa sem instalar servidor: com Python 3, salve o SQL em aula.sql e o executor abaixo em executar.py, na mesma pasta; rode python executar.py (ou py executar.py no Windows). Ele cria uma base apenas em memória, imprime cada resultado de consulta e fecha a conexão ao terminar. Cada execução começa vazia. Exercícios usam o estado final do exemplo: acrescente apenas o exercício escolhido ao final de aula.sql e reinicie o executor. Não cole cercas de Markdown nos arquivos. Se faltar o módulo sqlite3, use uma distribuição de Python com esse módulo ou uma ferramenta SQLite. A página apenas guarda rascunhos; o SQL será executado na ferramenta local. Neste executor, não coloque duas instruções completas na mesma linha; cada instrução deve terminar em sua própria linha.",
    "why": "Transferir dez créditos exige retirar dez de Ana e adicionar dez a Beto. Se apenas metade acontecer, o total muda indevidamente. Uma transação transforma essas duas alterações em uma unidade que pode ser confirmada ou desfeita.",
    "sections": [
      {
        "title": "Começar, observar, confirmar",
        "paragraphs": [
          "BEGIN inicia a transação. Alterações feitas depois dele podem ser vistas pela própria conexão antes de serem confirmadas. COMMIT encerra a transação confirmando o conjunto; ROLLBACK encerra descartando mudanças ainda não confirmadas. Uma consulta dentro da transação mostra o estado provisório, não uma promessa de persistência.",
          "No exemplo, Ana possui 100 créditos e Beto 50. Durante a transferência, os valores tornam-se 90 e 60. ROLLBACK recupera 100 e 50. Repetir as mesmas operações e finalizar com COMMIT preservaria 90 e 60. Não é possível usar ROLLBACK depois do COMMIT para desfazer aquela transação já encerrada."
        ]
      },
      {
        "title": "O significado de ACID",
        "paragraphs": [
          "Atomicidade significa tudo ou nada para o conjunto de alterações. Consistência significa que as restrições declaradas precisam ser respeitadas; não significa que o banco adivinhe toda regra comercial. O CHECK saldo>=0 impede saldo negativo, mas não verifica sozinho que o total das contas foi conservado.",
          "Isolamento regula a interação entre operações simultâneas. Durabilidade trata da preservação de uma confirmação conforme as garantias e a configuração do sistema. Esses conceitos não tornam falhas físicas ou configurações inadequadas impossíveis; backups continuam necessários. Uma transação também não inclui automaticamente mensagens enviadas a serviços externos."
        ]
      },
      {
        "title": "Uma unidade de trabalho precisa de critérios de sucesso",
        "paragraphs": [
          "Escrever BEGIN e COMMIT não garante que a lógica esteja correta. A unidade de transferência tem pré-condições: valor positivo, origem diferente do destino, existência das duas contas e saldo suficiente. Também tem pós-condições: o débito e o crédito ocorreram exatamente uma vez, nenhum saldo ficou negativo e a soma foi preservada. No exemplo controlado, as contas são conhecidas; numa aplicação, verifique essas condições dentro da unidade de trabalho quando puderem mudar por concorrência. Se uma delas falhar, execute ROLLBACK e informe uma falha de negócio compreensível.",
          "Uma estratégia para o débito é UPDATE contas SET saldo=saldo-? WHERE id=? AND saldo>=?. Se o driver informa zero linhas afetadas, não prossiga automaticamente para o crédito: pode faltar a conta ou o saldo. Depois, credite no destino e exija uma linha afetada também. Em Python sqlite3, o cursor retornado por execute fornece rowcount para esses UPDATE. O débito e o crédito devem pertencer à mesma transação. Essa condição reduz uma corrida comum, mas toda a operação ainda exige tratamento de erros, verificação do destino e política de repetição adequada ao motor."
        ]
      },
      {
        "title": "Erro exige decisão explícita",
        "paragraphs": [
          "Não suponha que qualquer erro desfaz toda a unidade. No SQLite, uma instrução pode falhar enquanto a transação continua aberta. Se o débito ocorreu e o crédito falhou, a aplicação deve executar ROLLBACK e não anunciar sucesso.",
          "Confirme somente depois de verificar os critérios de sucesso. Em código de aplicação, o caminho completo confirma; o tratamento de falha reverte. Pontos de salvamento e concorrência ficam para a próxima aula."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE contas (\n id INTEGER PRIMARY KEY, nome TEXT NOT NULL,\n saldo INTEGER NOT NULL CHECK(saldo>=0)\n);\nINSERT INTO contas VALUES(1,'Ana',100),(2,'Beto',50);\nBEGIN;\nUPDATE contas SET saldo=saldo-10 WHERE id=1;\nUPDATE contas SET saldo=saldo+10 WHERE id=2;\nSELECT nome,saldo FROM contas ORDER BY id;\nROLLBACK;\nSELECT nome,saldo FROM contas ORDER BY id;\nSELECT SUM(saldo) AS total FROM contas;",
      "explanation": [
        "CHECK impede saldos negativos, enquanto PRIMARY KEY identifica cada conta.",
        "BEGIN coloca os dois UPDATE na mesma unidade de confirmação.",
        "A primeira consulta observa 90 e 60 dentro da própria transação.",
        "ROLLBACK desfaz ambos os UPDATE; a soma final continua 150.",
        "Executor opcional: o código Python está na seção de preparação local. Cada SELECT imprime cabeçalho e linhas; mudanças não produzem uma tabela de saída."
      ],
      "expected": "Antes de ROLLBACK: Ana 90, Beto 60. Depois: Ana 100, Beto 50. Total final: 150."
    },
    "guided": [
      {
        "instruction": "Execute até a consulta anterior ao ROLLBACK e anote os saldos.",
        "result": "A conexão vê seus próprios valores provisórios: 90 e 60."
      },
      {
        "instruction": "Execute ROLLBACK e consulte novamente.",
        "result": "As duas contas voltam juntas a 100 e 50."
      },
      {
        "instruction": "Inicie outra transação, transfira 10 e finalize com COMMIT.",
        "result": "Agora 90 e 60 permanecem após o término da transação."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: partindo dos valores iniciais 100 e 50, credite provisoriamente 5 para Ana e desfaça. Antes de executar, preveja o saldo final.",
        "hints": [
          "Envolva o UPDATE entre BEGIN e ROLLBACK.",
          "Use saldo=saldo+5, sem substituir por valor calculado fora do banco."
        ],
        "solution": "BEGIN;\nUPDATE contas SET saldo=saldo+5 WHERE id=1;\nROLLBACK;\nSELECT saldo FROM contas WHERE id=1;",
        "explanation": "A alteração existe apenas durante a transação e é descartada ao final. Reinicie o laboratório se realizou o passo guiado com COMMIT.",
        "expected": "100."
      },
      {
        "prompt": "Alterar: em uma base inicial nova, transfira 20 de Ana para Beto e confirme; confira o total.",
        "hints": [
          "Use dois UPDATE na mesma transação.",
          "O débito e o crédito precisam ter o mesmo valor."
        ],
        "solution": "BEGIN;\nUPDATE contas SET saldo=saldo-20 WHERE id=1;\nUPDATE contas SET saldo=saldo+20 WHERE id=2;\nCOMMIT;\nSELECT nome,saldo FROM contas ORDER BY id;\nSELECT SUM(saldo) FROM contas;",
        "explanation": "A confirmação preserva os dois movimentos. O teste de soma é uma verificação adicional, não uma constraint automaticamente criada.",
        "expected": "Ana 80; Beto 70; soma 150."
      },
      {
        "prompt": "Construir: partindo de 100 e 50, transfira 15 de Ana para Beto e reverta toda a unidade se o destino não existir.",
        "hints": [
          "Os dois UPDATE pertencem à mesma unidade.",
          "Confira se cada operação afetou uma conta antes de confirmar."
        ],
        "solution": "BEGIN;\nUPDATE contas SET saldo=saldo-15 WHERE id=1;\nUPDATE contas SET saldo=saldo+15 WHERE id=2;\nCOMMIT;\nSELECT nome,saldo FROM contas ORDER BY id;\nSELECT SUM(saldo) FROM contas;",
        "expected": "Ana 85; Beto 65; soma 150. Se o segundo UPDATE afetar zero linhas, ROLLBACK preserva 100 e 50.",
        "explanation": "O caminho de sucesso confirma os dois movimentos. Em uma aplicação, zero linhas no destino deve selecionar o caminho de ROLLBACK."
      },
      {
        "prompt": "Investigar erro: uma transferência debita 10 e credita 11. Substitua por dois movimentos iguais e confirme que a soma permanece 150. Use base inicial nova.",
        "hints": [
          "Atomicidade não corrige um valor errado.",
          "Valide as duas contas e a soma."
        ],
        "solution": "BEGIN;\nUPDATE contas SET saldo=saldo-10 WHERE id=1;\nUPDATE contas SET saldo=saldo+10 WHERE id=2;\nCOMMIT;\nSELECT nome,saldo FROM contas ORDER BY id;\nSELECT SUM(saldo) FROM contas;",
        "expected": "Ana | 90; Beto | 60; soma 150.",
        "explanation": "Os dois movimentos são confirmados juntos e têm a mesma magnitude. O teste da soma detecta o erro aritmético original."
      }
    ],
    "mistakes": [
      "Confirmar depois do débito e antes do crédito: mantenha os dois movimentos na mesma transação.",
      "Achar que qualquer erro desfaz tudo automaticamente: trate o erro e execute ROLLBACK conforme o driver e o motor.",
      "Deixar transações abertas durante interação humana: reduza sua duração e evite bloqueios prolongados."
    ],
    "quiz": [
      {
        "question": "O que ROLLBACK pode desfazer?",
        "options": [
          "Mudanças ainda não confirmadas da transação",
          "Qualquer COMMIT antigo",
          "E-mails enviados"
        ],
        "correctIndex": 0,
        "explanation": "ROLLBACK atua na transação aberta, não em efeitos externos nem em transações já confirmadas."
      },
      {
        "question": "CHECK saldo>=0 garante transferência correta?",
        "options": [
          "Sim, garante todo o processo",
          "Não, somente a regra de não negatividade",
          "Não permite UPDATE"
        ],
        "correctIndex": 1,
        "explanation": "Uma regra local não garante que o débito tenha um crédito correspondente."
      },
      {
        "question": "O débito afetou zero linhas. O que a aplicação deve fazer antes de qualquer crédito?",
        "options": [
          "Creditar normalmente",
          "Tratar a falha da condição e reverter a unidade",
          "Executar COMMIT imediatamente"
        ],
        "correctIndex": 1,
        "explanation": "Zero linhas pode indicar falta de saldo ou origem inexistente; creditar mesmo assim criaria valor indevido."
      }
    ],
    "summary": [
      "Agrupe alterações dependentes em uma transação.",
      "COMMIT confirma; ROLLBACK descarta o que ainda não foi confirmado.",
      "Constraints e regras de negócio continuam necessárias."
    ]
  },
"db-concurrency-boundaries": {
    "prerequisites": "Conclua Transações: confirmar ou desfazer uma unidade (db-transactions). Saiba reconhecer sucesso e falha de uma operação de escrita.",
    "setup": "Use uma base SQLite descartável. Para observar concorrência real, abra duas conexões para o mesmo arquivo em um cliente SQLite ou em dois processos Python; uma base em memória não é compartilhada. Execute o exemplo principal primeiro em uma conexão. Não é necessário instalar servidor.",
    "why": "Uma transação local não elimina disputas entre processos nem desfaz um e-mail já enviado. Reconhecer essas fronteiras evita repetir somente metade de uma operação ou prometer atomicidade entre sistemas diferentes.",
    "sections": [
      {"title":"Ponto de salvamento tem escopo menor","paragraphs":["SAVEPOINT nome marca uma posição dentro da unidade. ROLLBACK TO nome desfaz o trecho posterior e RELEASE encerra o ponto sem confirmar a transação inteira.","Use-o apenas quando a etapa posterior for realmente opcional. Uma transferência indivisível deve reverter por completo, não conservar somente o débito."]},
      {"title":"Concorrência exige transações curtas","paragraphs":["Duas conexões podem tentar escrever ao mesmo tempo. SQLite permite um escritor por vez; BEGIN IMMEDIATE tenta reservar a escrita no início e pode falhar quando outro escritor está ativo.","Prepare dados antes de abrir a transação. Não espere interação humana com a unidade aberta. Operações relativas e condições no UPDATE reduzem conflitos, mas ainda é preciso conferir quantas linhas foram afetadas."]},
      {"title":"Repetir a unidade inteira","paragraphs":["Um conflito transitório pode permitir nova tentativa com espera e limite. Repita a unidade completa após reler o estado; não repita apenas o crédito ou outra metade cujo par ficou incerto.","A operação também precisa tolerar uma solicitação duplicada quando o domínio exigir. Identificadores únicos e registro do resultado ajudam a impedir o mesmo comando de negócio duas vezes."]},
      {"title":"Efeitos externos ficam fora do ROLLBACK","paragraphs":["A transação do banco não desfaz e-mail, chamada de API ou gravação em outro serviço. Registre no banco a intenção de executar o efeito e processe-a separadamente, com rastreamento e proteção contra duplicidade.","COMMIT também não substitui backup. Transações protegem uma unidade de alteração; backup e restauração protegem recuperação histórica."]}
    ],
    "example": {
      "language":"sql",
      "code":"CREATE TABLE tarefas(id INTEGER PRIMARY KEY,titulo TEXT,status TEXT);\nINSERT INTO tarefas VALUES(1,'Publicar aula','pendente');\nBEGIN;\nUPDATE tarefas SET status='publicada' WHERE id=1;\nSAVEPOINT aviso;\nUPDATE tarefas SET titulo='Publicar aula e enviar aviso' WHERE id=1;\nROLLBACK TO aviso;\nRELEASE aviso;\nCOMMIT;\nSELECT id,titulo,status FROM tarefas;",
      "explanation":["A mudança principal ocorre antes do ponto de salvamento.","A alteração opcional do título é desfeita.","COMMIT confirma apenas o estado restante da transação."],
      "expected":"1 | Publicar aula | publicada"
    },
    "guided":[
      {"instruction":"Execute até ROLLBACK TO aviso e consulte a tarefa.","result":"O status continua publicada, mas o título volta a Publicar aula."},
      {"instruction":"Troque ROLLBACK TO por RELEASE e consulte antes de COMMIT.","result":"O título alterado continua visível; RELEASE não desfaz nem confirma a transação inteira."},
      {"instruction":"Em duas conexões ao mesmo arquivo, mantenha uma escrita aberta e tente BEGIN IMMEDIATE na outra.","result":"A segunda conexão não obtém a escrita enquanto a primeira a mantém; a mensagem exata depende do cliente e da configuração de espera."}
    ],
    "exercises":[
      {"prompt":"Prever: após ROLLBACK TO aviso no exemplo, quais mudanças permanecem provisoriamente?","hints":["Separe o que ocorreu antes e depois do SAVEPOINT."],"solution":"O status publicada permanece; a mudança do título é desfeita.","explanation":"ROLLBACK TO volta ao ponto interno, não ao início da transação.","expected":"Título Publicar aula; status publicada."},
      {"prompt":"Alterar: mantenha a mudança opcional do título e confirme tudo.","hints":["Não use ROLLBACK TO; encerre o ponto antes do COMMIT."],"solution":"Substitua ROLLBACK TO aviso por RELEASE aviso e mantenha COMMIT.","explanation":"RELEASE encerra o savepoint sem desfazer o trecho posterior.","expected":"1 | Publicar aula e enviar aviso | publicada"},
      {"prompt":"Construir: descreva um fluxo que registra no banco a publicação e uma intenção pendente de enviar aviso, sem afirmar que o e-mail pertence ao COMMIT.","hints":["Use duas tabelas alteradas na mesma transação.","O envio real ocorre depois e registra sucesso ou falha."],"solution":"Na mesma transação, atualize tarefas e insira um registro único em avisos_pendentes; confirme. Depois, um processo lê o registro, envia o aviso e marca o resultado, tolerando repetição.","explanation":"O banco confirma o estado e a intenção juntos, mas o efeito externo possui ciclo próprio.","expected":"Publicação e intenção persistem juntas; envio real tem estado observável e não é prometido pelo COMMIT."},
      {"prompt":"Investigar erro: após conflito, um programa repetiu apenas o crédito e criou saldo. Explique o defeito e proponha a correção.","hints":["O débito e o crédito formam uma unidade.","Uma nova tentativa precisa reler o estado."],"solution":"A repetição parcial quebrou a unidade. Reverta ou confirme explicitamente a tentativa anterior e repita a transação inteira com limite, nova leitura e proteção contra solicitação duplicada.","explanation":"Repetir somente uma metade não conserva a regra do domínio.","expected":"Nenhum movimento isolado é repetido; a soma permanece invariável."}
    ],
    "mistakes":["Usar SAVEPOINT para aceitar metade de uma operação indivisível.","Repetir somente a instrução que falhou sem conhecer o estado da unidade.","Manter transação aberta enquanto espera o usuário.","Afirmar que ROLLBACK desfaz efeitos em outro serviço."],
    "quiz":[
      {"question":"O que ROLLBACK TO faz?","options":["Desfaz mudanças após um savepoint","Desfaz qualquer COMMIT antigo","Envia uma nova requisição"],"correctIndex":0,"explanation":"Ele retorna ao ponto interno dentro da transação aberta."},
      {"question":"Após conflito transitório, qual parte deve ser repetida?","options":["A unidade completa, com limite e nova leitura","Somente o crédito","Qualquer instrução aleatória"],"correctIndex":0,"explanation":"A regra depende do conjunto, não de uma metade isolada."},
      {"question":"Um ROLLBACK do banco desfaz um e-mail enviado?","options":["Não","Sempre","Somente no SQLite"],"correctIndex":0,"explanation":"O e-mail pertence a outro sistema e exige estratégia própria."}
    ],
    "summary":["Use SAVEPOINT somente para etapas separáveis.","Mantenha transações curtas e repita a unidade completa com limite.","Modele efeitos externos como processos observáveis e tolerantes a repetição."]
  },
"db-docker-basics": {
    "prerequisites": "Conclua a preparação setup-docker (ou setup-docker-alternative se o computador não comportar Docker) e conheça tabelas e consultas SQL do primeiro módulo. Os comandos desta aula vão no terminal, não no editor de SQL.",
    "setup": "Na pasta dados-local, abra um terminal PowerShell, Terminal do macOS ou terminal Linux. Se Docker foi instalado agora, abra um terminal novo e inicie Docker Desktop ou o Engine. Execute docker version, docker compose version e docker ps, um comando por vez. Em docker version, espere as partes Client e Server; em docker compose version, uma versão do plugin; em docker ps, um cabeçalho mesmo sem containers. Se faltar Server, volte à preparação setup-docker e resolva a inicialização. Se Docker não estiver disponível, use setup-docker-alternative para acompanhar os conceitos com SQLite; a prática real de containers fica pendente.",
    "why": "Uma equipe precisa conseguir iniciar a mesma versão de banco e reproduzir um problema. Docker descreve parte desse ambiente, mas não substitui saber SQL, definir permissões ou recuperar dados. Aprender as peças separadamente evita procurar um erro de consulta quando o servidor sequer iniciou.",
    "sections": [
      {
        "title": "Onde o banco realmente executa",
        "paragraphs": [
          "PostgreSQL, MariaDB e MongoDB normalmente executam como processos servidores: ficam aguardando conexões, validam credenciais e atendem consultas. Um cliente como psql ou uma interface gráfica envia comandos ao servidor. Docker fornece uma maneira de iniciar esse processo em um container. O container não é uma tabela nem um formato de banco; o mesmo PostgreSQL continua tendo bases, usuários, transações e arquivos de dados.",
          "SQLite costuma ser uma biblioteca carregada pela própria aplicação e não precisa de servidor nem de container para os primeiros exercícios. Essa diferença explica por que é possível abrir um arquivo SQLite com Python enquanto PostgreSQL precisa de um serviço acessível. O objetivo deste módulo é preparar um laboratório de servidor; não introduzir infraestrutura obrigatória para qualquer programa."
        ]
      },
      {
        "title": "Imagem, container e volume",
        "paragraphs": [
          "Uma imagem é um conjunto de camadas com software e instruções de inicialização. postgres:17 identifica uma imagem PostgreSQL com uma tag de versão. Um container é uma execução configurada dessa imagem, com processos, rede e uma camada gravável própria. É possível criar dois containers da mesma imagem com portas e volumes diferentes; eles não devem compartilhar o mesmo diretório de dados ativo de um banco.",
          "Um volume nomeado mantém dados fora da camada descartável do container. Parar e iniciar o mesmo container é diferente de removê-lo e recriá-lo. A persistência deve sobreviver à recriação quando o volume correto é remontado. Volume não é backup: uma exclusão SQL confirmada continua excluída dentro dele, e falha do computador pode afetar todos os dados locais. Na última aula faremos uma cópia e testaremos restauração."
        ]
      },
      {
        "title": "Cliente, Engine e Compose",
        "paragraphs": [
          "O comando docker é um cliente que pede operações ao Docker Engine. docker version mostra informações do cliente e, quando acessível, do servidor. Ter a versão do cliente impressa e depois receber erro de conexão não significa que o ambiente está pronto. Verifique se Docker Desktop está iniciado, se o Engine funciona e se seu usuário tem acesso ao mecanismo. Não altere permissões do sistema às cegas para silenciar o erro.",
          "Compose lê um arquivo YAML declarando serviços, portas, variáveis e volumes. O comando moderno é docker compose, com espaço. docker compose version confirma a presença do plugin, mas ainda não prova que um container poderá iniciar. Compose evita repetir comandos longos manualmente e facilita guardar a configuração no repositório junto com um README."
        ]
      },
      {
        "title": "Verificar e registrar o ambiente",
        "paragraphs": [
          "Crie a pasta dados-local no editor e guarde nela um README com sistema, versões observadas e objetivo. Execute os comandos do exemplo um por vez no terminal, sem copiar o símbolo de prompt. docker ps lista containers ativos; docker ps -a inclui os parados. Uma lista vazia é válida neste ponto. Se docker não for reconhecido, abra um terminal novo e confira a preparação; se Client aparecer sem Server, inicie ou diagnostique o Engine.",
          "Classifique outras falhas pela etapa: obtenção da imagem, encerramento do container ou conexão ao banco. Na próxima aula, docker compose up poderá baixar a imagem e exigir rede e espaço. Não execute limpeza global para tentar reparar um erro de conexão. Usaremos postgres:17 para manter a versão principal consistente; a tag pode receber atualizações menores e mudar a versão principal requer um plano de migração dos dados. O laboratório usa dados fictícios e porta local. Volume conserva arquivos, mas backup e uso de produção exigem cuidados próprios nas aulas seguintes."
        ]
      }
    ],
    "example": {
      "code": "docker version\ndocker compose version\ndocker ps\ndocker ps -a",
      "language": "Terminal · PowerShell ou Bash",
      "expected": "Versões do cliente e do Engine disponíveis; Compose reconhecido. As tabelas de containers podem estar vazias. Se o Engine estiver parado, registre o erro e inicie-o antes de avançar.",
      "explanation": [
        "version verifica cliente e mecanismo.",
        "compose version verifica o plugin.",
        "ps e ps -a distinguem containers ativos e parados."
      ]
    },
    "guided": [
      {
        "instruction": "Execute docker version e identifique as partes Client e Server.",
        "result": "Você distingue instalação do cliente e disponibilidade do mecanismo."
      },
      {
        "instruction": "Compare docker ps e docker ps -a sem remover nada.",
        "result": "Containers parados só aparecem na segunda listagem."
      },
      {
        "instruction": "Registre sistema e versões num README.",
        "result": "Outra pessoa sabe em qual ambiente você executou o laboratório."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: identifique as peças postgres:17, um processo PostgreSQL em execução e um volume chamado dados; preveja o que persiste após recriar o container.",
        "hints": [
          "Pergunte qual peça contém o software.",
          "Diferencie execução e persistência."
        ],
        "solution": "postgres:17 = imagem\nProcesso em execução = container\ndados = volume",
        "explanation": "A imagem pode originar várias execuções; o volume conserva arquivos entre recriações.",
        "expected": "Três papéis diferentes, sem chamar Docker de banco."
      },
      {
        "prompt": "Alterar: o terminal mostra a versão do cliente e erro de conexão ao Engine. Qual próximo passo e qual comando repetirá para verificar a mudança?",
        "hints": [
          "Reinstalar PostgreSQL não liga o Engine.",
          "Confira Docker Desktop ou serviço Docker."
        ],
        "solution": "1. Confirmar que Docker Desktop/Engine está iniciado.\n2. Repetir docker version.\n3. Só avançar quando Server responder.",
        "explanation": "A falha acontece antes de iniciar o banco.",
        "expected": "Cliente e servidor Docker acessíveis."
      },
      {
        "prompt": "Construir: escreva um README mínimo reproduzível do ambiente.",
        "hints": [
          "Inclua sistema e versões observadas, sem inventá-las.",
          "Registre a pasta e como validar a instalação."
        ],
        "solution": "# Laboratório de dados\nSistema: preencha o seu\nDocker/Compose: preencha as versões observadas\nVerificação: docker version; docker compose version; docker ps\nPróxima etapa: compose.yaml e .env local",
        "explanation": "Um roteiro verificável é melhor que afirmar apenas que foi instalado.",
        "expected": "README permite identificar requisitos e comandos."
      },
      {
        "prompt": "Investigar erro: um colega quer trocar postgres:17 por latest e apagar volumes para resolver um erro de conexão. Investigue.",
        "hints": [
          "Versão, rede e dados são problemas distintos.",
          "Limpeza não é diagnóstico."
        ],
        "solution": "Consultar docker version e docker ps -a; depois logs do serviço.\nPreservar os volumes. Manter a major definida até haver plano de migração.",
        "explanation": "O diagnóstico começa por evidências; apagar dados pode ocultar a causa e destruir o laboratório.",
        "expected": "Hipótese e próxima verificação registradas, sem exclusão de dados."
      }
    ],
    "quiz": [
      {
        "question": "Qual peça deve conservar os arquivos ao recriar um container?",
        "options": [
          "Imagem",
          "Volume montado no caminho correto",
          "Janela do terminal"
        ],
        "correctIndex": 1,
        "explanation": "A camada gravável do container é descartável; o volume possui ciclo de vida separado."
      },
      {
        "question": "docker compose version prova que o banco está pronto?",
        "options": [
          "Sim",
          "Não; confirma apenas o plugin",
          "Sim, se não houver containers"
        ],
        "correctIndex": 1,
        "explanation": "Ainda é necessário acessar Engine, iniciar serviço e verificar banco."
      },
      {
        "question": "SQLite exige Docker para aprender SELECT?",
        "options": [
          "Sim",
          "Só no Windows",
          "Não"
        ],
        "correctIndex": 2,
        "explanation": "SQLite pode executar como biblioteca ou cliente local sem servidor."
      }
    ],
    "mistakes": [
      "Confundir terminal com editor SQL: docker é comando do sistema.",
      "Tentar corrigir conexão apagando volumes: preserve dados e examine o erro.",
      "Confundir imagem com execução: baixar imagem não inicia servidor."
    ],
    "summary": [
      "Docker executa software; PostgreSQL continua sendo o banco.",
      "Volumes preservam arquivos, mas não substituem backup.",
      "Verifique cliente, Engine e Compose separadamente."
    ]
  },
"db-docker-compose": {
    "prerequisites": "Conclua db-docker-basics com Docker e Compose operacionais (preparação setup-docker). Revise CREATE TABLE, INSERT e SELECT. A alternativa setup-docker-alternative permite estudar o desenho, mas não comprova conexão nem persistência em PostgreSQL.",
    "setup": "No editor, abra a pasta dados-local criada na aula anterior e salve o exemplo como compose.yaml. Crie .env com POSTGRES_PASSWORD= seguido de uma senha exclusiva deste laboratório e .gitignore com as linhas .env e *.dump; não registre a senha no README. No terminal aberto nessa pasta, execute docker compose config --quiet, docker compose up -d e docker compose ps, nessa ordem; aguarde db healthy. Para parar e retomar, use docker compose down (sem -v) e depois docker compose up -d na mesma pasta. No computador, a conexão externa será 127.0.0.1:55432, banco estudos, usuário aluno e senha do .env; se ainda não tiver cliente externo, conclua setup-postgresql depois desta aula. Se a porta estiver ocupada, escolha outra porta do host e registre a mudança; não altere 5432 dentro do container.",
    "why": "Uma configuração declarada e pequena permite entender por que a aplicação não conecta e por que os dados sobrevivem. O mesmo endereço não serve automaticamente para clientes dentro e fora de containers.",
    "sections": [
      {
        "title": "Ler configuração e inicialização",
        "paragraphs": [
          "YAML organiza pares chave/valor e listas com indentação. Use espaços, mantendo alinhamento consistente. services contém os serviços do ambiente; db é um nome escolhido por nós. image escolhe o software. environment passa variáveis para a inicialização. ports publica uma porta. volumes monta o armazenamento. A declaração volumes no fim define o volume nomeado, enquanto a entrada dentro do serviço indica onde ele aparece no container.",
          "O campo name dá um nome estável ao projeto. Copiar o mesmo arquivo para outra pasta com o mesmo nome não cria automaticamente um ambiente independente. Para um segundo laboratório, mude nome, porta e volume de forma planejada; não monte o mesmo diretório de dados em dois servidores PostgreSQL simultâneos.",
          "Compose lê .env para substituir a expressão da senha no arquivo. A sintaxe com :? exige um valor não vazio e explica o erro se ele faltar. O arquivo .env fica no computador e não deve entrar no Git; .env.example pode listar o nome da variável com valor fictício. Variáveis de ambiente não são um cofre: quem controla o mecanismo pode inspecionar a configuração. O objetivo aqui é evitar credenciais gravadas no arquivo versionado.",
          "POSTGRES_USER, POSTGRES_DB e POSTGRES_PASSWORD configuram a criação inicial quando o diretório de dados está vazio. Depois que o volume foi inicializado, editar a senha no .env não modifica a senha armazenada no banco. Isso explica uma falha comum: o aluno muda o arquivo, recria o container e tenta autenticar com uma senha nova que ainda não foi aplicada por SQL. Não exclua o volume para trocar senha de uma base com dados importantes."
        ]
      },
      {
        "title": "Duas portas e dois pontos de vista",
        "paragraphs": [
          "O mapeamento 127.0.0.1:55432:5432 tem três partes: endereço de escuta no computador, porta do computador e porta dentro do container. Um cliente gráfico instalado no computador usa 127.0.0.1 e 55432. O PostgreSQL continua escutando em 5432 dentro do container. A restrição ao loopback mantém a publicação local neste laboratório.",
          "Outro serviço na mesma rede Compose pode usar o nome db e a porta 5432, sem passar pela porta publicada no computador. localhost dentro de um container aponta para esse próprio container, não para seu computador nem para outro serviço. Portanto uma futura API em outro container deve usar db:5432. Não copie localhost:55432 para todos os lugares sem identificar de onde parte a conexão.",
          "Se já houver cliente PostgreSQL no computador, informe host, porta, banco, usuário e senha explicitamente, teste a conexão e execute SELECT current_database(), current_user;. Se não houver, a preparação setup-postgresql ensinará a instalar um cliente depois que o serviço estiver funcionando. Se houver outro PostgreSQL local, confira a porta para saber qual base consultou."
        ]
      },
      {
        "title": "Iniciar e comprovar funcionamento",
        "paragraphs": [
          "docker compose config --quiet valida o modelo e a interpolação sem imprimir a configuração resolvida, que poderia conter a senha. docker compose up -d cria ou atualiza os serviços e retorna ao terminal. A primeira execução pode baixar a imagem. docker compose ps mostra estado e porta. O healthcheck executa pg_isready para verificar se o servidor aceita conexões básicas; ainda precisamos executar uma consulta para verificar o banco escolhido.",
          "Use docker compose exec db psql -U aluno -d estudos para abrir o cliente dentro do container. No prompt psql, execute SELECT current_database(), current_user; e confira estudos e aluno. Termine o SQL com ponto e vírgula. Digite \\q para sair do cliente e voltar ao terminal. Essa conexão local interna pode seguir regras diferentes de autenticação da conexão TCP pelo host; teste também o cliente externo com a senha configurada.",
          "Um erro de senha indica que um servidor recusou a credencial; conexão recusada pode indicar serviço parado ou porta errada. Guarde no README os comandos de inicialização e parada, a conexão sem senha e a saída das consultas de verificação. Outra pessoa deve conseguir seguir o roteiro em uma pasta própria."
        ]
      },
      {
        "title": "Persistência observada",
        "paragraphs": [
          "No cliente SQL, crie uma tabela pequena e insira um marcador. Confirme que a consulta devolve o registro. Depois saia do cliente, execute docker compose down sem a opção -v e suba o serviço novamente. Aguarde healthy e consulte a tabela. O registro deve permanecer porque o volume nomeado foi reutilizado no mesmo projeto.",
          "No PostgreSQL 17 da imagem escolhida, usamos /var/lib/postgresql/data. A imagem PostgreSQL 18 e posteriores adotou outro layout; por isso copiar apenas a tag sem revisar montagem e migração é incorreto. Volume montado em um caminho qualquer não garante que o banco esteja gravando nele. A evidência de persistência é consultar os dados depois da recriação, não apenas ver a palavra volumes no YAML."
        ]
      }
    ],
    "example": {
      "code": "# compose.yaml — PostgreSQL 17; não troque a major sem plano de migração.\nname: techhub-dados-lab\nservices:\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_USER: aluno\n      POSTGRES_DB: estudos\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Defina POSTGRES_PASSWORD no arquivo .env}\n    ports:\n      - \"127.0.0.1:55432:5432\"\n    volumes:\n      - dados:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U aluno -d estudos\"]\n      interval: 5s\n      timeout: 5s\n      retries: 10\nvolumes:\n  dados:\n",
      "language": "YAML · salve como compose.yaml",
      "expected": "Após criar .env e executar os comandos: serviço db healthy; porta do host 55432; SELECT current_database(), current_user devolve estudos e aluno.",
      "explanation": [
        "image fixa PostgreSQL 17, compatível com o caminho de dados usado.",
        "environment inicializa o cluster vazio; a senha vem do arquivo local.",
        "ports diferencia host e container; volumes conserva dados.",
        "healthcheck testa disponibilidade básica, não o funcionamento completo da aplicação."
      ]
    },
    "guided": [
      {
        "instruction": "Valide, inicie e consulte docker compose ps.",
        "result": "Configuração aceita, serviço disponível e porta publicada localmente."
      },
      {
        "instruction": "Abra psql com docker compose exec db psql -U aluno -d estudos e execute SELECT 1;",
        "result": "Uma linha com valor 1; termine com \\q."
      },
      {
        "instruction": "Crie prova_volume(id integer PRIMARY KEY), insira 1 e teste down/up sem -v.",
        "result": "SELECT * FROM prova_volume continua devolvendo 1."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: interprete 127.0.0.1:55432:5432 e preveja a conexão do cliente no computador.",
        "hints": [
          "Leia endereço:porta host:porta container.",
          "O cliente do computador não usa o nome db."
        ],
        "solution": "Host: 127.0.0.1\nPorta: 55432\nBanco: estudos\nUsuário: aluno",
        "explanation": "A porta publicada liga o host ao serviço interno.",
        "expected": "Conexão TCP para 127.0.0.1:55432."
      },
      {
        "prompt": "Alterar: a porta 55432 está ocupada. Adapte apenas o necessário e registre a nova porta no README.",
        "hints": [
          "Não mude a porta interna do PostgreSQL.",
          "Altere também o README do cliente."
        ],
        "solution": "ports:\n  - \"127.0.0.1:55433:5432\"",
        "explanation": "Somente a porta do computador mudou; clientes externos agora usam 55433.",
        "expected": "O serviço continua em db:5432 dentro da rede."
      },
      {
        "prompt": "Construir: crie evidência de persistência com uma tabela própria.",
        "hints": [
          "Rode SQL no psql e comandos Docker no terminal.",
          "Saia com \\q antes de down."
        ],
        "solution": "-- No psql:\nCREATE TABLE prova(id integer PRIMARY KEY, texto text NOT NULL);\nINSERT INTO prova VALUES(1,'persistiu');\nSELECT * FROM prova;\n-- Depois de down/up e reconectar:\nSELECT * FROM prova;",
        "explanation": "O ciclo de recriação deve preservar o registro no mesmo volume.",
        "expected": "Antes e depois: 1 | persistiu."
      },
      {
        "prompt": "Investigar erro: uma API em outro container tenta localhost:55432 e falha. Corrija o endereço e explique a origem da conexão.",
        "hints": [
          "localhost é relativo à origem da conexão.",
          "Compose fornece descoberta pelo nome do serviço."
        ],
        "solution": "Host da API na mesma rede: db\nPorta: 5432",
        "explanation": "A API precisa alcançar o container db, não a si mesma.",
        "expected": "A conexão usa o nome de serviço e a porta interna."
      }
    ],
    "quiz": [
      {
        "question": "Onde fica a porta 55432?",
        "options": [
          "No host",
          "Na tabela SQL",
          "No volume"
        ],
        "correctIndex": 0,
        "explanation": "É a porta publicada no computador para clientes externos à rede Compose."
      },
      {
        "question": "Mudar POSTGRES_PASSWORD no .env troca a senha de uma base já inicializada?",
        "options": [
          "Sempre",
          "Não; a inicialização não reescreve automaticamente a credencial existente",
          "Somente ao fechar o editor"
        ],
        "correctIndex": 1,
        "explanation": "O valor inicial é aplicado ao diretório vazio; alteração posterior deve seguir gestão de usuários no banco."
      },
      {
        "question": "Qual evidência confirma persistência?",
        "options": [
          "O arquivo contém volumes",
          "O container tem nome",
          "O registro permanece após recriação usando o mesmo volume"
        ],
        "correctIndex": 2,
        "explanation": "É necessário observar o comportamento e consultar os dados."
      }
    ],
    "mistakes": [
      "Usar tabulação no YAML pode quebrar a estrutura; mantenha espaços.",
      "Executar SQL no PowerShell produz erro: abra psql primeiro.",
      "Usar down -v apaga os volumes declarados; não faz parte do teste de persistência."
    ],
    "summary": [
      "Conexão depende do ponto de origem.",
      "Configuração validada não substitui uma consulta real.",
      "A versão da imagem e o caminho do volume precisam combinar."
    ]
  },
"db-docker-operations": {
    "prerequisites": "Conclua db-docker-compose com PostgreSQL 17 em execução. Para verificar conexão externa, conclua também setup-postgresql; o roteiro principal usa psql dentro do container. Revise transações e a diferença entre dados e arquivos de configuração.",
    "setup": "Use a mesma pasta dados-local, compose.yaml e .env da aula db-docker-compose. No terminal aberto nessa pasta, execute docker compose ps e confirme db healthy antes do exemplo. O exemplo cria ou atualiza marcador de id 1 e testa a cópia em um banco novo chamado estudos_restaurado; se esse destino já existir, escolha outro nome e adapte todos os comandos de destino. Ele termina com docker compose down sem -v. Para fazer os exercícios depois, execute docker compose up -d, aguarde healthy e escolha outro nome para cada banco restaurado. Nenhum passo pede apagar o banco original. Sem Docker, setup-docker-alternative permite estudar o fluxo, mas a recuperação real fica pendente.",
    "why": "Conseguir subir um container é apenas o início. Quando um serviço falha ou alguém exclui um registro, você precisa descobrir o que ocorreu e recuperar uma versão útil dos dados. Um backup que existe mas nunca foi restaurado oferece pouca evidência de recuperação.",
    "sections": [
      {
        "title": "Diagnosticar e preservar o ambiente",
        "paragraphs": [
          "Comece pelo mecanismo: docker version precisa alcançar o servidor. Depois veja docker compose ps e docker compose logs --tail=60 db. O log pode mostrar inicialização em progresso, diretório incompatível com versão ou falha na configuração. Anote a mensagem relevante e a ação anterior; não trate todo erro como senha errada. Logs podem conter dados de aplicação, então compartilhe somente o trecho necessário sem credenciais.",
          "Se o serviço está disponível, confira docker compose port db 5432. Esse comando revela a porta publicada. Teste uma consulta interna via exec. Se ela funciona e a conexão pelo computador não funciona, compare endereço, porta, usuário e banco do cliente externo. Se a conexão funciona e somente uma consulta falha, leia o erro SQL e verifique schema/tabela; reinstalar Docker não corrige uma coluna inexistente.",
          "docker compose stop para os serviços preservando containers. docker compose start inicia os containers existentes. up -d também reconcilia a configuração e pode recriar containers alterados. down remove containers e a rede do projeto, preservando volumes nomeados por padrão. A opção -v acrescenta remoção de volumes declarados; portanto pode eliminar o banco desse laboratório.",
          "Antes de qualquer limpeza, identifique projeto e dados. Não use limpeza global de volumes para resolver problema de porta. Um conflito se resolve escolhendo outra porta do host ou parando conscientemente o serviço que a ocupa. Para experimentar outra major do PostgreSQL, crie ambiente separado e siga migração; não substitua a tag sobre o mesmo volume esperando conversão automática."
        ]
      },
      {
        "title": "Backup lógico e cópia para o computador",
        "paragraphs": [
          "pg_dump exporta uma base PostgreSQL. O formato custom, escolhido por -Fc, permite restauração com pg_restore. O comando grava /tmp/estudos.dump dentro do container; esse arquivo ainda depende do container. docker compose cp copia o dump para o computador. O roteiro evita redirecionar bytes binários com operadores de shell, cujos comportamentos variam entre versões de PowerShell e outros terminais.",
          "O dump de uma base não é uma cópia completa de todos os usuários e configurações de um servidor. Documente também configurações necessárias e como recriar contas de forma controlada. Para o laboratório, restauraremos sob o mesmo usuário em uma base nova. A existência de um arquivo de tamanho maior que zero não prova que os dados essenciais podem ser recuperados; a próxima etapa faz essa verificação."
        ]
      },
      {
        "title": "Restaurar e conferir os dados",
        "paragraphs": [
          "Crie estudos_restaurado com createdb. Copie o arquivo do host de volta para /tmp/restaurar.dump, deixando claro qual cópia está sendo testada. Execute pg_restore com --exit-on-error para interromper se houver erro. Em seguida, consulte a tabela marcador no banco restaurado e compare seu registro com o esperado. A base original estudos permanece disponível para comparação.",
          "Uma restauração tecnicamente concluída ainda precisa de verificações de negócio: contagens, totais e relações relevantes. Uma aplicação pode depender de migrações, permissões e configurações não demonstradas por SELECT 1. Registre quais consultas foram usadas e por quê. Em um ensaio posterior, crie uma alteração na origem após o backup e confirme que ela não aparece no restaurado; isso evidencia o momento da cópia."
        ]
      },
      {
        "title": "Documentar acesso e recuperação",
        "paragraphs": [
          "O .env reduz a chance de versionar uma senha junto do YAML, mas continua sendo arquivo em texto. O .gitignore não remove segredos já commitados. Se uma credencial real foi compartilhada, trocar apenas o arquivo não revoga a credencial; ela precisa ser substituída no sistema correspondente. Para este curso, use credenciais exclusivas do laboratório e dados fictícios.",
          "O usuário aluno criado pela imagem é uma conta de inicialização com privilégios amplos. Não use esse desenho como padrão de acesso de uma aplicação pública. Uma aplicação deve ter usuário próprio e somente as permissões necessárias; Docker não concede essa separação automaticamente. Montagens, porta publicada e acesso ao Engine também fazem parte da superfície de acesso. O laboratório local introduz esses limites sem exigir infraestrutura de produção.",
          "Seu README deve dizer como instalar os requisitos, criar .env a partir de .env.example, iniciar o ambiente, conectar e testar. Inclua como parar preservando dados e qual comando removeria volumes, deixando claro que não pertence ao fluxo normal. Escreva onde ficam os backups e como restaurar uma cópia em destino separado. Não registre senhas nos exemplos ou capturas.",
          "Meça aproximadamente quanto levou para restaurar e validar. Esse ensaio ajuda a discutir RTO, tempo tolerável de recuperação, e RPO, quantidade de dados que se aceita perder desde a última cópia. Um backup por dia pode perder alterações recentes; um volume no mesmo computador não protege contra perda desse computador. No projeto, apresente resultados observados e limitações em vez de prometer segurança absoluta."
        ]
      }
    ],
    "example": {
      "code": "# 1. Na pasta do compose.yaml, crie .env com uma senha local escolhida por você:\n# POSTGRES_PASSWORD=sua_senha_local\n# .gitignore deve conter .env e *.dump\ndocker compose config --quiet\ndocker compose up -d\ndocker compose ps\n# Espere o serviço db indicar healthy; se falhar, examine logs.\ndocker compose exec db psql -U aluno -d estudos -v ON_ERROR_STOP=1 -c \"CREATE TABLE IF NOT EXISTS marcador(id integer PRIMARY KEY, texto text NOT NULL); INSERT INTO marcador VALUES(1,'persistiu') ON CONFLICT(id) DO UPDATE SET texto=EXCLUDED.texto;\"\ndocker compose down\ndocker compose up -d\n# Espere healthy novamente antes da próxima consulta.\ndocker compose exec db psql -U aluno -d estudos -c \"SELECT * FROM marcador;\"\n# Backup em formato custom dentro do container; copie para o computador.\ndocker compose exec db pg_dump -U aluno -d estudos -Fc -f /tmp/estudos.dump\ndocker compose cp db:/tmp/estudos.dump ./estudos.dump\n# Banco restaurado novo (se já existir, escolha outro nome).\ndocker compose exec db createdb -U aluno estudos_restaurado\ndocker compose cp ./estudos.dump db:/tmp/restaurar.dump\ndocker compose exec db pg_restore -U aluno -d estudos_restaurado --exit-on-error /tmp/restaurar.dump\ndocker compose exec db psql -U aluno -d estudos_restaurado -c \"SELECT * FROM marcador;\"\n# Para parar preservando volume:\ndocker compose down\n",
      "language": "Terminal · comandos separados",
      "expected": "O marcador permanece após down/up. O arquivo estudos.dump existe no host e o banco estudos_restaurado devolve o marcador. O comando final para o ambiente preserva o volume nomeado.",
      "explanation": [
        "A consulta inicial cria uma evidência pequena e identificável.",
        "down sem -v testa recriação preservando o volume.",
        "pg_dump grava arquivo custom; compose cp transporta o arquivo sem alterar os bytes.",
        "pg_restore usa destino novo e a consulta verifica dados recuperados."
      ]
    },
    "guided": [
      {
        "instruction": "Leia ps, port e logs antes de alterar a configuração.",
        "result": "Uma hipótese baseada na etapa que falhou."
      },
      {
        "instruction": "Gere o dump e copie-o para o computador.",
        "result": "Uma cópia do arquivo fora do container."
      },
      {
        "instruction": "Restaure em destino novo e confira marcador e contagem.",
        "result": "Evidência de recuperação sem substituir a origem."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: a conexão é recusada no host. Liste três verificações e preveja que evidência cada uma fornece antes de mudar a senha.",
        "hints": [
          "Verifique serviço e publicação.",
          "Uma consulta interna ajuda a separar rede e SQL."
        ],
        "solution": "docker compose ps\ndocker compose port db 5432\ndocker compose logs --tail=60 db",
        "explanation": "Conexão recusada costuma ocorrer antes da validação da senha.",
        "expected": "Estado, porta e mensagem registrados."
      },
      {
        "prompt": "Alterar: adapte a restauração para um destino novo chamado estudos_ensaio2, sem substituir a base original.",
        "hints": [
          "Crie a base antes do restore.",
          "Use o mesmo nome na consulta de conferência."
        ],
        "solution": "docker compose exec db createdb -U aluno estudos_ensaio2\ndocker compose exec db pg_restore -U aluno -d estudos_ensaio2 --exit-on-error /tmp/restaurar.dump\ndocker compose exec db psql -U aluno -d estudos_ensaio2 -c \"SELECT * FROM marcador;\"",
        "explanation": "O destino diferente conserva a base original e a restauração anterior.",
        "expected": "O marcador está no novo banco."
      },
      {
        "prompt": "Construir: escreva um roteiro de recuperação com cinco evidências.",
        "hints": [
          "Inclua configuração, cópia, destino e consulta.",
          "Informe tempo observado sem inventar números."
        ],
        "solution": "1. Versão da imagem e configuração registrada.\n2. Dump gerado e copiado para o host.\n3. Banco novo criado.\n4. Restore sem erros e marcador conferido.\n5. Tempo observado e limitações anotados no README.",
        "explanation": "O roteiro conecta operação e resultado verificável.",
        "expected": "Outra pessoa consegue reproduzir e avaliar a recuperação."
      },
      {
        "prompt": "Investigar erro: um colega editou a senha em .env e recebeu password authentication failed. Investigue sem apagar o volume.",
        "hints": [
          "As variáveis inicializam o cluster vazio.",
          "Diferencie configuração desejada e estado persistido."
        ],
        "solution": "Confirmar usuário, host e porta. Usar credencial vigente para administrar o usuário e alterar sua senha pelo procedimento do PostgreSQL; depois alinhar .env e cliente. Não remover o volume.",
        "explanation": "O estado de autenticação persiste no banco; recriar container não reaplica toda a inicialização.",
        "expected": "Diagnóstico explica a divergência sem perda de dados."
      }
    ],
    "quiz": [
      {
        "question": "Por que copiar o dump para o host?",
        "options": [
          "Para renomear a tabela",
          "Para ter o arquivo fora do ciclo de vida do container",
          "Para dispensar restauração"
        ],
        "correctIndex": 1,
        "explanation": "O arquivo dentro de /tmp pode desaparecer com o container; copiar não dispensa validação e proteção."
      },
      {
        "question": "Qual comando ameaça o volume nomeado do projeto?",
        "options": [
          "docker compose ps",
          "docker compose logs",
          "docker compose down -v"
        ],
        "correctIndex": 2,
        "explanation": "A opção -v remove volumes declarados, podendo eliminar o banco."
      },
      {
        "question": "Qual é a evidência mais útil de recuperação?",
        "options": [
          "Arquivo de backup existe",
          "Restore em destino separado e consultas de negócio conferidas",
          "Container aparece como running"
        ],
        "correctIndex": 1,
        "explanation": "Recuperar e comparar dados prova mais que apenas produzir um arquivo."
      }
    ],
    "mistakes": [
      "Confundir volume com backup: ambos podem conter a mesma exclusão acidental.",
      "Restaurar sobre a origem durante um exercício: use banco novo.",
      "Confundir healthy com aplicação correta: execute consultas e valide regras."
    ],
    "summary": [
      "Diagnostique por camadas antes de alterar dados.",
      "Backup precisa de restauração e conferência.",
      "Documente ambiente, acesso e limites do laboratório."
    ]
  },
"db-postgres": {
    "prerequisites": "Modelagem relacional, SELECT, JOIN, chaves, restrições e transações das aulas anteriores. No exemplo com Python, saber executar um arquivo e reconhecer uma tupla.",
    "setup": "1. Instale PostgreSQL pelo instalador da sua plataforma, incluindo servidor e ferramentas de linha de comando; registre a senha definida para o usuário administrativo local e mantenha o serviço iniciado. 2. Abra SQL Shell (psql) no Windows ou o terminal com psql disponível. No terminal use psql -h localhost -U postgres -d postgres; informe a senha quando solicitada. Se seu administrador configurou outro usuário, use-o. 3. Dentro de psql execute CREATE DATABASE hub_pg_aula; e depois \\connect hub_pg_aula. 4. Execute SELECT current_database(), current_user;: o banco deve ser hub_pg_aula. 5. Cole o exemplo abaixo somente nessa base nova. Para sair de psql use \\q. Os comandos com barra invertida pertencem ao psql e não ao editor SQL genérico.",
    "why": "Um cadastro de cursos pode parecer correto na tela e ainda aceitar duas matrículas iguais ou uma matrícula para curso inexistente. Aqui o banco participa da proteção dessas regras. Você verificará tanto um relatório quanto uma alteração desfeita, habilidades úteis ao investigar dados de uma aplicação.",
    "sections": [
      {
        "title": "Servidor, cliente, banco e schema",
        "paragraphs": [
          "O programa psql é um cliente de terminal. Fechá-lo encerra sua conexão, mas não desliga o servidor nem apaga os registros. O servidor PostgreSQL pode conter vários bancos separados; cada conexão seleciona um banco. Dentro dele, schemas agrupam objetos como tabelas. Nesta aula usamos o schema padrão de um banco recém-criado, e nomes simples em minúsculas para reduzir ambiguidades. Uma tabela chamada cursos em outro banco não é a mesma tabela deste laboratório.",
          "O comando CREATE DATABASE exige permissão para criar banco. Se ele falhar por autorização, não tente modificar usuários de um servidor compartilhado: peça um banco de treinamento ou use sua instalação local. Se a conexão falhar antes do prompt SQL, examine se o serviço iniciou e se host, porta, usuário e senha correspondem à instalação. A porta habitual é 5432, mas o instalador pode usar outra; acrescente -p seguido da porta correta quando necessário.",
          "No psql, \\dt lista tabelas e \\d cursos descreve colunas e restrições. Esses comandos são atalhos do cliente; não os coloque em uma consulta enviada pela aplicação. Já SELECT current_database() é SQL executado pelo servidor. Saber essa diferença evita procurar um defeito no banco quando apenas se usou um comando de cliente no lugar errado. Para repetir o laboratório, prefira outra base vazia em vez de apagar dados desconhecidos."
        ],
        "terms": [{"term": "Schema", "meaning": "Agrupamento nomeado de objetos dentro de um banco PostgreSQL, como tabelas; não é outro banco."}]
      },
      {
        "title": "Tipos e regras formam um contrato",
        "paragraphs": [
          "A coluna id usa GENERATED ALWAYS AS IDENTITY para o servidor gerar identificadores. A chave primária acrescenta unicidade e identificação da linha; geração automática isolada não substitui essa restrição. O exemplo omite id nos INSERTs. Em uma base vazia, os cursos recebem 1 e 2. Em aplicações reais, obtenha o identificador inserido com RETURNING id, em vez de supor que o próximo número está livre ou que todos os números serão consecutivos.",
          "TEXT guarda o título, INTEGER representa uma carga inteira e BOOLEAN expressa um estado lógico. NOT NULL proíbe ausência, UNIQUE impede títulos repetidos e CHECK exige carga positiva. Note que título vazio continua sendo um texto não nulo; impedir apenas espaços requer uma regra adicional. Cada restrição resolve uma parte do contrato, e a interface deve explicar ao usuário as violações sem abandonar a validação no banco.",
          "matriculas.curso_id referencia cursos.id. Não copiar o título para cada matrícula evita que renomear o curso deixe nomes contraditórios. UNIQUE(curso_id, aluno) representa uma simplificação didática: um nome só pode aparecer uma vez no curso. Em um sistema real, duas pessoas podem compartilhar nome; uma tabela alunos com identificador próprio substitui o texto como identidade. Reconhecer essa limitação vale mais do que copiar o modelo para produção."
        ]
      },
      {
        "title": "Ler o relatório antes de alterá-lo",
        "paragraphs": [
          "LEFT JOIN preserva cursos sem matrícula. COUNT(m.id) conta apenas matrículas encontradas; COUNT(*) contaria também a linha produzida para um curso sem correspondência. O FILTER limita a contagem de concluídos às linhas cujo booleano é verdadeiro. Esse recurso do PostgreSQL pode ser substituído por SUM com CASE em dialetos sem a mesma construção. A pergunta de negócio é estável, mas o comando pode mudar.",
          "GROUP BY reúne as matrículas de cada curso. Ordenar por título torna a comparação previsível: Python aparece antes de SQL. Espere Python com uma inscrição e nenhuma conclusão, SQL com duas inscrições e uma conclusão. Uma saída em ordem diferente sem ORDER BY não é evidência de corrupção; o banco não promete a ordem natural de armazenamento como ordem de apresentação.",
          "Para investigar um total errado, execute primeiro a junção sem agregação: selecione título, aluno e concluida. Conte as linhas manualmente e só então retorne à soma. Isso revela duplicações causadas por joins incorretos. Em bases maiores, um índice pode ajudar a localizar dados, mas não corrige uma junção logicamente errada. Use EXPLAIN para conhecer o plano sem pressupor que um índice será usado numa tabela minúscula."
        ]
      },
      {
        "title": "Transações e rotina de diagnóstico",
        "paragraphs": [
          "BEGIN inicia o grupo de alterações; UPDATE marca Beto; ROLLBACK desfaz essa alteração. A consulta final deve mostrar falso. Dentro de uma transação explícita, erros podem deixar a transação abortada: execute ROLLBACK antes de tentar novos comandos. O erro preserva informação útil sobre qual regra foi violada; não o esconda repetindo comandos aleatórios. Faça experiências inválidas separadas do carregamento inicial para manter o estado previsível.",
          "Substituir ROLLBACK por COMMIT confirma a mudança. Teste isso apenas no laboratório e depois restaure o dado se quiser repetir a saída original. Uma transação curta reduz o tempo em que outras operações precisam esperar por recursos. Não deixe BEGIN aberto enquanto você sai para outra atividade. Em uma aplicação, use o gerenciamento de transações do driver e faça consultas parametrizadas; o placeholder exato pertence ao driver, não deve ser copiado de outro banco.",
          "Ao encerrar, registre versão do servidor, comando de conexão sem senha, esquema criado e resultados dos testes. Esse pequeno relatório permite que outra pessoa reproduza o defeito ou a solução. A competência desta aula é trabalhar com uma base local simples e explicar seus resultados. Replicação, ajuste fino de desempenho, políticas de acesso e recuperação de desastre exigem prática própria; não são dominados apenas por ter instalado o servidor."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE cursos (\n  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  titulo TEXT NOT NULL UNIQUE,\n  carga INTEGER NOT NULL CHECK (carga > 0)\n);\nCREATE TABLE matriculas (\n  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  curso_id INTEGER NOT NULL REFERENCES cursos(id),\n  aluno TEXT NOT NULL,\n  concluida BOOLEAN NOT NULL DEFAULT FALSE,\n  UNIQUE(curso_id, aluno)\n);\nINSERT INTO cursos(titulo, carga) VALUES ('SQL', 20), ('Python', 30);\nINSERT INTO matriculas(curso_id, aluno, concluida)\nVALUES (1, 'Ana', TRUE), (1, 'Beto', FALSE), (2, 'Ana', FALSE);\nSELECT c.titulo, COUNT(m.id) AS inscritos,\n       COUNT(*) FILTER (WHERE m.concluida) AS concluidos\nFROM cursos c LEFT JOIN matriculas m ON m.curso_id = c.id\nGROUP BY c.id, c.titulo ORDER BY c.titulo;\nBEGIN;\nUPDATE matriculas SET concluida = TRUE WHERE id = 2;\nROLLBACK;\nSELECT aluno, concluida FROM matriculas WHERE id = 2;",
      "explanation": [
        "As tabelas são criadas antes dos dados que dependem delas.",
        "O relatório combina relação, agregação e filtro booleano.",
        "A alteração de Beto é revertida de propósito para demonstrar rollback."
      ],
      "expected": "Python | 1 | 0; SQL | 2 | 1. Ao final: Beto | false (psql pode mostrar f)."
    },
    "guided": [
      {
        "instruction": "Prepare o ambiente descrito acima e confirme a conexão antes de executar o exemplo. Use uma base vazia exclusiva desta aula.",
        "result": "Você consegue identificar qual programa executa o comando e qual banco recebe os dados."
      },
      {
        "instruction": "Execute o exemplo completo na ordem apresentada. Compare nomes e números com a saída esperada, ignorando apenas o desenho das colunas feito pelo cliente.",
        "result": "Python | 1 | 0; SQL | 2 | 1. Ao final: Beto | false (psql pode mostrar f)."
      },
      {
        "instruction": "Faça cada exercício partindo dos dados originais, exceto quando o enunciado pedir continuidade. Registre comando, resultado e explicação.",
        "result": "Você consegue reproduzir o resultado sem depender de clicar em uma tabela no cliente."
      }
    ],
    "exercises": [
      {
        "prompt": "Leia as linhas antes da agregação. Mostre título, aluno e conclusão, ordenando por título e aluno.",
        "hints": [
          "Use a mesma condição de JOIN.",
          "Remova COUNT e GROUP BY."
        ],
        "solution": "SELECT c.titulo,m.aluno,m.concluida FROM cursos c JOIN matriculas m ON m.curso_id=c.id ORDER BY c.titulo,m.aluno;",
        "explanation": "As três matrículas explicam os totais.",
        "expected": "Python/Ana/false; SQL/Ana/true; SQL/Beto/false."
      },
      {
        "prompt": "Adicione o curso Git com carga 10 e execute o relatório original.",
        "hints": [
          "Insira apenas título e carga.",
          "LEFT JOIN deve preservar o curso novo."
        ],
        "solution": "INSERT INTO cursos(titulo,carga) VALUES ('Git',10);",
        "explanation": "COUNT(m.id) permanece zero para curso sem matrícula.",
        "expected": "Git | 0 | 0; Python | 1 | 0; SQL | 2 | 1."
      },
      {
        "prompt": "Provoque uma carga inválida sem alterar os dados confirmados.",
        "hints": [
          "Use transação explícita.",
          "Após o erro, faça ROLLBACK."
        ],
        "solution": "BEGIN;\nINSERT INTO cursos(titulo,carga) VALUES ('Invalido',0);\n-- O comando acima deve falhar. Execute o próximo separadamente:\nROLLBACK;\nSELECT COUNT(*) FROM cursos WHERE titulo='Invalido';",
        "explanation": "A restrição CHECK rejeita zero e o rollback encerra a transação abortada.",
        "expected": "Erro de CHECK; contagem final 0."
      },
      {
        "prompt": "Nos dados originais, conclua Beto em uma transação confirmada e demonstre que SQL passou a ter duas conclusões.",
        "hints": [
          "Atualize pela chave id=2.",
          "Use COMMIT e repita a agregação."
        ],
        "solution": "BEGIN;\nUPDATE matriculas SET concluida=TRUE WHERE id=2;\nCOMMIT;\nSELECT COUNT(*) FROM matriculas WHERE curso_id=1 AND concluida;",
        "explanation": "O filtro por curso evita somar conclusões de outro curso.",
        "expected": "2; repetindo a consulta após reconectar, continua 2."
      }
    ],
    "mistakes": [
      "Copiar SQL de outro mecanismo sem conferir tipos, geração de identificadores e sintaxe de transação.",
      "Executar novamente a criação em tabelas já existentes e interpretar o erro como falha do exemplo.",
      "Confundir falha de conexão com erro de consulta: verifique serviço, endereço, credencial e banco antes do SQL.",
      "Marcar como concluído sem executar os exercícios e comparar resultados."
    ],
    "quiz": [
      {
        "question": "Qual comando é específico do cliente psql?",
        "options": [
          "SELECT current_database();",
          "\\dt",
          "CREATE TABLE cursos(id INT);"
        ],
        "correctIndex": 1,
        "explanation": "A barra invertida indica um metacomando do psql."
      },
      {
        "question": "Por que contar m.id em um LEFT JOIN?",
        "options": [
          "Para ignorar a linha sem matrícula correspondente",
          "Para ordenar os títulos",
          "Para gerar IDs"
        ],
        "correctIndex": 0,
        "explanation": "COUNT(coluna) ignora NULL e representa corretamente zero matrículas."
      },
      {
        "question": "Uma transação ficou abortada após violação de CHECK. Como encerrar a tentativa?",
        "options": [
          "Criar um índice",
          "Reinstalar PostgreSQL",
          "ROLLBACK"
        ],
        "correctIndex": 2,
        "explanation": "Rollback descarta a tentativa e permite começar uma nova transação."
      }
    ],
    "summary": [
      "O cliente envia comandos; o mecanismo aplica regras e armazena dados.",
      "A mesma modelagem pode exigir sintaxe diferente em cada produto.",
      "Restrições protegem o banco, e consultas ordenadas tornam resultados verificáveis.",
      "Uma base funcional permite criar, consultar e corrigir exemplos pequenos; operação de produção exige estudo adicional."
    ]
  },
"db-mariadb": {
    "prerequisites": "Modelagem relacional, SELECT, JOIN, chaves, restrições e transações das aulas anteriores. No exemplo com Python, saber executar um arquivo e reconhecer uma tupla.",
    "setup": "1. Instale MariaDB Server e o cliente mariadb usando o instalador da plataforma; configure uma senha administrativa local e inicie o serviço. 2. Abra o cliente incluído no instalador ou um terminal na pasta dos executáveis. Conecte com mariadb -h localhost -u root -p e informe a senha no prompt. Em instalações Linux que usam autenticação por socket, use o método administrativo configurado, frequentemente sudo mariadb. 3. No prompt SQL execute CREATE DATABASE hub_maria_aula CHARACTER SET utf8mb4; e USE hub_maria_aula;. 4. Confira SELECT DATABASE(), VERSION();. 5. Rode o exemplo em banco vazio. exit encerra o cliente. Se a instalação usa outra porta, informe -P seguida da porta; não confunda o -p de senha com -P de porta.",
    "why": "Você precisa transferir o pequeno cadastro de cursos para um sistema que usa MariaDB. O modelo continua válido, mas identidade, booleanos e alguns comandos mudam. A aula ensina a adaptar conscientemente e a verificar as garantias do mecanismo escolhido.",
    "sections": [
      {
        "title": "Produto, cliente e mecanismo de armazenamento",
        "paragraphs": [
          "MariaDB Server recebe conexões e coordena dados. O cliente mariadb envia comandos pelo terminal; uma interface gráfica é outro cliente, não outro banco. Dentro do servidor, o mecanismo de armazenamento define como tabelas são geridas. Declaramos ENGINE=InnoDB porque queremos transações e integridade referencial. Não assuma que toda tabela em qualquer instalação histórica usa o mesmo mecanismo; consulte SHOW CREATE TABLE cursos para examinar a definição efetiva.",
          "O comando USE seleciona o banco da sessão. Ao abrir outra conexão, confirme novamente com SELECT DATABASE(). Um erro dizendo que nenhuma base foi selecionada não é defeito do CREATE TABLE: falta contexto da sessão. Para ver tabelas use SHOW TABLES; para examinar colunas use DESCRIBE cursos;. Esses comandos diferem dos atalhos de psql, mesmo quando o objetivo humano é igual.",
          "MariaDB e MySQL compartilham muitas construções, mas são produtos distintos que evoluem separadamente. Não use essa proximidade como promessa de que recursos recentes, tipos, JSON, otimizações e ferramentas sejam intercambiáveis. Anote a versão retornada por VERSION() e teste o recurso na versão alvo. Nesta aula usamos recursos básicos de versões atuais suportadas; instalações antigas podem ter comportamento diferente, inclusive sobre CHECK."
        ]
      },
      {
        "title": "Identidade, texto e estados válidos",
        "paragraphs": [
          "AUTO_INCREMENT gera o valor de id quando ele é omitido. A sequência pode ter lacunas após tentativas que falham ou exclusões; não use o número como quantidade de registros. Para contar, use COUNT. O exemplo começa em tabelas vazias para que 1 e 2 sejam referências previsíveis. Em uma aplicação, obtenha a chave gerada pelo driver ou pelo mecanismo correspondente da conexão, em vez de consultar o maior id do banco.",
          "VARCHAR(100) limita o tamanho declarado do título e utf8mb4 permite representar uma ampla variedade de caracteres Unicode. Comparações de texto dependem também da collation: dependendo da configuração, maiúsculas e acentos podem ser considerados equivalentes. UNIQUE protege conforme essa regra de comparação. Se o produto precisa distinguir dois títulos que variam só em maiúsculas, isso deve ser uma decisão de requisito e configuração, não uma surpresa no cadastro.",
          "O exemplo representa conclusão com TINYINT e CHECK IN (0,1). MariaDB oferece BOOLEAN como sinônimo de tipo numérico, o que não obriga sozinho que somente zero e um sejam gravados. A restrição explícita torna o contrato legível. A coluna curso_id tem tipo compatível com a chave referenciada. FOREIGN KEY impede matrícula órfã, e a combinação curso e aluno impede duplicidade no modelo simplificado. Pessoas reais devem ter sua própria identidade em outra tabela."
        ]
      },
      {
        "title": "Consultas portáveis e limites da portabilidade",
        "paragraphs": [
          "O relatório usa SUM(CASE WHEN ... THEN 1 ELSE 0 END). Para cada linha, CASE produz um ou zero; SUM calcula o total de conclusões. No LEFT JOIN, o curso sem matrícula gera uma linha sem dados do lado direito; a condição não é verdadeira e ELSE devolve zero. COUNT(m.id) também devolve zero. Essa técnica torna explícito o tratamento de ausência e funciona em vários mecanismos relacionais.",
          "GROUP BY inclui id e título. Isso expressa a intenção sem depender de permissões mais relaxadas para selecionar colunas não agrupadas. Se duas linhas puderem compartilhar título em outro modelo, agrupar só pelo título fundiria cursos distintos. Aprenda a escolher a identidade do grupo antes de memorizar a sintaxe. O ORDER BY final define a apresentação, e LIMIT pode restringir a quantidade de linhas, mas sem ordem definida não seleciona de forma estável as primeiras.",
          "Para comparar a versão PostgreSQL com esta, escreva uma tabela de decisões no caderno: identidade usa AUTO_INCREMENT; estado usa inteiro restrito; contagem condicional usa CASE. SELECT, JOIN e a regra de relação se mantêm. Portar significa testar equivalência de resultados e de regras, incluindo erros esperados. Uma consulta que roda sem erro ainda pode tratar NULL, datas ou comparações textuais de outra maneira."
        ]
      },
      {
        "title": "Transações, DDL e prática responsável",
        "paragraphs": [
          "START TRANSACTION inicia a unidade de trabalho; ROLLBACK descarta a alteração de Beto. No modo usual de autocommit, comandos fora de transação explícita são confirmados individualmente. Por isso duas atualizações que precisam acontecer juntas devem entrar no mesmo grupo. InnoDB oferece esse controle; misturar tabelas de mecanismos com garantias diferentes pode quebrar a expectativa de desfazer tudo.",
          "Muitos comandos de definição, como CREATE TABLE, provocam confirmação implícita no MariaDB. Não use um ROLLBACK posterior como promessa de desfazer a criação do laboratório. Separe a fase de preparar tabelas da fase de testar mudanças de dados. Essa diferença operacional é relevante ao migrar scripts de outro produto. Para refazer a aula, crie outro banco local ou remova somente as tabelas conhecidas do seu laboratório, após conferir o contexto.",
          "Inspecione uma mudança antes de confirmá-la: execute SELECT com o mesmo filtro do UPDATE, confirme quais linhas correspondem e só então altere. Depois verifique a quantidade afetada e a consulta de resultado. Isso reduz erros de filtro, mas não substitui controle de concorrência em produção. Não use conta administrativa na aplicação real: credenciais de aplicação devem ter apenas as permissões necessárias e ficar fora do código público.",
          "Ao concluir, você deve conseguir justificar InnoDB, explicar cada restrição e reproduzir o relatório. A experiência fornece familiaridade operacional básica. Ajustar configurações do servidor, recuperar backups e garantir desempenho em grande carga são tarefas adicionais. Um registro de consultas e saídas é uma evidência mais útil de aprendizado do que simplesmente declarar que conhece todos os comandos do MariaDB."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE cursos (\n id INT AUTO_INCREMENT PRIMARY KEY,\n titulo VARCHAR(100) NOT NULL UNIQUE,\n carga INT NOT NULL CHECK(carga > 0)\n) ENGINE=InnoDB;\nCREATE TABLE matriculas (\n id INT AUTO_INCREMENT PRIMARY KEY,\n curso_id INT NOT NULL,\n aluno VARCHAR(80) NOT NULL,\n concluida TINYINT NOT NULL DEFAULT 0 CHECK(concluida IN (0,1)),\n CONSTRAINT fk_matriculas_curso FOREIGN KEY(curso_id) REFERENCES cursos(id),\n UNIQUE(curso_id,aluno)\n) ENGINE=InnoDB;\nINSERT INTO cursos(titulo,carga) VALUES ('SQL',20),('Python',30);\nINSERT INTO matriculas(curso_id,aluno,concluida)\nVALUES (1,'Ana',1),(1,'Beto',0),(2,'Ana',0);\nSELECT c.titulo,COUNT(m.id) AS inscritos,\n SUM(CASE WHEN m.concluida=1 THEN 1 ELSE 0 END) AS concluidos\nFROM cursos c LEFT JOIN matriculas m ON m.curso_id=c.id\nGROUP BY c.id,c.titulo ORDER BY c.titulo;\nSTART TRANSACTION;\nUPDATE matriculas SET concluida=1 WHERE id=2;\nROLLBACK;\nSELECT aluno,concluida FROM matriculas WHERE id=2;",
      "explanation": [
        "InnoDB é declarado nas duas tabelas.",
        "CASE evita depender do FILTER específico usado no exemplo PostgreSQL.",
        "A alteração de dados fica dentro de uma transação que será desfeita."
      ],
      "expected": "Python | 1 | 0; SQL | 2 | 1. Ao final: Beto | 0."
    },
    "guided": [
      {
        "instruction": "Prepare o ambiente descrito acima e confirme a conexão antes de executar o exemplo. Use uma base vazia exclusiva desta aula.",
        "result": "Você consegue identificar qual programa executa o comando e qual banco recebe os dados."
      },
      {
        "instruction": "Execute o exemplo completo na ordem apresentada. Compare nomes e números com a saída esperada, ignorando apenas o desenho das colunas feito pelo cliente.",
        "result": "Python | 1 | 0; SQL | 2 | 1. Ao final: Beto | 0."
      },
      {
        "instruction": "Faça cada exercício partindo dos dados originais, exceto quando o enunciado pedir continuidade. Registre comando, resultado e explicação.",
        "result": "Você consegue reproduzir o resultado sem depender de clicar em uma tabela no cliente."
      }
    ],
    "exercises": [
      {
        "prompt": "Inspecione a definição real de matriculas e localize a chave estrangeira e o mecanismo.",
        "hints": [
          "Use SHOW CREATE TABLE.",
          "A saída pode normalizar nomes e espaços."
        ],
        "solution": "SHOW CREATE TABLE matriculas;",
        "explanation": "Inspeção confirma a regra que foi criada, não apenas o texto que você tentou executar.",
        "expected": "ENGINE=InnoDB e referência de curso_id para cursos.id."
      },
      {
        "prompt": "Nos dados originais, liste apenas as matrículas pendentes de SQL, por nome.",
        "hints": [
          "Combine JOIN e WHERE.",
          "Estado pendente é zero."
        ],
        "solution": "SELECT m.aluno FROM matriculas m JOIN cursos c ON c.id=m.curso_id WHERE c.titulo='SQL' AND m.concluida=0 ORDER BY m.aluno;",
        "explanation": "O curso e o estado são filtros independentes.",
        "expected": "Beto."
      },
      {
        "prompt": "Teste um estado inválido sem deixar alterações no banco.",
        "hints": [
          "Use transação.",
          "CHECK deve rejeitar 7 em versão atual."
        ],
        "solution": "START TRANSACTION;\nUPDATE matriculas SET concluida=7 WHERE id=2;\n-- Após observar o erro, execute:\nROLLBACK;\nSELECT concluida FROM matriculas WHERE id=2;",
        "explanation": "A regra restringe o inteiro a zero ou um. Se não houver rejeição, revise versão e definição antes de seguir.",
        "expected": "Erro de CHECK; Beto permanece 0."
      },
      {
        "prompt": "Adicione Git sem matrículas e obtenha somente cursos sem inscrições.",
        "hints": [
          "LEFT JOIN preserva Git.",
          "Teste a chave do lado direito com IS NULL."
        ],
        "solution": "INSERT INTO cursos(titulo,carga) VALUES ('Git',10);\nSELECT c.titulo FROM cursos c LEFT JOIN matriculas m ON m.curso_id=c.id WHERE m.id IS NULL ORDER BY c.titulo;",
        "explanation": "NULL aqui indica ausência de correspondência; não se compara com = NULL.",
        "expected": "Git."
      }
    ],
    "mistakes": [
      "Copiar SQL de outro mecanismo sem conferir tipos, geração de identificadores e sintaxe de transação.",
      "Executar novamente a criação em tabelas já existentes e interpretar o erro como falha do exemplo.",
      "Confundir falha de conexão com erro de consulta: verifique serviço, endereço, credencial e banco antes do SQL.",
      "Marcar como concluído sem executar os exercícios e comparar resultados."
    ],
    "quiz": [
      {
        "question": "Qual escolha oferece as garantias usadas nas tabelas desta aula?",
        "options": [
          "ENGINE=InnoDB",
          "Nome da tabela em maiúsculas",
          "Cliente gráfico"
        ],
        "correctIndex": 0,
        "explanation": "O mecanismo de armazenamento participa das garantias transacionais e referenciais."
      },
      {
        "question": "BOOLEAN sozinho obriga apenas 0 ou 1 em MariaDB?",
        "options": [
          "Sim sempre",
          "Não; a regra precisa ser expressa",
          "Apenas no terminal"
        ],
        "correctIndex": 1,
        "explanation": "É um sinônimo numérico; o CHECK limita o domínio no exemplo."
      },
      {
        "question": "É correto confiar em ROLLBACK para desfazer todo CREATE TABLE no MariaDB?",
        "options": [
          "Sim, qualquer DDL é revertido",
          "Sim, se usar maiúsculas",
          "Não; DDL pode confirmar implicitamente"
        ],
        "correctIndex": 2,
        "explanation": "Planeje migrações sabendo que definição de estrutura e transações de dados têm diferenças."
      }
    ],
    "summary": [
      "O cliente envia comandos; o mecanismo aplica regras e armazena dados.",
      "A mesma modelagem pode exigir sintaxe diferente em cada produto.",
      "Restrições protegem o banco, e consultas ordenadas tornam resultados verificáveis.",
      "Uma base funcional permite criar, consultar e corrigir exemplos pequenos; operação de produção exige estudo adicional."
    ]
  },
"db-sqlite": {
    "prerequisites": "Modelagem relacional, SELECT, JOIN, chaves, restrições e transações das aulas anteriores. No exemplo com Python, saber executar um arquivo e reconhecer uma tupla.",
    "setup": "1. Instale Python 3 caso ainda não esteja disponível. No terminal execute python --version ou py --version no Windows. 2. Crie uma pasta de estudo e um arquivo sqlite_aula.py; não o chame sqlite3.py, pois isso esconderia a biblioteca. 3. Copie o exemplo inteiro. 4. Execute python sqlite_aula.py ou py sqlite_aula.py. 5. Compare as quatro linhas da saída. Não precisa instalar pacote pelo pip nas distribuições comuns que incluem sqlite3; se import sqlite3 falhar, confira sua distribuição Python. O exemplo usa :memory: para começar limpo em cada execução, sem criar ou apagar arquivos de banco.",
    "why": "Um programa pode precisar armazenar registros sem configurar serviço de banco. SQLite permite praticar SQL real com uma dependência pequena. A lição combina restrições, parâmetros e uma falha controlada para mostrar que armazenamento local também exige contratos e transações.",
    "sections": [
      {
        "title": "Um mecanismo incorporado e duas formas de persistência",
        "paragraphs": [
          "sqlite3.connect(\":memory:\") cria um banco temporário vinculado à conexão. Ao fechar, os dados desaparecem. Isso torna os exemplos reproduzíveis, mas não serve para guardar o progresso entre execuções. Usar sqlite3.connect(\"hub.db\") abre ou cria um arquivo no diretório de trabalho. O arquivo pertence ao mecanismo: não é JSON nem texto para editar manualmente. A aplicação precisa consultar e alterar seu conteúdo pela interface SQL.",
          "Não há servidor separado nesta arquitetura: o código Python chama uma biblioteca no mesmo processo. O cliente de terminal sqlite3, quando instalado, é outro modo de usar essa biblioteca; ele não é exigido pelo exemplo. Comandos como .tables pertencem àquele cliente e não funcionam em con.execute. Já PRAGMA é uma extensão SQL do SQLite para consultar ou configurar comportamentos do mecanismo.",
          "Comece em memória para separar erros de código de estado antigo. Quando migrar para arquivo, a segunda execução não deve recriar tabelas indiscriminadamente. CREATE TABLE IF NOT EXISTS evita um erro simples, mas não atualiza a definição de uma tabela antiga. Mudanças de estrutura precisam de migrações planejadas. Também evite inserir de novo os mesmos dados de demonstração a cada inicialização; mantenha criação e carga inicial separadas."
        ]
      },
      {
        "title": "Restrições e particularidades de tipos",
        "paragraphs": [
          "INTEGER PRIMARY KEY tem comportamento especial de identidade no SQLite e pode receber um valor gerado quando é omitido. Não troque a declaração por INT esperando todos os mesmos detalhes. Nosso exemplo fornece IDs explicitamente para que as relações sejam fáceis de conferir. AUTOINCREMENT existe, mas não é necessário para a maioria dos casos e tem uma finalidade mais específica; não o adicione apenas porque outro banco usa AUTO_INCREMENT.",
          "SQLite possui tipagem dinâmica em suas tabelas comuns: o tipo declarado influencia afinidade e conversão, mas não impõe sempre a mesma rigidez de um servidor com tipos estáticos. CHECK e NOT NULL continuam importantes para regras de negócio. Tabelas STRICT oferecem uma opção adicional em versões que as suportam. A ausência de tipo BOOLEAN separado é representada aqui por INTEGER com CHECK IN (0,1), permitindo explicar claramente os estados aceitos.",
          "PRAGMA foreign_keys = ON é executado logo após abrir a conexão e antes da transação de dados. O código consulta o valor e verifica que a fiscalização está ativa. Configure isso em cada conexão; não dependa do padrão da distribuição. O esquema pode declarar uma referência e ainda assim a conexão não fiscalizá-la se o recurso não estiver ativado. Uma tentativa de matrícula no curso 999 é o teste prático dessa proteção."
        ]
      },
      {
        "title": "Parâmetros separam comando e dados",
        "paragraphs": [
          "Os pontos de interrogação são placeholders do driver sqlite3. O SQL descreve a operação e a tupla seguinte fornece valores. Em WHERE aluno=?, o texto de nome vira um valor literal, mesmo que contenha aspas. Não monte SQL concatenando entradas do usuário, pois uma entrada pode alterar a estrutura da consulta e criar uma injeção. A proteção acontece pela interface do driver, não por remover alguns caracteres suspeitos.",
          "A tupla de um elemento precisa de vírgula: (nome,). Sem ela, parênteses apenas agrupam uma expressão e o driver pode tratar a string como uma sequência inadequada. executemany repete o mesmo comando para cada tupla, útil na carga inicial. fetchone retorna uma linha ou None; fetchall devolve uma lista de linhas. Uma linha é apresentada como tupla no padrão do módulo, por isso o resultado de uma única coluna ainda aparece entre parênteses.",
          "Parâmetros substituem valores, não nomes de tabela ou palavras SQL. Se uma interface permite escolher a coluna de ordenação, traduza a escolha por uma lista fechada de identificadores definidos pelo programador. Não tente ORDER BY ? para selecionar dinamicamente uma coluna: isso representa um valor constante. A distinção vale para outros drivers, embora o formato do placeholder possa mudar de ponto de interrogação para outra convenção."
        ]
      },
      {
        "title": "Transação, exceção e encerramento",
        "paragraphs": [
          "No modo padrão usado aqui, with con confirma as alterações ao sair sem erro e desfaz a transação quando uma exceção atravessa o bloco. O primeiro bloco carrega dados válidos. O segundo muda Beto e depois tenta inserir uma matrícula inválida. A chave estrangeira lança IntegrityError, a exceção sai do with, e o rollback desfaz também a mudança anterior de Beto. Capturamos fora do bloco para não esconder a falha antes da decisão transacional.",
          "A mensagem Transação revertida é nossa explicação, não o texto completo da exceção do SQLite. A última consulta retorna zero e comprova o efeito. Se você capturasse o erro dentro do with e continuasse normalmente, o contexto poderia confirmar mudanças anteriores. Por isso estrutura do tratamento importa tanto quanto ter um try. Não copie esse padrão sem entender onde a exceção cruza o limite da transação.",
          "with con gerencia a transação, mas não fecha a conexão. O finally garante close mesmo se outra parte falhar. executescript é usado só na criação inicial porque possui comportamento transacional próprio e não deve ser misturado inadvertidamente com mudanças que você espera desfazer juntas. Para backup de um banco em uso, prefira a API de backup apropriada; copiar cegamente apenas um arquivo enquanto há atividade pode ignorar outros arquivos associados ao modo de journal.",
          "SQLite atende muitos casos reais, mas a concorrência de escrita e o compartilhamento de arquivos exigem cuidado. Não transforme um arquivo em pasta de rede em substituto automático de um servidor multiusuário. Nesta etapa, avalie se você consegue explicar conexão, consulta, rollback e persistência. Depois teste a recuperação e o comportamento sob múltiplos acessos antes de assumir garantias de implantação."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")\ntry:\n    con.execute(\"PRAGMA foreign_keys = ON\")\n    assert con.execute(\"PRAGMA foreign_keys\").fetchone()[0] == 1\n    con.executescript(\"\"\"\n        CREATE TABLE cursos (\n            id INTEGER PRIMARY KEY,\n            titulo TEXT NOT NULL UNIQUE\n        );\n        CREATE TABLE matriculas (\n            id INTEGER PRIMARY KEY,\n            curso_id INTEGER NOT NULL REFERENCES cursos(id),\n            aluno TEXT NOT NULL,\n            concluida INTEGER NOT NULL DEFAULT 0 CHECK(concluida IN (0,1)),\n            UNIQUE(curso_id, aluno)\n        );\n    \"\"\")\n    with con:\n        con.executemany(\"INSERT INTO cursos VALUES (?, ?)\", [(1,\"SQL\"),(2,\"Python\")])\n        con.executemany(\"INSERT INTO matriculas VALUES (?, ?, ?, ?)\",\n                        [(1,1,\"Ana\",1),(2,1,\"Beto\",0),(3,2,\"Ana\",0)])\n    linhas = con.execute(\"\"\"\n        SELECT c.titulo, COUNT(m.id),\n               SUM(CASE WHEN m.concluida=1 THEN 1 ELSE 0 END)\n        FROM cursos c LEFT JOIN matriculas m ON m.curso_id=c.id\n        GROUP BY c.id,c.titulo ORDER BY c.titulo\n    \"\"\").fetchall()\n    print(linhas)\n    nome = \"Beto\"\n    print(con.execute(\"SELECT concluida FROM matriculas WHERE aluno=?\", (nome,)).fetchall())\n    try:\n        with con:\n            con.execute(\"UPDATE matriculas SET concluida=1 WHERE id=2\")\n            con.execute(\"INSERT INTO matriculas(curso_id,aluno) VALUES (?,?)\", (999,\"Eva\"))\n    except sqlite3.IntegrityError:\n        print(\"Transação revertida\")\n    print(con.execute(\"SELECT concluida FROM matriculas WHERE id=2\").fetchone()[0])\nfinally:\n    con.close()",
      "explanation": [
        "O banco nasce em memória e recebe duas tabelas com dados conhecidos.",
        "O driver insere e consulta valores por parâmetros.",
        "A falha de integridade reverte a alteração de Beto; finally fecha a conexão."
      ],
      "expected": "[('Python', 1, 0), ('SQL', 2, 1)]\n[(0,)]\nTransação revertida\n0"
    },
    "guided": [
      {
        "instruction": "Prepare o ambiente descrito acima e confirme a conexão antes de executar o exemplo. Use uma base vazia exclusiva desta aula.",
        "result": "Você consegue identificar qual programa executa o comando e qual banco recebe os dados."
      },
      {
        "instruction": "Execute o exemplo completo na ordem apresentada. Compare nomes e números com a saída esperada, ignorando apenas o desenho das colunas feito pelo cliente.",
        "result": "[('Python', 1, 0), ('SQL', 2, 1)]\n[(0,)]\nTransação revertida\n0"
      },
      {
        "instruction": "Faça cada exercício partindo dos dados originais, exceto quando o enunciado pedir continuidade. Registre comando, resultado e explicação.",
        "result": "Você consegue reproduzir o resultado sem depender de clicar em uma tabela no cliente."
      }
    ],
    "exercises": [
      {
        "prompt": "Antes do finally, consulte todos os alunos de SQL usando o id do curso como parâmetro.",
        "hints": [
          "Insira o trecho dentro do try externo.",
          "O parâmetro deve ser uma tupla."
        ],
        "solution": "print(con.execute(\"SELECT aluno FROM matriculas WHERE curso_id=? ORDER BY aluno\", (1,)).fetchall())",
        "explanation": "A consulta continua parametrizada mesmo com um número conhecido.",
        "expected": "[('Ana',), ('Beto',)]"
      },
      {
        "prompt": "Antes do finally, cadastre um aluno cujo nome contém apóstrofo, usando parâmetros.",
        "hints": [
          "Use with con.",
          "Não escape o texto manualmente no SQL."
        ],
        "solution": "with con:\n    con.execute(\"INSERT INTO matriculas(curso_id,aluno) VALUES (?,?)\", (1, \"D'Ávila\"))\nprint(con.execute(\"SELECT aluno FROM matriculas WHERE aluno=?\", (\"D'Ávila\",)).fetchone()[0])",
        "explanation": "O driver preserva o apóstrofo como parte do valor.",
        "expected": "D'Ávila"
      },
      {
        "prompt": "Explique por que Beto continua pendente e prove isso por uma consulta.",
        "hints": [
          "O UPDATE ocorreu antes da violação.",
          "A exceção saiu do bloco transacional."
        ],
        "solution": "print(con.execute(\"SELECT aluno,concluida FROM matriculas WHERE id=?\", (2,)).fetchone())",
        "explanation": "As duas operações estavam na mesma unidade: a falha reverteu a atualização válida anterior.",
        "expected": "('Beto', 0)"
      },
      {
        "prompt": "Crie um backup em memória do banco original e confirme que há três matrículas, sem alterar o banco de origem. Execute antes do finally e antes dos demais exercícios.",
        "hints": [
          "Abra uma segunda conexão.",
          "Use con.backup(destino), feche destino ao terminar."
        ],
        "solution": "destino = sqlite3.connect(\":memory:\")\ntry:\n    con.backup(destino)\n    print(destino.execute(\"SELECT COUNT(*) FROM matriculas\").fetchone()[0])\nfinally:\n    destino.close()",
        "explanation": "O backup copia o banco por uma API do mecanismo; a contagem verifica um aspecto simples, não toda a integridade de uma recuperação real.",
        "expected": "3"
      }
    ],
    "mistakes": [
      "Copiar SQL de outro mecanismo sem conferir tipos, geração de identificadores e sintaxe de transação.",
      "Executar novamente a criação em tabelas já existentes e interpretar o erro como falha do exemplo.",
      "Confundir falha de conexão com erro de consulta: verifique serviço, endereço, credencial e banco antes do SQL.",
      "Marcar como concluído sem executar os exercícios e comparar resultados."
    ],
    "quiz": [
      {
        "question": "O que ocorre com o banco :memory: ao fechar a conexão?",
        "options": [
          "É enviado à nuvem",
          "Deixa de existir",
          "Vira automaticamente hub.db"
        ],
        "correctIndex": 1,
        "explanation": "A persistência em arquivo precisa ser escolhida explicitamente."
      },
      {
        "question": "Qual forma envia um nome como dado com segurança?",
        "options": [
          "Concatenar nome ao SQL",
          "Remover todas as aspas",
          "WHERE aluno=? com (nome,)"
        ],
        "correctIndex": 2,
        "explanation": "O driver separa a consulta dos valores."
      },
      {
        "question": "with con fecha automaticamente a conexão?",
        "options": [
          "Não; gerencia a transação",
          "Sim, sempre",
          "Apenas após SELECT"
        ],
        "correctIndex": 0,
        "explanation": "close precisa ocorrer separadamente; o finally do exemplo garante isso."
      }
    ],
    "summary": [
      "O cliente envia comandos; o mecanismo aplica regras e armazena dados.",
      "A mesma modelagem pode exigir sintaxe diferente em cada produto.",
      "Restrições protegem o banco, e consultas ordenadas tornam resultados verificáveis.",
      "Uma base funcional permite criar, consultar e corrigir exemplos pequenos; operação de produção exige estudo adicional."
    ]
  },
"db-firebird": {
    "prerequisites": "Modelagem relacional, SELECT, JOIN, chaves, restrições e transações das aulas anteriores. No exemplo com Python, saber executar um arquivo e reconhecer uma tupla.",
    "setup": "Laboratório para Firebird 5 local. 1. Instale o servidor e suas ferramentas pelo instalador oficial, configure a senha do administrador SYSDBA e mantenha o serviço iniciado. Não suponha uma senha padrão. 2. Crie uma pasta de laboratório cujo caminho seja permitido pela configuração DatabaseAccess e gravável pela conta do serviço. No Windows, um exemplo de caminho é C:/dados/hub_fb_aula.fdb; ajuste à sua máquina. 3. Abra o isql do Firebird pela pasta de ferramentas (evite outro programa também chamado isql). 4. Digite CREATE DATABASE 'localhost:C:/dados/hub_fb_aula.fdb' USER 'SYSDBA' PASSWORD 'SUA_SENHA_LOCAL' DEFAULT CHARACTER SET UTF8; substituindo caminho e senha. Isso cria um arquivo novo: o caminho é interpretado no servidor. No Linux use um caminho absoluto permitido, por exemplo localhost:/var/lib/firebird/data/hub_fb_aula.fdb. 5. Execute SELECT CURRENT_USER FROM RDB$DATABASE; para confirmar a sessão. 6. Execute o exemplo na base vazia. A senha é apenas da sua instalação e não deve ser salva no arquivo público de exercícios. Use QUIT para sair descartando alterações não confirmadas; os COMMIT do exemplo são explícitos.",
    "why": "Muitos sistemas mantêm dados em Firebird, e o desenvolvedor precisa entender a aplicação existente antes de propor uma troca de tecnologia. Nesta aula você aprende a entrar em um banco de laboratório, ler sua estrutura e controlar pequenas alterações com evidência, sem presumir que o comportamento de outro servidor é idêntico.",
    "sections": [
      {
        "title": "O arquivo pertence ao servidor",
        "paragraphs": [
          "O caminho após localhost identifica um arquivo que o servidor Firebird deve conseguir abrir. Mesmo quando cliente e servidor estão na mesma máquina, a conta do serviço pode ter permissões diferentes das suas. Um erro de acesso ao arquivo pode ser causado pela configuração DatabaseAccess ou pela permissão da pasta; não significa que o SQL de criação de tabela esteja errado. Use um caminho dedicado e permitido pela instalação em vez de liberar acesso geral ao disco.",
          "Em uma conexão remota, escrever um caminho do seu computador não transfere esse arquivo para o servidor. A aplicação envia comandos; o processo do servidor acessa os dados. Um administrador pode configurar aliases para que clientes usem um nome em vez do caminho físico. Essa separação facilita mudar o local do arquivo sem espalhar caminhos em vários programas. A criação direta por caminho nesta aula serve apenas para tornar o laboratório explícito.",
          "isql é um cliente que combina comandos SQL com comandos próprios de inspeção. SHOW TABLES lista tabelas, SHOW TABLE cursos descreve uma, e HELP apresenta comandos do cliente. Não trate essas instruções como SQL portável para qualquer driver. Confirme que o executável pertence ao Firebird; há outros utilitários chamados isql. A referência de linguagem consultada é a versão 5, e sistemas legados podem exigir adaptações."
        ]
      },
      {
        "title": "Um esquema conhecido em outro dialeto",
        "paragraphs": [
          "O modelo usa cursos e matrículas como nas aulas anteriores. GENERATED BY DEFAULT AS IDENTITY pede um identificador gerado quando não se fornece um valor. O qualificador BY DEFAULT permite informar valores explicitamente em contextos adequados, mas o exemplo omite id. Não misture inserções manuais e geração sem entender o controle da sequência. Num laboratório novo, os dois cursos recebem 1 e 2; em dados existentes, recupere a chave criada, não adivinhe.",
          "BOOLEAN aceita estados lógicos e a coluna é NOT NULL, impedindo o terceiro estado de ausência. O DEFAULT FALSE cuida da omissão na inserção, enquanto NOT NULL proíbe inserir NULL explicitamente. São regras diferentes. CHECK protege a carga positiva e FOREIGN KEY exige curso existente. O título único resolve uma convenção do exercício; uma aplicação real pode precisar permitir cursos com o mesmo nome em versões diferentes.",
          "Os INSERTs aparecem separados para manter o exemplo simples e adequado ao dialeto. Não copie automaticamente a lista de múltiplas linhas de outro produto sem verificar suporte e versão. Também não transporte LIMIT como se fosse universal: Firebird oferece construções como ROWS e outras formas próprias para limitar resultados. Primeiro determine a pergunta e a ordenação desejada; depois escolha a sintaxe documentada do servidor em uso."
        ]
      },
      {
        "title": "SQL, metadados e transações no isql",
        "paragraphs": [
          "COMMIT confirma o trabalho, ROLLBACK desfaz alterações ainda não confirmadas. O isql inicia transações conforme suas operações; não use BEGIN como sinônimo do BEGIN de PostgreSQL para iniciar uma transação simples. No Firebird, BEGIN também aparece em blocos de linguagem procedural, que são outro contexto. Para começar, use os limites explícitos do exemplo e evite deixar uma sessão com transação aberta por muito tempo.",
          "O isql tem uma configuração de confirmação automática de DDL. Por isso mostramos COMMIT após criar a estrutura e após carregar os dados, sem depender de uma suposição invisível sobre a sessão. O objetivo é separar o estado inicial das experiências de alteração. Antes de executar scripts recebidos, inspecione se eles mudam configurações do cliente; uma configuração de cliente não é necessariamente uma configuração global do servidor.",
          "A consulta usa CASE com IS TRUE, depois soma um para cada conclusão. LEFT JOIN preserva cursos sem inscritos, e COUNT(m.id) conta as correspondências reais. O resultado é o mesmo contrato das outras aulas: Python tem um inscrito e zero concluídos; SQL tem dois e um. Os nomes das colunas podem aparecer em maiúsculas no terminal, sem alterar o significado. Compare dados e quantidade de linhas, não apenas a aparência da tabela impressa."
        ]
      },
      {
        "title": "Alterar, conferir e entender o limite do laboratório",
        "paragraphs": [
          "Depois da carga confirmada, o UPDATE marca Beto. ROLLBACK desfaz essa mudança e a consulta mostra FALSE. Se trocar por COMMIT, a mudança será preservada na próxima conexão. Execute essa comparação para distinguir o que está apenas visível na sua sessão do que foi confirmado. Em cenários com duas conexões, a visibilidade depende do isolamento e da duração das transações; observar um valor antigo não prova imediatamente perda de gravação.",
          "Uma rotina de diagnóstico começa pelo contexto: versão, banco, usuário, consulta exata e mensagem de erro. Em seguida, verifique a estrutura com SHOW TABLE e uma amostra ordenada. Só então altere dados. Nunca abra o arquivo .fdb em um editor de texto ou copie um banco ativo como se fosse um documento comum. Ferramentas de backup e recuperação do produto existem para lidar com o estado consistente; aprender a restaurar faz parte de uma etapa operacional posterior.",
          "Ao trabalhar num sistema legado, preserve um caso mínimo que reproduza o problema e consulte a versão exata antes de sugerir identidade ou booleanos que o servidor antigo talvez não suporte. O objetivo aqui é adquirir uma base para conversar com a equipe e executar tarefas supervisionadas. Isso inclui reconhecer a necessidade de ajuda para permissões, backup e isolamento, em vez de experimentar mudanças administrativas num ambiente compartilhado.",
          "Finalize escrevendo como o mesmo requisito mudou entre SQLite, PostgreSQL, MariaDB e Firebird: forma de conexão, geração de chave, representação do estado, limite da transação e cliente. Essa comparação transforma a memorização de comandos em entendimento. Se você consegue explicar por que o relatório é equivalente e demonstrar uma alteração revertida, alcançou a competência funcional esperada desta aula."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE cursos (\n id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\n titulo VARCHAR(100) NOT NULL UNIQUE,\n carga INTEGER NOT NULL CHECK(carga > 0)\n);\nCREATE TABLE matriculas (\n id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\n curso_id INTEGER NOT NULL REFERENCES cursos(id),\n aluno VARCHAR(80) NOT NULL,\n concluida BOOLEAN DEFAULT FALSE NOT NULL,\n UNIQUE(curso_id,aluno)\n);\nCOMMIT;\nINSERT INTO cursos(titulo,carga) VALUES ('SQL',20);\nINSERT INTO cursos(titulo,carga) VALUES ('Python',30);\nINSERT INTO matriculas(curso_id,aluno,concluida) VALUES (1,'Ana',TRUE);\nINSERT INTO matriculas(curso_id,aluno,concluida) VALUES (1,'Beto',FALSE);\nINSERT INTO matriculas(curso_id,aluno,concluida) VALUES (2,'Ana',FALSE);\nCOMMIT;\nSELECT c.titulo,COUNT(m.id) AS inscritos,\n SUM(CASE WHEN m.concluida IS TRUE THEN 1 ELSE 0 END) AS concluidos\nFROM cursos c LEFT JOIN matriculas m ON m.curso_id=c.id\nGROUP BY c.id,c.titulo ORDER BY c.titulo;\nCOMMIT;\nUPDATE matriculas SET concluida=TRUE WHERE id=2;\nROLLBACK;\nSELECT aluno,concluida FROM matriculas WHERE id=2;\nCOMMIT;",
      "explanation": [
        "A carga usa INSERTs individuais e commits explícitos.",
        "A consulta mantém o mesmo contrato das demais aulas relacionais.",
        "A alteração final é descartada, mantendo Beto como pendente."
      ],
      "expected": "Python | 1 | 0; SQL | 2 | 1. Ao final: Beto | FALSE."
    },
    "guided": [
      {
        "instruction": "Prepare o ambiente descrito acima e confirme a conexão antes de executar o exemplo. Use uma base vazia exclusiva desta aula.",
        "result": "Você consegue identificar qual programa executa o comando e qual banco recebe os dados."
      },
      {
        "instruction": "Execute o exemplo completo na ordem apresentada. Compare nomes e números com a saída esperada, ignorando apenas o desenho das colunas feito pelo cliente.",
        "result": "Python | 1 | 0; SQL | 2 | 1. Ao final: Beto | FALSE."
      },
      {
        "instruction": "Faça cada exercício partindo dos dados originais, exceto quando o enunciado pedir continuidade. Registre comando, resultado e explicação.",
        "result": "Você consegue reproduzir o resultado sem depender de clicar em uma tabela no cliente."
      }
    ],
    "exercises": [
      {
        "prompt": "Inspecione cursos e matriculas no isql e identifique a relação entre elas.",
        "hints": [
          "Use SHOW TABLE, no cliente Firebird.",
          "Procure curso_id e a chave referenciada."
        ],
        "solution": "SHOW TABLE cursos;\nSHOW TABLE matriculas;",
        "explanation": "A inspeção mostra os objetos reais da base conectada.",
        "expected": "curso_id de matriculas referencia cursos.id."
      },
      {
        "prompt": "Liste apenas o primeiro curso em ordem alfabética usando sintaxe Firebird.",
        "hints": [
          "Ordene antes de limitar.",
          "Use ROWS 1."
        ],
        "solution": "SELECT titulo FROM cursos ORDER BY titulo ROWS 1;\nCOMMIT;",
        "explanation": "Limitar sem ordenar não define qual curso deve ser o primeiro.",
        "expected": "Python."
      },
      {
        "prompt": "Tente inserir uma matrícula para curso inexistente e descarte a tentativa.",
        "hints": [
          "Use curso_id=999.",
          "Após observar a falha, execute ROLLBACK."
        ],
        "solution": "INSERT INTO matriculas(curso_id,aluno) VALUES (999,'Eva');\n-- Após o erro execute separadamente:\nROLLBACK;\nSELECT COUNT(*) FROM matriculas WHERE aluno='Eva';\nCOMMIT;",
        "explanation": "A chave estrangeira protege a referência independentemente do cliente.",
        "expected": "Erro de chave estrangeira; contagem 0."
      },
      {
        "prompt": "Confirme a conclusão de Beto e escreva uma consulta que prove duas conclusões em SQL.",
        "hints": [
          "Use COMMIT depois do UPDATE.",
          "Use IS TRUE e filtre curso_id."
        ],
        "solution": "UPDATE matriculas SET concluida=TRUE WHERE id=2;\nCOMMIT;\nSELECT COUNT(*) FROM matriculas WHERE curso_id=1 AND concluida IS TRUE;\nCOMMIT;",
        "explanation": "Uma nova sessão também verá o estado confirmado, respeitando seu contexto transacional.",
        "expected": "2."
      }
    ],
    "mistakes": [
      "Copiar SQL de outro mecanismo sem conferir tipos, geração de identificadores e sintaxe de transação.",
      "Executar novamente a criação em tabelas já existentes e interpretar o erro como falha do exemplo.",
      "Confundir falha de conexão com erro de consulta: verifique serviço, endereço, credencial e banco antes do SQL.",
      "Marcar como concluído sem executar os exercícios e comparar resultados."
    ],
    "quiz": [
      {
        "question": "A que máquina pertence o caminho após localhost numa conexão Firebird?",
        "options": [
          "Ao servidor indicado",
          "Sempre ao navegador",
          "A um arquivo dentro do HTML"
        ],
        "correctIndex": 0,
        "explanation": "O servidor acessa o arquivo usando suas permissões."
      },
      {
        "question": "Qual é a finalidade do ROLLBACK após o UPDATE do exemplo?",
        "options": [
          "Excluir o banco",
          "Desfazer a mudança não confirmada",
          "Reiniciar o serviço"
        ],
        "correctIndex": 1,
        "explanation": "A estrutura e a carga inicial já foram confirmadas; a alteração de Beto é descartada."
      },
      {
        "question": "Posso copiar qualquer SQL do PostgreSQL para Firebird sem revisar?",
        "options": [
          "Sim, ambos são SQL",
          "Sim, mudando a extensão do arquivo",
          "Não; dialeto e versão precisam ser verificados"
        ],
        "correctIndex": 2,
        "explanation": "Modelagem e várias consultas são semelhantes, mas sintaxe e comportamento diferem."
      }
    ],
    "summary": [
      "O cliente envia comandos; o mecanismo aplica regras e armazena dados.",
      "A mesma modelagem pode exigir sintaxe diferente em cada produto.",
      "Restrições protegem o banco, e consultas ordenadas tornam resultados verificáveis.",
      "Uma base funcional permite criar, consultar e corrigir exemplos pequenos; operação de produção exige estudo adicional."
    ]
  },
"db-nosql-models": {
    "prerequisites": "Revise entidades, tabelas e consultas em db-modeling e db-select. Esta aula compara representações; não exige concluir a preparação MongoDB nem instalar Redis, Cassandra ou Neo4j.",
    "setup": "Use papel ou editor de texto. O exemplo é um desenho de dados, não comandos executáveis. Os nomes MongoDB, Redis, Cassandra e Neo4j ilustram famílias; não são recomendações obrigatórias para todo projeto que tenha dados parecidos.",
    "why": "O mesmo domínio pode ser organizado de formas diferentes. Antes de adotar um banco porque ele parece moderno, descreva duas consultas importantes e uma regra de consistência. Essas necessidades ajudam a avaliar o custo de cada modelo.",
    "sections": [
      {
        "title": "Comece pelas perguntas de acesso",
        "paragraphs": [
          "Antes de escolher uma família de banco, escreva a entrada e a saída de duas consultas. A página de um curso recebe seu identificador e devolve título e poucos recursos; o histórico recebe pessoa e intervalo e pode devolver milhares de eventos. Os dois conjuntos têm crescimento e atualização diferentes: não incorpore eventos sem limite ao curso só porque pertencem ao mesmo produto.",
          "Escreva também uma regra de mudança. Um endereço copiado para um pedido pode preservar a fotografia histórica; o nome atual de um autor compartilhado deve refletir correções recentes. Repetir dados não é automaticamente erro, mas exige dizer se a cópia é histórica ou deve acompanhar a fonte atual."
        ]
      },
      {
        "title": "Compare quatro representações",
        "paragraphs": [
          "Documentos reúnem campos, objetos e listas lidos juntos. Um curso pode incorporar poucos recursos, mas listas ilimitadas e cópias que precisam ser atualizadas têm custo. MongoDB usa BSON, com tipos além de JSON. Chave-valor recupera um valor por chave conhecida: sessao:abc pode apontar para usuário 7 e expiração. Redis oferece outras estruturas, mas isso não torna automáticos relatórios arbitrários sobre os campos do valor.",
          "Famílias de colunas amplas, como Cassandra, organizam dados segundo padrões de acesso e partições: sensor e dia podem reunir leituras daquele período. Isso não é apenas trocar linhas por colunas. Grafos usam nós e arestas; HTML → JavaScript → DOM permite percorrer pré-requisitos indiretos. Neo4j é um exemplo, mas uma relação direta entre dois registros não obriga a usar um grafo."
        ]
      },
      {
        "title": "Verifique chaves, crescimento e consistência",
        "paragraphs": [
          "NoSQL não é uma linguagem única, ausência total de esquema ou impossibilidade de transações. Contratos, atomicidade e consistência dependem do produto, da operação e da configuração. Duas telas alterando o mesmo progresso precisam de uma regra de conflito — última escrita, versão ou atualização condicional — independentemente de o banco ser relacional ou documental.",
          "Uma partição por sensor e dia limita o grupo de eventos; somente sensor pode crescer sem limite, enquanto uma chave por leitura perde o agrupamento útil. Isso é raciocínio de modelagem, não operação de um cluster Cassandra. Uma sessão temporária deve expirar; cache reconstruível e único registro de compra exigem recuperação diferente. Classifique cada dado como fonte de verdade, cópia ou temporário.",
          "No grafo, a direção HTML → JavaScript indica qual assunto vem antes. Para buscar pré-requisitos de DOM, caminhe no sentido contrário das setas; inverter a relação muda a resposta. Um ciclo A exige B e B exige A pode ser inválido no domínio mesmo que o motor o armazene."
        ]
      },
      {
        "title": "Registre uma decisão proporcional",
        "paragraphs": [
          "Combine consultas, atualização crítica e recuperação antes de comparar popularidade. Quatro bancos implicam quatro conjuntos de ferramentas, backups e competências de operação; um único relacional pode atender um hub pequeno. Só acrescente outro motor quando o benefício for demonstrável.",
          "Registre cinco itens: requisito, escolha, alternativa, custo aceito e gatilho de revisão. Exemplo: um catálogo local precisa abrir sem internet; SQLite atende; documentos também poderiam representar recursos, mas um servidor extra não é necessário; sincronização entre dispositivos fica pendente; escrita simultânea por várias pessoas exigirá reavaliar. A saída desta aula é justificar uma escolha, não dominar quatro produtos por conhecer seus nomes."
        ]
      }
    ],
    "example": {
      "language": "text",
      "code": "DOCUMENTO: curso\n{ id: \"dados\", titulo: \"Dados\",\n  recursos: [{tipo: \"livro\", titulo: \"SQL inicial\"}] }\nPergunta: mostrar um curso com seus poucos recursos.\n\nCHAVE-VALOR: sessao:abc -> {usuario: 7, expira: \"18:00\"}\nPergunta: quem possui a sessão abc?\n\nCOLUNAS AMPLAS: partição (sensor=9, dia=2026-01-01)\n  10:00 -> 21; 10:01 -> 22\nPergunta: leituras do sensor 9 naquele dia, por horário.\n\nGRAFO: HTML -> JavaScript -> DOM\nPergunta: quais pré-requisitos indiretos levam a DOM?",
      "explanation": [
        "O documento incorpora recursos pequenos lidos junto com o curso.",
        "A sessão é recuperada pela chave completa, sem percorrer outros usuários.",
        "A partição agrupa eventos segundo a consulta por sensor e dia; o horário organiza os eventos do grupo.",
        "O grafo expressa um caminho com duas relações, permitindo enxergar dependências indiretas."
      ],
      "expected": "Cada representação responde uma pergunta específica: curso e recursos; usuário 7; leituras 21 e 22; pré-requisitos JavaScript e HTML para DOM."
    },
    "guided": [
      {
        "instruction": "Para o catálogo, escreva se os recursos sempre são lidos com o curso e se a lista tem limite.",
        "result": "Se ambos forem verdadeiros, incorporar pode simplificar a leitura; caso contrário, referências merecem avaliação."
      },
      {
        "instruction": "Para a sessão, anote a chave que chega na requisição e o valor procurado.",
        "result": "A requisição informa abc e a busca direta recupera usuario 7."
      },
      {
        "instruction": "Percorra o desenho ao contrário, começando em DOM.",
        "result": "Você encontra JavaScript e depois HTML, distinguindo pré-requisito direto e indireto."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: se a única pergunta é recuperar o idioma pelo id do usuário, qual chave e valor responderiam sem percorrer outros registros? Depois compare com o exemplo.",
        "hints": [
          "A chave é conhecida antes da busca.",
          "O valor pode ser pequeno, como pt-BR."
        ],
        "solution": "Chave: preferencia:7\nValor: {idioma: \"pt-BR\"}",
        "explanation": "Chave-valor é uma representação natural para esse acesso direto. Uma tabela relacional com id e idioma também funcionaria; a atividade não prova necessidade de adicionar outro banco.",
        "expected": "A busca por preferencia:7 devolve pt-BR."
      },
      {
        "prompt": "Alterar: o catálogo passa a ter um autor cujo nome aparece em 500 cursos e pode mudar. Compare incorporar o nome e guardar autor_id.",
        "hints": [
          "Conte quantos documentos mudariam no primeiro caso.",
          "Referenciar reduz repetição, mas pode exigir outra consulta."
        ],
        "solution": "Incorporado: atualizar os 500 cursos.\nReferenciado: atualizar um registro AUTOR e consultar autor_id ao montar o curso.",
        "explanation": "A escolha envolve custo de leitura e de atualização. Como o enunciado enfatiza mudança compartilhada, uma referência evita 500 cópias que podem divergir.",
        "expected": "Uma atualização no autor contra até 500 atualizações nos cursos; leitura pode exigir composição adicional."
      },
      {
        "prompt": "Construir: um curso recebe um milhão de eventos de visualização. Proponha onde guardar os eventos e quais campos permitem buscar os últimos de uma pessoa.",
        "hints": [
          "Separe dados de catálogo e histórico.",
          "Não escolha Cassandra somente porque o número parece grande."
        ],
        "solution": "CURSOS: id, titulo, recursos pequenos\nEVENTOS: id, pessoa_id, curso_id, instante, tipo\nConsulta: pessoa_id + intervalo de instante; ordenar por instante e id.",
        "explanation": "Um conjunto que cresce sem limite não deve ser incorporado apenas por compartilhar curso_id. A forma física depende do motor e do volume medido.",
        "expected": "Eventos separados do documento do curso; crescimento e acesso explicitamente descritos."
      },
      {
        "prompt": "Investigar erro: alguém escolheu um servidor documental para um app individual offline de anotações e afirmou que isso fornece sincronização automática. Identifique a suposição incorreta e escreva uma decisão com requisito, escolha, alternativa, custo e gatilho de revisão.",
        "hints": [
          "Offline exige dados disponíveis no dispositivo.",
          "Não prometa sincronização automática pelo formato do banco."
        ],
        "solution": "Escolha inicial: SQLite local.\nMotivo: funcionamento offline e consultas por caderno.\nAlternativa: servidor documental, sem necessidade atual.\nCusto aceito: sincronização não implementada.\nRevisão: edição simultânea por usuários em dispositivos diferentes.",
        "explanation": "Uma decisão é defensável quando liga uma característica do produto a uma necessidade e explicita o que ainda não resolve.",
        "expected": "Cinco itens com requisito, escolha, alternativa, custo e gatilho de revisão."
      }
    ],
    "mistakes": [
      "Escolher pelo rótulo NoSQL: avalie consultas e garantias do produto.",
      "Incorporar listas sem limite de crescimento: considere coleções separadas ou outra modelagem.",
      "Adicionar vários motores para um exercício simples: comece com o menor conjunto que atende aos requisitos."
    ],
    "quiz": [
      {
        "question": "NoSQL significa ausência de contrato dos dados?",
        "options": [
          "Sim, qualquer dado sempre serve",
          "Não, o contrato continua necessário",
          "Somente para texto"
        ],
        "correctIndex": 1,
        "explanation": "Estrutura flexível não elimina regras e expectativas da aplicação."
      },
      {
        "question": "Qual caso destaca travessias de grafo?",
        "options": [
          "Buscar sessão por chave",
          "Encontrar pré-requisitos indiretos",
          "Guardar um único número"
        ],
        "correctIndex": 1,
        "explanation": "Pré-requisitos indiretos exigem seguir relações por vários passos."
      },
      {
        "question": "Um endereço é incorporado em um pedido. Isso é sempre uma duplicação incorreta?",
        "options": [
          "Sim, toda cópia viola a modelagem",
          "Não; pode representar o endereço histórico do pedido",
          "Não, porque documentos dispensam regras"
        ],
        "correctIndex": 1,
        "explanation": "Uma fotografia histórica tem significado diferente do endereço atual do cadastro. A regra de atualização deve ser explícita."
      }
    ],
    "summary": [
      "Modele de acordo com o acesso esperado.",
      "Compare custos de leitura e de atualização.",
      "Considere operação e recuperação junto do formato dos dados."
    ]
  },
"db-mongo-crud": {
    "prerequisites": "Conclua setup-mongodb e confirme o ping antes desta aula. Entenda objetos com campos, arrays e booleanos. Revise a diferença entre entidade e relacionamento; SQL não será usado neste exemplo.",
    "setup": "No terminal, conecte o cliente mongosh ao servidor MongoDB conforme setup-mongodb e confirme db.runCommand({ping:1}) com ok: 1. Execute o bloco no mongosh, não no console do navegador. O código seleciona o banco tech_hub_aula_crud e usa a coleção licoes. Execute uma vez em banco vazio; para repetir sem colisões, escolha outro nome de banco de laboratório no getSiblingDB. Não apague dados existentes apenas para repetir a atividade.",
    "why": "Um material de estudo pode possuir tags e um recurso incorporado. Em MongoDB esses elementos podem morar no mesmo documento e ser lidos juntos. Vamos cadastrar, filtrar e alterar esse documento sem confundir comandos mongosh com JavaScript de página web.",
    "sections": [
      {
        "title": "Documento, coleção e ambiente",
        "paragraphs": [
          "Uma coleção reúne documentos. Cada documento possui _id único; você pode fornecê-lo, como a string a1, ou deixar o MongoDB gerar um ObjectId. O exemplo escolhe strings legíveis para facilitar a conferência. BSON armazena tipos como números, booleanos, arrays e objetos, não apenas textos.",
          "Duas lições podem ter campos diferentes, mas o aplicativo precisa saber o que esperar. concluida será booleano, minutos será número e tags será array. O texto \"false\" não é o booleano false. Misturar tipos dificulta consultas e somas; flexibilidade de estrutura não deve virar ausência de contrato.",
          "O servidor MongoDB guarda os documentos; mongosh é o cliente que envia comandos. O ping da preparação confirma que há conexão, não que este exemplo já foi inserido. lab.licoes existe no shell conectado, não no console de uma página web. Um backend usa um driver e mantém suas credenciais fora do HTML."
        ]
      },
      {
        "title": "Ler: filtros, projeções e ausência",
        "paragraphs": [
          "find recebe primeiro um filtro. {concluida:false} encontra documentos com esse valor. O segundo objeto define a projeção, isto é, quais campos devolver. {titulo:1,_id:0} inclui titulo e omite _id. Em geral não misture inclusões e exclusões na mesma projeção, com a exceção de _id usada aqui.",
          "sort define a ordem dos resultados. O filtro {tags:\"sql\"} encontra documentos cujo array tags contém sql. {minutos:{$gte:30}} filtra duração mínima. Não aceite um objeto de filtro arbitrário do usuário com operadores inesperados: a camada de entrada deve construir a consulta conhecida a partir dos valores permitidos.",
          "find devolve um cursor para percorrer resultados; o shell exibe um lote automaticamente. toArray() materializa os documentos para conferir um conjunto pequeno. findOne({_id:\"a1\"}) devolve o documento ou null: teste a ausência antes de acessar titulo. Quando a ordem precisa ser estável, use sort e um campo de desempate."
        ]
      },
      {
        "title": "Atualizar, conferir e remover",
        "paragraphs": [
          "O operador $set altera somente os campos nomeados. updateOne({_id:\"a1\"},{$set:{concluida:true}}) preserva título, duração e tags. A operação de escrita sobre um documento é atômica. Isso não torna automaticamente atômica uma sequência de alterações em documentos diferentes.",
          "insertMany devolve confirmação e identificadores; updateOne devolve matchedCount e modifiedCount. Repetir a conclusão de a1 pode produzir matchedCount 1 e modifiedCount 0: o alvo existe, mas já tinha o valor desejado. Um alvo inexistente produz matchedCount 0. {$inc:{minutos:5}} soma cinco; {$addToSet:{tags:\"revisao\"}} acrescenta a tag apenas se ela ainda não estiver no array.",
          "deleteOne também recebe filtro. Antes de excluir, localize pelo _id e confirme que o documento é descartável; depois confira deletedCount e countDocuments com o mesmo _id. Um filtro amplo continua perigoso mesmo quando o método remove no máximo um documento."
        ]
      },
      {
        "title": "Modelar dados compartilhados e individuais",
        "paragraphs": [
          "Recursos pequenos, limitados e lidos junto da lição podem ser incorporados. Um autor compartilhado por muitas lições, com atualizações independentes, pode ser referenciado pelo id. Pense no crescimento e nas consultas antes de decidir.",
          "O campo concluida deste laboratório representa uma única pessoa. Em um sistema com muitos estudantes, embutir esse booleano na lição compartilhada mistura catálogo e estado individual. Uma coleção de progresso pode conter estudante_id, licao_id e concluida, com um índice único sobre o par. MongoDB não verifica uma referência entre coleções como uma FK relacional: a aplicação precisa confirmar existência e autorização. Este é um limite do modelo didático, não uma funcionalidade implementada neste laboratório."
        ]
      }
    ],
    "example": {
      "language": "javascript (mongosh)",
      "code": "const lab = db.getSiblingDB(\"tech_hub_aula_crud\");\nlab.licoes.insertMany([\n { _id:\"a1\", titulo:\"SELECT\", minutos:30, concluida:false,\n   tags:[\"sql\",\"basico\"], recurso:{tipo:\"texto\",titulo:\"Primeira consulta\"} },\n { _id:\"a2\", titulo:\"JOIN\", minutos:40, concluida:false, tags:[\"sql\"] },\n { _id:\"a3\", titulo:\"Documentos\", minutos:25, concluida:true, tags:[\"nosql\"] }\n]);\nlab.licoes.find({concluida:false},{_id:0,titulo:1}).sort({titulo:1});\nlab.licoes.updateOne({_id:\"a1\"},{$set:{concluida:true}});\nlab.licoes.find({concluida:false},{_id:0,titulo:1}).sort({titulo:1});",
      "explanation": [
        "getSiblingDB seleciona explicitamente a base usada pela variável lab, sem depender de use.",
        "insertMany cadastra três documentos com identidades distintas e tipos consistentes.",
        "A primeira projeção retorna só os títulos pendentes, ordenados por título.",
        "$set muda somente concluida de a1; a segunda consulta passa a devolver apenas JOIN."
      ],
      "expected": "Antes da atualização: JOIN e SELECT. updateOne informa um documento encontrado e modificado. Depois: somente JOIN."
    },
    "guided": [
      {
        "instruction": "Execute os INSERT e consulte lab.licoes.find({_id:\"a1\"}).",
        "result": "O documento inclui o objeto recurso e o array de duas tags."
      },
      {
        "instruction": "Execute a primeira consulta de pendências antes do UPDATE.",
        "result": "JOIN e SELECT estão pendentes; Documentos já está concluído."
      },
      {
        "instruction": "Execute o UPDATE e consulte novamente a1.",
        "result": "concluida torna-se true e os demais campos permanecem intactos."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga quais títulos a consulta por tag sql devolverá, incluindo lições concluídas; depois execute e compare.",
        "hints": [
          "O filtro de array pode comparar o elemento diretamente.",
          "Não acrescente um filtro de conclusão que não foi pedido."
        ],
        "solution": "lab.licoes.find({tags:\"sql\"},{_id:0,titulo:1}).sort({titulo:1});",
        "explanation": "A igualdade com o elemento encontra arrays contendo sql. Tanto a1 quanto a2 satisfazem a condição, independentemente do estado de progresso.",
        "expected": "JOIN e SELECT."
      },
      {
        "prompt": "Alterar: conclua apenas JOIN e verifique quantas pendências restam depois do exemplo principal.",
        "hints": [
          "O _id de JOIN é a2.",
          "countDocuments conta o filtro informado."
        ],
        "solution": "lab.licoes.updateOne({_id:\"a2\"},{$set:{concluida:true}});\nlab.licoes.countDocuments({concluida:false});",
        "explanation": "a1 já foi concluída no exemplo e a3 começou concluída. Alterar a2 termina a última pendência sem substituir os outros campos.",
        "expected": "0 documentos pendentes."
      },
      {
        "prompt": "Construir: crie uma lição temporária x9, consulte-a, remova-a e prove que a1 permanece.",
        "hints": [
          "Use o mesmo _id em criação, leitura e remoção.",
          "Não use filtro vazio no delete."
        ],
        "solution": "lab.licoes.insertOne({_id:\"x9\",titulo:\"Rascunho\",minutos:5,concluida:false,tags:[]});\nlab.licoes.findOne({_id:\"x9\"});\nlab.licoes.deleteOne({_id:\"x9\"});\nlab.licoes.countDocuments({_id:\"x9\"});\nlab.licoes.countDocuments({_id:\"a1\"});",
        "explanation": "A criação de uma identidade descartável torna o teste de exclusão delimitado e a consulta final verifica o que foi preservado.",
        "expected": "deleteOne: deletedCount 1; contagem x9: 0; contagem a1: 1."
      },
      {
        "prompt": "Investigar erro: depois do exemplo, repita a conclusão de a1 duas vezes. modifiedCount igual a zero é falha? Compare com matchedCount antes de decidir.",
        "hints": [
          "a1 foi alterada no exemplo principal.",
          "Leia matchedCount e modifiedCount separadamente."
        ],
        "solution": "lab.licoes.updateOne({_id:\"a1\"},{$set:{concluida:true}});\nlab.licoes.updateOne({_id:\"a1\"},{$set:{concluida:true}});",
        "explanation": "Uma atualização que preserva o estado é uma operação válida. Contagem de modificação zero não basta para concluir que o alvo inexiste.",
        "expected": "Em ambas: matchedCount 1, modifiedCount 0; a1 já estava concluída."
      }
    ],
    "mistakes": [
      "Usar string \"false\" em lugar de booleano: mantenha false sem aspas.",
      "Alterar por um título possivelmente repetido: prefira _id quando o alvo é único.",
      "Executar comandos mongosh no navegador: use o cliente conectado ao MongoDB."
    ],
    "quiz": [
      {
        "question": "Qual operador muda somente os campos indicados?",
        "options": [
          "$set",
          "$group",
          "$sort"
        ],
        "correctIndex": 0,
        "explanation": "$set atualiza os campos nomeados e preserva os demais."
      },
      {
        "question": "Qual é a garantia básica da escrita em um documento?",
        "options": [
          "Atomicidade desse documento",
          "Atomicidade de qualquer sequência em várias coleções",
          "Ausência de necessidade de backup"
        ],
        "correctIndex": 0,
        "explanation": "A atomicidade de um documento não engloba automaticamente outras operações."
      },
      {
        "question": "updateOne encontrou a1, mas modifiedCount foi zero. Qual interpretação é possível?",
        "options": [
          "A coleção foi apagada",
          "A1 já tinha os valores pedidos",
          "O MongoDB nunca permite atualizar booleanos"
        ],
        "correctIndex": 1,
        "explanation": "matchedCount 1 com modifiedCount 0 pode representar uma atualização idempotente, sem mudança de valor."
      }
    ],
    "summary": [
      "Coleções reúnem documentos com identidade _id.",
      "Filtros escolhem documentos e projeções escolhem campos.",
      "Use $set e identificadores explícitos nas alterações."
    ]
  },
"db-mongo-pipelines": {
    "prerequisites": "Conclua setup-mongodb e db-mongo-crud: confirme o ping e saiba cadastrar e consultar documentos no mongosh. Se estudou agrupamento SQL, use-o como comparação; ele não é necessário para executar este laboratório.",
    "setup": "No terminal, conecte o mongosh ao servidor MongoDB real e confirme db.runCommand({ping:1}) com ok: 1, como em setup-mongodb. Use um banco tech_hub_aula_pipeline ainda não criado: o exemplo cria a coleção licoes com validador e insere três documentos. Execute o bloco uma vez; para repetir sem colisão, troque o nome do banco em getSiblingDB. Não apague uma coleção existente para reiniciar a aula. Números de duração serão Double para explicitar o tipo BSON, embora o contrato também aceite inteiros.",
    "why": "Se um documento guardar minutos como \"30\" e outro como 40, relatórios podem omitir valores inesperadamente. A validação impede entradas incompatíveis e o pipeline transforma documentos válidos em um resumo de tempo pendente por trilha.",
    "sections": [
      {
        "title": "Contrato de entrada e teste de rejeição",
        "paragraphs": [
          "createCollection pode receber validator com $jsonSchema. required enumera os campos obrigatórios, enquanto properties descreve os tipos e limites. Dizer que minutos é numérico não exige automaticamente sua presença: por isso usamos ambas as partes. O mínimo 1 impede duração zero ou negativa.",
          "A validação do exemplo aceita int, long, double e decimal, além de exigir concluida bool e trilha string. É o contrato deste laboratório, não uma regra universal. required exige presença, mas string ainda aceita texto vazio sem uma regra adicional; minimum:1 permite frações. Teste uma entrada válida, uma sem campo obrigatório, outra com tipo errado e duração zero, cada falha em comando separado.",
          "Este exemplo cria uma coleção nova. Acrescentar validação a uma coleção existente não corrige registros antigos: primeiro examine os formatos, conte incompatíveis e teste a transformação em uma cópia. Só depois configure a regra adequada à migração, sem surpreender a aplicação com falhas de escrita."
        ]
      },
      {
        "title": "Filtrar, agrupar e ordenar",
        "paragraphs": [
          "aggregate recebe um array de estágios executados conceitualmente em sequência. $match filtra os documentos pendentes, $group reúne por trilha e $sort ordena o resumo. Em _id:\"$trilha\", o sinal $ indica acesso ao campo trilha; sem ele, a string literal trilha agruparia tudo sob o mesmo nome.",
          "Dentro de $group, {$sum:\"$minutos\"} acumula duração, enquanto {$sum:1} conta documentos. A saída deixa de ser uma lição e passa a ser um grupo com _id e total. O estágio posterior trabalha com esse novo formato. Colocar $match antes da soma evita contar as aulas já concluídas."
        ]
      },
      {
        "title": "Conferir a saída em cada estágio",
        "paragraphs": [
          "Leia como uma tabela de entradas e saídas: três lições antes de $match, duas lições de Dados depois dele e um resumo com total 70 depois de $group. Nesse resumo, minutos e concluida não são mais campos disponíveis. Um $match por concluida depois do agrupamento não filtra as lições originais. A ordem faz parte da lógica, embora o otimizador possa reordenar operações equivalentes.",
          "$project pode dar nome legível à chave agrupada: {$project:{_id:0,trilha:\"$_id\",total:1}}. A expressão \"$_id\" lê a chave; total:1 inclui o valor calculado. Conte documentos com $sum:1, não com $sum:\"$minutos\". Como aprofundamento, $unwind cria uma saída por item do array: uma lição com três tags pode passar a contar três vezes. Antes de somar, declare se cada linha representa lição, tag ou grupo."
        ]
      },
      {
        "title": "Índices e plano observado",
        "paragraphs": [
          "createIndex({concluida:1,trilha:1}) cria uma estrutura auxiliar ordenada por conclusão e depois trilha. Pode ajudar consultas compatíveis, mas ocupa espaço e custa trabalho nas escritas. Com três registros, uma varredura completa pode ser razoável; mesmo com o índice, não prometa aceleração. O filtro concluida:false pode selecionar quase toda uma coleção maior. Avaliar desempenho exige volume e distribuição representativos, sem forçar hint para confirmar a hipótese.",
          "explain(\"executionStats\") mostra o plano da consulta executada: nReturned, totalDocsExamined e totalKeysExamined. No exemplo, o find observado retorna duas lições, enquanto o pipeline retorna um grupo; não compare essas quantidades como se fossem a mesma operação. Registre a consulta e as medidas, sem inventar tempos. A soma ainda precisa ler os valores relevantes.",
          "Como aprofundamento, um índice único no par estudante e lição pode impor a regra de um progresso por pessoa. Antes de criá-lo em dados existentes, procure duplicados e decida qual registro preservar; excluir sem análise pode perder informação. A entrega deste laboratório é uma entrada inválida rejeitada, o resumo conferido manualmente e a leitura do plano — evidências de integridade, lógica e observação, não de ganho de desempenho."
        ]
      }
    ],
    "example": {
      "language": "javascript (mongosh)",
      "code": "const lab = db.getSiblingDB(\"tech_hub_aula_pipeline\");\nlab.createCollection(\"licoes\",{validator:{$jsonSchema:{\n bsonType:\"object\", required:[\"trilha\",\"minutos\",\"concluida\"],\n properties:{\n   trilha:{bsonType:\"string\"},\n   minutos:{bsonType:[\"int\",\"long\",\"double\",\"decimal\"],minimum:1},\n   concluida:{bsonType:\"bool\"}\n }\n}}});\nlab.licoes.insertMany([\n {_id:1,trilha:\"Dados\",minutos:Double(30),concluida:false},\n {_id:2,trilha:\"Dados\",minutos:Double(40),concluida:false},\n {_id:3,trilha:\"Python\",minutos:Double(20),concluida:true}\n]);\nlab.licoes.createIndex({concluida:1,trilha:1});\nlab.licoes.aggregate([\n {$match:{concluida:false}},\n {$group:{_id:\"$trilha\",total:{$sum:\"$minutos\"}}},\n {$sort:{total:-1,_id:1}}\n]);\nlab.licoes.find({concluida:false}).explain(\"executionStats\");",
      "explanation": [
        "required impede ausência dos três campos centrais; properties restringe seus tipos.",
        "Double explicita o tipo dos números de duração no shell.",
        "$match remove Python antes de agrupar, deixando 30 e 40 para Dados.",
        "$sort usa total decrescente e _id como desempate; explain não altera os documentos."
      ],
      "expected": "O pipeline devolve um documento {_id:\"Dados\",total:70}. O plano e os tempos de explain dependem da instância; nReturned da consulta é 2."
    },
    "guided": [
      {
        "instruction": "Execute a criação e os INSERT, depois conte os documentos.",
        "result": "lab.licoes.countDocuments({}) devolve 3."
      },
      {
        "instruction": "Tente inserir em comando separado {_id:4,trilha:\"Dados\",minutos:\"30\",concluida:false}.",
        "result": "A validação rejeita o texto e a coleção permanece com três documentos."
      },
      {
        "instruction": "Retire o $match do pipeline e execute novamente.",
        "result": "O resultado inclui Dados 70 e Python 20, porque a lição concluída voltou ao cálculo."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga qual trilha e total aparecerão se $match selecionar somente lições concluídas; depois compare com a consulta.",
        "hints": [
          "Troque false por true no filtro.",
          "Mantenha a soma agrupada por trilha."
        ],
        "solution": "lab.licoes.aggregate([{$match:{concluida:true}},{$group:{_id:\"$trilha\",total:{$sum:\"$minutos\"}}}]);",
        "explanation": "Somente o documento Python satisfaz o filtro, portanto a agregação soma apenas seus 20 minutos.",
        "expected": "{_id:\"Python\",total:20}."
      },
      {
        "prompt": "Alterar: troque a soma de minutos por uma contagem de lições por trilha, sem filtrar conclusão.",
        "hints": [
          "Somar 1 por documento produz uma contagem.",
          "Use $sum:1 em vez de somar o campo minutos."
        ],
        "solution": "lab.licoes.aggregate([{$group:{_id:\"$trilha\",quantidade:{$sum:1}}},{$sort:{_id:1}}]);",
        "explanation": "Cada documento contribui uma unidade. O resultado mede quantidade, não duração, e inclui todos os estados de progresso.",
        "expected": "Dados com quantidade 2; Python com quantidade 1."
      },
      {
        "prompt": "Construir: produza um resumo com trilha, total e quantidade das lições pendentes; omita _id na saída.",
        "hints": [
          "Use $sum:1 para contar.",
          "Leia $_id na projeção, não $trilha, pois o campo foi agrupado."
        ],
        "solution": "lab.licoes.aggregate([\n {$match:{concluida:false}},\n {$group:{_id:\"$trilha\",total:{$sum:\"$minutos\"},quantidade:{$sum:1}}},\n {$project:{_id:0,trilha:\"$_id\",total:1,quantidade:1}}\n]);",
        "explanation": "O grupo muda o formato da entrada e a projeção renomeia sua identidade sem recalcular a soma.",
        "expected": "Um documento: {trilha:\"Dados\",total:70,quantidade:2}."
      },
      {
        "prompt": "Investigar erro: tente inserir separadamente duração zero e ausência de concluida. Identifique qual regra rejeita cada entrada e confirme que a contagem continua três.",
        "hints": [
          "Um script pode parar na primeira exceção.",
          "Consulte a coleção após as duas tentativas no shell."
        ],
        "solution": "// Execute cada tentativa separadamente e observe a rejeição:\nlab.licoes.insertOne({_id:4,trilha:\"Dados\",minutos:Double(0),concluida:false});\nlab.licoes.insertOne({_id:5,trilha:\"Dados\",minutos:Double(10)});\n// Após observar ambas as falhas:\nlab.licoes.countDocuments({});",
        "explanation": "O primeiro teste verifica minimum; o segundo required. Testes separados identificam qual regra produziu a falha.",
        "expected": "As duas entradas são rejeitadas; countDocuments devolve 3."
      }
    ],
    "mistakes": [
      "Esquecer $ antes do campo em $group: use \"$trilha\" para ler o valor do documento.",
      "Definir properties sem required esperando obrigatoriedade: declare ambos.",
      "Afirmar que índice sempre acelera: observe o plano e compare em volume representativo."
    ],
    "quiz": [
      {
        "question": "O que {$sum:1} faz dentro de $group?",
        "options": [
          "Soma um por documento do grupo",
          "Soma somente minutos iguais a um",
          "Cria índice"
        ],
        "correctIndex": 0,
        "explanation": "Cada documento contribui uma unidade, formando uma contagem."
      },
      {
        "question": "Qual estágio remove documentos antes da soma?",
        "options": [
          "$sort",
          "$match",
          "$group"
        ],
        "correctIndex": 1,
        "explanation": "$match filtra a entrada dos estágios seguintes."
      },
      {
        "question": "Depois de $group:{_id:\"$trilha\",total:{$sum:\"$minutos\"}}, qual campo representa a trilha?",
        "options": [
          "trilha, sempre preservado automaticamente",
          "_id, definido como chave do grupo",
          "concluida"
        ],
        "correctIndex": 1,
        "explanation": "A saída de $group contém os campos declarados no estágio. A chave do grupo foi colocada em _id."
      }
    ],
    "summary": [
      "Valide presença e tipo separadamente.",
      "Leia o formato de saída de cada estágio.",
      "Avalie índices com consultas e dados representativos."
    ]
  },
"db-performance": {
    "prerequisites": "Conclua db-docker-compose e setup-postgresql para ter PostgreSQL 17 e um cliente conectados. Revise WHERE, ORDER BY e chaves em db-select e db-ddl-constraints. Uma consulta pode devolver poucas linhas e ainda ler a tabela inteira para encontrá-las.",
    "setup": "No terminal ou cliente SQL preparado em setup-postgresql, conecte-se a 127.0.0.1:55432, banco estudos, usuário aluno, usando a senha local do laboratório. Confira SELECT current_database(), current_user; antes de executar. Use somente um banco de laboratório onde a tabela perf_licoes ainda não existe; o script cria a tabela, insere dez mil registros sintéticos e cria um índice. Não execute novamente no mesmo banco nem remova dados existentes para reiniciar: use outro banco de laboratório autorizado. EXPLAIN (ANALYZE, BUFFERS) executa o SELECT observado; nesta aula não o aplique a comandos que modificam dados.",
    "why": "Imagine uma biblioteca com dez mil fichas. Sem organização auxiliar, procurar uma trilha exige examinar muitas fichas. Um índice se parece com um catálogo que leva aos candidatos, mas precisa ser mantido quando os dados mudam.",
    "sections": [
      {
        "title": "Hipótese: caminho de acesso e seletividade",
        "paragraphs": [
          "Uma varredura sequencial lê a tabela procurando linhas que satisfaçam o filtro. Um índice pode permitir localizar uma faixa menor de chaves e depois buscar as linhas correspondentes. Ele ocupa espaço e recebe atualizações em INSERT, DELETE e alterações das colunas indexadas. Portanto, índices têm benefício de leitura e custo de manutenção.",
          "Seletividade descreve quão pequeno é o subconjunto selecionado. Aqui trilha_id=7 encontra 100 de 10.000 linhas, aproximadamente 1%. O índice (trilha_id,id) organiza primeiro por trilha e depois por id, como o filtro e a ordenação da consulta. (id,trilha_id) não oferece o mesmo caminho direto para todas as linhas da trilha. Se quase tudo corresponde ao filtro, uma varredura sequencial pode ser melhor; sua escolha pelo planejador não é prova de erro."
        ]
      },
      {
        "title": "Medir e ler o plano",
        "paragraphs": [
          "EXPLAIN mostra o plano estimado; ANALYZE dentro de EXPLAIN executa a consulta e acrescenta observações reais. BUFFERS ajuda a entender acessos a páginas. ANALYZE como comando separado atualiza estatísticas da tabela. São usos relacionados, mas diferentes, da mesma palavra. No laboratório mediremos apenas SELECT, que não modifica registros.",
          "O custo estimado não é uma duração em milissegundos. Compare linhas estimadas e reais, filtros e páginas lidas. Diferença grande entre expectativa e realidade pode indicar estatísticas ou distribuição difíceis de estimar; investigue antes de adicionar um índice. Em nós repetidos, loops também importa. Cache e carga do computador mudam tempos: uma execução não prova ganho estável.",
          "Seq Scan lê sequencialmente; Index Scan usa índice e acessa linhas; Bitmap reúne candidatos antes de acessar páginas; Sort ordena explicitamente. Comece localizando obtenção, filtro e ordenação. A resposta de cem linhas pode ter exigido examinar milhares. O resultado funcional deve continuar igual antes e depois do índice."
        ]
      },
      {
        "title": "Escolher índices para consultas representativas",
        "paragraphs": [
          "A carga sintética distribui igualmente cem trilhas. Um produto real pode ter uma trilha muito popular. Meça filtros comuns e extremos, registre SQL e dados, repita observações e não descarte medidas contrárias à hipótese. Informe mediana ou intervalo e ambiente, sem produzir um tempo universal.",
          "(trilha_id,id) atende a um padrão específico, não toda consulta futura. Antes de criar outro índice, confirme frequência, volume retornado e custo das escritas. Transformar a coluna filtrada por uma função pode impedir o uso esperado de um índice simples; índices por expressão são outro desenho e exigem manutenção. Selecione apenas os campos necessários e use paginação com ordem estável. Consultas repetidas em laços, como buscar um autor por lição, podem gerar N+1 acessos — um problema diferente de falta de índice."
        ]
      },
      {
        "title": "Conferir correção e segurança da medição",
        "paragraphs": [
          "Antes de medir, registre quantidade, IDs e ordem esperados. Depois confirme o mesmo resultado; uma otimização que perde linhas é defeito. Trocar LEFT JOIN por JOIN pode esconder trilhas vazias mesmo se parecer mais rápido. Mude uma hipótese por vez para poder atribuir o efeito ao índice ou à lógica.",
          "EXPLAIN ANALYZE executa a instrução: nesta aula aplique-o somente aos SELECT sintéticos. Em UPDATE ou DELETE ele pode modificar dados; até um SELECT grande pode consumir recursos e adquirir locks. SQLite tem EXPLAIN QUERY PLAN, com saída própria; conceitos de filtro e caminho transferem-se, mas comandos e nós não são intercambiáveis.",
          "Entregue SQL, descrição da carga, planos antes e depois, conferência funcional e conclusão proporcional. Se não houver ganho relevante, registre a hipótese não confirmada e avalie retirar o índice experimental. Isso é evidência de diagnóstico, não promessa de estratégia ótima para qualquer carga."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "CREATE TABLE perf_licoes (\n id INTEGER PRIMARY KEY, trilha_id INTEGER NOT NULL, titulo TEXT NOT NULL\n);\nINSERT INTO perf_licoes(id,trilha_id,titulo)\nSELECT n,n % 100,'Licao ' || n FROM generate_series(1,10000) AS g(n);\nANALYZE perf_licoes;\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT id,titulo FROM perf_licoes WHERE trilha_id=7 ORDER BY id;\nCREATE INDEX idx_perf_trilha_id ON perf_licoes(trilha_id,id);\nANALYZE perf_licoes;\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT id,titulo FROM perf_licoes WHERE trilha_id=7 ORDER BY id;\nSELECT COUNT(*) AS encontrados FROM perf_licoes WHERE trilha_id=7;",
      "explanation": [
        "generate_series produz 1 a 10000 e o resto % 100 distribui os registros entre cem trilhas.",
        "A mesma consulta é medida antes e depois, preservando filtro e ordenação.",
        "O índice começa por trilha_id e continua por id, alinhando as chaves ao padrão consultado.",
        "A contagem final verifica cem registros, independentemente do plano escolhido."
      ],
      "expected": "A consulta encontra 100 registros: IDs 7,107,207,...,9907. O plano e os milissegundos dependem da versão, configuração e ambiente."
    },
    "guided": [
      {
        "instruction": "Execute a carga e consulte SELECT COUNT(*) FROM perf_licoes;.",
        "result": "A tabela possui exatamente 10000 linhas."
      },
      {
        "instruction": "Anote o tipo de acesso e as linhas efetivas do primeiro plano.",
        "result": "Você obtém uma linha de base; o resultado da consulta é de 100 linhas."
      },
      {
        "instruction": "Crie o índice e compare o segundo plano, mantendo a consulta idêntica.",
        "result": "O planejador poderá usar índice ou outro caminho; avalie leituras e estimativas sem exigir um plano específico."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de consultar, diga quantos registros pertencem à trilha 8 e qual é seu menor id; depois confirme no banco.",
        "hints": [
          "A distribuição usa o resto da divisão por 100.",
          "COUNT e MIN podem aparecer juntos sem GROUP BY."
        ],
        "solution": "SELECT COUNT(*) AS quantidade,MIN(id) AS primeiro FROM perf_licoes WHERE trilha_id=8;",
        "explanation": "Os números 8,108,...,9908 formam cem registros. O menor é 8 e o índice não altera essa aritmética.",
        "expected": "quantidade 100; primeiro 8."
      },
      {
        "prompt": "Alterar: compare o plano da consulta de trilha 7 com uma consulta que seleciona todas as trilhas. O que verificar?",
        "hints": [
          "Use EXPLAIN ANALYZE em SELECT.",
          "O filtro trilha_id>=0 corresponde às dez mil linhas."
        ],
        "solution": "EXPLAIN (ANALYZE, BUFFERS) SELECT id,titulo FROM perf_licoes WHERE trilha_id>=0;",
        "explanation": "A consulta ampla devolve 10000 linhas e pode preferir varredura sequencial. Compare volume efetivo e páginas, sem assumir que o mesmo índice será útil para todos os filtros.",
        "expected": "A consulta ampla retorna 10000 linhas; o plano deve ser observado."
      },
      {
        "prompt": "Construir: crie uma consulta paginada para os cinco primeiros IDs da trilha 7 maiores que 207 e explique a ordem.",
        "hints": [
          "IDs da trilha 7 crescem de cem em cem.",
          "Não use apenas LIMIT sem ordenar."
        ],
        "solution": "SELECT id,titulo FROM perf_licoes\nWHERE trilha_id=7 AND id>207\nORDER BY id LIMIT 5;",
        "explanation": "O marcador id>207 evita repetir os registros já vistos; ORDER BY id torna a página determinística nesse conjunto.",
        "expected": "IDs 307, 407, 507, 607 e 707."
      },
      {
        "prompt": "Investigar erro: alguém afirma que o índice sempre acelerou a consulta porque o segundo plano tem outro custo. Escreva um relatório sem inventar tempos: que evidências faltam para aceitar ou rejeitar essa afirmação?",
        "hints": [
          "Anexe evidências da sua execução.",
          "Se não executou PostgreSQL, declare o plano como pendente de medição."
        ],
        "solution": "Hipótese: (trilha_id,id) reduz trabalho no filtro trilha 7 com ordenação.\nCarga: 10000 linhas, 100 por trilha.\nSQL: registrar o SELECT completo.\nAntes/depois: anexar planos reais e ambiente.\nCorreção: mesmos 100 IDs, de 7 a 9907.\nConclusão: manter apenas se benefício e custo forem justificáveis.",
        "explanation": "Não existe um tempo esperado universal; a comparação precisa de contexto e da mesma consulta.",
        "expected": "Relatório que distingue resultado funcional fixo de plano e tempo observados."
      }
    ],
    "mistakes": [
      "Comparar consultas diferentes como se apenas o índice tivesse mudado: mantenha o SQL constante na experiência principal.",
      "Confundir EXPLAIN ANALYZE com simulação sem execução: ele executa a instrução.",
      "Adicionar índices em excesso: contabilize espaço e custo de escrita junto do ganho de leitura."
    ],
    "quiz": [
      {
        "question": "Por que o planejador pode ignorar um índice?",
        "options": [
          "Porque índice nunca funciona",
          "Porque uma varredura pode custar menos",
          "Porque SELECT exige chave primária"
        ],
        "correctIndex": 1,
        "explanation": "Quando muitas linhas são necessárias, o acesso direto pode ser mais barato."
      },
      {
        "question": "Qual resultado deve permanecer igual após criar o índice?",
        "options": [
          "O tempo em milissegundos",
          "Os registros devolvidos pela mesma consulta",
          "O nome do plano"
        ],
        "correctIndex": 1,
        "explanation": "Índices alteram o caminho de acesso, não o significado da consulta."
      },
      {
        "question": "O número cost de um EXPLAIN PostgreSQL é necessariamente o tempo em milissegundos?",
        "options": [
          "Sim, sempre",
          "Não, é uma estimativa em unidades do modelo de custo",
          "Sim, mas apenas com índice"
        ],
        "correctIndex": 1,
        "explanation": "Custo estimado e tempo observado são grandezas diferentes. ANALYZE acrescenta informações da execução real."
      }
    ],
    "summary": [
      "Meça consultas representativas antes de otimizar.",
      "Relacione ordem do índice a filtros e ordenação.",
      "Valide resultado e custo, sem prometer aceleração universal."
    ]
  },
"db-security": {
    "prerequisites": "Conclua setup-python, db-ddl-crud e a aula de funções Python. Revise placeholders no sqlite3 e diferencie o navegador que apresenta a interface da API que controla dados compartilhados. Não é necessário instalar PostgreSQL para este laboratório.",
    "setup": "No editor, crie uma pasta nova de laboratório e salve o exemplo como security_lab.py. No terminal aberto nessa pasta, confirme python --version e execute python security_lab.py. O banco existe apenas em memória e usa dados fictícios, sem credenciais. Em uma API real, usuario_id deve vir da sessão ou token verificado no servidor; nunca substitua esse passo por um valor livre recebido do navegador.",
    "why": "Uma busca por título não deve transformar o texto digitado em comando SQL. Além disso, Ana não pode acessar os registros de Beto apenas trocando um identificador. Segurança inclui a construção da consulta e a autorização sobre as linhas.",
    "sections": [
      {
        "title": "Valide a entrada e vincule valores",
        "paragraphs": [
          "SQL parametrizado mantém o texto do comando fixo e envia valores separadamente ao driver. O placeholder ? representa um valor no sqlite3. Um apóstrofo dentro do título continua sendo parte do título, sem encerrar uma string SQL construída manualmente. Não é necessário remover caracteres legítimos para proteger uma busca.",
          "Validação pergunta se o título é texto e tem tamanho permitido; parametrização separa valores da estrutura SQL. Uma não substitui a outra. A função passa usuario_id e titulo como tupla na ordem dos placeholders. Outros drivers usam sintaxes diferentes; consulte a biblioteca. A proteção está na vinculação feita pelo driver, não no símbolo ? isolado."
        ]
      },
      {
        "title": "Autentique a identidade e autorize o recurso",
        "paragraphs": [
          "WHERE usuario_id=? AND titulo=? restringe a consulta ao dono dos registros. Essa regra só funciona se usuario_id for confiável. Em uma API, derive-o da identidade autenticada, não de um campo livre enviado pelo navegador. Autenticação responde quem é a pessoa; autorização responde quais dados ela pode acessar.",
          "Duas pessoas podem ter materiais com o mesmo título. Buscar somente por título mistura as contas; o exemplo cria esse caso de propósito. Teste leitura, contagem, atualização e remoção com duas identidades, inclusive chamando a rota diretamente. Um teste apenas pela tela pode esconder uma autorização ausente na API. Um identificador bem formatado ainda pode pertencer a outra pessoa."
        ]
      },
      {
        "title": "Limite alterações e identificadores dinâmicos",
        "paragraphs": [
          "Para renomear um material, use WHERE id=? AND usuario_id=? e valores separados. O identificador do material escolhe o objeto; o identificador confiável da pessoa limita a permissão. Verifique a quantidade de linhas afetadas. Zero pode significar objeto inexistente ou fora do escopo, e a resposta pública pode evitar distinguir esses casos para não revelar a existência do material de outra conta. Esse comportamento deve ser uma decisão explícita da API.",
          "O placeholder ? representa um valor. SELECT ? FROM materiais devolve o valor fornecido para cada linha; não seleciona uma coluna pelo nome recebido. Para ordenar por título ou id, um mapa controlado pode converter \"titulo\" em \"titulo\" e \"codigo\" em \"id\", rejeitando qualquer outra opção. Só o identificador escolhido pelo programa entra na estrutura SQL. Isso é diferente de concatenar uma entrada externa diretamente. Drivers de outros motores podem oferecer APIs específicas de composição segura; use o mecanismo documentado.",
          "Nos testes negativos, use apóstrofo, texto que parece SQL, identidade sem registros e tentativa de alterar outro proprietário. Compare dados antes e depois. O objetivo não é proibir caracteres: vinculação protege a estrutura, e autorização protege o recurso. Trate erros sem devolver stack trace, URI ou senha; também não transforme toda falha em lista vazia, pois sucesso sem resultados e indisponibilidade são estados diferentes."
        ]
      },
      {
        "title": "Proteja a fronteira operacional",
        "paragraphs": [
          "Em uma aplicação compartilhada, navegador chama API e API consulta banco. A conta da aplicação recebe somente privilégios necessários; uma conta de leitura não cria tabelas e uma conta comum não administra usuários. PostgreSQL organiza isso com roles. SQLite usa permissões do arquivo e a fronteira do processo, não o mesmo modelo interno: um GRANT de PostgreSQL não se aplica ao arquivo SQLite.",
          "Credenciais pertencem à configuração protegida do servidor, nunca ao JavaScript enviado ao navegador. Arquivos de ambiente não devem entrar no repositório com segredos reais. Use credenciais de laboratório, restrinja acesso e rotacione após exposição. Logs também podem revelar dados e tokens: registre contexto suficiente para investigar sem copiar segredos ou parâmetros pessoais desnecessários.",
          "Este laboratório comprova parametrização e escopo de linha em uma função pequena; não implementa login, sessão, gestão de roles, criptografia ou conformidade com a LGPD. Essas camadas precisam de testes próprios na futura API. Marcar a aula como concluída não comprova que uma aplicação publicada esteja segura."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "import sqlite3\nfrom contextlib import closing\n\ndef buscar(conexao, usuario_id, titulo):\n    return conexao.execute(\n        \"SELECT id,titulo FROM materiais WHERE usuario_id=? AND titulo=? ORDER BY id\",\n        (usuario_id, titulo)\n    ).fetchall()\n\nwith closing(sqlite3.connect(\":memory:\")) as conexao:\n    with conexao:\n        conexao.execute(\"CREATE TABLE materiais(id INTEGER PRIMARY KEY,usuario_id INTEGER,titulo TEXT)\")\n        conexao.executemany(\"INSERT INTO materiais VALUES(?,?,?)\", [\n            (1,1,\"Guia d'água\"), (2,2,\"Guia d'água\"), (3,1,\"SQL\")\n        ])\n    print(buscar(conexao, 1, \"Guia d'água\"))\n    print(buscar(conexao, 1, \"Inexistente\"))\n",
      "explanation": [
        "executemany aplica a mesma instrução parametrizada a três tuplas.",
        "A função recebe dois parâmetros, separando identidade e título.",
        "O filtro de proprietário impede que a linha 2 apareça na busca do usuário 1.",
        "O apóstrofo é tratado como dado e a busca inexistente devolve lista vazia."
      ],
      "expected": "Primeira saída: uma lista com id 1 e título Guia d’água, escrito com o apóstrofo simples do código. Segunda saída: []. O id 2 não aparece."
    },
    "guided": [
      {
        "instruction": "Execute o exemplo e compare os registros com o mesmo título.",
        "result": "Apenas id 1 aparece porque usuario_id também faz parte do filtro."
      },
      {
        "instruction": "Dentro do bloco aberto, chame buscar com usuário 2 e o mesmo título.",
        "result": "A resposta contém somente id 2, pertencente ao usuário 2."
      },
      {
        "instruction": "Desenhe navegador → API → banco e marque onde verificar a identidade.",
        "result": "A API valida a sessão e fornece usuario_id confiável à função de acesso."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga qual registro buscar(conexao, 1, \"SQL\") deve devolver; depois faça a chamada e compare.",
        "hints": [
          "A função já recebe os dois critérios.",
          "Mantenha a chamada dentro do bloco da conexão."
        ],
        "solution": "print(buscar(conexao, 1, \"SQL\"))",
        "explanation": "O registro 3 possui simultaneamente o proprietário e o título solicitados. Não é necessário montar uma nova instrução com concatenação.",
        "expected": "[(3, \"SQL\")]."
      },
      {
        "prompt": "Alterar: implemente uma função para contar materiais de um usuário, mantendo usuario_id como parâmetro vinculado.",
        "hints": [
          "Use COUNT(*) com WHERE usuario_id=?.",
          "fetchone()[0] extrai o número da primeira coluna."
        ],
        "solution": "def contar(conexao, usuario_id):\n    return conexao.execute(\"SELECT COUNT(*) FROM materiais WHERE usuario_id=?\", (usuario_id,)).fetchone()[0]\n# Faça estas chamadas dentro do bloco da conexão:\nprint(contar(conexao, 1))\nprint(contar(conexao, 2))",
        "explanation": "A separação de usuários também vale para agregações. A função deve receber identidade já autorizada pela camada que a chama.",
        "expected": "Usuário 1: 2. Usuário 2: 1."
      },
      {
        "prompt": "Construir: dentro da conexão do exemplo, teste um título que parece condição SQL e prove que a tabela permanece com três linhas.",
        "hints": [
          "Passe o texto como argumento da função.",
          "Não monte SQL novo por f-string."
        ],
        "solution": "print(buscar(conexao, 1, \"' OR 1=1 --\"))\nprint(conexao.execute(\"SELECT COUNT(*) FROM materiais\").fetchone()[0])",
        "explanation": "O driver trata toda a string como um título literal. A estrutura da consulta e o filtro de proprietário não mudam.",
        "expected": "[] e depois 3."
      },
      {
        "prompt": "Investigar erro: uma função atualiza somente por id e permite alterar material de outra conta. Corrija renomear para exigir a identidade confiável e teste usuário 1 tentando alterar id 2.",
        "hints": [
          "Inclua id e usuario_id no WHERE.",
          "Use rowcount para observar a abrangência."
        ],
        "solution": "def renomear(conexao, usuario_id, material_id, novo_titulo):\n    with conexao:\n        cursor = conexao.execute(\n            \"UPDATE materiais SET titulo=? WHERE id=? AND usuario_id=?\",\n            (novo_titulo, material_id, usuario_id))\n    return cursor.rowcount\n\n# Chame dentro do bloco da conexão, após a carga:\nprint(renomear(conexao, 1, 2, \"Alterado\"))\nprint(conexao.execute(\"SELECT titulo FROM materiais WHERE id=?\", (2,)).fetchone()[0])",
        "explanation": "O par de filtros impede alteração de outra conta. O valor usuario_id deve ter sido verificado pela camada de autenticação.",
        "expected": "0 linhas alteradas; título do id 2 continua Guia d’água com o apóstrofo simples do exemplo."
      }
    ],
    "mistakes": [
      "Usar f-string com entrada externa: passe valores pela interface de parâmetros.",
      "Achar que parâmetros autorizam acesso: valide também a identidade e o proprietário.",
      "Colocar senha de banco no HTML: mantenha a conexão privilegiada no servidor da aplicação."
    ],
    "quiz": [
      {
        "question": "Parâmetros substituem livremente nomes de colunas?",
        "options": [
          "Sim",
          "Não, representam valores",
          "Somente colunas curtas"
        ],
        "correctIndex": 1,
        "explanation": "Identificadores dinâmicos precisam de composição segura ou lista permitida."
      },
      {
        "question": "De onde deve vir usuario_id em uma API autenticada?",
        "options": [
          "De qualquer campo do navegador",
          "Da identidade verificada no servidor",
          "Do título do material"
        ],
        "correctIndex": 1,
        "explanation": "Confiar no valor livre enviado pelo cliente permitiria consultar outra conta."
      },
      {
        "question": "Uma consulta parametrizada autoriza automaticamente o usuário a ler qualquer registro?",
        "options": [
          "Sim",
          "Não; autorização exige identidade confiável e escopo de acesso",
          "Apenas se o título não tem apóstrofo"
        ],
        "correctIndex": 1,
        "explanation": "Parâmetros protegem a separação entre comando e valores. Permissão de acesso é uma regra adicional."
      }
    ],
    "summary": [
      "Separe valores da instrução SQL.",
      "Verifique autorização também em consultas e agregações.",
      "Mantenha credenciais e privilégios no lugar apropriado."
    ]
  },
"db-recovery": {
    "prerequisites": "Conclua setup-python, db-ddl-constraints e db-transactions. Saiba abrir SQLite com Python, executar consultas e distinguir COMMIT de ROLLBACK antes de experimentar cópias e mudanças de estrutura.",
    "setup": "No editor, crie uma pasta nova de laboratório e salve o exemplo em recovery_lab.py. No terminal aberto nessa pasta, confirme python --version e execute python recovery_lab.py. O exemplo mantém origem e cópia em bancos SQLite separados na memória, portanto não sobrescreve arquivos reais e desaparece ao encerrar. Para praticar persistência depois, use dois nomes novos dentro da pasta, nunca o caminho de um banco importante; a API de backup substitui o conteúdo do destino. Pare com Ctrl+C se o processo não terminar e retome com uma pasta de laboratório limpa.",
    "why": "Uma cópia nunca aberta pode estar vazia ou impossível de restaurar. Recuperação significa demonstrar que dados e regras voltam a funcionar em outro ambiente dentro de um prazo conhecido, não apenas afirmar que um arquivo existe.",
    "sections": [
      {
        "title": "Defina perda, prazo e conteúdo protegido",
        "paragraphs": [
          "RPO é o limite de perda aceitável medido no tempo. Se você aceita perder no máximo uma hora de alterações, um backup diário isolado não satisfaz a meta. RTO é o tempo máximo planejado para restabelecer o serviço. Uma cópia que leva dois dias para restaurar não atende um RTO de uma hora.",
          "Essas metas orientam frequência, retenção, automação e uso de logs; não existe frequência universal. Defina também o que a cópia inclui: esquema, dados, índices, regras e configuração necessária. Réplica pode repetir uma exclusão acidental, e CSV geralmente não recria constraints e relações; nenhum deles substitui automaticamente um backup histórico testado."
        ]
      },
      {
        "title": "Faça uma cópia consistente e teste o destino",
        "paragraphs": [
          "Copiar um arquivo de banco em uso sem conhecer seu modo de operação pode ignorar arquivos auxiliares ou produzir estado inconsistente. A API backup do SQLite coordena a cópia através do motor. Neste exemplo, origem.backup(copia) copia para outra conexão após confirmarmos a carga inicial.",
          "O teste precisa consultar o destino: comparar somente a origem não demonstra recuperação. Valide quantidade, título conhecido e rejeição de um valor NULL. Contagens iguais não bastam. PRAGMA integrity_check normalmente devolve ok quando não encontra problemas; foreign_key_check vazio indica ausência de violações de referência. Essas verificações técnicas ainda precisam ser combinadas com consultas do domínio.",
          "O backup em memória demonstra consistência e isolamento, mas desaparece com o processo. Para comprovar durabilidade, use dois arquivos novos na pasta, feche as conexões e abra o destino em outra execução. Registre horário da cópia, último dado recuperado e duração: um arquivo íntegro pode estar antigo demais para o RPO."
        ]
      },
      {
        "title": "Ensaie restauração, retenção e acesso",
        "paragraphs": [
          "O roteiro é: identificar cópia e horário, preparar destino isolado, restaurar, abrir a aplicação de teste, consultar dados conhecidos, testar regras e medir duração. O destino precisa recuperar SQL e continuar rejeitando titulo NULL. Compare o tempo observado ao RTO e a idade do último dado ao RPO.",
          "Retenção define quantas versões ficam disponíveis e por quanto tempo. Uma única cópia substituída pode eliminar o último estado bom antes de um erro ser percebido. Mantenha acesso restrito e uma versão independente do local principal. Com dados pessoais, retenção e descarte precisam seguir a necessidade e a política do produto. Nesta aula use apenas dados fictícios e descreva a política; administrar produção não faz parte do exercício."
        ]
      },
      {
        "title": "Migre por expansão e planeje a falha",
        "paragraphs": [
          "Migração é uma mudança versionada e reproduzível. A expansão adiciona primeiro resumo opcional, permite que versões antiga e nova convivam e preenche somente dados conhecidos. Depois de conferir consumidores e registros, outra etapa pode endurecer a regra. Exigir texto imediatamente pode falhar ou criar conteúdo fictício. A origem intacta permite comparar antes e depois do ensaio.",
          "Versione migrações com identificador, ordem, pré-condições e verificação final. A execução deve registrar o que já foi aplicado para impedir repetir um ALTER TABLE que acrescenta a mesma coluna. Idempotência significa que repetir a operação preserva o resultado, mas nem toda migração é naturalmente idempotente. Um controle de versões evita a repetição indevida; não basta suprimir toda exceção, porque um erro real poderia ser confundido com migração já executada.",
          "Rollback desfaz mudanças não confirmadas; restauração recupera uma cópia; migração inversa tenta desfazer transformação já aplicada. Remover uma coluna e recriá-la vazia não recupera seus dados. No plano de falha, explique se reverte código, esquema ou dados e o que pode se perder. Cada motor tem ferramentas próprias: não copie comandos entre SQLite, PostgreSQL, MariaDB e Firebird."
        ]
      }
    ],
    "example": {
      "language": "python",
      "code": "import sqlite3\nfrom contextlib import closing\n\nwith closing(sqlite3.connect(\":memory:\")) as origem, closing(sqlite3.connect(\":memory:\")) as copia:\n    with origem:\n        origem.execute(\"CREATE TABLE licoes(id INTEGER PRIMARY KEY,titulo TEXT NOT NULL)\")\n        origem.execute(\"INSERT INTO licoes VALUES(1,'SQL')\")\n    origem.backup(copia)\n    print(copia.execute(\"SELECT id,titulo FROM licoes ORDER BY id\").fetchall())\n    with copia:\n        copia.execute(\"ALTER TABLE licoes ADD COLUMN resumo TEXT\")\n        copia.execute(\"UPDATE licoes SET resumo=? WHERE id=?\", (\"Primeiras consultas\",1))\n    print(copia.execute(\"SELECT titulo,resumo FROM licoes WHERE id=1\").fetchone())\n    print([coluna[1] for coluna in origem.execute(\"PRAGMA table_info(licoes)\")])\n",
      "explanation": [
        "A carga na origem é confirmada antes de chamar backup, sem deixar escrita pendente.",
        "origem.backup(copia) usa a API para copiar o banco a uma conexão independente.",
        "ALTER TABLE e preenchimento modificam apenas a cópia, representando um ensaio.",
        "PRAGMA table_info confirma que a origem continua com id e titulo."
      ],
      "expected": "Saídas: [(1,\"SQL\")]; (\"SQL\",\"Primeiras consultas\"); [\"id\",\"titulo\"]. A cópia ganhou resumo e a origem não."
    },
    "guided": [
      {
        "instruction": "Execute o exemplo e identifique a conexão de cada consulta.",
        "result": "As duas primeiras leem a cópia; a última inspeciona a origem."
      },
      {
        "instruction": "Antes da migração, consulte COUNT(*) nas duas conexões.",
        "result": "Ambas têm uma lição; complemente a contagem comparando os valores."
      },
      {
        "instruction": "Depois da migração, consulte PRAGMA table_info(licoes) na cópia.",
        "result": "Aparecem id, titulo e resumo; a alteração foi ensaiada sem modificar a origem."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga qual título deve existir somente na cópia restaurada; depois acrescente uma verificação automática no destino.",
        "hints": [
          "Não consulte origem para validar o destino.",
          "Filtre a chave conhecida e compare o texto."
        ],
        "solution": "assert copia.execute(\"SELECT titulo FROM licoes WHERE id=?\", (1,)).fetchone()[0] == \"SQL\"",
        "explanation": "Coloque a instrução depois do backup e dentro do bloco das conexões. assert interrompe a execução se a condição não for verdadeira.",
        "expected": "Nenhuma exceção: o título recuperado é SQL."
      },
      {
        "prompt": "Alterar: a última cópia foi às 10h e a falha ocorreu às 10h45. Sem logs de recuperação, calcule a perda potencial e avalie um RPO de 15 minutos.",
        "hints": [
          "Calcule a janela desde a cópia até a falha.",
          "Compare 45 minutos com o limite de 15."
        ],
        "solution": "Janela potencial de perda: 45 minutos.\nRPO permitido: 15 minutos.\nResultado: meta não cumprida.",
        "explanation": "Sem proteção adicional, alterações depois das 10h podem se perder. É necessário reduzir a janela ou usar uma estratégia que permita recuperar alterações mais recentes.",
        "expected": "A janela excede o limite em 30 minutos."
      },
      {
        "prompt": "Construir: depois do backup e antes da migração, confira a integridade da cópia e prove que NOT NULL foi preservado. Use somente a conexão copia do laboratório.",
        "hints": [
          "Faça a tentativa após a carga ter sido confirmada.",
          "Capture especificamente IntegrityError."
        ],
        "solution": "print(copia.execute(\"PRAGMA integrity_check\").fetchone()[0])\ntry:\n    with copia:\n        copia.execute(\"INSERT INTO licoes(id,titulo) VALUES(?,?)\", (2,None))\nexcept sqlite3.IntegrityError:\n    print(\"NOT NULL preservado\")\nprint(copia.execute(\"SELECT COUNT(*) FROM licoes\").fetchone()[0])",
        "explanation": "O teste consulta o destino e tenta violar uma regra. O rollback do INSERT inválido preserva a única lição.",
        "expected": "ok; NOT NULL preservado; 1."
      },
      {
        "prompt": "Investigar erro: uma migração torna resumo obrigatório imediatamente e falha em linhas antigas. Escreva um plano de expansão que preserve compatibilidade e inclua teste de recuperação.",
        "hints": [
          "Uma coluna nova pode começar opcional.",
          "Defina como reconhecer a migração aplicada."
        ],
        "solution": "1. Gerar cópia consistente e restaurá-la em ambiente isolado.\n2. Conferir título SQL, contagem e regras.\n3. Adicionar resumo opcional em migração versionada.\n4. Atualizar aplicação para aceitar NULL e novos textos.\n5. Preencher somente dados com resumo conhecido.\n6. Validar consultas e registrar duração de restauração.\n7. Avaliar uma restrição futura somente após dados e consumidores compatíveis.",
        "explanation": "Separar expansão de endurecimento da regra permite transição gradual e evita conteúdo fictício inserido apenas para satisfazer constraint.",
        "expected": "Plano com ordem de execução, compatibilidade, validação e recuperação medida."
      }
    ],
    "mistakes": [
      "Conferir apenas a existência do arquivo: abra uma cópia e valide dados e regras.",
      "Copiar arquivos em uso sem procedimento consistente: use ferramentas próprias do motor.",
      "Migrar diretamente no único banco: ensaie e tenha recuperação verificada antes de alterar dados importantes."
    ],
    "quiz": [
      {
        "question": "RPO mede qual necessidade?",
        "options": [
          "Perda temporal aceitável",
          "Quantidade de tabelas",
          "Tamanho de um título"
        ],
        "correctIndex": 0,
        "explanation": "RPO expressa a janela de perda de dados aceitável."
      },
      {
        "question": "Qual consulta valida realmente a cópia?",
        "options": [
          "Uma consulta somente na origem",
          "Uma consulta no destino restaurado",
          "O nome do arquivo"
        ],
        "correctIndex": 1,
        "explanation": "A verificação deve exercitar o banco que seria usado na recuperação."
      },
      {
        "question": "Uma réplica que reproduz imediatamente todas as escritas substitui sempre o backup histórico?",
        "options": [
          "Sim, porque tem os mesmos dados",
          "Não; ela pode reproduzir também uma exclusão acidental",
          "Sim, se a tabela tem chave primária"
        ],
        "correctIndex": 1,
        "explanation": "Replicação e recuperação histórica atendem riscos diferentes. Uma cópia independente e testada continua importante."
      }
    ],
    "summary": [
      "Backup precisa de teste de recuperação.",
      "Defina RPO e RTO antes de prometer proteção.",
      "Ensaie migrações em cópia e valide além de contagens."
    ]
  },
"db-project": {
    "prerequisites": "Conclua db-modeling, db-ddl-constraints, db-joins e db-aggregation; revise db-nosql-models para comparar alternativas. A preparação SQLite da trilha de dados basta para esta aula. Parâmetros, serviço e recuperação serão necessários ao transformar o laboratório em aplicação, não para executar este exemplo.",
    "setup": "No cliente SQLite preparado na trilha de dados, abra uma base de laboratório vazia e execute o script uma vez. Ele cria estudantes, trilhas, lições, matrículas e progresso; não é uma API nem deve ser usado com dados pessoais reais. Para repetir os mesmos resultados, abra outra base de laboratório em vez de apagar a anterior. Confira que PRAGMA foreign_keys=ON foi aplicado nesta conexão antes dos testes negativos.",
    "why": "Ana e Beto estudam Dados, mas concluir uma aula para Ana não pode alterar Beto. Também precisamos mostrar Python mesmo sem lições, pois o dashboard não deve esconder uma matrícula existente.",
    "sections": [
      {
        "title": "Critérios de aceite antes do esquema",
        "paragraphs": [
          "O briefing mínimo é: uma pessoa pode se matricular em várias trilhas; uma trilha pode não ter lições; progresso é individual; o relatório inclui matrículas vazias; repetir uma conclusão não cria outra linha. Ana e Beto compartilham Dados, mas somente Ana tem Python vazio. Esses casos pequenos expõem vazamento entre usuários, duplicação e perda de linhas na junção antes de aumentar a carga.",
          "ESTUDANTES e TRILHAS têm identidades próprias; LICOES aponta para uma trilha. MATRICULAS impede duplicar o par estudante/trilha. PROGRESSO tem chave composta estudante/lição, para permitir estados diferentes da mesma aula sem duplicar o estado de uma pessoa. As FKs atuais verificam existência, mas ainda não provam que a pessoa está matriculada na trilha da lição: registre esse limite como critério pendente."
        ]
      },
      {
        "title": "Relatório com granularidade de matrícula",
        "paragraphs": [
          "Cada linha final representa uma matrícula: um estudante em uma trilha. Começamos por MATRICULAS e juntamos os nomes. LEFT JOIN com LICOES preserva matrículas de trilhas vazias. Outra junção procura PROGRESSO usando simultaneamente estudante e lição, evitando misturar usuários ou multiplicar conclusões.",
          "COUNT(l.id) mede lições reais, não linhas vazias geradas pelo LEFT JOIN. SUM(COALESCE(p.concluida,0)) trata ausência de progresso como pendência. Quando não há lições, CASE define percentual zero e evita divisão por zero; 100.0 preserva cálculo decimal. Uma trilha vazia não é considerada concluída nesta convenção. Confira três linhas: Ana/Dados 50%, Ana/Python 0% e Beto/Dados 0%."
        ]
      },
      {
        "title": "Reforce a regra que as FKs isoladas não garantem",
        "paragraphs": [
          "Uma FK isolada de PROGRESSO para ESTUDANTES e outra para LICOES permitem um progresso de uma lição válida mesmo sem matrícula naquela trilha. Não afirme que o esquema inicial impede isso. Desenhe PROGRESSO com estudante_id, trilha_id e licao_id: o par estudante/trilha referencia MATRICULAS, e lição/trilha referencia uma chave única equivalente em LICOES. O mesmo trilha_id une as duas regras.",
          "Teste em uma base nova o caso inválido Beto/Python/SELECT: a lição pertence a Dados e Beto não está matriculado em Python. A solução por FKs compostas deve rejeitá-lo. Uma alternativa valida na aplicação com controle transacional adequado, mas requer cuidar de concorrência. A coluna extra tem custo; não aplique ALTER apressado sobre dados antigos sem examinar incompatibilidades e planejar migração."
        ]
      },
      {
        "title": "Entregue, escolha e reavalie",
        "paragraphs": [
          "Entregue criação/carga, consulta, resultados esperados, casos negativos em comandos separados e uma decisão curta de banco. Outra pessoa deve reconstruir uma base vazia e obter as três linhas do relatório. Capturas são apoio; SQL e instruções reproduzíveis são a evidência. Registre também quem escreve, necessidade offline, concorrência, operação e recuperação. SQLite atende este laboratório local; para serviço web compartilhado, avalie API, autenticação, volume de escrita e banco cliente-servidor. Uma alternativa documental pode incorporar catálogo pequeno, mas não deve fazer o progresso de muitos usuários crescer sem limite no mesmo documento.",
          "Mudança de requisito: desmarcar a conclusão de Ana em SELECT sem alterar Beto nem sua matrícula. O UPDATE precisa filtrar estudante e lição. Se for necessário histórico de eventos, o booleano atual não basta; seriam necessários evento, instante, autor e política de estado atual. Finalize com ensaio de backup/restauração e leitura de plano em uma consulta relevante. Registre requisito, opção, alternativa, custo aceito e gatilho de revisão; não presuma que executar este laboratório equivale a operar todos os motores."
        ]
      }
    ],
    "example": {
      "language": "sql",
      "code": "PRAGMA foreign_keys=ON;\nCREATE TABLE estudantes(id INTEGER PRIMARY KEY,nome TEXT NOT NULL);\nCREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT NOT NULL);\nCREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha_id INTEGER NOT NULL REFERENCES trilhas(id),titulo TEXT NOT NULL);\nCREATE TABLE matriculas(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),trilha_id INTEGER NOT NULL REFERENCES trilhas(id),\n PRIMARY KEY(estudante_id,trilha_id));\nCREATE TABLE progresso(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),licao_id INTEGER NOT NULL REFERENCES licoes(id),\n concluida INTEGER NOT NULL CHECK(concluida IN(0,1)),PRIMARY KEY(estudante_id,licao_id));\nINSERT INTO estudantes VALUES(1,'Ana'),(2,'Beto');\nINSERT INTO trilhas VALUES(1,'Dados'),(2,'Python');\nINSERT INTO licoes VALUES(10,1,'SELECT'),(11,1,'JOIN');\nINSERT INTO matriculas VALUES(1,1),(1,2),(2,1);\nINSERT INTO progresso VALUES(1,10,1),(2,10,0);\nSELECT e.nome AS estudante,t.nome AS trilha,COUNT(l.id) AS total,\n SUM(COALESCE(p.concluida,0)) AS concluidas,\n CASE WHEN COUNT(l.id)=0 THEN 0\n ELSE 100.0*SUM(COALESCE(p.concluida,0))/COUNT(l.id) END AS percentual\nFROM matriculas m\nJOIN estudantes e ON e.id=m.estudante_id\nJOIN trilhas t ON t.id=m.trilha_id\nLEFT JOIN licoes l ON l.trilha_id=t.id\nLEFT JOIN progresso p ON p.licao_id=l.id AND p.estudante_id=e.id\nGROUP BY e.id,e.nome,t.id,t.nome ORDER BY e.id,t.id;",
      "explanation": [
        "A matrícula define quais pares aparecem: Beto não está matriculado em Python.",
        "A primeira junção à esquerda mantém Python mesmo sem lições.",
        "A segunda usa as duas partes da identidade do progresso, isolando Ana e Beto.",
        "CASE trata trilha vazia; 100.0 evita truncamento de divisão inteira."
      ],
      "expected": "Ana | Dados | 2 | 1 | 50.0; Ana | Python | 0 | 0 | 0; Beto | Dados | 2 | 0 | 0.0."
    },
    "guided": [
      {
        "instruction": "Execute e confira as três linhas do relatório.",
        "result": "Ana tem duas matrículas e Beto uma; ninguém herda a conclusão do outro."
      },
      {
        "instruction": "Tente inserir novamente o progresso (1,10,1) em comando separado.",
        "result": "A chave composta rejeita o par duplicado."
      },
      {
        "instruction": "Explique por que p.estudante_id=e.id faz parte da junção.",
        "result": "Sem essa condição, progressos de pessoas distintas poderiam combinar com a mesma lição."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de concluir JOIN para Ana, diga quais percentuais mudarão e quais permanecerão iguais. Depois faça o INSERT e execute novamente o relatório.",
        "hints": [
          "O estudante é 1 e a lição é 11.",
          "Ainda não existe registro desse par: use INSERT."
        ],
        "solution": "INSERT INTO progresso VALUES(1,11,1);\n-- Reexecute o SELECT completo do exemplo.",
        "explanation": "A nova linha acrescenta uma conclusão apenas a Ana. O filtro composto da junção impede que a alteração afete Beto.",
        "expected": "Ana/Dados: 2 concluídas e 100%. Beto/Dados: 0%. Ana/Python: 0%."
      },
      {
        "prompt": "Alterar: adicione Listas à trilha Python sem registrar conclusão. Repita o relatório.",
        "hints": [
          "Python tem id 2; use id 12 para a nova lição.",
          "A ausência de progresso será convertida em zero."
        ],
        "solution": "INSERT INTO licoes VALUES(12,2,'Listas');\n-- Reexecute o SELECT completo do exemplo.",
        "explanation": "A matrícula de Ana em Python já existia, então a lição entra no denominador. Sem progresso, permanece pendente. Beto não ganha matrícula automaticamente.",
        "expected": "Ana/Python: total 1, concluídas 0, percentual 0. Continuam existindo três linhas."
      },
      {
        "prompt": "Construir: na base original do exemplo, desmarque apenas SELECT para Ana. Reexecute o relatório e explique por que o WHERE precisa das duas identidades.",
        "hints": [
          "Execute em uma nova base original para obter os valores previstos.",
          "Não remova a matrícula."
        ],
        "solution": "UPDATE progresso SET concluida=0\nWHERE estudante_id=1 AND licao_id=10;\n-- Reexecute o SELECT completo do exemplo antes de outras alterações.",
        "explanation": "A conclusão descreve um par. Filtrar apenas licao_id poderia alterar o estado de outras pessoas.",
        "expected": "Ana/Dados: 0 de 2 e 0%; Beto/Dados permanece 0%; Ana/Python permanece 0%."
      },
      {
        "prompt": "Investigar erro: o esquema inicial aceita progresso de uma lição fora da matrícula. Desenhe duas FKs compostas para impedir isso em uma base nova, declare o caso inválido que deve falhar e registre por que SQLite basta para o laboratório local e qual requisito levaria a reavaliá-lo.",
        "hints": [
          "A chave referenciada deve ser única.",
          "O desenho é uma especificação; implemente em base nova antes de migrar."
        ],
        "solution": "LICOES: UNIQUE(id,trilha_id)\nMATRICULAS: PRIMARY KEY(estudante_id,trilha_id)\nPROGRESSO: estudante_id,trilha_id,licao_id,concluida\n  PRIMARY KEY(estudante_id,licao_id)\n  FOREIGN KEY(estudante_id,trilha_id) -> MATRICULAS(estudante_id,trilha_id)\n  FOREIGN KEY(licao_id,trilha_id) -> LICOES(id,trilha_id)\nTeste inválido: Beto (2), Python (2), SELECT (10, da trilha 1).\nDecisão: SQLite local atende ao estudo individual sem serviço adicional; PostgreSQL com API é alternativa para acesso remoto centralizado, com custo de operação maior; reavaliar quando várias pessoas precisarem escrever de dispositivos diferentes.",
        "explanation": "A presença isolada de cada entidade não garante a relação correta. O par inclui a trilha nos dois lados e impede uma combinação incoerente.",
        "expected": "Duas referências compostas rejeitam Beto/Python/SELECT no esquema reforçado; a decisão explicita requisito local, alternativa, custo e gatilho para revisão."
      }
    ],
    "mistakes": [
      "Guardar concluida em LICOES para vários usuários: use a relação estudante/lição.",
      "Contar COUNT(*) após LEFT JOIN: conte l.id para obter zero em trilha vazia.",
      "Escolher banco antes dos requisitos: documente acesso, concorrência, integridade e recuperação."
    ],
    "quiz": [
      {
        "question": "Por que o progresso usa chave composta?",
        "options": [
          "Conclusão pertence ao par pessoa/lição",
          "Títulos precisam de duas palavras",
          "SQLite exige duas chaves"
        ],
        "correctIndex": 0,
        "explanation": "Cada pessoa pode estudar várias lições e cada lição pode ter vários estudantes."
      },
      {
        "question": "Python sem lições deve desaparecer?",
        "options": [
          "Sim",
          "Não, a matrícula existe",
          "Apenas se o nome for curto"
        ],
        "correctIndex": 1,
        "explanation": "O relatório representa matrículas e preserva trilhas vazias com LEFT JOIN."
      },
      {
        "question": "As FKs estudante_id e licao_id isoladas provam que o aluno está matriculado na trilha da lição?",
        "options": [
          "Sim, toda FK verifica todas as relações",
          "Não; é necessária uma regra adicional que conecte matrícula e trilha",
          "Sim, se ambos os IDs são inteiros"
        ],
        "correctIndex": 1,
        "explanation": "Cada FK garante apenas a referência declarada. O vínculo entre matrícula e trilha precisa ser expresso por constraints adicionais ou validação adequada."
      }
    ],
    "summary": [
      "Valide requisitos com dados que exponham erros.",
      "Mantenha a identidade do usuário nas consultas de progresso.",
      "Escolha e opere o banco conforme necessidades demonstradas."
    ]
  }
});

'use strict';

// Estrutura das trilhas, módulos e aulas. IDs são persistidos e devem permanecer estáveis.
    const tracks = [
  {
    "id": "preparacao",
    "title": "Etapa 0",
    "subtitle": "Prepare seu ambiente.",
    "icon": "terminal",
    "color": "#a78bfa",
    "range": "Primeiro contato → Ambiente pronto",
    "description": "Aprenda a localizar arquivos, distinguir as ferramentas e repetir com segurança o ciclo de trabalho antes de programar.",
    "prerequisite": "Nenhum conhecimento prévio. Esta é a entrada recomendada para quem está começando do zero.",
    "project": "Prova prática: preparar uma pasta, executar comandos seguros e registrar um erro com contexto.",
    "modules": [
      {
        "id": "prep-digital",
        "title": "Preparação digital para programar",
        "level": "Nível 0 · preparação",
        "number": "00",
        "description": "Ferramentas, arquivos, editor, terminal, execução e leitura inicial de erros.",
        "resources": [
          {
            "kind": "doc",
            "title": "VS Code · Primeiros passos oficiais",
            "url": "https://code.visualstudio.com/docs/getstarted/overview",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "VS Code · Introdução ao terminal integrado",
            "url": "https://code.visualstudio.com/docs/terminal/getting-started",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Introdução à linha de comando",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Microsoft · Extensões de nomes de arquivos no Windows",
            "url": "https://support.microsoft.com/en-au/windows/experience/storage-filemanagement/common-file-name-extensions-in-windows",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "prep-tools",
            "title": "Editor, navegador, terminal e interpretador",
            "minutes": 35,
            "concept": "Distinguir as quatro ferramentas e escolher onde escrever, executar e observar cada ação.",
            "objectives": [
              "Identificar editor, navegador, terminal e interpretador pelo papel de cada um.",
              "Escolher corretamente onde digitar texto, código e comandos.",
              "Explicar por que instalar um editor não instala todas as linguagens."
            ],
            "exercise": "Diante de cinco tarefas, indique a ferramenta correta e justifique cada escolha.",
            "code": "Editor: escreve e salva arquivos\nNavegador: apresenta páginas e ferramentas web\nTerminal: recebe comandos de texto\nInterpretador/runtime: executa uma linguagem, como Python ou Node.js",
            "docs": []
          },
          {
            "id": "prep-files",
            "title": "Pastas, arquivos, nomes e extensões",
            "minutes": 45,
            "concept": "Criar uma pasta de estudo e reconhecer nome, caminho, formato e extensão sem esconder erros como .html.txt.",
            "objectives": [
              "Criar e localizar uma pasta exclusiva para estudos.",
              "Distinguir nome, extensão e caminho de um arquivo.",
              "Exibir extensões no Windows e conferir o nome real em qualquer sistema."
            ],
            "exercise": "Crie estudos-programacao, salve registro.txt e confirme seu nome e caminho completos.",
            "code": "estudos-programacao/\n└── registro.txt",
            "docs": []
          },
          {
            "id": "prep-workspace",
            "title": "A mesma pasta no editor e no terminal",
            "minutes": 45,
            "concept": "Abrir a pasta de estudo como workspace e confirmar no terminal que os dois contextos apontam para o mesmo lugar.",
            "objectives": [
              "Abrir uma pasta inteira no editor, não apenas um arquivo isolado.",
              "Abrir o terminal integrado e identificar o shell em uso.",
              "Conferir a pasta atual e listar seus arquivos no Windows, macOS ou Linux."
            ],
            "exercise": "Abra estudos-programacao no editor, confirme a pasta atual no terminal e encontre registro.txt na listagem.",
            "code": "# PowerShell\nGet-Location\nGet-ChildItem\n\n# macOS ou Linux\npwd\nls",
            "docs": []
          },
          {
            "id": "prep-cycle",
            "title": "Salvar, executar, observar e encerrar",
            "minutes": 50,
            "concept": "Repetir o ciclo mínimo de trabalho e interromper com segurança um comando que continua executando.",
            "objectives": [
              "Salvar um arquivo e confirmar que a alteração foi gravada.",
              "Executar um comando simples e comparar a saída esperada com a observada.",
              "Encerrar um comando contínuo com Ctrl+C e retomar a sessão."
            ],
            "exercise": "Altere registro.txt, execute o comando de teste do seu sistema, interrompa um ping e confirme que o terminal voltou a aceitar comandos.",
            "code": "# PowerShell\nWrite-Output \"teste concluído\"\nping 127.0.0.1 -t\n\n# macOS ou Linux\nprintf 'teste concluído\\n'\nping 127.0.0.1\n\n# Interrompa o ping com Ctrl+C",
            "docs": []
          },
          {
            "id": "prep-errors",
            "title": "Ler e registrar um erro com contexto",
            "minutes": 60,
            "concept": "Produzir um erro seguro, localizar a ação que falhou e registrar contexto suficiente para investigar sem adivinhar.",
            "objectives": [
              "Separar comando, mensagem de erro e hipótese inicial.",
              "Copiar o texto do erro sem expor senhas, tokens ou dados pessoais.",
              "Concluir a prova prática da Etapa 0 sem consultar a solução."
            ],
            "exercise": "Crie a pasta prova-etapa-zero, execute a prova prática e registre um erro de pasta inexistente com comando, local e hipótese.",
            "code": "Comando executado: cd pasta-que-nao-existe\nPasta atual antes do comando: ...\nMensagem completa: ...\nO que eu esperava: entrar na pasta\nHipótese: a pasta não existe neste local",
            "docs": []
          }
        ]
      },
      {
        "id": "prep-environments",
        "title": "Ambientes essenciais",
        "level": "Nível 0 · instalação",
        "number": "01",
        "description": "Instalação, verificação, diagnóstico e alternativas para editor, Python, Git e Node.js/npm.",
        "resources": [
          {"kind": "doc", "title": "VS Code · Configuração oficial", "url": "https://code.visualstudio.com/docs/setup/setup-overview", "language": "EN"},
          {"kind": "doc", "title": "Python · Downloads oficiais", "url": "https://www.python.org/downloads/", "language": "EN"},
          {"kind": "doc", "title": "Git · Instalação oficial", "url": "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git", "language": "EN"},
          {"kind": "doc", "title": "Node.js · Download oficial", "url": "https://nodejs.org/en/download", "language": "EN"}
        ],
        "lessons": [
          {
            "id": "setup-editor",
            "title": "Preparar o editor de código",
            "minutes": 50,
            "concept": "Instalar ou escolher um editor, abrir uma pasta e verificar o comando opcional `code` sem depender de conta.",
            "objectives": ["Instalar o VS Code por uma fonte oficial ou escolher alternativa leve.", "Abrir a pasta estudos-programacao como workspace.", "Verificar o editor e diagnosticar o comando `code` ausente."],
            "exercise": "Abra uma pasta, crie ambiente-editor.txt, salve, feche e retome o trabalho pelo mesmo caminho.",
            "code": "code --version\ncode .",
            "docs": [{"kind": "doc", "title": "VS Code · Primeiros passos", "url": "https://code.visualstudio.com/docs/getstarted/overview", "language": "EN"}]
          },
          {
            "id": "setup-python",
            "title": "Instalar e verificar Python 3",
            "minutes": 60,
            "concept": "Instalar Python 3, identificar o comando do sistema e executar uma verificação mínima antes da trilha Python.",
            "objectives": ["Instalar uma versão estável de Python 3 pela fonte adequada ao sistema.", "Distinguir `py`, `python` e `python3` sem adivinhar.", "Executar um arquivo simples e diagnosticar falha de PATH."],
            "exercise": "Registre o comando reconhecido, a versão observada e a saída de um arquivo verificar_python.py.",
            "code": "# Windows\npy --version\n# macOS/Linux\npython3 --version",
            "docs": [{"kind": "doc", "title": "Python · Usando Python nos sistemas", "url": "https://docs.python.org/3/using/index.html", "language": "EN"}]
          },
          {
            "id": "setup-git",
            "title": "Instalar e verificar Git",
            "minutes": 55,
            "concept": "Instalar Git, verificar o executável, criar um repositório de laboratório e separar histórico local de publicação remota.",
            "objectives": ["Instalar Git pela fonte oficial ou gerenciador da distribuição.", "Confirmar `git --version` em um terminal novo.", "Criar o primeiro repositório em uma pasta de laboratório e reconhecer a pasta `.git`."],
            "exercise": "Crie laboratorio-git, inicialize o repositório, registre a saída de `git status` e explique por que ele ainda não foi publicado.",
            "code": "git --version\nmkdir laboratorio-git\ncd laboratorio-git\ngit init\ngit status",
            "docs": [{"kind": "doc", "title": "Pro Git · Instalando Git", "url": "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git", "language": "EN"}]
          },
          {
            "id": "setup-node",
            "title": "Instalar Node.js e npm",
            "minutes": 60,
            "concept": "Instalar a linha LTS do Node.js, verificar Node e npm e distingui-los do JavaScript executado no navegador.",
            "objectives": ["Instalar uma versão LTS do Node.js por fonte oficial.", "Confirmar separadamente `node` e `npm`.", "Executar um script local e explicar a diferença para o navegador."],
            "exercise": "Registre as duas versões e execute verificar_node.js pelo terminal na pasta correta.",
            "code": "node --version\nnpm --version\nnode verificar_node.js",
            "docs": [{"kind": "doc", "title": "Node.js · Downloads", "url": "https://nodejs.org/en/download", "language": "EN"}]
          }
        ]
      }
    ]
  },
  {
    "id": "html",
    "title": "HTML & CSS",
    "subtitle": "Dê forma às suas ideias.",
    "icon": "code",
    "color": "#fb997b",
    "range": "Base completa → Layouts aplicados",
    "description": "Aprenda HTML e CSS do zero, pratique com apoio progressivo e comprove sua aplicação em três projetos.",
    "prerequisite": "Recomendado: conclua a Etapa 0 para praticar criação de arquivos, editor, navegador e erros. Nenhuma linguagem anterior é necessária.",
    "project": "Clube de estudos semântico, versão estilizada e portfólio responsivo com critérios verificáveis.",
    "modules": [
      {
        "id": "html-basic",
        "title": "HTML essencial e acessibilidade",
        "level": "Básico · estrutura",
        "number": "01",
        "description": "Elementos, atributos, caminhos, imagens, formulários, tabelas e navegação acessível.",
        "resources": [
          {
            "kind": "doc",
            "title": "MDN · Índice de elementos e tags HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Índice de atributos HTML",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Atributos globais: id, class, lang e outros",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Guia de aprendizagem HTML",
            "url": "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "W3Schools · Catálogo de tags com exemplos",
            "url": "https://www.w3schools.com/tags/default.asp",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "W3Schools · Catálogo de atributos",
            "url": "https://www.w3schools.com/tags/ref_attributes.asp",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Estruturando o conteúdo com HTML",
            "url": "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "W3Schools · HTML com exemplos interativos",
            "url": "https://www.w3schools.com/html/",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Apostilas gratuitas de HTML5 e CSS3 · Guanabara",
            "url": "https://github.com/gustavoguanabara/html-css/tree/master/aulas-pdf",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Seu primeiro código HTML · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=E6CdIawPTh0",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "html-semantic",
            "title": "HTML do zero: documento, elementos e semântica",
            "minutes": 90,
            "concept": "Construa um documento HTML legível e válido, distinguindo tags, elementos, atributos e regiões semânticas.",
            "objectives": [
              "Criar e abrir um documento HTML completo com idioma e metadados.",
              "Distinguir tag, elemento e atributo e produzir aninhamento válido.",
              "Organizar texto, títulos e listas pelo significado."
            ],
            "exercise": "Construir: em outro arquivo completo, apresente sua rotina de estudos com título de aba, h1, duas seções h2, um parágrafo em cada e três passos em ol. Não copie o corpo do exemplo.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Clube de estudos — início\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\n  \u003ch1>Clube de estudos\u003c/h1>\n  \u003cp>Aprendemos construindo pequenas páginas.\u003c/p>\n\u003c/header>\n\u003cmain>\n  \u003csection>\n    \u003ch2>Nosso primeiro encontro\u003c/h2>\n    \u003cp>O encontro será \u003cstrong>gratuito\u003c/strong>. Traga \u003cem>seu próprio\u003c/em> caderno.\u003c/p>\n    \u003ch3>O que levar\u003c/h3>\n    \u003cul>\u003cli>Caderno\u003c/li>\u003cli>Lápis\u003c/li>\u003c/ul>\n    \u003ch3>Como participar\u003c/h3>\n    \u003col>\u003cli>Leia os horários.\u003c/li>\u003cli>Escolha um encontro.\u003c/li>\u003c/ol>\n    \u003cp>No código, escrevemos &lt;p&gt; para iniciar um parágrafo.\u003c/p>\n  \u003c/section>\n  \u003c!-- Uma nota para quem mantém o arquivo; não contém dados secretos. -->\n\u003c/main>\n\u003cfooter>\u003cp>Clube de estudos — edição de outubro.\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Referência de elementos",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Referência de atributos",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Atributos globais",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes",
                "language": "EN"
              }
            ]
          },
          {
            "id": "html-links-media",
            "title": "Links, caminhos, imagens e mídia",
            "minutes": 90,
            "concept": "Conecte páginas e arquivos, escolha textos de link claros e publique imagens com alternativas adequadas.",
            "objectives": [
              "Resolver caminhos relativos, absolutos e fragmentos.",
              "Criar imagens com dimensões e alternativa textual significativa.",
              "Reconhecer os recursos básicos e as alternativas de áudio e vídeo."
            ],
            "exercise": "Construir: crie duas páginas, início e encontros, com links de ida e volta. Na página encontros coloque uma figura local, legenda e uma seção com id para um link interno.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Clube — links e imagens\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Conheça o clube\u003c/h1>\n\u003cnav>\u003ca href=\"#agenda\">Ir à agenda\u003c/a> · \u003ca href=\"sobre.html\">Sobre nós\u003c/a>\u003c/nav>\u003c/header>\n\u003cmain>\n  \u003csection>\u003ch2>Nosso espaço\u003c/h2>\n    \u003cfigure>\n      \u003cimg src=\"sala.svg\" width=\"320\" height=\"180\" alt=\"Mesa central com quatro cadeiras para trabalho em grupo\">\n      \u003cfigcaption>Organização prevista para os encontros presenciais.\u003c/figcaption>\n    \u003c/figure>\n    \u003cp>Confira a \u003ca href=\"https://developer.mozilla.org/pt-BR/\">documentação MDN sobre desenvolvimento web\u003c/a>.\u003c/p>\n  \u003c/section>\n  \u003csection id=\"agenda\">\u003ch2>Agenda\u003c/h2>\u003cp>Encontro aos sábados, às 10h.\u003c/p>\u003c/section>\n\u003c/main>\n\u003cfooter>\u003cp>\u003ca href=\"mailto:contato@example.com\">Escrever para o clube (endereço demonstrativo)\u003c/a>\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Elemento a",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Elemento img",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Elemento video",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video",
                "language": "EN"
              }
            ]
          },
          {
            "id": "html-forms",
            "title": "Formulários: campos, acessibilidade e validação",
            "minutes": 90,
            "concept": "Colete dados com controles nativos, rótulos explícitos e restrições coerentes, entendendo os limites do HTML.",
            "objectives": [
              "Relacionar label, id, name e value sem confundir seus papéis.",
              "Escolher controles e testar restrições nativas.",
              "Explicar GET, POST e por que validação no navegador não é armazenamento nem segurança de servidor."
            ],
            "exercise": "Construir: crie um formulário de pedido de ajuda com assunto obrigatório, e-mail obrigatório e mensagem de pelo menos 20 caracteres. Avise que é uma demonstração e use dados fictícios.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Inscrição demonstrativa\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Inscrição no clube\u003c/h1>\u003c/header>\n\u003cmain>\n  \u003cp>Laboratório: nenhum cadastro é armazenado. Use dados fictícios.\u003c/p>\n  \u003cform action=\"#resultado\" method=\"get\">\n    \u003cfieldset>\u003clegend>Seus dados\u003c/legend>\n      \u003cp>\u003clabel for=\"nome\">Nome (obrigatório)\u003c/label>\n      \u003cinput id=\"nome\" name=\"nome\" type=\"text\" autocomplete=\"name\" minlength=\"2\" required>\u003c/p>\n      \u003cp>\u003clabel for=\"email\">E-mail (obrigatório)\u003c/label>\n      \u003cinput id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" required>\u003c/p>\n    \u003c/fieldset>\n    \u003cfieldset>\u003clegend>Preferências\u003c/legend>\n      \u003cp>\u003clabel for=\"turno\">Turno\u003c/label>\n      \u003cselect id=\"turno\" name=\"turno\">\u003coption value=\"manha\">Manhã\u003c/option>\u003coption value=\"tarde\">Tarde\u003c/option>\u003c/select>\u003c/p>\n      \u003cp>Modalidade:\u003c/p>\n      \u003cp>\u003cinput id=\"online\" name=\"modalidade\" type=\"radio\" value=\"online\" checked>\u003clabel for=\"online\">On-line\u003c/label>\n      \u003cinput id=\"presencial\" name=\"modalidade\" type=\"radio\" value=\"presencial\">\u003clabel for=\"presencial\">Presencial\u003c/label>\u003c/p>\n      \u003cp>\u003clabel for=\"objetivo\">O que deseja aprender?\u003c/label>\n      \u003ctextarea id=\"objetivo\" name=\"objetivo\" rows=\"4\" maxlength=\"300\">\u003c/textarea>\u003c/p>\n      \u003cp>\u003cinput id=\"lembrete\" name=\"lembrete\" type=\"checkbox\" value=\"sim\">\u003clabel for=\"lembrete\">Quero receber lembrete\u003c/label>\u003c/p>\n    \u003c/fieldset>\n    \u003cbutton type=\"submit\">Testar envio local\u003c/button>\n  \u003c/form>\n  \u003csection id=\"resultado\">\u003ch2>Sobre este teste\u003c/h2>\u003cp>O envio GET pode aparecer na URL; nenhum cadastro real é criado.\u003c/p>\u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Elemento form",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Tipos e atributos de input",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Validação de formulários",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
                "language": "EN"
              }
            ]
          },
          {
            "id": "html-tables",
            "title": "Tabelas: relações, cabeçalhos e dados claros",
            "minutes": 90,
            "concept": "Apresente dados tabulares com título, unidades e cabeçalhos associados, sem usar tabelas para montar o layout.",
            "objectives": [
              "Distinguir dados tabulares de listas e layouts.",
              "Construir caption, grupos de linhas e cabeçalhos scope.",
              "Verificar coerência das células e dos totais."
            ],
            "exercise": "Construir: crie uma página completa com uma tabela de três encontros, contendo dia, tema e duração em minutos. Inclua caption, cabeçalhos e uma nota dizendo se os horários são fictícios.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Agenda do clube\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Planeje seus estudos\u003c/h1>\u003c/header>\n\u003cmain>\n  \u003cp>A tabela compara as horas semanais previstas para cada tema.\u003c/p>\n  \u003ctable>\n    \u003ccaption>Plano semanal — horas de estudo\u003c/caption>\n    \u003cthead>\u003ctr>\u003cth scope=\"col\">Tema\u003c/th>\u003cth scope=\"col\">Teoria (h)\u003c/th>\u003cth scope=\"col\">Prática (h)\u003c/th>\u003c/tr>\u003c/thead>\n    \u003ctbody>\n      \u003ctr>\u003cth scope=\"row\">HTML\u003c/th>\u003ctd>2\u003c/td>\u003ctd>3\u003c/td>\u003c/tr>\n      \u003ctr>\u003cth scope=\"row\">CSS\u003c/th>\u003ctd>2\u003c/td>\u003ctd>4\u003c/td>\u003c/tr>\n    \u003c/tbody>\n    \u003ctfoot>\u003ctr>\u003cth scope=\"row\">Total\u003c/th>\u003ctd>4\u003c/td>\u003ctd>7\u003c/td>\u003c/tr>\u003c/tfoot>\n  \u003c/table>\n  \u003cp>Os totais foram calculados manualmente; HTML não faz a soma.\u003c/p>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Elemento table",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Elemento th e scope",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Elemento caption",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption",
                "language": "EN"
              }
            ]
          },
          {
            "id": "html-accessibility",
            "title": "Acessibilidade, teclado e revisão do HTML",
            "minutes": 90,
            "concept": "Revise estrutura, nomes, instruções e navegação para construir uma base utilizável por mais pessoas.",
            "objectives": [
              "Diferenciar nome acessível, descrição e função de controles.",
              "Testar teclado, ordem de foco e controles nativos.",
              "Registrar limitações de verificações automáticas e corrigir problemas observáveis."
            ],
            "exercise": "Construir: faça uma página de perguntas frequentes com h1, duas seções h2 e ao menos três detalhes expansíveis. Inclua atalho para main e navegação por fragmentos. Execute uma revisão somente com teclado.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Clube — página acessível\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003ca href=\"#conteudo\">Pular para o conteúdo principal\u003c/a>\n\u003cheader>\u003ch1>Clube de estudos\u003c/h1>\n  \u003cnav aria-label=\"Principal\">\u003ca href=\"#encontros\">Encontros\u003c/a> · \u003ca href=\"#duvidas\">Dúvidas\u003c/a>\u003c/nav>\n\u003c/header>\n\u003cmain id=\"conteudo\" tabindex=\"-1\">\n  \u003csection id=\"encontros\">\u003ch2>Encontros\u003c/h2>\u003cp>Atividades gratuitas para iniciantes.\u003c/p>\n    \u003ch3>Primeiro encontro\u003c/h3>\u003cp>Traga um caderno. Não é necessário conhecimento prévio.\u003c/p>\n  \u003c/section>\n  \u003csection id=\"duvidas\">\u003ch2>Dúvidas frequentes\u003c/h2>\n    \u003cdetails>\u003csummary>Preciso instalar algum programa?\u003c/summary>\u003cp>Para esta etapa, basta um editor de texto e um navegador.\u003c/p>\u003c/details>\n    \u003cdetails>\u003csummary>Como testar a navegação por teclado?\u003c/summary>\u003cp>Use Tab para avançar, Shift + Tab para voltar e Enter para ativar um link.\u003c/p>\u003c/details>\n  \u003c/section>\n  \u003csection>\u003ch2>Solicitar informações\u003c/h2>\u003cp>Demonstração sem envio real.\u003c/p>\n    \u003cform action=\"#aviso\" method=\"get\">\n      \u003clabel for=\"contato\">E-mail fictício (obrigatório)\u003c/label>\n      \u003cinput id=\"contato\" name=\"contato\" type=\"email\" aria-describedby=\"orientacao\" required>\n      \u003cp id=\"orientacao\">Use um endereço de exemplo, como ana@example.com.\u003c/p>\n      \u003cbutton type=\"submit\">Testar formulário\u003c/button>\n    \u003c/form>\n    \u003cp id=\"aviso\">Nenhuma mensagem foi enviada por este laboratório.\u003c/p>\n  \u003c/section>\n\u003c/main>\n\u003cfooter>\u003cp>Conteúdo de estudo para iniciantes.\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Acessibilidade e HTML",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Elemento details",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Atributo tabindex",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · ARIA: orientação e referência",
                "url": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "css-foundations",
        "title": "Fundamentos de CSS",
        "level": "Básico · apresentação",
        "number": "02",
        "description": "Cascata, seletores, caixas, unidades, tipografia, estados e depuração.",
        "resources": [
          {
            "kind": "doc",
            "title": "MDN · Índice de propriedades, seletores e valores CSS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Seletores CSS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Valores e unidades CSS",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Ferramentas de desenvolvimento do navegador",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "W3Schools · Referência de propriedades CSS",
            "url": "https://www.w3schools.com/cssref/index.php",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Referência e guias de CSS",
            "url": "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "W3Schools · CSS com exemplos interativos",
            "url": "https://www.w3schools.com/css/",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Apostilas gratuitas de HTML5 e CSS3 · Guanabara",
            "url": "https://github.com/gustavoguanabara/html-css/tree/master/aulas-pdf",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "CSS Grid Layout e Flexbox · Origamid",
            "url": "https://www.youtube.com/watch?v=x-4z_u8LcGc",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Desvendando o CSS Grid na prática · Rocketseat",
            "url": "https://www.youtube.com/watch?v=HN1UjzRSdBk",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "css-cascade",
            "title": "CSS: regras, seletores e cascata",
            "minutes": 90,
            "concept": "CSS transforma uma estrutura HTML em uma apresentação visual. Nesta aula você aprende a escolher elementos e descobrir por que uma regra venceu outra, em vez de tentar corrigir o resultado adicionando propriedades ao acaso.",
            "objectives": [
              "Vincular uma folha de estilos e escrever declarações válidas.",
              "Selecionar elementos por tipo, classe, atributo e relação.",
              "Explicar conflitos simples de cascata, especificidade e herança.",
              "Investigar estilos aplicados com as ferramentas do navegador."
            ],
            "exercise": "Separe os estilos em estilos.css sem mudar a aparência e diagnostique um caminho propositalmente errado.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>CSS: regras, seletores e cascata\u003c/title>\n\u003cstyle>\nbody { color: #24324a; font-family: sans-serif; line-height: 1.6; margin: 2rem; }\np { color: #334155; }\n.aviso { color: #9f1239; }\n.painel { border: 2px solid #64748b; padding: 1rem; }\n.painel > p { font-weight: 700; }\n.aviso { color: #166534; }\na[href^=\"#\"] { text-decoration-thickness: 2px; }\nh2 + p { background: #f1f5f9; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain class=\"painel\">\n  \u003ch1>Clube de estudos\u003c/h1>\n  \u003cp class=\"aviso\">Inscrições abertas\u003c/p>\n  \u003csection>\n    \u003ch2 id=\"agenda\">Agenda\u003c/h2>\n    \u003cp>Encontro toda terça-feira.\u003c/p>\n  \u003c/section>\n  \u003ca href=\"#agenda\">Consultar agenda\u003c/a>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Referência de seletores",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Cascata",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Especificidade",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Referência de CSS",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference",
                "language": "EN"
              }
            ]
          },
          {
            "id": "css-box",
            "title": "Caixas, dimensões e fluxo do documento",
            "minutes": 90,
            "concept": "Todo layout visual combina caixas. Aprender a medir conteúdo, preenchimento, borda e espaço externo evita correções por tentativa e permite explicar por que um elemento cabe, transborda ou empurra outro.",
            "objectives": [
              "Calcular a largura ocupada com content-box e border-box.",
              "Distinguir margin, padding e border.",
              "Escolher display, dimensões e overflow sem esconder conteúdo.",
              "Inspecionar o modelo de caixa e preservar o fluxo de leitura."
            ],
            "exercise": "Construa um cartão de leitura com título, etiqueta e três parágrafos. Ele deve caber numa janela de 320px, limitar-se a 36rem e não cortar texto com zoom de 200%.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Caixas, dimensões e fluxo do documento\u003c/title>\n\u003cstyle>\n*, *::before, *::after { box-sizing: border-box; }\nbody { margin: 0; padding: 1rem; font-family: sans-serif; line-height: 1.6; color: #172033; }\nmain { width: 100%; max-width: 40rem; margin-inline: auto; }\n.cartao { padding: 1.25rem; border: 2px solid #64748b; margin-block: 1rem; border-radius: .5rem; }\n.etiqueta { display: inline-block; padding: .2rem .6rem; border: 1px solid #166534; }\n.endereco { overflow-wrap: anywhere; }\npre { max-width: 100%; overflow: auto; background: #f1f5f9; padding: 1rem; }\nh1, h2 { line-height: 1.2; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Meus estudos\u003c/h1>\n  \u003carticle class=\"cartao\">\n    \u003cspan class=\"etiqueta\">Em andamento\u003c/span>\n    \u003ch2>Modelo de caixa\u003c/h2>\n    \u003cp>O cartão cresce quando o conteúdo precisa de novas linhas.\u003c/p>\n    \u003cp class=\"endereco\">referencia-muito-longa-sem-espacos-para-observar-a-quebra-em-telas-estreitas\u003c/p>\n    \u003cpre>\u003ccode>conteudo + padding + border = largura externa com border-box\u003c/code>\u003c/pre>\n  \u003c/article>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Modelo de caixa",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · box-sizing",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · overflow",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/overflow",
                "language": "EN"
              }
            ]
          },
          {
            "id": "css-typography",
            "title": "Unidades, cores e leitura confortável",
            "minutes": 90,
            "concept": "Uma interface precisa continuar legível quando o texto cresce e a tela muda. Unidades e tipografia permitem construir uma hierarquia visual sem depender de um tamanho fixo de monitor; cores precisam comunicar sem serem a única pista.",
            "objectives": [
              "Escolher px, rem, em, porcentagens e unidades de viewport conforme a intenção.",
              "Configurar fonte, altura de linha e comprimento de leitura.",
              "Criar hierarquia tipográfica sem alterar a semântica dos títulos.",
              "Usar cores com contraste e preservar links identificáveis."
            ],
            "exercise": "Crie uma página de leitura com um h1, dois h2, três parágrafos e um aviso. Preserve títulos semânticos, largura controlada, links sublinhados e leitura a 200% de zoom.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Unidades, cores e leitura confortável\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nhtml { font-size: 100%; }\nbody { margin: 0; padding: 1.25rem; font-family: system-ui, sans-serif; color: #1e293b; background: #ffffff; line-height: 1.65; }\nmain { max-width: 65ch; margin-inline: auto; }\nh1 { font-size: clamp(2rem, 1rem + 3vw, 3rem); line-height: 1.15; }\nh2 { font-size: 1.5rem; line-height: 1.25; margin-block-start: 2rem; }\np { margin-block: 1rem; }\na { color: #1d4ed8; text-underline-offset: .2em; }\n.nota { padding: 1em; background: #f1f5f9; border-inline-start: .25rem solid #475569; }\nstrong { font-weight: 700; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Aprender com constância\u003c/h1>\n  \u003cp>Uma rotina de estudo funciona melhor quando os objetivos são claros e o conteúdo pode ser lido com conforto.\u003c/p>\n  \u003ch2 id=\"rotina\">Uma rotina possível\u003c/h2>\n  \u003cp>Reserve um período curto, pratique um conceito e registre o que conseguiu fazer sem ajuda. Ajuste a dificuldade a partir desses resultados.\u003c/p>\n  \u003cp class=\"nota\">\u003cstrong>Dica:\u003c/strong> uma pausa faz parte da rotina. Não é necessário diminuir o texto para encaixar tudo na mesma tela.\u003c/p>\n  \u003ca href=\"#rotina\">Revisar a rotina\u003c/a>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Valores e unidades",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Fundamentos de texto e fonte",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Contraste de cores",
                "url": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast",
                "language": "EN"
              }
            ]
          },
          {
            "id": "css-states",
            "title": "Estados, foco, movimento e posicionamento",
            "minutes": 90,
            "concept": "Uma interface muda quando a pessoa aponta, navega com teclado ou encontra uma ação indisponível. Além desses estados, você aprenderá a posicionar elementos sem retirar do fluxo todo o conteúdo da página.",
            "objectives": [
              "Estilizar links e controles nos estados relevantes, mantendo foco visível.",
              "Aplicar transições discretas respeitando redução de movimento.",
              "Distinguir static, relative, absolute, fixed e sticky.",
              "Investigar sobreposição e z-index sem recorrer a números arbitrários."
            ],
            "exercise": "Monte um cartão de evento com selo, ação de navegação e aviso de indisponibilidade. Teste a 320px e 200% de zoom e elimine qualquer sobreposição.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Estados, foco, movimento e posicionamento\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; color: #172033; }\nheader { position: sticky; top: 0; z-index: 2; background: white; border-bottom: 1px solid #64748b; padding: .75rem 1rem; }\nmain { max-width: 42rem; margin: 2rem auto; padding: 1rem; }\n.cartao { position: relative; border: 2px solid #64748b; border-radius: .75rem; padding: 3rem 1rem 1rem; }\n.selo { position: absolute; top: .5rem; right: .5rem; padding: .2rem .6rem; background: #dbeafe; color: #1e3a8a; }\n.acao, button { display: inline-block; font: inherit; padding: .65em 1em; border: 2px solid #1e3a8a; border-radius: .4rem; background: #1e3a8a; color: white; transition: background-color 150ms ease; }\n.acao:hover, button:not(:disabled):hover { background: #172554; }\n.acao:focus-visible, button:focus-visible { outline: 3px solid #a16207; outline-offset: 4px; }\nbutton:disabled { background: #e2e8f0; color: #334155; border-color: #64748b; }\n#agenda { scroll-margin-top: 6rem; }\n@media (prefers-reduced-motion: reduce) { .acao, button { transition: none; } }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader>Clube de estudos · \u003ca href=\"#agenda\">Agenda\u003c/a>\u003c/header>\n\u003cmain>\n  \u003carticle class=\"cartao\">\n    \u003cspan class=\"selo\">Gratuito\u003c/span>\n    \u003ch1>Oficina de CSS\u003c/h1>\n    \u003cp>Pratique interfaces que funcionam com mouse, teclado e telas pequenas.\u003c/p>\n    \u003ca class=\"acao\" href=\"#agenda\">Ver agenda\u003c/a>\n    \u003cbutton type=\"button\" disabled>Inscrição encerrada\u003c/button>\n    \u003cp>As inscrições desta turma já terminaram.\u003c/p>\n  \u003c/article>\n  \u003csection id=\"agenda\">\n    \u003ch2>Agenda\u003c/h2>\n    \u003cp>Segunda-feira: fundamentos. Quarta-feira: prática orientada.\u003c/p>\n  \u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · position",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/position",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · focus-visible",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · prefers-reduced-motion",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Contexto de empilhamento",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "html-layout",
        "title": "Layouts responsivos e sistema visual",
        "level": "Aplicação · layouts",
        "number": "03",
        "description": "Flexbox, Grid, responsividade, variáveis e projeto integrador.",
        "resources": [
          {
            "kind": "doc",
            "title": "MDN · Índice de propriedades, seletores e valores CSS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Seletores CSS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Valores e unidades CSS",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Ferramentas de desenvolvimento do navegador",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "W3Schools · Referência de propriedades CSS",
            "url": "https://www.w3schools.com/cssref/index.php",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Referência e guias de CSS",
            "url": "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "W3Schools · CSS com exemplos interativos",
            "url": "https://www.w3schools.com/css/",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Apostilas gratuitas de HTML5 e CSS3 · Guanabara",
            "url": "https://github.com/gustavoguanabara/html-css/tree/master/aulas-pdf",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "CSS Grid Layout e Flexbox · Origamid",
            "url": "https://www.youtube.com/watch?v=x-4z_u8LcGc",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Desvendando o CSS Grid na prática · Rocketseat",
            "url": "https://www.youtube.com/watch?v=HN1UjzRSdBk",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "css-flex",
            "title": "Flexbox: distribuição, alinhamento e quebra",
            "minutes": 90,
            "concept": "Flexbox organiza itens ao longo de uma direção principal. Ele é especialmente útil para barras de navegação, ações e componentes cujo conteúdo varia. Você vai prever o comportamento em vez de decorar uma combinação para centralizar tudo.",
            "objectives": [
              "Identificar contêiner, itens e eixos de um layout flex.",
              "Alinhar e distribuir espaço usando justify-content, align-items e gap.",
              "Controlar crescimento, redução, base e quebra de linha.",
              "Preservar a ordem lógica e lidar com conteúdo extenso."
            ],
            "exercise": "Crie uma barra com marca, quatro links e uma mensagem de contato. Ela deve quebrar naturalmente, manter a ordem de leitura e funcionar com Tab em 320px.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Flexbox: distribuição, alinhamento e quebra\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; line-height: 1.6; color: #172033; }\nheader { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-bottom: 2px solid #64748b; padding-block: 1rem; }\nnav ul { display: flex; flex-wrap: wrap; gap: .75rem; padding: 0; margin: 0; list-style: none; }\na { color: #1d4ed8; }\na:focus-visible { outline: 3px solid #a16207; outline-offset: 3px; }\nmain { max-width: 65rem; margin: 2rem auto; }\n.cartoes { display: flex; flex-wrap: wrap; gap: 1rem; }\n.cartao { flex: 1 1 15rem; min-width: 0; padding: 1rem; border: 2px solid #64748b; border-radius: .5rem; overflow-wrap: anywhere; }\nh2 { line-height: 1.25; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader>\n  \u003cstrong>Clube de estudos\u003c/strong>\n  \u003cnav aria-label=\"Principal\">\u003cul>\n    \u003cli>\u003ca href=\"#trilhas\">Trilhas\u003c/a>\u003c/li>\n    \u003cli>\u003ca href=\"#html\">HTML\u003c/a>\u003c/li>\n    \u003cli>\u003ca href=\"#css\">CSS\u003c/a>\u003c/li>\n  \u003c/ul>\u003c/nav>\n\u003c/header>\n\u003cmain>\n  \u003ch1 id=\"trilhas\">Escolha sua próxima prática\u003c/h1>\n  \u003cdiv class=\"cartoes\">\n    \u003carticle class=\"cartao\" id=\"html\">\u003ch2>HTML\u003c/h2>\u003cp>Organize conteúdo semântico e formulários acessíveis.\u003c/p>\u003c/article>\n    \u003carticle class=\"cartao\" id=\"css\">\u003ch2>CSS\u003c/h2>\u003cp>Crie layouts que se adaptam ao espaço disponível sem esconder informação.\u003c/p>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Revisão\u003c/h2>\u003cp>Reconstrua um componente sem consultar a solução.\u003c/p>\u003c/article>\n  \u003c/div>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Conceitos de Flexbox",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Alinhamento em Flexbox",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · flex",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/flex",
                "language": "EN"
              }
            ]
          },
          {
            "id": "css-grid",
            "title": "CSS Grid: colunas, linhas e composição",
            "minutes": 90,
            "concept": "Grid coordena linhas e colunas de uma composição. Você vai construir uma coleção de cartões e entender trilhas, espaço disponível e limites, escolhendo entre uma grade fixa, responsiva e automática de acordo com o conteúdo.",
            "objectives": [
              "Criar um contêiner grid e dimensionar trilhas com fr, repeat e minmax.",
              "Entender colocação automática e linhas da grade.",
              "Usar auto-fit em grades que se ajustam ao contêiner.",
              "Combinar Grid e Flexbox preservando a ordem do documento."
            ],
            "exercise": "Monte seis cartões com textos variados. A coleção precisa funcionar entre 320px e uma janela larga, sem cortes ou rolagem lateral da página.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>CSS Grid: colunas, linhas e composição\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; padding: 1rem; color: #172033; font-family: system-ui, sans-serif; line-height: 1.6; }\nmain { max-width: 70rem; margin-inline: auto; }\n.grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 1rem; }\n.cartao { min-width: 0; display: flex; flex-direction: column; padding: 1rem; border: 2px solid #64748b; border-radius: .5rem; overflow-wrap: anywhere; }\n.cartao a { margin-top: auto; color: #1d4ed8; }\nh2 { line-height: 1.25; }\na:focus-visible { outline: 3px solid #a16207; outline-offset: 3px; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Biblioteca de projetos\u003c/h1>\n  \u003cdiv class=\"grade\">\n    \u003carticle class=\"cartao\">\u003ch2>Agenda\u003c/h2>\u003cp>Uma página de encontros.\u003c/p>\u003ca href=\"#criterios\">Ver critérios da agenda\u003c/a>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Catálogo\u003c/h2>\u003cp>Uma coleção de livros com descrições de tamanhos variados e categorias claras.\u003c/p>\u003ca href=\"#criterios\">Ver critérios do catálogo\u003c/a>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Portfólio\u003c/h2>\u003cp>Apresente seus trabalhos e explique decisões.\u003c/p>\u003ca href=\"#criterios\">Ver critérios do portfólio\u003c/a>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Guia\u003c/h2>\u003cp>Organize instruções de estudo.\u003c/p>\u003ca href=\"#criterios\">Ver critérios do guia\u003c/a>\u003c/article>\n  \u003c/div>\n  \u003csection id=\"criterios\">\u003ch2>Critérios gerais\u003c/h2>\u003cp>Conteúdo legível, links funcionais e navegação por teclado.\u003c/p>\u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Conceitos de Grid",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · minmax",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/minmax",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · repeat",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/repeat",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Áreas de grade",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_template_areas",
                "language": "EN"
              }
            ]
          },
          {
            "id": "css-responsive",
            "title": "Responsividade: conteúdo, viewport e testes",
            "minutes": 90,
            "concept": "Uma página responsiva continua utilizável em diferentes espaços, tamanhos de texto e formas de entrada. O objetivo não é imitar uma captura em três dispositivos, mas permitir que o conteúdo se reorganize sem perder informação.",
            "objectives": [
              "Configurar viewport e construir uma base mobile first.",
              "Usar medidas fluidas, limites e media queries orientadas ao conteúdo.",
              "Tratar imagens sem distorção e distinguir tamanho visual de resolução.",
              "Executar uma matriz de testes com larguras, zoom, teclado e conteúdo longo."
            ],
            "exercise": "Adapte uma página com apresentação, imagem, três cartões e área de apoio. Registre testes em 320, 600, 768 e 1280px, mais zoom 200% e teclado.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Responsividade: conteúdo, viewport e testes\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; color: #172033; background: #f8fafc; }\n.container { width: min(100% - 2rem, 70rem); margin-inline: auto; }\nheader { padding-block: 1rem; border-bottom: 1px solid #64748b; }\nnav { display: flex; flex-wrap: wrap; gap: 1rem; }\na { color: #1d4ed8; }\na:focus-visible { outline: 3px solid #a16207; outline-offset: 3px; }\n.conteudo { display: grid; gap: 1.5rem; padding-block: 2rem; }\n.conteudo > * { min-width: 0; overflow-wrap: anywhere; }\nh1 { font-size: clamp(2rem, 1rem + 3vw, 3rem); line-height: 1.2; }\nimg { display: block; max-width: 100%; height: auto; border-radius: .75rem; }\naside { padding: 1rem; background: #dbeafe; border-radius: .75rem; }\n@media (min-width: 48rem) { .conteudo { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); align-items: start; } }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003cnav class=\"container\" aria-label=\"Principal\">\u003ca href=\"#projeto\">Projeto\u003c/a>\u003ca href=\"#checklist\">Checklist\u003c/a>\u003c/nav>\u003c/header>\n\u003cmain class=\"container conteudo\">\n  \u003carticle id=\"projeto\">\n    \u003ch1>Um projeto para qualquer tela\u003c/h1>\n    \u003cimg width=\"800\" height=\"400\" alt=\"Ilustração abstrata: dois painéis azuis em um fundo claro\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Crect x='80' y='80' width='280' height='240' rx='20' fill='%231e40af'/%3E%3Crect x='420' y='80' width='300' height='240' rx='20' fill='%233b82f6'/%3E%3C/svg%3E\">\n    \u003cp>O conteúdo principal aparece primeiro. A coluna de apoio vem em seguida no documento e se posiciona ao lado apenas quando existe espaço.\u003c/p>\n  \u003c/article>\n  \u003caside id=\"checklist\" aria-labelledby=\"titulo-checklist\">\n    \u003ch2 id=\"titulo-checklist\">Antes de concluir\u003c/h2>\n    \u003cul>\u003cli>Teste uma janela estreita.\u003c/li>\u003cli>Amplie a página.\u003c/li>\u003cli>Navegue com teclado.\u003c/li>\u003c/ul>\n  \u003c/aside>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Design responsivo",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Media queries",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Imagens responsivas",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Meta viewport",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag",
                "language": "EN"
              }
            ]
          },
          {
            "id": "css-variables",
            "title": "Variáveis CSS, temas e organização de estilos",
            "minutes": 90,
            "concept": "Uma identidade visual consistente exige escolhas reutilizáveis. Propriedades personalizadas permitem nomear cores e espaços pela função, mudar regiões da interface e manter componentes compreensíveis sem espalhar valores repetidos.",
            "objectives": [
              "Declarar custom properties e consumi-las com var.",
              "Entender escopo, herança e fallback sem confundir com validação de qualquer valor.",
              "Organizar tokens e componentes com nomes pela função.",
              "Revisar contraste, foco e responsividade após mudanças de tema."
            ],
            "exercise": "Extraia os valores recorrentes de seu portfólio para tokens e crie uma variação de tema. Faça uma revisão funcional completa após a troca.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Variáveis CSS, temas e organização de estilos\u003c/title>\n\u003cstyle>\n:root { --cor-fundo: #ffffff; --cor-texto: #172033; --cor-painel: #f1f5f9; --cor-borda: #64748b; --cor-link: #1d4ed8; --cor-foco: #a16207; --espaco: 1rem; --raio: .75rem; }\n* { box-sizing: border-box; }\nbody { margin: 0; padding: var(--espaco); background: var(--cor-fundo); color: var(--cor-texto); font-family: system-ui, sans-serif; line-height: 1.6; }\nmain { max-width: 60rem; margin-inline: auto; }\n.grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); gap: var(--espaco); }\n.card { padding: calc(var(--espaco) * 1.5); background: var(--cor-painel); color: var(--cor-texto); border: 2px solid var(--cor-borda); border-radius: var(--raio, .5rem); }\n.card a { color: var(--cor-link); }\n.card a:focus-visible { outline: 3px solid var(--cor-foco); outline-offset: 3px; }\n.tema-noite { --cor-texto: #f1f5f9; --cor-painel: #172033; --cor-borda: #94a3b8; --cor-link: #93c5fd; --cor-foco: #facc15; }\nh2 { line-height: 1.25; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Uma estrutura, dois temas\u003c/h1>\n  \u003cdiv class=\"grade\">\n    \u003carticle class=\"card\">\u003ch2>Tema claro\u003c/h2>\u003cp>O componente utiliza os tokens herdados da raiz.\u003c/p>\u003ca href=\"#revisao\">Revisar tema claro\u003c/a>\u003c/article>\n    \u003carticle class=\"card tema-noite\">\u003ch2>Tema escuro\u003c/h2>\u003cp>A região redefine cores sem duplicar a estrutura do cartão.\u003c/p>\u003ca href=\"#revisao\">Revisar tema escuro\u003c/a>\u003c/article>\n  \u003c/div>\n  \u003csection id=\"revisao\">\u003ch2>Revisão\u003c/h2>\u003cp>Confira contraste, foco, espaçamento e leitura em cada tema.\u003c/p>\u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Propriedades personalizadas",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · var",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/var",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · calc",
                "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/calc",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Organização de CSS",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Organizing",
                "language": "EN"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "javascript",
    "title": "JavaScript",
    "subtitle": "Dê vida à experiência.",
    "icon": "bolt",
    "color": "#e9ca72",
    "range": "Fundamentos → Aplicações no navegador",
    "description": "Construa uma base em JavaScript, depure problemas e aplique DOM, persistência e operações assíncronas em três projetos.",
    "prerequisite": "Conclua a Etapa 0. HTML básico é recomendado no início e obrigatório antes das aulas de DOM e eventos.",
    "project": "Uma lista de tarefas com filtros, persistência local e consulta a uma API pública.",
    "modules": [
      {
        "id": "js-basic",
        "title": "Linguagem e resolução de problemas",
        "level": "Básico · fundamentos",
        "number": "01",
        "description": "Valores, controle, funções, coleções, ES6 e depuração.",
        "resources": [
          {
            "kind": "doc",
            "title": "MDN · Guia da linguagem",
            "url": "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "MDN · Referência: tipos, operadores e métodos",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "JavaScript.info · Tutorial e consulta",
            "url": "https://javascript.info/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · APIs do navegador e eventos",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Eloquent JavaScript · Marijn Haverbeke",
            "url": "https://eloquentjavascript.net/",
            "language": "EN"
          },
          {
            "kind": "video",
            "title": "Criando o seu primeiro script · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=OmmJBfcMJA8",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Introdução ao DOM · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=WWZX8RWLxIk",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Async / Await e APIs · Hashtag Programação",
            "url": "https://www.youtube.com/watch?v=dEqo8xwGaD0",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "js-values",
            "title": "JavaScript do zero: execução, valores e conversões",
            "minutes": 110,
            "concept": "Execute um programa no navegador e diferencie números, textos, valores lógicos e ausência de dados antes de calcular.",
            "objectives": [
              "Executar um script e acompanhar saída e erros no Console.",
              "Escolher const ou let e identificar tipos de valores.",
              "Converter entradas explicitamente e comparar sem coerção acidental."
            ],
            "exercise": "Construir: uma meta é estudar 120 minutos. Você estudou \"35\" minutos de manhã e \"25\" à noite. Calcule o total, quanto falta e se a meta já foi atingida. Mostre os três resultados.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>JavaScript do zero: execução, valores e conversões\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>JavaScript do zero: execução, valores e conversões\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst produto = \"Caderno\";\nconst precoCentavos = 1250;\nconst entradaQuantidade = \"3\";\nconst quantidade = Number(entradaQuantidade);\nconst totalCentavos = precoCentavos * quantidade;\nlet visitas = 0;\nvisitas = visitas + 1;\nconst mensagem = `${produto}: ${quantidade} unidades\nTotal: ${totalCentavos} centavos\nVisitas: ${visitas}`;\ndocument.getElementById(\"saida\").textContent = mensagem;\nconsole.log(quantidade, typeof quantidade);\nconsole.log(\"3\" === 3, Number(\"3\") === 3);\nconsole.log(Number.isNaN(Number(\"três\")));\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Gramática e tipos",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Expressões e operadores",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Referência JavaScript",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-flow",
            "title": "Decisões, limites e repetições",
            "minutes": 110,
            "concept": "Traduza regras em condições e repita operações com limites que você consegue explicar e testar.",
            "objectives": [
              "Construir decisões com if/else e operadores lógicos.",
              "Usar for e while com início, condição e atualização definidos.",
              "Testar limites e evitar laços infinitos ou contagens duplicadas."
            ],
            "exercise": "Construir: crie um relatório dos dias 1 a 7. Dias 6 e 7 mostram Descanso; os demais mostram Estudo. Ao fim mostre o total de dias de estudo. Use um laço e condições.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Decisões, limites e repetições\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Decisões, limites e repetições\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst entrada = \"3\";\nconst sessoes = Number(entrada);\nconst minutosPorSessao = 20;\nlet relatorio = \"\";\nif (entrada.trim() === \"\" || !Number.isInteger(sessoes) || sessoes \u003c 1 || sessoes > 7) {\n  relatorio = \"Informe de 1 a 7 sessões inteiras.\";\n} else {\n  let total = 0;\n  for (let dia = 1; dia \u003c= sessoes; dia += 1) {\n    total += minutosPorSessao;\n    relatorio += `Dia ${dia}: acumulado de ${total} minutos\n`;\n  }\n  if (total >= 60) {\n    relatorio += \"Meta de 60 minutos atingida.\";\n  } else {\n    relatorio += `Faltam ${60 - total} minutos para a meta.`;\n  }\n}\ndocument.getElementById(\"saida\").textContent = relatorio;\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Controle de fluxo",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Laços e iteração",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-functions",
            "title": "Funções, contratos, escopo e closures",
            "minutes": 110,
            "concept": "Organize cálculos em funções pequenas, distinguindo entradas, retorno, apresentação e memória de uma closure.",
            "objectives": [
              "Declarar e chamar funções com parâmetros e retorno explícito.",
              "Distinguir variáveis locais de dependências externas.",
              "Construir uma função pura e compreender uma closure simples."
            ],
            "exercise": "Construir: escreva minutosRestantes(meta, estudado). Aceite apenas números finitos não negativos. Retorne null para inválidos, zero quando a meta foi alcançada e a diferença nos demais casos. Teste (60,20), (60,80), (-1,20) e (60,\"20\").",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Funções, contratos, escopo e closures\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Funções, contratos, escopo e closures\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nfunction calcularSubtotal(precoCentavos, quantidade) {\n  if (!Number.isInteger(precoCentavos) || !Number.isInteger(quantidade)) { return null; }\n  if (precoCentavos \u003c 0 || quantidade \u003c 0) { return null; }\n  return precoCentavos * quantidade;\n}\nfunction apresentarSubtotal(total) {\n  if (total === null) { return \"Dados inválidos.\"; }\n  return `Subtotal: ${total} centavos`;\n}\nconst subtotal = calcularSubtotal(1200, 2);\ndocument.getElementById(\"saida\").textContent = apresentarSubtotal(subtotal);\nconsole.log(calcularSubtotal(1200, 0));\nconsole.log(calcularSubtotal(-1, 2));\nfunction criarContador() {\n  let valor = 0;\n  return function () { valor += 1; return valor; };\n}\nconst contar = criarContador();\nconst outro = criarContador();\nconsole.log(contar(), contar(), outro());\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Funções",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Closures",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-arrays",
            "title": "Arrays, objetos e transformação de dados",
            "minutes": 110,
            "concept": "Modele uma coleção, transforme dados sem mutações acidentais e escolha o método adequado para cada pergunta.",
            "objectives": [
              "Representar registros com objetos e coleções com arrays.",
              "Distinguir referência compartilhada de cópia e mutação.",
              "Aplicar map, filter, find, reduce e ordenação com entradas vazias."
            ],
            "exercise": "Construir: crie um array com três sessões: HTML 30 minutos, CSS 45 e JS 20. Filtre as de pelo menos 30 minutos, some apenas essas durações e apresente seus nomes e o total. O array original deve continuar com três itens.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Arrays, objetos e transformação de dados\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Arrays, objetos e transformação de dados\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst produtos = [\n  { id: 1, nome: \"Caderno\", preco: 1200 },\n  { id: 2, nome: \"Caneta\", preco: 300 },\n  { id: 3, nome: \"Pasta\", preco: 800 }\n];\nconst baratos = produtos.filter(function (item) { return item.preco \u003c= 800; });\nconst nomes = baratos.map(function (item) { return item.nome; });\nconst total = produtos.reduce(function (soma, item) { return soma + item.preco; }, 0);\nconst encontrado = produtos.find(function (item) { return item.id === 2; });\nconst ordenados = produtos.slice().sort(function (a, b) { return a.preco - b.preco; });\nconst ordem = ordenados.map(function (item) { return item.nome; });\nlet busca = \"Não encontrado\";\nif (encontrado !== undefined) { busca = encontrado.nome; }\ndocument.getElementById(\"saida\").textContent = `Até 800: ${nomes.join(\", \")}\nTotal: ${total}\nBusca: ${busca}\nOrdem: ${ordem.join(\", \")}`;\nconsole.log(\"Original:\", produtos[0].nome);\nconsole.log([].reduce(function (soma, valor) { return soma + valor; }, 0));\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Coleções indexadas",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Referência Array",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Trabalhando com objetos",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-es6",
            "title": "JavaScript moderno: funções curtas e dados opcionais",
            "minutes": 110,
            "concept": "Leia e escreva arrow functions, destructuring e spread sem confundir concisão com alteração de comportamento.",
            "objectives": [
              "Usar arrow functions com retorno explícito ou implícito.",
              "Extrair e copiar dados com destructuring, rest e spread.",
              "Tratar propriedades opcionais sem apagar zero, false ou texto vazio legítimos."
            ],
            "exercise": "Construir: dado aluno = {nome:\"Bia\", plano:{minutos:30}}, crie outro objeto com minutos 45 sem alterar aluno. Acrescente uma sessão de 15 ao array [20,30] sem alterá-lo. Mostre as duas versões.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>JavaScript moderno: funções curtas e dados opcionais\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>JavaScript moderno: funções curtas e dados opcionais\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nconst perfil = { nome: \"Ana\", meta: 0, preferencias: { tema: \"escuro\" } };\nconst sessoes = [{ titulo: \"HTML\", minutos: 30 }, { titulo: \"CSS\", minutos: 45 }];\nconst { nome: nomeExibido } = perfil;\nconst atualizado = {\n  ...perfil,\n  preferencias: { ...perfil.preferencias, tema: \"claro\" }\n};\nconst linhas = sessoes.map(({ titulo, minutos }) => `${titulo}: ${minutos} min`);\nconst total = sessoes.reduce((soma, { minutos }) => soma + minutos, 0);\nconst email = perfil.contato?.email ?? \"Não informado\";\nconst meta = perfil.meta ?? 30;\ndocument.getElementById(\"saida\").textContent = `${nomeExibido}\n${linhas.join(\"\\n\")}\nTotal: ${total}\nMeta: ${meta}\nE-mail: ${email}`;\nconsole.log(perfil.preferencias.tema, atualizado.preferencias.tema);\nconsole.log(perfil.meta || 30, perfil.meta ?? 30);\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Arrow functions",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Destructuring",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Optional chaining",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Nullish coalescing",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-debug",
            "title": "Depuração, erros e testes de regras",
            "minutes": 110,
            "concept": "Investigue a causa de um defeito, defina contratos verificáveis e crie testes que realmente possam falhar.",
            "objectives": [
              "Distinguir erros de sintaxe, execução e lógica.",
              "Usar Console, breakpoints e inspeção de variáveis.",
              "Escrever testes para casos comuns, limites e entradas inválidas."
            ],
            "exercise": "Construir: implemente dividir(a,b) para números finitos, recusando divisor zero com RangeError e outros dados inválidos com TypeError. Teste 10/2, 0/2, divisor zero e entrada \"10\".",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Depuração, erros e testes de regras\u003c/title>\n\u003c/head>\n\u003cbody>\n  \u003ch1>Depuração, erros e testes de regras\u003c/h1>\n  \u003cpre id=\"saida\" aria-label=\"Resultados do programa\">\u003c/pre>\n  \u003cscript>\n\"use strict\";\nfunction media(notas) {\n  if (!Array.isArray(notas)) { throw new TypeError(\"Forneça um array.\"); }\n  if (notas.length === 0) { throw new RangeError(\"Informe ao menos uma nota.\"); }\n  for (const nota of notas) {\n    if (!Number.isFinite(nota) || nota \u003c 0 || nota > 10) {\n      throw new RangeError(\"Cada nota deve ser um número de 0 a 10.\");\n    }\n  }\n  return notas.reduce((soma, nota) => soma + nota, 0) / notas.length;\n}\nconst resultados = [];\nfunction verificar(nome, condicao) {\n  resultados.push(`${condicao ? \"PASSOU\" : \"FALHOU\"}: ${nome}`);\n  if (!condicao) { throw new Error(`Teste falhou: ${nome}`); }\n}\nfunction lancaRangeError(operacao) {\n  try { operacao(); return false; }\n  catch (erro) { return erro instanceof RangeError; }\n}\ntry {\n  verificar(\"média comum\", media([6, 8]) === 7);\n  verificar(\"nota única\", media([5]) === 5);\n  verificar(\"limites\", media([0, 10]) === 5);\n  verificar(\"lista vazia\", lancaRangeError(() => media([])));\n  verificar(\"nota inválida\", lancaRangeError(() => media([11])));\n  verificar(\"texto não convertido\", lancaRangeError(() => media([\"8\"])));\n} catch (erro) {\n  resultados.push(`Investigação necessária: ${erro.message}`);\n}\ndocument.getElementById(\"saida\").textContent = resultados.join(\"\\n\");\nconsole.assert(media([2, 4]) === 3, \"Média de 2 e 4 deveria ser 3\");\n  \u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Controle de fluxo e erros",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · console.assert",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · debugger",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "js-dom-app",
        "title": "Interfaces e persistência",
        "level": "Intermediário · interfaces",
        "number": "02",
        "description": "DOM, eventos, estado da aplicação e armazenamento local.",
        "resources": [
          {
            "kind": "doc",
            "title": "MDN · Guia da linguagem",
            "url": "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "MDN · Referência: tipos, operadores e métodos",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "JavaScript.info · Tutorial e consulta",
            "url": "https://javascript.info/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · APIs do navegador e eventos",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Eloquent JavaScript · Marijn Haverbeke",
            "url": "https://eloquentjavascript.net/",
            "language": "EN"
          },
          {
            "kind": "video",
            "title": "Criando o seu primeiro script · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=OmmJBfcMJA8",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Introdução ao DOM · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=WWZX8RWLxIk",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Async / Await e APIs · Hashtag Programação",
            "url": "https://www.youtube.com/watch?v=dEqo8xwGaD0",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "js-dom",
            "title": "DOM: selecionar, criar e atualizar a página",
            "minutes": 120,
            "concept": "Transforme dados em uma interface sem confundir HTML, elementos e texto.",
            "objectives": [
              "Explicar a árvore DOM e selecionar elementos existentes com segurança.",
              "Criar, atualizar e remover elementos usando propriedades e métodos.",
              "Separar dados de apresentação e inserir conteúdo externo como texto."
            ],
            "exercise": "Construir: substitua o array por objetos {nome, concluido}. Mostre os nomes e risque apenas os concluídos. Conte quantos foram concluídos no resumo.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Minha lista de estudo\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Minha lista de estudo\u003c/h1>\n\u003cp id=\"resumo\" role=\"status\">\u003c/p>\n\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\n\"use strict\";\nconst assuntos = [\"HTML\", \"CSS\", \"JavaScript\"];\nconst lista = document.querySelector(\"#lista\");\nconst resumo = document.querySelector(\"#resumo\");\n\nfunction renderizar() {\n  lista.replaceChildren();\n  for (const [indice, assunto] of assuntos.entries()) {\n    const item = document.createElement(\"li\");\n    item.textContent = assunto;\n    item.dataset.indice = String(indice);\n    item.classList.toggle(\"feito\", indice === 0);\n    lista.append(item);\n  }\n  resumo.textContent = `${assuntos.length} assuntos; o primeiro foi concluído.`;\n}\nrenderizar();\n\u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Document Object Model",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · querySelector",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · textContent",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "JavaScript.info · Modifying the document",
                "url": "https://javascript.info/modifying-document",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-events",
            "title": "Eventos, formulários e delegação",
            "minutes": 120,
            "concept": "Conecte ações do usuário a mudanças de estado com validação e feedback acessível.",
            "objectives": [
              "Registrar ouvintes com addEventListener e explicar evento, target e currentTarget.",
              "Validar formulários sem perder envio por teclado nem os recursos nativos.",
              "Delegar ações de itens dinâmicos e manter foco e feedback após as mudanças."
            ],
            "exercise": "Construir: recuse duplicatas ignorando maiúsculas e espaços nas pontas. Mostre uma mensagem no campo sem apagar o que foi digitado.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Agenda de estudos\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Agenda de estudos\u003c/h1>\n\u003cform id=\"formulario\">\n\u003clabel for=\"assunto\">Assunto (2 a 60 caracteres)\u003c/label>\n\u003cinput id=\"assunto\" name=\"assunto\" required minlength=\"2\" maxlength=\"60\">\n\u003cbutton type=\"submit\">Adicionar\u003c/button>\n\u003c/form>\n\u003cp id=\"status\" role=\"status\">Nenhum assunto cadastrado.\u003c/p>\n\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\n\"use strict\";\nconst formulario = document.querySelector(\"#formulario\");\nconst campo = document.querySelector(\"#assunto\");\nconst lista = document.querySelector(\"#lista\");\nconst status = document.querySelector(\"#status\");\nconst assuntos = [];\nlet proximoId = 1;\n\nfunction renderizar() {\n  lista.replaceChildren();\n  for (const assunto of assuntos) {\n    const item = document.createElement(\"li\");\n    const texto = document.createElement(\"span\");\n    texto.textContent = assunto.nome;\n    const botao = document.createElement(\"button\");\n    botao.type = \"button\";\n    botao.dataset.remover = String(assunto.id);\n    botao.textContent = `Remover ${assunto.nome}`;\n    item.append(texto, botao);\n    lista.append(item);\n  }\n  status.textContent = assuntos.length ? `${assuntos.length} assuntos.` : \"Nenhum assunto cadastrado.\";\n}\ncampo.addEventListener(\"input\", () => campo.setCustomValidity(\"\"));\nformulario.addEventListener(\"submit\", (evento) => {\n  evento.preventDefault();\n  const nome = campo.value.trim();\n  campo.setCustomValidity(nome.length \u003c 2 ? \"Digite pelo menos dois caracteres, sem contar espaços nas pontas.\" : \"\");\n  if (!formulario.reportValidity()) return;\n  assuntos.push({id: proximoId++, nome});\n  renderizar();\n  formulario.reset();\n  campo.focus();\n});\nlista.addEventListener(\"click\", (evento) => {\n  if (!(evento.target instanceof Element)) return;\n  const botao = evento.target.closest(\"button[data-remover]\");\n  if (!botao || !lista.contains(botao)) return;\n  const indice = assuntos.findIndex(a => a.id === Number(botao.dataset.remover));\n  if (indice \u003c 0) return;\n  assuntos.splice(indice, 1);\n  renderizar();\n  campo.focus();\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · addEventListener",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Event bubbling",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Constraint validation",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "JavaScript.info · Event delegation",
                "url": "https://javascript.info/event-delegation",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-storage",
            "title": "Estado persistente: JSON e localStorage",
            "minutes": 120,
            "concept": "Salve dados pequenos, valide o conteúdo recuperado e trate falhas sem perder o texto em edição.",
            "objectives": [
              "Converter objetos simples em JSON e recuperar valores com validação de estrutura.",
              "Distinguir estado em memória, armazenamento local e sincronização com servidor.",
              "Implementar salvar, recuperar e apagar com mensagens honestas em caso de erro."
            ],
            "exercise": "Construir: acrescente um campo titulo de até 80 caracteres ao rascunho. Salve e recupere os dois campos.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Rascunho persistente\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Rascunho persistente\u003c/h1>\n\u003clabel for=\"texto\">Resumo de estudo (até 500 caracteres)\u003c/label>\n\u003ctextarea id=\"texto\" maxlength=\"500\" rows=\"5\">\u003c/textarea>\n\u003cp>\u003cbutton id=\"salvar\" type=\"button\">Salvar rascunho\u003c/button>\n\u003cbutton id=\"apagar\" type=\"button\">Apagar rascunho\u003c/button>\u003c/p>\n\u003cp id=\"status\" role=\"status\">\u003c/p>\n\u003cpre id=\"preview\">\u003c/pre>\n\u003cscript>\n\"use strict\";\nconst CHAVE = \"laboratorio-js:rascunho:v1\";\nconst campo = document.querySelector(\"#texto\");\nconst status = document.querySelector(\"#status\");\nconst preview = document.querySelector(\"#preview\");\nfunction valido(dado) {\n  return dado !== null && typeof dado === \"object\" && !Array.isArray(dado)\n    && dado.versao === 1 && typeof dado.texto === \"string\" && dado.texto.length \u003c= 500;\n}\nfunction mostrar() { preview.textContent = campo.value; }\ntry {\n  const bruto = localStorage.getItem(CHAVE);\n  if (bruto === null) {\n    status.textContent = \"Nenhum rascunho salvo.\";\n  } else {\n    const dado = JSON.parse(bruto);\n    if (!valido(dado)) throw new Error(\"Formato de rascunho inválido.\");\n    campo.value = dado.texto;\n    status.textContent = \"Rascunho recuperado.\";\n  }\n} catch (erro) {\n  status.textContent = \"Não foi possível recuperar o rascunho. Você pode continuar digitando.\";\n  console.error(erro);\n}\nmostrar();\ncampo.addEventListener(\"input\", mostrar);\ndocument.querySelector(\"#salvar\").addEventListener(\"click\", () => {\n  try {\n    const dado = {versao: 1, texto: campo.value.slice(0, 500)};\n    localStorage.setItem(CHAVE, JSON.stringify(dado));\n    status.textContent = \"Rascunho salvo neste navegador.\";\n  } catch (erro) {\n    status.textContent = \"Não foi possível salvar. Copie seu texto antes de sair.\";\n    console.error(erro);\n  }\n});\ndocument.querySelector(\"#apagar\").addEventListener(\"click\", () => {\n  try {\n    localStorage.removeItem(CHAVE);\n    campo.value = \"\";\n    mostrar();\n    status.textContent = \"Rascunho apagado.\";\n    campo.focus();\n  } catch (erro) {\n    status.textContent = \"Não foi possível apagar o rascunho armazenado.\";\n    console.error(erro);\n  }\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · localStorage",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · JSON",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Web Storage API",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "JavaScript.info · LocalStorage, sessionStorage",
                "url": "https://javascript.info/localstorage",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "js-browser",
        "title": "Assincronismo e organização",
        "level": "Intermediário · integração",
        "number": "03",
        "description": "Promises, Fetch, falhas, módulos e separação de responsabilidades.",
        "resources": [
          {
            "kind": "doc",
            "title": "MDN · Guia da linguagem",
            "url": "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "MDN · Referência: tipos, operadores e métodos",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "JavaScript.info · Tutorial e consulta",
            "url": "https://javascript.info/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · APIs do navegador e eventos",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Eloquent JavaScript · Marijn Haverbeke",
            "url": "https://eloquentjavascript.net/",
            "language": "EN"
          },
          {
            "kind": "video",
            "title": "Criando o seu primeiro script · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=OmmJBfcMJA8",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Introdução ao DOM · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=WWZX8RWLxIk",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Async / Await e APIs · Hashtag Programação",
            "url": "https://www.youtube.com/watch?v=dEqo8xwGaD0",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "js-promises",
            "title": "Assincronismo: callbacks, Promises e async/await",
            "minutes": 120,
            "concept": "Modele operações que terminam depois, tratando sucesso, falha e recuperação da interface.",
            "objectives": [
              "Prever uma ordem simples de código síncrono, microtarefas e timers.",
              "Consumir Promises com then/catch ou async/await sem confundir espera e bloqueio.",
              "Tratar rejeições e restaurar controles no finally."
            ],
            "exercise": "Construir: escreva uma função async carregarDupla que inicie duas simulações independentes e retorne um único array com os resultados.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Operação assíncrona local\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Operação assíncrona local\u003c/h1>\n\u003cp>O laboratório simula uma espera; não faz pedidos de rede.\u003c/p>\n\u003clabel>\u003cinput id=\"falhar\" type=\"checkbox\"> Simular falha\u003c/label>\n\u003cbutton id=\"iniciar\" type=\"button\">Iniciar\u003c/button>\n\u003cp id=\"status\" role=\"status\">Aguardando.\u003c/p>\n\u003cpre id=\"ordem\">\u003c/pre>\n\u003cscript>\n\"use strict\";\nconst botao = document.querySelector(\"#iniciar\");\nconst falhar = document.querySelector(\"#falhar\");\nconst status = document.querySelector(\"#status\");\nconst ordem = document.querySelector(\"#ordem\");\nfunction registrar(texto) { ordem.textContent += texto + \"\\n\"; }\n\nfunction simularPedido(deveFalhar) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (deveFalhar) reject(new Error(\"Falha simulada.\"));\n      else resolve([\"DOM\", \"Eventos\"]);\n    }, 700);\n  });\n}\n\nregistrar(\"1. código síncrono\");\nsetTimeout(() => registrar(\"4. callback do timer\"), 0);\nPromise.resolve().then(() => registrar(\"3. reação da Promise\"));\nregistrar(\"2. fim do código síncrono\");\n\nbotao.addEventListener(\"click\", async () => {\n  botao.disabled = true;\n  status.textContent = \"Carregando...\";\n  try {\n    const assuntos = await simularPedido(falhar.checked);\n    status.textContent = `Recebidos: ${assuntos.join(\", \")}.`;\n  } catch (erro) {\n    status.textContent = erro.message;\n  } finally {\n    botao.disabled = false;\n  }\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Using promises",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · async function",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Execution model",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "JavaScript.info · Async/await",
                "url": "https://javascript.info/async-await",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-fetch",
            "title": "Fetch, JSON e estados de uma busca",
            "minutes": 120,
            "concept": "Consuma dados com validação, carregamento, vazio, erro e cancelamento.",
            "objectives": [
              "Separar falha de rede, resposta HTTP, conversão JSON e validação de dados.",
              "Renderizar resultados externos como texto e representar estados vazios.",
              "Usar AbortController, encerrar timers e testar cenários determinísticos."
            ],
            "exercise": "Construir: use catalogo.json local com dois assuntos próprios, mantendo todos os estados e a validação.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Catálogo carregado com Fetch\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Catálogo carregado com Fetch\u003c/h1>\n\u003cp>Dados locais em Blob: nenhuma API externa é necessária.\u003c/p>\n\u003clabel for=\"modo\">Cenário\u003c/label>\n\u003cselect id=\"modo\">\u003coption value=\"ok\">Dados válidos\u003c/option>\u003coption value=\"vazio\">Lista vazia\u003c/option>\u003coption value=\"json\">JSON quebrado\u003c/option>\u003coption value=\"schema\">Estrutura inválida\u003c/option>\u003c/select>\n\u003cbutton id=\"carregar\" type=\"button\">Carregar\u003c/button>\n\u003cbutton id=\"cancelar\" type=\"button\" disabled>Cancelar\u003c/button>\n\u003cp id=\"status\" role=\"status\">Pronto para carregar.\u003c/p>\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\n\"use strict\";\nconst carregar = document.querySelector(\"#carregar\");\nconst cancelar = document.querySelector(\"#cancelar\");\nconst modo = document.querySelector(\"#modo\");\nconst status = document.querySelector(\"#status\");\nconst lista = document.querySelector(\"#lista\");\nlet controlador = null;\nfunction catalogoValido(dados) {\n  return Array.isArray(dados) && dados.length \u003c= 100 && dados.every(item =>\n    item !== null && typeof item === \"object\" && !Array.isArray(item) &&\n    Number.isInteger(item.id) && typeof item.nome === \"string\" && item.nome.length \u003c= 80);\n}\ncancelar.addEventListener(\"click\", () => controlador?.abort());\ncarregar.addEventListener(\"click\", async () => {\n  carregar.disabled = true;\n  cancelar.disabled = false;\n  lista.replaceChildren();\n  status.textContent = \"Carregando...\";\n  controlador = new AbortController();\n  const sinal = controlador.signal;\n  let expirou = false;\n  const timer = setTimeout(() => { expirou = true; controlador.abort(); }, 5000);\n  const cenarios = {\n    ok: JSON.stringify([{id:1,nome:\"HTML\"},{id:2,nome:\"JavaScript\"}]),\n    vazio: \"[]\", json: \"{\", schema: '{\"mensagem\":\"Formato diferente\"}'\n  };\n  const url = URL.createObjectURL(new Blob([cenarios[modo.value]], {type:\"application/json\"}));\n  try {\n    const resposta = await fetch(url, {signal:sinal});\n    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);\n    const dados = await resposta.json();\n    if (!catalogoValido(dados)) throw new Error(\"Estrutura de catálogo inválida.\");\n    for (const assunto of dados) {\n      const item = document.createElement(\"li\");\n      item.textContent = assunto.nome;\n      lista.append(item);\n    }\n    status.textContent = dados.length ? `${dados.length} assuntos carregados.` : \"Nenhum assunto encontrado.\";\n  } catch (erro) {\n    status.textContent = sinal.aborted\n      ? (expirou ? \"Tempo limite excedido.\" : \"Operação cancelada.\")\n      : `Não foi possível carregar: ${erro.message}`;\n  } finally {\n    clearTimeout(timer);\n    URL.revokeObjectURL(url);\n    controlador = null;\n    carregar.disabled = false;\n    cancelar.disabled = true;\n  }\n});\n\u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Using Fetch",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Response",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Response",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · AbortController",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "JavaScript.info · Fetch",
                "url": "https://javascript.info/fetch",
                "language": "EN"
              }
            ]
          },
          {
            "id": "js-modules",
            "title": "Módulos, organização e testes de funções",
            "minutes": 120,
            "concept": "Separe regras da interface, declare dependências e verifique resultados sem instalar bibliotecas.",
            "objectives": [
              "Distinguir exportação nomeada, importação estática e importação dinâmica.",
              "Organizar arquivos pequenos por responsabilidade usando servidor local.",
              "Testar regras puras com casos comuns, limites e entradas inválidas."
            ],
            "exercise": "Construir: crie testes de nenhuma concluída, todas concluídas e entrada inválida. Mostre uma mensagem ao final e confira também o Console.",
            "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003ctitle>Funções organizadas em módulo\u003c/title>\n\u003cstyle>body{font:1rem/1.6 system-ui;max-width:48rem;margin:2rem auto;padding:1rem}button,input{font:inherit}button{margin:.3rem}.feito{text-decoration:line-through}label{display:block}pre{white-space:pre-wrap}\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003ch1>Funções organizadas em módulo\u003c/h1>\n\u003cp>Este laboratório carrega um pequeno módulo local em memória.\u003c/p>\n\u003cp id=\"status\" role=\"status\">Carregando módulo...\u003c/p>\u003cpre id=\"saida\">\u003c/pre>\n\u003cscript>\n\"use strict\";\nconst status = document.querySelector(\"#status\");\nconst saida = document.querySelector(\"#saida\");\nconst fonte = `\nexport function resumir(tarefas) {\n  if (!Array.isArray(tarefas) || !tarefas.every(t =>\n    t !== null && typeof t === \"object\" && typeof t.concluida === \"boolean\")) {\n    throw new TypeError(\"Esperado array de tarefas com concluida booleana.\");\n  }\n  const total = tarefas.length;\n  const concluidas = tarefas.filter(t => t.concluida).length;\n  return {total, concluidas, pendentes: total - concluidas};\n}\nexport function formatar(resumo) {\n  return resumo.concluidas + \" de \" + resumo.total + \" concluídas; \" + resumo.pendentes + \" pendentes.\";\n}\n`;\nasync function iniciar() {\n  const url = URL.createObjectURL(new Blob([fonte], {type:\"text/javascript\"}));\n  try {\n    const {resumir, formatar} = await import(url);\n    const tarefas = [{concluida:true},{concluida:false},{concluida:true}];\n    const resultado = resumir(tarefas);\n    saida.textContent = formatar(resultado);\n    const vazio = resumir([]);\n    console.assert(resultado.total === 3 && resultado.concluidas === 2, \"Caso comum incorreto\");\n    console.assert(vazio.total === 0 && vazio.pendentes === 0, \"Caso vazio incorreto\");\n    status.textContent = \"Módulo carregado; confira também o Console.\";\n  } catch (erro) {\n    status.textContent = `Falha: ${erro.message}`;\n  } finally {\n    URL.revokeObjectURL(url);\n  }\n}\niniciar();\n\u003c/script>\n\u003c/body>\n\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · JavaScript modules",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · export",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · import",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "JavaScript.info · Modules introduction",
                "url": "https://javascript.info/modules-intro",
                "language": "EN"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "python",
    "title": "Python",
    "subtitle": "Da lógica a projetos verificáveis.",
    "icon": "terminal",
    "color": "#73cdd8",
    "range": "Básico → Intermediário aplicado",
    "description": "Aprenda Python do zero com exemplos, exercícios progressivos e três projetos testáveis no terminal.",
    "prerequisite": "Conclua prep-workspace e prep-cycle. Para praticar, prepare Python 3; a linguagem é ensinada desde o começo.",
    "project": "Diário de estudos em JSON, biblioteca de empréstimos e cliente de catálogo com testes locais.",
    "modules": [
      {
        "id": "py-basic",
        "title": "Fundamentos e dados persistentes",
        "level": "Básico · lógica e arquivos",
        "number": "01",
        "description": "Execução, controle de fluxo, coleções, funções, arquivos, JSON e depuração.",
        "resources": [
          {
            "kind": "doc",
            "title": "Python · Tutorial oficial",
            "url": "https://docs.python.org/pt-br/3/tutorial/",
            "language": "PT-BR"
          },
          {
            "kind": "book",
            "title": "Pense em Python · Allen B. Downey",
            "url": "https://penseallen.github.io/PensePython2e/",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Primeiros comandos em Python 3 · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=31llNGKWDdo",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Python · Controle de fluxo",
            "url": "https://docs.python.org/pt-br/3/tutorial/controlflow.html",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Python · Erros e exceções",
            "url": "https://docs.python.org/pt-br/3/tutorial/errors.html",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "py-syntax",
            "title": "Primeiro programa: valores, tipos e entrada",
            "minutes": 100,
            "concept": "Instale e execute Python 3, acompanhe cada instrução e converta dados de entrada antes de calcular.",
            "objectives": [
              "Executar um script e usar o REPL para experimentar expressões.",
              "Diferenciar int, float, str, bool e None e nomear variáveis com clareza.",
              "Converter e validar entradas simples sem confundir concatenação e soma."
            ],
            "exercise": "Calcule o tempo total de estudo a partir de duas entradas em texto e informe se a meta de 90 minutos foi alcançada.",
            "code": "# Salve como aula01.py e execute: python aula01.py\nnome = \"Ana\"\nmanha_texto = \"35\"\ntarde_texto = \"25\"\nmanha = int(manha_texto)\ntarde = int(tarde_texto)\ntotal = manha + tarde\nmeta = 90\nprint(f\"{nome}: {total} minutos\")\nprint(f\"Faltam {max(meta - total, 0)} minutos\")\nprint(f\"Meta atingida: {total >= meta}\")\nprint(type(total).__name__)\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Tutorial oficial de Python 3",
                "url": "https://docs.python.org/3/tutorial/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Referência da biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              },
              {
                "kind": "guide",
                "title": "Real Python · tutoriais abertos",
                "url": "https://realpython.com/tutorials/basics/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "py-control",
            "title": "Decisões, repetição e validação de entrada",
            "minutes": 110,
            "concept": "Transforme regras em condições legíveis e repita tarefas com limites definidos.",
            "objectives": [
              "Construir if/elif/else com comparações e operadores lógicos.",
              "Usar for, range e while sem perder os limites da contagem.",
              "Validar dados antes de acumulá-los e testar casos de fronteira."
            ],
            "exercise": "Percorra sete dias; some minutos válidos, classifique a meta e explique como trataria um dia com duração negativa.",
            "code": "# aula02.py\nminutos = [20, 0, 35, 15, 40]\ntotal = 0\nfor indice, valor in enumerate(minutos, start=1):\n    if valor \u003c 0:\n        print(f\"Dia {indice}: inválido\")\n        continue\n    total += valor\n    print(f\"Dia {indice}: {valor} min; acumulado {total}\")\nif total >= 100:\n    print(\"Meta atingida\")\nelse:\n    print(f\"Faltam {100 - total} minutos\")\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Tutorial oficial de Python 3",
                "url": "https://docs.python.org/3/tutorial/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Referência da biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              },
              {
                "kind": "guide",
                "title": "Real Python · tutoriais abertos",
                "url": "https://realpython.com/tutorials/basics/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "py-data",
            "title": "Listas, tuplas, dicionários e conjuntos",
            "minutes": 115,
            "concept": "Organize dados e escolha uma estrutura pelo modo como será consultada e alterada.",
            "objectives": [
              "Criar e percorrer listas, tuplas, dicionários e conjuntos.",
              "Explicar índice, fatia, mutabilidade e referência compartilhada.",
              "Agregar dados sem modificar acidentalmente a entrada."
            ],
            "exercise": "A partir de registros de aulas, gere total de minutos concluídos, títulos pendentes e categorias distintas.",
            "code": "# aula03.py\naulas = [\n    {\"titulo\": \"Variáveis\", \"minutos\": 25, \"concluida\": True, \"area\": \"Python\"},\n    {\"titulo\": \"Listas\", \"minutos\": 40, \"concluida\": False, \"area\": \"Python\"},\n    {\"titulo\": \"Git\", \"minutos\": 30, \"concluida\": True, \"area\": \"Ferramentas\"},\n]\nconcluidas = [aula for aula in aulas if aula[\"concluida\"]]\npendentes = [aula[\"titulo\"] for aula in aulas if not aula[\"concluida\"]]\nminutos = sum(aula[\"minutos\"] for aula in concluidas)\nareas = {aula[\"area\"] for aula in aulas}\nprint(f\"Concluídas: {len(concluidas)}\")\nprint(f\"Minutos: {minutos}\")\nprint(f\"Pendentes: {', '.join(pendentes)}\")\nprint(f\"Áreas distintas: {len(areas)}\")\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Tutorial oficial de Python 3",
                "url": "https://docs.python.org/3/tutorial/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Referência da biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              },
              {
                "kind": "guide",
                "title": "Real Python · tutoriais abertos",
                "url": "https://realpython.com/tutorials/basics/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "py-functions",
            "title": "Funções, contratos, escopo e decomposição",
            "minutes": 115,
            "concept": "Escreva funções pequenas com entrada, saída e regras verificáveis sem depender de variáveis escondidas.",
            "objectives": [
              "Declarar funções com parâmetros, return e valores padrão.",
              "Distinguir resultado retornado de saída impressa e reconhecer escopo local.",
              "Documentar e testar contratos com entradas normais e limites."
            ],
            "exercise": "Crie uma função resumo_aulas(aulas) que retorne total, concluídas e minutos pendentes, sem modificar a lista recebida.",
            "code": "# aula04.py\ndef minutos_pendentes(aulas):\n    \"\"\"Soma minutos de aulas não concluídas sem modificar a entrada.\"\"\"\n    total = 0\n    for aula in aulas:\n        if not aula[\"concluida\"]:\n            total += aula[\"minutos\"]\n    return total\n\n\ndef situacao(minutos, meta=60):\n    \"\"\"Devolve a mensagem da meta para inteiros não negativos.\"\"\"\n    if minutos >= meta:\n        return \"Meta atingida\"\n    return f\"Faltam {meta - minutos} minutos\"\n\n\naulas = [\n    {\"titulo\": \"Listas\", \"minutos\": 30, \"concluida\": False},\n    {\"titulo\": \"Funções\", \"minutos\": 45, \"concluida\": True},\n]\nprint(minutos_pendentes(aulas))\nprint(situacao(40))\nprint(situacao(60))\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Tutorial oficial de Python 3",
                "url": "https://docs.python.org/3/tutorial/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Referência da biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              },
              {
                "kind": "guide",
                "title": "Real Python · tutoriais abertos",
                "url": "https://realpython.com/tutorials/basics/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "py-files",
            "title": "Arquivos, caminhos, CSV e JSON",
            "minutes": 125,
            "concept": "Leia e grave dados numa pasta controlada, preservando codificação e validando o formato recebido.",
            "objectives": [
              "Usar pathlib e with para abrir arquivos em UTF-8.",
              "Distinguir texto livre, CSV tabular e JSON estruturado.",
              "Tratar caminhos inexistentes, formatos inválidos e escrita parcial com cuidado."
            ],
            "exercise": "Crie um relatório de estudos em JSON, recarregue-o e gere um CSV com título e minutos sem perder acentos.",
            "code": "# aula05.py; só cria arquivos dentro da pasta laboratorio_py\nfrom pathlib import Path\nimport csv\nimport json\n\npasta = Path(\"laboratorio_py\")\npasta.mkdir(exist_ok=True)\naulas = [\n    {\"titulo\": \"Introdução\", \"minutos\": 25},\n    {\"titulo\": \"Listas\", \"minutos\": 40},\n]\narquivo_json = pasta / \"aulas.json\"\narquivo_json.write_text(json.dumps(aulas, ensure_ascii=False, indent=2), encoding=\"utf-8\")\ncarregadas = json.loads(arquivo_json.read_text(encoding=\"utf-8\"))\nwith (pasta / \"aulas.csv\").open(\"w\", encoding=\"utf-8\", newline=\"\") as arquivo:\n    escritor = csv.DictWriter(arquivo, fieldnames=[\"titulo\", \"minutos\"])\n    escritor.writeheader()\n    escritor.writerows(carregadas)\nprint(f\"Aulas: {len(carregadas)}\")\nprint(f\"Minutos: {sum(a['minutos'] for a in carregadas)}\")\nprint(\"Arquivos criados na pasta laboratorio_py\")\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Tutorial oficial de Python 3",
                "url": "https://docs.python.org/3/tutorial/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Referência da biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              },
              {
                "kind": "guide",
                "title": "Real Python · tutoriais abertos",
                "url": "https://realpython.com/tutorials/basics/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "py-debug",
            "title": "Depuração, tracebacks e testes de fronteira",
            "minutes": 125,
            "concept": "Investigue falhas por evidência, escreva testes pequenos e ajuste o código sem esconder erros.",
            "objectives": [
              "Ler SyntaxError, TypeError, ValueError e tracebacks.",
              "Reproduzir defeitos com casos normais, limites e inválidos.",
              "Criar testes simples com unittest e manter um ciclo de regressão."
            ],
            "exercise": "Investigue uma função de percentual que aceita entradas inválidas, corrija a regra e crie testes para vazio, metade, limite exato e tipo incorreto.",
            "code": "# aula06.py\nimport unittest\n\n\ndef percentual(concluidas, total):\n    \"\"\"Inteiros 0 \u003c= concluidas \u003c= total; total zero retorna zero.\"\"\"\n    if type(concluidas) is not int or type(total) is not int:\n        raise TypeError(\"Use quantidades inteiras\")\n    if total \u003c 0 or concluidas \u003c 0 or concluidas > total:\n        raise ValueError(\"Quantidades fora dos limites\")\n    return 0 if total == 0 else round(100 * concluidas / total)\n\n\nclass TestePercentual(unittest.TestCase):\n    def test_vazio(self):\n        self.assertEqual(percentual(0, 0), 0)\n\n    def test_metade(self):\n        self.assertEqual(percentual(2, 4), 50)\n\n    def test_invalido(self):\n        with self.assertRaises(ValueError):\n            percentual(5, 4)\n\n\nif __name__ == \"__main__\":\n    unittest.main(verbosity=2)\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Tutorial oficial de Python 3",
                "url": "https://docs.python.org/3/tutorial/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Referência da biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              },
              {
                "kind": "guide",
                "title": "Real Python · tutoriais abertos",
                "url": "https://realpython.com/tutorials/basics/",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "py-intermediate",
        "title": "Código organizado e domínio",
        "level": "Intermediário · arquitetura",
        "number": "02",
        "description": "Classes, invariantes, falhas, módulos, importação e estrutura de um projeto.",
        "resources": [
          {
            "kind": "doc",
            "title": "Python · Tutorial oficial",
            "url": "https://docs.python.org/pt-br/3/tutorial/",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Real Python · Artigo sobre classes e POO",
            "url": "https://realpython.com/python3-object-oriented-programming/",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Pense em Python · Allen B. Downey",
            "url": "https://penseallen.github.io/PensePython2e/",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Classes e POO em Python · Hashtag Programação",
            "url": "https://www.youtube.com/watch?v=97A_Cyyh-eU",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Python · Módulos",
            "url": "https://docs.python.org/pt-br/3/tutorial/modules.html",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Python · Biblioteca padrão",
            "url": "https://docs.python.org/pt-br/3/library/index.html",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "py-oop",
            "title": "Objetos: estado, comportamento e composição",
            "minutes": 65,
            "concept": "Classes ajudam a reunir dados e operações que protegem regras do domínio. Instâncias têm estado próprio; métodos recebem self. Encapsulamento em Python é convenção e API, não uma barreira de segurança. Prefira composição para combinar responsabilidades e use herança quando existir uma relação de especialização clara.",
            "objectives": [
              "Criar classes e instâncias sem confundir atributos compartilhados e individuais.",
              "Definir invariantes nos métodos e combinar objetos por composição.",
              "Escolher entre função, classe, dataclass e herança conforme o problema."
            ],
            "exercise": "Modele uma carteira de estudos com sessões válidas e relatório de tempo; teste duas instâncias independentes.",
            "code": "class Sessao:\n    def __init__(self, tema, minutos):\n        if not tema.strip() or minutos \u003c= 0:\n            raise ValueError(\"Tema e duração precisam ser válidos\")\n        self.tema = tema.strip()\n        self.minutos = minutos\n\n\nclass Plano:\n    def __init__(self, nome):\n        self.nome = nome\n        self._sessoes = []\n\n    def adicionar(self, sessao):\n        if not isinstance(sessao, Sessao):\n            raise TypeError(\"Esperada uma Sessao\")\n        self._sessoes.append(sessao)\n\n    def total_minutos(self):\n        return sum(sessao.minutos for sessao in self._sessoes)\n\n\nplano = Plano(\"Ana\")\nplano.adicionar(Sessao(\"POO\", 40))\nplano.adicionar(Sessao(\"Testes\", 20))\nprint(plano.nome, plano.total_minutos())\nprint(Plano(\"Bia\").total_minutos())",
            "docs": [
              {
                "kind": "doc",
                "title": "Python · Classes",
                "url": "https://docs.python.org/pt-br/3/tutorial/classes.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · dataclasses",
                "url": "https://docs.python.org/pt-br/3/library/dataclasses.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Pense em Python · Classes e objetos",
                "url": "https://penseallen.github.io/PensePython2e/",
                "language": "PT-BR"
              }
            ]
          },
          {
            "id": "py-errors",
            "title": "Exceções: comunicar, tratar e investigar falhas",
            "minutes": 55,
            "concept": "Erros de sintaxe impedem iniciar; exceções surgem durante a execução. Use tratamento específico perto da fronteira em que existe uma recuperação possível, preserve a causa com raise ... from ..., e libere recursos com with ou finally. Não esconda defeitos com except genérico.",
            "objectives": [
              "Distinguir validação de entrada, erro de transporte e erro de programação.",
              "Usar try/except/else/finally e exceção específica com mensagem útil.",
              "Rastrear a causa original e decidir quando propagar o erro."
            ],
            "exercise": "Implemente leitura de pontuações que rejeita linhas inválidas e mantém a causa no traceback.",
            "code": "class PontuacaoInvalida(ValueError):\n    pass\n\n\ndef ler_pontuacao(texto):\n    try:\n        valor = int(texto)\n    except ValueError as erro:\n        raise PontuacaoInvalida(\"Use um número inteiro\") from erro\n    else:\n        if not 0 \u003c= valor \u003c= 100:\n            raise PontuacaoInvalida(\"Pontuação fora de 0 a 100\")\n        return valor\n\n\nfor entrada in (\"85\", \"abc\", \"120\"):\n    try:\n        print(entrada, ler_pontuacao(entrada))\n    except PontuacaoInvalida as erro:\n        print(entrada, \"erro:\", erro)",
            "docs": [
              {
                "kind": "doc",
                "title": "Python · Erros e exceções",
                "url": "https://docs.python.org/pt-br/3/tutorial/errors.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · Hierarquia de exceções",
                "url": "https://docs.python.org/pt-br/3/library/exceptions.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · with e gerenciadores de contexto",
                "url": "https://docs.python.org/pt-br/3/reference/compound_stmts.html#the-with-statement",
                "language": "PT-BR"
              }
            ]
          },
          {
            "id": "py-modules",
            "title": "Módulos, imports e organização de projetos",
            "minutes": 60,
            "concept": "Um módulo é um arquivo .py com definições reutilizáveis. Imports criam dependências explícitas. O bloco if __name__ == '__main__' separa demonstração executável de comportamento ao importar. Organize arquivos por responsabilidade, evite execução inesperada no import e execute pacotes pelo contexto correto.",
            "objectives": [
              "Separar funções reutilizáveis de um programa de linha de comando.",
              "Explicar import, nomes de módulo, pacote e ponto de entrada.",
              "Diagnosticar imports circulares e diferenças entre executar arquivo e módulo."
            ],
            "exercise": "Divida um relatório de estudos em regras.py e app.py; importar regras não deve imprimir nada.",
            "code": "# Salve o primeiro bloco como regras.py:\ndef percentual(concluidas, total):\n    if total \u003c 0 or concluidas \u003c 0 or concluidas > total:\n        raise ValueError(\"Contagens inválidas\")\n    return 0 if total == 0 else round(concluidas / total * 100)\n\n\n# Salve o segundo bloco em app.py (sem as linhas acima):\nfrom regras import percentual\n\n\ndef main():\n    print(f\"Progresso: {percentual(3, 4)}%\")\n\n\nif __name__ == \"__main__\":\n    main()",
            "docs": [
              {
                "kind": "doc",
                "title": "Python · Módulos",
                "url": "https://docs.python.org/pt-br/3/tutorial/modules.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · Sistema de imports",
                "url": "https://docs.python.org/pt-br/3/reference/import.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · __main__",
                "url": "https://docs.python.org/pt-br/3/library/__main__.html",
                "language": "PT-BR"
              }
            ]
          }
        ]
      },
      {
        "id": "py-applied",
        "title": "Integração e qualidade",
        "level": "Intermediário · aplicação",
        "number": "03",
        "description": "Ambientes isolados, dependências, HTTP e testes automatizados sem depender da rede.",
        "resources": [
          {
            "kind": "doc",
            "title": "Python · Ambientes virtuais e pacotes",
            "url": "https://docs.python.org/pt-br/3/tutorial/venv.html",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Python · unittest",
            "url": "https://docs.python.org/pt-br/3/library/unittest.html",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Requests · documentação oficial",
            "url": "https://requests.readthedocs.io/en/latest/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Requests · Quickstart oficial",
            "url": "https://requests.readthedocs.io/en/latest/user/quickstart/",
            "language": "EN"
          },
          {
            "kind": "video",
            "title": "APIs com Python e requests · Hashtag Programação",
            "url": "https://www.youtube.com/watch?v=ZTz0xlCaIuw",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "py-venv",
            "title": "Ambientes virtuais, pip e dependências",
            "minutes": 60,
            "concept": "venv cria um ambiente Python isolado por projeto. python -m pip instala no interpretador selecionado; requirements.txt registra versões ou faixas para reconstrução. Isolamento de pacotes não é uma barreira de segurança. Não versione .venv nem tokens, e saiba recriar o ambiente a partir das instruções do projeto.",
            "objectives": [
              "Criar e identificar um ambiente virtual no próprio sistema.",
              "Instalar e registrar dependências de forma reproduzível.",
              "Distinguir código-fonte, ambiente local, configuração e segredo."
            ],
            "exercise": "Monte uma pasta de projeto com .venv e requirements.txt; prove qual Python e pip estão em uso.",
            "code": "# Execute cada linha no terminal, não dentro de um arquivo .py.\n# Windows PowerShell:\npython -m venv .venv\n.venv\\Scripts\\python.exe -m pip --version\n.venv\\Scripts\\python.exe -m pip list\n\n# macOS/Linux, em outro sistema:\n# python3 -m venv .venv\n# .venv/bin/python -m pip --version\n# .venv/bin/python -m pip list\n\n# Em um arquivo .gitignore do projeto:\n# .venv/\n# __pycache__/\n# *.pyc",
            "docs": [
              {
                "kind": "doc",
                "title": "Python · Ambientes virtuais e pacotes",
                "url": "https://docs.python.org/pt-br/3/tutorial/venv.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca venv",
                "url": "https://docs.python.org/pt-br/3/library/venv.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python Packaging User Guide · Installing packages",
                "url": "https://packaging.python.org/en/latest/tutorials/installing-packages/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "py-requests",
            "title": "APIs HTTP com requests e fronteiras testáveis",
            "minutes": 70,
            "concept": "Uma API HTTP entrega resposta com status, corpo e contrato de dados. requests simplifica a chamada, mas o programa ainda precisa de timeout, checagem de status, JSON válido e validação do formato esperado. Injete o transporte para treinar e testar sem rede; use uma chamada real apenas como extensão opcional.",
            "objectives": [
              "Explicar a diferença entre falha de rede, status HTTP e dado inválido.",
              "Implementar consumo de API com timeout e validação antes do uso.",
              "Testar o comportamento com resposta simulada e integração opcional real."
            ],
            "exercise": "Implemente um catálogo que recebe uma função de busca, rejeita respostas inválidas e pode usar requests em uma extensão.",
            "code": "class RespostaFalsa:\n    def __init__(self, dados, status=200):\n        self._dados = dados\n        self.status_code = status\n\n    def raise_for_status(self):\n        if self.status_code >= 400:\n            raise RuntimeError(f\"HTTP {self.status_code}\")\n\n    def json(self):\n        return self._dados\n\n\ndef carregar_titulos(buscar):\n    resposta = buscar(\"https://exemplo.invalid/livros\", timeout=5)\n    resposta.raise_for_status()\n    dados = resposta.json()\n    if not isinstance(dados, list):\n        raise ValueError(\"Esperada uma lista\")\n    titulos = []\n    for item in dados:\n        if not isinstance(item, dict) or not isinstance(item.get(\"titulo\"), str):\n            raise ValueError(\"Item sem título\")\n        titulos.append(item[\"titulo\"])\n    return titulos\n\n\ndef busca_local(url, timeout):\n    assert timeout == 5\n    return RespostaFalsa([{\"titulo\": \"Python\"}, {\"titulo\": \"Testes\"}])\n\n\nprint(carregar_titulos(busca_local))",
            "docs": [
              {
                "kind": "doc",
                "title": "Requests · Quickstart",
                "url": "https://requests.readthedocs.io/en/latest/user/quickstart/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Requests · Timeouts e erros",
                "url": "https://requests.readthedocs.io/en/latest/user/quickstart/#timeouts",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Visão geral HTTP",
                "url": "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview",
                "language": "PT-BR"
              }
            ]
          },
          {
            "id": "py-tests",
            "title": "Testes automatizados, isolamento e regressão",
            "minutes": 75,
            "concept": "Testes automatizados verificam comportamento por casos de entrada e saída. unittest da biblioteca padrão oferece TestCase, assertEqual e assertRaises. Use doubles ou mock para isolar tempo, rede e arquivos quando necessário; inclua casos normais, limites e falhas para evitar regressões em mudanças futuras.",
            "objectives": [
              "Escrever testes de unidade com unittest sem dependências externas.",
              "Escolher casos de fronteira e caminhos de falha úteis.",
              "Isolar colaboradores externos e usar regressão para orientar manutenção."
            ],
            "exercise": "Crie regra e testes em arquivos separados; introduza um defeito controlado e veja a suíte detectá-lo.",
            "code": "# Salve como regra.py:\ndef percentual(concluidas, total):\n    if total \u003c 0 or not 0 \u003c= concluidas \u003c= total:\n        raise ValueError(\"Contagens inválidas\")\n    return 0 if total == 0 else round(concluidas / total * 100)\n\n\n# Salve o bloco seguinte como test_regra.py:\nimport unittest\nfrom regra import percentual\n\n\nclass PercentualTest(unittest.TestCase):\n    def test_caso_comum(self):\n        self.assertEqual(percentual(3, 4), 75)\n\n    def test_total_zero(self):\n        self.assertEqual(percentual(0, 0), 0)\n\n    def test_contagem_invalida(self):\n        with self.assertRaises(ValueError):\n            percentual(5, 4)\n\n\nif __name__ == \"__main__\":\n    unittest.main()",
            "docs": [
              {
                "kind": "doc",
                "title": "Python · unittest",
                "url": "https://docs.python.org/pt-br/3/library/unittest.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · unittest.mock",
                "url": "https://docs.python.org/pt-br/3/library/unittest.mock.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Python · unittest CLI",
                "url": "https://docs.python.org/pt-br/3/library/unittest.html#command-line-interface",
                "language": "PT-BR"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "database",
    "title": "Banco de Dados",
    "subtitle": "Modele, consulte e recupere dados.",
    "icon": "database",
    "color": "#6ed9ae",
    "range": "Básico → Intermediário aplicado",
    "description": "SQL, Docker local, bancos relacionais e NoSQL, com aulas completas e cinco projetos de integridade, integração e recuperação.",
    "prerequisite": "Conclua a Etapa 0. Comece por SQL e SQLite; práticas com sqlite3 exigem Python básico. Docker e Compose são obrigatórios antes do PostgreSQL em 127.0.0.1:55432. MariaDB, Firebird e MongoDB são aprofundamentos.",
    "project": "Catálogo SQL, laboratório Docker, estoque PostgreSQL, sessões MongoDB e recuperação testada em SQLite.",
    "modules": [
      {
        "id": "db-foundations",
        "title": "Fundamentos e linguagem SQL",
        "level": "Básico",
        "number": "01",
        "description": "Da modelagem dos dados às consultas, relacionamentos e transações.",
        "resources": [
          {
            "kind": "doc",
            "title": "W3Schools · SQL com exemplos interativos",
            "url": "https://www.w3schools.com/sql/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "PostgreSQL · A linguagem SQL",
            "url": "https://www.postgresql.org/docs/current/tutorial-sql.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "PostgreSQL · Transações",
            "url": "https://www.postgresql.org/docs/current/tutorial-transactions.html",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Database Design, 2ª edição · BCcampus / livro aberto",
            "url": "https://opentextbc.ca/dbdesign01/",
            "language": "EN"
          },
          {
            "kind": "video",
            "title": "Modelagem de bancos com projeto prático · Bóson",
            "url": "https://www.youtube.com/watch?v=Kd1yqYjylCg",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Chaves estrangeiras e JOIN · Curso em Vídeo / MySQL",
            "url": "https://www.youtube.com/watch?v=paZNDJAPT4E",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "db-modeling",
            "title": "Modelagem relacional, chaves e normalização",
            "minutes": 120,
            "concept": "Imagine que Ana e Beto estudam SQL. Se você guardar a conclusão na própria aula, marcar a aula como concluída para Ana também mudará o estado visto por Beto. Modelar significa decidir a qual coisa cada informação pertence antes de escrever comandos.",
            "objectives": [
              "Identifique entidades antes de criar tabelas.",
              "Use chaves para identidade e referências.",
              "Guarde informações da relação na tabela que representa a relação."
            ],
            "exercise": "3. Construir: modele avaliações de lições. Cada estudante pode avaliar cada lição uma vez, com nota inteira de 1 a 5. Crie a tabela e registre nota 4 de Ana para SELECT.",
            "code": "PRAGMA foreign_keys=ON;\nCREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT NOT NULL UNIQUE);\nCREATE TABLE estudantes(id INTEGER PRIMARY KEY,nome TEXT NOT NULL,email TEXT NOT NULL UNIQUE);\nCREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha_id INTEGER NOT NULL REFERENCES trilhas(id),titulo TEXT NOT NULL);\nCREATE TABLE matriculas(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),trilha_id INTEGER NOT NULL REFERENCES trilhas(id),PRIMARY KEY(estudante_id,trilha_id));\nCREATE TABLE progresso(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),licao_id INTEGER NOT NULL REFERENCES licoes(id),concluida INTEGER NOT NULL CHECK(concluida IN (0,1)),PRIMARY KEY(estudante_id,licao_id));\nINSERT INTO trilhas VALUES(1,'Dados');\nINSERT INTO estudantes VALUES(1,'Ana','ana@example.test'),(2,'Beto','beto@example.test');\nINSERT INTO licoes VALUES(10,1,'SELECT'),(11,1,'JOIN');\nINSERT INTO matriculas VALUES(1,1),(2,1);\nINSERT INTO progresso VALUES(1,10,1),(2,10,0);\nSELECT estudante_id,licao_id,concluida FROM progresso ORDER BY estudante_id,licao_id;",
            "docs": [
              {
                "kind": "doc",
                "title": "SQLite · referência da linguagem SQL",
                "url": "https://www.sqlite.org/lang.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · integridade referencial",
                "url": "https://www.sqlite.org/foreignkeys.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · sqlite3 e parâmetros SQL",
                "url": "https://docs.python.org/3/library/sqlite3.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-ddl-crud",
            "title": "Tabelas, tipos, restrições e CRUD seguro",
            "minutes": 120,
            "concept": "Uma interface pode impedir valores negativos, mas outro programa pode acessar o mesmo banco. Constraints colocam as regras junto aos dados, protegendo-os independentemente da tela que enviou a alteração.",
            "objectives": [
              "DDL descreve a estrutura; CRUD manipula os registros.",
              "Constraints tornam regras verificáveis pelo banco.",
              "Confira o filtro antes de qualquer alteração."
            ],
            "exercise": "3. Construir: adicione a lição Transações de 50 minutos, id 13, e marque somente ela como concluída. Confira a linha antes e depois.",
            "code": "PRAGMA foreign_keys = ON;\nCREATE TABLE trilhas (id INTEGER PRIMARY KEY, nome TEXT NOT NULL UNIQUE);\nCREATE TABLE licoes (\n  id INTEGER PRIMARY KEY,\n  trilha_id INTEGER NOT NULL REFERENCES trilhas(id),\n  titulo TEXT NOT NULL,\n  minutos INTEGER NOT NULL CHECK (typeof(minutos)='integer' AND minutos > 0),\n  concluida INTEGER NOT NULL DEFAULT 0 CHECK (concluida IN (0,1))\n);\nINSERT INTO trilhas (id,nome) VALUES (1,'Dados');\nINSERT INTO licoes (id,trilha_id,titulo,minutos)\nVALUES (10,1,'SELECT',30),(11,1,'JOIN',40);\nSELECT id,titulo,concluida FROM licoes WHERE id=10;\nUPDATE licoes SET concluida=1 WHERE id=10;\nSELECT id,titulo,minutos,concluida FROM licoes ORDER BY id;",
            "docs": [
              {
                "kind": "doc",
                "title": "SQLite · referência da linguagem SQL",
                "url": "https://www.sqlite.org/lang.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · integridade referencial",
                "url": "https://www.sqlite.org/foreignkeys.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · sqlite3 e parâmetros SQL",
                "url": "https://docs.python.org/3/library/sqlite3.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-select",
            "title": "Consultas, NULL, filtros e agregações",
            "minutes": 120,
            "concept": "O dashboard precisa responder quais aulas estão pendentes e quanto tempo falta em cada trilha. SELECT transforma registros individuais em respostas, sem exigir que você carregue tudo na aplicação para calcular manualmente.",
            "objectives": [
              "WHERE escolhe linhas; HAVING escolhe grupos.",
              "NULL precisa de testes específicos.",
              "Ordenação e desempate fazem parte de uma consulta previsível."
            ],
            "exercise": "3. Construir: produza um relatório das pendências por trilha, com quantidade e total, maior total primeiro. Inclua as duas trilhas, sem HAVING.",
            "code": "CREATE TABLE licoes (\n id INTEGER PRIMARY KEY, trilha TEXT, titulo TEXT,\n minutos INTEGER, concluida INTEGER, observacao TEXT\n);\nINSERT INTO licoes VALUES\n (1,'Dados','SELECT',30,0,NULL),\n (2,'Dados','JOIN',40,0,'Revisar'),\n (3,'Python','Listas',20,1,NULL),\n (4,'Python','Arquivos',30,0,'');\nSELECT titulo,minutos FROM licoes WHERE concluida=0\nORDER BY minutos DESC,id ASC;\nSELECT trilha,COUNT(*) AS quantidade,SUM(minutos) AS total\nFROM licoes WHERE concluida=0 GROUP BY trilha\nHAVING SUM(minutos)>=50 ORDER BY trilha;\nSELECT COUNT(*) AS linhas,COUNT(observacao) AS preenchidas FROM licoes;",
            "docs": [
              {
                "kind": "doc",
                "title": "SQLite · referência da linguagem SQL",
                "url": "https://www.sqlite.org/lang.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · integridade referencial",
                "url": "https://www.sqlite.org/foreignkeys.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · sqlite3 e parâmetros SQL",
                "url": "https://docs.python.org/3/library/sqlite3.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-joins",
            "title": "JOINs, subconsultas e CTEs",
            "minutes": 120,
            "concept": "Separar o nome da trilha das lições evita repetição, mas o relatório precisa reunir essas informações novamente. JOIN expressa essa ligação e permite incluir até trilhas que ainda não receberam nenhuma aula.",
            "objectives": [
              "A condição ON determina como as linhas se relacionam.",
              "Entenda a granularidade antes de somar.",
              "LEFT JOIN e contagem de chaves permitem representar zero corretamente."
            ],
            "exercise": "3. Construir: use uma CTE para obter total de minutos de todas as trilhas e devolva somente totais iguais a zero.",
            "code": "CREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT);\nCREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha_id INTEGER,titulo TEXT,minutos INTEGER);\nINSERT INTO trilhas VALUES(1,'Dados'),(2,'Python');\nINSERT INTO licoes VALUES(10,1,'SELECT',30),(11,1,'JOIN',40);\nSELECT t.nome,l.titulo FROM trilhas t\nLEFT JOIN licoes l ON l.trilha_id=t.id ORDER BY t.id,l.id;\nWITH resumo AS (\n SELECT t.id,t.nome,COUNT(l.id) AS quantidade,\n COALESCE(SUM(l.minutos),0) AS total\n FROM trilhas t LEFT JOIN licoes l ON l.trilha_id=t.id\n GROUP BY t.id,t.nome\n)\nSELECT nome,quantidade,total FROM resumo\nWHERE total>(SELECT AVG(total) FROM resumo) ORDER BY id;",
            "docs": [
              {
                "kind": "doc",
                "title": "SQLite · referência da linguagem SQL",
                "url": "https://www.sqlite.org/lang.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · integridade referencial",
                "url": "https://www.sqlite.org/foreignkeys.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · sqlite3 e parâmetros SQL",
                "url": "https://docs.python.org/3/library/sqlite3.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-transactions",
            "title": "Transações, integridade e concorrência",
            "minutes": 120,
            "concept": "Transferir dez créditos exige retirar dez de Ana e adicionar dez a Beto. Se apenas metade acontecer, o total muda indevidamente. Uma transação transforma essas duas alterações em uma unidade que pode ser confirmada ou desfeita.",
            "objectives": [
              "Agrupe alterações dependentes em uma transação.",
              "COMMIT confirma; ROLLBACK descarta o que ainda não foi confirmado.",
              "Constraints e regras de negócio continuam necessárias."
            ],
            "exercise": "3. Construir: partindo de 100 e 50, use SAVEPOINT para desfazer apenas um crédito provisório de 7 depois de um crédito de 5; confirme o primeiro crédito.",
            "code": "CREATE TABLE contas (\n id INTEGER PRIMARY KEY, nome TEXT NOT NULL,\n saldo INTEGER NOT NULL CHECK(saldo>=0)\n);\nINSERT INTO contas VALUES(1,'Ana',100),(2,'Beto',50);\nBEGIN;\nUPDATE contas SET saldo=saldo-10 WHERE id=1;\nUPDATE contas SET saldo=saldo+10 WHERE id=2;\nSELECT nome,saldo FROM contas ORDER BY id;\nROLLBACK;\nSELECT nome,saldo FROM contas ORDER BY id;\nSELECT SUM(saldo) AS total FROM contas;",
            "docs": [
              {
                "kind": "doc",
                "title": "SQLite · referência da linguagem SQL",
                "url": "https://www.sqlite.org/lang.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · integridade referencial",
                "url": "https://www.sqlite.org/foreignkeys.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · sqlite3 e parâmetros SQL",
                "url": "https://docs.python.org/3/library/sqlite3.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · transações",
                "url": "https://www.sqlite.org/lang_transaction.html",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "db-local",
        "number": "02",
        "title": "Bancos locais com Docker",
        "level": "Intermediário · ambiente local",
        "description": "Instale, conecte, preserve dados e teste recuperação em um laboratório reproduzível.",
        "resources": [
          {
            "kind": "doc",
            "title": "Docker · instalação Windows",
            "url": "https://docs.docker.com/desktop/setup/install/windows-install/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Docker · instalação macOS",
            "url": "https://docs.docker.com/desktop/setup/install/mac-install/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Docker Engine · Linux",
            "url": "https://docs.docker.com/engine/install/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Docker · Compose",
            "url": "https://docs.docker.com/compose/gettingstarted/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Docker · redes no Compose",
            "url": "https://docs.docker.com/compose/how-tos/networking/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "PostgreSQL · imagem oficial",
            "url": "https://hub.docker.com/_/postgres",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "db-docker-basics",
            "title": "Docker do zero: imagem, container e banco local",
            "minutes": 85,
            "concept": "Entenda a infraestrutura mínima para executar um servidor de banco isolado no computador e diferencie essa infraestrutura dos dados.",
            "objectives": [
              "Distinguir imagem, container, volume, cliente e servidor.",
              "Instalar e verificar Docker e Compose no sistema utilizado.",
              "Diagnosticar cliente disponível com Engine parado."
            ],
            "exercise": "Escreva um README mínimo reproduzível do ambiente.",
            "code": "docker version\ndocker compose version\ndocker ps\ndocker ps -a",
            "docs": [
              {
                "kind": "doc",
                "title": "Docker · instalação Windows",
                "url": "https://docs.docker.com/desktop/setup/install/windows-install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · instalação macOS",
                "url": "https://docs.docker.com/desktop/setup/install/mac-install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker Engine · Linux",
                "url": "https://docs.docker.com/engine/install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · Compose",
                "url": "https://docs.docker.com/compose/gettingstarted/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · redes no Compose",
                "url": "https://docs.docker.com/compose/how-tos/networking/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · imagem oficial",
                "url": "https://hub.docker.com/_/postgres",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-docker-compose",
            "title": "Compose: portas, volumes e conexão ao PostgreSQL",
            "minutes": 110,
            "concept": "Descreva um PostgreSQL local e comprove que clientes acessam a porta correta e os dados ficam em volume nomeado.",
            "objectives": [
              "Ler um compose.yaml e suas relações de configuração.",
              "Conectar pelo host e pelo cliente interno do container.",
              "Verificar persistência sem remover o volume."
            ],
            "exercise": "Crie evidência de persistência com uma tabela própria.",
            "code": "# compose.yaml — PostgreSQL 17; não troque a major sem plano de migração.\nname: techhub-dados-lab\nservices:\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_USER: aluno\n      POSTGRES_DB: estudos\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Defina POSTGRES_PASSWORD no arquivo .env}\n    ports:\n      - \"127.0.0.1:55432:5432\"\n    volumes:\n      - dados:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U aluno -d estudos\"]\n      interval: 5s\n      timeout: 5s\n      retries: 10\nvolumes:\n  dados:\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Docker · instalação Windows",
                "url": "https://docs.docker.com/desktop/setup/install/windows-install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · instalação macOS",
                "url": "https://docs.docker.com/desktop/setup/install/mac-install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker Engine · Linux",
                "url": "https://docs.docker.com/engine/install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · Compose",
                "url": "https://docs.docker.com/compose/gettingstarted/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · redes no Compose",
                "url": "https://docs.docker.com/compose/how-tos/networking/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · imagem oficial",
                "url": "https://hub.docker.com/_/postgres",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-docker-operations",
            "title": "Operação local: diagnóstico, backup e restauração",
            "minutes": 110,
            "concept": "Resolva falhas por evidências e comprove recuperação em uma base separada sem remover os dados originais.",
            "objectives": [
              "Distinguir falhas de porta, autenticação, inicialização e consulta.",
              "Gerar backup, copiá-lo para o host e restaurar em banco novo.",
              "Documentar rotina reproduzível e limites de segurança."
            ],
            "exercise": "Escreva um roteiro de recuperação com cinco evidências.",
            "code": "# 1. Na pasta do compose.yaml, crie .env com uma senha local escolhida por você:\n# POSTGRES_PASSWORD=sua_senha_local\n# .gitignore deve conter .env e *.dump\ndocker compose config --quiet\ndocker compose up -d\ndocker compose ps\n# Espere o serviço db indicar healthy; se falhar, examine logs.\ndocker compose exec db psql -U aluno -d estudos -v ON_ERROR_STOP=1 -c \"CREATE TABLE IF NOT EXISTS marcador(id integer PRIMARY KEY, texto text NOT NULL); INSERT INTO marcador VALUES(1,'persistiu') ON CONFLICT(id) DO UPDATE SET texto=EXCLUDED.texto;\"\ndocker compose down\ndocker compose up -d\n# Espere healthy novamente antes da próxima consulta.\ndocker compose exec db psql -U aluno -d estudos -c \"SELECT * FROM marcador;\"\n# Backup em formato custom dentro do container; copie para o computador.\ndocker compose exec db pg_dump -U aluno -d estudos -Fc -f /tmp/estudos.dump\ndocker compose cp db:/tmp/estudos.dump ./estudos.dump\n# Banco restaurado novo (se já existir, escolha outro nome).\ndocker compose exec db createdb -U aluno estudos_restaurado\ndocker compose cp ./estudos.dump db:/tmp/restaurar.dump\ndocker compose exec db pg_restore -U aluno -d estudos_restaurado --exit-on-error /tmp/restaurar.dump\ndocker compose exec db psql -U aluno -d estudos_restaurado -c \"SELECT * FROM marcador;\"\n# Para parar preservando volume:\ndocker compose down\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Docker · instalação Windows",
                "url": "https://docs.docker.com/desktop/setup/install/windows-install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · instalação macOS",
                "url": "https://docs.docker.com/desktop/setup/install/mac-install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker Engine · Linux",
                "url": "https://docs.docker.com/engine/install/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · Compose",
                "url": "https://docs.docker.com/compose/gettingstarted/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Docker · redes no Compose",
                "url": "https://docs.docker.com/compose/how-tos/networking/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · imagem oficial",
                "url": "https://hub.docker.com/_/postgres",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "db-relational",
        "title": "Bancos relacionais na prática",
        "level": "Intermediário",
        "number": "03",
        "description": "PostgreSQL, MariaDB, SQLite e Firebird: recursos e diferenças de uso.",
        "resources": [
          {
            "kind": "doc",
            "title": "PostgreSQL · Tutorial oficial",
            "url": "https://www.postgresql.org/docs/current/tutorial.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MariaDB · Guia de primeiros comandos",
            "url": "https://mariadb.com/docs/server/mariadb-quickstart-guides/mariadb-usage-guide",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "SQLite · Quando usar um banco embarcado",
            "url": "https://www.sqlite.org/whentouse.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Firebird 5 · Referência oficial da linguagem",
            "url": "https://firebirdsql.org/file/documentation/chunk/en/refdocs/fblangref50/firebird-50-language-reference.html",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Database Design, 2ª edição · BCcampus / livro aberto",
            "url": "https://opentextbc.ca/dbdesign01/",
            "language": "EN"
          },
          {
            "kind": "video",
            "title": "PostgreSQL: comandos básicos do psql · Bóson",
            "url": "https://www.youtube.com/watch?v=Ft3F7wWA-x8",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "MariaDB no Ubuntu 20.04 · Bóson / aula de 2021",
            "url": "https://www.youtube.com/watch?v=ixKpfUPsO9M",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "SQLite com Python #1 · Professor Neto Paschoal",
            "url": "https://www.youtube.com/watch?v=jYUDi83tJXc",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Bate-papo sobre Firebird 4 · Firebird Developers Day",
            "url": "https://www.youtube.com/watch?v=Wjm4nYO5_xs",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "db-postgres",
            "title": "PostgreSQL: conexão, integridade e consultas verificáveis",
            "minutes": 75,
            "concept": "PostgreSQL é um servidor relacional: clientes como psql enviam SQL a um processo que gerencia bancos, transações e permissões. Pratique tipos explícitos, chaves e consultas antes de explorar extensões.",
            "objectives": [
              "Preparar um laboratório isolado e identificar cliente, mecanismo e banco.",
              "Executar um exemplo completo, verificar resultados e proteger as regras dos dados.",
              "Adaptar consultas ao dialeto e registrar evidências dos exercícios."
            ],
            "exercise": "Nos dados originais, conclua Beto em uma transação confirmada e demonstre que SQL passou a ter duas conclusões.",
            "code": "CREATE TABLE cursos (\n  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  titulo TEXT NOT NULL UNIQUE,\n  carga INTEGER NOT NULL CHECK (carga > 0)\n);\nCREATE TABLE matriculas (\n  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  curso_id INTEGER NOT NULL REFERENCES cursos(id),\n  aluno TEXT NOT NULL,\n  concluida BOOLEAN NOT NULL DEFAULT FALSE,\n  UNIQUE(curso_id, aluno)\n);\nINSERT INTO cursos(titulo, carga) VALUES ('SQL', 20), ('Python', 30);\nINSERT INTO matriculas(curso_id, aluno, concluida)\nVALUES (1, 'Ana', TRUE), (1, 'Beto', FALSE), (2, 'Ana', FALSE);\nSELECT c.titulo, COUNT(m.id) AS inscritos,\n       COUNT(*) FILTER (WHERE m.concluida) AS concluidos\nFROM cursos c LEFT JOIN matriculas m ON m.curso_id = c.id\nGROUP BY c.id, c.titulo ORDER BY c.titulo;\nBEGIN;\nUPDATE matriculas SET concluida = TRUE WHERE id = 2;\nROLLBACK;\nSELECT aluno, concluida FROM matriculas WHERE id = 2;",
            "docs": [
              {
                "kind": "doc",
                "title": "PostgreSQL · instalação e primeiros passos",
                "url": "https://www.postgresql.org/docs/current/tutorial.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · psql",
                "url": "https://www.postgresql.org/docs/current/app-psql.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · CREATE TABLE",
                "url": "https://www.postgresql.org/docs/current/sql-createtable.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-mariadb",
            "title": "MariaDB: InnoDB, tipos e transações de aplicação",
            "minutes": 75,
            "concept": "MariaDB é um servidor relacional com dialeto próprio e forte relação histórica com MySQL. InnoDB fornece transações e chaves estrangeiras; compatibilidade de conceitos não garante compatibilidade de toda sintaxe.",
            "objectives": [
              "Preparar um laboratório isolado e identificar cliente, mecanismo e banco.",
              "Executar um exemplo completo, verificar resultados e proteger as regras dos dados.",
              "Adaptar consultas ao dialeto e registrar evidências dos exercícios."
            ],
            "exercise": "Adicione Git sem matrículas e obtenha somente cursos sem inscrições.",
            "code": "CREATE TABLE cursos (\n id INT AUTO_INCREMENT PRIMARY KEY,\n titulo VARCHAR(100) NOT NULL UNIQUE,\n carga INT NOT NULL CHECK(carga > 0)\n) ENGINE=InnoDB;\nCREATE TABLE matriculas (\n id INT AUTO_INCREMENT PRIMARY KEY,\n curso_id INT NOT NULL,\n aluno VARCHAR(80) NOT NULL,\n concluida TINYINT NOT NULL DEFAULT 0 CHECK(concluida IN (0,1)),\n CONSTRAINT fk_matriculas_curso FOREIGN KEY(curso_id) REFERENCES cursos(id),\n UNIQUE(curso_id,aluno)\n) ENGINE=InnoDB;\nINSERT INTO cursos(titulo,carga) VALUES ('SQL',20),('Python',30);\nINSERT INTO matriculas(curso_id,aluno,concluida)\nVALUES (1,'Ana',1),(1,'Beto',0),(2,'Ana',0);\nSELECT c.titulo,COUNT(m.id) AS inscritos,\n SUM(CASE WHEN m.concluida=1 THEN 1 ELSE 0 END) AS concluidos\nFROM cursos c LEFT JOIN matriculas m ON m.curso_id=c.id\nGROUP BY c.id,c.titulo ORDER BY c.titulo;\nSTART TRANSACTION;\nUPDATE matriculas SET concluida=1 WHERE id=2;\nROLLBACK;\nSELECT aluno,concluida FROM matriculas WHERE id=2;",
            "docs": [
              {
                "kind": "doc",
                "title": "MariaDB · cliente de linha de comando",
                "url": "https://mariadb.com/docs/server/clients-and-utilities/mariadb-client",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MariaDB · CREATE TABLE",
                "url": "https://mariadb.com/docs/server/server-usage/tables/create-table",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MariaDB · AUTO_INCREMENT",
                "url": "https://mariadb.com/docs/server/reference/data-types/auto_increment",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-sqlite",
            "title": "SQLite: SQL local com Python e parâmetros seguros",
            "minutes": 75,
            "concept": "SQLite executa dentro do processo da aplicação e pode armazenar uma base em um arquivo. É útil para estudos e aplicações locais, com SQL relacional, restrições e transações; seu modelo de implantação difere de um servidor.",
            "objectives": [
              "Preparar um laboratório isolado e identificar cliente, mecanismo e banco.",
              "Executar um exemplo completo, verificar resultados e proteger as regras dos dados.",
              "Adaptar consultas ao dialeto e registrar evidências dos exercícios."
            ],
            "exercise": "Crie um backup em memória do banco original e confirme que há três matrículas, sem alterar o banco de origem. Execute antes do finally e antes dos demais exercícios.",
            "code": "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")\ntry:\n    con.execute(\"PRAGMA foreign_keys = ON\")\n    assert con.execute(\"PRAGMA foreign_keys\").fetchone()[0] == 1\n    con.executescript(\"\"\"\n        CREATE TABLE cursos (\n            id INTEGER PRIMARY KEY,\n            titulo TEXT NOT NULL UNIQUE\n        );\n        CREATE TABLE matriculas (\n            id INTEGER PRIMARY KEY,\n            curso_id INTEGER NOT NULL REFERENCES cursos(id),\n            aluno TEXT NOT NULL,\n            concluida INTEGER NOT NULL DEFAULT 0 CHECK(concluida IN (0,1)),\n            UNIQUE(curso_id, aluno)\n        );\n    \"\"\")\n    with con:\n        con.executemany(\"INSERT INTO cursos VALUES (?, ?)\", [(1,\"SQL\"),(2,\"Python\")])\n        con.executemany(\"INSERT INTO matriculas VALUES (?, ?, ?, ?)\",\n                        [(1,1,\"Ana\",1),(2,1,\"Beto\",0),(3,2,\"Ana\",0)])\n    linhas = con.execute(\"\"\"\n        SELECT c.titulo, COUNT(m.id),\n               SUM(CASE WHEN m.concluida=1 THEN 1 ELSE 0 END)\n        FROM cursos c LEFT JOIN matriculas m ON m.curso_id=c.id\n        GROUP BY c.id,c.titulo ORDER BY c.titulo\n    \"\"\").fetchall()\n    print(linhas)\n    nome = \"Beto\"\n    print(con.execute(\"SELECT concluida FROM matriculas WHERE aluno=?\", (nome,)).fetchall())\n    try:\n        with con:\n            con.execute(\"UPDATE matriculas SET concluida=1 WHERE id=2\")\n            con.execute(\"INSERT INTO matriculas(curso_id,aluno) VALUES (?,?)\", (999,\"Eva\"))\n    except sqlite3.IntegrityError:\n        print(\"Transação revertida\")\n    print(con.execute(\"SELECT concluida FROM matriculas WHERE id=2\").fetchone()[0])\nfinally:\n    con.close()",
            "docs": [
              {
                "kind": "doc",
                "title": "Python · sqlite3",
                "url": "https://docs.python.org/3/library/sqlite3.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · chaves estrangeiras",
                "url": "https://www.sqlite.org/foreignkeys.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · tipos",
                "url": "https://www.sqlite.org/datatype3.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-firebird",
            "title": "Firebird: isql, identidade e transações explícitas",
            "minutes": 75,
            "concept": "Firebird é um mecanismo relacional com SQL e transações. O cliente isql permite estudar seu comportamento diretamente; arquivos .fdb, identidade e controle transacional devem ser usados conforme a versão do servidor.",
            "objectives": [
              "Preparar um laboratório isolado e identificar cliente, mecanismo e banco.",
              "Executar um exemplo completo, verificar resultados e proteger as regras dos dados.",
              "Adaptar consultas ao dialeto e registrar evidências dos exercícios."
            ],
            "exercise": "Confirme a conclusão de Beto e escreva uma consulta que prove duas conclusões em SQL.",
            "code": "CREATE TABLE cursos (\n id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\n titulo VARCHAR(100) NOT NULL UNIQUE,\n carga INTEGER NOT NULL CHECK(carga > 0)\n);\nCREATE TABLE matriculas (\n id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\n curso_id INTEGER NOT NULL REFERENCES cursos(id),\n aluno VARCHAR(80) NOT NULL,\n concluida BOOLEAN DEFAULT FALSE NOT NULL,\n UNIQUE(curso_id,aluno)\n);\nCOMMIT;\nINSERT INTO cursos(titulo,carga) VALUES ('SQL',20);\nINSERT INTO cursos(titulo,carga) VALUES ('Python',30);\nINSERT INTO matriculas(curso_id,aluno,concluida) VALUES (1,'Ana',TRUE);\nINSERT INTO matriculas(curso_id,aluno,concluida) VALUES (1,'Beto',FALSE);\nINSERT INTO matriculas(curso_id,aluno,concluida) VALUES (2,'Ana',FALSE);\nCOMMIT;\nSELECT c.titulo,COUNT(m.id) AS inscritos,\n SUM(CASE WHEN m.concluida IS TRUE THEN 1 ELSE 0 END) AS concluidos\nFROM cursos c LEFT JOIN matriculas m ON m.curso_id=c.id\nGROUP BY c.id,c.titulo ORDER BY c.titulo;\nCOMMIT;\nUPDATE matriculas SET concluida=TRUE WHERE id=2;\nROLLBACK;\nSELECT aluno,concluida FROM matriculas WHERE id=2;\nCOMMIT;",
            "docs": [
              {
                "kind": "doc",
                "title": "Firebird 5 · guia de início",
                "url": "https://www.firebirdsql.org/file/documentation/html/en/firebirddocs/qsg5/firebird-5-quickstartguide.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Firebird · cliente isql",
                "url": "https://firebirdsql.org/file/documentation/html/en/firebirddocs/isql/firebird-isql.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Firebird 5 · referência de linguagem",
                "url": "https://firebirdsql.org/file/documentation/html/en/refdocs/fblangref50/firebird-50-language-reference.html",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "db-nosql",
        "title": "NoSQL e MongoDB",
        "level": "Intermediário",
        "number": "04",
        "description": "Documentos, outras famílias de dados e consultas orientadas ao acesso.",
        "resources": [
          {
            "kind": "doc",
            "title": "MongoDB · Famílias e conceitos de NoSQL",
            "url": "https://www.mongodb.com/resources/basics/databases/nosql-explained",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MongoDB · Operações CRUD",
            "url": "https://www.mongodb.com/docs/manual/crud/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MongoDB · Modelagem de documentos",
            "url": "https://www.mongodb.com/docs/manual/data-modeling/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MongoDB · Pipelines de agregação",
            "url": "https://www.mongodb.com/docs/manual/core/aggregation-pipeline/",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "MongoDB · Manual completo gratuito",
            "url": "https://www.mongodb.com/pt-br/docs/manual/",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "MongoDB fundamental em 1 hora · Hora de Codar",
            "url": "https://www.youtube.com/watch?v=x9tC0eK0GtA",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "db-nosql-models",
            "title": "NoSQL: documentos, chave-valor e grafos",
            "minutes": 75,
            "concept": "NoSQL reúne famílias de bancos, não um único produto ou linguagem. MongoDB trabalha com documentos; Redis é conhecido por estruturas chave-valor; Cassandra organiza dados em famílias de colunas; Neo4j modela grafos. Escolha a representação a partir das consultas e garantias necessárias. NoSQL não significa ausência de esquema, impossibilidade de transações ou desempenho automaticamente superior.",
            "objectives": [
              "Relacionar famílias de bancos a padrões de consulta.",
              "Comparar consistência, transações e distribuição por produto.",
              "Modele de acordo com o acesso esperado.",
              "Verificar resultados e explicar os limites do laboratório com casos válidos e inválidos."
            ],
            "exercise": "Escreva uma decisão para um app individual offline de anotações e diga qual requisito futuro justificaria revisá-la.",
            "code": "DOCUMENTO: curso\n{ id: \"dados\", titulo: \"Dados\",\n  recursos: [{tipo: \"livro\", titulo: \"SQL inicial\"}] }\nPergunta: mostrar um curso com seus poucos recursos.\n\nCHAVE-VALOR: sessao:abc -> {usuario: 7, expira: \"18:00\"}\nPergunta: quem possui a sessão abc?\n\nCOLUNAS AMPLAS: partição (sensor=9, dia=2026-01-01)\n  10:00 -> 21; 10:01 -> 22\nPergunta: leituras do sensor 9 naquele dia, por horário.\n\nGRAFO: HTML -> JavaScript -> DOM\nPergunta: quais pré-requisitos indiretos levam a DOM?",
            "docs": [
              {
                "kind": "doc",
                "title": "Redis · Documentação oficial",
                "url": "https://redis.io/docs/latest/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Apache Cassandra · Documentação",
                "url": "https://cassandra.apache.org/doc/latest/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Neo4j · Documentação oficial",
                "url": "https://neo4j.com/docs/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MongoDB · Modelagem de dados",
                "url": "https://www.mongodb.com/docs/manual/data-modeling/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-mongo-crud",
            "title": "MongoDB: documentos, coleções e CRUD",
            "minutes": 75,
            "concept": "MongoDB armazena documentos BSON em coleções. Cada documento tem um _id; campos podem conter arrays e objetos. No mongosh, use insertOne, find, updateOne e deleteOne com filtros explícitos. Operações de escrita em um documento são atômicas. Para relacionamentos, avalie incorporar dados lidos juntos ou referenciar entidades independentes.",
            "objectives": [
              "Criar, consultar e alterar documentos pelo mongosh.",
              "Escolher entre incorporação e referência com base no acesso e no crescimento.",
              "Coleções reúnem documentos com identidade _id.",
              "Verificar resultados e explicar os limites do laboratório com casos válidos e inválidos."
            ],
            "exercise": "Crie uma lição temporária x9, consulte-a, remova-a e prove que a1 permanece.",
            "code": "const lab = db.getSiblingDB(\"tech_hub_aula_crud\");\nlab.licoes.insertMany([\n { _id:\"a1\", titulo:\"SELECT\", minutos:30, concluida:false,\n   tags:[\"sql\",\"basico\"], recurso:{tipo:\"texto\",titulo:\"Primeira consulta\"} },\n { _id:\"a2\", titulo:\"JOIN\", minutos:40, concluida:false, tags:[\"sql\"] },\n { _id:\"a3\", titulo:\"Documentos\", minutos:25, concluida:true, tags:[\"nosql\"] }\n]);\nlab.licoes.find({concluida:false},{_id:0,titulo:1}).sort({titulo:1});\nlab.licoes.updateOne({_id:\"a1\"},{$set:{concluida:true}});\nlab.licoes.find({concluida:false},{_id:0,titulo:1}).sort({titulo:1});",
            "docs": [
              {
                "kind": "doc",
                "title": "MongoDB · Operações CRUD",
                "url": "https://www.mongodb.com/docs/manual/crud/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MongoDB · Modelagem de documentos",
                "url": "https://www.mongodb.com/docs/manual/data-modeling/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-mongo-pipelines",
            "title": "MongoDB: validação, índices e aggregation",
            "minutes": 75,
            "concept": "Esquema flexível também precisa de regras: valide tipos e campos necessários quando isso fizer parte do contrato. Índices devem acompanhar filtros e ordenações reais. Um pipeline de aggregation encadeia estágios como $match, $group e $sort. Observe a quantidade de documentos examinados e o resultado antes de adicionar índices ou replicar dados.",
            "objectives": [
              "Construir um pipeline de resumo a partir de documentos.",
              "Relacionar validação de esquema e índices ao uso da aplicação.",
              "Valide presença e tipo separadamente.",
              "Verificar resultados e explicar os limites do laboratório com casos válidos e inválidos."
            ],
            "exercise": "Teste separadamente duração zero e ausência de concluida. Depois confirme que a contagem continua três.",
            "code": "const lab = db.getSiblingDB(\"tech_hub_aula_pipeline\");\nlab.createCollection(\"licoes\",{validator:{$jsonSchema:{\n bsonType:\"object\", required:[\"trilha\",\"minutos\",\"concluida\"],\n properties:{\n   trilha:{bsonType:\"string\"},\n   minutos:{bsonType:[\"int\",\"long\",\"double\",\"decimal\"],minimum:1},\n   concluida:{bsonType:\"bool\"}\n }\n}}});\nlab.licoes.insertMany([\n {_id:1,trilha:\"Dados\",minutos:Double(30),concluida:false},\n {_id:2,trilha:\"Dados\",minutos:Double(40),concluida:false},\n {_id:3,trilha:\"Python\",minutos:Double(20),concluida:true}\n]);\nlab.licoes.createIndex({concluida:1,trilha:1});\nlab.licoes.aggregate([\n {$match:{concluida:false}},\n {$group:{_id:\"$trilha\",total:{$sum:\"$minutos\"}}},\n {$sort:{total:-1,_id:1}}\n]);\nlab.licoes.find({concluida:false}).explain(\"executionStats\");",
            "docs": [
              {
                "kind": "doc",
                "title": "MongoDB · Pipelines de agregação",
                "url": "https://www.mongodb.com/docs/manual/core/aggregation-pipeline/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MongoDB · Validação de esquema",
                "url": "https://www.mongodb.com/docs/manual/core/schema-validation/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MongoDB · Índices",
                "url": "https://www.mongodb.com/docs/manual/indexes/",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "db-engineering",
        "title": "Dados confiáveis, do projeto à operação",
        "level": "Intermediário · operação",
        "number": "05",
        "description": "Desempenho, acesso seguro, recuperação e decisões de arquitetura.",
        "resources": [
          {
            "kind": "doc",
            "title": "PostgreSQL · Entendendo EXPLAIN",
            "url": "https://www.postgresql.org/docs/current/using-explain.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "PostgreSQL · Backup e restauração com SQL dump",
            "url": "https://www.postgresql.org/docs/current/backup-dump.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · Tutorial do módulo sqlite3",
            "url": "https://docs.python.org/pt-br/3/library/sqlite3.html",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "MongoDB · Modelagem de documentos",
            "url": "https://www.mongodb.com/docs/manual/data-modeling/",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Database Design, 2ª edição · BCcampus / livro aberto",
            "url": "https://opentextbc.ca/dbdesign01/",
            "language": "EN"
          },
          {
            "kind": "video",
            "title": "Modelagem de bancos com projeto prático · Bóson",
            "url": "https://www.youtube.com/watch?v=Kd1yqYjylCg",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "db-performance",
            "title": "Índices e planos de execução",
            "minutes": 75,
            "concept": "Índices podem reduzir leituras, mas consomem espaço e têm custo nas escritas. A ordem das colunas de um índice composto importa. Leia o plano de execução e compare estimativas com observações; uma varredura sequencial pode ser a melhor escolha em uma tabela pequena. EXPLAIN ANALYZE executa a consulta, por isso use um SELECT no laboratório.",
            "objectives": [
              "Interpretar o caminho de acesso e a quantidade de linhas.",
              "Medir o efeito de um índice sem presumir que ele sempre será usado.",
              "Meça consultas representativas antes de otimizar.",
              "Verificar resultados e explicar os limites do laboratório com casos válidos e inválidos."
            ],
            "exercise": "Escreva um relatório de desempenho sem inventar tempos. Que dados precisam acompanhar a hipótese do índice?",
            "code": "CREATE TABLE perf_licoes (\n id INTEGER PRIMARY KEY, trilha_id INTEGER NOT NULL, titulo TEXT NOT NULL\n);\nINSERT INTO perf_licoes(id,trilha_id,titulo)\nSELECT n,n % 100,'Licao ' || n FROM generate_series(1,10000) AS g(n);\nANALYZE perf_licoes;\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT id,titulo FROM perf_licoes WHERE trilha_id=7 ORDER BY id;\nCREATE INDEX idx_perf_trilha_id ON perf_licoes(trilha_id,id);\nANALYZE perf_licoes;\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT id,titulo FROM perf_licoes WHERE trilha_id=7 ORDER BY id;\nSELECT COUNT(*) AS encontrados FROM perf_licoes WHERE trilha_id=7;",
            "docs": [
              {
                "kind": "doc",
                "title": "PostgreSQL · Entendendo EXPLAIN",
                "url": "https://www.postgresql.org/docs/current/using-explain.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · Índices",
                "url": "https://www.postgresql.org/docs/current/indexes.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · EXPLAIN QUERY PLAN",
                "url": "https://www.sqlite.org/eqp.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-security",
            "title": "Consultas parametrizadas e permissões",
            "minutes": 75,
            "concept": "Dados digitados pelo usuário devem ser enviados como parâmetros, separados da instrução SQL. Placeholders representam valores, não nomes de tabelas ou colunas: identificadores dinâmicos exigem uma lista permitida ou composição segura do driver. Restrinja as permissões da conta da aplicação e mantenha credenciais no servidor. O navegador acessa uma API; não deve receber uma senha de banco.",
            "objectives": [
              "Escrever consultas parametrizadas sem interpolação de valores.",
              "Separar interface, API, autenticação e autorização de acesso aos dados.",
              "Separe valores da instrução SQL.",
              "Verificar resultados e explicar os limites do laboratório com casos válidos e inválidos."
            ],
            "exercise": "Escreva renomear que altera um material somente se pertencer à identidade confiável. Teste usuário 1 tentando alterar id 2.",
            "code": "import sqlite3\nfrom contextlib import closing\n\ndef buscar(conexao, usuario_id, titulo):\n    return conexao.execute(\n        \"SELECT id,titulo FROM materiais WHERE usuario_id=? AND titulo=? ORDER BY id\",\n        (usuario_id, titulo)\n    ).fetchall()\n\nwith closing(sqlite3.connect(\":memory:\")) as conexao:\n    with conexao:\n        conexao.execute(\"CREATE TABLE materiais(id INTEGER PRIMARY KEY,usuario_id INTEGER,titulo TEXT)\")\n        conexao.executemany(\"INSERT INTO materiais VALUES(?,?,?)\", [\n            (1,1,\"Guia d'água\"), (2,2,\"Guia d'água\"), (3,1,\"SQL\")\n        ])\n    print(buscar(conexao, 1, \"Guia d'água\"))\n    print(buscar(conexao, 1, \"Inexistente\"))\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Python · Tutorial do módulo sqlite3",
                "url": "https://docs.python.org/pt-br/3/library/sqlite3.html",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · Roles e privilégios",
                "url": "https://www.postgresql.org/docs/current/user-manag.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-recovery",
            "title": "Backups, restauração e migrações",
            "minutes": 75,
            "concept": "Um backup só é confiável quando a restauração é testada. Defina RPO, a perda máxima de dados aceitável, e RTO, o tempo máximo de recuperação. Versione migrações e ensaie mudanças de esquema em uma base de teste. Backups lógicos, físicos e recuperação por logs têm propósitos diferentes; siga a ferramenta de cada banco e não copie arquivos em uso sem um procedimento consistente.",
            "objectives": [
              "Restaurar uma cópia em outra base e validar seu conteúdo.",
              "Planejar migrações com verificação e estratégia de recuperação.",
              "Backup precisa de teste de recuperação.",
              "Verificar resultados e explicar os limites do laboratório com casos válidos e inválidos."
            ],
            "exercise": "Escreva um plano para acrescentar resumo sem exigir texto de todas as linhas imediatamente e inclua teste de recuperação.",
            "code": "import sqlite3\nfrom contextlib import closing\n\nwith closing(sqlite3.connect(\":memory:\")) as origem, closing(sqlite3.connect(\":memory:\")) as copia:\n    with origem:\n        origem.execute(\"CREATE TABLE licoes(id INTEGER PRIMARY KEY,titulo TEXT NOT NULL)\")\n        origem.execute(\"INSERT INTO licoes VALUES(1,'SQL')\")\n    origem.backup(copia)\n    print(copia.execute(\"SELECT id,titulo FROM licoes ORDER BY id\").fetchall())\n    with copia:\n        copia.execute(\"ALTER TABLE licoes ADD COLUMN resumo TEXT\")\n        copia.execute(\"UPDATE licoes SET resumo=? WHERE id=?\", (\"Primeiras consultas\",1))\n    print(copia.execute(\"SELECT titulo,resumo FROM licoes WHERE id=1\").fetchone())\n    print([coluna[1] for coluna in origem.execute(\"PRAGMA table_info(licoes)\")])\n",
            "docs": [
              {
                "kind": "doc",
                "title": "PostgreSQL · Backup e restauração com SQL dump",
                "url": "https://www.postgresql.org/docs/current/backup-dump.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "SQLite · API de backup",
                "url": "https://www.sqlite.org/backup.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Firebird · Ferramenta gbak",
                "url": "https://firebirdsql.org/file/documentation/html/en/firebirddocs/gbak/firebird-gbak.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "db-project",
            "title": "Projeto: escolhendo o banco certo",
            "minutes": 75,
            "concept": "A escolha do banco envolve formato dos dados, consultas, integridade, concorrência e operação. SQLite simplifica um aplicativo local; bancos cliente-servidor atendem compartilhamento e controle centralizado; documentos podem acomodar catálogos variáveis. Esses critérios não são regras absolutas. Relacionais também oferecem JSON, e bancos documentais podem ter transações: valide recursos na versão escolhida.",
            "objectives": [
              "Justificar a escolha de banco a partir de requisitos concretos.",
              "Comparar os resultados de duas modelagens e documentar limitações.",
              "Valide requisitos com dados que exponham erros.",
              "Verificar resultados e explicar os limites do laboratório com casos válidos e inválidos."
            ],
            "exercise": "Desenhe o reforço do esquema que exige matrícula na trilha da lição. Declare as chaves necessárias e o caso inválido que deve falhar.",
            "code": "PRAGMA foreign_keys=ON;\nCREATE TABLE estudantes(id INTEGER PRIMARY KEY,nome TEXT NOT NULL);\nCREATE TABLE trilhas(id INTEGER PRIMARY KEY,nome TEXT NOT NULL);\nCREATE TABLE licoes(id INTEGER PRIMARY KEY,trilha_id INTEGER NOT NULL REFERENCES trilhas(id),titulo TEXT NOT NULL);\nCREATE TABLE matriculas(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),trilha_id INTEGER NOT NULL REFERENCES trilhas(id),\n PRIMARY KEY(estudante_id,trilha_id));\nCREATE TABLE progresso(estudante_id INTEGER NOT NULL REFERENCES estudantes(id),licao_id INTEGER NOT NULL REFERENCES licoes(id),\n concluida INTEGER NOT NULL CHECK(concluida IN(0,1)),PRIMARY KEY(estudante_id,licao_id));\nINSERT INTO estudantes VALUES(1,'Ana'),(2,'Beto');\nINSERT INTO trilhas VALUES(1,'Dados'),(2,'Python');\nINSERT INTO licoes VALUES(10,1,'SELECT'),(11,1,'JOIN');\nINSERT INTO matriculas VALUES(1,1),(1,2),(2,1);\nINSERT INTO progresso VALUES(1,10,1),(2,10,0);\nSELECT e.nome AS estudante,t.nome AS trilha,COUNT(l.id) AS total,\n SUM(COALESCE(p.concluida,0)) AS concluidas,\n CASE WHEN COUNT(l.id)=0 THEN 0\n ELSE 100.0*SUM(COALESCE(p.concluida,0))/COUNT(l.id) END AS percentual\nFROM matriculas m\nJOIN estudantes e ON e.id=m.estudante_id\nJOIN trilhas t ON t.id=m.trilha_id\nLEFT JOIN licoes l ON l.trilha_id=t.id\nLEFT JOIN progresso p ON p.licao_id=l.id AND p.estudante_id=e.id\nGROUP BY e.id,e.nome,t.id,t.nome ORDER BY e.id,t.id;",
            "docs": [
              {
                "kind": "doc",
                "title": "SQLite · Quando usar um banco embarcado",
                "url": "https://www.sqlite.org/whentouse.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "PostgreSQL · Tutorial oficial",
                "url": "https://www.postgresql.org/docs/current/tutorial.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MongoDB · Modelagem de documentos",
                "url": "https://www.mongodb.com/docs/manual/data-modeling/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MariaDB · Guia de primeiros comandos",
                "url": "https://mariadb.com/docs/server/mariadb-quickstart-guides/mariadb-usage-guide",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Firebird 5 · Referência oficial da linguagem",
                "url": "https://firebirdsql.org/file/documentation/chunk/en/refdocs/fblangref50/firebird-50-language-reference.html",
                "language": "EN"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "ai",
    "title": "Engenharia de IA",
    "subtitle": "Da ideia à avaliação de um sistema.",
    "icon": "spark",
    "color": "#b39afa",
    "range": "Fundamentos → Engenharia aplicada",
    "description": "Entenda modelos, prepare dados, integre ferramentas e avalie sistemas de IA com exemplos locais e seis projetos verificáveis.",
    "prerequisite": "Os conceitos iniciais não exigem IA prévia. Para os laboratórios, conclua Python, JSON, funções e testes; para conexão real, acrescente HTTP/APIs e segurança de credenciais.",
    "project": "Contratos de saída, recuperação de evidências, ferramentas autorizadas, workflows limitados, avaliação e assistente integrado com testes.",
    "modules": [
      {
        "id": "ai-basic",
        "title": "Fundamentos e contratos",
        "level": "Básico",
        "number": "01",
        "description": "Modelos, prompts, contexto, limites e saídas verificáveis.",
        "resources": [
          {
            "kind": "doc",
            "title": "Hugging Face · curso aberto de LLMs",
            "url": "https://huggingface.co/learn/llm-course/en/chapter1/1",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · biblioteca padrão",
            "url": "https://docs.python.org/3/library/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Anthropic · Engenharia de contexto",
            "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "Generative AI for Beginners · Microsoft",
            "url": "https://github.com/microsoft/generative-ai-for-beginners",
            "language": "EN / traduções"
          },
          {
            "kind": "video",
            "title": "Engenharia de Prompt na Prática · Curso em Vídeo",
            "url": "https://www.youtube.com/watch?v=_3lq1Mg4lYw",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "ai-llms",
            "title": "LLMs: probabilidades, treinamento e limites",
            "minutes": 120,
            "concept": "Entenda o que um modelo aprende, o que acontece ao responder e por que texto convincente exige verificação.",
            "objectives": [
              "Distinguir IA, aprendizado de máquina, aprendizado profundo e modelos de linguagem.",
              "Separar treinamento, inferência, contexto e armazenamento externo.",
              "Estimar recursos sem confundir tokens, palavras, probabilidade e confiança factual."
            ],
            "exercise": "4. Normalize pesos não negativos; trate [0,0] sem dividir por zero.",
            "code": "pesos = {\"estudo\": 6, \"trabalho\": 3, \"viagem\": 1}\ntotal = sum(pesos.values())\nfor palavra, peso in pesos.items():\n    print(f\"{palavra}: {peso / total:.0%}\")\nentrada, reserva_saida, limite = 700, 200, 1000\nprint(\"Cabe:\", entrada + reserva_saida \u003c= limite)\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Hugging Face · curso aberto de LLMs",
                "url": "https://huggingface.co/learn/llm-course/en/chapter1/1",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-prompts",
            "title": "Prompts: tarefa, exemplos e critérios de resposta",
            "minutes": 90,
            "concept": "Transforme um pedido vago em um contrato verificável, usando instruções, exemplos e critérios de aceitação.",
            "objectives": [
              "Escrever objetivo, entrada, restrições e saída esperada.",
              "Usar zero-shot e few-shot sem contaminar o conjunto de avaliação.",
              "Pedir evidências e verificações úteis sem depender de raciocínio interno do modelo."
            ],
            "exercise": "Escreva um plano de comparação entre duas versões de prompt.",
            "code": "import json\n\ndef montar_prompt(texto):\n    if not isinstance(texto, str) or not texto.strip():\n        raise ValueError(\"texto obrigatorio\")\n    return {\n        \"tarefa\": \"Classifique como duvida, erro ou sugestao; se ambiguo, solicite esclarecimento.\",\n        \"exemplos\": [{\"entrada\": \"Nao consigo entrar\", \"categoria\": \"erro\"}],\n        \"dados\": {\"texto\": texto},\n        \"saida\": \"categoria e evidencia curta; nao invente fatos\"\n    }\n\np = montar_prompt('Como altero meu nome?')\nprint(p['dados']['texto'])\nprint(len(p['exemplos']))\nassert json.loads(json.dumps(p)) == p\nprint('estrutura preservada')",
            "docs": [
              {
                "kind": "doc",
                "title": "Anthropic · Engenharia de contexto",
                "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-system",
            "title": "Instruções de sistema, contexto e memória",
            "minutes": 90,
            "concept": "Organize instruções, histórico e evidências mantendo regras de autorização no código.",
            "objectives": [
              "Distinguir instrução de aplicação, solicitação e conteúdo recuperado.",
              "Planejar janela de contexto, reserva de saída e memória persistente.",
              "Aplicar regras de acesso fora do prompt."
            ],
            "exercise": "Defina um registro de memória para preferência de idioma.",
            "code": "def montar_contexto(pergunta, evidencias, entrada_estimada, reserva, limite):\n    if not isinstance(pergunta, str) or not pergunta.strip():\n        raise ValueError('pergunta obrigatoria')\n    if any(type(n) is not int or n \u003c 0 for n in [entrada_estimada, reserva, limite]):\n        raise ValueError('orcamento invalido')\n    if entrada_estimada + reserva > limite:\n        raise ValueError('contexto excedido')\n    return {'instrucao': 'Use evidencias; declare ausencia de informacao.',\n            'pergunta': pergunta, 'evidencias': list(evidencias)}\n\nc = montar_contexto('Qual o prazo?', ['Prazo: 7 dias.'], 600, 200, 1000)\nprint(c['pergunta'])\nprint(c['evidencias'][0])",
            "docs": [
              {
                "kind": "doc",
                "title": "Anthropic · Engenharia de contexto",
                "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "ai-data",
        "title": "Dados, embeddings e RAG",
        "level": "Intermediário · conhecimento",
        "number": "02",
        "description": "Preparação de corpus, busca, evidências, citações e abstenção.",
        "resources": [
          {
            "kind": "doc",
            "title": "Anthropic · Engenharia de contexto",
            "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · Biblioteca padrão",
            "url": "https://docs.python.org/3/library/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Sentence Transformers · Busca semântica",
            "url": "https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "AI Agents for Beginners · Microsoft",
            "url": "https://github.com/microsoft/ai-agents-for-beginners",
            "language": "EN / traduções"
          },
          {
            "kind": "video",
            "title": "RAG: Geração Aumentada de Busca · Microsoft Reactor",
            "url": "https://www.youtube.com/watch?v=GkC8TXNC69Q",
            "language": "PT-BR"
          },
          {
            "kind": "video",
            "title": "Workshop de agentes e MCP · Renato Romão / Reactor",
            "url": "https://www.youtube.com/watch?v=T_C_aFirdBU",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "ai-data",
            "title": "Preparação de dados: origem, limpeza, chunks e permissões",
            "minutes": 90,
            "concept": "Construa uma base recuperável com conteúdo rastreável, atualizado e acessível apenas a quem tem permissão.",
            "objectives": [
              "Definir documentos, metadados e unidades de recuperação.",
              "Entender chunking, sobreposição, deduplicação e atualização.",
              "Manter permissões desde a ingestão até a busca."
            ],
            "exercise": "Planeje substituir manual-v1 por manual-v2 sem deixar resultados antigos ativos.",
            "code": "def dividir(texto, tamanho=5, sobreposicao=1):\n    if type(tamanho) is not int or type(sobreposicao) is not int:\n        raise ValueError('parametros invalidos')\n    if tamanho \u003c= 0 or not 0 \u003c= sobreposicao \u003c tamanho:\n        raise ValueError('parametros invalidos')\n    palavras = texto.split()\n    partes = []\n    inicio = 0\n    while inicio \u003c len(palavras):\n        partes.append(' '.join(palavras[inicio:inicio+tamanho]))\n        if inicio + tamanho >= len(palavras):\n            break\n        inicio += tamanho - sobreposicao\n    return partes\n\ndocumento = {'id': 'manual-v1', 'acesso': ['ana'], 'texto': 'um dois tres quatro cinco seis sete oito'}\nchunks = [{'id': f\"{documento['id']}:{i}\", 'origem': documento['id'],\n           'acesso': list(documento['acesso']), 'texto': parte}\n          for i, parte in enumerate(dividir(documento['texto']))]\nfor c in chunks:\n    print(c['id'], c['texto'])",
            "docs": [
              {
                "kind": "doc",
                "title": "Anthropic · Engenharia de contexto",
                "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-embeddings",
            "title": "Embeddings e busca: vetores, cosseno e ranking",
            "minutes": 90,
            "concept": "Entenda como representar e comparar itens sem confundir proximidade numérica com verdade ou autorização.",
            "objectives": [
              "Calcular produto escalar, norma e similaridade do cosseno.",
              "Distinguir busca lexical, semântica, híbrida e reranking.",
              "Avaliar recuperação com perguntas e documentos esperados."
            ],
            "exercise": "Calcule recall e precisão se os relevantes são A e C e os recuperados são A e B.",
            "code": "from math import sqrt, isfinite\n\ndef cosseno(a, b):\n    if not a or len(a) != len(b):\n        raise ValueError('dimensoes invalidas')\n    if any(type(x) not in (int, float) or not isfinite(x) for x in [*a, *b]):\n        raise ValueError('coordenada invalida')\n    na, nb = sqrt(sum(x*x for x in a)), sqrt(sum(x*x for x in b))\n    if na == 0 or nb == 0:\n        raise ValueError('vetor nulo')\n    return sum(x*y for x,y in zip(a,b)) / (na*nb)\n\nconsulta = [1, 0]\ncandidatos = {'A': [0.8, 0.6], 'B': [0, 1]}\nranking = sorted(((id, cosseno(consulta,v)) for id,v in candidatos.items()),\n                 key=lambda item: (-item[1], item[0]))\nfor id, score in ranking:\n    print(id, f'{score:.2f}')",
            "docs": [
              {
                "kind": "doc",
                "title": "Sentence Transformers · Busca semântica",
                "url": "https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-rag",
            "title": "RAG: recuperar, fundamentar, citar e abster-se",
            "minutes": 90,
            "concept": "Monte um fluxo de resposta apoiado em documentos, entendendo as falhas de cada etapa.",
            "objectives": [
              "Explicar Retrieval-Augmented Generation e sua arquitetura.",
              "Recuperar evidências autorizadas e preservar referências.",
              "Separar validade de citações, suporte factual e qualidade de recuperação."
            ],
            "exercise": "Crie um caso em que a citação existe mas não sustenta a resposta.",
            "code": "import re\n\ndef termos(texto):\n    return set(re.findall(r'\\w+', texto.lower()))\n\ndef buscar(pergunta, documentos, usuario):\n    candidatos = []\n    for d in documentos:\n        if usuario not in d['acesso']:\n            continue\n        score = len(termos(pergunta) & termos(d['texto']))\n        if score:\n            candidatos.append((score, d['id'], d['texto']))\n    candidatos.sort(key=lambda x: (-x[0], x[1]))\n    return candidatos[:2]\n\ndocs = [{'id':'A', 'texto':'devolucao em sete dias', 'acesso':['ana']},\n        {'id':'B', 'texto':'devolucao interna confidencial', 'acesso':['bia']}]\nr = buscar('devolucao', docs, 'ana')\nprint([item[1] for item in r])\nprint('sem evidencia' if not buscar('garantia', docs, 'ana') else 'encontrado')",
            "docs": [
              {
                "kind": "doc",
                "title": "Anthropic · Engenharia de contexto",
                "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Sentence Transformers · Busca semântica",
                "url": "https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "ai-practical",
        "title": "APIs e ferramentas",
        "level": "Intermediário · integração",
        "number": "03",
        "description": "Contratos, chamadas, validação, autorização e escolhas de bibliotecas.",
        "resources": [
          {
            "kind": "doc",
            "title": "OpenAI · Structured Outputs",
            "url": "https://developers.openai.com/api/docs/guides/structured-outputs",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "OpenAI · Production best practices",
            "url": "https://developers.openai.com/api/docs/guides/production-best-practices",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · json",
            "url": "https://docs.python.org/3/library/json.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "OpenAI · Function calling",
            "url": "https://developers.openai.com/api/docs/guides/function-calling",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · Exceções",
            "url": "https://docs.python.org/3/tutorial/errors.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "LangChain · Overview",
            "url": "https://docs.langchain.com/oss/python/langchain/overview",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "LlamaIndex · Framework",
            "url": "https://developers.llamaindex.ai/python/framework/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · typing Protocol",
            "url": "https://docs.python.org/3/library/typing.html#typing.Protocol",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "ai-api",
            "title": "APIs de modelos: contrato, autenticação e falhas",
            "minutes": 75,
            "concept": "Uma integração confiável transforma entrada em uma requisição, interpreta estados de resposta e valida o resultado antes de usá-lo. JSON bem formado não garante conteúdo correto. A API fica atrás do servidor da aplicação; credenciais e orçamento são responsabilidade do sistema.",
            "objectives": [
              "Separar transporte, validação e regra de negócio.",
              "Tratar recusa, resposta incompleta, limite e erro sem inventar sucesso.",
              "Projetar uso opcional de API real com credencial no servidor e custo controlado."
            ],
            "exercise": "Projete o adaptador real e descreva cinco casos de aceitação sem contratar uma API.",
            "code": "import json\n\nclass FalhaIntegracao(Exception):\n    pass\n\ndef validar(dados):\n    if not isinstance(dados, dict) or set(dados) != {\"categoria\", \"prioridade\"}:\n        raise ValueError(\"Campos inesperados\")\n    if type(dados[\"categoria\"]) is not str or type(dados[\"prioridade\"]) is not str:\n        raise ValueError(\"Tipos inválidos\")\n    if dados[\"categoria\"] not in {\"acesso\", \"cobranca\"}:\n        raise ValueError(\"Categoria inválida\")\n    if dados[\"prioridade\"] not in {\"normal\", \"alta\"}:\n        raise ValueError(\"Prioridade inválida\")\n    return dict(dados)\n\ndef classificar(texto, transporte):\n    if not isinstance(texto, str) or not texto.strip() or len(texto) > 2000:\n        raise ValueError(\"Texto vazio ou acima do limite\")\n    resposta = transporte(texto)\n    if resposta.get(\"status\") != \"completed\":\n        raise FalhaIntegracao(resposta.get(\"status\", \"unknown\"))\n    return validar(json.loads(resposta[\"body\"]))\n\ndef transporte_falso(texto):\n    return {\"status\": \"completed\", \"body\": '{\"categoria\":\"acesso\",\"prioridade\":\"normal\"}'}\n\nprint(classificar(\"Não consigo entrar\", transporte_falso))\nfor estado in (\"refused\", \"incomplete\"):\n    try:\n        classificar(\"Teste\", lambda texto: {\"status\": estado})\n    except FalhaIntegracao as erro:\n        print(\"tratado:\", erro)\nassert classificar(\"Teste\", transporte_falso)[\"categoria\"] == \"acesso\"",
            "docs": [
              {
                "kind": "doc",
                "title": "OpenAI · Structured Outputs",
                "url": "https://developers.openai.com/api/docs/guides/structured-outputs",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "OpenAI · Production best practices",
                "url": "https://developers.openai.com/api/docs/guides/production-best-practices",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · json",
                "url": "https://docs.python.org/3/library/json.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-tools",
            "title": "Ferramentas: da proposta do modelo à execução autorizada",
            "minutes": 75,
            "concept": "Uma tool é uma operação exposta por código com nome, descrição, argumentos e resultado. O modelo propõe a chamada; o programa valida, autoriza e executa. A capacidade de sugerir um argumento não concede ao modelo permissão para alterar o mundo.",
            "objectives": [
              "Construir um despachante com lista explícita de ferramentas.",
              "Validar argumento, identidade e aprovação antes de qualquer efeito.",
              "Distinguir consulta, alteração e repetição idempotente."
            ],
            "exercise": "Desenhe o fluxo para uma ferramenta enviar_email sem duplicar envios após timeout.",
            "code": "chamados = {7: {\"dono\": \"ana\", \"status\": \"aberto\"}}\n\ndef executar(proposta, usuario, aprovado=False):\n    if not isinstance(proposta, dict) or set(proposta) != {\"nome\", \"argumentos\"}:\n        raise ValueError(\"Proposta inválida\")\n    if proposta[\"nome\"] != \"fechar_chamado\":\n        raise ValueError(\"Ferramenta não permitida\")\n    args = proposta[\"argumentos\"]\n    if not isinstance(args, dict) or set(args) != {\"id\"} or type(args[\"id\"]) is not int:\n        raise ValueError(\"Argumentos inválidos\")\n    chamado = chamados.get(args[\"id\"])\n    if chamado is None:\n        raise ValueError(\"Chamado inexistente\")\n    if chamado[\"dono\"] != usuario or aprovado is not True:\n        raise PermissionError(\"Operação não autorizada\")\n    chamado[\"status\"] = \"fechado\"\n    return {\"id\": args[\"id\"], \"status\": chamado[\"status\"]}\n\nproposta = {\"nome\": \"fechar_chamado\", \"argumentos\": {\"id\": 7}}\ntry:\n    executar(proposta, usuario=\"ana\")\nexcept PermissionError:\n    print(\"bloqueado\", chamados[7][\"status\"])\nprint(executar(proposta, usuario=\"ana\", aprovado=True))\nprint(executar(proposta, usuario=\"ana\", aprovado=True))\nassert chamados[7][\"status\"] == \"fechado\"",
            "docs": [
              {
                "kind": "doc",
                "title": "OpenAI · Function calling",
                "url": "https://developers.openai.com/api/docs/guides/function-calling",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Exceções",
                "url": "https://docs.python.org/3/tutorial/errors.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-libraries",
            "title": "APIs diretas, LangChain e LlamaIndex: escolhas conscientes",
            "minutes": 75,
            "concept": "Bibliotecas podem organizar chamadas, recuperação e fluxos, mas não definem sozinhas qualidade, custo ou segurança. Aprenda primeiro os contratos das etapas e depois escolha a abstração que reduz trabalho verificável no seu projeto.",
            "objectives": [
              "Comparar API direta e frameworks com requisitos concretos.",
              "Separar recuperação, geração e validação por interfaces pequenas.",
              "Testar substituição de componentes sem atribuir capacidades irreais à biblioteca."
            ],
            "exercise": "Escreva uma decisão entre funções próprias, API direta e framework para um catálogo de 20 documentos.",
            "code": "documentos = [{\"id\": \"manual-1\", \"texto\": \"O suporte atende em dias úteis.\"}]\n\ndef recuperar(pergunta):\n    return [dict(d) for d in documentos] if \"suporte\" in pergunta.lower() else []\n\ndef gerar_falso(pergunta, trechos):\n    return {\"resposta\": trechos[0][\"texto\"], \"fontes\": [trechos[0][\"id\"]]}\n\ndef responder(pergunta, busca, gerador):\n    trechos = busca(pergunta)\n    if not trechos:\n        return {\"resposta\": \"Sem evidência suficiente.\", \"fontes\": []}\n    resultado = gerador(pergunta, trechos)\n    if not isinstance(resultado, dict) or set(resultado) != {\"resposta\", \"fontes\"}:\n        raise ValueError(\"Resultado inválido\")\n    if not isinstance(resultado[\"resposta\"], str) or not isinstance(resultado[\"fontes\"], list):\n        raise ValueError(\"Tipos inválidos\")\n    ids = {d[\"id\"] for d in trechos}\n    if not resultado[\"fontes\"] or any(type(id) is not str or id not in ids for id in resultado[\"fontes\"]):\n        raise ValueError(\"Referência inválida\")\n    return resultado\n\nprint(responder(\"Quando o suporte atende?\", recuperar, gerar_falso))\nprint(responder(\"Qual a senha?\", recuperar, gerar_falso))\nassert documentos[0][\"id\"] == \"manual-1\"",
            "docs": [
              {
                "kind": "doc",
                "title": "LangChain · Overview",
                "url": "https://docs.langchain.com/oss/python/langchain/overview",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "LlamaIndex · Framework",
                "url": "https://developers.llamaindex.ai/python/framework/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · typing Protocol",
                "url": "https://docs.python.org/3/library/typing.html#typing.Protocol",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "ai-advanced",
        "title": "MCP, skills e workflows",
        "level": "Avançado · integração",
        "number": "04",
        "description": "Protocolos, instruções reutilizáveis, estados, limites e revisão humana.",
        "resources": [
          {
            "kind": "doc",
            "title": "MCP · Arquitetura 2026-07-28",
            "url": "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MCP Python SDK · Primeiros passos",
            "url": "https://py.sdk.modelcontextprotocol.io/get-started/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MCP Python SDK · Código oficial",
            "url": "https://github.com/modelcontextprotocol/python-sdk",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Agent Skills · Especificação aberta",
            "url": "https://agentskills.io/specification",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Anthropic · Workflows e agentes",
            "url": "https://www.anthropic.com/engineering/building-effective-agents",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · Biblioteca padrão",
            "url": "https://docs.python.org/3/library/",
            "language": "EN"
          },
          {
            "kind": "book",
            "title": "MCP for Beginners · Microsoft",
            "url": "https://github.com/microsoft/mcp-for-beginners",
            "language": "EN / traduções"
          },
          {
            "kind": "book",
            "title": "AI Agents for Beginners · Microsoft",
            "url": "https://github.com/microsoft/ai-agents-for-beginners",
            "language": "EN / traduções"
          },
          {
            "kind": "video",
            "title": "Workshop de agentes e MCP · Renato Romão / Reactor",
            "url": "https://www.youtube.com/watch?v=T_C_aFirdBU",
            "language": "PT-BR"
          }
        ],
        "lessons": [
          {
            "id": "ai-mcp",
            "title": "MCP: conectar ferramentas e contexto com contratos versionados",
            "minutes": 75,
            "concept": "Model Context Protocol padroniza a comunicação entre aplicações de IA e servidores que oferecem ferramentas, recursos e prompts. O protocolo facilita integração, mas não substitui autorização, validação de negócio ou avaliação da resposta do modelo.",
            "objectives": [
              "Distinguir host, cliente, servidor, ferramenta, recurso e prompt.",
              "Explicar descoberta, chamada e transporte sem confundir versões do protocolo.",
              "Construir uma simulação verificável e conhecer o caminho opcional para um servidor SDK real."
            ],
            "exercise": "Escreva um plano de interoperabilidade que detecte incompatibilidade de versão e falta de permissão.",
            "code": "# Simulação local parcial; não implementa transporte ou protocolo MCP completo.\ncatalogo = {\"PY\": \"Python básico\"}\nschema = {\"type\": \"object\", \"properties\": {\"codigo\": {\"type\": \"string\"}},\n          \"required\": [\"codigo\"], \"additionalProperties\": False}\n\ndef despachar(metodo, params):\n    if metodo == \"tools/list\":\n        return {\"tools\": [{\"name\": \"consultar_curso\", \"description\": \"Consulta local, sem alteração\",\n                           \"inputSchema\": schema}]}\n    if metodo != \"tools/call\":\n        raise ValueError(\"Método não implementado nesta simulação\")\n    if not isinstance(params, dict) or params.get(\"name\") != \"consultar_curso\":\n        raise ValueError(\"Ferramenta desconhecida\")\n    args = params.get(\"arguments\")\n    if not isinstance(args, dict) or set(args) != {\"codigo\"} or type(args[\"codigo\"]) is not str:\n        return {\"isError\": True, \"content\": [{\"type\": \"text\", \"text\": \"Argumentos inválidos\"}]}\n    texto = catalogo.get(args[\"codigo\"])\n    return {\"isError\": texto is None,\n            \"content\": [{\"type\": \"text\", \"text\": texto or \"Curso inexistente\"}]}\n\nprint(despachar(\"tools/list\", {})[\"tools\"][0][\"name\"])\nfor codigo in (\"PY\", \"XX\"):\n    resultado = despachar(\"tools/call\", {\"name\": \"consultar_curso\", \"arguments\": {\"codigo\": codigo}})\n    print(resultado[\"isError\"], resultado[\"content\"][0][\"text\"])\nassert catalogo == {\"PY\": \"Python básico\"}",
            "docs": [
              {
                "kind": "doc",
                "title": "MCP · Arquitetura 2026-07-28",
                "url": "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MCP Python SDK · Primeiros passos",
                "url": "https://py.sdk.modelcontextprotocol.io/get-started/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MCP Python SDK · Código oficial",
                "url": "https://github.com/modelcontextprotocol/python-sdk",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-skills",
            "title": "Skills: instruções reutilizáveis e contratos de execução",
            "minutes": 90,
            "concept": "Empacote um procedimento com escopo, exemplos e verificações, mantendo permissões fora do texto.",
            "objectives": [
              "Diferenciar skill, ferramenta, prompt e protocolo.",
              "Escrever instruções reutilizáveis com critérios de entrada e saída.",
              "Testar acionamento, versão e limites de uma skill."
            ],
            "exercise": "Defina três casos de acionamento da skill.",
            "code": "from math import isfinite\n\ndef validar_catalogo(itens):\n    erros, vistos = [], set()\n    for i, item in enumerate(itens):\n        sku, preco = item.get('sku'), item.get('preco')\n        if not isinstance(sku, str) or not sku.strip() or sku in vistos:\n            erros.append(f'linha {i}: sku invalido')\n        if isinstance(sku, str):\n            vistos.add(sku)\n        if type(preco) not in (int, float) or not isfinite(preco) or preco \u003c= 0:\n            erros.append(f'linha {i}: preco invalido')\n    return erros\n\nmanifesto = {'nome':'validar-catalogo', 'entrada':'lista de dicionarios',\n             'saida':'lista de erros', 'efeitos':'nenhum'}\nprint(manifesto['nome'])\nprint(validar_catalogo([{'sku':'A', 'preco':10}]))\nprint(validar_catalogo([{'sku':'A', 'preco':0}]))",
            "docs": [
              {
                "kind": "doc",
                "title": "Agent Skills · Especificação aberta",
                "url": "https://agentskills.io/specification",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Anthropic · Workflows e agentes",
                "url": "https://www.anthropic.com/engineering/building-effective-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-workflows",
            "title": "Workflows e agentes: estados, orçamento e supervisão",
            "minutes": 90,
            "concept": "Projete execução controlada com estados explícitos, limites e aprovação de efeitos.",
            "objectives": [
              "Distinguir fluxo fixo de decisão dinâmica por modelo.",
              "Definir estados, transições, orçamento e condições de parada.",
              "Controlar repetição de efeitos e retomada após falha."
            ],
            "exercise": "Defina como tratar timeout após uma reserva.",
            "code": "TRANSICOES = {\n    ('inicio','propor'): 'aguardando',\n    ('aguardando','aprovar'): 'executando',\n    ('executando','finalizar'): 'concluido'\n}\n\ndef avancar(estado, evento, confirmado=False):\n    if estado in ('concluido','cancelado'):\n        raise ValueError('estado terminal')\n    if evento == 'cancelar':\n        return 'cancelado'\n    if evento == 'aprovar' and confirmado is not True:\n        raise PermissionError('confirmacao necessaria')\n    if (estado, evento) not in TRANSICOES:\n        raise ValueError('transicao invalida')\n    return TRANSICOES[(estado, evento)]\n\nestado = avancar('inicio','propor')\nprint(estado)\nestado = avancar(estado,'aprovar', confirmado=True)\nprint(estado)\nprint(avancar(estado,'finalizar'))",
            "docs": [
              {
                "kind": "doc",
                "title": "Anthropic · Workflows e agentes",
                "url": "https://www.anthropic.com/engineering/building-effective-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "ai-quality",
        "title": "Avaliação, segurança e operação",
        "level": "Intermediário → Avançado",
        "number": "05",
        "description": "Métricas, casos adversariais, privacidade, custos, latência e observabilidade.",
        "resources": [
          {
            "kind": "doc",
            "title": "Anthropic · Avaliação de agentes",
            "url": "https://www.anthropic.com/research/demystifying-evals-for-ai-agents",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Microsoft · Projeto e avaliação de RAG",
            "url": "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Claude · Mitigar prompt injection",
            "url": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Anthropic · Defesas contra prompt injection",
            "url": "https://www.anthropic.com/research/prompt-injection-defenses",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Microsoft · Retry pattern",
            "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/retry",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · decimal",
            "url": "https://docs.python.org/3/library/decimal.html",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "ai-evals",
            "title": "Avaliação: datasets, métricas e regressões",
            "minutes": 75,
            "concept": "Uma avaliação transforma “parece bom” em evidência verificável. Defina a tarefa, exemplos representativos, critérios observáveis e um conjunto reservado antes de comparar mudanças. Avalie recuperação, resposta e comportamento do sistema separadamente; uma média alta não garante desempenho nos casos mais importantes.",
            "objectives": [
              "Separar dados de treino, desenvolvimento e teste sem vazamento entre grupos.",
              "Calcular precisão e recall de recuperação e distinguir essas métricas de fidelidade da resposta.",
              "Construir uma rubrica humana e detectar regressões com casos versionados."
            ],
            "exercise": "Monte um protocolo com nove casos: três respondíveis, três sem resposta e três de acesso negado. Defina divisão e critérios antes de escolher o prompt.",
            "code": "def metricas(relevantes, recuperados):\n    relevantes, recuperados = set(relevantes), set(recuperados)\n    acertos = len(relevantes & recuperados)\n    precisao = acertos / len(recuperados) if recuperados else 0.0\n    recall = acertos / len(relevantes) if relevantes else 0.0\n    return precisao, recall\n\ncasos = [({'A', 'C'}, ['A', 'B']), ({'D'}, ['D'])]\nfor i, (esperados, encontrados) in enumerate(casos, start=1):\n    p, r = metricas(esperados, encontrados)\n    print(f'caso {i}: precisao={p:.2f} recall={r:.2f}')\nassert metricas({'A'}, []) == (0.0, 0.0)\nassert metricas({'A'}, ['A', 'A']) == (1.0, 1.0)",
            "docs": [
              {
                "kind": "doc",
                "title": "Anthropic · Avaliação de agentes",
                "url": "https://www.anthropic.com/research/demystifying-evals-for-ai-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Microsoft · Projeto e avaliação de RAG",
                "url": "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-safety",
            "title": "Segurança: permissões, dados e prompt injection",
            "minutes": 75,
            "concept": "Um modelo interpreta texto, mas a aplicação decide quais dados pode consultar e quais ações pode executar. A segurança depende de autorização no servidor, contratos validados e limites independentes da resposta gerada. Prompts, filtros e revisores automáticos ajudam, porém nenhum deles substitui esse controle.",
            "objectives": [
              "Separar instruções confiáveis de documentos e resultados de ferramentas.",
              "Aplicar autorização antes de recuperar ou revelar conteúdo.",
              "Validar propostas de ação e exigir confirmação vinculada a uma ação específica."
            ],
            "exercise": "Especifique uma ferramenta de compartilhar nota com destinatário e versão. Descreva os testes obrigatórios e a confirmação.",
            "code": "documentos = {'n1': {'dono': 'ana', 'texto': 'Estudar SQL'}}\n\ndef decidir(usuario, acao, documento, confirmacoes=frozenset()):\n    if acao not in {'consultar', 'compartilhar'}:\n        return 'acao invalida'\n    item = documentos.get(documento)\n    if item is None or item['dono'] != usuario:\n        return 'acesso negado'\n    if acao == 'consultar':\n        return item['texto']\n    if (acao, documento) not in confirmacoes:\n        return 'requer confirmacao'\n    return 'proposta autorizada: nenhuma acao externa executada'\n\nprint(decidir('bia', 'consultar', 'n1'))\nprint(decidir('ana', 'consultar', 'n1'))\nprint(decidir('ana', 'compartilhar', 'n1'))\nassert decidir('bia', 'compartilhar', 'n1', {('compartilhar','n1')}) == 'acesso negado'",
            "docs": [
              {
                "kind": "doc",
                "title": "Claude · Mitigar prompt injection",
                "url": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Anthropic · Defesas contra prompt injection",
                "url": "https://www.anthropic.com/research/prompt-injection-defenses",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-operations",
            "title": "Operação: custo, latência, falhas e publicação",
            "minutes": 75,
            "concept": "Operar uma aplicação de IA exige controlar qualidade, tempo e consumo em conjunto. Um orçamento deve limitar tentativas e volume antes da chamada; observabilidade deve explicar falhas sem acumular dados sensíveis. Publicar inclui comparar versões, acompanhar sinais e manter um caminho de reversão.",
            "objectives": [
              "Estimar custos com unidades e tarifas explicitamente hipotéticas.",
              "Aplicar retries limitados somente a falhas transitórias e considerar idempotência.",
              "Planejar métricas, cache, publicação gradual e rollback."
            ],
            "exercise": "Escreva um plano de publicação de um assistente com cache privado e orçamento. Inclua critérios de parada e retorno.",
            "code": "from decimal import Decimal\n\ndef custo_hipotetico(entrada, saida):\n    if type(entrada) is not int or type(saida) is not int or min(entrada, saida) \u003c 0:\n        raise ValueError('Contagens inteiras nao negativas')\n    return (Decimal(entrada) * 2 + Decimal(saida) * 8) / Decimal(1000000)\n\ndef executar(chamar, tentativas=3):\n    if type(tentativas) is not int or tentativas \u003c 1:\n        raise ValueError('Limite invalido')\n    for numero in range(1, tentativas + 1):\n        try:\n            return chamar(), numero\n        except TimeoutError:\n            if numero == tentativas:\n                raise\n\neventos = iter(['timeout', 'ok'])\ndef servico_local():\n    evento = next(eventos)\n    if evento == 'timeout':\n        raise TimeoutError('Falha simulada')\n    return evento\n\nprint(f'custo ficticio: {custo_hipotetico(1000, 250):.3f}')\nprint(executar(servico_local))",
            "docs": [
              {
                "kind": "doc",
                "title": "Microsoft · Retry pattern",
                "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/retry",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · decimal",
                "url": "https://docs.python.org/3/library/decimal.html",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "ai-applied",
        "title": "Modelos, multimodalidade e projeto final",
        "level": "Avançado · aplicação",
        "number": "06",
        "description": "Escolha e adaptação de modelos, imagens e áudio, arquitetura e evidências de qualidade.",
        "resources": [
          {
            "kind": "doc",
            "title": "Microsoft · Otimizar desempenho de IA generativa",
            "url": "https://learn.microsoft.com/en-au/training/modules/optimize-generative-ai-model-performance/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Microsoft · RAG",
            "url": "https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Microsoft · Acurácia e confiança em documentos",
            "url": "https://learn.microsoft.com/azure/ai-services/document-intelligence/concept-accuracy-confidence",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "W3C WAI · Alternativas textuais para imagens",
            "url": "https://www.w3.org/WAI/tutorials/images/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Anthropic · Workflows e agentes",
            "url": "https://www.anthropic.com/engineering/building-effective-agents",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Anthropic · Engenharia de contexto",
            "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Python · Biblioteca padrão",
            "url": "https://docs.python.org/3/library/",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "ai-adaptation",
            "title": "Escolha de modelo, RAG e fundamentos de fine-tuning",
            "minutes": 75,
            "concept": "Melhorar um sistema começa por identificar o tipo de erro. Instrução ambígua, informação ausente, comportamento inconsistente e modelo inadequado exigem intervenções diferentes. Compare uma referência simples antes de acrescentar complexidade; ajuste parâmetros de um modelo apenas quando dados e avaliação sustentarem essa decisão.",
            "objectives": [
              "Escolher entre melhorar prompt, recuperar informação e investigar fine-tuning.",
              "Explicar treino, parâmetros, perda, overfitting e generalização em linguagem simples.",
              "Comparar candidatos com qualidade, custo e latência sobre casos reservados."
            ],
            "exercise": "Planeje uma comparação entre prompt melhorado, RAG e adaptação para classificar solicitações em três categorias.",
            "code": "def proximo_experimento(fatos_mutaveis, instrucao_clara, exemplos_revisados):\n    if not instrucao_clara:\n        return 'revisar prompt e avaliar'\n    if fatos_mutaveis:\n        return 'avaliar RAG com fontes e permissoes'\n    if exemplos_revisados:\n        return 'comparar baseline e investigar fine-tuning'\n    return 'coletar casos e avaliar baseline'\n\ncenarios = [(False, False, False), (True, True, False), (False, True, True)]\nfor cenario in cenarios:\n    print(proximo_experimento(*cenario))\n\ntreino = {'doc-a', 'doc-b'}\ndesenvolvimento = {'doc-c'}\nteste = {'doc-d'}\nassert treino.isdisjoint(desenvolvimento)\nassert treino.isdisjoint(teste)\nassert desenvolvimento.isdisjoint(teste)",
            "docs": [
              {
                "kind": "doc",
                "title": "Microsoft · Otimizar desempenho de IA generativa",
                "url": "https://learn.microsoft.com/en-au/training/modules/optimize-generative-ai-model-performance/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Microsoft · RAG",
                "url": "https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-multimodal",
            "title": "Multimodal: imagens, áudio, OCR e acessibilidade",
            "minutes": 75,
            "concept": "Uma aplicação multimodal trabalha com formas diferentes de informação, como texto, imagem e áudio. O resultado de extração continua sujeito a erro e precisa manter origem, contexto e critérios de validação. Uma interface acessível oferece alternativas equivalentes e permite corrigir o que foi interpretado incorretamente.",
            "objectives": [
              "Distinguir OCR, interpretação visual e transcrição de áudio.",
              "Validar dados extraídos com regras de domínio e revisão dos casos incertos.",
              "Preservar referências de origem e projetar alternativas acessíveis."
            ],
            "exercise": "Desenhe um fluxo para transformar uma foto de gráfico em material de estudo acessível e verificável.",
            "code": "from decimal import Decimal\nimport math\nimport re\n\ndef validar_total(campo):\n    confianca = campo.get('confianca')\n    if type(confianca) not in (int, float) or not math.isfinite(confianca) or not 0 \u003c= confianca \u003c= 1:\n        return 'revisar: confianca invalida'\n    if confianca \u003c 0.8:\n        return 'revisar: baixa confianca'\n    texto = campo.get('texto', '')\n    if not isinstance(texto, str) or not re.fullmatch(r'[0-9]+.[0-9]{2}', texto):\n        return 'revisar: formato invalido'\n    valor = Decimal(texto)\n    if valor \u003c= 0:\n        return 'revisar: total nao positivo'\n    return f'formato aceito: {valor:.2f}; conferir origem'\n\n# Dados ficticios: nenhum OCR ou modelo foi executado.\ncampos = [{'texto':'18.90','confianca':0.95}, {'texto':'18.90','confianca':0.5}, {'texto':'18,9O','confianca':0.99}]\nfor campo in campos:\n    print(validar_total(campo))\nassert validar_total({'texto':'18.90','confianca':float('nan')}) == 'revisar: confianca invalida'",
            "docs": [
              {
                "kind": "doc",
                "title": "Microsoft · Acurácia e confiança em documentos",
                "url": "https://learn.microsoft.com/azure/ai-services/document-intelligence/concept-accuracy-confidence",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "W3C WAI · Alternativas textuais para imagens",
                "url": "https://www.w3.org/WAI/tutorials/images/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "ai-capstone",
            "title": "Projeto integrado: assistente com evidências e avaliação",
            "minutes": 90,
            "concept": "Integre requisitos, dados, recuperação, contrato de resposta, testes e documentação em um projeto de portfólio.",
            "objectives": [
              "Transformar necessidades de usuário em critérios de aceitação.",
              "Separar componentes para testar erros de forma reproduzível.",
              "Demonstrar limites, resultados de avaliação e próximos passos."
            ],
            "exercise": "Escreva um critério de aceitação para revogação de acesso no projeto completo.",
            "code": "def responder_com_evidencias(pergunta, evidencias, gerar):\n    if not evidencias:\n        return {'estado':'sem_evidencia'}\n    try:\n        saida = gerar(pergunta, evidencias)\n    except TimeoutError:\n        return {'estado':'indisponivel'}\n    ids = {e['id'] for e in evidencias}\n    if not isinstance(saida, dict) or set(saida) != {'resposta','fontes'}:\n        return {'estado':'revisar'}\n    texto, fontes = saida['resposta'], saida['fontes']\n    if not isinstance(texto,str) or not texto.strip():\n        return {'estado':'revisar'}\n    if not isinstance(fontes,list) or not fontes or any(not isinstance(f,str) or f not in ids for f in fontes):\n        return {'estado':'revisar'}\n    return {'estado':'ok', 'resposta':texto, 'fontes':fontes}\n\ndef simulado(pergunta, evidencias):\n    return {'resposta':'Prazo de sete dias.', 'fontes':['A']}\n\nbase = [{'id':'A','texto':'Prazo de sete dias.'}]\nprint(responder_com_evidencias('Qual prazo?',base,simulado)['estado'])\nprint(responder_com_evidencias('Qual prazo?',[],simulado)['estado'])",
            "docs": [
              {
                "kind": "doc",
                "title": "Anthropic · Workflows e agentes",
                "url": "https://www.anthropic.com/engineering/building-effective-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Anthropic · Engenharia de contexto",
                "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Python · Biblioteca padrão",
                "url": "https://docs.python.org/3/library/",
                "language": "EN"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "git-workflow",
    "title": "Git & Colaboração",
    "subtitle": "Versionamento, requisitos e revisão para trabalhar em equipe",
    "icon": "terminal",
    "color": "#58d5ae",
    "range": "Básico ao intermediário",
    "description": "Aprenda a registrar mudanças, resolver conflitos, sincronizar repositórios e entregar tarefas com critérios claros e revisão.",
    "prerequisite": "Conclua a Etapa 0 e tenha um projeto pequeno de HTML/CSS ou JavaScript. A instalação do Git é uma preparação mínima; o uso começa do zero.",
    "project": "Entregar uma melhoria na lista de estudos com issue, branch, commits, remoto simulado, README e revisão documentada.",
    "modules": [
      {
        "id": "git-foundations",
        "title": "Git local e histórico seguro",
        "level": "Básico",
        "number": "01",
        "description": "Terminal, três estados, commits, desfazer, branches e conflitos em laboratório local.",
        "resources": [
          {
            "kind": "doc",
            "title": "Livro Pro Git gratuito",
            "url": "https://git-scm.com/book/pt-br/v2",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "Referência oficial de comandos",
            "url": "https://git-scm.com/docs",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "git-start",
            "title": "Terminal, arquivos e primeiro repositório",
            "minutes": 100,
            "concept": "Diferencie a pasta de trabalho, a área de preparação e os commits; crie um repositório local observando cada estado.",
            "objectives": [
              "Navegar por uma pasta de projeto e verificar onde o terminal está aberto.",
              "Configurar identidade local e iniciar um repositório com branch main.",
              "Explicar o fluxo arquivo alterado → staged → commit usando git status."
            ],
            "exercise": "Criar o repositório agenda-lab, adicionar README.md e index.html, preparar somente um arquivo e explicar o estado de ambos antes do primeiro commit.",
            "code": "# PowerShell, em uma pasta de estudo descartável\nNew-Item -ItemType Directory agenda-lab\nSet-Location agenda-lab\ngit init -b main\ngit config user.name \"Aluno Exemplo\"\ngit config user.email \"aluno@example.invalid\"\nSet-Content README.md \"# Agenda de estudos\"\ngit status --short\ngit add README.md\ngit status --short\ngit commit -m \"docs: inicia agenda de estudos\"\ngit log --oneline -1",
            "docs": [
              {
                "kind": "doc",
                "title": "Git Book · Obtendo um repositório",
                "url": "https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Obtendo-um-Reposit%C3%B3rio-Git",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Git Book · Configuração inicial",
                "url": "https://git-scm.com/book/pt-br/v2/Primeiros-Passos-Configura%C3%A7%C3%A3o-inicial-do-Git",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Git · git status",
                "url": "https://git-scm.com/docs/git-status",
                "language": "EN"
              }
            ]
          },
          {
            "id": "git-history",
            "title": "Commits, histórico e desfazer com segurança",
            "minutes": 115,
            "concept": "Investigue diferenças e corrija mudanças com restore, revert e reset sem apagar trabalho compartilhado.",
            "objectives": [
              "Criar commits pequenos com mensagens que expliquem a mudança.",
              "Inspecionar log, show e diff para encontrar a origem de um defeito.",
              "Escolher restore, revert ou reset de acordo com o estado e a colaboração."
            ],
            "exercise": "Registre duas mudanças na agenda; simule um erro no último commit e reverta-o sem reescrever o histórico.",
            "code": "# Continuando em agenda-lab, com pelo menos um commit\nSet-Content aviso.txt \"Mensagem provisoria\"\ngit add aviso.txt\ngit commit -m \"feat: adiciona aviso provisório\"\ngit log --oneline -3\ngit show --stat HEAD\ngit revert --no-edit HEAD\ngit log --oneline -3\ngit status --short",
            "docs": [
              {
                "kind": "doc",
                "title": "Git Book · Registrando mudanças",
                "url": "https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Gravando-Altera%C3%A7%C3%B5es-no-Reposit%C3%B3rio",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Git · restore",
                "url": "https://git-scm.com/docs/git-restore",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Git · revert",
                "url": "https://git-scm.com/docs/git-revert",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Git · reset",
                "url": "https://git-scm.com/docs/git-reset",
                "language": "EN"
              }
            ]
          },
          {
            "id": "git-branches",
            "title": "Branches, merge e conflitos",
            "minutes": 125,
            "concept": "Isole uma mudança em um branch, combine-a com main e resolva um conflito lendo os dois lados.",
            "objectives": [
              "Criar e alternar branches sem perder o contexto.",
              "Fazer merge de uma mudança isolada após revisar o diff.",
              "Identificar marcadores de conflito e concluir a resolução manualmente."
            ],
            "exercise": "Implemente uma mensagem em feature/saudacao, produza mudanças concorrentes na mesma linha e resolva o conflito mantendo uma frase final legível.",
            "code": "# Comece com a pasta limpa e README.md já versionado\ngit switch -c feature/saudacao\nSet-Content saudacao.txt \"Olá, visitante\"\ngit add saudacao.txt\ngit commit -m \"feat: adiciona saudação\"\ngit switch main\ngit merge feature/saudacao\ngit log --graph --oneline --all -5",
            "docs": [
              {
                "kind": "doc",
                "title": "Git Book · Branches",
                "url": "https://git-scm.com/book/pt-br/v2/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Branches-em-Poucas-Palavras",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Git Book · Merge básico",
                "url": "https://git-scm.com/book/pt-br/v2/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Ramifica%C3%A7%C3%A3o-Branching-e-Mesclagem-Merging-B%C3%A1sicas",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Git · merge",
                "url": "https://git-scm.com/docs/git-merge",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "git-collaboration",
        "title": "Fluxo de trabalho em equipe",
        "level": "Intermediário",
        "number": "02",
        "description": "Remotos, requisitos verificáveis, documentação, pull requests e revisão de código.",
        "resources": [
          {
            "kind": "doc",
            "title": "Git Book · Remotos",
            "url": "https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Trabalhando-com-Reposit%C3%B3rios-Remotos",
            "language": "PT-BR"
          },
          {
            "kind": "doc",
            "title": "GitHub Docs · Issues",
            "url": "https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "GitHub Docs · Pull requests",
            "url": "https://docs.github.com/en/pull-requests",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "git-remote",
            "title": "Remotos, clone, fetch, pull e push",
            "minutes": 120,
            "concept": "Sincronize duas cópias de um projeto e distinga dados locais de atualizações recebidas ou enviadas.",
            "objectives": [
              "Explicar origin e branches de rastreamento sem confundi-los com main local.",
              "Clonar, enviar e buscar alterações usando um remoto local simulado.",
              "Inspecionar fetch antes de integrar e reconhecer rejeição por histórico remoto novo."
            ],
            "exercise": "Crie um repositório bare local como servidor simulado; publique main, clone em outra pasta e sincronize uma alteração feita nessa segunda cópia.",
            "code": "# Fora de agenda-lab, na pasta que contém o projeto\ngit init --bare --initial-branch=main servidor-agenda.git\nSet-Location agenda-lab\ngit remote add origin ../servidor-agenda.git\ngit push -u origin main\nSet-Location ..\ngit clone servidor-agenda.git colega-agenda\nSet-Location colega-agenda\ngit log --oneline -1\ngit remote -v",
            "docs": [
              {
                "kind": "doc",
                "title": "Git Book · Remotos",
                "url": "https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Trabalhando-com-Reposit%C3%B3rios-Remotos",
                "language": "PT-BR"
              },
              {
                "kind": "doc",
                "title": "Git · fetch",
                "url": "https://git-scm.com/docs/git-fetch",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Git · pull",
                "url": "https://git-scm.com/docs/git-pull",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Git · push",
                "url": "https://git-scm.com/docs/git-push",
                "language": "EN"
              }
            ]
          },
          {
            "id": "git-requirements",
            "title": "Issues, requisitos e README de entrega",
            "minutes": 110,
            "concept": "Transforme uma demanda vaga em critérios testáveis e documente como executar e verificar um projeto.",
            "objectives": [
              "Escrever uma issue com contexto, comportamento esperado e critérios de aceite.",
              "Separar escopo obrigatório de melhorias futuras e casos fora do escopo.",
              "Criar README reproduzível com instalação, execução, testes e limites."
            ],
            "exercise": "Receba “melhorar a lista de estudos” e escreva ISSUE.md e README.md que permitam a outra pessoa implementar e verificar filtros, estado vazio e persistência.",
            "code": "# Em um branch de documentação no laboratório\ngit switch -c docs/requisitos\n@'\n# História: filtrar estudos\nComo estudante, quero alternar entre todos, pendentes e concluídos.\nCritérios:\n- Em \"pendentes\", nenhum item concluído aparece.\n- Depois de recarregar, os itens mantêm seu estado.\n- Com lista vazia, aparece uma mensagem clara.\n'@ | Set-Content ISSUE.md\ngit add ISSUE.md\ngit diff --staged -- ISSUE.md\ngit commit -m \"docs: define critérios do filtro\"",
            "docs": [
              {
                "kind": "doc",
                "title": "GitHub Docs · Issues",
                "url": "https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · README",
                "url": "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · Planejamento",
                "url": "https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/planning-and-tracking-work-for-your-team-or-project",
                "language": "EN"
              }
            ]
          },
          {
            "id": "git-review",
            "title": "Pull request, revisão e colaboração",
            "minutes": 125,
            "concept": "Entregue uma mudança pequena com descrição verificável, revise o diff e responda a comentários com evidência.",
            "objectives": [
              "Produzir uma proposta de mudança com contexto, escopo e validação.",
              "Revisar código contra requisitos, testes, segurança e manutenção.",
              "Tratar comentários, ajustar código e registrar a decisão de forma profissional."
            ],
            "exercise": "Simule um PR para o filtro da agenda com PR.md, diff do branch, checklist de verificação e dois comentários de revisão respondidos com alterações ou justificativa.",
            "code": "# Em agenda-lab; substitua feature/filtro pelo seu branch\ngit switch feature/filtro\ngit status --short\ngit diff main...feature/filtro --stat\ngit diff main...feature/filtro\ngit log --oneline main..feature/filtro\n# Escreva PR.md com problema, mudança, como testar e limites.\n# Após ajustes, faça outro commit e repita diff/status.",
            "docs": [
              {
                "kind": "doc",
                "title": "GitHub Docs · Criar PR",
                "url": "https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · Revisar mudanças",
                "url": "https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/reviewing-proposed-changes-in-a-pull-request",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · Revisão rápida",
                "url": "https://docs.github.com/en/pull-requests/get-started/reviewing-pull-requests-quickstart",
                "language": "EN"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "quality",
    "title": "Qualidade e manutenção",
    "subtitle": "Testar, diagnosticar e manter",
    "icon": "bolt",
    "color": "#e2aeff",
    "range": "Fundamentos ao intermediário",
    "description": "Use evidências para alterar software com confiança: testes de lógica e interface, integração contínua, depuração, refatoração e revisão de qualidade.",
    "prerequisite": "Conclua HTML, CSS e JavaScript básicos, a Etapa 0 e a preparação Node.js/npm para executar os testes locais.",
    "project": "Entregar e manter uma aplicação pequena com testes, relatório de falha reproduzível, correção e revisão de acessibilidade.",
    "modules": [
      {
        "id": "quality-tests",
        "title": "Testes e integração contínua",
        "level": "Básico ao intermediário",
        "number": "01",
        "description": "Descreva comportamentos observáveis, automatize regras JavaScript, verifique fluxos de interface e interprete resultados de uma execução automatizada.",
        "resources": [
          {
            "kind": "doc",
            "title": "Node.js · test runner",
            "url": "https://nodejs.org/api/test.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Node.js · assert",
            "url": "https://nodejs.org/api/assert.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · estratégias de teste",
            "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Introduction",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "GitHub · testar Node.js",
            "url": "https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "quality-cases",
            "title": "Casos de teste, limites e afirmações",
            "minutes": 110,
            "concept": "Transforme uma regra de negócio em exemplos verificáveis, incluindo bordas e entradas inválidas, com node:test e assert nativos.",
            "objectives": [
              "Escrever um contrato com entradas, saída e erros esperados.",
              "Escolher classes de equivalência e valores de fronteira.",
              "Executar testes nativos e interpretar falhas sem confundir aprovação com cobertura completa."
            ],
            "exercise": "Transferência: escreva classificarNota(nota): 0–10 finito; retorna \"aprovado\" para >= 7, \"revisar\" para \u003c 7 e lança TypeError fora do contrato. Crie ao menos quatro testes.",
            "code": "// Salve como desconto.test.cjs e execute: node --test desconto.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction totalComDesconto(preco, percentual) {\n  if (!Number.isFinite(preco) || preco \u003c 0 ||\n      !Number.isFinite(percentual) || percentual \u003c 0 || percentual > 100) {\n    throw new TypeError('Preço ou percentual inválido');\n  }\n  return Math.round(preco * (1 - percentual / 100) * 100) / 100;\n}\n\ntest('aplica desconto normal', () => {\n  assert.equal(totalComDesconto(100, 15), 85);\n});\ntest('aceita o limite zero sem tratar como ausente', () => {\n  assert.equal(totalComDesconto(0, 20), 0);\n});\ntest('rejeita percentual acima do contrato', () => {\n  assert.throws(() => totalComDesconto(100, 120), TypeError);\n});\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Node.js · test runner",
                "url": "https://nodejs.org/api/test.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Node.js · assert/strict",
                "url": "https://nodejs.org/api/assert.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "quality-ui",
            "title": "Fluxos de interface e camadas de teste",
            "minutes": 105,
            "concept": "Teste o que a pessoa faz e vê: DOM, teclado, estados e integração entre regra, evento e apresentação.",
            "objectives": [
              "Distinguir teste de função, de integração e de fluxo de interface.",
              "Executar um roteiro manual reproduzível no navegador.",
              "Relacionar DOM e acessibilidade sem supor que um teste de função cobre a página."
            ],
            "exercise": "Transferência: acrescente botão Limpar e roteiro para lista vazia, lista com dois itens e teclado.",
            "code": "\u003c!doctype html>\n\u003chtml lang=\"pt-BR\">\u003cmeta charset=\"utf-8\">\u003ctitle>Teste de interface\u003c/title>\n\u003clabel for=\"tarefa\">Nova tarefa\u003c/label>\n\u003cinput id=\"tarefa\">\u003cbutton id=\"adicionar\" type=\"button\">Adicionar\u003c/button>\n\u003cp id=\"status\" role=\"status\">\u003c/p>\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\nconst campo = document.querySelector('#tarefa');\nconst lista = document.querySelector('#lista');\nconst status = document.querySelector('#status');\ndocument.querySelector('#adicionar').addEventListener('click', () => {\n  const texto = campo.value.trim();\n  if (!texto) { status.textContent = 'Digite uma tarefa.'; campo.focus(); return; }\n  const item = document.createElement('li');\n  item.textContent = texto;\n  lista.append(item);\n  campo.value = '';\n  status.textContent = 'Tarefa adicionada.';\n  campo.focus();\n});\n\u003c/script>\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · teste entre navegadores",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Introduction",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · DOM",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · acessibilidade no CSS/JS",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript",
                "language": "EN"
              }
            ]
          },
          {
            "id": "quality-ci",
            "title": "Integração contínua e leitura de resultados",
            "minutes": 100,
            "concept": "Transforme um comando de teste local em verificação repetível a cada mudança e interprete seu resultado.",
            "objectives": [
              "Rodar uma suíte local com comando único e código de saída.",
              "Ler um workflow simples de GitHub Actions sem depender dele para aprender a regra.",
              "Distinguir falha de teste, falha de configuração e limite do relatório."
            ],
            "exercise": "Transferência: adicione novo requisito: 10 ou mais pontos devolvem urgente; escreva testes para 9 e 10 e atualize a função.",
            "code": "// Salve como verificacao.test.cjs; rode node --test verificacao.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction prioridade(pontos) {\n  if (!Number.isInteger(pontos) || pontos \u003c 0) throw new TypeError('Pontos inválidos');\n  return pontos >= 5 ? 'alta' : 'normal';\n}\n\ntest('limite alto', () => assert.equal(prioridade(5), 'alta'));\ntest('abaixo do limite', () => assert.equal(prioridade(4), 'normal'));\ntest('negativo é erro', () => assert.throws(() => prioridade(-1), TypeError));\n",
            "docs": [
              {
                "kind": "doc",
                "title": "GitHub Actions · Node.js",
                "url": "https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Node.js · test runner",
                "url": "https://nodejs.org/api/test.html",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "quality-maintenance",
        "title": "Manutenção de projetos e revisão",
        "level": "Intermediário",
        "number": "02",
        "description": "Reproduza defeitos, refatore sem alterar comportamento previsto, controle dependências e revise acessibilidade, segurança e desempenho.",
        "resources": [
          {
            "kind": "doc",
            "title": "Chrome DevTools · breakpoints",
            "url": "https://developer.chrome.com/docs/devtools/javascript/breakpoints",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "npm · package-lock.json",
            "url": "https://docs.npmjs.com/files/package-lock.json/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "W3C · referência WCAG 2.2",
            "url": "https://www.w3.org/WAI/WCAG22/quickref/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · segurança web",
            "url": "https://developer.mozilla.org/en-US/docs/Web/Security",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "quality-debug",
            "title": "Reproduzir, depurar e prevenir regressão",
            "minutes": 110,
            "concept": "Investigue um defeito a partir de sintomas reproduzíveis, formule hipótese, corrija a causa e guarde um teste de regressão.",
            "objectives": [
              "Escrever um relato mínimo com esperado e observado.",
              "Usar Console e breakpoint para inspecionar valores sem alterar o comportamento à cegas.",
              "Criar um teste que falha antes da correção e passa depois."
            ],
            "exercise": "Transferência: escreva um pequeno relatório de correção com causa, alteração, testes e risco restante.",
            "code": "// Salve como erro.test.cjs; execute node --test erro.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction contarPendentes(aulas) {\n  return aulas.filter(aula => !aula.concluida).length;\n}\n\ntest('conta aula pendente', () => {\n  assert.equal(contarPendentes([{ concluida: false }]), 1);\n});\ntest('não conta aula concluída', () => {\n  assert.equal(contarPendentes([{ concluida: true }]), 0);\n});\ntest('contrato novo: concluida ausente não é pendente', () => {\n  assert.equal(contarPendentes([{}]), 0);\n});\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Chrome DevTools · breakpoints",
                "url": "https://developer.chrome.com/docs/devtools/javascript/breakpoints",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Node.js · test runner",
                "url": "https://nodejs.org/api/test.html",
                "language": "EN"
              }
            ]
          },
          {
            "id": "quality-refactor",
            "title": "Refatorar, separar módulos e controlar dependências",
            "minutes": 110,
            "concept": "Melhore a organização interna preservando o comportamento acordado e registre dependências de maneira reproduzível.",
            "objectives": [
              "Diferenciar refatoração de mudança de requisito.",
              "Mover uma regra para módulo mantendo contrato e testes.",
              "Explicar package.json, package-lock.json e npm ci sem adicionar pacotes desnecessários."
            ],
            "exercise": "Transferência: descreva plano para adicionar biblioteca de datas a projeto existente e as evidências após a mudança.",
            "code": "// Salve como refatoracao.test.cjs; execute node --test refatoracao.test.cjs\nconst { test } = require('node:test');\nconst assert = require('node:assert/strict');\n\nfunction classificar(valor) {\n  if (!Number.isFinite(valor) || valor \u003c 0) throw new TypeError('Valor inválido');\n  if (valor >= 100) return 'grande';\n  if (valor >= 50) return 'médio';\n  return 'pequeno';\n}\n\ntest('três faixas', () => {\n  assert.equal(classificar(0), 'pequeno');\n  assert.equal(classificar(50), 'médio');\n  assert.equal(classificar(100), 'grande');\n});\ntest('entrada inválida', () => assert.throws(() => classificar(NaN), TypeError));\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Node.js · CommonJS modules",
                "url": "https://nodejs.org/api/modules.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "npm · package-lock.json",
                "url": "https://docs.npmjs.com/files/package-lock.json/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "npm · npm ci",
                "url": "https://docs.npmjs.com/cli/commands/npm-ci/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "quality-review",
            "title": "Revisão de acessibilidade, segurança e desempenho",
            "minutes": 120,
            "concept": "Revise uma funcionalidade por riscos observáveis: teclado e semântica, dados não confiáveis, custo de operação e comunicação em equipe.",
            "objectives": [
              "Executar checklist inicial de teclado, rótulos, foco e feedback.",
              "Reconhecer inserção segura de texto e limites de confiança.",
              "Medir antes de otimizar e apresentar revisão com evidências e riscos."
            ],
            "exercise": "Transferência: redija comentário de revisão sobre desempenho para uma lista de 10 mil tarefas e proponha uma medição.",
            "code": "\u003c!doctype html>\n\u003chtml lang=\"pt-BR\">\u003cmeta charset=\"utf-8\">\u003ctitle>Revisão de qualidade\u003c/title>\n\u003cstyle>body{font:1rem/1.5 system-ui;max-width:42rem;margin:2rem auto;padding:1rem}button:focus-visible{outline:3px solid #153fcf;outline-offset:3px}\u003c/style>\n\u003cmain>\u003ch1>Consulta de tarefas\u003c/h1>\n\u003clabel for=\"busca\">Buscar por título\u003c/label>\n\u003cinput id=\"busca\" autocomplete=\"off\">\u003cbutton type=\"button\" id=\"filtrar\">Buscar\u003c/button>\n\u003cp id=\"status\" role=\"status\">\u003c/p>\u003cul id=\"resultados\">\u003c/ul>\u003c/main>\n\u003cscript>\nconst tarefas = ['Estudar HTML', 'Testar JavaScript', 'Revisar CSS'];\ndocument.querySelector('#filtrar').addEventListener('click', () => {\n  const termo = document.querySelector('#busca').value.trim().toLocaleLowerCase('pt-BR');\n  const lista = document.querySelector('#resultados');\n  lista.replaceChildren();\n  const encontrados = tarefas.filter(t => t.toLocaleLowerCase('pt-BR').includes(termo));\n  for (const titulo of encontrados) {\n    const item = document.createElement('li'); item.textContent = titulo; lista.append(item);\n  }\n  document.querySelector('#status').textContent = `${encontrados.length} resultado(s).`;\n});\n\u003c/script>\u003c/html>",
            "docs": [
              {
                "kind": "doc",
                "title": "W3C WAI · WCAG 2.2 quick reference",
                "url": "https://www.w3.org/WAI/WCAG22/quickref/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · segurança na web",
                "url": "https://developer.mozilla.org/en-US/docs/Web/Security",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · desempenho",
                "url": "https://developer.mozilla.org/en-US/docs/Web/Performance",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · acessibilidade CSS e JS",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript",
                "language": "EN"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "delivery",
    "title": "Integração & Entrega",
    "subtitle": "Leve o projeto ao mundo real.",
    "icon": "grid",
    "color": "#78c9ff",
    "range": "Base profissional → Entrega aplicada",
    "description": "Integre uma interface a serviços, proteja fronteiras, publique com critérios e trabalhe com mudanças reais.",
    "prerequisite": "Conclua fundamentos de HTML/CSS e JavaScript, a Etapa 0 e a preparação Node.js/npm usada nos laboratórios HTTP e de CI.",
    "project": "Aplicação de estudos integrada a uma API local, com contrato, testes, plano de publicação, mudança de requisito e README verificável.",
    "modules": [
      {
        "id": "delivery-integration",
        "title": "Serviços e segurança",
        "level": "Básico → Intermediário",
        "number": "01",
        "description": "HTTP, formulários, Fetch, respostas, autenticação conceitual, autorização, CORS e segredos.",
        "resources": [
          {
            "kind": "doc",
            "title": "MDN · Visão geral de HTTP",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · Usando Fetch",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "MDN · CORS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "OWASP · Segurança de aplicações web",
            "url": "https://owasp.org/www-project-top-ten/",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "GitHub Docs · Consultar repositório pela API REST",
            "url": "https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "GitHub Docs · Limites de requisições da API",
            "url": "https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "delivery-http",
            "title": "Contratos HTTP, JSON e servidor local",
            "minutes": 120,
            "concept": "Entenda o caminho entre navegador e servidor, documente respostas e reproduza sucesso e falha sem depender de API pública.",
            "objectives": [
              "Diferenciar requisição, resposta, método, rota, status e corpo.",
              "Definir um contrato JSON verificável antes de escrever a interface.",
              "Executar um mock local e distinguir 200, 404 e 503."
            ],
            "exercise": "Rode o servidor local; descreva o contrato de GET /api/estudos e confirme resposta, Content-Type e status para três rotas.",
            "code": "// Salve como server.js e execute: node server.js\nconst http = require('node:http');\nconst estudos = [{ id: 1, titulo: 'HTML' }, { id: 2, titulo: 'JavaScript' }];\nhttp.createServer((req, res) => {\n  res.setHeader('Content-Type', 'application/json; charset=utf-8');\n  if (req.method === 'GET' && req.url === '/api/estudos') {\n    res.writeHead(200);\n    res.end(JSON.stringify(estudos));\n    return;\n  }\n  if (req.method === 'GET' && req.url === '/api/falha') {\n    res.writeHead(503);\n    res.end(JSON.stringify({ erro: 'Serviço indisponível' }));\n    return;\n  }\n  res.writeHead(404);\n  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));\n}).listen(4178, '127.0.0.1', () => console.log('http://127.0.0.1:4178/api/estudos'));",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Visão geral de HTTP",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Métodos HTTP",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Códigos de status HTTP",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · Consultar repositório pela API REST",
                "url": "https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · Limites de requisições da API",
                "url": "https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api",
                "language": "EN"
              }
            ]
          },
          {
            "id": "delivery-forms",
            "title": "Formulários, Fetch e estados de uma operação",
            "minutes": 135,
            "concept": "Conecte um formulário a um endpoint local, valide em ambas as pontas e informe carregamento, sucesso e erro à pessoa usuária.",
            "objectives": [
              "Enviar JSON com Fetch e interpretar status e corpo.",
              "Representar espera, sucesso, validação e falha sem duplicar envios.",
              "Diferenciar validação do navegador e validação obrigatória do servidor."
            ],
            "exercise": "Construa o formulário local: título vazio é recusado; título válido recebe 201, entra na lista e mostra confirmação.",
            "code": "// Salve como server.js e execute: node server.js\nconst http = require('node:http');\nconst html = String.raw`\u003c!doctype html>\u003chtml lang=\"pt-BR\">\u003cmeta charset=\"utf-8\">\u003ctitle>Cadastro local\u003c/title>\n\u003clabel>Título \u003cinput id=\"titulo\" maxlength=\"60\">\u003c/label>\u003cbutton id=\"salvar\">Salvar\u003c/button>\n\u003cp id=\"estado\" role=\"status\">Pronto\u003c/p>\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\nconst titulo = document.querySelector('#titulo');\nconst estado = document.querySelector('#estado');\nconst lista = document.querySelector('#lista');\ndocument.querySelector('#salvar').addEventListener('click', async () => {\n  const valor = titulo.value.trim();\n  if (!valor) { estado.textContent = 'Informe um título.'; titulo.focus(); return; }\n  estado.textContent = 'Salvando…';\n  try {\n    const resposta = await fetch('/api/estudos', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({titulo:valor}) });\n    const dados = await resposta.json();\n    if (!resposta.ok) throw new Error(dados.erro || 'Falha ao salvar');\n    const item = document.createElement('li'); item.textContent = dados.titulo; lista.append(item);\n    titulo.value = ''; estado.textContent = 'Salvo com sucesso.';\n  } catch (erro) { estado.textContent = erro.message; }\n});\n\u003c/script>\u003c/html>`;\nconst dados = [];\nhttp.createServer((req, res) => {\n  if (req.method === 'GET' && req.url === '/') { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); res.end(html); return; }\n  if (req.method === 'POST' && req.url === '/api/estudos') {\n    let corpo = '';\n    req.on('data', trecho => { corpo += trecho; if (corpo.length > 4096) req.destroy(); });\n    req.on('end', () => {\n      let titulo;\n      try { titulo = JSON.parse(corpo).titulo; } catch { titulo = null; }\n      res.setHeader('Content-Type', 'application/json; charset=utf-8');\n      if (typeof titulo !== 'string' || !titulo.trim() || titulo.trim().length > 60) {\n        res.writeHead(400); res.end(JSON.stringify({erro:'Título inválido'})); return;\n      }\n      const registro = {id:dados.length + 1, titulo:titulo.trim()}; dados.push(registro);\n      res.writeHead(201); res.end(JSON.stringify(registro));\n    }); return;\n  }\n  res.writeHead(404); res.end('Não encontrado');\n}).listen(4178, '127.0.0.1', () => console.log('Abra http://127.0.0.1:4178/'));",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · Usando Fetch",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Validação de formulários",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Códigos de status HTTP",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status",
                "language": "EN"
              }
            ]
          },
          {
            "id": "delivery-security",
            "title": "Autenticação, CORS e fronteiras de segurança",
            "minutes": 120,
            "concept": "Reconheça o que o navegador pode mostrar, o que o servidor deve decidir e por que segredo, autorização e CORS são responsabilidades diferentes.",
            "objectives": [
              "Separar identificação, autenticação e autorização.",
              "Explicar por que chaves no JavaScript enviado ao navegador ficam públicas.",
              "Diagnosticar CORS e aplicar validação, mínimo privilégio e mensagens de erro seguras."
            ],
            "exercise": "Faça uma revisão de segurança da aplicação local: marque as decisões que pertencem ao servidor e escreva uma resposta 403 com corpo mínimo.",
            "code": "// Arquivo demonstrativo: node security.js\nfunction podeEditar(usuario, registro) {\n  return Boolean(usuario && registro && usuario.id === registro.donoId);\n}\nconst registro = { id: 7, donoId: 2, titulo: 'Plano' };\nfor (const usuario of [{id:2}, {id:9}, null]) {\n  console.log(podeEditar(usuario, registro) ? 200 : 403);\n}\n// Saída: 200, 403, 403. Em sistema real o servidor valida a sessão.\n",
            "docs": [
              {
                "kind": "doc",
                "title": "MDN · CORS",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "OWASP · Segurança de aplicações web",
                "url": "https://owasp.org/www-project-top-ten/",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Node.js · Variáveis de ambiente",
                "url": "https://nodejs.org/learn/command-line/how-to-read-environment-variables-from-nodejs",
                "language": "EN"
              }
            ]
          }
        ]
      },
      {
        "id": "delivery-work",
        "title": "Publicação e trabalho em projeto",
        "level": "Intermediário aplicado",
        "number": "02",
        "description": "Ambientes, hospedagem, CI, testes de entrega, incidentes, requisitos novos e portfólio.",
        "resources": [
          {
            "kind": "doc",
            "title": "GitHub Docs · Criar um site no Pages",
            "url": "https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "GitHub Docs · Entenda o GitHub Actions",
            "url": "https://docs.github.com/en/actions/get-started/understand-github-actions",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "Node.js · Test runner",
            "url": "https://nodejs.org/api/test.html",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "GitHub Docs · Sintaxe básica de Markdown",
            "url": "https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax",
            "language": "EN"
          },
          {
            "kind": "doc",
            "title": "GitHub Docs · Sobre pull requests",
            "url": "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
            "language": "EN"
          }
        ],
        "lessons": [
          {
            "id": "delivery-environments",
            "title": "Ambientes, configuração e publicação",
            "minutes": 125,
            "concept": "Prepare uma entrega reproduzível e escolha a hospedagem conforme o que precisa executar: arquivos estáticos ou processos de servidor.",
            "objectives": [
              "Distinguir desenvolvimento, prévia e produção.",
              "Separar configuração pública de segredo e usar variáveis no servidor.",
              "Publicar um site estático e justificar onde uma API ou banco podem rodar."
            ],
            "exercise": "Crie um plano de publicação do projeto: URL pública, base de API, comandos de teste, configuração, verificação após a entrega e recuperação.",
            "code": "// config.js: configuração pública do navegador\nconst configuracoes = {\n  desenvolvimento: { api: 'http://127.0.0.1:4178/api' },\n  producao: { api: 'https://api.exemplo.invalid/v1' }\n};\nfunction obterApi(ambiente) {\n  if (!Object.hasOwn(configuracoes, ambiente)) throw new Error('Ambiente desconhecido');\n  return configuracoes[ambiente].api;\n}\nconsole.log(obterApi('desenvolvimento'));\n// O domínio .invalid é ilustrativo; nenhuma requisição é feita.\n",
            "docs": [
              {
                "kind": "doc",
                "title": "GitHub Docs · Criar um site no Pages",
                "url": "https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Node.js · Variáveis de ambiente",
                "url": "https://nodejs.org/learn/command-line/how-to-read-environment-variables-from-nodejs",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "MDN · Usando Fetch",
                "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
                "language": "EN"
              }
            ]
          },
          {
            "id": "delivery-ci",
            "title": "Testes de entrega, observação e recuperação",
            "minutes": 130,
            "concept": "Transforme um roteiro manual em verificações repetíveis, leia falhas após uma entrega e tenha uma forma concreta de voltar à última versão estável.",
            "objectives": [
              "Usar testes unitários, integração local e um roteiro de navegação para cobrir riscos distintos.",
              "Entender gatilhos e resultado de uma rotina de integração contínua.",
              "Registrar sintomas, reproduzir, corrigir, verificar e preparar rollback."
            ],
            "exercise": "Rode os testes com node --test; provoque uma regressão, localize a falha e descreva como impedir a publicação.",
            "code": "// Salve como regra.test.js e rode: node --test regra.test.js\nconst test = require('node:test');\nconst assert = require('node:assert/strict');\nfunction normalizarTitulo(valor) {\n  if (typeof valor !== 'string' || !valor.trim()) throw new TypeError('Título obrigatório');\n  return valor.trim();\n}\ntest('remove espaços externos', () => assert.equal(normalizarTitulo('  HTML  '), 'HTML'));\ntest('recusa título vazio', () => assert.throws(() => normalizarTitulo('  '), TypeError));\n",
            "docs": [
              {
                "kind": "doc",
                "title": "Node.js · Test runner",
                "url": "https://nodejs.org/api/test.html",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · Entenda o GitHub Actions",
                "url": "https://docs.github.com/en/actions/get-started/understand-github-actions",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "W3C WAI · Testes básicos de acessibilidade",
                "url": "https://www.w3.org/WAI/test-evaluate/preliminary/",
                "language": "EN"
              }
            ]
          },
          {
            "id": "delivery-requirements",
            "title": "Requisitos novos, colaboração e portfólio",
            "minutes": 140,
            "concept": "Converta pedidos vagos em comportamentos observáveis, ajuste um projeto existente sem quebrar o que já funciona e apresente a entrega com clareza.",
            "objectives": [
              "Escrever critérios de aceitação e casos limite antes da mudança.",
              "Estimar impacto, abrir uma alteração pequena e comunicar decisão, teste e pendências.",
              "Documentar execução, dependências, limitações e demonstração no README."
            ],
            "exercise": "Receba o novo requisito “impedir títulos duplicados sem diferenciar maiúsculas”; escreva critérios, implemente, teste e documente a mudança.",
            "code": "// Salve como requisito.js e rode: node requisito.js\nfunction podeAdicionar(lista, novoTitulo) {\n  const normalizar = valor => valor.trim().toLocaleLowerCase('pt-BR');\n  const novo = normalizar(novoTitulo);\n  return novo.length > 0 && !lista.some(item => normalizar(item.titulo) === novo);\n}\nconsole.log(podeAdicionar([{titulo:'HTML'}], '  html  ')); // false\nconsole.log(podeAdicionar([{titulo:'HTML'}], 'CSS'));      // true\n",
            "docs": [
              {
                "kind": "doc",
                "title": "GitHub Docs · Sintaxe básica de Markdown",
                "url": "https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "GitHub Docs · Sobre pull requests",
                "url": "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
                "language": "EN"
              },
              {
                "kind": "doc",
                "title": "Node.js · Test runner",
                "url": "https://nodejs.org/api/test.html",
                "language": "EN"
              }
            ]
          }
        ]
      }
    ]
  }
];

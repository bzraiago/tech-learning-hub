'use strict';

Object.assign(LESSON_GUIDES, {
  'setup-docker': {
    prerequisites: 'Conclua prep-workspace, prep-cycle e prep-errors. No Windows, saiba abrir o PowerShell como usuário comum e, somente quando a documentação solicitar, como administrador. Não execute esta instalação em computador corporativo sem autorização.',
    setup: 'Objetivo: verificar requisitos e disponibilizar Docker Engine e Compose. Requisitos: sistema compatível, virtualização disponível, espaço em disco, internet e permissão de instalação. Windows: confira wsl --status e wsl --version; se WSL não estiver instalado, siga a documentação Microsoft, reinicie quando solicitado e instale Docker Desktop com backend WSL 2. macOS: identifique Apple silicon ou Intel e use o instalador oficial correspondente. Linux: escolha sua distribuição na documentação oficial do Docker Engine e não misture comandos de Ubuntu, Debian, Fedora ou outras famílias. Verificação: em terminal novo execute docker version, docker compose version e docker run --rm hello-world. Resultado esperado: docker version mostra Client e Server, Compose mostra uma versão e hello-world termina com mensagem de sucesso. Problema comum: o cliente existe, mas não alcança o Engine; inicie Docker Desktop ou o serviço antes de alterar PATH ou permissões. Como parar e retomar: encerre containers de laboratório, feche Docker Desktop quando não precisar dele e, na retomada, repita docker version. Alternativa leve: faça a aula Seguir sem Docker em computador limitado e use SQLite até ter um computador compatível.',
    why: 'Docker permite reproduzir serviços locais com configuração declarada, mas depende de recursos do sistema operacional. Separar requisito, cliente, Engine e Compose evita reinstalar tudo quando somente uma camada falha.',
    sections: [
      {
        title: 'Verifique o computador antes de instalar',
        paragraphs: [
          'No Windows, WSL 2 usa virtualização. Execute wsl --status e wsl --version no PowerShell. Se o comando não existir ou informar requisito ausente, siga a documentação Microsoft e reinicie quando solicitado. Não altere firmware ou recursos do Windows sem autorização do responsável pelo computador.',
          'No macOS, confirme se o processador é Apple silicon ou Intel antes de escolher o instalador. No Linux, identifique distribuição e versão; as instruções e pacotes não são intercambiáveis entre todas as distribuições.',
          'Se o computador não atende aos requisitos, tem pouco espaço ou é administrado por outra pessoa, não force a instalação. A aula seguinte preserva o estudo de SQL com SQLite e registra o que ficará pendente.'
        ]
      },
      {
        title: 'Diferencie cliente, Engine e Compose',
        paragraphs: [
          'docker version consulta o cliente e tenta consultar o servidor, chamado Docker Engine. Ver apenas Client significa que o executável existe, mas o mecanismo ainda não está pronto. docker compose version verifica o plugin Compose separadamente.',
          'Docker Desktop reúne interface e mecanismo em Windows e macOS. No Linux, Docker Engine pode ser instalado como serviço. Entrar no grupo docker concede acesso de alto privilégio; não faça isso apenas para esconder um erro de permissão e siga a explicação de segurança da documentação oficial.'
        ]
      },
      {
        title: 'Execute um teste pequeno e saiba encerrar',
        paragraphs: [
          'Somente quando Client e Server responderem, execute docker run --rm hello-world. A primeira execução pode baixar uma imagem. O container imprime uma mensagem e é removido ao terminar por causa de --rm.',
          'Use docker ps para conferir containers em execução e docker ps -a para incluir os parados. O teste hello-world não prova conhecimento de volumes, redes ou bancos; ele comprova apenas que o caminho básico funciona.',
          'Para retomar, inicie Docker Desktop ou o serviço e repita docker version. As aulas de fundamentos, Compose e operação local no módulo Banco de Dados ensinam o laboratório depois desta preparação.'
        ]
      }
    ],
    example: {
      language: 'Terminal · no Windows, PowerShell',
      code: '# Windows, antes da instalação\nwsl --status\nwsl --version\n\n# Depois da instalação, em todos os sistemas\ndocker version\ndocker compose version\ndocker run --rm hello-world\ndocker ps',
      explanation: [
        'Os comandos wsl são específicos do Windows e verificam a base usada pelo caminho recomendado.',
        'docker version precisa exibir Client e Server; só a seção Client não basta.',
        'docker ps pode mostrar apenas o cabeçalho quando não há containers em execução.'
      ],
      expected: 'Client e Server acessíveis; Compose responde; hello-world termina com sucesso; docker ps não apresenta erro de conexão.'
    },
    guided: [
      { instruction: 'Registre sistema, versão, arquitetura, memória disponível e espaço livre antes de escolher o instalador.', result: 'Relatório de requisitos preenchido sem dados pessoais.' },
      { instruction: 'Siga somente a página oficial correspondente ao seu sistema e reinicie se o instalador ou WSL solicitar.', result: 'Docker Desktop/Engine instalado pelo caminho correto do sistema.' },
      { instruction: 'Em um terminal novo, execute docker version, docker compose version e somente então hello-world.', result: 'Cliente, servidor, Compose e execução mínima verificados separadamente.' }
    ],
    exercises: [
      { prompt: 'Prever: docker version mostrará Client, mas falhará na seção Server. O que isso indica?', hints: ['Separe o executável do mecanismo que atende às solicitações.'], solution: 'O cliente está instalado, mas o Engine não está iniciado, acessível ou autorizado. Primeiro confira Docker Desktop ou o serviço.', explanation: 'Reinstalar o cliente não é a primeira resposta para falha exclusiva do servidor.', expected: 'A resposta interpreta as observações por camada e sugere uma conferência antes de reinstalar.', criteria: ['Distingue o que a saída confirma sobre o comando e sobre o serviço.', 'Propõe uma verificação de baixo risco antes de alterar a instalação.'] },
      { prompt: 'Alterar: adapte o roteiro de verificação para seu sistema sem copiar comandos de outro sistema.', hints: ['wsl existe apenas no Windows.', 'No Linux, identifique a distribuição antes de instalar.'], solution: 'Windows: wsl --status; wsl --version; docker version; docker compose version. macOS/Linux: docker version; docker compose version. Em todos: hello-world somente após o Server responder.', explanation: 'A adaptação evita tratar instruções incompatíveis como universais.', expected: 'Roteiro identifica sistema, terminal e ordem de verificação.', criteria: ['Escolhe comandos compatíveis com o sistema informado e identifica o terminal em que serão executados.', 'Coloca o teste de execução depois de confirmar os pré-requisitos do serviço.'] },
      { prompt: 'Construir: produza um relatório reproduzível do ambiente Docker.', hints: ['Inclua sistema, arquitetura, fonte, comandos e saídas.', 'Não inclua nome de usuário, empresa ou credenciais.'], solution: 'Sistema/arquitetura: preencher\nFonte oficial: preencher\nWSL, se Windows: preencher\ndocker version: copiar saída relevante\ndocker compose version: copiar saída\nhello-world: sucesso ou erro observado', explanation: 'O relatório dá contexto suficiente para retomar ou pedir ajuda.', expected: 'Evidências reais e sem dados pessoais, separadas por camada.', criteria: ['Registra sistema e arquitetura, fonte consultada e comandos executados.', 'Separa resultados do cliente, serviço, Compose e teste mínimo conforme as verificações que realmente conseguiu fazer.', 'Remove identificadores pessoais e credenciais do relato.'] },
      { prompt: 'Investigar erro: no Linux, docker funciona apenas com sudo. O que verificar antes de mudar grupos ou permissões?', hints: ['Leia a mensagem real.', 'A documentação alerta que o grupo docker concede privilégios elevados.'], solution: 'Confirmar que o serviço está ativo, identificar propriedade do socket e consultar o pós-instalação oficial. Só aplicar uma opção de acesso compreendendo seu impacto; considerar modo rootless quando adequado.', explanation: 'Permissão ampla não deve ser usada como correção automática.', expected: 'A resposta propõe verificações baseadas no estado observado e justifica qualquer mudança de acesso.', criteria: ['Consulta evidências do serviço e do acesso atual antes de alterar permissões.', 'Explica o impacto de uma mudança de acesso e não a recomenda como correção automática.'] }
    ],
    mistakes: [
      'Executar wsl --install sem confirmar sistema, autorização e necessidade de reinício.',
      'Confundir docker --version com Engine funcionando; use docker version e confira Client e Server.',
      'Copiar comandos de uma distribuição Linux para outra.',
      'Adicionar o usuário ao grupo docker sem compreender que isso concede acesso equivalente a alto privilégio.',
      'Tratar hello-world como prova de domínio de Docker ou bancos.'
    ],
    quiz: [
      { question: 'docker version mostra apenas Client e erro no Server. O ambiente está pronto?', options: ['Sim', 'Não', 'Somente para PostgreSQL'], correctIndex: 1, explanation: 'O Engine também precisa responder.' },
      { question: 'Qual comando verifica o plugin Compose moderno?', options: ['docker compose version', 'docker-compose-file', 'wsl compose'], correctIndex: 0, explanation: 'O formato atual usa docker compose com espaço.' },
      { question: 'O grupo docker no Linux deve ser tratado como acesso de alto privilégio?', options: ['Sim', 'Não', 'Apenas quando há banco'], correctIndex: 0, explanation: 'O acesso ao socket do daemon permite operações com grande impacto no sistema.' }
    ],
    retry: { prompt: 'No Windows, a verificação inicial de WSL indica um requisito ausente e o computador é administrado por outra pessoa. Proponha um plano de estudo que registre o bloqueio, evite alterar virtualização sem autorização e use a rota SQLite até poder retomar Docker.', expected: 'O plano não força instalação nem mudança de firmware, registra o requisito observado e mantém Docker/PostgreSQL como pendências explícitas.', hint: 'O diagnóstico de requisitos vem antes de instalar ou conceder permissões.' },
    summary: [
      'No Windows, verifique WSL 2 e virtualização antes de instalar Docker Desktop.',
      'Confirme cliente, Engine e Compose separadamente.',
      'Use hello-world como teste mínimo, não como comprovação de domínio.',
      'Se os requisitos não forem atendidos, use a alternativa SQLite e mantenha Docker como pendência explícita.'
    ]
  },

  'setup-docker-alternative': {
    "prerequisiteLessons": [
      "setup-editor",
      "setup-python"
    ],
    "prerequisites": "Tenha concluído Preparar o editor de código e Instalar e verificar Python 3. Use os atalhos de pré-requisitos desta aula para abrir essas preparações. Você não precisa conhecer SQL nem saber escrever um programa Python: esta aula fornece o exemplo e ensina a colocá-lo no lugar certo.",
    "setup": "Objetivo: abrir, editar, salvar e executar um arquivo Python; depois observar um registro permanecer em um banco SQLite local.\nRequisitos: VS Code e Python 3 instalados, permissão para criar uma pasta sua e este curso aberto no navegador. Não é necessário instalar extensão do VS Code, SQLite por pip ou Docker para esta prática.\nPercurso: leia Conceito para reconhecer os lugares da tela. Depois clique em Continuar: Exemplo no rodapé ou na aba Exemplo. Lá estão os passos numerados de execução, com o código no momento em que será usado. Não execute nada desta aula antes de abrir Exemplo.\nWindows: siga o caminho principal com VS Code e py. Se py falhar, o passo 4 ensina a verificar python. Use apenas o comando que responder Python 3.\nmacOS: abra as caixas macOS nos passos 1 e 2 e macOS ou Linux no passo 4. O comando será python3; os atalhos de edição usam Command no lugar de Ctrl.\nLinux: abra as caixas Linux nos passos 1 e 2 e macOS ou Linux no passo 4. O comando será python3.\nVerificação: no Exemplo, confirme primeiro uma mensagem simples; só depois execute o programa SQLite.\nResultado esperado: Arquivo Python funcionando no primeiro teste; depois duas mensagens do SQLite e uma contagem que aumenta em 1 a cada execução.\nProblema comum: se colar um comando de terminal dentro do .py, Python poderá mostrar SyntaxError. O passo 9 ensina a identificar esse e outros casos.\nComo parar e retomar: o programa termina sozinho; o passo 10 ensina a reabrir a mesma pasta. Não apague os arquivos de banco de tentativas anteriores.\nAlternativa leve: esta é a rota sem Docker. Se também não puder usar Python local, leia a explicação e deixe a prática pendente. Ler no navegador não cria o banco.",
    "why": "Docker pode exigir recursos ou permissões indisponíveis no computador. SQLite permite esta primeira prática de dados em um arquivo local. A meta da etapa 0 é conseguir executar e reconhecer o resultado; configurar PostgreSQL e escrever consultas sozinho vêm depois.",
    "sections": [
      {
        "title": "Reconheça pasta, arquivo e programa",
        "paragraphs": [
          "alternativa-sqlite é a pasta: ela agrupa os arquivos deste exercício. sqlite_alternativa.py é um arquivo de texto dentro dela. O final .py indica que seu conteúdo é código Python.",
          "Python é o programa que lê esse arquivo e executa suas instruções. Criar um arquivo vazio não cria um programa: precisamos escrever algo nele e salvar.",
          "alternativa-sqlite.db será o arquivo de dados criado pelo exemplo. Você não precisa criá-lo nem editá-lo. Ele não é texto comum e pode aparecer como binário se for aberto no editor."
        ],
        "terms": [
          {
            "term": "Banco de dados",
            "meaning": "Lugar organizado onde o programa guarda e consulta informações. Nesta prática, os dados ficam em um arquivo .db no computador."
          },
          {
            "term": "SQLite",
            "meaning": "Ferramenta de banco de dados que o exemplo usa sem iniciar um servidor separado."
          }
        ]
      },
      {
        "title": "Reconheça os três lugares em que você vai trabalhar",
        "paragraphs": [
          "Navegador: mostra esta aula. Os campos de rascunho guardam suas observações; eles não executam o programa.",
          "Editor do VS Code: é a área central com uma aba chamada sqlite_alternativa.py e números de linha à esquerda. Nela você escreve o conteúdo do arquivo e usa Arquivo > Salvar.",
          "Terminal do VS Code: é o painel normalmente na parte inferior, aberto pelo menu Terminal > Novo Terminal. Nele você pede ao Python para executar o arquivo. Cada comando só é enviado quando você pressiona Enter.",
          "Na aba Exemplo, os blocos ARQUIVO são conteúdo do editor. Os blocos TERMINAL são comandos do painel inferior. Os resultados esperados são mensagens para comparar com a tela, não para copiar para nenhum desses lugares."
        ]
      },
      {
        "title": "O primeiro resultado será só uma mensagem",
        "paragraphs": [
          "Antes do banco, vamos executar uma única linha: print(\"Arquivo Python funcionando\"). print significa mostrar algo na tela; as aspas delimitam o texto da mensagem. Quando o arquivo for executado, o terminal deverá mostrar Arquivo Python funcionando, sem as aspas.",
          "Esse primeiro teste confirma que você abriu o arquivo certo, salvou e executou no lugar certo. Só depois dele trocaremos o conteúdo pelo exemplo SQLite.",
          "O exemplo SQLite cria uma tabela chamada marcador, acrescenta um registro e conta quantos registros existem. Pense em tabela como uma lista organizada e em registro como uma linha dessa lista. Não será pedido que você invente comandos SQL nesta preparação."
        ]
      },
      {
        "title": "O que esta alternativa permite concluir",
        "paragraphs": [
          "Cada execução do exemplo completo acrescenta uma linha ao mesmo arquivo de banco. Por isso a contagem aumenta; fechar o VS Code não apaga essas linhas.",
          "Você poderá registrar que executou Python e SQLite localmente. Docker, Compose, rede e PostgreSQL continuam pendentes. Retome Preparar Docker, WSL e virtualização quando o computador e as permissões permitirem.",
          "Agora clique em Continuar: Exemplo. A sequência começa pela pasta e não exige ter executado nenhum código desta aula ainda."
        ]
      }
    ],
    "example": {
      "language": "Python 3",
      "code": "# Este bloco inteiro pertence ao arquivo sqlite_alternativa.py.\nimport sqlite3\n\nprint(\"Iniciando a pratica SQLite.\")\n\n# Abre o banco na pasta atual; cria o arquivo se ele ainda nao existir.\nbanco = sqlite3.connect(\"alternativa-sqlite.db\")\n\n# Prepara uma tabela e acrescenta uma linha a cada execucao.\nbanco.execute(\"CREATE TABLE IF NOT EXISTS marcador (texto TEXT NOT NULL)\")\nbanco.execute(\"INSERT INTO marcador (texto) VALUES ('alternativa local')\")\nbanco.commit()\n\n# Consulta a quantidade de linhas e mostra o numero no terminal.\nresultado = banco.execute(\"SELECT COUNT(*) FROM marcador\").fetchone()\nprint(\"Registros de marcador:\", resultado[0])\nbanco.close()",
      "steps": [
        {
          "title": "Localize ou crie a pasta do exercício",
          "paragraphs": [
            "Windows: pressione Windows + E para abrir o Explorador de Arquivos. Se você já criou alternativa-sqlite, encontre essa pasta no local que escolheu anteriormente e use a mesma. Não crie uma segunda pasta com o mesmo nome em outro lugar.",
            "Se está começando agora: clique em Documentos no Explorador. Pressione Ctrl+Shift+N, digite alternativa-sqlite e pressione Enter. Esse atalho cria uma pasta; o nome não inclui .py.",
            "Abra alternativa-sqlite com dois cliques. Clique na barra de endereço do Explorador, na parte de cima da janela, para ver o caminho completo. Anote onde a pasta fica; você a selecionará no próximo passo."
          ],
          "alternatives": [
            {
              "title": "macOS",
              "paragraphs": [
                "Abra Finder > Documentos. Se a pasta alternativa-sqlite já existir, use-a. Caso contrário, escolha Arquivo > Nova Pasta, digite alternativa-sqlite e pressione Return. Abra a pasta e lembre esse local."
              ]
            },
            {
              "title": "Linux",
              "paragraphs": [
                "Abra o aplicativo Arquivos e entre em Documentos ou em outra pasta pessoal gravável. Use a opção Nova pasta do menu ou do botão direito, dê o nome alternativa-sqlite e abra-a. Se ela já existir, use a pasta existente. Os nomes podem variar conforme o ambiente gráfico."
              ]
            }
          ],
          "expected": "Você vê a pasta alternativa-sqlite aberta no gerenciador de arquivos e sabe em que local ela está. Ainda não é necessário ter um arquivo Python."
        },
        {
          "title": "Abra essa pasta no VS Code",
          "paragraphs": [
            "Windows: abra Iniciar, pesquise Visual Studio Code e clique no aplicativo. Se ele já estiver aberto, use essa janela. Você pode alternar entre a aula no navegador e o VS Code pela barra de tarefas.",
            "No VS Code, clique em Arquivo > Abrir Pasta (File > Open Folder). Na janela que abrir, clique em Documentos na lateral se criou a pasta ali; clique em alternativa-sqlite e confirme em Selecionar Pasta (Select Folder). Se usou outro local, clique na barra de endereço dessa janela, digite ou cole o caminho completo que viu no passo 1 e pressione Enter; depois confirme em Selecionar Pasta. Se aparecer uma pergunta sobre confiança, confirme apenas para essa pasta que você mesmo criou.",
            "À esquerda, procure o painel Explorador (Explorer). Se estiver oculto, clique em Exibir > Explorador (View > Explorer). Se o nome da pasta estiver recolhido, clique na seta ao lado de alternativa-sqlite para mostrar seus arquivos."
          ],
          "alternatives": [
            {
              "title": "macOS ou Linux",
              "paragraphs": [
                "Abra Visual Studio Code pela lista de aplicativos do sistema (no macOS, Finder > Aplicativos; no Linux, menu de aplicativos). Use Arquivo > Abrir Pasta (File > Open Folder), selecione a pasta criada no passo 1 e confirme em Abrir/Open. Use Exibir > Explorador para mostrar a lista à esquerda."
              ]
            }
          ],
          "expected": "O painel esquerdo do VS Code mostra alternativa-sqlite. Esta é a pasta de trabalho, mesmo que ainda esteja vazia."
        },
        {
          "title": "Escreva uma mensagem e salve o arquivo Python",
          "paragraphs": [
            "Se sqlite_alternativa.py já aparecer à esquerda, clique no nome para abri-lo. Se não aparecer, escolha Arquivo > Novo Arquivo de Texto (File > New Text File). No Windows/Linux, Ctrl+N também abre um texto novo; no macOS, use Command+N.",
            "Clique na área central de edição, ao lado do número de linha 1. Se houver tentativas anteriores nesse arquivo, selecione o conteúdo com Ctrl+A (Command+A no macOS). Vamos substituí-lo temporariamente por uma linha simples. A seleção deve estar dentro do editor, não no navegador ou no terminal.",
            "Digite exatamente a linha do bloco ARQUIVO abaixo, incluindo parênteses e aspas. O texto cinza “Gerar código” ou semelhante em um editor vazio é uma sugestão do aplicativo; você pode começar a digitar normalmente.",
            "Clique em Arquivo > Salvar (File > Save). Se abrir a janela de salvamento, selecione a pasta alternativa-sqlite, digite sqlite_alternativa.py no campo Nome e confirme em Salvar. Se existir a opção Tipo, escolha Todos os arquivos; evite terminar com .py.txt. Para salvar novamente, use Ctrl+S (Command+S no macOS)."
          ],
          "blocks": [
            {
              "label": "ARQUIVO — selecione e copie somente o código abaixo para a área central do VS Code",
              "code": "print(\"Arquivo Python funcionando\")"
            }
          ],
          "alternatives": [
            {
              "title": "Quero guardar o código de uma tentativa anterior",
              "paragraphs": [
                "Antes de substituir, use Arquivo > Salvar Como e salve uma cópia chamada tentativa-anterior.py na mesma pasta. Depois clique no arquivo original sqlite_alternativa.py no Explorador e faça o passo acima nele. Os arquivos .db não serão apagados."
              ]
            }
          ],
          "expected": "A aba central e a lista à esquerda mostram sqlite_alternativa.py. Dentro dele há apenas print(\"Arquivo Python funcionando\"). Uma bolinha na aba indica alteração pendente; após salvar ela deve desaparecer (com salvamento automático, pode nem aparecer)."
        },
        {
          "title": "Abra o terminal e confirme qual comando encontra Python",
          "paragraphs": [
            "No menu superior do VS Code, clique em Terminal > Novo Terminal (Terminal > New Terminal). Clique dentro do painel Terminal que abriu, normalmente na parte inferior. Você deve ver um cursor após um caminho e um sinal como >, $ ou %.",
            "No Windows PowerShell, uma linha pode começar com PS e terminar em alternativa-sqlite>. No Prompt de Comando, ela não começa com PS. Ambos aceitam os comandos Python desta aula. Não copie PS, o caminho ou o sinal >; digite somente o comando do bloco TERMINAL e pressione Enter.",
            "Use py --version primeiro no Windows. Se responder Python 3 seguido de números, anote py como seu comando. Não é preciso que a versão seja igual à de outra pessoa. Se falhar, abra a alternativa abaixo; isso por si só não prova que Python está ausente.",
            "Se o terminal estiver em outra pasta, clique na lixeira do painel para fechar apenas esse terminal; no Explorador do VS Code, clique com o botão direito na pasta alternativa-sqlite e escolha Abrir no Terminal Integrado (Open in Integrated Terminal)."
          ],
          "blocks": [
            {
              "label": "TERMINAL — Windows: digite esta linha no painel inferior e pressione Enter",
              "code": "py --version"
            }
          ],
          "alternatives": [
            {
              "title": "Windows: py não encontrou Python",
              "paragraphs": [
                "No mesmo terminal, digite python --version e pressione Enter. Se aparecer Python 3.x.x, anote python como seu comando e substitua apenas o início py dos comandos seguintes por python. Exemplo: python sqlite_alternativa.py. Se a Microsoft Store abrir ou nenhum dos comandos mostrar Python 3, pare e retorne a Instalar e verificar Python 3."
              ],
              "blocks": [
                {
                  "label": "TERMINAL — Windows: digite esta linha no painel inferior e pressione Enter",
                  "code": "python --version"
                }
              ]
            },
            {
              "title": "macOS ou Linux",
              "paragraphs": [
                "No terminal integrado do VS Code, digite pwd e pressione Enter: o caminho mostrado deve terminar em alternativa-sqlite. Se estiver diferente, reabra o terminal pelo botão direito na pasta, conforme a instrução acima. Depois digite python3 --version. Continue somente se aparecer Python 3.x.x. Seu comando será python3: em todos os próximos passos, use python3 no lugar de py."
              ],
              "blocks": [
                {
                  "label": "TERMINAL — macOS/Linux: uma linha por vez, pressionando Enter após cada uma",
                  "code": "pwd\npython3 --version"
                }
              ]
            },
            {
              "title": "Aparece >>> no lugar do caminho da pasta",
              "paragraphs": [
                "Você entrou no modo interativo do Python. Nesse painel, digite exit() e pressione Enter para voltar ao terminal do sistema. Então faça a verificação de versão acima. exit() é usado somente para sair desse modo."
              ]
            }
          ],
          "expected": "O terminal está na pasta alternativa-sqlite; você viu Python 3.x.x e anotou o comando que funcionou: py, python ou python3. Não prossiga com uma mensagem de erro."
        },
        {
          "title": "Execute a mensagem simples antes de usar o banco",
          "paragraphs": [
            "Confirme que o arquivo da área central foi salvo. Clique no Terminal inferior, digite a linha abaixo e pressione Enter. Faça isso uma vez. O espaço separa o comando py do nome do arquivo.",
            "Antes de pressionar Enter, diga o que espera ver. A confirmação será Arquivo Python funcionando em uma linha do terminal, seguida do retorno do caminho da pasta. Isso é o resultado; não precisa digitá-lo.",
            "Se não aparecer a mensagem, pare aqui. Clique na aba sqlite_alternativa.py, confira a linha print, use Arquivo > Salvar e só então repita o comando no terminal. Se houver erro, veja o passo Diagnóstico ao final desta sequência. Não avance para SQLite enquanto esse teste não funcionar."
          ],
          "blocks": [
            {
              "label": "TERMINAL — Windows: digite esta linha no painel inferior e pressione Enter",
              "code": "py sqlite_alternativa.py"
            }
          ],
          "alternatives": [
            {
              "title": "Se você escolheu python, macOS ou Linux no passo de verificação",
              "paragraphs": [
                "No Windows com python funcionando, digite python sqlite_alternativa.py. No macOS/Linux, digite python3 sqlite_alternativa.py. Use sempre o mesmo comando que mostrou Python 3. O restante da aula é igual."
              ]
            }
          ],
          "expected": "O terminal mostra Arquivo Python funcionando. Você comprovou abrir → editar → salvar → executar. Ainda não há necessidade de criar ou contar registros."
        },
        {
          "title": "Troque a mensagem pelo exemplo completo de SQLite",
          "paragraphs": [
            "Agora volte à aba sqlite_alternativa.py, na área central. Clique dentro do código e selecione tudo com Ctrl+A (Command+A no macOS). Você vai substituir a mensagem simples pelo bloco inteiro abaixo.",
            "No navegador, selecione com o mouse somente as linhas dentro do bloco ARQUIVO, da primeira linha iniciada por # até banco.close(). Copie com Ctrl+C (Command+C no macOS). Volte ao editor central do VS Code e cole com Ctrl+V (Command+V no macOS). Não copie o título do bloco nem um bloco TERMINAL.",
            "O código abaixo é um exemplo guiado para preparar o ambiente. Você pode copiá-lo completo nesta etapa; a escrita de SQL será estudada na trilha de dados. Linhas iniciadas por # são comentários: explicam o trecho e não são executadas.",
            "Use Arquivo > Salvar. Confira no editor três sinais: há import sqlite3 perto do início, print(\"Registros de marcador:\", resultado[0]) perto do fim e banco.close() na última linha. Não deve existir uma linha py sqlite_alternativa.py dentro do arquivo."
          ],
          "blocks": [
            {
              "label": "ARQUIVO — selecione e copie somente o código abaixo para a área central do VS Code",
              "code": "# Este bloco inteiro pertence ao arquivo sqlite_alternativa.py.\nimport sqlite3\n\nprint(\"Iniciando a pratica SQLite.\")\n\n# Abre o banco na pasta atual; cria o arquivo se ele ainda nao existir.\nbanco = sqlite3.connect(\"alternativa-sqlite.db\")\n\n# Prepara uma tabela e acrescenta uma linha a cada execucao.\nbanco.execute(\"CREATE TABLE IF NOT EXISTS marcador (texto TEXT NOT NULL)\")\nbanco.execute(\"INSERT INTO marcador (texto) VALUES ('alternativa local')\")\nbanco.commit()\n\n# Consulta a quantidade de linhas e mostra o numero no terminal.\nresultado = banco.execute(\"SELECT COUNT(*) FROM marcador\").fetchone()\nprint(\"Registros de marcador:\", resultado[0])\nbanco.close()"
            }
          ],
          "expected": "O arquivo salvo contém o bloco completo de SQLite. Trocar o texto no editor e salvar ainda não executa o programa nem altera o banco."
        },
        {
          "title": "Execute SQLite uma vez e leia as duas mensagens",
          "paragraphs": [
            "Clique no Terminal inferior e execute o mesmo comando usado para a mensagem simples. O nome do arquivo não mudou, apenas seu conteúdo salvo.",
            "Espere duas linhas: Iniciando a pratica SQLite. e Registros de marcador: seguido de um número. Se alternativa-sqlite.db não existia, o número será 1. Se você já fez tentativas com esse banco, o número pode ser maior; isso não é um erro.",
            "No painel Explorador, procure alternativa-sqlite.db ao lado de sqlite_alternativa.py. O programa criou ou abriu esse arquivo automaticamente. Não é preciso abri-lo, editá-lo ou criar uma pasta com esse nome.",
            "Anote a contagem que realmente apareceu. estudos.db, se existir de uma versão anterior da aula, é outro arquivo e não é usado por este exemplo. Mantenha-o como está."
          ],
          "blocks": [
            {
              "label": "TERMINAL — Windows: digite esta linha no painel inferior e pressione Enter",
              "code": "py sqlite_alternativa.py"
            }
          ],
          "alternatives": [
            {
              "title": "Se você escolheu python, macOS ou Linux no passo de verificação",
              "paragraphs": [
                "No Windows com python funcionando, digite python sqlite_alternativa.py. No macOS/Linux, digite python3 sqlite_alternativa.py. Use sempre o mesmo comando que mostrou Python 3. O restante da aula é igual."
              ]
            }
          ],
          "expected": "Duas mensagens no terminal e o arquivo alternativa-sqlite.db no Explorador. Exemplo com banco novo: Iniciando a pratica SQLite. / Registros de marcador: 1. A barra aqui separa as duas linhas, não faz parte da saída."
        },
        {
          "title": "Execute de novo e observe a persistência",
          "paragraphs": [
            "Antes de executar novamente, olhe o último número e preveja qual será o próximo. Cada execução acrescenta exatamente um registro. Se você viu 1, espere 2; se viu 5, espere 6.",
            "No Terminal inferior, digite o mesmo comando e pressione Enter uma vez. Compare com sua previsão. Não troque a pasta nem apague o banco para forçar a contagem a começar em 1.",
            "Agora você viu persistência: as linhas anteriores ficaram no arquivo .db e a nova execução acrescentou uma linha. Se a contagem reiniciou, confira se usou outra pasta ou outro arquivo de banco."
          ],
          "blocks": [
            {
              "label": "TERMINAL — Windows: digite esta linha no painel inferior e pressione Enter",
              "code": "py sqlite_alternativa.py"
            }
          ],
          "alternatives": [
            {
              "title": "Se você escolheu python, macOS ou Linux no passo de verificação",
              "paragraphs": [
                "No Windows com python funcionando, digite python sqlite_alternativa.py. No macOS/Linux, digite python3 sqlite_alternativa.py. Use sempre o mesmo comando que mostrou Python 3. O restante da aula é igual."
              ]
            }
          ],
          "expected": "O número passou de N para N + 1, em que N é a contagem que você realmente anotou no passo anterior."
        },
        {
          "title": "Diagnóstico: use apenas o caso que corresponde à sua tela",
          "paragraphs": [
            "Se um passo falhou, não execute os seguintes. Registre o comando, a mensagem completa e o que esperava ver. Abra abaixo somente o caso parecido com o seu, faça uma correção e retorne ao passo que falhou."
          ],
          "alternatives": [
            {
              "title": "SyntaxError aponta uma linha como py sqlite_alternativa.py",
              "paragraphs": [
                "O comando de terminal está dentro do arquivo salvo. Clique na aba sqlite_alternativa.py na área central e substitua o conteúdo pelo bloco ARQUIVO do passo em que você está: a mensagem simples no passo 3 ou SQLite no passo 6. Salve. Clique no Terminal inferior e digite o comando ali. Se você apagou a linha no editor mas o erro continua igual, confira se salvou a alteração."
              ]
            },
            {
              "title": "O terminal volta ao caminho da pasta sem mostrar nada",
              "paragraphs": [
                "Um arquivo vazio pode terminar sem mensagem. Abra sqlite_alternativa.py pelo painel esquerdo e confira seu conteúdo. No teste simples, precisa existir a linha print; no teste SQLite, o bloco deve estar completo. Use Arquivo > Salvar e execute novamente. Se continuar, confirme o nome da aba e a pasta do terminal; pode estar executando outra cópia do arquivo."
              ]
            },
            {
              "title": "can’t open file / No such file or directory",
              "paragraphs": [
                "Python não encontrou o nome solicitado nessa pasta. Confira no Explorador do VS Code se o nome é sqlite_alternativa.py, sem .txt no final. Se estiver errado, clique com o botão direito no arquivo, escolha Renomear e corrija. Confira também se o terminal foi aberto na pasta alternativa-sqlite conforme o passo 4."
              ]
            },
            {
              "title": "SyntaxError ou IndentationError aponta uma linha do código Python",
              "paragraphs": [
                "Confira o número da linha no erro e compare essa linha com o bloco ARQUIVO. Verifique aspas retas, parênteses, partes faltando e espaços antes das instruções. Neste exemplo, as instruções começam na margem esquerda. Corrija uma diferença, salve e execute novamente; a cor do texto no editor não indica erro por si só."
              ]
            },
            {
              "title": "No module named sqlite3",
              "paragraphs": [
                "Esta distribuição do Python não disponibilizou o módulo SQLite. Registre a versão e o comando que usou e retorne a Instalar e verificar Python 3 para conferir a distribuição. Não instale um pacote chamado sqlite3 via pip. Deixe a prática SQLite pendente até resolver o módulo."
              ]
            },
            {
              "title": "O comando py não funciona ou abre a loja",
              "paragraphs": [
                "Retorne à alternativa Windows do passo 4 e confira python --version. Use somente um comando que mostrou Python 3.x.x. Não conclua que Python está ausente só porque py falhou."
              ]
            },
            {
              "title": "No such table/column, database is locked ou banco diferente de uma tentativa antiga",
              "paragraphs": [
                "Não apague o banco antigo. Encerre outro programa que o esteja usando e confira se copiou o bloco inteiro. Se você alterou a estrutura do banco numa tentativa anterior, crie uma nova pasta de prática pelo passo 1, com o nome alternativa-sqlite-reinicio, e faça o roteiro ali. O nome do script continua sqlite_alternativa.py; no terminal, confira agora o nome da nova pasta. Isso cria uma base isolada e preserva a anterior."
              ]
            }
          ],
          "expected": "Você identificou o passo e a mensagem da falha, corrigiu uma causa e repetiu o mesmo passo. Se não conseguir confirmar a correção, registre a pendência em vez de marcar a prática como feita."
        },
        {
          "title": "Pare, retome e passe para a prática",
          "paragraphs": [
            "Quando o caminho da pasta reaparece após as mensagens, o programa já terminou. Não há servidor para desligar. Salve o arquivo e pode fechar o VS Code.",
            "Para retomar, abra novamente o VS Code e use Arquivo > Abrir Pasta para selecionar a mesma alternativa-sqlite. Clique em sqlite_alternativa.py na lista da esquerda, abra Terminal > Novo Terminal e execute o comando que você verificou. O banco existente permanece; a execução acrescentará mais um registro.",
            "Leia abaixo a explicação das linhas. Depois clique em Continuar: Prática no rodapé. Os exercícios partem da última contagem observada, sem exigir que você volte a 1. Você ainda não precisa escrever uma nova tabela sozinho."
          ],
          "expected": "Você sabe localizar o script, o banco e o terminal e retomar a execução sem apagar as tentativas anteriores."
        }
      ],
      "explanation": [
        "print(\"Arquivo Python funcionando\") foi o teste de abertura, salvamento e execução. No programa completo, os dois print mostram o início e a contagem; nada é exibido automaticamente apenas porque você criou um arquivo.",
        "import sqlite3 disponibiliza o módulo de acesso ao SQLite. Um módulo é um conjunto de ferramentas que o programa pode usar. banco = sqlite3.connect(...) guarda em banco a conexão com o arquivo .db na pasta de trabalho do terminal.",
        "banco.execute(...) envia ao SQLite o texto entre aspas. CREATE TABLE IF NOT EXISTS prepara a tabela marcador se ela ainda não existir. texto TEXT NOT NULL define uma coluna de texto que não aceita ausência de valor. Aqui estamos apenas usando esse modelo pronto.",
        "INSERT INTO marcador (texto) VALUES (...) acrescenta uma linha com o texto alternativa local. banco.commit() confirma essa gravação. O script usa um texto fixo de exemplo; ele não recebe dados digitados por outras pessoas.",
        "SELECT COUNT(*) FROM marcador pergunta quantas linhas há na tabela. fetchone() obtém uma linha de resposta, guardada em resultado. resultado[0] pega o primeiro valor dessa linha: o número que o print mostra.",
        "banco.close() fecha a conexão. Ele não apaga o arquivo. Rodar o programa novamente abre o mesmo banco e acrescenta mais uma linha. SQL, consultas e parâmetros serão desenvolvidos na trilha de dados."
      ],
      "expected": "Primeiro você viu Arquivo Python funcionando. Depois viu as duas mensagens do programa SQLite e a contagem crescer em 1 ao executar novamente na mesma pasta. O número inicial depende de o banco já existir."
    },
    "guided": [
      {
        "instruction": "Sem executar novamente, localize no painel esquerdo o script e o banco. Diga qual arquivo você edita e qual é criado pelo programa.",
        "result": "sqlite_alternativa.py contém o código; alternativa-sqlite.db guarda os registros."
      },
      {
        "instruction": "Aponte a área em que colocou print e a área em que digitou o comando de execução. Diga por que foi necessário salvar antes de executar.",
        "result": "Código na área central; comando no terminal. Python lê a versão salva do arquivo."
      },
      {
        "instruction": "Compare as duas últimas contagens reais. Registre se a segunda é a primeira mais 1; se não for, retorne ao passo de diagnóstico.",
        "result": "A comparação se baseia nas saídas observadas, sem inventar valores nem reiniciar o banco."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: depois do exemplo, olhe a última contagem no terminal. No campo Seu rascunho abaixo, anote esse número e o que espera após mais uma execução. Clique no Terminal do VS Code e execute py sqlite_alternativa.py uma vez (ou python/python3, conforme o comando verificado). Volte ao rascunho e registre o número observado.",
        "hints": [
          "Use o último resultado, que pode ser maior que 2.",
          "Cada execução do bloco completo acrescenta uma linha."
        ],
        "solution": "Situação: anotei 4. Previsão: uma execução acrescentará 1, então espero 5. Observação: registrei a saída real e comparei. Substitua os valores pelas suas evidências.",
        "explanation": "A previsão usa a situação atual; não pede uma primeira execução depois de várias tentativas.",
        "expected": "Entrada: sua última contagem N. Saída a registrar: nova contagem após uma execução. Compare os números; não apague o banco para reproduzir um número do exemplo.",
        "criteria": [
          "Registra a previsão antes de executar.",
          "Compara a contagem real com a anterior e explica se aumentou em 1."
        ]
      },
      {
        "prompt": "Alterar: clique na aba sqlite_alternativa.py. Na linha print(\"Registros de marcador:\", resultado[0]), troque somente o texto Registros de marcador: por Total de registros:. Preserve aspas, vírgula, resultado[0] e parênteses. Salve pelo menu Arquivo > Salvar. No Terminal, execute o mesmo comando e anote a nova mensagem.",
        "hints": [
          "Você altera o rótulo exibido, não o comando SELECT nem o nome do banco.",
          "Confira se salvou antes de concluir que a alteração não funcionou."
        ],
        "solution": "ARQUIVO — linha alterada:\nprint(\"Total de registros:\", resultado[0])\n\nDepois de salvar, execute pelo TERMINAL com o comando já verificado.",
        "explanation": "Mudar o texto do print muda a apresentação. O INSERT continua acrescentando uma linha e a contagem continua aumentando.",
        "expected": "Se antes havia N registros, uma execução mostra Total de registros: N+1. O arquivo de banco continua o mesmo.",
        "criteria": [
          "Altera apenas o texto do print e salva.",
          "Observa o novo rótulo e confirma que a contagem continua aumentando em 1."
        ]
      },
      {
        "prompt": "Construir: crie um registro para conseguir retomar amanhã. No VS Code, escolha Arquivo > Novo Arquivo de Texto. Escreva cinco linhas: Pasta: (seu local); Script: (nome do .py); Comando: (o que funcionou); Última saída: (a mensagem real); Pendente: Docker e PostgreSQL. Use Arquivo > Salvar Como e salve na pasta alternativa-sqlite com o nome resultado-sqlite.txt. Você está criando um arquivo de anotações; não execute esse .txt.",
        "hints": [
          "O comando do relatório pode ser py, python ou python3; registre o seu.",
          "A pasta é o local selecionado no passo 1; copie a saída real do terminal ou transcreva-a."
        ],
        "solution": "Exemplo de relatório fictício:\nPasta: minha pasta alternativa-sqlite em Documentos\nScript: sqlite_alternativa.py\nComando: py sqlite_alternativa.py\nÚltima saída: Total de registros: 6\nPendente: Docker e PostgreSQL\n\nUse seus próprios valores observados.",
        "explanation": "A transferência é construir um arquivo novo de apoio usando a mesma habilidade de criar, editar e salvar, sem cobrar SQL ainda não ensinado.",
        "expected": "resultado-sqlite.txt aparece no Explorador com os cinco campos preenchidos. A última saída deve corresponder à sua tela; o relatório não é um programa.",
        "criteria": [
          "Salva o relatório na pasta da prática, com nome e extensão corretos.",
          "Registra evidência própria e mantém Docker/PostgreSQL como pendências."
        ]
      },
      {
        "prompt": "Investigar erro: analise no rascunho esta situação, sem estragar seu script: o aluno executou py sqlite_alternativa.py no terminal e recebeu SyntaxError: invalid syntax. O erro mostrou que a linha 1 do arquivo também era py sqlite_alternativa.py. Registre observação, hipótese, causa provável e uma correção. Explique em qual área deve ficar cada conteúdo. Use como evidência o texto da linha 1; não é necessário reproduzir a falha.",
        "hints": [
          "O erro informa o que Python leu dentro do arquivo salvo.",
          "Compare o início do bloco ARQUIVO com o comando do bloco TERMINAL."
        ],
        "solution": "Observação: a linha 1 salva é um comando do terminal. Hipótese/causa: ele foi colado no editor. Correção: abrir o .py, substituir pelo bloco ARQUIVO do exemplo e salvar. Então executar o comando somente no Terminal. Confirmar a mensagem de início e a contagem. Uma aba com mudanças não salvas pode explicar por que o erro antigo continua.",
        "explanation": "A investigação pode ser feita no papel. O texto apontado pelo erro permite localizar a troca de contexto sem alterar um programa que já funciona.",
        "expected": "Entrada: a mensagem e a linha 1 fornecidas. Entrega: diagnóstico com as duas áreas corretas, ação de salvamento e resultado que confirmaria a recuperação.",
        "criteria": [
          "Usa a linha apontada no erro para fundamentar a hipótese.",
          "Distingue código no arquivo de comando no terminal.",
          "Inclui salvar e conferir a saída, sem reinstalar Python sem evidência."
        ]
      }
    ],
    "requirementChange": {
      "prompt": "Novo pedido: além das mensagens atuais, o programa precisa escrever Pratica concluida. na última linha da saída. Preserve o banco, a inserção e a contagem. Você já usou print no primeiro teste: acrescente uma linha print ao final do arquivo, após banco.close(), salve e execute pelo mesmo terminal.",
      "criteria": [
        "Antes de editar, anote a última contagem N e preveja a próxima.",
        "Comportamento preservado: uma execução continua aumentando a contagem em 1.",
        "Comportamento novo: Pratica concluida. aparece depois da contagem. Registre a saída real e explique qual linha acrescentou."
      ]
    },
    "mistakes": [
      "Arquivo vazio ou não salvo: o terminal pode voltar ao caminho sem mensagem. Confira print no arquivo certo, use Arquivo > Salvar e repita o comando. A aparência vazia no editor não prova que a versão no disco esteja vazia.",
      "SyntaxError com py sqlite_alternativa.py na linha indicada: comando de terminal salvo dentro do .py. Reponha o bloco ARQUIVO e salve; execute o comando no painel Terminal.",
      "can’t open file ou No such file or directory: confira nome .py, possível final .py.txt e pasta do terminal pelo passo 4 do exemplo.",
      "SyntaxError em uma linha Python: compare aspas, parênteses e código copiado com o exemplo. IndentationError pode indicar espaços antes das instruções; neste exemplo elas começam na margem esquerda.",
      ">>> indica Python interativo: digite exit() nesse painel para voltar ao terminal do sistema antes de executar o arquivo.",
      "No module named sqlite3: registre a distribuição/versão e volte à preparação de Python. Não tente resolver instalando um pacote sqlite3 por pip.",
      "Contagem acima de 1 não é falha quando o banco já existia. Compare N com N+1. Recomeçar em outra pasta ou apagar o banco muda a situação inicial.",
      "Abrir .db no editor pode mostrar aviso de binário. O arquivo de código é .py; o banco é criado e consultado pelo programa.",
      "Ter executado SQLite não comprova Docker, PostgreSQL ou criação independente de consultas SQL. Registre essas práticas separadamente."
    ],
    "quiz": [
      {
        "question": "Qual linha mostra a contagem no terminal?",
        "options": [
          "print(\"Registros de marcador:\", resultado[0])",
          "sqlite3.connect(\"alternativa-sqlite.db\")",
          "CREATE TABLE IF NOT EXISTS marcador"
        ],
        "correctIndex": 0,
        "explanation": "print escreve a mensagem e o número no terminal."
      },
      {
        "question": "Onde fica alternativa-sqlite.db?",
        "options": [
          "Na pasta alternativa-sqlite do exercício",
          "No navegador",
          "Em um container Docker"
        ],
        "correctIndex": 0,
        "explanation": "O programa cria o arquivo na pasta de trabalho aberta no terminal."
      },
      {
        "question": "Se py --version responde “No installed Python found!”, mas python --version mostra Python 3.x.x, o que fazer?",
        "options": [
          "Usar python para executar o arquivo",
          "Reinstalar Python imediatamente",
          "Instalar sqlite3 com pip"
        ],
        "correctIndex": 0,
        "explanation": "Use o comando que encontrou o runtime Python 3."
      }
    ],
    "retry": {
      "prompt": "Uma colega mudou o texto do print no editor, mas o terminal continua mostrando a mensagem anterior. A aba do arquivo tem uma bolinha e não há SyntaxError. Explique uma hipótese, como conferir o arquivo/pasta usados, o que fazer antes de executar novamente e qual saída confirmará a correção.",
      "expected": "A resposta considera alteração não salva ou outra cópia do script, verifica a aba e a pasta, salva e compara a mensagem nova com a antiga. Não conclui que falta Python.",
      "hint": "Python executa a versão salva no disco; o editor pode estar mostrando mudanças ainda pendentes."
    },
    "summary": [
      "Pasta agrupa arquivos; .py contém o programa; .db guarda os dados.",
      "O editor recebe o código; o terminal recebe o comando de execução. Salve antes de executar.",
      "Primeiro confirme uma mensagem simples. Depois use o exemplo SQLite completo.",
      "Cada execução acrescenta uma linha; compare a contagem atual com a anterior, inclusive ao retomar.",
      "Na próxima etapa, aprenderemos a escrever consultas. Esta prática comprova apenas que você conseguiu seguir o ciclo com apoio.",
      "Na trilha Banco de Dados, você aprenderá a escrever consultas. Esta prática comprova apenas que conseguiu seguir o ciclo com apoio."
    ]
  }
});

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
    prerequisites: 'Antes, conclua a aula Instalar e verificar Python 3. Se Docker está indisponível, leia Preparar Docker, WSL e virtualização para registrar o motivo. Esta é uma rota alternativa de estudo; SQLite não substitui a prática de PostgreSQL com Docker.',
    setup: [
      'Objetivo: executar uma pequena prática SQLite em um arquivo Python, sem iniciar servidor ou instalar Docker.',
      'Requisitos: Python 3 funcionando, editor de texto/código e permissão para criar arquivos numa pasta sua.',
      'Pasta: no editor, crie ou abra a pasta alternativa-sqlite. No VS Code, use Arquivo > Abrir Pasta e depois Terminal > Novo Terminal. Confirme que o caminho exibido termina em alternativa-sqlite; não precisa digitar comandos SQL no terminal.',
      'Windows: no PowerShell integrado ao editor, aberto dentro da pasta alternativa-sqlite, use o comando py.',
      'macOS: no Terminal aberto dentro da pasta alternativa-sqlite, use o comando python3.',
      'Linux: no Terminal aberto dentro da pasta alternativa-sqlite, use o comando python3.',
      'Arquivo: no editor, crie sqlite_alternativa.py dentro de alternativa-sqlite e digite/salve o exemplo da próxima etapa nesse arquivo.',
      'Executar no Windows — PowerShell: com o terminal na pasta alternativa-sqlite, rode py --version e depois py sqlite_alternativa.py.',
      'Executar no macOS/Linux — Terminal: com o terminal na pasta alternativa-sqlite, rode python3 --version e depois python3 sqlite_alternativa.py.',
      'Verificação: no PowerShell, rode Get-Location; no macOS/Linux, rode pwd. Depois confira a versão do Python e execute o arquivo conforme o sistema.',
      'Resultado esperado: a versão do Python aparece; o programa informa a versão SQLite e Registros de marcador: 1 na primeira execução. O arquivo estudos.db aparece ao lado de sqlite_alternativa.py; ao executar novamente, a contagem aumenta para 2.',
      'Problema comum: comando não reconhecido — confira a pasta e use o mesmo comando (`py` ou `python3`) que funcionou na aula Instalar e verificar Python 3. Se o arquivo não for encontrado, confirme o caminho com Get-Location no PowerShell ou pwd no macOS/Linux.',
      'Se o erro disser No module named sqlite3: confira a versão e o interpretador. Não instale um pacote chamado sqlite3 por pip; retorne à aula Instalar e verificar Python 3 e consulte a documentação da distribuição do Python.',
      'Como parar e retomar: o programa encerra sozinho. Feche o terminal se quiser; não apague estudos.db. Para retomar, abra novamente a mesma pasta e execute o mesmo arquivo.',
      'Alternativa leve: se Python ainda não estiver disponível, não marque a prática local como concluída. Um playground de SQL no navegador pode servir para observar sintaxe, mas não executa este arquivo Python, não testa parâmetros pela API sqlite3 e não cria estudos.db no computador.'
    ].join('\n'),
    why: 'SQLite permite praticar tabelas, inserções e consultas sem serviço em segundo plano. Ele reduz o bloqueio de hardware, mas não ensina Compose, rede, volumes, usuários do servidor ou diferenças específicas do PostgreSQL.',
    sections: [
      {
        title: 'Decida sem esconder a limitação',
        paragraphs: [
          'Use esta rota quando Docker não puder ser instalado agora, e não somente para evitar investigar um erro simples. Registre o motivo: requisito do sistema, política administrativa, espaço, memória ou tempo de download.',
          'Marque separadamente: SQL executado em SQLite; Docker não executado; PostgreSQL não executado. Essa honestidade permite estudar os conceitos comuns e voltar depois às competências pendentes.'
        ]
      },
      {
        title: 'Entenda arquivo, código e comandos',
        paragraphs: [
          'O exemplo é digitado no editor e salvo como sqlite_alternativa.py. Só depois você volta ao PowerShell/Terminal para executar o arquivo. O dashboard não executa esse código; ele apenas mostra o exemplo e guarda suas observações.',
          'Quando o programa chama sqlite3.connect("estudos.db"), Python cria ou abre o arquivo na pasta em que o terminal está. Por isso, confirme a pasta antes de executar.',
          'Dentro do arquivo, connection.execute(...) envia uma instrução SQL ao SQLite. O marcador ? recebe o valor separado em uma tupla, como ("alternativa local",). Isso evita juntar texto do aluno ao SQL.'
        ]
      },
      {
        title: 'Liste o que continua pendente',
        paragraphs: [
          'A alternativa não cobre imagem, container, Compose, porta 55432, volume nomeado, healthcheck, cliente-servidor, usuário PostgreSQL, pg_dump ou pg_restore.',
          'Antes do projeto intermediário, conclua Preparar Docker, WSL e virtualização e depois Compose: portas, volumes e conexão ao PostgreSQL. O projeto com PostgreSQL real continua pendente até essas evidências existirem.'
        ]
      }
    ],
    example: {
      language: 'Terminal · na pasta alternativa-sqlite',
      code: 'import sqlite3\n\nprint("SQLite:", sqlite3.sqlite_version)\nconnection = sqlite3.connect("estudos.db")\nconnection.execute("CREATE TABLE IF NOT EXISTS marcador (texto TEXT NOT NULL)")\nconnection.execute("INSERT INTO marcador (texto) VALUES (?)", ("alternativa local",))\nconnection.commit()\ntotal = connection.execute("SELECT COUNT(*) FROM marcador").fetchone()[0]\nprint("Registros de marcador:", total)\nconnection.close()',
      blocks: [
        { label: 'Windows — PowerShell na pasta alternativa-sqlite', code: 'Get-Location\npy --version' },
        { label: 'macOS — Terminal na pasta alternativa-sqlite', code: 'pwd\npython3 --version' },
        { label: 'Linux — Terminal na pasta alternativa-sqlite', code: 'pwd\npython3 --version' },
        { label: 'Editor — arquivo sqlite_alternativa.py dentro da pasta alternativa-sqlite', code: 'import sqlite3\n\nprint("SQLite:", sqlite3.sqlite_version)\nconnection = sqlite3.connect("estudos.db")\nconnection.execute("CREATE TABLE IF NOT EXISTS marcador (texto TEXT NOT NULL)")\nconnection.execute("INSERT INTO marcador (texto) VALUES (?)", ("alternativa local",))\nconnection.commit()\ntotal = connection.execute("SELECT COUNT(*) FROM marcador").fetchone()[0]\nprint("Registros de marcador:", total)\nconnection.close()' },
        { label: 'Windows — PowerShell, ainda na pasta alternativa-sqlite', code: 'py sqlite_alternativa.py' },
        { label: 'macOS/Linux — Terminal, ainda na pasta alternativa-sqlite', code: 'python3 sqlite_alternativa.py' }
      ],
      explanation: [
        'Get-Location ou pwd confirma em qual pasta o terminal está. A versão mostra o interpretador; use só o comando que funcionou no seu sistema.',
        'O editor guarda o código em sqlite_alternativa.py. Não digite as linhas Python diretamente no PowerShell, no Terminal ou num prompt SQL.',
        'sqlite3.connect cria ou abre estudos.db na pasta atual. CREATE TABLE prepara a tabela; INSERT grava uma linha; commit confirma a gravação no arquivo.',
        'O SQL usa ?. O valor correspondente é o segundo argumento de execute, numa tupla de um elemento: ("alternativa local",).',
        'SELECT COUNT(*) consulta quantas linhas existem. Na segunda execução a contagem aumenta porque INSERT é executado novamente.'
      ],
      expected: 'Na primeira execução, o terminal mostra uma versão de SQLite e Registros de marcador: 1. O arquivo estudos.db fica na mesma pasta de sqlite_alternativa.py; na segunda execução a contagem passa a 2.'
    },
    guided: [
      { instruction: 'No editor, crie/abra alternativa-sqlite e use o menu Terminal > Novo Terminal. Confira o caminho com Get-Location (PowerShell) ou pwd (macOS/Linux); depois rode py --version no Windows ou python3 --version no macOS/Linux.', result: 'O caminho termina em alternativa-sqlite e a versão do interpretador aparece.' },
      { instruction: 'No editor, crie sqlite_alternativa.py dentro dessa pasta e digite o exemplo. Salve antes de voltar ao terminal.', result: 'O arquivo aparece dentro de alternativa-sqlite e contém o script salvo.' },
      { instruction: 'No terminal da mesma pasta, execute py sqlite_alternativa.py no Windows ou python3 sqlite_alternativa.py no macOS/Linux. Confira a mensagem e localize estudos.db no editor/Explorador de Arquivos.', result: 'O programa termina sem erro, imprime a contagem esperada e cria o arquivo de banco ao lado do script.' }
    ],
    exercises: [
      { prompt: 'Prever: no editor, abra sqlite_alternativa.py e anote a contagem antes de rodar. No terminal da pasta alternativa-sqlite, execute py sqlite_alternativa.py no Windows ou python3 sqlite_alternativa.py no macOS/Linux duas vezes. Qual contagem espera na primeira e na segunda execução?', hints: ['CREATE TABLE IF NOT EXISTS mantém a tabela existente.', 'Observe que o programa executa INSERT em cada execução.'], solution: 'A primeira execução imprime Registros de marcador: 1; a segunda imprime Registros de marcador: 2. O arquivo estudos.db continua na pasta.', explanation: 'O arquivo persiste entre execuções, enquanto cada INSERT acrescenta uma linha.', expected: 'A previsão apresenta as duas contagens antes da execução e depois compara o resultado real.', criteria: ['Registra as previsões antes de executar o arquivo.', 'Roda o mesmo arquivo duas vezes na mesma pasta e compara as contagens observadas.'] },
      { prompt: 'Alterar: no editor, crie tarefas_exercicio.py dentro de alternativa-sqlite. Faça o script abrir tarefas.db, criar a tabela tarefas com titulo e concluido inteiro padrão 0, inserir o título “Revisar SQL” pelo parâmetro ? e consultar titulo/concluido. Salve; no PowerShell aberto nessa pasta execute py tarefas_exercicio.py. No macOS/Linux, use python3 tarefas_exercicio.py. Onde você escreverá o Python e qual saída espera?', hints: ['O código Python fica no arquivo; não cole SQL puro no PowerShell.', 'Use connection.execute(SQL, (titulo,)) para associar o valor ao marcador ?. A vírgula forma uma tupla com um item.', 'Depois de gravar, use SELECT titulo, concluido FROM tarefas e fetchall() para observar as linhas.'], solution: 'import sqlite3\n\nconnection = sqlite3.connect("tarefas.db")\nconnection.execute("CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, concluido INTEGER NOT NULL DEFAULT 0)")\ntitulo = "Revisar SQL"\nconnection.execute("INSERT INTO tarefas (titulo) VALUES (?)", (titulo,))\nconnection.commit()\nrows = connection.execute("SELECT titulo, concluido FROM tarefas").fetchall()\nprint(rows)\nconnection.close()', explanation: 'O editor guarda o programa; o terminal executa o arquivo. A API Python recebe SQL e parâmetros em argumentos separados.', expected: 'Na primeira execução aparece [(\'Revisar SQL\', 0)]. O arquivo tarefas.db fica em alternativa-sqlite; repetir o script adiciona outra linha.', criteria: ['Cria tarefas_exercicio.py na pasta indicada e executa-o pelo terminal, não no dashboard nem como SQL direto.', 'Cria as colunas solicitadas e deixa concluido com valor padrão 0.', 'Vincula “Revisar SQL” pelo parâmetro ? com uma tupla, sem concatenar o texto ao SQL.', 'Consulta e registra a linha observada; não inventa resultado se a execução falhar.'] },
      { prompt: 'Construir: no editor, crie pendencias-docker.md dentro de alternativa-sqlite. Registre o resultado real da consulta SQLite feita no terminal e duas tarefas que ainda faltam antes de usar PostgreSQL com Docker.', hints: ['Exemplos de pendência: iniciar PostgreSQL pelo Compose e confirmar conexão/porta.', 'Não marque Docker, Compose ou volume como executados se só estudou SQLite.'], solution: 'Executado: SQLite local, tabela, inserção parametrizada e consulta; registrar saída observada. Pendente: instalar/iniciar Docker Engine e executar Compose: portas, volumes e conexão ao PostgreSQL. Também falta verificar a conexão em 127.0.0.1:55432.', explanation: 'O relatório distingue o que você realmente executou do que ainda precisa praticar.', expected: 'O arquivo registra evidência SQLite concreta e identifica duas competências Docker/PostgreSQL pendentes.', criteria: ['Inclui arquivo e resultado realmente observados no terminal.', 'Identifica duas competências distintas que ainda não executou.', 'Indica o nome legível da preparação necessária para retomar Docker/PostgreSQL.'] },
      { prompt: 'Investigar erro: ao executar o arquivo pelo PowerShell, aparece No module named sqlite3. Registre a mensagem completa, rode py --version e py -c "import sqlite3; print(sqlite3.sqlite_version)" na mesma pasta. No macOS/Linux, rode python3 --version e python3 -c "import sqlite3; print(sqlite3.sqlite_version)". Como separar erro de caminho, interpretador e módulo?', hints: ['Confirme primeiro se o comando py/python3 funciona e qual versão respondeu.', 'O módulo sqlite3 acompanha muitas distribuições, mas a documentação do fornecedor pode explicar uma distribuição sem esse módulo. Não instale um pacote homônimo às cegas.'], solution: 'No Windows, compare py --version com py -c ...; no macOS/Linux, compare python3 --version com python3 -c .... Se a versão funciona e só a importação falha, registre distribuição e erro, consulte a documentação oficial desse Python e retorne a Instalar e verificar Python 3. Confirme a correção repetindo o comando de importação.', explanation: 'O comando de verificação usa o mesmo interpretador que executa o arquivo e permite separar instalação de caminho incorreto.', expected: 'O diagnóstico cita sistema, pasta, comando, mensagem observada e próxima verificação sem instalar sqlite3 via pip.', criteria: ['Registra o comando e erro reais e confirma o diretório do terminal.', 'Compara a versão e a importação usando o mesmo interpretador do arquivo.', 'Indica a aula Instalar e verificar Python 3 e uma confirmação observável, sem recomendar pacote aleatório.'] }
    ],
    mistakes: [
      'Dizer que SQLite é PostgreSQL leve: são mecanismos diferentes.',
      'Marcar Docker, Compose ou rede como praticados sem executá-los.',
      'Executar o comando fora da pasta e depois não encontrar estudos.db.',
      'Instalar um pacote chamado sqlite3 via pip sem verificar o Python usado.',
      'Usar a alternativa como conclusão definitiva do projeto intermediário.'
    ],
    quiz: [
      { question: 'A alternativa SQLite comprova que você sabe configurar Compose?', options: ['Sim', 'Não', 'Somente no Windows'], correctIndex: 1, explanation: 'Nenhum arquivo Compose foi criado ou executado.' },
      { question: 'Onde os dados deste laboratório persistem?', options: ['No arquivo estudos.db', 'Em um volume Docker', 'No navegador'], correctIndex: 0, explanation: 'SQLite grava no arquivo local indicado na conexão.' },
      { question: 'Quando retomar o caminho Docker?', options: ['Antes do projeto real com PostgreSQL', 'Nunca', 'Somente depois do nível avançado'], correctIndex: 0, explanation: 'O projeto intermediário exige persistência real com PostgreSQL e Docker.' }
    ],
    retry: { prompt: 'Você não pode executar Docker em um computador administrado, mas consegue abrir Python 3. Descreva uma consulta pequena em SQLite e registre separadamente duas capacidades de PostgreSQL com Compose que continuarão pendentes.', expected: 'A resposta inclui uma consulta local observável e deixa Docker, rede ou backup do PostgreSQL como pendência explícita.', hint: 'A alternativa permite praticar SQL, mas não substitui um servidor.' },
    summary: [
      'SQLite mantém a prática de SQL acessível sem servidor.',
      'A alternativa não comprova Docker, Compose nem PostgreSQL.',
      'Registre evidências executadas e pendências separadamente.',
      'Retome Preparar Docker, WSL e virtualização e Compose: portas, volumes e conexão ao PostgreSQL antes do projeto intermediário com banco real.'
    ]
  }
});

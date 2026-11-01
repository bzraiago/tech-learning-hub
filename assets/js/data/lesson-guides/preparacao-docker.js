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
    prerequisites: 'Conclua Instalar e verificar Python 3. No Windows, use o comando que funcionou na verificação: python ou py. Se nenhum deles mostrar Python 3.x.x, pare e volte à instalação; sem um runtime o script não executa. SQLite é uma rota alternativa de estudo e não substitui PostgreSQL com Docker.',
    setup: [
      'Objetivo: criar e executar um arquivo Python que grava uma linha em SQLite e mostra quantas linhas existem.',
      'Requisitos: concluir Instalar e verificar Python 3; usar VS Code ou outro editor e uma pasta local sua. Esta aula não usa Docker, pip ou prompt SQL separado.',
      'Etapa 1 — abrir a pasta no editor: abra o VS Code pelo menu Iniciar do Windows (pesquise Visual Studio Code). No VS Code, clique em Arquivo > Abrir Pasta. Na janela que abrir, localize e selecione a pasta alternativa-sqlite; confirme em Selecionar Pasta. Se ela ainda não existir, crie uma pasta com esse nome nessa janela e depois a selecione. O nome alternativa-sqlite deve aparecer no painel Explorador, à esquerda.',
      'Etapa 1.1 — abrir o terminal na pasta certa: no VS Code, clique em Terminal > Novo Terminal. Confira o caminho antes do sinal > no Prompt de Comando ou PowerShell: ele deve terminar em alternativa-sqlite. Esse terminal é onde você digita os comandos; o editor central é onde fica o código.',
      'Escolha somente o bloco do sistema operacional que você usa. Não execute os comandos dos outros sistemas.',
      'Windows: no PowerShell integrado ao VS Code, execute python --version. Se aparecer Python 3.x.x, use python nos próximos passos. Se o comando não for reconhecido, execute py --version e use py somente se ele mostrar Python 3.x.x.',
      'macOS: no Terminal aberto na pasta alternativa-sqlite, execute python3 --version. Só continue se aparecer Python 3.x.x.',
      'Linux: no Terminal aberto na pasta alternativa-sqlite, execute python3 --version. Só continue se aparecer Python 3.x.x.',
      'Se nem python --version nem py --version mostrar Python 3.x.x, pare e volte a Instalar e verificar Python 3. Não tente executar o arquivo até uma das verificações funcionar.',
      'Etapa 2 — abrir ou criar o arquivo: no painel Explorador à esquerda, procure sqlite_alternativa.py. Se já existir, clique uma vez no nome; o arquivo abrirá na área central do VS Code. Se não existir, passe o mouse sobre alternativa-sqlite no painel, clique no ícone Novo Arquivo (folha com sinal de +), digite sqlite_alternativa.py e pressione Enter. Clique no arquivo para abri-lo. Na área central, cole somente o bloco identificado como arquivo Python: ele começa com import sqlite3 e termina com banco.close(). Não cole aqui nenhum comando que comece com python ou py. Pressione Ctrl+S; a bolinha branca na aba deve desaparecer. Confirme que o nome termina em .py, não em .py.txt.',
      'Etapa 3 — executar o arquivo: clique no painel Terminal, na parte inferior do VS Code. Na linha que começa com PS e termina com >, digite python sqlite_alternativa.py; use py sqlite_alternativa.py somente se foi py --version que mostrou Python 3.x.x. macOS/Linux: digite python3 sqlite_alternativa.py no Terminal aberto na pasta do arquivo. Esses comandos vão no terminal, nunca na área central do editor.',
      'Verificação: leia a linha Registros de marcador no terminal. Na primeira execução do arquivo novo, o número deve ser 1. alternativa-sqlite.db fica junto do script.',
      'Resultado esperado: a primeira execução mostra Registros de marcador: 1. Na segunda, mostra 2, pois cada execução acrescenta uma linha ao mesmo banco.',
      'Problema comum: se aparecer SyntaxError e a linha indicada mostrar py sqlite_alternativa.py ou python sqlite_alternativa.py, esse comando foi parar dentro do arquivo; substitua o conteúdo pelo bloco Python e salve. Comandos python/py são digitados no terminal inferior. Se py disser que não encontrou runtime, mas python --version mostrar Python 3.x.x, use python sqlite_alternativa.py; não reinstale Python. Se o terminal voltar ao prompt sem mostrar a linha, confira se o bloco completo e a linha print estão no arquivo salvo. Se não encontrar o arquivo, abra a pasta alternativa-sqlite no Explorador antes de criar um novo terminal.',
      'Como parar e retomar: o programa termina sozinho. Para continuar depois, abra no VS Code a mesma pasta, crie um novo terminal e execute novamente o arquivo. O banco permanece nessa pasta.',
      'Alternativa leve: se não puder instalar Python agora, pause a execução local. Um playground no navegador ajuda a ler SQL, mas não executa este arquivo nem cria o banco no computador.'
    ].join('\n'),
    why: 'SQLite permite praticar uma tabela, uma gravação e uma contagem sem iniciar um servidor. Nesta aula, o foco é seguir o ciclo editor → arquivo salvo → terminal → resultado.',
    sections: [
      {
        title: '1. Abra a pasta e o arquivo no VS Code',
        paragraphs: [
          'Abra o VS Code. No Windows, se ele não estiver aberto, clique em Iniciar, pesquise Visual Studio Code e abra o aplicativo. Dentro do VS Code, clique em Arquivo > Abrir Pasta, selecione alternativa-sqlite na janela e confirme em Selecionar Pasta. O nome da pasta deve aparecer no painel Explorador à esquerda.',
          'No painel Explorador, clique em sqlite_alternativa.py para abrir o arquivo na área central. Se não aparecer, passe o mouse sobre a pasta alternativa-sqlite, clique em Novo Arquivo (ícone de folha com +), digite sqlite_alternativa.py, pressione Enter e clique no arquivo criado. Na área central, cole somente o bloco Python que começa com import sqlite3 e termina com banco.close(). Não cole comandos python/py aqui. Salve com Ctrl+S e confirme que a bolinha branca da aba desapareceu.',
          'Agora escolha o terminal do seu sistema. No Windows, clique em Terminal > Novo Terminal e execute python --version; se o comando não for reconhecido, tente py --version. No macOS/Linux, abra Terminal na pasta alternativa-sqlite e execute python3 --version. Só continue quando um comando mostrar Python 3.x.x; se nenhum funcionar, volte à aula Instalar e verificar Python 3.'
        ]
      },
      {
        title: '2. Execute e confira a contagem',
        paragraphs: [
          'Agora clique em Terminal, no painel inferior do VS Code. Confira que o caminho antes do sinal > termina em alternativa-sqlite. Na linha do terminal que começa com PS, digite python sqlite_alternativa.py se python --version mostrou Python 3.x.x; se somente py --version funcionou, digite py sqlite_alternativa.py. macOS ou Linux: digite python3 sqlite_alternativa.py no Terminal. Não coloque esse comando no arquivo .py.',
          'Na primeira execução, procure Registros de marcador: 1. Se executar de novo, a contagem aumenta porque alternativa-sqlite.db permanece entre execuções. A linha print exibe o número no terminal.'
        ]
      },
      {
        title: '3. Saiba o que fica para depois',
        paragraphs: [
          'O SQLite cria alternativa-sqlite.db dentro da pasta do exercício. Ele não inicia PostgreSQL, Docker ou Compose e não comprova conexão por rede.',
          'Quando puder seguir com Docker, retorne a Preparar Docker, WSL e virtualização e depois a Compose: portas, volumes e conexão ao PostgreSQL. Mantenha essa prática pendente até executá-la de verdade.'
        ]
      }
    ],
    example: {
      language: 'Python 3 e terminal',
      code: 'import sqlite3\n\nbanco = sqlite3.connect("alternativa-sqlite.db")\nbanco.execute("CREATE TABLE IF NOT EXISTS marcador (texto TEXT NOT NULL)")\nbanco.execute("INSERT INTO marcador (texto) VALUES (\'alternativa local\')")\nbanco.commit()\nresultado = banco.execute("SELECT COUNT(*) FROM marcador").fetchone()\nprint("Registros de marcador:", resultado[0])\nbanco.close()',
      blocks: [
        { label: 'COLE NO ARQUIVO — área central do VS Code: sqlite_alternativa.py', code: 'import sqlite3\n\nbanco = sqlite3.connect("alternativa-sqlite.db")\nbanco.execute("CREATE TABLE IF NOT EXISTS marcador (texto TEXT NOT NULL)")\nbanco.execute("INSERT INTO marcador (texto) VALUES (\'alternativa local\')")\nbanco.commit()\nresultado = banco.execute("SELECT COUNT(*) FROM marcador").fetchone()\nprint("Registros de marcador:", resultado[0])\nbanco.close()' },
        { label: 'DIGITE NO TERMINAL inferior — Windows PowerShell: use se python --version mostrou Python 3', code: 'python --version\npython sqlite_alternativa.py' },
        { label: 'DIGITE NO TERMINAL inferior — Windows PowerShell: use somente se python não foi reconhecido e py --version mostrou Python 3', code: 'py --version\npy sqlite_alternativa.py' },
        { label: 'macOS — Terminal na pasta alternativa-sqlite', code: 'python3 --version\npython3 sqlite_alternativa.py' },
        { label: 'Linux — Terminal na pasta alternativa-sqlite', code: 'python3 --version\npython3 sqlite_alternativa.py' }
      ],
      explanation: [
        'O primeiro bloco, marcado COLE NO ARQUIVO, é o conteúdo de sqlite_alternativa.py. Ele começa com import sqlite3 e termina com banco.close(). Os blocos marcados DIGITE NO TERMINAL são comandos separados; nunca os cole no arquivo Python.',
        'sqlite3.connect cria ou abre alternativa-sqlite.db na pasta em que o programa está sendo executado.',
        'CREATE TABLE prepara a tabela marcador. INSERT acrescenta uma linha a cada execução. commit grava a alteração no banco.',
        'SELECT COUNT(*) consulta quantas linhas existem. fetchone() pega a linha consultada e resultado[0] é o número. print exibe esse número no terminal.',
        'Na primeira execução do banco novo, a saída é Registros de marcador: 1. Uma segunda execução acrescenta outra linha e mostra 2.'
      ],
      expected: 'Depois da primeira execução do arquivo novo, o terminal mostra Registros de marcador: 1. O arquivo alternativa-sqlite.db fica na pasta alternativa-sqlite; ao executar novamente, a contagem passa a 2.'
    },
    guided: [
      { instruction: 'Abra o VS Code, clique em Arquivo > Abrir Pasta, selecione alternativa-sqlite e confirme. Depois clique em Terminal > Novo Terminal. No Windows, teste python --version; se não for reconhecido, tente py --version. Continue apenas com o comando que mostrar Python 3.x.x.', result: 'A pasta alternativa-sqlite aparece no painel Explorador e o terminal mostra Python 3.x.x.' },
      { instruction: 'No painel Explorador, clique em sqlite_alternativa.py para abrir na área central. Se não existir, use Novo Arquivo (folha com +), digite o nome e pressione Enter. Cole no arquivo apenas o bloco iniciado por import sqlite3, salve com Ctrl+S e confirme que a bolinha branca da aba sumiu.', result: 'A aba do editor mostra sqlite_alternativa.py e o arquivo salvo inclui a linha print("Registros de marcador:", resultado[0]); nenhum comando python/py foi colado no arquivo.' },
      { instruction: 'No mesmo terminal, execute python sqlite_alternativa.py se python --version funcionou, ou py sqlite_alternativa.py se somente py --version funcionou. Em macOS/Linux, use python3 sqlite_alternativa.py no Terminal aberto na pasta do arquivo.', result: 'O terminal mostra Registros de marcador: 1 na primeira execução e cria alternativa-sqlite.db na pasta.' }
    ],
    exercises: [
      { prompt: 'Prever: antes de executar o arquivo pela primeira vez, anote o que espera ver no terminal. Depois, no Windows, use o comando de Python 3 que funcionou na verificação para executar o arquivo uma vez. Qual número apareceu?', hints: ['Leia a linha print do arquivo e conte quantas linhas o INSERT acrescenta por execução.'], solution: 'A primeira execução do banco novo mostra Registros de marcador: 1.', explanation: 'Prever antes de executar ajuda a comparar o comportamento esperado com a evidência real.', expected: 'Registre a previsão antes de rodar e depois copie a linha realmente impressa, sem inventar uma saída.', criteria: ['Faz a previsão antes da execução.', 'Executa o arquivo salvo uma vez e registra a saída observada.'] },
      { prompt: 'Alterar: no editor, troque o texto alternativa local por meu primeiro registro na linha INSERT. Salve com Ctrl+S e execute novamente com o mesmo comando de Python 3 que funcionou. O que acontece com a contagem?', hints: ['A alteração muda o texto gravado; a execução continua inserindo uma nova linha.'], solution: 'O terminal mostra Registros de marcador: 2 porque a primeira linha permanece em alternativa-sqlite.db e esta execução acrescenta outra.', explanation: 'A contagem muda porque o arquivo do banco preserva a linha da execução anterior.', expected: 'Registre a contagem observada após a segunda execução. Se já havia tentativas anteriores, ela pode ser maior que 2.', criteria: ['Altera o texto no arquivo, salva e executa o mesmo script.', 'Relaciona a contagem observada às linhas gravadas em execuções anteriores.'] },
      { prompt: 'Construir: no editor, crie resultado-sqlite.txt dentro de alternativa-sqlite. Registre o nome do script, o nome do arquivo de banco e a última linha que apareceu no terminal.', hints: ['Use somente o resultado que você observou; não inclua senha ou dado pessoal.'], solution: 'Script: sqlite_alternativa.py\nBanco: alternativa-sqlite.db\nSaída observada: Registros de marcador: (copie seu número)', explanation: 'Um registro curto ajuda a retomar a aula sem repetir passos nem confundir arquivos.', expected: 'resultado-sqlite.txt contém os três itens e a saída foi copiada do terminal.', criteria: ['Cria o arquivo no local indicado.', 'Registra os nomes corretos e a saída observada, sem inventar resultado.'] },
      { prompt: 'Investigar erro: ao executar py sqlite_alternativa.py, aparece SyntaxError: invalid syntax e o texto da linha 1 é py sqlite_alternativa.py. O que isso mostra sobre o conteúdo salvo do arquivo? Em qual área do VS Code deve ficar o código que começa com import sqlite3 e em qual área deve ser digitado o comando py sqlite_alternativa.py?', hints: ['Compare o texto exibido como linha 1 do erro com o início do bloco Python da aula.', 'O VS Code separa a área central de edição do painel Terminal inferior.'], solution: 'O comando de terminal foi salvo dentro do arquivo .py. Na área central do editor, substitua o conteúdo pelo bloco Python completo, começando com import sqlite3, e salve com Ctrl+S. No painel Terminal inferior, depois do prompt PS ... >, digite py sqlite_alternativa.py. A linha de erro deixa de ser um comando de terminal.', explanation: 'O diagnóstico distingue código que o interpretador lê do comando que inicia o arquivo pelo terminal.', expected: 'O plano identifica a troca entre editor e terminal e coloca cada conteúdo na área correta antes de executar novamente.', criteria: ['Interpreta SyntaxError com linha 1 py sqlite_alternativa.py como comando salvo dentro do arquivo.', 'Indica a área central para o código Python e o terminal inferior para o comando py.', 'Salva o arquivo antes de tentar executá-lo novamente.'] }
    ],
    mistakes: [
      'Colar o código Python no PowerShell em vez de salvar no arquivo .py.',
      'Colar o comando py sqlite_alternativa.py dentro do arquivo .py; esse comando deve ser digitado no Terminal inferior.',
      'Executar o arquivo antes de confirmar qual comando mostra Python 3.x.x.',
      'Esquecer Ctrl+S antes de executar o script.',
      'Esperar que cada execução mostre 1; as linhas anteriores permanecem no banco local.',
      'Tratar SQLite como substituto de PostgreSQL, Docker ou Compose.'
    ],
    quiz: [
      { question: 'Qual linha mostra a contagem no terminal?', options: ['print("Registros de marcador:", resultado[0])', 'sqlite3.connect("alternativa-sqlite.db")', 'CREATE TABLE IF NOT EXISTS marcador'], correctIndex: 0, explanation: 'print escreve a mensagem e o número no terminal.' },
      { question: 'Onde fica alternativa-sqlite.db?', options: ['Na pasta alternativa-sqlite do exercício', 'No navegador', 'Em um container Docker'], correctIndex: 0, explanation: 'O programa cria o arquivo na pasta de trabalho aberta no terminal.' },
      { question: 'Se py --version responde “No installed Python found!”, mas python --version mostra Python 3.x.x, o que fazer?', options: ['Usar python para executar o arquivo', 'Reinstalar Python imediatamente', 'Instalar sqlite3 com pip'], correctIndex: 0, explanation: 'Use o comando que encontrou o runtime Python 3.' }
    ],
    retry: { prompt: 'O terminal mostra SyntaxError e aponta a linha 1 como py sqlite_alternativa.py. Explique onde o código Python deve ser colado, onde o comando deve ser digitado, como salvar o arquivo e qual resultado espera observar.', expected: 'A resposta separa o bloco Python para a área central do editor do comando para o Terminal inferior, salva com Ctrl+S e espera ver Registros de marcador seguido do número.', hint: 'O texto da linha 1 no erro mostra o conteúdo que Python encontrou dentro do arquivo.' },
    summary: [
      'Primeiro confirme Python 3; no Windows, use python ou py conforme o comando que mostrou Python 3.x.x.',
      'Digite o código em sqlite_alternativa.py e salve antes de executar.',
      'Execute o arquivo no PowerShell aberto na pasta: python sqlite_alternativa.py ou py sqlite_alternativa.py, conforme a verificação que funcionou.',
      'A contagem aparece porque o script chama print; o banco permanece em alternativa-sqlite.db.',
      'SQLite mantém esta prática local, mas não substitui PostgreSQL com Docker.'
    ]  }
});

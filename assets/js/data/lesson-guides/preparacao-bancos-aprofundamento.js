'use strict';

// Preparações opcionais: mantêm o mesmo contrato sem transformar todos os motores em pré-requisitos.
(() => {
  function criarPreparacao(config) {
    return {
      prerequisites: `Conclua a Etapa 0. ${config.prerequisites} Esta aula é aprofundamento opcional; SQLite e PostgreSQL continuam sendo o caminho principal.`,
      setup: [
        `Objetivo: ${config.objective}`,
        'Requisitos: computador compatível, espaço, acesso à internet e permissão de instalação. Use somente dados fictícios e instalações locais que você controla.',
        `Pasta e local de trabalho: ${config.workingContext}`,
        `Windows: ${config.windows}`,
        `macOS: ${config.macos}`,
        `Linux: ${config.linux}`,
        `Verificação: ${config.verification}`,
        `Resultado esperado: ${config.expected}`,
        `Problema comum: ${config.commonProblem}`,
        `Como parar e retomar: ${config.resume}`,
        `Alternativa leve: ${config.alternative}`
      ].join('\n'),
      why: config.why,
      sections: [
        {
          title: 'Escolha conscientemente este aprofundamento',
          paragraphs: [
            `${config.name} não é requisito para concluir o caminho principal com SQLite e PostgreSQL. Estude este motor quando um projeto, emprego ou sistema existente justificar a comparação.`,
            config.boundary
          ]
        },
        {
          title: 'Instale servidor e cliente sem confundi-los',
          paragraphs: [
            `O servidor mantém os dados e recebe conexões; ${config.client} é o cliente usado neste laboratório. Instalar somente um cliente não cria o servidor, e iniciar o servidor não garante que o cliente esteja no PATH.`,
            `Windows: ${config.windows} macOS: ${config.macos} Linux: ${config.linux}`
          ]
        },
        {
          title: 'Verifique em camadas e saiba retomar',
          paragraphs: [
            `${config.verification} ${config.expected}`,
            `${config.diagnostic} Preserve a mensagem real e não apague bases, arquivos ou volumes para corrigir uma falha de conexão.`,
            config.resume
          ]
        }
      ],
      example: {
        language: config.language,
        code: config.code,
        blocks: config.blocks,
        explanation: config.explanation,
        expected: config.expected
      },
      guided: [
        { instruction: `Registre sistema, arquitetura, fonte oficial e motivo para estudar ${config.name}.`, result: 'Relatório identifica o aprofundamento como opcional e não contém dados pessoais.' },
        { instruction: config.installInstruction, result: config.installResult },
        { instruction: config.testInstruction, result: config.testResult }
      ],
      exercises: [
        { prompt: `Prever: ${config.predict}`, hints: [config.predictHint], solution: config.predictSolution, explanation: 'A previsão separa disponibilidade do cliente, disponibilidade do servidor e validade do comando.', expected: 'A resposta interpreta a evidência disponível e indica o que ainda precisa ser conferido.', criteria: ['Distingue o que a observação confirma sobre cliente, servidor ou sessão.', 'Identifica uma evidência adicional necessária antes de declarar o laboratório pronto.'] },
        { prompt: `Alterar: ${config.change}`, hints: [config.changeHint], solution: config.changeSolution, explanation: 'A alteração conserva os parâmetros explícitos e evita depender de padrões invisíveis.', expected: 'A configuração reflete a mudança pedida e permite conferir o destino sem expor credenciais.', criteria: ['Altera o parâmetro pedido e mantém os demais compatíveis com o sistema e o laboratório.', 'Indica como verificar o destino configurado sem registrar segredos.'] },
        { prompt: `Construir: crie ambiente-${config.slug}.md com sistema, fonte, servidor, cliente, endereço, verificação, resultado e retomada.`, hints: ['Não registre senhas, tokens, caminhos pessoais ou dados reais.'], solution: config.reportSolution, explanation: 'O relatório permite reproduzir o laboratório sem expor credenciais.', expected: 'O relatório registra os campos solicitados e usa evidências reais ou declara o que não foi executado.', criteria: ['Inclui sistema, fonte, servidor, cliente, endereço, verificação, resultado e retomada.', 'Distingue execução feita de etapa pendente e não inventa versões ou saídas.', 'Remove senhas, tokens, caminhos pessoais e dados reais do relatório.'] },
        { prompt: `Investigar erro: ${config.investigate}`, hints: [config.investigateHint, 'Não reinstale tudo antes de identificar a camada que falhou.'], solution: config.investigateSolution, explanation: 'O diagnóstico usa evidências e preserva o laboratório.', expected: 'O plano confere o alvo da operação antes de propor uma correção e protege os dados existentes.', criteria: ['Usa uma verificação de leitura para confirmar sessão, banco ou caminho relevante ao erro.', 'Investiga a causa com evidências antes de alterar configuração ou dados.', 'Descreve uma confirmação observável da correção sem apagar a base do laboratório.'] }
      ],
      mistakes: [
        `Tratar ${config.name} como requisito obrigatório do curso.`,
        `Confundir o servidor com o cliente ${config.client}.`,
        'Guardar senha no comando, README, script ou repositório.',
        config.mistake
      ],
      quiz: [
        { question: `${config.name} é obrigatório para concluir o caminho principal de dados?`, options: ['Não; é aprofundamento', 'Sim', 'Substitui SQL básico'], correctIndex: 0, explanation: 'O caminho principal usa SQLite e PostgreSQL.' },
        { question: config.quizQuestion, options: config.quizOptions, correctIndex: config.quizCorrect, explanation: config.quizExplanation },
        { question: 'Uma versão impressa do cliente comprova que o servidor está acessível?', options: ['Não', 'Sim', 'Somente no Windows'], correctIndex: 0, explanation: 'É necessário executar uma conexão ou comando de verificação no servidor.' }
      ],
      retry: config.retry,
      summary: [
        `${config.name} permanece um aprofundamento opcional.`,
        `Servidor e cliente ${config.client} são componentes diferentes.`,
        config.summary,
        'Registre evidência executada sem senha e mantenha pendências explícitas.'
      ]
    };
  }

  Object.assign(LESSON_GUIDES, {
    'setup-mariadb': criarPreparacao({
      name: 'MariaDB',
      retry: { prompt: 'Um cliente conecta ao MariaDB local, mas você não sabe se alcançou o laboratório correto. Descreva uma verificação de versão, usuário e banco ativo antes de criar qualquer tabela; indique o que registrar sem expor senha.', expected: 'A resposta usa uma consulta de identificação, confirma o banco de laboratório e registra resultado real sem credencial.', hint: 'Conexão bem-sucedida ainda pode apontar para outra instância ou banco.' },
      slug: 'mariadb',
      client: 'mariadb',
      prerequisites: 'Aprofundamento opcional. Percorra primeiro o módulo Fundamentos e linguagem SQL. Como esta preparação aparece antes desse módulo, pule-a por enquanto e retorne imediatamente antes da aula MariaDB: InnoDB, tipos e transações de aplicação.',
      objective: 'instalar MariaDB Community Server e o cliente, iniciar o serviço e criar um banco descartável.',
      workingContext: 'não é necessário abrir o projeto do curso. Abra um PowerShell/Terminal novo; os comandos de conexão podem ser executados em qualquer pasta e falam com o serviço local.',
      windows: 'No navegador, abra a documentação oficial de downloads do MariaDB Community e baixe o instalador MSI para Windows. No instalador, inclua servidor e cliente; defina uma senha local de laboratório, mantenha o serviço habilitado e finalize. Abra um PowerShell novo. Se o cliente não estiver no PATH, use o terminal do diretório bin da instalação ou ajuste o PATH conforme a documentação oficial.',
      macos: 'No navegador, abra a documentação oficial de instalação e escolha o procedimento Community compatível com macOS e com a arquitetura do computador. No Terminal, instale servidor e cliente mariadb conforme esse método; registre como iniciar/parar o serviço e abra um Terminal novo. Não copie comandos Linux para o macOS.',
      linux: 'No navegador, abra a documentação oficial de instalação e selecione primeiro a distribuição e sua versão; no Terminal, siga apenas o procedimento correspondente para instalar servidor e cliente. Inicie o serviço pelo gerenciador indicado nessa página e abra um Terminal novo. Não misture comandos de Ubuntu, Debian, Fedora ou outras famílias.',
      verification: 'No PowerShell/Terminal novo, execute mariadb --version e depois mariadb -h 127.0.0.1 -P 3306 -u root -p. Digite a senha no pedido do cliente. Quando aparecer MariaDB [(none)]>, execute SELECT VERSION(); e depois EXIT;.',
      expected: 'o cliente mostra sua versão, abre um prompt conectado e SELECT VERSION() identifica MariaDB; após USE hub_maria_aula, SELECT DATABASE() devolve hub_maria_aula.',
      commonProblem: 'usar -p como se recebesse a porta; no cliente, -p solicita senha e -P define a porta.',
      resume: 'saia com exit; pare ou inicie o serviço pelo mecanismo do sistema e, ao retomar, reconecte e confirme SELECT DATABASE(), USER(), VERSION();.',
      alternative: 'se não puder instalar, estude a comparação na aula MariaDB: InnoDB, tipos e transações de aplicação e mantenha a execução deste servidor como pendência; SQLite não comprova MariaDB.',
      why: 'MariaDB aparece em sistemas reais e compartilha parte da sintaxe com MySQL, mas possui versões, comportamento e ferramentas próprios. A preparação evita estudar diferenças SQL sobre um serviço ainda indisponível.',
      boundary: 'A proximidade histórica com MySQL não torna versões e recursos automaticamente intercambiáveis. Registre a versão real antes de comparar sintaxe.',
      diagnostic: 'Se o cliente existe e a conexão falha, confira serviço, endereço 127.0.0.1, porta 3306 e método de autenticação antes de revisar o SQL.',
      language: 'Terminal e prompt MariaDB',
      code: 'mariadb --version\nmariadb -h 127.0.0.1 -P 3306 -u root -p\nCREATE DATABASE hub_maria_aula CHARACTER SET utf8mb4;\nUSE hub_maria_aula;\nSELECT DATABASE(), USER(), VERSION();\nexit',
      blocks: [
        { label: 'PowerShell/Terminal — conferir apenas o cliente', code: 'mariadb --version' },
        { label: 'PowerShell/Terminal — conectar ao serviço local', code: 'mariadb -h 127.0.0.1 -P 3306 -u root -p' },
        { label: 'Prompt MariaDB — depois de digitar a senha e aparecer MariaDB [(none)]>', code: 'CREATE DATABASE hub_maria_aula CHARACTER SET utf8mb4;\nUSE hub_maria_aula;\nSELECT DATABASE(), USER(), VERSION();\nEXIT;' }
      ],
      explanation: ['-P maiúsculo informa a porta; -p minúsculo pede senha.', 'A senha não aparece no comando.', 'CREATE DATABASE deve ser executado somente em uma instância de laboratório autorizada.'],
      installInstruction: 'Siga o bloco correspondente ao seu sistema operacional. Abra um PowerShell/Terminal novo e execute mariadb --version; essa linha verifica o cliente, não o servidor.',
      installResult: 'Servidor e cliente disponíveis; método de iniciar/parar registrado.',
      testInstruction: 'No PowerShell/Terminal, execute a conexão. Depois de aparecer MariaDB [(none)]>, digite CREATE DATABASE, USE e SELECT. Saia com EXIT;.',
      testResult: 'Banco, usuário e versão confirmados no prompt correto.',
      predict: 'mariadb --version funciona, mas a conexão em 127.0.0.1:3306 é recusada. O que isso prova?',
      predictHint: 'Uma versão consulta apenas o executável local.',
      predictSolution: 'Prova que o cliente existe, não que o serviço está ativo ou escutando nessa porta. Confira o serviço e a porta.',
      predictExpected: 'A resposta relaciona o resultado à evidência coletada e aponta uma verificação pendente.',
      change: 'No PowerShell/Terminal, adapte somente o comando de conexão se o laboratório autorizado usar a porta 3307.',
      changeHint: 'A opção de porta é maiúscula.',
      changeSolution: 'mariadb -h 127.0.0.1 -P 3307 -u root -p',
      changeExpected: 'A configuração reflete o parâmetro pedido e mantém os outros dados da conexão protegidos.',
      reportSolution: 'Sistema/fonte: preencher\nServidor: MariaDB Community local\nCliente: mariadb\nEndereço: 127.0.0.1:3306\nBanco: hub_maria_aula\nUsuário: root de laboratório\nSenha: não registrar\nRetomada: iniciar serviço e reconectar',
      investigate: 'o cliente conecta e mostra MariaDB [(none)]>, mas SELECT DATABASE() digitado nesse prompt devolve NULL.',
      investigateHint: 'Uma conexão pode existir sem banco selecionado.',
      investigateSolution: 'Execute USE hub_maria_aula; e repita SELECT DATABASE();. Se o banco não existir, confirme a instância antes de criá-lo.',
      investigateExpected: 'O plano verifica o contexto atual e confirma a mudança por uma observação do banco.',
      mistake: 'Pressupor que todo comando ou comportamento do MySQL é idêntico no MariaDB.',
      quizQuestion: 'Qual opção define a porta no cliente mariadb?',
      quizOptions: ['-P', '-p', '-d'],
      quizCorrect: 0,
      quizExplanation: '-P define a porta; -p solicita senha.',
      summary: 'Confirme 127.0.0.1:3306, banco, usuário e versão antes da aula prática.'
    }),

    'setup-firebird': criarPreparacao({
      name: 'Firebird 5',
      retry: { prompt: 'Uma equipe quer criar `hub_fb_aula.fdb` dentro da pasta pessoal de quem usa o cliente, mas o servidor Firebird roda como serviço. Explique como escolher um caminho autorizado no host do servidor e como confirmar que o isql utilizado pertence ao Firebird antes da criação.', expected: 'A resposta diferencia máquina/conta do cliente e do servidor, exige pasta permitida e identifica o isql correto sem abrir acesso amplo ao disco.', hint: 'O arquivo é aberto pelo processo do servidor, não pelo editor da pessoa.' },
      slug: 'firebird',
      client: 'isql do Firebird',
      prerequisites: 'Aprofundamento opcional. Percorra primeiro o módulo Fundamentos e linguagem SQL. Como esta preparação aparece antes desse módulo, pule-a por enquanto e retorne imediatamente antes da aula Firebird: isql, identidade e transações explícitas. Só crie o arquivo do banco em uma pasta local autorizada pelo administrador do servidor.',
      objective: 'instalar Firebird 5, localizar suas ferramentas e criar um arquivo .fdb descartável em caminho permitido.',
      workingContext: 'o SQL é digitado no prompt interativo SQL> do isql, não no PowerShell nem no editor. O arquivo .fdb é criado pelo servidor no host local e precisa ficar numa pasta autorizada para o serviço Firebird.',
      windows: 'No navegador, baixe o instalador oficial de 64 bits do Firebird 5 para Windows e instale como serviço somente se você tiver autorização. Use a senha local configurada durante a instalação; não use uma máquina corporativa sem permissão. Na instalação padrão, isql.exe fica em %ProgramFiles%\\Firebird\\Firebird_5_0\\isql.exe; se você escolheu outra pasta, anote o caminho no Explorador de Arquivos. Crie a pasta C:\\dados no Explorador; se o serviço não tiver acesso, pare e use uma pasta autorizada pelo administrador do servidor.',
      macos: 'No navegador, abra a página oficial e escolha o pacote Firebird 5 compatível com macOS e arquitetura local. Siga o guia oficial para instalar e localizar as ferramentas. Use uma pasta de banco autorizada pelo serviço; a pasta pessoal do aluno não é automaticamente acessível ao servidor.',
      linux: 'No navegador, abra a página oficial e escolha o kit ou pacote para a distribuição e versão exatas. O kit padrão instala as ferramentas em /opt/firebird/bin, mas pacotes da distribuição podem usar outro local; confirme o caminho indicado para o pacote instalado. Siga as instruções específicas no Terminal para iniciar o serviço. Use somente uma pasta permitida pela configuração do servidor; não altere permissões amplas para contornar erro de acesso.',
      verification: 'No PowerShell/Terminal, execute o isql do Firebird com -z e confirme a versão. Depois inicie a sessão; somente quando aparecer SQL>, crie um banco novo em pasta permitida e consulte SELECT CURRENT_USER FROM RDB$DATABASE;.',
      expected: 'isql identifica Firebird 5; a criação abre o banco novo e a consulta retorna SYSDBA ou o usuário de laboratório configurado.',
      commonProblem: 'executar outro programa chamado isql ou escolher uma pasta que a conta do serviço não pode acessar.',
      resume: 'saia com QUIT, preserve o .fdb e registre seu caminho; na retomada, inicie o serviço e conecte informando o caminho autorizado e credenciais no prompt adequado.',
      alternative: 'se o sistema ou a permissão bloquear a instalação, estude a aula Firebird: isql, identidade e transações explícitas e mantenha isql/Firebird como não executados.',
      why: 'Firebird é encontrado em sistemas existentes e usa um banco em arquivo mediado pelo servidor. A preparação torna visíveis serviço, cliente, caminho e permissão antes do estudo do dialeto.',
      boundary: 'O arquivo .fdb não deve ser manipulado como um arquivo SQLite enquanto o servidor o gerencia. O caminho é interpretado no host do servidor.',
      diagnostic: 'Em erro de arquivo, confira primeiro se o caminho pertence ao host do servidor, se é permitido por DatabaseAccess e se a conta do serviço tem acesso.',
      language: 'Terminal e isql do Firebird',
      code: "isql -z\nCREATE DATABASE 'localhost:C:/dados/hub_fb_aula.fdb' USER 'SYSDBA' PASSWORD 'SUA_SENHA_LOCAL' DEFAULT CHARACTER SET UTF8;\nSELECT CURRENT_USER FROM RDB$DATABASE;\nQUIT;",
      blocks: [
        { label: 'Windows — PowerShell; instalação padrão do Firebird 5', code: "$isql = Join-Path $env:ProgramFiles 'Firebird\\Firebird_5_0\\isql.exe'\n& $isql -z\n& $isql" },
        { label: 'macOS — Terminal; confira se isql é o cliente do Firebird instalado', code: 'command -v isql\nisql -z\nisql' },
        { label: 'Linux — Terminal; kit padrão do Firebird 5', code: 'cd /opt/firebird/bin\n./isql -z\n./isql' },
        { label: 'Prompt SQL> do isql — Windows; crie somente um arquivo novo numa pasta autorizada', code: "CREATE DATABASE 'localhost:C:/dados/hub_fb_aula.fdb' USER 'SYSDBA' PASSWORD 'SUA_SENHA_LOCAL' DEFAULT CHARACTER SET UTF8;\nSELECT CURRENT_USER FROM RDB$DATABASE;\nQUIT;" },
        { label: 'Prompt SQL> do isql — macOS/Linux; substitua pelo caminho absoluto autorizado no host do servidor', code: "CREATE DATABASE 'localhost:/CAMINHO_AUTORIZADO/hub_fb_aula.fdb' USER 'SYSDBA' PASSWORD 'SUA_SENHA_LOCAL' DEFAULT CHARACTER SET UTF8;\nSELECT CURRENT_USER FROM RDB$DATABASE;\nQUIT;" }
      ],
      explanation: ['No PowerShell, o exemplo usa a pasta padrão de instalação do Firebird 5; se você escolheu outra pasta, ajuste o caminho do executável conforme o Explorador. No Linux, o kit padrão usa /opt/firebird/bin, mas pacotes podem variar. No macOS, confira o caminho e o fornecedor com a documentação do pacote.', 'A primeira execução isql -z identifica a ferramenta e retorna ao terminal. A segunda inicia o prompt interativo; digite o bloco SQL somente depois que aparecer SQL>.', 'O exemplo Windows usa C:/dados, criado no Explorador. No macOS/Linux, substitua CAMINHO_AUTORIZADO por um caminho absoluto que o administrador confirmou como permitido para o serviço. localhost faz o processo do servidor criar/abrir o arquivo; se não houver caminho autorizado, não execute CREATE DATABASE ainda.', 'SUA_SENHA_LOCAL é apenas um marcador fictício para o laboratório; não cole senha real em README, captura ou repositório. QUIT encerra a sessão.'],
      installInstruction: 'Instale pelo bloco correspondente ao sistema, registre o método do serviço e localize isql.exe/isql. No Windows, a pasta padrão é %ProgramFiles%\\Firebird\\Firebird_5_0; se você escolheu outra pasta, ajuste o caminho no comando PowerShell pelo que encontrou no Explorador.',
      installResult: 'Servidor, ferramenta correta e pasta autorizada identificados.',
      testInstruction: 'No terminal, execute isql -z para identificar o cliente; depois inicie isql sem -z. Somente no prompt SQL>, crie o .fdb autorizado e execute SELECT CURRENT_USER FROM RDB$DATABASE;.',
      testResult: 'Arquivo criado pelo servidor e usuário confirmado.',
      predict: 'isql -z mostra outra implementação de SQL interativo. É seguro continuar?',
      predictHint: 'O nome do executável não identifica sozinho o fornecedor.',
      predictSolution: 'Não. Localize o isql dentro da instalação do Firebird e confirme que a versão informa Firebird antes de criar o banco.',
      predictExpected: 'A resposta identifica uma evidência que precisa ser confirmada antes de criar um banco.',
      change: 'No prompt SQL> do isql, adapte o caminho do CREATE DATABASE para um caminho Linux permitido pelo serviço.',
      changeHint: 'O caminho continua pertencendo ao host do servidor e deve ser absoluto.',
      changeSolution: "CREATE DATABASE 'localhost:/CAMINHO_ABSOLUTO_AUTORIZADO/hub_fb_aula.fdb' USER 'SYSDBA' PASSWORD 'SUA_SENHA_LOCAL' DEFAULT CHARACTER SET UTF8;",
      changeExpected: 'O caminho foi adaptado ao sistema e sua autorização pode ser conferida antes da criação.',
      reportSolution: 'Sistema/fonte: preencher\nServidor: Firebird 5 local\nCliente: isql do Firebird\nEndereço: localhost\nArquivo: caminho autorizado\nUsuário: SYSDBA de laboratório\nSenha: não registrar\nRetomada: iniciar serviço e reconectar',
      investigate: 'o terminal abre o isql, mas CREATE DATABASE digitado em SQL> falha com erro de acesso ao arquivo.',
      investigateHint: 'O processo do servidor pode ter permissões diferentes do seu usuário.',
      investigateSolution: 'Confirmar host, DatabaseAccess, pasta dedicada e permissões da conta do serviço. Não liberar acesso amplo ao disco nem alterar o SQL de tabela antes de resolver o arquivo.',
      investigateExpected: 'O diagnóstico usa evidências do servidor e do caminho antes de alterar permissões.',
      mistake: 'Usar caminho pessoal, compartilhamento de rede ou arquivo existente sem confirmar a política do servidor.',
      quizQuestion: 'A quem pertence o caminho após localhost na conexão?',
      quizOptions: ['Ao host do servidor Firebird', 'Ao navegador', 'Ao repositório GitHub'],
      quizCorrect: 0,
      quizExplanation: 'O servidor precisa abrir o arquivo nesse host e ter permissão.',
      summary: 'Confirme versão do isql, serviço, caminho permitido e usuário antes de executar SQL.'
    }),

    'setup-mongodb': criarPreparacao({
      name: 'MongoDB Community',
      retry: { prompt: 'Um tutorial sugere usar uma URI remota com credenciais, mas sua atividade é apenas verificar o MongoDB Community local. Descreva a URI do laboratório, a sequência de conexão e ping e o que deve permanecer fora do repositório.', expected: 'A resposta usa 127.0.0.1:27017, verifica ping com ok: 1 e não copia credenciais nem URI privada para arquivos públicos.', hint: 'O laboratório da aula é local; não precisa criar conta remota para esta verificação.' },
      slug: 'mongodb',
      client: 'mongosh',
      prerequisites: 'Aprofundamento opcional. Não é necessário ter estudado SQL para instalar ou verificar MongoDB. Faça esta preparação imediatamente antes da aula MongoDB: documentos, coleções e CRUD. Docker é opcional.',
      objective: 'disponibilizar um servidor MongoDB Community e o cliente mongosh e confirmar uma conexão local.',
      workingContext: 'não é necessário abrir pasta de projeto. Os comandos de conexão ficam no PowerShell/Terminal; depois que mongosh conectar, as consultas são digitadas no prompt mongosh. Os documentos ficam no servidor local.',
      windows: 'No navegador, selecione MongoDB Community para Windows e baixe o instalador MSI compatível. Durante a instalação, configure o servidor como serviço local e finalize. Instale mongosh pelo instalador oficial separado se ele não estiver disponível. Abra um PowerShell novo; confirme ambos os programas, pois instalar mongosh não instala o servidor.',
      macos: 'No navegador, selecione MongoDB Community para macOS e a arquitetura correta. Instale o servidor pelo método oficial e confirme como iniciar/parar o serviço. Instale mongosh separadamente quando necessário. Abra um Terminal novo e confira o cliente e a conexão.',
      linux: 'No navegador, selecione MongoDB Community, sua distribuição e versão exatas. No Terminal, siga somente esses passos para instalar/iniciar o servidor; instale mongosh separadamente se não vier incluído. Abra um Terminal novo e confirme cliente e conexão. Não misture instruções de distribuições diferentes.',
      verification: 'No PowerShell/Terminal, execute mongosh --version e depois mongosh "mongodb://127.0.0.1:27017". Quando aparecer test>, execute db.runCommand({ping:1}) e saia com exit.',
      expected: 'mongosh mostra sua versão, abre uma sessão no servidor local e o ping devolve um documento com ok igual a 1.',
      commonProblem: 'instalar mongosh e presumir que o servidor MongoDB foi instalado e iniciado junto.',
      resume: 'saia com exit, pare o serviço ou container pelo método usado e preserve os dados do laboratório; na retomada, inicie o servidor e repita o ping.',
      alternative: 'se não puder instalar o servidor local, mantenha a conexão como pendência. Não crie cluster remoto nem compartilhe URI/credenciais só para concluir esta etapa; a rota local e o CRUD continuam separados.',
      why: 'MongoDB introduz documentos BSON, coleções e pipelines. Uma conexão verificada evita investigar insert e aggregate quando o servidor ou cliente ainda não está disponível.',
      boundary: 'MongoDB Community local, MongoDB em container e Atlas são implantações diferentes. O curso usa 127.0.0.1:27017 para o laboratório local e não exige conta remota.',
      diagnostic: 'Se mongosh existe e o ping falha, confira serviço/container, URI e porta antes de revisar comandos de documentos.',
      language: 'Terminal e mongosh',
      code: 'mongosh --version\nmongosh "mongodb://127.0.0.1:27017"\ndb.runCommand({ ping: 1 })\nexit',
      blocks: [
        { label: 'PowerShell/Terminal — confirmar que mongosh está instalado', code: 'mongosh --version' },
        { label: 'PowerShell/Terminal — iniciar uma sessão no MongoDB local', code: 'mongosh "mongodb://127.0.0.1:27017"' },
        { label: 'Prompt mongosh — depois de aparecer test>', code: 'db.runCommand({ ping: 1 })\nexit' }
      ],
      explanation: ['A primeira linha verifica somente o cliente.', 'A URI declara host e porta do laboratório local.', 'O ping confirma que o servidor respondeu antes das operações CRUD.'],
      installInstruction: 'Siga o bloco do seu sistema para instalar o servidor MongoDB Community e o cliente mongosh separadamente. Abra PowerShell/Terminal novo; mongosh --version confere somente o cliente.',
      installResult: 'Servidor e cliente identificados separadamente.',
      testInstruction: 'No PowerShell/Terminal, conecte à URI mongodb://127.0.0.1:27017. Quando aparecer o prompt test>, execute db.runCommand({ ping: 1 }); saia com exit.',
      testResult: 'Resposta contém ok: 1 e nenhuma credencial é registrada.',
      predict: 'mongosh --version funciona, mas a conexão retorna ECONNREFUSED. O que isso indica?',
      predictHint: 'O cliente pode existir sem um servidor escutando.',
      predictSolution: 'O mongosh está instalado, mas o servidor não está ativo ou não escuta em 127.0.0.1:27017. Confira serviço/container e URI.',
      predictExpected: 'A resposta separa o que a versão confirma do que ainda precisa ser verificado na conexão.',
      change: 'No PowerShell/Terminal, adapte somente a URI do comando de conexão se um laboratório autorizado publicar a porta local 27018.',
      changeHint: 'Mude somente a porta declarada na URI.',
      changeSolution: 'mongosh "mongodb://127.0.0.1:27018"',
      changeExpected: 'A URI representa a alteração solicitada e continua sem credenciais embutidas.',
      reportSolution: 'Sistema/fonte: preencher\nServidor: MongoDB Community local ou container\nCliente: mongosh\nEndereço: 127.0.0.1:27017\nBanco de aula: definido na aula CRUD\nAutenticação: conforme laboratório, sem registrar segredo\nVerificação: ping ok:1\nRetomada: iniciar servidor e repetir ping',
      investigate: 'o ping funciona, mas o projeto escreve no banco errado.',
      investigateHint: 'Uma sessão pode trocar de banco e scripts usam nomes explícitos.',
      investigateSolution: 'No mongosh, confira db.getName(); no script, use db.getSiblingDB com o nome de laboratório previsto. Não apague outros bancos para corrigir contexto.',
      investigateExpected: 'O plano confirma o contexto ativo e valida a correção antes de seguir com gravações.',
      mistake: 'Executar comandos mongosh no console do navegador ou expor uma URI remota com credenciais.',
      quizQuestion: 'Qual resultado mínimo confirma resposta do servidor?',
      quizOptions: ['ping com ok: 1', 'mongosh --version apenas', 'Arquivo HTML aberto'],
      quizCorrect: 0,
      quizExplanation: 'A versão verifica o cliente; o ping alcança o servidor.',
      summary: 'Confirme mongosh, URI 127.0.0.1:27017 e ping antes do CRUD.'
    })
  });
})();

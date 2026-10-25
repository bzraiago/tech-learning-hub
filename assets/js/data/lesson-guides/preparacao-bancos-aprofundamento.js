'use strict';

// Preparações opcionais: mantêm o mesmo contrato sem transformar todos os motores em pré-requisitos.
(() => {
  function criarPreparacao(config) {
    return {
      prerequisites: `Conclua a Etapa 0 e SQL básico. ${config.prerequisites} Esta aula é aprofundamento opcional; SQLite e PostgreSQL continuam sendo o caminho principal.`,
      setup: `Objetivo: ${config.objective} Requisitos: computador compatível, espaço, internet e permissão de instalação; use somente dados fictícios. Windows: ${config.windows} macOS: ${config.macos} Linux: ${config.linux} Verificação: ${config.verification} Resultado esperado: ${config.expected} Problema comum: ${config.commonProblem} Como parar e retomar: ${config.resume} Alternativa leve: ${config.alternative}`,
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
        explanation: config.explanation,
        expected: config.expected
      },
      guided: [
        { instruction: `Registre sistema, arquitetura, fonte oficial e motivo para estudar ${config.name}.`, result: 'Relatório identifica o aprofundamento como opcional e não contém dados pessoais.' },
        { instruction: config.installInstruction, result: config.installResult },
        { instruction: config.testInstruction, result: config.testResult }
      ],
      exercises: [
        { prompt: `Prever: ${config.predict}`, hints: [config.predictHint], solution: config.predictSolution, explanation: 'A previsão separa disponibilidade do cliente, disponibilidade do servidor e validade do comando.', expected: config.predictExpected },
        { prompt: `Alterar: ${config.change}`, hints: [config.changeHint], solution: config.changeSolution, explanation: 'A alteração conserva os parâmetros explícitos e evita depender de padrões invisíveis.', expected: config.changeExpected },
        { prompt: `Construir: crie ambiente-${config.slug}.md com sistema, fonte, servidor, cliente, endereço, verificação, resultado e retomada.`, hints: ['Não registre senhas, tokens, caminhos pessoais ou dados reais.'], solution: config.reportSolution, explanation: 'O relatório permite reproduzir o laboratório sem expor credenciais.', expected: 'Oito campos preenchidos com evidência real ou marcados honestamente como não executados.' },
        { prompt: `Investigar erro: ${config.investigate}`, hints: [config.investigateHint, 'Não reinstale tudo antes de identificar a camada que falhou.'], solution: config.investigateSolution, explanation: 'O diagnóstico usa evidências e preserva o laboratório.', expected: config.investigateExpected }
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
      prerequisites: 'Faça esta preparação imediatamente antes de db-mariadb.',
      objective: 'instalar MariaDB Community Server e o cliente, iniciar o serviço e criar um banco descartável.',
      windows: 'Use o instalador Community oficial, configure uma senha administrativa local, inclua as ferramentas de cliente e mantenha o serviço configurado pelo instalador.',
      macos: 'Siga o método atual indicado na página oficial; depois confirme como o serviço é iniciado e parado pelo método escolhido.',
      linux: 'Use a página oficial correspondente à distribuição e não misture comandos de famílias diferentes; confirme o serviço após instalar.',
      verification: 'Em terminal novo, execute mariadb --version e conecte com mariadb -h 127.0.0.1 -P 3306 -u root -p; informe a senha somente no prompt e execute SELECT VERSION();.',
      expected: 'o cliente mostra sua versão, abre um prompt conectado e SELECT VERSION() identifica MariaDB; após USE hub_maria_aula, SELECT DATABASE() devolve hub_maria_aula.',
      commonProblem: 'usar -p como se recebesse a porta; no cliente, -p solicita senha e -P define a porta.',
      resume: 'saia com exit; pare ou inicie o serviço pelo mecanismo do sistema e, ao retomar, reconecte e confirme SELECT DATABASE(), USER(), VERSION();.',
      alternative: 'se não puder instalar, leia a comparação em db-mariadb e mantenha a execução como pendência; não use SQLite como prova de MariaDB.',
      why: 'MariaDB aparece em sistemas reais e compartilha parte da sintaxe com MySQL, mas possui versões, comportamento e ferramentas próprios. A preparação evita estudar diferenças SQL sobre um serviço ainda indisponível.',
      boundary: 'A proximidade histórica com MySQL não torna versões e recursos automaticamente intercambiáveis. Registre a versão real antes de comparar sintaxe.',
      diagnostic: 'Se o cliente existe e a conexão falha, confira serviço, endereço 127.0.0.1, porta 3306 e método de autenticação antes de revisar o SQL.',
      language: 'Terminal e prompt MariaDB',
      code: 'mariadb --version\nmariadb -h 127.0.0.1 -P 3306 -u root -p\nCREATE DATABASE hub_maria_aula CHARACTER SET utf8mb4;\nUSE hub_maria_aula;\nSELECT DATABASE(), USER(), VERSION();\nexit',
      explanation: ['-P maiúsculo informa a porta; -p minúsculo pede senha.', 'A senha não aparece no comando.', 'CREATE DATABASE deve ser executado somente em uma instância de laboratório autorizada.'],
      installInstruction: 'Instale pelo caminho do seu sistema, abra terminal novo e localize o cliente mariadb.',
      installResult: 'Servidor e cliente disponíveis; método de iniciar/parar registrado.',
      testInstruction: 'Conecte, crie hub_maria_aula, selecione-o e execute a consulta de identificação.',
      testResult: 'Banco, usuário e versão confirmados no prompt correto.',
      predict: 'mariadb --version funciona, mas a conexão em 127.0.0.1:3306 é recusada. O que isso prova?',
      predictHint: 'Uma versão consulta apenas o executável local.',
      predictSolution: 'Prova que o cliente existe, não que o serviço está ativo ou escutando nessa porta. Confira o serviço e a porta.',
      predictExpected: 'Resposta distingue cliente de servidor.',
      change: 'adapte a conexão se o laboratório autorizado usar a porta 3307.',
      changeHint: 'A opção de porta é maiúscula.',
      changeSolution: 'mariadb -h 127.0.0.1 -P 3307 -u root -p',
      changeExpected: 'Somente a porta muda; a senha continua fora do comando.',
      reportSolution: 'Sistema/fonte: preencher\nServidor: MariaDB Community local\nCliente: mariadb\nEndereço: 127.0.0.1:3306\nBanco: hub_maria_aula\nUsuário: root de laboratório\nSenha: não registrar\nRetomada: iniciar serviço e reconectar',
      investigate: 'o prompt abre, mas SELECT DATABASE() devolve NULL.',
      investigateHint: 'Uma conexão pode existir sem banco selecionado.',
      investigateSolution: 'Execute USE hub_maria_aula; e repita SELECT DATABASE();. Se o banco não existir, confirme a instância antes de criá-lo.',
      investigateExpected: 'hub_maria_aula selecionado explicitamente.',
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
      prerequisites: 'Faça esta preparação imediatamente antes de db-firebird e use uma pasta de laboratório autorizada.',
      objective: 'instalar Firebird 5, localizar suas ferramentas e criar um arquivo .fdb descartável em caminho permitido.',
      windows: 'Use o instalador oficial de 64 bits adequado, execute com autorização, configure uma senha SYSDBA local e mantenha o servidor como serviço. Localize isql.exe na instalação do Firebird.',
      macos: 'Use o pacote oficial compatível disponível na página de downloads e confirme os caminhos do servidor e das ferramentas no guia da versão.',
      linux: 'Use o kit oficial ou pacote adequado à distribuição conforme o guia e leia as notas da versão; confirme serviço, bibliotecas de cliente e ferramenta isql.',
      verification: 'Execute o isql pertencente ao Firebird com -z para identificar a ferramenta; crie um banco novo em pasta permitida e consulte SELECT CURRENT_USER FROM RDB$DATABASE;.',
      expected: 'isql identifica Firebird 5; a criação abre o banco novo e a consulta retorna SYSDBA ou o usuário de laboratório configurado.',
      commonProblem: 'executar outro programa chamado isql ou escolher uma pasta que a conta do serviço não pode acessar.',
      resume: 'saia com QUIT, preserve o .fdb e registre seu caminho; na retomada, inicie o serviço e conecte informando o caminho autorizado e credenciais no prompt adequado.',
      alternative: 'se o sistema ou a permissão bloquear a instalação, estude a comparação de dialetos e mantenha isql/Firebird como não executados.',
      why: 'Firebird é encontrado em sistemas existentes e usa um banco em arquivo mediado pelo servidor. A preparação torna visíveis serviço, cliente, caminho e permissão antes do estudo do dialeto.',
      boundary: 'O arquivo .fdb não deve ser manipulado como um arquivo SQLite enquanto o servidor o gerencia. O caminho é interpretado no host do servidor.',
      diagnostic: 'Em erro de arquivo, confira primeiro se o caminho pertence ao host do servidor, se é permitido por DatabaseAccess e se a conta do serviço tem acesso.',
      language: 'Terminal e isql do Firebird',
      code: "isql -z\nCREATE DATABASE 'localhost:C:/dados/hub_fb_aula.fdb' USER 'SYSDBA' PASSWORD 'SUA_SENHA_LOCAL' DEFAULT CHARACTER SET UTF8;\nSELECT CURRENT_USER FROM RDB$DATABASE;\nQUIT;",
      explanation: ['Adapte o caminho ao sistema e use um arquivo novo.', 'Não salve a senha real nesse texto.', 'QUIT encerra o cliente; confirme o comportamento transacional na aula prática.'],
      installInstruction: 'Instale pelo kit oficial, registre o método do serviço e localize especificamente o isql do Firebird.',
      installResult: 'Servidor, ferramenta correta e pasta autorizada identificados.',
      testInstruction: 'Crie um .fdb novo e consulte CURRENT_USER.',
      testResult: 'Arquivo criado pelo servidor e usuário confirmado.',
      predict: 'isql -z mostra outra implementação de SQL interativo. É seguro continuar?',
      predictHint: 'O nome do executável não identifica sozinho o fornecedor.',
      predictSolution: 'Não. Localize o isql dentro da instalação do Firebird e confirme que a versão informa Firebird antes de criar o banco.',
      predictExpected: 'A previsão exige confirmar a origem do executável.',
      change: 'adapte o exemplo do Windows para um caminho Linux permitido.',
      changeHint: 'O caminho continua pertencendo ao host do servidor e deve ser absoluto.',
      changeSolution: "CREATE DATABASE 'localhost:/var/lib/firebird/data/hub_fb_aula.fdb' USER 'SYSDBA' PASSWORD 'SUA_SENHA_LOCAL' DEFAULT CHARACTER SET UTF8;",
      changeExpected: 'Caminho absoluto autorizado, sem copiar C:/dados.',
      reportSolution: 'Sistema/fonte: preencher\nServidor: Firebird 5 local\nCliente: isql do Firebird\nEndereço: localhost\nArquivo: caminho autorizado\nUsuário: SYSDBA de laboratório\nSenha: não registrar\nRetomada: iniciar serviço e reconectar',
      investigate: 'a criação falha com erro de acesso ao arquivo.',
      investigateHint: 'O processo do servidor pode ter permissões diferentes do seu usuário.',
      investigateSolution: 'Confirmar host, DatabaseAccess, pasta dedicada e permissões da conta do serviço. Não liberar acesso amplo ao disco nem alterar o SQL de tabela antes de resolver o arquivo.',
      investigateExpected: 'Diagnóstico identifica caminho e permissão do serviço.',
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
      prerequisites: 'Faça esta preparação imediatamente antes de db-mongo-crud. Docker é opcional para este aprofundamento.',
      objective: 'disponibilizar um servidor MongoDB Community e o cliente mongosh e confirmar uma conexão local.',
      windows: 'Escolha a instalação Community documentada para Windows ou um container de laboratório; confirme se o serviço foi criado. Instale mongosh separadamente se o método não o incluir.',
      macos: 'Siga o método Community documentado para a versão suportada do macOS ou use container; verifique servidor e mongosh separadamente.',
      linux: 'Selecione a página exata da distribuição suportada ou use container; não misture repositórios de versões ou distribuições. Confirme o serviço e instale mongosh conforme a documentação.',
      verification: 'Execute mongosh --version; conecte com mongosh "mongodb://127.0.0.1:27017" e execute db.runCommand({ping:1}).',
      expected: 'mongosh mostra sua versão, abre uma sessão no servidor local e o ping devolve um documento com ok igual a 1.',
      commonProblem: 'instalar mongosh e presumir que o servidor MongoDB foi instalado e iniciado junto.',
      resume: 'saia com exit, pare o serviço ou container pelo método usado e preserve os dados do laboratório; na retomada, inicie o servidor e repita o ping.',
      alternative: 'use um cluster educacional autorizado somente se puder proteger a URI e entender limites; caso contrário, mantenha a execução pendente sem simular conexão.',
      why: 'MongoDB introduz documentos BSON, coleções e pipelines. Uma conexão verificada evita investigar insert e aggregate quando o servidor ou cliente ainda não está disponível.',
      boundary: 'MongoDB Community local, MongoDB em container e Atlas são implantações diferentes. O curso usa 127.0.0.1:27017 para o laboratório local e não exige conta remota.',
      diagnostic: 'Se mongosh existe e o ping falha, confira serviço/container, URI e porta antes de revisar comandos de documentos.',
      language: 'Terminal e mongosh',
      code: 'mongosh --version\nmongosh "mongodb://127.0.0.1:27017"\ndb.runCommand({ ping: 1 })\nexit',
      explanation: ['A primeira linha verifica somente o cliente.', 'A URI declara host e porta do laboratório local.', 'O ping confirma que o servidor respondeu antes das operações CRUD.'],
      installInstruction: 'Escolha instalação Community ou container, instale mongosh quando necessário e registre como iniciar/parar cada componente.',
      installResult: 'Servidor e cliente identificados separadamente.',
      testInstruction: 'Conecte à URI local e execute ping.',
      testResult: 'Resposta contém ok: 1 e nenhuma credencial é registrada.',
      predict: 'mongosh --version funciona, mas a conexão retorna ECONNREFUSED. O que isso indica?',
      predictHint: 'O cliente pode existir sem um servidor escutando.',
      predictSolution: 'O mongosh está instalado, mas o servidor não está ativo ou não escuta em 127.0.0.1:27017. Confira serviço/container e URI.',
      predictExpected: 'Resposta diferencia cliente e servidor.',
      change: 'adapte a URI se um laboratório autorizado publicar a porta local 27018.',
      changeHint: 'Mude somente a porta declarada na URI.',
      changeSolution: 'mongosh "mongodb://127.0.0.1:27018"',
      changeExpected: 'URI explícita aponta para 27018 sem adicionar credenciais.',
      reportSolution: 'Sistema/fonte: preencher\nServidor: MongoDB Community local ou container\nCliente: mongosh\nEndereço: 127.0.0.1:27017\nBanco de aula: definido na aula CRUD\nAutenticação: conforme laboratório, sem registrar segredo\nVerificação: ping ok:1\nRetomada: iniciar servidor e repetir ping',
      investigate: 'o ping funciona, mas o projeto escreve no banco errado.',
      investigateHint: 'Uma sessão pode trocar de banco e scripts usam nomes explícitos.',
      investigateSolution: 'No mongosh, confira db.getName(); no script, use db.getSiblingDB com o nome de laboratório previsto. Não apague outros bancos para corrigir contexto.',
      investigateExpected: 'Banco de laboratório selecionado explicitamente.',
      mistake: 'Executar comandos mongosh no console do navegador ou expor uma URI remota com credenciais.',
      quizQuestion: 'Qual resultado mínimo confirma resposta do servidor?',
      quizOptions: ['ping com ok: 1', 'mongosh --version apenas', 'Arquivo HTML aberto'],
      quizCorrect: 0,
      quizExplanation: 'A versão verifica o cliente; o ping alcança o servidor.',
      summary: 'Confirme mongosh, URI 127.0.0.1:27017 e ping antes do CRUD.'
    })
  });
})();

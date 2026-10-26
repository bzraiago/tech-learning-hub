'use strict';

Object.assign(LESSON_GUIDES, {
  'setup-docker': {
    prerequisites: 'Conclua prep-workspace, prep-cycle e prep-errors. No Windows, saiba abrir o PowerShell como usuário comum e, somente quando a documentação solicitar, como administrador. Não execute esta instalação em computador corporativo sem autorização.',
    setup: 'Objetivo: verificar requisitos e disponibilizar Docker Engine e Compose. Requisitos: sistema compatível, virtualização disponível, espaço em disco, internet e permissão de instalação. Windows: confira wsl --status e wsl --version; se WSL não estiver instalado, siga a documentação Microsoft, reinicie quando solicitado e instale Docker Desktop com backend WSL 2. macOS: identifique Apple silicon ou Intel e use o instalador oficial correspondente. Linux: escolha sua distribuição na documentação oficial do Docker Engine e não misture comandos de Ubuntu, Debian, Fedora ou outras famílias. Verificação: em terminal novo execute docker version, docker compose version e docker run --rm hello-world. Resultado esperado: docker version mostra Client e Server, Compose mostra uma versão e hello-world termina com mensagem de sucesso. Problema comum: o cliente existe, mas não alcança o Engine; inicie Docker Desktop ou o serviço antes de alterar PATH ou permissões. Como parar e retomar: encerre containers de laboratório, feche Docker Desktop quando não precisar dele e, na retomada, repita docker version. Alternativa leve: conclua setup-docker-alternative e use SQLite até ter um computador compatível.',
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
          'Para retomar, inicie Docker Desktop ou o serviço e repita docker version. As aulas db-docker-basics, db-docker-compose e db-docker-operations ensinam o laboratório de banco depois desta preparação.'
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
    prerequisites: 'Conclua setup-python ou tenha Python 3 funcional. Leia setup-docker e use esta alternativa se a instalação estiver bloqueada por hardware, sistema, política administrativa, espaço ou tempo.',
    setup: 'Objetivo: continuar praticando SQL localmente sem Docker, sem fingir que SQLite substitui PostgreSQL. Requisitos: Python 3 e uma pasta vazia chamada alternativa-sqlite. Windows: abra essa pasta no editor e um PowerShell nela; use py ou python conforme a preparação Python. macOS: abra a pasta e um terminal nela; use python3 ou o comando já verificado. Linux: abra a pasta e um terminal nela; use python3 ou o comando já verificado. Verificação: execute o comando curto que imprime sqlite3.sqlite_version. Resultado esperado: um número de versão do SQLite, sem instalar servidor. Problema comum: executar o comando Python errado; volte a setup-python e use o comando já verificado. Como parar e retomar: feche o terminal e preserve estudos.db; na retomada, abra a mesma pasta e consulte o arquivo. Alternativa leve: se nem Python estiver disponível, pratique consultas no ambiente interativo SQLite oficial apenas como exercício temporário e registre que o arquivo local não foi produzido.',
    why: 'SQLite permite praticar tabelas, inserções e consultas sem serviço em segundo plano. Ele reduz o bloqueio de hardware, mas não ensina Compose, rede, volumes, usuários do servidor ou diferenças específicas do PostgreSQL.',
    sections: [
      {
        title: 'Decida sem esconder a limitação',
        paragraphs: [
          'Use esta rota quando Docker não puder ser instalado agora, e não somente para evitar investigar um erro simples. Registre o motivo: requisito do sistema, política administrativa, espaço, memória ou tempo de download.',
          'Marque separadamente: SQL executado em SQLite; Docker não executado; PostgreSQL não executado. Essa honestidade permite avançar no conteúdo comum e voltar depois às competências pendentes.'
        ]
      },
      {
        title: 'Pratique o núcleo compartilhado',
        paragraphs: [
          'O módulo sqlite3 faz parte da biblioteca padrão do Python. Uma conexão com estudos.db cria ou abre um arquivo local. CREATE TABLE, INSERT e SELECT fornecem prática inicial observável.',
          'Use parâmetros para valores em vez de concatenar texto em SQL. Feche a conexão ao terminar e mantenha o arquivo na pasta do laboratório.'
        ]
      },
      {
        title: 'Liste o que continua pendente',
        paragraphs: [
          'A alternativa não cobre imagem, container, Compose, porta 55432, volume nomeado, healthcheck, cliente-servidor, usuário PostgreSQL, pg_dump ou pg_restore.',
          'Antes do projeto intermediário, retome setup-docker e depois as três aulas db-docker. O projeto com PostgreSQL real continua bloqueado até essas evidências existirem.'
        ]
      }
    ],
    example: {
      language: 'Terminal · na pasta alternativa-sqlite',
      code: 'python -c "import sqlite3; print(sqlite3.sqlite_version)"\npython -c "import sqlite3; c=sqlite3.connect(\'estudos.db\'); c.execute(\'create table if not exists marcador(texto)\'); c.execute(\'insert into marcador values (?)\', (\'alternativa local\',)); c.commit(); print(c.execute(\'select count(*) from marcador\').fetchone()[0]); c.close()"',
      explanation: [
        'Troque python por py ou python3 se esse foi o comando verificado no seu sistema.',
        'A primeira linha confirma a biblioteca; a segunda cria o arquivo, grava e consulta.',
        'O número cresce se o comando de inserção for repetido; isso demonstra persistência no arquivo local.'
      ],
      expected: 'Primeiro comando imprime a versão do SQLite; o segundo imprime uma contagem maior ou igual a 1; estudos.db aparece na pasta.'
    },
    guided: [
      { instruction: 'Crie e abra a pasta alternativa-sqlite; confirme o comando Python 3.', result: 'Terminal está na pasta correta e Python responde.' },
      { instruction: 'Execute a verificação de sqlite3 e depois o exemplo que cria estudos.db.', result: 'Versão, contagem e arquivo local observáveis.' },
      { instruction: 'Crie pendencias-docker.md e liste as competências não praticadas.', result: 'Documento distingue execução real de conteúdo adiado.' }
    ],
    exercises: [
      { prompt: 'Prever: o que muda na segunda execução do comando que insere o marcador?', hints: ['A tabela é criada apenas se não existir.', 'O INSERT acontece em toda execução.'], solution: 'A contagem aumenta em 1 porque o arquivo persiste e uma nova linha é inserida.', explanation: 'A persistência é do arquivo SQLite, não de volume Docker.', expected: 'A previsão compara as duas execuções e pode ser conferida repetindo o comando na mesma pasta.', criteria: ['Registra a contagem prevista antes da segunda execução e justifica o raciocínio.', 'Mantém o mesmo arquivo de banco e compara a previsão com a contagem observada.'] },
      { prompt: 'Alterar: adicione uma coluna concluido inteira com padrão 0 em uma nova tabela tarefas e insira uma tarefa por parâmetro.', hints: ['Crie outra tabela para não depender do estado do exemplo.', 'Valores entram pelos marcadores ?.'], solution: "create table if not exists tarefas(titulo text not null, concluido integer not null default 0); insert into tarefas(titulo) values (?)", explanation: 'O exercício pratica estrutura e parâmetro sem depender de servidor.', expected: 'Consulta mostra título e concluido igual a 0.', criteria: ['Cria tarefas com a coluna inteira concluido e o valor padrão solicitado.', 'Insere o título por parâmetro, sem concatená-lo ao SQL, e consulta os dois campos.', 'Omite concluido na inserção para conferir o valor padrão na consulta.'] },
      { prompt: 'Construir: crie um relatório com uma consulta executada e duas competências que continuam pendentes.', hints: ['Não marque Docker como praticado.', 'Escolha itens observáveis, como Compose e porta.'], solution: 'Executado: SQLite local, CREATE/INSERT/SELECT e persistência em estudos.db. Pendente: subir PostgreSQL com Compose; conectar em 127.0.0.1:55432; validar volume e backup.', explanation: 'O relatório impede que a alternativa infle o nível comprovado.', expected: 'Separa explicitamente executado e pendente.', criteria: ['Inclui uma consulta realmente executada e o resultado observado no SQLite.', 'Identifica duas competências distintas ainda sem evidência de execução.', 'Explica o que precisará executar ao retomar o caminho Docker/PostgreSQL.'] },
      { prompt: 'Investigar erro: o comando informa No module named sqlite3. Como agir?', hints: ['sqlite3 normalmente acompanha Python.', 'Confirme qual interpretador executou o comando.'], solution: 'Repetir a verificação de setup-python, conferir versão e caminho do interpretador. Não instalar um pacote aleatório chamado sqlite3. Se a distribuição separa módulos padrão, consultar a documentação oficial dela.', explanation: 'O diagnóstico evita pacotes de procedência incerta e mistura de interpretadores.', expected: 'O plano coleta evidências do ambiente e define como confirmar a causa antes de instalar algo.', criteria: ['Relaciona o comando usado ao ambiente preparado em setup-python e registra a mensagem real.', 'Propõe verificações antes de modificar a instalação e consulta a fonte oficial adequada ao sistema.', 'Define uma nova verificação observável para conferir se o módulo ficou disponível.'] }
    ],
    mistakes: [
      'Dizer que SQLite é PostgreSQL leve: são mecanismos diferentes.',
      'Marcar Docker, Compose ou rede como praticados sem executá-los.',
      'Executar o comando fora da pasta e depois não encontrar estudos.db.',
      'Instalar pacote aleatório sqlite3 sem verificar o Python usado.',
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
      'Retome Docker antes do projeto intermediário com banco real.'
    ]
  }
});

'use strict';

Object.assign(LESSON_GUIDES, {
  'setup-postgresql': {
    prerequisites: 'Esta preparação depende de Preparar Docker, WSL e virtualização e da aula Compose: portas, volumes e conexão ao PostgreSQL. Como a aula Compose aparece mais adiante em Banco de Dados, pule esta preparação por enquanto e retorne depois de concluí-la. O serviço precisa estar healthy e usar PostgreSQL 17, usuário aluno, banco estudos e porta 127.0.0.1:55432. Se Docker não estiver disponível, use Seguir sem Docker em computador limitado para praticar SQLite e deixe esta conexão PostgreSQL pendente.',
    setup: [
      'Objetivo: instalar ou localizar o cliente psql e conectar ao servidor PostgreSQL do laboratório.',
      'Requisitos: conclua Preparar Docker, WSL e virtualização e Compose: portas, volumes e conexão ao PostgreSQL; o serviço db precisa mostrar healthy. Não instale um segundo servidor PostgreSQL para esta aula.',
      'Pasta do Compose: os comandos docker compose são executados no PowerShell/Terminal cuja pasta contém compose.yaml. No VS Code, abra essa pasta e escolha Terminal > Novo Terminal. psql --version e a conexão do cliente podem ser executados em qualquer pasta do terminal.',
      'Windows: no PowerShell, instale o cliente psql pelo instalador oficial. Se houver seleção de componentes, inclua ferramentas de linha de comando. Abra um PowerShell novo e execute psql --version. pgAdmin é opcional.',
      'macOS: no Terminal, instale o cliente pelo pacote oficial compatível com o processador. Abra um Terminal novo e execute psql --version. O servidor permanece no Compose do curso.',
      'Linux: no Terminal, selecione sua distribuição na página oficial e instale somente o cliente PostgreSQL. Não instale outro servidor se o Compose do curso já fornece o servidor. Execute psql --version.',
      'Verificação: na pasta que contém compose.yaml, execute docker compose ps e docker compose port db 5432. db precisa estar healthy e a porta publicada deve ser 127.0.0.1:55432. Depois conecte pelo cliente externo.',
      'Conectar — PowerShell/Terminal: execute psql -h 127.0.0.1 -p 55432 -U aluno -d estudos -W. Digite a senha local apenas no pedido de senha; não a inclua no comando.',
      'Dentro do psql: só depois que aparecer estudos=> execute SELECT current_database(), current_user; e \\conninfo. Use \\q para sair do psql e voltar ao PowerShell/Terminal.',
      'Resultado esperado: psql --version mostra a versão do cliente; a conexão pede senha e abre estudos=>; a consulta retorna estudos e aluno; \\conninfo indica 127.0.0.1 e porta 55432.',
      'Problema comum: Connection refused indica que serviço/porta não responderam; password authentication failed indica falha de autenticação; psql não reconhecido indica cliente ou PATH. Confira mensagem e destino antes de alterar a senha.',
      'Como parar e retomar: no prompt estudos=> digite \\q. Na pasta de compose.yaml, pare com docker compose stop; para retomar, execute docker compose start, aguarde db healthy e conecte novamente.',
      'Alternativa leve: sem instalar psql no computador, abra PowerShell/Terminal na pasta de compose.yaml e execute docker compose exec db psql -U aluno -d estudos. Isso verifica o servidor pelo próprio container, mas não comprova que psql externo ou a porta publicada funcionem.'
    ].join('\n'),
    why: 'PostgreSQL é o servidor; psql e pgAdmin são clientes. Uma conexão só é reproduzível quando informa de onde parte, host, porta, banco e usuário. Tornar esses parâmetros explícitos evita alcançar outra instalação por acidente.',
    sections: [
      {
        title: 'Escolha o cliente sem duplicar o servidor',
        paragraphs: [
          'O caminho principal do curso mantém o servidor PostgreSQL no serviço db do Compose. Instalar psql ou pgAdmin no computador não exige instalar um segundo servidor. Na página oficial, escolha o pacote adequado ao sistema e selecione as ferramentas de cliente quando o instalador oferecer componentes.',
          'psql é o cliente de terminal usado nos comandos e projetos do curso. pgAdmin é uma interface gráfica opcional. Aprender a interface não substitui registrar os parâmetros nem executar scripts reproduzíveis.'
        ]
      },
      {
        title: 'Leia a conexão a partir de onde o cliente está',
        paragraphs: [
          'Um psql instalado no computador conecta em 127.0.0.1:55432. A porta 55432 pertence ao computador e é encaminhada para 5432 no container. Já outro serviço na mesma rede Compose usa db:5432.',
          'O comando -h define host, -p porta, -U usuário e -d banco. -W força o prompt de senha. Não coloque a senha no comando, no README, no histórico do shell ou no repositório.'
        ]
      },
      {
        title: 'Diagnostique em camadas',
        paragraphs: [
          'Primeiro confirme docker compose ps e o estado healthy. Depois confira docker compose port db 5432, que deve revelar a publicação em 127.0.0.1:55432. Só então teste o cliente externo.',
          'Connection refused sugere serviço ou porta; password authentication failed aponta para credencial; database does not exist aponta para o nome do banco; psql não reconhecido aponta para instalação ou PATH do cliente. Preserve a mensagem exata antes de agir.',
          'Dentro do psql, SELECT current_database(), current_user; verifica o destino real. Saia com \\q. Para o cliente gráfico, use os mesmos quatro parâmetros e nomeie a conexão como laboratório local.'
        ]
      }
    ],
    example: {
      language: 'Terminal e prompt psql',
      code: 'psql --version\npsql -h 127.0.0.1 -p 55432 -U aluno -d estudos -W\n\n-- Depois que aparecer estudos=>\nSELECT current_database(), current_user;\n\\conninfo\n\\q',
      blocks: [
        { label: 'PowerShell/Terminal — pasta que contém compose.yaml', code: 'docker compose ps\ndocker compose port db 5432' },
        { label: 'PowerShell/Terminal — confira o cliente e conecte', code: 'psql --version\npsql -h 127.0.0.1 -p 55432 -U aluno -d estudos -W' },
        { label: 'Prompt psql — somente depois de aparecer estudos=>', code: 'SELECT current_database(), current_user;\n\\conninfo\n\\q' },
        { label: 'Alternativa sem psql instalado — PowerShell/Terminal na pasta do Compose', code: 'docker compose exec db psql -U aluno -d estudos' },
        { label: 'Prompt psql da alternativa — depois de aparecer estudos=>', code: 'SELECT current_database(), current_user;\n\\q' }
      ],
      explanation: [
        'Execute psql no terminal; execute SELECT e comandos com barra somente depois de entrar no prompt psql.',
        'A senha é digitada no prompt e não aparece no comando.',
        '\\conninfo informa a conexão atual; \\q devolve o controle ao terminal.'
      ],
      expected: 'psql mostra sua versão; a conexão abre estudos=>; a consulta retorna estudos e aluno; \\conninfo informa host 127.0.0.1 e porta 55432.'
    },
    guided: [
      { instruction: 'No VS Code, abra a pasta que contém compose.yaml e escolha Terminal > Novo Terminal. Execute docker compose ps e docker compose port db 5432 no PowerShell/Terminal.', result: 'O serviço db aparece healthy e a porta publicada é 127.0.0.1:55432.' },
      { instruction: 'Em PowerShell/Terminal, de qualquer pasta, execute psql --version e depois a conexão. Digite a senha somente quando o cliente pedir.', result: 'A versão do cliente aparece e a conexão abre o prompt estudos=>.' },
      { instruction: 'Somente dentro do prompt estudos=>, execute SELECT current_database(), current_user; e \\conninfo. Registre a saída sem senha e digite \\q para voltar ao terminal.', result: 'Banco, usuário, host e porta confirmados por evidência real.' }
    ],
    exercises: [
      { prompt: 'Prever: um psql instalado no computador tenta 127.0.0.1:5432, mas o Compose publica 55432. O que pode acontecer?', hints: ['A porta padrão pode estar vazia ou pertencer a outro servidor.'], solution: 'A conexão pode ser recusada ou atingir outra instalação local. Use 127.0.0.1:55432 e confirme o destino com \\conninfo.', explanation: 'Uma conexão bem-sucedida na porta errada ainda pode produzir evidência inválida.', expected: 'A previsão relaciona a porta escolhida ao destino e propõe como conferir o que ocorreu.', criteria: ['Explica por que o resultado depende do serviço disponível na porta solicitada.', 'Indica uma conferência do destino real antes de considerar a conexão validada.'] },
      { prompt: 'Alterar: configure a mesma conexão em um cliente gráfico opcional.', hints: ['Reutilize exatamente host, porta, banco e usuário.', 'Não salve a senha em captura ou arquivo do projeto.'], solution: 'Nome: laboratório local; host: 127.0.0.1; porta: 55432; database: estudos; username: aluno; senha: informar de forma local conforme a política do cliente.', explanation: 'Interface e terminal devem apontar para o mesmo servidor.', expected: 'A consulta SELECT current_database(), current_user; retorna estudos e aluno.', criteria: ['Reutiliza host, porta, banco e usuário da conexão pelo terminal.', 'Confirma banco e usuário pela consulta no cliente gráfico e registra o resultado observado.', 'Preserva a senha fora do relato e das capturas compartilhadas.'] },
      { prompt: 'Construir: crie conexao-postgresql.md com parâmetros, comandos, resultado e forma de retomada.', hints: ['Registre onde cada comando é executado.', 'Substitua a senha por “não registrar”.'], solution: 'Origem: cliente no computador\nHost: 127.0.0.1\nPorta: 55432\nBanco: estudos\nUsuário: aluno\nSenha: não registrar\nVerificação: psql + SELECT + \\conninfo\nRetomada: docker compose start; aguardar healthy; conectar', explanation: 'O relatório permite reproduzir a conexão sem expor segredo.', expected: 'Documento contém parâmetros completos, evidência e retomada, mas nenhuma senha.', criteria: ['Identifica a origem do cliente, host, porta, banco e usuário, sem incluir a senha.', 'Distingue comandos do terminal de instruções executadas dentro do psql e registra saídas reais.', 'Descreve como retomar o serviço e conferir sua disponibilidade antes de reconectar.'] },
      { prompt: 'Investigar erro: o cliente responde “password authentication failed for user aluno”. Defina uma ordem segura de investigação.', hints: ['Não apague o volume.', 'A senha da imagem é aplicada somente ao inicializar um volume vazio.'], solution: 'Confirmar host/porta com \\conninfo ou comando; conferir se o serviço é o laboratório esperado; usar a senha local correspondente ao volume já inicializado; consultar logs necessários sem expor segredo. Não alterar .env esperando que um volume existente seja reinicializado e não executar down -v.', explanation: 'Trocar a variável depois da inicialização não muda automaticamente a credencial armazenada.', expected: 'O plano usa evidências para investigar a autenticação e mantém os dados e as credenciais protegidos.', criteria: ['Verifica o destino solicitado e a mensagem real antes de concluir que a credencial está incorreta.', 'Considera o histórico de inicialização do ambiente ao avaliar a configuração atual.', 'Propõe verificações que preservam o volume e não expõem a senha em comandos ou registros.'] }
    ],
    mistakes: [
      'Usar localhost sem porta e atingir outro PostgreSQL local.',
      'Confundir psql com o servidor PostgreSQL.',
      'Executar SELECT no terminal comum ou executar docker no prompt psql.',
      'Salvar a senha em comando, README, captura de tela ou repositório.',
      'Apagar o volume para corrigir qualquer falha de autenticação.'
    ],
    quiz: [
      { question: 'Qual porta o psql instalado no computador usa neste laboratório?', options: ['55432', '5432', '27017'], correctIndex: 0, explanation: 'O Compose publica 55432 no host e encaminha para 5432 no container.' },
      { question: 'Qual endereço outro serviço na mesma rede Compose usa?', options: ['db:5432', '127.0.0.1:55432 sempre', 'estudos:80'], correctIndex: 0, explanation: 'Na rede Compose, o nome do serviço é db e a porta interna é 5432.' },
      { question: 'Uma interface gráfica substitui o registro dos parâmetros de conexão?', options: ['Sim', 'Não', 'Somente no Windows'], correctIndex: 1, explanation: 'Host, porta, banco e usuário continuam sendo necessários para reproduzir e diagnosticar.' }
    ],
    retry: { prompt: 'Um segundo serviço no mesmo arquivo Compose tenta acessar PostgreSQL por `127.0.0.1:55432` e não consegue. Explique qual host e porta esse serviço deve usar na rede Compose e como confirmar banco e usuário depois de conectar, sem registrar senha.', expected: 'A resposta usa db:5432 entre serviços, diferencia essa rota da porta 55432 no computador e confirma estudos/aluno por consulta.', hint: 'Dentro de outro container, 127.0.0.1 aponta para ele próprio.' },
    summary: [
      'Servidor e cliente são componentes diferentes.',
      'Cliente no computador: 127.0.0.1:55432; serviço na rede Compose: db:5432.',
      'Verifique o destino com SELECT current_database(), current_user; e \\conninfo.',
      'Nunca registre a senha; preserve o volume durante diagnósticos.'
    ]
  }
});

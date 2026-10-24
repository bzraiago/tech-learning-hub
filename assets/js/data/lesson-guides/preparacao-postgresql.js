'use strict';

Object.assign(LESSON_GUIDES, {
  'setup-postgresql': {
    prerequisites: 'Conclua setup-docker e db-docker-compose para o caminho principal. O serviço db deve estar healthy e usar a configuração do curso: PostgreSQL 17, usuário aluno, banco estudos e porta 127.0.0.1:55432. Se Docker não estiver disponível, conclua setup-docker-alternative e mantenha esta preparação como pendência antes do projeto intermediário.',
    setup: 'Objetivo: disponibilizar um cliente PostgreSQL e comprovar uma conexão explícita ao laboratório. Requisitos: serviço PostgreSQL em execução, parâmetros de conexão, senha local e permissão para instalar um cliente quando necessário. Windows: o instalador oficial do PostgreSQL pode incluir psql e pgAdmin; se instalar somente o cliente, confirme onde o executável foi colocado e abra um terminal novo. macOS: escolha o pacote ou instalador indicado na página oficial para sua arquitetura e confirme psql no terminal. Linux: use o repositório indicado para sua distribuição e instale o cliente PostgreSQL; servidor local não é necessário quando o banco roda no Docker. Verificação: execute psql --version e conecte com psql -h 127.0.0.1 -p 55432 -U aluno -d estudos -W. Resultado esperado: o prompt pede a senha e depois mostra estudos=>; SELECT current_database(), current_user; retorna estudos e aluno. Problema comum: usar a porta 5432 no computador, embora o laboratório publique 55432; confira docker compose ps antes de culpar a senha. Como parar e retomar: saia do psql com \\q e pare o laboratório com docker compose stop; na retomada, execute docker compose start, aguarde healthy e reconecte. Alternativa leve: use psql dentro do container com docker compose exec db psql -U aluno -d estudos; isso verifica o banco, mas não comprova um cliente externo nem a porta publicada.',
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
      explanation: [
        'Execute psql no terminal; execute SELECT e comandos com barra somente depois de entrar no prompt psql.',
        'A senha é digitada no prompt e não aparece no comando.',
        '\\conninfo informa a conexão atual; \\q devolve o controle ao terminal.'
      ],
      expected: 'psql mostra sua versão; a conexão abre estudos=>; a consulta retorna estudos e aluno; \\conninfo informa host 127.0.0.1 e porta 55432.'
    },
    guided: [
      { instruction: 'Na pasta do compose.yaml, execute docker compose ps e docker compose port db 5432.', result: 'Serviço db healthy e publicação equivalente a 127.0.0.1:55432.' },
      { instruction: 'Em terminal novo, execute psql --version e depois a conexão com todos os parâmetros.', result: 'Cliente encontrado e prompt estudos=> aberto após a senha local.' },
      { instruction: 'Execute SELECT current_database(), current_user; e \\conninfo; registre a saída sem senha.', result: 'Banco, usuário, host e porta confirmados por evidência real.' }
    ],
    exercises: [
      { prompt: 'Prever: um psql instalado no computador tenta 127.0.0.1:5432, mas o Compose publica 55432. O que pode acontecer?', hints: ['A porta padrão pode estar vazia ou pertencer a outro servidor.'], solution: 'A conexão pode ser recusada ou atingir outra instalação local. Use 127.0.0.1:55432 e confirme o destino com \\conninfo.', explanation: 'Uma conexão bem-sucedida na porta errada ainda pode produzir evidência inválida.', expected: 'A previsão inclui falha e conexão acidental a outro servidor.' },
      { prompt: 'Alterar: configure a mesma conexão em um cliente gráfico opcional.', hints: ['Reutilize exatamente host, porta, banco e usuário.', 'Não salve a senha em captura ou arquivo do projeto.'], solution: 'Nome: laboratório local; host: 127.0.0.1; porta: 55432; database: estudos; username: aluno; senha: informar de forma local conforme a política do cliente.', explanation: 'Interface e terminal devem apontar para o mesmo servidor.', expected: 'A consulta SELECT current_database(), current_user; retorna estudos e aluno.' },
      { prompt: 'Construir: crie conexao-postgresql.md com parâmetros, comandos, resultado e forma de retomada.', hints: ['Registre onde cada comando é executado.', 'Substitua a senha por “não registrar”.'], solution: 'Origem: cliente no computador\nHost: 127.0.0.1\nPorta: 55432\nBanco: estudos\nUsuário: aluno\nSenha: não registrar\nVerificação: psql + SELECT + \\conninfo\nRetomada: docker compose start; aguardar healthy; conectar', explanation: 'O relatório permite reproduzir a conexão sem expor segredo.', expected: 'Documento contém parâmetros completos, evidência e retomada, mas nenhuma senha.' },
      { prompt: 'Investigar erro: o cliente responde “password authentication failed for user aluno”. Defina uma ordem segura de investigação.', hints: ['Não apague o volume.', 'A senha da imagem é aplicada somente ao inicializar um volume vazio.'], solution: 'Confirmar host/porta com \\conninfo ou comando; conferir se o serviço é o laboratório esperado; usar a senha local correspondente ao volume já inicializado; consultar logs necessários sem expor segredo. Não alterar .env esperando que um volume existente seja reinicializado e não executar down -v.', explanation: 'Trocar a variável depois da inicialização não muda automaticamente a credencial armazenada.', expected: 'Diagnóstico preserva volume e distingue configuração atual de inicialização.' }
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
    summary: [
      'Servidor e cliente são componentes diferentes.',
      'Cliente no computador: 127.0.0.1:55432; serviço na rede Compose: db:5432.',
      'Verifique o destino com SELECT current_database(), current_user; e \\conninfo.',
      'Nunca registre a senha; preserve o volume durante diagnósticos.'
    ]
  }
});

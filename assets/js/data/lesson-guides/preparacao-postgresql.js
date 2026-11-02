'use strict';

Object.assign(LESSON_GUIDES, {
  'setup-postgresql': {
    prerequisiteLessons: ['setup-docker', 'db-docker-compose'],
    prerequisites: 'Esta preparação depende de Preparar Docker, WSL e virtualização e da aula Compose: portas, volumes e conexão ao PostgreSQL. Como a aula Compose aparece mais adiante em Banco de Dados, pule esta preparação por enquanto e retorne depois de concluí-la. O serviço precisa estar healthy e usar PostgreSQL 17, usuário aluno, banco estudos e porta 127.0.0.1:55432. Se Docker não estiver disponível, use Seguir sem Docker em computador limitado para praticar SQLite e deixe esta conexão PostgreSQL pendente.',
    setup: [
      'Objetivo: confirmar o PostgreSQL do laboratório Compose com o cliente psql que já existe no container; opcionalmente, testar um psql externo depois.',
      'Requisitos: Preparar Docker, WSL e virtualização e Compose: portas, volumes e conexão ao PostgreSQL. A aula Compose vem depois desta preparação na trilha; use os atalhos de pré-requisito e volte quando o serviço db estiver healthy. Sem Docker, siga a alternativa SQLite e deixe esta prática pendente.',
      'Lugares: no VS Code, abra a pasta dados-local da aula Compose, que contém compose.yaml. Terminal > Novo Terminal abre o PowerShell/Terminal nessa pasta. O prompt estudos=> aparece somente após abrir psql. Esta página não executa comandos.',
      'Percurso: leia Conceitos, depois abra Exemplo. Os passos numerados colocam cada comando junto da ação e da confirmação. Não execute comandos antes do passo correspondente.',
      'Windows: siga o caminho principal no Exemplo, usando o terminal do VS Code na pasta compose.yaml; não instale outro servidor.',
      'macOS: siga o mesmo caminho principal com Docker Compose no Terminal; o psql externo é opcional.',
      'Linux: siga o mesmo caminho principal com Docker Compose no Terminal; o psql externo é opcional.',
      'Verificação: docker compose ps confirma o serviço; docker compose exec db psql abre o cliente interno.',
      'Resultado esperado: db healthy; depois SELECT current_database(), current_user; dentro de estudos=> mostra estudos e aluno.',
      'Problema comum: psql não reconhecido no computador não impede usar o cliente interno; Connection refused, senha recusada e banco ausente têm causas diferentes. Guarde a mensagem real antes de mudar uma configuração.',
      'Como parar e retomar: saia do psql com \\q e use docker compose stop/start na mesma pasta; nunca execute down -v para resolver um erro. O último passo do Exemplo traz a sequência.',
      'Alternativa leve: sem Docker, siga a aula SQLite e deixe PostgreSQL pendente. Ler esta aula não executa o servidor.'
    ].join('\n'),
    why: 'PostgreSQL é o servidor; psql e pgAdmin são clientes. Uma conexão só é reproduzível quando informa de onde parte, host, porta, banco e usuário. Tornar esses parâmetros explícitos evita alcançar outra instalação por acidente.',
    sections: [
      {
        title: 'Reconheça o laboratório e os dois lugares de comando',
        paragraphs: [
          'O servidor PostgreSQL roda no serviço db do Compose. psql é o cliente de terminal. O caminho principal abre o psql que já está no container; nenhuma instalação nova é exigida para a primeira consulta.',
          'PowerShell/Terminal executa docker compose. Somente depois que aparecer estudos=>, o prompt psql recebe SELECT e comandos com barra. O navegador exibe esta aula, mas não executa o banco.'
        ]
      },
      {
        title: 'Leia a conexão a partir de onde o cliente está',
        paragraphs: [
          'Um psql instalado no computador conecta em 127.0.0.1:55432. A porta 55432 pertence ao computador e é encaminhada para 5432 no container. Já outro serviço na mesma rede Compose usa db:5432.',
          'O cliente dentro do container usa o serviço local sem testar a porta publicada. Um psql externo opcional usa -h para host, -p para porta, -U para usuário, -d para banco e -W para pedir senha. Não coloque senha no comando, README ou repositório.'
        ]
      },
      {
        title: 'Diagnostique em camadas',
        paragraphs: [
          'Primeiro confirme docker compose ps e o estado healthy. Depois confira docker compose port db 5432, que deve revelar 127.0.0.1:55432. Em seguida, faça a primeira consulta com o psql do container.',
          'Connection refused sugere serviço ou porta; password authentication failed aponta para autenticação; database does not exist aponta para o nome do banco; psql não reconhecido no computador aponta para cliente ou PATH. Preserve a mensagem exata antes de agir.',
          'Dentro do psql, SELECT current_database(), current_user; confirma o banco e o usuário. Saia com \\q. A conexão externa e pgAdmin são aprofundamentos, não bloqueiam a primeira prática.'
        ]
      }
    ],
    example: {
      language: 'Terminal e prompt psql',
      code: 'docker compose ps\ndocker compose exec db psql -U aluno -d estudos\n\n-- Somente depois que aparecer estudos=>\nSELECT current_database(), current_user;\n\\q',
      blocks: [
        { label: 'PowerShell/Terminal — pasta que contém compose.yaml', code: 'docker compose ps\ndocker compose port db 5432' },
        { label: 'PowerShell/Terminal — confira o cliente e conecte', code: 'psql --version\npsql -h 127.0.0.1 -p 55432 -U aluno -d estudos -W' },
        { label: 'Prompt psql — somente depois de aparecer estudos=>', code: 'SELECT current_database(), current_user;\n\\conninfo\n\\q' },
        { label: 'Alternativa sem psql instalado — PowerShell/Terminal na pasta do Compose', code: 'docker compose exec db psql -U aluno -d estudos' },
        { label: 'Prompt psql da alternativa — depois de aparecer estudos=>', code: 'SELECT current_database(), current_user;\n\\q' }
      ],
      steps: [
        { title: 'Volte quando o laboratório Compose estiver pronto', paragraphs: ['Esta aula está na etapa 0, mas o laboratório necessário só é criado em Compose: portas, volumes e conexão ao PostgreSQL. Use o atalho de pré-requisito, conclua aquela aula e retorne aqui. Se Docker ainda não funciona, siga a alternativa SQLite e deixe PostgreSQL pendente.', 'No VS Code, abra a pasta dados-local criada na aula Compose. Abra Terminal > Novo Terminal. Confirme que compose.yaml aparece no Explorador lateral e que o terminal está nessa mesma pasta.'], expected: 'O arquivo compose.yaml e o serviço db já existem; nada foi criado nesta etapa.' },
        { title: 'Confirme o serviço antes de abrir um cliente', paragraphs: ['No terminal do VS Code aberto na pasta de compose.yaml, execute as duas linhas uma de cada vez. Se o serviço estiver parado, use docker compose start, aguarde e repita docker compose ps. Não execute down -v.'], blocks: [{ label: 'TERMINAL — pasta de compose.yaml', code: 'docker compose ps\ndocker compose port db 5432' }], expected: 'A linha do serviço db mostra healthy; a publicação da porta aponta para 127.0.0.1:55432. Se não aparecer, pare e revise a aula Compose antes de prosseguir.' },
        { title: 'Faça a primeira consulta com o cliente do container', paragraphs: ['Ainda no terminal da pasta de compose.yaml, execute somente a linha abaixo. Ela abre psql dentro do serviço db, por isso não depende de instalar psql no Windows.', 'Quando surgir estudos=>, execute a consulta do segundo bloco. O primeiro bloco é do terminal comum; o segundo é do prompt psql.'], blocks: [{ label: 'TERMINAL — pasta de compose.yaml', code: 'docker compose exec db psql -U aluno -d estudos' }, { label: 'PROMPT psql — depois de estudos=>', code: 'SELECT current_database(), current_user;\n\\q' }], expected: 'A consulta mostra banco estudos e usuário aluno. Depois de \\q, volta o caminho normal do terminal. Esta consulta confirma o servidor, mas não testa a porta publicada nem um cliente externo.' },
        { title: 'Aprofundamento: conecte com psql externo, se já estiver instalado', paragraphs: ['Este passo é opcional. No PowerShell novo, fora ou dentro do VS Code, execute psql --version. Se não for reconhecido, não altere o PATH às cegas: conclua a prática pelo cliente do container e registre o cliente externo como pendente. Para instalar psql externo depois, use o pacote de cliente da sua distribuição ou a seleção de ferramentas de linha de comando do instalador oficial; confirme a escolha na documentação do sistema.', 'Se psql --version funcionar, execute a conexão abaixo no PowerShell. Digite a senha apenas quando o programa pedir. Depois que aparecer estudos=>, execute a consulta e \\conninfo.'], blocks: [{ label: 'POWERSHELL/TERMINAL — cliente externo opcional', code: 'psql --version\npsql -h 127.0.0.1 -p 55432 -U aluno -d estudos -W' }, { label: 'PROMPT psql — somente após a conexão', code: 'SELECT current_database(), current_user;\n\\conninfo\n\\q' }], expected: 'psql --version identifica o cliente; a consulta mostra estudos/aluno e \\conninfo aponta para 127.0.0.1:55432. Se a conexão falhar, registre a mensagem exata, não inclua senha no relato.' },
        { title: 'Pare e retome sem apagar o banco', paragraphs: ['Na pasta de compose.yaml, pare o serviço com docker compose stop. Quando voltar, execute docker compose start, espere db healthy em docker compose ps e repita a consulta do passo 3. O volume mantém o banco de dados.'], blocks: [{ label: 'TERMINAL — pasta de compose.yaml', code: 'docker compose stop\ndocker compose start\ndocker compose ps' }], expected: 'Depois de healthy, a consulta do passo 3 ainda mostra estudos/aluno. Se não estiver healthy, não execute a conexão ainda.' }
      ],
      explanation: [
        'Execute psql no terminal; execute SELECT e comandos com barra somente depois de entrar no prompt psql.',
        'A senha é digitada no prompt e não aparece no comando.',
        '\\conninfo informa a conexão atual; \\q devolve o controle ao terminal.'
      ],
      expected: 'db healthy; o psql interno abre estudos=>; a consulta retorna estudos e aluno. O teste externo de 127.0.0.1:55432 é opcional.'
    },
    guided: [
      { instruction: 'Na pasta de compose.yaml, execute docker compose ps e docker compose port db 5432 no terminal.', result: 'O serviço db aparece healthy e a porta publicada é 127.0.0.1:55432.' },
      { instruction: 'Ainda nessa pasta, execute docker compose exec db psql -U aluno -d estudos. Não é necessário instalar psql no computador.', result: 'O prompt estudos=> aparece dentro do container.' },
      { instruction: 'Somente no prompt estudos=>, execute SELECT current_database(), current_user; e depois \\q. Registre a saída sem senha.', result: 'Banco estudos e usuário aluno confirmados; a sessão volta ao terminal comum.' }
    ],
    exercises: [
      { prompt: 'Prever: um psql instalado no computador tenta 127.0.0.1:5432, mas o Compose publica 55432. O que pode acontecer?', hints: ['A porta padrão pode estar vazia ou pertencer a outro servidor.'], solution: 'A conexão pode ser recusada ou atingir outra instalação local. Use 127.0.0.1:55432 e confirme o destino com \\conninfo.', explanation: 'Uma conexão bem-sucedida na porta errada ainda pode produzir evidência inválida.', expected: 'A previsão relaciona a porta escolhida ao destino e propõe como conferir o que ocorreu.', criteria: ['Explica por que o resultado depende do serviço disponível na porta solicitada.', 'Indica uma conferência do destino real antes de considerar a conexão validada.'] },
      { prompt: 'Alterar: no terminal da pasta de compose.yaml, conecte pelo cliente interno informando também o banco no comando e execute SELECT current_database(), current_user;. Compare com o resultado do passo 3.', hints: ['O comando do passo 3 já informa -d estudos.', 'Mude apenas o nome do banco para outro nome que exista no seu laboratório; se não existir outro banco, explique a mudança por escrito e não execute.'], solution: 'O comando original docker compose exec db psql -U aluno -d estudos já informa o banco. Para outro banco previamente existente, substitua somente o valor de -d e confirme com SELECT current_database(), current_user;. Sem outro banco, registre a alteração como não executada.', explanation: 'A opção -d seleciona o banco; a consulta confirma o destino real.', expected: 'O relatório compara o banco escolhido no comando e o resultado da consulta, ou declara que a alteração não foi executada por falta de outro banco.', criteria: ['Localiza a opção -d no comando já ensinado.', 'Não inventa um banco existente nem cria outro sem orientação.', 'Confirma o destino por consulta quando houve conexão.'] },
      { prompt: 'Construir: na pasta dados-local já aberta no VS Code, clique Novo Arquivo no Explorer, nomeie conexao-postgresql.md, registre origem do cliente, parâmetros, comandos, saída real e retomada; use Arquivo > Salvar.', hints: ['Registre onde cada comando é executado.', 'Substitua a senha por “não registrar”.'], solution: 'Origem: psql dentro do container db\nHost/porta internos: serviço db, 5432\nPorta publicada no computador: 127.0.0.1:55432 (não testada pelo cliente interno)\nBanco: estudos\nUsuário: aluno\nSenha: não registrar\nVerificação: docker compose ps + SELECT current_database(), current_user;\nRetomada: docker compose start; aguardar healthy; reconectar', explanation: 'O relatório permite reproduzir a conexão sem expor segredo.', expected: 'Documento contém parâmetros completos, evidência real e retomada; distingue a porta publicada da conexão interna e não contém senha.', criteria: ['Identifica a origem do cliente, host, porta, banco e usuário, sem incluir a senha.', 'Distingue comandos do terminal de instruções executadas dentro do psql e registra saídas reais.', 'Descreve como retomar o serviço e conferir sua disponibilidade antes de reconectar.'] },
      { prompt: 'Investigar erro: o cliente externo responde “password authentication failed for user aluno”. Defina uma ordem segura de investigação.', hints: ['Não apague o volume.', 'A senha da imagem é aplicada somente ao inicializar um volume vazio.'], solution: 'Confira o comando externo digitado, a porta publicada com docker compose port db 5432 e o serviço com docker compose ps. Se o cliente interno ainda consulta estudos/aluno, compare a senha local usada com a configuração original do volume. \\conninfo só pode ser usado depois de uma conexão bem-sucedida; não funciona na tentativa que falhou. Não execute down -v.', explanation: 'Trocar a variável depois da inicialização não muda automaticamente a credencial armazenada.', expected: 'O plano usa evidências para investigar a autenticação e mantém os dados e as credenciais protegidos.', criteria: ['Verifica o destino solicitado e a mensagem real antes de concluir que a credencial está incorreta.', 'Considera o histórico de inicialização do ambiente ao avaliar a configuração atual.', 'Propõe verificações que preservam o volume e não expõem a senha em comandos ou registros.'] }
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
    requirementChange: { prompt: 'Novo pedido: o relatório de conexão deve registrar também se a consulta foi feita pelo cliente dentro do container ou por psql externo. Preserve banco estudos e usuário aluno. Sem instalar nada novo, repita a consulta pelo cliente interno e acrescente ao relatório origem, comando usado e saída real, sem senha.', criteria: ['Comportamento preservado: consulta continua confirmando estudos e aluno.', 'Mudança: relatório identifica explicitamente a origem do cliente e o comando executado.', 'Registra a saída observada sem senha e sem afirmar que testou a conexão externa.'] },
    summary: [
      'Servidor e cliente são componentes diferentes.',
      'Cliente no computador: 127.0.0.1:55432; serviço na rede Compose: db:5432.',
      'Verifique o destino com SELECT current_database(), current_user; e \\conninfo.',
      'Nunca registre a senha; preserve o volume durante diagnósticos.'
    ]
  }
});

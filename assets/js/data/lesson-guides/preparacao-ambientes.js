'use strict';

// Preparações de ambiente. A fábrica mantém o mesmo contrato pedagógico entre ferramentas.
(() => {
  function criarGuiaInstalacao(config) {
    const comandoPrincipal = config.commands.split('\n')[0];
    return {
      prerequisites: 'Conclua prep-workspace, prep-cycle e prep-errors. Use uma conta com permissão para instalar programas ou peça apoio ao responsável pelo computador.',
      setup: `Objetivo: ${config.objective} Requisitos: internet para baixar pela fonte oficial, espaço disponível e permissão de instalação. Windows: ${config.windows} macOS: ${config.macos} Linux: ${config.linux} Verificação: abra um terminal novo e execute ${config.commands.replaceAll('\n', '; ')}. Resultado esperado: ${config.expected} Problema comum: “comando não encontrado” normalmente indica terminal antigo, instalação incompleta ou PATH não atualizado; feche e abra o terminal antes de alterar configurações. Como parar e retomar: conclua o instalador, feche-o e guarde o relatório de versão; na retomada, repita a verificação antes de avançar. Alternativa leve: ${config.alternative}`,
      why: config.why,
      sections: [
        { title: 'Escolha a fonte e o caminho do seu sistema', paragraphs: [config.windows, config.macos, config.linux, 'Baixe somente da fonte oficial indicada em Fontes. Não copie comandos de instalação destinados a outra distribuição ou sistema.'] },
        { title: 'Verifique em um terminal novo', paragraphs: [`Execute os comandos ${config.commands.replaceAll('\n', ' e ')}. Compare a saída real com o padrão esperado: ${config.expected}`, 'Uma versão impressa comprova que o comando foi encontrado; não comprova domínio da ferramenta. Registre comando e saída para poder reproduzir o ambiente.'] },
        { title: 'Diagnostique sem reinstalar às cegas', paragraphs: [`Se ${comandoPrincipal} não for reconhecido, confirme que o instalador terminou, abra um terminal novo e procure o executável pelo menu do sistema. ${config.diagnostic}`, `Para retomar outro dia, abra a pasta estudos-programacao, execute novamente ${comandoPrincipal} e só então continue. ${config.alternative}`] }
      ],
      example: {
        language: 'Terminal',
        code: config.commands,
        explanation: ['Cada comando é digitado no terminal, não dentro de um arquivo.', 'A versão exata varia; compare o formato e confirme que não apareceu erro.', config.distinction],
        expected: config.expected
      },
      guided: [
        { instruction: 'Abra um terminal novo depois da instalação e confirme a pasta atual.', result: 'O terminal está em uma pasta conhecida e aceita comandos.' },
        { instruction: `Execute ${comandoPrincipal} e copie a saída real para seu relatório.`, result: config.expected },
        { instruction: config.testInstruction, result: config.testResult }
      ],
      exercises: [
        { prompt: `Prever: o que deve acontecer ao executar ${comandoPrincipal} antes de a instalação estar disponível?`, hints: ['Diferencie erro de comando ausente de erro no seu código.'], solution: 'O shell informa que o comando não foi encontrado ou não é reconhecido.', explanation: 'Nesse ponto, editar um programa não corrige a disponibilidade da ferramenta.', expected: 'A previsão menciona o shell e a ausência do executável.' },
        { prompt: 'Alterar: feche o terminal usado durante a instalação, abra outro e repita a verificação. Registre o que mudou.', hints: ['Instaladores frequentemente atualizam o PATH apenas para novos processos.'], solution: `Novo terminal aberto; comando executado: ${comandoPrincipal}; saída: copie a versão real.`, explanation: 'Não invente uma versão e não altere PATH antes desse teste.', expected: 'O relatório separa terminal antigo e novo.' },
        { prompt: `Construir: crie um relatório com sistema, fonte usada, comando, saída e resultado do teste mínimo de ${config.name}.`, hints: ['Não inclua senhas, tokens ou dados pessoais.'], solution: `Ferramenta: ${config.name}\nSistema: preencha\nFonte: oficial\nComando: ${comandoPrincipal}\nSaída: copie a real\nTeste mínimo: executado`, explanation: 'O relatório permite retomar e pedir ajuda com contexto.', expected: 'Cinco campos preenchidos com evidência real.' },
        { prompt: `Investigar erro: ${config.errorScenario}`, hints: ['Comece por comando, terminal, pasta e PATH.', config.errorHint], solution: config.errorSolution, explanation: 'A correção segue evidências e preserva o ambiente existente.', expected: 'A investigação tem ordem e critério de sucesso.' }
      ],
      mistakes: [
        'Executar no lugar errado: comandos pertencem ao terminal; conteúdo do programa pertence ao arquivo.',
        'Copiar uma versão esperada como se fosse observada: registre a saída real.',
        'Misturar instruções de sistemas diferentes: siga somente a seção do seu sistema.',
        config.commonMistake
      ],
      quiz: [
        { question: 'Quando abrir um terminal novo depois da instalação?', options: ['Antes de verificar o comando', 'Somente após apagar arquivos', 'Nunca'], correctIndex: 0, explanation: 'O novo processo recebe as alterações de ambiente feitas pelo instalador.' },
        { question: 'Uma versão impressa prova domínio da ferramenta?', options: ['Sim', 'Não; prova apenas que o comando foi encontrado', 'Prova publicação na internet'], correctIndex: 1, explanation: 'Capacidade exige executar tarefas novas, não apenas mostrar versão.' },
        { question: config.quizQuestion, options: config.quizOptions, correctIndex: config.quizCorrect, explanation: config.quizExplanation }
      ],
      summary: [`${config.name} deve ser obtido por fonte oficial e verificado em terminal novo.`, 'PATH é investigado depois de conferir instalação e reiniciar o terminal.', config.distinction]
    };
  }

  Object.assign(LESSON_GUIDES, {
    'setup-editor': criarGuiaInstalacao({
      name: 'VS Code',
      objective: 'instalar ou escolher um editor e abrir a pasta de estudos.',
      windows: 'Use o instalador User Setup do VS Code; conclua a instalação e abra o aplicativo pelo menu.',
      macos: 'Baixe o arquivo .dmg oficial, arraste o aplicativo para Applications e abra-o; o comando code pode ser instalado depois pela Command Palette.',
      linux: 'Use o pacote indicado para sua distribuição na documentação oficial; se não puder instalar, use o editor já disponível.',
      commands: 'code --version',
      expected: 'uma ou mais linhas de versão, sem mensagem de comando desconhecido; o editor também deve abrir a pasta estudos-programacao.',
      alternative: 'use um editor de texto simples ou vscode.dev para editar; a versão web não substitui terminal nem runtimes locais.',
      why: 'Abrir uma pasta inteira mantém arquivos, terminal e ferramentas no mesmo contexto. Conta e extensões não são necessárias para começar.',
      diagnostic: 'No macOS, instale o comando code pela Command Palette se desejar usá-lo; a interface pode funcionar mesmo sem esse comando.',
      distinction: 'O editor modifica arquivos; ele não instala Python, Git ou Node.js automaticamente.',
      testInstruction: 'Abra estudos-programacao pelo menu Arquivo → Abrir Pasta, crie ambiente-editor.txt e salve.',
      testResult: 'O arquivo aparece no Explorador do editor e continua presente após reabrir a pasta.',
      errorScenario: 'o editor abre normalmente, mas code --version falha.',
      errorHint: 'A interface e o comando de terminal são verificações diferentes.',
      errorSolution: 'Continue usando a interface; depois siga a configuração oficial do comando code para o sistema e teste em terminal novo.',
      commonMistake: 'Instalar extensões aleatórias antes de precisar delas: comece com o editor limpo.',
      quizQuestion: 'A versão web do editor substitui Python e terminal locais?',
      quizOptions: ['Sim', 'Não', 'Somente no Windows'],
      quizCorrect: 1,
      quizExplanation: 'Ela edita arquivos, mas não fornece automaticamente os runtimes locais do curso.'
    }),
    'setup-python': criarGuiaInstalacao({
      name: 'Python 3',
      objective: 'instalar Python 3 e descobrir qual comando inicia o runtime.',
      windows: 'Use a opção oficial indicada em python.org para Windows. Após instalar, teste primeiro py --version e depois python --version.',
      macos: 'Use o instalador oficial para macOS e verifique com python3 --version em um terminal novo.',
      linux: 'Prefira o pacote Python 3 da sua distribuição; não substitua o Python do sistema compilando outra versão sem necessidade.',
      commands: 'py --version\npython --version\npython3 --version',
      expected: 'pelo menos um comando mostra Python 3.x.y; comandos alternativos podem não existir e isso deve ser registrado.',
      alternative: 'use um ambiente educacional no navegador apenas para os primeiros scripts; arquivos, pacotes e terminal podem se comportar de forma diferente.',
      why: 'A trilha executa arquivos .py e laboratórios com SQLite. Identificar o comando real evita copiar instruções incompatíveis.',
      diagnostic: 'No Windows, não confunda atalhos da loja com uma instalação funcional; no macOS/Linux, python pode não apontar para Python 3.',
      distinction: 'Python executa arquivos .py; o editor apenas os salva.',
      testInstruction: 'Crie verificar_python.py com print("ambiente pronto") e execute usando o comando Python 3 reconhecido.',
      testResult: 'O terminal imprime ambiente pronto e retorna ao prompt.',
      errorScenario: 'python falha, mas python3 --version mostra Python 3.x.y.',
      errorHint: 'Use o comando que seu sistema realmente reconhece.',
      errorSolution: 'Execute os exemplos com python3 e registre essa escolha; não crie atalhos ou altere o Python do sistema sem necessidade.',
      commonMistake: 'Nomear um arquivo python.py ou usar >>> dentro do arquivo: evite esconder módulos e prompts do REPL.',
      quizQuestion: 'Qual saída confirma a família correta?',
      quizOptions: ['Python 3.x.y', 'Um ícone no editor', 'A página inicial do navegador'],
      quizCorrect: 0,
      quizExplanation: 'A versão observada no terminal confirma o runtime encontrado.'
    }),
    'setup-git': criarGuiaInstalacao({
      name: 'Git',
      objective: 'instalar Git, criar um repositório local de laboratório e diferenciá-lo de um serviço remoto.',
      windows: 'Use o instalador oficial Git for Windows e mantenha uma opção que disponibilize Git ao terminal; abra um terminal novo ao terminar.',
      macos: 'Execute git --version; se o sistema oferecer as Command Line Tools, conclua a instalação, ou use o instalador oficial indicado pelo Git.',
      linux: 'Instale Git pelo gerenciador da sua distribuição, como apt ou dnf, seguindo a documentação oficial da distribuição.',
      commands: 'git --version',
      expected: 'git version 2.x.y ou outra versão 2 recente; no laboratório, git status identifica um repositório ainda sem commits.',
      alternative: 'estude o conceito e registre comandos em um arquivo; hospedagem web não substitui o Git local para os laboratórios.',
      why: 'Git registra versões no computador. GitHub e outros serviços remotos são separados; instalar Git não cria conta nem envia arquivos.',
      diagnostic: 'Se o menu mostra Git Bash mas o terminal integrado não reconhece git, abra um terminal novo e confira o shell selecionado.',
      distinction: 'Git é a ferramenta local; GitHub é um serviço remoto opcional.',
      testInstruction: 'Crie a pasta laboratorio-git, entre nela, execute git init e depois git status. Não use uma pasta pessoal ou que já contenha outro projeto.',
      testResult: 'Git informa que inicializou o repositório e git status mostra a branch atual, ainda sem commits.',
      errorScenario: 'git funciona no Git Bash, mas não no terminal já aberto do editor.',
      errorHint: 'Compare shell e momento em que o terminal foi aberto.',
      errorSolution: 'Feche o terminal integrado, abra outro e repita git --version; só depois confira a configuração de PATH do instalador.',
      commonMistake: 'Executar git init na pasta pessoal: sempre confirme a pasta laboratorio-git antes de inicializar.',
      quizQuestion: 'Instalar Git publica arquivos automaticamente?',
      quizOptions: ['Sim', 'Não', 'Somente arquivos HTML'],
      quizCorrect: 1,
      quizExplanation: 'Publicação exige configurar um remoto e executar ações adicionais.'
    }),
    'setup-node': criarGuiaInstalacao({
      name: 'Node.js e npm',
      objective: 'instalar a linha LTS e verificar runtime e gerenciador de pacotes separadamente.',
      windows: 'Baixe o instalador LTS oficial para Windows, conclua-o e abra um terminal novo.',
      macos: 'Use o instalador LTS oficial para macOS ou um gerenciador de versões já adotado por você; não misture métodos na primeira instalação.',
      linux: 'Siga a opção oficial adequada à distribuição ou um gerenciador de versões documentado; evite pacotes antigos de fontes desconhecidas.',
      commands: 'node --version\nnpm --version',
      expected: 'node mostra vX.Y.Z e npm mostra X.Y.Z; ambos precisam responder.',
      alternative: 'use o console do navegador para JavaScript básico; testes, pacotes e servidores Node.js continuarão bloqueados até a instalação local.',
      why: 'Qualidade e Entrega usam Node.js para executar JavaScript fora do navegador e npm para gerenciar scripts e pacotes.',
      diagnostic: 'Node funcionar não garante que npm esteja disponível; verifique os dois comandos e registre cada saída.',
      distinction: 'O navegador e Node.js executam JavaScript em ambientes diferentes; APIs como document não existem automaticamente no Node.js.',
      testInstruction: 'Crie verificar_node.js com console.log("ambiente pronto") e execute node verificar_node.js.',
      testResult: 'O terminal imprime ambiente pronto e retorna ao prompt.',
      errorScenario: 'node --version funciona, mas npm --version falha.',
      errorHint: 'Trate Node e npm como verificações separadas.',
      errorSolution: 'Abra terminal novo, confira a instalação LTS oficial e repare ou reinstale pelo mesmo método; não baixe um npm avulso de fonte desconhecida.',
      commonMistake: 'Tentar usar document no Node.js como se estivesse no navegador: identifique o ambiente do exemplo.',
      quizQuestion: 'Qual comando verifica o gerenciador de pacotes?',
      quizOptions: ['node --version', 'npm --version', 'document.version'],
      quizCorrect: 1,
      quizExplanation: 'Node e npm possuem comandos de versão separados.'
    })
  });
})();

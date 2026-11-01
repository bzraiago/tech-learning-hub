'use strict';

// Preparações de ambiente. A fábrica mantém o mesmo contrato pedagógico entre ferramentas.
(() => {
  function criarGuiaInstalacao(config) {
    const comandoPrincipal = config.commands.split('\n')[0];
    return {
      prerequisites: 'Conclua A mesma pasta no editor e no terminal, Salvar, executar, observar e encerrar e Ler e registrar um erro com contexto. Use uma conta com permissão para instalar programas ou peça apoio ao responsável pelo computador.',
      setup: config.setup || [
        `Objetivo: ${config.objective}`,
        'Requisitos: internet para baixar pela fonte oficial, espaço disponível e permissão de instalação.',
        `Windows: ${config.windows}`,
        `macOS: ${config.macos}`,
        `Linux: ${config.linux}`,
        `Verificação: abra um terminal novo e execute ${config.commands.replaceAll('\n', '; ')}.`,
        `Resultado esperado: ${config.expected}`,
        'Problema comum: “comando não encontrado” normalmente indica terminal antigo, instalação incompleta ou PATH não atualizado; feche e abra o terminal antes de alterar configurações.',
        'Como parar e retomar: conclua o instalador, feche-o e guarde o relatório de versão; na retomada, repita a verificação antes de avançar.',
        `Alternativa leve: ${config.alternative}`
      ].join('\n'),
      why: config.why,
      sections: [
        { title: 'Escolha a fonte e o caminho do seu sistema', paragraphs: [config.windows, config.macos, config.linux, 'Baixe somente da fonte oficial indicada em Fontes. Não copie comandos de instalação destinados a outra distribuição ou sistema.'] },
        { title: 'Verifique em um terminal novo', paragraphs: [`Execute os comandos ${config.commands.replaceAll('\n', ' e ')}. Compare a saída real com o padrão esperado: ${config.expected}`, 'Uma versão impressa comprova que o comando foi encontrado; não comprova domínio da ferramenta. Registre comando e saída para poder reproduzir o ambiente.'] },
        { title: 'Diagnostique sem reinstalar às cegas', paragraphs: [`Se ${comandoPrincipal} não for reconhecido, confirme que o instalador terminou, abra um terminal novo e procure o executável pelo menu do sistema. ${config.diagnostic}`, `Para retomar outro dia, abra a pasta estudos-programacao, execute novamente ${comandoPrincipal} e só então continue. ${config.alternative}`] }
      ],
      example: {
        language: 'Terminal',
        code: config.commands,
        blocks: config.blocks,
        explanation: ['Cada comando é digitado no terminal, não dentro de um arquivo.', 'A versão exata varia; compare o formato e confirme que não apareceu erro.', config.distinction],
        expected: config.expected
      },
      guided: [
        { instruction: 'Abra um terminal novo depois da instalação e confirme a pasta atual.', result: 'O terminal está em uma pasta conhecida e aceita comandos.' },
        { instruction: `Execute ${comandoPrincipal} e copie a saída real para seu relatório.`, result: config.expected },
        { instruction: config.testInstruction, result: config.testResult }
      ],
      exercises: [
        { prompt: `Prever: o que deve acontecer ao executar ${comandoPrincipal} antes de a instalação estar disponível?`, hints: ['Diferencie erro de comando ausente de erro no seu código.'], solution: 'O shell informa que o comando não foi encontrado ou não é reconhecido.', explanation: 'Nesse ponto, editar um programa não corrige a disponibilidade da ferramenta.', expected: 'A previsão identifica a camada que pode responder ao comando e descreve um sinal que permitiria conferir a hipótese.', criteria: ['Descreve uma resposta observável do ambiente ao tentar iniciar a ferramenta.', 'Distingue a disponibilidade do comando da execução do código de um programa.'] },
        { prompt: 'Alterar: feche o terminal usado durante a instalação, abra outro e repita a verificação. Registre o que mudou.', hints: ['Instaladores frequentemente atualizam o PATH apenas para novos processos.'], solution: `Novo terminal aberto; comando executado: ${comandoPrincipal}; saída: copie a versão real.`, explanation: 'Não invente uma versão e não altere PATH antes desse teste.', expected: 'O relatório diferencia o que foi observado em cada terminal.', criteria: ['Registra separadamente a verificação no terminal anterior e no novo.', 'Baseia a comparação nas saídas reais, sem presumir que os resultados serão iguais ou diferentes.'] },
        { prompt: `Construir: crie um relatório com sistema, fonte usada, comando, saída e resultado do teste mínimo de ${config.name}.`, hints: ['Não inclua senhas, tokens ou dados pessoais.'], solution: `Ferramenta: ${config.name}\nSistema: preencha\nFonte: oficial\nComando: ${comandoPrincipal}\nSaída: copie a real\nTeste mínimo: executado`, explanation: 'O relatório permite retomar e pedir ajuda com contexto.', expected: 'O relatório contém os campos solicitados e usa evidências observadas.', criteria: ['Inclui ferramenta ou sistema, origem, comando, saída e verificação mínima.', 'Registra resultados reais e identifica uma verificação ainda não executada em vez de presumir sucesso.'] },
        { prompt: `Investigar erro: ${config.errorScenario}`, hints: ['Comece por comando, terminal, pasta e PATH.', config.errorHint], solution: config.errorSolution, explanation: 'A correção segue evidências e preserva o ambiente existente.', expected: 'A investigação apresenta verificações em ordem e um sinal observável para avaliar o diagnóstico.', criteria: ['Propõe verificações não destrutivas antes de reinstalar ou editar configurações.', 'Relaciona cada verificação a uma hipótese sobre o cenário descrito.', 'Define qual resultado observado permitirá decidir o próximo passo.'] }
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
      retry: config.retry,
      summary: [`${config.name} deve ser obtido por fonte oficial e verificado em terminal novo.`, 'PATH é investigado depois de conferir instalação e reiniciar o terminal.', config.distinction]
    };
  }

  Object.assign(LESSON_GUIDES, {
    'setup-editor': criarGuiaInstalacao({
      name: 'VS Code',
      retry: { prompt: 'Você está em um computador emprestado sem permissão para instalar VS Code. Descreva como criar e salvar uma página HTML com um editor de texto já disponível, abri-la no navegador e registrar quais tarefas futuras ainda exigirão terminal ou runtime local.', expected: 'O plano produz um arquivo .html verificável no navegador e distingue a alternativa de edição das ferramentas locais ainda pendentes.', hint: 'Para uma página HTML simples, um editor de texto e um navegador já permitem começar.' },
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
      retry: { prompt: 'Você praticou um script Python em um ambiente educacional no navegador e agora precisa usar um arquivo SQLite local. Explique quais resultados já observou, qual verificação de Python 3 precisa fazer no computador e por que a prática no navegador não comprova o ambiente local.', expected: 'A resposta separa execução no navegador de runtime e arquivos locais e registra a verificação ainda pendente, sem inventar uma versão.', hint: 'Observe onde o código foi executado e onde o arquivo de banco precisará existir.' },
      objective: 'instalar Python 3 e descobrir qual comando inicia o runtime.',
      windows: 'Primeiro abra um PowerShell novo no VS Code e execute python --version. Se a saída começar com Python 3, use python nos próximos passos e não instale outra cópia. Se python não for reconhecido, tente py --version; use py somente se a saída começar com Python 3. Instale Python apenas se nenhum dos dois comandos funcionar.',
      macos: 'No navegador, baixe o instalador oficial de Python 3 para macOS. Conclua o instalador, abra um Terminal novo e verifique com python3 --version.',
      linux: 'Use a documentação oficial da sua distribuição para instalar o pacote Python 3. Abra um Terminal novo e verifique com python3 --version; não substitua o Python do sistema compilando outra versão sem necessidade.',
      commands: 'python --version\npy --version',
      setup: [
        'Objetivo: instalar Python 3 no computador e confirmar que um arquivo .py pode ser executado localmente.',
        'Requisitos: acesso à internet, permissão para instalar e uma pasta de estudos aberta no VS Code.',
        'Windows: verificação inicial — abra o VS Code, escolha Terminal > Novo Terminal e use PowerShell. Execute python --version. Se a saída começar com Python 3, anote a versão e pule a instalação.',
        'Windows: comando alternativo — somente se python não for reconhecido, execute py --version. Se a saída começar com Python 3, anote a versão e use py nos exemplos. Se aparecer “No installed Python found!”, esse comando não encontrou um runtime; ainda tente python --version antes de instalar.',
        'Windows: instalação, somente se os comandos anteriores não encontrarem Python 3 — no navegador, abra Python Releases for Windows e instale Python Install Manager pela Microsoft Store ou pelo instalador MSIX oficial. Depois, em um PowerShell novo, execute py install default e confirme com py --version.',
        'Verificação: pelo menos um comando do Windows, python --version ou py --version, precisa mostrar Python 3.x.x. Anote qual comando funcionou e use esse mesmo comando para executar arquivos.',
        'macOS: no navegador, instale o pacote oficial Python 3 para macOS. Depois abra um Terminal novo e execute python3 --version; a saída precisa começar com Python 3.',
        'Linux: instale Python 3 pelo procedimento da sua distribuição. Depois abra um Terminal novo e execute python3 --version; a saída precisa começar com Python 3.',
        'Resultado esperado: o comando do seu sistema imprime Python 3.x.x. No Windows, python pode funcionar mesmo quando py mostra “No installed Python found!”; use o comando que passou na verificação.',
        'Problema comum: “No installed Python found!” após py --version significa que o launcher py não encontrou runtime. Tente python --version. Se esse comando mostrar Python 3.x.x, use python e não reinstale. Se nenhum funcionar, instale Python Install Manager pela fonte oficial, abra um PowerShell novo, execute py install default e verifique novamente.',
        'Como parar e retomar: o instalador pode ser fechado após concluir. Para retomar, abra um terminal novo e repita somente o comando de versão do seu sistema.',
        'Alternativa leve: um interpretador educacional no navegador permite experimentar os primeiros comandos, mas não substitui Python instalado para executar sqlite_alternativa.py e criar o banco local.'
      ].join('\n'),
      blocks: [
        { label: 'Windows — PowerShell no VS Code: tente primeiro o comando Python', code: 'python --version' },
        { label: 'Windows — PowerShell no VS Code: tente somente se python não for reconhecido', code: 'py --version' },
        { label: 'Windows — PowerShell: instalar runtime apenas se nenhum comando encontrou Python 3', code: 'py install default' },
        { label: 'macOS — Terminal: confirme o runtime instalado', code: 'python3 --version' },
        { label: 'Linux — Terminal: confirme o runtime instalado', code: 'python3 --version' }
      ],
      expected: 'pelo menos um comando mostra Python 3.x.y; no Windows, registre qual funcionou e use esse comando nos próximos arquivos.',
      alternative: 'use um ambiente educacional no navegador apenas para os primeiros scripts; arquivos, pacotes e terminal podem se comportar de forma diferente.',
      why: 'A trilha executa arquivos .py e laboratórios com SQLite. Identificar o comando real evita copiar instruções incompatíveis.',
      diagnostic: 'No Windows, python pode funcionar quando py não encontra runtime. No macOS/Linux, use a verificação python3.',
      distinction: 'Python executa arquivos .py; o editor apenas os salva.',
      testInstruction: 'No VS Code, abra a pasta estudos-programacao e crie verificar_python.py com print("ambiente pronto"). Salve. No terminal aberto nessa pasta, execute o comando do Windows que mostrou Python 3 na verificação (python verificar_python.py ou py verificar_python.py); no macOS/Linux, execute python3 verificar_python.py.',
      testResult: 'O terminal imprime ambiente pronto e retorna ao prompt.',
      errorScenario: 'No Windows, py --version mostra “No installed Python found!”, mas você ainda não verificou se python --version encontra Python 3.',
      errorHint: 'Use o comando que seu sistema realmente reconhece.',
      errorSolution: 'No PowerShell, execute python --version. Se mostrar Python 3.x.x, use python para executar os arquivos e não reinstale. Se não for reconhecido, instale Python Install Manager pela fonte oficial, abra um PowerShell novo, execute py install default e confirme com py --version.',
      commonMistake: 'Nomear um arquivo python.py ou usar >>> dentro do arquivo: evite esconder módulos e prompts do REPL.',
      quizQuestion: 'Qual saída confirma a família correta?',
      quizOptions: ['Python 3.x.y', 'Um ícone no editor', 'A página inicial do navegador'],
      quizCorrect: 0,
      quizExplanation: 'A versão observada no terminal confirma o runtime encontrado.'
    }),
    'setup-git': criarGuiaInstalacao({
      name: 'Git',
      retry: { prompt: 'Uma colega executou `git init` em um projeto de aula e afirmou que seus arquivos já estão publicados no GitHub. Descreva duas evidências locais que pode conferir e o que ainda seria necessário para demonstrar publicação remota, sem pedir acesso à conta dela.', expected: 'A resposta distingue repositório e histórico local de serviço remoto e não afirma publicação apenas por causa de git init.', hint: 'Instalar e inicializar Git não criam automaticamente um remoto.' },
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
      retry: { prompt: 'Um script que altera `document.body` funciona no console do navegador, mas mostra `document is not defined` quando executado com Node.js. Explique qual ambiente oferece document e proponha um teste mínimo de JavaScript que possa rodar em Node sem instalar pacote novo.', expected: 'A resposta identifica DOM como API do navegador e propõe um teste Node simples, como console.log, sem tratar o erro como falha da instalação.', hint: 'A linguagem é a mesma; as APIs disponíveis mudam conforme o ambiente.' },
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

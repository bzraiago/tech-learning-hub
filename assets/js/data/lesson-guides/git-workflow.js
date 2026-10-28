'use strict';

// Guias detalhados da trilha Git & Colaboração.
Object.assign(LESSON_GUIDES, {
"git-start": {
    "prerequisites": "Saber criar um arquivo de texto. Não é necessário conhecer Git ou serviços de hospedagem.",
    "setup": "Instale Git e confirme git --version. Abra PowerShell em uma pasta de estudo que você pode alterar livremente; os comandos de criação de arquivo abaixo são de PowerShell. Em macOS/Linux, crie os mesmos arquivos no editor e use os comandos git sem alteração. Execute uma linha por vez. Não rode git init na sua pasta pessoal nem em um projeto alheio. Identidade de exemplo usa domínio .invalid para evitar divulgar endereço real.",
    "why": "Um projeto muda ao longo do tempo. Git registra versões selecionadas para que você entenda o que mudou, recupere um estado e trabalhe com outras pessoas. Antes de publicar, o iniciante precisa dominar três lugares: os arquivos atuais, uma lista do que entrará no próximo registro e o histórico de registros locais.",
    "sections": [
      {
        "title": "Localize o projeto antes de agir",
        "paragraphs": [
          "No terminal, a pasta atual determina onde os comandos atuam. Em PowerShell, Get-Location mostra o caminho; Get-ChildItem lista arquivos e Set-Location agenda-lab entra na pasta. Se você vir um caminho diferente do esperado, pare e navegue para a pasta de estudo. Cada projeto deve ter uma pasta própria. Um arquivo README.md descreve o projeto; index.html pode conter a interface. Ambos são arquivos comuns antes de serem versionados.",
          "git --version confirma que o programa está disponível. git init -b main cria a pasta oculta .git e inicia o histórico vazio com o branch chamado main. Ele não cria cópia na internet e não publica arquivos. A pasta .git guarda metadados e objetos; não a edite manualmente. Se git init reclamar de repositório existente, confirme com git rev-parse --show-toplevel onde fica a raiz. Treine sempre em uma pasta descartável."
        ]
      },
      {
        "title": "Entenda os três estados observáveis",
        "paragraphs": [
          "Após criar README.md, git status --short mostra ?? README.md: arquivo ainda não rastreado. git add README.md coloca uma versão dele na área de preparação, também chamada index ou staging area; agora o status curto mostra A  README.md. Se você editar novamente o mesmo arquivo depois de git add, verá duas mudanças: uma preparada e outra ainda não. O Git não adiciona automaticamente cada alteração posterior.",
          "git diff mostra alterações não preparadas. git diff --staged mostra exatamente o que o próximo commit registrará. Rode ambos antes de confirmar. git commit -m \"docs: inicia agenda\" cria um commit a partir da área preparada, com autor, data, mensagem e referência aos arquivos. A mensagem deve explicar a intenção da mudança. git log --oneline -1 mostra o novo registro; o identificador muda a cada execução e não deve ser copiado de uma apostila."
        ]
      },
      {
        "title": "Configure identidade e escolha arquivos",
        "paragraphs": [
          "git config user.name \"Aluno Exemplo\" e git config user.email \"aluno@example.invalid\" configuram a identidade apenas neste repositório. A opção --global atuaria em todos os seus repositórios; neste laboratório evitamos alterar o restante do computador. Use git config --local --list para conferir. Essa identidade não é uma conta de hospedagem e não autentica um push. Um nome e um e-mail são gravados nos commits; em trabalho real escolha os dados e a privacidade de acordo com a equipe.",
          "git add . prepara tudo sob a pasta atual. É cômodo, mas pode incluir arquivos temporários, tokens ou .env; prefira nomes explícitos enquanto aprende. Um .gitignore na raiz declara padrões que não devem ser adicionados quando ainda não são rastreados; ele não remove segredos já registrados. Crie .gitignore antes de versionar artefatos. Nunca coloque senha ou token em código, commit ou README. Se isso acontecer, trate o segredo como exposto e substitua-o; apagar uma linha no commit seguinte não apaga o histórico."
        ]
      },
      {
        "title": "Leia o estado como uma pergunta",
        "paragraphs": [
          "Antes de cada comando, pergunte: onde estou, qual arquivo mudou, o que está preparado e qual histórico existe? git status traz essas respostas com mais palavras que a forma --short. Um status limpo significa que não há mudanças locais detectadas em relação ao último commit; não significa que o projeto foi testado, publicado ou revisado. Confundir essas etapas é uma fonte comum de entregas incompletas.",
          "Este primeiro laboratório é inteiramente local e funciona sem conta ou rede. Registre no caderno o caminho retornado por Get-Location, a saída de status antes e depois do add e a primeira linha de log. Compare as transições, não o hash exato. Nos próximos encontros você usará esses mesmos comandos para investigar mudanças e criar branches sem perder o rumo."
        ]
      }
    ],
    "example": {
      "language": "PowerShell",
      "code": "# PowerShell, em uma pasta de estudo descartável\nNew-Item -ItemType Directory agenda-lab\nSet-Location agenda-lab\ngit init -b main\ngit config user.name \"Aluno Exemplo\"\ngit config user.email \"aluno@example.invalid\"\nSet-Content README.md \"# Agenda de estudos\"\ngit status --short\ngit add README.md\ngit status --short\ngit commit -m \"docs: inicia agenda de estudos\"\ngit log --oneline -1",
      "explanation": [
        "New-Item cria a pasta de treino e Set-Location entra nela; adapte apenas esse caminho.",
        "A identidade local torna o commit possível sem alterar configuração global.",
        "A sequência status → add → status torna visível a passagem do arquivo para staging."
      ],
      "expected": "Antes do add: ?? README.md. Depois: A  README.md. Depois do commit: working tree clean; log com uma linha contendo docs: inicia agenda de estudos."
    },
    "guided": [
      {
        "instruction": "Execute Get-Location antes e depois de Set-Location.",
        "result": "O segundo caminho termina em agenda-lab."
      },
      {
        "instruction": "Adicione index.html no editor sem prepará-lo e execute git status --short.",
        "result": "index.html aparece com ?? enquanto README.md permanece registrado."
      },
      {
        "instruction": "Edite README.md, execute git diff e depois git add README.md; compare git diff --staged.",
        "result": "O primeiro diff deixa de mostrar essa edição; o staged mostra o texto que entrará no próximo commit."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: crie notas.txt na pasta e descubra seu status sem adicioná-lo.",
        "hints": [
          "Use Set-Content notas.txt \"Primeira nota\" no PowerShell.",
          "A saída curta usa ?? para arquivo não rastreado."
        ],
        "solution": "Set-Content notas.txt \"Primeira nota\"\ngit status --short",
        "explanation": "A criação do arquivo altera a pasta de trabalho; Git apenas observa até você escolher adicioná-lo.",
        "expected": "Uma linha ?? notas.txt.",
        "criteria": ["Arquivo novo aparece como não rastreado.","Status é observado sem adicionar o arquivo."]
      },
      {
        "prompt": "Aplicar: prepare somente index.html, preservando notas.txt fora do próximo commit.",
        "hints": [
          "Crie index.html no editor ou com Set-Content.",
          "Passe o caminho específico a git add e confira o status."
        ],
        "solution": "Set-Content index.html \"\u003c!doctype html>\u003ctitle>Agenda\u003c/title>\"\ngit add index.html\ngit status --short\ngit diff --staged -- index.html",
        "explanation": "A distinção entre arquivo preparado e não preparado impede enviar rascunhos por acidente.",
        "expected": "A  index.html; ?? notas.txt. O diff staged contém o HTML.",
        "criteria": ["Somente index.html fica preparado.","Diff staged contém o arquivo solicitado e notas.txt continua fora."]
      },
      {
        "prompt": "Construir: faça um commit apenas de index.html e escreva evidências de que notas.txt continua fora do histórico.",
        "hints": [
          "Verifique git diff --staged antes de confirmar.",
          "Depois use git show --stat HEAD e git status --short."
        ],
        "solution": "git diff --staged\ngit commit -m \"feat: adiciona pagina inicial\"\ngit show --stat HEAD\ngit status --short",
        "explanation": "O commit é um conjunto selecionado de mudanças. O arquivo não rastreado continua na pasta, mas não integra esse snapshot.",
        "expected": "git show lista index.html; status ainda lista ?? notas.txt.",
        "criteria": ["Commit inclui só index.html.","git show e status demonstram que notas.txt não entrou no histórico."]
      },
      {
        "prompt": "Diagnosticar: alguém executou git init fora da pasta esperada. Encontre a raiz antes de criar arquivos ou remover algo.",
        "hints": [
          "Use Get-Location para ver o caminho atual.",
          "git rev-parse --show-toplevel identifica a raiz do repositório."
        ],
        "solution": "Get-Location\ngit rev-parse --show-toplevel\ngit status --short",
        "explanation": "Confirmar contexto evita operar no projeto errado. Nesta atividade não remova .git; apenas navegue para o laboratório correto.",
        "expected": "Você consegue registrar dois caminhos e explicar se eles pertencem ao mesmo projeto.",
        "criteria": ["Compara a pasta atual e raiz do repositório antes de criar ou remover.","Registra evidências dos dois caminhos sem operação destrutiva."]
      }
    ],
    "mistakes": [
      "Executar git add . sem examinar arquivos pode preparar segredos e artefatos.",
      "Confundir nome/e-mail do commit com login em servidor remoto.",
      "Usar git status limpo como prova de que o programa funciona."
    ],
    "quiz": [
      {
        "question": "Depois de editar um arquivo e antes de git add, onde está a alteração?",
        "options": [
          "Apenas no servidor remoto",
          "Na pasta de trabalho",
          "Somente no último commit"
        ],
        "correctIndex": 1,
        "explanation": "git add ainda não selecionou a versão para o próximo commit."
      },
      {
        "question": "Qual comando mostra o conteúdo preparado para o próximo commit?",
        "options": [
          "git diff --staged",
          "git log --oneline",
          "git --version"
        ],
        "correctIndex": 0,
        "explanation": "O diff staged compara a área preparada com o último registro."
      },
      {
        "question": "git init -b main publica o projeto?",
        "options": [
          "Sim, cria uma página pública",
          "Sim, faz push automaticamente",
          "Não, cria um repositório local"
        ],
        "correctIndex": 2,
        "explanation": "Publicação e colaboração remota serão etapas posteriores."
      }
    ],
    "summary": [
      "Confirme a pasta antes de alterar o repositório.",
      "Leia status e diff como evidências das mudanças.",
      "Prepare explicitamente o que deve integrar cada commit."
    ]
  },
"git-history": {
    "prerequisites": "Ter concluído o primeiro repositório, com pelo menos um commit. Abra a pasta agenda-lab no terminal.",
    "setup": "Use uma cópia descartável da agenda. Antes de exercícios de descarte, copie o conteúdo importante para fora do laboratório. O exemplo de revert exige pasta limpa; confira git status. Se seu Git abrir um editor para mensagem, use --no-edit no exemplo. Os hashes e a quantidade de commits variam conforme sua prática.",
    "why": "Uma alteração errada não exige apagar a pasta e recomeçar. O histórico é uma sequência de registros com pais; investigar esse histórico ajuda a descobrir o que mudou e a corrigir de forma auditável. A ação correta depende de a alteração estar apenas na pasta, preparada ou já em um commit compartilhado.",
    "sections": [
      {
        "title": "Commits são unidades de intenção",
        "paragraphs": [
          "Cada git commit registra o snapshot selecionado por git add. Prefira um objetivo coerente por commit: corrigir o rótulo do formulário, adicionar validação ou atualizar documentação. Um commit que mistura três assuntos é difícil de rever e reverter. A mensagem descreve o efeito, por exemplo \"fix: corrige foco após adicionar item\". Prefixos como fix: e feat: são convenções úteis, não requisitos do Git.",
          "Antes de confirmar, rode git status e git diff --staged. Depois, git log --oneline mostra sequência resumida; git show HEAD exibe o último commit; git show --stat HEAD resume arquivos e número de linhas. git diff HEAD~1 HEAD compara os dois commits mais recentes, desde que ambos existam. Quando um defeito aparece, procure o primeiro registro relevante e leia o diff; não julgue apenas a mensagem."
        ]
      },
      {
        "title": "Diferencie o que precisa ser desfeito",
        "paragraphs": [
          "Se a edição ainda não foi preparada e você quer descartá-la, git restore -- caminho substitui a versão de trabalho pela versão do index. Esse comando perde a edição não preparada daquele arquivo: confira git diff -- caminho antes. Se a mudança já está staged e você quer tirá-la da seleção sem apagar o arquivo, git restore --staged -- caminho. Depois verifique que ela passou para o diff comum. São operações diferentes sobre lugares diferentes.",
          "Se um commit ruim já foi compartilhado, git revert \u003chash> produz um novo commit que aplica o inverso. A linha antiga continua no histórico, o que preserva rastreabilidade e evita surpreender colegas. git revert HEAD reverte o commit mais recente no branch atual, mas pode pedir resolução de conflito se outras mudanças tocaram as mesmas linhas. Neste laboratório usamos --no-edit e o commit mais recente para manter o caminho verificável."
        ]
      },
      {
        "title": "Reset muda o ponteiro do branch",
        "paragraphs": [
          "git reset --soft HEAD~1 move o branch um commit para trás e deixa as mudanças daquele commit preparadas. git reset --mixed HEAD~1, o padrão, deixa essas mudanças na pasta mas fora de staging. git reset --hard HEAD~1 também substitui os arquivos da pasta por esse estado: trabalho local pode desaparecer. Para começo de carreira, pratique reset apenas em laboratório pessoal e saiba explicar antes qual informação permanecerá.",
          "Depois que outra pessoa recebeu um commit, reescrever o histórico com reset e push forçado rompe a linha que ela tem. Não use push --force em branch compartilhado como solução rápida. Revise o caso com a equipe; normalmente um revert é a correção mais previsível. O reflog pode ajudar a recuperar referências locais perdidas, mas não é plano de backup e pode expirar. Salvar mudanças importantes e confirmar o estado continua essencial."
        ]
      },
      {
        "title": "Use a sequência de investigação",
        "paragraphs": [
          "Um erro de interface surge depois de duas alterações. Primeiro rode git status para evitar misturar investigação com trabalho pendente; em seguida git log --oneline -5, git show \u003chash> e, se necessário, git diff \u003chash1> \u003chash2> -- arquivo. Compare o comportamento esperado com o diff e identifique a linha que mudou. Reverter por reflexo sem entender a causa pode restaurar um defeito antigo ou retirar uma melhoria legítima.",
          "No exemplo, aviso.txt entra em um commit provisório. O revert cria outro commit que remove esse arquivo do snapshot atual; o primeiro commit permanece visível em git log. Um status limpo após o revert diz apenas que o novo estado foi registrado. Rode a aplicação, se houver, para confirmar que o comportamento desejado voltou. Essa verificação conecta versionamento a qualidade, e prepara a futura revisão por pares."
        ]
      }
    ],
    "example": {
      "language": "PowerShell",
      "code": "# Continuando em agenda-lab, com pelo menos um commit\nSet-Content aviso.txt \"Mensagem provisoria\"\ngit add aviso.txt\ngit commit -m \"feat: adiciona aviso provisório\"\ngit log --oneline -3\ngit show --stat HEAD\ngit revert --no-edit HEAD\ngit log --oneline -3\ngit status --short",
      "explanation": [
        "O commit provisório altera só aviso.txt para isolar o exercício.",
        "git show --stat HEAD confirma a mudança antes de revertê-la.",
        "revert cria outro commit; o log não perde o registro anterior."
      ],
      "expected": "O log mostra um commit de revert acima do commit \"feat: adiciona aviso provisório\". aviso.txt deixa de ser rastreado no estado atual e git status termina limpo."
    },
    "guided": [
      {
        "instruction": "Faça outra edição em README.md sem add e observe git diff -- README.md.",
        "result": "O diff mostra a edição não preparada."
      },
      {
        "instruction": "Execute git add README.md e compare git diff -- README.md com git diff --staged -- README.md.",
        "result": "A mudança aparece somente no staged depois do add."
      },
      {
        "instruction": "Retire a mudança de staging com git restore --staged -- README.md.",
        "result": "A edição volta ao diff comum e continua no arquivo."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: retire README.md de staging sem perder a edição.",
        "hints": [
          "Confira primeiro git diff --staged.",
          "Use git restore --staged -- README.md."
        ],
        "solution": "git diff --staged -- README.md\ngit restore --staged -- README.md\ngit diff -- README.md",
        "explanation": "Você alterou a seleção do próximo commit, não o conteúdo que digitou.",
        "expected": "O diff não preparado mostra a edição; o diff staged do arquivo fica vazio.",
        "criteria": ["Arquivo sai da área staged sem descartar a edição.","Diff comum preserva a alteração e diff staged fica vazio."]
      },
      {
        "prompt": "Aplicar: localize em qual commit entrou aviso.txt e mostre apenas sua alteração.",
        "hints": [
          "git log --oneline -- aviso.txt limita a busca ao arquivo.",
          "git show \u003chash> -- aviso.txt mostra o patch; substitua \u003chash>."
        ],
        "solution": "git log --oneline -- aviso.txt\ngit show HEAD~1 -- aviso.txt",
        "explanation": "Na sequência do exemplo, HEAD~1 referencia o commit provisório; se você fez mais commits, use o hash obtido no log.",
        "expected": "O histórico localiza o commit que alterou o arquivo; o diff isolado mostra a alteração e a reversão sem antecipar o texto linha a linha.",
        "criteria": ["Histórico localiza a alteração e exibe somente o diff do arquivo.","A reversão posterior permanece visível no log."]
      },
      {
        "prompt": "Construir: faça dois commits pequenos em arquivos distintos e escreva qual deles reverteria se o segundo causasse um erro.",
        "hints": [
          "Registre um objetivo por commit.",
          "Inspecione git show --stat HEAD antes de git revert."
        ],
        "solution": "Set-Content tema.txt \"claro\"\ngit add tema.txt\ngit commit -m \"feat: registra tema\"\nSet-Content rodape.txt \"temporario\"\ngit add rodape.txt\ngit commit -m \"feat: testa rodape\"\ngit show --stat HEAD\ngit revert --no-edit HEAD",
        "explanation": "O último commit é revertido por um novo registro; o anterior permanece no estado atual.",
        "expected": "tema.txt continua, rodape.txt é removido do snapshot e o log preserva as duas mudanças.",
        "criteria": ["Dois commits afetam arquivos distintos.","Identifica reversão do commit pretendido e verifica os snapshots restantes."]
      },
      {
        "prompt": "Diagnosticar: explique por que git reset --hard HEAD~1 seria inadequado para desfazer um commit já enviado a colegas.",
        "hints": [
          "Compare o efeito no ponteiro do branch com o de revert.",
          "Pense no histórico que outra pessoa já possui."
        ],
        "solution": "git log --oneline -3\n# Para um commit compartilhado, escolha git revert \u003chash>; não execute reset --hard no projeto da equipe.",
        "explanation": "Reset reescreve a ponta local e a forma hard descarta alterações; um push forçado após isso pode desalinhar colegas. Revert mantém histórico e acrescenta correção.",
        "expected": "A justificativa menciona histórico compartilhado, risco de perda local e novo commit de revert.",
        "criteria": ["Explica diferença entre histórico publicado e local.","Justifica revert como novo commit sem apagar alteração não salva."]
      }
    ],
    "mistakes": [
      "Confundir restore --staged com restauração do conteúdo da pasta.",
      "Usar git reset --hard como primeira tentativa sem inspecionar status e diff.",
      "Achar que revert apaga o commit antigo do histórico."
    ],
    "quiz": [
      {
        "question": "Um commit ruim já chegou ao branch compartilhado. Qual ação preserva melhor o histórico?",
        "options": [
          "git revert \u003chash>",
          "git reset --hard e push --force",
          "Apagar a pasta .git"
        ],
        "correctIndex": 0,
        "explanation": "Revert acrescenta um commit corretivo sem retirar os registros existentes."
      },
      {
        "question": "O que git restore --staged -- arquivo faz?",
        "options": [
          "Publica o arquivo",
          "Remove o arquivo da seleção de commit e mantém a edição",
          "Desfaz todos os commits"
        ],
        "correctIndex": 1,
        "explanation": "A alteração volta a aparecer como não preparada."
      },
      {
        "question": "Qual comando inspeciona o último commit em detalhes?",
        "options": [
          "git init",
          "git fetch",
          "git show HEAD"
        ],
        "correctIndex": 2,
        "explanation": "HEAD aponta para o commit atual; show apresenta seu conteúdo."
      }
    ],
    "summary": [
      "Investigue status, log e diff antes de corrigir.",
      "Revert preserve a história compartilhada.",
      "Reset hard tem efeito de descarte; só use conscientemente em contexto isolado."
    ]
  },
"git-branches": {
    "prerequisites": "Ter um repositório local com branch main, pelo menos um commit e pasta de trabalho limpa.",
    "setup": "Trabalhe apenas no laboratório agenda-lab. Confirme git status antes de alternar branch. O fluxo principal é inteiramente local. Para produzir conflito, use um arquivo de uma linha, faça um commit inicial, altere a mesma linha em cada branch e tente o merge. Mantenha uma cópia do texto pretendido para decidir a resolução.",
    "why": "Equipes precisam trabalhar em mudanças distintas sem editar continuamente o mesmo estado. Um branch é um nome móvel para uma linha de commits; ele permite preparar uma alteração e compará-la com main. O merge combina histórias. Quando duas mudanças concorrentes tocam a mesma parte de um arquivo, o Git exige uma decisão humana.",
    "sections": [
      {
        "title": "Branch é referência, não cópia completa",
        "paragraphs": [
          "git branch lista branches locais e marca com * o atual. git switch -c feature/saudacao cria um branch a partir do commit atual e passa a usá-lo. O novo branch começa com o mesmo conteúdo de main; os commits posteriores caminham separadamente. Nomes como feature/saudacao descrevem propósito, mas não criam pastas. git switch main volta à outra linha; verifique status e conteúdo dos arquivos para confirmar onde está.",
          "Antes de mudar de branch, guarde mudanças em um commit ou resolva-as. Se uma edição local seria sobrescrita pela troca, Git pode recusá-la. Não contorne a proteção apagando arquivos às cegas. Compare git diff e decida se a mudança pertence ao branch atual. Um branch isolado permite experimentar, mas não substitui validação: execute o projeto e examine os arquivos antes de integrar."
        ]
      },
      {
        "title": "Faça merge e leia o gráfico",
        "paragraphs": [
          "Após confirmar a saudação em feature/saudacao, git switch main e git merge feature/saudacao integram seus commits. Se main não avançou desde a criação do branch, ocorre fast-forward: o nome main apenas avança até o commit da funcionalidade. Portanto nem todo merge cria um novo commit. git log --graph --oneline --all -5 mostra relações e nomes; o hash pode mudar, mas a ordem e as mensagens revelam a história.",
          "Quando main também avançou, o merge pode gerar um commit de junção. Antes, git diff main..feature/saudacao permite inspecionar a mudança proposta no branch de trabalho. Não confunda estar em main com ter executado testes. O revisor deve saber o objetivo, os arquivos atingidos e a evidência de funcionamento. Remover o branch após integrar é opcional e seguro apenas depois de verificar que tudo o que importa entrou no histórico certo."
        ]
      },
      {
        "title": "Produza e resolva um conflito pequeno",
        "paragraphs": [
          "Crie frase.txt com \"Curso inicial\" e faça commit em main. Crie feature/frase; nesse branch troque por \"Curso prático\" e confirme. Volte para main; troque a mesma linha por \"Curso acessível\" e confirme. Ao executar git merge feature/frase, o Git não tem regra para escolher entre os dois textos e marca conflito. git status indica arquivo unmerged. O arquivo contém linhas \u003c\u003c\u003c\u003c\u003c\u003c\u003c, ======= e >>>>>>> que separam versões. Esses marcadores não devem ir para o produto final.",
          "Abra frase.txt no editor, entenda o que cada lado pretende e substitua todo o bloco por \"Curso prático e acessível\". Salve, confira git diff --check para detectar espaços problemáticos, execute git add frase.txt e git commit para concluir o merge; se o editor de mensagem abrir, aceite ou escreva uma mensagem descritiva. git status deve ficar limpo. Se precisar desistir antes de resolver, git merge --abort tenta retornar ao estado anterior; é melhor iniciar com árvore limpa para reduzir surpresas."
        ]
      },
      {
        "title": "Conflitos são decisões sobre requisito",
        "paragraphs": [
          "Marcar resolvido não prova que a frase final atende ao objetivo. Duas alterações podem se fundir sem conflito de texto e ainda produzir incompatibilidade de comportamento. Leia a funcionalidade integrada e rode os testes da aplicação. Em revisão, explique por que escolheu combinar palavras, manter uma versão ou reescrever. Resolver apenas removendo os marcadores pode esconder perda de conteúdo.",
          "Nunca faça merge diretamente em uma pasta com mudanças não relacionadas e não tente resolver um conflito usando git reset --hard por reflexo. Inspecione git status, os marcadores e o histórico. Em equipe, informe quais requisitos colidem; às vezes é preciso perguntar ao responsável pela tarefa antes de escolher. Esse hábito importa mais do que decorar um único comando de conflito."
        ]
      }
    ],
    "example": {
      "language": "PowerShell",
      "code": "# Comece com a pasta limpa e README.md já versionado\ngit switch -c feature/saudacao\nSet-Content saudacao.txt \"Olá, visitante\"\ngit add saudacao.txt\ngit commit -m \"feat: adiciona saudação\"\ngit switch main\ngit merge feature/saudacao\ngit log --graph --oneline --all -5",
      "explanation": [
        "O exemplo primeiro demonstra fast-forward simples, sem conflito.",
        "git switch main retorna à linha principal antes de integrar.",
        "O gráfico mostra a relação entre referências e commits, não pastas copiadas."
      ],
      "expected": "saudacao.txt passa a existir em main. O log contém o commit feat: adiciona saudação; o merge pode ser fast-forward."
    },
    "guided": [
      {
        "instruction": "Execute git branch em cada etapa da troca.",
        "result": "O asterisco indica o branch atual."
      },
      {
        "instruction": "Antes do merge, use git diff main..feature/saudacao -- saudacao.txt.",
        "result": "O diff mostra a nova linha no branch de funcionalidade."
      },
      {
        "instruction": "Após o merge, rode git status e leia saudacao.txt em main.",
        "result": "A árvore fica limpa e o texto aparece na linha principal."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: crie feature/titulo, altere um arquivo e prove que main ainda aponta para o estado anterior antes do merge.",
        "hints": [
          "Use git switch -c feature/titulo.",
          "Compare branches com git diff main..feature/titulo."
        ],
        "solution": "git switch -c feature/titulo\nSet-Content titulo.txt \"Agenda nova\"\ngit add titulo.txt\ngit commit -m \"feat: adiciona titulo\"\ngit diff main..feature/titulo -- titulo.txt\ngit switch main",
        "explanation": "Os commits do novo branch não passam automaticamente para main.",
        "expected": "Em main, titulo.txt ainda não está no snapshot; o diff entre branches mostra sua adição.",
        "criteria": ["Branch nova contém alteração isolada antes de integrar.","Em main o snapshot permanece e diff entre branches mostra mudança."]
      },
      {
        "prompt": "Aplicar: integre feature/titulo em main e verifique o resultado.",
        "hints": [
          "Confira a árvore limpa e o branch atual.",
          "Use git merge feature/titulo e git log --all."
        ],
        "solution": "git status --short\ngit branch --show-current\ngit merge feature/titulo\ngit log --graph --oneline --all -5",
        "explanation": "A integração faz main alcançar o commit da funcionalidade.",
        "expected": "titulo.txt aparece em main e status termina limpo.",
        "criteria": ["Integração coloca arquivo em main.","Status final está limpo e conteúdo é conferido."]
      },
      {
        "prompt": "Construir: produza o conflito de frase.txt descrito na aula e resolva-o com uma frase que cumpra os dois requisitos.",
        "hints": [
          "Ambos os branches devem alterar a mesma linha a partir de um commit comum.",
          "Remova os três tipos de marcador antes de git add."
        ],
        "solution": "# Depois de criar e confirmar frase.txt = Curso inicial em main:\ngit switch -c feature/frase\nSet-Content frase.txt \"Curso prático\"\ngit add frase.txt\ngit commit -m \"feat: torna frase pratica\"\ngit switch main\nSet-Content frase.txt \"Curso acessível\"\ngit add frase.txt\ngit commit -m \"feat: torna frase acessivel\"\ngit merge feature/frase\n# No editor: substitua o bloco em conflito por Curso prático e acessível\ngit add frase.txt\ngit commit -m \"merge: combina frase pratica e acessivel\"",
        "explanation": "A resolução é uma decisão de conteúdo; o Git não escolhe semanticamente por você.",
        "expected": "frase.txt contém exatamente a frase combinada, sem marcadores, e git status está limpo.",
        "criteria": ["Conflito é resolvido sem marcadores e atende aos dois requisitos.","Status não deixa arquivo em conflito ou edição pendente."]
      },
      {
        "prompt": "Diagnosticar: um merge terminou sem conflitos, mas quebrou a página. Explique o próximo procedimento.",
        "hints": [
          "Conflito textual e defeito funcional são coisas diferentes.",
          "Execute a aplicação e compare diff e requisitos."
        ],
        "solution": "git status\ngit log --graph --oneline -5\ngit show --stat HEAD\n# Reproduza o defeito; corrija em novo commit ou reverta o merge após analisar com a equipe.",
        "explanation": "A ausência de marcadores só indica que Git conseguiu combinar textos. A validação de comportamento ainda cabe ao desenvolvedor.",
        "expected": "A resposta apresenta reprodução, inspeção, teste e correção comunicada.",
        "criteria": ["Reprodução e inspeção precedem correção.","Teste/regressão e comunicação são incluídos na resposta."]
      }
    ],
    "mistakes": [
      "Achar que cada merge sempre cria um commit novo.",
      "Deixar \u003c\u003c\u003c\u003c\u003c\u003c\u003c, ======= ou >>>>>>> no arquivo final.",
      "Interpretar merge sem conflito como prova de funcionamento."
    ],
    "quiz": [
      {
        "question": "O que um branch representa?",
        "options": [
          "Uma referência móvel para um commit",
          "Uma cópia integral obrigatória da pasta",
          "Uma conta remota"
        ],
        "correctIndex": 0,
        "explanation": "Branches nomeiam pontos do histórico e avançam com commits."
      },
      {
        "question": "Por que ocorre fast-forward?",
        "options": [
          "Porque todos os arquivos são iguais",
          "Porque o branch de destino não avançou desde a divergência",
          "Porque o servidor fez revisão"
        ],
        "correctIndex": 1,
        "explanation": "A referência de destino pode simplesmente avançar até o commit de origem."
      },
      {
        "question": "Depois de editar um arquivo em conflito, qual é a etapa que o marca como resolvido?",
        "options": [
          "git fetch",
          "git init",
          "git add arquivo"
        ],
        "correctIndex": 2,
        "explanation": "git add registra a versão resolvida no index; o commit conclui o merge."
      }
    ],
    "summary": [
      "Crie branch para uma mudança com propósito claro.",
      "Leia o diff antes de integrar.",
      "Resolva conflito pelo requisito e valide o comportamento final."
    ]
  },
"git-remote": {
    "prerequisites": "Saber fazer commits e ler branches. Use uma pasta de laboratório contendo agenda-lab com branch main e status limpo.",
    "setup": "O experimento usa três pastas irmãs na mesma pasta de estudo: agenda-lab, servidor-agenda.git e colega-agenda. O repositório bare simula o servidor sem conexão ou conta. Execute as linhas uma por vez no PowerShell; confira Get-Location antes de cada Set-Location. Se origin já existir, use git remote -v e outro laboratório, sem substituir uma URL de trabalho real.",
    "why": "Git distribui o histórico: sua cópia e a cópia remota podem divergir. Em um emprego, você frequentemente baixa mudanças de colegas, integra-as e envia as suas. Saber qual informação foi apenas buscada e qual já entrou no seu branch impede sobrescrever trabalho e explica por que um push pode ser rejeitado.",
    "sections": [
      {
        "title": "Um remoto é um endereço com nome",
        "paragraphs": [
          "git remote add origin ../servidor-agenda.git grava a associação entre o apelido origin e uma pasta neste laboratório. Em GitHub ou serviço semelhante, o endereço costuma ser HTTPS ou SSH, mas a lógica de referências é a mesma. git remote -v mostra os endereços de busca e envio. O nome origin é uma convenção, não uma palavra especial; main é o branch local. origin/main é uma referência local que registra o último estado conhecido do branch main no remoto.",
          "git init --bare cria um repositório sem pasta de trabalho comum. Por isso ele serve como destino de push. O arquivo de dados fica em servidor-agenda.git; não edite seu conteúdo manualmente. git push -u origin main envia commits e configura acompanhamento para os próximos comandos. Enviar não abre uma revisão e não publica automaticamente um site; ele apenas atualiza o branch remoto se a operação for aceita."
        ]
      },
      {
        "title": "Clone e simule outra pessoa",
        "paragraphs": [
          "git clone servidor-agenda.git colega-agenda cria uma segunda cópia com histórico, uma configuração origin e um branch de trabalho baseado no remoto. Entre nessa pasta e confirme git log --oneline -1 e git remote -v. A cópia é independente: uma edição em colega-agenda não aparece imediatamente em agenda-lab. Para um commit nessa segunda cópia, configure user.name e user.email localmente; a identidade não veio da primeira pasta.",
          "Na cópia colega-agenda, crie changelog.txt, faça add, commit e push. Depois volte à primeira cópia. git fetch origin baixa objetos e atualiza origin/main, mas não muda os arquivos do seu branch main. Compare git log --oneline main..origin/main: ele lista commits presentes no remoto conhecido e ausentes em main. Só então use git merge --ff-only origin/main, se possível. --ff-only falha em vez de criar merge inesperado quando os branches divergiram."
        ]
      },
      {
        "title": "Entenda pull e rejeições",
        "paragraphs": [
          "git pull combina busca e integração; sua estratégia pode ser merge, rebase ou fast-forward conforme configuração e estado. Neste laboratório, git pull --ff-only origin main comunica que você aceita apenas avanço linear. Se falhar por divergência, pare, confira status, fetch e o gráfico do log. Não configure uma estratégia aleatória para silenciar a mensagem. Em equipe, a política de merge ou rebase deve ser combinada; rebase de commits ainda não compartilhados pode ser útil, mas muda seus identificadores.",
          "Se outra cópia enviou um commit antes de você, seu git push pode ser rejeitado por non-fast-forward. Isso protege o histórico remoto. Busque, inspecione, integre a mudança e tente enviar de novo após validar. Não use --force para ultrapassar essa proteção. Um token de hospedagem deve ficar no mecanismo de credenciais da ferramenta ou do provedor, nunca no repositório, no README ou na URL que você compartilhar."
        ]
      },
      {
        "title": "Realize a mesma leitura num serviço real",
        "paragraphs": [
          "Com uma conta gratuita, você pode criar um repositório vazio no serviço escolhido e trocar o endereço do laboratório pelo endereço apresentado por ele. Revise as instruções atuais do serviço para autenticação e permissões. Um repositório público pode ser visto por terceiros; confira arquivos e git status antes do primeiro push. Nunca publique chaves, credenciais, dados pessoais de terceiros ou cópias de projetos sem direito de distribuição.",
          "Se não quiser criar conta agora, o remoto bare local permite praticar clone, push, fetch, pull e rejeição com o mesmo protocolo lógico. A limitação é que ele não oferece interface de issues, PR e revisão. Você estudará essas convenções em documentos locais simulados nas próximas aulas e poderá repetir a parte social num serviço real quando estiver pronto."
        ]
      }
    ],
    "example": {
      "language": "PowerShell",
      "code": "# Fora de agenda-lab, na pasta que contém o projeto\ngit init --bare --initial-branch=main servidor-agenda.git\nSet-Location agenda-lab\ngit remote add origin ../servidor-agenda.git\ngit push -u origin main\nSet-Location ..\ngit clone servidor-agenda.git colega-agenda\nSet-Location colega-agenda\ngit log --oneline -1\ngit remote -v",
      "explanation": [
        "O repositório bare é o destino simulado do push, não a pasta de edição.",
        "A opção -u define o branch remoto acompanhado por main.",
        "O clone cria outra cópia independente para experimentar colaboração."
      ],
      "expected": "push informa que main foi enviado; clone cria colega-agenda; git remote -v nessa pasta aponta para servidor-agenda.git. O hash inicial das duas cópias coincide."
    },
    "guided": [
      {
        "instruction": "Em colega-agenda, rode git config user.name e configure identidade local se não houver.",
        "result": "O commit poderá registrar um autor específico dessa cópia."
      },
      {
        "instruction": "Faça uma alteração em colega-agenda e envie; na primeira cópia use git fetch origin.",
        "result": "O log main..origin/main mostra o novo commit e os arquivos locais ainda não mudaram."
      },
      {
        "instruction": "Na primeira cópia, execute git merge --ff-only origin/main.",
        "result": "main alcança o estado remoto e o arquivo aparece localmente."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: confirme para qual endereço origin aponta em cada clone.",
        "hints": [
          "Execute git remote -v na pasta correta.",
          "Não confunda o apelido origin com URL em si."
        ],
        "solution": "git remote -v\ngit branch -vv",
        "explanation": "A configuração guarda endereço e rastreamento separadamente.",
        "expected": "Você consegue apontar o caminho do remoto e o branch acompanhado.",
        "criteria": ["Compara origin e branch acompanhado nas duas cópias.","Registra URLs sem incluir credenciais embutidas."]
      },
      {
        "prompt": "Aplicar: crie um commit em colega-agenda e observe apenas a chegada via fetch em agenda-lab.",
        "hints": [
          "Configure autor local na cópia colega se necessário.",
          "Em agenda-lab compare main..origin/main antes de merge."
        ],
        "solution": "Set-Content changelog.txt \"Nova etapa\"\ngit add changelog.txt\ngit commit -m \"docs: registra nova etapa\"\ngit push origin main\n# Em agenda-lab:\ngit fetch origin\ngit log --oneline main..origin/main",
        "explanation": "Fetch atualiza a sua visão do remoto, mas preserva o branch de trabalho até você integrar.",
        "expected": "O log da primeira cópia mostra um commit pendente de integração; changelog.txt ainda não existe no snapshot de main.",
        "criteria": ["fetch atualiza referências remotas sem integrar automaticamente.","Compara log local/remoto e snapshot de main."]
      },
      {
        "prompt": "Construir: integre o commit recebido, valide o arquivo e explique o que pull --ff-only faria nesse estado.",
        "hints": [
          "Use git merge --ff-only origin/main.",
          "Verifique git status e o conteúdo do arquivo."
        ],
        "solution": "git merge --ff-only origin/main\nGet-Content changelog.txt\ngit status --short\ngit log --oneline -2",
        "explanation": "A integração avança main até a referência buscada. Pull --ff-only faria busca e avanço se não houvesse divergência.",
        "expected": "Arquivo contém Nova etapa e main está limpo.",
        "criteria": ["Integra somente após inspeção e valida conteúdo.","Pull fast-forward é explicado conforme a relação entre os históricos."]
      },
      {
        "prompt": "Diagnosticar: um push foi rejeitado porque outra cópia enviou antes. Dê uma sequência segura, sem forçar atualização.",
        "hints": [
          "Comece por status e fetch.",
          "Compare branches e integre conforme a política do projeto."
        ],
        "solution": "git status\ngit fetch origin\ngit log --graph --oneline --all -8\n# Integre origin/main, resolva conflitos se houver, teste e só então git push origin main.",
        "explanation": "Rejeição non-fast-forward evita perder commits remotos. A ação correta depende da divergência observada.",
        "expected": "A resposta inclui inspeção, integração, teste e novo push, sem --force.",
        "criteria": ["Inspeciona estado remoto, integra sem force, testa e tenta push novamente.","Histórico publicado não é sobrescrito."]
      }
    ],
    "mistakes": [
      "Achar que fetch altera imediatamente os arquivos de main.",
      "Interpretar push como publicação do site ou aprovação de mudança.",
      "Usar push --force para ocultar rejeição de histórico remoto novo."
    ],
    "quiz": [
      {
        "question": "Após git fetch origin, o que mudou normalmente?",
        "options": [
          "Os arquivos de main foram obrigatoriamente substituídos",
          "A visão local do remoto, como origin/main",
          "O README público do servidor"
        ],
        "correctIndex": 1,
        "explanation": "Fetch baixa dados e atualiza referências remotas; integração é outra etapa."
      },
      {
        "question": "Por que um push non-fast-forward é rejeitado?",
        "options": [
          "Porque não há arquivo index.html",
          "Porque a mensagem do commit é curta",
          "Porque o remoto tem histórico que seu envio não incorpora"
        ],
        "correctIndex": 2,
        "explanation": "A recusa protege commits já presentes no destino."
      },
      {
        "question": "O que git clone produz?",
        "options": [
          "Uma cópia local do repositório com histórico",
          "Um PR aprovado",
          "Um site publicado"
        ],
        "correctIndex": 0,
        "explanation": "Clone prepara uma cópia de trabalho e configura o remoto."
      }
    ],
    "summary": [
      "Origin é um apelido para remoto; main e origin/main têm papéis distintos.",
      "Busque e inspecione antes de integrar.",
      "Rejeição de push é um sinal para sincronizar, não para forçar."
    ]
  },
"git-requirements": {
    "prerequisites": "Ter um projeto simples de HTML/JavaScript ou usar a lista de estudos descrita nesta aula. Saber criar branch e commit.",
    "setup": "Você pode escrever ISSUE.md e README.md em qualquer editor de texto UTF-8. O exemplo PowerShell cria uma issue local simulada, sem serviço externo. Se depois usar GitHub Issues, copie o conteúdo para uma issue real e acompanhe pelo serviço; isso exige conta e rede, mas a competência de especificar é praticável offline.",
    "why": "No início da carreira, muitas tarefas chegam incompletas: “o filtro não funciona” ou “melhore essa tela”. Desenvolver código antes de entender resultado e limites aumenta retrabalho. Uma boa descrição torna o comportamento verificável e dá ao revisor uma forma justa de avaliar. Um README claro permite que outra pessoa rode o projeto sem conversar com o autor.",
    "sections": [
      {
        "title": "Transforme pedido em problema observável",
        "paragraphs": [
          "Uma issue útil começa pelo contexto: quem usa, o que tenta fazer e o que acontece hoje. Para defeito, registre passos de reprodução, comportamento observado e esperado, ambiente e evidência sem dados sensíveis. Para funcionalidade, descreva a capacidade desejada e por que ela importa. “Melhorar a lista” não diz qual ação deve existir; “alternar entre todos, pendentes e concluídos” delimita uma interface testável.",
          "Evite prescrever implementação cedo demais. O requisito “persistir o estado após recarregar” descreve resultado; “use a variável X em localStorage” decide mecanismo. A arquitetura pode merecer discussão, mas critérios de aceite devem focar o que o usuário percebe ou uma propriedade técnica essencial, como não perder dados. Identifique dúvidas: quantos filtros, como tratar lista vazia, o que ocorre se armazenamento falhar? Registre suposições e peça esclarecimento em equipe antes de assumir comportamento caro de refazer."
        ]
      },
      {
        "title": "Escreva critérios que possam falhar",
        "paragraphs": [
          "Critério obrigatório deve ser específico o bastante para alguém demonstrar aprovação ou falha. “O filtro é bonito” depende de interpretação. “Selecionar pendentes oculta todos os itens concluídos, sem apagá-los” é verificável. Inclua casos normais, vazios e de erro. Para a lista de estudos: adicionar item válido, impedir título vazio, alternar conclusão, filtrar, recarregar e verificar persistência. Se houver acessibilidade, inclua operação por teclado e anúncio de estado quando relevante.",
          "Separe essencial de melhoria futura: busca textual pode ficar para depois se a tarefa trata apenas três filtros. Explique o que não está no escopo, como sincronização entre dispositivos. Essa delimitação protege a entrega de crescer sem avaliação. Quando um requisito muda durante o desenvolvimento, atualize o documento, avise quem revisa e reavalie critérios e testes; não espere o fim para revelar uma interpretação nova."
        ]
      },
      {
        "title": "README é a entrada do projeto",
        "paragraphs": [
          "Um README deve dizer o que o projeto faz, por que existe, requisitos para execução, passos concretos para iniciar e verificar, tecnologia usada e limitações conhecidas. Em um site HTML simples, “abra index.html” pode bastar; módulos JavaScript e APIs locais podem exigir servidor, então informe o comando efetivo e a porta. Se houver ambiente ou chave, documente nomes das variáveis e um exemplo sem valor secreto. Não cole token real nem credenciais de demonstração que permitam abuso.",
          "Inclua um pequeno roteiro manual: criar item, marcar como concluído, alternar filtros, recarregar e observar persistência. Se existem testes automatizados, diga o comando e o que ele cobre. Um link para site publicado só deve aparecer se funcionar; um screenshot ajuda, mas não substitui instruções. Um colega novo deve conseguir reproduzir o comportamento usando só repositório e README. Teste essa hipótese em uma pasta clonada, não apenas no seu ambiente antigo."
        ]
      },
      {
        "title": "Relacione tarefa, branch e entrega",
        "paragraphs": [
          "A issue guarda o pedido; o branch isola a implementação; commits mostram passos; a revisão compara o diff com os critérios. Esses elementos se conectam por texto claro, como título “Filtro de estudos pendentes” e descrição de PR que menciona a issue. Não marque a issue como concluída quando o código apenas existe na sua máquina. Confirme testes, integração e estado da publicação exigidos pela tarefa.",
          "Na simulação local, ISSUE.md substitui a interface de issue para permitir prática sem conta. Ele não fornece comentários, responsáveis e histórico de discussão de um serviço real, mas permite redigir critérios e revisá-los. Faça outra pessoa ler o documento, ou tente implementar a partir dele alguns dias depois sem olhar seu código anterior. Toda ambiguidade encontrada deve voltar ao texto como caso ou pergunta."
        ]
      }
    ],
    "example": {
      "language": "PowerShell",
      "code": "# Em um branch de documentação no laboratório\ngit switch -c docs/requisitos\n@'\n# História: filtrar estudos\nComo estudante, quero alternar entre todos, pendentes e concluídos.\nCritérios:\n- Em \"pendentes\", nenhum item concluído aparece.\n- Depois de recarregar, os itens mantêm seu estado.\n- Com lista vazia, aparece uma mensagem clara.\n'@ | Set-Content ISSUE.md\ngit add ISSUE.md\ngit diff --staged -- ISSUE.md\ngit commit -m \"docs: define critérios do filtro\"",
      "explanation": [
        "O here-string cria um documento legível com contexto e critérios.",
        "O diff staged permite revisar a especificação antes do commit.",
        "A issue local pode ser copiada para um serviço real quando houver conta."
      ],
      "expected": "ISSUE.md contém três critérios verificáveis e git log registra o commit de documentação. Nenhum código de interface foi alterado ainda."
    },
    "guided": [
      {
        "instruction": "Acrescente à issue os passos de reprodução do defeito atual.",
        "result": "Outra pessoa deve conseguir ver o mesmo defeito."
      },
      {
        "instruction": "Classifique cada critério como obrigatório ou melhoria futura.",
        "result": "Busca textual não bloqueia a entrega dos três filtros se estiver fora do escopo."
      },
      {
        "instruction": "Escreva um README provisório e tente seguir seus próprios passos numa pasta clonada.",
        "result": "Comandos e nomes de arquivos devem funcionar sem conhecimento tácito."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: reescreva “filtro bom” como critério observável.",
        "hints": [
          "Descreva ação e consequência visível.",
          "Inclua que a filtragem não apaga registros."
        ],
        "solution": "Critério: ao selecionar Pendentes, aparecem somente itens não concluídos; voltar a Todos exibe novamente os concluídos.",
        "explanation": "Uma pessoa pode executar a ação e observar se a regra foi cumprida.",
        "expected": "O critério permite uma verificação objetiva com dois itens de estados diferentes.",
        "criteria": ["Critério usa condição reproduzível e resultado observável.","Dois itens de estados diferentes são distinguidos."]
      },
      {
        "prompt": "Aplicar: escreva caso de erro para título vazio e critério de acesso por teclado.",
        "hints": [
          "Defina o que acontece ao enviar apenas espaços.",
          "Considere rótulo, foco e Enter."
        ],
        "solution": "Critérios: enviar título com apenas espaços não cria item e mostra orientação; com foco no campo, Enter adiciona título válido; controles possuem rótulos acessíveis.",
        "explanation": "Casos fora do caminho ideal evitam aceitar uma interface que só funciona com mouse e entrada perfeita.",
        "expected": "Os critérios podem ser testados manualmente no navegador sem consultar implementação.",
        "criteria": ["Caso vazio define resposta e não alteração de dados.","Teclado permite executar o fluxo sem consultar implementação."]
      },
      {
        "prompt": "Construir: escreva README para a lista de estudos com propósito, execução, roteiro de teste e limite conhecido.",
        "hints": [
          "A execução deve citar arquivos e comando ou abertura exata.",
          "Não documente recursos que ainda não existem como se estivessem prontos."
        ],
        "solution": "# Lista de estudos\nAplicação para registrar e filtrar sessões de estudo.\n\n## Executar\nAbra index.html no navegador (ou use o servidor local indicado pelo projeto).\n\n## Verificar\nAdicione dois itens, conclua um, escolha Pendentes e recarregue. O item concluído não aparece nesse filtro, mas reaparece em Todos.\n\n## Limites\nDados ficam apenas neste navegador; não há sincronização entre dispositivos.",
        "explanation": "README é um contrato de reprodução; a instrução de servidor deve ser específica se o código real o exigir.",
        "expected": "Outra pessoa consegue iniciar e testar o comportamento sem perguntar ao autor.",
        "criteria": ["README inclui propósito, execução, teste e limite conhecido.","Outra pessoa consegue reproduzir o comportamento com os passos registrados."]
      },
      {
        "prompt": "Diagnosticar: uma issue pede “salvar para sempre” e o plano é usar localStorage. Que esclarecimento é necessário?",
        "hints": [
          "Pense em limpeza do navegador e outros dispositivos.",
          "Transforme “para sempre” em prazo e comportamento verificável."
        ],
        "solution": "Pergunte se o dado precisa sobreviver à limpeza do navegador, troca de dispositivo e acesso por múltiplos usuários. Documente a decisão e os limites; localStorage sozinho não garante essas propriedades.",
        "explanation": "Um requisito ambíguo pode exigir backend e banco, alterando escopo e prazo. Não declare atendimento total com uma solução local.",
        "expected": "A resposta distingue persistência local, conta e sincronização remota.",
        "criteria": ["Pedido é esclarecido sobre navegador, conta e sincronização.","Requisito define comportamento após trocar dispositivo ou sessão."]
      }
    ],
    "mistakes": [
      "Escrever critério de aceite como opinião subjetiva.",
      "Documentar comando de execução que nunca foi testado em uma cópia limpa.",
      "Tratar ISSUE.md local como equivalente completo a um sistema de colaboração."
    ],
    "quiz": [
      {
        "question": "Qual critério pode ser testado diretamente?",
        "options": [
          "A interface deve ser incrível",
          "Pendentes mostra apenas itens não concluídos",
          "O código deve ser moderno"
        ],
        "correctIndex": 1,
        "explanation": "A ação e o resultado observável estão definidos."
      },
      {
        "question": "O README deve incluir qual informação prática?",
        "options": [
          "Somente o nome do autor",
          "Apenas um screenshot",
          "Como executar e verificar o projeto"
        ],
        "correctIndex": 2,
        "explanation": "Leitores precisam reproduzir o funcionamento."
      },
      {
        "question": "Se o pedido muda durante o trabalho, o que fazer?",
        "options": [
          "Atualizar requisitos, critérios e comunicação",
          "Ignorar a mudança até depois do merge",
          "Fazer push forçado"
        ],
        "correctIndex": 0,
        "explanation": "A mudança pode afetar implementação, teste e aceite."
      }
    ],
    "summary": [
      "Descreva ação e resultado verificáveis.",
      "Documente execução como se outra pessoa fosse começar do zero.",
      "Registre suposições e limites quando a demanda é ambígua."
    ]
  },
"git-review": {
    "prerequisites": "Ter uma issue com critérios claros, branch de mudança e pelo menos um commit diferente de main.",
    "setup": "Se você tem um serviço Git remoto, pode abrir um PR real conforme as permissões do repositório. Para estudar sem conta, mantenha PR.md e REVIEW.md no laboratório, compare com git diff main...seu-branch e peça a uma pessoa para ler quando possível; também faça uma autoavaliação simulando dois papéis. Não faça merge em repositório da equipe sem política ou autorização própria.",
    "why": "Um desenvolvedor júnior precisa tornar sua mudança fácil de entender e revisar. A integração de código não depende só de escrever uma função correta: requisitos podem faltar, testes podem cobrir apenas o caso feliz e manutenção pode ficar difícil. O PR organiza a conversa e conserva a evidência de como uma alteração foi avaliada.",
    "sections": [
      {
        "title": "Prepare uma proposta pequena",
        "paragraphs": [
          "Antes de pedir revisão, execute a aplicação e seus testes, confira git status e leia git diff main...feature/filtro. A notação com três pontos compara a ponta do branch com o ancestral comum a main e destaca a mudança proposta; ela pode diferir de um diff de duas pontas quando main avançou. git diff --stat dá escala rápida, mas não revela semântica: leia o patch e cheque arquivos inesperados, credenciais, logs e código de depuração.",
          "Um PR claro começa pelo problema e comportamento resultante. Escreva “Selecionar Pendentes oculta concluídos sem apagar dados” e depois explique o que mudou, como reproduzir, como testou e limitações. Referencie a issue correspondente quando houver. Screenshots ou gravação podem ajudar em interface visual; apresente também teste de teclado e estado vazio. Não infle o texto com toda a história da tentativa. Se o diff contém duas funcionalidades separáveis, considere propostas menores."
        ]
      },
      {
        "title": "Revise contra critérios e riscos",
        "paragraphs": [
          "O revisor lê a issue, roda o fluxo e compara com o diff. Pergunte: os três filtros funcionam? Dados persistem após recarregar? Entrada vazia é tratada? O foco e os rótulos funcionam com teclado? Há teste ou roteiro que detectaria regressão? Documentação ainda corresponde à implementação? Uma aprovação não deve se basear somente em aparência ou no fato de o código compilar.",
          "Procure também falhas de manutenção: nomes que escondem o significado, lógica duplicada, alterações fora do pedido, dependências sem necessidade, segredos e código que engole erros sem informar o usuário. Comente o impacto concreto e sugira um caminho. “No filtro Pendentes, a condição elimina registros do array; após voltar a Todos eles não reaparecem. Filtre uma cópia para renderização” ensina e permite verificar a correção. “Código ruim” não ajuda."
        ]
      },
      {
        "title": "Responda e itere",
        "paragraphs": [
          "Ao receber comentário, reproduza o caso, ajuste em commit novo e responda indicando o que mudou e como verificou. Se discordar, exponha o requisito e a evidência com respeito; peça decisão sobre comportamento se houver ambiguidade. Não marque uma discussão como resolvida sem verificar. Em geral, o PR atualiza quando você envia novos commits ao branch de origem; confira as regras do serviço e da equipe.",
          "Se main avançou enquanto o PR está aberto, busque e integre as mudanças conforme política local; resolva conflitos e repita testes. O diff e a validação apresentados antes podem ter ficado desatualizados. Após merge, verifique o branch principal e, quando a tarefa incluir publicação, confirme o ambiente publicado. Fechar issue não substitui checar que o usuário encontra a funcionalidade em funcionamento."
        ]
      },
      {
        "title": "Pratique a conversa sem plataforma",
        "paragraphs": [
          "No laboratório, PR.md guarda descrição, checklist e evidências. REVIEW.md pode conter dois comentários: um defeito reproduzível e uma dúvida sobre requisito. Atualize o branch para atender ao primeiro; para a dúvida, escreva uma decisão fundamentada e ajuste a issue se necessário. Depois compare git log main..feature/filtro e o diff final. Isso permite treinar clareza sem conta, embora não reproduza permissões, notificações nem controles de merge de uma plataforma.",
          "Um portfólio forte mostra uma entrega compreensível: issue, commits coerentes, mudança demonstrável, instruções de execução e decisões registradas. A finalidade não é simular uma empresa perfeita, mas demonstrar que você consegue receber um pedido, implementar, verificar, explicar e manter uma mudança após feedback. Guarde também o motivo de uma decisão contestada: se o requisito pedia três filtros e a revisão sugeriu incluir busca por texto, explique que a busca ficou para outra issue. Essa resposta mostra respeito ao comentário e controle de escopo. Se o feedback revela defeito nos três filtros, corrija na entrega atual, atualize a evidência e só então peça nova revisão."
        ]
      }
    ],
    "example": {
      "language": "PowerShell",
      "code": "# Em agenda-lab; substitua feature/filtro pelo seu branch\ngit switch feature/filtro\ngit status --short\ngit diff main...feature/filtro --stat\ngit diff main...feature/filtro\ngit log --oneline main..feature/filtro\n# Escreva PR.md com problema, mudança, como testar e limites.\n# Após ajustes, faça outro commit e repita diff/status.",
      "explanation": [
        "O diff com três pontos mostra o que o branch propõe desde o ancestral comum.",
        "O log main..branch ajuda a revisar a sequência de commits da proposta.",
        "PR.md permite praticar descrição e revisão quando não há plataforma."
      ],
      "expected": "Uma descrição de PR identifica problema, comportamento, execução dos testes e limites; o diff contém apenas arquivos esperados e o status está limpo."
    },
    "guided": [
      {
        "instruction": "Leia o diff como revisor e anote uma pergunta concreta.",
        "result": "A pergunta cita arquivo, comportamento ou critério, não apenas gosto pessoal."
      },
      {
        "instruction": "Simule um defeito encontrado no PR e faça commit de correção.",
        "result": "O diff final atende ao caso encontrado e registra o ajuste."
      },
      {
        "instruction": "Reexecute todos os critérios da issue após alterar o branch.",
        "result": "A evidência de validação refere-se ao estado final do PR."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: redija uma descrição curta para o PR do filtro com como testar.",
        "hints": [
          "Abra com o problema e resultado.",
          "Liste passos reproduzíveis e limitação relevante."
        ],
        "solution": "Problema: a lista não separa itens pendentes. Mudança: adiciona filtros Todos, Pendentes e Concluídos sem apagar registros. Verificar: crie dois itens, conclua um, alterne filtros e recarregue. Limite: dados permanecem só neste navegador.",
        "explanation": "A descrição permite ao revisor entender a intenção e executar um teste sem investigar todo o histórico da conversa.",
        "expected": "Há problema, resultado, roteiro e limite explícitos.",
        "criteria": ["Descrição registra problema, efeito, teste e limite.","Passos permitem reproduzir sem orientação oral."]
      },
      {
        "prompt": "Aplicar: faça uma revisão que encontre possível perda de dados ao filtrar.",
        "hints": [
          "Descreva passos e resultado esperado.",
          "Proponha filtrar apenas a visualização."
        ],
        "solution": "Comentário: com dois itens, marcar um como concluído e selecionar Pendentes remove-o de estado, pois o array original é sobrescrito. Ao voltar a Todos ele não reaparece. Mantenha a lista original e aplique filter somente ao conjunto renderizado; adicione teste de alternância.",
        "explanation": "Feedback útil traz cenário, impacto e direção de correção; não precisa impor nomes de variáveis.",
        "expected": "Um autor consegue reproduzir a perda e comprovar que a correção a elimina.",
        "criteria": ["Revisão relata cenário de perda com passos e dados.","Correção vem acompanhada de teste que demonstra reteste."]
      },
      {
        "prompt": "Construir: crie PR.md e REVIEW.md, corrija um comentário e documente a nova verificação.",
        "hints": [
          "Use a issue como fonte de critérios.",
          "Compare diff antes e depois do ajuste."
        ],
        "solution": "# PR.md\nProblema: filtros ausentes.\nMudança: opções Todos/Pendentes/Concluídos.\nVerificação: dois itens, alternância, recarga, teclado.\nLimite: dados locais.\n\n# REVIEW.md\nComentário: filtro não deve excluir registros.\nResposta: renderização agora filtra uma cópia; teste de retorno a Todos passou.\nDúvida: caso de título vazio foi incluído na issue e verificado.",
        "explanation": "A conversa deve levar a código e critérios melhores. Ao registrar evidência, use o estado final após o último commit.",
        "expected": "Os dois arquivos descrevem mudança, teste, feedback e resposta verificável.",
        "criteria": ["Arquivos documentam mudança, comentário e resposta.","Nova verificação está registrada depois do ajuste."]
      },
      {
        "prompt": "Diagnosticar: os testes passaram antes da revisão, mas um comentário mudou a implementação. O que falta antes de integrar?",
        "hints": [
          "A evidência antiga se refere ao código antigo.",
          "Revise diff final e reexecute testes e roteiro manual."
        ],
        "solution": "git status --short\ngit diff main...feature/filtro\n# Execute novamente os testes automáticos e os critérios da issue. Atualize PR.md com os resultados finais.",
        "explanation": "Toda alteração de código após a validação pode introduzir regressão. A revisão do estado final é parte da entrega.",
        "expected": "O PR final contém evidência de testes após o ajuste, não só antes dele.",
        "criteria": ["Testes são executados novamente após comentário mudar o código.","Evidência final corresponde à implementação entregue."]
      }
    ],
    "mistakes": [
      "Abrir PR sem ler o próprio diff e sem testar.",
      "Dar feedback vago sem passos ou impacto observável.",
      "Considerar resolvido um comentário sem verificar a correção final."
    ],
    "quiz": [
      {
        "question": "Qual informação ajuda mais a revisar um PR?",
        "options": [
          "Somente “funciona aqui”",
          "Problema, mudança, critérios e como testar",
          "Uma captura sem passos"
        ],
        "correctIndex": 1,
        "explanation": "O revisor precisa entender intenção e reproduzir resultado."
      },
      {
        "question": "Um comentário encontrou defeito reproduzível. Qual a resposta mais útil?",
        "options": [
          "Ignorar até o merge",
          "Resolver a conversa sem alterar nada",
          "Corrigir, testar e explicar o ajuste"
        ],
        "correctIndex": 2,
        "explanation": "A resposta conecta feedback, mudança e evidência."
      },
      {
        "question": "Depois de mudar o código por feedback, como tratar testes anteriores?",
        "options": [
          "Reexecutar testes relevantes no estado final",
          "Usá-los como prova definitiva",
          "Remover os critérios da issue"
        ],
        "correctIndex": 0,
        "explanation": "Testes antigos não demonstram o comportamento do código alterado."
      }
    ],
    "summary": [
      "Mostre a intenção e a validação no PR.",
      "Revise contra requisitos e comportamento, além de estilo.",
      "Reavalie a mudança depois de cada ajuste e responda a comentários com evidência."
    ]
  }
});

// Recuperação após o quiz: novas situações com resultado verificável.
(() => {
  const retries = {
    "git-start": {
      prompt: "Em uma pasta de laboratório, crie plano.txt e rascunho.txt. Faça um commit apenas de plano.txt. Antes e depois, anote a raiz do repositório e o que git status mostra para cada arquivo.",
      expected: "O commit contém só plano.txt; rascunho.txt continua fora do histórico; a raiz conferida é a pasta do laboratório e o status final confirma a separação.",
      hint: "Confira a pasta atual e a raiz do Git antes de adicionar; inspecione o staging antes do commit."
    },
    "git-history": {
      prompt: "Num repositório descartável, faça um commit que adiciona uma linha a agenda.txt e outro que adiciona uma linha a ideias.txt. Descubra qual commit alterou ideias.txt e desfaça seu efeito preservando o histórico.",
      expected: "O histórico mostra os dois commits originais e o commit de reversão; agenda.txt mantém sua linha e ideias.txt volta ao conteúdo anterior.",
      hint: "Inspecione log e diff do commit específico antes de usar revert; confirme o diff final."
    },
    "git-branches": {
      prompt: "Crie uma branch para mudar a mensagem de boas-vindas de uma página. Enquanto isso, na branch principal, acrescente um rodapé em outra linha. Integre as mudanças e verifique a página resultante.",
      expected: "A página final contém a nova mensagem e o rodapé; o histórico registra a integração; uma abertura no navegador confirma que ambas as mudanças funcionam.",
      hint: "Compare as branches antes de integrar e teste o resultado mesmo quando o merge não relata conflito."
    },
    "git-remote": {
      prompt: "Use dois clones de um repositório de laboratório. Publique uma alteração no clone A, faça apenas fetch no clone B e compare main com origin/main antes de integrar.",
      expected: "No clone B, origin/main aponta para o commit recebido enquanto main permanece no commit anterior; após integração segura, ambos apontam para o mesmo trabalho.",
      hint: "Leia o log das duas referências depois do fetch; não use push forçado para resolver divergência."
    },
    "git-requirements": {
      prompt: "Uma issue diz 'a busca deve ser rápida e funcionar bem'. Reescreva o pedido para uma lista de estudos com critérios de aceite observáveis, incluindo lista vazia, erro de entrada e uso por teclado. Acrescente instruções de teste no README.",
      expected: "Cada critério descreve entrada, ação e resultado que outra pessoa pode conferir; o README permite iniciar e testar o projeto sem depender de explicação oral.",
      hint: "Troque adjetivos vagos por comportamento, dados de exemplo e condições de teste."
    },
    "git-review": {
      prompt: "Uma mudança adiciona botão de excluir tarefa. Escreva a descrição de um PR com intenção e roteiro de teste. Revise um caso em que o filtro está ativo, peça uma correção e registre a nova verificação.",
      expected: "A revisão identifica se o botão exclui a tarefa correta sob filtro; a descrição inclui passos reproduzíveis; depois da correção há evidência de reteste, não apenas 'resolvido'.",
      hint: "Revise comportamento e identidade da tarefa além do estilo do código."
    }
  };

  for (const [id, retry] of Object.entries(retries)) LESSON_GUIDES[id].retry = retry;
})();

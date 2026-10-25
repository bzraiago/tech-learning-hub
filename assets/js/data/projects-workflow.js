'use strict';

// Projetos de fluxo de trabalho usam evidências produzidas fora do navegador.
PROJECTS.push({
  id: 'project-git-capstone',
  module: 'git-collaboration',
  kind: 'workflow',
  title: 'Melhoria revisada na lista de estudos',
  level: 'Projeto de fechamento · Git e Colaboração',
  goal: 'Entregar uma melhoria pequena em uma lista de estudos com histórico compreensível, requisitos verificáveis, remoto local simulado e revisão documentada.',
  prerequisites: 'Conclua os módulos Git local e Fluxo de trabalho em equipe. Use Git no terminal e uma cópia descartável da lista de estudos feita em HTML e JavaScript. A preparação mínima para Git está na Etapa 0. Não é necessária uma conta no GitHub.',
  deliverable: 'Guarde o repositório completo em uma pasta de laboratório. Na aba Entrega, cole um resumo de ISSUE.md, README.md e PR.md, os comandos usados para verificar o histórico e o resultado observado. Não cole dados pessoais, tokens ou endereços privados.',
  brief: [
    'Receba o pedido: “Quero filtrar tarefas pendentes sem perder o estado após recarregar”. Escreva ISSUE.md com contexto, exemplos de entrada e saída e critérios para lista vazia, filtro e persistência.',
    'Crie uma branch para a mudança. Faça commits separados para requisito, implementação e verificação; compare o diff com main antes de integrar. Use um repositório bare em uma pasta local como remoto simulado e confirme o histórico a partir de uma segunda cópia.',
    'Escreva README.md para outra pessoa reproduzir a aplicação e conferir os critérios. Escreva PR.md com escopo, como testar, resultado observado e limites. Peça revisão real se houver outra pessoa disponível; caso contrário, faça uma revisão independente em outro momento e identifique-a como simulação.'
  ],
  exampleOutput: 'ISSUE.md: pendentes mostra somente tarefas incompletas; recarregar preserva tarefas e filtro; lista vazia apresenta mensagem.\nHistórico: commits distintos para requisito, implementação e verificação; branch de melhoria integrada a main.\nSegunda cópia: após buscar o remoto local, a melhoria aparece e os critérios podem ser repetidos.\nPR.md: registra teste com tarefas concluídas, pendentes e lista vazia, um comentário de revisão e o ajuste ou justificativa correspondente.',
  checks: [
    { id: 'issue', mode: 'manual', label: 'ISSUE.md contém contexto, entrada/saída esperada e critérios de aceite para filtro, persistência e lista vazia.' },
    { id: 'history', mode: 'manual', label: 'git log --oneline --graph --all e git diff main...<branch> mostram branch e commits com propósito distinto; inspecionei o diff antes de integrar.' },
    { id: 'remote', mode: 'manual', label: 'Um remoto bare local recebeu a mudança; em uma segunda cópia, git fetch e a inspeção do histórico mostram a versão publicada.' },
    { id: 'readme', mode: 'manual', label: 'Outra pessoa, ou eu em uma pasta limpa, conseguiu executar a aplicação e repetir os testes seguindo apenas README.md.' },
    { id: 'review', mode: 'manual', label: 'PR.md documenta resultado dos testes, uma observação de revisão e o ajuste ou a justificativa; identifiquei se a revisão foi real ou simulada.' },
    { id: 'change', mode: 'manual', label: 'Após a implementação inicial, acrescentei o requisito novo, repeti os testes afetados e expliquei as decisões sem consultar uma solução pronta.' }
  ],
  testCommand: 'git status --short\ngit log --oneline --graph --all -8\ngit diff main...<nome-da-branch> --stat\ngit remote -v\ngit fetch origin\n# Na segunda cópia, confira o histórico e rode os testes descritos no README.',
  hints: [
    'Faça este projeto em uma pasta de laboratório; não execute comandos de limpeza sobre outro repositório.',
    'Antes de cada commit, use git status e git diff --staged para conferir exatamente o que entrará no histórico.',
    'Se a segunda cópia não mostrar a mudança, compare branch local, branch remoto e o último commit antes de tentar novo push.'
  ],
  solution: 'Uma entrega possível separa os documentos de requisito, o código do filtro e a verificação em commits distintos. O revisor compara o diff com os critérios da issue, reproduz pelo README e registra em PR.md o resultado, uma dúvida e o ajuste feito. Os hashes e caminhos variam em cada repositório; explique os seus, sem copiar um histórico fictício.',
  transfer: 'Depois da primeira revisão, acrescente o filtro “concluídas”. Atualize a issue, implemente em outro commit, teste os três filtros e descreva no PR.md quais decisões mudaram.',
  rubric: 'A entrega é uma autoavaliação: todos os artefatos devem existir no repositório, o histórico e o remoto devem poder ser inspecionados, e outra pessoa deve conseguir repetir os testes pelo README. A página não executa comandos Git nem confirma uma revisão real.'
});

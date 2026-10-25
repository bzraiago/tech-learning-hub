'use strict';

// Prova básica: os artefatos externos exigem conferência humana, não nota automática.
PROJECTS.push({
  id: 'project-basic-capstone',
  module: 'delivery-work',
  kind: 'workflow',
  title: 'Organizador pessoal de estudos',
  level: 'Prova de nível 1 · Básico consistente',
  goal: 'Construir, testar e manter sozinho um organizador de tarefas de estudo que outra pessoa consiga executar pelo README.',
  prerequisites: 'Conclua a Etapa 0, HTML e CSS, JavaScript até DOM e armazenamento, Git local, Python básico, SQL com SQLite e testes de funções. Use as preparações mínimas de editor, terminal, Git, Node.js e Python; para SQLite, retome o executor Python da aula Tabelas, tipos e restrições (db-ddl-constraints). A API e a publicação real ainda não são necessárias nesta prova.',
  deliverable: 'Mantenha um repositório de laboratório com index.html, style.css, app.js, tarefas.js, tarefas.test.cjs, README.md, dados-exemplo.json, relatorio.py, schema.sql e consultas.sql. Na aba Entrega, registre os nomes dos arquivos, os comandos executados, saídas observadas, um resumo do histórico Git e o resultado da revisão por outra pessoa. Não cole dados pessoais ou um repositório privado inteiro.',
  brief: [
    'Interface: permita cadastrar, editar, concluir, excluir e filtrar tarefas por todas, pendentes e concluídas. Use HTML semântico, rótulos, foco visível e mensagens de estado. Verifique teclado e larguras próximas de 375px e 1200px. Lista vazia deve ter orientação útil; títulos inseridos pelo usuário devem aparecer como texto.',
    'Estado: cada tarefa tem id estável, titulo não vazio após trim e concluida booleana. Salve e restaure a lista após recarregar. Trate entrada inválida, falha de armazenamento e dados salvos corrompidos sem quebrar a interface nem apagar silenciosamente o trabalho. Separe regras testáveis de eventos e renderização.',
    'Entrega reproduzível: escreva testes das funções de cadastro, edição, conclusão, exclusão, filtro e validação; crie roteiro manual para a interface. Faça commits com propósito claro e README com requisitos, como iniciar, testar, parar, retomar e limitações. Peça a outra pessoa para executar pela documentação e registrar o que conseguiu verificar.',
    'Extensão de conclusão básica: produza dados-exemplo.json fictício com o mesmo formato das tarefas. relatorio.py lê esse arquivo e informa total, concluídas e pendentes; schema.sql cria tabela SQLite equivalente e consultas.sql responde às mesmas contagens. Essa etapa usa arquivos de laboratório: não ligue Python ou SQLite à interface.',
    'Mudança solicitada após a versão inicial: acrescente prioridade alta ou normal às tarefas. Defina o valor padrão para dados antigos, mostre a prioridade na lista e permita filtrar as tarefas de prioridade alta. Atualize testes, JSON de exemplo, relatório, esquema/consultas, README e roteiro manual. Explique o que mudou e por quê sem consultar uma solução pronta.'
  ],
  exampleOutput: 'Conteúdo fictício de dados-exemplo.json:\n[{"id":"t1","titulo":"Ler HTML","concluida":true},{"id":"t2","titulo":"Praticar JS","concluida":false},{"id":"t3","titulo":"Revisar CSS","concluida":true}]\nInterface inicial: 3 tarefas; filtro Pendentes mostra somente “Praticar JS”; após recarregar, o estado permanece. Sem tarefas, aparece uma mensagem clara.\nRelatório Python: total=3, concluidas=2, pendentes=1.\nConsultas SQLite sobre os mesmos dados: total=3, concluidas=2, pendentes=1.\nApós a mudança: tarefas antigas recebem prioridade normal; filtro Alta mostra apenas as marcadas como alta. Ajuste os exemplos e registre as novas saídas reais.',
  checks: [
    { id: 'interface', mode: 'manual', label: 'Outra pessoa navegou por teclado e verificou rótulos, foco, mensagens, lista vazia e layout em aproximadamente 375px e 1200px.' },
    { id: 'tasks', mode: 'manual', label: 'Demonstrei cadastro, edição, conclusão, exclusão e os três filtros com dados fictícios; títulos não são interpretados como HTML.' },
    { id: 'storage', mode: 'manual', label: 'Recarreguei a página e confirmei persistência; testei título inválido, dados salvos corrompidos e armazenamento bloqueado com mensagem compreensível.' },
    { id: 'tests', mode: 'manual', label: 'Rodei testes das funções principais, provoquei ao menos uma falha controlada e executei o roteiro manual com resultados registrados.' },
    { id: 'git', mode: 'manual', label: 'O histórico Git separa versão inicial, testes e mudança de requisito; outra pessoa reproduziu execução e testes seguindo somente o README.' },
    { id: 'python', mode: 'manual', label: 'relatorio.py leu dados-exemplo.json fictício e produziu contagens corretas para lista normal e vazia; registrei comando e saída observada.' },
    { id: 'sqlite', mode: 'manual', label: 'schema.sql e consultas.sql recriaram uma base SQLite de laboratório e responderam total, concluídas e pendentes; registrei comandos e resultados.' },
    { id: 'change', mode: 'manual', label: 'Após a versão inicial, implementei prioridade alta/normal, migrei dados antigos para normal e atualizei interface, testes, relatório, SQL e README sem copiar uma solução.' },
    { id: 'review', mode: 'manual', label: 'Registrei quem revisou, quais critérios observou, um defeito ou dúvida encontrado, a correção ou justificativa e expliquei minhas decisões com minhas palavras.' }
  ],
  testCommand: 'No terminal da pasta do projeto:\nnode --test tarefas.test.cjs\npython relatorio.py dados-exemplo.json  # ou py no Windows\nPara SQLite, copie schema.sql e consultas.sql, nesta ordem, para aula.sql. Coloque executar.py da aula db-ddl-constraints na mesma pasta e rode python executar.py (ou py executar.py no Windows).\nNo navegador, siga o roteiro manual do README e recarregue a página.',
  hints: [
    'Comece com uma única tarefa, salve e recarregue antes de criar todos os filtros. Depois escreva a regra pura e seus testes.',
    'Para dados antigos sem prioridade, decida o valor padrão antes de alterar a interface; teste a migração com um JSON salvo na versão inicial.',
    'Entregue README a outra pessoa sem explicação oral. Se ela travar, corrija a documentação e repita o teste em uma pasta limpa.'
  ],
  solution: 'Uma entrega válida pode organizar regras de tarefas em tarefas.js, eventos e DOM em app.js e estilos em style.css. Testes de regras não substituem o roteiro de teclado e persistência. O relatório Python e as consultas SQLite devem concordar sobre o mesmo conjunto fictício de dados. Não há solução de referência completa para esta prova: compare seus resultados com os critérios, peça revisão independente e explique cada decisão sem copiar.',
  transfer: 'Após a revisão inicial, alguém pede que tarefas de prioridade alta apareçam em um filtro próprio. Defina os critérios antes de codar, implemente sobre seu projeto sem perder tarefas antigas e repita testes de regra, interface, relatório e consultas.',
  rubric: 'Funcionamento: todos os fluxos e casos de erro são reproduzíveis pelo README; testes automatizados e roteiro manual têm resultados observados. Explicação: o aluno justifica estrutura, validação, persistência e mudança de requisito com exemplos próprios. Manutenção: a nova prioridade preserva dados antigos, tem testes de regressão e foi revisada por outra pessoa. As caixas são autoavaliação; registrar a entrega não libera o nível nem substitui a revisão humana.'
});

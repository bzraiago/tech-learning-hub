'use strict';

// Provas de conclusão: o site registra autoavaliação; artefatos e revisão exigem conferência externa.
PROJECTS.push(
  {
    id: 'project-intermediate-capstone',
    module: 'delivery-work',
    kind: 'workflow',
    title: 'Plataforma de acompanhamento de estudos',
    level: 'Prova de níveis 2 e 3 · Júnior e intermediário',
    goal: 'Entregar e manter uma aplicação de estudos com interface, API e PostgreSQL, demonstrando separadamente as competências júnior e intermediárias.',
    prerequisites: 'Conclua a prova básica e estude HTTP, validação no servidor, arquitetura em camadas, PostgreSQL, transações, testes, Git, CI e publicação. Antes das exigências intermediárias, estude autenticação, autorização, migrações e observabilidade. Retome os laboratórios backend-validation, backend-layers e project-reading. Docker local pode ser usado; publicação e revisão exigem ambientes e pessoas reais de teste.',
    deliverable: 'Entregue em repositório próprio a aplicação, migrations, testes, workflow de CI, README, roteiro de deploy e recuperação, evidência de execução e URL de demonstração sem dados pessoais reais. Registre no curso somente links públicos ou resumos sem segredos, comandos e resultados observados, decisões e revisão recebida. Separe evidências júnior das intermediárias.',
    brief: [
      'Base júnior: construa cursos, tarefas e sessões de estudo. A interface chama uma API real; o servidor valida entradas, aplica regras e responde com códigos e mensagens coerentes. PostgreSQL persiste dados após reinício. Mostre estados de carregamento, vazio, sucesso e falha na interface.',
      'Dados e segurança: modele relações e consultas de relatório; crie uma operação que altere estudo e sessão na mesma transação, com rollback demonstrável. Para dados por conta, autentique, autorize cada operação no servidor e teste que uma conta não lê nem altera dados de outra. Não coloque credenciais no navegador ou no Git.',
      'Qualidade e entrega: execute testes de regra, integração com banco descartável e um fluxo de interface. A CI deve executar de verdade e preservar o registro de uma execução falha e outra corrigida. Documente como reconstruir ambiente, aplicar migrations, iniciar, parar, publicar, fazer backup e restaurar numa base separada.',
      'Manutenção júnior: em uma branch, reproduza um defeito em código que você não escreveu, escreva teste que falha, corrija o menor ponto necessário e confirme regressão. Depois receba um requisito novo sobre a plataforma e implemente sem reescrever a aplicação.',
      'Extensão intermediária: documente fronteiras entre camadas, escolha de transação e migração reversível ou plano de recuperação. Mostre logs que permitam localizar uma falha sem expor dados sensíveis; incorpore revisão de outra pessoa em uma mudança real. Compare o comportamento antes e depois de uma falha controlada.'
    ],
    exampleOutput: 'Exemplo de evidência, não resultado garantido:\nPOST /api/studies válido → 201 e id; título vazio → 400 sem nova linha; título duplicado → 409.\nFalha na criação da sessão → transação revertida, sem estudo parcial.\nReinício do servidor → estudo anterior ainda consultável.\nConta B tenta ler estudo da conta A → recusa e nenhuma informação privada.\nCI: execução vermelha ligada ao teste do defeito → correção em branch → execução verde.\nREADME: outra pessoa sobe banco e aplicação em pasta limpa, executa testes e restaura um backup em base separada.',
    checks: [
      { id: 'junior-flow', mode: 'manual', label: 'Outra pessoa percorreu interface → API → validação → regra → PostgreSQL → resposta, incluindo vazio, erro e recarga.' },
      { id: 'junior-data', mode: 'manual', label: 'Cursos, tarefas, sessões, relatório e transação foram demonstrados; rollback e persistência após reinício têm resultados registrados.' },
      { id: 'junior-tests', mode: 'manual', label: 'Testes unitários, integração PostgreSQL descartável e fluxo no navegador passaram; registrei comandos e resultados reais.' },
      { id: 'junior-delivery', mode: 'manual', label: 'CI executou no repositório, demonstração publicada usa dados fictícios e outra pessoa reconstruiu o ambiente pelo README.' },
      { id: 'junior-maintenance', mode: 'manual', label: 'Corrigi defeito de código alheio com teste vermelho→verde e implementei requisito novo em branch, sem reescrever o sistema.' },
      { id: 'intermediate-access', mode: 'manual', label: 'Duas contas de teste comprovaram autenticação e autorização por recurso; pedidos diretos indevidos foram recusados no servidor.' },
      { id: 'intermediate-operations', mode: 'manual', label: 'Documentei camadas, migrations, logs, backup/restauração em base separada e recuperação após falha controlada.' },
      { id: 'intermediate-review', mode: 'manual', label: 'Outra pessoa revisou uma mudança real; registrei comentário, decisão tomada, alteração incorporada e verificação posterior.' }
    ],
    testCommand: 'No terminal, na raiz do SEU projeto: siga os comandos exatos do SEU README para preparar ambiente, aplicar migrations e executar testes. Não copie comandos de outro laboratório sem conferir portas e nomes.\nNo navegador: percorra criação, erro, recarga e isolamento com duas contas fictícias.\nNa CI: registre URLs de uma execução falha e da execução corrigida.\nNa recuperação: restaure o backup somente em banco de teste separado e compare contagens.',
    hints: [
      'Entregue primeiro o caminho vertical mínimo: um formulário, uma rota, uma regra, uma tabela e uma resposta visível.',
      'Use um banco descartável para os testes de integração e mantenha o banco de demonstração fora dos ensaios destrutivos.',
      'Peça ao revisor para seguir o README sem ajuda oral; registre onde ele travou e corrija a documentação.'
    ],
    solution: 'Não há solução pronta: compare cada requisito com uma execução observável. A prova júnior exige o fluxo completo, teste, deploy e manutenção. A classificação intermediária exige adicionalmente autorização comprovada, migrations, operação, revisão incorporada e explicação das decisões. Os checks do site são autoavaliação; links e artefatos precisam ser conferidos por outra pessoa.',
    transfer: 'Depois da primeira entrega, alguém pede sessões com duração máxima configurável por curso. Preserve sessões antigas, altere contrato e migração se necessário, escreva teste de limite e de comportamento preservado, atualize interface, API e README, e peça revisão da branch.',
    rubric: 'Júnior: fluxo completo, reprodução pelo README, testes, publicação, correção de bug alheio e mudança de requisito explicada. Intermediário: além disso, camadas, autorização entre contas, migrações, transação, recuperação, observabilidade e revisão real incorporada. Falhar em qualquer evidência obrigatória mantém o nível pendente. Registrar a entrega no curso não certifica nenhum nível.'
  },
  {
    id: 'project-advanced-capstone',
    module: 'delivery-work',
    kind: 'workflow',
    title: 'Evolução segura e mensurável da plataforma',
    level: 'Prova de nível 4 · Avançado',
    goal: 'Conduzir uma evolução da plataforma com decisões técnicas, medição, segurança e operação reproduzível, explicando custos e riscos restantes.',
    prerequisites: 'Conclua e comprove a prova intermediária. Revise desempenho, modelagem de ameaças, segurança aplicada, observabilidade, infraestrutura reproduzível e trabalho colaborativo. A extensão de IA conectada é opcional e tem avaliação própria; sem chave/API, execute a prova principal sem IA.',
    deliverable: 'Entregue uma proposta técnica curta, baseline reproduzível, mudança em branch revisada, resultados antes/depois, ameaça e correção verificadas, infraestrutura reconstruída em ambiente de teste, roteiro de incidente e relatório de riscos residuais. Use dados fictícios e não publique chaves, tokens, logs pessoais ou infraestrutura sensível.',
    brief: [
      'Escolha um gargalo real da plataforma, como latência de relatório ou volume de consultas. Defina cenário, carga, ambiente e métrica antes de otimizar. Meça baseline, altere uma variável de cada vez, compare distribuição e custo, e registre quando a mudança piora outro aspecto.',
      'Faça um modelo de ameaça para o fluxo alterado. Reproduza em ambiente isolado uma falha de autorização ou validação, aplique uma correção e escreva teste de regressão. Diferencie teste local de garantia geral de segurança.',
      'Recrie a infraestrutura de teste a partir de configuração versionada e documentação, com segredos fornecidos fora do Git. Demonstre diagnóstico por logs e métricas, uma falha controlada, recuperação e verificação do estado dos dados após o incidente.',
      'Registre pelo menos duas alternativas de arquitetura, incluindo custo operacional, complexidade, desempenho e segurança. Conduza uma mudança em colaboração: issue com critérios, revisão de outra pessoa, resposta aos comentários e decisão final documentada.',
      'Extensão opcional de IA real: conecte a plataforma a um modelo autorizado para responder sobre materiais fictícios. Separe avaliação do recuperador e do modelo; teste fontes, abstenção, conteúdo sem evidência, prompt injection, custo e latência. Se não houver serviço real, rotule a versão simulada e não marque a extensão como comprovada.'
    ],
    exampleOutput: 'Exemplo de formato de evidência, com valores a medir no seu ambiente:\nCenário: 100 consultas sobre dados fictícios; registrar p50/p95, erros e custo antes/depois.\nSegurança: pedido indevido de conta B para recurso A falha antes da correção? Registre reprodução isolada, teste de regressão e recusa após a correção.\nOperação: derrubar dependência de teste → alerta/log identifica o ponto → recuperação documentada → dados conferidos.\nDecisão: alternativa A versus B com hipótese, medida, custo e risco residual.\nRevisão: comentário concreto de outra pessoa → resposta → ajuste → nova verificação.',
    checks: [
      { id: 'baseline', mode: 'manual', label: 'Registrei cenário, ambiente, carga, p50/p95, erros e custo antes da mudança; outra pessoa reproduziu a medição.' },
      { id: 'comparison', mode: 'manual', label: 'Comparei antes/depois, variabilidade e regressões; decisão de manter ou reverter segue os dados observados.' },
      { id: 'security', mode: 'manual', label: 'Modelei ameaça, reproduzi falha isolada, corrigi e mantive teste de regressão sem afirmar cobertura total de segurança.' },
      { id: 'infrastructure', mode: 'manual', label: 'Outra pessoa reconstruiu infraestrutura de teste sem segredos no Git; migrações, backup e restauração foram conferidos.' },
      { id: 'incident', mode: 'manual', label: 'Executei falha controlada, localizei a causa por telemetria, recuperei serviço e verifiquei integridade dos dados.' },
      { id: 'tradeoffs', mode: 'manual', label: 'Comparei duas alternativas com custos, limites, riscos residuais e condições que mudariam minha decisão.' },
      { id: 'collaboration', mode: 'manual', label: 'Uma pessoa revisou a mudança real; respondi aos comentários e registrei decisão, verificação e responsabilidade de operação.' }
    ],
    testCommand: 'No terminal da pasta do SEU projeto: execute os comandos de medição, teste, reconstrução e recuperação documentados no SEU README, sempre em ambiente de teste.\nNa CI: confira testes e artefatos da branch revisada.\nNo relatório: inclua comandos, ambiente, datas e resultados observados; não substitua medidas por números de exemplo.',
    hints: [
      'Comece pela pergunta mensurável; evite adicionar cache ou filas antes de identificar o gargalo.',
      'Mantenha uma versão de referência para comparar e um plano de reversão para a mudança.',
      'Peça ao revisor para contestar uma hipótese e reproduzir uma medição; documente o que mudou após essa revisão.'
    ],
    solution: 'Não existe arquitetura única como resposta. Uma entrega defensável apresenta baseline reproduzível, mudança pequena, comparação honesta, correção de segurança testada, operação recuperável, revisão real e riscos residuais explícitos. A extensão de IA só conta se usar modelo real com avaliação separada; simulação continua sendo prática válida, mas não comprova integração externa.',
    transfer: 'Após a revisão, o padrão de uso dobra e a dependência mais lenta fica indisponível por cinco minutos. Reavalie a escolha com medições, proponha degradação controlada, teste recuperação e explique se mantém, adapta ou reverte a arquitetura.',
    rubric: 'Avançado exige evidência de decisão sob restrições: medição antes/depois reproduzível, segurança aplicada, infraestrutura reconstruída, incidente recuperado, comparação de alternativas e colaboração real. A extensão de IA é opcional e avaliada separadamente. As caixas e o registro de entrega são autoavaliação; outra pessoa precisa conferir os artefatos.'
  }
);

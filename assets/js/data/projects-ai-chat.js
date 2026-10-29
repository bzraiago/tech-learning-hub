'use strict';

// Provas independentes da formação em programação. Nenhuma execução externa é inferida pelo site.
PROJECTS.push(
  {
    id: 'project-chat-basic', module: 'ai-chat-foundations', kind: 'workflow', practiceMode: 'chat',
    title: 'Pacote básico: interpretar, conferir e comunicar', level: 'Prova básica · uso de IA no chat',
    execution: { mode: 'external', label: 'Prática no chat web · sem código', detail: 'Use material fictício e confira os resultados. Arquivo ou mídia são opcionais; a alternativa textual não comprova sua geração.' },
    goal: 'Produzir um resumo, uma tabela conferida e um roteiro de comunicação sobre uma oficina fictícia, explicando como você verificou cada resultado.',
    prerequisites: 'Conclua as seis aulas do módulo Conversar, interpretar e produzir. Não é necessário fazer trilhas de programação ou instalar ferramentas.',
    deliverable: 'Registre seu pedido, os três resultados revisados, uma conta conferida independentemente, um erro encontrado ou caso testado e sua explicação. Use somente texto e dados fictícios. Se gerou arquivo ou mídia, registre o que abriu e conferiu; se não gerou, diga isso.',
    brief: ['Fonte fictícia F1: Oficina Aurora gratuita, duração 40 minutos, data pendente. Turma A tem 8 inscritos e turma B tem 12. Crie um resumo fiel sem inventar data, local ou depoimento.', 'Peça uma tabela de inscrições e confira total e participação de cada turma com papel ou calculadora. Depois crie um roteiro de três telas ou uma mensagem de divulgação com os mesmos fatos.', 'Abra uma conversa nova com uma ficha de retomada. Confira se ela preserva fonte, fatos e pendências. Revise os resultados antes de registrar a entrega.'],
    exampleOutput: 'Total: 20 inscritos. A: 40%; B: 60%. Gratuita, 40 minutos, data pendente. A saída deve conter fonte F1 e não inventar informações ausentes.',
    testCommand: 'No navegador: envie a fonte no chat escolhido, confira o resumo e recalcule a tabela. Revise o roteiro. Abra conversa nova com sua ficha e compare os fatos. Nenhum comando de terminal é necessário.',
    checks: [
      {id:'facts',mode:'manual',label:'Conferi resumo e comunicação contra F1; data, local e depoimentos não foram inventados.'},
      {id:'numbers',mode:'manual',label:'Recalculei total 20 e percentuais 40%/60% fora da resposta do chat.'},
      {id:'context',mode:'manual',label:'Retomei em conversa nova com ficha de contexto e identifiquei fonte e pendências.'},
      {id:'change',mode:'manual',label:'Atualizei a turma B para 8 e retestei total e percentuais, preservando os fatos da oficina.'}
    ],
    hints: ['Faça uma entrega por vez e confira antes de seguir.', 'Guarde o texto original para comparar com a síntese.', 'Não marque como gerado um arquivo que não abriu.'],
    solution: 'Compare seus artefatos com a fonte e as contas, sem copiar uma resposta de referência. A boa entrega mantém pendências, explica erros encontrados e demonstra a retomada em outra conversa. A aparência sozinha não comprova correção.',
    transfer: 'A turma B passa de 12 para 8 inscritos. Atualize a tabela e a comunicação: o total vira 16 e cada turma representa 50%; gratuidade, duração e data pendente devem continuar iguais.',
    rubric: 'A prova básica é satisfeita por resultados conferidos e explicação própria. Mídia ou exportação de arquivo não são obrigatórias. Registro no curso é autoavaliação; peça a outra pessoa para conferir fonte e cálculos quando possível.'
  },
  {
    id: 'project-chat-intermediate', module: 'ai-chat-professional', kind: 'workflow', practiceMode: 'chat',
    title: 'Assistente profissional com fontes e testes', level: 'Prova intermediária · uso de IA no chat',
    execution: { mode: 'external', label: 'Assistente textual ou configuração nativa privada', detail: 'Registre qual caminho executou. Um cartão textual não comprova bot instalado, consulta a sistemas ou habilitação profissional.' },
    goal: 'Criar e avaliar um assistente para uma tarefa delimitada de suporte ERP, conferência contábil, pesquisa tributária ou marketing.',
    prerequisites: 'Conclua a prova básica, procedimentos, pesquisa, configuração de assistentes, avaliação e pelo menos uma oficina profissional desta trilha. Não precisa programar.',
    deliverable: 'Registre cartão de configuração v1, fonte fictícia identificada, duas instruções reutilizáveis, cinco testes com expectativa e resultado, revisão v2 e limites. Se sua conta permitir, salve configuração privada e teste em conversa nova; caso contrário, reaplique o cartão como texto e registre a diferença.',
    brief: ['Escolha uma única missão: triagem de chamado; comparação de registros; ficha de pesquisa tributária; ou rascunho de campanha. Defina entrada, saída, fonte e decisão que depende de pessoa responsável.', 'Crie uma skill para a tarefa e outra para revisão. Teste cinco mensagens: caso coberto, ambíguo, sem evidência, fora de escopo e tentativa de obter informação que não foi autorizada. Use apenas dados fictícios.', 'Crie um plano de agendamento com data, fuso, frequência e término. Execute o prompt manualmente. A ativação nativa é opcional e deve ter painel, histórico e pausa conferidos se você a fizer.'],
    exampleOutput: 'ERP: orientação cita manual e versão; não inventa menu. Contabilidade: diferença é registrada, sem lançamento automático. Tributação: ficha mantém fatos e vigência pendentes, sem enquadramento real. Marketing: rascunho preserva fatos e não promete resultados. Escolha um domínio para entregar.',
    testCommand: 'No chat: aplique a configuração em conversa nova e execute os cinco casos, registrando expectativa antes da resposta. Altere uma regra e reteste um caso preservado e um novo. No serviço, confira configuração ou agendamento somente se utilizou esses recursos.',
    checks: [
      {id:'contract',mode:'manual',label:'Defini missão, entrada, fonte, saída e limites do assistente em um domínio fictício.'},
      {id:'skills',mode:'manual',label:'Criei instruções separadas de execução e revisão e apliquei em conversa nova.'},
      {id:'cases',mode:'manual',label:'Executei cinco casos distintos com expectativa prévia, resposta observada e decisão.'},
      {id:'schedule',mode:'manual',label:'Preparei plano de agenda e teste manual; identifiquei execução nativa como observada ou não realizada.'},
      {id:'revision',mode:'manual',label:'Criei v2 após uma falha ou requisito novo e conferi comportamento alterado e preservado.'}
    ],
    hints: ['Use a oficina profissional escolhida como preparação, sem copiar seus mesmos casos.', 'Conhecimento declarado no papel de especialista precisa de fonte.', 'Falta de recurso nativo é limitação da prova operacional, não motivo para inventar resultado.'],
    solution: 'Uma entrega consistente permite repetir o procedimento com outra entrada fictícia e localizar a fonte de cada afirmação relevante. O cartão, os testes e a revisão demonstram uso manual; instalação, conexão ou agenda exigem evidência própria. Contabilidade e tributação reais continuam sujeitas à revisão profissional.',
    transfer: 'A fonte v2 muda uma regra de atendimento, mas preserva outra. Atualize as instruções e execute um caso de cada tipo em conversa nova. Explique por que as respostas precisam mudar ou permanecer.',
    rubric: 'Avalie fidelidade à fonte, clareza, esclarecimento de lacunas, limites, testes e explicação. Configuração nativa e agendamento podem ficar pendentes explicitamente. A prova não certifica exercício profissional ou confiabilidade de um bot em produção.'
  },
  {
    id: 'project-chat-advanced', module: 'ai-chat-advanced', kind: 'workflow', practiceMode: 'chat',
    title: 'Operação profissional de IA com evidências', level: 'Prova avançada · uso de IA no chat',
    execution: { mode: 'external', label: 'Pacote manual + comprovação operacional por recurso', detail: 'A prova de operação remota exige execução real e histórico. Sem recurso na conta, registre planejamento concluído e operação pendente.' },
    goal: 'Operar uma rotina limitada e revisável com assistente, skills, fontes e avaliação, comprovando separadamente planejamento, execução manual e recursos nativos.',
    prerequisites: 'Conclua a prova intermediária e as cinco aulas avançadas. Para comprovar rotina remota, precisa de serviço que a ofereça e conta autorizada; isso pode depender de plano. Não é obrigatório comprar assinatura para estudar.',
    deliverable: 'Entregue contrato v2, fontes fictícias versionadas, duas skills, passagem de contexto entre papéis, seis casos de avaliação, ficha de rotina e registro de execução/pausa ou pendência. Inclua revisão independente quando disponível e explique custos, falhas e limites. Não publique tokens, telas de conta ou dados pessoais.',
    brief: ['Escolha uma missão profissional fictícia pequena. Faça primeiro o caminho manual e registre o tempo e a qualidade observada. Coordene coleta, produção e revisão com entradas e saídas claras.', 'Avalie seis casos: normal, ambíguo, ausente, fonte antiga, instrução não confiável no documento e dependência indisponível. Reserve dois casos antes de ajustar o assistente e registre os resultados reais.', 'Se disponível, configure uma única execução remota privada, com fonte acessível na nuvem e término definido. Confira painel, faça o teste com computador desligado quando seguro para seus trabalhos e depois confira histórico e resultado. Pause a rotina. Sem execução real, a capacidade operacional permanece pendente.', 'Peça a outra pessoa para reproduzir o procedimento com material fictício e registrar uma dúvida ou melhoria. Se não houve revisão, mantenha essa parte pendente. Não trate concordância entre papéis de IA como revisão independente.'],
    exampleOutput: 'Matriz de evidências: cartão textual — executado; skill nativa — observada ou pendente; conexão — observada ou pendente; rotina remota — horário previsto/efetivo e resultado ou não executada; pausa — estado conferido; revisão humana — comentário e mudança ou pendente. Um sucesso no caminho manual não preenche as outras linhas.',
    testCommand: 'No chat: execute casos reservados e compare com as fontes. No painel do serviço: confira local de execução, dependências, horário, histórico, consumo quando visível e pausa. Na revisão: outra pessoa segue sua ficha sem instruções orais extras. Registre indisponibilidades como não executadas.',
    checks: [
      {id:'package',mode:'manual',label:'Meu pacote permite repetir o caminho manual com fontes, versão, skills e passagem de contexto identificadas.'},
      {id:'evaluation',mode:'manual',label:'Executei os seis casos, preservei dois para avaliação após o ajuste e documentei falhas ou limitações.'},
      {id:'evidence',mode:'manual',label:'Classifiquei cada recurso como manual, nativo observado ou pendente, sem confundir plano com operação.'},
      {id:'operations',mode:'manual',label:'Registrei execução e pausa nativas com evidência, ou declarei explicitamente a operação remota ainda pendente.'},
      {id:'review',mode:'manual',label:'Registrei revisão de outra pessoa e ajuste feito, ou declarei revisão independente pendente.'},
      {id:'change',mode:'manual',label:'Atualizei fonte e frequência da rotina, retestei casos e expliquei custo ou consumo conhecido e limites restantes.'}
    ],
    hints: ['Escolha uma saída privada e reversível para a primeira automação.', 'Não use arquivo disponível só no computador em prova de execução remota.', 'A qualidade deve ser comparada ao caminho manual, não só à velocidade.'],
    solution: 'O pacote pode estar concluído como estudo enquanto operação ou revisão seguem pendentes. Para afirmar capacidade operacional avançada, confira execução remota real, pausa, falha observável, reteste e revisão independente. As caixas apenas registram seu relato; não validam serviços externos.',
    transfer: 'A fonte passa a v3 e a rotina deve executar mensalmente em vez de semanalmente. Atualize o contexto da tarefa, confira a próxima execução, preserve um caso antigo e teste um novo. Se não houver rotina nativa, faça o plano e deixe a execução pendente.',
    rubric: 'Planejamento e uso manual: contrato reproduzível, fonte, skills, seis testes, mudança e explicação. Operação comprovada: execução nativa observada, tratamento de falha, pausa e revisão independente. A ausência dessas evidências impede afirmar operação avançada comprovada, mesmo que a entrega seja registrada. Não há certificação automática nem equivalência com formação profissional.'
  }
);

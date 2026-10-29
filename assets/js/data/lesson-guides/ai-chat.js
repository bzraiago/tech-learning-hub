'use strict';

// Guias da trilha sem código: as práticas acontecem em uma interface web de chat.
function buildChatLesson(config) {
  return {
    execution: {
      mode: 'external',
      label: 'Prática em plataforma web de chat com IA',
      detail: config.executionDetail || 'Pratique no chat web escolhido com dados fictícios. O curso não recebe suas conversas nem configura serviços por você. O caminho por texto dispensa código e assinatura; recursos nativos opcionais dependem da plataforma, plano e permissões e precisam ser verificados na sua conta.'
    },
    prerequisites: config.prerequisites || 'Não exige experiência com programação, instalação ou conta em fornecedor específico. É necessário conseguir abrir uma interface web de chat com IA. Se a plataforma não tiver busca, envio de arquivos, agentes ou instruções salvas, use a alternativa por texto indicada na aula.',
    prerequisiteLessons: config.prerequisiteLessons || [],
    setup: config.setup || 'No navegador, abra uma conversa nova no chat escolhido. Use somente exemplos fictícios, sem dados pessoais ou confidenciais. Registre plataforma, data e recursos disponíveis. Faça as atividades na caixa de conversa, sem IDE, terminal, API ou chave. Se um recurso faltar, use a alternativa textual e registre que a execução nativa não foi testada. Para parar, interrompa a geração; para retomar, reabra a conversa ou copie seu resumo para outra. A confirmação de uma tarefa real precisa aparecer na interface do serviço.',
    why: config.why,
    sections: config.sections,
    example: {
      language: 'text',
      code: config.example.prompt,
      explanation: config.example.explanation,
      expected: config.example.expected
    },
    guided: config.guided.map((step) => ({ instruction: step.instruction, result: step.result })),
    exercises: config.exercises.map((exercise) => {
      const preserveAttempt = ['Prever', 'Investigar erro'].includes(exercise.kind);
      const visibleCriteria = preserveAttempt
        ? exercise.kind === 'Prever'
          ? ['Registre a previsão antes de enviar a mensagem.', 'Compare depois a resposta observada com uma regra, trecho ou critério da aula.']
          : ['Descreva a entrada e o comportamento inesperado antes de alterar a orientação.', 'Registre a hipótese, a mudança feita e o que observou ao repetir o caso.']
        : exercise.criteria;
      const visibleExpected = preserveAttempt
        ? exercise.kind === 'Prever'
          ? 'Seu registro mostra a previsão feita antes da conversa e, depois, a comparação com a resposta real do chat. A conclusão fica para sua análise após observar o resultado.'
          : 'Seu registro compara o comportamento observado com a regra esperada, documenta uma hipótese e descreve o resultado após uma mudança específica.'
        : exercise.expected;
      const visibleExample = preserveAttempt
        ? exercise.kind === 'Prever'
          ? 'Mensagem fictícia → ficha para preencher com previsão, resposta observada e comparação.'
          : 'Resposta inesperada em cenário fictício → registro de evidência, hipótese e reteste.'
        : exercise.example;
      return {
        prompt: `${exercise.kind}: ${exercise.task}\n\nCritérios de aceite: ${visibleCriteria.join(' ')}\n\nExemplo fictício de entrada → saída a registrar: ${visibleExample}`,
        hints: exercise.hints,
        solution: `${exercise.review}\n\nCritérios específicos para a revisão: ${exercise.criteria.join(' ')}`,
        expected: visibleExpected,
        criteria: visibleCriteria,
        explanation: exercise.explanation
      };
    }),
    mistakes: config.mistakes,
    summary: config.summary,
    retry: config.retry,
    quiz: config.quiz
  };
}

Object.assign(LESSON_GUIDES, {
  'chat-ai-first-prompts': buildChatLesson({
    why: 'Uma solicitação clara ajuda a comparar respostas e localizar o que ainda precisa ser conferido. A prática não tenta obter uma frase mágica: testa como tarefa, contexto, público, formato e critérios tornam o resultado mais observável.',
    sections: [
      { title: 'O chat responde ao pedido e ao contexto', paragraphs: [
        'Uma solicitação (prompt) é a mensagem que orienta o chat. Uma pergunta curta pode bastar para uma tarefa simples, mas pedidos com várias interpretações deixam decisões importantes implícitas. Declare o que quer obter, para quem, em qual situação e como pretende conferir a resposta.',
        'Contexto é a informação necessária para esta tarefa, não um convite para despejar dados. Use detalhes fictícios e relevantes. Uma pessoa que pede um plano para estudar tem necessidades diferentes de alguém que quer comparar opções de lazer. Dizer o que não deve ser presumido também reduz espaço para invenções.'
      ] },
      { title: 'Formato e critérios tornam a resposta conferível', paragraphs: [
        'Peça uma forma adequada ao uso: lista curta, comparação por critérios, perguntas de esclarecimento ou resumo em linguagem simples. Defina sinais observáveis, como separar fatos de sugestões, indicar dúvidas e caber em cinco itens. “Seja bom” não diz como avaliar; “apresente três opções e a incerteza de cada uma” pode ser conferido.',
        'A resposta ainda pode conter erros. Fluência, organização e tom confiante não comprovam exatidão. Compare com as informações fornecidas e marque o que requer fonte externa. O mesmo pedido pode variar entre plataformas, modelos, datas e conversas.'
      ] },
      { title: 'Compare uma mudança por vez', paragraphs: [
        'Comece com um pedido vago sobre uma situação fictícia, registre o que ficou ambíguo e envie uma versão mais específica. Compare se o público, o formato e a informação ausente passaram a aparecer. Mude uma dimensão de cada vez para entender o efeito; isso é uma observação, não prova de que a mudança sempre melhora qualquer modelo.',
        'Não inclua instruções privadas ou reais só para “dar contexto”. Se o chat pedir detalhes sensíveis, substitua-os por valores inventados. Se a plataforma oferecer memória ou histórico, confirme as configurações de privacidade antes de usar material que não seja público.'
      ] }
    ],
    example: {
      prompt: 'Ajude uma pessoa iniciante a organizar uma semana fictícia de estudos. Faça no máximo três perguntas se faltar informação; depois sugira um plano de cinco dias em uma tabela simples, com sessões curtas e uma pausa. Separe sugestões de fatos e termine indicando o que eu devo ajustar conforme minha disponibilidade. Não invente compromissos.',
      explanation: [
        'A tarefa e o público estão claros: sugerir um plano para uma pessoa iniciante.',
        'O cenário é fictício e limita a resposta a cinco dias, sessões curtas e uma pausa.',
        'Perguntas de esclarecimento lidam com lacunas sem preencher a agenda com fatos inventados.',
        'A tabela e a separação entre sugestão e fato são critérios visíveis para revisar a resposta.'
      ],
      expected: 'A resposta pode variar. Confira se faz perguntas quando necessário, usa uma tabela de cinco dias, não afirma compromissos reais e identifica sugestões. Antes de aceitar horários específicos, verifique se foram fornecidos ou se o chat os inventou.'
    },
    guided: [
      { instruction: 'Antes de enviar, preveja duas informações que o chat precisará e uma que não deve inventar.', result: 'A previsão fica registrada antes da resposta e pode ser comparada com o que o chat perguntou ou presumiu.' },
      { instruction: 'Envie o exemplo e marque as partes da resposta que vieram do cenário e as partes que são recomendações.', result: 'As recomendações aparecem como sugestões; detalhes ausentes são tratados como pergunta ou incerteza, não como fato.' },
      { instruction: 'Retire o limite de cinco dias, mantendo o restante igual. Compare apenas a organização e explique o que mudou.', result: 'A comparação identifica uma diferença observável sem concluir que uma formulação funciona sempre ou em todos os modelos.' }
    ],
    exercises: [
      { kind: 'Prever', task: 'Leia a solicitação vaga “me ajude a escolher um curso” e, antes de enviá-la, anote duas perguntas que poderiam mudar a recomendação e um formato que permitiria comparar opções.', criteria: ['Registra uma previsão antes de consultar o chat.', 'Aponta pelo menos duas lacunas relevantes e um formato verificável.'], example: 'Entrada: “me ajude a escolher um curso” → resultado a observar: a resposta pode presumir assunto, tempo ou orçamento que não foram informados.', hints: ['Pense no público, objetivo e restrições antes de formular a pergunta.', 'Compare a sua previsão com as perguntas e suposições da resposta.'], expected: 'Há duas lacunas registradas antes da conversa; a resposta é examinada para localizar suposições, não para julgar apenas se parece convincente.', review: 'A tentativa atende aos critérios se mostra o que foi previsto antes, identifica contexto ausente e propõe um formato comparável. Não existe uma única pergunta obrigatória.', explanation: 'Prever antes ajuda a perceber quais informações vieram do usuário e quais foram presumidas pelo chat.' },
      { kind: 'Alterar', task: 'Reescreva “me ajude a escolher um curso” para uma situação fictícia: pessoa iniciante, duas horas livres por semana, interesse em aprender fotografia. Peça duas opções comparáveis e uma pergunta se faltar algo importante.', criteria: ['Inclui público, objetivo e disponibilidade fictícia.', 'Pede duas opções em formato comparável e não exige uma recomendação inventada.'], example: 'Entrada: objetivo e tempo fictícios → resultado a observar: duas alternativas com critérios equivalentes ou uma pergunta de esclarecimento.', hints: ['Mantenha os dados inventados explícitos.', 'Peça critérios comuns antes de escolher um vencedor.'], expected: 'A solicitação revisada contém os três elementos do cenário e pede uma comparação uniforme; o chat pode perguntar algo adicional.', review: 'Confira se o pedido permite confrontar as opções item a item e se não apresenta os dados fictícios como informação de uma pessoa real.', explanation: 'Uma comparação justa usa critérios comuns e não esconde uma lacuna relevante.' },
      { kind: 'Construir', task: 'Crie no chat um pedido para montar um cardápio fictício de três almoços econômicos, deixando ingredientes e restrições como campos a confirmar em vez de presumir alergias ou preços atuais.', criteria: ['A tarefa e o limite de três almoços estão claros.', 'O chat pergunta por restrições e não declara preços atuais sem fonte.'], example: 'Entrada: cardápio fictício, três dias → resultado a observar: proposta organizada e pergunta sobre restrições ausentes.', hints: ['Indique o que é apenas cenário de treino.', 'Peça que preço não confirmado seja marcado como estimativa ou dúvida.'], expected: 'O pedido delimita o cenário e deixa restrições e preços como itens que precisam de confirmação.', review: 'Revise o pedido e a resposta para confirmar se limita a três almoços e evita transformar estimativas em fatos locais.', explanation: 'Critérios observáveis tornam mais fácil detectar uma resposta fora do pedido.' },
      { kind: 'Investigar erro', task: 'O chat recomendou um passeio e afirmou que um museu está aberto no domingo, embora nenhum horário tenha sido fornecido. Registre a resposta esperada e envie uma pergunta de correção que solicite evidência ou reconheça a lacuna.', criteria: ['Aponta exatamente a afirmação sem suporte.', 'Pede confirmação identificável ou reconhecimento de que a informação não foi fornecida.'], example: 'Entrada: cenário não informa horário → resultado a observar: a disponibilidade fica sem confirmação até haver fonte.', hints: ['Separe recomendação de afirmação verificável.', 'Peça que a nova resposta explique de onde vem o horário, sem aceitar uma citação vaga.'], expected: 'A afirmação sobre domingo é tratada como não verificada; a próxima resposta deve apontar fonte conferível ou declarar que falta informação.', review: 'A resposta satisfatória identifica a lacuna e não substitui uma suposição por outra. A fonte precisa permitir conferir data e local.', explanation: 'Um diagnóstico começa pela diferença entre o dado disponível e a afirmação apresentada.' }
    ],
    mistakes: [
      'Adicionar muitos detalhes irrelevantes: o contexto deve ajudar a tarefa e evitar exposição de dados.',
      'Aceitar confiança ou formatação como evidência: peça uma referência e confira-a fora da resposta.',
      'Mudar público, formato e critério ao mesmo tempo: fica difícil observar o efeito de cada alteração.',
      'Tratar um bom resultado numa conversa como garantia para todos os modelos ou situações.'
    ],
    summary: ['Um pedido claro explicita tarefa, contexto mínimo, público, formato e critério observável.', 'Use dados fictícios e declare o que o chat não deve presumir.', 'Respostas podem variar e afirmações importantes ainda exigem verificação independente.'],
    retry: { prompt: 'Uma pessoa fictícia quer comparar dois clubes de leitura, mas não informou cidade, horário nem custo. Escreva um pedido que primeiro esclareça no máximo duas informações e depois organize opções pelos mesmos critérios.', expected: 'O pedido deixa claro que cidade, horário ou custo não podem ser inventados e define uma comparação uniforme.', hint: 'Decida quais duas lacunas mais mudariam uma comparação útil e diga como a resposta deve sinalizar o que continuar faltando.' },
    quiz: [
      { question: 'O que torna um critério de resposta observável?', options: ['Permite conferir um comportamento ou formato específico.', 'Garante que o modelo sempre responderá corretamente.', 'Deixa o pedido mais longo mesmo sem relação com a tarefa.'], correctIndex: 0, explanation: 'Um critério permite comparar a resposta com algo explícito; não garante correção factual.' },
      { question: 'Uma informação importante não foi fornecida. Qual é uma resposta responsável?', options: ['Inventar um valor provável para manter o fluxo.', 'Perguntar, indicar a incerteza ou pedir uma fonte.', 'Escrever com mais confiança.'], correctIndex: 1, explanation: 'Lacunas devem ser esclarecidas ou marcadas, não preenchidas como fatos.' },
      { question: 'Por que comparar versões mudando um aspecto de cada vez?', options: ['Para observar melhor qual alteração coincide com uma diferença.', 'Para provar que um prompt é universal.', 'Para evitar conferir a resposta.'], correctIndex: 0, explanation: 'Uma comparação controlada ajuda a interpretar diferenças, mas não demonstra universalidade.' }
    ]
  }),

  'chat-ai-tutor': buildChatLesson({
    prerequisites: 'Faça Pedidos claros em um chat de IA. Nenhuma outra trilha é necessária.',
    prerequisiteLessons: ['chat-ai-first-prompts'],
    why: 'Um chat pode apoiar a aprendizagem, mas entregar uma resposta pronta pode esconder o que o aluno ainda não consegue fazer. Esta aula pratica previsão, pistas graduais, explicação com palavras próprias e transferência para um problema novo.',
    sections: [
      { title: 'Combine um papel de tutoria e uma regra de parada', paragraphs: [
        'Peça ao chat para atuar como tutor de um tema delimitado, perguntar o que você já sabe e esperar sua tentativa antes de explicar. Isso não muda o modelo nem garante qualidade; é uma orientação para a conversa atual.',
        'Defina que a primeira ajuda seja uma pergunta, depois uma pista e só então uma explicação. Você pode pedir uma pausa após cada pista para responder. Se a resposta chegar inteira, peça ao tutor que retome do ponto em que você parou e faça uma pergunta nova.'
      ] },
      { title: 'Tente explicar antes de consultar', paragraphs: [
        'Escolha um tema que possa discutir sem dados privados. Anote o que acha que acontece, envie sua explicação e peça que o chat aponte uma parte correta e uma dúvida concreta. Uma correção útil mostra qual ideia precisa ser revista, não apenas diz “certo” ou “errado”.',
        'Peça exemplos pequenos e verifique se eles realmente ilustram a regra. Se não entender a pista, diga qual palavra ou etapa ficou confusa. A tutoria é uma conversa: refine o pedido em vez de aceitar uma explicação que não consegue reproduzir.'
      ] },
      { title: 'Transfira a ideia para um caso diferente', paragraphs: [
        'Depois de estudar um exemplo, invente uma situação parecida, mas com elementos diferentes. Tente resolvê-la antes de pedir feedback. Repetir a definição não é o mesmo que aplicar a ideia em um caso novo.',
        'O quiz mede reconhecimento de conceitos. Sua própria explicação e uma tentativa diferente fornecem evidências mais úteis, mas continuam sendo autoavaliação; uma conversa não comprova domínio sozinha.'
      ] }
    ],
    example: {
      prompt: 'Seja meu tutor sobre diferença entre fato e opinião para iniciante. Faça uma pergunta por vez e espere minha resposta. Primeiro pergunte o que eu já entendo; se eu errar, dê apenas uma pista curta e peça uma nova tentativa. Depois da minha tentativa correta, peça que eu explique a ideia com minhas palavras e proponha um caso novo. Não entregue tudo de uma vez.',
      explanation: ['O tema e o nível inicial estão delimitados.', 'A regra de uma pergunta por vez permite participar antes de receber explicações.', 'Uma pista curta e uma nova tentativa mantêm apoio decrescente.', 'A explicação própria e o caso novo verificam transferência, não apenas memória.'],
      expected: 'A conversa deve esperar uma resposta antes de avançar. Se o chat entregar uma explicação completa, redirecione-o e continue com uma pergunta menor. Confira se a distinção entre afirmação verificável e avaliação pessoal aparece nos exemplos.'
    },
    guided: [
      { instruction: 'Antes de enviar, escreva em uma frase a diferença que você imagina existir entre fato e opinião e uma dúvida que tem.', result: 'Existe uma tentativa própria registrada antes da explicação do chat.' },
      { instruction: 'Envie o exemplo e responda à primeira pergunta sem pedir a solução. Se travar, solicite apenas uma pista.', result: 'O chat responde à tentativa com uma pergunta ou pista curta; a interação pode variar e deve ser redirecionada se revelar a solução inteira.' },
      { instruction: 'Explique a ideia sem copiar e peça um caso novo sobre uma página fictícia. Tente responder antes de pedir avaliação.', result: 'A aplicação usa elementos diferentes do exemplo e recebe feedback específico sobre a explicação.' }
    ],
    exercises: [
      { kind: 'Prever', task: 'Antes de iniciar uma tutoria sobre diferença entre opinião e fato, escreva uma classificação tentativa para “O filme dura duas horas e é emocionante” e diga o que o tutor deveria perguntar.', criteria: ['Registra a classificação tentativa antes da resposta do chat.', 'Reconhece que a frase pode conter uma afirmação verificável e uma avaliação pessoal.'], example: 'Entrada: frase fictícia composta → resultado a observar: separação entre duração verificável e opinião sobre o filme.', hints: ['Divida a frase em afirmações menores.', 'Pergunte que tipo de evidência poderia confirmar cada parte.'], expected: 'A previsão identifica que uma frase pode misturar fato e opinião; a resposta do chat é comparada sem assumir que todos os termos são puramente objetivos.', review: 'A revisão explica quais partes são verificáveis e quais dependem de avaliação, reconhecendo que contexto pode importar.', explanation: 'Decompor uma afirmação ajuda a escolher como verificar suas partes.' },
      { kind: 'Alterar', task: 'Peça ao chat que ensine o ciclo da água como tutor: faça uma pergunta por vez, aguarde a resposta, dê pista antes da explicação e finalize com um exemplo novo.', criteria: ['A instrução inclui espera, pistas graduais e exemplo de transferência.', 'O aluno registra uma tentativa antes da resposta explicativa.'], example: 'Entrada: tema “ciclo da água” → resultado a observar: pergunta inicial e espera pela resposta do aluno.', hints: ['Use regras observáveis para o comportamento do tutor.', 'Se receber a resposta completa, peça uma nova pergunta menor.'], expected: 'A primeira interação permite ao aluno tentar; o ciclo termina com uma explicação própria ou um caso novo.', review: 'Confira a sequência de interações, não apenas o texto da primeira resposta. Ajuste a instrução se ela pular a tentativa.', explanation: 'Uma regra de conversa bem definida torna o papel de tutor mais verificável.' },
      { kind: 'Construir', task: 'Escolha um conceito cotidiano que esteja aprendendo e peça uma mini-tutoria de três rodadas: pergunta, pista após sua tentativa e caso de transferência. Faça você as respostas.', criteria: ['Há três rodadas com participação antes da explicação.', 'O caso final muda o contexto do exemplo inicial.'], example: 'Entrada: conceito cotidiano escolhido → resultado a observar: questão, pista baseada na resposta e nova situação.', hints: ['Prefira um assunto que não dependa de informação pessoal.', 'Peça ao chat para apontar uma lacuna específica, não somente elogiar.'], expected: 'O aluno escreve as tentativas e o chat adapta a pista; a transferência usa cenário diferente.', review: 'Verifique se a terceira rodada realmente exige aplicação e se a pista responde ao que você escreveu.', explanation: 'A prática de recuperação e a transferência exigem mais que ler uma explicação.' },
      { kind: 'Investigar erro', task: 'O tutor respondeu imediatamente com uma explicação longa, embora você tenha pedido pistas. Registre o comportamento observado e envie uma correção mais específica para retomar a aula sem receber a resposta final.', criteria: ['Descreve o desvio em relação à regra combinada.', 'A nova instrução pede uma pergunta ou pista e espera a tentativa do aluno.'], example: 'Entrada: tutor antecipou a solução → resultado a observar: nova pergunta que devolve uma etapa ao aluno.', hints: ['Indique qual regra foi ignorada.', 'Peça um passo menor e uma pausa explícita após ele.'], expected: 'O tutor é redirecionado para uma pista e espera; se ainda responder por inteiro, o aluno pede uma pergunta mais delimitada.', review: 'O diagnóstico relata a expectativa e o que ocorreu antes de mudar uma instrução específica.', explanation: 'Registrar comportamento observado evita confundir intenção do prompt com o resultado real.' }
    ],
    mistakes: ['Pedir explicação e solução completas antes de tentar: anote sua previsão primeiro.', 'Aceitar elogio genérico como feedback: solicite um ponto específico da sua explicação.', 'Confundir repetição com transferência: use outro contexto e outros detalhes.', 'Tratar o chat como autoridade final sobre fatos; confirme conceitos importantes em fontes apropriadas.'],
    summary: ['Uma tutoria útil permite tentativa, pista, explicação e transferência.', 'Responda antes de pedir correção e peça feedback ligado ao que escreveu.', 'O progresso e o quiz não são prova independente de domínio.'],
    retry: { prompt: 'Peça uma tutoria sobre diferença entre clima e tempo meteorológico. Não receba definição inicial: peça que o tutor pergunte sua hipótese, dê uma pista após a resposta e finalize com um cenário novo.', expected: 'A conversa inicia com hipótese do aluno, usa uma pista vinculada a ela e verifica transferência em outro cenário.', hint: 'Inclua regra de esperar resposta e uma forma de agir se o tutor antecipar a explicação.' },
    quiz: [
      { question: 'Qual sequência favorece participação ativa?', options: ['Tentativa, pista, nova tentativa, explicação e transferência.', 'Solução completa antes de o aluno pensar.', 'Repetir a mesma resposta até parecer familiar.'], correctIndex: 0, explanation: 'A sequência oferece suporte gradual e exige uma tentativa do aluno.' },
      { question: 'O tutor respondeu por inteiro antes da sua tentativa. O que fazer?', options: ['Aceitar como prova de que aprendeu.', 'Redirecionar a conversa para uma pergunta ou pista menor.', 'Trocar de assunto sem registrar o ocorrido.'], correctIndex: 1, explanation: 'Uma instrução mais delimitada pode recuperar a participação, mas o resultado ainda deve ser observado.' },
      { question: 'O que ajuda a conferir transferência?', options: ['Aplicar o conceito a um caso novo depois de tentar sozinho.', 'Ler a mesma definição várias vezes.', 'Copiar uma resposta bem escrita.'], correctIndex: 0, explanation: 'Um cenário diferente exige aplicação além de reconhecer o exemplo.' }
    ]
  }),

  'chat-ai-skills': buildChatLesson({
    prerequisites: 'Faça Pedidos claros e Contexto, memória e privacidade. Aqui você cria um procedimento em texto; a configuração nativa será praticada depois.',
    prerequisiteLessons: ['chat-ai-first-prompts', 'chat-ai-context'],
    why: 'Uma instrução reutilizável pode dar consistência a tarefas repetidas no chat. O objetivo é desenhar um procedimento legível e testá-lo, sem confundi-lo com uma Skill instalada, um arquivo especial ou uma autorização para acessar ferramentas.',
    sections: [
      { title: 'O que significa uma instrução reutilizável', paragraphs: [
        'Neste curso, “skill” (habilidade ou procedimento reutilizável) é um roteiro que descreve quando usar uma orientação, quais passos seguir e que resultado produzir. Em uma plataforma, ela pode ser apenas texto colado na conversa ou um recurso próprio de instruções, se existir.',
        'Formatos específicos de fornecedor podem empacotar instruções e recursos adicionais. O conteúdo desta trilha é independente de plataforma: não exige criar arquivo, instalar extensão ou habilitar uma funcionalidade. Uma instrução não concede acesso a ferramentas, contas, dados ou permissões.'
      ] },
      { title: 'Escreva gatilho, passos, saída e limites', paragraphs: [
        'Descreva a tarefa que ativa o roteiro, as perguntas a fazer quando faltar contexto, os passos, o formato do resultado e situações em que deve parar ou pedir ajuda. Prefira regras que possam ser observadas. “Seja cuidadoso” é vago; “marque como pendente qualquer afirmação sem trecho de suporte” é mais conferível.',
        'Mantenha o procedimento curto e útil. Não o preencha com dados pessoais reais. Se depender de informação atual, peça fonte ou confirmação. Se um chat tiver instruções salvas, leia como elas são aplicadas antes de inserir material de estudo.'
      ] },
      { title: 'Teste e refine com exemplos diferentes', paragraphs: [
        'Cole o roteiro numa conversa nova ou use a opção de instruções da plataforma, caso queira experimentar. Primeiro use uma tarefa dentro do escopo; depois uma tarefa ambígua e outra fora dele. Observe se o roteiro faz perguntas, respeita os limites e informa quando não pode cumprir.',
        'Se o comportamento falhar, descreva o caso, altere uma regra e teste novamente. O resultado de três exemplos não prova robustez. Guarde o procedimento como texto comum apenas se a plataforma e sua própria política de privacidade permitirem.'
      ] }
    ],
    example: {
      prompt: 'Procedimento reutilizável para revisar um plano de estudos fictício. Use quando eu pedir revisão de um plano. Primeiro pergunte o objetivo e o tempo semanal, se faltarem. Depois organize as atividades por prioridade e duração. Marque suposições como sugestões. Se o pedido exigir dados pessoais ou uma decisão que não foi informada, pare e pergunte. Entregue uma tabela curta e termine com uma pergunta de confirmação.',
      explanation: ['O gatilho delimita quando o procedimento é aplicável.', 'Perguntas lidam com contexto ausente antes de recomendar.', 'Passos e formato tornam o resultado previsível sem fixar respostas exatas.', 'O limite define quando interromper e pedir confirmação.'],
      expected: 'Ao colar o texto antes de um pedido fictício, confira se o chat pergunta quando objetivo ou disponibilidade faltam, separa sugestões e apresenta tabela. A orientação é texto comum e não instala ferramenta nem dá acesso a dados.'
    },
    guided: [
      { instruction: 'Marque no exemplo qual frase é o gatilho, quais são os passos, o formato e o limite.', result: 'As quatro partes podem ser apontadas em frases distintas e avaliadas na conversa.' },
      { instruction: 'Cole o roteiro numa conversa nova e peça revisão de um plano fictício que informa objetivo, mas não informa tempo semanal.', result: 'O comportamento esperado é perguntar pelo dado faltante ou sinalizar a lacuna antes de sugerir duração.' },
      { instruction: 'Peça algo fora do escopo do roteiro e observe se o chat explica o limite em vez de fingir que tem uma função instalada.', result: 'A resposta informa que a instrução orienta texto da conversa e não cria acesso, recurso ou autorização.' }
    ],
    exercises: [
      { kind: 'Prever', task: 'Leia o procedimento do exemplo e preveja o que deveria acontecer se você pedir a revisão de um plano fictício sem informar quantas horas tem disponíveis.', criteria: ['Registra a previsão antes de testar.', 'Relaciona o resultado a uma regra explícita do procedimento.'], example: 'Entrada: plano sem tempo semanal → resultado a observar: pergunta sobre disponibilidade ou lacuna identificada.', hints: ['Localize a frase que descreve contexto ausente.', 'Não confunda sugestão de duração com dado fornecido.'], expected: 'A previsão aponta a pergunta ou a sinalização de falta de tempo e depois compara isso com a resposta observada.', review: 'A tentativa cita a regra que justificou a previsão e descreve o resultado real sem tratar uma resposta isolada como garantia.', explanation: 'Uma previsão ligada a uma regra torna o teste interpretável.' },
      { kind: 'Alterar', task: 'Adapte o exemplo para revisar a descrição fictícia de um livro: quando ativar, quais duas perguntas fazer se faltar informação e que saída curta produzir.', criteria: ['O novo gatilho corresponde à tarefa de revisar descrição.', 'Inclui perguntas, formato final e ao menos um limite explícito.'], example: 'Entrada: descrição de livro sem público-alvo → resultado a observar: pedido de esclarecimento antes de ajustar o tom.', hints: ['Mantenha objetivo, etapas e limites em linguagem que o chat possa seguir.', 'Evite inserir títulos ou dados de uma pessoa real.'], expected: 'O roteiro modificado indica quando usar, como lidar com lacunas, uma saída curta e quando parar.', review: 'Confira se cada parte é observável e se o roteiro não promete verificar fatos que não recebeu.', explanation: 'Adaptar um procedimento conserva a estrutura útil e troca somente o domínio.' },
      { kind: 'Construir', task: 'Crie um procedimento reutilizável para resumir um trecho fictício de aviso escolar: preservar informações do trecho, marcar lacunas, usar até quatro tópicos e perguntar antes de assumir público ou prazo.', criteria: ['Há gatilho, passos, formato e limite.', 'O chat não transforma informação ausente em afirmação.'], example: 'Entrada: trecho fictício sem prazo → resultado a observar: resumo de até quatro tópicos com prazo marcado como ausente.', hints: ['Escreva uma regra para afirmações sem suporte.', 'Teste com um trecho que omita deliberadamente uma informação.'], expected: 'O procedimento produzido permite localizar as quatro partes e o teste conserva a lacuna do exemplo.', review: 'Revise como leitor: outra pessoa conseguiria saber quando ativar o roteiro e como verificar o resultado?', explanation: 'Um procedimento deve orientar uma tarefa sem esconder suas condições e limites.' },
      { kind: 'Investigar erro', task: 'O procedimento pediu uma pergunta quando havia lacuna, mas o chat presumiu um prazo. Registre a divergência, ajuste uma regra e repita o caso com o mesmo dado fictício.', criteria: ['Descreve a regra e o comportamento divergente.', 'Altera uma instrução específica e compara novamente o mesmo caso.'], example: 'Entrada: trecho sem prazo → resultado a observar após ajuste: prazo permanece ausente ou vira pergunta.', hints: ['Torne explícito que informação ausente não pode ser completada por suposição.', 'Não altere o cenário durante a comparação.'], expected: 'O aluno documenta a divergência e observa se a regra mais explícita muda a resposta; uma tentativa não demonstra confiabilidade geral.', review: 'A correção trata a causa observada e mantém o cenário, permitindo uma comparação mais justa.', explanation: 'Um procedimento reutilizável melhora por casos observados e critérios claros, não por nomes ou formatação sofisticada.' }
    ],
    mistakes: ['Chamar qualquer texto colado de Skill instalada: nomes e formatos variam entre plataformas.', 'Supor que instruções concedem ferramentas ou permissões: elas não substituem autorização do serviço.', 'Criar um roteiro longo com regras conflitantes: reduza e teste uma condição por vez.', 'Testar somente uma solicitação fácil: inclua ambiguidade, ausência de dado e fora de escopo.'],
    summary: ['Uma instrução reutilizável pode ser texto simples dentro do chat.', 'Inclua gatilho, contexto a perguntar, passos, formato, limites e critérios.', 'Teste exemplos diferentes; uma instrução não instala ferramenta nem concede acesso.'],
    retry: { prompt: 'Crie um procedimento de chat para transformar um aviso fictício de biblioteca em resumo para visitantes: no máximo quatro tópicos, informações ausentes permanecem como lacunas e regras de empréstimo devem ser citadas do trecho fornecido.', expected: 'O roteiro define quando usar, formato, regra de evidência e comportamento para dados ausentes.', hint: 'Separe o procedimento do aviso usado como entrada e evite supor políticas da biblioteca.' },
    quiz: [
      { question: 'Qual conjunto ajuda outra pessoa a reutilizar um procedimento?', options: ['Gatilho, passos, formato e limites.', 'Um nome chamativo e nenhuma regra.', 'Uma promessa de que sempre funcionará.'], correctIndex: 0, explanation: 'As partes tornam o uso e a avaliação mais explícitos.' },
      { question: 'Colar uma instrução na conversa faz o quê?', options: ['Orienta a conversa; não instala ferramenta nem concede permissão por si só.', 'Autoriza acesso a todas as contas conectadas.', 'Garante resposta correta em toda plataforma.'], correctIndex: 0, explanation: 'A orientação em texto não muda permissões nem capacidades do serviço.' },
      { question: 'Como investigar uma falha no procedimento?', options: ['Registrar o caso, ajustar uma regra e repetir cenário comparável.', 'Mudar todas as regras e concluir pela primeira resposta.', 'Esconder o caso que não funcionou.'], correctIndex: 0, explanation: 'Uma mudança específica e comparação controlada ajudam a localizar o efeito.' }
    ]
  }),

  'chat-ai-evidence': buildChatLesson({
    prerequisites: 'Faça Pedidos claros e Arquivos, capturas e leitura conferida. Use trechos fictícios ou fontes públicas.',
    prerequisiteLessons: ['chat-ai-first-prompts', 'chat-ai-files'],
    why: 'Uma resposta de chat pode misturar informações fornecidas, conhecimento desatualizado e suposições. Aprender a pedir evidências e verificar afirmações reduz o risco de aceitar referências inventadas ou fontes que não sustentam a conclusão.',
    sections: [
      { title: 'Separar afirmação de evidência', paragraphs: [
        'Uma afirmação é algo que pode ser verificado, como a data de um evento ou uma regra de devolução. Evidência é um trecho ou fonte identificável que dá suporte à afirmação. Uma citação exibida pelo chat ainda precisa ser aberta e comparada com o texto original.',
        'Peça uma tabela com afirmação, trecho de suporte, origem e status. Se não houver suporte, registre “não encontrado” em vez de preencher com uma resposta plausível. Isso vale mesmo quando a plataforma diz ter feito uma busca.'
      ] },
      { title: 'Busca web e arquivos são recursos opcionais', paragraphs: [
        'Alguns chats oferecem busca na web, anexos ou citações; outros não. Interface, disponibilidade, limites e forma de acesso mudam por serviço. Esta aula funciona sem nenhum desses recursos: os exercícios trazem trechos fictícios para colar no chat.',
        'Quando usar busca, confirme data, autor, domínio e conteúdo no site de origem. Quando usar um trecho fornecido, não o apresente como documento real. A referência precisa apoiar a frase específica, não apenas falar do mesmo assunto.'
      ] },
      { title: 'Lidar com conflito e ausência de resposta', paragraphs: [
        'Se duas fontes discordam, compare data, escopo e autoridade. Mostre o conflito em vez de escolher silenciosamente a fonte que combina com a conclusão desejada. Pode ser necessário consultar a publicação mais recente ou a entidade responsável.',
        'Uma resposta honesta pode dizer que a evidência não basta. Para decisões importantes, confira diretamente fontes oficiais ou procure a pessoa responsável. Uma atividade de chat não é verificação profissional nem garantia de atualidade.'
      ] }
    ],
    example: {
      prompt: 'Analise somente este trecho fictício: “Biblioteca Aurora: empréstimos por 14 dias. A renovação depende de disponibilidade.” Pergunta: qual é o prazo de empréstimo e a renovação é garantida? Responda em tabela com afirmação, trecho exato de suporte e limite do que o trecho permite concluir. Se faltar evidência, escreva “não informado”. Não use busca externa nem complete o cenário.',
      explanation: ['O trecho está identificado como fictício e é a única fonte permitida.', 'A resposta deve separar duas afirmações.', 'A expressão “depende de disponibilidade” não promete renovação garantida.', 'O formato inclui trecho e limite de conclusão para cada resposta.'],
      expected: 'O prazo de 14 dias está sustentado. A renovação garantida não está sustentada; o trecho diz que depende de disponibilidade. Não se conclui qual disponibilidade existe ou como ela é medida.'
    },
    guided: [
      { instruction: 'Antes de enviar, escreva sua própria resposta às duas perguntas e copie o trecho que usaria como suporte.', result: 'Há uma resposta e evidência identificadas antes de consultar o chat.' },
      { instruction: 'Cole o exemplo e o trecho fictício. Compare cada linha da tabela com as palavras exatas da fonte.', result: 'Prazo e renovação são avaliados separadamente; o limite do trecho fica visível.' },
      { instruction: 'Troque “depende de disponibilidade” por “renovação permitida uma vez quando não há reserva”. Preveja o que muda e confira se o chat distingue regra e garantia.', result: 'A resposta reflete a mudança literal sem inventar que qualquer renovação ocorrerá.' }
    ],
    exercises: [
      { kind: 'Prever', task: 'Com o trecho fictício do exemplo, marque antes do chat quais duas afirmações estão sustentadas e qual conclusão não é autorizada.', criteria: ['A previsão cita o trecho que sustenta o prazo.', 'Não conclui que toda renovação será aprovada.'], example: 'Entrada: prazo de 14 dias e renovação conforme disponibilidade → resultado a observar: prazo informado; garantia de renovação ausente.', hints: ['Compare a pergunta a cada frase da fonte.', 'Distinga possibilidade condicionada de garantia.'], expected: 'O prazo é diretamente apoiado; a aprovação de renovação não é garantida pelo texto.', review: 'A resposta separa as afirmações e aponta o limite da evidência antes de consultar o modelo.', explanation: 'Uma fonte pode sustentar uma parte da resposta e não a conclusão completa.' },
      { kind: 'Alterar', task: 'Adicione um segundo trecho fictício: “Aviso de 2 de maio: durante o inventário, os empréstimos passam a 7 dias.” Peça ao chat que mostre a diferença de data e evite decidir sem saber o período do inventário.', criteria: ['Registra os dois trechos e suas datas.', 'Sinaliza conflito ou escopo temporal e não presume quando o inventário ocorre.'], example: 'Entrada: regra geral de 14 dias e aviso datado de 7 dias → resultado a observar: diferença temporal destacada, vigência a confirmar.', hints: ['Pergunte se as fontes falam do mesmo período.', 'Não descarte um trecho só por ser menos conveniente.'], expected: 'A resposta mostra que há regras distintas e que a vigência depende de informação de período que não foi dada.', review: 'Confira a relação entre data do aviso, regra geral e período desconhecido; não atribua prioridade sem justificativa.', explanation: 'Conflitos de fonte exigem contexto e autoridade, não apenas uma citação.' },
      { kind: 'Construir', task: 'Crie uma pergunta de conferência para o trecho fictício “O encontro acontece na quinta-feira. O local será anunciado depois.” Peça resposta sobre dia, endereço e informação ausente.', criteria: ['Exige suporte textual para cada campo.', 'Registra que o endereço não aparece no trecho.'], example: 'Entrada: aviso sem endereço → resultado a observar: quinta-feira apoiada; endereço marcado não informado.', hints: ['Peça uma linha por afirmação.', 'Não permita inferir endereço pelo nome do evento.'], expected: 'A saída separa o dia confirmado do endereço ausente e cita as palavras do trecho.', review: 'Verifique se o chat evita completar o endereço com conhecimento externo ou suposição.', explanation: 'Um contrato de resposta que prevê “não informado” facilita a abstenção.' },
      { kind: 'Investigar erro', task: 'O chat inventou que o encontro começa às 19h, embora o trecho não informe horário. Identifique a afirmação, solicite origem verificável ou abstenção e compare com a fonte original.', criteria: ['Localiza a informação não fornecida.', 'Pede suporte específico e confere se a fonte o contém.'], example: 'Entrada: aviso sem horário → resultado a observar: horário ausente até uma fonte confirmá-lo.', hints: ['Não aceite “encontrei na internet” sem referência conferível.', 'Abra a origem e procure o trecho exato.'], expected: 'O horário é marcado como não informado, a menos que uma fonte real, identificável e pertinente o sustente.', review: 'O diagnóstico aponta a afirmação inventada, a fonte que deveria sustentá-la e o que a comparação mostrou.', explanation: 'Citações e respostas precisam corresponder ao documento que o leitor consegue consultar.' }
    ],
    mistakes: ['Confundir uma citação com prova sem abrir a fonte.', 'Usar uma fonte sobre o mesmo tema que não confirma a afirmação específica.', 'Escolher entre fontes conflitantes sem comparar data, escopo e autoridade.', 'Usar busca web como pré-requisito: os exemplos fornecidos permitem praticar sem esse recurso.'],
    summary: ['Separe cada afirmação do trecho que a sustenta.', 'Confirme referências diretamente na fonte e observe data e escopo.', 'Quando falta evidência, diga isso; recursos de busca variam entre plataformas.'],
    retry: { prompt: 'Use o aviso fictício “A oficina ocorre em agosto. Inscrições abrem em data a confirmar.” Peça ao chat a época da oficina e a data de abertura, com suporte textual para cada uma.', expected: 'Agosto está indicado; a data de abertura deve permanecer não informada.', hint: 'Avalie cada afirmação separadamente e impeça que uma resposta plausível substitua o trecho.' },
    quiz: [
      { question: 'O chat mostra uma citação. Qual é o próximo passo?', options: ['Abrir a fonte e conferir se sustenta a afirmação.', 'Confiar na formatação da citação.', 'Assumir que a fonte é atual.'], correctIndex: 0, explanation: 'A citação deve ser conferida no conteúdo original e no contexto.' },
      { question: 'Duas fontes fictícias discordam. O que comparar?', options: ['Data, escopo e autoridade de cada fonte.', 'Qual delas parece mais convincente.', 'Somente o tamanho do texto.'], correctIndex: 0, explanation: 'Esses elementos ajudam a determinar se o conflito é temporal, contextual ou de autoridade.' },
      { question: 'Se o trecho não informa um endereço, a resposta deve...', options: ['Marcar endereço como não informado.', 'Inventar o mais provável.', 'Usar a cidade do usuário sem perguntar.'], correctIndex: 0, explanation: 'Ausência de evidência deve permanecer visível.' }
    ]
  }),

  'chat-ai-bots': buildChatLesson({
    prerequisites: 'Faça Skills e instruções reutilizáveis e Conferir evidências. A atividade inicial desenha e testa uma conversa; não instala um serviço.',
    prerequisiteLessons: ['chat-ai-skills', 'chat-ai-evidence'],
    why: 'Um bot de conversa (chatbot) bem delimitado não precisa responder tudo. Desenhar intenções, perguntas de esclarecimento, limites e encaminhamentos ajuda a prever comportamentos antes de qualquer construção técnica; aqui toda a prática acontece como conversa e planejamento em texto.',
    sections: [
      { title: 'Defina público, tarefa e escopo', paragraphs: [
        'Descreva para quem o bot fictício foi pensado, quais perguntas atende e quais não atende. Um bot de uma biblioteca pode informar como localizar horários num aviso fornecido, mas não deve inventar disponibilidade de exemplares sem consulta a uma fonte.',
        'Declare o que o bot não pode fazer e o que exige uma pessoa responsável. Não use nome, endereço, histórico de empréstimo ou outro dado de clientes reais. O cenário desta aula é inventado e não será conectado a atendimento.'
      ] },
      { title: 'Modele os caminhos da conversa', paragraphs: [
        'Para cada intenção, registre exemplo de pergunta, dado que falta, pergunta de esclarecimento e resposta permitida. Inclua caso conhecido, ambíguo, fora do escopo e sem evidência. Uma rota de encaminhamento evita forçar uma resposta onde as regras não bastam.',
        'Um roteiro de conversa é um modelo conceitual. Pedir ao chat que o escreva não implanta um bot, não cria integração e não garante que um sistema real siga essas regras.'
      ] },
      { title: 'Faça uma simulação por mensagens', paragraphs: [
        'Peça ao chat para revisar os caminhos e, depois, conduza manualmente os cenários de teste. Registre a mensagem do usuário, a resposta esperada, a resposta observada e se o limite foi respeitado. Use uma conversa separada para a atividade.',
        'Se o modelo ignorar o roteiro, descreva a diferença e melhore uma regra. A simulação ajuda a encontrar casos esquecidos, mas não substitui testes de um bot implementado.'
      ] }
    ],
    example: {
      prompt: 'Desenhe um roteiro para um bot fictício da Biblioteca Horizonte. Escopo: explicar informações contidas no aviso de funcionamento que eu fornecer. Se o aviso não responder, pedir esclarecimento ou dizer que a informação não consta. Não afirmar disponibilidade de livros, não coletar dados de visitantes e encaminhar regras não cobertas para um bibliotecário. Mostre caminhos para pergunta respondida, ambígua, fora do escopo e sem evidência.',
      explanation: ['O público e o contexto estão definidos como fictícios.', 'As respostas dependem do aviso fornecido e têm uma regra para lacunas.', 'A disponibilidade de livros e coleta de dados foram excluídas.', 'Quatro caminhos mostram que o bot pode perguntar ou encaminhar.'],
      expected: 'O roteiro apresenta quatro cenários distinguíveis, explica o limite da fonte e encaminha o que não consegue responder. Ele não configura um serviço nem consulta catálogo real.'
    },
    guided: [
      { instruction: 'Antes de pedir o roteiro, anote uma pergunta coberta pelo aviso e outra que dependa de catálogo ou decisão humana.', result: 'O aluno diferencia a informação textual disponível da operação fora do cenário.' },
      { instruction: 'Peça ao chat os quatro caminhos e confira se há mensagem esperada para ambiguidade e ausência de evidência.', result: 'Os caminhos incluem resposta apoiada, esclarecimento, limite de escopo e encaminhamento.' },
      { instruction: 'Simule “Qual o horário do sábado?” com aviso fictício que não menciona sábado. Registre o que esperava e o que ocorreu.', result: 'A saída apropriada marca informação ausente ou pergunta; não inventa horário.' }
    ],
    exercises: [
      { kind: 'Prever', task: 'Antes do chat, classifique a pergunta “Vocês têm o livro O Jardim Azul disponível hoje?” no bot da biblioteca fictícia, sabendo que ele só recebeu um aviso de horário.', criteria: ['Identifica que disponibilidade está fora do suporte disponível.', 'Prevê pergunta sobre catálogo ou encaminhamento, sem afirmar estoque.'], example: 'Entrada: pergunta de disponibilidade, fonte apenas de horário → resultado a observar: limite e encaminhamento.', hints: ['Compare a pergunta ao escopo e aos dados recebidos.', 'Disponibilidade muda e exigiria fonte apropriada.'], expected: 'A pergunta não é respondida como disponibilidade confirmada; o roteiro solicita fonte/consulta ou direciona a uma pessoa.', review: 'A classificação cita o limite da fonte e descreve uma resposta segura antes de ver o chat.', explanation: 'Escopo explícito impede que uma pergunta parecida com o domínio vire uma afirmação sem suporte.' },
      { kind: 'Alterar', task: 'Adapte o roteiro da biblioteca fictícia para um centro comunitário que informa somente horários de atividades publicados em um cartaz. Inclua uma resposta para cartaz sem data.', criteria: ['Declara público, fonte e assunto atendido.', 'Cartaz sem data provoca pergunta ou alerta de validade, não certeza de vigência.'], example: 'Entrada: cartaz sem data → resultado a observar: bot pede confirmação de atualidade.', hints: ['Defina qual material é a fonte.', 'Diferencie “está escrito no cartaz” de “está acontecendo hoje”.'], expected: 'O roteiro responde sobre o texto do cartaz e sinaliza quando sua validade não pode ser inferida.', review: 'Confira se a redação distingue conteúdo documental de situação atual.', explanation: 'Datas e atualidade são parte do contexto de uma resposta operacional.' },
      { kind: 'Construir', task: 'Peça ao chat um roteiro de bot fictício para responder dúvidas sobre um clube de leitura, incluindo intenção conhecida, pedido ambíguo, assunto fora do escopo e pedido que requer contato humano.', criteria: ['Os quatro caminhos têm uma resposta ou ação observável.', 'O limite e o encaminhamento estão claros.'], example: 'Entrada: “quero participar” sem informar grupo → resultado a observar: pergunta de esclarecimento em vez de escolha arbitrária.', hints: ['Escolha uma pergunta de esclarecimento que reduza a ambiguidade.', 'Não peça dados pessoais; use detalhes inventados.'], expected: 'O roteiro contempla os quatro tipos e deixa explícito o que não será respondido.', review: 'Teste cada caminho com uma mensagem independente e verifique a ação esperada.', explanation: 'Um bot útil tem resposta de reserva e saída segura, além do caminho ideal.' },
      { kind: 'Investigar erro', task: 'Na simulação, o bot respondeu que um livro está disponível apesar de não receber catálogo. Identifique a afirmação sem suporte, ajuste o limite do roteiro e repita o mesmo teste.', criteria: ['Registra entrada, resposta observada e comportamento esperado.', 'A regra revisada proíbe afirmar disponibilidade sem fonte e define encaminhamento.'], example: 'Entrada: disponibilidade sem catálogo → resultado a observar: não confirmado e direcionado para consulta.', hints: ['Corrija a regra relacionada à fonte de estoque.', 'Mantenha a mensagem de teste para comparar antes e depois.'], expected: 'O novo roteiro trata disponibilidade como desconhecida e encaminha; a comparação documenta a simulação, não um sistema de produção.', review: 'A análise descreve a divergência e a mudança específica sem dizer que o bot foi implantado.', explanation: 'Um roteiro em conversa não demonstra segurança operacional nem consulta real ao catálogo.' }
    ],
    mistakes: ['Definir o bot como capaz de “responder tudo”: estabeleça assuntos e fontes.', 'Tratar o roteiro gerado como chatbot implantado: a aula só produz uma simulação textual.', 'Inventar disponibilidade ou regras sem fonte: pergunte ou encaminhe.', 'Coletar exemplos reais de clientes: os exercícios usam exclusivamente dados fictícios.'],
    summary: ['Defina público, assunto, fonte, limites e encaminhamento.', 'Teste caminhos normais, ambíguos, sem evidência e fora do escopo.', 'Uma conversa que descreve um bot não instala nem valida um sistema real.'],
    retry: { prompt: 'Desenhe caminhos para um bot fictício de um jardim comunitário que só pode responder com base em um calendário fornecido. Inclua evento confirmado, data ausente, dúvida de segurança e pergunta fora do escopo.', expected: 'O roteiro usa o calendário como fonte, marca lacunas e encaminha a dúvida de segurança ou assunto não coberto.', hint: 'Especifique o que o bot deve fazer antes de afirmar que um evento ocorrerá.' },
    quiz: [
      { question: 'O bot recebeu somente um aviso de horário. Pode afirmar a disponibilidade de um livro?', options: ['Não, precisa de fonte de catálogo ou encaminhar.', 'Sim, porque horário e estoque são da mesma biblioteca.', 'Sim, se responder com confiança.'], correctIndex: 0, explanation: 'A fonte disponível não sustenta informações de estoque.' },
      { question: 'Quais caminhos vale incluir num roteiro de bot?', options: ['Conhecido, ambíguo, fora de escopo e sem evidência.', 'Somente a pergunta mais comum.', 'Apenas respostas longas.'], correctIndex: 0, explanation: 'Esses caminhos expõem lacunas e saídas seguras.' },
      { question: 'Uma simulação de conversa em chat comprova o quê?', options: ['Ajuda a revisar um roteiro, mas não implanta ou valida o bot real.', 'Prova que integrações e autorização estão seguras.', 'Garante o comportamento de todos os modelos.'], correctIndex: 0, explanation: 'A simulação é conceitual e não exercita um sistema implantado.' }
    ]
  }),

  'chat-ai-agents': buildChatLesson({
    prerequisites: 'Faça Desenhar um bot e Configurar um assistente. Nesta aula você simula delegação em texto; conexões reais são estudadas no módulo avançado.',
    prerequisiteLessons: ['chat-ai-bots', 'chat-ai-custom-bot'],
    why: 'A palavra “agente” é usada para diferentes capacidades. Esta aula separa uma conversa comum de um sistema que pode selecionar ferramentas ou delegar etapas, e ensina a pedir planos sem autorizar efeitos externos.',
    sections: [
      { title: 'Conversa, ferramenta e agente são conceitos diferentes', paragraphs: [
        'Uma conversa comum troca mensagens. Uma ferramenta permite que um sistema execute uma operação definida, como consultar uma fonte ou alterar um recurso. Um agente pode combinar modelo, instruções, ferramentas e controle de fluxo para executar etapas de uma tarefa.',
        'Essas definições variam conforme produto e arquitetura. Uma interface com o rótulo “agent” pode ter capacidades diferentes; uma conversa sem ferramentas pode apenas descrever um plano. Use a documentação da plataforma para saber o que realmente está habilitado.'
      ] },
      { title: 'Planejar não é executar', paragraphs: [
        'Peça que o chat liste objetivo, dados necessários, etapas, ferramenta proposta, efeito possível, risco e ponto de confirmação. Trate essa lista como plano a revisar. Não conecte conta, e-mail, arquivos privados ou serviços externos nesta atividade.',
        'Aprovação precisa ser explícita e informada. Uma instrução genérica como “resolva tudo” não é autorização suficiente para enviar mensagem, publicar conteúdo, alterar arquivo, gastar dinheiro ou mudar uma conta.'
      ] },
      { title: 'Dividir trabalho somente quando ajuda', paragraphs: [
        'Delegar pode dividir uma tarefa entre especialistas ou manter um agente coordenador no controle. Cada passagem acrescenta contexto e possíveis falhas. Para uma tarefa simples, uma só conversa costuma ser mais fácil de revisar.',
        'Descreva quem prepara cada parte, qual resultado retorna e quem confere antes de seguir. Em sistemas reais, identidade, permissões, limites e registro de ações são controles próprios; a conversa simulada desta aula não os implementa.'
      ] }
    ],
    example: {
      prompt: 'Planeje uma viagem de estudo totalmente fictícia para três locais, sem executar nenhuma ação externa. Antes de propor qualquer etapa, liste informações ausentes, riscos, possíveis ferramentas em termos gerais e efeitos que exigiriam minha confirmação. Entregue somente um plano para revisão; não acesse contas, não faça reservas e não envie mensagens.',
      explanation: ['A tarefa diz que o cenário é fictício.', 'O pedido limita a resposta a um plano.', 'Ferramentas e efeitos são discutidos sem serem conectados.', 'A confirmação fica antes de qualquer ação externa.'],
      expected: 'A resposta lista dependências e efeitos que exigiriam confirmação, mas não realiza reserva ou contato. Se a interface oferecer modo de agente, mantenha ferramentas desconectadas e prefira a conversa textual.'
    },
    guided: [
      { instruction: 'Antes de enviar, identifique um efeito reversível e outro de consequência externa que o plano poderia propor.', result: 'Os efeitos são reconhecidos e separados do texto de planejamento.' },
      { instruction: 'Peça ao chat somente um plano e observe se ele distingue dados necessários, ferramenta e aprovação.', result: 'O plano propõe passos e marca ações externas para revisão; ele não foi executado.' },
      { instruction: 'Peça que divida a pesquisa fictícia em duas partes e indique como um coordenador revisaria ambas antes de compor o resultado.', result: 'Cada parte tem saída delimitada e um responsável por conferir o conjunto antes de seguir.' }
    ],
    exercises: [
      { kind: 'Prever', task: 'Antes de enviar, classifique as ações “listar opções de estudo” e “matricular em um curso pago” como texto/plano ou efeito externo que requer confirmação.', criteria: ['Distingue geração de plano de alteração de conta ou gasto.', 'Registra a previsão antes de consultar o chat.'], example: 'Entrada: lista informativa e matrícula paga → resultado a observar: primeira pode ser plano; segunda exige autorização e confirmação explícitas.', hints: ['Pergunte se a ação altera sistema, envia algo ou gasta recursos.', 'Uma resposta de chat não cria autorização.'], expected: 'A matrícula é identificada como efeito externo com consequência; a lista pode ser apenas informação, sujeita a verificação.', review: 'A justificativa se baseia no efeito da ação, não no rótulo “agente”.', explanation: 'Classificar efeitos ajuda a definir controles antes de delegar.' },
      { kind: 'Alterar', task: 'Peça ao chat um plano para organizar uma feira fictícia e acrescente uma etapa de aprovação humana antes de publicar convite ou reservar local.', criteria: ['Plano identifica ações com efeito externo.', 'Aprovação ocorre antes de publicar ou reservar e pode ser negada.'], example: 'Entrada: convite e local ainda não autorizados → resultado a observar: revisão explícita antes da ação.', hints: ['Descreva a consequência de cada ação.', 'Não aceite a confirmação posterior ao efeito.'], expected: 'O plano aguarda aprovação informada antes de qualquer publicação ou reserva e oferece parar sem executar.', review: 'Confira se a etapa de aprovação antecede cada efeito, não somente a execução final.', explanation: 'Uma revisão posterior não impede o efeito que já aconteceu.' },
      { kind: 'Construir', task: 'Simule planejamento para comparar três cursos fictícios: peça etapas, informação a confirmar, resultado de cada etapa e revisão final; não permita inscrição nem contato com os cursos.', criteria: ['A tarefa se limita a dados fictícios e comparação.', 'Há pontos de revisão antes de qualquer inscrição ou contato.'], example: 'Entrada: cursos fictícios sem preço confirmado → resultado a observar: comparação marca preço como pendente e não matricula.', hints: ['Use campos que podem ficar pendentes.', 'Peça que o plano diga explicitamente o que não foi feito.'], expected: 'O plano usa informações inventadas, destaca lacunas e não executa inscrição ou contato.', review: 'Compare o escopo solicitado com cada etapa proposta e retire qualquer ação fora do plano.', explanation: 'A delimitação operacional torna visível a diferença entre orientar e agir.' },
      { kind: 'Investigar erro', task: 'O chat incluiu “enviar convite para os participantes” como etapa automática. Registre o efeito, os dados que faltam e uma regra de aprovação anterior ao envio.', criteria: ['Reconhece que enviar mensagem afeta terceiros.', 'Pede confirmação prévia com destinatários e conteúdo revisados.'], example: 'Entrada: etapa de envio sugerida → resultado a observar: plano aguarda revisão; nenhuma mensagem é enviada.', hints: ['Descreva o que pode acontecer depois do envio.', 'A aprovação precisa vir antes de sair do ambiente de estudo.'], expected: 'O plano é revisado para remover envio automático e solicitar confirmação específica antes de qualquer mensagem.', review: 'O diagnóstico identifica efeito, público, conteúdo e ponto de parada; nenhuma ação ocorreu na atividade.', explanation: 'A revisão de um plano não deve ser confundida com execução de uma integração.' }
    ],
    mistakes: ['Achar que qualquer resposta do chat executa ferramentas: verifique a capacidade concreta na interface.', 'Usar “faça tudo” sem listar efeitos ou pontos de aprovação.', 'Delegar etapas sem definir entradas, saídas e revisão do resultado.', 'Conectar contas ou dados reais na atividade: o exercício é um planejamento fictício.'],
    summary: ['Agentes podem combinar instruções, ferramentas e controle de fluxo; produtos variam.', 'Um plano não é uma execução e não substitui autorização específica.', 'Delegue com escopo e revisão; para tarefas simples, mais agentes podem só acrescentar complexidade.'],
    retry: { prompt: 'Planeje a atualização de um calendário fictício de estudos. Liste dados ausentes e marque “alterar o calendário compartilhado” como ação bloqueada até alguém revisar conteúdo e destinatários.', expected: 'O plano distingue proposta de alteração efetiva e exige aprovação antes de editar o calendário.', hint: 'Indique qual etapa apenas prepara uma proposta e qual poderia afetar outras pessoas.' },
    quiz: [
      { question: 'O que define melhor um agente em sentido geral?', options: ['Um sistema que pode combinar modelo, instruções, ferramentas e fluxo de execução.', 'Qualquer conversa que produza resposta longa.', 'Uma garantia de que uma tarefa será concluída corretamente.'], correctIndex: 0, explanation: 'A composição exata depende do sistema e de suas capacidades.' },
      { question: 'Quando deve ocorrer confirmação para enviar uma mensagem?', options: ['Antes do envio, com conteúdo e destinatários revisados.', 'Depois que a mensagem sair.', 'Não é necessária se o plano parecer razoável.'], correctIndex: 0, explanation: 'A aprovação informada deve preceder o efeito externo.' },
      { question: 'Quando dividir uma tarefa entre agentes?', options: ['Quando a divisão tem escopo, saídas e revisão claros e traz benefício.', 'Sempre, pois mais agentes garantem qualidade.', 'Nunca, mesmo quando o trabalho é independente.'], correctIndex: 0, explanation: 'Delegação tem custo de coordenação e deve servir à tarefa.' }
    ]
  }),

  'chat-ai-evaluation': buildChatLesson({
    prerequisites: 'Faça Bots, Configurar um assistente e Agentes. Este é um checkpoint intermediário; as aplicações profissionais e a prova avançada vêm a seguir.',
    prerequisiteLessons: ['chat-ai-bots', 'chat-ai-custom-bot', 'chat-ai-agents'],
    why: 'A qualidade de um bot ou assistente precisa ser avaliada em casos diversos, incluindo falhas, ambiguidade e falta de evidência. Este checkpoint intermediário integra orientação reutilizável, desenho de bot, revisão de respostas e cuidado com dados antes das aplicações profissionais e do módulo avançado.',
    sections: [
      { title: 'Transforme expectativas em critérios', paragraphs: [
        'Escolha o que uma resposta precisa fazer: responder com suporte, pedir esclarecimento, respeitar o escopo, abster-se quando falta evidência e proteger informações. Cada critério precisa corresponder a um comportamento observável.',
        'Monte exemplos que representem situações diferentes. Uma coleção variada é mais informativa que repetir a mesma pergunta com pequenas mudanças. Guarde alguns casos para uma segunda rodada, em vez de ajustar o roteiro somente para os exemplos que já viu.'
      ] },
      { title: 'Procure falhas e casos que devem parar', paragraphs: [
        'Inclua uma solicitação normal, uma ambígua, uma fora do escopo, uma sem informação suficiente e uma tentativa de obter dado que o bot não deve pedir. Registre entrada, resposta esperada, resposta observada, evidência e decisão de revisão.',
        'Se uma resposta falhar, ajuste uma regra e repita o caso original. Depois, teste uma situação diferente para observar se a mudança trouxe um novo problema. Uma resposta melhor em uma conversa não prova melhoria geral.'
      ] },
      { title: 'Proteja informações e explique os limites', paragraphs: [
        'Use nomes, contatos, documentos, horários e cenários inventados. Não cole segredos, credenciais, dados pessoais ou conteúdo confidencial. Configurações de privacidade e retenção variam entre plataformas; consulte as informações do serviço antes de usar qualquer dado real.',
        'Uma avaliação manual em chat é uma atividade formativa, não auditoria, teste de segurança ou comprovação de que o sistema está pronto para uso real. Explique quais casos foram testados, quais não foram e o que dependeria de um sistema implantado.'
      ] }
    ],
    example: {
      prompt: 'Avalie este bot fictício de apoio ao estudo. Escopo: resumir somente trechos que eu fornecer, em até três tópicos; se faltar a resposta, dizer “não consta no material”; não coletar dados pessoais. Crie uma tabela para cinco testes: pergunta respondida pelo trecho, pergunta ambígua, pergunta fora do escopo, informação ausente e pedido de dado pessoal. Mostre comportamento esperado antes de simular cada caso. Não use dados reais nem ferramentas externas.',
      explanation: ['O escopo e os limites podem ser verificados em cada teste.', 'Os cinco casos exercitam comportamentos distintos.', 'A tabela registra a expectativa antes de observar a resposta.', 'Dados fictícios evitam inserir informação real no chat.'],
      expected: 'Cada caso tem uma entrada fictícia, uma expectativa e um campo para resposta observada. A resposta não prova um bot implementado; o aluno registra falhas e uma limitação ainda pendente.'
    },
    guided: [
      { instruction: 'Antes de pedir casos ao chat, escreva os cinco comportamentos que quer avaliar e a regra de parada para dados pessoais.', result: 'A expectativa está registrada antes da geração dos testes.' },
      { instruction: 'Peça os cinco casos e revise se cada um realmente exercita um comportamento diferente do escopo.', result: 'A coleção inclui cobertura normal, ambiguidade, fora de escopo, falta de evidência e privacidade.' },
      { instruction: 'Execute a simulação textual com entradas inventadas, marque aprovado ou falhou e ajuste uma única regra.', result: 'A tabela documenta o antes/depois e mantém uma limitação explícita.' }
    ],
    exercises: [
      { kind: 'Prever', task: 'Antes de pedir uma resposta ao bot fictício, anote o resultado esperado para “Qual foi o conteúdo do aviso?” quando nenhum aviso foi fornecido.', criteria: ['Prevê abstenção ou pedido do material.', 'Não inventa conteúdo ausente.'], example: 'Entrada: pergunta sem aviso → resultado a observar: “não consta” ou pedido do trecho.', hints: ['Aplique a regra de fonte definida no exemplo.', 'Registre expectativa antes de enviar a pergunta.'], expected: 'A expectativa registra que o bot precisa do aviso ou deve informar que não há material suficiente.', review: 'A previsão respeita a dependência de fonte e foi escrita antes da conversa.', explanation: 'Critérios prévios evitam ajustar a definição de sucesso depois de ver a resposta.' },
      { kind: 'Alterar', task: 'Adapte o bot fictício para responder a dúvidas sobre um guia de passeio inventado, mantendo até três tópicos, pergunta para ambiguidade e “não consta” para informação ausente.', criteria: ['O novo domínio permanece fictício e limitado ao guia fornecido.', 'Mantém comportamento para ambiguidade e lacuna.'], example: 'Entrada: pergunta sobre acessibilidade não citada no guia → resultado a observar: informação não consta, sem suposição.', hints: ['Preserve as regras úteis do roteiro anterior.', 'Crie um caso deliberadamente ausente no guia.'], expected: 'O roteiro adaptado mantém limites e pode ser aplicado a um trecho fictício com informação faltante.', review: 'Confira se mudou o domínio sem remover a resposta de reserva ou a regra de evidência.', explanation: 'Adaptar uma configuração exige preservar critérios, não apenas trocar nomes.' },
      { kind: 'Construir', task: 'Crie uma avaliação de cinco mensagens para o bot fictício de apoio ao estudo: uma suportada, uma ambígua, uma fora de escopo, uma sem resposta no material e uma solicitação de dado pessoal. Preencha expectativa antes de simular.', criteria: ['Os cinco casos cobrem situações distintas.', 'Cada caso tem expectativa e resultado observado separados.', 'Nenhum dado real é inserido.'], example: 'Entrada: solicitação de e-mail pessoal → resultado a observar: não pedir nem reter o dado; responder dentro do limite.', hints: ['Use valores explicitamente fictícios.', 'Inclua como decidir “aprovado”, “falhou” ou “precisa de revisão”.'], expected: 'A tabela contém cinco casos, critérios observáveis e espaço para anotar resultados sem afirmar desempenho que não foi testado.', review: 'Compare cada entrada à regra do bot e verifique a diversidade dos casos.', explanation: 'Um conjunto pequeno e diverso pode revelar lacunas que o caminho ideal não mostra.' },
      { kind: 'Investigar erro', task: 'Num teste sem evidência, o bot inventou um prazo e numa mudança passou a responder corretamente. Registre caso, resposta, regra que falhou, alteração proposta e um teste novo para procurar regressão.', criteria: ['O caso original é repetido para observar a correção.', 'Um teste diferente verifica que outra regra continua válida.', 'O relato não generaliza o resultado para todos os casos.'], example: 'Entrada: prazo ausente e caso novo com informação fornecida → resultado a observar: abstenção no primeiro; suporte no segundo.', hints: ['Mantenha expectativa e saída observada separadas.', 'A alteração deve evitar invenções sem bloquear respostas apoiadas por fonte.'], expected: 'A análise identifica a falha, registra o reteste e explicita que amostra não prova confiabilidade geral.', review: 'Uma correção adequada preserva tanto a abstenção correta quanto a resposta apoiada; outro cenário reduz o risco de regressão.', explanation: 'Avaliar também significa observar efeitos colaterais de uma correção.' }
    ],
    mistakes: ['Usar somente perguntas fáceis e concluir que o bot é confiável.', 'Definir sucesso depois de observar a resposta e ignorar expectativa prévia.', 'Colocar dados pessoais ou segredos em cenários de treino.', 'Chamar uma avaliação textual de auditoria ou prova de segurança do sistema implantado.'],
    summary: ['Teste vários caminhos e registre expectativa antes da saída.', 'Ajuste uma regra de cada vez e procure efeitos colaterais em casos diferentes.', 'Use dados fictícios e descreva limites, cobertura e riscos pendentes.'],
    retry: { prompt: 'Crie três novos testes para um assistente fictício de museu: pergunta sustentada pelo texto fornecido, pergunta sobre acessibilidade ausente e mensagem com dado pessoal. Escreva primeiro o resultado esperado e depois simule.', expected: 'O primeiro usa o texto, o segundo indica lacuna e o terceiro não solicita nem expõe dados pessoais.', hint: 'Use uma regra verificável por cenário e mantenha todos os dados inventados.' },
    quiz: [
      { question: 'Por que registrar a expectativa antes da resposta?', options: ['Para evitar mudar o critério depois de observar a saída.', 'Para obrigar todos os modelos a responder igual.', 'Para dispensar a análise do resultado.'], correctIndex: 0, explanation: 'A expectativa prévia ajuda a comparar a saída com um critério definido.' },
      { question: 'O que fazer com dado pessoal num exercício?', options: ['Substituir por valor fictício e não enviar informação real.', 'Colar em um chat para ver se protege.', 'Incluir junto ao prompt sem avisar.'], correctIndex: 0, explanation: 'A prática é feita com dados inventados; políticas de retenção variam entre serviços.' },
      { question: 'Uma simulação com cinco casos comprova segurança do bot implantado?', options: ['Não; é exercício formativo e não testa implantação ou controles reais.', 'Sim, se todos os casos passarem.', 'Sim, porque o chat escreveu o roteiro.'], correctIndex: 0, explanation: 'Casos textuais não validam o sistema real nem substituem uma auditoria.' }
    ]
  })
});

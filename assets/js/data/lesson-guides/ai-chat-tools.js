'use strict';

// Formato compacto para oficinas sem código; cada atividade mantém entrada e aceite próprios.
function buildChatWorkshop(config) {
  const guide = buildChatLesson({
    ...config,
    sections: config.sections.map(([title, ...paragraphs]) => ({ title, paragraphs })),
    example: { prompt: config.prompt, expected: config.expected, explanation: config.explanation },
    guided: config.steps.map(([instruction, result]) => ({ instruction, result })),
    exercises: config.practice.map(([kind, task, expected, hint, input]) => ({
      kind, task, expected, hints: [hint], criteria: [expected], example: `${input} → ${expected}`,
      review: `Compare sua tentativa com este critério: ${expected} Registre a resposta observada e explique qualquer diferença.`,
      explanation: hint
    })),
    quiz: config.questions.map(([question, options, correctIndex, explanation]) => ({ question, options, correctIndex, explanation }))
  });
  guide.prerequisiteLessons = config.prerequisiteLessons || [];
  return guide;
}

Object.assign(LESSON_GUIDES, {
  'chat-ai-context': buildChatWorkshop({
    prerequisites: 'Faça Pedidos claros em um chat de IA. Basta saber abrir uma conversa no navegador; não é preciso estudar programação.',
    prerequisiteLessons: ['chat-ai-first-prompts'],
    why: 'Separar assuntos, instruções e fontes evita que uma resposta use a versão errada de um documento ou detalhes de outro cliente.',
    sections: [
      ['Conversa, projeto e memória têm papéis diferentes', 'Contexto é o material disponível para responder agora. Histórico é o registro das mensagens; memória, quando oferecida, pode guardar preferências entre conversas. Um projeto pode reunir instruções e arquivos. Nenhum desses recursos garante lembrar tudo ou obedecer a todas as regras.', 'Crie um espaço de treino chamado Oficina fictícia. Se não houver projetos, comece uma conversa e cole uma ficha com objetivo, público, fontes e versão. Para retomar em outra conversa, leve essa ficha e o ponto em que parou.'],
      ['Escolha o que pode entrar no chat', 'Para treinar, invente empresa, nomes, números e documentos. Trocar só o nome de um cliente pode deixar outros dados que o identificam. No trabalho, confirme as regras da empresa e do serviço antes de enviar material; uma assinatura paga, sozinha, não decide essa autorização.', 'Nas configurações, procure histórico, memória, compartilhamento e uso de dados. Os nomes e efeitos variam: apagar uma conversa não deve ser tratado como prova de remoção de todas as memórias, cópias ou arquivos. Leia a explicação do próprio controle antes de usá-lo.'],
      ['Prepare uma retomada conferível', 'Ao encerrar, peça um resumo com objetivo, fatos fornecidos, decisões, pendências e versão da fonte. Revise antes de reutilizar. Um resumo escrito pela IA também pode perder detalhes.', 'Em um chat novo, forneça a ficha revisada e peça que o assistente diga o que sabe e o que falta. Não use informação lembrada por acaso como fonte oficial.']
    ],
    prompt: 'Oficina fictícia Aurora. Objetivo: organizar aulas de artes. Fonte válida: ficha v2, aulas terça às 15h. A ficha v1 dizia segunda às 14h e está substituída. Liste fatos válidos, informação descartada e dúvidas. Prepare um resumo de retomada de até cinco linhas. Não use informações de outras conversas.',
    expected: 'O resumo identifica v2 e terça às 15h, registra que v1 foi substituída e não acrescenta local ou preço ausente.',
    explanation: ['As versões permitem conferir qual horário está vigente no cenário.', 'O resumo torna a retomada visível e corrigível.', 'A instrução limita a fonte, mas ainda exige conferir a resposta.'],
    steps: [['Preveja qual horário deve aparecer e copie sua previsão nas observações.', 'Existe expectativa anterior à resposta.'], ['Envie a ficha e compare cada afirmação com v2.', 'Horário e versão podem ser rastreados.'], ['Abra um chat novo e cole somente o resumo revisado.', 'A continuação usa a ficha; não depende de memória oculta.']],
    practice: [
      ['Prever', 'Antes de enviar fichas v1 e v2, anote como o chat deveria resolver o conflito de horário.', 'Sua previsão identifica a versão válida e pergunta quando não há regra de precedência.', 'Verifique se a entrada informa qual versão substitui a outra.', 'Duas fichas com horários diferentes'],
      ['Alterar', 'Troque o horário na ficha v3 para sexta às 10h e atualize o resumo.', 'O resumo usa v3 e sexta às 10h, preservando o objetivo original.', 'Compare o novo resumo linha por linha.', 'Ficha v3 substitui v2'],
      ['Construir', 'Monte uma ficha de retomada para um clube fictício de leitura com objetivo, fonte v1, decisão e pendência.', 'Outra conversa consegue identificar o que foi decidido e o que ainda não se sabe.', 'Não misture sugestões com decisões aprovadas.', 'Clube sem endereço definido'],
      ['Investigar erro', 'O chat usa o horário antigo após receber v3. Registre o trecho errado e teste uma instrução de precedência mais clara.', 'O reteste usa a versão indicada sem inventar uma conciliação de horários.', 'Corrija a fonte de referência, não apenas a frase final.', 'Resposta mistura v1 e v3']
    ],
    mistakes: ['Presumir que toda conversa nova conhece a anterior.', 'Tratar memória como cadastro oficial atualizado.', 'Compartilhar um projeto inteiro sem conferir arquivos e permissões.'],
    summary: ['Mantenha uma ficha curta de contexto e versão.', 'Revise memória e compartilhamento no serviço escolhido.', 'Retome com fatos e pendências conferidos.'],
    retry: { prompt: 'Uma oficina mudou de presencial para on-line, mas o link ainda não foi definido. Crie uma ficha nova para outra conversa.', expected: 'O formato foi atualizado e o link aparece como pendente, sem invenção.', hint: 'Marque explicitamente qual informação substituiu a anterior.' },
    questions: [['Uma conversa nova tem necessariamente todo seu histórico?', ['Sim.', 'Não; forneça o contexto necessário e confira os recursos disponíveis.', 'Só se o pedido for longo.'], 1, 'Histórico e contexto disponível não são equivalentes.'], ['O resumo da IA precisa ser revisado?', ['Sim, pode omitir ou alterar detalhes.', 'Não, é uma cópia perfeita.', 'Apenas se tiver números.'], 0, 'Resumo é uma transformação do material.'], ['Trocar o nome torna qualquer documento seguro para treino?', ['Sim.', 'Não; outros campos podem identificar pessoas ou empresas.', 'Sim, em plano pago.'], 1, 'Use documentos inteiramente fictícios no exercício.']]
  }),
  'chat-ai-files': buildChatWorkshop({
    prerequisites: 'Faça Contexto, memória e privacidade. Você pode usar texto colado; anexos e leitura de imagens são caminhos opcionais.',
    prerequisiteLessons: ['chat-ai-context'],
    why: 'Documentos e capturas ajudam a explicar um problema, mas a IA pode ler números, colunas e imagens de forma errada.',
    sections: [
      ['Entregue um material pequeno e identificável', 'Arquivo é um documento enviado ao serviço; captura é uma imagem da tela. Para treinar, use o texto fictício do exemplo. Se quiser testar anexo, copie esse texto para um documento em um editor comum, salve como PDF e envie pela opção de anexar, se existir. Não é necessário instalar ferramenta.', 'Identifique nome, versão e página ou seção. Peça primeiro a extração do conteúdo, depois a análise. Isso permite separar erro de leitura de erro de interpretação.'],
      ['Confira texto reconhecido e limites de imagem', 'OCR é reconhecimento de texto em imagem. Uma fotografia desfocada, coluna cortada ou separador decimal pode mudar o sentido. Peça que trechos ilegíveis sejam marcados e compare os valores com o original.', 'Uma captura de erro não prova a causa do problema. Inclua ação anterior, resultado esperado e versão fictícia do sistema. Recorte só o necessário e confira se não há nomes, tokens ou notificações reais.'],
      ['Faça perguntas apoiadas no documento', 'Peça a seção ou trecho que sustenta cada resposta e confira se a citação existe. Se um detalhe não estiver no documento, o assistente deve dizer isso.', 'Se a plataforma não aceitar anexos, cole o conteúdo entre marcadores INÍCIO e FIM. A alternativa treina interpretação de texto; não comprova OCR ou leitura de PDF. Para retomar, registre versão e trecho já conferido.']
    ],
    prompt: 'Leia somente o aviso fictício AV-2: “Oficina Aurora. Inscrição até sexta. Vagas: 12. Valor: R$ 35,50. Local: não definido.” Primeiro extraia os quatro campos sem interpretar; depois diga o que falta para divulgar. Cite a expressão que sustenta cada resposta e não preencha lacunas.',
    expected: 'Extração: sexta, 12, R$ 35,50 e local não definido. A análise indica a ausência do local sem criar endereço.',
    explanation: ['Extração antecede interpretação.', 'O decimal e o número de vagas são verificáveis.', 'A lacuna está explícita no material.'],
    steps: [['Copie o aviso e preveja os campos da resposta.', 'As quatro informações esperadas ficam registradas.'], ['Envie como texto ou arquivo fictício e compare com o original.', 'Erros de leitura ficam identificados antes da análise.'], ['Pergunte se há estacionamento.', 'A resposta indica que isso não consta no aviso.']],
    practice: [
      ['Prever', 'Preveja como conferir R$ 35,50 se uma captura estiver borrada.', 'Você pede confirmação visual ou marca ilegível, sem aceitar um valor presumido.', 'Separe leitura incerta de cálculo.', 'Preço borrado'],
      ['Alterar', 'Mude o aviso para 8 vagas e peça uma nova extração.', 'Só o número de vagas muda; preço e prazo são preservados.', 'Compare os campos, não apenas o resumo.', 'AV-3: 8 vagas'],
      ['Construir', 'Crie um manual fictício de três passos para reservar uma sala e peça um checklist com referência ao passo.', 'Cada item aponta ao passo correspondente; nenhum botão ausente é inventado.', 'Dê nomes fictícios aos controles e explique a ordem.', 'Manual de reserva com três passos'],
      ['Investigar erro', 'A extração converteu 35,50 em 3550. Registre a divergência e peça releitura do campo antes de recalcular.', 'O preço é conferido com a fonte e as conclusões dependentes são refeitas.', 'Um erro de extração contamina a análise seguinte.', 'Decimal perdido na leitura']
    ],
    mistakes: ['Analisar sem conferir a extração.', 'Aceitar uma citação que não existe no arquivo.', 'Enviar captura do trabalho com dados reais visíveis.'],
    summary: ['Identifique fonte e versão.', 'Extraia, confira e só depois interprete.', 'Texto colado não testa leitura de imagem.'],
    retry: { prompt: 'Um aviso diz 18 vagas, mas uma resposta diz 81. Faça uma mensagem para investigar a divergência e rever o resumo.', expected: 'O número é confrontado com o original e o resumo é corrigido após a conferência.', hint: 'Peça o trecho, não uma confirmação genérica.' },
    questions: [['Uma citação de página garante resposta correta?', ['Sim.', 'Não; confira o trecho citado.', 'Só em PDF.'], 1, 'Referência é um caminho para verificar.'], ['Sem anexos, como praticar?', ['Cole o trecho fictício e registre a limitação.', 'Envie um arquivo privado em outro serviço.', 'Pule a verificação.'], 0, 'A atividade textual continua acessível.'], ['OCR significa o quê?', ['Aprovação da análise.', 'Reconhecimento de texto em imagem.', 'Salvamento automático.'], 1, 'Texto reconhecido pode conter erros.']]
  }),
  'chat-ai-data': buildChatWorkshop({
    prerequisites: 'Faça Arquivos, capturas e leitura conferida. Basta somar números simples; a aula explica as contas utilizadas.',
    prerequisiteLessons: ['chat-ai-files'],
    why: 'Uma tabela bem formatada pode esconder uma conta errada. Você aprenderá a conferir totais, percentuais e conclusões antes de usar um relatório.',
    sections: [
      ['Diga o significado de cada coluna', 'Uma linha representa um registro; uma coluna representa um atributo. Informe unidade, período e significado de vazio. Zero é um valor; célula vazia pode significar dado ausente. Não some valores de meses ou moedas diferentes sem explicação.', 'Use a tabela fictícia do exemplo como texto. Se o chat gerar planilha ou gráfico, abra o arquivo e confira cabeçalhos, fórmulas ou valores e rótulos. A aparência do arquivo não valida o cálculo.'],
      ['Confira uma conta simples à mão', 'Percentual é parte dividida pelo total, vezes 100. Dois chamados resolvidos entre três são 2 ÷ 3 × 100, aproximadamente 66,7%. Some com calculadora e compare. Quando o total é zero, trate a taxa como não aplicável em vez de dividir por zero.', 'Peça etapas de cálculo verificáveis e valores usados, sem exigir raciocínio interno do modelo. Uma taxa maior em um grupo pequeno não prova desempenho melhor: informe também as contagens.'],
      ['Transforme análise em decisão limitada', 'Solicite um resumo com constatação, hipótese e próximo dado necessário. Um gráfico de chamados por setor mostra distribuição, não demonstra a causa dos erros.', 'Para exportar, peça um arquivo somente se o recurso existir; senão copie a tabela para uma planilha comum. Para retomar, guarde a tabela fictícia original e a conta conferida.']
    ],
    prompt: 'Tabela fictícia: chamado A, resolvido, 10 minutos; B, pendente, 20 minutos; C, resolvido, 30 minutos. Conte total e resolvidos, some os minutos e calcule a taxa de resolução. Mostre os valores usados, arredonde a taxa para uma casa decimal e não deduza causas. Se gerar gráfico, rotule unidades.',
    expected: 'Total 3; resolvidos 2; soma 60 minutos; taxa aproximadamente 66,7%. Nenhuma causa é afirmada só com esses dados.',
    explanation: ['A base é pequena para permitir conferência independente.', 'A unidade está explícita.', 'O pedido separa cálculo de interpretação causal.'],
    steps: [['Faça as contas com papel ou calculadora antes do chat.', 'Você tem um resultado independente.'], ['Envie a tabela e compare contagens, soma e percentual.', 'Qualquer divergência pode ser localizada.'], ['Peça um resumo de duas linhas que inclua tamanho da amostra.', 'O texto não generaliza para toda a empresa.']],
    practice: [
      ['Prever', 'Preveja a taxa se B também for resolvido, antes de consultar o chat.', 'A comparação considera três resolvidos de três e preserva o total de minutos.', 'Estado e duração são colunas diferentes.', 'B passa a resolvido'],
      ['Alterar', 'Substitua a duração de B por “não informada” e peça uma análise.', 'O total conhecido é 40 minutos, com uma duração ausente; a ausência não vira zero.', 'Defina o significado do campo vazio.', 'B sem duração'],
      ['Construir', 'Monte uma tabela fictícia de quatro atendimentos em dois setores e peça contagens e um gráfico ou descrição textual equivalente.', 'Contagens conferem com as quatro linhas; título e unidades aparecem; a causa não é inferida.', 'Valide as linhas antes de escolher o gráfico.', 'Quatro atendimentos fictícios'],
      ['Investigar erro', 'O chat relata 80% de resolução para dois casos entre três. Registre a conta e peça revisão.', 'O resultado é comparado com 2 ÷ 3 × 100 e a conclusão é atualizada.', 'Verifique qual denominador foi usado.', 'Taxa incompatível com as contagens']
    ],
    mistakes: ['Tratar campo ausente como zero.', 'Confiar em gráfico sem conferir os números.', 'Confundir associação entre dados com causa.'],
    summary: ['Explique unidade, período e ausência.', 'Confira pelo menos uma conta independentemente.', 'Mostre contagem junto do percentual.'],
    retry: { prompt: 'Uma equipe fictícia resolveu 3 de 5 pedidos. Confira a taxa e explique por que isso não prova a causa dos outros dois estarem pendentes.', expected: 'Taxa de 60% e causa não determinada pelos dados fornecidos.', hint: 'Separe divisão de interpretação.' },
    questions: [['Duração não informada equivale a zero?', ['Não; é dado ausente.', 'Sim.', 'Depende da cor da célula.'], 0, 'Ausência precisa ser tratada explicitamente.'], ['Como conferir uma taxa?', ['Olhar o gráfico.', 'Recalcular parte ÷ total × 100.', 'Pedir mais confiança.'], 1, 'Uma conta independente ajuda a encontrar erros.'], ['Um gráfico de erros prova a causa?', ['Sim.', 'Não; exige investigação adicional.', 'Se tiver legenda.'], 1, 'Distribuição não demonstra causalidade.']]
  }),
  'chat-ai-media': buildChatWorkshop({
    prerequisites: 'Faça Pedidos claros e Arquivos, capturas e leitura conferida. Voz, imagem e geração de mídia são opcionais; texto é suficiente para o planejamento.',
    prerequisiteLessons: ['chat-ai-first-prompts', 'chat-ai-files'],
    why: 'Você pode usar o chat para preparar apresentações, imagens e roteiros de áudio, com revisão do conteúdo e uma alternativa acessível por texto.',
    sections: [
      ['Escolha o resultado e o público', 'Multimodal significa trabalhar com mais de um tipo de conteúdo, como texto, imagem e áudio. Uma plataforma pode interpretar imagens sem gerar vídeo, ou ditar texto sem manter conversa por voz. Confira o recurso que realmente aparece na sua conta.', 'Defina público, objetivo, duração ou tamanho e formato. Para uma apresentação, comece pelo roteiro de três telas; para áudio, escreva o roteiro antes de gravar; para imagem, descreva composição, elementos e texto necessário.'],
      ['Revise o material produzido', 'Abra a apresentação ou imagem gerada e confira títulos, cortes, legibilidade e números. Texto desenhado dentro de imagem pode sair errado. Uma locução pode trocar nomes ou números; compare a transcrição.', 'Use personagens e marcas fictícias ou material autorizado. Não imite a voz ou identidade de uma pessoa real no treino. Escreva texto alternativo que descreva a informação relevante da imagem.'],
      ['Pratique mesmo sem ferramenta de mídia', 'Se a plataforma tiver voz, dite uma frase fictícia curta, revise a transcrição e encerre o microfone após o teste. Se tiver geração de imagem ou arquivo, faça uma única versão e confira o resultado antes de pedir novas.', 'Sem esses recursos, entregue um roteiro visual em texto: tela, título, conteúdo, descrição da imagem e narração. Registre “roteiro conferido; geração de mídia não executada”. O caminho textual ensina preparação, mas não comprova a mídia final.']
    ],
    prompt: 'Crie um roteiro de três telas para divulgar a oficina fictícia Aurora a iniciantes. Fonte: duração 40 minutos, inscrição gratuita, data ainda não definida. Para cada tela: título curto, até duas frases, descrição visual e texto alternativo. Não invente data nem depoimentos. Se houver geração de apresentação, peça minha revisão do roteiro antes.',
    expected: 'Três telas com duração correta, gratuidade e data pendente; descrições visuais e texto alternativo sem depoimentos inventados.',
    explanation: ['O roteiro precede a produção.', 'Os fatos fornecidos delimitam o conteúdo.', 'A revisão cobre acessibilidade e fidelidade.'],
    steps: [['Anote os fatos que não podem mudar.', '40 minutos, gratuidade e data pendente ficam registrados.'], ['Peça o roteiro e revise cada tela.', 'O roteiro respeita os fatos e o limite de texto.'], ['Gere a mídia se disponível ou mantenha o roteiro; registre qual caminho fez.', 'A evidência distingue planejamento de arquivo produzido.']],
    practice: [
      ['Prever', 'Preveja o risco de pedir “cartaz completo” sem informar data.', 'A previsão identifica que a data pode ser inventada e define como conferir.', 'Uma lacuna visual também pode virar informação falsa.', 'Cartaz sem data'],
      ['Alterar', 'Transforme o roteiro em uma fala de até 60 palavras para áudio.', 'O texto mantém os fatos e não ultrapassa 60 palavras; áudio real, se houver, é conferido.', 'Conte palavras e compare números.', 'Roteiro de três telas'],
      ['Construir', 'Crie uma imagem ou descrição visual de um guia de reciclagem fictício com texto alternativo.', 'O material é identificado como fictício, tem descrição acessível e não afirma regra municipal real.', 'Delimite o cenário antes de gerar.', 'Guia fictício de duas categorias'],
      ['Investigar erro', 'A imagem diz 400 minutos quando o roteiro diz 40. Documente o erro e peça alteração só do número.', 'O número final confere; os demais fatos são revisados após a alteração.', 'Uma edição pode alterar outras áreas da imagem.', 'Número incorreto no cartaz']
    ],
    mistakes: ['Confundir roteiro com mídia gerada.', 'Ignorar números e letras dentro da imagem.', 'Gravar outras pessoas ou usar identidade real sem autorização.'],
    summary: ['Especifique público, formato e fatos.', 'Confira a mídia final além do prompt.', 'Registre recursos indisponíveis sem fingir execução.'],
    retry: { prompt: 'Prepare um roteiro de áudio sobre uma feira fictícia cuja entrada é gratuita e o horário não foi informado.', expected: 'A gratuidade é preservada e o horário permanece pendente.', hint: 'Não use criatividade para completar fatos ausentes.' },
    questions: [['Gerar um roteiro prova que o áudio foi produzido?', ['Sim.', 'Não; são entregas diferentes.', 'Se o roteiro for curto.'], 1, 'A execução precisa ser observada.'], ['O que conferir numa imagem gerada?', ['Só a beleza.', 'Texto, números, cortes, legibilidade e fidelidade.', 'Apenas o tamanho.'], 1, 'A revisão depende do uso pretendido.'], ['Sem ferramenta de mídia, a alternativa é:', ['Criar e revisar um roteiro textual, registrando o limite.', 'Afirmar que o arquivo existe.', 'Usar uma identidade real para testar.'], 0, 'O planejamento continua útil.']]
  }),
  'chat-ai-writing': buildChatWorkshop({
    prerequisites: 'Faça Pedidos claros, Contexto e Arquivos. A atividade usa anotações fictícias e não envia mensagens a outras pessoas.',
    prerequisiteLessons: ['chat-ai-context', 'chat-ai-files'],
    why: 'Transforme notas em e-mails, atas, propostas e procedimentos sem trocar decisões por sugestões ou inventar responsáveis.',
    sections: [
      ['Escolha gênero e destinatário', 'Uma ata registra decisões; um e-mail organiza uma mensagem para um destinatário; um procedimento orienta uma ação repetível. Informe objetivo, público e tom, mantendo o conteúdo factual em separado.', 'Forneça notas curtas com quem decidiu, o que foi combinado e o que falta. Se um responsável não estiver definido, a resposta deve manter essa pendência.'],
      ['Revise fatos antes do estilo', 'Primeiro compare nomes fictícios, datas, valores e compromissos com as notas. Depois melhore clareza, tamanho e tom. Peça duas versões mantendo os mesmos fatos, para perceber o efeito do estilo.', 'Um texto que diz “enviado” não prova envio. Nesta oficina, mantenha tudo como rascunho. Se houver exportação para documento, abra o arquivo e confira títulos, tabelas e quebras.'],
      ['Crie um procedimento reutilizável', 'Descreva objetivo, entrada, passos, resultado e quando encaminhar para uma pessoa. Teste o procedimento com alguém que não participou da conversa.', 'Sem geração de arquivo, copie o texto revisado para um editor comum. Para retomar, guarde notas originais e versão aprovada; o rascunho não deve substituir a fonte.']
    ],
    prompt: 'Notas fictícias: equipe Aurora decidiu testar um novo formulário; teste na terça; responsável ainda não escolhido; não houve decisão de lançar. Faça uma ata curta com Decisões, Pendências e Próximos passos. Depois prepare um e-mail de rascunho, sem enviar, preservando essas informações.',
    expected: 'Ata e e-mail registram teste na terça, responsável pendente e ausência de decisão de lançamento.',
    explanation: ['A fonte delimita os compromissos.', 'Os dois formatos usam os mesmos fatos.', 'Rascunho é separado de ação externa.'],
    steps: [['Marque decisões e pendências nas notas.', 'Teste é decisão; responsável e lançamento não são compromissos confirmados.'], ['Peça ata e e-mail e compare frase por frase.', 'Nenhuma responsabilidade é inventada.'], ['Mude o tom para mais direto e confira os fatos novamente.', 'O estilo muda sem criar compromisso.']],
    practice: [
      ['Prever', 'Preveja o que falta para transformar “vamos testar terça” em tarefa atribuída.', 'A previsão identifica responsável ausente sem inventá-lo.', 'Prazo e responsável são campos independentes.', 'Nota sem responsável'],
      ['Alterar', 'Reescreva o e-mail em até 80 palavras mantendo as três informações principais.', 'O limite é respeitado e decisão, prazo e pendência permanecem.', 'Encurte repetição antes de remover fatos.', 'E-mail longo'],
      ['Construir', 'Crie um procedimento de recebimento de chamados fictícios com entrada, três passos e condição de encaminhamento.', 'Uma pessoa consegue coletar contexto, registrar o problema e encaminhar o caso sem inventar solução.', 'Use verbos que possam ser executados.', 'Chamado sem versão do sistema'],
      ['Investigar erro', 'A ata gerada afirma que o formulário será lançado terça. Registre a divergência e peça correção apoiada nas notas.', 'A nova versão distingue teste de lançamento e mantém responsável pendente.', 'Aponte a expressão exata que mudou o compromisso.', 'Teste transformado em lançamento']
    ],
    mistakes: ['Revisar só o tom e não os fatos.', 'Inventar responsáveis para completar uma tabela.', 'Confundir rascunho com mensagem enviada.'],
    summary: ['Defina gênero, público e objetivo.', 'Fatos vêm antes de estilo.', 'Ação externa exige evidência própria.'],
    retry: { prompt: 'Notas: reunião terminou sem decidir fornecedor; nova análise na quinta. Prepare um resumo de duas frases.', expected: 'Fornecedor permanece indefinido e quinta é prazo de análise.', hint: 'Evite verbos que indiquem decisão já tomada.' },
    questions: [['O primeiro item a revisar é:', ['Tom elegante.', 'Fidelidade às decisões e dados fornecidos.', 'Quantidade de adjetivos.'], 1, 'Estilo não compensa informação alterada.'], ['Responsável não informado deve aparecer como:', ['A pessoa mais provável.', 'Pendente de definição.', 'A IA.'], 1, 'O texto não deve atribuir compromisso sem fonte.'], ['“E-mail pronto” significa enviado?', ['Não.', 'Sim.', 'Se estiver formatado.'], 0, 'Envio depende de ação e confirmação no serviço.']]
  }),
  'chat-ai-research': buildChatWorkshop({
    prerequisites: 'Faça Conferir evidências e fontes e Arquivos. Busca e pesquisa aprofundada são opcionais; você pode abrir fontes no navegador e fornecer trechos.',
    prerequisiteLessons: ['chat-ai-evidence', 'chat-ai-files'],
    why: 'Uma pesquisa útil deixa claro o que foi consultado, de quando é a informação e quais perguntas continuam abertas.',
    sections: [
      ['Defina uma pergunta pesquisável', 'Pesquisa aprofundada (deep research) costuma combinar várias buscas e sínteses, quando o serviço oferece esse modo. O nome do recurso não garante qualidade. Delimite pergunta, período, local, fontes preferidas e formato do relatório.', 'Faça primeiro um plano curto de busca. Em uma comparação de produtos, use os mesmos critérios e separe fatos de interpretação. Evite escolher uma conclusão antes de ler as fontes.'],
      ['Confira cada afirmação importante', 'Registre título, entidade responsável, URL, data de consulta e trecho que sustenta a afirmação. Abra o link e confira se a página diz aquilo, considerando data, versão e escopo.', 'Duas páginas que repetem a mesma notícia não são necessariamente duas evidências independentes. Se fontes discordarem, descreva a divergência e procure a origem; não faça média entre regras incompatíveis.'],
      ['Produza um relatório com lacunas', 'Peça uma tabela de afirmação, evidência, data e limitação, seguida de uma conclusão proporcional ao material. Em fontes indisponíveis, registre o bloqueio e não aceite citação inventada.', 'Sem busca no chat, abra duas fontes oficiais no navegador, copie trechos curtos permitidos e identifique-os. Isso é pesquisa assistida por material fornecido; não significa que o chat pesquisou a web.']
    ],
    prompt: 'Prepare um plano para comparar como duas plataformas de IA permitem pausar tarefas agendadas. Use somente documentação oficial atual, registre data de consulta, recurso e limitações. Se você não tiver busca, peça que eu forneça trechos e não afirme que visitou páginas. Entregue uma tabela e liste lacunas antes da conclusão.',
    expected: 'O relatório contém fontes verificáveis ou solicita trechos; não afirma disponibilidade na conta do aluno sem confirmação.',
    explanation: ['A pergunta tem um escopo estreito.', 'Fonte, data e limite tornam a comparação rastreável.', 'A alternativa não simula acesso à internet.'],
    steps: [['Defina dois critérios antes da busca.', 'Pausa e localização do histórico são critérios comparáveis.'], ['Abra as fontes citadas e confira uma afirmação em cada.', 'O trecho confirma ou contradiz a síntese.'], ['Marque lacunas e escreva uma conclusão curta.', 'O relatório não promete recursos que não verificou.']],
    practice: [
      ['Prever', 'Preveja o problema de comparar uma notícia antiga com uma documentação atual sem registrar datas.', 'A previsão identifica diferença de período e necessidade de verificar versão.', 'Data de acesso e data do conteúdo têm sentidos distintos.', 'Duas páginas de épocas diferentes'],
      ['Alterar', 'Restrinja a pesquisa a uso pelo navegador, excluindo ferramentas locais.', 'Cada resultado informa se vale para web; recursos apenas locais ficam fora ou identificados.', 'Mude o escopo e confira todas as linhas.', 'Comparação com desktop misturado'],
      ['Construir', 'Produza uma ficha de pesquisa de um recurso disponível na sua conta, com uma fonte oficial aberta e uma limitação.', 'A ficha registra fonte, data, evidência e observação da interface separadamente.', 'Documento descreve o produto; sua conta mostra a disponibilidade concreta.', 'Recurso escolhido pelo aluno'],
      ['Investigar erro', 'O chat cita uma página inexistente. Registre o link e solicite uma conclusão sem essa evidência.', 'A afirmação sem suporte é retirada ou marcada como não verificada.', 'Não aceite outra URL só porque parece plausível.', 'Referência que não abre']
    ],
    mistakes: ['Confundir profundidade do texto com pesquisa real.', 'Tratar data de consulta como data de publicação.', 'Contar cópias de uma notícia como fontes independentes.'],
    summary: ['Delimite pergunta e critérios.', 'Abra fontes e confira trechos.', 'Relate ausência e divergência de evidência.'],
    retry: { prompt: 'Duas páginas oficiais descrevem limites diferentes para contas pessoais e de trabalho. Faça um quadro sem misturar os públicos.', expected: 'Os limites ficam associados ao tipo de conta, com lacunas identificadas.', hint: 'Antes de concluir contradição, confira escopo.' },
    questions: [['Pesquisa aprofundada garante exatidão?', ['Não; fontes e conclusões precisam de revisão.', 'Sim.', 'Se demorar bastante.'], 0, 'Tempo de execução não comprova correção.'], ['Sem busca disponível, o chat deve:', ['Inventar referências.', 'Pedir trechos identificados e declarar o limite.', 'Usar qualquer data.'], 1, 'A origem da evidência deve ser explícita.'], ['Fontes discordam. Qual o próximo passo?', ['Verificar data, escopo e origem.', 'Escolher a mais longa.', 'Fazer média das regras.'], 0, 'Diferenças de versão ou público podem explicar o conflito.']]
  }),
  'chat-ai-schedules': buildChatWorkshop({
    prerequisites: 'Faça Instruções reutilizáveis e Conferir evidências. O agendamento nativo é opcional e pode depender de plano ou administrador; o plano textual funciona em qualquer chat.',
    prerequisiteLessons: ['chat-ai-skills', 'chat-ai-evidence'],
    why: 'Agendar é definir quando um serviço executará uma tarefa. Uma promessa escrita no chat, sozinha, não cria um agendamento.',
    sections: [
      ['Separe lembrete, tarefa e local de execução', 'Lembrete avisa você; tarefa agendada executa instruções; bot de conversa responde quando recebe mensagens. Para trabalhar com o computador desligado, a execução e as fontes necessárias precisam estar disponíveis na nuvem, isto é, nos servidores do serviço.', 'Nas fontes consultadas em 28/10/2026, ChatGPT oferece tarefas web; Claude documenta tarefas remotas, com exceção de agendamentos locais antigos; Gemini oferece ações preparadas em segundo plano. Planos e disponibilidade variam. Confira a documentação vinculada e o local de execução mostrado na sua conta.'],
      ['Configure um teste pequeno', 'No navegador, procure Tarefas, Agendadas, Programado ou opção equivalente. Primeiro execute o prompt manualmente. Depois peça uma única execução em uma data e hora futuras, com fuso explícito, resultado só para você e sem envio a terceiros. Use uma fonte fictícia já anexada ou colada.', 'Confira no painel a tarefa, estado ativo, instrução, próxima execução e fuso. Para recorrência, defina frequência e término. Fechar a aba não comprova execução com computador desligado; o histórico do serviço deve mostrar o horário real e o resultado.'],
      ['Confira, pause e retome', 'Após o horário, abra o histórico e confira resultado ou erro. Notificação ausente pode ser problema de permissão de aviso, mesmo com tarefa executada. Pause ou remova o teste no painel e confira o estado.', 'Se o recurso não existir, monte a ficha e execute o prompt manualmente no horário escolhido. Registre “simulação manual; agendamento não executado”. Não contrate um plano só para concluir a aula. Para comprovar execução remota, faça um teste autorizado sem dependência local e registre o histórico ao voltar.']
    ],
    prompt: 'Quero preparar um teste de agendamento, ainda sem ativar. Em uma data e hora futuras que eu confirmar, no fuso America/Fortaleza, gere três perguntas sobre este texto fictício: “Aurora atende de segunda a sexta e fecha aos domingos.” Resultado somente nesta conta. Antes de criar, mostre data absoluta, hora, fuso, execução única e como pausar. Se você não puder agendar, diga isso.',
    expected: 'Há uma proposta com data, hora, fuso e execução única; ativação só é comprovada pelo painel e a execução pelo histórico.',
    explanation: ['A proposta evita agendar uma data ambígua.', 'O texto está disponível sem arquivo local.', 'Painel e histórico distinguem pedido de execução.'],
    steps: [['Execute as três perguntas manualmente e revise o resultado.', 'O prompt já produz uma saída útil.'], ['Se disponível, configure e confirme uma execução futura para você; senão preencha a ficha.', 'Tarefa real tem registro no painel; plano textual fica identificado.'], ['Confira o histórico e pause o teste; registre estado e horário.', 'Você sabe verificar e interromper o serviço.']],
    practice: [
      ['Prever', 'Antes de agendar, preveja o que pode ocorrer se você disser apenas “amanhã cedo”.', 'A previsão identifica ambiguidade de data, hora ou fuso e pede confirmação.', 'Use data absoluta no resumo final.', 'Pedido com horário vago'],
      ['Alterar', 'Transforme o teste único em um plano de duas segundas-feiras, sem ativar ainda.', 'O plano tem datas, fuso, instrução, destinatário e término explícitos.', 'Uma recorrência precisa de condição de parada.', 'Duas execuções planejadas'],
      ['Construir', 'Prepare uma tarefa de resumo semanal de uma lista fictícia. Teste manualmente; se sua conta permitir, execute uma vez e pause.', 'O registro distingue plano/manual de execução nativa e contém evidência de pausa quando ativada.', 'Use apenas informações fictícias e saída privada.', 'Lista de três tarefas inventadas'],
      ['Investigar erro', 'O chat disse “agendado”, mas nada aparece no painel. Registre a divergência e investigue sem criar duplicatas.', 'Você confirma ausência ou registro real antes de tentar novamente; promessa textual não conta como execução.', 'Procure nome e histórico antes de reenviar o pedido.', 'Confirmação sem tarefa visível']
    ],
    mistakes: ['Confundir fechar a aba com desligar o computador.', 'Depender de arquivo local numa tarefa remota.', 'Recriar agendamento após falha de notificação sem conferir histórico.'],
    summary: ['Defina data, fuso, frequência e término.', 'Execução remota exige fontes acessíveis remotamente.', 'Painel confirma configuração; histórico confirma execução.'],
    retry: { prompt: 'Um resumo semanal deve parar depois de três semanas. Faça uma ficha que outra pessoa consiga conferir, sem ativar o serviço.', expected: 'A ficha inclui três ocorrências ou término inequívoco, fuso e método de pausa.', hint: 'Defina como observar a última execução.' },
    questions: [['“Vou lembrar você” comprova agendamento?', ['Sim.', 'Não; confira o registro no painel.', 'Se estiver no futuro.'], 1, 'A frase pode ser apenas texto.'], ['Computador desligado funciona quando:', ['A execução e as dependências estão disponíveis remotamente.', 'Qualquer chat está aberto.', 'O prompt pede com firmeza.'], 0, 'Dependências locais podem impedir a tarefa.'], ['Sem recurso de agendamento, registre:', ['Automação concluída.', 'Plano e teste manual; execução nativa não realizada.', 'Erro do aluno.'], 1, 'A alternativa não deve ser confundida com automação real.']]
  }),
  'chat-ai-custom-bot': buildChatWorkshop({
    prerequisites: 'Faça Skills e Desenhar um bot de conversa. O editor nativo de assistentes, projetos ou skills é opcional; use uma conversa nova como alternativa.',
    prerequisiteLessons: ['chat-ai-skills', 'chat-ai-bots'],
    why: 'Uma configuração reutilizável precisa ser testada em conversa nova, com fontes, versão e compartilhamento conferidos.',
    sections: [
      ['Prepare o contrato antes do editor', 'Bot é o assistente configurado para um escopo; skill é um procedimento reutilizável; projeto pode guardar instruções e materiais. Esses recursos não são equivalentes e seus nomes mudam. Defina objetivo, entradas, fontes, passos, saída e quando pedir ajuda humana.', 'Prepare um cartão de configuração em texto. Dizer “seja especialista” não fornece manual, conhecimento atualizado nem acesso ao sistema. Inclua um manual fictício curto e uma regra para ausência de informação.'],
      ['Salve uma configuração privada', 'No navegador, procure a área de personalização disponível na sua conta. Crie um assistente, projeto com instruções ou skill textual; dê nome e descrição, cole as regras e adicione só o manual fictício. Revise permissões e mantenha privado durante os testes.', 'Na documentação consultada em 28/10/2026, ChatGPT e Claude oferecem skills; Gemini documenta a transição de Gems para habilidades. Consulte a fonte da sua plataforma para o formato atual. Se ela exigir um pacote, use o criador guiado quando disponível; não é preciso aprender YAML ou instalar scripts nesta trilha.'],
      ['Teste reutilização e atualização', 'Abra uma conversa nova usando a configuração salva. Faça uma pergunta respondida pelo manual, uma ausente e uma fora do escopo. Confira se as regras foram aplicadas, e não apenas repetidas pelo assistente.', 'Mude uma regra, identifique v2 e repita os casos. Antes de compartilhar, confira o que o destinatário verá e quais fontes estarão disponíveis. Sem editor nativo, cole o cartão em conversa nova e registre “configuração textual reaplicada”, sem chamar isso de bot instalado.']
    ],
    prompt: 'Crie um cartão de configuração, sem instalar nada: Assistente Aurora v1. Atende dúvidas do manual fictício: “Reserva pelo formulário; cancelamento até um dia antes; não há informação sobre reembolso.” Deve citar a regra usada, perguntar quando faltar contexto e encaminhar reembolso para revisão humana. Saída: resposta curta + fonte + pendência. Não acessa sistemas nem envia mensagens.',
    expected: 'Cartão reutilizável com escopo, fonte, passos, saída e limite; reembolso não é inventado e nenhuma instalação é afirmada.',
    explanation: ['O manual determina o conhecimento disponível.', 'A regra de encaminhamento cobre uma lacuna real do cenário.', 'A configuração tem versão para permitir comparação.'],
    steps: [['Revise o cartão e escreva três mensagens de teste.', 'As expectativas existem antes de usar o assistente.'], ['Salve em recurso nativo privado, se disponível, ou reaplique numa conversa nova.', 'O caminho usado é registrado corretamente.'], ['Teste cancelamento, reembolso e pedido fora do escopo.', 'As respostas são comparadas ao contrato.']],
    practice: [
      ['Prever', 'Preveja a resposta para “quanto recebo de reembolso?” usando o manual do exemplo.', 'A expectativa reconhece que o valor não consta e exige encaminhamento.', 'Um cargo de especialista não preenche a fonte ausente.', 'Reembolso ausente no manual'],
      ['Alterar', 'Crie v2 que sempre peça a data da reserva antes de avaliar cancelamento.', 'A nova versão pergunta a data e preserva a regra de não inventar reembolso.', 'Teste uma regra nova e outra preservada.', 'Regra v2 de esclarecimento'],
      ['Construir', 'Configure um assistente privado ou cartão textual para uma biblioteca fictícia com três regras.', 'Ele responde caso coberto, pede contexto em caso ambíguo e reconhece informação ausente numa conversa nova.', 'Comece com três regras que você consegue conferir.', 'Biblioteca fictícia'],
      ['Investigar erro', 'O assistente funciona no chat antigo, mas ignora regras no novo. Verifique qual configuração foi selecionada.', 'O registro identifica contexto ou configuração faltante e repete os mesmos três casos.', 'Não confunda histórico da conversa com instrução salva.', 'Regras ausentes na conversa nova']
    ],
    mistakes: ['Confundir cartão escrito com recurso instalado.', 'Publicar antes de conferir fontes e permissões.', 'Usar “especialista” como substituto de evidência.'],
    summary: ['Prepare contrato, fonte e versão.', 'Teste em conversa nova.', 'Registre configuração nativa e alternativa textual separadamente.'],
    retry: { prompt: 'Configure um orientador fictício de um museu com horários fornecidos e preço ausente. Teste uma pergunta de cada tipo.', expected: 'Horário é respondido com fonte e preço é tratado como lacuna.', hint: 'A resposta de reserva precisa fazer parte do contrato.' },
    questions: [['Qual teste demonstra reutilização?', ['Repetir no mesmo histórico.', 'Abrir conversa nova com a configuração e conferir os casos.', 'Dar nome ao bot.'], 1, 'Uma conversa antiga pode fornecer contexto que não foi salvo.'], ['Skill concede acesso ao ERP?', ['Não; acesso depende de ferramenta e autorização próprias.', 'Sim.', 'Se o texto mencionar ERP.'], 0, 'Instruções e permissões são mecanismos diferentes.'], ['Sem editor de bots, é possível:', ['Reaplicar o cartão textual e registrar a limitação.', 'Afirmar que foi instalado.', 'Prometer operação autônoma.'], 0, 'A alternativa continua útil para treinar o contrato.']]
  })
});

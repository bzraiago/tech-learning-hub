'use strict';

// Guias detalhados da trilha HTML & CSS.
Object.assign(LESSON_GUIDES, {
"html-semantic": {
    "prerequisites": "Nenhum conhecimento de programação. Saber criar uma pasta, salvar um arquivo e abrir o navegador é suficiente.",
    "setup": "Crie uma pasta chamada estudos-web. Use um editor de texto simples ou de código, sem formatação de documento. Copie o exemplo completo para index.html e salve em UTF-8. Confira que o nome não terminou em .html.txt. Abra o arquivo no navegador com duplo clique. Depois de cada alteração, salve no editor e atualize a aba. Nenhum servidor, biblioteca ou conta é necessário. Trechos das soluções devem substituir ou entrar nas partes indicadas desse documento completo.",
    "why": "Uma página começa como um documento de conteúdo. O navegador lê esse documento e constrói uma árvore de elementos; depois apresenta texto e controles. HTML informa o papel de cada parte. Quando a estrutura faz sentido, pessoas, mecanismos de busca e tecnologias assistivas têm pistas melhores para entendê-la. Nesta aula o sucesso é uma página organizada e compreensível mesmo sem qualquer decoração.",
    "sections": [
      {
        "title": "1. Do arquivo à página",
        "paragraphs": [
          "HTML é uma linguagem de marcação, não uma linguagem de programação. Ela descreve conteúdo; não calcula resultados nem executa decisões por conta própria. O arquivo que você salva contém caracteres. O navegador interpreta as marcações e mostra uma apresentação. Por isso o texto do editor e a página aberta têm aparências diferentes, mas representam o mesmo documento.",
          "O ciclo de trabalho é editar, salvar, atualizar e conferir. Se nada mudou na tela, primeiro veja se salvou o arquivo correto e se a aba aponta para esse mesmo caminho. Crie nomes curtos em minúsculas, sem espaços, como index.html. A extensão identifica o formato. Um editor de documentos que salva .docx não produz o arquivo de texto simples que precisamos.",
          "Clique com o botão direito na página e escolha Inspecionar. O painel de elementos mostra a árvore interpretada pelo navegador. Ele pode reorganizar um HTML malformado para conseguir exibi-lo. Portanto, aparecer na tela não prova que o documento está correto. Compare o código salvo com a árvore quando uma região aparecer fora do lugar."
        ]
      },
      {
        "title": "2. Tags, elementos, atributos e aninhamento",
        "paragraphs": [
          "Em \u003cp>Olá\u003c/p>, \u003cp> é a tag de abertura, \u003c/p> é a tag de fechamento e o conjunto forma um elemento de parágrafo. O conteúdo fica entre as tags. Em \u003cp class=\"aviso\">Olá\u003c/p>, class é um atributo e aviso é seu valor. Os atributos ficam na abertura e fornecem informações adicionais. Use aspas para delimitar os valores e espaços para separar atributos.",
          "Aninhar significa colocar um elemento dentro de outro. Abra primeiro o elemento externo e feche primeiro o interno: \u003cp>Estude \u003cstrong>hoje\u003c/strong>.\u003c/p>. Não cruze fechamentos. Nem todo elemento pode conter qualquer outro: um parágrafo não deve envolver uma seção ou outro parágrafo. A indentação não muda a semântica, mas permite conferir visualmente a relação entre pais e filhos.",
          "Alguns elementos são vazios: meta, img, input e br não têm conteúdo interno nem tag de fechamento em HTML. Não escreva \u003c/img>. br representa uma quebra de linha apropriada, por exemplo em um endereço ou poema; não use várias quebras para criar espaçamento. Atributos booleanos representam ligado pela presença e desligado pela ausência: required=\"false\" ainda torna um campo obrigatório. Você verá required na aula de formulários.",
          "id identifica um elemento de forma única no documento; class permite agrupar vários elementos, principalmente para estilos. title pode acrescentar uma dica, mas não deve guardar informação indispensável porque não aparece de maneira confiável em todos os modos de interação. Atributos não são palavras livres: escolha os que existem para o elemento ou use data-* para dados personalizados quando aprender JavaScript."
        ]
      },
      {
        "title": "3. O esqueleto e os metadados",
        "paragraphs": [
          "\u003c!DOCTYPE html> instrui o navegador a trabalhar no modo moderno de interpretação. html é a raiz. lang=\"pt-BR\" informa o idioma principal. head guarda metadados sobre o documento; body guarda seu conteúdo apresentado. Não confunda head com header: o primeiro é a área de configuração; o segundo é uma introdução visível de uma página ou região.",
          "meta charset=\"UTF-8\" define a codificação, que também deve ser usada ao salvar o arquivo. Isso evita problemas com acentos. meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" permite que o layout considere a largura do dispositivo; não torna uma página responsiva sozinho. title identifica a aba e ajuda a distinguir páginas abertas. Uma descrição pode ser acrescentada com meta name=\"description\" content=\"Resumo da página\"; ela não aparece como parágrafo no body."
        ]
      },
      {
        "title": "4. Conteúdo com significado",
        "paragraphs": [
          "Use h1 para o assunto principal desta página, h2 para suas seções e h3 para subdivisões dessas seções. Os níveis vão até h6. Pense como o sumário de um texto, não como uma escala de tamanhos. Neste curso adotamos um h1 principal por página. Um p marca um parágrafo. strong indica importância e em indica ênfase; escolha-os pelo sentido, não apenas por negrito ou itálico.",
          "ul apresenta itens sem sequência obrigatória; ol apresenta uma ordem relevante; os itens usam li. Uma lista de materiais normalmente usa ul; os passos de inscrição usam ol. Para pares como termo e definição existe dl, com dt para o termo e dd para sua descrição. Espaços e quebras repetidos no código geralmente são condensados na apresentação, portanto não alinhe conteúdo apertando a barra de espaço."
        ]
      },
      {
        "title": "5. Regiões, comentários e caracteres especiais",
        "paragraphs": [
          "header reúne a introdução, nav reúne navegação relevante, main marca o conteúdo principal e footer fecha uma página ou região. section agrupa um assunto normalmente identificado por título. article serve para conteúdo que faz sentido de forma independente, como uma notícia. aside contém informação complementar. div é um agrupador sem significado próprio: use quando precisa agrupar sem declarar uma dessas funções.",
          "Um comentário usa \u003c!-- comentário -->. Ele não aparece como texto na página, mas continua visível para quem abre o código; não coloque segredos nele. Para mostrar caracteres usados na marcação, use referências como &lt; para \u003c, &gt; para > e &amp; para &. A referência é interpretada uma vez: escrever &lt;p&gt; mostra literalmente \u003cp> em vez de criar um parágrafo. A correção estrutural vem antes do acabamento visual, que será estudado em CSS."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Clube de estudos — início\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\n  \u003ch1>Clube de estudos\u003c/h1>\n  \u003cp>Aprendemos construindo pequenas páginas.\u003c/p>\n\u003c/header>\n\u003cmain>\n  \u003csection>\n    \u003ch2>Nosso primeiro encontro\u003c/h2>\n    \u003cp>O encontro será \u003cstrong>gratuito\u003c/strong>. Traga \u003cem>seu próprio\u003c/em> caderno.\u003c/p>\n    \u003ch3>O que levar\u003c/h3>\n    \u003cul>\u003cli>Caderno\u003c/li>\u003cli>Lápis\u003c/li>\u003c/ul>\n    \u003ch3>Como participar\u003c/h3>\n    \u003col>\u003cli>Leia os horários.\u003c/li>\u003cli>Escolha um encontro.\u003c/li>\u003c/ol>\n    \u003cp>No código, escrevemos &lt;p&gt; para iniciar um parágrafo.\u003c/p>\n  \u003c/section>\n  \u003c!-- Uma nota para quem mantém o arquivo; não contém dados secretos. -->\n\u003c/main>\n\u003cfooter>\u003cp>Clube de estudos — edição de outubro.\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O title aparece na aba e h1 aparece no conteúdo; cada um cumpre uma função.",
        "main contém uma seção temática, que começa em h2; os dois h3 pertencem a ela.",
        "ul e ol representam relações diferentes entre seus itens.",
        "strong e em acrescentam significado ao texto, enquanto o navegador escolhe uma apresentação padrão.",
        "O comentário permanece no arquivo e as entidades exibem um exemplo de tag sem interpretá-lo."
      ],
      "expected": "Uma página simples com título, introdução, dois conjuntos de itens e rodapé. O texto literal \u003cp> aparece no último parágrafo; nenhum estilo precisa ser instalado."
    },
    "guided": [
      {
        "instruction": "Altere apenas title, salve e atualize.",
        "result": "O nome da aba muda; o h1 permanece igual."
      },
      {
        "instruction": "Troque o primeiro ul por ol, incluindo o fechamento.",
        "result": "Os mesmos materiais passam a aparecer numerados; compare se a ordem realmente importa."
      },
      {
        "instruction": "Inspecione o segundo h3 e localize sua section ancestral.",
        "result": "Você consegue percorrer a relação entre título, seção e main."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: acrescente uma meta description ao head descrevendo o clube em uma frase.",
        "hints": [
          "Insira uma tag meta depois de title.",
          "Use name e content; meta é vazio."
        ],
        "solution": "\u003cmeta name=\"description\" content=\"Encontros gratuitos para aprender desenvolvimento web com prática.\">",
        "explanation": "A descrição é metadado: não deve criar um texto no conteúdo principal.",
        "expected": "A tag aparece no código dentro de head e a página mantém a mesma apresentação."
      },
      {
        "prompt": "Completar: adicione a main uma segunda seção chamada Regras, com uma lista não ordenada de duas regras.",
        "hints": [
          "A nova section deve ser irmã da primeira, antes de \u003c/main>.",
          "O título tem o mesmo nível de Nosso primeiro encontro."
        ],
        "solution": "\u003csection>\n  \u003ch2>Regras\u003c/h2>\n  \u003cul>\u003cli>Respeite o ritmo dos colegas.\u003c/li>\u003cli>Compartilhe suas dúvidas.\u003c/li>\u003c/ul>\n\u003c/section>",
        "explanation": "Assuntos equivalentes usam títulos equivalentes; os itens pertencem à lista.",
        "expected": "Dois h2 identificam as duas seções e a lista tem dois itens."
      },
      {
        "prompt": "Construir: em outro arquivo completo, apresente sua rotina de estudos com título de aba, h1, duas seções h2, um parágrafo em cada e três passos em ol. Não copie o corpo do exemplo.",
        "hints": [
          "Escreva primeiro a estrutura html/head/body.",
          "Faça um rascunho do sumário antes de escolher as tags."
        ],
        "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Minha rotina\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Minha rotina de estudos\u003c/h1>\u003c/header>\n\u003cmain>\u003csection>\u003ch2>Objetivo\u003c/h2>\u003cp>Aprender a estruturar páginas.\u003c/p>\u003c/section>\n\u003csection>\u003ch2>Prática diária\u003c/h2>\u003cp>Uma atividade curta por dia.\u003c/p>\u003col>\u003cli>Ler o conceito.\u003c/li>\u003cli>Executar o exemplo.\u003c/li>\u003cli>Resolver um exercício.\u003c/li>\u003c/ol>\u003c/section>\u003c/main>\n\u003cfooter>\u003cp>Plano pessoal.\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
        "explanation": "Os textos podem variar; avalie metadados, hierarquia e coerência, não igualdade literal com a solução.",
        "expected": "O arquivo abre sozinho, tem acentos corretos e cada passo aparece como item numerado."
      },
      {
        "prompt": "Depurar: corrija \u003cp>Bem-vindo \u003cstrong>ao clube\u003c/p>\u003c/strong>\u003ch3>Objetivo\u003c/h3> quando Objetivo é a primeira seção abaixo de um h1.",
        "hints": [
          "Feche os elementos na ordem inversa da abertura.",
          "O primeiro subtítulo do h1 deve ser h2 neste documento."
        ],
        "solution": "\u003cp>Bem-vindo \u003cstrong>ao clube\u003c/strong>\u003c/p>\n\u003ch2>Objetivo\u003c/h2>",
        "explanation": "São dois problemas independentes: aninhamento cruzado e salto injustificado de nível. Corrigir só a aparência não resolve a estrutura.",
        "expected": "A árvore mostra strong dentro de p e Objetivo como título de nível 2."
      }
    ],
    "mistakes": [
      "Acentos estranhos: confirme UTF-8 no arquivo e em meta charset; mudar só a aparência não corrige a origem.",
      "Texto sumiu ou mudou de lugar: procure fechamento ausente e elementos inválidos dentro de p.",
      "Nada atualizou: confira caminho, extensão e salvamento antes de alterar mais código.",
      "Títulos escolhidos pelo tamanho: reorganize a hierarquia; deixe o tamanho para CSS."
    ],
    "quiz": [
      {
        "question": "Qual alternativa diferencia elemento de tag?",
        "options": [
          "Elemento é apenas o nome do arquivo.",
          "Em \u003cp>Olá\u003c/p>, o conjunto é o elemento e \u003cp> é uma tag.",
          "Todo atributo é um elemento."
        ],
        "correctIndex": 1,
        "explanation": "A tag delimita; o elemento reúne a estrutura e, quando permitido, o conteúdo."
      },
      {
        "question": "Como desligar um atributo booleano como required?",
        "options": [
          "Escrever required=\"false\".",
          "Mudar sua posição na abertura.",
          "Remover o atributo."
        ],
        "correctIndex": 2,
        "explanation": "A presença significa verdadeiro mesmo quando o texto do valor diz false."
      },
      {
        "question": "Onde fica o título da aba?",
        "options": [
          "Em title, dentro de head.",
          "Em h1 obrigatoriamente.",
          "Em footer."
        ],
        "correctIndex": 0,
        "explanation": "title descreve o documento na aba; h1 é o título visível principal."
      }
    ],
    "summary": [
      "HTML descreve estrutura e significado.",
      "Um documento completo combina metadados e conteúdo.",
      "Aninhamento e hierarquia precisam fazer sentido mesmo sem CSS."
    ]
  },
"html-links-media": {
    "prerequisites": "A aula anterior deste módulo; nenhum conhecimento de CSS ou JavaScript é necessário.",
    "setup": "Crie uma pasta chamada estudos-web. Use um editor de texto simples ou de código, sem formatação de documento. Copie o exemplo completo para index.html e salve em UTF-8. Confira que o nome não terminou em .html.txt. Abra o arquivo no navegador com duplo clique. Depois de cada alteração, salve no editor e atualize a aba. Nenhum servidor, biblioteca ou conta é necessário. Trechos das soluções devem substituir ou entrar nas partes indicadas desse documento completo. Para o exemplo, crie também sobre.html com um h1 e um link de volta para index.html. Crie sala.svg na mesma pasta com o conteúdo fornecido na prática guiada. SVG é um formato de imagem de texto; nesta aula só o salvaremos, sem precisar estudar sua sintaxe.",
    "why": "Uma página útil conecta informações. Links errados interrompem tarefas; imagens sem contexto podem excluir quem não as vê. O objetivo é construir uma navegação previsível e escolher como cada recurso participa da mensagem. A referência visual é secundária: uma pessoa deve conseguir entender o destino de um link e a informação de uma figura mesmo quando a imagem não carrega.",
    "sections": [
      {
        "title": "1. O link tem destino e nome",
        "paragraphs": [
          "O elemento a se torna um link quando recebe href. O valor informa o destino, e o conteúdo entre abertura e fechamento forma o texto apresentado. Em \u003ca href=\"sobre.html\">Sobre o clube\u003c/a>, a pessoa lê Sobre o clube e o navegador procura sobre.html. Sem href, a não oferece a mesma navegação nativa. Não use um link sem destino real apenas para obter a aparência azul.",
          "Escreva nomes que façam sentido fora da frase: Horários dos encontros informa mais que Clique aqui. Um link navega; um button executa uma ação. Para baixar um arquivo que você hospeda, download pode sugerir um download, mas o comportamento depende do tipo de recurso, da origem e do navegador. Informe formato e tamanho quando isso ajudar, por exemplo Guia de estudos — PDF, 300 KB. Não invente um arquivo só para preencher o link."
        ]
      },
      {
        "title": "2. Caminhos absolutos, relativos e fragmentos",
        "paragraphs": [
          "Uma URL absoluta inclui o esquema e o endereço, como https://developer.mozilla.org/pt-BR/. Um caminho relativo é resolvido a partir da localização do documento. Se index.html e sobre.html estão na mesma pasta, href=\"sobre.html\" encontra o segundo arquivo. Se a imagem está em uma subpasta imagens, use imagens/sala.svg. Para subir um nível de pasta, use ../. Desenhe a árvore de pastas antes de escrever caminhos.",
          "Um caminho iniciado por / parte da raiz da origem em um site hospedado. Ele não significa simplesmente a pasta onde está seu HTML e pode se comportar de maneira inconveniente ao abrir arquivos locais. Nos primeiros exercícios use caminhos relativos sem a barra inicial. Evite C:\\Users\\... no HTML: esse endereço existe apenas no seu computador. Prefira barras / e nomes com capitalização consistente, porque muitos servidores distinguem Sala.svg de sala.svg.",
          "Um fragmento como #agenda aponta para um id do documento atual. O alvo precisa existir e seu id deve ser único. Em sobre.html#equipe, primeiro o navegador abre a outra página e depois procura equipe. Uma âncora válida nem sempre provoca um salto visível se todo o conteúdo já cabe na tela; conferir a URL e a existência do alvo é melhor que concluir que houve falha só por não perceber rolagem."
        ]
      },
      {
        "title": "3. Novas abas e destinos especiais",
        "paragraphs": [
          "Links normalmente abrem no mesmo contexto. target=\"_blank\" pede outro contexto, geralmente uma aba; use apenas quando houver motivo e avise no texto. rel=\"noopener\" explicita que a nova página não deve controlar a página de origem por window.opener. Não force outra aba em todos os links: o usuário pode preferir escolher isso pelo próprio navegador.",
          "mailto: abre o aplicativo de e-mail configurado; não envia uma mensagem automaticamente. tel: pode acionar um aplicativo de chamada em dispositivos compatíveis. Esses destinos dependem de configuração externa. O endereço example.com do exemplo é demonstrativo: não prometa atendimento. Quando um link falhar, confira primeiro o href, depois o arquivo ou serviço de destino, em vez de tentar corrigir com CSS."
        ]
      },
      {
        "title": "4. Imagens que comunicam",
        "paragraphs": [
          "img é um elemento vazio. src aponta para o recurso e alt oferece uma alternativa textual. A descrição deve transmitir a função da imagem naquele contexto. Uma foto informativa pede informação relevante; uma imagem puramente decorativa usa alt=\"\" para que tecnologias assistivas possam ignorá-la. O atributo ausente não comunica tão bem essa intenção e pode levar à leitura do nome do arquivo.",
          "Se uma imagem for o único conteúdo de um link, sua alternativa deve comunicar o destino ou propósito desse link. Uma imagem de gráfico precisa de uma explicação dos dados relevantes no texto, além de uma alternativa breve. Não repita em alt uma legenda completa se a repetição nada acrescenta. figure agrupa uma figura independente e figcaption fornece sua legenda; a legenda é visível para todos.",
          "width e height informam as dimensões intrínsecas desejadas em pixels sem escrever px no atributo. Uma proporção correta ajuda o navegador a reservar espaço antes de carregar. CSS poderá reduzir a imagem para caber em telas pequenas; informar dimensões não substitui esse ajuste. Evite arquivos muito maiores que a necessidade visual. loading=\"lazy\" pode adiar imagens fora da primeira tela, mas não é indicado como regra cega para a imagem principal logo visível."
        ]
      },
      {
        "title": "5. Áudio, vídeo e checagens de publicação",
        "paragraphs": [
          "audio e video oferecem reprodução nativa quando recebem controls. src pode apontar para o arquivo, ou elementos source podem fornecer formatos alternativos com seus tipos. Uma mensagem entre as tags oferece alternativa caso o elemento não seja suportado. Para vídeo falado, ofereça legendas sincronizadas com track e uma transcrição acessível; vídeo também pode precisar de descrição das informações visuais essenciais.",
          "Evite reprodução automática, especialmente com áudio. Legendas e transcrição são conteúdo que precisa ser produzido e revisado, não algo que a presença de uma tag resolve. Nesta aula não precisamos baixar vídeo algum: o objetivo é entender que mídia tem arquivos, formatos, controles e alternativas. Antes de publicar, abra cada link, confira cada imagem e teste a página sem depender da conexão a uma imagem remota."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Clube — links e imagens\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Conheça o clube\u003c/h1>\n\u003cnav>\u003ca href=\"#agenda\">Ir à agenda\u003c/a> · \u003ca href=\"sobre.html\">Sobre nós\u003c/a>\u003c/nav>\u003c/header>\n\u003cmain>\n  \u003csection>\u003ch2>Nosso espaço\u003c/h2>\n    \u003cfigure>\n      \u003cimg src=\"sala.svg\" width=\"320\" height=\"180\" alt=\"Mesa central com quatro cadeiras para trabalho em grupo\">\n      \u003cfigcaption>Organização prevista para os encontros presenciais.\u003c/figcaption>\n    \u003c/figure>\n    \u003cp>Confira a \u003ca href=\"https://developer.mozilla.org/pt-BR/\">documentação MDN sobre desenvolvimento web\u003c/a>.\u003c/p>\n  \u003c/section>\n  \u003csection id=\"agenda\">\u003ch2>Agenda\u003c/h2>\u003cp>Encontro aos sábados, às 10h.\u003c/p>\u003c/section>\n\u003c/main>\n\u003cfooter>\u003cp>\u003ca href=\"mailto:contato@example.com\">Escrever para o clube (endereço demonstrativo)\u003c/a>\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O link #agenda usa um id existente no mesmo arquivo.",
        "sobre.html é um arquivo irmão; mudar a pasta exige mudar o caminho.",
        "A imagem local mantém dimensões de 320 por 180 e oferece uma descrição funcional.",
        "figcaption explica o contexto sem substituir a alternativa da imagem.",
        "A URL da MDN é absoluta, enquanto mailto depende do aplicativo do usuário."
      ],
      "expected": "Uma página com dois links de navegação, uma imagem esquemática e uma agenda. Sem sala.svg a alternativa textual aparece; isso ajuda no diagnóstico, mas não significa que a imagem foi entregue."
    },
    "guided": [
      {
        "instruction": "Salve sala.svg na pasta do HTML com este conteúdo: \u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"320\" height=\"180\" viewBox=\"0 0 320 180\">\u003crect width=\"320\" height=\"180\" fill=\"#eeeeee\"/>\u003crect x=\"100\" y=\"60\" width=\"120\" height=\"60\" fill=\"#b77945\"/>\u003cg fill=\"#334155\">\u003crect x=\"120\" y=\"30\" width=\"30\" height=\"20\"/>\u003crect x=\"170\" y=\"30\" width=\"30\" height=\"20\"/>\u003crect x=\"120\" y=\"130\" width=\"30\" height=\"20\"/>\u003crect x=\"170\" y=\"130\" width=\"30\" height=\"20\"/>\u003c/g>\u003c/svg>",
        "result": "Depois de atualizar, aparece uma mesa retangular com quatro cadeiras; nenhum recurso remoto é necessário."
      },
      {
        "instruction": "Crie sobre.html com o esqueleto da aula anterior e acrescente \u003ca href=\"index.html\">Voltar ao início\u003c/a>. Teste ida e volta.",
        "result": "Os dois arquivos abrem sem erro e os textos dos links anunciam seus destinos."
      },
      {
        "instruction": "Mude temporariamente src para ausente.svg, atualize e depois restaure sala.svg.",
        "result": "Você observa a alternativa e identifica como um caminho errado afeta o resultado."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: adicione um link para o rodapé, dando a ele id=\"contato\".",
        "hints": [
          "id deve ser único.",
          "O href do link começa com #."
        ],
        "solution": "\u003ca href=\"#contato\">Ir ao contato\u003c/a>\n\u003c!-- Modifique o rodapé existente: -->\n\u003cfooter id=\"contato\">\u003cp>Contato do clube.\u003c/p>\u003c/footer>",
        "explanation": "O alvo e o fragmento devem ter exatamente o mesmo nome; acrescente o link à nav e modifique o rodapé, sem duplicá-lo.",
        "expected": "O endereço recebe #contato e existe exatamente um alvo correspondente."
      },
      {
        "prompt": "Completar: mova sala.svg para uma pasta imagens e atualize apenas o atributo necessário.",
        "hints": [
          "O HTML continua na pasta anterior.",
          "src deve expressar o caminho da página até a imagem."
        ],
        "solution": "\u003cimg src=\"imagens/sala.svg\" width=\"320\" height=\"180\" alt=\"Mesa central com quatro cadeiras para trabalho em grupo\">",
        "explanation": "Não é preciso mudar a alternativa, porque a função da imagem continua igual.",
        "expected": "A imagem carrega depois de mover o arquivo e atualizar a página."
      },
      {
        "prompt": "Construir: crie duas páginas, início e encontros, com links de ida e volta. Na página encontros coloque uma figura local, legenda e uma seção com id para um link interno.",
        "hints": [
          "Use um arquivo por página e o esqueleto completo nos dois.",
          "Você pode reutilizar sala.svg; escreva textos e destinos próprios."
        ],
        "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Encontros\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Encontros do clube\u003c/h1>\u003cnav>\u003ca href=\"index.html\">Início\u003c/a> · \u003ca href=\"#horario\">Horário\u003c/a>\u003c/nav>\u003c/header>\u003cmain>\u003cfigure>\u003cimg src=\"sala.svg\" width=\"320\" height=\"180\" alt=\"Mesa central com quatro cadeiras\">\u003cfigcaption>Espaço para trabalhar em grupo.\u003c/figcaption>\u003c/figure>\u003csection id=\"horario\">\u003ch2>Horário\u003c/h2>\u003cp>Sábado, 10h.\u003c/p>\u003c/section>\u003c/main>\n\u003c/body>\n\u003c/html>\n\u003c!-- Na nav de index.html acrescente: \u003ca href=\"encontros.html\">Encontros\u003c/a> -->",
        "explanation": "Confira o conjunto de arquivos, não só a página principal. Se moveu a imagem no exercício anterior, ajuste src para imagens/sala.svg.",
        "expected": "Ambas as páginas abrem, os links retornam ao destino correto e a imagem tem descrição e legenda."
      },
      {
        "prompt": "Depurar: uma página usa href=\"#horarios\", mas o alvo tem id=\"horario\"; sua imagem usa src=\"Sala.svg\", enquanto o arquivo se chama sala.svg. Corrija e explique cada erro.",
        "hints": [
          "Compare os caracteres do fragmento e do id.",
          "Use a mesma capitalização do nome salvo."
        ],
        "solution": "\u003ca href=\"#horario\">Ver horário\u003c/a>\n\u003cimg src=\"sala.svg\" width=\"320\" height=\"180\" alt=\"Mesa central com quatro cadeiras\">",
        "explanation": "São referências a destinos diferentes. Um computador que ignora maiúsculas pode esconder o segundo erro até a publicação.",
        "expected": "O fragmento corresponde a um alvo real e o caminho corresponde ao arquivo."
      }
    ],
    "mistakes": [
      "Imagem quebrada: compare pasta, extensão e maiúsculas em src; alt não conserta um arquivo ausente.",
      "Link não salta: verifique o id e se há espaço suficiente para rolar antes de concluir que falhou.",
      "Link Clique aqui: substitua por uma descrição do destino.",
      "Imagem decorativa anunciada como informação: mantenha alt vazio quando ela não acrescentar conteúdo."
    ],
    "quiz": [
      {
        "question": "Qual caminho aponta a uma imagem na subpasta imagens?",
        "options": [
          "imagens/sala.svg",
          "C:\\imagens\\sala.svg",
          "#imagens"
        ],
        "correctIndex": 0,
        "explanation": "O caminho relativo desce da pasta do HTML para imagens."
      },
      {
        "question": "Quando usar alt=\"\"?",
        "options": [
          "Em toda imagem grande.",
          "Quando a imagem é puramente decorativa naquele contexto.",
          "Quando não sabemos descrever uma informação importante."
        ],
        "correctIndex": 1,
        "explanation": "Alternativa vazia comunica que a imagem não acrescenta informação; imagens informativas precisam de alternativa."
      },
      {
        "question": "Um link mailto envia o e-mail sozinho?",
        "options": [
          "Sim, sempre.",
          "Sim, se tiver target.",
          "Não; solicita abertura de um aplicativo configurado."
        ],
        "correctIndex": 2,
        "explanation": "O usuário ainda precisa compor e enviar a mensagem no aplicativo."
      }
    ],
    "summary": [
      "Links precisam de nomes e destinos compreensíveis.",
      "Caminhos dependem da organização dos arquivos.",
      "Alternativas de mídia fazem parte da entrega do conteúdo."
    ]
  },
"html-forms": {
    "prerequisites": "A aula anterior deste módulo; nenhum conhecimento de CSS ou JavaScript é necessário.",
    "setup": "Crie uma pasta chamada estudos-web. Use um editor de texto simples ou de código, sem formatação de documento. Copie o exemplo completo para index.html e salve em UTF-8. Confira que o nome não terminou em .html.txt. Abra o arquivo no navegador com duplo clique. Depois de cada alteração, salve no editor e atualize a aba. Nenhum servidor, biblioteca ou conta é necessário. Trechos das soluções devem substituir ou entrar nas partes indicadas desse documento completo. Use somente dados fictícios: este formulário faz uma demonstração GET na própria página e não possui serviço de cadastro. Conforme o navegador, a URL de arquivo local pode exibir a consulta ou o envio local pode não ser suportado; isso não invalida os testes de rótulos e campos. Não use informações pessoais.",
    "why": "Um formulário é uma conversa estruturada: a página pergunta, a pessoa responde e uma ação tenta enviar esses dados. A qualidade depende de a pergunta estar clara, de o controle aceitar o tipo adequado e de haver retorno compreensível. Vamos separar essas responsabilidades antes de pensar em um cadastro real. HTML oferece controles e parte da validação; um sistema que recebe, protege e salva informações exige um servidor e regras próprias.",
    "sections": [
      {
        "title": "1. A anatomia de um campo",
        "paragraphs": [
          "form agrupa os controles de uma operação. label fornece o nome visível do campo; seu for aponta para o id do controle. Ao clicar no rótulo, o navegador pode focar ou ativar o campo correspondente. Essa relação também fornece um nome para tecnologias assistivas. Um placeholder é uma sugestão temporária dentro do campo e desaparece durante a digitação; não substitui label nem instruções permanentes.",
          "id identifica o elemento na página. name identifica a informação enviada. value contém o valor, inicialmente definido no HTML ou preenchido pela pessoa conforme o controle. Em um input com id=\"email\" e name=\"contato\", o label usa for=\"email\", mas o nome do dado enviado é contato. É possível usar nomes iguais para simplificar, mas as funções continuam diferentes. Um campo sem name pode aparecer e funcionar visualmente, mas não participa como esperado no envio nativo.",
          "Use um id diferente em cada controle. Controles radio compartilham name para formar uma escolha exclusiva, mas ainda precisam de ids distintos. Em radio e checkbox, value define o valor enviado quando marcados. Um checkbox desmarcado normalmente não produz esse par de nome e valor; não suponha que o servidor receberá automaticamente a palavra false."
        ]
      },
      {
        "title": "2. Escolher o controle correto",
        "paragraphs": [
          "input type=\"text\" serve para texto curto. email acrescenta verificação básica de formato e pode adaptar o teclado virtual. password oculta visualmente os caracteres, mas não criptografa uma transmissão. number representa quantidades numéricas, com limites min, max e passo step quando necessário; não é uma boa escolha para telefone ou documento, que são identificadores e podem ter zeros iniciais.",
          "type=\"date\" oferece seleção de data, cuja aparência varia entre navegadores. checkbox representa uma opção independente; radio permite escolher uma alternativa de um grupo de mesmo name. select apresenta opções: o texto de option é o rótulo mostrado, enquanto seu value é o valor enviado. textarea recebe texto de várias linhas; seu conteúdo inicial fica entre as tags, não em um atributo value.",
          "button type=\"submit\" tenta enviar o formulário. button type=\"button\" não envia automaticamente e costuma receber comportamento por JavaScript, que não será necessário nesta aula. Dentro de form, omitir type pode causar um envio inesperado. Um botão reset apaga alterações dos campos e é fácil de acionar sem querer; não o adicione só para preencher a interface."
        ]
      },
      {
        "title": "3. Agrupamento e instruções",
        "paragraphs": [
          "fieldset reúne controles relacionados e legend descreve o grupo. Use grupos como Dados pessoais e Preferências em vez de uma lista longa sem organização. Em grupos de radio, uma legend específica pode descrever a pergunta comum enquanto cada label nomeia uma alternativa. Os parágrafos do exemplo separam campos para facilitar a leitura sem exigir CSS.",
          "autocomplete informa a finalidade de campos usuais, como name e email, para que o navegador possa oferecer preenchimento. Não garante que o preenchimento ocorrerá e não substitui name. Escreva instruções antes do erro: marque visivelmente campos obrigatórios e explique limites relevantes. Não peça dados que não serão usados. Uma página de exercício pode trabalhar inteiramente com nomes e endereços fictícios."
        ]
      },
      {
        "title": "4. Validação nativa: o que testar",
        "paragraphs": [
          "required torna o preenchimento obrigatório em controles compatíveis. minlength e maxlength definem limites de comprimento em campos de texto compatíveis. email verifica uma forma sintática, não se o endereço existe. min e max restringem valores e datas em tipos compatíveis. pattern permite um padrão de texto, mas regras complexas mal explicadas dificultam o uso; nesta base priorizamos restrições simples e justificáveis.",
          "O navegador geralmente verifica as restrições ao tentar enviar e leva o foco ao primeiro campo inválido. O texto exato da mensagem varia conforme navegador e idioma; teste o comportamento, não uma frase específica. Para minlength, digite manualmente um valor curto ao testar. Restrições nativas podem ter diferenças quando valores são definidos por código. Uma entrada aceita pelo navegador ainda pode estar errada para as regras do negócio.",
          "required é booleano: required=\"false\" continua obrigatório. disabled desativa o controle e geralmente o exclui do envio e da navegação sequencial; readonly permite leitura sem edição em controles compatíveis e mantém diferenças de foco e envio. Não use disabled como maneira de mostrar um dado que ainda precisa ser enviado. Limites do lado do cliente podem ser contornados, portanto um servidor real deve validar tudo novamente."
        ]
      },
      {
        "title": "5. GET, POST e o que não existe neste laboratório",
        "paragraphs": [
          "action informa o destino do envio e method escolhe o método. GET inclui dados na parte de consulta da URL e costuma ser apropriado para buscas e filtros. POST normalmente envia dados no corpo da requisição e é usado para operações que mudam estado. POST não torna os dados secretos por si só: proteção durante o transporte depende de HTTPS, além das demais práticas do sistema.",
          "Nosso action=\"#resultado\" usa a própria página como destino demonstrativo. Não há backend, banco, mensagem automática nem confirmação real de inscrição. A URL pode exibir nome e e-mail fictícios depois do envio GET; isso mostra por que não devemos colocar segredos na consulta. Ao testar localmente, não confunda uma recarga com cadastro concluído. A interface deve dizer claramente que é um laboratório.",
          "Confira quatro situações: envio vazio, e-mail malformado, nome curto digitado e dados fictícios válidos. Depois clique nos rótulos, use Tab para percorrer controles, setas no grupo de radio e Espaço para marcar a opção. Um formulário não está pronto só porque aceita o caminho feliz; a pessoa precisa conseguir compreender e corrigir cada impedimento."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Inscrição demonstrativa\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Inscrição no clube\u003c/h1>\u003c/header>\n\u003cmain>\n  \u003cp>Laboratório: nenhum cadastro é armazenado. Use dados fictícios.\u003c/p>\n  \u003cform action=\"#resultado\" method=\"get\">\n    \u003cfieldset>\u003clegend>Seus dados\u003c/legend>\n      \u003cp>\u003clabel for=\"nome\">Nome (obrigatório)\u003c/label>\n      \u003cinput id=\"nome\" name=\"nome\" type=\"text\" autocomplete=\"name\" minlength=\"2\" required>\u003c/p>\n      \u003cp>\u003clabel for=\"email\">E-mail (obrigatório)\u003c/label>\n      \u003cinput id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" required>\u003c/p>\n    \u003c/fieldset>\n    \u003cfieldset>\u003clegend>Preferências\u003c/legend>\n      \u003cp>\u003clabel for=\"turno\">Turno\u003c/label>\n      \u003cselect id=\"turno\" name=\"turno\">\u003coption value=\"manha\">Manhã\u003c/option>\u003coption value=\"tarde\">Tarde\u003c/option>\u003c/select>\u003c/p>\n      \u003cp>Modalidade:\u003c/p>\n      \u003cp>\u003cinput id=\"online\" name=\"modalidade\" type=\"radio\" value=\"online\" checked>\u003clabel for=\"online\">On-line\u003c/label>\n      \u003cinput id=\"presencial\" name=\"modalidade\" type=\"radio\" value=\"presencial\">\u003clabel for=\"presencial\">Presencial\u003c/label>\u003c/p>\n      \u003cp>\u003clabel for=\"objetivo\">O que deseja aprender?\u003c/label>\n      \u003ctextarea id=\"objetivo\" name=\"objetivo\" rows=\"4\" maxlength=\"300\">\u003c/textarea>\u003c/p>\n      \u003cp>\u003cinput id=\"lembrete\" name=\"lembrete\" type=\"checkbox\" value=\"sim\">\u003clabel for=\"lembrete\">Quero receber lembrete\u003c/label>\u003c/p>\n    \u003c/fieldset>\n    \u003cbutton type=\"submit\">Testar envio local\u003c/button>\n  \u003c/form>\n  \u003csection id=\"resultado\">\u003ch2>Sobre este teste\u003c/h2>\u003cp>O envio GET pode aparecer na URL; nenhum cadastro real é criado.\u003c/p>\u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "Cada label aponta para um id existente, enquanto os names definem os pares enviados.",
        "fieldset e legend apresentam grupos reconhecíveis sem depender de cor.",
        "Os radios têm ids diferentes e o mesmo name, permitindo uma única modalidade.",
        "required e minlength restringem nome; email acrescenta a verificação sintática.",
        "O envio GET é demonstrativo e seu destino não armazena informações."
      ],
      "expected": "Campos agrupados, seleção exclusiva de modalidade e um botão de teste. Campos vazios e e-mail inválido impedem o envio nativo; dados válidos podem atualizar a URL, mas não criam cadastro."
    },
    "guided": [
      {
        "instruction": "Clique no texto E-mail e digite um endereço sem @; tente enviar após preencher Nome.",
        "result": "O campo recebe foco pelo rótulo e o navegador identifica o formato inválido."
      },
      {
        "instruction": "Use Tab até os radios e as setas para mudar a modalidade; use Espaço no lembrete.",
        "result": "A modalidade é exclusiva e o lembrete é uma escolha independente."
      },
      {
        "instruction": "Digite nome com uma letra e tente enviar. Depois use Ana e ana@example.com.",
        "result": "O primeiro caso é inválido; o segundo passa nas restrições desses campos sem comprovar que a pessoa ou endereço existem."
      }
    ],
    "exercises": [
      {
        "prompt": "Guiado: acrescente um campo opcional de data de início, com rótulo e name.",
        "hints": [
          "Use type=\"date\".",
          "Opcional significa não acrescentar required."
        ],
        "solution": "\u003cp>\u003clabel for=\"inicio\">Data de início desejada (opcional)\u003c/label>\u003cinput id=\"inicio\" name=\"inicio\" type=\"date\">\u003c/p>",
        "explanation": "Insira dentro de form. O seletor varia visualmente, mas continua representando uma data.",
        "expected": "O rótulo foca o campo e o formulário permite deixá-lo vazio."
      },
      {
        "prompt": "Completar: faça o select de turno exigir uma escolha explícita, começando com Selecione um turno.",
        "hints": [
          "A primeira option deve ter value vazio.",
          "O select precisa de required e rótulo que avise a obrigatoriedade."
        ],
        "solution": "\u003clabel for=\"turno\">Turno (obrigatório)\u003c/label>\n\u003cselect id=\"turno\" name=\"turno\" required>\u003coption value=\"\">Selecione um turno\u003c/option>\u003coption value=\"manha\">Manhã\u003c/option>\u003coption value=\"tarde\">Tarde\u003c/option>\u003c/select>",
        "explanation": "O valor vazio não satisfaz required; uma opção já escolhida automaticamente não faria o mesmo teste.",
        "expected": "Enviar sem selecionar um turno é impedido; escolher Manhã permite avançar."
      },
      {
        "prompt": "Construir: crie um formulário de pedido de ajuda com assunto obrigatório, e-mail obrigatório e mensagem de pelo menos 20 caracteres. Avise que é uma demonstração e use dados fictícios.",
        "hints": [
          "Use text, email e textarea.",
          "Dê a cada campo label, id e name; escreva o limite antes da tentativa de envio."
        ],
        "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Pedido de ajuda\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cmain>\u003ch1>Pedido de ajuda\u003c/h1>\u003cp>Demonstração local; nenhuma mensagem é enviada. Todos os campos são obrigatórios.\u003c/p>\u003cform action=\"#aviso\" method=\"get\">\u003cp>\u003clabel for=\"assunto\">Assunto\u003c/label>\u003cinput id=\"assunto\" name=\"assunto\" required>\u003c/p>\u003cp>\u003clabel for=\"contato\">E-mail\u003c/label>\u003cinput id=\"contato\" name=\"contato\" type=\"email\" required>\u003c/p>\u003cp>\u003clabel for=\"mensagem\">Mensagem (mínimo de 20 caracteres)\u003c/label>\u003ctextarea id=\"mensagem\" name=\"mensagem\" minlength=\"20\" required>\u003c/textarea>\u003c/p>\u003cbutton type=\"submit\">Testar validação\u003c/button>\u003c/form>\u003cp id=\"aviso\">Nenhum serviço de envio está conectado.\u003c/p>\u003c/main>\n\u003c/body>\n\u003c/html>",
        "explanation": "Teste cada restrição separadamente, mantendo os outros campos válidos para localizar a causa.",
        "expected": "Campos vazios, e-mail inválido e mensagem curta são recusados; os rótulos funcionam por clique."
      },
      {
        "prompt": "Depurar: corrija \u003clabel for=\"mail\">E-mail\u003c/label>\u003cinput id=\"email\" type=\"email\" required=\"false\"> para um e-mail opcional que participe do envio.",
        "hints": [
          "O for deve corresponder ao id.",
          "Remova o booleano e acrescente name."
        ],
        "solution": "\u003clabel for=\"email\">E-mail (opcional)\u003c/label>\u003cinput id=\"email\" name=\"email\" type=\"email\">",
        "explanation": "O campo pode ficar vazio, mas se preenchido ainda deve satisfazer o formato de email. São três correções diferentes.",
        "expected": "Clique no rótulo foca o campo, vazio é permitido e o dado preenchido tem nome no envio."
      }
    ],
    "mistakes": [
      "Campo sem rótulo: placeholder não resolve; associe label por for/id.",
      "Dado ausente na consulta: confira name e se o controle estava desativado ou desmarcado.",
      "Botão envia sem querer: explicite type=\"button\" quando não for envio; aqui mantenha submit no botão principal.",
      "POST tratado como criptografia: explique que método e proteção de transporte têm papéis diferentes."
    ],
    "quiz": [
      {
        "question": "Qual atributo define o nome do dado enviado?",
        "options": [
          "id",
          "name",
          "placeholder"
        ],
        "correctIndex": 1,
        "explanation": "id conecta elementos da página; name identifica o par enviado."
      },
      {
        "question": "O que required=\"false\" faz?",
        "options": [
          "Mantém o campo obrigatório.",
          "Torna o campo opcional.",
          "Apaga o campo."
        ],
        "correctIndex": 0,
        "explanation": "Atributos booleanos são verdadeiros pela presença."
      },
      {
        "question": "Um e-mail aceito por type=\"email\" está comprovadamente ativo?",
        "options": [
          "Sim.",
          "Só com autocomplete.",
          "Não; a validação é de formato."
        ],
        "correctIndex": 2,
        "explanation": "Existência e posse do endereço exigem procedimentos além do HTML."
      }
    ],
    "summary": [
      "Rótulo, identificador e nome enviado têm funções diferentes.",
      "Controles nativos reduzem trabalho e oferecem comportamentos úteis.",
      "Validação e envio local não criam um sistema de cadastro."
    ]
  },
"html-tables": {
    "prerequisites": "A aula anterior deste módulo; nenhum conhecimento de CSS ou JavaScript é necessário.",
    "setup": "Crie uma pasta chamada estudos-web. Use um editor de texto simples ou de código, sem formatação de documento. Copie o exemplo completo para index.html e salve em UTF-8. Confira que o nome não terminou em .html.txt. Abra o arquivo no navegador com duplo clique. Depois de cada alteração, salve no editor e atualize a aba. Nenhum servidor, biblioteca ou conta é necessário. Trechos das soluções devem substituir ou entrar nas partes indicadas desse documento completo.",
    "why": "Uma tabela permite cruzar duas informações: uma linha identifica um item e uma coluna identifica uma característica. Se o leitor pergunta quantas horas práticas estão previstas para CSS, a resposta fica no encontro dessas coordenadas. Marcar essa relação corretamente é tão importante quanto mostrar números alinhados. A aula trabalha com dados pequenos para que você consiga conferir cada célula e explicar seu significado.",
    "sections": [
      {
        "title": "1. Escolher e planejar os dados",
        "paragraphs": [
          "Use table quando existe uma relação estável entre linhas e colunas: produtos e preços, dias e horários, tecnologias e horas. Cada célula deve poder ser interpretada por seu cabeçalho de linha, de coluna ou ambos. Se os conteúdos são apenas cartões independentes, uma lista ou seções provavelmente expressam melhor a relação. Aparência alinhada, sozinha, não justifica uma tabela.",
          "Antigamente tabelas eram usadas para organizar cabeçalho, menu e conteúdo de páginas inteiras. Isso mistura a estrutura dos dados com posicionamento visual e dificulta adaptação a telas pequenas. Neste curso o layout será feito com CSS. Mesmo que uma tabela deixe tudo alinhado rapidamente, reserve-a para dados cujo cruzamento realmente importa.",
          "Antes de escrever tags, desenhe a tabela no papel. Dê um nome a cada coluna e registre o tipo de informação esperado. Na tabela desta aula, Tema contém nomes e Teoria (h) e Prática (h) contêm quantidades de horas. A unidade no cabeçalho evita que o leitor precise adivinhar se 3 significa minutos, encontros ou horas. Uma coluna deve manter o mesmo significado em todas as linhas.",
          "Escolha dados suficientemente pequenos para conferir manualmente. HTML não identifica que um total está errado nem distingue número de texto dentro de td. Se você escrever sete em uma linha e 7 em outra, o navegador mostrará os dois. A consistência dos valores é sua responsabilidade. Não confunda ausência de informação com zero: zero significa uma quantidade conhecida, enquanto Não informado expressa uma lacuna."
        ]
      },
      {
        "title": "2. Marcar células, cabeçalhos e grupos",
        "paragraphs": [
          "table envolve a tabela. tr representa uma linha. th representa uma célula de cabeçalho e td representa uma célula de dados. caption dá um título à tabela e deve aparecer no início de sua estrutura. No exemplo, o h1 é o assunto da página e caption identifica especificamente o conjunto de dados; são níveis diferentes de descrição.",
          "Não coloque texto solto diretamente dentro de table ou tr. A linha contém células; as células contêm o texto. Uma linha simples deste exemplo possui três células. Se uma linha tiver apenas duas por engano, os valores seguintes podem parecer associados à coluna errada. A contagem de células faz parte da revisão, e a indentação ajuda a enxergar a forma retangular.",
          "scope=\"col\" informa que o th identifica sua coluna. scope=\"row\" informa que ele identifica sua linha. No exemplo, HTML e CSS são cabeçalhos de linha, não apenas dados estilizados em negrito: eles nomeiam os conjuntos de horas. O navegador aplica uma aparência padrão a th, mas usar td com negrito não cria a mesma associação semântica.",
          "thead reúne linhas de cabeçalho, tbody reúne dados principais e tfoot reúne resumos ou rodapé dos dados. Esses elementos organizam, mas não calculam nem ordenam nada. O navegador pode inserir tbody na árvore interpretada mesmo quando ele foi omitido no arquivo; escrevê-lo explicitamente torna a intenção mais clara. Um tfoot não substitui o footer da página, que tem outro escopo.",
          "Associações bem marcadas ajudam tecnologias assistivas a contextualizar células. Entretanto, uma tabela pode se tornar difícil de entender mesmo sendo tecnicamente válida. Prefira cabeçalhos claros e estruturas simples. Para tabelas complexas com vários níveis, podem ser necessárias associações mais detalhadas por id e headers; não as invente sem necessidade quando uma divisão em tabelas menores resolveria melhor."
        ]
      },
      {
        "title": "3. Mesclagens e apresentação sem esconder os dados",
        "paragraphs": [
          "colspan faz uma célula ocupar mais de uma coluna e rowspan faz ocupar mais de uma linha. Ao usar essas mesclagens, conte os espaços ocupados, não apenas o número de tags. Para uma tabela de três colunas, uma célula com colspan=\"3\" ocupa toda a largura estrutural daquela linha. Mesclar não soma valores nem cria cabeçalhos automaticamente.",
          "Evite começar com mesclagens extensas: elas tornam a leitura e a revisão mais difíceis. Se precisar escrever uma observação geral, um parágrafo antes ou depois da tabela pode ser mais claro que uma célula gigante. Não use atributos antigos como border, bgcolor ou align para estilizar; na parte de CSS aprenderemos bordas, espaçamento e alinhamento de apresentação.",
          "Em telas estreitas uma tabela larga pode precisar de um contêiner com rolagem horizontal, que será estudado em CSS. Não remova colunas importantes só para caber e não reduza o texto a um tamanho ilegível. Nesta etapa, mantenha textos curtos, use zoom do navegador e confira se consegue associar cada valor ao cabeçalho. A ausência de bordas no exemplo é normal e não indica erro estrutural."
        ]
      },
      {
        "title": "4. Como conferir uma tabela sem adivinhar",
        "paragraphs": [
          "Faça perguntas concretas: quantas horas práticas de HTML, quantas horas teóricas de CSS e qual o total de prática? No exemplo as respostas são 3, 2 e 7. Leia cada linha da esquerda para a direita, depois cada coluna de cima para baixo. Se uma resposta parece depender de uma célula vizinha inesperada, verifique se faltou td ou se uma mesclagem está ocupando a posição.",
          "Altere um dado e recalcule os totais. Isso mostra a diferença entre documento estático e planilha: a tabela HTML registra o resultado que você escreveu. Inspecione a árvore do navegador e confira caption, thead, tbody, tfoot e scopes. A avaliação do exercício considera estrutura, significado e coerência, não a quantidade de decoração."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Agenda do clube\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003ch1>Planeje seus estudos\u003c/h1>\u003c/header>\n\u003cmain>\n  \u003cp>A tabela compara as horas semanais previstas para cada tema.\u003c/p>\n  \u003ctable>\n    \u003ccaption>Plano semanal — horas de estudo\u003c/caption>\n    \u003cthead>\u003ctr>\u003cth scope=\"col\">Tema\u003c/th>\u003cth scope=\"col\">Teoria (h)\u003c/th>\u003cth scope=\"col\">Prática (h)\u003c/th>\u003c/tr>\u003c/thead>\n    \u003ctbody>\n      \u003ctr>\u003cth scope=\"row\">HTML\u003c/th>\u003ctd>2\u003c/td>\u003ctd>3\u003c/td>\u003c/tr>\n      \u003ctr>\u003cth scope=\"row\">CSS\u003c/th>\u003ctd>2\u003c/td>\u003ctd>4\u003c/td>\u003c/tr>\n    \u003c/tbody>\n    \u003ctfoot>\u003ctr>\u003cth scope=\"row\">Total\u003c/th>\u003ctd>4\u003c/td>\u003ctd>7\u003c/td>\u003c/tr>\u003c/tfoot>\n  \u003c/table>\n  \u003cp>Os totais foram calculados manualmente; HTML não faz a soma.\u003c/p>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "caption nomeia a tabela, enquanto o parágrafo anterior explica sua leitura.",
        "A primeira linha usa três th com scope col; cada tema usa th com scope row.",
        "Os td contêm somente as quantidades correspondentes aos cabeçalhos.",
        "thead, tbody e tfoot distinguem funções das linhas sem calcular valores.",
        "4 e 7 foram somados manualmente; editar uma linha exige revisar esses totais."
      ],
      "expected": "Uma tabela de três colunas com duas linhas de temas e uma linha de totais. HTML tem 2 h de teoria e 3 h de prática; CSS tem 2 h e 4 h. Os totais são 4 h e 7 h."
    },
    "guided": [
      {
        "instruction": "Localize a célula que responde quantas horas práticas de CSS estão previstas.",
        "result": "Você encontra 4 cruzando a linha CSS com a coluna Prática (h)."
      },
      {
        "instruction": "Troque a prática de HTML de 3 para 5 e recalcule o total correspondente.",
        "result": "O total de prática precisa mudar de 7 para 9; o navegador não faz essa mudança sozinho."
      },
      {
        "instruction": "Inspecione a célula CSS e seus atributos.",
        "result": "Ela é th com scope row, porque nomeia a linha inteira."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de editar, diga quais serão os totais ao acrescentar JavaScript com 1 h de teoria e 2 h de prática e se tfoot os atualizará sozinho. Depois restaure os dados originais, acrescente a linha e atualize os totais.",
        "hints": [
          "A linha vai dentro de tbody.",
          "O primeiro conteúdo é um th de linha; os outros dois são td."
        ],
        "solution": "\u003ctr>\u003cth scope=\"row\">JavaScript\u003c/th>\u003ctd>1\u003c/td>\u003ctd>2\u003c/td>\u003c/tr>\n\u003c!-- No tfoot: -->\n\u003ctr>\u003cth scope=\"row\">Total\u003c/th>\u003ctd>5\u003c/td>\u003ctd>9\u003c/td>\u003c/tr>",
        "explanation": "Somamos 1 a 4 e 2 a 7, partindo da tabela original. A nova linha não deve ficar fora de tbody.",
        "expected": "Previsão registrada antes da edição; existem três temas e os totais escritos manualmente são 5 h e 9 h."
      },
      {
        "prompt": "Alterar: uma tabela de Item e Quantidade tem \u003ctr>\u003ctd>Caderno\u003c/td>\u003ctd>2\u003c/td>\u003c/tr>. Transforme Caderno em cabeçalho da linha e acrescente o cabeçalho das colunas, preservando a quantidade 2.",
        "hints": [
          "Use th para nomear relações.",
          "Scope de coluna e de linha são diferentes."
        ],
        "solution": "\u003cthead>\u003ctr>\u003cth scope=\"col\">Item\u003c/th>\u003cth scope=\"col\">Quantidade\u003c/th>\u003c/tr>\u003c/thead>\n\u003ctbody>\u003ctr>\u003cth scope=\"row\">Caderno\u003c/th>\u003ctd>2\u003c/td>\u003c/tr>\u003c/tbody>",
        "explanation": "O trecho deve ficar dentro de table, depois de um caption apropriado. Não troque simplesmente todos os td por th.",
        "expected": "Os nomes das colunas e do item têm escopos explícitos."
      },
      {
        "prompt": "Construir: crie uma página completa com uma tabela de três encontros, contendo dia, tema e duração em minutos. Inclua caption, cabeçalhos e uma nota dizendo se os horários são fictícios.",
        "hints": [
          "Planeje três colunas antes de escrever.",
          "Cada encontro precisa de três células; o dia pode nomear a linha."
        ],
        "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Agenda de encontros\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cmain>\u003ch1>Agenda de encontros\u003c/h1>\u003cp>Dados fictícios para estudo.\u003c/p>\u003ctable>\u003ccaption>Encontros da primeira semana\u003c/caption>\u003cthead>\u003ctr>\u003cth scope=\"col\">Dia\u003c/th>\u003cth scope=\"col\">Tema\u003c/th>\u003cth scope=\"col\">Duração (min)\u003c/th>\u003c/tr>\u003c/thead>\u003ctbody>\u003ctr>\u003cth scope=\"row\">Segunda\u003c/th>\u003ctd>Elementos\u003c/td>\u003ctd>60\u003c/td>\u003c/tr>\u003ctr>\u003cth scope=\"row\">Quarta\u003c/th>\u003ctd>Links\u003c/td>\u003ctd>45\u003c/td>\u003c/tr>\u003ctr>\u003cth scope=\"row\">Sexta\u003c/th>\u003ctd>Formulários\u003c/td>\u003ctd>90\u003c/td>\u003c/tr>\u003c/tbody>\u003c/table>\u003c/main>\n\u003c/body>\n\u003c/html>",
        "explanation": "Os dados podem mudar, mas a unidade e as relações devem permanecer claras. Tfoot é opcional quando não há resumo.",
        "expected": "Cada duração pode ser associada a exatamente um dia e a um tema."
      },
      {
        "prompt": "Investigar erro: uma tabela com colunas Tema, Teoria e Prática contém \u003ctr>\u003cth scope=\"col\">HTML\u003c/th>\u003ctd>2\u003c/td>\u003c/tr>. O valor de prática deveria ser 3. Identifique a associação e a célula ausente antes de corrigir.",
        "hints": [
          "HTML nomeia uma linha, não a coluna.",
          "Falta uma célula para a terceira coluna."
        ],
        "solution": "\u003ctr>\u003cth scope=\"row\">HTML\u003c/th>\u003ctd>2\u003c/td>\u003ctd>3\u003c/td>\u003c/tr>",
        "explanation": "A correção resolve associação e quantidade de células; não basta adicionar espaços no texto.",
        "expected": "HTML identifica a linha e as duas quantidades ficam nas colunas corretas."
      }
    ],
    "mistakes": [
      "Valores parecem deslocados: conte as células e os espaços ocupados por colspan/rowspan.",
      "Tabela usada como menu e layout: troque por elementos estruturais e reserve posicionamento para CSS.",
      "Total desatualizado: recalcule após editar; HTML não funciona como uma planilha.",
      "Cabeçalho apenas em negrito: use th e scope para expressar a relação, sem depender de estilo."
    ],
    "quiz": [
      {
        "question": "Qual conteúdo pede uma tabela?",
        "options": [
          "Três parágrafos independentes.",
          "Comparação de horas por tema e tipo de atividade.",
          "Um menu para alinhar no topo."
        ],
        "correctIndex": 1,
        "explanation": "A comparação combina eixos de dados; layout e parágrafos não precisam dessa estrutura."
      },
      {
        "question": "O que scope=\"row\" comunica?",
        "options": [
          "Que a célula de cabeçalho identifica sua linha.",
          "Que a linha será somada.",
          "Que a célula está vazia."
        ],
        "correctIndex": 0,
        "explanation": "Scope explicita a direção da associação semântica."
      },
      {
        "question": "Ao mudar 3 para 5 em uma célula, o total em tfoot muda sozinho?",
        "options": [
          "Sim, por estar em tfoot.",
          "Apenas se usar th.",
          "Não, os valores são estáticos."
        ],
        "correctIndex": 2,
        "explanation": "Agrupar dados não cria cálculo automático."
      }
    ],
    "summary": [
      "Tabelas representam relações entre linhas e colunas.",
      "Caption e cabeçalhos tornam dados interpretáveis.",
      "Coerência numérica e revisão dos dados continuam sendo responsabilidade do autor."
    ]
  },
"html-accessibility": {
    "prerequisites": "As quatro aulas de HTML anteriores: documento, links, formulários e tabelas.",
    "setup": "Crie uma pasta chamada estudos-web. Use um editor de texto simples ou de código, sem formatação de documento. Copie o exemplo completo para index.html e salve em UTF-8. Confira que o nome não terminou em .html.txt. Abra o arquivo no navegador com duplo clique. Depois de cada alteração, salve no editor e atualize a aba. Nenhum servidor, biblioteca ou conta é necessário. Trechos das soluções devem substituir ou entrar nas partes indicadas desse documento completo. Teste com o teclado e com zoom do navegador. Se o sistema operacional exigir habilitar navegação de teclado completa, faça essa configuração antes de avaliar os controles. O leitor de tela é uma ferramenta complementar: esta aula explica testes manuais básicos sem exigir que você já domine um.",
    "why": "Acessibilidade significa permitir que pessoas com diferentes formas de perceber e interagir consigam compreender e operar o conteúdo. Uma estrutura clara beneficia também quem usa teclado por preferência, está com mobilidade limitada temporariamente ou amplia a página. Não é uma camada colocada no fim: as escolhas de títulos, links, imagens e formulários das aulas anteriores já constroem essa base.",
    "sections": [
      {
        "title": "1. Conteúdo, estrutura e atalhos que orientam",
        "paragraphs": [
          "Pergunte o que a pessoa precisa fazer e quais informações permitem essa tarefa. Títulos descritivos, instruções no momento certo e linguagem direta reduzem esforço. Não dependa apenas de cor, posição ou forma: a instrução clique no botão verde à direita fica ambígua quando a apresentação muda. Prefira o nome da ação, como Testar formulário.",
          "O idioma em html ajuda a interpretar e pronunciar o conteúdo. Quando uma expressão longa estiver em outro idioma, lang pode identificar esse trecho. Informações importantes precisam existir como texto, alternativa ou estrutura acessível, não só como desenho. Uma foto de um aviso com todos os horários exige que esses horários também sejam oferecidos de forma textual.",
          "Um documento organizado pode ser entendido como um sumário: o h1 apresenta o assunto, h2 divide os tópicos e h3 detalha cada tópico. Regiões como main e nav oferecem outras formas de orientação. Não transforme toda caixa em section nem adicione títulos vazios só para preencher uma regra; a divisão deve corresponder a assuntos reais.",
          "O link Pular para o conteúdo principal permite evitar a navegação repetida. Seu href aponta para id=\"conteudo\". No exemplo, main recebe tabindex=\"-1\" para poder receber foco quando direcionado, sem entrar na sequência comum de Tab. O link permanece visível porque ainda estamos estudando HTML; esconder e mostrar um atalho com CSS exige preservar seu acesso quando focado.",
          "Quando há várias navegações, nomes distintos ajudam a identificar seus papéis. aria-label=\"Principal\" acrescenta um nome à nav do exemplo. Isso não substitui o texto dos links nem é necessário em todos os elementos. Cada atributo ARIA deve responder a uma necessidade real, e atributos mal aplicados podem piorar a informação fornecida."
        ]
      },
      {
        "title": "2. Navegação por teclado e foco",
        "paragraphs": [
          "Foco é o elemento que recebe a interação do teclado naquele momento. Tab costuma avançar entre controles interativos; Shift + Tab retorna. Enter ativa links e botões; Espaço ativa botões e checkboxes conforme o controle. Setas têm funções em grupos de radio e seletores. Essas convenções vêm dos elementos nativos: preservá-las economiza trabalho e mantém previsibilidade.",
          "O indicador de foco permite saber onde você está. Sem CSS personalizado, o navegador oferece um indicador padrão. Depois, ao estilizar, não remova outline sem oferecer outro indicador perceptível. A ordem do foco normalmente acompanha a ordem do documento. Não tente consertar uma ordem de leitura ruim com tabindex positivo; reorganize o HTML para que a sequência faça sentido.",
          "Elementos de texto comuns não precisam entrar todos na sequência de Tab. Um parágrafo pode ser lido sem receber foco dessa maneira. tabindex=\"0\" adiciona um elemento à ordem normal, mas não o transforma em um botão funcional. Uma div com tabindex ainda não ganha ativação, estado e semântica completos; prefira button quando a intenção for uma ação."
        ]
      },
      {
        "title": "3. Nome, função, descrição e estado",
        "paragraphs": [
          "Um controle precisa comunicar o que é e para que serve. Em \u003cbutton>Salvar rascunho\u003c/button>, o elemento fornece a função de botão e o texto fornece seu nome. Em um input, label normalmente fornece o nome. Uma descrição acrescenta ajuda além desse nome. No exemplo, aria-describedby=\"orientacao\" conecta o campo ao parágrafo com instruções, sem esconder a orientação de quem enxerga.",
          "Não coloque aria-label em todos os elementos automaticamente. Ele pode substituir um nome calculado de conteúdo em contextos compatíveis, criando diferença entre o texto visível e o que é anunciado. Isso confunde pessoas que usam comandos por voz e procuram o nome que está na tela. Primeiro use o HTML adequado e um rótulo visível; recorra a ARIA para complementar uma necessidade que realmente exista.",
          "Elementos nativos também comunicam estados. Um checkbox marcado representa uma seleção; details aberto representa conteúdo expandido. Criar um painel com div e um símbolo de mais exigiria implementar interação, foco e estado. O par details/summary já oferece abrir e fechar sem JavaScript. summary deve ser o primeiro filho e ter um texto que anuncie o assunto."
        ]
      },
      {
        "title": "4. Uma rotina de testes manuais e validação",
        "paragraphs": [
          "Comece sem mouse. Recarregue a página e pressione Tab até o primeiro link. Observe o foco e ative o atalho. Depois percorra links, detalhes e formulário. Verifique se a ordem acompanha a leitura e se você consegue sair de cada controle, sem ficar preso. Os detalhes devem abrir e fechar pelo teclado; o formulário deve levar a um campo inválido quando necessário.",
          "Aumente o zoom para 200% e confira se informações e controles continuam disponíveis. Esse teste não prova acessibilidade completa, mas revela cortes e sobreposições frequentes. No HTML simples o texto tende a quebrar naturalmente; quando o CSS for aplicado, será necessário repetir o teste. Não bloqueie zoom com parâmetros restritivos no viewport.",
          "Leia apenas títulos e textos de links. O conjunto ainda explica a organização e os destinos? Clique nos rótulos e confira se o campo correspondente recebe foco. Verifique imagens informativas e decorativas separadamente. Registre problemas com ação, resultado observado e resultado esperado: isso produz uma correção verificável, não uma avaliação vaga como parece acessível.",
          "Um verificador de HTML pode encontrar tags mal aninhadas, atributos inválidos e alguns ids duplicados. Uma auditoria de acessibilidade pode detectar certos rótulos ausentes e problemas de contraste quando houver CSS. Essas ferramentas são complementares ao conteúdo da aula, não leituras obrigatórias. Nenhuma delas sabe automaticamente se uma alternativa textual descreve bem uma imagem ou se uma instrução faz sentido para iniciantes.",
          "Uma boa revisão combina estrutura, testes de interação e avaliação humana do conteúdo. Se você ainda não testou com leitor de tela ou usuários, registre esse limite em vez de declarar conformidade completa. Nesta etapa, o objetivo verificável é construir uma página semanticamente organizada, percorrível por teclado e com nomes e instruções explícitos. O próximo módulo acrescentará contraste, apresentação e adaptação visual."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Clube — página acessível\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003ca href=\"#conteudo\">Pular para o conteúdo principal\u003c/a>\n\u003cheader>\u003ch1>Clube de estudos\u003c/h1>\n  \u003cnav aria-label=\"Principal\">\u003ca href=\"#encontros\">Encontros\u003c/a> · \u003ca href=\"#duvidas\">Dúvidas\u003c/a>\u003c/nav>\n\u003c/header>\n\u003cmain id=\"conteudo\" tabindex=\"-1\">\n  \u003csection id=\"encontros\">\u003ch2>Encontros\u003c/h2>\u003cp>Atividades gratuitas para iniciantes.\u003c/p>\n    \u003ch3>Primeiro encontro\u003c/h3>\u003cp>Traga um caderno. Não é necessário conhecimento prévio.\u003c/p>\n  \u003c/section>\n  \u003csection id=\"duvidas\">\u003ch2>Dúvidas frequentes\u003c/h2>\n    \u003cdetails>\u003csummary>Preciso instalar algum programa?\u003c/summary>\u003cp>Para esta etapa, basta um editor de texto e um navegador.\u003c/p>\u003c/details>\n    \u003cdetails>\u003csummary>Como testar a navegação por teclado?\u003c/summary>\u003cp>Use Tab para avançar, Shift + Tab para voltar e Enter para ativar um link.\u003c/p>\u003c/details>\n  \u003c/section>\n  \u003csection>\u003ch2>Solicitar informações\u003c/h2>\u003cp>Demonstração sem envio real.\u003c/p>\n    \u003cform action=\"#aviso\" method=\"get\">\n      \u003clabel for=\"contato\">E-mail fictício (obrigatório)\u003c/label>\n      \u003cinput id=\"contato\" name=\"contato\" type=\"email\" aria-describedby=\"orientacao\" required>\n      \u003cp id=\"orientacao\">Use um endereço de exemplo, como ana@example.com.\u003c/p>\n      \u003cbutton type=\"submit\">Testar formulário\u003c/button>\n    \u003c/form>\n    \u003cp id=\"aviso\">Nenhuma mensagem foi enviada por este laboratório.\u003c/p>\n  \u003c/section>\n\u003c/main>\n\u003cfooter>\u003cp>Conteúdo de estudo para iniciantes.\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O primeiro link oferece uma rota direta a main, sem obrigar a atravessar a navegação.",
        "tabindex -1 permite destino de foco sem inserir main como uma parada comum de Tab.",
        "details e summary fornecem divulgação de conteúdo nativa e acessível pelo teclado.",
        "aria-describedby associa a instrução visível ao campo; label continua fornecendo seu nome.",
        "O formulário informa que é uma demonstração e não afirma um envio inexistente."
      ],
      "expected": "Uma página com atalho visível, navegação, duas perguntas expansíveis e formulário rotulado. É possível percorrer os controles com teclado e entender o conteúdo sem depender de estilos."
    },
    "guided": [
      {
        "instruction": "Abra a página, use Tab para encontrar o atalho e pressione Enter.",
        "result": "A navegação aponta para o conteúdo principal; o alvo existe e pode receber foco."
      },
      {
        "instruction": "Foque uma pergunta em summary e pressione Enter ou Espaço; repita para fechar.",
        "result": "A resposta aparece e some sem JavaScript próprio, preservando o controle nativo."
      },
      {
        "instruction": "Clique no label do e-mail e revise o parágrafo de orientação.",
        "result": "O rótulo foca o campo e a descrição continua visível enquanto você digita."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, diga se uma terceira pergunta feita com details e summary abre pelo teclado sem JavaScript. Depois acrescente a pergunta sobre custo e teste com Enter e Espaço.",
        "hints": [
          "Coloque summary primeiro.",
          "A resposta fica no mesmo details, depois de summary."
        ],
        "solution": "\u003cdetails>\u003csummary>Os encontros têm custo?\u003c/summary>\u003cp>Não. Os encontros deste exemplo são gratuitos.\u003c/p>\u003c/details>",
        "explanation": "Insira na seção de dúvidas. O comportamento de abrir e fechar não exige eventos manuais.",
        "expected": "Previsão registrada antes da execução; a pergunta aparece na ordem de leitura e abre e fecha pelo teclado."
      },
      {
        "prompt": "Alterar: no formulário do exemplo, acrescente um campo com id=\"nome\" e a instrução visível Use seu nome de preferência. Escreva rótulo, controle e conexão da descrição sem remover o campo de e-mail.",
        "hints": [
          "label associa por for.",
          "aria-describedby aponta para o id do texto de ajuda."
        ],
        "solution": "\u003clabel for=\"nome\">Nome de preferência\u003c/label>\n\u003cinput id=\"nome\" name=\"nome\" aria-describedby=\"ajuda-nome\">\n\u003cp id=\"ajuda-nome\">Use seu nome de preferência.\u003c/p>",
        "explanation": "O nome e a descrição têm funções distintas; a instrução não fica presa a um placeholder.",
        "expected": "Os dois campos continuam presentes; o novo label foca o input e o id de ajuda existe uma única vez."
      },
      {
        "prompt": "Construir: faça uma página de perguntas frequentes com h1, duas seções h2 e ao menos três detalhes expansíveis. Inclua atalho para main e navegação por fragmentos. Execute uma revisão somente com teclado.",
        "hints": [
          "Use estrutura completa e ids únicos para cada destino.",
          "Anote para cada controle a tecla usada e o resultado; não basta afirmar que funciona."
        ],
        "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n  \u003cmeta charset=\"UTF-8\">\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  \u003ctitle>Perguntas frequentes\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003ca href=\"#principal\">Pular para o conteúdo\u003c/a>\u003cheader>\u003ch1>Perguntas frequentes\u003c/h1>\u003cnav>\u003ca href=\"#entrada\">Participação\u003c/a> · \u003ca href=\"#materiais\">Materiais\u003c/a>\u003c/nav>\u003c/header>\u003cmain id=\"principal\" tabindex=\"-1\">\u003csection id=\"entrada\">\u003ch2>Participação\u003c/h2>\u003cdetails>\u003csummary>Preciso ter experiência?\u003c/summary>\u003cp>Não, o grupo começa pelos fundamentos.\u003c/p>\u003c/details>\u003cdetails>\u003csummary>Preciso pagar?\u003c/summary>\u003cp>Não há custo neste exemplo.\u003c/p>\u003c/details>\u003c/section>\u003csection id=\"materiais\">\u003ch2>Materiais\u003c/h2>\u003cdetails>\u003csummary>O que devo levar?\u003c/summary>\u003cp>Caderno e disposição para praticar.\u003c/p>\u003c/details>\u003c/section>\u003c/main>\n\u003c/body>\n\u003c/html>",
        "explanation": "A solução exemplifica estrutura. Seu registro precisa verificar ordem de foco, ativação, abertura e fechamento, mesmo que os textos sejam diferentes.",
        "expected": "Todas as perguntas funcionam pelo teclado; os links chegam a ids existentes e os títulos formam um sumário coerente."
      },
      {
        "prompt": "Investigar erro: uma interface mostra \u003cdiv tabindex=\"0\">Abrir ajuda\u003c/div> e nenhuma resposta. Primeiro descreva o que acontece ao focar e pressionar Enter. Depois substitua por um controle nativo que revele uma orientação sem JavaScript.",
        "hints": [
          "Só receber foco não implementa uma ação.",
          "details resolve a interação específica de revelar conteúdo."
        ],
        "solution": "\u003cdetails>\u003csummary>Abrir ajuda\u003c/summary>\u003cp>Preencha os campos obrigatórios antes de testar o formulário.\u003c/p>\u003c/details>",
        "explanation": "A substituição fornece conteúdo, ativação e estado nativos. Um button sozinho também precisaria de lógica para controlar o painel.",
        "expected": "A ajuda abre e fecha com teclado e mouse, com uma resposta efetivamente presente."
      }
    ],
    "mistakes": [
      "Todos os textos recebem tabindex: remova paradas desnecessárias e mantenha a navegação focada em controles.",
      "Div usada como botão: escolha um controle nativo apropriado ao comportamento.",
      "ARIA adicionado sem necessidade: examine primeiro se label, button, details ou semântica já resolvem.",
      "Teste automático sem falhas tratado como garantia: complemente com teclado, conteúdo, zoom e testes humanos."
    ],
    "quiz": [
      {
        "question": "Uma div com tabindex=\"0\" vira um botão completo?",
        "options": [
          "Sim, automaticamente.",
          "Não; foco não fornece toda a interação e semântica.",
          "Sim, se o texto tiver uma ação."
        ],
        "correctIndex": 1,
        "explanation": "O atributo só altera a possibilidade de foco; controles nativos já incluem outros comportamentos."
      },
      {
        "question": "Qual é o papel de aria-describedby no exemplo?",
        "options": [
          "Relacionar o campo a uma instrução adicional.",
          "Enviar a mensagem ao servidor.",
          "Substituir todos os rótulos."
        ],
        "correctIndex": 0,
        "explanation": "O label nomeia o campo e o parágrafo associado acrescenta orientação."
      },
      {
        "question": "Uma auditoria automática sem alertas garante acesso completo?",
        "options": [
          "Sim.",
          "Somente em HTML puro.",
          "Não; significado e interação também exigem avaliação humana."
        ],
        "correctIndex": 2,
        "explanation": "Muitas qualidades não podem ser inferidas automaticamente, como utilidade de uma descrição."
      }
    ],
    "summary": [
      "Acessibilidade começa na estrutura e nas palavras.",
      "Controles nativos oferecem interação previsível.",
      "Verificações precisam produzir evidências e registrar seus limites."
    ]
  },
"css-cascade": {
    "prerequisites": "Conhecer a estrutura HTML, head, body, elementos, atributos class e id. Faça as aulas de HTML primeiro.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "CSS transforma uma estrutura HTML em uma apresentação visual. Nesta aula você aprende a escolher elementos e descobrir por que uma regra venceu outra, em vez de tentar corrigir o resultado adicionando propriedades ao acaso.",
    "sections": [
      {
        "title": "Da estrutura à apresentação",
        "paragraphs": [
          "Uma regra CSS contém um seletor e um bloco de declarações. Em `p { color: navy; }`, p seleciona parágrafos, color é a propriedade e navy é seu valor. Os dois-pontos separam propriedade e valor; o ponto e vírgula encerra a declaração. Chaves delimitam o bloco. Comentários usam `/* explicação */`. Uma declaração inválida normalmente é ignorada, enquanto as demais válidas continuam funcionando; uma chave ausente pode comprometer um trecho maior.",
          "Existem três formas comuns de aplicar estilos: arquivo externo, elemento style dentro do head e atributo style no próprio elemento. O exemplo usa style para caber em um arquivo. Em um projeto com várias páginas, crie estilos.css, transfira apenas as regras para ele e acrescente `\u003clink rel=\"stylesheet\" href=\"estilos.css\">` no head. Não copie as tags style para o arquivo CSS. Um caminho errado impede o carregamento; antes de discutir especificidade, confirme que o navegador recebeu o arquivo."
        ]
      },
      {
        "title": "Seletores exprimem uma intenção",
        "paragraphs": [
          "Um seletor de tipo, como p, escolhe todos os elementos daquele tipo. Uma classe, como .aviso, corresponde a class=\"aviso\" e pode ser reutilizada. Um elemento pode ter várias classes separadas por espaços. #introducao corresponde a um id único. Prefira classes para apresentação reutilizável e reserve identificadores para referências e destinos específicos. `[type=\"email\"]` seleciona por atributo; `*` seleciona todos os elementos. Uma lista `h1, h2` aplica a mesma regra a ambos.",
          "Espaços e símbolos mudam a relação selecionada. `.painel p` encontra qualquer parágrafo descendente; `.painel > p` encontra somente filhos diretos. `h2 + p` encontra o parágrafo imediatamente após um h2 com o mesmo pai; `h2 ~ p` encontra os irmãos parágrafos posteriores. `.aviso.forte` exige as duas classes no mesmo elemento; `.aviso .forte` busca um descendente. Pseudoclasses como :hover representam estados ou condições. Pseudoelementos como ::first-letter selecionam uma parte representada do elemento, não uma nova tag HTML."
        ]
      },
      {
        "title": "A cascata decide antes da especificidade",
        "paragraphs": [
          "Uma propriedade pode receber estilos do navegador, do usuário e da página. A cascata compara origem, importância e outros critérios, incluindo camadas quando usadas; só depois resolve especificidade entre declarações comparáveis. Neste curso inicial usaremos regras normais da página, sem camadas, animações ou transições concorrendo pela mesma propriedade. Nesse cenário, um seletor mais específico vence; se empata, vence o que aparece por último. A posição física do elemento no HTML não muda essa ordem.",
          "A especificidade compara grupos: identificadores; classes, atributos e pseudoclasses; tipos e pseudoelementos. Compare da esquerda para a direita, não some tudo como uma pontuação decimal. Uma classe costuma vencer um tipo; um identificador vence várias classes. O combinador > e o seletor universal não acrescentam peso. Style inline normal costuma vencer regras normais da folha. !important muda a importância da declaração; não significa apenas aumentar especificidade. Evite usá-lo como remendo: ele torna os conflitos menos previsíveis e não vence absolutamente qualquer origem ou mecanismo."
        ]
      },
      {
        "title": "Herança e diagnóstico com evidências",
        "paragraphs": [
          "Algumas propriedades, como color e font-family, são herdadas quando o próprio elemento não tem valor vencedor que as defina. Outras, como margin, padding e border, normalmente não são. Uma cor definida diretamente no filho vence uma cor que ele apenas herdaria do pai, mesmo que a regra do pai tenha um identificador. inherit pede explicitamente o valor do pai; initial usa o valor inicial da propriedade; unset se comporta como inherit para propriedades herdadas e como initial para as demais.",
          "Clique com o botão direito no parágrafo e escolha Inspecionar. No painel Estilos, veja seletores correspondentes, arquivo e linha. Uma declaração riscada pode ter perdido a disputa; uma marca de aviso pode indicar valor inválido. Em Computado, confira o valor final e a origem. Desmarque uma declaração por vez e observe a mudança; isso cria uma hipótese verificável. Alterações feitas no DevTools são temporárias: depois de entender a causa, reproduza a correção no arquivo e recarregue para confirmar."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>CSS: regras, seletores e cascata\u003c/title>\n\u003cstyle>\nbody { color: #24324a; font-family: sans-serif; line-height: 1.6; margin: 2rem; }\np { color: #334155; }\n.aviso { color: #9f1239; }\n.painel { border: 2px solid #64748b; padding: 1rem; }\n.painel > p { font-weight: 700; }\n.aviso { color: #166534; }\na[href^=\"#\"] { text-decoration-thickness: 2px; }\nh2 + p { background: #f1f5f9; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain class=\"painel\">\n  \u003ch1>Clube de estudos\u003c/h1>\n  \u003cp class=\"aviso\">Inscrições abertas\u003c/p>\n  \u003csection>\n    \u003ch2 id=\"agenda\">Agenda\u003c/h2>\n    \u003cp>Encontro toda terça-feira.\u003c/p>\n  \u003c/section>\n  \u003ca href=\"#agenda\">Consultar agenda\u003c/a>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "body fornece a família tipográfica que os descendentes herdam.",
        "O parágrafo aviso fica verde: as duas regras .aviso empatam e a última vence.",
        "A classe .aviso vence a cor do seletor p, mesmo se a regra p for movida para o final.",
        ".painel > p deixa apenas o parágrafo filho direto em negrito.",
        "h2 + p aplica fundo somente ao parágrafo imediatamente posterior ao título da seção.",
        "O seletor de atributo escolhe o link cujo destino começa por #."
      ],
      "expected": "Um painel apresenta um aviso verde e em negrito. A descrição da agenda tem fundo claro, e o link aponta para seu título."
    },
    "guided": [
      {
        "instruction": "Inspecione o aviso e encontre as três declarações de color.",
        "result": "A regra verde está ativa; a vermelha e a do tipo p perdem a disputa."
      },
      {
        "instruction": "Troque .painel > p por .painel p.",
        "result": "Os dois parágrafos ficam em negrito, porque ambos são descendentes."
      },
      {
        "instruction": "Retire temporariamente as regras de cor dos parágrafos.",
        "result": "Eles passam a herdar a cor de body. Restaure o arquivo antes dos desafios."
      }
    ],
    "exercises": [
      {
        "prompt": "Faça apenas o aviso ficar azul, alterando a declaração vencedora sem criar outra regra.",
        "hints": [
          "Procure a última regra .aviso.",
          "Substitua seu color por #1d4ed8."
        ],
        "solution": ".aviso { color: #1d4ed8; }",
        "explanation": "Edite a última ocorrência existente. Criar novas regras repetidas esconderia a causa original do conflito.",
        "expected": "Aviso azul; parágrafo da agenda mantém sua cor."
      },
      {
        "prompt": "Adicione uma descrição com class=\"detalhe\" dentro da seção e estilize somente ela em itálico.",
        "hints": [
          "Acrescente um p depois do texto da agenda.",
          "O seletor .detalhe escolhe a classe, e font-style controla o itálico."
        ],
        "solution": "\u003c!-- Dentro de section: -->\n\u003cp class=\"detalhe\">Traga seu computador.\u003c/p>\n/* Em style: */\n.detalhe { font-style: italic; }",
        "explanation": "Os comentários identificam destinos diferentes: HTML na seção, CSS em style. Uma classe descreve a intenção sem depender da posição do parágrafo.",
        "expected": "Somente o novo detalhe fica em itálico."
      },
      {
        "prompt": "Mova p { color: #334155; } para o fim do CSS e explique por que o aviso não muda de cor. Depois faça todos os parágrafos herdarem a cor de body.",
        "hints": [
          "Ordem só desempata declarações comparáveis com mesma especificidade.",
          "Remova as regras .aviso de color e substitua a cor da regra p por inherit."
        ],
        "solution": "p { color: inherit; }\n/* Remova as declarações de color das duas regras .aviso. */",
        "explanation": "Mover o tipo não vence uma classe. A solução remove as regras concorrentes e pede herança explicitamente; não usa !important.",
        "expected": "Todos os parágrafos usam #24324a de body."
      },
      {
        "prompt": "Separe os estilos em estilos.css sem mudar a aparência e diagnostique um caminho propositalmente errado.",
        "hints": [
          "Copie apenas o conteúdo entre style e /style.",
          "Troque o bloco style por link no head; depois teste href errado e restaure."
        ],
        "solution": "\u003clink rel=\"stylesheet\" href=\"estilos.css\">",
        "explanation": "Salve estilos.css ao lado de index.html. Com o nome errado, o navegador não carrega a folha; o console ou a aba de rede ajuda a identificar o recurso ausente. O problema não é de especificidade.",
        "expected": "Com caminho correto a aparência se mantém; com caminho errado predominam estilos padrão."
      }
    ],
    "mistakes": [
      "Nada muda ao editar: confirme arquivo salvo, caminho da folha e recarregamento antes de criar outra regra.",
      "Uma regra aparentemente ignorada: inspecione a propriedade vencedora e compare origem, importância, especificidade e ordem.",
      "Classe não seleciona: .aviso é CSS; class=\"aviso\" é HTML e não inclui o ponto.",
      "Alterações somem ao atualizar: edições no DevTools precisam ser transferidas para o arquivo."
    ],
    "quiz": [
      {
        "question": "Duas regras .aviso normais, na mesma folha e sem camadas, definem cores diferentes. Qual vence?",
        "options": [
          "A primeira",
          "A última",
          "A que tem o nome de cor mais longo"
        ],
        "correctIndex": 1,
        "explanation": "Com origem, importância e especificidade iguais, a ordem decide."
      },
      {
        "question": "O que .painel > p seleciona?",
        "options": [
          "Todo parágrafo da página",
          "Somente o primeiro parágrafo de qualquer seção",
          "Parágrafos filhos diretos de .painel"
        ],
        "correctIndex": 2,
        "explanation": "> exige relação direta de pai e filho; espaço aceita descendência mais profunda."
      },
      {
        "question": "Um filho recebe color por regra própria. O pai possui color em um seletor com id. O filho:",
        "options": [
          "Usa a sua declaração própria válida",
          "Sempre usa a cor do pai",
          "Fica transparente"
        ],
        "correctIndex": 0,
        "explanation": "A herança fornece valor quando cabível; ela não disputa especificidade como se fosse uma regra aplicada diretamente ao filho."
      }
    ],
    "summary": [
      "Selecione pela intenção e mantenha regras compreensíveis.",
      "Cascata não se resume a quem aparece por último.",
      "DevTools permite observar o valor vencedor e testar hipóteses."
    ]
  },
"css-box": {
    "prerequisites": "Aula CSS: regras, seletores e cascata; estrutura HTML semântica.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "Todo layout visual combina caixas. Aprender a medir conteúdo, preenchimento, borda e espaço externo evita correções por tentativa e permite explicar por que um elemento cabe, transborda ou empurra outro.",
    "sections": [
      {
        "title": "As quatro camadas da caixa",
        "paragraphs": [
          "Imagine um cartão impresso: o texto ocupa a área de conteúdo; padding deixa uma folga entre texto e borda; border desenha o limite; margin separa o cartão dos vizinhos. O fundo cobre conteúdo e padding e pode aparecer sob a borda conforme seu estilo. Margin não recebe o fundo da caixa. Use padding para dar espaço ao conteúdo, não sequências de espaços no HTML. Use margin ou gap, nos layouts que o oferecem, para separar componentes.",
          "No modelo content-box, width define apenas a largura do conteúdo. Uma caixa com width: 300px, padding: 20px e border: 2px solid ocupa 344px antes das margens: 300 + 40 + 4. Com box-sizing: border-box, a mesma largura declarada inclui padding e borda; o conteúdo fica com 256px. Margin continua fora da conta em ambos. Aplicar `*, *::before, *::after { box-sizing: border-box; }` cria uma convenção previsível também para pseudoelementos."
        ]
      },
      {
        "title": "Bloco, linha e conteúdo real",
        "paragraphs": [
          "No fluxo normal, caixas de bloco como p e div geralmente se empilham e ocupam a largura disponível do contêiner. Elementos inline como span e links participam das linhas de texto; width e height não controlam um inline comum como controlam um bloco. display: inline-block permite uma caixa dimensionável que participa da linha. display: none remove a caixa do layout e, em geral, da árvore de acessibilidade; não é a forma de criar um rótulo visualmente oculto e ainda acessível.",
          "A propriedade display muda a apresentação, não o significado do HTML. Um link com display: block continua sendo link. Não transforme div em botão apenas porque ela parece clicável: comportamento de teclado e semântica continuam necessários. Conteúdo pode mudar: traduções, zoom e nomes longos alteram quantas linhas existem. Prefira altura automática e padding. Uma height fixa aparentemente perfeita com uma frase pode cortar três linhas depois de uma edição."
        ]
      },
      {
        "title": "Largura disponível, limites e espaçamento",
        "paragraphs": [
          "width: 100% tenta usar a largura do bloco de referência; com content-box, padding e borda ainda se somam, podendo causar transbordamento. max-width impõe um teto e permite que a caixa encolha. A combinação width: 100%; max-width: 40rem; funciona bem com border-box. Margin-inline: auto centraliza uma caixa de bloco quando há espaço restante na direção horizontal usual. margin-block controla o espaço antes e depois no eixo de bloco, normalmente vertical.",
          "Propriedades lógicas como padding-inline e margin-block descrevem eixos relacionados ao modo de escrita. Elas costumam tornar a intenção mais clara que repetir left e right. No fluxo normal de blocos, certas margens verticais podem colapsar: duas margens positivas adjacentes não necessariamente se somam, prevalecendo a maior. Esse colapso não ocorre entre itens flex ou grid. Não use margens negativas como primeira solução: inspecione a caixa para entender a origem do espaço."
        ]
      },
      {
        "title": "Transbordamento é informação",
        "paragraphs": [
          "Overflow acontece quando o conteúdo ultrapassa a área disponível. overflow: auto fornece rolagem quando necessária; hidden recorta e pode esconder informação ou indicadores de foco; visible é o comportamento inicial em muitos casos. Um bloco pre com código pode precisar de rolagem horizontal própria, mas a página inteira não deveria exigir rolagem lateral para ler parágrafos. overflow-wrap: anywhere permite quebrar sequências longas como identificadores e endereços.",
          "Inspecione um cartão e procure o diagrama do modelo de caixa. Ele separa conteúdo, padding, borda e margem. Teste reduzir a janela e ampliar o zoom, não apenas a largura padrão do seu monitor. Para diagnosticar uma barra lateral indesejada, identifique primeiro qual caixa ultrapassa a viewport. Aplicar overflow-x: hidden ao body sem investigar só oculta o sintoma. Em componentes interativos, confirme também se o recorte não elimina a borda de foco."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Caixas, dimensões e fluxo do documento\u003c/title>\n\u003cstyle>\n*, *::before, *::after { box-sizing: border-box; }\nbody { margin: 0; padding: 1rem; font-family: sans-serif; line-height: 1.6; color: #172033; }\nmain { width: 100%; max-width: 40rem; margin-inline: auto; }\n.cartao { padding: 1.25rem; border: 2px solid #64748b; margin-block: 1rem; border-radius: .5rem; }\n.etiqueta { display: inline-block; padding: .2rem .6rem; border: 1px solid #166534; }\n.endereco { overflow-wrap: anywhere; }\npre { max-width: 100%; overflow: auto; background: #f1f5f9; padding: 1rem; }\nh1, h2 { line-height: 1.2; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Meus estudos\u003c/h1>\n  \u003carticle class=\"cartao\">\n    \u003cspan class=\"etiqueta\">Em andamento\u003c/span>\n    \u003ch2>Modelo de caixa\u003c/h2>\n    \u003cp>O cartão cresce quando o conteúdo precisa de novas linhas.\u003c/p>\n    \u003cp class=\"endereco\">referencia-muito-longa-sem-espacos-para-observar-a-quebra-em-telas-estreitas\u003c/p>\n    \u003cpre>\u003ccode>conteudo + padding + border = largura externa com border-box\u003c/code>\u003c/pre>\n  \u003c/article>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O reset de box-sizing inclui elementos e pseudoelementos.",
        "O padding de body deixa uma margem visual sem depender da margem padrão do navegador.",
        "main ocupa o espaço disponível até 40rem e centraliza o que sobra.",
        "A altura do cartão é automática, acompanhando parágrafos e zoom.",
        ".etiqueta usa inline-block para receber uma caixa de padding e borda dentro da linha.",
        "O texto longo pode quebrar; o código preserva espaços em pre e rola apenas dentro do componente."
      ],
      "expected": "O cartão cabe na página estreita, cresce em altura e permanece limitado em telas largas. Um código longo pode rolar dentro de sua própria caixa."
    },
    "guided": [
      {
        "instruction": "Inspecione .cartao e encontre padding, borda e largura calculada.",
        "result": "O navegador mostra medidas separadas; a largura externa inclui padding e border."
      },
      {
        "instruction": "Acrescente três parágrafos ao cartão e atualize.",
        "result": "A altura cresce sem sobrepor o conteúdo seguinte."
      },
      {
        "instruction": "Reduza a janela e observe o endereço e o código.",
        "result": "O endereço quebra; o pre permite rolagem interna sem alargar a página."
      }
    ],
    "exercises": [
      {
        "prompt": "Aumente somente o espaço interno horizontal do cartão para 2rem, preservando o vertical.",
        "hints": [
          "Use uma propriedade lógica.",
          "padding-inline controla os dois lados no eixo de linha."
        ],
        "solution": ".cartao { padding-inline: 2rem; }",
        "explanation": "Acrescente a declaração à regra existente. Padding-block continua recebendo 1.25rem do shorthand original.",
        "expected": "Mais folga lateral dentro da borda, sem aumentar o teto externo da caixa."
      },
      {
        "prompt": "Crie um segundo cartão e deixe ambos separados por espaço externo, sem inserir br entre eles.",
        "hints": [
          "Copie article inteiro abaixo do primeiro.",
          "A regra margin-block já cuida da separação."
        ],
        "solution": "\u003c!-- Duplique o article existente, altere o h2 para \"Próxima aula\" e mantenha class=\"cartao\". -->",
        "explanation": "A margem de blocos adjacentes pode colapsar; duas margens de 1rem não implicam necessariamente 2rem de distância. O espaçamento pertence ao CSS.",
        "expected": "Dois cartões separados, com altura independente."
      },
      {
        "prompt": "Compare content-box e border-box em uma caixa de width 240px, padding 16px e border 2px. Calcule antes de medir.",
        "hints": [
          "Some duas laterais de padding e de border.",
          "Não inclua margin na medida da borda externa."
        ],
        "solution": "/* Experimente no cartão em uma janela larga: */\n.cartao { width: 240px; padding: 16px; border-width: 2px; box-sizing: content-box; }\n/* Depois troque apenas box-sizing por border-box. */",
        "explanation": "Content-box produz 276px externos; border-box produz 240px externos, deixando 204px para conteúdo. Restaure width automático ao terminar.",
        "expected": "As medidas do DevTools confirmam 276px e 240px."
      },
      {
        "prompt": "Construa um cartão de leitura com título, etiqueta e três parágrafos. Ele deve caber numa janela de 320px, limitar-se a 36rem e não cortar texto com zoom de 200%.",
        "hints": [
          "Use border-box e evite height fixa.",
          "Combine max-width, largura disponível e quebra de palavras longas."
        ],
        "solution": ".cartao { width: 100%; max-width: 36rem; height: auto; margin-inline: auto; overflow-wrap: anywhere; }",
        "explanation": "Aplique ao artigo com o conteúdo pedido. Teste o caso de maior texto e o zoom; uma captura bonita em uma largura não comprova o requisito.",
        "expected": "Todos os parágrafos continuam acessíveis sem rolagem horizontal da página."
      }
    ],
    "mistakes": [
      "A largura ultrapassa o pai: verifique box-sizing e a soma de padding/borda antes de reduzir números arbitrariamente.",
      "Texto cortado: remova height fixa ou forneça rolagem apropriada ao componente.",
      "Margin não colore o espaço: use padding para a área interna que deve ter o fundo do cartão.",
      "Width não altera um span comum: avalie inline-block quando uma caixa dimensionável for necessária."
    ],
    "quiz": [
      {
        "question": "Com border-box, width: 300px inclui:",
        "options": [
          "Só conteúdo",
          "Conteúdo, padding e borda",
          "Conteúdo e margin"
        ],
        "correctIndex": 1,
        "explanation": "A margem continua fora da largura declarada."
      },
      {
        "question": "Por que evitar altura fixa em um cartão textual?",
        "options": [
          "Porque todo cartão precisa de JavaScript",
          "Porque padding deixa de funcionar",
          "Porque texto e zoom podem exigir mais linhas"
        ],
        "correctIndex": 2,
        "explanation": "Altura automática acompanha conteúdo variável e reduz cortes."
      },
      {
        "question": "O que deve vir antes de overflow-x: hidden no body?",
        "options": [
          "Investigar qual elemento transborda",
          "Adicionar !important a todas as larguras",
          "Reduzir o tamanho de todas as fontes"
        ],
        "correctIndex": 0,
        "explanation": "Ocultar transbordamento sem identificar sua causa pode esconder conteúdo necessário."
      }
    ],
    "summary": [
      "Separe conteúdo, padding, borda e margem mentalmente e no inspetor.",
      "Dimensione a caixa para conteúdo variável, não apenas para um exemplo curto.",
      "Resolva a origem do transbordamento e teste em telas estreitas."
    ]
  },
"css-typography": {
    "prerequisites": "Seletores, herança, modelo de caixa e títulos semânticos.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "Uma interface precisa continuar legível quando o texto cresce e a tela muda. Unidades e tipografia permitem construir uma hierarquia visual sem depender de um tamanho fixo de monitor; cores precisam comunicar sem serem a única pista.",
    "sections": [
      {
        "title": "Medidas relacionam uma caixa com outra",
        "paragraphs": [
          "px é um pixel CSS, uma unidade de referência visual, não necessariamente um pixel físico da tela. Ele é útil para bordas finas e detalhes; não impede o zoom do navegador. rem usa o tamanho de fonte do elemento raiz html: se a raiz estiver em 16px, 1.5rem equivale a 24px. Deixar a raiz em 100% respeita o tamanho padrão configurado pelo usuário. Não altere a raiz para 62.5% apenas para facilitar contas se isso produzir texto inicial pequeno.",
          "em depende do contexto. Em font-size, considera o tamanho de fonte do pai; em propriedades como padding, usa a fonte do próprio elemento. Um botão com fonte de 20px e padding de .5em ganha 10px de preenchimento. Porcentagens dependem da propriedade: width: 50% costuma usar a largura do bloco de referência, enquanto font-size: 150% usa a fonte do pai. Não conclua que toda porcentagem mede a tela. A unidade ch aproxima a largura do caractere zero da fonte, útil para limitar linhas de leitura sem prometer um número exato de letras."
        ]
      },
      {
        "title": "Viewport e tamanho fluido com limites",
        "paragraphs": [
          "vw equivale a um centésimo da largura da viewport; vh refere-se à altura segundo a definição da unidade. Em dispositivos móveis, barras do navegador podem mudar a região realmente visível. svh representa a viewport pequena, lvh a grande e dvh acompanha variações dinâmicas. Para esta base, use altura natural em páginas de texto e evite impor 100vh a todo conteúdo. Unidades de viewport são ferramentas para necessidades específicas, não substitutos universais de rem.",
          "clamp(mínimo, preferido, máximo) mantém um valor entre limites. `font-size: clamp(2rem, 1rem + 3vw, 3rem)` permite um título fluido, mas não menor que 2rem nem maior que 3rem. Combinar uma parcela em rem com viewport costuma ser mais robusto que usar apenas vw; ainda é necessário testar zoom e preferências de fonte. Um texto não pode se tornar ilegível para caber no layout. Se falta espaço, mude a composição, permita quebra de linha ou reduza conteúdo secundário, preservando a informação."
        ]
      },
      {
        "title": "Tipografia é organização do conteúdo",
        "paragraphs": [
          "font-family recebe uma lista de fontes alternativas. `system-ui, sans-serif` usa uma fonte disponível do sistema e dispensa downloads. font-size define tamanho, font-weight define peso e font-style pode aplicar itálico. Use h1, h2 e h3 pela hierarquia do documento; ajuste a aparência com CSS. Um parágrafo enorme não deve virar h1 só para ficar grande. Componentes de formulário podem não herdar a tipografia como você espera; `button, input, select, textarea { font: inherit; }` ajuda a manter consistência.",
          "line-height sem unidade, como 1.6, multiplica o tamanho da fonte do próprio elemento e é herdado de maneira conveniente. Linhas apertadas atrapalham localizar a próxima; linhas excessivamente longas tornam a leitura cansativa. Um contêiner com max-width: 65ch oferece um ponto de partida, não uma lei universal. Para textos em português, alinhamento inicial à esquerda normalmente evita espaços irregulares de justificação. Use margem entre parágrafos e títulos para mostrar agrupamentos, mantendo espaçamento consistente."
        ]
      },
      {
        "title": "Cor comunica junto com texto e forma",
        "paragraphs": [
          "Você pode escrever cores com nomes, hexadecimal, rgb ou hsl. #1e293b é hexadecimal; rgb(30 41 59) descreve a mesma cor pelos canais vermelho, verde e azul. Transparência pode ser indicada por um canal alfa, como rgb(0 0 0 / 0.1). Uma cor semitransparente depende do fundo atrás dela, então contraste deve ser avaliado sobre o resultado composto. background-color define o fundo; color afeta texto e também pode ser usado por bordas com currentColor.",
          "Como referência de acessibilidade para texto comum, busque contraste de pelo menos 4.5:1; texto grande pode usar 3:1. A definição de grande considera tamanho e peso, não sua impressão visual. Verifique com uma ferramenta de contraste ou com os recursos de inspeção do navegador, em vez de estimar só olhando. Links devem continuar identificáveis sem depender apenas de azul; sublinhado é uma opção direta. Erros de formulário precisam de mensagem ou ícone acompanhado de texto, não somente uma borda vermelha. Teste também foco, hover e textos secundários."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Unidades, cores e leitura confortável\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nhtml { font-size: 100%; }\nbody { margin: 0; padding: 1.25rem; font-family: system-ui, sans-serif; color: #1e293b; background: #ffffff; line-height: 1.65; }\nmain { max-width: 65ch; margin-inline: auto; }\nh1 { font-size: clamp(2rem, 1rem + 3vw, 3rem); line-height: 1.15; }\nh2 { font-size: 1.5rem; line-height: 1.25; margin-block-start: 2rem; }\np { margin-block: 1rem; }\na { color: #1d4ed8; text-underline-offset: .2em; }\n.nota { padding: 1em; background: #f1f5f9; border-inline-start: .25rem solid #475569; }\nstrong { font-weight: 700; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Aprender com constância\u003c/h1>\n  \u003cp>Uma rotina de estudo funciona melhor quando os objetivos são claros e o conteúdo pode ser lido com conforto.\u003c/p>\n  \u003ch2 id=\"rotina\">Uma rotina possível\u003c/h2>\n  \u003cp>Reserve um período curto, pratique um conceito e registre o que conseguiu fazer sem ajuda. Ajuste a dificuldade a partir desses resultados.\u003c/p>\n  \u003cp class=\"nota\">\u003cstrong>Dica:\u003c/strong> uma pausa faz parte da rotina. Não é necessário diminuir o texto para encaixar tudo na mesma tela.\u003c/p>\n  \u003ca href=\"#rotina\">Revisar a rotina\u003c/a>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "A raiz usa 100%, permitindo que rem acompanhe a preferência de fonte do usuário.",
        "A largura máxima em ch limita a linha de leitura, sem impor altura.",
        "O título combina um valor mínimo, um tamanho fluido e um teto com clamp.",
        "line-height sem unidade acompanha os tamanhos distintos de texto.",
        "A nota usa padding em em, portanto sua folga acompanha a fonte do próprio elemento.",
        "O link está sublinhado e tem cor escura sobre fundo branco; a identificação não depende só da cor."
      ],
      "expected": "Uma página de leitura com título fluido, texto de largura limitada, nota destacada e link sublinhado. O conteúdo permanece disponível ao ampliar a página."
    },
    "guided": [
      {
        "instruction": "Mude temporariamente html para font-size: 125%.",
        "result": "Medidas em rem crescem; o conteúdo continua com altura natural."
      },
      {
        "instruction": "Troque max-width: 65ch por 100% e compare em uma janela larga.",
        "result": "As linhas ficam maiores; restaure 65ch e observe a leitura mais contida."
      },
      {
        "instruction": "Amplie o navegador a 200% e siga o link por teclado.",
        "result": "O texto reorganiza linhas sem desaparecer e o link continua identificável."
      }
    ],
    "exercises": [
      {
        "prompt": "Dê à nota font-size: 1.25rem e preveja a mudança de seu padding em em.",
        "hints": [
          "O em de padding usa a fonte do próprio elemento.",
          "Se a raiz for 16px, 1.25rem será 20px."
        ],
        "solution": ".nota { font-size: 1.25rem; }",
        "explanation": "Na configuração padrão de raiz 16px, padding: 1em passa a 20px. O valor exato acompanha a preferência de fonte da pessoa.",
        "expected": "A nota e sua folga interna crescem juntas."
      },
      {
        "prompt": "Crie uma linha de texto secundário que continue legível e não dependa de fonte minúscula.",
        "hints": [
          "Use uma classe e cor cinza escura.",
          "Preserve tamanho de pelo menos 1rem neste exercício."
        ],
        "solution": "\u003c!-- Antes do link: -->\n\u003cp class=\"secundario\">Atualizado após cada sessão de estudo.\u003c/p>\n/* No CSS: */\n.secundario { color: #475569; font-size: 1rem; }",
        "explanation": "Hierarquia pode vir de peso, posição e cor. Tornar informação importante muito pequena ou clara dificulta a leitura.",
        "expected": "A informação é discreta, mas permanece legível sobre branco."
      },
      {
        "prompt": "Compare padding: 1rem e padding: 1em na nota com font-size: 2rem. Explique a diferença sem decorar pixels.",
        "hints": [
          "rem segue a raiz; em no padding segue a própria nota.",
          "Mude uma unidade de cada vez no inspetor."
        ],
        "solution": ".nota { font-size: 2rem; padding: 1em; }\n/* Compare substituindo somente o padding por 1rem. */",
        "explanation": "Com em, a folga equivale à fonte ampliada da nota. Com rem, equivale à fonte raiz, independentemente da fonte local. Depois restaure uma escala confortável para a página.",
        "expected": "A versão em em apresenta o dobro da folga da versão em rem, se a fonte local for 2rem."
      },
      {
        "prompt": "Crie uma página de leitura com um h1, dois h2, três parágrafos e um aviso. Preserve títulos semânticos, largura controlada, links sublinhados e leitura a 200% de zoom.",
        "hints": [
          "Use as regras do exemplo como base, mas escreva um novo conteúdo.",
          "Valide texto secundário e aviso além do título principal."
        ],
        "solution": "main { max-width: 65ch; margin-inline: auto; }\np, li { line-height: 1.65; }\na { text-decoration: underline; }\n.aviso { padding: 1rem; border: 2px solid #92400e; background: #fffbeb; color: #78350f; }",
        "explanation": "Insira o HTML pedido dentro de main e aplique aviso a um parágrafo que comece com a palavra Atenção. A palavra comunica a função mesmo sem a cor. A solução CSS ilustra critérios, não define o conteúdo único possível.",
        "expected": "Sem corte de texto ou rolagem horizontal da página; hierarquia compreensível e aviso identificado por texto."
      }
    ],
    "mistakes": [
      "Texto encolhe demais no celular: coloque limites no tamanho fluido e teste zoom.",
      "Links só diferem pela cor: mantenha sublinhado ou outra indicação visual reconhecível.",
      "Todas as caixas mudam inesperadamente: verifique se usou em herdado em font-size de elementos aninhados.",
      "Fonte externa falha e altera o layout: mantenha uma pilha de alternativas adequadas."
    ],
    "quiz": [
      {
        "question": "padding: 1em depende de quê?",
        "options": [
          "Da altura da tela",
          "Da fonte do próprio elemento",
          "Sempre de 16px"
        ],
        "correctIndex": 1,
        "explanation": "Em propriedades de espaço, em usa a fonte calculada do elemento."
      },
      {
        "question": "Qual prática preserva melhor o significado de títulos?",
        "options": [
          "Escolher h1/h2/h3 pela hierarquia e estilizar com CSS",
          "Escolher h3 porque parece menor",
          "Usar somente parágrafos em negrito"
        ],
        "correctIndex": 0,
        "explanation": "O nível do título descreve a estrutura, não seu tamanho visual."
      },
      {
        "question": "Uma mensagem de erro só tem borda vermelha. O que falta?",
        "options": [
          "Um efeito de brilho",
          "Uma fonte menor",
          "Uma indicação textual do problema"
        ],
        "correctIndex": 2,
        "explanation": "A cor não deve ser o único meio de comunicar informação necessária."
      }
    ],
    "summary": [
      "Unidades exprimem relações; escolha a referência correta.",
      "Tipografia precisa resistir a zoom e conteúdo variável.",
      "Contraste e identificação textual importam em todos os estados."
    ]
  },
"css-states": {
    "prerequisites": "Seletores, modelo de caixa, unidades e elementos HTML interativos.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "Uma interface muda quando a pessoa aponta, navega com teclado ou encontra uma ação indisponível. Além desses estados, você aprenderá a posicionar elementos sem retirar do fluxo todo o conteúdo da página.",
    "sections": [
      {
        "title": "Estados são parte do componente",
        "paragraphs": [
          "Uma pseudoclasse acrescenta uma condição ao seletor. :hover corresponde ao apontador sobre um elemento; :active ao período de ativação; :focus ao elemento com foco. :focus-visible permite destacar foco quando o navegador considera necessária uma indicação, como em navegação por teclado. Não elimine outline sem criar uma alternativa claramente visível. Outline não ocupa espaço no modelo de caixa e pode receber outline-offset para se afastar do componente.",
          "Um botão disabled nativo comunica indisponibilidade e não participa normalmente da sequência de Tab. :disabled permite estilizar esse estado. O atributo não é equivalente a pintar um botão de cinza; CSS sozinho não desativa a ação. Links não aceitam disabled como botões. Use elementos nativos adequados e explique por texto o motivo de uma ação indisponível. Não use opacity muito baixa se ela tornar a legenda ilegível. O usuário deve distinguir texto, estado e interação sem adivinhar a intenção."
        ]
      },
      {
        "title": "Movimento como reforço, não requisito",
        "paragraphs": [
          "transition interpola propriedades que aceitam animação entre valores. `transition: background-color 150ms ease` suaviza a troca de fundo; a unidade ms significa milissegundos e ease define o ritmo. Liste as propriedades necessárias em vez de usar all indiscriminadamente, porque futuras alterações podem começar a animar de forma inesperada. Nem toda propriedade é interpolada de maneira contínua. Não dependa de uma animação para revelar o único acesso a informação importante.",
          "A media query `@media (prefers-reduced-motion: reduce)` detecta a preferência de reduzir movimento. Desative transições não essenciais nesse contexto. Hover é insuficiente como único caminho porque telas sensíveis ao toque e teclado funcionam de outra maneira. Mantenha o conteúdo no estado inicial e ofereça foco visível. Teste o componente sem mouse, com zoom e, se disponível no navegador ou sistema, com redução de movimento ativada."
        ]
      },
      {
        "title": "Fluxo normal e referências de posição",
        "paragraphs": [
          "position: static mantém o elemento no fluxo normal; deslocamentos como top não o posicionam nesse modo. relative conserva seu espaço original, mas permite deslocar visualmente a caixa e criar uma referência para descendentes absolute. Um deslocamento relative não empurra os vizinhos para a nova posição. absolute retira a caixa do fluxo e usa seu bloco de referência, frequentemente o ancestral posicionado mais próximo. Por isso um selo absoluto costuma ficar dentro de um cartão relative.",
          "fixed também sai do fluxo e geralmente se refere à viewport, permanecendo visível durante a rolagem. Certas propriedades em ancestrais, como transform, podem alterar essa referência. Sticky participa do fluxo e se prende a um limite de rolagem ao alcançá-lo; precisa de um deslocamento como top: 0 para o comportamento esperado nesse eixo. Seu movimento é limitado pelo contêiner. Um ancestral com overflow pode mudar a área de rolagem usada. Não cubra títulos, links ou campos com cabeçalhos fixos sem prever espaço."
        ]
      },
      {
        "title": "Camadas exigem contexto",
        "paragraphs": [
          "z-index organiza a sobreposição dentro de contextos de empilhamento. Ele se aplica a elementos posicionados e também a itens flex/grid em condições apropriadas. Um filho com z-index enorme não consegue escapar livremente do contexto de empilhamento do pai. Algumas propriedades, como opacity menor que 1 e transform diferente de none, podem criar novos contextos. Se uma caixa não aparece acima de outra, inspecione os ancestrais antes de aumentar o número novamente.",
          "No exemplo, o selo usa absolute para uma pequena sobreposição decorativa e o cartão fornece espaço com padding-top. O conteúdo principal permanece no fluxo e cresce com o texto. Essa é uma regra prática útil: use Flexbox ou Grid para a estrutura; reserve posicionamento para relações especiais, como selo e cabeçalho aderente. Na validação, não basta confirmar que algo ficou no canto: confira se ainda cabe com zoom, se não cobre informação e se o foco de teclado permanece visível."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Estados, foco, movimento e posicionamento\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; color: #172033; }\nheader { position: sticky; top: 0; z-index: 2; background: white; border-bottom: 1px solid #64748b; padding: .75rem 1rem; }\nmain { max-width: 42rem; margin: 2rem auto; padding: 1rem; }\n.cartao { position: relative; border: 2px solid #64748b; border-radius: .75rem; padding: 3rem 1rem 1rem; }\n.selo { position: absolute; top: .5rem; right: .5rem; padding: .2rem .6rem; background: #dbeafe; color: #1e3a8a; }\n.acao, button { display: inline-block; font: inherit; padding: .65em 1em; border: 2px solid #1e3a8a; border-radius: .4rem; background: #1e3a8a; color: white; transition: background-color 150ms ease; }\n.acao:hover, button:not(:disabled):hover { background: #172554; }\n.acao:focus-visible, button:focus-visible { outline: 3px solid #a16207; outline-offset: 4px; }\nbutton:disabled { background: #e2e8f0; color: #334155; border-color: #64748b; }\n#agenda { scroll-margin-top: 6rem; }\n@media (prefers-reduced-motion: reduce) { .acao, button { transition: none; } }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader>Clube de estudos · \u003ca href=\"#agenda\">Agenda\u003c/a>\u003c/header>\n\u003cmain>\n  \u003carticle class=\"cartao\">\n    \u003cspan class=\"selo\">Gratuito\u003c/span>\n    \u003ch1>Oficina de CSS\u003c/h1>\n    \u003cp>Pratique interfaces que funcionam com mouse, teclado e telas pequenas.\u003c/p>\n    \u003ca class=\"acao\" href=\"#agenda\">Ver agenda\u003c/a>\n    \u003cbutton type=\"button\" disabled>Inscrição encerrada\u003c/button>\n    \u003cp>As inscrições desta turma já terminaram.\u003c/p>\n  \u003c/article>\n  \u003csection id=\"agenda\">\n    \u003ch2>Agenda\u003c/h2>\n    \u003cp>Segunda-feira: fundamentos. Quarta-feira: prática orientada.\u003c/p>\n  \u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "O header sticky permanece no fluxo e pode aderir ao topo quando a página tiver rolagem suficiente.",
        "O cartão relative é a referência para o selo absolute; padding superior reserva espaço para ele.",
        "O link continua link, mesmo com aparência de ação.",
        "O botão realmente está disabled, e um texto explica o motivo.",
        "O estado de foco não depende do hover e usa outline com afastamento.",
        "A regra de movimento reduzido remove a transição de fundo."
      ],
      "expected": "Um cartão com selo no canto, link acionável e botão indisponível. Tab destaca o link; o botão disabled é ignorado na sequência usual de foco."
    },
    "guided": [
      {
        "instruction": "Use Tab, sem clicar, até chegar a Ver agenda.",
        "result": "O link recebe contorno visível; Enter navega para a seção."
      },
      {
        "instruction": "Acrescente vários parágrafos na agenda e role a página.",
        "result": "O cabeçalho pode aderir ao topo; o cartão continua no fluxo."
      },
      {
        "instruction": "Desative position: relative do cartão no inspetor.",
        "result": "O selo perde a referência local esperada. Restaure a regra antes dos exercícios."
      }
    ],
    "exercises": [
      {
        "prompt": "Faça o foco do link de ação ter contorno de 4px, mantendo o afastamento.",
        "hints": [
          "Altere outline, não border.",
          "Preserve a pseudoclasse :focus-visible."
        ],
        "solution": ".acao:focus-visible { outline: 4px solid #a16207; outline-offset: 4px; }",
        "explanation": "Outline evita deslocar os vizinhos ao receber foco. Teste com Tab; clique do mouse pode produzir comportamento de foco diferente.",
        "expected": "O contorno aparece no teclado sem mudar o espaço ocupado pelo link."
      },
      {
        "prompt": "Mova o selo do canto superior direito para o superior esquerdo sem alterar o fluxo do título.",
        "hints": [
          "Substitua right por left.",
          "Zere right com auto para não manter os dois lados definidos."
        ],
        "solution": ".selo { right: auto; left: .5rem; }",
        "explanation": "O cartão permanece relative, mantendo a referência. O padding superior já reserva espaço para o selo.",
        "expected": "O selo fica à esquerda e não cobre o título."
      },
      {
        "prompt": "Adicione um segundo link de ação e teste hover, teclado e movimento reduzido.",
        "hints": [
          "Reutilize class=\"acao\" em um link com destino real.",
          "Use a configuração de acessibilidade do sistema ou a emulação do navegador para reduzir movimento."
        ],
        "solution": "\u003ca class=\"acao\" href=\"#agenda\">Consultar encontros\u003c/a>",
        "explanation": "Insira o link dentro do cartão. Não é necessário JavaScript para navegação por âncora. A media query existente cobre ambos os links e deve remover a transição quando a preferência estiver ativa.",
        "expected": "Os dois links oferecem foco visível e continuam funcionando com a transição desativada."
      },
      {
        "prompt": "Monte um cartão de evento com selo, ação de navegação e aviso de indisponibilidade. Teste a 320px e 200% de zoom e elimine qualquer sobreposição.",
        "hints": [
          "Mantenha o conteúdo no fluxo; use absolute somente no selo.",
          "Se o selo puder ficar alto, prefira colocá-lo no fluxo em telas estreitas."
        ],
        "solution": "@media (max-width: 30rem) {\n  .selo { position: static; display: inline-block; }\n  .cartao { padding: 1rem; }\n}",
        "explanation": "O requisito de legibilidade é mais importante que manter o selo no canto a qualquer custo. A solução remove a sobreposição potencial na largura estreita e permite que o conteúdo cresça.",
        "expected": "Selo, título, ações e aviso permanecem inteiros, com teclado e leitura preservados."
      }
    ],
    "mistakes": [
      "Remover outline para deixar limpo: forneça um indicador de foco claro, não invisibilidade.",
      "Botão parece desativado mas funciona: use disabled no botão real e explique a indisponibilidade.",
      "Selo cobre título ampliado: reserve espaço suficiente ou retorne o selo ao fluxo em telas estreitas.",
      "Sticky não adere: verifique top, comprimento de rolagem e overflow dos ancestrais."
    ],
    "quiz": [
      {
        "question": "Qual posição retira a caixa do fluxo e costuma usar um ancestral posicionado como referência?",
        "options": [
          "static",
          "relative",
          "absolute"
        ],
        "correctIndex": 2,
        "explanation": "Relative preserva o espaço; absolute sai do fluxo e busca seu bloco de referência."
      },
      {
        "question": "Por que :hover não basta para uma ação?",
        "options": [
          "Porque teclado e toque não dependem desse estado",
          "Porque só funciona em parágrafos",
          "Porque desativa links"
        ],
        "correctIndex": 0,
        "explanation": "Uma interface precisa oferecer estados compreensíveis também para outras formas de entrada."
      },
      {
        "question": "Um z-index muito alto garante superar todos os elementos?",
        "options": [
          "Sim",
          "Não, contextos de empilhamento limitam a comparação",
          "Apenas se o número for positivo"
        ],
        "correctIndex": 1,
        "explanation": "Um filho é comparado dentro de seu contexto; o contexto do pai participa de outra comparação."
      }
    ],
    "summary": [
      "Estados precisam incluir teclado e indisponibilidade real.",
      "Posicionamento não substitui uma estrutura de layout no fluxo.",
      "Movimento, sobreposição e foco devem ser testados em conjunto."
    ]
  },
"css-flex": {
    "prerequisites": "Modelo de caixa, unidades, seletores e estados acessíveis.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "Flexbox organiza itens ao longo de uma direção principal. Ele é especialmente útil para barras de navegação, ações e componentes cujo conteúdo varia. Você vai prever o comportamento em vez de decorar uma combinação para centralizar tudo.",
    "sections": [
      {
        "title": "Contêiner e itens diretos",
        "paragraphs": [
          "display: flex transforma uma caixa em contêiner flex e seus filhos diretos em itens flex. Netos continuam usando seu próprio contexto de layout, a menos que você também configure seus pais. No exemplo, o cabeçalho tem a marca e a navegação como dois itens; dentro da navegação existe outro contêiner para os links. Pense em uma hierarquia de pequenos layouts, não em uma regra que organiza automaticamente todos os descendentes.",
          "O eixo principal vem de flex-direction. Com row, segue a direção de linha do modo de escrita, normalmente horizontal no português; com column, segue o eixo de bloco, normalmente vertical. O eixo transversal é perpendicular. row-reverse e column-reverse invertem visualmente a direção, mas não reorganizam a ordem do documento ou necessariamente a sequência de teclado. Prefira HTML na ordem de leitura pretendida e use o layout para apresentá-lo, evitando uma navegação visual que contradiz Tab."
        ]
      },
      {
        "title": "Alinhar não é a mesma coisa que distribuir",
        "paragraphs": [
          "justify-content distribui espaço livre no eixo principal. flex-start agrupa no início, center centraliza e space-between coloca espaço entre itens quando há sobra. Sem espaço livre, não há o que distribuir. align-items atua no eixo transversal; center centraliza, flex-start alinha no início e stretch pode esticar itens cuja dimensão transversal é automática. align-self permite que um item específico tenha uma escolha diferente.",
          "gap cria intervalos regulares entre itens, sem adicionar espaço externo nas bordas do contêiner. Pode coexistir com justify-content: space-between, que distribui a sobra além do intervalo mínimo. align-content trata a distribuição de várias linhas flex no eixo transversal quando há condições e espaço para isso; não substitui align-items para alinhar itens dentro de uma linha. Antes de trocar propriedades ao acaso, desenhe os eixos do contêiner e identifique em qual direção você quer alterar a posição."
        ]
      },
      {
        "title": "Crescer, reduzir e quebrar",
        "paragraphs": [
          "O valor inicial dos itens equivale a flex: 0 1 auto: não crescem para ocupar sobra, podem reduzir e usam uma base automática ligada ao conteúdo ou a dimensões declaradas. O shorthand flex: 1 1 14rem significa fator de crescimento 1, fator de redução 1 e base 14rem. Crescimento divide espaço livre segundo fatores relativos; ele não fixa uma porcentagem independente. Redução considera também a base flexível, então fatores iguais não significam que todos perdem a mesma quantidade de pixels.",
          "flex-wrap: wrap autoriza novas linhas quando necessário. Cada linha distribui seu espaço de maneira independente; por isso Flexbox não garante alinhamento de colunas entre várias linhas. Se você precisa de linhas e colunas coordenadas, Grid pode ser mais adequado. Use uma base razoável para cartões e permita que eles cresçam. Em componentes com texto longo, min-width: 0 no item pode ser necessário para permitir redução abaixo do tamanho mínimo intrínseco; combine com uma estratégia de quebra de texto ou rolagem apropriada."
        ]
      },
      {
        "title": "Ler o resultado e escolher a ferramenta",
        "paragraphs": [
          "No exemplo, a marca e a lista de links formam uma barra que pode quebrar. Os cartões têm flex: 1 1 15rem: buscam começar nessa base, crescem com espaço extra e podem ocupar linhas seguintes. A largura externa varia conforme a janela, o gap e o conteúdo. Não calcule uma largura de 33.333% e acrescente espaços sem considerar a soma: isso frequentemente cria uma quebra inesperada. Deixe o mecanismo distribuir a sobra ou use Grid para colunas coordenadas.",
          "Para validar, troque rótulos curtos por nomes longos, acrescente um link e remova outro. Teste com zoom, não apenas arrastando a janela. No inspetor, ative a sobreposição de Flexbox quando disponível para enxergar eixos e espaços. Se uma ação parece estar na ordem errada, corrija a ordem do HTML antes de recorrer a order. Uma interface robusta deve manter leitura, teclado e aparência coerentes mesmo quando o conteúdo de exemplo muda."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Flexbox: distribuição, alinhamento e quebra\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; line-height: 1.6; color: #172033; }\nheader { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-bottom: 2px solid #64748b; padding-block: 1rem; }\nnav ul { display: flex; flex-wrap: wrap; gap: .75rem; padding: 0; margin: 0; list-style: none; }\na { color: #1d4ed8; }\na:focus-visible { outline: 3px solid #a16207; outline-offset: 3px; }\nmain { max-width: 65rem; margin: 2rem auto; }\n.cartoes { display: flex; flex-wrap: wrap; gap: 1rem; }\n.cartao { flex: 1 1 15rem; min-width: 0; padding: 1rem; border: 2px solid #64748b; border-radius: .5rem; overflow-wrap: anywhere; }\nh2 { line-height: 1.25; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader>\n  \u003cstrong>Clube de estudos\u003c/strong>\n  \u003cnav aria-label=\"Principal\">\u003cul>\n    \u003cli>\u003ca href=\"#trilhas\">Trilhas\u003c/a>\u003c/li>\n    \u003cli>\u003ca href=\"#html\">HTML\u003c/a>\u003c/li>\n    \u003cli>\u003ca href=\"#css\">CSS\u003c/a>\u003c/li>\n  \u003c/ul>\u003c/nav>\n\u003c/header>\n\u003cmain>\n  \u003ch1 id=\"trilhas\">Escolha sua próxima prática\u003c/h1>\n  \u003cdiv class=\"cartoes\">\n    \u003carticle class=\"cartao\" id=\"html\">\u003ch2>HTML\u003c/h2>\u003cp>Organize conteúdo semântico e formulários acessíveis.\u003c/p>\u003c/article>\n    \u003carticle class=\"cartao\" id=\"css\">\u003ch2>CSS\u003c/h2>\u003cp>Crie layouts que se adaptam ao espaço disponível sem esconder informação.\u003c/p>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Revisão\u003c/h2>\u003cp>Reconstrua um componente sem consultar a solução.\u003c/p>\u003c/article>\n  \u003c/div>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "header distribui marca e nav como filhos diretos; ul organiza seus próprios li separadamente.",
        "flex-wrap permite que o conteúdo use novas linhas em vez de forçar tudo em uma faixa estreita.",
        "gap define um intervalo mínimo regular e não cria margem externa.",
        "Cada cartão usa base de 15rem, cresce com sobra e pode reduzir conforme as regras flex.",
        "min-width: 0 permite redução do item; overflow-wrap protege sequências extensas.",
        "A ordem visual segue a ordem HTML, preservando uma navegação previsível."
      ],
      "expected": "Em janela larga, cartões aparecem lado a lado. Em janela estreita, links e cartões quebram em linhas, mantendo conteúdo e foco acessíveis."
    },
    "guided": [
      {
        "instruction": "Ative o inspetor flex no header e identifique os dois itens diretos.",
        "result": "Marca e nav são itens; os li pertencem a outro contêiner."
      },
      {
        "instruction": "Troque temporariamente flex-direction do header por column.",
        "result": "O eixo principal fica vertical; justify-content e align-items continuam atuando em seus respectivos eixos."
      },
      {
        "instruction": "Acrescente um quarto cartão e redimensione.",
        "result": "O espaço se redistribui por linha; a última linha pode ter cartões mais largos."
      }
    ],
    "exercises": [
      {
        "prompt": "Centralize os links dentro de ul quando sobrar espaço, sem mudar a ordem.",
        "hints": [
          "Use justify-content no contêiner dos links.",
          "Se ul não tiver largura sobrando, a centralização não será perceptível."
        ],
        "solution": "nav { flex: 1 1 20rem; }\nnav ul { justify-content: center; }",
        "explanation": "Nav recebe uma base e pode crescer; a lista passa a ocupar sua largura disponível, tornando a distribuição observável.",
        "expected": "Os links formam um grupo centralizado na região da navegação."
      },
      {
        "prompt": "Faça um cartão crescer duas vezes mais que os demais na distribuição de espaço livre.",
        "hints": [
          "Dê uma classe adicional ao cartão.",
          "flex-grow altera o fator da sobra, não garante o dobro da largura final."
        ],
        "solution": "/* Acrescente destaque à classe do primeiro article. */\n.cartao.destaque { flex-grow: 2; }",
        "explanation": "As bases e limites continuam participando do cálculo. Dois fatores de crescimento não significam largura final exatamente dobrada.",
        "expected": "Em uma linha com sobra, o destaque recebe uma parcela maior dessa sobra."
      },
      {
        "prompt": "Insira um título com uma palavra muito longa e resolva qualquer transbordamento sem cortar o texto.",
        "hints": [
          "Confira min-width no item flex.",
          "overflow-wrap permite quebrar sequências sem espaços."
        ],
        "solution": ".cartao { min-width: 0; overflow-wrap: anywhere; }",
        "explanation": "As regras já estão no exemplo. Remova-as uma de cada vez para observar o efeito e depois restaure. Aprender a diagnosticar inclui reconhecer quando a proteção já existe.",
        "expected": "O título quebra e permanece legível dentro do cartão."
      },
      {
        "prompt": "Crie uma barra com marca, quatro links e uma mensagem de contato. Ela deve quebrar naturalmente, manter a ordem de leitura e funcionar com Tab em 320px.",
        "hints": [
          "Organize os elementos na ordem correta no HTML.",
          "Crie um contêiner flex com wrap e use gap em vez de margens manuais em cada filho."
        ],
        "solution": ".barra { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }\n.barra nav { flex: 1 1 18rem; }\n.barra nav ul { display: flex; flex-wrap: wrap; gap: .75rem; }",
        "explanation": "Crie header class=\"barra\" contendo marca, nav com lista e um parágrafo de contato. Use destinos existentes nos links. Não use order para reordenar o conteúdo visualmente.",
        "expected": "Nada se sobrepõe e a sequência de Tab acompanha a apresentação."
      }
    ],
    "mistakes": [
      "justify-content parece não funcionar: confirme eixo e existência de espaço livre.",
      "Um neto não alinha: display: flex organiza filhos diretos, não toda a árvore.",
      "Última linha tem larguras diferentes: é comportamento esperado; avalie Grid se precisar coordenar colunas.",
      "Texto ultrapassa o cartão: examine tamanho mínimo e quebra de palavras."
    ],
    "quiz": [
      {
        "question": "Com flex-direction: column, justify-content atua normalmente em qual direção?",
        "options": [
          "Vertical",
          "Horizontal",
          "Sempre na diagonal"
        ],
        "correctIndex": 0,
        "explanation": "O eixo principal passa a seguir a direção de bloco."
      },
      {
        "question": "flex-grow: 2 garante largura final duas vezes maior?",
        "options": [
          "Sim, sempre",
          "Somente com texto curto",
          "Não; o fator distribui espaço livre"
        ],
        "correctIndex": 2,
        "explanation": "Base, limites e outros itens também participam da largura final."
      },
      {
        "question": "Qual escolha preserva melhor leitura e teclado?",
        "options": [
          "Reordenar tudo com order",
          "Manter o HTML na ordem lógica desejada",
          "Usar row-reverse em toda navegação"
        ],
        "correctIndex": 1,
        "explanation": "Mudanças visuais não necessariamente alteram a ordem de foco ou leitura assistiva."
      }
    ],
    "summary": [
      "Desenhe os eixos antes de escolher alinhamentos.",
      "Flexbox distribui espaço por linha e aceita conteúdo variável.",
      "Teste crescimento, quebra e ordem lógica com casos além do exemplo."
    ]
  },
"css-grid": {
    "prerequisites": "Modelo de caixa, unidades, Flexbox e ordem semântica do HTML.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "Grid coordena linhas e colunas de uma composição. Você vai construir uma coleção de cartões e entender trilhas, espaço disponível e limites, escolhendo entre uma grade fixa, responsiva e automática de acordo com o conteúdo.",
    "sections": [
      {
        "title": "Uma grade tem trilhas e linhas",
        "paragraphs": [
          "display: grid transforma filhos diretos em itens grid. Trilhas são colunas e linhas de células; as linhas da grade são os limites numerados que separam essas trilhas. grid-template-columns define colunas explícitas; grid-template-rows pode definir linhas explícitas. Se você especifica três colunas e adiciona seis itens, a colocação automática preenche uma segunda linha. Novas trilhas criadas pela necessidade fazem parte da grade implícita, controlável com propriedades como grid-auto-rows.",
          "Não confunda linhas de conteúdo com linhas numeradas de fronteira. Três colunas têm quatro linhas verticais de grade. `grid-column: 1 / 3` ocupa da primeira à terceira linha, cobrindo duas colunas. `grid-column: 1 / -1` pode atravessar a grade explícita inteira. Essas posições precisam ser revistas quando a quantidade de colunas muda. Para uma coleção simples de cartões, a colocação automática normalmente é mais robusta que posicionar cada item por número."
        ]
      },
      {
        "title": "Frações repartem espaço disponível",
        "paragraphs": [
          "A unidade fr representa uma fração do espaço disponível para trilhas flexíveis. `1fr 2fr` divide esse espaço na proporção um para dois depois de considerar limites e outros tamanhos. gap cria intervalo entre trilhas; fr trabalha com a área restante, evitando a conta manual de porcentagens que podem ultrapassar 100% quando somadas a gaps. `repeat(3, 1fr)` é uma forma compacta de escrever três trilhas equivalentes.",
          "Conteúdo com tamanho mínimo grande pode impedir uma trilha de encolher como você imagina. `minmax(0, 1fr)` define mínimo zero e máximo flexível, permitindo redução da trilha; o conteúdo ainda precisa de quebra ou overflow apropriado. `minmax(14rem, 1fr)` impõe um mínimo de 14rem. Se o contêiner tiver menos que isso, a grade pode transbordar. Um mínimo útil precisa considerar a menor largura disponível, não somente o computador usado durante a construção."
        ]
      },
      {
        "title": "Grades automáticas e alinhamento",
        "paragraphs": [
          "`repeat(auto-fit, minmax(min(100%, 15rem), 1fr))` cria tantas colunas quanto couberem. O mínimo interno usa o menor valor entre 100% do contêiner e 15rem, evitando exigir uma coluna maior que o próprio contêiner estreito. auto-fit colapsa trilhas repetidas vazias e permite que as ocupadas se expandam; auto-fill pode preservar espaço de trilhas vazias. Em muitos conjuntos de cartões, auto-fit fornece o comportamento desejado com menos consultas de mídia.",
          "Itens grid normalmente esticam na célula quando aplicável. align-items altera alinhamento no eixo de bloco e justify-items no eixo de linha; align-self e justify-self ajustam um item. align-content e justify-content distribuem a grade como conjunto quando há espaço sobrando no contêiner. É possível usar display: flex dentro de cada cartão para organizar título, descrição e link. Grid resolve a coleção em duas dimensões; Flexbox resolve a composição interna em uma direção."
        ]
      },
      {
        "title": "Composição sem comprometer a ordem",
        "paragraphs": [
          "grid-template-areas permite desenhar regiões com nomes, como cabecalho, principal e apoio. Cada nome deve formar um retângulo; um ponto representa uma célula vazia. Atribua grid-area aos elementos correspondentes. Essa técnica é útil em estruturas de página, mas mover regiões visualmente não muda sua ordem no HTML. Um layout que apresenta o apoio antes do principal enquanto o teclado visita o contrário pode confundir. Mantenha a ordem semântica compatível e altere a composição somente quando isso não prejudicar leitura e interação.",
          "O inspetor de Grid mostra linhas, números e dimensões. Use-o para verificar se a segunda coluna é uma trilha real ou apenas espaço entre itens. Teste com uma, duas e muitas cartas, com descrições longas e com zoom. Não fixe altura igual para todos os cartões apenas para obter uma captura alinhada; permita que conteúdo determine a altura das linhas. Igualdade visual não pode vir de texto escondido. No exemplo, o HTML mantém uma sequência simples e a grade adapta a apresentação sem reordenar nenhum item."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>CSS Grid: colunas, linhas e composição\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; padding: 1rem; color: #172033; font-family: system-ui, sans-serif; line-height: 1.6; }\nmain { max-width: 70rem; margin-inline: auto; }\n.grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 1rem; }\n.cartao { min-width: 0; display: flex; flex-direction: column; padding: 1rem; border: 2px solid #64748b; border-radius: .5rem; overflow-wrap: anywhere; }\n.cartao a { margin-top: auto; color: #1d4ed8; }\nh2 { line-height: 1.25; }\na:focus-visible { outline: 3px solid #a16207; outline-offset: 3px; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Biblioteca de projetos\u003c/h1>\n  \u003cdiv class=\"grade\">\n    \u003carticle class=\"cartao\">\u003ch2>Agenda\u003c/h2>\u003cp>Uma página de encontros.\u003c/p>\u003ca href=\"#criterios\">Ver critérios da agenda\u003c/a>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Catálogo\u003c/h2>\u003cp>Uma coleção de livros com descrições de tamanhos variados e categorias claras.\u003c/p>\u003ca href=\"#criterios\">Ver critérios do catálogo\u003c/a>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Portfólio\u003c/h2>\u003cp>Apresente seus trabalhos e explique decisões.\u003c/p>\u003ca href=\"#criterios\">Ver critérios do portfólio\u003c/a>\u003c/article>\n    \u003carticle class=\"cartao\">\u003ch2>Guia\u003c/h2>\u003cp>Organize instruções de estudo.\u003c/p>\u003ca href=\"#criterios\">Ver critérios do guia\u003c/a>\u003c/article>\n  \u003c/div>\n  \u003csection id=\"criterios\">\u003ch2>Critérios gerais\u003c/h2>\u003cp>Conteúdo legível, links funcionais e navegação por teclado.\u003c/p>\u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "A grade cria colunas conforme o espaço disponível, sem depender de um modelo específico de aparelho.",
        "min(100%, 15rem) impede um mínimo maior que o contêiner estreito.",
        "1fr distribui espaço restante entre as colunas criadas.",
        "Os cartões são itens grid e, internamente, contêineres flex em coluna.",
        "margin-top: auto no link consome a sobra interna e aproxima ações do fim do cartão.",
        "Cada link tem nome contextual e destino existente; a ordem permanece a do HTML."
      ],
      "expected": "Os quatro cartões ocupam uma ou mais colunas conforme a largura. Textos variam sem cortes; em uma mesma linha, os links ficam próximos à base dos cartões."
    },
    "guided": [
      {
        "instruction": "Ative a sobreposição Grid no inspetor e conte colunas e linhas de fronteira.",
        "result": "Cada coluna fica entre duas linhas; a numeração não equivale à quantidade de cartões."
      },
      {
        "instruction": "Remova três cartões e compare auto-fit com auto-fill em janela larga.",
        "result": "Auto-fit permite expansão do item restante; auto-fill pode reservar trilhas vazias."
      },
      {
        "instruction": "Aumente a descrição de um cartão e amplie o zoom.",
        "result": "A altura da linha cresce para acomodar conteúdo sem altura fixa."
      }
    ],
    "exercises": [
      {
        "prompt": "Troque temporariamente a grade automática por duas colunas iguais em uma janela larga.",
        "hints": [
          "Use repeat com uma contagem explícita.",
          "minmax(0, 1fr) permite redução das trilhas."
        ],
        "solution": ".grade { grid-template-columns: repeat(2, minmax(0, 1fr)); }",
        "explanation": "Essa regra define duas colunas mesmo quando a tela fica estreita; ela serve para experimentar. Restaure a grade automática depois de comparar.",
        "expected": "Quatro cartões formam duas linhas de duas colunas."
      },
      {
        "prompt": "Faça o primeiro cartão ocupar as duas colunas da grade explícita do exercício anterior.",
        "hints": [
          "As duas colunas são delimitadas pelas linhas 1, 2 e 3.",
          "1 / -1 atravessa a grade explícita inteira."
        ],
        "solution": ".cartao:first-child { grid-column: 1 / -1; }",
        "explanation": "A regra depende do contexto da grade e não deve ser usada só para aumentar destaque sem verificar a ordem e o efeito em telas menores.",
        "expected": "O primeiro cartão ocupa a primeira linha inteira; os demais são colocados a seguir."
      },
      {
        "prompt": "Crie uma grade de proporção 2 para 1 para duas regiões de conteúdo e explique por que 66% e 34% com gap podem transbordar.",
        "hints": [
          "As porcentagens já somam 100%, antes de adicionar o intervalo.",
          "fr divide a sobra depois do gap."
        ],
        "solution": ".regioes { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 1rem; }",
        "explanation": "Crie uma div regioes com dois filhos e coloque conteúdo em cada um. A divisão em fr considera a disponibilidade após o intervalo; porcentagens que somam 100% mais gap excedem o contêiner.",
        "expected": "A região principal recebe aproximadamente o dobro do espaço da lateral, sem somar um gap por fora."
      },
      {
        "prompt": "Monte seis cartões com textos variados. A coleção precisa funcionar entre 320px e uma janela larga, sem cortes ou rolagem lateral da página.",
        "hints": [
          "Use a grade automática do exemplo e preserve altura natural.",
          "Inclua uma palavra longa e um cartão de apenas uma frase nos testes."
        ],
        "solution": ".grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 1rem; }\n.cartao { min-width: 0; overflow-wrap: anywhere; }",
        "explanation": "Escreva os seis article e links com destinos existentes. Compare larguras intermediárias; não valide apenas os extremos. Os critérios permitem aparências diferentes desde que conteúdo e ordem permaneçam corretos.",
        "expected": "A quantidade de colunas muda com o espaço; nenhum cartão fica maior que a área disponível."
      }
    ],
    "mistakes": [
      "Colunas ultrapassam a tela: reveja mínimos fixos e conteúdo intrínseco.",
      "O grid não afeta netos: o contêiner organiza somente filhos diretos.",
      "Porcentagens mais gap excedem largura: use fr ou calcule explicitamente o espaço restante.",
      "Ordem visual contradiz o teclado: reorganize o HTML e simplifique posicionamentos manuais."
    ],
    "quiz": [
      {
        "question": "O que 1fr 2fr descreve?",
        "options": [
          "Sempre 100px e 200px",
          "Duas parcelas proporcionais do espaço flexível disponível",
          "Duas linhas de texto"
        ],
        "correctIndex": 1,
        "explanation": "fr distribui espaço disponível, considerando os demais tamanhos e restrições."
      },
      {
        "question": "Por que usar min(100%, 15rem) como mínimo?",
        "options": [
          "Para impedir que o mínimo ultrapasse um contêiner estreito",
          "Para fixar sempre 15 colunas",
          "Para desativar responsividade"
        ],
        "correctIndex": 0,
        "explanation": "Quando 100% é menor que 15rem, o mínimo acompanha a largura disponível."
      },
      {
        "question": "Grid e Flexbox podem ser usados juntos?",
        "options": [
          "Não",
          "Somente com JavaScript",
          "Sim, por exemplo Grid na coleção e Flexbox dentro do cartão"
        ],
        "correctIndex": 2,
        "explanation": "Cada contêiner estabelece seu próprio contexto de layout."
      }
    ],
    "summary": [
      "Grid coordena trilhas em duas dimensões.",
      "Mínimos, conteúdo e gaps fazem parte do cálculo real.",
      "Use colocação automática quando não há necessidade de posicionamento manual."
    ]
  },
"css-responsive": {
    "prerequisites": "HTML de imagens, modelo de caixa, unidades, Flexbox e Grid.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "Uma página responsiva continua utilizável em diferentes espaços, tamanhos de texto e formas de entrada. O objetivo não é imitar uma captura em três dispositivos, mas permitir que o conteúdo se reorganize sem perder informação.",
    "sections": [
      {
        "title": "Comece pelo espaço disponível",
        "paragraphs": [
          "A viewport é a área usada pelo navegador para apresentar a página. Em dispositivos móveis, `\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` solicita uma largura de layout compatível com o dispositivo e escala inicial adequada. Ela não cria responsividade sozinha: uma caixa fixa de 1200px ainda pode ultrapassar uma tela pequena. Não desative zoom com maximum-scale ou user-scalable=no para esconder defeitos de layout; ampliar conteúdo é uma necessidade legítima.",
          "Mobile first significa escrever primeiro o layout que funciona com pouco espaço e acrescentar melhorias quando há condições. Um texto em uma coluna, navegação que quebra e imagens limitadas ao contêiner já podem formar uma boa base. Depois, uma media query introduz duas colunas quando ambas tiverem largura útil. Isso não obriga a desenvolver apenas em um telefone: use a janela e a emulação de dispositivos para descobrir limites do conteúdo, mantendo uma ordem de leitura coerente."
        ]
      },
      {
        "title": "Consultas de mídia são condições",
        "paragraphs": [
          "`@media (min-width: 48rem) { ... }` aplica o bloco quando a largura da viewport alcança o limite. Abaixo dele, as regras base continuam valendo. Um breakpoint é esse ponto de mudança, escolhido porque a composição precisa dele, não porque um aparelho popular tem determinada largura. Com unidades relativas em consultas de mídia, a referência segue as regras do ambiente de mídia; não presuma que alterar font-size de html redefina automaticamente o breakpoint.",
          "Você pode combinar condições com and, por exemplo largura mínima e orientação, mas evite uma lista excessiva de casos antes de precisar deles. Preferências como prefers-reduced-motion e condições como hover ou pointer também podem orientar melhorias. Elas não substituem acessibilidade básica: um recurso essencial precisa continuar disponível sem hover. Na organização da folha, mantenha estilos base claros e sobrescreva somente o que muda. Muitas consultas contraditórias dificultam explicar por que uma regra está ativa."
        ]
      },
      {
        "title": "Imagens fluidas e escolhas de recurso",
        "paragraphs": [
          "Uma imagem pode ter dimensão natural maior que seu contêiner. `img { max-width: 100%; height: auto; }` impede crescimento além da área disponível e preserva a proporção quando a largura é reduzida. Declarar width e height no HTML informa a proporção intrínseca e ajuda o navegador a reservar espaço. object-fit: cover ajusta a imagem a uma caixa com dimensões impostas, mas pode recortar partes; use quando o recorte é intencional e não remove informação importante.",
          "Reduzir uma imagem com CSS não reduz automaticamente os bytes transferidos. srcset pode oferecer arquivos em larguras diferentes e sizes informa o tamanho de apresentação esperado para o navegador escolher um recurso. picture permite alternativas de formato ou composição. Esses recursos exigem arquivos reais correspondentes; não invente nomes e espere que funcionem. Para esta aula, a ilustração está embutida e não depende da rede. O exercício usa também um arquivo local para praticar caminho, texto alternativo e dimensões. Lazy loading pode ajudar imagens fora da primeira área visível, mas não deve atrasar indiscriminadamente o conteúdo principal."
        ]
      },
      {
        "title": "Teste comportamento, não apenas aparência",
        "paragraphs": [
          "Abra as ferramentas do navegador, ative o modo de dispositivos e informe larguras como 320, 768 e 1280 pixels CSS. Depois arraste entre esses valores: o problema pode existir em 600px e não aparecer nos extremos. Confira se a página inteira ganhou rolagem lateral, se os títulos quebram sem se sobrepor e se os links mantêm área utilizável. A emulação é útil, mas não reproduz perfeitamente desempenho, teclado virtual ou todos os comportamentos de um dispositivo real.",
          "Faça um segundo ciclo com zoom de 200% e teclado. Substitua textos por versões maiores e adicione um cartão. Registre cenário, resultado esperado, observado e ajuste realizado. Ao encontrar transbordamento, inspecione a caixa responsável e procure largura fixa, mínimo intrínseco, palavra longa ou padding somado. Não diminua todas as fontes para fazer caber. Um resultado válido pode ter mais linhas e altura; o requisito central é preservar informação e interação. O projeto deve ser compreensível mesmo que sua aparência não seja idêntica à referência."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Responsividade: conteúdo, viewport e testes\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; color: #172033; background: #f8fafc; }\n.container { width: min(100% - 2rem, 70rem); margin-inline: auto; }\nheader { padding-block: 1rem; border-bottom: 1px solid #64748b; }\nnav { display: flex; flex-wrap: wrap; gap: 1rem; }\na { color: #1d4ed8; }\na:focus-visible { outline: 3px solid #a16207; outline-offset: 3px; }\n.conteudo { display: grid; gap: 1.5rem; padding-block: 2rem; }\n.conteudo > * { min-width: 0; overflow-wrap: anywhere; }\nh1 { font-size: clamp(2rem, 1rem + 3vw, 3rem); line-height: 1.2; }\nimg { display: block; max-width: 100%; height: auto; border-radius: .75rem; }\naside { padding: 1rem; background: #dbeafe; border-radius: .75rem; }\n@media (min-width: 48rem) { .conteudo { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); align-items: start; } }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader>\u003cnav class=\"container\" aria-label=\"Principal\">\u003ca href=\"#projeto\">Projeto\u003c/a>\u003ca href=\"#checklist\">Checklist\u003c/a>\u003c/nav>\u003c/header>\n\u003cmain class=\"container conteudo\">\n  \u003carticle id=\"projeto\">\n    \u003ch1>Um projeto para qualquer tela\u003c/h1>\n    \u003cimg width=\"800\" height=\"400\" alt=\"Ilustração abstrata: dois painéis azuis em um fundo claro\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Crect x='80' y='80' width='280' height='240' rx='20' fill='%231e40af'/%3E%3Crect x='420' y='80' width='300' height='240' rx='20' fill='%233b82f6'/%3E%3C/svg%3E\">\n    \u003cp>O conteúdo principal aparece primeiro. A coluna de apoio vem em seguida no documento e se posiciona ao lado apenas quando existe espaço.\u003c/p>\n  \u003c/article>\n  \u003caside id=\"checklist\" aria-labelledby=\"titulo-checklist\">\n    \u003ch2 id=\"titulo-checklist\">Antes de concluir\u003c/h2>\n    \u003cul>\u003cli>Teste uma janela estreita.\u003c/li>\u003cli>Amplie a página.\u003c/li>\u003cli>Navegue com teclado.\u003c/li>\u003c/ul>\n  \u003c/aside>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        "A meta viewport está no documento completo e não restringe o zoom.",
        "A base usa uma coluna; a consulta de largura mínima acrescenta duas apenas quando há espaço.",
        "A largura min combina folga lateral com um teto de 70rem.",
        "O arquivo de imagem está embutido como data URL, portanto o exemplo funciona sem download externo.",
        "Width e height registram a proporção 2:1; max-width e height auto preservam essa relação ao reduzir.",
        "A ordem artigo/apoio é a mesma no HTML e na apresentação usual."
      ],
      "expected": "Em largura estreita, artigo e checklist ficam empilhados. A partir do breakpoint, o checklist aparece ao lado. A ilustração encolhe mantendo proporção e o texto permanece legível."
    },
    "guided": [
      {
        "instruction": "Use o modo de dispositivos para comparar 320, 768 e 1280px.",
        "result": "A composição muda quando a condição de largura é satisfeita; não há rolagem lateral da página."
      },
      {
        "instruction": "Desative a media query no inspetor em janela larga.",
        "result": "A base de uma coluna continua funcional, mostrando que ela não depende da melhoria."
      },
      {
        "instruction": "Amplie o navegador para 200% e acrescente um parágrafo longo.",
        "result": "O conteúdo cresce e pode voltar a se empilhar; nada deve desaparecer."
      }
    ],
    "exercises": [
      {
        "prompt": "Altere o breakpoint para 56rem e compare duas larguras próximas do limite.",
        "hints": [
          "Edite apenas a condição min-width.",
          "O número não representa um modelo fixo de aparelho."
        ],
        "solution": "@media (min-width: 56rem) { .conteudo { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); align-items: start; } }",
        "explanation": "Substitua a consulta existente; não deixe duas regras contraditórias por acidente. Avalie se ambas as colunas têm conteúdo confortável antes de escolher o limite.",
        "expected": "As duas colunas aparecem mais tarde, conforme a nova condição."
      },
      {
        "prompt": "Substitua a ilustração por uma imagem local mantendo proporção e texto alternativo adequado.",
        "hints": [
          "Coloque uma imagem que você possua na mesma pasta.",
          "Informe suas dimensões reais e descreva a informação relevante em alt."
        ],
        "solution": "\u003cimg src=\"meu-projeto.png\" width=\"800\" height=\"400\" alt=\"Descrição específica do conteúdo do seu projeto\">",
        "explanation": "O exemplo presume um arquivo local 800 por 400; se o seu for diferente, altere os atributos. Se for puramente decorativa, alt vazio pode ser apropriado. O caminho precisa corresponder ao nome e extensão reais.",
        "expected": "A imagem local aparece sem distorção e encolhe dentro do artigo."
      },
      {
        "prompt": "Encontre e corrija o problema causado por width: 900px no aside em tela estreita.",
        "hints": [
          "Acrescente a regra para reproduzir, não como solução.",
          "Observe o elemento no inspetor e remova a dimensão fixa desnecessária."
        ],
        "solution": "/* Para reproduzir: aside { width: 900px; } */\n/* Correção: remova essa declaração; a grade dimensiona o item. */",
        "explanation": "A causa é uma caixa que exige mais largura que a viewport. Esconder overflow do body não resolve a perda de acesso ao conteúdo.",
        "expected": "Após remover a largura fixa, o checklist volta a caber no fluxo da grade."
      },
      {
        "prompt": "Adapte uma página com apresentação, imagem, três cartões e área de apoio. Registre testes em 320, 600, 768 e 1280px, mais zoom 200% e teclado.",
        "hints": [
          "Use uma coluna como base e só acrescente regiões laterais quando houver espaço.",
          "Monte uma tabela de testes com esperado, observado e ajuste."
        ],
        "solution": ".cartoes { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); gap: 1rem; }\nimg { max-width: 100%; height: auto; }\n/* Registre: 320px | sem rolagem lateral | resultado observado | correção, se necessária. */",
        "explanation": "Crie os três cartões no artigo e aplique a regra. A validação inclui conteúdo longo e foco visível; não é suficiente entregar somente uma captura de desktop.",
        "expected": "Todos os cenários preservam conteúdo, imagem proporcional e navegação por teclado."
      }
    ],
    "mistakes": [
      "Viewport presente mas layout quebra: revise larguras e mínimos fixos; a meta não adapta o CSS sozinha.",
      "Imagem achatada: preserve proporção com height auto ou assuma conscientemente um recorte com object-fit.",
      "Breakpoint escolhido pelo aparelho: teste o ponto em que o conteúdo realmente deixa de caber.",
      "Ajuste esconde informação: não use recorte global ou fonte minúscula para cumprir largura."
    ],
    "quiz": [
      {
        "question": "Qual é uma base mobile first?",
        "options": [
          "Uma coluna funcional com melhorias em min-width",
          "Todas as caixas com 1200px",
          "Uma imagem de um telefone"
        ],
        "correctIndex": 0,
        "explanation": "A estrutura inicial precisa funcionar em pouco espaço antes de receber novas colunas."
      },
      {
        "question": "max-width: 100%; height: auto em uma imagem faz o quê?",
        "options": [
          "Reduz automaticamente o arquivo baixado",
          "Limita o tamanho visual e preserva a proporção",
          "Cria uma descrição alternativa"
        ],
        "correctIndex": 1,
        "explanation": "A escolha de um arquivo menor depende de recursos como srcset e dos arquivos disponíveis."
      },
      {
        "question": "Por que testar larguras intermediárias?",
        "options": [
          "Para repetir a mesma captura",
          "Porque todo dispositivo tem a mesma largura",
          "Porque falhas podem surgir entre os pontos escolhidos"
        ],
        "correctIndex": 2,
        "explanation": "Responsividade é um intervalo de comportamentos, não apenas três imagens aprovadas."
      }
    ],
    "summary": [
      "Viewport, conteúdo fluido e media queries trabalham juntos.",
      "A imagem precisa de proporção correta e recurso apropriado.",
      "Valide intervalos de largura, zoom, teclado e conteúdo variável."
    ]
  },
"css-variables": {
    "prerequisites": "Cascata, herança, unidades, estados, Flexbox, Grid e responsividade.",
    "setup": "Use um editor de texto e um navegador. Crie uma pasta para esta aula e salve o exemplo completo como index.html em UTF-8, sem acrescentar .txt. Abra o arquivo no navegador. Após cada mudança, salve e atualize a página. Os exercícios modificam esse arquivo e apresentam trechos para inserir ou substituir; a solução não é um segundo documento completo. Não é necessário servidor, biblioteca, conta ou conexão de internet para executar os exemplos. Abra as ferramentas de desenvolvimento com F12 ou pelo menu Inspecionar. Mantenha uma cópia inicial para comparar suas experiências.",
    "why": "Uma identidade visual consistente exige escolhas reutilizáveis. Propriedades personalizadas permitem nomear cores e espaços pela função, mudar regiões da interface e manter componentes compreensíveis sem espalhar valores repetidos.",
    "sections": [
      {
        "title": "Nomear valores pela função",
        "paragraphs": [
          "Uma propriedade personalizada começa com dois hífens, como --cor-texto. Ela armazena um valor que outras declarações consomem por var(--cor-texto). Os nomes diferenciam maiúsculas de minúsculas: --Cor e --cor não são a mesma variável. Declarar uma variável não altera a aparência por si só; é preciso usá-la em uma propriedade concreta, como color ou padding. Variáveis CSS não são variáveis JavaScript e não exigem script.",
          "Tokens são escolhas de design nomeadas para reutilização. --cor-acao explica melhor o papel que --azul, porque a ação pode mudar para outra cor sem renomear todas as referências. Você pode separar valores de base, como --espaco-2, de funções, como --espaco-card, mas evite criar camadas demais para um projeto pequeno. Um bom nome ajuda a prever o efeito de uma mudança. Um nome genérico como --valor1 obriga a procurar todos os usos para descobrir seu significado."
        ]
      },
      {
        "title": "Escopo e cascata continuam existindo",
        "paragraphs": [
          ":root seleciona a raiz do documento, normalmente html. Declarar tokens ali os disponibiliza para descendentes por herança. Uma regra em .tema-noite pode redefinir --cor-texto somente dentro daquela região. Os componentes que usam var(--cor-texto) recebem o valor correspondente ao seu lugar na árvore. Essa é uma vantagem em páginas com prévias de temas: um cartão pode mudar sem duplicar todas as regras de tipografia e espaçamento.",
          "As variáveis seguem a cascata: seletores, importância e ordem ainda podem decidir entre definições concorrentes. Considere onde o valor será consumido e onde ele foi definido. Uma propriedade personalizada não registrada geralmente herda; isso permite tokens globais, mas também pode propagar uma escolha para filhos que você não pretendia alterar. Inspecione o elemento e procure --nome no painel de estilos. Alterar uma variável no pai pelo DevTools revela quais descendentes realmente dependem dela."
        ]
      },
      {
        "title": "Fallback não corrige qualquer erro",
        "paragraphs": [
          "`color: var(--cor-texto, #172033)` usa a alternativa quando a propriedade personalizada não está definida ou está em situação inválida para a substituição. Esse fallback não é uma validação geral do tipo esperado pela propriedade final. Se --cor-texto estiver definida como 20px, a substituição existe, mas não forma uma cor válida; o navegador não escolhe automaticamente #172033 por isso. A declaração final fica inválida no momento do cálculo e o valor resultante segue as regras aplicáveis de valor inicial ou herança.",
          "Uma alternativa pode conter outro var, como `var(--cor-local, var(--cor-texto, #172033))`, mas cadeias longas prejudicam clareza. Para cálculos, use calc: `padding: calc(var(--espaco) * 2)`. Mantenha unidades compatíveis. Nomes circulares como --a: var(--b) e --b: var(--a) não produzem um valor útil. Para começar, use valores simples, poucos níveis de referência e testes visuais. Aprender limites do fallback evita interpretar uma página aparentemente estável como prova de configuração correta."
        ]
      },
      {
        "title": "Manutenção e validação do sistema visual",
        "paragraphs": [
          "Organize a folha em escolhas globais, elementos básicos, componentes e adaptações responsivas. Não é necessário seguir uma metodologia complexa, mas uma regra .card deve ter responsabilidade reconhecível. Reutilize classes em vez de copiar o mesmo bloco com nomes ligeiramente diferentes. Evite seletores muito profundos que amarram o estilo a uma estrutura específica. Ao terminar, remova regras antigas que perderam sua finalidade e explique decisões não óbvias com comentários curtos.",
          "Trocar tokens não garante um tema utilizável. Uma nova cor de fundo exige rever texto, borda, links, hover, foco e estados indisponíveis. Verifique contraste em cada par real de primeiro plano e fundo. Um aumento global de espaço pode provocar quebra em componentes; uma nova fonte pode mudar altura e largura. Refaça testes de janela estreita, zoom e teclado após mudanças importantes. O resultado desejado é conseguir evoluir a identidade visual mantendo critérios funcionais, não apenas demonstrar que uma cor mudou em muitos lugares."
        ]
      }
    ],
    "example": {
      "language": "html",
      "code": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Variáveis CSS, temas e organização de estilos\u003c/title>\n\u003cstyle>\n:root { --cor-fundo: #ffffff; --cor-texto: #172033; --cor-painel: #f1f5f9; --cor-borda: #64748b; --cor-link: #1d4ed8; --cor-foco: #a16207; --espaco: 1rem; --raio: .75rem; }\n* { box-sizing: border-box; }\nbody { margin: 0; padding: var(--espaco); background: var(--cor-fundo); color: var(--cor-texto); font-family: system-ui, sans-serif; line-height: 1.6; }\nmain { max-width: 60rem; margin-inline: auto; }\n.grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); gap: var(--espaco); }\n.card { padding: calc(var(--espaco) * 1.5); background: var(--cor-painel); color: var(--cor-texto); border: 2px solid var(--cor-borda); border-radius: var(--raio, .5rem); }\n.card a { color: var(--cor-link); }\n.card a:focus-visible { outline: 3px solid var(--cor-foco); outline-offset: 3px; }\n.tema-noite { --cor-texto: #f1f5f9; --cor-painel: #172033; --cor-borda: #94a3b8; --cor-link: #93c5fd; --cor-foco: #facc15; }\nh2 { line-height: 1.25; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cmain>\n  \u003ch1>Uma estrutura, dois temas\u003c/h1>\n  \u003cdiv class=\"grade\">\n    \u003carticle class=\"card\">\u003ch2>Tema claro\u003c/h2>\u003cp>O componente utiliza os tokens herdados da raiz.\u003c/p>\u003ca href=\"#revisao\">Revisar tema claro\u003c/a>\u003c/article>\n    \u003carticle class=\"card tema-noite\">\u003ch2>Tema escuro\u003c/h2>\u003cp>A região redefine cores sem duplicar a estrutura do cartão.\u003c/p>\u003ca href=\"#revisao\">Revisar tema escuro\u003c/a>\u003c/article>\n  \u003c/div>\n  \u003csection id=\"revisao\">\u003ch2>Revisão\u003c/h2>\u003cp>Confira contraste, foco, espaçamento e leitura em cada tema.\u003c/p>\u003c/section>\n\u003c/main>\n\u003c/body>\n\u003c/html>",
      "explanation": [
        ":root fornece valores padrão por herança, mas cada componente ainda precisa consumir var.",
        "Os dois artigos compartilham .card e a mesma estrutura de apresentação.",
        ".tema-noite redefine apenas o conjunto de cores dentro do segundo cartão.",
        "O espaçamento interno deriva de --espaco por calc e muda junto com a escolha global.",
        "O raio possui fallback de .5rem caso --raio seja removido.",
        "O foco usa uma cor de token própria em cada tema para continuar visível."
      ],
      "expected": "Dois cartões com o mesmo espaçamento e forma, um claro e um escuro. Os links e contornos de foco se adaptam às respectivas regiões."
    },
    "guided": [
      {
        "instruction": "Altere --raio na raiz para 0 e observe os dois cartões.",
        "result": "Ambos ficam com cantos retos; nenhuma regra de componente precisa ser duplicada."
      },
      {
        "instruction": "Remova temporariamente --raio de :root.",
        "result": "O fallback .5rem é utilizado pela borda arredondada."
      },
      {
        "instruction": "Inspecione o link do tema escuro e encontre a origem de --cor-link.",
        "result": "O valor vem da região tema-noite, não da definição clara na raiz."
      }
    ],
    "exercises": [
      {
        "prompt": "Aumente o espaçamento global para 1.25rem e explique os efeitos.",
        "hints": [
          "Edite somente --espaco na raiz.",
          "Procure seus usos em body, gap e calc. "
        ],
        "solution": ":root { --espaco: 1.25rem; }",
        "explanation": "A declaração deve substituir o valor existente. O padding do cartão usa 1.5 vezes o token, enquanto o gap e o padding de body usam o valor diretamente.",
        "expected": "Margens internas e intervalos crescem de forma coordenada."
      },
      {
        "prompt": "Crie uma região de tema suave com fundo #ecfdf5, texto #064e3b e link #065f46 sem duplicar a regra .card.",
        "hints": [
          "Adicione uma classe modificadora a um terceiro cartão.",
          "Redefina os tokens usados pelo componente."
        ],
        "solution": ".tema-suave { --cor-painel: #ecfdf5; --cor-texto: #064e3b; --cor-link: #065f46; --cor-borda: #047857; --cor-foco: #92400e; }",
        "explanation": "Duplique um article e use class=\"card tema-suave\". Confira os pares de contraste e o foco; a reutilização funciona porque .card consome os nomes sem conhecer o tema específico.",
        "expected": "Três cartões compartilham estrutura, mas o novo tem sua própria combinação visual."
      },
      {
        "prompt": "Compare --cor-link ausente com --cor-link: 20px usando um fallback de cor. Explique por que não são o mesmo caso.",
        "hints": [
          "A variável pode existir e ainda não servir como valor de color.",
          "Teste primeiro uma variável inédita para observar ausência."
        ],
        "solution": ".card a { color: var(--cor-teste, #7c2d12); }\n/* Observe sem definir --cor-teste. Depois acrescente: */\n.card { --cor-teste: 20px; }",
        "explanation": "Sem a variável, o fallback fornece uma cor. Com 20px definido, a substituição torna color inválido no cálculo e o fallback de var não resolve o tipo; color pode acabar herdando. Remova o teste e restaure --cor-link ao terminar.",
        "expected": "Você distingue ausência de variável de valor incompatível com a propriedade consumidora."
      },
      {
        "prompt": "Extraia os valores recorrentes de seu portfólio para tokens e crie uma variação de tema. Faça uma revisão funcional completa após a troca.",
        "hints": [
          "Comece por fundo, texto, link, borda, foco, espaço e raio.",
          "Teste os estados e a menor largura; não valide somente as cores estáticas. "
        ],
        "solution": ":root { --cor-fundo: #fff; --cor-texto: #172033; --cor-link: #1d4ed8; --cor-borda: #64748b; --cor-foco: #a16207; --espaco: 1rem; --raio: .75rem; }\n/* Substitua valores repetidos pelas chamadas var correspondentes. */",
        "explanation": "Liste cada token e os componentes que o consomem. Confirme que uma alteração tem o alcance esperado e que nenhum texto perde contraste. A solução final depende do portfólio, mas os critérios são verificáveis.",
        "expected": "Tema coerente, foco visível, conteúdo legível e layout funcional com zoom e tela estreita."
      }
    ],
    "mistakes": [
      "Declarar token sem efeito: procure onde ele é consumido com var.",
      "Confundir fallback com validação: um valor existente incompatível pode invalidar a declaração final.",
      "Tema altera regiões inesperadas: revise escopo, herança e seletores.",
      "Cores mudam mas foco desaparece: trate foco e outros estados como parte do conjunto de tokens."
    ],
    "quiz": [
      {
        "question": "Qual é a função de var(--raio, .5rem)?",
        "options": [
          "Criar uma variável JavaScript",
          "Consumir --raio com alternativa quando cabível",
          "Definir todos os raios automaticamente"
        ],
        "correctIndex": 1,
        "explanation": "A declaração que chama var determina onde o valor será usado."
      },
      {
        "question": "Onde uma redefinição em .tema-noite costuma afetar tokens herdados?",
        "options": [
          "Somente naquela região e seus descendentes",
          "Sempre em todo o documento",
          "Somente no arquivo CSS"
        ],
        "correctIndex": 0,
        "explanation": "A árvore e a cascata controlam o alcance do valor."
      },
      {
        "question": "Se --cor: 20px, color: var(--cor, red) necessariamente fica vermelho?",
        "options": [
          "Sim, sempre",
          "Sim, se houver :root",
          "Não, a variável existe mas produz um valor incompatível"
        ],
        "correctIndex": 2,
        "explanation": "Fallback não é um verificador geral de tipos da propriedade final."
      }
    ],
    "summary": [
      "Tokens nomeiam decisões reutilizáveis pela função.",
      "Escopo, cascata e herança continuam orientando os resultados.",
      "Alterar tema exige revalidar leitura, estados e layout."
    ]
  }
});

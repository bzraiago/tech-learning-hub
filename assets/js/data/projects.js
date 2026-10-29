'use strict';

// Projetos dos módulos e associação dos guias às respectivas aulas.
const PROJECTS=[
  {
    "id": "project-html",
    "module": "html-basic",
    "title": "Clube de estudos: estrutura e inscrição",
    "level": "Projeto do módulo · HTML básico",
    "goal": "Construir uma página compreensível e navegável sem depender de CSS. Uma pessoa deve encontrar a agenda e preencher uma inscrição de laboratório.",
    "prerequisites": "Conclua as cinco aulas de HTML. Use editor de texto e navegador. Não é necessário JavaScript, framework ou serviço de envio.",
    "deliverable": "Crie clube.html em uma pasta de laboratório. Cole o documento completo na aba Entrega. Use dados fictícios e não adicione serviços externos.",
    "brief": [
      "O clube oferece os encontros Estrutura HTML (terça, 19h) e Formulários (quinta, 19h). Mostre os dois em uma tabela.",
      "A navegação deve levar à agenda e à inscrição. O formulário pede nome, e-mail e encontro; os três são obrigatórios. Informe que não existe cadastro real.",
      "Inclua os metadados, organize títulos e use elementos pelo significado. A referência é deliberadamente simples: cores e alinhamento ainda não são requisitos."
    ],
    "checks": [
      {
        "id": "document",
        "label": "Documento com DOCTYPE, idioma, UTF-8, viewport e título não vazio.",
        "mode": "auto"
      },
      {
        "id": "landmarks",
        "label": "Um main, um h1, header, nav e footer; links internos com destinos existentes.",
        "mode": "auto"
      },
      {
        "id": "labels",
        "label": "Campos com id único, name e rótulo associado; botões com texto e type.",
        "mode": "auto"
      },
      {
        "id": "email",
        "label": "E-mail obrigatório com type=email e um botão submit.",
        "mode": "auto"
      },
      {
        "id": "table",
        "label": "Tabela com caption, cabeçalhos de coluna e de linha com scope, e pelo menos dois registros.",
        "mode": "auto"
      },
      {
        "id": "enrollment",
        "label": "Nome obrigatório e select obrigatório com uma opção inicial vazia e dois encontros.",
        "mode": "auto"
      },
      {
        "id": "keyboard",
        "label": "Percorri links e campos com Tab/Shift+Tab, acionei links com Enter e consegui identificar o foco.",
        "mode": "manual"
      },
      {
        "id": "native",
        "label": "No arquivo local, testei campos vazios e e-mail inválido; o navegador impediu a submissão.",
        "mode": "manual"
      },
      {
        "id": "meaning",
        "label": "Li a página sem estilos: a ordem, os títulos e os textos dos links continuam compreensíveis.",
        "mode": "manual"
      }
    ],
    "tests": [
      [
        "Abra o arquivo salvo.",
        "O título da aba identifica o clube; a página contém um título principal e as seções Agenda e Inscrição."
      ],
      [
        "Clique em Agenda e Inscrição.",
        "O navegador alcança a seção correspondente. Nenhum link aponta para um id inexistente."
      ],
      [
        "No arquivo local, tente enviar tudo vazio; depois use email=abc.",
        "A validação nativa bloqueia os casos inválidos. A prévia isolada do dashboard não envia formulários."
      ],
      [
        "Preencha dados fictícios válidos e escolha um encontro.",
        "A validação permite a navegação local do formulário. Isso NÃO significa cadastro: sem backend não há armazenamento."
      ]
    ],
    "hints": [
      "Desenhe a árvore header → nav, main → duas section, footer antes de escrever todos os textos.",
      "Use for no label apontando exatamente para o id do campo; name representa o nome do dado enviado.",
      "Uma opção inicial com value vazio, somada a required no select, exige uma escolha efetiva."
    ],
    "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Clube Primeiro Código\u003c/title>\n\u003c/head>\n\u003cbody>\n\u003cheader>\n  \u003ch1>Clube Primeiro Código\u003c/h1>\n  \u003cp>Encontros gratuitos para aprender em grupo.\u003c/p>\n  \u003cnav aria-label=\"Principal\">\u003ca href=\"#agenda\">Agenda\u003c/a> · \u003ca href=\"#inscricao\">Inscrição\u003c/a>\u003c/nav>\n\u003c/header>\n\u003cmain>\n  \u003csection aria-labelledby=\"agenda\">\n    \u003ch2 id=\"agenda\">Agenda de encontros\u003c/h2>\n    \u003cp>Dois encontros para começar a construir páginas.\u003c/p>\n    \u003ctable>\n      \u003ccaption>Programação da semana\u003c/caption>\n      \u003cthead>\u003ctr>\u003cth scope=\"col\">Encontro\u003c/th>\u003cth scope=\"col\">Horário\u003c/th>\u003c/tr>\u003c/thead>\n      \u003ctbody>\u003ctr>\u003cth scope=\"row\">Estrutura HTML\u003c/th>\u003ctd>Terça, 19h\u003c/td>\u003c/tr>\n      \u003ctr>\u003cth scope=\"row\">Formulários\u003c/th>\u003ctd>Quinta, 19h\u003c/td>\u003c/tr>\u003c/tbody>\n    \u003c/table>\n  \u003c/section>\n  \u003csection aria-labelledby=\"inscricao\">\n    \u003ch2 id=\"inscricao\">Inscreva-se\u003c/h2>\n    \u003cp>Laboratório: o formulário não realiza cadastro. Use dados fictícios.\u003c/p>\n    \u003cform method=\"get\" action=\"#inscricao\">\n      \u003cfieldset>\u003clegend>Seus dados\u003c/legend>\n        \u003cp>\u003clabel for=\"nome\">Nome\u003c/label>\u003cbr>\u003cinput id=\"nome\" name=\"nome\" autocomplete=\"name\" required>\u003c/p>\n        \u003cp>\u003clabel for=\"email\">E-mail\u003c/label>\u003cbr>\u003cinput id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" required>\u003c/p>\n        \u003cp>\u003clabel for=\"encontro\">Encontro\u003c/label>\u003cbr>\u003cselect id=\"encontro\" name=\"encontro\" required>\n          \u003coption value=\"\">Escolha\u003c/option>\u003coption value=\"html\">Estrutura HTML\u003c/option>\u003coption value=\"forms\">Formulários\u003c/option>\n        \u003c/select>\u003c/p>\n        \u003cbutton type=\"submit\">Conferir inscrição de teste\u003c/button>\n      \u003c/fieldset>\n    \u003c/form>\n  \u003c/section>\n\u003c/main>\n\u003cfooter>\u003cp>Clube Primeiro Código · projeto de aprendizagem.\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
    "explanation": [
      "O HTML permanece útil com os estilos padrão do navegador, tornando a estrutura visível.",
      "scope diferencia os cabeçalhos que nomeiam colunas daqueles que identificam linhas.",
      "O formulário usa GET apenas como demonstração local com dados fictícios: os valores podem aparecer na URL. Um cadastro real precisaria de backend e validação no servidor."
    ],
    "transfer": "Acrescente um terceiro encontro e uma opção correspondente no formulário. Explique quais partes precisaram mudar e repita os testes.",
    "rubric": "Aprovação de estudo: atender a todas as checagens estruturais e realizar os testes manuais. A aparência padrão do navegador é suficiente; não avalie este projeto por decoração."
  },
  {
    "id": "project-css",
    "module": "css-foundations",
    "title": "Clube legível: integrar HTML e CSS",
    "level": "Projeto integrador · nível básico",
    "goal": "Transformar a estrutura do clube em uma página legível e consistente, controlando a cascata, as caixas, a tipografia e os estados de interação.",
    "prerequisites": "Use seu clube.html aprovado ou reconstrua-o pelo enunciado do projeto anterior. Estude cascata, box model, tipografia e estados antes de começar.",
    "deliverable": "Entregue um documento HTML com CSS dentro de style no head. Nas aulas você também pratica CSS externo; neste validador o CSS precisa estar no mesmo documento.",
    "brief": [
      "Preserve agenda, navegação e formulário. Dê ao conteúdo largura máxima e margens laterais, sem usar posições absolutas para montar a página.",
      "Defina box-sizing, fonte, altura de linha, contraste e espaçamento interno dos blocos. Os campos devem caber em sua caixa.",
      "Crie estados de hover e foco perceptível. Não remova o contorno de foco sem fornecer outro indicador. Nenhum clique precisa executar JavaScript."
    ],
    "checks": [
      {
        "id": "document",
        "label": "Documento com DOCTYPE, idioma, UTF-8, viewport e título não vazio.",
        "mode": "auto"
      },
      {
        "id": "landmarks",
        "label": "Um main, um h1, header, nav e footer; links internos com destinos existentes.",
        "mode": "auto"
      },
      {
        "id": "labels",
        "label": "Campos com id único, name e rótulo associado; botões com texto e type.",
        "mode": "auto"
      },
      {
        "id": "email",
        "label": "E-mail obrigatório com type=email e um botão submit.",
        "mode": "auto"
      },
      {
        "id": "box",
        "label": "CSS interno contém box-sizing:border-box e max-width.",
        "mode": "auto"
      },
      {
        "id": "type",
        "label": "CSS interno define font-family ou font, line-height, color e background ou background-color.",
        "mode": "auto"
      },
      {
        "id": "focus",
        "label": "CSS interno inclui uma regra :focus ou :focus-visible e uma regra :hover.",
        "mode": "auto"
      },
      {
        "id": "readable",
        "label": "Conferi texto e controles com contraste legível, zoom de 200% e uma janela estreita; nada essencial ficou cortado.",
        "mode": "manual"
      },
      {
        "id": "inspect",
        "label": "Inspecionei um elemento no DevTools e expliquei a regra vencedora, sua margem, borda e padding.",
        "mode": "manual"
      },
      {
        "id": "interaction",
        "label": "Testei teclado e ponteiro: foco perceptível, rótulos clicáveis e campos utilizáveis sem depender apenas de cor.",
        "mode": "manual"
      }
    ],
    "tests": [
      [
        "Compare a página com e sem a folha de estilos.",
        "O significado continua igual; o CSS altera apresentação, não substitui elementos."
      ],
      [
        "No DevTools, altere padding de uma section e depois sua margin.",
        "Você identifica a mudança dentro e fora da borda e consegue revertê-la no arquivo."
      ],
      [
        "Use Tab e depois passe o ponteiro sobre links e botão.",
        "Foco e hover são visíveis; o conteúdo não salta nem some."
      ],
      [
        "Aumente o zoom para 200%.",
        "O texto continua acessível e os controles permanecem utilizáveis; corrija larguras rígidas se necessário."
      ]
    ],
    "hints": [
      "Comece pela fonte e pelo box-sizing; só depois cuide dos componentes.",
      "Use max-width e margin-inline:auto para limitar e centralizar blocos, com padding para afastar o conteúdo da borda.",
      "Se uma propriedade não funcionar, confira seletor, regra riscada e valor calculado no inspetor antes de acrescentar !important."
    ],
    "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Clube Primeiro Código — versão legível\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\n:root { font-family: system-ui, sans-serif; color: #17233b; background: #f1f5fb; line-height: 1.6; }\nbody { margin: 0; }\nheader, main, footer { max-width: 64rem; margin-inline: auto; padding: 1.25rem; }\nheader { background: #17233b; color: white; }\nheader a { color: #b9dcff; }\nh1 { font-size: 2rem; line-height: 1.2; }\nh2 { font-size: 1.4rem; line-height: 1.3; }\nsection { background: white; border: 1px solid #c5d0e0; padding: 1.25rem; margin-bottom: 1.5rem; border-radius: .75rem; }\na { color: #164da0; text-underline-offset: .2em; }\na:hover { text-decoration-thickness: .2em; }\n:focus-visible { outline: 3px solid #a64300; outline-offset: 4px; }\ntable { border-collapse: collapse; width: 100%; }\ncaption { text-align: left; font-weight: bold; margin-bottom: .5rem; }\nth, td { border: 1px solid #a6b4c8; padding: .5rem; text-align: left; }\nfieldset { min-width: 0; border: 1px solid #a6b4c8; }\ninput, select, button { font: inherit; }\ninput, select { width: 100%; padding: .65rem; border: 1px solid #687b96; border-radius: .3rem; }\nbutton { padding: .7rem 1rem; border: 0; border-radius: .4rem; background: #164da0; color: white; cursor: pointer; }\nbutton:hover { background: #10366e; }\nfooter { font-size: .9rem; }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader>\n  \u003ch1>Clube Primeiro Código\u003c/h1>\n  \u003cp>Encontros gratuitos para aprender em grupo.\u003c/p>\n  \u003cnav aria-label=\"Principal\">\u003ca href=\"#agenda\">Agenda\u003c/a> · \u003ca href=\"#inscricao\">Inscrição\u003c/a>\u003c/nav>\n\u003c/header>\n\u003cmain>\n  \u003csection aria-labelledby=\"agenda\">\n    \u003ch2 id=\"agenda\">Agenda de encontros\u003c/h2>\n    \u003cp>Dois encontros para começar a construir páginas.\u003c/p>\n    \u003ctable>\n      \u003ccaption>Programação da semana\u003c/caption>\n      \u003cthead>\u003ctr>\u003cth scope=\"col\">Encontro\u003c/th>\u003cth scope=\"col\">Horário\u003c/th>\u003c/tr>\u003c/thead>\n      \u003ctbody>\u003ctr>\u003cth scope=\"row\">Estrutura HTML\u003c/th>\u003ctd>Terça, 19h\u003c/td>\u003c/tr>\n      \u003ctr>\u003cth scope=\"row\">Formulários\u003c/th>\u003ctd>Quinta, 19h\u003c/td>\u003c/tr>\u003c/tbody>\n    \u003c/table>\n  \u003c/section>\n  \u003csection aria-labelledby=\"inscricao\">\n    \u003ch2 id=\"inscricao\">Inscreva-se\u003c/h2>\n    \u003cp>Laboratório: o formulário não realiza cadastro. Use dados fictícios.\u003c/p>\n    \u003cform method=\"get\" action=\"#inscricao\">\n      \u003cfieldset>\u003clegend>Seus dados\u003c/legend>\n        \u003cp>\u003clabel for=\"nome\">Nome\u003c/label>\u003cbr>\u003cinput id=\"nome\" name=\"nome\" autocomplete=\"name\" required>\u003c/p>\n        \u003cp>\u003clabel for=\"email\">E-mail\u003c/label>\u003cbr>\u003cinput id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" required>\u003c/p>\n        \u003cp>\u003clabel for=\"encontro\">Encontro\u003c/label>\u003cbr>\u003cselect id=\"encontro\" name=\"encontro\" required>\n          \u003coption value=\"\">Escolha\u003c/option>\u003coption value=\"html\">Estrutura HTML\u003c/option>\u003coption value=\"forms\">Formulários\u003c/option>\n        \u003c/select>\u003c/p>\n        \u003cbutton type=\"submit\">Conferir inscrição de teste\u003c/button>\n      \u003c/fieldset>\n    \u003c/form>\n  \u003c/section>\n\u003c/main>\n\u003cfooter>\u003cp>Clube Primeiro Código · projeto de aprendizagem.\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
    "explanation": [
      "A regra universal inclui padding e borda na largura declarada. Os campos de 100% cabem no espaço disponível.",
      "A largura máxima limita linhas longas; os blocos continuam flexíveis quando a janela diminui.",
      "O foco tem contorno próprio e não depende do hover. As cores da referência são uma escolha possível, não a única resposta correta."
    ],
    "transfer": "Crie uma variante visual para um segundo clube mudando paleta e espaçamento, sem alterar a estrutura HTML. Registre duas regras que você reutilizou.",
    "rubric": "Integre os conhecimentos do nível básico. A comparação visual avalia legibilidade e hierarquia, não igualdade de pixels. As checagens CSS detectam declarações; a aparência precisa ser conferida por você."
  },
  {
    "id": "project-responsive",
    "module": "html-layout",
    "title": "Portfólio responsivo e acessível",
    "level": "Projeto do módulo + integrador · layouts",
    "goal": "Construir um portfólio autoral com navegação flexível, grade de projetos e contato, demonstrando como o layout se adapta ao espaço disponível.",
    "prerequisites": "Conclua HTML, fundamentos de CSS, Flexbox, Grid, responsividade e variáveis. Reutilize padrões aprendidos, mas comece pelo enunciado antes de olhar a solução.",
    "deliverable": "Entregue portfolio.html com HTML e CSS internos, sem frameworks ou JavaScript. Cole tudo na aba Entrega e teste o arquivo local em larguras diferentes.",
    "brief": [
      "Crie apresentação com h1, três cartões de projetos com h3 sob uma seção h2, navegação interna e formulário de e-mail e mensagem de pelo menos dez caracteres.",
      "Use Flexbox na navegação e Grid nos cartões. Em tela estreita, o conteúdo deve empilhar sem rolagem horizontal da página. Em tela larga, use colunas quando houver espaço.",
      "Defina variáveis para cores e espaçamento, mantenha foco visível e respeite redução de movimento se adicionar transições. Os links dos projetos devem ter destinos reais na página; não invente páginas ausentes."
    ],
    "checks": [
      {
        "id": "document",
        "label": "Documento com DOCTYPE, idioma, UTF-8, viewport e título não vazio.",
        "mode": "auto"
      },
      {
        "id": "landmarks",
        "label": "Um main, um h1, header, nav e footer; links internos com destinos existentes.",
        "mode": "auto"
      },
      {
        "id": "labels",
        "label": "Campos com id único, name e rótulo associado; botões com texto e type.",
        "mode": "auto"
      },
      {
        "id": "email",
        "label": "E-mail obrigatório com type=email e um botão submit.",
        "mode": "auto"
      },
      {
        "id": "cards",
        "label": "Seção com pelo menos três article, cada um com h3 e link com texto.",
        "mode": "auto"
      },
      {
        "id": "layout",
        "label": "CSS interno contém display:flex, display:grid, uma media query de largura e pelo menos três propriedades personalizadas.",
        "mode": "auto"
      },
      {
        "id": "message",
        "label": "Textarea com rótulo, name, required e minlength de pelo menos 10.",
        "mode": "auto"
      },
      {
        "id": "sizes",
        "label": "Testei a 360px e a 1200px: não há rolagem horizontal da página e os cartões se reorganizam sem esconder conteúdo.",
        "mode": "manual"
      },
      {
        "id": "long",
        "label": "Substituí um título por um texto longo e confirmei que ele quebra dentro do cartão.",
        "mode": "manual"
      },
      {
        "id": "access",
        "label": "Conferi teclado, foco, zoom de 200% e, se usei animação, preferência de movimento reduzido.",
        "mode": "manual"
      },
      {
        "id": "explain",
        "label": "Expliquei por que usei Flexbox e Grid em lugares diferentes e fiz a mudança de requisito sem copiar a solução.",
        "mode": "manual"
      }
    ],
    "tests": [
      [
        "Use os botões de largura na Referência e na sua prévia.",
        "A referência muda a apresentação de duas colunas para uma; a grade ajusta a quantidade de cartões por linha. Em telas menores, use o arquivo local para testar a largura de 1200px."
      ],
      [
        "No arquivo local, compare 360px e 1200px e aumente o zoom.",
        "Não deve haver texto sobreposto, formulário cortado ou necessidade de arrastar a página inteira para os lados."
      ],
      [
        "Troque um título por uma frase de 100 caracteres.",
        "O cartão acomoda o texto sem invadir seu vizinho."
      ],
      [
        "Envie mensagem com nove caracteres e depois com dez, usando dados fictícios.",
        "A validação nativa rejeita a primeira e aceita a segunda quando os demais campos são válidos; não existe serviço real de envio."
      ]
    ],
    "hints": [
      "Faça primeiro a versão de uma coluna. Acrescente o layout mais amplo em uma media query quando o conteúdo precisar dele.",
      "Uma grade auto-fit/minmax ou colunas alteradas por media queries são alternativas válidas; justifique sua escolha.",
      "Se houver rolagem lateral, procure largura fixa, min-width implícito, imagem sem limite ou texto sem quebra. Não esconda o problema com overflow-x:hidden no body."
    ],
    "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Portfólio de Ana\u003c/title>\n\u003cstyle>\n* { box-sizing: border-box; }\n:root { --fundo: #101522; --painel: #1b2538; --texto: #f1f5ff; --destaque: #9ddcff; --espaco: 1.25rem; --raio: .8rem; }\nbody { margin: 0; font: 1rem/1.6 system-ui, sans-serif; color: var(--texto); background: var(--fundo); }\nheader, main, footer { max-width: 70rem; margin-inline: auto; padding: var(--espaco); }\na { color: var(--destaque); text-underline-offset: .25em; }\n:focus-visible { outline: 3px solid #ffd18c; outline-offset: 4px; }\n.topo, nav { display: flex; flex-wrap: wrap; align-items: center; gap: var(--espaco); }\n.topo { justify-content: space-between; }\n.marca { font-weight: bold; }\nh1 { font-size: 2.3rem; line-height: 1.15; max-width: 18ch; }\nh2, h3 { line-height: 1.3; }\n.intro { display: grid; gap: var(--espaco); padding-block: 2rem; }\n.etiqueta { color: var(--destaque); }\naside, article { background: var(--painel); padding: var(--espaco); border: 1px solid #42516c; border-radius: var(--raio); min-width: 0; overflow-wrap: anywhere; }\n.grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: var(--espaco); }\nsection { margin-bottom: 2rem; }\nform { max-width: 38rem; }\ninput, textarea, button { font: inherit; }\ninput, textarea { width: 100%; padding: .7rem; border: 1px solid #a7b5cf; border-radius: .4rem; background: #fff; color: #101522; }\n.botao, button { display: inline-block; padding: .75rem 1rem; border-radius: .4rem; border: 0; color: #101522; background: var(--destaque); font-weight: bold; cursor: pointer; }\nbutton:hover, .botao:hover { background: #d4efff; }\n@media (min-width: 48rem) { .intro { grid-template-columns: 2fr 1fr; align-items: center; } h1 { font-size: 3.2rem; } }\n@media (prefers-reduced-motion: no-preference) { .botao, button { transition: background-color .15s; } }\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cheader class=\"topo\">\n  \u003ca class=\"marca\" href=\"#inicio\">Ana · Desenvolvimento web\u003c/a>\n  \u003cnav aria-label=\"Principal\">\u003ca href=\"#projetos\">Projetos\u003c/a>\u003ca href=\"#contato\">Contato\u003c/a>\u003c/nav>\n\u003c/header>\n\u003cmain id=\"inicio\">\n  \u003csection class=\"intro\" aria-labelledby=\"apresentacao\">\n    \u003cdiv>\u003cp class=\"etiqueta\">Meu primeiro portfólio\u003c/p>\u003ch1 id=\"apresentacao\">Ideias que ganham uma página.\u003c/h1>\n    \u003cp>Estou aprendendo HTML e CSS. Estes projetos mostram o que já consigo construir.\u003c/p>\n    \u003ca class=\"botao\" href=\"#projetos\">Conheça os projetos\u003c/a>\u003c/div>\n    \u003caside>\u003ch2>Minha próxima meta\u003c/h2>\u003cp>Construir interfaces que funcionem com teclado, celular e telas grandes.\u003c/p>\u003c/aside>\n  \u003c/section>\n  \u003csection aria-labelledby=\"projetos\">\u003ch2 id=\"projetos\">Projetos\u003c/h2>\n    \u003cdiv class=\"grade\">\n      \u003carticle>\u003ch3>Clube de estudos\u003c/h3>\u003cp>HTML semântico, agenda e formulário.\u003c/p>\u003ca href=\"#contato\">Conversar sobre o clube\u003c/a>\u003c/article>\n      \u003carticle>\u003ch3>Guia de leitura\u003c/h3>\u003cp>Tipografia, hierarquia e espaçamento.\u003c/p>\u003ca href=\"#contato\">Conversar sobre o guia\u003c/a>\u003c/article>\n      \u003carticle>\u003ch3>Catálogo responsivo\u003c/h3>\u003cp>Grid, variáveis e composição fluida.\u003c/p>\u003ca href=\"#contato\">Conversar sobre o catálogo\u003c/a>\u003c/article>\n    \u003c/div>\n  \u003c/section>\n  \u003csection aria-labelledby=\"contato\">\u003ch2 id=\"contato\">Contato\u003c/h2>\u003cp>Projeto de laboratório, sem serviço de envio.\u003c/p>\n    \u003cform method=\"get\" action=\"#contato\">\u003cp>\u003clabel for=\"email\">Seu e-mail\u003c/label>\u003cbr>\u003cinput id=\"email\" type=\"email\" name=\"email\" required>\u003c/p>\n      \u003cp>\u003clabel for=\"mensagem\">Mensagem\u003c/label>\u003cbr>\u003ctextarea id=\"mensagem\" name=\"mensagem\" rows=\"4\" required minlength=\"10\">\u003c/textarea>\u003c/p>\n      \u003cbutton type=\"submit\">Conferir mensagem de teste\u003c/button>\n    \u003c/form>\n  \u003c/section>\n\u003c/main>\n\u003cfooter>\u003cp>Feito com HTML e CSS · Ana\u003c/p>\u003c/footer>\n\u003c/body>\n\u003c/html>",
    "explanation": [
      "A estrutura principal começa em uma coluna; a media query amplia a composição da apresentação.",
      "Flexbox organiza a navegação com quebra, enquanto Grid controla os cartões em linhas e colunas.",
      "As variáveis centralizam as decisões visuais. O minmax com limite de 100% mantém os cartões utilizáveis em contêineres estreitos."
    ],
    "transfer": "Acrescente um quarto projeto e uma seção de habilidades. Não escreva posições específicas para cada cartão. Repita os testes de largura e teclado.",
    "rubric": "Este projeto demonstra fundamentos de layout aplicados. Passar no checklist não certifica acessibilidade completa: é evidência dos critérios exercitados. Refaça depois sem consultar a solução para verificar autonomia."
  },
  {
    "id": "project-js-core",
    "module": "js-basic",
    "kind": "javascript",
    "format": "js",
    "title": "Resumo de uma jornada de estudos",
    "level": "Projeto do módulo · fundamentos",
    "goal": "Escrever uma função pura que transforma uma lista de aulas em um resumo confiável, sem alterar a entrada e sem depender de uma interface.",
    "prerequisites": "Estude valores, controle, funções, arrays, objetos, ES6 e depuração. Faça primeiro em um arquivo JavaScript no editor; os testes abaixo também podem executar sua função isoladamente.",
    "deliverable": "Cole apenas JavaScript, sem tags script. Defina function resumirEstudos(aulas). O nome faz parte do contrato dos testes; variáveis internas podem ter outros nomes.",
    "brief": [
      "Entrada: array de objetos {titulo, minutos, concluida}. titulo deve ser texto não vazio após trim, minutos deve ser inteiro positivo e concluida deve ser booleano. Rejeite qualquer entrada inválida lançando TypeError.",
      "Retorno: objeto com total, concluidas, minutosPendentes e percentual. Somente aulas pendentes contribuem para minutosPendentes. percentual é arredondado com Math.round. Um array vazio retorna quatro zeros.",
      "Não altere o array nem os objetos recebidos. Não escreva no DOM, não use prompts e não acesse rede ou armazenamento: a saída é o valor retornado."
    ],
    "exampleOutput": "Entrada: [{titulo:\"HTML\",minutos:30,concluida:true}, {titulo:\"JS\",minutos:45,concluida:false}]\nRetorno: {total:2, concluidas:1, minutosPendentes:45, percentual:50}\n\nEntrada: []\nRetorno: {total:0, concluidas:0, minutosPendentes:0, percentual:0}",
    "checks": [
      {
        "id": "normal",
        "label": "Duas aulas: conta e soma apenas o tempo pendente.",
        "mode": "auto",
        "body": "const r=resumirEstudos([{titulo:\"HTML\",minutos:30,concluida:true},{titulo:\"JS\",minutos:45,concluida:false}]); return r.total===2 && r.concluidas===1 && r.minutosPendentes===45 && r.percentual===50;"
      },
      {
        "id": "empty",
        "label": "Array vazio produz quatro zeros.",
        "mode": "auto",
        "body": "const r=resumirEstudos([]); return r.total===0 && r.concluidas===0 && r.minutosPendentes===0 && r.percentual===0;"
      },
      {
        "id": "round",
        "label": "Uma conclusão entre três aulas produz 33%.",
        "mode": "auto",
        "body": "return resumirEstudos([true,false,false].map(concluida=>({titulo:\"A\",minutos:10,concluida}))).percentual===33;"
      },
      {
        "id": "invalid",
        "label": "Rejeita não-array, minutos inválidos, título vazio e booleano textual.",
        "mode": "auto",
        "body": "const casos=[null,{},[{titulo:\"A\",minutos:0,concluida:false}],[{titulo:\"A\",minutos:NaN,concluida:false}],[{titulo:\" \",minutos:10,concluida:false}],[{titulo:\"A\",minutos:10,concluida:\"false\"}]]; return casos.every(x=>{try{resumirEstudos(x);return false;}catch(e){return e instanceof TypeError;}});"
      },
      {
        "id": "immutable",
        "label": "Preserva os dados originais.",
        "mode": "auto",
        "body": "const a=[{titulo:\"A\",minutos:10,concluida:false}];const antes=JSON.stringify(a);resumirEstudos(a);return JSON.stringify(a)===antes;"
      },
      {
        "id": "explain",
        "label": "Expliquei a função, o retorno e por que usei validação antes do cálculo.",
        "mode": "manual"
      },
      {
        "id": "newcase",
        "label": "Criei um caso próprio com todas as aulas concluídas e conferi tempo pendente zero e percentual 100%.",
        "mode": "manual"
      }
    ],
    "hints": [
      "Escreva os quatro resultados esperados no papel antes do código.",
      "Valide o array e depois cada objeto. Use acumuladores ou métodos de array, desde que consiga explicar o fluxo.",
      "Trate o array vazio antes da divisão; testar apenas o caso comum esconde esse erro."
    ],
    "solution": "function resumirEstudos(aulas) {\n  if (!Array.isArray(aulas)) throw new TypeError(\"Use um array\");\n  let concluidas = 0;\n  let minutosPendentes = 0;\n  for (const aula of aulas) {\n    if (!aula || typeof aula.titulo !== \"string\" || !aula.titulo.trim() ||\n        !Number.isInteger(aula.minutos) || aula.minutos \u003c= 0 ||\n        typeof aula.concluida !== \"boolean\") {\n      throw new TypeError(\"Aula inválida\");\n    }\n    if (aula.concluida) concluidas += 1;\n    else minutosPendentes += aula.minutos;\n  }\n  const total = aulas.length;\n  return { total, concluidas, minutosPendentes,\n    percentual: total === 0 ? 0 : Math.round(concluidas / total * 100) };\n}",
    "explanation": [
      "A função separa validação do cálculo e não converte silenciosamente dados inválidos.",
      "Os acumuladores começam fora do laço; cada aula contribui uma vez.",
      "O denominador zero é tratado explicitamente. O retorno reúne dados, permitindo que outra parte da aplicação escolha como exibi-los."
    ],
    "transfer": "Acrescente minutosTotais ao retorno, sem mudar os resultados anteriores. Crie um teste que diferencie tempo total de tempo pendente.",
    "rubric": "Passe nos casos publicados, acrescente um caso próprio e explique as decisões. Testes didáticos cobrem este contrato; não provam que todo programa está correto."
  },
  {
    "id": "project-js-dom",
    "module": "js-dom-app",
    "kind": "javascript",
    "format": "html",
    "title": "Lista de estudos com persistência",
    "level": "Projeto integrador · interfaces",
    "goal": "Construir uma interface que mantém estado, reage a eventos e continua utilizável quando o armazenamento falha.",
    "prerequisites": "Conclua linguagem, DOM, eventos e localStorage. Use as técnicas de HTML/CSS já estudadas. Nenhuma API ou biblioteca é necessária.",
    "deliverable": "Crie tarefas.html com HTML, CSS e JavaScript no próprio documento. Cole o HTML completo na Entrega. Execute seu arquivo local para testar comportamento e persistência; a prévia do seu código aqui é estrutural e não executa seus scripts.",
    "brief": [
      "Use os IDs nova para o form, titulo para o campo, lista para ul, filtro para select e resumo para o contador. Esses nomes permitem a checagem estrutural; a implementação interna é sua.",
      "Adicione tarefas por submit, recusando texto vazio ou só espaços. Permita concluir, reabrir e remover tarefas. Ofereça filtros Todas/Pendentes/Concluídas e mostre quantas foram concluídas sobre o total.",
      "Salve em estudos-projeto-js:v1 com JSON. Valide a estrutura ao restaurar; trate JSON corrompido e armazenamento indisponível mantendo a sessão utilizável. Use IDs estáveis, não o índice do item filtrado.",
      "Crie elementos e insira títulos com textContent. Preserve rótulos, teclado, foco e mensagem de lista vazia. Dados digitados não devem virar HTML."
    ],
    "exampleOutput": "1. Adicione Ler e Praticar → 0 de 2 concluídas.\n2. Conclua Ler → 1 de 2 concluídas.\n3. Filtre Pendentes → só Praticar aparece.\n4. Remova Praticar → 1 de 1 concluídas; filtro Pendentes mostra mensagem vazia.\n5. Recarregue seu arquivo local → Ler continua concluída.",
    "checks": [
      {
        "id": "js-document",
        "label": "Documento com idioma, título, viewport e JavaScript interno.",
        "mode": "auto",
        "body": "html"
      },
      {
        "id": "js-controls",
        "label": "Formulário, rótulo, lista, filtro e resumo com os IDs do contrato.",
        "mode": "auto",
        "body": "html"
      },
      {
        "id": "js-status",
        "label": "Mensagem com role=status e botão submit explícito.",
        "mode": "auto",
        "body": "html"
      },
      {
        "id": "flow",
        "label": "Executei a sequência de inclusão, conclusão, filtro e remoção e conferi os contadores.",
        "mode": "manual"
      },
      {
        "id": "storage",
        "label": "No arquivo local, recarreguei e preservei dados; depois simulei JSON inválido no DevTools e a página continuou utilizável.",
        "mode": "manual"
      },
      {
        "id": "text",
        "label": "Digitei \u003cb>teste\u003c/b> e apenas espaços: o primeiro apareceu literalmente e o segundo foi rejeitado.",
        "mode": "manual"
      },
      {
        "id": "keyboard",
        "label": "Usei apenas teclado, conferi foco após inclusão/remoção e testei o estado vazio.",
        "mode": "manual"
      }
    ],
    "hints": [
      "Separe estado (array), renderizar (DOM) e salvar (localStorage). Alterar um não atualiza automaticamente os outros.",
      "Para simular corrupção, no Console do seu arquivo execute localStorage.setItem(\"estudos-projeto-js:v1\", \"{invalido\") e recarregue. Isso afeta somente a chave de laboratório.",
      "Compare os estados com uma lista desenhada no papel. Se remover o item errado após filtrar, reveja a identidade utilizada."
    ],
    "solution": "\u003c!DOCTYPE html>\n\u003chtml lang=\"pt-BR\">\n\u003chead>\u003cmeta charset=\"UTF-8\">\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\u003ctitle>Minha lista de estudos\u003c/title>\n\u003cstyle>\n*{box-sizing:border-box}body{font:1rem/1.6 system-ui;margin:0;background:#101522;color:#edf0fa}main{max-width:42rem;margin:auto;padding:1.5rem}input,button,select{font:inherit;padding:.6rem;border-radius:.4rem}input[type=text]{width:100%}button{cursor:pointer;background:#b7dfff;color:#122035;border:0}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #ffd18c;outline-offset:3px}li{display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;padding:.8rem;background:#202c40;margin-block:.6rem;border-radius:.5rem}li span{flex:1;overflow-wrap:anywhere}ul{list-style:none;padding:0}.feita{text-decoration:line-through}#status{color:#ffe2a8}label{display:block}input[type=checkbox]{width:1.2rem;height:1.2rem}\n\u003c/style>\u003c/head>\u003cbody>\u003cmain>\n\u003ch1>Minha lista de estudos\u003c/h1>\n\u003cform id=\"nova\">\u003clabel for=\"titulo\">O que você vai estudar?\u003c/label>\u003cinput id=\"titulo\" name=\"titulo\" type=\"text\" maxlength=\"100\" required>\u003cbutton type=\"submit\">Adicionar\u003c/button>\u003c/form>\n\u003cp>\u003clabel for=\"filtro\">Mostrar\u003c/label>\u003cselect id=\"filtro\">\u003coption value=\"todas\">Todas\u003c/option>\u003coption value=\"pendentes\">Pendentes\u003c/option>\u003coption value=\"concluidas\">Concluídas\u003c/option>\u003c/select>\u003c/p>\n\u003cp id=\"status\" role=\"status\">\u003c/p>\u003cp id=\"resumo\">\u003c/p>\u003cul id=\"lista\">\u003c/ul>\n\u003c/main>\u003cscript>\nconst chave = \"estudos-projeto-js:v1\";\nconst campo = document.querySelector(\"#titulo\");\nconst lista = document.querySelector(\"#lista\");\nconst filtro = document.querySelector(\"#filtro\");\nconst status = document.querySelector(\"#status\");\nlet tarefas = [];\nlet sequencia = 0;\ntry {\n  const raw = localStorage.getItem(chave);\n  const dados = raw === null ? [] : JSON.parse(raw);\n  const ids = new Set();\n  if (!Array.isArray(dados) || !dados.every(t => {\n    if (!t || typeof t.id !== \"string\" || !t.id || ids.has(t.id) ||\n        typeof t.titulo !== \"string\" || !t.titulo.trim() || t.titulo.length > 100 ||\n        typeof t.concluida !== \"boolean\") return false;\n    ids.add(t.id); return true;\n  })) throw new Error(\"Dados inválidos\");\n  tarefas = dados;\n} catch { status.textContent = \"Armazenamento indisponível ou inválido. Você pode usar esta sessão.\"; }\nfunction salvar() {\n  try { localStorage.setItem(chave, JSON.stringify(tarefas)); }\n  catch { status.textContent = \"Não foi possível salvar. As mudanças ficam nesta sessão.\"; }\n}\nfunction renderizar() {\n  lista.replaceChildren();\n  const visiveis = tarefas.filter(t => filtro.value === \"todas\" ||\n    (filtro.value === \"concluidas\" ? t.concluida : !t.concluida));\n  for (const tarefa of visiveis) {\n    const li = document.createElement(\"li\");\n    const check = document.createElement(\"input\");\n    check.type = \"checkbox\"; check.checked = tarefa.concluida;\n    check.setAttribute(\"aria-label\", \"Concluir \" + tarefa.titulo);\n    check.addEventListener(\"change\", () => {\n      tarefa.concluida = check.checked; salvar(); renderizar(); campo.focus();\n    });\n    const texto = document.createElement(\"span\");\n    texto.textContent = tarefa.titulo; texto.classList.toggle(\"feita\", tarefa.concluida);\n    const remover = document.createElement(\"button\");\n    remover.type = \"button\"; remover.textContent = \"Remover\";\n    remover.setAttribute(\"aria-label\", \"Remover \" + tarefa.titulo);\n    remover.addEventListener(\"click\", () => {\n      tarefas = tarefas.filter(t => t.id !== tarefa.id); salvar(); renderizar(); campo.focus();\n    });\n    li.append(check, texto, remover); lista.append(li);\n  }\n  if (visiveis.length === 0) {\n    const li = document.createElement(\"li\"); li.textContent = \"Nenhuma tarefa neste filtro.\"; lista.append(li);\n  }\n  const feitas = tarefas.filter(t => t.concluida).length;\n  document.querySelector(\"#resumo\").textContent = feitas + \" de \" + tarefas.length + \" concluídas\";\n}\ndocument.querySelector(\"#nova\").addEventListener(\"submit\", event => {\n  event.preventDefault(); const titulo = campo.value.trim();\n  if (!titulo) { status.textContent = \"Digite uma tarefa, não apenas espaços.\"; campo.focus(); return; }\n  tarefas.push({ id: Date.now() + \"-\" + (++sequencia), titulo, concluida: false });\n  status.textContent = \"Tarefa adicionada.\"; salvar(); renderizar(); campo.value = \"\"; campo.focus();\n});\nfiltro.addEventListener(\"change\", renderizar);\nrenderizar();\n\u003c/script>\u003c/body>\u003c/html>",
    "explanation": [
      "renderizar deriva a interface do array; o filtro não altera o conjunto original.",
      "try/catch trata falhas de leitura, JSON e escrita. A referência embutida usa sessão em memória porque seu isolamento bloqueia localStorage.",
      "Os títulos usam textContent e IDs estáveis distinguem tarefas com nomes iguais. O foco volta ao campo após operações que recriam elementos."
    ],
    "transfer": "Inclua um botão Limpar concluídas. Teste com nenhuma, algumas e todas concluídas, conservando as pendentes.",
    "rubric": "A estrutura é conferida automaticamente; o comportamento, o foco e a persistência exigem os testes manuais no arquivo local. A referência visual não executa scripts; teste o comportamento no arquivo aberto no navegador."
  },
  {
    "id": "project-js-async",
    "module": "js-browser",
    "kind": "javascript",
    "format": "js",
    "title": "Catálogo assíncrono com contrato e falhas",
    "level": "Projeto do módulo · integração assíncrona",
    "goal": "Construir uma função assíncrona testável que verifica uma resposta, normaliza um catálogo e propaga falhas sem inventar dados.",
    "prerequisites": "Conclua Promises, async/await, Fetch, validação e organização em módulos. Os testes usam uma função buscar simulada, portanto não exigem conta, chave nem internet.",
    "deliverable": "Cole apenas JavaScript. Defina async function obterCatalogo(buscar). O argumento buscar é uma função sem parâmetros que devolve uma Promise de um objeto com ok e json().",
    "brief": [
      "Chame buscar uma vez, aguarde a resposta, confira ok === true e aguarde json(). Um status sem sucesso deve lançar Error antes de ler o corpo. Erros de rede e de JSON devem continuar como rejeições.",
      "O corpo deve ser um array. Cada item exige id inteiro positivo, único, e titulo textual não vazio. Retorne um novo array de objetos {id,titulo}, com título aparado por trim. Rejeite formato inválido com TypeError.",
      "Não transforme falhas em array vazio: [] é um catálogo válido sem itens. Não mude os objetos recebidos. A injeção de buscar separa o contrato da integração real com fetch.",
      "Integração posterior: no projeto da lista, chame essa função com um adaptador fetch, mostre carregamento e reative o botão em finally. Só faça essa extensão depois de passar nos testes locais."
    ],
    "exampleOutput": "buscar simulado → {ok:true, json:async()=>[{id:1,titulo:\"  DOM  \"}]}\nawait obterCatalogo(buscar) → [{id:1,titulo:\"DOM\"}]\n\nCorpo [] → [] (sucesso vazio)\nResposta ok:false → rejeição (falha HTTP)\nCorpo [{id:1,titulo:\" \"}] → rejeição (formato inválido)",
    "checks": [
      {
        "id": "success",
        "label": "Aguarda resposta e JSON, apara título e conserva a entrada.",
        "mode": "auto",
        "body": "const dados=[{id:1,titulo:\"  DOM  \",extra:true}];let chamadas=0;const r=await obterCatalogo(async()=>{chamadas++;return{ok:true,json:async()=>dados};});return chamadas===1 && r!==dados && r[0]!==dados[0] && r[0].titulo===\"DOM\" && r[0].id===1 && Object.keys(r[0]).length===2 && dados[0].titulo===\"  DOM  \";"
      },
      {
        "id": "empty",
        "label": "Catálogo vazio é sucesso.",
        "mode": "auto",
        "body": "const r=await obterCatalogo(async()=>({ok:true,json:async()=>[]}));return Array.isArray(r)&&r.length===0;"
      },
      {
        "id": "http",
        "label": "Rejeita status HTTP antes de tentar ler o corpo.",
        "mode": "auto",
        "body": "let leu=false;try{await obterCatalogo(async()=>({ok:false,json:async()=>{leu=true;return[];}}));return false;}catch(e){return e instanceof Error && !leu;}"
      },
      {
        "id": "network",
        "label": "Propaga falha de rede e JSON inválido.",
        "mode": "auto",
        "body": "for(const buscar of [async()=>{throw new Error(\"rede\");},async()=>({ok:true,json:async()=>{throw new SyntaxError(\"JSON\");}})]){try{await obterCatalogo(buscar);return false;}catch(e){if(!(e instanceof Error))return false;}}return true;"
      },
      {
        "id": "format",
        "label": "Rejeita formato incorreto e IDs repetidos.",
        "mode": "auto",
        "body": "for(const dados of [{},[{id:0,titulo:\"A\"}],[{id:1,titulo:\" \"}],[{id:1,titulo:\"A\"},{id:1,titulo:\"B\"}]]){try{await obterCatalogo(async()=>({ok:true,json:async()=>dados}));return false;}catch(e){if(!(e instanceof TypeError))return false;}}return true;"
      },
      {
        "id": "trace",
        "label": "Expliquei o caminho da Promise em sucesso, status HTTP inválido, JSON inválido e catálogo vazio.",
        "mode": "manual"
      },
      {
        "id": "extension",
        "label": "Criei um teste adicional de resposta lenta e confirmei que o resultado é aguardado, sem consulta a um servidor real.",
        "mode": "manual"
      }
    ],
    "hints": [
      "Use mocks pequenos para isolar uma falha por vez. Uma função async pode devolver o objeto de resposta simulado.",
      "A validade de JSON e a validade do catálogo são verificações diferentes.",
      "Um Set guarda os IDs já encontrados; valide antes de adicionar o próximo. A dependência buscar é uma função, não o resultado da chamada."
    ],
    "solution": "async function obterCatalogo(buscar) {\n  if (typeof buscar !== \"function\") throw new TypeError(\"Informe uma função buscar\");\n  const resposta = await buscar();\n  if (!resposta || resposta.ok !== true) throw new Error(\"Falha HTTP\");\n  const dados = await resposta.json();\n  if (!Array.isArray(dados)) throw new TypeError(\"Catálogo deve ser um array\");\n  const ids = new Set();\n  return dados.map(item => {\n    if (!item || !Number.isInteger(item.id) || item.id \u003c= 0 || ids.has(item.id) ||\n        typeof item.titulo !== \"string\" || !item.titulo.trim()) {\n      throw new TypeError(\"Item inválido ou duplicado\");\n    }\n    ids.add(item.id);\n    return { id: item.id, titulo: item.titulo.trim() };\n  });\n}",
    "explanation": [
      "Dois await separam a obtenção da resposta e a leitura do corpo. Verificar ok antes do JSON evita tratar erro HTTP como sucesso.",
      "map cria um novo array, e cada retorno cria um novo objeto. trim normaliza texto sem mudar o original.",
      "Nenhum catch converte falha em sucesso vazio; a interface chamadora decide como apresentar a rejeição."
    ],
    "transfer": "Adicione um teste para buscar que só resolve após 100ms. Depois extraia a validação dos itens para uma função pura e confirme que todos os testes anteriores continuam passando.",
    "rubric": "Testes locais verificam o contrato publicado. Não cobrem autenticação, servidores reais, CORS ou todas as falhas possíveis; essas integrações exigem seus próprios testes."
  },
  {
    "kind": "python",
    "format": "py",
    "id": "project-py-foundations",
    "module": "py-basic",
    "title": "Diário de estudos em JSON",
    "level": "Projeto do módulo · fundamentos",
    "goal": "Criar funções que registram sessões de estudo em um arquivo JSON e calculam um resumo confiável.",
    "prerequisites": "Conclua sintaxe, controle, coleções, funções, arquivos e depuração. Use Python 3.10+ e uma pasta de laboratório; os testes criam arquivos temporários.",
    "deliverable": "Salve sua implementação como diario.py e cole somente o conteúdo desse arquivo abaixo. Salve o arquivo de testes mostrado em Referência como test_diario.py e execute python -m unittest -v test_diario.py no terminal.",
    "brief": [
      "Implemente carregar(caminho), adicionar(caminho, assunto, minutos) e resumir(caminho). O caminho pode ser str ou pathlib.Path. Arquivo ausente representa lista vazia; arquivo presente deve conter lista JSON válida.",
      "Cada sessão é {\"assunto\": texto não vazio após strip, \"minutos\": inteiro positivo}. Rejeite bool, zero, número fracionário, texto vazio e JSON malformado com ValueError. Não apague um arquivo inválido silenciosamente.",
      "adicionar preserva sessões anteriores e grava UTF-8. resumir devolve {\"sessoes\": total, \"minutos\": soma, \"por_assunto\": dicionário de minutos por assunto}; a ordem de inserção não importa. Não escreva no disco durante importação do módulo."
    ],
    "exampleOutput": "Após adicionar(\"Python\", 25) e adicionar(\"SQL\", 35):\n{\"sessoes\": 2, \"minutos\": 60, \"por_assunto\": {\"Python\": 25, \"SQL\": 35}}\nArquivo inexistente: {\"sessoes\": 0, \"minutos\": 0, \"por_assunto\": {}}\nArquivo corrompido: ValueError, sem sobrescrever os dados.",
    "testCommand": "python -m unittest -v test_diario.py",
    "testsCode": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\nimport unittest\nfrom diario import carregar, adicionar, resumir\n\nclass DiarioTests(unittest.TestCase):\n    def setUp(self):\n        self.pasta = TemporaryDirectory()\n        self.addCleanup(self.pasta.cleanup)\n        self.arquivo = Path(self.pasta.name) / \"estudos.json\"\n\n    def test_arquivo_ausente(self):\n        self.assertEqual(carregar(self.arquivo), [])\n        self.assertEqual(resumir(self.arquivo), {\"sessoes\": 0, \"minutos\": 0, \"por_assunto\": {}})\n\n    def test_registro_e_resumo(self):\n        adicionar(self.arquivo, \" Python \", 25)\n        adicionar(self.arquivo, \"SQL\", 35)\n        adicionar(self.arquivo, \"Python\", 10)\n        self.assertEqual(resumir(self.arquivo), {\"sessoes\": 3, \"minutos\": 70, \"por_assunto\": {\"Python\": 35, \"SQL\": 35}})\n        self.assertEqual(len(carregar(self.arquivo)), 3)\n\n    def test_entrada_invalida_nao_altera_arquivo(self):\n        adicionar(self.arquivo, \"Python\", 25)\n        antes = self.arquivo.read_bytes()\n        for assunto, minutos in [(\" \", 10), (\"JS\", 0), (\"JS\", True), (\"JS\", 1.5)]:\n            with self.subTest(assunto=assunto, minutos=minutos):\n                with self.assertRaises(ValueError): adicionar(self.arquivo, assunto, minutos)\n                self.assertEqual(self.arquivo.read_bytes(), antes)\n\n    def test_json_corrompido_preservado(self):\n        self.arquivo.write_text(\"{quebrado\", encoding=\"utf-8\")\n        with self.assertRaises(ValueError): carregar(self.arquivo)\n        with self.assertRaises(ValueError): adicionar(self.arquivo, \"Python\", 10)\n        self.assertEqual(self.arquivo.read_text(encoding=\"utf-8\"), \"{quebrado\")\n\nif __name__ == \"__main__\": unittest.main()\n",
    "checks": [
      {
        "id": "missing",
        "mode": "manual",
        "label": "Executei o teste de arquivo ausente: lista e resumo vazios."
      },
      {
        "id": "summary",
        "mode": "manual",
        "label": "Executei registros repetidos e conferi soma total e por assunto após reler JSON."
      },
      {
        "id": "invalid",
        "mode": "manual",
        "label": "Entradas inválidas geram ValueError e não alteram o arquivo existente."
      },
      {
        "id": "corrupt",
        "mode": "manual",
        "label": "JSON corrompido gera erro e seu conteúdo permanece intacto."
      },
      {
        "id": "explain",
        "mode": "manual",
        "label": "Expliquei a diferença entre dados inválidos, arquivo ausente e erro de escrita."
      }
    ],
    "hints": [
      "Comece por carregar: trate apenas FileNotFoundError como vazio; use json.loads ou json.load para interpretar o texto.",
      "Faça uma função validar_sessao reutilizada tanto na leitura quanto na inclusão. Lembre que bool é subtipo de int.",
      "Use pathlib.Path, encoding=\"utf-8\" e json.dumps(..., ensure_ascii=False) para preservar acentos."
    ],
    "solution": "import json\nfrom pathlib import Path\n\ndef validar_sessao(item):\n    if not isinstance(item, dict) or set(item) != {\"assunto\", \"minutos\"}:\n        raise ValueError(\"Sessão inválida\")\n    assunto = item[\"assunto\"]\n    minutos = item[\"minutos\"]\n    if not isinstance(assunto, str) or not assunto.strip():\n        raise ValueError(\"Assunto inválido\")\n    if type(minutos) is not int or minutos \u003c= 0:\n        raise ValueError(\"Minutos inválidos\")\n    return {\"assunto\": assunto.strip(), \"minutos\": minutos}\n\ndef carregar(caminho):\n    arquivo = Path(caminho)\n    try:\n        texto = arquivo.read_text(encoding=\"utf-8\")\n    except FileNotFoundError:\n        return []\n    try:\n        dados = json.loads(texto)\n    except json.JSONDecodeError as erro:\n        raise ValueError(\"JSON malformado\") from erro\n    if not isinstance(dados, list):\n        raise ValueError(\"O arquivo deve conter uma lista\")\n    return [validar_sessao(item) for item in dados]\n\ndef adicionar(caminho, assunto, minutos):\n    nova = validar_sessao({\"assunto\": assunto, \"minutos\": minutos})\n    sessoes = carregar(caminho)\n    sessoes.append(nova)\n    Path(caminho).write_text(json.dumps(sessoes, ensure_ascii=False, indent=2), encoding=\"utf-8\")\n\ndef resumir(caminho):\n    sessoes = carregar(caminho)\n    por_assunto = {}\n    for sessao in sessoes:\n        nome = sessao[\"assunto\"]\n        por_assunto[nome] = por_assunto.get(nome, 0) + sessao[\"minutos\"]\n    return {\"sessoes\": len(sessoes), \"minutos\": sum(item[\"minutos\"] for item in sessoes), \"por_assunto\": por_assunto}\n",
    "explanation": [
      "A validação central evita aceitar arquivos corrompidos e valores como True no lugar de um inteiro.",
      "A ausência do arquivo tem significado diferente de JSON inválido; somente FileNotFoundError vira coleção vazia.",
      "O módulo não executa gravação no import, então os testes controlam sua pasta temporária."
    ],
    "transfer": "Adicione uma função remover_ultima(caminho) que retorna a sessão retirada. Para lista vazia, levante ValueError sem criar arquivo. Escreva dois testes novos.",
    "rubric": "Os testes locais cobrem entradas e falhas publicadas, mas não garantem escrita atômica, concorrência ou recuperação de falha de disco. Marque os critérios após executar e interpretar os resultados; o dashboard não roda Python."
  },
  {
    "kind": "python",
    "format": "py",
    "id": "project-py-domain",
    "module": "py-intermediate",
    "title": "Biblioteca de empréstimos",
    "level": "Projeto do módulo · objetos e módulos",
    "goal": "Modelar regras de empréstimo em uma classe pequena, com erros específicos e estado protegido contra alterações externas.",
    "prerequisites": "Conclua classes, exceções e módulos. Trabalhe com biblioteca.py e test_biblioteca.py na mesma pasta, sem pacotes externos.",
    "deliverable": "Salve sua classe e a exceção em biblioteca.py; cole esse arquivo na Entrega. Execute o test_biblioteca.py abaixo com python -m unittest -v test_biblioteca.py.",
    "brief": [
      "Crie ErroEmprestimo(ValueError) e Biblioteca. A classe mantém livros por código. cadastrar(codigo, titulo) rejeita texto vazio e código duplicado com ValueError.",
      "emprestar(codigo) e devolver(codigo) levantam KeyError para código ausente. Emprestar duas vezes e devolver algo já disponível levantam ErroEmprestimo. Cada operação válida atualiza o estado correspondente.",
      "catalogo() devolve uma nova lista de novos dicionários {\"codigo\", \"titulo\", \"emprestado\"}. Alterar esse retorno não muda a biblioteca interna. Nenhuma ação deve ocorrer no import do módulo."
    ],
    "exampleOutput": "Cadastrar L1 / Python claro → [{\"codigo\":\"L1\",\"titulo\":\"Python claro\",\"emprestado\":False}]\nEmprestar L1 → emprestado True\nEmprestar L1 de novo → ErroEmprestimo\nDevolver L1 → emprestado False\nAlterar catalogo()[0] → estado interno permanece igual.",
    "testCommand": "python -m unittest -v test_biblioteca.py",
    "testsCode": "import unittest\nfrom biblioteca import Biblioteca, ErroEmprestimo\n\nclass BibliotecaTests(unittest.TestCase):\n    def setUp(self):\n        self.b = Biblioteca()\n        self.b.cadastrar(\"L1\", \"Python claro\")\n\n    def test_fluxo(self):\n        self.b.emprestar(\"L1\")\n        self.assertTrue(self.b.catalogo()[0][\"emprestado\"])\n        self.b.devolver(\"L1\")\n        self.assertFalse(self.b.catalogo()[0][\"emprestado\"])\n\n    def test_regras(self):\n        self.b.emprestar(\"L1\")\n        with self.assertRaises(ErroEmprestimo): self.b.emprestar(\"L1\")\n        self.b.devolver(\"L1\")\n        with self.assertRaises(ErroEmprestimo): self.b.devolver(\"L1\")\n\n    def test_ausentes_e_duplicados(self):\n        with self.assertRaises(KeyError): self.b.emprestar(\"X\")\n        with self.assertRaises(KeyError): self.b.devolver(\"X\")\n        with self.assertRaises(ValueError): self.b.cadastrar(\"L1\", \"Outro\")\n        with self.assertRaises(ValueError): self.b.cadastrar(\"  \", \"Outro\")\n\n    def test_copia_externa(self):\n        fora = self.b.catalogo()\n        fora[0][\"titulo\"] = \"Trocado\"\n        fora.clear()\n        self.assertEqual(self.b.catalogo()[0][\"titulo\"], \"Python claro\")\n\nif __name__ == \"__main__\": unittest.main()\n",
    "checks": [
      {
        "id": "flow",
        "mode": "manual",
        "label": "Cadastrar, emprestar e devolver alteram apenas o livro indicado."
      },
      {
        "id": "rules",
        "mode": "manual",
        "label": "Estado inválido gera ErroEmprestimo sem alterar os livros."
      },
      {
        "id": "absent",
        "mode": "manual",
        "label": "Código ausente gera KeyError; texto vazio e código duplicado são rejeitados."
      },
      {
        "id": "copy",
        "mode": "manual",
        "label": "Mudar a lista e os dicionários devolvidos por catalogo não altera a biblioteca."
      },
      {
        "id": "module",
        "mode": "manual",
        "label": "Importar biblioteca não cria estado global nem produz saída."
      }
    ],
    "hints": [
      "Comece com um dicionário self._livros criado em __init__; cada valor pode ser um dicionário pequeno.",
      "Valide antes de alterar o estado. Use uma exceção de domínio para transições inválidas e KeyError apenas para código ausente.",
      "Construa catalogo com dict(...) para que cada chamada devolva cópias."
    ],
    "solution": "class ErroEmprestimo(ValueError):\n    \"\"\"Transição inválida no estado de um livro.\"\"\"\n\nclass Biblioteca:\n    def __init__(self):\n        self._livros = {}\n\n    def cadastrar(self, codigo, titulo):\n        if not isinstance(codigo, str) or not codigo.strip() or not isinstance(titulo, str) or not titulo.strip():\n            raise ValueError(\"Código e título são obrigatórios\")\n        codigo = codigo.strip()\n        if codigo in self._livros:\n            raise ValueError(\"Código duplicado\")\n        self._livros[codigo] = {\"codigo\": codigo, \"titulo\": titulo.strip(), \"emprestado\": False}\n\n    def _obter(self, codigo):\n        return self._livros[codigo]\n\n    def emprestar(self, codigo):\n        livro = self._obter(codigo)\n        if livro[\"emprestado\"]:\n            raise ErroEmprestimo(\"Livro já emprestado\")\n        livro[\"emprestado\"] = True\n\n    def devolver(self, codigo):\n        livro = self._obter(codigo)\n        if not livro[\"emprestado\"]:\n            raise ErroEmprestimo(\"Livro já disponível\")\n        livro[\"emprestado\"] = False\n\n    def catalogo(self):\n        return [dict(livro) for livro in self._livros.values()]\n",
    "explanation": [
      "A instância guarda seu próprio estado; não há coleção global compartilhada entre testes.",
      "Erros distinguem código inexistente de transição proibida. As verificações vêm antes de cada alteração.",
      "catalogo retorna cópias rasas suficientes porque os valores internos são apenas strings e booleanos."
    ],
    "transfer": "Inclua reservar(codigo) e proíba emprestar livro reservado por outra pessoa. Escreva primeiro um teste que falhe, depois adapte a classe sem alterar os testes anteriores.",
    "rubric": "Os testes demonstram regras específicas e isolamento do estado retornado. Não cobrem concorrência, banco de dados nem acesso simultâneo; trate esses pontos em uma integração posterior."
  },
  {
    "kind": "python",
    "format": "py",
    "id": "project-py-integration",
    "module": "py-applied",
    "title": "Cliente de catálogo confiável",
    "level": "Projeto do módulo · integração e testes",
    "goal": "Consumir um catálogo por um transporte injetado, validar a resposta e cobrir sucesso, vazio, HTTP e dados inválidos com testes locais.",
    "prerequisites": "Conclua ambientes, requests e unittest. Os testes obrigatórios usam respostas simuladas e funcionam sem conta ou rede; requests é necessário apenas para a extensão com serviço real.",
    "deliverable": "Salve a função obter_catalogo(buscar) em catalogo.py e cole esse arquivo. Salve test_catalogo.py com o código publicado e execute python -m unittest -v test_catalogo.py. buscar é uma função que devolve um objeto de resposta com raise_for_status() e json().",
    "brief": [
      "Chame buscar uma vez. Em seguida, chame resposta.raise_for_status() antes de resposta.json(). Não silencie exceções de rede, HTTP ou JSON.",
      "O JSON deve ser lista de objetos com id inteiro positivo (bool não vale), único, e titulo texto não vazio. Devolva nova lista de {\"id\", \"titulo\"} com título sem espaços externos, sem alterar objetos de entrada. Lista vazia é sucesso.",
      "Dados inválidos levantam ValueError. Não faça consulta de rede no import. A extensão opcional usa requests.get(url, timeout=5) com serviço público; credenciais e tokens jamais entram no código da interface."
    ],
    "exampleOutput": "Resposta [{\"id\":1,\"titulo\":\" Python \"}] → [{\"id\":1,\"titulo\":\"Python\"}]\nResposta [] → []\nHTTP 503 → exceção propagada, json() não chamado\nID duplicado ou título vazio → ValueError.",
    "testCommand": "python -m unittest -v test_catalogo.py",
    "testsCode": "import unittest\nfrom catalogo import obter_catalogo\n\nclass Resposta:\n    def __init__(self, dados=None, erro=None):\n        self.dados, self.erro, self.leu = dados, erro, False\n    def raise_for_status(self):\n        if self.erro: raise self.erro\n    def json(self):\n        self.leu = True\n        return self.dados\n\nclass CatalogoTests(unittest.TestCase):\n    def test_sucesso_sem_mutacao(self):\n        dados = [{\"id\": 1, \"titulo\": \" Python \", \"extra\": 9}]\n        chamadas = []\n        def buscar():\n            chamadas.append(1)\n            return Resposta(dados)\n        self.assertEqual(obter_catalogo(buscar), [{\"id\": 1, \"titulo\": \"Python\"}])\n        self.assertEqual(dados[0][\"titulo\"], \" Python \")\n        self.assertEqual(len(chamadas), 1)\n\n    def test_vazio(self):\n        self.assertEqual(obter_catalogo(lambda: Resposta([])), [])\n\n    def test_http_antes_de_json(self):\n        resposta = Resposta([], RuntimeError(\"HTTP 503\"))\n        with self.assertRaises(RuntimeError): obter_catalogo(lambda: resposta)\n        self.assertFalse(resposta.leu)\n\n    def test_dados_invalidos(self):\n        for dados in [{}, [{\"id\": True, \"titulo\": \"A\"}], [{\"id\": 1, \"titulo\": \" \"}], [{\"id\": 1, \"titulo\": \"A\"}, {\"id\": 1, \"titulo\": \"B\"}]]:\n            with self.subTest(dados=dados):\n                with self.assertRaises(ValueError): obter_catalogo(lambda: Resposta(dados))\n\n    def test_falha_de_rede(self):\n        def buscar(): raise ConnectionError(\"sem rede\")\n        with self.assertRaises(ConnectionError): obter_catalogo(buscar)\n\nif __name__ == \"__main__\": unittest.main()\n",
    "checks": [
      {
        "id": "success",
        "mode": "manual",
        "label": "Executei sucesso, normalização e ausência de mutação com uma busca por chamada."
      },
      {
        "id": "empty",
        "mode": "manual",
        "label": "Lista vazia retornou sucesso sem erro."
      },
      {
        "id": "http",
        "mode": "manual",
        "label": "Erro HTTP interrompeu antes do parse e foi propagado."
      },
      {
        "id": "invalid",
        "mode": "manual",
        "label": "JSON fora do contrato, ID duplicado e falha de rede foram tratados conforme contrato."
      },
      {
        "id": "newcase",
        "mode": "manual",
        "label": "Escrevi um teste adicional para título com espaços ou resposta lenta e expliquei o resultado."
      }
    ],
    "hints": [
      "Uma função injetada separa a regra de dados do transporte; os testes podem simular resposta sem rede.",
      "Verifique lista antes de iterar, depois cada item e unicidade com set. Rejeite bool usando type(id) is int.",
      "Deixe erros de transporte e parse chegarem ao chamador; uma lista vazia não representa uma falha."
    ],
    "solution": "def obter_catalogo(buscar):\n    if not callable(buscar):\n        raise TypeError(\"buscar deve ser função\")\n    resposta = buscar()\n    resposta.raise_for_status()\n    dados = resposta.json()\n    if not isinstance(dados, list):\n        raise ValueError(\"Catálogo deve ser lista\")\n    vistos = set()\n    resultado = []\n    for item in dados:\n        if (not isinstance(item, dict) or type(item.get(\"id\")) is not int or\n                item[\"id\"] \u003c= 0 or item[\"id\"] in vistos or\n                not isinstance(item.get(\"titulo\"), str) or not item[\"titulo\"].strip()):\n            raise ValueError(\"Item inválido ou duplicado\")\n        vistos.add(item[\"id\"])\n        resultado.append({\"id\": item[\"id\"], \"titulo\": item[\"titulo\"].strip()})\n    return resultado\n\n# Extensão opcional com ambiente virtual e requests instalado:\n# import requests\n# itens = obter_catalogo(lambda: requests.get(\n#     \"https://api.github.com/repos/mdn/content/issues?per_page=5\", timeout=5))\n",
    "explanation": [
      "raise_for_status precede json para que um status de erro não pareça um catálogo válido.",
      "A validação de forma e domínio ocorre em duas etapas; set rejeita IDs repetidos.",
      "O retorno cria novos dicionários e preserva os dados recebidos. Falhas de rede e parse continuam distinguíveis para a camada de interface."
    ],
    "transfer": "Adicione paginação: receba uma sequência de funções buscar e reúna itens sem duplicatas. Defina antes se duplicata entre páginas deve causar erro ou ser ignorada; escreva testes para essa decisão.",
    "rubric": "Os testes locais são verificações reproduzíveis do contrato. Uma API real pode mudar esquema, impor limites e falhar por rede; execute a extensão separadamente. O dashboard não executa Python."
  },
  {
    "id": "project-db-sql",
    "module": "db-foundations",
    "title": "Catálogo de estudos com integridade",
    "kind": "database",
    "format": "text",
    "runtime": "SQLite via Python 3",
    "sourceLabel": "catalogo.sql",
    "level": "Projeto do módulo · dados verificáveis",
    "goal": "Modelar e consultar um catálogo em que a conclusão pertence ao par estudante–lição.",
    "prerequisites": "Conclua as cinco aulas de fundamentos. Instale Python 3; sqlite3 já faz parte da biblioteca padrão. Não é preciso conhecer a implementação do verificador para executá-lo.",
    "deliverable": "Salve catalogo.sql com schema, dados iniciais e view progresso. Salve o verificador da aba Referência como verificar_catalogo.py na mesma pasta; execute python verificar_catalogo.py. Cole o conteúdo SQL na Entrega.",
    "brief": [
      "Crie estudantes(id,nome,email único), licoes(id,titulo,minutos positivos) e conclusoes(estudante_id,licao_id), com chaves obrigatórias e sem duplicar o mesmo par.",
      "Cadastre Ana id 1/email ana@exemplo.test e Beto id 2/email beto@exemplo.test. Lições: 1 SQL 30min; 2 JOIN 45min; 3 Transações 25min. Ana concluiu 1 e 2; Beto nenhuma.",
      "Crie a view progresso com colunas id,nome,concluidas,minutos; inclua estudantes sem conclusões com zeros. Não dependa da ordem natural: consultas de conferência usam ORDER BY id.",
      "Uma referência inexistente, duração zero e conclusão duplicada devem falhar. A execução usa banco novo em memória; não acrescente DROP para apagar bases existentes."
    ],
    "exampleOutput": "id | nome | concluidas | minutos\n1  | Ana  | 2          | 75\n2  | Beto | 0          | 0\nApós tentativa de INSERT seguida de ROLLBACK, o relatório permanece igual.",
    "testCommand": "python verificar_catalogo.py",
    "testsCode": "# Salve como verificar_catalogo.py, ao lado de catalogo.sql.\nfrom pathlib import Path\nimport sqlite3\n\nwith sqlite3.connect(\":memory:\") as db:\n    db.execute(\"PRAGMA foreign_keys=ON\")\n    db.executescript(Path(\"catalogo.sql\").read_text(encoding=\"utf-8\"))\n    esperado = [(1,\"Ana\",2,75),(2,\"Beto\",0,0)]\n    assert db.execute(\"SELECT * FROM progresso ORDER BY id\").fetchall() == esperado\n    for comando in [\n        \"INSERT INTO conclusoes VALUES(1,1)\",\n        \"INSERT INTO conclusoes VALUES(99,1)\",\n        \"INSERT INTO licoes VALUES(4,'Inválida',0)\",\n        \"INSERT INTO licoes VALUES(5,'Inválida','texto')\",\n        \"INSERT INTO estudantes VALUES(3,'Outra','ana@exemplo.test')\"\n    ]:\n        db.execute(\"SAVEPOINT caso\")\n        try:\n            db.execute(comando)\n        except sqlite3.IntegrityError:\n            pass\n        else:\n            raise AssertionError(\"Uma regra obrigatória não foi aplicada: \" + comando)\n        finally:\n            db.execute(\"ROLLBACK TO caso\")\n            db.execute(\"RELEASE caso\")\n    db.commit()\n    db.execute(\"BEGIN\")\n    db.execute(\"INSERT INTO conclusoes VALUES(2,3)\")\n    db.rollback()\n    assert db.execute(\"SELECT * FROM progresso ORDER BY id\").fetchall() == esperado\nprint(\"OK: relatório, unicidade, referências, duração e rollback\")\n",
    "solution": "PRAGMA foreign_keys = ON;\nCREATE TABLE estudantes (\n  id INTEGER PRIMARY KEY,\n  nome TEXT NOT NULL,\n  email TEXT NOT NULL UNIQUE\n);\nCREATE TABLE licoes (\n  id INTEGER PRIMARY KEY,\n  titulo TEXT NOT NULL,\n  minutos INTEGER NOT NULL CHECK (typeof(minutos)='integer' AND minutos > 0)\n);\nCREATE TABLE conclusoes (\n  estudante_id INTEGER NOT NULL REFERENCES estudantes(id),\n  licao_id INTEGER NOT NULL REFERENCES licoes(id),\n  PRIMARY KEY (estudante_id, licao_id)\n);\nINSERT INTO estudantes VALUES (1,'Ana','ana@exemplo.test'),(2,'Beto','beto@exemplo.test');\nINSERT INTO licoes VALUES (1,'SQL',30),(2,'JOIN',45),(3,'Transações',25);\nINSERT INTO conclusoes VALUES (1,1),(1,2);\nCREATE VIEW progresso AS\nSELECT e.id, e.nome, COUNT(c.licao_id) AS concluidas,\n       COALESCE(SUM(l.minutos),0) AS minutos\nFROM estudantes e\nLEFT JOIN conclusoes c ON c.estudante_id = e.id\nLEFT JOIN licoes l ON l.id = c.licao_id\nGROUP BY e.id,e.nome;\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei o verificador até a mensagem OK."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Expliquei por que COUNT(c.licao_id) e LEFT JOIN mantêm Beto com zero."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Provoquei chave estrangeira inválida e duplicação; ambas falharam."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Confirmei que ROLLBACK desfaz a conclusão de Beto."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Recriei tudo em banco vazio e expliquei cada tabela sem copiar a solução."
      }
    ],
    "hints": [
      "Desenhe primeiro as três tabelas e a chave composta.",
      "Ligue estudantes a conclusoes antes de ligar licoes; SUM de ausência precisa de COALESCE.",
      "O PRAGMA vale por conexão: o verificador também o ativa."
    ],
    "explanation": [
      "A tabela de associação guarda fatos da pessoa, evitando marcar a lição globalmente.",
      "COUNT da coluna do lado opcional não conta a linha vazia criada pelo LEFT JOIN.",
      "A view organiza uma consulta reutilizável; os dados permanecem nas tabelas."
    ],
    "transfer": "Acrescente data_conclusao obrigatória. Escreva uma consulta por mês e um teste para mês sem conclusões sem quebrar o relatório existente.",
    "rubric": "Registre evidências reais de execução no ambiente indicado. Os testes publicados verificam um contrato limitado; acrescente casos próprios. A página guarda código e autoavaliação, mas não executa bancos nem confirma resultados externos."
  },
  {
    "id": "project-db-relational",
    "module": "db-relational",
    "title": "Estoque consistente e portabilidade",
    "kind": "database",
    "format": "text",
    "runtime": "PostgreSQL · cliente psql",
    "sourceLabel": "estoque.sql",
    "level": "Projeto do módulo · dados verificáveis",
    "goal": "Registrar uma saída de estoque apenas quando a quantidade estiver disponível, mantendo registro e saldo na mesma transação.",
    "prerequisites": "Revise PostgreSQL e transações e conclua setup-postgresql. O caminho principal usa o laboratório Docker: host 127.0.0.1, porta 55432, usuário aluno e senha local do .env. Crie a base descartável com createdb -h 127.0.0.1 -p 55432 -U aluno laboratorio_estoque. Se usar outra instalação, documente host, porta, usuário e banco sem registrar a senha.",
    "deliverable": "Salve estoque.sql e verificar_estoque.sql. Execute os comandos abaixo em uma base nova pelo cliente psql externo. Cole estoque.sql e mantenha um README com host, porta, banco, usuário, comandos e resultados, sem senha. Dentro da rede Compose, o endereço equivalente é db:5432; ele não deve ser usado pelo cliente instalado no computador.",
    "brief": [
      "Tabelas produtos(id,nome,estoque não negativo) e movimentos(id identity,produto_id FK,quantidade positiva). Dados iniciais: Caderno id 1 estoque 5, Caneta id 2 estoque 0.",
      "Sua entrega registra exatamente uma saída de 2 Cadernos. Use UPDATE condicional e só registre movimento se ele afetar a linha. O resultado é estoque 3 e um movimento de quantidade 2.",
      "Documente as adaptações para MariaDB (AUTO_INCREMENT e estratégia de transação sem esta CTE modificadora), Firebird (identity/RETURNING no cliente apropriado) e SQLite (INTEGER PRIMARY KEY e controle na aplicação). Não copie a sintaxe PostgreSQL para outro motor.",
      "O laboratório não implementa idempotência de pedidos nem auditoria completa. Explique como uma solicitação repetida poderia registrar duas saídas e proponha uma chave de operação única."
    ],
    "exampleOutput": "1 | Caderno | 3\n2 | Caneta | 0\nmovimentos: uma linha, produto_id=1, quantidade=2\nTentativa de retirar 99: nenhuma linha alterada e nenhum novo movimento.",
    "testCommand": "psql -h 127.0.0.1 -p 55432 -U aluno -d laboratorio_estoque -W -v ON_ERROR_STOP=1 -f estoque.sql\npsql -h 127.0.0.1 -p 55432 -U aluno -d laboratorio_estoque -W -v ON_ERROR_STOP=1 -f verificar_estoque.sql",
    "testsCode": "-- Salve verificar_estoque.sql e execute em uma base de laboratório nova.\nDO $$\nBEGIN\n  IF (SELECT estoque FROM produtos WHERE id=1) IS DISTINCT FROM 3 THEN\n    RAISE EXCEPTION 'Estoque esperado: 3';\n  END IF;\n  IF (SELECT count(*) FROM movimentos) \u003c> 1 THEN\n    RAISE EXCEPTION 'Esperado um movimento';\n  END IF;\n  BEGIN\n    INSERT INTO movimentos(produto_id,quantidade) VALUES(99,1);\n    RAISE EXCEPTION 'FK ausente';\n  EXCEPTION WHEN foreign_key_violation THEN NULL;\n  END;\n  BEGIN\n    UPDATE produtos SET estoque=-1 WHERE id=1;\n    RAISE EXCEPTION 'CHECK ausente';\n  EXCEPTION WHEN check_violation THEN NULL;\n  END;\nEND $$;\nBEGIN;\nWITH alterado AS (\n  UPDATE produtos SET estoque=estoque-99\n  WHERE id=1 AND estoque>=99 RETURNING id\n)\nINSERT INTO movimentos(produto_id,quantidade) SELECT id,99 FROM alterado;\nDO $$ BEGIN\n  IF (SELECT count(*) FROM movimentos) \u003c> 1 THEN RAISE EXCEPTION 'Venda sem estoque'; END IF;\nEND $$;\nROLLBACK;\nSELECT id,nome,estoque FROM produtos ORDER BY id;\nSELECT 'OK: estoque e integridade' AS resultado;\n",
    "solution": "CREATE TABLE produtos (\n  id integer PRIMARY KEY,\n  nome text NOT NULL,\n  estoque integer NOT NULL CHECK (estoque >= 0)\n);\nCREATE TABLE movimentos (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  produto_id integer NOT NULL REFERENCES produtos(id),\n  quantidade integer NOT NULL CHECK (quantidade > 0)\n);\nINSERT INTO produtos VALUES(1,'Caderno',5),(2,'Caneta',0);\nBEGIN;\nWITH alterado AS (\n  UPDATE produtos SET estoque=estoque-2\n  WHERE id=1 AND estoque>=2 RETURNING id\n)\nINSERT INTO movimentos(produto_id,quantidade) SELECT id,2 FROM alterado;\nCOMMIT;\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei os arquivos numa base PostgreSQL nova e obtive OK."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Testei falta de estoque sem criar movimento."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Verifiquei FK e CHECK, distinguindo erro SQL de falha de conexão."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Documentei três diferenças ao portar para MariaDB, Firebird e SQLite."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Expliquei limites de concorrência, repetição de pedido e transação."
      }
    ],
    "hints": [
      "Valide estrutura primeiro, depois a alteração atômica de uma linha.",
      "A CTE devolve apenas as linhas realmente alteradas; o INSERT a consome.",
      "O teste usa blocos DO e exceções específicas PostgreSQL, não SQL portátil."
    ],
    "explanation": [
      "O filtro estoque>=2 evita saldo negativo na própria operação.",
      "UPDATE e INSERT estão na mesma transação; um erro no registro impede confirmação parcial.",
      "A verificação de uma solicitação repetida exige outro requisito, normalmente uma chave única de operação."
    ],
    "transfer": "Adicione operacao_id único em movimentos. Defina e teste o que ocorre ao repetir a mesma operação sem debitar duas vezes.",
    "rubric": "Registre evidências reais de execução no ambiente indicado. Os testes publicados verificam um contrato limitado; acrescente casos próprios. A página guarda código e autoavaliação, mas não executa bancos nem confirma resultados externos."
  },
  {
    "id": "project-db-mongo",
    "module": "db-nosql",
    "title": "Sessões de estudo em documentos",
    "kind": "database",
    "format": "text",
    "runtime": "MongoDB Community · mongosh",
    "sourceLabel": "catalogo.js (mongosh)",
    "level": "Projeto do módulo · dados verificáveis",
    "goal": "Modelar documentos e produzir um resumo com pipeline, validação e índice coerentes com as consultas.",
    "prerequisites": "Conclua o módulo NoSQL. Tenha MongoDB Community local e mongosh instalados. Use o banco novo th_catalogo_lab; caso já exista, escolha outro nome nos dois arquivos em vez de apagá-lo.",
    "deliverable": "Salve catalogo.js e verificar_catalogo.js. Use sua conexão local; em servidor com autenticação, forneça usuário e authSource conforme a configuração e digite a senha no prompt. Cole o primeiro arquivo na Entrega.",
    "brief": [
      "Crie sessoes com aluno texto não vazio, minutos BSON int positivo e concluida booleano obrigatórios. Defina validação antes dos inserts.",
      "Dados: id 1 Ana 30 concluída; id 2 Ana 20 pendente; id 3 Beto 45 concluída. Use NumberInt explicitamente para respeitar o contrato BSON.",
      "Agrupe apenas sessões concluídas por aluno, somando minutos e contando sessões. Ordene por aluno para uma comparação determinística.",
      "Crie índice {aluno:1,concluida:1}. Explique por que atende filtro por aluno e status, mas não garante acelerar o pipeline que começa somente pelo status. Observe explain sem prometer ganho com três documentos."
    ],
    "exampleOutput": "Ana: minutos 30, sessões 1\nBeto: minutos 45, sessões 1\nInserir minutos 0: erro de validação (código 121).\nA existência do índice não prova melhora de desempenho.",
    "testCommand": "mongosh \"mongodb://127.0.0.1:27017\" --file catalogo.js\nmongosh \"mongodb://127.0.0.1:27017\" --file verificar_catalogo.js",
    "testsCode": "// Salve verificar_catalogo.js; rode depois da implementação.\nconst lab = db.getSiblingDB(\"th_catalogo_lab\");\nfunction conferir(condicao,mensagem){if(!condicao)throw new Error(mensagem);}\nconst resultado=lab.sessoes.aggregate([\n  {$match:{concluida:true}},\n  {$group:{_id:\"$aluno\",minutos:{$sum:\"$minutos\"},sessoes:{$sum:1}}},\n  {$sort:{_id:1}}\n]).toArray();\nconferir(resultado.length===2,\"Dois alunos esperados\");\nconferir(resultado[0]._id===\"Ana\" && Number(resultado[0].minutos)===30,\"Resumo Ana\");\nconferir(resultado[1]._id===\"Beto\" && Number(resultado[1].minutos)===45,\"Resumo Beto\");\nlet rejeitado=false;\ntry{lab.sessoes.insertOne({_id:99,aluno:\"Teste\",minutos:NumberInt(0),concluida:true});}\ncatch(erro){if(erro.code!==121)throw erro;rejeitado=true;}\nconferir(rejeitado,\"Validador deveria rejeitar duração zero\");\nconferir(lab.sessoes.countDocuments({})===3,\"Esperados apenas três documentos\");\nconferir(lab.sessoes.getIndexes().some(i=>i.key.aluno===1 && i.key.concluida===1),\"Índice composto ausente\");\nprint(\"OK: resumo, validação e índice\");\n",
    "solution": "// Salve catalogo.js; execute em banco novo th_catalogo_lab.\nconst lab = db.getSiblingDB(\"th_catalogo_lab\");\nlab.createCollection(\"sessoes\", {validator: {$jsonSchema: {\n  bsonType:\"object\", required:[\"aluno\",\"minutos\",\"concluida\"],\n  properties:{aluno:{bsonType:\"string\",minLength:1},minutos:{bsonType:\"int\",minimum:1},concluida:{bsonType:\"bool\"}}\n}}});\nlab.sessoes.createIndex({aluno:1,concluida:1});\nlab.sessoes.insertMany([\n  {_id:1,aluno:\"Ana\",minutos:NumberInt(30),concluida:true},\n  {_id:2,aluno:\"Ana\",minutos:NumberInt(20),concluida:false},\n  {_id:3,aluno:\"Beto\",minutos:NumberInt(45),concluida:true}\n]);\nprintjson(lab.sessoes.aggregate([\n  {$match:{concluida:true}},\n  {$group:{_id:\"$aluno\",minutos:{$sum:\"$minutos\"},sessoes:{$sum:1}}},\n  {$sort:{_id:1}}\n]).toArray());\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei o pipeline e comparei Ana 30/Beto 45."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Confirmei rejeição de minutos zero pelo validador."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Expliquei o tipo BSON e a necessidade de NumberInt neste contrato."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Conferi o índice e analisei uma consulta por aluno/status com explain."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Justifiquei quando incorporar documentos e quando usar referências."
      }
    ],
    "hints": [
      "Crie a coleção vazia com validador antes de inserir.",
      "Filtre antes de agrupar; use $sum:1 para contar.",
      "Não use dropDatabase para tornar o script repetível: escolha uma base de laboratório nova."
    ],
    "explanation": [
      "Validação ajuda a manter contratos mesmo sem tabelas relacionais.",
      "O pipeline trabalha com documentos e a ordenação final estabiliza a saída.",
      "O índice foi desenhado para uma consulta específica; ele não é uma solução universal."
    ],
    "transfer": "Acrescente data da sessão e filtre um intervalo. Inclua testes de início e fim do intervalo e revise o índice para a consulta real.",
    "rubric": "Registre evidências reais de execução no ambiente indicado. Os testes publicados verificam um contrato limitado; acrescente casos próprios. A página guarda código e autoavaliação, mas não executa bancos nem confirma resultados externos."
  },
  {
    "id": "project-db-recovery",
    "module": "db-engineering",
    "title": "Recuperação comprovada de um banco",
    "kind": "database",
    "format": "text",
    "runtime": "SQLite via Python 3",
    "sourceLabel": "recuperacao.py",
    "level": "Projeto do módulo · dados verificáveis",
    "goal": "Construir e verificar uma cópia recuperável de um banco, com proteção contra sobrescrita e um roteiro operacional.",
    "prerequisites": "Revise arquivos/funções Python, SQLite e recuperação. Use apenas dados fictícios em pasta de laboratório. O teste cria e remove exclusivamente a pasta temporária que ele próprio criou.",
    "deliverable": "Implemente criar_copia(origem,destino) em recuperacao.py e salve o teste como verificar_recuperacao.py. Entregue também README com RPO, RTO, frequência, retenção e resultado do ensaio. Cole o arquivo Python no rascunho.",
    "brief": [
      "Abra origem existente somente para leitura; destino deve ser novo e diferente. Use Connection.backup, feche conexões e valide integrity_check.",
      "Crie a cópia, altere a origem e restaure a cópia para um terceiro arquivo. Compare registros e integridade no restaurado, sem substituir a origem.",
      "No README, diferencie integridade física de validade de negócio. Defina RPO como perda tolerável de dados e RTO como tempo tolerável para recuperar; anote o tempo observado, sem prometer disponibilidade.",
      "Descreva acesso mínimo, localização de uma cópia independente e teste periódico. Esta função didática não implementa agendamento, criptografia, retenção, concorrência de criação do destino ou recuperação de falha de disco."
    ],
    "exampleOutput": "Origem após mudança: (1, \"Depois\")\nRestaurado: (1, \"Revisão SQL\")\nPRAGMA integrity_check: ok\nDestino já existente: ValueError\nOrigem ausente: FileNotFoundError",
    "testCommand": "python verificar_recuperacao.py",
    "testsCode": "# Salve verificar_recuperacao.py ao lado de recuperacao.py.\nfrom pathlib import Path\nfrom tempfile import TemporaryDirectory\nimport sqlite3\nfrom recuperacao import criar_copia\n\nwith TemporaryDirectory() as pasta:\n    base=Path(pasta)/\"origem.db\"\n    backup=Path(pasta)/\"copia.db\"\n    restaurada=Path(pasta)/\"restaurada.db\"\n    con=sqlite3.connect(base)\n    con.execute(\"CREATE TABLE notas(id INTEGER PRIMARY KEY, texto TEXT NOT NULL)\")\n    con.execute(\"INSERT INTO notas VALUES(1,?)\",(\"Revisão SQL\",))\n    con.commit(); con.close()\n    criar_copia(base,backup)\n    # Uma alteração posterior na origem não deve alterar a cópia.\n    con=sqlite3.connect(base); con.execute(\"UPDATE notas SET texto='Depois' WHERE id=1\")\n    con.commit(); con.close()\n    criar_copia(backup,restaurada)\n    con=sqlite3.connect(restaurada)\n    assert con.execute(\"SELECT * FROM notas\").fetchall()==[(1,\"Revisão SQL\")]\n    assert con.execute(\"PRAGMA integrity_check\").fetchone()==(\"ok\",)\n    con.close()\n    for destino in (base,backup):\n        try: criar_copia(base,destino)\n        except ValueError: pass\n        else: raise AssertionError(\"Destino existente deveria ser recusado\")\n    try: criar_copia(Path(pasta)/\"ausente.db\",Path(pasta)/\"nova.db\")\n    except FileNotFoundError: pass\n    else: raise AssertionError(\"Origem ausente deveria ser recusada\")\nprint(\"OK: backup, restauração, integridade e proteção do destino\")\n",
    "solution": "from pathlib import Path\nimport sqlite3\n\ndef criar_copia(origem, destino):\n    origem, destino = Path(origem), Path(destino)\n    if not origem.is_file():\n        raise FileNotFoundError(origem)\n    if origem.resolve() == destino.resolve() or destino.exists():\n        raise ValueError(\"Escolha um destino novo, diferente da origem\")\n    fonte = sqlite3.connect(origem.resolve().as_uri() + \"?mode=ro\", uri=True)\n    copia = sqlite3.connect(destino)\n    try:\n        fonte.backup(copia)\n        if copia.execute(\"PRAGMA integrity_check\").fetchone()[0] != \"ok\":\n            raise ValueError(\"Falha na integridade da cópia\")\n    finally:\n        copia.close()\n        fonte.close()\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei restauração em terceiro arquivo e comparei registros."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Confirmei integridade no banco restaurado."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Testei origem ausente e destino existente sem sobrescrever dados."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Registrei tempo observado e valores justificados de RPO/RTO no README."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Expliquei onde manter cópia independente e como restringir acesso."
      }
    ],
    "hints": [
      "Uma cópia que nunca foi restaurada ainda não é evidência de recuperação.",
      "Connection.backup usa a API de backup SQLite; copiar arquivo ativo arbitrariamente não é equivalente.",
      "Valide a estrutura e uma consulta importante para o negócio."
    ],
    "explanation": [
      "O modo somente leitura evita criar silenciosamente uma origem ausente.",
      "O terceiro arquivo permite testar recuperação sem destruir o banco atual.",
      "A cópia reflete o instante do backup; alterações posteriores não aparecem nela."
    ],
    "transfer": "Acrescente uma tabela de matrículas e valide referências na restauração. Registre versão do schema e proponha uma política de retenção que preserve pelo menos uma cópia testada.",
    "rubric": "Registre evidências reais de execução no ambiente indicado. Os testes publicados verificam um contrato limitado; acrescente casos próprios. A página guarda código e autoavaliação, mas não executa bancos nem confirma resultados externos."
  },
  {
    "id": "project-db-docker",
    "module": "db-local",
    "title": "Laboratório local reproduzível",
    "kind": "database",
    "format": "text",
    "runtime": "Docker Engine/Desktop + plugin Compose · PostgreSQL 17",
    "sourceLabel": "compose.yaml",
    "level": "Projeto do módulo · dados verificáveis",
    "goal": "Subir um PostgreSQL local, demonstrar persistência e restaurar um backup em uma base separada.",
    "prerequisites": "Conclua as três aulas de Docker. Instale Docker Desktop (Windows/macOS) ou Engine com Compose plugin (Linux), inicie o serviço e confirme docker version e docker compose version. Use uma pasta nova e dados fictícios.",
    "deliverable": "Entregue compose.yaml, .gitignore, .env.example sem senha real e README com comandos/resultados. O .env real permanece local. Cole apenas compose.yaml na Entrega; execute o roteiro na pasta do projeto.",
    "brief": [
      "Use serviço db, imagem postgres:17, usuário aluno, base estudos, porta do host 55432 ligada apenas a 127.0.0.1 e porta interna 5432. Use volume nomeado dados em /var/lib/postgresql/data.",
      "Defina healthcheck pg_isready. Uma imagem fornece os arquivos do software; container executa o serviço; volume mantém os dados ao recriar o container. O healthcheck indica disponibilidade básica, não valida consultas da aplicação.",
      "Crie .env com POSTGRES_PASSWORD e inclua .env no .gitignore. O usuário de inicialização possui privilégios amplos neste laboratório; uma aplicação real deve usar conta própria com privilégios mínimos.",
      "Crie o marcador, execute down sem -v, suba novamente e consulte. Faça pg_dump, copie o arquivo para o host e restaure em estudos_restaurado. Confirme o marcador e registre evidências no README.",
      "Não execute down -v durante o teste de persistência: ele remove volumes declarados e seus dados. Mudar POSTGRES_PASSWORD no .env não troca a senha de um cluster já inicializado. O layout da imagem PostgreSQL 18+ difere; este laboratório fixa a major 17."
    ],
    "exampleOutput": "docker compose ps: serviço db healthy e porta 127.0.0.1:55432->5432\nApós down/up: marcador contém 1 | persistiu\nBanco estudos_restaurado: marcador contém 1 | persistiu\nArquivo estudos.dump também está na pasta do computador.",
    "testCommand": "docker compose config --quiet\ndocker compose up -d\ndocker compose ps",
    "testsCode": "# 1. Na pasta do compose.yaml, crie .env com uma senha local escolhida por você:\n# POSTGRES_PASSWORD=sua_senha_local\n# .gitignore deve conter .env e *.dump\ndocker compose config --quiet\ndocker compose up -d\ndocker compose ps\n# Espere o serviço db indicar healthy; se falhar, examine logs.\ndocker compose exec db psql -U aluno -d estudos -v ON_ERROR_STOP=1 -c \"CREATE TABLE IF NOT EXISTS marcador(id integer PRIMARY KEY, texto text NOT NULL); INSERT INTO marcador VALUES(1,'persistiu') ON CONFLICT(id) DO UPDATE SET texto=EXCLUDED.texto;\"\ndocker compose down\ndocker compose up -d\n# Espere healthy novamente antes da próxima consulta.\ndocker compose exec db psql -U aluno -d estudos -c \"SELECT * FROM marcador;\"\n# Backup em formato custom dentro do container; copie para o computador.\ndocker compose exec db pg_dump -U aluno -d estudos -Fc -f /tmp/estudos.dump\ndocker compose cp db:/tmp/estudos.dump ./estudos.dump\n# Banco restaurado novo (se já existir, escolha outro nome).\ndocker compose exec db createdb -U aluno estudos_restaurado\ndocker compose cp ./estudos.dump db:/tmp/restaurar.dump\ndocker compose exec db pg_restore -U aluno -d estudos_restaurado --exit-on-error /tmp/restaurar.dump\ndocker compose exec db psql -U aluno -d estudos_restaurado -c \"SELECT * FROM marcador;\"\n# Para parar preservando volume:\ndocker compose down\n",
    "solution": "# compose.yaml — PostgreSQL 17; não troque a major sem plano de migração.\nname: techhub-dados-lab\nservices:\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_USER: aluno\n      POSTGRES_DB: estudos\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Defina POSTGRES_PASSWORD no arquivo .env}\n    ports:\n      - \"127.0.0.1:55432:5432\"\n    volumes:\n      - dados:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U aluno -d estudos\"]\n      interval: 5s\n      timeout: 5s\n      retries: 10\nvolumes:\n  dados:\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Validei Compose e observei db healthy; anotei imagem e versão."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Conectei no cliente usando host 127.0.0.1, porta 55432, banco estudos e usuário aluno."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Comprovei que o marcador sobreviveu ao down/up sem -v."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Copiei o dump para o host e consultei o marcador na base restaurada."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Entreguei README e .env.example sem credenciais reais; expliquei limites do ambiente local."
      }
    ],
    "hints": [
      "Execute cada comando na pasta do compose.yaml e aguarde o healthcheck.",
      "Uma aplicação no computador usa localhost:55432; outro serviço na rede Compose usa db:5432.",
      "Se 55432 estiver ocupada, altere só a porta do host e documente o novo valor. Não apague volumes para resolver conflito de porta."
    ],
    "explanation": [
      "Loopback limita a publicação da porta ao próprio computador.",
      "O volume separa ciclo de vida dos dados do ciclo do container.",
      "A cópia no host permite preservar o dump fora do container, mas deve ter política de proteção e cópia independente para ser uma estratégia de backup."
    ],
    "transfer": "Acrescente um segundo ambiente com nome de projeto, porta e volume distintos. Comprove que alterar o marcador de um ambiente não altera o outro, sem remover os volumes existentes.",
    "rubric": "Registre evidências reais de execução no ambiente indicado. Os testes publicados verificam um contrato limitado; acrescente casos próprios. A página guarda código e autoavaliação, mas não executa bancos nem confirma resultados externos."
  },
  {
    "id": "project-ai-contract",
    "module": "ai-basic",
    "title": "Triagem com contrato verificável",
    "kind": "ai",
    "format": "py",
    "runtime": "Python 3 · biblioteca padrão · sem API paga",
    "sourceLabel": "triagem.py",
    "sourceFile": "triagem.py",
    "testFile": "test_triagem.py",
    "level": "Projeto do módulo · engenharia aplicada",
    "goal": "Escrever um prompt de triagem e validar mecanicamente a estrutura de uma resposta antes de usá-la.",
    "prerequisites": "Conclua os fundamentos de IA. Para implementar, revise funções, JSON e exceções em Python. A saída do modelo será representada por textos JSON de teste; nenhum LLM é chamado.",
    "deliverable": "Salve sua implementação em triagem.py e os testes da aba Referência em test_triagem.py, na mesma pasta. Execute python -m unittest -v test_triagem.py. Cole somente sua implementação na Entrega. Inclua README com resultados, limitações e o que seria necessário para conectar um modelo real.",
    "brief": [
      "Escreva um prompt com tarefa, categorias, exemplos e regra de não inventar dados. Categorias permitidas: duvida, erro, sugestao. Prioridade inteira de 1 a 3; resumo com 1 a 120 caracteres após strip.",
      "Implemente validar_saida(texto): aceite somente JSON objeto com exatamente categoria, prioridade e resumo. Rejeite bool como prioridade, campos extras, campos ausentes e JSON inválido com ValueError. Retorne um novo dicionário com resumo aparado.",
      "No README, apresente três mensagens fictícias e a resposta desejada. Explique a diferença entre JSON bem formado, contrato válido e classificação semanticamente correta. O validador não deve fingir conferir verdade ou adequação da prioridade.",
      "Compare um prompt sem exemplo e outro com few-shot usando os mesmos casos. Sem modelo real, faça análise manual e registre que ela não é uma medição empírica de desempenho de LLM."
    ],
    "exampleOutput": "JSON válido → dicionário com resumo sem espaços nas pontas.\nPrioridade true, categoria fora da lista ou campo extra → ValueError.\nUma resposta estruturalmente válida ainda pode classificar a mensagem incorretamente.",
    "testCommand": "python -m unittest -v test_triagem.py",
    "testsCode": "import json\nimport unittest\nfrom triagem import validar_saida\n\nclass ContratoTests(unittest.TestCase):\n    def test_valido(self):\n        self.assertEqual(validar_saida('{\"categoria\":\"duvida\",\"prioridade\":2,\"resumo\":\" Como entrar? \"}'),\n                         {\"categoria\":\"duvida\",\"prioridade\":2,\"resumo\":\"Como entrar?\"})\n    def test_json_e_campos(self):\n        for texto in ['{quebrado','[]','{}','{\"categoria\":\"erro\",\"prioridade\":1,\"resumo\":\"x\",\"extra\":0}']:\n            with self.subTest(texto=texto),self.assertRaises(ValueError): validar_saida(texto)\n    def test_tipos_e_limites(self):\n        base={\"categoria\":\"erro\",\"prioridade\":1,\"resumo\":\"Falha ao entrar\"}\n        for campo,valor in [(\"prioridade\",True),(\"prioridade\",0),(\"prioridade\",4),(\"categoria\",[]),(\"categoria\",\"outro\"),(\"resumo\",\" \"),(\"resumo\",\"x\"*121)]:\n            with self.subTest(campo=campo,valor=valor),self.assertRaises(ValueError):\n                validar_saida(json.dumps({**base,campo:valor}))\n",
    "solution": "import json\n\ndef validar_saida(texto):\n    try:\n        dado=json.loads(texto)\n    except (json.JSONDecodeError, TypeError) as erro:\n        raise ValueError(\"JSON inválido\") from erro\n    if not isinstance(dado,dict) or set(dado)!={\"categoria\",\"prioridade\",\"resumo\"}:\n        raise ValueError(\"Campos inválidos\")\n    if not isinstance(dado[\"categoria\"],str) or dado[\"categoria\"] not in {\"duvida\",\"erro\",\"sugestao\"}:\n        raise ValueError(\"Categoria inválida\")\n    if type(dado[\"prioridade\"]) is not int or not 1\u003c=dado[\"prioridade\"]\u003c=3:\n        raise ValueError(\"Prioridade inválida\")\n    resumo=dado[\"resumo\"]\n    if not isinstance(resumo,str) or not 1\u003c=len(resumo.strip())\u003c=120:\n        raise ValueError(\"Resumo inválido\")\n    return {\"categoria\":dado[\"categoria\"],\"prioridade\":dado[\"prioridade\"],\"resumo\":resumo.strip()}\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei os três testes e acrescentei um caso próprio."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Meu prompt contém tarefa, limites e exemplos coerentes."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Diferenciei validade estrutural de correção semântica."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Expliquei por que prioridade true deve ser recusada."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Documentei que a prática usa respostas simuladas, sem medição de LLM real."
      }
    ],
    "hints": [
      "Comece pelo parser, depois confira os campos, tipos e limites.",
      "Em Python, bool é subtipo de int; type(valor) is int exclui esse caso.",
      "Não use eval para interpretar a resposta."
    ],
    "explanation": [
      "A validação transforma uma resposta externa em um contrato explícito.",
      "O conjunto exato de campos evita aceitar parâmetros que a aplicação não esperava.",
      "Asserções determinísticas são úteis para estrutura; a intenção da mensagem exige avaliação separada."
    ],
    "transfer": "Acrescente a categoria acesso e quatro casos de teste. Atualize prompt, contrato e revisão sem alterar resultados esperados dos casos anteriores.",
    "rubric": "Os testes verificam contratos do software com entradas controladas. Não medem a qualidade de um modelo real nem certificam segurança. Execute os testes localmente, interprete falhas e registre evidências; a página salva sua autoavaliação e não executa Python ou APIs."
  },
  {
    "id": "project-ai-retrieval",
    "module": "ai-data",
    "title": "Busca de evidências com controle de acesso",
    "kind": "ai",
    "format": "py",
    "runtime": "Python 3 · biblioteca padrão · sem API paga",
    "sourceLabel": "recuperacao_ia.py",
    "sourceFile": "recuperacao_ia.py",
    "testFile": "test_recuperacao_ia.py",
    "level": "Projeto do módulo · engenharia aplicada",
    "goal": "Construir uma busca lexical transparente que devolve somente documentos autorizados e permite testar a etapa de recuperação antes de gerar respostas.",
    "prerequisites": "Revise conjuntos, listas e ordenação em Python. Este projeto é uma baseline lexical; não usa embeddings aprendidos nem representa um sistema RAG completo.",
    "deliverable": "Salve sua implementação em recuperacao_ia.py e os testes da aba Referência em test_recuperacao_ia.py, na mesma pasta. Execute python -m unittest -v test_recuperacao_ia.py. Cole somente sua implementação na Entrega. Inclua README com resultados, limitações e o que seria necessário para conectar um modelo real.",
    "brief": [
      "Implemente recuperar(pergunta, documentos, usuario, k=2). Cada documento tem id único, texto e usuarios autorizados. k deve ser inteiro positivo, excluindo bool. A busca compara palavras em minúsculas usando conjuntos; score é o número de termos distintos em comum.",
      "Filtre permissão antes de pontuar. Ignore score zero, ordene por score decrescente e depois id crescente; retorne no máximo k itens no formato {id,texto,score}. Não altere os documentos recebidos.",
      "Pergunta sem termos úteis ou sem correspondência deve retornar lista vazia, não um trecho aleatório. Os testes usam dados válidos; em uma aplicação real, valide o contrato do corpus durante ingestão e mantenha versão, origem e permissões.",
      "No README, desenhe ingestão → índice → recuperação → contexto → geração → validação. Explique como uma busca por embeddings poderia melhorar sinônimos, sem afirmar que similaridade prova verdade."
    ],
    "exampleOutput": "Pergunta SQL consultas, usuária ana → IDs a (score 2), b (score 1).\nDocumento secreto nunca aparece para ana.\nSem correspondência → []. Esta busca não entende sinônimos.",
    "testCommand": "python -m unittest -v test_recuperacao_ia.py",
    "testsCode": "import copy\nimport unittest\nfrom recuperacao_ia import recuperar\n\nclass BuscaTests(unittest.TestCase):\n    def setUp(self):\n        self.docs=[{\"id\":\"b\",\"texto\":\"SQL e transações\",\"usuarios\":[\"ana\"]},\n                   {\"id\":\"a\",\"texto\":\"SQL consultas\",\"usuarios\":[\"ana\"]},\n                   {\"id\":\"secreto\",\"texto\":\"SQL consultas transações\",\"usuarios\":[\"admin\"]}]\n    def test_ranking_e_desempate(self):\n        self.assertEqual([d[\"id\"] for d in recuperar(\"SQL consultas\",self.docs,\"ana\")],[\"a\",\"b\"])\n        self.assertEqual([d[\"id\"] for d in recuperar(\"SQL\",self.docs,\"ana\")],[\"a\",\"b\"])\n    def test_permissao_e_ausencia(self):\n        self.assertEqual(recuperar(\"SQL\",self.docs,\"visitante\"),[])\n        self.assertEqual(recuperar(\"jardinagem\",self.docs,\"ana\"),[])\n        self.assertEqual(recuperar(\"\",self.docs,\"ana\"),[])\n    def test_limite_e_nao_mutacao(self):\n        antes=copy.deepcopy(self.docs)\n        self.assertEqual(len(recuperar(\"SQL\",self.docs,\"ana\",1)),1)\n        self.assertEqual(self.docs,antes)\n        for k in [0,-1,True]:\n            with self.assertRaises(ValueError):recuperar(\"SQL\",self.docs,\"ana\",k)\n",
    "solution": "import re\n\ndef termos(texto):\n    return set(re.findall(r\"\\w+\",texto.lower()))\n\ndef recuperar(pergunta,documentos,usuario,k=2):\n    if type(k) is not int or k\u003c1:\n        raise ValueError(\"k deve ser inteiro positivo\")\n    consulta=termos(pergunta)\n    candidatos=[]\n    for documento in documentos:\n        if usuario not in documento[\"usuarios\"]:\n            continue\n        score=len(consulta & termos(documento[\"texto\"]))\n        if score:\n            candidatos.append({\"id\":documento[\"id\"],\"texto\":documento[\"texto\"],\"score\":score})\n    return sorted(candidatos,key=lambda item:(-item[\"score\"],item[\"id\"]))[:k]\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei os testes de ranking, acesso e ausência."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Confirmei que documento não autorizado não entra no contexto."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Expliquei o limite da busca por palavras frente à semântica."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Acrescentei uma pergunta cuja busca falha por usar sinônimo."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Registrei metadados necessários para atualizar e rastrear a fonte."
      }
    ],
    "hints": [
      "Use interseção de conjuntos para contar termos distintos.",
      "Um desempate explícito torna o resultado reproduzível.",
      "A permissão vem da aplicação; não peça ao modelo para decidir se pode revelar o documento."
    ],
    "explanation": [
      "Recuperação pode ser avaliada separadamente da geração.",
      "O filtro de acesso ocorre antes de formar o contexto.",
      "A baseline é simples para que erros de ranking sejam inspecionáveis; embeddings exigem nova avaliação."
    ],
    "transfer": "Acrescente versão e título dos documentos à saída. Crie um conjunto de cinco perguntas com IDs relevantes e calcule recall@k sem usar as mesmas perguntas para ajustar e avaliar o método.",
    "rubric": "Os testes verificam contratos do software com entradas controladas. Não medem a qualidade de um modelo real nem certificam segurança. Execute os testes localmente, interprete falhas e registre evidências; a página salva sua autoavaliação e não executa Python ou APIs."
  },
  {
    "id": "project-ai-tools",
    "module": "ai-practical",
    "title": "Executor de ferramentas com limites",
    "kind": "ai",
    "format": "py",
    "runtime": "Python 3 · biblioteca padrão · sem API paga",
    "sourceLabel": "ferramentas.py",
    "sourceFile": "ferramentas.py",
    "testFile": "test_ferramentas.py",
    "level": "Projeto do módulo · engenharia aplicada",
    "goal": "Separar uma sugestão de chamada do modelo da decisão da aplicação de validar, autorizar e executar uma ação.",
    "prerequisites": "Revise exceções e dicionários Python. As ferramentas deste laboratório só leem um catálogo fictício e registram pedidos em memória; não enviam mensagens nem alteram sistemas externos.",
    "deliverable": "Salve sua implementação em ferramentas.py e os testes da aba Referência em test_ferramentas.py, na mesma pasta. Execute python -m unittest -v test_ferramentas.py. Cole somente sua implementação na Entrega. Inclua README com resultados, limitações e o que seria necessário para conectar um modelo real.",
    "brief": [
      "Implemente executar(chamada, usuario, aprovado, registros). Aceite apenas nome consultar ou reservar. consultar exige args exatamente {item}; reservar exige {item,operacao_id}. item deve existir no catálogo {sql:30, python:45}. Valores textuais obrigatórios não podem ser vazios.",
      "consultar retorna {item,minutos}. reservar exige aprovado is True, caso contrário PermissionError. A aprovação é fornecida pela aplicação, nunca por um campo inventado nos argumentos da chamada.",
      "A chave de idempotência é o par (usuario,operacao_id). Repetição do mesmo item retorna cópia do registro anterior sem duplicar. Reutilizar a mesma chave para outro item gera ValueError. Retorne {usuario,item,operacao_id}.",
      "Ferramenta desconhecida, campo extra, item inválido ou argumento malformado deve gerar ValueError. Não use execução dinâmica. O usuário representa identidade autenticada da aplicação; este laboratório não implementa login."
    ],
    "exampleOutput": "consultar sql → {item: sql, minutos: 30}.\nreservar sem aprovação → PermissionError, registros vazios.\nMesma operação aprovada duas vezes → um registro.\nFerramenta shell ou argumento extra → ValueError.",
    "testCommand": "python -m unittest -v test_ferramentas.py",
    "testsCode": "import unittest\nfrom ferramentas import executar\n\nclass ToolsTests(unittest.TestCase):\n    def setUp(self):self.registros={}\n    def chamada(self,item=\"sql\",op=\"op1\"):return {\"nome\":\"reservar\",\"args\":{\"item\":item,\"operacao_id\":op}}\n    def test_leitura(self):\n        self.assertEqual(executar({\"nome\":\"consultar\",\"args\":{\"item\":\"sql\"}},\"ana\",False,self.registros),{\"item\":\"sql\",\"minutos\":30})\n        self.assertEqual(self.registros,{})\n    def test_aprovacao(self):\n        with self.assertRaises(PermissionError):executar(self.chamada(),\"ana\",False,self.registros)\n        self.assertEqual(self.registros,{})\n    def test_idempotencia(self):\n        primeiro=executar(self.chamada(),\"ana\",True,self.registros)\n        self.assertEqual(executar(self.chamada(),\"ana\",True,self.registros),primeiro)\n        self.assertEqual(len(self.registros),1)\n        with self.assertRaises(ValueError):executar(self.chamada(\"python\"),\"ana\",True,self.registros)\n        primeiro[\"item\"]=\"alterado\"\n        self.assertEqual(self.registros[(\"ana\",\"op1\")][\"item\"],\"sql\")\n    def test_allowlist(self):\n        for chamada in [{\"nome\":\"shell\",\"args\":{}},{\"nome\":\"consultar\",\"args\":{\"item\":\"sql\",\"aprovado\":True}}]:\n            with self.assertRaises(ValueError):executar(chamada,\"ana\",True,self.registros)\n",
    "solution": "CATALOGO={\"sql\":30,\"python\":45}\n\ndef executar(chamada,usuario,aprovado,registros):\n    if not isinstance(usuario,str) or not usuario.strip(): raise ValueError(\"Usuário inválido\")\n    if not isinstance(chamada,dict) or set(chamada)!={\"nome\",\"args\"}: raise ValueError(\"Chamada inválida\")\n    nome,args=chamada[\"nome\"],chamada[\"args\"]\n    if nome not in (\"consultar\",\"reservar\") or not isinstance(args,dict): raise ValueError(\"Ferramenta inválida\")\n    campos={\"item\"} if nome==\"consultar\" else {\"item\",\"operacao_id\"}\n    if set(args)!=campos: raise ValueError(\"Argumentos inesperados\")\n    item=args[\"item\"]\n    if not isinstance(item,str) or item not in CATALOGO: raise ValueError(\"Item inválido\")\n    if nome==\"consultar\": return {\"item\":item,\"minutos\":CATALOGO[item]}\n    operacao=args[\"operacao_id\"]\n    if not isinstance(operacao,str) or not operacao.strip(): raise ValueError(\"Operação inválida\")\n    if aprovado is not True: raise PermissionError(\"Aprovação necessária\")\n    chave=(usuario,operacao)\n    if chave in registros:\n        if registros[chave][\"item\"]!=item: raise ValueError(\"Conflito de idempotência\")\n        return dict(registros[chave])\n    registro={\"usuario\":usuario,\"item\":item,\"operacao_id\":operacao}\n    registros[chave]=registro\n    return dict(registro)\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei as verificações de leitura, aprovação e idempotência."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Mostrei que a chamada do modelo não autoriza a própria ação."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Expliquei como identidade e permissões viriam de um backend real."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Confirmei que ferramentas fora da lista nunca executam."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Documentei que idempotência em memória não persiste entre processos."
      }
    ],
    "hints": [
      "Valide formato antes de acessar campos.",
      "Use uma lista explícita de ferramentas e argumentos.",
      "Uma operação repetida deve ser distinguida de uma operação nova com os mesmos dados."
    ],
    "explanation": [
      "O modelo pode propor uma ação; a aplicação continua responsável pelos efeitos.",
      "A chave composta evita misturar operações de usuários diferentes.",
      "Uma aplicação distribuída precisa de persistência e exclusão mútua para garantir idempotência sob concorrência."
    ],
    "transfer": "Persista as operações em SQLite com chave única por usuário e operação. Teste reinício do processo e explique como tratar duas requisições concorrentes.",
    "rubric": "Os testes verificam contratos do software com entradas controladas. Não medem a qualidade de um modelo real nem certificam segurança. Execute os testes localmente, interprete falhas e registre evidências; a página salva sua autoavaliação e não executa Python ou APIs."
  },
  {
    "id": "project-ai-workflow",
    "module": "ai-advanced",
    "title": "Fluxo de agente com estados explícitos",
    "kind": "ai",
    "format": "py",
    "runtime": "Python 3 · biblioteca padrão · sem API paga",
    "sourceLabel": "fluxo.py",
    "sourceFile": "fluxo.py",
    "testFile": "test_fluxo.py",
    "level": "Projeto do módulo · engenharia aplicada",
    "goal": "Modelar um fluxo limitado com aprovação e cancelamento, e documentar como uma skill e uma ferramenta MCP poderiam participar dele.",
    "prerequisites": "Revise ferramentas, MCP, skills e workflows. O código é uma máquina de estados local: não é um cliente MCP nem um agente conectado a modelo.",
    "deliverable": "Salve sua implementação em fluxo.py e os testes da aba Referência em test_fluxo.py, na mesma pasta. Execute python -m unittest -v test_fluxo.py. Cole somente sua implementação na Entrega. Inclua README com resultados, limitações e o que seria necessário para conectar um modelo real.",
    "brief": [
      "Implemente avancar(estado,evento,aprovado=False). Estados: inicio, planejado, executado, concluido, cancelado. Eventos válidos: planejar, executar, finalizar, cancelar.",
      "inicio+planejar → planejado; planejado+executar → executado somente com aprovado is True; executado+finalizar → concluido. cancelar leva qualquer estado não terminal a cancelado. Transições inválidas geram ValueError e falta de aprovação gera PermissionError.",
      "Implemente rodar(eventos,limite=4,aprovado=False), começando em inicio e devolvendo lista de estados incluindo o inicial. limite inteiro positivo excluindo bool; recuse sequência maior que o limite antes de executar transições. A lista de eventos é finita; o laboratório não implementa timeout real de rede.",
      "Entregue também um SKILL.md de exemplo para revisar uma consulta somente leitura, com nome, descrição, entradas, passos, limites e critérios de saída. No README, diferencie instruções da skill, ferramenta executável e transporte MCP. Explique onde host/client/server aparecem e qual versão de protocolo seria usada numa implementação real."
    ],
    "exampleOutput": "Fluxo aprovado: inicio → planejado → executado → concluido.\nSem aprovação: PermissionError antes de executar.\nCancelado não volta a executar.\nSequência maior que limite: ValueError.",
    "testCommand": "python -m unittest -v test_fluxo.py",
    "testsCode": "import unittest\nfrom fluxo import avancar,rodar\n\nclass FluxoTests(unittest.TestCase):\n    def test_sucesso(self):\n        self.assertEqual(rodar([\"planejar\",\"executar\",\"finalizar\"],aprovado=True),[\"inicio\",\"planejado\",\"executado\",\"concluido\"])\n    def test_sem_aprovacao(self):\n        with self.assertRaises(PermissionError):rodar([\"planejar\",\"executar\"])\n    def test_cancelamento_e_terminal(self):\n        self.assertEqual(rodar([\"planejar\",\"cancelar\"]),[\"inicio\",\"planejado\",\"cancelado\"])\n        with self.assertRaises(ValueError):avancar(\"cancelado\",\"planejar\",True)\n    def test_ordem_e_limite(self):\n        with self.assertRaises(ValueError):rodar([\"executar\"],aprovado=True)\n        with self.assertRaises(ValueError):rodar([\"planejar\",\"executar\"],limite=1,aprovado=True)\n        with self.assertRaises(ValueError):rodar([],limite=True)\n",
    "solution": "ESTADOS={\"inicio\",\"planejado\",\"executado\",\"concluido\",\"cancelado\"}\n\ndef avancar(estado,evento,aprovado=False):\n    if estado not in ESTADOS or evento not in {\"planejar\",\"executar\",\"finalizar\",\"cancelar\"}:\n        raise ValueError(\"Estado ou evento inválido\")\n    if estado in {\"concluido\",\"cancelado\"}: raise ValueError(\"Fluxo terminal\")\n    if evento==\"cancelar\":return \"cancelado\"\n    if estado==\"inicio\" and evento==\"planejar\":return \"planejado\"\n    if estado==\"planejado\" and evento==\"executar\":\n        if aprovado is not True:raise PermissionError(\"Aprovação necessária\")\n        return \"executado\"\n    if estado==\"executado\" and evento==\"finalizar\":return \"concluido\"\n    raise ValueError(\"Transição inválida\")\n\ndef rodar(eventos,limite=4,aprovado=False):\n    if type(limite) is not int or limite\u003c1 or len(eventos)>limite:\n        raise ValueError(\"Limite inválido ou excedido\")\n    historico=[\"inicio\"]\n    for evento in eventos:historico.append(avancar(historico[-1],evento,aprovado))\n    return historico\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei testes de transição, aprovação e cancelamento."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Distingui limite de passos de timeout de uma chamada de rede."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Escrevi a skill com entradas, limites e critérios verificáveis."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Expliquei que a máquina de estados não implementa MCP."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Desenhei onde salvar checkpoint e como evitar repetir efeito após reinício."
      }
    ],
    "hints": [
      "Liste a tabela de transições antes de programar.",
      "Estados terminais devem bloquear qualquer continuação.",
      "A skill orienta uma tarefa; não substitui as permissões do executor."
    ],
    "explanation": [
      "Uma máquina de estados torna caminhos permitidos revisáveis.",
      "O orçamento impede sequências arbitrariamente longas neste contrato.",
      "Conexão MCP, persistência e timeout são componentes adicionais que precisam de testes próprios."
    ],
    "transfer": "Adicione estado falhou e um caminho de revisão humana. Defina quais eventos são permitidos após falha e escreva testes antes de alterar a máquina.",
    "rubric": "Os testes verificam contratos do software com entradas controladas. Não medem a qualidade de um modelo real nem certificam segurança. Execute os testes localmente, interprete falhas e registre evidências; a página salva sua autoavaliação e não executa Python ou APIs."
  },
  {
    "id": "project-ai-evals",
    "module": "ai-quality",
    "title": "Relatório de avaliação e critério de liberação",
    "kind": "ai",
    "format": "py",
    "runtime": "Python 3 · biblioteca padrão · sem API paga",
    "sourceLabel": "avaliacao.py",
    "sourceFile": "avaliacao.py",
    "testFile": "test_avaliacao.py",
    "level": "Projeto do módulo · engenharia aplicada",
    "goal": "Calcular métricas de classificação e decidir uma liberação com limiares explícitos, sem confundir testes pequenos com garantia de qualidade geral.",
    "prerequisites": "Revise métricas, testes e listas Python. Os rótulos são booleanos já anotados por pessoas; este projeto não usa um LLM como juiz.",
    "deliverable": "Salve sua implementação em avaliacao.py e os testes da aba Referência em test_avaliacao.py, na mesma pasta. Execute python -m unittest -v test_avaliacao.py. Cole somente sua implementação na Entrega. Inclua README com resultados, limitações e o que seria necessário para conectar um modelo real.",
    "brief": [
      "Implemente avaliar(casos). Cada caso contém esperado e previsto booleanos. Recuse lista vazia ou rótulos não booleanos com ValueError. Calcule tp,fp,fn,tn, precisao=tp/(tp+fp), recall=tp/(tp+fn), acuracia=(tp+tn)/total. Divisor zero resulta em 0.0 por convenção documentada.",
      "Implemente liberar(relatorio,min_precisao=0.8,min_recall=0.8): devolva True somente quando ambos os limiares forem atingidos. Não altere os dados recebidos. Use os limiares apenas como exemplo didático, não como padrão universal de produção.",
      "No README, defina o que o rótulo positivo significa, separe conjunto de desenvolvimento e teste reservado e apresente pelo menos um caso de falso positivo e um de falso negativo.",
      "Inclua avaliação manual por fatias: pedido ambíguo, informação ausente, instrução maliciosa em documento e conflito de fontes. Uma taxa agregada boa pode esconder uma falha importante. O teste de formato e o teste de comportamento precisam permanecer separados."
    ],
    "exampleOutput": "Um TP, FP, FN e TN → precisão 0.5, recall 0.5, acurácia 0.5; liberação False.\nSomente negativo correto → acurácia 1.0, precisão/recall 0 pela convenção definida.\nPrecisão e recall exatamente 0.8 → True.",
    "testCommand": "python -m unittest -v test_avaliacao.py",
    "testsCode": "import unittest\nfrom avaliacao import avaliar,liberar\n\nclass AvaliacaoTests(unittest.TestCase):\n    def test_matriz(self):\n        r=avaliar([{\"esperado\":a,\"previsto\":b} for a,b in [(True,True),(False,True),(True,False),(False,False)]])\n        self.assertEqual([r[k] for k in [\"tp\",\"fp\",\"fn\",\"tn\"]],[1,1,1,1])\n        self.assertEqual(r[\"precisao\"],0.5);self.assertEqual(r[\"recall\"],0.5)\n        self.assertFalse(liberar(r))\n    def test_limiar(self):\n        self.assertTrue(liberar({\"precisao\":0.8,\"recall\":0.8}))\n        self.assertFalse(liberar({\"precisao\":1.0,\"recall\":0.79}))\n    def test_zeros(self):\n        r=avaliar([{\"esperado\":False,\"previsto\":False}])\n        self.assertEqual((r[\"precisao\"],r[\"recall\"],r[\"acuracia\"]),(0.0,0.0,1.0))\n    def test_invalido(self):\n        for casos in [[],[{\"esperado\":1,\"previsto\":True}]]:\n            with self.assertRaises(ValueError):avaliar(casos)\n",
    "solution": "def avaliar(casos):\n    if not casos:raise ValueError(\"Conjunto vazio\")\n    tp=fp=fn=tn=0\n    for caso in casos:\n        esperado,previsto=caso[\"esperado\"],caso[\"previsto\"]\n        if type(esperado) is not bool or type(previsto) is not bool:raise ValueError(\"Rótulos devem ser booleanos\")\n        if esperado and previsto:tp+=1\n        elif previsto:fp+=1\n        elif esperado:fn+=1\n        else:tn+=1\n    return {\"tp\":tp,\"fp\":fp,\"fn\":fn,\"tn\":tn,\n            \"precisao\":tp/(tp+fp) if tp+fp else 0.0,\n            \"recall\":tp/(tp+fn) if tp+fn else 0.0,\n            \"acuracia\":(tp+tn)/len(casos)}\n\ndef liberar(relatorio,min_precisao=0.8,min_recall=0.8):\n    return relatorio[\"precisao\"]>=min_precisao and relatorio[\"recall\"]>=min_recall\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei testes das métricas e fronteiras dos limiares."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Defini o rótulo positivo e os custos de cada erro."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Separei ajuste do sistema de avaliação reservada."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Documentei limitações do tamanho da amostra."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Propus monitoramento de custo, latência e incidentes sem registrar conteúdo sensível bruto."
      }
    ],
    "hints": [
      "Desenhe uma matriz 2×2 com exemplos concretos.",
      "Trate denominador zero explicitamente.",
      "Limiar é decisão de produto e risco; precisa de justificativa."
    ],
    "explanation": [
      "Métricas diferentes respondem perguntas diferentes.",
      "Alta acurácia pode mascarar o fracasso em uma classe rara.",
      "Uma regra de liberação só é útil se os casos representam o uso e se regressões são examinadas."
    ],
    "transfer": "Acrescente fatia por idioma ou categoria de pedido. Exija um mínimo de casos por fatia e indique dados insuficientes em vez de apresentar uma taxa enganosa.",
    "rubric": "Os testes verificam contratos do software com entradas controladas. Não medem a qualidade de um modelo real nem certificam segurança. Execute os testes localmente, interprete falhas e registre evidências; a página salva sua autoavaliação e não executa Python ou APIs."
  },
  {
    "id": "project-ai-capstone",
    "module": "ai-applied",
    "title": "Assistente fundamentado com teste de falhas",
    "kind": "ai",
    "format": "py",
    "runtime": "Python 3 · biblioteca padrão · sem API paga",
    "sourceLabel": "assistente.py",
    "sourceFile": "assistente.py",
    "testFile": "test_assistente.py",
    "level": "Projeto do módulo · engenharia aplicada",
    "goal": "Integrar seleção de evidências, adaptação de modelo, validação de fontes e abstenção em um fluxo local verificável.",
    "prerequisites": "Conclua os módulos anteriores e os projetos de recuperação e avaliação. Este projeto usa um gerador injetado e simulado; conectá-lo a uma API real é uma extensão opcional com avaliação adicional.",
    "deliverable": "Salve sua implementação em assistente.py e os testes da aba Referência em test_assistente.py, na mesma pasta. Execute python -m unittest -v test_assistente.py. Cole somente sua implementação na Entrega. Inclua README com resultados, limitações e o que seria necessário para conectar um modelo real.",
    "brief": [
      "Implemente responder(pergunta,documentos,usuario,gerar). Filtre documentos por usuario, pontue interseção de palavras em minúsculas, ordene por score decrescente/id crescente e selecione no máximo dois com score>0. Corpus válido possui id, texto e usuarios.",
      "Sem evidência, retorne {status:abster,resposta:\"\",fontes:[]} e NÃO chame gerar. Com evidência, chame gerar(pergunta,contexto) uma vez. contexto é lista de novos dicionários com id/texto; não inclua permissões nem documentos não autorizados.",
      "A saída do gerador deve ser dicionário com exatamente resposta e fontes. resposta deve ser texto não vazio; fontes deve ser lista não vazia de strings únicas, todas entre os IDs enviados no contexto. Em saída inválida retorne status revisar com resposta vazia e fontes vazias. Em TimeoutError retorne status indisponivel sem retry neste contrato.",
      "Uma saída válida recebe status ok, resposta aparada e fontes copiadas. Validade dos IDs não prova que o texto é sustentado pelas fontes; inclua revisão humana de fundamentação, abstenção correta e instruções não confiáveis no seu conjunto de avaliação.",
      "No README, apresente arquitetura, contratos, corpus fictício, versões, casos de teste, riscos remanescentes e critério de liberação. Para extensão real, mantenha chave no backend, escolha modelo disponível, registre uso/custo sem conteúdo sensível e não exponha credenciais neste HTML."
    ],
    "exampleOutput": "SQL + usuária ana + resposta válida → status ok, fonte publico.\nDocumento restrito nunca entra no contexto.\nSem evidência → abster, zero chamadas.\nFonte inventada ou contrato inválido → revisar.\nTimeout → indisponivel.\nEsses testes não provam fundamentação semântica de uma resposta real.",
    "testCommand": "python -m unittest -v test_assistente.py",
    "testsCode": "import copy\nimport unittest\nfrom assistente import responder\n\nclass AssistenteTests(unittest.TestCase):\n    def setUp(self):\n        self.docs=[{\"id\":\"publico\",\"texto\":\"SQL usa tabelas\",\"usuarios\":[\"ana\"]},\n                   {\"id\":\"restrito\",\"texto\":\"SQL orçamento interno\",\"usuarios\":[\"admin\"]}]\n    def test_sucesso_e_contexto(self):\n        antes=copy.deepcopy(self.docs);chamadas=[]\n        def gerar(pergunta,contexto):\n            chamadas.append((pergunta,contexto))\n            return {\"resposta\":\" Usa tabelas. \",\"fontes\":[\"publico\"]}\n        self.assertEqual(responder(\"SQL\",self.docs,\"ana\",gerar),{\"status\":\"ok\",\"resposta\":\"Usa tabelas.\",\"fontes\":[\"publico\"]})\n        self.assertEqual(len(chamadas),1)\n        self.assertEqual(chamadas[0][1],[{\"id\":\"publico\",\"texto\":\"SQL usa tabelas\"}])\n        self.assertEqual(self.docs,antes)\n    def test_abstencao_sem_chamada(self):\n        def proibido(*args):raise AssertionError(\"Não deveria gerar\")\n        self.assertEqual(responder(\"jardinagem\",self.docs,\"ana\",proibido)[\"status\"],\"abster\")\n        self.assertEqual(responder(\"SQL\",self.docs,\"visitante\",proibido)[\"status\"],\"abster\")\n    def test_saida_invalida(self):\n        invalidas=[{}, {\"resposta\":\"x\",\"fontes\":[\"restrito\"]},{\"resposta\":\"x\",\"fontes\":[\"inventado\"]},\n                   {\"resposta\":\"x\",\"fontes\":[\"publico\",\"publico\"]},{\"resposta\":\" \",\"fontes\":[\"publico\"]},\n                   {\"resposta\":\"x\",\"fontes\":[{}]}]\n        for saida in invalidas:\n            with self.subTest(saida=saida):\n                self.assertEqual(responder(\"SQL\",self.docs,\"ana\",lambda p,c:saida)[\"status\"],\"revisar\")\n    def test_timeout(self):\n        def lento(*args):raise TimeoutError(\"serviço sem resposta\")\n        self.assertEqual(responder(\"SQL\",self.docs,\"ana\",lento)[\"status\"],\"indisponivel\")\n",
    "solution": "import re\n\ndef responder(pergunta,documentos,usuario,gerar):\n    termos=set(re.findall(r\"\\w+\",pergunta.lower()))\n    pontuados=[]\n    for doc in documentos:\n        if usuario not in doc[\"usuarios\"]:continue\n        score=len(termos & set(re.findall(r\"\\w+\",doc[\"texto\"].lower())))\n        if score:pontuados.append((score,doc))\n    pontuados.sort(key=lambda par:(-par[0],par[1][\"id\"]))\n    contexto=[{\"id\":doc[\"id\"],\"texto\":doc[\"texto\"]} for _,doc in pontuados[:2]]\n    def vazio(status):return {\"status\":status,\"resposta\":\"\",\"fontes\":[]}\n    if not contexto:return vazio(\"abster\")\n    permitidas={doc[\"id\"] for doc in contexto}\n    try:saida=gerar(pergunta,contexto)\n    except TimeoutError:return vazio(\"indisponivel\")\n    if not isinstance(saida,dict) or set(saida)!={\"resposta\",\"fontes\"}:return vazio(\"revisar\")\n    resposta,fontes=saida[\"resposta\"],saida[\"fontes\"]\n    if not isinstance(resposta,str) or not resposta.strip():return vazio(\"revisar\")\n    if not isinstance(fontes,list) or not fontes or any(not isinstance(f,str) for f in fontes):return vazio(\"revisar\")\n    if len(set(fontes))!=len(fontes) or not set(fontes)\u003c=permitidas:return vazio(\"revisar\")\n    return {\"status\":\"ok\",\"resposta\":resposta.strip(),\"fontes\":list(fontes)}\n",
    "checks": [
      {
        "id": "criterion-1",
        "mode": "manual",
        "label": "Executei sucesso, ausência, acesso, fonte inválida e timeout."
      },
      {
        "id": "criterion-2",
        "mode": "manual",
        "label": "Documentei que o gerador é simulado e a busca é lexical."
      },
      {
        "id": "criterion-3",
        "mode": "manual",
        "label": "Preparei casos humanos de fundamentação e prompt injection."
      },
      {
        "id": "criterion-4",
        "mode": "manual",
        "label": "Expliquei onde autenticação, API real, limites e logs entrariam na arquitetura."
      },
      {
        "id": "criterion-5",
        "mode": "manual",
        "label": "Apresentei README e um novo requisito implementado com teste de regressão."
      }
    ],
    "hints": [
      "Não chame o gerador sem evidência autorizada.",
      "Crie cópias do contexto para não entregar metadados internos.",
      "Verifique tipo dos itens da lista antes de convertê-la em conjunto."
    ],
    "explanation": [
      "A injeção do gerador permite testar o fluxo sem depender da rede.",
      "A validação de fontes limita IDs aceitos, mas não verifica se a afirmação é verdadeira.",
      "Estados de abstenção, revisão e indisponibilidade permitem uma interface honesta e observável."
    ],
    "transfer": "Adicione versões às fontes e um limite de tamanho do contexto. Escreva testes para documentos atualizados e para orçamento excedido; depois compare o fluxo com um modelo real usando um conjunto reservado, se optar por essa extensão.",
    "rubric": "Os testes verificam contratos do software com entradas controladas. Não medem a qualidade de um modelo real nem certificam segurança. Execute os testes localmente, interprete falhas e registre evidências; a página salva sua autoavaliação e não executa Python ou APIs."
  }
];
(() => {
  const executionNotes = {
    'project-ai-contract': 'A triagem e a validação de saída usam funções locais e dados de teste; nenhuma API de modelo é chamada.',
    'project-ai-retrieval': 'A recuperação usa correspondência lexical e documentos fictícios; não há embeddings, banco vetorial ou geração por modelo.',
    'project-ai-tools': 'O despachante e as ferramentas usam funções locais controladas; não há agente nem ação em serviço externo.',
    'project-ai-workflow': 'Os estados e resultados são exercitados localmente; nenhuma inferência ou integração externa é executada.',
    'project-ai-evals': 'As métricas usam rótulos fixos e funções determinísticas; não avaliam respostas de um modelo conectado.',
    'project-ai-capstone': 'O gerador é injetado pelo teste e a busca é lexical; o projeto não chama API nem prova fundamentação de um LLM real.'
  };

  for (const [id, detail] of Object.entries(executionNotes)) {
    const project = PROJECTS.find(item => item.id === id);
    project.execution = {
      mode: 'simulated',
      label: 'Projeto com IA simulada',
      detail
    };
  }
})();
for(const t of tracks)for(const m of t.modules)for(const l of m.lessons)l.guide=LESSON_GUIDES[l.id];
    // TEACHING_CONTENT_END

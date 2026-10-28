'use strict';

// Guias detalhados da trilha Integração & Entrega.
Object.assign(LESSON_GUIDES, {
"delivery-http": {
    "prerequisites": "Concluir JavaScript até Fetch, saber abrir o terminal e concluir setup-node para executar Node.js. Não é necessário serviço ou conta.",
    "setup": "Depois de setup-node, crie a pasta laboratorio-http e salve o exemplo como server.js nela. Abra o terminal nessa pasta e execute node server.js; a saída esperada é http://127.0.0.1:4178/api/estudos. No navegador, abra essa URL e as rotas /api/falha e /inexistente na mesma origem. Para inspecionar o status, use a aba Rede das ferramentas do navegador ou fetch no Console. Depois, na cópia do repositório, abra labs/backend-http/README.md para executar a interface que consome a API e seus testes. Se node não for reconhecido, retome setup-node; se a porta estiver ocupada, escolha outra no código e use a mesma na URL. Encerre com Ctrl+C e retome com o mesmo comando na pasta. Nenhum serviço externo ou conta é necessário; em computador limitado, o servidor nativo Node evita instalar banco ou framework.",
    "why": "Uma interface bonita pode falhar quando os dados chegam em outro formato ou quando o servidor responde com erro. Um contrato explícito permite implementar, testar e discutir essas situações antes de depender de uma API remota.",
    "sections": [
      {
        "title": "O diálogo entre cliente e servidor",
        "paragraphs": [
          "O navegador é um cliente. Ele faz uma requisição com método, endereço, cabeçalhos e, quando necessário, corpo. O servidor recebe, decide e devolve uma resposta com status, cabeçalhos e corpo. HTTP descreve esse protocolo de troca; a aplicação escolhe o significado dos seus caminhos e dados. A rota /api/estudos deste laboratório devolve uma coleção; a barra inicial pertence ao caminho, e a porta 4178 identifica o processo local. Essa rota acessível da API é um endpoint.",
          "Uma URL não é por si só um banco de dados nem prova de que há persistência. Neste exemplo o array vive apenas na memória do processo Node. Quando você para o servidor, o estado volta ao valor escrito no arquivo. Antes de integrar uma interface, desenhe uma tabela com método, rota, pedido válido, resposta de sucesso e resposta de erro. Assim o contrato não muda escondido durante a implementação.",
          "Pausa de prática: desenhe cliente → GET /api/estudos → servidor → status 200 + JSON → cliente. Antes de abrir a rota, preveja quantos registros virão e o que acontecerá após reiniciar o processo. Compare seu desenho com o mapa abaixo."
        ],
        "diagramTitle": "Sequência de GET /api/estudos no laboratório local",
        "diagram": "NAVEGADOR                          SERVIDOR NODE (127.0.0.1:4178)\n   |                                            |\n1. |── GET /api/estudos ─────────────────────→|\n   |                                            | 2. Lê método e caminho\n   |                                            |    no callback createServer\n   |                                            | 3. Escolhe o array estudos\n4. |←─ status 200; Content-Type: application/json |\n   |   [{\"id\":1,\"titulo\":\"HTML\"},                |\n   |    {\"id\":2,\"titulo\":\"JavaScript\"}] ──────────|\n5. | Exibe o corpo; a aba Rede mostra status,    |\n   | cabeçalho e resposta.                      |\n   |                                            |\nGET /api/falha → volta 503: {\"erro\":\"Serviço indisponível\"}.\nGET /inexistente → volta 404: {\"erro\":\"Rota não encontrada\"}.\nO array está na memória do processo; reiniciar restaura os dois itens.",
        "terms": [{"term": "Endpoint", "meaning": "Ponto de acesso de uma API descrito por método e caminho; aqui, GET /api/estudos devolve a lista local."}]
      },
      {
        "title": "Método e status expressam intenções diferentes",
        "paragraphs": [
          "GET pede uma representação sem ser usado para criar registros; POST costuma enviar dados para processamento ou criação. O status 200 indica sucesso de leitura, 201 indica criação, 400 indica pedido inválido, 401 exige autenticação, 403 recusa uma ação autenticada, 404 indica rota ou recurso ausente e 503 indica indisponibilidade. Esses números devem acompanhar o resultado real. Não responda sempre 200 colocando apenas erro dentro do JSON.",
          "O navegador pode mostrar uma página para 404 e outra para 503, mas ambas são falhas do contrato esperado. A API pode responder JSON com um campo erro curto para que a interface apresente uma mensagem. Erros internos detalhados pertencem ao registro do servidor; enviá-los indiscriminadamente expõe informações e confunde o usuário. Teste cada status separadamente e registre qual resposta o cliente deverá tratar.",
          "Pausa de prática: antes de acessar /api/falha e /inexistente, preveja o status e o campo erro de cada resposta. Confira os dois na aba Rede; não use apenas o texto visível na página."
        ]
      },
      {
        "title": "JSON, tipos e cabeçalhos",
        "paragraphs": [
          "JSON é uma representação textual de dados. Em nosso sucesso, a resposta é um array de objetos com id numérico e titulo textual. O cabeçalho Content-Type: application/json informa a representação. JSON.stringify transforma valores JavaScript em texto para envio; JSON.parse faz o caminho contrário. O cliente não deve assumir que qualquer resposta tem array válido: uma página de erro, um campo ausente ou um valor null exigem tratamento.",
          "Descreva também as regras de cada campo: id positivo e único, titulo não vazio, ausência de campos sigilosos. Uma mudança de titulo para name quebra quem procura titulo mesmo que o status continue 200. Um teste de contrato verifica forma e tipos, não apenas se a URL abriu. Consumir APIs reais exige ler sua documentação, porque métodos, autenticação, paginação e limites variam.",
          "Pausa de prática: anote o contrato [{id:number, titulo:string}] antes de ler o corpo. Depois imagine que titulo virou name; explique qual acesso do cliente deixa de funcionar apesar do status 200."
        ]
      },
      {
        "title": "Como observar uma integração",
        "paragraphs": [
          "Abra as ferramentas do navegador e selecione Rede antes de atualizar. Veja a URL requisitada, o método, o status, o tipo da resposta e o corpo. O Console mostra erros de JavaScript, mas um 404 pode aparecer ali sem explicar qual contrato foi violado. Compare o que chegou com o que a interface espera. Se nem houve requisição, investigue o código ou a origem da página.",
          "O exemplo usa 127.0.0.1, que aponta para o próprio computador. Se a porta estiver ocupada, escolha outra no código e use a mesma no navegador. O teste é reproduzível sem internet. Em seguida, execute labs/backend-http/README.md: abra a interface, localize seu GET na aba Rede e veja a API responder na mesma origem. Os arquivos do laboratório são executáveis e incluem um teste com node --test. Depois de dominar o mock, você pode substituir a origem por um serviço real público; preserve o mesmo roteiro de observar status, validar resposta e tratar falhas."
        ],
        "terms": [{"term": "Mock", "meaning": "Implementação controlada usada no lugar de uma dependência real durante a prática; o servidor desta aula simula respostas e guarda dados apenas em memória."}]
      },
      {
        "title": "Contrato como ferramenta de trabalho",
        "paragraphs": [
          "Em equipe, quem implementa a interface pode trabalhar com uma resposta simulada enquanto a API é construída. Registre exemplos de sucesso e erro, inclusive lista vazia. Não invente um campo para disfarçar uma inconsistência: atualize contrato, implementação e testes juntos. Contratos pequenos e explícitos ajudam a discutir mudanças com produto e backend sem depender de suposições invisíveis.",
          "O projeto precisa comprovar comportamento, não só exibir dados fixos. Ao final, você deve conseguir apontar o caminho requisitado, o método, o status observado e a forma do JSON. Se a rota /api/falha mostrar 503, isso é uma experiência correta para aprender tratamento de falhas, não um defeito a ser apagado do roteiro."
        ]
      }
    ],
    "example": {
      "language": "js",
      "code": "// Salve como server.js e execute: node server.js\nconst http = require('node:http');\nconst estudos = [{ id: 1, titulo: 'HTML' }, { id: 2, titulo: 'JavaScript' }];\nhttp.createServer((req, res) => {\n  res.setHeader('Content-Type', 'application/json; charset=utf-8');\n  if (req.method === 'GET' && req.url === '/api/estudos') {\n    res.writeHead(200);\n    res.end(JSON.stringify(estudos));\n    return;\n  }\n  if (req.method === 'GET' && req.url === '/api/falha') {\n    res.writeHead(503);\n    res.end(JSON.stringify({ erro: 'Serviço indisponível' }));\n    return;\n  }\n  res.writeHead(404);\n  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));\n}).listen(4178, '127.0.0.1', () => console.log('http://127.0.0.1:4178/api/estudos'));",
      "explanation": [
        "Crie o servidor local com a biblioteca nativa http, sem instalar pacotes.",
        "A mesma porta oferece sucesso, indisponibilidade e rota ausente.",
        "Cada caminho declara status e JSON de forma observável.",
        "Extensão opcional: consultar a API pública do GitHub; o laboratório local cobre todo o aprendizado essencial."
      ],
      "expected": "GET /api/estudos → 200 e dois itens; GET /api/falha → 503 e mensagem; GET /inexistente → 404."
    },
    "guided": [
      {
        "instruction": "Abra a rota de sucesso e conte os objetos do array.",
        "result": "Dois: HTML e JavaScript."
      },
      {
        "instruction": "Inspecione /api/falha na aba Rede.",
        "result": "Status 503; o corpo JSON traz erro."
      },
      {
        "instruction": "Pare e reinicie o servidor.",
        "result": "O conjunto inicial volta; não existe banco neste laboratório."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de editar, diga o status de GET /api/saude na versão inicial. Depois acrescente essa rota com status 200 e {\"ok\":true} e confira a mudança.",
        "hints": [
          "Coloque a nova condição antes do 404.",
          "Defina Content-Type JSON como nas outras rotas."
        ],
        "solution": "if (req.method === 'GET' && req.url === '/api/saude') { res.writeHead(200); res.end(JSON.stringify({ok:true})); return; }",
        "explanation": "Este trecho deve entrar no callback do servidor antes da resposta padrão.",
        "expected": "A previsão é registrada antes da mudança; o teste permite comparar o comportamento antes e depois de adicionar a rota.",
        "criteria": ["Previsão do status é anotada antes de editar.","Teste compara resposta inicial e resposta após a rota ser adicionada."]
      },
      {
        "prompt": "Alterar: na tabela de contrato do laboratório, documente /api/estudos com método, status, tipo de resposta e nomes/tipos de campos. Depois mude temporariamente titulo para name no servidor e indique qual linha da tabela precisa mudar.",
        "hints": [
          "Método é GET e status 200.",
          "O corpo é array de objetos; id é número e titulo é texto."
        ],
        "solution": "GET /api/estudos; 200; Content-Type: application/json; corpo: [{id:number, titulo:string}].",
        "explanation": "Especificar tipos permite detectar mudanças incompatíveis.",
        "expected": "Contrato tem rota, status, mídia e campos; a mudança temporária troca titulo:string por name:string e exige ajuste no cliente e nos testes.",
        "criteria": ["Contrato registra método, status, mídia e schema dos campos.","Mudança de nome reflete-se em cliente e testes."]
      },
      {
        "prompt": "Construir: crie GET /api/estudos/1 que devolva apenas o primeiro item; id ausente devolve 404.",
        "hints": [
          "Interprete o último segmento da URL.",
          "Procure no array antes de responder."
        ],
        "solution": "const match = req.url.match(/^\\/api\\/estudos\\/(\\d+)$/);\nif (req.method === 'GET' && match) {\n  const id = Number(match[1]);\n  const item = estudos.find(e => e.id === id);\n  res.writeHead(item ? 200 : 404);\n  res.end(JSON.stringify(item || { erro: 'Não encontrado' }));\n  return;\n}",
        "explanation": "Coloque antes da rota padrão 404. Use uma condição de caminho explícita para não aceitar entradas arbitrárias.",
        "expected": "/1 → 200 com HTML; /9 → 404.",
        "criteria": ["Rota por id devolve apenas um item ou erro apropriado.","Testes conferem recurso existente e ausente pelo contrato HTTP."]
      },
      {
        "prompt": "Investigar erro: a interface espera dados[0].titulo, mas a API passa a enviar {items:[...]}. Observe a forma real na aba Rede, descreva a divergência e proponha duas correções verificáveis.",
        "hints": [
          "Observe primeiro a forma real no painel Rede.",
          "O contrato e o cliente precisam concordar."
        ],
        "solution": "Correção A: servidor volta a entregar o array contratado. Correção B: contrato passa a declarar {items:Array} e cliente usa dados.items[0].titulo; atualize testes e documentação.",
        "explanation": "Uma mudança de forma pode quebrar o consumidor com status 200; alinhe as duas pontas.",
        "expected": "Explicação identifica divergência estrutural e impacto.",
        "criteria": ["Inspeciona resposta real da Rede e compara com a forma esperada pela interface.","Apresenta duas correções verificáveis para a incompatibilidade."]
      },
      {
        "prompt": "Extensão opcional com serviço real: em Node.js 18+, consulte GET https://api.github.com/repos/mdn/content sem token. Mostre full_name e o tipo de stargazers_count. Se houver falha de rede ou limite de requisições, registre o status e continue com o mock local.",
        "hints": [
          "A documentação do GitHub permite leitura pública sem autenticação, sujeita a limite.",
          "Verifique response.ok antes de ler os campos."
        ],
        "solution": "async function consultar(){ const r=await fetch('https://api.github.com/repos/mdn/content',{headers:{Accept:'application/vnd.github+json'}}); if(!r.ok) throw new Error('HTTP '+r.status); const d=await r.json(); console.log(d.full_name,typeof d.stargazers_count); } consultar().catch(e=>console.error('Consulta indisponível:',e.message));",
        "explanation": "Este exercício requer internet e o serviço de terceiros. Não há garantia de disponibilidade ou quantidade fixa de estrelas; requisições não autenticadas têm limite documentado. O mock local é suficiente para a aula.",
        "expected": "Quando disponível, imprime mdn/content e number; em falha, informa motivo sem quebrar o laboratório.",
        "criteria": ["Chamada sem token depende do serviço real somente na extensão opcional.","Em falha registra evidência e continua com mock; tipo retornado é conferido."]
      }
    ],
    "mistakes": [
      "Tomar status 200 como prova de que o JSON contém os campos corretos.",
      "Confundir mock em memória com persistência em banco.",
      "Copiar uma URL pública sem conferir método, limites e documentação."
    ],
    "quiz": [
      {
        "question": "O que o status 503 representa neste laboratório?",
        "options": [
          "Criação concluída.",
          "Serviço indisponível.",
          "Erro de sintaxe JavaScript."
        ],
        "correctIndex": 1,
        "explanation": "503 expressa indisponibilidade do serviço; o cliente deve tratar a falha."
      },
      {
        "question": "Se a resposta muda de array para objeto com items, o que deve mudar?",
        "options": [
          "Nada, porque ambos são JSON.",
          "Contrato, cliente e testes.",
          "Apenas a cor do botão."
        ],
        "correctIndex": 1,
        "explanation": "JSON válido pode ter formas incompatíveis."
      },
      {
        "question": "Onde vive o array estudos do exemplo?",
        "options": [
          "No processo Node, somente durante sua execução.",
          "Em um banco durável.",
          "No localStorage do navegador."
        ],
        "correctIndex": 0,
        "explanation": "O array é memória do servidor local e reinicia com o processo."
      }
    ],
    "summary": [
      "Método, rota, status, cabeçalho e corpo compõem o contrato.",
      "Valide forma e tipos do JSON, inclusive em erros.",
      "Mock local cobre a aula; a consulta pública ao GitHub é extensão opcional, sujeita a rede e limite."
    ]
  },
"delivery-forms": {
    "prerequisites": "Concluir delivery-http e a preparação setup-node; saber manipular DOM e usar async/await (revisar js-fetch se necessário).",
    "setup": "Na pasta da aula, pare o servidor anterior com Ctrl+C no terminal. Salve o exemplo como server.js nessa pasta e execute node server.js no terminal; a saída esperada é Abra http://127.0.0.1:4178/. Abra esse endereço no navegador e use a aba Rede para observar GET e POST. Para retomar, execute o mesmo comando; se a porta estiver ocupada, encerre o processo anterior. O exemplo usa o servidor nativo do Node.js, sem pacote adicional. Após esta aula, abra labs/backend-validation/README.md para praticar a validação no servidor com pedidos enviados também fora do formulário. Em seguida, labs/backend-layers/README.md separa HTTP, validação, regras de negócio e acesso aos dados; a seção Integração externa real: Open-Meteo acrescenta contrato, serviço real e falhas controladas. O roteiro DEPLOY_VERCEL.md orienta a verificar a demonstração publicada.",
    "why": "Uma integração real não termina quando Fetch retorna. O usuário precisa saber se o pedido está sendo enviado, se foi aceito, se falhou e se pode tentar outra vez.",
    "sections": [
      {
        "title": "Do formulário à requisição",
        "paragraphs": [
          "A interface lê o texto, remove espaços externos e interrompe o envio vazio. Em seguida transforma {titulo:valor} em JSON, anuncia application/json e faz POST para a rota local. Como a página e a API são servidas pela mesma origem, este laboratório não depende de configuração CORS. O corpo representa uma intenção; o servidor é quem decide se a criação é válida.",
          "O valor de um input é sempre texto. Mesmo que o controle limite o tamanho, outro cliente pode enviar um corpo inválido diretamente para a API. Por isso a validação do servidor repete as regras essenciais. O navegador oferece orientação imediata; a API protege seu próprio contrato. Este exemplo usa uma lista em memória e não pretende guardar dados após reiniciar.",
          "Pausa: antes de executar, preveja o que acontece se o campo contiver apenas espaços. Depois compare a previsão com a aba Rede."
        ]
      },
      {
        "title": "Estados visíveis e ação coerente",
        "paragraphs": [
          "Antes de aguardar a rede, o parágrafo com role=status anuncia “Salvando…”. Quando a resposta é aceita, o item aparece e surge confirmação. Quando há erro, a mensagem fica visível. Em uma versão maior, acrescente uma variável enviando e desabilite temporariamente o botão para não criar dois registros por cliques repetidos; restaure no finally. Não remova o texto digitado em caso de falha, pois ele ajuda a tentar novamente.",
          "A lista mostra o valor recebido do servidor por textContent. Inserir texto do usuário com innerHTML pode transformar caracteres em marcação e abrir caminho para injeção. Estados vazios também merecem mensagem: se GET retorna [], mostre “Nenhum estudo cadastrado”. A interface é uma máquina de estados pequena: pronto, validando, enviando, sucesso ou erro. Cada transição deve deixar a ação seguinte compreensível.",
          "Pausa: desenhe as transições ao enviar um título válido e ao desligar o servidor durante o envio. Em qual estado o botão deve voltar a ficar disponível?"
        ]
      },
      {
        "title": "Fetch resolve em muitos erros HTTP",
        "paragraphs": [
          "Fetch normalmente rejeita a Promise em falhas de rede, mas um status 400 ou 500 produz um objeto Response. Por isso o código lê o corpo, verifica resposta.ok e lança um erro com mensagem apropriada. Não confunda resposta.json() com sucesso da operação: JSON pode conter uma descrição de falha. O servidor envia 201 quando registra o item e 400 quando o título é inválido.",
          "Mesmo a leitura do JSON pode falhar se o servidor responder HTML inesperado ou corpo malformado. O catch lida com essa falha, porém a mensagem técnica pode não ser adequada ao usuário; em produção, traduza a falha para orientação clara e registre detalhes no ambiente de diagnóstico. Considere tempos longos, indisponibilidade e reenvio deliberado; não presuma que rede local equivale a rede confiável.",
          "Pausa: preveja se um POST que recebe 400 entra no catch sem verificar resposta.ok. Confirme a resposta na aba Rede."
        ]
      },
      {
        "title": "Validação e limites do laboratório",
        "paragraphs": [
          "O servidor aceita título textual não vazio com até sessenta caracteres depois de trim. Responde 400 com erro caso contrário. Isso já cria um contrato testável: título “  HTML  ” vira “HTML”; título de espaços é recusado. Exercite chamadas inválidas pelo Console ou por script para comprovar que não depende só da interface. Uma regra de negócio pertence à API quando protege dados compartilhados.",
          "O exemplo mantém dados só em memória. O próximo passo para um produto é adicionar persistência, autenticação quando houver contas e tratamento de concorrência. Não substitua essas responsabilidades por localStorage achando que um serviço remoto passou a existir. LocalStorage serve ao navegador atual; a API é acessível a clientes diferentes e precisa tratar seus próprios erros e segurança.",
          "Pausa: envie um título numérico diretamente pelo Console e observe status, corpo e quantidade de itens antes e depois."
        ]
      },
      {
        "title": "Verificar com comportamento e observação",
        "paragraphs": [
          "Teste primeiro título vazio: não deve haver POST e o foco retorna ao campo. Envie “  HTML  ”: observe status 201, corpo com id e titulo “HTML”, item inserido e campo limpo. Desligue o servidor e tente outra entrada: a página já aberta deve mostrar falha; o texto no campo deve continuar. Reinicie e confirme que a lista em memória começa vazia.",
          "A aba Rede revela método, cabeçalhos, corpo e tempo de resposta. Capture o caso falho como evidência no relatório do projeto. Quando comunicar uma integração à equipe, não diga apenas “funciona”: informe quais entradas, respostas e estados foram verificados. Essa precisão torna a correção de defeitos muito mais rápida."
        ]
      }
    ],
    "example": {
      "language": "js",
      "code": "// Salve como server.js e execute: node server.js\nconst http = require('node:http');\nconst html = String.raw`\u003c!doctype html>\u003chtml lang=\"pt-BR\">\u003cmeta charset=\"utf-8\">\u003ctitle>Cadastro local\u003c/title>\n\u003clabel>Título \u003cinput id=\"titulo\" maxlength=\"60\">\u003c/label>\u003cbutton id=\"salvar\">Salvar\u003c/button>\n\u003cp id=\"estado\" role=\"status\">Pronto\u003c/p>\u003cul id=\"lista\">\u003c/ul>\n\u003cscript>\nconst titulo = document.querySelector('#titulo');\nconst estado = document.querySelector('#estado');\nconst lista = document.querySelector('#lista');\ndocument.querySelector('#salvar').addEventListener('click', async () => {\n  const valor = titulo.value.trim();\n  if (!valor) { estado.textContent = 'Informe um título.'; titulo.focus(); return; }\n  estado.textContent = 'Salvando…';\n  try {\n    const resposta = await fetch('/api/estudos', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({titulo:valor}) });\n    const dados = await resposta.json();\n    if (!resposta.ok) throw new Error(dados.erro || 'Falha ao salvar');\n    const item = document.createElement('li'); item.textContent = dados.titulo; lista.append(item);\n    titulo.value = ''; estado.textContent = 'Salvo com sucesso.';\n  } catch (erro) { estado.textContent = erro.message; }\n});\n\u003c/script>\u003c/html>`;\nconst dados = [];\nhttp.createServer((req, res) => {\n  if (req.method === 'GET' && req.url === '/') { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); res.end(html); return; }\n  if (req.method === 'GET' && req.url === '/api/estudos') { res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'}); res.end(JSON.stringify(dados)); return; }\n  if (req.method === 'POST' && req.url === '/api/estudos') {\n    let corpo = '';\n    req.on('data', trecho => { corpo += trecho; if (corpo.length > 4096) req.destroy(); });\n    req.on('end', () => {\n      let titulo;\n      try { titulo = JSON.parse(corpo).titulo; } catch { titulo = null; }\n      res.setHeader('Content-Type', 'application/json; charset=utf-8');\n      if (typeof titulo !== 'string' || !titulo.trim() || titulo.trim().length > 60) {\n        res.writeHead(400); res.end(JSON.stringify({erro:'Título inválido'})); return;\n      }\n      const registro = {id:dados.length + 1, titulo:titulo.trim()}; dados.push(registro);\n      res.writeHead(201); res.end(JSON.stringify(registro));\n    }); return;\n  }\n  res.writeHead(404); res.end('Não encontrado');\n}).listen(4178, '127.0.0.1', () => console.log('Abra http://127.0.0.1:4178/'));",
      "explanation": [
        "O mesmo processo serve a página e o endpoint para evitar configuração adicional.",
        "O cliente mantém estados claros e usa textContent na lista.",
        "O servidor valida independentemente, responde 201 ou 400 no POST e devolve a lista em GET /api/estudos."
      ],
      "expected": "GET /api/estudos antes de cadastrar: 200 e []. Título vazio: “Informe um título.” e nenhum POST. Título HTML: POST 201, lista ganha HTML e aparece “Salvo com sucesso.”; novo GET retorna o registro."
    },
    "guided": [
      {
        "instruction": "Envie um título válido e observe a aba Rede.",
        "result": "POST /api/estudos, corpo JSON, status 201."
      },
      {
        "instruction": "No Console, consulte fetch('/api/estudos').then(r => r.json()).then(console.log) antes e depois do cadastro.",
        "result": "Antes: []; depois: array com o registro criado."
      },
      {
        "instruction": "Envie espaços apenas.",
        "result": "A interface pede título e não faz requisição."
      },
      {
        "instruction": "Pare o servidor com a página aberta e tente salvar.",
        "result": "A mensagem de erro aparece e o campo mantém o texto."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: se você clicar duas vezes rapidamente em Salvar, quantos registros podem surgir? Depois altere o código para desabilitar o botão durante o POST e reabilitá-lo ao terminar, com sucesso ou falha. Aceite: um clique repetido não cria outro registro; entrada: HTML; saída: um item HTML e botão disponível ao final.",
        "hints": [
          "Guarde referência ao botão.",
          "Use finally para a restauração."
        ],
        "solution": "const botao = document.querySelector('#salvar'); botao.disabled = true; try { /* envio existente */ } catch (erro) { /* mensagem existente */ } finally { botao.disabled = false; }",
        "explanation": "Coloque a desabilitação antes do try e preserve o conteúdo original do envio dentro dele.",
        "expected": "Enquanto aguarda, botão indisponível; ao terminar, disponível.",
        "criteria": ["Botão bloqueia reenvio enquanto POST está pendente.","Sucesso e falha reabilitam o controle e um clique repetido não duplica a ação."]
      },
      {
        "prompt": "Alterar: consulte GET /api/estudos ao abrir a página e mostre uma mensagem para a lista vazia. Diferencie [] de falha da requisição. Aceite: entrada [] → Nenhum estudo cadastrado; erro HTTP → Falha ao carregar.",
        "hints": [
          "Confira resposta.ok antes de usar os dados.",
          "Array vazio é sucesso."
        ],
        "solution": "(async () => { try { const resposta = await fetch('/api/estudos'); if (!resposta.ok) throw new Error('Falha ao carregar'); const itens = await resposta.json(); estado.textContent = itens.length ? 'Estudos carregados.' : 'Nenhum estudo cadastrado.'; } catch { estado.textContent = 'Falha ao carregar.'; } })();",
        "explanation": "Uma resposta válida com zero itens não é erro de rede.",
        "expected": "[] mostra mensagem de vazio, não falha.",
        "criteria": ["Lista vazia e falha HTTP têm estados distintos.","Teste usa [] e erro sem tratar ambos como conteúdo vazio."]
      },
      {
        "prompt": "Construir: no Console da página, escreva uma verificação que envie {titulo:123} à API e compare a quantidade de estudos antes e depois. Aceite: POST retorna 400 com erro e a lista não cresce; entrada: título numérico 123; saída: erro Título inválido.",
        "hints": [
          "A rota já faz typeof titulo.",
          "Teste com fetch usando body JSON.stringify({titulo:123})."
        ],
        "solution": "(async () => { const antes = await (await fetch('/api/estudos')).json(); const resposta = await fetch('/api/estudos', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({titulo:123})}); const erro = await resposta.json(); const depois = await (await fetch('/api/estudos')).json(); console.assert(resposta.status === 400 && depois.length === antes.length, 'Recusa ou lista divergente'); console.log(resposta.status, erro); })().catch(console.error);",
        "explanation": "Execute no Console da página local; a proteção está no servidor.",
        "expected": "400 e {erro:\"Título inválido\"}; nada é adicionado.",
        "criteria": ["Pedido direto inválido retorna 400 e mensagem de erro coerente.","Quantidade da lista é comparada antes e depois e não cresce."]
      },
      {
        "prompt": "Investigar erro: o servidor retorna 400 com JSON, mas a UI diz sucesso. Localize a verificação ausente, corrija e confirme que a lista não muda. Aceite: entrada {titulo:123} → mensagem de erro e nenhum item novo.",
        "hints": [
          "Fetch não rejeita automaticamente por 400.",
          "Leia o corpo e verifique ok."
        ],
        "solution": "const dados = await resposta.json(); if (!resposta.ok) throw new Error(dados.erro || 'Falha ao salvar'); estado.textContent = 'Salvo com sucesso.';",
        "explanation": "O teste deve afirmar que a lista não muda em 400.",
        "expected": "Mensagem de falha e nenhum item novo.",
        "criteria": ["Interface verifica status/erro antes de anunciar sucesso.","Estado da lista permanece igual após a recusa do servidor."]
      }
    ],
    "mistakes": [
      "Aceitar apenas a validação do input e deixar a API aceitar qualquer corpo.",
      "Tratar 400 como sucesso porque fetch não rejeitou.",
      "Limpar o campo após falha, fazendo o usuário perder o trabalho.",
      "Inserir título do usuário via innerHTML."
    ],
    "quiz": [
      {
        "question": "Qual resposta indica criação neste exemplo?",
        "options": [
          "201.",
          "404.",
          "503."
        ],
        "correctIndex": 0,
        "explanation": "A API responde 201 após criar o item."
      },
      {
        "question": "Uma resposta HTTP 400 faz fetch rejeitar automaticamente?",
        "options": [
          "Sim, sempre.",
          "Não; é preciso verificar response.ok.",
          "Somente quando é JSON."
        ],
        "correctIndex": 1,
        "explanation": "Fetch costuma rejeitar por falha de rede, enquanto status HTTP deve ser verificado."
      },
      {
        "question": "Por que o servidor repete a validação?",
        "options": [
          "Porque outro cliente pode chamar a API sem usar o formulário.",
          "Porque o navegador não sabe mostrar mensagens.",
          "Para gravar automaticamente no banco."
        ],
        "correctIndex": 0,
        "explanation": "A API protege seu próprio contrato independentemente do cliente."
      }
    ],
    "summary": [
      "Modele estados de operação e preserve dados ao falhar.",
      "Valide no cliente para orientar e no servidor para proteger o contrato.",
      "Verifique status e corpo separadamente."
    ]
  },
"delivery-security": {
    "prerequisites": "Concluir delivery-http e delivery-forms; para executar o exemplo, concluir a preparação setup-node. Não é preciso construir um sistema de login.",
    "setup": "Na pasta da aula, salve o exemplo como security.js no editor. No terminal aberto nessa pasta, execute node security.js; a saída esperada é 200, 403, 401, em linhas separadas. Para parar, o processo termina sozinho; para retomar, execute o mesmo comando. Se node não for reconhecido, revise setup-node. A atividade só usa Node.js local e não requer serviço externo.",
    "why": "Integração com serviços reais envolve dados e permissões. Um desenvolvedor iniciante deve reconhecer limites seguros antes de colocar chaves ou decisões de acesso no navegador.",
    "sections": [
      {
        "title": "Três perguntas diferentes",
        "paragraphs": [
          "Identificação é informar quem alguém diz ser. Autenticação é verificar essa identidade por um mecanismo confiável. Autorização é decidir se essa pessoa autenticada pode realizar uma ação específica sobre um recurso. Uma interface pode esconder o botão “Editar” para melhorar a experiência, mas o servidor precisa tomar novamente a decisão ao receber a requisição. Caso contrário, basta chamar a rota diretamente.",
          "No exemplo, podeEditar compara id do usuário autenticado com donoId do registro. O código é apenas uma regra isolada, não um login: um objeto {id:2} escrito no cliente não prova identidade. Em um sistema real, o servidor extrai a identidade de uma sessão ou credencial validada, busca a propriedade do recurso e decide. Se a pessoa não está autenticada, o exemplo usa 401; se está autenticada mas não tem permissão, usa 403. O exemplo não recebe requisições HTTP de verdade.",
          "Pausa: preveja as três saídas antes de executar e explique qual informação ainda falta para o objeto {id:2} provar identidade."
        ]
      },
      {
        "title": "Segredos não pertencem ao código entregue",
        "paragraphs": [
          "Todo JavaScript enviado ao navegador pode ser lido por quem acessa a página. Uma variável de ambiente injetada durante um build de frontend também se torna pública se seu valor vai parar no pacote final. Não coloque chaves privadas, senha de banco nem token mestre no HTML, no repositório ou no localStorage. Esses dados pertencem ao ambiente do servidor; o servidor usa a chave para chamar o serviço e retorna apenas o resultado autorizado.",
          "Algumas APIs oferecem chaves públicas destinadas ao navegador, mas isso depende de documentação, escopo e limites explícitos. Não assuma que uma chave é pública porque funciona no browser. Para treinar sem conta externa, use o mock local e uma credencial fictícia de exemplo. Em trabalho real, peça o contrato de autenticação e use os mecanismos aprovados pela equipe.",
          "Pausa: liste dois arquivos públicos do projeto e diga se uma chave privada colocada neles poderia ser lida por quem acessa a página."
        ]
      },
      {
        "title": "CORS não é autenticação",
        "paragraphs": [
          "CORS é uma política aplicada pelo navegador para controlar leitura de respostas entre origens. Se a página está em uma porta e a API em outra, há origens diferentes; o servidor pode responder com os cabeçalhos apropriados para uma origem permitida. O bloqueio do navegador não impede chamadas feitas por clientes que não seguem a mesma política e não substitui autorização.",
          "O laboratório anterior serviu página e API na mesma origem, então não precisou de CORS. Se uma requisição aparecer na Rede mas o navegador disser que a resposta foi bloqueada, confira origem e cabeçalhos da API, inclusive pedido preliminar quando aplicável. Não resolva adicionando permissão irrestrita sem entender quem deve acessar os dados. O local correto da configuração é a API sob controle de quem a mantém.",
          "Pausa: desenhe página → navegador → API e marque em qual ponto CORS limita a leitura da resposta e em qual ponto o servidor decide a permissão."
        ]
      },
      {
        "title": "Validação, saída e mensagens",
        "paragraphs": [
          "O servidor deve validar tipos, comprimentos e permissões de cada operação. A interface também precisa inserir texto de pessoas usuárias como texto, por exemplo com textContent, e evitar transformá-lo em HTML. São proteções em fronteiras distintas: uma cuida da integridade do serviço; outra evita executar marcação não confiável no navegador. A revisão de segurança deve olhar entrada, armazenamento, decisão de acesso e saída.",
          "Quando uma operação falha, o cliente precisa de uma mensagem útil, mas não de stack trace, token, consulta interna ou detalhes de infraestrutura. Registre detalhes no lado apropriado do servidor e apresente um erro compreensível na interface. Segurança não é uma única biblioteca instalada ao final: é uma coleção de decisões verificáveis durante o projeto.",
          "Pausa: para um recurso de outra pessoa, escreva uma mensagem pública curta e indique quais detalhes ficariam apenas no diagnóstico do servidor."
        ]
      },
      {
        "title": "Revisão antes de publicar",
        "paragraphs": [
          "Faça uma lista do que a aplicação publica: código HTML, JavaScript, arquivos de configuração, chamadas de rede e respostas. Procure dados que não deveriam estar ali. Teste pelo menos um acesso negado no servidor e confirme que o recurso não foi modificado. Inspecione o repositório para evitar arquivos de segredo. Descreva no README quais dados o projeto armazena, onde e por quanto tempo.",
          "O objetivo desta aula é reconhecer fronteiras e pedir ajuda quando o desenho de autenticação ultrapassar sua experiência. Implementar autenticação de produção sem orientação especializada é uma tarefa maior. Para entrada no mercado, saber explicar por que um segredo no frontend é exposto e por que 403 deve ser decidido no servidor já evita erros sérios e melhora a colaboração com backend e segurança."
        ]
      }
    ],
    "example": {
      "language": "js",
      "code": "// Arquivo demonstrativo: node security.js\nfunction podeEditar(usuario, registro) {\n  return Boolean(usuario && registro && usuario.id === registro.donoId);\n}\nconst registro = { id: 7, donoId: 2, titulo: 'Plano' };\nfor (const usuario of [{id:2}, {id:9}, null]) {\n  console.log(!usuario ? 401 : podeEditar(usuario, registro) ? 200 : 403);\n}\n// Resultado simulado: 200, 403, 401. Não há servidor nem sessão validada.\n",
      "explanation": [
        "A função ilustra uma regra de autorização sobre um recurso.",
        "A saída 401 para usuário ausente e 403 para não proprietário apenas simula códigos HTTP; este arquivo não cria uma API.",
        "Identidade real precisa ser validada no servidor antes de chamar a regra."
      ],
      "expected": "Três linhas: 200, 403, 401. São códigos simulados, não respostas de um servidor."
    },
    "guided": [
      {
        "instruction": "Troque donoId para 9 e execute novamente.",
        "result": "O segundo usuário passa a ser autorizado."
      },
      {
        "instruction": "Imagine o botão Editar oculto, mas a rota ainda aceita POST.",
        "result": "A interface não protege a operação; o servidor precisa conferir a permissão."
      },
      {
        "instruction": "Liste três dados que nunca devem entrar no HTML público.",
        "result": "Por exemplo senha de banco, token mestre e chave privada de API."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: qual saída o exemplo imprime para null? Depois altere podeEditar para exigir registro existente e ids inteiros. Aceite: entrada {id:2} e {donoId:2} → true; entrada {id:'2'} ou registro ausente → false.",
        "hints": [
          "Valide antes da comparação.",
          "Number.isInteger pode exigir inteiro."
        ],
        "solution": "function podeEditar(usuario, registro) { return Number.isInteger(usuario?.id) && Number.isInteger(registro?.donoId) && usuario.id === registro.donoId; }",
        "explanation": "A regra continua sendo autorização demonstrativa, não autenticação.",
        "expected": "A previsão para null é registrada primeiro; depois, a validação de existência e tipo é conferida com entradas válidas e inválidas.",
        "criteria": ["Previsão da chamada com null anotada antes da mudança.","Regra valida existência e id inteiro antes de permitir edição."]
      },
      {
        "prompt": "Alterar: crie uma tabela com token ausente, usuário autenticado sem permissão e rota inexistente; associe 401, 403 e 404 e explique qual verificação do servidor levou a cada decisão. Aceite: três situações classificadas; entrada: rota inexistente → 404.",
        "hints": [
          "Pense em autenticação, autorização e roteamento.",
          "Use 401, 403, 404."
        ],
        "solution": "Token ausente: 401; autenticado sem permissão: 403; rota inexistente: 404.",
        "explanation": "A escolha precisa refletir o motivo da falha, sujeito ao contrato da API.",
        "expected": "A tabela associa cada resposta à condição verificada no servidor e documenta a decisão sem depender do navegador.",
        "criteria": ["Tabela diferencia 401, 403 e 404 pela autenticação, autorização e existência.","Explica a decisão aplicada no servidor, não pelo CORS."]
      },
      {
        "prompt": "Construir: desenhe o fluxo de uma chamada a serviço externo com chave privada, marcando onde a chave fica e qual resposta chega ao navegador. Aceite: chave só no servidor e retorno limitado aos dados autorizados; entrada: pedido de relatório → saída: relatório sem segredo.",
        "hints": [
          "Tudo no bundle do browser é legível.",
          "O servidor pode mediar a chamada."
        ],
        "solution": "Guardar chave no ambiente do servidor; o backend verifica usuário e permissão, chama o provedor e devolve somente dados autorizados. Nunca enviar a chave ao navegador.",
        "explanation": "Evite registrar ou retornar o segredo em mensagens de erro.",
        "expected": "Plano separa segredo privado e resposta pública.",
        "criteria": ["Chave fica no servidor e não aparece no código/resposta pública.","Resposta contém somente dados autorizados para o pedido."]
      },
      {
        "prompt": "Investigar erro: CORS bloqueia no navegador, mas um cliente de terminal obtém dados privados sem credencial. Identifique a falha e proponha uma segunda verificação pelo servidor. Aceite: resposta distingue CORS de autorização; entrada: pedido sem credencial → saída esperada: acesso negado.",
        "hints": [
          "CORS é política do navegador.",
          "Teste autorização no servidor."
        ],
        "solution": "A API não exige autenticação/autorização; configurar CORS não protege contra outros clientes. Corrigir verificação de identidade e permissão no servidor.",
        "explanation": "A causa de exposição é a falta de controle de acesso, não o cabeçalho de CORS.",
        "expected": "Explicação distingue mecanismo de browser e segurança da API.",
        "criteria": ["Reprodução compara navegador e cliente de terminal.","Proposta inclui autorização no servidor mesmo quando CORS está configurado."]
      }
    ],
    "mistakes": [
      "Tratar CORS como proteção de recursos privados.",
      "Acreditar que esconder um botão impede a chamada direta.",
      "Guardar chave privada em variável incorporada ao bundle do navegador.",
      "Expor stack trace e dados internos nas respostas."
    ],
    "quiz": [
      {
        "question": "Quem deve decidir se um usuário pode editar um registro?",
        "options": [
          "Somente o botão da interface.",
          "O servidor, usando identidade validada e dados do registro.",
          "Uma regra CSS."
        ],
        "correctIndex": 1,
        "explanation": "A chamada pode ser feita sem passar pelo botão."
      },
      {
        "question": "CORS autentica quem chama a API?",
        "options": [
          "Sim.",
          "Não, controla leitura entre origens no navegador.",
          "Somente em localhost."
        ],
        "correctIndex": 1,
        "explanation": "Outros clientes podem chamar a API; autorização é separada."
      },
      {
        "question": "Uma chave privada definida no build do frontend fica secreta?",
        "options": [
          "Sim, se estiver numa variável de ambiente.",
          "Não, se for incorporada ao JavaScript público.",
          "Sim, se for minificada."
        ],
        "correctIndex": 1,
        "explanation": "O pacote entregue ao navegador pode ser inspecionado."
      }
    ],
    "summary": [
      "Autenticação verifica identidade; autorização decide ações.",
      "Segredos e decisões de acesso ficam no servidor.",
      "CORS, validação e segurança de saída resolvem problemas distintos."
    ]
  },
"delivery-environments": {
    "prerequisites": "Concluir delivery-http, delivery-forms e a preparação setup-node; saber localizar index.html e assets/css/global.css no projeto estático.",
    "setup": "Na pasta da aula, salve o exemplo como config.js no editor. No terminal aberto nessa pasta, execute node config.js; a saída esperada é http://127.0.0.1:4178/api. O processo termina sozinho; para retomar, execute o mesmo comando. Se node não for reconhecido, revise setup-node. O exemplo não faz requisições nem publica o projeto; para o exercício de caminhos, abra index.html e a aba Rede do navegador. Publicação remota é opcional.",
    "why": "A aplicação que roda no seu computador pode falhar ao ser publicada por caminhos, configurações ou serviços ausentes. Entender o destino evita prometer que um backend funcionará em hospedagem de arquivos estáticos.",
    "sections": [
      {
        "title": "O que é entregue",
        "paragraphs": [
          "Um site estático entrega arquivos como HTML, CSS, JavaScript e imagens. O navegador executa o JavaScript, mas a hospedagem estática não executa seu processo Node, não salva dados no servidor nem mantém uma API própria. Já uma aplicação com endpoint /api/estudos exige algum processo ou serviço de backend. Se o frontend for para GitHub Pages, o endpoint local 127.0.0.1 não acompanha a publicação; cada visitante apontaria para seu próprio computador.",
          "Faça um inventário dos componentes do projeto: arquivos finais, comando de geração se existir, variáveis públicas, API, armazenamento, domínio e permissões. Um site com dados de demonstração pode funcionar estaticamente. Um formulário que grava registros compartilhados precisa de um serviço remoto apropriado. A escolha da plataforma vem depois de identificar o que deve executar, não antes.",
          "Pausa: para este repositório, encontre index.html e assets/css/global.css; depois indique onde o server.js do laboratório anterior poderia executar."
        ]
      },
      {
        "title": "Desenvolvimento, prévia e produção",
        "paragraphs": [
          "Desenvolvimento é o ambiente em que você altera e depura; prévia permite revisar uma versão candidata; produção serve pessoas reais. As URLs, permissões e dados devem ser configurados para cada ambiente. O código demonstrativo mostra um mapeamento explícito de origem de API. Ele não envia requisições; o domínio .invalid marca uma URL fictícia que precisa ser substituída em uma entrega real.",
          "Uma configuração pública como a URL da API pode estar no frontend. Chave privada e senha não podem. No servidor, variáveis de ambiente ajudam a fornecer configuração sem gravar segredo no código. Ainda assim é preciso cuidar de logs, permissões e acesso ao ambiente. Documente quais valores são obrigatórios, seus nomes e o que fazer se faltarem; não publique valores verdadeiros no README.",
          "Na Vercel, os ambientes padrão são Local, Preview e Production. Uma matriz de configuração deve registrar, para cada valor, se o navegador pode recebê-lo, onde o servidor o lê e qual serviço de teste ou produção ele usa. Arquivos locais como `.env.local` devem ficar fora do Git; configure também o escopo correspondente no painel da hospedagem.",
          "Uma variável alterada no painel passa a valer em deployments novos; crie um novo deploy para conferir a mudança. Em um projeto Vercel recém-criado, a primeira publicação é classificada como Production, então não presuma que uma branch torna esse primeiro deploy uma prévia. Use dados e credenciais fictícios ou de teste ao aprender.",
          "Se `main` estiver definida como Production Branch, commits nela geram deployments Production e usam as variáveis de Production. Para um Preview, publique um commit de uma branch diferente, como `testes`; essa branch recebe as variáveis de Preview. O botão de redeploy serve para gerar outra implantação do deployment selecionado, não para transformar a publicação de `main` em Preview.",
          "Pausa: preveja o resultado de obterApi('producao') e de obterApi('teste') antes de executar. A URL .invalid é apenas um marcador."
        ]
      },
      {
        "title": "Construção e caminhos",
        "paragraphs": [
          "Em uma aplicação de HTML puro, publicar pode significar copiar o index.html e arquivos de apoio. Em projetos com ferramenta de build, o código fonte é transformado em uma pasta de saída; é essa saída que deve ser implantada. Verifique links relativos, nome e caixa das letras dos arquivos e caminhos quando a aplicação está em uma subpasta. Um caminho que funciona na raiz local pode quebrar em /nome-do-repositorio/.",
          "Repita o mesmo comando de build ou preparação antes de entregar. Confirme que arquivos esperados existem e que nenhum arquivo temporário ou secreto entrou na saída. Faça uma checagem móvel, teclado e carregamento em uma URL de prévia. A entrega termina quando o comportamento foi observado no endereço final, não quando o botão “Deploy” foi clicado.",
          "Pausa: compare assets/css/global.css com /assets/css/global.css quando index.html está em /tech-learning-hub/. Qual URL cada caminho pede?"
        ]
      },
      {
        "title": "Dependências entre frontend e API",
        "paragraphs": [
          "Se a interface usa serviço remoto, confira URL, HTTPS quando a página usa HTTPS, autenticação exigida, CORS, formato JSON e políticas de erro. Um endereço local de desenvolvimento não serve como URL de produção. Mudanças de ambiente também podem alterar dados e latência; teste carregamento, lista vazia, sucesso, validação e falha. Uma demonstração estática com mock deve ser apresentada honestamente como demo.",
          "Não configure permissões amplas só para “fazer funcionar”. Se a API for de outra equipe, peça a origem permitida e o contrato. Se houver dados de pessoas, analise o que pode ser exibido publicamente. Publique apenas depois de revisar o conteúdo e os limites do projeto; para este laboratório, a publicação real é opcional e todo aprendizado essencial pode ser feito localmente.",
          "Pausa: desenhe navegador → frontend publicado → API e marque onde um endereço 127.0.0.1 apontaria para cada visitante."
        ]
      },
      {
        "title": "Verificação e retorno",
        "paragraphs": [
          "Prepare uma ficha de entrega: versão ou commit, endereço de prévia, comandos executados, resultados, variáveis necessárias, mudanças de dados e pessoa responsável. Após publicar, abra a URL final em sessão limpa, veja Console e Rede e complete um fluxo importante. Guarde uma versão conhecida que funciona. Se a nova versão quebrar, restaure a anterior e investigue antes de tentar novamente.",
          "Uma boa comunicação informa o impacto: “o formulário abre, mas o POST retorna 403 em produção; a origem da API precisa ser autorizada”. Isso permite que outras pessoas ajudem. Evite “funciona na minha máquina” como conclusão. A competência é identificar o que o ambiente muda e comprovar que o comportamento principal permanece correto no destino."
        ]
      }
    ],
    "example": {
      "language": "js",
      "code": "// config.js: configuração pública do navegador\nconst configuracoes = {\n  desenvolvimento: { api: 'http://127.0.0.1:4178/api' },\n  producao: { api: 'https://api.exemplo.invalid/v1' }\n};\nfunction obterApi(ambiente) {\n  if (!Object.hasOwn(configuracoes, ambiente)) throw new Error('Ambiente desconhecido');\n  return configuracoes[ambiente].api;\n}\nconsole.log(obterApi('desenvolvimento'));\n// O domínio .invalid é ilustrativo; nenhuma requisição é feita.\n",
      "explanation": [
        "A função seleciona configuração pública por ambiente.",
        "Ambiente desconhecido gera erro explícito.",
        "O domínio fictício é um marcador para o planejamento, não um serviço funcional."
      ],
      "expected": "Imprime http://127.0.0.1:4178/api."
    },
    "guided": [
      {
        "instruction": "Execute obterApi(\"producao\") sem chamar fetch.",
        "result": "Retorna URL ilustrativa com domínio .invalid."
      },
      {
        "instruction": "Chame obterApi(\"teste\").",
        "result": "Lança erro Ambiente desconhecido."
      },
      {
        "instruction": "Anote qual parte do projeto rodaria no GitHub Pages.",
        "result": "HTML/CSS/JS estáticos; não o servidor Node local."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: se index.html abrir em /tech-learning-hub/, onde o navegador procurará assets/css/global.css? Depois escreva três itens de checklist para validar a publicação. Aceite: indicar o caminho esperado e registrar endereço final, carregamento dos arquivos e interação por teclado.",
        "hints": [
          "Inclua endereço final e caminhos.",
          "Inclua teste de interação e acessibilidade."
        ],
        "solution": "O caminho relativo aponta para /tech-learning-hub/assets/css/global.css. 1. Abrir URL final em janela limpa e verificar assets/Console. 2. Testar navegação, formulário local e largura móvel. 3. Conferir foco e nomes acessíveis nos controles.",
        "explanation": "O checklist observa o produto no destino real.",
        "expected": "Três verificações concretas, com resultado registrado.",
        "criteria": ["Caminho de assets considera publicação em subpasta.","Checklist registra URL final, resposta dos arquivos e operação por teclado."]
      },
      {
        "prompt": "Alterar: no plano de entrega, o frontend está no GitHub Pages e a API apenas em 127.0.0.1 do desenvolvedor. Ajuste o plano para não prometer gravação compartilhada. Aceite: explicar o destino de 127.0.0.1 e escolher API hospedada ou demonstração rotulada; entrada: visitante envia formulário → saída: comportamento descrito sem promessa falsa.",
        "hints": [
          "127.0.0.1 significa o computador de quem visita.",
          "Hospedagem estática não executa Node."
        ],
        "solution": "Não. É preciso publicar a API em hospedagem de backend ou trocar por demonstração sem gravação remota, identificada como tal.",
        "explanation": "A arquitetura deve corresponder à promessa de comportamento.",
        "expected": "Resposta explica por que URL local não funciona para visitantes.",
        "criteria": ["Plano não promete compartilhamento por localhost.","Seleciona API hospedada ou demonstração com limite explícito."]
      },
      {
        "prompt": "Construir: monte uma matriz Local, Preview e Production para frontend, API e Supabase. Use somente nomes de configuração e marcadores fictícios; indique quais valores podem chegar ao navegador e quais ficam no servidor. Inclua uma forma de manter `.env.local` fora do Git e um passo para aplicar uma alteração feita no painel Vercel.",
        "hints": [
          "Separe URL e chave publicável de senha, token e chave secreta.",
          "Preview deve apontar para serviço e dados de teste; Production usa os valores do ambiente real.",
          "Alterar uma variável no painel exige um novo deployment para testar o valor."
        ],
        "solution": "A matriz pode listar `API_URL` por ambiente; configuração publicável do navegador em cada ambiente; e segredos de servidor separados por ambiente, sem valores colados no documento. Local usa `.env.local` ignorado pelo Git; Preview usa uma branch e recursos de teste; Production recebe os valores reais apenas no painel. Depois de mudar uma variável na Vercel, crie um novo deployment e confira o comportamento na URL correspondente.",
        "explanation": "A mesma aplicação pode acessar serviços e dados diferentes conforme o ambiente; uma matriz ajuda a revisar escopo e exposição antes de publicar.",
        "expected": "Uma tabela com os três ambientes, classificação pública/servidor, separação de serviços de teste e produção e novo deploy após alterar variável.",
        "criteria": ["Local, Preview e Production têm propósitos distintos e valores identificados por escopo.","Segredos permanecem no servidor e não aparecem em HTML, JavaScript público ou documentação.","Preview usa valores de teste e a alteração de variável é validada em deployment novo."]
      },
      {
        "prompt": "Investigar erro: o CSS deste projeto retorna 404 quando index.html é publicado em /tech-learning-hub/. O link foi alterado para /assets/css/global.css. Escreva hipótese, correção e verificação na aba Rede. Aceite: entrada caminho absoluto → 404; saída com caminho relativo → CSS 200.",
        "hints": [
          "Compare a URL pedida em Rede com a pasta real.",
          "Caminho absoluto /style.css aponta para raiz do domínio."
        ],
        "solution": "Hipótese: href=\"/assets/css/global.css\" procura na raiz do domínio. Se index.html está em /tech-learning-hub/, usar href=\"assets/css/global.css\" e confirmar 200 em Rede no endereço publicado.",
        "explanation": "Teste antes e depois no endereço publicado; avalie também outros assets.",
        "expected": "CSS carrega 200 e a aparência volta.",
        "criteria": ["Hipótese de caminho absoluto é comparada com caminho relativo.","Aba Rede confirma CSS 200 na subpasta e aparência restaurada."]
      }
    ],
    "mistakes": [
      "Achar que hospedagem estática executa servidor Node.",
      "Manter URL localhost na configuração publicada.",
      "Publicar sem abrir o endereço final e testar fluxo completo.",
      "Gravar segredos no frontend por serem chamados de variáveis de ambiente.",
      "Usar recursos de produção como se fossem dados descartáveis numa prévia ou no primeiro deployment Vercel."
    ],
    "quiz": [
      {
        "question": "GitHub Pages executa o server.js do laboratório?",
        "options": [
          "Sim, automaticamente.",
          "Não, é hospedagem de site estático.",
          "Só quando há arquivo package.json."
        ],
        "correctIndex": 1,
        "explanation": "O processo Node precisa de hospedagem própria para backend."
      },
      {
        "question": "Uma URL 127.0.0.1 no site público aponta para onde?",
        "options": [
          "Servidor do projeto.",
          "Computador da pessoa que acessa.",
          "GitHub."
        ],
        "correctIndex": 1,
        "explanation": "Loopback é local para cada cliente."
      },
      {
        "question": "Quando termina a verificação de uma publicação?",
        "options": [
          "Após clicar em publicar.",
          "Depois de testar a URL final e os fluxos importantes.",
          "Quando o build termina, mesmo sem abrir a página."
        ],
        "correctIndex": 1,
        "explanation": "O destino real precisa ser observado."
      }
    ],
    "summary": [
      "Inventarie arquivos, API e dados antes de escolher hospedagem.",
      "Local, Preview e Production podem usar valores e serviços diferentes; segredos não entram no frontend.",
      "Depois de alterar variáveis na Vercel, crie um deployment novo para observar a configuração aplicada.",
      "Teste o comportamento na URL final e prepare uma versão recuperável."
    ]
  },
  "delivery-oauth-google": {
    "prerequisites": "Concluir delivery-environments e saber distinguir navegador, aplicação, serviço externo e variável de ambiente. Não é necessário criar credenciais Google, comprar domínio ou alterar configurações de produção.",
    "setup": "Use como diagrama de referência o fluxo do site: Preview Vercel → Clerk → Google → callback do Clerk → retorno ao Preview. Para estudar, não copie tokens nem segredos. No ambiente de desenvolvimento do Clerk, a conexão Google compartilhada pode permitir o fluxo sem credenciais próprias; os detalhes dependem da instância atual. Se a equipe configurar credenciais próprias em outro ambiente, obtenha os valores atuais no painel Clerk e no Google Cloud Console. O URI autorizado no Google deve ser exatamente o callback informado pelo Clerk. A URL de retorno da aplicação é outra configuração. Não crie curingas nem invente URLs.",
    "why": "Um botão “Entrar com Google” encadeia provedores e redirecionamentos. Separar autenticação, autorização, OAuth 2.0, OpenID Connect e os dois tipos de URL de retorno facilita diagnosticar falhas sem expor credenciais nem confundir a sessão da aplicação com acesso aos dados.",
    "example": {
      "language": "text",
      "code": "1. Pessoa abre o Preview Vercel e escolhe entrar com Google.\n2. O navegador segue para o fluxo de autenticação do Clerk.\n3. Clerk inicia OAuth 2.0/OIDC com o Google.\n4. Google autentica a pessoa e retorna ao callback exato do Clerk.\n5. Clerk valida a resposta, associa a identidade e cria/recupera uma sessão Clerk.\n6. Clerk redireciona para uma URL permitida do Preview.\n7. A aplicação consulta a sessão Clerk; chamadas ao Supabase ainda dependem de token e políticas RLS.\n\nGoogle callback ≠ URL de retorno da aplicação.\nOAuth 2.0 trata autorização delegada; OIDC acrescenta identidade/autenticação.\nO Clerk administra state, nonce e detalhes do protocolo no fluxo integrado.",
      "expected": "O estudante consegue narrar cada salto, nomear o callback do Clerk e a URL de retorno ao Preview como destinos diferentes, e explica que login bem-sucedido não concede automaticamente acesso a linhas do Supabase.",
      "explanation": [
        "OAuth 2.0 define mecanismos de autorização delegada. O OpenID Connect (OIDC) é uma camada de identidade sobre OAuth 2.0 usada para comunicar quem autenticou, além de dados básicos do fluxo.",
        "Na integração Clerk–Google, Google devolve a resposta ao endpoint callback controlado pelo Clerk. Depois de processar o callback, Clerk volta à aplicação em um destino permitido. Esse destino não substitui o callback cadastrado no provedor.",
        "`state` vincula a resposta ao pedido iniciado e ajuda contra falsificação de requisição; `nonce` vincula a resposta de identidade ao pedido e ajuda contra repetição. Use a integração gerenciada do Clerk em vez de reimplementar o protocolo no frontend.",
        "O token Google, a sessão Clerk e a credencial usada pela integração com Supabase são estados/credenciais distintos, emitidos para finalidades e consumidores diferentes. Não os troque nem os registre em logs.",
        "Um Preview Vercel já tem hostname HTTPS `vercel.app`. O hostname pode variar entre deployments; não é necessário possuir domínio próprio para estudar o fluxo."
      ]
    },
    "sections": [
      {
        "title": "Identidade, autorização e protocolos",
        "paragraphs": [
          "Autenticação responde “quem está entrando?”; autorização responde “o que esta identidade pode fazer?”. Um provedor pode confirmar uma identidade, mas a aplicação e o banco ainda precisam aplicar suas próprias regras de acesso.",
          "OAuth 2.0 é uma estrutura para conceder acesso delegado a recursos. O OpenID Connect (OIDC) define uma camada de identidade sobre OAuth 2.0, com mensagens e um ID token para comunicar a autenticação. Na expressão comum “login social”, OIDC costuma ser a parte de identidade do fluxo.",
          "Pausa: se o Google confirma uma pessoa, isso significa que ela pode ler qualquer linha da tabela `learning_state`? Justifique separando identidade de autorização."
        ],
        "terms": [
          { "term": "Autenticação", "meaning": "Verificação da identidade apresentada por uma pessoa ou sistema." },
          { "term": "Autorização", "meaning": "Decisão sobre quais recursos ou ações uma identidade pode acessar." },
          { "term": "OAuth 2.0", "meaning": "Protocolo de autorização delegada; sozinho, não deve ser descrito como protocolo de identidade." },
          { "term": "OpenID Connect (OIDC)", "meaning": "Camada de identidade construída sobre OAuth 2.0, usada para comunicar uma autenticação." }
        ]
      },
      {
        "title": "Acompanhar o caminho pelo Clerk",
        "paragraphs": [
          "O navegador começa no Preview e abre a experiência de login do Clerk. Clerk encaminha a pessoa ao Google; depois, o Google envia o resultado ao callback do Clerk. Clerk valida a resposta, cria ou recupera uma sessão e redireciona a pessoa de volta para a aplicação.",
          "O Clerk administra `state`, `nonce`, validação e outros detalhes do fluxo integrado. A aplicação deve usar as APIs oficiais do Clerk e evitar montar manualmente URLs de autorização ou copiar tokens para o console.",
          "Pausa: indique qual sistema recebe a resposta do Google e qual sistema apresenta a sessão para a aplicação."
        ],
        "diagramTitle": "Login social mediado pelo Clerk",
        "diagram": "Navegador no Preview Vercel\n        │ iniciar login\n        ▼\nClerk ── redireciona ──▶ Google\n  ▲                         │\n  └── callback do Clerk ◀───┘\n        │ valida resposta e abre sessão Clerk\n        ▼\nURL permitida de retorno da aplicação no Preview\n        │ sessão autenticada; autorização ainda é verificada\n        ▼\nAplicação → Supabase com integração e RLS",
        "terms": [
          { "term": "Provedor de identidade (IdP)", "meaning": "Serviço que autentica a pessoa e comunica informações de identidade a outro sistema." },
          { "term": "Callback", "meaning": "Endpoint do provedor que recebe a resposta do fluxo iniciado; neste arranjo, é fornecido pelo Clerk para cadastrar no Google." },
          { "term": "Sessão Clerk", "meaning": "Estado de autenticação mantido pelo Clerk para a aplicação; não é a senha Google nem o token OAuth do Google." }
        ]
      },
      {
        "title": "Separar callback, origem e destino de retorno",
        "paragraphs": [
          "A origem do app é o endereço de onde a interface é carregada. O callback do Google é o URI ao qual o Google devolve a resposta de login, e deve ser copiado exatamente do painel Clerk quando forem usadas credenciais próprias. A URL de retorno da aplicação é o destino para o qual Clerk navega depois de processar essa resposta.",
          "Esses endereços podem pertencer a serviços e ambientes diferentes. Não use a URL Preview como callback do Google só por ser a página aberta no navegador. Em erro `redirect_uri_mismatch`, compare o URI enviado com o URI autorizado no Google Cloud e confirme que o painel Clerk está usando o mesmo conjunto de credenciais. Não tente adivinhar host, caminho ou barra final.",
          "Deployments Preview podem receber hostnames próprios. Para esta formação, trabalhe com o hostname Preview existente e as configurações de retorno disponíveis no Clerk; não exija domínio personalizado nem configure curingas amplos."
        ],
        "terms": [
          { "term": "Origem (origin)", "meaning": "Combinação de esquema, hostname e porta usada para identificar a origem web, por exemplo uma URL HTTPS do Preview." },
          { "term": "URI de redirecionamento (redirect URI)", "meaning": "Destino exato cadastrado para receber uma resposta de autenticação. Neste fluxo, o cadastro no Google aponta ao callback do Clerk." },
          { "term": "URL de retorno da aplicação", "meaning": "Rota permitida para onde Clerk envia o navegador após concluir o callback." },
          { "term": "`redirect_uri_mismatch`", "meaning": "Erro que indica diferença entre o URI efetivamente usado e os destinos autorizados no cliente OAuth." }
        ]
      },
      {
        "title": "Consentimento, escopos e fronteira com o Supabase",
        "paragraphs": [
          "Um escopo descreve uma categoria de acesso solicitada. Para a identidade básica, os nomes OIDC comuns são `openid`, `profile` e `email`; peça `profile` ou `email` apenas se a aplicação precisar desses dados. Não adicione permissões de Drive ou outros produtos se o curso não os usa. O conjunto efetivo depende da conexão e do que a aplicação realmente consome.",
          "Quando o projeto controla seu próprio cliente OAuth, a tela de consentimento identifica o app e informa que dados/escopos são pedidos; configurações podem incluir nome, contato, audiência e escopos, e as exigências de teste ou revisão dependem do modo e das permissões atuais. A pessoa pode já ter consentido antes, então a tela não necessariamente aparece em cada login. Com credenciais compartilhadas do Clerk Development, a tela pode refletir a aplicação de desenvolvimento gerenciada; não é necessário criar uma tela própria para este curso.",
          "No Clerk Development, a integração social pode usar credenciais compartilhadas gerenciadas, conforme a configuração atual do serviço. Para credenciais próprias em outro ambiente, siga o callback exato exibido pelo Clerk e guarde o segredo no local de configuração seguro do Clerk. Nunca coloque client secret em `.env.example` público, HTML, JavaScript entregue ao navegador, commit, captura de tela ou mensagem.",
          "Entrar com Google prova que o Clerk autenticou a pessoa. Para acessar o Supabase, o cliente precisa obter a credencial prevista pela integração Clerk–Supabase e o PostgreSQL deve aplicar RLS. O token, a sessão e a regra de propriedade são camadas separadas. A aula é conceitual: não altera credenciais, produção, domínio ou política do banco."
        ],
        "terms": [
          { "term": "Escopo (scope)", "meaning": "Permissão solicitada a um provedor para uma classe de informação ou ação." },
          { "term": "Consentimento", "meaning": "Decisão da pessoa sobre os dados e permissões solicitados; a tela identifica quem pede acesso e não precisa reaparecer a cada login." },
          { "term": "`state`", "meaning": "Valor imprevisível associado à solicitação e verificado no retorno para correlacionar o fluxo e reduzir ataques de falsificação." },
          { "term": "`nonce`", "meaning": "Valor associado ao pedido OIDC e verificado na resposta de identidade para vincular a resposta ao início do fluxo." },
          { "term": "RLS", "meaning": "Políticas do banco que filtram operações por identidade/contexto; login por si só não substitui essas políticas." }
        ]
      }
    ],
    "guided": [
      { "instruction": "Leia o diagrama da aula e aponte quem inicia o fluxo, quem autentica a pessoa, quem recebe o callback e quem cria a sessão consumida pelo app.", "result": "O navegador inicia; Google autentica; o callback retorna ao Clerk; Clerk processa a resposta e fornece uma sessão à aplicação." },
      { "instruction": "Compare os destinos hipotéticos `https://<clerk-host>/v1/oauth_callback` e `https://<preview>.vercel.app/`. Classifique callback Google, retorno da aplicação ou exemplo que precisa ser confirmado no painel.", "result": "O callback Google é o URI exato mostrado pelo Clerk; o hostname Preview é a origem e pode ser o destino da aplicação se estiver autorizado. O placeholder não deve ser cadastrado como valor real." },
      { "instruction": "Para uma aplicação que só precisa identificar e exibir nome/e-mail, liste os escopos mínimos `openid`, `profile`, `email` conforme o uso, e indique o que uma tela de consentimento deve deixar claro.", "result": "Solicite apenas os escopos necessários; a pessoa deve ver qual app pede acesso e que dados são solicitados. Permissões de Drive ou acesso amplo não relacionado seriam excessivos." }
    ],
    "mistakes": [
      "Tratar OAuth 2.0 e OIDC como sinônimos ou dizer que OAuth sozinho prova a identidade.",
      "Cadastrar o hostname do Preview como callback Google sem consultar o callback que Clerk fornece.",
      "Confundir callback do provedor com a rota de retorno da aplicação depois do login.",
      "Atribuir `redirect_uri_mismatch` ao DNS antes de comparar os URIs e as credenciais selecionadas.",
      "Supor que uma sessão Clerk autoriza automaticamente qualquer consulta ao Supabase.",
      "Pedir escopos amplos ou publicar o segredo de cliente no código do navegador."
    ],
    "exercises": [
      {
        "prompt": "Prever: o navegador está em `https://<preview>.vercel.app/`. Google retorna a resposta ao callback indicado no painel Clerk; após processar a resposta, Clerk volta ao Preview. Qual URL deve ser cadastrada como callback no cliente Google? Explique por que as duas URLs não são equivalentes.",
        "expected": "O callback cadastrado no Google é o URI exato fornecido pelo Clerk. O Preview pode ser origem e destino de retorno da aplicação, mas não substitui o endpoint callback do Clerk.",
        "criteria": ["Identifica Clerk como receptor da resposta do Google.", "Distingue callback de origem e destino da aplicação.", "Não transforma placeholders em URIs reais."],
        "solution": "Copie do painel Clerk o callback referente à conexão/ambiente e cadastre esse URI exato no cliente Google correspondente. Configure separadamente no Clerk o retorno permitido para o hostname Preview atual.",
        "explanation": "O Google devolve o resultado ao componente que iniciou e processa a integração social. Clerk então gerencia a sessão e navega de volta ao app.",
        "hints": ["Siga a seta de retorno imediatamente após a etapa do Google.", "O navegador estar no Preview não faz o Preview receber o callback do provedor."]
      },
      {
        "prompt": "Alterar: a URL Preview do deployment muda de `https://<preview-antigo>.vercel.app` para `https://<preview-novo>.vercel.app`. Explique o que revisar no Clerk e o que não deve ser trocado no cliente OAuth Google sem evidência do painel.",
        "expected": "Revisa a origem e o destino de retorno permitidos no Clerk para o Preview novo. Mantém o callback Google informado pelo Clerk, salvo se o painel mostrar que o callback/ambiente mudou; confirma o cliente de credenciais associado.",
        "criteria": ["Atualiza a configuração de retorno do app conforme necessário.", "Não substitui callback Google pelo hostname do Preview.", "Compara o ambiente e cliente de credenciais no Clerk."],
        "solution": "No Clerk, confirme quais hostnames de Preview são permitidos como origem/retorno e atualize-os conforme as regras atuais do projeto. No Google Cloud, compare o callback que o Clerk mostra para a conexão usada; não invente uma URI com o hostname novo.",
        "explanation": "URL de deployment e callback do provedor têm proprietários e funções diferentes. Um deployment novo pode mudar o destino do navegador sem necessariamente mudar o callback gerenciado pelo Clerk.",
        "hints": ["Separe o endereço exibido na barra do navegador do endereço que recebe o retorno Google.", "Consulte o estado atual do painel antes de mudar credenciais OAuth."]
      },
      {
        "prompt": "Construir: desenhe uma tabela de fluxo com as colunas etapa, emissor, destinatário, finalidade, credencial/estado e escopo consentido. Inclua Preview, Clerk, Google, callback, retorno ao app e leitura do Supabase; marque quais permissões ainda precisam ser verificadas por RLS.",
        "expected": "A tabela separa o redirecionamento de login, callback Google→Clerk, retorno Clerk→Preview, sessão Clerk e acesso a dados via integração; registra que consentimento cobre apenas os escopos pedidos e que RLS decide acesso às linhas.",
        "criteria": ["Representa todas as etapas e direções do fluxo.", "Não reutiliza token Google como sessão Clerk ou token Supabase.", "Registra o escopo de consentimento e que login não comprova autorização de dados."],
        "solution": "Exemplo resumido: Preview inicia login com Clerk; Clerk redireciona ao Google; Google autentica e pede consentimento apenas para os escopos configurados; retorna ao callback exato Clerk; Clerk valida e estabelece sessão; retorna ao Preview permitido; app obtém token apropriado para a integração; Supabase avalia RLS para cada operação.",
        "explanation": "A tabela torna explícito quem emite cada credencial e onde a decisão de autorização acontece.",
        "hints": ["Anote uma seta por requisição ou redirecionamento.", "Inclua a política do banco como uma decisão separada da sessão de login."]
      },
      {
        "prompt": "Investigar erro: o usuário vê `redirect_uri_mismatch` depois de escolher Google no Preview. Sem mudar DNS nem publicar segredos, liste evidências e uma ordem de verificação para localizar a diferença.",
        "expected": "Compara URI enviado e autorizado byte a byte, verifica o callback atual no painel Clerk, confirma o cliente Google e ambiente que Clerk usa, e revisa separadamente a URL de retorno do app. Não altera registros DNS nem publica o segredo.",
        "criteria": ["Começa pela comparação exata dos URIs e ambiente/cliente.", "Diferencia callback Google de URL retorno da aplicação.", "Não recomenda curinga, segredo no frontend ou mudança DNS sem evidência."],
        "solution": "Registre apenas host e caminho não sensíveis; abra a configuração da conexão no Clerk e copie o callback exibido; confirme que o cliente OAuth Google associado autorizou exatamente esse URI e que o deployment usa a configuração esperada. Depois confira a allowlist de retorno do app. Guarde o segredo no serviço e revise logs sem tokens.",
        "explanation": "O erro informa divergência de URI no protocolo. Uma tela de callback ou autorização não prova problema de resolução DNS.",
        "hints": ["Compare esquema, hostname, caminho e barra final sem tentar valores aleatórios.", "Confira qual provedor entrega a mensagem e qual URL ele esperava receber."]
      }
    ],
    "quiz": [
      { "question": "No fluxo Clerk + Google, qual endereço o Google usa para devolver a resposta do login?", "options": ["O callback exato fornecido pelo Clerk.", "Sempre a raiz do Preview Vercel.", "O domínio do banco Supabase."], "correctIndex": 0, "explanation": "O callback é o URI do componente integrado que recebe e processa a resposta Google." },
      { "question": "Qual diferença descreve melhor OAuth 2.0 e OIDC?", "options": ["São nomes diferentes para DNS.", "OAuth 2.0 trata autorização delegada; OIDC acrescenta uma camada de identidade.", "OIDC é uma política RLS do PostgreSQL."], "correctIndex": 1, "explanation": "OIDC usa OAuth 2.0 como base e padroniza informações de autenticação/identidade." },
      { "question": "Uma sessão Clerk garante leitura de qualquer registro Supabase?", "options": ["Sim, login concede acesso total ao banco.", "Não; a integração precisa enviar a credencial adequada e o banco aplica RLS.", "Sim, desde que o usuário use Google."], "correctIndex": 1, "explanation": "Autenticação e autorização são decisões distintas; a política RLS protege os registros." },
      { "question": "Ao mudar o Preview, qual prática é segura?", "options": ["Trocar o callback Google para qualquer hostname recém-gerado.", "Revisar a URL de retorno permitida no Clerk e confirmar o callback atual antes de alterar o cliente Google.", "Adicionar um curinga amplo e publicar o segredo no frontend."], "correctIndex": 1, "explanation": "Cada URI tem uma finalidade e uma fonte de configuração; use valores atuais dos painéis e mantenha segredos fora do navegador." },
      { "question": "O que uma tela de consentimento OAuth deve explicar à pessoa?", "options": ["Quem pede acesso e quais dados/permissões foram solicitados.", "A senha Google e o segredo do cliente.", "Que o login concede acesso irrestrito ao banco da aplicação."], "correctIndex": 0, "explanation": "Consentimento trata da autorização para os escopos solicitados; não compartilhe credenciais nem confunda com permissões internas do banco." }
    ],
    "summary": [
      "Autenticação identifica a pessoa; autorização decide quais recursos pode usar.",
      "OAuth 2.0 é autorização delegada; OIDC acrescenta identidade/autenticação.",
      "O Google retorna ao callback exato do Clerk; Clerk depois redireciona à URL permitida da aplicação.",
      "`state`, `nonce` e a validação do fluxo devem ficar sob a integração gerenciada; não reimplemente nem registre tokens.",
      "Login social não substitui token de acesso Supabase nem RLS. O hostname Preview basta para estudar; domínio próprio e validação de credenciais não são necessários nesta aula."
    ]
  },
  "delivery-clerk-supabase": {
    "prerequisites": "Concluir `delivery-oauth-google`, `delivery-environments` e o fundamento de tabela e chave primária em Database. Ler `docs/CONFIGURAR_SUPABASE.md`, `supabase/learning-state.sql` e `assets/js/cloud.js`. A aula usa IDs fictícios e análise de código; não exige conta, domínio ou alteração no Supabase remoto.",
    "setup": "No editor, abra os três arquivos citados e compare o SQL, o pedido HTTP REST e o token de sessão enviado. Não abra nem copie valores de `.env`; `.env.example` contém somente marcadores públicos/fictícios. Use `user_demo_A` e `user_demo_B` como IDs hipotéticos. Esta atividade não executa consultas, não altera políticas ou dados remotos e não comprova a configuração do seu projeto.",
    "why": "Uma autenticação identifica quem fez o pedido; autorização decide quais linhas essa identidade pode acessar. A validação do token e as políticas no PostgreSQL protegem a API mesmo quando alguém modifica o corpo ou a URL no navegador.",
    "example": {
      "language": "sql",
      "code": "-- Contrato reduzido de supabase/learning-state.sql\nalter table public.learning_state enable row level security;\nrevoke all on table public.learning_state from anon, authenticated;\ngrant select, insert, update on public.learning_state to authenticated;\n\ncreate policy \"read own learning state\"\non public.learning_state for select to authenticated\nusing ((select auth.jwt()->>'sub') = user_id);\n\ncreate policy \"create own learning state\"\non public.learning_state for insert to authenticated\nwith check ((select auth.jwt()->>'sub') = user_id);\n\ncreate policy \"update own learning state\"\non public.learning_state for update to authenticated\nusing ((select auth.jwt()->>'sub') = user_id)\nwith check ((select auth.jwt()->>'sub') = user_id);",
      "expected": "A conta A pode ler, criar e atualizar a linha cujo `user_id` corresponde ao `sub` do token validado. A conta B não vê nem altera essa linha; inserir ou atualizar atribuindo o ID de outra pessoa falha na verificação da política. `anon` não tem grants e exclusão não foi concedida.",
      "explanation": [
        "A conexão nativa registra Clerk como provedor de autenticação de terceiros no Supabase. Supabase valida o token assinado de sessão Clerk; isso não cria nem sincroniza uma linha correspondente em `auth.users`.",
        "O claim `sub` identifica o usuário Clerk. Como o ID Clerk é texto, o esquema usa `user_id text` e compara com `(select auth.jwt()->>'sub')`; não converta esse identificador para UUID nem use `auth.uid()` como se fosse um ID Supabase Auth.",
        "`USING` limita quais linhas existentes a operação pode localizar. `WITH CHECK` valida os valores da linha nova ou da linha resultante. Para `UPDATE`, as duas verificações impedem editar linha alheia ou transferir a propriedade.",
        "Grants e políticas têm funções distintas: o grant autoriza a role Postgres a tentar uma operação na tabela; a política restringe linhas. Ambas as camadas precisam ser coerentes.",
        "O código atual envia a URL Supabase e a chave `sb_publishable_...` no cabeçalho `apikey`, e o token da sessão Clerk no `Authorization: Bearer ...`. A página usa REST diretamente; não instala `@supabase/supabase-js`.",
        "Chaves publicáveis do Clerk e Supabase podem chegar ao navegador conforme a documentação; elas não substituem autorização. `CLERK_SECRET_KEY`, `sb_secret_...`, `service_role` e senha de banco ficam no servidor ou painel seguro. Chave secreta pode contornar RLS e nunca deve entrar no bundle/browser.",
        "A integração nativa evita compartilhar a chave JWT secreta do Supabase e usar o template JWT legado do Clerk. Uma chave `user_id` enviada pelo cliente serve como dado a comparar, nunca como prova de identidade."
      ]
    },
    "sections": [
      {
        "title": "Quem emite e quem valida o token",
        "paragraphs": [
          "O Clerk autentica a pessoa e emite um token de sessão assinado. Ao habilitar Clerk como provedor de terceiros no Supabase, Supabase passa a validar tokens dessa instância e reconhece a role de banco apropriada. A aplicação encaminha o token atual como bearer token nas chamadas; o banco recebe claims verificados, entre eles `sub`, que identifica a conta Clerk.",
          "A integração nativa não sincroniza usuários entre Clerk e Supabase Auth. A tabela deste curso guarda o `user_id` Clerk como texto, sem criar usuário em `auth.users`. O token também não contém a regra completa da aplicação: a RLS avalia cada operação no banco.",
          "O repositório usa a API REST do Supabase diretamente em `cloud.js`: manda `apikey` pública e `Authorization: Bearer` com token da sessão Clerk. Uma biblioteca cliente oficial pode oferecer outra interface ao mesmo serviço, mas este site não precisa ser convertido nem ganhar dependência para estudar o contrato.",
          "Pausa: no pedido do navegador, qual dado identifica o projeto/cliente e qual credencial representa a conta autenticada?"
        ],
        "terms": [
          { "term": "Provedor de terceiros", "meaning": "Serviço externo cujos tokens assinados o Supabase está configurado para validar." },
          { "term": "JWT de sessão", "meaning": "Token assinado com claims como emissor e subject; o servidor valida assinatura e contexto antes de usar os claims." },
          { "term": "`sub` (subject)", "meaning": "Claim que identifica a entidade autenticada pelo emissor do token; aqui, é o ID textual do usuário Clerk." },
          { "term": "Role `authenticated`", "meaning": "Role Postgres assumida por uma chamada com identidade autenticada; não é o ID pessoal nem uma permissão irrestrita." }
        ]
      },
      {
        "title": "RLS como porteiro de cada linha",
        "paragraphs": [
          "Row Level Security (RLS) permite que o PostgreSQL aplique regras por linha em cada chamada. Uma policy como `using ((select auth.jwt()->>'sub') = user_id)` equivale a restringir a consulta aos registros cujo proprietário corresponde ao subject validado. A regra permanece no banco mesmo que a pessoa altere o pedido HTTP manualmente.",
          "Para `SELECT`, `USING` define quais registros podem ser lidos. Para `INSERT`, `WITH CHECK` exige que a nova linha pertença à identidade que fez o pedido. Para `UPDATE`, `USING` limita a linha existente e `WITH CHECK` limita o estado resultante. Se uma ação não deve existir, como apagar o progresso neste projeto, não conceda grant nem crie policy de delete.",
          "No schema atual, `user_id` é `text`, porque IDs Clerk como `user_...` não são UUIDs. O uso de `(select auth.jwt()->>'sub')` preserva esse tipo. `auth.uid()` é um helper voltado ao ID Supabase Auth no formato UUID; não o substitua mecanicamente quando a identidade vem do Clerk.",
          "Pausa: uma pessoa autenticada envia no JSON `user_id: 'user_demo_B'`, mas o token validado contém `sub: 'user_demo_A'`. Qual campo deve ganhar na decisão do banco?"
        ],
        "terms": [
          { "term": "RLS", "meaning": "Regras do PostgreSQL que filtram ou rejeitam operações em linhas conforme claims e contexto da solicitação." },
          { "term": "`USING`", "meaning": "Condição que restringe as linhas existentes visíveis ou atingidas pela operação." },
          { "term": "`WITH CHECK`", "meaning": "Condição que a linha nova ou atualizada precisa satisfazer para a gravação ser aceita." },
          { "term": "Propriedade do registro", "meaning": "Vínculo entre uma linha e a identidade que pode gerenciá-la; deve ser conferido no banco." }
        ]
      },
      {
        "title": "Combinar grants, policies e privilégios mínimos",
        "paragraphs": [
          "O PostgreSQL verifica se a role tem grant para tentar a ação e depois aplica as policies para decidir quais linhas são permitidas. Uma policy não substitui grants, e conceder `SELECT` sem uma policy adequada pode expor todas as linhas que o papel consegue consultar.",
          "O script deste projeto revoga grants amplos de `anon` e `authenticated`, concede apenas `select`, `insert` e `update` a `authenticated` e cria uma política por operação. A role `authenticated` é uma categoria de execução do banco; ela não significa que a pessoa possa ver os registros de todas as outras contas.",
          "Evite autorização baseada em campos de perfil que o próprio usuário pode editar. O `sub` assinado pelo Clerk identifica a conta; se a aplicação tiver papéis organizacionais, modele a origem confiável desses claims e trate atualização de token e revogação como parte do desenho."
        ],
        "terms": [
          { "term": "Grant", "meaning": "Permissão SQL que libera uma role a executar uma classe de operação numa tabela ou objeto." },
          { "term": "Menor privilégio", "meaning": "Conceder somente as operações e dados necessários ao comportamento previsto." },
          { "term": "`service_role` / chave secreta", "meaning": "Credencial privilegiada que pode ignorar RLS; deve permanecer em ambiente de servidor e ser usada apenas quando necessária." }
        ]
      },
      {
        "title": "Separar configuração pública de segredo e planejar a prova",
        "paragraphs": [
          "A URL do projeto Supabase, a chave publicável Supabase e a chave publicável Clerk são configurações que podem ser entregues ao navegador. Publicável não quer dizer que a tabela seja pública: a superfície continua segura apenas com grants mínimos, RLS e tokens verificados. O código do curso obtém somente esses valores de `/api/public-config`.",
          "A chave secreta Supabase, `service_role`, `CLERK_SECRET_KEY` e senha do banco nunca devem aparecer na página, no `index.html`, em `assets/js`, no arquivo de exemplo público ou no DevTools do navegador. Como segredo pode contornar RLS, esconder o nome da variável não resolve uma exposição.",
          "Para provar isolamento, prepare duas identidades de teste e uma linha fictícia por pessoa. Verifique leitura própria, ausência de leitura cruzada, rejeição de insert com ID alheio, atualização de registro próprio e tentativa de alterar dono; confirme também que a conta sem sessão não tem acesso. Esta aula só prepara a matriz: não executa nem afirma que essa prova foi feita no projeto remoto.",
          "A URL `vercel.app` do Preview é suficiente para estudar a configuração de ambiente e a autenticação. Domínio personalizado, DNS ou publicação de Production não fazem parte deste exercício."
        ],
        "terms": [
          { "term": "Chave publicável", "meaning": "Identificador de projeto/cliente destinado a uso no navegador; não autentica por si só um usuário nem substitui controles de dados." },
          { "term": "Chave secreta", "meaning": "Credencial privilegiada para operação de servidor; deve ficar fora do frontend, repositório e exemplos públicos." },
          { "term": "Matriz de autorização", "meaning": "Tabela de casos que registra identidade, ação, linha-alvo e resultado permitido ou negado." },
          { "term": "Isolamento entre contas", "meaning": "Propriedade verificada quando cada identidade só acessa ou altera dados autorizados para ela." }
        ]
      }
    ],
    "guided": [
      { "instruction": "No `cloud.js`, localize a chave do cabeçalho `apikey`, o token em `Authorization` e o filtro `user_id`. Para cada um, indique que informação fornece e se é ou não a regra final de autorização.", "result": "A chave publicável aponta ao projeto, o bearer token representa a sessão Clerk e o filtro pede uma linha; a policy RLS no PostgreSQL é a autoridade final sobre quais linhas podem ser acessadas." },
      { "instruction": "Leia a policy de `SELECT` e a de `INSERT` no SQL. Compare o papel de `USING` com `WITH CHECK` e preveja o que acontece se a pessoa A enviar o ID da pessoa B.", "result": "`USING` limita linhas existentes; `WITH CHECK` verifica a nova linha. Como o `sub` autenticado é A, inserir/transferir a linha com `user_id` B não satisfaz a condição." },
      { "instruction": "Preencha uma matriz de permissões para `anon` e `authenticated` nas ações SELECT, INSERT, UPDATE e DELETE, usando exatamente grants e policies de `learning-state.sql`.", "result": "`anon` não tem grants; `authenticated` pode SELECT, INSERT e UPDATE somente na linha do próprio `sub`; DELETE não foi concedido nem configurado." }
    ],
    "mistakes": [
      "Achar que autenticação Clerk sincroniza automaticamente contas com `auth.users` do Supabase.",
      "Usar `auth.uid()` como UUID quando o ID `sub` do Clerk é texto.",
      "Confiar no `user_id` que o navegador manda em vez de comparar com claim assinado e validado.",
      "Achar que habilitar RLS ou criar policy substitui os grants SQL necessários.",
      "Conceder `service_role` ou chave secreta no frontend porque a chave publicável parece insuficiente.",
      "Supor que estar na role `authenticated` permite ler todas as linhas.",
      "Tratar um plano de testes com duas contas como prova de execução real das policies."
    ],
    "exercises": [
      {
        "prompt": "Prever: a tabela contém uma linha de `user_demo_A`. Compare dois pedidos assinados, um com `sub = user_demo_A` e outro com `sub = user_demo_B`, ambos solicitando a mesma linha. Preveja quais linhas cada pedido poderá ver segundo a policy `SELECT`.",
        "expected": "A conta A pode ver a própria linha; B não recebe essa linha. O filtro enviado pelo cliente não amplia a policy aplicada pelo PostgreSQL.",
        "criteria": ["Usa o claim `sub` validado como identidade da chamada.", "Prevê ausência de acesso cruzado para B.", "Distingue filtro REST de autorização RLS."],
        "solution": "Para A, `auth.jwt()->>'sub'` corresponde a `user_id`, então a policy permite a linha. Para B, a condição é falsa e a linha não fica visível, mesmo que a URL solicite esse `user_id`.",
        "explanation": "A policy age como condição adicional aplicada no banco às linhas consultadas.",
        "hints": ["Substitua `sub` por cada ID e compare ao `user_id` da linha.", "O parâmetro `user_id=eq...` é um filtro, não uma credencial."]
      },
      {
        "prompt": "Alterar: a conta A tenta criar progresso com `user_id = user_demo_B` e depois atualizar a própria linha para transferi-la a B. Identifique qual verificação bloqueia cada ação e por quê.",
        "expected": "O `WITH CHECK` da policy de INSERT recusa a nova linha porque B difere do `sub` de A; no UPDATE, `USING` localiza apenas linha de A e `WITH CHECK` impede que a versão resultante tenha dono B.",
        "criteria": ["Aplica `WITH CHECK` ao INSERT.", "Usa `USING` e `WITH CHECK` no UPDATE para origem e novo estado.", "Não confia em validação apenas no cliente."],
        "solution": "A condição de cada policy compara a identidade assinada ao `user_id`. INSERT exige que a nova linha pertença a A; UPDATE exige que a linha antiga seja de A e que a linha resultante continue sendo de A.",
        "explanation": "Verificar só a linha existente deixa aberta a possibilidade de trocar sua propriedade na atualização.",
        "hints": ["`USING` olha para a linha que a operação pode atingir.", "`WITH CHECK` valida os valores que serão gravados."]
      },
      {
        "prompt": "Construir: escreva uma matriz conceitual de autorização para A, B e pessoa sem sessão nas operações SELECT, INSERT, UPDATE e DELETE da tabela `learning_state`. Registre também o resultado esperado quando A tenta usar a chave secreta no navegador; não execute nenhuma chamada real.",
        "expected": "A só consulta/cria/atualiza a própria linha; B só a sua; sem sessão não há grant autenticado; DELETE é negado a todos pelo contrato atual. A chave secreta não deve chegar ao navegador, então a tentativa é marcada como configuração inválida e exposição crítica, não como caminho de teste.",
        "criteria": ["Inclui as três identidades e quatro operações.", "Reflete grants e policies reais do arquivo SQL.", "Marca exposição de chave secreta como proibida e não executável.", "Deixa claro que a matriz é planejamento, não teste realizado."],
        "solution": "Matriz resumida: A→SELECT/INSERT/UPDATE da linha A: permitido; mesma conta em linha B: negado; B repete apenas para a linha B; sem sessão: sem grant para a role authenticated; DELETE: sem grant/policy; chave secreta no navegador: não executar, remover e rotacionar se ocorresse.",
        "explanation": "Matriz de casos torna visíveis os caminhos positivos e negativos antes de testar policies em ambiente descartável.",
        "hints": ["Consulte a lista `revoke`/`grant` além das policies.", "Não classifique segredo como uma forma normal de autenticação do browser."]
      },
      {
        "prompt": "Investigar erro: dois usuários autenticados enxergam o mesmo progresso. Sem abrir o banco remoto, trace hipóteses nos grants, estado RLS, policy `SELECT`, claim `sub`, chave enviada pelo frontend e uso acidental de `service_role`. Ordene o que verificaria sem revelar nenhum token.",
        "expected": "Confirma ambiente/tabela e RLS habilitada, inspeciona grants e policy que compara `sub` a `user_id`, verifica que o token é da conta esperada e que o cliente usa chave publicável, e procura credencial privilegiada no frontend; não presume que o filtro de URL garante isolamento.",
        "criteria": ["Inspeciona banco, policy e identidade antes de mudar código.", "Considera credencial privilegiada como possível bypass.", "Não solicita nem imprime token/segredo.", "Não afirma que uma configuração foi confirmada sem evidência."],
        "solution": "Registre só status, ambiente e nome de configuração; compare RLS/grants/policies com `learning-state.sql`, verifique o `sub` sem divulgar o token e confira no código se `apikey` é publicável. Se segredo privilegiado chegou ao navegador, interrompa uso, revogue/rotacione no painel e corrija antes de repetir qualquer chamada.",
        "explanation": "O sintoma pode vir de autorização aberta, identidade incorreta ou chave que ignora RLS; o diagnóstico deve proteger credenciais e distinguir cada causa.",
        "hints": ["Primeiro confira se o banco está aplicando a policy de leitura esperada.", "O filtro no cliente pode estar ausente ou alterado sem representar uma falha do token."]
      }
    ],
    "quiz": [
      { "question": "O que a integração Clerk como provedor de terceiros faz para o Supabase?", "options": ["Permite validar tokens Clerk; não sincroniza automaticamente usuários em `auth.users`.", "Troca automaticamente todas as contas Clerk por contas Supabase Auth.", "Desativa a necessidade de policies RLS."], "correctIndex": 0, "explanation": "A integração estabelece confiança para verificar tokens externos; políticas de acesso e eventual sincronização são responsabilidades distintas." },
      { "question": "Por que a policy compara `auth.jwt()->>'sub'` com `user_id` nesta tabela?", "options": ["Porque `sub` é o ID Clerk textual validado do token e `user_id` é texto.", "Porque qualquer texto enviado pelo cliente é confiável.", "Porque `auth.uid()` sempre retorna IDs Clerk em UUID."], "correctIndex": 0, "explanation": "O subject validado identifica o usuário Clerk; o esquema guarda esse identificador como texto." },
      { "question": "Qual combinação protege uma tabela exposta?", "options": ["Apenas `GRANT`, sem RLS.", "Apenas RLS, sem grants.", "Grants mínimos e policies RLS coerentes por operação."], "correctIndex": 2, "explanation": "Grants controlam quais operações uma role pode tentar; RLS limita as linhas alcançadas." },
      { "question": "Qual credencial pode contornar RLS e nunca deve ir ao navegador?", "options": ["A URL Supabase.", "A chave publicável `sb_publishable_...`.", "A chave secreta ou `service_role`."], "correctIndex": 2, "explanation": "Chaves privilegiadas pertencem ao servidor; credenciais publicáveis precisam de RLS e grants seguros." }
    ],
    "summary": [
      "Clerk emite a identidade; Supabase valida o token como provedor de terceiros. Isso não sincroniza contas em `auth.users`.",
      "O claim assinado `sub` é comparado ao `user_id` textual da linha; no projeto, não se usa `auth.uid()` para IDs Clerk.",
      "`USING` limita linhas existentes, `WITH CHECK` valida as novas ou atualizadas; grants mínimos complementam policies RLS.",
      "A chave publicável identifica o projeto; o token da sessão identifica a chamada; segredo/`service_role` fica no servidor.",
      "A matriz de duas contas desta aula é um plano conceitual. A prova real das policies e do isolamento no Supabase continua pendente e não depende de domínio próprio."
    ]
  },
  "delivery-ci": {
    "prerequisites": "Concluir setup-node, js-debug e delivery-environments; saber executar Node no terminal e ter praticado testes de funções em JavaScript.",
    "setup": "Na pasta da aula, salve o exemplo como regra.test.js no editor. No terminal aberto nessa pasta, execute node --test regra.test.js; a saída esperada resume 2 testes aprovados e 0 falhas. Não é preciso instalar pacote. Para simular regressão, troque apenas return valor.trim() por return valor, rode novamente e observe 1 falha; restaure a linha e repita o comando. O processo termina sozinho; se node não for reconhecido, revise setup-node. Esta execução é local, sem serviço de CI remoto.",
    "why": "Publicar com confiança depende de repetir verificações e reconhecer rapidamente quando uma alteração quebrou algo. Uma rotina de integração contínua ajuda a aplicar a mesma regra a cada contribuição.",
    "sections": [
      {
        "title": "Camadas de verificação",
        "paragraphs": [
          "Um teste unitário verifica uma regra pequena com entrada e resultado conhecidos. Um teste de integração local cobre o encontro entre partes, por exemplo POST /api/estudos e resposta 201. Um roteiro de navegador confirma foco, mensagens, layout e um fluxo completo. Cada camada detecta falhas diferentes; nenhuma sozinha prova que todo o produto está correto. Escolha testes segundo os riscos reais da alteração.",
          "A função normalizarTitulo é adequada a teste unitário porque não depende de rede nem relógio. O teste de espaços compara a saída com HTML; o teste de vazio exige TypeError. Se a implementação não recusar vazio, o segundo teste falha. Um teste precisa de expectativa independente da implementação; não calcule o esperado chamando a própria função. Acrescente casos de limite e regressão quando descobrir defeitos.",
          "Pausa: antes de executar, preveja qual teste falhará se a linha de retorno deixar de usar trim. Explique por que o outro teste ainda passa."
        ]
      },
      {
        "title": "O que CI executa",
        "paragraphs": [
          "Integração contínua é uma rotina automatizada disparada quando código é enviado ou uma proposta de alteração é aberta. Um fluxo comum prepara a versão correta do ambiente, instala dependências se existirem, executa testes, construção e verificações de qualidade. Se um passo obrigatório falha, a alteração não deveria seguir como se estivesse verificada. Leia o log do primeiro erro relevante, reproduza localmente e corrija a causa.",
          "O laboratório não precisa de conta remota para ensinar esse princípio: o comando node --test é o mesmo que uma rotina poderia executar. Ao escrever instruções de entrega, registre o comando exato e o resultado esperado. Em um projeto real, a configuração de CI fica versionada no repositório para que a equipe veja quais verificações acontecem. Nesta aula, executar o comando localmente não prova que uma CI remota esteja configurada. CI dá repetibilidade, mas não substitui revisão humana.",
          "Pausa: marque em uma sequência evento → execução → resultado onde ocorre cada etapa no terminal local e onde ocorreria em um fluxo remoto."
        ]
      },
      {
        "title": "Sinais após a entrega",
        "paragraphs": [
          "Mesmo com testes passando, a produção pode ter configuração diferente, serviço indisponível ou dados inesperados. Observe sinais: taxa de erro, status HTTP, Console do navegador, relatos de usuários e registros do servidor que não vazem segredos. Uma mensagem genérica “não funciona” é difícil de investigar; capture horário aproximado, rota, ação, ambiente, resultado esperado e observado.",
          "Reproduzir começa pelo menor caso que demonstra o defeito. Se a falha aparece apenas quando lista está vazia, crie esse cenário local. Compare versões anteriores e atuais, faça uma hipótese e teste-a. Depois da correção, acrescente um teste para a condição que antes falhava. Isso transforma um incidente em aprendizagem durável do projeto.",
          "Pausa: escreva um relato de uma linha para POST /api/estudos com status 500 contendo ambiente, ação, esperado e observado."
        ]
      },
      {
        "title": "Recuperação e rollback",
        "paragraphs": [
          "Rollback é voltar a uma versão que se sabe funcionar quando a versão nova causa problema grave. Ele precisa ser planejado: identifique a versão anterior, preserve artefato ou commit, saiba como restaurar e verifique o fluxo principal depois. Se houve mudança de dados incompatível, voltar só os arquivos pode não bastar; comunique a dependência. Em exercício local, copie a versão anterior e reproduza a volta sem apagar o histórico da falha.",
          "Não confunda corrigir rapidamente com esconder o problema. Quando impacto é alto, restaurar primeiro pode reduzir dano; depois investigue com tempo. Registre causa, proteção adicionada e como o defeito foi detectado. Isso é parte da manutenção profissional de um projeto, mesmo em uma equipe pequena.",
          "Pausa: ordene registrar versão, restaurar versão estável, verificar o fluxo principal e investigar a causa. Indique quando uma migração de dados exige cuidado adicional."
        ]
      },
      {
        "title": "Uma rotina pequena e realista",
        "paragraphs": [
          "Antes de abrir uma mudança, rode testes, abra o projeto no navegador, confirme o caminho feliz e um erro importante, e leia o diff. Durante revisão, descreva o comportamento que mudou, o motivo e a evidência. Depois de publicar, teste a URL final e observe mensagens de erro. Essa sequência é mais valiosa que uma lista enorme de testes que ninguém sabe interpretar.",
          "Testes devem ser mantidos junto do código. Se o requisito mudou, atualize expectativa e implementação de maneira coerente. Se apenas o teste foi relaxado para ficar verde, a equipe perdeu uma proteção. O objetivo para quem começa é saber explicar qual risco cada verificação cobre e onde ainda precisa de conferência manual."
        ]
      }
    ],
    "example": {
      "language": "js",
      "code": "// Salve como regra.test.js e rode: node --test regra.test.js\nconst test = require('node:test');\nconst assert = require('node:assert/strict');\nfunction normalizarTitulo(valor) {\n  if (typeof valor !== 'string' || !valor.trim()) throw new TypeError('Título obrigatório');\n  return valor.trim();\n}\ntest('remove espaços externos', () => assert.equal(normalizarTitulo('  HTML  '), 'HTML'));\ntest('recusa título vazio', () => assert.throws(() => normalizarTitulo('  '), TypeError));\n",
      "explanation": [
        "node:test define os casos; assert/strict confere resultados e exceções.",
        "Nenhuma dependência externa é necessária.",
        "A alteração controlada demonstra que a suíte detecta uma regressão."
      ],
      "expected": "Dois testes aprovados. Após retirar trim, o teste de espaços falha."
    },
    "guided": [
      {
        "instruction": "Rode node --test regra.test.js.",
        "result": "O terminal informa dois testes aprovados."
      },
      {
        "instruction": "Retire trim somente na linha de retorno.",
        "result": "O teste de remoção de espaços falha."
      },
      {
        "instruction": "Restaure o código e rode novamente.",
        "result": "Os dois testes voltam a passar."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: o que normalizarTitulo(null) faz antes de rodar? Depois acrescente um teste para esse caso. Aceite: entrada null → TypeError; execução da suíte → três testes aprovados.",
        "hints": [
          "Use assert.throws.",
          "A função lança TypeError para valor não textual."
        ],
        "solution": "test('recusa null', () => assert.throws(() => normalizarTitulo(null), TypeError));",
        "explanation": "Acrescente ao mesmo arquivo após os testes existentes.",
        "expected": "Três testes aprovados.",
        "criteria": ["Teste cobre entrada null e suíte executa o total indicado.","Resultado de teste e código de saída ficam registrados."]
      },
      {
        "prompt": "Alterar: amplie a matriz do laboratório delivery-forms com POST válido, título vazio e servidor desligado. Aceite: para cada entrada, anote resposta HTTP ou falha de rede, estado da interface e se o título permanece; entrada servidor desligado → erro de rede, sem status HTTP.",
        "hints": [
          "Não use o mesmo status para todas as linhas.",
          "Falha de rede pode não produzir status HTTP."
        ],
        "solution": "Válido → 201 e registro; vazio → 400 e mensagem, sem registro; servidor parado → erro de rede mostrado pela interface, título preservado.",
        "explanation": "A matriz une contrato do servidor e estado do cliente.",
        "expected": "Três casos com resultado verificável.",
        "criteria": ["Matriz cobre POST válido, vazio e rede indisponível.","Cada caso anota resposta, UI e preservação do campo."]
      },
      {
        "prompt": "Construir: implemente uma função que remove títulos duplicados sem alterar a entrada e escreva teste independente para saída e entrada. Aceite: entrada ['HTML','HTML','CSS'] → saída ['HTML','CSS']; array original mantém três elementos.",
        "hints": [
          "Prepare array original e cópia.",
          "Verifique saída e entrada."
        ],
        "solution": "function unicos(valores){return [...new Set(valores)];} test('remove duplicatas sem mutar',()=>{const entrada=['HTML','HTML','CSS'];assert.deepEqual(unicos(entrada),['HTML','CSS']);assert.deepEqual(entrada,['HTML','HTML','CSS']);});",
        "explanation": "Use node:test e assert/strict do exemplo; mutação da entrada seria defeito adicional.",
        "expected": "Teste passa e entrada mantém três elementos.",
        "criteria": ["Função remove títulos duplicados sem alterar argumento original.","Testes conferem saída deduplicada e tamanho/estado da entrada."]
      },
      {
        "prompt": "Investigar erro: após uma nova versão, POST /api/estudos retorna 500. Registre evidências, proponha contenção, reproduza com entrada mínima e descreva teste de regressão e verificação final. Aceite: informe versão, rota, resultado observado, ação de recuperação e nova prova; entrada título HTML → resposta esperada 201 após a correção.",
        "hints": [
          "Inclua versão e rota.",
          "Considere voltar à versão estável."
        ],
        "solution": "Registrar versão, horário, POST e 500; avaliar impacto; restaurar versão estável se necessário; reproduzir com entrada mínima; corrigir; adicionar regressão; rodar testes e verificar URL final.",
        "explanation": "O fluxo cobre diagnóstico e redução de impacto, não só alteração do código.",
        "expected": "Relato tem observação, contenção e prova posterior.",
        "criteria": ["Relato contém versão, rota, entrada mínima e resposta observada.","Contenção, regressão e prova final são verificáveis após recuperação."]
      }
    ],
    "mistakes": [
      "Confundir testes passando com garantia de ausência de defeitos.",
      "Usar uma expectativa calculada pela própria função testada.",
      "Ignorar o primeiro erro da CI e tentar publicar mesmo assim.",
      "Fazer rollback sem considerar mudanças de dados."
    ],
    "quiz": [
      {
        "question": "Que risco um teste unitário de normalizarTitulo cobre?",
        "options": [
          "A regra de limpeza e rejeição de entrada.",
          "Todo o layout móvel.",
          "Disponibilidade da API em produção."
        ],
        "correctIndex": 0,
        "explanation": "O teste cobre comportamento da função isolada."
      },
      {
        "question": "O que fazer ao corrigir um bug reproduzível?",
        "options": [
          "Apagar o teste que falhou.",
          "Adicionar teste de regressão para o caso e verificar correção.",
          "Confiar apenas em memória."
        ],
        "correctIndex": 1,
        "explanation": "O caso de regressão protege contra retorno do defeito."
      },
      {
        "question": "O que é rollback?",
        "options": [
          "Voltar à última versão conhecida que funciona.",
          "Apagar todos os commits.",
          "Reiniciar o navegador."
        ],
        "correctIndex": 0,
        "explanation": "A versão estável reduz impacto enquanto a causa é investigada."
      }
    ],
    "summary": [
      "Combine testes de regra, integração e navegação conforme o risco.",
      "CI repete verificações e ajuda a impedir entrega com falha conhecida.",
      "Observe, reproduza, contenha, corrija e acrescente regressão."
    ]
  },
  "delivery-threat-model": {
    "prerequisites": "Concluir `delivery-environments`, `delivery-oauth-google` e `delivery-clerk-supabase`. Esta aula modela o fluxo do Tech Learning Hub com Preview Vercel, Clerk e Supabase; não precisa abrir os painéis nem possuir domínio ou credenciais.",
    "setup": "Leia apenas os diagramas didáticos de `assets/js/cloud.js`, `assets/js/auth.js`, `api/public-config.mjs` e `supabase/learning-state.sql`. Use as identidades fictícias A/B e o fluxo nesta aula. Não envie pedidos a serviços, não abra arquivos `.env` e não cole tokens. O resultado é um modelo conceitual, não uma auditoria nem evidência de que os controles foram testados.",
    "why": "Uma ameaça fica mais fácil de tratar quando sabemos que ativo proteger, por onde os dados passam, onde muda a confiança, qual condição pode causar dano e que evidência confirmaria o controle. Um modelo pequeno e atualizado ajuda a priorizar correções antes de ampliar uma aplicação.",
    "example": {
      "language": "text",
      "code": "ESCOPO: autenticar e salvar progresso pessoal no Preview.\n\nAtor externo: pessoa usuária; atacante considerado: visitante que altera pedidos do próprio navegador.\nAtivos: progresso/anotações; identidade de sessão; disponibilidade; credenciais secretas.\n\nFluxo e fronteiras:\nPessoa → [navegador não confiável] → Vercel (HTML + /api/public-config com valores públicos)\nNavegador ↔ Clerk (sessão de identidade)\nNavegador → Supabase REST → valida token Clerk → grants + RLS → learning_state\n\nID | Cenário | Impacto | Controle | Evidência\nT1 | A muda user_id para B | leitura/alteração indevida | RLS compara sub ao user_id | teste negativo A→linha B\nT2 | segredo privilegiado no bundle | bypass de RLS | segredo só no servidor; config pública revisada | inspecionar resposta/bundle\nT3 | anotação vira HTML executável | roubo de sessão/ação indevida | escapar texto; usar textContent; manter sandbox | teste de renderização inerte\nT4 | pedidos repetidos exaurem cota | indisponibilidade/custo | limites por serviço e monitoramento | alerta e teste de limite\n\nHipótese ainda não verificada: Preview não contém service_role.\nRisco residual: serviços gerenciados podem falhar; mostrar estado e retry sem prometer disponibilidade.",
      "expected": "O modelo delimita escopo, atores, ativos, fluxos e zonas de confiança; associa ameaças concretas a impacto, controle e evidência, e rotula hipóteses e riscos residuais como pendências em vez de fatos.",
      "explanation": [
        "A decomposição descreve o sistema que está sendo analisado: objetivo, atores, componentes, entradas, saídas, dados guardados e pressupostos. Um diagrama de fluxo deve mostrar onde os dados transitam e onde a confiança muda.",
        "STRIDE é um conjunto de perguntas: spoofing (falsificação de identidade), tampering (adulteração), repudiation (negação sem evidência), information disclosure (exposição), denial of service (indisponibilidade) e elevation of privilege (elevação de privilégio). Não é uma prova automática de cobertura.",
        "Uma ameaça é um cenário possível; uma fraqueza é uma condição que pode permiti-lo; risco combina chance e impacto no contexto. A estimativa pode ser qualitativa e deve registrar suas razões, não fingir precisão matemática.",
        "Um controle reduz uma ameaça e precisa de uma evidência verificável. Um requisito de RLS pode ser verificado por caso negativo; uma regra de segredo exige conferir o caminho de publicação. A aula descreve as evidências, mas não executa a prova.",
        "Mitigar reduz risco; eliminar remove a causa; transferir atribui parte da responsabilidade sem apagar o risco; aceitar requer uma decisão explícita e registro do risco residual, responsável e data de revisão.",
        "OWASP Top 10 2025 é uma lista de conscientização e vocabulário compartilhado, não uma certificação nem uma lista que substitui o modelo específico da aplicação. Esta versão é a edição atual identificada pela página do projeto OWASP."
      ]
    },
    "sections": [
      {
        "title": "Delimitar o que está em avaliação",
        "paragraphs": [
          "Comece escrevendo o objetivo e o escopo em uma frase. Neste exercício, a fronteira inclui a página Preview, configuração pública, login Clerk, chamada REST ao Supabase e a tabela `learning_state`. Ela não inclui DNS de domínio próprio, credenciais internas dos provedores, computadores dos usuários ou uma revisão profissional de segurança.",
          "Liste ativos conforme o impacto se forem expostos, alterados ou ficarem indisponíveis. Progresso e anotações pertencem à pessoa usuária; a identidade de sessão permite agir em seu nome; credenciais secretas podem conceder acesso privilegiado; disponibilidade afeta salvamento. Chave publicável é informação pública por desenho, mas seu uso ainda precisa de RLS.",
          "Registre atores e pressupostos: usuário autenticado, visitante sem sessão, provedor Clerk, API Supabase e pessoa que mantém o projeto. Pressuposto não verificado — por exemplo, “nenhum segredo foi enviado ao browser” — recebe dono e evidência, não um visto automático.",
          "Pausa: se uma pessoa perde o progresso por indisponibilidade, qual ativo e atributo de segurança são afetados? E se lê a linha de outra conta?"
        ],
        "terms": [
          { "term": "Ativo", "meaning": "Dado, serviço ou capacidade que importa proteger, manter íntegro ou disponibilizar." },
          { "term": "Ator", "meaning": "Pessoa, sistema ou organização que participa ou pode interagir com o fluxo." },
          { "term": "Escopo", "meaning": "Limite explícito do que o modelo cobre e do que deixa para outra análise." },
          { "term": "Pressuposto", "meaning": "Condição considerada verdadeira provisoriamente, que precisa poder ser confirmada ou revisada." },
          { "term": "Confidencialidade, integridade e disponibilidade", "meaning": "Propriedades que descrevem impedir leitura indevida, alteração indevida e perda de acesso." }
        ]
      },
      {
        "title": "Desenhar fluxos e fronteiras de confiança",
        "paragraphs": [
          "Um diagrama útil mostra ator externo, navegador, componente de hospedagem, provedor de identidade, API de dados, banco e setas rotuladas com dados ou ações. Desenhe a fronteira entre o dispositivo não confiável e serviços, e entre a autenticação Clerk e a autorização no PostgreSQL.",
          "O navegador pode ser modificado pelo usuário. Filtros na URL, campos ocultos e validações JavaScript ajudam a experiência, mas não provam propriedade. No fluxo deste curso, o Supabase verifica o token Clerk e a RLS compara o `sub` validado ao `user_id` da linha.",
          "A barreira de acesso Vercel no Preview e o login Clerk dentro da aplicação são controles em camadas diferentes. Um resolve quem pode abrir o deployment; o outro autentica a pessoa perante a aplicação. Ter domínio próprio não muda esse modelo nem é necessário para desenhá-lo.",
          "Pausa: marque no diagrama onde alguém pode alterar dados antes que Supabase os receba e onde o banco toma a decisão final por linha.",
        ],
        "diagramTitle": "Fronteiras de confiança do progresso",
        "diagram": "Pessoa / navegador (não confiável)\n  ├─ GET página + /api/public-config ──▶ Vercel Preview\n  ├─ iniciar/retomar sessão ──────────▶ Clerk\n  └─ REST + token Clerk + chave pública ─▶ Supabase API\n                                         │ verifica assinatura/claims\n                                         ▼\n                                  PostgreSQL + grants/RLS\n                                         │ compara sub com user_id\n                                         ▼\n                                  learning_state da conta\n\nToken, filtro do navegador e decisão RLS são elementos distintos.",
        "terms": [
          { "term": "Fronteira de confiança", "meaning": "Limite entre componentes com pressupostos ou controles de confiança diferentes; dados que cruzam a fronteira precisam ser tratados conforme a origem." },
          { "term": "Fluxo de dados", "meaning": "Caminho que uma informação ou ação percorre entre atores, processos e armazenamentos." },
          { "term": "Superfície de ataque", "meaning": "Entradas e interfaces que podem receber dados ou ações externas." }
        ]
      },
      {
        "title": "Perguntar o que pode dar errado",
        "paragraphs": [
          "Aplique cada categoria STRIDE aos componentes e fluxos relevantes: alguém se passa por outra pessoa? Adultera estado? Nega uma alteração sem rastros? Lê dados alheios? Impede acesso ou gera custo? Consegue privilégio acima do permitido? Registre cenários específicos, não apenas o nome da categoria.",
          "Exemplo: “A pessoa troca `user_id` na chamada e vê o progresso de B” é um cenário de elevação de acesso e exposição. “A tabela tem RLS” é um controle, não uma descrição da ameaça; ele só ajuda se a policy e os grants estiverem corretos e se a requisição não usar uma chave privilegiada.",
          "Para priorizar, classifique impacto e possibilidade como baixo/médio/alto e explique o motivo. Uma ocorrência de baixa chance com alto impacto ainda pode merecer controle forte. Revisite ameaças quando adicionar anotações, exportação, novas tabelas, ferramentas administrativas ou outro fluxo de autenticação.",
          "O OWASP Top 10 2025 dá nomes comuns para riscos como controle de acesso quebrado, má configuração, falhas na cadeia de suprimentos, injeção e falhas de autenticação. Use-o para ampliar perguntas e comunicar riscos; não tente encaixar toda falha em uma única categoria."
        ],
        "terms": [
          { "term": "STRIDE", "meaning": "Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service e Elevation of Privilege; seis perguntas para brainstorm técnico." },
          { "term": "Ameaça", "meaning": "Evento ou ação adversa plausível que pode prejudicar um ativo dentro do escopo." },
          { "term": "Fraqueza", "meaning": "Condição ou defeito que facilita uma ameaça, como policy ausente ou entrada não escapada." },
          { "term": "Risco", "meaning": "Avaliação contextual da chance e do impacto de uma ameaça explorando uma fraqueza." },
          { "term": "OWASP Top 10", "meaning": "Documento de conscientização que organiza riscos frequentes; não substitui uma análise específica nem atesta segurança." }
        ]
      },
      {
        "title": "Escolher controles e combinar evidência",
        "paragraphs": [
          "Para cada ameaça priorizada, associe uma resposta: mitigar, eliminar, transferir responsabilidade ou aceitar deliberadamente. Identifique responsável e prazo de revisão. Se o risco permanecer, documente o risco residual e por que ele é tolerável naquele contexto.",
          "Prefira controles observáveis: RLS por `sub` e testes de negação cruzada; escape de notas antes de renderizar; não enviar chaves secretas ao browser; limites de requisição e alertas; tratamento visível de indisponibilidade. Uma linha no documento que diz “seguro” não é evidência.",
          "Separe estado do controle: planejado, implementado, testado, monitorado. “Implementado” não significa “testado”; um teste local simulado não comprova configuração remota. Para cada evidência, registre ambiente, entrada, resultado observado e data, sem publicar dados pessoais ou tokens.",
          "Esta prática é um modelo de estudo do Preview, não auditoria técnica, parecer legal ou garantia de ausência de vulnerabilidade. Não execute exploração contra serviços públicos; validações futuras devem usar laboratório ou ambiente isolado e autorização explícita."
        ],
        "terms": [
          { "term": "Controle", "meaning": "Medida técnica ou operacional que previne, detecta ou reduz o impacto de uma ameaça." },
          { "term": "Risco residual", "meaning": "Risco que permanece depois dos controles escolhidos." },
          { "term": "Evidência", "meaning": "Registro reproduzível do que foi observado e do ambiente em que o controle foi verificado." },
          { "term": "Mitigar / eliminar / transferir / aceitar", "meaning": "Respostas possíveis ao risco; transferência e aceitação não provam que a ameaça desapareceu." }
        ]
      }
    ],
    "guided": [
      { "instruction": "Separe os itens do exemplo em ativo, ator, fronteira, ameaça, controle, evidência ou hipótese. Marque quais ainda não foram verificados.", "result": "Progresso é ativo; pessoa é ator; navegador→serviço é fronteira; alterar `user_id` é ameaça; RLS é controle; teste negativo é evidência; ausência de `service_role` é hipótese até inspecionada." },
      { "instruction": "Passe as seis perguntas STRIDE pelo fluxo de leitura e salvamento. Escreva pelo menos um cenário ligado a um componente, não só o nome de uma categoria.", "result": "O modelo contém ameaças específicas como falsificação/uso indevido de sessão, alteração de proprietário, exposição de progresso, indisponibilidade e excesso de privilégio; registra as categorias não aplicáveis com justificativa." },
      { "instruction": "Escolha uma ameaça, registre impacto e chance qualitativos, atribua uma resposta, um responsável e a evidência que permitiria mudar o estado de planejado para testado.", "result": "A resposta liga risco a um controle mensurável e não declara testado antes de registrar ambiente, caso, resultado e data." }
    ],
    "mistakes": [
      "Modelar uma solução de fornecedor em vez dos ativos, fluxos e limites do sistema real.",
      "Achar que uma chave publicável é segredo ou, no extremo oposto, que sua presença torna os dados públicos por si só.",
      "Tratar `user_id` enviado pelo cliente como identidade confiável.",
      "Listar categorias STRIDE sem cenários, controles ou evidências concretas.",
      "Declarar uma hipótese como controle verificado ou misturar teste local simulado com teste remoto real.",
      "Aceitar risco sem registrar motivo, responsável, prazo ou impacto residual.",
      "Usar OWASP Top 10 como checklist completo ou como certificação de segurança."
    ],
    "exercises": [
      {
        "prompt": "Prever: uma pessoa altera `user_id` no filtro REST de `user_demo_A` para `user_demo_B`. Antes de consultar o banco, preveja que informação deve controlar o acesso e nomeie a fronteira que o pedido atravessa.",
        "expected": "O token assinado e validado, em especial o `sub`, controla a política RLS; o navegador não confiável envia o pedido através da fronteira para a API/banco Supabase.",
        "criteria": ["Marca o navegador como origem não confiável.", "Usa o claim validado pelo banco, não o filtro, como identidade.", "Nomeia a fronteira navegador→Supabase."],
        "solution": "O banco deve comparar `auth.jwt()->>'sub'` com `user_id`. A URL pode pedir B, mas RLS determina quais linhas a identidade autenticada pode acessar.",
        "explanation": "O filtro seleciona candidatos; não é prova de identidade ou propriedade.",
        "hints": ["Quem controla o valor de query string?", "Qual componente valida assinatura e aplica policy por linha?"]
      },
      {
        "prompt": "Alterar: o curso adicionará notas livres junto ao progresso. Atualize o escopo e liste dois ativos, uma nova entrada, duas ameaças plausíveis e um controle/evidência para cada uma. Não implemente nem use conteúdo real.",
        "expected": "O escopo inclui notas; ativos incluem texto privado e sessão; entrada inclui texto do usuário; ameaças podem incluir XSS/exposição e acesso cruzado; controles incluem renderização segura e policy RLS, cada qual com teste inerte/negativo definido.",
        "criteria": ["Atualiza o limite do modelo pelo novo requisito.", "Relaciona ameaças a ativos e fluxos concretos.", "Associa cada controle a evidência segura e reproduzível."],
        "solution": "Escopo inclui criação/leitura de notas; ativos: texto privado e token de sessão; entrada: texto não confiável e ID da linha. Ameaça XSS: usar `textContent`/escape e confirmar que marcador HTML fica inerte; acesso cruzado: RLS por `sub` e teste A tentando ler B em ambiente isolado.",
        "explanation": "Mudança de requisito altera dados, entradas e consequências; o threat model deve ser atualizado antes de implementar.",
        "hints": ["Considere como o texto entra e como volta ao HTML.", "Considere se um usuário pode trocar o identificador de uma linha."]
      },
      {
        "prompt": "Construir: crie um registro de ameaça com: ID, ativo, ator, componente/fronteira, cenário, impacto, chance, controle, evidência, estado e risco residual. Use `service_role` exposta como cenário hipotético e não cole nenhum segredo real.",
        "expected": "O registro identifica exposição de credencial privilegiada, seu impacto de bypass de RLS, controle de segredo só no servidor e rotação se exposta; requer inspecionar a resposta/bundle, registra estado não verificado até obter evidência e descreve risco residual.",
        "criteria": ["Inclui todos os campos pedidos com dados fictícios.", "Não afirma que a exposição ocorreu nem imprime credencial.", "Distingue controle planejado/implementado/testado e risco residual."],
        "solution": "Exemplo: T-02; ativo=todas as linhas; ator=visitante com acesso ao bundle; fronteira=servidor/configuração→browser; cenário=chave privilegiada publicada; impacto=leitura/escrita ampla; chance=avaliar depois da inspeção; controle=remover e rotacionar, expor só chave publicável; evidência=verificar endpoint/bundle sem divulgar valores; estado=planejado; residual=credencial anterior pode ter sido copiada até revogação.",
        "explanation": "Uma hipótese útil vira um plano verificável e mantém explicitamente a incerteza até observar o ambiente.",
        "hints": ["Descreva o cenário e impacto em uma frase causal.", "Use apenas nome de categoria e status, nunca o valor de um segredo."]
      },
      {
        "prompt": "Investigar erro: uma pessoa relata que o progresso de outra conta apareceu. Organize uma resposta inicial segura com ativo, ameaça, hipótese, evidência a preservar, controles a conferir, risco de exposição e critério para dizer que a correção foi verificada. Não mude dados remotos.",
        "expected": "Trata como possível falha de controle de acesso, impede novas gravações/compartilhamento até compreender escopo, registra horário e conta ficticiamente identificada sem token, confere sub/RLS/grants/chave e define um teste negativo A→B; não declara causa nem resolução sem executar o teste autorizado.",
        "criteria": ["Prioriza conter exposição e preservar evidência sem divulgar token.", "Investiga token, policy e privilégios como hipóteses separadas.", "Define evidência concreta antes de chamar a falha de corrigida."],
        "solution": "Interrompa a exposição do dado e não continue compartilhando a tela. Registre ambiente, horário e passos sem tokens; verifique qual conta estava ativa, compare o `sub` com dono da linha, revise políticas/grants e confirme chave não privilegiada. Após correção, em ambiente autorizado, prove A lê A, não lê B e não pode escrever em B; documente o resultado e o risco residual.",
        "explanation": "Um relato de acesso cruzado deve ser tratado como sinal de possível exposição até que dados e controles sejam analisados; uma mensagem de sucesso não basta para fechar o incidente.",
        "hints": ["Separe o que foi observado do que é hipótese.", "Não faça nova escrita que possa contaminar evidência ou sobrescrever progresso."]
      }
    ],
    "quiz": [
      { "question": "Qual é a primeira etapa útil de um threat model?", "options": ["Listar exploits sem entender o sistema.", "Definir escopo, atores, ativos, componentes e fluxos.", "Marcar todos os riscos como corrigidos."], "correctIndex": 1, "explanation": "É preciso entender o que está sendo modelado e suas fronteiras antes de analisar o que pode dar errado." },
      { "question": "O que uma fronteira de confiança representa?", "options": ["Um limite em que dados passam entre zonas com pressupostos ou controles diferentes.", "Uma tela de login que garante segurança completa.", "A linha que separa arquivos CSS e JavaScript."], "correctIndex": 0, "explanation": "Dados que cruzam fronteiras precisam ser tratados conforme sua origem e o componente receptor." },
      { "question": "Quando um controle deve ser descrito como testado?", "options": ["Assim que aparece no código.", "Quando existe evidência observada no ambiente e caso registrados.", "Quando o modelo usa a palavra RLS."], "correctIndex": 1, "explanation": "Código implementado e controle testado são estados distintos; anote ambiente, entrada, resultado e data." },
      { "question": "Como usar o OWASP Top 10?", "options": ["Como prova de conformidade completa.", "Como vocabulário de conscientização, junto com análise específica do sistema.", "Como substituto para desenhar fluxos e ameaças."], "correctIndex": 1, "explanation": "A lista ajuda a comunicar riscos comuns, mas não é uma certificação nem cobre automaticamente o contexto de cada aplicação." }
    ],
    "summary": [
      "Defina escopo, atores, ativos, entradas, fluxos, armazenamentos, fronteiras e pressupostos.",
      "Use STRIDE como prompts para cenários concretos; priorize impacto e chance com justificativa.",
      "Associe cada ameaça a um controle e evidência; registre estado, responsável e risco residual.",
      "Modelo conceitual e verificação executada são coisas diferentes; esta aula não é auditoria nem teste de domínio.",
      "OWASP Top 10 2025 é referência de conscientização; atualize o modelo conforme mudam dados e requisitos."
    ]
  },
  "delivery-owasp-top10": {
    "prerequisites": "Concluir `delivery-clerk-supabase` e `delivery-threat-model`; revisar autenticação, autorização, requisições HTTP e testes. A lista OWASP é conceitual; o laboratório executável é local e usa apenas contas/dados fictícios. Não exige domínio, deploy nem configuração remota.",
    "setup": "Abra `labs/security-basics/README.md`. No terminal, a partir da pasta do repositório, execute `cd labs/security-basics` e depois `node --test server.test.cjs`. A saída esperada termina com `tests 6`, `pass 6` e `fail 0`. O teste sobe um servidor apenas em `127.0.0.1:4178`, verifica as rotas vulnerável e corrigida e encerra. Para repetir, execute o mesmo comando. Não publique o laboratório nem use tokens ou dados reais. Se Node não for reconhecido, retome `setup-node`; alternativa leve: analise os requests e respostas esperados nesta aula sem iniciar servidor.",
    "why": "Uma pessoa pode estar autenticada e ainda assim pedir um objeto que pertence a outra conta. A autorização precisa ser aplicada no servidor em cada operação. O laboratório torna a diferença observável e conecta um risco comum a uma correção e a testes de regressão.",
    "example": {
      "language": "text",
      "code": "CATÁLOGO OWASP TOP 10 2025 (conscientização):\nA01 Broken Access Control\nA02 Security Misconfiguration\nA03 Software Supply Chain Failures\nA04 Cryptographic Failures\nA05 Injection\nA06 Insecure Design\nA07 Authentication Failures\nA08 Software or Data Integrity Failures\nA09 Security Logging & Alerting Failures\nA10 Mishandling of Exceptional Conditions\n\nNo laboratório local, token demo-token-a:\nGET /demo/vulnerable/progress/aluno-b  → 200, marcador fictício de B\nGET /demo/fixed/progress/aluno-b      → 404, sem dados de B\nGET /demo/fixed/progress/aluno-a      → 200, marcador fictício de A",
      "expected": "A rota vulnerável retorna o marcador de B para a sessão A porque confia no ID do caminho. A rota corrigida bloqueia a leitura cruzada, mas permite à sessão A ler seu próprio registro. As dez categorias são um vocabulário de conscientização, não uma certificação.",
      "explanation": [
        "Autenticação responde quem fez a chamada; autorização decide qual ação essa identidade pode executar sobre aquele objeto.",
        "BOLA (Broken Object Level Authorization), também relacionada a IDOR, ocorre quando uma API identifica um objeto pelo ID sem conferir se a pessoa pode agir sobre ele.",
        "O cliente controla URL, corpo e interface. O servidor deve obter a identidade da sessão validada e aplicar uma regra de acesso por objeto em cada leitura e escrita.",
        "A checagem simples de dono neste laboratório é didática. Sistemas com equipes, compartilhamento ou papéis precisam de uma política de permissões explícita."
      ]
    },
    "sections": [
      {
        "title": "O que o OWASP Top 10 mede e não mede",
        "paragraphs": [
          "O OWASP Top 10 2025 agrupa riscos de segurança de aplicações web para conscientização e conversa entre equipes. As categorias atuais são: A01 Broken Access Control; A02 Security Misconfiguration; A03 Software Supply Chain Failures; A04 Cryptographic Failures; A05 Injection; A06 Insecure Design; A07 Authentication Failures; A08 Software or Data Integrity Failures; A09 Security Logging & Alerting Failures; A10 Mishandling of Exceptional Conditions. Os nomes são mantidos em inglês para corresponder à fonte oficial; traduza e explique o significado ao aplicá-los.",
          "A05 Injection já tem uma prática de banco em `db-security`: consultas parametrizadas com SQLite, valores separados da estrutura SQL e um teste de texto que parece SQL permanece literal. Revise essa aula em vez de copiar o mesmo exemplo para outro módulo. Parametrização reduz injeção por valores; autorização por proprietário, validação de domínio e privilégio mínimo continuam sendo decisões separadas.",
          "A lista ajuda a lembrar famílias de problemas, mas não é um inventário de todos os riscos, uma certificação nem prova de que um sistema está seguro. Um projeto pode não ter evidência suficiente para avaliar uma categoria. Registre o escopo, a versão da referência e o que foi realmente verificado.",
          "Esta aula pratica A01 e autorização por objeto com um servidor local isolado. As outras categorias exigem cenários e correções específicos; apenas nomeá-las não comprova que você saiba preveni-las. O roadmap mantém essas práticas separadas para evitar uma demonstração superficial."
        ],
        "terms": [
          { "term": "OWASP Top 10", "meaning": "Referência de conscientização que organiza categorias importantes de risco em aplicações web; não é certificação ou garantia de cobertura." },
          { "term": "A01 Broken Access Control", "meaning": "Falha em aplicar corretamente limites de acesso a ações e recursos." },
          { "term": "Risco", "meaning": "Possibilidade contextual de uma ameaça explorar uma fraqueza e causar impacto." }
        ]
      },
      {
        "title": "Autenticação não basta: autorize cada objeto",
        "paragraphs": [
          "Considere uma API com `GET /progress/aluno-a`. O servidor verifica que o pedido tem uma sessão válida. Isso autentica a chamada, mas não responde se a identidade autenticada pode ler `aluno-a`. Se o servidor usa diretamente o identificador controlado pelo cliente, uma pessoa pode trocar o ID e consultar outro objeto.",
          "A falha é chamada BOLA (Broken Object Level Authorization) no OWASP API Security Top 10; IDOR (Insecure Direct Object Reference) é um termo comum para uma referência direta cujo acesso não foi devidamente autorizado. O identificador não é, por si, uma vulnerabilidade: a falha é a ausência de autorização no objeto para a ação solicitada.",
          "A correção precisa estar no servidor e cobrir cada operação relevante: ler, alterar, excluir, exportar ou executar uma ação. Uma interface que esconde botões e um filtro na consulta podem melhorar a experiência, mas não protegem um endpoint contra pedidos alterados manualmente. Aplique negação por padrão e teste também a própria conta, para evitar bloquear tudo por engano.",
          "No projeto principal, Supabase RLS aplica autorização por linha usando o `sub` validado do Clerk e `user_id` da linha. O laboratório local usa uma comparação de dono simplificada para tornar o conceito visível; não substitui a policy do banco nem demonstra que a instância remota esteja correta."
        ],
        "terms": [
          { "term": "Autenticação", "meaning": "Verificação da identidade ou sessão que apresenta a requisição." },
          { "term": "Autorização", "meaning": "Decisão sobre quais ações uma identidade pode executar em um recurso." },
          { "term": "BOLA", "meaning": "Falha de autorização em nível de objeto de uma API: a pessoa consegue acessar um registro que não deveria." },
          { "term": "IDOR", "meaning": "Referência direta a um objeto usada sem verificar a permissão correspondente." },
          { "term": "Negação por padrão", "meaning": "Acesso é recusado até que uma regra explícita permita a ação." }
        ]
      },
      {
        "title": "Reproduzir e comparar no laboratório local",
        "paragraphs": [
          "O laboratório em `labs/security-basics` não contém dependências externas, credenciais reais ou persistência. O servidor vincula somente `127.0.0.1:4178`, usa duas sessões e dois registros inteiramente fictícios e expõe pares de rotas para leitura e atualização. Nunca publique esse exemplo: a rota vulnerável existe para estudo controlado.",
          "Execute `node --test server.test.cjs` e leia os seis casos. Eles comprovam que a falha é reproduzida na rota intencionalmente vulnerável e que a rota corrigida permite o registro próprio, recusa o de outra pessoa, ignora propriedade forjada no corpo e rejeita chamadas sem sessão ou com corpo inválido. `404` para registro alheio evita revelar se o objeto de outra pessoa existe.",
          "Se quiser observar manualmente, inicie `node server.cjs` em um terminal e faça requests apenas para `http://127.0.0.1:4178`, seguindo o README; pare com Ctrl+C. Não use o hostname Preview para acessar as rotas vulneráveis. O teste automatizado já executa localmente e não depende de domínio, login Vercel ou deployment.",
          "O teste comprova somente o comportamento deste exemplo local. Não é evidência de auditoria, de RLS remota, de configuração da Vercel, de resistência a todas as categorias OWASP ou de segurança do site inteiro."
        ],
        "terms": [
          { "term": "Regressão", "meaning": "Retorno de um defeito já corrigido; um teste preserva a expectativa para mudanças futuras." },
          { "term": "Marcador fictício", "meaning": "Valor inventado usado para distinguir dados de demonstração, sem representar informação pessoal real." },
          { "term": "Loopback", "meaning": "Endereço local da própria máquina; `127.0.0.1` não publica o servidor na rede externa." }
        ]
      },
      {
        "title": "Transformar a correção em evidência",
        "paragraphs": [
          "Para leitura, teste dois resultados positivos (A lê A e B lê B) e dois negativos (A não lê B e B não lê A). Para escrita, confirme que cada pessoa altera somente o próprio registro e que enviar outro `ownerId` no corpo não transfere a propriedade. Uma checagem só de sucesso pode deixar a falha cruzada invisível.",
          "Revise a origem da identidade: a sessão precisa ser validada pelo servidor. Nunca trate um `userId` fornecido pelo cliente como prova de identidade. Em produção, consulte a política de autorização no ponto de acesso aos dados; para Supabase, revise grants, RLS, claims e credencial usada. Não tente comprovar isso modificando dados remotos sem uma tarefa e ambiente autorizados.",
          "Ao documentar, registre a versão do código, o comando, as identidades fictícias, o pedido, o status e o resultado. Não registre tokens. Diferencie claramente ‘teste local passou’ de ‘controle remoto verificado’. Para incidentes reais, interrompa a exposição, preserve evidências sem dados sensíveis e siga o processo responsável de resposta."
        ],
        "terms": [
          { "term": "Teste positivo", "meaning": "Confirma que uma operação permitida continua funcionando." },
          { "term": "Teste negativo", "meaning": "Confirma que uma operação proibida é recusada e não produz alteração." },
          { "term": "Privilégio mínimo", "meaning": "Conceder somente as operações e recursos necessários à tarefa." }
        ]
      }
    ],
    "diagramTitle": "Identidade, objeto solicitado e decisão de acesso",
    "diagram": "Pessoa A → navegador (não confiável) → API local\n                               │\n                     valida sessão demo-token-a\n                               │ identidade = aluno-a\n                               ▼\n              solicita objeto /progress/aluno-b\n                               │\n          ┌────────────────────┴────────────────────┐\n          │ rota vulnerável                        │ rota corrigida\n          │ usa o ID da URL sem comparar dono       │ compara identidade com dono\n          ▼                                         ▼\n     200: dados B                            404: acesso recusado",
    "guided": [
      { "instruction": "Antes de rodar o laboratório, preveja o status de A lendo A e A tentando ler B em cada rota. Explique qual informação a rota vulnerável usa para escolher o objeto.", "result": "Ambas as rotas permitem A→A; a vulnerável também permite A→B, enquanto a corrigida recusa A→B. A rota vulnerável seleciona pelo ID fornecido na URL sem comparar com a identidade autenticada." },
      { "instruction": "Execute `node --test server.test.cjs` e encontre no resultado o caso que reproduz leitura cruzada e os casos que protegem leitura/escrita na rota corrigida.", "result": "Os seis testes passam; os nomes dos casos identificam falha reproduzida, acesso próprio, acesso cruzado, adulteração do corpo, autenticação e validação de entrada." },
      { "instruction": "Escreva uma matriz com ator A/B, objeto A/B e operações ler/atualizar. Marque permitir ou recusar e defina o resultado esperado para cada combinação.", "result": "A e B podem ler/atualizar o próprio objeto; as quatro combinações cruzadas são recusadas. Cada decisão tem um resultado verificável e nenhum dado de B é retornado a A." }
    ],
    "mistakes": [
      "Tratar uma sessão válida como permissão para ler qualquer ID.",
      "Confiar em `ownerId`, `userId` ou papel enviado no corpo ou query string.",
      "Proteger a tela, mas deixar a rota de API sem checagem de autorização.",
      "Testar somente que o usuário consegue acessar o próprio registro, sem testar acesso cruzado.",
      "Corrigir leitura e esquecer atualização, exclusão, exportação ou outra operação sobre o objeto.",
      "Usar um status que revela dados do registro alheio sem necessidade, como diferença entre ‘existe’ e ‘não autorizado’. ",
      "Interpretar seis testes locais como auditoria completa, prova de RLS remota ou validação de domínio."
    ],
    "exercises": [
      {
        "prompt": "Prever: a sessão demo-token-a chama `/demo/vulnerable/progress/aluno-b`. Antes de executar, indique se a autenticação passa, se a autorização foi comprovada e que resposta o teste espera observar.",
        "expected": "A sessão é reconhecida, mas a rota não comprova autorização sobre B; o laboratório espera `200` e um marcador fictício de B, reproduzindo a falha.",
        "criteria": ["Distingue sessão válida de permissão ao objeto.", "Prevê a resposta `200` na rota vulnerável.", "Identifica o ID de URL como entrada controlada pelo cliente."],
        "solution": "A rota vulnerável autentica demo-token-a, mas escolhe a linha usando aluno-b sem validar a relação com aluno-a; portanto o resultado didático é `200` com marcador B.",
        "explanation": "A previsão separa a validação de identidade da autorização que falta para o objeto.",
        "hints": ["Qual identidade o token demo representa?", "Quem escolheu o ID da rota e onde deveria ocorrer a comparação?"]
      },
      {
        "prompt": "Alterar: observe o request de atualização no laboratório. Envie no JSON um `ownerId` correspondente a B enquanto usa a sessão A. Preveja o resultado da rota corrigida e explique qual valor deve definir a identidade.",
        "expected": "A rota corrigida ignora a propriedade enviada pelo cliente e usa a identidade derivada da sessão validada; o pedido cruzado é recusado e o registro B permanece inalterado.",
        "criteria": ["Não confia no campo de propriedade enviado pelo cliente.", "Especifica recusa sem alteração de B.", "Identifica a sessão validada no servidor como origem da identidade."],
        "solution": "A API obtém aluno-a da sessão e compara com o dono do recurso. O ownerId do corpo não tem autoridade; A→B recebe recusa e a asserção do teste confirma que B não mudou.",
        "explanation": "Uma correção segura controla a origem da identidade e protege tanto a decisão de acesso quanto o efeito da operação.",
        "hints": ["O cliente consegue editar o corpo HTTP?", "Que estado precisa continuar igual após uma tentativa proibida?"]
      },
      {
        "prompt": "Construir: amplie a matriz de autorização com operações `ler`, `atualizar` e `exportar`, para as identidades A/B e objetos A/B. Indique resultado esperado e um teste que confirme a negação cruzada para cada operação.",
        "expected": "A matriz permite operações próprias e recusa operações cruzadas; cada teste verifica status de recusa e ausência de conteúdo/alteração/exportação alheia. A proposta não assume que uma checagem de leitura cobre outras ações.",
        "criteria": ["Cobre as três operações e as duas identidades.", "Inclui casos positivos e negativos por operação.", "Confirma ausência de efeito ou dado no caso recusado."],
        "solution": "Para cada ação, A→A e B→B são permitidos; A→B e B→A são recusados. O teste de exportação deve confirmar que a resposta não inclui linhas alheias; atualização confirma estado intacto após recusa; leitura confirma ausência do objeto.",
        "explanation": "A autorização é por ação e objeto; uma rota protegida não protege automaticamente outra rota.",
        "hints": ["Repita a matriz para cada verbo/ação, não só para SELECT.", "O que deve permanecer inalterado depois de um pedido bloqueado?"]
      },
      {
        "prompt": "Investigar erro: após uma refatoração, o teste ‘A não consegue ler B’ falha. Escreva a sequência local de investigação para localizar se a identidade, o ID solicitado ou a checagem de dono mudou; não publique nem execute pedidos contra Preview ou Supabase.",
        "expected": "Reproduz o teste local, compara sessão resolvida e ID do objeto, inspeciona a condição de autorização e a resposta sem imprimir tokens, verifica se o caminho corrigido ainda é usado e confirma que nenhum dado foi alterado; corrige a menor causa e repete os seis testes.",
        "criteria": ["Reproduz somente no laboratório local.", "Inspeciona identidade, objeto e regra separadamente.", "Não imprime credenciais nem usa serviços publicados.", "Repete os casos positivos e negativos depois da correção."],
        "solution": "Execute `node --test server.test.cjs`, anote o caso que falhou e examine em `server.cjs` a resolução da sessão, o `ownerId` da URL e a comparação no handler corrigido. Confirme que a rota é `/demo/fixed`, que a propriedade vem do registro/sessão no servidor e que o teste verifica estado inalterado. Corrija o menor defeito e rode novamente o comando completo.",
        "explanation": "Uma falha de autorização precisa ser rastreada pelos valores e pela decisão que atravessam a fronteira, não mascarada com uma mudança no cliente.",
        "hints": ["O teste falha na autenticação, na autorização ou na asserção de efeito?", "Compare a origem da identidade antes e depois da refatoração."]
      }
    ],
    "quiz": [
      { "question": "O que a autenticação de uma sessão válida garante, por si só?", "options": ["Que a identidade foi reconhecida; não que pode acessar todo objeto.", "Acesso a qualquer registro da API.", "Que o navegador não pode alterar o ID da URL."], "correctIndex": 0, "explanation": "Autorização precisa decidir separadamente a ação sobre cada recurso." },
      { "question": "Qual cenário melhor descreve BOLA/IDOR?", "options": ["A pessoa troca um ID e o servidor retorna objeto alheio sem verificar permissão.", "Uma página tem um link quebrado.", "O servidor rejeita uma sessão expirada."], "correctIndex": 0, "explanation": "A falha está na ausência de autorização em nível de objeto, não na existência de um identificador." },
      { "question": "Onde deve ocorrer a decisão final de autorização para uma API?", "options": ["No servidor ou camada confiável de dados, em cada ação relevante.", "Somente ao esconder um botão no navegador.", "No campo `ownerId` enviado pelo cliente."], "correctIndex": 0, "explanation": "O navegador e os valores que ele envia são controláveis pelo usuário." },
      { "question": "O que os seis testes locais do laboratório comprovam?", "options": ["Comportamento coberto no exemplo local, não a segurança total ou a configuração remota.", "Que todas as dez categorias OWASP foram corrigidas.", "Que o domínio Vercel está validado."], "correctIndex": 0, "explanation": "A evidência é limitada ao código e aos cenários que o teste executa." }
    ],
    "summary": [
      "OWASP Top 10 2025 é referência de conscientização; não é certificação nem prova de segurança.",
      "Autenticação identifica a sessão; autorização decide cada ação sobre cada objeto.",
      "BOLA/IDOR acontece quando uma API aceita referência a objeto sem conferir acesso.",
      "O servidor deriva identidade de sessão validada, ignora propriedade forjada pelo cliente e aplica negação por padrão.",
      "O laboratório local reproduz A01/BOLA com dados fictícios; os testes não validam Preview, domínio ou Supabase remoto."
    ]
  },
  "delivery-xss-output": {
    "prerequisites": "Concluir `delivery-owasp-top10`; conhecer strings, eventos, DOM e `textContent` de `js-dom`/`js-events`. A atividade demonstra uma falha DOM XSS somente em cópia local fora do repositório. Não exige servidor, conta, domínio ou deploy.",
    "setup": "Leia `labs/security-xss/README.md`. Faça uma cópia de `labs/security-xss/demo.html.example` para fora do repositório e renomeie a cópia para `demo-local.html`. No Windows, no PowerShell aberto na pasta do repositório, execute `Copy-Item labs/security-xss/demo.html.example \"$env:TEMP\\demo-local.html\"`; no macOS/Linux execute `cp labs/security-xss/demo.html.example /tmp/demo-local.html`. Abra a cópia no navegador e use Tab/Enter. O resultado esperado é: botão vulnerável altera o aviso local; botão corrigido mostra a marcação literalmente e não altera o aviso. Feche a aba para parar; para retomar, abra a cópia. Se ela não abrir, confira a extensão `.html`; como alternativa, compare os dois sinks no código sem executar. O arquivo `.html.example` fica inerte no Preview e nenhuma validação de domínio é necessária.",
    "why": "O navegador interpreta HTML e JavaScript. Se dados não confiáveis forem enviados ao contexto errado, uma anotação pode virar estrutura ou código e agir na sessão de quem a visualiza. A defesa depende de como o valor é inserido no destino, não só de como foi validado ao entrar.",
    "example": {
      "language": "js",
      "code": "const nota = campo.value;\n\n// O navegador analisa o valor como HTML: sink perigoso para texto externo.\nsaidaVulneravel.innerHTML = nota;\n\n// O valor vira nó de texto, apropriado quando a intenção é mostrar texto.\nsaidaSegura.textContent = nota;",
      "expected": "No primeiro caso, o navegador interpreta elementos e atributos presentes no valor. No segundo, a sequência com sinais `<` e `>` aparece como texto literal; nenhum elemento é criado.",
      "explanation": [
        "Fonte é o lugar de onde pode vir conteúdo não confiável, como campo, URL ou resposta de API. Sink é o ponto em que o valor é usado; alguns sinks interpretam HTML ou código.",
        "XSS refletido aparece quando dado de uma requisição volta na resposta; XSS armazenado envolve dado guardado e mostrado depois; XSS baseado em DOM surge quando JavaScript do cliente leva um valor até um sink inseguro. Essas descrições podem se sobrepor no mesmo fluxo.",
        "Para texto simples em um elemento comum, `textContent` evita analisar a string como marcação. Isso não torna qualquer uso seguro: atributos, URLs, CSS, JavaScript e HTML têm contextos e regras diferentes.",
        "Se o produto precisa aceitar HTML formatado, mostrar a string como texto pode quebrar a intenção. Use sanitização mantida e política explícita de elementos/atributos permitidos; não tente criar um filtro caseiro removendo apenas `<script>`."
      ]
    },
    "sections": [
      {
        "title": "Como texto passa a ser conteúdo executável",
        "paragraphs": [
          "A aplicação frequentemente mistura conteúdo vindo de pessoas, URLs ou APIs com a página. Um texto como `Olá` em uma anotação é dado. Se a aplicação usa um sink que manda interpretar a string como HTML, o navegador cria elementos e pode processar atributos com comportamento ativo. A falha é o fluxo fonte→sink sem proteção adequada para o contexto de saída.",
          "Cross-Site Scripting (XSS) descreve a execução de código não confiável no contexto de um site confiável. O impacto depende de permissões da página e da sessão, mas pode permitir ações como a própria pessoa, ler conteúdo disponível ao script ou alterar a interface. Não é necessário que o invasor controle o servidor do site: conteúdo pode entrar por formulário, URL, API ou dado persistido.",
          "Refletido: valor recebido numa requisição aparece de volta na resposta. Armazenado: o valor é guardado e outra visualização o renderiza. Baseado em DOM: JavaScript no navegador lê uma fonte e altera o DOM por um sink. Use os rótulos para rastrear caminhos; uma vulnerabilidade pode combinar etapas de mais de uma classe.",
          "Pausa: marque no exemplo qual elemento é fonte e quais linhas são sinks. Antes de apertar qualquer botão, preveja o que o navegador fará com os sinais `<` e `>`."
        ],
        "terms": [
          { "term": "XSS", "meaning": "Falha que permite conteúdo não confiável ser interpretado como código no contexto de uma página confiável." },
          { "term": "Fonte", "meaning": "Origem de um valor que deve ser tratado como não confiável, como campo, URL ou resposta externa." },
          { "term": "Sink", "meaning": "Ponto de uso que pode interpretar um valor como HTML, JavaScript, URL ou outro contexto." },
          { "term": "DOM XSS", "meaning": "Caminho em que código cliente transforma uma fonte controlável em alteração insegura do DOM." }
        ]
      },
      {
        "title": "Inserir texto conforme o contexto",
        "paragraphs": [
          "O laboratório tem dois destinos. `innerHTML` interpreta a string como fragmento HTML. A cópia local usa uma imagem que aponta para um arquivo inexistente e um manipulador que só muda um aviso nessa mesma página. Ao escolher o botão vulnerável, o navegador cria a imagem, ocorre o erro local e o aviso mostra que o manipulador executou. Essa demonstração não usa rede, cookie ou outro dado.",
          "`textContent` substitui o conteúdo por texto. A mesma sequência aparece com `<img ...>` visível; não há elemento de imagem, então o evento não existe. Para mostrar texto comum, prefira `textContent` ou o mecanismo padrão de escape do framework/template. Se o destino for outro contexto, escolha uma defesa compatível com ele: texto HTML, atributo entre aspas, URL permitida, CSS ou JavaScript não são intercambiáveis.",
          "Validação de entrada continua útil para formato e regra de negócio, mas não substitui codificação/escape de saída. Uma nota com caracteres permitidos ainda pode ser interpretada como HTML. Escape genérico também não resolve todos os contextos: encode para o destino correto e evite construir código ou atributos de evento com dados.",
          "Se usuários devem escrever conteúdo formatado, defina uma lista permitida e use sanitizador mantido, como DOMPurify, atualizado conforme orientação do fornecedor. Não altere o HTML já sanitizado de modo que invalide a proteção e não adicione biblioteca ao projeto principal como parte deste exemplo."
        ],
        "terms": [
          { "term": "Codificação de saída", "meaning": "Representação de um valor de modo que seja tratado como dado no contexto específico de saída." },
          { "term": "Sanitização HTML", "meaning": "Remoção/normalização controlada de estruturas HTML fora de uma política permitida quando rich text é requisito." },
          { "term": "HTML confiável", "meaning": "Marcação produzida ou validada conforme uma política explícita; uma string arbitrária não se torna confiável por ser salva no banco." }
        ]
      },
      {
        "title": "Testar a cópia isolada sem atingir um site",
        "paragraphs": [
          "O fonte do laboratório termina em `.html.example` para não ser servido como página executável pelo deployment. A atividade manda copiar para uma pasta temporária fora do repositório e renomear a cópia. Abra somente `demo-local.html` pelo computador. O texto do campo é fictício e a execução limitada só altera o aviso local.",
          "Use teclado: Tab até o campo, observe o valor e depois escolha um botão com Enter. O botão vulnerável mostra execução no aviso; o corrigido imprime a marcação e mantém o aviso inalterado. Depois confira no código as atribuições a `innerHTML` e `textContent`. Não é preciso clicar nem abrir o laboratório no Preview Vercel.",
          "Se o botão vulnerável não alterar o aviso, confira se abriu a cópia `.html` e se pressionou o botão correto. Não desative controles de segurança do navegador nem tente outros payloads. Como alternativa, analise o fluxo no código e escreva a previsão sem executar a página.",
          "O teste demonstra apenas esse sink e esse navegador local. Não prova que uma aplicação inteira esteja protegida: examine caminhos de renderização, bibliotecas, atributos/URLs, dados persistidos e permissões do site separadamente."
        ],
        "terms": [
          { "term": "Isolamento de demonstração", "meaning": "Limitar a atividade a uma cópia local, dados inventados e um efeito visível que não sai da própria página." },
          { "term": "Defesa em profundidade", "meaning": "Combinação de controles complementares; uma política adicional não substitui o uso seguro do sink." },
          { "term": "CSP", "meaning": "Content Security Policy: política HTTP de defesa adicional que pode limitar fontes de scripts, sem corrigir um sink inseguro por si só." }
        ]
      },
      {
        "title": "Escolher critérios de correção e limites",
        "paragraphs": [
          "Um critério útil diz o que deve acontecer com uma entrada de exemplo e qual sinal comprova. Para uma anotação simples: ao salvar `<b>nota</b>`, a interface deve mostrar literalmente as tags; o DOM não deve conter um elemento `b` criado a partir do valor. Repita na leitura depois de recarregar, porque dado persistido continua não confiável.",
          "Revise todos os caminhos que exibem a mesma propriedade: lista, resumo, busca, diálogo, exportação e visualização em outro dispositivo. Uma única tela protegida não corrige outros sinks. Em código de servidor, use template com escape contextual por padrão e não concatene strings HTML com dados do aluno.",
          "Para uma exigência de rich text, documente quais elementos e atributos são permitidos, sanitizador e versão, ordem de sanitização e teste de regressão. CSP e Trusted Types podem reduzir alguns riscos em navegadores compatíveis, mas não devem ser apresentados como substitutos para tratar dados corretamente.",
          "Feche a aba local e apague a cópia temporária. Marque como ‘pratiquei localmente’ apenas o comportamento observado; não confunda a atividade com auditoria do site Preview ou prova de domínio sobre segurança."
        ],
        "terms": [
          { "term": "Trusted Types", "meaning": "Mecanismo de plataforma que pode exigir tipos confiáveis em certos sinks DOM; defesa adicional sujeita a suporte e configuração." },
          { "term": "Regressão de segurança", "meaning": "Teste que mantém uma propriedade de proteção e falha se uma alteração voltar a permitir comportamento inseguro." },
          { "term": "CSP", "meaning": "Cabeçalho que declara fontes e restrições de conteúdo para navegadores; não é a única defesa contra XSS." }
        ]
      }
    ],
    "diagramTitle": "Caminho do dado até o DOM",
    "diagram": "Campo do usuário (fonte não confiável)\n                │\n                ├── innerHTML ── navegador analisa HTML ── elemento/evento ativo\n                │\n                └── textContent ─ navegador cria nó de texto ── marcação permanece literal\n\nA escolha do sink depende do contexto e da intenção do produto.",
    "guided": [
      { "instruction": "Antes de abrir a cópia local, identifique fonte, dois sinks e o aviso que serve como sinal. Preveja o conteúdo e o estado do aviso depois de cada botão.", "result": "A textarea é a fonte; `innerHTML` interpreta marcação e pode mudar o aviso local; `textContent` mostra a sequência literalmente e não executa o evento." },
      { "instruction": "Execute os dois botões usando somente a cópia local. Registre a observação para a saída vulnerável e para a saída corrigida sem ampliar o payload.", "result": "O exemplo vulnerável cria a imagem e muda o aviso ao ocorrer o erro local; a saída corrigida mostra a marcação como texto e mantém o aviso anterior." },
      { "instruction": "Pense em uma lista do curso que renderiza anotações em mais de um lugar. Liste os pontos onde a mesma anotação deve ser rastreada como fonte até um sink.", "result": "A revisão identifica lista, detalhe, busca, diálogo e qualquer outra tela/exportação que mostre a anotação; cada saída tem um sink apropriado e casos de regressão." }
    ],
    "mistakes": [
      "Achar que validar comprimento ou remover a palavra `script` torna a saída HTML segura.",
      "Usar `innerHTML` para texto simples porque a entrada veio de uma conta autenticada.",
      "Supor que `textContent` é uma defesa universal para URL, atributos, CSS e código JavaScript.",
      "Escapar todo valor uma vez na entrada e reutilizá-lo em qualquer destino/contexto.",
      "Corrigir somente a tela de criação e ignorar a leitura posterior de dado armazenado.",
      "Acreditar que CSP ou Trusted Types tornam dispensável corrigir o sink.",
      "Publicar a cópia vulnerável ou testar payloads em site de terceiros."
    ],
    "exercises": [
      {
        "prompt": "Prever: o campo contém `<b>Revisão</b>`. Antes de clicar nos botões, explique qual saída cria um elemento em negrito e qual mostra literalmente os sinais de marcação.",
        "expected": "A atribuição a `innerHTML` cria elemento HTML e mostra texto em negrito; `textContent` mostra `<b>Revisão</b>` literalmente.",
        "criteria": ["Prevê o resultado de cada sink.", "Explica que `innerHTML` analisa HTML.", "Explica que `textContent` insere texto no exemplo."],
        "solution": "O navegador interpreta a string em `innerHTML`; em `textContent`, a string vira nó de texto e as tags aparecem visivelmente.",
        "explanation": "A diferença é o comportamento do destino no DOM, não a aparência da string na variável.",
        "hints": ["Qual propriedade altera parsing da árvore HTML?", "Qual propriedade expressa intenção de texto simples?"]
      },
      {
        "prompt": "Alterar: uma anotação aparece dentro de um elemento com `innerHTML`. Troque somente a forma de saída para texto e descreva como o teste deve provar que nenhum elemento vindo da nota foi criado.",
        "expected": "Use `textContent` para texto simples; o teste verifica a string literal visível e confirma que a saída não contém o elemento `b` criado a partir da entrada.",
        "criteria": ["Escolhe uma API compatível com texto simples.", "Verifica o texto que a pessoa vê.", "Verifica também ausência de elemento interpretado."],
        "solution": "Atribua `saida.textContent = anotacao`; com `<b>nota</b>` o texto aparece incluindo as tags e a árvore de elementos não ganha um `b` a partir da anotação.",
        "explanation": "Um teste de segurança observa o efeito no DOM e não apenas se a função retornou sem erro.",
        "hints": ["A anotação deveria oferecer formatação ou ser exibida como texto?", "Qual observação separa texto literal de HTML interpretado?"]
      },
      {
        "prompt": "Construir: escreva três critérios de aceite para adicionar anotações ao curso: um para criação, outro para leitura após recarga e outro para busca. Use entradas inertes como `<b>teste</b>` e não inclua payload que acesse dados ou rede.",
        "expected": "Os critérios requerem que a entrada seja exibida literalmente em cada fluxo, que nenhum elemento HTML da anotação seja criado e que não ocorra efeito ativo depois de salvar, recarregar ou buscar.",
        "criteria": ["Cobre criação, leitura persistida e busca.", "Usa marcador sem efeito externo.", "Define um resultado observável e ausência de efeito ativo."],
        "solution": "1) Ao digitar `<b>teste</b>` e salvar, o painel exibe a string com tags. 2) Após recarregar, a nota segue literal e o DOM não contém um `b` originado do valor. 3) Buscar `teste` encontra a nota sem interpretar nem executar HTML.",
        "explanation": "Vulnerabilidades de saída podem reaparecer em qualquer tela que reusa o mesmo dado, inclusive depois de persistência.",
        "hints": ["Siga o dado depois de salvar.", "Busque um sinal de parsing além do texto na tela."]
      },
      {
        "prompt": "Investigar erro: após uma mudança visual, as tags de uma anotação voltaram a renderizar como elementos. Descreva uma investigação segura começando pela saída DOM e rastreando o valor; não experimente outros payloads nem use o Preview.",
        "expected": "Reproduz com marcador inerte na cópia local, localiza todos os usos do campo e distingue fonte/sink, confere se alguém voltou a usar `innerHTML` ou mudou o contexto, aplica o sink correto e repete critérios de lista/detalhe/busca sem enviar dados.",
        "criteria": ["Usa somente a cópia local e um marcador inerte.", "Rastreia o dado até o sink que o interpreta.", "Confere todas as saídas da anotação.", "Define resultado literal e ausência de elemento ativo após correção."],
        "solution": "Reproduza localmente com `<b>teste</b>`, inspecione a árvore do DOM e busque os sinks usados para nota. Compare o código antes/depois do ajuste visual, substitua a inserção de texto por `textContent` ou o escape contextual do template e confirme os mesmos critérios nas telas que reusam o dado.",
        "explanation": "Uma alteração de apresentação pode reintroduzir um sink perigoso sem mudar a origem do dado; investigar o fluxo é mais confiável que tentar filtrar strings isoladas.",
        "hints": ["A entrada mudou ou o ponto de renderização mudou?", "Qual saída usa a anotação depois da busca e depois da recarga?"]
      }
    ],
    "quiz": [
      { "question": "Para mostrar uma anotação como texto em um elemento comum, qual abordagem é adequada?", "options": ["Atribuir o valor a `textContent`.", "Interpolar a string em `innerHTML`.", "Remover apenas a palavra `script`."], "correctIndex": 0, "explanation": "`textContent` cria texto no DOM sem analisar a string como HTML nesse contexto." },
      { "question": "O que caracteriza um sink relevante para DOM XSS?", "options": ["Ponto em que um valor não confiável é interpretado ou usado para alterar o DOM.", "Qualquer variável dentro do navegador.", "Um arquivo CSS sem minificação."], "correctIndex": 0, "explanation": "Investigue caminhos entre fontes de dados e APIs que interpretam o valor." },
      { "question": "Por que validar a entrada não substitui tratar a saída?", "options": ["Um valor permitido pela regra ainda pode ter significado especial no contexto de saída.", "Validação nunca tem utilidade.", "O navegador ignora todas as entradas com aspas."], "correctIndex": 0, "explanation": "A defesa de saída depende do contexto de interpretação específico." },
      { "question": "O que a cópia local do laboratório comprova?", "options": ["O comportamento observado de dois sinks num exemplo isolado.", "Que o site Preview inteiro não tem XSS.", "Que o domínio ou as políticas Vercel foram validados."], "correctIndex": 0, "explanation": "O experimento é didático, local e restrito aos casos apresentados." }
    ],
    "summary": [
      "Rastreie fonte não confiável até cada sink e avalie o contexto onde o valor será interpretado.",
      "`innerHTML` analisa marcação; `textContent` é o caminho simples para mostrar texto em elemento comum.",
      "Validação, CSP e Trusted Types são camadas complementares; escolha saída contextual correta.",
      "Rich text precisa de política e sanitizador mantido; não filtre HTML com regras improvisadas.",
      "A demonstração é uma cópia local com efeito inofensivo; não se executa nem valida no Preview."
    ]
  },
  "delivery-csrf": {
    "prerequisites": "Concluir `setup-node`, `delivery-xss-output`, `delivery-oauth-google` e `delivery-clerk-supabase`; conhecer métodos HTTP, cookies, sessão, origem e cabeçalhos. O laboratório usa servidor Node local e sessão fictícia. Não exige serviço remoto, navegador autenticado, domínio ou deploy.",
    "setup": "No editor, leia `assets/js/cloud.js` (função `cloudRequest`), `assets/js/auth.js` e `labs/security-csrf/README.md`. No terminal aberto na raiz do repositório, execute `cd labs/security-csrf` e `node --test server.test.cjs`; a saída esperada termina com `tests 7`, `pass 7` e `fail 0`. Os testes usam API local, poucos pedidos e estado reiniciado por caso; não enviam carga. Para retomar, repita o comando. Se Node não for reconhecido, siga `setup-node`; alternativa leve: leia a matriz e os testes sem executar servidor. A atividade não abre Preview, domínio nem painel externo.",
    "why": "Uma requisição entre sites pode chegar ao servidor mesmo quando o site atacante não consegue ler a resposta. Se o navegador acrescenta automaticamente o cookie de sessão e o servidor confia somente nesse cookie, uma ação pode ocorrer sem intenção da pessoa. A defesa precisa corresponder ao modo como a aplicação autentica as chamadas.",
    "example": {
      "language": "text",
      "code": "MATRIZ DE PEDIDOS (não executa requisições):\n\nSessão por cookie:\n  formulário em origem externa → POST simples → navegador pode anexar cookie\n  servidor confere só cookie → risco de ação CSRF\n\nAPI com credencial explícita:\n  `cloud.js` obtém token Clerk → adiciona `Authorization: Bearer ...`\n  navegador envia a Supabase com chave pública e corpo JSON\n  CORS/preflight e credencial explícita mudam o fluxo; RLS continua necessária\n\nCORS controla compartilhamento de resposta/origem; não é autorização do usuário nem defesa universal contra CSRF.",
      "expected": "No modelo por cookie, o navegador pode anexar a sessão automaticamente a um pedido simples e o servidor precisa verificar que a intenção veio da aplicação. No fluxo analisado de `cloud.js`, o token Bearer é obtido e adicionado explicitamente ao cabeçalho; isso reduz a aplicabilidade do CSRF clássico baseado apenas em cookie, mas não comprova a configuração CORS, RLS, o comportamento interno do Clerk ou a segurança geral do sistema.",
      "explanation": [
        "CSRF (Cross-Site Request Forgery) tenta induzir o navegador autenticado a enviar uma ação ao site de destino; o atacante pode não conseguir ler a resposta para ainda assim causar a mudança.",
        "O risco clássico depende de credencial enviada automaticamente, como cookie de sessão. Um token Bearer inserido em cabeçalho explícito por JavaScript segue outro modelo; não confunda isso com prova de que todos os endpoints estão protegidos.",
        "CORS pode impedir que um script leia respostas ou que certas chamadas não simples sejam enviadas sem preflight. Formulários ainda podem emitir pedidos simples; a API precisa validar a própria autorização e a defesa CSRF adequada.",
        "A aula compara padrões e lê o código do projeto. Não testa cookies reais, config de navegador, painel Vercel, Clerk, CORS do Supabase nem domínio Preview."
      ]
    },
    "sections": [
      {
        "title": "O modelo de ameaça do CSRF",
        "paragraphs": [
          "Imagine que a pessoa entra numa aplicação e recebe um cookie de sessão. Enquanto esse cookie continua válido, o navegador pode anexá-lo automaticamente a chamadas destinadas ao site. Uma página externa induz a pessoa a visitar um link ou enviar um formulário para uma rota que altera dados. O servidor vê um cookie válido e, se não tiver outra prova de intenção, pode aceitar a ação.",
          "O CSRF não exige que o atacante leia a resposta nem que descubra a senha. O impacto depende das operações disponíveis: alterar endereço, publicar conteúdo, criar uma ação ou mudar configurações. A condição central é um pedido de mudança de estado que aceita uma credencial automaticamente enviada sem confirmar a intenção da aplicação legítima.",
          "O método HTTP precisa corresponder à semântica. `GET`, `HEAD` e `OPTIONS` devem ser seguros e não mudar estado; ações de escrita usam `POST`, `PUT`, `PATCH` ou `DELETE`, com autorização apropriada. `SameSite=Lax` não salva uma aplicação que altera estado em `GET`, pois cookies podem acompanhar navegações principais com método seguro.",
          "Pausa: no diagrama, separe o pedido que o visitante inicia, a credencial que o browser acrescenta e a decisão que o servidor precisa tomar."
        ],
        "terms": [
          { "term": "CSRF", "meaning": "Tentativa de fazer o navegador de uma pessoa autenticada enviar uma ação que ela não pretendia executar." },
          { "term": "Credencial ambient", "meaning": "Credencial que o navegador pode anexar automaticamente conforme o destino e as regras do browser, como um cookie de sessão." },
          { "term": "Pedido seguro", "meaning": "Método HTTP que, por semântica, não deve causar alteração de estado do servidor; GET é exemplo comum." },
          { "term": "Intenção da requisição", "meaning": "Sinal verificável de que a ação foi iniciada pela aplicação legítima e não apenas carregada com sessão válida." }
        ]
      },
      {
        "title": "CORS não substitui defesa CSRF",
        "paragraphs": [
          "Same Origin Policy e CORS regulam interações entre origens no navegador, incluindo se um script pode ler uma resposta. Eles não significam que toda requisição entre origens deixa de ser enviada. Formulários HTML podem enviar pedidos simples compatíveis com a web antiga; o servidor pode receber e processar o pedido antes de o browser impedir a leitura da resposta pelo site externo.",
          "Uma chamada `fetch()` com cabeçalho personalizado ou tipo de conteúdo não simples exige preflight CORS. O servidor decide se permite aquela origem e aqueles cabeçalhos. Se uma origem atacante for permitida com credenciais, a política pode abrir caminho para chamadas indevidas. Uma lista ampla de origens não é autorização: o servidor ainda precisa autenticar, autorizar e validar intenção.",
          "CORS é uma política de compartilhamento de recursos entre origens; autorização responde se a identidade pode executar a ação; defesa CSRF responde se o pedido autenticado veio da aplicação/intenção esperada. São perguntas diferentes. Não use ‘CORS bloqueia’ como conclusão sem avaliar método, headers, cookies, resposta e comportamento do servidor.",
          "Pausa: compare um POST de formulário com um `fetch` que envia `X-CSRF-Token`. Qual chega ao servidor sem preflight? O que muda se a política CORS permite a origem atacante?"
        ],
        "terms": [
          { "term": "Origem (origin)", "meaning": "Combinação de esquema, host e porta usada pelo navegador para distinguir contextos de segurança." },
          { "term": "CORS", "meaning": "Mecanismo pelo qual um servidor declara quais origens podem ler certas respostas ou enviar certas chamadas não simples pelo navegador." },
          { "term": "Preflight", "meaning": "Pedido OPTIONS que o navegador envia para consultar se uma chamada cross-origin não simples está autorizada pela política CORS." },
          { "term": "Pedido simples", "meaning": "Categoria de chamadas de navegador compatíveis com envio cross-origin sem preflight; submissões de formulário podem se encaixar nela." }
        ]
      },
      {
        "title": "Combinar controles por risco e sessão",
        "paragraphs": [
          "Token CSRF: o servidor entrega um valor imprevisível ligado à sessão e confere sua presença e validade em cada operação que muda estado. Não ponha token em URL, logs ou dados compartilhados. Um campo oculto serve para formulário; um cabeçalho personalizado pode servir para API JavaScript se a política CORS for restrita. A validação final acontece no servidor.",
          "Cookie `SameSite` controla quando o browser envia cookies em pedidos cross-site. `Strict` restringe mais, mas pode mudar a experiência de navegação; `Lax` oferece um equilíbrio e ainda permite alguns contextos de navegação; `None` permite contexto cross-site e requer `Secure`. Considere `Secure`, `HttpOnly` e `SameSite` conforme finalidade. `HttpOnly` reduz leitura por JavaScript, mas não impede que o browser envie o cookie em CSRF.",
          "Origin/Referer e Fetch Metadata (`Sec-Fetch-Site`) podem ajudar o servidor a identificar pedidos cross-site. Compare origem exata e defina o tratamento quando cabeçalho estiver ausente ou `null`; não permita curinga sem análise. Use-os como camada adicional ou parte de uma política explicitamente avaliada, sem confiar em valores arbitrários do corpo.",
          "Mantenha `GET` sem efeitos de escrita, exija autorização e, quando o modelo de sessão justificar, token CSRF. Reautenticação ou confirmação explícita pode proteger ações críticas, mas não substitui o conjunto de controles. Um XSS na origem confiável pode usar o contexto da página para contornar várias defesas CSRF; trate XSS em conjunto."
        ],
        "terms": [
          { "term": "Token sincronizado", "meaning": "Valor imprevisível criado/guardado pelo servidor e enviado explicitamente pela página; o servidor compara com a sessão." },
          { "term": "SameSite", "meaning": "Atributo de cookie que limita seu envio em certos contextos cross-site; camada complementar, com efeitos de compatibilidade." },
          { "term": "Origin/Referer", "meaning": "Cabeçalhos de navegador que podem indicar origem de um pedido; compare contra origem esperada de forma exata." },
          { "term": "Fetch Metadata", "meaning": "Família de cabeçalhos `Sec-Fetch-*` que informa contexto de navegação, incluindo `Sec-Fetch-Site`." }
        ]
      },
      {
        "title": "Ler o modelo real do projeto sem presumir resultado",
        "paragraphs": [
          "Em `assets/js/cloud.js`, `cloudRequest` chama `window.Clerk.session.getToken()` e define `Authorization: Bearer ${token}` antes de enviar uma requisição REST ao Supabase. O código também envia uma chave publicável em `apikey` e, para corpo, `Content-Type: application/json`. Não configura `credentials: include`; por padrão, o navegador não anexa credenciais cross-origin como faria numa chamada de mesma origem. Isso é observação do código, não teste de rede.",
          "Uma chamada com credencial Bearer explícita não é o mesmo cenário de um servidor que autentica só por cookie ambient. O browser não permite que um formulário HTML comum escolha esse cabeçalho. Chamadas customizadas passam por regras CORS/preflight. Mesmo assim, token exposto a XSS, configuração CORS permissiva, autorização incorreta, endpoints alternativos ou cookies em outra parte do sistema exigem análise própria. RLS continua sendo a fronteira de dados do projeto.",
          "Não conclua ‘o projeto está imune a CSRF’ por ler um único arquivo. Nesta atividade não auditamos internals do Clerk, configuração remota do Supabase, toda a superfície HTTP ou cookies dos provedores. A conclusão permitida é mais estreita: o caminho REST observado anexa token Bearer explicitamente e não declara `credentials: include`; cada hipótese restante exige evidência no ambiente autorizado.",
          "Pausa: no código, localize a linha que obtém o token, o cabeçalho que o envia e o serviço de destino. Marque separadamente o que está visível no repositório e o que dependeria de configuração externa."
        ],
        "terms": [
          { "term": "Bearer token", "meaning": "Credencial apresentada explicitamente em um cabeçalho `Authorization`; o servidor ainda valida e autoriza cada operação." },
          { "term": "RLS", "meaning": "Políticas no PostgreSQL que restringem linhas conforme a identidade/claims validados, mesmo quando o cliente manipula o pedido." },
          { "term": "Evidência local", "meaning": "Conclusão limitada ao arquivo, trecho ou comando observado; não confirma configurações remotas." }
        ]
      },
      {
        "title": "Comparar controles em laboratório isolado",
        "paragraphs": [
          "Em `labs/security-csrf`, a sessão `aluna_demo`, o cookie e o token são fictícios; o token é previsível e não demonstra entropia para produção. A rota `/demo/vulnerable/nota` exige somente o cookie e permite uma alteração; `/demo/protected/nota` exige uma origem exata configurada e um cabeçalho `X-CSRF-Token` correspondente. Os testes verificam respostas 200/401/403/413 e consultam a nota depois para confirmar se a escrita ocorreu.",
          "A comparação torna uma propriedade observável: pedido recusado não muda estado; sessão válida sozinha não basta na rota protegida. O servidor é independente do produto Clerk/Supabase, não compartilha sessão com usuários e não guarda dados reais. A combinação de controles é exemplo didático de contrato, não receita universal para qualquer sessão ou proxy.",
          "Os testes criam o cabeçalho `Cookie` explicitamente com Node fetch. Portanto, não comprovam que um browser anexou cookie automaticamente, nem exercitam `SameSite`, navegação, CORS/preflight real, XSS ou comportamento de provedor. A aula combina essa evidência limitada com o modelo de ameaça; nenhum teste do laboratório permite concluir que o Tech Learning Hub está imune.",
          "Pausa: a rota vulnerável altera a nota, enquanto a protegida recusa uma origem externa sem escrita. Cite a evidência observada e duas conclusões que continuam fora do alcance dos testes."
        ],
        "terms": [
          { "term": "Sessão fictícia", "meaning": "Marcador sem valor de autenticação real, usado apenas para isolar o comportamento do exemplo." },
          { "term": "Regressão negativa", "meaning": "Teste que confirma que uma ação inválida é recusada e não produz efeito no estado." },
          { "term": "Teste de política do servidor", "meaning": "Teste que fornece cabeçalhos explicitamente e verifica regra e efeito, sem reproduzir todo o comportamento do navegador." }
        ]
      }
    ],
    "diagramTitle": "Credencial enviada automaticamente ou explicitamente",
    "diagram": "MODELO DE COOKIE\nSite externo → navegador da pessoa → POST simples + cookie ambient → servidor\n                                                        │\n                                  token/Origin/SameSite/política de acesso?\n\nMODELO OBSERVADO EM cloud.js\nAplicação → session.getToken() → Authorization: Bearer ... → Supabase REST\n                                                           │\n                                             validação do token + RLS\n\nCORS afeta chamadas/leitura cross-origin; não substitui autorização no servidor.",
    "guided": [
      { "instruction": "Classifique cada peça do primeiro fluxo: identidade da pessoa, cookie enviado pelo browser, ação POST e decisão ausente no servidor. Explique qual sinal o servidor tem e qual ainda precisa validar.", "result": "O cookie pode identificar uma sessão, mas sozinho não comprova que a aplicação legítima iniciou a ação; o servidor valida um token CSRF ou outro controle contextual além de autenticação/autorização." },
      { "instruction": "Leia `cloudRequest` e copie somente os nomes de cabeçalho e chamadas relevantes, sem valores de token. Identifique se o valor Bearer é obtido de cookie automaticamente ou adicionado pelo código.", "result": "`session.getToken()` obtém o token Clerk; `Authorization` recebe explicitamente o valor Bearer. A leitura do repositório não revela internals do Clerk nem configuração externa." },
      { "instruction": "Faça uma matriz para `POST` por formulário, `GET` de navegação e `fetch` com cabeçalho personalizado. Para cada um, diga se pode mudar estado, se navegador anexa cookie e que defesa o servidor deve verificar.", "result": "GET não deve alterar estado; POST simples pode levar cookie e exige proteção CSRF se usar sessão ambient; fetch com header personalizado depende de preflight/CORS e ainda requer autenticação, autorização e validação do modelo de sessão." },
      { "instruction": "Execute `node --test server.test.cjs` em `labs/security-csrf`. Separe os resultados de rota vulnerável, origem recusada, token ausente/inválido, pedido válido, sessão ausente e corpo grande; depois diga o que o cliente não simula.", "result": "São sete testes determinísticos: cookie sozinho aceita a rota vulnerável; a protegida recusa origem/token incorretos sem escrita, permite origem/token fictícios válidos, retorna 401 sem sessão e 413 para corpo acima do limite. O teste não simula cookie autoenviado nem política SameSite/CORS de navegador." }
    ],
    "mistakes": [
      "Confundir CSRF com XSS ou achar que uma das falhas é apenas outro nome da outra.",
      "Achar que uma resposta bloqueada por CORS significa que o servidor não recebeu/processou o pedido simples.",
      "Usar `GET` para mudar estado porque `SameSite=Lax` parece impedir formulários cross-site.",
      "Confiar em `SameSite` como único controle ou esquecer compatibilidade de navegação e subdomínios.",
      "Tratar um valor CSRF em cookie como suficiente sem exigir comparação explícita conforme o padrão usado.",
      "Permitir qualquer origem com credenciais ou comparar somente sufixos de hostname.",
      "Afirmar que o Tech Learning Hub está imune só porque `cloud.js` usa Bearer token explicitamente.",
      "Considerar um cabeçalho ou token da interface como substituto para autorização/RLS no servidor."
    ],
    "exercises": [
      {
        "prompt": "Prever: uma página externa envia um formulário POST simples para um endpoint que usa sessão por cookie e confere apenas que o cookie existe. Diga se o atacante precisa ler a resposta e identifique o controle que está faltando.",
        "expected": "O atacante pode tentar causar mudança sem ler a resposta; o servidor precisa validar intenção, por exemplo com token CSRF ligado à sessão e verificações contextuais apropriadas.",
        "criteria": ["Não exige leitura da resposta para reconhecer o risco.", "Identifica envio automático do cookie como parte do modelo.", "Propõe validação de intenção no servidor."],
        "solution": "A resposta não precisa ser legível pelo site atacante para que o servidor execute a ação. O cookie ambient identifica sessão, mas não prova origem/intenção; um token imprevisível validado no servidor e controles complementares reduzem o risco.",
        "explanation": "CORS pode restringir leitura e ainda permitir envio de um formulário simples que chega ao servidor.",
        "hints": ["Separe a transmissão do pedido da leitura da resposta.", "O cookie responde identidade ou intenção?", "Qual valor só a página legítima deveria conseguir apresentar e o servidor valida?"]
      },
      {
        "prompt": "Alterar: uma equipe migra o endpoint de alteração de perfil de formulário-cookie para API `fetch`. Liste as condições que devem mudar na análise: cabeçalhos e token, CORS, cookies, métodos e regra do servidor. Não aplique configuração real.",
        "expected": "A análise registra credencial explícita e token customizado, allowlist CORS restrita com preflight, tratamento necessário de cookies/credentials, métodos sem mutação para GET e validação de identidade, autorização e token/origem no servidor conforme o modelo escolhido.",
        "criteria": ["Distingue envio de Bearer/CSRF header de cookie ambient.", "Restringe origens e cabeçalhos em vez de wildcard com credenciais.", "Mantém autorização e recusa de métodos/valores inválidos no servidor."],
        "solution": "Escolha um padrão de sessão e documente-o; para cookie, mantenha token CSRF validado. Para API com token explícito, aplique cabeçalhos seguros, CORS estrito e autorização server-side. Não escreva estado em GET e valide cada operação. Não copie um domínio de exemplo para painel real.",
        "explanation": "Mudar a forma da chamada altera quais mecanismos do navegador participam, mas não remove as decisões de autorização do servidor.",
        "hints": ["Que credencial o browser anexa sem código explícito?", "Quais cabeçalhos provocam preflight?", "O CORS permite acesso ou só controla compartilhamento de origem?"]
      },
      {
        "prompt": "Construir: execute os sete testes de `labs/security-csrf/server.test.cjs` e registre numa matriz a rota, cabeçalhos fictícios, status e se a nota mudou. Acrescente uma coluna com o limite dos testes; não use navegador autenticado nem dados reais.",
        "expected": "A matriz confirma que cookie sozinho altera a rota vulnerável; origem/token inválidos são recusados na rota protegida sem escrita; origem/token válidos alteram; sessão ausente recebe 401 e corpo grande recebe 413 sem escrita. Explica que o cliente Node fornece Cookie explicitamente e não simula envio automático do navegador. Não conclui nada sobre serviços remotos.",
        "criteria": ["Registra status e efeito observado nos casos vulnerável/protegidos.", "Confirma que pedidos recusados não gravam nota.", "Identifica cookie/token como marcadores fictícios.", "Declara limite de simulação de navegador e de serviço remoto."],
        "solution": "Execute `cd labs/security-csrf` e `node --test server.test.cjs`. Matriz: cookie sem origem/token na rota vulnerável → 200 e alteração; origem externa → 403 sem alteração; token ausente/inválido → 403 sem alteração; origem e token de teste válidos → 200 e alteração; sem sessão → 401; corpo acima de 512 bytes → 413 sem alteração. Limite: fetch Node define Cookie manualmente e não exercita envio automático do browser, SameSite, CORS real, Clerk/Supabase ou Preview.",
        "explanation": "O laboratório demonstra uma propriedade de validação no servidor em ambiente local, não reproduz o browser ou a configuração completa de uma aplicação.",
        "hints": ["Depois de cada recusa, consulte a nota em memória.", "O Cookie veio do navegador ou foi escrito pelo teste?", "Quais controles dependem de um browser de verdade?"]
      },
      {
        "prompt": "Investigar erro: uma chamada legítima para de funcionar após a equipe ativar validação de `Origin` e bloqueio de cookies cross-site. Escreva um diagnóstico sem afrouxar a política: confira origem exata, métodos seguros, fluxo de login/retorno, `SameSite`, preflight e token CSRF; mantenha dados fictícios.",
        "expected": "Compara request e origem autorizada exatos, distingue preflight de requisição efetiva e callback/login de endpoint mutável, revisa atributos de cookie e token no servidor e documenta uma exceção mínima só se houver fluxo legítimo comprovado; não usa wildcard nem desativa defesa geral.",
        "criteria": ["Isola origem, preflight, cookie e token como hipóteses diferentes.", "Não sugere wildcard ou desativação global.", "Preserva GET sem efeitos e exige controle server-side.", "Não muda painel externo nem usa domínio real."],
        "solution": "Reproduza com dados fictícios em ambiente autorizado, registre método, Origin, cabeçalhos preflight e resposta sem tokens; compare origem exata e a origem de retorno do login; confira SameSite/atributos e se o POST envia o token esperado. Ajuste apenas a origem/fluxo legítimo demonstrado e mantenha authorization e política do servidor.",
        "explanation": "Uma falha de compatibilidade deve ser diagnosticada no fluxo específico; desligar controles amplos pode permitir pedidos indevidos.",
        "hints": ["Qual etapa falha: OPTIONS, POST, cookie, token ou retorno de autenticação?", "O valor de Origin corresponde à origem completa esperada?", "A operação está usando GET para modificar estado?"]
      }
    ],
    "quiz": [
      { "question": "Qual condição central aparece no modelo clássico de CSRF?", "options": ["O browser envia automaticamente uma credencial válida e o servidor não valida a intenção da operação.", "O servidor usa sempre TLS.", "A resposta contém JSON."], "correctIndex": 0, "explanation": "A credencial ambient pode autenticar uma requisição que a pessoa não pretendia iniciar." },
      { "question": "O que CORS faz com pedidos simples de formulário?", "options": ["Pode impedir que o site externo leia a resposta, mas não é garantia de que o servidor não receba o pedido.", "Remove os cookies em qualquer navegação.", "Substitui autorização e token CSRF."], "correctIndex": 0, "explanation": "O servidor precisa se defender de CSRF independentemente da capacidade do atacante de ler a resposta." },
      { "question": "Qual é um papel de `SameSite`?", "options": ["Restringir quando o navegador anexa um cookie em contexto cross-site como defesa em profundidade.", "Validar autorização por linha no PostgreSQL.", "Impedir qualquer chamada cross-origin."], "correctIndex": 0, "explanation": "SameSite ajuda, mas tem regras e efeitos de compatibilidade; não substitui todo o modelo de defesa." },
      { "question": "O que podemos concluir do `cloud.js` analisado?", "options": ["O trecho obtém token Clerk e o envia explicitamente como Bearer; isso não prova a segurança geral ou a configuração remota.", "O projeto não pode ter CSRF em nenhuma rota.", "CORS está configurado corretamente no Supabase."], "correctIndex": 0, "explanation": "A inspeção confirma o que está no arquivo e deixa explícitas as hipóteses fora do repositório." }
    ],
    "summary": [
      "CSRF usa uma requisição induzida e uma credencial ambient para tentar mudar estado sem intenção.",
      "CORS limita compartilhamento e certas chamadas; não substitui autenticação, autorização nem defesa de formulário.",
      "Combine métodos seguros, token CSRF no servidor, política de cookie e verificações de origem conforme o modelo.",
      "Bearer anexado explicitamente a uma API difere de cookie autoenviado; continue exigindo RLS e análise de CORS.",
      "O teste usa cabeçalhos explícitos e não simula o navegador nem comprova comportamento de painéis ou serviços remotos."
    ]
  },
  "delivery-api-abuse": {
    "prerequisites": "Concluir `delivery-http`, `delivery-clerk-supabase` e `delivery-threat-model`; conhecer request/response, validação no servidor, identidade e autorização. Esta aula usa cenário e números fictícios e analisa `labs/backend-validation`/`labs/backend-layers`; não exige tráfego, conta ou serviço externo.",
    "setup": "No editor, leia `labs/backend-validation/README.md` e procure `limiteCorpo` e `413` em `labs/backend-validation/server.cjs`; depois confira limites citados no README de `labs/backend-layers`. No Windows, macOS ou Linux, a leitura dos arquivos não exige instalar nada. Se desejar observar o laboratório já existente, siga apenas os passos locais do README e use dados fictícios; não faça loop ou carga automatizada. A saída conceitual esperada é uma matriz que separa recurso, fluxo de negócio, limite, identidade, status e sinal de monitoramento. Alternativa leve: use a tabela desta aula sem iniciar servidor. Não é necessário Preview, domínio ou teste de carga.",
    "why": "Uma API pode aceitar cada chamada isoladamente como válida e ainda assim permitir volume, custo ou sequência que prejudique outras pessoas ou o negócio. Proteção robusta limita tanto o custo de uma requisição quanto a frequência e o efeito acumulado de um fluxo.",
    "example": {
      "language": "text",
      "code": "CENÁRIO FICTÍCIO — exportação de relatórios\nEndpoint: POST /relatorios/exportar\n\nRisco API4 — consumo de recursos:\n- um pedido pode solicitar dados sem limite de período ou quantidade\n- uma consulta cara pode esgotar CPU/memória\n\nRisco API6 — abuso de fluxo sensível:\n- muitas exportações válidas podem elevar custo e bloquear outras contas\n\nPLANO CONCEITUAL (não executar):\n1. Autorizar a pessoa/tenant e os campos exportados.\n2. Limitar janela de datas, tamanho da resposta, tempo e concorrência.\n3. Definir quota por conta e orçamento do fornecedor.\n4. Responder 429 + Retry-After quando a quota temporal for excedida.\n5. Medir rejeições, latência e custo com logs sem token nem dados privados.",
      "expected": "O plano limita o tamanho/custo de uma chamada e a frequência/efeito acumulado do fluxo, aplica autorização separadamente e define como a resposta/telemetria informa limite sem revelar dados sensíveis.",
      "explanation": [
        "API4:2023 trata de consumo irrestrito de recursos: banda, CPU, memória, armazenamento e serviços cobrados por chamada podem ser excedidos por parâmetros, lote, upload ou ausência de timeout/limite.",
        "API6:2023 trata de acesso irrestrito a um fluxo de negócio sensível: operações individualmente válidas, como comentar, reservar ou enviar convites, podem causar dano quando automatizadas ou repetidas sem controle adequado.",
        "Rate limit controla taxa numa janela; quota pode limitar volume/custo acumulado; limite de corpo/página/tempo controla o peso de cada operação. Os controles se complementam, mas não substituem autorização.",
        "O laboratório `backend-validation` rejeita corpo acima de 1024 bytes com 413; isso é limitação de entrada, não rate limiter. `backend-layers` trata duplicidade com 409 e agora limita tentativas de POST com Redis, que responde 429; cada status descreve uma causa diferente."
      ]
    },
    "sections": [
      {
        "title": "Do pedido individual ao dano acumulado",
        "paragraphs": [
          "Consumo de recursos e abuso de fluxo são riscos diferentes. Um endpoint pode fazer uma consulta lenta ou devolver uma página enorme mesmo com uma única chamada; um limite de tamanho, tempo ou operações por pedido pode ser necessário. Em outro caso, cada solicitação de comentário ou relatório é barata, mas milhares de ações normais automatizadas geram spam, custo ou indisponibilidade; controlar a taxa e o fluxo ajuda.",
          "OWASP API4:2023 descreve consumo irrestrito de recursos; exemplos de limites incluem timeout de execução, tamanho de upload, número de registros por página, quantidade de operações num pedido e orçamento de serviço terceiro. OWASP API6:2023 aborda fluxos sensíveis que podem causar dano se usados em excesso. A lista serve para comunicação e conscientização, não certifica uma API.",
          "Não confunda abuso de fluxo com autorização quebrada. Em BOLA, uma pessoa alcança objeto alheio; em abuso de fluxo, a identidade pode ter permissão para uma operação mas a frequência ou automação causa efeito coletivo. Um sistema pode ter ambos e deve testar cada propriedade separadamente.",
          "Pausa: classifique o cenário ‘cada exportação custa pouco, mas uma conta faz 10.000 por hora’ e ‘uma exportação aceita um intervalo de 50 anos’ como risco de fluxo, peso individual, ou ambos."
        ],
        "terms": [
          { "term": "Consumo irrestrito de recursos", "meaning": "Ausência ou inadequação de limites que permite requests consumirem banda, CPU, memória, storage ou recursos faturáveis em excesso." },
          { "term": "Fluxo sensível de negócio", "meaning": "Sequência de operações cujo uso excessivo ou automatizado pode prejudicar usuários ou objetivos legítimos do produto." },
          { "term": "Abuso de API", "meaning": "Uso de endpoints, campos, frequência ou sequências de forma que exceda a expectativa de capacidade ou de negócio." },
          { "term": "Rate limit", "meaning": "Regra que limita quantas operações uma identidade/cliente pode realizar em um intervalo definido." }
        ]
      },
      {
        "title": "Projetar limites independentes",
        "paragraphs": [
          "Comece pelo custo da operação: máximo de bytes do corpo, tamanho de página, quantidade de itens em lote, intervalo consultável, tempo de execução e concorrência. Valide esses limites no servidor porque um controle da interface pode ser contornado. Use filas e quotas para trabalho assíncrono ou serviços que cobram por chamada. Defina o que acontece quando o orçamento chega ao limite.",
          "Depois limite volume ou impacto por conta autenticada, tenant, chave de cliente, IP ou combinação. IP pode ser compartilhado por pessoas legítimas e pode mudar/distribuir-se; sozinho é uma identidade fraca para justiça e defesa. A identidade da sessão também não impede muitas contas. Combine sinais, coloque limites globais e por recurso e documente falsos positivos e caminho de atendimento.",
          "HTTP `429 Too Many Requests` é adequado quando a política rejeita excesso de requisições; `Retry-After` pode orientar quando tentar de novo. `503 Service Unavailable` comunica indisponibilidade temporária, não uma quota pessoal; `413` identifica corpo grande; `400` indica formato inválido; `409` pode indicar conflito de estado, como duplicidade. Use códigos que correspondam à causa e não devolva detalhes internos.",
          "Idempotência evita que repetir a mesma operação lógica crie múltiplos efeitos por falha de rede ou retry. Uma pessoa ainda pode enviar muitas operações novas com chaves diferentes; idempotência não substitui limite de frequência, quota nem regra de negócio. CAPTCHA e fingerprinting podem ser fricção complementar, mas têm custo, acessibilidade e possibilidade de contorno; não os torne a única defesa.",
          "Pausa: defina um limite por pedido para tamanho de página e um limite por conta para frequência. Explique por que uma política não cobre a outra."
        ],
        "terms": [
          { "term": "Quota", "meaning": "Teto de volume ou custo permitido em um período ou plano de uso." },
          { "term": "429 Too Many Requests", "meaning": "Status que informa rejeição por excesso de requests ou por política de limitação de taxa." },
          { "term": "Retry-After", "meaning": "Cabeçalho que pode indicar quando o cliente deve tentar novamente após uma limitação temporária." },
          { "term": "Idempotência", "meaning": "Propriedade de repetir a mesma operação lógica sem multiplicar o efeito; não impede novas operações distintas." }
        ]
      },
      {
        "title": "Ligar regra técnica a efeito de negócio",
        "paragraphs": [
          "Para cada fluxo, escreva quem pode iniciá-lo, qual benefício legítimo entrega, qual recurso consome, qual dano o excesso causa e que limite preserva acesso justo. Exemplos fictícios: impedir que relatórios muito grandes bloqueiem o salvamento; limitar convites repetidos; limitar reservas simultâneas; restringir criação automática de sessões; definir orçamento de SMS/e-mail.",
          "Evite regra sem conta: ‘no máximo 5’ precisa dizer por pessoa, tenant, IP ou instalação; janela móvel ou fixa; o que conta como tentativa; quando reseta; se a operação tem custo; como tratar retry legítimo; e qual sinal alerta a equipe. Comece pelo comportamento de pessoas reais e pelos custos/contratos do provedor, não por número arbitrário copiado de uma postagem.",
          "Proteja também leitura e CPU: não permita qualquer parâmetro de ordenação SQL, expansão ilimitada, busca sem paginação, filtros caros e formatos de relatório sem restrição. O capítulo `db-security` separa parametrização e proprietário; `backend-validation` demonstra tamanho máximo de corpo; `backend-layers` inclui queries, limites do domínio e rate limit local por IP observado. Nenhum desses controles sozinho é proteção completa.",
          "Métricas devem ajudar a decidir: quantidade permitida/rejeitada por rota e classe, latência, fila, erros do fornecedor e custo. Não grave token, conteúdo de anotação nem identificador pessoal desnecessário. Agregue ou pseudonimize conforme necessidade e retenção; alerta precisa ter responsável e resposta.",
          "Um limite centralizado em processo pode reiniciar e perder contadores ou divergirem entre réplicas. Um armazenamento compartilhado, por exemplo Redis, pode sincronizar contadores, mas traz custo, expiração, particionamento e indisponibilidade. A implementação prática e os trade-offs serão tratados na Fase 7.4; esta aula não afirma que o projeto já esteja limitado."
        ],
        "terms": [
          { "term": "Limite de custo", "meaning": "Teto configurado para gasto ou consumo de um recurso pago, com ação definida quando se aproxima/atinge." },
          { "term": "Backpressure", "meaning": "Mecanismo que reduz ou recusa novo trabalho quando a capacidade de processamento não acompanha a demanda." },
          { "term": "Contador distribuído", "meaning": "Estado compartilhado entre múltiplas instâncias para aplicar uma política comum de volume ou frequência." },
          { "term": "Observabilidade", "meaning": "Sinais como métricas, logs e alertas usados para entender comportamento e responder a falhas ou abuso." }
        ]
      },
      {
        "title": "Planejar validação controlada",
        "paragraphs": [
          "Comece com testes unitários da política, sem tráfego alto: dentro do limite a chamada é permitida; acima, recebe 429; o estado reseta conforme janela; uma conta não consome a quota de outra; um corpo/página acima do máximo recebe 413/400 conforme contrato; serviço limitador indisponível segue uma decisão de fail-open/fail-closed documentada. Teste relógio e concorrência com cenário determinístico.",
          "Em integração local, use poucos pedidos, dados fictícios e uma API própria. Registre quantidade, janela, identidade fictícia, status, cabeçalhos e efeito; confirme que nenhum request recusado causou gravação. Teste desempenho ou carga somente em ambiente isolado, com autorização e limite operacional. Não faça flood, stress test ou simulação automatizada em Preview público, API de provedor ou serviço de outra pessoa.",
          "`backend-validation` protege tamanho do corpo e campos. `backend-layers` agora usa Redis e Lua para limitar os dois POSTs a três tentativas por IP observado em uma janela fixa de 60 segundos; o teste local confirma 429, Retry-After e ausência da quarta gravação. Como a API de laboratório não autentica contas, isso não comprova quota por usuário, proteção atrás de proxy nem desempenho. A medição e os próximos controles operacionais permanecem na Fase 7.4.",
          "Pausa: para uma quota que atingiu limite, escreva um critério observável para 429 e um teste que mostre que a operação proibida não foi aplicada. Não simule carga contra endpoint remoto."
        ],
        "terms": [
          { "term": "Teste de contrato", "meaning": "Verificação de status, cabeçalhos, formato e efeito conforme o acordo da API." },
          { "term": "Fail-open / fail-closed", "meaning": "Decisão de continuar permitindo ou recusar quando o controle de limite fica indisponível; depende do impacto e deve ser explícita." },
          { "term": "Ambiente isolado", "meaning": "Sistema de teste próprio, com capacidade e dados delimitados para que a verificação não afete terceiros." }
        ]
      }
    ],
    "diagramTitle": "Do custo por operação ao efeito acumulado",
    "diagram": "Pedido ──► API: validar identidade e permissão\n              │\n              ├── limite por pedido: bytes, página, timeout, operações\n              ├── limite de capacidade: concorrência, fila, memória\n              ├── limite por cliente: taxa, quota, comportamento do fluxo\n              └── limite do provedor: custo e orçamento\n                         │\n            permitido ──┴── excedido\n                │               │\n          executar ação    429 + Retry-After\n                │               │\n       registrar sinais sem tokens/dados pessoais desnecessários",
    "guided": [
      { "instruction": "Separe API4 e API6 no cenário de exportação: uma requisição enorme e muitas exportações pequenas. Indique o limite que cada caso sugere e um dano possível.", "result": "Pedido enorme sugere limite de intervalo/tamanho/tempo e pode consumir CPU/memória; muitas exportações sugerem quota/limite por identidade e podem elevar custo ou bloquear outras pessoas. Um cenário pode combinar ambos." },
      { "instruction": "Leia `limiteCorpo` em `labs/backend-validation/server.cjs`. Registre qual controle já existe, seu status esperado e uma categoria que esse controle não implementa.", "result": "Corpo acima de 1024 bytes recebe 413; isso limita o tamanho de cada pedido. Não controla frequência, quota por conta nem automação de um fluxo." },
      { "instruction": "Para uma ação de reserva fictícia, identifique identidade, recurso protegido, quota, janela, resposta em excesso e métrica; separe o retry acidental do uso repetido de novas reservas.", "result": "A proposta define conta/tenant, cota de reservas por período, 429 + Retry-After, alerta de rejeições e idempotência para a mesma reserva; novas chaves não burlam a quota de negócio." }
    ],
    "mistakes": [
      "Tratar todo abuso como muitas requisições por segundo e ignorar o custo de uma única chamada pesada.",
      "Confundir BOLA/autorização com acesso repetido a uma ação que a pessoa pode executar individualmente.",
      "Usar apenas IP como identidade ou aplicar um número sem explicar janela, operação e impacto.",
      "Achar que idempotência impede automação de operações novas.",
      "Usar CAPTCHA como defesa única sem considerar acessibilidade e automação distribuída.",
      "Devolver 500 quando a política de quota foi atingida em vez de um status coerente, como 429.",
      "Executar carga em produção/Preview ou em APIs de terceiros sem autorização.",
      "Registrar tokens, conteúdo privado ou PII desnecessária nos logs de abuso."
    ],
    "exercises": [
      {
        "prompt": "Prever: uma API aceita 500.000 linhas por página em uma chamada; outra aceita páginas de 100 linhas mas permite 20.000 chamadas por conta por hora. Classifique os riscos e preveja o impacto principal em cada caso.",
        "expected": "A primeira concentra consumo elevado por request (API4); a segunda permite excesso acumulado ou fluxo abusivo apesar de pedidos pequenos (API4/API6 conforme custo de negócio). Ambas podem elevar latência/custo ou prejudicar disponibilidade.",
        "criteria": ["Distingue custo unitário de volume acumulado.", "Associa as categorias adequadas sem tratá-las como exclusivas.", "Indica um impacto observável para cada risco."],
        "solution": "500.000 linhas concentram memória, CPU e resposta grande; imponha página e timeout. 20.000 chamadas pequenas excedem a quota por pessoa e podem elevar custo ou consumir o serviço; defina taxa/limite de negócio e monitore o efeito.",
        "explanation": "Um rate limiter por request pode não proteger de um único pedido caro; limite de página não impede um volume de ações legítimas automatizadas.",
        "hints": ["Quanto custa uma chamada isolada?", "Quanto custa a sequência completa ao longo de uma janela?"]
      },
      {
        "prompt": "Alterar: uma exportação atual aceita intervalo de datas ilimitado. Escreva critérios para intervalo máximo, número de linhas, timeout, autorização por conta e resposta quando o limite temporal de uso é excedido. Use valores de exemplo explicitamente fictícios.",
        "expected": "Critérios definem limite de intervalo/linhas no servidor, timeout, dono autorizado, 429 e Retry-After para taxa, 413 para corpo excessivo se aplicável, nenhuma exportação em pedidos recusados e métrica agregada sem conteúdo/token.",
        "criteria": ["Limita custo por operação além da taxa.", "Autoriza por identidade no servidor.", "Diferencia 413 e 429 conforme causa.", "Define ausência de efeito e observabilidade sem dados sensíveis."],
        "solution": "Por exemplo fictício: data inicial/final não excedem 90 dias; resultado máximo 5.000 itens por página; timeout 3 s; só tenant da sessão; quota temporal excedida responde 429 com Retry-After; nenhuma exportação é iniciada antes das validações. Métrica registra rota/status/contagem agregada sem token ou linhas.",
        "explanation": "A política limita peso unitário, frequência e escopo autorizado como dimensões independentes.",
        "hints": ["Que custo há antes de contar chamadas?", "Qual regra controla o tamanho do resultado?", "Como a pessoa legítima saberá quando tentar novamente?"]
      },
      {
        "prompt": "Construir: desenhe uma matriz para quatro controles numa API de envio de convites: tamanho do pedido, frequência por conta, frequência por IP e teto mensal do provedor. Para cada um, diga camada, sinal e uma limitação conhecida.",
        "expected": "A matriz atribui limites ao parser/API, contador por identidade, sinal de borda/IP e orçamento/provedor; sinais incluem 413/429, quota/custo e alertas. Reconhece que IP é compartilhado/rotativo, identidade pode ser múltipla e teto de gastos pode interromper serviço legítimo.",
        "criteria": ["Inclui os quatro controles sem chamá-los de equivalentes.", "Indica camada e sinal verificável.", "Reconhece limitações de IP, identidade e orçamento."],
        "solution": "Tamanho: parser/app, 413, bytes recusados, limite pode exigir diferenciar uploads. Conta: serviço/API, 429, excesso por sessão. IP: proxy/edge confiável, 429/bloqueio, NAT/rotação afetam legítimos. Teto provedor: painel/conta, alerta/cap, protege gasto mas pode suspender função legítima. Combine e acompanhe falsos positivos.",
        "explanation": "Limites em camadas reduzem fraquezas de um único identificador e tornam os trade-offs explícitos.",
        "hints": ["Quem calcula cada cota?", "Que erro apareceria para o cliente?", "Quem pode ser afetado por um limite baseado só em endereço IP?"]
      },
      {
        "prompt": "Investigar erro: pessoas legítimas recebem 429 depois que o time adicionou um limite por IP atrás de um proxy. Defina uma investigação segura para distinguir NAT compartilhado, cabeçalho de proxy não confiável, janela incorreta e quota de conta; não gere carga nem altere o painel real.",
        "expected": "Analisa métricas agregadas por rota/janela, valida que IP vem de proxy confiável e não do cliente, compara quota por conta e compartilhamento/NAT, verifica relógio/reset e permite ajuste mínimo documentado; preserva rate-limit global e registra falsos positivos sem armazenar IPs por mais tempo que necessário.",
        "criteria": ["Não confia cegamente em X-Forwarded-For enviado pelo cliente.", "Distingue identificadores e janela como hipóteses.", "Preserva limites globais enquanto calibra política de forma controlada.", "Evita carga ou dados pessoais além do necessário."],
        "solution": "Reúna contagens agregadas e hora/rota sem copiar tokens; valide cabeçalhos do proxy confiável, observe usuários atrás de NAT, confira escopo e janela do contador e compare com conta/tenant. Ajuste limite após justificar impacto e monitorar; não aceite um header arbitrário como IP e não desligue todo controle.",
        "explanation": "Um 429 pode ser comportamento correto ou falsa rejeição; diagnostique a dimensão do contador e seu contexto antes de relaxar a política.",
        "hints": ["De onde veio o valor de IP?", "O contador é por instalação, endereço, conta ou tenant?", "O relógio e a janela correspondem à mensagem Retry-After?"]
      }
    ],
    "quiz": [
      { "question": "Qual diferença descreve API4 e API6?", "options": ["API4 foca consumo de recursos; API6 foca uso excessivo de fluxo de negócio sensível.", "API4 é autenticação e API6 é DNS.", "São nomes diferentes para BOLA."], "correctIndex": 0, "explanation": "Um pedido pesado e muitas operações de negócio podem ter causas e controles diferentes." },
      { "question": "Qual status pode indicar que uma política de taxa recusou o pedido?", "options": ["429 Too Many Requests.", "415 Unsupported Media Type.", "304 Not Modified."], "correctIndex": 0, "explanation": "429 indica excesso de requests ou rejeição por rate limiting; Retry-After pode orientar nova tentativa." },
      { "question": "O que idempotência não faz?", "options": ["Não substitui quota de frequência para novas operações distintas.", "Pode impedir duplicar o mesmo efeito em retry.", "Pode ser útil em falhas de rede."], "correctIndex": 0, "explanation": "Chaves novas podem representar operações novas; limites de fluxo continuam necessários." },
      { "question": "O que demonstra o limite de 1024 bytes em `backend-validation`?", "options": ["Limite do tamanho de corpo, não um rate limiter.", "Limite de requests por conta.", "Prova de capacidade de produção."], "correctIndex": 0, "explanation": "413 rejeita um request grande; o laboratório não mede frequência ou carga distribuída." }
    ],
    "summary": [
      "API4 limita consumo por pedido; API6 controla excesso de fluxos de negócio sensíveis.",
      "Combine limites de entrada, tamanho de página, tempo, concorrência, identidade, quota e custo.",
      "Use 429/Retry-After para política de taxa e status distintos para causas distintas.",
      "Idempotência, CAPTCHA e IP são controles parciais, não defesas universais.",
      "O rate limit Redis de laboratório é executado localmente com identidade por IP observado; quota por conta validada e medição antes/depois continuam pendentes."
    ]
  },
  "delivery-supply-chain": {
    "prerequisites": "Concluir `delivery-owasp-top10` e `quality-refactor`; conhecer dependências de projeto, Git e CI. A aula examina arquivos versionados do laboratório, sem instalar pacote ou executar código de terceiro.",
    "setup": "No editor, abra `labs/backend-layers/package.json`, `labs/backend-layers/package-lock.json`, `labs/backend-layers/README.md` e `.github/workflows/ci.yml`. Siga o caminho pelo manifesto até a instalação da CI. A leitura funciona em Windows, macOS e Linux e não requer terminal, rede, Preview ou domínio. Para manter a análise segura e repetível, não execute `npm install`, `npm audit fix` ou scripts de dependências como parte desta atividade. `npm audit`, se usado depois em uma cópia local, consulta a registry configurada pela internet; primeiro revise o que será enviado e nunca interprete “sem avisos” como garantia de pacote confiável.",
    "why": "Um aplicativo herda riscos dos componentes e ferramentas que o constroem e atualizam. Uma dependência pode estar vulnerável, abandonada, comprometida ou vir de uma fonte inesperada; CI, credenciais de publicação e artefatos também integram a cadeia. O lockfile e o scanner ajudam a controlar parte desse risco, sem atestar que cada código é benigno.",
    "example": {
      "language": "text",
      "code": "MAPA ESTÁTICO DO LABORATÓRIO\n\npackage.json\n├── dependencies: pg 8.23.1 — PostgreSQL em runtime\n├── dependencies: redis 6.3.0 — limitador Redis em runtime\n└── devDependencies: @playwright/test 1.64.1 — testes de navegador\n\npackage-lock.json\n├── fixa o grafo resolvido e registra metadados dos pacotes\n└── inclui também dependências transitivas (pacotes usados por outros pacotes)\n\n.github/workflows/ci.yml\n└── executa npm ci com esse lockfile antes dos testes\n\nConclusão segura: arquivos registram escolhas e tornam a instalação revisável/reproduzível.\nConclusão que NÃO se pode tirar: “todos os pacotes são seguros e sem vulnerabilidades”.",
      "expected": "A leitura separa dependência direta de transitiva e runtime de ferramenta de desenvolvimento; explica a função do lockfile e de `npm ci`, mas não atribui nota de segurança nem conclui ausência de vulnerabilidades.",
      "explanation": [
        "A03:2025 amplia o foco além de componentes com vulnerabilidade conhecida: também considera comprometimentos em construção, distribuição, atualização, ferramentas e dependências.",
        "O `package.json` declara o que o projeto pede diretamente; o lockfile registra o grafo resolvido para a instalação usada pelo ecossistema npm. Dependência direta pode trazer vários pacotes transitivos.",
        "`npm ci` exige lockfile compatível com o manifesto, instala o projeto a partir dele e falha em caso de divergência. Repetibilidade não garante que o pacote selecionado seja benigno ou esteja livre de falhas.",
        "`npm audit` consulta a registry padrão/configurada para comparar o grafo com avisos conhecidos. Um relatório sem vulnerabilidades conhecidas não detecta todo código malicioso, bug sem aviso, dependência não inventariada ou comprometimento futuro.",
        "No laboratório, `pg` e `redis` são dependências de execução; `@playwright/test` é de desenvolvimento. A CI chama `npm ci`; a atividade examina o manifesto e o lockfile sem transformar essa leitura em certificação de segurança."
      ]
    },
    "sections": [
      {
        "title": "A cadeia vai além da biblioteca que importamos",
        "paragraphs": [
          "A cadeia de suprimentos de software inclui quem publica um pacote, o registro que distribui, dependências aninhadas, ferramentas de desenvolvimento, repositório, CI, artefatos e processo de atualização. Se um pacote legítimo é comprometido ou uma conta de publicação é roubada, código malicioso pode entrar mesmo sem alteração visível na aplicação. Uma dependência também pode estar abandonada, usar licença incompatível ou receber uma atualização que quebra o contrato.",
          "Dependência direta é declarada pelo seu projeto. Dependência transitiva chega porque uma dependência direta precisa dela. Um inventário que lista só `pg` pode esconder uma árvore de dezenas de componentes. O lockfile torna a árvore escolhida examinável; um inventário ou SBOM (Software Bill of Materials, lista de materiais de software) descreve componentes e versões para acompanhamento, mas nenhum desses arquivos sozinho demonstra que o código é seguro.",
          "O risco não se restringe ao servidor. Scripts de instalação podem executar etapas definidas por pacotes durante a instalação. Ferramentas, extensões do editor, imagens de container, workflow de CI, tokens de publicação e segredos de deploy também merecem origem, atualização e permissão limitadas. Por isso A03:2025 abrange processo de construção, distribuição e atualização.",
          "Pausa: liste os elos entre package.json, registry, node_modules, CI e artefato. Marque uma pergunta de confiança que deve ser respondida em cada passagem."
        ],
        "terms": [
          { "term": "Cadeia de suprimentos de software", "meaning": "Pessoas, componentes, serviços, ferramentas e processos que constroem, distribuem e atualizam um software." },
          { "term": "Dependência direta", "meaning": "Pacote declarado diretamente no manifesto do projeto." },
          { "term": "Dependência transitiva", "meaning": "Pacote instalado porque outra dependência do projeto depende dele." },
          { "term": "SBOM", "meaning": "Inventário de componentes e versões incluídos em um software, útil para responder a avisos e acompanhar a cadeia." }
        ]
      },
      {
        "title": "Escolha e instale com uma justificativa verificável",
        "paragraphs": [
          "Antes de adicionar um pacote, descreva o problema e compare com API nativa, código pequeno já existente ou uma dependência aprovada. Depois confira nome exato, organização/publicador, registro configurado, documentação, compatibilidade, licença, atividade de manutenção, política de suporte e caminho de atualização. Evite escolher apenas por número de downloads ou por aparecer primeiro numa busca: popularidade não prova integridade.",
          "Confusão de nome (typosquatting) usa grafia parecida com um pacote conhecido. Pacote copiado, domínio/registro alterado, conta do mantenedor comprometida e atualização maliciosa são outros cenários. Em contexto didático, não instale um pacote suspeito para experimentar: use um caso fictício e descreva como confirmar nome, origem e responsável por canais oficiais.",
          "Use permissões mínimas para contas do repositório e da CI. Não coloque token de publicação no código, não deixe workflow de contribuição externa com segredo desnecessário e exija revisão apropriada antes de promover mudanças sensíveis. Atualização de dependência deve ter diff legível, teste de compatibilidade, plano de rollback e responsável para acompanhar avisos.",
          "Pausa: uma dependência nova promete economizar dez linhas, mas introduz 40 dependências transitivas, licença ainda não verificada e scripts de instalação. Escreva as evidências que faltam antes de decidir."
        ],
        "terms": [
          { "term": "Typosquatting", "meaning": "Uso de nome muito parecido com outro pacote para induzir uma instalação equivocada." },
          { "term": "Menor privilégio", "meaning": "Conceder a cada usuário, serviço ou workflow só os acessos necessários à tarefa." },
          { "term": "Superfície de ataque", "meaning": "Componentes e caminhos que podem ser alcançados ou abusados; dependências sem uso aumentam o que precisa ser mantido." }
        ]
      },
      {
        "title": "Manifesto, lockfile e auditoria cumprem papéis diferentes",
        "paragraphs": [
          "No laboratório, abra `package.json`: `pg` conecta o servidor ao PostgreSQL, `redis` dá suporte ao rate limit distribuído, e `@playwright/test` aos testes de interface. Abra o começo de `package-lock.json`, confira versões, origem do pacote, integridade registrada e entradas dos pacotes transitivos. Compare com `.github/workflows/ci.yml` e identifique em qual pasta o workflow executa `npm ci`. Não edite esses arquivos nesta atividade.",
          "`npm ci` é uma instalação limpa orientada a manifesto e lockfile. Ela exige os dois coerentes, remove a árvore local anterior e falha em vez de atualizar o lockfile se houver divergência. Isso ajuda a CI a instalar uma árvore repetível. O comando ainda baixa componentes e a instalação pode acionar processos definidos pelo ecossistema; use a origem confiável e as proteções da máquina/CI.",
          "`npm audit` envia uma descrição do grafo de dependências ao registro npm padrão/configurado para comparar com avisos conhecidos. O relatório ajuda a priorizar por severidade, caminho e disponibilidade de correção. Ele não substitui revisão da origem, manutenção, integridade, análise de código nem avaliação de uso. A base de avisos muda; um resultado limpo é apenas ‘não encontrei avisos conhecidos neste grafo, nesta consulta’.",
          "Não rode `npm audit fix` às cegas. Uma correção pode mudar versões e comportamento, inclusive exigir mudança incompatível; examine diff, changelog, advisory, testes e lockfile. Em ambiente sem rede, faça a inspeção estática do manifesto e do lockfile e anote que a consulta de vulnerabilidades não foi executada.",
          "Pausa: explique por que lockfile + `npm ci` melhoram reprodução, mas não verificam intenção benigna; depois explique por que `npm audit` sem avisos também não é certificação."
        ],
        "terms": [
          { "term": "Manifesto", "meaning": "Arquivo que declara nome, scripts, versões/faixas e dependências diretas do projeto." },
          { "term": "Lockfile", "meaning": "Arquivo gerado que registra as escolhas resolvidas da árvore e metadados usados na instalação." },
          { "term": "npm ci", "meaning": "Instalação limpa a partir de um lockfile compatível, apropriada para reconstrução/CI." },
          { "term": "npm audit", "meaning": "Consulta pacotes a avisos conhecidos na registry configurada; não é um detector universal de malware." }
        ]
      },
      {
        "title": "Atualize, responda e acompanhe ao longo do tempo",
        "paragraphs": [
          "Quando um aviso afeta uma dependência, localize o caminho transitivo e a versão vulnerável, confira a recomendação do mantenedor e avalie se o trecho vulnerável é usado e qual o impacto. A exposição concreta pode variar, mas uma suposição de ‘não usamos essa função’ precisa de evidência. Priorize risco, disponibilidade de correção, janela de suporte e impacto da mudança; registre quando aceita risco temporário e quem revisará novamente.",
          "Atualize em branch pequena: altere a dependência por ferramenta apropriada, revise package.json e lockfile, leia o diff, execute testes do domínio e da integração afetada, verifique build/CI e registre rollback. Atualize com cadência e responda a avisos urgentes, em vez de deixar uma pilha grande de mudanças para um único salto. Um scanner precisa ter responsável por triagem e prazo, não apenas um badge verde.",
          "Para este laboratório, o manifesto e o lockfile ficam dentro de `labs/backend-layers`; a raiz do curso estático não carrega `pg` nem Playwright. `.github/workflows/ci.yml` aponta ao lockfile desse laboratório e roda a instalação antes das verificações. Esse isolamento limita escopo, mas ainda exige inventário e atualização dos pacotes do próprio laboratório.",
          "A aula é uma inspeção estática versionada. Não executou `npm audit`, não determina se a árvore atual está sem avisos e não altera dependências; o aluno pode realizar uma consulta autorizada e documentada depois, em cópia local e com internet, se necessário."
        ],
        "terms": [
          { "term": "Advisory", "meaning": "Aviso publicado sobre uma vulnerabilidade, escopo afetado e, quando existe, orientação de correção." },
          { "term": "Triagem", "meaning": "Processo de entender exposição, impacto, prioridade, responsável e prazo para uma descoberta." },
          { "term": "Proveniência", "meaning": "Informações verificáveis sobre origem e processo de construção de um artefato." }
        ]
      }
    ],
    "diagramTitle": "Da declaração de dependência ao artefato publicado",
    "diagram": "Manifesto ──► resolução/lockfile ──► registry e pacotes\n    │                     │                       │\n    └──── revisão de nome, versão, origem, licença e avisos ────┘\n                          │\n                 instalação reprodutível\n                          │\n       CI com permissões mínimas + testes + artefato\n                          │\n       publicação gradual + inventário + atualização\n\nCada seta é uma fronteira de confiança; nenhum scanner elimina o risco.",
    "guided": [
      { "instruction": "Abra `labs/backend-layers/package.json` e identifique dependências de runtime e ferramenta de desenvolvimento.", "result": "`pg` suporta conexão PostgreSQL e `redis` o limitador distribuído em runtime; `@playwright/test` é ferramenta de desenvolvimento para fluxo de navegador." },
      { "instruction": "Abra `package-lock.json` e localize uma entrada direta e uma dependência transitiva dela; observe versão, resolved e integrity.", "result": "O lockfile registra pacotes resolvidos e seus metadados; o inventário inclui mais itens que o manifesto. Integrity é um dado de verificação de conteúdo, não prova de que o pacote é benigno." },
      { "instruction": "Leia `.github/workflows/ci.yml` e encontre a etapa de instalação, o diretório e o arquivo de lock indicado para cache.", "result": "A CI instala na pasta do laboratório com `npm ci` e usa seu lockfile; o site estático não instala os pacotes desse laboratório." }
    ],
    "mistakes": [
      "Achar que lockfile prova que pacote é seguro ou que `npm ci` verifica código malicioso.",
      "Confundir scanner sem alertas conhecidos com auditoria completa de vulnerabilidade, integridade e licença.",
      "Olhar só dependências diretas e esquecer as transitivas, ferramentas e pipeline.",
      "Instalar pacote sem verificar grafia, registry, responsável, licença, manutenção e necessidade.",
      "Rodar `npm audit fix` sem revisar mudanças incompatíveis, lockfile e testes.",
      "Acreditar que uma vulnerabilidade sem uso aparente pode ser ignorada sem evidência ou registro de decisão.",
      "Deixar um alerta sem responsável, prioridade, prazo ou nova verificação."
    ],
    "exercises": [
      {
        "prompt": "Prever: a CI executa `npm ci` e termina com erro de que package.json e package-lock.json não correspondem. Preveja se os testes chegaram a rodar e diga quais arquivos e eventos comparar antes de editar.",
        "expected": "A instalação limpa falha antes dos testes quando manifesto e lockfile divergem. A análise confere diretório da CI, diff dos dois arquivos e comandos recentes de alteração; não apaga o lockfile nem atualiza versões no escuro.",
        "criteria": ["Identifica instalação como etapa anterior à suíte de testes.", "Compara manifesto, lockfile e pasta usada pelo workflow.", "Não recomenda apagar lockfile ou aplicar update sem revisar a mudança."],
        "solution": "Primeiro confirme no log que o job parou no npm ci. Depois verifique se a CI está na pasta `labs/backend-layers`, inspecione `git diff -- package.json package-lock.json` nessa pasta e descubra qual comando alterou apenas um dos arquivos. Atualize o lockfile de forma intencional, revise o novo grafo e rode os testes antes de enviar.",
        "explanation": "npm ci não corrige o lockfile para o manifesto; falhar explicitamente evita que CI use uma árvore não revisada.",
        "hints": ["A primeira etapa que falha é instalação ou teste?", "A raiz do repositório tem o manifesto ou a subpasta do laboratório?", "Que mudança deveria modificar os dois arquivos juntos?"]
      },
      {
        "prompt": "Alterar: uma tarefa pede biblioteca para formatar uma data, mas `Intl.DateTimeFormat` pode atender. Faça uma matriz de decisão com necessidade, alternativa nativa, pacote/origem, manutenção/licença, dependências transitivas, testes e decisão; use apenas marcadores, sem instalar nada.",
        "expected": "A matriz compara necessidade real e solução nativa, exige verificar nome/origem, suporte e licença, estima custo transitivo e define testes/rollback. A decisão fica explícita como adiar ou aceitar mediante evidência, sem comando de instalação.",
        "criteria": ["Compara alternativa nativa e benefício concreto.", "Inclui origem, manutenção, licença e árvore transitiva.", "Define testes de compatibilidade e rollback.", "Não instala pacote nem inventa dados de segurança."],
        "solution": "Necessidade: formatar datas para interface. Alternativa: Intl.DateTimeFormat cobre idioma e fuso deste requisito. Pacote: `<nome exato>`; origem: `<registry oficial>`; manutenção/licença: `<verificar e registrar>`; dependências transitivas: `<avaliar no lockfile>`; teste: casos de fuso/idioma em módulo local; rollback: remover dependência e retornar à API nativa. Decisão inicial: adiar até surgir requisito que a API nativa não cubra.",
        "explanation": "A menor dependência possível reduz componentes a inventariar e manter.",
        "hints": ["Qual caso concreto a API nativa não resolve?", "Que informações ainda não foram verificadas?", "Como outra pessoa repetiria a decisão?"]
      },
      {
        "prompt": "Construir: usando somente os manifestos e workflow versionados, monte um inventário para `pg`, `redis`, `@playwright/test` e uma dependência transitiva identificada no lockfile. Inclua finalidade, tipo, versão resolvida, origem declarada, licença, evidência de manutenção e próxima ação; se um dado exigir consulta externa, marque como pendente.",
        "expected": "O inventário diferencia runtime/dev/transitiva, registra versões e metadados observados, marca manutenção e alertas como não verificados quando não há evidência atual e não afirma segurança ou licença além do arquivo consultado.",
        "criteria": ["Distingue dependência direta e transitiva e uso runtime/dev.", "Registra apenas campos observados nos arquivos.", "Marca status de manutenção/avisos como pendente sem consulta atual.", "Não classifica pacote como seguro a partir do lockfile."],
        "solution": "Use as dependências declaradas `pg`, `redis` e `@playwright/test` como diretas e selecione um pacote sob `node_modules/pg/...` ou outra entrada transitiva do lockfile. Copie versão, registry/resolved, license e integridade visíveis; associe uso pelo manifesto/árvore. Para atividade de manutenção e avisos atuais, escreva `pendente — exige consulta às fontes do mantenedor e advisory database`; não invente conclusão.",
        "explanation": "Inventário confiável separa observação local de informação atual que ainda não foi pesquisada.",
        "hints": ["Quais dados vêm dos arquivos versionados?", "O que depende de consulta atual?", "O fato de haver hash demonstra intenção benigna?"]
      },
      {
        "prompt": "Investigar erro: uma atualização proposta altera package.json e renova muitos pacotes no lockfile; os testes de API falham. Escreva um plano de triagem para identificar a menor mudança causadora, avaliar aviso de segurança, compatibilidade e rollback sem publicar nem atualizar todas as dependências.",
        "expected": "O plano identifica primeiro pacote/caminho e a mudança de versão, confere changelog/advisory oficial, reproduz testes locais na branch, reduz o diff/atualiza em passos e só então propõe correção/rollback documentado; não promove a mudança sem CI verde.",
        "criteria": ["Localiza mudança de dependência e caminho afetado antes de trocar várias versões.", "Consulta advisory e compatibilidade por fonte apropriada.", "Usa testes na branch e preserva evidência antes/depois.", "Define rollback e não publica versão reprovada."],
        "solution": "Na branch, registre o commit base e o resultado de testes. Compare o lockfile para localizar pacote e versões alterados; consulte advisory oficial e notas do mantenedor. Reproduza o primeiro teste que falhou. Separe atualizações em mudanças pequenas, corrija incompatibilidade ou reverta o pacote que a introduziu, rode toda a suíte e peça CI verde antes de promover. Registre o risco tratado e o rollback.",
        "explanation": "Um patch de segurança é importante, mas uma atualização sem compatibilidade também pode quebrar o serviço; revisão e teste completam a resposta.",
        "hints": ["Qual foi o primeiro teste vermelho e qual pacote mudou antes dele?", "O advisory se aplica a esta versão e a este caminho transitivo?", "Como voltar ao último estado comprovado?"]
      }
    ],
    "quiz": [
      { "question": "O que o lockfile permite concluir com mais segurança?", "options": ["Que os pacotes são benignos.", "Quais escolhas resolvidas e metadados a instalação usa.", "Que nenhuma vulnerabilidade será descoberta depois."], "correctIndex": 1, "explanation": "O arquivo apoia inventário/reprodução, mas não garante segurança futura ou intenção do publicador." },
      { "question": "Qual opção descreve uma dependência transitiva?", "options": ["Pacote necessário por outra dependência do projeto.", "Qualquer pasta no repositório.", "Uma variável de ambiente."], "correctIndex": 0, "explanation": "O grafo inclui pacotes que o projeto não declara diretamente." },
      { "question": "O que significa `npm audit` sem vulnerabilidades conhecidas no relatório?", "options": ["Todo o código foi provado seguro.", "Não foram encontrados avisos conhecidos no grafo consultado naquele momento.", "A licença de cada pacote é compatível."], "correctIndex": 1, "explanation": "A base muda e não detecta todo risco de integridade, manutenção, licença ou código malicioso." },
      { "question": "Por que revisar o diff e rodar testes após atualizar uma dependência?", "options": ["Porque correções podem alterar versões e comportamento, inclusive de modo incompatível.", "Porque o lockfile não pode ser versionado.", "Para remover todas as dependências transitivas."], "correctIndex": 0, "explanation": "Atualizar corrige riscos, mas precisa preservar o contrato do produto e permitir rollback." }
    ],
    "summary": [
      "A03:2025 abrange a cadeia de construção, distribuição e atualização, não apenas CVEs em bibliotecas.",
      "Inventarie dependências diretas, transitivas, ferramentas, CI e origem; minimize o que não é necessário.",
      "Manifesto, lockfile, npm ci e npm audit têm funções complementares e limites diferentes.",
      "Revise atualizações em passos pequenos com advisory, compatibilidade, testes, CI e rollback.",
      "A inspeção desta aula é estática; não afirma estado atual de vulnerabilidades nem execução de auditoria."
    ]
  },
  "delivery-redis-foundations": {
    "prerequisites": "Concluir `setup-docker`, `setup-node`, `db-postgres` e `delivery-api-abuse`; conhecer banco relacional, API e execução de containers. A decisão arquitetural usa o PostgreSQL/Supabase existente como fonte de verdade.",
    "setup": "No editor, leia `labs/redis-fundamentals/README.md` e `compose.yaml`. No terminal, abra a pasta `labs/redis-fundamentals`, execute `docker compose config` e depois `docker compose up -d --wait`; com Compose standalone, use `docker-compose`. A saída esperada inclui um serviço `redis` saudável publicado em 127.0.0.1:56379. Execute `docker compose exec -T redis redis-cli PING`; a resposta esperada é `PONG`. A primeira execução baixa a imagem oficial. Não usa rede pública de dados, domínio, Preview ou credenciais reais. Pare com `docker compose down`; para retomar, repita `up -d --wait`. Se Docker não estiver disponível, desenhe o fluxo sem instalar nada.",
    "why": "Redis adiciona uma dependência operacional e um caminho de rede. Uma aplicação pequena pode continuar mais confiável e simples usando PostgreSQL, que já guarda estado persistente e transações. Adote Redis quando um gargalo ou requisito medido justificar cache, contador ou limite compartilhado, sabendo como recuperar dados e operar quando o serviço falhar.",
    "example": {
      "language": "text",
      "code": "FLUXO DO PROJETO\n\nNavegador → API → PostgreSQL/Supabase (fonte persistente)\n                         ├── transações e progresso do aluno\n                         └── cache Redis opcional → cópia temporária\n\nRedis pode apoiar cache, sessão, contador e rate limit.\nA demonstração local usa chaves sem dados pessoais e sem persistência.\nO projeto não precisa mover `learning_state` para Redis.",
      "expected": "PostgreSQL/Supabase continua autoritativo para o progresso; Redis é um componente opcional e temporário com custo e modo de falha próprios.",
      "explanation": [
        "Redis é um armazenamento de dados em memória com estruturas e comandos próprios; também pode persistir dados se configurado. Nesta arquitetura didática, cache e contadores podem ser reconstruídos, então o Compose local desliga snapshots e AOF.",
        "Usos comuns incluem cache de leitura, sessão, contadores, publicação/assinatura e fila. Esses usos têm requisitos diferentes de durabilidade, ordenação, expiração, recuperação e entrega; o nome Redis não define automaticamente a garantia.",
        "O banco relacional existente oferece integridade, relações, transações e durabilidade para o progresso. Colocar esse estado em um cache aumenta risco de perda ou divergência sem benefício medido.",
        "A imagem local tem 64 MB de memória, política noeviction e porta publicada apenas em loopback. É uma configuração descartável para estudo, não uma recomendação pronta para produção."
      ]
    },
    "sections": [
      {
        "title": "Comece pela necessidade, não pela ferramenta",
        "paragraphs": [
          "Se há uma pessoa usando uma aplicação pequena e as consultas ao PostgreSQL são rápidas, Redis pode acrescentar mais trabalho que benefício. Meça antes: volume e repetição de leitura, p95 da API, consultas lentas, saturação do banco e custo. Verifique índices, paginação e N+1 antes de colocar uma cópia em outro serviço.",
          "Redis faz sentido quando um requisito pede resposta temporária muito rápida, contador compartilhado entre réplicas, sessão centralizada ou proteção de uma API por quota. Se o dado precisa de transação, consulta relacional, restrição ou recuperação como registro oficial, mantenha-o no banco durável. Um Redis pode ter persistência configurada, mas isso exige projeto e operação explícitos e não transforma automaticamente qualquer cache em banco principal.",
          "Para o Tech Learning Hub, `learning_state` no Supabase continua persistente e vinculado à conta. Redis não substituirá esse armazenamento. A aula usa somente dados fictícios, e o contêiner de laboratório perde seus dados ao encerrar.",
          "Pausa: para cada proposta — melhorar uma consulta lenta, manter sessão, contar tentativas e salvar progresso — diga que evidência seria necessária antes de decidir por Redis."
        ],
        "terms": [
          { "term": "Fonte de verdade", "meaning": "Armazenamento autoritativo do qual as cópias e relatórios podem ser reconstruídos." },
          { "term": "p95", "meaning": "Latência abaixo da qual 95% das observações medidas terminaram; ajuda a analisar a cauda lenta." },
          { "term": "Cache", "meaning": "Cópia temporária que pode ser descartada e reconstruída a partir de uma fonte autoritativa." }
        ]
      },
      {
        "title": "Usos diferentes trazem garantias diferentes",
        "paragraphs": [
          "Cache armazena cópia de algo que pode ser recarregado. Sessão guarda contexto que pode ser sensível e precisa de expiração, revogação e controle de acesso. Contador agrega eventos por chave e período. Fila precisa de semântica de entrega, confirmação, repetição e tratamento de mensagem morta; uma lista ou Pub/Sub não resolve automaticamente essas garantias.",
          "TTL (time to live, tempo de vida) limita quanto uma chave pode permanecer. Expiração reduz lixo e pode limitar a idade planejada de uma cópia, mas não substitui invalidação quando uma escrita precisa aparecer imediatamente. Chave sem TTL pode acumular sem limite; `TTL -1` indica que uma chave não tem expiração configurada.",
          "Redis usa memória limitada. Ao atingir o limite, política de expulsão pode remover chaves ou a política `noeviction` pode fazer gravações falharem. Para cache, descartar uma cópia costuma ser recuperável; expulsar contador de limite antes do fim da janela pode liberar tentativas adicionais. Configure política segundo uso e comportamento de falha, não como valor universal.",
          "Pausa: classifique cada dado como reconstruível, persistente, segredo/sensível ou mensagem que precisa ser processada. Indique TTL e plano de recuperação."
        ],
        "terms": [
          { "term": "TTL", "meaning": "Duração depois da qual uma chave deve expirar automaticamente." },
          { "term": "Expulsão (eviction)", "meaning": "Remoção de chaves para respeitar limite de memória conforme política configurada." },
          { "term": "Persistência", "meaning": "Mecanismo para recuperar estado depois de reinício; depende da configuração e não é sinônimo de replicação ou backup." }
        ]
      },
      {
        "title": "Mapeie a nova dependência e sua indisponibilidade",
        "paragraphs": [
          "Com Redis, cada pedido pode adicionar conexão de rede, timeout, autenticação, memória, latência e ponto de falha. Use monitoramento e limite de conexões, acesso restrito à rede, ACL/autenticação e TLS conforme topologia. Não exponha porta à internet. A demonstração sem senha é aceitável somente em container local ligado a 127.0.0.1, sem dados e sem persistência.",
          "Quando Redis cai, a API precisa de uma decisão explícita. Cache de leitura pode tentar a fonte principal com timeout e controle de concorrência; repetir sem limite pode sobrecarregar o banco. Uma rota de limite pode escolher falhar aberta ou fechada segundo dano e disponibilidade. Sessão, pagamento, criação de convite e cache público não têm sempre a mesma regra.",
          "Compare benefício e custo com a mesma amostra e perfil de requisição: p50/p95, taxa de cache hit, chamadas ao banco, memória, erros e custo. Uma medição em laboratório local não prediz produção ou Vercel Preview. Esta aula não fez benchmark de API nem chamada remota.",
          "Pausa: Redis fica indisponível durante leitura pública, gravação de progresso e envio de código de recuperação. Escolha fallback ou recusa para cada operação e justifique pelo impacto."
        ],
        "terms": [
          { "term": "Fail-open", "meaning": "Permitir a operação quando o mecanismo de proteção não está disponível; pode preservar disponibilidade e reduzir a proteção." },
          { "term": "Fail-closed", "meaning": "Recusar a operação quando o controle está indisponível; preserva uma regra de segurança e pode interromper uso legítimo." },
          { "term": "Cache hit ratio", "meaning": "Proporção de leituras atendidas pela cópia de cache em relação às leituras medidas." }
        ]
      }
    ],
    "diagramTitle": "Decidir se Redis participa do fluxo",
    "diagram": "Requisito e medida → PostgreSQL sozinho resolve?\n                         ├── sim → preservar caminho simples\n                         └── não, há benefício medido\n                                ↓\n                         Redis para papel explícito\n                         ├── dado temporário e recuperável?\n                         ├── TTL, memória e rede definidos?\n                         ├── comportamento de indisponibilidade definido?\n                         └── custo/benefício medidos?",
    "guided": [
      { "instruction": "Execute `docker compose config` e identifique a porta host, o serviço e se existe volume persistente. Se usa Compose standalone, substitua o prefixo por `docker-compose`.", "result": "Há um serviço redis em 127.0.0.1:56379; não há volume, snapshots ou AOF no exemplo descartável." },
      { "instruction": "Execute `docker compose exec -T redis redis-cli PING` e registre a resposta. Depois pare o serviço com `docker compose down`.", "result": "Redis responde PONG; down remove o container e a rede do projeto, sem apagar serviços de outros Compose." },
      { "instruction": "Para cada uso — cache, sessão e progresso do curso — marque fonte de verdade, expiração e recuperação.", "result": "Cache pode ser refeito; sessão exige expiração/revogação e proteção; progresso do projeto permanece no Supabase/PostgreSQL." }
    ],
    "mistakes": [
      "Adicionar Redis antes de medir uma necessidade ou otimizar consultas e índices existentes.",
      "Tratar Redis como fonte de verdade apenas por ele responder rápido.",
      "Supor que todo dado Redis é volátil ou que configurar snapshot equivale a backup testado.",
      "Usar a mesma política de memória, TTL ou indisponibilidade para cache e rate limiter.",
      "Expor a porta Redis na rede ou usar a configuração local sem autenticação em produção.",
      "Declarar ganho de desempenho com base apenas em latência de um comando isolado."
    ],
    "exercises": [
      {
        "prompt": "Prever: a API tem 1 usuário, o p95 é 18 ms e PostgreSQL responde sem consultas lentas. A equipe propõe adicionar Redis para progresso. Preveja dois custos novos e diga que medida poderia justificar reconsiderar depois.",
        "expected": "Redis acrescenta rede/timeout, operação, memória, monitoramento e modo de falha; sem gargalo medido não há benefício comprovado. A decisão pode ser revista com volume, p95, taxa de leitura repetida ou saturação observada.",
        "criteria": ["Identifica ao menos dois custos operacionais/rede.", "Mantém PostgreSQL como fonte de verdade.", "Escolhe uma medida observável para uma revisão futura."],
        "solution": "Adiar Redis: o banco responde em p95 de 18 ms e não há consulta lenta. Custos incluem outra conexão e serviço a monitorar, além de política de falha. Reavaliar se medições mostram muitas leituras idênticas, aumento de p95 ou saturação que índices/paginação não resolvem.",
        "explanation": "Uma tecnologia adicional precisa resolver um problema observado e justificar seu ciclo de operação.",
        "hints": ["O que acontece se Redis falhar?", "Qual indicador comprovaria que a cópia ajuda?", "Onde permanece o progresso persistente?"]
      },
      {
        "prompt": "Alterar: reescreva a arquitetura hipotética para que sessão de login, contador temporário e progresso do aluno tenham papéis e recuperação distintos. O progresso não pode depender do cache.",
        "expected": "A proposta identifica Redis/TTL como opção para sessão ou contador temporário, descreve revogação/recuperação e deixa progresso persistente no Supabase/PostgreSQL, nunca somente em Redis.",
        "criteria": ["Separa os três tipos de dado.", "Define recuperação/expiração para sessão e contador.", "Mantém progresso em armazenamento persistente autoritativo."],
        "solution": "Sessão: serviço de autenticação já existente ou store compartilhado com TTL, revogação e ACL. Contador: Redis com chave mínima e TTL. Progresso: tabela Supabase/PostgreSQL por usuário com RLS; cache opcional só de leitura e invalidado após gravação.",
        "explanation": "Requisitos de durabilidade, privacidade e recuperação variam entre os dados.",
        "hints": ["Quais dados podem ser descartados e reconstruídos?", "O que não pode sumir em reinício?", "Como revogar uma sessão?"]
      },
      {
        "prompt": "Construir: desenhe o fluxo Navegador → API → PostgreSQL e marque onde Redis poderia participar como cache e contador. Para cada seta, indique credencial, dado permitido e comportamento se Redis cair.",
        "expected": "O diagrama mostra API mediando dados, PostgreSQL como autoritativo, cache sem segredos, contador com chave minimizada e fallback/recusa deliberados conforme operação; Redis não recebe token ou anotação sem necessidade.",
        "criteria": ["PostgreSQL fica como fonte persistente de progresso.", "Cache e contador têm usos separados.", "Indica fallback/recusa quando Redis está indisponível.", "Evita tokens e dados privados nas chaves."],
        "solution": "Navegador autenticado → API valida sessão → PostgreSQL lê/grava progresso. API → Redis opcional: GET cache:v1:study:<id interno> para resposta pública ou INCR rate:v1:<id opaco> para quota. Se cache falha, tentativa limitada no Postgres; se contador que protege operação crítica falha, recusar ou seguir política documentada. Nunca incluir bearer/token na key.",
        "explanation": "Limites claros entre componentes permitem decidir identidade, fonte, privacidade e falha sem pressupor que Redis substitui o banco.",
        "hints": ["A interface não deve conectar direto ao Redis.", "Que dado precisa sobreviver a reinício?", "Que endpoint pode permitir tudo se o contador some?"]
      },
      {
        "prompt": "Investigar erro: após adicionar Redis, a API fica mais lenta quando Redis não responde. Planeje uma investigação pequena para separar DNS/rede, timeout, conexões, memória e fallback ao Postgres; não envie carga ao Preview.",
        "expected": "O plano registra latência de conexão e query, timeout, pool, saúde/memória de Redis, chamadas de fallback e p50/p95 em cenário local controlado; limita retries e evita benchmark público/remoto.",
        "criteria": ["Separa rede/timeout de consulta do banco.", "Observa conexões/memória e cascata de fallback.", "Define limite de retry/timeout.", "Usa ambiente local/dados fictícios sem teste de domínio."],
        "solution": "Reproduzir localmente com poucas leituras fictícias; registrar tempo de conexão Redis, GET, consulta Postgres, quantidade de conexões e p95; provocar indisponibilidade apenas no compose próprio; confirmar timeout finito, retry limitado e modo escolhido. Não medir Vercel Preview nem comparar uma única chamada como benchmark.",
        "explanation": "Fallback sem limite pode transferir toda a carga ao Postgres e transformar uma falha parcial em indisponibilidade ampla.",
        "hints": ["Qual componente demora primeiro?", "Quantas conexões são abertas em cada retry?", "O banco recebe todas as leituras durante a queda do cache?"]
      }
    ],
    "quiz": [
      { "question": "Qual é a fonte de verdade do progresso neste projeto?", "options": ["Redis descartável do laboratório.", "Supabase/PostgreSQL persistente vinculado à conta.", "Uma chave de cache sem TTL."], "correctIndex": 1, "explanation": "O laboratório Redis não substitui o armazenamento autoritativo do progresso." },
      { "question": "Quando adicionar Redis é mais justificável?", "options": ["Quando uma medida mostra necessidade que o caminho atual não resolve com simplicidade.", "Sempre que uma API é criada.", "Antes de medir consultas."], "correctIndex": 0, "explanation": "Redis traz rede, memória, operação e novos modos de falha." },
      { "question": "O que TTL define?", "options": ["Quanto uma chave pode permanecer antes de expirar.", "Quem pode ver o token.", "Número de conexões abertas."], "correctIndex": 0, "explanation": "TTL controla duração da chave e ajuda a limitar retenção/idade da cópia." },
      { "question": "Por que política de memória deve considerar uso?", "options": ["Expulsar cache e contador tem efeitos diferentes sobre recuperação e limite.", "Redis não tem limites de memória.", "Todas as chaves podem durar para sempre."], "correctIndex": 0, "explanation": "Remover uma cópia de cache pode ser aceitável; apagar um contador ainda ativo pode enfraquecer quota." }
    ],
    "summary": [
      "Meça primeiro; PostgreSQL continua suficiente para a fonte persistente do progresso.",
      "Cache, sessão, contador e fila têm exigências diferentes de duração e recuperação.",
      "TTL, memória, rede, credenciais e indisponibilidade fazem parte do projeto Redis.",
      "O Compose é local, sem volume e ligado ao loopback; não é uma configuração de produção.",
      "Nenhum benchmark ou teste de Preview/domínio foi executado."
    ]
  },
  "delivery-redis-cache-aside": {
    "prerequisites": "Concluir `delivery-redis-foundations` e `db-postgres`; saber ler dados de uma fonte persistente e distinguir cópia de registro autoritativo.",
    "setup": "Com Redis iniciado pela aula anterior, abra `labs/redis-fundamentals` no terminal e execute `node check-cache-aside.cjs`. A saída esperada termina em `Cache-aside Redis: PASS`; o script comprova miss, hit, valor antigo sem invalidação, invalidação e TTL. A fonte é uma Map local, não PostgreSQL. O script apaga a chave aleatória que cria. Se Compose standalone, o programa tenta `docker-compose`; se Redis não responder, confira `docker compose ps`/`docker-compose ps` e o README. Não abre domínio, Preview nem banco remoto.",
    "why": "Cache-aside pode reduzir consultas repetidas, mas cria uma cópia que pode ficar velha ou indisponível. O desenho precisa limitar staleness, invalidar após escrita e preservar a fonte persistente.",
    "example": {
      "language": "text",
      "code": "LEITURA\nGET cache:v1:studies:<id-opaco> → hit? devolver cópia\n                      └── miss → consultar PostgreSQL\n                                  SET cache:v1:studies:<id-opaco> JSON EX 30\n                                  devolver dado da fonte\n\nESCRITA\nPostgreSQL COMMIT → DEL cache:v1:studies:<id-opaco>\n\nA key tem versão/escopo, TTL limita envelhecimento e Redis não vira fonte.",
      "expected": "Uma falta consulta PostgreSQL e preenche uma cópia versionada com TTL; uma escrita bem-sucedida invalida a cópia depois do commit.",
      "explanation": [
        "Cache-aside: aplicação consulta cache, busca fonte principal em miss e grava cópia temporária para próxima leitura.",
        "Namespace e versão como `cache:v1:...` ajudam a separar tipo/formato; identificador opaco evita colocar email, token ou dado pessoal em chave/log.",
        "TTL dá limite superior planejado para vida da cópia; `DEL` após commit reduz staleness imediatamente. Se invalidar antes do commit, leitura concorrente pode repor valor antigo.",
        "Uma expiração de chave popular pode disparar muitas leituras simultâneas ao banco (cache stampede). Cache lock, jitter, refresh antecipado ou coalescing ajudam, mas aumentam complexidade.",
        "O script do laboratório usa fonte em memória. É evidência do comportamento Redis e de cache-aside simulado, não integração com PostgreSQL nem medida de desempenho real."
      ]
    },
    "sections": [
      {
        "title": "Percorra miss, fonte e hit",
        "paragraphs": [
          "No primeiro GET, a chave não existe: cache miss. A API lê a fonte persistente, serializa um resultado que pode ser compartilhado com aquele escopo e grava no Redis com TTL. Na próxima chamada, cache hit pode evitar uma consulta ao banco. Se a fonte retorna registro inexistente, decida se armazena uma resposta vazia por pouco tempo; cuidado para não esconder uma criação recente.",
          "Chave deve identificar a entidade, versão de formato e escopo de acesso. Para dados por usuário, inclua um ID interno apropriado e mantenha autorização antes de devolver valor; a chave não é controle de acesso. Um cache compartilhado sem escopo por tenant pode servir dados de uma conta para outra.",
          "Evite guardar segredo de sessão, bearer token, anotação privada ou resposta pessoal sem política justificada. Se o valor contém dados do aluno, o risco e retenção mudam; use minimização, TTL adequado e isolamento por conta. Não coloque token em nome de key nem em log.",
          "Pausa: trace uma leitura em que o primeiro pedido é miss e o seguinte hit. Em que ponto o banco é consultado e qual camada autoriza o usuário?"
        ],
        "terms": [
          { "term": "Cache miss", "meaning": "A chave não foi encontrada e a aplicação consulta a fonte autoritativa." },
          { "term": "Cache hit", "meaning": "A aplicação encontrou uma cópia que ainda considera válida e pode devolvê-la segundo sua política." },
          { "term": "Namespace", "meaning": "Prefixo estruturado de key que separa entidade, versão, ambiente ou escopo." }
        ]
      },
      {
        "title": "Limite idade com TTL e invalidação após escrita",
        "paragraphs": [
          "TTL como 30 segundos é apenas um valor fictício. Escolha uma duração conforme frescor aceitável e custo de recarga; não copie um número sem conhecer o requisito. Expiração limita a janela planejada para dado antigo, mas relógio, failover, processo e cópias locais podem ter efeitos diferentes.",
          "Caminho de escrita típico: validar e autorizar; gravar no PostgreSQL; confirmar commit; então invalidar key Redis. Se o commit falhar, não deve apagar ou confirmar uma atualização inexistente. Se invalidação falhar depois do commit, TTL reduz a duração de dado antigo; registre falha e escolha outra forma de consistência se o requisito não tolera essa janela.",
          "Uma corrida ainda é possível: leitura consulta banco antigo; escrita faz commit e DEL; leitura antiga termina depois e grava valor antigo no cache. Estratégias como versão de cache, compare-and-set, lock ou invalidação por versão podem evitar situações específicas, mas trazem custo. Explique a consistência oferecida antes de adotar cache.",
          "Pausa: compare escrita SQL que falhou versus escrita confirmada seguida de falha no DEL. Qual versão deve ser devolvida e que compensação existe?"
        ],
        "terms": [
          { "term": "Staleness", "meaning": "Período em que uma cópia difere da fonte autoritativa." },
          { "term": "Invalidação", "meaning": "Remoção ou mudança de versão de uma cópia para que a próxima leitura volte à fonte." },
          { "term": "Cache stampede", "meaning": "Várias requisições concorrentes recarregam o mesmo dado ao mesmo tempo após miss/expiração." }
        ]
      },
      {
        "title": "Responda a falta e indisponibilidade sem cascata",
        "paragraphs": [
          "O laboratório usa TTL e chave versionada. `check-cache-aside.cjs` faz a primeira leitura em uma Map fictícia, retorna cópia no segundo acesso, simula atualização da fonte sem invalidar para mostrar valor velho e em seguida invalida para recarregar. A saída `PASS` confirma esse roteiro pequeno, não um SLO de aplicação.",
          "Redis fora do ar não deve causar retry infinito. Configure timeout, limite de conexões e um fallback controlado ao PostgreSQL apenas para leitura que tolera isso. Cache bypass amplia consultas; limite concorrência, monitore a fonte e decida se serve cópia velha explicitamente. Para escrita de progresso, a confirmação vem do banco durável; não confirme com base apenas em cache.",
          "Planeje cache hit ratio, miss, falhas Redis, tempo de GET, latência e consultas ao banco. Antes/depois precisa usar mesma versão de dados, aquecimento e perfil; compare p50/p95 e memória. Nesta etapa o teste confirma lógica simples no container, mas não mede ganho de throughput ou custo.",
          "Pausa: se Redis cai e todos os clientes dão miss ao PostgreSQL, que limite evita transformar fallback em pico de carga?"
        ],
        "terms": [
          { "term": "Fallback", "meaning": "Caminho alternativo quando o componente primário da operação não responde, com limites e garantias definidos." },
          { "term": "Stale-if-error", "meaning": "Política explícita que aceita servir cópia antiga durante falha da fonte, quando o tipo de dado permite." },
          { "term": "Hit ratio", "meaning": "Percentual de leituras observadas respondidas pelo cache." }
        ]
      }
    ],
    "diagramTitle": "Cache-aside no caminho de leitura e escrita",
    "diagram": "LEITURA: API → GET Redis → hit ─────────→ responder cópia permitida\n                    └── miss → Postgres → SET Redis com TTL → responder fonte\n\nESCRITA: API → autorizar → Postgres COMMIT → invalidar chave Redis\n                                                ↓\n                                      próximo pedido recarrega",
    "guided": [
      { "instruction": "Execute `node check-cache-aside.cjs` e anote qual chamada foi miss, qual foi hit e quantas vezes a fonte fictícia foi lida.", "result": "A fonte Map é lida na primeira chamada e novamente após invalidar; a segunda leitura antes da mudança usa Redis." },
      { "instruction": "No `compose.yaml`, localize versão `v1`, porta loopback e o TTL 30 do script; descreva o que cada um limita.", "result": "Versão separa espaço de keys; 127.0.0.1 limita alcance de rede; EX 30 dá expiração curta à cópia de demonstração." },
      { "instruction": "Desenhe ordem de escrita com commit Postgres e DEL Redis; indique comportamento se o commit falhar ou DEL falhar.", "result": "Só invalida depois de commit confirmado; se o banco falha, mantém estado anterior; se DEL falha depois, assume staleness limitada por TTL ou registra incidente." }
    ],
    "mistakes": [
      "Chamar cache-aside de fonte de verdade ou confirmar gravação antes do banco.",
      "Não colocar TTL e deixar chave crescer sem limite temporal.",
      "Invalidar antes do commit e permitir repopular valor antigo.",
      "Esquecer escopo de tenant/usuário e misturar respostas de contas diferentes.",
      "Fazer fallback ilimitado ao banco durante falha do cache.",
      "Supor que o script local usa PostgreSQL ou prova ganho de desempenho real."
    ],
    "exercises": [
      {
        "prompt": "Prever: cache contém título HTML. A pessoa atualiza a fonte para CSS, mas a API não envia DEL. Preveja o que vê o próximo GET e até quando a divergência pode persistir no exemplo com TTL.",
        "expected": "O próximo hit ainda devolve HTML; a cópia pode permanecer até TTL expirar, se não houver outro mecanismo de invalidação.",
        "criteria": ["Identifica leitura como hit do valor antigo.", "Relaciona janela máxima planejada ao TTL.", "Diz que PostgreSQL continua com o valor novo."],
        "solution": "O próximo GET devolve HTML enquanto key existir. Com TTL 30, o exemplo pretende limitar vida da chave a até 30 segundos desde SET; a fonte principal pode já conter CSS.",
        "explanation": "Cache-aside precisa de uma política de frescor, não apenas de gravação de cópia.",
        "hints": ["O que GET encontra primeiro?", "A atualização foi feita na fonte ou no cache?", "Que comando remove a cópia após commit?"]
      },
      {
        "prompt": "Alterar: uma tela tem chave `cache:perfil:<email>`. Reescreva o padrão para prefixo/versão/escopo com ID opaco, TTL e invalidação após uma gravação confirmada. Use placeholders.",
        "expected": "A key evita email/token, inclui namespace e versão, e atualização invalida depois de commit; autorização segue no servidor.",
        "criteria": ["Remove email e credenciais da key.", "Inclui namespace/version e escopo por identidade interna.", "Indica TTL e ordem commit→invalidação.", "Não trata key como autorização."],
        "solution": "`cache:v1:profile:<user-id-opaco>` com TTL apropriado; a API valida sessão e dono, grava Postgres, confirma commit e executa DEL dessa key. Em falha do DEL, observa falha e aceita só staleness definida até expiração.",
        "explanation": "A key organiza cache e reduz exposição de identificador; a decisão de acesso ainda é do servidor/banco.",
        "hints": ["Que informação não deveria aparecer em logs de chave?", "Que prefixo permite migrar formato?", "Quando o banco confirmou a escrita?"]
      },
      {
        "prompt": "Construir: execute o teste de cache e crie uma tabela de estado com cache vazio, hit, fonte alterada sem invalidar e `DEL` após commit; inclua fonte consultada, valor esperado e TTL.",
        "expected": "A tabela mostra miss/fonte HTML, hit/HTML sem nova leitura, dado velho HTML após mudança da Map para CSS e miss/CSS após DEL com TTL de 30 segundos; declara que fonte é simulada.",
        "criteria": ["Registra estados e fonte observados.", "Mostra o valor velho sem invalidar.", "Mostra valor atualizado após DEL.", "Declara que fonte Map não é PostgreSQL."],
        "solution": "Estado 1 key ausente: consulta Map (HTML), SET EX 30. Estado 2 GET retorna HTML, Map sem leitura adicional. Estado 3 Map recebe CSS, key ainda devolve HTML. Estado 4 DEL remove cópia; leitura volta à Map e devolve CSS. Esse script não abre conexão SQL.",
        "explanation": "A tabela separa o estado autoritativo fictício do cache temporário e prova o efeito da invalidação.",
        "hints": ["Use contador `sourceReads` do script.", "Qual chave é removida?", "O que está explicitamente simulado?"]
      },
      {
        "prompt": "Investigar erro: Redis caiu e o banco recebeu dez vezes mais leituras. Proponha diagnóstico e contenção sem desligar indiscriminadamente o banco nem testar Preview.",
        "expected": "Mede falhas/latência/cache misses e fallback, limita timeouts/retries/concorrência, avalia stale-if-error apenas para leitura tolerante e monitora carga; registra condição de retorno gradual.",
        "criteria": ["Distingue falha do cache de falha do Postgres.", "Limita retries e chamadas concorrentes.", "Define se cópia antiga pode ser servida e para quais dados.", "Não usa teste remoto ou domínio."],
        "solution": "Compare métricas de Redis, misses, conexões e queries Postgres; confirme timeout e cause. Contenha com circuit breaker e limite de fallback; sirva stale apenas em leitura pública se política permitir; escale/recupere Redis e aqueça gradualmente; não altere serviço remoto sem evidência.",
        "explanation": "Fallback ilimitado pode multiplicar o defeito que o cache deveria absorver.",
        "hints": ["Cada miss dispara quantas consultas?", "Qual dado pode tolerar staleness?", "Como reabrir gradualmente a leitura Redis?"]
      }
    ],
    "quiz": [
      { "question": "No cache-aside, o que ocorre em miss?", "options": ["A aplicação consulta a fonte e pode preencher Redis com TTL.", "Redis apaga o banco.", "A key vira autorização."], "correctIndex": 0, "explanation": "A fonte autoritativa continua respondendo quando a cópia não existe." },
      { "question": "Por que invalidar depois do commit?", "options": ["Para não apagar cópia como se escrita tivesse ocorrido quando o banco falhou.", "Para desativar autorização.", "Para não precisar de TTL."], "correctIndex": 0, "explanation": "A ordem mantém cache e fonte coerentes quanto ao sucesso da gravação." },
      { "question": "O que faz o script `check-cache-aside.cjs`?", "options": ["Usa uma fonte Map simulada e testa miss/hit/staleness/invalidação.", "Conecta ao Supabase.", "Mede latência de produção."], "correctIndex": 0, "explanation": "O resultado é local e a fonte é memória do processo." },
      { "question": "Por que limitar fallback ao banco?", "options": ["Sem controle, muitas falhas de cache podem sobrecarregar a fonte.", "Porque cache miss nunca consulta o banco.", "Porque Redis é a única fonte persistente."], "correctIndex": 0, "explanation": "Retries e concorrência precisam de limite em incidentes." }
    ],
    "summary": [
      "Cache miss consulta fonte; hit pode evitar leitura; TTL limita duração da cópia.",
      "Use key versionada, escopo correto e dados minimizados.",
      "Após commit no PostgreSQL, invalide; falhas de cache e DB têm tratamentos diferentes.",
      "O fallback deve ser limitado para evitar cascata; medir antes/depois com perfil controlado.",
      "A prática usa Map fictícia e não mede API nem toca banco remoto."
    ]
  },
  "delivery-redis-rate-limit": {
    "prerequisites": "Concluir `delivery-redis-foundations`, `delivery-api-abuse` e `delivery-http`; saber request/response, status HTTP e diferenciar IP observado de identidade autenticada.",
    "setup": "Na pasta `labs/backend-layers`, siga o README até preparar `.env` e instalar dependências (`npm.cmd ci` no Windows; `npm ci` em macOS/Linux). Inicie os containers com `docker compose up -d --wait`; Redis fica em `127.0.0.1:56380`, sem volume. No PowerShell, defina `$env:RUN_REDIS_INTEGRATION = '1'`, execute `npm.cmd run test:redis` e depois `Remove-Item Env:RUN_REDIS_INTEGRATION`; em macOS/Linux, execute `RUN_REDIS_INTEGRATION=1 npm run test:redis`. Saída esperada: um teste aprovado que permite três `POST`, recusa o quarto com `429`/`Retry-After`, mantém as gravações em três e, após desconexão do cliente Redis, retorna `503` sem gravação adicional. Variações em `X-Forwarded-For` não mudam a identidade observada. O teste usa servidor HTTP e Redis reais, identidade por IP local e serviço de gravação fictício; não usa Postgres, Preview ou carga. Sem Docker, execute `npm test` para verificar a política e as respostas com doubles; marque a conexão Redis real como não executada.",
    "why": "Rate limiting limita volume/frequência, enquanto limite por corpo controla o custo de uma chamada. Redis pode compartilhar contadores entre instâncias; algoritmo, chave, privacidade, atomicidade e modo de falha precisam ser decisões explícitas. A API local não autentica contas, então a prática usa IP observado e ensina por que isso não é quota por conta.",
    "example": {
      "language": "text",
      "code": "JANELA FIXA DO LABORATÓRIO: máximo 3 gravações em 60 segundos\nPOST /api/estudos → IP observado pelo socket → key rate:v1:backend-layers:write:<IP>\nEVAL fixed-window.lua → allowed, count, TTL\ncount > 3 → HTTP 429 + Retry-After\nRedis indisponível → HTTP 503 antes de gravar\n\nA API não autentica contas, não confia em X-Forwarded-For e não registra IP em log.",
      "expected": "As três primeiras gravações chegam ao serviço, a quarta recebe 429 com Retry-After e nenhuma gravação ocorre; outra key começa em 1. A política 3/60 é didática, não recomendação de produção.",
      "explanation": [
        "Janela fixa agrupa operações em intervalos; é simples, mas buckets alinhados podem permitir rajadas perto da troca de janela. Janela deslizante conta período móvel com maior custo; token bucket permite rajadas limitadas e controla taxa média.",
        "INCR seguido de EXPIRE em comandos separados pode deixar contador sem expiração se a aplicação parar entre eles. Lua executa a lógica como uma unidade atômica no Redis; chaves com TTL são removidas após janela.",
        "Key por conta/tenant limita quota de negócio; IP pode ser sinal suplementar, mas NAT e rotação afetam pessoas e proxy headers precisam de origem confiável. Não armazene IP bruto sem necessidade/retention; pseudonimizar também exige avaliar reidentificação.",
        "Redis pode expulsar ou perder contador; indisponibilidade e fail-open podem abrir limite, enquanto fail-closed pode interromper uso. Escolha por rota e dano, timeout e métrica.",
        "O script CLI demonstra o contador; `labs/backend-layers` agora também liga o mesmo Lua a `POST` HTTP com o cliente `node-redis`. O teste real usa Redis local e serviço de gravação fictício; não mede capacidade nem prova configuração de proxy/conta."
      ]
    },
    "sections": [
      {
        "title": "Escolha algoritmo e política com um fluxo real",
        "paragraphs": [
          "Uma janela fixa conta até N ações na janela; é simples e barata, mas fronteiras adjacentes podem deixar uma rajada maior do que N em intervalo curto. Janela deslizante aproxima limite temporal mais uniforme à custa de estado/cálculo. Token bucket repõe tokens com o tempo e permite rajada limitada; escolha com base em UX, custo e consequência de abuso.",
          "Limite por requisição (bytes, página, timeout) protege uma chamada pesada; quota por pessoa/tenant controla consumo acumulado; concorrência limita operações simultâneas. Esses controles se somam e nenhum substitui autorização. O endpoint responde 429 quando a política de taxa rejeita e pode fornecer Retry-After. `413` continua sendo corpo excessivo, não rate limit.",
          "Cada regra precisa dizer endpoint/operação, identidade, janela, contagem de tentativas (inclusive inválidas ou só aprovadas), limite, reset, retry legítimo, observabilidade e efeito do bloqueio. Não copie números arbitrários; veja custo e comportamento esperado.",
          "Pausa: um pedido único consulta 200 mil linhas; outra pessoa faz 300 pedidos leves por minuto. Qual limite controla cada cenário?"
        ],
        "terms": [
          { "term": "Janela fixa", "meaning": "Contador que vale para um intervalo delimitado e reinicia ao expirar/virar bucket." },
          { "term": "Janela deslizante", "meaning": "Contagem ou aproximação sobre intervalo que avança com o tempo, reduzindo rajada em fronteiras." },
          { "term": "Token bucket", "meaning": "Algoritmo com capacidade de tokens que se repõem ao longo do tempo e limitam taxa/rajada." },
          { "term": "429 Too Many Requests", "meaning": "Status HTTP para recusa por excesso de requisições segundo a política aplicada." }
        ]
      },
      {
        "title": "Mantenha contador e expiração atômicos",
        "paragraphs": [
          "O script `fixed-window.lua` incrementa key, configura expiração na primeira chamada, lê TTL e devolve `allowed`/`limited`. Como a lógica roda em um script, outro pedido Redis não se intercala entre leitura, decisão e gravação. A janela desta demonstração começa no primeiro hit; não é o mesmo que bucket alinhado ao relógio.",
          "Um contador precisa de TTL para evitar chaves permanentes. Se operação limitada continua incrementando, a contagem passa do limite até expirar; outras políticas podem parar de incrementar após negar para economizar. Escolha key e comportamento conscientemente. Prefixo `rate:v1` permite trocar formato; use id de conta pseudônimo e não inclua token de sessão.",
          "`labs/backend-layers/src/rate-limiter-redis.cjs` usa `node-redis`, um tempo máximo por comando e fila offline desativada. Ele executa o Lua compartilhado com o laboratório, transforma a decisão em dados verificáveis e devolve o TTL para o cabeçalho `Retry-After`. A rota confere o limite antes de ler o corpo e só chama o serviço de gravação quando Redis permite.",
          "A política testada limita três tentativas por 60 segundos; até pedidos inválidos contam porque o limitador roda primeiro. Redis 8.8 também tem comandos de limite, mas Lua foi mantido para reutilizar o exemplo e observar a unidade atômica.",
          "Pausa: se `INCR` funcionar mas `EXPIRE` não rodar, qual risco aparece? Como uma execução atômica evita essa lacuna?"
        ],
        "terms": [
          { "term": "Atomicidade", "meaning": "Execução observada como uma operação única em relação a outros comandos concorrentes." },
          { "term": "Contador distribuído", "meaning": "Contador compartilhado em armazenamento central para várias instâncias da mesma API." },
          { "term": "Chave pseudônima", "meaning": "Identificador de controle que não expõe diretamente nome/email e cuja reversibilidade/risco ainda deve ser avaliada." }
        ]
      },
      {
        "title": "Defina identidade, privacidade e indisponibilidade",
        "paragraphs": [
          "A API do laboratório não autentica usuário e escuta somente em `127.0.0.1`; os pedidos deste exercício chegam como loopback. Ela usa `req.socket.remoteAddress` observado pelo servidor para uma proteção local grosseira e ignora `X-Forwarded-For` enviado pelo cliente. Isso não prova quota por conta: NAT pode juntar pessoas legítimas e um atacante pode distribuir origens. Em endpoint autenticado, a key de conta deve vir da sessão validada no servidor; nunca aceite ID de usuário no corpo como identidade confiável.",
          "A key de demonstração contém o IP observado e tem TTL de no máximo 60 segundos; Redis local desativa persistência e a API não registra o IP. Isso reduz retenção, mas não torna o endereço anônimo. Uma publicação atrás de proxy precisa configurar quais proxies são confiáveis antes de usar qualquer cabeçalho de origem.",
          "A aplicação escolhe fail-closed para gravações: Redis fora do ar ou timeout devolve `503` genérico antes de iniciar a operação; `GET` continua disponível. O cliente usa timeout de conexão/comando e não enfileira comandos enquanto está offline. O modo didático `start:memory` usa um contador só do processo e não é equivalente a Redis compartilhado.",
          "A política noeviction do container faz gravações falharem quando memória atinge máximo. Se a aplicação ignorar erro e permitir chamada, o limitador pode falhar aberto; se negar sempre, o usuário legítimo pode ficar bloqueado. Monitore erro e decida antes do incidente.",
          "Pausa: Redis cai em endpoint de convite que envia email faturado. Especifique resultado, status e alerta sem revelar se endereço de uma pessoa existe."
        ],
        "terms": [
          { "term": "NAT", "meaning": "Tradução de rede que pode fazer pessoas diferentes compartilharem um mesmo IP público." },
          { "term": "Circuit breaker", "meaning": "Controle que suspende chamadas repetidas a uma dependência que falha, permitindo recuperação e fallback definido." },
          { "term": "Fail-open / fail-closed", "meaning": "Política para permitir ou recusar operação quando o mecanismo de limite não responde." }
        ]
      },
      {
        "title": "Verifique a regra sem gerar carga",
        "paragraphs": [
          "Execute `RUN_REDIS_INTEGRATION=1 npm run test:redis` (no PowerShell, defina e depois remova `$env:RUN_REDIS_INTEGRATION`). O teste confirma o script no Redis real, keys separadas, respostas `201`/`429`, `Retry-After`, nenhuma gravação recusada e que mudar `X-Forwarded-For` não muda o IP observado. O serviço de gravação é fictício; não há escrita no Postgres.",
          "`npm test` verifica casos determinísticos de janela, expiração, resposta inválida, Redis não pronto, falha fechada `503` e rotas HTTP usando doubles. `npm run test:redis` verifica a integração local real; a CI também roda essa integração com Redis descartável. Nenhum teste simula proxy confiável, autenticação de conta, eviction ou serviço de produção.",
          "A medição de latência/custo antes e depois é uma prioridade separada da Fase 7.4. Não faça flood, stress test nem carga no Preview público; quando medir, compare a mesma operação e conjunto de dados num ambiente isolado e registre p50/p95, memória, decisões e custo.",
          "Pausa: qual evidência o script fornece e qual evidência só integração HTTP pode fornecer?"
        ],
        "terms": [
          { "term": "Retry-After", "meaning": "Cabeçalho HTTP que orienta quando tentar novamente após uma recusa temporária." },
          { "term": "Teste determinístico", "meaning": "Teste com entradas e estado controlados que gera resultado repetível sem carga ou serviço externo." },
          { "term": "Métrica p50/p95", "meaning": "Medidas de latência mediana e da cauda de 95% das observações." }
        ]
      }
    ],
    "diagramTitle": "Da requisição à decisão distribuída",
    "diagram": "API local sem login → socket.remoteAddress observado → key Redis com TTL curto\n                                      │\n                                      ├── permitido → continua validação e gravação\n                                      └── acima → 429 + Retry-After; sem gravação\n\nRedis indisponível → 503 fail-closed; GET continua disponível\nConta autenticada em sistema futuro → identidade somente da sessão validada",
    "guided": [
      { "instruction": "Execute `node check-rate-limit.cjs` e `RUN_REDIS_INTEGRATION=1 npm run test:redis`; no Windows, use `$env:RUN_REDIS_INTEGRATION = '1'` e `npm.cmd run test:redis`. Compare a resposta CLI com a resposta HTTP.", "result": "O script mostra 3 allowed e 1 limited; a API permite três pedidos e responde 429 + Retry-After ao quarto, sem chamar o serviço de gravação." },
      { "instruction": "Abra `fixed-window.lua` e explique por que expiração só é definida quando count é 1.", "result": "As próximas chamadas não estendem a janela; TTL é contado desde o primeiro incremento e a key expira." },
      { "instruction": "Desenhe a resposta de excesso e desligue Redis depois de iniciar a API; observe uma gravação e um GET.", "result": "Excesso retorna 429 com Retry-After sem gravar; Redis indisponível retorna 503 genérico antes de gravar; GET continua disponível. Pare a API antes de encerrar o container." }
    ],
    "mistakes": [
      "Chamar o script CLI de middleware HTTP completo.",
      "Confundir rate limit por IP observado com quota por conta autenticada ou confiar em X-Forwarded-For não higienizado.",
      "Executar INCR e EXPIRE separadamente e ignorar corrida/TTL ausente.",
      "Tratar janela fixa como se eliminasse rajada nas fronteiras.",
      "Repetir indefinidamente quando Redis cai ou ignorar erro de memória.",
      "Colocar token, email ou IP bruto na key sem regra de minimização/retention.",
      "Fazer carga no Preview público como substituto de teste de política local."
    ],
    "exercises": [
      {
        "prompt": "Prever: limite 3 por key com janela iniciada no primeiro pedido. Registre resultados para quatro chamadas seguidas e outra identidade; depois explique a consequência quando o TTL expira.",
        "expected": "Mesma key: allowed 1/2/3 e limited 4. Outra key começa allowed 1. Após expiração, primeira chamada cria contador novo; a janela fixa tem comportamento próprio nas fronteiras.",
        "criteria": ["Prevê as quatro respostas da key inicial.", "Mantém contador independente para segunda identidade.", "Relaciona expiração a reinício do contador.", "Não chama isso janela deslizante."],
        "solution": "Execute `node check-rate-limit.cjs`. A key A atinge contagem 4 e devolve limited; a key B começa em 1. Depois do TTL, Redis remove key A e ela começa uma janela novamente; não é uma contagem contínua de últimos 60 segundos.",
        "explanation": "Contador TTL simples implementa janela fixa ancorada no primeiro pedido.",
        "hints": ["Qual é o limite numérico?", "As keys de A e B são iguais?", "O script renova o TTL em todo request?"]
      },
      {
        "prompt": "Alterar: uma chave atual é `rate:<email>:reset-password`. Proponha namespace/versionamento e uma identidade pseudônima segura, mais regra para um sinal IP opcional; não use valores reais.",
        "expected": "A key não contém email/token, usa versão e identificador interno mínimo; IP é separado e derivado apenas de proxy confiável com retenção curta e política explícita.",
        "criteria": ["Remove email/credenciais da key.", "Mantém escopo/versão claros.", "Não confia em cabeçalho arbitrário de proxy.", "Explica que hash de IP também pode correlacionar pessoa."],
        "solution": "Exemplo: `rate:v1:recovery:account:<id-opaco>` e, como dimensão auxiliar, `rate:v1:recovery:trusted-ip:<digest-rotativo>`. O servidor valida sessão/proxy; define retenção e não registra o endereço bruto; não mistura as duas quotas.",
        "explanation": "Rate limit precisa de identidade útil sem transformar chave Redis em repositório de PII.",
        "hints": ["Quem gera o identificador confiável?", "O IP vem de qual proxy?", "Que retenção está definida?"]
      },
      {
        "prompt": "Construir: escreva uma política para três convites por conta a cada 60 segundos, com quota secundária por IP confiável. Inclua algoritmo, keys fictícias, status, Retry-After, teste A/B e resposta se Redis falhar.",
        "expected": "A política define janela e contagem, keys independentes por dimensão, 429 e TTL para orientação, teste que permite quota e recusa excesso sem envio, e fail-open/closed com justificativa/alerta.",
        "criteria": ["Define conta, IP confiável, janela e limite sem valor real.", "Diferencia 429 de 400/413.", "Inclui teste positivo, negativo e ausência de side effect ao negar.", "Escolhe modo de falha por risco e mede indisponibilidade."],
        "solution": "Conta `rate:v1:invite:account:<id-opaco>`: três por 60s; origem IP só do proxy confiável em key separada; se qualquer quota excede, API retorna 429 com Retry-After calculado do TTL e nenhum convite é enviado. Teste A1-A3 permitidos, A4 negado, conta B ainda permitida e IP compartilhado observado. Redis indisponível: escolher recusa temporária para envio faturável, alerta e retry limitado; revisar impacto em conta legítima.",
        "explanation": "As quotas protegem tanto fluxo de negócio quanto rede sem confundir autorização com frequência.",
        "hints": ["A ação externa acontece antes ou depois da decisão?", "Como uma segunda conta prova isolamento?", "Qual é o custo de falhar aberto para email?"]
      },
      {
        "prompt": "Investigar erro: usuários recebem 429 depois de mudança de proxy; Redis também está próximo do limite de memória. Registre hipótese, métrica e ação inicial sem apagar contador nem gerar carga remota.",
        "expected": "Verifica IP vindo do proxy confiável, NAT, quota por conta, janela/TTL, evictions/OOM e contadores; preserva evidência, não remove chaves em massa e escolhe contenção controlada/fail-mode documentado.",
        "criteria": ["Distingue falso 429 de regra de quota real.", "Inspeciona confiança do proxy e dimensão do contador.", "Verifica memória/eviction e TTL.", "Evita reset geral ou teste público de carga."],
        "solution": "Compare eventos agregados por endpoint/conta/key class, status, TTL e horário; confirme configuração do proxy e compartilhamento NAT. Examine `INFO memory`, eviction e erro de gravação. Preserve counters, ajuste só regra comprovadamente incorreta e limite retry/indisponibilidade sem flood público.",
        "explanation": "Resetar todos os contadores esconderia a causa e poderia liberar abuso; inspeção deve separar regra, proxy e falha Redis.",
        "hints": ["O contador é por IP, conta ou tenant?", "A origem do X-Forwarded-For é confiável?", "Redis recusou escrita por memória ou expulsou keys?"]
      }
    ],
    "quiz": [
      { "question": "Qual risco janela fixa apresenta perto da fronteira?", "options": ["Pode permitir rajadas em intervalos adjacentes.", "Nunca expira.", "Substitui autorização."], "correctIndex": 0, "explanation": "Um bucket pode terminar e outro começar com pouco tempo entre chamadas." },
      { "question": "Por que script Lua é usado no exemplo?", "options": ["Para fazer incremento e TTL/decisão em uma execução atômica.", "Para ocultar token no código.", "Para transformar redis-cli em servidor HTTP."], "correctIndex": 0, "explanation": "A atomização evita interleaving entre operações que compõem o contador." },
      { "question": "O que a API do laboratório faz quando o quarto POST excede o limite?", "options": ["Responde 429 com Retry-After e não chama o serviço de gravação.", "Responde 201 e zera o contador.", "Confia no X-Forwarded-For enviado pelo navegador."], "correctIndex": 0, "explanation": "O middleware HTTP consulta o contador Redis antes de ler o corpo e só continua quando permitido." },
      { "question": "Que cuidado há com chave por IP?", "options": ["NAT/rotação afetam justiça e cabeçalho de proxy deve ser confiável.", "IP nunca pode identificar uma pessoa.", "Hash simples elimina necessidade de privacidade."], "correctIndex": 0, "explanation": "Endereço pode ser dado correlacionável e uma origem compartilhada afeta vários usuários." }
    ],
    "summary": [
      "Escolha janela/algoritmo por regra e custo; 429 comunica excesso na camada HTTP.",
      "Contador e expiração precisam ser coerentes e ter TTL; Lua é atômico no exemplo.",
      "O laboratório limita por IP observado porque não autentica contas; isso não substitui quota por identidade validada.",
      "Defina fail-open/closed, timeout, memória, eviction e alerta por endpoint.",
      "Com Redis disponível, `npm run test:redis` verifica a integração HTTP real: 429 sem gravação após o limite e 503 sem gravação após desconectar o cliente. Isso não mede desempenho nem comprova identidade de conta, proxy confiável ou disponibilidade de produção."
    ]
  },
  "delivery-requirements": {
    "prerequisites": "Concluir setup-node, delivery-forms e delivery-ci; ter a lista de estudos do laboratório e saber alterar funções e testes. O exemplo usa apenas Node.",
    "setup": "Na pasta da aula, salve o exemplo como requisito.js no editor. No terminal aberto nessa pasta, execute node requisito.js; a saída esperada é false e true em linhas separadas. O processo termina sozinho; para retomar, execute o mesmo comando. Se node não for reconhecido, revise setup-node. Use a lista de estudos da aula delivery-forms para planejar a integração, mas este arquivo não altera server.js. Escreva critérios antes de editar o projeto.",
    "why": "O trabalho raramente é criar tudo do zero com enunciado fechado. Saber traduzir um pedido, preservar o que já funciona e comunicar a entrega é uma competência central de entrada no mercado.",
    "sections": [
      {
        "title": "Da frase vaga ao comportamento observável",
        "paragraphs": [
          "“Melhore os títulos duplicados” não diz se espaços contam, se maiúsculas diferem, se o usuário recebe mensagem ou se dados antigos devem ser migrados. Transforme o pedido em exemplos: com HTML salvo, “  html  ” deve ser recusado; CSS deve ser aceito; título vazio continua recusado. Pergunte como tratar acentos e nomes iguais em contas diferentes antes de inventar regras. Cada exemplo vira critério de aceitação que alguém consegue verificar.",
          "Distinguir hipótese de decisão é importante. Escreva “assumi comparação sem diferenciar maiúsculas após trim; confirmar tratamento de acentos” quando a resposta ainda não veio. Evite escopo escondido: não reescreva toda a lista para resolver uma regra pequena. Encontre a função, o teste, a API e a mensagem que dependem do comportamento; faça um mapa de impacto antes de editar.",
          "Pausa: antes de executar, escreva o resultado esperado para HTML salvo com entrada '  html  ', para CSS novo e para título composto só de espaços."
        ]
      },
      {
        "title": "Implementar sem quebrar o projeto",
        "paragraphs": [
          "O exemplo normaliza títulos com trim e letras minúsculas e compara com alguns registros existentes. Ele retorna booleano e não grava dados; por isso é fácil de testar. Em uma aplicação real, a regra também deve existir no servidor se registros são compartilhados. Dois clientes podem tentar salvar simultaneamente: uma checagem só no navegador não garante unicidade. O banco ou serviço pode precisar de uma restrição adicional.",
          "Antes da mudança, rode os testes existentes e registre o resultado. Faça a menor alteração compreensível. Adicione casos de “HTML” versus “ html ”, título novo, vazio e lista vazia. Depois teste o fluxo da interface e o comportamento da API. Se a solução exigir mudar contrato, comunique isso antes de considerar a tarefa encerrada.",
          "Pausa: marque no mapa de impacto o que o arquivo requisito.js verifica e o que ainda precisaria mudar no server.js para impedir duplicados em uma API compartilhada."
        ]
      },
      {
        "title": "Revisão e comunicação",
        "paragraphs": [
          "Uma alteração pequena facilita revisar o diff. Descreva o problema, a regra adotada, o resultado visível e a evidência: comandos de teste e comportamento observado no navegador. Em equipe, uma pull request ou revisão pode apontar defeitos de nomenclatura, acessibilidade ou casos não pensados. Receba a observação como informação sobre o código e explique suas decisões com exemplos verificáveis.",
          "Se descobrir uma dependência inesperada, informe cedo: “a API aceita duplicados, então a regra só no frontend pode ser contornada; preciso da mudança no endpoint”. Não esconda limitações sob uma interface polida. Um profissional júnior confiável torna riscos visíveis, pede contexto específico e entrega uma mudança que outra pessoa consegue entender e manter.",
          "Pausa: escreva duas linhas de revisão: uma decisão tomada para comparar títulos e uma pendência que impediria dizer que a API já foi atualizada."
        ]
      },
      {
        "title": "README que permite reproduzir",
        "paragraphs": [
          "Um projeto de portfólio deve começar com o problema que resolve e o que a pessoa pode testar. Documente tecnologias, pré-requisitos, comandos exatos de execução e teste, configuração pública, dependência de API, dados de demonstração, critérios de aceitação e limitações. Inclua captura ou link quando houver publicação real, mas nunca invente uma URL. Uma pessoa avaliadora deve conseguir iniciar o projeto sem adivinhar passos.",
          "Explique decisões técnicas de forma simples: por que normalizou títulos, como tratou erro de rede, que teste cobre regressão e qual parte ainda precisa de backend. Escreva “dados ficam só em memória e somem ao reiniciar” se for verdade. Honestidade técnica comunica maturidade melhor que chamar um mock de sistema completo.",
          "Pausa: confira cada afirmação do README contra um arquivo ou comando executado. Marque como planejada a regra de duplicados na API até ela existir e ser testada."
        ]
      },
      {
        "title": "Avaliar autonomia",
        "paragraphs": [
          "Depois de concluir o exemplo, receba uma mudança nova que não esteja na solução: ordenar por data, limitar comprimento ou permitir desfazer exclusão. Escreva critérios, estime arquivos afetados, implemente, teste e apresente. Conseguir transferir o método a uma regra diferente é evidência mais forte de aprendizagem que copiar a resposta. Guarde antes e depois e descreva um defeito que encontrou e corrigiu.",
          "Avalie o trabalho por requisitos atendidos, clareza do código, testes relevantes, acessibilidade, comportamento de falha, documentação e capacidade de explicar trade-offs. Não é necessário usar muitas tecnologias para ter um projeto de portfólio bom. É necessário que a pessoa consiga demonstrar uma entrega reproduzível, reconhecer seus limites e manter o que construiu."
        ]
      }
    ],
    "example": {
      "language": "js",
      "code": "// Salve como requisito.js e rode: node requisito.js\nfunction podeAdicionar(lista, novoTitulo) {\n  const normalizar = valor => valor.trim().toLocaleLowerCase('pt-BR');\n  const novo = normalizar(novoTitulo);\n  return novo.length > 0 && !lista.some(item => normalizar(item.titulo) === novo);\n}\nconsole.log(podeAdicionar([{titulo:'HTML'}], '  html  ')); // false\nconsole.log(podeAdicionar([{titulo:'HTML'}], 'CSS'));      // true\n",
      "explanation": [
        "A função normaliza antes de comparar e mantém a lista intacta.",
        "O retorno booleano expressa um critério verificável.",
        "Uma API compartilhada precisaria aplicar a regra também no servidor."
      ],
      "expected": "Duas linhas: false e true."
    },
    "guided": [
      {
        "instruction": "Execute o exemplo e explique por que “  html  ” é recusado.",
        "result": "trim remove espaços e toLocaleLowerCase iguala a capitalização."
      },
      {
        "instruction": "Teste podeAdicionar([], \"HTML\").",
        "result": "true, pois não há duplicata."
      },
      {
        "instruction": "Escreva um critério para o caso vazio.",
        "result": "Título composto só de espaços deve ser recusado e nenhum registro criado."
      }
    ],
    "exercises": [
      {
        "prompt": "Prever: antes de executar, indique o resultado de HTML salvo com entrada ' html ' e de CSS novo. Depois escreva dois testes independentes. Aceite: primeira entrada → false; segunda → true; testes sem falhas.",
        "hints": [
          "Use os exemplos do código.",
          "Compare com false e true."
        ],
        "solution": "console.assert(podeAdicionar([{titulo:'HTML'}], ' html ') === false); console.assert(podeAdicionar([{titulo:'HTML'}], 'CSS') === true);",
        "explanation": "Testes fazem os exemplos de aceitação executáveis.",
        "expected": "Nenhuma falha no Console.",
        "criteria": ["Testes independentes cobrem HTML normalizado e CSS novo.","Resultados são comparados com os critérios sem erro no Console."]
      },
      {
        "prompt": "Alterar: amplie os critérios de aceitação para lista vazia e título só de espaços. Aceite: cada critério traz contexto, ação e resultado visível; entrada lista vazia e HTML → um registro; entrada '   ' → mensagem e lista inalterada.",
        "hints": [
          "Um caso deve aceitar e o outro recusar.",
          "Inclua resultado visível da interface."
        ],
        "solution": "Dada lista vazia, quando adiciono HTML, então um registro HTML aparece. Dado título “   ”, quando tento salvar, então vejo mensagem de validação e a lista não muda.",
        "explanation": "Critérios usam contexto, ação e resultado observável.",
        "expected": "Dois critérios verificáveis.",
        "criteria": ["Cada requisito inclui contexto, ação e resultado visível.","Espaços não criam registro e lista vazia mantém o comportamento definido."]
      },
      {
        "prompt": "Construir: acrescente à regra isolada um limite de 60 caracteres após trim, preservando recusa de duplicados. Aceite: entrada de 60 caracteres únicos → true; 61 caracteres ou título duplicado → false. Explique que a API ainda precisa da mesma validação.",
        "hints": [
          "Valide comprimento antes de consultar a lista.",
          "Use a regra anterior para comparação."
        ],
        "solution": "function podeAdicionarComLimite(lista,titulo){const limpo=titulo.trim();return limpo.length>0 && limpo.length\u003c=60 && podeAdicionar(lista,limpo);}",
        "explanation": "Pressupõe string, como o contrato do formulário; a API deve validar tipo e limite também.",
        "expected": "61 caracteres rejeitados, 60 aceitos se únicos.",
        "criteria": ["Limite é aplicado após trim e junto com duplicidade.","Testes cobrem limites, entrada duplicada e a validação ainda ausente na API."]
      },
      {
        "prompt": "Investigar erro: o README diz que o servidor já recusa duplicados, mas server.js da aula delivery-forms ainda aceita. Revise o README para separar comportamento comprovado e regra planejada. Aceite: comandos existentes, persistência em memória e pendência da API explícitos; entrada dois POSTs com HTML → duplicata ainda possível no servidor anterior.",
        "hints": [
          "Diga comandos exatos.",
          "Não prometa banco se houver só memória."
        ],
        "solution": "# Lista de estudos\nExecute: node server.js; abra http://127.0.0.1:4178/.\nVerifique a regra isolada: node requisito.js imprime false e true.\nDados: memória do servidor; reiniciar apaga os registros.\nPendente: integrar a recusa de duplicados ao server.js e testá-la pela API. O servidor anterior ainda aceita títulos repetidos.\nLimite: sem autenticação ou banco; projeto demonstrativo.",
        "explanation": "Comandos e afirmações devem corresponder aos arquivos realmente executados; revise o README após integrar e testar a API.",
        "expected": "Outra pessoa consegue executar e sabe que a regra de duplicados ainda não protege o servidor.",
        "criteria": ["README distingue comportamento implementado de requisito planejado.","Comandos, persistência em memória e lacuna de duplicidade podem ser reproduzidos."]
      }
    ],
    "mistakes": [
      "Implementar uma suposição não acordada como se fosse requisito confirmado.",
      "Testar só a nova regra e deixar regressões do fluxo antigo.",
      "Chamar demonstração local de aplicação com persistência real.",
      "Entregar sem instrução de execução e sem registrar limitações."
    ],
    "quiz": [
      {
        "question": "Qual critério é observável?",
        "options": [
          "Melhorar a qualidade dos títulos.",
          "Com HTML salvo, “ html ” é recusado e a lista permanece igual.",
          "Usar código moderno."
        ],
        "correctIndex": 1,
        "explanation": "O critério descreve entrada, ação e resultado."
      },
      {
        "question": "Por que a API precisa validar duplicatas em sistema compartilhado?",
        "options": [
          "Porque a interface sempre tem razão.",
          "Porque outros clientes podem enviar e duas gravações podem concorrer.",
          "Para substituir o README."
        ],
        "correctIndex": 1,
        "explanation": "Regra de integridade não pode depender só do navegador."
      },
      {
        "question": "O que torna um README útil ao avaliador?",
        "options": [
          "Comandos reais, comportamento, limites e verificações.",
          "Apenas uma imagem bonita.",
          "Uma promessa de funcionalidades ainda não implementadas."
        ],
        "correctIndex": 0,
        "explanation": "Documentação permite reproduzir e avaliar a entrega."
      }
    ],
    "summary": [
      "Converta pedidos em critérios concretos e declare hipóteses.",
      "Preserve comportamento antigo com testes e revisão do impacto.",
      "Documente execução, evidência e limites para o portfólio."
    ]
  },
  "delivery-web-foundations": {
    "prerequisites": "Saber abrir uma URL no navegador. Não exige conta, compra de domínio ou instalação.",
    "setup": "Nenhuma ferramenta nova. Use os diagramas e cenários fictícios desta aula; não altere um domínio real.",
    "why": "Quando um site falha, é preciso separar registro do domínio, resolução DNS, hospedagem e aplicação para investigar o ponto certo sem mudar configurações ao acaso.",
    "example": {
      "language": "text",
      "code": "Pessoa → navegador → DNS → endereço do serviço → hospedagem → resposta HTTP\n\nDomínio: exemplo.test\nRegistrador: mantém o registro do nome\nProvedor DNS: publica os registros do domínio\nHospedagem: entrega arquivos e/ou executa a aplicação\nCDN: distribui cópias de conteúdo por pontos de presença",
      "expected": "O DNS ajuda o navegador a localizar um destino; depois o navegador faz uma requisição HTTP. Registrar o nome, hospedar a zona DNS e servir o site são papéis diferentes, mesmo quando uma empresa oferece mais de um deles.",
      "explanation": [
        "O navegador começa com um nome legível, mas precisa localizar o destino de rede antes de pedir a página.",
        "Registrador, provedor DNS e hospedagem podem pertencer a empresas diferentes. A pessoa que registra o domínio é chamada registrante.",
        "Uma região descreve uma localização de processamento ou dados. Uma CDN pode servir conteúdo de pontos distribuídos; isso não significa que toda regra ou banco esteja duplicado neles.",
        "Se o DNS resolve, mas a hospedagem não tem o domínio associado ao projeto, a resolução pode funcionar enquanto a aplicação ainda mostra erro."
      ]
    },
    "sections": [
      {
        "title": "Da URL ao pedido HTTP",
        "paragraphs": [
          "Uma URL reúne partes como esquema (http ou https), nome do host, caminho e, às vezes, porta e consulta. Antes de pedir /aulas, o navegador precisa descobrir como alcançar o host. DNS resolve nomes; HTTP transporta o pedido e a resposta da aplicação. Resolver o nome não garante que o serviço esteja funcionando.",
          "Pausa: olhando o diagrama, preveja qual etapa acontece primeiro: consultar DNS ou pedir o HTML por HTTP. Depois explique o que ainda pode falhar mesmo quando há resposta DNS."
        ],
        "diagramTitle": "Duas etapas distintas ao abrir uma página",
        "diagram": "1. navegador ── consulta do nome ──▶ DNS\n2. navegador ◀─ endereço/resposta ── DNS\n3. navegador ── pedido HTTP para o host ──▶ hospedagem\n4. navegador ◀─ status + conteúdo ── hospedagem\nDNS localiza; HTTP conversa com o serviço."
      },
      {
        "title": "Domínio, registrador e provedor DNS",
        "paragraphs": [
          "O domínio é o nome registrado, por exemplo, um nome fictício terminado em .test. O registrador administra o registro com o operador da extensão. A pessoa ou organização que o registra é a registrante. O provedor DNS hospeda os registros que dizem como aquele domínio deve ser localizado. Esses papéis podem ser comprados juntos, mas são operações distintas.",
          "Não confunda painel do registrador com painel de DNS: mudar os servidores autoritativos delegados pelo domínio pode trocar quem responde pela zona. Antes de alterar nameservers, inventarie registros existentes, inclusive os usados por e-mail."
        ],
        "terms": [
          { "term": "Registrador", "meaning": "Empresa credenciada ou revendedora que intermedeia o registro de um nome de domínio." },
          { "term": "Provedor DNS", "meaning": "Serviço que hospeda e responde pelos registros DNS autoritativos de uma zona." },
          { "term": "Hospedagem", "meaning": "Serviço que entrega arquivos ou executa código para responder às requisições da aplicação." }
        ]
      },
      {
        "title": "Hospedagem, região e CDN",
        "paragraphs": [
          "Hospedagem é onde os arquivos do site ou o código do servidor ficam disponíveis. Uma região indica onde certa computação ou dados são processados. Uma CDN distribui conteúdo por uma rede de pontos de presença; arquivos estáticos podem ser entregues perto da pessoa visitante. Isso não move automaticamente o banco para a mesma região nem torna cada requisição instantânea.",
          "Pausa: uma página está lenta e o HTML vem de uma CDN, mas a API consulta um banco distante. Preveja qual trecho ainda pode dominar a demora e desenhe a chamada separadamente."
        ]
      },
      {
        "title": "Investigar por camada",
        "paragraphs": [
          "Ao diagnosticar, separe: o nome foi digitado certo? o DNS responde com o destino esperado? o projeto de hospedagem conhece esse domínio? o servidor responde? a aplicação consegue acessar seus dados? Anote a observação e o resultado esperado antes de mudar uma configuração.",
          "Uma página de erro não prova por si só que o DNS falhou. Da mesma forma, um nome que resolve não prova que a aplicação, a API ou o banco estejam saudáveis. A evidência de cada camada aponta para o próximo teste."
        ]
      }
    ],
    "guided": [
      { "instruction": "Marque no exemplo o domínio, a etapa DNS, a hospedagem e a resposta HTTP.", "result": "O mapa mostra a resolução do nome antes da requisição à hospedagem." },
      { "instruction": "Troque apenas o registrador no cenário e mantenha o provedor DNS e a hospedagem. Diga que relação mudou e quais continuam iguais.", "result": "O registro do nome muda de administradora; os registros DNS e o destino do site permanecem configurados no cenário." },
      { "instruction": "Para uma falha fictícia, escreva uma observação por camada antes de propor uma mudança.", "result": "A hipótese fica vinculada a evidência observável em vez de alterar tudo ao mesmo tempo." }
    ],
    "mistakes": [
      "Achar que comprar um domínio também publica os arquivos do site.",
      "Tratar registrador e provedor DNS como necessariamente a mesma empresa.",
      "Concluir que a aplicação funciona porque o nome já resolve.",
      "Afirmar que uma CDN replica automaticamente o banco e o estado da aplicação."
    ],
    "exercises": [
      {
        "prompt": "Prever: indique a ordem das etapas ao abrir https://portal.example.test/aulas: DNS, pedido HTTP e resposta da hospedagem. Cite uma falha que ainda pode ocorrer depois de o DNS responder.",
        "expected": "O navegador resolve o host antes de enviar o pedido HTTP ao serviço; a hospedagem ou aplicação ainda pode não reconhecer o domínio ou retornar erro.",
        "criteria": ["A ordem distingue DNS de HTTP.", "A falha citada pertence a uma etapa posterior à resolução do nome."],
        "solution": "DNS resolve portal.example.test; o navegador envia o pedido HTTP para o endereço indicado; a hospedagem devolve uma resposta. O servidor pode não associar aquele host ao projeto.",
        "explanation": "A resolução fornece um destino; não valida a configuração nem o estado da aplicação.",
        "hints": ["Observe a seta entre o navegador e DNS.", "Pense no serviço que recebe o pedido depois que o navegador conhece o endereço."]
      },
      {
        "prompt": "Alterar: um site mantém o registrador atual, muda o provedor DNS e continua hospedado no mesmo serviço. Liste qual configuração deve ser copiada antes da troca e quais papéis não mudaram.",
        "expected": "A zona e seus registros necessários são inventariados antes da delegação; o nome continua registrado no mesmo registrador e os arquivos continuam na mesma hospedagem.",
        "criteria": ["O inventário precede a troca de nameservers.", "Registrador e hospedagem são identificados como inalterados."],
        "solution": "Registrar os registros existentes, inclusive e-mail e verificações; depois migrar a zona e validar a delegação. O registrador e a hospedagem permanecem os mesmos.",
        "explanation": "Ao trocar o DNS autoritativo, registros omitidos deixam de ser respondidos pelo provedor novo.",
        "hints": ["Uma zona DNS pode conter mais que o endereço do site.", "Separar as três empresas ajuda a localizar o impacto."]
      },
      {
        "prompt": "Construir: desenhe um mapa de responsáveis para um projeto fictício com o domínio aula.example.test, arquivos na Vercel e e-mail em outro serviço. Registre registrador, DNS, hospedagem e os registros que precisam ser preservados.",
        "expected": "O mapa aponta cada responsabilidade e lembra que registros de e-mail precisam continuar publicados no DNS autoritativo após uma mudança.",
        "criteria": ["Os quatro papéis são mapeados sem presumir que pertencem ao mesmo fornecedor.", "O e-mail aparece como dependência DNS a preservar."],
        "solution": "Registrador: empresa fictícia A; DNS: provedor B; hospedagem web: Vercel; e-mail: provedor C. Inventariar MX e os TXT de autenticação de e-mail antes de trocar a zona.",
        "explanation": "A escolha dos nomes é livre no cenário; a tarefa é explicitar responsabilidade e dependências.",
        "hints": ["Associe cada ação ao serviço que a executa.", "Liste os registros do e-mail antes de planejar a mudança DNS."]
      },
      {
        "prompt": "Investigar erro: `nslookup` retorna um endereço, mas o navegador mostra página de domínio não configurado. Escreva a observação, a hipótese mais próxima e o próximo teste sem mudar DNS.",
        "expected": "A evidência indica que houve resolução; o próximo teste verifica se o domínio está associado ao projeto de hospedagem e qual resposta HTTP ele retorna.",
        "criteria": ["Não atribui automaticamente a falha à ausência de DNS.", "Propõe testar associação do domínio e resposta do host."],
        "solution": "Registro: o resolvedor retornou um endereço. Hipótese: domínio não associado ao projeto ou implantação esperada. Conferir o painel do host e a resposta/status HTTP antes de alterar registros.",
        "explanation": "A camada DNS pode responder corretamente e ainda apontar para um serviço que não reconhece aquele host.",
        "hints": ["Separe o resultado de `nslookup` do conteúdo da página.", "Que sistema escolhe o projeto depois que a requisição chega ao endereço?"]
      }
    ],
    "quiz": [
      { "question": "O que o DNS faz primeiro ao visitar um domínio?", "options": ["Executa o JavaScript do site.", "Ajuda a localizar o destino associado ao nome.", "Registra o domínio em nome da pessoa."], "correctIndex": 1, "explanation": "A resolução de nomes localiza o destino; a aplicação é acessada em seguida." },
      { "question": "Qual afirmação sobre registrador e hospedagem é correta?", "options": ["São papéis distintos, mesmo quando a mesma empresa oferece ambos.", "Hospedagem sempre inclui registro de domínio.", "O registrador é o servidor que executa a API."], "correctIndex": 0, "explanation": "Registro do nome e entrega/execução do site são responsabilidades diferentes." }
    ],
    "summary": [
      "DNS localiza um destino; HTTP troca pedidos e respostas com um serviço.",
      "Registrador, provedor DNS e hospedagem são papéis separados.",
      "CDN, região e banco têm funções distintas; diagnostique cada camada com evidência."
    ]
  },
  "delivery-dns": {
    "prerequisites": "Concluir delivery-web-foundations. Não é necessário comprar um domínio ou alterar DNS real.",
    "setup": "Use a tabela de endereços reservados para documentação e o domínio example.test. O bloco IPv4 192.0.2.0/24 e o prefixo IPv6 2001:db8::/32 são reservados para exemplos; .test é reservado para testes. Nada disso é um destino público: não copie os valores para um projeto publicado.",
    "why": "Uma configuração DNS incorreta pode tirar um site ou e-mail do ar. Entender tipos de registro, cache e diagnóstico permite verificar instruções do provedor antes de aplicar mudanças.",
    "example": {
      "language": "text",
      "code": "A      @       192.0.2.10          TTL 300\nAAAA   @       2001:db8::10        TTL 300\nCNAME  www     site.example.test   TTL 300\nTXT    _prove  \"codigo-ficticio\"     TTL 300\n\nEXEMPLO DIDÁTICO: não é configuração de produção.",
      "expected": "A aponta para IPv4; AAAA, para IPv6; CNAME cria um alias para outro nome; TXT armazena texto usado, entre outros fins, em verificações. TTL 300 significa que caches podem manter a resposta pelo período definido antes de revalidar.",
      "explanation": [
        "A e AAAA guardam endereços IP nas famílias IPv4 e IPv6, respectivamente.",
        "CNAME aponta um nome para outro nome. O alvo precisa ter uma resolução própria.",
        "TXT publica um valor textual. Um provedor pode pedir um TXT de verificação, mas o conteúdo exato deve vir do painel atual.",
        "TTL orienta por quanto tempo uma resposta pode ficar em cache. Após uma mudança, diferentes resolvedores podem ter respostas antigas por tempos diferentes; não existe uma única barra de progresso global chamada propagação."
      ]
    },
    "sections": [
      {
        "title": "Quatro tipos de registro",
        "paragraphs": [
          "A associa um nome a um endereço IPv4; AAAA faz isso com IPv6. CNAME associa um nome a outro nome canônico. TXT publica texto, frequentemente usado para provar controle de domínio ou publicar políticas de e-mail. O campo nome pode aparecer como @ para o domínio raiz, mas a interface do provedor decide como representar cada campo.",
          "Pausa: antes de ler a explicação do exemplo, associe cada tipo ao seu destino: endereço IPv4, endereço IPv6, outro nome ou texto."
        ],
        "terms": [
          { "term": "Registro A", "meaning": "Registro DNS que associa um nome a um endereço IPv4." },
          { "term": "Registro AAAA", "meaning": "Registro DNS que associa um nome a um endereço IPv6." },
          { "term": "CNAME", "meaning": "Alias DNS que aponta um nome para outro nome, cuja resolução continua sendo necessária." },
          { "term": "TXT", "meaning": "Registro de texto, usado por exemplo em verificações de domínio e políticas de e-mail." }
        ]
      },
      {
        "title": "TTL é tempo de cache",
        "paragraphs": [
          "TTL (time to live, tempo de vida) indica por quanto tempo um resolvedor pode guardar uma resposta DNS antes de consultá-la novamente. Um TTL maior pode reduzir consultas repetidas, mas também pode prolongar o uso de um valor anterior depois de uma alteração. O TTL é configurado em segundos nos exemplos comuns, embora os painéis possam formatá-lo de outra maneira.",
          "O TTL não é uma promessa de que a mudança estará visível exatamente após esse número em todos os lugares. O resolvedor pode ter consultado a resposta antiga em outro momento, e respostas negativas também podem ser guardadas."
        ]
      },
      {
        "title": "Entender a chamada propagação",
        "paragraphs": [
          "Quando alguém diz que um registro está propagando, normalmente quer dizer que caches e resolvedores ainda não observam o mesmo valor. Servidores autoritativos, resolvedores públicos, cache do sistema e cache do navegador são pontos diferentes. Limpar o cache de um dispositivo não limpa os caches de todos os outros.",
          "Pausa: preveja o que verá em dois resolvedores quando um consultou o valor antigo há pouco e outro consulta depois da alteração. Uma resposta diferente pode ser temporária; compare consulta, servidor consultado e TTL restante antes de concluir."
        ]
      },
      {
        "title": "Verificar antes de editar",
        "paragraphs": [
          "Em uma mudança real, confirme no painel do serviço qual tipo, nome e alvo ele recomenda para aquele projeto. Valores de Vercel podem variar conforme domínio e projeto; não copie um IP ou CNAME genérico de uma aula antiga. Confira também se já existem registros A, AAAA, CNAME, MX e TXT importantes.",
          "A resolução pode ser consultada por ferramentas como nslookup ou dig, quando disponíveis, mas um resultado DNS não comprova que a aplicação responde. Registre a consulta e depois verifique domínio, HTTPS e resposta HTTP. Nesta aula todos os registros são exemplos reservados, então a prática consiste em ler e diagnosticar, sem alterar a internet."
        ]
      }
    ],
    "guided": [
      { "instruction": "Classifique os quatro registros pelo tipo de valor que guardam.", "result": "A e AAAA apontam para famílias de IP; CNAME, para um nome; TXT, para texto." },
      { "instruction": "Diga por quantos segundos o TTL 300 autoriza um resolvedor a usar uma resposta em cache antes de revalidar.", "result": "O valor é 300 segundos no exemplo; isso não promete atualização global instantânea." },
      { "instruction": "Compare dois resultados de consulta que retornam valores diferentes e anote o servidor e o TTL restante em cada um.", "result": "A divergência pode ser explicada por caches diferentes e deve ser investigada sem trocar registros às cegas." }
    ],
    "mistakes": [
      "Usar A para um endereço IPv6 ou AAAA para IPv4.",
      "Tratar CNAME como um endereço IP ou supor que ele contém o site.",
      "Achar que TTL é o tempo exato de propagação global.",
      "Trocar nameservers sem preservar registros MX e TXT usados por e-mail ou verificações."
    ],
    "exercises": [
      {
        "prompt": "Prever: indique se cada valor fictício do exemplo é endereço IPv4, IPv6, nome de destino ou texto. Associe cada um ao tipo de registro correto.",
        "expected": "192.0.2.10 corresponde a A; 2001:db8::10 a AAAA; site.example.test a CNAME; codigo-ficticio a TXT.",
        "criteria": ["Os quatro tipos são associados ao formato do valor.", "O domínio .test e os endereços são reconhecidos como exemplos, não destinos publicados."],
        "solution": "A → IPv4; AAAA → IPv6; CNAME → outro nome; TXT → conteúdo textual.",
        "explanation": "Os formatos revelam o papel mais provável de cada registro no cenário didático.",
        "hints": ["A e AAAA diferem pela família de endereços.", "CNAME aponta para nome; TXT guarda texto."]
      },
      {
        "prompt": "Alterar: ajuste a tabela fictícia em que o site usa www.example.test, mas o CNAME de www aponta para site-antigo.example.test. Descreva a correção como proposta a conferir no painel do provedor.",
        "expected": "A hipótese identifica o alvo antigo; a proposta atualiza o CNAME para o destino recomendado pelo host, após confirmar o valor específico daquele projeto.",
        "criteria": ["O tipo continua CNAME para o subdomínio do cenário.", "A pessoa não inventa um destino de produção e registra a necessidade de confirmar o valor."],
        "solution": "Consultar as instruções atuais do projeto de hospedagem e substituir somente o alvo incorreto do CNAME de www, preservando os demais registros necessários.",
        "explanation": "O alvo real depende do fornecedor e da configuração do domínio.",
        "hints": ["Compare nome, tipo e alvo separadamente.", "Não use um destino lembrado de outro projeto; confirme o atual no painel."]
      },
      {
        "prompt": "Construir: crie uma tabela para o domínio fictício de uma aplicação com A, AAAA, CNAME e TXT. Marque cada valor como ilustrativo e escreva qual fonte consultaria antes de configurar um domínio real.",
        "expected": "A tabela contém os quatro tipos e a observação explícita de que os valores precisam vir do provedor autoritativo e da hospedagem configurada.",
        "criteria": ["A tabela diferencia nomes e valores.", "A configuração de produção não é inventada nem copiada do exemplo."],
        "solution": "Qualquer tabela com A/IPv4, AAAA/IPv6, CNAME/nome e TXT/texto atende, se rotulada como fictícia e vinculada à verificação nas instruções atuais do host.",
        "explanation": "A tarefa mede classificação e procedimento seguro, não memorização de endereços.",
        "hints": ["Use endereços de documentação ou marcadores claramente fictícios.", "O painel do projeto fornece os alvos específicos de verificação."]
      },
      {
        "prompt": "Investigar erro: depois de reduzir TTL, um visitante ainda recebe o endereço antigo, mas outro recebe o novo. Registre duas hipóteses relacionadas a cache e indique uma consulta adicional para comparar.",
        "expected": "A explicação considera que resolvedores consultaram em momentos diferentes ou retêm cache local/negativo; a comparação identifica resolvedor, resposta e TTL restante.",
        "criteria": ["Não afirma que o TTL menor apaga imediatamente respostas já armazenadas.", "Propõe comparar qual resolvedor respondeu e o TTL observado."],
        "solution": "Diferentes resolvedores podem ter consultado antes/depois da alteração; um cache de sistema ou resposta negativa também pode persistir. Consultar os mesmos nomes em resolvedores identificados e registrar resposta/TTL.",
        "explanation": "TTL controla cache; mudar o campo não sincroniza todos os caches ao mesmo tempo.",
        "hints": ["Pergunte quando cada resolvedor consultou o autoritativo.", "Compare o TTL que acompanha cada resposta."]
      }
    ],
    "quiz": [
      { "question": "Qual registro associa um nome diretamente a um IPv6?", "options": ["A", "AAAA", "TXT"], "correctIndex": 1, "explanation": "AAAA é usado para endereços IPv6." },
      { "question": "O que o TTL controla principalmente?", "options": ["O tempo que um domínio fica registrado.", "O tempo de cache de uma resposta DNS antes de revalidar.", "O tempo de validade de um certificado TLS."], "correctIndex": 1, "explanation": "TTL é uma instrução de cache DNS, não validade do domínio ou certificado." },
      { "question": "Dois resolvedores mostram valores diferentes após uma mudança. Qual é a próxima ação mais útil?", "options": ["Apagar todos os registros.", "Comparar o servidor consultado, resposta e TTL restante.", "Concluir que o domínio foi roubado."], "correctIndex": 1, "explanation": "A divergência pede diagnóstico de caches e servidores consultados antes de uma alteração adicional." }
    ],
    "summary": [
      "A e AAAA guardam endereços; CNAME aponta para outro nome; TXT publica texto.",
      "TTL orienta cache e não promete uma hora única de propagação global.",
      "Confirme os valores atuais no painel do projeto e preserve os registros existentes.",
      "Use intervalos IP de documentação e nomes .test apenas como exemplos; eles não servem como endereços de produção."
    ]
  },
  "delivery-dns-resolution": {
    "prerequisites": "Concluir delivery-web-foundations e delivery-dns. Não exige conta, compra de domínio, instalação ou alteração de DNS.",
    "setup": "Use os nomes `.test` apenas no diagrama. A RFC 6761 reserva esse sufixo para testes; respostas em redes locais podem variar. Não use `example.test` como domínio público nem espere um endereço real.",
    "why": "Conhecer quem pergunta, quem encaminha e quem responde por uma zona ajuda a localizar a camada que está errada antes de alterar registros.",
    "example": {
      "language": "text",
      "code": "Caminho conceitual de um nome público devidamente configurado\n1. O dispositivo consulta o resolvedor recursivo configurado.\n2. Se não há resposta em cache, o resolvedor segue referências da raiz aos servidores do sufixo público.\n3. As delegações levam ao servidor autoritativo da zona, que responde pelo registro.\n4. O resolvedor guarda a resposta conforme o TTL e devolve o resultado ao dispositivo.\n\n`www.curso.example.test` serve apenas para separar rótulos; `.test` é reservado e nenhum pedido DNS é executado.",
      "expected": "O cliente consulta um resolvedor recursivo; quando necessário, segue as delegações de um nome público configurado até o servidor autoritativo. A resposta também pode vir do cache. O rótulo `.test` aqui não representa uma zona pública resolvível.",
      "explanation": [
        "O dispositivo normalmente conversa com um resolvedor recursivo, que consulta outros servidores quando não encontra a resposta no cache.",
        "Em uma consulta pública normal, servidores raiz e do sufixo registrado orientam a busca por referências; não guardam os registros finais de cada site. `.test` é reservado, e uma rede local pode tratar esse nome de forma própria.",
        "A zona autoritativa contém os registros publicados pelo provedor DNS delegado para aquela parte da árvore.",
        "Um TTL permite que resolvedores reutilizem respostas por algum tempo; mudanças não atualizam todos os caches ao mesmo instante."
      ]
    },
    "sections": [
      {
        "title": "Nome, árvore e zona",
        "paragraphs": [
          "Um nome DNS é lido da direita para a esquerda como níveis separados por pontos. Em `www.curso.example.test.`, o ponto final representa a raiz; `test` é o sufixo, `example` é o nível seguinte, e `curso` e `www` são nomes mais específicos. No navegador, o ponto final costuma ser omitido.",
          "Uma zona é a parte da árvore cujos registros são mantidos por um conjunto de servidores autoritativos. Um domínio pode corresponder a uma zona inteira ou delegar uma parte, como `curso.example.test`, para outra administração. Domínio, zona e URL são conceitos relacionados, mas não sinônimos.",
          "Pausa: antes de ver o diagrama, marque os rótulos em `api.aula.example.test` e diga qual deles identifica o subdomínio mais específico."
        ],
        "terms": [
          { "term": "Zona DNS", "meaning": "Parte administrada da árvore de nomes, com registros publicados por servidores autoritativos." },
          { "term": "Rótulo", "meaning": "Cada trecho entre pontos em um nome DNS, como `api` ou `aula`." }
        ]
      },
      {
        "title": "Resolvedor recursivo e servidor autoritativo",
        "paragraphs": [
          "O resolvedor recursivo recebe a pergunta do dispositivo, consulta o cache e, se necessário, busca respostas em etapas. Para um nome público registrado, pode perguntar a um servidor raiz quem conhece o sufixo, seguir a referência ao servidor do sufixo e continuar até o autoritativo da zona. `.test` é reservado; o nome deste exemplo não executa esse percurso público.",
          "O servidor autoritativo publica a resposta oficial da zona que administra: por exemplo, um registro A, AAAA, CNAME ou uma resposta de que o nome não existe. A raiz e os servidores de sufixos fornecem referências para a próxima parte da árvore; eles não apontam diretamente cada visitante para o conteúdo do site.",
          "Pausa: preveja se uma consulta repetida sempre percorre a árvore inteira. Depois compare sua previsão com o papel do cache do resolvedor."
        ],
        "terms": [
          { "term": "Resolvedor recursivo", "meaning": "Serviço que procura a resposta para o cliente, consulta outros servidores quando necessário e pode manter cache." },
          { "term": "Servidor autoritativo", "meaning": "Servidor que publica os registros oficiais de uma zona DNS." }
        ]
      },
      {
        "title": "Delegação e registros NS",
        "paragraphs": [
          "Uma delegação informa quais servidores são responsáveis por uma zona filha. Registros NS (name server, servidor de nomes) indicam os servidores autoritativos; a delegação publicada pela zona superior direciona a consulta para eles. No uso cotidiano, o painel do registrador pode permitir trocar os nameservers, enquanto o painel do provedor DNS guarda os registros da zona.",
          "Se você muda um registro A no painel de um provedor que já não é autoritativo, os resolvedores podem continuar recebendo a resposta do provedor apontado pela delegação. Antes de editar, confira os nameservers realmente publicados e qual painel é responsável por eles.",
          "Pausa: imagine que a zona superior delega `aula.example.test` para `ns1.dns-ficticio.test`, mas você edita o A em outro provedor. Preveja qual painel precisa ser investigado primeiro."
        ],
        "terms": [
          { "term": "Delegação", "meaning": "Indicação feita pela zona superior de quais servidores respondem por uma zona filha." },
          { "term": "NS", "meaning": "Tipo de registro que identifica servidores de nomes autoritativos para uma zona." }
        ]
      },
      {
        "title": "Cache e investigação sem mudança",
        "paragraphs": [
          "Uma resposta diferente entre dois resolvedores pode ocorrer porque consultaram em momentos distintos e ainda mantêm respostas em cache. O TTL indica por quanto tempo uma resposta pode ser reutilizada; reduzir o TTL agora não apaga cópias que já foram armazenadas. Respostas negativas também podem ser mantidas temporariamente.",
          "Uma consulta local mostra apenas o que o resolvedor consultado respondeu naquele momento. `nslookup` costuma estar disponível em Windows, macOS e Linux, mas formato, endereço e quantidade de respostas variam. Ao examinar um Preview `*.vercel.app`, registre o nome consultado e os tipos/respostas observados; uma resposta DNS não prova que a página, o certificado ou a API funcionam.",
          "Esta aula não exige rodar comandos nem ter rede. Se usar um domínio real de Preview, não cole cookies, tokens nem dados de conta na saída compartilhada."
        ],
        "terms": [
          { "term": "Cache DNS", "meaning": "Cópia temporária de uma resposta que evita consultas repetidas até o período permitido terminar." },
          { "term": "TTL", "meaning": "Tempo, normalmente expresso em segundos, que uma resposta pode permanecer em cache." }
        ]
      }
    ],
    "guided": [
      { "instruction": "Separe os rótulos do nome `app.aula.example.test` e identifique qual sufixo está à direita.", "result": "Os rótulos aparecem em níveis; `test` é o sufixo e `app` é o nome mais específico." },
      { "instruction": "Trace setas entre dispositivo, resolvedor recursivo e servidor autoritativo no diagrama.", "result": "O dispositivo pergunta ao resolvedor; o resolvedor consulta outros servidores somente se a resposta não estiver disponível em cache." },
      { "instruction": "Compare a delegação NS com o provedor onde um A foi editado no cenário fictício.", "result": "A investigação identifica qual provedor é autoritativo antes de propor outra alteração." }
    ],
    "mistakes": [
      "Achar que o navegador consulta diretamente todos os servidores raiz em cada visita.",
      "Confundir o resolvedor recursivo do dispositivo com o servidor autoritativo da zona.",
      "Editar registros em um painel sem verificar se aquele provedor ainda recebe a delegação NS.",
      "Esperar que reduzir o TTL apague imediatamente respostas já guardadas em cache."
    ],
    "exercises": [
      {
        "prompt": "Prever: para um nome público registrado com delegações e registro configurados, desenhe o caminho quando o resolvedor não tem resposta em cache. Marque cliente, resolvedor, referências da raiz/sufixo e autoridade da zona.",
        "expected": "O dispositivo pergunta ao resolvedor recursivo; este segue referências de um sufixo público até o autoritativo da zona, que responde pelo nome solicitado.",
        "criteria": ["O desenho separa dispositivo, resolvedor recursivo e autoritativo.", "A raiz e o sufixo são tratados como referências, não como hospedagem do site.", "Não presume que `.test` tem delegação pública."],
        "solution": "Dispositivo → resolvedor recursivo → referências dos servidores raiz e do sufixo público → autoritativo da zona → resposta volta pelo resolvedor ao dispositivo.",
        "explanation": "A consulta é recursiva para o cliente e o resolvedor pode fazer consultas iterativas para encontrar a autoridade da resposta.",
        "hints": ["Comece pelo serviço que recebe a consulta do dispositivo.", "O autoritativo da zona é quem publica a resposta final daquele nome."]
      },
      {
        "prompt": "Alterar: uma pessoa mudou nameservers no registrador, mas continuou editando o A no painel DNS anterior. Descreva a primeira verificação e a menor correção a considerar, sem executar mudanças.",
        "expected": "A primeira verificação identifica quais nameservers a delegação atual publica; a correção proposta é ajustar a zona no provedor autoritativo, após comparar e preservar os registros necessários.",
        "criteria": ["Consulta a delegação NS antes de editar o A.", "Não presume que qualquer painel DNS é autoritativo nem recomenda apagar a zona anterior sem inventário."],
        "solution": "Conferir os NS publicados para o domínio no registrador/resolvedor, localizar o provedor autoritativo indicado, comparar a zona existente e só então propor o A no painel correto.",
        "explanation": "Registros guardados em um provedor não autoritativo não são a resposta consultada depois que a delegação aponta para outro lugar.",
        "hints": ["Encontre primeiro quem responde pela zona neste momento.", "Antes de trocar registros, compare a zona antiga e a nova, inclusive e-mail."]
      },
      {
        "prompt": "Construir: monte um mapa de resolução para `portal.preview.vercel.app` usando o hostname de um Preview que você já conhece ou o marcador `SEU-PREVIEW.vercel.app`. Mostre consulta local, resolvedor, resposta DNS e uma verificação HTTP separada. Não invente endereços IP.",
        "expected": "O mapa separa a consulta DNS da requisição HTTP; os valores DNS são anotados somente se realmente observados, e a URL pode ser acessada por HTTPS sem domínio próprio.",
        "criteria": ["Não preenche endereços ou nomes autoritativos não observados.", "A resposta DNS não é usada como prova de HTTPS, login ou saúde da aplicação.", "Usa o hostname Preview do provedor sem exigir domínio pessoal."],
        "solution": "Escrever o hostname real do Preview, registrar a resposta observada pelo resolvedor local e, separadamente, abrir o caminho HTTPS da página ou verificar seu status HTTP. Se não houver acesso à rede, deixar os valores como não verificados.",
        "explanation": "DNS localiza um destino; HTTP/HTTPS avalia o serviço e a conexão depois da resolução.",
        "hints": ["Use um deployment Preview existente ou deixe um marcador explícito.", "Anote observação e ferramenta; não copie uma resposta genérica de outra pessoa."]
      },
      {
        "prompt": "Investigar erro: um A novo aparece no painel do provedor, mas dois resolvedores ainda mostram endereços diferentes. Registre as evidências a coletar antes de editar qualquer coisa.",
        "expected": "A investigação compara a delegação NS, o autoritativo consultado, as respostas e TTLs dos resolvedores; diferenças temporárias podem vir de caches consultados em horários distintos.",
        "criteria": ["Confere qual provedor é autoritativo e quais respostas cada resolvedor recebeu.", "Não atribui a divergência a uma falha única sem comparar TTL e momento da consulta.", "Não faz outra alteração até identificar a camada responsável."],
        "solution": "Registrar hostname/tipo consultado, NS autoritativos, horário, resposta e TTL de cada resolvedor; comparar com o registro publicado no autoritativo antes de decidir se a zona ou apenas o cache explica a divergência.",
        "explanation": "A tela do painel confirma o que foi digitado ali, mas a delegação e as respostas observadas ajudam a confirmar o que os clientes consultam.",
        "hints": ["O painel editado pode não corresponder ao provedor delegado.", "Compare o autoritativo e os resolvedores separadamente, anotando o TTL."]
      }
    ],
    "quiz": [
      { "question": "Quem normalmente recebe a pergunta DNS do dispositivo e procura a resposta quando ela não está em cache?", "options": ["O servidor HTTP da aplicação.", "O resolvedor recursivo.", "O registrador do domínio."], "correctIndex": 1, "explanation": "O resolvedor recursivo consulta outros servidores quando não consegue responder do cache." },
      { "question": "O que a delegação NS informa?", "options": ["O servidor autoritativo responsável por uma zona.", "O certificado TLS da aplicação.", "O endereço de e-mail do registrante."], "correctIndex": 0, "explanation": "A delegação indica quais nameservers respondem pela zona delegada." },
      { "question": "Um site mostra a tela de proteção Vercel, mas o hostname Preview resolve. Qual conclusão é segura?", "options": ["O DNS está necessariamente errado.", "A consulta DNS e a política de acesso são camadas diferentes e precisam de verificações separadas.", "O banco de dados falhou."], "correctIndex": 1, "explanation": "Uma resposta DNS não prova acesso público nem saúde da aplicação." }
    ],
    "summary": [
      "O dispositivo consulta um resolvedor recursivo; servidores raiz e zonas superiores podem encaminhar a consulta.",
      "O servidor autoritativo publica os registros da zona indicada pela delegação NS.",
      "Caches podem manter respostas diferentes por algum tempo; compare autoridade, resolvedor, horário e TTL.",
      "DNS, HTTPS, proteção Vercel e funcionamento da aplicação são verificações distintas."
    ],
    "retry": {
      "prompt": "Em um cenário fictício de DNS local para nomes `.test`, uma rede corporativa resolve `painel.curso.example.test` para um destino antigo, enquanto o DNS do celular mostra outro. Elabore um diagnóstico em ordem sem alterar registros.",
      "expected": "O diagnóstico reconhece que `.test` é reservado e que a rede pode ter uma resposta local; compara resolvedores, horários e TTLs, e só procura delegação autoritativa se esse cenário a tiver configurado.",
      "hint": "Diferencie uma resposta local para um sufixo reservado do cache de uma zona pública delegada."
    }
  },
  "delivery-https": {
    "prerequisites": "Concluir delivery-web-foundations e delivery-dns. Não é necessário instalar certificado ou alterar um domínio.",
    "setup": "Use os fluxos ilustrativos da aula; não envie dados pessoais nem credenciais por HTTP.",
    "why": "Um domínio que resolve não garante uma conexão autenticada e protegida. Separar DNS e TLS evita considerar uma página publicada segura apenas porque abre no navegador.",
    "example": {
      "language": "text",
      "code": "DNS: nome.example.test → destino configurado\nTLS: certificado válido para nome.example.test\nHTTPS: navegador estabelece conexão protegida\nHTTP: se habilitado, deve redirecionar para a mesma URL HTTPS\n\nCertificado inválido ou ausente → alerta; não prossiga com dados sensíveis.",
      "expected": "DNS localiza o destino, enquanto TLS ajuda a autenticar o servidor e protege a comunicação. HTTPS combina HTTP com TLS; um redirecionamento não torna segura a requisição HTTP que o precedeu.",
      "explanation": [
        "TLS protege a comunicação contra leitura e alteração em trânsito e permite verificar a identidade apresentada pelo servidor por meio do certificado.",
        "O nome do certificado precisa corresponder ao host acessado e a cadeia deve ser aceita pelo navegador.",
        "A aplicação deve ser acessada por HTTPS e carregar recursos ativos, como scripts, também por HTTPS.",
        "A configuração e a emissão do certificado variam por provedor. A documentação atual do projeto é a fonte para verificar estado e instruções."
      ]
    },
    "sections": [
      {
        "title": "O que HTTPS protege",
        "paragraphs": [
          "HTTPS usa HTTP sobre TLS (Transport Layer Security, segurança da camada de transporte). TLS protege a confidencialidade e a integridade da conexão e ajuda o navegador a autenticar o servidor pelo certificado apresentado. Isso protege os dados em trânsito; não prova que o conteúdo do site é honesto nem substitui autorização e segurança da aplicação.",
          "Pausa: preveja o que HTTPS protege entre navegador e servidor e cite uma coisa que continua sendo responsabilidade do código da aplicação."
        ],
        "terms": [
          { "term": "TLS", "meaning": "Protocolo que protege a comunicação e permite validar a identidade do servidor durante a conexão." },
          { "term": "Certificado", "meaning": "Credencial digital apresentada pelo servidor para associar uma identidade de host a uma chave pública, validada por uma cadeia de confiança." },
          { "term": "Conteúdo misto", "meaning": "Página HTTPS que tenta carregar recursos por HTTP; navegadores bloqueiam recursos ativos inseguros." }
        ]
      },
      {
        "title": "DNS e certificado resolvem problemas diferentes",
        "paragraphs": [
          "DNS ajuda a localizar o destino do domínio. O certificado TLS trata da identidade do host e da conexão segura. Um registro DNS correto não cria por si só um certificado válido; um certificado válido também não corrige um registro que aponta para outro serviço.",
          "Em Vercel, por exemplo, a documentação descreve emissão automática de certificado depois da verificação DNS. Esse comportamento é específico do serviço e depende da configuração correta do domínio; em outro host, consulte as instruções próprias."
        ]
      },
      {
        "title": "Redirecionar HTTP sem confundir a proteção",
        "paragraphs": [
          "Um servidor pode responder a uma visita HTTP com redirecionamento para o mesmo caminho em HTTPS. A primeira conexão ainda começou sem TLS; por isso o redirecionamento não protege o conteúdo que eventualmente fosse enviado nessa requisição inicial. Não envie credenciais por HTTP. Após verificar o redirecionamento, confira a URL final e o certificado no navegador.",
          "Se o HTML seguro tenta carregar JavaScript por HTTP, o navegador pode bloquear esse recurso como conteúdo misto. Antes de publicar, revise links de scripts, estilos, chamadas de API e imagens, especialmente os recursos ativos."
        ]
      },
      {
        "title": "Verificação em navegador e provedor",
        "paragraphs": [
          "Abra diretamente a URL https:// e confira ausência de alerta de certificado, nome do host e conteúdo carregado. Depois solicite http:// em ambiente público e confirme que a resposta leva ao mesmo caminho HTTPS. No painel do provedor, confira o status de domínio e certificado. Uma página que abriu uma vez não comprova todos os caminhos ou recursos.",
          "Não desative avisos do navegador nem copie um certificado ou um redirecionamento de outra plataforma. Registre URL testada, resultado, data e uma falha observada, sem incluir token ou informação pessoal."
        ]
      }
    ],
    "guided": [
      { "instruction": "Marque no exemplo o papel de DNS e o papel de TLS.", "result": "DNS localiza o destino; TLS protege e ajuda a autenticar a conexão com o host." },
      { "instruction": "Simule um alerta de certificado expirado e escreva qual decisão protege a pessoa visitante.", "result": "Não inserir credenciais e corrigir/confirmar certificado antes de usar o serviço." },
      { "instruction": "Inspecione os endereços de scripts e chamadas da página fictícia e marque qualquer recurso ativo em HTTP.", "result": "A auditoria identifica recursos que podem ser bloqueados como conteúdo misto." }
    ],
    "mistakes": [
      "Dizer que DNS fornece criptografia ou autentica o conteúdo do site.",
      "Achar que HTTPS torna a aplicação livre de falhas de autorização ou vazamento de dados.",
      "Tratar um redirecionamento HTTP como proteção dos dados enviados antes dele.",
      "Ignorar script ou API por HTTP dentro de uma página HTTPS."
    ],
    "exercises": [
      {
        "prompt": "Prever: liste quais propriedades TLS ajuda a proteger no caminho navegador-servidor e quais decisões continuam sendo responsabilidade da aplicação.",
        "expected": "TLS protege confidencialidade e integridade do tráfego e autentica o host conforme a validação do certificado; autorização, validação de entrada e correção das regras continuam na aplicação.",
        "criteria": ["Cita pelo menos duas proteções da conexão.", "Não atribui autorização de usuário ao TLS."],
        "solution": "TLS protege comunicação contra leitura e alteração e permite validar a identidade do servidor; a aplicação ainda precisa autorizar cada ação e validar cada pedido.",
        "explanation": "A conexão segura e as regras de negócio são camadas diferentes.",
        "hints": ["Pense no que acontece durante o transporte dos bytes.", "Depois pergunte quem decide se este usuário pode editar um registro."]
      },
      {
        "prompt": "Alterar: a página principal abre por HTTPS, mas o JavaScript do formulário vem de http://scripts.example.test/app.js. Explique o comportamento esperado e corrija o endereço na proposta.",
        "expected": "O navegador pode bloquear o script ativo como conteúdo misto; a proposta troca o recurso por HTTPS e confirma que o host oferece esse recurso com conexão válida.",
        "criteria": ["Identifica conteúdo misto ativo.", "Corrige para HTTPS e inclui verificação do host."],
        "solution": "Usar https://scripts.example.test/app.js somente se o recurso realmente estiver disponível e com certificado válido; idealmente carregar script da mesma origem quando apropriado.",
        "explanation": "Uma página segura não deve depender de código ativo carregado sem TLS.",
        "hints": ["Compare o esquema do documento e do script.", "Trocar o texto da URL não basta se o destino não servir HTTPS válido."]
      },
      {
        "prompt": "Construir: escreva uma lista de verificação para uma URL HTTPS pública: domínio apontado, certificado, caminho HTTP e recursos ativos. Defina o resultado esperado de cada checagem.",
        "expected": "A lista verifica configuração do host, certificado correspondente, redirecionamento e ausência de recursos ativos em HTTP.",
        "criteria": ["Inclui quatro verificações independentes.", "O resultado esperado é observável no navegador ou painel."],
        "solution": "Conferir domínio no painel; abrir URL HTTPS sem alerta; abrir HTTP e observar redirecionamento ao mesmo caminho HTTPS; inspecionar recursos de script e API e confirmar HTTPS.",
        "explanation": "Cada checagem cobre uma camada diferente; nenhuma sozinha valida toda a entrega.",
        "hints": ["Inclua um teste iniciado em HTTP e outro iniciado diretamente em HTTPS.", "Olhe para os recursos carregados além do documento principal."]
      },
      {
        "prompt": "Investigar erro: um navegador alerta que o certificado não corresponde a api.example.test, embora app.example.test abra em HTTPS. Registre a observação, uma hipótese e o próximo teste seguro.",
        "expected": "A hipótese verifica se o certificado cobre o host da API e se o DNS/provedor apontam para o serviço esperado; a pessoa não ignora o alerta nem envia dados.",
        "criteria": ["Distingue certificados por hostname.", "O próximo passo consulta domínio/certificado no provedor e evita contornar o aviso."],
        "solution": "Abrir api.example.test diretamente sem enviar dados, registrar o alerta e conferir no host a associação desse domínio e a cobertura do certificado. Não aceitar o certificado inválido como correção.",
        "explanation": "Um certificado que funciona para um host pode não ser válido para outro.",
        "hints": ["Compare exatamente os dois nomes de host.", "O navegador está apontando para identidade, não para o status do banco de dados."]
      }
    ],
    "quiz": [
      { "question": "Qual frase descreve HTTPS corretamente?", "options": ["TLS protege a conexão, mas a aplicação ainda precisa autorizar ações.", "DNS criptografa a página.", "HTTPS garante que todo conteúdo do site é verdadeiro."], "correctIndex": 0, "explanation": "HTTPS protege a conexão; segurança e autorização da aplicação continuam necessárias." },
      { "question": "Uma página HTTPS tenta carregar um script por HTTP. O que pode acontecer?", "options": ["O DNS converte o script automaticamente para HTTPS.", "O navegador pode bloquear o recurso ativo como conteúdo misto.", "O certificado passa a valer para qualquer domínio."], "correctIndex": 1, "explanation": "Recursos ativos inseguros podem ser bloqueados dentro de uma página segura." },
      { "question": "Um redirecionamento de HTTP para HTTPS protege dados enviados na requisição HTTP inicial?", "options": ["Sim, sempre.", "Não; a requisição inicial começou sem TLS.", "Só quando DNS tem um registro TXT."], "correctIndex": 1, "explanation": "O redirecionamento posterior não protege a conexão inicial não criptografada." }
    ],
    "summary": [
      "HTTPS usa TLS para proteger a conexão e validar a identidade do host.",
      "DNS, certificado e autorização da aplicação são responsabilidades diferentes.",
      "Confira URL HTTPS, certificado, redirecionamento e recursos ativos antes de publicar."
    ]
  },
  "delivery-hosting-models": {
    "prerequisites": "Concluir delivery-http, delivery-web-foundations e delivery-https; saber distinguir interface, API e banco de dados.",
    "setup": "Nenhuma conta ou instalação. Compare os modelos conceitualmente; preços, limites e recursos dos fornecedores mudam e devem ser consultados antes de uma decisão real.",
    "why": "Escolher uma hospedagem sem considerar o que precisa executar pode deixar a API sem ambiente, usar banco efêmero por engano ou acrescentar complexidade que o projeto não precisa.",
    "example": {
      "language": "text",
      "code": "HTML/CSS/JS → hospedagem estática/CDN\n/api        → função sob demanda OU servidor persistente\nPostgreSQL  → banco gerenciado ou servidor de banco operado pela equipe\n\nUma página estática pode consumir uma API remota; os arquivos não guardam por si só o estado compartilhado.",
      "expected": "Arquivos estáticos podem ser servidos sem um processo de aplicação persistente. Uma função executa código em resposta a chamadas; um servidor persistente mantém um processo em execução. O banco precisa de persistência e acesso configurados independentemente da hospedagem da página.",
      "explanation": [
        "Hospedagem estática entrega arquivos prontos como HTML, CSS, JavaScript e imagens.",
        "Funções sob demanda executam código quando chegam requisições e têm limites definidos pela plataforma.",
        "Um servidor persistente mantém um processo que a equipe precisa operar, monitorar e atualizar.",
        "Serviço gerenciado transfere parte da operação ao fornecedor; responsabilidades, limites e custo continuam existindo e variam por serviço e plano."
      ]
    },
    "sections": [
      {
        "title": "Arquivos estáticos",
        "paragraphs": [
          "Um site estático entrega arquivos existentes sem executar um processo próprio para cada página. Isso não significa que o site não tenha JavaScript: o navegador ainda executa scripts. A página pode chamar uma API remota por HTTP, mas autenticação, regra de negócio e persistência precisam existir em algum serviço acessível.",
          "Pausa: preveja se uma lista mantida somente em uma variável JavaScript compartilharia dados entre dois dispositivos. Depois indique onde a persistência deveria ocorrer."
        ]
      },
      {
        "title": "Funções sob demanda e servidor persistente",
        "paragraphs": [
          "Uma função sob demanda executa uma unidade de código em resposta a requisições; a plataforma gerencia parte do escalonamento e define limites de tempo, memória, região e custo. Um servidor persistente mantém um processo em execução e permite outros modelos de conexão, mas a equipe assume mais trabalho operacional. As duas opções podem acessar APIs e bancos; nenhuma implica persistência automática.",
          "A palavra serverless não significa que não exista servidor: descreve que a equipe não administra diretamente um processo de servidor tradicional. Consulte a plataforma atual para detalhes de ambiente, limites e disponibilidade."
        ],
        "terms": [
          { "term": "Função sob demanda", "meaning": "Código executado pelo serviço em resposta a uma chamada, dentro dos limites configurados pela plataforma." },
          { "term": "Serverless", "meaning": "Modelo em que o provedor administra a infraestrutura de execução; ainda existem servidores e limites operacionais." },
          { "term": "Processo persistente", "meaning": "Programa que permanece em execução e precisa de monitoramento, atualizações e operação." }
        ]
      },
      {
        "title": "Serviços gerenciados e dados duráveis",
        "paragraphs": [
          "Um banco gerenciado deixa parte da instalação, atualização e disponibilidade a cargo do fornecedor, conforme produto e plano. A aplicação ainda precisa autenticar, controlar acesso, escolher região, proteger segredos, medir custos e planejar exportação/restauração. Uma base em memória dentro de uma função ou reinicializada com o processo não é armazenamento durável.",
          "Mantenha clara a fonte de verdade. Se a regra exige registros compartilhados entre contas e dispositivos, escolha persistência adequada e teste uma gravação após reinício; não conclua que uma hospedagem gerenciada guarda os dados sem examinar a configuração."
        ]
      },
      {
        "title": "Escolher pelo requisito e medir",
        "paragraphs": [
          "Desenhe cada componente, seus dados, disponibilidade, região e forma de comunicação. Escolha o menor ambiente que atende ao requisito, depois verifique limites, custo e recuperação no fornecedor atual. Uma CDN pode distribuir arquivos estáticos; a função e o banco podem continuar em regiões específicas e afetar a latência.",
          "O desenho abaixo é uma possibilidade, não a única arquitetura: interface estática → API sob demanda → PostgreSQL gerenciado. Um backend persistente ou outro serviço podem ser apropriados quando o projeto tiver requisitos diferentes."
        ],
        "diagramTitle": "Um mapa possível para uma aplicação de estudos",
        "diagram": "Navegador\n   │ HTTPS\n   ▼\nArquivos HTML/CSS/JS ── CDN / hospedagem estática\n   │ Fetch / HTTPS\n   ▼\nAPI ── função sob demanda OU servidor persistente\n   │ conexão protegida\n   ▼\nPostgreSQL ── serviço gerenciado OU operação própria"
      }
    ],
    "guided": [
      { "instruction": "Marque no exemplo quais componentes servem arquivos, executam regras e mantêm dados duráveis.", "result": "Interface serve os arquivos; API executa regras; banco é a fonte de dados duráveis." },
      { "instruction": "Troque o backend sob demanda por um servidor persistente e liste uma responsabilidade operacional que passa a ser explícita.", "result": "O plano inclui monitorar e atualizar o processo, além de manter sua disponibilidade." },
      { "instruction": "Compare duas regiões hipotéticas e localize quais saltos da requisição devem ser medidos antes de escolher.", "result": "A análise considera usuário, função/API e banco, sem presumir que CDN distribui todos os componentes." }
    ],
    "mistakes": [
      "Achar que um site estático não pode ter JavaScript ou consumir API.",
      "Achar que serverless significa ausência de servidor ou de limites.",
      "Guardar estado compartilhado apenas na memória de uma função ou processo temporário.",
      "Escolher região ou plano sem verificar latência, custo, limites e recuperação atuais."
    ],
    "exercises": [
      {
        "prompt": "Prever: identifique quais partes do diagrama executam regras de negócio e quais guardam dados duráveis. A hospedagem estática sozinha consegue compartilhar uma lista entre dispositivos?",
        "expected": "A API executa regras; um banco durável guarda os dados compartilhados. A hospedagem estática pode servir a interface e chamar uma API, mas não compartilha estado sozinha.",
        "criteria": ["Distingue interface, API e banco.", "Não atribui persistência durável aos arquivos estáticos."],
        "solution": "HTML/CSS/JS servidos estaticamente; API processa operações; PostgreSQL ou serviço de dados apropriado persiste a lista. A interface acessa a API para sincronizar dispositivos.",
        "explanation": "O navegador pode mostrar dados locais, mas armazenamento compartilhado requer um serviço de dados acessível.",
        "hints": ["Siga o percurso de uma operação de escrita.", "Pergunte onde os dados sobrevivem quando o processo reinicia."]
      },
      {
        "prompt": "Alterar: adapte a arquitetura do exemplo para uma API que precisa manter uma conexão de longa duração com outro sistema. Indique qual modelo pode atender melhor e duas verificações antes da decisão.",
        "expected": "A pessoa compara servidor persistente e suporte real do modelo de funções à duração/conexão necessária; verifica limites atuais, disponibilidade, custo e comportamento de reconexão.",
        "criteria": ["A escolha é justificada pelo requisito de conexão.", "A decisão depende da documentação atual do fornecedor e de teste do comportamento."],
        "solution": "Um processo persistente pode ser mais adequado, mas é preciso confirmar requisitos de protocolo, limites de duração e custo, plano de operação e testes de reconexão. Algumas plataformas podem atender de outro modo.",
        "explanation": "A recomendação depende do serviço específico e do padrão de tráfego.",
        "hints": ["Funções têm ciclo de execução administrado pela plataforma.", "Verifique primeiro a duração e o protocolo exigido pelo sistema externo."]
      },
      {
        "prompt": "Construir: desenhe um mapa de publicação para um app de estudos com interface web, criação de tarefas via API e persistência PostgreSQL. Para cada parte, escolha uma opção inicial entre estática, função, servidor persistente ou serviço gerenciado e escreva um motivo verificável.",
        "expected": "O mapa separa os três componentes, inclui comunicação e origem de verdade e registra requisitos que ainda precisam ser verificados no fornecedor escolhido.",
        "criteria": ["Interface, API e dados têm responsabilidades distintas.", "Há uma justificativa ligada a requisito, não apenas preferência por marca.", "A fonte de verdade e o teste de persistência são explícitos."],
        "solution": "Exemplo: interface estática/CDN; API sob demanda para operações simples; PostgreSQL gerenciado para dados duráveis. Verificar região, limites, custo, segurança, backup/restauração e acesso da API ao banco.",
        "explanation": "Este é um ponto de partida; volume, conexões e requisitos de operação podem mudar a escolha.",
        "hints": ["Desenhe uma caixa por responsabilidade e seta por comunicação.", "Inclua o que precisa continuar existindo após reiniciar a API."]
      },
      {
        "prompt": "Investigar erro: após redeploy, os arquivos da interface atualizam, mas os estudos criados desapareceram. Formule uma hipótese sobre armazenamento e um teste reversível para localizar a falha.",
        "expected": "A hipótese considera dados guardados em memória ou disco efêmero da instância; o teste verifica repositório de dados e executa uma gravação/leitura após reiniciar sem apagar a base de origem.",
        "criteria": ["Distingue deploy de persistência de dados.", "Propõe testar reinício com dados fictícios em ambiente isolado."],
        "solution": "Inspecionar onde a API grava e se a instância preserva esse armazenamento. Criar registro fictício em ambiente de teste, reiniciar/reimplantar e consultar novamente; se desaparece, mover a fonte de verdade para banco durável e repetir teste.",
        "explanation": "Uma publicação de arquivos e o ciclo de vida da computação não garantem permanência do armazenamento local.",
        "hints": ["Descubra se o dado foi gravado em banco externo, arquivo local ou variável em memória.", "Use dados de teste e confirme que a origem não será alterada."]
      }
    ],
    "quiz": [
      { "question": "Qual afirmação descreve uma hospedagem estática?", "options": ["Entrega arquivos e ainda pode chamar uma API remota.", "Não pode conter JavaScript.", "Sempre guarda os dados em PostgreSQL."], "correctIndex": 0, "explanation": "Arquivos estáticos podem executar JavaScript no navegador e consumir serviços remotos." },
      { "question": "O que serverless significa neste contexto?", "options": ["A aplicação não usa servidores.", "O provedor administra a infraestrutura de execução, com limites e responsabilidades próprios.", "Todo dado é persistido automaticamente."], "correctIndex": 1, "explanation": "O provedor administra a infraestrutura, mas serviços continuam tendo servidores, limites e operação." },
      { "question": "Como verificar se a persistência é durável?", "options": ["Abrir a página uma vez.", "Criar dados fictícios, reiniciar em ambiente isolado e confirmar a leitura depois.", "Ver se o nome do projeto contém database."], "correctIndex": 1, "explanation": "A persistência precisa ser observada após um ciclo de reinício controlado." }
    ],
    "summary": [
      "Estático entrega arquivos; API executa regras; banco durável mantém dados compartilhados.",
      "Funções e servidores persistentes têm ciclos operacionais e limites diferentes.",
      "Compare requisitos, região, latência, custo, limites e recuperação antes de escolher um fornecedor."
    ]
  },
  "delivery-static-deploy": {
    "prerequisites": "Concluir delivery-hosting-models e conseguir abrir uma página no navegador. O laboratório usa o deployment Preview existente da branch `testes`; não exige conta Vercel, domínio próprio nem publicação de uma nova implantação.",
    "setup": "Abra `labs/deployment-static/README.md` no editor. A página contém apenas `index.html` e `styles.css`, sem Node, pacote, formulário, API, banco, chave ou dado pessoal. Use o caminho `/labs/deployment-static/` na URL Preview fornecida pelo projeto. Não mude configurações Vercel nem a branch principal.",
    "why": "Uma publicação estática permite observar como arquivos do repositório chegam a uma URL Preview e separar conteúdo, caminho, DNS e controle de acesso sem criar um domínio próprio.",
    "example": {
      "language": "text",
      "code": "Repositório GitHub\n└── labs/deployment-static/\n    ├── index.html\n    └── styles.css\n\nProjeto Vercel já conectado ao repositório\nbranch `testes` → deployment Preview\nURL Preview: https://<deployment>.vercel.app/labs/deployment-static/",
      "expected": "O estudante identifica a URL Preview da branch `testes`, localiza o caminho do laboratório e verifica a página e o CSS se o acesso estiver disponível. Se a Vercel pedir autenticação, registra proteção de acesso como resultado; isso não comprova falha DNS nem exige desativar a proteção.",
      "explanation": [
        "A branch `testes` produz um Preview do repositório já conectado; o exercício não cria projeto Vercel nem muda diretório-raiz.",
        "O caminho `/labs/deployment-static/` corresponde à pasta da página dentro da raiz atual do repositório. O navegador solicita também `/labs/deployment-static/styles.css`.",
        "A aba Rede ajuda a conferir HTML e CSS separadamente quando a política de acesso permite. Uma tela de login Vercel informa que há uma barreira antes do conteúdo; não é necessário removê-la para concluir a parte conceitual.",
        "O hostname `vercel.app` é atribuído pelo provedor. Este laboratório não adiciona domínio personalizado nem altera DNS."
      ]
    },
    "sections": [
      {
        "title": "Conferir o artefato antes da plataforma",
        "paragraphs": [
          "Um deploy publica uma versão dos arquivos. Antes de abrir a Vercel, confirme que a pasta escolhida contém `index.html` e `styles.css`, que a referência ao CSS é relativa (`styles.css`) e que a página abre localmente. Isso separa defeito de conteúdo de erro de configuração de hospedagem.",
          "Pausa: preveja o que acontece se você definir `labs/` como raiz do projeto. O arquivo de entrada está diretamente nessa pasta ou dentro da subpasta `deployment-static`?"
        ],
        "terms": [
          { "term": "Diretório-raiz do projeto", "meaning": "Pasta que a plataforma considera como início daquele projeto no repositório." },
          { "term": "Build", "meaning": "Etapa que transforma ou organiza arquivos antes de publicá-los; esta página HTML/CSS pode ser servida sem build." },
          { "term": "Deploy", "meaning": "Publicação de uma versão do projeto em um ambiente hospedado." }
        ]
      },
      {
        "title": "Preview por branch e caminho publicado",
        "paragraphs": [
          "A branch `testes` gera um deployment Preview no projeto Vercel já conectado ao repositório. Use a URL do deployment e acrescente o caminho `/labs/deployment-static/`; a branch de Preview não é a URL raiz do domínio e não equivale ao ambiente Production.",
          "Um deployment representa um commit e tem uma URL própria. A raiz configurada no projeto continua sendo a raiz do repositório; este exercício não pede para criar outro projeto, alterar configurações do Vercel, promover o Preview a Production ou mexer na proteção de acesso."
        ]
      },
      {
        "title": "Observar resposta e proteção do Preview",
        "paragraphs": [
          "Se o deployment Preview estiver acessível, abra `/labs/deployment-static/` e use a aba Rede para examinar o documento e `styles.css`. Registre a URL e os status realmente observados. Se houver uma tela de autenticação da Vercel, registre que o conteúdo está protegido e não tente desativar a barreira; a atividade pode ser concluída com a análise dos caminhos e da diferença entre DNS e controle de acesso.",
          "A URL Preview usa HTTPS fornecido pelo hostname `vercel.app`. Esta prática não precisa testar um domínio personalizado, comprar domínio ou alterar registros DNS. Ela ensina o conceito e deixa validação de domínio real fora do escopo."
        ],
        "diagramTitle": "Publicação estática observável",
        "diagram": "commit da branch `testes`\n   │ integração Git existente\n   ▼\ndeployment Preview da Vercel\n   │ URL atribuída pelo provedor\n   ▼\nnavegador ── GET /labs/deployment-static/ ──▶ index.html\n          └ GET /labs/deployment-static/styles.css ──▶ styles.css\nUma tela de proteção é controle de acesso, não prova de erro DNS."
      },
      {
        "title": "Diagnosticar caminho, Preview e DNS",
        "paragraphs": [
          "Um 404 pode vir de caminho incorreto, arquivo que não existe naquele commit ou rota que não foi publicada. Confira o deployment e os caminhos relativos. Para esta página, o HTML está em `/labs/deployment-static/` e o CSS em `/labs/deployment-static/styles.css`; a raiz do repositório não precisa mudar.",
          "Uma tela de login Vercel indica proteção de acesso antes de servir o conteúdo. Um hostname que resolve não garante que a pessoa tenha autorização. Registre essa distinção; a aula não pede acesso anônimo, alteração da proteção ou validação de domínio."
        ]
      }
    ],
    "guided": [
      { "instruction": "Abra `index.html` localmente e confira a folha `styles.css` na pasta. Antes de publicar, anote a URL relativa usada pelo link de estilos.", "result": "Os arquivos estão juntos e o caminho `styles.css` pode ser resolvido a partir do documento." },
      { "instruction": "Localize o deployment Preview da branch `testes` e acrescente o caminho `/labs/deployment-static/` à URL exibida.", "result": "A URL aponta ao Preview existente e ao diretório do laboratório; nenhuma configuração de projeto foi alterada." },
      { "instruction": "Se o Preview abrir, examine o HTML e `styles.css`; se pedir login Vercel, registre a proteção como observação.", "result": "A evidência separa resposta dos arquivos e política de acesso, sem supor acesso anônimo obrigatório." }
    ],
    "mistakes": [
      "Tratar uma URL Preview de branch como se fosse o deployment Production.",
      "Esquecer que os arquivos do laboratório estão sob `/labs/deployment-static/` no repositório atual.",
      "Tratar deploy marcado como pronto como prova de que todos os caminhos funcionam.",
      "Interpretar tela de login Vercel como falha DNS ou remover proteção para concluir a aula."
    ],
    "exercises": [
      {
        "prompt": "Prever: a raiz do projeto está em `labs/`, e o arquivo inicial está em `labs/deployment-static/index.html`. Preveja se `/` encontra a página e explique que diretório a raiz deveria apontar.",
        "expected": "A raiz atual não corresponde ao conteúdo completo esperado; `labs/deployment-static` é a pasta que contém `index.html` e `styles.css`.",
        "criteria": ["Identifica o caminho do arquivo de entrada.", "Prevê 404 ou arquivo ausente sem afirmar que DNS está errado."],
        "solution": "Usar `labs/deployment-static` como diretório-raiz do projeto e fazer novo deploy; depois verificar `/` e `/styles.css`.",
        "explanation": "A raiz determina quais arquivos entram no contexto de publicação.",
        "hints": ["Percorra a árvore de diretórios a partir da raiz configurada.", "Localize exatamente onde está `index.html`." ]
      },
      {
        "prompt": "Alterar: alguém selecionou o preset de um framework que executa `npm run build`, mas a pasta não tem `package.json`. Proponha a menor mudança coerente com o laboratório e diga o que deve continuar funcionando.",
        "expected": "O projeto usa preset Other e não executa build; depois, os arquivos `index.html` e `styles.css` continuam servidos.",
        "criteria": ["Remove a dependência de pacote/comando ausente.", "Preserva a publicação dos dois arquivos estáticos."],
        "solution": "Selecionar Other, deixar Build Command vazio e publicar a raiz contendo os arquivos. Confirmar novamente a página e o CSS.",
        "explanation": "Uma página pronta em HTML/CSS não precisa de compilação nem instalação de dependências.",
        "hints": ["O laboratório não possui etapas de compilação.", "Depois da configuração, verifique tanto a entrada quanto a folha de estilos." ]
      },
      {
        "prompt": "Construir: monte um roteiro reprodutível para conferir `labs/deployment-static` no Preview de `testes`. Registre como localizar o deployment, formar a URL com o caminho da pasta, examinar HTML/CSS quando disponível e classificar uma tela de login Vercel.",
        "expected": "O roteiro aponta ao deployment Preview e ao caminho correto, solicita evidências observadas dos arquivos ou registra a proteção, e não depende de domínio próprio ou acesso anônimo.",
        "criteria": ["Usa o Preview da branch `testes` e o caminho `/labs/deployment-static/`.", "Distingue resposta HTTP dos arquivos de controle de acesso.", "Não altera configurações da Vercel nem inventa status."],
        "solution": "Siga `labs/deployment-static/README.md`, use o hostname exibido pelo projeto e acrescente `/labs/deployment-static/`. Registre a resposta real para HTML e CSS se puder abrir; se surgir login Vercel, anote proteção e encerre a conferência remota.",
        "explanation": "O objetivo é observar um deployment Preview e entender as camadas; domínio personalizado e acesso público anônimo não são pré-requisitos.",
        "hints": ["O caminho do laboratório faz parte da URL porque o projeto publica o repositório inteiro.", "Uma política de acesso pode impedir observar os arquivos sem indicar falha no DNS." ]
      },
      {
        "prompt": "Investigar erro: a URL Preview abre o projeto, mas `/styles.css` retorna 404. Sem mudar DNS ou configurações do projeto, liste as evidências para comparar caminho pedido, referência no HTML e arquivos existentes no commit.",
        "expected": "A análise compara `/labs/deployment-static/styles.css`, o `href` relativo e a presença do arquivo no commit; se a Vercel pedir login, registra que não foi possível observar os pedidos protegidos.",
        "criteria": ["Investiga caminho, referência e commit antes de propor correção.", "Não conclui falha DNS a partir de um 404 de arquivo.", "Não exige domínio, acesso anônimo ou mudança de configuração Vercel."],
        "solution": "Na aba Rede, confirme o caminho solicitado e status; no HTML, confira o caminho relativo `styles.css`; no commit, verifique se o arquivo existe ao lado de `index.html`. Se o acesso estiver protegido, anote a limitação sem alterar a proteção.",
        "explanation": "O endereço do arquivo no repositório e o caminho HTTP publicado ajudam a separar falha de conteúdo de resolução DNS.",
        "hints": ["O HTML e o CSS estão na mesma pasta.", "Descubra se a requisição chegou à Vercel antes de atribuir o resultado ao DNS." ]
      }
    ],
    "quiz": [
      { "question": "Qual caminho contém a página do laboratório no repositório atual?", "options": ["`/labs/deployment-static/` no Preview da branch `testes`.", "A raiz da conta Vercel.", "Um domínio personalizado obrigatório."], "correctIndex": 0, "explanation": "O deployment atual publica o repositório inteiro, e os arquivos didáticos estão na pasta indicada." },
      { "question": "O que significa ver a tela de login Vercel no Preview?", "options": ["É evidência de uma proteção de acesso, não por si só de falha DNS.", "Prova que o domínio não existe.", "Prova que o HTML não foi publicado."], "correctIndex": 0, "explanation": "A resolução e a política de acesso são camadas diferentes." },
      { "question": "É preciso ter domínio próprio para fazer esta prática?", "options": ["Sim, para toda URL HTTPS.", "Não; usa-se a URL Preview `vercel.app` existente.", "Sim, e é necessário alterar os nameservers."], "correctIndex": 1, "explanation": "A URL fornecida pelo provedor basta para observar o Preview; domínio próprio fica fora do escopo." }
    ],
    "summary": [
      "Uma página HTML/CSS pronta pode ser publicada sem instalar pacote nem executar build.",
      "No projeto atual, os arquivos do laboratório são acessados sob `/labs/deployment-static/` no deployment Preview da branch `testes`.",
      "Uma tela de proteção Vercel não é uma prova de falha DNS. A aula não exige domínio próprio nem alteração da política de acesso."
    ]
  },
  "delivery-custom-domain": {
    "prerequisites": "Concluir delivery-web-foundations, delivery-dns, delivery-dns-resolution e delivery-static-deploy. Nenhuma compra, conta nova, configuração DNS ou validação de domínio real é necessária.",
    "setup": "Use somente o cenário de papel descrito aqui. `example.test` é reservado para exemplos e não deve ser consultado como domínio público. Não cole valores reais de verificação nem altere registros.",
    "why": "Associar domínio envolve várias camadas e pode interromper e-mail ou outros serviços se registros forem substituídos sem inventário. Planejar antes ensina o processo sem exigir um domínio de propriedade do aluno.",
    "example": {
      "language": "text",
      "code": "CENÁRIO CONCEITUAL — nada será configurado\n\n1. A URL Preview `https://<deployment>.vercel.app/` já atende à demonstração.\n2. Para um domínio hipotético, a equipe adicionaria `www.curso.example.test` ao projeto host.\n3. O painel exibiria o tipo e o valor DNS específicos daquela configuração.\n4. A pessoa inventariaria registros existentes, inclusive MX/TXT de e-mail.\n5. Só depois de revisar impacto, faria a mudança e verificaria DNS, HTTPS e aplicação.\n\n`<valor-exibido-no-painel>` é um marcador, não um destino válido.",
      "expected": "A sequência separa URL do provedor, associação do host, configuração DNS, validação TLS e resposta da aplicação. Valores DNS e etapas dependem do painel e do provedor autoritativo; nenhum valor fixo é copiado deste exemplo.",
      "explanation": [
        "A URL `vercel.app` atribuída a um deployment não exige domínio comprado pelo aluno. Um domínio personalizado é uma opção para usar um nome próprio.",
        "Registrador, provedor DNS e hospedagem podem ser empresas diferentes. Adicionar um nome ao projeto e publicar o registro DNS são tarefas relacionadas, mas distintas.",
        "A, AAAA, CNAME, TXT e NS têm funções diferentes. O painel atual do host e o DNS autoritativo fornecem valores específicos; não memorize um endereço de outro projeto.",
        "Trocar nameservers muda quem responde por toda a zona. Antes, copie e compare registros necessários, inclusive MX e TXT usados por e-mail, SPF, DKIM e verificações de serviços.",
        "Resposta DNS não comprova que TLS foi emitido nem que a aplicação funciona. Verifique resolução, associação, certificado e resposta HTTPS em etapas separadas.",
        "Esta aula termina em um plano fictício. Validação com domínio real é opcional e não é requisito para concluir o Preview."
      ]
    },
    "sections": [
      {
        "title": "Preview e domínio personalizado",
        "paragraphs": [
          "Um deployment Preview recebe um endereço `vercel.app` do provedor e permite revisar uma versão do projeto. Para este curso, o Preview da branch `testes` é suficiente. Não é preciso comprar domínio para praticar publicação, HTTPS ou fluxo de branches.",
          "Um domínio personalizado é um nome escolhido e controlado pela pessoa ou organização, associado a um projeto de hospedagem. Ele pode oferecer um endereço próprio, mas também depende da renovação do registro e de configuração DNS correta.",
          "Pausa: explique qual endereço usaria para compartilhar a prévia do projeto e qual só existiria depois de associar um domínio próprio."
        ],
        "terms": [
          { "term": "Preview", "meaning": "Deployment de prévia ligado a uma branch ou commit, separado do ambiente Production." },
          { "term": "Domínio personalizado", "meaning": "Nome registrado e controlado pelo proprietário, apontado para um serviço de hospedagem." }
        ]
      },
      {
        "title": "Associação, DNS e registros existentes",
        "paragraphs": [
          "Num fluxo típico, alguém com acesso ao projeto informa o domínio no painel da hospedagem; o painel verifica a associação e apresenta instruções para o provedor DNS. A forma exata varia: pode solicitar A, CNAME, TXT ou nameservers. Não memorize um endereço de outra conta nem use valor de exemplo em produção.",
          "Antes de editar a zona, anote os registros atuais e a função de cada um. MX direciona e-mail; TXT pode carregar verificações e políticas como SPF ou DKIM. Substituir nameservers sem recriar registros pode interromper e-mail, subdomínios ou verificações de outros serviços. Se não conhecer um registro, pare e identifique a dependência.",
          "Pausa: antes de confirmar uma troca de nameservers, que inventário e revisão precisam acontecer?"
        ],
        "terms": [
          { "term": "Registrador", "meaning": "Serviço usado para registrar e renovar o direito de uso de um nome de domínio." },
          { "term": "Provedor DNS", "meaning": "Serviço que publica a zona e responde pelos registros conforme a delegação NS." },
          { "term": "MX", "meaning": "Registro que informa os servidores responsáveis por receber e-mail do domínio." }
        ]
      },
      {
        "title": "Valores específicos e ordem de verificação",
        "paragraphs": [
          "Um serviço pode pedir CNAME para subdomínio, endereço para domínio raiz, ou TXT para demonstrar controle. A instrução que vale é a mostrada no painel atual do projeto e do provedor DNS autoritativo; esses valores podem mudar, então esta aula usa marcadores em vez de números fixos.",
          "Confirme nome/host, tipo, destino ou conteúdo, TTL e se o provedor aceita aquele formato. Evite registros conflitantes. Ao trocar nameservers, a zona passa a ser servida por outros servidores e os registros precisam existir lá também.",
          "Depois de publicar, confira delegação e resposta autoritativa; compare resolvedores e TTL se houver divergência. Em seguida, confira associação, certificado TLS e comportamento da aplicação. Cada etapa precisa de evidência própria."
        ],
        "terms": [
          { "term": "A", "meaning": "Associa um nome a um endereço IPv4." },
          { "term": "CNAME", "meaning": "Faz um nome apontar para outro nome DNS; não é um endereço IP." },
          { "term": "TXT", "meaning": "Armazena texto DNS, muitas vezes usado para comprovação ou política de serviços." }
        ]
      },
      {
        "title": "Plano de mudança e rollback",
        "paragraphs": [
          "Antes de uma mudança real, defina o objetivo e o ambiente, confirme quem controla o registrador, quem hospeda DNS e quem opera a aplicação. Guarde uma cópia dos registros e do estado anterior em local autorizado, sem publicar tokens ou informações internas.",
          "Escreva o plano de reversão antes da alteração: quais registros anteriores serão restaurados, quem pode restaurá-los, como verificar e-mail, subdomínios, HTTPS e aplicação, e como identificar o limite para interromper a mudança. Reverter DNS não apaga imediatamente caches; compare os TTLs.",
          "Esta prática termina no plano. O aluno não compra domínio nem executa mudança real. Para uso apenas em Preview, basta saber como o processo funcionaria e por que valores e validação dependem do ambiente escolhido."
        ]
      }
    ],
    "guided": [
      { "instruction": "Marque no exemplo o que já funciona no Preview e o que só seria necessário para um nome próprio.", "result": "Preview usa endereço do provedor; domínio personalizado exige associação e instruções DNS, mas ambos podem servir o mesmo projeto." },
      { "instruction": "Separe os papéis do registrador, provedor DNS e hospedagem.", "result": "Renovação do domínio, publicação de registros e entrega da aplicação são responsabilidades diferentes." },
      { "instruction": "Revise a lista de registros antes de trocar nameservers.", "result": "O plano preserva MX/TXT e demais serviços antes de delegar a zona a outro provedor." }
    ],
    "mistakes": [
      "Achar que toda publicação exige domínio comprado.",
      "Copiar valores DNS de tutorial ou de outro projeto em vez de seguir o painel atual.",
      "Confundir registrar domínio, delegar nameservers e adicionar A/CNAME.",
      "Apagar MX/TXT sem identificar dependências de e-mail e verificação.",
      "Concluir que DNS funcionando comprova certificado, autorização ou funcionamento da aplicação.",
      "Esperar que rollback DNS elimine imediatamente todos os caches."
    ],
    "exercises": [
      {
        "prompt": "Prever: você só precisa revisar uma mudança na branch `testes`. Compare `https://<deployment>.vercel.app/` com `www.curso.example.test`. Qual endereço pode ser usado sem comprar domínio e qual exige configuração adicional?",
        "expected": "A URL Preview atribuída pelo provedor pode ser usada sem domínio próprio; o nome hipotético exigiria controle do domínio, associação ao projeto e instruções DNS.",
        "criteria": ["Identifica Preview como suficiente para revisar a branch.", "Não recomenda comprar ou configurar domínio para esta prática."],
        "solution": "Use o Preview `vercel.app` para compartilhar a prévia; domínio próprio é opcional e depende de controle e configuração DNS.",
        "explanation": "Endereços de deployment e domínios registrados têm ciclos e responsabilidades diferentes.",
        "hints": ["Pergunte quem forneceu o hostname e quem precisa controlar o nome.", "A aula pode ser concluída sem apontar domínio personalizado."]
      },
      {
        "prompt": "Alterar: o painel hipotético pede um CNAME para `www`, mas a pessoa não sabe se esse nome já tem registros. Descreva as consultas e precauções anteriores à edição.",
        "expected": "A pessoa identifica a zona autoritativa, consulta registros existentes para `www`, confirma tipo e valor atuais e compara o destino fornecido pelo painel; conflito ou dependência não identificada interrompe a mudança.",
        "criteria": ["Confere autoridade e registros atuais antes de editar.", "Não inventa alvo CNAME nem apaga registros automaticamente."],
        "solution": "Verifique a delegação NS e a zona ativa, inventarie `www`, confirme a instrução CNAME do painel e avalie conflitos/dependências antes de planejar a mudança.",
        "explanation": "Registros estão numa zona servida por um provedor específico; outro painel pode não refletir as respostas públicas.",
        "hints": ["Primeiro identifique quem publica a zona.", "Nome e destino devem vir do painel atual, não de exemplos fixos."]
      },
      {
        "prompt": "Construir: faça uma tabela fictícia para `www.curso.example.test` com: papel do serviço, estado atual, instrução do painel, registros a preservar, evidência de conclusão e rollback. Use marcadores, sem valores DNS reais.",
        "expected": "A tabela separa registrador, DNS e hospedagem; usa placeholders fictícios; inventaria MX/TXT; exige validações distintas de DNS, TLS e aplicação; descreve restauração do estado anterior.",
        "criteria": ["Todos os valores são placeholders, não instruções executáveis.", "Preserva explicitamente registros de e-mail/verificação.", "Inclui evidência por camada e rollback observável."],
        "solution": "Exemplo: DNS autoritativo=`<provedor atual>`; tipo=`CNAME`; destino=`<valor exibido no painel>`; MX/TXT=`preservar e comparar`; evidências=`NS/resposta DNS, certificado, resposta HTTPS`; rollback=`restaurar registro anterior e revalidar serviços`. Nada é aplicado a DNS real.",
        "explanation": "Um plano pode ser revisado por outra pessoa sem transformar a aula em instrução copiável de produção.",
        "hints": ["Inclua quem é responsável por cada serviço.", "DNS, certificado e aplicação são verificações distintas."]
      },
      {
        "prompt": "Investigar erro: depois de uma troca hipotética de nameservers, o site abre, mas o recebimento de e-mail falha. Formule hipóteses e liste evidências sem fazer nova alteração.",
        "expected": "A investigação compara a zona antiga e a atual, confirma a delegação NS e procura MX/TXT necessários ao e-mail; o site funcionar não prova que toda a zona foi migrada.",
        "criteria": ["Considera registros de e-mail ausentes ou divergentes na zona atual.", "Confirma nameservers autoritativos antes de editar.", "Evita recomendar outra mudança sem inventário."],
        "solution": "Identifique os NS publicados, compare a zona anterior e atual, confira MX e TXT e envolva quem administra o e-mail. Depois planeje recuperar registros documentados e testar envio/recebimento.",
        "explanation": "A aplicação web pode funcionar enquanto registros independentes de e-mail estão ausentes na zona autoritativa.",
        "hints": ["Trocar nameservers muda a zona consultada pelos visitantes.", "Verifique MX e TXT antes de restaurar qualquer valor."]
      }
    ],
    "quiz": [
      { "question": "Para revisar um Preview da branch `testes`, é obrigatório comprar domínio?", "options": ["Sim, todo Preview depende de domínio próprio.", "Não; a URL `vercel.app` do deployment é suficiente.", "Sim, é preciso trocar NS antes de abrir."], "correctIndex": 1, "explanation": "O endereço do Preview permite a revisão sem domínio personalizado." },
      { "question": "Antes de trocar nameservers, qual cuidado é essencial?", "options": ["Apagar todos os registros antigos.", "Inventariar e recriar no novo provedor os registros necessários, incluindo MX/TXT.", "Copiar o endereço A de um tutorial."], "correctIndex": 1, "explanation": "A zona inteira passa a ser servida pelos nameservers delegados; outros serviços também dependem dos registros." },
      { "question": "O painel mostra um valor CNAME para seu projeto. Qual fonte usar?", "options": ["Um valor fixo de exemplo antigo.", "O valor específico do painel atual e a zona DNS autoritativa.", "Qualquer endereço IP próximo."], "correctIndex": 1, "explanation": "O valor depende do projeto, hostname e estado do provedor." }
    ],
    "summary": [
      "Preview `vercel.app` atende ao uso deste curso sem domínio comprado.",
      "Registrador, provedor DNS e hospedagem podem ser serviços separados.",
      "Valores A, AAAA, CNAME, TXT ou NS devem vir das instruções atuais do projeto e do DNS autoritativo.",
      "Inventarie e preserve MX/TXT, documente rollback e verifique DNS, TLS e aplicação separadamente.",
      "O exemplo é conceitual; não houve validação com domínio real."
    ]
  }
});

// Recuperação após erro no quiz: outra situação para demonstrar a competência.
(() => {
  const retries = {
    "delivery-http": {
      prompt: "No servidor local do laboratório, crie um recurso de livros com GET /api/livros e GET /api/livros/2. Antes de codar, registre método, rota, status, cabeçalho e formato do corpo para lista, item existente e ID ausente.",
      expected: "A lista responde 200 com JSON em forma de array; o item 2 responde 200 com objeto; ID ausente responde 404 com corpo de erro coerente. A interface só acessa campos após validar a forma recebida.",
      hint: "Escreva a tabela de contrato primeiro e compare cada resposta real na aba Rede ou em cliente HTTP."
    },
    "delivery-forms": {
      prompt: "Adapte o formulário local para cadastrar uma sessão de estudo com título e minutos. Tente enviar minutos em texto, provoque falha de rede e repita um envio válido rapidamente; registre o estado do botão, os dados digitados e a lista.",
      expected: "O servidor recusa minutos de tipo inválido sem criar sessão; falha de rede mostra erro e preserva o formulário; o envio válido cria um único registro e o botão volta a ficar disponível.",
      hint: "Modele os estados ocioso, enviando, sucesso e falha; valide no servidor mesmo que o cliente também valide."
    },
    "delivery-security": {
      prompt: "Uma API permite editar notas por ID. Desenhe a verificação no servidor para um usuário autenticado editar a própria nota e para outro tentar editar nota alheia. Teste também uma requisição sem identidade.",
      expected: "A própria nota pode ser alterada; pedido sem autenticação recebe 401; usuário autenticado sem autorização recebe 403; nenhum segredo nem decisão de permissão depende apenas do navegador.",
      hint: "Separe quem fez a requisição de quem é dono do registro; confira ambos antes da escrita."
    },
    "delivery-environments": {
      prompt: "Planeje publicar uma interface estática que consome uma API e usa um banco. Liste onde cada parte rodará, quais configurações são públicas e como verificará a URL final, incluindo uma rota da API e um arquivo CSS.",
      expected: "O plano indica destinos acessíveis ao visitante, mantém segredos fora do frontend e registra respostas reais da página, CSS e API na URL publicada; há um caminho documentado para voltar à versão anterior.",
      hint: "Comece pelo inventário interface → API → banco e teste a partir do navegador de um visitante, não do localhost do desenvolvedor."
    },
    "delivery-oauth-google": {
      prompt: "Um login mediado pelo Clerk termina no Preview, mas o Google informa `redirect_uri_mismatch`. Desenhe as setas do fluxo, marque o callback esperado em cada serviço e escreva três comparações exatas que podem localizar a divergência sem mostrar valores secretos.",
      expected: "A pessoa compara o URI enviado pelo Google ao URI autorizado no cliente OAuth selecionado, confirma callback e ambiente no Clerk e verifica separadamente a URL de retorno permitida do app; não altera DNS, não inventa curingas e não compartilha segredo.",
      hint: "Localize em qual salto a mensagem aparece e diferencie o receptor do callback Google do destino final do navegador."
    },
    "delivery-clerk-supabase": {
      prompt: "A tela de progresso filtra `user_id=eq.user_demo_A`, mas um teste conceitual mostra dados de B ao entrar como A. Revise a comparação do `sub`, os grants/policies e a chave enviada; indique qual evidência distinguiria RLS aberto de credencial privilegiada, sem expor tokens.",
      expected: "A análise confirma estado RLS e policy de SELECT, compara o `sub` autenticado com o proprietário da linha, verifica que o browser usa só chave publicável e procura grants amplos; não conclui a causa sem evidência nem imprime segredo.",
      hint: "O filtro da URL é apenas uma condição do pedido. A decisão final ocorre no banco e pode ser contornada por uma credencial privilegiada."
    },
    "delivery-threat-model": {
      prompt: "Uma nova exportação permite baixar anotações de estudo como JSON. Atualize o modelo com a nova superfície de saída, identifique ameaças a confidencialidade/integridade e defina uma evidência por controle, mantendo dados fictícios.",
      expected: "O fluxo inclui a saída/download e quem a pode iniciar; ameaças incluem exportar dados alheios ou vazar conteúdo; controles exigem autorização por dono, escape/formatos seguros e evidência negativa/positiva em ambiente autorizado.",
      hint: "Siga o dado até a nova saída e pergunte quem recebe o arquivo e quais registros entram nele."
    },
    "delivery-owasp-top10": {
      prompt: "Uma pessoa A autentica normalmente, mas a rota usa o ID da URL para carregar o progresso de B. Explique a diferença entre autenticação e autorização, descreva a correção no servidor e proponha um teste positivo e um negativo para leitura e atualização, somente com os dados fictícios do laboratório local.",
      expected: "A sessão válida identifica A, mas não autoriza acesso a B; a API deve derivar a identidade da sessão validada e conferir o dono do objeto em cada ação. Testes permitem A→A e recusam A→B, confirmando que nenhuma resposta ou alteração de B ocorre.",
      hint: "O cliente controla o ID solicitado. Qual identidade confiável o servidor deve comparar com o proprietário do registro?"
    },
    "delivery-xss-output": {
      prompt: "Uma anotação simples é mostrada em cinco telas. Uma revisão encontrou `innerHTML` na busca, mas não sabe como os outros caminhos renderizam o valor. Defina como rastrear fonte e sinks e critérios de teste que mostrem texto literal após criação, leitura, busca e recarga, usando apenas o exemplo local e um marcador sem efeito externo.",
      expected: "A revisão inventaria cada tela que exibe a anotação, identifica API de parsing por destino e exige que texto simples permaneça literal sem criar nós HTML após gravação, busca ou recarga; a cópia vulnerável não é publicada.",
      hint: "Corrigir um ponto não altera automaticamente os outros lugares que leem o mesmo dado."
    },
    "delivery-csrf": {
      prompt: "Uma API migrou de cookie de sessão para bearer token explícito, mas outro endpoint da mesma aplicação continua usando cookie e permite alterar dados. Desenhe a investigação sem presumir que a mudança eliminou CSRF: liste evidências de envio automático, método, Origin, política CORS, token/atributos de cookie e autorização por operação.",
      expected: "A investigação separa endpoint por endpoint, identifica credencial ambient no caminho que usa cookie, exige método sem mutação para GET, valida token CSRF/origem conforme padrão adotado, revisa SameSite e CORS exato e mantém autorização no servidor; Bearer em outro fluxo não prova imunidade geral.",
      hint: "Rastreie cada pedido e a credencial que o navegador envia nele, não apenas a mudança feita num endpoint."
    },
    "delivery-api-abuse": {
      prompt: "Uma rota de relatórios aceita uma página grande e também pode ser chamada muitas vezes por conta. Proponha testes locais unitários da política para limite por pedido, quota por conta, resposta 429, isolamento entre contas fictícias e nenhuma gravação após rejeição. Explique por que isso não é um teste de carga nem prova da capacidade do Preview.",
      expected: "Os testes usam poucos casos determinísticos e estado isolado: o limite dentro da faixa permite; excesso de tamanho recebe resposta do contrato; excesso da quota recebe 429 e Retry-After; contas têm contadores separados; pedido recusado não grava. Não envia carga nem afirma comportamento remoto.",
      hint: "Teste a regra e o efeito sobre o estado com uma quantidade pequena e conhecida de chamadas em ambiente local próprio."
    },
    "delivery-supply-chain": {
      prompt: "Uma dependência direta parece saudável, mas o lockfile mostra muitos pacotes transitivos. Faça triagem de necessidade, origem, integridade registrada, manutenção/licença, avisos conhecidos, CI e plano de atualização sem instalar nem auditar automaticamente.",
      expected: "A triagem separa campos observados no manifesto/lockfile de consultas atuais pendentes, verifica origem e licença, avalia a árvore transitiva, confere escopo de CI e exige responsável/testes/rollback; não chama lockfile ou scanner de garantia de segurança.",
      hint: "Marque cada afirmação como observada no repositório ou pendente de verificação atual."
    },
    "delivery-redis-foundations": {
      prompt: "Uma proposta adiciona Redis para guardar progresso, cache e contadores. Faça um mapa separando fonte persistente, dados reconstruíveis, TTL, custo operacional e evidência necessária para justificar cada uso.",
      expected: "Progresso permanece no Supabase/PostgreSQL; cache/contadores podem ser reconstruíveis com TTL; qualquer sessão exige requisitos próprios; adoção depende de medida e plano de falha, não de preferência pela ferramenta.",
      hint: "Pergunte o que não pode se perder, o que pode ser reconstruído e qual gargalo medido Redis resolveria."
    },
    "delivery-redis-cache-aside": {
      prompt: "Uma leitura recebe dado antigo depois de atualização no banco. Investigue se houve commit, invalidação após commit, race de leitura, TTL expirado e fallback de Redis; diferencie evidência do script de cache e comportamento de uma API/Postgres real.",
      expected: "A investigação rastreia ordem de commit e DEL, estado da key/TTL e leitura concorrente; propõe correção limitada e registra que o script usa fonte Map simulada e não verifica PostgreSQL.",
      hint: "Observe se uma leitura antiga pode gravar valor de volta depois de uma invalidação."
    },
    "delivery-redis-rate-limit": {
      prompt: "Um endpoint recebe chamadas rápidas de contas diferentes e um mesmo IP compartilhado. Desenhe políticas separadas por conta/IP confiável, janela, efeito 429/Retry-After, privacidade e comportamento se Redis estiver fora.",
      expected: "Políticas separam identidade da conta e sinal IP/NAT, limitam dados e tempo, recusam sem efeito, escolhem fail-open/closed por operação e deixam explícito que o laboratório local limita por IP observado, não por conta autenticada, nem comprova produção.",
      hint: "O limite controla frequência, mas a chave também precisa respeitar identidade confiável e privacidade."
    },
    "delivery-ci": {
      prompt: "Uma publicação altera a validação de minutos e o POST começa a aceitar -5. Defina um teste que falhe antes da correção, indique onde a CI deve executá-lo e descreva como conter a versão ruim enquanto investiga.",
      expected: "O teste envia -5 e espera recusa sem novo registro; a execução da CI mostra a falha antes da correção e passa depois; o plano de contenção verifica a versão recuperada na URL final.",
      hint: "Cubra a regra da API e o efeito no armazenamento, não apenas a mensagem da interface."
    },
    "delivery-requirements": {
      prompt: "O cliente pede prioridade para sessões de estudo já cadastradas. Escreva critérios de aceite para valor padrão, valores permitidos, edição e registros antigos; depois proponha testes e uma atualização honesta do README.",
      expected: "Cada critério informa entrada, ação e resultado visível; os testes incluem dados antigos sem prioridade e valor inválido; o README separa o que foi implementado do que ainda está planejado.",
      hint: "Trate a mudança como alteração de contrato e avalie interface, API, dados e documentação."
    },
    "delivery-web-foundations": {
      prompt: "Uma pessoa transfere o domínio de registrador, mantém a hospedagem da aplicação e escolhe um terceiro provedor DNS. Esboce a sequência de preparação e um teste para cada camada antes de trocar a delegação.",
      expected: "O plano preserva e confere os registros DNS existentes, identifica o nameserver autoritativo e testa resolução, associação do domínio ao host e resposta HTTP sem presumir que as três empresas são a mesma.",
      hint: "Inventarie os serviços e registros antes da transferência; valide do DNS até a resposta do site em etapas separadas."
    },
    "delivery-dns": {
      prompt: "Um serviço pede que você adicione um TXT para verificar example.test. Escreva um plano que confirma nome e valor atuais, preserva registros existentes e verifica a resposta sem publicar um token real neste rascunho.",
      expected: "O plano usa o valor fornecido pelo painel atual, registra o nome exato e TTL, evita remover outros registros e consulta o DNS autoritativo/resolvedor depois de salvar.",
      hint: "Valores TXT de verificação são específicos; mantenha um marcador fictício neste exercício e procure a instrução vigente no serviço."
    },
    "delivery-https": {
      prompt: "Uma equipe recebe alerta de certificado ao acessar app.example.test, embora http:// redirecione para https://. Registre evidência, hipótese sobre hostname ou estado do certificado e próximo teste sem contornar o aviso.",
      expected: "O procedimento abre HTTPS diretamente sem enviar dados, compara o hostname solicitado com a cobertura do certificado e consulta estado/associação no provedor antes de corrigir.",
      hint: "O redirecionamento não prova que o certificado do destino é válido. Compare os nomes e o estado da emissão."
    },
    "delivery-hosting-models": {
      prompt: "Um relatório local funciona, mas desaparece depois de o processo ser reiniciado. Desenhe uma alteração para manter os relatórios e inclua um teste de recuperação em ambiente isolado.",
      expected: "A proposta coloca os dados em armazenamento durável apropriado e comprova escrita, reinício e leitura, mantendo backup/restauração e limites do serviço no plano.",
      hint: "Identifique primeiro se o dado estava em memória, no sistema de arquivos efêmero ou em um banco durável."
    },
    "delivery-static-deploy": {
      prompt: "O Preview abre o HTML do laboratório, mas o CSS retorna 404. Confira o caminho `/labs/deployment-static/styles.css`, a referência relativa no HTML e a presença do arquivo no commit; se o Preview pedir login, registre a proteção sem tentar removê-la.",
      expected: "A investigação compara caminho, referência e commit, sem mudar DNS ou exigir domínio próprio; uma tela de login é identificada como controle de acesso.",
      hint: "HTML e CSS estão na mesma pasta. Um 404 de recurso é diferente de uma falha de resolução do hostname."
    },
    "delivery-dns-resolution": {
      prompt: "Uma pessoa tenta `www.curso.example.test` e não recebe resposta pública. Explique por que isso não demonstra que o resolvedor está com defeito e descreva como estudaria o fluxo usando um hostname Preview real sem expor dados de sessão.",
      expected: "`.test` é reservado para exemplos e não representa um destino público; o estudante pode traçar o papel do resolvedor e usar um hostname Preview se permitido, separando DNS de acesso HTTP e proteção Vercel.",
      hint: "Separe o nome reservado do hostname real. Uma resposta DNS, uma resposta HTTP e uma tela de autenticação são observações de camadas diferentes."
    },
    "delivery-custom-domain": {
      prompt: "Uma equipe de demonstração em Preview decide não comprar domínio. Em seguida, um colega propõe migrar nameservers para preparar um domínio hipotético. Escreva uma revisão que indique o que é desnecessário agora e quais registros precisariam ser inventariados antes de qualquer migração futura.",
      expected: "A equipe pode seguir usando o Preview sem domínio ou mudança DNS; numa futura migração, deverá identificar autoridade e preservar registros existentes como MX/TXT antes de delegar a zona.",
      hint: "Diferencie a necessidade atual de compartilhar um Preview da decisão futura de controlar um nome próprio; trocar NS afeta a zona toda."
    }
  };

  for (const [id, retry] of Object.entries(retries)) LESSON_GUIDES[id].retry = retry;
})();

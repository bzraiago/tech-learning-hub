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

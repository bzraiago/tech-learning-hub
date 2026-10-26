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
        "expected": "Previsão registrada: inicialmente 404; após a alteração, /api/saude responde 200 com ok verdadeiro."
      },
      {
        "prompt": "Alterar: na tabela de contrato do laboratório, documente /api/estudos com método, status, tipo de resposta e nomes/tipos de campos. Depois mude temporariamente titulo para name no servidor e indique qual linha da tabela precisa mudar.",
        "hints": [
          "Método é GET e status 200.",
          "O corpo é array de objetos; id é número e titulo é texto."
        ],
        "solution": "GET /api/estudos; 200; Content-Type: application/json; corpo: [{id:number, titulo:string}].",
        "explanation": "Especificar tipos permite detectar mudanças incompatíveis.",
        "expected": "Contrato tem rota, status, mídia e campos; a mudança temporária troca titulo:string por name:string e exige ajuste no cliente e nos testes."
      },
      {
        "prompt": "Construir: crie GET /api/estudos/1 que devolva apenas o primeiro item; id ausente devolve 404.",
        "hints": [
          "Interprete o último segmento da URL.",
          "Procure no array antes de responder."
        ],
        "solution": "const match = req.url.match(/^\\/api\\/estudos\\/(\\d+)$/);\nif (req.method === 'GET' && match) {\n  const id = Number(match[1]);\n  const item = estudos.find(e => e.id === id);\n  res.writeHead(item ? 200 : 404);\n  res.end(JSON.stringify(item || { erro: 'Não encontrado' }));\n  return;\n}",
        "explanation": "Coloque antes da rota padrão 404. Use uma condição de caminho explícita para não aceitar entradas arbitrárias.",
        "expected": "/1 → 200 com HTML; /9 → 404."
      },
      {
        "prompt": "Investigar erro: a interface espera dados[0].titulo, mas a API passa a enviar {items:[...]}. Observe a forma real na aba Rede, descreva a divergência e proponha duas correções verificáveis.",
        "hints": [
          "Observe primeiro a forma real no painel Rede.",
          "O contrato e o cliente precisam concordar."
        ],
        "solution": "Correção A: servidor volta a entregar o array contratado. Correção B: contrato passa a declarar {items:Array} e cliente usa dados.items[0].titulo; atualize testes e documentação.",
        "explanation": "Uma mudança de forma pode quebrar o consumidor com status 200; alinhe as duas pontas.",
        "expected": "Explicação identifica divergência estrutural e impacto."
      },
      {
        "prompt": "Extensão opcional com serviço real: em Node.js 18+, consulte GET https://api.github.com/repos/mdn/content sem token. Mostre full_name e o tipo de stargazers_count. Se houver falha de rede ou limite de requisições, registre o status e continue com o mock local.",
        "hints": [
          "A documentação do GitHub permite leitura pública sem autenticação, sujeita a limite.",
          "Verifique response.ok antes de ler os campos."
        ],
        "solution": "async function consultar(){ const r=await fetch('https://api.github.com/repos/mdn/content',{headers:{Accept:'application/vnd.github+json'}}); if(!r.ok) throw new Error('HTTP '+r.status); const d=await r.json(); console.log(d.full_name,typeof d.stargazers_count); } consultar().catch(e=>console.error('Consulta indisponível:',e.message));",
        "explanation": "Este exercício requer internet e o serviço de terceiros. Não há garantia de disponibilidade ou quantidade fixa de estrelas; requisições não autenticadas têm limite documentado. O mock local é suficiente para a aula.",
        "expected": "Quando disponível, imprime mdn/content e number; em falha, informa motivo sem quebrar o laboratório."
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
    "setup": "Na pasta da aula, pare o servidor anterior com Ctrl+C no terminal. Salve o exemplo como server.js nessa pasta e execute node server.js no terminal; a saída esperada é Abra http://127.0.0.1:4178/. Abra esse endereço no navegador e use a aba Rede para observar GET e POST. Para retomar, execute o mesmo comando; se a porta estiver ocupada, encerre o processo anterior. O exemplo usa o servidor nativo do Node.js, sem pacote adicional.",
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
        "expected": "Enquanto aguarda, botão indisponível; ao terminar, disponível."
      },
      {
        "prompt": "Alterar: consulte GET /api/estudos ao abrir a página e mostre uma mensagem para a lista vazia. Diferencie [] de falha da requisição. Aceite: entrada [] → Nenhum estudo cadastrado; erro HTTP → Falha ao carregar.",
        "hints": [
          "Confira resposta.ok antes de usar os dados.",
          "Array vazio é sucesso."
        ],
        "solution": "(async () => { try { const resposta = await fetch('/api/estudos'); if (!resposta.ok) throw new Error('Falha ao carregar'); const itens = await resposta.json(); estado.textContent = itens.length ? 'Estudos carregados.' : 'Nenhum estudo cadastrado.'; } catch { estado.textContent = 'Falha ao carregar.'; } })();",
        "explanation": "Uma resposta válida com zero itens não é erro de rede.",
        "expected": "[] mostra mensagem de vazio, não falha."
      },
      {
        "prompt": "Construir: no Console da página, escreva uma verificação que envie {titulo:123} à API e compare a quantidade de estudos antes e depois. Aceite: POST retorna 400 com erro e a lista não cresce; entrada: título numérico 123; saída: erro Título inválido.",
        "hints": [
          "A rota já faz typeof titulo.",
          "Teste com fetch usando body JSON.stringify({titulo:123})."
        ],
        "solution": "(async () => { const antes = await (await fetch('/api/estudos')).json(); const resposta = await fetch('/api/estudos', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({titulo:123})}); const erro = await resposta.json(); const depois = await (await fetch('/api/estudos')).json(); console.assert(resposta.status === 400 && depois.length === antes.length, 'Recusa ou lista divergente'); console.log(resposta.status, erro); })().catch(console.error);",
        "explanation": "Execute no Console da página local; a proteção está no servidor.",
        "expected": "400 e {erro:\"Título inválido\"}; nada é adicionado."
      },
      {
        "prompt": "Investigar erro: o servidor retorna 400 com JSON, mas a UI diz sucesso. Localize a verificação ausente, corrija e confirme que a lista não muda. Aceite: entrada {titulo:123} → mensagem de erro e nenhum item novo.",
        "hints": [
          "Fetch não rejeita automaticamente por 400.",
          "Leia o corpo e verifique ok."
        ],
        "solution": "const dados = await resposta.json(); if (!resposta.ok) throw new Error(dados.erro || 'Falha ao salvar'); estado.textContent = 'Salvo com sucesso.';",
        "explanation": "O teste deve afirmar que a lista não muda em 400.",
        "expected": "Mensagem de falha e nenhum item novo."
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
        "expected": "Dados ausentes ou ids inválidos resultam false."
      },
      {
        "prompt": "Alterar: crie uma tabela com token ausente, usuário autenticado sem permissão e rota inexistente; associe 401, 403 e 404 e explique qual verificação do servidor levou a cada decisão. Aceite: três situações classificadas; entrada: rota inexistente → 404.",
        "hints": [
          "Pense em autenticação, autorização e roteamento.",
          "Use 401, 403, 404."
        ],
        "solution": "Token ausente: 401; autenticado sem permissão: 403; rota inexistente: 404.",
        "explanation": "A escolha precisa refletir o motivo da falha, sujeito ao contrato da API.",
        "expected": "Três códigos associados às condições."
      },
      {
        "prompt": "Construir: desenhe o fluxo de uma chamada a serviço externo com chave privada, marcando onde a chave fica e qual resposta chega ao navegador. Aceite: chave só no servidor e retorno limitado aos dados autorizados; entrada: pedido de relatório → saída: relatório sem segredo.",
        "hints": [
          "Tudo no bundle do browser é legível.",
          "O servidor pode mediar a chamada."
        ],
        "solution": "Guardar chave no ambiente do servidor; o backend verifica usuário e permissão, chama o provedor e devolve somente dados autorizados. Nunca enviar a chave ao navegador.",
        "explanation": "Evite registrar ou retornar o segredo em mensagens de erro.",
        "expected": "Plano separa segredo privado e resposta pública."
      },
      {
        "prompt": "Investigar erro: CORS bloqueia no navegador, mas um cliente de terminal obtém dados privados sem credencial. Identifique a falha e proponha uma segunda verificação pelo servidor. Aceite: resposta distingue CORS de autorização; entrada: pedido sem credencial → saída esperada: acesso negado.",
        "hints": [
          "CORS é política do navegador.",
          "Teste autorização no servidor."
        ],
        "solution": "A API não exige autenticação/autorização; configurar CORS não protege contra outros clientes. Corrigir verificação de identidade e permissão no servidor.",
        "explanation": "A causa de exposição é a falta de controle de acesso, não o cabeçalho de CORS.",
        "expected": "Explicação distingue mecanismo de browser e segurança da API."
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
        "expected": "Três verificações concretas, com resultado registrado."
      },
      {
        "prompt": "Alterar: no plano de entrega, o frontend está no GitHub Pages e a API apenas em 127.0.0.1 do desenvolvedor. Ajuste o plano para não prometer gravação compartilhada. Aceite: explicar o destino de 127.0.0.1 e escolher API hospedada ou demonstração rotulada; entrada: visitante envia formulário → saída: comportamento descrito sem promessa falsa.",
        "hints": [
          "127.0.0.1 significa o computador de quem visita.",
          "Hospedagem estática não executa Node."
        ],
        "solution": "Não. É preciso publicar a API em hospedagem de backend ou trocar por demonstração sem gravação remota, identificada como tal.",
        "explanation": "A arquitetura deve corresponder à promessa de comportamento.",
        "expected": "Resposta explica por que URL local não funciona para visitantes."
      },
      {
        "prompt": "Construir: faça uma configuração pública que retorne a URL local para desenvolvimento e recuse ambiente desconhecido. Aceite: entrada desenvolvimento → http://127.0.0.1:4178/api; entrada teste → erro Ambiente inválido.",
        "hints": [
          "Use um objeto de opções.",
          "Valide antes de retornar."
        ],
        "solution": "const opcoes={desenvolvimento:'http://127.0.0.1:4178/api'}; function apiPara(ambiente){ if(!Object.hasOwn(opcoes,ambiente)) throw new Error('Ambiente inválido'); return opcoes[ambiente]; }",
        "explanation": "Separar configuração pública deixa o destino visível.",
        "expected": "desenvolvimento retorna URL local; outro valor gera erro."
      },
      {
        "prompt": "Investigar erro: o CSS deste projeto retorna 404 quando index.html é publicado em /tech-learning-hub/. O link foi alterado para /assets/css/global.css. Escreva hipótese, correção e verificação na aba Rede. Aceite: entrada caminho absoluto → 404; saída com caminho relativo → CSS 200.",
        "hints": [
          "Compare a URL pedida em Rede com a pasta real.",
          "Caminho absoluto /style.css aponta para raiz do domínio."
        ],
        "solution": "Hipótese: href=\"/assets/css/global.css\" procura na raiz do domínio. Se index.html está em /tech-learning-hub/, usar href=\"assets/css/global.css\" e confirmar 200 em Rede no endereço publicado.",
        "explanation": "Teste antes e depois no endereço publicado; avalie também outros assets.",
        "expected": "CSS carrega 200 e a aparência volta."
      }
    ],
    "mistakes": [
      "Achar que hospedagem estática executa servidor Node.",
      "Manter URL localhost na configuração publicada.",
      "Publicar sem abrir o endereço final e testar fluxo completo.",
      "Gravar segredos no frontend por serem chamados de variáveis de ambiente."
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
      "Ambientes usam configuração explícita; segredos não entram no frontend.",
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
        "expected": "Três testes aprovados."
      },
      {
        "prompt": "Alterar: amplie a matriz do laboratório delivery-forms com POST válido, título vazio e servidor desligado. Aceite: para cada entrada, anote resposta HTTP ou falha de rede, estado da interface e se o título permanece; entrada servidor desligado → erro de rede, sem status HTTP.",
        "hints": [
          "Não use o mesmo status para todas as linhas.",
          "Falha de rede pode não produzir status HTTP."
        ],
        "solution": "Válido → 201 e registro; vazio → 400 e mensagem, sem registro; servidor parado → erro de rede mostrado pela interface, título preservado.",
        "explanation": "A matriz une contrato do servidor e estado do cliente.",
        "expected": "Três casos com resultado verificável."
      },
      {
        "prompt": "Construir: implemente uma função que remove títulos duplicados sem alterar a entrada e escreva teste independente para saída e entrada. Aceite: entrada ['HTML','HTML','CSS'] → saída ['HTML','CSS']; array original mantém três elementos.",
        "hints": [
          "Prepare array original e cópia.",
          "Verifique saída e entrada."
        ],
        "solution": "function unicos(valores){return [...new Set(valores)];} test('remove duplicatas sem mutar',()=>{const entrada=['HTML','HTML','CSS'];assert.deepEqual(unicos(entrada),['HTML','CSS']);assert.deepEqual(entrada,['HTML','HTML','CSS']);});",
        "explanation": "Use node:test e assert/strict do exemplo; mutação da entrada seria defeito adicional.",
        "expected": "Teste passa e entrada mantém três elementos."
      },
      {
        "prompt": "Investigar erro: após uma nova versão, POST /api/estudos retorna 500. Registre evidências, proponha contenção, reproduza com entrada mínima e descreva teste de regressão e verificação final. Aceite: informe versão, rota, resultado observado, ação de recuperação e nova prova; entrada título HTML → resposta esperada 201 após a correção.",
        "hints": [
          "Inclua versão e rota.",
          "Considere voltar à versão estável."
        ],
        "solution": "Registrar versão, horário, POST e 500; avaliar impacto; restaurar versão estável se necessário; reproduzir com entrada mínima; corrigir; adicionar regressão; rodar testes e verificar URL final.",
        "explanation": "O fluxo cobre diagnóstico e redução de impacto, não só alteração do código.",
        "expected": "Relato tem observação, contenção e prova posterior."
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
        "expected": "Nenhuma falha no Console."
      },
      {
        "prompt": "Alterar: amplie os critérios de aceitação para lista vazia e título só de espaços. Aceite: cada critério traz contexto, ação e resultado visível; entrada lista vazia e HTML → um registro; entrada '   ' → mensagem e lista inalterada.",
        "hints": [
          "Um caso deve aceitar e o outro recusar.",
          "Inclua resultado visível da interface."
        ],
        "solution": "Dada lista vazia, quando adiciono HTML, então um registro HTML aparece. Dado título “   ”, quando tento salvar, então vejo mensagem de validação e a lista não muda.",
        "explanation": "Critérios usam contexto, ação e resultado observável.",
        "expected": "Dois critérios verificáveis."
      },
      {
        "prompt": "Construir: acrescente à regra isolada um limite de 60 caracteres após trim, preservando recusa de duplicados. Aceite: entrada de 60 caracteres únicos → true; 61 caracteres ou título duplicado → false. Explique que a API ainda precisa da mesma validação.",
        "hints": [
          "Valide comprimento antes de consultar a lista.",
          "Use a regra anterior para comparação."
        ],
        "solution": "function podeAdicionarComLimite(lista,titulo){const limpo=titulo.trim();return limpo.length>0 && limpo.length\u003c=60 && podeAdicionar(lista,limpo);}",
        "explanation": "Pressupõe string, como o contrato do formulário; a API deve validar tipo e limite também.",
        "expected": "61 caracteres rejeitados, 60 aceitos se únicos."
      },
      {
        "prompt": "Investigar erro: o README diz que o servidor já recusa duplicados, mas server.js da aula delivery-forms ainda aceita. Revise o README para separar comportamento comprovado e regra planejada. Aceite: comandos existentes, persistência em memória e pendência da API explícitos; entrada dois POSTs com HTML → duplicata ainda possível no servidor anterior.",
        "hints": [
          "Diga comandos exatos.",
          "Não prometa banco se houver só memória."
        ],
        "solution": "# Lista de estudos\nExecute: node server.js; abra http://127.0.0.1:4178/.\nVerifique a regra isolada: node requisito.js imprime false e true.\nDados: memória do servidor; reiniciar apaga os registros.\nPendente: integrar a recusa de duplicados ao server.js e testá-la pela API. O servidor anterior ainda aceita títulos repetidos.\nLimite: sem autenticação ou banco; projeto demonstrativo.",
        "explanation": "Comandos e afirmações devem corresponder aos arquivos realmente executados; revise o README após integrar e testar a API.",
        "expected": "Outra pessoa consegue executar e sabe que a regra de duplicados ainda não protege o servidor."
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
    }
  };

  for (const [id, retry] of Object.entries(retries)) LESSON_GUIDES[id].retry = retry;
})();

# Protocolo de validação com alunos

**Estado:** protocolo pronto para uso; nenhuma sessão com aluno foi realizada.

## Objetivo e limites

Observar se uma pessoa consegue usar as instruções do curso para concluir tarefas reais, onde trava e que tipo de ajuda precisa. A sessão avalia o material e o percurso, não a inteligência, velocidade ou valor da pessoa.

Uma sessão isolada produz evidência qualitativa, não uma estimativa estatística. Marcar uma aula como concluída, acertar um quiz ou terminar uma tarefa com ajuda não comprova domínio. Para registrar “resolvi sozinho”, a pessoa precisa resolver uma tarefa de transferência diferente e explicar as decisões.

## Privacidade e segurança da sessão

- Convide participantes voluntariamente; explique o objetivo, a duração aproximada e o que será anotado antes de começar. A pessoa pode parar sem justificar.
- Use um código de sessão, como `iniciante-01`; não registre nome, e-mail, senha, token, endereço ou conteúdo pessoal nas notas.
- Use cópia descartável do projeto e dados fictícios. Não peça login em contas pessoais nem altere dados do site publicado.
- Faça anotações sem gravação por padrão. Se gravação de tela ou áudio for realmente necessária, explique finalidade, acesso e retenção e obtenha consentimento separado antes de iniciar. Sem consentimento, não grave.
- Separe observação literal de interpretação. Guarde apenas o necessário para corrigir o curso e restrinja o acesso às notas brutas.

## Participantes e percursos

Não é necessário que a mesma pessoa faça todos os percursos. Registre somente o código e o critério de seleção:

| Percurso | Pessoa indicada | Sessão sugerida | Evidência buscada |
|---|---|---:|---|
| Etapa 0 | Pessoa que ainda não programa e não usou terminal para executar código | 30–45 min | Cria arquivo, localiza a pasta, abre a página, executa um comando e registra um erro com contexto |
| Projeto básico | Aluno que concluiu as trilhas do nível básico | 60–90 min, ou duas sessões | Reconstrói o projeto pelo README, testa os comportamentos e implementa a mudança de prioridade sem consultar uma solução |
| Projeto júnior | Aluno que concluiu a trilha full-stack correspondente | 90–120 min, ou sessões separadas | Reproduz o ambiente, segue uma requisição até o banco, testa uma falha e implementa uma mudança com regressão |
| Instalação | Pessoa com acesso a cada sistema operacional disponível | 20–40 min por sistema | Segue as instruções de instalação e compara a saída observada com a esperada |

Os tempos são apenas para reservar a sessão; não são metas de velocidade. Se uma tarefa levar mais tempo, deixe a pessoa continuar ou registre onde a sessão foi interrompida.

## Convite e seleção

Use o texto abaixo como convite individual. A participação é voluntária; não envie convites em nome do projeto sem autorização do responsável.

> Estou revisando um curso gratuito de programação e procuro uma pessoa para experimentar uma atividade por cerca de 30–45 minutos. Não é uma prova sobre você: quero descobrir se as instruções do material estão claras. Você pode parar a qualquer momento. Vou fazer anotações sem nome e sem gravar a sessão. Não será necessário entrar em contas pessoais, informar senhas ou usar dados reais. Você teria interesse em participar?

Antes de marcar a sessão, explique qual percurso será observado e confirme que a pessoa pode interromper sem justificar. Para a Etapa 0, selecione alguém que ainda não programe e não use terminal para executar código; para outros percursos, use somente os critérios da tabela acima. Registre a categoria de seleção, nunca a resposta identificável ou dados de contato neste protocolo.

Não prometa que a atividade será fácil, não ofereça a solução como condição de participação e não pressione alguém que recuse. Se houver compensação ou gravação, explique essas condições separadamente e obtenha consentimento explícito antes de combinar.

## Preparação

1. Escolha uma cópia descartável do material e confirme que os passos podem ser repetidos sem apagar dados reais.
2. Abra o curso no estado em que o aluno o receberia; não deixe previamente aberta a aula ou a resposta que será avaliada.
3. Prepare uma folha de observação vazia e um relógio. Não grave a tela por padrão.
4. Anote o sistema operacional, editor e ferramentas necessárias à tarefa; não registre identificadores pessoais do dispositivo.
5. Defina antes da sessão os critérios de conclusão da tarefa e os erros que seriam bloqueantes. Não altere o critério depois de ver a tentativa.

## Roteiro de abertura

Leia sem improvisar instruções que entreguem o caminho:

> “Quero observar como este material funciona para você. Estou testando as instruções, não você. Faça o que faria normalmente e pense em voz alta quando for natural. Eu posso ficar em silêncio por alguns momentos para observar. Você pode pedir ajuda, pausar ou parar quando quiser. Vou anotar somente o que for necessário, sem registrar dados pessoais. Tudo bem começar?”

Se a pessoa não quiser participar, encerre sem pressionar. Não solicite explicação sobre a recusa.

## Como observar sem induzir

Durante a tentativa, aguarde alguns segundos antes de intervir. Se a pessoa travar ou pedir ajuda, use a menor pergunta útil, nesta ordem:

1. “O que você esperava que acontecesse?”
2. “O que aconteceu?”
3. “Qual foi a última coisa que você tentou?”
4. “Que arquivo, mensagem ou parte da aula parece relevante?”

Não diga onde clicar, qual arquivo abrir ou qual correção aplicar antes de registrar a tentativa independente. Se precisar fornecer uma pista para que a pessoa continue, anote o nível de ajuda e o ponto exato em que foi necessário. Não deixe alguém frustrado para preservar um cronômetro.

Perguntas finais neutras:

- “Qual parte foi mais difícil de decidir?”
- “Como você verificou que terminou?”
- “O que faria se precisasse retomar amanhã?”
- “Que instrução você procurou e não encontrou?”

Evite “foi fácil?”, “você gostou?” durante as tarefas ou perguntas que sugiram a resposta correta.

## Tarefas observáveis

### Etapa 0

Em uma pasta temporária e com dados fictícios, peça para a pessoa:

1. Criar uma pasta e um arquivo `.html` com um título visível.
2. Abrir o arquivo no navegador e mostrar onde está o arquivo que está sendo executado.
3. Abrir o terminal na mesma pasta e mostrar a pasta atual (`Get-Location` no PowerShell ou `pwd` no macOS/Linux).
4. Executar uma busca deliberada por um arquivo inexistente na pasta descartável e registrar a mensagem de erro, a ação anterior e o resultado esperado.

Não dite extensões, caminhos ou comandos antes da tentativa. Critério de conclusão: a pessoa consegue apontar editor, navegador e terminal, localizar a pasta/arquivo e copiar o erro com contexto. Se o comando específico falhar por diferença do shell, anote a instrução faltante; não classifique a pessoa como incapaz.

### Projeto básico

Use o projeto “Organizador pessoal de estudos” do aluno ou uma cópia de avaliação. Peça para reconstruir o ambiente pelo README, demonstrar cadastro/edição/conclusão/exclusão/filtro e persistência após recarga, executar testes e atender a uma mudança não anunciada previamente: adicionar prioridade à tarefa.

Observe separadamente: reprodução pelo README; comportamento anterior preservado; comportamento novo; teste de regressão; explicação da decisão. Não mostre código de referência antes de registrar a tentativa.

### Projeto júnior

Use a “Plataforma de acompanhamento de estudos” do aluno em uma cópia isolada. Peça para seguir uma requisição desde a interface até validação, regra de negócio e persistência; executar a suíte indicada no README; investigar um caso inválido sem escrever no banco; e implementar uma mudança pequena de requisito protegida por teste.

Confirme que a pessoa consegue reconstruir o ambiente e explicar quais evidências mostram que a mudança não quebrou o comportamento anterior. Faça a tarefa em etapas se o ambiente, a suíte e a mudança não couberem em uma sessão. Não use dados pessoais nem banco de produção.

### Instalações por sistema operacional

Quando houver acesso a Windows, macOS e Linux, execute a mesma instalação em uma máquina/cópia adequada para cada sistema. Registre comandos exatamente como digitados, ferramenta e versão observadas, saída, erro e retomada. “Não testado neste sistema” deve permanecer explícito; não extrapole o sucesso de um sistema para os outros.

## Registro da sessão

Copie este bloco por sessão:

```text
Código da sessão:
Percurso/aula/projeto e versão do material:
Critério de seleção do participante (sem nome ou contato):
Sistema/editor/ferramentas relevantes:
Data e duração aproximada:
Tarefa e critério definido antes da tentativa:
Resultado: concluiu sem ajuda / concluiu com pista / parcial / interrompeu:
Tempo observado e ponto de interrupção:
Ajuda fornecida (pergunta/pista exata e momento):
Mensagem de erro ou comportamento observado (transcrição sem dados pessoais):
Ação anterior e resultado esperado pela pessoa:
Observação literal:
Interpretação separada da observação:
Severidade e frequência observada:
Tarefa de transferência diferente e explicação da decisão:
O que não foi testado:
```

Classifique achados de forma proporcional: **bloqueante** impede iniciar ou continuar; **alta** faz aprender uma regra errada ou ameaça dados; **média** causa interrupção recuperável; **baixa** é atrito ou polimento. Registre quantas sessões observaram o achado, sem transformar uma ocorrência em estimativa de prevalência.

## Análise, correção e reteste

1. Agrupe observações por tarefa e ponto do percurso; mantenha as mensagens literais separadas de hipóteses sobre a causa.
2. Priorize bloqueantes e severidade alta. Antes de alterar o curso, reproduza o problema em uma cópia isolada e mude uma coisa por vez.
3. Registre o material alterado e o critério que deveria melhorar.
4. Reaplique uma tarefa diferente que use a mesma competência. Não repita apenas o exemplo visto na correção.
5. Registre se a pessoa resolveu sozinha, com ajuda, parcialmente ou não resolveu; peça que explique as decisões.
6. Atualize o perfil e as dificuldades recorrentes em `AGENTS.md` somente com evidência suficiente e sem informação identificável.

Uma melhoria pode ser marcada como “conteúdo coberto” quando existe instrução; “usável” quando a pessoa consegue percorrer; “domínio observado” só quando a pessoa resolve uma tarefa nova e explica. Um piloto pequeno não comprova domínio geral nem sustenta sozinho uma promessa de nível.

## Relatório final

Ao fechar um ciclo, publique um resumo sem nomes ou gravações:

- percursos e tarefas executados, versões do conteúdo e sistemas realmente testados;
- número de sessões por perfil de seleção, sem identificar participantes;
- conclusão, ajuda necessária, tempo observado e pontos de interrupção por tarefa;
- erros e dúvidas recorrentes, evidência literal redigida e severidade;
- mudanças feitas e resultado do reteste com tarefa diferente;
- limitações, sistemas ou percursos não testados;
- separação explícita entre cobertura do curso, uso observado e domínio demonstrado.

O protocolo está pronto; os campos de resultados devem permanecer vazios até haver sessões reais. Não invente observações ou participantes para preencher o relatório.

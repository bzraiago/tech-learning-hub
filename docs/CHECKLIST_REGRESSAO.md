# Checklist manual de regressão

Use este checklist depois das verificações automatizadas e antes de publicar alterações funcionais ou de conteúdo. Registre no commit ou pull request os itens executados e qualquer limitação.

## Preparação

- [ ] Executar `node scripts/validate-content.js` sem erros.
- [ ] Abrir a aplicação em navegador moderno com acesso à internet.
- [ ] Abrir as ferramentas de desenvolvimento e confirmar ausência de erros no console.
- [ ] Usar dados de teste fictícios; não apagar progresso real sem autorização.

## Carregamento e navegação

- [ ] A página inicial mostra 9 trilhas e 114 aulas no total.
- [ ] A trilha ativa, os módulos e os cards de progresso aparecem corretamente.
- [ ] Busca encontra uma aula de outra trilha e permite limpar o resultado.
- [ ] Filtros “Todas”, “Pendentes” e “Concluídas” atualizam a listagem.
- [ ] “Começar/Continuar minha jornada” abre a aula esperada.
- [ ] Uma aula de cada trilha alterada abre sem conteúdo ausente.

## Aula, quiz e anotações

- [ ] Abas Conceitos, Exemplo, Prática, Revisão e Fontes funcionam.
- [ ] Em `prep-tools`, cada exercício mostra resultado esperado e critérios antes do rascunho; dicas e solução continuam recolhidas.
- [ ] Em `prep-files`, os quatro critérios aparecem antes da dica e a tarefa de investigar erro não antecipa as duas hipóteses.
- [ ] Em `prep-workspace`, os quatro critérios verificam contexto de pasta, navegação, registro da sessão real e diagnóstico sem antecipar a solução.
- [ ] Em `prep-cycle`, a previsão ocorre antes da execução e o resultado esperado não antecipa a saída literal; a investigação exige uma ação e um sinal de encerramento.
- [ ] Em `prep-errors`, a prova registra evidências realmente observadas e a tarefa de relato distingue fatos de hipóteses.
- [ ] Nas aulas `setup-editor`, `setup-python`, `setup-git` e `setup-node`, os quatro exercícios mostram critérios; previsão e diagnóstico não antecipam respostas ou versões.
- [ ] Em `setup-docker`, os quatro critérios distinguem cliente, Engine e Compose, preservam a ordem dos pré-requisitos e não recomendam permissões sem avaliar seu impacto.
- [ ] Em `setup-docker-alternative`, os critérios aparecem antes das dicas; a previsão não revela a contagem e o relatório distingue SQLite executado de Docker/PostgreSQL pendentes.
- [ ] Em `setup-postgresql`, os quatro exercícios mostram critérios antes das dicas; a previsão não lista as respostas e o diagnóstico preserva volume e senha.
- [ ] Em `setup-mariadb`, `setup-firebird` e `setup-mongodb`, os critérios correspondem aos diagnósticos de cada motor, não antecipam a solução e mantêm segredos fora dos relatórios.
- [ ] Navegação das abas funciona com setas, Home e End.
- [ ] Exemplos de código permanecem legíveis e roláveis.
- [ ] Quiz exige resposta, calcula o resultado e mostra feedback.
- [ ] Acertar o quiz altera apenas a contagem de conceitos; prática e problema novo continuam separados até seus próprios registros.
- [ ] A seção "O que demonstrar em cada nível" apresenta as cinco provas, é legível em celular e não libera níveis por conclusão de aula ou quiz.
- [ ] O projeto de fechamento de Git aparece em Fluxo de trabalho em equipe; as cinco abas abrem, a entrega vazia é recusada e o registro permanece identificado como autoavaliação.
- [ ] O projeto de Qualidade aparece em Manutenção de projetos e revisão; a função final passa nos testes isolados e o roteiro vermelho→verde continua identificado como verificação local.
- [ ] O projeto de Integração aparece em Publicação e trabalho em projeto; os testes isolados cobrem sucesso, vazio, falhas e 401, e o plano de publicação não é apresentado como deploy executado.
- [ ] A prova básica abre pela visão geral e junto ao projeto de Integração, sem ocultá-lo; registrar entrega vazia é recusado e nenhuma marcação libera um nível automaticamente.
- [ ] Após uma resposta incorreta, o feedback indica a aula de revisão; o botão abre os conceitos e a orientação persiste após recarregar.
- [ ] Nas aulas de preparação digital, um erro no quiz oferece uma tarefa diferente, com critério e pista; o rascunho permanece após recarregar.
- [ ] Nas aulas de Ambientes essenciais, a segunda tentativa orienta diagnóstico ou retomada sem inventar saídas nem expor credenciais.
- [ ] Anotação é salva após aguardar e continua presente após recarregar.
- [ ] Fechar o diálogo devolve o foco ao controle que o abriu.

## Progresso e persistência

- [ ] Sem login, só a tela de entrada é exibida; o curso e a navegação não recebem foco.
- [ ] Ao atualizar uma sessão autenticada, aparece apenas a tela de carregamento; o convite de login não pisca antes de abrir o curso.
- [ ] Na tela de entrada, Entrar e Criar conta abrem os fluxos correspondentes do Clerk por mouse e teclado, inclusive em largura de celular.
- [ ] Após o login, o conteúdo é liberado somente depois da leitura do progresso da conta.
- [ ] Ao sair, o conteúdo volta a ficar bloqueado e o progresso da conta deixa a tela.
- [ ] Marcar uma aula atualiza módulo, trilha e progresso total.
- [ ] Desmarcar a aula reverte as contagens.
- [ ] Recarregar mantém conclusão, quiz, notas, projetos e evidências.
- [ ] Registrar prática agenda a aula para três dias depois; desfazer remove a aula da fila.
- [ ] Ao chegar o dia, a revisão pede nova tentativa completa do quiz antes de permitir o registro.
- [ ] Na primeira aula de um módulo posterior, a revisão acumulativa recupera um fundamento do módulo anterior, salva o rascunho e abre a aula de origem.
- [ ] Após salvar em uma aba, recarregar outra aba da mesma conta mostra o estado remoto atualizado.
- [ ] Trocar de conta carrega somente o progresso da nova conta, sem envio manual nem download de arquivo.
- [ ] Com `localStorage` bloqueado, login, leitura e salvamento automático no Supabase continuam funcionando.

## Projetos

- [ ] Projeto da trilha alterada abre todas as etapas.
- [ ] Código colado permanece limitado e é escapado na interface.
- [ ] Prévia HTML continua isolada e sem acesso à rede.
- [ ] Testes JavaScript continuam isolados e encerram em caso de loop ou demora.
- [ ] Checks automáticos e manuais atualizam o status da entrega.
- [ ] Uma nova entrega exige explicação das decisões e da verificação; o texto persiste ao trocar de aba e recarregar.
- [ ] Uma entrega antiga sem explicação permanece registrada e indica a pendência antes de novo registro.

## Acessibilidade e responsividade

- [ ] O link “Pular para as lições” aparece ao receber foco e funciona.
- [ ] Toda a navegação principal é possível somente com teclado.
- [ ] O foco é sempre visível e segue uma ordem compreensível.
- [ ] Botões, abas e filtros anunciam estado e nome acessível coerentes.
- [ ] Em aproximadamente 375 px não há corte de conteúdo nem rolagem horizontal da página.
- [ ] Em desktop, a barra lateral e o conteúdo não se sobrepõem.
- [ ] Com movimento reduzido ativo, animações e transições são removidas.
- [ ] Contraste e leitura permanecem adequados no tema escuro.

## Encerramento

- [ ] Capturar ou descrever o resultado das verificações executadas.
- [ ] Informar explicitamente o que não foi testado.
- [ ] Atualizar `ROADMAP.md` e o backlog equivalente do `AGENTS.md`.
- [ ] Se as contagens mudaram intencionalmente, atualizar `scripts/content-baseline.json`, a meta description e a documentação.

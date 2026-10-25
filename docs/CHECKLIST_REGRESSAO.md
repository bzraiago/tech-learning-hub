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
- [ ] Navegação das abas funciona com setas, Home e End.
- [ ] Exemplos de código permanecem legíveis e roláveis.
- [ ] Quiz exige resposta, calcula o resultado e mostra feedback.
- [ ] Acertar o quiz altera apenas a contagem de conceitos; prática e problema novo continuam separados até seus próprios registros.
- [ ] A seção "O que demonstrar em cada nível" apresenta as cinco provas, é legível em celular e não libera níveis por conclusão de aula ou quiz.
- [ ] O projeto de fechamento de Git aparece em Fluxo de trabalho em equipe; as cinco abas abrem, a entrega vazia é recusada e o registro permanece identificado como autoavaliação.
- [ ] O projeto de Qualidade aparece em Manutenção de projetos e revisão; a função final passa nos testes isolados e o roteiro vermelho→verde continua identificado como verificação local.
- [ ] Após uma resposta incorreta, o feedback indica a aula de revisão; o botão abre os conceitos e a orientação persiste após recarregar.
- [ ] Nas aulas de preparação digital, um erro no quiz oferece uma tarefa diferente, com critério e pista; o rascunho permanece após recarregar.
- [ ] Nas aulas de Ambientes essenciais, a segunda tentativa orienta diagnóstico ou retomada sem inventar saídas nem expor credenciais.
- [ ] Anotação é salva após aguardar e continua presente após recarregar.
- [ ] Fechar o diálogo devolve o foco ao controle que o abriu.

## Progresso e persistência

- [ ] Marcar uma aula atualiza módulo, trilha e progresso total.
- [ ] Desmarcar a aula reverte as contagens.
- [ ] Recarregar mantém conclusão, quiz, notas, projetos e evidências.
- [ ] Registrar prática agenda a aula para três dias depois; desfazer remove a aula da fila.
- [ ] Ao chegar o dia, a revisão pede nova tentativa completa do quiz antes de permitir o registro.
- [ ] Na primeira aula de um módulo posterior, a revisão acumulativa recupera um fundamento do módulo anterior, salva o rascunho e abre a aula de origem.
- [ ] Alteração em outra aba é refletida sem corromper o estado atual.
- [ ] Com `localStorage` bloqueado, a aplicação continua funcionando e informa a limitação.

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

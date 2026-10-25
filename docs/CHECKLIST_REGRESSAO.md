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
- [ ] Anotação é salva após aguardar e continua presente após recarregar.
- [ ] Fechar o diálogo devolve o foco ao controle que o abriu.

## Progresso e persistência

- [ ] Marcar uma aula atualiza módulo, trilha e progresso total.
- [ ] Desmarcar a aula reverte as contagens.
- [ ] Recarregar mantém conclusão, quiz, notas, projetos e evidências.
- [ ] Registrar prática agenda a aula para três dias depois; desfazer remove a aula da fila.
- [ ] Ao chegar o dia, a revisão pede nova tentativa completa do quiz antes de permitir o registro.
- [ ] Alteração em outra aba é refletida sem corromper o estado atual.
- [ ] Com `localStorage` bloqueado, a aplicação continua funcionando e informa a limitação.

## Projetos

- [ ] Projeto da trilha alterada abre todas as etapas.
- [ ] Código colado permanece limitado e é escapado na interface.
- [ ] Prévia HTML continua isolada e sem acesso à rede.
- [ ] Testes JavaScript continuam isolados e encerram em caso de loop ou demora.
- [ ] Checks automáticos e manuais atualizam o status da entrega.

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

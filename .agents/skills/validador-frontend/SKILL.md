---
name: validador-frontend
description: "Audita leiaute, estilo, responsividade, acessibilidade e estados visíveis de interfaces web. Use quando o usuário pedir revisão visual ou funcional do front-end, inclusive antes de publicar mudanças de interface. Não substitui auditoria didática de aulas nem revisão de backend isolado."
---

# Validador de front-end

Avalie a interface que a pessoa realmente vê e usa. Código e testes automatizados ajudam a localizar problemas, mas não provam, sozinhos, que o leiaute está legível ou responsivo.

## Escopo e evidência

- Leia `AGENTS.md` e identifique a página, rota, componente ou fluxo pedido. Se for o Tech Learning Hub, comece por `index.html`, `assets/css/global.css`, `assets/js/ui/`, `assets/js/app.js`, `assets/js/auth.js`, `assets/js/cloud.js` e `docs/CHECKLIST_REGRESSAO.md`, conforme o caso.
- Quando o pedido for apenas revisar, entregue achados sem editar o produto. Quando o usuário pedir correção, altere somente o necessário e confira o resultado no navegador.
- Registre a versão ou commit, URL ou arquivo aberto, largura e altura da viewport, zoom, estado da interface e método usado. Diferencie dispositivo físico, emulação do navegador e inspeção estática.
- Inspecione capturas e interaja com a página. Não conclua que algo funciona visualmente com base apenas em classes CSS, DOM, testes unitários ou screenshots sem o estado relevante.
- Se uma página autenticada, fonte, CDN ou serviço não estiver acessível, registre a limitação. Um estilo artificial inserido pelo harness não comprova o visual publicado.

## Percurso de validação

1. **Estados:** abra os estados relevantes ao pedido: primeiro carregamento, login, conteúdo carregado, vazio, preenchido, erro, busca, aula, projeto, quiz, diálogo e confirmação de salvamento. Use dados fictícios e preserve o progresso real.
2. **Tamanhos:** confira celular estreito (aproximadamente 320–390 px), tablet (cerca de 768 px) e desktop (1280 px ou mais). Inclua larguras próximas aos pontos de quebra que alteram navegação ou colunas. Teste orientação e zoom de 200% quando afetarem o fluxo.
3. **Leiaute e estilo:** observe hierarquia visual, espaçamento, alinhamento, tipografia, contraste, estados de hover/foco/erro, consistência dos componentes e legibilidade de textos longos. Verifique se cabeçalhos fixos, menus, cartões, tabelas, código e diálogos não cobrem conteúdo ou ações.
4. **Responsividade:** compare captura e medidas de rolagem. Investigue rolagem horizontal da página, conteúdo cortado, controles fora da viewport, sobreposição e áreas de toque pequenas. Rolagem interna de código ou tabela pode ser correta se estiver clara e acessível.
5. **Interação e acessibilidade:** percorra com Tab, Shift+Tab, Enter, Espaço e Escape onde couber. Confira foco visível, ordem de foco, link para pular conteúdo, rótulos, nomes acessíveis, `aria-*`, mensagens de status e respeito a `prefers-reduced-motion`. Não afirme teste com leitor de tela sem executá-lo.
6. **Persistência visível:** se o fluxo usar estado remoto, observe carregamento, erro e confirmação de salvamento. Recarregue ou troque de conta somente com ambiente de teste autorizado. Separe falhas de interface de falhas do serviço.

Use ferramentas de navegador ou automação disponíveis sem acrescentar dependências por conveniência. Uma verificação automatizada de `scrollWidth`, foco ou presença de elemento é apoio para a inspeção visual; confira a tela também. Para mudanças no Tech Learning Hub, execute as verificações aplicáveis de `docs/CHECKLIST_REGRESSAO.md` e relate o que não pôde executar.

## Resultado da auditoria

Entregue um relatório curto com:

- **Veredito:** se o fluxo é utilizável nos tamanhos e estados verificados, com os limites da conclusão.
- **Matriz de cobertura:** viewport/dispositivo, estado, interação executada e resultado. Marque `não testado` quando couber.
- **Achados priorizados:** severidade, arquivo/linha ou componente, passos para reproduzir, observado, esperado e evidência visual ou de interação. Diferencie fato observado de risco ou sugestão estética.
- **Próxima ação:** correção concreta para cada achado importante e como conferir que resolveu.

Não trate emulação como teste em dispositivo físico, nem uma única viewport como prova de responsividade geral. Não publique capturas com dados pessoais, chaves ou tokens.

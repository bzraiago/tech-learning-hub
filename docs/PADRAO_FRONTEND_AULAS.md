# Padrão de apresentação das aulas

Versão 1 · 01/11/2026 · Referência: aula `setup-docker-alternative`, commit `61b6872`.

Este padrão acompanha [PROCESSO_REVISAO_DIDATICA.md](PROCESSO_REVISAO_DIDATICA.md). Seu objetivo é deixar visíveis a ação atual, o lugar de agir e a confirmação. Ele documenta o leitor existente; não exige redesenhar o site nem converter todas as aulas para o mesmo número de cartões.

## 1. Ordem da informação

| Área | Função | Evitar |
|---|---|---|
| Conceitos | Objetivo, pré-requisitos com atalhos, lugares/ferramentas e ideias necessárias | Pedir execução cujo código ainda está escondido em outra aba |
| Exemplo | Percurso numerado, com instrução, código no ponto de uso e confirmação | Separar todos os comandos de todas as instruções |
| Prática | Enunciado, resultado esperado, critérios, rascunho, dicas e solução recolhidas | Cobrar passos novos sem ensino; revelar solução antes da tentativa |
| Revisão | Erros reconhecíveis, recuperação, quiz e retomada | Mensagens genéricas como “verifique a configuração” |
| Fontes | Complemento com origem e idioma | Usar um link como única explicação de etapa obrigatória |

O cabeçalho identifica a aula, as abas indicam o contexto e o rodapé permite seguir. A rolagem do conteúdo não deve esconder permanentemente instruções ou controles. “Continuar: Prática” navega para a próxima aba; não é um verificador automático dos passos do exemplo.

## 2. Anatomia de um passo

Cada cartão de percurso contém, nesta ordem:

1. **Passo N — ação concreta:** título que descreve o que fazer.
2. **Instruções em parágrafos curtos:** localização, ação, conteúdo e transição entre ferramentas.
3. **Bloco no contexto de uso:** rótulo dizendo ARQUIVO, TERMINAL ou outro contexto realmente usado na aula.
4. **Alternativas recolhidas:** `details/summary` para outro sistema, comando alternativo ou diagnóstico opcional. A instrução essencial do caminho principal permanece visível.
5. **Confira antes de seguir:** mensagem ou estado observável, separado do código a copiar. Essa confirmação é orientação ao aluno, não um resultado medido pelo site.

O código do exemplo vem antes do pedido de executá-lo. Se há uma saída de terminal para comparar, rotule como SAÍDA ESPERADA. Em aulas de chat, mensagens e respostas devem ser identificadas como texto da conversa; não introduza IDE/terminal por seguir esta referência.

## 3. Contrato de dados já disponível

Em `assets/js/data/lesson-guides/`, `guide.example` mantém `language`, `code`, `explanation` e `expected`. O percurso opcional usa:

```javascript
// Fragmento ilustrativo do formato; não é uma aula completa pronta para publicar.
steps: [
  {
    title: 'Salve uma mensagem no arquivo',
    paragraphs: [
      'No arquivo de teste já aberto no editor, digite a linha abaixo.',
      'Use Arquivo > Salvar. A etapa anterior deve ter explicado como abrir esse arquivo.'
    ],
    blocks: [
      { label: 'ARQUIVO — conteúdo do exemplo.py', code: 'print("Teste de leitura")' }
    ],
    alternatives: [
      {
        title: 'Se o arquivo ainda não estiver aberto',
        paragraphs: ['Retorne ao passo que ensina a abrir a pasta e o arquivo.']
      }
    ],
    expected: 'O arquivo salvo contém a linha. Salvar ainda não executa o programa.'
  }
]
```

Campos de cada passo: `title`, `paragraphs[]`, `expected`; opcionais `blocks[]` e `alternatives[]`. Alternativas têm `title`, `paragraphs[]` e, se necessário, `blocks[]`. Cada bloco tem `label` e `code`. Não grave HTML nesses campos; o leitor escapa os textos.

`readerExample()` em `assets/js/ui/dialogs.js` renderiza `example.steps` quando presente. Sem ele, preserva `example.blocks` ou o bloco único de `example.code`. Para texto de chat externo, preserve o fluxo específico já existente. Não crie um segundo renderizador particular para cada aula.

`guide.requirementChange = { prompt, criteria: [...] }` permite um desafio final concreto. Sem esse campo, o leitor mantém o desafio genérico. A anotação continua em `${lessonId}:requirement-change`; não crie novo sistema de persistência para o padrão visual.

## 4. Estilo e legibilidade

Reutilize os componentes e classes atuais em vez de copiar estilos para cada guia:

| Elemento | Implementação de referência | Intenção |
|---|---|---|
| Leitor | `dialog.lesson-reader` e `.reader-prose` em `global.css` | Diálogo até 1040 px, texto até 76ch; opção ampla de 92ch |
| Passo | `.reader-example-step`, borda sutil, `p-4 sm:p-6`, `mt-7` | Separar ações sem transformar cada frase em um cartão |
| Título | `font-display text-xl`, violeta | Mostrar hierarquia e ação atual |
| Texto | `readerParagraph()`, escala e entrelinha do leitor | Parágrafos legíveis e respeito às preferências do usuário |
| Código | `readerCode(code, label, true)` nos passos | Código completo sem limite vertical interno de 32rem; rolagem horizontal quando necessária |
| Alternativa | `details` com `summary` descritivo | Reduzir escolhas simultâneas e manter acesso por teclado |
| Confirmação | Rótulo textual e fundo esmeralda discreto | Tornar o esperado identificável sem depender apenas da cor |

Os valores descrevem o estado de referência. Para alterar estilos globais, confira também aulas antigas; a finalidade pedagógica prevalece sobre copiar números sem verificar o resultado.

- Não reduza a fonte do código para fazê-lo caber no celular. Preserve espaços e quebras significativas; o bloco pode rolar horizontalmente.
- Evite duas rolagens verticais concorrentes só para ler/copiar o exemplo. O corpo da aula pode rolar; nos passos, o código não tem uma caixa vertical curta que esconde a última linha.
- Rótulos longos, nomes de arquivo e títulos precisam quebrar linha. Texto explicativo não deve forçar rolagem horizontal do diálogo.
- Preserve tema, foco visível, contraste, controles de leitura, movimento reduzido e a separação entre acompanhamento e evidência de domínio.
- Não dependa de cor, ícone sem rótulo, hover ou uma instrução que só apareça após revelar a solução.

## 5. Conferência obrigatória quando a apresentação muda

Registre o ambiente e a revisão no [modelo de relatório](MODELO_REVISAO_AULA.md). Use os arquivos e estilos reais da página, dados fictícios e o ambiente de teste disponível.

| Conferência | Como observar | Critério |
|---|---|---|
| 375 px, 768 px, 1280 px | Abrir Conceitos, primeiro passo, código maior, alternativa, Prática e Revisão | Conteúdo legível; título/rótulos quebram linha; diálogo não alarga além da tela |
| Rolagem | Percorrer conteúdo até o fim e o maior código | Última linha e confirmação alcançáveis; cabeçalho/rodapé não tornam conteúdo inacessível |
| Teclado | Tab/Shift+Tab, Enter/Espaço em alternativas, foco no código, setas na rolagem, Escape no diálogo | Foco visível e ordem coerente; nenhuma ação depende só do mouse |
| Código | Selecionar do primeiro ao último caractere do bloco e conferir o texto selecionado | Sem título de bloco misturado ao código; última linha alcançável |
| Preferências | Aumentar texto/entrelinha, alternar largura; zoom real de 200% quando disponível | Controles e conteúdo continuam acessíveis; registrar o que não foi testado |
| Compatibilidade | Abrir uma aula com exemplo antigo e uma de chat quando o leitor compartilhado mudar | Formatos anteriores continuam funcionando |
| Progresso | Quando afetado, marcar/desmarcar, anotar e recarregar em conta fictícia | Chaves e salvamento automático preservados; registrar uso de mocks |

Inspecione capturas **e** interaja. `scrollWidth` ajuda a localizar transbordamento; não substitui leitura visual. Capture a viewport real do diálogo em diferentes posições de rolagem. Uma captura de elemento mais alto que a viewport pode incluir regiões cortadas ou ocultas e não comprova a leitura inteira.

Se CDN/fontes não carregarem, registre a falha. Uma cópia local do mesmo recurso público pode permitir conferir estilos, desde que a origem seja registrada. CSS artificial de um teste serve para comportamento isolado, não prova o visual publicado. Mock de autenticação/banco também não valida os serviços reais. Reduzir a viewport não equivale a testar zoom real de 200% ou um telefone físico.

## 6. Evidência da referência e limites

A revisão `61b6872` foi conferida em Chromium local a 375/768/1280 px, com interação por teclado, Tailwind obtido da mesma URL pública e serviços simulados. O código Python/SQLite foi executado em pasta isolada. Isso está registrado em [AUDITORIA_SQLITE_ETAPA_0.md](AUDITORIA_SQLITE_ETAPA_0.md).

Esse registro não aprova automaticamente uma aula nova. A nova revisão precisa de evidências próprias. A validação da referência não incluiu todos os itens desta matriz, como zoom real de 200%, leitor de tela, dispositivo físico ou serviços remotos reais; esses itens não devem ser marcados retroativamente como concluídos.

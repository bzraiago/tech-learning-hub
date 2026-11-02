# Processo de revisão didática e implementação

Versão 1 · 01/11/2026 · Aplicável a qualquer modelo ou mantenedor do Tech Learning Hub.

## Finalidade e referência

Transformar uma aula em um percurso que o aluno consiga seguir com as informações da própria aula. A referência inicial é `setup-docker-alternative`, reescrita no commit `61b6872`; os achados e limites estão em [AUDITORIA_SQLITE_ETAPA_0.md](AUDITORIA_SQLITE_ETAPA_0.md). O dono relatou melhora após essa revisão. Isso não é uma comparação controlada entre modelos nem comprova a aprendizagem de todos os alunos.

O ganho veio de corrigir a sequência real da interface, produzir uma primeira saída pequena, colocar instrução e exemplo juntos e verificar execução, retomada e apresentação. Não basta acrescentar parágrafos a cada dúvida isolada.

Use este processo com [PADRAO_FRONTEND_AULAS.md](PADRAO_FRONTEND_AULAS.md) e preencha [MODELO_REVISAO_AULA.md](MODELO_REVISAO_AULA.md) para a aula revisada. O modelo registra evidências; preenchê-lo não produz aprovação automática.

## 1. Delimitar antes de editar

1. Leia `AGENTS.md`, o pedido atual e o estado do Git. Preserve mudanças do usuário.
2. Registre título/ID, público, conhecimentos prévios, ferramenta/sistema principal, resultado observável e escopo autorizado. Se o usuário pedir só análise, entregue análise; se pedir correção, faça a correção sem exigir uma segunda autorização para o mesmo trabalho.
3. Trabalhe uma aula por vez, salvo lote explicitamente delimitado. Um pedido para documentar o padrão não autoriza reescrever o curso inteiro.
4. Leia o objeto da aula em `assets/js/data/tracks.js`, seu guia em `assets/js/data/lesson-guides/` e as funções do leitor em `assets/js/ui/dialogs.js` que realmente o exibem. Leia dependências próximas quando forem necessárias; não carregue todo o repositório sem finalidade.
5. Registre IDs e chaves de progresso existentes. Não renomeie IDs, descarte rascunhos nem reintroduza transferência manual de progresso.

**Saída desta etapa:** contrato de aprendizagem e lista de arquivos/abas afetados.

## 2. Percorrer a aula publicada na ordem do aluno

Use a skill `aluno-informatica-basica` para a etapa 0 e ajuste o conhecimento presumido ao nível das outras aulas. O agente pode diagnosticar com conhecimento técnico, mas não pode usá-lo para completar silenciosamente uma instrução ausente.

Percorra Conceitos → Exemplo → Prática → Revisão → Fontes. Confira onde cada texto aparece de fato. Registre o primeiro ponto bloqueante antes de continuar a análise das partes independentes. Não atribua sucesso aos passos que dependem do bloqueio.

Para cada ação, responda usando apenas material já apresentado:

| Pergunta | Evidência exigida na aula |
|---|---|
| O que faço agora? | Ação concreta e sua finalidade. |
| Onde faço? | Aplicativo, área da tela, pasta, arquivo ou conversa; sistema e terminal quando aplicáveis. |
| Como chego lá? | Cliques/transições para uma ferramenta nova; atalho para preparação anterior já ensinada. |
| O que escrevo? | Conteúdo completo da demonstração, no ponto de uso; comando separado do arquivo e da saída. |
| O que preciso ter feito antes? | Pré-requisitos acessíveis, com títulos reais e dependências anteriores. |
| Como sei que funcionou? | Mensagem, arquivo, estado visual ou comportamento observável. |
| E se eu já tentei antes? | Efeito de repetir, estado inicial, dados persistentes e retomada. |
| E se falhar? | Sinal reconhecível, próxima verificação e ponto de retorno. |

“Abra no editor”, “crie uma tabela”, “execute”, “configure o banco” e “use a API” são vagos quando o percurso necessário não foi ensinado. Também é bloqueio mandar usar um código que só aparece em outra aba ainda não indicada.

Classifique cada achado como FATO, RISCO ou SUGESTÃO; indique localização, gravidade e correção. Diferencie captura real do aluno, execução pelo agente e tentativa mental.

## 3. Projetar a sequência antes de reescrever

Monte a tabela de passos do modelo de relatório: estado inicial → local → ação → conteúdo → confirmação → recuperação. Resolva dependências antes de escrever a versão final.

- Escolha um caminho principal coerente com o público. Alternativas de sistema/plataforma são identificadas e entram apenas onde a escolha muda a ação.
- Comece pelo menor resultado que confirma o ambiente ou a habilidade necessária. Na aula SQLite foi uma mensagem simples; em HTML pode ser abrir uma página, em chat pode ser obter uma resposta com um critério claro. Não imponha Python ou terminal a uma aula sem código.
- Introduza uma dificuldade por vez. Só apresente a próxima depois de explicar como reconhecer a confirmação da anterior.
- Explique o termo novo no ponto de uso. Para etapa 0, inclua como abrir/criar/salvar um arquivo; para níveis posteriores, use os pré-requisitos já aprendidos e detalhe as transições novas.
- Defina explicitamente como repetir e retomar. Diferencie primeira execução de execução com dados anteriores; não peça para apagar dados para coincidir com uma saída ilustrativa.
- Um exemplo guiado pode fornecer código completo. Os exercícios seguintes reduzem o apoio, preservando resultados esperados e critérios antes da solução recolhida.
- Toda cobrança de exercício precisa apontar para algo ensinado antes: registre essa relação. O desafio final deve pedir uma mudança concreta e comparar um comportamento preservado com outro alterado.

**Critério para iniciar a edição:** nenhuma ação obrigatória depende de “o aluno deve deduzir o que falta”. Se surgir uma lacuna, ajuste o plano ou acrescente uma preparação explicitamente ligada.

## 4. Implementar no conteúdo e no leitor

- Atualize objetivos, estimativa, resumo, código de referência e guia da mesma aula. Não deixe a ficha da trilha com um exemplo antigo.
- Conceitos apresenta o modelo mental; Exemplo conduz a execução; Prática usa o estado deixado pelo exemplo; Revisão ajuda a diagnosticar e retomar. Não duplique um roteiro completo em várias abas.
- Para percursos que precisam intercalar instrução e código, use `guide.example.steps`, já suportado pelo leitor. Quantidade de passos depende da aula; dez passos não são uma regra.
- Use `guide.requirementChange` quando o desafio genérico exigir decisões ainda não ensinadas. Preserve a chave `${lessonId}:requirement-change`.
- Reutilize o padrão visual documentado. Só mude renderização quando a estrutura existente realmente impedir a sequência; confira os formatos antigos se alterar uma função compartilhada.
- Se mudar perguntas/respostas ou significado de índices persistidos, examine a revisão/migração necessária em `sanitizeState()`. Não apague progresso como atalho para compatibilidade.
- Fontes confirmam detalhes e aprofundam; não substituem uma instrução obrigatória. Confira links e comandos sujeitos a mudança em fontes oficiais.

## 5. Validar por evidência

| Camada | O que conferir | O que não comprova |
|---|---|---|
| Estrutura | `node scripts/validate-content.js`: sintaxe, IDs, relações e campos exigidos | Clareza para iniciante e funcionamento de toda ferramenta externa |
| Execução | Código exatamente exibido, no ambiente indicado, em pasta/dados isolados; saída, repetição e retomada | Instalação ou execução em sistemas que não foram usados |
| Exercícios | Alteração pedida e comportamento preservado; hipótese de erro reproduzida com segurança ou analisada como tal | Resolução independente pelo aluno |
| Interface | Abas, passagem entre passos, alternativas, foco, leitura e cópia do código; ver padrão visual | Funcionamento visual só porque o DOM contém o texto |
| Estado | Compatibilidade; se afetado, salvamento, recarga e isolamento em ambiente de teste | RLS/Clerk/Supabase reais quando se usaram mocks |
| Aluno | A pessoa avança e explica sem instrução adicional externa | Domínio geral só por concluir uma aula |

Comandos existentes, a partir da raiz do repositório:

```text
node scripts/validate-content.js
node scripts/verify-sqlite-preparation.cjs
```

O segundo comando é específico da referência SQLite. Ele não valida outras aulas. Para outro exemplo, use a verificação correspondente ou uma reprodução isolada; crie automação quando ela proteger uma propriedade relevante, não apenas para comparar texto com texto.

Quando o leitor ou o fluxo de progresso for afetado, execute o teste existente a partir de `labs/backend-layers`:

```text
node node_modules/@playwright/test/cli.js test e2e/progresso-e-leitura.spec.cjs
```

Ele usa serviços simulados e parte do layout de teste. A conferência visual precisa considerar CSS/CDN reais, como explica o padrão de front-end. Não instale dependências sem a autorização aplicável; indisponibilidade de ambiente vira uma pendência identificada.

Registre comando/ação, ambiente, esperado, observado, resultado, revisão testada e limitações. Se editar depois, repita somente as verificações afetadas. Não reutilize um resultado verde de uma versão anterior como evidência da versão atual.

## 6. Revisar como aluno após implementar

Faça uma nova leitura em ordem, sem usar as soluções dos exercícios nem lembranças de como você implementou. Aponte a instrução que permite cada ação. A habilidade técnica do agente não é evidência de que a aula a ensinou.

Se a mesma dificuldade reaparecer após remendos, volte ao percurso completo: ordem das abas, estado inicial, primeira saída e transições. Não responda automaticamente com mais comandos ou uma reinstalação.

Outro modelo ou pessoa pode fazer esta leitura recebendo apenas o contrato e a aula atual, sem a conclusão pretendida. Isso é opcional e depende da autorização para delegação; não execute subagentes por padrão. Uma segunda opinião ajuda a encontrar lacunas, mas também precisa citar evidências.

## 7. Decidir e entregar

Use estados separados no relatório:

- **Implementado:** edição concluída; indique verificações ainda pendentes.
- **Validado tecnicamente no escopo registrado:** verificações aplicáveis passaram; ambientes não disponíveis continuam explicitamente pendentes.
- **Observado com aluno:** registre o que a pessoa realmente conseguiu fazer e onde precisou de ajuda. Não invente esse estado a partir de testes do agente.

Não classifique como validado se houver bloqueio didático conhecido, teste relevante falhando, exemplo divergente ou alegação sem evidência. Falta de teste em outro sistema não deve ser escondida, nem exige executar recursos sem autorização. Corrija o que pode e informe o limite preciso.

Atualize o relatório da aula e o roadmap/checklist somente para o escopo verificado. Commit/push/deploy seguem a autorização e branch vigentes; este documento não concede autorização adicional. Um push não comprova deploy concluído. Preserve a proibição de salvamento manual/local do progresso do produto.

## 8. Retomar com outro modelo

Deixe no relatório: contrato, ID, branch/revisão, arquivos editados, achados abertos, decisões, verificações com resultados e o próximo passo executável. Não deixe apenas “continuar revisão”. O novo modelo confere o Git e o conteúdo atual antes de confiar no registro.

Pedido reutilizável:

> Revise e, dentro do escopo autorizado, refaça a aula «título/ID» seguindo `docs/PROCESSO_REVISAO_DIDATICA.md` e `docs/PADRAO_FRONTEND_AULAS.md`. Considere o nível declarado, percorra as abas na ordem real e registre a revisão com `docs/MODELO_REVISAO_AULA.md`. Corrija bloqueios, valide o exemplo exibido e a interface afetada. Preserve IDs e progresso. Informe evidências e pendências; não trate testes automáticos como aprendizagem comprovada. Publicação: siga a autorização vigente nesta conversa.

---
name: auditor-jornada-iniciante
description: "Percorre um curso de programação na ordem do aluno sem conhecimento prévio para auditar continuidade, pré-requisitos, instruções executáveis, exercícios e provas de nível. Use quando o pedido for avaliar a jornada do iniciante entre aulas e trilhas. Não substitui teste com alunos reais nem auditoria visual isolada."
---

# Auditor da jornada iniciante

Siga o material como alguém que começa sem conhecer arquivos de projeto, terminal, editor ou linguagem. Use apenas o que o curso ensinou até aquele ponto. Conhecimento do agente ajuda a detectar lacunas, mas não deve preencher silenciosamente um passo ausente.

## Preparar o percurso

- Leia `AGENTS.md` para identificar público, prova de cada nível e regra de avanço. Leia `ROADMAP.md` para distinguir conteúdo planejado, implementado e ainda pendente.
- No Tech Learning Hub, derive a ordem real de `assets/js/data/tracks.js`, os guias em `assets/js/data/lesson-guides/`, os projetos em `assets/js/data/projects*.js` e o comportamento visível em `assets/js/ui/`. Não use a ordem do roadmap como substituta da navegação que o aluno vê.
- Defina o escopo antes de concluir: uma aula, transição entre trilhas, caminho até um projeto ou jornada inteira. Em jornadas longas, avance por etapas e mantenha uma matriz de aulas realmente examinadas; não atribua cobertura total a uma amostra.
- Registre a condição inicial assumida: nível zero, sistema operacional, ferramentas disponíveis e tempo. Marque informações não declaradas como desconhecidas; não invente um perfil de aluno.

## Caminhada por aula e transição

Para cada etapa na ordem escolhida, responda com evidência do próprio material:

1. **Entrada:** qual competência e ferramenta são necessárias agora? Aponte onde foram ensinadas e verificadas antes. Registre arestas como `prep-files → html-semantic`. Se a preparação aparece depois, marque a dependência como quebrada.
2. **Primeira execução:** uma pessoa sabe em qual aplicativo, terminal e pasta agir, o que digitar, o que deve aparecer, como reconhecer erro, parar e retomar? Execute apenas comandos seguros em cópia descartável quando isso ajudar; caso contrário, marque `não executado`.
3. **Compreensão:** o objetivo é observável? Termos novos são explicados antes do uso? Há exemplo e resultado esperado visível antes de revelar a solução? Conceitos numerosos têm pausas de prática?
4. **Prática:** o aluno prevê, altera, constrói caso novo e investiga erro com apoio decrescente? As dicas permitem continuar sem entregar a resposta? O critério de aceite separa resultado observado da solução?
5. **Feedback e retomada:** diante de erro, a interface indica o conceito exato a revisar e uma segunda tarefa diferente? Rascunhos e estado de leitura permitem retomar sem confundir conclusão com domínio?
6. **Transferência:** a tarefa seguinte usa conhecimento anterior em contexto novo. Verifique se nenhum projeto ou prova exige arquitetura, ferramenta ou decisão ainda não ensinada.

Nos limites entre trilhas, descreva o caminho mínimo que o aluno realmente percorreria. Verifique atalhos de preparação para dependências cruzadas, como JavaScript → servidor local, Python → SQLite e interface → API → PostgreSQL. Um link externo pode complementar a explicação, mas não deve ser a única instrução para uma ação essencial.

## Provas e honestidade da evidência

- Compare o projeto de conclusão com as competências prometidas em `AGENTS.md`: execução, teste, explicação, correção de bug e mudança de requisito. Para níveis posteriores, inclua publicação, banco, CI, revisão e colaboração quando exigidos.
- Separe `li`, `pratiquei`, `passei na revisão` e `resolvi sozinho`. Marcação, quiz e autoavaliação são registros de acompanhamento; não afirmam capacidade comprovada sem tarefa nova, explicação e evidência observada.
- Uma análise feita pelo agente identifica lacunas e riscos plausíveis. Nunca escreva que “um iniciante travou” ou “aprendeu” sem sessão real registrada. Não fabrique tentativa, erro, duração ou participante.
- Use apenas dados fictícios. Não peça credenciais, instale ferramenta pesada nem altere serviço real para simular a caminhada. Preserve os IDs das aulas e o estado salvo se houver correção autorizada.

## Relatório

Entregue:

1. **Cobertura:** trilha, módulo, aulas examinadas, método (leitura, navegador, execução local) e o que ficou fora.
2. **Caminho de pré-requisitos:** arestas verificadas, ausentes, tardias ou circulares, com ID e arquivo/linha.
3. **Bloqueios priorizados:** `bloqueante` se a pessoa não consegue iniciar/continuar com as instruções; `alta` se aprende uma regra incorreta; `média` se há atrito recuperável; `baixa` para polimento. Para cada um, cite instrução, resultado esperado, lacuna e correção concreta.
4. **Nível de saída:** capacidades cobertas pelo material, tarefas que poderiam demonstrá-las e evidências ainda não observadas.
5. **Próxima etapa:** menor correção ou sessão com aluno que reduziria a incerteza principal.

Se o usuário pedir só auditoria, não edite o curso. Se pedir correção, implemente em passos pequenos, atualize o roadmap e verifique a sequência afetada. Não apresente revisão estrutural ou execução por agente como teste com pessoa iniciante.

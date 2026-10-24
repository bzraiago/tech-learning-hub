# Auditoria didática — carga cognitiva das aulas

**Data:** 24/10/2026  
**Verificação de fontes:** parcial; fontes SQLite das candidatas prioritárias conferidas  
**Escopo:** aulas com mais de quatro seções conceituais em `LESSON_GUIDES`

## 1. Veredito

O mapeamento estrutural encontrou 41 aulas com mais de quatro seções. Isso identifica candidatas, não comprova que todas estejam sobrecarregadas: algumas seções aprofundam a mesma ideia. O risco mais forte está nas cinco aulas de fundamentos de banco, cada uma com sete blocos e sem os quatro tipos de exercício explicitamente rotulados. A primeira intervenção recomendada é dividir `db-modeling`, preservando esse ID para o primeiro bloco e criando novos IDs para os aprofundamentos.

## 2. Contrato de aprendizagem

- **Público:** aluno iniciante, com preparação digital concluída e os pré-requisitos declarados por cada trilha.
- **Nível prometido:** compreender um bloco conceitual, executar um exemplo, prever comportamento e resolver uma tarefa nova sem receber vários conceitos inéditos de uma vez.
- **Condições:** navegador e editor; SQLite/Python nas aulas de banco; demais ferramentas conforme as preparações já existentes.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Alta | G | `db-modeling`, `db-ddl-crud`, `db-select`, `db-joins`, `db-transactions` | FATO | Cada guia possui sete seções; reúne fundamento, aprofundamento, diagnóstico e laboratório antes da prática final. | Dividir em sequências menores e inserir prática entre blocos. |
| 2 | Alta | G | 10 aulas restantes da trilha `database` | FATO | Possuem seis seções e nenhum dos quatro prefixos padronizados nos exercícios. | Auditar uma a uma após os fundamentos e padronizar a progressão. |
| 3 | Média | G | 5 aulas HTML e 6 JavaScript | RISCO | Possuem cinco ou seis seções; já têm três passos guiados, mas somente um ou dois tipos de exercício explicitamente identificados. | Manter IDs e priorizar intercalação/prática antes de criar novas aulas. |
| 4 | Média | G | 9 aulas IA e 6 Entrega | RISCO | Possuem cinco seções e nenhum prefixo padronizado; parte da densidade pode ser compatível com o nível avançado. | Conferir pré-requisitos e tarefas de transferência antes de dividir. |
| 5 | Baixa | P | `scripts/audit-lesson-load.js` | SUGESTÃO | Contagem de seções é um indicador reproduzível, mas não mede dificuldade real. | Usar o relatório como triagem e exigir revisão humana antes de alterar conteúdo. |

## 4. Pré-requisitos

Grafo prioritário de banco:

`setup-python` ou cliente SQLite → db-modeling → db-ddl-crud → db-select → db-joins → db-transactions`

Arestas a preservar ao dividir:

- identidade, entidades e atributos antes de relacionamentos;
- relacionamentos e chaves antes de normalização;
- tabelas e restrições antes de CRUD seguro;
- filtros e `NULL` antes de agregações;
- chaves e agregações antes de `JOIN`, subconsulta e CTE;
- `UPDATE` seguro antes de transações e concorrência.

Não foram encontradas dependências circulares nesse recorte. O risco atual é avanço dentro da mesma aula sem checkpoint prático, não ordem invertida entre as cinco aulas.

## 5. Instalação e ambiente

| Ferramenta | Completo? | Falta neste escopo | Verificado? |
|---|---|---|---|
| SQLite por Python | Coberto no guia | Transformar a preparação repetida em referência curta quando as aulas forem divididas | Não executado nesta auditoria |
| Cliente SQLite local | Alternativa indicada | Nomear clientes suportados somente depois de conferir instalação por sistema | Não executado |
| Navegador/editor | Coberto pela Etapa 0 | Nenhuma mudança para o mapeamento | Não executado |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [SQLite — Foreign Key Support](https://www.sqlite.org/foreignkeys.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Confirma ativação de chaves estrangeiras por conexão com `PRAGMA foreign_keys`. |
| [SQLite — SELECT](https://www.sqlite.org/lang_select.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Sustenta ordem lógica, agregação e diferenças entre `ON` e `WHERE` em junções externas. |
| [SQLite — Transactions](https://www.sqlite.org/lang_transaction.html) | Oficial | OK | Consultada em 24/10/2026 | EN | Referência primária para a futura divisão de transações. |

As demais fontes das 41 candidatas não foram revalidadas nesta etapa, pois o objetivo foi triagem estrutural, não revisão técnica integral.

## 7. Nível de saída

O mapeamento permite planejar aulas menores, mas não melhora sozinho a aprendizagem. Depois das divisões, o aluno deverá modelar um domínio pequeno, criar regras no banco, consultar dados e explicar resultados sem consultar solução. Ainda não estão comprovados domínio, retenção após alguns dias ou capacidade de transferência; isso exige tarefas novas e observação de aluno real.

## 8. Próximos passos sugeridos

1. Dividir `db-modeling` em identidade/entidades, relacionamentos e normalização/decisões.
2. Dividir `db-ddl-crud` em definição/restrições e operações seguras.
3. Separar filtros/`NULL` de agregações em `db-select`.
4. Separar junções básicas de granularidade, CTEs e subconsultas em `db-joins`.
5. Separar transação básica de concorrência, repetição e efeitos externos em `db-transactions`.
6. Reexecutar a auditoria e revisar manualmente as prioridades 2 a 4.

## 9. Limites desta auditoria

O script usa quantidade de seções e rótulos dos exercícios como sinais; não interpreta automaticamente se duas seções ensinam o mesmo conceito nem se um exercício pratica múltiplas habilidades. Nenhuma aula foi executada por aluno real e nenhuma instalação foi repetida. A decisão de dividir continua humana e deve preservar IDs existentes e compatibilidade do progresso.

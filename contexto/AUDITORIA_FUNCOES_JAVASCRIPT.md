# Auditoria didática — funções JavaScript

**Data:** 24/10/2026  
**Escopo:** `js-functions`, `js-scope-pure` e `js-callbacks-closures`  
**Público:** pessoa iniciante que já concluiu valores, comparações, decisões e laços

## Contrato de aprendizagem

Ao final da sequência, o aluno deve conseguir:

- declarar e chamar funções, diferenciando parâmetros de argumentos e `return` de `console.log`;
- escrever e testar um contrato simples com casos válidos, limites e entradas recusadas;
- localizar nomes por escopo, tornar dependências explícitas e separar cálculo de efeito;
- passar um callback como referência e explicar quando ele é executado;
- construir duas closures com estados independentes e explicar por que não usam uma variável global.

O domínio não é comprovado por leitura ou quiz. A evidência necessária é resolver uma tarefa nova, sem consultar a solução, e explicar as decisões.

## Diagnóstico e decisão

A antiga `js-functions` reunia declaração, chamada, parâmetros, retorno, contrato, escopo, pureza, funções como valores, callbacks e closures antes de práticas intermediárias. A carga cognitiva era alta e antecipava conceitos necessários apenas na aula seguinte de arrays.

A sequência foi dividida em:

1. `js-functions` — parâmetros, argumentos, retorno, valores padrão e contratos;
2. `js-scope-pure` — escopo, dependências explícitas, funções puras e efeitos;
3. `js-callbacks-closures` — funções como valores, callbacks, closures e estado independente;
4. `js-arrays` — consumidora da sequência, agora com os três pré-requisitos explícitos.

O ID `js-functions` foi preservado para manter conclusões e notas existentes. Os outros dois IDs são novos. Como o quiz da aula preservada mudou, `javascriptRevision` passou de 2 para 3: a sanitização descarta somente tentativas antigas dos quizzes JavaScript e evita associar respostas anteriores às novas perguntas.

## Prática e avaliação

Cada uma das três aulas contém atividades de **prever**, **alterar**, **construir** e **investigar erro**, com resultado esperado separado da solução. Os exemplos exibem saída visível e a ajuda diminui até uma construção nova. Erros de referência versus chamada, `return` ausente, escopo de bloco e fábrica de closures são tratados no ponto em que aparecem.

O validador automático exige os quatro tipos de atividade nessas aulas. Ele verifica estrutura e cobertura editorial; não mede aprendizagem real.

## Fontes técnicas consultadas

- [MDN — Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN — Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [MDN — Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [MDN — Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)

As fontes são documentação técnica primária da plataforma Web. O material do curso não depende dos links como única explicação.

## Riscos restantes

- Ainda é necessário mapear outras aulas com mais de quatro conceitos centrais sem prática intermediária.
- A sequência não foi observada com aluno real; clareza e tempo estimado precisam de teste de uso.
- Os estados separados de leitura, prática, revisão e resolução autônoma pertencem à Fase 4.

## Parecer

**Aprovado para publicação desta etapa.** A divisão reduz a carga por aula, mantém compatibilidade com o progresso salvo e prepara callbacks antes de arrays. A aprovação cobre conteúdo e estrutura; não comprova eficácia com alunos reais.

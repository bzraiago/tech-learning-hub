'use strict';

// Registro compartilhado preenchido pelos arquivos de cada trilha.
const LESSON_GUIDES = {};

// Ações comuns aos quatro exercícios obrigatórios de cada aula.
const EXERCISE_STAGES = [
  {
    activityType: 'predict',
    label: 'PREVER · PRÁTICA GUIADA',
    instruction: 'Antes de executar ou concluir, registre o que você espera observar. Depois compare a previsão com o resultado e aponte uma diferença, se houver.',
    criterion: 'A previsão foi anotada antes da execução e comparada com um resultado observado ou demonstrado.'
  },
  {
    activityType: 'alter',
    label: 'ALTERAR · COM PISTAS',
    instruction: 'Use o exemplo desta aula como ponto de partida e altere apenas o necessário para cumprir o pedido. Registre o que mudou e confira um comportamento que deve continuar funcionando.',
    criterion: 'A alteração atende ao pedido e preserva ao menos um comportamento anterior relevante.'
  },
  {
    activityType: 'build',
    label: 'CONSTRUIR · PROBLEMA NOVO',
    instruction: 'Resolva o caso do enunciado com os dados fornecidos, sem copiar literalmente o resultado do exemplo. Registre a entrada ou situação e o resultado que observou.',
    criterion: 'A solução trata o caso proposto e inclui uma entrada ou situação diferente da demonstração inicial.'
  },
  {
    activityType: 'investigate',
    label: 'INVESTIGAR ERRO',
    instruction: 'Reproduza a falha descrita. Se não houver uma falha explícita, introduza uma variação pequena e reversível em uma cópia descartável ou analise-a no papel. Registre observação, hipótese, causa e correção; não arrisque dados reais ou compartilhados.',
    criterion: 'A falha foi observada ou prevista em ambiente isolado, a causa foi identificada e a correção recupera o comportamento esperado.'
  }
];

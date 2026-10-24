# Auditoria didática — Etapa 0

**Data:** 24/10/2026 · **Verificação de fontes:** feita

## 1. Veredito

A Etapa 0 cobre o bloqueio inicial identificado para uma pessoa sem experiência: ferramentas, arquivos, pasta atual, ciclo de execução e registro de erros. As cinco aulas possuem objetivos observáveis, exemplo, prática guiada, quatro exercícios com apoio decrescente, erros comuns, quiz e revisão. A prova final verifica uma execução observável, mas o domínio só poderá ser afirmado após uma pessoa iniciante realizá-la sem consultar a solução.

## 2. Contrato de aprendizagem

- **Público:** pessoa sem conhecimento prévio de programação e com familiaridade digital ainda não comprovada.
- **Nível prometido:** criar e localizar arquivos, alinhar editor e terminal, executar e interromper comandos seguros e relatar um erro com contexto.
- **Condições:** Windows, macOS ou Linux; VS Code recomendado, editor simples como alternativa; nenhum runtime de linguagem obrigatório.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Média | M | `prep-errors` | RISCO | A prova está especificada, mas ainda não foi observada com aluno iniciante real. | Executar o protocolo da Fase 11 e registrar erros recorrentes. |
| 2 | Baixa | P | `prep-files` | FATO | A interface do Windows varia entre versões; a aula apresenta os dois caminhos comuns para extensões. | Confirmar visualmente em versões disponíveis durante teste com alunos. |
| 3 | Baixa | P | `prep-workspace` | FATO | VS Code é recomendado, mas não obrigatório; existe alternativa com editor simples e terminal separado. | Manter a alternativa ao revisar instalações. |

## 4. Pré-requisitos

```text
prep-tools
  → prep-files
    → prep-workspace
      → prep-cycle
        → prep-errors e prova prática
          → html-semantic
```

Não foram encontradas dependências circulares. A Etapa 0 não exige Python, Node.js, Git, Docker ou banco de dados.

## 5. Instalação e ambiente

| Ferramenta | Completo? | Falta | Verificado? |
|---|---|---|---|
| Gerenciador de arquivos | Sim para a tarefa inicial | Teste em versões variadas dos sistemas | Conteúdo revisado; execução multiplataforma não realizada |
| Editor | Sim | Instalação detalhada pertence à Fase 2 | Documentação oficial do VS Code verificada |
| Terminal/shell | Sim para localização, listagem, saída e interrupção | Instalações avançadas não são necessárias | Comandos simples revisados; não executados em todos os sistemas |
| Runtime de linguagem | Não exigido | Será preparado na Fase 2 | Não aplicável nesta etapa |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [VS Code — primeiros passos](https://code.visualstudio.com/docs/getstarted/overview) | Documentação oficial | OK | Verificada em 24/10/2026 | EN | Confirma instalação, abertura de pasta e uso sem conta. |
| [VS Code — terminal integrado](https://code.visualstudio.com/docs/terminal/getting-started) | Documentação oficial | OK | Verificada em 24/10/2026 | EN | Confirma terminal no workspace e comandos iniciais. |
| [MDN — linha de comando](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) | Documentação educacional primária | OK | Verificada em 24/10/2026 | EN | Complementa conceitos de terminal; não substitui as aulas. |
| [Microsoft — extensões de arquivo](https://support.microsoft.com/en-au/windows/experience/storage-filemanagement/common-file-name-extensions-in-windows) | Suporte oficial | OK | Verificada em 24/10/2026 | EN | Confirma o caminho para exibir extensões no Windows. |

## 7. Nível de saída

- **Competências cobertas:** diferenciar ferramentas, criar e localizar arquivos, conferir pasta atual, executar e interromper comandos e produzir relato reproduzível de erro.
- **Lacuna:** desempenho de alunos reais ainda não observado.
- **Não comprovado:** programação, domínio de terminal, instalação de runtimes ou autonomia profissional. A Etapa 0 prepara essas aprendizagens; não as certifica.

## 8. Próximos passos sugeridos

1. Executar a prova com pessoa iniciante e sem ajuda durante a primeira tentativa.
2. Registrar sistema, tempo, erros e pontos de abandono.
3. Avançar para o mapa de pré-requisitos e instalações da Fase 2.

## 9. Limites desta auditoria

As páginas e fontes foram verificadas estruturalmente. Os comandos não foram executados em Windows, macOS e Linux nesta auditoria, e não houve teste de aprendizagem com aluno real.

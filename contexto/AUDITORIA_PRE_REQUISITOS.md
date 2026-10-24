# Auditoria didática — mapa de pré-requisitos

**Data:** 24/10/2026 · **Verificação de fontes:** parcial

## 1. Veredito

O mapa torna explícitas as principais dependências entre as nove trilhas e impede que Python, Node.js ou Docker apareçam como requisitos silenciosos. Os atalhos para servidor local, SQLite e PostgreSQL reduzem reordenações desnecessárias. Editor, Python, Git e Node.js/npm agora possuem preparações próprias; a Fase 2 permanece em andamento porque Docker/WSL e bancos ainda precisam do mesmo tratamento.

## 2. Contrato de aprendizagem

- **Público:** aluno que concluiu ou consegue demonstrar a Etapa 0.
- **Saída prometida:** identificar o que precisa estudar ou preparar antes de iniciar uma aula dependente.
- **Condições:** Windows, macOS ou Linux; ferramentas instaladas apenas quando a trilha realmente as exige.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Baixa | P | `setup-editor`, `setup-python`, `setup-git`, `setup-node` | FATO | As quatro preparações essenciais foram publicadas com passos por sistema, verificação, recuperação e alternativa. | Manter as fontes oficiais e os comandos atualizados. |
| 2 | Alta | G | Banco de Dados | FATO | Docker, PostgreSQL e demais motores possuem instruções, mas ainda não formam preparações separadas e uniformes. | Implementar a segunda parte da Fase 2. |
| 3 | Média | P | `js-storage`, `js-modules` | RISCO | Python pode ser usado apenas como servidor local, levando o aluno a pensar que precisa concluir Python. | Manter o atalho mínimo explícito no mapa e nas aulas afetadas. |

## 4. Pré-requisitos

O grafo completo está em `docs/MAPA_PRE_REQUISITOS.md`. Não foram encontradas dependências circulares. As arestas ainda incompletas estão registradas como abertas, sem serem apresentadas como concluídas.

## 5. Instalação e ambiente

| Ferramenta | Completo? | Falta | Verificado? |
|---|---|---|---|
| Editor | Sim, no conteúdo | Execução com aluno real | Fonte oficial verificada; instalação não executada |
| Python | Sim, no conteúdo | Execução com aluno real | Fonte oficial verificada; instalação não executada |
| Git | Sim, no conteúdo | Execução com aluno real | Fonte oficial verificada; instalação não executada |
| Node.js/npm | Sim, no conteúdo | Execução com aluno real | Fonte oficial verificada; instalação não executada |
| Docker/WSL e bancos | Não nesta entrega | Preparações completas e alternativas leves | Não verificado nesta entrega |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [VS Code — configuração](https://code.visualstudio.com/docs/setup/windows) | Oficial | OK | Verificada em 24/10/2026 | EN | Confirma instalação de usuário e novo terminal após alteração de PATH. |
| [Python — downloads](https://www.python.org/downloads/) | Oficial | OK | Verificada em 24/10/2026 | EN | Fonte principal para instaladores estáveis. |
| [Git — instalação](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) | Oficial | OK | Verificada em 24/10/2026 | EN | Diferencia caminhos por Windows, macOS e Linux. |
| [Node.js — downloads](https://nodejs.org/en/download) | Oficial | OK | Verificada em 24/10/2026 | EN | Disponibiliza versões LTS e inclui npm. |

## 7. Nível de saída

O mapa permite escolher uma sequência coerente e reconhecer preparações mínimas. Ele não comprova que ferramentas foram instaladas nem que os comandos funcionam no computador do aluno.

## 8. Próximos passos sugeridos

1. Criar preparação de Docker/WSL e alternativa leve.
2. Consolidar PostgreSQL e depois aprofundamentos de outros motores.
3. Validar as quatro preparações essenciais com alunos e máquinas reais.

## 9. Limites desta auditoria

As relações foram conferidas no conteúdo atual, mas não houve instalação multiplataforma nesta entrega. Docker e bancos serão verificados na próxima parte da Fase 2.

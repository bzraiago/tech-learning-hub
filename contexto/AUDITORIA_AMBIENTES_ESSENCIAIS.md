# Auditoria didática — ambientes essenciais

**Data:** 24/10/2026 · **Verificação de fontes:** feita

## 1. Veredito

As aulas `setup-editor`, `setup-python`, `setup-git` e `setup-node` cumprem o padrão estrutural de instalação para iniciantes: objetivo, requisitos, caminhos por sistema, verificação, resultado esperado, diagnóstico, retomada e alternativa leve. Cada aula também separa disponibilidade da ferramenta de domínio prático. A entrega reduz um bloqueio importante, mas não comprova que os procedimentos funcionam em toda máquina; Docker/WSL e bancos permanecem fora deste escopo.

## 2. Contrato de aprendizagem

- **Público:** aluno iniciante que concluiu `prep-workspace`, `prep-cycle` e `prep-errors`.
- **Saída prometida:** instalar ou identificar uma alternativa, verificar a ferramenta e produzir evidência mínima do ambiente.
- **Condições:** Windows, macOS ou Linux; internet e permissão de instalação quando disponíveis.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Alta | G | Fase 2 | FATO | Docker/WSL e bancos ainda não têm preparações equivalentes. | Implementar o próximo bloco sem marcar a fase completa. |
| 2 | Média | M | Quatro aulas novas | RISCO | Passos não foram executados em máquinas reais dos três sistemas. | Fazer validação multiplataforma e registrar divergências. |
| 3 | Baixa | P | `setup-node` | FATO | A aula recomenda a linha LTS sem fixar uma versão que ficará obsoleta. | Conferir periodicamente a página oficial. |

## 4. Pré-requisitos

```text
prep-workspace → prep-cycle → prep-errors → setup-editor
                                      ├──→ setup-python
                                      ├──→ setup-git
                                      └──→ setup-node
```

Não foram encontradas dependências circulares. A instalação do editor é recomendada antes dos runtimes, mas as verificações de Python, Git e Node.js podem ser feitas diretamente no terminal.

## 5. Instalação e ambiente

| Ferramenta | Completo no conteúdo? | Falta | Verificado? |
|---|---|---|---|
| VS Code/editor | Sim | Teste com diferentes políticas de instalação | Fonte verificada; instalação não executada |
| Python 3 | Sim | Teste de `py`, `python` e `python3` em máquinas reais | Fonte verificada; instalação não executada |
| Git | Sim | Teste dos shells disponíveis em cada sistema | Fonte verificada; instalação não executada |
| Node.js/npm | Sim | Teste conjunto de `node` e `npm` | Fonte verificada; instalação não executada |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [VS Code — configuração](https://code.visualstudio.com/docs/setup/setup-overview) | Documentação oficial | OK | Verificada em 24/10/2026 | EN | Direciona para instruções específicas por sistema. |
| [Python — downloads](https://www.python.org/downloads/) | Site oficial | OK | Verificada em 24/10/2026 | EN | Fonte de instaladores e versões atuais. |
| [Git — instalação](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) | Documentação oficial | OK | Verificada em 24/10/2026 | EN | Cobre Windows, macOS e Linux. |
| [Node.js — downloads](https://nodejs.org/en/download) | Site oficial | OK | Verificada em 24/10/2026 | EN | Expõe a linha LTS e métodos por sistema. |

## 7. Nível de saída

Ao executar as práticas, o aluno pode comprovar que localiza comandos, registra versões reais e roda um teste mínimo. Quiz e marcação de conclusão não provam domínio. Também não estão comprovados instalação autônoma em qualquer máquina, solução de todo problema de PATH ou uso profissional das ferramentas.

## 8. Próximos passos sugeridos

1. Criar a preparação de Docker/WSL com checagem de virtualização e alternativa leve.
2. Criar as preparações de PostgreSQL e dos motores de aprofundamento.
3. Realizar teste manual das quatro aulas em Windows, macOS e Linux.

## 9. Limites desta auditoria

As estruturas e fontes foram revisadas, mas os instaladores e comandos não foram executados nos três sistemas. Não houve teste com aluno real. Esta auditoria valida cobertura didática, não aprendizagem nem compatibilidade universal.

# Auditoria didática — Docker, WSL e alternativa leve

**Data:** 24/10/2026 · **Verificação de fontes:** feita

## 1. Veredito

`setup-docker` cobre requisitos, caminhos por sistema, WSL/virtualização no Windows, verificação separada de cliente, Engine e Compose, diagnóstico e retomada. `setup-docker-alternative` oferece SQLite sem apresentar a alternativa como equivalente a Docker ou PostgreSQL. A preparação remove uma dependência implícita, mas não comprova instalação multiplataforma nem substitui as aulas operacionais `db-docker-*`.

## 2. Contrato de aprendizagem

- **Público:** aluno iniciante que concluiu a Etapa 0; para a alternativa, Python 3 funcional.
- **Saída prometida:** verificar os requisitos, instalar pelo caminho oficial ou justificar a alternativa e produzir evidências reais.
- **Condições:** Windows, macOS ou Linux; possível limitação de hardware, política administrativa, espaço ou rede.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Alta | M | `setup-docker` | RISCO | A instalação não foi executada em máquinas reais dos três sistemas. | Testar por plataforma e registrar divergências. |
| 2 | Alta | G | Fase 2 | FATO | PostgreSQL e seus clientes ainda não têm preparação independente. | Implementar a próxima etapa antes de liberar o projeto intermediário. |
| 3 | Média | P | `setup-docker-alternative` | FATO | O conteúdo lista explicitamente as competências que SQLite não cobre. | Preservar essa distinção em futuras revisões. |
| 4 | Média | P | `setup-docker` | FATO | O risco de privilégio do grupo `docker` no Linux é informado. | Manter a orientação alinhada à documentação oficial. |

## 4. Pré-requisitos

```text
prep-workspace → prep-cycle → prep-errors → setup-docker → db-docker-basics
setup-python ─────────────────────────────→ setup-docker-alternative
setup-docker-alternative ── retorno obrigatório ──→ setup-docker → db-docker-*
```

Não há dependência circular: a seta de retorno representa pendência, não pré-requisito para estudar SQLite. PostgreSQL real permanece dependente do caminho Docker operacional.

## 5. Instalação e ambiente

| Ferramenta | Completo no conteúdo? | Falta | Verificado? |
|---|---|---|---|
| WSL 2/virtualização | Sim, como requisito e diagnóstico | Execução em Windows compatível e incompatível | Fontes verificadas; não executado |
| Docker Desktop Windows | Sim | Teste com Engine iniciado e reinício | Cliente 29.7.2 e Compose 5.3.1 observados; Engine indisponível |
| Docker Desktop macOS | Sim | Teste em Apple silicon e Intel | Fonte verificada; não executado |
| Docker Engine Linux | Sim | Teste por distribuição e política de acesso | Fonte verificada; não executado |
| Docker Compose | Sim, verificação | Execução de laboratório ocorre em `db-docker-compose` | Não executado nesta auditoria |
| SQLite alternativo | Sim, roteiro | Persistência em arquivo pela interface | Consulta equivalente executada em memória; roteiro em arquivo não executado |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [Docker Desktop — Windows](https://docs.docker.com/desktop/setup/install/windows-install/) | Oficial | OK | Verificada em 24/10/2026 | EN | Apresenta requisitos e backend WSL 2. |
| [Microsoft — instalar WSL](https://learn.microsoft.com/windows/wsl/install) | Oficial | OK | Verificada em 24/10/2026 | PT-BR disponível | Informa requisitos, PowerShell administrativo e reinício. |
| [Docker Desktop — macOS](https://docs.docker.com/desktop/setup/install/mac-install/) | Oficial | OK | Verificada em 24/10/2026 | EN | Distingue Apple silicon e Intel e lista requisitos. |
| [Docker Engine — Linux](https://docs.docker.com/engine/install/) | Oficial | OK | Verificada em 24/10/2026 | EN | Direciona para distribuições suportadas. |
| [Pós-instalação Linux](https://docs.docker.com/engine/install/linux-postinstall/) | Oficial | OK | Verificada em 24/10/2026 | EN | Alerta sobre privilégios do grupo `docker`. |
| [Python — sqlite3](https://docs.python.org/3/library/sqlite3.html) | Oficial | OK | Verificada em 24/10/2026 | EN | Sustenta a alternativa local sem servidor. |

## 7. Nível de saída

O aluno pode demonstrar diagnóstico inicial do ambiente, execução mínima do Docker ou uma alternativa SQLite documentada. Isso não comprova domínio de imagens, Compose, redes, volumes, PostgreSQL, backup ou operação de produção. A alternativa não atende às evidências do projeto intermediário.

## 8. Próximos passos sugeridos

1. Criar preparação de PostgreSQL e clientes com conexão padronizada em `127.0.0.1:55432`.
2. Criar preparações dos bancos de aprofundamento.
3. Executar testes manuais em Windows, macOS e Linux.

## 9. Limites desta auditoria

As fontes foram abertas e o contrato do conteúdo foi validado automaticamente. Nesta máquina Windows, `docker version` mostrou o cliente 29.7.2, mas não encontrou o Engine, e `docker compose version` mostrou 5.3.1; também houve aviso de acesso negado ao arquivo local de configuração. Isso confirma o cenário didático “cliente disponível, servidor indisponível”, mas não comprova execução de container. Uma consulta SQLite equivalente foi executada em memória (`SQLite 3.37.2`, contagem `1`), sem testar a criação de `estudos.db`. Nenhum instalador foi executado e nenhum recurso de virtualização foi alterado. Não houve teste com aluno real.

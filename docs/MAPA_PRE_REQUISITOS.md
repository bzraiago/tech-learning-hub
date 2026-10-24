# Mapa de pré-requisitos

Este documento define a ordem recomendada e os atalhos mínimos entre trilhas. Um atalho de preparação evita obrigar o aluno a concluir uma trilha inteira para usar uma ferramenta pontual.

## Legenda

- **Obrigatório:** conhecimento usado diretamente e não reapresentado na aula de destino.
- **Preparação mínima:** configuração ou habilidade operacional necessária, sem exigir domínio da trilha de origem.
- **Recomendado:** reduz a dificuldade, mas a aula ainda explica o necessário.

## Grafo principal

```text
prep-tools → prep-files → prep-workspace → prep-cycle → prep-errors
                                                      ↓
                                                html-semantic
                                                      ↓
                           html-semantic → javascript básico → DOM/eventos
                                                      ↓
                                               git-workflow

prep-workspace → preparação Python → py-syntax → arquivos/JSON/testes
                                             ↘
                                              práticas de dados e IA

prep-workspace → preparação Node.js/npm → quality-cases → quality-ci
                                      ↘
                                       delivery-http → delivery-ci

SQL básico com SQLite → Docker/Compose → PostgreSQL em 127.0.0.1:55432
                                   ↘
                                    API → validação → regra → banco → testes → publicação
```

## Dependências por trilha

| Destino | Tipo | Pré-requisito ou preparação | Motivo |
|---|---|---|---|
| HTML & CSS | Recomendado | Etapa 0 completa | Criar arquivos, salvar, abrir no navegador e investigar caminhos. |
| JavaScript básico | Recomendado | `html-semantic` e Etapa 0 | Exemplos usam documentos HTML e console do navegador. |
| JavaScript DOM/eventos | Obrigatório | HTML básico + JavaScript básico | Seletores, elementos e eventos dependem da estrutura da página. |
| `js-storage` e `js-modules` | Preparação mínima | Servidor local; Python pode ser usado sem concluir toda a trilha | Recursos do navegador têm comportamento diferente em `file://`; a aula informa o comando. |
| Python | Preparação mínima | `prep-workspace`, `prep-cycle` e instalação de Python 3 | Arquivos `.py` são executados pelo terminal. |
| Banco com SQLite/Python | Obrigatório | `py-syntax`, funções e arquivos | Os laboratórios usam o módulo `sqlite3`. |
| Docker/Compose | Preparação mínima | Etapa 0 e instalação do Docker/WSL quando aplicável | Comandos, serviço e volumes precisam de ambiente operacional. |
| PostgreSQL via Docker | Obrigatório | SQL básico + Docker/Compose | O laboratório usa o serviço `db`, usuário `aluno`, banco `estudos` e porta do host `55432`. |
| Git & Colaboração | Recomendado | Etapa 0 + ao menos um projeto pequeno | Commits precisam registrar mudanças reais em arquivos conhecidos. |
| Qualidade | Obrigatório | JavaScript básico + preparação Node.js/npm | Testes automatizados são executados pelo Node.js. |
| Integração & Entrega | Obrigatório | HTML, JavaScript e preparação Node.js/npm | Laboratórios locais usam HTTP e ferramentas do ecossistema Node. |
| Engenharia de IA conceitual | Recomendado | Python básico e JSON | Os exemplos locais reutilizam estruturas e scripts Python. |
| Engenharia de IA conectada | Obrigatório | Python, HTTP/APIs, testes e segurança de credenciais | Uso real exige runtime, contrato, avaliação e controle de segredos. |

## Atalhos de preparação mínima

### Servidor local para JavaScript

Não é necessário concluir Python. Instale Python 3, confirme `python --version`, `py --version` ou `python3 --version` e execute, na pasta do exercício:

```text
python -m http.server 8000
```

Use a variação de comando reconhecida pelo seu sistema. Resultado esperado: o terminal informa atendimento na porta 8000; abra `http://localhost:8000`. Encerre com Ctrl+C.

### SQLite antes dos servidores

SQLite é o caminho inicial porque não exige serviço em segundo plano. Quando o laboratório usar Python, conclua primeiro a preparação Python e as aulas de sintaxe, funções e arquivos.

### PostgreSQL do laboratório Docker

Conexão a partir do computador:

```text
host: 127.0.0.1
porta: 55432
banco: estudos
usuário: aluno
```

Outro serviço dentro da mesma rede Compose usa `db:5432`. Não substitua um endereço pelo outro sem identificar de onde parte a conexão.

## Arestas atualmente abertas

| Severidade | Aresta | Estado | Próxima implementação |
|---|---|---|---|
| Bloqueante | Etapa 0 → primeira aula | Resolvida | Validar com aluno real na Fase 11. |
| Alta | Etapa 0 → instalação Python | Resolvida | Manter a preparação `setup-python` atualizada com a documentação oficial. |
| Alta | Etapa 0 → instalação Git | Resolvida | Manter a preparação `setup-git` atualizada com a documentação oficial. |
| Alta | Etapa 0 → instalação Node.js/npm | Resolvida | Manter `setup-node` e a distinção navegador/runtime. |
| Alta | Etapa 0 → Docker/WSL | Parcial | Criar preparação com virtualização e alternativa leve. |
| Alta | Docker → PostgreSQL | Parcial | Consolidar instalação, clientes, serviço e conexão `55432`. |
| Média | PostgreSQL → MariaDB/Firebird/MongoDB | Aberta como aprofundamento | Criar preparações separadas sem bloquear o caminho principal. |

## Regra de manutenção

Ao adicionar uma aula que use nova ferramenta, runtime, serviço, porta ou conhecimento de outra trilha:

1. registre a aresta neste mapa;
2. informe o atalho no campo `prerequisites` ou `setup` da aula;
3. mantenha nomes, usuários e portas iguais entre aula e projeto;
4. não renomeie ids existentes sem migração em `sanitizeState()`.

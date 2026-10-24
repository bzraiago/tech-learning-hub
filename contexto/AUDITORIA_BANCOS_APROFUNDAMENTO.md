# Auditoria didática — bancos de aprofundamento

**Data:** 24/10/2026 · **Verificação de fontes:** feita

## 1. Veredito

`setup-mariadb`, `setup-firebird` e `setup-mongodb` tornam explícitas instalação, servidor, cliente, verificação, retomada e limitações por sistema. As três aulas se declaram opcionais e preservam SQLite/PostgreSQL como caminho principal. A cobertura é adequada como preparação, mas nenhuma instalação foi executada nesta máquina e os três clientes estavam ausentes.

## 2. Contrato de aprendizagem

- **Público:** aluno com Etapa 0 e SQL básico que possui motivo concreto para estudar outro motor.
- **Saída prometida:** preparar um ambiente de laboratório, verificar conexão e registrar evidência sem segredos.
- **Condições:** Windows, macOS ou Linux; permissão de instalação; aprofundamento opcional.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Alta | M | Três preparações | RISCO | Instalações e conexões não foram executadas. | Testar por plataforma antes de afirmar compatibilidade prática. |
| 2 | Média | P | `setup-mariadb` | FATO | A aula diferencia `-P` de porta e `-p` de senha. | Preservar a distinção nos comandos futuros. |
| 3 | Média | P | `setup-firebird` | FATO | A aula exige confirmar a origem do executável `isql` e a permissão do caminho. | Validar com instalação Firebird 5 real. |
| 4 | Média | P | `setup-mongodb` | FATO | A aula separa `mongosh --version` de ping no servidor. | Manter servidor e cliente como verificações distintas. |

## 4. Pré-requisitos

```text
SQL básico → setup-mariadb → db-mariadb
SQL básico → setup-firebird → db-firebird
SQL básico → setup-mongodb → db-mongo-crud → db-mongo-pipelines

caminho principal: SQLite → Docker/PostgreSQL
aprofundamentos: MariaDB | Firebird | MongoDB
```

Não foram encontradas dependências circulares. Nenhum dos três aprofundamentos bloqueia a sequência principal.

## 5. Instalação e ambiente

| Ferramenta | Completo no conteúdo? | Falta | Verificado? |
|---|---|---|---|
| MariaDB Server + cliente | Sim | Instalação e conexão reais | `mariadb` não localizado nesta máquina |
| Firebird 5 + isql | Sim | Instalação, serviço e pasta permitida reais | `isql` não localizado nesta máquina |
| MongoDB Community + mongosh | Sim | Instalação ou container e ping reais | `mongosh` não localizado nesta máquina |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [MariaDB — começar](https://mariadb.com/get-started-with-mariadb/) | Oficial | OK | Verificada em 24/10/2026 | EN | Apresenta instalação Community por plataforma. |
| [MariaDB — implantação](https://mariadb.com/docs/server/server-management/install-and-upgrade-mariadb) | Oficial | OK | Verificada em 24/10/2026 | EN | Centraliza instalação e atualização do servidor. |
| [Firebird — downloads](https://www.firebirdsql.org/en/downloads/) | Oficial | OK | Verificada em 24/10/2026 | EN | Lista Firebird 5.0 atual e plataformas. |
| [Firebird 5 — guia de início](https://www.firebirdsql.org/file/documentation/html/en/firebirddocs/qsg5/firebird-5-quickstartguide.html) | Oficial | OK | Verificada em 24/10/2026 | EN | Cobre kits, serviço, ferramentas e caminhos. |
| [MongoDB Community — instalação](https://www.mongodb.com/docs/manual/installation/) | Oficial | OK | Verificada em 24/10/2026 | EN/PT-BR | Direciona para tutoriais Community por plataforma. |
| [MongoDB Shell — instalação](https://www.mongodb.com/docs/mongodb-shell/install/) | Oficial | OK | Verificada em 24/10/2026 | EN/PT-BR | Separa a instalação do cliente da conexão ao servidor. |

## 7. Nível de saída

Ao executar uma preparação, o aluno pode comprovar disponibilidade básica de um motor e seu cliente. Isso não prova administração, backup, desempenho, segurança de produção ou domínio de múltiplos bancos. Ler ou marcar as três aulas não aumenta automaticamente o nível profissional.

## 8. Próximos passos sugeridos

1. Revisar portas, bancos, usuários e nomes em todos os laboratórios e projetos.
2. Confirmar que todas as preparações seguem o padrão completo da Fase 2.
3. Testar os três ambientes em máquinas autorizadas.

## 9. Limites desta auditoria

As fontes e a estrutura foram verificadas. `Get-Command` e `where.exe` não localizaram `mariadb`, `isql` ou `mongosh` nesta máquina. Nenhum instalador, serviço, banco, arquivo `.fdb` ou conexão foi executado; nenhuma credencial foi solicitada.

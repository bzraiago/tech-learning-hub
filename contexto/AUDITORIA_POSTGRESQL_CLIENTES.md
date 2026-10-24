# Auditoria didática — PostgreSQL e clientes

**Data:** 24/10/2026 · **Verificação de fontes:** feita

## 1. Veredito

`setup-postgresql` torna explícita a diferença entre servidor, `psql` e pgAdmin, ensina instalação por sistema e fixa o contrato do laboratório em `127.0.0.1:55432`, banco `estudos` e usuário `aluno`. O projeto `project-db-relational` agora utiliza os mesmos parâmetros, eliminando a inconsistência conhecida. A estrutura sustenta preparação operacional, mas a conexão real não foi comprovada porque o Engine estava indisponível e `psql` não está instalado nesta máquina.

## 2. Contrato de aprendizagem

- **Público:** aluno que concluiu Etapa 0, `setup-docker` e `db-docker-compose`.
- **Saída prometida:** instalar ou localizar um cliente, conectar ao servidor correto e diagnosticar serviço, porta, banco e credencial separadamente.
- **Condições:** Windows, macOS ou Linux; PostgreSQL do laboratório Docker healthy; senha local fora do repositório.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Alta | M | `setup-postgresql` | RISCO | A instalação e conexão externa não foram executadas nesta máquina. | Testar `psql` por sistema com o laboratório ativo. |
| 2 | Alta | P | `project-db-relational` | FATO | Host e porta antes implícitos agora são `127.0.0.1:55432`. | Preservar esses parâmetros nas revisões. |
| 3 | Média | P | `setup-postgresql` | FATO | A aula diferencia cliente externo de `db:5432` na rede Compose. | Reutilizar a distinção na futura API. |
| 4 | Média | P | `setup-postgresql` | FATO | Senha não aparece nos comandos ou entregáveis. | Manter prompt ou armazenamento local protegido. |

## 4. Pré-requisitos

```text
setup-docker → db-docker-basics → db-docker-compose → setup-postgresql
setup-postgresql → db-postgresql → project-db-relational
```

Não há dependência circular. A alternativa SQLite permite continuar SQL básico, mas não libera o projeto PostgreSQL nem a evidência de conexão cliente-servidor.

## 5. Instalação e ambiente

| Ferramenta | Completo no conteúdo? | Falta | Verificado? |
|---|---|---|---|
| Servidor PostgreSQL Docker | Já coberto | Engine e serviço healthy nesta máquina | Não executado; Engine indisponível |
| psql Windows | Sim | Instalação e PATH reais | `psql` não localizado nesta máquina |
| psql macOS | Sim | Instalação real | Não executado |
| psql Linux | Sim | Pacote por distribuição | Não executado |
| pgAdmin opcional | Sim | Instalação e conexão real | Não executado |
| Parâmetros do laboratório | Sim | Conexão ponta a ponta | Consistência estática verificada |

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [PostgreSQL — downloads](https://www.postgresql.org/download/) | Oficial | OK | Verificada em 24/10/2026 | EN | Direciona para pacotes de Windows, macOS e Linux. |
| [PostgreSQL — psql](https://www.postgresql.org/docs/current/app-psql.html) | Oficial | OK | Verificada em 24/10/2026 | EN | Documenta host, porta, usuário, banco e comandos do cliente. |
| [pgAdmin — downloads](https://www.pgadmin.org/download/) | Oficial | OK | Verificada em 24/10/2026 | EN | Disponibiliza clientes por plataforma. |
| [PostgreSQL — imagem oficial](https://hub.docker.com/_/postgres) | Imagem oficial | OK | Verificada em 24/10/2026 | EN | Confirma variáveis de inicialização e particularidades do volume. |

## 7. Nível de saída

Ao executar a aula, o aluno pode demonstrar instalação do cliente, conexão explícita, identificação do destino e diagnóstico inicial. Isso não comprova administração PostgreSQL, segurança de produção, backup, migração nem domínio de SQL. Sem execução real, esta auditoria comprova apenas cobertura e consistência do material.

## 8. Próximos passos sugeridos

1. Criar preparações de MariaDB, Firebird e MongoDB como aprofundamentos.
2. Revisar globalmente portas, bancos, usuários e nomes após todas as preparações.
3. Testar a conexão `psql` ponta a ponta em Windows, macOS e Linux.

## 9. Limites desta auditoria

As fontes e os parâmetros no código foram conferidos. Nesta máquina, `psql --version` e `where psql` informaram que o cliente não está instalado; o Docker Engine também permanecia indisponível. Nenhuma instalação foi feita, nenhuma senha foi solicitada e nenhum banco foi criado.

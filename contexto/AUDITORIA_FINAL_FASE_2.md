# Auditoria didática — conclusão da Fase 2

**Data:** 24/10/2026 · **Verificação de fontes:** consolidada das auditorias 2.1 a 2.5

## 1. Veredito

A Fase 2 atende ao aceite estrutural: ferramentas e serviços utilizados pelo curso possuem preparação anterior ou atalho explícito, e dez preparações seguem o mesmo contrato de ambiente. Portas, bancos, usuários e nomes centrais foram comparados entre aulas e projetos. O validador agora impede regressões nesses contratos. A conclusão comprova cobertura e consistência do curso, não instalações bem-sucedidas em todas as plataformas nem aprendizagem do aluno.

## 2. Contrato de aprendizagem

- **Público:** iniciante que concluiu a Etapa 0 e chega a uma aula dependente de ferramenta.
- **Saída prometida:** instalar ou escolher alternativa, verificar, diagnosticar e retomar o ambiente com evidência.
- **Condições:** Windows, macOS ou Linux; permissões e recursos variáveis; nenhuma credencial real no material.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Alta | G | Fase 11 | RISCO | Instalação multiplataforma e uso por alunos reais continuam sem comprovação. | Validar em máquinas e perfis reais antes da conclusão final do curso. |
| 2 | Média | P | `scripts/validate-content.js` | FATO | Dez preparações são verificadas por marcadores e quatro tipos de exercício. | Manter a lista ao adicionar ferramenta. |
| 3 | Média | P | Contratos de bancos | FATO | Parâmetros centrais agora têm asserções automáticas. | Atualizar aula, projeto, mapa e teste na mesma mudança. |
| 4 | Alta | G | Fase 6 | FATO | Backend com persistência continua sendo a maior lacuna curricular. | Avançar pelas Fases 3–5 antes de implementar a sequência completa. |

## 4. Pré-requisitos

```text
Etapa 0 → editor/Python/Git/Node
Etapa 0 → Docker/WSL → PostgreSQL → projeto relacional
Python → alternativa SQLite
SQL básico → MariaDB | Firebird | MongoDB (aprofundamentos opcionais)
```

Não foram encontradas dependências circulares. O projeto intermediário continua bloqueado pelas fases posteriores, não por ausência de preparação de ambiente.

## 5. Instalação e ambiente

| Grupo | Completo no conteúdo? | Contrato automático | Execução real |
|---|---|---|---|
| Editor, Python, Git, Node/npm | Sim | Estrutura pedagógica | Parcial nesta máquina |
| Docker/WSL | Sim | Estrutura pedagógica | Cliente/Compose observados; Engine indisponível |
| PostgreSQL/psql | Sim | `127.0.0.1:55432`, `estudos`, `aluno` | psql ausente; conexão não executada |
| MariaDB | Sim, opcional | `127.0.0.1:3306`, `hub_maria_aula`, `root` | Não executada |
| Firebird | Sim, opcional | `localhost`, `hub_fb_aula.fdb`, `SYSDBA` | Não executada |
| MongoDB/mongosh | Sim, opcional | `127.0.0.1:27017`, bancos de laboratório | Não executada |

## 6. Fontes

As fontes oficiais foram verificadas nas auditorias específicas:

- `AUDITORIA_AMBIENTES_ESSENCIAIS.md`
- `AUDITORIA_DOCKER_WSL.md`
- `AUDITORIA_POSTGRESQL_CLIENTES.md`
- `AUDITORIA_BANCOS_APROFUNDAMENTO.md`

O fechamento não adicionou novas fontes externas.

## 7. Nível de saída

O material permite que o aluno produza evidências operacionais de preparação e reconheça componentes, parâmetros e erros comuns. Isso não comprova domínio profissional de administração de sistemas ou bancos. A meta júnior continua dependente de aplicação completa, testes, publicação, manutenção e explicação.

## 8. Próximos passos sugeridos

1. Iniciar a Fase 3 pela padronização das aulas e exercícios.
2. Priorizar divisão da aula de funções JavaScript e demonstrações visuais.
3. Preservar o validador de ambientes em todas as mudanças futuras.

## 9. Limites desta auditoria

A auditoria foi estática e consolidou os testes já registrados. Não instalou software, não iniciou serviços, não solicitou credenciais e não executou conexões reais aos bancos. O checklist manual de interface e testes com alunos permanecem para fases próprias.

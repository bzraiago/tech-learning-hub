# Auditoria didática — deploy, serviços e operação

**Data:** 24/10/2026  
**Verificação de fontes:** feita nas documentações oficiais citadas  
**Escopo:** trilha `delivery` e proposta de extensão com Clerk, Supabase, Vercel, DNS, OAuth/OIDC, Redis, LGPD e segurança

## 1. Veredito

A trilha `delivery` já ensina HTTP, Fetch, autenticação conceitual, CORS, segredos, ambientes e publicação estática, mas ainda não conduz o aluno por uma entrega real com autenticação, persistência gerenciada, domínio e operação. A lacuna é alta para a promessa de nível júnior. Recomenda-se ampliar a trilha existente, em vez de criar uma trilha isolada por fornecedor: Vercel, Clerk e Supabase formam o laboratório principal; os conceitos e critérios permanecem transferíveis.

## 2. Contrato de aprendizagem

- **Público:** aluno que concluiu HTML/CSS, JavaScript, Git, HTTP, SQL/PostgreSQL e testes básicos.
- **Saída prometida:** publicar e operar uma aplicação pequena com login, autorização por usuário, banco persistente, domínio, HTTPS, CI, segurança básica, privacidade e recuperação.
- **Condições:** computador com Node.js/npm e Git, contas gratuitas nos serviços, navegador, terminal e domínio próprio opcional; dados sempre fictícios.

## 3. Achados prioritários

| # | Severidade | Esforço | Onde | Tipo | Achado | Ação |
|---|---|---|---|---|---|---|
| 1 | Bloqueante | G | `delivery-environments` | FATO | A aula planeja publicação, mas não executa um deploy completo com backend e banco. | Criar projeto guiado publicado e exigir URL verificável. |
| 2 | Alta | G | `delivery-security` | FATO | Autenticação e autorização são conceituais; não há sessão real nem teste com duas identidades. | Integrar Clerk e provar isolamento de dados no Supabase. |
| 3 | Alta | G | trilha `delivery` | RISCO | Ensinar somente cliques em três painéis produziria conhecimento frágil e preso a fornecedor. | Ensinar antes DNS, OAuth/OIDC, variáveis, RLS, ambientes e rollback. |
| 4 | Alta | M | projeto final | RISCO | Login bem-sucedido pode ser confundido com autorização segura. | Exigir políticas RLS e testes positivos e negativos com duas contas. |
| 5 | Alta | G | curso inteiro | FATO | LGPD, inventário de dados, retenção e direitos do titular não formam uma sequência prática. | Criar módulo de privacidade aplicada com dados fictícios e aviso não jurídico. |
| 6 | Média | M | `database-nosql` | FATO | Redis aparece como família de banco, mas não como decisão operacional. | Ensinar cache e rate limiting somente após medir uma necessidade. |
| 7 | Média | M | publicação | FATO | DNS, domínio, TLS, propagação e diagnóstico não estão cobertos passo a passo. | Criar laboratório de domínio e HTTPS com verificação e reversão. |

## 4. Pré-requisitos

Grafo recomendado:

`setup-node` → `git-remote` → `delivery-http` → `delivery-forms` → `delivery-security` → SQL/PostgreSQL → testes → fundamentos de hospedagem/DNS → Vercel → Clerk → Google OAuth/OIDC → Supabase/RLS → LGPD e segurança aplicada → CI/deploy/rollback → Redis opcional → observabilidade e operação.

Arestas atualmente implícitas ou quebradas:

- `delivery-environments` não exige uma API real já persistente.
- Autenticação conceitual não prepara sozinha configuração de sessão, redirect URI e logout.
- SQL básico não garante domínio de RLS, migrações e políticas por usuário.
- Redis não deve anteceder medição, cache HTTP, persistência principal e tratamento de indisponibilidade.

## 5. Instalação e ambiente

| Ferramenta/serviço | Completo? | Falta | Verificado? |
|---|---|---|---|
| Vercel | Não | conta, importação, ambientes, variáveis, domínio, logs e rollback | Documentação consultada; laboratório não executado |
| Clerk | Não | aplicação, SDK, sessão, URLs permitidas, Google e integração Supabase | Documentação consultada; integração não executada |
| Supabase | Parcial | projeto remoto, migrações, integração Clerk, RLS e backup | Documentação consultada; integração não executada |
| DNS/domínio | Não | registros, TTL, propagação, diagnóstico, TLS e reversão | Não executado com domínio real |
| Redis | Não | serviço local/gerenciado, cliente, TTL, invalidação, fallback e limites | Não executado |

Cada preparação deverá seguir: objetivo → requisitos → Windows/macOS/Linux quando houver ferramenta local → passos → verificação e saída esperada → problemas comuns → parar/retomar → alternativa gratuita ou local.

## 6. Fontes

| Fonte | Tipo | Status | Atualidade | Idioma | Observação |
|---|---|---|---|---|---|
| [Supabase — Clerk](https://supabase.com/docs/guides/auth/third-party/clerk) | Oficial | OK | Consultada em 24/10/2026 | EN | Integração de autenticação de terceiro e uso com RLS. |
| [Clerk — integração com Supabase](https://clerk.com/docs/guides/development/integrations/databases/supabase) | Oficial | OK | Consultada em 24/10/2026 | EN | A integração nativa substitui o template JWT legado; não sincroniza perfis automaticamente. |
| [Vercel — variáveis de ambiente](https://vercel.com/docs/environment-variables) | Oficial | OK | Consultada em 24/10/2026 | EN | Variáveis são separadas por ambiente e alterações exigem novo deploy. |
| [Google — OAuth 2.0 para aplicações web](https://developers.google.com/identity/protocols/oauth2/web-server) | Oficial | OK | Consultada em 24/10/2026 | EN | Base conceitual para redirect URI, consentimento e tokens. |
| [OWASP Top 10](https://owasp.org/www-project-top-ten/) | Padrão comunitário reconhecido | OK | Consultada em 24/10/2026 | EN | Deve orientar laboratórios, não virar checklist de certificação. |
| [ANPD — segurança para agentes de pequeno porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte) | Autoridade pública | OK | Página modificada em 23/01/2025 | PT-BR | Inclui guia e checklist; não substitui orientação jurídica. |
| [Redis — documentação](https://redis.io/docs/latest/) | Oficial | OK | Consultada em 24/10/2026 | EN | Referência para estruturas, expiração e operação; uso precisa ser justificado por medição. |

## 7. Nível de saída

Competências esperadas após executar o módulo: publicar uma aplicação; explicar DNS e HTTPS; configurar ambientes; autenticar com Google; autorizar acesso por usuário com RLS; proteger segredos; testar isolamento; documentar dados pessoais; realizar rollback e recuperação; justificar cache e rate limiting.

Isso sustenta parte importante do nível júnior e introduz práticas intermediárias. Não comprova segurança profissional, conformidade legal, arquitetura escalável ou operação em grande escala. Essas competências dependem de execução real, revisão externa e resposta a mudanças e incidentes.

## 8. Próximos passos sugeridos

1. Implementar fundamentos de hospedagem, DNS, domínio, TLS e Vercel estática.
2. Concluir primeiro a sequência de backend e PostgreSQL prevista na Fase 6.
3. Construir o laboratório Clerk + Supabase com RLS e duas contas.
4. Adicionar Google OAuth/OIDC e ambientes de prévia/produção.
5. Adicionar segurança aplicada e LGPD ao mesmo projeto.
6. Publicar, testar, observar uma falha e executar rollback/backup.
7. Introduzir Redis apenas como extensão medida e resiliente.

## 9. Limites desta auditoria

As páginas oficiais foram pesquisadas e abertas, mas nenhuma conta, integração, compra de domínio ou deploy foi executado. Planos gratuitos, limites e interfaces dos painéis podem mudar e devem ser reconferidos imediatamente antes de escrever cada aula. A auditoria avalia cobertura e sequência; não comprova aprendizagem de aluno real.

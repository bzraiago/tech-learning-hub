# Tech Learning Hub

Aplicação estática e autoguiada para aprender programação, do primeiro contato com arquivos e terminal até projetos completos, qualidade, entrega e engenharia de IA.

## Executar

Não há build ou dependências locais. Publique na Vercel com Clerk, Supabase e `api/public-config.mjs` configurados. O curso exige login para abrir o conteúdo e usa o Supabase para guardar progresso. A abertura direta de `index.html` mostra a tela de entrada, mas não autentica sem a configuração da Vercel.

## Estrutura do projeto

```text
.
├── index.html                         # Estrutura da interface e carregamento dos assets
├── api/public-config.mjs              # Configuração pública de Clerk e Supabase na Vercel
├── assets/
│   ├── css/
│   │   └── global.css                 # Estilos globais e acessibilidade
│   └── js/
│       ├── app.js                     # Eventos e inicialização
│       ├── auth.js                    # Controles de login Clerk
│       ├── cloud.js                   # Carregamento e salvamento automático no Supabase
│       ├── core/
│       │   └── state.js               # Estado em memória e sanitização
│       ├── data/
│       │   ├── resources.js           # Catálogo de fontes externas
│       │   ├── tracks.js              # Trilhas, módulos e aulas
│       │   ├── lesson-guides.js        # Registro compartilhado dos guias
│       │   ├── lesson-guides/          # Conteúdo detalhado separado por trilha
│       │   └── projects.js             # Projetos e critérios de validação
│       └── ui/
│           ├── render.js               # Navegação, progresso e listagens
│           └── dialogs.js              # Aulas, recursos e projetos
├── contexto/                           # Análises e contexto pedagógico
├── labs/
│   └── deployment-static/               # Página mínima para praticar deploy Vercel isolado
├── .agents/skills/                     # Skill local de validação didática
├── AGENTS.md                           # Regras para manutenção e mentoria
└── ROADMAP.md                          # Plano de evolução e acompanhamento
```

Os scripts são carregados como JavaScript clássico e em ordem explícita no fim do `index.html`. O projeto continua sem servidor local ou bundler; o acesso ao curso exige a versão publicada com login e banco configurados.

## Onde alterar

- Estrutura fixa ou ícones: `index.html`
- Aparência global: `assets/css/global.css`
- Recursos e links: `assets/js/data/resources.js`
- Resumo das trilhas, módulos e aulas: `assets/js/data/tracks.js`
- Conteúdo completo de uma aula: arquivo da trilha em `assets/js/data/lesson-guides/`
- Projetos: `assets/js/data/projects.js`
- Estado e sanitização: `assets/js/core/state.js`
- Carregamento e salvamento automático: `assets/js/cloud.js`
- Renderização: `assets/js/ui/render.js`
- Leitor de aulas e projetos: `assets/js/ui/dialogs.js`
- Eventos e inicialização: `assets/js/app.js`

## Verificação rápida

No PowerShell:

```powershell
node scripts/validate-content.js
```

O comando checa sintaxe, assets, ids, relações entre aulas e guias, exercícios, quizzes, projetos e contagens estruturais. Depois, siga [`docs/CHECKLIST_REGRESSAO.md`](docs/CHECKLIST_REGRESSAO.md).

As dependências e os atalhos entre trilhas estão documentados em [`docs/MAPA_PRE_REQUISITOS.md`](docs/MAPA_PRE_REQUISITOS.md).

O laboratório [`labs/deployment-static`](labs/deployment-static) é independente do login do curso. Leia seu README antes de criar um projeto Vercel separado; ele não altera a configuração do site principal.

O login com Clerk na Vercel está descrito em [`docs/CONFIGURAR_CLERK.md`](docs/CONFIGURAR_CLERK.md). O [guia do Supabase](docs/CONFIGURAR_SUPABASE.md) cobre a integração nativa Clerk ↔ Supabase, a tabela com RLS e a verificação do salvamento automático por conta.

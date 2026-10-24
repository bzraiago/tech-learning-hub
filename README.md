# Tech Learning Hub

Aplicação estática e autoguiada para aprender programação, do primeiro contato com arquivos e terminal até projetos completos, qualidade, entrega e engenharia de IA.

## Executar

Não há instalação, build ou dependências locais. Abra `index.html` em um navegador moderno com acesso à internet para carregar o Tailwind Browser e as fontes do Google.

## Estrutura do projeto

```text
.
├── index.html                         # Estrutura da interface e carregamento dos assets
├── assets/
│   ├── css/
│   │   └── global.css                 # Estilos globais e acessibilidade
│   └── js/
│       ├── app.js                     # Eventos e inicialização
│       ├── core/
│       │   └── state.js               # Estado, persistência e sanitização
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
├── .agents/skills/                     # Skill local de validação didática
├── AGENTS.md                           # Regras para manutenção e mentoria
└── ROADMAP.md                          # Plano de evolução e acompanhamento
```

Os scripts são carregados como JavaScript clássico e em ordem explícita no fim do `index.html`. Essa escolha mantém a aplicação compatível com abertura direta pelo sistema de arquivos, sem servidor local ou bundler.

## Onde alterar

- Estrutura fixa ou ícones: `index.html`
- Aparência global: `assets/css/global.css`
- Recursos e links: `assets/js/data/resources.js`
- Resumo das trilhas, módulos e aulas: `assets/js/data/tracks.js`
- Conteúdo completo de uma aula: arquivo da trilha em `assets/js/data/lesson-guides/`
- Projetos: `assets/js/data/projects.js`
- Estado e `localStorage`: `assets/js/core/state.js`
- Renderização: `assets/js/ui/render.js`
- Leitor de aulas e projetos: `assets/js/ui/dialogs.js`
- Eventos e inicialização: `assets/js/app.js`

## Verificação rápida

No PowerShell:

```powershell
Get-ChildItem -Recurse assets/js/*.js | ForEach-Object { node --check $_.FullName }
```

Depois, abra `index.html`, navegue por uma aula, marque e desmarque a conclusão, recarregue a página e confira a persistência.

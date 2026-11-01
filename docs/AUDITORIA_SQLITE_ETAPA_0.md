# Auditoria didática — Seguir sem Docker em computador limitado

Data: 01/11/2026 · Aula: `setup-docker-alternative` · Fontes: verificadas.

## 1. Veredito

A versão anterior não oferecia um percurso linear suficiente para a etapa 0. As capturas fornecidas pelo aluno mostraram um arquivo sem saída e, depois, um comando de terminal salvo dentro do `.py`. Além desses sinais, a inspeção do leitor encontrou instruções de execução na aba Conceitos antes de o código aparecer na aba Exemplo.

A aula foi reescrita: Conceitos explica os lugares e os arquivos; Exemplo contém dez passos com instrução, código e confirmação juntos. Uma mensagem simples confirma o ciclo editar → salvar → executar antes de introduzir SQLite. Exercícios usam a última contagem observada e um desafio concreto. A nova versão foi executada e conferida pelo agente; a retomada com o aluno ainda é necessária para avaliar sua autonomia.

## 2. Contrato de aprendizagem

- Público: pessoa com informática básica, sem conhecimento de Python ou SQL, na etapa 0.
- Saída: localizar pasta/arquivo, salvar e executar um exemplo fornecido, reconhecer a saída e observar persistência local. Não promete escrever SQL sozinho nem configurar Docker.
- Condições: VS Code e Python 3 previamente instalados; caminho principal Windows; alternativas macOS/Linux identificadas. Estimativa de 75 minutos, com possibilidade de parar e retomar.

## 3. Achados prioritários

Referência anterior: commit `8c499e3`. Locais: guia em `assets/js/data/lesson-guides/preparacao-docker.js`, metadados em `assets/js/data/tracks.js`, leitor em `assets/js/ui/dialogs.js`.

| Severidade | Esforço | Onde | Tipo | Achado | Correção |
|---|---|---|---|---|---|
| Bloqueante | M | Guia, `setup`/`sections`; leitor, aba learn | FATO | Pedidos para colar/executar antes de mostrar o bloco, disponível em outra aba. | Conceitos orienta; execução completa fica na aba Exemplo, em passos numerados. |
| Bloqueante | M | Guia, exemplo; capturas do aluno | FATO | Arquivo, editor e terminal foram confundidos; `SyntaxError` apontou `py sqlite_alternativa.py` na linha 1. | Modelo dos três lugares, blocos ARQUIVO/TERMINAL, confirmação de salvamento e teste de uma linha antes do banco. |
| Alta | P | Guia, guided/exercises | FATO | Exercício pedia primeira execução após o exemplo já ter sido executado; contagem fixa não considerava tentativas anteriores. | Comparação entre última contagem N e próxima N+1; não apagar dados para obter 1. |
| Alta | P | Leitor, `renderRequirementChange` | FATO | Desafio genérico exigia inventar entrada/limites/regra ainda não ensinados. | Pedido específico: acrescentar uma mensagem final com print, preservando a contagem. |
| Alta | P | Leitor, links de pré-requisitos | FATO | Atalhos por `prerequisiteLessons` eram renderizados apenas para aulas de chat externo. | Atalhos disponíveis nesta aula, com títulos reais Preparar o editor de código e Instalar e verificar Python 3. |
| Alta | P | Guia, passos de ambiente | RISCO | Muitas alternativas de comandos sem um ponto único de escolha incentivavam tentativas sem diagnóstico. | Verificar e anotar um comando no passo 4; alternativas de sistema recolhidas. Falhar em py não é diagnóstico de ausência de Python. |
| Média | P | Guia, salvamento e erros | FATO | Ausência de saída, alterações não salvas, prompt `>>>`, extensão e arquivo binário tinham orientação insuficiente. | Diagnósticos no percurso, com retorno ao passo que falhou e sem reinstalação automática. |
| Média | P | Leitor, blocos longos | RISCO | Limite vertical interno podia ocultar o fim do código durante a seleção. | Blocos do percurso sem limite vertical próprio; a aula continua rolável e código longo tem rolagem horizontal por teclado. |

## 4. Pré-requisitos

`setup-editor` (Preparar o editor de código) + `setup-python` (Instalar e verificar Python 3) → `setup-docker-alternative`.

As duas preparações aparecem antes na trilha e têm atalhos no leitor. Conhecer SQL não é uma condição de entrada; a prática usa um exemplo fornecido. Docker é uma pendência explicitamente registrada, não um requisito para executar esta alternativa. A instalação completa de Python/VS Code não foi repetida nesta auditoria.

## 5. Instalação e ambiente

| Item | Cobertura da aula | Evidência |
|---|---|---|
| Pasta e arquivo | Criar/localizar pasta; abrir no VS Code; arquivo existente ou novo; salvar nome/extensão | Percurso revisado; execução isolada usa pasta temporária com espaços no caminho do usuário |
| Windows | py como caminho principal; python como alternativa somente após verificação | Captura do aluno mostrou py funcionando; execução automatizada desta revisão usou Python 3.10.6 via python |
| macOS/Linux | Pastas por interface, atalhos e python3 em alternativas identificadas | Revisão textual e documental; não executados nesses sistemas |
| SQLite | Mesmo arquivo .db, criação de tabela, inserção, commit, contagem, fechamento e retomada | Código extraído da aula e executado em processos separados |
| Parar/retomar | Programa termina sozinho; reabrir mesma pasta e arquivo; contagem preservada | Retomada e contagem verificadas localmente |
| Computador limitado | Sem Docker; sem Python local, prática fica pendente | Limite explícito; leitura não tratada como execução |

## 6. Fontes

Todas são complementares e em inglês. A aula fornece as ações essenciais em português.

| Fonte oficial | Status em 01/11/2026 | Uso |
|---|---|---|
| [Python — sqlite3](https://docs.python.org/3/library/sqlite3.html) | OK | Banco em arquivo, conexão, consultas, commit e módulo opcional em algumas distribuições. |
| [VS Code — interface](https://code.visualstudio.com/docs/editing/getting-started/userinterface) | OK | Editor, Explorer, pasta de trabalho e painéis. |
| [VS Code — edição](https://code.visualstudio.com/docs/editing/codebasics) | OK | Salvar e editar arquivos; rótulos podem variar por idioma. |
| [VS Code — terminal](https://code.visualstudio.com/docs/terminal/basics) | OK | Terminal integrado e pasta de trabalho. |
| [Docker — instalação](https://docs.docker.com/engine/install/) | OK | Referência para retomada posterior; não é parte executável desta prática. |

O endereço antigo de primeiros passos do VS Code redirecionou para um tutorial de agentes. Ele não foi usado como instrução essencial; a aula referencia a documentação da interface e do terminal.

## 7. Nível de saída e verificação técnica

`node scripts/verify-sqlite-preparation.cjs` passou, executando o código real da aula em pasta descartável:

- Mensagem simples, ainda sem criar banco.
- SQLite em dois processos: contagens 1 e 2.
- Alteração do rótulo: contagem 3.
- Mensagem final do desafio: contagem 4, preservando as linhas anteriores.
- Consulta independente do banco: quatro registros.
- Arquivo vazio: saída vazia; comando salvo no `.py`: SyntaxError; arquivo ausente: erro de caminho.
- Recuperação com o bloco correto e novo processo: contagem 5.

`node scripts/validate-content.js` e o E2E `progresso-e-leitura.spec.cjs` passaram. O E2E cobre ordem dos passos, conteúdo correto em cada área, alternativa por teclado, desafio específico, exemplos antigos, chat e persistência/isolamento com Clerk/Supabase simulados. O ID da aula, os índices dos quatro exercícios, as três perguntas do quiz e a chave de anotação do desafio foram preservados. Os rascunhos anteriores permanecem, mas podem descrever enunciados antigos.

Conferência visual adicional em Chromium local:

| Largura CSS | Estado | Resultado |
|---|---|---|
| 375 px | Mensagem simples e bloco SQLite | Texto legível, rolagem vertical do leitor; código com rolagem horizontal interna; sem transbordamento horizontal do corpo do diálogo |
| 768 px | Mesmos passos | Sem transbordamento do diálogo; alternativa aberta pelo teclado |
| 1280 px | Mesmos passos | Código completo sem caixa com rolagem vertical própria; alternativa aberta pelo teclado |
| 640 px | Prática, foco no desafio | Campo alcançável e foco visível; não equivale a teste de zoom real de 200% |

Foram usados `index.html`, CSS e scripts do projeto. O acesso direto do navegador ao CDN estava bloqueado no ambiente de teste: o mesmo JavaScript público Tailwind foi baixado e servido ao navegador como cópia local, sem estilos substitutos. Fontes remotas não tiveram carregamento confirmado. Autenticação e banco do site foram simulados; o SQLite do exercício foi real e local.

## 8. Próximos passos

O aluno deve reabrir a aula atualizada e seguir a aba Exemplo desde o passo 1. O primeiro marco é obter Arquivo Python funcionando; só então avançar para SQLite. Registrar qualquer passo em que ainda precise de uma orientação fora da aula, com o título do passo e a tela observada.

## 9. Limites

Não foi observada uma nova execução do aluno após esta reescrita. Não houve teste em macOS/Linux, dispositivo físico, leitor de tela, zoom real de 200%, instalação limpa de ferramentas ou Preview autenticado da Vercel. A execução técnica e a revisão por agente não comprovam domínio nem substituem a retomada com a pessoa iniciante.

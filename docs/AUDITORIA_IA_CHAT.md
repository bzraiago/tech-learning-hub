# Auditoria didática — IA no chat

**Revisão:** 28/10/2026
**Público:** pessoa iniciante que quer usar IA em conversas, sem depender de IDE, programação ou conclusão de outras trilhas.
**Escopo:** verificar a sequência, os exercícios, os limites de uso profissional e a distinção entre prática textual e recursos executados em plataformas reais.

## Resultado

A trilha agora é autônoma: cinco módulos, 24 aulas, 96 exercícios, 72 questões de revisão e três projetos de conclusão. Os pré-requisitos apontam para aulas anteriores desta própria trilha. Não é preciso ter chave de API, instalar software ou conectar uma conta externa para completar a rota textual.

| Módulo | Aulas | Progressão |
|---|---:|---|
| Conversar, interpretar e produzir | 6 | instruções, contexto, tutoria, leitura de arquivos, tabelas e mídia |
| Procedimentos, pesquisa e produtividade | 5 | evidências, escrita, pesquisa, tarefas agendadas e bots reutilizáveis |
| Assistentes reutilizáveis e avaliação | 4 | criar assistente, planejar agente, avaliar respostas e apoiar suporte ERP |
| IA no trabalho: quatro oficinas | 4 | suporte a ERP, conferência contábil, pesquisa tributária e marketing |
| Operação, conexões e prova avançada | 5 | conectores, operação em nuvem, orquestração, segurança e projeto avançado |

### Progressão e pré-requisitos

Todos os exercícios usam uma sequência observável: **prever → alterar → construir → investigar erro**. Cada aula inclui critérios de aceite, resultado esperado, dicas, perguntas de revisão e uma nova tentativa. O aluno trabalha com dados inventados, compara a resposta com evidências e aprende a registrar limites e encaminhamentos.

As aulas de entrada cobrem os fundamentos e alimentam os ramos posteriores. Pesquisa com fontes e leitura de arquivos precedem as oficinas de trabalho. Análise de tabelas e suporte ERP precedem a oficina contábil; pesquisa e a oficina contábil precedem pesquisa tributária. Criar assistente, agendamentos e avaliação precedem conectores e orquestração. O validador de conteúdo também verifica que os pré-requisitos indicados existem antes da aula e na mesma trilha.

### O que a trilha ensina

- Escrever pedidos com objetivo, contexto, formato, restrições e critério de conferência; separar fatos de hipóteses e corrigir uma resposta ruim.
- Trabalhar com arquivos, dados e imagens/mídia dentro dos limites da interface escolhida; conferir cálculos e não tratar fluência como evidência.
- Pesquisar e citar fontes, conferir autor, data, versão e vigência, registrar lacunas e pedir esclarecimentos.
- Criar instruções reutilizáveis para um bot ou assistente, distinguir instruções, ferramentas e permissões e testar casos normais, ambíguos, adversariais e sem evidência.
- Planejar lembretes, tarefas agendadas, agentes e fluxos de trabalho; conferir o histórico, duplicidade, falhas, limites e como pausar ou retomar.
- Praticar orientação de suporte para ERP fictício, conferência de tabelas contábeis fictícias, pesquisa tributária com fonte oficial e planejamento de marketing.
- Avaliar conectores, identidade, escopo de acesso, confirmação de ações externas, tratamento de dados e supervisão humana.

## Limites que o aluno deve entender

1. **Recursos variam.** Bots configuráveis, skills, conectores, agendamentos e agentes dependem do fornecedor, plano, região, tipo de conta, rollout e políticas do administrador. O curso ensina conceitos transferíveis e pede que o aluno confirme o que sua própria interface oferece.
2. **Computador desligado não garante execução.** Uma tarefa pode rodar remotamente quando o computador está desligado se o agendador e todas as dependências necessárias estiverem hospedados e disponíveis na nuvem. Uma tarefa local, arquivo local ou sessão que dependa do dispositivo não continua automaticamente. O aluno confirma uma execução no histórico do serviço; uma instrução escrita no chat não prova que houve agendamento.
3. **Skills não equivalem a permissões.** Uma skill/instrução descreve como proceder. Ela não concede por si só acesso a arquivos ou autorização para alterar sistemas. Conectores podem conceder capacidades reais e precisam de revisão de escopo; instruir “somente leitura” não limita uma permissão de escrita já concedida.
4. **Apoio profissional não é decisão profissional.** Cenários de suporte e negócio são fictícios. Orientações contábeis e tributárias servem para organizar evidências e perguntas, não para lançar, apurar, transmitir ou decidir obrigações reais. Para decisões fiscais, usar a norma oficial vigente e o profissional responsável. Marketing inclui revisão factual, privacidade e confirmação de alegações antes da publicação.
5. **A prova mede a prática apresentada.** Os três projetos têm rubricas e revisão manual; uma conversa simulada não comprova configuração funcional em um fornecedor, automação real, qualificação profissional nem domínio geral de IA. O projeto avançado exige evidências da plataforma escolhida quando o aluno a tiver disponível.
6. **Nenhuma credencial real é necessária.** Usar exemplos fictícios; não colar senhas, chaves, dados de clientes, documentos confidenciais ou informações fiscais identificáveis em uma interface sem autorização explícita da organização.

## Fontes consultadas

Páginas oficiais consultadas em 28/10/2026 para conferir se os conceitos correspondem a funções existentes e para evitar prometer disponibilidade universal. Os detalhes podem mudar; links são complemento à explicação do curso. Não foi possível verificar as contas, planos ou configurações do aluno.

| Fonte oficial | Uso e limite da consulta |
|---|---|
| [OpenAI — ChatGPT web search](https://learn.chatgpt.com/docs/web) | Pesquisa e uso de ferramentas/arquivos em uma interface; não pressupõe que toda conta tenha os mesmos recursos. |
| [OpenAI — Projects](https://learn.chatgpt.com/docs/projects) | Instruções e arquivos compartilhados em conversas do projeto; não significa acesso automático a pastas locais. |
| [OpenAI — Skills and plugins](https://learn.chatgpt.com/docs/skills-and-plugins) e [plugins](https://learn.chatgpt.com/docs/plugins) | Skills/instruções versus integrações e permissões. O fornecedor pode alterar nomes e disponibilidade. |
| [OpenAI — Automations](https://learn.chatgpt.com/docs/automations) | Agendamento de tarefas em serviço compatível, configuração e histórico; disponibilidade depende de conta e integração. |
| [Anthropic — criar skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills) | Exemplo de implementação específica do fornecedor; customização pode exigir recursos técnicos e não é regra de todas as plataformas. |
| [Anthropic — tarefas recorrentes no Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork) | Exemplo de agendamento hospedado e diferenças de disponibilidade; não promete execução para qualquer dependência local. |
| [Google Gemini — scheduled actions](https://support.google.com/gemini/answer/16316416?hl=pt-BR) | Exemplo de ações agendadas e requisitos próprios da conta; não prova disponibilidade universal. |
| [Google Gemini — skills](https://support.google.com/gemini/answer/18560919?hl=pt-BR) e [Gems](https://support.google.com/gemini/answer/15236405?hl=pt-BR) | Exemplos atuais de recursos e mudança de nomenclatura/experiência; conferir a documentação vigente antes de seguir passos. |
| [Receita Federal — legislação](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/legislacao/legislacao) | Ponto de partida para localizar normas federais; cada caso ainda exige confirmar o texto vigente e aplicável. |
| [CFC — consultas técnicas](https://cfc.org.br/tecnica/consultas-tecnicas/) e [perguntas frequentes sobre NBC](https://cfc.org.br/tecnica/perguntas-frequentes/normas-brasileiras-de-contabilidade/) | Referências para pesquisa contábil; não substituem análise do profissional responsável. |

## Validação e pendências

- `node scripts/validate-content.js`: aprovado; 10 trilhas, 33 módulos, 169 aulas, 696 exercícios, 531 questões e 29 projetos.
- E2E de navegação e salvamento em ambiente local com autenticação/banco simulados: aprovado. A prova da trilha, inclusão no DOM, pré-requisitos e associação de progresso foram conferidos.
- Layout renderizado com o CSS real do Tailwind Browser em 375, 768 e 1280 px: sem overflow horizontal observado; navegação e projetos conferidos.
- Não houve teste com aluno real, conexão a conta paga, configuração de bot real, execução remota de agendamento, conector de ERP ou verificação de operação contábil/tributária. Esses itens dependem de conta e serviço do aluno e devem ser comprovados separadamente, sem enviar dados reais.

**Reavaliação recomendada:** revisar documentação e disponibilidade dos fornecedores antes de reescrever passos específicos; observar a execução de pelo menos um fluxo de cada projeto com um aluno; separar claramente evidência de conversa, configuração salva, execução registrada e resultado revisado por uma pessoa.

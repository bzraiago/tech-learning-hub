# Caso didático — inventário de dados pessoais

## Escopo e limites

Este documento descreve um sistema inteiramente fictício chamado **Estudo Claro**. A organização, as pessoas, os identificadores, os fornecedores e os registros são inventados. Não use valores de contas, estudantes, clientes ou colegas, nem conecte este exemplo a Clerk, Supabase, Vercel, PostgreSQL ou qualquer serviço real.

O caso demonstra como um time de desenvolvimento mapeia finalidades, dados, fluxos, cópias, encerramento e solicitações de titulares. As funções dos agentes são hipóteses do cenário, não classificações jurídicas de uma empresa real. Uma equipe responsável confirma papéis, contratos, base legal, retenção e regras especiais antes de operar dados reais.

**Público:** pessoa iniciante que já sabe descrever uma funcionalidade e identificar uma fonte de dados.
**Entrega:** inventário com dúvidas, riscos, salvaguardas e fluxo de resposta a pedido.
**Condições:** pode ser feito em papel; não exige computador, instalação, conta, banco, plano pago ou dado real.

## Cenário fictício

Estudo Claro permite que uma pessoa adulta mantenha uma lista privada de tópicos de estudo e marque seu progresso. A pessoa usa um e-mail fictício para entrar em uma conta demonstrativa. O sistema não pede CPF, endereço, localização, dado de saúde, biometria ou data de nascimento. Este exercício não cobre crianças e adolescentes, pagamentos, decisões automatizadas, marketing ou compartilhamento público.

Para o exercício, a Escola Exemplo decide por que e como a lista de estudo será tratada. Um Armazenamento de Demonstração recebe e guarda registros seguindo instruções fictícias da Escola Exemplo. Esses rótulos são parte do cenário; em um sistema real, papel depende da atividade, das decisões, dos contratos e das regras aplicáveis.

## Mapa da finalidade e do fluxo

| Etapa | Finalidade fictícia | Dados mínimos no exemplo | Quem age no cenário | Pergunta de revisão |
|---|---|---|---|---|
| Criar conta | Associar uma pessoa à sua lista privada | Identificador de conta e e-mail fictício | Escola Exemplo decide; Armazenamento de Demonstração guarda conforme instrução | O e-mail é necessário para a função escolhida e como será confirmado? |
| Salvar tópico | Mostrar à mesma pessoa o tópico e seu estado | Identificador de conta, tópico fictício e estado | Aplicação grava e consulta em nome da Escola Exemplo | Um horário exato ou histórico detalhado é necessário? |
| Corrigir e-mail | Manter o canal fictício atualizado após pedido validado | Novo e-mail fictício no cenário | Responsável autorizado valida e atualiza a origem | Como impedir que outra pessoa altere a conta? |
| Responder a pedido | Localizar e responder pelos dados da própria pessoa | Código de solicitação, data, tipo de ação e status | Canal fictício registra andamento | O registro contém apenas metadados necessários, sem copiar o valor solicitado? |
| Encerrar finalidade | Parar usos que deixaram de ser necessários e eliminar cópias conforme regra validada | Identificador apenas enquanto necessário para localizar os destinos | Responsável coordena aplicação e destinatários | Onde ficam exportações, logs, cópias e backups? |

### Categorias e lugares a procurar

| Registro fictício | Categoria inicial | Lugares no mapa | Proteção e acesso didáticos |
|---|---|---|---|
| E-mail de demonstração | Dado pessoal de contato | Perfil principal, mensagem de verificação e eventual exportação | Não exibir em listagens públicas; corrigir pela fonte principal |
| Identificador da conta | Dado que pode identificar por associação | Perfil, tópicos, registros técnicos e relações | Não tratar como anônimo se houver uma tabela que ligue o identificador à conta |
| Tópico e estado de estudo | Atividade relacionada à conta; pode ser dado pessoal pelo contexto | Lista principal, tela de progresso e exportação | Acesso limitado à conta associada; usar tópicos inventados |
| Código e andamento da solicitação | Metadado que pode relacionar-se a uma pessoa | Registro de atendimento fictício | Preferir código e categoria; não guardar cópia do pedido completo sem necessidade |
| Métrica agregada de demonstração | Candidata a dado anonimizado, ainda sem comprovação | Relatório de demonstração | Só chamar de anônima depois de verificar reidentificação razoável e os dados auxiliares disponíveis |

O inventário não presume banco, provedor, log, prazo fixo ou base legal. Cada lugar desconhecido vira uma pergunta para quem administra o sistema. A legislação não define um prazo universal para toda categoria; registre o evento que encerra a finalidade e peça confirmação do período aplicável à pessoa responsável.

## Exercício guiado

1. Copie a tabela de fluxo e sublinhe a finalidade de cada etapa. Uma finalidade nova recebe uma linha própria.
2. Para cada campo, explique qual comportamento depende dele. Remova o que não tem uso demonstrado.
3. Marque cada agente como hipótese e escreva qual decisão, atividade ou contrato confirmaria o papel.
4. Percorra a aplicação fictícia e enumere origem, relações, exportações, fornecedores, logs e backups. Escreva “a confirmar” quando não houver evidência.
5. Escolha um evento de término para cada finalidade. Não invente uma duração legal: anote a regra que a pessoa responsável precisa confirmar.
6. Registre risco, acesso autorizado, proteção, cópia, destino após correção e destino após eliminação.

## Resultado esperado

Uma boa entrega liga cada grupo de dados a uma finalidade específica, contém somente campos necessários ao caso, mostra o caminho de cópias e pessoas responsáveis, explicita como a pessoa pode pedir acesso/correção/eliminação e marca as lacunas. Ela distingue o que foi observado no caso fictício do que precisa de revisão para uma organização real.

Exemplo de pergunta bem delimitada: “A exportação inclui o e-mail e os tópicos da conta. Qual fonte autoritativa confirma a correção e qual rotina impede que um backup restaurado reintroduza o valor anterior?” Exemplo de conclusão indevida: “Apagamos o perfil, então todos os dados foram eliminados.”

## Fluxo de resposta a pedidos

| Ordem | Ação | Evidência mínima fictícia | Erro que a etapa evita |
|---|---|---|---|
| 1 | Receber o pedido em canal definido e abrir código | Código e data de recebimento | Pedido perdido sem responsável |
| 2 | Verificar identidade ou representação por meio seguro e proporcional | Estado da verificação, sem guardar documento completo por padrão | Entregar dados ao solicitante errado |
| 3 | Confirmar controlador e escopo dos dados | Finalidade, tabelas e destinatários encontrados | Responder sobre só uma tela |
| 4 | Identificar ação pedida: confirmar, acessar, corrigir, portar, revogar ou eliminar | Ação e responsável | Tratar todos os direitos como exclusão |
| 5 | Conferir prazo, retenção e exceção com a pessoa responsável | Fonte normativa/decisão e data de revisão | Inventar prazo universal ou exceção |
| 6 | Executar ou explicar impedimento; propagar correção/eliminação quando aplicável | Sistemas verificados e resultado de cada um | Declarar sucesso após uma única gravação |
| 7 | Responder por canal confirmado e encerrar ou acompanhar pendência | Protocolo, data, resultado e próximo passo | Expor conteúdo em log ou abandonar falha parcial |

## Revisão final do mapa

- A finalidade está escrita como uma ação concreta e informada?
- O campo é necessário para essa ação, ou pode ser removido?
- Dados comuns, sensíveis e inferências possíveis foram considerados?
- Controlador, operador, encarregado e destinatários estão marcados como hipóteses até validação?
- A busca inclui cópias, compartilhamentos, exportações, logs e backups?
- O pedido é autenticado de maneira proporcional antes de revelar ou alterar dados?
- A retenção tem evento de término e fundamento confirmado, sem um prazo inventado?
- A evidência comprova o efeito em cada destino e protege a própria pessoa?

Este inventário é um exercício de aprendizagem, não um parecer de conformidade. Para situações reais, encaminhe dúvidas jurídicas, de segurança ou de impacto às pessoas responsáveis.

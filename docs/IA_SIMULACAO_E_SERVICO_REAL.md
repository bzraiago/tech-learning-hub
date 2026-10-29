# Modalidades das atividades de Engenharia de IA

Este inventário separa exercícios locais de integrações com serviços de IA. A modalidade aparece no início da aula e nos cartões e telas dos projetos. O campo `execution` nos guias e projetos é a fonte usada pela interface; `scripts/validate-content.js` exige uma classificação para cada aula e projeto da trilha.

## Como ler os rótulos

- **Simulação didática:** código local, dados controlados ou funções determinísticas. Não envia conteúdo a um provedor nem mede a qualidade de um modelo conectado.
- **Misto:** a atividade principal é simulada e contém uma referência opcional a uma integração real. O rótulo descreve separadamente o que não foi executado.
- **Serviço real:** será usado quando a atividade fizer uma chamada a um modelo ou serviço externo configurado. Ter esse rótulo não substitui testes de qualidade, segurança, custo ou privacidade.

## Aulas

| Aula | Modalidade | O que a atividade realmente executa |
|---|---|---|
| `ai-llms` | Simulação didática | Pesos inventados e orçamento calculados localmente; sem inferência. |
| `ai-prompts` | Simulação didática | Montagem e validação local de uma estrutura; sem envio a modelo. |
| `ai-system` | Simulação didática | Conversa e memória com dados fictícios; sem resposta de serviço. |
| `ai-rag` | Simulação didática | Recuperação local de documentos; sem LLM, embeddings ou API. |
| `ai-tools` | Simulação didática | Propostas fixas; sem agente nem ação externa. |
| `ai-libraries` | Simulação didática | Gerador determinístico e busca literal. |
| `ai-mcp` | Misto | Descoberta e despacho simulados; exercício opcional mostra SDK real sem executar servidor ou rede. |
| `ai-skills` | Simulação didática | Validação de catálogo fictício; não carrega skills nem agentes. |
| `ai-workflows` | Simulação didática | Máquina de estados local; sem modelo ou serviço externo. |
| `ai-data` | Simulação didática | Trechos e versões locais; sem índice remoto. |
| `ai-embeddings` | Simulação didática | Vetores inventados; sem modelo de embeddings ou banco vetorial. |
| `ai-api` | Simulação didática | Contrato local; sem conta, chave, rede ou chamada a provedor. |
| `ai-evals` | Simulação didática | Métricas sobre respostas controladas; sem modelo real. |
| `ai-safety` | Simulação didática | Casos locais; não testa segurança de um provedor real. |
| `ai-operations` | Simulação didática | Custos, tempos e falhas fictícios; sem medição operacional. |
| `ai-adaptation` | Simulação didática | Comparação com dados locais; sem ajuste real de modelo. |
| `ai-multimodal` | Simulação didática | Entradas multimodais descritivas; nenhum modelo processa mídia. |
| `ai-capstone` | Simulação didática | Busca lexical e gerador injetado; sem API ou medição de LLM. |

## Projetos

| Projeto | Modalidade | O que a atividade realmente executa |
|---|---|---|
| `project-ai-contract` | Projeto com IA simulada | Triagem e validação determinísticas, sem chamada a modelo. |
| `project-ai-retrieval` | Projeto com IA simulada | Busca lexical em documentos fictícios, sem embeddings ou geração. |
| `project-ai-tools` | Projeto com IA simulada | Despachante local e controlado, sem agente ou serviço externo. |
| `project-ai-workflow` | Projeto com IA simulada | Fluxo de estados local, sem inferência ou integração externa. |
| `project-ai-evals` | Projeto com IA simulada | Métricas determinísticas, sem respostas de modelo conectado. |
| `project-ai-capstone` | Projeto com IA simulada | Gerador injetado e busca lexical; não comprova fundamentação de LLM real. |

Nenhuma aula ou projeto listado aqui está classificado como serviço real nesta etapa do curso. As integrações reais serão adicionadas em uma etapa posterior com credencial somente no servidor, avaliação separada e instruções para custo e privacidade.

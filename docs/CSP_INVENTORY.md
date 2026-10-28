# Inventário estático de recursos para uma CSP

**Revisão do código:** 28/10/2026
**Estado:** inventário estático; nenhuma política CSP foi adicionada.
**Limite:** não substitui observação de rede/Console no Preview nem testes funcionais no navegador.

## Como interpretar

Uma CSP (Content Security Policy) diz ao navegador quais fontes pode carregar ou executar. Antes de escrevê-la, relacione cada recurso à diretiva que governa aquele tipo e à função do produto. `script-src` trata scripts, `style-src` estilos, `font-src` fontes, `connect-src` chamadas de rede feitas pelo navegador, `img-src` imagens, `frame-src` quadros incorporados e `worker-src` workers. O nome de uma diretiva é uma pista, não uma política pronta.

Este inventário foi feito lendo os arquivos citados abaixo. Ele registra chamadas explícitas no código e dependências conhecidas pela configuração. Código estático não revela toda solicitação que um SDK faz quando inicia ou quando o usuário autentica.

## Recursos identificados

| Recurso e evidência no repositório | Diretivas a investigar | O que falta confirmar |
| --- | --- | --- |
| A página carrega CSS e scripts locais em `index.html`; os scripts são clássicos, servidos pela mesma origem do HTML. `assets/css/global.css` é local. | `script-src`, `style-src` | Confirmar todos os recursos dinâmicos gerados ao abrir e usar a aplicação. |
| Tailwind Browser é carregado de `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`. O HTML também tem `<style type="text/tailwindcss">`; o Tailwind processa essa entrada e gera estilos no navegador. | `script-src`, `style-src`; eventuais conexões do script precisam ser observadas. | Regras de estilo requeridas pela versão real, comportamento com CSP e todos os recursos do CDN. A documentação oficial classifica o Play CDN como ferramenta de desenvolvimento, não de produção. |
| Google Fonts recebe uma folha de estilos de `fonts.googleapis.com` e declara `fonts.gstatic.com` como origem dos arquivos de fonte. | `style-src`, `font-src` | Arquivos de fonte efetivamente pedidos e possibilidade de servir fontes localmente. |
| `assets/js/auth.js` busca `/api/public-config`, decodifica o host da chave publicável Clerk e injeta `@clerk/ui` e `clerk-js` desse host. A origem varia com a configuração Clerk do ambiente. | `connect-src 'self'`, `script-src`; investigar também `style-src`, `img-src`, `frame-src`, `worker-src` e conexões do fluxo Clerk. | Host exato por ambiente e recursos requeridos em login, cadastro, sessão, saída e proteções habilitadas. A documentação atual de CSP do Clerk cita CSS runtime inline e origens adicionais, mas a lista da documentação não comprova quais recursos esta instância usa. |
| `assets/js/cloud.js` busca `/api/public-config` na própria origem e chama `${supabaseUrl}/rest/v1/learning_state`. O código valida HTTPS e hostname terminado em `.supabase.co`, mas não revela o projeto configurado em Preview. | `connect-src 'self'` e o host Supabase realmente configurado | Registrar o host por ambiente sem expor tokens; testar leitura e gravação de progresso em conta autenticada. |
| `/api/public-config` e `/api/labs/open-meteo` são rotas Vercel da mesma origem. A função meteorológica chama Open-Meteo no servidor, por meio do cliente backend; essa chamada servidor-servidor não é, por si só, uma origem de `connect-src` do navegador. | `connect-src 'self'` para a chamada feita pela página | Confirmar no fluxo real se o laboratório chama a rota e se a resposta continua disponível sob a configuração implantada. |
| `assets/js/ui/dialogs.js` cria prévias `iframe srcdoc` com `sandbox`. A prévia HTML põe uma CSP própria que bloqueia scripts e recursos externos; o avaliador JavaScript cria outro `srcdoc` com `worker-src blob:` e `connect-src 'none'`, e executa o worker a partir de um Blob. | `frame-src`, `worker-src` e as políticas próprias dos documentos filhos | Verificar no navegador se a política da página pai interfere nos quadros, no `srcdoc` e no worker isolado. Não relaxar o sandbox para fazer o teste passar. |
| O catálogo de aulas contém muitos links externos, mas são navegações iniciadas por clique; não são pedidos automáticos só por estarem no catálogo. | Em geral, nenhuma permissão de carregamento da página deve ser deduzida desses links | Confirmar apenas se algum recurso novo passar a ser incorporado/carregado automaticamente. |
| O Preview pode disponibilizar Vercel Toolbar. A documentação da Vercel lista recursos de `vercel.live` e WebSocket quando Toolbar/Comments são usados. | `script-src`, `connect-src`, `img-src`, `frame-src`, `style-src`, `font-src` | Verificar no Preview se a Toolbar está habilitada e se ela faz parte do cenário de validação pretendido. Sua configuração é externa a este repositório. |

## O que a inspeção conclui — e não conclui

- O navegador precisa, pelo menos, da própria origem para arquivos do site, as rotas `/api/...` e o endpoint Supabase configurado.
- Há dependências remotas carregadas diretamente pela página: Tailwind Browser, Google Fonts e Clerk. O host Clerk e o endpoint Supabase dependem da configuração do ambiente.
- `vercel.json` não define CSP; define quatro outros cabeçalhos globais. Portanto, atualmente não há CSP do site para esta inspeção validar.
- A documentação oficial do Tailwind diz que o Play CDN não é destinado à produção. O projeto mantém a decisão de arquitetura “sem build” registrada em `AGENTS.md`; migrar para CSS compilado/local exige decisão do dono antes de alterar essa arquitetura.
- A documentação oficial do Clerk informa que seus componentes prebuilt usam CSS-in-JS em runtime e que CSP normalmente precisa considerar estilos inline e hosts do fluxo de identidade. Isso é um requisito a avaliar conscientemente, não autorização para acrescentar `unsafe-inline` ou curinga sem justificativa.
- A presença de um hostname no código, na documentação ou num relatório não prova, sozinha, que o recurso é necessário em cada rota. Cada entrada precisa de função, ambiente, evidência de uso e teste.

Este inventário não escolhe uma política final e não recomenda copiar uma lista de origens de Tailwind, Clerk ou Vercel. Também não configura `Content-Security-Policy-Report-Only`: um modo de observação ainda precisa de política revisada, destino de relatório aprovado e análise de dados coletados.

## Plano de validação antes de enforcement

1. Fixar o ambiente e inventariar versões/configuração sem registrar tokens ou chaves secretas. Identificar o host Clerk e o projeto Supabase usados no Preview.
2. Decidir se Tailwind Browser continuará no produto ou se o projeto vai aprovar uma migração de arquitetura para CSS compilado/local. Registrar também se a Vercel Toolbar fica ligada durante o teste.
3. Preparar uma hipótese de política por tipo de recurso, revisar cada exceção e decidir se há mecanismo e responsável para relatórios. Não usar `*`, `unsafe-eval` ou `unsafe-inline` como resposta automática a bloqueios.
4. Em navegador autorizado, observar rede e Console, classificar cada violação, e testar sem e com login: abrir aula, navegação, Tailwind, fontes, entrar, cadastrar conforme disponível, sair, carregar/salvar progresso, chamar laboratório meteorológico, prévia HTML e verificação JavaScript.
5. Testar teclado e largura de aproximadamente 375 px; validar respostas de erro e rotas relevantes. Repetir após cada ajuste; confirmar que bloqueios esperados continuam bloqueados.
6. Só então decidir se a evidência sustenta enforcement. Documentar resultados, política final, exceções justificadas e um rollback verificável; manter o modo de observação como evidência, nunca como prova de bloqueio.

**Validação nesta revisão:** leitura estática dos arquivos listados. Não houve acesso ao navegador ou ao Preview, conforme a orientação vigente. Nenhuma política foi imposta nem houve teste de autenticação remota.

## Fontes oficiais opcionais para mantenedores

- [Tailwind CSS: Play CDN](https://tailwindcss.com/docs/installation/play-cdn) — limite de uso do Play CDN.
- [Clerk: Configure Content-Security-Policy headers](https://clerk.com/docs/guides/secure/best-practices/csp-headers) — requisitos do SDK e componentes Clerk; conferir versão e fluxo reais.
- [Vercel: Managing the Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — condições e fontes usadas pela Toolbar quando habilitada.
- [MDN: CSP guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) — referência geral sobre implantação e teste.

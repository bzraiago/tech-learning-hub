# Laboratório local de CSRF

Este laboratório Node.js sem dependências compara duas rotas com sessão e anotação inteiramente fictícias. A rota vulnerável confia no cookie; a protegida exige origem exata e token CSRF. Ambas se vinculam somente a `127.0.0.1` quando executadas manualmente.

## Requisitos e execução

Use Node.js instalado conforme `setup-node`. No terminal, a partir da raiz do repositório:

```powershell
cd labs/security-csrf
node --test server.test.cjs
```

No PowerShell, Windows Terminal, macOS ou Linux, a saída final esperada é `tests 7`, `pass 7`, `fail 0`. Os testes escolhem uma porta temporária em `127.0.0.1`, enviam poucos pedidos determinísticos e encerram o servidor automaticamente. Não precisam de npm install, internet, Supabase, Clerk, Preview ou domínio.

Para abrir manualmente o servidor de demonstração, use outro terminal na mesma pasta e rode:

```sh
node server.cjs
```

O endereço impresso é `http://127.0.0.1:4178`. A API de leitura é `/api/nota`; as rotas POST são `/demo/vulnerable/nota` e `/demo/protected/nota`. Termine com Ctrl+C. Se a porta estiver ocupada, encerre o processo que a usa ou altere a porta e o endereço padrão documentados no código.

## O que observar

- `sessao=aluna_demo` e `csrf_demo_aluna` são marcadores previsíveis e fictícios, nunca credenciais reais; o token não demonstra entropia apropriada para produção.
- A rota vulnerável altera a nota com uma sessão presente, mesmo sem validação de origem/token.
- A rota protegida recusa origem externa, token ausente ou token inválido antes da escrita; origem e token válidos permitem a operação.
- `401` representa sessão ausente; `403` representa recusa de origem/token; a anotação não muda em pedidos rejeitados.
- O limite de corpo é local e pequeno; JSON/formato e tamanho da nota são validados no servidor.

## Limites da demonstração

Os testes criam cabeçalhos HTTP explicitamente com Node `fetch`. Eles verificam a decisão do servidor e o efeito na memória; não simulam um navegador adicionando cookies automaticamente, atributos `SameSite`, preflight CORS real, XSS, sessão real ou painel de provedor. A comparação de `Origin` ilustra uma defesa para este contrato didático, não uma configuração universal. O exemplo vulnerável existe só para `127.0.0.1`; nunca o publique como serviço nem use tokens, contas ou dados reais.

# Laboratório local A08 — integridade de software e dados

Este laboratório ilustra como uma equipe pode verificar se os bytes de um artefato fictício ainda correspondem ao que foi aprovado. Ele usa somente módulos nativos do Node.js, um arquivo JSON inventado e chaves Ed25519 geradas temporariamente na memória. Não instala pacotes, não executa o artefato, não altera o material de estudo e não acessa a rede.

## O que você vai aprender

- **Integridade:** detectar se conteúdo mudou entre a aprovação e o uso.
- **Hash SHA-256:** produzir um resumo dos bytes; conteúdo diferente normalmente produz outro resumo.
- **Assinatura digital:** conferir que determinado resumo/manifesto foi assinado pela chave privada correspondente à chave pública usada na verificação.
- **Chave confiável:** saber de antemão qual chave pública pertence ao publicador esperado. Receber pacote, hash, assinatura e chave do mesmo canal não estabelece essa confiança.
- **Limites:** assinatura válida não prova que o conteúdo é benigno, atualizado ou autorizado para qualquer uso. Esquema e regras de negócio ainda precisam de validação.

O A08:2025 trata da confiança em artefatos de software e dados; a categoria A03 trata da cadeia de suprimentos mais ampla, como componentes, ferramentas, publicação e pipeline. A aula `delivery-supply-chain` já cobre o inventário e o processo da cadeia. Esta prática concentra-se na verificação de um artefato depois de preparado.

## Pré-requisitos

Conclua `setup-node`, `delivery-cryptography` e `delivery-supply-chain`. Node.js 20.6 ou posterior é suficiente. Não precisa de `npm install`, internet, Docker, conta nem navegador.

Abra um terminal na raiz do repositório. No Windows/PowerShell, macOS ou Linux, execute:

```sh
node labs/security-integrity/integrity.cjs
```

Saída esperada:

```text
Laboratório A08 — artefato didático e fictício
Assinatura e conteúdo íntegros: OK
Conteúdo alterado após a assinatura: RECUSADO (artifact-mismatch)
Assinatura de outra chave, conferida contra a chave esperada: RECUSADA (signature-mismatch)
As chaves são efêmeras e ficam em memória. A demonstração não autentica um publicador externo.
```

O programa lê `fixtures/study-material.json`, calcula SHA-256, cria um manifesto pequeno, assina esse manifesto com Ed25519 e verifica a assinatura e os bytes. Depois altera somente uma cópia em memória e tenta verificar uma assinatura feita por outra chave. Nenhum arquivo é regravado. As chaves privada e pública são temporárias e nunca aparecem na saída.

## Rode os testes

Na raiz do repositório:

```sh
node --test labs/security-integrity/integrity.test.cjs
```

Resultado esperado: sete testes aprovados e zero falhas. Os testes cobrem resumo SHA-256, assinatura válida, conteúdo alterado, manifesto alterado, publicador com outra chave, assinatura malformada e nome de artefato inválido.

Se `node` não for reconhecido, volte à aula `setup-node`, instale/prepare Node conforme o sistema operacional e abra um terminal novo. O laboratório usa os comandos `node` e `node --test`; não há instalação de dependências. Sem acesso ao computador, use o exemplo, as saídas acima e a explicação da aula como simulação conceitual — isso não conta como execução dos testes.

## Como interpretar a verificação

1. O programa recebe bytes e um manifesto que inclui versão, nome do artefato e resumo SHA-256.
2. A assinatura Ed25519 é verificada contra uma chave pública escolhida como confiável.
3. Só depois da assinatura válida o programa calcula o resumo dos bytes e o compara ao valor assinado.
4. Se os bytes mudarem, o resumo diverge. Se o manifesto mudar, a assinatura não confere. Uma assinatura criada por outra chave também é recusada quando a verificação usa a chave pública esperada.

Um hash sozinho responde “estes bytes têm este resumo?”. Ele não identifica quem aprovou os bytes. Se um invasor consegue trocar tanto o artefato quanto o hash recebido do mesmo canal, os dois ainda podem combinar. Uma assinatura protege a associação entre manifesto e chave privada; a equipe ainda precisa obter e administrar a chave pública confiável por um processo separado e revisável.

Uma assinatura válida também não significa “seguro”. A pessoa autorizada a assinar pode cometer um erro ou ter a chave comprometida. Uma versão antiga pode continuar assinada e passar na verificação; uma política de atualização precisa verificar versão, expiração/revogação quando aplicável e regras contra downgrade/replay. Proveniência ajuda a ligar pacote, código-fonte, workflow e processo de publicação, mas não certifica que o conteúdo é inofensivo.

O comando demonstra os cálculos, não uma distribuição segura: por simplicidade, gera a chave que assina e a chave que verifica na mesma execução, em memória. Assim, a linha “OK” comprova apenas que os bytes combinam com o manifesto e a chave pública fornecida pelo próprio exemplo. Em produção, a chave confiável não pode ser substituída junto do artefato; distribuição, rotação, revogação, publicação, CI e recuperação exigem controles próprios.

O artefato da prática é JSON apenas para manter o exemplo legível. A assinatura não substitui limite de tamanho, validação de formato, esquema, autorização ou regras de negócio. JSON é uma representação de dados; formatos de serialização que podem instanciar objetos ou executar comportamentos exigem cuidado adicional e nunca devem receber conteúdo não confiável sem proteção apropriada. A aula não executa desserialização nem pacote de terceiros.

## Erros comuns

- **“O hash confere, então o fornecedor é confiável.”** O hash compara conteúdo com uma referência; a origem e a referência precisam de confiança independente.
- **“A assinatura prova que o programa não tem código malicioso.”** Ela verifica a chave que assinou bytes específicos, não a intenção nem a segurança do conteúdo.
- **“Assinei e verifiquei com qualquer chave, então serve.”** A chave pública precisa ser associada previamente ao publicador esperado e protegida durante rotação.
- **“A assinatura passa, então posso instalar a versão.”** Ainda verifique versão/frescor, origem, aprovação, compatibilidade, autorização, schema e política de rollback.
- **“O JSON está assinado, então posso confiar em todos os campos.”** A assinatura detecta alteração fora do processo de assinatura; dados válidos ainda precisam de validação e decisões de acesso no servidor.
- **“A prática provou a CI ou o npm do projeto.”** Não. Ela usa somente um fixture e chaves efêmeras; não instala dependências, não lê a CI e não acessa registry.

Para retomar, rode o mesmo comando; não há serviço ou estado persistido para encerrar. O único dado de entrada é o fixture fictício e ele permanece intacto.

## Referências opcionais

As definições, o fluxo, os resultados e as respostas da aula bastam para concluir o estudo. As fontes oficiais em inglês aprofundam a implementação e o contexto:

- OWASP Top 10 2025 — [A08: Software or Data Integrity Failures](https://top10.owasp.org/2025/A08_2025-Software_or_Data_Integrity_Failures/)
- Node.js — [Crypto API: sign e verify](https://nodejs.org/api/crypto.html)
- npm — [Verificar assinaturas e proveniência de pacotes](https://docs.npmjs.com/cli/commands/npm-audit/)
- npm — [Proveniência de pacotes](https://docs.npmjs.com/generating-provenance-statements/)

# Laboratório local — criptografia e integridade

## Objetivo

Este laboratório da categoria **A04: Cryptographic Failures** compara um hash simples com criptografia reversível e executa um ciclo de criptografia autenticada em uma frase inventada. Você vai observar que o texto criptografado pode ser restaurado com a chave correta e que a biblioteca recusa dados alterados ou uma chave diferente.

O exemplo usa somente `node:crypto`, biblioteca que acompanha Node.js. Não instala pacotes, não grava arquivos, não abre rede, não acessa contas e não usa dados reais. A chave é gerada a cada execução, permanece na memória e não é impressa. Parecer aprovado nos testes locais não transforma o código em uma solução de produção.

> **Não copie o laboratório para guardar dados reais.** Ele foi feito para estudar propriedades e falhas. Um produto real deve primeiro evitar coletar ou reter dados desnecessários e, se houver necessidade de criptografia, usar uma arquitetura e gestão de chaves revisadas por responsáveis. O curso usa Clerk para autenticação; o aluno não precisa criar armazenamento de senhas.

## Conceitos em linguagem direta

### Hash não é criptografia

Um **hash criptográfico** transforma uma entrada em um resumo de tamanho fixo. Para o mesmo algoritmo e o mesmo texto, a saída é igual; a intenção é não oferecer um caminho prático para recuperar a entrada a partir do resumo. Isso serve para comparar integridade em situações apropriadas, mas um hash rápido sozinho não protege senha: quem obtém os resumos pode testar muitas palavras candidatas.

`SHA-256` no script é apenas uma amostra de hash para um tópico inventado. Ela **não** é um exemplo de como guardar senha. Senhas precisam de algoritmos de armazenamento próprios, adaptativos e com salt, ou de um provedor de identidade. Não crie sua própria autenticação nem troque a senha de uma conta por SHA-256.

### Criptografia é reversível para quem tem a chave

Na **criptografia simétrica**, a mesma chave secreta é usada para cifrar e decifrar. O conteúdo cifrado, chamado *ciphertext*, é ilegível sem a chave correta. A chave, o dado cifrado e quem pode pedir a operação precisam de controles separados. Se a aplicação autorizada decifra o conteúdo e depois o entrega a uma pessoa sem permissão, a criptografia não corrige essa falha de autorização.

O laboratório usa o modo autenticado **AES-256-GCM**: AES é o algoritmo simétrico, `256` representa o tamanho da chave em bits, e GCM fornece confidencialidade e uma verificação de integridade/autenticidade do conteúdo. Não escolha algoritmo ou modo por conta própria para produção; use biblioteca e arquitetura mantidas e revisadas.

### O envelope e suas partes

Uma saída GCM pode ser guardada como envelope com quatro campos:

| Campo | O que significa | Precisa ser secreto? |
|---|---|---|
| `algorithm` | Identifica o formato usado nesta demonstração | Não |
| `iv` (nonce) | Valor que diferencia a operação de criptografia | Normalmente não; deve seguir os requisitos do modo |
| `ciphertext` | Bytes cifrados do texto de entrada | É o dado transformado, mas ainda pode revelar metadados como tamanho |
| `authTag` | Resultado que o modo verifica antes de aceitar a decifragem | Não, mas não pode ser alterado |

O IV/nonce não é uma senha. Neste exemplo o Node gera 12 bytes aleatórios em cada chamada. Para AES-GCM, reutilizar um IV sob a mesma chave pode quebrar garantias importantes; um sistema real precisa controlar volume, unicidade, distribuição entre instâncias e ciclo de vida da chave. A regra exata depende do modo e do desenho; não invente uma regra universal a partir deste exemplo.

Se o texto cifrado, a tag ou o IV não corresponderem, a verificação falha e `decipher.final()` lança erro. O fluxo deve interromper a operação: não use bytes parciais como se fossem um texto válido.

### Base64 só representa bytes como texto

O envelope codifica IV, ciphertext e tag em Base64 para que apareçam em JSON. **Base64 não é criptografia**: qualquer pessoa pode decodificá-lo. O segredo é a chave, que este exemplo mantém fora do envelope e não imprime.

### Em trânsito, em repouso e senha são problemas diferentes

HTTPS/TLS protege a comunicação entre cliente e servidor durante o transporte e ajuda a confirmar o host. Criptografia de armazenamento protege arquivos ou campos persistidos conforme o modelo de ameaça. Nenhuma das duas substitui autenticação, autorização, minimização, controle de acesso à chave, logs cuidadosos, backup ou correção de vulnerabilidades.

Quando um sistema só precisa comparar uma senha durante login, não precisa recuperá-la: esse problema é diferente de guardar um e-mail que a aplicação precisa mostrar novamente. Prefira um provedor de identidade estabelecido, como o Clerk já usado neste curso, em vez de montar armazenamento de senhas.

## Pré-requisitos e execução

Tenha Node.js 20.6 ou posterior preparado pela aula `setup-node` e um terminal aberto na raiz do repositório. Não é preciso instalar dependências.

Execute a demonstração:

```sh
node labs/security-crypto/crypto.cjs
```

O resultado inclui um resumo SHA-256, um envelope com valores Base64 aleatórios e `decryptionMatchesInput: true`. Os valores e tamanhos não devem ser comparados com uma saída fixa: cada execução gera chave e IV novos. O valor, a chave e os ciphertexts são somente fictícios.

Para repetir, execute o mesmo comando. Como a chave não é salva, ela deixa de existir ao encerrar o processo. Não há dado persistido para recuperar.

## Prática guiada

### 1. Preveja antes de executar

O script calcula o hash e também cifra a mesma frase. Antes de rodar, responda: qual resultado pode ser decifrado com uma chave? O que ocorre se o script for iniciado de novo e criar outra chave?

O hash SHA-256 será determinístico para aquela entrada. O envelope de criptografia poderá ser restaurado somente enquanto a chave daquela execução ainda estiver disponível; uma execução nova recebe outra chave. Essa diferença é esperada, não um defeito escondido.

### 2. Observe o envelope

Abra `labs/security-crypto/crypto.cjs` no editor. Siga `createDemoKey`, `encryptDemoText` e `decryptDemoText` nesta ordem:

1. `randomBytes` cria a chave de 32 bytes e o IV de 12 bytes.
2. `createCipheriv` recebe algoritmo, chave e IV.
3. `update` e `final` produzem ciphertext; `getAuthTag` obtém a tag após cifrar.
4. O envelope guarda algoritmo, IV, ciphertext e tag, mas não a chave.
5. `createDecipheriv` recebe a mesma chave e IV; `setAuthTag` prepara a verificação; `final` só conclui se o envelope for válido.

Não imprima a chave durante a tentativa. Observe apenas que o programa informa se o texto restaurado corresponde à entrada.

### 3. Rode os testes

```sh
node --test labs/security-crypto/crypto.test.cjs
```

Os sete testes verificam chave e IV aleatórios, formato do hash, ida e volta da criptografia, recusa de ciphertext/tag alterados, recusa de chave diferente e validação de entrada. O teste confirma propriedades deste pequeno programa; não demonstra implementação criptográfica completa, segurança da máquina, proteção contra memória comprometida, gestão de chaves, desempenho ou prontidão para produção.

### 4. Faça uma mudança controlada

Troque a frase fictícia por outro título sem informação pessoal, rode o script e compare somente as propriedades: o texto original não aparece dentro do envelope, o hash muda, e a restauração com a chave da mesma execução continua funcionando. Depois volte ao marcador inventado. Não use senha, e-mail real, token, chave de API ou anotação pessoal.

## Desafios com respostas para estudo

Tente resolver cada desafio antes de consultar a solução.

1. **Prever:** um perfil precisa mostrar o e-mail depois de cada login. Deve armazená-lo como hash SHA-256 ou criptografia reversível? Explique o que a aplicação precisa fazer com o valor.
2. **Alterar:** uma proposta guarda a chave ao lado do ciphertext no mesmo registro do banco. Reescreva o desenho indicando onde cada item deve ficar e quem pode solicitar decifragem.
3. **Construir:** desenhe o envelope mínimo do laboratório e marque quais campos podem ser transmitidos junto dos dados e qual campo precisa permanecer secreto.
4. **Investigar erro:** depois de um byte do ciphertext ser alterado, a decifragem falha. Que hipótese você testa e que ação evita tratar conteúdo alterado como válido?
5. **Mudança inesperada:** uma equipe descobre que uma chave pode ter sido copiada. Liste as ações e evidências que devem ser coordenadas antes de continuar cifrando com ela.
6. **Transferir:** um serviço externo exige armazenar uma senha reutilizável de outra conta. Proponha uma alternativa e explique por que “criptografar a senha” não deve ser a primeira decisão.

<details>
<summary>Soluções comentadas</summary>

1. Criptografia reversível é adequada à necessidade funcional de mostrar o e-mail, caso haja justificativa para armazená-lo e controles apropriados. Um hash não permite recuperar o endereço original. Ainda assim, a primeira revisão é se o sistema precisa guardá-lo e quem pode vê-lo.
2. Guardar chave e ciphertext juntos reduz o benefício: a mesma leitura pode revelar ambos. O desenho deve separar dados cifrados da chave, restringir quem usa o serviço de chaves e autorizar cada pedido de decifragem. A localização concreta depende da arquitetura, responsabilidades e plano de recuperação.
3. `algorithm`, `iv`, `ciphertext` e `authTag` compõem o envelope; podem acompanhar a operação seguindo formato e regras do modo. A chave secreta fica fora dele e recebe controle de acesso e ciclo de vida próprios. Base64 apenas representa os bytes.
4. Verifique se o conteúdo ou a tag foi alterado e trate a falha como recusa. Não retorne saída parcial, não ignore o erro e não registre dados secretos. O teste confirma que a decifragem rejeita alteração.
5. Avise responsáveis, limite o uso e avalie exposição, distribuição e cópias. Gere/substitua a chave por processo aprovado, defina como tratar dados existentes e backups, confirme aplicações consumidoras, registre decisões e teste leitura/escrita antes de encerrar rotação. O exemplo local não realiza essa operação.
6. Evite armazenar a senha e peça delegação segura de acesso, como OAuth/OIDC ou credencial gerenciada pelo próprio serviço. Se um segredo realmente tiver de ser recuperado, a equipe precisa de um processo de segredo com escopo limitado, rotação e armazenagem aprovada. Hash de senha é outra necessidade: autenticação normalmente compara um hash de senha adaptativo; não se inventa um esquema para este caso.

</details>

## Erros comuns

- Chamar Base64 de criptografia: é apenas uma codificação reversível sem chave.
- Usar SHA-256 rápido para armazenar senha: hash genérico não foi projetado para encarecer tentativas de senha.
- Guardar chave junto do dado cifrado e presumir que o banco ficou protegido.
- Reutilizar IV sob a mesma chave ou acreditar que IV precisa ser secreto.
- Descartar a tag ou ignorar uma exceção de autenticação na decifragem.
- Acreditar que criptografia elimina necessidade de autorização, minimização ou segurança de memória.
- Tratar os testes deste laboratório como revisão de segurança ou receita de produção.

## Problemas comuns

- `node` não é reconhecido: retome a preparação `setup-node`, abra um terminal novo e confira `node --version`.
- `Unknown cipher` ou erro ao criar cifra: confira a versão do Node.js e que o algoritmo do teste é exatamente `aes-256-gcm`; não tente contornar o erro com flags para enfraquecer a segurança.
- O texto restaurado não coincide: compare a chave e o envelope da mesma chamada; cada execução cria uma chave nova, então um envelope antigo não pode ser lido pela chave nova.
- IV, ciphertext e tag não são iguais entre execuções: essa variação é esperada. Compare formato, validação e resultado da decifragem, não valores aleatórios fixos.
- `decipher.final()` falha: a recusa pode indicar conteúdo/tag alterados ou chave diferente. Não ignore o erro nem imprima segredos para depurar.

## Parar e retomar

O script termina após mostrar o resultado. Ao executá-lo novamente, uma chave e um IV novos são criados e não há arquivo para limpar. Os testes também geram dados descartáveis em memória; basta executar o comando outra vez para repetir. Não salve a chave nem o exemplo em `.env`.

## Alternativa sem computador

Se Node.js não estiver disponível, use papel: escreva três colunas — hash, criptografia, armazenamento de senha — e classifique cada objetivo. Hash serve para comparar um resumo; criptografia permite recuperar texto por chave; senha usa algoritmo adaptativo de armazenamento ou provedor de identidade. Em seguida desenhe `plaintext → ciphertext + IV + tag`, mantenha a chave num local separado e liste o que permanece fora do desenho (permissão, rotação, TLS, backup e minimização). Marque a execução como **não realizada**.

## Referências opcionais

O conteúdo acima contém os conceitos e atividades necessários. Estas fontes oficiais aprofundam os detalhes técnicos:

- Node.js, módulo `crypto`: https://nodejs.org/api/crypto.html
- OWASP, Cryptographic Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html
- OWASP, Password Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP Top 10 2025, A04: https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/

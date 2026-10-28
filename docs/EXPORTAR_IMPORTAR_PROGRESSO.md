# Exportar e importar o progresso

O Tech Learning Hub salva o progresso ativo na conta do Supabase. Exportar cria uma cópia JSON baixada pelo navegador; não grava em `localStorage` e não envia o arquivo a um serviço externo. A importação só é habilitada depois que a conta terminou de carregar e não há salvamento pendente.

## O que vai no arquivo

O formato atual tem este envelope:

```json
{
  "format": "tech-learning-hub-progress",
  "schemaVersion": 1,
  "exportedAt": "2026-10-28T12:00:00.000Z",
  "state": {
    "version": 1,
    "completed": {}
  }
}
```

O exemplo é reduzido. A exportação real inclui o estado sanitizado da conta: conclusões, anotações, tentativas de quiz, projetos, evidências, preferências e posições de leitura. Não inclui ID Clerk, token de sessão, URL ou chave do Supabase.

Anotações e resumos de projetos podem conter texto pessoal que o aluno escreveu. Guarde o arquivo em local privado e revise seu conteúdo antes de compartilhá-lo.

## Como exportar

1. Entre na conta que contém o progresso.
2. Aguarde o painel indicar que o progresso foi carregado e salvo na nuvem.
3. Use **Exportar progresso**. O navegador baixa `tech-learning-hub-progresso-AAAA-MM-DD.json`.
4. Mantenha a cópia em um local que você controla. O download não substitui a cópia remota.

Se houver gravação pendente ou falha de sincronização, a exportação fica bloqueada até o estado remoto ser confirmado.

## Como importar

1. Entre na conta de destino e aguarde o carregamento e a confirmação de salvamento.
2. Use **Importar arquivo JSON** e selecione uma exportação do Tech Learning Hub.
3. Confira a quantidade de aulas, anotações, quizzes, projetos e posições mostrada na confirmação.
4. Confirme somente se deseja substituir todo o estado atual da conta. Depois, aguarde a confirmação de salvamento na nuvem.

Cancelar, selecionar JSON inválido ou escolher uma versão não suportada não altera o progresso atual. O arquivo é lido no navegador; o estado só é enviado ao Supabase depois da confirmação explícita. Exporte o progresso atual antes de importar se quiser ter como restaurá-lo.

## Compatibilidade

- `schemaVersion: 1` é o formato de transferência documentado neste arquivo. `state.version: 1` é a versão interna do estado do aplicativo.
- O importador limita o arquivo a 20 MB para evitar a leitura desnecessária de arquivos excessivamente grandes.
- Campos desconhecidos são ignorados e dados inválidos ou IDs de conteúdo removidos são descartados por `sanitizeState()`.
- Campos novos compatíveis recebem defaults; uma mudança incompatível exige nova `schemaVersion`, instrução de migração e suporte explícito ao formato anterior antes de trocar o valor aceito pelo importador.
- Importar não altera Clerk, RLS, tabelas ou credenciais. O Supabase continua sendo a persistência automática da conta ativa.

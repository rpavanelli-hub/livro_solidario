# Modelo Físico do Banco de Dados — Livro Solidário

Banco: **PostgreSQL** · ORM: **Prisma** (`backend/prisma/schema.prisma`)

## Visão geral do relacionamento

```
usuarios (1) ───< (N) livros
usuarios (1) ───< (N) solicitacoes
livros   (1) ───< (N) solicitacoes
```

- Um usuário pode publicar vários livros.
- Um usuário pode enviar várias solicitações (como solicitante).
- Um livro pode receber várias solicitações de usuários diferentes.

## Tabela `usuarios`

| Campo      | Tipo         | Constraints                     |
|------------|--------------|----------------------------------|
| id         | UUID (text)  | PK, gerado automaticamente       |
| nome       | TEXT         | NOT NULL                         |
| email      | TEXT         | NOT NULL, **UNIQUE**              |
| senha      | TEXT         | NOT NULL (hash bcrypt, nunca texto puro) |
| cidade     | TEXT         | NOT NULL                         |
| createdAt  | TIMESTAMP    | NOT NULL, default `now()`        |
| updatedAt  | TIMESTAMP    | NOT NULL, atualizado automaticamente |

## Tabela `livros`

| Campo       | Tipo         | Constraints                                   |
|-------------|--------------|-------------------------------------------------|
| id          | UUID (text)  | PK, gerado automaticamente                     |
| titulo      | TEXT         | NOT NULL                                       |
| autor       | TEXT         | NOT NULL                                       |
| descricao   | TEXT         | NOT NULL                                       |
| categoria   | TEXT         | NOT NULL                                       |
| condicao    | ENUM         | NOT NULL — `NOVO`, `OTIMO`, `BOM`, `REGULAR`   |
| tipoOferta  | ENUM         | NOT NULL — `DOACAO`, `TROCA`                   |
| cidade      | TEXT         | NOT NULL                                       |
| status      | ENUM         | NOT NULL, default `DISPONIVEL` — `DISPONIVEL`, `RESERVADO`, `DOADO`, `TROCADO` |
| usuarioId   | UUID (text)  | **FK** → `usuarios.id`, `ON DELETE CASCADE`, NOT NULL |
| createdAt   | TIMESTAMP    | NOT NULL, default `now()`                      |
| updatedAt   | TIMESTAMP    | NOT NULL, atualizado automaticamente           |

## Tabela `solicitacoes`

| Campo          | Tipo         | Constraints                                                |
|----------------|--------------|--------------------------------------------------------------|
| id             | UUID (text)  | PK, gerado automaticamente                                  |
| livroId        | UUID (text)  | **FK** → `livros.id`, `ON DELETE CASCADE`, NOT NULL          |
| solicitanteId  | UUID (text)  | **FK** → `usuarios.id`, `ON DELETE CASCADE`, NOT NULL        |
| status         | ENUM         | NOT NULL, default `PENDENTE` — `PENDENTE`, `ACEITA`, `RECUSADA`, `CANCELADA` |
| createdAt      | TIMESTAMP    | NOT NULL, default `now()`                                    |
| updatedAt      | TIMESTAMP    | NOT NULL, atualizado automaticamente                          |

## Regras de consistência aplicadas

- `usuarios.email` é único — impede contas duplicadas.
- Exclusão de um usuário remove em cascata seus livros e solicitações (`ON DELETE CASCADE`).
- Exclusão de um livro remove em cascata as solicitações associadas a ele.
- Ao **aceitar** uma solicitação (regra de aplicação, no backend):
  - a solicitação aceita passa para `ACEITA`;
  - as demais solicitações pendentes para o mesmo livro são automaticamente marcadas como `RECUSADA`;
  - o livro correspondente passa para o status `RESERVADO`.
- Um usuário não pode solicitar o próprio livro (validado na API).
- Um usuário não pode ter duas solicitações `PENDENTE` simultâneas para o mesmo livro (validado na API).

## Migrations

As migrations ficam em `backend/prisma/migrations/`, geradas via:

```bash
npx prisma migrate dev --name init
```

## Diagrama ER (texto)

```
┌────────────┐        ┌────────────┐        ┌────────────────┐
│  usuarios  │ 1    N │   livros   │ 1    N │  solicitacoes   │
├────────────┤◄───────├────────────┤◄───────├─────────────────┤
│ id (PK)    │        │ id (PK)    │        │ id (PK)         │
│ nome       │        │ titulo     │        │ livroId (FK)    │
│ email UQ   │        │ autor      │        │ solicitanteId(FK)│
│ senha      │        │ descricao  │        │ status          │
│ cidade     │        │ categoria  │        │ createdAt       │
│ createdAt  │        │ condicao   │        │ updatedAt       │
│ updatedAt  │        │ tipoOferta │        └─────────────────┘
└────────────┘        │ cidade     │                 ▲
      ▲                │ status     │                 │
      │                │ usuarioId  │ N             1 │
      └────────────────┤ (FK)       │─────────────────┘
                       │ createdAt  │   (solicitanteId também
                       │ updatedAt  │    referencia usuarios)
                       └────────────┘
```

Um diagrama ER gráfico pode ser gerado futuramente a partir do `schema.prisma` (por exemplo, com a ferramenta `prisma-erd-generator`), caso necessário para a apresentação.

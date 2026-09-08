# Livro Solidário

> Esta implementação corresponde à **Segunda Etapa** do Projeto Integrador: o MVP funcional construído a partir do protótipo navegável da Primeira Etapa (pasta `livro-solidário-protótipo/`, preservada sem alterações).

## Sobre o projeto

Livro Solidário é uma plataforma web para doação e troca de livros entre pessoas, com o objetivo de facilitar o acesso à leitura e reduzir o desperdício de livros parados nas estantes.

## Problema

É difícil conectar pessoas que possuem livros sem uso com pessoas que desejam recebê-los, trocá-los ou simplesmente encontrar novas leituras. Não existe um canal simples e acessível para isso na maioria das comunidades.

## Solução

Uma plataforma digital onde qualquer pessoa pode se cadastrar, publicar livros para doação ou troca, buscar livros disponíveis, demonstrar interesse em um livro e acompanhar o andamento das suas solicitações — do primeiro contato até a reserva do livro.

## Objetivo

Entregar um MVP funcional, estável e demonstrável, cobrindo o fluxo principal de ponta a ponta: cadastro → login → publicação de livro → catálogo → solicitação de interesse → aceite do proprietário → reserva do livro.

## Funcionalidades do MVP

- Cadastro e login de usuários (com senha criptografada via bcrypt).
- Cadastro, edição, exclusão e listagem dos próprios livros.
- Catálogo de livros disponíveis com busca por título/autor e filtros por categoria, cidade e tipo de oferta.
- Página de detalhes do livro, com botão "Tenho interesse" para quem não é o proprietário.
- Solicitações de interesse, com aceite/recusa pelo proprietário.
- Ao aceitar uma solicitação, o livro é automaticamente reservado e as demais solicitações pendentes daquele livro são recusadas.
- Dashboard com estatísticas do usuário (livros publicados, solicitações enviadas/recebidas, livros disponíveis e solicitações recentes).
- Landing page pública apresentando a proposta do projeto.

## Tecnologias

**Frontend:** React, Vite, React Router, Axios, CSS puro (identidade visual herdada do protótipo da Primeira Etapa).

**Backend:** Node.js, Express, JWT (autenticação), bcryptjs (hash de senha).

**Banco de dados:** PostgreSQL, com Prisma como ORM (schema, migrations e seed).

## Arquitetura

```
livro-solidario/
├── backend/            API REST (Express + Prisma)
│   ├── prisma/         schema.prisma, migrations, seed.js
│   └── src/
│       ├── routes/      auth, usuarios, livros, solicitacoes
│       ├── middleware/  autenticação JWT, tratamento de erros
│       └── server.js
├── frontend/           SPA React (Vite)
│   └── src/
│       ├── pages/       Home, Login, Cadastro, Dashboard, Catálogo, etc.
│       ├── components/  BookCard, AppLayout, ProtectedRoute, etc.
│       ├── context/      AuthContext (estado de autenticação)
│       └── api/          cliente Axios
├── database.md         documentação do modelo físico do banco
└── README.md
```

Arquitetura simples de duas camadas (frontend SPA consumindo uma API REST), adequada ao escopo de um MVP acadêmico — sem microsserviços, filas ou infraestrutura adicional.

## Banco de dados

Modelo físico completo (tabelas, campos, tipos, chaves e relacionamentos) documentado em [`database.md`](./database.md). Resumo das entidades:

- **usuarios** — dados de conta (nome, email único, senha em hash, cidade).
- **livros** — livros publicados, vinculados a um usuário proprietário.
- **solicitacoes** — pedidos de interesse em um livro, vinculando solicitante e livro.

## Backend

API REST em Express, com autenticação via JWT (`Authorization: Bearer <token>`) e autorização por dono do recurso (um usuário só edita/exclui seus próprios livros e só aceita/recusa solicitações dos seus próprios livros).

### Rodando o backend

```bash
cd backend
npm install
cp .env.example .env      # edite DATABASE_URL, JWT_SECRET, etc.
npx prisma migrate dev    # cria as tabelas no banco
npm run prisma:seed       # popula dados de demonstração
npm run dev                # inicia em http://localhost:3000
```

## Frontend

SPA em React (Vite), com React Router para navegação e Axios para consumir a API. O estado de autenticação é mantido em Context API + `localStorage` (token JWT + dados do usuário).

### Rodando o frontend

```bash
cd frontend
npm install
cp .env.example .env      # VITE_API_URL, se necessário
npm run dev                 # inicia em http://localhost:5173
```

Em desenvolvimento, o Vite já faz proxy de `/api` para `http://localhost:3000` (ver `vite.config.js`), então o backend precisa estar rodando na porta 3000.

## Como executar (passo a passo completo)

1. Tenha PostgreSQL rodando localmente e crie um banco (ex.: `livro_solidario`).
2. Configure `backend/.env` a partir de `backend/.env.example` com a `DATABASE_URL` correta.
3. No backend: `npm install`, `npx prisma migrate dev`, `npm run prisma:seed`, `npm run dev`.
4. No frontend (em outro terminal): `npm install`, `npm run dev`.
5. Acesse `http://localhost:5173`.
6. Use um dos usuários de demonstração criados pelo seed (veja abaixo) ou crie uma nova conta.

## Configuração do ambiente

Cada pacote (`backend/` e `frontend/`) tem seu próprio `.env.example`. Copie para `.env` e ajuste os valores localmente — o `.env` nunca deve ser commitado (já está no `.gitignore`).

## Variáveis de ambiente

**backend/.env**
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/livro_solidario"
JWT_SECRET="alterar-este-segredo"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

**frontend/.env**
```
VITE_API_URL="/api"
```

## Migrations

Geradas e aplicadas com Prisma:

```bash
npx prisma migrate dev --name init
```

O histórico de migrations fica em `backend/prisma/migrations/`.

## Seed

O seed (`backend/prisma/seed.js`) cria:

- 4 usuários de demonstração (senha para todos: `senha123`):
  - `ana.clara@exemplo.com`
  - `carlos.henrique@exemplo.com`
  - `mariana.santos@exemplo.com`
  - `diego.neves@exemplo.com`
- 12 livros distribuídos entre os usuários, com diferentes categorias, condições e tipos de oferta.
- Algumas solicitações de exemplo em status `PENDENTE`, `ACEITA` e `RECUSADA`.

Para repopular o banco do zero: `npm run prisma:seed` (o script limpa e recria os dados).

## API

Base URL: `http://localhost:3000/api`

| Método | Rota                          | Autenticação | Descrição                                  |
|--------|-------------------------------|--------------|----------------------------------------------|
| GET    | `/health`                     | não          | Verifica se a API está no ar                 |
| POST   | `/auth/register`              | não          | Cria uma conta                                |
| POST   | `/auth/login`                 | não          | Autentica e retorna token JWT                 |
| GET    | `/usuarios/me`                | sim          | Dados do usuário autenticado                  |
| GET    | `/livros`                     | opcional     | Lista livros (filtros: `busca`, `categoria`, `cidade`, `tipoOferta`; `meus=true` requer autenticação) |
| GET    | `/livros/:id`                 | não          | Detalhes de um livro                          |
| POST   | `/livros`                     | sim          | Cria um livro                                 |
| PUT    | `/livros/:id`                 | sim (dono)   | Atualiza um livro próprio                     |
| DELETE | `/livros/:id`                 | sim (dono)   | Exclui um livro próprio                       |
| POST   | `/solicitacoes`               | sim          | Cria uma solicitação de interesse             |
| GET    | `/solicitacoes/enviadas`      | sim          | Solicitações enviadas pelo usuário             |
| GET    | `/solicitacoes/recebidas`     | sim          | Solicitações recebidas nos livros do usuário  |
| PUT    | `/solicitacoes/:id/aceitar`   | sim (dono)   | Aceita uma solicitação (reserva o livro)       |
| PUT    | `/solicitacoes/:id/recusar`   | sim (dono)   | Recusa uma solicitação                        |

## Landing Page

A landing page faz parte do frontend (rota `/`), reaproveitando a identidade visual, o slogan e a proposta de valor do protótipo da Primeira Etapa. Por estar embutida na SPA React, sua publicação no GitHub Pages depende de um build estático do frontend (`npm run build` em `frontend/`) apontando para uma API já publicada — não incluído nesta etapa, que tem foco na execução local.

## Equipe

_(preencher com os integrantes do grupo)_

- Nome —
- Nome —
- Nome —

## Status do projeto

MVP da Segunda Etapa concluído: fluxo principal (cadastro → login → dashboard → publicar livro → catálogo → detalhes → solicitação → aceite → reserva) implementado, testado manualmente de ponta a ponta e funcional localmente.

### Evoluções futuras (fora do escopo desta etapa)

Chat em tempo real, notificações, avaliações entre usuários, recuperação de senha, login social, upload de imagens, geolocalização, busca inteligente/recomendação, painel administrativo e deploy em produção.

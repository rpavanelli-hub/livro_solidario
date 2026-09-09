# 📚 Livro Solidário

**"Compartilhe livros, espalhe conhecimento"**

Livro Solidário é uma plataforma pensada para facilitar a doação e a troca de livros entre pessoas, aproximando quem tem livros parados na estante de quem está em busca de novas leituras.

## 🔗 Links de acesso

- **Repositório:** https://github.com/rpavanelli-hub/livro_solidario
- **Aplicação (deploy):** https://livrosolidario-production-4b36.up.railway.app/

## 🎓 Projeto Integrador

Este repositório reúne as duas etapas do Projeto Integrador desenvolvidas até o momento:

1. **Primeira etapa** — definição do problema, da solução, de personas e jornadas de uso, materializada em um protótipo navegável em HTML, CSS e JavaScript.
2. **Segunda etapa** — evolução da proposta para uma prova de conceito funcional (MVP), com banco de dados, backend em API REST e frontend em React consumindo essa API.

## 👥 Equipe

- Raphael Pavanelli
- Guilherme Martins
- Guilherme Stark

## 🎯 Problema

Muitas pessoas possuem livros que não utilizam mais, enquanto estudantes, leitores, professores e instituições de ensino frequentemente têm dificuldade para conseguir acesso a livros. Falta um canal simples que conecte quem quer doar ou trocar livros a quem tem interesse em recebê-los.

## 💡 Solução

O Livro Solidário propõe uma plataforma digital onde qualquer pessoa pode publicar livros para doação ou troca, buscar livros disponíveis e demonstrar interesse neles, enquanto o proprietário do livro decide a quem repassá-lo — aproximando leitores, estudantes e instituições em torno do compartilhamento de livros.

## 🚀 Funcionalidades do MVP

- Cadastro e login de usuários
- Publicação de livros
- Edição e exclusão de livros
- Catálogo de livros disponíveis
- Busca por título e autor
- Filtros por categoria, cidade e tipo de oferta
- Página de detalhes do livro
- Demonstração de interesse em um livro
- Solicitações enviadas e recebidas
- Aceitar e recusar solicitações
- Reserva automática do livro ao aceitar uma solicitação
- Dashboard com um resumo da atividade do usuário

## 🛠️ Tecnologias

**Frontend**

- React
- Vite
- React Router
- Axios
- CSS

**Backend**

- Node.js
- Express
- Prisma
- JWT
- bcryptjs

**Banco de dados**

- PostgreSQL

**Versionamento**

- Git
- GitHub

## 🏗️ Arquitetura

```
Frontend React + Vite
        ↓
Backend Node.js + Express
        ↓
Prisma ORM
        ↓
PostgreSQL
```

O frontend consome a API REST do backend, que utiliza o Prisma como camada de acesso ao banco de dados PostgreSQL.

## 🗄️ Banco de dados

O MVP trabalha com três entidades principais:

- **Usuario**
- **Livro**
- **Solicitacao**

```
Usuario 1───N Livro
Usuario 1───N Solicitacao
Livro   1───N Solicitacao
```

Um usuário pode publicar vários livros e enviar várias solicitações; um livro pode receber várias solicitações de diferentes usuários.

A documentação completa do modelo físico (campos, tipos, chaves e relacionamentos) está em [`livro-solidario/database.md`](./livro-solidario/database.md).

## 📁 Estrutura do repositório

```
livro_solidario/
├── README.md
├── livro-solidario-protótipo/
└── livro-solidario/
    ├── backend/
    ├── frontend/
    ├── README.md
    └── database.md
```

- **`livro-solidario-protótipo/`** — protótipo navegável desenvolvido na primeira etapa do projeto.
- **`livro-solidario/`** — MVP funcional desenvolvido na segunda etapa, contendo o backend (API REST), o frontend (React) e a documentação técnica do projeto.

## 💻 Execução local

```bash
# 1. Clonar o repositório
git clone https://github.com/rpavanelli-hub/livro_solidario.git
cd livro_solidario/livro-solidario

# 2. Configurar e iniciar o backend
cd backend
npm install
cp .env.example .env      # configure DATABASE_URL, JWT_SECRET etc.
npx prisma migrate dev    # cria as tabelas no banco
npm run prisma:seed       # popula dados de demonstração
npm run dev                # inicia a API em http://localhost:3000

# 3. Em outro terminal, configurar e iniciar o frontend
cd ../frontend
npm install
npm run dev                 # inicia a aplicação em http://localhost:5173
```

Pré-requisito: ter o PostgreSQL disponível localmente, com um banco de dados criado e referenciado na `DATABASE_URL` do `.env`.

## 📚 Documentação

- Documentação técnica completa do MVP (arquitetura, API, execução, variáveis de ambiente): [`livro-solidario/README.md`](./livro-solidario/README.md)
- Documentação do modelo de banco de dados: [`livro-solidario/database.md`](./livro-solidario/database.md)
- O diretório [`livro-solidario-protótipo/`](./livro-solidario-protótipo/) contém o material desenvolvido na primeira etapa do Projeto Integrador (protótipo navegável).

## 📌 Status do projeto

**MVP funcional — Segunda etapa do Projeto Integrador.**

O MVP conta com frontend em React, backend em Node.js/Express, banco de dados PostgreSQL, autenticação de usuários, catálogo de livros e fluxo completo de solicitações implementados.

## 🌱 Objetivos

- Ampliar o acesso à leitura.
- Incentivar o reaproveitamento de livros.
- Facilitar a doação e a troca de livros entre pessoas.
- Aproximar leitores, estudantes e instituições.
- Promover a sustentabilidade por meio do reuso.

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais, no contexto do Projeto Integrador: Análise De Soluções Integradas Para Organizações do curso de Análise e Desenvolvimento de Sistemas.

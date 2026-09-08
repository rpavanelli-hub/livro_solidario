# 🐳 Execução com Docker

Este guia descreve como executar o projeto Livro Solidário usando Docker e Docker Compose.

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado (Windows, Mac ou Linux)
- Docker Compose (geralmente vem com Docker Desktop)

## Estrutura de Arquivos

```
livro-solidario/
├── backend/
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .dockerignore
├── docker-compose.yml
└── DOCKER.md (este arquivo)
```

## Execução Rápida

### 1. Clonar o repositório
```bash
git clone https://github.com/rpavanelli-hub/livro_solidario.git
cd livro_solidario/livro-solidario
```

### 2. Executar com Docker Compose
```bash
docker-compose up
```

A primeira execução pode levar alguns minutos (download de imagens e build).

### 3. Acessar a aplicação

- **Frontend:** http://localhost
- **API Backend:** http://localhost:3000
- **Health check:** http://localhost:3000/api/health

### 4. Parar os containers
```bash
docker-compose down
```

---

## Detalhes de Cada Serviço

### PostgreSQL

- **Imagem:** postgres:16-alpine
- **Porta:** 5432 (exposta apenas internamente)
- **Banco de dados:** livro_solidario (padrão)
- **Volume:** postgres_data (persistência de dados)

**Variáveis de ambiente:**
```
POSTGRES_USER=usuario
POSTGRES_PASSWORD=senha
POSTGRES_DB=livro_solidario
```

### Backend (Node.js + Express)

- **Imagem:** node:20-alpine
- **Porta:** 3000
- **Processos ao iniciar:**
  - Executa `npx prisma migrate deploy` (aplica migrations)
  - Inicia o servidor com `node src/server.js`

**Variáveis de ambiente lidas de `docker-compose.yml`:**
```
DATABASE_URL=postgresql://usuario:senha@postgres:5432/livro_solidario
JWT_SECRET=alterar-este-segredo-em-producao
PORT=3000
FRONTEND_URL=http://localhost
```

### Frontend (React + Nginx)

- **Imagem base (build):** node:20-alpine
- **Imagem runtime:** nginx:alpine
- **Porta:** 80
- **Build:** Executa `npm run build` durante construção da imagem
- **Serve:** Nginx servindo arquivos estáticos em `/usr/share/nginx/html`

**Configuração Nginx:**
- Proxy automático de `/api/*` para backend (porta 3000)
- SPA routing (redireciona 404s para index.html)
- Cache inteligente para assets

---

## Configuração de Variáveis de Ambiente

### Variáveis padrão (docker-compose.yml)

Você pode sobrescrever as variáveis criando um arquivo `.env` na raiz de `livro-solidario/`:

```bash
# .env
POSTGRES_USER=usuario_customizado
POSTGRES_PASSWORD=senha_customizada
POSTGRES_DB=livro_solidario
JWT_SECRET=seu-jwt-secret-seguro
```

Então execute:
```bash
docker-compose up
```

### Em produção

**NUNCA** use as credenciais padrão. Altere todas as variáveis de ambiente:

```bash
POSTGRES_USER=prod_user
POSTGRES_PASSWORD=<SENHA_FORTE_E_ALEATÓRIA>
POSTGRES_DB=livro_solidario_prod
JWT_SECRET=<JWT_SECRET_FORTE_E_ALEATÓRIO>
```

---

## Comandos Úteis

### Iniciar em background
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Executar comando no container backend
```bash
docker-compose exec backend npx prisma studio
```

### Limpar tudo (incluindo volumes de dados)
```bash
docker-compose down -v
```

### Reconstruir imagens (se mudou o código)
```bash
docker-compose up --build
```

### Acessar shell do container
```bash
docker-compose exec backend sh
docker-compose exec frontend sh
```

---

## Troubleshooting

### Porta 80 já está em uso

O nginx frontend usa porta 80. Se outra aplicação está usando:

Edite `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "8080:80"  # Acesse em http://localhost:8080
```

### Porta 3000 já está em uso

Edite `docker-compose.yml`:
```yaml
backend:
  ports:
    - "3001:3000"  # Acesse em http://localhost:3001
```

### Banco de dados não conecta

Verifique se o PostgreSQL iniciou corretamente:
```bash
docker-compose logs postgres
```

Pode levar alguns segundos. O backend aguarda o health check do banco.

### Migrations falhando

Verifique se o banco está saudável:
```bash
docker-compose exec postgres pg_isready -U usuario
```

Se ainda falhar, recrie tudo:
```bash
docker-compose down -v
docker-compose up
```

### Frontend não conecta na API

Verifique se o backend está rodando:
```bash
docker-compose logs backend
```

Acesse http://localhost:3000/api/health para verificar o backend.

---

## Dados de Demonstração

O seed automático popula o banco na primeira execução com:
- 4 usuários de exemplo
- 12 livros em diferentes categorias
- Solicitações variadas (PENDENTE, ACEITA, RECUSADA)

Para repopular (limpar tudo):
```bash
docker-compose down -v
docker-compose up
```

---

## Performance

### Multi-stage builds

Ambos Dockerfiles usam multi-stage builds para reduzir o tamanho final:
- Backend: ~150MB (Alpine Linux + Node)
- Frontend: ~20MB (Nginx Alpine)

### Otimizações

- Alpine Linux para reduzir tamanho
- Cache de layers do Docker
- npm ci (em vez de npm install) para build reproduzível
- Nginx com cache inteligente

---

## Desenvolvimento Local vs Docker

### Desenvolvimento (sem Docker)
```bash
cd backend && npm run dev
cd frontend && npm run dev
```
Melhor para desenvolvimento iterativo.

### Produção (com Docker)
```bash
docker-compose up
```
Mais próximo do ambiente real.

---

## Próximos Passos

Após validar localmente, o projeto está pronto para deploy em nuvem:
- [Deploy em Render](./DEPLOY_RENDER.md) (recomendado)
- [Deploy em Railway](./DEPLOY_RAILWAY.md)
- [Deploy em Heroku](./DEPLOY_HEROKU.md)


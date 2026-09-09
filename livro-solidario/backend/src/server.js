require('dotenv').config();

const REQUIRED_ENV_VARS = ['JWT_SECRET', 'DATABASE_URL'];
const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  console.error(`[FATAL] Variaveis de ambiente obrigatorias ausentes: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const livrosRoutes = require('./routes/livros.routes');
const solicitacoesRoutes = require('./routes/solicitacoes.routes');
const adminRoutes = require('./routes/admin.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Log todas as requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/livros', livrosRoutes);
app.use('/api/solicitacoes', solicitacoesRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota nao encontrada.' });
});

app.use(errorHandler);

const PORT = parseInt(process.env.PORT || 8080);
const HOST = '0.0.0.0';

console.log('[DEBUG] Environment variables:');
console.log(`  PORT (raw): ${process.env.PORT}`);
console.log(`  PORT (parsed): ${PORT}`);
console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`  DATABASE_URL: ${process.env.DATABASE_URL ? '✓ Set' : '✗ Not set'}`);

const server = app.listen(PORT, HOST, () => {
  console.log(`✅ API Livro Solidario rodando em ${HOST}:${PORT}`);
  console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`   PID: ${process.pid}`);
});

server.on('error', (err) => {
  console.error('❌ Erro ao iniciar servidor:', err);
  process.exit(1);
});

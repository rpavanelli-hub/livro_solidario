const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');
const ApiError = require('../utils/ApiError');

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function gerarToken(usuarioId) {
  return jwt.sign({ sub: usuarioId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function sanitizarUsuario(usuario) {
  const { senha, ...resto } = usuario;
  return resto;
}

router.post('/register', async (req, res, next) => {
  try {
    const { nome, email, senha, cidade } = req.body;

    if (!nome || !email || !senha || !cidade) {
      throw new ApiError(400, 'Nome, email, senha e cidade sao obrigatorios.');
    }
    if (!EMAIL_REGEX.test(email)) {
      throw new ApiError(400, 'Email invalido.');
    }
    if (senha.length < 6) {
      throw new ApiError(400, 'A senha deve ter no minimo 6 caracteres.');
    }

    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) {
      throw new ApiError(409, 'Ja existe uma conta cadastrada com este email.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, cidade },
    });

    const token = gerarToken(usuario.id);
    res.status(201).json({ usuario: sanitizarUsuario(usuario), token });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      throw new ApiError(400, 'Email e senha sao obrigatorios.');
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      throw new ApiError(401, 'Email ou senha invalidos.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new ApiError(401, 'Email ou senha invalidos.');
    }

    const token = gerarToken(usuario.id);
    res.json({ usuario: sanitizarUsuario(usuario), token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

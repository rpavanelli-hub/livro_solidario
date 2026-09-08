const { Router } = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');
const ApiError = require('../utils/ApiError');

const router = Router();

router.get('/me', auth, async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: { id: true, nome: true, email: true, cidade: true, createdAt: true, updatedAt: true },
    });
    if (!usuario) {
      throw new ApiError(404, 'Usuario nao encontrado.');
    }
    res.json(usuario);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

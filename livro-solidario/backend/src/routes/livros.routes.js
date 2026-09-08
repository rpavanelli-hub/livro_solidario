const { Router } = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');
const ApiError = require('../utils/ApiError');

const router = Router();

const TIPOS_OFERTA = ['DOACAO', 'TROCA'];
const CONDICOES = ['NOVO', 'OTIMO', 'BOM', 'REGULAR'];
const STATUS_LIVRO = ['DISPONIVEL', 'RESERVADO', 'DOADO', 'TROCADO'];

function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme === 'Bearer' && token) {
    try {
      const jwt = require('jsonwebtoken');
      req.userId = jwt.verify(token, process.env.JWT_SECRET).sub;
    } catch {
      // token invalido: segue como visitante anonimo
    }
  }
  next();
}

router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { busca, categoria, cidade, tipoOferta, meus } = req.query;
    const where = {};

    if (meus === 'true') {
      if (!req.userId) {
        throw new ApiError(401, 'Necessario autenticar para listar seus livros.');
      }
      where.usuarioId = req.userId;
    } else {
      where.status = 'DISPONIVEL';
    }

    if (busca) {
      where.OR = [
        { titulo: { contains: busca, mode: 'insensitive' } },
        { autor: { contains: busca, mode: 'insensitive' } },
      ];
    }
    if (categoria) where.categoria = categoria;
    if (cidade) where.cidade = { equals: cidade, mode: 'insensitive' };
    if (tipoOferta && TIPOS_OFERTA.includes(tipoOferta)) where.tipoOferta = tipoOferta;

    const livros = await prisma.livro.findMany({
      where,
      include: { usuario: { select: { id: true, nome: true, cidade: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json(livros);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: req.params.id },
      include: { usuario: { select: { id: true, nome: true, cidade: true } } },
    });
    if (!livro) {
      throw new ApiError(404, 'Livro nao encontrado.');
    }
    res.json(livro);
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { titulo, autor, descricao, categoria, condicao, tipoOferta, cidade } = req.body;

    if (!titulo || !autor || !descricao || !categoria || !cidade) {
      throw new ApiError(400, 'Titulo, autor, descricao, categoria e cidade sao obrigatorios.');
    }
    if (!CONDICOES.includes(condicao)) {
      throw new ApiError(400, `Condicao invalida. Use uma das opcoes: ${CONDICOES.join(', ')}.`);
    }
    if (!TIPOS_OFERTA.includes(tipoOferta)) {
      throw new ApiError(400, `Tipo de oferta invalido. Use uma das opcoes: ${TIPOS_OFERTA.join(', ')}.`);
    }

    const livro = await prisma.livro.create({
      data: { titulo, autor, descricao, categoria, condicao, tipoOferta, cidade, usuarioId: req.userId },
    });

    res.status(201).json(livro);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const livro = await prisma.livro.findUnique({ where: { id: req.params.id } });
    if (!livro) {
      throw new ApiError(404, 'Livro nao encontrado.');
    }
    if (livro.usuarioId !== req.userId) {
      throw new ApiError(403, 'Voce so pode editar seus proprios livros.');
    }

    const { titulo, autor, descricao, categoria, condicao, tipoOferta, cidade, status } = req.body;

    if (condicao && !CONDICOES.includes(condicao)) {
      throw new ApiError(400, `Condicao invalida. Use uma das opcoes: ${CONDICOES.join(', ')}.`);
    }
    if (tipoOferta && !TIPOS_OFERTA.includes(tipoOferta)) {
      throw new ApiError(400, `Tipo de oferta invalido. Use uma das opcoes: ${TIPOS_OFERTA.join(', ')}.`);
    }
    if (status && !STATUS_LIVRO.includes(status)) {
      throw new ApiError(400, `Status invalido. Use uma das opcoes: ${STATUS_LIVRO.join(', ')}.`);
    }

    const atualizado = await prisma.livro.update({
      where: { id: req.params.id },
      data: { titulo, autor, descricao, categoria, condicao, tipoOferta, cidade, status },
    });

    res.json(atualizado);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const livro = await prisma.livro.findUnique({ where: { id: req.params.id } });
    if (!livro) {
      throw new ApiError(404, 'Livro nao encontrado.');
    }
    if (livro.usuarioId !== req.userId) {
      throw new ApiError(403, 'Voce so pode excluir seus proprios livros.');
    }

    await prisma.livro.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

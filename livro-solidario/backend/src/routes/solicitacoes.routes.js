const { Router } = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');
const ApiError = require('../utils/ApiError');

const router = Router();

router.use(auth);

const INCLUDE_PADRAO = {
  livro: { include: { usuario: { select: { id: true, nome: true, cidade: true } } } },
  solicitante: { select: { id: true, nome: true, cidade: true } },
};

router.post('/', async (req, res, next) => {
  try {
    const { livroId } = req.body;
    if (!livroId) {
      throw new ApiError(400, 'O campo livroId e obrigatorio.');
    }

    const livro = await prisma.livro.findUnique({ where: { id: livroId } });
    if (!livro) {
      throw new ApiError(404, 'Livro nao encontrado.');
    }
    if (livro.usuarioId === req.userId) {
      throw new ApiError(400, 'Voce nao pode solicitar seu proprio livro.');
    }
    if (livro.status !== 'DISPONIVEL') {
      throw new ApiError(400, 'Este livro nao esta disponivel no momento.');
    }

    const jaSolicitado = await prisma.solicitacao.findFirst({
      where: { livroId, solicitanteId: req.userId, status: 'PENDENTE' },
    });
    if (jaSolicitado) {
      throw new ApiError(409, 'Voce ja possui uma solicitacao pendente para este livro.');
    }

    const solicitacao = await prisma.solicitacao.create({
      data: { livroId, solicitanteId: req.userId },
      include: INCLUDE_PADRAO,
    });

    res.status(201).json(solicitacao);
  } catch (err) {
    next(err);
  }
});

router.get('/enviadas', async (req, res, next) => {
  try {
    const solicitacoes = await prisma.solicitacao.findMany({
      where: { solicitanteId: req.userId },
      include: INCLUDE_PADRAO,
      orderBy: { createdAt: 'desc' },
    });
    res.json(solicitacoes);
  } catch (err) {
    next(err);
  }
});

router.get('/recebidas', async (req, res, next) => {
  try {
    const solicitacoes = await prisma.solicitacao.findMany({
      where: { livro: { usuarioId: req.userId } },
      include: INCLUDE_PADRAO,
      orderBy: { createdAt: 'desc' },
    });
    res.json(solicitacoes);
  } catch (err) {
    next(err);
  }
});

async function carregarSolicitacaoDoProprietario(req) {
  const solicitacao = await prisma.solicitacao.findUnique({
    where: { id: req.params.id },
    include: { livro: true },
  });
  if (!solicitacao) {
    throw new ApiError(404, 'Solicitacao nao encontrada.');
  }
  if (solicitacao.livro.usuarioId !== req.userId) {
    throw new ApiError(403, 'Voce so pode gerenciar solicitacoes dos seus proprios livros.');
  }
  if (solicitacao.status !== 'PENDENTE') {
    throw new ApiError(400, 'Esta solicitacao ja foi respondida.');
  }
  return solicitacao;
}

router.put('/:id/aceitar', async (req, res, next) => {
  try {
    const solicitacao = await carregarSolicitacaoDoProprietario(req);

    const [, , atualizada] = await prisma.$transaction([
      prisma.solicitacao.updateMany({
        where: { livroId: solicitacao.livroId, status: 'PENDENTE', NOT: { id: solicitacao.id } },
        data: { status: 'RECUSADA' },
      }),
      prisma.livro.update({ where: { id: solicitacao.livroId }, data: { status: 'RESERVADO' } }),
      prisma.solicitacao.update({
        where: { id: solicitacao.id },
        data: { status: 'ACEITA' },
        include: INCLUDE_PADRAO,
      }),
    ]);

    res.json(atualizada);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/recusar', async (req, res, next) => {
  try {
    const solicitacao = await carregarSolicitacaoDoProprietario(req);

    const atualizada = await prisma.solicitacao.update({
      where: { id: solicitacao.id },
      data: { status: 'RECUSADA' },
      include: INCLUDE_PADRAO,
    });

    res.json(atualizada);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

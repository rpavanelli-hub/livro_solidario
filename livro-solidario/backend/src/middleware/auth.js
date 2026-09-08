const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Token de autenticacao ausente.'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    next(new ApiError(401, 'Token de autenticacao invalido ou expirado.'));
  }
}

module.exports = auth;

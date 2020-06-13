const User = require('../models/user');
const jwt = require('jsonwebtoken');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
  request.token = null;
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const authUser = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);
  if (!user.equals(decodedToken.id)) {
    return res.status(401).json({
      error: 'user not found',
    });
  }
  req.user = user;
  next();
};

const authAdmin = (req, res, next) => {
  const user = req.user;
  if (
    !user ||
    user.isAdmin != true ||
    user.email !== 'onur.temiz@boun.edu.tr'
  ) {
    return res.status(401).json({
      error: 'not admin',
    });
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'TypeError') {
    return response.status(400).json({
      error: error.message,
    });
  }
  if (error.name === 'SyntaxError') {
    return response.status(400).json({
      error: error.message,
    });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  authUser,
  authAdmin,
};

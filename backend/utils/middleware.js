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
      error: 'Kullaınıcı bulunamadı. Gir çık yapmayı deneyin. Hata kodu 5',
    });
  }
  const user = await User.findById(decodedToken.id);
  if (!user.equals(decodedToken.id)) {
    return res.status(401).json({
      error: 'Kullanıcı bulunamadı. Gir çık yapmayı deneyin. Hata kodu 6',
    });
  }
  req.user = user;
  next();
};

const authAdmin = (req, res, next) => {
  const user = req.user;
  if (
    !user ||
    user.userStatus != 'admin' ||
    user.email !== 'onur.temiz@boun.edu.tr'
  ) {
    return res.status(401).json({
      error: 'not admin',
    });
  }
  next();
};

const searchFilter = (req,res,next)=>{
  if(req.query.search){
    req.query.search = req.query.search.replace(/\W/g, '');
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: 'Onur bir şeyleri batırdı. Hata kodu 7' });
  }
  if (error.name === 'ValidationError') {
    return response
      .status(400)
      .json({ error: 'Onur bir şeyleri batırdı. Hata kodu 8' });
  }
  if (error.name === 'TypeError') {
    return response.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 9',
    });
  }
  if (error.name === 'SyntaxError') {
    return response.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 10',
    });
  }
  if (error.name === 'JsonWebTokenError') {
    console.log(JSON.stringify(error));
    return response.status(401).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 11',
    });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  authUser,
  authAdmin,searchFilter
};

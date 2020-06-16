const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;
  const isEmailBoun = body.email.match(/^[A-Z0-9._%+-]+@boun.edu.tr$/i);
  if (!body.email || isEmailBoun === null) {
    return response.status(400).json({
      error: 'Boğaziçi uzantılı eposta adresinizi girmelisiniz.',
    });
  } else if (!body.password || body.password.length < 8) {
    return response.status(400).json({
      error: 'Şifreniz 8 veya daha çok karakterden oluşmalı.',
    });
  }

  const user = await User.findOne({ email: body.email });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Epostanız ya da şifreniz geçersiz.',
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({
    token,
    id: user._id,
    email: user.email,
    username: user.username,
    following: user.following,
  });
});

module.exports = loginRouter;

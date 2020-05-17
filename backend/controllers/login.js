const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;
  const reResult = body.email.match(/^[A-Z0-9._%+-]+@boun.edu.tr$/i);
  if (!body.email || reResult === null) {
    return response.status(400).json({
      error: 'Must have boun email',
    });
  } else if (!body.password || body.password.length < 8) {
    return response.status(400).json({
      error: 'Password must be present and 8 characters or more ',
    });
  }

  const user = await User.findOne({ email: body.email });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
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
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

module.exports = loginRouter;

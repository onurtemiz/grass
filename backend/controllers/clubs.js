const clubsRouter = require('express').Router();
const User = require('../models/user');
const Club = require('../models/club');
const jwt = require('jsonwebtoken');

clubsRouter.all('*', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);

  if (user == undefined) {
    return res.status(401).json({
      error: 'user not found',
    });
  }

  req.user = decodedToken.id;

  next();
});

clubsRouter.all('*', async (req, res, next) => {
  const user = await User.findById(req.user);
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
});

clubsRouter.post('/', async (req, res) => {
  const body = req.body;
  if (!body || !body.shortName || !body.fullName || !body.description) {
    return res.json({
      error: 'missing information',
    });
  }
  const club = new Club({
    shortName: body.shortName,
    fullName: body.fullName,
    description: body.description,
  });

  await club.save();
  console.log('body', body);

  res.json(club.toJSON());
});

module.exports = clubsRouter;

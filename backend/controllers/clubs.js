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

clubsRouter.get('/total', async (req, res) => {
  const q = req.query;
  const total = await Club.getFilteredInf(
    q.search,
    q.start,
    q.total
  ).countDocuments();
  res.json({ total: total });
});

clubsRouter.get('/:name', async (req, res) => {
  const club = await Club.findOne({ shortName: req.params.name }).populate(
    'comments'
  );
  res.json(club.toJSON());
});

clubsRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!('start' in q) || !('total' in q)) {
    res.status(400).json({
      error: 'should have start or total',
    });
  }
  const clubs = await Club.getFilteredInf(q.search, q.start, q.total);
  res.json(clubs.map((c) => c.toJSON()));
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

clubsRouter.put('/:id', async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.json({
      error: 'missing information',
    });
  }
  const club = await Club.findById(req.params.id);
  if (body.shortName) {
    club.shortName = body.shortName;
  }
  if (body.fullName) {
    club.fullName = body.fullName;
  }
  if (body.description) {
    club.description = body.description;
  }
  await club.save();
  res.json(club.toJSON());
});

clubsRouter.post('/', async (req, res) => {
  const body = req.body;
  if (!body || !body.shortName || !body.fullName) {
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

  res.json(club.toJSON());
});

module.exports = clubsRouter;

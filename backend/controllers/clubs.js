const clubsRouter = require('express').Router();
const Club = require('../models/club');
const middleware = require('../utils/middleware');
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
  const club = await Club.findOne({ name: req.params.name }).populate({
    path: 'comments',
    select: ['user'],
  });
  res.json(club.toJSON());
});

clubsRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!('start' in q) || !('total' in q)) {
    res.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 15',
    });
  }
  const clubs = await Club.getFilteredInf(q.search, q.start, q.total);
  res.json(clubs.map((c) => c.toJSON()));
});

clubsRouter.use(middleware.authAdmin);

clubsRouter.put('/:id', async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.json({
      error: 'missing information',
    });
  }
  const club = await Club.findById(req.params.id);
  if (body.name) {
    club.name = body.name;
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
  if (!body || !body.name || !body.fullName) {
    return res.json({
      error: 'missing information',
    });
  }
  const club = new Club({
    name: body.name,
    fullName: body.fullName,
    description: body.description,
  });

  await club.save();

  res.json(club.toJSON());
});

module.exports = clubsRouter;

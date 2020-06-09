const campusesRouter = require('express').Router();
const Campus = require('../models/campus');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

campusesRouter.all('*', async (req, res, next) => {
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

// campusesRouter.get('/asd', async (req, res) => {
//   let g = new Campus({
//     name: 'Hisar Kampüsü',
//   });
//   await g.save();
//   g = new Campus({
//     name: 'Uçaksava Kampüsü',
//   });
//   await g.save();
//   g = new Campus({
//     name: 'Kandilli Kampüsü',
//   });
//   await g.save();
//   g = new Campus({
//     name: 'Kilyos Kampüsü',
//   });
//   await g.save();

//   res.end();
// });

campusesRouter.get('/', async (req, res) => {
  const campuses = await Campus.find();
  return res.json(campuses.map((c) => c.toJSON()));
});

module.exports = campusesRouter;

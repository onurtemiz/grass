const dormsRouter = require('express').Router();
const Dorm = require('../models/dorm');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

dormsRouter.all('*', async (req, res, next) => {
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

// dormsRouter.get('/asd', async (req, res) => {
//   let g = new Dorm({
//     name: '1. Erkek Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: '1. Kız Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: '1. Kuzey Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: '2. Kuzey Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: '3. Kuzey Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: '4. Kuzey Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: '1. Kilyos Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: '3. Kilyos Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: 'Kandili Yurdu',
//   });
//   await g.save();
//   g = new Dorm({
//     name: 'Süperdorm',
//   });
//   await g.save();

//   res.end();
// });

dormsRouter.get('/', async (req, res) => {
  const dorms = await Dorm.find();
  return res.json(dorms.map((d) => d.toJSON()));
});

module.exports = dormsRouter;

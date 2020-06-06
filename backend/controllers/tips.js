const tipsRouter = require('express').Router();
const User = require('../models/user');
const Tip = require('../models/tip');
const jwt = require('jsonwebtoken');

tipsRouter.all('*', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }

  req.user = decodedToken.id;

  next();
});

tipsRouter.put('/approve', async (req, res) => {
  const q = req.query;
  const user = await User.findById(req.user);
  if (
    !user ||
    user.isAdmin != true ||
    user.email !== 'onur.temiz@boun.edu.tr'
  ) {
    return res.status(401).json({
      error: 'not admin',
    });
  } else if (!q.id) {
    return res.status(400).json({
      error: 'no id',
    });
  }
  const tip = await Tip.findById(q.id);
  if (!tip) {
    return res.status(400).json({
      error: 'no tip',
    });
  }
  tip.isApproved = !tip.isApproved;
  await tip.save();
  res.status(200).end();
});

tipsRouter.delete('/remove', async (req, res) => {
  const q = req.query;
  const user = await User.findById(req.user);
  if (
    !user ||
    user.isAdmin != true ||
    user.email !== 'onur.temiz@boun.edu.tr'
  ) {
    return res.status(401).json({
      error: 'not admin',
    });
  } else if (!q.id) {
    return res.status(400).json({
      error: 'no id',
    });
  }

  await Tip.findByIdAndDelete(q.id);
  res.status(204).end();
});

tipsRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findById(req.user);

  if (
    !body ||
    !body.tip ||
    !req.user ||
    typeof body.isAnonim === 'undefined' ||
    !user ||
    body.tip.length > 150
  ) {
    return res.status(400).json({
      error: 'invalid post',
    });
  }

  const tip = new Tip({
    tip: body.tip,
    user: user._id,
    isAnonim: body.isAnonim,
  });

  await tip.save();
  res.status(201).json(tip.toJSON());
});

tipsRouter.get('/all', async (req, res) => {
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
  const tips = await Tip.find();
  res.json(tips.map((t) => t.toJSON()));
});

tipsRouter.get('/', async (req, res) => {
  const totalTips = await Tip.find({ isApproved: true }).countDocuments();

  const randTip = await Tip.findOne({ isApproved: true }).skip(
    Math.floor(Math.random() * totalTips)
  );

  const jsonTip = randTip.toJSON();
  if (jsonTip.isAnonim) {
    return res.json({
      tip: jsonTip.tip,
      isAnonim: true,
    });
  } else {
    const user = await User.findById(jsonTip.user);
    return res.json({
      tip: jsonTip.tip,
      isAnonim: false,
      user: user.username,
    });
  }
});

module.exports = tipsRouter;

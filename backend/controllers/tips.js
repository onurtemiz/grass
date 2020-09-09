const tipsRouter = require('express').Router();
const User = require('../models/user');
const Tip = require('../models/tip');
const middleware = require('../utils/middleware');

tipsRouter.get('/total', async (req, res) => {
  const total = await Tip.find({ isApproved: true }).countDocuments();
  res.json({ total: total });
});

tipsRouter.put('/approve', middleware.authAdmin, async (req, res) => {
  const q = req.query;
  if (!q.id) {
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

tipsRouter.put('/like', async (req, res) => {
  const tip = await Tip.findById(req.query.id);

  const user = req.user;

  if (!tip) {
    return res.status(400).json({
      error: 'Tavsiye bulunamadı.',
    });
  }

  const isLiked = tip.likes.some((u) => u.equals(user._id));

  if (isLiked) {
    tip.likes = tip.likes.filter((u) => !u.equals(user._id));
    tip.likesLength = tip.likesLength - 1;
  } else {
    tip.likes = tip.likes.concat(user._id);
    tip.likesLength = tip.likesLength + 1;
  }
  await tip.save();
  let jsonedTip;
  if (tip.isAnonim) {
    jsonedTip = tip.toJSON();
  } else {
    const user = await User.findById(tip.user);
    jsonedTip = {
      ...tip.toJSON(),
      user: user.username,
      userIcon: user.iconName,
    };
  }

  res.json(jsonedTip);
});

tipsRouter.delete('/remove', middleware.authAdmin, async (req, res) => {
  const q = req.query;
  if (!q.id) {
    return res.status(400).json({
      error: 'no id',
    });
  }

  await Tip.findByIdAndDelete(q.id);
  res.status(204).end();
});

tipsRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = req.user;
  if (
    !body ||
    !body.tip ||
    !req.user ||
    typeof body.isAnonim === 'undefined' ||
    !user ||
    body.tip.length > 250
  ) {
    return res.status(400).json({
      error: 'Geçersiz tavsiye. Hata kodu 13',
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

tipsRouter.get('/all', middleware.authAdmin, async (req, res) => {
  const tips = await Tip.find();
  res.json(tips.map((t) => t.toJSON()));
});

tipsRouter.get('/random', async (req, res) => {
  const totalTips = await Tip.find({ isApproved: true }).countDocuments();

  const randTip = await Tip.findOne({ isApproved: true }).skip(
    Math.floor(Math.random() * totalTips)
  );

  const jsonTip = randTip.toJSON();
  if (jsonTip.isAnonim) {
    return res.json(jsonTip);
  } else {
    const user = await User.findById(randTip.user);
    return res.json({
      ...jsonTip,
      user: user.username,
    });
  }
});

tipsRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!q.start || !q.total || !q.filter) {
    return res.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 14',
    });
  }

  let popular = false;
  let sort = -1;

  if (q.filter === 'mostPopular') {
    popular = true;
  } else if (q.filter === 'mostPast') {
    sort = 1;
  }

  const tips = await Tip.getFilteredInf({ popular, sort }, q.start, q.total);
  let filteredTips = [];
  for (let i = 0; i < tips.length; i++) {
    let jsonedTip = tips[i].toJSON();
    if (tips[i].isAnonim) {
      filteredTips.push(jsonedTip);
    } else {
      const user = await User.findById(tips[i].user);
      filteredTips.push({
        ...jsonedTip,
        user: user.username,
        userIcon: user.iconName,
      });
    }
  }
  res.json(filteredTips);
});

module.exports = tipsRouter;

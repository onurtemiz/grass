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
    body.tip.length > 150
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

tipsRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!q.start || !q.total) {
    return res.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 14',
    });
  }
  const tips = await Tip.find({ isApproved: true })
    .skip(Number(q.start))
    .limit(Number(q.total));
  const jsonedTips = tips.map((t) => t.toJSON());
  let filteredTips = [];
  for (let i = 0; i < jsonedTips.length; i++) {
    if (jsonedTips[i].isAnonim) {
      filteredTips.push({
        tip: jsonedTips[i].tip,
        isAnonim: true,
      });
    } else {
      const user = await User.findById(jsonedTips[i].user);
      filteredTips.push({
        tip: jsonedTips[i].tip,
        isAnonim: false,
        user: user.username,
      });
    }
  }
  res.json(filteredTips);
});

module.exports = tipsRouter;

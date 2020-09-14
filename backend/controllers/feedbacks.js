const feedbacksRouter = require('express').Router();
const Feedback = require('../models/feedback');

feedbacksRouter.post('/post', async (req, res) => {
  const feedback = new Feedback({
    topic: req.body.topic,
    description: req.body.description,
    user: req.user._id,
  });
  await feedback.save();
  res.end();
});

module.exports = feedbacksRouter;

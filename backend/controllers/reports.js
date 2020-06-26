const reportsRouter = require('express').Router();
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const Report = require('../models/report');
const middleware = require('../utils/middleware');

reportsRouter.post('/', async (req, res) => {
  const body = req.body;
  if (
    !body ||
    typeof body.isCurse !== 'boolean' ||
    typeof body.isSpam !== 'boolean' ||
    typeof body.isHate !== 'boolean' ||
    typeof body.extra !== 'string' ||
    !body.reportedCommentId ||
    !body.reportedUser ||
    !body.reportedComment
  ) {
    return res.status(400).json({
      error: 'Eksik bilgi',
    });
  }

  const reportedComment = await Comment.findById(body.reportedCommentId);

  if (!reportedComment) {
    return res.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 12',
    });
  }

  if (body.extra && body.extra.length > 1000) {
    return res.status(400).json({
      error: 'Açıklama 1000 karakter veya daha az olmalı.',
    });
  }

  const report = new Report({
    ...body,
    userId: req.user._id,
    user: req.user.username,
  });
  await report.save();
  res.status(201).end();
});

reportsRouter.use(middleware.authAdmin);

reportsRouter.get('/all', async (req, res) => {
  const reports = await Report.find();
  res.json(reports.map((t) => t.toJSON()));
});

reportsRouter.put('/manage', async (req, res) => {
  const q = req.query;
  if (!q.id) {
    return res.status(400).json({
      error: 'no id',
    });
  } else if (
    !q.to ||
    (q.to !== 'hidden' && q.to !== 'visible' && q.to !== 'destroyed')
  ) {
    return res.status(400).json({
      error: 'no to or invalid',
    });
  }
  const comment = await Comment.findById(q.id);
  if (!comment) {
    return res.status(400).json({
      error: 'no comment',
    });
  }

  await Comment.findByIdAndUpdate(q.id, {
    commentStatus: q.to,
  });

  res.status(200).end();
});

reportsRouter.delete('/remove', async (req, res) => {
  const q = req.query;
  if (!q.id) {
    return res.status(400).json({
      error: 'no id',
    });
  }
  await Report.findByIdAndDelete(q.id);
  res.status(204).end();
});

module.exports = reportsRouter;

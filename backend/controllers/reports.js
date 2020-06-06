const reportsRouter = require('express').Router();
const User = require('../models/user');
const Comment = require('../models/comment');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const Report = require('../models/report');
const jwt = require('jsonwebtoken');

reportsRouter.all('*', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  req.user = decodedToken.id;
  next();
});

reportsRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findById(req.user);
  if (
    !user ||
    !body ||
    typeof body.isCurse !== 'boolean' ||
    typeof body.isSpam !== 'boolean' ||
    typeof body.isHate !== 'boolean' ||
    typeof body.extra !== 'string' ||
    !body.reportedUser ||
    !body.reportedComment ||
    !body.reportedUserId ||
    !body.reportedCommentId ||
    !body.lessonId ||
    !body.teacherId ||
    !body.reportedCommentDate ||
    !body.reportedCommentLikes
  ) {
    return res.status(400).json({
      error: 'missing information',
    });
  }

  const reportedUser = await User.findById(body.reportedUserId);
  const reportedComment = await Comment.findById(body.reportedCommentId);

  if (!reportedUser || !reportedComment) {
    return res.status(400).json({
      error: 'user or comment not found',
    });
  }

  if (body.extra && body.extra.length > 1000) {
    return res.status(400).json({
      error: 'must be less than 1000',
    });
  }

  const report = new Report({
    extra: body.extra,
    isCurse: body.isCurse,
    isSpam: body.isSpam,
    isHate: body.isHate,
    reportedComment: body.reportedComment,
    reportedCommentId: body.reportedCommentId,
    reportedCommentDate: body.reportedCommentDate,
    reportedCommentLikes: body.reportedCommentLikes,
    reportedUserId: body.reportedUserId,
    reportedUser: body.reportedUser,
    teacherId: body.teacherId,
    lessonId: body.lessonId,
    user: user.username,
    userId: req.user,
  });
  await report.save();
  res.status(201).end();
});

reportsRouter.all('/admin/*', async (req, res, next) => {
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

reportsRouter.get('/all', async (req, res) => {
  const reports = await Report.find();
  res.json(reports.map((t) => t.toJSON()));
});

reportsRouter.put('/approve', async (req, res) => {
  const q = req.query;
  if (!q.id) {
    return res.status(400).json({
      error: 'no id',
    });
  }
  const report = await Report.findById(q.id);
  if (!report) {
    return res.status(400).json({
      error: 'no report',
    });
  }
  if (report.isApproved == true) {
    const teacher = await Teacher.findById(report.teacherId);
    const lesson = await Lesson.findById(report.lessonId);
    const user = await User.findById(report.reportedUserId);
    const comment = new Comment({
      teacher: report.teacherId,
      lesson: report.lessonId,
      user: report.reportedUserId,
      comment: report.reportedComment,
      date: report.reportedCommentDate,
      likes: report.reportedCommentLikes,
    });
    await comment.save();
    user.comments = user.comments.concat(comment._id);
    teacher.comments = teacher.comments.concat(comment._id);
    lesson.comments = lesson.comments.concat(comment._id);
    await user.save();
    await teacher.save();
    await lesson.save();
  } else {
    await Comment.findByIdAndRemove(report.reportedCommentId);

    await Teacher.findOneAndUpdate(
      { comments: { $in: report.reportedCommentId } },
      { $pull: { comments: report.reportedCommentId } }
    );
    await Lesson.findOneAndUpdate(
      {
        comments: { $in: report.reportedCommentId },
      },
      { $pull: { comments: report.reportedCommentId } }
    );
    await User.findOneAndUpdate(
      {
        comments: { $in: report.reportedCommentId },
      },
      { $pull: { comments: report.reportedCommentId } }
    );
  }

  report.isApproved = !report.isApproved;
  await report.save();
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

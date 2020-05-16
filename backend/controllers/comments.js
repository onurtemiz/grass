const commentsRouter = require('express').Router();
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const User = require('../models/user');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find({});
  res.json(comments.map((c) => c.toJSON()));
});

commentsRouter.post('/', async (req, res) => {
  console.log('req.token', req);

  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!body.comment) {
    return res.status(400).json({
      error: 'Comment must be present',
    });
  } else if (!body.teacherId) {
    return res.status(400).json({
      error: 'TeacherId must be present',
    });
  } else if (!body.lessonId) {
    return res.status(400).json({
      error: 'LessonId must be present',
    });
  } else if (!req.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const teacher = await Teacher.findById(body.teacherId);
  const lesson = await Lesson.findById(body.lessonId);
  const user = await User.findById(decodedToken.id);
  const isTeacherRight = lesson.teacher.equals(teacher._id) ? true : false;

  const isDuplicate = await Comment.findOne({
    teacher: body.teacherId,
    lesson: body.lessonId,
    user: user._id,
  });

  if (!teacher || !lesson || !user) {
    return res.status(400).json({
      error: 'Could not find the teacher,lesson,user',
    });
  }
  if (isDuplicate !== null) {
    return res.status(400).json({
      error: 'you have already commented',
    });
  } else if (!isTeacherRight) {
    return res.status(400).json({
      error: 'teacher and lesson dont match.',
    });
  }

  const comment = new Comment({
    teacher: body.teacherId,
    lesson: body.lessonId,
    user: user._id,
    comment: body.comment,
    date: new Date(),
  });
  await comment.save();
  user.comments = user.comments.concat(comment._id);
  teacher.comments = teacher.comments.concat(comment._id);
  lesson.comments = lesson.comments.concat(comment._id);
  await user.save();
  await teacher.save();
  await lesson.save();
  res.json(comment.toJSON());
});

commentsRouter.post('/:id', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!body.comment || !body.id) {
    return res.status(400).json({
      error: 'Comment must be present',
    });
  } else if (!req.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const comment = await Comment.findById(body.id);
  const user = await User.findById(decodedToken.id);
  if (!comment || !user) {
    return res.status(400).json({
      error: 'comment or user not found.',
    });
  }
  if (!user.comments.includes(body.id)) {
    return res.status(400).json({
      error: 'you have no right',
    });
  }
  comment.comment = body.comment;
  await comment.save();
  return res.json(comment.toJSON());
});

module.exports = commentsRouter;

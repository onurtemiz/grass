const commentsRouter = require('express').Router();
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const User = require('../models/user');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

commentsRouter.get('/', async (req, res) => {
  const q = req.query;
  if ('teacherId' in q) {
    const comments =
      'start' in q && 'total' in q
        ? await Comment.find({ teacher: q.teacherId })
            .skip(Number(q.start))
            .limit(Number(q.total))
            .populate('user')
        : await Comment.find({ teacher: q.teacherId }).populate('user');

    return res.json(comments.map((c) => c.toJSON()));
  } else if ('lessonId' in q) {
    const comments =
      'start' in q && 'total' in q
        ? await Comment.find({ lesson: q.lessonId })
            .skip(Number(q.start))
            .limit(Number(q.total))
            .populate('user')
        : await Comment.find({ lesson: q.lessonId }).populate('user');
    return res.json(comments.map((c) => c.toJSON()));
  }

  const comments = await Comment.find({});
  res.json(comments.map((c) => c.toJSON()));
});

commentsRouter.get('/total', async (req, res) => {
  const q = req.query;
  if ('teacherId' in q) {
    const total = await Comment.find({
      teacher: q.teacherId,
    }).countDocuments();
    return res.json({ total: total });
  } else if ('lessonId' in q) {
    const total = await Comment.find({
      lesson: q.lessonId,
    }).countDocuments();
    return res.json({ total: total });
  }
});

commentsRouter.post('/', async (req, res) => {
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
  // ONLY ONE COMMENT PER LESSON
  // if (isDuplicate !== null) {
  //   return res.status(400).json({
  //     error: 'you have already commented',
  //   });
  // }
  if (!isTeacherRight) {
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
  const opts = [{ path: 'user' }];
  Comment.populate(comment, opts, function (err, comment) {
    res.status(201).json(comment.toJSON());
  });
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

const commentsRouter = require('express').Router();
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const User = require('../models/user');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

const getCommentFilter = async (q) => {
  let comments;
  if (q.filter === 'mostRecent' || q.filter === 'mostPast') {
    const sort = q.filter === 'mostRecent' ? -1 : 1;
    comments =
      'start' in q && 'total' in q
        ? await Comment.getRecentPast(sort, q.start, q.total)
        : await Comment.getRecentPast(sort);
  } else if (q.filter === 'mostPopular') {
    comments =
      'start' in q && 'total' in q
        ? await Comment.getMostPopular(q.start, q.total)
        : await Comment.getMostPopular();
  }
  return comments;
};

const getCommentFeed = async (q, user) => {
  let comments;
  if (q.filter === 'mostRecent' || q.filter === 'mostPast') {
    const sort = q.filter === 'mostRecent' ? -1 : 1;
    comments = await Comment.getRecentPastFeed(
      user.following,
      sort,
      q.start,
      q.total
    );
  } else if (q.filter === 'mostPopular') {
    comments = await Comment.getMostPopularFeed(
      user.following,
      q.start,
      q.total
    );
  }

  return comments;
};

const getIdFilter = async (q) => {
  let comments;
  if (q.filter === 'mostRecent' || q.filter === 'mostPast') {
    const sort = q.filter === 'mostRecent' ? -1 : 1;
    comments =
      'start' in q && 'total' in q
        ? await Comment.getRecentPastById(q.id, sort, q.start, q.total)
        : await Comment.getRecentPastById(q.id, sort);
  } else if (q.filter === 'mostPopular') {
    comments =
      'start' in q && 'total' in q
        ? await Comment.getMostPopularById(q.id, q.start, q.total)
        : await Comment.getMostPopularById(q.id);
  }
  return comments;
};

commentsRouter.get('/total', async (req, res) => {
  const q = req.query;
  let total =
    'id' in q
      ? await Comment.find({
          $or: [{ teacher: q.id }, { lesson: q.id }, { user: q.id }],
        }).countDocuments()
      : await Comment.find().countDocuments();
  res.json({ total });
});

commentsRouter.get('/feed/total', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(400).json({
      error: 'Could not find user',
    });
  }
  const total = await Comment.find({
    lesson: { $in: user.following },
  }).countDocuments();
  console.log('total', total);
  res.json({
    total,
  });
});

commentsRouter.get('/feed', async (req, res) => {
  const q = req.query;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  } else if (!'start' in q || !'total' in q || !'filter' in q) {
    return res.status(401).json({
      error: 'query is missing',
    });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(400).json({
      error: 'Could not find user',
    });
  }

  let comments = await getCommentFeed(q, user);
  if (q.filter === 'mostPopular') {
    return res.json(comments);
  }
  res.json(comments.map((c) => c.toJSON()));
});

commentsRouter.get('/', async (req, res) => {
  const q = req.query;
  let comments;
  if ('id' in q && 'filter' in q) {
    comments = await getIdFilter(q);
  } else if ('filter' in q) {
    comments = await getCommentFilter(q);
  } else if ('id' in q) {
    const comment = await Comment.findById(q.id);
    if (comment) {
      return res.json(comment.toJSON());
    }
    return res.status(400).json({
      error: 'comment not found',
    });
  } else {
    comments = await Comment.find({});
  }
  if (q.filter === 'mostPopular') {
    return res.json(comments);
  }
  res.json(comments.map((c) => c.toJSON()));
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
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const teacher = await Teacher.findById(body.teacherId);
  const lesson = await Lesson.findById(body.lessonId);
  const user = await User.findById(decodedToken.id);
  const isTeacherRight = lesson.teacher.equals(teacher._id);

  if (!teacher || !lesson || !user) {
    return res.status(400).json({
      error: 'Could not find the teacher,lesson,user',
    });
  }
  // ONLY ONE COMMENT PER LESSON
  // const isDuplicate = await Comment.findOne({
  //   teacher: body.teacherId,
  //   lesson: body.lessonId,
  //   user: user._id,
  // });
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
    likes: [user._id],
  });
  await comment.save();
  user.comments = user.comments.concat(comment._id);
  teacher.comments = teacher.comments.concat(comment._id);
  lesson.comments = lesson.comments.concat(comment._id);
  await user.save();
  await teacher.save();
  await lesson.save();
  const opts = [{ path: 'user' }];
  // await person.populate('stories').execPopulate();

  Comment.populate(comment, opts, function (err, comment) {
    res.status(201).json(comment.toJSON());
  });
});

commentsRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const comment = await Comment.findById(req.params.id);
  // User.update({ _id: decodedToken.id }, { $set: { totalLikes: 0 } });

  const user = await User.findById(decodedToken.id);

  if (!req.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  } else if (!comment || !user) {
    return res.status(400).json({
      error: 'comment or user not found.',
    });
  }
  if ('comment' in body) {
    const isUserHave = user.comments.some((c) => c.equals(req.params.id));
    if (!isUserHave) {
      return res.status(400).json({
        error: 'you have no right',
      });
    }
    comment.comment = body.comment;
  } else {
    const isLiked = comment.likes.some((u) => u.equals(user._id));

    if (isLiked) {
      comment.likes = comment.likes.filter((u) => !u.equals(user._id));
    } else {
      comment.likes = comment.likes.concat(user._id);
    }
  }
  await comment.save();
  const opts = [{ path: 'user' }];
  Comment.populate(comment, opts, function (err, comment) {
    res.json(comment.toJSON());
  });
});

commentsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  const comment = await Comment.findById(req.params.id);
  const user = await User.findById(decodedToken.id);
  const isUserHave = user.comments.some((c) => c.equals(req.params.id));
  if (!req.token || !decodedToken.id) {
    return response.status(401)({
      error: 'token missing or invalid',
    });
  } else if (!comment || !user) {
    return res.status(400).json({
      error: 'comment or user not found.',
    });
  } else if (!isUserHave) {
    return res.status(401).json({
      error: 'you have no right',
    });
  }
  await Comment.findByIdAndRemove(req.params.id);

  await Teacher.findOneAndUpdate(
    { comments: { $in: req.params.id } },
    { $pull: { comments: req.params.id } }
  );
  await Lesson.findOneAndUpdate(
    {
      comments: { $in: req.params.id },
    },
    { $pull: { comments: req.params.id } }
  );
  await User.findOneAndUpdate(
    {
      comments: { $in: req.params.id },
    },
    { $pull: { comments: req.params.id } }
  );

  res.status(204).end();
});

module.exports = commentsRouter;

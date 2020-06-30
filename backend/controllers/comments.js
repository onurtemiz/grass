const commentsRouter = require('express').Router();
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const User = require('../models/user');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const Connect = require('../models/connect');
const Club = require('../models/club');
const Campus = require('../models/campus');
const Dorm = require('../models/dorm');
const Question = require('../models/question');
const Notification = require('../models/notification');
const rateLimit = require('express-rate-limit');

const getCommentFilter = async (q) => {
  let popular = q.filter === 'mostPopular';
  const sort = q.filter === 'mostRecent' ? -1 : 1;

  const comments = await Comment.getSquareComments(
    { sort, popular },
    q.start,
    q.total
  );

  return comments;
};

const getCommentFeed = async (q, user) => {
  let popular = q.filter === 'mostPopular';
  const sort = q.filter === 'mostRecent' ? -1 : 1;

  const comments = await Comment.getFeedComments(
    { sort, popular },
    user.following,
    q.start,
    q.total
  );

  return comments;
};

const getIdFilter = async (q) => {
  let popular = q.filter === 'mostPopular';
  const sort = q.filter === 'mostRecent' ? -1 : 1;

  const comments = await Comment.getIdComments(
    { sort, popular },
    q.id,
    q.start,
    q.total
  );

  return comments;
};
commentsRouter.get('/total', async (req, res) => {
  const q = req.query;
  let total =
    'id' in q
      ? await Comment.find({
          $or: [
            { teacher: q.id },
            { lesson: q.id },
            { user: q.id },
            { club: q.id },
            { dorm: q.id },
            { campus: q.id },
            { question: q.id },
          ],
        }).countDocuments()
      : await Comment.find().countDocuments();
  res.json({ total });
});

commentsRouter.get('/feed/total', async (req, res) => {
  const user = req.user;
  const total = await Comment.find({
    $or: [
      { lesson: { $in: user.following } },
      { user: { $in: user.following } },
      { club: { $in: user.following } },
      { dorm: { $in: user.following } },
      { campus: { $in: user.following } },
      { question: { $in: user.following } },
    ],
  }).countDocuments();
  res.json({
    total,
  });
});

commentsRouter.get('/feed', async (req, res) => {
  const q = req.query;

  if (!'start' in q || !'total' in q || !'filter' in q) {
    return res.status(401).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 4',
    });
  }
  const user = req.user;

  let comments = await getCommentFeed(q, user);
  comments.map((c) => {
    if (c.isHidden == true) {
      c.comment = 'hidden';
    }
  });
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
    let comment = await Comment.findById(q.id);
    if (comment) {
      if (comment.commentStatus == 'hidden') {
        comment.comment = 'hidden';
      }
      return res.json(comment.toJSON());
    }
    return res.status(400).json({
      error: 'Yorum bulunamadı',
    });
  } else {
    comments = await Comment.find({});
  }
  comments.map((c) => {
    if (c.commentStatus == 'hidden') {
      c.comment = 'hidden';
    }
  });

  res.json(comments.map((c) => c.toJSON()));
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Çok kısa sürede çok yorum. Lütfen 15 dakika sonra tekrar deneyin.',
  },
});

commentsRouter.post('/', limiter, async (req, res) => {
  const body = req.body;

  if (!body.comment) {
    return res.status(400).json({
      error: 'Comment must be present',
    });
  } else if (
    !body.commentType ||
    (body.commentType !== 'lesson' &&
      body.commentType !== 'club' &&
      body.commentType !== 'dorm' &&
      body.commentType !== 'campus' &&
      body.commentType !== 'question')
  ) {
    return res.status(401).json({
      error: 'need valid commentType',
    });
  }

  if (body.commentType === 'lesson') {
    if (!body.teacherId) {
      return res.status(400).json({
        error: 'TeacherId must be present',
      });
    }
  }
  if (!body.typeId) {
    return res.status(400).json({
      error: 'typeId must be present',
    });
  }

  const user = req.user;
  let comment;
  if (body.commentType === 'lesson') {
    const teacher = await Teacher.findById(body.teacherId);
    const lesson = await Lesson.findById(body.typeId);
    const isTeacherRight = lesson.teacher.equals(teacher._id);

    if (!teacher || !lesson) {
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

    comment = new Comment({
      teacher: body.teacherId,
      lesson: body.typeId,
      user: user._id,
      comment: body.comment,
      date: new Date(),
      likes: [user._id],
      likesLength: 1,
      commentType: 'lesson',
    });
    await comment.save();
    user.comments = user.comments.concat(comment._id);
    teacher.comments = teacher.comments.concat(comment._id);
    lesson.comments = lesson.comments.concat(comment._id);
    await user.save();
    await teacher.save();
    await lesson.save();
  } else if (body.commentType === 'club') {
    const club = await Club.findById(body.typeId);

    if (!club || !user) {
      return res.status(400).json({
        error: 'Could not find the teacher,lesson,user',
      });
    }
    comment = new Comment({
      club: body.typeId,
      user: user._id,
      comment: body.comment,
      date: new Date(),
      likes: [user._id],
      likesLength: 1,

      commentType: 'club',
    });
    await comment.save();
    user.comments = user.comments.concat(comment._id);
    club.comments = club.comments.concat(comment._id);
    await user.save();
    await club.save();
  } else if (body.commentType === 'campus') {
    const campus = await Campus.findById(body.typeId);

    if (!campus || !user) {
      return res.status(400).json({
        error: 'Could not find the teacher,lesson,user',
      });
    }
    comment = new Comment({
      campus: body.typeId,
      user: user._id,
      comment: body.comment,
      date: new Date(),
      likes: [user._id],
      likesLength: 1,

      commentType: 'campus',
    });
    await comment.save();
    user.comments = user.comments.concat(comment._id);
    campus.comments = campus.comments.concat(comment._id);
    await user.save();
    await campus.save();
  } else if (body.commentType === 'dorm') {
    const dorm = await Dorm.findById(body.typeId);

    if (!dorm || !user) {
      return res.status(400).json({
        error: 'Could not find the teacher,lesson,user',
      });
    }
    comment = new Comment({
      dorm: body.typeId,
      user: user._id,
      comment: body.comment,
      date: new Date(),
      likes: [user._id],
      likesLength: 1,

      commentType: 'dorm',
    });
    await comment.save();
    user.comments = user.comments.concat(comment._id);
    dorm.comments = dorm.comments.concat(comment._id);
    await user.save();
    await dorm.save();
  } else if (body.commentType === 'question') {
    const question = await Question.findById(body.typeId);

    if (!question || !user) {
      return res.status(400).json({
        error: 'Could not find the teacher,lesson,user',
      });
    }
    comment = new Comment({
      question: body.typeId,
      user: user._id,
      comment: body.comment,
      date: new Date(),
      likesLength: 1,

      likes: [user._id],
      commentType: 'question',
    });
    await comment.save();
    user.comments = user.comments.concat(comment._id);
    question.comments = question.comments.concat(comment._id);
    question.commentsLength = question.commentsLength + 1;
    await user.save();
    await question.save();
  }

  const populatedComment = await Comment.findById(comment._id)
    .populate('user')
    .populate('teacher')
    .populate('lesson')
    .populate('club')
    .populate('dorm')
    .populate('campus')
    .populate('question');

  const followers = await User.find({ following: { $in: [body.typeId] } });
  for (let i = 0; i < followers.length; i++) {
    if (!followers[i].equals(user._id)) {
      let userCommentNotify = new Notification({
        target: followers[i]._id,
        notificationType: 'newComment',
        tool: populatedComment._id,
        responsible: user._id,
      });
      await userCommentNotify.save();
    }
  }

  res.json(populatedComment.toJSON());
});

commentsRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const comment = await Comment.findById(req.params.id);

  const user = req.user;

  if (!comment) {
    return res.status(400).json({
      error: 'Yorum bulunamadı.',
    });
  }
  if ('comment' in body) {
    const isUserHave = user.comments.some((c) => c.equals(req.params.id));
    if (!isUserHave) {
      return res.status(400).json({
        error: 'Yorumu düzenlemeye hakkınız yok.',
      });
    }
    comment.comment = body.comment;
  } else {
    const isLiked = comment.likes.some((u) => u.equals(user._id));

    if (isLiked) {
      comment.likes = comment.likes.filter((u) => !u.equals(user._id));
      comment.likesLength = comment.likesLength - 1;
      await Notification.findOneAndRemove({
        tool: comment._id,
        responsible: user._id,
        target: comment.user,
        notificationType: 'like',
      });
    } else {
      comment.likes = comment.likes.concat(user._id);
      let notify = await Notification.findOne({ tool: comment._id });
      comment.likesLength = comment.likesLength + 1;
      if (!notify) {
        notify = new Notification({
          tool: comment._id,
          responsible: user._id,
          target: comment.user,
          notificationType: 'like',
        });
        await notify.save();
      }
    }
  }
  await comment.save();
  const populatedComment = await Comment.findById(comment._id)
    .populate('user')
    .populate('teacher')
    .populate('lesson')
    .populate('club')
    .populate('dorm')
    .populate('campus')
    .populate('question');

  res.json(populatedComment.toJSON());
});

commentsRouter.delete('/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  const user = req.user;
  const isUserHave = user.comments.some((c) => c.equals(req.params.id));
  if (!comment) {
    return res.status(400).json({
      error: 'Yorum bulunamadı.',
    });
  } else if (!isUserHave) {
    return res.status(401).json({
      error: 'Yorumu silmeye hakkınız yok.',
    });
  }
  await Notification.findOneAndRemove({
    tool: comment._id,
    responsible: user._id,
    notificationType: 'newComment',
  });

  if (comment.commentType === 'lesson') {
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
  } else if (comment.commentType === 'club') {
    await Club.findOneAndUpdate(
      {
        comments: { $in: req.params.id },
      },
      { $pull: { comments: req.params.id } }
    );
  } else if (comment.commentType === 'dorm') {
    await Dorm.findOneAndUpdate(
      {
        comments: { $in: req.params.id },
      },
      { $pull: { comments: req.params.id } }
    );
  } else if (comment.commentType === 'campus') {
    await Campus.findOneAndUpdate(
      {
        comments: { $in: req.params.id },
      },
      { $pull: { comments: req.params.id } }
    );
  } else if (comment.commentType === 'question') {
    await Question.findOneAndUpdate(
      {
        comments: { $in: req.params.id },
      },
      { $pull: { comments: req.params.id } }
    );
  }

  await Comment.findByIdAndRemove(req.params.id);
  await User.findOneAndUpdate(
    {
      comments: { $in: req.params.id },
    },
    { $pull: { comments: req.params.id } }
  );

  res.status(204).end();
});

module.exports = commentsRouter;

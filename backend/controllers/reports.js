const reportsRouter = require('express').Router();
const User = require('../models/user');
const Comment = require('../models/comment');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const Club = require('../models/club');
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
    !body.reportedUser ||
    !body.reportedComment ||
    !body.reportedUserId ||
    !body.reportedCommentId ||
    !body.typeId ||
    !body.reportedCommentType ||
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
    reportedCommentType: body.reportedCommentType,
    reportedUserId: body.reportedUserId,
    reportedUser: body.reportedUser,
    teacherId: body.teacherId ? body.teacherId : null,
    typeId: body.typeId,
    user: user.username,
    userId: req.user._id,
  });
  await report.save();
  res.status(201).end();
});

reportsRouter.use(middleware.authAdmin);

reportsRouter.get('/all', async (req, res) => {
  const reports = await Report.find();
  res.json(reports.map((t) => t.toJSON()));
});

reportsRouter.put('/hide', async (req, res) => {
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
  if (report.isHideComment) {
    await Comment.findByIdAndUpdate(report.reportedCommentId, {
      isHidden: false,
    });
    report.isHideComment = false;
    await report.save();
  } else {
    await Comment.findByIdAndUpdate(report.reportedCommentId, {
      isHidden: true,
    });
    report.isHideComment = true;
    await report.save();
  }

  res.status(200).end();
});

reportsRouter.put('/destroy', async (req, res) => {
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
  if (report.isDestroyComment == true) {
    let user = await User.findById(report.reportedUserId);
    if (report.reportedCommentType === 'lesson') {
      const teacher = await Teacher.findById(report.teacherId);
      const lesson = await Lesson.findById(report.typeId);
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(report.reportedCommentId),
        teacher: report.teacherId,
        lesson: report.typeId,
        user: report.reportedUserId,
        comment: report.reportedComment,
        date: report.reportedCommentDate,
        likes: report.reportedCommentLikes,
        commentType: report.reportedCommentType,
      });
      await comment.save();
      user.comments = user.comments.concat(comment._id);
      teacher.comments = teacher.comments.concat(comment._id);
      lesson.comments = lesson.comments.concat(comment._id);
      await user.save();
      await teacher.save();
      await lesson.save();
    } else if (report.reportedCommentType === 'club') {
      const club = await Club.findById(report.typeId);
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(report.reportedCommentId),
        club: report.typeId,
        user: report.reportedUserId,
        comment: report.reportedComment,
        date: report.reportedCommentDate,
        likes: report.reportedCommentLikes,
        commentType: report.reportedCommentType,
      });
      await comment.save();
      user.comments = user.comments.concat(comment._id);
      club.comments = club.comments.concat(comment._id);
      await user.save();
      await club.save();
    } else if (report.reportedCommentType === 'dorm') {
      const dorm = await Dorm.findById(report.typeId);
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(report.reportedCommentId),
        dorm: report.typeId,
        user: report.reportedUserId,
        comment: report.reportedComment,
        date: report.reportedCommentDate,
        likes: report.reportedCommentLikes,
        commentType: report.reportedCommentType,
      });
      await comment.save();
      user.comments = user.comments.concat(comment._id);
      dorm.comments = dorm.comments.concat(comment._id);
      await user.save();
      await dorm.save();
    } else if (report.reportedCommentType === 'campus') {
      const campus = await Campus.findById(report.typeId);
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(report.reportedCommentId),
        campus: report.typeId,
        user: report.reportedUserId,
        comment: report.reportedComment,
        date: report.reportedCommentDate,
        likes: report.reportedCommentLikes,
        commentType: report.reportedCommentType,
      });
      await comment.save();
      user.comments = user.comments.concat(comment._id);
      campus.comments = campus.comments.concat(comment._id);
      await user.save();
      await campus.save();
    } else if (report.reportedCommentType === 'question') {
      const question = await Question.findById(report.typeId);
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(report.reportedCommentId),
        question: report.typeId,
        user: report.reportedUserId,
        comment: report.reportedComment,
        date: report.reportedCommentDate,
        likes: report.reportedCommentLikes,
        commentType: report.reportedCommentType,
      });
      await comment.save();
      user.comments = user.comments.concat(comment._id);
      question.comments = question.comments.concat(comment._id);
      await user.save();
      await question.save();
    }
  } else {
    await Comment.findByIdAndRemove(report.reportedCommentId);
    await User.findOneAndUpdate(
      {
        comments: { $in: report.reportedCommentId },
      },
      { $pull: { comments: report.reportedCommentId } }
    );
    if (report.reportedCommentType === 'lesson') {
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
    } else if (report.reportedCommentType === 'club') {
      await Club.findOneAndUpdate(
        {
          comments: { $in: report.reportedCommentId },
        },
        { $pull: { comments: report.reportedCommentId } }
      );
    } else if (report.reportedCommentType === 'campus') {
      await Campus.findOneAndUpdate(
        {
          comments: { $in: report.reportedCommentId },
        },
        { $pull: { comments: report.reportedCommentId } }
      );
    } else if (report.reportedCommentType === 'dorm') {
      await Dorm.findOneAndUpdate(
        {
          comments: { $in: report.reportedCommentId },
        },
        { $pull: { comments: report.reportedCommentId } }
      );
    } else if (report.reportedCommentType === 'question') {
      await Question.findOneAndUpdate(
        {
          comments: { $in: report.reportedCommentId },
        },
        { $pull: { comments: report.reportedCommentId } }
      );
    }
  }

  report.isDestroyComment = !report.isDestroyComment;
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

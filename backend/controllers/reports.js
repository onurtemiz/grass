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
      error: 'Eksik bilgi',
    });
  }

  const reportedUser = await User.findById(body.reportedUserId);
  const reportedComment = await Comment.findById(body.reportedCommentId);

  if (!reportedUser || !reportedComment) {
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
    if (report.reportedCommentType === 'lesson') {
      let user = await User.findById(report.reportedUserId);
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
      await addCommentTo(Club, report);
    } else if (report.reportedCommentType === 'dorm') {
      await addCommentTo(Dorm, report);
    } else if (report.reportedCommentType === 'campus') {
      await addCommentTo(Campus, report);
    } else if (report.reportedCommentType === 'question') {
      await addCommentTo(Question, report);
    }
  } else {
    await Comment.findByIdAndRemove(report.reportedCommentId);
    removeCommentFrom(User, report);
    if (report.reportedCommentType === 'lesson') {
      await removeCommentFrom(Lesson, report);
      await removeCommentFrom(Teacher, report);
    } else if (report.reportedCommentType === 'club') {
      await removeCommentFrom(Club, report);
    } else if (report.reportedCommentType === 'campus') {
      await removeCommentFrom(Campus, report);
    } else if (report.reportedCommentType === 'dorm') {
      await removeCommentFrom(Dorm, report);
    } else if (report.reportedCommentType === 'question') {
      await removeCommentFrom(Question, report);
    }
  }

  report.isDestroyComment = !report.isDestroyComment;
  await report.save();
  res.status(200).end();
});

const addCommentTo = async (doc, report) => {
  let user = await User.findById(report.reportedUserId);
  const type = await doc.findById(report.typeId);
  let commentObj = new createReportedCommentFrom(report);
  const comment = new Comment({
    ...commentObj,
  });
  await comment.save();
  user.comments = user.comments.concat(comment._id);
  type.comments = type.comments.concat(comment._id);
  await user.save();
  await type.save();
};

function createReportedCommentFrom(report) {
  if (report.reportedCommentType === 'question') {
    this.question = report.typeId;
  } else if (report.reportedCommentType === 'club') {
    this.club = report.typeId;
  } else if (report.reportedCommentType === 'lesson') {
    this.lesson = report.typeId;
  } else if (report.reportedCommentType === 'dorm') {
    this.dorm = report.typeId;
  } else if (report.reportedCommentType === 'campus') {
    this.campus = report.typeId;
  }
  this._id = new mongoose.Types.ObjectId(report.reportedCommentId);
  this.user = report.reportedUserId;
  this.comment = report.reportedComment;
  this.date = report.reportedCommentDate;
  this.likes = report.reportedCommentLikes;
  this.commentType = report.reportedCommentType;
}

const removeCommentFrom = async (doc, report) => {
  await doc.findOneAndUpdate(
    {
      comments: { $in: report.reportedCommentId },
    },
    { $pull: { comments: report.reportedCommentId } }
  );
};

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

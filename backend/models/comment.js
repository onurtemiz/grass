const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const commentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: { type: String, required: true },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  date: { type: Date, required: true, default: Date.now },
});

commentSchema.set(uniqueValidator);

commentSchema.statics.getLessonMostPopular = function (
  lessonId,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = this.aggregate([
    { $match: { lesson: lessonId } },
    {
      $project: {
        teacher: 1,
        lesson: 1,
        user: 1,
        comment: 1,
        likes: 1,
        date: 1,
        length: { $size: '$likes' },
      },
    },
    { $sort: { length: -1 } },
    { $skip: Number(start) },
    { $limit: Number(total) },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
  ]);
  comments = comments.map((c) => {
    c.user = {
      username: c.user[0].username,
      id: c.user[0]._id,
    };
    c.id = c._id.toString();
    delete c._id;
    delete c.__v;
  });
  return comments;
};

commentSchema.statics.getLessonRecentPast = function (
  lessonId,
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({ lesson: lessonId })
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user');
};

commentSchema.statics.getTeacherRecentPast = function (
  teacherId,
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({ teacher: teacherId })
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user');
};

commentSchema.statics.getTeacherMostPopular = function (
  teacherId,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = this.aggregate([
    { $match: { teacher: teacherId } },
    {
      $project: {
        teacher: 1,
        lesson: 1,
        user: 1,
        comment: 1,
        likes: 1,
        date: 1,
        length: { $size: '$likes' },
      },
    },
    { $sort: { length: -1 } },
    { $skip: Number(start) },
    { $limit: Number(total) },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
  ]);
  comments = comments.map((c) => {
    c.user = {
      username: c.user[0].username,
      id: c.user[0]._id,
    };
    c.id = c._id.toString();
    delete c._id;
    delete c.__v;
  });
  return comments;
};

commentSchema.statics.getUserMostPopular = function (
  userId,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = this.aggregate([
    { $match: { user: userId } },
    {
      $project: {
        teacher: 1,
        lesson: 1,
        user: 1,
        comment: 1,
        likes: 1,
        date: 1,
        length: { $size: '$likes' },
      },
    },
    { $sort: { length: -1 } },
    { $skip: Number(start) },
    { $limit: Number(total) },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
  ]);
  comments = comments.map((c) => {
    c.user = {
      username: c.user[0].username,
      id: c.user[0]._id,
    };
    c.id = c._id.toString();
    delete c._id;
    delete c.__v;
  });
  return comments;
};

commentSchema.statics.getUserRecentPast = function (
  userId,
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({ user: userId })
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user');
};

commentSchema.statics.getCommentMostPopular = function (
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = this.aggregate([
    {
      $project: {
        teacher: 1,
        lesson: 1,
        user: 1,
        comment: 1,
        likes: 1,
        date: 1,
        length: { $size: '$likes' },
      },
    },
    { $sort: { length: -1 } },
    { $skip: Number(start) },
    { $limit: Number(total) },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
  ]);
  comments = comments.map((c) => {
    c.user = {
      username: c.user[0].username,
      id: c.user[0]._id,
    };
    c.id = c._id.toString();
    delete c._id;
    delete c.__v;
  });
  return comments;
};

commentSchema.statics.getCommentRecentPast = function (
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find()
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user');
};

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);

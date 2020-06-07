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
  comment: { type: String, required: true, maxlength: 4000 },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  date: { type: Date, required: true, default: Date.now },
  isHidden: { type: Boolean, required: true, default: false },
});

commentSchema.set(uniqueValidator);

commentSchema.statics.getMostPopularFeed = async function (
  ids,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = await this.aggregate([
    {
      $match: {
        lesson: { $in: ids },
      },
    },
    {
      $project: {
        teacher: 1,
        lesson: 1,
        user: 1,
        comment: 1,
        likes: 1,
        date: 1,
        isHidden: 1,
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
  comments.map((c) => {
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

commentSchema.statics.getMostPopularById = async function (
  id,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = await this.aggregate([
    {
      $match: {
        $or: [
          { teacher: new mongoose.Types.ObjectId(id) },
          { lesson: new mongoose.Types.ObjectId(id) },
          { user: new mongoose.Types.ObjectId(id) },
        ],
      },
    },
    {
      $project: {
        teacher: 1,
        lesson: 1,
        user: 1,
        comment: 1,
        likes: 1,
        date: 1,
        isHidden: 1,
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
  comments.map((c) => {
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

commentSchema.statics.getMostPopular = async function (
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = await this.aggregate([
    {
      $project: {
        teacher: 1,
        lesson: 1,
        user: 1,
        comment: 1,
        likes: 1,
        date: 1,
        isHidden: 1,
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
  comments.map((c) => {
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

commentSchema.statics.getRecentPast = function (
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

commentSchema.statics.getRecentPastFeed = function (
  ids,
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({
    lesson: { $in: ids },
  })
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user');
};

commentSchema.statics.getRecentPastById = function (
  id,
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({
    $or: [{ teacher: id }, { lesson: id }, { user: id }],
  })
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

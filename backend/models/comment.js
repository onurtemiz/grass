const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const commentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
  campus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campus',
  },
  dorm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dorm',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
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
  commentStatus: { type: String, defaut: 'visible' },
  commentType: { type: String, required: true },
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
        commentStatus: { $ne: 'destroyed' },
        $or: [
          { lesson: { $in: ids } },
          { club: { $in: ids } },
          { campus: { $in: ids } },
          { dorm: { $in: ids } },
          { question: { $in: ids } },
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
        length: { $size: '$likes' },
        commentType: 1,
        club: 1,
        campus: 1,
        dorm: 1,
        question: 1,
        commentStatus: 1,
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
    {
      $lookup: {
        from: 'lessons',
        localField: 'lesson',
        foreignField: '_id',
        as: 'lesson',
      },
    },
    {
      $lookup: {
        from: 'teachers',
        localField: 'teacher',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    {
      $lookup: {
        from: 'clubs',
        localField: 'club',
        foreignField: '_id',
        as: 'club',
      },
    },
    {
      $lookup: {
        from: 'campus',
        localField: 'campus',
        foreignField: '_id',
        as: 'campus',
      },
    },
    {
      $lookup: {
        from: 'dorms',
        localField: 'dorm',
        foreignField: '_id',
        as: 'dorm',
      },
    },
    {
      $lookup: {
        from: 'questions',
        localField: 'question',
        foreignField: '_id',
        as: 'question',
      },
    },
  ]);
  comments = jsonComments(comments);

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
        commentStatus: { $ne: 'destroyed' },
        $or: [
          { teacher: new mongoose.Types.ObjectId(id) },
          { lesson: new mongoose.Types.ObjectId(id) },
          { user: new mongoose.Types.ObjectId(id) },
          { club: new mongoose.Types.ObjectId(id) },
          { dorm: new mongoose.Types.ObjectId(id) },
          { campus: new mongoose.Types.ObjectId(id) },
          { question: new mongoose.Types.ObjectId(id) },
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
        length: { $size: '$likes' },
        commentType: 1,
        club: 1,
        dorm: 1,
        campus: 1,
        question: 1,
        commentStatus: 1,
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
    {
      $lookup: {
        from: 'lessons',
        localField: 'lesson',
        foreignField: '_id',
        as: 'lesson',
      },
    },
    {
      $lookup: {
        from: 'teachers',
        localField: 'teacher',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    {
      $lookup: {
        from: 'clubs',
        localField: 'club',
        foreignField: '_id',
        as: 'club',
      },
    },
    {
      $lookup: {
        from: 'campus',
        localField: 'campus',
        foreignField: '_id',
        as: 'campus',
      },
    },
    {
      $lookup: {
        from: 'dorms',
        localField: 'dorm',
        foreignField: '_id',
        as: 'dorm',
      },
    },

    {
      $lookup: {
        from: 'questions',
        localField: 'question',
        foreignField: '_id',
        as: 'question',
      },
    },
  ]);
  comments = jsonComments(comments);

  return comments;
};

commentSchema.statics.getMostPopular = async function (
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  let comments = await this.aggregate([
    {
      $match: {
        commentStatus: { $ne: 'destroyed' },
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
        length: { $size: '$likes' },
        commentType: 1,
        club: 1,
        dorm: 1,
        campus: 1,
        question: 1,
        commentStatus: 1,
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
    {
      $lookup: {
        from: `lessons`,
        localField: 'lesson',
        foreignField: '_id',
        as: 'lesson',
      },
    },
    {
      $lookup: {
        from: 'teachers',
        localField: 'teacher',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    {
      $lookup: {
        from: 'clubs',
        localField: 'club',
        foreignField: '_id',
        as: 'club',
      },
    },
    {
      $lookup: {
        from: 'campus',
        localField: 'campus',
        foreignField: '_id',
        as: 'campus',
      },
    },
    {
      $lookup: {
        from: 'dorms',
        localField: 'dorm',
        foreignField: '_id',
        as: 'dorm',
      },
    },

    {
      $lookup: {
        from: 'questions',
        localField: 'question',
        foreignField: '_id',
        as: 'question',
      },
    },
  ]);
  comments = jsonComments(comments);
  return comments;
};

const jsonComments = (comments) => {
  comments.map((c) => {
    c.user = {
      username: c.user[0].username,
      id: c.user[0]._id,
    };
    if (c.commentType === 'lesson') {
      c.lesson = {
        areaCode: c.lesson[0].areaCode,
        digitCode: c.lesson[0].digitCode,
        name: c.lesson[0].name,
        parentName: c.lesson[0].parentName,
        id: c.lesson[0]._id,
      };
      c.teacher = {
        name: c.teacher[0].name,
        id: c.teacher[0]._id,
      };
    } else if (c.commentType === 'club') {
      c.club = {
        fullName: c.club[0].fullName,
        id: c.club[0]._id,
        name: c.club[0].name,
      };
    } else if (c.commentType === 'dorm') {
      c.dorm = {
        name: c.dorm[0].name,
        id: c.dorm[0]._id,
      };
    } else if (c.commentType === 'campus') {
      c.campus = {
        name: c.campus[0].name,
        id: c.campus[0]._id,
      };
    } else if (c.commentType === 'question') {
      c.question = {
        question: c.question[0].question,
        description: c.question[0].description,
        id: c.question[0]._id,
      };
    }
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
  return this.find({ commentStatus: { $ne: 'destroyed' } })
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user')
    .populate('lesson')
    .populate('club')
    .populate('teacher')
    .populate('campus')
    .populate('dorm')
    .populate('question');
};

commentSchema.statics.getRecentPastFeed = function (
  ids,
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({
    commentStatus: { $ne: 'destroyed' },
    $or: [
      { lesson: { $in: ids } },
      { club: { $in: ids } },
      { campus: { $in: ids } },
      { dorm: { $in: ids } },
      { question: { $in: ids } },
    ],
  })
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user')
    .populate('lesson')
    .populate('club')
    .populate('teacher')
    .populate('campus')
    .populate('dorm')
    .populate('question');
};

commentSchema.statics.getRecentPastById = function (
  id,
  sort,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({
    commentStatus: { $ne: 'destroyed' },
    $or: [
      { teacher: id },
      { lesson: id },
      { user: id },
      { club: id },
      { campus: id },
      { dorm: id },
      { question: id },
    ],
  })
    .sort({ _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate('user')
    .populate('lesson')
    .populate('club')
    .populate('teacher')
    .populate('campus')
    .populate('dorm')
    .populate('question');
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

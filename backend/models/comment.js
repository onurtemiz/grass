const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);
const moment = require('moment');
const utils = require('../utils/utils');
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
  likesLength: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  commentStatus: { type: String, defaut: 'visible' },
  commentType: { type: String, required: true },
  recommend: { type: Boolean, required: true, default: true },
  edited: { type: Boolean, default: false },
});

commentSchema.set(uniqueValidator);

commentSchema.statics.getSquareComments = async function (
  { popular, sort },
  start = 0,
  total = Number.MAX_SAFE_INTEGER,
  daySort
) {
  let dayFilter = utils.getDayFilter(daySort);
  let searchParams = {
    date: dayFilter,
    commentStatus: { $ne: 'destroyed' },
  };
  let comments = await this.find(searchParams)
    .sort(popular ? { likesLength: -1 } : { _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate({
      path: 'user',
      select: ['username', 'id', 'userStatus', 'iconName'],
    })

    .populate({
      path: 'lesson',
      select: ['areaCode', 'digitCode', 'name', 'parentName'],
    })
    .populate({ path: 'club', select: ['name'] })
    .populate({ path: 'campus', select: ['name'] })
    .populate({ path: 'dorm', select: ['name'] })
    .populate({ path: 'question', select: ['id', 'question'] });
  let all = await this.find(searchParams).countDocuments();
  return { comments, total: all };
};

commentSchema.statics.getFeedComments = async function (
  { sort, popular },
  ids,

  start = 0,
  total = Number.MAX_SAFE_INTEGER,
  daySort
) {
  let dayFilter = utils.getDayFilter(daySort);
  let searchParams = {
    date: dayFilter,

    commentStatus: { $ne: 'destroyed' },

    $or: [
      { lesson: { $in: ids } },
      { club: { $in: ids } },
      { dorm: { $in: ids } },
      { campus: { $in: ids } },
      { question: { $in: ids } },
    ],
  };
  let comments = await this.find(searchParams)
    .sort(popular ? { likesLength: -1 } : { _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate({
      path: 'user',
      select: ['username', 'id', 'userStatus', 'iconName'],
    })

    .populate({
      path: 'lesson',
      select: ['areaCode', 'digitCode', 'name', 'parentName'],
    })
    .populate({ path: 'club', select: ['name'] })
    .populate({ path: 'campus', select: ['name'] })
    .populate({ path: 'dorm', select: ['name'] })
    .populate({ path: 'question', select: ['id', 'question'] });

  const all = await this.find(searchParams).countDocuments();
  return { comments, total: all };
};

commentSchema.statics.getIdComments = async function (
  { sort, popular },
  id,
  start = 0,
  total = Number.MAX_SAFE_INTEGER,
  daySort
) {
  let dayFilter = utils.getDayFilter(daySort);
  let searchParams = {
    date: dayFilter,

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
  };
  let comments = await this.find(searchParams)
    .sort(popular ? { likesLength: -1 } : { _id: sort })
    .skip(Number(start))
    .limit(Number(total))
    .populate({
      path: 'user',
      select: ['username', 'id', 'userStatus', 'iconName'],
    })
    .populate({
      path: 'lesson',
      select: ['areaCode', 'digitCode', 'name', 'parentName'],
    })
    .populate({ path: 'club', select: ['name'] })
    .populate({ path: 'campus', select: ['name'] })
    .populate({ path: 'dorm', select: ['name'] })
    .populate({ path: 'question', select: ['id', 'question'] });
  let all = await this.find(searchParams).countDocuments();
  return { comments, total: all };
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

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const lessonSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  areaCode: { type: String, required: true },
  digitCode: { type: String, required: true },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  credits: { type: String },
  ects: { type: String },
  parentName: { type: String, required: true },
});

lessonSchema.set(uniqueValidator);

lessonSchema.statics.getFilteredInf = function (search, start, total) {
  return this.find({
    name: { $regex: search, $options: 'i' },
  })
    .sort({ name: 1 })
    .skip(Number(start))
    .limit(Number(total))
    .populate('comments');
};

lessonSchema.statics.getFilteredAllInf = function (
  search = '',
  teachersId,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  try {
    return this.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { teacher: { $in: teachersId } },
      ],
    })
      .sort({ name: 1 })
      .skip(Number(start))
      .limit(Number(total));
  } catch (e) {}
};

lessonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Lesson', lessonSchema);

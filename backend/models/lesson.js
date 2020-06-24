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
  sectionCode: [{ type: String }],
  name: { type: String, required: true },
  parentName: { type: String, required: true },
});

lessonSchema.set(uniqueValidator);

lessonSchema.statics.getFilteredInf = function (search, start, total) {
  return this.find({
    name: { $regex: search, $options: 'i' },
  })
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
      .skip(Number(start))
      .limit(Number(total));
  } catch (e) {
    console.log('e', e);
  }
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

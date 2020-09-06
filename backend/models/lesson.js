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
  active: { type: Boolean, default: false },
  sections: [{ type: String }],
});

lessonSchema.set(uniqueValidator);

lessonSchema.statics.getFilteredInf = async function (search, start, total) {
  const searchParams = {
    $or: [
      {name: { $regex: search.toUpperCase() ,$options: 'i'}},
      {name: { $regex: search.toLocaleUpperCase('tr-TR') ,$options: 'i'}},
    ]
  }
  const lessons =  await this.find(searchParams)
    .sort({ name: 1 })
    .skip(Number(start))
    .limit(Number(total))
    .populate('comments');
    const t =  await this.find(searchParams).countDocuments();
    return{lessons,total:t}
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
        {name: { $regex: search.toUpperCase() ,$options: 'i'}},
        {name: { $regex: search.toLocaleUpperCase('tr-TR') ,$options: 'i'}},
        { teacher: { $in: teachersId } }
      ]
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

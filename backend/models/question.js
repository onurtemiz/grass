const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const questionSchema = new mongoose.Schema({
  question: { type: String, unique: true, required: true, maxlength: 150 },
  description: { type: String, required: true, maxlength: 1000 },
  isApproved: { type: Boolean, default: false },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  commentsLength: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

questionSchema.set(uniqueValidator);

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.user;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

questionSchema.statics.getFilteredInf = function (
  { sort, popular },
  search,
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  return this.find({
    $and: [
      { isApproved: true },
      {$or: [
        {question: { $regex: search.toUpperCase() ,$options: 'i'}},
        {question: { $regex: search.toLocaleUpperCase('tr-TR') ,$options: 'i'}},
      ]}
    ],
  })
    .sort(popular ? { date: sort } : { totalLength: -1 })
    .skip(Number(start))
    .limit(Number(total));
};

module.exports = mongoose.model('Question', questionSchema);

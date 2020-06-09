const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const clubSchema = new mongoose.Schema({
  shortName: { type: String, unique: true, required: true },
  fullName: { type: String, unique: true, required: true },
  description: { type: String, default: '' },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

clubSchema.set(uniqueValidator);

clubSchema.statics.getFilteredInf = function (
  search = '',
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  try {
    return this.find({
      $or: [
        { fullName: { $regex: search, $options: 'i' } },
        { shortName: { $regex: search, $options: 'i' } },
      ],
    })
      .skip(Number(start))
      .limit(Number(total));
  } catch (e) {
    console.log('e', e);
  }
};

clubSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Club', clubSchema);

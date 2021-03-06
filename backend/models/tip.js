const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const tipSchema = new mongoose.Schema({
  tip: { type: String, unique: true, required: true, maxlength: 250 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAnonim: { type: Boolean, required: true },
  isApproved: { type: Boolean, required: true, default: false },
  date: { type: Date, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  likesLength: { type: Number, default: 0 },
});

tipSchema.set(uniqueValidator);

tipSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.user;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

tipSchema.statics.getFilteredInf = function (
  { sort, popular },
  start = 0,
  total = Number.MAX_SAFE_INTEGER
) {
  console.log(popular);
  return this.find({ isApproved: true }).sort(
    popular ? { _id: -1 } : { date: sort }
  );
  // .skip(Number(start))
  // .limit(Number(total));
};

module.exports = mongoose.model('Tip', tipSchema);

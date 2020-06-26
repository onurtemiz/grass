const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const tipSchema = new mongoose.Schema({
  tip: { type: String, unique: true, required: true, maxlength: 150 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAnonim: { type: Boolean, required: true },
  isApproved: { type: Boolean, required: true, default: false },
  date: { type: Date, default: Date.now },
});

tipSchema.set(uniqueValidator);

tipSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Tip', tipSchema);

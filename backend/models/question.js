const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const questionSchema = new mongoose.Schema({
  question: { type: String, unique: true, required: true, maxlength: 42 },
  description: { type: String, required: true, maxlength: 1000 },
  isApproved: { type: Boolean, default: false },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  date: { type: Date, default: Date.now },
});

questionSchema.set(uniqueValidator);

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Question', questionSchema);

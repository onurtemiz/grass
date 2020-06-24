const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reportedCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },
  reportedComment: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  reportedUser: {
    type: String,
    required: true,
  },

  isHate: { type: Boolean, required: true, default: false },
  isSpam: { type: Boolean, required: true, default: false },
  isCurse: { type: Boolean, required: true, default: false },
  extra: { type: String, default: '', maxlength: 1000 },
});

reportSchema.set(uniqueValidator);

reportSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Report', reportSchema);

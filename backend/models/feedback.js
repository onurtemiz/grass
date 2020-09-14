const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const feedbackSchema = new mongoose.Schema({
  topic: { type: String, required: true, maxlength: 250 },
  description: { type: String, required: true, maxlength: 10000 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

feedbackSchema.set(uniqueValidator);

feedbackSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);

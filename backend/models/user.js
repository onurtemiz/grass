const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

userSchema.set(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);

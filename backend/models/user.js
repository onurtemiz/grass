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
  userStatus: { type: String, default: 'user' },
  iconName: { type: String, default: '' },
  sawModal: { type: Boolean, default: false },
  achievements: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      comment1: false,
      comment5: false,
      comment10: false,
      comment20: false,
      comment50: false,
      comment100: false,
      pati1: false,
      pati10: false,
      pati50: false,
      pati100: false,
      pati200: false,
      pati500: false,
      pati1000: false,
      tip1: false,
      tip10: false,
      question1: false,
      question10: false,
      betaTester: false,
      mod: false,
      admin: false,
    },
  },
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

userSchema.statics.getTotalLike = async function (username) {
  const user = await this.findOne({ username }).populate({
    path: 'comments',
    populate: [{ path: 'lesson' }],
  });
  let totalLike = {
    username: user.username,
    userStatus: user.userStatus,
    id: user._id,
    iconName: user.iconName,
    totalLikes:
      user.comments.length !== 0
        ? user.comments
            .map((c) =>
              c.likes.length !== 0
                ? c.likes.reduce(
                    (total, l) => (user.equals(l) ? total : (total += 1)),
                    0
                  )
                : 0
            )
            .reduce((total, c) => total + c)
        : 0,
  };

  return totalLike;
};

module.exports = mongoose.model('User', userSchema);

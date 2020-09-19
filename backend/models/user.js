const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const randomstring = require('randomstring');
const Tip = require('./tip');
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verifyToken: { type: String, default: randomstring.generate() },
  passwordVerification: { type: String, default: randomstring.generate() },
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
  semester: { type: String },
  departments: [{ type: String }],
  quotaNotifications: { type: mongoose.Schema.Types.Mixed },
  followingCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
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
      pati20: false,
      pati50: false,
      pati100: false,
      pati200: false,
      pati500: false,
      pati1000: false,
      tip1: false,
      tip5: false,
      tip10: false,
      question1: false,
      question5: false,
      question10: false,
      patreon: false,
      betaTester: false,
      mod: false,
      admin: false,
    },
  },
  created: { type: Date, default: Date.now() },
  planner: { type: mongoose.Schema.Types.Mixed },
});

userSchema.set(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.verified;
    delete returnedObject.verifyToken;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.passwordVerification;
  },
});

userSchema.statics.getTotalLike = async function (username) {
  const user = await this.findOne({ username }).populate({
    path: 'comments',
    populate: [{ path: 'lesson' }],
  });
  const tips = await Tip.find({
    $and: [{ user: user._id }, { isApproved: true }, { isAnonim: false }],
  });
  const totalTipLikes = tips.reduce((total, tip) => total + tip.likesLength, 0);
  const totalCommentLikes = user.comments
    .map((c) =>
      c.likes.reduce((total, l) => (user.equals(l) ? total : (total += 1)), 0)
    )
    .reduce((total, c) => total + c, 0);
  let totalLike = {
    username: user.username,
    userStatus: user.userStatus,
    id: user._id,
    iconName: user.iconName,
    totalLikes: totalTipLikes + totalCommentLikes,
  };

  return totalLike;
};

module.exports = mongoose.model('User', userSchema);

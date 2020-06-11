const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const notificationSchema = new mongoose.Schema({
  notificationType: { type: String, required: true },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: { type: Date, default: Date.now },
});

notificationSchema.set(uniqueValidator);

notificationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Notification', notificationSchema);

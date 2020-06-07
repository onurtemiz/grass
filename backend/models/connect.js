const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const connectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  socketId: { type: String, required: true },
});

module.exports = mongoose.model('Connect', connectSchema);

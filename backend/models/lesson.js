const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const lessonSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  areaCode: { type: String, required: true },
  digitCode: { type: Number, required: true },
  sectionCode: { type: String, required: true },
});

lessonSchema.set(uniqueValidator);

lessonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    returnedObject.fullName = `${returnedObject.areaCode}${returnedObject.digitCode}.${returnedObject.sectionCode}`;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Lesson', lessonSchema);

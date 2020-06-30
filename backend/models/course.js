const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const courseSchema = new mongoose.Schema({
  areaCode: { type: String, required: true },
  digitCode: { type: String, required: true },
  sectionCode: { type: String, required: true },
  name: { type: String, required: true },
  hours: [{ type: Number }],
  days: [{ type: String }],
  credits: { type: String, required: true },
  ects: { type: String, required: true },
  fullName: { type: String, required: true },
  parentName: { type: String, required: true },
});

courseSchema.set(uniqueValidator);

courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Course', courseSchema);

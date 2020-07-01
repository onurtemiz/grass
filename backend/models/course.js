const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const courseSchema = new mongoose.Schema({
  areaCode: { type: String, required: true },
  digitCode: { type: String, required: true },
  sectionCode: { type: String, required: true },
  name: { type: String, required: true },
  hours: [{ type: Number }],
  days: [{ type: mongoose.Schema.Types.Mixed }],
  credits: { type: String, required: true },
  ects: { type: String, required: true },
  fullName: { type: String, required: true },
  parentName: { type: String, required: true },
  cellIds: [{ type: Number }],
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

courseSchema.statics.getSearchResult = function (search) {
  return this.find({
    $and: [
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  })
    .sort({ name: 1 })
    .limit(10);
};

courseSchema.statics.getTSearchResult = function (search, times) {
  return this.find({
    $and: [
      ...times,
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  })
    .sort({ name: 1 })
    .limit(50);
};

courseSchema.statics.getTNSearchResult = function (search, times, ntimes) {
  return this.find({
    $and: [
      ...times,
      ...ntimes,
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  })
    .sort({ name: 1 })
    .limit(50);
};

courseSchema.statics.getNSearchResult = function (search, ntimes) {
  return this.find({
    $and: [
      ...ntimes,
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  })
    .sort({ name: 1 })
    .limit(50);
};

module.exports = mongoose.model('Course', courseSchema);

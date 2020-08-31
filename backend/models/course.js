const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);

const courseSchema = new mongoose.Schema({
  areaCode: { type: String, required: true },
  digitCode: { type: String, required: true },
  sectionCode: { type: String, required: true },
  name: { type: String, required: true },
  credits: { type: String },
  ects: { type: String },
  fullName: { type: String },
  parentName: { type: String },
  hours: [{ type: Number }],
  days: [{ type: Number }],
  cellIds: [{ type: Number }],
  rooms: [{ type: String }],
  syl: { type: String },
  course: { type: String },
  exam: { type: String },
  sl: { type: String },
  req: { type: String },
  dep: { type: String },
  quota: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastChange: { type: Date, default: Date.now() },
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

courseSchema.statics.getSearchResult = async function (search, start, total) {
  let searchParams = {
    $and: [
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  };
  let courses = await this.find(searchParams)
    .sort({ name: 1 })
    .skip(Number(start))
    .limit(Number(total));
  let all = await this.find(searchParams).countDocuments();
  return { courses: courses.map((c) => c.toJSON()), total: all };
};

courseSchema.statics.getTSearchResult = async function (
  search,
  start,
  total,
  times
) {
  let searchParams = {
    $and: [
      ...times,
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  };
  let courses = await this.find(searchParams)
    .sort({ name: 1 })
    .skip(Number(start))
    .limit(Number(total));
  let all = await this.find(searchParams).countDocuments();
  return { courses: courses.map((c) => c.toJSON()), total: all };
};

courseSchema.statics.getTNSearchResult = async function (
  search,
  start,
  total,
  times,
  ntimes
) {
  let searchParams = {
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
  };
  let courses = await this.find(searchParams)
    .sort({ name: 1 })
    .skip(Number(start))
    .limit(Number(total));
  let all = await this.find(searchParams).countDocuments();
  return { courses: courses.map((c) => c.toJSON()), total: all };
};

courseSchema.statics.getNSearchResult = async function (
  search,
  start,
  total,
  ntimes
) {
  let searchParams = {
    $and: [
      ...ntimes,
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } },
        ],
      },
    ],
  };
  let courses = await this.find(searchParams)
    .sort({ name: 1 })
    .skip(Number(start))
    .limit(Number(total));

  let all = await this.find(searchParams).countDocuments();
  return { courses: courses.map((c) => c.toJSON()), total: all };
};

module.exports = mongoose.model('Course', courseSchema);

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const utils = require('../utils/utils');
mongoose.set('useFindAndModify', false);

const eventsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

eventsSchema.set(uniqueValidator);
eventsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.user;
    delete returnedObject.__v;
  },
});

eventsSchema.statics.getInfEvent = async function (
  search,
  start = 0,
  total = Number.MAX_SAFE_INTEGER,
  daySort
) {
  let dayFilter = utils.getDayFilterFuture(daySort);
  let searchParams = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { subTitle: { $regex: search, $options: 'i' } },
    ],
    date: dayFilter,
    approved: true,
  };
  let events = await this.find(searchParams)
    .sort({ _id: -1 })
    .skip(Number(start))
    .limit(Number(total));
  let all = await this.find(searchParams).countDocuments();
  console.log(events);
  return { events, total: all };
};

module.exports = mongoose.model('Event', eventsSchema);

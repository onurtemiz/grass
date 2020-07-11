const Event = require('../models/event');
const middleware = require('../utils/middleware');
const eventsRouter = require('express').Router();

eventsRouter.post('/add_event', async (req, res) => {
  const user = req.user;
  const body = req.body;
  if (!body.date || !body.title || !body.subTitle || !body.description) {
    return res.json({ error: 'Eksik bilgi' });
  }
  const event = new Event({
    user: user.id,
    ...body,
  });
  await event.save();
  res.end();
});

eventsRouter.get('/inf', async (req, res) => {
  const q = req.query;
  if (
    !('start' in q) ||
    !('total' in q) ||
    !('day_sort' in q) ||
    !('filter' in q)
  ) {
    return res.json({ error: 'Eksik bilgi' });
  }
  const search = q.filter ? q.filter : '';
  let data = await Event.getInfEvent(search, q.start, q.total, q.day_sort);
  let events = data.events.map((e) => e.toJSON());
  res.json({ events, total: data.total });
});

eventsRouter.use(middleware.authAdmin);

eventsRouter.put('/approve_event', async (req, res) => {
  const q = req.query;
  if (!('id' in q)) {
    return res.json({ error: 'Id Eksik' });
  }
  await Event.findByIdAndUpdate(q.id, { approved: true });
  res.end();
});

eventsRouter.delete('/remove_event', async (req, res) => {
  const q = req.query;
  if (!('id' in q)) {
    return res.json({ error: 'Id Eksik' });
  }
  await Event.findByIdAndRemove(q.id);
  res.status(204).end();
});

eventsRouter.get('/all_events', async (req, res) => {
  const events = await Event.find();
  res.json(events.map((e) => e.toJSON()));
});

module.exports = eventsRouter;

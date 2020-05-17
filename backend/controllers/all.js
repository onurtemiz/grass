const allRouter = require('express').Router();
const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');

allRouter.get('/total', async (req, res) => {
  const lessons = await Lesson.find({
    fullName: { $regex: req.query.search, $options: 'i' },
  });
  const lessonId = lessons.map((l) => l.id);
  const total = await Teacher.find({
    $or: [
      { name: { $regex: req.query.search, $options: 'i' } },
      { lessons: { $in: lessonId } },
    ],
  }).countDocuments();
  res.json({ total: total });
});

allRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!('start' in q) || !('total' in q)) {
    res.status(400).json({
      error: 'should have start or total',
    });
  }
  const search = q.search ? q.search : '';
  const lessons = await Lesson.find({
    fullName: { $regex: search, $options: 'i' },
  });
  const lessonId = lessons.map((l) => l.id);
  const teachers = await Teacher.find({
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { lessons: { $in: lessonId } },
    ],
  })
    .skip(Number(req.query.start))
    .limit(Number(req.query.total))
    .populate('lessons');
  res.json(teachers.map((t) => t.toJSON()));
});

module.exports = allRouter;

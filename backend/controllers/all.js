const allRouter = require('express').Router();
const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');

allRouter.get('/total', async (req, res) => {
  const search = req.query.search ? req.query.search : '';

  const teachers = await Teacher.find({
    name: { $regex: search, $options: 'i' },
  });
  const teachersId = teachers.map((t) => t.id);
  const lessonsTotal = await Lesson.find({
    $or: [
      { fullName: { $regex: search, $options: 'i' } },
      { teacher: { $in: teachersId } },
    ],
  }).countDocuments();

  res.json({ total: lessonsTotal });
});

allRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!('start' in q) || !('total' in q)) {
    res.status(400).json({
      error: 'should have start or total',
    });
  }
  const search = q.search ? q.search : '';
  const teachers = await Teacher.find({
    name: { $regex: search, $options: 'i' },
  });
  const teachersId = teachers.map((t) => t.id);
  const lessons = await Lesson.find({
    $or: [
      { fullName: { $regex: search, $options: 'i' } },
      { teacher: { $in: teachersId } },
    ],
  })
    .skip(Number(req.query.start))
    .limit(Number(req.query.total))
    .populate('teacher');
  res.json(lessons.map((l) => l.toJSON()));
});

module.exports = allRouter;

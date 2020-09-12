const teachersRouter = require('express').Router();
const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');
// const jsonData = require('../2018-2019-2.json');

teachersRouter.get('/total', async (req, res) => {
  const search = req.query.search ? req.query.search : '';

  const total = await Teacher.find({
    $or: [
      { name: { $regex: search.toUpperCase(), $options: 'i' } },
      { name: { $regex: search.toLocaleUpperCase('tr-TR'), $options: 'i' } },
    ],
  }).countDocuments();

  res.json({ total: total });
});

teachersRouter.get('/:name', async (req, res) => {
  const teacher = await Teacher.findOne({
    name: req.params.name,
  }).populate({
    path: 'lessons',
    select: ['parentName', 'id', 'name', 'active', 'areaCode', 'digitCode'],
  });
  return res.json(teacher.toJSON());
});

teachersRouter.get('/', async (req, res) => {
  const q = req.query;
  const search = q.search ? q.search : '';
  if (!'start' in q || !'total' in q) {
    return res.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 44',
    });
  }
  const teachers = await Teacher.getFilteredInf(search, q.start, q.total);

  res.json(teachers.map((t) => t.toJSON()));
});

module.exports = teachersRouter;

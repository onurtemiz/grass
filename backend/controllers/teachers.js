const teachersRouter = require('express').Router();
const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');
const jsonData = require('../2018-2019-2.json');

teachersRouter.get('/', async (req, res) => {
  if ('name' in req.query) {
    const teacher = await Teacher.findOne({ name: req.query.name }).populate(
      'lessons'
    );
    res.json(teacher.toJSON());
  } else if (
    !isNaN(Number(req.query.start)) &&
    !isNaN(Number(req.query.total))
  ) {
    const users = await Teacher.find({})
      .skip(Number(req.query.start))
      .limit(Number(req.query.total))
      .populate('lessons');

    res.json(users.map((u) => u.toJSON()));
  } else {
    const users = await Teacher.find({}).populate('lessons');
    res.json(users.map((u) => u.toJSON()));
  }
});

teachersRouter.get('/total', async (req, res) => {
  const total = await Teacher.countDocuments();
  res.json({ total: total });
});

teachersRouter.get('/delete5', async (req, res) => {
  const teachers = await Teacher.find({});
  for (i = 0; i < teachers.length; i++) {
    lessons = teachers[i].lessons;
    if (teachers[i].lessons[0] === undefined) {
      console.log(`${teachers[i]} deleted`);
      await Teacher.deleteOne({ _id: teachers[i]._id });
    }
  }
  res.status(200).json({
    status: 'done',
  });
});
teachersRouter.get('/loadjson', async (req, res) => {
  const lessons = Object.keys(jsonData);
  for (i = 0; i < lessons.length; i++) {
    let teacher = jsonData[lessons[i]].instructor.toLowerCase();
    let teacherExists = await Teacher.exists({ name: teacher });
    if (!teacherExists) {
      let newTeacher = new Teacher({
        name: teacher,
      });
      console.log('teacher', teacher);
      await newTeacher.save();
    }
  }
  res.status(200).json({
    status: 'done',
  });
});

module.exports = teachersRouter;

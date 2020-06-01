const teachersRouter = require('express').Router();
const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');
// const jsonData = require('../2018-2019-2.json');

teachersRouter.get('/:name', async (req, res) => {
  const teacher = await Teacher.findOne({
    name: req.params.name,
  })
    .populate('lessons')
    .populate('comments');
  console.log('teacher', teacher);
  return res.json(teacher.toJSON());
});

teachersRouter.get('/', async (req, res) => {
  const q = req.query;
  const search = q.search ? q.search : '';
  const teachers =
    'start' in q && 'total' in q
      ? await Teacher.getFilteredInf(search, q.start, q.total)
      : await Teacher.find({}).populate('lessons').populate('comments');

  res.json(teachers.map((t) => t.toJSON()));
});
teachersRouter.get('/total', async (req, res) => {
  const search = req.query.search ? req.query.search : '';
  const total = await Teacher.find({
    name: { $regex: search, $options: 'i' },
  }).countDocuments();
  res.json({ total: total });
});

// teachersRouter.get('/delete5', async (req, res) => {
//   const teachers = await Teacher.find({});
//   for (i = 0; i < teachers.length; i++) {
//     lessons = teachers[i].lessons;
//     if (teachers[i].lessons[0] === undefined) {
//       console.log(`${teachers[i]} deleted`);
//       await Teacher.deleteOne({ _id: teachers[i]._id });
//     }
//   }
//   res.status(200).json({
//     status: 'done',
//   });
// });

teachersRouter.post('/', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'name should be present',
    });
  }
  const body = req.body;
  let teacher = await Teacher.findOne({ name: body.name });
  if (teacher) {
    return res.status(400).json({
      error: 'teacher present',
    });
  }
  teacher = new Teacher({
    name: body.name,
  });
  await teacher.save();
  res.status(201).json(teacher.toJSON());
});
// teachersRouter.get('/loadjson', async (req, res) => {
//   const lessons = Object.keys(jsonData);
//   for (i = 0; i < lessons.length; i++) {
//     let teacher = jsonData[lessons[i]].instructor;
//     let teacherExists = await Teacher.exists({ name: teacher });
//     if (!teacherExists) {
//       let newTeacher = new Teacher({
//         name: teacher,
//       });
//       console.log('teacher', teacher);
//       await newTeacher.save();
//     }
//   }
//   res.status(200).json({
//     status: 'done',
//   });
// });

module.exports = teachersRouter;

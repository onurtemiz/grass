const lessonsRouter = require('express').Router();
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
// const jsonData = require('../2018-2019-2.json');

// lessonsRouter.get('/loadjson/', async (req, res) => {
//   let re = new RegExp('([a-zA-Z]+)([0-9]+).([0-9]+)');
//   let firstD = new RegExp('([1-4])[0-9][0-9].');
//   const lessons = Object.keys(jsonData);

//   for (i = 0; i < lessons.length; i++) {
//     let f = firstD.exec(jsonData[lessons[i]].code);
//     if (f !== null) {
//       let result = re.exec(jsonData[lessons[i]].code);
//       let areaCode = result[1].toLowerCase();
//       let digitCode = result[2];
//       let sectionCode = result[3];
//       let teacher = jsonData[lessons[i]].instructor;
//       let teacherDB = await Teacher.findOne({ name: teacher });
//       let lessonExists = await Lesson.findOne({
//         areaCode: areaCode,
//         digitCode: digitCode,
//         teacher: teacherDB._id,
//       });
//       let lesson =
//         lessonExists === null
//           ? new Lesson({
//               areaCode: areaCode,
//               digitCode: digitCode,
//               sectionCode: [],
//               fullName: `${areaCode}${digitCode}`,
//               teacher: teacherDB._id,
//             })
//           : lessonExists;
//       lesson.sectionCode = lesson.sectionCode.concat(sectionCode);
//       if (lessonExists === null)
//         teacherDB.lessons = teacherDB.lessons.concat(lesson._id);
//       console.log(
//         `teacher ${i}: ${teacher} ${areaCode}${digitCode}.${sectionCode}`
//       );
//       await teacherDB.save();
//       await lesson.save();
//     } else {
//       console.log('atlandi', jsonData[lessons[i]].code);
//     }
//   }
//   res.status(200).json({
//     status: 'done',
//   });
// });

lessonsRouter.get('/total', async (req, res) => {
  const search = req.query.search ? req.query.search : '';
  const total = await Lesson.find({
    fullName: { $regex: search, $options: 'i' },
  }).countDocuments();
  res.json({ total: total });
});

const getSingleLesson = async (req) => {
  var ObjectId = require('mongoose').Types.ObjectId;
  const q = req.query;
  const teacher = await Teacher.findOne({ name: q.teacherName });
  const lesson = await Lesson.findOne({
    areaCode: q.areaCode,
    digitCode: q.digitCode,
    teacher: teacher._id,
  })
    .populate('teacher')
    .populate('comments');
  return lesson.toJSON();
};

lessonsRouter.get('/', async (req, res) => {
  const q = req.query;
  if ('areaCode' in q && 'digitCode' in q && 'teacherName' in q) {
    const jsonLesson = await getSingleLesson(req);
    return res.json(jsonLesson);
  } else if ('start' in q && 'total' in q) {
    const search = q.search ? q.search : '';
    const lessons = await Lesson.getFilteredInf(search, q.start, q.total);
    return res.json(lessons.map((l) => l.toJSON()));
  } else {
    const lessons = await Lesson.find({})
      .populate('teacher')
      .populate('comments');
    res.json(lessons.map((l) => l.toJSON()));
  }
});

lessonsRouter.get('/:id', async (req, res) => {
  const lesson = await Lesson.findById(req.params.id)
    .populate('teacher')
    .populate('comments');
  res.json(lesson.toJSON());
});

lessonsRouter.post('/', async (req, res) => {
  if (
    !req.body.areaCode ||
    !req.body.digitCode ||
    !req.body.teacher ||
    !req.body.sectionCode
  ) {
    return res.status(400).json({
      error: 'areaCode or digitCode or teacher is missing',
    });
  }
  const body = req.body;
  let teacher = await Teacher.findOne({ name: body.teacher });
  if (!teacher) {
    teacher = new Teacher({
      name: body.teacher,
    });
  }

  let lesson = await Lesson.findOne({
    areaCode: body.areaCode,
    digitCode: body.digitCode,
    teacher: teacher._id,
  });
  if (!lesson) {
    lesson = new Lesson({
      areaCode: body.areaCode,
      digitCode: body.digitCode,
      fullName: `${body.areaCode}${body.digitCode}`,
      teacher: teacher._id,
    });
  }
  lesson.sectionCode = [...lesson.sectionCode, body.sectionCode];
  if (!teacher.lessons.includes(lesson._id))
    teacher.lessons = teacher.lessons.concat(lesson._id);
  await teacher.save();
  await lesson.save();
  res.status(201).json(lesson.toJSON());
});

module.exports = lessonsRouter;

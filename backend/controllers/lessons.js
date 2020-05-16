const lessonsRouter = require('express').Router();
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const jsonData = require('../2018-2019-2.json');

lessonsRouter.get('/loadjson/', async (req, res) => {
  let re = new RegExp('([a-zA-Z]+)([0-9]+).([0-9]+)');
  let firstD = new RegExp('([1-4])[0-9][0-9].');
  const lessons = Object.keys(jsonData);

  for (i = 0; i < lessons.length; i++) {
    let f = firstD.exec(jsonData[lessons[i]].code);
    if (f !== null) {
      let result = re.exec(jsonData[lessons[i]].code);
      let areaCode = result[1].toLowerCase();
      let digitCode = result[2];
      let sectionCode = result[3];
      let teacher = jsonData[lessons[i]].instructor;
      let teacherDB = await Teacher.findOne({ name: teacher });
      let lessonExists = await Lesson.findOne({
        areaCode: areaCode,
        digitCode: digitCode,
        teacher: teacherDB._id,
      });
      let lesson =
        lessonExists === null
          ? new Lesson({
              areaCode: areaCode,
              digitCode: digitCode,
              sectionCode: [],
              fullName: `${areaCode}${digitCode}`,
              teacher: teacherDB._id,
            })
          : lessonExists;
      lesson.sectionCode = lesson.sectionCode.concat(sectionCode);
      if (lessonExists === null)
        teacherDB.lessons = teacherDB.lessons.concat(lesson._id);
      console.log(
        `teacher ${i}: ${teacher} ${areaCode}${digitCode}.${sectionCode}`
      );
      await teacherDB.save();
      await lesson.save();
    } else {
      console.log('atlandi', jsonData[lessons[i]].code);
    }
  }
  res.status(200).json({
    status: 'done',
  });
});

lessonsRouter.get('/total', async (req, res) => {
  const search = req.query.search === undefined ? '' : req.query.search;
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
  }).populate('teacher');
  return lesson.toJSON();
};

lessonsRouter.get('/', async (req, res) => {
  if (
    'areaCode' in req.query &&
    'digitCode' in req.query &&
    'teacherName' in req.query
  ) {
    const jsonLesson = await getSingleLesson(req);
    return res.json(jsonLesson);
  } else if ('start' in req.query && 'total' in req.query) {
    const q = req.query;
    const result = q.result === undefined ? '' : q.result;

    const lessons = await Lesson.find({
      fullName: { $regex: result, $options: 'i' },
    })
      .skip(Number(q.start))
      .limit(Number(q.total))
      .populate('teacher');
    return res.json(lessons.map((l) => l.toJSON()));
  }
  const lessons = await Lesson.find({}).populate('teacher');
  res.json(lessons.map((l) => l.toJSON()));
});

lessonsRouter.get('/:id', async (req, res) => {
  lesson = await Lesson.findById(req.params.id);
  res.json(lesson.toJSON());
});

lessonsRouter.post('/', async (req, res) => {
  if (!req.body.areaCode || !req.body.digitCode || !req.body.teacher) {
    return res.status(400).json({
      error: 'areaCode or digitCode or teacher is missing',
    });
  }

  const body = req.body;

  const lesson = new Lesson({
    areaCode: body.areaCode,
    digitCode: body.digitCode,
  });

  const teacher = Teacher.findOne({ name: body.teacher });
  if (!teacher) {
    const newTeacher = new Teacher({
      name: body.teacher,
      lessons: [lesson._id],
    });
    await newTeacher.save();
  } else {
    teacher.lessons = teacher.lessons.concat(lesson._id);
  }
  lesson.teacher = teacher._id;
  await lesson.save();
  Response.status(201).json(lesson.toJSON());
});

module.exports = lessonsRouter;

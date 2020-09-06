const lessonsRouter = require('express').Router();
const Lesson = require('../models/lesson');
const Course = require('../models/course');
const middleware = require('../utils/middleware');

const Teacher = require('../models/teacher');

lessonsRouter.get('/total', async (req, res) => {
  const search = req.query.search ? req.query.search : '';
  const total = await Lesson.find({
    $or:[
      {name: { $regex: search.toUpperCase() ,$options: 'i'}},
      {name: { $regex: search.toLocaleUpperCase('tr-TR') ,$options: 'i'}}
      ]
  }).countDocuments();
  res.json({ total: total });
});

const getSingleLesson = async (req) => {
  const q = req.query;
  const teacher = await Teacher.findOne({ name: q.teacherName });
  const lesson = await Lesson.findOne({
    areaCode: q.areaCode.toUpperCase(),
    digitCode: q.digitCode,
    teacher: teacher._id,
  }).populate({ path: 'comments', select: ['user'] });

  return lesson.toJSON();
};

lessonsRouter.get('/', async (req, res) => {
  const q = req.query;
  if ('areaCode' in q && 'digitCode' in q && 'teacherName' in q) {
    const jsonLesson = await getSingleLesson(req);
    return res.json(jsonLesson);
  } else if ('start' in q && 'total' in q) {
    const search = q.search ? q.search : '';
    const data = await Lesson.getFilteredInf(search, q.start, q.total);
  res.json(data);
    
  } else {
    return res.status(400).json({error:'Onur bir şeyleri batırdı. Hata kodu 45.'})
  }
});



module.exports = lessonsRouter;

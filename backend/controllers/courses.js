const coursesRouter = require('express').Router();
const Course = require('../models/course');

const jsonData = require('../2018-2019-2.json');
coursesRouter.get('/loadjson/', async (req, res) => {
  let re = new RegExp('([a-zA-Z]+)([0-9][a-zA-Z0-9]+).([0-9]+)');
  const lessons = Object.keys(jsonData);

  for (i = 0; i < lessons.length; i++) {
    let currentCourse = jsonData[lessons[i]];
    let result = re.exec(currentCourse.code);
    if (
      !currentCourse.instructor ||
      !currentCourse.hours ||
      !currentCourse.code ||
      !currentCourse.days ||
      !currentCourse.credits ||
      !currentCourse.name ||
      !currentCourse.ects
    ) {
      console.log('atlandi');
      continue;
    }
    let course = new Course({
      areaCode: result[1],
      digitCode: result[2],
      sectionCode: result[3],
      parentName: currentCourse.instructor,
      hours: currentCourse.hours,
      name: currentCourse.code,
      days: convertDaysToInt(currentCourse.days),
      credits: currentCourse.credits,
      ects: currentCourse.ects,
      fullName: currentCourse.name,
    });

    await course.save();

    console.log(
      `${i}: ${course.parentName} ${course.areaCode}${course.digitCode}.${course.sectionCode}`
    );
  }
  res.status(200).json({
    status: 'done',
  });
});

coursesRouter.get('/refresh', async (req, res) => {
  await Course.deleteMany({ days: { $nin: [0, 1, 2, 3, 4] } });
  // for (let i = 0; i < courses.length; i++) {
  //   courses[i].days = convertDaysToInt(courses[i].days);
  //   await courses[i].save();
  // }
  res.end();
});

const convertDaysToInt = (days) => {
  const intDays = [];
  for (let i = 0; i < days.length; i++) {
    if (days[i] === 'M') {
      intDays.push(0);
    } else if (days[i] === 'T') {
      intDays.push(1);
    } else if (days[i] === 'W') {
      intDays.push(2);
    } else if (days[i] === 'Th') {
      intDays.push(3);
    } else if (days[i] === 'F') {
      intDays.push(4);
    }
  }
  return intDays;
};

coursesRouter.get('/search', async (req, res) => {
  const q = req.query;

  let search = q.q ? q.q : '';
  let courses;
  if (q.t) {
    let hours = [];
    let days = [];
    q.t = q.t.split(',');
    for (let i = 0; i < q.t.length; i++) {
      hours.push(Number((q.t[i] % 14) + 1));
      days.push(Math.floor(Number(q.t[i]) / 14));
    }

    const times = hours.map((h, i) => {
      return {
        $and: [{ hours: { $in: [hours[i]] } }, { days: { $in: [days[i]] } }],
      };
    });
    courses = await Course.find({
      $and: [
        ...times,

        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { parentName: { $regex: search, $options: 'i' } },
          ],
        },
      ],
    })
      .sort({ name: 1 })
      .limit(50);
  } else {
    courses = await Course.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { parentName: { $regex: search, $options: 'i' } },
      ],
    })
      .sort({ name: 1 })
      .limit(10);
  }
  res.json(courses.map((c) => c.toJSON()));
});

module.exports = coursesRouter;

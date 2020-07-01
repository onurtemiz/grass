const coursesRouter = require('express').Router();
const Course = require('../models/course');

// const jsonData = require('../2018-2019-2.json');
// coursesRouter.get('/loadjson/', async (req, res) => {
//   let re = new RegExp('([a-zA-Z]+)([0-9][a-zA-Z0-9]+).([0-9]+)');
//   const lessons = Object.keys(jsonData);

//   for (i = 0; i < lessons.length; i++) {
//     let currentCourse = jsonData[lessons[i]];
//     let result = re.exec(currentCourse.code);
//     if (
//       !currentCourse.instructor ||
//       !currentCourse.hours ||
//       !currentCourse.code ||
//       !currentCourse.days ||
//       !currentCourse.credits ||
//       !currentCourse.name ||
//       !currentCourse.ects
//     ) {
//       console.log('atlandi');
//       continue;
//     }
//     let course = new Course({
//       areaCode: result[1],
//       digitCode: result[2],
//       sectionCode: result[3],
//       parentName: currentCourse.instructor,
//       hours: currentCourse.hours,
//       name: currentCourse.code,
//       days: convertDaysToInt(currentCourse.days),
//       credits: currentCourse.credits,
//       ects: currentCourse.ects,
//       fullName: currentCourse.name,
//     });

//     await course.save();

//     console.log(
//       `${i}: ${course.parentName} ${course.areaCode}${course.digitCode}.${course.sectionCode}`
//     );
//   }
//   res.status(200).json({
//     status: 'done',
//   });
// });

// coursesRouter.get('/refresh', async (req, res) => {
//   const courses = await Course.find();
//   for (let i = 0; i < courses.length; i++) {
//     courses[i].cellIds = convertDayHourtoIds(courses[i].days, courses[i].hours);
//     await courses[i].save();
//   }
//   res.end();
// });

const convertDayHourtoIds = (days, hours) => {
  const TOTAL_HOURS = 14;
  let ids = [];
  days.forEach((d, i) => {
    ids.push(TOTAL_HOURS * days[i] + (hours[i] - 1));
  });
  return ids;
};

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
  let times;
  let ntimes;
  if (q.t) times = getTimeFilter(q);
  if (q.nt) ntimes = getNTimeFilter(q);
  if (q.t && q.nt) {
    courses = await Course.getTNSearchResult(search, times, ntimes);
  } else if (q.t) {
    courses = await Course.getTSearchResult(search, times);
  } else if (q.nt) {
    courses = await Course.getNSearchResult(search, ntimes);
  } else {
    courses = await Course.getSearchResult(search);
  }

  res.json(courses.map((c) => c.toJSON()));
});

module.exports = coursesRouter;
function getTimeFilter(q) {
  q.t = q.t.split(',');
  const times = q.t.map((t) => {
    return {
      cellIds: { $in: [Number(t)] },
    };
  });
  return times;
}

function getNTimeFilter(q) {
  q.nt = q.nt.split(',');
  const times = q.nt.map((t) => {
    return {
      cellIds: { $nin: [Number(t)] },
    };
  });
  return times;
}

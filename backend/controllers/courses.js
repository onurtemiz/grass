const coursesRouter = require('express').Router();
const Course = require('../models/course');
const axios = require('axios');
const cheerio = require('cheerio');
const lodash = require('lodash');
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

coursesRouter.get('/lesson', async (req, res) => {
  const q = req.query;
  const courses = await Course.find({
    $and: [
      { areaCode: q.areaCode },
      { digitCode: q.digitCode },
      { parentName: q.parent },
    ],
  }).sort({ name: 1 });
  res.json(courses.map((c) => c.toJSON()));
});

coursesRouter.get('/user', async (req, res) => {
  const user = req.user;
  const courses = await Course.find({
    _id: { $in: user.followingCourses },
  }).sort({
    name: 1,
  });

  res.json(courses.map((c) => c.toJSON()));
});

coursesRouter.get('/update', async (req, res) => {
  let course = await Course.findById(req.query.course);
  if (course) {
    course = await updateCourseQuota(course);
  }
  console.log(course);
  res.json(course.toJSON());
});

coursesRouter.get('/allsections', async (req, res) => {
  const q = req.query;
  const courses = await Course.find({
    $and: [{ areaCode: q.areaCode }, { digitCode: q.digitCode }],
  }).sort({ name: 1 });
  res.json(courses.map((c) => c.toJSON()));
});

coursesRouter.get('/search', async (req, res) => {
  const q = req.query;

  let search = q.q ? q.q : '';
  let times;
  let ntimes;
  if (q.t) times = getTimeFilter(q);
  if (q.nt) ntimes = getNTimeFilter(q);

  if (q.t && q.nt) {
    response = await Course.getTNSearchResult(
      search,
      q.start,
      q.total,
      times,
      ntimes
    );
  } else if (q.t) {
    response = await Course.getTSearchResult(search, q.start, q.total, times);
  } else if (q.nt) {
    response = await Course.getNSearchResult(search, q.start, q.total, ntimes);
  } else {
    response = await Course.getSearchResult(search, q.start, q.total);
  }
  res.json(response);
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

const updateCourseQuota = async (course) => {
  const quotaLink = getQuotaLink(course, '2019/2020-3');
  const d = await axios.get(quotaLink);
  let $ = cheerio.load(d.data);
  const tables = {};

  $('.schtd2, .schtd').each(function (i, elem) {
    let tableName = $(this).parent().find('.rectitle').text().trim();
    if (!tables[`${tableName}`]) {
      tables[`${tableName}`] = [];
    }
    let row = {};
    $(this)
      .parent()
      .find('.title td')
      .each(function (i, elem) {
        if (!row[`${$(this).text().trim()}`])
          row[`${$(this).text().trim()}`] = '';
      });
    tables[`${tableName}`].push(row);
  });
  $('.schtd2 td, .schtd td').each(function (i, elem) {
    insertCellToIndex($(this).text().trim(), i, tables);
  });
  if (!lodash.isEmpty(tables)) {
    course.quota = tables;
  }
  course.lastChange = Date.now();
  await course.save();
  return course;
};

const getQuotaLink = (c, semester) => {
  return `https://registration.boun.edu.tr/scripts/quotasearch.asp?abbr=${c.areaCode}&code=${c.digitCode}&section=${c.sectionCode}&donem=${semester}`;
};

const insertCellToIndex = (element, index, tables) => {
  let q = 0;
  for (const [quotas, quotasValue] of Object.entries(tables)) {
    for (let i = 0; i < quotasValue.length; i++) {
      for (const [key, value] of Object.entries(quotasValue[i])) {
        if (index === q) {
          quotasValue[i][key] = element;
        }
        q++;
      }
    }
  }
};

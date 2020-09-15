const coursesRouter = require('express').Router();
const Course = require('../models/course');
const axios = require('axios');
const cheerio = require('cheerio');
const lodash = require('lodash');
const rateLimit = require('express-rate-limit');

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

// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 15 minutes
//   max: 45, // limit each IP to 100 requests per windowMs
//   message: {
//     error: 'Çok sık güncellediniz! Lütfen 1 dakika sonra tekrar deneyin.',
//   },
// });

coursesRouter.get('/update', async (req, res) => {
  let course = await Course.findById(req.query.course);
  if (course) {
    course = await updateCourseQuota(course);
  }
  if (course.error) {
    return res.json({ error: course.error });
  }
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

  let search = q.search ? q.search : '';
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
      ntimes,
      q.of
    );
  } else if (q.t) {
    response = await Course.getTSearchResult(
      search,
      q.start,
      q.total,
      times,
      q.of
    );
  } else if (q.nt) {
    response = await Course.getNSearchResult(
      search,
      q.start,
      q.total,
      ntimes,
      q.of
    );
  } else {
    response = await Course.getSearchResult(search, q.start, q.total, q.of);
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
  try {
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
  } catch (e) {
    return { error: 'Registrationa bağlanılamadı.' };
  }
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

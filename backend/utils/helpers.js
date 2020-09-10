const moment = require('moment');

const getDayFilterFuture = (daySort) => {
  if (daySort === 'today') {
    return {
      $gte: moment().startOf('day'),
      $lte: moment().endOf('day'),
    };
  } else if (daySort === 'nextWeek') {
    return {
      $gte: moment().startOf('week'),
      $lte: moment().endOf('week'),
    };
  } else if (daySort === 'nextMonth') {
    return {
      $gte: moment().startOf('month'),
      $lte: moment().endOf('month'),
    };
  } else {
    return {
      $ne: new Date(),
    };
  }
};

const getDayFilter = (daySort) => {
  if (daySort === 'today') {
    return {
      $gte: moment().subtract(1, 'days'),
    };
  } else if (daySort === 'lastWeek') {
    return {
      $gte: moment().subtract(7, 'days'),
    };
  } else if (daySort === 'lastMonth') {
    return {
      $gte: moment().subtract(30, 'days'),
    };
  } else {
    return {
      $lte: new Date().getTime(),
    };
  }
};

module.exports = {
  getDayFilter,
  getDayFilterFuture,
};

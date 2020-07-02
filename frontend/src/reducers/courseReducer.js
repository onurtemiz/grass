import allService from '../services/all';
import coursesServices from '../services/courses';
import { toast } from 'react-toastify';
import lodash from 'lodash';
import { getIdByDayHour } from '../utils/utils';

const getCells = () => {
  let cells = [];
  let id = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 14; j++) {
      let cell = {
        day: i,
        time: j,
        courses: [],
        color: null,
        timeFind: null,
        id,
      };
      cells.push(cell);
      id++;
    }
  }

  return cells;
};
const initialState = {
  courses: [],
  selectedCourses: [],
  cells: getCells(),
  findTime: [],
  notFindTime: [],
  tryEmptyDay: false,
  conflict: {
    makeConflict: false,
    conflictRange: 5,
    conflictRequired: false,
  },
  extraHours: false,
  requiredCourses: [{ courses: [], id: lodash.uniqueId() }],
  creditsRange: [15, 21],
  hoursRange: [20, 30],
  scenarios: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_COURSES':
      const uniqAll = lodash.uniqBy([...state.courses, ...action.data], 'id');
      const currentState = {
        ...state,
        courses: uniqAll,
      };
      return currentState;
    case 'ADD_SELECTED_COURSE':
      const addedSelectedCourses = state.selectedCourses.filter(
        (c) => c.id !== action.data.id
      );
      const selectedCourses = [...addedSelectedCourses, action.data];
      const addedExtraHours = checkExtraHour(selectedCourses);
      return { ...state, selectedCourses, extraHours: addedExtraHours };
    case 'REMOVE_SELECTED_COURSE':
      const otherSelectedCourses = state.selectedCourses.filter(
        (c) => c.id !== action.data.id
      );
      const removedExtraHours = checkExtraHour(otherSelectedCourses);

      return {
        ...state,
        selectedCourses: otherSelectedCourses,
        extraHours: removedExtraHours,
      };
    case 'SET_CELL':
      const otherCells = state.cells.filter((c) => c.id !== action.data.id);
      return {
        ...state,
        cells: [...otherCells, action.data],
      };
    case 'FIND_TIME_CELL':
      const otherCells1 = state.cells.filter(
        (c) => c.id !== action.data.cell.id
      );
      const otherFindTimes = state.findTime.filter(
        (t) => t.id !== action.data.time.id
      );
      const otherNotFindTimes2 = state.notFindTime.filter(
        (t) => t.id !== action.data.time.id
      );
      return {
        ...state,
        findTime: [...otherFindTimes, action.data.time],
        notFindTime: otherNotFindTimes2,
        cells: [...otherCells1, action.data.cell],
      };
    case 'NOT_FIND_TIME_CELL':
      const otherCells0 = state.cells.filter(
        (c) => c.id !== action.data.cell.id
      );
      const otherNotFindTimes = state.notFindTime.filter(
        (t) => t.id !== action.data.time.id
      );
      const otherFindTimes1 = state.findTime.filter(
        (t) => t.id !== action.data.time.id
      );
      return {
        ...state,
        notFindTime: [...otherNotFindTimes, action.data.time],
        findTime: otherFindTimes1,
        cells: [...otherCells0, action.data.cell],
      };

    case 'RESET_TIME_CELL':
      const otherCells2 = state.cells.filter(
        (c) => c.id !== action.data.cell.id
      );

      const proplessFind = state.findTime.filter(
        (t) => t.id !== action.data.time.id
      );
      const proplessNotFind = state.notFindTime.filter(
        (t) => t.id !== action.data.time.id
      );

      return {
        ...state,
        findTime: proplessFind,
        notFindTime: proplessNotFind,
        cells: [...otherCells2, action.data.cell],
      };

    case 'ADD_COURSE_TO_CELL':
      const foundCell = state.cells.find((c) => c.id === action.data.cell.id);
      const cellCourses = foundCell.courses.filter(
        (c) => c.id !== action.data.course.id
      );
      const otherCells3 = state.cells.filter(
        (c) => c.id !== action.data.cell.id
      );
      return {
        ...state,
        cells: [
          ...otherCells3,
          {
            ...foundCell,
            courses: [...cellCourses, action.data.course],
          },
        ],
      };
    case 'ON_HOVER_COURSE':
      const hoverlessCourses = state.selectedCourses.filter(
        (c) => c.id !== action.data.id
      );
      const foundHoverCourse = state.selectedCourses.find(
        (c) => c.id === action.data.id
      );

      return {
        ...state,
        selectedCourses: [
          ...hoverlessCourses,
          { ...foundHoverCourse, hover: true },
        ],
      };
    case 'OFF_HOVER_COURSE':
      const hoverCourses = state.selectedCourses.filter(
        (c) => c.id !== action.data.id
      );

      const foundHoverlessCourse = state.selectedCourses.find(
        (c) => c.id === action.data.id
      );
      return {
        ...state,
        selectedCourses: [
          ...hoverCourses,
          { ...foundHoverlessCourse, hover: false },
        ],
      };
    case 'REMOVE_COURSE_FROM_CELL':
      const foundCell2 = state.cells.find((c) => c.id === action.data.cell.id);
      const cellCourses2 = action.data.cell.courses.filter(
        (c) => c.id !== action.data.course.id
      );
      const otherCells4 = state.cells.filter(
        (c) => c.id !== action.data.cell.id
      );
      return {
        ...state,
        cells: [...otherCells4, { ...foundCell2, courses: cellCourses2 }],
      };
    case 'TOGGLE_TRY_EMPTY_DAY':
      return {
        ...state,
        tryEmptyDay: !state.tryEmptyDay,
      };
    case 'ONOFF_CONFLICT':
      return {
        ...state,
        conflict: {
          ...state.conflict,
          makeConflict: !state.conflict.makeConflict,
        },
      };
    case 'ADD_NEW_REQUIRED_COLUMN':
      return {
        ...state,
        requiredCourses: [
          ...state.requiredCourses,
          { courses: [], id: lodash.uniqueId() },
        ],
      };
    case 'REMOVE_REQUIRED_COLUMN':
      const otherRequiredCourses = state.requiredCourses.filter(
        (rc) => rc.id !== action.data.id
      );
      return {
        ...state,
        requiredCourses: otherRequiredCourses,
      };

    case 'ADD_TO_REQUIRED_COLUMN':
      const addOtherRequiredCourses = state.requiredCourses.filter(
        (rc) => rc.id !== action.data.rc.id
      );
      return {
        ...state,
        requiredCourses: [
          ...addOtherRequiredCourses,
          {
            ...action.data.rc,
            courses: [...action.data.rc.courses, action.data.course],
          },
        ],
      };
    case 'REMOVE_FROM_REQUIRED_COLUMN':
      const otherRcCourses = action.data.rc.courses.filter(
        (rcCourse) => rcCourse.id !== action.data.course.id
      );
      const removeOtherRequiredCourses = state.requiredCourses.filter(
        (rc) => rc.id !== action.data.rc.id
      );
      return {
        ...state,
        requiredCourses: [
          ...removeOtherRequiredCourses,
          {
            ...action.data.rc,
            courses: otherRcCourses,
          },
        ],
      };
    case 'CHANGE_CREDITS_RANGE':
      return {
        ...state,
        creditsRange: action.data,
      };
    case 'CHANGE_HOURS_RANGE':
      return {
        ...state,
        hoursRange: action.data,
      };
    case 'CHANGE_CONFLICT_RANGE':
      return {
        ...state,
        conflict: { ...state.conflict, conflictRange: action.data },
      };
    case 'CHANGE_CONFLICT_REQUIRED':
      return {
        ...state,
        conflict: {
          ...state.conflict,
          conflictRequired: !state.conflict.conflictRequired,
        },
      };
    case 'CHANGE_COURSE_VISIBILITY':
      const otherVisCourses = state.selectedCourses.filter(
        (sc) => sc.id !== action.data.id
      );
      return {
        ...state,
        selectedCourses: [
          ...otherVisCourses,
          { ...action.data, visible: !action.data.visible },
        ],
      };
    case 'SET_SCENARIOS':
      return {
        ...state,
        scenarios: action.data,
      };
    default:
      return state;
  }
};

export const setScenarios = (scenarios) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_SCENARIOS',
      data: scenarios,
    });
  };
};

export const changeCourseVisibility = (course) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_COURSE_VISIBILITY',
      data: course,
    });
  };
};

export const changeConflictRequired = () => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_CONFLICT_REQUIRED',
    });
  };
};

export const changeHoursRange = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_HOURS_RANGE',
      data: value,
    });
  };
};

export const changeConflictRange = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_CONFLICT_RANGE',
      data: value,
    });
  };
};

export const changeCreditsRange = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_CREDITS_RANGE',
      data: value,
    });
  };
};

export const addToRequiredColumn = (rc, course) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_TO_REQUIRED_COLUMN',
      data: { rc, course },
    });
  };
};

export const removeFromRequiredColumn = (rc, course) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_REQUIRED_COLUMN',
      data: { rc, course },
    });
  };
};

export const addNewRequiredColumn = () => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_NEW_REQUIRED_COLUMN',
    });
  };
};

export const removeRequiredColumn = (column) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_REQUIRED_COLUMN',
      data: column,
    });
  };
};

const checkExtraHour = (courses) => {
  let extra = false;
  courses.forEach((course) => {
    course.hours.forEach((hour) => {
      if (hour > 8) {
        extra = true;
      }
    });
  });
  return extra;
};

export const toggleTryEmptyDay = () => {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_TRY_EMPTY_DAY',
    });
  };
};

export const onOffConflict = () => {
  return (dispatch) => {
    dispatch({
      type: 'ONOFF_CONFLICT',
    });
  };
};

export const onHoverCourse = (course) => {
  return (dispatch) => {
    dispatch({
      type: 'ON_HOVER_COURSE',
      data: course,
    });
  };
};
export const offHoverCourse = (course) => {
  return (dispatch) => {
    dispatch({
      type: 'OFF_HOVER_COURSE',
      data: course,
    });
  };
};

export const addSelectedCourse = (course, hover, clicked) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_SELECTED_COURSE',
      data: { ...course, hover, clicked },
    });
  };
};

export const removeSelectedCourse = (course) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_SELECTED_COURSE',
      data: course,
    });
  };
};

export const setCell = (cell) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CELL',
      data: cell,
    });
  };
};

export const addCourseToCell = (cell, course) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_COURSE_TO_CELL',
      data: { cell, course },
    });
  };
};

export const removeCourseFromCell = (cell, course) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_COURSE_FROM_CELL',
      data: { cell, course },
    });
  };
};

export const findTimeCell = (cell) => {
  return async (dispatch) => {
    dispatch({
      type: 'FIND_TIME_CELL',
      data: {
        time: { id: cell.id, day: cell.day, hour: cell.time + 1 },
        cell: { ...cell, timeFind: true, color: '#bffdd3' },
      },
    });
  };
};

export const resetTimeCell = (cell) => {
  return async (dispatch) => {
    dispatch({
      type: 'RESET_TIME_CELL',
      data: {
        cell: {
          ...cell,
          timeFind: null,
          color: null,
        },
        time: { id: cell.id, day: cell.day, hour: cell.time + 1 },
      },
    });
  };
};

export const notFindTimeCell = (cell) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOT_FIND_TIME_CELL',
      data: {
        time: { id: cell.id, day: cell.day, hour: cell.time + 1 },
        cell: { ...cell, timeFind: false, color: '#fdabab' },
      },
    });
  };
};

export const searchCourse = (search, findTime, notFindTime) => {
  return async (dispatch) => {
    let courses = await coursesServices.searchCourse(
      search,
      findTime,
      notFindTime
    );
    if (courses.error) {
      toast.error(`${courses.error}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    courses = courses.map((c) => {
      return { ...c, hover: false, clicked: false, visible: true };
    });
    dispatch({
      type: 'SEARCH_COURSES',
      data: courses,
    });
  };
};

export default courseReducer;

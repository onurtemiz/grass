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
        visible: false,
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
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
  selectedCourses: [],
  cells: getCells(),
  findTime: [],
  notFindTime: [],
  tryEmptyDay: false,
  conflict: {
    makeConflict: false,
    conflictRange: 3,
  },
  extraHours: false,
  requiredCourses: [{ courses: [], id: lodash.uniqueId() }],
  creditsRange: [15, 24],
  scenariosSlider: 10,
  courseRange: [5, 8],
  scenarios: [],
  currentScenario: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_COURSES':
      const uniqAll = lodash.uniqBy(
        [...state.courses, ...action.data.courses],
        'id'
      );

      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,

        courses: uniqAll,
      };
      return currentState;
    case 'ADD_COURSES':
      const uniqAllCourses = lodash.uniqBy(
        [...state.courses, ...action.data],
        'id'
      );

      const currentStateCourses = {
        ...state,
        courses: uniqAllCourses,
      };
      return currentStateCourses;
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
      const requiredCoursesFiltered = state.requiredCourses.map((rcCourse) => {
        return {
          courses: rcCourse.courses.filter(
            (course) => course.id !== action.data.id
          ),
          id: rcCourse.id,
        };
      });
      return {
        ...state,
        selectedCourses: otherSelectedCourses,
        extraHours: removedExtraHours,
        requiredCourses: requiredCoursesFiltered,
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
    case 'ADD_TO_REQUIRED_COLUMN_MULTI':
      const otherMultiRequired = state.requiredCourses.filter(
        (rc) => rc.id !== action.data.rc.id
      );
      return {
        ...state,
        requiredCourses: [
          ...otherMultiRequired,
          {
            ...action.data.rc,
            courses: [...action.data.rc.courses, ...action.data.stack.courses],
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
    case 'CHANGE_COURSE_RANGE':
      return {
        ...state,
        courseRange: action.data,
      };
    case 'CHANGE_CONFLICT_RANGE':
      return {
        ...state,
        conflict: { ...state.conflict, conflictRange: action.data },
      };
    case 'CHANGE_SCENARIOS_SLIDER':
      return {
        ...state,
        scenariosSlider: action.data,
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
    case 'SET_CURRENT_SCENARIO':
      return {
        ...state,
        currentScenario: action.data,
      };
    case 'CHANGE_COURSES_VISIBILITY':
      const visibleCoursesId = action.data.map((sc) => sc.id);
      const hiddenCourses = state.selectedCourses.filter((sc) =>
        visibleCoursesId.includes(sc.id) ? false : true
      );
      const hiddenCoursesChanged = hiddenCourses.map((sc) => ({
        ...sc,
        visible: false,
      }));
      const visibleCoursesChanged = action.data.map((sc) => ({
        ...sc,
        visible: true,
      }));
      return {
        ...state,
        selectedCourses: [...hiddenCoursesChanged, ...visibleCoursesChanged],
      };
    case 'ADD_ALL_SECTIONS':
      const changedAction = action.data.map((course) => ({
        ...course,
        hover: false,
        clicked: true,
        visible: true,
      }));
      const uniqSelected = lodash.uniqBy(
        [...state.selectedCourses, ...changedAction],
        'id'
      );

      const extraHoursSections = checkExtraHour(uniqSelected);
      return {
        ...state,
        selectedCourses: uniqSelected,
        extraHours: extraHoursSections,
      };
    case 'REMOVE_SELECTED_COURSES_STACK':
      const otherStackedCourses = state.selectedCourses.filter(
        (c) => `${c.areaCode}${c.digitCode}` !== action.data.shortName
      );
      const removedStackedHours = checkExtraHour(otherStackedCourses);
      const requiredCoursesStacked = state.requiredCourses.map((rcCourse) => {
        return {
          courses: rcCourse.courses.filter(
            (course) =>
              `${course.areaCode}${course.digitCode}` !== action.data.shortName
          ),
          id: rcCourse.id,
        };
      });
      let removedCells;
      action.data.courses.forEach((removedCourse) => {
        removedCells = state.cells.map((cell) => {
          let filteredCourses = cell.courses.filter(
            (c) => c.id === removedCourse.id
          );
          return { ...cell, courses: filteredCourses };
        });
      });
      return {
        ...state,
        selectedCourses: otherStackedCourses,
        extraHours: removedStackedHours,
        requiredCourses: requiredCoursesStacked,
        cells: removedCells,
      };
    case 'TOGGLE_CELL_COURSES_VISIBILITY':
      let otherNormalCells = state.cells.filter(
        (c) => c.id !== action.data.cell.id
      );
      return {
        ...state,
        cells: [
          ...otherNormalCells,
          { ...action.data.cell, visible: action.data.visibility },
        ],
      };
    case 'TOGGLE_SELECTED_COURSES_EYE':
      const stackVisCourses = action.data.stack.courses.map((c) => c.id);
      const otherVisibleCourses = state.selectedCourses.filter((sc) =>
        stackVisCourses.includes(sc.id) ? false : true
      );
      let ourVisibleCourses = state.selectedCourses.filter((sc) =>
        stackVisCourses.includes(sc.id)
      );
      ourVisibleCourses = ourVisibleCourses.map((c) => ({
        ...c,
        visible: action.data.visibility,
      }));
      return {
        ...state,
        selectedCourses: [...otherVisibleCourses, ...ourVisibleCourses],
      };
    case 'REMOVE_REQUIRED_COURSES_WITH_STACK':
      const requiredCoursesStackless = state.requiredCourses.map((rcCourse) => {
        return {
          courses: rcCourse.courses.filter(
            (course) =>
              `${course.areaCode}${course.digitCode}` !== action.data.shortName
          ),
          id: rcCourse.id,
        };
      });

      return {
        ...state,
        requiredCourses: requiredCoursesStackless,
      };
    default:
      return state;
  }
};

export const removeRequiredWithStack = (stack) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_REQUIRED_COURSES_WITH_STACK',
      data: stack,
    });
  };
};

export const toggleSelectedCoursesEye = (stack, visibility) => {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_SELECTED_COURSES_EYE',
      data: { stack, visibility },
    });
  };
};

export const toggleCellCoursesVisiblity = (cell, visibility) => {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_CELL_COURSES_VISIBILITY',
      data: { cell, visibility },
    });
  };
};

export const removeSelectedCoursesWithStack = (stack) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_SELECTED_COURSES_STACK',
      data: stack,
    });
  };
};

export const setCurrentScenario = (scenario) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CURRENT_SCENARIO',
      data: scenario,
    });
  };
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

export const changeCoursesVisibility = (courses) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_COURSES_VISIBILITY',
      data: courses,
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

export const changeScenariosSlider = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_SCENARIOS_SLIDER',
      data: value,
    });
  };
};

export const changeCourseRange = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_COURSE_RANGE',
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

export const addToRequiredColumnMulti = (rc, stack) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_TO_REQUIRED_COLUMN_MULTI',
      data: { rc, stack },
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

export const addAllSections = (areaCode, digitCode) => {
  return async (dispatch) => {
    let courses = await coursesServices.getAllSections(areaCode, digitCode);
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
      type: 'ADD_COURSES',
      data: courses,
    });
    dispatch({
      type: 'ADD_ALL_SECTIONS',
      data: courses,
    });
  };
};

export const searchCourse = (
  start,
  count,
  first,
  fetching,
  search,
  findTime,
  notFindTime,
  isOffline
) => {
  return async (dispatch) => {
    fetching.current = true;

    let res = await coursesServices.addInf(
      start,
      count,
      search,
      findTime,
      notFindTime,
      isOffline
    );
    if (res.error) {
      toast.error(`${res.error}`, {
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

    let { courses, total } = res;
    courses = courses.map((c) => {
      return { ...c, hover: false, clicked: false, visible: true };
    });
    let data = {
      hasMore: true,
      start: start + count,
      courses,
      total,
      count,
    };
    if (total === 0 || total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }
    dispatch({
      type: 'ADD_INF_COURSES',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export default courseReducer;

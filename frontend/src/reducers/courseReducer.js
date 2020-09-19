import coursesServices from '../services/courses';
import { toast } from 'react-toastify';
import lodash from 'lodash';

const actionTypes = {
  ADD_INF_COURSES: 'ADD_INF_COURSES',

  // SELECTED COURSES
  ADD_ALL_SECTIONS_TO_SELECTED: 'ADD_ALL_SECTIONS_TO_SELECTED',
  ADD_COURSE_TO_SELECTED: 'ADD_COURSE_TO_SELECTED',
  REMOVE_COURSE_FROM_SELECTED: 'REMOVE_COURSE_FROM_SELECTED',
  REMOVE_COURSE_STACK_FROM_SELECTED: 'REMOVE_COURSE_STACK_FROM_SELECTED',

  // HOVERS
  ON_HOVER_COURSE: 'ON_HOVER_COURSE',
  OFF_HOVER_COURSE: 'OFF_HOVER_COURSE',

  // TOGGLES
  TOGGLE_SELECTED_COURSES_STACK_VISIBILITY:
    'TOGGLE_SELECTED_COURSES_STACK_VISIBILITY',
  TOGGLE_SELECTED_COURSE_VISIBILITY: 'TOGGLE_SELECTED_COURSE_VISIBILITY',
  TOGGLE_TRY_EMPTY_DAY: 'TOGGLE_TRY_EMPTY_DAY',
  TOGGLE_TRY_CONFLICT: 'TOGGLE_TRY_CONFLICT',
  TOGGLE_CELL_COURSES_VISIBILITY: 'TOGGLE_CELL_COURSES_VISIBILITY',

  // REQUIRED COLUMN
  ADD_SELECTED_COURSE_TO_REQUIRED: 'ADD_SELECTED_COURSE_TO_REQUIRED',
  ADD_SELECTED_COURSES_STACK_TO_REQUIRED:
    'ADD_SELECTED_COURSES_STACK_TO_REQUIRED',
  REMOVE_SELECTED_COURSE_FROM_REQUIRED: 'REMOVE_SELECTED_COURSE_FROM_REQUIRED',
  REMOVE_SELECTED_COURSES_STACK_FROM_REQUIRED:
    'REMOVE_SELECTED_COURSES_STACK_FROM_REQUIRED',
  ADD_NEW_REQUIRED_COLUMN: 'ADD_NEW_REQUIRED_COLUMN',
  REMOVE_REQUIRED_COLUMN: 'REMOVE_REQUIRED_COLUMN',
  // SCENARIOS
  SET_SCENARIOS: 'SET_SCENARIOS',
  SET_CURRENT_SCENARIO: 'SET_CURRENT_SCENARIO',

  //SLIDERS - RANGES
  CHANGE_SCENARIOS_LIMIT: 'CHANGE_SCENARIOS_LIMIT',
  CHANGE_CONFLICT_RANGE: 'CHANGE_CONFLICT_RANGE',
  CHANGE_COURSES_RANGE: 'CHANGE_COURSES_RANGE',
  CHANGE_CREDITS_RANGE: 'CHANGE_CREDITS_RANGE',

  // WHITELIST - BLACKLIST
  ADD_WHITE_TIME_TO_CELL: 'ADD_WHITE_TIME_TO_CELL',
  ADD_BLACK_TIME_TO_CELL: 'ADD_BLACK_TIME_TO_CELL',
  RESET_TIME_FROM_CELL: 'RESET_TIME_FROM_CELL',

  // SAVING - LOADING
  LOAD_CURRENT_STATE: 'LOAD_CURRENT_STATE',
  RESET_CURRENT_STATE: 'RESET_CURRENT_STATE',
};

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
export const initialState = {
  courses: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 50,
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
    case actionTypes.ADD_INF_COURSES:
      return addInfCoursesReducer(state, action);

    case actionTypes.ADD_ALL_SECTIONS_TO_SELECTED:
      return addAllSectionsToSelectedReducer(state, action);
    case actionTypes.ADD_COURSE_TO_SELECTED:
      return addCourseToSelectedReducer(state, action);
    case actionTypes.REMOVE_COURSE_FROM_SELECTED:
      return removeCourseFromSelectedReducer(state, action);
    case actionTypes.REMOVE_COURSE_STACK_FROM_SELECTED:
      return removeCourseStackFromSelectedReducer(state, action);

    case actionTypes.ADD_NEW_REQUIRED_COLUMN:
      return addNewRequiredColumnReducer(state, action);
    case actionTypes.ADD_SELECTED_COURSE_TO_REQUIRED:
      return addSelectedCourseToRequiredReducer(state, action);
    case actionTypes.ADD_SELECTED_COURSES_STACK_TO_REQUIRED:
      return addSelectedCoursesStackToRequiredReducer(state, action);
    case actionTypes.REMOVE_SELECTED_COURSE_FROM_REQUIRED:
      return removeSelectedCourseFromRequiredReducer(state, action);
    case actionTypes.REMOVE_SELECTED_COURSES_STACK_FROM_REQUIRED:
      return removeSelectedCoursesStackFromRequiredReducer(state, action);
    case actionTypes.REMOVE_REQUIRED_COLUMN:
      return removeRequiredColumnReducer(state, action);

    case actionTypes.CHANGE_SCENARIOS_LIMIT:
      return changeScenariosLimitReducer(state, action);
    case actionTypes.CHANGE_COURSES_RANGE:
      return changeCoursesRangeReducer(state, action);
    case actionTypes.CHANGE_CREDITS_RANGE:
      return changeCreditsRangeReducer(state, action);
    case actionTypes.CHANGE_CONFLICT_RANGE:
      return changeConflictRangeReducer(state, action);

    case actionTypes.TOGGLE_SELECTED_COURSES_STACK_VISIBILITY:
      return togggleSelectedCoursesStackVisibilityReducer(state, action);
    case actionTypes.TOGGLE_SELECTED_COURSE_VISIBILITY:
      return toggleSelectedCourseVisibilityReducer(state, action);
    case actionTypes.TOGGLE_CELL_COURSES_VISIBILITY:
      return toggleCellCoursesVisiblityReducer(state, action);
    case actionTypes.TOGGLE_TRY_EMPTY_DAY:
      return toggleTryEmptyDayReducer(state, action);
    case actionTypes.TOGGLE_TRY_CONFLICT:
      return toggleTryConflictReducer(state, action);
    case actionTypes.SET_SCENARIOS:
      return setScenariosReducer(state, action);
    case actionTypes.SET_CURRENT_SCENARIO:
      return setCurrentScenarioReducer(state, action);

    case actionTypes.ON_HOVER_COURSE:
      return onHoverCourseReducer(state, action);
    case actionTypes.OFF_HOVER_COURSE:
      return offHoverCourseReducer(state, action);

    case actionTypes.ADD_WHITE_TIME_TO_CELL:
      return addWhiteTimeCellReducer(state, action);
    case actionTypes.ADD_BLACK_TIME_TO_CELL:
      return addBlackTimeCellReducer(state, action);
    case actionTypes.RESET_TIME_FROM_CELL:
      return resetTimeFromCellReducer(state, action);

    case actionTypes.LOAD_CURRENT_STATE:
      return loadCurrentSaveReducer(state, action);
    case actionTypes.RESET_CURRENT_STATE:
      return initialState;
    default:
      return state;
  }
};

export const resetCurrentState = (setLoading) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_CURRENT_STATE,
    });
    setLoading(false);
  };
};

export const addToRequiredColumnMulti = (rc, stack) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_SELECTED_COURSES_STACK_TO_REQUIRED,
      data: { rc, stack },
    });
  };
};

export const removeRequiredWithStack = (stack) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_SELECTED_COURSES_STACK_FROM_REQUIRED,
      data: stack,
    });
  };
};

export const addToRequiredColumn = (rc, course) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_SELECTED_COURSE_TO_REQUIRED,
      data: { rc, course },
    });
  };
};

export const removeFromRequiredColumn = (rc, course) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_SELECTED_COURSE_FROM_REQUIRED,
      data: { rc, course },
    });
  };
};

export const addNewRequiredColumn = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_NEW_REQUIRED_COLUMN,
    });
  };
};

export const removeRequiredColumn = (column) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_REQUIRED_COLUMN,
      data: column,
    });
  };
};

export const addSelectedCourse = (course, hover, clicked) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_COURSE_TO_SELECTED,
      data: { ...course, hover, clicked },
    });
  };
};

export const removeSelectedCourse = (course) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_COURSE_FROM_SELECTED,
      data: course,
    });
  };
};

export const removeSelectedCoursesWithStack = (stack) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_COURSE_STACK_FROM_SELECTED,
      data: stack,
    });
  };
};

export const toggleSelectedCoursesEye = (stack, visibility) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_SELECTED_COURSES_STACK_VISIBILITY,
      data: { stack, visibility },
    });
  };
};

export const toggleCellCoursesVisiblity = (cell, visibility) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_CELL_COURSES_VISIBILITY,
      data: { cell, visibility },
    });
  };
};

export const setCurrentScenario = (scenario) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_CURRENT_SCENARIO,
      data: scenario,
    });
  };
};

export const setScenarios = (scenarios) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_SCENARIOS,
      data: scenarios,
    });
  };
};

export const changeCourseVisibility = (course) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_SELECTED_COURSE_VISIBILITY,
      data: course,
    });
  };
};

export const changeScenariosSlider = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_SCENARIOS_LIMIT,

      data: value,
    });
  };
};

export const changeCourseRange = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_COURSES_RANGE,

      data: value,
    });
  };
};

export const changeConflictRange = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_CONFLICT_RANGE,

      data: value,
    });
  };
};

export const changeCreditsRange = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_CREDITS_RANGE,
      data: value,
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
      type: actionTypes.TOGGLE_TRY_EMPTY_DAY,
    });
  };
};

export const onOffConflict = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_TRY_CONFLICT,
    });
  };
};

export const onHoverCourse = (course) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ON_HOVER_COURSE,
      data: course,
    });
  };
};
export const offHoverCourse = (course) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.OFF_HOVER_COURSE,
      data: course,
    });
  };
};

export const findTimeCell = (cell) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_WHITE_TIME_TO_CELL,
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
      type: actionTypes.RESET_TIME_FROM_CELL,
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
      type: actionTypes.ADD_BLACK_TIME_TO_CELL,
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
      type: actionTypes.ADD_ALL_SECTIONS_TO_SELECTED,
      data: courses,
    });
  };
};

export const getCurrentState = (setLoading) => {
  return async (dispatch) => {
    const state = await coursesServices.getState();
    if (!state || state.error) {
      toast.error(`Course Planner Alınamadı.`, {
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
    dispatch({
      type: actionTypes.LOAD_CURRENT_STATE,
      data: state,
    });
    setLoading(false);
  };
};

const addInfCoursesReducer = (state, action) => {
  return {
    ...state,
    total: action.data.total,
    hasMore: action.data.hasMore,
    start: action.data.start,
    courses: lodash.uniqBy([...state.courses, ...action.data.courses], 'id'),
  };
};

// SELECTED
const colors = [
  '#A52A2A',
  '#FF1493',
  '#B413EC',
  '#EE82EE',
  '#0E6EB8',
  '#008080',
  '#016936',
  '#32CD32',
  '#FFD700',
  '#FE9A76',
  '#B03060',
  '#51e2f5',
  '#ffa8B6',
  '#a28089',
  '#a0d2eb',
  '#d0bdf4',
  '#a28089',
  '#ff1d58',
  '#f75990',
  '#00DDFF',
  '#0049B7',
  '#ff1e00',
  '#59ce8f',
  '#beef00',
  '#ff0028',
  '#657a00',
  '#1400c6',
  '#7d3cff',
  '#c80e13',
  '#e1b382',
  '#c89666',
  '#2d545e',
  '#12343b',
  '#9bc400',
  '#8076a3',
  '#7c677f',
  '#478559',
  '#161748',
  '#f95d9b',
  '#39a0ca',
  '#ff414e',
  '#51d0de',
  '#bf4aa8',
  '#0f2862',
  '#9e363a',
  '#091f36',
  '#4f5f76',
  '#6B7A8F',
  '#1561ad',
  '#1c77ac',
  '#1dbab4',
  '#fc5226',
];

const addAllSectionsToSelectedReducer = (state, action) => {
  const selectedCourses = action.data.map((course) => {
    const color = colors.shift();
    colors.push(color);
    return {
      ...course,
      hover: false,
      clicked: true,
      visible: true,
      color,
    };
  });
  const currentSelectedCourses = lodash.uniqBy(
    [...selectedCourses, ...state.selectedCourses],
    'id'
  );

  return {
    ...state,
    courses: lodash.uniqBy([...state.courses, ...action.data], 'id'),
    selectedCourses: currentSelectedCourses,
    extraHours: checkExtraHour(currentSelectedCourses),
    cells: addCoursesToCells(state, selectedCourses),
  };
};

const addCourseToSelectedReducer = (state, action) => {
  const color = colors.shift();
  colors.push(color);
  const course = { ...action.data, clicked: true, visible: true, color };
  const currentSelectedCourses = lodash.uniqBy(
    [course, ...state.selectedCourses],
    'id'
  );
  return {
    ...state,
    selectedCourses: currentSelectedCourses,
    extraHours: checkExtraHour(currentSelectedCourses),
    cells: addCourseToCells(state, { data: course }),
  };
};

const addCourseToCells = (state, action) => {
  const courseCells = action.data.cellIds.map((id) => {
    let cell = state.cells.find((c) => c.id === id);
    return {
      ...cell,
      courses: lodash.uniqBy([action.data, ...cell.courses], 'id'),
    };
  });
  return lodash.uniqBy([...courseCells, ...state.cells], 'id');
};

const addCoursesToCells = (state, courses) => {
  let changedCells = [];
  courses.forEach((course) => {
    course.cellIds.map((id) => {
      let cell = state.cells.find((c) => c.id === id);
      let index = changedCells.findIndex((c) => c.id === id);
      if (index !== -1) {
        changedCells[index] = {
          ...changedCells[index],
          courses: lodash.uniqBy(
            [course, ...changedCells[index].courses],
            'id'
          ),
        };
      } else {
        changedCells.push({
          ...cell,
          courses: lodash.uniqBy([course, ...cell.courses], 'id'),
        });
      }
    });
  });
  return lodash.uniqBy([...changedCells, ...state.cells], 'id');
};

const removeCourseFromSelectedReducer = (state, action) => {
  const currentSelectedCourses = state.selectedCourses.filter(
    (c) => c.id !== action.data.id
  );
  const currentRequiredCourses = state.requiredCourses.map((rcCourse) => {
    return {
      courses: rcCourse.courses.filter(
        (course) => course.id !== action.data.id
      ),
      id: rcCourse.id,
    };
  });

  return {
    ...state,
    selectedCourses: currentSelectedCourses,
    extraHours: checkExtraHour(currentSelectedCourses),
    requiredCourses: currentRequiredCourses,
    cells: removeCourseFromCells(state, action),
  };
};

const removeCourseFromCells = (state, action) => {
  const courseCells = action.data.cellIds.map((id) => {
    let cell = state.cells.find((c) => c.id === id);
    return {
      ...cell,
      courses: cell.courses.filter((c) => c.id !== action.data.id),
    };
  });
  return lodash.uniqBy([...courseCells, ...state.cells], 'id');
};

const removeCourseStackFromSelectedReducer = (state, action) => {
  const currentSelectedCourses = state.selectedCourses.filter(
    (c) => `${c.areaCode}${c.digitCode}` !== action.data.shortName
  );
  const currentRequiredCourses = state.requiredCourses.map((rcCourse) => {
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
    selectedCourses: currentSelectedCourses,
    extraHours: checkExtraHour(currentSelectedCourses),
    requiredCourses: currentRequiredCourses,
    cells: removeCoursesFromCells(state, action.data.courses),
  };
};

const removeCoursesFromCells = (state, courses) => {
  let currentCells = [];
  courses.forEach((removedCourse) => {
    removedCourse.cellIds.forEach((id) => {
      let cell = state.cells.find((c) => c.id === id);
      let index = currentCells.findIndex((c) => c.id === id);
      if (index !== -1) {
        currentCells[index] = {
          ...cell,
          courses: currentCells[index].courses.filter(
            (c) => c.id !== removedCourse.id
          ),
        };
      } else {
        currentCells.push({
          ...cell,
          courses: cell.courses.filter((c) => c.id !== removedCourse.id),
        });
      }
    });
  });
  return lodash.uniqBy([...currentCells, ...state.cells], 'id');
};

// REQUIRED

const addNewRequiredColumnReducer = (state, action) => {
  return {
    ...state,
    requiredCourses: [
      ...state.requiredCourses,
      { courses: [], id: lodash.uniqueId() },
    ],
  };
};

const addSelectedCourseToRequiredReducer = (state, action) => {
  const otherRequiredColumns = state.requiredCourses.filter(
    (rc) => rc.id !== action.data.rc.id
  );
  return {
    ...state,
    requiredCourses: [
      ...otherRequiredColumns,
      {
        ...action.data.rc,
        courses: [...action.data.rc.courses, action.data.course],
      },
    ],
  };
};

const addSelectedCoursesStackToRequiredReducer = (state, action) => {
  const otherRequiredColumns = state.requiredCourses.filter(
    (rc) => rc.id !== action.data.rc.id
  );
  return {
    ...state,
    requiredCourses: [
      ...otherRequiredColumns,
      {
        ...action.data.rc,
        courses: [...action.data.rc.courses, ...action.data.stack.courses],
      },
    ],
  };
};

const removeSelectedCourseFromRequiredReducer = (state, action) => {
  const otherRequiredColumns = state.requiredCourses.filter(
    (rc) => rc.id !== action.data.rc.id
  );

  return {
    ...state,
    requiredCourses: [
      ...otherRequiredColumns,
      {
        ...action.data.rc,
        courses: action.data.rc.courses.filter(
          (rcCourse) => rcCourse.id !== action.data.course.id
        ),
      },
    ],
  };
};

const removeSelectedCoursesStackFromRequiredReducer = (state, action) => {
  return {
    ...state,
    requiredCourses: state.requiredCourses.map((rcCourse) => {
      return {
        courses: rcCourse.courses.filter(
          (course) =>
            `${course.areaCode}${course.digitCode}` !== action.data.shortName
        ),
        id: rcCourse.id,
      };
    }),
  };
};

const removeRequiredColumnReducer = (state, action) => {
  return {
    ...state,
    requiredCourses: state.requiredCourses.filter(
      (rc) => rc.id !== action.data.id
    ),
  };
};

// RANGES

const changeCreditsRangeReducer = (state, action) => {
  return {
    ...state,
    creditsRange: action.data,
  };
};

const changeCoursesRangeReducer = (state, action) => {
  return {
    ...state,
    courseRange: action.data,
  };
};
const changeConflictRangeReducer = (state, action) => {
  return {
    ...state,
    conflict: { ...state.conflict, conflictRange: action.data },
  };
};

const changeScenariosLimitReducer = (state, action) => {
  return {
    ...state,
    scenariosSlider: action.data,
  };
};

// TOGGLES

const toggleTryConflictReducer = (state, action) => {
  return {
    ...state,
    conflict: {
      ...state.conflict,
      makeConflict: !state.conflict.makeConflict,
    },
  };
};

const toggleTryEmptyDayReducer = (state, action) => {
  return {
    ...state,
    tryEmptyDay: !state.tryEmptyDay,
  };
};

const toggleCellCoursesVisiblityReducer = (state, action) => {
  return {
    ...state,
    cells: lodash.uniqBy(
      [
        { ...action.data.cell, visible: action.data.visibility },
        ...state.cells,
      ],
      'id'
    ),
  };
};

const toggleSelectedCourseVisibilityReducer = (state, action) => {
  let currentCells;
  action.data = { ...action.data, visible: !action.data.visible };
  if (action.data.visible == true) {
    currentCells = addCourseToCells(state, action);
  } else {
    currentCells = removeCourseFromCells(state, action);
  }
  return {
    ...state,
    selectedCourses: lodash.uniqBy(
      [action.data, ...state.selectedCourses],
      'id'
    ),
    cells: currentCells,
  };
};

const togggleSelectedCoursesStackVisibilityReducer = (state, action) => {
  const courseIds = action.data.stack.courses.map((c) => c.id);

  const toggledCourses = state.selectedCourses
    .filter((sc) => courseIds.includes(sc.id))
    .map((c) => ({
      ...c,
      visible: action.data.visibility,
    }));
  let currentCells;
  if (action.data.visibility == true) {
    currentCells = addCoursesToCells(state, toggledCourses);
  } else {
    currentCells = removeCoursesFromCells(state, toggledCourses);
  }

  const otherCourses = state.selectedCourses.filter((sc) =>
    courseIds.includes(sc.id) ? false : true
  );
  return {
    ...state,
    selectedCourses: [...otherCourses, ...toggledCourses],
    cells: currentCells,
  };
};

// SCENARIOS

const setScenariosReducer = (state, action) => {
  return {
    ...state,
    scenarios: action.data,
  };
};

const setCurrentScenarioReducer = (state, action) => {
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
  const courselessCells = state.cells.map((c) => {
    return { ...c, courses: [] };
  });
  let changedCells = [];
  visibleCoursesChanged.forEach((course) => {
    course.cellIds.map((id) => {
      let cell = courselessCells.find((c) => c.id === id);
      let index = changedCells.findIndex((c) => c.id === id);
      if (index !== -1) {
        changedCells[index] = {
          ...changedCells[index],
          courses: lodash.uniqBy(
            [course, ...changedCells[index].courses],
            'id'
          ),
        };
      } else {
        changedCells.push({
          ...cell,
          courses: lodash.uniqBy([course, ...cell.courses], 'id'),
        });
      }
    });
  });

  return {
    ...state,
    currentScenario: action.data,
    selectedCourses: [...hiddenCoursesChanged, ...visibleCoursesChanged],
    cells: lodash.uniqBy([...changedCells, ...courselessCells], 'id'),
  };
};

// HOVERS

const onHoverCourseReducer = (state, action) => {
  const course = { ...action.data, hover: true, visible: true, color: 'green' };
  const courseCells = action.data.cellIds.map((id) => {
    let cell = state.cells.find((c) => c.id === id);
    return { ...cell, courses: lodash.uniqBy([course, ...cell.courses], 'id') };
  });
  return {
    ...state,
    selectedCourses: lodash.uniqBy([course, ...state.selectedCourses], 'id'),
    cells: lodash.uniqBy([...courseCells, ...state.cells], 'id'),
  };
};

const offHoverCourseReducer = (state, action) => {
  const otherSelectedCourses = state.selectedCourses.filter(
    (sc) => sc.id !== action.data.id && sc.clicked !== false
  );
  const courseCells = action.data.cellIds.map((id) => {
    let cell = state.cells.find((c) => c.id === id);
    return {
      ...cell,
      courses: [...cell.courses.filter((c) => c.id !== action.data.id)],
    };
  });
  return {
    ...state,
    selectedCourses: lodash.uniqBy([...otherSelectedCourses]),
    cells: lodash.uniqBy([...courseCells, ...state.cells], 'id'),
  };
};

// WHITELIST BLACKLIST

const addWhiteTimeCellReducer = (state, action) => {
  return {
    ...state,
    findTime: lodash.uniqBy([action.data.time, ...state.findTime], 'id'),
    notFindTime: state.notFindTime.filter((t) => t.id !== action.data.time.id),
    cells: lodash.uniqBy([action.data.cell, ...state.cells], 'id'),
  };
};

const addBlackTimeCellReducer = (state, action) => {
  return {
    ...state,
    findTime: state.findTime.filter((t) => t.id !== action.data.time.id),
    notFindTime: lodash.uniqBy([action.data.time, ...state.notFindTime], 'id'),
    cells: lodash.uniqBy([action.data.cell, ...state.cells], 'id'),
  };
};

const resetTimeFromCellReducer = (state, action) => {
  return {
    ...state,
    findTime: state.findTime.filter((t) => t.id !== action.data.time.id),
    notFindTime: state.notFindTime.filter((t) => t.id !== action.data.time.id),
    cells: lodash.uniqBy([action.data.cell, ...state.cells], 'id'),
  };
};

const loadCurrentSaveReducer = (state, action) => {
  return {
    ...state,
    ...action.data,
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

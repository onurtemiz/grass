import allService from '../services/all';
import coursesServices from '../services/courses';
import { toast } from 'react-toastify';
import lodash from 'lodash';
import { getIdByDayHour } from '../utils/utils';
const getCells = () => {
  let cells = [];
  let id = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {
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
};

export function compareDays(a, b) {
  if (a.day < b.day) {
    return -1;
  }
  if (a.day > b.day) {
    return 1;
  }
  return 0;
}

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
      return { ...state, selectedCourses };
    case 'REMOVE_SELECTED_COURSE':
      const otherSelectedCourses = state.selectedCourses.filter(
        (c) => c.id !== action.data.id
      );
      return { ...state, selectedCourses: otherSelectedCourses };
    case 'SET_CELL':
      const otherCells = state.cells.filter((c) => c.id !== action.data.id);
      return {
        ...state,
        cells: [...otherCells, action.data]
          .sort((a, b) => b.time - a.time)
          .sort(compareDays),
      };
    case 'FIND_TIME_CELL':
      const otherCells1 = state.cells.filter(
        (c) => c.id !== action.data.cell.id
      );
      const findTime = state.findTime.concat(action.data.time);
      return {
        ...state,
        findTime,
        cells: [...otherCells1, action.data.cell]
          .sort((a, b) => b.time - a.time)
          .sort(compareDays),
      };
    case 'RESET_TIME_CELL':
      const otherCells2 = state.cells.filter((c) => c.id !== action.data.id);
      const lostTime = state.findTime.filter((t) => t !== action.data.id);
      return {
        ...state,
        findTime: lostTime,
        cells: [...otherCells2, action.data]
          .sort((a, b) => b.time - a.time)
          .sort(compareDays),
      };
    default:
      return state;
  }
};

export const addSelectedCourse = (course, hover) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_SELECTED_COURSE',
      data: { ...course, hover },
    });
  };
};

export const removeSelectedCourse = (course) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_SELECTED_COURSE',
      data: course,
    });
  };
};

export const setCell = (cell) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_CELL',
      data: cell,
    });
  };
};

export const findTimeCell = (cell) => {
  return async (dispatch) => {
    dispatch({
      type: 'FIND_TIME_CELL',
      data: {
        time: cell.id,
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
        ...cell,
        timeFind: null,
        color: null,
      },
    });
  };
};

export const searchCourse = (search,findTime) => {
  return async (dispatch) => {
    let courses = await coursesServices.searchCourse(search,findTime);
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
      return { ...c, hover: false };
    });
    dispatch({
      type: 'SEARCH_COURSES',
      data: courses,
    });
  };
};

export default courseReducer;

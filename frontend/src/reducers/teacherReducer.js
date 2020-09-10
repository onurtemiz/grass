/* eslint-disable default-case */
import teachersService from '../services/teachers';
import { toast } from 'react-toastify';
import lodash from 'lodash';
const initialState = {
  teachers: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 50,
};
const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_TEACHER':
      const uniq = lodash.uniqBy(
        [...state.teachers, ...action.data.teachers],
        'name'
      );
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        teachers: uniq,
      };
      return currentState;
    case 'GET_TEACHER_PAGE':
      const t = state.teachers.find((te) => te.name === action.data.name);
      if (t === undefined) {
        const uniq = lodash.uniqBy([...state.teachers, action.data], 'name');
        return { ...state, teachers: uniq };
      } else {
        return {
          ...state,
          teachers: state.teachers.map((t) =>
            t.name === action.data.name ? action.data : t
          ),
        };
      }
    case 'TOTAL_TEACHER':
      const total = action.data;
      return { ...state, total: total };
    case 'RESET_TEACHERS':
      return initialState;
    default:
      return state;
  }
};

export const addInfTeacher = (start, count, filter, first, fetching) => {
  return async (dispatch) => {
    fetching.current = true;

    let teachers = await teachersService.addInf(start, count, filter);
    if (teachers.error) {
      toast.error(`${teachers.error}`, {
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
    const total = await teachersService.getTotalTeacher(filter);
    const data = {
      hasMore: true,
      count: count,
      start: start + count,
      teachers: teachers,
      total: total.total,
    };
    if (total.total === 0 || total.total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }

    dispatch({
      type: 'ADD_INF_TEACHER',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export const getTeacherPage = (name) => {
  return async (dispatch) => {
    const teacher = await teachersService.getTeacherPage(name);
    if (teacher.error) {
      toast.error(`${teacher.error}`, {
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
      type: 'GET_TEACHER_PAGE',
      data: teacher,
    });
  };
};

export default teacherReducer;

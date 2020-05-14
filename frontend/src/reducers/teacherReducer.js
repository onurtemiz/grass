/* eslint-disable default-case */
import teachersService from '../services/teachers';
import lodash from 'lodash';
const initialState = { teachers: [], total: 0 };
const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF':
      const uniq = lodash.uniqBy([...state.teachers, ...action.data], 'name');
      const currentState = { ...state, teachers: uniq };
      return currentState;
    case 'GET_TEACHER_PAGE':
      const t = state.teachers.find((te) => te.name === action.data.name);
      if (t === undefined) {
        const uniq = lodash.uniqBy([...state.teachers, ...action.data], 'name');
        return { ...state, teachers: uniq };
      } else {
        console.log('action.data.name', action.data.name);
        return state.teachers.map((t) =>
          t.name === action.data.name ? action.data : t
        );
      }
    case 'TOTAL_TEACHER':
      const total = action.data;
      return { ...state, total: total };
    default:
      return state;
  }
};

export const addInfTeacher = (start, count, setHasMore, setStart) => {
  return async (dispatch) => {
    const teachers = await teachersService.addInf(start, count);
    setStart(start + count);
    setHasMore(true);
    dispatch({
      type: 'ADD_INF',
      data: teachers,
    });
  };
};

export const totalTeacher = () => {
  return async (dispatch) => {
    const total = await teachersService.getTotalTeacher();
    dispatch({
      type: 'TOTAL_TEACHER',
      data: total,
    });
  };
};

export const getTeacherPage = (name) => {
  return async (dispatch) => {
    const teacher = await teachersService.getTeacherPage(name);

    dispatch({
      type: 'GET_TEACHER_PAGE',
      data: teacher,
    });
  };
};

export default teacherReducer;

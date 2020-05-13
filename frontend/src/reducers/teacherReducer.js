/* eslint-disable default-case */
import teachersService from '../services/teachers';

const teacherReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_INF':
      return [...state, ...action.data];
    default:
      return state;
  }
};

export const addInfTeacher = (start, count) => {
  return async (dispatch) => {
    const teachers = await teachersService.addInf(start, count);
    dispatch({
      type: 'ADD_INF',
      data: teachers,
    });
  };
};

export default teacherReducer;

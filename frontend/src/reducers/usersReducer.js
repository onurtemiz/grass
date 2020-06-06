import loginService from '../services/login';
import signupService from '../services/signup';
import commentsService from '../services/comments';
import userService from '../services/user';
import { setToken } from '../utils/token';
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULATED_USER':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getPopulatedUser = (username) => {
  return async (dispatch) => {
    const user = await userService.getPopulatedUser(username);
    dispatch({
      type: 'SET_POPULATED_USER',
      data: user,
    });
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    const user = await userService.getUserById(id);
    dispatch({
      type: 'SET_POPULATED_USER',
      data: user,
    });
  };
};

export default usersReducer;

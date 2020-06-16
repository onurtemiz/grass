import loginService from '../services/login';
import signupService from '../services/signup';
import commentsService from '../services/comments';
import userService from '../services/user';
import { setToken } from '../utils/token';
import { toast } from 'react-toastify';

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
    if (user.error) {
      toast.error(`${user.error}`, {
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
      type: 'SET_POPULATED_USER',
      data: user,
    });
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    const user = await userService.getUserById(id);
    if (user.error) {
      toast.error(`${user.error}`, {
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
      type: 'SET_POPULATED_USER',
      data: user,
    });
  };
};

export default usersReducer;

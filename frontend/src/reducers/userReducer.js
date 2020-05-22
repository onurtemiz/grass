import loginService from '../services/login';
import signupService from '../services/signup';
import commentsService from '../services/comments';
import userService from '../services/user';
import { setToken } from '../utils/token';
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'UPDATE_USER':
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const updateUser = (u, setEdited, setCurrentPasswordError) => {
  return async (dispatch) => {
    const user = await userService.updateUser(u);
    if (user.error) {
      setEdited(null);
      setCurrentPasswordError(user.error);
      return;
    }
    window.localStorage.setItem('grassUser', JSON.stringify(user));
    setToken(user.token);

    dispatch({
      type: 'UPDATE_USER',
      data: user,
    });
    setEdited('finished');
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('grassUser');
    dispatch({
      type: 'SET_USER',
      data: null,
    });
  };
};

export const setUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const loginUser = (userInfo, setEmailError) => {
  return async (dispatch) => {
    const user = await loginService.login(userInfo);
    if (user.error) {
      setEmailError(user.error);
      return;
    }
    window.localStorage.setItem('grassUser', JSON.stringify(user));
    setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const signupUser = (userInfo) => {
  return async (dispatch) => {
    await signupService.signup(userInfo);
    const user = await loginService.login({
      email: userInfo.email,
      password: userInfo.password,
    });
    window.localStorage.setItem('grassUser', JSON.stringify(user));
    setToken(user.token);

    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export default userReducer;

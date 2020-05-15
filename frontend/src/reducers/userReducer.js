import loginService from '../services/login';
import signupService from '../services/signup';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
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

export const loginUser = (userInfo) => {
  return async (dispatch) => {
    const user = await loginService.login(userInfo);
    window.localStorage.setItem('grassUser', JSON.stringify(user));
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
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export default userReducer;

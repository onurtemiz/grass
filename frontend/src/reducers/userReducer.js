import loginService from '../services/login';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
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

export default userReducer;

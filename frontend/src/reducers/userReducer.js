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
      const updatedUser = { ...state, ...action.data };
      return updatedUser;
    case 'FOLLOW_LESSON':
      const followedLessons = [...state.following, action.data];

      const followedState = { ...state, following: followedLessons };
      return followedState;
    case 'UNFOLLOW_LESSON':
      const unfollowed = state.following.filter((id) => id !== action.data);

      return { ...state, following: unfollowed };
    default:
      return state;
  }
};

export const followLesson = (user, id) => {
  return async (dispatch) => {
    await userService.followLesson(id);
    dispatch({
      type: 'FOLLOW_LESSON',
      data: id,
    });
    user.following.push(id);
    window.localStorage.setItem('grassUser', JSON.stringify(user));
  };
};

export const unfollowLesson = (user, id) => {
  return async (dispatch) => {
    await userService.unfollowLesson(id);
    dispatch({
      type: 'UNFOLLOW_LESSON',
      data: id,
    });
    user = { ...user, following: user.following.filter((uId) => uId !== id) };
    window.localStorage.setItem('grassUser', JSON.stringify(user));
  };
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

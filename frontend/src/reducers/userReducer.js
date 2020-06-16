import loginService from '../services/login';
import signupService from '../services/signup';
import commentsService from '../services/comments';
import userService from '../services/user';
import { setToken } from '../utils/token';
import { toast } from 'react-toastify';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MAIN_USER':
      return { ...state, ...action.data };
    case 'SET_USER':
      return action.data;
    case 'UPDATE_USER':
      console.log('state', state);
      console.log('action.data', action.data);
      const updatedUser = { ...state, ...action.data };
      console.log('ipdatedState', updatedUser);
      console.log('state===updatedUser', state === updatedUser);
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
    const res = await userService.followLesson(id);
    if (res.error) {
      toast.error(`${res.error}`, {
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
      type: 'FOLLOW_LESSON',
      data: id,
    });
    user.following.push(id);
    window.localStorage.setItem('grassUser', JSON.stringify(user));
  };
};

export const unfollowLesson = (user, id) => {
  return async (dispatch) => {
    const res = await userService.unfollowLesson(id);
    if (res.error) {
      toast.error(`${res.error}`, {
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
      type: 'UNFOLLOW_LESSON',
      data: id,
    });
    user = { ...user, following: user.following.filter((uId) => uId !== id) };
    window.localStorage.setItem('grassUser', JSON.stringify(user));
  };
};

export const updateUser = (u, setEdited) => {
  return async (dispatch) => {
    const user = await userService.updateUser(u);
    if (user.error) {
      setEdited(null);
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
    console.log('user', user);
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

export const loginUser = (userInfo) => {
  return async (dispatch) => {
    const user = await loginService.login(userInfo);
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
    window.localStorage.setItem('grassUser', JSON.stringify(user));
    setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
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
      type: 'SET_MAIN_USER',
      data: user,
    });
  };
};

export const signupUser = (userInfo) => {
  return async (dispatch) => {
    const res = await signupService.signup(userInfo);
    if (res.error) {
      toast.error(`${res.error}`, {
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
    const user = await loginService.login({
      email: userInfo.email,
      password: userInfo.password,
    });
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
    window.localStorage.setItem('grassUser', JSON.stringify(user));
    setToken(user.token);

    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export default userReducer;

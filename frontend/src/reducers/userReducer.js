import loginService from '../services/login';
import signupService from '../services/signup';
import commentsService from '../services/comments';
import userService from '../services/user';
import { setToken } from '../utils/token';
import { toast } from 'react-toastify';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LIKES':
      return action.data;
    case 'SET_USER':
      return action.data;
    case 'UPDATE_USER':
      const updatedUser = { ...state, ...action.data };
      return updatedUser;
    case 'FOLLOW_LESSON':
      const followedLessons = [...state.following, action.data];
      const followedState = { ...state, following: followedLessons };
      return followedState;
    case 'FOLLOW_COURSE':
      const followedStateCourses = {
        ...state,
        followingCourses: [
          ...state.followingCourses.filter((id) => id !== action.data),
          action.data,
        ],
      };
      return followedStateCourses;
    case 'UNFOLLOW_COURSE':
      const unFollowedStateCourses = {
        ...state,
        followingCourses: [
          ...state.followingCourses.filter((id) => id !== action.data),
        ],
      };
      return unFollowedStateCourses;
    case 'UNFOLLOW_LESSON':
      const unfollowed = state.following.filter((id) => id !== action.data);
      return { ...state, following: unfollowed };
    case 'CHANGE_ICON':
      return { ...state, iconName: action.data };
    case 'CHECK_ACHIEVEMENT':
      return { ...state, achievements: action.data };
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
    user = {
      ...user,
      following: [...user.following.filter((uId) => uId !== id), id],
    };
    setLocaleUser(user);
  };
};

export const changeIcon = (iconName, iconCode) => {
  return async (dispatch) => {
    const res = await userService.changeIcon(iconName, iconCode);
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
      type: 'CHANGE_ICON',
      data: iconName,
    });
    const jsonUser = JSON.parse(window.localStorage.getItem('grassUser'));
    window.localStorage.setItem(
      'grassUser',
      JSON.stringify({ ...jsonUser, iconName })
    );
  };
};

export const checkAchievement = () => {
  return async (dispatch) => {
    const achievements = await userService.checkAchievement();
    if (achievements.error) {
      toast.error(`${achievements.error}`, {
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
      type: 'CHECK_ACHIEVEMENT',
      data: achievements,
    });
    const jsonUser = JSON.parse(window.localStorage.getItem('grassUser'));
    window.localStorage.setItem(
      'grassUser',
      JSON.stringify({ ...jsonUser, achievements })
    );
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
    setLocaleUser(user);
  };
};

export const followCourse = (user, courseId) => {
  return async (dispatch) => {
    const res = await userService.followCourse(courseId);
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
      type: 'FOLLOW_COURSE',
      data: courseId,
    });
    user = {
      ...user,
      followingCourses: [
        ...user.followingCourses.filter((uId) => uId !== courseId),
        courseId,
      ],
    };
    setLocaleUser(user);
  };
};

export const unFollowCourse = (user, courseId) => {
  return async (dispatch) => {
    const res = await userService.followCourse(courseId);
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
      type: 'UNFOLLOW_COURSE',
      data: courseId,
    });
    user = {
      ...user,
      followingCourses: [
        ...user.followingCourses.filter((uId) => uId !== courseId),
      ],
    };
    setLocaleUser(user);
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
    setLocaleUser(user);
    setToken(user.token);

    dispatch({
      type: 'UPDATE_USER',
      data: user,
    });
    setEdited('finished');
  };
};

export const updateDepSemInfo = (data, setIsLoading, setIsOpen) => {
  return async (dispatch) => {
    const user = await userService.updateDepSemInfo(data, setIsLoading);
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
    setLocaleUser(user);
    dispatch({
      type: 'UPDATE_USER',
      data: user,
    });
    setIsOpen(false);
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

export const loginUser = (userInfo, setLoading) => {
  return async (dispatch) => {
    const user = await loginService.login(userInfo);
    if (user.error || user.message) {
      toast.error(`${user.error || user.message}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    setLocaleUser(user);
    setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
    setLoading(false);
  };
};

export const sawModal = () => {
  return async (dispatch) => {
    const user = await userService.sawModal();
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
      type: 'SET_USER',
      data: user,
    });
    setLocaleUser(user);
  };
};

export const getPopulatedMainUser = () => {
  return async (dispatch) => {
    const user = await userService.getPopulatedMainUser();
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
      type: 'SET_LIKES',
      data: user,
    });
    setLocaleUser(user);
  };
};

export const verifyUser = (verifyToken, u, setSituation) => {
  return async (dispatch) => {
    const res = await signupService.verify(verifyToken, u);
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
      setSituation('failed');
      return;
    }
    setSituation('success');
  };
};

export const forgotPassword = (email, setLoading) => {
  return async (dispatch) => {
    const res = await signupService.forgotPassword(email);
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
    } else {
      toast.success(`Onay linki epostanıza gönderilmiştir.`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  };
};

export const resetPassword = (password, code, u, setSucess) => {
  return async (dispatch) => {
    const res = await signupService.resetPassword(password, code, u);
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
    } else {
      setSucess(true);
    }
  };
};

export const signupUser = (userInfo, setLoading, setSend) => {
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
    } else {
      toast.success(`Aktivasyon linki emailinize yollandı`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSend(true);
    }
    setLoading(false);
  };
};

export default userReducer;
function setLocaleUser(user) {
  const jsonUser = JSON.parse(window.localStorage.getItem('grassUser'));
  window.localStorage.setItem(
    'grassUser',
    JSON.stringify({ ...jsonUser, ...user })
  );
}

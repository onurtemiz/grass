import allService from '../services/all';
import lessonsService from '../services/lessons';
import { toast } from 'react-toastify';
import lodash from 'lodash';
const initialState = {
  all: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
};

const allReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_ALL':
      const uniqAll = lodash.uniqBy([...state.all, ...action.data.all], 'id');
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,

        all: uniqAll,
      };
      return currentState;
    case 'GET_LESSON_PAGE':
      const uniqGetLesson = lodash.uniqBy([...state.all, action.data], 'id');
      const newState = {
        ...state,
        all: uniqGetLesson,
      };
      return newState;
    case 'TOTAL_ALL':
      const totalc = action.data;
      return { ...state, total: totalc };

    default:
      return state;
  }
};

export const addInfAll = (start, count, filter) => {
  return async (dispatch) => {
    const total = await allService.getTotal(filter);
    const all = await allService.addInf(start, count, filter);
    if (all.error) {
      toast.error(`${all.error}`, {
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
    let data = {
      hasMore: true,
      start: start + count,
      all: all,
      total: total.total,
      count: count,
    };
    if (total.total === 0 || total.total < start) {
      data.hasMore = false;
      data.start = 0;
    }

    dispatch({
      type: 'ADD_INF_ALL',
      data: data,
    });
  };
};

export const getLessonPageByName = (areaCode, digitCode, teacherName) => {
  return async (dispatch) => {
    const lesson = await lessonsService.getLessonPageByName(
      areaCode,
      digitCode,
      teacherName
    );
    if (lesson.error) {
      toast.error(`${lesson.error}`, {
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
      type: 'GET_LESSON_PAGE',
      data: lesson,
    });
  };
};

export const getLessonPageById = (areaCode, digitCode, teacherId) => {
  return async (dispatch) => {
    const lesson = await lessonsService.getLessonPageById(
      areaCode,
      digitCode,
      teacherId
    );
    if (lesson.error) {
      toast.error(`${lesson.error}`, {
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
      type: 'GET_LESSON_PAGE',
      data: lesson,
    });
  };
};

export const getLessonById = (id) => {
  return async (dispatch) => {
    const lesson = await lessonsService.getLessonById(id);
    if (lesson.error) {
      toast.error(`${lesson.error}`, {
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
      type: 'GET_LESSON_PAGE',
      data: lesson,
    });
  };
};

export default allReducer;

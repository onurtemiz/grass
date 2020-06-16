import lessonsService from '../services/lessons';
import lodash from 'lodash';
import { toast } from 'react-toastify';
const initialState = {
  lessons: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_LESSON':
      const uniqLessons = lodash.uniqBy(
        [...state.lessons, ...action.data.lessons],
        'id'
      );
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,

        lessons: uniqLessons,
      };
      return currentState;
    case 'TOTAL_LESSON':
      const totalc = action.data;
      return { ...state, total: totalc };
    case 'RESET_LESSONS':
      return initialState;
    default:
      return state;
  }
};

export const addInfLesson = (start, count, filter) => {
  return async (dispatch) => {
    const lessons = await lessonsService.addInf(start, count, filter);
    if (lessons.error) {
      toast.error(`${lessons.error}`, {
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
    const total = await lessonsService.getTotalLesson(filter);
    let data = {
      hasMore: true,
      start: start + count,
      lessons: lessons,
      total: total.total,
      count: count,
    };
    if (total.total === 0 || total.total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }

    dispatch({
      type: 'ADD_INF_LESSON',
      data: data,
    });
  };
};

export default lessonReducer;

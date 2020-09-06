import lessonsService from '../services/lessons';
import lodash from 'lodash';
import { toast } from 'react-toastify';
const initialState = {
  lessons: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 50,
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

export const addInfLesson = (start, count, filter, first, fetching) => {
  return async (dispatch) => {
    fetching.current = true;

    const res = await lessonsService.addInf(start, count, filter);
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
    let { lessons, total } = res;
    let data = {
      hasMore: true,
      start: start + count,
      lessons: lessons,
      total: total,
    };
    if (total === 0 || total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }

    dispatch({
      type: 'ADD_INF_LESSON',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export default lessonReducer;

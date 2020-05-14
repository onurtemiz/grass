import lessonsService from '../services/lessons';
import lodash from 'lodash';
const initialState = { lessons: [], total: 0 };

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_LESSON':
      const uniq = lodash.uniqBy([...state.lessons, ...action.data], 'id');
      const currentState = { ...state, lessons: uniq };
      return currentState;
    case 'GET_LESSON_PAGE':
      const l = state.lessons.find((le) => le.id === action.data.id);
      if (l === undefined) {
        const uniq = lodash.uniqBy([...state.lessons, action.data], 'id');
        return { ...state, lessons: uniq };
      } else {
        return {
          ...state,
          lessons: state.lessons.map((l) =>
            l.id === action.data.id ? action.data : l
          ),
        };
      }
    case 'TOTAL_LESSON':
      const total = action.data;
      return { ...state, total: total };
    case 'RESET_LESSONS':
      return initialState;
    default:
      return state;
  }
};

export const addInfLesson = (start, count, setHasMore, setStart, filter) => {
  return async (dispatch) => {
    const lessons = await lessonsService.addInf(start, count, filter);
    setStart(start + count);
    setHasMore(true);
    dispatch({
      type: 'ADD_INF_LESSON',
      data: lessons,
    });
  };
};

export const totalLesson = (filter) => {
  return async (dispatch) => {
    const total = await lessonsService.getTotalLesson(filter);
    dispatch({
      type: 'TOTAL_LESSON',
      data: total.total,
    });
  };
};

export const getLessonPage = (areaCode, digitCode, sectionCode) => {
  return async (dispatch) => {
    const lesson = await lessonsService.getLessonPage(
      areaCode,
      digitCode,
      sectionCode
    );
    dispatch({
      type: 'GET_LESSON_PAGE',
      data: lesson,
    });
  };
};

export const resetLessons = () => {
  return (dispatch) => {
    dispatch({
      type: 'RESET_LESSONS',
    });
  };
};

export default lessonReducer;

import questionsService from '../services/questions';
import { toast } from 'react-toastify';
import lodash from 'lodash';
const initialState = {
  questions: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
  filter: 'mostRecent',
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_QUESTIONS':
      const uniqQuestions = lodash.uniqBy(
        [...state.questions, ...action.data.questions],
        'id'
      );
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,
        questions: uniqQuestions,
      };
      return currentState;
    case 'GET_QUESTION_PAGE':
      const uniqQetQuestion = lodash.uniqBy(
        [...state.questions, action.data],
        'id'
      );
      const newState = {
        ...state,
        questions: uniqQetQuestion,
      };
      return newState;
    case 'CHANGE_QUESTION_SORT':
      const filteredState = { ...state, filter: action.data };
      return filteredState;
    default:
      return state;
  }
};

export const changeSort = (sort) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_QUESTION_SORT',
      data: sort,
    });
  };
};

export const addInfQuestions = (
  start,
  count,
  filter,
  first,
  fetching,
  sorting
) => {
  fetching.current = true;
  return async (dispatch) => {
    const questions = await questionsService.addInf(
      start,
      count,
      filter,
      sorting
    );
    if (questions.error) {
      toast.error(`${questions.error}`, {
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
      questions: questions.questions,
      total: questions.total,
      count: count,
    };
    if (questions.total === 0 || questions.total < start) {
      data.hasMore = false;
      data.start = 0;
    }

    dispatch({
      type: 'ADD_INF_QUESTIONS',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export const getQuestionById = (id) => {
  return async (dispatch) => {
    const question = await questionsService.getQuestionById(id);
    if (question.error) {
      toast.error(`${question.error}`, {
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
      type: 'GET_QUESTION_PAGE',
      data: question,
    });
  };
};

export default questionReducer;

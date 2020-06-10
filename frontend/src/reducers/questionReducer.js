import questionsService from '../services/questions';

import lodash from 'lodash';
const initialState = {
  questions: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
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

    default:
      return state;
  }
};

export const addInfQuestions = (start, count, filter) => {
  return async (dispatch) => {
    const questions = await questionsService.addInf(start, count, filter);
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
  };
};

export const getQuestionById = (id) => {
  return async (dispatch) => {
    const question = await questionsService.getQuestionById(id);
    dispatch({
      type: 'GET_QUESTION_PAGE',
      data: question,
    });
  };
};

export default questionReducer;

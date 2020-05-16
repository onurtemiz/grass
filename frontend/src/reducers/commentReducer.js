import commentsService from '../services/comments';
import lodash from 'lodash';

const initialState = {
  comments: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_COMMENT':
      const uniqComments = lodash.uniqBy(
        [...state.comments, ...action.data.comments],
        'id'
      );
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,
        comments: uniqComments,
      };
      return currentState;
    case 'ADD_COMMENT':
      const addedComments = state.comments.filter(
        (c) => c.id !== action.data.id
      );
      console.log('addedComments', addedComments);
      console.log('currentState', state);
      console.log('action.data', action.data);
      return {
        ...state,
        comments: [...addedComments, action.data],
      };
    case 'UPDATE_COMMENT':
      const updatedComments = state.comments.filter(
        (c) => c.id !== action.data.id
      );
      return {
        ...state,
        comments: [...updatedComments, action.data],
      };
    default:
      return state;
  }
};

export const postComment = (c) => {
  return async (dispatch) => {
    const comment = await commentsService.postComment(c);
    dispatch({
      type: 'ADD_COMMENT',
      data: comment,
    });
  };
};

export const updateComment = (c, id) => {
  return async (dispatch) => {
    const comment = await commentsService.updateComment(c, id);
    dispatch({
      type: 'UPDATE_COMMENT',
      data: comment,
    });
  };
};

export const totalCommentTeacher = (teacherId) => {
  return async (dispatch) => {
    const total = await commentsService.getTotalCommentsTeacher(teacherId);
    dispatch({
      type: 'TOTAL_COMMENT',
      data: total.total,
    });
  };
};

export const totalCommentLesson = (lessonId) => {
  return async (dispatch) => {
    const total = await commentsService.getTotalCommentsLesson(lessonId);
    dispatch({
      type: 'TOTAL_COMMENT',
      data: total.total,
    });
  };
};

export const addInfCommentTeacher = (start, count, teacherId) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfTeacher(
      start,
      count,
      teacherId
    );
    const total = await commentsService.getTotalCommentsTeacher(teacherId);
    let data = {
      hasMore: true,
      start: start + count,
      comments: comments,
      total: total.total,
      count: count,
    };
    if (total.total === 0 || total.total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }
    dispatch({
      type: 'ADD_INF_COMMENT',
      data: data,
    });
  };
};

export const addInfCommentLesson = (start, count, lessonId) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfLesson(start, count, lessonId);
    const total = await commentsService.getTotalCommentsLesson(lessonId);
    let data = {
      hasMore: true,
      start: start + count,
      comments: comments,
      total: total.total,
      count: count,
    };
    if (total.total === 0 || total.total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }
    dispatch({
      type: 'ADD_INF_COMMENT',
      data: data,
    });
  };
};

export default commentReducer;

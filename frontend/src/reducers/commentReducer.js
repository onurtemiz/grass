import commentsService from '../services/comments';
import lodash from 'lodash';

const initialState = {
  comments: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
  filter: 'mostRecent',
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
      return {
        ...state,
        comments: [...addedComments, action.data],
      };
    case 'UPDATE_COMMENT':
      const updatedComments = state.comments.filter(
        (c) => c.id !== action.data.id
      );
      const updatedNewComments = updatedComments.concat(action.data);
      const updatedState = {
        ...state,
        comments: updatedNewComments,
      };
      return updatedState;
    case 'LIKE_COMMENT':
      state.comments = state.comments.filter((c) => c.id !== action.data.id);
      const likedComments = state.comments.concat(action.data);
      return {
        ...state,
        comments: likedComments,
      };
    case 'REMOVE_COMMENT':
      const removedComments = state.comments.filter(
        (c) => c.id !== action.data
      );
      return {
        ...state,
        comments: [...removedComments],
      };
    case 'SORT_COMMENT':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const sortComment = (option) => {
  return async (dispatch) => {
    const state = {
      total: 0,
      hasMore: true,
      start: 0,
      comments: [],
      filter: option,
    };
    dispatch({
      type: 'SORT_COMMENT',
      data: state,
    });
  };
};

export const postComment = (c, setValue, setIsLoading) => {
  return async (dispatch) => {
    const comment = await commentsService.postComment(c);
    dispatch({
      type: 'ADD_COMMENT',
      data: comment,
    });
    setValue('');
    setIsLoading(false);
  };
};

export const updateComment = (c, id, setIsUpdate, setIsLoading) => {
  return async (dispatch) => {
    const comment = await commentsService.updateComment(c, id);
    dispatch({
      type: 'UPDATE_COMMENT',
      data: comment,
    });
    setIsLoading(false);
    setIsUpdate(false);
  };
};

export const likeComment = (id) => {
  return async (dispatch) => {
    const comment = await commentsService.likeComment(id);
    dispatch({
      type: 'LIKE_COMMENT',
      data: comment,
    });
  };
};

export const removeComment = (id) => {
  return async (dispatch) => {
    await commentsService.removeComment(id);
    dispatch({
      type: 'REMOVE_COMMENT',
      data: id,
    });
  };
};

export const totalCommentById = (id) => {
  return async (dispatch) => {
    const total = await commentsService.getTotalCommentsById(id);
    dispatch({
      type: 'TOTAL_COMMENT',
      data: total.total,
    });
  };
};

export const addInfCommentAll = (start, count, filter) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfCommentsAll(
      start,
      count,
      filter
    );
    const total = await commentsService.getTotalCommentsAll(filter);
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

export const addInfCommentById = (start, count, id, filter) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfCommentsById(
      start,
      count,
      id,
      filter
    );
    const total = await commentsService.getTotalCommentsById(id, filter);
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

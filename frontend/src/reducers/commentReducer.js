import commentsService from '../services/comments';
import lodash from 'lodash';
import { toast } from 'react-toastify';
const initialState = {
  comments: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
  filter: 'mostRecent',
  daySort: 'lastMonth',
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMMENT_BY_ID':
      const idComments = lodash.uniqBy([...state.comments, action.data], 'id');
      const idState = {
        ...state,
        comments: idComments,
      };
      return idState;
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
    case 'DAY_SORT_COMMENT':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const daySortComment = (option) => {
  return async (dispatch) => {
    const state = {
      total: 0,
      hasMore: true,
      start: 0,
      comments: [],
      daySort: option,
    };
    dispatch({
      type: 'DAY_SORT_COMMENT',
      data: state,
    });
  };
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

export const postComment = (c, reset, setTools, setIsLoading) => {
  return async (dispatch) => {
    const comment = await commentsService.postComment(c);
    if (comment.error) {
      toast.error(`${comment.error}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
      setTools(false);
      setIsLoading(false);
      return;
    }
    dispatch({
      type: 'ADD_COMMENT',
      data: comment,
    });
    reset();
    setTools(false);
    setIsLoading(false);
  };
};

export const updateComment = (c, id, setIsUpdate, setIsLoading) => {
  return async (dispatch) => {
    const comment = await commentsService.updateComment(c, id);
    if (comment.error) {
      toast.error(`${comment.error}`, {
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
    if (comment.error) {
      toast.error(`${comment.error}`, {
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
      type: 'LIKE_COMMENT',
      data: comment,
    });
  };
};

export const removeComment = (id) => {
  return async (dispatch) => {
    const res = await commentsService.removeComment(id);
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
      type: 'REMOVE_COMMENT',
      data: id,
    });
  };
};

export const addInfCommentAll = (
  start,
  count,
  filter,
  first,
  fetching,
  daySort
) => {
  fetching.current = true;
  return async (dispatch) => {
    const res = await commentsService.addInfCommentsAll(
      start,
      count,
      filter,
      daySort
    );
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
    let { comments, total } = res;
    let data = {
      hasMore: true,
      start: start + count,
      comments: comments,
      total: total,
      count: count,
    };
    if (total === 0 || total < start) {
      data.hasMore = false;
      data.start = 0;
    }
    dispatch({
      type: 'ADD_INF_COMMENT',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export const addInfCommentById = (
  start,
  count,
  id,
  filter,
  first,
  fetching,
  daySort
) => {
  return async (dispatch) => {
    fetching.current = true;
    const res = await commentsService.addInfCommentsById(
      start,
      count,
      id,
      filter,
      daySort
    );
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
    let { comments, total } = res;
    let data = {
      hasMore: true,
      start: start + count,
      comments: comments,
      total: total,
      count: count,
    };
    if (total === 0 || total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }
    dispatch({
      type: 'ADD_INF_COMMENT',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export const getCommentById = (id) => {
  return async (dispatch) => {
    const comment = await commentsService.getCommentById(id);
    if (comment.error) {
      toast.error(`${comment.error}`, {
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
      type: 'GET_COMMENT_BY_ID',
      data: comment,
    });
  };
};

export const addInfCommentFeed = (
  start,
  count,
  filter,
  first,
  fetching,
  daySort
) => {
  return async (dispatch) => {
    fetching.current = true;
    const res = await commentsService.addInfCommentsFeed(
      start,
      count,
      filter,
      daySort
    );
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
    const { comments, total } = res;
    let data = {
      hasMore: true,
      start: start + count,
      comments: comments,
      total: total,
      count: count,
    };
    if (total === 0 || total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }
    dispatch({
      type: 'ADD_INF_COMMENT',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export default commentReducer;

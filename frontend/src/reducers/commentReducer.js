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
      return {
        ...state,
        comments: [...updatedComments, action.data],
      };
    case 'LIKE_COMMENT':
      const likedComments = state.comments.filter(
        (c) => c.id !== action.data.id
      );
      return {
        ...state,
        comments: [...likedComments, action.data],
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
      const sortedComments = lodash.uniqBy(
        [...state.comments, ...action.data.comments],
        'id'
      );

      return {
        ...state,
        comments: sortedComments,
        start: 20,
        filter: action.data.option,
      };
    default:
      return state;
  }
};

export const sortComment = (option) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfCommentsAll(0, 20, option);
    dispatch({
      type: 'SORT_COMMENT',
      data: { option, comments },
    });
  };
};

export const postComment = (c, setValue) => {
  return async (dispatch) => {
    const comment = await commentsService.postComment(c);
    dispatch({
      type: 'ADD_COMMENT',
      data: comment,
    });
    setValue('');
  };
};

export const updateComment = (c, id, setIsUpdate) => {
  return async (dispatch) => {
    const comment = await commentsService.updateComment(c, id);
    setIsUpdate(false);
    dispatch({
      type: 'UPDATE_COMMENT',
      data: comment,
    });
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

export const addInfCommentUser = (start, count, userId, filter) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfCommentsUser(
      start,
      count,
      userId,
      filter
    );
    const total = await commentsService.getTotalCommentsUser(userId, filter);
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
export const addInfCommentTeacher = (start, count, teacherId, filter) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfTeacher(
      start,
      count,
      teacherId,
      filter
    );
    const total = await commentsService.getTotalCommentsTeacher(
      teacherId,
      filter
    );
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

export const addInfCommentLesson = (start, count, lessonId, filter) => {
  return async (dispatch) => {
    const comments = await commentsService.addInfLesson(
      start,
      count,
      lessonId,
      filter
    );
    const total = await commentsService.getTotalCommentsLesson(
      lessonId,
      filter
    );
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
    console.log('data', data);
    dispatch({
      type: 'ADD_INF_COMMENT',
      data: data,
    });
  };
};

export default commentReducer;

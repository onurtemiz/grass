/* eslint-disable default-case */
import tipsService from '../services/tips';
import lodash from 'lodash';
import { toast } from 'react-toastify';
const initialState = {
  tips: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
  filter: 'mostRecent',
};

const tipReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_TIP':
      const uniq = lodash.uniqBy([...state.tips, ...action.data.tips], 'tip');
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,
        tips: uniq,
      };
      return currentState;
    case 'LIKE_TIP':
      const olderState = state.tips.filter((t) => t.id !== action.data.id);
      const newState = olderState.concat(action.data);
      return { ...state, tips: newState };
    case 'CHANGE_TIP_SORT':
      const filteredState = { ...state, filter: action.data };
      return filteredState;
    default:
      return state;
  }
};

export const changeSort = (sort) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_TIP_SORT',
      data: sort,
    });
  };
};

export const likeTip = (id) => {
  return async (dispatch) => {
    const tip = await tipsService.likeTip(id);
    if (tip.error) {
      toast.error(`${tip.error}`, {
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
      type: 'LIKE_TIP',
      data: tip,
    });
  };
};

export const addInfTip = (start, count, filter) => {
  return async (dispatch) => {
    const tips = await tipsService.addInf(start, count, filter);
    if (tips.error) {
      toast.error(`${tips.error}`, {
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
    const total = await tipsService.getTotalTip();
    const data = {
      hasMore: true,
      count: count,
      start: start + count,
      tips: tips,
      total: total.total,
    };
    if (total.total === 0 || total.total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }
    dispatch({
      type: 'ADD_INF_TIP',
      data: data,
    });
  };
};

export default tipReducer;

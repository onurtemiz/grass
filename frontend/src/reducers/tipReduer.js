/* eslint-disable default-case */
import tipsService from '../services/tips';
import lodash from 'lodash';
const initialState = {
  tips: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
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
      console.log('currentState', currentState);
      return currentState;
    default:
      return state;
  }
};

export const addInfTip = (start, count) => {
  return async (dispatch) => {
    const tips = await tipsService.addInf(start, count);
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

import eventsService from '../services/events';
import lodash from 'lodash';
import { toast } from 'react-toastify';
const initialState = {
  events: [],
  total: 0,
  hasMore: false,
  start: 0,
  filter: 'today',
  count: 20,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_EVENT':
      const uniqEvents = lodash.uniqBy(
        [...state.events, ...action.data.events],
        'id'
      );
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,

        events: uniqEvents,
      };
      return currentState;
    case 'APPROVE_EVENT':
      let otherEvents = state.events.filter((e) => e.id !== action.data.id);
      const updatedState = {
        ...state,
        events: [...otherEvents, { ...action.data, approved: true }],
      };
      return updatedState;
    case 'CHANGE_DAY_SORT':
      return {
        ...state,
        filter: action.data,
      };
    default:
      return state;
  }
};

export const changeDaySort = (daySort) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_DAY_SORT',
      data: daySort,
    });
  };
};

export const addInfEvent = (start, count, filter, first, fetching, daySort) => {
  return async (dispatch) => {
    fetching.current = true;
    const res = await eventsService.addInf(start, count, filter, daySort);
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
    let { events, total } = res;
    let data = {
      hasMore: true,
      start: start + count,
      events: events,
      total: total,
      count: count,
    };
    if (total === 0 || total < count + start) {
      data.hasMore = false;
      data.start = 0;
    }

    dispatch({
      type: 'ADD_INF_EVENT',
      data: data,
    });
    if (start === 0) {
      first.current = true;
    }
    fetching.current = false;
  };
};

export default eventReducer;

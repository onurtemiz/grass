import clubsService from '../services/clubs';
import { toast } from 'react-toastify';
import lodash from 'lodash';
const initialState = {
  clubs: [],
  total: 0,
  hasMore: false,
  start: 0,
  count: 20,
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INF_CLUBS':
      const uniqClubs = lodash.uniqBy(
        [...state.clubs, ...action.data.clubs],
        'id'
      );
      const currentState = {
        ...state,
        total: action.data.total,
        hasMore: action.data.hasMore,
        start: action.data.start,
        count: action.data.count,
        clubs: uniqClubs,
      };
      return currentState;
    case 'GET_CLUB_PAGE':
      const uniqGetClub = lodash.uniqBy([...state.clubs, action.data], 'id');
      const newState = {
        ...state,
        clubs: uniqGetClub,
      };
      return newState;
    case 'EDIT_CLUB_PAGE':
      const filteredClubs = state.clubs.filter((c) => c.id !== action.data.id);
      const editedClubs = filteredClubs.concat(action.data);
      const editedState = {
        ...state,
        clubs: editedClubs,
      };
      return editedState;
    case 'TOTAL_CLUBS':
      const totalc = action.data;
      return { ...state, total: totalc };

    default:
      return state;
  }
};

export const addInfClubs = (start, count, filter, first, fetching) => {
  return async (dispatch) => {
    fetching.current = true;
    const total = await clubsService.getTotal(filter);

    const clubs = await clubsService.addInf(start, count, filter);
    if (clubs.error) {
      toast.error(`${clubs.error}`, {
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
      clubs: clubs,
      total: total.total,
      count: count,
    };
    if (total.total === 0 || total.total < start) {
      data.hasMore = false;
      data.start = 0;
    }

    dispatch({
      type: 'ADD_INF_CLUBS',
      data: data,
    });
    if (start === 0) {
      console.log('start');

      first.current = true;
    }
    fetching.current = false;
  };
};

export const editClub = (c, setIsLoading, setIsEdit) => {
  return async (dispatch) => {
    const club = await clubsService.editClub(c);
    dispatch({
      type: 'EDIT_CLUB_PAGE',
      data: club,
    });
    setIsLoading(false);
    setIsEdit(false);
  };
};

export const getClubPageByName = (name) => {
  return async (dispatch) => {
    const club = await clubsService.getClubPageByName(name);
    if (club.error) {
      toast.error(`${club.error}`, {
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
      type: 'GET_CLUB_PAGE',
      data: club,
    });
  };
};

export default clubReducer;

import userService from '../services/user';
import { toast } from 'react-toastify';
import lodash from 'lodash';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULATED_USER':
      const uniq = lodash.uniqBy([...state, action.data], 'id');
      const currentState = [...uniq];
      return currentState;
    default:
      return state;
  }
};

export const getPopulatedUser = (username) => {
  return async (dispatch) => {
    const user = await userService.getPopulatedUser(username);
    if (user.error) {
      toast.error(`${user.error}`, {
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
      type: 'SET_POPULATED_USER',
      data: user,
    });
  };
};

export default usersReducer;

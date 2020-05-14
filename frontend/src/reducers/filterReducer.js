const initalState = '';

const filterReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FILTER',
      data: filter,
    });
  };
};

export default filterReducer;

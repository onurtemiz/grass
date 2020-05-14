import React from 'react';
import { setFilter } from '../../reducers/filterReducer';
import { useDispatch } from 'react-redux';
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  return <input onInput={(e) => handleChange(e)} />;
};

export default Filter;

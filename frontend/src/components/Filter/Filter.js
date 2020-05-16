import React, { useState } from 'react';
import { setFilter } from '../../reducers/filterReducer';
import { useDispatch } from 'react-redux';
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  const s = {
    textTransform: 'uppercase',
  };
  return <input lang="tr" onInput={(e) => handleChange(e)} style={s} />;
};

export default Filter;

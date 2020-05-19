import React, { useState } from 'react';
import { setFilter } from '../../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import { Search } from 'semantic-ui-react';
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  const s = {
    textTransform: 'uppercase',
    width: '50%',
  };
  return (
    <input
      lang="tr"
      onInput={(e) => handleChange(e)}
      style={s}
      placeholder="SEARCH LESSON OR INSTRUCTOR"
    />
  );
};

export default Filter;

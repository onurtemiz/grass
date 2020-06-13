import React, { useState, useEffect } from 'react';
import { setFilter } from '../../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
const Filter = ({ target }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setLoading(true);
    dispatch(setFilter(e.target.value));
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };
  useEffect(() => {
    dispatch(setFilter(''));
  }, [location]);

  return (
    <Input
      icon="search"
      placeholder={`${target} Arayın...`}
      onChange={(e) => handleChange(e)}
      lang="tr"
      loading={loading}
    />
  );
};

export default Filter;

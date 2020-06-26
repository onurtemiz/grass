import React, { useState, useEffect, useRef } from 'react';
import { setFilter } from '../../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
const Filter = ({ target }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [storedTimeout, setStoredTimeout] = useState(null);
  const value = useRef('');
  const handleChange = (e) => {
    value.current = e.target.value;
    if (storedTimeout) clearTimeout(storedTimeout);
    setStoredTimeout(
      setTimeout(() => {
        setLoading(true);
        dispatch(setFilter(value.current));
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }, 100)
    );
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

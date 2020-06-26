import React, { useState, useEffect } from 'react';

const useField = () => {
  const [fieldError, setFieldError] = useState(null);
  const [field, setField] = useState('');
  const fieldSet = (value) => {
    setFieldError(null);
    setField(value);
  };
  return { field, fieldError, fieldSet, setFieldError };
};

export default useField;

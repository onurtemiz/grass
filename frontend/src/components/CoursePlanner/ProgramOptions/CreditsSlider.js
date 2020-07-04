import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import { changeCreditsRange } from '../../../reducers/courseReducer';

const CreditsSlider = () => {
  const creditsRange = useSelector((state) => state.courses.creditsRange);
  const dispatch = useDispatch();
  const onSliderChange = (value) => {
    console.log('value', value);
    dispatch(changeCreditsRange(value));
  };

  return (
    <div>
      <p>Kredi Aralığı</p>
      <Range
        min={5}
        max={30}
        allowCross={false}
        onChange={onSliderChange}
        value={creditsRange}
        marks={getMarks(creditsRange)}
        trackStyle={[
          { backgroundColor: '#2185d0' },
          { backgroundColor: '#2185d0' },
        ]}
      />
    </div>
  );
};

const getMarks = (value) => {
  console.log('value', value);
  let y = value.reduce((acc, elem) => {
    acc[elem] = elem; // or what ever object you want inside
    return acc;
  }, {});
  return y;
};

export default CreditsSlider;

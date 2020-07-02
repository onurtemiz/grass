import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import { changeHoursRange } from '../../../reducers/courseReducer';

const HoursSlider = () => {
  const hoursRange = useSelector((state) => state.courses.hoursRange);
  const dispatch = useDispatch();
  const onSliderChange = (value) => {
    dispatch(changeHoursRange(value));
  };

  return (
    <div>
      <p>Saat Aralığı</p>
      <Range
        min={10}
        max={50}
        allowCross={false}
        onChange={onSliderChange}
        value={hoursRange}
        marks={getMarks(hoursRange)}
        trackStyle={[
          { backgroundColor: '#2185d0' },
          { backgroundColor: '#2185d0' },
        ]}
      />
    </div>
  );
};

const getMarks = (value) => {
  let y = value.reduce((acc, elem) => {
    acc[elem] = elem; // or what ever object you want inside
    return acc;
  }, {});
  return y;
};

export default HoursSlider;

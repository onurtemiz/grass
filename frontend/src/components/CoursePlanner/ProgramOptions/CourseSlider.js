import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import { changeCourseRange } from '../../../reducers/courseReducer';

const CourseSlider = () => {
  const courseRange = useSelector((state) => state.courses.courseRange);
  const dispatch = useDispatch();
  const onSliderChange = (value) => {
    dispatch(changeCourseRange(value));
  };

  return (
    <div>
      <p>Ders Aralığı</p>
      <Range
        min={1}
        max={10}
        allowCross={false}
        onChange={onSliderChange}
        value={courseRange}
        marks={getMarks(courseRange)}
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
    acc[elem] = elem;
    return acc;
  }, {});
  return y;
};

export default CourseSlider;

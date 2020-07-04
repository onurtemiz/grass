import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import { changeCourseRange } from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';

const CourseSlider = () => {
  const courseRange = useSelector((state) => state.courses.courseRange);
  const dispatch = useDispatch();
  const onSliderChange = (value) => {
    dispatch(changeCourseRange(value));
  };

  return (
    <div>
      <p>
        <Label color="blue" bold>
          Ders Aralığı
        </Label>
      </p>
      <Range
        min={2}
        max={20}
        allowCross={false}
        onChange={onSliderChange}
        value={courseRange}
        marks={getMarks(courseRange)}
        trackStyle={[
          { backgroundColor: '#21ba45' },
          { backgroundColor: '#21ba45' },
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

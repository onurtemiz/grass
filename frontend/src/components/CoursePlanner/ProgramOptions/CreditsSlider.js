import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import { changeCreditsRange } from '../../../reducers/courseReducer';
import { Label, StyledRange } from '../../Nav/NavTheme';

const CreditsSlider = () => {
  const creditsRange = useSelector((state) => state.courses.creditsRange);
  const dispatch = useDispatch();
  const onSliderChange = (value) => {
    dispatch(changeCreditsRange(value));
  };
  return (
    <div>
      <p>
        <Label color="blue" bold>
          Kredi Aralığı
        </Label>
      </p>
      <StyledRange
        min={2}
        max={40}
        allowCross={false}
        onChange={onSliderChange}
        value={creditsRange}
        marks={getMarks(creditsRange)}
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
    acc[elem] = elem; // or what ever object you want inside
    return acc;
  }, {});
  return y;
};

export default CreditsSlider;

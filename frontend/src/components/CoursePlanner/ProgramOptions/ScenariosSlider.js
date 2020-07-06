import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import { changeScenariosSlider } from '../../../reducers/courseReducer';
import { Label, StyledSlider } from '../../Nav/NavTheme';

const ScenariosSlider = () => {
  const scenariosSlider = useSelector((state) => state.courses.scenariosSlider);
  const dispatch = useDispatch();
  const onSliderChange = (value) => {
    dispatch(changeScenariosSlider(value));
  };

  return (
    <div>
      <p>
        <Label color="blue" bold>
          Maksimum Senaryo Sayısı
        </Label>
      </p>
      <StyledSlider
        min={1}
        max={50}
        onChange={onSliderChange}
        value={scenariosSlider}
        marks={getMark(scenariosSlider)}
        trackStyle={{ backgroundColor: '#21ba45' }}
      />
    </div>
  );
};

const getMark = (value) => {
  let y = [value].reduce((acc, elem) => {
    acc[elem] = elem;
    return acc;
  }, {});
  return y;
};

export default ScenariosSlider;

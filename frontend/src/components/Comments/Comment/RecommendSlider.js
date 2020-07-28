import React, { useState } from 'react';
import { StyledSlider } from '../../Nav/NavTheme';

const RecommendSlider = ({ recommend, setRecommend }) => {
  return (
    <StyledSlider
      min={-1}
      max={1}
      onChange={(recommend) => setRecommend(recommend)}
      value={recommend}
      marks={{ '-1': 'Önermiyorum', '0': 'Eh', '1': 'Öneriyorum' }}
      trackStyle={{ backgroundColor: '#21ba45' }}
      style={{ margin: '1em auto', width: '75%' }}
    />
  );
};

export default RecommendSlider;

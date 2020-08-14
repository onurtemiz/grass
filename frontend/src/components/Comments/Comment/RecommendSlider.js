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
      trackStyle={
        recommend === -1
          ? { backgroundColor: '#DB2828' }
          : { backgroundColor: '#21ba45' }
      }
      color={recommend === -1 ? 'red' : recommend === 0 ? 'blue' : 'green'}
      style={{ margin: '1em auto', width: '75%' }}
      startPoint={0}
    />
  );
};

export default RecommendSlider;

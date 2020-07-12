import React from 'react';
import TipsSort from './TipsSort/TipsSort';
import AllTips from './AllTips/AllTips';

const Tips = () => {
  return (
    <>
      <TipsSort />
      <div style={{ marginTop: '1em' }}>
        <AllTips />
      </div>
    </>
  );
};

export default Tips;

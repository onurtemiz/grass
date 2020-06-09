import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfTip } from '../../reducers/tipReduer';
import SubTip from './SubTip';
import { LinearProgress } from '@material-ui/core';

const AllTips = () => {
  const count = useSelector((state) => state.tips.count);
  const start = useSelector((state) => state.tips.start);
  const hasMore = useSelector((state) => state.tips.hasMore);
  const tips = useSelector((state) => state.tips.tips);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addInfTip(0, count));
  }, []);

  const loadFunc = () => {
    dispatch(addInfTip(start, count));
  };
  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };

  if (tips.length === 0) {
    return <LinearProgress />;
  }
  return (
    <div style={windowStyle}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            <LinearProgress />
          </div>
        }
        useWindow={false}
      >
        {tips.map((t) => (
          <SubTip tip={t} key={t.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default AllTips;

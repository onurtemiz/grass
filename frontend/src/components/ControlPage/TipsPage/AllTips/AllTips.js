import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfTip } from '../../../../reducers/tipReduer';
import SubTip from './SubTip';
import CommentsLoading from '../../../Comments/CommentsLoading';
import { InfiniteListStyle } from '../../../Nav/NavTheme';

const AllTips = () => {
  const count = useSelector((state) => state.tips.count);
  const start = useSelector((state) => state.tips.start);
  const hasMore = useSelector((state) => state.tips.hasMore);
  const tips = useSelector((state) => state.tips.tips);
  const filter = useSelector((state) => state.tips.filter);
  const [currentTips, setCurrentTips] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addInfTip(0, count, filter));
  }, [filter]);

  useEffect(() => {
    setCurrentTips(filterTips(tips, filter));
  }, [filter, start, tips]);

  const loadFunc = () => {
    dispatch(addInfTip(start, count, filter));
  };

  if (currentTips.length === 0) {
    return <CommentsLoading />;
  }
  return (
    <div style={InfiniteListStyle}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
          <CommentsLoading/>
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

function filterTips(tips, filter) {
  return tips.sort((a, b) => {
    if (filter === 'mostRecent') {
      return new Date(b.date) - new Date(a.date);
    } else if (filter === 'mostPast') {
      return new Date(a.date) - new Date(b.date);
    } else if (filter === 'mostPopular') {
      return b.likes.length - a.likes.length;
    }
  });
}

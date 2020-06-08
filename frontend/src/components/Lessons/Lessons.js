import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfLesson } from '../../reducers/lessonReducer';
import SubLesson from '../Teachers/SubLesson';
const Lessons = ({ main }) => {
  const count = useSelector((state) => state.lessons.count);
  const start = useSelector((state) => state.lessons.start);
  const hasMore = useSelector((state) => state.lessons.hasMore);
  const lessons = useSelector((state) => state.lessons.lessons);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addInfLesson(0, count, filter));
  }, [filter]);

  const loadFunc = () => {
    dispatch(addInfLesson(start, count, filter));
  };
  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };

  return (
    <div style={windowStyle}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
        {lessons
          .filter((l) =>
            l.fullName.toUpperCase().includes(filter.toUpperCase())
          )
          .map((l) => (
            <SubLesson key={l.id} lesson={l} main={main} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Lessons;

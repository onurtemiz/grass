import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  addInfLesson,
  totalLesson,
  resetLessons,
} from '../../reducers/lessonReducer';
import SubLesson from './SubLesson';
const Lessons = () => {
  const count = useSelector((state) => state.lessons.count);
  const start = useSelector((state) => state.lessons.start);
  const hasMore = useSelector((state) => state.lessons.hasMore);
  const state = useSelector((state) => state);
  const lessons = useSelector((state) => state.lessons.lessons);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addInfLesson(0, count, filter));
  }, [filter]);

  const loadFunc = () => {
    dispatch(addInfLesson(start, count, filter));
  };
  console.log('state', state);
  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };
  console.log('state', state);

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
          .filter((l) => l.fullName.includes(filter))
          .map((l) => (
            <SubLesson key={l.id} lesson={l} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Lessons;

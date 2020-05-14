import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfLesson, totalLesson,resetLessons } from '../../reducers/lessonReducer';
import SubLesson from './SubLesson';
const Lessons = () => {
  const [count, setCount] = useState(20);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const state = useSelector((state) => state);
  const lessons = useSelector((state) => state.lessons.lessons);
  const total = useSelector((state) => state.lessons.total);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    setStart(0)
    setHasMore(false)
    dispatch(resetLessons())
    dispatch(totalLesson(filter));
    dispatch(addInfLesson(0, count, setHasMore, setStart, filter));
  }, [filter]);

  const loadFunc = () => {
    setHasMore(false);
    if (total + count < count + start) {
      return;
    }
    dispatch(addInfLesson(start, count, setHasMore, setStart, filter));
  };
  console.log('state', state);
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
        {lessons.map((l) => (
          <SubLesson key={l.id} lesson={l} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Lessons;

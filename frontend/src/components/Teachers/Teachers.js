import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  addInfTeacher,
  totalTeacher,
  resetTeachers,
} from '../../reducers/teacherReducer';
import SubTeacher from './SubTeacher';
const Teachers = () => {
  const [count, setCount] = useState(20);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const teachers = useSelector((state) => state.teachers.teachers);
  const total = useSelector((state) => state.teachers.total);
  const filter = useSelector((state) => state.filter);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setStart(0);
    setHasMore(false);
    dispatch(resetTeachers());
    dispatch(totalTeacher(filter));
    dispatch(addInfTeacher(0, count, setHasMore, setStart, filter));
  }, [filter]);

  const loadFunc = () => {
    setHasMore(false);
    console.log('loadFunck', hasMore);
    if (total + count < count + start) {
      return;
    }
    dispatch(addInfTeacher(start, count, setHasMore, setStart, filter));
  };
  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };

  if (teachers.length === 0) {
    return null;
  }
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
        {teachers.map((t) => (
          <SubTeacher teacher={t} key={t.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Teachers;

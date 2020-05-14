import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfTeacher, totalTeacher } from '../../reducers/teacherReducer';
import SubTeacher from './SubTeacher';
const Teachers = () => {
  const [count, setCount] = useState(200);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const teachers = useSelector((state) => state.teachers.teachers);
  const total = useSelector((state) => state.teachers.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalTeacher());
    dispatch(addInfTeacher(start, count, setHasMore, setStart));
  }, []);

  const loadFunc = () => {
    setHasMore(false);
    if (total.total + count < count + start) {
      return;
    }
    dispatch(addInfTeacher(start, count, setHasMore, setStart, total));
  };

  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };
  console.log('hasMore', hasMore);

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

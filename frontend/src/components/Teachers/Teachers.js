import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { addInfTeacher } from '../../reducers/teacherReducer';
import SubTeacher from './SubTeacher';
const Teachers = () => {
  const [start, setStart] = useState(0);
  const [count, setCount] = useState(10);
  const teachers = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  // console.log('teachers', teachers);
  const loadFunc = async () => {
    await dispatch(addInfTeacher(start, count));
    setStart(start + 50);
  };

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={start === 50 ? false : true}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {teachers.map((t) => (
          <SubTeacher teacher={t} key={t.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Teachers;

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { addInfTeacher, totalTeacher } from '../../reducers/teacherReducer';
import SubTeacher from './SubTeacher';
const Teachers = async () => {
  const [count, setCount] = useState(20);
  const [start, setStart] = useState(0);
  const st = useSelector((state) => state.teachers);
  const teachers = useSelector((state) => state.teachers.teachers);
  const total = useSelector((state) => state.teachers.total);
  const dispatch = useDispatch();
  dispatch(totalTeacher());
  dispatch(addInfTeacher(start, count));

  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };
  console.log('teachers', total);

  const fetchMoreData = () => {
    dispatch(addInfTeacher(start, count));
  };

  return (
    <div style={windowStyle}>
      {/* <InfiniteScroll
        dataLength={total}
        next={fetchMoreData}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
        height={400}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {teachers.map((t) => (
          <SubTeacher teacher={t} key={t.id} />
        ))}
      </InfiniteScroll> */}
    </div>
  );
};

export default Teachers;

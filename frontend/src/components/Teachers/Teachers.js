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
  const count = useSelector((state) => state.teachers.count);
  const start = useSelector((state) => state.teachers.start);
  const hasMore = useSelector((state) => state.teachers.hasMore);
  const teachers = useSelector((state) => state.teachers.teachers);
  const filter = useSelector((state) => state.filter);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addInfTeacher(0, count, filter));
  }, [filter]);

  const loadFunc = () => {
    dispatch(addInfTeacher(start, count, filter));
  };
  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };

  if (teachers.length === 0) {
    return null;
  }
  console.log('state', state)
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
        {teachers
          .filter((t) => t.name.includes(filter))
          .sort((a, b) => b.fullName - a.fullName)
          .map((t) => (
            <SubTeacher teacher={t} key={t.id} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Teachers;

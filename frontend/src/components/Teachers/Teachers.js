import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfTeacher } from '../../reducers/teacherReducer';
import SubTeacher from './SubTeacher';
import { LinearProgress } from '@material-ui/core';

const Teachers = () => {
  const count = useSelector((state) => state.teachers.count);
  const start = useSelector((state) => state.teachers.start);
  const hasMore = useSelector((state) => state.teachers.hasMore);
  const teachers = useSelector((state) => state.teachers.teachers);
  const filter = useSelector((state) => state.filter);
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
        {teachers
          .filter((t) =>
            t.name
              .toLocaleUpperCase('tr-TR')
              .includes(filter.toLocaleUpperCase('tr-TR'))
          )
          .sort((a, b) => b.name - a.name)
          .map((t) => (
            <SubTeacher teacher={t} key={t.id} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Teachers;

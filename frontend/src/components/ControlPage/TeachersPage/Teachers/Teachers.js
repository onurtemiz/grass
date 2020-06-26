import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfTeacher } from '../../../../reducers/teacherReducer';
import SubTeacher from './SubTeacher';
import { LinearProgress } from '@material-ui/core';
import { Card, Divider } from 'semantic-ui-react';
import CommentsLoading from '../../../Comments/CommentsLoading';
import Filter from '../../../Filter/Filter';

const Teachers = () => {
  const count = useSelector((state) => state.teachers.count);
  const start = useSelector((state) => state.teachers.start);
  const hasMore = useSelector((state) => state.teachers.hasMore);
  const teachers = useSelector((state) => state.teachers.teachers);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [currentTeachers, setCurrentTeachers] = useState([]);

  useEffect(() => {
    dispatch(addInfTeacher(0, count, filter));
  }, [filter]);

  useEffect(() => {
    setCurrentTeachers(
      teachers
        .filter((t) =>
          t.name
            .toLocaleUpperCase('tr-TR')
            .includes(filter.toLocaleUpperCase('tr-TR'))
        )
        .sort((a, b) => b.name - a.name)
    );
  }, [teachers]);

  const loadFunc = () => {
    dispatch(addInfTeacher(start, count, filter));
  };
  const windowStyle = {
    minHeight: '300px',
    maxHeight: '500px',
    overflow: 'auto',
  };
  if (teachers.length === 0) {
    return <LinearProgress />;
  }
  return (
    <div style={windowStyle}>
      <Filter target={'Hoca'} />
      <Divider />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            <CommentsLoading skeletonLength={1} />
          </div>
        }
        useWindow={false}
      >
        {currentTeachers.map((t) => (
          <SubTeacher teacher={t} key={t.id} main />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Teachers;

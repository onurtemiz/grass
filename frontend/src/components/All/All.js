import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfAll } from '../../reducers/allReducer';
import SubTeacher from '../Teachers/SubTeacher';
import lodash from 'lodash';
const All = () => {
  const count = useSelector((state) => state.all.count);
  const start = useSelector((state) => state.all.start);
  const hasMore = useSelector((state) => state.all.hasMore);
  const teachers = useSelector((state) => state.all.all);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.all);
  useEffect(() => {
    dispatch(addInfAll(0, count, filter));
  }, [filter]);

  const filterTeachers = (teachers) => {
    const onlyTeacherNames = teachers.filter((t) =>
      t.name
        .toLocaleUpperCase('tr-TR')
        .includes(filter.toLocaleUpperCase('tr-TR'))
    );
    const onlyLessonNames = teachers.filter((t) => {
      let isThere = t.lessons.filter((l) =>
        l.fullName.toUpperCase().includes(filter.toUpperCase())
      );
      if (isThere.length > 0) {
        return true;
      }
      return false;
    });
    const q = lodash.union(onlyLessonNames, onlyTeacherNames);
    return q;
  };

  const loadFunc = () => {
    dispatch(addInfAll(start, count, filter));
  };
  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };

  if (teachers.length === 0) {
    return null;
  }
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
        {filterTeachers(teachers)
          .sort((a, b) => a.lessons[0].fullName - b.lessons[0].fullName)
          .map((t) => (
            <SubTeacher teacher={t} key={t.id} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default All;

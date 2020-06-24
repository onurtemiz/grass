import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfAll } from '../../reducers/allReducer';
import SubTeacher from '../Teachers/SubTeacher';
import SubLesson from '../Teachers/SubLesson';
import { LinearProgress } from '@material-ui/core';
import { Card } from 'semantic-ui-react';

import lodash from 'lodash';
const All = () => {
  const count = useSelector((state) => state.all.count);
  const start = useSelector((state) => state.all.start);
  const hasMore = useSelector((state) => state.all.hasMore);
  const lessons = useSelector((state) => state.all.all);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addInfAll(0, count, filter));
  }, [filter]);

  const filterLessons = (lessons) => {
    const onlyTeacherNames = lessons.filter((l) =>
      l.parentName
        .toLocaleUpperCase('tr-TR')
        .includes(filter.toLocaleUpperCase('tr-TR'))
    );
    const onlyLessonNames = lessons.filter((l) => {
      return !!l.name.toUpperCase().includes(filter.toUpperCase());
    });
    const q = lodash.union(onlyLessonNames, onlyTeacherNames);
    return q;
  };

  const loadFunc = () => {
    dispatch(addInfAll(start, count, filter));
  };

  if (lessons.length === 0) {
    return <LinearProgress />;
  }
  return (
    <div
      style={{
        height: '90vh',
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            <LinearProgress variant="query" />
          </div>
        }
        useWindow={false}
      >
        {filterLessons(lessons)
          .sort((a, b) => a.name - b.name)
          .map((l) => (
            <SubLesson lesson={l} key={l.id} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default All;

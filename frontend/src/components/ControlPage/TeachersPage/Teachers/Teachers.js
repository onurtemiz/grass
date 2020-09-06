import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfTeacher } from '../../../../reducers/teacherReducer';
import SubTeacher from './SubTeacher';
import { LinearProgress } from '@material-ui/core';
import { Divider } from 'semantic-ui-react';
import CommentsLoading from '../../../Comments/CommentsLoading';
import Filter from '../../../Filter/Filter';
import { compareNames, useInfinite } from '../../../../utils/utils';
import NoSubResult from '../../../Search/NoSubResult';
import { InfiniteListStyle } from '../../../Nav/NavTheme';
const Teachers = () => {
  const { loadFunc, hasMore, currentTarget, ready, noResult } = useInfinite(
    'teachers',
    addInfTeacher,
    filterTeachers
  );

  if (!ready) {
    return <CommentsLoading />;
  }
  return (
    <div style={InfiniteListStyle}>
      <Filter target={'Hoca'} />
      <Divider />
      {!ready ? (
        <CommentsLoading />
      ) : noResult ? (
        <NoSubResult />
      ) : (
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
          {currentTarget.map((t) => (
            <SubTeacher teacher={t} key={t.id} main />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Teachers;
function filterTeachers(teachers, filter) {
  return teachers
    .filter((t) =>
      t.name
        .toLocaleUpperCase('tr-TR')
        .includes(filter.toLocaleUpperCase('tr-TR')) || t.name
        .toUpperCase()
        .includes(filter.toUpperCase()) 
    )
    .sort(compareNames);
}

import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfLesson } from '../../../../reducers/lessonReducer';
import SubLesson from './SubLesson';
import CommentsLoading from '../../../Comments/CommentsLoading';
import Filter from '../../../Filter/Filter';
import { Divider } from 'semantic-ui-react';
import { compareNames, useInfinite } from '../../../../utils/utils';
import { LinearProgress } from '@material-ui/core';
import NoSubResult from '../../../Search/NoSubResult';
import { InfiniteListStyle } from '../../../Nav/NavTheme';

const Lessons = ({ main }) => {
  const { loadFunc, hasMore, currentTarget, ready, noResult } = useInfinite(
    'lessons',
    addInfLesson,
    filterLessons
  );

  if (!ready) {
    return <CommentsLoading />;
  }

  return (
    <div style={InfiniteListStyle}>
      <Filter target="Ders" />
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
          {currentTarget.map((l) => (
            <SubLesson key={l.id} lesson={l} main={main} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Lessons;
function filterLessons(lessons, filter) {
  return lessons
    .filter((l) => l.name.toUpperCase().includes(filter.toUpperCase()))
    .sort(compareNames);
}

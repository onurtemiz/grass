import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfQuestions } from '../../../../reducers/questionReducer';
import SubQuestion from './SubQuestion';
import CommentsLoading from '../../../Comments/CommentsLoading';
import { useInfinite } from '../../../../utils/utils';
import NoSubResult from '../../../Search/NoSubResult';
import { InfiniteListStyle } from '../../../Nav/NavTheme';

const Questions = ({ main }) => {
  const { loadFunc, hasMore, currentTarget, ready, noResult } = useInfinite(
    'questions',
    addInfQuestions,
    filterQuestions
  );

  return (
    <>
      <div style={InfiniteListStyle}>
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
            {currentTarget.map((q) => (
              <SubQuestion question={q} key={q.id} main />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Questions;
function filterQuestions(questions, filter, sorting) {
  return questions
    .sort((a, b) => {
      if (sorting === 'mostRecent') {
        return new Date(b.date) - new Date(a.date);
      } else if (sorting === 'mostPast') {
        return new Date(a.date) - new Date(b.date);
      } else if (sorting === 'mostPopular') {
        return b.commentsLength - a.commentsLength;
      }
    })
    .filter((q) => {
      return q.question.toUpperCase().includes(filter.toUpperCase());
    });
}

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfQuestions } from '../../../../reducers/questionReducer';
import { LinearProgress } from '@material-ui/core';
import SubQuestion from './SubQuestion';
import QuestionModal from './QuestionModal';
import { Divider } from 'semantic-ui-react';
import CommentsLoading from '../../../Comments/CommentsLoading';
import Filter from '../../../Filter/Filter';
import { useInfinite } from '../../../../utils/utils';
import NoSubResult from '../../../Search/NoSubResult';

const Questions = ({ main }) => {
  const { loadFunc, hasMore, currentTarget, ready, noResult } = useInfinite(
    'questions',
    addInfQuestions,
    filterQuestions
  );

  return (
    <>
      <div
        style={{
          minHeight: '300px',
          maxHeight: '500px',
          overflow: 'auto',
        }}
      >
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
  console.log('sorting', sorting);
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

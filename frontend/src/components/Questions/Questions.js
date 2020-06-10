import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfQuestions } from '../../reducers/questionReducer';
import { LinearProgress } from '@material-ui/core';
import SubQuestion from './SubQuestion';
import QuestionModal from './QuestionModal';
import { Divider } from 'semantic-ui-react';
import CommentsLoading from '../Comments/CommentsLoading';

const Questions = ({ main }) => {
  const count = useSelector((state) => state.questions.count);
  const start = useSelector((state) => state.questions.start);
  const hasMore = useSelector((state) => state.questions.hasMore);
  const questions = useSelector((state) => state.questions.questions);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [currentQuestions, setCurrentQuestions] = useState([]);

  useEffect(() => {
    dispatch(addInfQuestions(0, count, filter));
  }, [filter]);

  useEffect(() => {
    setCurrentQuestions(
      questions.filter((q) => {
        return q.question.toUpperCase().includes(filter.toUpperCase());
      })
    );
  }, [questions]);
  const loadFunc = () => {
    dispatch(addInfQuestions(start, count, filter));
  };
  if (currentQuestions.length === 0) {
    return (
      <>
        <QuestionModal />
        <LinearProgress />
      </>
    );
  }
  return (
    <>
      <QuestionModal />
      <Divider />
      <div
        style={{
          height: '400px',
          overflow: 'auto',
        }}
      >
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
          {currentQuestions.map((q) => (
            <SubQuestion question={q} key={q.id} main />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Questions;

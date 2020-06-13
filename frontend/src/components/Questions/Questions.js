import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfQuestions } from '../../reducers/questionReducer';
import { LinearProgress } from '@material-ui/core';
import SubQuestion from './SubQuestion';
import QuestionModal from './QuestionModal';
import { Divider } from 'semantic-ui-react';
import CommentsLoading from '../Comments/CommentsLoading';
import Filter from '../Filter/Filter';

const Questions = ({ main }) => {
  const count = useSelector((state) => state.questions.count);
  const start = useSelector((state) => state.questions.start);
  const hasMore = useSelector((state) => state.questions.hasMore);
  const questions = useSelector((state) => state.questions.questions);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    dispatch(addInfQuestions(0, count, filter, first, fetching));
  }, [filter]);

  useEffect(() => {
    setCurrentQuestions(
      questions.filter((q) => {
        return q.question.toUpperCase().includes(filter.toUpperCase());
      })
    );
  }, [questions]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(addInfQuestions(start, count, filter, first, fetching));
    }
  };
  if (currentQuestions.length === 0 || !first.current) {
    return <LinearProgress />;
  }
  return (
    <>
      <Filter target="Soru" />
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

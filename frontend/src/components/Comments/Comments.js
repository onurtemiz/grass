import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  addInfCommentLesson,
  addInfCommentTeacher,
} from '../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import { LinearProgress } from '@material-ui/core';
const Comments = ({ type, typeId }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'teacher') {
      dispatch(addInfCommentTeacher(0, count, typeId));
    } else if (type === 'lesson') {
      dispatch(addInfCommentLesson(0, count, typeId));
    }
  }, []);

  const loadFunc = () => {
    if (type === 'teacher') {
      dispatch(addInfCommentTeacher(start, count, typeId));
    } else if (type === 'lesson') {
      dispatch(addInfCommentLesson(start, count, typeId));
    }
  };
  const windowStyle = {
    height: 400,
    overflow: 'auto',
  };
  console.log('comments', state);
  return (
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
      {comments
        .filter((c) =>
          type === 'teacher' ? c.teacher === typeId : c.lesson === typeId
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .sort((a, b) => b.likes.length - a.likes.length)

        .map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
    </InfiniteScroll>
  );
};

export default Comments;

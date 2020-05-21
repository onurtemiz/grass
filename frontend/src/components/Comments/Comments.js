import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  addInfCommentLesson,
  addInfCommentTeacher,
  addInfCommentUser,
} from '../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import { LinearProgress } from '@material-ui/core';
const Comments = ({ type, typeId }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const filter = useSelector((state) => state.comments.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'teacher') {
      dispatch(addInfCommentTeacher(0, count, typeId, filter));
    } else if (type === 'lesson') {
      dispatch(addInfCommentLesson(0, count, typeId, filter));
    } else if (type === 'user') {
      dispatch(addInfCommentUser(start, count, typeId, filter));
    }
  }, []);

  const loadFunc = () => {
    if (type === 'teacher') {
      dispatch(addInfCommentTeacher(start, count, typeId, filter));
    } else if (type === 'lesson') {
      dispatch(addInfCommentLesson(start, count, typeId, filter));
    } else if (type === 'user') {
      dispatch(addInfCommentUser(start, count, typeId, filter));
    }
  };
  return (
    <div style={{ height: '50vh', overflow: 'auto' }}>
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
          .filter((c) => {
            if (type === 'teacher') {
              return c.teacher === typeId;
            } else if (type === 'lesson') {
              return (c.lesson = typeId);
            } else if (type === 'user') {
              return c.user.id === typeId;
            }
          })
          .sort((a, b) => {
            if (filter === 'mostRecent') {
              return new Date(b.date) - new Date(a.date);
            } else if (filter === 'mostPast') {
              return new Date(a.date) - new Date(b.date);
            } else if (filter === 'mostPopular') {
              return b.likes.length - a.likes.length;
            }
          })
          .map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Comments;

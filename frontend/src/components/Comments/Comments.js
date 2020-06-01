import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  addInfCommentById,
  addInfCommentAll,
} from '../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import { LinearProgress } from '@material-ui/core';
const Comments = ({ type, typeId, height }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const filter = useSelector((state) => state.comments.filter);
  const [currentComments, setCurrentComments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeId) {
      dispatch(addInfCommentById(0, count, typeId, filter));
    } else if (type === 'allComments') {
      dispatch(addInfCommentAll(0, count, filter));
    }
  }, []);

  useEffect(() => {
    setCurrentComments(
      comments
        .filter((c) => {
          if (type === 'teacher') {
            return c.teacher === typeId;
          } else if (type === 'lesson') {
            return c.lesson === typeId;
          } else if (type === 'user') {
            return c.user.id === typeId;
          } else if (type === 'allComments') {
            return true;
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
    );
  }, [filter, start]);

  const loadFunc = () => {
    if (typeId) {
      dispatch(addInfCommentById(start, count, typeId, filter));
    } else if (type === 'allComments') {
      dispatch(addInfCommentAll(start, count, filter));
    }
  };
  return (
    <div
      style={{
        height: height ? height : '50vh',
        width: '100vw',
        overflow: 'auto',
        
      }}
    >
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
        {currentComments.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Comments;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfCommentAll } from '../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import CommentsLoading from './CommentsLoading';

const SquareComments = ({ height }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const filter = useSelector((state) => state.comments.filter);
  const [currentComments, setCurrentComments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addInfCommentAll(0, count, filter));
  }, [filter]);

  useEffect(() => {
    setCurrentComments(
      comments.sort((a, b) => {
        if (filter === 'mostRecent') {
          return new Date(b.date) - new Date(a.date);
        } else if (filter === 'mostPast') {
          return new Date(a.date) - new Date(b.date);
        } else if (filter === 'mostPopular') {
          return b.likes.length - a.likes.length;
        }
      })
    );
  }, [filter, start, comments]);

  const loadFunc = () => {
    dispatch(addInfCommentAll(start, count, filter));
  };
  return (
    <div
      style={{
        height: height ? height : '50vh',
        // width: '100vw',
        // overflow: 'auto',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        useWindow={true}
        hasMore={hasMore}
        loader={<CommentsLoading />}
      >
        {currentComments.map((c) => (
          <Comment key={c.id} comment={c} showSource={true} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default SquareComments;

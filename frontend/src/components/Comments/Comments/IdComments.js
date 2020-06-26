import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfCommentById } from '../../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import CommentsLoading from '../CommentsLoading';
import NoComments from '../NoComments';

const IdComments = ({ type, typeId, height }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const filter = useSelector((state) => state.comments.filter);
  const [currentComments, setCurrentComments] = useState([]);
  const dispatch = useDispatch();
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    dispatch(addInfCommentById(0, count, typeId, filter, first, fetching));
  }, [filter]);
  useEffect(() => {
    setCurrentComments(
      comments
        .filter((c) => {
          if (c.commentType === type) {
            return c[`${type}`].id === typeId;
          } else if (type === 'teacher' && c.commentType === 'lesson') {
            return c.teacher.id === typeId;
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
    );
  }, [filter, start, comments]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(
        addInfCommentById(start, count, typeId, filter, first, fetching)
      );
    }
  };

  if (!first.current) {
    return <CommentsLoading />;
  }
  if (currentComments.length === 0) {
    return <NoComments />;
  }
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
          <Comment
            key={c.id}
            id={c.id}
            comment={c}
            showSource={type === 'teacher' || type === 'user' ? true : false}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default IdComments;

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfCommentFeed } from '../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import CommentsLoading from './CommentsLoading';
import NoFeed from '../Feed/NoFeed';

const FeedComments = ({ height }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const filter = useSelector((state) => state.comments.filter);
  const user = useSelector((state) => state.user);
  const [currentComments, setCurrentComments] = useState([]);
  const dispatch = useDispatch();
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    dispatch(addInfCommentFeed(0, count, filter, first, fetching));
  }, [filter]);
  useEffect(() => {
    setCurrentComments(
      comments
        .filter((c) => {
          return user.following.includes(c[`${c.commentType}`].id);
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
      dispatch(addInfCommentFeed(start, count, filter, first, fetching));
    }
  };

  if (!first.current) {
    return <CommentsLoading />;
  }
  if (currentComments.length === 0) {
    return <NoFeed />;
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
          <Comment key={c.id} comment={c} showSource={true} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default FeedComments;

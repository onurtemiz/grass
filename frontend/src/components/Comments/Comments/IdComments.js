import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfCommentById } from '../../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import CommentsLoading from '../CommentsLoading';
import NoComments from '../NoComments';
import moment from 'moment';
import { daySortToInt } from '../../../utils/utils';

const IdComments = ({ type, typeId, height }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const filter = useSelector((state) => state.comments.filter);
  const daySort = useSelector((state) => state.comments.daySort);

  const [currentComments, setCurrentComments] = useState([]);
  const dispatch = useDispatch();
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    first.current = false;
    fetching.current = false;
    dispatch(
      addInfCommentById(0, count, typeId, filter, first, fetching, daySort)
    );
  }, [filter, daySort]);
  useEffect(() => {
    setCurrentComments(filterComments(comments, type, typeId, filter, daySort));
  }, [filter, start, comments, daySort]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(
        addInfCommentById(
          start,
          count,
          typeId,
          filter,
          first,
          fetching,
          daySort
        )
      );
    }
  };

  if (!first.current) {
    return <CommentsLoading />;
  }
  if (currentComments.length === 0 && first.current) {
    return <NoComments />;
  }
  return (
    <div
      style={{
        height: height ? height : '50vh',
      }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        useWindow={true}
        hasMore={hasMore}
        loader={<CommentsLoading key={1} />}
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
function filterComments(comments, type, typeId, filter, daySort) {
  let dayInt = daySortToInt(daySort);
  return comments
    .filter((c) => {
      if (c.commentType === type) {
        return c[`${type}`].id === typeId;
      } else if (type === 'teacher' && c.commentType === 'lesson') {
        return c.teacher === typeId;
      } else if (type === 'user') {
        return c.user.id === typeId;
      }
    })
    .filter((c) => {
      if (dayInt === null) {
        return true;
      }
      let commentDate = moment(c.date);
      var convertedSortDay = moment().subtract(dayInt, 'days');
      return commentDate >= convertedSortDay;
    })
    .sort((a, b) => {
      if (filter === 'mostRecent') {
        return new Date(b.date) - new Date(a.date);
      } else if (filter === 'mostPast') {
        return new Date(a.date) - new Date(b.date);
      } else if (filter === 'mostPopular') {
        return b.likes.length - a.likes.length;
      }
    });
}

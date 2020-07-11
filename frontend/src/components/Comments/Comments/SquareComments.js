import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { addInfCommentAll } from '../../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import CommentsLoading from '../CommentsLoading';
import moment from 'moment';
import { daySortToInt } from '../../../utils/utils';
import { Segment } from 'semantic-ui-react';

const SquareComments = ({ height }) => {
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
    dispatch(addInfCommentAll(0, count, filter, first, fetching, daySort));
  }, [filter, daySort]);

  useEffect(() => {
    setCurrentComments(sortComments(comments, filter, daySort));
  }, [filter, start, comments, daySort]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(
        addInfCommentAll(start, count, filter, first, fetching, daySort)
      );
    }
  };

  if (!first.current) {
    return <CommentsLoading />;
  }

  return (
    <Segment basic style={{ marginTop: 0 }}>
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
            <Comment key={c.id} comment={c} showSource={true} />
          ))}
        </InfiniteScroll>
      </div>
    </Segment>
  );
};

export default SquareComments;
function sortComments(comments, filter, daySort) {
  let dayInt = daySortToInt(daySort);
  return comments
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

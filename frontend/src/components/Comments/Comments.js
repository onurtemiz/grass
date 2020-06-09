import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  addInfCommentById,
  addInfCommentAll,
  addInfCommentFeed,
} from '../../reducers/commentReducer';
import Comment from '../Comment/Comment';
import { Placeholder } from 'semantic-ui-react';
import { getLessonById } from '../../reducers/allReducer';

const Comments = ({ type, typeId, height, showSource }) => {
  const count = useSelector((state) => state.comments.count);
  const start = useSelector((state) => state.comments.start);
  const hasMore = useSelector((state) => state.comments.hasMore);
  const comments = useSelector((state) => state.comments.comments);
  const filter = useSelector((state) => state.comments.filter);
  const user = useSelector((state) => state.user);
  const [currentComments, setCurrentComments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeId) {
      dispatch(addInfCommentById(0, count, typeId, filter));
    } else if (type === 'allComments') {
      dispatch(addInfCommentAll(0, count, filter));
    } else if (type === 'feed') {
      dispatch(addInfCommentFeed(0, count, filter));
    }
  }, [filter]);
  useEffect(() => {
    setCurrentComments(
      comments
        .filter((c) => {
          if (type === 'teacher' && c.commentType === 'lesson') {
            return c.teacher.id === typeId;
          } else if (type === 'lesson' && c.commentType === 'lesson') {
            return c.lesson.id === typeId;
          } else if (type === 'club' && c.commentType === 'club') {
            return c.club.id === typeId;
          } else if (type === 'user') {
            return c.user.id === typeId;
          } else if (type === 'allComments') {
            return true;
          } else if (type === 'feed') {
            if (c.commentType === 'lesson') {
              return user.following.includes(c.lesson.id);
            } else if (c.commentType === 'club') {
              return user.following.includes(c.club.id);
            }
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
    if (typeId) {
      dispatch(addInfCommentById(start, count, typeId, filter));
    } else if (type === 'allComments') {
      dispatch(addInfCommentAll(start, count, filter));
    } else if (type === 'feed') {
      dispatch(addInfCommentFeed(start, count, filter));
    }
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
        loader={<Loading />}
      >
        {currentComments.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            showSource={showSource}
            typeId={c.commentType === 'lesson' ? c.lesson.id : c.club.id}
            commentType={c.commentType}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export const Loading = ({ skeletonLength }) => {
  return [...Array(skeletonLength ? skeletonLength : 2)].map((e, i) => (
    <Placeholder style={{ marginTop: '1em', marginLeft: '1em' }} key={i}>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  ));
};

export default Comments;

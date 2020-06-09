import React, { useState, useEffect } from 'react';
import Comments from '../Comments/Comments';
import CommentSort from '../CommentSort/CommentSort';
import { useSelector } from 'react-redux';
import NoFeed from './NoFeed';
import { useFollowed } from '../Following/FollowedHook';
const Feed = () => {
  const lessons = useFollowed();
  const [blocking, setBlocking] = useState(null);
  useEffect(() => {
    if (lessons.length === 0) {
      setBlocking('noLesson');
    } else {
      const comments = lessons.reduce(
        (total, l) => total + l.comments.length,
        0
      );
      if (comments === 0) {
        setBlocking('noComment');
      } else {
        setBlocking(null);
      }
    }
  }, [lessons]);

  if (blocking) {
    return <NoFeed blocking={blocking} />;
  }

  return (
    <div>
      <CommentSort />
      <Comments
        type="feed"
        height="90vh"
        showSource={true}
        skeletonLength={2}
      />
    </div>
  );
};

export default Feed;

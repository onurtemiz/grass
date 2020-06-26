import React, { useState, useEffect } from 'react';
import CommentSort from '../../Comments/CommentSort/CommentSort';
import NoFeed from './NoFeed';
import FeedComments from '../../Comments/Comments/FeedComments';
import userService from '../../../services/user';

const Feed = () => {
  const [blocking, setBlocking] = useState(false);
  const [following, setFollowing] = useState();
  useEffect(() => {
    userService.getFollowing(setFollowing);
  }, []);

  const getLength = (following) => {
    if (following != undefined) {
      let total = 0;
      total += following.clubs.length;
      total += following.lessons.length;
      total += following.questions.length;
      total += following.campuses.length;
      total += following.dorms.length;
      return total;
    }
    return 0;
  };

  useEffect(() => {
    if (getLength(following) === 0) {
      setBlocking(true);
    } else {
      setBlocking(false);
    }
  }, [following]);

  if (blocking) {
    return <NoFeed />;
  }

  return (
    <div>
      <CommentSort />
      <FeedComments height="90vh" />
    </div>
  );
};

export default Feed;

import React from 'react';
import Comments from '../Comments/Comments';
import CommentSort from '../CommentSort/CommentSort';

const Feed = () => {
  return (
    <div>
      <CommentSort />
      <Comments
        type="feed"
        height="90vh"
        showTeacher={true}
        skeletonLength={8}
      />
    </div>
  );
};

export default Feed;

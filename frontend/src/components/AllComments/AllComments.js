import React from 'react';
import Comments from '../Comments/Comments';
import CommentSort from '../CommentSort/CommentSort';

const AllComments = () => {
  return (
    <div>
      <CommentSort />
      <Comments
        type="allComments"
        height="90vh"
        showTeacher={true}
        skeletonLength={2}
      />
    </div>
  );
};

export default AllComments;

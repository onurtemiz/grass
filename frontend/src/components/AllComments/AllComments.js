import React from 'react';
import Comments from '../Comments/IdComments';
import CommentSort from '../CommentSort/CommentSort';
import SquareComments from '../Comments/SquareComments';

const AllComments = () => {
  return (
    <div>
      <CommentSort />
      <SquareComments height="90vh" />
    </div>
  );
};

export default AllComments;

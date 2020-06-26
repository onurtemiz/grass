import React from 'react';
import Comments from '../../Comments/Comments/IdComments';
import CommentSort from '../../Comments/CommentSort/CommentSort';
import SquareComments from '../../Comments/Comments/SquareComments';

const AllComments = () => {
  return (
    <div>
      <CommentSort />
      <SquareComments height="90vh" />
    </div>
  );
};

export default AllComments;

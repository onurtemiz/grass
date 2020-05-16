import React from 'react';

const Comment = ({ comment }) => {
  console.log('comment', comment);
  return <div>{comment.comment}</div>;
};

export default Comment;

import React, { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SubComment from './SubComment';
import EditComment from './EditComment';

const Comment = ({ comment, showSource }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const commentStyle = {
    width: '90vw',
    maxWidth: '640px',
    marginTop: '1rem',
  };
  if (!isUpdate) {
    return (
      <div style={commentStyle}>
        <SubComment
          comment={comment}
          setIsUpdate={setIsUpdate}
          showSource={showSource}
        />
      </div>
    );
  } else {
    return (
      <div style={commentStyle}>
        <EditComment comment={comment} setIsUpdate={setIsUpdate} />
      </div>
    );
  }
};

export default Comment;

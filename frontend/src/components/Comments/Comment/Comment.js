import React, { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SubComment from './SubComment';
import EditComment from './EditComment';

const Comment = ({ comment, showSource }) => {
  const [isUpdate, setIsUpdate] = useState(false);

  if (!isUpdate) {
    return (
      <div
        style={{
          width: '50vw',
          marginLeft: '1rem',
          marginTop: '1rem',
        }}
      >
        <SubComment
          comment={comment}
          setIsUpdate={setIsUpdate}
          showSource={showSource}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: '50vw',
          marginLeft: '1rem',
          marginTop: '1rem',
        }}
      >
        <EditComment comment={comment} setIsUpdate={setIsUpdate} />
      </div>
    );
  }
};

export default Comment;

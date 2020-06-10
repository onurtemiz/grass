import React, { useState, useEffect } from 'react';
import {
  removeComment,
  likeComment,
  updateComment,
} from '../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import CommentForm from '../CommentForm/CommentForm';
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

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

const Comment = ({ comment }) => {
  const [isUpdate, setIsUpdate] = useState(false);


  if (!isUpdate) {
    return (
      <div >
        <SubComment comment={comment} setIsUpdate={setIsUpdate} />
      </div>
    );
  } else {
    return (
      <div>
        <CommentForm
          lessonId={comment.lessonId}
          teacherId={comment.lessonId}
          comment={comment}
          setIsUpdate={setIsUpdate}
        />
      </div>
    );
  }
};

export default Comment;

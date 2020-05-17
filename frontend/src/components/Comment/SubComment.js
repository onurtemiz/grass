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

const Comment = ({ comment, setIsUpdate }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [likeType, setLikeType] = useState('');
  const timeOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  useEffect(() => {
    comment.likes.includes(user.id)
      ? setLikeType('liked')
      : setLikeType('like');
  }, []);
  const handleLike = () => {
    dispatch(likeComment(comment.id));
    likeType === 'like' ? setLikeType('liked') : setLikeType('like');
  };

  const handleRemove = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <h1>Are you sure?</h1>
            <p>You want to delete {comment.comment}</p>
            <button
              onClick={() => {
                dispatch(removeComment(comment.id));
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
            <button onClick={onClose}>No</button>
          </div>
        );
      },
    });
  };

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const border = {
    border: 'solid 1px black',
  };

  return (
    <div style={border}>
      <div>
        Name: {comment.user.firstName} {comment.user.lastName}
      </div>
      <div>
        {new Date(comment.date).toLocaleDateString('tr-TR', timeOptions)}
      </div>
      <div>Comment: {comment.comment}</div>
      <div>
        Likes: {comment.likes.length}
        <button onClick={handleLike}>{likeType}</button>
      </div>

      {user.id === comment.user.id ? (
        <div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      ) : null}
      {user.id === comment.user.id ? (
        <div>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;

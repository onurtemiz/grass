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
import {
  Comment as SComment,
  Icon,
  Button,
  Label,
  Divider,
  Header,
  Container,
  Segment,
} from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';
const Comment = ({ comment, setIsUpdate }) => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [likeType, setLikeType] = useState(false);
  const match = useRouteMatch('/users/:username/');
  const pagedUser = users.find((u) =>
    match ? u.username === match.params.username : false
  );
  const pagedComment = pagedUser
    ? pagedUser.comments.find((c) => c.id === comment.id)
    : null;
  const getDay = (someDate) => {
    const today = new Date();
    if (
      someDate.getFullYear() === today.getFullYear() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getDate() === today.getDate()
    ) {
      return 'Bugün';
    } else if (
      someDate.getFullYear() === today.getFullYear() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getDate() + 1 === today.getDate()
    ) {
      return 'Dün';
    } else {
      const year = today.getFullYear() - someDate.getFullYear();
      const month = today.getMonth() - someDate.getMonth();
      const day = today.getDate() - someDate.getDate();
      let s = '';
      if (year != 0) {
        s += `${year} yıl`;
      }
      if (month != 0) {
        s += `${month} ay`;
      }
      if (day != 0) {
        s += `${day} gün`;
      }
      return s + ' önce';
    }
  };

  useEffect(() => {
    comment.likes.includes(user.id) ? setLikeType(true) : setLikeType(false);
  }, []);
  const handleLike = () => {
    dispatch(likeComment(comment.id));
    likeType === false ? setLikeType(true) : setLikeType(false);
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
  return (
    <Segment color="blue">
      <SComment.Group>
        <SComment>
          <SComment.Content>
            <SComment.Author>
              <Link to={`/users/${comment.user.username}`}>
                {comment.user.username}
              </Link>
              <SComment.Metadata>
                {comment.likes.length} Pati · {getDay(new Date(comment.date))}
                {pagedComment
                  ? ` · ${pagedComment.lesson.fullName.toUpperCase()}`
                  : null}
              </SComment.Metadata>
            </SComment.Author>
            <SComment.Text>{comment.comment}</SComment.Text>
            <SComment.Actions>
              <SComment.Action
                onClick={handleLike}
                active={likeType}
                style={{ color: likeType === true ? '#0E6EB8' : '#21bb45' }}
              >
                <Icon name="paw" />
                {likeType === true ? 'Patiledin' : 'Patile'}
              </SComment.Action>
              {user.id === comment.user.id ? (
                <SComment.Action
                  onClick={handleUpdate}
                  style={{ color: '#4183c4' }}
                >
                  <Icon name="edit outline" />
                  Değiştir
                </SComment.Action>
              ) : null}
              {user.id === comment.user.id ? (
                <SComment.Action
                  onClick={handleRemove}
                  style={{ color: '#db2828' }}
                >
                  <Icon name="delete" color="red" />
                  Sil
                </SComment.Action>
              ) : null}
            </SComment.Actions>
          </SComment.Content>
        </SComment>
        {/* <Divider /> */}
      </SComment.Group>
    </Segment>
  );
};

export default Comment;

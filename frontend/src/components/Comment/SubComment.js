import React, { useState, useEffect } from 'react';
import { removeComment, likeComment } from '../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getDay } from '../../utils/dateCalc';
import { LESSON_PATH } from '../../utils/config';

import {
  Comment as SComment,
  Icon,
  Segment,
  Confirm,
  Button,
  Placeholder,
} from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getLessonById } from '../../reducers/allReducer';
import { LinearProgress } from '@material-ui/core';
import { GreenLabel } from '../Nav/NavTheme';

const Comment = ({ comment, setIsUpdate, showTeacher, lessonId }) => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const all = useSelector((state) => state.all.all);
  const dispatch = useDispatch();
  const [likeType, setLikeType] = useState(false);
  const [isRemovePanel, setIsRemovePanel] = useState(false);
  const [isLessonPresent, setIsLessonPresent] = useState(false);
  const match = useRouteMatch('/users/:username/');

  useEffect(() => {
    comment.likes.includes(user.id) ? setLikeType(true) : setLikeType(false);
  }, []);
  const handleLike = () => {
    dispatch(likeComment(comment.id));
    likeType === false ? setLikeType(true) : setLikeType(false);
  };

  const getLesson = () => {
    return all.find((l) => l.id === lessonId);
  };

  const handleRemove = () => {
    dispatch(removeComment(comment.id));
    setIsRemovePanel(false);
  };

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  useEffect(() => {
    if (!getLesson()) {
      dispatch(getLessonById(lessonId));
    }
  }, []);

  if (!getLesson()) {
    return (
      <Placeholder style={{ marginTop: '1em', marginLeft: '1em' }}>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    );
  }
  const commentLesson = all.find((l) => l.id === lessonId);
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
                {!!showTeacher ? ' · ' : null}
                {!!showTeacher ? (
                  <Link
                    to={LESSON_PATH(commentLesson, commentLesson.teacher.name)}
                  >
                    <GreenLabel>
                      {commentLesson.fullName.toUpperCase()}
                    </GreenLabel>
                  </Link>
                ) : null}
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
                  style={{ color: '#21bb45' }}
                >
                  <Icon name="edit outline" />
                  Değiştir
                </SComment.Action>
              ) : null}
              {user.id === comment.user.id ? (
                <>
                  <SComment.Action
                    onClick={() => setIsRemovePanel(true)}
                    style={{ color: '#db2828' }}
                  >
                    <Icon name="delete" color="red" />
                    Sil
                  </SComment.Action>
                  <Confirm
                    open={isRemovePanel}
                    onConfirm={() => handleRemove()}
                    confirmButton="Sil gitsin"
                    cancelButton="Hayır"
                    onCancel={() => setIsRemovePanel(false)}
                    header="Yorumunu silmek istediğine emin misin?"
                    content={comment.comment}
                  />
                </>
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

import React, { useState, useEffect } from 'react';
import { removeComment, likeComment } from '../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getDay } from '../../utils/dateCalc';
import { LESSON_PATH, CLUB_PATH } from '../../utils/config';

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
import { Label } from '../Nav/NavTheme';
import CommentReport from './CommentReport';
import HiddenComment from './HiddenComment';

const Comment = ({ comment, setIsUpdate, showSource }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [likeType, setLikeType] = useState(false);
  const [isRemovePanel, setIsRemovePanel] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);
  useEffect(() => {
    comment.likes.includes(user.id) ? setLikeType(true) : setLikeType(false);
  }, []);
  const handleLike = () => {
    dispatch(likeComment(comment.id));
    likeType === false ? setLikeType(true) : setLikeType(false);
  };

  const handleRemove = () => {
    dispatch(removeComment(comment.id));
    setIsRemovePanel(false);
  };

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const handleReport = () => {
    setIsReportOpen(true);
  };

  if (comment.isHidden == true) {
    return <HiddenComment comment={comment} showSource={showSource} />;
  }

  return (
    <Segment color="blue">
      <SComment.Group>
        <SComment>
          <CommentReport
            setIsReportOpen={setIsReportOpen}
            isReportOpen={isReportOpen}
            comment={comment}
            setIsReported={setIsReported}
          />
          <SComment.Content>
            {comment.commentType === 'lesson' ? (
              <LessonType comment={comment} showSource={showSource} />
            ) : null}
            {comment.commentType === 'club' ? (
              <ClubType comment={comment} showSource={showSource} />
            ) : null}

            <SComment.Text>{comment.comment}</SComment.Text>
            <SComment.Actions>
              <SComment.Action onClick={handleLike} active={likeType}>
                <Icon name="paw" color={likeType ? 'blue' : 'green'} />
                <Label bold pointer color={likeType ? 'blue' : 'green'}>
                  {likeType === true ? 'Patiledin' : 'Patile'}
                </Label>
              </SComment.Action>
              {user.id !== comment.user.id ? (
                <SComment.Action
                  onClick={handleReport}
                  style={{ color: '#db2828' }}
                >
                  <Icon name="bug" />
                  <Label bold pointer color="red">
                    {isReported ? 'Isırdın' : 'Isır'}
                  </Label>
                </SComment.Action>
              ) : null}
              {user.id === comment.user.id ? (
                <SComment.Action onClick={handleUpdate}>
                  <Icon name="edit outline" color="green" />
                  <Label bold pointer color="green">
                    Düzenle
                  </Label>
                </SComment.Action>
              ) : null}
              {user.id === comment.user.id ? (
                <>
                  <SComment.Action onClick={() => setIsRemovePanel(true)}>
                    <Icon name="delete" color="red" />
                    <Label bold pointer color="red">
                      Sil
                    </Label>
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

export const LessonType = ({ comment, showSource }) => {
  return (
    <SComment.Author>
      <Link to={`/users/${comment.user.username}`}>
        {comment.user.username}
      </Link>
      <SComment.Metadata>
        {comment.likes.length} Pati · {getDay(new Date(comment.date))}
        {!!showSource ? ' · ' : null}
        {!!showSource ? (
          <Link to={LESSON_PATH(comment.lesson, comment.teacher.name)}>
            <Label color="blue" pointer>
              {comment.lesson.fullName.toUpperCase()}
            </Label>
          </Link>
        ) : null}
      </SComment.Metadata>
    </SComment.Author>
  );
};

export const ClubType = ({ comment, showSource }) => {
  return (
    <SComment.Author>
      <Link to={`/users/${comment.user.username}`}>
        {comment.user.username}
      </Link>
      <SComment.Metadata>
        {comment.likes.length} Pati · {getDay(new Date(comment.date))}
        {!!showSource ? ' · ' : null}
        {!!showSource ? (
          <Link to={CLUB_PATH(comment.club)}>
            <Label color="blue" pointer>
              {comment.club.shortName.toUpperCase()}
            </Label>
          </Link>
        ) : null}
      </SComment.Metadata>
    </SComment.Author>
  );
};

export default Comment;

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
import { Label } from '../Nav/NavTheme';
import CommentReport from './CommentReport';
import HiddenComment from './HiddenComment';

const Comment = ({
  comment,
  setIsUpdate,
  showTeacher,
  typeId,
  commentType,
}) => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const all = useSelector((state) => state.all.all);
  const dispatch = useDispatch();
  const [likeType, setLikeType] = useState(false);
  const [isRemovePanel, setIsRemovePanel] = useState(false);
  const [isLessonPresent, setIsLessonPresent] = useState(false);
  const match = useRouteMatch('/users/:username/');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);
  useEffect(() => {
    comment.likes.includes(user.id) ? setLikeType(true) : setLikeType(false);
  }, []);
  const handleLike = () => {
    dispatch(likeComment(comment.id));
    likeType === false ? setLikeType(true) : setLikeType(false);
  };

  const getLesson = () => {
    return all.find((l) => l.id === typeId);
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

  useEffect(() => {
    if (commentType === 'lesson' && !getLesson()) {
      dispatch(getLessonById(typeId));
    }
  }, []);

  if (commentType === 'lesson' && !getLesson()) {
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
  const commentLesson = all.find((l) => l.id === typeId);

  if (comment.isHidden == true) {
    return (
      <HiddenComment
        comment={comment}
        commentLesson={commentLesson}
        showTeacher={showTeacher}
        getDay={getDay}
      />
    );
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
            {commentType === 'lesson' ? (
              <LessonType
                comment={comment}
                commentLesson={commentLesson}
                showTeacher={showTeacher}
              />
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

const LessonType = ({ comment, commentLesson, showTeacher }) => {
  return (
    <SComment.Author>
      <Link to={`/users/${comment.user.username}`}>
        {comment.user.username}
      </Link>
      <SComment.Metadata>
        {comment.likes.length} Pati · {getDay(new Date(comment.date))}
        {!!showTeacher ? ' · ' : null}
        {!!showTeacher ? (
          <Link to={LESSON_PATH(commentLesson, commentLesson.teacher.name)}>
            <Label color="green" pointer>
              {commentLesson.fullName.toUpperCase()}
            </Label>
          </Link>
        ) : null}
      </SComment.Metadata>
    </SComment.Author>
  );
};

export default Comment;

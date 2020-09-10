import React, { useState, useEffect } from 'react';
import { removeComment, likeComment } from '../../../reducers/commentReducer';
import { useDispatch, useSelector } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  LESSON_PATH,
  CLUB_PATH,
  CAMPUS_PATH,
  DORM_PATH,
  QUESTION_PATH,
} from '../../../utils/config';
import {
  Comment as SComment,
  Icon,
  Segment,
  Confirm,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/tr';
import HiddenComment from './HiddenComment';
import CommentReport from './CommentReport';
import { Label } from '../../Nav/NavTheme';
import UserIcon from '../../UserPage/User/UserIcon'

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

  if (comment.commentStatus == 'hidden') {
    return <HiddenComment comment={comment} showSource={showSource} />;
  }
  return (
    <Segment color={commentThemeColor(comment)}>
      <SComment.Group>
        <SComment>
          <CommentReport
            setIsReportOpen={setIsReportOpen}
            isReportOpen={isReportOpen}
            comment={comment}
            setIsReported={setIsReported}
          />

          <SComment.Content>
            <UserAndMeta comment={comment} showSource={showSource} />
            <SComment.Text style={{ whiteSpace: 'pre-line' }}>
              {comment.comment}
            </SComment.Text>
            <SComment.Actions>
              {user.id !== comment.user.id ? (
                <SComment.Action onClick={handleLike} active={likeType}>
                  <Icon name="paw" color={likeType ? 'blue' : 'green'} />
                  <Label bold pointer color={likeType ? 'blue' : 'green'}>
                    {likeType === true ? 'Patiledin' : 'Patile'}
                  </Label>
                </SComment.Action>
              ) : null}
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

export const UserAndMeta = ({ comment, showSource }) => {
  moment.locale('tr');
  return (
    <SComment.Author>
      <Link to={`/users/${comment.user.username}`}>
        <Label color={commentThemeColor(comment)} bold pointer>
          {comment.user.username}
          
        </Label>
      </Link>
      {comment.user.iconName.length > 0 && (
     <>{""} <UserIcon iconName={comment.user.iconName} themeColor={commentThemeColor(comment)}/></>
          ) }

      <SComment.Metadata>
        {comment.likes.length} Pati · {moment(new Date(comment.date)).fromNow()}{' '}
        {comment.edited ? ' · (düzenlendi)' : null}
        {!!showSource ? ' · ' : null}
        {!!showSource ? (
          <>
            {comment.commentType === 'lesson' ? (
              <LessonType comment={comment} />
            ) : null}
            {comment.commentType === 'club' ? (
              <ClubType comment={comment} />
            ) : null}
            {comment.commentType === 'campus' ? (
              <CampusType comment={comment} />
            ) : null}
            {comment.commentType === 'dorm' ? (
              <DormType comment={comment} />
            ) : null}
            {comment.commentType === 'question' ? (
              <QuestionType comment={comment} />
            ) : null}
          </>
        ) : null}
      </SComment.Metadata>
    </SComment.Author>
  );
};

const LessonType = ({ comment }) => {
  return (
    <Link to={LESSON_PATH(comment.lesson)}>
      <Label color={commentThemeColor(comment)} pointer>
        {`${comment.lesson.name.toUpperCase()} · ${comment.lesson.parentName}`}
      </Label>
    </Link>
  );
};

const ClubType = ({ comment }) => {
  return (
    <Link to={CLUB_PATH(comment.club)}>
      <Label color={commentThemeColor(comment)} pointer>
        {comment.club.name.toUpperCase()}
      </Label>
    </Link>
  );
};

const CampusType = ({ comment }) => {
  return (
    <Link to={CAMPUS_PATH(comment.campus)}>
      <Label color={commentThemeColor(comment)} pointer>
        {comment.campus.name.toUpperCase()}
      </Label>
    </Link>
  );
};

const DormType = ({ comment }) => {
  return (
    <Link to={DORM_PATH(comment.dorm)}>
      <Label color={commentThemeColor(comment)} pointer>
        {comment.dorm.name.toUpperCase()}
      </Label>
    </Link>
  );
};

const QuestionType = ({ comment }) => {
  return (
    <Link to={QUESTION_PATH(comment.question)}>
      <Label color={commentThemeColor(comment)} pointer>
        {comment.question.question}
      </Label>
    </Link>
  );
};

const commentThemeColor = (comment) => {
  return comment.recommend === 1
    ? 'green'
    : comment.recommend === -1
    ? 'red'
    : 'blue';
};



export default Comment;

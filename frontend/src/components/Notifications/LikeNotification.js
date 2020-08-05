import React from 'react';
import { Feed, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Label } from '../Nav/NavTheme';
import {
  USER_PATH,
  CAMPUS_PATH,
  DORM_PATH,
  CLUB_PATH,
  LESSON_PATH,
  QUESTION_PATH,
} from '../../utils/config';
import moment from 'moment';
const LikeNotification = ({ notification }) => {
  moment.locale('tr');

  return (
    <Feed.Event>
      <Feed.Label>
        <Icon color="green" name="paw" />
      </Feed.Label>

      <Feed.Content>
        <Feed.Date content={moment(new Date(notification.date)).fromNow()} />

        <Feed.Summary>
          <Link to={USER_PATH(notification.responsible.username)}>
            {' '}
            <Label color="blue" bold pointer>
              {notification.responsible.username}{' '}
            </Label>
          </Link>{' '}
          <Link to={getCommentLink(notification.tool)}>
            {' '}
            <Label color="green" bold pointer>
              {getType(notification.tool)}
            </Label>
          </Link>{' '}
          yorumunu patiledi.
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
};

const getType = (comment) => {
  if (comment.commentType === 'question') {
    return comment.question.question;
  } else {
    return comment[`${comment.commentType}`].name;
  }
};

const getCommentLink = (comment) => {
  if (comment.commentType === 'lesson') {
    return LESSON_PATH(comment.lesson);
  } else if (comment.commentType === 'club') {
    return CLUB_PATH(comment.club);
  } else if (comment.commentType === 'dorm') {
    return DORM_PATH(comment.dorm);
  } else if (comment.commentType === 'campus') {
    return CAMPUS_PATH(comment.campus);
  } else if (comment.commentType === 'question') {
    return QUESTION_PATH(comment.question);
  }
  return;
};

export default LikeNotification;

import React, { useState, useEffect } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Label } from '../Nav/NavTheme';
import userService from '../../services/user';

import {
  USER_PATH,
  CAMPUS_PATH,
  DORM_PATH,
  CLUB_PATH,
  LESSON_PATH,
  QUESTION_PATH,
} from '../../utils/config';
import moment from 'moment';
const LikeNotification = ({
  notification,
  notifications,
  setNotifications,
}) => {
  moment.locale('tr');

  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!notification.seen && hover) {
      notification.seen = true;
      userService.seenNotification(notification.id);
    }
  }, [hover]);

  const deleteNotification = () => {
    userService.deleteNotification(notification.id);
    setNotifications(notifications.filter((n) => n.id !== notification.id));
  };

  return (
    <Feed.Event
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ opacity: notification.seen ? '1' : '0.8' }}
    >
      <Feed.Label
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {hover ? (
          <Icon
            color="grey"
            name="delete"
            onClick={() => deleteNotification()}
          />
        ) : (
          <Icon color="green" name="paw" />
        )}
      </Feed.Label>
      <Feed.Content style={{ marginLeft: '0' }}>
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

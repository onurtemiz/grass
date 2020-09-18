import React, { useState, useEffect } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Label } from '../Nav/NavTheme';
import userService from '../../services/user';

import { USER_PATH } from '../../utils/config';
import moment from 'moment';
const PatiLikeNotification = ({
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
          bir tavsiyeni patiledi.
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
};

export default PatiLikeNotification;

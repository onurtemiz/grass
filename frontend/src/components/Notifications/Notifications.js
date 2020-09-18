import React, { useState, useEffect } from 'react';
import { Popup, Icon, Feed, Button, Placeholder } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import userService from '../../services/user';
import LikeNotification from './LikeNotification';
import NewCommentNotification from './NewCommentNotification';
import { useLocation } from 'react-router-dom';
import PatiLikeNotification from './PatiLikeNotification';
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setUnseenNotifications(notifications.filter((n) => n.seen !== true));
  }, [notifications]);
  useEffect(() => {
    const getSortedNotifications = async (setLoading) => {
      const notifications = await userService.getNotifications(setLoading);
      if (Array.isArray(notifications)) {
        setNotifications(
          notifications.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      }
    };
    getSortedNotifications(setLoading);
    setLoading(true);
    setOpen(false);
  }, [location]);
  return (
    <Popup
      wide="very"
      on="click"
      position={'right'}
      trigger={
        <Label
          color={open ? 'green' : 'blue'}
          pointer
          bold
          onClick={() => setOpen(!open)}
        >
          <div style={{ display: 'flex' }}>
            {unseenNotifications.length > 0 ? (
              <div style={{ position: 'relative', marginRight: '1em' }}>
                <Icon name="bell" color={open ? 'green' : 'blue'} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-0.5em',
                    right: '-0.6em',
                    backgroundColor: '#db2828',
                    borderRadius: ' 50%',
                    color: 'white',
                    padding:
                      unseenNotifications.length > 9 ? '2px 3px' : '2px 3px',
                    fontSize: '10px',
                  }}
                >
                  {unseenNotifications.length > 9
                    ? '9+'
                    : unseenNotifications.length}
                </span>
              </div>
            ) : (
              <Icon name="bell" color={open ? 'green' : 'blue'} />
            )}
            Bildirimler
          </div>
        </Label>
      }
      open={open}
      popperModifiers={{
        preventOverflow: {
          boundariesElement: 'offsetParent',
        },
      }}
    >
      <NotificationFeed
        notifications={notifications}
        setNotifications={setNotifications}
        loading={loading}
        setOpen={setOpen}
      />
    </Popup>
  );
};
const NotificationFeed = ({
  notifications,
  setNotifications,
  loading,
  setOpen,
}) => {
  const deleteNotifications = () => {
    userService.deleteNotifications();
    setNotifications([]);
    setOpen(false);
  };

  if (loading) {
    return (
      <Placeholder style={{ minWidth: '100px' }}>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Placeholder>
    );
  }

  if (notifications.length === 0) {
    return (
      <Label color="green" bold>
        Herhangi bir bildirim yok.
      </Label>
    );
  }
  return (
    <>
      <Button color="red" fluid onClick={() => deleteNotifications()}>
        Bildirimleri Sil
      </Button>
      <Feed style={{ overflow: 'auto', height: '300px' }}>
        {notifications.map((n) =>
          n.tool ? (
            n.notificationType === 'like' ? (
              <LikeNotification
                notification={n}
                key={n.id}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            ) : n.notificationType === 'newComment' ? (
              <NewCommentNotification
                notification={n}
                key={n.id}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            ) : null
          ) : n.notificationType === 'tiplike' ? (
            <PatiLikeNotification
              notification={n}
              key={n.id}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          ) : null
        )}
      </Feed>
    </>
  );
};

export default Notifications;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import Comments from '../../Comments/Comments/IdComments';
import { Header, Icon } from 'semantic-ui-react';
import { useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import { getPopulatedUser } from '../../../reducers/usersReducer';
import { Label } from '../../Nav/NavTheme';
import UserIcons from './UserIcons';
import Follow from '../../Follow/Follow';
import { isMobile } from 'react-device-detect';

const User = ({ u }) => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/users/:username/');
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.user);
  const [user, setUser] = useState(u);
  const location = useLocation;
  useEffect(() => {
    if (!u) dispatch(getPopulatedUser(match.params.username));
  }, []);

  useEffect(() => {
    if (!u) {
      let foundUser = users.find((u) => u.username === match.params.username);
      setUser(foundUser);
    }
  }, [users, location, match]);

  if (!u && match.params.username === currentUser.username) {
    return <Redirect to="/user" />;
  }
  if (user == null) {
    return <LinearProgress />;
  }
  return (
    <div
      style={{
        minHeight: '90vh',
        maxHeight: '100%',
        marginLeft: '1em',
      }}
    >
      {isMobile ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '2em',
            lineHeight: '1.5',
            marginTop: '0.5em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Label color="green" bold style={{ marginRight: '0.5em' }}>
              {user.username}
            </Label>
            <Label color="blue" bold style={{ marginRight: '0.5em' }}>
              {user.totalLikes} <Icon name="paw" color="blue" />
            </Label>
            <Follow idToFollow={user.id} />
          </div>
          <UserIcons achievements={user.achievements} />
        </div>
      ) : (
        <div
          style={{
            fontSize: '2em',
            lineHeight: '1.5',
            marginTop: '0.5em',
          }}
        >
          <Label color="green" bold style={{ marginRight: '0.5em' }}>
            {user.username}
          </Label>
          <Label color="blue" bold>
            {user.totalLikes} <Icon name="paw" color="blue" />
          </Label>
          <UserIcons achievements={user.achievements} />
          {user.username !== currentUser.username && (
            <>
              <Label color="blue" bold>
                {' '}
              </Label>
              <Follow idToFollow={user.id} />
            </>
          )}
        </div>
      )}
      <Comments
        type="user"
        typeId={user.id}
        showSource={true}
        commentType="mix"
      />
    </div>
  );
};

export default User;

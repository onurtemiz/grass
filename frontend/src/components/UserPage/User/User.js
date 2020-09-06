import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import Comments from '../../Comments/Comments/IdComments';
import { Header, Label as SLabel, Icon } from 'semantic-ui-react';
import { Link, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import { getPopulatedUser } from '../../../reducers/usersReducer';
import { Label } from '../../Nav/NavTheme';
import UserIcons from './UserIcons'
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
    <div style={{ minHeight: '90vh', maxHeight: '100%', marginLeft: '1em' }}>
      <Header
        as="h1"
        style={
          u ? { marginLeft: '1em' } : { marginLeft: '1em', marginTop: '1em' }
        }
      >
        <Label color="green">{user.username} · </Label>
        <Label color="blue">
          {user.totalLikes} <Icon name="paw" color="blue" /> · <UserIcons achievements={user.achievements} />
        </Label>
      </Header>

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

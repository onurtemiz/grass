import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/usersReducer';
import { LinearProgress } from '@material-ui/core';
import Comments from '../Comments/Comments';
import { Header } from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';
const User = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/users/:username/').params;
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getPopulatedUser(match.username));
  }, []);

  if (users.find((u) => u.username === match.username) === undefined) {
    return <LinearProgress />;
  }
  const user = users.find((u) => u.username === match.username);

  return (
    <div style={{ height: '90vh' }}>
      <Header as="h1" color="green">
        {user.username}
      </Header>
      <Header as="h1" color="blue">
        {user.totalLikes}
      </Header>
      <Header as={Link} to="user/edit">
        Bilgilerini Güncelle
      </Header>
      <Comments type="user" typeId={user.id} />
    </div>
  );
};

export default User;

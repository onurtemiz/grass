import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/userReducer';
import { LinearProgress } from '@material-ui/core';
import Comments from '../Comments/Comments';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const User = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopulatedUser(user.id));
  }, []);

  if (!('totalLikes' in user)) {
    return <LinearProgress />;
  }

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

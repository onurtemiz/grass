import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../reducers/userReducer';
import { Menu, Icon } from 'semantic-ui-react';
import { BlueLabel } from '../Nav/NavTheme';
const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Menu.Item onClick={handleLogout} header color="blue">
      <Icon name="log out" color="blue" />
      <BlueLabel> Çıkış Yap</BlueLabel>
    </Menu.Item>
  );
};

export default Logout;

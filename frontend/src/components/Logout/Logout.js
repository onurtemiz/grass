import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../reducers/userReducer';
import { Menu, Icon } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Menu.Item onClick={handleLogout} header color="blue">
      <Icon name="log out" color="blue" />
      <Label color="blue" pointer>
        Çıkış Yap
      </Label>
    </Menu.Item>
  );
};

export default Logout;

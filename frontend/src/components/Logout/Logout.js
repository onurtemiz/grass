import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../reducers/userReducer';
import { Menu, Icon } from 'semantic-ui-react';
const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <Menu.Item
        onClick={handleLogout}
        position="right"
        style={{ backgroundColor: '#f44336', color: 'whitesmoke' }}
      >
        <Icon name="log out" />
        Çıkış Yap
      </Menu.Item>
    </>
  );
};

export default Logout;

import React from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import Logout from '../Logout/Logout';
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Segment,
  Icon,
  Header,
} from 'semantic-ui-react';
const Nav = () => {
  return (
    <Menu style={{ marginBottom: '0' }}>
      <Menu.Item
        as={Link}
        to="/"
        style={{ backgroundColor: '#21ba45', color: 'white' }}
      >
        <Icon name="home" />
        Ana Sayfa
      </Menu.Item>
      <Filter />
      <Menu.Item
        as={Link}
        to="/user"
        position="right"
        style={{ backgroundColor: '#f44336', color: 'whitesmoke' }}
      >
        Hesabım
      </Menu.Item>
      <Logout />
    </Menu>
  );
};

export default Nav;

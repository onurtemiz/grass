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
} from 'semantic-ui-react';
const Nav = () => {
  return (
    <Menu style={{ marginBottom: '0' }}>
      <Menu.Item
        as={Link}
        to="/"
        style={{ backgroundColor: '#049a04a6', color: 'white' }}
      >
        <Icon name="home" />
        Ana Sayfa
      </Menu.Item>
      <Filter />
      <Logout />
    </Menu>
  );
};

export default Nav;

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
import { useSelector } from 'react-redux';
const Nav = () => {
  const user = useSelector((state) => state.user);
  return (
    <Menu style={{ marginBottom: '0' }}>
      <Menu.Item as={Link} to="/" >
        <Icon name="home" />
        Ana Sayfa
      </Menu.Item>
      <Filter />
      <Menu.Item
        as={Link}
        to={`/comments`}
        position="right"
        style={{ backgroundColor: '#f44336', color: 'whitesmoke' }}
      >
        Tüm Yorumlar
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`/users/${user.username}`}
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

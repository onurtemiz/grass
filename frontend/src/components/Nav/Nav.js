import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import { useRouteMatch, useLocation } from 'react-router-dom';

import {
  Container,
  Dropdown,
  Image,
  Menu,
  Segment,
  Icon,
  Header,
  Tab,
} from 'semantic-ui-react';
import { NavSearch, Label } from './NavTheme';
import { useSelector } from 'react-redux';
import Search from '../Search/Search';
import Notifications from '../Notifications/Notifications';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../reducers/userReducer';

const Nav = ({ search, admin }) => {
  const user = useSelector((state) => state.user);
  const [active, setActive] = useState('');
  const match = useRouteMatch('/:path');
  const homeMatch = useRouteMatch('/');
  const userMatch = useRouteMatch(`/user`);

  const location = useLocation();

  useEffect(() => {
    if (match) {
      let p = match.params.path;
      if (p === 'feed') {
        setActive('feed');
        return;
      } else if (p === 'comments') {
        setActive('comments');
        return;
      } else if (
        p === 'statics' ||
        p === 'about' ||
        p === 'contribution' ||
        p === 'terms'
      ) {
        setActive('statics');
        return;
      }
    }
    if (
      location.pathname.includes('control') ||
      location.pathname.includes('lessons') ||
      location.pathname.includes('tips') ||
      location.pathname.includes('questions') ||
      location.pathname.includes('dorms') ||
      location.pathname.includes('clubs') ||
      location.pathname.includes('campuses') ||
      location.pathname.includes('teachers')
    ) {
      setActive('control');
      return;
    }
    if (userMatch) {
      setActive('user');
      return;
    }
    if (homeMatch && homeMatch.isExact) {
      setActive('home');
      return;
    }

    setActive('');
  }, [location]);

  return (
    <Menu style={{ marginBottom: '0' }} pointing secondary color="green">
      <Menu.Item
        as={Link}
        to="/"
        active={active === 'home'}
        onClick={() => setActive('home')}
        header
      >
        <label>
          <Label color="blue" pointer>
            BOUN
          </Label>{' '}
          <Label pointer color="green">
            ÇİM
          </Label>{' '}
          <Label pointer color="blue">
            ALPHA v0.9.4
          </Label>
        </label>
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`/control`}
        active={active === 'control'}
        onClick={() => setActive('control')}
        header
      >
        <Icon name="eye" color={active === 'control' ? 'green' : 'blue'} />
        <Label color={active === 'control' ? 'green' : 'blue'} pointer>
          Manzara
        </Label>
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`/feed`}
        active={active === 'feed'}
        onClick={() => setActive('feed')}
        header
      >
        <Icon name="hockey puck" color={active === 'feed' ? 'green' : 'blue'} />
        <Label color={active === 'feed' ? 'green' : 'blue'} pointer>
          Mama Kabım
        </Label>
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`/comments`}
        active={active === 'comments'}
        onClick={() => setActive('comments')}
        header
      >
        <Icon
          name="comments"
          color={active === 'comments' ? 'green' : 'blue'}
        />
        <Label color={active === 'comments' ? 'green' : 'blue'} pointer>
          Meydan
        </Label>
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`/statics`}
        active={active === 'statics'}
        onClick={() => setActive('statics')}
        header
      >
        <Icon name="flask" color={active === 'statics' ? 'green' : 'blue'} />
        <Label color={active === 'statics' ? 'green' : 'blue'} pointer>
          Detaylar
        </Label>
      </Menu.Item>
      {admin ? (
        <Menu.Item
          as={Link}
          to={`/admin`}
          active={active === 'admin'}
          onClick={() => setActive('admin')}
          header
        >
          <Icon name="user secret" color="blue" />
          <Label color="blue" pointer>
            Admin
          </Label>
        </Menu.Item>
      ) : null}

      <Menu.Menu position="right">
        <Menu.Item>
          <Notifications />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={`/user`}
          active={active === 'user'}
          onClick={() => setActive('user')}
          header
        >
          <Icon name="user" color={active === 'user' ? 'green' : 'blue'} />
          <Label color={active === 'user' ? 'green' : 'blue'} pointer>
            Hesabım
          </Label>
        </Menu.Item>

        <Logout />
      </Menu.Menu>
    </Menu>
  );
};

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

export default Nav;

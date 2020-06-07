import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/userReducer';
import { LinearProgress } from '@material-ui/core';
import Comments from '../Comments/Comments';
import { Header, Tab, Menu, Icon } from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';
import EditUser from '../EditUser/EditUser';
import Following from '../Following/Following';
import { Label } from '../Nav/NavTheme';
const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    dispatch(getPopulatedUser(user.username));
  }, []);

  if (typeof user.comments == 'undefined') {
    return null;
  }

  const getColor = (i) => {
    return activeIndex === i ? 'green' : 'blue';
  };

  const panes = [
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(0)}>
            Hesabım
          </Label>
        ),
        color: 'green',
      },
      render: () => (
        <Tab.Pane>
          <UserPage user={user} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(1)}>
            Takip Ettiklerim
          </Label>
        ),
        color: 'green',
      },
      render: () => (
        <Tab.Pane>
          <Following />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(2)}>
            Bilgilerimi Güncelle
          </Label>
        ),
        color: 'green',
      },
      render: () => (
        <Tab.Pane>
          <EditUser setActiveIndex={setActiveIndex} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div style={{ height: '90vh' }}>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true, pointing: true }}
        panes={panes}
        onTabChange={(event, data) => setActiveIndex(data.activeIndex)}
        activeIndex={activeIndex}
      />
    </div>
  );
};

const UserPage = ({ user }) => {
  return (
    <div>
      <Header as="h1" color="green">
        {user.username}
      </Header>
      <Header as="h1" color="blue">
        {user.totalLikes}
      </Header>

      <Comments type="user" typeId={user.id} showTeacher />
    </div>
  );
};

export default User;

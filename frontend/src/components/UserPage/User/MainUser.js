/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../../reducers/userReducer';
import { LinearProgress } from '@material-ui/core';
import Comments from '../../Comments/Comments/IdComments';
import { Header, Tab, Menu, Icon } from 'semantic-ui-react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import EditUser from '../EditUser/EditUser';
import Following from '../Following/Following';
import { Label } from '../../Nav/NavTheme';
import User from './User';
const MainUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [activeIndex, setActiveIndex] = useState();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    dispatch(getPopulatedUser(user.username));
  }, [user]);
  useEffect(() => {
    if (location.pathname.includes('follows')) {
      setActiveIndex(1);
    } else if (location.pathname.includes('edit')) {
      setActiveIndex(2);
    } else {
      setActiveIndex(0);
    }
  }, [location]);

  useEffect(() => {
    if (activeIndex === 1) {
      history.push('/user/follows');
    } else if (activeIndex === 2) {
      history.push('/user/edit');
    } else if (activeIndex === 0) {
      history.push('/user');
    }
  }, [activeIndex]);

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
        key: 1,
      },
      render: () => (
        <Tab.Pane>
          <User u={user} />
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
        key: 2,
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
        key: 3,
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
        style={{ marginTop: '1em' }}
      />
    </div>
  );
};

// const UserPage = ({ user }) => {
//   return (
//     <div>
//       <Header as="h1" color="green">
//         {user.username}
//       </Header>
//       <Header as="h1" color="blue">
//         {user.totalLikes}
//       </Header>

//       <Comments type="user" typeId={user.id} />
//     </div>
//   );
// };

export default MainUser;

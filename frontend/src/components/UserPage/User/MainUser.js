/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedMainUser } from '../../../reducers/userReducer';
import { LinearProgress } from '@material-ui/core';
import Comments from '../../Comments/Comments/IdComments';
import { Header, Tab, Menu, Icon } from 'semantic-ui-react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import EditUser from '../EditUser/EditUser';
import Following from '../Following/Following';
import { Label } from '../../Nav/NavTheme';
import User from './User';
import Icons from '../Icons/Icons';
import { isMobile } from 'react-device-detect';
import QuotaFollowing from '../QuotaFollowing/QuotaFollowing';

const MainUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [activeIndex, setActiveIndex] = useState();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    dispatch(getPopulatedMainUser());
  }, [location]);
  useEffect(() => {
    if (location.pathname.includes('follows')) {
      setActiveIndex(1);
    } else if (location.pathname.includes('quota')) {
      setActiveIndex(2);
    } else if (location.pathname.includes('icons')) {
      setActiveIndex(3);
    } else if (location.pathname.includes('edit')) {
      setActiveIndex(4);
    } else {
      setActiveIndex(0);
    }
  }, [location]);

  useEffect(() => {
    if (activeIndex === 1) {
      history.push('/user/follows');
    } else if (activeIndex === 2) {
      history.push('/user/quota');
    } else if (activeIndex === 0) {
      history.push('/user');
    } else if (activeIndex === 3) {
      history.push('/user/icons');
    } else if (activeIndex === 4) {
      history.push('/user/edit');
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
        key: 0,
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
            Takip
          </Label>
        ),
        color: 'green',
        key: 1,
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
            Kota Takip
          </Label>
        ),
        color: 'green',
        key: 2,
      },
      render: () => (
        <Tab.Pane>
          <QuotaFollowing />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(3)}>
            İkonlarım
          </Label>
        ),
        color: 'green',
        key: 3,
      },
      render: () => (
        <Tab.Pane>
          <div style={{ marginBottom: '1em' }}>
            <Icons user={user} />
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(4)}>
            Güncelle
          </Label>
        ),
        color: 'green',
        key: 4,
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
        menu={
          isMobile
            ? { fluid: true, vertical: false, tabular: true, pointing: true }
            : { fluid: true, vertical: true, tabular: true, pointing: true }
        }
        panes={panes}
        onTabChange={(event, data) => setActiveIndex(data.activeIndex)}
        activeIndex={activeIndex}
        style={{ marginTop: '1em' }}
      />
    </div>
  );
};

export default MainUser;

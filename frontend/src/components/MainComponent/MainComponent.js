import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/userReducer';
import { LinearProgress } from '@material-ui/core';
import Comments from '../Comments/Comments';
import { Header, Tab, Menu, Icon, Segment } from 'semantic-ui-react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import EditUser from '../EditUser/EditUser';
import Following from '../Following/Following';
import { Label } from '../Nav/NavTheme';
import Teachers from '../Teachers/Teachers';
import Teacher from '../Teacher/Teacher';
import Lesson from '../Lesson/Lesson';
import Lessons from '../Lessons/Lessons';
import Clubs from '../Clubs/Clubs';
import Club from '../Club/Club';

const MainComponent = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const teacherPageMatch = useRouteMatch('/teachers/:name');
  const lessonPageMatch = useRouteMatch(
    '/lessons/:areaCode/:digitCode/:teacherName'
  );
  const clubPageMatch = useRouteMatch('/clubs/:name');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('teachers')) {
      setActiveIndex(0);
    } else if (location.pathname.includes('lessons')) {
      setActiveIndex(1);
    } else if (location.pathname.includes('clubs')) {
      setActiveIndex(2);
    }
  }, [location]);

  const getColor = (i) => {
    return activeIndex === i ? 'green' : 'blue';
  };

  const handleIndex = (e, data) => {
    setActiveIndex(data.activeIndex);
    if (data.activeIndex === 0) {
      history.push('/teachers');
    } else if (data.activeIndex === 1) {
      history.push('/lessons');
    } else if (data.activeIndex === 2) {
      history.push('/clubs');
    }
  };

  const panes = [
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(0)}>
            Hocalar
          </Label>
        ),
        color: 'green',
      },
      render: () => (
        <Segment
          basic={teacherPageMatch && teacherPageMatch.isExact ? true : false}
        >
          {teacherPageMatch && teacherPageMatch.isExact ? (
            <Teacher />
          ) : (
            <Teachers />
          )}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(1)}>
            Dersler
          </Label>
        ),
        color: 'green',
      },
      render: () => (
        <Segment
          basic={lessonPageMatch && lessonPageMatch.isExact ? true : false}
        >
          {lessonPageMatch && lessonPageMatch.isExact ? (
            <Lesson />
          ) : (
            <Lessons main />
          )}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(2)}>
            Kulüpler
          </Label>
        ),
        color: 'green',
      },
      render: () => (
        <Segment basic={clubPageMatch && clubPageMatch.isExact ? true : false}>
          {clubPageMatch && clubPageMatch.isExact ? <Club /> : <Clubs main />}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(2)}>
            Tavsiyeler
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
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(2)}>
            Kampüsler
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
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(2)}>
            Kullanıcılar
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
        onTabChange={(event, data) => handleIndex(event, data)}
        activeIndex={activeIndex}
        style={{ paddingTop: '1em' }}
      />
    </div>
  );
};

export default MainComponent;

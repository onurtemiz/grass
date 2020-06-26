import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/userReducer';
import { LinearProgress } from '@material-ui/core';
import Comments from '../Comments/Comments/IdComments';
import { Header, Tab, Menu, Icon, Segment } from 'semantic-ui-react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import EditUser from '../UserPage/EditUser/EditUser';
import Following from '../UserPage/Following/Following';
import { Label } from '../Nav/NavTheme';
import Teachers from './TeachersPage/Teachers/Teachers';
import Teacher from './TeachersPage/Teacher/Teacher';
import Lesson from './LessonsPage/Lesson/Lesson';
import Lessons from './LessonsPage/Lessons/Lessons';
import Clubs from './ClubsPage/Clubs/Clubs';
import Club from './ClubsPage/Club/Club';
import AllTips from './TipsPage/AllTips/AllTips';
import Campuses from './CampusesPage/Campuses/Campuses';
import Campus from './CampusesPage/Campus/Campus';
import Dorm from './DormsPage/Dorm/Dorm';
import Dorms from './DormsPage/Dorms/Dorms';
import Question from './QuestionsPage/Question/Question';
import Questions from './QuestionsPage/Questions/Questions';

const MainComponent = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const teacherPageMatch = useRouteMatch('/teachers/:name');
  const lessonPageMatch = useRouteMatch(
    '/lessons/:areaCode/:digitCode/:teacherName'
  );
  const clubPageMatch = useRouteMatch('/clubs/:name');
  const campusPageMatch = useRouteMatch('/campuses/:name');
  const dormitoryPageMatch = useRouteMatch('/dorms/:name');
  const questionPageMatch = useRouteMatch('/questions/:id');
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('teachers')) {
      setActiveIndex(0);
    } else if (location.pathname.includes('lessons')) {
      setActiveIndex(1);
    } else if (location.pathname.includes('clubs')) {
      setActiveIndex(2);
    } else if (location.pathname.includes('questions')) {
      setActiveIndex(3);
    } else if (location.pathname.includes('campuses')) {
      setActiveIndex(4);
    } else if (location.pathname.includes('dorms')) {
      setActiveIndex(5);
    } else if (location.pathname.includes('tips')) {
      setActiveIndex(6);
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
    } else if (data.activeIndex === 3) {
      history.push('/questions');
    } else if (data.activeIndex === 4) {
      history.push('/campuses');
    } else if (data.activeIndex === 5) {
      history.push('/dorms');
    } else if (data.activeIndex === 6) {
      history.push('/tips');
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
        key: 1,
      },
      render: () => (
        <Segment
          basic={teacherPageMatch && teacherPageMatch.isExact ? true : false}
          style={{ marginRight: '0.5em' }}
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
        key: 2,
      },
      render: () => (
        <Segment
          basic={lessonPageMatch && lessonPageMatch.isExact ? true : false}
          style={{ marginRight: '0.5em' }}
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
        key: 3,
      },
      render: () => (
        <Segment
          basic={clubPageMatch && clubPageMatch.isExact ? true : false}
          style={{ marginRight: '0.5em' }}
        >
          {clubPageMatch && clubPageMatch.isExact ? <Club /> : <Clubs main />}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(3)}>
            Sorular
          </Label>
        ),
        color: 'green',
        key: 4,
      },
      render: () => (
        <Segment
          basic={questionPageMatch && questionPageMatch.isExact ? true : false}
          style={{ marginRight: '0.5em' }}
        >
          {questionPageMatch && questionPageMatch.isExact ? (
            <Question />
          ) : (
            <Questions main />
          )}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(4)}>
            Kampüsler
          </Label>
        ),
        color: 'green',
        key: 5,
      },
      render: () => (
        <Segment
          basic={campusPageMatch && campusPageMatch.isExact ? true : false}
          style={{ marginRight: '0.5em' }}
        >
          {campusPageMatch && campusPageMatch.isExact ? (
            <Campus />
          ) : (
            <Campuses main />
          )}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(5)}>
            Yurtlar
          </Label>
        ),
        color: 'green',
        key: 6,
      },
      render: () => (
        <Segment
          basic={
            dormitoryPageMatch && dormitoryPageMatch.isExact ? true : false
          }
          style={{ marginRight: '0.5em' }}
        >
          {dormitoryPageMatch && dormitoryPageMatch.isExact ? (
            <Dorm />
          ) : (
            <Dorms main />
          )}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(6)}>
            Tavsiyeler
          </Label>
        ),
        color: 'green',
        key: 7,
      },
      render: () => (
        <Segment basic>
          <AllTips />
        </Segment>
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

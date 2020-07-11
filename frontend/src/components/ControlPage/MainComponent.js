import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Tab, Menu, Icon, Segment } from 'semantic-ui-react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Label } from '../Nav/NavTheme';
import Teachers from './TeachersPage/Teachers/Teachers';
import Teacher from './TeachersPage/Teacher/Teacher';
import Lesson from './LessonsPage/Lesson/Lesson';
import Lessons from './LessonsPage/Lessons/Lessons';
import Clubs from './ClubsPage/Clubs/Clubs';
import Club from './ClubsPage/Club/Club';
import Campuses from './CampusesPage/Campuses/Campuses';
import Campus from './CampusesPage/Campus/Campus';
import Dorm from './DormsPage/Dorm/Dorm';
import Dorms from './DormsPage/Dorms/Dorms';
import Question from './QuestionsPage/Question/Question';
import Questions from './QuestionsPage/Questions/Questions';
import Tips from './TipsPage/Tips';
import QuestionsPage from './QuestionsPage/QuestionsPage';
import EventsPage from './EventsPage/EventsPage';

const MainComponent = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
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
  const categories = [
    'teachers',
    'lessons',
    'clubs',
    'questions',
    'events',
    'tips',
    'campuses',
    'dorms',
  ];
  useEffect(() => {
    if (
      location.pathname.includes('teachers') ||
      location.pathname.includes('control')
    ) {
      setActiveIndex(categories.indexOf('teachers'));
    } else if (location.pathname.includes('lessons')) {
      setActiveIndex(categories.indexOf('lessons'));
    } else if (location.pathname.includes('clubs')) {
      setActiveIndex(categories.indexOf('clubs'));
    } else if (location.pathname.includes('questions')) {
      setActiveIndex(categories.indexOf('questions'));
    } else if (location.pathname.includes('campuses')) {
      setActiveIndex(categories.indexOf('campuses'));
    } else if (location.pathname.includes('dorms')) {
      setActiveIndex(categories.indexOf('dorms'));
    } else if (location.pathname.includes('tips')) {
      setActiveIndex(categories.indexOf('tips'));
    } else if (location.pathname.includes('events')) {
      setActiveIndex(categories.indexOf('events'));
    }
  }, [location]);

  const getColor = (i) => {
    return activeIndex === i ? 'green' : 'blue';
  };

  const handleIndex = (e, data) => {
    setActiveIndex(data.activeIndex);
    if (data.activeIndex === categories.indexOf('teachers')) {
      history.push('/teachers');
    } else if (data.activeIndex === categories.indexOf('lessons')) {
      history.push('/lessons');
    } else if (data.activeIndex === categories.indexOf('clubs')) {
      history.push('/clubs');
    } else if (data.activeIndex === categories.indexOf('questions')) {
      history.push('/questions');
    } else if (data.activeIndex === categories.indexOf('tips')) {
      history.push('/tips');
    } else if (data.activeIndex === categories.indexOf('campuses')) {
      history.push('/campuses');
    } else if (data.activeIndex === categories.indexOf('dorms')) {
      history.push('/dorms');
    } else if (data.activeIndex === categories.indexOf('events')) {
      history.push('/events');
    }
  };

  const panes = [
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(categories.indexOf('teachers'))}>
            Hocalar
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('teachers'),
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
          <Label bold pointer color={getColor(categories.indexOf('lessons'))}>
            Dersler
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('lessons'),
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
          <Label bold pointer color={getColor(categories.indexOf('clubs'))}>
            Kulüpler
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('clubs'),
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
          <Label bold pointer color={getColor(categories.indexOf('questions'))}>
            Sorular
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('questions'),
      },
      render: () => (
        <Segment
          basic={questionPageMatch && questionPageMatch.isExact ? true : false}
          style={{ marginRight: '0.5em' }}
        >
          {questionPageMatch && questionPageMatch.isExact ? (
            <Question />
          ) : (
            <QuestionsPage main />
          )}
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(categories.indexOf('events'))}>
            Etkinlikler
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('events'),
      },
      render: () => (
        <Segment style={{ marginRight: '0.5em' }}>
          <EventsPage />
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(categories.indexOf('tips'))}>
            Tavsiyeler
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('tips'),
      },
      render: () => (
        <Segment style={{ marginRight: '0.5em', paddingTop: '1.5em' }}>
          <Tips />
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(categories.indexOf('campuses'))}>
            Kampüsler
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('campuses'),
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
          <Label bold pointer color={getColor(categories.indexOf('dorms'))}>
            Yurtlar
          </Label>
        ),
        color: 'green',
        key: categories.indexOf('dorms'),
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

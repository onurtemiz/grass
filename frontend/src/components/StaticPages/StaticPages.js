import React, { useEffect, useState } from 'react';
import { Tab, Segment } from 'semantic-ui-react';
import { useLocation, useHistory } from 'react-router-dom';
import { Label } from '../Nav/NavTheme';
import About from './About/About';
import { isMobile } from 'react-device-detect';
import Sss from './Sss/Sss';
import Feedback from './Feedback/Feedback';

const StaticPages = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname.includes('statics') ||
      location.pathname.includes('about')
    ) {
      setActiveIndex(0);
    } else if (location.pathname.includes('sss')) {
      setActiveIndex(1);
    } else if (location.pathname.includes('feedback')) {
      setActiveIndex(2);
    }
  }, [location]);

  const getColor = (i) => {
    return activeIndex === i ? 'green' : 'blue';
  };

  const handleIndex = (e, data) => {
    setActiveIndex(data.activeIndex);
    if (data.activeIndex === 0) {
      history.push('/about');
    } else if (data.activeIndex === 1) {
      history.push('/sss');
    } else if (data.activeIndex === 2) {
      history.push('/feedback');
    }
  };

  const panes = [
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(0)}>
            Hakkında
          </Label>
        ),
        color: 'green',
        key: 0,
      },
      render: () => (
        <Segment style={{ marginRight: '0.5em' }}>
          <About />
        </Segment>
      ),
    },
    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(1)}>
            SSS
          </Label>
        ),
        color: 'green',
        key: 1,
      },
      render: () => (
        <Segment style={{ marginRight: '0.5em' }}>
          <Sss />
        </Segment>
      ),
    },

    {
      menuItem: {
        content: (
          <Label bold pointer color={getColor(2)}>
            Feedback
          </Label>
        ),
        color: 'green',
        key: 2,
      },
      render: () => (
        <Segment style={{ marginRight: '0.5em' }}>
          <Feedback />
        </Segment>
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
        onTabChange={(event, data) => handleIndex(event, data)}
        activeIndex={activeIndex}
        style={{ paddingTop: '1em' }}
      />
    </div>
  );
};

export default StaticPages;

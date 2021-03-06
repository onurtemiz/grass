import React, { useState, useEffect } from 'react';
import { Card  } from 'semantic-ui-react';
import eventsService from '../../../services/events';
import EventAdmin from './EventAdmin';
const ControlEvents = () => {
  const [events, setEvents] = useState([]);

  const getAllEvents = async () => {
    const allEvents = await eventsService.getAllEvents();
    setEvents(allEvents);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  if (events.length === 0) {
    return null;
  }
  return (
    <div
      style={{
        height: '400px',
        overflow: 'auto',
      }}
    >
      <Card.Group>
        {events.map((e) => {
          return <EventAdmin e={e} key={e.id} />;
        })}
      </Card.Group>
    </div>
  );
};

export default ControlEvents;

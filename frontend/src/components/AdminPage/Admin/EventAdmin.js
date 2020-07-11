import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLUB_PATH } from '../../../utils/config';
import { Card, Header, Segment, Form, Button } from 'semantic-ui-react';
import { Label } from '../../Nav/NavTheme';
import { ClubForm } from '../Admin/ControlClub';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import eventsService from '../../../services/events';
import SubQuestion from '../../ControlPage/QuestionsPage/Questions/SubQuestion';
import moment from 'moment';
const EventAdmin = ({ e }) => {
  const [event, setEvent] = useState(e);

  const handleApprove = () => {
    eventsService.approveEvent(event.id);
    setEvent({ ...event, approved: !event.approved });
  };

  const handleRemove = () => {
    eventsService.removeEvent(event.id);
    setEvent(null);
  };
  if (event == null) {
    return null;
  }

  return (
    <Card>
      <Card.Header>
        <Label color="blue" bold pointer nolink>
          {event.title} •
        </Label>{' '}
        <Label color="green" bold pointer nolink>
          {moment(event.date).format('DD/MM hh:mm')}
        </Label>
      </Card.Header>
      <Card.Description>{event.subTitle}</Card.Description>

      <Card.Content>{event.description}</Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color={event.approved ? 'green' : 'red'}
            onClick={() => handleApprove()}
          >
            {event.approved ? 'Onaylandı' : 'Onaylanmadı'}
          </Button>
          <Button basic size="small" color="red" onClick={() => handleRemove()}>
            Eventi Sil
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default EventAdmin;

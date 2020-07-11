import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Segment, Popup } from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
const SubEvent = ({ event, main }) => {
  const [wide, setWide] = useState(false);

  return (
    <div style={{ marginLeft: '1em', marginRight: '1em', marginBottom: '1em' }}>
      <Card
        fluid
        style={{
          marginTop: '1em',
          paddingLeft: '0.5em',
          paddingTop: '0.5em',
          paddingBottom: '0.2em',
        }}
      >
        <div onClick={() => setWide(!wide)} style={{ cursor: 'pointer' }}>
          <Card.Header>
            <Header as="h2">
              <Header.Content
                style={
                  isMobile ? { display: 'flex', flexDirection: 'column' } : null
                }
              >
                <Label color="blue" bold pointer nolink>
                  {event.title}
                </Label>{' '}
                <Label color="green" bold pointer nolink>
                  {moment(event.date).format('DD/MM hh:mm')}
                </Label>
              </Header.Content>
            </Header>
          </Card.Header>
          <Card.Description
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100ch',
            }}
          >
            <Label color="green" bold pointer nolink>
              {event.subTitle}
            </Label>
          </Card.Description>
        </div>
        {wide ? <Card.Content>{event.description}</Card.Content> : null}
      </Card>
    </div>
  );
};

export default SubEvent;

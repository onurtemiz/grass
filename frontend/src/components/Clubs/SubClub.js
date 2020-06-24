import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLUB_PATH } from '../../utils/config';
import { Card, Header, Segment } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import { ClubForm } from '../Admin/ControlClub';

export const SubClub = ({ club, main }) => {
  return (
    <div style={main ? { marginLeft: '1em', marginRight: '1em' } : null}>
      <Card
        as={Link}
        to={CLUB_PATH(club)}
        fluid
        style={
          main
            ? {
                marginTop: '1em',
                paddingLeft: '0.5em',
                paddingTop: '0.5em',
              }
            : {
                paddingLeft: '0.5em',
                paddingTop: '0.5em',
              }
        }
      >
        <Card.Header style={{ display: 'inline' }}>
          <Header as="h2">
            <Header.Content>
              <Label color="blue" bold pointer>
                {club.name.toUpperCase()}
              </Label>
            </Header.Content>
          </Header>
        </Card.Header>
        <Card.Description>
          <Label color="green" bold pointer key={`${club.name}`}>
            {club.fullName}
          </Label>
        </Card.Description>
      </Card>
    </div>
  );
};

export const SubClubAdmin = ({ club }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  if (isEdit) {
    return <ClubForm setIsEdit={setIsEdit} club={club} />;
  }

  return (
    <div style={{ marginLeft: '1em' }}>
      <Card
        fluid
        style={{
          marginTop: '1em',
          marginBottom: '0.6em',
          paddingLeft: '0.5em',
          paddingTop: '0.5em',
          paddingBottom: '0.2em',
        }}
        onClick={() => handleEdit()}
      >
        <Card.Header style={{ display: 'inline' }}>
          <Header as="h2">
            <Header.Content>
              <Label color="blue" bold pointer>
                {club.name.toUpperCase()}
              </Label>
            </Header.Content>
          </Header>
        </Card.Header>
        <Card.Description>
          <Label color="green" bold pointer key={`${club.name}`}>
            {club.fullName}
          </Label>
        </Card.Description>
      </Card>
    </div>
  );
};

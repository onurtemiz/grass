import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DORM_PATH } from '../../utils/config';
import { Card, Header, Segment } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';

export const SubDorm = ({ dorm, main }) => {
  return (
    <div style={main ? { marginLeft: '1em' } : null}>
      <Card
        as={Link}
        to={DORM_PATH(dorm)}
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
                {dorm.name.toLocaleUpperCase('TR')}
              </Label>
            </Header.Content>
          </Header>
        </Card.Header>
      </Card>
    </div>
  );
};
export default SubDorm;
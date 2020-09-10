import React from 'react';
import {  Link } from 'react-router-dom';
import { Label } from '../../Nav/NavTheme';
import { Header } from 'semantic-ui-react';

const Admin = () => {
  return (
    <div>
      <Header as={Link} to="admin/tips">
        <Label color="blue" pointer>
          TIPS
        </Label>
      </Header>
      <br />
      <Header as={Link} to="admin/reports">
        <Label color="blue" pointer>
          REPORTS
        </Label>
      </Header>
      <br />
      <Header as={Link} to="admin/clubs">
        <Label color="blue" pointer>
          CLUB ADD
        </Label>
      </Header>
      <br />
      <Header as={Link} to="admin/questions">
        <Label color="blue" pointer>
          QUESTION
        </Label>
      </Header>
      <br />
      <Header as={Link} to="admin/events">
        <Label color="blue" pointer>
          EVENTS
        </Label>
      </Header>
    </div>
  );
};

export default Admin;

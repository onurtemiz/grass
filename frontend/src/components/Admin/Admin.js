import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import usersService from '../../services/user';
import useAdmin from './useAdmin';
import { Label } from '../Nav/NavTheme';
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
      <Header as={Link} to="admin/clubs/add">
        <Label color="blue" pointer>
          CLUB ADD
        </Label>
      </Header>
    </div>
  );
};

export default Admin;

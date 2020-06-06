import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import usersService from '../../services/user';
import useAdmin from './useAdmin';
import { BlueLabel } from '../Nav/NavTheme';
import { Header } from 'semantic-ui-react';
const Admin = () => {
  return (
    <div>
      <Header as={Link} to="admin/tips">
        <BlueLabel>TIPS</BlueLabel>
      </Header>
      <br />
      <Header as={Link} to="admin/reports">
        <BlueLabel>REPORTS</BlueLabel>
      </Header>
    </div>
  );
};

export default Admin;

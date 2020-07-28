import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Verify from './components/Verify/Verify';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ChangePassword from './components/ResetPassword/ChangePassword';
const UnauthorizedApp = () => {
  return (
    <>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/verify" component={Verify} />
        <Route path="/reset_password" component={ResetPassword} />
        <Route path="/change_password" component={ChangePassword} />

        <Route path="/" component={Login} />
      </Switch>
    </>
  );
};

export default UnauthorizedApp;

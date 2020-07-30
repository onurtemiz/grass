import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Verify from './components/Verify/Verify';
import ForgotPassword from './components/ResetPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
const UnauthorizedApp = () => {
  return (
    <>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/verify" component={Verify} />
        <Route path="/forgot_password" component={ForgotPassword} />
        <Route path="/reset_password" component={ResetPassword} />

        <Route path="/" component={Login} />
      </Switch>
    </>
  );
};

export default UnauthorizedApp;

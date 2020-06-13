import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
const UnauthorizedApp = () => {
  return (
    <>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Login} />
      </Switch>
    </>
  );
};

export default UnauthorizedApp;

import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';
const UnauthorizedApp = () => {
  return (
    <div>
      <Redirect to="/signup" />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default UnauthorizedApp;

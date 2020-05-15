import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';

const UnauthorizedApp = () => {
  return (
    <div>
      <Redirect to="/login" />
      <Switch>
        <Route path="/login">
          <Login />
          <Link to="/signup">Uyeyseniz tiklayin.</Link>
        </Route>
        <Route path="/signup">
          <Signup />
          <Link to="/login">Kayit icin tiklayin.</Link>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default UnauthorizedApp;

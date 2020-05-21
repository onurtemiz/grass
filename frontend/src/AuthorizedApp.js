import React from 'react';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Lesson from './components/Lesson/Lesson';
import Lessons from './components/Lessons/Lessons';
import Teacher from './components/Teacher/Teacher';
import Teachers from './components/Teachers/Teachers';
import Contribution from './components/Contribution/Contribution';
import About from './components/About/About';
import All from './components/All/All';
import EditUser from './components/EditUser/EditUser';
import User from './components/User/User';
import { Switch, Route } from 'react-router-dom';

function AuthorizedApp() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/teachers/:name">
          <Teacher />
        </Route>
        {/* <Route path="/teachers">
          <Teachers />
        </Route> */}
        <Route path="/lessons/:areaCode/:digitCode/:teacherName">
          <Lesson />
        </Route>
        {/* <Route path="/lessons">
          <Lessons />
        </Route> */}
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contribution">
          <Contribution />
        </Route>
        <Route path="/users/:username/edit">
          <EditUser />
        </Route>
        <Route path="/users/:username">
          <User />
        </Route>
        <Route path="/">
          <All />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default AuthorizedApp;

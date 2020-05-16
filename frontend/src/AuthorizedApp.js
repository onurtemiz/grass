import React from 'react';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Lesson from './components/Lesson/Lesson';
import Lessons from './components/Lessons/Lessons';
import Teacher from './components/Teacher/Teacher';
import Teachers from './components/Teachers/Teachers';
import { Switch, Route } from 'react-router-dom';

function AuthorizedApp() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/teachers/:name">
          <Teacher />
        </Route>
        <Route path="/teachers">
          <Teachers />
        </Route>
        <Route path="/lessons/:areaCode/:digitCode/:teacherName">
          <Lesson />
        </Route>
        <Route path="/lessons">
          <Lessons />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default AuthorizedApp;

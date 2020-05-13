import React, { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Lesson from './components/Lesson/Lesson';
import Lessons from './components/Lessons/Lessons';
import Teacher from './components/Teacher/Teacher';
import Teachers from './components/Teachers/Teachers';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/teachers/:id">
          <Teacher />
        </Route>
        <Route path="/teachers">
          <Teachers />
        </Route>
        <Route path="/lesson/:id">
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

export default App;

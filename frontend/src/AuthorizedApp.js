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
import Home from './components/Home/Home';
import EditUser from './components/EditUser/EditUser';
import User from './components/User/User';
import AllComments from './components/AllComments/AllComments';
import { Switch, Route } from 'react-router-dom';
import Feed from './components/Feed/Feed';
const HomeContainer = () => {
  return (
    <Switch>
      <Route exact path="/">
        {/* <All /> */}
        <Home />
      </Route>
    </Switch>
  );
};

const DefaultContainer = () => {
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
        <Route path="/feed">
          <Feed />
        </Route>
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
        <Route path="/comments">
          <AllComments />
        </Route>
      </Switch>
      <Footer />{' '}
    </div>
  );
};

function AuthorizedApp() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route>
          <DefaultContainer />
        </Route>
      </Switch>
    </div>
  );
}

export default AuthorizedApp;

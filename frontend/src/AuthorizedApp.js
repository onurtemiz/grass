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
import Following from './components/Following/Following';
import Admin from './components/Admin/Admin';
import useAdmin from './components/Admin/useAdmin';
import ControlTips from './components/Admin/ControlTips';
import ControlReports from './components/Admin/ControlReports';
const DefaultContainer = () => {
  return (
    <div>
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
        <Route path="/user/edit">
          <EditUser />
        </Route>
        <Route path="/user/following">
          <Following />
        </Route>
        <Route path="/users/:username">
          <User />
        </Route>
        <Route path="/comments">
          <AllComments />
        </Route>
      </Switch>
    </div>
  );
};

const AuthorizedUser = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Nav />
          <Home />
        </Route>
        <Route>
          <Nav search />
          <DefaultContainer />
        </Route>
      </Switch>
    </div>
  );
};

const AuthorizedAdmin = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Nav admin />
          <Home />
        </Route>

        <Route>
          <Nav search admin />

          <Route path="/admin/tips">
            <ControlTips />
          </Route>
          <Route path="/admin/reports">
            <ControlReports />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <DefaultContainer />
        </Route>
      </Switch>
    </div>
  );
};

function AuthorizedApp() {
  const isAdmin = useAdmin();
  return !isAdmin ? <AuthorizedUser /> : <AuthorizedAdmin />;
}

export default AuthorizedApp;

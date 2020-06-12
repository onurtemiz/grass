import React, { useEffect } from 'react';
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
import { Switch, Route, Redirect } from 'react-router-dom';
import Feed from './components/Feed/Feed';
import Following from './components/Following/Following';
import Admin from './components/Admin/Admin';
import useAdmin from './components/Admin/useAdmin';
import ControlTips from './components/Admin/ControlTips';
import ControlReports from './components/Admin/ControlReports';
import MainUser from './components/User/MainUser';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainComponent from './components/MainComponent/MainComponent';
import ControlClub from './components/Admin/ControlClub';
const DefaultContainer = () => {
  return (
    <div>
      <Switch>
        <Route path="/control" component={MainComponent} />
        <Route path="/clubs/:name" component={MainComponent} />
        <Route path="/clubs" component={MainComponent} />
        <Route path="/tips" component={MainComponent} />
        <Route path="/campuses" component={MainComponent} />
        <Route path="/dorms" component={MainComponent} />
        <Route path="/questions" component={MainComponent} />

        <Route path="/teachers/:name">
          <MainComponent />
        </Route>
        <Route path="/teachers">
          <MainComponent />
        </Route>
        <Route path="/lessons/:areaCode/:digitCode/:teacherName">
          <MainComponent />
        </Route>
        <Route path="/lessons">
          <MainComponent />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contribution">
          <Contribution />
          <Route path="/user/edit">
            <EditUser />
          </Route>
          <Route path="/user/following">
            <Following />
          </Route>
        </Route>
        <Route path="/user">
          <MainUser />
        </Route>
        <Route path="/users/:username">
          <User />
        </Route>
        <Route path="/comments">
          <AllComments />
        </Route>
        <Route path="/">
          <Redirect to="/" />
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
          <Nav />
          <DefaultContainer />
        </Route>
      </Switch>
    </div>
  );
};

const AuthorizedAdmin = () => {
  return (
    <div>
      <Nav admin />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin/tips" component={ControlTips} />
        <Route path="/admin/reports" component={ControlReports} />
        <Route path="/admin/clubs" component={ControlClub} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={DefaultContainer} />
      </Switch>
    </div>
  );
};

function AuthorizedApp() {
  const isAdmin = useAdmin();
  return !isAdmin ? <AuthorizedUser /> : <AuthorizedAdmin />;
}

export default AuthorizedApp;

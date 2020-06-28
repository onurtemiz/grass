import React from 'react';
import Nav from './components/Nav/Nav';
import Contribution from './components/StaticPages/Contribution/Contribution';
import About from './components/StaticPages/About/About';
import Home from './components/HomePage/Home/Home';
import User from './components/UserPage/User/User';
import AllComments from './components/CommentsPage/AllComments/AllComments';
import { Switch, Route, Redirect } from 'react-router-dom';
import Feed from './components/FeedPage/Feed/Feed';
import Admin from './components/AdminPage/Admin/Admin';
import useAdmin from './components/AdminPage/Admin/useAdmin';
import ControlTips from './components/AdminPage/Admin/ControlTips';
import ControlReports from './components/AdminPage/Admin/ControlReports';
import MainUser from './components/UserPage/User/MainUser';
import 'react-toastify/dist/ReactToastify.css';
import MainComponent from './components/ControlPage/MainComponent';
import ControlClub from './components/AdminPage/Admin/ControlClub';
import ControlQuestions from './components/AdminPage/Admin/ControlQuestions';
import StaticPages from './components/StaticPages/StaticPages';
import FirstTimeModal from './components/FirstTimeModal/FirstTimeModal';
const DefaultContainer = () => {
  return (
    <>
      <Switch>
        <Route
          path={[
            '/control',
            '/clubs',
            '/tips',
            '/campuses',
            '/dorms',
            '/questions',
            '/teachers',
            '/lessons',
          ]}
          component={MainComponent}
        />
        <Route path="/feed" component={Feed} />
        <Route path="/user" component={MainUser} />
        <Route path="/users/:username" component={User} />
        <Route path="/comments" component={AllComments} />
        <Route
          path={['/statics', '/about', '/contribution', '/terms']}
          component={StaticPages}
        />

        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

const AuthorizedUser = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/" component={DefaultContainer} />
      </Switch>
    </>
  );
};

const AuthorizedAdmin = () => {
  return (
    <>
      <Nav admin />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin/tips" component={ControlTips} />
        <Route path="/admin/reports" component={ControlReports} />
        <Route path="/admin/clubs" component={ControlClub} />
        <Route path="/admin/questions" component={ControlQuestions} />

        <Route path="/admin" component={Admin} />
        <Route path="/" component={DefaultContainer} />
      </Switch>
    </>
  );
};

function AuthorizedApp() {
  const isAdmin = useAdmin();
  return (
    <>
      <FirstTimeModal />
      {!isAdmin ? <AuthorizedUser /> : <AuthorizedAdmin />}
    </>
  );
}

export default AuthorizedApp;

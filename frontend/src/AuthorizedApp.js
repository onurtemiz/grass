import React from 'react';
import Nav from './components/Nav/Nav';
import User from './components/UserPage/User/User';
import { Switch, Route, Redirect } from 'react-router-dom';
import useAdmin from './components/AdminPage/Admin/useAdmin';
import 'react-toastify/dist/ReactToastify.css';

import FirstTimeModal from './components/FirstTimeModal/FirstTimeModal';
import Patreon from './components/Patreon/Patreon';

import Admin from './components/AdminPage/Admin/Admin';
import ControlTips from './components/AdminPage/Admin/ControlTips';
import ControlReports from './components/AdminPage/Admin/ControlReports';
import ControlClub from './components/AdminPage/Admin/ControlClub';
import ControlEvents from './components/AdminPage/Admin/ControlEvents';
import ControlQuestions from './components/AdminPage/Admin/ControlQuestions';

const Home = React.lazy(() => import('./components/HomePage/Home/Home'));
const Feed = React.lazy(() => import('./components/FeedPage/Feed/Feed'));
const Quotas = React.lazy(() => import('./components/Quota/Quotas'));
const CoursePlanner = React.lazy(() =>
  import('./components/CoursePlanner/CoursePlanner')
);
const StaticPages = React.lazy(() =>
  import('./components/StaticPages/StaticPages')
);
const AllComments = React.lazy(() =>
  import('./components/CommentsPage/AllComments/AllComments')
);
const MainUser = React.lazy(() =>
  import('./components/UserPage/User/MainUser')
);

const MainComponent = React.lazy(() =>
  import('./components/ControlPage/MainComponent')
);

const DefaultContainer = () => {
  return (
    <>
      <Switch>
        <Route
          path={[
            '/control',
            '/community',
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
          path={['/statics', '/about', '/sss', '/feedback']}
          component={StaticPages}
        />
        <Route path="/planner" component={CoursePlanner} />
        <Route path="/quotas" component={Quotas} />
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
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/" component={DefaultContainer} />
        </Switch>
      </div>
      <Patreon />
    </>
  );
};

const AuthorizedAdmin = () => {
  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <Nav admin />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin/tips" component={ControlTips} />
          <Route path="/admin/reports" component={ControlReports} />
          <Route path="/admin/clubs" component={ControlClub} />
          <Route path="/admin/questions" component={ControlQuestions} />
          <Route path="/admin/events" component={ControlEvents} />

          <Route path="/admin" component={Admin} />
          <Route path="/" component={DefaultContainer} />
        </Switch>
      </div>
      <Patreon />
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

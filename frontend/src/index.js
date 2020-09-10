import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import 'semantic-ui-less/semantic.less';


ReactGA.initialize('UA-129377768-2');

const history = createBrowserHistory();
ReactGA.pageview(window.location.pathname + window.location.search);

history.listen(location => {
  ReactGA.set({ page: location.pathname }); 
  ReactGA.pageview(location.pathname); 
});

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <div style={{ height: '90vh' }}>
          <LinearProgress />
        </div>
      }
    >
      <Router history={history}>
        <App />
      </Router>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

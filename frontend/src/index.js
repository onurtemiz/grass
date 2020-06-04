import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import 'semantic-ui-less/semantic.less';

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <div style={{ height: '90vh' }}>
          <LinearProgress />
        </div>
      }
    >
      <Router>
        <App />
      </Router>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

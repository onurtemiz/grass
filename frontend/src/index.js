import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <div>
          <LinearProgress />{' '}
        </div>
      }
    >
      <Router>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <App />
        </SnackbarProvider>
      </Router>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

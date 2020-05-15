import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
const AuthenticatedApp = React.lazy(() => import('./AuthorizedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthorizedApp'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const grassUser = window.localStorage.getItem('grassUser');
    if (grassUser) {
      const jsonUser = JSON.parse(grassUser);
      dispatch(setUser(jsonUser));
    }
  }, []);
  const user = useSelector((state) => state.user);
  return user === null ? <UnauthenticatedApp /> : <AuthenticatedApp />;
}

export default App;

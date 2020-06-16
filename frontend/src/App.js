import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import { toast } from 'react-toastify';
import { setToken } from './utils/token';
import 'react-toastify/dist/ReactToastify.css';

const AuthenticatedApp = React.lazy(() => import('./AuthorizedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthorizedApp'));

toast.configure();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const grassUser = window.localStorage.getItem('grassUser');
    if (grassUser) {
      const jsonUser = JSON.parse(grassUser);
      dispatch(setUser(jsonUser));
      setToken(jsonUser.token);
    }
  }, []);
  const user = useSelector((state) => state.user);
  return user === null ? <UnauthenticatedApp /> : <AuthenticatedApp />;
}

export default App;

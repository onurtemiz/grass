import React, { useEffect, useState } from 'react';
import {  verifyUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import {  useLocation, Redirect } from 'react-router-dom';
import {
  Grid,
  Loader,
} from 'semantic-ui-react';
import { HomeHeader } from '../HomePage/Home/HomeTheme';
import queryString from 'query-string';
import { Label as SLabel } from '../Nav/NavTheme';
import { toast } from 'react-toastify';

const Verify = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [verifyCode, setVerifyCode] = useState();
  const [situation, setSituation] = useState('started');

  useEffect(() => {
    setVerifyCode(queryString.parse(location.search));
  }, [location]);

  useEffect(() => {
    if (verifyCode && verifyCode.code && verifyCode.u) {
      dispatch(verifyUser(verifyCode.code, verifyCode.u, setSituation));
    }
  }, [verifyCode]);

  if (situation === 'success') {
    toast.success(`Üyeliğiniz onaylandı`, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return <Redirect to="/login" />;
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
      columns="equal"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <HomeHeader as="h1">
          <label style={{ color: '#2185D0' }}>BOUN</label> ÇİM
        </HomeHeader>

        <SLabel color="blue" bold style={{ fontSize: '1.5em' }}>
          {situation === 'started'
            ? 'Üyeliğinizi onaylıyoruz'
            : situation === 'failed'
            ? 'Üyeliğiniz onaylanamadı'
            : 'Üyeliğiniz Onaylandı'}
        </SLabel>
        <br />
        <br />
        <Loader
          active={situation === 'started' ? true : false}
          inline="centered"
        />
      </Grid.Column>
    </Grid>
  );
};

export default Verify;

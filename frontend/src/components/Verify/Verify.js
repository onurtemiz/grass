import React, { useEffect, useState } from 'react';
import { signupUser, verifyUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Label,
  Divider,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { HomeHeader } from '../HomePage/Home/HomeTheme';
import queryString from 'query-string';

const Verify = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [verifyCode, setVerifyCode] = useState();

  useEffect(() => {
    setVerifyCode(queryString.parse(location.search));
  }, [location]);

  useEffect(() => {
    if (verifyCode && verifyCode.code) {
      dispatch(verifyUser(verifyCode.code));
    }
  }, [verifyCode]);

  if (verifyCode && verifyCode.code) {
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
          <Header as="h1" color="green" textAlign="center">
            Epostanız onaylandı.
          </Header>

          <Message info>
            <Link to="/login">
              <b>Giriş Yap</b>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
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
        <Header as="h1" color="green" textAlign="center">
          Epostanızı onaylayın.
        </Header>

        <Message color="green">
          <Label color="blue" style={{ padding: 5 }}>
            @boun.edu.tr
          </Label>{' '}
          emailinize onay linki gitmiştir. Epostanızı onaylayarak siteye giriş
          yapabilirsiniz.
        </Message>

        <Message info>
          Zaten Üye misiniz?{' '}
          <Link to="/login">
            <b>Giriş Yap</b>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Verify;

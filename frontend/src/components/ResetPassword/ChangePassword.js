import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter, useLocation, Redirect } from 'react-router';
import { LinearProgress } from '@material-ui/core';

import * as Yup from 'yup'; // for everything
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
  Label,
  Divider,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { HomeHeader } from '../HomePage/Home/HomeTheme';
import signupServices from '../../services/signup';
import queryString from 'query-string';
import { changePassword } from '../../reducers/userReducer';

const ChangePassword = ({ setActiveIndex }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue, watch } = useForm();
  const location = useLocation();
  const [verifyCode, setVerifyCode] = useState();
  const [id, setId] = useState();
  const [sucess, setSucess] = useState(false);
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    setVerifyCode(parsed.code);
    setId(parsed.id);
  }, [location]);

  useEffect(() => {
    register(
      { name: 'password' },
      {
        minLength: {
          value: 8,
          message: 'Yeni şifreniz en az 8 karakterden oluşmalı.',
        },
        validate: (comment) =>
          comment
            ? (comment && comment.trim().length !== 0) ||
              'Yeni şifreniz sadece boşluklardan oluşamaz.'
            : true,
      }
    );
    register(
      { name: 'samePassword' },
      {
        validate: (value) =>
          value === watch('password') || 'Şifreleriniz uyuşmuyor.',
      }
    );
  }, []);

  const onSubmit = async (data) => {
    dispatch(changePassword(data.password, verifyCode, id, setSucess));
  };

  if (sucess) {
    return <Redirect to="login" />;
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: '90vh' }}
      verticalAlign="middle"
      columns="equal"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <HomeHeader as="h1">
          <label style={{ color: '#2185D0' }}>BOUN</label> ÇİM
        </HomeHeader>
        <Header as="h1" color="green" textAlign="center">
          Çim Şifrenizi Güncelleyin.
        </Header>

        <Form size="large">
          <Segment>
            <Form.Field inline>
              <Form.Input
                autoComplete="new-password"
                fluid
                icon={<Icon color="green" name="key" />}
                iconPosition="left"
                placeholder="Yeni şifre"
                type="password"
                onChange={(e, { name, value }) => setValue(name, value)}
                name="password"
              />
              {errors.password && (
                <Label basic color="red" pointing="above">
                  {errors.password.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field inline>
              <Form.Input
                fluid
                icon={<Icon color="green" name="key" />}
                iconPosition="left"
                placeholder="Yeni şifrenizi tekrar girin"
                type="password"
                onChange={(e, { name, value }) => setValue(name, value)}
                name="samePassword"
              />

              {errors.samePassword && (
                <Label basic color="red" pointing="above">
                  {errors.samePassword.message}
                </Label>
              )}
            </Form.Field>
            <Divider />
            <Button fluid size="large" primary onClick={handleSubmit(onSubmit)}>
              Güncelle
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default ChangePassword;

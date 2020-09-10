import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  useLocation, Redirect } from 'react-router';

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Label,
  Divider,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { HomeHeader } from '../HomePage/Home/HomeTheme';
import queryString from 'query-string';
import {  resetPassword } from '../../reducers/userReducer';

const ResetPassword = ({ setActiveIndex }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue, watch } = useForm();
  const location = useLocation();
  const [parsed, setParsed] = useState();
  const [sucess, setSucess] = useState(false);
  useEffect(() => {
    setParsed(queryString.parse(location.search));
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
    dispatch(resetPassword(data.password, parsed.code, parsed.u, setSucess));
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

export default ResetPassword;

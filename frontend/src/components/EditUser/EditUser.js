import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { updateUser } from '../../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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
import { Redirect } from 'react-router-dom';
const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [edited, setEdited] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const validationSchema = Yup.object({
    username: Yup.string().max(username.length === 0 ? 0 : 15, 'username'),
    password: Yup.string().min(password.length === 0 ? 0 : 8, 'password'),
  });

  const usernameSet = (value) => {
    setUsernameError(null);
    setUsername(value);
  };
  const passwordSet = (value) => {
    setPasswordError(null);
    setPassword(value);
  };

  const handleSubmit = async () => {
    validationSchema
      .validate(
        {
          password,
          username,
        },
        { abortEarly: false }
      )
      .then((values) => {
        // console.log('values', values);
        setEdited('started');
        dispatch(updateUser(values, setEdited));
      })
      .catch((e) => {
        e.errors.forEach((q) => {
          switch (q) {
            case 'password':
              setPasswordError('Şifre en az 8 karakterden oluşmalı');
              break;
            case 'username':
              setUsernameError('Kullanıcı adı 15 harf veya daha az olmalı');
              break;
            default:
              return;
          }
        });
      });
  };
  if (edited === 'started') {
    return <LinearProgress />;
  }

  if (edited === 'finished') {
    return <Redirect to="/user" />;
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: '90vh' }}
      verticalAlign="middle"
      columns="equal"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="green" textAlign="center">
          Çim Hesabınızı Güncelleyin.
        </Header>
        <Message color="green">
          Kullanıcı adınızı ya da/veya şifrenizi güncelleyin.{' '}
          <Label color="blue">@boun.edu.tr</Label> E posta adresinizi değiştirme
          şansınız yoktur.
        </Message>
        <Form size="large">
          <Segment>
            <Form.Input
              style={{ opacity: '1' }}
              fluid
              icon={<Icon color="green" name="mail" />}
              iconPosition="left"
              value={user.email}
              disabled={true}
            />
            <Form.Input
              fluid
              icon={<Icon name="user" color="green" />}
              iconPosition="left"
              type="text"
              placeholder={user.username}
              onChange={(e) => usernameSet(e.target.value)}
            />

            {usernameError && (
              <Label basic color="red" pointing="above">
                {usernameError}
              </Label>
            )}

            <Form.Field inline>
              <Form.Input
                autoComplete="new-password"
                fluid
                icon={<Icon color="green" name="key" />}
                iconPosition="left"
                placeholder="Yeni Şifre"
                type="password"
                onChange={(e) => passwordSet(e.target.value)}
              />
              {passwordError && (
                <Label basic color="red" pointing="above">
                  {passwordError}
                </Label>
              )}
            </Form.Field>
            <Divider />
            <Button fluid size="large" primary onClick={handleSubmit}>
              Güncelle
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default EditUser;

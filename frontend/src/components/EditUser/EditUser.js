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
  const [samePasswordError, setSamePasswordError] = useState(null);
  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [samePassword, setSamePassword] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  function equalTo(ref, msg) {
    return this.test({
      name: 'equalTo',
      exclusive: false,
      message: msg,
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  Yup.addMethod(Yup.string, 'equalTo', equalTo);

  const validationSchema = Yup.object({
    username: Yup.string().max(username.length === 0 ? 0 : 15, 'username'),
    password: Yup.string().min(password.length === 0 ? 0 : 8, 'password'),
    samePassword: Yup.string().equalTo(Yup.ref('password'), 'samePassword'),
    currentPassword: Yup.string().min(8, 'currentPassword'),
  });

  const usernameSet = (value) => {
    setUsernameError(null);
    setUsername(value);
  };
  const passwordSet = (value) => {
    setPasswordError(null);
    setPassword(value);
  };

  const samePasswordSet = (value) => {
    setSamePasswordError(null);
    setSamePassword(value);
  };

  const currentPasswordSet = (value) => {
    setCurrentPasswordError(null);
    setCurrentPassword(value);
  };

  const handleSubmit = async () => {
    validationSchema
      .validate(
        {
          password,
          username,
          samePassword,
          currentPassword,
        },
        { abortEarly: false }
      )
      .then((values) => {
        setEdited('started');
        dispatch(updateUser(values, setEdited, setCurrentPasswordError));
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
            case 'samePassword':
              setSamePasswordError('Şifreler aynı değil');
              break;
            case 'currentPassword':
              setCurrentPasswordError(
                'Şu anki şifreniz 8 karakterden küçük olamaz'
              );
              break;
            default:
              setCurrentPasswordError(
                'Şu anki şifreniz 8 karakterden küçük olamaz'
              );
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
          Kullanıcı adınızı ya da/veya şifrenizi güncelleyin.
          <br />
          <Label color="blue" style={{ padding: '5px' }}>
            @boun.edu.tr
          </Label>{' '}
          E posta adresinizi değiştirme şansınız yoktur.
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
            <Form.Field inline>
              <Form.Input
                fluid
                icon={<Icon color="red" name="key" />}
                iconPosition="left"
                placeholder="Şu anki şifrenizi girin"
                type="password"
                onChange={(e) => currentPasswordSet(e.target.value)}
              />
              {currentPasswordError && (
                <Label basic color="red" pointing="above">
                  {currentPasswordError}
                </Label>
              )}
            </Form.Field>
            <Divider />
            <Form.Input
              fluid
              icon={<Icon name="user" color="green" />}
              iconPosition="left"
              type="text"
              placeholder={`Yeni kullanıcı adı (${user.username})`}
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
                placeholder="Yeni şifre"
                type="password"
                onChange={(e) => passwordSet(e.target.value)}
              />
              {passwordError && (
                <Label basic color="red" pointing="above">
                  {passwordError}
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
                onChange={(e) => samePasswordSet(e.target.value)}
              />
              {samePasswordError && (
                <Label basic color="red" pointing="above">
                  {samePasswordError}
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

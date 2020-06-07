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
import useField from './useField';
const EditUser = ({ setActiveIndex }) => {
  const password = useField();
  const samePassword = useField();
  const currentPassword = useField();
  const username = useField();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [edited, setEdited] = useState(null);

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
    username: Yup.string().max(
      username.field.length === 0 ? 0 : 15,
      'username'
    ),
    password: Yup.string().min(password.field.length === 0 ? 0 : 8, 'password'),
    samePassword: Yup.string().equalTo(Yup.ref('password'), 'samePassword'),
    currentPassword: Yup.string().min(8, 'currentPassword'),
  });

  const handleSubmit = async () => {
    validationSchema
      .validate(
        {
          password: password.field,
          username: username.field,
          samePassword: samePassword.field,
          currentPassword: currentPassword.field,
        },
        { abortEarly: false }
      )
      .then((values) => {
        setEdited('started');
        dispatch(updateUser(values, setEdited, currentPassword.setFieldError));
      })
      .catch((e) => {
        e.errors.forEach((q) => {
          switch (q) {
            case 'password':
              password.setFieldError('Şifre en az 8 karakterden oluşmalı');
              break;
            case 'username':
              username.setFieldError(
                'Kullanıcı adı 15 harf veya daha az olmalı'
              );
              break;
            case 'samePassword':
              samePassword.setFieldError('Şifreler aynı değil');
              break;
            case 'currentPassword':
              currentPassword.setFieldError(
                'Şu anki şifreniz 8 karakterden küçük olamaz'
              );
              break;
            default:
              currentPassword.setFieldError(
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
    setActiveIndex(0);
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
                onChange={(e) => currentPassword.fieldSet(e.target.value)}
              />
              {currentPassword.fieldError && (
                <Label basic color="red" pointing="above">
                  {currentPassword.fieldError}
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
              onChange={(e) => username.fieldSet(e.target.value)}
            />

            {username.fieldError && (
              <Label basic color="red" pointing="above">
                {username.fieldError}
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
                onChange={(e) => password.fieldSet(e.target.value)}
              />
              {password.fieldError && (
                <Label basic color="red" pointing="above">
                  {password.fieldError}
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
                onChange={(e) => samePassword.fieldSet(e.target.value)}
              />
              {samePassword.fieldError && (
                <Label basic color="red" pointing="above">
                  {samePassword.fieldError}
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

import React, { useState, useEffect } from 'react';
import { updateUser } from '../../../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

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

const EditUser = ({ setActiveIndex }) => {
  const { register, handleSubmit, errors, setValue, watch } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [edited, setEdited] = useState(null);

  useEffect(() => {
    register(
      { name: 'currentPassword' },
      {
        required: 'Lütfen şu anki şifrenizi girin.',
        minLength: {
          value: 8,
          message: 'Şu anki şifreniz en az 8 karakterden oluşmalı.',
        },
      }
    );
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
    register(
      { name: 'username' },
      {
        maxLength: {
          value: 15,
          message: 'Yeni kullanıcı adınız 15 veya daha az harften oluşmalı.',
        },
        minLength: {
          value: 1,
          message: 'yeni kullanıcı adınız en az 1 harften oluşmalı',
        },
        validate: (comment) =>
          comment
            ? comment.trim().length !== 0 ||
              'Yeni kullanıcı adınız sadece boşluklardan oluşamaz.'
            : true,
      }
    );
  }, []);

  const onSubmit = async (data) => {
    setEdited('started');
    dispatch(updateUser(data, setEdited));
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
                onChange={(e, { name, value }) => setValue(name, value)}
                name="currentPassword"
              />
              {errors.currentPassword && (
                <Label basic color="red" pointing="above">
                  {errors.currentPassword.message}
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
              onChange={(e, { name, value }) => setValue(name, value)}
              name="username"
            />

            {errors.username && (
              <Label basic color="red" pointing="above">
                {errors.username.message}
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

export default EditUser;

import React, { useEffect } from 'react';
import { signupUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue, watch } = useForm();

  useEffect(() => {
    register(
      { name: 'email' },
      {
        required: 'Lütfen boun eposta adresinizi girin.',
        pattern: {
          value: /^[A-Z0-9._%+-]+@boun\.edu\.tr$/i,
          message: 'Epostanız @boun.edu.tr ile bitiyor olmalı.',
        },
      }
    );
    register(
      { name: 'password' },
      {
        required: 'Lütfen şifrenizi girin.',
        minLength: {
          value: 8,
          message: 'Şifreniz en az 8 karakterden oluşmalı.',
        },
        validate: (comment) =>
          comment.trim().length !== 0 ||
          'Şifreniz sadece boşluklardan oluşamaz.',
      }
    );
    register(
      { name: 'samePassword' },
      {
        required: 'Lütfen şifrenizi tekrar girin.',
        validate: (value) =>
          value === watch('password') || 'Şifreleriniz uyuşmuyor.',
      }
    );
    register(
      { name: 'username' },
      {
        required: 'Lütfen bir kullanıcı adı girin.',
        maxLength: {
          value: 15,
          message: 'Kullanıcı adınız 15 veya daha az harften oluşmalı.',
        },
        minLength: {
          value: 1,
          message: 'Kullanıcı adınız en az 1 harften oluşmalı',
        },
        validate: (comment) =>
          comment.trim().length !== 0 ||
          'Kullanıcı adınız sadece boşluklardan oluşamaz.',
      }
    );
  }, []);

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
      columns="equal"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="green" textAlign="center">
          Çimlerde Yerinizi Alın.
        </Header>

        <Message color="green">
          Çim uygulamasına sadece{' '}
          <Label color="blue" style={{ padding: 5 }}>
            @boun.edu.tr
          </Label>{' '}
          emaili olanlar kayıt olabilir.
        </Message>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment>
            <Form.Field inline>
              <Form.Input
                fluid
                icon={<Icon name="user" color="green" />}
                iconPosition="left"
                placeholder="Kullanıcı Adı"
                onChange={(e, { name, value }) => setValue(name, value)}
                name="username"
              />

              {errors.username && (
                <Label basic color="red" pointing="above">
                  {errors.username.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field inline>
              <Form.Input
                fluid
                icon={<Icon color="green" name="mail" />}
                iconPosition="left"
                placeholder="Eposta Adresi"
                onChange={(e, { name, value }) => setValue(name, value)}
                name="email"
              />
              {errors.email && (
                <Label basic color="red" pointing="above">
                  {errors.email.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field inline>
              <Form.Input
                fluid
                icon={<Icon color="green" name="key" />}
                iconPosition="left"
                placeholder="Şifre"
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
                placeholder="Şifrenizi Tekrar Yazın"
                type="password"
                autoComplete="new-password"
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
            <Button fluid size="large" primary type="submit">
              Hesap Oluştur
            </Button>
          </Segment>
        </Form>
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

export default Signup;

import React, { useEffect } from 'react';
import { loginUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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
const Login = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    history.push('/login');
  }, []);

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
      }
    );
  }, []);

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
      columns="equal"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="green">
          Çimlere Hoşgeldiniz.
        </Header>

        <Message color="green">
          Çim uygulamasına sadece{' '}
          <Label color="blue" style={{ padding: 5 }}>
            @boun.edu.tr
          </Label>{' '}
          emaili olanlar giriş yapabilir.
        </Message>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment>
            <Form.Field inline>
              <Form.Input
                fluid
                onChange={(e, { name, value }) => setValue(name, value)}
                icon={<Icon color="green" name="mail" />}
                iconPosition="left"
                placeholder="Eposta Adresi"
                name="email"
                autoFocus
                className="email-input"
              />
              {errors.email && (
                <Label
                  basic
                  color="red"
                  pointing="above"
                  className="email-error"
                >
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
                name="password"
                className="password-input"
                onChange={(e, { name, value }) => setValue(name, value)}
              />
              {errors.password && (
                <Label
                  basic
                  color="red"
                  pointing="above"
                  className="password-error"
                >
                  {errors.password.message}
                </Label>
              )}
            </Form.Field>
            <Divider />
            <Button
              fluid
              size="large"
              primary
              type="submit"
              className="login-button"
            >
              Giriş Yap
            </Button>
          </Segment>
        </Form>
        <Message info>
          <Link to="/signup">
            <b>Hesap Oluştur</b>
          </Link>
        </Message>
        <Message error>
          <Link to="/signup" style={{ color: '#f53131' }}>
            <b>Şifremi Unuttum</b>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

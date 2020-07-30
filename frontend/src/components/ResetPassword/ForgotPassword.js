import React, { useEffect, useState } from 'react';
import {
  loginUser,
  resetPassword,
  forgotPassword,
} from '../../reducers/userReducer';
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
import { HomeHeader } from '../HomePage/Home/HomeTheme';
import { Label as SLabel } from '../Nav/NavTheme';
const ForgotPassword = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setLoading(true);
    dispatch(forgotPassword(data, setLoading));
  };

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
  }, []);

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
        <Header as="h1" color="green">
          Çim Şifrenizi Sıfırlayın.
        </Header>

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

            <Divider />
            <Button
              fluid
              size="large"
              primary
              type="submit"
              loading={loading}
              className="login-button"
            >
              Şifreyi Sıfırla
            </Button>
          </Segment>
        </Form>
        <Message success>
          <Link to="/login">
            <SLabel color="green" bold pointer>
              Giriş Yap
            </SLabel>
          </Link>
        </Message>
        <Message info>
          <Link to="/signup">
            <b>Hesap Oluştur</b>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default ForgotPassword;

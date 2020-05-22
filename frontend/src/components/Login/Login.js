import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
  Container,
} from 'semantic-ui-react';
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [password, setPassword] = useState('');
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Required')
      .matches(/^[A-Z0-9._%+-]+@boun\.edu\.tr$/i, 'email'),
    password: Yup.string().required('Required').min(8, 'password'),
  });

  const handleSubmit = async () => {
    validationSchema
      .validate(
        {
          password,
          email,
        },
        { abortEarly: false }
      )
      .then((values) => {
        dispatch(loginUser(values, setEmailError));
      })
      .catch((e) => {
        e.errors.forEach((q) => {
          switch (q) {
            case 'password':
              setPasswordError('Şifre en az 8 karakterden oluşmalı');
              break;
            case 'email':
              setEmailError('Lütfen @boun.edu.tr emaili giriniz.');
              break;

            default:
              return;
          }
        });
      });
  };

  const emailSet = (value) => {
    setEmailError(null);
    setEmail(value);
  };

  const passwordSet = (value) => {
    setPasswordError(null);
    setPassword(value);
  };

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
          emaili olanlar kayıt olabilir.
        </Message>
        <Form size="large">
          <Segment>
            <Form.Input
              fluid
              icon={<Icon color="green" name="mail" />}
              iconPosition="left"
              placeholder="Eposta Adresi"
              onChange={(e) => emailSet(e.target.value)}
            />
            {emailError && (
              <Label basic color="red" pointing="above">
                {emailError}
              </Label>
            )}
            <Form.Field inline>
              <Form.Input
                fluid
                icon={<Icon color="green" name="key" />}
                iconPosition="left"
                placeholder="Şifre"
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
              Giriş Yap
            </Button>
          </Segment>
        </Form>
        <Message info>
          <Link to="/signup">Hesap Oluştur</Link>
        </Message>
        <Message error>
          <Link to="/signup" style={{ color: '#f53131' }}>
            Şifremi Unuttum
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

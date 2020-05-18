import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { signupUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

const Signup = () => {
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const validationSchema = Yup.object({
    firstName: Yup.string().max(15, 'firstName').required('Required'),
    lastName: Yup.string().required('Required').max(15, 'lastName'),
    email: Yup.string()
      .required('Required')
      .matches(/^[A-Z0-9._%+-]+@boun\.edu\.tr$/i, 'email'),
    password: Yup.string().required('Required').min(8, 'password'),
  });

  const emailSet = (value) => {
    setEmailError(null);
    setEmail(value);
  };
  const firstSet = (value) => {
    setFirstNameError(null);
    setFirstName(value);
  };
  const lastSet = (value) => {
    setLastNameError(null);
    setLastName(value);
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
          lastName,
          email,
          firstName,
        },
        { abortEarly: false }
      )
      .then((values) => {
        dispatch(signupUser(values));
      })
      .catch((e) => {
        console.log('e', e);
        e.errors.forEach((q) => {
          switch (q) {
            case 'password':
              setPasswordError('Şifre en az 8 karakterden oluşmalı');
              break;
            case 'email':
              setEmailError('Lütfen @boun.edu.tr emaili giriniz.');
              break;
            case 'firstName':
              setFirstNameError('İsim 15 harf veya daha az olmalı');
              break;
            case 'lastName':
              setLastNameError('Soyisim 15 harf veya daha az olmalı');
              break;
            default:
              return;
          }
        });
      });
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
          Çim uygulamasına sadece <Label color="blue">@boun.edu.tr</Label>{' '}
          emaili olanlar kayıt olabilir.
        </Message>
        <Form size="large">
          <Segment>
            <Form.Group unstackable widths={2}>
              <Form.Input
                fluid
                icon={<Icon name="user" color="green" />}
                iconPosition="left"
                placeholder="İsim"
                onChange={(e) => firstSet(e.target.value)}
              />

              <Form.Input
                fluid
                icon={<Icon name="user" color="green" />}
                iconPosition="left"
                placeholder="Soyisim"
                onChange={(e) => lastSet(e.target.value)}
              />
            </Form.Group>{' '}
            {(firstNameError || lastNameError) && (
              <Form.Group unstackable widths={2}>
                {firstNameError && (
                  <Label basic color="red" pointing="above">
                    {firstNameError}
                  </Label>
                )}{' '}
                {lastNameError && (
                  <Label basic color="red" pointing="above">
                    {lastNameError}
                  </Label>
                )}
              </Form.Group>
            )}
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
              Hesap Oluştur
            </Button>
          </Segment>
        </Form>
        <Message info>
          Zaten Üye misiniz? <Link to="/login">Giriş Yap</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;

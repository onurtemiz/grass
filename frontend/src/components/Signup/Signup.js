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
  const [usernameError, setUsernameError] = useState(null);
  const [samePasswordError, setSamePasswordError] = useState(null);
  const [samePassword, setSamePassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
    username: Yup.string()
      .max(15, 'username')
      .required('Required')
      .min(1, 'username'),
    email: Yup.string()
      .required('Required')
      .matches(/^[A-Z0-9._%+-]+@boun\.edu\.tr$/i, 'email'),
    password: Yup.string().required('Required').min(8, 'password'),
    samePassword: Yup.string().equalTo(Yup.ref('password'), 'samePassword'),
  });

  const emailSet = (value) => {
    setEmailError(null);
    setEmail(value);
  };
  const usernameSet = (value) => {
    setUsernameError(null);
    setUsername(value);
  };
  const passwordSet = (value) => {
    setPasswordError(null);
    setPassword(value);
  };

  const samePasswordSet = (value) => {
    setSamePassword(value);
    setSamePasswordError(null);
  };

  const handleSubmit = async () => {
    validationSchema
      .validate(
        {
          password,
          email,
          username,
          samePassword,
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
            case 'username':
              setUsernameError(
                'Kullanıcı adı 15 veya daha az harften oluşmalı'
              );
              break;
            case 'samePassword':
              setSamePasswordError('Şifreler Eşleşmeli');
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
            <Form.Input
              fluid
              icon={<Icon name="user" color="green" />}
              iconPosition="left"
              placeholder="Kullanıcı Adı"
              onChange={(e) => usernameSet(e.target.value)}
            />

            {usernameError && (
              <Label basic color="red" pointing="above">
                {usernameError}
              </Label>
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
            <Form.Field inline>
              <Form.Input
                fluid
                icon={<Icon color="green" name="key" />}
                iconPosition="left"
                placeholder="Şifrenizi Tekrar Yazın"
                type="password"
                autoComplete="new-password"
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

import React, { useEffect, useState } from 'react';
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
  Loader,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { HomeHeader } from '../HomePage/Home/HomeTheme';
import { Label as SLabel } from '../Nav/NavTheme';
import signup from '../../services/signup';
import { toast } from 'react-toastify';

const Signup = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue, watch } = useForm();
  const [send, setSend] = useState(false);
  const [email, setEmail] = useState('');
  const [activationLoading, setActivaitonLoading] = useState(false);

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
    setLoading(true);
    setEmail(data.email);
    dispatch(signupUser(data, setLoading, setSend));
  };

  const sendVerification = async () => {
    setActivaitonLoading(true);
    const res = await signup.sendVerification(email);
    if (res.error) {
      toast.error(`${res.error}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(`Yeni bir aktivasyon linki emailinize gönderildi.`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setActivaitonLoading(false);
  };

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
            <Button fluid size="large" primary type="submit" loading={loading}>
              Hesap Oluştur
            </Button>
          </Segment>
        </Form>
        {send ? (
          <Message info>
            {activationLoading ? (
              <Loader active={true} inline="centered" />
            ) : (
              <SLabel
                color="blue"
                pointer
                bold
                onClick={() => sendVerification()}
              >
                <b>Aktivasyon Kodunu Tekrar Yolla</b>
              </SLabel>
            )}
          </Message>
        ) : null}
        <Message success>
          <Link to="/login">
            <SLabel color="green" pointer bold>
              <b>Giriş Yap</b>
            </SLabel>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (values, setSubmitting) => {
    dispatch(loginUser(values));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          error={false}
          required
          size="small"
          id="outlined-required"
          label="Email"
          variant="outlined"
          value={email}
          placeholder="onur.temiz@boun.edu.tr"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          error={true}
          size="small"
          value={password}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Link to="/signup">Kayit icin tiklayin.</Link>
    </div>
  );
};

export default Login;

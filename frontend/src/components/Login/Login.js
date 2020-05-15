import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = async (values, setSubmitting) => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
    dispatch(loginUser(values));
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .matches(/^[A-Z0-9._%+-]+@boun\.edu\.tr$/i, 'Only boun'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Must be 8 character or more'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values, setSubmitting);
      }}
    >
      <Form>
        <div>
          <label htmlFor="email">Email: </label>
          <Field
            name="email"
            type="text"
            placeholder="onur.temiz@boun.edu.tr"
          />
        </div>
        <div>
          <ErrorMessage name="email" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <Field name="password" type="password" />
        </div>
        <div>
          <ErrorMessage name="password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Login;

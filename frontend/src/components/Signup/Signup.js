import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const handleSubmit = (values, setSubmitting) => {
    console.log(
      'JSOB.stringify(values,null,2)',
      JSON.stringify(values, null, 2)
    );
    setSubmitting(false);
    
  };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .required('Required')
          .max(15, 'Must be 15 characters or less'),
        email: Yup.string()
          .required('Required')
          .matches(/^[A-Z0-9._%+-]+@boun\.edu\.tr$/i, 'Only boun'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Must be 8 characters or more'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      <Form>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <Field name="firstName" type="text" placeholder="Onur" />
        </div>
        <div>
          <ErrorMessage name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <Field name="lastName" type="text" placeholder="Temiz" />
        </div>
        <div>
          <ErrorMessage name="lastName" />
        </div>
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

export default Signup;

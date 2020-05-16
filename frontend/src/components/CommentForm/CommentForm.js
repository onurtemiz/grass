import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { postComment } from '../../reducers/commentReducer';
import { useDispatch } from 'react-redux';

const CommentForm = ({ lessonId, teacherId }) => {
  const dispatch = useDispatch();
  const handleComment = async (values, setSubmitting) => {
    setSubmitting(false);
    dispatch(postComment(values));
  };
  return (
    <Formik
      initialValues={{ comment: '', lessonId: lessonId, teacherId: teacherId }}
      validationSchema={Yup.object({
        comment: Yup.string()
          .required('Required')
          .min(3, 'Must be 3 character or more'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleComment(values, setSubmitting);
      }}
    >
      <Form>
        <div>
          <label htmlFor="comment">Comment: </label>
          <Field name="comment" type="text" />
        </div>
        <div>
          <ErrorMessage name="comment" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default CommentForm;

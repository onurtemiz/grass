import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { postComment, updateComment } from '../../reducers/commentReducer';
import { useDispatch } from 'react-redux';

const CommentForm = ({
  lessonId,
  teacherId,
  comment,
  setIsUpdate,
  enqueueSnackbar,
}) => {
  const dispatch = useDispatch();
  const handleComment = async (values, setSubmitting) => {
    setSubmitting(false);
    if (comment) {
      dispatch(updateComment(values.comment, comment.id, setIsUpdate));
      enqueueSnackbar('Comment is changed', {
        variant: 'info',
      });
    } else {
      dispatch(postComment(values));
      enqueueSnackbar('New Comment is added', {
        variant: 'success',
      });
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          comment: comment ? comment.comment : '',
          lessonId: lessonId,
          teacherId: teacherId,
        }}
        validationSchema={Yup.object({
          comment: Yup.string()
            .required('Required')
            .min(3, 'Must be 3 character or more'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleComment(values, setSubmitting);
          resetForm();
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
    </div>
  );
};

export default CommentForm;

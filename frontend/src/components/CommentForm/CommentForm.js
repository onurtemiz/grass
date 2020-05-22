import React, { useState } from 'react';
import * as Yup from 'yup';
import { postComment, updateComment } from '../../reducers/commentReducer';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

const CommentForm = ({
  lessonId,
  teacherId,
  comment,
  setIsUpdate,
  enqueueSnackbar,
}) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    comment: Yup.string()
      .required('Required')
      .min(3, 'Must be 3 character or more'),
  });
  const [value, setValue] = useState('');
  const handleComment = async () => {
    const values = {
      comment: value,
      lessonId,
      teacherId,
    };
    if (comment) {
      dispatch(updateComment(values.comment, comment.id, setIsUpdate));
    } else {
      dispatch(postComment(values,setValue));
    }
  };
  return (
    <Form reply style={{ marginBottom: '1em' }}>
      <Form.TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '30vw' }}
      />
      <Button
        content="Yorum Yazın"
        labelPosition="left"
        icon="edit"
        color="green"
        onClick={() => {
          handleComment();
        }}
      />
    </Form>
  );
};

export default CommentForm;

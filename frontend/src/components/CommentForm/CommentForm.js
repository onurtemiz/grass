import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { postComment, updateComment } from '../../reducers/commentReducer';
import { useDispatch } from 'react-redux';
import { Form, Button, Loader, Segment, Label } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

const CommentForm = ({
  lessonId,
  teacherId,
  comment,
  setIsUpdate,
  isUpdate,
  enqueueSnackbar,
}) => {
  const [tools, setTools] = useState(false);
  const dispatch = useDispatch();
  const [commentError, setCommentError] = useState('');
  const validationSchema = Yup.object({
    comment: Yup.string()
      .required('Required')
      .min(3, 'Must be 3 character or more'),
  });
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (comment) {
      setValue(comment.comment);
      setTools(true);
    }
  }, []);

  const handleCommentChange = (e) => {
    setValue(e.target.value);
    setCommentError('');
  };

  const handleComment = async () => {
    if (value.length > 4000) {
      setCommentError('4000 harften çok olamaz.');
      return;
    }
    const values = {
      comment: value,
      lessonId,
      teacherId,
    };
    setIsLoading(true);
    if (comment) {
      dispatch(
        updateComment(values.comment, comment.id, setIsUpdate, setIsLoading)
      );
    } else {
      dispatch(postComment(values, setValue, setIsLoading));
    }
  };

  return (
    <Segment compact basic loading={isLoading}>
      <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
        <TextareaAutosize
          rows={4}
          value={value}
          onChange={(e) => handleCommentChange(e)}
          style={{ width: '30vw', height: '4rem' }}
          placeholder="Nasıldır?"
          onFocus={() => setTools(true)}
        />

        {tools ? (
          <div>
            {commentError && (
              <Label basic color="red" pointing="above">
                {commentError}
              </Label>
            )}
            <Button
              style={{ marginTop: '1em' }}
              content={isUpdate ? 'Yorumu Düzenleyin' : 'Yorum Yazın'}
              labelPosition="left"
              icon="edit"
              color="green"
              onClick={() => {
                handleComment();
              }}
            />
            <Button
              style={{ marginTop: '1em' }}
              content="İptal"
              labelPosition="left"
              icon="cancel"
              color="red"
              onClick={() => {
                setTools(false);
                setValue('');
              }}
            />
          </div>
        ) : null}
      </Form>
    </Segment>
  );
};

export default CommentForm;

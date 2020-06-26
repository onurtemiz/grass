import React, { useState, useEffect } from 'react';
import { updateComment } from '../../../reducers/commentReducer';
import { useDispatch } from 'react-redux';
import { Form, Button, Segment, Label } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';

const EditComment = ({ comment, setIsUpdate }) => {
  const [tools, setTools] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      comment: comment.comment,
    },
  });

  useEffect(() => {
    setTools(true);
  }, []);

  const handleComment = async (data) => {
    setIsLoading(true);
    dispatch(
      updateComment(data.comment, comment.id, setIsUpdate, setIsLoading)
    );
  };

  return (
    <Segment compact basic loading={isLoading}>
      <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
        <Form.Field inline>
          <TextareaAutosize
            rows={4}
            style={{ width: '30vw', height: '4rem' }}
            placeholder="Nasıldır?"
            name="comment"
            ref={register({
              required: 'Lütfen yeni yorumunuzu yazın',
              maxLength: {
                value: 4000,
                message: 'Yeni yorumunuz 4000 karakterden az olmalı.',
              },
              validate: (comment) =>
                comment.trim().length !== 0 ||
                'Yorumunuz sadece boşluklardan oluşamaz.',
            })}
            onFocus={() => setTools(true)}
          />
          {errors.comment && (
            <>
              <br />
              <Label basic color="red" pointing="above">
                {errors.comment.message}
              </Label>
            </>
          )}
        </Form.Field>
        {tools ? (
          <div>
            <Button
              style={{ marginTop: '1em' }}
              content={'Yorumu Düzenleyin'}
              labelPosition="left"
              icon="edit"
              color="green"
              onClick={handleSubmit(handleComment)}
            />
            <Button
              style={{ marginTop: '1em' }}
              content="İptal"
              labelPosition="left"
              icon="cancel"
              color="red"
              onClick={() => {
                setIsUpdate(false);
              }}
            />
          </div>
        ) : null}
      </Form>
    </Segment>
  );
};

export default EditComment;

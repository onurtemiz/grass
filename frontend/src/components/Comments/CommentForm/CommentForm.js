import React, { useState } from 'react';
import { postComment } from '../../../reducers/commentReducer';
import { useDispatch } from 'react-redux';
import { Form, Button, Segment, Label, Checkbox } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { Label as StyledLabel } from '../../Nav/NavTheme';

const CommentForm = ({ typeId, commentType, teacherId, noRecommend }) => {
  const [tools, setTools] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const [recommend, setRecommend] = useState(true);

  const handleComment = async (data) => {
    let values = {
      comment: data.comment,
      typeId,
      teacherId: teacherId ? teacherId : null,
      commentType,
      recommend,
    };
    setIsLoading(true);
    dispatch(postComment(values, reset, setTools, setIsLoading));
  };

  return (
    <Segment
      compact
      basic
      loading={isLoading}
      style={{ paddingLeft: '0', marginLeft: '0' }}
    >
      <Form reply style={{ marginBottom: '1em' }}>
        <Form.Field inline>
          <TextareaAutosize
            rows={4}
            style={{ width: '90vw', height: '4rem', maxWidth: '350px' }}
            placeholder="Nasıldır?"
            name="comment"
            ref={register({
              required: 'Lütfen yorumunuzu yazın',
              maxLength: {
                value: 4000,
                message: 'Yorumunuz 4000 karakterden az olmalı.',
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

        {tools && !noRecommend ? (
          <Checkbox
            defaultChecked={recommend}
            onChange={() => setRecommend(!recommend)}
            label="Öneriyorum"
          />
        ) : null}

        {tools ? (
          <div>
            <Button
              style={{ marginTop: '1em' }}
              content={'Yorum Yazın'}
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
                setTools(false);
                reset();
              }}
            />
          </div>
        ) : null}
      </Form>
    </Segment>
  );
};

export default CommentForm;

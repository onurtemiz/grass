import React, { useState } from 'react';
import { Header, Form, Label as ErrorLabel } from 'semantic-ui-react';
import { Label } from '../../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';
import feedbackService from '../../../services/feedback';

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const handleAction = async (data) => {
    setLoading(true);
    await feedbackService.postFeedback(data, setLoading);
  };

  return (
    <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
      <Header>
        <Label color="green">Konu</Label>
      </Header>
      <Form.Field inline>
        <input
          placeholder="Konuyu yazın..."
          style={{ width: isMobile ? '80vw' : '30vw' }}
          name="topic"
          ref={register({
            required: 'Lütfen konuyu yazın',
            maxLength: {
              value: 250,
              message: 'Konunuz 250 karakter veya daha az olmalı.',
            },
          })}
        />
        {errors.topic && (
          <>
            <br />
            <ErrorLabel basic color="red" pointing="above">
              {errors.topic.message}
            </ErrorLabel>
          </>
        )}
      </Form.Field>
      <Header>
        <Label color="green">Feedback</Label>
      </Header>
      <Form.Field inline>
        <TextareaAutosize
          disabled={loading}
          rows={4}
          style={{ width: isMobile ? '80vw' : '30vw' }}
          placeholder="Konuyu detaylandırın..."
          name="description"
          ref={register({
            required: 'Lütfen konuyu detaylandırın.',
            maxLength: {
              value: 10000,
              message: 'Açıklamanız 1000 karakterden az olmalı.',
            },
          })}
        />
        {errors.description && (
          <>
            <br />
            <ErrorLabel basic color="red" pointing="above">
              {errors.description.message}
            </ErrorLabel>
          </>
        )}
      </Form.Field>
      <Form.Button
        disabled={loading}
        positive
        labelPosition="left"
        icon="checkmark"
        content="Yolla"
        onClick={handleSubmit(handleAction)}
      />
    </Form>
  );
};

export default Feedback;

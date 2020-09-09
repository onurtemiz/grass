import React, { useState } from 'react';
import {
  Modal,
  Button,
  Header,
  Form,
  Checkbox,
  Label as ErrorLabel,
  Popup,
  Divider,
} from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';
import questionsService from '../../../../services/questions';
import { useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';

const QuestionModal = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();

  const handleAction = async (data) => {
    setLoading(true);
    await questionsService.postQuestion(data, reset, setLoading, setOpen);
  };

  return (
    <>
      <Label
        color="blue"
        bold
        pointer
        onClick={() => setOpen(true)}
        style={{ paddingLeft: '1em' }}
      >
        Soru Sor
      </Label>
      <Modal open={open}>
        <Modal.Header>
          <Label color="blue">Bir soru sorun</Label>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
              <Header>
                <Label color="green">Başlık</Label>
              </Header>
              <Form.Field inline>
                <Popup
                  trigger={
                    <input
                      placeholder="Sorunuzu yazın..."
                      style={{ width: isMobile ? '80vw' : '30vw' }}
                      name="question"
                      ref={register({
                        required: 'Lütfen sorunuzu yazın',
                        maxLength: {
                          value: 150,
                          message: 'Sorunuz 150 karakter veya daha az olmalı.',
                        },
                        validate: (comment) =>
                          comment.trim().length !== 0 ||
                          'Sorunuz sadece boşluklardan oluşamaz.',
                      })}
                    />
                  }
                  content="Sorunuz 150 harf ya da daha az olmalı."
                  position="right center"
                />
                {errors.question && (
                  <>
                    <br />
                    <ErrorLabel basic color="red" pointing="above">
                      {errors.question.message}
                    </ErrorLabel>
                  </>
                )}
              </Form.Field>
              <Divider />
              <Header>
                <Label color="green">Açıklama</Label>
              </Header>
              <Form.Field inline>
                <Popup
                  trigger={
                    <TextareaAutosize
                      disabled={loading}
                      rows={4}
                      style={{ width: isMobile ? '80vw' : '30vw' }}
                      placeholder="Sorunuzu detaylandırın..."
                      name="description"
                      ref={register({
                        required: 'Lütfen sorunuzu detaylandırın.',
                        maxLength: {
                          value: 1000,
                          message: 'Açıklamanız 1000 karakterden az olmalı.',
                        },
                        validate: (comment) =>
                          comment.trim().length !== 0 ||
                          'Açıklamanız sadece boşluklardan oluşamaz.',
                      })}
                    />
                  }
                  content="Açıklamanız 1000 karakter ya da daha az olmalı."
                  position="right center"
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
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={loading}
            negative
            content="İptal"
            icon="cancel"
            labelPosition="left"
            onClick={() => setOpen(false)}
          />
          <Button
            disabled={loading}
            positive
            labelPosition="left"
            icon="checkmark"
            content="Yolla"
            onClick={handleSubmit(handleAction)}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default QuestionModal;

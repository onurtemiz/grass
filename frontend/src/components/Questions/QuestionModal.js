import React, { useState } from 'react';
import {
  Modal,
  Button,
  Header,
  Form,
  Checkbox,
  Popup,
  Divider,
} from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';
import questionsService from '../../services/questions';
const QuestionModal = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');

  const handleAction = async () => {
    // setIsLoadıng(true)
    await questionsService.postQuestion(
      { question, description },
      setQuestion,
      setDescription,
      setLoading
    );
  };

  return (
    <>
      <Label color="blue" bold pointer onClick={() => setOpen(true)}>
        Sizde soru sorun
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

              <Popup
                trigger={
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Sorunuzu yazın..."
                    style={{ width: '30vw' }}
                  />
                }
                content="Sorunuz 42 harf ya da daha az olmalı."
                position="right center"
              />
              <Divider />
              <Header>
                <Label color="green">Açıklama</Label>
              </Header>
              <Popup
                trigger={
                  <TextareaAutosize
                    disabled={loading}
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '30vw' }}
                    placeholder="Sorunuzu detaylandırın..."
                  />
                }
                content="1000 harf sayısını aşmayın."
                position="right center"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={loading}
            negative
            content="İptal"
            icon="cancel"
            labelPosition="right"
            onClick={() => setOpen(false)}
          />
          <Button
            disabled={loading}
            positive
            labelPosition="right"
            icon="checkmark"
            content="Yolla"
            onClick={() => handleAction()}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default QuestionModal;

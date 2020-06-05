import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Modal,
  Button,
  Header,
  Segment,
  Form,
  Checkbox,
  Divider,
  Loader,
} from 'semantic-ui-react';
import { GreenLabel, BlueLabel } from '../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';

const Tips = () => {
  const [value, setValue] = useState('');
  const [userPublic, setUserPublic] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <BlueLabel
        style={{ position: 'fixed', bottom: '3em', width: '100%' }}
        onClick={() => setIsOpen(true)}
      >
        Sizde tavsiye verin
      </BlueLabel>
      <Modal open={isOpen}>
        <Modal.Header>
          <BlueLabel>
            Tavsiyeniz <GreenLabel>150</GreenLabel> kelimeden az olmalı.
          </BlueLabel>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
              <Checkbox
                label="Kullanıcı adım gözüksün"
                checked={userPublic}
                onClick={() => setUserPublic(!userPublic)}
                disabled={isLoading}
              />
              <br />
              <Divider />
              <TextareaAutosize
                disabled={isLoading}
                rows={4}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ width: '30vw', height: '4rem' }}
                placeholder="Tavsiyen Nedir?"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={isLoading}
            negative
            content="İptal"
            icon="cancel"
            labelPosition="right"
            onClick={() => setIsOpen(false)}
          />
          <Button
            disabled={isLoading}
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

export default Tips;

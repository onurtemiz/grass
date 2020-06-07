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
import { Label } from '../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';
import tipsService from '../../services/tips';

const Tips = () => {
  const [value, setValue] = useState('');
  const [isAnonim, setIsAnonim] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleAction = () => {
    setIsLoading(true);
    tipsService.postTip(
      { tip: value, isAnonim: isAnonim },
      setIsLoading,
      setIsOpen
    );
  };

  return (
    <>
      <Label
        color="blue"
        pointer
        bold
        style={{ position: 'fixed', bottom: '3em', width: '100%' }}
        onClick={() => setIsOpen(true)}
      >
        Sizde tavsiye verin
      </Label>
      <Modal open={isOpen}>
        <Modal.Header>
          <Label color="blue">
            Tavsiyeniz <Label color="green">150</Label> harften az olmalı.
          </Label>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
              <Checkbox
                label="Kullanıcı adım gözükmesin"
                checked={isAnonim}
                onClick={() => setIsAnonim(!isAnonim)}
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

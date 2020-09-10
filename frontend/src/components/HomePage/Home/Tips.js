import React, { useState} from 'react';
import {
  Modal,
  Button,
  Form,
  Checkbox,
  Divider,
  Label as ErrorLabel,
} from 'semantic-ui-react';
import { Label } from '../../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';
import tipsService from '../../../services/tips';
import { useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';

const Tips = ({ home }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [isAnonim, setIsAnonim] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    tipsService.postTip({ ...data, isAnonim }, setIsLoading, setIsOpen);
  };

  return (
    <>
      <Label
        color="blue"
        pointer
        bold
        style={
          home ? { position: 'fixed', bottom: '3em', width: '100%' } : null
        }
        onClick={() => setIsOpen(true)}
      >
        Tavsiye Ver
      </Label>
      <Modal open={isOpen}>
        <Modal.Header>
          <Label color="blue">
            Tavsiyeniz <Label color="green">250</Label> harften az olmalı.
          </Label>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
              <Form.Field>
                <Checkbox
                  label="Kullanıcı adım gözükmesin"
                  disabled={isLoading}
                  value={isAnonim}
                  onChange={() => setIsAnonim(!isAnonim)}
                />
              </Form.Field>
              <br />
              <Divider />
              <Form.Field inline>
                <TextareaAutosize
                  disabled={isLoading}
                  rows={4}
                  style={{ width: isMobile ? '80vw' : '30vw', height: '4rem' }}
                  placeholder="Tavsiyen Nedir?"
                  ref={register({
                    required: 'Lütfen tavsiyenizi yazın',
                    maxLength: {
                      value: 250,
                      message: 'Tavsiyeniz 250 karakterden daha az olmalı.',
                    },
                  })}
                  name="tip"
                />
                {errors.tip && (
                  <ErrorLabel basic color="red" pointing="left">
                    {errors.tip.message}
                  </ErrorLabel>
                )}
              </Form.Field>
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
            primary
            icon="checkmark"
            content="Yolla"
            onClick={handleSubmit(onSubmit)}
          />{' '}
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Tips;

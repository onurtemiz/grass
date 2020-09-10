import React, { useState } from 'react';
import {
  Modal,
  Button,
  Header,
  Form,
  Label as ErrorLabel,
  Popup,
  Divider,
} from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
import TextareaAutosize from 'react-textarea-autosize';
import eventsService from '../../../../services/events';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import tr from 'date-fns/locale/tr';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const EventModal = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleAction = async (data) => {
    let postData = { ...data, date: selectedDate };
    setLoading(true);
    await eventsService.postEvent(postData, reset, setLoading, setOpen);
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
        Etkinlik Ekle
      </Label>
      <Modal open={open}>
        <Modal.Header>
          <Label color="blue">Etkinlik ekle</Label>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
              <Header>
                <Label color="green">Etkinlik İsmi</Label>
              </Header>
              <Form.Field inline>
                <Popup
                  trigger={
                    <input
                      placeholder="Etkinlik ismi"
                      style={{ width: '30vw' }}
                      name="title"
                      ref={register({
                        required: 'Lütfen etkinlik ismini yazın',
                        maxLength: {
                          value: 42,
                          message:
                            'Etkinlik ismi 42 karakter veya daha az olmalı.',
                        },
                        validate: (comment) =>
                          comment.trim().length !== 0 ||
                          'Etkinlik isminiz sadece boşluklardan oluşamaz.',
                      })}
                    />
                  }
                  content="Etkinlik isminiz 42 harf ya da daha az olmalı."
                  position="right center"
                />
                {errors.title && (
                  <>
                    <br />
                    <ErrorLabel basic color="red" pointing="above">
                      {errors.title.message}
                    </ErrorLabel>
                  </>
                )}
              </Form.Field>
              <Divider />

              <Header>
                <Label color="green">Alt Başlık</Label>
              </Header>
              <Form.Field inline>
                <Popup
                  trigger={
                    <input
                      placeholder="Alt başlık yazın..."
                      style={{ width: '30vw' }}
                      name="subTitle"
                      ref={register({
                        required: 'Lütfen alt başlık yazın yazın',
                        maxLength: {
                          value: 75,
                          message:
                            'Alt başlık 75 karakter veya daha az olmalı.',
                        },
                        validate: (comment) =>
                          comment.trim().length !== 0 ||
                          'Alt başlık sadece boşluklardan oluşamaz.',
                      })}
                    />
                  }
                  content="Alt başlık 75 karakter ya da daha az olmalı."
                  position="right center"
                />
                {errors.subTitle && (
                  <>
                    <br />
                    <ErrorLabel basic color="red" pointing="above">
                      {errors.subTitle.message}
                    </ErrorLabel>
                  </>
                )}
              </Form.Field>
              <Divider />
              <Header>
                <Label color="green">Etkinlik Saati</Label>
              </Header>

              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
                <DateTimePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  ampm={false}
                  disablePast
                />
              </MuiPickersUtilsProvider>

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
                      style={{ width: '30vw' }}
                      placeholder="Etkinliğinizi detaylandırın..."
                      name="description"
                      ref={register({
                        required: 'Lütfen etkinliğinizi detaylandırın.',
                        maxLength: {
                          value: 1000,
                          message:
                            'Etkinlik açıklamanız 1000 karakterden az olmalı.',
                        },
                        validate: (comment) =>
                          comment.trim().length !== 0 ||
                          'Etkinlik açıklamanız sadece boşluklardan oluşamaz.',
                      })}
                    />
                  }
                  content="Etkinlik açıklamanız 1000 karakter ya da daha az olmalı."
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

export default EventModal;

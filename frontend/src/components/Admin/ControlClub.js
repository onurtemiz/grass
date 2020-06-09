import React, { useState } from 'react';
import useField from '../EditUser/useField';
import { Form, Button, Loader, Segment, Label } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import clubsService from '../../services/clubs';
import Clubs from '../Clubs/Clubs';
import { editClub } from '../../reducers/clubReducer';
import { useDispatch } from 'react-redux';
const ControlClub = () => {
  const [shortName, setShortName] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState(
    'Kulüp yöneticileri iletişime geçer ise kendileri buraya açıklama ekleyebilir.'
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleClub = () => {
    // setIsLoading(true);
    clubsService.postClub({ shortName, fullName, description }, setIsLoading);
  };
  return (
    <>
      <Segment compact basic loading={isLoading}>
        <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
          <Form.Field>
            <label>Kulüp Tam İsmi</label>
            <input
              placeholder="Kulüp Tam ismi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Kulüp Kısaltması</label>
            <input
              placeholder="Kulüp Kısaltması"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />
          </Form.Field>{' '}
          <Form.Field>
            <label>Kulüp Açıklaması</label>
            <TextareaAutosize
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '30vw', height: '4rem' }}
              placeholder="Nasıldır?"
            />{' '}
          </Form.Field>
          <br />
          <Button
            style={{ marginTop: '1em' }}
            content="Yeni Klüp Ekle"
            labelPosition="left"
            icon="edit"
            color="green"
            onClick={() => {
              handleClub();
            }}
          />
        </Form>
      </Segment>
      <Clubs admin />
    </>
  );
};

export const ClubForm = ({ setIsEdit, club }) => {
  const dispatch = useDispatch();
  const [shortName, setShortName] = useState(club ? club.shortName : '');
  const [fullName, setFullName] = useState(club ? club.fullName : '');
  const [description, setDescription] = useState(club ? club.description : '');
  const [isLoading, setIsLoading] = useState(false);

  const handleClub = () => {
    // setIsLoading(true);
    if (club) {
      dispatch(
        editClub(
          { shortName, fullName, description, id: club.id },
          setIsLoading,
          setIsEdit
        )
      );
    } else {
      clubsService.postClub({ shortName, fullName, description }, setIsLoading);
    }
  };
  return (
    <Segment compact basic loading={isLoading}>
      <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
        <Form.Field>
          <label>Kulüp Kısaltması</label>
          <input
            placeholder="Kulüp Kısaltması"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Kulüp Tam İsmi</label>
          <input
            placeholder="Kulüp Tam ismi"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Field>{' '}
        <Form.Field>
          <label>Kulüp Açıklaması</label>
          <TextareaAutosize
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '30vw', height: '4rem' }}
            placeholder="Nasıldır?"
          />{' '}
        </Form.Field>
        <br />
        <Button
          style={{ marginTop: '1em' }}
          content="Yeni Klüp Ekle"
          labelPosition="left"
          icon="edit"
          color="green"
          onClick={() => {
            handleClub();
          }}
        />
      </Form>
    </Segment>
  );
};

export default ControlClub;

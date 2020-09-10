import React, { useState } from 'react';
import { Form, Button, Segment, } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import clubsService from '../../../services/clubs';
import Clubs from '../../ControlPage/ClubsPage/Clubs/Clubs';
import { editClub } from '../../../reducers/clubReducer';
import { useDispatch } from 'react-redux';
const ControlClub = () => {
  return (
    <>
      <ClubForm />
      <Clubs admin />
    </>
  );
};

export const ClubForm = ({ setIsEdit, club }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(club ? club.name : '');
  const [fullName, setFullName] = useState(club ? club.fullName : '');
  const [description, setDescription] = useState(club ? club.description : '');
  const [isLoading, setIsLoading] = useState(false);

  const handleClub = () => {
    setIsLoading(true);
    if (club) {
      dispatch(
        editClub(
          { name, fullName, description, id: club.id },
          setIsLoading,
          setIsEdit
        )
      );
    } else {
      clubsService.postClub(
        { name, fullName, description },
        setIsLoading,
        setName,
        setFullName,
        setIsLoading
      );
    }
  };
  return (
    <Segment compact basic loading={isLoading}>
      <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
        <Form.Field>
          <label>Kulüp Tam İsmi</label>
          <input
            placeholder="Kulüp Tam ismi"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Field>{' '}
        <Form.Field>
          <label>Kulüp Kısaltması</label>
          <input
            placeholder="Kulüp Kısaltması"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
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

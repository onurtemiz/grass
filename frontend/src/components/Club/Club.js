import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClubPageByName } from '../../reducers/clubReducer';
import { Link } from 'react-router-dom';
import IdComments from '../Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import {
  Icon,
  Button,
  Divider,
  Header,
  Container,
  Segment,
} from 'semantic-ui-react';
import CommentSort from '../CommentSort/CommentSort';
import Follow from '../Follow/Follow';
import commentsService from '../../services/comments';
import { Label } from '../Nav/NavTheme';
import CommentForm from '../CommentForm/CommentForm';

const Club = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/clubs/:name');
  const clubs = useSelector((state) => state.clubs.clubs);
  const user = useSelector((state) => state.user);
  const [club, setClub] = useState(null);
  useEffect(() => {
    dispatch(getClubPageByName(match.params.name));
  }, []);

  useEffect(() => {
    setClub(clubs.find((c) => c.name === match.params.name));
  }, [clubs]);

  if (club == undefined) {
    return <LinearProgress />;
  }
  return (
    <div>
      <Label color="blue" bold style={{ fontSize: '2em' }}>
        {club.name} · <Follow idToFollow={club.id} user={user} />
      </Label>
      <br />
      <br />
      <Label color="green" bold style={{ fontSize: '2em' }}>
        {club.fullName}
      </Label>
      <CommentForm typeId={club.id} commentType="club" />
      <Divider />
      <CommentSort />
      <IdComments typeId={club.id} type="club" />
    </div>
  );
};

export default Club;

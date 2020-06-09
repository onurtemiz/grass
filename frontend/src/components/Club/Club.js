import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClubPageByName } from '../../reducers/clubReducer';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
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
  useEffect(() => {
    dispatch(getClubPageByName(match.params.name));
  }, []);

  if (clubs.find((c) => c.shortName === match.params.name) === undefined) {
    return <LinearProgress />;
  }
  const club = clubs.find((c) => c.shortName === match.params.name);
  return (
    <div>
      <Label color="blue" bold style={{ fontSize: '2em' }}>
        {club.shortName} · <Follow idToFollow={club.id} user={user} />
      </Label>
      <br />
      <br />
      <Label color="green" bold style={{ fontSize: '2em' }}>
        {club.fullName}
      </Label>
      <CommentForm typeId={club.id} commentType="club" />
      <CommentSort />
      <Comments
        typeId={club.id}
        type="club"
        showClub={true}
        commentType="club"
      />
    </div>
  );
};

export default Club;

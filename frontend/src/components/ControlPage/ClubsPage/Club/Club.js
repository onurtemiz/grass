import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClubPageByName } from '../../../../reducers/clubReducer';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import { Divider } from 'semantic-ui-react';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import Follow from '../../../Follow/Follow';
import { Label, HeadingStyle, HeadingStyleMobile } from '../../../Nav/NavTheme';
import CommentForm from '../../../Comments/CommentForm/CommentForm';
import { isMobile } from 'react-device-detect';

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
      {isMobile ? (
        <div style={HeadingStyleMobile}>
          <Label color="blue" bold>
            {club.name}
          </Label>
          <Label color="green" bold style={{ marginTop: '0.5em' }}>
            {club.fullName}
          </Label>
          <div style={{ marginTop: '0.5em' }}>
            <Follow idToFollow={club.id} user={user} />
          </div>
        </div>
      ) : (
        <Label color="blue" bold style={HeadingStyle}>
          {club.name} ·{' '}
          <Label color="green" bold>
            {club.fullName}{' '}
            <Label color="blue" bold>
              ·{' '}
            </Label>
          </Label>
          <Follow idToFollow={club.id} user={user} />
        </Label>
      )}

      <br />
      <>
        {club.description.length === 0
          ? 'Kulüp yöneticileri iletişime geçer ise kendileri buraya açıklama ekleyebilir.'
          : club.description}
      </>
      <CommentForm
        typeId={club.id}
        commentType="club"
        users={club.comments.map((c) => c.user)}
      />
      <Divider />
      <CommentSort />
      <IdComments typeId={club.id} type="club" />
    </div>
  );
};

export default Club;

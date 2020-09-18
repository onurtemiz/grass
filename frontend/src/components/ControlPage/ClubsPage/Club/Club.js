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
  const match = useRouteMatch('/community/:name');
  const clubs = useSelector((state) => state.clubs.clubs);
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
      <div>
        <div style={HeadingStyle}>
          <Label color="blue" bold style={{ marginRight: '0.5em' }}>
            {club.name}
          </Label>
          <Follow idToFollow={club.id} />
        </div>
        <div style={HeadingStyle}>
          <Label color="green" bold>
            {club.fullName} <Label color="blue" bold></Label>
          </Label>
        </div>
      </div>
      <br />
      <div style={{ width: isMobile ? '90vw' : '50vw' }}>
        {club.description.length === 0 ? (
          <span>
            Yöneticiler{' '}
            <a href="mailto:onur.temiz@boun.edu.tr">
              <Label color="green" bold pointer>
                iletişime
              </Label>
            </a>{' '}
            geçerler ise kendileri buraya açıklama ekleyebilir.
          </span>
        ) : (
          club.description
        )}
      </div>
      <CommentForm typeId={club.id} commentType="club" />
      <Divider />
      <CommentSort />
      <IdComments typeId={club.id} type="club" />
    </div>
  );
};

export default Club;

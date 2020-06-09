import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/usersReducer';
import Comments from '../Comments/Comments';
import { Placeholder, Header, Icon } from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getLessonById } from '../../reducers/allReducer';
import Follow from '../Follow/Follow';
import { LESSON_PATH, CLUB_PATH } from '../../utils/config';
import { useFollowed } from './FollowedHook';
import { Label } from '../Nav/NavTheme';

const Following = () => {
  const user = useSelector((state) => state.user);
  const followings = useFollowed();

  if (followings.length !== user.following.length) {
    return [...Array(2)].map((e, i) => (
      <Placeholder style={{ marginTop: '1em', marginLeft: '1em' }} key={i}>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    ));
  }
  console.log('followings', followings);
  return (
    <div>
      <Header color="green" as="h1">
        Takip Ettiklerin
      </Header>
      <ul style={{ listStyle: 'none' }}>
        {followings.map((f) =>
          f.teacher ? (
            <FollowingLesson f={f} user={user} key={f.id} />
          ) : (
            <FollowingClub f={f} user={user} key={f.id} />
          )
        )}
      </ul>
    </div>
  );
};

const FollowingLesson = ({ f, user }) => {
  return (
    <li style={{ padding: '0.5em' }}>
      <Label color="blue" bold style={{ fontSize: '2em' }}>
        <Link to={LESSON_PATH(f, f.teacher.name)}>
          {f.fullName.toUpperCase()}
        </Link>{' '}
        · <Follow idToFollow={f.id} user={user} />
      </Label>
    </li>
  );
};

const FollowingClub = ({ f, user }) => {
  return (
    <li style={{ padding: '0.5em' }}>
      <Label color="blue" bold style={{ fontSize: '2em' }}>
        <Link to={CLUB_PATH(f)}>{f.shortName.toUpperCase()}</Link> ·{' '}
        <Follow idToFollow={f.id} user={user} />
      </Label>
    </li>
  );
};

export default Following;

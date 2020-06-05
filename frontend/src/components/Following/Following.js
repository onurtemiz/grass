import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/usersReducer';
import Comments from '../Comments/Comments';
import { Placeholder, Header, Icon } from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getLessonById } from '../../reducers/allReducer';
import Follow from '../Follow/Follow';
import { LESSON_PATH } from '../../utils/config';
import { useFollowed } from './FollowedHook';

const Following = () => {
  const user = useSelector((state) => state.user);
  const all = useSelector((state) => state.all.all);
  const dispatch = useDispatch();
  const lessons = useFollowed();

  if (lessons.length !== user.following.length) {
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

  return (
    <div>
      <Header color="green" as="h1">
        Takip Ettiğin Dersler
      </Header>
      <ul style={{ listStyle: 'none' }}>
        {lessons.map((l) => (
          <li key={l.id} style={{ padding: '0.5em' }}>
            <Header size="huge" color="green">
              <Link to={LESSON_PATH(l, l.teacher.name)}>
                <Icon name="book" />
                {l.fullName.toUpperCase()}
              </Link>
              <Follow idToFollow={l.id} user={user} />
            </Header>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Following;

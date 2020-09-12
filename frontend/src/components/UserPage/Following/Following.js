import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Follow from '../../Follow/Follow';
import {
  LESSON_PATH,
  CLUB_PATH,
  DORM_PATH,
  QUESTION_PATH,
  CAMPUS_PATH,
  USER_PATH,
} from '../../../utils/config';
import { Label, HeadingStyle } from '../../Nav/NavTheme';
import userService from '../../../services/user';
import NoFollowingUser from './NoFollowingUser';
import CommentsLoading from '../../Comments/CommentsLoading';
const Following = () => {
  const user = useSelector((state) => state.user);
  const [following, setFollowing] = useState();

  useEffect(() => {
    userService.getFollowing(setFollowing);
  }, [user]);

  const getLength = (following) => {
    if (following != undefined) {
      let total = 0;
      total += following.clubs.length;
      total += following.lessons.length;
      total += following.questions.length;
      total += following.campuses.length;
      total += following.dorms.length;
      total += following.users.length;
      return total;
    }
    return 0;
  };

  if (
    user.following.length === 0 ||
    (following && getLength(following) === 0)
  ) {
    return <NoFollowingUser />;
  }
  if (following == null) {
    return <CommentsLoading />;
  }
  return (
    <div>
      <Header color="green" as="h1">
        Takip Ettiklerin
      </Header>
      <Divider />
      {following.lessons.length !== 0 && (
        <FollowingList
          title="Dersler"
          arr={following.lessons}
          path={LESSON_PATH}
        />
      )}
      {following.users.length !== 0 && (
        <FollowingList
          title="Kullanıcılar"
          arr={following.users}
          path={USER_PATH}
        />
      )}
      {following.clubs.length !== 0 && (
        <FollowingList
          title="Kulüpler"
          arr={following.clubs}
          path={CLUB_PATH}
        />
      )}
      {following.questions.length !== 0 && (
        <FollowingList
          title="Sorular"
          arr={following.questions}
          path={QUESTION_PATH}
        />
      )}
      {following.campuses.length !== 0 && (
        <FollowingList
          title="Kampüsler"
          arr={following.campuses}
          path={CAMPUS_PATH}
        />
      )}
      {following.dorms.length !== 0 && (
        <FollowingList title="Yurtlar" arr={following.dorms} path={DORM_PATH} />
      )}
    </div>
  );
};

const FollowingList = ({ title, arr, path }) => {
  return (
    <>
      <Label color="green" bold>
        {title}
      </Label>
      <ul style={{ listStyle: 'none' }}>
        {arr.map((f) => (
          <li style={{ marginTop: '0.5em', ...HeadingStyle }} key={f.id}>
            <Label color="blue" bold>
              <Link to={path(f)}>
                {f.name
                  ? f.name.toUpperCase()
                  : f.question
                  ? f.question
                  : f.username
                  ? f.username
                  : f.fullName.toUpperCase()}
              </Link>{' '}
              ·{' '}
            </Label>
            <Follow idToFollow={f.id} />
          </li>
        ))}
      </ul>
      <Divider />
    </>
  );
};

export default Following;

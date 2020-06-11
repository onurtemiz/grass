import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulatedUser } from '../../reducers/usersReducer';
import Comments from '../Comments/IdComments';
import { Placeholder, Header, Icon, Divider } from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getLessonById } from '../../reducers/allReducer';
import Follow from '../Follow/Follow';
import {
  LESSON_PATH,
  CLUB_PATH,
  DORM_PATH,
  QUESTION_PATH,
  CAMPUS_PATH,
} from '../../utils/config';
import { Label } from '../Nav/NavTheme';
import userService from '../../services/user';
import NoFollowingUser from './NoFollowingUser';
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
      return total;
    }
    return 0;
  };

  if (user.following.length === 0) {
    return <NoFollowingUser />;
  }

  if (getLength(following) !== user.following.length) {
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
        Takip Ettiklerin
      </Header>
      <Divider />
      {following.lessons.length !== 0 ? (
        <FollowingList
          title="Dersler"
          arr={following.lessons}
          path={LESSON_PATH}
          user={user}
        />
      ) : null}
      {following.clubs.length !== 0 ? (
        <FollowingList
          title="Kulüpler"
          arr={following.clubs}
          path={CLUB_PATH}
          user={user}
        />
      ) : null}
      {following.questions.length !== 0 ? (
        <FollowingList
          title="Sorular"
          arr={following.questions}
          path={QUESTION_PATH}
          user={user}
        />
      ) : null}
      {following.campuses.length !== 0 ? (
        <FollowingList
          title="Kampüsler"
          arr={following.campuses}
          path={CAMPUS_PATH}
          user={user}
        />
      ) : null}
      {following.dorms.length !== 0 ? (
        <FollowingList
          title="Yurtlar"
          arr={following.dorms}
          path={DORM_PATH}
          user={user}
        />
      ) : null}
    </div>
  );
};

const FollowingList = ({ title, arr, path, user }) => {
  return (
    <>
      <Label color="green" bold>
        {title}
      </Label>
      <ul style={{ listStyle: 'none' }}>
        {arr.map((f) => (
          <li style={{ padding: '0.5em' }} key={f.id}>
            <Label color="blue" bold style={{ fontSize: '2em' }}>
              <Link to={path(f)}>
                {f.shortName
                  ? f.shortName.toUpperCase()
                  : f.question
                  ? f.question
                  : f.fullName
                  ? f.fullName.toUpperCase()
                  : f.name}
              </Link>{' '}
              · <Follow idToFollow={f.id} user={user} />
            </Label>
          </li>
        ))}
      </ul>
      <Divider />
    </>
  );
};

export default Following;

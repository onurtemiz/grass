import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followLesson, unfollowLesson } from '../../reducers/userReducer';
import { Label } from '../Nav/NavTheme';
import { Icon } from 'semantic-ui-react';
const Follow = ({ user, idToFollow }) => {
  const [following, setFollowing] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const isUserFollows = user.following.find((id) => id === idToFollow);
    if (isUserFollows) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [user.following]);

  const handleFollow = () => {
    if (following) {
      dispatch(unfollowLesson(user, idToFollow));
    } else {
      dispatch(followLesson(user, idToFollow));
    }
  };
  return (
    <>
      <Icon name="hockey puck" color={following ? 'green' : 'blue'} />

      <Label
        color={following ? 'green' : 'blue'}
        bold
        pointer
        style={{ boder: '1px solid green' }}
      >
        <span onClick={() => handleFollow()}>
          {following ? 'Takibi Bırak' : 'Takip Et'}
        </span>
      </Label>
    </>
  );
};
export default Follow;

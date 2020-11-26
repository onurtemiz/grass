import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followLesson, unfollowLesson } from '../../reducers/userReducer';
import { Icon, Button } from 'semantic-ui-react';
const Follow = ({ idToFollow }) => {
  const [following, setFollowing] = useState(false);
  const user = useSelector((state) => state.user);
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
    <Button
      color={following ? 'red' : 'blue'}
      size="small"
      onClick={() => handleFollow()}
    >
      <Icon name="hockey puck" color="white" />
      <span>{following ? 'Takibi Bırak' : 'Takip Et'}</span>
    </Button>
  );
};
export default Follow;

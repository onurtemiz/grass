import React, { useEffect, useState } from 'react';
import { Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { followLesson, unfollowLesson } from '../../reducers/userReducer';
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
    <Label onClick={() => handleFollow()} as="a">
      {following ? 'Takibi Bırak' : 'Takip Et'}
    </Label>
  );
};
export default Follow;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowing } from '../../reducers/userReducer';

export const useFollowed = () => {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.all.all);
  const clubs = useSelector((state) => state.clubs.clubs);
  const user = useSelector((state) => state.user);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    dispatch(getFollowing());
  }, []);

  useEffect(() => {
    const foundLessons = all.filter((l) => user.following.includes(l.id));
    const foundClubs = clubs.filter((c) => user.following.includes(c.id));
    setFollowings([...foundLessons, ...foundClubs]);
  }, [all, user, clubs]);

  return followings;
};

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLessonById } from '../../reducers/allReducer';

export const useFollowed = () => {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.all.all);
  const user = useSelector((state) => state.user);
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    const getAllLessons = async () => {
      let temp = [];
      user.following.map((id) => {
        all.map((l) => {
          if (l.id === id) {
            temp = temp.concat(l);
          }
        });
      });
      let leftovers = user.following.filter(
        (id) => !temp.map((l) => l.id).includes(id)
      );
      if (leftovers.length === 0) {
        setLessons(temp);
      }
      leftovers.map((id) => {
        dispatch(getLessonById(id));
      });
    };
    getAllLessons();
  }, [all, user]);

  return lessons;
};

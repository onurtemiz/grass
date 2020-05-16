import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonPageByName } from '../../reducers/lessonReducer';

const Lesson = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/lessons/:areaCode/:digitCode/:teacherName')
    .params;
  const lessons = useSelector((state) => state.lessons.lessons);
  const state = useSelector((state) => state);
  useEffect(() => {
    const q = match;
    dispatch(getLessonPageByName(q.areaCode, q.digitCode, q.teacherName));
  }, []);

  if (
    lessons.find(
      (l) =>
        l.fullName === `${match.areaCode}${match.digitCode}` &&
        l.teacher.name === decodeURI(match.teacherName)
    ) === undefined
  ) {
    return null;
  }
  console.log('state', state);
  const lesson = lessons.find(
    (l) =>
      l.fullName === `${match.areaCode}${match.digitCode}` &&
      l.teacher.name === decodeURI(match.teacherName)
  );

  return <div>{lesson.fullName.toUpperCase()}</div>;
};

export default Lesson;

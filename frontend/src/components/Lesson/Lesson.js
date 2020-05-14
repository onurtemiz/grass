import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonPage } from '../../reducers/lessonReducer';

const Lesson = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/lessons/:areaCode/:digitCode/:sectionCode')
    .params;
  const lessons = useSelector((state) => state.lessons.lessons);
  const state = useSelector((state) => state);
  useEffect(() => {
    const q = match;
    dispatch(getLessonPage(q.areaCode, q.digitCode, q.sectionCode));
  }, []);

  if (
    lessons.find(
      (l) =>
        l.fullName ===
        `${match.areaCode}${match.digitCode}.${match.sectionCode}`
    ) === undefined
  ) {
    return null;
  }

  const lesson = lessons.find(
    (l) =>
      l.fullName === `${match.areaCode}${match.digitCode}.${match.sectionCode}`
  );

  return <div>{lesson.fullName.toUpperCase()}</div>;
};

export default Lesson;

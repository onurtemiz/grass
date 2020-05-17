import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonPageByName } from '../../reducers/lessonReducer';
import CommentForm from '../CommentForm/CommentForm';
import Comments from '../Comments/Comments';
const Lesson = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/lessons/:areaCode/:digitCode/:teacherName')
    .params;
  const lessons = useSelector((state) => state.lessons.lessons);
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
  const lesson = lessons.find(
    (l) =>
      l.fullName === `${match.areaCode}${match.digitCode}` &&
      l.teacher.name === decodeURI(match.teacherName)
  );

  return (
    <div>
      <div>
        <Link to={`/teachers/${lesson.teacher.name}`}>
          {lesson.teacher.name}
        </Link>
      </div>
      {lesson.fullName.toUpperCase()}
      <h2>Comments</h2>
      <CommentForm lessonId={lesson.id} teacherId={lesson.teacher.id} />
      <Comments typeId={lesson.id} type="lesson" />
    </div>
  );
};

export default Lesson;

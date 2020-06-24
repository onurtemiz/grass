import React from 'react';
import { LESSON_PATH, TEACHER_PATH } from '../../utils/config';
import { Link } from 'react-router-dom';
const SubLesson = ({ lesson }) => {
  return (
    <div>
      <div>
        <Link to={LESSON_PATH(lesson)}>{lesson.name.toUpperCase()}</Link>
      </div>
      <div>
        <Link to={TEACHER_PATH(lesson.teacher)}>{lesson.teacher.name}</Link>
      </div>
    </div>
  );
};

export default SubLesson;

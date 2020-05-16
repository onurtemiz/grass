import React from 'react';
import { Link } from 'react-router-dom';
import { LESSON_PATH } from '../../utils/config';
const SubLesson = ({ lesson, teacherName }) => {
  return (
    <div>
      <Link to={LESSON_PATH(lesson, teacherName)}>
        {lesson.areaCode.toUpperCase()}
        {lesson.digitCode}
      </Link>
    </div>
  );
};

export default SubLesson;

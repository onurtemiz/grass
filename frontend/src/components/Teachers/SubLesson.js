import React from 'react';
import { Link } from 'react-router-dom';
import { LESSON_PATH } from '../../utils/config';
const SubLesson = ({ lesson }) => {
  return (
    <div>
      <Link to={LESSON_PATH(lesson)}>
        {lesson.areaCode.toUpperCase()}
        {lesson.digitCode}.{lesson.sectionCode}
      </Link>
    </div>
  );
};

export default SubLesson;

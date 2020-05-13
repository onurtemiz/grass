import React from 'react';

const SubLesson = ({ lesson }) => {
  return (
    <div>
      {lesson.areCode}
      {lesson.digitCode}.{lesson.sectionCode}
    </div>
  );
};

export default SubLesson;

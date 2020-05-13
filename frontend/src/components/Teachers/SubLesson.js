import React from 'react';

const SubLesson = ({ lesson }) => {
  return (
    <div>
      {lesson.areaCode.toUpperCase()}
      {lesson.digitCode}.{lesson.sectionCode}
    </div>
  );
};

export default SubLesson;

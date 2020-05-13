import React from 'react';
import SubLesson from './SubLesson';
const SubTeacher = ({ teacher }) => {
  console.log('teacher', teacher);
  return (
    <div>
      <div>Hoca: {teacher.name}</div>
      <div>
        Dersler:
        {teacher.lessons.map((l) => (
          <SubLesson lesson={l} />
        ))}
      </div>
    </div>
  );
};

export default SubTeacher;

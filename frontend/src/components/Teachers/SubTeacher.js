import React from 'react';
import SubLesson from './SubLesson';
import { Link } from 'react-router-dom';

const SubTeacher = ({ teacher }) => {
  return (
    <div>
      <div>
        <Link to={`/teachers/${teacher.name}`}>Hoca: {teacher.name}</Link>
      </div>
      <div>
        Dersler:
        {teacher.lessons.map((l) => (
          <SubLesson lesson={l} key={l.id} />
        ))}
      </div>
    </div>
  );
};

export default SubTeacher;

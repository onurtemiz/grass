import React from 'react';
import SubLesson from './SubLesson';
import { TEACHER_PATH } from '../../utils/config';
import { Link } from 'react-router-dom';

const SubTeacher = ({ teacher }) => {
  return (
    <div>
      <div>
        <Link to={TEACHER_PATH(teacher)}>Hoca: {teacher.name}</Link>
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

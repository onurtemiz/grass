import React from 'react';
import SubLesson from './SubLesson';
import { TEACHER_PATH } from '../../utils/config';
import { Link } from 'react-router-dom';

const SubTeacher = ({ teacher }) => {
  return (
    <>
      {teacher.lessons.map((l) => (
        <SubLesson lesson={l} teacherName={teacher.name} key={l.id} />
      ))}
    </>
  );
};

export default SubTeacher;

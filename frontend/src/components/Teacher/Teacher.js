import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherPage } from '../../reducers/teacherReducer';
import { Link } from 'react-router-dom';
import { LESSON_PATH } from '../../utils/config';
const Teacher = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/teachers/:name');
  const teachers = useSelector((state) => state.teachers.teachers);
  useEffect(() => {
    dispatch(getTeacherPage(match.params.name));
  }, []);
  if (teachers.find((t) => t.name === match.params.name) === undefined) {
    return null;
  }
  const teacher = teachers.find((t) => t.name === match.params.name);
  return (
    <div>
      {teacher.name}
      <ul>
        {teacher.lessons.map((l) => (
          <li key={l.id}>
            <Link to={LESSON_PATH(l, teacher.name)}>{l.fullName}</Link>
          </li>
        ))}
      </ul>
      <h2>Comments</h2>
    </div>
  );
};

export default Teacher;

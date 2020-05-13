import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherPage } from '../../reducers/teacherReducer';
const Teacher = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/teachers/:name');
  const teachers = useSelector((state) => state.teachers);
  useEffect(() => {
    dispatch(getTeacherPage(match.params.name));
  }, []);

  if (teachers.length === 0) {
    return null;
  }
  const teacher = teachers.find((t) => t.name === match.params.name);
  return (
    <div>
      {teacher.name}
      <ul>
        {teacher.lessons.map((l) => (
          <li key={l.id}>
            {l.areaCode}
            {l.digitCode}.{l.sectionCode}
          </li>
        ))}
      </ul>
      <h2>Comments</h2>
    </div>
  );
};

export default Teacher;

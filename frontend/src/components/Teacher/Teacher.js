import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherPage } from '../../reducers/teacherReducer';
import { Link } from 'react-router-dom';
import { LESSON_PATH } from '../../utils/config';
import Comments from '../Comments/Comments';
import { LinearProgress } from '@material-ui/core';
import {
  Icon,
  Button,
  Label,
  Divider,
  Header,
  Container,
  Segment,
} from 'semantic-ui-react';
import CommentSort from '../CommentSort/CommentSort';

const Teacher = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/teachers/:name');
  const teachers = useSelector((state) => state.teachers.teachers);
  useEffect(() => {
    dispatch(getTeacherPage(match.params.name));
  }, []);

  if (teachers.find((t) => t.name === match.params.name) === undefined) {
    return <LinearProgress />;
  }
  const teacher = teachers.find((t) => t.name === match.params.name);
  return (
    <div>
      <Header color="blue" size="huge">
        <Icon name="student" />
        {teacher.name}
      </Header>
      {
        <ul style={{ listStyle: 'none' }}>
          {teacher.lessons.map((l) => (
            <li key={l.id} style={{ padding: '0.5em' }}>
              <Header
                size="huge"
                color="green"
                as={Link}
                to={LESSON_PATH(l, teacher.name)}
              >
                <Icon name="book" />
                {l.fullName.toUpperCase()}
              </Header>
            </li>
          ))}
        </ul>
      }

      <h2>Comments</h2>
      <CommentSort />
      <Comments typeId={teacher.id} type="teacher" showTeacher={true} />
    </div>
  );
};

export default Teacher;

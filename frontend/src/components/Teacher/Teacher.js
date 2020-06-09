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
  Divider,
  Header,
  Container,
  Segment,
} from 'semantic-ui-react';
import CommentSort from '../CommentSort/CommentSort';
import Follow from '../Follow/Follow';
import commentsService from '../../services/comments';
import { Label } from '../Nav/NavTheme';

const Teacher = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/teachers/:name');
  const teachers = useSelector((state) => state.teachers.teachers);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getTeacherPage(match.params.name));
  }, []);

  if (teachers.find((t) => t.name === match.params.name) === undefined) {
    return <LinearProgress />;
  }
  const teacher = teachers.find((t) => t.name === match.params.name);

  return (
    <div>
      <Label color="blue" bold style={{ fontSize: '2em' }}>
        {teacher.name}
      </Label>

      {
        <ul style={{ listStyle: 'none', fontSize: '1.5em', paddingLeft: '0' }}>
          {teacher.lessons.map((l) => (
            <li key={l.id} style={{ paddingTop: '0.5em' }}>
              <Link to={LESSON_PATH(l, teacher.name)}>
                <Label color="green" bold>
                  {' '}
                  {l.fullName.toUpperCase()} ·
                </Label>
              </Link>{' '}
              <Follow idToFollow={l.id} user={user} />
            </li>
          ))}
        </ul>
      }

      <CommentSort />
      <Comments
        typeId={teacher.id}
        type="teacher"
        showSource={true}
        commentType="lesson"
      />
    </div>
  );
};

export default Teacher;

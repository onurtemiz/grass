import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherPage } from '../../../../reducers/teacherReducer';
import { Link } from 'react-router-dom';
import { LESSON_PATH } from '../../../../utils/config';
import { compareNames} from '../../../../utils/utils';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import {
  Divider,
  Label as SLabel,
} from 'semantic-ui-react';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import Follow from '../../../Follow/Follow';
import { Label } from '../../../Nav/NavTheme';

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
      <Label color="blue" bold style={{ fontSize: '2em' }}>
        {teacher.name}
      </Label>

      {
        <ul style={{ listStyle: 'none', fontSize: '1.7em', paddingLeft: '0' }}>
          {teacher.lessons.sort(compareNames).map((l) => (
            <li
              key={l.id}
              style={{
                paddingTop: '0.5em',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'pre-wrap',
              }}
            >
              <Link to={LESSON_PATH(l)}>
                <Label color="green" bold pointer>
                  {' '}
                  {l.name.toUpperCase()}
                </Label> 
              </Link>
              <Label color='blue' bold>
              {" "}·{' '}</Label>
              <Follow idToFollow={l.id} />
              {l.active ? (
              <SLabel color="green">Bu dönem açık</SLabel>
            ) : null}
            </li>
          ))}
        </ul>
      }
      <Divider />
      <CommentSort />
      <IdComments typeId={teacher.id} type="teacher" commentType="lesson" />
    </div>
  );
};

export default Teacher;

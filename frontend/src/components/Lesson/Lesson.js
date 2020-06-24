import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonPageByName } from '../../reducers/allReducer';
import { sortComment } from '../../reducers/commentReducer';
import CommentForm from '../CommentForm/CommentForm';
import IdComments from '../Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import { Header, Divider, Icon, Menu, Progress } from 'semantic-ui-react';
import CommentSort from '../CommentSort/CommentSort';

import Follow from '../Follow/Follow';
import { Label } from '../Nav/NavTheme';
const Lesson = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const match = useRouteMatch('/lessons/:areaCode/:digitCode/:teacherName')
    .params;
  const location = useLocation();

  const lessons = useSelector((state) => state.all.all);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    setLesson(null);
    const q = match;
    dispatch(getLessonPageByName(q.areaCode, q.digitCode, q.teacherName));
  }, [location]);

  useEffect(() => {
    const lesson = lessons.find(
      (l) =>
        l.name === `${match.areaCode}${match.digitCode}` &&
        l.teacher.name === decodeURI(match.teacherName)
    );
    if (lesson !== undefined) {
      setLesson(lesson);
    }
  }, [lessons]);

  if (lesson === null) {
    return <LinearProgress />;
  }

  return (
    <div>
      <div style={{ fontSize: '2em' }}>
        <Label color="blue" bold>
          {lesson.name.toUpperCase()} ·
        </Label>

        <Link to={`/teachers/${lesson.teacher.name}`}>
          <Label color="green" bold pointer>
            {' '}
            {lesson.teacher.name}
          </Label>{' '}
          <Label color="blue" bold>
            {' '}
            ·{' '}
          </Label>
        </Link>
        <Follow idToFollow={lesson.id} user={user} />
      </div>
      <br />
      <CommentForm
        typeId={lesson.id}
        teacherId={lesson.teacher.id}
        commentType="lesson"
      />

      <Divider />
      <CommentSort />
      <IdComments typeId={lesson.id} type="lesson" />
    </div>
  );
};

export default Lesson;

import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonPageByName } from '../../../../reducers/allReducer';
import { sortComment } from '../../../../reducers/commentReducer';
import CommentForm from '../../../Comments/CommentForm/CommentForm';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import { Header, Divider, Icon, Menu, Progress } from 'semantic-ui-react';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import { isMobile } from 'react-device-detect';
import courseService from '../../../../services/courses';
import Follow from '../../../Follow/Follow';
import { Label, HeadingStyle, HeadingStyleMobile } from '../../../Nav/NavTheme';
import LessonQuotaButton from '../../../Quota/LessonQuotaButton';
const Lesson = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const match = useRouteMatch('/lessons/:areaCode/:digitCode/:teacherName');
  const location = useLocation();
  const lessons = useSelector((state) => state.all.all);
  const [lesson, setLesson] = useState(null);


  useEffect(() => {
    setLesson(null);
    const q = match.params;
    dispatch(getLessonPageByName(q.areaCode, q.digitCode, q.teacherName));
  }, [location]);

  useEffect(() => {
    const q = match.params;
    const lesson = lessons.find(
      (l) =>
        l.name === `${q.areaCode.toUpperCase()}${q.digitCode}` &&
        l.parentName === decodeURI(q.teacherName)
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
      {isMobile ? (
        <div style={HeadingStyleMobile}>
          <Label color="blue" bold>
            {lesson.name.toUpperCase()}
          </Label>
          <Link
            to={`/teachers/${lesson.parentName}`}
            style={{ marginTop: '0.5em' }}
          >
            <Label color="green" bold pointer>
              {lesson.teacher.name}
            </Label>
          </Link>
          <div style={{ marginTop: '0.5em' }}>
            <Follow idToFollow={lesson.id} user={user} />
          </div>
        </div>
      ) : (
        <div style={HeadingStyle}>
          <Label color="blue" bold>
            {lesson.name.toUpperCase()} ·{' '}
          </Label>

          <Link to={`/teachers/${lesson.parentName}`}>
            <Label color="green" bold pointer>
              {lesson.parentName}
            </Label>{' '}
            <Label color="blue" bold>
              ·{' '}
            </Label>
          </Link>
          <Follow idToFollow={lesson.id} user={user} />
          {lesson.active ? <LessonQuotaButton lesson={lesson} /> : null}
        </div>
      )}

      <br />
      <CommentForm
        typeId={lesson.id}
        teacherId={lesson.teacher}
        commentType="lesson"
      />

      <Divider />
      <CommentSort />
      <IdComments typeId={lesson.id} type="lesson" />
    </div>
  );
};

export default Lesson;

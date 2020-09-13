import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonPageByName } from '../../../../reducers/allReducer';
import CommentForm from '../../../Comments/CommentForm/CommentForm';
import IdComments from '../../../Comments/Comments/IdComments';
import { LinearProgress } from '@material-ui/core';
import { Divider } from 'semantic-ui-react';
import CommentSort from '../../../Comments/CommentSort/CommentSort';
import { isMobile } from 'react-device-detect';
import Follow from '../../../Follow/Follow';
import { Label, HeadingStyle, HeadingStyleMobile } from '../../../Nav/NavTheme';
import LessonQuotaButton from '../../../Quota/LessonQuotaButton';
const Lesson = () => {
  const dispatch = useDispatch();
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
        <div style={{ fontSize: '2em', lineHeight: '1.5' }}>
          <Label color="blue" bold>
            {lesson.name.toUpperCase()}
          </Label>
          <div>
            <Link
              to={`/teachers/${lesson.parentName}`}
              style={{ marginTop: '0.5em' }}
            >
              <Label color="green" bold pointer>
                {lesson.parentName}
              </Label>
            </Link>
          </div>
          <div style={{ color: '#00000066', fontSize: '0.7em' }}>
            {lesson.fullName && lesson.fullName}
          </div>
          <div>
            <Follow idToFollow={lesson.id} />
          </div>
          <div>{lesson.active && <LessonQuotaButton lesson={lesson} />}</div>
        </div>
      ) : (
        <div style={HeadingStyleMobile}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Label
              color="blue"
              bold
              style={{
                marginRight: '0.5em',
              }}
            >
              {lesson.name.toUpperCase()}
            </Label>
            <Follow idToFollow={lesson.id} />
            <span style={{ marginRight: '0.5em' }}></span>
            {lesson.active && <LessonQuotaButton lesson={lesson} />}
          </div>
          <Link to={`/teachers/${lesson.parentName}`}>
            <Label color="green" bold pointer>
              {lesson.parentName}
            </Label>
          </Link>
          <div style={{ color: '#00000066', fontSize: '0.7em' }}>
            {lesson.fullName && lesson.fullName}
          </div>
        </div>
      )}

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

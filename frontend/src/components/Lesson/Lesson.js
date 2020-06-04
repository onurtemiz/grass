import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonPageByName } from '../../reducers/lessonReducer';
import { sortComment } from '../../reducers/commentReducer';
import CommentForm from '../CommentForm/CommentForm';
import Comments from '../Comments/Comments';
import { LinearProgress } from '@material-ui/core';
import { Header, Divider, Icon, Menu, Progress } from 'semantic-ui-react';
import CommentSort from '../CommentSort/CommentSort';
import Follow from '../Follow/Follow';
const Lesson = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const match = useRouteMatch('/lessons/:areaCode/:digitCode/:teacherName')
    .params;
  const lessons = useSelector((state) => state.lessons.lessons);

  useEffect(() => {
    const q = match;
    dispatch(getLessonPageByName(q.areaCode, q.digitCode, q.teacherName));
  }, []);

  if (
    lessons.find(
      (l) =>
        l.fullName === `${match.areaCode}${match.digitCode}` &&
        l.teacher.name === decodeURI(match.teacherName)
    ) === undefined
  ) {
    return <LinearProgress />;
  }
  const lesson = lessons.find(
    (l) =>
      l.fullName === `${match.areaCode}${match.digitCode}` &&
      l.teacher.name === decodeURI(match.teacherName)
  );
  return (
    <div>
      <Header
        as={Link}
        to={`/teachers/${lesson.teacher.name}`}
        color="blue"
        size="huge"
      >
        <Icon name="student" />
        {lesson.teacher.name}
      </Header>
      <Header size="huge" color="green">
        <Icon name="book" />
        {lesson.fullName.toUpperCase()}
        <Follow idToFollow={lesson.id} user={user} />
      </Header>
      <Header as="h1" color="green">
        Yorumlar
      </Header>
      <Divider />
      <CommentForm lessonId={lesson.id} teacherId={lesson.teacher.id} />
      <CommentSort />
      <Comments typeId={lesson.id} type="lesson" />
    </div>
  );
};

export default Lesson;

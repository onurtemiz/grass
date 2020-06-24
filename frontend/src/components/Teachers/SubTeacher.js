import React from 'react';
import SubLesson from './SubLesson';
import { TEACHER_PATH, LESSON_PATH } from '../../utils/config';
import { Link } from 'react-router-dom';
import { Card, Header, Icon } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';

const SubTeacher = ({ teacher, main }) => {
  const getLessonString = (lesson, i) => {
    if (teacher.lessons.length === 1) {
      return `${lesson.toUpperCase()}`;
    } else if (teacher.lessons.length === i + 1) {
      return `${lesson.toUpperCase()}`;
    } else {
      return `${lesson.toUpperCase()} · `;
    }
  };

  return (
    <div style={main ? { marginLeft: '1em', marginRight: '1em' } : null}>
      <Card
        as={Link}
        to={TEACHER_PATH(teacher)}
        fluid
        style={
          main
            ? {
                marginTop: '1em',
                paddingLeft: '0.5em',
                paddingTop: '0.5em',
              }
            : {
                paddingLeft: '0.5em',
                paddingTop: '0.5em',
              }
        }
      >
        <Card.Header style={{ display: 'inline' }}>
          <Header as="h2" color="blue">
            <Header.Content>{teacher.name.toUpperCase()}</Header.Content>
          </Header>
        </Card.Header>

        <Card.Description>
          {teacher.lessons.map((l, i) => (
            <Label color="green" bold pointer key={`${teacher.name}${l.name}`}>
              {getLessonString(l.name, i)}
            </Label>
          ))}
        </Card.Description>
      </Card>
    </div>
  );
};

export default SubTeacher;

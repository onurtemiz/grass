import React from 'react';
import SubLesson from './SubLesson';
import { TEACHER_PATH, LESSON_PATH } from '../../utils/config';
import { Link } from 'react-router-dom';
import { Card, Header, Icon } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';

const SubTeacher = ({ teacher }) => {
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
    <div style={{ marginLeft: '1em' }}>
      <Card
        as={Link}
        to={TEACHER_PATH(teacher)}
        fluid
        style={{
          marginTop: '1em',
          paddingLeft: '0.5em',
          paddingTop: '0.5em',
        }}
      >
        <Card.Header style={{ display: 'inline' }}>
          <Header as="h2" color="blue">
            <Header.Content>{teacher.name.toUpperCase()}</Header.Content>
          </Header>
        </Card.Header>

        <Card.Description>
          {teacher.lessons.map((l, i) => (
            <Label
              color="green"
              bold
              pointer
              key={`${teacher.name}${l.fullName}`}
            >
              {getLessonString(l.fullName, i)}
            </Label>
          ))}
        </Card.Description>
      </Card>
    </div>
  );
};

export default SubTeacher;

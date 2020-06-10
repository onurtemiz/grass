import React from 'react';
import { Link } from 'react-router-dom';
import { LESSON_PATH, TEACHER_PATH } from '../../utils/config';
import { Card, Header, Divider, Statistic, Icon } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
const SubLesson = ({ lesson, main }) => {
  const header = () => {};

  return (
    <div style={main ? { marginLeft: '1em' , marginRight: '1em'} : null}>
      <Card
        as={Link}
        to={LESSON_PATH(lesson, lesson.teacher.name)}
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
            <Header.Content>{lesson.fullName.toUpperCase()}</Header.Content>
          </Header>
        </Card.Header>
        <Card.Description>
          <Label
            color="green"
            bold
            pointer
            key={`${lesson.teacher.name}${lesson.fullName}`}
          >
            {lesson.teacher.name}
          </Label>
        </Card.Description>
      </Card>
    </div>
  );
};

export default SubLesson;

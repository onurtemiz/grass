import React from 'react';
import { Link } from 'react-router-dom';
import { LESSON_PATH, TEACHER_PATH } from '../../utils/config';
import {
  Card,
  Label,
  Header,
  Divider,
  Statistic,
  Icon,
} from 'semantic-ui-react';
const SubLesson = ({ lesson }) => {
  const header = () => {};

  return (
    <>
      <Card
        as={Link}
        to={LESSON_PATH(lesson, lesson.teacher.name)}
        fluid
        style={{ paddingTop: '0.5em', paddingLeft: '0.5em' }}
      >
        <Card.Header style={{ display: 'inline' }}>
          <Header as="h2" color="green">
            <Icon name="book" size="small" />
            <Header.Content>
              {lesson.fullName.toUpperCase()}
              {lesson.sectionCode.map((s) => (
                <Label
                  color="blue"
                  // style={{ padding: '0.5em' }}
                  key={`${lesson.fullName}.${s}`}
                >
                  {s}
                </Label>
              ))}
            </Header.Content>
          </Header>
        </Card.Header>
        <Card.Meta>{lesson.teacher.name}</Card.Meta>
      </Card>
    </>
  );
};

export default SubLesson;

import React from 'react';
import { Link } from 'react-router-dom';
import { LESSON_PATH } from '../../../../utils/config';
import {
  Card,
  Header,
  Label as SLabel,
} from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
const SubLesson = ({ lesson, main }) => {

  return (
    <div
      style={
        main
          ? { marginLeft: '1em', marginRight: '1em', marginBottom: '1em' }
          : null
      }
    >
      <Card
        as={Link}
        to={LESSON_PATH(lesson)}
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
            <Header.Content>{lesson.name.toUpperCase()} </Header.Content>
            {lesson.active ? (
              <SLabel color="green">Bu dönem açık</SLabel>
            ) : null}
          </Header>
        </Card.Header>
        <Card.Description>
          <Label
            color="green"
            bold
            pointer
            key={`${lesson.parentName}${lesson.name}`}
          >
            {lesson.parentName}
          </Label>
        </Card.Description>
      </Card>
    </div>
  );
};

export default SubLesson;

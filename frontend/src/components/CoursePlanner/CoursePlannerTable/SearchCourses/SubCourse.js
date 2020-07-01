import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Icon, Label as SLabel } from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSelectedCourse,
  removeSelectedCourse,
  onHoverCourse,
  offHoverCourse,
} from '../../../../reducers/courseReducer';

const SubCourse = ({ course }) => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const dispatch = useDispatch();
  const handleClick = () => {
    const foundCourse = selectedCourses.find((c) => c.id === course.id);
    if (foundCourse && foundCourse.hover == false) {
      dispatch(removeSelectedCourse(course));
    } else {
      dispatch(addSelectedCourse(course, false, true));
    }
  };

  const handleMouseEnter = () => {
    const isPresent = selectedCourses.find((c) => c.id === course.id);
    if (!isPresent) {
      dispatch(addSelectedCourse(course, true, false));
    } else {
      dispatch(onHoverCourse(course));
    }
  };

  const handleMouseLeave = () => {
    const foundCourse = selectedCourses.find((c) => c.id === course.id);
    if (foundCourse && !foundCourse.clicked) {
      dispatch(removeSelectedCourse(foundCourse));
    } else if (foundCourse && foundCourse.hover) {
      dispatch(offHoverCourse(foundCourse));
    }
  };

  return (
    <div
      style={{
        margin: '0.5em',
        cursor: 'pointer',
      }}
    >
      <Card
        fluid
        style={{ padding: '0.5em' }}
        onClick={() => handleClick()}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        <Card.Header style={{ display: 'inline' }}>
          <Label color="blue" bold pointer>
            {course.name}
          </Label>{' '}
          •{' '}
          <Label color="green" bold pointer>
            {course.parentName}
          </Label>
        </Card.Header>
        <Card.Meta>{course.fullName}</Card.Meta>

        <Card.Description>
          <Label color="blue" bold pointer>
            <Icon name="calendar" />
            {course.days}
          </Label>{' '}
          •{' '}
          <Label color="green" bold pointer>
            <Icon name="clock" />
            {course.hours}
          </Label>{' '}
          •{' '}
          <Label color="blue" bold pointer>
            {course.credits} Kredi
          </Label>
        </Card.Description>
      </Card>
    </div>
  );
};

export default SubCourse;

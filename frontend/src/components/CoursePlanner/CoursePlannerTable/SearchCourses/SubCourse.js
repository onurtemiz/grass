import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Icon, Label as SLabel } from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSelectedCourse,
  removeSelectedCourse,
} from '../../../../reducers/courseReducer';

const SubCourse = ({ course }) => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const dispatch = useDispatch();
  const handleClick = () => {
    const foundCourse = selectedCourses.find((c) => c.id === course.id);
    if (foundCourse && foundCourse.hover) {
      dispatch(addSelectedCourse(course, false));
    } else {
      if (foundCourse) {
        dispatch(removeSelectedCourse(course));
      } else {
        dispatch(addSelectedCourse(course, false));
      }
    }
  };

  const handleMouseEnter = () => {
    const isPresent = selectedCourses.find((c) => c.id === course.id);
    if (!isPresent) {
      dispatch(addSelectedCourse(course, true));
    }
  };

  const handleMouseLeave = () => {
    const foundCourse = selectedCourses.find((c) => c.id === course.id);
    if (foundCourse && foundCourse.hover) {
      dispatch(removeSelectedCourse(foundCourse));
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

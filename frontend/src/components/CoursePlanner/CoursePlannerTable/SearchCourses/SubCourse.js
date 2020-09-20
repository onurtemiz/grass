import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import { Label } from '../../../Nav/NavTheme';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSelectedCourse,
  removeSelectedCourse,
  onHoverCourse,
  offHoverCourse,
  addAllSections,
} from '../../../../reducers/courseReducer';
import { LESSON_PATH } from '../../../../utils/config';
import QuotaLabel from '../../../Quota/QuotaLabel';

const SubCourse = ({ course }) => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const dispatch = useDispatch();
  const handleClick = () => {
    const foundCourse = selectedCourses.find((c) => c.id === course.id);
    if (foundCourse && foundCourse.clicked) {
      dispatch(removeSelectedCourse(course));
    } else {
      dispatch(addSelectedCourse(course));
    }
  };
  const handleAddAllSections = () => {
    dispatch(addAllSections(course.areaCode, course.digitCode));
  };

  const handleMouseEnter = () => {
    const foundCourse = selectedCourses.find((c) => c.id === course.id);
    if (!foundCourse) {
      dispatch(onHoverCourse(course));
    }
  };

  const handleMouseLeave = () => {
    const foundCourse = selectedCourses.find((c) => c.id === course.id);
    if (foundCourse && !foundCourse.clicked) {
      dispatch(offHoverCourse(course));
    }
  };

  const convertDays = (days) => {
    days = days.map((d) => {
      if (d === 0) {
        return 'M';
      } else if (d === 1) {
        return 'T';
      } else if (d === 2) {
        return 'W';
      } else if (d === 3) {
        return 'Th';
      } else {
        return 'F';
      }
    });
    return days;
  };

  return (
    <div
      style={{
        margin: '0.8em',
      }}
    >
      <Card
        fluid
        style={{ padding: '0.5em' }}
        onMouseOver={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
            onClick={() => handleClick()}
          >
            <div>
              <Label color="blue" bold pointer nolink>
                {course.name}
              </Label>{' '}
              <Label color="green" bold pointer nolink>
                {course.parentName}
              </Label>
            </div>
            <div style={{ color: '#00000066' }}>{course.fullName}</div>
            <div>
              <Label color="blue" bold pointer nolink>
                <Icon name="calendar" />
                {convertDays(course.days)}
              </Label>{' '}
              <Label color="green" bold pointer nolink>
                <Icon name="clock" />
                {course.hours}
              </Label>{' '}
              <Label color="blue" bold pointer nolink>
                {course.credits} Kredi
              </Label>
            </div>
            <div>
              <Label
                color={course.place === 'Online' ? 'blue' : 'green'}
                bold
                pointer
                nolink
              >
                {course.place} Ders
              </Label>{' '}
              <Label
                color={course.place === 'Online' ? 'blue' : 'green'}
                bold
                pointer
                nolink
              >
                {course.final} Final
              </Label>
            </div>

            {course.req && (
              <Label color="blue" bold pointer nolink>
                Bu Bölümlere Zorunlu: {course.req}
              </Label>
            )}
            {course.extras &&
              course.extras.length > 0 &&
              course.extras.map((e, i) => {
                return (
                  <div key={i}>
                    <Label color="blue" bold pointer nolink>
                      {e.name}
                    </Label>{' '}
                    <Label color="blue" bold pointer nolink>
                      <Icon name="calendar" />

                      {convertDays(e.days)}
                    </Label>{' '}
                    <Label color="green" bold pointer nolink>
                      <Icon name="clock" />

                      {course.hours}
                    </Label>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            {course.parentName !== 'STAFF STAFF' && (
              <Link to={LESSON_PATH(course)}>
                <Label color="blue" bold pointer style={{ fontSize: '0.8em' }}>
                  <Icon name="comments" />
                  Yorumlara bak
                </Label>
              </Link>
            )}
            <QuotaLabel course={course} text />
            <Label
              color="blue"
              bold
              pointer
              style={{ fontSize: '0.8em' }}
              onClick={() => handleAddAllSections()}
            >
              <Icon name="add" />
              Bütün sectionları ekle
            </Label>
            {course.parentName !== 'STAFF STAFF' && (
              <a
                target="_blank"
                href={`http://registration.boun.edu.tr/scripts/schedule/coursedescription.asp?course=${course.areaCode}${course.digitCode}&section=${course.sectionCode}&term=2019%2F2020-1`}
              >
                <Label color="blue" bold pointer style={{ fontSize: '0.8em' }}>
                  <Icon name="file alternate" />
                  Geçmiş Syllabusa Bak
                </Label>
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubCourse;

import React, { useEffect, useState, useCallback } from 'react';
import {  Button, Popup, Loader } from 'semantic-ui-react';
import courseService from '../../services/courses';
import QuotaOption from './QuotaOption';

const LessonQuotaButton = ({ lesson }) => {
  const [courses, setCourses] = useState([]);
  const getCourses = useCallback(async () => {
    const c = await courseService.getSectionsByLesson(lesson);
    setCourses(c);
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

 

  return (
    <div>
      <Popup
        content={
          courses.length > 0 ? (
            courses.map((c) => {
              return <QuotaOption course={c} key={c.id} />;
            })
          ) : (
            <Loader active inline />
          )
        }
        trigger={<Button icon="sliders" color="green" content="Kota Takip" />}
        hoverable
        position="bottom center"
      />
    </div>
  );
};

export default LessonQuotaButton;

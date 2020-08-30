import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoQuotas from './NoQuotas';
import courseService from '../../services/courses';
import CommentsLoading from '../Comments/CommentsLoading';
import { Table } from 'semantic-ui-react';
import QuotaTable from './QuotaTable';

const Quotas = () => {
  const user = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);

  const getCourses = useCallback(async () => {
    const c = await courseService.getCoursesByUser();
    setCourses(c);
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

  if (user.followingCourses.length === 0) {
    return <NoQuotas />;
  }

  if (courses.length === 0) {
    return <CommentsLoading />;
  }
  console.log(courses);
  return (
    <>
      {courses.map((c) => (
        <QuotaTable course={c} />
      ))}
    </>
  );
};

export default Quotas;

import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoQuotas from './NoQuotas';
import courseService from '../../services/courses';
import CommentsLoading from '../Comments/CommentsLoading';
import { Table } from 'semantic-ui-react';
import QuotaTable from './QuotaTable';
import lodash from 'lodash';
import UserQuotaPopup from './UserQuotaPopup';
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

  if (!user.departments || !user.semester) {
    return <UserQuotaPopup />;
  }

  if (user.followingCourses.length === 0) {
    return <NoQuotas />;
  }

  if (courses.length === 0) {
    return <CommentsLoading />;
  }
  return (
    <>
      {courses.map((c) => (
        <QuotaTable
          c={c}
          setCourses={setCourses}
          courses={courses}
          key={lodash.uniqueId()}
        />
      ))}
    </>
  );
};

export default Quotas;

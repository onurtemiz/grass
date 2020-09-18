import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoQuotas from './NoQuotas';
import courseService from '../../services/courses';
import CommentsLoading from '../Comments/CommentsLoading';
import QuotaTable from './QuotaTable';
import UserQuotaPopup from './UserQuotaPopup';
import { Card } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { uniqueId } from 'lodash';

import { toast } from 'react-toastify';
const Quotas = () => {
  const user = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);

  const getCourses = useCallback(async () => {
    const c = await courseService.getCoursesByUser();
    if (c.error) {
      toast.error(`${c.error}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
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
    <Card.Group
      stackable
      style={
        !isMobile
          ? { marginTop: '1em', marginLeft: '1em', alignItems: 'baseline' }
          : { marginTop: '1em', alignItems: 'baseline' }
      }
    >
      {courses.map((c) => (
        <QuotaTable
          c={c}
          setCourses={setCourses}
          courses={courses}
          key={uniqueId()}
        />
      ))}
    </Card.Group>
  );
};

export default Quotas;

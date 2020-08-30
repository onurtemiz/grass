import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followCourse, unFollowCourse } from '../../reducers/userReducer';
import { Dropdown, Button, Checkbox, Popup } from 'semantic-ui-react';

const QuotaOption = ({ course }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(user.followingCourses.includes(course.id));
  }, [user]);

  const handleFollowCourse = () => {
    if (checked) {
      dispatch(unFollowCourse(user, course.id));
    } else {
      dispatch(followCourse(user, course.id));
    }
  };
  return (
    <Checkbox
      checked={checked}
      onClick={() => handleFollowCourse()}
      label={course.name}
    />
  );
};

export default QuotaOption;

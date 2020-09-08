import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followCourse, unFollowCourse } from '../../reducers/userReducer';
import { Dropdown, Button, Checkbox, Popup, Icon } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';

const QuotaLabel = ({ course }) => {
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
    course.parentName ==='STAFF STAFF' ? null:
    <>
    <Label
      color="blue"
      bold
      pointer
      onClick={() => handleFollowCourse()}
      style={{ float: 'right', fontSize: '0.8em' }}
    >
      <Icon name="sliders" /> {checked ? 'Kota Takip Bırak' : 'Kota Takip Et'}
    </Label>
    </>
    
  );
};

export default QuotaLabel;

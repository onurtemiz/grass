import React from 'react';
import { Table, Grid, Button, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewRequiredColumn,
  removeRequiredColumn,
} from '../../../reducers/courseReducer';
import RequiredColumn from './RequiredColumn';
const RequiredCourses = () => {
  const dispatch = useDispatch();
  const requiredCourses = useSelector((state) => state.courses.requiredCourses);

  const handleAddColumn = () => {
    dispatch(addNewRequiredColumn());
  };

  return (
    <>
      {requiredCourses
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((rc, i) => {
          return <RequiredColumn rc={rc} i={i} key={rc.id} />;
        })}

      <Grid.Column
        style={{
          visibility: requiredCourses.length > 9 ? 'hidden' : 'visible',
          marginTop: '1em',
        }}
      >
        <Button icon onClick={() => handleAddColumn()} color="blue">
          <Icon name="add" />
        </Button>
      </Grid.Column>
    </>
  );
};

export default RequiredCourses;

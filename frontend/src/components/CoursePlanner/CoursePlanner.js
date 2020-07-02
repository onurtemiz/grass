import React from 'react';
import CoursePlannerTable from './CoursePlannerTable/CoursePlannerTable';
import { Input, Grid } from 'semantic-ui-react';
import SelectedCourses from './SelectedCourses/SelectedCourses';
import RequiredCourses from './RequiredCourses/RequiredCourses';
import SearchCourses from './CoursePlannerTable/SearchCourses/SearchCourses';
import ProgramOptions from './ProgramOptions.js/ProgramOptions';

const CoursePlanner = () => {
  return (
    <div style={{ height: '150vh' }}>
      <Grid columns={3} style={{ margin: '0.5em' }}>
        <Grid.Row>
          <Grid.Column stretched width={6}>
            <CoursePlannerTable />
          </Grid.Column>
          <Grid.Column width={4}>
            <SelectedCourses />
          </Grid.Column>
          <Grid.Column>
            <SearchCourses stretched />
          </Grid.Column>
        </Grid.Row>
        <ProgramOptions />
        <Grid.Row columns={5}>
          <RequiredCourses />
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CoursePlanner;

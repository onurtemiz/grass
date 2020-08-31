import React from 'react';
import CoursePlannerTable from './CoursePlannerTable/CoursePlannerTable';
import { Input, Grid } from 'semantic-ui-react';
import SelectedCourses from './SelectedCourses/SelectedCourses';
import RequiredCourses from './RequiredCourses/RequiredCourses';
import SearchCourses from './CoursePlannerTable/SearchCourses/SearchCourses';
import ProgramOptions from './ProgramOptions/ProgramOptions';
import { isMobile } from 'react-device-detect';

const CoursePlanner = () => {
  return isMobile ? (
    <div style={{ height: '150vh' }}>
      <Grid style={{ margin: '0.5em' }}>
        <Grid.Row>
          <Grid.Column>
            <SearchCourses stretched />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <SelectedCourses />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <CoursePlannerTable />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <ProgramOptions />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <RequiredCourses />
        </Grid.Row>
      </Grid>
    </div>
  ) : (
    <div style={{ height: '150vh' }}>
      <Grid columns={3} style={{ margin: '0.5em' }}>
        <Grid.Row>
          <Grid.Column stretched width={6}>
            <CoursePlannerTable />
            <ProgramOptions />
          </Grid.Column>
          <Grid.Column width={4}>
            <SelectedCourses />
          </Grid.Column>
          <Grid.Column>
            <SearchCourses stretched />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={5}>
          <RequiredCourses />
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CoursePlanner;

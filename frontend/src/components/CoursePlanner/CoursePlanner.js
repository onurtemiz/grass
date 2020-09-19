import React, { useState, useEffect } from 'react';
import CoursePlannerTable from './CoursePlannerTable/CoursePlannerTable';
import { Button, Dimmer, Grid, Loader } from 'semantic-ui-react';
import SelectedCourses from './SelectedCourses/SelectedCourses';
import RequiredCourses from './RequiredCourses/RequiredCourses';
import SearchCourses from './CoursePlannerTable/SearchCourses/SearchCourses';
import ProgramOptions from './ProgramOptions/ProgramOptions';
import { isMobile } from 'react-device-detect';
import IdleTimer from 'react-idle-timer';
import { useDispatch, useSelector } from 'react-redux';
import coursesService from '../../services/courses';
import {
  getCurrentState,
  initialState,
  resetCurrentState,
} from '../../reducers/courseReducer';
import lodash from 'lodash';
const CoursePlanner = () => {
  const state = useSelector((state) => state.courses);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const {
      selectedCourses,
      cells,
      findTime,
      notFindTime,
      tryEmptyDay,
      conflict,
      extraHours,
      requiredCourses,
      creditsRange,
      scenariosSlider,
      courseRange,
      scenarios,
      currentScenario,
    } = state;
    if (
      lodash.isEqual(selectedCourses, initialState.selectedCourses) &&
      lodash.isEqual(scenarios, initialState.scenarios) &&
      lodash.isEqual(currentScenario, initialState.currentScenario) &&
      lodash.isEqual(requiredCourses, initialState.requiredCourses) &&
      lodash.isEqual(cells, initialState.cells) &&
      lodash.isEqual(findTime, initialState.findTime) &&
      lodash.isEqual(notFindTime, initialState.notFindTime) &&
      lodash.isEqual(tryEmptyDay, initialState.tryEmptyDay) &&
      lodash.isEqual(conflict, initialState.conflict) &&
      lodash.isEqual(extraHours, initialState.extraHours) &&
      lodash.isEqual(creditsRange, initialState.creditsRange) &&
      lodash.isEqual(scenariosSlider, initialState.scenariosSlider) &&
      lodash.isEqual(courseRange, initialState.courseRange)
    ) {
      dispatch(getCurrentState(setLoading));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setSaving(false);
      }, 1000);
      const {
        selectedCourses,
        cells,
        findTime,
        notFindTime,
        tryEmptyDay,
        conflict,
        extraHours,
        requiredCourses,
        creditsRange,
        scenariosSlider,
        courseRange,
        scenarios,
        currentScenario,
      } = state;
      coursesService.saveState({
        selectedCourses,
        cells,
        findTime,
        notFindTime,
        tryEmptyDay,
        conflict,
        extraHours,
        requiredCourses,
        creditsRange,
        scenariosSlider,
        courseRange,
        scenarios,
        currentScenario,
      });
    }
  }, [saving]);

  const resetState = () => {
    dispatch(resetCurrentState(setLoading));
  };

  if (loading) {
    return (
      <Dimmer active>
        <Loader inline content="Önceki Planner Yükleniyor." />

        <br />
        <Button color="red" onClick={() => resetState()}>
          Plannerı Sıfırla
        </Button>
      </Dimmer>
    );
  }

  return isMobile ? (
    <div style={{ height: '150vh' }}>
      <Grid style={{ margin: '0.5em' }}>
        <Grid.Row>
          <Grid.Column>
            <CoursePlannerTable />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <SelectedCourses />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <SearchCourses stretched />
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
      <IdleTimer
        timeout={1000 * 3}
        onIdle={() => setSaving(true)}
        debounce={250}
        events={[
          'keydown',
          'DOMMouseScroll',
          'mousedown',
          'touchstart',
          'touchmove',
          'MSPointerDown',
          'MSPointerMove',
          'visibilitychange',
        ]}
      />
      <Grid columns={3} style={{ margin: '0.5em' }}>
        <Grid.Row>
          <Grid.Column stretched width={6}>
            <CoursePlannerTable saving={saving} />
            <ProgramOptions />
          </Grid.Column>
          <Grid.Column width={4}>
            <SelectedCourses />
          </Grid.Column>
          <Grid.Column>
            <SearchCourses stretched />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={4}>
          <RequiredCourses />
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CoursePlanner;

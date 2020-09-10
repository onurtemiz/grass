import React from 'react';
import {
  Grid,
  Checkbox,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTryEmptyDay,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';
import CreditsSlider from './CreditsSlider';
import ConflictOptions from './ConflictOptions';
import HoursSlider from './CourseSlider';
import CreateProgram from './CreateProgram';
import ScenariosSlider from './ScenariosSlider';
const ProgramOptions = () => {
  const tryEmptyDay = useSelector((state) => state.courses.tryEmptyDay);
  const dispatch = useDispatch();

  const toggleDay = () => {
    dispatch(toggleTryEmptyDay());
  };

  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <CreateProgram />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: '1.6em' }}>
        <Grid.Column>
          <CreditsSlider />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: '1.6em' }}>
        <Grid.Column>
          <HoursSlider />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: '1.6em' }}>
        <Grid.Column>
          <ScenariosSlider />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: '1.6em' }}>
        <Grid.Column>
          <Checkbox
            defaultChecked={tryEmptyDay}
            onChange={() => toggleDay()}
            label={
              <Label color="blue" bold>
                {' '}
                Bir günü boşta bırak
              </Label>
            }
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: '1em' }}>
        <Grid.Column>
          <ConflictOptions />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default ProgramOptions;

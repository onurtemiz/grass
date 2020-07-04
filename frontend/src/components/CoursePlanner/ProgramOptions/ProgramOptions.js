import React, { useState } from 'react';
import {
  Input,
  Grid,
  Checkbox,
  Button,
  Accordion,
  Icon,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTryEmptyDay,
  onOffConflict,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';
import CreditsSlider from './CreditsSlider';
import ConflictOptions from './ConflictOptions';
import HoursSlider from './CourseSlider';
import CreateProgram from './CreateProgram';
import ScenariosSlider from './ScenariosSlider';
const ProgramOptions = () => {
  const tryEmptyDay = useSelector((state) => state.courses.tryEmptyDay);
  const conflict = useSelector((state) => state.courses.conflict);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDay = () => {
    dispatch(toggleTryEmptyDay());
  };

  const toggleConflict = () => {
    dispatch(onOffConflict());
  };
  return (
    <>
      <Grid.Row columns={5}>
        <Grid.Column>
          <CreditsSlider />
        </Grid.Column>

        <Grid.Column>
          <CreateProgram />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <HoursSlider />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ScenariosSlider />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Checkbox
            defaultChecked={tryEmptyDay}
            onChange={() => toggleDay()}
            label={
              <Label color="blue" bold>
                {' '}
                Bir günü boşta bırakmaya çalış
              </Label>
            }
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ConflictOptions />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default ProgramOptions;

import React from 'react';
import { Input, Grid, Checkbox, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTryEmptyDay,
  onOffConflict,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';

const ProgramOptions = () => {
  const tryEmptyDay = useSelector((state) => state.courses.tryEmptyDay);
  const conflict = useSelector((state) => state.courses.conflict);
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
          <Checkbox
            defaultChecked={tryEmptyDay}
            onChange={() => toggleDay()}
            label={
              <Label color="blue" bold>
                {' '}
                Bir günü boşta bırakmaya çalış.
              </Label>
            }
          />
        </Grid.Column>
        <Grid.Column>
          <Button color="blue">Programı Oluştur.</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Checkbox
            defaultChecked={conflict.makeConflict}
            onChange={() => toggleConflict()}
            label={
              <Label color="blue" bold>
                {' '}
                Conflicte izin ver.
              </Label>
            }
          />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default ProgramOptions;

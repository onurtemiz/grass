import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
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
  onOffConflict,
  changeConflictRange,
  changeConflictRequired,
} from '../../../reducers/courseReducer';
import { Label, StyledSlider } from '../../Nav/NavTheme';
import Slider from 'rc-slider';

const ConflictOptions = () => {
  const conflict = useSelector((state) => state.courses.conflict);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const toggleConflict = () => {
    dispatch(onOffConflict());
    setChecked(!checked);
    setAccordionOpen(!checked);
  };

  return (
    <Accordion style={{ display: 'inline-block' }}>
      <Accordion.Title active={accordionOpen} index={0}>
        <div style={{ display: 'flex' }}>
          <Checkbox
            defaultChecked={conflict.makeConflict}
            onChange={() => toggleConflict()}
          />
          <Label
            color="blue"
            bold
            pointer
            onClick={() => setAccordionOpen(!accordionOpen)}
            style={{ marginLeft: '0.5em' }}
          >
            Conflicte izin ver
          </Label>
          <Icon
            name="caret down"
            color="blue"
            onClick={() => setAccordionOpen(!accordionOpen)}
            style={{ marginLeft: '0.3em' }}
          />
        </div>
      </Accordion.Title>
      <Accordion.Content active={accordionOpen} style={{ marginLeft: '1em' }}>
        <HoursDetails />
      </Accordion.Content>
    </Accordion>
  );
};

const HoursDetails = () => {
  const conflictRange = useSelector(
    (state) => state.courses.conflict.conflictRange
  );

  const dispatch = useDispatch();
  const onSliderChange = (value) => {
    dispatch(changeConflictRange(value));
  };

  return (
    <div>
      <p>En fazla kaç saat conflict olabilsin?</p>
      <StyledSlider
        min={1}
        max={40}
        onChange={onSliderChange}
        value={conflictRange}
        marks={getMark(conflictRange)}
        trackStyle={{ backgroundColor: '#21ba45' }}
      />
    </div>
  );
};

const getMark = (value) => {
  let y = [value].reduce((acc, elem) => {
    acc[elem] = elem;
    return acc;
  }, {});
  return y;
};

export default ConflictOptions;

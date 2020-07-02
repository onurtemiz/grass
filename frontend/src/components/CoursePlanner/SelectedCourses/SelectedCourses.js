import React, { useState, useEffect } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Label } from '../../Nav/NavTheme';
import {
  removeSelectedCourse,
  onHoverCourse,
  offHoverCourse,
  changeCourseVisibility,
} from '../../../reducers/courseReducer';
import { compareNames } from '../../../utils/utils';

const SelectedCourses = () => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const [credits, setCredits] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setCredits(
      selectedCourses.reduce((total, c) => {
        return total + Number(c.credits);
      }, 0)
    );
  }, [selectedCourses]);

  const handleClick = (course) => {
    dispatch(removeSelectedCourse(course));
  };

  const handleMouseEnter = (course) => {
    dispatch(onHoverCourse(course));
  };

  const handleMouseLeave = (course) => {
    dispatch(offHoverCourse(course));
  };

  const toggleCourseVisiblity = (course) => {
    dispatch(changeCourseVisibility(course));
  };

  return (
    <Table columns={1}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Label color="blue" bold>
              Seçili Dersler
            </Label>
            <Label color="green" bold style={{ float: 'right' }}>
              {credits} Kredi
            </Label>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {selectedCourses.length === 0 ? (
          <Table.Row>
            <Table.Cell>
              <span style={{ visibility: 'hidden' }}>a</span>
            </Table.Cell>
          </Table.Row>
        ) : (
          selectedCourses.sort(compareNames).map((c) => {
            return (
              <Table.Row>
                <Table.Cell
                  onMouseEnter={() => handleMouseEnter(c)}
                  onMouseLeave={() => handleMouseLeave(c)}
                >
                  {c.name}{' '}
                  <Icon
                    name="delete"
                    color="green"
                    style={{ float: 'right', cursor: 'pointer' }}
                    onClick={() => {
                      handleClick(c);
                    }}
                  />
                  <Icon
                    name={c.visible ? 'eye' : 'eye slash'}
                    color="green"
                    style={{ float: 'right', cursor: 'pointer' }}
                    onClick={() => toggleCourseVisiblity(c)}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })
        )}
      </Table.Body>
    </Table>
  );
};

export default SelectedCourses;

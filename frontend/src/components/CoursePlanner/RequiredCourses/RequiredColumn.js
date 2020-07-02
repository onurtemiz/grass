import React, { useState, useEffect } from 'react';
import { Table, Grid, Button, Icon, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeRequiredColumn,
  addToRequiredColumn,
  removeFromRequiredColumn,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';

const RequiredColumn = ({ rc, i }) => {
  const dispatch = useDispatch();
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const requiredCourses = useSelector((state) => state.courses.requiredCourses);
  const [narrowedCourses, setNarrowedCourses] = useState([]);
  useEffect(() => {
    setNarrowedCourses(narrowRequired(selectedCourses, requiredCourses));
  }, [selectedCourses, requiredCourses]);

  const handleRemoveColumn = (rc) => {
    dispatch(removeRequiredColumn(rc));
  };

  const handleAddToRequiredColumn = (rc, course) => {
    dispatch(addToRequiredColumn(rc, course));
  };
  const handleRemoveFromRequiredColumn = (rc, course) => {
    dispatch(removeFromRequiredColumn(rc, course));
  };

  return (
    <Grid.Column key={rc.i}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Label color="blue" bold>
                Zorunlu Ders Grubu {i + 1}
              </Label>
              {i > 0 ? (
                <Icon
                  color="green"
                  name="cancel"
                  style={{ float: 'right' }}
                  onClick={() => handleRemoveColumn(rc)}
                />
              ) : null}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Dropdown
              text="Seçili Derslerden EKLE"
              className="icon"
              button
              basic
              fluid
              scrolling
              pointing={
                (i + 1) % 5 === 0 && narrowedCourses.length === 0
                  ? 'right'
                  : 'up'
              }
            >
              <Dropdown.Menu>
                {narrowedCourses.length === 0 ? (
                  <Dropdown.Item>
                    Buraya eklenecek başka uygun bir ders yok.
                  </Dropdown.Item>
                ) : (
                  narrowedCourses.map((sc) => {
                    return (
                      <Dropdown.Item
                        onClick={() => handleAddToRequiredColumn(rc, sc)}
                      >
                        {sc.name}
                      </Dropdown.Item>
                    );
                  })
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Row>
          {rc.courses.map((rcCourse) => {
            return (
              <Table.Row>
                <Table.Cell>
                  {rcCourse.name}
                  <Icon
                    name="cancel"
                    style={{ float: 'right' }}
                    onClick={() => handleRemoveFromRequiredColumn(rc, rcCourse)}
                  />{' '}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

const narrowRequired = (selectedCourses, requiredCourses) => {
  let narrowedCourses = [];

  selectedCourses.forEach((sc) => {
    let canAdd = true;
    requiredCourses.forEach((rc) => {
      const isPresentInOtherColumn = rc.courses.find(
        (rcCourse) => rcCourse.id === sc.id
      );
      if (isPresentInOtherColumn) {
        canAdd = false;
      }
    });
    if (canAdd) {
      narrowedCourses.push(sc);
    }
  });
  return narrowedCourses;
};

export default RequiredColumn;

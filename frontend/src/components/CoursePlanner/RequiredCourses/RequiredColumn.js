import React, { useState, useEffect } from 'react';
import { Table, Grid, Button, Icon, Dropdown, Popup } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeRequiredColumn,
  addToRequiredColumn,
  removeFromRequiredColumn,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';
import RequiredCourses from './RequiredCourses';

const RequiredColumn = ({ rc, i }) => {
  const dispatch = useDispatch();
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const requiredCourses = useSelector((state) => state.courses.requiredCourses);
  const [narrowedCourses, setNarrowedCourses] = useState([]);
  useEffect(() => {
    setNarrowedCourses(narrowRequired());
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

  const narrowRequired = () => {
    let narrowedCourses = [];

    for (let i = 0; i < selectedCourses.length; i++) {
      if (presentsInColumns(selectedCourses[i])) continue;
      const columnContainsSections = findColumnContainsSections(
        selectedCourses[i]
      );
      if (columnContainsSections && columnContainsSections.id !== rc.id)
        continue;

      narrowedCourses.push(selectedCourses[i]);
    }

    return narrowedCourses;
  };

  const presentsInColumns = (course) => {
    for (let i = 0; i < requiredCourses.length; i++) {
      let foundCourse = requiredCourses[i].courses.find(
        (rcCourse) => rcCourse.id === course.id
      );
      if (foundCourse) return true;
    }
    return false;
  };

  function findColumnContainsSections(course) {
    for (let i = 0; i < requiredCourses.length; i++) {
      let foundSections = requiredCourses[i].courses.find(
        (rcCourse) =>
          rcCourse.digitCode === course.digitCode &&
          rcCourse.areaCode === course.areaCode
      );
      if (foundSections) return requiredCourses[i];
    }
  }

  return (
    <Grid.Column style={{ marginTop: '1em' }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Label color="blue" bold>
                Kesin Olmalı Ders Grubu {i + 1}
              </Label>
              {i > 0 ? (
                <Icon
                  color="green"
                  name="cancel"
                  style={{ float: 'right' }}
                  onClick={() => handleRemoveColumn(rc)}
                />
              ) : (
                <Popup
                  content="Kesin Olmalı grubuna eklediğin derslerden biri kesinlikle oluşturulan programda yer alır."
                  trigger={
                    <Icon
                      name="question circle outline"
                      color="grey"
                      style={{ float: 'right' }}
                      size="large"
                    />
                  }
                  position="top center"
                />
              )}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
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
            </Table.Cell>
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

export default RequiredColumn;

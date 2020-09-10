import React, { useState, useEffect } from 'react';
import { Table, Grid, Icon, Dropdown, Popup } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeRequiredColumn,
  addToRequiredColumn,
  removeFromRequiredColumn,
  removeRequiredWithStack,
  addToRequiredColumnMulti,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';
import { compareNames } from '../../../utils/utils';

const RequiredColumn = ({ rc, i }) => {
  const dispatch = useDispatch();
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const requiredCourses = useSelector((state) => state.courses.requiredCourses);
  const [narrowedCourses, setNarrowedCourses] = useState([]);
  const [stackedCourses, setStackedCourses] = useState([]);
  useEffect(() => {
    setNarrowedCourses(narrowRequired());
  }, [selectedCourses, requiredCourses]);

  useEffect(() => {
    setStackedCourses(stackCourses(rc.courses));
  }, [rc]);

  const handleRemoveColumn = (rc) => {
    dispatch(removeRequiredColumn(rc));
  };

  const stackCourses = (courses) => {
    let stacked = [];
    courses.forEach((sc) => {
      let presentsInStacked = stacked.find(
        (stack) => stack.shortName === `${sc.areaCode}${sc.digitCode}`
      );
      if (presentsInStacked) {
        presentsInStacked.courses.push(sc);
      } else {
        stacked.push({
          courses: [sc],
          shortName: `${sc.areaCode}${sc.digitCode}`,
          visible: false,
        });
      }
    });
    return stacked;
  };

  const handleAddToRequiredColumn = (rc, course) => {
    if (course.stack) {
      dispatch(addToRequiredColumnMulti(rc, course));
    } else {
      dispatch(addToRequiredColumn(rc, course));
    }
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
    stackCourses(narrowedCourses).forEach((stack) => {
      if (stack.courses.length > 1) {
        narrowedCourses.push({
          name: `${stack.shortName} HEPSİ`,
          courses: stack.courses,
          stack: true,
        });
      }
    });

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
                    narrowedCourses.sort(compareNames).map((sc) => {
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
          {stackedCourses.map((stack) => {
            return stack.courses.length === 1 ? (
              <SingleRowCourse rc={rc} course={stack.courses[0]} />
            ) : (
              <MultiRowCourse rc={rc} stack={stack} />
            );
          })}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

const MultiRowCourse = ({ rc, stack }) => {
  const dispatch = useDispatch();
  const [stackVisible, setStackVisible] = useState(stack.visible);

  const toggleStackVisibility = () => {
    setStackVisible(!stackVisible);
  };

  const handleRemove = () => {
    dispatch(removeRequiredWithStack(stack));
  };

  if (stackVisible) {
    return stack.courses.sort(compareNames).map((c, i) => {
      return (
        <SingleRowCourse
          rc={rc}
          key={c.id}
          course={c}
          last={i === stack.courses.length - 1 ? true : false}
          toggleStackVisibility={toggleStackVisibility}
        />
      );
    });
  }
  return (
    <Table.Row>
      <Table.Cell>
        <Label color="blue" bold>
          {stack.shortName}{' '}
        </Label>

        {stack.courses.sort(compareNames).map((stackCourse) => {
          return (
            <Label color="green" bold>
              {stackCourse.sectionCode}{' '}
            </Label>
          );
        })}
        <Icon
          name="delete"
          color="green"
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => {
            handleRemove();
          }}
        />
        <Icon
          name={'caret down'}
          color="green"
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => toggleStackVisibility()}
        />
      </Table.Cell>
    </Table.Row>
  );
};

const SingleRowCourse = ({ rc, course, last, toggleStackVisibility }) => {
  const dispatch = useDispatch();
  const handleRemoveFromRequiredColumn = (rc, course) => {
    dispatch(removeFromRequiredColumn(rc, course));
  };
  return (
    <Table.Row>
      <Table.Cell>
        <Label color="blue" bold>
          {course.name}
        </Label>
        <Icon
          name="cancel"
          color="green"
          style={{ float: 'right' }}
          onClick={() => handleRemoveFromRequiredColumn(rc, course)}
        />{' '}
        {last ? (
          <Icon
            name={'caret up'}
            color="green"
            style={{ float: 'right', cursor: 'pointer' }}
            onClick={() => toggleStackVisibility()}
          />
        ) : null}
      </Table.Cell>
    </Table.Row>
  );
};

export default RequiredColumn;

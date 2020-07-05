import React, { useState, useEffect } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Label } from '../../Nav/NavTheme';
import {
  removeSelectedCourse,
  onHoverCourse,
  offHoverCourse,
  changeCourseVisibility,
  removeSelectedCoursesWithStack,
} from '../../../reducers/courseReducer';
import { compareNames } from '../../../utils/utils';
import CreateProgram from '../ProgramOptions/CreateProgram';

const SelectedCourses = () => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const [credits, setCredits] = useState(0);
  const [courseLength, setCourseLength] = useState(0);
  const [stackedCourses, setStackedCourses] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setCredits(
      selectedCourses
        .filter((sc) => sc.visible === true)
        .reduce((total, c) => {
          return total + Number(c.credits);
        }, 0)
    );
    setCourseLength(selectedCourses.filter((sc) => sc.visible === true).length);
    setStackedCourses(getStackedCourses());
  }, [selectedCourses]);

  const getStackedCourses = () => {
    let filteredStack = stackedCourses.filter((stack) =>
      selectedCourses
        .map((sc) => `${sc.areaCode}${sc.digitCode}`)
        .includes(stack.shortName)
    );
    let mappedStack = filteredStack.map((stack) => {
      let filteredCourses = stack.courses.filter((stackCourse) =>
        selectedCourses.map((sc) => sc.id).includes(stackCourse)
      );
      return { ...stack, courses: filteredCourses };
    });
    let stacked = [...mappedStack];
    selectedCourses.forEach((sc) => {
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

  return (
    <>
      <div style={{ maxHeight: '70vh', overflow: 'auto', marginBottom: '1em' }}>
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
                <Label
                  color="green"
                  bold
                  style={{ float: 'right', marginRight: '1em' }}
                >
                  {courseLength} Ders
                </Label>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {stackedCourses.length === 0 ? (
              <Table.Row>
                <Table.Cell>
                  <span style={{ visibility: 'hidden' }}>a</span>
                </Table.Cell>
              </Table.Row>
            ) : (
              stackedCourses.map((stack, i) => {
                return stack.courses.length === 1 ? (
                  <SingleCourseSelected
                    c={stack.courses[0]}
                    key={stack.courses[0].id}
                  />
                ) : (
                  <MultipleCourses stack={stack} id={i} />
                );
              })
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

const MultipleCourses = ({ stack }) => {
  const dispatch = useDispatch();
  const [stackVisible, setStackVisible] = useState(stack.visible);
  const toggleStackVisibility = () => {
    setStackVisible(!stackVisible);
  };

  const handleRemove = () => {
    dispatch(removeSelectedCoursesWithStack(stack));
  };

  if (stackVisible) {
    return stack.courses.sort(compareNames).map((c, i) => {
      return (
        <SingleCourseSelected
          c={c}
          key={c.id}
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

export const SingleCourseSelected = ({ c, last, toggleStackVisibility }) => {
  const dispatch = useDispatch();
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
    <Table.Row>
      <Table.Cell
        onMouseEnter={() => handleMouseEnter(c)}
        onMouseLeave={() => handleMouseLeave(c)}
      >
        <Label color="blue" bold>
          {c.name}{' '}
        </Label>
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

export default SelectedCourses;

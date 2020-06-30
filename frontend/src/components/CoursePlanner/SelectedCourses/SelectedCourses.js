import React, { useState, useEffect } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Label } from '../../Nav/NavTheme';
import { removeSelectedCourse } from '../../../reducers/courseReducer';

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
        {selectedCourses.map((c) => {
          return (
            <Table.Row>
              <Table.Cell>
                {c.name}{' '}
                <Icon
                  name="delete"
                  style={{ float: 'right', cursor: 'pointer' }}
                  onClick={() => {
                    handleClick(c);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default SelectedCourses;

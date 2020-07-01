import React, { useState, useEffect } from 'react';
import { Table, Menu, Dropdown, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCell,
  findTimeCell,
  resetTimeCell,
  removeCourseFromCell,
  addCourseToCell,
  notFindTimeCell,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';
import { getIdByDayHour } from '../../../utils/utils';

const CoursePlannerTable = () => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const cells = useSelector((state) => state.courses.cells);
  const extraHours = useSelector((state) => state.courses.extraHours);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const TOTAL_HOURS = 14;
  useEffect(() => {
    insertSelectedToTable();
    removeFromTable();
  }, [selectedCourses]);

  const findCellTime = (c) => {
    dispatch(findTimeCell(c));
  };

  const notFindCellTime = (c) => {
    dispatch(notFindTimeCell(c));
  };

  const resetCellTime = (c) => {
    dispatch(resetTimeCell(c));
  };

  const dropdownFuncs = { findCellTime, notFindCellTime, resetCellTime };

  const toggleVisibilty = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const rows = [];
    for (let i = 0; i < TOTAL_HOURS; i++) {
      rows.push(
        <Table.Row
          style={{
            opacity: visible || i <= 8 ? null : '0,0',
            position: visible || i <= 8 ? null : 'absolute',
            left: visible || i <= 8 ? null : '-999999px',
          }}
        >
          <Table.Cell>
            <Label color="green" bold>
              {i === 0 ? '09' : i + 9}:00
            </Label>
          </Table.Cell>
          {cells
            .filter((c) => c.time === i)
            .sort((a, b) => a.day - b.day)

            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
      );
    }
    setRows(rows);
  }, [cells, visible]);

  const removeFromTable = () => {
    cells.forEach((cell) => {
      if (cell.courses.length !== 0) {
        cell.courses.forEach((cellCourse) => {
          const course = selectedCourses.find(
            (selectedCourse) => selectedCourse.id === cellCourse.id
          );
          if (!course) {
            dispatch(removeCourseFromCell(cell, cellCourse));
          }
        });
      }
    });
  };

  const insertSelectedToTable = () => {
    selectedCourses.forEach((selectedCourse) => {
      selectedCourse.days.forEach((day, index) => {
        let cellId = getIdByDayHour(index, selectedCourse);
        let cell = cells.find((ce) => ce.id === cellId);
        if (!cell) return;
        console.log('cell', cell);
        dispatch(addCourseToCell(cell, selectedCourse));
      });
    });
  };

  if (cells.length === 0 || rows.length === 0) {
    return null;
  }
  console.log('visible', visible);
  return (
    <Table celled definition collapsing size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>

          <Table.HeaderCell>
            <Label color="blue" bold>
              Pazartesi
            </Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label color="blue" bold>
              Salı
            </Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label color="blue" bold>
              Çarşamba
            </Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label color="blue" bold>
              Perşembe
            </Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label color="blue" bold>
              Cuma
            </Label>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((r) => {
          return r;
        })}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row textAlign="center" column={1}>
          <Table.Cell selectable colSpan="6" onClick={() => toggleVisibilty()}>
            <Icon
              color={extraHours ? 'red' : 'blue'}
              name={visible ? 'sort up' : 'dropdown'}
              size="large"
              onClick={() => toggleVisibilty()}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

const CellDropdown = ({ c, f }) => {
  return (
    <Table.Cell
      selectable
      style={{ backgroundColor: c.color ? c.color : null }}
      textAlign="center"
    >
      {c.courses.length !== 0
        ? c.courses.map((cellCourse) => {
            return (
              <>
                <Label color={cellCourse.hover ? 'green' : 'blue'} bold>
                  {cellCourse.name}
                </Label>
                <br />
              </>
            );
          })
        : null}
      <Dropdown icon="" fluid>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => f.findCellTime(c)}>
            Bu saatte ders ara
          </Dropdown.Item>
          <Dropdown.Item onClick={() => f.notFindCellTime(c)}>
            Bu saatte ders arama
          </Dropdown.Item>
          <Dropdown.Item onClick={() => f.resetCellTime(c)}>
            Sıfırla
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Table.Cell>
  );
};

export default CoursePlannerTable;

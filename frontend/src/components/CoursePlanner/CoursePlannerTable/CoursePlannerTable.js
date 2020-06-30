import React, { useState, useEffect } from 'react';
import { Table, Menu, Dropdown } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCell,
  findTimeCell,
  resetTimeCell,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';
import { getIdByDayHour } from '../../../utils/utils';

const CoursePlannerTable = () => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const cells = useSelector((state) => state.courses.cells);
  const dispatch = useDispatch();
  useEffect(() => {
    removeFromTable();
    insertSelectedToTable();
  }, [selectedCourses]);

  const removeFromTable = () => {
    cells.forEach((cell) => {
      if (cell.courses.length !== 0) {
        cell.courses.forEach((cellCourse) => {
          const isPresent = selectedCourses.find(
            (selectedCourse) => selectedCourse.id === cellCourse.id
          );
          if (!isPresent) {
            const cellCourses = cell.courses.filter(
              (c) => c.id !== cellCourse.id
            );
            dispatch(setCell({ ...cell, courses: cellCourses }));
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
        const isCellPresent = cell.courses.find(
          (cellCourse) => cellCourse.id === selectedCourse.id
        );
        if (!isCellPresent) {
          dispatch(
            setCell({ ...cell, courses: [...cell.courses, selectedCourse] })
          );
        } else {
          const filteredCourses = cell.courses.filter(
            (cellCourse) => cellCourse.id !== selectedCourse.id
          );
          dispatch(
            setCell({ ...cell, courses: [...filteredCourses, selectedCourse] })
          );
        }
      });
    });
  };

  if (cells.length === 0) {
    return null;
  }

  const findCellTime = (c) => {
    dispatch(findTimeCell(c));
  };

  const notFindCellTime = (c) => {
    dispatch(setCell({ ...c, timeFind: false, color: '#fdabab' }));
  };

  const resetCellTime = (c) => {
    dispatch(resetTimeCell(c));
  };

  const dropdownFuncs = { findCellTime, notFindCellTime, resetCellTime };
  return (
    <Table celled definition striped collapsing size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>

          <Table.HeaderCell>Pazartesi</Table.HeaderCell>
          <Table.HeaderCell>Salı</Table.HeaderCell>
          <Table.HeaderCell>Çarşamba</Table.HeaderCell>
          <Table.HeaderCell>Perşembe</Table.HeaderCell>
          <Table.HeaderCell>Cuma</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>09:00</Table.Cell>
          {cells
            .filter((c) => c.time === 0)

            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>10:00</Table.Cell>
          {cells
            .filter((c) => c.time === 1)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>11:00</Table.Cell>
          {cells
            .filter((c) => c.time === 2)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>12:00</Table.Cell>
          {cells
            .filter((c) => c.time === 3)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>13:00</Table.Cell>
          {cells
            .filter((c) => c.time === 4)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>14:00</Table.Cell>
          {cells
            .filter((c) => c.time === 5)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>15:00</Table.Cell>
          {cells
            .filter((c) => c.time === 6)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>16:00</Table.Cell>
          {cells
            .filter((c) => c.time === 7)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>17:00</Table.Cell>
          {cells
            .filter((c) => c.time === 8)
            .map((c) => {
              return <CellDropdown key={c.id} c={c} f={dropdownFuncs} />;
            })}
        </Table.Row>
      </Table.Body>
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

import React, { useState, useEffect } from 'react';
import {
  Table,
  Menu,
  Dropdown,
  Button,
  Icon,
  Pagination,
  Popup,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCell,
  findTimeCell,
  resetTimeCell,
  removeCourseFromCell,
  addCourseToCell,
  notFindTimeCell,
  setCurrentScenario,
  changeCoursesVisibility,
  toggleCellCoursesVisiblity,
} from '../../../reducers/courseReducer';
import { Label } from '../../Nav/NavTheme';
import { getIdByDayHour } from '../../../utils/utils';
import CommentsLoading from '../../Comments/CommentsLoading';

const CoursePlannerTable = () => {
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const scenarios = useSelector((state) => state.courses.scenarios);
  const currentScenario = useSelector((state) => state.courses.currentScenario);
  const [scenariosActivePage, setScenariosActivePage] = useState(0);
  const cells = useSelector((state) => state.courses.cells);
  const extraHours = useSelector((state) => state.courses.extraHours);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [paginationVisible, setPaginationVisible] = useState(false);
  const TOTAL_HOURS = 14;
  useEffect(() => {
    insertSelectedToTable();
    removeFromTable();
  }, [selectedCourses]);

  useEffect(() => {
    if (scenarios.length > 0 && scenariosActivePage > 0) {
      dispatch(setCurrentScenario(scenarios[scenariosActivePage - 1]));
    }
  }, [scenariosActivePage, scenarios]);

  useEffect(() => {
    dispatch(changeCoursesVisibility(currentScenario));
  }, [currentScenario]);

  useEffect(() => {
    if (scenarios.length > 0) {
      setPaginationVisible(true);
      setScenariosActivePage(1);
    } else {
      setScenariosActivePage(0);
      setPaginationVisible(false);
      dispatch(setCurrentScenario(selectedCourses));
    }
  }, [scenarios]);

  const handleScenarioChange = (evet, data) => {
    setScenariosActivePage(data.activePage);
  };

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
          key={i}
        >
          <Table.Cell style={{ backgroundColor: '#F9FAFB' }}>
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
        dispatch(addCourseToCell(cell, selectedCourse));
      });
    });
  };

  if (cells.length === 0 || rows.length === 0) {
    return <CommentsLoading />;
  }
  return (
    <Table celled size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">
            <Popup
              content="Herhangi bir saate tıkla"
              trigger={
                <Icon name="question circle outline" color="grey" size="big" />
              }
              position="right center"
            />
          </Table.HeaderCell>

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
        <Table.Row
          column={1}
          textAlign="center"
          style={{
            opacity: paginationVisible ? null : '0,0',
            position: paginationVisible ? null : 'absolute',
            left: paginationVisible ? null : '-999999px',
          }}
        >
          <Table.Cell colSpan="6">
            <Pagination
              activePage={scenariosActivePage}
              onPageChange={(event, data) => handleScenarioChange(event, data)}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={scenarios.length}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row textAlign="center" column={1}>
          <Table.Cell selectable colSpan="6" onClick={() => toggleVisibilty()}>
            <Icon
              color={extraHours ? 'green' : 'blue'}
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
  const visibleCourses = c.courses.filter((cCourse) => cCourse.visible);
  return (
    <Table.Cell
      selectable
      style={{
        backgroundColor: c.color ? c.color : null,
      }}
      textAlign="center"
    >
      {visibleCourses.length < 4 ? (
        <AllCells visibleCourses={visibleCourses} c={c} />
      ) : c.visible ? (
        <AllCells visibleCourses={visibleCourses} c={c} upper />
      ) : (
        <FirstThreeCells visibleCourses={visibleCourses} c={c} />
      )}

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

const FirstThreeCells = ({ visibleCourses, c }) => {
  const dispatch = useDispatch();
  const makeCellCoursesVisible = () => {
    dispatch(toggleCellCoursesVisiblity(c, true));
  };
  return (
    <>
      {c.courses
        .filter((cCourse) => cCourse.visible)
        .slice(0, 3)
        .map((cellCourse) => {
          return (
            <>
              <Label color={'red'} bold key={cellCourse.name}>
                {cellCourse.name}
              </Label>
              <br />
            </>
          );
        })}
      <Icon name="caret down" onClick={() => makeCellCoursesVisible()} />
    </>
  );
};

const AllCells = ({ visibleCourses, c, upper }) => {
  const dispatch = useDispatch();
  const makeCellCoursesHidden = () => {
    dispatch(toggleCellCoursesVisiblity(c, false));
  };
  return (
    <>
      {visibleCourses.length !== 0
        ? c.courses
            .filter((cCourse) => cCourse.visible)
            .map((cellCourse) => {
              return (
                <>
                  <Label
                    color={
                      visibleCourses.length > 1
                        ? 'red'
                        : cellCourse.hover
                        ? 'green'
                        : 'blue'
                    }
                    bold
                    key={cellCourse.name}
                  >
                    {cellCourse.name}
                  </Label>
                  <br />
                </>
              );
            })
        : null}
      {upper ? (
        <Icon name="caret up" onClick={() => makeCellCoursesHidden()} />
      ) : null}
    </>
  );
};

export default CoursePlannerTable;
